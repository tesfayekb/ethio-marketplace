# Foundations turn R1d-b — report (split after item 2 of the continue ruling)

1. **Step 0.** docs/governance/briefs/foundations-turn-r1d-b.md; sha256 of the fenced text `70bf846a75353d958d66ba0d2a7d62a0f4d94a32d28bb0f187fcaac45bc1bbc8` (matches). Roadmap line 3 names it.
2. **CI.** 60287c03: its run was not completed when read; superseded. Last completed run 41035524031 on ffb3ee6f (stop 1's tree): FAILURE — 13 gating E2E failures plus "i18n used-on map is fresh". Classified: test shape from stop 1's own footer change (the footer and rail tests still asserted U0i's clamp and a full-width footer) and the map left stale by the deletion. Fixed this turn: the footer/rail tests re-read under G38 (below); `i18n:map-guard` reports "usage maps match the tree". The one flaky body (shell.spec.ts :1279, mobile bar) passed whole locally, both projects.

## Parts
- **Part 1 (D254) — done.** `snapToGrid` keeps the menu's measured row height and takes the whole rows that fit; the panel snaps to the main menu's whole shown rows, also when the rail itself scrolls (submenu-impl.tsx — found by SMN-E13, panel was 8 px off a scrolled rail's grid). Tests: SNP-3 replaced (G38), SNP-4 new; SMN-E10 replaced (G38: rows equal a rail row at 1280×1000 and 1280×600, spans the menu, visible scrollbar); SMN-E13 new (one row more than the menu holds); ROWS-E3 panel branch and SMN-E4's `everyRowOnScreen` replaced (rows equal a rail row, never the 32 px floor). The Services 21-row case is covered by SMN-E10/SMN-E13 on seeded branches (J3: no real row as a fixture); not run against production's Services list.
- **Part 2 (D252) — done.** Rail `md:bottom-0`; `useFooterInset` / `--rail-bottom-inset` deleted (census: app-rail.tsx the only consumer). Footer wrapper takes the page column's start. **One width source (continue item 1):** src/components/shell/menu-width.ts (`MENU_WIDTH`, `MENU_INSET`) read by the rail, the logo cell, the page column and the footer; CF-WIDTH-1 (scripts/conformance/menu-rows.test.ts) refuses a copy in src/components or src/routes, proven on a planted fourth copy. Tests: FT-1 centre → middle column (G38); L1/L2 footer x/width → beside the rail; L3 and U0i replaced (D252: footer fills the middle column, centred, rail to the viewport's bottom, light and dark); FT-4 new (1280×600 short page, open and folded); "footer never covers the rail's Sign out" (:1966) re-read: the footer starts at or after the rail's edge; railLaw re-read; ROWS-E3 footer branch: the rail no longer yields height.
- **Part 3 (D253) — done.** Footer insets equal above and below: 4 px phones (was 4/6), 8 px from 768 (was 32/8). FT-5 new at 1280 and 360 (≤ 9 px each side). FT-1's 360 height pin (≤130) unchanged and green.
- **Part 4 — not done** (split allowed after item 2): MenuNav groups as side panels, URL marking, SMN-E11/E12, ROWS-E2 remain.

## E2E (both projects, retries 0, each file whole)
- submenu-look.spec.ts + menu-rows.spec.ts + submenu.spec.ts: 13 passed · 13 skipped · 0 failed.
- shell.spec.ts: 163 passed · 67 skipped · 0 failed (rerun whole after the CF-NN-1 fix).

## Growth
No route ceiling raised; "Bundle budget OK." Per-page delta against 60287c03 not measured this turn (NOT RUN); the change adds one 2-constant module and removes the footer-inset hook.

## Units
2,286 tests in the first checks run (1 failed: CF-NN-1 — shell.spec.ts's allowance went stale/over; the new tests' non-null marks removed, the line lowered 81 → 80). Final count in the last checks line below.

## Checks
See the final line appended below.

## K2
- src/features/admin-locations/location-form-fields.tsx:160 `md:w-56` — a form width, not the menu; outside CF-WIDTH-1's scope by design.
- shell.spec.ts :1279 mobile bar test flaky in CI smoke (DEC-030 ledger).
- PHR-1 timeout under load (prior K2) not re-observed.

## git diff --name-only 60287c03
See the list appended below.
