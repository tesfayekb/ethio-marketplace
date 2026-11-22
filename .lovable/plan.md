# Lovable Bundle 3 — filters in rows, one kept view per account, the pin's first-time gate

CI (last completed, read first): `9d9748da3` — SUCCESS, run 45013403588. Base `9d9748da3` (all reads below are `git show 9d9748da3:<path>`). Branch `lovable/next`. Nothing changed in this turn.

## (a) The census

Eleven panels (`<panel>` = FiltersButton testid). "Kept" = goes to the account's store.

| Panel | Filter testid | Today | Becomes | One/several | Reader field (door list?) | Kept |
|---|---|---|---|---|---|---|
| ai-calls-filters | ai-calls-feature | pills | FilterSelect | one | page state `feature` (client) | yes |
| ai-calls-filters | ai-calls-outcome | pills | FilterSelect | one | `outcome` (client) | yes |
| category-filters | category-missing-filter | one pill toggle | one switch (the control itself, keeps `aria-pressed`) | one | `missingOnly` (client) | yes |
| country-filters | country-status-filter (CountryFilters, countries-toolbar.tsx) | pills | FilterSelect | one | `status` (client) | yes |
| listings-filters | listings-filter-country | pills | FilterSelect multiple | several | `AdminListingFilters.country` → `p_country` (list) | yes |
| listings-filters | listings-filter-category | pills | FilterSelect multiple | several | `.category` → `p_category` (list) | yes |
| listings-filters | listings-filter-seller | hand-drawn Input | shared Seller row (FilterText) | one | `.seller` → `p_seller` | NO (typed) |
| listings-filters | listings-filter-from / -to | hand-drawn DateField pair | FilterDates `testId="listings-filter"` (ids unchanged) | one pair | `.from/.to` | yes |
| listings-filters | listings-filter-tier | pills | FilterSelect | one | `tier` | yes |
| location-filters | location-level-filter (LocationFilters) | pills | FilterSelect | one | `level` (client) | yes |
| location-filters | location-active-filter | pills | FilterSelect | one | `status` (client) | yes |
| admin-screening-filters | admin-screening-filter-country | pills | FilterSelect multiple | several | `ScreeningFilters.country` → `p_country` (list) | yes |
| admin-screening-filters | admin-screening-filter-tier | pills | FilterSelect | one | `.tier` → `p_tier` (one) | yes |
| admin-screening-filters | admin-screening-filter-seller (NEW, Part D) | — | shared Seller row | one | `.seller` → `p_seller` (exists) | NO |
| audit-filters | audit-filter-action | pills | FilterSelect | one | `action` | yes |
| audit-filters | audit-filter-entity | pills | FilterSelect | one | `entityType` | yes |
| audit-filters | audit-filter-from / -to | hand-drawn pair | FilterDates `testId="audit-filter"` | pair | `from/to` | yes |
| data-filters | data-status-filter | pills | FilterSelect | one | `activeStatus` | yes |
| strings-filters | strings-status-filter | pills | FilterSelect | one | `filterValue` | yes |
| users-filters | users-status-filter | pills | FilterSelect | one | `status` | yes |
| users-filters | users-role-filter | pills | FilterSelect | one | `role` | yes (role key, closed list) |
| my-listings-filters | my-listings-filter-category | pills | FilterSelect multiple | several | `MyListingsFilters.category` → `p_category` (list) | yes |
| my-listings-filters | my-listings-filter-mark | pills | FilterSelect | one | `.mark` | yes |

Search boxes outside the panels (the table's search) are typed: never kept.

`FilterChoices` NOT in a Filters panel — left as they are: `listings-view` (listings-page.tsx:620, view switch), `listings-tier-pick` (tier-dialog.tsx:139, dialog choice), `${testid}-reason` (reason-note.tsx:58, dialog choice), `strings-scope` (strings-page.tsx:312, scope switch), `my-listings-group` (my-listings-page.tsx:690, group switch). The Locations market picker (locations-toolbar.tsx:12–14) is the scope, stays one market. The board's `style-filters-colour/-size` (dev.style.tsx:1189/1199) are the board's own panel: they become rows (see THE BOARD).

## (b) The kept view

New module `src/components/shell/table-view-store.ts` (one store; on-demand-free, tiny, no `@/i18n`, no door).
- Key: `ethio:view:<accountId>:<tableId>` in `localStorage`.
- Entry schema (zod, `.strict()`): `{ v: 1, hidden?: string[] (≤50, each ≤64 chars), pageSize?: int, filters?: Record<filterKey, string[] (≤20 each, each ≤64 chars)> }`. Dates are kept as `["YYYY-MM-DD"]` checked by regex.
- Each table passes its offer: column keys it has, its page sizes, and per filter its allowed values (today's options; dates by shape). Read back = parse → intersect with today's offer → unknown filter keys, retired values, bad sizes dropped. A parse failure reads as nothing. Storage that throws reads/writes as nothing (no error shown, per brief; these `catch` blocks are the brief's own rule, named in Part G's list).
- Account: `useAuth().user?.id` (imported, not edited). `loading` or no user → nothing read or written; state lives for the visit. Sign-out never removes the entry; another account reads its own key only.
- Server render and first browser render: both draw the defaults with the table's box held ("pending"). After mount, once `useAuth` settles, the store reads once and marks the view `ready`. Each page's query is `enabled: ready` (its existing query, no new read), so no unfiltered request leaves first. Signed out → ready at once with defaults.
- Old keys: `ethio:table-columns:<table>` and each page's page-size key are read once (when the account has no entry), written into the account entry, then removed.
- API: `useTableView(tableId, offer)` → `{ ready, hidden, setColumn, pageSize, setPageSize, filters, setFilter, clearFilters }`. `useHiddenColumns` and `useKeptPage` stay as thin readers over it (same names and signatures + `ready`), because `scripts/admin-tables.ts` T3/T6 match those names in every consumer (Cursor's file; untouched).
- Consumers of the two old stores (22 files, all move in Part A): ai-calls, ai-page, attributes-page, categories-page, countries-page, listings-page, locations-page, level-overrides-table, markets-section, product-prices-table, products-section, name-checks, screening-page, audit-page, impersonation-view, roles-list, data-scope, languages-page, strings-page, users-list, my-listings-page; plus tests columns-button.test.tsx, use-kept-page.test.ts.

## (c) The words (English only; Amharic from the supervisor)

New, base layer (shared by admin and My listings):
- `prim.filter.search` — "Search the list"
- `prim.filter.none` — "Nothing matches"
- `prim.filter.max` — "Up to 20 choices"  (help line under a full multi-select)
Placeholder of every select: existing `prim.table.all` "All" (member layer; flagged in (h) if a select draws where member is not declared — none found).
Pin (member layer):
- `post.pin.chooseShow` — "Choose how the pin shows on your ad" (the closed Save's missing line)
Screening (admin layer), reused not added: column header `admin.listings.col.seller`, row label `admin.listings.filter.seller`, placeholders `admin.listings.filter.sellerPlaceholder` / `…PlaceholderEmail`.
No key changed or retired.

## (d) The tests

Changed unit tests: columns-button.test.tsx, use-kept-page.test.ts, filter-chips / toolbar-panel tests, use-admin-listings.test.ts, use-admin-listing.test.ts, use-screening.test.ts, my-listings.test.ts (list-of-one becomes list), each of the eleven pages' own tests that click a pill, map-pin-dropper test (starts with no choice), screening-page tests.
New (ids by the supervisor): store parse/drop/retired value/broken entry/refusing storage/signed-out no-write/other account isolated/old-key migration-and-removal/query waits for ready; select max 20 (21st unavailable, not sent); chip removal per value; filter change returns to first page; past-end page asks first page; pin new = no choice, closed Save scrolls and marks, saved pin open; screening reopen failure shows refusal; shared Seller cell and row on both tables; e-mail drawn only when answered.

Browser assertions made false (lines unchanged until the ruling names them):
- e2e/admin-audit.spec.ts:137 and :141 — `audit-filter-action-all` / `-entity-all` `aria-pressed=true`. New: open the select (`audit-filter-action`), expect `audit-filter-action-all` `aria-selected="true"`; or expect the control's text "All".
- e2e/admin-users.spec.ts:523 and :527 — same, `users-status-filter-all` / `users-role-filter-all`.
- e2e/admin-roles.spec.ts:69 — `users-role-filter-<name>` `aria-pressed`: open `users-role-filter` first, then `aria-selected`.
- e2e/admin-screening.spec.ts:513 region (`admin-screening-filter-country-<code>` read as pills) and :1465 region (`…-tier-<value>`): choices only visible after opening the control; state via `aria-selected`.
- e2e/admin-categories-console.spec.ts:738 — `category-missing-filter` `aria-pressed`: UNCHANGED (the switch keeps `aria-pressed`).
- e2e/house-style.spec.ts:186–187 — board's `style-filters-colour-Red` `aria-pressed`: open `style-filters-colour` first, `aria-selected`.
- Not affected: admin-listings.spec.ts:746 (`listings-view`), my-listings-page.spec.ts:337/:382 (`my-listings-group`), pin specs (all already call `choosePinShow`; post-wizard-bundle2.spec.ts:428 `toBeDisabled` is the busy state, which stays disabled).

## (e) Exported types changed

- `AdminListingFilters.country`, `.category`: `string | null` → `readonly string[]` (use-admin-listings.ts). Readers: listings-page.tsx, use-admin-listings.test.ts, use-admin-listing.test.ts. Outside my folders: none in src/scripts/e2e (only docs prose).
- `ScreeningFilters.country`: → `readonly string[]`; `NO_SCREENING_FILTERS` follows. Readers: screening-page.tsx, use-screening.test.ts. Outside: none.
- `MyListingsFilters.category`: → `readonly string[]`; `NO_FILTERS` follows. Readers: my-listings-page.tsx, my-listings.test.ts. Outside: none.
- `useKeptPage` / `useHiddenColumns` return gains `ready` (additive). `scripts/admin-tables.ts` reads the names only.
- `DataTablePagination` gains optional `settled?: boolean` (Part F). Additive.
- New exports: `useTableView`, `TableViewOffer`, `SellerCell`, `SellerFilterRow`.

## (f) First download

FilterRow/Select/Text/Dates are imported by the panel body only; the panel is already drawn inside `FiltersButton`'s on-demand overlay, so the parts ride the panel's chunk, never the page's. The store is small and imported by the pages (it decides the first read), so it lands in each table page's chunk (admin pages and /my-listings). The eleven pages' numbers are measured from the build in build turn A (the plan turn runs no build); any growth is listed chunk by chunk, and the ceiling lines come from the supervisor (DEC-390).

## (g) Outside my reach (for Cursor)

- `scripts/admin-tables.ts` T3/T6 keep matching `useHiddenColumns(` / `useKeptPage(`; if the supervisor prefers the guard to name `useTableView`, that is Cursor's edit.
- `e2e/helpers/filters.ts` `chooseFilter` needs no change (row control → choice; Escape twice).
- No door, read or route changes; `src/lib/**`, `src/features/auth/**` untouched.
- Spec lines in (d) once ruled.

## (h) Conflicts and findings at the base

1. Pin Save is also `disabled` when no pin is placed (`position === null`, :595). The brief names only the choice; I propose the closed primary covers both (missing line "Place the pin on the map" would be one more key) — or keep `position === null` disabled. Ruling needed.
2. Screening Seller placeholder: All listings switches to the e-mail placeholder by a permission it holds; the screening screen must "never ask". Proposal: screening uses the plain placeholder always.
3. Empty `catch` in storage helpers (columns-state.ts:18/26, use-kept-page.ts:28/38) are the brief's own "storage that refuses is not an error"; they move into the store and stay as named exceptions.
4. "ONE READ" makes every table's first query wait for `useAuth` to settle — a small delay on each admin table; this is the brief's rule.
5. `chooseFilter` step 3: a multi-select stays open after a pick, so Escape closes the list, then the panel (two presses) — matches the helper.

## Part G class — empty `catch` in touched files

- screening-page.tsx:301 (readScreeningRow) — FIXED: failure goes through `readFailure`/refusal reader into the page's notice.
- my-listings-page.tsx:396 and :434 — not empty: they show `myListings.error.failed`. Left.
- columns-state.ts:18/26, use-kept-page.ts:28/38 — named reason above (storage refusal is not an error).
- All other `catch (error)` in touched files surface the error. Left.

## (i) Build order

1. Part A — store + thin hooks + 22 consumers + old-key migration + query waits for ready. Green: all src suites, store tests.
2. Part B — every panel in rows, chips per value, first page on change; board. Green: page tests; stop for the spec-line ruling.
3. Part C — the three readers to lists, max 20.
4. Part D — shared Seller cell and row on both tables.
5. Part E — pin gate.
6. Parts F and G — past-end page; screening read failure.
7. Last — i18n:usage + diff, write-back from `9d9748da3` committed and proven at HEAD, supervisor's ceiling lines.
