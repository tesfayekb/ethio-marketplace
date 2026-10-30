# Foundations turn R1d-b — stop 1

- Step 0: ruling saved as docs/governance/briefs/foundations-turn-r1d-b.md; sha256 of the fenced text `70bf846a75353d958d66ba0d2a7d62a0f4d94a32d28bb0f187fcaac45bc1bbc8` (matches). Roadmap line 3 names it.
- CI: the run on 60287c03 had not completed when read; last completed run 41026396254 on cbedb82e — SUCCESS.

## Done (code, not yet proven by E2E or checks)
- Part 1 (D254): `snapToGrid` (src/components/ui/submenu-geometry.ts) keeps the menu's measured row height (from the opener row's box) for a taller panel, takes the whole rows that fit and scrolls. SNP-3 replaced under G38 (D254, not loosened); SNP-4 new (one row more than the menu holds). Unit file: 13/13 passed.
- Part 2 (D252): rail runs `md:bottom-0`; `useFooterInset` and `--rail-bottom-inset` removed (census: app-rail.tsx only consumer; e2e/shell.spec.ts comment); src/components/shell/use-footer-inset.ts deleted and declared in intentional-deletions.txt. Footer wrapper takes the page column's start margins (md:ms-56 lg:ms-64 rail-icons:ms-16). shell.spec.ts L3 helper now expects the rail's bottom at the viewport's bottom.
- Part 3 (D253): footer insets `py-2` (8 px) top and bottom at every width; item spacing unchanged.

## Left
- Part 1 E2E: SMN-E10, ROWS-E3/SMN-E4 panel branches (G38) and the Services 21-row test.
- Part 2 E2E: FT-1/L1/L2 census to middle-column width; new 1280×600 short-page test (open and folded); ROWS-E3 footer branch re-read; shell.spec.ts :1937 and :1966 tests re-read.
- Part 3 E2E: inset tests at 1280 and 360.
- Part 4 (MenuNav panels from 768 px, URL marking, SMN-E11/E12, ROWS-E2): not started.
- No E2E run, no `bun run checks` run (NOT RUN); growth table not measured.

## Files changed
src/components/ui/submenu-geometry.ts, src/components/ui/submenu-impl.test.tsx, src/components/shell/app-footer.tsx, src/components/shell/app-rail.tsx, src/components/app-shell.tsx, src/components/shell/use-footer-inset.ts (deleted), e2e/shell.spec.ts, docs/tracking/intentional-deletions.txt, roadmap.md, docs/governance/briefs/foundations-turn-r1d-b.md, this report.
