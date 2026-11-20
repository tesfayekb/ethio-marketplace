# L19 table-cards — plan (INC-1219)

CI: not read in this plan turn; the build turn opens with the CI line for `cea51009a`.
Branch `lovable/table-cards` (sandbox `edit/<id>`), base dev `cea51009a` (the tree's HEAD, "Merge pull request #78 … table-widths-2").

## (a) Where each fault comes from (`src/components/shell/data-table.tsx`)

1. Headers: `<th>` classes are `cellClass(...)` (:267-285: `p-3 align-top`, align, tier, sticky, minWidth) + `font-semibold` (:945-948), width from `shareStyle(column.size)` (:949). Nothing lets a word break, so in `table-fixed` (:919) a word wider than its share ("Placement") spills over the next cell. The sort button (:959-965) is `min-h-11 text-start …` with no wrap rule either.
2. Bare pill: badges are collected by `shown(badgeColumns)` (:758) and drawn at :819-825 as `<Fragment>{value}</Fragment>`: no `label(column)` at all, unlike metas (:797-813).
3. Empty values: `shown()` (:749-755) drops only `null`, `undefined`, `false`. `attributionColumns` (monetisation-columns.tsx:27-46) returns `<span data-testid=…>{row.createdByName ?? ""}</span>` — an element with empty text, so it passes `shown()`; the foot (:887-897) then draws its label and the `·` (:891). Markets' `since` (markets-section.tsx:125-135) and `launch` (:111-123) do the same with `""` → "Paid since" with no value.

## (b) The fixes

1. Shared, data-table.tsx only: the `<th>` gets `break-words` (`overflow-wrap: break-word`) and `whitespace-normal`; the sort `<button>` gets the same plus `max-w-full`. Lines break between words first; a single word longer than its share breaks inside the cell instead of spilling. Cells' rules (CutText, text measure) untouched; minWidth tables (auto layout) unaffected.
2. Choice **(a)**: move the badge columns whose value does not name itself to `meta` in their screen, where the card already draws their header. Reason: `card` placement is already the per-column declaration of "this value names itself"; a shared rule would need either a new prop (a second mechanism, G0) or would label every status pill ("Status: Active"), which the brief says may stay bare. Four screen lines change (`card: "badge"` → `card: "meta"`), nothing else in them.
3. Shared, data-table.tsx: a pure helper `rendersNothing(node)` (local to the table): true for null/undefined/false/""/whitespace string, an array whose items all render nothing, and an intrinsic element (`typeof type === "string"`) whose `children` render nothing. Components (TipBadge, Badge, CutText…) count as present. `shown()` filters with it, so an empty value drops with its label and its separator in sub, meta, badge and foot alike; separators are already only between kept items. No screen cell changes: the table keeps its `data-testid` span (e2e reads it), so the shared rule is preferred over returning `null`.

## (c) Tables that change visibly

Header wrap: every fixed-layout table (all DataTable users without `minWidth`) — only where a header was wider than its share today; widest effect on Monetisation Levels/Markets/Prices, AI, translations.
Empty-value rule: Monetisation Levels, Reach, Markets, Prices (attribution foot; Markets' Paid since and Launch bundle); any other cell returning an empty intrinsic element (none other found in this census).

Badge census (`rg -n 'card: "badge"' src`):

| File:line | Column | Value | Verdict |
|---|---|---|---|
| admin-monetisation/products-section.tsx:257 | Enabled | On/Off | does not → meta |
| admin-monetisation/markets-section.tsx:108 | Paid levels | On/Off | does not → meta |
| admin-ai/ai-page.tsx:127 | State | On/Off | does not → meta |
| admin-monetisation/product-prices-table.tsx:129 | Amount | money / "Free" | does not (number) → meta |
| admin-ai/ai-calls.tsx:86 | Outcome | Answered, Timed out… | names itself |
| admin-locations/locations-page.tsx:215 | Status | Active/Retired | names itself |
| admin-listings/listings-page.tsx:485 | Status | listing status word | names itself |
| admin/users/users-list.tsx:164 | Status | account status | names itself |
| admin-countries/countries-page.tsx:139 | Status | Open/Closed | names itself |
| admin/translations/data-scope.tsx:404 | Status | review status (+Flagged) | names itself |
| admin/translations/strings-page.tsx:617 | Status | review status (+Flagged) | names itself |
| admin-categories/categories-page.tsx:509 | Status | Active/Retired… | names itself |
| admin-categories/categories-page.tsx:544 | Flags | Catch-all, Accepts listings… | names itself |
| admin/impersonation/impersonation-view.tsx:108 | Status | stored status word | names itself |
| admin/roles/roles-list.tsx:98 | Kind | System/Custom | names itself |
| components/shell/data-table.test.tsx:365 | fixture Status | Active/Retired | names itself |

## (d) Tests (data-table.test.tsx, DTK family; DTK-7 is the highest in use, DTK-8…10 free — re-checked by `rg -n "DTK-(8|9|10)\b" src e2e scripts` before writing)

- DTK-8: fixed table, short column with a long header: the `<th>` and its sort button carry the wrap classes (`toHaveClass("break-words","whitespace-normal")`); a minWidth table is unchanged.
- DTK-9: a column in `meta` with an On/Off value draws its header beside it in the card; a `badge` status draws bare.
- DTK-10: a foot of three columns where two return `<span></span>` / `""`: no label and no `·` for them; the third draws alone without a separator; same for a meta fact.
No compiler directive; classes and DOM asserted at runtime.

## (e) Specs and unit tests that see it

- e2e/admin-monetisation.spec.ts:711, :714 (created-by/updated-by `toHaveText` — rows with names, still present), :749 (`product-…-enabled` text), :1046/:1051 (price amount), :1270/:1299 (`market-…-paid-levels`); e2e/admin-services.spec.ts:297, :300 (`ai-…-state`); e2e/primitives-law.spec.ts:262 (name header). Testids and text unchanged; only the card place moves — none reads the card's slot. Not edited.
- Unit: ai-page.test.tsx:100/:106 (state text, unchanged); data-table.test.tsx:365 (badge fixture), :656/:659 (tick/actions header classes — kept). No unit test pins the foot's text.

## (f) Guards

Must stay green, none edited: GW-2 `scripts/shell-guards.test.ts`, `scripts/admin-tables.test.ts`, `scripts/admin-guides.test.ts`, `src/test/forms.test.ts`, section-notices, live-regions, `scripts/test-ids.test.ts`, `scripts/conformance/non-null.test.ts`. Touched in effect: admin-tables (card placement in four screens) and test-ids (three new ids).

## (g) Strings

None. Labels are the columns' existing `header`.

## (h) Different

- A single word wider than its column breaks mid-word (only way it can stay inside a fixed cell); the brief's "between words" holds for every multi-word header.
- `rendersNothing` treats a component as present by design (it cannot see what a component draws); a future cell that wraps an empty value in a component needs `null`. I'd add this to the table's doc comment.

## Files (build)

src/components/shell/data-table.tsx, src/components/shell/data-table.test.tsx, src/features/admin-monetisation/products-section.tsx, src/features/admin-monetisation/markets-section.tsx, src/features/admin-monetisation/product-prices-table.tsx, src/features/admin-ai/ai-page.tsx. Then the ruled cheap checks and the write-back from `cea51009a`.
