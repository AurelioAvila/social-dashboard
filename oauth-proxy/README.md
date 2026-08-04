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

Due comandi in tutto:

```bash
npx wrangler login       # una volta sola: apre il browser sul tuo account
python deploy_proxy.py   # dalla cartella del progetto
```

`deploy_proxy.py` fa il resto da solo: pubblica il Worker, ci carica i quattro
segreti leggendoli da `brand.py`, scrive l'URL del Worker in `brand.py` e
**svuota** `INSTAGRAM_APP_SECRET` e `TIKTOK_CLIENT_SECRET`, così non finiscono
più nella build. Se qualcosa fallisce si ferma senza toccare `brand.py`.

Il login è l'unico passo che non può essere automatizzato: autentica il tuo
account Cloudflare.

Poi ricompila l'app e verifica:

```bash
python check_release.py --dist
```

<details>
<summary>Farlo a mano, se preferisci</summary>

```bash
cd oauth-proxy
npx wrangler deploy
npx wrangler secret put INSTAGRAM_APP_ID
npx wrangler secret put INSTAGRAM_APP_SECRET
npx wrangler secret put TIKTOK_CLIENT_KEY
npx wrangler secret put TIKTOK_CLIENT_SECRET
```

Poi in `brand.py`: metti l'URL del Worker in `OAUTH_PROXY_URL` e svuota i due
`*_SECRET`.
</details>

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
