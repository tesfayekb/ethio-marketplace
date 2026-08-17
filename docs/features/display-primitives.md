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

## Adoption

Feature screens adopt these primitives as each U section ships; no feature page was migrated in U1c.
