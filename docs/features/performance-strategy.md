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
- **No web font (DEC-262).** Every page draws with the device's own fonts; nothing waits on a
  font server (§16).
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

## 9. A component fetched on demand never breaks the page (D234, Foundations turn 26)

- `resilientLazy(fetch, label, fallback)` (src/lib/resilient-lazy.ts) is React.lazy whose failed download resolves to the piece's own fallback, logged once as `[client-error] <label> failed to load`. The server render and hydration are React.lazy's own, unchanged; the tab's one stale-chunk reload (src/lib/stale-chunk.ts, INC-640) runs first.
- The four sites and their fallbacks: the shell's breadcrumbs (admin listing, language, user, role and seller crumbs show the pending "—"; the ad's crumbs show the ad's title); the ad page's still and large maps (the map's word, "Map pin"; the still map's module is one `loadOnce` shared with the pin snap); the wizard's pin preview (nothing) and pin map ("Try again", the Button primitive, which reloads the page; the draft is saved).
- The catalogue layers' loaders (src/i18n/compiled-catalog.ts) are on `loadOnce`; a failed layer is asked again by the next load.
- The admin user and role crumbs moved into the admin detail crumbs module, so their reads leave every page's first download (entry 289.9 → 287.3 KiB); the ceilings in scripts/route-budgets.mjs and the entry's in scripts/check-bundle-size.mjs come down with it.
- INC-897 is closed: OD-3 (scripts/conformance/on-demand-imports.test.ts) refuses any allowance waiting on it and any bare React.lazy site in the browser's code.


## 10. The reads every page makes start with the page (D234, Foundations turn 27)

`firstReadLinks` (src/lib/first-reads.ts) names four public reads in the server's
head: the category tree (`CATEGORY_TREE_PATH`), the open markets (`MARKETS_PATH`),
the saved market's tree (`treePath(country)`) and the language's approved strings
(`bundleUrl(lang)`). Each address comes from its reader's own path builder.
The links use `as="fetch"` and `crossorigin="anonymous"`, matching the readers'
own mode and same-origin credentials, so the reader takes the preloaded answer.
The supervisor's Playwright check on a local build found one request with the
anonymous attribute and two without it, including with `cache: "no-cache"` and
a reader five seconds later.

The server names only request-known facts: the saved market, never a guessed
market whose open status needs a read; the address's `?lang`, otherwise the device
star, otherwise the base language, with the first two subject to the publication
gate list and language-code shape. A client navigation names none.

Three reads remain outside the head: the guessed market's tree (the server does
not yet know whether that market is open); the publication gate list (its apikey
header cannot be carried by a preload, and INC-113 requires no-store); and the
entity bundle (an RPC POST). Their existing reader and failure states stay unchanged.

FRL-1…4 pin the choice and mode; FRL-5 runs the actual readers against recording
transports and refuses a preload that drifts from its reader's address. FRL-6
proves in the browser that the head names the reads and the markets are asked once.
Next: S5, the feed's first page answered in the page stream.

## 11. The feed's first page arrives with the page (D234, Foundations turn 28)

- `readFirstFeedPage(request, areaCookie)` (src/server/first-screen.ts) runs on "/" and "/c/<slug>" only. It reads the request's facts (the saved-area cookie after `AREA_SHAPE`, `parseAreaCookie` and `parseEverywhere`; the edge's guess; the address), asks the open markets, the market's tree and, on a category page, the category tree through the routes' own GET handlers (`openMarketsGet`, `countryTreeGet`, `categoryTreeGet`) in-process with no session, derives the first place with the shell's own `initialCountries` and `deriveInitialArea`, and asks `feedGet` for that place's first page at `feedPath`. Any refusal, failure, unknown category or the 2-second deadline answers null with one `[first-screen]` line; the browser then reads as before.
- The root loader's server branch starts it unawaited through `getFirstFeedPage` (`createServerFn({ method: "GET" }).validator(NoInputSchema)`), so the page's shell is sent at once and the first page streams in behind it; a bot gets the whole page. A client navigation carries none.
- `useFeed` (`firstPage`) takes it on its first read only when its address is that read's own, once per page load (a WeakSet); a second mount, a Retry or a new place reads afresh.
- `feed.tsx` preloads the first cards' covers with react-dom's `preload(…, { as: "image", fetchPriority: "high" })` under Suspense/Await.
- The E2E build skips the server's page for the cookie `e2e_first_screen=off` (`isE2E`); the spinner test, FS-6 and AP-49 carry it, because they prove the browser's own read.
- Proofs: DIA-6 (location-data.test.ts) is the equivalence proof of the shared derivation; AP-53 (e2e/ad-page.spec.ts) the browser proof.
- Next: the cards drawn by the server from this same page (S6).


## 12. The server draws the first cards and the browser keeps them (D234, Foundations turn 29)

- `HeldFirstPage` (src/features/feed/held-first-page.ts) wraps the root loader's unawaited first-page read. Its `heldFirstPageAdapter`, registered in src/start.ts, sends the promise through the router's page stream and wraps it again on arrival, recording `settled` as soon as the page lands.
- Why the adapter: in the supervisor's lab, a promise React had not seen settle made hydration wait and draw the feed again from scratch. Reading the arrived page at once lets the browser's first render draw the server's very cards, so React keeps those nodes.
- `useHeldFirstPage` (src/features/feed/use-feed.ts) draws that page only for the page load's first feed, until its own first read lands (`firstReadDone`), and only for the very address once the inputs are known. Later mounts, navigation, another place and Retry keep the live reader's existing behaviour.
- The listings routes (`index.tsx`, `c.$slug.tsx`) render the feed under Suspense with the existing translated spinner. The shell streams at once; the cards follow in the same response. FirstFeedPage carries `places`, the server's derived place path, so the feed heading matches the place the shell will show.
- INC-901: a malformed whole feed or category-tree answer is no first page and one named `[first-screen]` warning; FSP-7 proves both cases. HFP-1…3, UFS-5…7 and FP-16 pin the wrapper, first drawing and optional page size.
- AP-54 is the browser proof: two scratch cards occur in the server HTML and the first card node held at DOMContentLoaded is the same node once the page is ready, with no hydration error. AP-53 still proves no second feed or cover-link read. Similar ads now use `feedPath`; the rail's peek uses `feedRouteOf`.
- Next: the shell's own first state from the server. A category page's invitation still waits for its category tree in the browser.

## 13. Strings a page does not show stay off its first download (D234, Foundations turn 30)

DEC-258 generalises the admin layer into named admin and member strings layers. Member screens declare member; the admin layout declares both; public listings pages declare neither. Each route's `staticData.strings` declaration, including its layouts', names what it needs.

`StringsLayerGate` waits for those layers before drawing the screen. The root's `beforeLoad` starts their download through `warmStringsLayers` on navigation or link preload, beside the route code and data. The census in `scripts/conformance/strings-layers.ts` assigns every key to its readers' shared layer, or base when any reader has no such declaration. CF-SL-1 enforces that assignment and refuses a planted misplaced key.

Supervisor's build measurements, not a local rebuild: 591 keys moved to member and 30 to admin; entry 287.9 → 280.2 KiB; every page 7–11 KiB lighter; Amharic base about 11 KiB lighter. The ceilings follow those measurements, with three admin whole-catalogue consumers separately recorded under INC-902.

Next: study moving the database client off the first paint, a Tier A study for the operator's decision; no database-client change is made here.

## 14. The overlays' code waits for the person (D234, Foundations turn 31)

DEC-259: the tooltip and the dropdown menu carried Radix, floating-ui and their focus and scroll layers on every page's first download — about 20 KiB, for controls nobody has touched yet. Their facades (`src/components/ui/tooltip.tsx`, `dropdown-menu.tsx`) keep the same exports; the Radix code (`tooltip-impl.tsx`, `dropdown-menu-impl.tsx`, moved unchanged, re-exported by `overlays-impl.ts`) arrives through `overlay-loader.ts` (loadOnce).

- The trigger is the consumer's own element from the server's first HTML, with the closed state's attributes (`data-state="closed"`; a menu's `aria-haspopup="menu"`, `aria-expanded="false"`, `type="button"`).
- A tooltip's first hover (a mouse or pen) or keyboard focus, and a menu's first press or opening key (Enter, Space, ArrowDown), ask for the module; a menu trigger's hover or focus only warms it. Once the page's load event has passed and the browser is idle, the module is asked for anyway, so the first press rarely waits.
- The real Radix root is drawn beside the trigger, never around it: its trigger renders a collector that hands its props (handlers, aria, data-state, the ref the popper anchors to) to the facade trigger, which puts them on the same element. Nothing is remounted — focus, hover and a press in progress survive — and the first intent is replayed once on that element, so a keyboard opening still focuses the first item.
- A failed download leaves the closed trigger and logs `[overlays] loading the overlay primitives failed`; the next intent asks again.
- The supervisor's build: the entry 280.2 → 260.0 KiB; every page 10–20 KiB lighter (the home page 293.7 → 273.4). The lab (slow 4G constants off; local server): the module asked about 190 ms after the load event; a first press, a first Enter and a first hover each answered on the same element.

Next: the shell's Radix dialog (the phone rail's sheet in app-rail.tsx, the toolbar panel in toolbar-panel.tsx, each importing @radix-ui/react-dialog directly) still rides the entry; the same three parts take it — one more impl file and facade.

## 15. The dialogs' code waits for the person (D234, Foundations turn 32)

DEC-260: the dialog and the alert dialog (Radix's dialog with its focus trap, scroll lock and hide-the-rest layers) rode every page's first download, because the phone rail's menu (app-rail.tsx) and the toolbar panel (toolbar-panel.tsx) imported it directly — about 6 KiB, for windows nobody has opened yet. Their facades (`src/components/ui/dialog-primitive.tsx`, under `dialog.tsx` and `sheet.tsx`; `alert-dialog-primitive.tsx`, under `alert-dialog.tsx`) keep Radix's part names; the Radix code (`dialog-impl.ts`, `alert-dialog-impl.ts`, re-exported by `overlays-impl.ts`) arrives through the same loader as the tooltip's and the menu's.

- A closed modal draws only its trigger, with the closed state's attributes (`type="button"`, `aria-haspopup="dialog"`, `aria-expanded="false"`, `data-state="closed"`), on the server and at first.
- The first opening — the trigger's click, or the owner's `open` — asks for the module (most of the time it is already there: it is asked for once the page has loaded and is idle) and draws the real Radix root around the children, open. The owner hears `onOpenChange(true)` from the trigger as from Radix's; an uncontrolled modal opens itself. The children are drawn afresh at that moment — the focus moves into the modal anyway — and afterwards everything is Radix's: the focus trap, Escape, the focus back to the trigger.
- A failed download leaves the closed modal and logs the loader's warning; an owner that heard the trigger's opening, or opened the modal itself, hears `onOpenChange(false)`, so its next opening asks for the module again (INC-908, turn 32b: OVF-17, OVF-18).
- The supervisor's build: the entry 260.0 → 254.1 KiB; every public page 5.9–6.0 KiB lighter (the home page 273.4 → 267.5); the posting and editing pages 6.7–6.8 KiB lighter. Twelve staff and dev pages that draw another Radix overlay (a popover, a select) now carry the focus, dismiss and positioning layers it shares with the dialog in a chunk of their own: 0.3–0.4 KiB more, under their ceilings. The overlay module is 10.9 KiB gzip, asked for after the load event. The lab (360 wide, touch): the phone menu opens on the first tap; tapped after the idle download it opens in 127 ms, and tapped at DOMContentLoaded, before the module has arrived, in 306 ms (250 ms on the turn-31 build).

Next: the popover and the select — and the hover card, the context menu, the menubar and the navigation menu that turn 31's K2 list names — still import Radix directly; the same parts take them.

## 16. The device's own fonts (D234, Foundations turn 33)

DEC-262 (the operator, 2026-10-26: "all as recommended"): turn 23's lab found two Google Fonts stylesheets in front of every first paint (src/routes/__root.tsx) — render-blocking whatever their `display=swap` said — and 87 KB of Latin fonts on every page, 281 KB with the three Ethiopic weights on an Amharic ad page. Both stylesheets, their two preconnects and the three web-font families are gone: `--font-sans` in src/styles.css is the device's stack, and `--font-display` is the same stack (headings and the wordmark keep their weights).

- Latin and the interface take the platform's UI face (San Francisco on Apple devices, Segoe UI on Windows, Roboto on Android); Ge'ez falls through per glyph to the platform's Ethiopic face (Noto Sans Ethiopic on Android and Linux, Kefa on Apple devices, Nyala or Ebrima on Windows). `system-ui` is left out on purpose: on Windows it follows the system's locale font.
- The visible change is the typeface of English text and headings; no layout, size, weight, colour or behaviour changes. Tests that measure text measure the visible characters with the element's own font (D104), so a face change moves no rule.
- The gain is judged on the lab after Publish (the D234 judge): the first paint no longer waits on two stylesheets from another origin — ESTIMATE 1–1.5 s sooner on the lab's phone over slow 4G — and every page is 87 KB lighter, an Amharic ad page up to 281 KB.
- The guard: `scripts/conformance/fonts.test.ts` (CF-FT-1 — nothing under src/ or public/ names a web-font host, declares `@font-face`, ships a font file or sets a family by name; CF-FT-2 — the two tokens; CF-FT-3 — the census on a planted tree) and `e2e/fonts.spec.ts` (FTE-1 — the home and terms pages ask for no font and draw with the stack).

## 17. The Supabase client waits for a session (D234, Foundations turn 34)

DEC-261: the sign-in and database client (`@supabase/supabase-js`, about 52 KiB gzip: auth, realtime, storage, PostgREST) no longer rides any public page's first download. Browser code a public page draws reaches it through one door, `src/lib/supabase-door.ts`:

- `getSupabase()` fetches the client module once (`loadOnce`); every sign-in action, the callback, the reset and the signed-in screens await it.
- A browser that holds a session (the client's own storage key, `sb-<project ref>-auth-token`) or runs in a frame (a Lovable preview's broker) starts the client the moment the door's module is evaluated, beside the page's own code; a signed-out visitor's public page never fetches it. The sign-in screen starts it once it has painted, so a submit does not wait for it.
- `onAuthChange()` is the client's `onAuthStateChange`: a signed-out visitor hears `INITIAL_SESSION` with `null` on the next task, and the listener is attached to the client when the client arrives (a sign-in, another tab's sign-in).
- `currentSession()` answers `null` without the client when nothing is stored, and never rejects.
- `rpc()` calls a database function: for a signed-out visitor without the client it is the anonymous PostgREST call with the client's own auth headers (POST, the publishable key as `apikey`, the bearer only for an old-style anon key; not postgrest-js's X-Client-Info, an analytics header), in supabase-js's `{ data, error }` shape; otherwise it is the client's own `rpc`. A function sees the caller it saw before.
- Route calls (`createServerFn`) carry the session's bearer through `src/lib/session-bearer.ts`, registered in `src/start.ts` in place of the platform's attacher, which imports the client.

Measured on the supervisor's build: the entry closure 254.0 → 203.6 KiB; each public page 49.9–50.4 KiB lighter; the 29 signed-in and staff pages whose code still imports the client 3.9–4.0 KiB heavier (it is now a chunk of its own; a signed-in visitor's client starts as the page's code arrives). The frozen rule — at least 45 KiB off the entry closure, every sign-in, sign-up, callback and session test green in CI, AP-54 holding — is judged on this turn's CI run. Guards: check-bundle-size refuses an entry closure or a public page whose chunk text carries `GoTrueClient` (`MUST_NOT_CARRY`, BC-13), whatever the bundler names the chunk; the weight guard forbids `@supabase/supabase-js`, the client module and the attacher on the first-paint walk (from `src/start.ts` too); `e2e/supabase-door.spec.ts` SBE-1 (signed out: the home, a category, an ad and the terms fetch no client; the sign-in screen then fetches it) and SBE-2 (signed in: the stored session starts it).

**DEC-266 — the first screen is hydrated where React placed it** (Foundations turn 34, ruling 2; INC-913). React 19.2 streams a Suspense boundary that finishes after the shell as a hidden segment (`<div hidden id="S:n">`) and reveals it on a timer; TanStack Start's entry script is `async`, so the browser could begin hydrating while a boundary was still pending or queued, and the first state change above it (the auth answer, a strings layer, a shell choice) made React draw that boundary again — the server's nodes replaced (AP-54) and, until React's timer fired, two copies of a card in the page (PP-21, PW-94). The client entry, `src/client.tsx`, now hydrates only once the document has been read and no segment waits (`whenStreamPlaced`, `src/lib/hydrate-when-placed.ts`). Its cost: hydration waits for the stream's end and React's reveal — at most 300 ms after the first paint where a late boundary exists; a page without one is unchanged. A segment React never places ends the wait 1.5 s after the document was read, and hydration proceeds with a `[client-error] the first screen was not placed 1.5 s after the page was read; hydrating anyway` line. Guards: HWP-1…6 (`src/lib/hydrate-when-placed.test.ts`; HWP-5 pins react-dom's segment marker and `$RC`, HWP-6 the entry's order), the weight guard's walk from `src/client.tsx`, and SBE-3 in the browser (signed in: one copy of each card, the server's own kept).
