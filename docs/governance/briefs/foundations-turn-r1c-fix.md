# Foundations turn R1c-fix — ruling

sha256 of the text inside the fence (with its final newline): `2bb0b8fca2ff51d1b2c1be260436fc6013414f28c94a8843adb7d64deca7991a`

````text
RULING — Foundations turn R1c-fix, then turn R1d's plan: INC-1010, INC-1011, J3 in SMN-E4; then R1d planned, with no R1d code. Base: dev 8aead74b. Tier B. No migration, no new dependency. Lovable. Saved as docs/governance/briefs/foundations-turn-r1c-fix.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-r1c-fix.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it.

R1C VERIFIED (dev 8aead74b, fresh clone):
- step 0's sha256 c4f24de6… matches; the 22 files equal your list; no secret in the diff;
- D244: re-placement on resize and the top-bar floor (submenu-impl.tsx :197–:225, :252);
- D245: bg-popover, a 1 px border, rounded-none, no shadow, a 300 ms opacity transition, reduced motion none, and the closing panel kept PANEL_FADE_MS, inert and aria-hidden (:144–:159, :308, :325–:326);
- D246: the phone menu opens at the URL's level, with the current row scrolled into view (app-rail.tsx :553);
- growth +0.0986 to +0.1211 KiB with its causes; unit 2,282 / 2,282; checks 34 PASS · 0 FAIL.
- CLEAN pending CI on 8aead74b, except item 1 below.

PART A — THE FIXES (CI FIRST: read the run on 8aead74b when it completes; any red that is not one of these is fixed first, from its failure body).

1. INC-1010: phone rows stay compact.
   - Your G38 change to shell.spec.ts is reverted. The four `toBeLessThanOrEqual(48)` lines (the strip, the menu in place, the first strip row, the first menu row; shell.spec.ts :1077, :1346, :1555, :1566, with their "was 32–40" comments) go back to `toBeLessThanOrEqual(41)`.
   - The cause is mine (slip S494). DEC-288 keeps phones compact: INC-988's 32–40 px band. My R1c rulings wrote D247 as "32–48 px on every pointer and width" without reading that clause. CI's red on 1c43379b was those tests doing their job.
   - The rule: below 768 px a fitted menu row is 32–40 px (max-height 2.5rem); from 768 px it is 32–48 px. Fix it in src/styles.css's `.menu-fit` with a width query. The floor (32 px) and the 16-item line are unchanged.
   - Lists of more than 16 (`data-many`) keep their full-size rows.
   - Rewrite D247's sentence to name both bands, in docs/features/panels.md and in register row 80 (Concern and Notes) — exactly: "D247 (2026-10-30): a menu list of 16 items or fewer never scrolls when its rows fit at 32 px; they share the height up to 40 px below 768 px and up to 48 px from 768 px (DEC-288: phones stay compact). A list of more than 16 items keeps full-size rows and scrolls with a visible scrollbar."
   - The C2 exception text stays as written.
   - Tests: the four shell tests at ≤ 41; ROWS-E1 asserts every phone row 32–40 px; a new case at 360×740 on a list the test seeds (15 rows, removed in afterEach) proves the rows fill the height to at most 40 px.
2. INC-1011: the rail's height in CI's state. Your K2 names it.
   - Measure the rail's column at 1280×600 in the state the E2E project uses (signed in or not, the fixture's account, the foot, any banner): every block's height, top to bottom, from the top bar to the viewport's bottom. Report the breakdown and the reason for 302 px against your local 488 px.
   - If the categories lose their height to other sections in a normal signed-in state, STOP with the measurement. Whether the categories keep their height is a product ruling.
   - ROWS-E3 asserts the branch its measurement selects, all three:
     - fits at 32 px → no scroll;
     - 16 or fewer but too tall even at 32 px → scrolls, scrollbar width > 0;
     - more than 16 → data-many, visible scroll.
3. J3: SMN-E4 removes its seeded branch in afterEach, not finally (your K2).

PART B — TURN R1D'S PLAN (no R1d code in this turn). Write the plan to .lovable/plan.md, in the shape of R1c's.

R1d is the rest of the left menu. The decisions are settled (G6):
- D240: every panel's sub-items behave like the category subcategories — the admin groups and the account and seller sections. That means the side panel at ≥ 768 and the split on phones; never indentation in place. The admin menu has 26 or more items, so it is a list of more than 16.
- DEC-288, phones: the open menu keeps its 256 px width. When a category, group or section opens, the main column shrinks to about a quarter (about 64 px) and the sub-items take about three quarters (about 192 px), with a smooth transition. The menu never goes full width, and names wrap to show most of their text.
- D241: the narrow main column shows icons only, the open one highlighted. The opened item's name heads the sub-panel.
- D243: the peek on every page load and reload stays as it is.
- D246, under the split: an opening on a page inside a section opens the split at that level, the item marked and in view, with the back control in the sub-panel's header.
- D247: the rows rule as fixed in Part A, for every list in the split and in the admin, account and seller panels.
- D245: settles the side panel's surface and motion at ≥ 768. For the phone split's transition, propose one that does not read as a panel sliding out of the menu (D245's concern), with reduced motion none. The operator walks it.

The plan names:
- every consumer that leaves the allowlists: CF-SUB-1's count 3 (the strip, the admin groups, MenuNav's collapsible) and menu-rows' strip line, both to 0;
- MenuNav's current-item marking moved onto the URL level (your K2);
- ROWS-E2 (more than 16, the admin menu);
- the tests, the growth per page, the conflicts and K2;
- the build split into ordered parts with ESTIMATEs.

SPLIT: Part A lands first. If the platform's time limit nears, stop after Part A with the checks green, and report.

TESTS: each touched spec file run whole, both projects, retries 0; by-id runs of every test that uses a changed helper (G37).

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, with its last line pasted (no FAIL).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-r1c-fix.report.md:
- step 0's sha256;
- the CI line for 8aead74b, with any red classified;
- Part A items 1–3, each with its tests;
- the rail's breakdown at 1280×600;
- the growth table;
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only 8aead74b;
- the pointer to the R1d plan in .lovable/plan.md.
````
