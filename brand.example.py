"""
Credenziali delle app OAuth del prodotto.

Queste appartengono all'applicazione, non all'utente finale: vengono
compilate dentro l'eseguibile una volta sola, cosi' chi scarica la
dashboard non deve registrare nulla da nessuna parte. Preme "Collega",
accede al proprio account, fine.

Per le applicazioni desktop il "client secret" non e' una credenziale
davvero segreta - Google e le altre piattaforme lo prevedono esplicitamente
per questo tipo di client, che non puo' custodire segreti. Vale comunque la
regola di non riusare qui le credenziali dei bot personali.

Ogni valore puo' essere sovrascritto da .env con lo stesso nome, utile in
sviluppo senza dover ricompilare.

--------------------------------------------------------------------------
COME USARLO: copia questo file in brand.py (che resta fuori da git, vedi
.gitignore) e riempi i valori con le credenziali della tua app. brand.py
non va MAI committato: contiene segreti reali una volta compilato.
--------------------------------------------------------------------------
"""
import os

# --- Google / YouTube -------------------------------------------------
GOOGLE_CLIENT_ID = ""
GOOGLE_CLIENT_SECRET = ""

# --- Instagram (Meta) -------------------------------------------------
# Il redirect deve essere un URL HTTPS registrato nell'app Meta. Non serve
# che la pagina esista davvero: il login avviene dentro la finestra
# dell'app, che intercetta il redirect prima che venga caricato.
INSTAGRAM_APP_ID = ""
INSTAGRAM_APP_SECRET = ""
INSTAGRAM_REDIRECT_URI = ""

# Endpoint che custodisce i client secret al posto dell'eseguibile: con
# questo valorizzato, i due *_SECRET qui sotto restano vuoti e non finiscono
# nella build. Vedi oauth-proxy/README.md.
OAUTH_PROXY_URL = ""

# --- TikTok -----------------------------------------------------------
TIKTOK_CLIENT_KEY = ""
TIKTOK_CLIENT_SECRET = ""
TIKTOK_REDIRECT_URI = ""


def get(name: str) -> str:
    """Valore da .env se presente, altrimenti quello compilato nell'app."""
    return os.environ.get(name) or globals().get(name, "") or ""


def configured(*names: str) -> bool:
    return all(get(n) for n in names)
