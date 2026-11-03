# P-1c — the admin explains itself: one Guide mechanism on every admin block, the Monetisation order strip, and Monetisation regrouped by product (D313) — report

Base: 917cbe4fa (the brief's `Base: dev 71107be62`, saved as the branch's first commit) · Final
commit: aaaddda28 · Brief: docs/governance/briefs/p1c-admin-guide.md (the task gave no sha256; the
Amharic file `~/Downloads/p1c-am-strings-a.md` gave `3bbd435b…cfe4f8`, compared and equal)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on aaaddda28

This is turn (a) of the three the ruling cut (decision 7): the mechanism, the guard, the strip,
the regroup and Monetisation's six guides. Turn (b) (every other block's guide, AG-6) and turn (c)
are not this turn's. Ruling 2 (2026-11-03, this chat) closed stop 1: option (1), the fourth strings
layer stays, SCOPE extended by the entry's line in `scripts/check-bundle-size.mjs`; the browser
walk's two findings are INC-1046 and INC-1047.

## 1. Done / not done, by part and step

Done, in order (one commit each; `git log 917cbe4fa..HEAD`):

- **A** `56610f7f4` — the Guide mechanism (`block-guide.tsx`, `block-guide-sheet.tsx`,
  `guide-next.ts`; DataTable's `guide` prop; `TableToolbar`'s `guide` slot; `TableActions level`)
  and the `guide` strings layer (`en-guide.ts` / `am-guide.ts`, `STRINGS_LAYERS`, `layerLoaders`,
  `StringsLayerGate`'s `layers` prop, the census `LAYERS`). Unit: BG-1…5, GN-1…2, SLG-5, CLL-2.
- **B** `20c0b610b` — the Monetisation order strip (`order-strip.tsx`, `monetisation-order.ts`) and
  the console by product (`product-name-toggle.tsx`, `product-details.tsx`,
  `level-overrides-table.tsx`, `product-prices-table.tsx`; `PriceDialog fixedProduct`,
  `OverrideDialog fixedLevel`); `prices-section.tsx` and `overrides-section.tsx` deleted
  (`[intentional-delete]`, `docs/tracking/intentional-deletions.txt`); the six guides' EN and AM;
  `admin-monetisation.spec.ts` re-pointed, MON-16/17 added; budgets by DEC-296. Unit: OS-1…3,
  MNO-1…4, MNP-1.
- **C** `8ac228e0d` — CF-GUIDE-1 (`scripts/conformance/admin-guides.ts`, its test CFG-1…3, its
  allowlist of sixteen), T10 in `scripts/admin-tables.ts` (TBL-1 extended, TBL-6), `wired.test.ts`,
  `e2e-select.ts`, `e2e/admin-guides.spec.ts` (AG-1…5, AG-7).
- **D** `d24bc3419` — `docs/features/admin-guide.md` (new), `plans.md`, `display-primitives.md`,
  the register rows 104–106, the changelog line, the roadmap's debts line, both usage maps.
- **E** `121dee2f2`, `e1e62e183`, `1d890edb7` — the browser walk's fixes: INC-1047 (the control on
  `SheetTrigger asChild`), INC-1046 (`use-drawn-twin.ts`, HS-28), AG-1 and MON-16 on the drawn twin;
  three budget lines.
- Stop 1 `fdb741f38` (`docs/governance/reports/p1c-admin-guide.stop-1.md`), answered by ruling 2.
- **F** `aaaddda28` — the entry's ceiling 213 → 214 (ruling 2 §2).
- THE CHECKS whole on `aaaddda28`; THE BROWSER CHECK (both specs whole, alone, both projects, 0
  retries); THE SELF-REVIEW (rule 80) on the whole diff; this report.

Not done (by design): turn (b) and (c); AG-6 (turn (b)); the three K2 roadmap items (§6).

## 2. Files changed

`git diff --name-only 917cbe4fa` — 60 paths (21 added, each present in `git ls-files`; 2 deleted,
declared):

```
docs/_changelog.md
docs/features/admin-guide.md
docs/features/display-primitives.md
docs/features/plans.md
docs/generated/i18n-usage.json
docs/governance/mechanisms.md
docs/governance/reports/p1c-admin-guide.stop-1.md
docs/tracking/intentional-deletions.txt
e2e/admin-guides.spec.ts
e2e/admin-monetisation.spec.ts
public/i18n-usage.json
roadmap.md
scripts/admin-tables.test.ts
scripts/admin-tables.ts
scripts/check-bundle-size.mjs
scripts/conformance/admin-guides-allowlist.txt
scripts/conformance/admin-guides.test.ts
scripts/conformance/admin-guides.ts
scripts/conformance/holds-its-box-allowlist.txt
scripts/conformance/strings-layers.ts
scripts/conformance/wired.test.ts
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/shell/block-guide-sheet.tsx
src/components/shell/block-guide.test.tsx
src/components/shell/block-guide.tsx
src/components/shell/data-table.test.tsx
src/components/shell/data-table.tsx
src/components/shell/order-strip.test.tsx
src/components/shell/order-strip.tsx
src/components/shell/strings-layer-gate.test.tsx
src/components/shell/strings-layer-gate.tsx
src/components/shell/table-actions.tsx
src/components/shell/table-toolbar.tsx
src/components/shell/use-drawn-twin.ts
src/features/admin-monetisation/caps-section.tsx
src/features/admin-monetisation/level-overrides-table.tsx
src/features/admin-monetisation/markets-section.tsx
src/features/admin-monetisation/monetisation-order.test.ts
src/features/admin-monetisation/monetisation-order.ts
src/features/admin-monetisation/monetisation-page.test.tsx
src/features/admin-monetisation/monetisation-page.tsx
src/features/admin-monetisation/override-dialog.tsx
src/features/admin-monetisation/overrides-section.tsx
src/features/admin-monetisation/price-dialog.tsx
src/features/admin-monetisation/prices-section.tsx
src/features/admin-monetisation/product-details.tsx
src/features/admin-monetisation/product-name-toggle.tsx
src/features/admin-monetisation/product-prices-table.tsx
src/features/admin-monetisation/products-section.tsx
src/features/admin/guide-next.test.ts
src/features/admin/guide-next.ts
src/i18n/compiled-catalog.ts
src/i18n/compiled-layer-loader.test.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/am-guide.ts
src/i18n/locales/am-member.ts
src/i18n/locales/am.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-guide.ts
src/i18n/locales/en-member.ts
src/i18n/locales/en.ts
```

Every path is in SCOPE (by area) or the standing allowance, except `scripts/check-bundle-size.mjs`
— ruling 2 §2 ("SCOPE extended by one line"; one line and its comment changed, nothing else in the
file). `src/features/admin/sections.ts` was not needed (`guide-next.ts` reads it). Nothing under
`src/components/ui/` was needed.

## 3. Behaviour contract — before → after

No route, door, SQL function or RPC was touched (`git diff --name-only 917cbe4fa -- src/server
src/routes supabase` is empty). The screens and shared pieces:

| piece | at the base | now (the brief's numbered change) |
| --- | --- | --- |
| `DataTable` (`data-table.tsx`) | `toolbar` drawn as given; a row's expansion mounted in the card twin AND the table twin; the frame a plain `div` | `guide?: BlockGuideSpec` draws one `BlockGuide` last in the toolbar's end group (cloned into the page's `TableToolbar`'s `guide` slot, else a `TableToolbar` of its own, `data-table-guide-toolbar`); the frame carries `id={anchor}`, `tabIndex={-1}`, `scroll-mt-20`; the expansion mounts in the DRAWN twin only (INC-1046, `use-drawn-twin.ts`; both while neither twin is known hidden). Without `guide` nothing differs but the expansion rule |
| `TableToolbar` | `scope · search · [filters, columns]` | `+ guide` after `columns` in the same end group (the group draws when any of the three exists) |
| `TableActions` | the title always `<h1>` | `level?: "h1" \| "h2"`, default `h1` (the same classes); `"h2"` is `text-lg leading-7` |
| `StringsLayerGate` | one prop `children`; the route's declared layers through `useMatches` | `layers?: StringsLayer[]` (own layers win over the route's); the route's layers read through `useRouterState({ select })` — the same list, one hook (`useMatches` is built on it); the failed / waiting / ready answers unchanged |
| `STRINGS_LAYERS` / `layerLoaders` / census `LAYERS` | `["admin", "member"]` | `["admin", "member", "guide"]`; `layerLoaders.guide` → `en-guide.ts` / `am-guide.ts` through `loadOnce`; `en.ts` / `am.ts` join four layers |
| `BlockGuide` (new) | — | control `<anchor>-guide` inside `SheetTrigger asChild` (`aria-haspopup="dialog"`, `aria-expanded`; the focus back on close, INC-1047); sheet `<anchor>-guide-sheet` side end, title = the table's caption; body on demand (`resilientLazy`, `LoadFailedHere` `<anchor>-guide-failed`) under `<StringsLayerGate layers={["guide"]}>`; four parts in fixed order; a column line per shown column in the table's order; ONE next link (`resolveGuideNext`: the section's path + the block's hash; `/admin` when the caller lacks the permission); pressing it closes the sheet and the close hands the focus to the frame when it is on the page |
| `OrderStrip` (new) | — | `<ol data-testid={testid}>` labelled `prim.orderStrip.label`; a step `<testid>-<id>` with `data-state` `set` / `needsRow`, `<testid>-<id>-state` text `prim.orderStrip.set` / `.needsRow`, optional `-detail`, an `<a href="#hash">` |
| `/admin/monetisation` page | h1; blocks Markets · Levels · Per-category perks · Reach · Prices · Caps (six page-wide tables) | h1; the strip (markets · products · prices · caps; caps only when the caller may see it); blocks Markets · Levels · Reach · Caps (four, each h2 with its Guide); a product's NAME toggles its row open (`product-<key>-open`, `aria-expanded`, `aria-controls`) on two inner h2 tables — `product-<key>-perks` (levels only; `-override-add`) and `product-<key>-prices` (`-price-add`, `-prices-search`); the strip's Prices step: Set when every (market on × enabled self-serve product) pair has a price valid now (country-wide or the market's), else Needs a row naming the first unpriced product and its market and linking `#product-<key>-prices`; Products: Set when an enabled level AND an enabled reach exist |
| `PriceDialog` / `OverrideDialog` | the product / the level chosen in a select | `fixedProduct` / `fixedLevel`: the dialog opened inside a product shows the name as text (`-product` / `-level`), no select; the saved row is the same |
| `scripts/admin-tables.ts` `check(sources)` | rules T1–T9 | `+ T10` (an admin block's `<DataTable` carries `guide={`); `check(sources, guideOwed)` skips T10 for files in CF-GUIDE-1's allowlist; `isAdminBlock(file)` = `src/features/admin*`; My listings never asked |
| `scripts/e2e-select.ts` | — | area `admin-guides` (`block-guide*.tsx`, `order-strip.tsx`, `guide-next.ts`, `*-guide.ts` → `admin-guides.spec.ts`); `admin-guides.spec.ts` in the `shell` area too |
| The entry's ceiling (`check-bundle-size.mjs`) | `js: 213` | `js: 214` = `ceilingForLocal(212.6)` (ruling 2 §2) |

Everything else on those screens is today's: the markets, levels, reach and caps editors, the
verbs, the step-up gate, the readers and doors.

## 4. Censuses

- **Every `<DataTable` under `src/features/admin-*/**` and `src/features/admin/**`**
  (`rg -l "<DataTable" src/features/admin-* src/features/admin`, the tree): 21 files —
  admin-ai/ai-calls.tsx, admin-ai/ai-page.tsx, admin-attributes/attributes-page.tsx,
  admin-categories/categories-page.tsx, admin-countries/countries-page.tsx,
  admin-listings/listings-page.tsx, admin-locations/locations-page.tsx,
  admin-monetisation/{caps-section, level-overrides-table, markets-section, product-prices-table,
  products-section}.tsx (five; at the base: caps, markets, overrides, prices, products),
  admin-screening/name-checks.tsx, admin-screening/screening-page.tsx, admin/audit/audit-page.tsx,
  admin/impersonation/impersonation-view.tsx, admin/roles/roles-list.tsx,
  admin/translations/{data-scope, languages-page, strings-page}.tsx, admin/users/users-list.tsx.
  Guided now: the five Monetisation files. Owed (turn (b)): the other sixteen, each an allowlist line.
- **`expandedRow` consumers (INC-1046)** (`rg -n "expandedRow" src --glob '*.tsx'`, tests and the
  primitive excluded) — each read in the tree, each now mounts once through `DataTable`'s one
  `expansionOf(row, twin)` (the consumer passes a function; the primitive calls it for the drawn twin
  only), no consumer changed:
  - `src/features/admin-attributes/attributes-page.tsx` :387 → :650 — the option list
    (`attribute-optionlist-<key>`, a `<p>`); `cardUntil="lg"`; mounts once.
  - `src/features/admin/translations/strings-page.tsx` :485 — `StringEditor` for the expanded key;
    mounts once (its fields and save button existed twice before, the hidden copy inert).
  - `src/features/admin/translations/data-scope.tsx` :272 — `EntityEditor` for the expanded key;
    mounts once.
  - `src/features/admin/audit/audit-page.tsx` :431 — `DetailPanel testid="audit-detail"`; mounts
    once (`audit-detail` was two nodes before).
  - `src/features/admin-monetisation/products-section.tsx` :257 (this turn's) — `ProductDetails`
    (the two inner tables); mounts once.
- **Who draws `data-table.tsx` (for CF-SL-1's placement of `prim.guide.*`)**: the census
  `strings-layers.ts` placed them in the member layer (`/my-listings` draws the primitive).
- **Section frames** (`rg -l "admin-section-<id>" src` per section id): twelve draw
  `admin-section-<id>`; Audit draws `admin-audit` (audit-page.tsx :254), Legal `legal-page` — K2.
- **The Amharic**: `am-script.test.ts` green (no foreign-script code point in `am-guide.ts`,
  `am-admin.ts`, `am-member.ts`); the file's sha256 compared before copying.

## 5. Tests

**Added (unit).** BG-1…5 (`block-guide.test.tsx`: the control's attributes and testid; opened: the
caption, the four parts in order, the guide layer asked; a line per visible column in order; ONE
next link, pressing it closes; a next the caller may not see leads to `/admin`), GN-1…2
(`guide-next.test.ts`), OS-1…3 (`order-strip.test.tsx`), MNO-1…4 (`monetisation-order.test.ts`:
Set, Needs a row with its first unpriced pair, a country-wide price counts for every market, the
caps step only with the permission), MNP-1 (`monetisation-page.test.tsx`: one h1, every block h2,
the strip's four steps, a product opens to its own h2 tables), SLG-5 (`strings-layer-gate.test.tsx`:
own `layers` win), HS-28 (`data-table.test.tsx`: the expansion in the drawn twin only — red on the
planted bypass: `expansionOf` without the twin test gave 2 nodes), CFG-1…3
(`admin-guides.test.ts`: planted bypasses — a table without its Guide; a column without its line
through a spread helper; a non-literal key; a foreign section; an astray key; an unclaimed key — then
the tree), TBL-6 (`admin-tables.test.ts`: the bare check's T10 refusals equal the allowlist's set;
My listings never asked).

**Changed (unit).** CLL-2 (`compiled-layer-loader.test.ts`: the layers are admin, member, guide),
TBL-1 (the GOOD fixture gains `guide=`; removing it → `["T10"]`), TBL-4 (`check(sources,
guideOwed(tables))`), `block-guide.test.tsx`'s router mock gains `useRouterState`;
`monetisation-page.test.tsx` fixture `placement: "boost"` (a typecheck error of my own draft).

**E2E added.** `e2e/admin-guides.spec.ts`: AG-1 (every section draws — `admin-section-<id>`, or
Audit's `admin-audit` / Legal's `legal-page`; in a guided section every `data-table-toolbar` holds
exactly one Guide; every Guide's anchor has its `#frame`; no horizontal overflow; Monetisation 4 →
6 Guides when a level opens on the drawn twin), AG-2 (h2 title, four h3 in EN, the next text, `dl >
div` lines == the shown columns' labels; hiding `since` in the Columns panel drops its line), AG-3
(the next link → `#admin-monetisation-level`, the sheet closes, the frame in view and focused), AG-4
(Escape closes, `aria-expanded` false, the control focused — INC-1047), AG-5 (Amharic: the h3s, the
`what` text, a column term, the next text from `am`), AG-7 (no request matching
`/(?:en|am)-guide|block-guide-sheet/` before the first open; some after; none more for a second
Guide). AG-6 is turn (b)'s.

**E2E re-pointed.** `admin-monetisation.spec.ts`: MON-1 (the strip's four steps with `-state`; the
four blocks; no Prices / Perks blocks; one h1; a level opens on its perks frame, `-override-add`,
`-price-add`, `-prices-search`), MON-2 (viewer: three blocks, no caps, no `monetisation-order-caps`;
a level opens with no inner verbs), MON-4 (a new level opens to `-perks-empty`, `-prices-empty`),
MON-5 (reach: no perks frame, no override-add), MON-6 (`product-<key>-override-add`; the dialog's
`-level` is text, no select), MON-8 (`-product` text; title "Market · Category";
`product-<key>-prices-search`), MON-9/10/11 (the prices table inside the product's frame), MON-16
(new: a scratch market on + a sellable product without a price → Needs a row naming the product and
its market; the link opens the product's prices on the drawn twin; Markets' detail names the market;
Products Set), MON-17 (new: adding the price through the dialog inside the product → Set, or Needs a
row not naming ours when other unpriced pairs remain, computed from the rows (`unpricedPairs`);
the same after reload). Helpers: `tableOf` (the frame's OWN table/cards, `:not(table *)`),
`productFrame`, `openProduct`, `priceRow`, `overrideRow`, `firstProduct`, `seedProduct { sort }`,
`seedMarketOn`, `unpricedPairs`. No `.first()`, no `waitForTimeout`, no `test.only` (ESLint's DEC-027
rule green on both files).

**Red-first evidence.** HS-28 red on the planted bypass (above); CFG-1/2 and TBL-1/6 on planted
fixtures; AG-1 and AG-4 were red on the tree before part E (the two INCs) and green after.

**Totals (final tree `aaaddda28`).** `bun run typecheck` (`tsc --noEmit`): clean. `bun run lint`: 0
errors (1 pre-existing-class warning: react-refresh on `block-guide.tsx`'s `guideAnchor` export,
the same warning the shell's other primitives carry). Touched unit tests (`bunx vitest run
src/components/shell src/features/admin-monetisation src/features/admin/guide-next.test.ts
src/i18n`): 39 files, 194 passed. The laws (`bunx vitest run scripts --maxWorkers=2`): 89 files —
88 passed, 1 failed (NH-6, §12). THE CHECKS (`bun run checks`, once, on `aaaddda28`): fast line
`FAIL laws-first › scripts/ tests first (INC-1030) (56s)`; last line
`checks: 24 PASS · 4 FAIL · 30 NOT RUN · 310s`. The four FAILs, each read in its log: `laws-first ›
scripts/ tests first` — NH-6 only (446 passed, 1 failed); `build-and-check › Workflow lint
(actionlint, pinned)` — the pinned `actionlint_1.7.7_linux_amd64` is a Linux binary (checksum OK;
"the bad fixture failed for another reason"; no workflow changed); `component-tests › Component
tests` — NH-6 only (2696 passed, 1 failed, 434 files); `secrets-scan › Secrets scan (gitleaks,
pinned)` — the pinned `gitleaks_8.24.3_linux_x64` is a Linux binary (checksum OK; it printed no leak
line because it never ran; before each commit I read `git diff --cached` for key-, secret-, token-
and password-shaped text and found none). `bundle-budget › Check the first-paint budget` PASS and
`the NEAR band (R4)` PASS ("0 NEAR, none grew"). The 30 NOT RUN: 8 behind the two Mac reds
(typecheck, format, lint, the e2e selector self-test, root route names, build, bundle report —
each run by hand on this tree and clean; `changed folders' unit tests` and `Semgrep ERROR` — the unit
tests run by hand above, Semgrep not run here), 3 installs the runner skips (dependencies already
installed), 2 dependency-audit (the advisory service unreachable from the sandbox), 4 e2e-preflight
(staging credentials the script never holds), 6 e2e merges (GitHub artifacts), 4 promote (only CI
promotes), 2 semgrep uploads (GitHub only), 1 bundle-budget install.

**THE BROWSER CHECK** (`bun run e2e:local`, ethio-staging, both projects `mobile-360` and
`desktop-1280`, 0 retries, each file whole and alone, on the final source tree): `e2e/admin-guides.spec.ts`
— `12 passed (37.8s)`, `[ssr-error]` 0; `e2e/admin-monetisation.spec.ts` — `34 passed (2.6m)`,
`[ssr-error]` 0. The ruling's "every spec that exercises a screen or shared helper you changed": the
DataTable primitive changed for every admin table and My listings — those specs were not run
locally (§12); CI's lanes run them.

**J-audit** (e2e/** changed): J1 scratch keys `e2e_mon_…` / plan prefix `e_probe_mon_`, MON-16/17's
market a scratch `market_settings` row; J3 destroyed in `afterEach` by throwing destroys; J5 twin
helpers, no `.first()`; J6 MON-16/17 compute from DB truth (`unpricedPairs`), never a page position;
J7 seed before navigate; J9 the pooled job super admin for the guides (read-only), the real door for
the Monetisation mutations as before. AG-1 reads one REAL row read-only (`firstLevel()`, the first
enabled level's key) to open it — a read, never a write (J2).

## 6. K2 — siblings that bypass the mechanism

Greps: `rg -n "import .* from \"@/i18n/locales/(en|am)\"" src` (whole-catalogue imports);
`rg -l "<DataTable" src`; `rg -n "admin-section-|data-testid=\"admin-[a-z]+\"" src`;
`rg -n "expandedRow" src`; `rg -n "<ol|OrderStrip" src/features/admin`.

- The three whole-catalogue imports — `src/features/admin-listings/listing-page.tsx` :28,
  `src/features/admin/roles/permission-matrix.tsx` :7,
  `src/features/admin/translations/languages-page.tsx` :28–29 — now carry the `guide` layer in their
  first download (+5.9 KiB on `/admin/translations`); folding them is the roadmap's "P-1c debts"
  line (decision 1 of the ruling).
- The Translations console's own set-up order (finding 4) — the `OrderStrip` primitive awaits its
  state function; a roadmap line.
- Audit's `admin-audit` (audit-page.tsx :254) and Legal's `legal-page` section frames beside
  `AdminSectionPage`'s `admin-section-<id>`; not changed (outside the brief's changes), read by AG-1.
- My listings' `DataTable` (`src/features/my-listings/**`) — a seller page, not an admin block; never
  asked (TBL-6), not changed.
- The sixteen admin tables in `scripts/conformance/admin-guides-allowlist.txt` — turn (b)'s.
- The four `expandedRow` consumers (§4) — INC-1046 fixed in the primitive; no consumer needed a
  change.

## 7. Allowlists and guards

- `scripts/conformance/admin-guides-allowlist.txt` (new): 0 → 16 lines, each
  `<file> | guide owed in turn (b) | 2026-11-10` (ai-calls, ai-page, attributes-page,
  categories-page, countries-page, listings-page, locations-page, name-checks, screening-page,
  audit-page, impersonation-view, roles-list, data-scope, languages-page, strings-page,
  users-list). Read by CF-GUIDE-1 (CFG-3) and by `admin-tables.test.ts`'s `guideOwed` (TBL-4/6) —
  one place.
- `scripts/conformance/holds-its-box-allowlist.txt`: 12 → 13 lines; `+
  src/components/shell/block-guide.tsx#BlockGuideSheet | the Guide sheet draws in a portal on the
  top layer, out of the page's flow (D313): while its body downloads, or when it cannot, the page has
  no box of it to keep | 2027-05-01`.
- New guard **CF-GUIDE-1** (`scripts/conformance/admin-guides.ts`): every admin `<DataTable` has a
  literal `guide={{ prefix, next }}`; every visible column key has `<prefix>.guide.col.<key>` in
  EN and AM; `.guide.what/.how/.next` present; no astray or unclaimed `*.guide.*` key; `next.section`
  a known section id. Proven on planted bypasses (CFG-1, CFG-2); its caller named in
  `wired.test.ts`. **T10** in `scripts/admin-tables.ts` (the shape law). Self-tests run: the laws
  suite (above), `scripts/check-hardcoded-strings.sh` (findings 0, self-test OK), `i18n:map-guard`
  (maps match the tree).
- `scripts/conformance/strings-layers.ts` `LAYERS` gains `guide` (CF-SL-1 judges the new keys'
  placement: `prim.guide.*` member, `prim.orderStrip.*` admin, `<block>.guide.*` guide).
- No other allowlist changed (`git diff --name-only 917cbe4fa -- scripts/conformance/*-allowlist.txt`
  lists the two above).

## 8. Strings

Every key below ships EN and AM in the same change; the Amharic is the ruling's file copied by key
(no Amharic of my own); `bun run i18n:usage` run, both maps committed; `am-script.test.ts` green.
No existing key's value was edited (the census over the four layers: 0 changed values). The base
layer is unchanged.

**`admin` layer — 10 added, 1 retired**

| key | EN | AM |
| --- | --- | --- |
| `admin.monetisation.step.products` | Products | ምርቶች |
| `admin.monetisation.step.marketsOn` | Paid levels on: {markets} | የሚከፈልባቸው ደረጃዎች በርተዋል፦ {markets} |
| `admin.monetisation.step.pricesMissing` | No price yet: {products} in {market} | እስካሁን ዋጋ የለም፦ {products} በ{market} |
| `admin.monetisation.col.scope` | Market · Category | ገበያ · ምድብ |
| `admin.monetisation.product.open` | Open details | ዝርዝሩን ክፈት |
| `admin.monetisation.product.close` | Hide details | ዝርዝሩን ደብቅ |
| `admin.monetisation.prices.searchLabel` | Market or category | ገበያ ወይም ምድብ |
| `prim.orderStrip.label` | Set-up order | የማዋቀር ቅደም ተከተል |
| `prim.orderStrip.set` | Set | ተቀናብሯል |
| `prim.orderStrip.needsRow` | Needs a row | ረድፍ ያስፈልጋል |
| ~~`admin.monetisation.help.overrides`~~ (retired) | A subcategory inherits its main category's row; a blank cell means the level's own value; a seasonal category ends every ad at its season's end. | ንዑስ ምድብ የዋና ምድቡን ረድፍ ይወርሳል፤ ባዶ ክፍል የደረጃውን የራሱን እሴት ያመለክታል፤ ወቅታዊ ምድብ እያንዳንዱን ማስታወቂያ በወቅቱ መጨረሻ ያበቃል። |

AM missing for added EN keys: 0; AM keys without EN: 0

**`member` layer — 5 added, 0 retired**

| key | EN | AM |
| --- | --- | --- |
| `prim.guide.open` | Guide | መመሪያ |
| `prim.guide.what` | What this is | ይህ ምንድን ነው |
| `prim.guide.columns` | Each column | እያንዳንዱ ዓምድ |
| `prim.guide.how` | How to add, change or remove | እንዴት እንደሚጨመር፣ እንደሚቀየር ወይም እንደሚወገድ |
| `prim.guide.next` | What to do next | ቀጥሎ ምን ይደረግ |

AM missing for added EN keys: 0; AM keys without EN: 0

**`guide` layer — 80 added, 0 retired**

| key | EN | AM |
| --- | --- | --- |
| `admin.monetisation.markets.guide.what` | One row per country, plus a default row for any country without its own. Each row sets what sellers there get for free and whether paid levels are switched on. | በየሀገሩ አንድ ረድፍ፣ ከዚያም የራሱ ረድፍ ለሌለው ማንኛውም ሀገር ነባሪ ረድፍ። እያንዳንዱ ረድፍ እዚያ ያሉ ሻጮች በነጻ ምን እንደሚያገኙ እና የሚከፈልባቸው ደረጃዎች መብራታቸውን ይወስናል። |
| `admin.monetisation.markets.guide.col.market` | The country this row applies to; the default row covers every country without its own. | ይህ ረድፍ የሚመለከተው ሀገር፤ ነባሪው ረድፍ የራሱ ረድፍ የሌለውን እያንዳንዱን ሀገር ይሸፍናል። |
| `admin.monetisation.markets.guide.col.freeAds` | How many Regular ads a seller in this market may have live at no cost. | በዚህ ገበያ ያለ ሻጭ ያለ ክፍያ ስንት መደበኛ ማስታወቂያዎችን በአንድ ጊዜ ሊያስተላልፍ እንደሚችል። |
| `admin.monetisation.markets.guide.col.includedReach` | The reach every ad in this market gets without paying. | በዚህ ገበያ ያለ እያንዳንዱ ማስታወቂያ ሳይከፍል የሚያገኘው ተደራሽነት። |
| `admin.monetisation.markets.guide.col.paidLevels` | Whether sellers here can buy a higher level; off means every level is set at no cost. | እዚህ ያሉ ሻጮች ከፍ ያለ ደረጃ መግዛት ይችሉ እንደሆነ፤ ጠፍቶ ከሆነ እያንዳንዱ ደረጃ ያለ ክፍያ ይቀመጣል። |
| `admin.monetisation.markets.guide.col.launch` | The credits and the days of the free bundle every seller receives when paid levels are switched on. | የሚከፈልባቸው ደረጃዎች ሲበሩ እያንዳንዱ ሻጭ የሚቀበለው የነጻ ጥቅል ክሬዲቶች እና ቀናት። |
| `admin.monetisation.markets.guide.col.since` | The day paid levels were switched on here; blank while they are off. | እዚህ የሚከፈልባቸው ደረጃዎች የበሩበት ቀን፤ ጠፍተው እያሉ ባዶ ነው። |
| `admin.monetisation.markets.guide.col.createdBy` | Who added this row. | ይህን ረድፍ የጨመረው ማን ነው። |
| `admin.monetisation.markets.guide.col.updatedBy` | Who last changed this row. | ይህን ረድፍ በመጨረሻ የቀየረው ማን ነው። |
| `admin.monetisation.markets.guide.col.updated` | When this row last changed. | ይህ ረድፍ በመጨረሻ የተቀየረበት ጊዜ። |
| `admin.monetisation.markets.guide.how` | Add market opens a row for a country that has none; the default row cannot be removed. Edit changes a row; switching paid levels on needs a launch bundle (credits and days). A row is never deleted — switch paid levels off instead. | «ገበያ ጨምር» ረድፍ ለሌለው ሀገር ረድፍ ይከፍታል፤ ነባሪው ረድፍ ሊወገድ አይችልም። «አርትዕ» ረድፍን ይቀይራል፤ የሚከፈልባቸውን ደረጃዎች ማብራት የመክፈቻ ጥቅል (ክሬዲቶች እና ቀናት) ያስፈልገዋል። ረድፍ በፍጹም አይሰረዝም — በምትኩ የሚከፈልባቸውን ደረጃዎች ያጥፉ። |
| `admin.monetisation.markets.guide.next` | Check the levels sellers can buy and their perks. | ሻጮች ሊገዙ የሚችሉትን ደረጃዎች እና ጥቅሞቻቸውን ይመልከቱ። |
| `admin.monetisation.level.guide.what` | The levels an ad can have — Regular, Featured, Premium and any you add. A level sets how long an ad runs, how many photos it may carry, where it is placed and whether it wears a badge. Open a level to set its per-category perks and its prices. | ማስታወቂያ ሊኖረው የሚችለው ደረጃዎች — መደበኛ፣ የተለየ፣ ፕሪሚየም እና እርስዎ የሚጨምሩት ማንኛውም። ደረጃ ማስታወቂያ ምን ያህል እንደሚቆይ፣ ስንት ፎቶ እንደሚይዝ፣ የት እንደሚቀመጥ እና ምልክት እንደሚኖረው ይወስናል። የምድብ ጥቅሞቹን እና ዋጋዎቹን ለማስቀመጥ ደረጃውን ይክፈቱ። |
| `admin.monetisation.level.guide.col.name` | The name sellers see, in each language. | ሻጮች በየቋንቋው የሚያዩት ስም። |
| `admin.monetisation.level.guide.col.key` | The level's fixed identity in the system; it never changes once saved. | የደረጃው በስርዓቱ ውስጥ ያለው ቋሚ መለያ፤ አንዴ ከተቀመጠ በኋላ በፍጹም አይቀየርም። |
| `admin.monetisation.level.guide.col.days` | How many days the level runs by default. | ደረጃው በነባሪነት ስንት ቀን እንደሚቆይ። |
| `admin.monetisation.level.guide.col.photos` | How many photos an ad at this level may carry. | በዚህ ደረጃ ያለ ማስታወቂያ ስንት ፎቶ ሊይዝ እንደሚችል። |
| `admin.monetisation.level.guide.col.placement` | Where ads at this level appear: standard, boosted or at the top. | በዚህ ደረጃ ያሉ ማስታወቂያዎች የት እንደሚታዩ፦ መደበኛ፣ የጎላ ወይም በመጀመሪያ። |
| `admin.monetisation.level.guide.col.badge` | Whether ads at this level wear a badge. | በዚህ ደረጃ ያሉ ማስታወቂያዎች ምልክት እንደሚኖራቸው። |
| `admin.monetisation.level.guide.col.enabled` | Whether sellers can still get this level; off hides it everywhere. | ሻጮች ይህን ደረጃ አሁንም ማግኘት ይችሉ እንደሆነ፤ ጠፍቶ ከሆነ በየትም ቦታ አይታይም። |
| `admin.monetisation.level.guide.col.selfServe` | Whether a seller can buy this level alone, without staff. | ሻጭ ይህን ደረጃ ያለ ሠራተኞች ብቻውን መግዛት ይችል እንደሆነ። |
| `admin.monetisation.level.guide.col.extends` | Whether buying this level also extends the ad's lifetime. | ይህን ደረጃ መግዛት የማስታወቂያውን ቆይታም ያራዝም እንደሆነ። |
| `admin.monetisation.level.guide.col.sort` | The level's place in the order sellers see. | ሻጮች በሚያዩት ቅደም ተከተል ውስጥ የደረጃው ቦታ። |
| `admin.monetisation.level.guide.col.createdBy` | Who added this level. | ይህን ደረጃ የጨመረው ማን ነው። |
| `admin.monetisation.level.guide.col.updatedBy` | Who last changed this level. | ይህን ደረጃ በመጨረሻ የቀየረው ማን ነው። |
| `admin.monetisation.level.guide.col.updated` | When this level last changed. | ይህ ደረጃ በመጨረሻ የተቀየረበት ጊዜ። |
| `admin.monetisation.level.guide.how` | Add level creates a level with its key, names and perks. Edit changes everything but the key. A level is switched off, never removed, so ads that have it keep their history. Open a row to add per-category perks and prices for this level. | «ደረጃ ጨምር» በመለያው፣ በስሞቹ እና በጥቅሞቹ ደረጃ ይፈጥራል። «አርትዕ» ከመለያው በስተቀር ሁሉንም ይቀይራል። ደረጃ ይጠፋል እንጂ በፍጹም አይወገድም፤ ስለዚህ ያለው ማስታወቂያዎች ታሪካቸውን ይጠብቃሉ። ለዚህ ደረጃ የምድብ ጥቅሞችን እና ዋጋዎችን ለመጨመር ረድፉን ይክፈቱ። |
| `admin.monetisation.level.guide.next` | Set the reach products — where an ad is seen. | የተደራሽነት ምርቶችን ያስቀምጡ — ማስታወቂያ የት እንደሚታይ። |
| `admin.monetisation.reach.guide.what` | The reach products — how far an ad is seen: its city, the whole country or worldwide. A reach only has a duration; its perks come from the ad's level. Open a reach to set its prices. | የተደራሽነት ምርቶች — ማስታወቂያ እስከ የት እንደሚታይ፦ ከተማው፣ መላው ሀገር ወይም ዓለም አቀፍ። ተደራሽነት ቆይታ ብቻ አለው፤ ጥቅሞቹ ከማስታወቂያው ደረጃ ይመጣሉ። ዋጋዎቹን ለማስቀመጥ ተደራሽነቱን ይክፈቱ። |
| `admin.monetisation.reach.guide.col.name` | The name sellers see, in each language. | ሻጮች በየቋንቋው የሚያዩት ስም። |
| `admin.monetisation.reach.guide.col.key` | The reach's fixed identity in the system; it never changes once saved. | የተደራሽነቱ በስርዓቱ ውስጥ ያለው ቋሚ መለያ፤ አንዴ ከተቀመጠ በኋላ በፍጹም አይቀየርም። |
| `admin.monetisation.reach.guide.col.days` | How many days the reach runs. | ተደራሽነቱ ስንት ቀን እንደሚቆይ። |
| `admin.monetisation.reach.guide.col.enabled` | Whether sellers can still get this reach; off hides it everywhere. | ሻጮች ይህን ተደራሽነት አሁንም ማግኘት ይችሉ እንደሆነ፤ ጠፍቶ ከሆነ በየትም ቦታ አይታይም። |
| `admin.monetisation.reach.guide.col.selfServe` | Whether a seller can buy this reach alone, without staff. | ሻጭ ይህን ተደራሽነት ያለ ሠራተኞች ብቻውን መግዛት ይችል እንደሆነ። |
| `admin.monetisation.reach.guide.col.extends` | Whether buying this reach also extends the ad's lifetime. | ይህን ተደራሽነት መግዛት የማስታወቂያውን ቆይታም ያራዝም እንደሆነ። |
| `admin.monetisation.reach.guide.col.sort` | The reach's place in the order sellers see. | ሻጮች በሚያዩት ቅደም ተከተል ውስጥ የተደራሽነቱ ቦታ። |
| `admin.monetisation.reach.guide.col.createdBy` | Who added this reach. | ይህን ተደራሽነት የጨመረው ማን ነው። |
| `admin.monetisation.reach.guide.col.updatedBy` | Who last changed this reach. | ይህን ተደራሽነት በመጨረሻ የቀየረው ማን ነው። |
| `admin.monetisation.reach.guide.col.updated` | When this reach last changed. | ይህ ተደራሽነት በመጨረሻ የተቀየረበት ጊዜ። |
| `admin.monetisation.reach.guide.col.photos` | A reach has no photo limit; the level sets it. | ተደራሽነት የፎቶ ገደብ የለውም፤ ደረጃው ያስቀምጠዋል። |
| `admin.monetisation.reach.guide.col.placement` | A reach has no placement; the level sets it. | ተደራሽነት አቀማመጥ የለውም፤ ደረጃው ያስቀምጠዋል። |
| `admin.monetisation.reach.guide.col.badge` | A reach has no badge; the level sets it. | ተደራሽነት ምልክት የለውም፤ ደረጃው ያስቀምጠዋል። |
| `admin.monetisation.reach.guide.how` | Add reach creates a reach with its key, names and days; perks are refused on a reach. Edit changes everything but the key. A reach is switched off, never removed. Open a row to add its prices. | «ተደራሽነት ጨምር» በመለያው፣ በስሞቹ እና በቀናቱ ተደራሽነት ይፈጥራል፤ በተደራሽነት ላይ ጥቅሞች አይፈቀዱም። «አርትዕ» ከመለያው በስተቀር ሁሉንም ይቀይራል። ተደራሽነት ይጠፋል እንጂ በፍጹም አይወገድም። ዋጋዎቹን ለመጨመር ረድፉን ይክፈቱ። |
| `admin.monetisation.reach.guide.next` | Give every product a price in each market where paid levels are on. | የሚከፈልባቸው ደረጃዎች በበሩበት በእያንዳንዱ ገበያ ለእያንዳንዱ ምርት ዋጋ ይስጡ። |
| `admin.monetisation.levelOverrides.guide.what` | This level's perks for one main category, one country, or both. A blank cell keeps the level's own value. A subcategory follows its main category's row. | የዚህ ደረጃ ጥቅሞች ለአንድ ዋና ምድብ፣ ለአንድ ሀገር ወይም ለሁለቱም። ባዶ ክፍል የደረጃውን የራሱን እሴት ይጠብቃል። ንዑስ ምድብ የዋና ምድቡን ረድፍ ይከተላል። |
| `admin.monetisation.levelOverrides.guide.col.category` | The main category this row applies to, or every category. | ይህ ረድፍ የሚመለከተው ዋና ምድብ፣ ወይም እያንዳንዱ ምድብ። |
| `admin.monetisation.levelOverrides.guide.col.country` | The country this row applies to, or every country. | ይህ ረድፍ የሚመለከተው ሀገር፣ ወይም እያንዳንዱ ሀገር። |
| `admin.monetisation.levelOverrides.guide.col.days` | How many days the level runs here; blank keeps the level's default. | ደረጃው እዚህ ስንት ቀን እንደሚቆይ፤ ባዶ ከሆነ የደረጃውን ነባሪ ይጠብቃል። |
| `admin.monetisation.levelOverrides.guide.col.photos` | How many photos an ad may carry here; blank keeps the level's default. | ማስታወቂያ እዚህ ስንት ፎቶ ሊይዝ እንደሚችል፤ ባዶ ከሆነ የደረጃውን ነባሪ ይጠብቃል። |
| `admin.monetisation.levelOverrides.guide.col.placement` | Where ads appear here; blank keeps the level's placement. | ማስታወቂያዎች እዚህ የት እንደሚታዩ፤ ባዶ ከሆነ የደረጃውን አቀማመጥ ይጠብቃል። |
| `admin.monetisation.levelOverrides.guide.col.badge` | Whether ads wear the badge here; blank keeps the level's setting. | ማስታወቂያዎች እዚህ ምልክቱን እንደሚኖራቸው፤ ባዶ ከሆነ የደረጃውን ቅንብር ይጠብቃል። |
| `admin.monetisation.levelOverrides.guide.col.createdBy` | Who added this row. | ይህን ረድፍ የጨመረው ማን ነው። |
| `admin.monetisation.levelOverrides.guide.col.updatedBy` | Who last changed this row. | ይህን ረድፍ በመጨረሻ የቀየረው ማን ነው። |
| `admin.monetisation.levelOverrides.guide.col.updated` | When this row last changed. | ይህ ረድፍ በመጨረሻ የተቀየረበት ጊዜ። |
| `admin.monetisation.levelOverrides.guide.how` | Add override picks the category and the country and sets at least one cell. Edit changes the cells. Clear (red) removes the row and ads fall back to the level's own perks. When a category and a country both have rows, the row naming both wins, then the country's, then the category's. | «የምድብ ጥቅም ጨምር» ምድቡን እና ሀገሩን መርጦ ቢያንስ አንድ ክፍል ያስቀምጣል። «አርትዕ» ክፍሎቹን ይቀይራል። «አጥፋ» (ቀይ) ረድፉን ያስወግዳል እና ማስታወቂያዎች ወደ ደረጃው የራሱ ጥቅሞች ይመለሳሉ። ምድብ እና ሀገር ሁለቱም ረድፎች ሲኖራቸው ሁለቱንም የሚጠቅሰው ረድፍ ያሸንፋል፣ ከዚያ የሀገሩ፣ ከዚያ የምድቡ። |
| `admin.monetisation.levelOverrides.guide.next` | Add this level's prices. | የዚህን ደረጃ ዋጋዎች ይጨምሩ። |
| `admin.monetisation.productPrices.guide.what` | What this product costs, by market and category, for a window of time. Sellers pay in credits; the money amount is kept for checkout later. Without a valid price a seller cannot buy this product in that market. | ይህ ምርት በገበያ እና በምድብ፣ ለተወሰነ ጊዜ ምን ያህል እንደሚያስከፍል። ሻጮች በክሬዲት ይከፍላሉ፤ የገንዘቡ መጠን ለኋላ ክፍያ ተጠብቆ ይቀመጣል። ትክክለኛ ዋጋ ከሌለ ሻጭ በዚያ ገበያ ይህን ምርት መግዛት አይችልም። |
| `admin.monetisation.productPrices.guide.col.scope` | The market and the category this price covers; Every market and Every category are the fallbacks. | ይህ ዋጋ የሚሸፍነው ገበያ እና ምድብ፤ «እያንዳንዱ ገበያ» እና «እያንዳንዱ ምድብ» መጠባበቂያዎቹ ናቸው። |
| `admin.monetisation.productPrices.guide.col.amount` | The money price, or Free at 0. | የገንዘብ ዋጋው፣ ወይም 0 ሲሆን ነጻ። |
| `admin.monetisation.productPrices.guide.col.creditCost` | How many credits a seller spends on this product. | ሻጭ በዚህ ምርት ላይ ስንት ክሬዲት እንደሚያወጣ። |
| `admin.monetisation.productPrices.guide.col.from` | The day this price starts. | ይህ ዋጋ የሚጀምርበት ቀን። |
| `admin.monetisation.productPrices.guide.col.to` | The day this price ends; Open-ended means no end is set. | ይህ ዋጋ የሚያበቃበት ቀን፤ «ክፍት» ማለት መጨረሻ አልተቀመጠም ማለት ነው። |
| `admin.monetisation.productPrices.guide.col.used` | How many times sellers have paid this price; a used price can no longer be edited. | ሻጮች ይህን ዋጋ ስንት ጊዜ እንደከፈሉ፤ ጥቅም ላይ የዋለ ዋጋ ከእንግዲህ ሊስተካከል አይችልም። |
| `admin.monetisation.productPrices.guide.col.createdBy` | Who added this price. | ይህን ዋጋ የጨመረው ማን ነው። |
| `admin.monetisation.productPrices.guide.col.updatedBy` | Who last changed this price. | ይህን ዋጋ በመጨረሻ የቀየረው ማን ነው። |
| `admin.monetisation.productPrices.guide.col.updated` | When this price last changed. | ይህ ዋጋ በመጨረሻ የተቀየረበት ጊዜ። |
| `admin.monetisation.productPrices.guide.how` | Add price picks the market, the category and the window; two prices of one scope never overlap in time. Edit is possible while the price is unused and live. End (red) closes a live price today — the row stays as a record. Nothing here is computed: the most specific valid row is the one a seller pays. | «ዋጋ ጨምር» ገበያውን፣ ምድቡን እና ጊዜውን ይመርጣል፤ የአንድ ወሰን ሁለት ዋጋዎች በጊዜ በፍጹም አይደራረቡም። ዋጋው ጥቅም ላይ ሳይውል እና ንቁ እያለ «አርትዕ» ይቻላል። «አብቃ» (ቀይ) ንቁ ዋጋን ዛሬ ይዘጋል — ረድፉ እንደ መዝገብ ይቆያል። እዚህ ምንም አይሰላም፦ ሻጭ የሚከፍለው በጣም የተለየው ትክክለኛ ረድፍ ነው። |
| `admin.monetisation.productPrices.guide.next` | Check the free plan's posting caps. | የነጻውን ዕቅድ የመለጠፍ ገደቦች ይመልከቱ። |
| `admin.monetisation.caps.guide.what` | The free plan's limits for every seller until the levels take them over: how many places an ad may cover, how many photos it may carry, how long it runs and how many ads a seller may have live. | ደረጃዎቹ እስኪረከቧቸው ድረስ ለእያንዳንዱ ሻጭ የነጻው ዕቅድ ገደቦች፦ ማስታወቂያ ስንት ቦታዎችን ሊሸፍን እንደሚችል፣ ስንት ፎቶ እንደሚይዝ፣ ምን ያህል እንደሚቆይ እና ሻጭ ስንት ማስታወቂያዎችን በአንድ ጊዜ ሊያስተላልፍ እንደሚችል። |
| `admin.monetisation.caps.guide.col.plan` | The plan these limits belong to; today the free plan. | እነዚህ ገደቦች የሚመለከቱት ዕቅድ፤ ዛሬ ነጻው ዕቅድ። |
| `admin.monetisation.caps.guide.col.cities` | How many cities one ad may cover. | አንድ ማስታወቂያ ስንት ከተሞችን ሊሸፍን እንደሚችል። |
| `admin.monetisation.caps.guide.col.regions` | How many regions one ad may cover. | አንድ ማስታወቂያ ስንት ክልሎችን ሊሸፍን እንደሚችል። |
| `admin.monetisation.caps.guide.col.countries` | How many countries one ad may cover. | አንድ ማስታወቂያ ስንት ሀገሮችን ሊሸፍን እንደሚችል። |
| `admin.monetisation.caps.guide.col.photos` | How many photos an ad may carry; the posting form reads this today. | ማስታወቂያ ስንት ፎቶ ሊይዝ እንደሚችል፤ የመለጠፍ ቅጹ ዛሬ ይህን ያነባል። |
| `admin.monetisation.caps.guide.col.days` | How many days an ad runs when its category sets no lifetime. | ምድቡ ቆይታ ሳያስቀምጥ ሲቀር ማስታወቂያ ስንት ቀን እንደሚቆይ። |
| `admin.monetisation.caps.guide.col.ads` | How many ads a seller may have live at once; Unlimited means no cap. | ሻጭ ስንት ማስታወቂያዎችን በአንድ ጊዜ ሊያስተላልፍ እንደሚችል፤ «ያልተገደበ» ማለት ገደብ የለም ማለት ነው። |
| `admin.monetisation.caps.guide.col.everywhere` | Whether an ad may be shown everywhere at once. | ማስታወቂያ በሁሉም ቦታ በአንድ ጊዜ ሊታይ ይችል እንደሆነ። |
| `admin.monetisation.caps.guide.col.updated` | When these limits last changed. | እነዚህ ገደቦች በመጨረሻ የተቀየሩበት ጊዜ። |
| `admin.monetisation.caps.guide.how` | Edit caps changes every limit in one dialog; a limit below its minimum is refused. Plans are neither added nor removed here. | «ገደቦች አርትዕ» እያንዳንዱን ገደብ በአንድ መስኮት ይቀይራል፤ ከዝቅተኛው በታች ያለ ገደብ አይፈቀድም። ዕቅዶች እዚህ አይጨመሩም አይወገዱምም። |
| `admin.monetisation.caps.guide.next` | You are done here. Go back to Markets to switch paid levels on for a country. | እዚህ ጨርሰዋል። ለአንድ ሀገር የሚከፈልባቸውን ደረጃዎች ለማብራት ወደ ገበያዎች ይመለሱ። |

AM missing for added EN keys: 0; AM keys without EN: 0

## 9. Migrations

none — FLAG `no-migration`; `git diff --name-only 917cbe4fa -- supabase` is empty.

## 10. Departures

- **The public pages grew by 0.13 KiB gz** (the guide loaders in the provider's chunk +86 B, the
  gate's `layers` prop +48 B) against the brief's lens "nothing public moves" — stop 1; **ruling 2
  §1** accepted it with its cause ("the growth axis 'more layers' paid where the mechanism lives").
- **`scripts/check-bundle-size.mjs` touched** (the entry's ceiling 213 → 214) — outside the brief's
  SCOPE; **ruling 2 §2** extended SCOPE by that one line.
- **Two defects fixed beyond the brief's numbered changes**, found by the browser walk — **ruling 2
  §3** files them: INC-1046 (the expansion in both twins; `use-drawn-twin.ts`, HS-28; pre-existing
  for four consumers, §4) and INC-1047 (the control's own `onClick` bypassed `SheetTrigger`).
- `StringsLayerGate` reads the route's layers through `useRouterState({ select })` instead of
  `useMatches`, and the gate sits in `block-guide.tsx` around the sheet's `Suspense`, not in the
  sheet — measured: the sheet importing the gate split TanStack's `Match` and `load-client` out of
  the entry (+1.5 KiB on every page); the chosen shape costs the 134 bytes above.
- `prim.orderStrip.*` placed in the admin layer and `prim.guide.*` in the member layer (the plan said
  base / guide) — CF-SL-1's placement by the routes that draw them (`/my-listings` draws
  `data-table.tsx`; only admin draws the strip).
- `admin.monetisation.col.level` / `col.product` kept (the plan retired them): they label the
  read-only `-level` / `-product` lines of the dialogs opened inside a product.
- Sixteen allowlist lines, not the plan's fifteen: `admin-ai/ai-calls.tsx` draws its own table.
- Three public/band page ceilings raised (`/auth_/callback`, `/post`, `/post_/$listingId`) and
  `/admin/legal` — the shared root growth put them at the band's edge; each line carries the cause.
- `seedProduct` gained a `sort` dial (MON-16 needs its product first by sort); MON-17's expectation
  is computed from the rows (`unpricedPairs`) rather than asserted as Set — staging holds other
  unpriced pairs.
- AG-1 reads Audit's and Legal's own frames (K2) instead of a uniform `admin-section-<id>`.
- `monetisation-page.test.tsx` fixture `placement: "boosted"` → `"boost"` (a typecheck error in my
  own draft, not a product change).
- The temporary measurement spec for the 360 toolbars lived under `/tmp` and ran once beside the
  guides spec; it was never committed (the guides spec then ran alone on the final tree, §5).
- Stop 1 (`fdb741f38`) and ruling 2 — the turn's one STOP.

**The 360 toolbars (ruling: measured in the E2E build, `mobile-360`).** Every toolbar is 296 px
wide inside its card (272 px for a product's inner tables); the Guide tile is 44 × 44 at the end
(x 308–352 of 360); where a search exists it sits on the SAME row as the tile (no wrap) and above
`min-w-40`'s 160 px floor:

| block | toolbar | search | Guide tile | same row |
| --- | --- | --- | --- | --- |
| `admin-monetisation-markets` | 296 px | none | 44 × 44 | — |
| `admin-monetisation-level` | 296 px | none | 44 × 44 | — |
| `admin-monetisation-reach` | 296 px | none | 44 × 44 | — |
| `admin-monetisation-caps` | 296 px | none | 44 × 44 | — |
| `product-<level>-perks` (open row) | 272 px | none | 44 × 44 | — |
| `product-<level>-prices` (open row) | 272 px | 168 × 44 | 44 × 44 | yes |
| `/admin/users` (a search-bearing console; its Columns tile — no Guide until turn (b)) | 296 px | 192 × 44 | Columns 44 × 44 | yes |

At 1280 the same toolbars are 992 / 968 px, the search 320 × 36, the Guide tile 91 × 36 with its
word. `expectNoHorizontalOverflow` passed on every admin section at 360 (AG-1), the open product
included.

**h1 / h2 (finding 2).** `"h2"` is passed by `markets-section.tsx`, `products-section.tsx` (levels
and reach), `caps-section.tsx`, `level-overrides-table.tsx`, `product-prices-table.tsx`; the page's
one h1 is `monetisation-page.tsx` :72; MNP-1 asserts one h1 before and after a product opens; MON-1
asserts one h1 in the browser.

**Budgets (`scripts/route-budgets.mjs`, every line `ceilingForLocal(size)` with its cause; the
sizes are the final tree's, measured against the base 917cbe4fa built on the same machine).** Every
DataTable page grew by D313's Guide (+1.3–1.5 KiB: the control, the Sheet facade's shell, the gate
and `resilientLazy` around the on-demand body, the toolbar clone) and INC-1046's hook (+0.3):
`/admin/ai` 325 → 327 (326.1), `/admin/attributes` 339 → 340 (339.5), `/admin/audit` 298 → 300
(299.1), `/admin/categories` 347 → 348 (347.5), `/admin/countries` 328 → 330 (329.0),
`/admin/listings` 348 → 349 (348.4), `/admin/listings_/$listingId` 390 → 393 (391.9; + `en.ts`
whole), `/admin/monetisation` 334 → 339 (338.2; the strip, the expansion, the inner tables, six
guides' specs), `/admin/places` 330 → 331 (330.5), `/admin/roles` 295 → 297 (296.0),
`/admin/roles_/$roleId` 316 → 319 (318.0), `/admin/screening` 369 → 371 (370.2),
`/admin/translations` 406 → 413 (412.1; + `en.ts` and `am.ts` whole, +5.9),
`/admin/translations_/$lang` 310 → 311 (310.4), `/admin/users` 295 → 297 (295.7),
`/dev/primitives` 231 → 234 (233.3), `/dev/style` 251 → 254 (252.8), `/my-listings` 318 → 320
(319.0); the band's edge from the root growth (+0.13 on every page): `/auth_/callback` 214 → 215
(213.7), `/post` and `/post_/$listingId` 405 → 406 (404.6), `/admin/legal` 286 → 287 (285.6); the
entry JS (`check-bundle-size.mjs`) 213 → 214 (212.6; base 212.5). The public pages: `/` 230.7 →
230.9, `/c/$slug` 230.7 → 230.9, `/$name` 228.7 → 228.8, `/l/$slug` 261.1 → 261.2, `/legal/$kind`
217.2 → 217.3, `/privacy` and `/terms` 217.1 → 217.3, `/auth` 225.3 → 225.4 — inside their
ceilings, no other line moved. `bun run build && node scripts/check-bundle-size.mjs` on the final
tree: `Bundle budget OK.`

## 11. CI

The base's CI (`git fetch origin ci-evidence && git show origin/ci-evidence:docs/tracking/ci-status.md
| head -6`; its sha equals `git rev-parse origin/dev` = `71107be62…`, the brief's base — the two-step
check):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `71107be62b0340efa3d7a7b924c1886fe0ec2d6c` (short `71107be`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-03T15:38:09Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41662230025
```

No red of an earlier turn to fix. `origin/dev` did not move during the task (`git log
917cbe4fa..origin/dev` empty at the push). This pull request's own runs: none had completed when this report was committed (the first run
on this branch starts with its push; the draft had no run). Any red of its runs — its class (rule
40), its cause and the fixing commit, and any re-run with its reason — is added here in the commit
that fixes it; the "every check green" line goes in the pull request's comment, not here.

## 12. Limits

- NH-6 (`scripts/ci/nightly-hour.test.ts`) is red on this macOS (it cannot resolve New York's
  zone); red on the base tree too; CI on Linux judges it. The pinned actionlint and gitleaks
  binaries are Linux builds and cannot run here (checksums OK); no workflow changed; the secret sweep
  was done by reading each staged diff.
- Browser tests ran against ethio-staging with the E2E values in my environment (names checked,
  values never read); the first attempt failed before the browser started (the sandbox's
  `PLAYWRIGHT_BROWSERS_PATH`), fixed by pointing it at the installed Chromium — no spec change.
- Only the two touched specs ran locally. The shared primitive (`DataTable`, `TableActions`,
  `TableToolbar`, `StringsLayerGate`) touches every admin console, My listings, the shell's tables and
  the dev pages; their specs (`shell-table-law`, `phone-frame`, `admin-shell`, the admin consoles'
  own) were not run locally — CI's sixteen lanes are the proof.
- The 360 toolbar measurements come from a temporary spec (one run, both projects) that is not in
  the repository; the numbers are pasted from its output.
- Semgrep did not run locally (behind the laws red in the runner); CI's semgrep job judges.
- Nothing was applied to any database; the only writes were the browser tests' scratch rows on
  ethio-staging, made and removed by the harness.
