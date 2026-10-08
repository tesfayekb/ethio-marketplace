# Bundle 9 — the house style: brief, version 2 (saved unchanged, 2026-10-08)

```text
BUNDLE 9 — THE HOUSE STYLE, VERSION 2 (2026-10-08). THIS FILE REPLACES VERSION 1. Turn 1 (step 0, T0, Part A — the tokens and their first uses) landed at accdd3fe and is verified. This version specifies TURN 2 = PART B, the shared blocks: they are built once, shown and tested on /dev/style, and NO console or page is moved to them in this turn. Parts C to E are named at the end; the supervisor replaces this file with version 3 while turn 2 runs — if version 3 has not arrived when turn 2 is done, END THE TURN with the report. Tier B; no database change, no migration.
Line numbers are as of commit accdd3fe (dev). This file is public: it is written as build instructions.

ANSWERS TO TURN 1'S REPORT
- Turn 1 is verified against the diff of c46aa32b..accdd3fe: the nineteen token lines equal the table in both modes and `.dark`'s `--destructive` is untouched; the radius map, the registrations and the shadow scale are as written; the four first uses; T0; the token test and HS-1, HS-2; the docs. Nothing is owed from it.
- scripts/e2e-select.ts gaining the `house-style` area: accepted — the "every spec is reachable" test requires it (step B9 extends its list).
- The contrast pairs that differ from the table by 0.01 are rounding: accepted.
- /dev/style's menu and dialog are not opened by a test: HS-3 of this turn opens a menu; the dialog's shadow is judged by eye at the operator's first look.
- Pointing the local browser at the installed one with E2E_CHROMIUM_PATH is a local setting: accepted.
- Ending turn 1 when version 2 had not arrived was right.

STEP 0 — keep this brief
- Before anything else, save this file byte for byte OVER docs/governance/briefs/bundle-9.md (it is already in its saved form: the header line and one fenced text block). On every later turn, read that file first. roadmap.md line 3 stays as it is; tick no roadmap line in this turn.
- Cut the strings table out of this brief by script — the bytes between the line `=== BEGIN bundle-9-strings.json ===` and the line `=== END bundle-9-strings.json ===` at the end of this file, without those two lines — and save them as docs/governance/briefs/bundle-9-strings.json (431 bytes, sha256 5a585df4b485ae42fd2345c01bf536e187d042c37b7672648b9b1af8c705f060; check it, and stop if it differs).

HOW TO WORK
- Order of the turn: step 0; B8 (the strings) first, so that every block has its keys; B1 to B7 with their tests; B9; push; the report; END THE TURN. Do not stop between steps: a clean point is not a reason to stop. Stop only for a question this brief cannot answer or the end. If the platform ends the turn early, stop at a clean point (typecheck, format:check, lint and every spec file you touched green), report three lines — done, left, CI — and the operator sends "continue".
- The turn starts by reading CI for the last commit on dev: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address (you cannot git-fetch that branch). Paste the first six lines of ci-status.md. A red that is not a cancelled run is named in your report's first lines and fixed first.
- Browser tests are started only with `bun run e2e:local <files>` or `bun run e2e:changed` (AGENTS.md; DEC-146). Nothing signs in to, or runs a test against, ethio-prod or the published site.
- Local runs (G37): every spec file you changed or added, run whole, alone, both projects where the configuration runs it in both, 2 workers, 0 retries, fake mode — and e2e/primitives-law.spec.ts and e2e/shell-table-law.spec.ts whole, because the table's pager is touched. "A file that is not fully green is not committed." CI on the turn's final commit is the full proof; a local run never writes "CI green". Unit and component tests (vitest) run whole.
- Tests (G38): a red is fixed at its root. No assertion is loosened, no timeout raised, no retry added, no test skipped or moved to make a run pass. An existing test that fails is not edited: name it in the report with its line and what it asserts — the supervisor rules on it. src/components/shell/data-table.test.tsx passes UNCHANGED (its two pager cases at :207–238 pin the range text).
- ADDITIVE ONLY. Every existing prop, default, test id and rendered text of DataTable and DataTablePagination stays exactly as it is for a caller that passes none of the new props: the thirteen tables of the app must render byte for byte as before. New behaviour is reached only through a new prop.
- No migration, no database write, no package change (name a platform bump in your first lines and leave it), no new dependency: every block is built from what is installed (the Radix tooltip, dropdown-menu and popover wrappers under src/components/ui/, lucide-react).
- Colours and shadows: tokens only (Part A's); no palette class, no hex, no rgb() in a component.
- Strings: exactly the five keys of B8, copied by script from the saved table, character for character; you write no English and no Amharic of your own. Fixture labels on /dev/style are fixture data, written `{"…"}` as the page already writes them; a control on that page that needs a name takes it from a key that exists.
- Scope: only the files a step names, plus the generated files the scripts regenerate (src/routeTree.gen.ts, docs/generated/i18n-usage.json, public/i18n-usage.json). A file you create outside a step's list is named in the report's first lines with its reason.
- Closed surfaces (G22): the workflow files, the failure reporter, the migration check and e2e/global-setup.ts are not touched.
- Records: you write the changelog lines; the decision and incident ledgers are the supervisor's.
- The commit that is judged by CI ends the turn: push, END THE TURN, send nothing after it.

PART B — THE SHARED BLOCKS
THE SIZE RULE (used by B1, B3 and B4). A control a finger may press is 44 px on its short side; with a mouse it is 36 px. In classes: `size-11 md:pointer-fine:size-9` for a square control, `h-11 md:pointer-fine:h-9` for a field or a text button (the installed Tailwind has the `pointer-fine` variant). Below md a control is always 44 px, whatever the pointer. (The test projects both use a fine pointer: mobile-360 measures 44 px, desktop-1280 measures 36 px.)
THE TOOLTIP RULE (INC-089; src/components/shell/app-rail.tsx :66–89 is the law). A tooltip always sits OUTSIDE a trigger, never between a trigger and its DOM element: when a control is both a tooltip's trigger and a menu's trigger, the order is Tooltip › TooltipTrigger asChild › DropdownMenuTrigger asChild › the button. A component handed to an `asChild` parent forwards its ref to a real DOM element; it never returns a Fragment or a provider at its root.

B1 — IconButton, src/components/ui/icon-button.tsx (new). An icon-only button that cannot exist without a name.
- Props: `label: string` (REQUIRED — the accessible name and the tooltip's text), `icon: ReactNode`, `tone?: "neutral" | "danger" | "success" | "warning" | "info"` (default neutral), `size?: "row" | "touch"` (default "row"), and the native button props; `forwardRef` to the button element; `type="button"` by default.
- Renders: its own `TooltipProvider delayDuration={150}` (as app-rail.tsx :499) › Tooltip › TooltipTrigger asChild › the shared Button (variant ghost) with `aria-label={label}` and NO `title` attribute; the icon wrapped `aria-hidden`; TooltipContent shows the label. A second export, `IconButtonBare`, is the same button WITHOUT the tooltip wrapper and the provider (same props, same classes, same aria-label) — it is what B2 hands to the menu trigger, which wraps it in its own tooltip.
- Sizes: "row" follows THE SIZE RULE (`size-11 md:pointer-fine:size-9`); "touch" is `size-11` always. Padding 0; the icon is `size-4`.
- Tones (text and hover surface): neutral `text-muted-foreground hover:bg-accent hover:text-foreground`; danger `text-destructive hover:bg-destructive-soft`; success `text-success hover:bg-success-soft`; warning `text-warning hover:bg-warning-soft`; info `text-info hover:bg-info-soft`.
- Component test beside it (vitest, as data-table.test.tsx renders): the button's accessible name is the label; it has no `title`; a `ref` reaches the button element; each tone carries its text class.

B2 — RowActions, src/components/shell/row-actions.tsx (new). The one way a row of a table or a card of a list offers its actions.
- Props: `testid: string`; `name: string` (the row's own name); `edit?: { label: string; onSelect: () => void; disabled?: boolean }`; `remove?: { label: string; onSelect: () => void; disabled?: boolean }`; `more?: Array<{ key: string; label: string; icon?: ReactNode; tone?: "neutral" | "danger"; onSelect: () => void; disabled?: boolean }>`.
- Renders, in one `flex items-center justify-end gap-1` row and in this order: the Edit IconButton (lucide `Pencil`, tone neutral, `data-testid={testid + "-edit"}`), the Delete IconButton (`Trash2`, tone danger, `testid + "-delete"`), the three-dots (lucide `EllipsisVertical`, or its older name `MoreVertical` if that is what the installed package exports — say which; tone neutral, `testid + "-more"`) — each only when its prop is given (`more` only when it has an entry); with none it renders null. Every control's accessible name is `<label> — <name>` (the three-dots' label is the existing key `prim.table.actions`); its tooltip shows the label alone.
- The menu: DropdownMenuContent `align="end"`, `data-testid={testid + "-menu"}`; one DropdownMenuItem per entry (`testid + "-more-" + key`), `min-h-11`, its icon (`size-4`, aria-hidden) then its label; entries with tone danger come LAST, after one DropdownMenuSeparator, with `text-destructive focus:text-destructive` (as src/features/admin-attributes/attributes-page.tsx :460–470 does today); a disabled entry is `disabled`.
- The three-dots follows THE TOOLTIP RULE: Tooltip › TooltipTrigger asChild › DropdownMenuTrigger asChild › IconButtonBare. RowActions wraps its row in ONE `TooltipProvider delayDuration={150}` for that tooltip.
- Component test beside it: null with no props; the three names; the order edit, delete, more; danger entries last behind the separator; `onSelect` fires once per choice.

B3 — THE TABLE'S FOOTER, src/components/shell/data-table.tsx, `DataTablePagination` (:170–225). Three zones — the count at the start, rows per page in the centre, the page numbers at the end.
- New OPTIONAL props (the six that exist are unchanged): `onPage?: (pageIndex: number) => void` (zero-based); `pageSizeOptions?: number[]` with `onPageSize?: (size: number) => void`.
- Layout: the root keeps its test id and becomes `grid min-w-0 gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center` (one column below md, the three zones in a row from md). Zone 1: the range span, UNCHANGED (text, classes, test id `<testid>-range`). Zone 2 (rendered only when both size props are given; otherwise an empty element keeps the grid): a `<label>` with the text of `prim.table.pageSize` and the NativeSelect of B4 (`<testid>-size`) listing the options, the current `pageSize` selected. Zone 3, `md:justify-self-end`: Previous and Next exactly as they are today (same test ids, same keys), and BETWEEN them, only when `onPage` is given, the page run: a pure function `pageWindow(current: number, count: number): Array<number | "gap">` (exported; count = ceil(total / pageSize), current zero-based) returning every page when count ≤ 7, otherwise the first, the last, the current and one neighbour on each side, with ONE "gap" wherever pages are left out; each page is a button `<testid>-page-<n>` (n one-based, also its text), `aria-label` = `prim.table.page` with `{n}` filled, `aria-current="page"` on the current one, which is drawn `bg-primary text-primary-foreground`; a gap is a non-interactive `…` (aria-hidden); the buttons are joined (`-ms-px`, the first and last rounded) and each follows THE SIZE RULE for a text button with `min-w-9`.
- With `total === 0` the run is empty and both arrows are disabled, as today.
- Unit cases for `pageWindow` in data-table.test.tsx's own style, in a NEW file src/components/shell/data-table-pagination.test.tsx: count 1; count 7 (all seven); count 12 at current 0, 4, 11 — `[1,2,"gap",12]`, `[1,"gap",4,5,6,"gap",12]`, `[1,"gap",11,12]`; and three render cases: no new prop ⇒ no page button and no size control; `onPage` ⇒ the run with `aria-current` on the right button and a click calling `onPage` with the zero-based index; the size props ⇒ the select calls `onPageSize` with a number.

B4 — NativeSelect, src/components/ui/native-select.tsx (new). One styled native `<select>`: `forwardRef`, the native props, classes `h-11 md:pointer-fine:h-9 min-w-0 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50` joined with a `className` prop. The nine style constants the consoles carry for their selects are NOT touched in this turn (Part D moves them).

B5 — FilterChips and FiltersButton, src/components/shell/filter-chips.tsx (new).
- `FilterChips` — props `testid: string`; `chips: Array<{ key: string; label: string; onRemove: () => void }>`; `onClearAll: () => void`. Renders null when `chips` is empty; otherwise a wrapping row: one chip per entry (`testid + "-chip-" + key`; `rounded-md border border-input bg-card ps-2.5 text-sm`, its label, then an IconButton with lucide `X`, tone neutral, whose label is `prim.table.removeFilter` and whose accessible name is `<that label> — <chip label>`), then a Button variant link with the text of `prim.table.clearAll` (`testid + "-clear"`).
- `FiltersButton` — props `testid: string`; `count: number`; `children: ReactNode` (the console's own filter controls). A Button variant outline with lucide `ListFilter`, the text of `prim.table.filters` and, when count > 0, a count mark (`testid + "-count"`; `rounded-full bg-primary text-primary-foreground text-xs min-w-5 h-5 px-1.5`), opening the Popover of src/components/ui/popover.tsx (`align="start"`, `data-testid={testid + "-panel"}`) that holds the children in a `flex flex-col gap-3 p-3` box. The button follows THE SIZE RULE for a text button.
- Component test beside it: nothing with no chip; a chip's remove calls its `onRemove`; clear calls `onClearAll`; the count mark shows only above zero.

B6 — THE SELECTION BAR, src/components/shell/data-table.tsx (:328–335). One new OPTIONAL prop of DataTable, `selectionActions?: ReactNode`: when given, it is rendered at the end of the `data-table-selection` bar (`ms-auto flex flex-wrap items-center gap-2`). Nothing else in the bar changes.

B7 — /dev/style SHOWS THE BLOCKS (src/routes/dev.style.tsx; local component state only, no data access). New sections under the ones of Part A: (1) "Row actions" — a three-row sample list (plain markup, not DataTable), each row with RowActions (`testid` `style-row-<n>`; edit, remove and two `more` entries, the second tone danger); the chosen action is written into a status line (`style-row-last`); (2) "Icon buttons" — one IconButton per tone; (3) "Pager" — a DataTablePagination with 300 results, page size 25 with options 10, 25, 50 and all three new props wired to local state (`testid` `style-pager`); (4) "Filters" — a FiltersButton whose panel holds two NativeSelects, with FilterChips beside it reflecting the two selections (`testid` `style-filters`); (5) "Selection" — nothing new to show without a table; leave it out.

B8 — THE STRINGS. From docs/governance/briefs/bundle-9-strings.json, by script: its five keys are added to src/i18n/locales/en.ts and am.ts beside the existing `prim.table.*` keys (en.ts :490–496), each value character for character. The table (for reading; the file is the source):
  prim.table.pageSize — English: Rows per page · Amharic: በአንድ ገጽ ረድፎች
  prim.table.page — English: Page {n} · Amharic: ገጽ {n}
  prim.table.filters — English: Filters · Amharic: ማጣሪያዎች
  prim.table.clearAll — English: Clear all · Amharic: ሁሉንም አጽዳ
  prim.table.removeFilter — English: Remove filter · Amharic: ማጣሪያውን አስወግድ
The Amharic of all five is built only from words the catalog already uses for the same things (am.ts: `admin.categories.filter.pageSize`, `admin.attributes.filter.clear`, `prim.table.selectAll`, `settings.removePasswordConfirmYes`). Your report lists the five keys with both values as they landed.

B9 — THE BROWSER TESTS AND THE DOCS.
- e2e/house-style.spec.ts gains (both projects; no account, no seeded row): HS-3 — on /dev/style the first sample row's Edit and Delete buttons are found BY ROLE AND NAME (`<label> — <row name>`); focusing Edit by keyboard shows a tooltip with the label; the three-dots opens the menu, whose last entry is the danger one; choosing an entry writes it to `style-row-last`; Escape closes the menu and focus returns to the three-dots; the three controls each measure at least 44 × 44 px on mobile-360 and exactly 36 × 36 px on desktop-1280. HS-4 — the pager shows `1–25` in its range, the run `1 2 … 12`; a click on page 2 moves `aria-current` and the range to `26–50`; choosing 50 rows per page returns to the first page and shows `1–50` and a run of six pages; Previous is disabled on page 1. HS-5 — the filters button shows no count, then, after one select in its panel is set, the count 1 and one chip; the chip's remove clears it; with two set, "Clear all" clears both. HS-2 (axe, light and dark) stays and now covers the new sections.
- docs/features/display-primitives.md: one section per new block (IconButton, RowActions, the pager's three zones, NativeSelect, FilterChips and FiltersButton, the selection bar's actions) with its props, its test ids, THE SIZE RULE and THE TOOLTIP RULE; docs/features/design-foundation.md: THE SIZE RULE in one line. One changelog line.
- scripts/e2e-select.ts: the `house-style` area you added in turn 1 gains `src/components/shell/row-actions.tsx`, `src/components/shell/filter-chips.tsx` and `src/components/shell/data-table.tsx` in its `src` list, so that `bun run e2e:changed` selects e2e/house-style.spec.ts when a block changes; its unit test passes.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- PART C — the frame: bars that stay on every screen size, the phone's icon strip and bottom bar, one page padding, row heights.
- PART D — the pattern console (Admin › Categories), then every other screen.
- PART E — one written rule and one automatic check per element, with a baseline that only shrinks.

REPORT. First lines: done or not done for step 0, B1 to B9; any platform bump; any file outside this brief's lists; any existing test left red (file, line, what it asserts). Then: the six ci-status lines; the five strings as landed (key, English, Amharic); the unit and component suite (count); each local browser run (file, project, passed/failed, retries); typecheck, format:check, lint (and whether any lint warning comes from a file of turn 1 or of this turn — expected none); the compiled CSS rule of `md:pointer-fine:size-9` as the build wrote it; the file list from `git diff --name-only accdd3fe`; "Logs read: … · unavailable: …"; limitations. Never "CI green" from a local run.

=== BEGIN bundle-9-strings.json ===
{
 "set": {
  "prim.table.pageSize": {"en": "Rows per page", "am": "በአንድ ገጽ ረድፎች"},
  "prim.table.page": {"en": "Page {n}", "am": "ገጽ {n}"},
  "prim.table.filters": {"en": "Filters", "am": "ማጣሪያዎች"},
  "prim.table.clearAll": {"en": "Clear all", "am": "ሁሉንም አጽዳ"},
  "prim.table.removeFilter": {"en": "Remove filter", "am": "ማጣሪያውን አስወግድ"}
 },
 "remove": []
}
=== END bundle-9-strings.json ===
```
