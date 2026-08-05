"""
Piani e avvio del pagamento.

I dati della carta non passano MAI da questa app. Nemmeno la chiave segreta
di Stripe: sarebbe compilata dentro l'eseguibile e chiunque potrebbe
rileggerla decomprimendo il binario. La sessione di pagamento la crea il
servizio, che e' anche l'unico a poter stabilire chi ha pagato davvero -
un database dei piani che vive sul computer del cliente non e' una prova
di pagamento.
"""
import requests

# I testi viaggiano come codice + frase italiana di riserva: la pagina dei
# prezzi e' quella che incassa, e mostrarla in italiano a un cliente che ha
# scelto un'altra lingua e' il posto peggiore dove farlo.
#
# NB: nessun piano promette piu' "analisi AI". Quella funzione chiamava un
# modello a pagamento, e' stata sostituita da un'analisi calcolata in locale
# ed e' inclusa ovunque: continuare a venderla come esclusiva a pagamento
# sarebbe una promessa falsa.
PLANS = [
    {
        "id": "free",
        "name": "Free",
        "price_monthly": 0,
        "price_yearly": 0,
        "tagline_code": "plan_free_tagline",
        "tagline": "Per iniziare e capire i tuoi numeri.",
        "accounts_code": "plan_free_accounts",
        "accounts": "1 account collegato",
        "features": [
            ("plan_feat_all_socials", "Statistiche di tutti i social supportati"),
            ("plan_feat_manual_refresh", "Refresh manuale on-demand"),
            ("plan_feat_analytics", "Analitiche: top post e fasce orarie"),
            ("plan_feat_diagnostics", "Diagnostica automatica degli errori"),
            ("plan_feat_insights", "Osservazioni automatiche sui tuoi contenuti"),
        ],
        "missing": [
            ("plan_feat_history", "Storico completo con grafici di trend"),
            ("plan_feat_reports", "Report automatici"),
        ],
    },
    {
        "id": "pro",
        "name": "Pro",
        "price_monthly": 12,
        "price_yearly": 120,
        "tagline_code": "plan_pro_tagline",
        "tagline": "Per chi pubblica ogni giorno e vuole crescere.",
        "accounts_code": "plan_pro_accounts",
        "accounts": "3 account collegati",
        "popular": True,
        "features": [
            ("plan_feat_all_free", "Tutto quello che c'e' nel Free"),
            ("plan_feat_history", "Storico completo con grafici di trend"),
            ("plan_feat_compare", "Confronto tra periodi e alert sui cali"),
            ("plan_feat_hours", "Suggerimenti sugli orari di pubblicazione"),
            ("plan_feat_csv", "Esportazione dei dati in CSV"),
        ],
        "missing": [],
    },
    {
        "id": "studio",
        "name": "Studio",
        "price_monthly": 39,
        "price_yearly": 390,
        "tagline_code": "plan_studio_tagline",
        "tagline": "Per agenzie e chi gestisce piu' brand.",
        "accounts_code": "plan_studio_accounts",
        "accounts": "10 account collegati",
        "features": [
            ("plan_feat_all_pro", "Tutto quello che c'e' nel Pro"),
            ("plan_feat_workspaces", "Spazi di lavoro separati per cliente"),
            ("plan_feat_whitelabel", "Report PDF white-label automatici"),
            ("plan_feat_multiuser", "Accesso multi-utente al team"),
            ("plan_feat_priority", "Supporto prioritario"),
        ],
        "missing": [],
    },
]


def _public_plan(plan: dict) -> dict:
    """Versione per il frontend: le liste diventano {code, text} cosi'
    l'interfaccia traduce e, se una chiave manca, mostra comunque la frase."""
    out = {k: v for k, v in plan.items() if k not in ("features", "missing")}
    for key in ("features", "missing"):
        out[key] = [{"code": c, "text": txt} for c, txt in plan.get(key, [])]
    return out

PLANS_BY_ID = {p["id"]: p for p in PLANS}


def list_plans() -> dict:
    return {
        "plans": [_public_plan(p) for p in PLANS],
        "checkout_ready": checkout_ready(),
        "currency": "EUR",
    }


def _service_url() -> str:
    import brand

    return (brand.get("OAUTH_PROXY_URL") or "").rstrip("/")


def checkout_ready() -> bool:
    """Il pagamento e' disponibile se il servizio e' raggiungibile. Non
    dipende piu' da una configurazione locale: nella build del cliente non
    ci sarebbe mai stata, e il pulsante sarebbe stato spento per tutti."""
    return bool(_service_url())


def start_checkout(plan_id: str, billing_cycle: str, user_email: str = "") -> dict:
    """Chiede al servizio la pagina di pagamento per questo piano.

    L'importo lo decide il servizio, non l'app: se lo scegliesse il client,
    chi modifica l'eseguibile potrebbe farsi generare un abbonamento da zero
    euro."""
    plan = PLANS_BY_ID.get(plan_id)
    if not plan or plan_id == "free":
        return {"ok": False, "message": "plan_unknown"}

    base = _service_url()
    if not base:
        return {"ok": False, "message": "checkout_unavailable"}

    try:
        resp = requests.post(
            f"{base}/checkout",
            json={
                "plan": plan_id,
                "cycle": "yearly" if billing_cycle == "yearly" else "monthly",
                "email": user_email,
            },
            timeout=30,
        )
    except Exception:
        return {"ok": False, "message": "checkout_unavailable"}

    if not resp.ok:
        # Il dettaglio resta nei log per il debug; all'utente arriva un
        # codice, che l'interfaccia mostra nella sua lingua.
        print(f"[billing] checkout failed {resp.status_code}: {resp.text[:200]}")
        return {"ok": False, "message": "checkout_unavailable"}

    url = resp.json().get("url")
    if not url:
        return {"ok": False, "message": "checkout_unavailable"}
    return {"ok": True, "checkout_url": url}
