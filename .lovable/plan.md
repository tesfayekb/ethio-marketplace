# Lovable Bundle 4 — one value per filter, one switch, a plain hint, one select (PLAN ONLY)

Branch `lovable/next`; base `ce25a7751` (HEAD of this sandbox is that sha, base diff empty). CI line: not read in plan mode; read first in Turn 1. Nothing changed.

## (a) Part A — one value per filter (INC-1251)

Today (each `useState` a declaration's `value` reads; the hook returns `kept ?? filter.value`, table-filters.ts:76, 84):

| Page | Page copies |
|---|---|
| categories-page.tsx | `rawMissingOnly` 209 (switch) |
| users-list.tsx | `rawStatus` 74; role from address `roleParam` 78 (address law, stays) |
| strings-page.tsx | status/flagged from address 173–179 (value `[]`, address law, stays) |
| data-scope.tsx | `rawActiveStatus` (value 140) |
| audit-page.tsx | `rawAction` 102, `rawEntityType` 103 |
| listings-page.tsx | `rawCountry` 134, `rawCategory` 135, `rawTier` 139 |
| my-listings-page.tsx | `rawCategory` 173, `rawMark` 174 |
| countries-page.tsx | `rawStatus` 80 |
| ai-calls.tsx | `rawFeature` 23, `rawOutcome` 24 |
| locations-page.tsx | `rawLevel` 107, `rawStatus` 108 (`country` 105 is the scope, not a filter row) |
| screening-page.tsx | `rawCountry` 153, `rawTier` 155 |
| routes/dev.style.tsx | `rawColour` 1050, `rawSize` 1051; full panel `fullCountry/fullCategory/fullLevel/fullMissing` 1081–1086 |

After:
- `TableSelectFilter` / `TableSwitchFilter` lose `value` and `onChange`. The hook keeps one value per filter: in the kept view when signed in and kept, else in its own `useState` map (component memory, never module memory, never storage). It returns `filters` (checked values) and draws chips, clear and reader inputs from them (`filterValues`, `filterOn`).
- New hook option `onAnyChange?: () => void`: "a filter change shows the first page" is written once per table (the page passes `() => setPage(0)` / reset cursor). Every per-filter `onChange` that only reset paging goes.
- Address law: a select may carry `addressValue` and `onAddress(next)`; the hook reads address first, kept second, and a choice writes both. FP-U32–35 stay green unchanged in meaning (their fixtures move off `onChange`; no assertion loosened).
- Text and dates stay page state as today (one state each, never kept, never stored). Reason: they are debounced on the page; moving them gains nothing.
- Leftovers to remove: empty-first options then `.filter(...value !== "")` — dev.style.tsx 1064, 1076, strings-page.tsx 192 (`!== "" && !== "all"`); empty "All" entries in declarations — users-list 123, 139; ai-calls 46, 59; audit 136, 154; my-listings 207, 227; listings 200, 221, 243; screening 240, 262. `=== null` on a never-null string — users-list 120, 136; ai-calls 43, 56; audit 129, 147; listings 236; screening 255; data-scope 140. Function made and called on the spot inside `onChange` — re-read per file in Turn 1 (screening 385 is an effect, not a filter; I list exact lines in the report). The toolbars' own `{ value: "" }` (locations-toolbar 44/60, countries-toolbar 29) are the toolbar choice lists, checked in Turn 1 for whether they still feed a declaration.
- Nothing a person sees changes.

## (b) Part B — the switch row on the product's switch (INC-1253)

- filter-panel-body.tsx 70–89: the ghost Button, track and thumb go; the row draws `Switch` with `id`/`data-testid` = filter id, `checked`, `onCheckedChange`, name from the row's label (`FilterRow htmlFor`), so no `aria-label` duplicate. Radix gives `role="switch"` + `aria-checked`.
- Press area: as the Columns panel rows, the whole row label presses the switch (the label is the row, `min-h-11 md:pointer-fine:min-h-9`); the switch itself stays its drawn size.
- Reading direction, once in switch.tsx: thumb adds `rtl:data-[state=checked]:-translate-x-4`. LTR unchanged for all five users. Unit test SW-U1: under `dir="rtl"` the checked thumb carries the rtl class; under LTR the class list equals today's.
- Spec lines reading the old state (supervisor's script): e2e/dialogs.spec.ts:979 and e2e/admin-categories-console.spec.ts:740–743 (`aria-pressed` → `aria-checked`). e2e/helpers/filters.ts reads neither attribute (checked).
- Stylesheet loses the hand-drawn track/thumb utility classes in that file only.

## (c) Part C — "More below" as a plain hint (INC-1252, DEC-418)

- Markup (dialog-parts.tsx 177–196): `<div class=CUE_ANCHOR><div data-scroll-cue aria-hidden="true" class=CUE_WRAP><ChevronDown/> {cueLabel}</div></div>`; no button, no scroll-on-press, no `reducedMotion` use there. `CUE_BUTTON` deleted; `CUE_WRAP` gains `pointer-events-none` (anchor already has it) and becomes a 1rem fade over a 1.25rem line of `text-xs` words (`items-end gap-1 pb-1`): total 2rem (about half of 4.25rem).
- Contrast: the words sit on the fade's opaque lower part (`cue-fade` ends in `--background`); words `text-muted-foreground` on `--background` checked in both themes on the board (supervisor measures 4.5:1).
- `CUE_ROOM = "clamp(0px, 100% - 6rem, 2rem)"`.
- Not drawn when the body is shorter than 8rem (128 px at 16 px root): `more` also requires `clientHeight >= 8rem`; so while drawn the clamp gives the full 2rem.
- Unit tests rewritten (dialog-parts.test.tsx): DP-U4 (108–130) → shown while more lies below (`[data-scroll-cue]`), gone at the end, `aria-hidden`, no button in it; DP-U5 (163–184) → the hint takes no press: no pressable descendant, `pointer-events-none` on its wrap, a click scrolls nothing; DP-U32 (132–161) → padding equals `CUE_ROOM`, none at the end, fill never shows it; DP-U12 (340–362) → find by `[data-scroll-cue]`, still zero-height anchor; DP-U21 (559–568) → hint text is the supplied words. New DP-U33: a body under 8rem shows no hint and no padding. category-modal.test.tsx:92 → `[data-scroll-cue]` with the text. Spec: dialogs.spec.ts:645 stays; `pressClear` (765–773) and its uses 832, 968, 977, 981, 983 can stay or revert to plain clicks — supervisor's script decides.

## (d) Part D — the forms' long lists as one select (INC-1248)

Census (list read from data, in a form):

| File:line | Lists | Source | One/several | Proposal |
|---|---|---|---|---|
| admin-categories/category-form-fields.tsx 396–404 | countries excluded, new category | markets read | several | select |
| admin-categories/category-dialogs.tsx 626 | Countries dialog exclusions | markets read | several | select |
| admin/translations/languages-page.tsx 1042 | new language's countries | markets read | several | select |
| admin/translations/translator-card.tsx 141 | translator's languages | languages read | several | select |
| admin/translations/language-picker.tsx 86 | one language to add | catalogue list | one | select |
| admin-monetisation/price-dialog.tsx 157, 194, 219 | market, category | reads | one | select (native today) |
| admin-monetisation/override-dialog.tsx 172, 206, 231 | category, country | reads | one | select |
| admin-monetisation/market-dialog.tsx 138 | market | read | one | select |
| admin-attributes/attribute-dialogs.tsx 451, 503, 521 | parent attribute / parent values | reads | one/several | parent: select; value rows stay (each row is an editor, not a choice) |
| admin-attributes/components/attribute-allowed-values.tsx 111–135 | allowed values per target | reads | several, per target | stays: a matrix editor, not one list |
| admin-attributes/category-attributes-dialog.tsx | linked attributes | read | several, ordered | stays: ordered list with reorder |
| ai-feature-form.tsx 132, monetisation-dialogs.tsx 180/226 | fixed toggles / PLACEMENTS | code | — | stays: fixed set |
| posting steps (who, where, pricing, phone) | already on the picker mechanism | — | — | stays (posting concern, separate ruling) |

If the supervisor prefers, the monetisation and attribute rows move to a later bundle; the first five are the brief's named set.

Shared list part:
- New `src/components/select-list.tsx`: the line (button with chosen names, truncated, then "{n} chosen" when more than fit) and its in-flow list on `PickerOption` + `usePickerKeys`, search from 8 choices, max, none line. List height by a new named sibling `FLOW_LIST_SCROLLER` in `shell/menu-row.ts` beside `LIST_SCROLLER` (today's `max-h-77 overflow-y-auto overscroll-contain md:pointer-fine:max-h-63` moves there). DG-10 names it as the exception with `LIST_SCROLLER`.
- `shell/filter-select.tsx` becomes a thin user (FilterRow label + All row).
- New `src/components/forms/field-select.tsx` (form kit, inside `Field`): props `name` (door field name = id and test id), `options`, `value: string[]`, `onChange`, `multiple`, `max?`, `placeholder`, `searchLabel`, `noneLabel`, `maxLabel?`, `countLabel`, `state: "ready" | "loading" | "failed"`, `loadingLabel`, `failedLabel`, `required?`; reads the field's `aria-invalid`/`aria-describedby` from `Field`'s context and reports missing to the shared gate.
- Loading/failed: the line shows the page's words and is not openable; never an empty list.
- Test ids (`<field>-<value>`, `<field>-search`), chosen so choices keep today's ids: field `category-create-exclusion`, `category-exclusion`, `translations-add-country`, `translator-lang`, `translations-add-option`.
- Spec lines that change (supervisor's script): admin-categories-lifecycle 749, admin-categories-console 342, admin-translations-console 972 (`.check()` → open the field, click the choice); admin-translations-console 454–471 (`aria-checked` → `aria-selected`, open first); 965 (`translations-add-search` → `translations-add-option-search`); 447 (prefix count stays valid while closed).

## (e) Exported types changed

- `TableSelectFilter`, `TableSwitchFilter` (lose `value`/`onChange`; select gains `onAddress?`), `TableFilter`, `useTableFilters` signature (third arg options). Readers: the 12 pages above, filter-panel-body, filter-chips, toolbar-panel, table-filters.test, dev.style.tsx. None outside my folders.
- `FilterSelect` props unchanged at its call site. New: `SelectList`, `FieldSelect` and their props, `FLOW_LIST_SCROLLER`. Removed: `CUE_BUTTON` (only dialog-parts reads it). No `src/lib` type changes.

## (f) Words (English; Amharic from the supervisor)

- `prim.select.count` — "{n} chosen"
- `prim.select.choose` — "Choose"
Loading/failed reuse each page's existing words; search/none/max reuse `prim.filter.*`. Layer: member (admin declares member).

## (g) First download

`select-list.tsx` is imported by `filter-panel-body` (on demand) and `field-select.tsx`; `field-select` is imported only by the form/dialog files, which already load on demand (category dialogs, add-language panel, translator card). Expected movers: none on public pages; `/admin/users/$id` may grow by the select chunk if the translator card is drawn on first paint — supervisor measures.

## (h) For Cursor

- Guard laws: no `useState` read only by a filter declaration; no hand-drawn switch (no `aria-pressed` toggle with track/thumb outside switch.tsx); no pressable element and no pointer events inside `[data-scroll-cue]`; no scroller inside a form field (DG-10 extended to `FLOW_LIST_SCROLLER`); form choices from data render through `FieldSelect`.
- Laws read: DG-5 (form select rows are options, not labelled choice rows: confirm), DG-8/DG-9 untouched, DG-10 (FLOW_LIST_SCROLLER exception), DG-11 untouched, CF-OV-7 (select-list takes words as props), CF-OV-8 untouched.

## (i) Conflicts / findings

- The brief says the Filters row shows "names, then a count": today it only truncates the names; the count is new (one key).
- Spec choices become `role="option"` with `aria-selected`, not checkboxes; `.check()` cannot stay.
- dev.style.tsx is a route file; it is the board and was in scope before.

## (j) Turns

1. Part A + B (hook, 12 pages, switch, rtl, tests) — all `src` folders green.
2. Part C (hint, CUE_ROOM, tests, board both themes).
3. Part D (shared list, form select, five named forms; others per ruling), board, docs/features doc line.
4. Supervisor spec script, limit lines, i18n maps, platform write-back committed and proven at HEAD.
