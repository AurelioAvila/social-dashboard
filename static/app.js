const PLATFORM_LABELS = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
  x: "X",
  certsprint: "CertSprint",
};
const PLATFORM_ICONS = {
  youtube: "▶", instagram: "◈", tiktok: "♪", x: "✕", certsprint: "🛡",
};

// ---------- Lingua ----------
const LANGS = [
  { code: "it", name: "Italiano", locale: "it-IT" },
  { code: "en", name: "English", locale: "en-US" },
  { code: "es", name: "Español", locale: "es-ES" },
  { code: "fr", name: "Français", locale: "fr-FR" },
  { code: "de", name: "Deutsch", locale: "de-DE" },
  { code: "ja", name: "日本語", locale: "ja-JP" },
];

const I18N = {
  it: {
    overview_by_platform: "Per piattaforma",
    tile_followers: "Pubblico totale", tile_recent_views: "Views recenti", tile_recent_views_foot: "sugli ultimi contenuti",
    tile_engagement: "Interazioni", tile_engagement_foot: "like + commenti recenti",
    tile_health: "Salute", tile_accounts_foot: "account attivi",
    tile_analyzed: "Contenuti analizzati", tile_analyzed_foot: "post e video con dati",
    tile_avg_per_post: "Media per contenuto", tile_avg_per_post_foot: "views medie",
    tile_best_hour: "Ora migliore", tile_best_hour_foot: "{v} views medie",
    tile_best_platform: "Piattaforma top", tile_best_platform_foot: "{v} views totali",
    analytics_hours_hint: "Media di views per fascia oraria di pubblicazione (UTC). Le barre piene sono le ore in cui i tuoi contenuti rendono di piu'.",
    hours_tooltip: "{h}:00 - {v} views medie su {n} contenuti",
    guided_step1: "Autorizza l'account nella scheda che si e' aperta.",
    guided_step2: "Poi copia l'indirizzo della pagina su cui atterri e incollalo qui sotto.",
    guided_placeholder: "Incolla qui l'URL completo", guided_cancel: "Annulla", guided_finish: "Completa",
    guided_paste_needed: "Incolla prima l'URL di ritorno.",
    btn_link_account: "Collega", btn_link_account_full: "Collega un account",
    cm_auto_text: "Si aprira' il browser: accedi e autorizza l'accesso in sola lettura. Tutto il resto lo fa la dashboard.",
    cm_step1: "Autorizza l'account nella scheda che si apre.", cm_open: "Apri autorizzazione",
    cm_step2: "Incolla qui l'indirizzo della pagina su cui atterri.", cm_finish: "Completa collegamento",
    group_connections: "Account collegati", nav_connections: "Collega account",
    connections_subtitle: "Accedi con il tuo account e la dashboard fa il resto. Nessun token da copiare.",
    connections_privacy: "Le autorizzazioni restano salvate solo sul tuo computer, in locale. Non passano da nessun server.",
    connect_now: "Collega {p}", connect_add_another: "Collega un altro account", connect_soon: "In arrivo",
    connect_not_linked: "Non collegato", connect_linked_n: "{n} collegato/i", connect_unlink: "Scollega",
    connect_desc: "Accedi con {p} per vedere qui le tue statistiche.",
    connect_waiting: "In attesa del browser...", connect_browser_opened: "Ho aperto il browser: completa l'accesso.",
    connect_success: "{n} collegato!", connect_unlinked: "Account scollegato.",
    diag_problems: "problemi", diag_warnings: "avvisi", diag_ok: "a posto",
    diag_filter_all: "Tutto", diag_filter_problems: "Da sistemare", diag_filter_ok: "A posto",
    diag_filter_empty: "Niente da mostrare con questo filtro.", diag_go_connect: "Vai a Collega account",
    health_bad_title: "Ci sono cose da sistemare", health_bad_sub: "{n} tra problemi e avvisi richiedono la tua attenzione.",
    health_warn_title: "Quasi tutto a posto", health_warn_sub: "{n} avvisi da tenere d'occhio.",
    health_good_title: "Tutto in ordine", health_good_sub: "Nessun problema rilevato sui tuoi account.",
    group_general: "Generale", group_platforms: "Piattaforme", group_insights: "Insight",
    group_account: "Account", group_settings: "Impostazioni",
    nav_overview: "Panoramica", nav_analytics: "Analitiche", nav_diagnostics: "Diagnostica",
    nav_themes: "Temi", nav_language: "Lingua", nav_account: "Il tuo account", nav_pricing: "Piani e prezzi",
    btn_refresh: "Refresh", btn_analyze: "Analizza", btn_export: "Esporta CSV", palette_hint: "Cerca",
    analytics_subtitle: "Calcolate dal codice sui dati raccolti — post migliori e fasce orarie più performanti, zero costo AI.",
    analytics_top_posts: "🏆 Top post/video (per views)", analytics_best_hours: "🕐 Fasce orarie migliori (media views)",
    diagnostics_subtitle: "Calcolata istantaneamente dal codice, zero costo — segnala errori ed è aggiornata a ogni Refresh.",
    themes_subtitle: "Scegli l'aspetto della dashboard — resta salvato anche alla prossima apertura.",
    language_subtitle: "Scegli la lingua dell'interfaccia — resta salvata anche alla prossima apertura.",
    empty_no_data: "Nessun dato — premi Refresh.", empty_configure_yt: "Configura YT_CHANNELS nel .env.",
    empty_configure_ig: "Configura IG_ACCOUNTS nel .env.", empty_configure_tt: "Configura TT_ACCOUNTS nel .env.",
    empty_not_configured: "Non configurato.",
    label_subscribers_total: "Iscritti totali", label_channels: "Canali", label_followers_total: "Follower totali",
    label_accounts: "Account", label_accounts_configured: "Account configurati", label_credentials: "Credenziali",
    val_ok: "OK", val_missing: "Mancanti", label_site: "Sito", val_online: "Online", val_down: "Down",
    label_subscribers: "Iscritti", label_total_views: "Views totali", label_videos_published: "Video pubblicati",
    label_recent_views: "Views ultimi 10 video", label_last_publish: "Ultima pubblicazione", label_never_published: "Mai pubblicato",
    label_followers: "Follower", label_views_recent: "Views (ultimi post)", label_likes: "Like", label_comments: "Commenti",
    label_views: "Views", label_likes_comments_shares: "Like / Commenti / Share",
    val_online_latency: "Online ({ms}ms)", val_down_error: "Down / errore", label_npm_vulns: "Vulnerabilità npm",
    label_eslint: "ESLint", val_not_configured: "non configurato", val_errors_warnings: "{e} errori, {w} warning",
    insight_loading: "Analisi in corso…", insight_error: "Errore durante l'analisi: ",
    analytics_empty: "Non ci sono ancora abbastanza post/video con dati per un'analisi — premi Refresh.",
    analytics_untitled: "(senza titolo)", analytics_avg_views: "views medie", analytics_bucket_count: "post analizzati in questa fascia",
    analytics_last_refresh: "Ultimo caricamento dati: {t} ({d})", analytics_last_refresh_never: "Ultimo caricamento dati: mai — premi Refresh.",
    footer_last_refresh: "Ultimo aggiornamento: {d}", footer_never: "Mai aggiornato", footer_error: "Errore durante il refresh - riprova.",
    time_never: "mai", time_seconds_ago: "pochi secondi fa", time_min_ago: "{n} min fa", time_hours_ago: "{n} ore fa", time_days_ago: "{n} giorni fa",
    diag_next_step_label: "Prossimo passo:",
    yt_total_views_lag_note: "YouTube a volte impiega ore/giorni ad aggiornare il totale storico su canali piccoli/nuovi — non è un errore del dashboard.",
    overview_sub: "{n} account monitorati su {p} piattaforme.", overview_sub_empty: "Premi Refresh per caricare i tuoi dati.",
    trend_since: "dal precedente", trend_no_history: "Serve un altro refresh per vedere il trend.",
    account_guest: "Ospite", account_signin_hint: "Accedi per salvare",
    auth_tab_login: "Accedi", auth_tab_register: "Registrati",
    auth_title_login: "Bentornato", auth_title_register: "Crea il tuo account",
    auth_sub_login: "Accedi per sincronizzare piani e preferenze.", auth_sub_register: "Bastano trenta secondi. Nessuna carta richiesta.",
    auth_name: "Come ti chiami", auth_first_name: "Nome", auth_last_name: "Cognome", auth_birth_date: "Data di nascita",
    auth_email: "Email", auth_password: "Password", auth_password_confirm: "Conferma password",
    auth_switch_to_register: "Non hai un account?", auth_switch_to_login: "Hai già un account?",
    auth_aside_badge: "Tutto in un posto solo",
    auth_aside_title: "Smetti di aprire sei app per capire come stai andando.",
    auth_aside_1: "Tutti i tuoi account, un solo colpo d'occhio",
    auth_aside_2: "Ti dice quando un numero scende, non solo quanto vale",
    auth_aside_3: "Trova gli orari in cui i tuoi post rendono di più",
    auth_aside_4: "I token restano sul tuo computer, non su un server",
    auth_aside_foot: "Nessuna carta richiesta per iniziare.",
    auth_logout: "Esci", account_upgrade: "Passa a Pro", account_since: "Account creato il {d}",
    err_email_invalid: "Inserisci un indirizzo email valido.", err_password_short: "Almeno 8 caratteri.",
    err_required: "Campo obbligatorio.", err_birth_date_future: "La data non può essere nel futuro.",
    err_age_min: "Devi avere almeno {n} anni.", err_password_mismatch: "Le due password non coincidono.",
    toast_welcome: "Benvenuto, {n}!", toast_logged_in: "Bentornato, {n}!", toast_logged_out: "Sei uscito dall'account.",
    toast_refresh_done: "Dati aggiornati.", toast_export_done: "CSV esportato.",
    toast_login_required: "Accedi prima di scegliere un piano.",
    pricing_title: "Scegli quanto vuoi vedere", pricing_sub: "Inizia gratis. Passa a Pro quando i numeri iniziano a contare davvero.",
    pricing_monthly: "Mensile", pricing_yearly: "Annuale", pricing_save: "2 mesi gratis",
    plan_popular: "Il più scelto", plan_free_cta: "Inizia gratis", plan_cta: "Scegli {p}",
    plan_current: "Piano attuale", plan_period_month: "/mese", plan_period_year: "/anno",
    plan_billed_yearly: "{a}€ fatturati una volta l'anno", plan_billed_free: "Per sempre, senza scadenza",
    pricing_note_ready: "Pagamento sicuro tramite Stripe. Puoi disdire quando vuoi.",
    pricing_note_setup: "Checkout non ancora attivo: aggiungi STRIPE_SECRET_KEY nel .env per abilitare i pagamenti.",
    palette_placeholder: "Vai a…", palette_empty: "Nessun risultato.",
    strength_labels: "debole,debole,media,buona,ottima",
  },
  en: {
    overview_by_platform: "By platform",
    tile_followers: "Total audience", tile_recent_views: "Recent views", tile_recent_views_foot: "on latest content",
    tile_engagement: "Interactions", tile_engagement_foot: "recent likes + comments",
    tile_health: "Health", tile_accounts_foot: "active accounts",
    tile_analyzed: "Content analyzed", tile_analyzed_foot: "posts and videos with data",
    tile_avg_per_post: "Average per post", tile_avg_per_post_foot: "average views",
    tile_best_hour: "Best hour", tile_best_hour_foot: "{v} average views",
    tile_best_platform: "Top platform", tile_best_platform_foot: "{v} total views",
    analytics_hours_hint: "Average views by publishing hour (UTC). The filled bars are the hours when your content performs best.",
    hours_tooltip: "{h}:00 - {v} average views across {n} posts",
    guided_step1: "Authorize the account in the tab that just opened.",
    guided_step2: "Then copy the address of the page you land on and paste it below.",
    guided_placeholder: "Paste the full URL here", guided_cancel: "Cancel", guided_finish: "Finish",
    guided_paste_needed: "Paste the return URL first.",
    btn_link_account: "Link", btn_link_account_full: "Link an account",
    cm_auto_text: "Your browser will open: sign in and grant read-only access. The dashboard handles the rest.",
    cm_step1: "Authorize the account in the tab that opens.", cm_open: "Open authorization",
    cm_step2: "Paste the address of the page you land on here.", cm_finish: "Finish linking",
    group_connections: "Linked accounts", nav_connections: "Link account",
    connections_subtitle: "Sign in with your account and the dashboard does the rest. No tokens to copy.",
    connections_privacy: "Authorizations are stored only on your computer, locally. They never pass through any server.",
    connect_now: "Link {p}", connect_add_another: "Link another account", connect_soon: "Coming soon",
    connect_not_linked: "Not linked", connect_linked_n: "{n} linked", connect_unlink: "Unlink",
    connect_desc: "Sign in with {p} to see your stats here.",
    connect_waiting: "Waiting for browser...", connect_browser_opened: "Browser opened: complete the sign-in.",
    connect_success: "{n} linked!", connect_unlinked: "Account unlinked.",
    diag_problems: "problems", diag_warnings: "warnings", diag_ok: "fine",
    diag_filter_all: "All", diag_filter_problems: "Needs fixing", diag_filter_ok: "Fine",
    diag_filter_empty: "Nothing to show with this filter.", diag_go_connect: "Go to Link account",
    health_bad_title: "Some things need fixing", health_bad_sub: "{n} problems and warnings need your attention.",
    health_warn_title: "Almost all good", health_warn_sub: "{n} warnings to keep an eye on.",
    health_good_title: "All good", health_good_sub: "No problems found on your accounts.",
    group_general: "General", group_platforms: "Platforms", group_insights: "Insights",
    group_account: "Account", group_settings: "Settings",
    nav_overview: "Overview", nav_analytics: "Analytics", nav_diagnostics: "Diagnostics",
    nav_themes: "Themes", nav_language: "Language", nav_account: "Your account", nav_pricing: "Plans & pricing",
    btn_refresh: "Refresh", btn_analyze: "Analyze", btn_export: "Export CSV", palette_hint: "Search",
    analytics_subtitle: "Computed locally from collected data — top posts and best posting hours, zero AI cost.",
    analytics_top_posts: "🏆 Top posts/videos (by views)", analytics_best_hours: "🕐 Best posting hours (avg views)",
    diagnostics_subtitle: "Computed instantly from code, zero cost — flags errors and updates on every Refresh.",
    themes_subtitle: "Choose the dashboard's look — saved for next time too.",
    language_subtitle: "Choose the interface language — saved for next time too.",
    empty_no_data: "No data — press Refresh.", empty_configure_yt: "Configure YT_CHANNELS in .env.",
    empty_configure_ig: "Configure IG_ACCOUNTS in .env.", empty_configure_tt: "Configure TT_ACCOUNTS in .env.",
    empty_not_configured: "Not configured.",
    label_subscribers_total: "Total subscribers", label_channels: "Channels", label_followers_total: "Total followers",
    label_accounts: "Accounts", label_accounts_configured: "Configured accounts", label_credentials: "Credentials",
    val_ok: "OK", val_missing: "Missing", label_site: "Site", val_online: "Online", val_down: "Down",
    label_subscribers: "Subscribers", label_total_views: "Total views", label_videos_published: "Published videos",
    label_recent_views: "Views (last 10 videos)", label_last_publish: "Last published", label_never_published: "Never published",
    label_followers: "Followers", label_views_recent: "Views (recent posts)", label_likes: "Likes", label_comments: "Comments",
    label_views: "Views", label_likes_comments_shares: "Likes / Comments / Shares",
    val_online_latency: "Online ({ms}ms)", val_down_error: "Down / error", label_npm_vulns: "npm vulnerabilities",
    label_eslint: "ESLint", val_not_configured: "not configured", val_errors_warnings: "{e} errors, {w} warnings",
    insight_loading: "Analyzing…", insight_error: "Error during analysis: ",
    analytics_empty: "Not enough posts/videos with data yet for an analysis — press Refresh.",
    analytics_untitled: "(untitled)", analytics_avg_views: "avg views", analytics_bucket_count: "posts analyzed in this slot",
    analytics_last_refresh: "Last data load: {t} ({d})", analytics_last_refresh_never: "Last data load: never — press Refresh.",
    footer_last_refresh: "Last updated: {d}", footer_never: "Never updated", footer_error: "Error during refresh - try again.",
    time_never: "never", time_seconds_ago: "a few seconds ago", time_min_ago: "{n} min ago", time_hours_ago: "{n} hours ago", time_days_ago: "{n} days ago",
    diag_next_step_label: "Next step:",
    yt_total_views_lag_note: "YouTube can take hours/days to update the historical total on small/new channels — this isn't a dashboard bug.",
    overview_sub: "{n} accounts tracked across {p} platforms.", overview_sub_empty: "Press Refresh to load your data.",
    trend_since: "since last", trend_no_history: "One more refresh and the trend shows up here.",
    account_guest: "Guest", account_signin_hint: "Sign in to save",
    auth_tab_login: "Sign in", auth_tab_register: "Sign up",
    auth_title_login: "Welcome back", auth_title_register: "Create your account",
    auth_sub_login: "Sign in to sync plans and preferences.", auth_sub_register: "Takes thirty seconds. No card required.",
    auth_name: "Your name", auth_first_name: "First name", auth_last_name: "Last name", auth_birth_date: "Date of birth",
    auth_email: "Email", auth_password: "Password", auth_password_confirm: "Confirm password",
    auth_switch_to_register: "No account yet?", auth_switch_to_login: "Already have an account?",
    auth_aside_badge: "All in one place",
    auth_aside_title: "Stop opening six apps to find out how you're doing.",
    auth_aside_1: "Every account you run, in a single glance",
    auth_aside_2: "Tells you when a number drops, not just what it is",
    auth_aside_3: "Finds the hours your posts actually perform",
    auth_aside_4: "Your tokens stay on your machine, not on a server",
    auth_aside_foot: "No card required to start.",
    auth_logout: "Sign out", account_upgrade: "Upgrade to Pro", account_since: "Account created on {d}",
    err_email_invalid: "Enter a valid email address.", err_password_short: "At least 8 characters.",
    err_required: "This field is required.", err_birth_date_future: "The date can't be in the future.",
    err_age_min: "You must be at least {n} years old.", err_password_mismatch: "The two passwords don't match.",
    toast_welcome: "Welcome, {n}!", toast_logged_in: "Welcome back, {n}!", toast_logged_out: "You've been signed out.",
    toast_refresh_done: "Data updated.", toast_export_done: "CSV exported.",
    toast_login_required: "Sign in before choosing a plan.",
    pricing_title: "Choose how much you want to see", pricing_sub: "Start free. Move to Pro when the numbers start to matter.",
    pricing_monthly: "Monthly", pricing_yearly: "Yearly", pricing_save: "2 months free",
    plan_popular: "Most popular", plan_free_cta: "Start free", plan_cta: "Choose {p}",
    plan_current: "Current plan", plan_period_month: "/mo", plan_period_year: "/yr",
    plan_billed_yearly: "€{a} billed once a year", plan_billed_free: "Free forever, no expiry",
    pricing_note_ready: "Secure payment via Stripe. Cancel anytime.",
    pricing_note_setup: "Checkout not active yet: add STRIPE_SECRET_KEY to .env to enable payments.",
    palette_placeholder: "Go to…", palette_empty: "No results.",
    strength_labels: "weak,weak,fair,good,strong",
  },
  es: {
    overview_by_platform: "Por plataforma",
    tile_followers: "Audiencia total", tile_recent_views: "Vistas recientes", tile_recent_views_foot: "en el contenido reciente",
    tile_engagement: "Interacciones", tile_engagement_foot: "me gusta + comentarios recientes",
    tile_health: "Salud", tile_accounts_foot: "cuentas activas",
    tile_analyzed: "Contenido analizado", tile_analyzed_foot: "publicaciones y videos con datos",
    tile_avg_per_post: "Media por contenido", tile_avg_per_post_foot: "vistas medias",
    tile_best_hour: "Mejor hora", tile_best_hour_foot: "{v} vistas medias",
    tile_best_platform: "Plataforma top", tile_best_platform_foot: "{v} vistas totales",
    analytics_hours_hint: "Media de vistas por franja horaria de publicacion (UTC). Las barras llenas son las horas en que tu contenido rinde mas.",
    hours_tooltip: "{h}:00 - {v} vistas medias en {n} contenidos",
    guided_step1: "Autoriza la cuenta en la pestana que se ha abierto.",
    guided_step2: "Luego copia la direccion de la pagina en la que aterrizas y pegala abajo.",
    guided_placeholder: "Pega aqui la URL completa", guided_cancel: "Cancelar", guided_finish: "Completar",
    guided_paste_needed: "Pega antes la URL de retorno.",
    btn_link_account: "Vincular", btn_link_account_full: "Vincular una cuenta",
    cm_auto_text: "Se abrira el navegador: accede y autoriza el acceso de solo lectura. El panel hace el resto.",
    cm_step1: "Autoriza la cuenta en la pestana que se abre.", cm_open: "Abrir autorizacion",
    cm_step2: "Pega aqui la direccion de la pagina en la que aterrizas.", cm_finish: "Completar vinculacion",
    group_connections: "Cuentas vinculadas", nav_connections: "Vincular cuenta",
    connections_subtitle: "Accede con tu cuenta y el panel hace el resto. Sin tokens que copiar.",
    connections_privacy: "Las autorizaciones se guardan solo en tu ordenador, en local. No pasan por ningun servidor.",
    connect_now: "Vincular {p}", connect_add_another: "Vincular otra cuenta", connect_soon: "Proximamente",
    connect_not_linked: "No vinculado", connect_linked_n: "{n} vinculada(s)", connect_unlink: "Desvincular",
    connect_desc: "Accede con {p} para ver aqui tus estadisticas.",
    connect_waiting: "Esperando al navegador...", connect_browser_opened: "He abierto el navegador: completa el acceso.",
    connect_success: "\u00a1{n} vinculada!", connect_unlinked: "Cuenta desvinculada.",
    diag_problems: "problemas", diag_warnings: "avisos", diag_ok: "correcto",
    diag_filter_all: "Todo", diag_filter_problems: "Por arreglar", diag_filter_ok: "Correcto",
    diag_filter_empty: "Nada que mostrar con este filtro.", diag_go_connect: "Ir a Vincular cuenta",
    health_bad_title: "Hay cosas que arreglar", health_bad_sub: "{n} entre problemas y avisos requieren tu atencion.",
    health_warn_title: "Casi todo correcto", health_warn_sub: "{n} avisos a vigilar.",
    health_good_title: "Todo en orden", health_good_sub: "Ningun problema detectado en tus cuentas.",
    group_general: "General", group_platforms: "Plataformas", group_insights: "Análisis",
    group_account: "Cuenta", group_settings: "Ajustes",
    nav_overview: "Resumen", nav_analytics: "Analíticas", nav_diagnostics: "Diagnóstico",
    nav_themes: "Temas", nav_language: "Idioma", nav_account: "Tu cuenta", nav_pricing: "Planes y precios",
    btn_refresh: "Actualizar", btn_analyze: "Analizar", btn_export: "Exportar CSV", palette_hint: "Buscar",
    analytics_subtitle: "Calculadas localmente a partir de los datos recogidos — mejores publicaciones y franjas horarias, sin coste de IA.",
    analytics_top_posts: "🏆 Mejores publicaciones/vídeos (por vistas)", analytics_best_hours: "🕐 Mejores franjas horarias (vistas medias)",
    diagnostics_subtitle: "Calculado al instante por el código, sin coste — señala errores y se actualiza en cada Refresh.",
    themes_subtitle: "Elige el aspecto del panel — se guarda para la próxima vez.",
    language_subtitle: "Elige el idioma de la interfaz — se guarda para la próxima vez.",
    empty_no_data: "Sin datos — pulsa Refresh.", empty_configure_yt: "Configura YT_CHANNELS en el .env.",
    empty_configure_ig: "Configura IG_ACCOUNTS en el .env.", empty_configure_tt: "Configura TT_ACCOUNTS en el .env.",
    empty_not_configured: "No configurado.",
    label_subscribers_total: "Suscriptores totales", label_channels: "Canales", label_followers_total: "Seguidores totales",
    label_accounts: "Cuentas", label_accounts_configured: "Cuentas configuradas", label_credentials: "Credenciales",
    val_ok: "OK", val_missing: "Faltan", label_site: "Sitio", val_online: "En línea", val_down: "Caído",
    label_subscribers: "Suscriptores", label_total_views: "Vistas totales", label_videos_published: "Vídeos publicados",
    label_recent_views: "Vistas (últimos 10 vídeos)", label_last_publish: "Última publicación", label_never_published: "Nunca publicado",
    label_followers: "Seguidores", label_views_recent: "Vistas (publicaciones recientes)", label_likes: "Me gusta", label_comments: "Comentarios",
    label_views: "Vistas", label_likes_comments_shares: "Me gusta / Comentarios / Compartidos",
    val_online_latency: "En línea ({ms}ms)", val_down_error: "Caído / error", label_npm_vulns: "Vulnerabilidades npm",
    label_eslint: "ESLint", val_not_configured: "no configurado", val_errors_warnings: "{e} errores, {w} avisos",
    insight_loading: "Analizando…", insight_error: "Error durante el análisis: ",
    analytics_empty: "Aún no hay suficientes publicaciones/vídeos con datos para un análisis — pulsa Refresh.",
    analytics_untitled: "(sin título)", analytics_avg_views: "vistas medias", analytics_bucket_count: "publicaciones analizadas en esta franja",
    analytics_last_refresh: "Última carga de datos: {t} ({d})", analytics_last_refresh_never: "Última carga de datos: nunca — pulsa Refresh.",
    footer_last_refresh: "Última actualización: {d}", footer_never: "Nunca actualizado", footer_error: "Error durante la actualización - inténtalo de nuevo.",
    time_never: "nunca", time_seconds_ago: "hace unos segundos", time_min_ago: "hace {n} min", time_hours_ago: "hace {n} horas", time_days_ago: "hace {n} días",
    diag_next_step_label: "Próximo paso:",
    yt_total_views_lag_note: "YouTube a veces tarda horas/días en actualizar el total histórico en canales pequeños/nuevos — no es un error del panel.",
    overview_sub: "{n} cuentas monitorizadas en {p} plataformas.", overview_sub_empty: "Pulsa Refresh para cargar tus datos.",
    trend_since: "desde la anterior", trend_no_history: "Con otra actualización aparecerá la tendencia.",
    account_guest: "Invitado", account_signin_hint: "Accede para guardar",
    auth_tab_login: "Acceder", auth_tab_register: "Registrarse",
    auth_title_login: "Bienvenido de nuevo", auth_title_register: "Crea tu cuenta",
    auth_sub_login: "Accede para sincronizar planes y preferencias.", auth_sub_register: "Treinta segundos. Sin tarjeta.",
    auth_name: "Tu nombre", auth_first_name: "Nombre", auth_last_name: "Apellidos", auth_birth_date: "Fecha de nacimiento",
    auth_email: "Email", auth_password: "Contraseña", auth_password_confirm: "Confirma la contraseña",
    auth_switch_to_register: "¿Aún no tienes cuenta?", auth_switch_to_login: "¿Ya tienes cuenta?",
    auth_aside_badge: "Todo en un solo sitio",
    auth_aside_title: "Deja de abrir seis apps para saber cómo te va.",
    auth_aside_1: "Todas tus cuentas de un vistazo",
    auth_aside_2: "Te avisa cuando un número baja, no solo cuánto vale",
    auth_aside_3: "Encuentra las horas en que tus posts rinden más",
    auth_aside_4: "Tus tokens se quedan en tu ordenador, no en un servidor",
    auth_aside_foot: "No hace falta tarjeta para empezar.",
    auth_logout: "Salir", account_upgrade: "Pasar a Pro", account_since: "Cuenta creada el {d}",
    err_email_invalid: "Introduce un email válido.", err_password_short: "Mínimo 8 caracteres.",
    err_required: "Campo obligatorio.", err_birth_date_future: "La fecha no puede ser futura.",
    err_age_min: "Debes tener al menos {n} años.", err_password_mismatch: "Las contraseñas no coinciden.",
    toast_welcome: "¡Bienvenido, {n}!", toast_logged_in: "¡Bienvenido de nuevo, {n}!", toast_logged_out: "Has cerrado sesión.",
    toast_refresh_done: "Datos actualizados.", toast_export_done: "CSV exportado.",
    toast_login_required: "Accede antes de elegir un plan.",
    pricing_title: "Elige cuánto quieres ver", pricing_sub: "Empieza gratis. Pasa a Pro cuando los números empiecen a importar.",
    pricing_monthly: "Mensual", pricing_yearly: "Anual", pricing_save: "2 meses gratis",
    plan_popular: "El más elegido", plan_free_cta: "Empezar gratis", plan_cta: "Elegir {p}",
    plan_current: "Plan actual", plan_period_month: "/mes", plan_period_year: "/año",
    plan_billed_yearly: "{a}€ facturados una vez al año", plan_billed_free: "Gratis para siempre",
    pricing_note_ready: "Pago seguro con Stripe. Cancela cuando quieras.",
    pricing_note_setup: "Checkout aún no activo: añade STRIPE_SECRET_KEY al .env para habilitar los pagos.",
    palette_placeholder: "Ir a…", palette_empty: "Sin resultados.",
    strength_labels: "débil,débil,media,buena,excelente",
  },
  fr: {
    overview_by_platform: "Par plateforme",
    tile_followers: "Audience totale", tile_recent_views: "Vues recentes", tile_recent_views_foot: "sur le contenu recent",
    tile_engagement: "Interactions", tile_engagement_foot: "j'aime + commentaires recents",
    tile_health: "Sante", tile_accounts_foot: "comptes actifs",
    tile_analyzed: "Contenus analyses", tile_analyzed_foot: "posts et videos avec donnees",
    tile_avg_per_post: "Moyenne par contenu", tile_avg_per_post_foot: "vues moyennes",
    tile_best_hour: "Meilleure heure", tile_best_hour_foot: "{v} vues moyennes",
    tile_best_platform: "Plateforme top", tile_best_platform_foot: "{v} vues au total",
    analytics_hours_hint: "Vues moyennes par heure de publication (UTC). Les barres pleines sont les heures ou vos contenus marchent le mieux.",
    hours_tooltip: "{h}:00 - {v} vues moyennes sur {n} contenus",
    guided_step1: "Autorisez le compte dans l'onglet qui vient de s'ouvrir.",
    guided_step2: "Copiez ensuite l'adresse de la page ou vous atterrissez et collez-la ci-dessous.",
    guided_placeholder: "Collez ici l'URL complete", guided_cancel: "Annuler", guided_finish: "Terminer",
    guided_paste_needed: "Collez d'abord l'URL de retour.",
    btn_link_account: "Lier", btn_link_account_full: "Lier un compte",
    cm_auto_text: "Le navigateur va s'ouvrir : connectez-vous et autorisez l'acces en lecture seule. Le tableau de bord fait le reste.",
    cm_step1: "Autorisez le compte dans l'onglet qui s'ouvre.", cm_open: "Ouvrir l'autorisation",
    cm_step2: "Collez ici l'adresse de la page ou vous atterrissez.", cm_finish: "Terminer la liaison",
    group_connections: "Comptes lies", nav_connections: "Lier un compte",
    connections_subtitle: "Connectez-vous avec votre compte, le tableau de bord fait le reste. Aucun jeton a copier.",
    connections_privacy: "Les autorisations sont enregistrees uniquement sur votre ordinateur, en local. Elles ne transitent par aucun serveur.",
    connect_now: "Lier {p}", connect_add_another: "Lier un autre compte", connect_soon: "Bientot",
    connect_not_linked: "Non lie", connect_linked_n: "{n} lie(s)", connect_unlink: "Delier",
    connect_desc: "Connectez-vous avec {p} pour voir vos statistiques ici.",
    connect_waiting: "En attente du navigateur...", connect_browser_opened: "Navigateur ouvert : terminez la connexion.",
    connect_success: "{n} lie !", connect_unlinked: "Compte delie.",
    diag_problems: "problemes", diag_warnings: "avertissements", diag_ok: "OK",
    diag_filter_all: "Tout", diag_filter_problems: "A corriger", diag_filter_ok: "OK",
    diag_filter_empty: "Rien a afficher avec ce filtre.", diag_go_connect: "Aller a Lier un compte",
    health_bad_title: "Des choses a corriger", health_bad_sub: "{n} problemes et avertissements demandent votre attention.",
    health_warn_title: "Presque tout va bien", health_warn_sub: "{n} avertissements a surveiller.",
    health_good_title: "Tout va bien", health_good_sub: "Aucun probleme detecte sur vos comptes.",
    group_general: "Général", group_platforms: "Plateformes", group_insights: "Analyses",
    group_account: "Compte", group_settings: "Réglages",
    nav_overview: "Vue d'ensemble", nav_analytics: "Analytique", nav_diagnostics: "Diagnostic",
    nav_themes: "Thèmes", nav_language: "Langue", nav_account: "Votre compte", nav_pricing: "Offres et tarifs",
    btn_refresh: "Actualiser", btn_analyze: "Analyser", btn_export: "Exporter CSV", palette_hint: "Rechercher",
    analytics_subtitle: "Calculées localement à partir des données collectées — meilleures publications et créneaux horaires, sans coût IA.",
    analytics_top_posts: "🏆 Meilleurs posts/vidéos (par vues)", analytics_best_hours: "🕐 Meilleurs créneaux horaires (vues moyennes)",
    diagnostics_subtitle: "Calculé instantanément par le code, sans coût — signale les erreurs et se met à jour à chaque Refresh.",
    themes_subtitle: "Choisissez l'apparence du tableau de bord — sauvegardé pour la prochaine fois.",
    language_subtitle: "Choisissez la langue de l'interface — sauvegardé pour la prochaine fois.",
    empty_no_data: "Aucune donnée — appuyez sur Refresh.", empty_configure_yt: "Configurez YT_CHANNELS dans .env.",
    empty_configure_ig: "Configurez IG_ACCOUNTS dans .env.", empty_configure_tt: "Configurez TT_ACCOUNTS dans .env.",
    empty_not_configured: "Non configuré.",
    label_subscribers_total: "Abonnés totaux", label_channels: "Chaînes", label_followers_total: "Followers totaux",
    label_accounts: "Comptes", label_accounts_configured: "Comptes configurés", label_credentials: "Identifiants",
    val_ok: "OK", val_missing: "Manquants", label_site: "Site", val_online: "En ligne", val_down: "Hors ligne",
    label_subscribers: "Abonnés", label_total_views: "Vues totales", label_videos_published: "Vidéos publiées",
    label_recent_views: "Vues (10 dernières vidéos)", label_last_publish: "Dernière publication", label_never_published: "Jamais publié",
    label_followers: "Followers", label_views_recent: "Vues (posts récents)", label_likes: "J'aime", label_comments: "Commentaires",
    label_views: "Vues", label_likes_comments_shares: "J'aime / Commentaires / Partages",
    val_online_latency: "En ligne ({ms}ms)", val_down_error: "Hors ligne / erreur", label_npm_vulns: "Vulnérabilités npm",
    label_eslint: "ESLint", val_not_configured: "non configuré", val_errors_warnings: "{e} erreurs, {w} avertissements",
    insight_loading: "Analyse en cours…", insight_error: "Erreur pendant l'analyse : ",
    analytics_empty: "Pas encore assez de posts/vidéos avec des données pour une analyse — appuyez sur Refresh.",
    analytics_untitled: "(sans titre)", analytics_avg_views: "vues moyennes", analytics_bucket_count: "posts analysés dans ce créneau",
    analytics_last_refresh: "Dernier chargement des données : {t} ({d})", analytics_last_refresh_never: "Dernier chargement des données : jamais — appuyez sur Refresh.",
    footer_last_refresh: "Dernière mise à jour : {d}", footer_never: "Jamais mis à jour", footer_error: "Erreur pendant l'actualisation - réessayez.",
    time_never: "jamais", time_seconds_ago: "il y a quelques secondes", time_min_ago: "il y a {n} min", time_hours_ago: "il y a {n} heures", time_days_ago: "il y a {n} jours",
    diag_next_step_label: "Prochaine étape :",
    yt_total_views_lag_note: "YouTube peut mettre des heures/jours à actualiser le total historique sur les petites/nouvelles chaînes — ce n'est pas un bug du tableau de bord.",
    overview_sub: "{n} comptes suivis sur {p} plateformes.", overview_sub_empty: "Appuyez sur Refresh pour charger vos données.",
    trend_since: "depuis la précédente", trend_no_history: "Encore une actualisation et la tendance apparaît.",
    account_guest: "Invité", account_signin_hint: "Connectez-vous pour sauvegarder",
    auth_tab_login: "Se connecter", auth_tab_register: "S'inscrire",
    auth_title_login: "Content de vous revoir", auth_title_register: "Créez votre compte",
    auth_sub_login: "Connectez-vous pour synchroniser offres et préférences.", auth_sub_register: "Trente secondes. Sans carte bancaire.",
    auth_name: "Votre nom", auth_first_name: "Prénom", auth_last_name: "Nom", auth_birth_date: "Date de naissance",
    auth_email: "Email", auth_password: "Mot de passe", auth_password_confirm: "Confirmez le mot de passe",
    auth_switch_to_register: "Pas encore de compte ?", auth_switch_to_login: "Vous avez déjà un compte ?",
    auth_aside_badge: "Tout au même endroit",
    auth_aside_title: "Arrêtez d'ouvrir six applis pour savoir où vous en êtes.",
    auth_aside_1: "Tous vos comptes d'un seul coup d'œil",
    auth_aside_2: "Vous prévient quand un chiffre baisse, pas seulement sa valeur",
    auth_aside_3: "Trouve les heures où vos posts marchent vraiment",
    auth_aside_4: "Vos jetons restent sur votre machine, pas sur un serveur",
    auth_aside_foot: "Aucune carte requise pour commencer.",
    auth_logout: "Déconnexion", account_upgrade: "Passer à Pro", account_since: "Compte créé le {d}",
    err_email_invalid: "Saisissez une adresse email valide.", err_password_short: "8 caractères minimum.",
    err_required: "Champ obligatoire.", err_birth_date_future: "La date ne peut pas être dans le futur.",
    err_age_min: "Vous devez avoir au moins {n} ans.", err_password_mismatch: "Les deux mots de passe ne correspondent pas.",
    toast_welcome: "Bienvenue, {n} !", toast_logged_in: "Content de vous revoir, {n} !", toast_logged_out: "Vous êtes déconnecté.",
    toast_refresh_done: "Données actualisées.", toast_export_done: "CSV exporté.",
    toast_login_required: "Connectez-vous avant de choisir une offre.",
    pricing_title: "Choisissez ce que vous voulez voir", pricing_sub: "Commencez gratuitement. Passez à Pro quand les chiffres comptent vraiment.",
    pricing_monthly: "Mensuel", pricing_yearly: "Annuel", pricing_save: "2 mois offerts",
    plan_popular: "Le plus choisi", plan_free_cta: "Commencer gratuitement", plan_cta: "Choisir {p}",
    plan_current: "Offre actuelle", plan_period_month: "/mois", plan_period_year: "/an",
    plan_billed_yearly: "{a}€ facturés une fois par an", plan_billed_free: "Gratuit pour toujours",
    pricing_note_ready: "Paiement sécurisé via Stripe. Annulable à tout moment.",
    pricing_note_setup: "Checkout pas encore actif : ajoutez STRIPE_SECRET_KEY dans .env pour activer les paiements.",
    palette_placeholder: "Aller à…", palette_empty: "Aucun résultat.",
    strength_labels: "faible,faible,moyen,bon,excellent",
  },
  de: {
    overview_by_platform: "Nach Plattform",
    tile_followers: "Gesamtreichweite", tile_recent_views: "Aktuelle Views", tile_recent_views_foot: "auf den letzten Inhalten",
    tile_engagement: "Interaktionen", tile_engagement_foot: "Likes + Kommentare",
    tile_health: "Zustand", tile_accounts_foot: "aktive Konten",
    tile_analyzed: "Analysierte Inhalte", tile_analyzed_foot: "Beitraege und Videos mit Daten",
    tile_avg_per_post: "Schnitt pro Inhalt", tile_avg_per_post_foot: "durchschnittliche Views",
    tile_best_hour: "Beste Stunde", tile_best_hour_foot: "{v} Views im Schnitt",
    tile_best_platform: "Top-Plattform", tile_best_platform_foot: "{v} Views gesamt",
    analytics_hours_hint: "Durchschnittliche Views nach Veroeffentlichungsstunde (UTC). Die gefuellten Balken sind die Stunden, in denen deine Inhalte am besten laufen.",
    hours_tooltip: "{h}:00 - {v} Views im Schnitt bei {n} Inhalten",
    guided_step1: "Autorisiere das Konto im gerade geoeffneten Tab.",
    guided_step2: "Kopiere dann die Adresse der Seite, auf der du landest, und fuege sie unten ein.",
    guided_placeholder: "Vollstaendige URL hier einfuegen", guided_cancel: "Abbrechen", guided_finish: "Fertigstellen",
    guided_paste_needed: "Fuege zuerst die Rueckgabe-URL ein.",
    btn_link_account: "Verkn\u00fcpfen", btn_link_account_full: "Konto verkn\u00fcpfen",
    cm_auto_text: "Der Browser \u00f6ffnet sich: melde dich an und erlaube den Lesezugriff. Den Rest \u00fcbernimmt das Dashboard.",
    cm_step1: "Autorisiere das Konto im Tab, der sich \u00f6ffnet.", cm_open: "Autorisierung \u00f6ffnen",
    cm_step2: "F\u00fcge hier die Adresse der Seite ein, auf der du landest.", cm_finish: "Verkn\u00fcpfung abschlie\u00dfen",
    group_connections: "Verkn\u00fcpfte Konten", nav_connections: "Konto verkn\u00fcpfen",
    connections_subtitle: "Melde dich mit deinem Konto an, den Rest macht das Dashboard. Keine Tokens zum Kopieren.",
    connections_privacy: "Die Autorisierungen werden nur lokal auf deinem Rechner gespeichert. Sie laufen \u00fcber keinen Server.",
    connect_now: "{p} verkn\u00fcpfen", connect_add_another: "Weiteres Konto verkn\u00fcpfen", connect_soon: "Demn\u00e4chst",
    connect_not_linked: "Nicht verkn\u00fcpft", connect_linked_n: "{n} verkn\u00fcpft", connect_unlink: "Trennen",
    connect_desc: "Melde dich mit {p} an, um deine Statistiken hier zu sehen.",
    connect_waiting: "Warte auf den Browser...", connect_browser_opened: "Browser ge\u00f6ffnet: schlie\u00dfe die Anmeldung ab.",
    connect_success: "{n} verkn\u00fcpft!", connect_unlinked: "Konto getrennt.",
    diag_problems: "Probleme", diag_warnings: "Hinweise", diag_ok: "in Ordnung",
    diag_filter_all: "Alles", diag_filter_problems: "Zu beheben", diag_filter_ok: "In Ordnung",
    diag_filter_empty: "Mit diesem Filter gibt es nichts anzuzeigen.", diag_go_connect: "Zu Konto verkn\u00fcpfen",
    health_bad_title: "Es gibt etwas zu beheben", health_bad_sub: "{n} Probleme und Hinweise brauchen deine Aufmerksamkeit.",
    health_warn_title: "Fast alles in Ordnung", health_warn_sub: "{n} Hinweise im Auge behalten.",
    health_good_title: "Alles in Ordnung", health_good_sub: "Keine Probleme bei deinen Konten gefunden.",
    group_general: "Allgemein", group_platforms: "Plattformen", group_insights: "Insights",
    group_account: "Konto", group_settings: "Einstellungen",
    nav_overview: "Übersicht", nav_analytics: "Analysen", nav_diagnostics: "Diagnose",
    nav_themes: "Themes", nav_language: "Sprache", nav_account: "Dein Konto", nav_pricing: "Tarife & Preise",
    btn_refresh: "Refresh", btn_analyze: "Analysieren", btn_export: "CSV exportieren", palette_hint: "Suchen",
    analytics_subtitle: "Lokal aus den gesammelten Daten berechnet — beste Beiträge und Uhrzeiten, ohne KI-Kosten.",
    analytics_top_posts: "🏆 Top-Beiträge/Videos (nach Views)", analytics_best_hours: "🕐 Beste Uhrzeiten (Ø Views)",
    diagnostics_subtitle: "Sofort und kostenlos vom Code berechnet — zeigt Fehler an und aktualisiert sich bei jedem Refresh.",
    themes_subtitle: "Wähle das Erscheinungsbild des Dashboards — bleibt auch beim nächsten Öffnen gespeichert.",
    language_subtitle: "Wähle die Sprache der Oberfläche — bleibt auch beim nächsten Öffnen gespeichert.",
    empty_no_data: "Keine Daten — Refresh drücken.", empty_configure_yt: "YT_CHANNELS in .env konfigurieren.",
    empty_configure_ig: "IG_ACCOUNTS in .env konfigurieren.", empty_configure_tt: "TT_ACCOUNTS in .env konfigurieren.",
    empty_not_configured: "Nicht konfiguriert.",
    label_subscribers_total: "Abonnenten gesamt", label_channels: "Kanäle", label_followers_total: "Follower gesamt",
    label_accounts: "Konten", label_accounts_configured: "Konfigurierte Konten", label_credentials: "Zugangsdaten",
    val_ok: "OK", val_missing: "Fehlend", label_site: "Website", val_online: "Online", val_down: "Offline",
    label_subscribers: "Abonnenten", label_total_views: "Views gesamt", label_videos_published: "Veröffentlichte Videos",
    label_recent_views: "Views (letzte 10 Videos)", label_last_publish: "Letzte Veröffentlichung", label_never_published: "Nie veröffentlicht",
    label_followers: "Follower", label_views_recent: "Views (letzte Beiträge)", label_likes: "Likes", label_comments: "Kommentare",
    label_views: "Views", label_likes_comments_shares: "Likes / Kommentare / Shares",
    val_online_latency: "Online ({ms}ms)", val_down_error: "Offline / Fehler", label_npm_vulns: "npm-Schwachstellen",
    label_eslint: "ESLint", val_not_configured: "nicht konfiguriert", val_errors_warnings: "{e} Fehler, {w} Warnungen",
    insight_loading: "Analyse läuft…", insight_error: "Fehler bei der Analyse: ",
    analytics_empty: "Noch nicht genug Beiträge/Videos mit Daten für eine Analyse — Refresh drücken.",
    analytics_untitled: "(ohne Titel)", analytics_avg_views: "Ø Views", analytics_bucket_count: "analysierte Beiträge in dieser Zeitspanne",
    analytics_last_refresh: "Letzter Datenabruf: {t} ({d})", analytics_last_refresh_never: "Letzter Datenabruf: nie — Refresh drücken.",
    footer_last_refresh: "Letzte Aktualisierung: {d}", footer_never: "Nie aktualisiert", footer_error: "Fehler beim Refresh - erneut versuchen.",
    time_never: "nie", time_seconds_ago: "vor wenigen Sekunden", time_min_ago: "vor {n} Min.", time_hours_ago: "vor {n} Std.", time_days_ago: "vor {n} Tagen",
    diag_next_step_label: "Nächster Schritt:",
    yt_total_views_lag_note: "YouTube braucht bei kleinen/neuen Kanälen manchmal Stunden/Tage, um die historische Gesamtzahl zu aktualisieren — kein Fehler im Dashboard.",
    overview_sub: "{n} Konten auf {p} Plattformen im Blick.", overview_sub_empty: "Refresh drücken, um deine Daten zu laden.",
    trend_since: "seit dem letzten", trend_no_history: "Noch ein Refresh und der Trend erscheint hier.",
    account_guest: "Gast", account_signin_hint: "Anmelden zum Speichern",
    auth_tab_login: "Anmelden", auth_tab_register: "Registrieren",
    auth_title_login: "Willkommen zurück", auth_title_register: "Konto erstellen",
    auth_sub_login: "Melde dich an, um Tarife und Einstellungen zu synchronisieren.", auth_sub_register: "Dauert dreißig Sekunden. Ohne Karte.",
    auth_name: "Dein Name", auth_first_name: "Vorname", auth_last_name: "Nachname", auth_birth_date: "Geburtsdatum",
    auth_email: "E-Mail", auth_password: "Passwort", auth_password_confirm: "Passwort bestätigen",
    auth_switch_to_register: "Noch kein Konto?", auth_switch_to_login: "Schon ein Konto?",
    auth_aside_badge: "Alles an einem Ort",
    auth_aside_title: "Schluss damit, sechs Apps zu öffnen, um zu sehen, wie es läuft.",
    auth_aside_1: "Alle deine Konten auf einen Blick",
    auth_aside_2: "Sagt dir, wenn eine Zahl fällt — nicht nur, wie hoch sie ist",
    auth_aside_3: "Findet die Uhrzeiten, zu denen deine Posts wirklich laufen",
    auth_aside_4: "Deine Tokens bleiben auf deinem Rechner, nicht auf einem Server",
    auth_aside_foot: "Zum Starten ist keine Karte nötig.",
    auth_logout: "Abmelden", account_upgrade: "Auf Pro wechseln", account_since: "Konto erstellt am {d}",
    err_email_invalid: "Gib eine gültige E-Mail-Adresse ein.", err_password_short: "Mindestens 8 Zeichen.",
    err_required: "Pflichtfeld.", err_birth_date_future: "Das Datum darf nicht in der Zukunft liegen.",
    err_age_min: "Du musst mindestens {n} Jahre alt sein.", err_password_mismatch: "Die Passwörter stimmen nicht überein.",
    toast_welcome: "Willkommen, {n}!", toast_logged_in: "Willkommen zurück, {n}!", toast_logged_out: "Du wurdest abgemeldet.",
    toast_refresh_done: "Daten aktualisiert.", toast_export_done: "CSV exportiert.",
    toast_login_required: "Melde dich an, bevor du einen Tarif wählst.",
    pricing_title: "Wähle, wie viel du sehen willst", pricing_sub: "Kostenlos starten. Auf Pro wechseln, wenn die Zahlen zählen.",
    pricing_monthly: "Monatlich", pricing_yearly: "Jährlich", pricing_save: "2 Monate gratis",
    plan_popular: "Am beliebtesten", plan_free_cta: "Kostenlos starten", plan_cta: "{p} wählen",
    plan_current: "Aktueller Tarif", plan_period_month: "/Mon.", plan_period_year: "/Jahr",
    plan_billed_yearly: "{a}€ einmal jährlich abgerechnet", plan_billed_free: "Für immer kostenlos",
    pricing_note_ready: "Sichere Zahlung über Stripe. Jederzeit kündbar.",
    pricing_note_setup: "Checkout noch nicht aktiv: STRIPE_SECRET_KEY in .env eintragen, um Zahlungen zu aktivieren.",
    palette_placeholder: "Gehe zu…", palette_empty: "Keine Ergebnisse.",
    strength_labels: "schwach,schwach,mittel,gut,stark",
  },
  ja: {
    overview_by_platform: "\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u5225",
    tile_followers: "\u7dcf\u30d5\u30a9\u30ed\u30ef\u30fc", tile_recent_views: "\u6700\u8fd1\u306e\u518d\u751f\u6570", tile_recent_views_foot: "\u76f4\u8fd1\u306e\u30b3\u30f3\u30c6\u30f3\u30c4",
    tile_engagement: "\u30a8\u30f3\u30b2\u30fc\u30b8\u30e1\u30f3\u30c8", tile_engagement_foot: "\u76f4\u8fd1\u306e\u3044\u3044\u306d\u3068\u30b3\u30e1\u30f3\u30c8",
    tile_health: "\u30d8\u30eb\u30b9", tile_accounts_foot: "\u30a2\u30af\u30c6\u30a3\u30d6\u306a\u30a2\u30ab\u30a6\u30f3\u30c8",
    tile_analyzed: "\u5206\u6790\u3057\u305f\u30b3\u30f3\u30c6\u30f3\u30c4", tile_analyzed_foot: "\u30c7\u30fc\u30bf\u306e\u3042\u308b\u6295\u7a3f\u3068\u52d5\u753b",
    tile_avg_per_post: "1\u4ef6\u3042\u305f\u308a\u5e73\u5747", tile_avg_per_post_foot: "\u5e73\u5747\u518d\u751f\u6570",
    tile_best_hour: "\u6700\u9069\u306a\u6642\u9593", tile_best_hour_foot: "\u5e73\u5747{v}\u518d\u751f",
    tile_best_platform: "\u30c8\u30c3\u30d7\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0", tile_best_platform_foot: "\u5408\u8a08{v}\u518d\u751f",
    analytics_hours_hint: "\u6295\u7a3f\u6642\u9593\u5e2f\uff08UTC\uff09\u3054\u3068\u306e\u5e73\u5747\u518d\u751f\u6570\u3002\u6fc3\u3044\u30d0\u30fc\u304c\u6700\u3082\u4f38\u3073\u308b\u6642\u9593\u5e2f\u3067\u3059\u3002",
    hours_tooltip: "{h}:00 - {n}\u4ef6\u3067\u5e73\u5747{v}\u518d\u751f",
    guided_step1: "\u958b\u3044\u305f\u30bf\u30d6\u3067\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u8a8d\u53ef\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
    guided_step2: "\u305d\u306e\u5f8c\u3001\u79fb\u52d5\u5148\u306e\u30da\u30fc\u30b8\u306eURL\u3092\u30b3\u30d4\u30fc\u3057\u3066\u4e0b\u306b\u8cbc\u308a\u4ed8\u3051\u3066\u304f\u3060\u3055\u3044\u3002",
    guided_placeholder: "\u5b8c\u5168\u306aURL\u3092\u8cbc\u308a\u4ed8\u3051", guided_cancel: "\u30ad\u30e3\u30f3\u30bb\u30eb", guided_finish: "\u5b8c\u4e86",
    guided_paste_needed: "\u5148\u306b\u623b\u308aURL\u3092\u8cbc\u308a\u4ed8\u3051\u3066\u304f\u3060\u3055\u3044\u3002",
    btn_link_account: "\u9023\u643a", btn_link_account_full: "\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u9023\u643a",
    cm_auto_text: "\u30d6\u30e9\u30a6\u30b6\u304c\u958b\u304d\u307e\u3059\u3002\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u8aad\u307f\u53d6\u308a\u5c02\u7528\u30a2\u30af\u30bb\u30b9\u3092\u8a31\u53ef\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
    cm_step1: "\u958b\u3044\u305f\u30bf\u30d6\u3067\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u8a8d\u53ef\u3057\u3066\u304f\u3060\u3055\u3044\u3002", cm_open: "\u8a8d\u53ef\u3092\u958b\u304f",
    cm_step2: "\u79fb\u52d5\u5148\u306e\u30da\u30fc\u30b8\u306eURL\u3092\u3053\u3053\u306b\u8cbc\u308a\u4ed8\u3051\u3066\u304f\u3060\u3055\u3044\u3002", cm_finish: "\u9023\u643a\u3092\u5b8c\u4e86",
    group_connections: "\u9023\u643a\u6e08\u307f\u30a2\u30ab\u30a6\u30f3\u30c8", nav_connections: "\u30a2\u30ab\u30a6\u30f3\u30c8\u9023\u643a",
    connections_subtitle: "\u30a2\u30ab\u30a6\u30f3\u30c8\u3067\u30ed\u30b0\u30a4\u30f3\u3059\u308b\u3060\u3051\u3002\u30c8\u30fc\u30af\u30f3\u306e\u30b3\u30d4\u30fc\u306f\u4e0d\u8981\u3067\u3059\u3002",
    connections_privacy: "\u8a8d\u8a3c\u60c5\u5831\u306f\u304a\u4f7f\u3044\u306ePC\u5185\u306b\u306e\u307f\u4fdd\u5b58\u3055\u308c\u307e\u3059\u3002\u30b5\u30fc\u30d0\u30fc\u3092\u7d4c\u7531\u3059\u308b\u3053\u3068\u306f\u3042\u308a\u307e\u305b\u3093\u3002",
    connect_now: "{p}\u3092\u9023\u643a", connect_add_another: "\u5225\u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u9023\u643a", connect_soon: "\u8fd1\u65e5\u5bfe\u5fdc",
    connect_not_linked: "\u672a\u9023\u643a", connect_linked_n: "{n}\u4ef6\u9023\u643a\u6e08\u307f", connect_unlink: "\u89e3\u9664",
    connect_desc: "{p}\u3067\u30ed\u30b0\u30a4\u30f3\u3059\u308b\u3068\u3001\u3053\u3053\u306b\u7d71\u8a08\u304c\u8868\u793a\u3055\u308c\u307e\u3059\u3002",
    connect_waiting: "\u30d6\u30e9\u30a6\u30b6\u3092\u5f85\u6a5f\u4e2d...", connect_browser_opened: "\u30d6\u30e9\u30a6\u30b6\u3092\u958b\u304d\u307e\u3057\u305f\u3002\u30ed\u30b0\u30a4\u30f3\u3092\u5b8c\u4e86\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
    connect_success: "{n}\u3092\u9023\u643a\u3057\u307e\u3057\u305f\uff01", connect_unlinked: "\u9023\u643a\u3092\u89e3\u9664\u3057\u307e\u3057\u305f\u3002",
    diag_problems: "\u4ef6\u306e\u554f\u984c", diag_warnings: "\u4ef6\u306e\u8b66\u544a", diag_ok: "\u4ef6\u304c\u826f\u597d",
    diag_filter_all: "\u3059\u3079\u3066", diag_filter_problems: "\u8981\u5bfe\u5fdc", diag_filter_ok: "\u826f\u597d",
    diag_filter_empty: "\u3053\u306e\u30d5\u30a3\u30eb\u30bf\u30fc\u3067\u306f\u8868\u793a\u3059\u308b\u3082\u306e\u304c\u3042\u308a\u307e\u305b\u3093\u3002", diag_go_connect: "\u30a2\u30ab\u30a6\u30f3\u30c8\u9023\u643a\u3078",
    health_bad_title: "\u5bfe\u5fdc\u304c\u5fc5\u8981\u306a\u9805\u76ee\u304c\u3042\u308a\u307e\u3059", health_bad_sub: "\u554f\u984c\u3068\u8b66\u544a\u304c{n}\u4ef6\u3042\u308a\u307e\u3059\u3002",
    health_warn_title: "\u307b\u307c\u826f\u597d\u3067\u3059", health_warn_sub: "{n}\u4ef6\u306e\u8b66\u544a\u306b\u6ce8\u610f\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
    health_good_title: "\u3059\u3079\u3066\u826f\u597d", health_good_sub: "\u30a2\u30ab\u30a6\u30f3\u30c8\u306b\u554f\u984c\u306f\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002",
    group_general: "一般", group_platforms: "プラットフォーム", group_insights: "インサイト",
    group_account: "アカウント", group_settings: "設定",
    nav_overview: "概要", nav_analytics: "分析", nav_diagnostics: "診断",
    nav_themes: "テーマ", nav_language: "言語", nav_account: "アカウント", nav_pricing: "プランと料金",
    btn_refresh: "更新", btn_analyze: "分析", btn_export: "CSV書き出し", palette_hint: "検索",
    analytics_subtitle: "収集済みデータからコードでローカル計算 — 人気の投稿と最適な投稿時間帯、AIコストなし。",
    analytics_top_posts: "🏆 トップ投稿/動画（再生数順）", analytics_best_hours: "🕐 最適な時間帯（平均再生数）",
    diagnostics_subtitle: "コードによって即座に無料で計算 — エラーを検出し、Refreshのたびに更新されます。",
    themes_subtitle: "ダッシュボードの外観を選択 — 次回起動時も保存されます。",
    language_subtitle: "インターフェースの言語を選択 — 次回起動時も保存されます。",
    empty_no_data: "データがありません — Refreshを押してください。", empty_configure_yt: ".envでYT_CHANNELSを設定してください。",
    empty_configure_ig: ".envでIG_ACCOUNTSを設定してください。", empty_configure_tt: ".envでTT_ACCOUNTSを設定してください。",
    empty_not_configured: "未設定。",
    label_subscribers_total: "総登録者数", label_channels: "チャンネル数", label_followers_total: "総フォロワー数",
    label_accounts: "アカウント", label_accounts_configured: "設定済みアカウント", label_credentials: "認証情報",
    val_ok: "OK", val_missing: "未設定", label_site: "サイト", val_online: "オンライン", val_down: "ダウン",
    label_subscribers: "登録者数", label_total_views: "総再生回数", label_videos_published: "公開動画数",
    label_recent_views: "再生数（直近10本）", label_last_publish: "最終公開日", label_never_published: "未公開",
    label_followers: "フォロワー", label_views_recent: "再生数（最近の投稿）", label_likes: "いいね", label_comments: "コメント",
    label_views: "再生数", label_likes_comments_shares: "いいね / コメント / シェア",
    val_online_latency: "オンライン（{ms}ms）", val_down_error: "ダウン / エラー", label_npm_vulns: "npmの脆弱性",
    label_eslint: "ESLint", val_not_configured: "未設定", val_errors_warnings: "エラー{e}件、警告{w}件",
    insight_loading: "分析中…", insight_error: "分析中にエラーが発生しました: ",
    analytics_empty: "分析に十分なデータのある投稿/動画がまだありません — Refreshを押してください。",
    analytics_untitled: "（タイトルなし）", analytics_avg_views: "平均再生数", analytics_bucket_count: "この時間帯で分析された投稿数",
    analytics_last_refresh: "最終データ取得: {t}（{d}）", analytics_last_refresh_never: "最終データ取得: なし — Refreshを押してください。",
    footer_last_refresh: "最終更新: {d}", footer_never: "未更新", footer_error: "更新中にエラーが発生しました。再試行してください。",
    time_never: "なし", time_seconds_ago: "数秒前", time_min_ago: "{n}分前", time_hours_ago: "{n}時間前", time_days_ago: "{n}日前",
    diag_next_step_label: "次のステップ:",
    yt_total_views_lag_note: "YouTubeでは小規模・新規チャンネルの累計再生数の更新に数時間〜数日かかることがあります — ダッシュボードの不具合ではありません。",
    overview_sub: "{p}個のプラットフォームで{n}件のアカウントを監視中。", overview_sub_empty: "Refreshを押してデータを読み込んでください。",
    trend_since: "前回から", trend_no_history: "もう一度更新すると推移が表示されます。",
    account_guest: "ゲスト", account_signin_hint: "ログインして保存",
    auth_tab_login: "ログイン", auth_tab_register: "新規登録",
    auth_title_login: "おかえりなさい", auth_title_register: "アカウントを作成",
    auth_sub_login: "ログインしてプランと設定を同期しましょう。", auth_sub_register: "30秒で完了。カード不要です。",
    auth_name: "お名前", auth_first_name: "名", auth_last_name: "姓", auth_birth_date: "生年月日",
    auth_email: "メールアドレス", auth_password: "パスワード", auth_password_confirm: "パスワード（確認）",
    auth_switch_to_register: "アカウントをお持ちでないですか？", auth_switch_to_login: "すでにアカウントをお持ちですか？",
    auth_aside_badge: "すべてが一か所に",
    auth_aside_title: "調子を知るために6つのアプリを開くのはもう終わりです。",
    auth_aside_1: "すべてのアカウントをひと目で確認",
    auth_aside_2: "数値が下がったときに気づける",
    auth_aside_3: "投稿が伸びる時間帯がわかる",
    auth_aside_4: "トークンはサーバーではなく自分のPCに保存",
    auth_aside_foot: "開始にカードは不要です。",
    auth_logout: "ログアウト", account_upgrade: "Proにアップグレード", account_since: "アカウント作成日: {d}",
    err_email_invalid: "有効なメールアドレスを入力してください。", err_password_short: "8文字以上で入力してください。",
    err_required: "必須項目です。", err_birth_date_future: "未来の日付は選択できません。",
    err_age_min: "{n}歳以上である必要があります。", err_password_mismatch: "パスワードが一致しません。",
    toast_welcome: "ようこそ、{n}さん！", toast_logged_in: "おかえりなさい、{n}さん！", toast_logged_out: "ログアウトしました。",
    toast_refresh_done: "データを更新しました。", toast_export_done: "CSVを書き出しました。",
    toast_login_required: "プランを選ぶ前にログインしてください。",
    pricing_title: "必要な分だけ選べます", pricing_sub: "無料で開始。数字が重要になったらProへ。",
    pricing_monthly: "月額", pricing_yearly: "年額", pricing_save: "2か月無料",
    plan_popular: "一番人気", plan_free_cta: "無料で始める", plan_cta: "{p}を選ぶ",
    plan_current: "現在のプラン", plan_period_month: "/月", plan_period_year: "/年",
    plan_billed_yearly: "年1回 {a}€ のお支払い", plan_billed_free: "ずっと無料",
    pricing_note_ready: "Stripeによる安全な決済。いつでも解約できます。",
    pricing_note_setup: "決済は未設定です: .env に STRIPE_SECRET_KEY を追加すると有効になります。",
    palette_placeholder: "移動先…", palette_empty: "結果がありません。",
    strength_labels: "弱い,弱い,普通,良い,強い",
  },
};

function currentLang() { return localStorage.getItem("dashboard-lang") || "it"; }
function langMeta() { return LANGS.find(l => l.code === currentLang()) || LANGS[0]; }

function t(key, vars) {
  const lang = currentLang();
  let str = (I18N[lang] && I18N[lang][key]) || I18N.it[key] || key;
  if (vars) Object.keys(vars).forEach(k => { str = str.split(`{${k}}`).join(vars[k]); });
  return str;
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  const pi = document.getElementById("palette-input");
  if (pi) pi.placeholder = t("palette_placeholder");
}

// ---------- Utility ----------
const lastRefreshEl = document.getElementById("last-refresh");
const btnRefresh = document.getElementById("btn-refresh");
const progressWrap = document.getElementById("refresh-progress");
const progressBar = document.getElementById("refresh-progress-bar");
const progressLabel = document.getElementById("refresh-progress-label");

let currentSnapshot = {};
let currentUser = null;
let plansData = null;
let billingCycle = "monthly";
let appConfig = null;

/** Piattaforme realmente attive: nella build destinata ai clienti i moduli
 *  personali (CertSprint) non esistono e non devono comparire da nessuna
 *  parte - ne' in sidebar, ne' in panoramica, ne' in diagnostica. */
function activePlatforms() {
  const enabled = appConfig?.platforms;
  return Object.keys(PLATFORM_LABELS).filter(p => !enabled || enabled.includes(p));
}

/** Nasconde i richiami al collegamento per le piattaforme che in questa
 *  build non sono collegabili: un pulsante che non puo' funzionare e'
 *  peggio della sua assenza. */
function applyConnectAvailability() {
  const modes = connectionsData?.modes || {};
  document.querySelectorAll("[data-link-platform]").forEach(btn => {
    const mode = modes[btn.dataset.linkPlatform];
    btn.classList.toggle("hidden", !mode || mode === "unavailable" || mode === "unsupported");
  });
}

function applyConfig() {
  const enabled = appConfig?.platforms || [];
  Object.keys(PLATFORM_LABELS).forEach(p => {
    const hide = enabled.length > 0 && !enabled.includes(p);
    document.querySelectorAll(`.nav-item[data-section="${p}"]`).forEach(el => el.classList.toggle("hidden", hide));
    const section = document.getElementById(`section-${p}`);
    if (section && hide) section.classList.add("hidden");
  });
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function fmtNum(n) {
  if (n === undefined || n === null) return "–";
  return new Intl.NumberFormat(langMeta().locale).format(n);
}

function fmtTime(ts) {
  if (!ts) return t("time_never");
  return new Date(ts * 1000).toLocaleString(langMeta().locale);
}

function fmtDateOnly(ts) {
  if (!ts) return t("time_never");
  return new Date(ts * 1000).toLocaleDateString(langMeta().locale);
}

function fmtTimeAgo(ts) {
  if (!ts) return t("time_never");
  const diff = Math.max(0, Math.floor(Date.now() / 1000) - ts);
  if (diff < 60) return t("time_seconds_ago");
  if (diff < 3600) return t("time_min_ago", { n: Math.floor(diff / 60) });
  if (diff < 86400) return t("time_hours_ago", { n: Math.floor(diff / 3600) });
  return t("time_days_ago", { n: Math.floor(diff / 86400) });
}

function lastPublishTs(items, field, isUnix) {
  if (!items || !items.length) return null;
  let max = null;
  for (const it of items) {
    const raw = it[field];
    if (!raw) continue;
    const ts = isUnix ? raw : Math.floor(new Date(raw).getTime() / 1000);
    if (ts && (max === null || ts > max)) max = ts;
  }
  return max;
}

// ---------- Toast ----------
function toast(message, kind = "") {
  const host = document.getElementById("toasts");
  const el = document.createElement("div");
  el.className = `toast ${kind}`;
  el.textContent = message;
  host.appendChild(el);
  setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 250);
  }, 3600);
}

// ---------- Sparkline ----------
function sparkline(series) {
  if (!series || series.length < 2) return "";
  const w = 200, h = 34, pad = 3;
  const vals = series.map(p => p.v);
  const min = Math.min(...vals), max = Math.max(...vals);
  const range = (max - min) || 1;
  const pts = series.map((p, i) => {
    const x = (i / (series.length - 1)) * w;
    const y = h - pad - ((p.v - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const [lx, ly] = pts[pts.length - 1];
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <path class="spark-area" d="${area}"/>
    <path class="spark-line" d="${line}" vector-effect="non-scaling-stroke"/>
    <circle class="spark-dot" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="2.5" vector-effect="non-scaling-stroke"/>
  </svg>`;
}

function deltaChip(delta, invert = false) {
  if (!delta || delta.diff === 0) {
    return `<span class="delta flat">■ 0</span>`;
  }
  const positive = delta.diff > 0;
  // Per la latenza "in aumento" e' un peggioramento: invert ribalta i colori.
  const good = invert ? !positive : positive;
  const arrow = positive ? "▲" : "▼";
  const pct = delta.pct === null || delta.pct === undefined
    ? `${positive ? "+" : ""}${fmtNum(delta.diff)}`
    : `${positive ? "+" : ""}${delta.pct}%`;
  return `<span class="delta ${good ? "up" : "down"}">${arrow} ${pct}</span>`;
}

// ---------- Tema ----------
const THEMES = [
  { id: "dark", name: "Scuro", colors: ["#0f1115", "#7c8cff", "#171a21"] },
  { id: "light", name: "Chiaro", colors: ["#f4f5f8", "#5b6cf0", "#ffffff"] },
  { id: "midnight", name: "Midnight", colors: ["#080b18", "#5ee6ff", "#10142a"] },
  { id: "sunset", name: "Sunset", colors: ["#1a1210", "#ff8a5c", "#241a17"] },
  { id: "forest", name: "Forest", colors: ["#0e1712", "#4ade80", "#16211a"] },
  { id: "rose", name: "Rose", colors: ["#180f14", "#f472b6", "#221620"] },
  { id: "ocean", name: "Ocean", colors: ["#071620", "#38bdf8", "#0e2130"] },
  { id: "mono", name: "Mono", colors: ["#121212", "#d4d4d4", "#1c1c1c"] },
];

function renderThemeGrid() {
  const grid = document.getElementById("theme-grid");
  const current = localStorage.getItem("dashboard-theme") || "dark";
  grid.innerHTML = THEMES.map(th => `
    <button class="theme-card ${th.id === current ? "active" : ""}" data-theme="${th.id}">
      ${th.id === current ? '<span class="check">✓</span>' : ""}
      <div class="swatch-row">${th.colors.map(c => `<span class="swatch" style="background:${c}"></span>`).join("")}</div>
      <div class="theme-name">${th.name}</div>
    </button>`).join("");
  grid.querySelectorAll(".theme-card").forEach(card => {
    card.addEventListener("click", () => { applyTheme(card.dataset.theme); renderThemeGrid(); });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("dashboard-theme", theme);
}

function renderLanguageGrid() {
  const grid = document.getElementById("language-grid");
  if (!grid) return;
  const current = currentLang();
  grid.innerHTML = LANGS.map(l => `
    <button class="theme-card ${l.code === current ? "active" : ""}" data-lang="${l.code}">
      ${l.code === current ? '<span class="check">✓</span>' : ""}
      <div class="swatch-row"><span class="lang-badge">${l.code.toUpperCase()}</span></div>
      <div class="theme-name">${l.name}</div>
    </button>`).join("");
  grid.querySelectorAll(".theme-card").forEach(card => {
    card.addEventListener("click", () => {
      localStorage.setItem("dashboard-lang", card.dataset.lang);
      applyStaticTranslations();
      renderLanguageGrid();
      renderAuthTexts();
      if (currentSnapshot) renderAll(currentSnapshot);
      if (plansData) renderPlans();
    });
  });
}

// ---------- Navigazione ----------
function goTo(section) {
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.section === section));
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(`section-${section}`);
  if (target) target.classList.add("active");
  if (section === "pricing" && !plansData) loadPlans();
}

document.querySelectorAll("[data-section]").forEach(btn => {
  btn.addEventListener("click", () => goTo(btn.dataset.section));
});
document.querySelectorAll("[data-goto]").forEach(btn => {
  btn.addEventListener("click", () => goTo(btn.dataset.goto));
});

// ---------- Overview ----------
function countAccounts(snapshot) {
  let n = 0;
  (snapshot.youtube?.channels || []).forEach(c => { if (c.ok) n++; });
  (snapshot.instagram?.accounts || []).forEach(a => { if (a.ok) n++; });
  (snapshot.tiktok?.accounts || []).forEach(a => { if (a.ok) n++; });
  return n;
}

function tile(label, value, foot, suffix) {
  return `<div class="hero-tile">
    <div class="tile-label">${label}</div>
    <div class="tile-value">${value}${suffix ? `<small>${suffix}</small>` : ""}</div>
    ${foot ? `<div class="tile-foot">${foot}</div>` : ""}
  </div>`;
}

function renderHeroTiles(snapshot) {
  const host = document.getElementById("hero-tiles");
  const trends = snapshot.trends || {};

  const followers = (snapshot.youtube?.channels || []).reduce((s, c) => s + (c.subscribers || 0), 0)
    + (snapshot.instagram?.accounts || []).reduce((s, a) => s + (a.followers || 0), 0);

  const recentViews = (snapshot.youtube?.channels || []).reduce((s, c) => s + (c.recent_views_last10 || 0), 0)
    + (snapshot.instagram?.accounts || []).reduce((s, a) => s + ((a.totals_last_n || {}).views || 0), 0)
    + (snapshot.tiktok?.accounts || []).reduce((s, a) => s + ((a.totals_last_n || {}).views || 0), 0);

  const engagement = (snapshot.instagram?.accounts || []).reduce((s, a) => {
    const tt = a.totals_last_n || {};
    return s + (tt.likes || 0) + (tt.comments || 0);
  }, 0) + (snapshot.youtube?.channels || []).reduce((s, c) =>
    s + (c.recent_videos || []).reduce((n, v) => n + (v.likes || 0) + (v.comments || 0), 0), 0);

  const score = snapshot.diagnostics?.score;
  const ytDelta = trends.youtube?.primary?.delta;
  const igDelta = trends.instagram?.primary?.delta;
  const followerDelta = ytDelta || igDelta;

  host.innerHTML =
    tile(t("tile_followers"), fmtNum(followers), followerDelta ? deltaChip(followerDelta) : "")
    + tile(t("tile_recent_views"), fmtNum(recentViews), t("tile_recent_views_foot"))
    + tile(t("tile_engagement"), fmtNum(engagement), t("tile_engagement_foot"))
    + tile(t("tile_health"), score ?? "–", `${countAccounts(snapshot)} ${t("tile_accounts_foot")}`, score != null ? "%" : "");
}

function renderOverview(snapshot) {
  const grid = document.getElementById("overview-grid");
  const trends = snapshot.trends || {};

  const sub = document.getElementById("overview-sub");
  const n = countAccounts(snapshot);
  sub.textContent = n ? t("overview_sub", { n, p: activePlatforms().length }) : t("overview_sub_empty");
  renderHeroTiles(snapshot);

  grid.innerHTML = activePlatforms().map(key => {
    const data = snapshot[key];
    const tr = trends[key]?.primary;
    let body;
    if (!data) {
      body = `<div class="empty">${t("empty_no_data")}</div>`;
    } else if (key === "youtube") {
      const total = (data.channels || []).reduce((s, c) => s + (c.subscribers || 0), 0);
      body = `<div class="stat-row"><span class="label">${t("label_subscribers_total")}</span><span class="value">${fmtNum(total)}</span></div>
              <div class="sub-item"><span class="name">${t("label_channels")}</span><span>${(data.channels || []).length}</span></div>`;
    } else if (key === "instagram") {
      const total = (data.accounts || []).reduce((s, a) => s + (a.followers || 0), 0);
      body = `<div class="stat-row"><span class="label">${t("label_followers_total")}</span><span class="value">${fmtNum(total)}</span></div>
              <div class="sub-item"><span class="name">${t("label_accounts")}</span><span>${(data.accounts || []).length}</span></div>`;
    } else if (key === "tiktok") {
      const ok = (data.accounts || []).filter(a => a.ok).length;
      body = ok
        ? `<div class="stat-row"><span class="label">${t("label_views")}</span><span class="value">${fmtNum((data.accounts || []).reduce((s, a) => s + ((a.totals_last_n || {}).views || 0), 0))}</span></div>`
        : `<div class="empty">${t("empty_not_configured")}</div>`;
    } else if (key === "x") {
      body = `<div class="stat-row"><span class="label">${t("label_credentials")}</span><span class="value">${data.credentials_configured ? t("val_ok") : t("val_missing")}</span></div>`;
    } else if (key === "certsprint") {
      const up = data.uptime || {};
      body = `<div class="stat-row"><span class="label">${t("label_site")}</span><span class="value">${up.up ? t("val_online") : t("val_down")}</span></div>`;
    }

    const spark = tr && tr.series.length > 1 ? sparkline(tr.series) : "";
    const chip = tr && tr.delta ? deltaChip(tr.delta, key === "certsprint") : "";
    return `<div class="card">
      <div class="card-head">
        <h2><span class="card-ico">${PLATFORM_ICONS[key]}</span>${PLATFORM_LABELS[key]}</h2>
        ${chip}
      </div>
      ${body}
      ${spark}
    </div>`;
  }).join("");
}

// ---------- Dettagli ----------
/** Bottone "Collega account" da mostrare dentro gli stati vuoti o di
 *  errore: e' li' che serve davvero, non solo in cima alla sezione. */
function connectCta(platform) {
  const mode = connectionsData?.modes?.[platform];
  if (!mode || mode === "unavailable" || mode === "unsupported") return "";
  return `<button class="btn-analyze inline-connect" data-inline-connect="${platform}">
    <span class="link-ico">\u{1F517}</span> ${t("btn_link_account_full")}</button>`;
}

function wireInlineConnect(root) {
  if (!root) return;
  root.querySelectorAll("[data-inline-connect]").forEach(btn => {
    btn.addEventListener("click", () => openConnectModal(btn.dataset.inlineConnect));
  });
}

function renderYoutubeDetail(data) {
  const el = document.getElementById("youtube-detail");
  if (!data) { el.innerHTML = `<div class="empty">${t("empty_no_data")}</div>`; return; }
  const channels = data.channels || [];
  if (!channels.length) {
    el.innerHTML = `<div class="empty">${t("empty_configure_yt")}</div>${connectCta("youtube")}`;
    wireInlineConnect(el); return;
  }
  el.innerHTML = channels.map(c => {
    if (!c.ok) return `<div class="entity-block"><div class="entity-title">${esc(c.name)}</div><div class="error-text">${esc(c.error)}</div>${connectCta("youtube")}</div>`;
    const lastPub = lastPublishTs(c.recent_videos, "published", false);
    const viewsLag = c.total_views === 0 && (c.recent_views_last10 || 0) > 0;
    return `<div class="entity-block">
      <div class="entity-title">${esc(c.name)} <span class="muted">(${esc(c.title)})</span></div>
      <div class="stat-row"><span class="label">${t("label_subscribers")}</span><span class="value">${fmtNum(c.subscribers)}</span></div>
      <div class="stat-row"><span class="label">${t("label_total_views")}</span><span class="value">${fmtNum(c.total_views)}</span></div>
      ${viewsLag ? `<div class="rank-meta" style="margin:-4px 0 6px;">ℹ️ ${t("yt_total_views_lag_note")}</div>` : ""}
      <div class="sub-item"><span class="name">${t("label_videos_published")}</span><span>${fmtNum(c.video_count)}</span></div>
      <div class="sub-item"><span class="name">${t("label_recent_views")}</span><span>${fmtNum(c.recent_views_last10)}</span></div>
      <div class="sub-item"><span class="name">${t("label_last_publish")}</span><span>${lastPub ? fmtTime(lastPub) : t("label_never_published")}</span></div>
    </div>`;
  }).join("");
}

function renderInstagramDetail(data) {
  const el = document.getElementById("instagram-detail");
  if (!data) { el.innerHTML = `<div class="empty">${t("empty_no_data")}</div>`; return; }
  const accounts = data.accounts || [];
  if (!accounts.length) {
    el.innerHTML = `<div class="empty">${t("empty_configure_ig")}</div>${connectCta("instagram")}`;
    wireInlineConnect(el); return;
  }
  el.innerHTML = accounts.map(a => {
    if (!a.ok) return `<div class="entity-block"><div class="entity-title">${esc(a.name)}</div><div class="error-text">${esc(a.error)}</div>${connectCta("instagram")}</div>`;
    const tot = a.totals_last_n || {};
    const lastPub = lastPublishTs(a.recent_posts, "timestamp", false);
    return `<div class="entity-block">
      <div class="entity-title">${esc(a.name)}</div>
      <div class="stat-row"><span class="label">${t("label_followers")}</span><span class="value">${fmtNum(a.followers)}</span></div>
      <div class="sub-item"><span class="name">${t("label_views_recent")}</span><span>${fmtNum(tot.views)}</span></div>
      <div class="sub-item"><span class="name">${t("label_likes")}</span><span>${fmtNum(tot.likes)}</span></div>
      <div class="sub-item"><span class="name">${t("label_comments")}</span><span>${fmtNum(tot.comments)}</span></div>
      <div class="sub-item"><span class="name">${t("label_last_publish")}</span><span>${lastPub ? fmtTime(lastPub) : t("label_never_published")}</span></div>
    </div>`;
  }).join("");
}

function renderTiktokDetail(data) {
  const el = document.getElementById("tiktok-detail");
  if (!data) { el.innerHTML = `<div class="empty">${t("empty_no_data")}</div>`; return; }
  const accounts = data.accounts || [];
  if (!accounts.length) {
    el.innerHTML = `<div class="empty">${t("empty_configure_tt")}</div>${connectCta("tiktok")}`;
    wireInlineConnect(el); return;
  }
  el.innerHTML = accounts.map(a => {
    if (a.not_configured) return `<div class="entity-block"><div class="entity-title">${esc(a.name)}</div><div class="empty">${t("empty_not_configured")}</div>${connectCta("tiktok")}</div>`;
    if (!a.ok) return `<div class="entity-block"><div class="entity-title">${esc(a.name)}</div><div class="error-text">${esc(a.error)}</div>${connectCta("tiktok")}</div>`;
    const tot = a.totals_last_n || {};
    const lastPub = lastPublishTs(a.recent_videos, "create_time", true);
    return `<div class="entity-block">
      <div class="entity-title">${esc(a.name)}</div>
      <div class="stat-row"><span class="label">${t("label_views")}</span><span class="value">${fmtNum(tot.views)}</span></div>
      <div class="sub-item"><span class="name">${t("label_likes_comments_shares")}</span><span>${fmtNum(tot.likes)} / ${fmtNum(tot.comments)} / ${fmtNum(tot.shares)}</span></div>
      <div class="sub-item"><span class="name">${t("label_last_publish")}</span><span>${lastPub ? fmtTime(lastPub) : t("label_never_published")}</span></div>
    </div>`;
  }).join("");
}

function renderXDetail(data) {
  const el = document.getElementById("x-detail");
  if (!data) { el.innerHTML = `<div class="empty">${t("empty_no_data")}</div>`; return; }
  el.innerHTML = `<div class="stat-row"><span class="label">${t("label_credentials")}</span><span class="value">${data.credentials_configured ? t("val_ok") : t("val_missing")}</span></div>
    <div class="sub-item">${esc(data.limitation || "")}</div>`;
}

function renderCertsprintDetail(data) {
  const el = document.getElementById("certsprint-detail");
  if (!data) { el.innerHTML = `<div class="empty">${t("empty_no_data")}</div>`; return; }
  const lint = data.eslint || {};
  const uptime = data.uptime || {};
  const vulns = (data.npm_audit || {}).vulnerabilities || {};
  el.innerHTML = `
    <div class="stat-row"><span class="label">${t("label_site")}</span><span class="value">${uptime.up ? t("val_online_latency", { ms: uptime.latency_ms }) : t("val_down_error")}</span></div>
    <div class="stat-row"><span class="label">${t("label_npm_vulns")}</span><span class="value">${fmtNum(vulns.critical || 0)}C / ${fmtNum(vulns.high || 0)}H / ${fmtNum(vulns.moderate || 0)}M</span></div>
    <div class="sub-item"><span class="name">${t("label_eslint")}</span><span>${lint.configured ? t("val_errors_warnings", { e: fmtNum(lint.errors), w: fmtNum(lint.warnings) }) : t("val_not_configured")}</span></div>`;
}

const DETAIL_RENDERERS = {
  youtube: renderYoutubeDetail,
  instagram: renderInstagramDetail,
  tiktok: renderTiktokDetail,
  x: renderXDetail,
  certsprint: renderCertsprintDetail,
};

// ---------- Insight ----------
function showInsightBox(platform, text) {
  const box = document.getElementById(`${platform}-insight`);
  box.classList.remove("hidden");
  const lines = String(text).split("\n").map(l => l.trim()).filter(Boolean);
  box.innerHTML = `<ul>${lines.map(l => `<li>${esc(l.replace(/^[-•*]\s*/, ""))}</li>`).join("")}</ul>`;
}

function showInsightLoading(platform) {
  const box = document.getElementById(`${platform}-insight`);
  box.classList.remove("hidden");
  box.innerHTML = `<div class="spinner-row"><div class="spinner"></div> ${t("insight_loading")}</div>`;
}

document.querySelectorAll(".btn-analyze[data-platform]").forEach(btn => {
  btn.addEventListener("click", async () => {
    const platform = btn.dataset.platform;
    btn.disabled = true;
    showInsightLoading(platform);
    try {
      const resp = await fetch(`/api/insights/${platform}`, { method: "POST" });
      const data = await resp.json();
      showInsightBox(platform, data.text || data.detail || "");
    } catch (e) {
      showInsightBox(platform, `${t("insight_error")}${e}`);
    } finally {
      btn.disabled = false;
    }
  });
});

// ---------- Analitiche ----------
function renderAnalytics(a) {
  const topEl = document.getElementById("top-posts-list");
  const hoursEl = document.getElementById("best-hours-list");
  const lastEl = document.getElementById("analytics-last-refresh");
  if (lastEl) {
    lastEl.textContent = a && a.last_refresh_at
      ? t("analytics_last_refresh", { t: fmtTimeAgo(a.last_refresh_at), d: fmtTime(a.last_refresh_at) })
      : t("analytics_last_refresh_never");
  }
  const tilesEl = document.getElementById("analytics-tiles");
  const chartEl = document.getElementById("hours-chart");

  if (!a || !a.total_items_analyzed) {
    const empty = `<div class="empty">${t("analytics_empty")}</div>`;
    topEl.innerHTML = empty; hoursEl.innerHTML = empty;
    tilesEl.innerHTML = ""; chartEl.innerHTML = "";
    return;
  }

  // Tessere di riepilogo
  const best = a.best_hours[0];
  const bestPlatform = Object.entries(a.per_platform || {})
    .sort((x, y) => y[1].views - x[1].views)[0];
  const avgViews = Math.round((a.total_views || 0) / a.total_items_analyzed);

  tilesEl.innerHTML =
    tile(t("tile_analyzed"), fmtNum(a.total_items_analyzed), t("tile_analyzed_foot"))
    + tile(t("tile_avg_per_post"), fmtNum(avgViews), t("tile_avg_per_post_foot"))
    + tile(t("tile_best_hour"), best ? `${String(best.hour).padStart(2, "0")}:00` : "–",
           best ? t("tile_best_hour_foot", { v: fmtNum(best.avg_views) }) : "")
    + tile(t("tile_best_platform"), bestPlatform ? PLATFORM_LABELS[bestPlatform[0]] || bestPlatform[0] : "–",
           bestPlatform ? t("tile_best_platform_foot", { v: fmtNum(bestPlatform[1].views) }) : "");

  // Grafico della giornata: tutte le 24 ore, con evidenziate le migliori
  const hours = a.all_hours || [];
  const maxAvg = Math.max(...hours.map(h => h.avg_views), 1);
  const topHours = new Set(a.best_hours.slice(0, 3).map(h => h.hour));
  chartEl.innerHTML = hours.map(h => {
    const pct = (h.avg_views / maxAvg) * 100;
    const cls = h.count === 0 ? "empty" : topHours.has(h.hour) ? "top" : "";
    const label = t("hours_tooltip", { h: String(h.hour).padStart(2, "0"), v: fmtNum(h.avg_views), n: h.count });
    return `<div class="hour-col ${cls}" title="${esc(label)}">
      <div class="hour-bar" style="height:${Math.max(pct, h.count ? 4 : 1.5)}%"></div>
      <span class="hour-label">${h.hour % 3 === 0 ? String(h.hour).padStart(2, "0") : ""}</span>
    </div>`;
  }).join("");

  const maxViews = Math.max(...a.top_posts.map(p => p.views), 1);
  topEl.innerHTML = a.top_posts.map((p, idx) => `
    <div class="rank-item">
      <div class="rank-item-top">
        <span class="rank-title"><span class="rank-num">${idx + 1}</span><span class="platform-chip">${esc(p.platform)}</span>${esc(p.title || t("analytics_untitled"))}</span>
        <span class="rank-value">${fmtNum(p.views)}</span>
      </div>
      <div class="rank-bar-track"><div class="rank-bar-fill" style="width:${(p.views / maxViews) * 100}%"></div></div>
      <div class="rank-meta">${esc(p.account)}</div>
    </div>`).join("");

  const maxHour = Math.max(...a.best_hours.map(h => h.avg_views), 1);
  hoursEl.innerHTML = a.best_hours.map((h, idx) => `
    <div class="rank-item">
      <div class="rank-item-top">
        <span class="rank-title"><span class="rank-num">${idx + 1}</span>${String(h.hour).padStart(2, "0")}:00 UTC</span>
        <span class="rank-value">${fmtNum(h.avg_views)} ${t("analytics_avg_views")}</span>
      </div>
      <div class="rank-bar-track"><div class="rank-bar-fill" style="width:${(h.avg_views / maxHour) * 100}%"></div></div>
      <div class="rank-meta">${h.count} ${t("analytics_bucket_count")}</div>
    </div>`).join("");
}

// ---------- Diagnostica ----------
let diagFilter = "all";
let lastDiag = null;

const DIAG_ICONS = { red: "!", yellow: "!", green: "✓" };

function renderDiagnostics(diag) {
  lastDiag = diag || lastDiag;
  const list = document.getElementById("diagnostics-list");
  const badge = document.getElementById("diag-badge");
  if (!lastDiag || !lastDiag.issues) { list.innerHTML = `<div class="empty">${t("empty_no_data")}</div>`; return; }

  const counts = lastDiag.counts || {};
  const problems = (counts.red || 0) + (counts.yellow || 0);
  badge.textContent = problems;
  badge.classList.toggle("hidden", problems === 0);

  // Anello del punteggio di salute
  const score = lastDiag.score ?? 0;
  const ring = document.getElementById("health-ring-fg");
  const circumference = 2 * Math.PI * 42;
  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = circumference * (1 - score / 100);
  ring.style.stroke = score >= 80 ? "var(--green)" : score >= 50 ? "var(--yellow)" : "var(--red)";
  document.getElementById("health-score-num").textContent = score;

  const key = counts.red ? "health_bad" : counts.yellow ? "health_warn" : "health_good";
  document.getElementById("health-title").textContent = t(`${key}_title`);
  document.getElementById("health-sub").textContent = t(`${key}_sub`, { n: problems });
  document.getElementById("hc-red").textContent = counts.red || 0;
  document.getElementById("hc-yellow").textContent = counts.yellow || 0;
  document.getElementById("hc-green").textContent = counts.green || 0;

  const visible = lastDiag.issues.filter(i =>
    diagFilter === "all" ? true
      : diagFilter === "problems" ? i.severity !== "green"
      : i.severity === "green"
  );

  list.innerHTML = visible.length ? visible.map(i => `
    <div class="diag-item ${i.severity}">
      <span class="diag-icon ${i.severity}">${DIAG_ICONS[i.severity] || "•"}</span>
      <div class="diag-body">
        <div class="diag-head">
          <span class="diag-title">${esc(i.title || i.text)}</span>
          ${i.category ? `<span class="diag-category">${esc(i.category)}</span>` : ""}
        </div>
        ${i.title && i.text ? `<div class="diag-text">${esc(i.text)}</div>` : ""}
        ${i.next_step && i.severity !== "green"
          ? `<div class="diag-next-step"><b>${t("diag_next_step_label")}</b> ${esc(i.next_step)}</div>` : ""}
        ${i.action && i.action.type === "goto"
          ? `<button class="btn-analyze diag-action" data-goto-action="${esc(i.action.section)}">${t("diag_go_connect")}</button>` : ""}
      </div>
    </div>`).join("")
    : `<div class="empty">${t("diag_filter_empty")}</div>`;

  list.querySelectorAll("[data-goto-action]").forEach(btn => {
    btn.addEventListener("click", () => goTo(btn.dataset.gotoAction));
  });

  // Pallino di stato accanto ad ogni piattaforma nella sidebar
  const worst = {};
  lastDiag.issues.forEach(i => {
    if (worst[i.platform] === "red") return;
    if (i.severity === "red") worst[i.platform] = "red";
    else if (i.severity === "yellow" && worst[i.platform] !== "red") worst[i.platform] = "yellow";
    else if (!worst[i.platform]) worst[i.platform] = "green";
  });
  activePlatforms().forEach(p => {
    const dot = document.getElementById(`dot-${p}`);
    if (!dot) return;
    dot.className = "nav-dot" + (worst[p] === "green" ? " ok" : worst[p] ? " err" : "");
  });
}

document.querySelectorAll(".filter-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    diagFilter = chip.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach(c => c.classList.toggle("active", c === chip));
    renderDiagnostics(null);
  });
});

// ---------- Collega account ----------
const CONNECT_META = {
  youtube: { ico: "▶", name: "YouTube" },
  instagram: { ico: "◈", name: "Instagram" },
  tiktok: { ico: "♪", name: "TikTok" },
  x: { ico: "✕", name: "X" },
};

let connectionsData = null;

async function loadConnections() {
  try {
    connectionsData = await (await fetch("/api/connections")).json();
    renderConnections();
    applyConnectAvailability();
    if (currentSnapshot) renderAll(currentSnapshot);
  } catch (e) {
    document.getElementById("connect-grid").innerHTML = `<div class="empty">${esc(String(e))}</div>`;
  }
}

function renderConnections() {
  if (!connectionsData) return;
  const grid = document.getElementById("connect-grid");
  const platforms = (appConfig?.platforms || Object.keys(CONNECT_META)).filter(p => CONNECT_META[p]);

  grid.innerHTML = platforms.map(p => {
    const meta = CONNECT_META[p];
    const linked = connectionsData.connections.filter(c => c.platform === p);
    const unavailable = connectionsData.unavailable[p];

    const accountsHtml = linked.length ? `<div class="connect-accounts">${linked.map(c => `
      <div class="connect-account">
        <span class="connect-account-name">${esc(c.account_name)}</span>
        <button class="btn-unlink" data-unlink="${c.id}">${t("connect_unlink")}</button>
      </div>`).join("")}</div>` : "";

    const mode = connectionsData.modes?.[p] || "unsupported";
    const guided = mode === "guided";
    const cta = unavailable
      ? `<button class="btn-connect soon" disabled>${t("connect_soon")}</button>`
      : `<button class="btn-connect btn-analyze" data-${guided ? "guided" : "connect"}="${p}">${linked.length ? t("connect_add_another") : t("connect_now", { p: meta.name })}</button>`;

    const guidedPanel = guided ? `
      <div class="guided-panel hidden" id="guided-${p}">
        <div class="guided-step"><b>1.</b> ${t("guided_step1")}</div>
        <div class="guided-step"><b>2.</b> ${t("guided_step2")}</div>
        <input type="text" class="guided-input" id="guided-input-${p}" placeholder="${t("guided_placeholder")}">
        <div class="guided-actions">
          <button class="btn-ghost" data-guided-cancel="${p}">${t("guided_cancel")}</button>
          <button class="btn-analyze" data-guided-finish="${p}">${t("guided_finish")}</button>
        </div>
      </div>` : "";

    return `<div class="connect-card">
      <div class="connect-head">
        <span class="connect-logo">${meta.ico}</span>
        <div>
          <div class="connect-name">${meta.name}</div>
          <div class="connect-state ${linked.length ? "linked" : ""}">
            ${linked.length ? t("connect_linked_n", { n: linked.length }) : t("connect_not_linked")}
          </div>
        </div>
      </div>
      <div class="connect-desc">${unavailable ? esc(unavailable) : t("connect_desc", { p: meta.name })}</div>
      ${accountsHtml}
      ${cta}
      ${guidedPanel}
    </div>`;
  }).join("");

  grid.querySelectorAll("[data-connect]").forEach(btn => {
    btn.addEventListener("click", () => startConnect(btn.dataset.connect, btn));
  });
  grid.querySelectorAll("[data-guided]").forEach(btn => {
    btn.addEventListener("click", () => startGuided(btn.dataset.guided, btn));
  });
  grid.querySelectorAll("[data-guided-cancel]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById(`guided-${btn.dataset.guidedCancel}`).classList.add("hidden");
    });
  });
  grid.querySelectorAll("[data-guided-finish]").forEach(btn => {
    btn.addEventListener("click", () => finishGuided(btn.dataset.guidedFinish, btn));
  });
  grid.querySelectorAll("[data-unlink]").forEach(btn => {
    btn.addEventListener("click", () => unlinkConnection(btn.dataset.unlink));
  });
}

// ---------- Modale "Collega account" ----------
// Stesso pannello richiamabile da ogni sezione, cosi' il collegamento e'
// sempre a un clic di distanza senza dover cercare una pagina dedicata.
const connectModal = document.getElementById("connect-modal");
let cmPlatform = null;

function openConnectModal(platform) {
  cmPlatform = platform;
  const meta = CONNECT_META[platform];
  if (!meta) return;

  const linked = (connectionsData?.connections || []).filter(c => c.platform === platform);
  const unavailable = connectionsData?.unavailable?.[platform];
  // E' il backend a dire come si collega: quando la finestra dell'app puo'
  // ospitare il login, anche Instagram e TikTok diventano un solo bottone
  // e i passaggi manuali non compaiono affatto.
  const mode = connectionsData?.modes?.[platform] || "unsupported";
  const isGuided = mode === "guided";
  const isAuto = mode === "oneclick";

  document.getElementById("cm-logo").textContent = meta.ico;
  document.getElementById("cm-title").textContent = meta.name;
  document.getElementById("cm-sub").textContent = linked.length
    ? t("connect_linked_n", { n: linked.length })
    : t("connect_not_linked");

  const linkedHost = document.getElementById("cm-linked");
  linkedHost.innerHTML = linked.map(c => `
    <div class="connect-account">
      <span class="connect-account-name">${esc(c.account_name)}</span>
      <button class="btn-unlink" data-cm-unlink="${c.id}">${t("connect_unlink")}</button>
    </div>`).join("");
  linkedHost.querySelectorAll("[data-cm-unlink]").forEach(b => {
    b.addEventListener("click", async () => {
      await unlinkConnection(b.dataset.cmUnlink);
      openConnectModal(platform);
    });
  });

  document.getElementById("cm-auto").classList.toggle("hidden", !isAuto);
  document.getElementById("cm-guided").classList.toggle("hidden", !isGuided);
  document.getElementById("cm-unavailable").classList.toggle("hidden", !unavailable);
  document.getElementById("cm-unavailable").textContent = unavailable || "";
  document.getElementById("cm-auto-label").textContent = t("connect_now", { p: meta.name });
  document.getElementById("cm-paste").value = "";
  cmError("");

  connectModal.classList.remove("hidden");
}

function closeConnectModal() { connectModal.classList.add("hidden"); }

function cmError(message) {
  const box = document.getElementById("cm-error");
  box.textContent = message || "";
  box.classList.toggle("hidden", !message);
}

document.getElementById("connect-modal-close").addEventListener("click", closeConnectModal);
connectModal.addEventListener("click", e => { if (e.target === connectModal) closeConnectModal(); });

document.getElementById("cm-auto-btn").addEventListener("click", e => {
  startConnect(cmPlatform, e.currentTarget);
});

document.getElementById("cm-open-btn").addEventListener("click", async e => {
  const btn = e.currentTarget;
  btn.disabled = true;
  cmError("");
  try {
    const resp = await (await fetch(`/api/connections/authorize/${cmPlatform}`)).json();
    if (!resp.ok) { cmError(resp.message); return; }
    window.open(resp.url, "_blank");
    toast(t("connect_browser_opened"));
  } catch (err) {
    cmError(String(err));
  } finally {
    btn.disabled = false;
  }
});

document.getElementById("cm-finish").addEventListener("click", async e => {
  const btn = e.currentTarget;
  const pasted = document.getElementById("cm-paste").value.trim();
  if (!pasted) { cmError(t("guided_paste_needed")); return; }
  btn.disabled = true;
  cmError("");
  try {
    const resp = await (await fetch(`/api/connections/finish/${cmPlatform}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pasted }),
    })).json();
    if (!resp.ok) { cmError(resp.message); return; }
    toast(t("connect_success", { n: resp.account || "" }), "ok");
    closeConnectModal();
    await loadConnections();
    await refreshAll();
  } catch (err) {
    cmError(String(err));
  } finally {
    btn.disabled = false;
  }
});

document.querySelectorAll("[data-link-platform]").forEach(btn => {
  btn.addEventListener("click", () => openConnectModal(btn.dataset.linkPlatform));
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !connectModal.classList.contains("hidden")) closeConnectModal();
});

async function startGuided(platform, btn) {
  btn.disabled = true;
  try {
    const resp = await (await fetch(`/api/connections/authorize/${platform}`)).json();
    if (!resp.ok) { toast(resp.message, "err"); return; }
    window.open(resp.url, "_blank");
    document.getElementById(`guided-${platform}`).classList.remove("hidden");
    toast(t("connect_browser_opened"));
  } catch (e) {
    toast(String(e), "err");
  } finally {
    btn.disabled = false;
  }
}

async function finishGuided(platform, btn) {
  const input = document.getElementById(`guided-input-${platform}`);
  const pasted = input.value.trim();
  if (!pasted) { toast(t("guided_paste_needed"), "err"); return; }
  btn.disabled = true;
  try {
    const resp = await (await fetch(`/api/connections/finish/${platform}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pasted }),
    })).json();
    if (!resp.ok) { toast(resp.message, "err"); return; }
    toast(t("connect_success", { n: resp.account || "" }), "ok");
    input.value = "";
    await loadConnections();
    await refreshAll();
  } catch (e) {
    toast(String(e), "err");
  } finally {
    btn.disabled = false;
  }
}

async function startConnect(platform, btn) {
  const originalLabel = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = t("connect_waiting");
  cmError("");
  try {
    const resp = await (await fetch(`/api/connections/connect/${platform}`, { method: "POST" })).json();
    if (!resp.ok) { cmError(resp.message || "Errore"); toast(resp.message || "Errore", "err"); return; }
    toast(t("connect_browser_opened"));

    // Il login avviene nel browser: si attende che il flusso finisca.
    for (let i = 0; i < 400; i++) {
      await sleep(500);
      const st = await (await fetch("/api/connections/status")).json();
      if (st.running) continue;
      if (st.error) { cmError(st.error); toast(st.error, "err"); return; }
      if (st.done) {
        toast(t("connect_success", { n: st.account || "" }), "ok");
        closeConnectModal();
        await loadConnections();
        await refreshAll();
      }
      return;
    }
  } catch (e) {
    cmError(String(e));
    toast(String(e), "err");
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalLabel;
    renderConnections();
  }
}

async function unlinkConnection(id) {
  try {
    await fetch(`/api/connections/${id}`, { method: "DELETE" });
    toast(t("connect_unlinked"));
    await loadConnections();
  } catch (e) { toast(String(e), "err"); }
}

// ---------- Account ----------
function authToken() { return localStorage.getItem("dashboard-token") || ""; }
function authHeaders() {
  const tk = authToken();
  return tk ? { Authorization: `Bearer ${tk}` } : {};
}

function initials(user) {
  if (user.first_name || user.last_name) {
    return ((user.first_name?.[0] || "") + (user.last_name?.[0] || "")).toUpperCase() || "?";
  }
  const src = (user.name || user.email || "?").trim();
  const parts = src.split(/[\s@._-]+/).filter(Boolean);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || "?";
}

function renderUser() {
  const loggedOut = document.getElementById("account-logged-out");
  const loggedIn = document.getElementById("account-logged-in");
  const avatar = document.getElementById("user-avatar");
  const nameEl = document.getElementById("user-name");
  const planEl = document.getElementById("user-plan");

  if (!currentUser) {
    loggedOut.classList.remove("hidden");
    loggedIn.classList.add("hidden");
    avatar.textContent = "?";
    nameEl.textContent = t("account_guest");
    planEl.textContent = t("account_signin_hint");
    return;
  }

  loggedOut.classList.add("hidden");
  loggedIn.classList.remove("hidden");
  const ini = initials(currentUser);
  avatar.textContent = ini;
  nameEl.textContent = currentUser.name || currentUser.email.split("@")[0];
  planEl.textContent = currentUser.plan.charAt(0).toUpperCase() + currentUser.plan.slice(1);

  document.getElementById("acc-avatar").textContent = ini;
  document.getElementById("acc-name").textContent = currentUser.name || currentUser.email.split("@")[0];
  document.getElementById("acc-email").textContent = currentUser.email;
  document.getElementById("acc-plan").textContent = currentUser.plan;
  document.getElementById("acc-since").textContent = t("account_since", { d: fmtDateOnly(currentUser.created_at) });
}

let authMode = "login";

function renderAuthTexts() {
  const isLogin = authMode === "login";
  document.getElementById("auth-title").textContent = t(isLogin ? "auth_title_login" : "auth_title_register");
  document.getElementById("auth-sub").textContent = t(isLogin ? "auth_sub_login" : "auth_sub_register");
  document.getElementById("auth-submit-label").textContent = t(isLogin ? "auth_tab_login" : "auth_tab_register");
  document.getElementById("auth-switch-text").textContent = t(isLogin ? "auth_switch_to_register" : "auth_switch_to_login");
  document.getElementById("auth-switch-btn").textContent = t(isLogin ? "auth_tab_register" : "auth_tab_login");
  document.getElementById("field-name-row").classList.toggle("hidden", isLogin);
  document.getElementById("field-birth-date").classList.toggle("hidden", isLogin);
  document.getElementById("field-password-confirm").classList.toggle("hidden", isLogin);
  document.getElementById("strength").classList.toggle("hidden", isLogin);
  document.getElementById("auth-first-name").required = !isLogin;
  document.getElementById("auth-last-name").required = !isLogin;
  document.getElementById("auth-birth-date").required = !isLogin;
  document.getElementById("auth-password-confirm").required = !isLogin;
  document.getElementById("auth-password").setAttribute("autocomplete", isLogin ? "current-password" : "new-password");
  document.querySelectorAll(".auth-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.mode === authMode));
}

function setAuthMode(mode) {
  authMode = mode;
  document.getElementById("auth-error").classList.add("hidden");
  renderAuthTexts();
}

document.querySelectorAll(".auth-tab").forEach(tab => {
  tab.addEventListener("click", () => setAuthMode(tab.dataset.mode));
});
document.getElementById("auth-switch-btn").addEventListener("click", () => {
  setAuthMode(authMode === "login" ? "register" : "login");
});

document.getElementById("toggle-password").addEventListener("click", () => {
  const input = document.getElementById("auth-password");
  input.type = input.type === "password" ? "text" : "password";
});
document.getElementById("toggle-password-confirm").addEventListener("click", () => {
  const input = document.getElementById("auth-password-confirm");
  input.type = input.type === "password" ? "text" : "password";
});

const STRENGTH_COLORS = ["var(--red)", "var(--red)", "var(--yellow)", "var(--green)", "var(--green)"];
document.getElementById("auth-password").addEventListener("input", e => {
  if (authMode !== "register") return;
  const pw = e.target.value;
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  const classes = [/[a-z]/, /[A-Z]/, /\d/, /[^\w\s]/].filter(re => re.test(pw)).length;
  if (classes >= 3) score++;
  if (classes >= 4 && pw.length >= 10) score++;
  const labels = t("strength_labels").split(",");
  document.getElementById("strength-fill").style.width = `${(score / 4) * 100}%`;
  document.getElementById("strength-fill").style.background = STRENGTH_COLORS[score];
  document.getElementById("strength-label").textContent = pw ? labels[score] : "";
});

function fieldError(id, message) {
  document.getElementById(id).textContent = message || "";
}

const MIN_AGE_YEARS = 13;

function computeAge(isoDate) {
  const birth = new Date(isoDate + "T00:00:00");
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday = (today.getMonth() < birth.getMonth())
    || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  if (beforeBirthday) age--;
  return age;
}

document.getElementById("auth-form").addEventListener("submit", async e => {
  e.preventDefault();
  const isLogin = authMode === "login";
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;
  const passwordConfirm = document.getElementById("auth-password-confirm").value;
  const firstName = document.getElementById("auth-first-name").value.trim();
  const lastName = document.getElementById("auth-last-name").value.trim();
  const birthDate = document.getElementById("auth-birth-date").value;
  const errBox = document.getElementById("auth-error");
  const submit = document.getElementById("auth-submit");

  ["err-email", "err-password", "err-first-name", "err-last-name", "err-birth-date", "err-password-confirm"]
    .forEach(id => fieldError(id, ""));
  errBox.classList.add("hidden");

  let bad = false;
  if (!/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(email)) { fieldError("err-email", t("err_email_invalid")); bad = true; }
  if (password.length < 8) { fieldError("err-password", t("err_password_short")); bad = true; }

  if (!isLogin) {
    if (!firstName) { fieldError("err-first-name", t("err_required")); bad = true; }
    if (!lastName) { fieldError("err-last-name", t("err_required")); bad = true; }
    if (!birthDate) {
      fieldError("err-birth-date", t("err_required")); bad = true;
    } else if (new Date(birthDate) > new Date()) {
      fieldError("err-birth-date", t("err_birth_date_future")); bad = true;
    } else if (computeAge(birthDate) < MIN_AGE_YEARS) {
      fieldError("err-birth-date", t("err_age_min", { n: MIN_AGE_YEARS })); bad = true;
    }
    if (passwordConfirm !== password) { fieldError("err-password-confirm", t("err_password_mismatch")); bad = true; }
  }
  if (bad) return;

  submit.disabled = true;
  try {
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const body = isLogin
      ? { email, password }
      : { email, password, password_confirm: passwordConfirm, first_name: firstName, last_name: lastName, birth_date: birthDate };
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    if (!resp.ok) {
      errBox.textContent = data.detail || "Errore.";
      errBox.classList.remove("hidden");
      return;
    }
    localStorage.setItem("dashboard-token", data.token);
    currentUser = data.user;
    renderUser();
    if (plansData) renderPlans();
    document.getElementById("auth-form").reset();
    document.getElementById("strength-fill").style.width = "0%";
    document.getElementById("strength-label").textContent = "";
    toast(t(isLogin ? "toast_logged_in" : "toast_welcome", {
      n: currentUser.first_name || currentUser.name || currentUser.email.split("@")[0],
    }), "ok");
  } catch (err) {
    errBox.textContent = String(err);
    errBox.classList.remove("hidden");
  } finally {
    submit.disabled = false;
  }
});

document.getElementById("btn-logout").addEventListener("click", async () => {
  try { await fetch("/api/auth/logout", { method: "POST", headers: authHeaders() }); } catch (e) { /* locale comunque */ }
  localStorage.removeItem("dashboard-token");
  currentUser = null;
  renderUser();
  if (plansData) renderPlans();
  toast(t("toast_logged_out"));
});

async function loadUser() {
  if (!authToken()) { renderUser(); return; }
  try {
    const resp = await fetch("/api/auth/me", { headers: authHeaders() });
    if (!resp.ok) { localStorage.removeItem("dashboard-token"); currentUser = null; }
    else currentUser = (await resp.json()).user;
  } catch (e) { currentUser = null; }
  renderUser();
}

// ---------- Piani ----------
async function loadPlans() {
  try {
    const resp = await fetch("/api/billing/plans");
    plansData = await resp.json();
    renderPlans();
  } catch (e) {
    document.getElementById("plans-grid").innerHTML = `<div class="empty">${esc(String(e))}</div>`;
  }
}

function renderPlans() {
  if (!plansData) return;
  const grid = document.getElementById("plans-grid");
  const yearly = billingCycle === "yearly";

  grid.innerHTML = plansData.plans.map(p => {
    const amount = yearly ? Math.round(p.price_yearly / 12) : p.price_monthly;
    const isCurrent = currentUser && currentUser.plan === p.id;
    const billed = p.id === "free"
      ? t("plan_billed_free")
      : (yearly ? t("plan_billed_yearly", { a: p.price_yearly }) : "");

    const feats = p.features.map(f => `<li><span class="feat-ico">✓</span><span>${esc(f)}</span></li>`).join("")
      + (p.missing || []).map(f => `<li class="off"><span class="feat-ico">–</span><span>${esc(f)}</span></li>`).join("");

    let cta;
    if (isCurrent) cta = `<button class="plan-cta current" disabled>${t("plan_current")}</button>`;
    else if (p.id === "free") cta = `<button class="plan-cta secondary" data-plan="free">${t("plan_free_cta")}</button>`;
    else cta = `<button class="plan-cta ${p.popular ? "" : "secondary"}" data-plan="${p.id}">${t("plan_cta", { p: p.name })}</button>`;

    return `<div class="plan-card ${p.popular ? "popular" : ""}">
      ${p.popular ? `<span class="plan-ribbon">${t("plan_popular")}</span>` : ""}
      <div class="plan-name">${esc(p.name)}</div>
      <div class="plan-tagline">${esc(p.tagline)}</div>
      <div class="plan-price">
        <span class="plan-amount">${amount === 0 ? "0" : amount}€</span>
        <span class="plan-period">${t("plan_period_month")}</span>
      </div>
      <div class="plan-billed">${billed}</div>
      <span class="plan-accounts">${esc(p.accounts)}</span>
      <ul class="plan-features">${feats}</ul>
      ${cta}
    </div>`;
  }).join("");

  document.getElementById("pricing-note").textContent =
    plansData.checkout_ready ? t("pricing_note_ready") : t("pricing_note_setup");

  grid.querySelectorAll("[data-plan]").forEach(btn => {
    btn.addEventListener("click", () => startCheckout(btn.dataset.plan));
  });
}

async function startCheckout(planId) {
  if (planId === "free") { goTo("account"); return; }
  if (!currentUser) {
    goTo("account");
    toast(t("toast_login_required"));
    return;
  }
  try {
    const resp = await fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ plan_id: planId, billing_cycle: billingCycle }),
    });
    const data = await resp.json();
    if (!resp.ok) { toast(data.detail || "Errore", "err"); return; }
    if (data.ok && data.checkout_url) window.location.href = data.checkout_url;
    else toast(data.message || "Checkout non disponibile.", "err");
  } catch (e) {
    toast(String(e), "err");
  }
}

document.querySelectorAll(".cycle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    billingCycle = btn.dataset.cycle;
    document.querySelectorAll(".cycle-btn").forEach(b => b.classList.toggle("active", b === btn));
    renderPlans();
  });
});

// ---------- Command palette ----------
const PALETTE_ITEMS = [
  { section: "overview", key: "nav_overview", ico: "◎" },
  { section: "youtube", label: "YouTube", ico: "▶" },
  { section: "instagram", label: "Instagram", ico: "◈" },
  { section: "tiktok", label: "TikTok", ico: "♪" },
  { section: "x", label: "X", ico: "✕" },
  { section: "certsprint", label: "CertSprint", ico: "🛡" },
  { section: "analytics", key: "nav_analytics", ico: "◫" },
  { section: "diagnostics", key: "nav_diagnostics", ico: "⚕" },
  { section: "connections", key: "nav_connections", ico: "⚯" },
  { section: "account", key: "nav_account", ico: "☺" },
  { section: "pricing", key: "nav_pricing", ico: "✦" },
  { section: "themes", key: "nav_themes", ico: "◐" },
  { section: "language", key: "nav_language", ico: "⌘" },
];

const overlay = document.getElementById("palette-overlay");
const paletteInput = document.getElementById("palette-input");
const paletteResults = document.getElementById("palette-results");
let paletteSel = 0;

function paletteMatches() {
  const q = paletteInput.value.trim().toLowerCase();
  const active = activePlatforms();
  return PALETTE_ITEMS
    // Una piattaforma disattivata non deve restare raggiungibile dalla
    // palette: sarebbe l'unica scorciatoia rimasta verso una sezione che
    // in questa build non esiste.
    .filter(i => !(i.section in PLATFORM_LABELS) || active.includes(i.section))
    .map(i => ({ ...i, text: i.label || t(i.key) }))
    .filter(i => !q || i.text.toLowerCase().includes(q));
}

function renderPalette() {
  const items = paletteMatches();
  if (paletteSel >= items.length) paletteSel = 0;
  paletteResults.innerHTML = items.length
    ? items.map((i, idx) => `<div class="palette-item ${idx === paletteSel ? "sel" : ""}" data-section="${i.section}">
        <span class="nav-ico">${i.ico}</span>${esc(i.text)}</div>`).join("")
    : `<div class="palette-empty">${t("palette_empty")}</div>`;
  paletteResults.querySelectorAll(".palette-item").forEach(el => {
    el.addEventListener("click", () => { goTo(el.dataset.section); closePalette(); });
  });
}

function openPalette() {
  overlay.classList.remove("hidden");
  paletteInput.value = "";
  paletteSel = 0;
  renderPalette();
  paletteInput.focus();
}
function closePalette() { overlay.classList.add("hidden"); }

document.getElementById("palette-trigger").addEventListener("click", openPalette);
overlay.addEventListener("click", e => { if (e.target === overlay) closePalette(); });
paletteInput.addEventListener("input", () => { paletteSel = 0; renderPalette(); });

document.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openPalette(); return; }
  if (overlay.classList.contains("hidden")) return;
  const items = paletteMatches();
  if (e.key === "Escape") { closePalette(); }
  else if (e.key === "ArrowDown") { e.preventDefault(); paletteSel = (paletteSel + 1) % Math.max(items.length, 1); renderPalette(); }
  else if (e.key === "ArrowUp") { e.preventDefault(); paletteSel = (paletteSel - 1 + items.length) % Math.max(items.length, 1); renderPalette(); }
  else if (e.key === "Enter" && items[paletteSel]) { goTo(items[paletteSel].section); closePalette(); }
});

// ---------- Export ----------
document.getElementById("btn-export").addEventListener("click", () => {
  window.location.href = "/api/export.csv";
  toast(t("toast_export_done"), "ok");
});

// ---------- Orchestrazione ----------
function renderAll(snapshot) {
  currentSnapshot = snapshot;
  renderOverview(snapshot);
  activePlatforms().forEach(key => {
    DETAIL_RENDERERS[key]?.(snapshot[key]);
    wireInlineConnect(document.getElementById(`${key}-detail`));
  });
  renderDiagnostics(snapshot.diagnostics);
  renderAnalytics(snapshot.analytics);

  if (snapshot.insights) {
    Object.keys(snapshot.insights).forEach(platform => {
      const ins = snapshot.insights[platform];
      if (ins && ins.text) showInsightBox(platform, ins.text);
    });
  }

  const times = activePlatforms().map(k => snapshot[k]?.fetched_at).filter(Boolean);
  const latest = times.length ? Math.max(...times) : null;
  lastRefreshEl.textContent = latest ? t("footer_last_refresh", { d: fmtTime(latest) }) : t("footer_never");
}

async function loadSnapshot() {
  const resp = await fetch("/api/snapshot");
  renderAll(await resp.json());
}

function setProgress(pct) {
  progressBar.style.width = `${pct}%`;
  progressLabel.textContent = `${Math.round(pct)}%`;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function refreshAll() {
  btnRefresh.disabled = true;
  btnRefresh.classList.add("hidden");
  progressWrap.classList.remove("hidden");
  setProgress(0);

  try {
    await fetch("/api/refresh", { method: "POST" });
    let running = true, attempts = 0;
    while (running && attempts < 200) {
      await sleep(300);
      attempts++;
      try {
        const status = await (await fetch("/api/refresh/status")).json();
        setProgress((status.done_units / status.total_units) * 100);
        running = status.running;
      } catch (pollErr) { break; }
    }
    setProgress(100);
    await loadSnapshot();
    toast(t("toast_refresh_done"), "ok");
  } catch (e) {
    lastRefreshEl.textContent = t("footer_error");
    toast(t("footer_error"), "err");
    console.error(e);
  } finally {
    progressWrap.classList.add("hidden");
    btnRefresh.classList.remove("hidden");
    btnRefresh.disabled = false;
  }
}

btnRefresh.addEventListener("click", refreshAll);

// ---------- Avvio ----------
document.getElementById("auth-birth-date").max = new Date().toISOString().slice(0, 10);

applyTheme(localStorage.getItem("dashboard-theme") || "dark");
renderThemeGrid();
applyStaticTranslations();
renderLanguageGrid();
renderAuthTexts();

(async () => {
  // La config decide quali piattaforme esistono: va letta prima di
  // disegnare qualsiasi cosa, altrimenti CertSprint comparirebbe per un
  // istante anche nella build destinata ai clienti.
  try {
    appConfig = await (await fetch("/api/config")).json();
  } catch (e) {
    appConfig = null;
  }
  applyConfig();
  loadUser();
  loadConnections();
  loadSnapshot();
})();
