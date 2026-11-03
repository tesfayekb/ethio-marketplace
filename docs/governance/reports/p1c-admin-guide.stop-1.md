STOP — p1c-admin-guide turn (a): the `guide` layer moves every public page by 0.13 KiB, and the entry's ceiling lives outside SCOPE
DONE: turn (a) whole — parts A (the Guide mechanism, the `guide` strings layer), B (the Monetisation
order strip, the console by product, the two sections deleted and declared), C (CF-GUIDE-1, T10, the
guides spec, the Monetisation spec re-pointed), D (docs, register rows 104–106, the usage maps), E
(the browser walk's two fixes and their budgets); the Amharic of `~/Downloads/p1c-am-strings-a.md`
(sha256 `3bbd435b…cfe4f8` compared) copied by key; both specs green locally, whole, both projects,
0 retries; the laws green but NH-6 (macOS, pre-existing on the base); `bun run checks` whole on the
final tree (its lines below); the self-review (its last line ends this file)
LEFT: the pull request's CI; the final report (rule 60) after the ruling below; turn (b) and turn (c)
(not this turn's)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `71107be62b0340efa3d7a7b924c1886fe0ec2d6c` (short `71107be`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-03T15:38:09Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41662230025
FILES: 60 (`git diff --no-renames --name-status 917cbe4fa`; 22 added, 2 deleted, 36 changed):
docs/_changelog.md
docs/features/admin-guide.md (A)
docs/features/display-primitives.md
docs/features/plans.md
docs/generated/i18n-usage.json
docs/governance/mechanisms.md
docs/tracking/intentional-deletions.txt
e2e/admin-guides.spec.ts (A)
e2e/admin-monetisation.spec.ts
public/i18n-usage.json
roadmap.md
scripts/admin-tables.test.ts
scripts/admin-tables.ts
scripts/conformance/admin-guides-allowlist.txt (A)
scripts/conformance/admin-guides.test.ts (A)
scripts/conformance/admin-guides.ts (A)
scripts/conformance/holds-its-box-allowlist.txt
scripts/conformance/strings-layers.ts
scripts/conformance/wired.test.ts
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/shell/block-guide-sheet.tsx (A)
src/components/shell/block-guide.test.tsx (A)
src/components/shell/block-guide.tsx (A)
src/components/shell/data-table.test.tsx
src/components/shell/data-table.tsx
src/components/shell/order-strip.test.tsx (A)
src/components/shell/order-strip.tsx (A)
src/components/shell/strings-layer-gate.test.tsx
src/components/shell/strings-layer-gate.tsx
src/components/shell/table-actions.tsx
src/components/shell/table-toolbar.tsx
src/components/shell/use-drawn-twin.ts (A)
src/features/admin-monetisation/caps-section.tsx
src/features/admin-monetisation/level-overrides-table.tsx (A)
src/features/admin-monetisation/markets-section.tsx
src/features/admin-monetisation/monetisation-order.test.ts (A)
src/features/admin-monetisation/monetisation-order.ts (A)
src/features/admin-monetisation/monetisation-page.test.tsx (A)
src/features/admin-monetisation/monetisation-page.tsx
src/features/admin-monetisation/override-dialog.tsx
src/features/admin-monetisation/overrides-section.tsx (D, declared)
src/features/admin-monetisation/price-dialog.tsx
src/features/admin-monetisation/prices-section.tsx (D, declared)
src/features/admin-monetisation/product-details.tsx (A)
src/features/admin-monetisation/product-name-toggle.tsx (A)
src/features/admin-monetisation/product-prices-table.tsx (A)
src/features/admin-monetisation/products-section.tsx
src/features/admin/guide-next.test.ts (A)
src/features/admin/guide-next.ts (A)
src/i18n/compiled-catalog.ts
src/i18n/compiled-layer-loader.test.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/am-guide.ts (A)
src/i18n/locales/am-member.ts
src/i18n/locales/am.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-guide.ts (A)
src/i18n/locales/en-member.ts
src/i18n/locales/en.ts

## The question

The ruling (budgets): "nothing public moves (a public growth above 0.1 KiB or without a cause is a
STOP)". The brief's performance lens: "nothing public moves". Measured against the base 917cbe4fa
(`bun run build && node scripts/check-bundle-size.mjs`, the same machine, both trees):

- Every page grows by **0.13 KiB gz**: the `guide` layer's two loaders registered in the compiled
  catalogue (`src/i18n/compiled-catalog.ts` `layerLoaders.guide`, +86 B in the i18n provider's chunk,
  which every page carries) and `StringsLayerGate`'s `layers` prop (+48 B in the entry). Both are
  decision (1) of the ruling (the fourth strings layer, asked for on the first open). The public
  pages: `/` 230.7 → 230.9, `/c/$slug` 230.7 → 230.9, `/$name` 228.7 → 228.8, `/l/$slug` 261.1 →
  261.2, `/legal/$kind` 217.2 → 217.3, `/privacy` and `/terms` 217.1 → 217.3, `/auth` 225.3 → 225.4,
  `/auth_/callback` 213.5 → 213.7, `/post` 404.5 → 404.6, `/post_/$listingId` 404.5 → 404.6.
- The **entry JS** sits at 212.6 KiB (base 212.5): with the local allowance it is inside the NEAR
  band of its ceiling of 213 (`ceilingForLocal(212.6)` = 214). That ceiling lives in
  `scripts/check-bundle-size.mjs`, which the brief names as NOT in scope. It is the one line the
  local check still refuses on the final tree (`entry JS: 212.6 KiB + 0.1 KiB local allowance sits
  within the NEAR band (0.3 KiB) of its ceiling of 213 KiB`); every page's line is satisfied.
- I did not find a construction that keeps decision (1) and costs the public pages nothing: the
  layer must be registered where the catalogue's loader runs, and the gate must be told which layer
  (the alternatives I measured are in `strings-layer-gate.tsx`'s and `block-guide.tsx`'s docstrings:
  the gate reads through `useRouterState`, not `useMatches`, which kept TanStack's `Match` out of a
  split; the gate sits in the control's chunk, not the sheet's). The plan's §7 premise "Entry and
  public pages: unchanged by construction" was wrong by these 134 bytes; that is my error.

Three answers are possible, and the choice is the supervisor's:

1. Accept the 0.13 KiB with its cause, and extend SCOPE to the entry's line in
   `scripts/check-bundle-size.mjs` (213 → 214 = `ceilingForLocal(212.6)`, with the cause on its
   line). The three public pages the band already caught (`/auth_/callback` 214 → 215, `/post` and
   `/post_/$listingId` 405 → 406) are raised in `scripts/route-budgets.mjs` with that cause; the
   roadmap's "P-1c debts" line already names the entry ceiling as this stop's item.
2. No fourth layer: the guide texts join the admin layer (`en-admin.ts` / `am-admin.ts`), the
   `guide` layer, its loaders and the gate's `layers` prop go, and the public pages come back to the
   base. The cost moves to every admin page's first paint (the applied language's admin layer grows
   by the guide texts: 80 keys EN now, ~+3.5 KiB gz, and every block turn (b) guides adds its own) —
   the brief's lens forbade exactly this.
3. Something else the supervisor rules.

Until the ruling I push nothing further; the branch holds the whole turn (a), green-shaped.

## What turn (a) measured (the ruling's report items, so the final report can copy them)

**Keys (EN and AM, each in the same change; `bun run i18n:usage` run, both maps committed).**

- `guide` layer (new; `en-guide.ts` / `am-guide.ts`), 80 keys each: for each of the six prefixes
  `admin.monetisation.{markets,level,reach,levelOverrides,productPrices,caps}` — `.guide.what`,
  `.guide.how`, `.guide.next`, and `.guide.col.<key>` for every column the block shows (markets 9,
  level 13, reach 12, levelOverrides 9, productPrices 9, caps 9).
- `member` layer (+5): `prim.guide.open`, `prim.guide.what`, `prim.guide.columns`,
  `prim.guide.how`, `prim.guide.next` (CF-SL-1 places them: `data-table.tsx` is drawn by
  `/my-listings`, a member route, though a seller's table never draws a Guide).
- `admin` layer (+10 / −1): `admin.monetisation.step.products`, `.step.marketsOn`,
  `.step.pricesMissing`, `admin.monetisation.col.scope`, `admin.monetisation.product.open`,
  `.product.close`, `admin.monetisation.prices.searchLabel`, `prim.orderStrip.label`,
  `prim.orderStrip.set`, `prim.orderStrip.needsRow`; retired `admin.monetisation.help.overrides`
  (its sentence folded into `admin.monetisation.levelOverrides.guide.what`, finding 3).
- `base` layer: unchanged. No key's value was edited.

**h1 / h2 (finding 2).** `TableActions` gained `level?: "h1" | "h2"` (default `h1`). `"h2"` is
passed by `markets-section.tsx`, `products-section.tsx` (levels and reach), `caps-section.tsx`,
`level-overrides-table.tsx`, `product-prices-table.tsx`; the page's one h1 is
`monetisation-page.tsx :72`; MNP-1 asserts one h1 before and after a product opens.

**The toolbars at 360 (measured in the E2E build, mobile-360 project; a temporary spec, not
committed).** Every toolbar is 296 px wide inside its card (272 px for a product's inner tables);
the Guide tile is 44 × 44 at the toolbar's end (x 308–352 of 360); where a search exists it sits on
the SAME row as the tile (no wrap) and above `min-w-40`'s 160 px floor:

| block | toolbar | search | Guide tile | same row |
| --- | --- | --- | --- | --- |
| `admin-monetisation-markets` | 296 px | none | 44 × 44 | — |
| `admin-monetisation-level` | 296 px | none | 44 × 44 | — |
| `admin-monetisation-reach` | 296 px | none | 44 × 44 | — |
| `admin-monetisation-caps` | 296 px | none | 44 × 44 | — |
| `product-<level>-perks` (open row) | 272 px | none | 44 × 44 | — |
| `product-<level>-prices` (open row) | 272 px | 168 × 44 | 44 × 44 | yes |
| `/admin/users` (a search-bearing console; its Columns tile, no Guide until turn (b)) | 296 px | 192 × 44 | Columns 44 × 44 | yes |

At 1280 the same toolbars are 992 / 968 px, the search 320 × 36, the Guide tile 91 × 36 with its
word. `expectNoHorizontalOverflow` passed on every admin section at 360 (AG-1), the open product
included.

**Budgets (`scripts/route-budgets.mjs`; every line by `ceilingForLocal(size)` with its cause).**
Every DataTable page grew by D313's Guide (+1.3–1.5 KiB: the control, the Sheet facade's shell, the
gate and `resilientLazy` around the on-demand body, the toolbar clone) and part E's drawn-twin hook
(+0.3): `/admin/ai` 325 → 327 (326.1), `/admin/attributes` 339 → 340 (339.5), `/admin/audit` 298 →
300 (299.1), `/admin/categories` 347 → 348 (347.5), `/admin/countries` 328 → 330 (329.0),
`/admin/listings` 348 → 349 (348.4), `/admin/listings_/$listingId` 390 → 393 (391.9; + `en.ts`
whole), `/admin/monetisation` 334 → 339 (338.2; the strip, the expansion, the inner tables, six
guides' specs), `/admin/places` 330 → 331 (330.5), `/admin/roles` 295 → 297 (296.0),
`/admin/roles_/$roleId` 316 → 319 (318.0), `/admin/screening` 369 → 371 (370.2),
`/admin/translations` 406 → 413 (412.1; + `en.ts` and `am.ts` whole, +5.9), `/admin/translations_/$lang`
310 → 311 (310.4), `/admin/users` 295 → 297 (295.7), `/dev/primitives` 231 → 234 (233.3),
`/dev/style` 251 → 254 (252.8), `/my-listings` 318 → 320 (319.0); the band's edge from the root
growth: `/auth_/callback` 214 → 215 (213.7), `/post` and `/post_/$listingId` 405 → 406 (404.6),
`/admin/legal` 286 → 287 (285.6). The sizes in brackets are the final tree's. The entry: see the
question.

**Tests.** Unit (final tree): `bunx vitest run src/components/shell src/features/admin-monetisation
src/features/admin/guide-next.test.ts src/i18n` → 39 files, 194 passed. The laws
(`bunx vitest run scripts --maxWorkers=2`): 89 files, 446 passed, 1 failed — NH-6
(`scripts/ci/nightly-hour.test.ts`, macOS cannot resolve New York's zone; red on the base too).
Browser (`bun run e2e:local`, ethio-staging, both projects, 0 retries, each file whole and alone):
`e2e/admin-guides.spec.ts` 12 passed (AG-1…5, AG-7 × 2); `e2e/admin-monetisation.spec.ts` 34
passed (MON-1…17 × 2). Red-first: HS-28 red on the planted bypass (the expansion in both twins);
CFG-1/2 and TBL-1/6 on planted bypasses.

**The browser walk's findings (part E, `121dee2f2`, `e1e62e183`, `1d890edb7`).**

- The Guide control opened the sheet by its own `onClick`, so the close never handed the focus back
  (AG-4 red): it is now the facade's `SheetTrigger asChild`.
- `DataTable` mounted a row's expansion in both twins (U3a, since bundle 11), so a product's inner
  tables — their `id`s and controls — existed twice (AG-1 counted 8 Guides; `product-<key>-prices-
  search` resolved to two; `#product-<key>-prices` answered the hidden copy at ≥ lg):
  `use-drawn-twin.ts` reads which twin the stylesheet shows and the expansion mounts there only
  (HS-28). Every other expansion consumer (Attributes, Strings, Data scope, Audit) keeps its drawn
  copy; their specs scope by twin already.
- AG-1 reads the two sections that draw their own frame (Audit `admin-audit`, Legal `legal-page`)
  — a K2 finding, not changed.

**K2 — siblings with the same concern, not touched.** The three whole-catalogue imports
(`src/features/admin-listings/listing-page.tsx` :28, `src/features/admin/roles/permission-matrix.tsx`
:7, `src/features/admin/translations/languages-page.tsx` :28–29) now carry the `guide` layer too
(roadmap line); the Translations console's own order strip (finding 4; roadmap line); Audit's and
Legal's own section frames (`admin-audit`, `legal-page`) beside `AdminSectionPage`'s
`admin-section-<id>`; My listings' DataTable (a seller page; never asked, TBL-6); the sixteen admin
tables in `scripts/conformance/admin-guides-allowlist.txt` (`guide owed in turn (b) | 2026-11-10`).

**Departures from the plan.** `prim.orderStrip.*` in the admin layer and `prim.guide.*` in the
member layer (CF-SL-1's placement by the routes that draw them); `admin.monetisation.col.level` /
`col.product` kept (the read-only dialog labels); sixteen allowlist lines, not fifteen
(`admin-ai/ai-calls.tsx` draws its own table); the gate reads `useRouterState` and sits in
`block-guide.tsx` (measured, see the question); three public/band ceilings raised; `seedProduct`
gained `sort`; MON-17's expectation computed from the rows (`unpricedPairs`).

**THE CHECKS (`bun run checks`, once, on the final tree 1d890edb7).** Fast line: `FAIL laws-first ›
scripts/ tests first (INC-1030) (60s)`; last line: `checks: 23 PASS · 5 FAIL · 30 NOT RUN · 327s`.
The five FAILs, each read in its log: (1) `laws-first › scripts/ tests first` — NH-6 only (446
passed, 1 failed; macOS cannot resolve New York's zone, red on the base too); (2) `build-and-check ›
Workflow lint (actionlint, pinned)` — the pinned `actionlint_1.7.7_linux_amd64` is a Linux binary
(checksum OK; "the bad fixture failed for another reason"); no workflow changed (FLAG
`no-workflow-change` honoured); (3) `component-tests › Component tests` — NH-6 only (2696 passed, 1
failed, 434 files); (4) `secrets-scan › Secrets scan (gitleaks, pinned)` — the pinned
`gitleaks_8.24.3_linux_x64` is a Linux binary (checksum OK; it named "8 commits in 71107be62..HEAD"
and printed no leak line because it never ran); before each commit I read `git diff --cached` for
key-, secret-, token- and password-shaped text and found none; (5) `bundle-budget › Check the
first-paint budget` — the entry's NEAR-band line alone (this stop's question); every page's line
passes. The 30 NOT RUN: 8 behind the two Mac reds (typecheck, format, lint, the e2e selector
self-test, root route names, build, bundle report — each run by hand on this tree and clean:
`tsc --noEmit` clean, `eslint` 0 errors, prettier clean on every touched file, `bun run build` and
`node scripts/check-bundle-size.mjs` as above; `changed folders' unit tests` and `Semgrep ERROR` —
the unit tests run by hand above, 194 passed; Semgrep not run here), 3 installs the runner skips, 2
dependency-audit (the advisory service unreachable from the sandbox), 4 e2e-preflight (staging
credentials the script never holds), 6 e2e merges (GitHub artifacts), 4 promote, 2 semgrep uploads
(GitHub only), 1 bundle-budget install. CI on Linux judges all of them.

**Limits.** NH-6, actionlint and gitleaks cannot run on this macOS (above). CI for the branch: not
yet run (the draft pull request opens with this stop). Nothing was applied to any database; the
browser tests' scratch rows only (ethio-staging), made and removed by the harness.

Review: READY · 0 BLOCKER · 1 MAJOR (the public 0.13 KiB against the brief's lens — this stop's
question) · 3 MINOR (`prim.guide.*` in the member layer by CF-SL-1; Audit's and Legal's own frames;
the react-refresh warning on `block-guide.tsx`'s `guideAnchor` export, 0 lint errors) · on 1d890ed
