# Turn R1d plan — the rest of the left menu (D240, D241, D243, D245, D246, D247 under DEC-288)

Base: dev after R1c-fix. Tier B. No migration, no new dependency. Plan only; no R1d code was written in R1c-fix.

## CI first

Read the last completed run at the raw ci-evidence addresses before any change. R1c-fix's final tree is the expected base; any red is classified from its failure body and fixed first.

## What R1c and R1c-fix already built (reused, not rebuilt)

- The sub-menu mechanism: `submenu-signal.ts` (first paint, `MENU_FIT_MAX`, `SUBMENU_SIGNALS`), the panel code through `overlay-loader.ts`, failures through `reportOnDemandFailure`.
- D244 placement (on resize, under the top bar at every level), D245 surface and 300 ms opacity fade, D246 URL-level opening for categories, D247 `.menu-fit` with the two bands (32–40 px below 768, 32–48 px from 768; `data-many` above 16).
- Guards: CF-SUB-1 (`submenu-allowlist.txt`: `app-rail.tsx (3)` — the strip's painted rows, the admin groups, MenuNav's collapsible) and CF-ROWS-1 (`menu-rows-allowlist.txt`: the strip line).

## Item 1 — D240 at ≥ 768: admin groups, account and seller sections open side panels

- MenuNav (`app-rail.tsx` :728) stops drawing groups through `Collapsible` (:374–:426). A group row becomes a sub-menu opener on the same mechanism as a category: hover 150/300 ms with the safe triangle, click navigates to the group's first permitted page, arrow/Escape keys, coarse tap opens page and panel.
- The panel's rows come from the same data MenuNav reads today (`src/config/panels.ts`, `src/features/admin/rail-items.ts`, `use-admin-sections.ts`), never a copy (K1). Section alerts keep `useNavAlerts` (sections.ts `alert`).
- The admin menu holds 26+ items: its main list is `data-many` — full-size rows, visible scrollbar (D247). Each group's panel follows the 16-item rule.
- Leaves: the Collapsible import leaves app-rail.tsx if no other user remains (census at build time).

## Item 2 — DEC-288 / D241 on phones: the 64 / 192 split

- The open phone menu stays 256 px. Opening a category, group or section narrows the main column to 64 px (icons only, the open one highlighted with the active token) and shows a 192 px sub-panel headed by the opened item's name; names wrap (no truncation beyond CutText's rules).
- The sub-panel's header carries the back control (‹ Main menu / ‹ parent); it moves up without navigating; the breadcrumb navigates (D246 unchanged).
- Replaces: the in-place drill (D98 with D213) and the phone strip's painted rows (`strip-scroll`, the 48 px icon column) — the strip's icon column becomes the split's 64 px column.
- Transition proposal (D245's concern — never a panel sliding out of the menu): the main column's width eases 256→64 over 200 ms while the sub-panel's content cross-fades in by opacity in place, anchored at the column's edge (no translate). Reduced motion: none either way. The operator walks it.

## Item 3 — D246 under the split, and MenuNav's marking onto the URL level

- An opening on a page inside a section opens the split at that level, the current item marked (`aria-current="page"`) and scrolled into view; the peek (D243) opens the same way and stays as it is (every load and reload, three seconds, no focus).
- MenuNav's current-item marking moves from its own match to the URL-level helper the category rail uses (K2 of R1c), one function for every menu.

## Item 4 — D247 everywhere

Every list in the split and in the admin, account and seller panels takes `.menu-fit` and its count from `MENU_FIT_MAX`. ROWS-E2: the admin menu (more than 16) is `data-many`, full-size rows, scrollbar width > 0, measured without `--hide-scrollbars`.

## Allowlists to zero

- CF-SUB-1: `app-rail.tsx (3)` → 0; the line is removed and the guard refuses any in-place sub-list (planted proof per removed site).
- CF-ROWS-1: the strip line → 0; the guard refuses a hidden menu scrollbar anywhere (planted proof).
- Register rows 79/80 amended; panels.md and changelog updated.

## Tests (ids grep-checked free at build time)

- ROWS-E2 (admin menu > 16), SMN-E7 (admin group panel at 1280: hover, click, keys), SMN-E8 (account/seller panels), SPL-E1 (phone split 64/192, header name, icons only, open one highlighted), SPL-E2 (D246: split opens at the URL's level, row in view, back moves up without navigating), SPL-E3 (reduced motion: no transition), SPL-E4 (peek unchanged under the split).
- Existing tests reading the in-place drill (shell.spec.ts B21SC-*, RM-*, FV-1, the admin rail specs) re-read; each changed assertion named under G38 with why.
- Unit: CF-SUB-1/CF-ROWS-1 planted proofs; a geometry unit for the split widths.
- Each touched spec whole, both projects, retries 0; by-id runs for every test using a changed helper (G37).

## Growth

Expected: the split's opening logic in the entry (~0.2–0.4 KiB) minus the Collapsible path; panel rows ride the already-on-demand panel code. Up to 0.5 KiB per page with its cause under DEC-296; more is a STOP with the per-chunk table.

## Conflicts

- C2's 44 px touch target vs. 32–40 px phone rows: covered by the recorded C2 exception (D247) — no new conflict.
- The admin menu's groups today expand in place for screen-reader users with `aria-expanded`; the disclosure pattern (WAI-ARIA disclosure navigation) keeps `aria-expanded` on the opener — no loss.
- Signed-in rail height (INC-1011): R1c-fix measured signed out only; if a signed-in section (account foot) takes category height, that is a product ruling, not R1d's call.

## K2 (seen, not touched)

- Tooling `localeCompare` sites and the E2E Segmenter oracle (from L-2).
- The rail stops at the footer on a short page (`--rail-bottom-inset`), which is what shortened CI's rail to 302 px — behaviour by design, named for the operator's walk.

## Build order (ESTIMATES)

1. Part 1 — MenuNav groups onto the mechanism at ≥ 768, admin/account/seller panels, ROWS-E2, CF-SUB-1 count 3→1 (ESTIMATE: one turn's half).
2. Part 2 — the phone split (64/192), the strip's rows replaced, CF-SUB-1 1→0, CF-ROWS-1 strip line → 0 (ESTIMATE: one turn's half).
3. Part 3 — D246 under the split and MenuNav's URL marking; the peek proof (ESTIMATE: a third of a turn).
4. Part 4 — the old tests re-read, growth table, records, checks, report (ESTIMATE: a third of a turn).

SPLIT: allowed after Part 1 or Part 2 with the checks green.
