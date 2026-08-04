# Proxy di scambio token

## Perché serve

Instagram e TikTok richiedono il **client secret** per trasformare il `code`
OAuth in un token d'accesso.

In un'app desktop distribuita non esiste un posto sicuro dove metterlo: se è
compilato dentro l'eseguibile, chiunque scarichi l'app può rileggerlo. Non è
un rischio teorico — decomprimendo il binario le stringhe si leggono in
chiaro. Meta lo dice esplicitamente nella propria documentazione: l'app
secret non va mai inserito in codice distribuito.

Questo proxy sposta i segreti su un server. L'app manda il `code` e riceve
indietro il token; il secret non lascia mai il Worker e nella build non ce
n'è traccia.

> Il client secret di Google fa eccezione: per le "installed app" Google lo
> documenta come non confidenziale, quindi resta nell'eseguibile senza
> problemi e non passa da qui.

## Deploy (Cloudflare Workers, piano gratuito)

```bash
npm install -g wrangler
wrangler login
cd oauth-proxy
wrangler deploy
```

Poi carica i segreti — restano sul server, non finiscono nel repository:

```bash
wrangler secret put INSTAGRAM_APP_ID
wrangler secret put INSTAGRAM_APP_SECRET
wrangler secret put TIKTOK_CLIENT_KEY
wrangler secret put TIKTOK_CLIENT_SECRET
```

Infine metti l'URL del Worker in `brand.py`:

```python
OAUTH_PROXY_URL = "https://social-dashboard-oauth.<tuo-sottodominio>.workers.dev"
```

e **svuota** `INSTAGRAM_APP_SECRET` e `TIKTOK_CLIENT_SECRET` nello stesso file.
Da quel momento `python check_release.py` conferma che la build è pulita.

## Verificare che funzioni

```bash
curl -X POST https://<il-tuo-worker>/exchange \
  -H 'content-type: application/json' \
  -d '{"platform":"tiktok","code":"non-valido","redirect_uri":"https://esempio"}'
```

Deve rispondere `{"error":"TikTok ha rifiutato la richiesta."}`: significa che
il Worker è raggiungibile, ha i segreti e sta parlando con TikTok. Un errore
diverso (404, 500) indica che qualcosa nel deploy non è a posto.

## Rotazione delle credenziali

Se un secret è già finito in una build distribuita va considerato compromesso
e **rigenerato**:

- Instagram: Meta for Developers → l'app → Configurazione dell'API con
  Instagram Login → *Chiave segreta di Instagram* → rigenera
- TikTok: TikTok for Developers → l'app → Credentials → rigenera il client
  secret

Dopo la rotazione aggiorna i segreti del Worker con `wrangler secret put`.
Le connessioni già attive continuano a funzionare: usano i token, non il
secret.
