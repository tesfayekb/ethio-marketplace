# ethio.com — Performance Strategy

Status: DRAFT for operator review. This is the systematic answer to the recurring
"the site feels slow" concern. It records what already protects performance, what the
real risks are (in priority order), and what must be verified before launch — so
"performant" becomes a checklist we hold ourselves to, not a hope.

The audience reality shapes everything below: **ethio.com serves Ethiopians in-country
and across the diaspora, many on constrained 3G/mobile-data on mid-range Android phones.**
A page that feels instant on office fiber can be unusable on an Addis mobile connection.
Every decision here is weighed against *that* user, not a developer on a fast laptop.

---

## 1. What ALREADY protects performance (the foundation is genuinely good)

These are in place today and are the reason the app is fast at all:

- **SSR (TanStack Start).** Pages render on the server and arrive as HTML, so the user
  sees content without waiting for a large JS bundle to download and execute first. This
  is the single biggest lever for slow networks, and we have it by default.
- **Flat surfaces, no background images, no gradients** (a deliberate design decision).
  Zero decorative bytes on every page.
- **Font subsetting + `display: swap`.** Noto Sans Ethiopic ships only Ge'ez glyphs, Inter
  only Latin; text never blocks render waiting for fonts.
- **A CI bundle-size budget** (currently ~156 KiB JS / ~13 KiB CSS gzipped, well under the
  320/40 ceiling) — the build FAILS if the first-paint bundle bloats. Performance can't
  silently regress.
- **A marketplace-weight guard** — CI fails if a heavy dependency (chart lib, map lib, 3D)
  is imported onto the first-paint marketplace path. Those belong to admin/detail routes,
  loaded only when needed.
- **Indexed feed queries.** The listings feed uses a partial composite index
  (`tier, published_at` where active) so ranking stays fast as listings grow.
- **Category-tree caching** (added when the operator noticed the rail lag): the category
  tree is cached with in-flight de-duplication, so repeat navigations do zero queries and a
  skeleton shows on first load.

**Honest assessment:** the *foundation* is well above average for a project this young.
The framework, the design discipline, and the CI guards are doing real work. What follows
is where performance is actually won or lost from here.

---

## 2. The real risks, in PRIORITY ORDER

### RISK 1 (highest) — Images. This is the marketplace's make-or-break performance issue.

Listings have photos. This is, by a wide margin, the biggest threat to load speed, and it
is **not yet solved** — it becomes real the moment listings with photos exist (P2-c-photos
and beyond).

The math is brutal on mobile: a single un-optimized phone photo is 3–5 MB. A feed of 20
listing cards each pulling a full-res image is **60–100 MB** — that would make the feed
effectively unusable on an Ethiopian mobile connection, and expensive (users pay per MB —
"kilobytes are the user's money," a founding principle here).

The plan already names the pieces; they must actually be built and verified:
- **On-device compression before upload** (REQ-019) — resize/compress in the browser
  before the photo ever leaves the phone, so we store and serve small images. This also
  cuts upload time and cost for the *seller*.
- **Server-side EXIF/GPS strip** (DEC-009, a hard gate) — removes embedded location data
  (a privacy requirement) and metadata bloat.
- **Serve card-sized images, not full-res.** The feed card needs a ~300px thumbnail, not
  the 2000px original. Generate and serve appropriately-sized variants.
- **Lazy-load images** (`loading="lazy"`) — already the pattern in listing-card; only load
  images as they scroll into view.
- **Modern formats (WebP/AVIF)** where supported — dramatically smaller than JPEG at equal
  quality.
- **A CDN / image transformation layer** (Supabase Storage supports image transforms, or a
  dedicated image CDN) so resizing/format-conversion happens at the edge, cached.

**This deserves its own dedicated performance pass when photos go live** — it is the
highest-leverage performance work in the entire project.

### RISK 2 — The feed must paginate, never load-everything.

With 10 listings the feed is fine; with 10,000 it is not. The feed needs **cursor-based
pagination / infinite scroll** so it only ever fetches and renders a screen's worth of
listings at a time. This lands with the real feed data (view-tracking + location-scoping +
real ranking). Without it, the feed's cost grows linearly with the catalog and eventually
crushes both the query and the client render.

### RISK 3 — Data-fetch waterfalls (the class of bug we just hit).

The category-rail lag the operator noticed was a data-fetch issue, not an icon issue — the
rail queried Supabase on every navigation. We fixed it with caching. That was one instance
of a general risk: **each new panel body and page will do its own data fetches, and each
can introduce its own waterfall or redundant query.** The discipline (now a standing rule):
- Cache reference data that rarely changes (categories, locations) — session/SWR cache.
- Show skeletons on first load so the UI never appears empty/janky.
- Soft-fail data fetches (the feed already does this) so one slow/failed query never
  cascades to the shell.
- Avoid sequential dependent fetches where a single query or a parallel fetch would do.

Every panel-body feature (My Listings, Account, Admin) should be reviewed for this when
built.

### RISK 4 — Third-party / feature weight creep.

As features arrive (maps for location, charts for admin analytics, rich text, etc.), each
heavy dependency is a threat to the first-paint path. The marketplace-weight guard protects
the *marketplace* route; the discipline is to **code-split heavy features** so they load
only on the routes that need them, never on the browse path. Admin analytics charts must
never ship to a buyer browsing listings.

---

## 3. What we're honestly NOT doing yet (named, not faked)

Two things are deferred to the launch gate rather than pretended-done:

- **Lighthouse / Core Web Vitals gating in CI.** Real per-page performance scoring (LCP,
  CLS, TBT) gated on every push. This needs infrastructure we don't have and often flakes
  in CI; it's a launch-gate item, not a today-guard. The bundle-budget guard is the cheap,
  durable proxy we have now.
- **Visual-regression snapshot testing.** Catches unintended layout/perf shifts visually.
  Valuable but a whole system of its own; deferred to launch gate.

Being explicit: these are real gaps, honestly deferred. The bundle-budget + marketplace-
weight guards are what enforce performance *today*; the above two are what we add before
going live for full coverage.

---

## 4. The verification checklist (what "performant" must mean before launch)

These become launch-gate items so performance is *measured*, not assumed:

1. **Image pipeline proven** — on-device compression + EXIF strip + card-sized serving +
   lazy-load + modern formats, verified on a real mid-range Android over a throttled 3G
   connection. A 20-card feed loads in acceptable time and weight. (RISK 1 — highest.)
2. **Feed pagination proven** — the feed loads a page at a time; catalog size doesn't blow
   up the query or client. (RISK 2.)
3. **First-paint budget held** — the CI bundle-budget guard stays green (already enforced).
4. **No heavy deps on the browse path** — the marketplace-weight guard stays green; heavy
   features are code-split. (RISK 4.)
5. **Reference data cached** — categories/locations don't refetch per navigation. (RISK 3;
   categories already done, locations when that feature lands.)
6. **Real-device / real-network test** — the app is tested on an actual constrained mobile
   connection, not just a fast laptop. This is the single most honest performance check and
   the one most projects skip.
7. **Lighthouse/CWV gating + visual-regression** added (the two deferred items above).

---

## 5. The honest bottom line

I can't promise "the best performant application" as an absolute — no one honestly can,
because it depends on executing the image pipeline well, on pagination, and on real-device
testing not yet done. What I *can* state plainly:

- The **architecture is right** (SSR, flat design, subsetting, indexed queries, CI budget
  guards). This is the hard part and it's in place.
- The **biggest risk is images**, it's still ahead, and it's flagged as the top priority
  the moment listings have photos.
- Performance is **enforced by guards** (bundle budget, marketplace weight) rather than
  hoped, and the remaining verification is a concrete launch-gate checklist above.

The "slow load" felt so far has been shell/data-fetch issues (now addressed with caching);
the *product's* performance story is mostly still ahead and is dominated by how well the
image pipeline is built. That's where the attention should go — and this document exists so
it does.


## 6. The phone lab and the baseline (D234, Foundations turn 23)

`scripts/perf/lab.ts` measures how fast a page is for a person on a low-end
Android phone on a slow mobile network, the same way every time, from the
published site. The throttling is Lighthouse's own mobile preset
(`lighthouse-core/config/constants.js`, `throttling.mobileSlow4G`, devtools
method): 150 ms RTT and 1.6 Mbps down / 750 Kbps up, applied as 562.5 ms
request latency, 1,474.56 Kbps down and 675 Kbps up, with a 4× CPU slowdown;
the screen is the project's 360 px phone (360×740, DPR 1.75). Per page it runs
cold-cache passes (a fresh browser context each) plus one warm run (a repeat
visit in the same context), and records TTFB (from the CDP clock — Navigation
Timing's responseStart is taken before DevTools throttling and under-reports
it), FCP, LCP and its element, CLS, TBT, DOMContentLoaded, load, HTML bytes,
bytes by type as the network carried them, and the request count.

Run it (each command stands alone):

```
bun scripts/perf/lab.ts --base https://my-market-dawn.lovable.app --runs 3 --pages home,category --out docs/perf/baseline-2026-10-25-1.json
bun scripts/perf/lab.ts --base https://my-market-dawn.lovable.app --runs 3 --pages ad,seller --out docs/perf/baseline-2026-10-25-2.json
bun scripts/perf/lab.ts --base https://my-market-dawn.lovable.app --runs 3 --pages post,auth --out docs/perf/baseline-2026-10-25-3.json
bun scripts/perf/lab.ts --base https://my-market-dawn.lovable.app --runs 3 --pages terms --out docs/perf/baseline-2026-10-25-4.json
```

Baseline of the published site (https://my-market-dawn.lovable.app),
2026-10-25 — median of three cold runs; raw data in
`docs/perf/baseline-2026-10-25-*.json`:

| Page | TTFB ms | FCP ms | LCP ms | LCP element | CLS | TBT ms | load ms | HTML KB | total KB | requests | warm LCP ms | warm KB |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| home `/` | 1236 | 3260 | 3260 | p[footer-copyright] | 0 | 663 | 5400 | 7.6 | 509.8 | 74 | 6524 | 955 |
| category `/c/vehicles` | 912 | 2900 | 2968 | p[footer-copyright] | 0.011 | 751 | 5077 | 7.6 | 510.1 | 75 | 6824 | 460 |
| ad `/l/driver-hire-service-c5j3d66hyk` | 938 | 3168 | 6008 | img (category card png) | 0.026 | 685 | 6365 | 13.7 | 893.6 | 96 | 1188 | 237 |
| seller `/badminton_shop` | 1080 | 3112 | 3112 | p[footer-copyright] | 0.006 | 612 | 5280 | 7.3 | 550.3 | 78 | 5100 | 362 |
| post `/post` | 827 | 2860 | 2860 | p[footer-copyright] | 0 | 542 | 5257 | 8.8 | 555 | 67 | 988 | 70 |
| auth `/auth` | 610 | 2668 | 2668 | (none) | 0 | 528 | 4708 | 8 | 548.8 | 77 | 1212 | 48 |
| terms `/terms` | 1175 | 3276 | 3276 | li | 0 | 799 | 5296 | 44.6 | 536.3 | 71 | 1112 | 85 |

Budgets: set from this baseline and the speed study (a later turn).

## 7. Every page's first download (D234, Foundations turn 24)

The bundle-budget job (`scripts/check-bundle-size.mjs` with `scripts/bundle-closure.mjs`) now judges every page, not only the entry. For each page route of the build's route manifest (`dist/server/_tanstack-start-manifest_v-*.mjs`; server routes under `/api/` excluded) it reads the modulepreload lists along the route's parent chain, root included, then follows their static import closure and sums the gzipped (level 6) sizes. It fails when a page has no line, when a line names a page the build lacks, when a page is over its ceiling, when a page is 8 KiB or more under it (the ratchet: lower the line), and when a public page holds a `PUBLIC_MUST_STAY_LAZY` prefix (`posting-service`, `zod`, `category-glyphs`, `date-calendar`, `leaflet`).

The ceilings live in `scripts/route-budgets.mjs`, one line per page: the page's measured download plus 3 KiB, rounded up. Every saving is kept; raising a line is a commit that says why.

The four moves of this turn (the supervisor's build of the change, gzip 6): the category glyph map left the first paint — the entry 302.2 → 289.9 KiB, every page −12.3; `/` and `/c/$slug` 315.5 → 303.3; the posting doors left the ad page and its map and similar ads wait for their place — `/l/$slug` 343.5 → 327.4 (Leaflet 41.9 KiB, its CSS, the tile plan and tiles, the similar-ads read and its photos only when scrolled to); the calendar loads on first open — `/post` 439.2 → 422.1.

`loadOnce` (`src/lib/load-once.ts`) fetches an on-demand module once per visit and forgets a failed download so the next ask tries again. `useNearViewport` (`src/lib/use-near-viewport.ts`) latches true once a box comes within 400 px of the screen, so below-the-fold work starts only then.

Next: the ad page's LCP (photo links in the loader, fetchpriority, category pictures as WebP), the font decision, edge caching (a DEC), INC-897.

## 8. The first picture (D234, Foundations turn 25)

A public page's largest first picture is named in its server HTML and asked for first. The feed's first cards already were (DEC-195: their links arrive with the answer, priority on the first six); now the ad page is too: its photos are signed from its own public document (`signPublicPhotos`, `src/server/media/links.ts` — no second read) and handed to `usePhotoLinks` as the preset, and the gallery's main photo and the photo-less ad's category picture load eagerly at high priority.

Why it matters on the lab's phone: the baseline's ad-page LCP was 6.0 s, its LCP element the photo-less ad's category picture loaded lazily (a 128 KiB PNG); an ad with photos waited for hydration plus one more request (562 ms of latency each on slow 4G) before its main photo's download could start. That request is gone.

Category pictures made from now on are WebP (card, thumb; the OG picture stays PNG) under versioned names (`card-<genTs>.<ext>`) stored with a one-year cache. The pictures already stored stay PNG with a one-hour cache until regenerated — INC-900.
