# Turn R1d plan (revised in R1d-a) — the rest of the left menu: D240, D241, D243, D246, D247, D248, D249, D251 under DEC-288

Base: dev after R1d-a. Tier B. No migration, no new dependency. Plan only; no R1d code was written in R1d-a. Where this revision is silent, the R1d plan of cbedb82e governs.

## CI first

Read the last completed run at the raw ci-evidence addresses before any change; any red is classified from its failure body and fixed first.

## What R1c, R1c-fix and R1d-a already built (reused, not rebuilt)

- The sub-menu mechanism: `submenu-signal.ts` (first paint, `MENU_FIT_MAX`, `SUBMENU_SIGNALS`), the panel through `overlay-loader.ts`, failures through `reportOnDemandFailure`.
- D244 placement on resize and under the top bar; D245's 300 ms opacity fade (its surface withdrawn by D248); D246 URL-level opening for categories.
- D247/D248 rows: `.menu-fit` (32–40 px below 768, 32–48 px from 768; `data-many` only below 768); `.menu-snap` (a panel at the rail's row height); `snapToGrid` (submenu-geometry.ts).
- One row look: `src/components/shell/menu-row.ts` (ITEM_CORE, ITEM_IDLE, ITEM_ACTIVE), imported by the rail and the panel; CF-ROWS-1 refuses a menu's own row classes.
- Guards: CF-SUB-1 (`submenu-allowlist.txt`: `app-rail.tsx (3)` — the strip's painted rows, the admin groups, MenuNav's collapsible) and CF-ROWS-1 (`menu-rows-allowlist.txt`: the strip line).

## Item 1 — D240 at ≥ 768: admin groups, account and seller sections open side panels

- MenuNav (`app-rail.tsx`) stops drawing groups through `Collapsible`. A group row is a sub-menu opener on the same mechanism: hover 150/300 ms with the safe triangle, a click opens the group's first permitted page, arrow/Escape keys, a coarse tap opens page and panel.
- The panel's rows come from the data MenuNav reads today (`src/config/panels.ts`, `src/features/admin/rail-items.ts`, `use-admin-sections.ts`), never a copy (K1); section alerts keep `useNavAlerts`.
- D248 applies unchanged: the rail's surface and rows, icons from the panel config, one-line names, the snap to the rail's grid. The admin menu (26+ items) has no item limit from 768: it fits at ≥ 32 px or scrolls with a visible scrollbar.

## Item 2 — the phone split (DEC-288, D241, D248, D249)

- The open phone menu stays 256 px. Opening a category, group or section narrows the main list into a 64 px column (icons only, the open item highlighted with ITEM_ACTIVE) and shows the sub-list in a 192 px column.
- D248 on phones: both columns use `menu-row.ts`'s rows and the category glyphs; every name is one line, cut with an ellipsis (CutText), full name as aria-label and title. This replaces DEC-288's "names wrap" and the cbedb82e plan's "names wrap (no truncation beyond CutText's rules)".
- D249, the third level: opening a level-3 list closes the main list; the level-2 list takes the 64 px column (icons only, its open item highlighted); the level-3 list takes the 192 px column.
- The header: every sub-list has ONE header row, "← <the opened item's name>" (e.g. "← Electronics", "← Phones & Tablets"); a tap moves up one level without navigating; the breadcrumb navigates. This replaces "‹ Main menu / ‹ parent".
- Rows below 768: D247's band (32–40 px, the 16-item rule with `data-many`) in each column.
- Replaces the in-place drill (D98 with D213) and the strip's painted rows (`strip-scroll`).

### The column state machine

- States: `full` (the main list, 256 px), `level2` (main list 64 px + level-2 list 192 px), `level3` (level-2 list 64 px + level-3 list 192 px). A state carries the opened ids (`{ kind, at: id, parent?: id }`).
- Events: `open(id)` (deeper: full→level2, level2→level3, level3→level3 one step deeper with the previous level-3 list moving into the narrow column), `back()` (the header row: one level up), `fromUrl(path)` (D246: the state for the page — a level-3 page opens in `level3` with its item marked and in view), `close()`.
- Lives in one pure module, `src/components/shell/menu-columns.ts` (reducer + `columnsFromUrl`), unit-tested; the phone menu in app-rail.tsx holds it with `useReducer` and replaces `localLevel`. Category tree and panel config both feed it through one `levelOf(id)` reader, so admin/account/seller sections share the machine.

### D251, the moves

- Going deeper: every column slides leftward together — the 192 px column slides into the 64 px place, the 64 px column slides out to the left, the new list slides in from the right into the 192 px place.
- Going back: the 192 px list slides out to the right, the 64 px list slides right and widens into the 192 px place, the level above slides in from the left into the 64 px place.
- From the split back to the full main list: the sub-list slides out to the right while the main list widens back.
- Mirrored in right-to-left languages (the sign of every translate follows `dir`).
- Transform and opacity only (widths change by a scaleX-free swap: each column is drawn at its target width and moved by translateX; a column changing width cross-fades its icons-only / full row content by opacity). One duration and easing for every move: 250 ms, `cubic-bezier(0.2, 0, 0, 1)`. No animation under prefers-reduced-motion (the state changes at once). D245's fade stays for the side panel from 768 px.

## Item 3 — D246 under the split, and MenuNav's marking onto the URL level

- An opening on a page inside a section opens the split at that level (`columnsFromUrl`), the current item marked (`aria-current="page"`) and scrolled into view; the peek (D243) opens the same way and stays as it is.
- MenuNav's current-item marking moves from its own match to the URL-level helper the category rail uses (K2 of R1c): one function for every menu.

## Item 4 — D247/D248 everywhere

Every list in the split and in the admin, account and seller panels takes `.menu-fit`, its count from `MENU_FIT_MAX`, and `menu-row.ts`'s rows. ROWS-E2: the admin menu from 768 px (more than 16 items) fits at ≥ 32 px or scrolls with a visible scrollbar (D248, no item limit); below 768 its list is `data-many` with full-size rows and a visible scrollbar.

## Allowlists to zero

- CF-SUB-1: `app-rail.tsx (3)` → 0; the line removed; the guard refuses any in-place sub-list (planted proof per removed site) and any column state held outside `menu-columns.ts`.
- CF-ROWS-1: the strip line → 0; the guard refuses a hidden menu scrollbar anywhere (planted).
- Register rows 79/80 amended; panels.md and changelog updated.

## Tests (ids grep-checked free at build time)

- Unit: MCL-1 the state machine (full→level2→level3, back each step, open while in level3); MCL-2 `columnsFromUrl` for a level-1, level-2 and level-3 page; MCL-3 RTL signs of each move.
- ROWS-E2 (the admin menu, both widths), SMN-E11 (admin group panel at 1280: hover, click, keys, D248 look), SMN-E12 (account and seller panels).
- SPL-E1 the split: 64/192 px columns, header "← <name>", icons only in the narrow column, the open one highlighted, one-line names with an ellipsis.
- SPL-E2 the third level (D249): the main list gone, level 2 in the 64 px column with its open item highlighted, level 3 in 192 px.
- SPL-E3 the header row's back moves: level3→level2→full without a URL change; the breadcrumb navigates.
- SPL-E4 each move's direction, by column boxes sampled during the move (requestAnimationFrame samples): deeper = every column's x decreasing; back = increasing; back to full = the sub-list's x increasing while the main list widens.
- SPL-E5 reduced motion: no transition (computed duration ≤ 0.001 s), the end state at once.
- SPL-E6 RTL (Amharic stays LTR; an RTL test language through the CF-LANG-1 seam): every direction mirrored.
- SPL-E7 D246 under the split: a level-3 page opens in level3, its item marked and in view; SPL-E8 the peek unchanged (D243).
- Existing tests reading the in-place drill (shell.spec.ts B21SC-*, RM-*, FV-1, ROWS-E1, ROWS-E5, the admin rail specs) re-read; each changed assertion named under G38 with why.
- Each touched spec whole, both projects, retries 0; by-id runs for every test using a changed helper (G37).

## Growth

Expected per page: the column machine and the split's first-paint markup in the entry (~0.3–0.45 KiB gzip) minus the Collapsible path (~0.1 KiB); the move styles in the shared stylesheet (~0.1 KiB); admin panels ride the already-on-demand panel code. Up to 0.5 KiB per page with its cause under DEC-296; more is a STOP with the per-chunk table.

## Conflicts

- C2's 44 px touch target vs. 32–40 px phone rows: covered by the recorded C2 exception (D247).
- D248's one-line names in a 192 px column cut long Amharic names more often than wrapping did; the full name stays as aria-label and title (no hover on phones: the full name is read by screen readers only). Named for the operator's walk.
- INC-1011: on a short page the rail ends at the footer; with D248 a panel takes at most the rail's height, so a 12-row panel at 1280×600 on a short page scrolls at 32 px (measured in R1d-a). Whether the menu keeps its height there is the operator's ruling.

## K2 (seen, not touched)

- Tooling `localeCompare` sites and the E2E Segmenter oracle (L-2).
- The rail stops at the footer on a short page (`--rail-bottom-inset`).
- PHR-1's 5 s timeout under the full check's load (R1c-fix).

## Build order (ESTIMATES)

1. Part 1 — `menu-columns.ts` (machine + `columnsFromUrl`), MCL-1–3 (ESTIMATE: a quarter of a turn).
2. Part 2 — the phone split on the machine: 64/192 columns, header row, D249 level 3, D251 moves, reduced motion, RTL; strip rows replaced; CF-SUB-1 1 site, CF-ROWS-1 strip line → 0; SPL-E1–E8 (ESTIMATE: one turn).
3. Part 3 — MenuNav groups onto the side panel at ≥ 768 and onto the split below; admin/account/seller; URL marking; ROWS-E2, SMN-E11/E12; CF-SUB-1 → 0 (ESTIMATE: two thirds of a turn).
4. Part 4 — old tests re-read, growth table, records, checks, report (ESTIMATE: a third of a turn).

SPLIT: allowed after Part 2 or Part 3 with the checks green.
