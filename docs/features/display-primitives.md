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
