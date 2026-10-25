# Foundations — turn 24: speed S1 — every page's first download held to its ceiling; the glyph map, the calendar, the posting doors and below-the-fold work off it (D234; INC-895, INC-896, INC-897): brief (saved unchanged, 2026-10-25)

```text
FOUNDATIONS BUNDLE — TURN 24 (2026-10-25; DEC-237; D234 — the operator, 2026-10-25: "it should be the fastest, lightweight — we should do everything to make it that way … VERY IMPORTANT"; anchors located at a5627d66472b44a080937fb68a27b6833ca6999d). Tier B (the build's budget guard; on-demand loading; the ad page's public read is shaped by the same code, moved unchanged). No migration. No new string. No package change. AGENTS.md: one line added (F4). Base: dev a5627d66472b44a080937fb68a27b6833ca6999d (Foundations turn 23's final commit; its CI run: A1). This brief replaces the two unsaved versions sent at 16:50 and 17:02 UTC; both of your stops were right: C3's "Try again" now renders through the Button primitive (src/components/ui/button.tsx, variant outline, size touch), and B1 reads the route manifest and the ceilings through Maps (`table.get(id)`, `ceilings.get(id)`), never `routes[id]` or `budgets[id]` (AGENTS.md: "A map indexed by an outside key is read through `ownValue`, never `map[key]`" — a .mjs script cannot import the TypeScript `ownValue`, and a Map holds only its own entries), and BC-9…12's planted sizes the same way; the ceilings of route-budgets.mjs were re-measured on this exact change (each the page's measured download plus 3 KiB, rounded up). schema-shape.ts's `row[key]` reads move unchanged and their keys are code literals (`str(row, "attr_key")`), not outside keys. ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — every page's ceiling (the guard); C — a module fetched on demand is fetched once; D — below-the-fold work waits for its place; E — the posting doors off the ad page; F — docs, register, AGENTS.md, roadmap, changelog.
BASE: a5627d66472b44a080937fb68a27b6833ca6999d
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/route-budgets.mjs
scripts/conformance/kit-adoption-allowlist.txt
scripts/conformance/on-demand-imports.test.ts
scripts/conformance/on-demand-imports-allowlist.txt
src/lib/load-once.ts
src/lib/load-once.test.ts
src/lib/use-near-viewport.ts
src/lib/use-near-viewport.test.tsx
src/components/shell/use-category-glyphs.ts
src/components/shell/use-category-glyphs.test.tsx
src/components/shell/app-rail.tsx
src/components/shell/date-calendar.tsx
src/components/shell/date-field.tsx
src/components/shell/date-field.test.tsx
src/components/shell/date-field-offline.test.tsx
src/features/posting/schema-shape.ts
src/features/posting/posting-service.ts
src/features/posting/map/map-preview.tsx
src/features/posting/map/leaflet.ts
src/features/posting/phone-parse.ts
src/features/ad-page/public-listing.ts
src/features/ad-page/similar-ads.tsx
src/features/ad-page/similar-ads.test.tsx
e2e/ad-page.spec.ts
SCOPE-END

THE SYSTEM (G0) — three concerns.
CONCERN 1: what a page downloads before it can run is held to that page's ceiling — every page — and the heavy feature modules never reach a public page's first download.
MECHANISM 1: scripts/check-bundle-size.mjs (the entry closure's ceiling, BUDGET_KIB :24-:28 at BASE) with scripts/bundle-closure.mjs (staticClosure :29-:41, MUST_STAY_LAZY :53) — extended in Part B: readRouteManifest, routePreloads, pageRouteIds, judgeRouteBudgets and PUBLIC_MUST_STAY_LAZY, and NEW scripts/route-budgets.mjs (one line per page).
CONSUMERS 1: every page route of the build's route manifest (dist/server/_tanstack-start-manifest_v-*.mjs; TanStack Start writes each route's modulepreload list and its children there) — 50 pages at BASE, server routes under /api/ excluded by rule; none is guarded today: the guard counts the entry's closure alone (302.2 KiB of 306, gzip 6, the supervisor's build of BASE). The public pages' first downloads at BASE (entry + the page's chunks, gzip 6): / 315.5, /c/$slug 315.5, /l/$slug 343.5 — holding posting-service-*.js (INC-895), /$name 314.3, /auth 314.1, /terms and /privacy 306.1; the entry itself holds category-glyphs-*.js, 14.5 KiB (INC-896); /post 439.2 holds date-field-*.js with react-day-picker, 21.4 KiB.
CONCERN 2: a module a page fetches on demand is fetched once per visit, and a failed download never breaks the page (INC-897).
MECHANISM 2: NONE YET — built in C1 as NEW src/lib/load-once.ts: `loadOnce(fetchModule)` → `ready()` and `load()`; a failed download is forgotten so the next ask tries again.
CONSUMERS 2 (every dynamic `import(` in the browser's code under src/, server-only specifiers excepted — the census of C5, at BASE): the category glyph map (C2, NEW) and the calendar (C3, NEW) — use; src/features/posting/map/leaflet.ts :28-:41 — bypasses (its own `loaded ??=`, which keeps a failed download as a rejection for the rest of the visit: the map never draws again) — moves in C4; src/features/posting/phone-parse.ts :25-:39 — bypasses (its own `pending` cache) — moves in C4; src/components/shell/breadcrumbs.tsx :44, :47, :51, :54, src/features/posting/preview/listing-detail.tsx :42, :45, :377 and src/features/posting/step-where.tsx :49, :51 — bypass (React.lazy: a failed chunk throws to the route's error boundary, so a flaky network can turn the ad page into "This page didn't load") — LEFT, INC-897; src/i18n/compiled-catalog.ts :13, :22, :23 — bypasses (loaders read by the language provider) — LEFT, INC-897; src/features/admin-categories/category-images-service.ts :107, src/routes/legal.publishing.tsx :50 and src/routes/post_.$listingId.tsx :31 — allowances with a date (a staff upload that reports its own failure; a route loader's module whose failure is the route's own error screen).
CONCERN 3: below-the-fold work on a public page — a library, a read, pictures — starts only when its place nears the screen.
MECHANISM 3: NONE YET — built in D1 as NEW src/lib/use-near-viewport.ts: `useNearViewport(ref, { enabled, margin })`, a latch that turns true once the box comes within 400 px of the screen (IntersectionObserver), true at once when disabled or when the browser has no IntersectionObserver.
CONSUMERS 3: the buyer's map preview (src/features/posting/map/map-preview.tsx, the effect at :67 loads Leaflet, the tile plan and tiles on mount) — moves in D2, the seller's own preview (wizard, my listings) keeps drawing at once; the similar ads (src/features/ad-page/similar-ads.tsx :31 reads on mount, then card photos) — moves in D3; the feed's load-more (src/components/marketplace/feed.tsx :100-:111) and the seller page's more-ads observer already wait for their own sentinel (a repeating infinite-scroll trigger, not this latch) — unchanged.
COVERED HERE: concern 1 whole (every page judged; four modules moved off the pages that never use them); concern 2: the mechanism, its census, and the glyph map, the calendar, leaflet.ts and phone-parse.ts on it; concern 3: the mechanism and both consumers. LEFT: the React.lazy sites and the catalogue loaders above — INC-897, the next speed turn. SIBLING CONCERN (found by your stop of 16:54 UTC): an interactive control renders through the Button primitive (src/components/ui/button.tsx) — at BASE, 136 raw <button> elements in 37 files outside src/components/ui (78 of them in src/features/posting), and no guard; this turn's one new control, the calendar's "Try again" (C3), uses Button; the 136 are LEFT — INC-899 (raw <button> elements bypass the Button primitive; the form kit, G54 c, moves them and lands a Button census guard). Do not change them in this turn (A1).
CONFORMANCE GUARD: concern 1 — the bundle-budget CI job (ci.yml :273-:287, unchanged) runs check-bundle-size.mjs, which now judges every page of the manifest against route-budgets.mjs: a page with no line, a line with no page, a page over its ceiling, a page 8 KiB or more under it (the ratchet: lower it), and a public page holding a PUBLIC_MUST_STAY_LAZY chunk each fail — proven on planted manifests by BC-6…BC-12 (scripts/bundle-closure.test.ts); concern 2 — NEW scripts/conformance/on-demand-imports.test.ts OD-1…OD-3 (every browser dynamic import inside `loadOnce(` or on scripts/conformance/on-demand-imports-allowlist.txt, `key | reason | until`; OD-2 catches a planted React.lazy bypass; OD-3 holds the INC-897 lines to four or fewer); concern 3 — NONE YET: which effect does below-the-fold work is not readable by shape; your K2 lists them and the records turn carries it as guard debt.
EXCEPTIONS: the seller's own map preview draws at once (`enabled: audience === "buyer"`, D2); the three dated allowances of C5.
FIVE LENSES — security: nothing here reads or writes data differently; the ad page's public read is shaped by the same two functions, moved byte for byte (E1); a refused or failed download never shows another person's data, only a held box or "Try again" · performance: measured on the supervisor's build of this exact change (gzip 6): the entry 302.2 → 289.9 KiB (every page −12.3), / and /c/$slug 315.5 → 303.3, /l/$slug 343.5 → 327.4 (and Leaflet 41.9 KiB, its CSS, the tile plan and tiles, the similar-ads read and its photos only when scrolled to), /post 439.2 → 422.1; the guard's own cost is one more pass over the build's chunks in an existing CI job · failure modes: a glyph map that cannot download leaves the rail's rows without glyphs (logged), a calendar that cannot download says "Try again" and asks again, a map library that failed once is asked again by the next map, a page whose first download grows past its line fails CI by name — never a crashed page · consistency: one way to fetch a module on demand, one way to wait for a below-the-fold place, one table of every page's ceiling · future growth: a new page is one line in route-budgets.mjs (the guard refuses a page without one); a new heavy feature is one prefix in PUBLIC_MUST_STAY_LAZY; every later speed turn lowers lines, never raises them silently.
FORWARD-SCAN: the next speed turns (the ad page's LCP — photo links signed in the loader and fetchpriority; category pictures as WebP at card size; the font decision; edge caching, a DEC) each lower lines of route-budgets.mjs; the React.lazy sites move onto loadOnce (INC-897). REGISTER: docs/governance/mechanisms.md — NEW rows 40, 41 and 42 (F3).

WHY
- The first phone-lab baseline of the published site (Foundations turn 23, docs/perf/baseline-2026-10-25-*.json; Lighthouse's slow-4G phone): every page ships 340–395 KB of script on the wire with 0.5–0.8 s of blocked main thread; the ad page's LCP is 6.0 s and 894 KB. The research's budget for a feed, ad or seller page is about 150 KB of compressed first-paint script; today's is about twice that. This turn holds every page to a ceiling, so a saving is kept and a regression fails by name, and takes the first four modules off pages that never use them.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-24.md and paste its sha256sum and its byte count (the carrying message states both; a difference is a STOP). roadmap.md: line 3 names docs/governance/briefs/foundations-turn-24.md (the text after "The brief in force: " up to its closing parenthesis is replaced with `docs/governance/briefs/foundations-turn-24.md (Foundations turn 24: speed S1 — every page's first download held to its ceiling; four modules off the pages that never use them — D234)`; everything after it stays); under the Foundations bundle, directly after the line that begins "  - [x] Turn 23 (docs/governance/briefs/foundations-turn-23", add `  - [ ] Turn 24 (docs/governance/briefs/foundations-turn-24.md; no migration) — speed S1: per-page first-download ceilings (scripts/route-budgets.mjs); loadOnce and useNearViewport; the glyph map, the calendar, the posting doors and the ad page's map and similar ads off the first download (D234; INC-895, INC-896, INC-897).` Tick nothing else.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B–F; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. This turn changes one test, AP-32 (D4), exactly as written; any other spec change you find necessary is a STOP with the test and line reported.
- Run no stateful git command. Edits with your file-editing tool. Every FILE block below is the file's whole text; every EDIT block replaces its OLD text (which occurs exactly once at BASE) with its NEW text.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-24.md, roadmap.md, docs/_changelog.md, docs/features/performance-strategy.md, docs/features/ci-guards.md, docs/governance/mechanisms.md, AGENTS.md (F4 only), docs/governance/reports/foundations-turn-24.report.md (your completion report), docs/generated/i18n-usage.json and public/i18n-usage.json (only if they move). Anything else is a STOP naming the file and why.
- KEEP EVERY SAVE GREEN-SHAPED: the platform saves your work to dev mid-turn and every save runs CI. Land each part whole (a new module and its importers together). After each part: read /tmp/observability/build-errors.log and fix every `error TS` line at its root; run the tests the part touched.
- Your platform rule stands, with no exception: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." So the per-page guard itself is judged by CI's bundle-budget job on your final commit, which prints every page's line; its logic is proven here by BC-6…BC-12. At THE CHECKS, read /tmp/observability/build-errors.log: when it exists, paste every `error TS` line and fix each at its root (no `!`, cast, `any` or `@ts-expect-error`); when it does not, say so.
- Known limit, not yours: scripts/conformance/executor-hooks.test.ts EXH-17 (and at times EXH-11) times out in your sandbox (INC-890; they pass in CI). Do not change, skip or work around them; paste the failure lines under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS, and the tests each part touched as you go; THE END-TO-END CHECK's specs, both projects, 2 workers, fake mode, 0 retries, within the 600-second sandbox ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); stop any preview server a killed run left on its port before your first run; no local repeat runs (DEC-184); a run the ceiling kills is reported as such and never re-run in the background — CI on the final commit runs every test (S407).
- Behaviour contract: no page changes what it shows once it has loaded. The rail's category rows draw after their glyphs (its skeleton holds until then); a date field's calendar appears on first open after a short held box; the ad page's map draws as it nears the screen and the similar ads read as their place does; the seller's own map preview draws at once as today. Nothing else changes.
- Knowledge K: K1 the three mechanisms above; K2 the report lists (file:line) every browser dynamic import outside loadOnce after this turn (it must equal the allowlist), and every useEffect on a public page (src/routes/index.tsx, c.$slug.tsx, l.$slug.tsx, $name.tsx and the components they render) that reads data or loads a library for something below the first screen; and every raw <button> left in a file this turn touches (file:line; at BASE date-field.tsx :80 and :98 — the field itself and its clear control); K3 the guard tests (BC-6…12, OD-1…3) land with the mechanisms; K4 no literal language or country code; K5 does not arise; K6 does not arise.
- Tests (G27, G38): no real row; no assertion loosened; red-first for SIM-4 and SIM-5 (D3's test edits land first and run against similar-ads.tsx as it is at <START> — paste them failing — then passing after D3's file) and for OD-1 (C5's two files land at the start of Part C, before C1–C4: paste OD-1's findings then — leaflet.ts :35, :36 and phone-parse.ts :30, nothing else — and passing after C4).
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on a5627d66472b44a080937fb68a27b6833ca6999d). A red on a5627d66472b44a080937fb68a27b6833ca6999d is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part B.

PART B — EVERY PAGE'S CEILING (CONCERN 1; INC-895, INC-896).
B1. scripts/bundle-closure.mjs, these edits (the last one appends the route-manifest reader and the per-page judge):
EDIT scripts/bundle-closure.mjs #1
OLD-BEGIN
 * scripts/bundle-closure.test.ts.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// `import "./x.js"`, `import { a } from "./x.js"` and `export … from "./x.js"`;
OLD-END
NEW-BEGIN
 * scripts/bundle-closure.test.ts.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

// `import "./x.js"`, `import { a } from "./x.js"` and `export … from "./x.js"`;
NEW-END
EDIT scripts/bundle-closure.mjs #2
OLD-BEGIN
  );
}
OLD-END
NEW-BEGIN
  );
}

/**
 * D234 speed turn S1 — WHAT A PAGE DOWNLOADS BEFORE IT CAN RUN. The entry's
 * closure is only the shell; a page also needs its route's chunks, which the
 * server render names as modulepreload links. TanStack Start writes them to the
 * build's route manifest (dist/server/_tanstack-start-manifest_v-*.mjs, a
 * module with no imports that exports `tsrStartManifest()`): each route lists
 * its own `preloads` and its parent in `children`. A route's first download is
 * the static closure of its chain's preloads; the entry is the root's.
 */
export async function readRouteManifest(serverDir) {
  const name = existsSync(serverDir)
    ? readdirSync(serverDir).find((file) => /^_tanstack-start-manifest.*\.mjs$/.test(file))
    : undefined;
  if (name === undefined) {
    throw new Error(`route manifest: no _tanstack-start-manifest*.mjs in ${serverDir}`);
  }
  const module = await import(pathToFileURL(resolve(serverDir, name)).href);
  const routes = module.tsrStartManifest?.().routes;
  if (routes === undefined || routes === null || typeof routes !== "object") {
    throw new Error(`route manifest: ${name} exports no routes`);
  }
  return routes;
}

/**
 * The chunk file names a route preloads: its own and every ancestor's, root included.
 * Route ids come from a build file, so the manifest is read as its own entries only
 * (a Map; the own-key rule — never `routes[id]`), and a cycle cannot loop.
 */
export function routePreloads(routes, routeId) {
  const table = new Map(Object.entries(routes));
  if (!table.has(routeId)) throw new Error(`route manifest: no route ${routeId}`);
  const parent = new Map();
  for (const [id, route] of table) {
    for (const child of route.children ?? []) parent.set(child, id);
  }
  const names = new Set();
  const seen = new Set();
  for (let id = routeId; id !== undefined && !seen.has(id); id = parent.get(id)) {
    seen.add(id);
    for (const path of table.get(id)?.preloads ?? []) names.add(path.split("/").pop());
  }
  return [...names].sort();
}

/**
 * D234 S1 — chunks that must never reach a PUBLIC page's first download (a page a
 * visitor opens signed out: home, category, ad, seller, sign-in, legal). The
 * posting doors, the schema library, the calendar, the category glyph map and the
 * map library load only where their feature is used.
 */
export const PUBLIC_MUST_STAY_LAZY = [
  "posting-service",
  "zod",
  "category-glyphs",
  "date-calendar",
  "leaflet",
];

/** The first chunk name in a closure that starts with one of `prefixes`, or null. */
export function firstLazyViolation(closureNames, prefixes) {
  return closureNames.find((name) => prefixes.some((prefix) => name.startsWith(prefix))) ?? null;
}

/** The routes that are pages: every manifest route but the root and the server routes under /api/. */
export function pageRouteIds(routes) {
  return Object.keys(routes)
    .filter((id) => id !== "__root__" && !id.startsWith("/api/"))
    .sort();
}

/**
 * D234 S1 — judge every page against its ceiling. `measure(id)` answers the
 * page's first download as `{ kib, closure }`. A page with no ceiling, a ceiling
 * with no page, a page over its ceiling, a page `slack` KiB or more under it (the
 * ratchet: lower it), and a public page holding a must-stay-lazy chunk each fail.
 */
export function judgeRouteBudgets({ routeIds, budgets, measure, slack, publicLazy }) {
  // Page ids come from the build's manifest: the ceilings are read as own entries only.
  const ceilings = new Map(Object.entries(budgets));
  const rows = [];
  const failures = [];
  for (const id of routeIds) {
    const budget = ceilings.get(id);
    if (budget === undefined) {
      failures.push(
        `${id}: no ceiling in scripts/route-budgets.mjs (every page declares its first download)`,
      );
      continue;
    }
    const { kib, closure } = measure(id);
    rows.push({ id, kib, ceiling: budget.ceiling });
    if (kib > budget.ceiling) {
      failures.push(`${id}: ${kib.toFixed(1)} KiB, over its ceiling of ${budget.ceiling} KiB`);
    } else if (budget.ceiling - kib >= slack) {
      failures.push(
        `${id}: ${kib.toFixed(1)} KiB, ${slack} KiB or more under its ceiling of ${budget.ceiling} KiB (ratchet: lower the ceiling to ${Math.ceil(kib + 3)})`,
      );
    }
    if (budget.public) {
      const lazy = firstLazyViolation(closure, publicLazy);
      if (lazy) failures.push(`${id}: ${lazy} must stay lazy on a public page (D234)`);
    }
  }
  for (const id of ceilings.keys()) {
    if (!routeIds.includes(id))
      failures.push(`${id}: a ceiling for a page the build does not have`);
  }
  return { rows, failures };
}
NEW-END
B2. NEW scripts/route-budgets.mjs (sha256 23fcc606c281deefd5e14cf4915bf1aed9de770ed00e131b7ae7deaa27518826):
FILE-BEGIN scripts/route-budgets.mjs
/**
 * D234 speed turn S1 — THE PER-PAGE FIRST-DOWNLOAD CEILINGS (KiB, gzip level 6),
 * read by scripts/check-bundle-size.mjs. Every page route the build's route
 * manifest names has one line here (server routes under /api/ have no page and
 * are left out by rule); a page with no line fails the guard, and so does a line
 * whose page is gone. `public` marks a page a visitor opens signed out: its
 * first download must also hold none of PUBLIC_MUST_STAY_LAZY
 * (scripts/bundle-closure.mjs).
 *
 * A RATCHET: each ceiling is the page's measured download plus 3 KiB of
 * build-to-build room, rounded up. A page that grows past its ceiling fails; a page that
 * shrinks 8 KiB or more below it fails too, until its ceiling is lowered in the
 * same commit — so every saving is kept. Raising a ceiling is a commit that says
 * why. Measured 2026-10-25 on the S1 build (the comment after each line).
 */
export const ROUTE_BUDGETS_KIB = {
  "/": { ceiling: 307, public: true }, // 303.3
  "/$name": { ceiling: 305, public: true }, // 302.0
  "/account": { ceiling: 298, public: false }, // 294.9
  "/account_/legal": { ceiling: 295, public: false }, // 291.7
  "/account_/legal_/$versionId": { ceiling: 297, public: false }, // 293.2
  "/account_/saved": { ceiling: 306, public: false }, // 302.1
  "/admin": { ceiling: 294, public: false }, // 291.0
  "/admin/": { ceiling: 295, public: false }, // 291.9
  "/admin/ai": { ceiling: 346, public: false }, // 342.1
  "/admin/attributes": { ceiling: 362, public: false }, // 358.4
  "/admin/audit": { ceiling: 323, public: false }, // 319.7
  "/admin/categories": { ceiling: 369, public: false }, // 365.1
  "/admin/countries": { ceiling: 352, public: false }, // 348.2
  "/admin/coverage": { ceiling: 344, public: false }, // 340.7
  "/admin/images": { ceiling: 295, public: false }, // 291.7
  "/admin/impersonation_/$sessionId": { ceiling: 324, public: false }, // 320.2
  "/admin/legal": { ceiling: 307, public: false }, // 303.4
  "/admin/legal_/$versionId": { ceiling: 306, public: false }, // 302.7
  "/admin/legal_/edit": { ceiling: 313, public: false }, // 309.7
  "/admin/listings": { ceiling: 367, public: false }, // 363.9
  "/admin/listings_/$listingId": { ceiling: 396, public: false }, // 392.2
  "/admin/listings_/$listingId_/edit": { ceiling: 431, public: false }, // 427.6
  "/admin/locations": { ceiling: 302, public: false }, // 298.3
  "/admin/places": { ceiling: 353, public: false }, // 349.4
  "/admin/roles": { ceiling: 319, public: false }, // 315.6
  "/admin/roles_/$roleId": { ceiling: 326, public: false }, // 322.1
  "/admin/screening": { ceiling: 389, public: false }, // 385.3
  "/admin/translations": { ceiling: 409, public: false }, // 405.7
  "/admin/translations_/$lang": { ceiling: 336, public: false }, // 332.1
  "/admin/users": { ceiling: 317, public: false }, // 313.6
  "/admin/users_/$userId": { ceiling: 314, public: false }, // 310.2
  "/auth": { ceiling: 305, public: true }, // 301.9
  "/auth_/callback": { ceiling: 294, public: true }, // 290.8
  "/auth_/reset": { ceiling: 296, public: true }, // 292.9
  "/c/$slug": { ceiling: 307, public: true }, // 303.3
  "/dev/primitives": { ceiling: 309, public: false }, // 305.3
  "/dev/style": { ceiling: 311, public: false }, // 307.4
  "/dev/tall": { ceiling: 294, public: false }, // 290.3
  "/l/$slug": { ceiling: 331, public: true }, // 327.4
  "/legal/$kind": { ceiling: 297, public: true }, // 293.9
  "/legal/accept": { ceiling: 304, public: false }, // 300.9
  "/legal/publishing": { ceiling: 298, public: true }, // 294.5
  "/my-listings": { ceiling: 343, public: false }, // 339.7
  "/my-listings_/$listingId": { ceiling: 347, public: false }, // 344.0
  "/my-listings_/$listingId_/edit": { ceiling: 426, public: false }, // 422.2
  "/post": { ceiling: 426, public: false }, // 422.1
  "/post_/$listingId": { ceiling: 426, public: false }, // 422.1
  "/privacy": { ceiling: 297, public: true }, // 293.8
  "/settings": { ceiling: 302, public: false }, // 298.2
  "/terms": { ceiling: 297, public: true }, // 293.8
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
FILE-END scripts/route-budgets.mjs
B3. scripts/check-bundle-size.mjs, these edits:
EDIT scripts/check-bundle-size.mjs #1
OLD-BEGIN

import { entryChunks, mustStayLazyViolation, staticClosure } from "./bundle-closure.mjs";

OLD-END
NEW-BEGIN

import {
  entryChunks,
  judgeRouteBudgets,
  mustStayLazyViolation,
  pageRouteIds,
  PUBLIC_MUST_STAY_LAZY,
  readRouteManifest,
  routePreloads,
  staticClosure,
} from "./bundle-closure.mjs";
import { RATCHET_SLACK_KIB, ROUTE_BUDGETS_KIB } from "./route-budgets.mjs";

NEW-END
EDIT scripts/check-bundle-size.mjs #2
OLD-BEGIN
  // 2026-10-24: the agreement sentences carry link tokens (D235) and the publishing page its sections; 305.x measured
  js: 306,
  css: 40,
OLD-END
NEW-BEGIN
  // 2026-10-24: the agreement sentences carry link tokens (D235) and the publishing page its sections; 305.x measured
  // D234 speed turn S1 (2026-10-25): the category glyph map left the first paint (302.2 → 289.9 measured; 3 KiB of build-to-build room, as every page's line in route-budgets.mjs).
  js: 293,
  css: 40,
NEW-END
EDIT scripts/check-bundle-size.mjs #3
OLD-BEGIN
}
console.log("Bundle budget OK.");
OLD-END
NEW-BEGIN
}

/**
 * D234 speed turn S1 — EVERY PAGE'S FIRST DOWNLOAD: the entry's closure plus the
 * page's own chunks, read from the build's route manifest (scripts/bundle-closure.mjs),
 * judged against scripts/route-budgets.mjs.
 */
const assetsDir = dirname(jsEntries[0]);
const serverDir = buildDir.startsWith(".output") ? ".output/server" : "dist/server";
const routes = await readRouteManifest(serverDir);
const sizeCache = new Map();
const gz = (name) => {
  if (!sizeCache.has(name))
    sizeCache.set(name, gzipSync(readFileSync(join(assetsDir, name))).length);
  return sizeCache.get(name);
};
const { rows, failures } = judgeRouteBudgets({
  routeIds: pageRouteIds(routes),
  budgets: ROUTE_BUDGETS_KIB,
  slack: RATCHET_SLACK_KIB,
  publicLazy: PUBLIC_MUST_STAY_LAZY,
  measure: (id) => {
    const closure = staticClosure(assetsDir, routePreloads(routes, id));
    return { kib: closure.reduce((sum, name) => sum + gz(name), 0) / 1024, closure };
  },
});
console.log("\nPer-page first download (entry + the page's chunks, gzipped):");
for (const { id, kib, ceiling } of rows) {
  console.log(`  ${kib.toFixed(1).padStart(7)} / ${String(ceiling).padStart(3)} KiB  ${id}`);
}
if (failures.length > 0) {
  console.error("\nPer-page budget failed (D234):");
  for (const line of failures) console.error(`  ${line}`);
  console.error(
    "\nCode-split the addition behind a dynamic import, or change the page's line in\n" +
      "scripts/route-budgets.mjs in a commit that states why (a saving lowers it).",
  );
  process.exit(1);
}
console.log("Bundle budget OK.");
NEW-END
B4. scripts/bundle-closure.test.ts, these edits (the last one appends BC-6…BC-12):
EDIT scripts/bundle-closure.test.ts #1
OLD-BEGIN
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
OLD-END
NEW-BEGIN
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
NEW-END
EDIT scripts/bundle-closure.test.ts #2
OLD-BEGIN
import {
  entryChunks,
  mustStayLazyViolation,
  staticClosure,
  staticImportsOf,
OLD-END
NEW-BEGIN
import {
  entryChunks,
  judgeRouteBudgets,
  mustStayLazyViolation,
  pageRouteIds,
  PUBLIC_MUST_STAY_LAZY,
  readRouteManifest,
  routePreloads,
  staticClosure,
  staticImportsOf,
NEW-END
EDIT scripts/bundle-closure.test.ts #3
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });
});

/**
 * D234 speed turn S1 — every page's first download, from the build's route
 * manifest, judged against scripts/route-budgets.mjs. Proven on planted manifests.
 */
describe("every page's first download (D234)", () => {
  const routes = {
    __root__: {
      children: ["/", "/l/$slug", "/post", "/api/feed"],
      preloads: ["/assets/index-a.js"],
    },
    "/": { preloads: ["/assets/home-b.js"] },
    "/l/$slug": { preloads: ["/assets/ad-c.js", "/assets/index-a.js"] },
    "/post": { preloads: ["/assets/wizard-d.js"] },
    "/api/feed": {},
  };

  it("BC-6 a page preloads its own chunks and every ancestor's, once each; an unknown page throws", () => {
    expect(routePreloads(routes, "/l/$slug")).toEqual(["ad-c.js", "index-a.js"]);
    expect(routePreloads(routes, "/")).toEqual(["home-b.js", "index-a.js"]);
    expect(() => routePreloads(routes, "/gone")).toThrow("no route /gone");
  });

  it("BC-7 the pages are every route but the root and the server routes under /api/", () => {
    expect(pageRouteIds(routes)).toEqual(["/", "/l/$slug", "/post"]);
  });

  it("BC-8 the manifest module is read from the server build; a build without one fails", async () => {
    // Planted inside the project (node_modules/.cache): the test runner imports only from there.
    const cache = join(process.cwd(), "node_modules", ".cache");
    mkdirSync(cache, { recursive: true });
    const dir = mkdtempSync(join(cache, "route-manifest-"));
    writeFileSync(
      join(dir, "_tanstack-start-manifest_v-x.mjs"),
      'var tsrStartManifest = () => ({ routes: { __root__: { children: ["/"] }, "/": { preloads: ["/assets/h.js"] } } });\nexport { tsrStartManifest };\n',
    );
    try {
      const read = await readRouteManifest(dir);
      expect(routePreloads(read, "/")).toEqual(["h.js"]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
    await expect(readRouteManifest(planted({ "other.mjs": "" }))).rejects.toThrow(
      "no _tanstack-start-manifest",
    );
  });

  const sizes: Record<string, { kib: number; closure: string[] }> = {
    "/": { kib: 300, closure: ["index-a.js", "home-b.js"] },
    "/l/$slug": { kib: 320, closure: ["index-a.js", "ad-c.js"] },
    "/post": { kib: 420, closure: ["index-a.js", "wizard-d.js", "posting-service-e.js"] },
  };
  const judge = (budgets: Record<string, { ceiling: number; public: boolean }>, measured = sizes) =>
    judgeRouteBudgets({
      routeIds: ["/", "/l/$slug", "/post"],
      budgets,
      slack: 8,
      publicLazy: PUBLIC_MUST_STAY_LAZY,
      measure: (id: string) => {
        const size = new Map(Object.entries(measured)).get(id);
        if (size === undefined) throw new Error(`no size planted for ${id}`);
        return size;
      },
    }).failures;
  const fair = {
    "/": { ceiling: 303, public: true },
    "/l/$slug": { ceiling: 323, public: true },
    "/post": { ceiling: 423, public: false },
  };

  it("BC-9 pages within their ceilings pass; a private page may hold the posting doors", () => {
    expect(judge(fair)).toEqual([]);
  });

  it("BC-10 a page over its ceiling fails, and so does one 8 KiB or more under it (the ratchet)", () => {
    expect(judge({ ...fair, "/": { ceiling: 299, public: true } })).toEqual([
      "/: 300.0 KiB, over its ceiling of 299 KiB",
    ]);
    expect(judge({ ...fair, "/post": { ceiling: 428, public: false } })).toEqual([
      "/post: 420.0 KiB, 8 KiB or more under its ceiling of 428 KiB (ratchet: lower the ceiling to 423)",
    ]);
  });

  it("BC-11 a page with no ceiling fails, and so does a ceiling for a page the build lacks", () => {
    const { "/post": _post, ...withoutPost } = fair;
    expect(judge(withoutPost)).toEqual([
      "/post: no ceiling in scripts/route-budgets.mjs (every page declares its first download)",
    ]);
    expect(judge({ ...fair, "/gone": { ceiling: 300, public: false } })).toEqual([
      "/gone: a ceiling for a page the build does not have",
    ]);
  });

  it("BC-12 a public page holding a must-stay-lazy chunk fails, by name", () => {
    const planted = {
      ...sizes,
      "/l/$slug": { kib: 320, closure: ["index-a.js", "ad-c.js", "posting-service-e.js"] },
    };
    expect(judge(fair, planted)).toEqual([
      "/l/$slug: posting-service-e.js must stay lazy on a public page (D234)",
    ]);
    for (const prefix of ["category-glyphs", "date-calendar", "leaflet", "zod"]) {
      expect(PUBLIC_MUST_STAY_LAZY).toContain(prefix);
    }
  });
});
NEW-END
B5. scripts/conformance/kit-adoption-allowlist.txt (bundle-closure.mjs now lists the server build's folder to find the manifest — not a tree census):
EDIT scripts/conformance/kit-adoption-allowlist.txt #1
OLD-BEGIN
scripts/check-bundle-size.mjs | not a guard: reads the dist bundle | DEC-244
src/features/posting/price-basis.test.ts | not a guard: a mirror test reading the latest migration | DEC-244
OLD-END
NEW-BEGIN
scripts/check-bundle-size.mjs | not a guard: reads the dist bundle | DEC-244
scripts/bundle-closure.mjs | not a guard: finds the build's route manifest (D234) | DEC-244
src/features/posting/price-basis.test.ts | not a guard: a mirror test reading the latest migration | DEC-244
NEW-END

PART C — A MODULE FETCHED ON DEMAND IS FETCHED ONCE (CONCERN 2; INC-896, INC-897).
C1. NEW src/lib/load-once.ts (sha256 8ba5ae554263041a907a65cba31ef6fce0157bb5f24993deefd026b183f3bd12):
FILE-BEGIN src/lib/load-once.ts
/**
 * D234 speed turn S1 — A MODULE A PAGE FETCHES ON DEMAND IS FETCHED ONCE PER VISIT.
 *
 * `loadOnce(() => import("./x").then(...))` gives `ready()`, the module's value once
 * it has arrived (null before), and `load()`, which starts the download or joins
 * the one in flight and resolves with the value. A failed download is forgotten,
 * so the next `load()` tries again; the caller decides what the person sees
 * meanwhile (a skeleton, a held box, a "Try again") — never a crashed page, which
 * is what a failed React.lazy chunk does through the route's error boundary.
 */
export interface LoadOnce<T> {
  ready(): T | null;
  load(): Promise<T>;
}

export function loadOnce<T>(fetchModule: () => Promise<T>): LoadOnce<T> {
  let value: T | null = null;
  let inFlight: Promise<T> | null = null;
  return {
    ready: () => value,
    load: () => {
      inFlight ??= fetchModule().then(
        (next) => {
          value = next;
          return next;
        },
        (error: unknown) => {
          inFlight = null;
          throw error;
        },
      );
      return inFlight;
    },
  };
}
FILE-END src/lib/load-once.ts
NEW src/lib/load-once.test.ts (sha256 ae77b930a7278efbfbaf4223347ae9d1d699702647f28f50c13723e0b850cc73):
FILE-BEGIN src/lib/load-once.test.ts
import { describe, expect, it, vi } from "vitest";

import { loadOnce } from "./load-once";

/** D234 speed turn S1 — a module fetched on demand is fetched once per visit. */
describe("loadOnce (D234)", () => {
  it("LO-1 one download serves every ask; the value is ready once it has arrived", async () => {
    const fetchModule = vi.fn(async () => "the module");
    const module = loadOnce(fetchModule);
    expect(module.ready()).toBeNull();
    const [first, second] = await Promise.all([module.load(), module.load()]);
    expect(first).toBe("the module");
    expect(second).toBe("the module");
    expect(await module.load()).toBe("the module");
    expect(module.ready()).toBe("the module");
    expect(fetchModule).toHaveBeenCalledTimes(1);
  });

  it("LO-2 a failed download is forgotten: the next ask tries again", async () => {
    const fetchModule = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce("the module");
    const module = loadOnce(fetchModule);
    await expect(module.load()).rejects.toThrow("offline");
    expect(module.ready()).toBeNull();
    expect(await module.load()).toBe("the module");
    expect(fetchModule).toHaveBeenCalledTimes(2);
  });
});
FILE-END src/lib/load-once.test.ts
C2. NEW src/components/shell/use-category-glyphs.ts (sha256 85799d5030784cd4c086ef627f5124edf55add4c14ddad8feb58b09c7cc36086):
FILE-BEGIN src/components/shell/use-category-glyphs.ts
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { loadOnce } from "@/lib/load-once";

/**
 * D234 speed turn S1 — THE CATEGORY GLYPH MAP LOADS AFTER THE FIRST PAINT.
 *
 * category-glyphs.ts imports some 170 lucide icons (14.5 KiB gzipped); the rail
 * reached it statically, so every page's first download carried every glyph,
 * though the rail draws a category only once the tree has arrived from
 * /api/categories/tree after hydration. This hook starts the map's download on
 * mount — beside the tree read, so it is usually in hand before the rows can
 * draw — and reports `settled` once it has arrived or failed; the rail keeps its
 * skeleton until then, so a row never draws without its glyph and never shifts.
 * One download per visit (src/lib/load-once.ts); a later mount reads it at once.
 * A failed download is logged, the rows draw without glyphs, and the next mount
 * tries again. The bundle budget guard keeps the map off every public page's
 * first download (PUBLIC_MUST_STAY_LAZY "category-glyphs").
 */
export type GlyphReader = (name: string | null | undefined) => LucideIcon | null;

const NO_GLYPH: GlyphReader = () => null;

const GLYPHS = loadOnce(() =>
  import("@/components/shell/category-glyphs").then((module) => module.categoryGlyphOrNull),
);

export function useCategoryGlyphs(): { glyphOf: GlyphReader; settled: boolean } {
  const [state, setState] = useState<{ glyphOf: GlyphReader; settled: boolean }>(() => {
    const ready = GLYPHS.ready();
    return ready === null
      ? { glyphOf: NO_GLYPH, settled: false }
      : { glyphOf: ready, settled: true };
  });
  useEffect(() => {
    if (state.settled) return;
    let live = true;
    GLYPHS.load().then(
      (glyphOf) => {
        if (live) setState({ glyphOf, settled: true });
      },
      (error: unknown) => {
        console.error("[client-error] category glyphs failed to load", error);
        if (live) setState({ glyphOf: NO_GLYPH, settled: true });
      },
    );
    return () => {
      live = false;
    };
  }, [state.settled]);
  return state;
}
FILE-END src/components/shell/use-category-glyphs.ts
NEW src/components/shell/use-category-glyphs.test.tsx (sha256 29a40a0a6f8b4ccd2ec4415e7303debce722315a1651d20e691b0b78da69c5e9):
FILE-BEGIN src/components/shell/use-category-glyphs.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useCategoryGlyphs } from "./use-category-glyphs";

/**
 * D234 speed turn S1 — the category glyph map arrives after the first paint; the
 * rail keeps its skeleton until it has settled (app-rail.tsx).
 */
function Probe({ name }: { name: string }) {
  const { glyphOf, settled } = useCategoryGlyphs();
  return (
    <div
      data-testid={`probe-${name}`}
      data-settled={String(settled)}
      data-glyph={String(glyphOf(name) !== null)}
    />
  );
}

describe("useCategoryGlyphs (D234)", () => {
  it("GLY-1 a first reader starts unsettled with no glyph, then settles with the map", async () => {
    render(<Probe name="Car" />);
    const probe = screen.getByTestId("probe-Car");
    expect(probe.getAttribute("data-settled")).toBe("false");
    expect(probe.getAttribute("data-glyph")).toBe("false");
    await waitFor(() => expect(probe.getAttribute("data-settled")).toBe("true"));
    expect(probe.getAttribute("data-glyph")).toBe("true");
  });

  it("GLY-2 a later reader reads the map at once; an unknown name draws no glyph", () => {
    render(<Probe name="NoSuchIcon" />);
    const probe = screen.getByTestId("probe-NoSuchIcon");
    expect(probe.getAttribute("data-settled")).toBe("true");
    expect(probe.getAttribute("data-glyph")).toBe("false");
  });
});
FILE-END src/components/shell/use-category-glyphs.test.tsx
src/components/shell/app-rail.tsx, these edits (the glyph map's static import and its unused re-export go; the category nav reads the hook and keeps its skeleton until the map has settled):
EDIT src/components/shell/app-rail.tsx #1
OLD-BEGIN
import { useShell } from "@/components/shell-context";
import { categoryGlyphOrNull } from "@/components/shell/category-glyphs";
import { PanelHeader } from "@/components/shell/panel-header";
OLD-END
NEW-BEGIN
import { useShell } from "@/components/shell-context";
import { useCategoryGlyphs } from "@/components/shell/use-category-glyphs";
import { PanelHeader } from "@/components/shell/panel-header";
NEW-END
EDIT src/components/shell/app-rail.tsx #2
OLD-BEGIN

/** FIX-SCAN-1 ISSUE 4 — the glyph map now lives in category-glyphs.ts, the one
 *  allowlist the server suggester validates against; re-exported here so the
 *  console's existing imports keep working. */
export { categoryGlyph } from "@/components/shell/category-glyphs";

/** D207 — one device favourite, shared by every mounted reader. */
OLD-END
NEW-BEGIN

/** D207 — one device favourite, shared by every mounted reader. */
NEW-END
EDIT src/components/shell/app-rail.tsx #3
OLD-BEGIN
  const { t, entities } = useI18n();
  const { tree, isLoading, error } = useCategoryTree();
  const { selectedCategorySlug } = useShell();
OLD-END
NEW-BEGIN
  const { t, entities } = useI18n();
  const { tree, isLoading: treeLoading, error } = useCategoryTree();
  // D234 S1 — the glyph map arrives after the first paint; the skeleton stays until it settles.
  const glyphs = useCategoryGlyphs();
  const isLoading = treeLoading || !glyphs.settled;
  const { selectedCategorySlug } = useShell();
NEW-END
EDIT src/components/shell/app-rail.tsx #4
OLD-BEGIN
    icon: category.icon
      ? (categoryGlyphOrNull(category.icon) ?? undefined)
      : categoryIcon(category.slug),
OLD-END
NEW-BEGIN
    icon: category.icon
      ? (glyphs.glyphOf(category.icon) ?? undefined)
      : categoryIcon(category.slug),
NEW-END
C3. NEW src/components/shell/date-calendar.tsx (sha256 7eda9591438198fc510af1fcf41483899e04e9aaf46bca81d73dc241f259f7e2):
FILE-BEGIN src/components/shell/date-calendar.tsx
import type { Matcher } from "react-day-picker";

import { Calendar, CalendarDayButton } from "@/components/ui/calendar";

import { isoDay } from "./date-day";

/**
 * D234 speed turn S1 — the house date field's calendar, in its own module so
 * react-day-picker downloads only when a field opens it (date-field.tsx loads
 * this lazily). Every choice it draws is the field's: the bounds, the language's
 * month and weekday names, the labels and the day test ids.
 */
export interface DateCalendarProps {
  testid: string;
  selected: Date | undefined;
  defaultMonth: Date;
  disabled: Matcher[];
  startMonth: Date | undefined;
  endMonth: Date | undefined;
  onPick: (day: Date) => void;
  formatCaption: (month: Date) => string;
  formatWeekdayName: (day: Date) => string;
  labelNext: string;
  labelPrevious: string;
  labelDayButton: (day: Date) => string;
}

export default function DateCalendar({
  testid,
  selected,
  defaultMonth,
  disabled,
  startMonth,
  endMonth,
  onPick,
  formatCaption,
  formatWeekdayName,
  labelNext,
  labelPrevious,
  labelDayButton,
}: DateCalendarProps) {
  return (
    <Calendar
      mode="single"
      selected={selected}
      defaultMonth={defaultMonth}
      disabled={disabled}
      showOutsideDays={false}
      {...(startMonth ? { startMonth } : {})}
      {...(endMonth ? { endMonth } : {})}
      onSelect={(day) => {
        if (!day) return;
        onPick(day);
      }}
      formatters={{ formatCaption, formatWeekdayName }}
      labels={{
        labelNext: () => labelNext,
        labelPrevious: () => labelPrevious,
        labelDayButton,
      }}
      components={{
        DayButton: (props) => (
          <CalendarDayButton {...props} data-testid={`${testid}-day-${isoDay(props.day.date)}`} />
        ),
      }}
      className="rounded-md border border-border"
    />
  );
}
FILE-END src/components/shell/date-calendar.tsx
src/components/shell/date-field.tsx, these edits:
EDIT src/components/shell/date-field.tsx #1
OLD-BEGIN
import { CalendarDays, X } from "lucide-react";
import { useId, useState } from "react";
import type { Matcher } from "react-day-picker";

import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

import { isoDay, parseDay } from "./date-day";
OLD-END
NEW-BEGIN
import { CalendarDays, X } from "lucide-react";
import { useEffect, useId, useState, type JSX } from "react";
import type { Matcher } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { loadOnce } from "@/lib/load-once";
import { cn } from "@/lib/utils";

import type { DateCalendarProps } from "./date-calendar";
import { isoDay, parseDay } from "./date-day";
NEW-END
EDIT src/components/shell/date-field.tsx #2
OLD-BEGIN

export interface DateFieldProps {
OLD-END
NEW-BEGIN

/**
 * D234 speed turn S1 — the calendar (react-day-picker, 21 KiB gzipped) is
 * downloaded when a field first opens it, once per visit (src/lib/load-once.ts),
 * never with the page: the wizard, the audit log and the listings console
 * carried it on their first load. The field itself is unchanged; the box under it
 * holds its place while the calendar arrives, focusing or pressing the field
 * starts the download early, and a download that fails says so with a "Try again"
 * that asks once more — the page never breaks over it.
 */
type CalendarComponent = (props: DateCalendarProps) => JSX.Element;
const CALENDAR = loadOnce<CalendarComponent>(() =>
  import("./date-calendar").then((module) => module.default),
);
// An early start on focus or press: a failure here is answered when the field opens —
// the effect in DateField asks again, logs a failure and offers "Try again".
const startCalendar = () => {
  CALENDAR.load().catch(() => undefined);
};

export interface DateFieldProps {
NEW-END
EDIT src/components/shell/date-field.tsx #3
OLD-BEGIN
  const [open, setOpen] = useState(false);
  const locale = formatLocale(language);
OLD-END
NEW-BEGIN
  const [open, setOpen] = useState(false);
  const [Calendar, setCalendar] = useState<CalendarComponent | null>(() => CALENDAR.ready());
  const [calendarFailed, setCalendarFailed] = useState(false);
  useEffect(() => {
    if (!open || Calendar !== null || calendarFailed) return;
    let live = true;
    CALENDAR.load().then(
      (next) => {
        if (live) setCalendar(() => next);
      },
      (error: unknown) => {
        console.error("[client-error] the calendar failed to load", error);
        if (live) setCalendarFailed(true);
      },
    );
    return () => {
      live = false;
    };
  }, [open, Calendar, calendarFailed]);
  const locale = formatLocale(language);
NEW-END
EDIT src/components/shell/date-field.tsx #4
OLD-BEGIN
          onClick={() => setOpen((current) => !current)}
          className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md border border-input bg-background px-3 text-start text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
OLD-END
NEW-BEGIN
          onClick={() => setOpen((current) => !current)}
          onFocus={startCalendar}
          onPointerDown={startCalendar}
          className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md border border-input bg-background px-3 text-start text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
NEW-END
EDIT src/components/shell/date-field.tsx #5
OLD-BEGIN
        <div id={calendarId} data-testid={`${testid}-calendar`} className="min-w-0">
          <Calendar
            mode="single"
            selected={selected ?? undefined}
            defaultMonth={shown}
            disabled={disabled}
            showOutsideDays={false}
            {...(earliest ? { startMonth: firstOfMonth(earliest) } : {})}
            {...(latest ? { endMonth: firstOfMonth(latest) } : {})}
            onSelect={(day) => {
              if (!day) return;
              onChange(isoDay(day));
              setOpen(false);
            }}
            formatters={{
              formatCaption: (month) => captionLabel.format(month),
              formatWeekdayName: (day) => weekdayLabel.format(day),
            }}
            labels={{
              labelNext: () => t("prim.date.next"),
              labelPrevious: () => t("prim.date.previous"),
              labelDayButton: (day) => fullLabel.format(day),
            }}
            components={{
              DayButton: (props) => (
                <CalendarDayButton
                  {...props}
                  data-testid={`${testid}-day-${isoDay(props.day.date)}`}
                />
              ),
            }}
            className="rounded-md border border-border"
          />
        </div>
OLD-END
NEW-BEGIN
        <div id={calendarId} data-testid={`${testid}-calendar`} className="min-w-0">
          {Calendar !== null ? (
            <Calendar
              testid={testid}
              selected={selected ?? undefined}
              defaultMonth={shown}
              disabled={disabled}
              startMonth={earliest ? firstOfMonth(earliest) : undefined}
              endMonth={latest ? firstOfMonth(latest) : undefined}
              onPick={(day) => {
                onChange(isoDay(day));
                setOpen(false);
              }}
              formatCaption={(month) => captionLabel.format(month)}
              formatWeekdayName={(day) => weekdayLabel.format(day)}
              labelNext={t("prim.date.next")}
              labelPrevious={t("prim.date.previous")}
              labelDayButton={(day) => fullLabel.format(day)}
            />
          ) : (
            <div
              data-testid={`${testid}-calendar-loading`}
              className="flex h-80 items-center justify-center rounded-md border border-border"
            >
              {calendarFailed ? (
                <Button
                  type="button"
                  variant="outline"
                  size="touch"
                  data-testid={`${testid}-calendar-retry`}
                  onClick={() => setCalendarFailed(false)}
                >
                  {t("common.tryAgain")}
                </Button>
              ) : null}
            </div>
          )}
        </div>
NEW-END
src/components/shell/date-field.test.tsx, these edits (the calendar now arrives on first open, so DF-1…DF-4 wait for its days; the module is transformed once up front so the first test's wait is the field's, not the test runner's):
EDIT src/components/shell/date-field.test.tsx #1
OLD-BEGIN
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

OLD-END
NEW-BEGIN
import { useState } from "react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

NEW-END
EDIT src/components/shell/date-field.test.tsx #2
OLD-BEGIN
describe("DateField (INC-549)", () => {
  beforeEach(() => {
OLD-END
NEW-BEGIN
describe("DateField (INC-549)", () => {
  // D234 S1 — the field loads its calendar lazily; transform it once up front so
  // the first test's wait is the field's, not the test runner compiling the module.
  beforeAll(async () => {
    await import("./date-calendar");
  });
  beforeEach(() => {
NEW-END
EDIT src/components/shell/date-field.test.tsx #3
OLD-BEGIN

  it("DF-1 a day after the latest bound is disabled, and the month cannot move past it", () => {
    render(<Harness max="2026-10-11" />);
OLD-END
NEW-BEGIN

  it("DF-1 a day after the latest bound is disabled, and the month cannot move past it", async () => {
    render(<Harness max="2026-10-11" />);
NEW-END
EDIT src/components/shell/date-field.test.tsx #4
OLD-BEGIN
    expect(screen.getByTestId("df-calendar")).toBeTruthy();
    expect((screen.getByTestId("df-day-2026-10-11") as HTMLButtonElement).disabled).toBe(false);
    expect((screen.getByTestId("df-day-2026-10-12") as HTMLButtonElement).disabled).toBe(true);
OLD-END
NEW-BEGIN
    expect(screen.getByTestId("df-calendar")).toBeTruthy();
    // D234 S1 — the calendar arrives on first open (date-calendar.tsx, lazy).
    expect(((await screen.findByTestId("df-day-2026-10-11")) as HTMLButtonElement).disabled).toBe(
      false,
    );
    expect((screen.getByTestId("df-day-2026-10-12") as HTMLButtonElement).disabled).toBe(true);
NEW-END
EDIT src/components/shell/date-field.test.tsx #5
OLD-BEGIN

  it("DF-2 a day before the earliest bound is disabled, and the month cannot move before it", () => {
    render(<Harness min="2026-10-11" max="2026-11-30" />);
    fireEvent.click(screen.getByTestId("df"));
    expect((screen.getByTestId("df-day-2026-10-10") as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByTestId("df-day-2026-10-11") as HTMLButtonElement).disabled).toBe(false);
OLD-END
NEW-BEGIN

  it("DF-2 a day before the earliest bound is disabled, and the month cannot move before it", async () => {
    render(<Harness min="2026-10-11" max="2026-11-30" />);
    fireEvent.click(screen.getByTestId("df"));
    expect(((await screen.findByTestId("df-day-2026-10-10")) as HTMLButtonElement).disabled).toBe(
      true,
    );
    expect((screen.getByTestId("df-day-2026-10-11") as HTMLButtonElement).disabled).toBe(false);
NEW-END
EDIT src/components/shell/date-field.test.tsx #6
OLD-BEGIN

  it("DF-3 choosing a day writes it as YYYY-MM-DD, shows it and closes the calendar; clear empties it", () => {
    const onChange = vi.fn();
OLD-END
NEW-BEGIN

  it("DF-3 choosing a day writes it as YYYY-MM-DD, shows it and closes the calendar; clear empties it", async () => {
    const onChange = vi.fn();
NEW-END
EDIT src/components/shell/date-field.test.tsx #7
OLD-BEGIN
    fireEvent.click(screen.getByTestId("df"));
    fireEvent.click(screen.getByTestId("df-day-2026-10-09"));
    expect(onChange).toHaveBeenLastCalledWith("2026-10-09");
OLD-END
NEW-BEGIN
    fireEvent.click(screen.getByTestId("df"));
    fireEvent.click(await screen.findByTestId("df-day-2026-10-09"));
    expect(onChange).toHaveBeenLastCalledWith("2026-10-09");
NEW-END
EDIT src/components/shell/date-field.test.tsx #8
OLD-BEGIN

  it("DF-4 the month is named in the page's language", () => {
    language.current = "am";
OLD-END
NEW-BEGIN

  it("DF-4 the month is named in the page's language", async () => {
    language.current = "am";
NEW-END
EDIT src/components/shell/date-field.test.tsx #9
OLD-BEGIN
    fireEvent.click(screen.getByTestId("df"));
    const month = new Intl.DateTimeFormat("am-ET", { month: "long", year: "numeric" }).format(
OLD-END
NEW-BEGIN
    fireEvent.click(screen.getByTestId("df"));
    await screen.findByTestId("df-day-2026-10-09");
    const month = new Intl.DateTimeFormat("am-ET", { month: "long", year: "numeric" }).format(
NEW-END
NEW src/components/shell/date-field-offline.test.tsx (sha256 940d2d5670e036dc3225ecf8b0acfc0050192532d794bc3d51d3d77be2bf61e3):
FILE-BEGIN src/components/shell/date-field-offline.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * D234 speed turn S1 — the date field downloads its calendar on first open; a
 * download that fails says so with "Try again", which asks once more. The page
 * never breaks over it.
 */
let attempts = 0;
vi.mock("./date-calendar", () => {
  attempts += 1;
  throw new Error("offline");
});
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));

const { DateField } = await import("./date-field");

describe("DateField offline (D234)", () => {
  it("DF-6 a calendar that cannot download offers Try again, which asks once more", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(<DateField testid="df" value="" onChange={() => undefined} />);
    fireEvent.click(screen.getByTestId("df"));
    const retry = await screen.findByTestId("df-calendar-retry");
    expect(retry.textContent).toBe("common.tryAgain");
    expect(screen.queryByTestId("df-day-2026-10-11")).toBeNull();
    const before = attempts;
    fireEvent.click(retry);
    expect(await screen.findByTestId("df-calendar-retry")).toBeTruthy();
    expect(attempts).toBeGreaterThan(before);
    expect(errors).toHaveBeenCalledWith(
      "[client-error] the calendar failed to load",
      expect.anything(),
    );
    errors.mockRestore();
  });
});
FILE-END src/components/shell/date-field-offline.test.tsx
C4. src/features/posting/map/leaflet.ts, these edits:
EDIT src/features/posting/map/leaflet.ts #1
OLD-BEGIN

import { callRoute } from "@/lib/route-client";
OLD-END
NEW-BEGIN

import { loadOnce } from "@/lib/load-once";
import { callRoute } from "@/lib/route-client";
NEW-END
EDIT src/features/posting/map/leaflet.ts #2
OLD-BEGIN

let loaded: Promise<LeafletModule> | null = null;

OLD-END
NEW-BEGIN

// D234 S1 — once per visit (src/lib/load-once.ts); a failed download is retried by
// the next map that asks, never kept as a rejection for the rest of the visit.
const LEAFLET = loadOnce(async () => {
  await import("leaflet/dist/leaflet.css");
  const mod = (await import("leaflet")) as unknown as {
    default?: LeafletModule;
  } & LeafletModule;
  return mod.default ?? mod;
});

NEW-END
EDIT src/features/posting/map/leaflet.ts #3
OLD-BEGIN
  }
  loaded ??= (async () => {
    await import("leaflet/dist/leaflet.css");
    const mod = (await import("leaflet")) as unknown as {
      default?: LeafletModule;
    } & LeafletModule;
    return mod.default ?? mod;
  })();
  return loaded;
}
OLD-END
NEW-BEGIN
  }
  return LEAFLET.load();
}
NEW-END
src/features/posting/phone-parse.ts, these edits:
EDIT src/features/posting/phone-parse.ts #1
OLD-BEGIN
 */
import { CALLING_CODES } from "./calling-codes";
OLD-END
NEW-BEGIN
 */
import { loadOnce } from "@/lib/load-once";

import { CALLING_CODES } from "./calling-codes";
NEW-END
EDIT src/features/posting/phone-parse.ts #2
OLD-BEGIN

let pending: Promise<PhoneLib> | null = null;

/** The one dynamic import; a failure clears the cache so a retry can try again. */
export function loadPhoneLib(): Promise<PhoneLib> {
  if (pending === null) {
    pending = import("libphonenumber-js/min").then(
      (module) => module as unknown as PhoneLib,
      (error: unknown) => {
        pending = null;
        throw error;
      },
    );
  }
  return pending;
}
OLD-END
NEW-BEGIN

/**
 * The one dynamic import, once per visit; a failure is forgotten so a retry can
 * try again (src/lib/load-once.ts — D234 S1).
 */
const PHONE_LIB = loadOnce(() =>
  import("libphonenumber-js/min").then((module) => module as unknown as PhoneLib),
);

export function loadPhoneLib(): Promise<PhoneLib> {
  return PHONE_LIB.load();
}
NEW-END
C5. NEW scripts/conformance/on-demand-imports.test.ts (sha256 81f1ac18b99181e320a0a1dac8784a8d3dd1e404e2e1133b3589c5e65943eab1):
FILE-BEGIN scripts/conformance/on-demand-imports.test.ts
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * D234 speed turn S1 (INC-897) — every module the browser fetches on demand is
 * fetched through `loadOnce` (src/lib/load-once.ts): once per visit, a failed
 * download retried by the next ask and answered on screen, never a crashed page
 * (a failed React.lazy chunk throws to the route's error boundary). The census
 * reads every dynamic `import(` in the browser's code; one inside a `loadOnce(`
 * call passes, any other needs its allowlist line (key | reason | until).
 * Server-only imports (src/server/, server routes, *.server.ts and the server
 * modules a server function loads) never run in the browser and are not read.
 */
const SERVER_SPECIFIER =
  /^(?:@\/server\/|\.\.?\/(?:\.\.\/)*server\/|@\/integrations\/supabase\/client\.server$)/;

type Finding = { file: string; line: number; what: string };

function insideLoadOnce(node: ts.Node): boolean {
  for (let parent = node.parent; parent !== undefined; parent = parent.parent) {
    if (
      ts.isCallExpression(parent) &&
      ts.isIdentifier(parent.expression) &&
      parent.expression.text === "loadOnce"
    )
      return true;
  }
  return false;
}

export function onDemandImports(files: string[]): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (!ts.isCallExpression(node) || node.expression.kind !== ts.SyntaxKind.ImportKeyword)
        return;
      const specifier = node.arguments[0];
      if (specifier && ts.isStringLiteral(specifier) && SERVER_SPECIFIER.test(specifier.text))
        return;
      if (insideLoadOnce(node)) return;
      found.push({
        file,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: "fetches a module on demand outside loadOnce",
      });
    });
  }
  return found;
}

const domain = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src\/(?:server\/|server\.ts$|routes\/api\/|.*\.server\.ts$)/,
});
const census = onDemandImports(domain);
const ALLOWLIST = "scripts/conformance/on-demand-imports-allowlist.txt";
const allowances = readAllowlist(
  ALLOWLIST,
  census.map((hit) => hit.file),
);

describe("on-demand module loading (D234, INC-897)", () => {
  it(
    "OD-1 every browser on-demand import goes through loadOnce or has a live allowance",
    () => {
      console.log(
        `[OD-1] on-demand imports outside loadOnce: ${census.length}; allowlist: ${allowances.size}`,
      );
      expect(report(census.filter((hit) => !allowances.has(hit.file)))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("OD-2 the census sees a planted bypass and passes a planted loadOnce", () => {
    const dir = "node_modules/.cache/on-demand-imports";
    mkdirSync(dir, { recursive: true });
    const bad = `${dir}/od-bad.tsx`;
    const good = `${dir}/od-good.ts`;
    try {
      writeFileSync(
        bad,
        'import { lazy } from "react";\nconst Map = lazy(() => import("./map"));\n',
      );
      writeFileSync(
        good,
        'import { loadOnce } from "@/lib/load-once";\nconst MAP = loadOnce(() => import("./map"));\nconst s = () => import("@/server/x");\n',
      );
      expect(report(onDemandImports([bad, good]))).toBe(
        `${bad}:2 fetches a module on demand outside loadOnce`,
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("OD-3 the bypasses still to move are the ones INC-897 names, and their number only falls", () => {
    const toMove = [...allowances.values()].filter((allowance) => allowance.until === "INC-897");
    expect(toMove.length).toBeLessThanOrEqual(4);
    expect(readFileSync(ALLOWLIST, "utf8")).toContain("INC-897");
  });
});
FILE-END scripts/conformance/on-demand-imports.test.ts
NEW scripts/conformance/on-demand-imports-allowlist.txt (sha256 2bc9dff347cf320a5a79cf2c6d713f119eef49f48e56256f2527d1e37eac2bf8):
FILE-BEGIN scripts/conformance/on-demand-imports-allowlist.txt
# D234 speed turn S1 (INC-897): a browser module fetched on demand outside loadOnce (src/lib/load-once.ts). <path> | <reason> | <until>
src/components/shell/breadcrumbs.tsx | React.lazy crumbs: a failed chunk reaches the route's error boundary | INC-897
src/features/posting/preview/listing-detail.tsx | React.lazy map components and a map prefetch: a failed chunk reaches the route's error boundary | INC-897
src/features/posting/step-where.tsx | React.lazy map components in the wizard: a failed chunk reaches the route's error boundary | INC-897
src/i18n/compiled-catalog.ts | the catalogue layers' loaders, each read by the language provider | INC-897
src/features/admin-categories/category-images-service.ts | staff-only image variants, awaited inside the upload that reports its own failure | 2027-04-25
src/routes/legal.publishing.tsx | a route loader's data module: a failed download is the route's own error screen | 2027-04-25
src/routes/post_.$listingId.tsx | a route guard's door module: a failed download is the route's own error screen | 2027-04-25
FILE-END scripts/conformance/on-demand-imports-allowlist.txt

PART D — BELOW-THE-FOLD WORK WAITS FOR ITS PLACE (CONCERN 3).
D1. NEW src/lib/use-near-viewport.ts (sha256 f261c663507dc9af49ca23d7e15d6ef7eb36268e69846e477110f9e84cb188c8):
FILE-BEGIN src/lib/use-near-viewport.ts
import { useEffect, useState, type RefObject } from "react";

/**
 * D234 speed turn S1 — BELOW-THE-FOLD WORK STARTS WHEN ITS PLACE NEARS THE SCREEN.
 *
 * A part of a public page that a visitor may never scroll to (the ad page's map,
 * its similar ads) downloads nothing — no library, no read, no picture — until
 * its box comes within `margin` of the screen; then it latches true and stays
 * true. On a phone on a slow network this keeps those bytes and round trips off
 * the page's first seconds, and off the bill of a visitor who leaves first.
 *
 * `enabled: false` answers true at once (a surface that wants its work now, such
 * as the seller's own preview inside the wizard). Without IntersectionObserver
 * (very old browsers) it answers true at once: the work is never lost, only
 * early. The server render and the hydrating render both start from the same
 * answer (false when enabled), so hydration never differs.
 */
export const NEAR_VIEWPORT_MARGIN = "400px";

export function useNearViewport(
  ref: RefObject<Element | null>,
  { enabled = true, margin = NEAR_VIEWPORT_MARGIN }: { enabled?: boolean; margin?: string } = {},
): boolean {
  const [near, setNear] = useState(!enabled);
  useEffect(() => {
    if (near) return;
    if (!enabled) {
      setNear(true);
      return;
    }
    const box = ref.current;
    if (box === null) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${margin} 0px ${margin} 0px` },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, [near, enabled, margin, ref]);
  return near;
}
FILE-END src/lib/use-near-viewport.ts
NEW src/lib/use-near-viewport.test.tsx (sha256 b68f0ebce566b9126d5e9e7a1438e9aacda38a31ad1f717dcb417c562214d8ad):
FILE-BEGIN src/lib/use-near-viewport.test.tsx
import { act, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useNearViewport } from "./use-near-viewport";

/**
 * D234 speed turn S1 — below-the-fold work starts when its place nears the screen.
 */
function Probe({ enabled }: { enabled?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const near = useNearViewport(ref, enabled === undefined ? {} : { enabled });
  return <div ref={ref} data-testid="probe" data-near={String(near)} />;
}

const near = () => screen.getByTestId("probe").getAttribute("data-near");

describe("useNearViewport (D234)", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("NV-1 waits until its box nears the screen, then stays true and stops watching", () => {
    const notify: Array<(entries: Array<{ isIntersecting: boolean }>) => void> = [];
    const disconnect = vi.fn();
    const margins: string[] = [];
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(
          callback: (entries: Array<{ isIntersecting: boolean }>) => void,
          options: { rootMargin: string },
        ) {
          notify.push(callback);
          margins.push(options.rootMargin);
        }
        observe() {}
        disconnect = disconnect;
      },
    );
    render(<Probe />);
    expect(near()).toBe("false");
    expect(margins).toEqual(["400px 0px 400px 0px"]);
    act(() => notify[0]([{ isIntersecting: false }]));
    expect(near()).toBe("false");
    act(() => notify[0]([{ isIntersecting: true }]));
    expect(near()).toBe("true");
    expect(disconnect).toHaveBeenCalled();
  });

  it("NV-2 a surface that wants its work now (enabled: false) answers true at once", () => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {
          throw new Error("must not watch");
        }
        disconnect() {}
      },
    );
    render(<Probe enabled={false} />);
    expect(near()).toBe("true");
  });

  it("NV-3 without IntersectionObserver the work is never lost, only early", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Probe />);
    expect(near()).toBe("true");
  });
});
FILE-END src/lib/use-near-viewport.test.tsx
D2. src/features/posting/map/map-preview.tsx, these edits:
EDIT src/features/posting/map/map-preview.tsx #1
OLD-BEGIN
import { useI18n } from "@/i18n";

OLD-END
NEW-BEGIN
import { useI18n } from "@/i18n";
import { useNearViewport } from "@/lib/use-near-viewport";

NEW-END
EDIT src/features/posting/map/map-preview.tsx #2
OLD-BEGIN
  const [credit, setCredit] = useState("");

OLD-END
NEW-BEGIN
  const [credit, setCredit] = useState("");
  // D234 S1 — on the buyer's ad page the map's library, tile plan and tiles wait until
  // the box nears the screen; the seller's preview in the wizard draws at once.
  const near = useNearViewport(boxRef, { enabled: audience === "buyer" });

NEW-END
EDIT src/features/posting/map/map-preview.tsx #3
OLD-BEGIN
    const box = boxRef.current;
    if (box === null) return;
    let cancelled = false;
OLD-END
NEW-BEGIN
    const box = boxRef.current;
    if (box === null || !near) return;
    let cancelled = false;
NEW-END
EDIT src/features/posting/map/map-preview.tsx #4
OLD-BEGIN
    };
  }, [lat, lng, approx, zoom]);

OLD-END
NEW-BEGIN
    };
  }, [lat, lng, approx, zoom, near]);

NEW-END
D3. src/features/ad-page/similar-ads.tsx becomes exactly (sha256 4324d40b4cce1e859f9c92f631416b252fc62cdc70e5faff429d740335360fbd):
FILE-BEGIN src/features/ad-page/similar-ads.tsx
import { useEffect, useRef, useState } from "react";

import { ListingCard } from "@/components/marketplace/listing-card";
import { PageCard } from "@/components/shell/page-card";
import { similarListings } from "@/features/ad-page/similar";
import type { FeedListing } from "@/features/feed/feed-page";
import type { PhotoLinks } from "@/features/posting/photo-links";
import { useCardPhotos } from "@/features/feed/use-card-photos";
import { useI18n } from "@/i18n";
import { useNearViewport } from "@/lib/use-near-viewport";

/**
 * D201 §12 — the similar-ads section of the buyer's page. It reads once after
 * the first client render (never during SSR); while loading or when the answer
 * is empty it draws nothing at all — INC-704: the card frame is drawn here,
 * only with cards, so a live ad never shows an empty framed box under it. The
 * cards are the feed's own (src/components/marketplace/feed.tsx): two columns
 * at 360 (D201 §5), three from 640.
 *
 * D234 speed turn S1 — the read (and the card photos after it) waits until the
 * section's place nears the screen: a buyer who never scrolls down downloads
 * none of it. The place is an empty anchor that is always drawn; its
 * `data-similar` says "waiting", "empty" or "shown", so a test can scroll to it
 * and know the read has answered (AP-32).
 */
export function SimilarAds({
  categoryId,
  placeId,
  excludeId,
}: {
  categoryId: string;
  placeId: string | null;
  excludeId: string;
}) {
  const { t } = useI18n();
  const [cards, setCards] = useState<FeedListing[] | null>(null);
  const [coverLinks, setCoverLinks] = useState<PhotoLinks>({});
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const near = useNearViewport(anchorRef);
  useEffect(() => {
    if (!near) return;
    let active = true;
    void similarListings(categoryId, placeId, excludeId).then((answer) => {
      if (active) {
        setCards(answer.cards);
        setCoverLinks(answer.coverLinks);
      }
    });
    return () => {
      active = false;
    };
  }, [categoryId, placeId, excludeId, near]);
  // DEC-195 — the answer's own links are the preset; only the rest are asked for.
  const coverOf = useCardPhotos(cards ?? [], coverLinks);
  const anchor = (
    <div
      ref={anchorRef}
      aria-hidden="true"
      className="h-px"
      data-testid="listing-similar-anchor"
      data-similar={cards === null ? "waiting" : cards.length === 0 ? "empty" : "shown"}
    />
  );
  if (cards === null || cards.length === 0) return anchor;
  return (
    <>
      {anchor}
      <PageCard className="mt-6 min-w-0">
        <section data-testid="listing-similar" aria-labelledby="listing-similar-title">
          <h2 id="listing-similar-title" className="mb-3 text-base font-semibold text-foreground">
            {t("adPage.similar.title")}
          </h2>
          <ul className="grid auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
            {cards.map((listing, index) => (
              <li
                key={listing.id}
                className={
                  index >= 8 ? "hidden lg:block" : index >= 6 ? "hidden sm:block" : undefined
                }
              >
                {/* DEC-195 — below the fold: the cover links arrive with the
                  answer, but no load priority. */}
                <ListingCard listing={listing} photoUrl={coverOf(listing.coverPhotoId)} />
              </li>
            ))}
          </ul>
        </section>
      </PageCard>
    </>
  );
}
FILE-END src/features/ad-page/similar-ads.tsx
src/features/ad-page/similar-ads.test.tsx, these edits (the last one appends SIM-5; land them BEFORE the similar-ads.tsx change above, for the red-first run):
EDIT src/features/ad-page/similar-ads.test.tsx #1
OLD-BEGIN
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

OLD-END
NEW-BEGIN
import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

NEW-END
EDIT src/features/ad-page/similar-ads.test.tsx #2
OLD-BEGIN
    );
    const { container, rerender } = render(<SimilarAds {...props} />);
    // INC-704: while loading the container holds no element at all (no frame).
    expect(container.firstElementChild).toBeNull();
    resolve({ cards: [], coverLinks: {} });
    await waitFor(() => expect(similarListings).toHaveBeenCalledTimes(1));
    rerender(<SimilarAds {...props} />);
    await waitFor(() => expect(container.firstElementChild).toBeNull());
    expect(container.textContent).toBe("");
  });
OLD-END
NEW-BEGIN
    );
    const { container, rerender } = render(<SimilarAds {...props} />);
    // INC-704: while loading the container holds no frame and no text — only the
    // section's 1px anchor (D234 S1), which says the read has not answered.
    const anchor = screen.getByTestId("listing-similar-anchor");
    expect(container.children).toHaveLength(1);
    expect(anchor.getAttribute("data-similar")).toBe("waiting");
    expect(container.querySelector(".rounded-card")).toBeNull();
    resolve({ cards: [], coverLinks: {} });
    await waitFor(() => expect(similarListings).toHaveBeenCalledTimes(1));
    rerender(<SimilarAds {...props} />);
    await waitFor(() =>
      expect(screen.getByTestId("listing-similar-anchor").getAttribute("data-similar")).toBe(
        "empty",
      ),
    );
    expect(container.children).toHaveLength(1);
    expect(container.querySelector(".rounded-card")).toBeNull();
    expect(container.textContent).toBe("");
  });
NEW-END
EDIT src/features/ad-page/similar-ads.test.tsx #3
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });
});

/**
 * D234 speed turn S1 — the read waits until the section's place nears the screen
 * (src/lib/use-near-viewport.ts): a buyer who never scrolls down downloads none of it.
 */
describe("SIM-5 the similar-ads read waits for its place to near the screen", () => {
  it("reads nothing until the anchor nears the screen, then reads once", async () => {
    const observers: Array<(entries: Array<{ isIntersecting: boolean }>) => void> = [];
    class FakeObserver {
      constructor(callback: (entries: Array<{ isIntersecting: boolean }>) => void) {
        observers.push(callback);
      }
      observe() {}
      disconnect() {}
    }
    vi.stubGlobal("IntersectionObserver", FakeObserver);
    try {
      similarListings.mockReset();
      similarListings.mockResolvedValue({ cards: [card("l-1")], coverLinks: {} });
      render(<SimilarAds {...props} />);
      await new Promise((done) => setTimeout(done, 20));
      expect(similarListings).not.toHaveBeenCalled();
      expect(screen.getByTestId("listing-similar-anchor").getAttribute("data-similar")).toBe(
        "waiting",
      );
      act(() => {
        for (const notify of observers) notify([{ isIntersecting: true }]);
      });
      expect(await screen.findByTestId("listing-similar")).toBeTruthy();
      expect(similarListings).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId("listing-similar-anchor").getAttribute("data-similar")).toBe(
        "shown",
      );
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
NEW-END
D4. e2e/ad-page.spec.ts, AP-32 only, these edits (the section reads when its place nears the screen: the test scrolls there, as a buyer does, and waits for the read's answer; on a sold ad it proves the section is not mounted at all):
EDIT e2e/ad-page.spec.ts #1
OLD-BEGIN
    await expect(page.getByTestId("listing-detail-title")).toHaveText(X.title);
    const section = page.getByTestId("listing-similar");
    await expect(section).toBeVisible({ timeout: 15000 });
    const hrefs = await section
OLD-END
NEW-BEGIN
    await expect(page.getByTestId("listing-detail-title")).toHaveText(X.title);
    // D234 S1 — the section reads when its place nears the screen: scroll there, as a buyer does.
    const anchor = page.getByTestId("listing-similar-anchor");
    await anchor.scrollIntoViewIfNeeded();
    await expect(anchor).toHaveAttribute("data-similar", "shown", { timeout: 15000 });
    const section = page.getByTestId("listing-similar");
    await expect(section).toBeVisible();
    const hrefs = await section
NEW-END
EDIT e2e/ad-page.spec.ts #2
OLD-BEGIN
    await expect(page.getByTestId("listing-detail-title")).toHaveText(X.title);
    await expect(page.getByTestId("listing-similar")).toHaveCount(0);
OLD-END
NEW-BEGIN
    await expect(page.getByTestId("listing-detail-title")).toHaveText(X.title);
    // A sold ad mounts no similar-ads section at all: not even its anchor.
    await expect(page.getByTestId("listing-similar-anchor")).toHaveCount(0);
    await expect(page.getByTestId("listing-similar")).toHaveCount(0);
NEW-END

PART E — THE POSTING DOORS OFF THE AD PAGE (CONCERN 1; INC-895).
E1. NEW src/features/posting/schema-shape.ts (sha256 c180f620d122eb3ef0bf50a111531122d3366bfb67988500bfa8782e52cb19a8): the header below, then lines 816–875 of src/features/posting/posting-service.ts as it is at BASE (from `function str(` through the closing brace of `shapeDeal`), one blank line, then lines 906–953 (from the `/**` above `export function shapePostingSchema` through its closing brace), and a final newline — the code moves unchanged; copy those lines with a read-only command (for example `sed -n '816,875p'` of the file at BASE) before E2 edits the file:
HEADER-BEGIN src/features/posting/schema-shape.ts
import type { AttrDef, PostingSchema } from "./posting-service";
import type { CategoryFacts } from "./types";
import { shapeCondition } from "./visible-when";

/**
 * D234 speed turn S1 — THE PURE SHAPERS of the posting schema and the deal block,
 * moved out of posting-service.ts unchanged so a page that only SHAPES a public
 * read (the ad page's public-listing.ts) never downloads the posting doors, the
 * Supabase client calls and reader-failure with them. posting-service.ts
 * re-exports both names, so every other importer is unchanged.
 */
HEADER-END src/features/posting/schema-shape.ts
E2. src/features/posting/posting-service.ts: take out the lines that E1 moved — from the line `function str(row: Record<string, unknown>, key: string): string | null {` (:816 at BASE) through the closing brace of `shapeDeal` (:875), with the one blank line after it (:876); and from the `/**` (:906) that opens the comment whose second line begins ` * K5 — a payload without its question list` through the closing brace of `shapePostingSchema` (:953), with the one blank line after it (:954) — then this import edit:
EDIT src/features/posting/posting-service.ts #1
OLD-BEGIN
import type { CategoryFacts, DoorAnswer, Refusal } from "./types";
import { shapeCondition, type VisibleWhen } from "./visible-when";
import type { PlaceFact } from "./where-seed";

/**
OLD-END
NEW-BEGIN
import type { CategoryFacts, DoorAnswer, Refusal } from "./types";
import type { VisibleWhen } from "./visible-when";
import { shapePostingSchema } from "./schema-shape";
import type { PlaceFact } from "./where-seed";

// D234 speed turn S1 — the pure shapers live in schema-shape.ts; re-exported for every caller.
export { shapeDeal, shapePostingSchema } from "./schema-shape";

/**
NEW-END
The file then prints sha256 e0293082dc89dbc0d747fd62be28b92b6307e641a8087bccb1b77fa61ed73451.
E3. src/features/ad-page/public-listing.ts:
EDIT src/features/ad-page/public-listing.ts #1
OLD-BEGIN
import { shapeDeal, shapePostingSchema } from "@/features/posting/posting-service";
OLD-END
NEW-BEGIN
import { shapeDeal, shapePostingSchema } from "@/features/posting/schema-shape";
NEW-END

PART F — DOCS.
F1. docs/features/performance-strategy.md: a new section at the end, "## 7. Every page's first download (D234, Foundations turn 24)": the per-page guard (what it reads — the route manifest's modulepreload lists along the parent chain, then the static import closure; what fails — no line, stale line, over, 8 KiB or more under, a public page holding a PUBLIC_MUST_STAY_LAZY prefix), where the ceilings live (scripts/route-budgets.mjs, the measured download + 3 KiB rounded up, a ratchet), the four moves of this turn with the before → after numbers of the FIVE LENSES' performance line, loadOnce and useNearViewport in one sentence each, and "next: the ad page's LCP (photo links in the loader, fetchpriority, category pictures as WebP), the font decision, edge caching (a DEC), INC-897".
F2. docs/features/ci-guards.md: a new section at the end, "## D234 — every page's first download (Foundations turn 24)": the bundle-budget job's script now judges every page of the build's route manifest against scripts/route-budgets.mjs (the five failure kinds, BC-6…BC-12), and the on-demand import census (OD-1…OD-3, its allowlist).
F3. docs/governance/mechanisms.md: three NEW rows directly after row 39 (the row that begins "| 39 | How fast a page is on a low-end phone"), exactly these lines:
   | 40 | What a page downloads before it can run stays under that page's ceiling; heavy feature modules never reach a public page's first download (D234) | `scripts/check-bundle-size.mjs` + `scripts/bundle-closure.mjs` (route manifest → modulepreload chain → static closure); ceilings in `scripts/route-budgets.mjs` | the bundle-budget CI job; BC-1…BC-12 (`scripts/bundle-closure.test.ts`) | none | a new page is one line (a page without one fails); a new heavy feature is one prefix in `PUBLIC_MUST_STAY_LAZY` | Foundations turn 24 (INC-895, INC-896) |
   | 41 | A module a page fetches on demand is fetched once per visit, and a failed download never breaks the page (INC-897) | `loadOnce` (`src/lib/load-once.ts`); consumers: `useCategoryGlyphs`, the date field's calendar, `loadLeaflet`, `loadPhoneLib` | `scripts/conformance/on-demand-imports.test.ts` (OD-1…OD-3) | `scripts/conformance/on-demand-imports-allowlist.txt` (the React.lazy sites and the catalogue loaders until INC-897; three dated) | any module, any screen | Foundations turn 24 |
   | 42 | Below-the-fold work on a public page starts when its place nears the screen (D234) | `useNearViewport` (`src/lib/use-near-viewport.ts`); consumers: the buyer's map preview, the similar ads | NONE YET (guard debt: not readable by shape; K2 lists the effects) | the seller's own map preview draws at once | any below-the-fold block, by one hook call | Foundations turn 24 |
F4. AGENTS.md: directly after the line that begins "- Guards: a guard is a scripts/conformance census", add exactly this one line (351 bytes with its newline; AGENTS.md then counts 6224 bytes by `wc -c AGENTS.md`):
- Speed (D234): each page's first-download ceiling lives in scripts/route-budgets.mjs; on-demand modules via `loadOnce` (src/lib/load-once.ts), below-the-fold work via `useNearViewport` (src/lib/use-near-viewport.ts); glyphs via `useCategoryGlyphs`; the calendar (date-calendar.tsx) and schema shapers (posting/schema-shape.ts) stay off public pages.
F5. docs/_changelog.md one entry "Foundations turn 24 (2026-10-25)"; roadmap.md the turn-24 line `[x]` with the final HEAD and the unit totals.

THE CHECKS (in this order): paste the sha256sum of every file this brief gives a sha256 for, and of these edited files, which then print exactly:
1f3a1f00bf78e788859db5e942031a6f092f04211713ff92763dbec816b43a9c  scripts/bundle-closure.mjs
a2427749035fcd39f768eba4b7419fa9a086e55d6318859c67df76a093cce928  scripts/bundle-closure.test.ts
e502b585ec2220e48c780f655771ea84f92bb07093aa5d5ed2062edb49e12d5b  scripts/check-bundle-size.mjs
6077ca620ac4118523a2df37be26880bd5a0b1da261123653913c971ed04da20  scripts/conformance/kit-adoption-allowlist.txt
39ea0301e101dcadb46ac479c177ec28d4810e7c549184a3607643295703abdb  src/components/shell/app-rail.tsx
78d73379f9fc3e2d5a3f305060a3b1f38be4e928a42e47c4f8b422c11f0441ae  src/components/shell/date-field.tsx
dd71e90abb9b8cda1b0038b932cf058c6201455dc6b9d84a215d0328ce66fba8  src/components/shell/date-field.test.tsx
8105a207972b2f711e55c2382303e8eb15e548548d3f1a31576816e4e8132782  src/features/posting/map/map-preview.tsx
2cb134d47a85b5d316a33bdaaded56341923af17cd0cb28d70d89b88e4f07928  src/features/posting/map/leaflet.ts
33c22fa673c99d3a976ef36dbbd0dfddab4b4dd23dc650e716ccad8186a9dffa  src/features/posting/phone-parse.ts
ac755e96fceae04130ca2f26ddc99f631987235c56f6125a7f5c150c85438ec1  src/features/ad-page/public-listing.ts
ff65e6f02f5d9474e9cd3cada57d61c93a1687fe13c65fb54c5bce3b36ed78ff  src/features/ad-page/similar-ads.test.tsx
34cfa4edc49cd1e66ae48304f964540f059ed983b963a38ce38988f7b61db8c5  e2e/ad-page.spec.ts
952e3ca29079ff3006d1a790b5466e9ce60562a12facc169aeb88572ce3534b9  AGENTS.md
(each must equal the brief's; a difference is fixed by re-copying, never by editing the expectation); `bun run lint` (paste the error and warning counts; expected 0 errors, 39 warnings — the re-export that left app-rail.tsx carried one); `bun run test:unit` (paste totals and the BC-, OD-, LO-, NV-, GLY-, DF- and SIM- lines); /tmp/observability/build-errors.log read; `bun run i18n:usage` (expected: no change); `bun run format:check` last.

THE END-TO-END CHECK (through `bun run e2e:local -- <spec file> --grep "<pattern>"`, never plain `playwright test`; both projects, 0 retries, fake mode, within the ceiling — CI runs every test): e2e/ad-page.spec.ts by `--grep "AP-32 |AP-39 |AP-43 |AP-44 "` (similar ads, the map, the map's words, the bars over a pinned ad); e2e/shell.spec.ts by `--grep "leading icon on one gutter|DISTINCT icons|collapses to icons"` (the rail's glyphs); e2e/admin-audit.spec.ts by `--grep "AS-3 "` (a date field's calendar); paste every count line.

THE COMPLETION REPORT (docs/governance/reports/foundations-turn-24.report.md, and its summary in chat): the file list from `git diff --name-only <START>` (plus `git ls-files` for each new file); done or not done by part and step; every sha256 line of THE CHECKS; the red-first lines for SIM-4, SIM-5 and OD-1; the K2 lists (file:line); the first six lines of ci-status.md for the last commit you can read; every departure with its reason. THE CI WAIT REPORT: after the final commit, END THE TURN; the supervisor reads the run (its bundle-budget job prints every page's line).
```
