# Study — edge caching of signed-out public pages at the DNS cutover (DEC-263; spec owed)

Status: study v1, 2026-10-26, the supervisor. DEC-263 is approved (Tesfaye, 2026-10-25, "all as recommended"): Cloudflare keeps a copy of public pages close to the visitor and serves it while refreshing it in the background; every staff publish of a category, language, price or legal text drops the copy at once; only pages that carry no account data are cached, and each language keeps its own copy. This note records the constraints found in the code and the platform; the spec follows before the cutover.

## Constraints found

- **Hosting:** Lovable's custom-domain page: a standard setup is DNS only (grey cloud); proxying is supported through the connect option "Uses Cloudflare or similar proxy" (a CNAME, Lovable issues the certificate; "You are responsible for configuring and maintaining your CDN or proxy"). So the ethio.com zone (Tesfaye's Cloudflare account, free plan) can sit in front of the app, with its own cache.
- **What a page's HTML depends on** (src/routes/__root.tsx at the turn-32 prototype): two cookies — the starred language (`LANGUAGE_STAR_COOKIE`, :141) and the saved area (`AREA_COOKIE`, :116, :148) — and the edge's location guess (`geoGuess(getRequest())`, :151-:157: `cf-ipcountry`, `cf-ipcity`, `cf-region-code`); the listings pages' first page comes from the area (`getFirstFeedPage`, :113-:118). The session is in the browser's storage, never a cookie, so the HTML carries no account data — but it does vary by language, area and country.
- **The free plan's cache keys** take the URL (and query string rules) only; keys by cookie or by request header are an Enterprise feature. A rule that caches the URL alone would serve one visitor's language, area or country to another.
- Today the gate list and the language catalogue are never cached across loads (INC-113, `cache: "no-store"`); a cache in front changes that law, hence the purge.

## The shape of the build (recommended)

1. **A small Worker on the ethio.com zone** (Workers' free tier) in front of the app for the public page paths (`/`, `/c/*`, `/l/*`, `/<seller>`, `/terms`, `/privacy`, `/legal/*`): it builds its own cache key — the URL, the language cookie, the area cookie, `cf-ipcountry` (and the city only if the HTML uses it), and a **publish version** — and uses the Cache API: a hit younger than about 60 s is served; an older hit is served and refreshed in the background (`waitUntil`); a miss goes to the app. It never caches a response with `Set-Cookie`, a non-200, or a request with an `Authorization` header or a `?lang=` override; every other path (routes under `/api/`, `/auth`, signed-in screens, the admin) passes through untouched.
2. **Purge by version, not by URL:** every staff publish that changes what a public page shows (categories, languages, prices and units, legal versions, a listing's state) bumps one number (`public.publish_version`, written by those doors in the same transaction); the Worker reads it through one cheap, cacheable endpoint (a few seconds' TTL) and puts it in the key, so a publish makes every old copy unreachable at once in every data centre — no purge API call, no token in the app.
3. **The app's side:** public pages answer `Cache-Control: private, no-store` to browsers as today (the Worker caches, the browser does not), and an `x-ethio-cacheable: 1` header only on a page that holds no request-specific data beyond the key's parts — the Worker caches only those.
4. **Proofs the spec will require:** two languages, two areas and two countries never share a copy; a publish is visible on the next load; a signed-in visitor's page is identical to today's (the session is client-side); a response with a cookie is never cached; the Worker's failure falls through to the app (no blank page); TTFB measured on the lab before and after.

## To verify at spec time

Workers' free-tier request limit against the traffic forecast; whether the city is in the HTML; Lovable's proxy mode with a Worker route on the same hostname; the version endpoint's own cost.

## Order

At the DNS cutover, after DEC-261's turns. DEC-264's public photo origin (`img.ethio.com`) is made in the same zone at the same time.
