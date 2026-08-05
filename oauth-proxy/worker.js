/**
 * Proxy di scambio token per Social Dashboard.
 *
 * Perché esiste: Instagram e TikTok richiedono il client secret per
 * trasformare il `code` OAuth in un token. Compilarlo dentro l'eseguibile
 * distribuito significa regalarlo a chiunque scarichi l'app — basta
 * decomprimere il binario per rileggerlo in chiaro. Meta lo vieta
 * esplicitamente per il proprio app secret.
 *
 * Qui i segreti stanno come variabili d'ambiente del Worker e non lasciano
 * mai il server: l'app manda il `code`, riceve indietro il token.
 *
 * Deploy: vedi README.md in questa cartella.
 *
 * Endpoint:
 *   POST /exchange {platform, code, redirect_uri}  -> {access_token, ...}
 *   POST /refresh  {platform, refresh_token}       -> {access_token, scope}
 *
 * Qui vive anche il rilascio delle licenze (licensing.js), per lo stesso
 * motivo: la chiave segreta di Stripe non puo' stare in un eseguibile
 * distribuito, e un'app locale non puo' decidere da sola chi ha pagato.
 *   POST /checkout        -> URL di pagamento
 *   POST /stripe/webhook  -> emissione della licenza
 *   GET  /license/claim   -> la pagina dove il cliente legge la sua chiave
 *   POST /license/verify  -> l'app sblocca il piano
 */
import { createCheckout, handleWebhook, verifyLicense, claimPage } from './licensing.js';

const JSON_HEADERS = { 'content-type': 'application/json' };

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

/** Non si rimanda al client il corpo grezzo della piattaforma: potrebbe
 *  contenere dettagli che non servono all'app. Solo un messaggio utile. */
function fail(message, status = 400) {
  return json({ error: message }, status);
}

async function instagramExchange(env, code, redirectUri) {
  const short = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.INSTAGRAM_APP_ID,
      client_secret: env.INSTAGRAM_APP_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code,
    }),
  });
  if (!short.ok) return fail('Instagram ha rifiutato il codice di autorizzazione.', 400);
  const shortData = await short.json();

  // Il token breve dura un'ora: si scambia subito con quello a 60 giorni.
  const longUrl = new URL('https://graph.instagram.com/access_token');
  longUrl.searchParams.set('grant_type', 'ig_exchange_token');
  longUrl.searchParams.set('client_secret', env.INSTAGRAM_APP_SECRET);
  longUrl.searchParams.set('access_token', shortData.access_token);
  const long = await fetch(longUrl);
  if (!long.ok) return fail('Scambio del token Instagram fallito.', 400);
  const longData = await long.json();

  return json({ access_token: longData.access_token, expires_in: longData.expires_in });
}

async function tiktokToken(env, params) {
  const resp = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_key: env.TIKTOK_CLIENT_KEY,
      client_secret: env.TIKTOK_CLIENT_SECRET,
      ...params,
    }),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data.access_token) return fail('TikTok ha rifiutato la richiesta.', 400);
  // Si restituisce solo ciò che serve all'app.
  return json({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    open_id: data.open_id,
    scope: data.scope,
    expires_in: data.expires_in,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const action = url.pathname.replace(/^\/+|\/+$/g, '');

    // --- Licenze -------------------------------------------------------
    // Prima dello scambio token: sono gli unici endpoint che accettano GET
    // (la pagina di riscossione) e che leggono il corpo grezzo (la firma di
    // Stripe si calcola sui byte esatti, non sul JSON re-serializzato).
    if (action === 'license/claim') {
      if (request.method !== 'GET') return fail('method_not_allowed', 405);
      return claimPage(env, url);
    }

    if (action === 'license/cancelled') {
      return new Response(
        '<!doctype html><meta charset="utf-8"><title>Payment cancelled</title>' +
          '<style>body{margin:0;min-height:100vh;display:flex;align-items:center;' +
          'justify-content:center;background:#0f1115;color:#e8eaf0;font:16px system-ui}</style>' +
          '<div>Payment cancelled — you can close this tab.</div>',
        { headers: { 'content-type': 'text/html; charset=utf-8' } }
      );
    }

    if (action === 'stripe/webhook') {
      if (request.method !== 'POST') return fail('method_not_allowed', 405);
      return handleWebhook(env, request);
    }

    if (request.method !== 'POST') return fail('method_not_allowed', 405);

    let body;
    try {
      body = await request.json();
    } catch {
      return fail('bad_request', 400);
    }

    if (action === 'checkout') return createCheckout(env, body);
    if (action === 'license/verify') return verifyLicense(env, body);

    // --- Scambio token OAuth -------------------------------------------
    const platform = body.platform;
    if (platform !== 'instagram' && platform !== 'tiktok') {
      return fail('platform_unsupported', 400);
    }

    if (action === 'exchange') {
      if (!body.code || !body.redirect_uri) return fail('missing_params', 400);
      if (platform === 'instagram') {
        return instagramExchange(env, body.code, body.redirect_uri);
      }
      return tiktokToken(env, {
        code: body.code,
        grant_type: 'authorization_code',
        redirect_uri: body.redirect_uri,
      });
    }

    if (action === 'refresh') {
      if (!body.refresh_token) return fail('missing_params', 400);
      // Instagram rinnova il token a lunga durata senza secret, quindi lo fa
      // l'app da sola: qui serve solo TikTok.
      if (platform !== 'tiktok') return fail('refresh_not_needed', 400);
      return tiktokToken(env, {
        grant_type: 'refresh_token',
        refresh_token: body.refresh_token,
      });
    }

    return fail('Endpoint sconosciuto.', 404);
  },
};
