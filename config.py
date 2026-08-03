"""
Configurazione di prodotto: distingue la build personale da quella che
verra' distribuita ai clienti.

CertSprint e' un modulo personale (audit di un repo specifico): in modalita'
"customer" non deve nemmeno comparire nell'interfaccia, altrimenti chi
scarica l'app si trova una sezione che non lo riguarda e non puo' usare.
"""
import os

# Piattaforme social, sempre disponibili a tutti.
CORE_PLATFORMS = ["youtube", "instagram", "tiktok", "x"]

# Moduli personali: visibili solo nella build personale e solo se configurati.
PERSONAL_PLATFORMS = ["certsprint"]


def app_mode() -> str:
    """'personal' oppure 'customer'. Default prudente: customer, cosi' una
    build distribuita per sbaglio senza APP_MODE non espone i moduli
    personali invece di mostrarli a tutti."""
    mode = (os.environ.get("APP_MODE") or "").strip().lower()
    return mode if mode in ("personal", "customer") else "customer"


def is_personal() -> bool:
    return app_mode() == "personal"


def enabled_platforms() -> list[str]:
    platforms = list(CORE_PLATFORMS)
    if is_personal():
        for name in PERSONAL_PLATFORMS:
            if name == "certsprint" and not os.environ.get("CERTSPRINT_PUBLIC_URL"):
                continue  # modulo personale non configurato: si salta
            platforms.append(name)
    return platforms


def public_config() -> dict:
    """Config che il frontend puo' leggere per nascondere sezioni e adattare
    i testi senza doverle indovinare."""
    return {
        "mode": app_mode(),
        "platforms": enabled_platforms(),
        "personal": is_personal(),
    }
