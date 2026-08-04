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
 */

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
    if (request.method !== 'POST') return fail('Metodo non consentito.', 405);

    const action = new URL(request.url).pathname.replace(/^\/+|\/+$/g, '');
    let body;
    try {
      body = await request.json();
    } catch {
      return fail('Corpo della richiesta non valido.', 400);
    }

    const platform = body.platform;
    if (platform !== 'instagram' && platform !== 'tiktok') {
      return fail('Piattaforma non supportata.', 400);
    }

    if (action === 'exchange') {
      if (!body.code || !body.redirect_uri) return fail('Parametri mancanti.', 400);
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
      if (!body.refresh_token) return fail('Parametri mancanti.', 400);
      // Instagram rinnova il token a lunga durata senza secret, quindi lo fa
      // l'app da sola: qui serve solo TikTok.
      if (platform !== 'tiktok') return fail('Rinnovo non necessario per questa piattaforma.', 400);
      return tiktokToken(env, {
        grant_type: 'refresh_token',
        refresh_token: body.refresh_token,
      });
    }

    return fail('Endpoint sconosciuto.', 404);
  },
};
