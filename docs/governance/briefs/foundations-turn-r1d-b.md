# Foundations turn R1d-b — ruling

sha256 of the text inside the fence (with its final newline): `70bf846a75353d958d66ba0d2a7d62a0f4d94a32d28bb0f187fcaac45bc1bbc8`

````text
RULING — Foundations turn R1d-b: D254 (a panel never compacts), D252 (the footer in the middle column), D253 (a compact footer), then R1d's Item 1 at 768 px and wider (D240: the admin, account and seller groups open side panels). Base: dev 60287c03. Tier B. No migration, no new dependency. Lovable. Saved as docs/governance/briefs/foundations-turn-r1d-b.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-r1d-b.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it.

R1D-A VERIFIED (dev 60287c03, fresh clone):
- step 0's sha256 937d5b13… matches;
- the D250 sentence is exact in roadmap Part 2;
- src/components/shell/menu-row.ts is imported by app-rail.tsx :46 and submenu-impl.tsx :13, and CF-ROWS-1 refuses a menu file with its own row classes (planted);
- growth +0.0 to +0.1 KiB (two ceilings raised by DEC-296); unit 2,285 / 2,285; checks 34 PASS · 0 FAIL;
- the revised R1d plan is in .lovable/plan.md.
- CLEAN pending CI on 60287c03. Your choice of rounded-lg for the panel stands.

CI FIRST: read the run on 60287c03 when it completes; any red is fixed first, from its failure body.

NOT IN THIS TURN: the phone split (your plan's Item 2, Item 3's first bullet, menu-columns.ts, D249, D251). The operator changed the phone direction at 05:39 New York, and the new phone ruling follows separately. Phone behaviour stays as it is; nothing below changes anything under 768 px except D253's footer inset.

PART 1 — D254: a panel never compacts. His words (04:50 New York): "construction material has submenu (17 items)that has more items than main menu(16 items), but instead of making height of each manue item the same, lined up on same line as the menu and giving a sroll up so users can see the extra, i see its compacted to fit the space and made it look different in height, size compared to main menu. so we need to fix that". At 04:52 he corrected the count: "main actually has 15, not 16 items". At 04:56: "services has 21, and has scroll bar, but still feels compacted compared to main".
- A side panel's rows always have the main menu's row height at that moment, measured from a rail row's box rather than a CSS constant, and sit level with the main menu's rows.
- A panel with more rows than the menu's height holds takes the menu's full height (from the top of its first row to the bottom of its last), aligned to the row grid, and scrolls with a visible scrollbar to show the rest. It never shrinks its rows.
- This replaces the third bullet of R1d-a's Part A item 2 ("only then do its rows shrink, down to 32 px") for panels. snapToGrid's taller-than-the-menu case (submenu-geometry.ts :83) changes accordingly.
- The main menu itself keeps D247/D248: its rows shrink to fit, down to 32 px, and scroll only beyond that. The panel follows whatever row height the main menu has.
- Tests:
  - SNP-3 (submenu-impl.test.tsx :187), SMN-E10 (submenu-look.spec.ts :163) and the panel branches of ROWS-E3 and SMN-E4 change under G38, each named (replaced by D254, not loosened);
  - new: Services' panel (21 rows) at 1280×1000, where the 15 main rows stretch toward 48 px, has rows equal to a rail row's height within 1 px and level with the rail's rows, spans the menu's height and scrolls with a visible scrollbar;
  - new: a panel with one row more than the menu holds.

PART 2 — D252: the footer sits in the middle column. His words (answering INC-1011): "so here your recomendation is to have the footer at bottom of the middle body, and make it looks centered as part of the middle body(not extending behind left side menu at all in all screens)? makes sense. I dont want the left sidebar to overlap on top of footer. agree with your recomendation. it may give few more spaces especially when we have additional items like signout etc. now when a submenu opens, the bottom of the submenu list should not go below the bottom menu item of the menu list."
THE SYSTEM. CONCERN: the menu and the footer never share space. MECHANISM: AppShell's footer slot (app-shell.tsx, shell-footer-wrapper) and the rail's fixed box (app-rail.tsx :964–:970, :994).
- From 768 px, wherever the persistent menu shows (open or folded), the footer is part of the middle column. It starts at the menu's inline-end edge, is centred within that column, never extends behind the menu, and the menu never overlaps it.
- The menu always runs from the top bar to the bottom of the screen. useFooterInset (src/components/shell/use-footer-inset.ts :22) and --rail-bottom-inset (app-rail.tsx :879, :964–:970, :994) go, with a census of every consumer.
- Phones: the menu is a sheet over the page, and the footer stays the page's own.
- Tests:
  - the footer tests that assume the full viewport width (shell.spec.ts FT-1, L1/L2, L3 and any other, by census) change under G38 to the middle column's width and centre, each named (replaced by D252);
  - new, at 1280×600 on a short page: the menu ends at the viewport's bottom, and the footer's inline-start edge is at or after the menu's inline-end edge, for the open and the folded rail;
  - ROWS-E3's footer-squeezed branch is re-read: the menu no longer yields height.

PART 3 — D253: a compact footer. His words (04:47 New York): "I see the footer menu has a top and bottom white space that looks excessive, please remove those excessive spaces as well to make it look compact. the spacing between items in footer otherwise is ok. three lines in all".
- The footer is its three lines: each column's heading and its two links, with the brand block's logo and tagline beside them, and the copyright line beneath.
- The space above and below the content is trimmed to a small, equal inset at every width (about 8 px, ESTIMATE). Today: src/components/shell/app-footer.tsx :37 `md:py-8`, :88 `md:py-2`.
- The spacing between items is unchanged.
- Tests: at 1280 and 360, the footer's content-to-edge gaps above and below are each at most the inset plus 1 px. The footer tests that pin the old padding change under G38, each named.

PART 4 — R1d's Item 1 at 768 px and wider (your plan, .lovable/plan.md "Item 1", and Item 3's second bullet):
- MenuNav's groups (admin, account, seller) become sub-menu openers on the same mechanism from 768 px, with D248 and D254 applied. The admin menu (26 or more items) has no item limit from 768: it fits at ≥ 32 px or scrolls with a visible scrollbar (ROWS-E2).
- MenuNav's current-item marking moves onto the URL-level helper the category rail uses: one function for every menu.
- Below 768 px MenuNav is unchanged in this turn. CF-SUB-1's allowlist line keeps the phone sites with the reason "phones: the operator's ruling of 2026-10-30 05:39 pending", and its count falls by the sites this part moves.
- Tests: SMN-E11 and SMN-E12 as your plan names them; ROWS-E2 from 768 px.

SPLIT: allowed after Part 3 with the checks green. If the platform's time limit nears, stop at a clean point with the checks green, push, and report three lines (done, left, CI).

TESTS: each touched spec file run whole, both projects, retries 0; by-id runs of every test that uses a changed helper (G37).

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, with its last line pasted (no FAIL).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-r1d-b.report.md:
- step 0's sha256;
- the CI line for 60287c03, with any red classified;
- Parts 1–4, each done or not, with its tests;
- the growth table;
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only 60287c03.
````
