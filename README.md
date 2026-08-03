# Social Dashboard

Tutti i tuoi account social in un'unica finestra. Collega gli account, premi
Refresh e vedi come stai andando davvero — senza aprire sei app diverse.

![Social Dashboard](icon_preview.png)

## Cosa fa

- **Panoramica unica** di YouTube, Instagram, TikTok e X, con andamento nel tempo
- **Analitiche** che rispondono a "cosa funziona e quando conviene pubblicare":
  contenuti migliori e grafico delle 24 ore per fascia di pubblicazione
- **Diagnostica** che non si limita a dire se le API rispondono: segnala gli
  account fermi da troppi giorni, i contenuti senza visualizzazioni e i
  problemi di accesso, con il prossimo passo da fare
- **Analisi AI on-demand** (facoltativa, a consumo) su richiesta esplicita
- **Esportazione CSV** dei dati raccolti
- 8 temi, 6 lingue (IT/EN/ES/FR/DE/JA)

## Privacy

Le autorizzazioni degli account restano **solo sul tuo computer**, in un
database locale accanto all'applicazione. Non passano da nessun server:
l'app parla direttamente con le API delle piattaforme.

L'unica funzione che invia dati all'esterno è l'analisi AI, e solo quando
premi tu il pulsante "Analizza".

## Installazione

Scarica l'ultima release, estrai lo ZIP e avvia `Social Dashboard.exe`.
Nessuna installazione, nessuna configurazione.

Al primo avvio Windows può mostrare un avviso SmartScreen perché
l'eseguibile non è firmato digitalmente: "Ulteriori informazioni" →
"Esegui comunque".

## Collegare gli account

Apri **Collega account**, premi il pulsante della piattaforma, accedi.
L'app chiede solo l'accesso in **sola lettura** alle statistiche.

Disponibilità per piattaforma:

| Piattaforma | Stato |
|---|---|
| YouTube | Collegamento diretto |
| Instagram | Richiede le credenziali dell'app nella build |
| TikTok | Richiede l'approvazione del permesso di lettura statistiche |
| X | Le metriche di lettura non esistono sul piano gratuito |

## Sviluppo

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python desktop_app.py
```

Per lavorare solo sul backend/frontend senza finestra nativa:

```bash
python -m uvicorn app:app --port 8787 --reload
```

La configurazione manuale (facoltativa) si fa copiando `.env.example` in
`.env`. Per l'uso normale non serve: gli account si collegano dall'app.

### Compilare l'eseguibile

```bash
pyinstaller --noconfirm "Social Dashboard.spec"
```

Il risultato finisce in `dist/Social Dashboard/`. `.env` e `cache.db` non
fanno parte della build e non vanno mai distribuiti.

### Modalità

`APP_MODE` distingue la build pubblica da quella personale:

- `customer` (default) — solo le piattaforme social
- `personal` — include anche i moduli personali

Il default è volutamente `customer`: una build distribuita per errore senza
la variabile non espone i moduli personali.

## Struttura

```
app.py            API FastAPI e orchestrazione del refresh
connections.py    Collegamento account via OAuth
platforms/        Un adapter per piattaforma
diagnostics.py    Controlli automatici (nessuna chiamata AI)
analytics.py      Statistiche calcolate localmente
trends.py         Serie storiche e variazioni
auth.py           Registrazione e login locali
billing.py        Piani e checkout Stripe
static/           Interfaccia (HTML/CSS/JS, senza framework)
```

## Licenza

Tutti i diritti riservati.
