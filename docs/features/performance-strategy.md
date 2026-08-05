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

