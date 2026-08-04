"""
Piani e avvio del pagamento.

I dati della carta non passano MAI da questa app: si crea una Checkout
Session su Stripe e si manda l'utente sulla pagina ospitata da Stripe.
Se STRIPE_SECRET_KEY non e' configurata l'endpoint lo dice apertamente
invece di simulare un acquisto riuscito.
"""
import os

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
        "checkout_ready": bool(os.environ.get("STRIPE_SECRET_KEY")),
        "currency": "EUR",
    }


def create_checkout_session(plan_id: str, billing_cycle: str, user_email: str) -> dict:
    """Crea una Stripe Checkout Session e restituisce l'URL ospitato da Stripe.
    L'utente inserisce i dati di pagamento solo su quella pagina, mai qui."""
    plan = PLANS_BY_ID.get(plan_id)
    if not plan:
        raise ValueError(f"Piano sconosciuto: {plan_id}")
    if plan_id == "free":
        raise ValueError("Il piano Free non richiede pagamento.")

    secret_key = os.environ.get("STRIPE_SECRET_KEY")
    if not secret_key:
        return {
            "ok": False,
            "reason": "not_configured",
            "message": (
                "Pagamenti non ancora attivi: manca STRIPE_SECRET_KEY nel .env. "
                "Aggiungi la chiave del tuo account Stripe per abilitare il checkout."
            ),
        }

    yearly = billing_cycle == "yearly"
    amount = plan["price_yearly"] if yearly else plan["price_monthly"]
    interval = "year" if yearly else "month"
    base_url = os.environ.get("APP_PUBLIC_URL", "http://127.0.0.1:8787")

    # Si usa l'API HTTP direttamente invece dell'SDK stripe: una dipendenza in
    # meno da bundlare nell'eseguibile, e serve una sola chiamata.
    resp = requests.post(
        "https://api.stripe.com/v1/checkout/sessions",
        auth=(secret_key, ""),
        data={
            "mode": "subscription",
            "success_url": f"{base_url}/?checkout=success",
            "cancel_url": f"{base_url}/?checkout=cancelled",
            "customer_email": user_email,
            "line_items[0][quantity]": 1,
            "line_items[0][price_data][currency]": "eur",
            "line_items[0][price_data][unit_amount]": amount * 100,
            "line_items[0][price_data][recurring][interval]": interval,
            "line_items[0][price_data][product_data][name]": f"Social Dashboard {plan['name']}",
            "metadata[plan_id]": plan_id,
        },
        timeout=30,
    )
    if resp.status_code >= 400:
        detail = resp.json().get("error", {}).get("message", resp.text[:200])
        return {"ok": False, "reason": "stripe_error", "message": detail}

    return {"ok": True, "checkout_url": resp.json()["url"]}
