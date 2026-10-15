# Display Primitives (DEC-015)

> **DESIGN LAW:** "Every visual container is built from shared primitives that own responsiveness, overflow, empty/loading/error states, and interaction contracts — designed once, tested once on /dev/primitives, inherited everywhere. Screens vary in content, never in skeleton."

Cross-cutting rules for every primitive: dark mode through design tokens only; logical CSS properties only (`ps/pe/ms/me`, `text-start`); interactive targets ≥ 44px; every primitive accepts a `testid`; user-facing defaults (empty/loading/error) come from i18n keys (`prim.*`).

## Fixture and proof

- Fixture route: `/dev/primitives` (also `?state=empty|loading|error`) — production-safe, noindex, no data access, no writes. Every block carries `data-testid="prim-<name>"`.
- Law suite: `e2e/primitives-law.spec.ts`, describe `display primitives law (test-once responsiveness)`, at 360×800, 768×1024 and 1280×800.

| Law | Assertion                                                                                                                                                   |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| L1  | `document.scrollingElement.scrollWidth <= innerWidth` at every viewport                                                                                     |
| L2  | every `prim-*` container and `data-table` satisfies `scrollWidth <= clientWidth + 1` (the declared last-resort scroller must stay inactive on fixture data) |
| L3  | DataTable: cards at 360, table at 768+, `detail` columns only at 1280                                                                                       |
| L4  | StatGrid tiles occupy 2 / 3 / 4 columns by viewport (measured tile x positions)                                                                             |
| L5  | FormSection actions bar `position: sticky` at 360, `static` from md                                                                                         |
| L6  | DetailPanel long value fully visible (`scrollHeight == clientHeight`, text present)                                                                         |
| L7  | empty / loading / error states render on demand via the `?state=` toggle                                                                                    |

## PageCard (`src/components/shell/page-card.tsx`, U0l)

One card primitive for every page block: `rounded-lg border border-border bg-card p-6`.
Law: a single-content page renders exactly ONE PageCard inside a `PAGE_MAIN_CLASS` main at the standard width; a multi-card page renders the SAME primitive once per block — never a hand-rolled card. Contents wrap; a PageCard never overflows its container.

## DataTable (`src/components/shell/data-table.tsx`, U1b + U1c slots)

Column priority does the responsive work: `primary` (cards + table), `secondary` (cards + md table), `detail` (table from lg only). `overflow-x-auto` on the table wrapper is a last resort our own tables must never need.

Props: `columns`, `rows`, `rowKey`, `rowTestId`, `rowHref?`, `caption`, `emptyState`, `loading?`, `loadingState?`, `error?`, `errorState?`, `toolbar?`, `rowActions?`, `selection?`, `pagination?`, `sortKey?`, `sortDirection?`, `onSort?`, `className?`.

- `toolbar` — search/filter controls in their own card; stacked at 360, wrapping row from md.
- `rowActions(row)` — inline buttons inside the 360 card, trailing end-aligned column at md.
- `selection` — `{ selectedKeys, onToggleRow, onToggleAll }`; adds a checkbox column plus a selected-count bar.
- `pagination` — free slot; `DataTablePagination({ offset, pageSize, total, onPrevious, onNext, testid? })` is the standard filling (Prev/Next + "from–to of total", i18n).
- Sorting: set `sortable` on a column and pass `onSort`; the header carries `aria-sort`.

All U1c additions are optional — the existing users list is unaffected.

## StatCard / StatGrid (`src/components/shell/stat-card.tsx`)

`StatCard({ label, value, delta?, trend?: 'up'|'down'|'flat', hint?, icon?, loading?, testid?, className? })` — tabular figures, wrapping labels, skeleton while loading.
`StatGrid({ children, testid?, className? })` — 2-up at 360, 3-up at md, 4-up at lg.

## ChartFrame (`src/components/shell/chart-frame.tsx`)

`ChartFrame({ title, description?, aspect?: '16/9'|'4/3'|'square', legend?: 'top'|'bottom', legendContent?, children, loading?, empty?, error?, testid?, className? })`.
The frame measures the plot area with a `ResizeObserver` and calls `children({ width, height })`; the chart library is the caller's choice. The legend wraps; the frame never overflows horizontally.

## FormSection / FormField (`src/components/shell/form-section.tsx`)

`FormSection({ title, description?, columns?: 1|2, actions?, children, testid?, className? })` — 1-col at 360, 2-col from md when `columns=2`; the actions bar is sticky-bottom at 360 (≥44px targets) and inline from md.
`FormField({ label, htmlFor?, help?, error?, full?, children, testid? })` — label, control, help text, inline error (`role="alert"`).

## DetailPanel (`src/components/shell/detail-panel.tsx`)

`DetailPanel({ title?, pairs, loading?, error?, testid?, className? })` with `pairs: { label, value, hint? }[]` — 1-col at 360, 2-col from md. Values wrap (`break-words`) and are never truncated silently; chip/badge values are supported.

## Row links (U1d, INC-077)

`DataTable({ rowHref })` applies to BOTH responsive twins: the 360 card is a whole-card `Link`, and from md the table row is fully clickable — the first `primary` column renders as a `Link` (`<rowTestId>-link`), the `<tr>` carries `role="link"`, `tabIndex=0`, click-to-navigate and Enter-to-navigate, with a `hover:bg-muted/50 cursor-pointer` affordance. Selection and row-action cells stop propagation so inner controls keep working. Law L8 in `e2e/primitives-law.spec.ts` proves click (non-primary cell), keyboard (Enter) and the 360 card. CLASS RULE: every primitive INTERACTION contract has a law test on `/dev/primitives`, not just geometry.

## Adoption

Feature screens adopt these primitives as each U section ships; no feature page was migrated in U1c.

## C7 / INC-130 — the DataTable density contract

Re-landed 2026-09-03 (the U4i-10 contract was recorded but absent from the primitive).

- `cardUntil?: "md" | "lg"` — where the card twin gives way to the table twin. `"md"` is the default, so every pre-existing consumer renders byte-identically with the prop absent. Dense tables declare `cardUntil="lg"` and keep cards through the tablet band (768–1023), which is where they used to crush.
- `DataTableColumn.minWidth?: string` — a design-token min-width utility (`min-w-24`, `min-w-56`, …). When ANY column declares one the table drops `table-fixed` for auto layout and the primitive's OWN `overflow-x-auto` wrapper (`data-table-scroller`) absorbs the excess. Consumers never add a per-page width hack — the primitive owns scroll-not-cramp.
- `DataTablePagination({ totalLabel })` — replaces the numeric total in the range string (the audit console's capped `10,000+` from INC-129). Paging arithmetic is unchanged.

Proof: `src/components/shell/data-table.test.tsx` (DEC-025 floor) covers the default split, the `lg` split, min-width layout, and the label substitution; law L9 in `e2e/primitives-law.spec.ts` proves the variant geometry on `/dev/primitives?variant=lg` (cards at 360 AND 768, table at 1280) without touching L3's default case.

## INC-132 — the scroller chain

`overflow-x-auto` only engages when every ancestor between it and the page
column may be narrower than its content; one flex/grid ancestor left at
`min-width: auto` widens the whole chain and the PAGE overflows instead. The
primitive therefore owns `min-w-0 max-w-full` on every link of its own chain —
frame -> body -> `data-table` card -> `data-table-scroller`. Consumers never add
a width hack.

Proof: the constrained-container case in `src/components/shell/data-table.test.tsx`
and law **L10** in `e2e/primitives-law.spec.ts` (1024x800 on
`/dev/primitives?variant=lg`: `scrollWidth > clientWidth` on the scroller, the
last cell in viewport after scrolling it, and no page overflow). L3 and L9 are
unmodified.

## C7 round 3 — the wide tier, the pinned column, and the shared chain (INC-134/135)

- **`priority: "wide"`** sits above `detail`: hidden below `xl`, and excluded from
  the card twin entirely. Dense rosters park their numeric tail there so the
  tablet/laptop band shows what an operator acts on and the scroller carries the
  rest. Unit-pinned in `data-table.test.tsx`; E2E-pinned by L11.
- **`stickyFirstColumn`** pins the first column during horizontal scroll. The
  offset is the logical `start-0` (RTL-safe) and the background is the `bg-card`
  token, never a hardcoded colour. Off by default; the categories roster and the
  `?variant=lg` demo enable it.
- **INC-134 — the shared chain.** The scroller only engages when EVERY ancestor
  is at `min-width: 0`. The 1240×800 census convicted the admin content region
  in `src/components/app-shell.tsx` (the shell grid wrapper, still at
  `min-width: auto`). It now carries `min-w-0 max-w-full`. The fix is at the
  shared shell, once, for every page — a per-page width hack would violate C7 and
  would have to be repeated by every future table.

## Shared blocks (bundle 9, Part B, 2026-10-08)

Two rules apply to every block below.

- THE SIZE RULE: a control a finger may press is 44 px on its short side; with
  a mouse it is 36 px. Classes: `size-11 md:pointer-fine:size-9` for a square
  control, `h-11 md:pointer-fine:h-9` for a field or a text button. Below md a
  control is always 44 px, whatever the pointer.
- THE TOOLTIP RULE (INC-089, `src/components/shell/app-rail.tsx` WithTooltip):
  a tooltip always sits OUTSIDE a trigger. When a control is both a tooltip's
  and a menu's trigger the order is Tooltip › TooltipTrigger asChild ›
  DropdownMenuTrigger asChild › the button. A component handed to an `asChild`
  parent forwards its ref to a real DOM element; it never returns a Fragment or
  a provider at its root.

### IconButton — `src/components/ui/icon-button.tsx`

Props: `label` (required; the accessible name and the tooltip's text), `icon`,
`tone` (`neutral` default, `danger`, `success`, `warning`, `info`), `size`
(`row` default = THE SIZE RULE; `touch` = always 44 px), an optional `tooltip`
(the tooltip's text when it differs from the name — RowActions and FilterChips
use it to show the label alone), and the native button props. Forwards its
ref; `type="button"` by default; never a `title`. It renders its own
`TooltipProvider delayDuration={150}`. `IconButtonBare` is the same button
without the tooltip and provider, for an `asChild` trigger.

### RowActions — `src/components/shell/row-actions.tsx`

Props: `testid`, `name` (the row's name), `edit?`, `remove?`, `more?`. Renders
Edit (`<testid>-edit`, Pencil), Delete (`<testid>-delete`, Trash2, danger) and
the three-dots (`<testid>-more`, lucide `EllipsisVertical`), each only when
given; null with none. Every control is named `<label> — <name>`; its tooltip
shows the label alone (the three-dots' label is `prim.table.actions`). The menu
is `<testid>-menu`, one item `<testid>-more-<key>` per entry (`min-h-11`);
danger entries come last after one separator. The three-dots follows THE
TOOLTIP RULE. After a choice the menu closes and focus returns to the
three-dots.

### The pager's three zones — `DataTablePagination`

Zone 1: the range (`<testid>-range`, unchanged). Zone 2: rows per page — a
label `prim.table.pageSize` and a NativeSelect `<testid>-size`, only when both
`pageSizeOptions` and `onPageSize` are given (otherwise an empty element keeps
the grid). Zone 3: Previous and Next (unchanged) and, only when `onPage` is
given, the page run between them: `pageWindow(current, count)` (exported, pure)
gives every page when count ≤ 7, otherwise the first, the last, the current and
one neighbour on each side, with one gap wherever pages are left out. Each page
is `<testid>-page-<n>`, named `prim.table.page` with `{n}` filled, the current
one `aria-current="page"`. A caller passing none of the new props renders the
same text, test ids and controls as before.

### NativeSelect — `src/components/ui/native-select.tsx`

One styled native `<select>` (forwardRef, native props, THE SIZE RULE for a
field). The consoles' own select styles move to it in Part D.

### FilterChips and FiltersButton — `src/components/shell/filter-chips.tsx`

`FilterChips` (`testid`, `chips`, `onClearAll`): null with no chip; one chip
`<testid>-chip-<key>` per entry with a remove IconButton
(`<testid>-chip-<key>-remove`, named `prim.table.removeFilter — <chip label>`),
then a link button `<testid>-clear` (`prim.table.clearAll`). `FiltersButton`
(`testid`, `count`, `children`): an outline button (`prim.table.filters`, THE
SIZE RULE) with a count mark `<testid>-count` above zero, opening a popover
`<testid>-panel` that holds the console's own filter controls.

### The selection bar's actions — `DataTable` `selectionActions`

When given, rendered at the end of `data-table-selection`
(`ms-auto flex flex-wrap items-center gap-2`). Nothing else in the bar changes.

All of the above are shown on `/dev/style` and tested by
`e2e/house-style.spec.ts` (HS-3 row actions, HS-4 pager, HS-5 filters).

### ColumnsButton and TableToolbar (bundle 11, turn A2; D118, D128)

`ColumnsButton` (`src/components/shell/columns-button.tsx`; `testid`, `columns`
of `{ key, label, locked? }`, `hidden`, `onToggle(key, visible)`): an outline
text button (`prim.table.columns`, THE SIZE RULE) opening a popover
`<testid>-panel` with one tick per column (`<testid>-<key>`); a locked column
(the row's name) is ticked and disabled. `useHiddenColumns(tableId)` and
`visibleColumns(columns, hidden, locked)` (`src/components/shell/columns-state.ts`)
keep which columns this browser hides, per table, in local storage under
`ethio:table-columns:<tableId>` — read after the first paint, a convenience only:
storage that fails or is missing shows every column.

`TableToolbar` (`src/components/shell/table-toolbar.tsx`; `testid`, `search`,
`filters`, `columns`, `chips`): the one layout of a table's toolbar — the search
box first, Filters and Columns at the end of the row, the filter chips under it.
It only places the shared blocks; every admin table passes its toolbar through it
(D128: the Columns button on every table; tick-boxes only where a bulk action
exists).

Tests: HS-7 (the button, the locked column, the reported choice), HS-8 (the choice
per table, and blocked storage), HS-9 (the drawn columns; the toolbar's order) in
`src/components/shell/columns-button.test.tsx`. First used by Admin › Screening
(SC-11).

### TableToolbar's scope and TableActions (bundle 11, turn B1; D83, D118)

`TableToolbar` takes an optional `scope` first on its row — a control that decides
what the table READS (Admin › Places' market), not a sieve over what it shows, so
it stays on the row instead of inside Filters — and spans the toolbar's width.

`TableActions` (`src/components/shell/table-actions.tsx`; `testid`, `children`): the
page's own actions on one row above the table, at its end — the plain ones
(Export, Import) first, the one primary action ("New …") last, as the agreed list
board draws its header. It renders nothing when there is no action.

Tests: HS-10 (the scope before the search; the header's order; nothing when empty)
in `src/components/shell/columns-button.test.tsx`. Used by Admin › Countries,
Coverage and Places (CO-1, CV-2, LT-1).

### RowActions' menu is not modal (bundle 11, turn B1 fix; INC-539)

The three-dots menu (`DropdownMenu modal={false}`) does not lock the page's
pointer events. Its entries usually open a dialog; a modal menu and a modal
dialog both lock the page, and when the dialog opened while the menu was still
closing, the lock outlived both — after the dialog closed (Escape), the page took
no click (CO-9 found it in CI on both widths). Now the dialog alone locks the
page. The menu still closes on a choice, on Escape and on a click outside, and
gives focus back to the three-dots (HS-3). The same holds for Admin ›
Attributes' own row menu until it moves onto RowActions (B3). Test: "an open menu
leaves the page's pointer events alone" in
`src/components/shell/row-actions.test.tsx` (red on the modal menu).

### TableActions' groups wrap at its end (bundle 11, turn B2)

A group inside the header's row — Export and Import travel together in one
`div` — aligns at the same end as the row (`[&>div]:justify-end`). On a phone,
where the pair no longer fits side by side, the header is one right-aligned
column instead of a left-aligned pair between right-aligned buttons (Admin ›
Categories, Countries and Places).

### RowActions' menu leaves at once when it closes (bundle 11, turn B2; INC-541)

The B1 fix (INC-539) kept the page clickable after a dialog opened from the
three-dots menu closed, but CO-9 still failed: the next press on the three-dots
opened no menu. A closing menu stayed on the page for its fade-out (about 0.2 s).
A dialog opened from it and closed inside that time handed focus back to the
fading menu, and the menu took the press on the three-dots as a click outside
itself. The menu now leaves at once when it closes
(`data-[state=closed]:animate-none!` on its content; it still fades in), so a
dialog never shares the page with a closing menu. Admin › Attributes' row menu
likewise. Tests: CO-9 and CT-43 (a dialog from the menu, closed, then the menu
again); the unit test "a closing menu leaves at once" in
`src/components/shell/row-actions.test.tsx`. Reproduced locally on the Countries
page (the menu failed to reopen in 3 of 10 runs before, 0 of 20 after).

### DataTable's actions column fits its icons (bundle 11, turn B3; INC-542)

The table twin's actions column was always `w-24` — room for one 44 px icon.
RowActions draws two (Edit and the three-dots) or three (Edit, Delete and the
three-dots), so from md up the icons spilled over the column before them
(Admin › Countries, Places, Categories since turn B1/B2). `DataTable` takes
`actionsWidth`: `w-24` (the default, one icon), `w-32` (two), `w-44` (three;
`w-36` where a mouse draws the icons at 36 px, md and up). Countries passes
`w-32`; Places and Categories pass `w-44`; Coverage and Screening keep the
default. Categories' name column keeps 22 % of the table, so the wider column
never crushes the name at the tablet band. Tests: the unit test "sizes the
actions column for the icons it holds" in `src/components/shell/data-table.test.tsx`;
the row's buttons read inside their own cell (`expectActionsInsideCell`,
e2e/helpers/row-actions.ts) in CO-9, LT-16 and CT-43.

## The agreed tables (bundle 11 V2, 2026-10-11; D132, INC-543)

The operator's phone walk of turns B1 and B2 found the tables cramped on a
phone, the Filters panel's dropdown impossible to open there (INC-543), and the
agreed Filament boards not followed (S159). The v2 boards (a Places list on a
phone, one card per table, the Filters and Columns sheets, a desktop list) were
approved "as drawn, for all" — Edit and Delete in the
card's footer, depth Soft, page tone Cool grey (tokens: docs/features/design-foundation.md).

- **One card, from the breakpoint up.** At and above `cardUntil` the toolbar,
  the selection bar, the table and the footer sit inside ONE card (the frame
  carries the border and `shadow-card`; the toolbar has a bottom rule, the
  footer a top rule). Below it the toolbar and the footer sit on the page and
  every row is its own card; between md and `cardUntil` ("lg"/"xl") the cards
  are two to a row. The scroller chain (INC-132) is unchanged: frame → body →
  `data-table` → scroller.
- **The phone card** (Filament's stacked-on-mobile layout). A column's `card`
  place decides where it sits: `title` (the first line, one per card), `sub`
  (the muted line under it), `meta` (a labelled fact — the label above the
  value — in a grid), `badge` (a pill at the end of the facts line; pills that
  do not fit move under the facts), `foot` (a labelled note in the footer),
  `hide` (the table only). Unset, the priority decides as before (detail out;
  wide only at `xl`), the first column shown is the title and the others are
  facts. `cardCell` gives the card its own value (null leaves the fact out).
  `cardLead` draws a tinted 36 px icon tile before the name. A cell's tree
  indent (`data-indent`) is the table's alone. A cell that draws a group of
  pills in its own flex span is flattened into the card's pill row.
- **RowActions splits in the card.** The three-dots sit in the card's top
  corner; Edit and Delete in its footer, beside the footer notes; each control
  keeps its one testid, and the whole card is the row's actions region
  (`<row>-actions`), so a helper finds every control there. Any other actions
  node sits in the footer as it is. The table twin keeps all three in its
  actions cell.
- **The header** (`TableActions` `title`): the page's one heading leads the row;
  the actions follow at its end and move under it when they do not fit.
  `TableActionButton` is one header action: a 44 px icon tile on a phone, icon
  and word from md; its words stay for screen readers and show under the tile
  while a finger holds it (`PressLabel`: about half a second; that press does
  nothing else; a short tap acts as before; a mouse never sees it).
- **The toolbar** (`TableToolbar`): on a phone the scope is a tinted pill on its
  own line, then the search (a 44 px white box with its magnifier) and the
  Filters and Columns tiles share one line; from md one row inside the card.
- **The panels** (`ToolbarPanel`): Filters and Columns open a popover from md
  and a modal bottom sheet on a phone (a grabber, the panel's name with a 44 px
  close, the content, its footer). A focus change never closes the sheet
  (INC-543: the native list opened inside the old popover took the focus and
  the popover closed under it). Content testid `<testid>-panel` in both forms;
  Escape closes both. Filters' footer: Clear all and "Show N results" (when the
  page gives `resultCount`; else "Done"). Columns: one switch per column (the
  locked one on and greyed), footer Show all and Done.
- **Filters are pills** (`FilterChoices`, `src/components/shell/filter-choices.tsx`):
  a labelled row of pills, the chosen one filled with a tick, one tap applies
  it. Never a dropdown inside a panel. Testids `<testid>-<value>`; the empty
  value is `<testid>-all`.
- **The pager on a phone**: the count, the page size and two 44 px arrow tiles
  on one line (the arrows are icons named "Previous" / "Next"; RTL mirrors
  them); the page run waits for md, where it joins the arrows into one group.
- Tests: HS-11 to HS-20 (unit: the card's places, RowActions' split, the one
  card frame, `cardCell`, the pills, the panel's two forms, the held-finger
  label, the pager's arrows, the header's heading and Show all, the Filters
  footer); HS-4 (the pager on a phone) and HS-5 (the filter pills) in
  e2e/house-style.spec.ts; SC-11 (the screening market pills); the countries
  and places `chooseFilter` helpers.

### A fact that names itself (bundle 11, turn B3)

`cardLabel: false` on a column drops the label the phone card draws above a
fact, for a cell whose words already name it — Admin › Attributes' "Used by 3
categories". Test: HS-21 in `src/components/shell/data-table.test.tsx`.

### The re-walk's fixes (bundle 11, turn V2b; the operator's phone walk, 2026-10-11)

- **The card's facts sit side by side.** A `meta` fact is its label and its
  value on one line (the label muted, the value set off); the facts flow on one
  line and wrap only when they must, a value that does not fit beside its label
  moves under it whole, and the state pills end the same line. Coverage's four
  limits, Categories' parent and listings, and every table that leaves its
  columns to the default now take a line or two, not a line per column. Each
  fact carries `data-card-fact="<column key>"`. Test: HS-22.
- **No browser tooltip on a header action.** `TableActionButton` takes no
  `title`; a `hint` (a cost stated where it is spent — Categories' Generate
  missing, DEC-032) shows in the house tooltip on hover or keyboard focus.
  Places' and Countries' Download dropped their native hints (the scope beside
  the buttons already says what the file holds). Test: HS-23.
- **A group never shares a section's glyph.** The rail's Catalog group is a
  library (`LibraryBig`); Categories keeps the folder tree
  (src/features/admin/rail-items.ts).

### The Attributes walk's fixes (bundle 11, turn V2c; the operator's walk, 2026-10-11)

- **A row's expansion stays in its row's box** (`expandedRow`). On a phone it
  sits inside the card, under the facts and above the footer, in the name's
  column; in the table the row and its expansion are one band — no line
  between them, the expansion's cell starting at the row's bottom (`pt-0`), the
  line after the pair. The operator: "option is between the two attributes and
  may be confusing … place it back in the box it belongs". Every table with an
  expansion follows (Attributes' options, Strings' and Data scope's editors,
  Audit's detail). Test: HS-25.
- **A panel's primary waits for a change (D133).** `ToolbarPanel` takes `state` (the
  panel's choices as one string), keeps the string it opened with, and hands
  `footer` a `changed` flag that is true only while the two differ — a choice
  set back is no change. Columns' "Done" and Filters' "Show N results" / "Done"
  are enabled only then; the close (×), Escape and a tap outside always close.
  `FiltersButton` requires `state` (Categories, Countries, Places, Screening
  and the style page pass their filter values); `ColumnsButton` derives it from
  the hidden columns. The operator: "done … should be disabled if not changing,
  and only enabled after a change". The link manager's "Done" in Admin ›
  Attributes stays enabled: it is that dialog's only finger-sized way out, and
  every change there is saved as it is made. Tests: HS-24, HS-19, HS-20.

### Every table has its footer (bundle 11, group 3, turn G3a; the operator's walk, 2026-10-11)

"I don't see page count, pagination line in roles" — the census found three tables without `DataTablePagination`: Roles, the impersonation view's listings and Languages; each now has the footer (the range, rows per page, the pages). `useKeptPage(storageKey, defaultSize)` (src/components/shell/use-kept-page.ts) holds a table's page and its page size, the size kept in this browser (read after mount; storage that fails keeps the default). Languages opens at 100 rows (its order is set by hand, so the whole order stays on one page). Tests: KP-1, KP-2 (unit); RP-16, IMP-1 and TR-38 read the footers.

### ChartFrame measures the plot whenever it appears (bundle 11, group 3, turn G3b; INC-547)

The frame measured its plot once, at mount. A frame that mounts loading, empty or in error has no plot yet, so the measurement found nothing, never ran again, and the chart stayed blank after the data arrived (Admin › Audit's events-per-day chart, on every device). The plot's node is now held in state through a callback ref, and the measurement and its ResizeObserver run whenever the plot is rendered. Tests: CFM-1 (mounts loading, then draws), CFM-2 (mounts empty, then draws), CFM-3 (mounts with data, draws at once); red against the old frame for CFM-1 and CFM-2.

### The house date field (bundle 11, turn L1b; INC-549)

A phone's own date picker ignores a field's `min` and `max`: it offers days the field then refuses, and its month moves past the last allowed day (the operator's walk of the Audit dates, 2026-10-11). `DateField` (src/components/shell/date-field.tsx) opens the app's own calendar (src/components/ui/calendar.tsx, react-day-picker 9) inline under the field, the same on every device: days outside `min`/`max` are greyed and cannot be chosen, the month arrows stop at the bounds, the calendar opens on the chosen day or today kept inside the bounds, and the month and weekday names follow the page's language. The value is a calendar day, `YYYY-MM-DD` in the person's own calendar (src/components/shell/date-day.ts — never through UTC; a day the calendar lacks, such as 2026-02-31, is refused). A clear button empties it (`clearable`, default on). Every date field uses it: Admin › Audit's From and To, the seller's end date and a date question in the posting form. The category window (a date and a time, no bounds) keeps the browser's field. Strings: prim.date.pick, prim.date.clear, prim.date.next, prim.date.previous. Tests: DF-1..DF-5; AS-3 picks through the calendar.

### The agreed tables — the rules and their check (bundle 11, Part C, turn C1; D118, D128, D132, DEC-170)

Every admin table is built on the blocks above. One rule per element; `scripts/admin-tables.ts` checks each rule on every admin file that draws a `DataTable` (src/features/admin and every src/features/admin-… folder), run by the unit tests (scripts/admin-tables.test.ts):

- **T1 — the heading:** the page's heading sits in the header (`TableActions`). A table drawn inside another page takes its host's heading; the check's `SECTIONS` declares it (the Data scope inside Strings) and the host must draw it and pass T1.
- **T2 — the toolbar:** `TableToolbar` — the search, Filters, Columns, in that order.
- **T3 — Columns:** `ColumnsButton`, the choice kept by `useHiddenColumns`; the name column locked.
- **T4 — Filters:** a Filters button (`FiltersButton`) shows the chosen filters as chips (`FilterChips`, with Clear all).
- **T5 — the row's actions:** `RowActions` — Edit, a red Delete, the three-dots menu with the rest (its destructive items red). A row that only opens its own details carries the toggle of the table's `expandedRow` instead (Audit's Details).
- **T6 — the footer:** `DataTablePagination` — the range, rows per page and the pages — with the page size kept in this browser by one hook, `useKeptPage`. A table whose door pages differently names its own sizes (`useKeptPage(key, default, sizes)`; Screening: 25, 50, 100). No page keeps its size its own way.
- **T7 — cards:** below its breakpoint a table is one card per row; one column is the card's title (`card: "title"`), the others take the card's places (sub, meta, badge, foot).
- **T8 — tick-boxes:** only where a bulk action acts on the ticked rows (`selection` with `selectionActions`; D128 — today Screening and All listings).

**Every table, not only the admin's (bundle 16 turn R1, INC-630).** The check read the admin's folders alone, so the first table a user sees — My listings — was built without the toolbar, Columns or the row's actions and nothing refused it. It now reads every file under src/features that draws a `DataTable` (TBL-5; on the tree before the turn it refused My listings under T1, T2, T3 and T5). Two `DataTable` options came with it, each off unless asked: `cardLeadKind: "picture"` draws a card's lead as the row's own picture, 80 px and untinted, instead of the 36 px icon tile (a seller's ad and its photo); `selectionFrom: "md"` keeps the cards' tick-boxes from tablet width up, so a phone acts one row at a time (HS-26, HS-27).

The baseline of screens built another way reached zero in this turn. Users, Audit, Attributes, Categories, Countries and Places kept their page size their own way, and Coverage and Screening did not keep it; all eight now use `useKeptPage` under the same storage keys (a size already chosen stays; Coverage and Screening keep theirs from now on). So the check has no baseline: a new admin table is built on the blocks or the unit tests refuse it. Each rule is proven on planted files (TBL-1..TBL-3) and run on the tree (TBL-4: fourteen tables, no refusal); on the tree before this turn it refused the eight pages under T6 and nothing else. KP-3: a table's own sizes. Still open in Part C: the destructive-red rule's check over the inline removes (turn C2).

### A destructive act is red (bundle 11, Part C, turn C2; turn A3's census, G29)

**The rule:** every control that performs or confirms a destructive act — delete, remove, reject, revoke, unlink, deactivate, discard — is drawn red. The act in a list, or the button that opens its confirmation, is a red outline (`Button` variant `destructiveOutline`: red words and border); the button that confirms it, and an act with no confirmation of its own in a dialog or a bar, is filled red (`destructive`); a row's Delete is RowActions' red icon and a menu's destructive item is red (`tone: "danger"`).

**The check:** `scripts/destructive-red.ts` reads every .tsx file under src/ (tests left out). A label whose key's last part starts with one of those words (not the past tense: "Removed" names a state), or the confirmation under such a part (`….delete.confirm`), drawn by a control must be red: a JSX control's opening tag says `destructive` or `danger` (a variant, a tone, a class, or a class constant whose name says danger); a row action object says `tone: "danger"` or sits in RowActions' `remove` slot; a dialog's submit carries `danger`; a verb bar's `verb(…)` passes its danger flag. A label no control draws (a status, an error line) is not judged, nor a key picked at run time (the move dialog's Remove is red by its own rule). The exceptions are declared with their reasons, and an exception that no longer matches a control is refused: the attribute editor's option rows and the posting form's place rows edit the form, and nothing is removed until Save or Next (turn B3). Run by the unit tests (scripts/destructive-red.test.ts): DR-1..DR-3 on planted files, DR-4 on the tree.

**Fixed in this turn (the check's nine refusals on the base):** Roles › a permission's Revoke; Users › a user's role Remove (red words); the posting form's photo Remove (it deletes the photo at once) and the map pin's Remove; Settings › Unlink a sign-in method, Remove password and its confirmation, Remove an authenticator and its confirmation. Every other destructive control already was red (Screening's Reject, every Delete in RowActions, the attribute and category removes, Delete role, Deactivate, the language's Delete confirmation).

### An action's outcome is seen where it was taken (bundle 11, turn C8; INC-570)

**The defect:** the operator's walk of Change password on a phone (2026-10-12): "change password doenst do anything, doesnt give alert". Settings drew every action's refusal or confirmation once, under the page header — several screens above the form at 360 — so a press looked like nothing happened, though the checks ran (S-3 asserted `toBeVisible()`, which is true off-screen). The same class: the admin Listings list and Screening draw a row's outcome above the table, while the row can sit far below.

**The block:** `ActionMessage` (`src/components/ui/action-message.tsx`) — one live region for one action's outcome (`tone`: `error` or `done`; the role follows the tone, `alert` or `status`, unless named). It is placed beside the control that produced it, and whenever its text appears or changes it brings itself into view with `block: "nearest"` (nothing moves when it is already on screen; smooth unless reduced motion is asked for). Its scroll margins keep it clear of the fixed top band and the phone's bottom bar. Without text it renders nothing unless `persistent` keeps the empty region (Screening's notice, so its first message is announced). AMSG-1..AMSG-3.

**Where it is used:** Settings — each action answers beside its own control (the sign-in methods' actions under that section; Remove password's refusal inside its confirmation, its success under the methods; Change password and Change email above their buttons; Sign out other devices under its button); the admin Listings list (`listings-notice`) and Screening (`admin-screening-notice`). Already beside their controls, unchanged: the sign-in page (inside its form), the listing page (under its buttons), the category and location verb bars, the countries export, every dialog, the translations bars and cards, the user and role cards.
