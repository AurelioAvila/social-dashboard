import os
import sys
import threading
import time
import webbrowser

from dotenv import load_dotenv

# In un .exe compilato (PyInstaller) i file bundlati finiscono in una cartella
# temporanea (_MEIPASS) che sparisce ad ogni riavvio - .env e il database
# devono invece restare accanto all'eseguibile vero, altrimenti si perde la
# configurazione e lo storico ad ogni apertura.
APP_DIR = os.path.dirname(sys.executable) if getattr(sys, "frozen", False) else os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(APP_DIR, ".env"))

from fastapi import Body, FastAPI, Header, HTTPException
from fastapi.responses import PlainTextResponse
from fastapi.staticfiles import StaticFiles

import analytics
import cache
import config
import diagnostics
import trends

app = FastAPI(title="Social Stats Dashboard")

# Le piattaforme attive dipendono dalla modalita' (personale o cliente):
# i moduli personali come CertSprint non esistono nella build distribuita.
PLATFORM_NAMES = config.enabled_platforms()
_module_cache = {}


def _get_module(name: str):
    """Import pigro: le librerie delle singole piattaforme (in particolare
    google-api-python-client per YouTube) sono pesanti da caricare - farlo
    solo quando serve davvero (al primo refresh) invece che all'avvio
    dell'app taglia parecchio il tempo di apertura della finestra.

    NB: import statici dentro funzioni (non importlib con stringa dinamica)
    - PyInstaller analizza l'AST e li rileva comunque per bundlarli, mentre
    un importlib.import_module(f"...") gli resta invisibile e il modulo
    finisce per mancare nell'eseguibile compilato."""
    if name in _module_cache:
        return _module_cache[name]

    if name == "youtube":
        from platforms import youtube as mod
    elif name == "instagram":
        from platforms import instagram as mod
    elif name == "tiktok":
        from platforms import tiktok as mod
    elif name == "x":
        from platforms import x as mod
    elif name == "certsprint":
        from platforms import certsprint as mod
    else:
        raise ValueError(f"Piattaforma sconosciuta: {name}")

    _module_cache[name] = mod
    return mod


_refresh_state = {"running": False, "done": [], "done_units": 0, "total_units": len(PLATFORM_NAMES)}
_refresh_lock = threading.Lock()
_units_lock = threading.Lock()


@app.get("/api/snapshot")
def get_snapshot():
    """Dati piu' recenti gia' salvati - nessuna chiamata esterna, per un
    caricamento istantaneo e a costo zero ogni volta che si apre l'app."""
    import insights

    out = {}
    for platform in PLATFORM_NAMES:
        out[platform] = cache.latest_snapshot(platform)
    # Le osservazioni sono aritmetica sui dati gia' in memoria: costano
    # nulla, quindi arrivano insieme allo snapshot invece di dietro a un
    # pulsante che l'utente deve sapere di dover premere.
    out["insights"] = {p: insights.generate_insights(out, platform=p) for p in PLATFORM_NAMES}
    out["diagnostics"] = diagnostics.run_diagnostics(out)
    out["analytics"] = analytics.compute_analytics(out)
    out["trends"] = trends.compute_trends()
    fetch_times = [out[p]["fetched_at"] for p in PLATFORM_NAMES if out.get(p) and out[p].get("fetched_at")]
    out["analytics"]["last_refresh_at"] = max(fetch_times) if fetch_times else None
    return out


def _on_unit_done():
    # `+= 1` su un valore condiviso e' una read-modify-write, non
    # un'operazione atomica: con piu' thread di refresh in parallelo due
    # incrementi possono sovrapporsi e perdersi, facendo fermare la barra
    # sotto il 100%. Serve il lock esplicito.
    with _units_lock:
        _refresh_state["done_units"] += 1


def _refresh_one(name: str):
    module = _get_module(name)
    try:
        data = module.fetch_stats(on_item=_on_unit_done)
    except Exception as exc:
        data = {"platform": name, "ok": False, "error": str(exc)}
        _on_unit_done()
    cache.save_snapshot(name, data)
    _refresh_state["done"].append(name)


def _refresh_worker():
    """Tutte le piattaforme in parallelo (non una alla volta) - il tempo
    totale resta quello della piu' lenta, non la somma di tutte. Il
    progresso e' granulare per singola unita' di lavoro (un canale YouTube,
    un account Instagram, un controllo CertSprint, ...) invece che per
    piattaforma intera, cosi' la barra avanza in modo continuo invece di
    stare ferma su 5 grandi blocchi."""
    threads = [threading.Thread(target=_refresh_one, args=(name,)) for name in PLATFORM_NAMES]
    for t in threads:
        t.start()
        # Piccolo sfasamento tra l'avvio di una piattaforma e la successiva -
        # evita che tutte le richieste OAuth/HTTP partano nello stesso istante
        # esatto, riducendo la probabilita' di errori intermittenti osservati
        # lato server (es. invalid_scope spurio) quando piu' token endpoint
        # vengono colpiti in un burst perfettamente simultaneo.
        time.sleep(0.4)
    for t in threads:
        t.join()
    _refresh_state["running"] = False


@app.post("/api/refresh")
def refresh_all():
    """Avvia il refresh in background e ritorna subito - il progresso reale
    si legge da /api/refresh/status, cosi' la barra di caricamento riflette
    il lavoro vero invece di una stima finta."""
    with _refresh_lock:
        if _refresh_state["running"]:
            return dict(_refresh_state)
        total_units = 0
        for name in PLATFORM_NAMES:
            try:
                total_units += _get_module(name).count_units()
            except Exception:
                total_units += 1
        _refresh_state["running"] = True
        _refresh_state["done"] = []
        _refresh_state["done_units"] = 0
        _refresh_state["total_units"] = max(total_units, 1)
        threading.Thread(target=_refresh_worker, daemon=True).start()
    return dict(_refresh_state)


@app.get("/api/refresh/status")
def refresh_status():
    return {**_refresh_state, "done_count": len(_refresh_state["done"])}


@app.post("/api/insights/{platform}")
def get_platform_insights(platform: str):
    """Analisi della piattaforma calcolata dal codice: istantanea e gratuita,
    quindi non serve piu' ne' cache ne' un pulsante che la chieda - viene
    gia' inclusa in /api/snapshot. L'endpoint resta per compatibilita'."""
    if platform not in PLATFORM_NAMES:
        raise HTTPException(404, f"Piattaforma sconosciuta: {platform}")

    import insights
    snap = cache.latest_snapshot(platform)
    return {"generated_at": int(time.time()), "items": insights.generate_insights({platform: snap}, platform=platform)}


# ---------------------------------------------------------------- config

@app.get("/api/config")
def get_config():
    """Il frontend usa questo per sapere quali sezioni mostrare, invece di
    avere l'elenco delle piattaforme scritto a mano in due posti diversi."""
    return config.public_config()


# ------------------------------------------------------------ connessioni

@app.get("/api/connections")
def get_connections():
    import connections
    platforms = list(connections.CONNECTORS) + list(connections.GUIDED) + list(connections.UNAVAILABLE)
    platforms = list(dict.fromkeys(platforms))
    reasons = {p: connections.unavailable_reason(p) for p in platforms}
    return {
        "connections": connections.public_connections(),
        # Motivo per ogni piattaforma non collegabile: credenziali assenti
        # nella build oppure limite della piattaforma stessa.
        "unavailable": {p: r for p, r in reasons.items() if r},
        "connectable": list(connections.CONNECTORS.keys()),
        "guided": list(connections.GUIDED.keys()),
        # Come si collega ciascuna: "oneclick" (basta il bottone),
        # "guided" (serve un incolla), "unavailable".
        "modes": {p: connections.connect_mode(p) for p in platforms},
    }


@app.post("/api/connections/connect/{platform}")
def connect_platform(platform: str):
    """Avvia il login OAuth: apre il browser sulla pagina della piattaforma
    e attende il ritorno su 127.0.0.1. Torna subito, il progresso si legge
    da /api/connections/status."""
    import connections
    return connections.start_connect(platform)


@app.get("/api/connections/status")
def connect_status():
    import connections
    return connections.connect_status()


@app.post("/api/connections/cancel")
def connect_cancel():
    """Sblocca un collegamento rimasto appeso (finestra chiusa, login mai
    completato) senza dover aspettare la scadenza o riavviare l'app."""
    import connections
    return connections.cancel_connect()


@app.get("/api/connections/authorize/{platform}")
def connection_authorize_url(platform: str):
    """URL da aprire per autorizzare Instagram/TikTok: non accettano un
    redirect su 127.0.0.1, quindi il ritorno va incollato a mano una volta."""
    import connections
    return connections.authorize_url(platform)


@app.post("/api/connections/finish/{platform}")
def connection_finish(platform: str, payload: dict = Body(...)):
    import connections
    return connections.finish_guided(platform, payload.get("pasted", ""))


@app.delete("/api/connections/{connection_id}")
def remove_connection(connection_id: int):
    import connections
    connections.delete_connection(connection_id)
    return {"ok": True}


# ---------------------------------------------------------------- account

def _token_from_header(authorization: str | None) -> str:
    if not authorization:
        return ""
    parts = authorization.split(None, 1)
    return parts[1].strip() if len(parts) == 2 and parts[0].lower() == "bearer" else ""


@app.post("/api/auth/register")
def auth_register(payload: dict = Body(...)):
    import auth
    try:
        return auth.register(
            payload.get("email", ""),
            payload.get("password", ""),
            payload.get("password_confirm", ""),
            payload.get("first_name", ""),
            payload.get("last_name", ""),
            payload.get("birth_date", ""),
        )
    except auth.AuthError as exc:
        raise HTTPException(400, str(exc))


@app.post("/api/auth/login")
def auth_login(payload: dict = Body(...)):
    import auth
    try:
        return auth.login(payload.get("email", ""), payload.get("password", ""))
    except auth.AuthError as exc:
        raise HTTPException(401, str(exc))


@app.post("/api/auth/logout")
def auth_logout(authorization: str | None = Header(default=None)):
    import auth
    auth.logout(_token_from_header(authorization))
    return {"ok": True}


@app.get("/api/auth/me")
def auth_me(authorization: str | None = Header(default=None)):
    import auth
    user = auth.user_for_token(_token_from_header(authorization))
    if not user:
        raise HTTPException(401, "err_session_expired")
    return {"user": user}


@app.post("/api/auth/password-strength")
def auth_password_strength(payload: dict = Body(...)):
    """Valutazione della robustezza calcolata lato server per restare
    coerente con le regole di registrazione, senza mai salvare nulla."""
    import auth
    return auth.password_strength(payload.get("password", ""))


# ---------------------------------------------------------------- pagamenti

@app.get("/api/billing/plans")
def billing_plans():
    import billing
    return billing.list_plans()


@app.post("/api/billing/checkout")
def billing_checkout(payload: dict = Body(...), authorization: str | None = Header(default=None)):
    """Prepara il pagamento su Stripe. I dati della carta non passano mai da
    qui: si restituisce l'URL della pagina di checkout ospitata da Stripe."""
    import auth
    import billing

    user = auth.user_for_token(_token_from_header(authorization))
    if not user:
        raise HTTPException(401, "err_login_required_for_plan")
    try:
        return billing.create_checkout_session(
            payload.get("plan_id", ""), payload.get("billing_cycle", "monthly"), user["email"]
        )
    except ValueError as exc:
        raise HTTPException(400, str(exc))


# ---------------------------------------------------------------- export

@app.get("/api/export.csv", response_class=PlainTextResponse)
def export_csv():
    """Esporta i dati dell'ultimo snapshot in CSV, per aprirli in Excel o
    incrociarli con altri fogli senza doverli ricopiare a mano."""
    import csv
    import io

    buf = io.StringIO()
    writer = csv.writer(buf)
    writer.writerow(["piattaforma", "account", "metrica", "valore"])

    yt = cache.latest_snapshot("youtube") or {}
    for c in yt.get("channels", []):
        if not c.get("ok"):
            continue
        for key in ("subscribers", "total_views", "video_count", "recent_views_last10"):
            writer.writerow(["youtube", c.get("name", ""), key, c.get(key, 0)])

    ig = cache.latest_snapshot("instagram") or {}
    for a in ig.get("accounts", []):
        if not a.get("ok"):
            continue
        writer.writerow(["instagram", a.get("name", ""), "followers", a.get("followers", 0)])
        for key, val in (a.get("totals_last_n") or {}).items():
            writer.writerow(["instagram", a.get("name", ""), key, val])

    tt = cache.latest_snapshot("tiktok") or {}
    for a in tt.get("accounts", []):
        if not a.get("ok"):
            continue
        for key, val in (a.get("totals_last_n") or {}).items():
            writer.writerow(["tiktok", a.get("name", ""), key, val])

    return PlainTextResponse(
        buf.getvalue(),
        headers={"Content-Disposition": 'attachment; filename="social-dashboard.csv"'},
        media_type="text/csv",
    )


app.mount("/", StaticFiles(directory=os.path.join(os.path.dirname(os.path.abspath(__file__)), "static"), html=True), name="static")


if __name__ == "__main__":
    import uvicorn

    def _open_browser():
        time.sleep(1.2)
        webbrowser.open("http://127.0.0.1:8787")

    threading.Thread(target=_open_browser, daemon=True).start()
    uvicorn.run(app, host="127.0.0.1", port=8787)
