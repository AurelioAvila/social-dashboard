"""
Analisi statistica calcolata dal codice sui dati gia' raccolti (zero
chiamate esterne, zero costo) - top post per views e fascia oraria di
pubblicazione con la performance media migliore, per piattaforma e
complessiva. Serve a rispondere a "quali post funzionano e quando li
pubblico" senza dover chiedere un'analisi AI ogni volta.
"""


def _youtube_items(data: dict) -> list[dict]:
    if not data:
        return []
    out = []
    for c in data.get("channels", []):
        if not c.get("ok"):
            continue
        for v in c.get("recent_videos", []):
            out.append({
                "platform": "youtube", "account": c["name"], "title": v.get("title", ""),
                "views": v.get("views", 0), "hour": v.get("publish_hour_utc"),
            })
    return out


def _instagram_items(data: dict) -> list[dict]:
    if not data:
        return []
    out = []
    for a in data.get("accounts", []):
        if not a.get("ok"):
            continue
        for p in a.get("recent_posts", []):
            hour = None
            ts = p.get("timestamp")
            if ts:
                try:
                    hour = int(ts[11:13])
                except Exception:
                    hour = None
            out.append({
                "platform": "instagram", "account": a["name"], "title": p.get("caption", "(senza didascalia)"),
                "views": p.get("views", 0), "hour": hour,
            })
    return out


def _tiktok_items(data: dict) -> list[dict]:
    if not data:
        return []
    out = []
    for a in data.get("accounts", []):
        if not a.get("ok"):
            continue
        for v in a.get("recent_videos", []):
            out.append({
                "platform": "tiktok", "account": a["name"], "title": v.get("title", ""),
                "views": v.get("views", 0), "hour": v.get("publish_hour_utc"),
            })
    return out


def compute_analytics(snapshot: dict) -> dict:
    all_items = (
        _youtube_items(snapshot.get("youtube"))
        + _instagram_items(snapshot.get("instagram"))
        + _tiktok_items(snapshot.get("tiktok"))
    )

    top_posts = sorted(all_items, key=lambda i: i["views"], reverse=True)[:10]

    hour_buckets = {}  # hour -> {"views": totale, "count": n}
    for item in all_items:
        if item["hour"] is None:
            continue
        b = hour_buckets.setdefault(item["hour"], {"views": 0, "count": 0})
        b["views"] += item["views"]
        b["count"] += 1

    hourly = [
        {"hour": h, "avg_views": round(b["views"] / b["count"]), "count": b["count"]}
        for h, b in hour_buckets.items()
    ]
    hourly.sort(key=lambda h: h["avg_views"], reverse=True)

    # Tutte le 24 ore, anche quelle senza pubblicazioni: servono al grafico
    # della giornata, dove un buco e' un'informazione (li' non hai mai
    # pubblicato) tanto quanto una barra alta.
    by_hour = {h["hour"]: h for h in hourly}
    all_hours = [
        by_hour.get(h, {"hour": h, "avg_views": 0, "count": 0})
        for h in range(24)
    ]

    per_platform = {}
    for item in all_items:
        p = per_platform.setdefault(item["platform"], {"views": 0, "count": 0})
        p["views"] += item["views"]
        p["count"] += 1

    return {
        "top_posts": top_posts,
        "best_hours": hourly[:5],
        "all_hours": all_hours,
        "per_platform": per_platform,
        "total_views": sum(i["views"] for i in all_items),
        "total_items_analyzed": len(all_items),
    }
