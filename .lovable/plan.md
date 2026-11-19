# L18 table-widths, turn 2: plan (no code changed)

Branch `lovable/table-widths-2`; sandbox `edit/edt-24144542…`; base and head are both `cca37d0cd`.
CI at `cca37d0cd`: SUCCESS (run 44633826514). E2E passed. Smoke ran 27 tests and failed none.

## (a) The ten tables, column by column

I read each cell in the code. "L17" is my census at `40108d59c`, and a change from it is marked **CHANGED**.

**countries-page.tsx** (has a row action column, `w-32`). There is no `text` column, so Name absorbs the rest.
- Name: name plus its code → `name`
- Status: badge → `short`
- Places: "3 / 5" → `short`
- Units: "Metric · ETB" → `short`. **CHANGED** from `name`, because the cell holds two short words.
- Rail: a count → `short`. **CHANGED** from `control`, because `control` is for ticks and switches and this cell holds a number.
- Roles: a count → `short`
- Updated: YYYY-MM-DD → `date`

**locations-page.tsx** (actions `w-44`)
- Name: indented name plus a level badge → `name`
- Path: the full path, wrapping → `text`
- Status: badge → `short`
- Counts: "n · n · n" → `short`
- Order: a number → `short`
- Aliases: `aliases.length`, which is a count → `short`. **CHANGED** from `text`, because the cell holds a count, not the aliases.
- ISO: a code → `short`

**screening-page.tsx**
- Title: the title plus an optional photo warning → `text`
- Category: name → `name`
- Place: name → `name`
- Sent: date → `date`

**name-checks.tsx**
- Name: a CutText name plus a reason line → `text`
- Since: date → `date`
- Attempts: a number → `short`
- Owner: a link holding a name → `name`

**ai-page.tsx**
- Feature: a name plus an "about" sentence → `text`
- State: a TipBadge On/Off → `short`. **CHANGED** from `control`, because the cell holds a badge, not a switch.
- Spend: "$x of $y" plus an alert badge → `name`. **CHANGED** from `short`, because the content is too long for `short`.
- Calls: "month · today" plus an optional characters line → `name`. **CHANGED** from `short`, for the same reason.
- Price: "$x per million" → `name`. **CHANGED** from `short`, for the same reason.
- Updated: date → `date`

**ai-calls.tsx**. There is no `text` column, so Feature absorbs the rest.
- Time: a date and time → `date`
- Feature: a CutText name → `name`
- Model: CutText (cut, never wrapped) → `name`. **CHANGED** from `text`, because a cut cell gains nothing from the 60ch measure.
- Outcome: one word → `short`
- Latency: "123 ms" → `short`
- Person: a CutText name → `name`

**products-section.tsx**
- Name: the open/close name button → `name`. **CHANGED** from `text`, because it holds a name.
- Price: joined standard prices plus "Specific prices: N" or a warning → `text`
- Key: a code that can break anywhere → `name`. **CHANGED** from `short`, because the keys are long codes.
- Days: a number → `short`
- Level only: Photos, Placement and Badge → `short`
- Reach only: Cities, Regions and Countries → `short`
- Enabled, Self-serve and Extends: an On/Off word → `short`. **CHANGED** from `control`, because these cells hold words, not switches.
- Sort: a number → `short`

**product-prices-table.tsx** (actions `w-32`)
- Scope: the scope, plus kind and group underneath → `text`
- Amount: money → `short`
- Credit cost: a number → `short`
- From: date → `date`
- To: a date or "open" → `date`
- Used: a number → `short`
- The three attribution columns, which come from a shared helper (see (h)): `name`, `name`, `date`

**markets-section.tsx**. There is no `text` column, so Market absorbs the rest.
- Market: name → `name`
- Free ads: a number → `short`
- Included reach: a product name → `name`. **CHANGED** from `short`, because the cell holds a name.
- Paid levels: an On/Off word → `short`
- Launch: "n · n" → `short`
- Since: date → `date`
- The three attribution columns: as above

**level-overrides-table.tsx** (actions `w-32`). There is no `text` column, so Category absorbs the rest.
- Category: name → `name`
- Country: name → `name`
- Days, Photos, Placement and Badge → `short`

## (b) Where the required `size` breaks the build outside the ten screens

I searched with `rg` for every `DataTableColumn`, every column-object `width:` and every `minWidth:`. I cannot run the typecheck against a type that does not exist yet. At the build I change the type first, and the full `tsc --noEmit` is then the census; I will list everything it refuses.

Places I expect it to refuse:
- `src/components/shell/data-table.tsx`
  - :110–112: `size` becomes required and `width` leaves the type.
  - :285: the `column.width` branch goes.
  - :550–553: `usesShares` becomes "no minWidth", and the `?? "name"` fallback goes.
- `src/components/shell/data-table.test.tsx`
  - :45 `columns()`: Name → `name`, Note → `text`.
  - :339 `placeColumns`: Name `name`, Path `text`, Status `short`, Listings `short`, Order `short`, ISO `short`.
  - The `sized()` helper (:609) already sets `size`.
- `src/routes/dev.primitives.tsx:292`: `size: undefined` is removed. The dense sample keeps each column's size, and its `minWidth` still turns shares off.
- `src/features/admin-monetisation/monetisation-columns.tsx:22–51` (`attributionColumns`): Created by → `name`, Updated by → `name`, Updated → `date`. **This file is not in the brief's list (STOP-ask, see (h)).**
- The twelve L17 screens and `data-scope.tsx` declared every column's size in turn 1. A count of `key:` lines cannot prove that, because filter chips and actions also use `key:`. The typecheck can, and any file outside the ruled list that it refuses is a STOP.
- `consoles-fields.test.tsx` and `screening-decisions.test.tsx` only mock the table. They build no columns, so I expect no change.

## (c) `minWidth:` lines

None will be added or moved. The two existing lines (`dev.primitives.tsx:293` and `data-table.test.tsx:686`, which already has its `// C7-dense:` note) stay as they are.

## (d) Tests

- **DTK-6** in `data-table.test.tsx`: a column without `size` carries a `// @ts-expect-error` line, so the type refuses it. The typecheck then fails if the error ever disappears.
- **DTK-7**: a table with no `minWidth` gives every data column a percentage share, now without needing any declared size to switch shares on.
- Screen tests that render the real table: `ai-page.test.tsx`, `ai-calls.test.tsx`, `name-checks.test.tsx` and `monetisation-page.test.tsx`. Each gets one id in its own family; I will pick the next free ids at build:
  - ai-page: Feature header share is 7/sum.
  - ai-calls: Feature header share is the largest.
  - name-checks: Name header share is 7/sum.
  - monetisation: the product Price header has the `text` share.
- `screening-decisions.test.tsx` mocks the table, so it gets no test. Countries and locations have no unit test that renders their table.
- Unit tests that pin a width class on these screens: none (searched for `w-20/24/36/48`, `style.width` and `data-table-col` in their tests).

## (e) Browser specs, and widths at 1024 with the rail open

Specs that read cell text or a visible element in these tables:
- admin-countries:486, :501 (`country-ET-units` visible)
- admin-locations:739 (row visible)
- admin-screening:227–229, :491, :497 (row text)
- name-check-queue:82, 83, 135, 181 (name and "of" text)
- admin-monetisation:529, 541, 693, 694, 705, 720 (days, free ads, name, placement)
- admin-ai-calls:26, 47 (row visible)
- admin-services:378

None reads a one-line fit: `one-line-slots-admin.spec.ts` names none of these tables. None reads a link at 1280.

Every reading above checks text, not layout, so it holds as long as a column keeps any width. The AL-17/20 failure was fixed widths overflowing, and shares cannot overflow. The remaining risk is a cramped column, estimated against a table about 700 px wide at 1024 with the rail open:
- **products-section (level) at 1024.** Eight data columns show (weights 4+7+4+3+3+3+3+2… adjusted to the sizes above). `short` comes to about 60 px, which fits "On"/"Off" and a number. Price gets about 150 px and wraps.
  - The real risk is "Placement" text and header words like "Self-serve" wrapping onto two lines. Nothing reads those as one line.
  - This is the table most likely to need the supervisor's measurement.
- **ai-page.** Spend gets about 140 px, which fits "$12.34 of $50.00" with the badge wrapping under it. That is acceptable.
- The other eight tables show four to six columns at 1024, and every `short` column gets 70 px or more. I see no collapse.

I cannot measure in this sandbox: the dev sample page still fails with `enBase` before initialization, and admin pages need a signed-in staff session on the external backend.

## (f) Guards

These stay green and need no edit:
- GW-2, because no `minWidth` line changes
- `admin-tables.test.ts`
- `admin-guides.test.ts`, because there is no new column
- `forms.test.ts`
- section-notices
- live-regions

I expect a change to touch none of them. I will run each of them at build.

## (g) First download

Admin pages only gain size strings. The public pages are not touched, and the shared table loses its `width` branch, so I expect a hold or a few bytes less. I cannot measure the download; the supervisor measures.

## (h) What I would do differently

1. **STOP-ask:** `monetisation-columns.tsx` must be in scope. It builds the attribution columns for prices and markets, and the type refuses it. Either name it, or the type cannot become required this turn.
2. Three cells read as a different kind than their header suggests: countries Rail, ai-page State, and products Enabled/Self-serve/Extends are words or counts, not switches. I size them `short`, not `control`, so "Off" never clips at about 40 px. `control` stays for real ticks and switches.
3. CutText cells (ai-calls Model) take `name`, not `text`, because the measure only helps text that wraps.
4. If the supervisor's 1024 measurement shows the level products table too tight, I would not invent a size. The fix would be its own ruling: a `minWidth` with a `// C7-dense:` note, which gives that table a scroll.

## Build checks, then the last step

Checks: the string scan; prettier and eslint on the touched files; the touched unit tests; `data-table.test.tsx` whole; the forms guard; GW-2, admin-tables, admin-guides, section-notices and live-regions; `bunx tsc --noEmit` whole.

Last step: `git diff --name-only cca37d0cd`. Every path outside the ruled files is written back from the base, `.lovable/plan.md` included.
