# L20 per-category perks wording — PLAN (no code)

Branch `lovable/perks-wording`; base dev `70533e559` (confirmed: HEAD = 70533e559, merge of PR #80). CI not read in plan mode; the build turn opens with it.

## (a) Today, from the tree

Perks table `src/features/admin-monetisation/level-overrides-table.tsx`:
- :34 `LOCKED = ["category"]`.
- :69-81 Category column, `name`, card `title`, span testid `override-<id>-category`, `categoryName(id, "mainCategoryAny")` -> "Every category" (en-admin :1918).
- :82-93 Country column, `name`, card `sub`, span testid `override-<id>-country`, `marketName(code, "countryAny")` -> "Every country" (en-admin :1919).
- :94-147 Days, Photos, Placement, Badge (`short`); each blank draws `""`.
- :148 attribution columns; :162/:181 title + caption `admin.monetisation.overrides.title` "Per-category perks"; :172/:216/:223 `override.add/edit/clear` (en-admin :1935-1937); :190 empty `empty.overridesWhy`.
- Dialog `override-dialog.tsx:118-123` uses the same three keys as its titles.

Prices table `product-prices-table.tsx`:
- :79-80 `scopeOf` is a closure inside the component: `marketName(code, "everyMarket") + " · " + categoryName(id, "everyCategory")` ("Every market · Every category").
- :93-125 one Scope column (`text`, header `col.scope` "Market · Category"), title span + kind line + group line.

Order: the door's read sorts `ORDER BY o.level_key, o.category_id, o.country_code` (latest migration 20261119031000, :64) — a UUID order, not precedence. The service (`readRows`) and `product-details.tsx:43` pass it through; the table does not sort.

## (b) The five proposals

1. ONE SCOPE CELL — confirmed. `scopeOf` cannot be shared as is (closure over the hook). Move it into `use-monetisation-names.ts` as `scopeParts(countryCode, categoryId)` -> `{ market, category }` (prices wording: "Every market" / "Every category"), plus `scopeOf(row)` joining them with " · ". Prices table calls `scopeOf` (no text change). Perks Scope column (`text`, card `title`, header `col.scope`) draws `<span testid=override-<id>-country>{market}</span> · <span testid=override-<id>-category>{category}</span>` — both testids kept, market first like the prices table. `LOCKED` becomes `["scope"]`. Improvement: one wording for "every" across both tables, so the perks table drops "Every country" for "Every market" (the prices table's word). This breaks one e2e line — see (e).
2. NO KIND LINE — confirmed. Under the title, one line (new key `overrides.lead`).
3. BLANK CELL — confirmed: one `<p>` under the table (new key `overrides.blankNote`), drawn only when there are rows (the empty state already speaks otherwise). Cells stay `""`.
4. ORDER — the source is the door (SQL), which my role forbids. The precedent is the prices table: its reading order is a screen function `priceGroups` in `monetisation-order.ts`. I propose `perksOrder(rows)` there: rank (market,category)=0, (market,any)=1, (any,category)=2, (any,any)=3, stable within. If the supervisor wants it only at the door, that is Cursor's turn and I drop this point.
5. ACTIONS — D5: changed wording is a new key; old three retired (no other reader: rg confirms only the table and the dialog). The dialog's titles move to the new keys too.

## (c) Keys (English only; Amharic from the supervisor)

en-admin (new):
- `admin.monetisation.perks.title` "Specific perks" (replaces `overrides.title`, retired)
- `admin.monetisation.perks.lead` "Perks for one market, one category, or both. They replace the level's own perks there."
- `admin.monetisation.perks.blankNote` "A blank cell uses the level's own value."
- `admin.monetisation.perks.add` "Add specific perks"
- `admin.monetisation.perks.edit` "Edit specific perks"
- `admin.monetisation.perks.clear` "Clear specific perks"
Retired (both locales): `overrides.title`, `override.add/edit/clear`. `col.category`, `col.country` stay (the dialog's field labels). `mainCategoryAny`/`countryAny` stay (markets-section, market-dialog read `countryAny`; `mainCategoryAny` becomes unread -> retired).

en-guide (CFG-3: a guide line per column):
- retire `levelOverrides.guide.col.category` and `.col.country`; add `admin.monetisation.levelOverrides.guide.col.scope` "Where this row applies: one market, one category, or both."
- `levelOverrides.guide.how` names "Add override": the guide reads fixed `.guide.how`, so a new key is impossible — ruling asked: edit its English in place to "Add specific perks picks the market and the category and sets at least one cell. Edit changes the cells. Clear (red) removes the row and ads fall back to the level's own perks. When rows overlap, the row naming both wins, then the market's, then the category's." (the DB row may outrank it, D3).
Usage maps regenerated.

## (d) Tests (prefix PKW, free: rg found no PKW-n)
- `monetisation-order.test.ts`: PKW-1 `perksOrder` puts (market,category), (market,any), (any,category), (any,any) in that order, stable within.
- `use-monetisation-names.test.ts`: PKW-2 `scopeOf` gives "Every market · Every category" keys for nulls; `expectTypeOf(scopeParts).returns.toEqualTypeOf<{market:string;category:string}>()`.
- `monetisation-page.test.tsx`: PKW-3 an open level's perks table has one Scope header (no Category/Country headers), both testids inside one cell, the blank note under it, and the Add button reads `perks.add`; line :172 changes `overrides.title` -> `perks.title`.

## (e) e2e (`rg -n "override-|perks|overrides" e2e`)
Only `e2e/admin-monetisation.spec.ts` drives this table (the other hits are `rate_overrides`, helper imports, DB rows).
- Testids (`override-<id>`, `-days`, `-photos`, `-country`, `override-actions-*`, `product-<key>-override-add`, `product-<key>-perks(-empty)`, dialog ids): unchanged, not broken.
- :901-903 blank photos via `filter({hasText:/\S/})`: unchanged.
- BREAKS: :905-907 `-country` expected `en["admin.monetisation.countryAny"]`. New exact text:
  `      en["admin.packages.prices.everyMarket"],`
  (and the comment at :897 "the \"every country\" word" -> "the \"every market\" word"). If the supervisor prefers to keep "Every country" in the perks table, the spec needs no change but the two tables say different words.
- No spec reads the header words or the button labels by text (rg for "Add override", col keys: none in e2e).
- Row order: MON-6 finds rows by testid, not position; not broken.

## (f) Guards
- CFG-3 admin-guides: column keys change -> guide keys above.
- admin-tables: column set changes (scope locked); expected to pass.
- GW-2: no `minWidth`. Forms guard: dialog unchanged except title keys. section-notices / live-regions: the blank note is a plain static `<p>`, not a notice. test-ids: PKW new. non-null: none added. Usage maps: regenerated.

## (g) Differently
- Unify "every" words (point 1) rather than keep two words for the same thing.
- Rename the title too ("Per-category perks" is wrong once a row can name only a market).
- Order belongs at the door long-term; the screen function is the prices table's precedent.

## Files (build)
level-overrides-table.tsx, product-prices-table.tsx, use-monetisation-names.ts, monetisation-order.ts, override-dialog.tsx, en-admin.ts, am-admin.ts, en-guide.ts, am-guide.ts, three test files, the two usage maps, and e2e/admin-monetisation.spec.ts only with the ruled line.
