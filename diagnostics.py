"""
Diagnostica automatica calcolata da codice (zero chiamate AI, zero costo,
istantanea).

Non si limita a "l'API risponde": i controlli piu' utili per chi pubblica
sono quelli sul contenuto - da quanti giorni un account e' fermo, se un
canale ha video ma nessuna visualizzazione, se un account non ha ancora
dati. Un problema di token va segnalato, ma un account fermo da due
settimane e' altrettanto importante e nessuna API te lo dice.

Ogni voce ha: severita', categoria, titolo breve, dettaglio, prossimo passo
e - dove ha senso - un'azione che il frontend puo' trasformare in bottone.
"""
import time
from datetime import datetime, timezone

import config

# Soglie di "contenuto fermo", in giorni.
STALE_WARN_DAYS = 4
STALE_BAD_DAYS = 8


def _days_since(iso_or_unix, is_unix: bool = False) -> float | None:
    if not iso_or_unix:
        return None
    try:
        if is_unix:
            ts = float(iso_or_unix)
        else:
            ts = datetime.fromisoformat(str(iso_or_unix).replace("Z", "+00:00")).timestamp()
    except (ValueError, TypeError):
        return None
    return (time.time() - ts) / 86400


def _latest_days(items, field, is_unix=False) -> float | None:
    """Giorni trascorsi dalla pubblicazione piu' recente della lista."""
    best = None
    for item in items or []:
        days = _days_since(item.get(field), is_unix)
        if days is not None and (best is None or days < best):
            best = days
    return best


def _has_accounts(platform: str) -> bool:
    """C'e' almeno un account per questa piattaforma, collegato dall'app o
    configurato a mano? Serve a distinguere "non hai ancora dati" da "non
    hai ancora collegato niente": al primo avvio suggerire un Refresh che
    non puo' trovare nulla manderebbe l'utente contro un muro."""
    import os

    env_lists = {"youtube": "YT_CHANNELS", "instagram": "IG_ACCOUNTS", "tiktok": "TT_ACCOUNTS"}
    var = env_lists.get(platform)
    if var and os.environ.get(var, "").strip():
        return True
    try:
        import connections
        return bool(connections.list_connections(platform))
    except Exception:
        return False


def _no_account_issue(platform: str, label: str) -> dict:
    return _issue(
        "yellow", "Da collegare", f"Nessun account {label}",
        f"Non hai ancora collegato nessun account {label}.",
        "Premi Collega e accedi: bastano pochi secondi.",
        platform, {"type": "goto", "section": "connections"},
    )


def _issue(severity, category, title, text, next_step, platform=None, action=None) -> dict:
    out = {
        "severity": severity, "category": category, "title": title,
        "text": text, "next_step": next_step,
    }
    if platform:
        out["platform"] = platform
    if action:
        out["action"] = action
    return out


def _classify_error(err: str) -> tuple[str, str]:
    """Riconosce pattern comuni negli errori OAuth/API per dare una categoria
    e un prossimo passo concreto invece di un generico 'errore sconosciuto'."""
    low = (err or "").lower()
    if "video.list" in low:
        return ("Permesso non concesso", "Serve l'approvazione del permesso di lettura statistiche sul portale sviluppatori della piattaforma - non e' risolvibile dall'app.")
    if "invalid_grant" in low or "expired" in low or "revoked" in low:
        return ("Accesso scaduto", "Ricollega questo account: l'autorizzazione e' scaduta o e' stata revocata.")
    if "invalid_scope" in low:
        return ("Permessi non allineati", "I permessi richiesti non coincidono con quelli concessi in origine: ricollega l'account per riallinearli.")
    if "permission" in low or "#10" in low or "does not have permission" in low:
        return ("Permesso mancante", "L'account non ha concesso il permesso richiesto: ricollegalo accettando tutte le richieste.")
    if "quota" in low or "rate limit" in low or "429" in low:
        return ("Troppe richieste", "Attendi qualche minuto prima del prossimo aggiornamento: il limite della piattaforma e' stato raggiunto.")
    if "401" in low or "unauthorized" in low or "authentication" in low:
        return ("Credenziali non valide", "Ricollega l'account per rigenerare l'accesso.")
    if "404" in low or "not found" in low:
        return ("Account non trovato", "L'account collegato non risulta piu' raggiungibile: potrebbe essere stato rimosso o rinominato.")
    if "timeout" in low or "connection" in low or "network" in low:
        return ("Problema di rete", "Riprova l'aggiornamento: sembra un problema temporaneo di connessione.")
    return ("Errore non classificato", "Riprova l'aggiornamento; se persiste, ricollega l'account.")


def _check_content_freshness(label: str, name: str, days: float | None, platform: str) -> dict | None:
    """Il controllo piu' utile per chi pubblica: da quanto e' fermo."""
    if days is None:
        return None
    d = int(days)
    if days >= STALE_BAD_DAYS:
        return _issue("red", "Contenuto fermo", f"{name}: fermo da {d} giorni",
                      f"L'ultimo contenuto su {label} risale a {d} giorni fa.",
                      "Pubblica qualcosa: le piattaforme premiano la costanza e la copertura cala in fretta con i profili inattivi.",
                      platform)
    if days >= STALE_WARN_DAYS:
        return _issue("yellow", "Ritmo in calo", f"{name}: ultimo post {d} giorni fa",
                      f"Su {label} non esce nulla da {d} giorni.",
                      "Torna al ritmo abituale prima che la copertura inizi a scendere.",
                      platform)
    return None


def _check_youtube(data: dict) -> list[dict]:
    if not _has_accounts("youtube"):
        return [_no_account_issue("youtube", "YouTube")]
    if not data:
        return [_issue("yellow", "Dati mancanti", "YouTube senza dati", "Nessun dato ancora caricato.", "Premi Refresh per caricare i dati.", "youtube")]
    issues = []
    channels = data.get("channels", [])
    if not channels:
        return [_issue("yellow", "Nessun account", "Nessun canale YouTube",
                       "Non hai ancora collegato nessun canale YouTube.",
                       "Vai in Collega account e collega il tuo canale in un clic.",
                       "youtube", {"type": "goto", "section": "connections"})]

    for c in channels:
        if not c.get("ok"):
            category, step = _classify_error(c.get("error", ""))
            issues.append(_issue("red", category, f"{c.get('name')}: non risponde",
                                 str(c.get("error", ""))[:220], step, "youtube",
                                 {"type": "goto", "section": "connections"}))
            continue

        stale = _check_content_freshness("YouTube", c.get("name"), _latest_days(c.get("recent_videos"), "published"), "youtube")
        if stale:
            issues.append(stale)

        if c.get("video_count", 0) > 0 and c.get("recent_views_last10", 0) == 0:
            issues.append(_issue("yellow", "Nessuna visualizzazione", f"{c.get('name')}: 0 views sugli ultimi video",
                                 "Gli ultimi video pubblicati non hanno ancora nessuna visualizzazione.",
                                 "Se sono appena usciti e' normale; se hanno qualche giorno, rivedi titolo, miniatura e primi secondi.",
                                 "youtube"))

    if not issues:
        issues.append(_issue("green", "Tutto a posto", f"YouTube: {len(channels)} canali in regola",
                             "Tutti i canali rispondono e pubblicano con costanza.", "Nessuna azione richiesta.", "youtube"))
    return issues


def _check_instagram(data: dict) -> list[dict]:
    if not _has_accounts("instagram"):
        return [_no_account_issue("instagram", "Instagram")]
    if not data:
        return [_issue("yellow", "Dati mancanti", "Instagram senza dati", "Nessun dato ancora caricato.", "Premi Refresh per caricare i dati.", "instagram")]
    issues = []
    accounts = data.get("accounts", [])
    if not accounts:
        return [_issue("yellow", "Nessun account", "Nessun account Instagram",
                       "Non hai ancora collegato nessun account Instagram.",
                       "Vai in Collega account per aggiungerne uno.",
                       "instagram", {"type": "goto", "section": "connections"})]

    for a in accounts:
        if not a.get("ok"):
            category, step = _classify_error(a.get("error", ""))
            issues.append(_issue("red", category, f"{a.get('name')}: non risponde",
                                 str(a.get("error", ""))[:220], step, "instagram",
                                 {"type": "goto", "section": "connections"}))
            continue

        stale = _check_content_freshness("Instagram", a.get("name"), _latest_days(a.get("recent_posts"), "timestamp"), "instagram")
        if stale:
            issues.append(stale)

    if not issues:
        issues.append(_issue("green", "Tutto a posto", f"Instagram: {len(accounts)} account in regola",
                             "Tutti gli account rispondono e pubblicano con costanza.", "Nessuna azione richiesta.", "instagram"))
    return issues


def _check_tiktok(data: dict) -> list[dict]:
    if not _has_accounts("tiktok"):
        return [_no_account_issue("tiktok", "TikTok")]
    if not data:
        return [_issue("yellow", "Dati mancanti", "TikTok senza dati", "Nessun dato ancora caricato.", "Premi Refresh per caricare i dati.", "tiktok")]
    issues = []
    accounts = data.get("accounts", [])
    if not accounts:
        return [_issue("yellow", "Nessun account", "Nessun account TikTok",
                       "Non hai ancora collegato nessun account TikTok.",
                       "Vai in Collega account per aggiungerne uno.",
                       "tiktok", {"type": "goto", "section": "connections"})]

    for a in accounts:
        if a.get("not_configured"):
            issues.append(_issue("yellow", "Da configurare", f"{a.get('name')}: non configurato",
                                 "L'account e' elencato ma non ha credenziali associate.",
                                 "Collega l'account, oppure rimuovilo dall'elenco se non ti serve.",
                                 "tiktok", {"type": "goto", "section": "connections"}))
            continue
        if not a.get("ok"):
            category, step = _classify_error(a.get("error", ""))
            issues.append(_issue("red", category, f"{a.get('name')}: non risponde",
                                 str(a.get("error", ""))[:220], step, "tiktok"))
            continue

        stale = _check_content_freshness("TikTok", a.get("name"), _latest_days(a.get("recent_videos"), "create_time", is_unix=True), "tiktok")
        if stale:
            issues.append(stale)

    if not issues:
        issues.append(_issue("green", "Tutto a posto", f"TikTok: {len(accounts)} account in regola",
                             "Tutti gli account rispondono e pubblicano con costanza.", "Nessuna azione richiesta.", "tiktok"))
    return issues


def _check_x(data: dict) -> list[dict]:
    if not data:
        return [_issue("yellow", "Dati mancanti", "X senza dati", "Nessun dato ancora caricato.", "Premi Refresh per caricare i dati.", "x")]
    if not data.get("credentials_configured"):
        return [_issue("yellow", "Non collegato", "X non collegato",
                       "Nessuna credenziale X configurata.",
                       "X non espone le statistiche di lettura sul piano gratuito: al momento la sezione resta informativa.",
                       "x")]
    return [_issue("green", "Collegato", "X collegato",
                   "Credenziali presenti. Le statistiche di lettura non sono disponibili sul piano gratuito di X.",
                   "Nessuna azione richiesta.", "x")]


def _check_certsprint(data: dict) -> list[dict]:
    if not data:
        return [_issue("yellow", "Dati mancanti", "CertSprint senza dati", "Nessun dato ancora caricato.", "Premi Refresh per caricare i dati.", "certsprint")]
    issues = []
    uptime = data.get("uptime", {})
    if not uptime.get("up"):
        issues.append(_issue("red", "Sito non raggiungibile", "CertSprint offline",
                             f"Il sito non risponde ({uptime.get('error', 'errore sconosciuto')}).",
                             "Verifica che il deploy sia attivo e che l'URL configurato sia corretto.", "certsprint"))
    elif uptime.get("latency_ms", 0) > 2000:
        issues.append(_issue("yellow", "Performance", "CertSprint lento",
                             f"Il sito risponde in {uptime['latency_ms']}ms.",
                             "Controlla i log dell'hosting: possibile cold start o carico elevato.", "certsprint"))

    vulns = data.get("npm_audit", {}).get("vulnerabilities", {})
    if vulns.get("critical") or vulns.get("high"):
        issues.append(_issue("red", "Sicurezza dipendenze", "Vulnerabilita' da correggere",
                             f"{vulns.get('critical', 0)} critiche e {vulns.get('high', 0)} alte rilevate da npm audit.",
                             "Esegui 'npm audit fix' nel repo, verifica i breaking change e ricontrolla.", "certsprint"))
    elif vulns.get("moderate"):
        issues.append(_issue("yellow", "Sicurezza dipendenze", "Vulnerabilita' moderate",
                             f"{vulns['moderate']} vulnerabilita' moderate rilevate.",
                             "Pianifica un 'npm audit fix' quando puoi, non e' urgente.", "certsprint"))

    lint = data.get("eslint", {})
    if lint.get("configured") and lint.get("errors"):
        issues.append(_issue("yellow", "Qualita' codice", f"{lint['errors']} errori ESLint",
                             "Il linter segnala errori nel repo.",
                             "Esegui 'npx eslint . --fix' e correggi manualmente i residui.", "certsprint"))

    if not issues:
        issues.append(_issue("green", "Tutto a posto", "CertSprint in salute",
                             "Sito online, nessuna vulnerabilita' rilevante, codice pulito.", "Nessuna azione richiesta.", "certsprint"))
    return issues


CHECKS = {
    "youtube": _check_youtube,
    "instagram": _check_instagram,
    "tiktok": _check_tiktok,
    "x": _check_x,
    "certsprint": _check_certsprint,
}


def run_diagnostics(snapshot: dict) -> dict:
    all_issues = []
    for platform in config.enabled_platforms():
        check_fn = CHECKS.get(platform)
        if not check_fn:
            continue
        for issue in check_fn(snapshot.get(platform)):
            all_issues.append({"platform": platform, **issue})

    order = {"red": 0, "yellow": 1, "green": 2}
    all_issues.sort(key=lambda i: order.get(i["severity"], 3))

    counts = {"red": 0, "yellow": 0, "green": 0}
    for i in all_issues:
        counts[i["severity"]] = counts.get(i["severity"], 0) + 1

    total = len(all_issues) or 1
    # Un giallo pesa meta' di un verde mancato: e' un avviso, non un guasto.
    score = round(((counts["green"] + counts["yellow"] * 0.5) / total) * 100)

    return {"issues": all_issues, "counts": counts, "score": score}
