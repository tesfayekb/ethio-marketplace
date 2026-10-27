# Speed plan — D234 (2026-10-25)

Supervisor's working plan; the repository record lands at the next records turn. Numbers marked ESTIMATE are not measured.

## 1. Baseline — published site, Foundations turn 23 (docs/perf/baseline-2026-10-25-*.json)
Lab: scripts/perf/lab.ts — Lighthouse mobileSlow4G devtools constants (562.5 ms latency, 1,474.56 Kbps down, 675 Kbps up, CPU 4×), 360×740 phone, median of 3 cold runs.

| Page | TTFB | FCP | LCP (element) | TBT | Total | Requests |
|---|---|---|---|---|---|---|
| home | 1236 | 3260 | 3260 (footer text — the feed is not on the first paint) | 663 | 509.8 KB | 74 |
| category | 912 | 2900 | 2968 | 751 | 510.1 KB | 75 |
| ad | 938 | 3168 | **6008** (category picture, card-*.png) | 685 | **893.6 KB** | 96 |
| seller | 1080 | 3112 | 3112 | 612 | 550.3 KB | 78 |
| post | 827 | 2860 | 2860 | 542 | 555.0 KB | 67 |
| auth | 610 | 2668 | 2668 | 528 | 548.8 KB | 77 |
| terms | 1175 | 3276 | 3276 | 799 | 536.3 KB | 71 |

Bytes by type (cold): script 340–395 KB on every page; fonts 87 KB (Latin), 281 KB on the ad page (Noto Sans Ethiopic 400/500/600); the ad page 135 KB of images. Two render-blocking Google Fonts stylesheets sit in front of every first paint (src/routes/__root.tsx :286-:293).

## 2. Targets (from studies/speed/research.md; pre-committed)
- LCP ≤ 2.5 s on the lab for home, category, ad, seller, auth (stretch 1.8 s); CLS ≤ 0.1; TBT ≤ 200 ms; TTFB ≤ 0.8 s.
- First-paint JS ≤ 150 KB compressed for feed, ad and seller pages; ≤ 200 KB for the wizard; ≤ 100 KB for sign-in (stretch). Today: entry 302 KiB gzip-6.
- Web fonts 0 KB on Amharic pages (Android ships Noto Sans Ethiopic).
- JUDGE for every speed turn (frozen now): a turn is kept when, on two lab runs after Publish, the pages it targets improve on their named metric and no other page's median LCP rises by more than 10%; otherwise it is reverted or re-planned before the next speed turn.

## 3. Turns
- **S1 — Foundations turn 24 (drafted, sha recorded at send).** Per-page first-download ceilings for all 50 pages (scripts/route-budgets.mjs, ratchet), public must-stay-lazy list; loadOnce (glyph map, calendar, leaflet, phone parser) + on-demand import census; useNearViewport (buyer's map, similar ads); pure schema shapers off the ad page. Measured gzip-6: entry 302.2 → 289.9; home 315.5 → 303.3; ad 343.5 → 326.7; wizard 439.2 → 421.3. INC-895, INC-896, INC-897.
- **S2 — the ad page's LCP and the home page's first paint (no DEC).** Gallery photo links signed in the loader (the DEC-195 pattern) with fetchpriority/preload on the first photo; category pictures as WebP at card size (640×480 PNG today); the home/category feed's first page rendered on the server (#1 of the census); legal pages dehydrate only the reader's text (Tier A).
- **S3 — the language path (no DEC).** Render in the starred language on the server; skip the base-language DB catalogue; one language read per load; entity bundle over a cacheable GET.
- **S4 — the entry diet (no DEC).** Supabase client off the anonymous first paint; admin code off the entry; en-base split by surface; header menus loaded on first open; the React.lazy sites onto loadOnce (INC-897). Goal: entry ≤ 200 KiB, then ≤ 150.
- **S5 — fonts (operator decision A).** Package or asset change in its own turn (G42).

## 4. Decisions for the operator
- **A. Fonts** — (a) the phone's own fonts, 0 KB (recommended; FCP −1 to −1.5 s ESTIMATE; Amharic unchanged on Android, English and headings in the phone's font); (b) one self-hosted English font (Inter, 2 weights, ≈ 40 KB ESTIMATE) + the phone's Ethiopic, Bricolage dropped; (c) all three families self-hosted and non-blocking.
- **B. Edge caching of public pages for signed-out visitors** at the DNS cutover (Cloudflare proxy): TTFB −0.4 to −1 s ESTIMATE; needs a DEC because a newly published language or category shows within the cache window (≈ 60 s) instead of on the next load (INC-113 law).
- **C. Stable card-photo URLs** (D151 private bucket): repeat feed views re-download every card photo today (≈ 0.4–0.8 MB per repeat view ESTIMATE); a DEC on the privacy trade.

## 5. What the first download holds (S4 input; measured 2026-10-25 on the S2 prototype build, source maps)
The home page's first download is 303.3 KiB gzip-6 in 58 chunks; five chunks are 78% of it:
| Chunk (gz) | What it is (raw KiB by source) | Lever |
|---|---|---|
| index 127.0 | react-dom 171; @tanstack/router-core 49 + react-router 10; the shell 44 (app-rail 15, app-shell 11, breadcrumbs 7, header 6, location selector 4); **admin code 14** (admin-users-service, roles-service, impersonation service/banner, sections); @radix-ui/react-menu 14 + dialog 6; lucide 8 | admin code and the menus off the entry (S4) |
| client 52.7 | **@supabase/supabase-js 205 raw**: auth-js 92, realtime-js + phoenix 54, storage-js 21, postgrest-js 15 | the Supabase client off the anonymous first paint, or the realtime and storage clients off it (S4; the largest single lever) |
| provider 27.4 | **the base catalogue 71 raw** (src/i18n/locales), the i18n provider 7, auth 8 | split the base catalogue by surface (S3/S4) |
| tooltip 12.6 | Radix tooltip + floating-ui 34 raw | tooltips on first hover, or the native title on public pages (S4) |
| createServerFn 11.8 | seroval 24 raw (server-function serialisation) | stays (loaders need it) |
ESTIMATE of S4's ceiling: −60 to −90 KiB gz from the entry (to about 200–230 KiB), most of it the Supabase client.
