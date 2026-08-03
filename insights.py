"""
Analisi criticita' on-demand: chiamata diretta all'API Anthropic (modello
economico, default Haiku) SOLO quando l'utente preme "Analizza" su una
sezione della dashboard - mai automaticamente su un refresh, e sempre
mirata a UNA piattaforma alla volta per tenere il prompt piccolo (meno
token = meno costo per click). E' una chiamata API a pagamento separata
(chiave ANTHROPIC_API_KEY), non i token di una sessione Claude Code.
"""
import json
import os

from anthropic import Anthropic

PLATFORM_LABELS = {
    "youtube": "canali YouTube (subscribers, views, video recenti)",
    "instagram": "account Instagram (follower, like, commenti, post recenti)",
    "tiktok": "account TikTok (views, like, commenti, share)",
    "x": "account X/Twitter (solo stato credenziali, niente metriche sul piano free)",
    "certsprint": "audit tecnico del sito CertSprint (npm audit, eslint, uptime)",
}

SYSTEM_PROMPT_TEMPLATE = (
    "Sei un analista che riceve uno snapshot JSON con le statistiche di {label}. "
    "Individua SOLO criticita' concrete e non ovvie: crolli di engagement, post/video "
    "che sotto-performano rispetto alla media dell'account, problemi tecnici gravi, "
    "credenziali mancanti. Se non trovi nulla di rilevante, dillo chiaramente invece "
    "di inventare problemi. Rispondi in italiano, in elenco puntato, massimo 6 punti, "
    "ognuno di una riga."
)


def generate_insights(snapshot: dict, platform: str = "all") -> str:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return "ANTHROPIC_API_KEY non configurata: aggiungila al .env per abilitare l'analisi."

    model = os.environ.get("INSIGHTS_MODEL", "claude-haiku-4-5-20251001")
    client = Anthropic(api_key=api_key)

    label = PLATFORM_LABELS.get(platform, "tutti i social e il sito CertSprint")
    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(label=label)

    try:
        message = client.messages.create(
            model=model,
            max_tokens=500,
            system=system_prompt,
            messages=[{"role": "user", "content": json.dumps(snapshot, default=str)}],
        )
        return "".join(block.text for block in message.content if block.type == "text")
    except Exception as exc:
        return f"Analisi non disponibile: {exc}"
