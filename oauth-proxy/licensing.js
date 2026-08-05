/**
 * Licenze: acquisto, emissione e verifica.
 *
 * Perché sta qui e non nell'app: la chiave segreta di Stripe non può vivere
 * dentro un eseguibile distribuito (si rilegge decomprimendo il binario), e
 * un'app che gira solo sul computer del cliente non può decidere da sola
 * chi ha pagato - il database dei piani sarebbe sul PC di chi deve pagare.
 *
 * Flusso:
 *   1. l'app chiede POST /checkout        -> URL di pagamento Stripe
 *   2. il cliente paga sulla pagina Stripe
 *   3. Stripe chiama POST /stripe/webhook -> qui si emette la chiave
 *   4. il cliente atterra su GET /license/claim -> vede la sua chiave
 *   5. l'app chiama POST /license/verify  -> sblocca il piano
 *
 * Le chiavi vivono in KV (namespace LICENSES), indicizzate sia per chiave
 * sia per session_id di Stripe (serve al passo 4).
 */

const JSON_HEADERS = { 'content-type': 'application/json' };

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

/** Al client arriva un codice, non una frase: l'app esiste in sei lingue e
 *  il testo va scritto in quella scelta dall'utente. */
function fail(code, status = 400) {
  return json({ error: code }, status);
}

// I prezzi stanno sul server: se stessero nell'app, chi la modifica potrebbe
// farsi generare una sessione di pagamento da 0 euro.
const PLANS = {
  pro: { name: 'Pro', monthly: 1200, yearly: 12000 },
  studio: { name: 'Studio', monthly: 3900, yearly: 39000 },
};

// Senza ambiguità visive: niente 0/O, 1/I/L. Una chiave letta male e
// ridigitata a mano è una richiesta di assistenza evitabile.
const KEY_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function newLicenseKey(plan) {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let out = '';
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) out += '-';
    out += KEY_ALPHABET[bytes[i] % KEY_ALPHABET.length];
  }
  return `SD-${plan.toUpperCase()}-${out}`;
}

/**
 * Verifica che la richiesta arrivi davvero da Stripe.
 *
 * Senza questo controllo chiunque potrebbe chiamare l'endpoint e farsi
 * emettere una licenza gratis: è il punto in cui si decide chi ha pagato.
 */
async function verifyStripeSignature(rawBody, header, secret) {
  if (!header || !secret) return false;

  const parts = Object.fromEntries(
    header.split(',').map((p) => p.split('=').map((s) => s.trim()))
  );
  const timestamp = parts.t;
  const expected = parts.v1;
  if (!timestamp || !expected) return false;

  // Una firma valida ma vecchia non basta: senza finestra temporale, chi
  // intercetta una richiesta potrebbe rigiocarla all'infinito.
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${timestamp}.${rawBody}`)
  );
  const computed = [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Confronto a tempo costante: un confronto normale si ferma al primo
  // carattere diverso e lascia misurare quanto ci si è avvicinati.
  if (computed.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) {
    diff |= computed.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

/** Crea la sessione di pagamento. L'app manda solo piano e ciclo: importo e
 *  valuta li decide il server. */
export async function createCheckout(env, body) {
  const plan = PLANS[body.plan];
  if (!plan) return fail('plan_unknown');
  if (!env.STRIPE_SECRET_KEY) return fail('checkout_unavailable', 503);

  const yearly = body.cycle === 'yearly';
  const amount = yearly ? plan.yearly : plan.monthly;
  const base = new URL(body.return_to || 'https://example.invalid').origin;
  const self = env.PUBLIC_URL || '';

  const form = new URLSearchParams({
    mode: 'subscription',
    'line_items[0][quantity]': '1',
    'line_items[0][price_data][currency]': 'eur',
    'line_items[0][price_data][unit_amount]': String(amount),
    'line_items[0][price_data][recurring][interval]': yearly ? 'year' : 'month',
    'line_items[0][price_data][product_data][name]': `Social Dashboard ${plan.name}`,
    // Richiesto dall'account Stripe (tasse gestite automaticamente): senza
    // un codice fiscale sul prodotto la sessione viene rifiutata.
    // txcd_10103001 = software SaaS ad accesso remoto (nessun supporto fisico).
    'line_items[0][price_data][product_data][tax_code]': 'txcd_10103001',
    'metadata[plan]': body.plan,
    // La chiave si riscuote da qui: la pagina la mostra grande e copiabile.
    success_url: `${self}/license/claim?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${self}/license/cancelled`,
  });
  if (body.email) form.set('customer_email', body.email);

  const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: form,
  });
  if (!resp.ok) {
    console.log('stripe checkout failed', resp.status, (await resp.text()).slice(0, 300));
    return fail('checkout_failed', 502);
  }
  const data = await resp.json();
  return json({ url: data.url });
}

/** Stripe conferma il pagamento: qui nasce la licenza. */
export async function handleWebhook(env, request) {
  const raw = await request.text();
  const ok = await verifyStripeSignature(
    raw,
    request.headers.get('stripe-signature'),
    env.STRIPE_WEBHOOK_SECRET
  );
  if (!ok) return fail('bad_signature', 400);

  const event = JSON.parse(raw);
  const obj = event.data?.object || {};

  if (event.type === 'checkout.session.completed') {
    const plan = obj.metadata?.plan;
    if (!PLANS[plan]) return json({ received: true });

    const key = newLicenseKey(plan);
    const record = {
      key,
      plan,
      email: obj.customer_email || obj.customer_details?.email || '',
      customer: obj.customer || '',
      subscription: obj.subscription || '',
      status: 'active',
      issued_at: Date.now(),
    };
    await env.LICENSES.put(`key:${key}`, JSON.stringify(record));
    // Indice per session_id: serve alla pagina che mostra la chiave al
    // cliente subito dopo il pagamento.
    await env.LICENSES.put(`session:${obj.id}`, key, { expirationTtl: 60 * 60 * 24 * 30 });
    if (record.subscription) {
      await env.LICENSES.put(`sub:${record.subscription}`, key);
    }
    return json({ received: true });
  }

  // Abbonamento finito o pagamento fallito: la licenza smette di valere.
  if (event.type === 'customer.subscription.deleted' || event.type === 'invoice.payment_failed') {
    const subId = event.type === 'invoice.payment_failed' ? obj.subscription : obj.id;
    const key = subId && (await env.LICENSES.get(`sub:${subId}`));
    if (key) {
      const rec = await env.LICENSES.get(`key:${key}`, 'json');
      if (rec) {
        rec.status = 'inactive';
        rec.revoked_at = Date.now();
        await env.LICENSES.put(`key:${key}`, JSON.stringify(rec));
      }
    }
    return json({ received: true });
  }

  return json({ received: true });
}

/** L'app chiede se una chiave è valida e cosa sblocca. */
export async function verifyLicense(env, body) {
  const key = String(body.key || '').trim().toUpperCase();
  if (!key) return fail('license_missing');

  const rec = await env.LICENSES.get(`key:${key}`, 'json');
  if (!rec) return json({ valid: false, reason: 'license_not_found' });
  if (rec.status !== 'active') return json({ valid: false, reason: 'license_inactive' });

  return json({ valid: true, plan: rec.plan, email: rec.email, issued_at: rec.issued_at });
}

function page(title, bodyHtml) {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><style>
:root{color-scheme:dark}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
 background:#0f1115;color:#e8eaf0;font:16px/1.55 system-ui,-apple-system,Segoe UI,sans-serif;padding:24px}
.card{max-width:520px;width:100%;background:#171a21;border:1px solid #262b36;
 border-radius:18px;padding:32px;text-align:center}
h1{font-size:20px;margin:0 0 8px}
p{color:#9aa3b2;font-size:14px;margin:0 0 20px}
.key{font:700 20px/1.4 ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:.04em;
 background:#0f1115;border:1px solid #3a4152;border-radius:12px;padding:16px;
 word-break:break-all;user-select:all;margin-bottom:16px}
button{background:linear-gradient(135deg,#6d8cff,#9d7bff);color:#0f1115;border:0;
 border-radius:10px;padding:12px 22px;font:700 14px system-ui;cursor:pointer}
.hint{font-size:13px;color:#6f7787;margin-top:18px}
</style></head><body><div class="card">${bodyHtml}</div></body></html>`,
    { headers: { 'content-type': 'text/html; charset=utf-8' } }
  );
}

/** Pagina di atterraggio dopo il pagamento: mostra la chiave da incollare
 *  nell'app. È l'unico momento in cui il cliente la vede, quindi deve essere
 *  impossibile da sbagliare. */
export async function claimPage(env, url) {
  const sessionId = url.searchParams.get('session_id');
  if (!sessionId) {
    return page('Social Dashboard', '<h1>Missing session</h1><p>No payment session was provided.</p>');
  }

  // Il webhook e il ritorno del browser sono due corse parallele: se la
  // chiave non c'è ancora, la pagina riprova da sola invece di dire al
  // cliente che qualcosa è andato storto.
  const key = await env.LICENSES.get(`session:${sessionId}`);
  if (!key) {
    return new Response(
      `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="2">
<title>Activating…</title><style>body{margin:0;min-height:100vh;display:flex;align-items:center;
justify-content:center;background:#0f1115;color:#e8eaf0;font:16px system-ui}</style>
<div>Activating your licence…</div>`,
      { headers: { 'content-type': 'text/html; charset=utf-8' } }
    );
  }

  return page(
    'Your licence key',
    `<h1>Payment complete</h1>
<p>Copy this key and paste it into Social Dashboard under <strong>Your account</strong>.</p>
<div class="key" id="k">${key}</div>
<button onclick="navigator.clipboard.writeText(document.getElementById('k').textContent.trim());this.textContent='Copied'">Copy key</button>
<div class="hint">Keep this key: it is also in your Stripe receipt email.</div>`
  );
}

export { fail, json };
