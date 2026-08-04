# Social Dashboard

All your social accounts in one window. Connect your accounts, hit Refresh,
and see how you're actually doing — without opening six different apps.

![Social Dashboard](icon_preview.png)

## [Download the latest version](https://github.com/AurelioAvila/social-dashboard/releases/latest)

## What it does

- **Single overview** of YouTube, Instagram, TikTok and X, with trends over time
- **Analytics** that answer "what's working and when should I post": top
  content and a 24-hour chart of the best posting windows
- **Diagnostics** that go beyond "is the API responding": flags accounts
  stalled for too many days, content with zero views, and access problems,
  each with a concrete next step
- **Automatic insights** computed locally from your own data — no AI calls,
  no extra cost
- **CSV export** of the collected data
- 8 themes, 6 languages (IT/EN/ES/FR/DE/JA)

## Privacy

Account permissions stay **only on your computer**, in a local database next
to the application. Nothing goes through an external server: the app talks
directly to each platform's API.

The only external calls are the OAuth token exchange for Instagram/TikTok,
routed through a minimal proxy that only forwards the authorization code —
it never sees or stores your data.

## Installation

Download the latest release, extract the ZIP and launch
`Social Dashboard.exe`. No install, no configuration.

On first launch Windows may show a SmartScreen warning because the
executable isn't digitally signed: "More info" → "Run anyway".

## Connecting accounts

Open **Connect account**, press the platform button, sign in. The app only
requests **read-only** access to your statistics.

Availability by platform:

| Platform | Status |
|---|---|
| YouTube | Direct connection |
| Instagram | Direct connection |
| TikTok | Requires approval of the statistics read permission |
| X | Read metrics don't exist on the free API tier |

## Development

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python desktop_app.py
```

To work on backend/frontend only, without the native window:

```bash
python -m uvicorn app:app --port 8787 --reload
```

Manual configuration (optional) is done by copying `.env.example` to `.env`.
Not needed for normal use: accounts are connected from within the app.

### OAuth app credentials (for people distributing the app)

One-click login for Instagram/TikTok/YouTube requires the product's own app
credentials, not the end user's. Copy `brand.example.py` to `brand.py` and
fill in the values created on the respective developer portals:

- **Instagram**: [developers.facebook.com/apps](https://developers.facebook.com/apps) →
  create an app → add the "Manage messages and content on Instagram" use
  case → find the App ID and App Secret under the Instagram Login
  configuration, and set the redirect URL
- **TikTok**: [developers.tiktok.com/apps](https://developers.tiktok.com/apps) →
  create an app → add "Login Kit" → request the `video.list` scope

`brand.py` **must never be committed**: once filled in it contains real
secrets. It's already excluded via `.gitignore`.

Instagram and TikTok additionally require a **token exchange proxy** so the
client secret never ships inside the executable — see
[oauth-proxy/README.md](oauth-proxy/README.md).

### Building the executable

```bash
pyinstaller --noconfirm "Social Dashboard.spec"
```

The result lands in `dist/Social Dashboard/`. `.env`, `cache.db` and
`brand.py` are not part of the build and must never be distributed as
source — only the credentials from `brand.py` end up compiled into the
executable itself (with the confidential Instagram/TikTok secrets kept out
via the proxy — run `python check_release.py --dist` to verify before
distributing).

### Modes

`APP_MODE` distinguishes the public build from the personal one:

- `customer` (default) — social platforms only
- `personal` — also includes the personal modules

The default is deliberately `customer`: a build distributed by mistake
without the variable set never exposes the personal modules.

## Structure

```
app.py            FastAPI API and refresh orchestration
connections.py    Account linking via OAuth
platforms/        One adapter per platform
diagnostics.py    Automated checks (no AI calls)
analytics.py      Locally computed statistics
trends.py         Historical series and trends
auth.py           Local registration and login
billing.py        Plans and Stripe checkout
static/           UI (HTML/CSS/JS, no framework)
```

## License

All rights reserved.
