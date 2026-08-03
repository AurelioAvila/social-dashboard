"""
Piani e avvio del pagamento.

I dati della carta non passano MAI da questa app: si crea una Checkout
Session su Stripe e si manda l'utente sulla pagina ospitata da Stripe.
Se STRIPE_SECRET_KEY non e' configurata l'endpoint lo dice apertamente
invece di simulare un acquisto riuscito.
"""
import os

import requests

PLANS = [
    {
        "id": "free",
        "name": "Free",
        "price_monthly": 0,
        "price_yearly": 0,
        "tagline": "Per iniziare e capire i tuoi numeri.",
        "accounts": "2 account collegati",
        "features": [
            "Statistiche di tutti i social supportati",
            "Refresh manuale on-demand",
            "Analitiche: top post e fasce orarie",
            "Diagnostica automatica degli errori",
        ],
        "missing": ["Analisi AI delle criticita'", "Storico e trend", "Report automatici"],
    },
    {
        "id": "pro",
        "name": "Pro",
        "price_monthly": 12,
        "price_yearly": 120,
        "tagline": "Per chi pubblica ogni giorno e vuole crescere.",
        "accounts": "15 account collegati",
        "popular": True,
        "features": [
            "Tutto quello che c'e' nel Free",
            "Analisi AI delle criticita' on-demand",
            "Storico completo con grafici di trend",
            "Confronto tra periodi e alert sui cali",
            "Suggerimenti sugli orari di pubblicazione",
            "Esportazione dei dati in CSV",
        ],
        "missing": [],
    },
    {
        "id": "studio",
        "name": "Studio",
        "price_monthly": 39,
        "price_yearly": 390,
        "tagline": "Per agenzie e chi gestisce piu' brand.",
        "accounts": "Account illimitati",
        "features": [
            "Tutto quello che c'e' nel Pro",
            "Spazi di lavoro separati per cliente",
            "Report PDF white-label automatici",
            "Analisi AI programmata ogni giorno",
            "Accesso multi-utente al team",
            "Supporto prioritario",
        ],
        "missing": [],
    },
]

PLANS_BY_ID = {p["id"]: p for p in PLANS}


def list_plans() -> dict:
    return {
        "plans": PLANS,
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
