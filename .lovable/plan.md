# L17 table-widths — plan (no code changed)

Base dev `6c53e5062` (head confirmed). 22 screens draw `<DataTable>` (21 under src + `dev.primitives.tsx`), plus `data-table.test.tsx`.

## (b) The sizes — one closed set on the shared table

A column declares `size` (required once every table is moved). Each size maps to one width in the fixed layout:

| size | holds | width | why |
|---|---|---|---|
| `control` | switch, tick, icon action, thumbnail | `w-20` (5 rem) | a 44 px target plus the header word |
| `short` | number, count, code, badge, order | `w-24` (6 rem) | "1,234", "ETB", a two-word status |
| `date` | date or date+time | `w-36` (9 rem) | the longest `formatLocale` short date-time |
| `name` | one or two words, a person, a place | `w-48` (12 rem) | about 20–24 characters before wrapping |
| `text` | title, sentence, path, key | no width: takes the room left | — |

- Leftover room: every `text` column gets no width class, so the fixed layout divides the remainder equally between them (two `text` columns share half each).
- Measure: a `text` cell's content wraps inside `max-w-[60ch]` (one design value in the primitive). The column may still be wider on a 1920 screen; the line inside stops at 60ch and the rest is quiet space at the line's end.
- Truncation unchanged: cells that today use `CutText` / `truncate` + `title` keep doing so.
- A table with no `text` column: the last `name` column takes the remainder (the primitive rule: "if no text, the widest declared size absorbs").
- Widths: at 1024 (with rail) a typical table (1 text, 1 name, 1 date, 2 short, 1 control, actions) uses 12+9+12+5+6 ≈ 44 rem fixed, text gets ~14 rem; at 1280 ~30 rem; at 1920 the text column is wide but its lines stop at 60ch. Below `lg` most consoles are cards (`cardUntil`) and do not change.
- `minWidth` and its scroll contract (C7 / INC-130) stay: a table declaring any `minWidth` keeps `min-w-max`; `size` there only gives the `w-*` floor it already had.
- Actions column keeps `actionsWidth` as today (its own prop, not a column).

## (a) Census (header → kind → today → size)

Today "none" = equal split under `table-fixed`.

- **users-list**: Name name 22%→name; Email text 30%→text; Country short 10%→short; Status short 14%→short; Roles name 16%→name; Joined date 12%→date.
- **roles-list**: Name name 26%→name; Display text 30%→text; Kind short 16%→short; Members short 14%→short; Permissions short 14%→short.
- **audit-page**: Time date 18%→date; Actor name 20%→name; Action name 22%→name; Entity name 20%→name; Meta text 20%→text.
- **impersonation-view**: Title text 46%→text; Status short 18%→short; Price short 18%→short; Created date 18%→date.
- **strings-page**: Key text(tech, truncates) 26%→text; Source text 26%→text; Value text 26%→text; Status short 12%→short; Provenance short 10%→short.
- **data-scope**: Entity text 30%→text; Type name 14%→name; Source text 22%→text; Value text 22%→text; Status short 12%→short.
- **languages-page** (L14 patch replaced): Language name w-52→name; English name name w-40→name; meter A (w-auto) text→text; meter B (w-auto) text→text; Staff control w-20→control; Public control+gate line w-48→name.
- **listings-page**: Title text 17%→text; Seller name 15%→name; Place name 12%→name; Category name 13%→name; Price short 11%→short; Status short 11%→short; Posted date 9%→date; Expires date 9%→date.
- **my-listings**: Photo control w-24→control (thumbnail fits w-20? see risk); Title text none→text; Price short→short; Group name→name; Posted date 11%→date; Expires date 11%→date.
- **categories-page**: Name name 22%→name; Parent name none→name; Status short→short; Flags name (chips)→name; Order short→short; Listings short→short; Exclusions text→text.
- **attributes-page**: Name name 32%→name; Type short 14%→short; Options short w-16→short; Coverage short w-20→short; Usage text→text.
- **countries-page**: Name name→name; Status short→short; Places short→short; Units name→name; Rail control→control; Roles short→short; Updated date→date. (No text column: Name absorbs.)
- **locations-page**: Name name→name; Path text→text; Status short→short; Counts short→short; Order short→short; Aliases text→text; ISO short→short.
- **screening-page**: Title text→text; Category name→name; Place name→name; Sent date→date.
- **name-checks**: Name text→text; Since date→date; Attempts short→short; Owner name→name.
- **ai-page**: Feature text→text; State control (switch)→control; Spend short→short; Calls short→short; Price short→short; Updated date→date.
- **ai-calls**: Time date→date; Feature name→name; Model text(tech, truncates)→text; Outcome short→short; Latency short→short; Person name→name.
- **products-section**: Name+Prices button text→text; Price text→text; Key short(code)→short; Days short→short; Enabled control→control; Self-serve control→control; Extends control→control; Sort short→short; level-only Photos/Placement/Badge short→short; reach-only Cities/Regions/Countries short→short.
- **product-prices-table**: Scope (title+kind+group) text→text; Amount short→short; Credit cost short→short; From date→date; To date→date; Used short→short.
- **markets-section**: Market name→name; Free ads short; Included reach short; Paid levels short; Launch date; Since date. (No text: Market absorbs.)
- **level-overrides-table**: Category name→name; Country name→name; Days/Photos/Placement/Badge short. (Category absorbs.)
- **dev.primitives**: sample keeps its two shapes: the fixed sample gets sizes (Name name, Email text, Description text, Tags name, Country/Status/Listings/Views short, Roles name, Storefront name, Joined/Updated date); the minWidth sample keeps `minWidth` and drops `width: undefined`.

The final census is re-read file by file at build; any column whose cell content disagrees with the header-based kind is reported in the build report.

## (c) The primitive's change

`data-table.tsx`: `DataTableColumn` gains `size: "control" | "short" | "date" | "name" | "text"`; one exported `COLUMN_SIZE` map (size → class) beside the type; `headCellClass`/cell class read `COLUMN_SIZE[column.size]` where they read `column.width` today; `text` cells wrap their content in the measure (`max-w-[60ch]`) and the "no text column" rule picks the absorbing column. `width` leaves the type in this same turn only if every table moves in it; with the cut below, `width` stays one turn marked `@deprecated` and turn 2 removes it so the type refuses it.

Tests in `data-table.test.tsx`, new free ids in the DTK family: DTK-2 each size draws its class on header and cell; DTK-3 a `text` column has no width and its content carries the measure; DTK-4 no text column → widest declared size absorbs; DTK-5 a `minWidth` table keeps `min-w-max` and no `table-fixed`. Existing HS-*/ACR-5 assertions (`w-24`, `w-44`, `w-20` on actions/lead) stay untouched.

## (d) Guards

`scripts/admin-tables.ts` judges T1–T10 (header, toolbar, search slot, Columns, filter chips, RowActions, pagination, card title, selection, rowHref open, Guide). It reads no column width. A rule "every column declares size" would be new — K3 asks a new mechanism to land with its guard. Proposal: the type itself is the guard (`size` required in turn 2); if the supervisor wants a census line in `scripts/admin-tables.ts` or `scripts/conformance/` (e.g. "T11: no `width:` key in a DataTable column"), that is a `scripts/` file I may not touch — STOP-ask: the supervisor supplies it.

## (e) Turn size — cut into two

22 screens + primitive + test exceeds fifteen.
- **Turn 1** (primitive + 11): data-table.tsx, data-table.test.tsx, dev.primitives.tsx, the three translations tables (languages, strings, data-scope — operator-named), users-list, roles-list, audit-page, impersonation-view, listings-page, my-listings, categories-page, attributes-page. (`width` still allowed, deprecated.)
- **Turn 2** (10 + type): countries, locations, screening, name-checks, ai-page, ai-calls, products-section, product-prices-table, markets-section, level-overrides-table; `width` removed from the type.
Plus `bun run i18n:usage` maps only if a file move happens (none planned; no new strings).

## (f) Specs and unit tests

- `e2e/`: no spec reads a column width class. `e2e/helpers/one-line.ts:356` checks `[data-cut-text], .truncate, [data-one-line]` elements fit one line — truncating cells keep `truncate`, so unchanged; wrapping `text` cells are not marked one-line. To confirm at build: every spec calling the one-line helper on a table (grep by caller) — reported by id/line before editing.
- `e2e/primitives-law.spec.ts:95` (L6) is DetailPanel, not the table — unaffected.
- Unit tests pinning width classes: only `data-table.test.tsx:161–166, :541` (actions/lead column, not column `width`) — unchanged. `consoles-fields.test.tsx` LTC tests read testids/sr-only, not widths (to re-confirm).

## (g) First download

I cannot measure page sizes here (the harness owns builds). The primitive adds one small map and a branch (well under 0.1 KiB) to the shared table chunk, carried by every admin page and My listings; screen files shrink slightly (strings `w-[22%]` → `"name"`). Admin ceilings in `route-budgets.mjs` are read at build; the supervisor's measurement decides any line.

## (h) L16's K2 (perks table)

Its own turn: it is a second concern (standard vs exception wording, a new kind element, strings and Amharic), not a width.

## (i) Differently

- `size` names the content, not the pixel; a sixth size is refused until a real column needs it.
- Measure applied inside the cell (not as a column max), because a fixed-layout column cannot hold a max width — the same reason L14's `w-fit max-w-40` failed.
- My-listings' photo `w-24` → `control` `w-20` could crop the thumbnail; if the picture frame is wider than 5 rem I keep it at `short` (w-24) and say so.
