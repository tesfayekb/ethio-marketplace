# Foundations turn R1d-a — ruling

sha256 of the text inside the fence (with its final newline): `937d5b13b1d4a4e5cf307dc562e6bf7df3f271f705ce3377293002f1f577efe4`

````text
RULING — Foundations turn R1d-a: D248 (a sub-menu is the main menu) at 768 px and wider; then R1d's plan revised for D248, D249 and D251, with no R1d code. Base: dev cbedb82e. Tier B. No migration, no new dependency. Lovable. Saved as docs/governance/briefs/foundations-turn-r1d-a.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-r1d-a.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it.
- In roadmap.md, add this sentence to the end of redesign Part 2's entry (the Sage look, DEC-289), exactly: "D250 (2026-10-30): future per-account and per-shop themes (v2, not built now) — Part 2 builds every look value as a token, each theme as a named set of token values (light and dark) defined as data, one resolver that picks the theme in the order shop page, signed-in account, device, system (the device stores the theme's name and keeps it after sign-out; a removed name falls back to the system theme), applied before the first paint and by scope for a shop's container, and a contrast test (WCAG 2.2 AA) on every built-in theme. Part 2 restyles colour and shadow for every menu surface together: the rail, the side panels, the phone split, the folded rail."

R1C-FIX VERIFIED (dev cbedb82e, fresh clone):
- step 0's sha256 2bb0b8fc… matches; the 12 files equal your list; no secret in the diff;
- INC-1010: the four shell bounds are back at ≤ 41; `.menu-fit` rows are capped at 2.5rem below 768 px (src/styles.css :413–:417); ROWS-E5 is in;
- INC-1011 is explained: on a short page the footer comes into view and the rail ends at its top (`--rail-bottom-inset`, app-rail.tsx :966–:974). Whether the menu should keep its height there is with the operator; it is not in this turn;
- ROWS-E3 asserts all three branches; SMN-E4 deletes in afterEach; growth +0.0215 KiB; checks 34 PASS · 0 FAIL.
- CLEAN pending CI on cbedb82e. PHR-1's timeout under load (your K2) is noted; CI judges it.

CI FIRST: read the run on cbedb82e when it completes; any red is fixed first, from its failure body.

PART A — D248: a sub-menu panel is the main menu, from 768 px (phones follow in R1d).
His words (30 Oct, 03:39 New York): "for the subcategory menu or submenu, the coloring, text size, , borders, shadow, etc should match primary menu. I see the spacing for the secondary looks compact, and there are lines between items, also the edges look sharp, the main menu seems to resize based on screen height and so should the submenu as well, the submenu can have scroll only if there are >16 items as discussed for the main, more importantly a submenu text should never be on a second line, if the text size is long, we can cut it to ... at the end. this is especially true in small screens when we try to fit menu items in 3/4 of the width. when submenu opens it should be next to the main menu item, but the bottom submenu item should not be lower than the bottom of the menu item visually. the color and shadow will be covered by the sage color and shadow design."
And his answers (03:50): "SCROLLS ONLY SAY IN SMALL SCREENS IF >16 ITEMS IN THE SUBMENU, BIGGER SCREENS SHOULD BE ABLE TO FIT UPTO A CERTAIN NUMBER AND RESIZE AS THE MAIN MENU DOES. MOST IMPORTANTLY I DONT WANT TO HAVE A FEELING THE MAIN AND SUBMENU HAS DIFFERENT SIZES OR INDIVIDUAL MENU ITEMS, AND SHOULD HAVE SAME FEEL. I ALSO WANT THE SUBMENU ICONS TO BE THERE IF POSSIBLE." — "SAME HEIGHT FOR EACH, AND ALSO EACH SUBMENU ITEM TO APPEAR LEVEL WITH MAIN MENU ITEMS RATHER THAN APPEAR SLIGHTLY UP OR DOEN."
THE SYSTEM (G0)
- CONCERN: one menu look — a panel's rows are the main menu's rows.
- MECHANISM: the rail's row classes (app-rail.tsx :119–:129: ITEM_CORE, ITEM_IDLE, ITEM_ACTIVE) and src/styles.css's row rule (.menu-fit).
- The panel's own row style goes: ROW, IDLE and ACTIVE in submenu-impl.tsx :165–:170. Move the row classes into one shared module that the rail and the panel both import. CF-SUB-1 or CF-ROWS-1 gains a line that fails when the panel defines its own row classes; prove it on a planted copy.
1. Look:
   - the panel takes the rail's surface (bg-sidebar);
   - its rows take the main menu's text size and weight, row padding, rounded-md, ITEM_IDLE hover (never bg-muted — INC-042) and ITEM_ACTIVE;
   - the panel's corners are rounded like the rail's surfaces, with no border and no separator lines;
   - each row shows its category's own icon through the glyph map, as the rail does. Every category has one: on ethio-prod all 169 do, with 109 distinct icons among the 148 subcategories.
   Colour and shadow stay as the rail's; Part 2 restyles both together. D245's motion stays: a 300 ms opacity fade in and out, no movement, and no animation under reduced motion. D245's surface is withdrawn (bg-popover, the 1 px border, square corners, separators): the operator asked only about the transition, so that was my slip, S495.
2. Size and alignment:
   - a panel row's height equals the main menu's row height at that moment, and both change with the screen height;
   - each panel row sits level with a main-menu row. The panel snaps to the main menu's row grid: its first row is on the opener's row. When it would end below the main menu's last row, it moves up by whole rows until its last row is level with the menu's last row;
   - a panel taller than the menu's whole height at that row height takes the menu's height (from the top of its first row to the bottom of its last), and only then do its rows shrink, down to 32 px.
3. Scrolling from 768 px: there is no item limit. A list, whether a panel or the main menu, fits while its rows stay at or above 32 px, and scrolls with a visible scrollbar only beyond that. Below 768 px the 16-item rule stands.
   - Rewrite D247's sentence in docs/features/panels.md and register row 80 (Concern and Notes) — exactly: "D247 and D248 (2026-10-30): a menu list never scrolls while its rows fit at 32 px; they share the height up to 40 px below 768 px and up to 48 px from 768 px (DEC-288: phones stay compact). Below 768 px a list of more than 16 items keeps full-size rows and scrolls with a visible scrollbar; from 768 px there is no item limit, and a list scrolls, with a visible scrollbar, only when its rows cannot fit at 32 px."
   - The tests that assert `data-many` from 768 px change under G38, each one named (replaced by D248, not loosened).
4. One line: a panel row's name never wraps. A name that does not fit is cut with an ellipsis; its full name stays for screen readers and as a title tooltip. The main menu already truncates, and both use the same rule.
5. Tests (ids grep-checked free):
   - E2E at 1280×800 and 1280×600:
     - a panel row's height equals the rail's within 1 px;
     - each panel row's top equals a rail row's top within 1 px;
     - the panel has no border or separator, and its rows carry the shared classes and an icon;
     - a seeded 60-character name (removed in afterEach) shows on one line with an ellipsis: scrollWidth is greater than clientWidth, and the row is one line high;
     - a panel opened from the last root ends level with the rail's last row;
     - a seeded 20-child branch fits without a scroll at 1280×1000, and at 1280×600 shrinks to the 32 px floor and then scrolls with a visible scrollbar.
   - Unit: the snap-to-grid placement — the first row on the opener; moving up by whole rows; the panel taller than the menu.

PART B — R1d's plan, revised (plan only; no R1d code). Rewrite .lovable/plan.md for R1d with these settled decisions (G6). Your R1d plan of cbedb82e governs where they are silent.
- D248 on phones: the split's columns use the same shared rows and icons, and the same one-line names with an ellipsis. This replaces DEC-288's "names wrap" and your plan's Item 2 line "names wrap (no truncation beyond CutText's rules)".
- D249, the phone's third level. His words (03:45): "in small screen when we have a third order submenu like electronics->phone&->smartphones, given we said when submenue like phones and tab opens width will be 1/4 menu, 3/4 submenu, now if the subsub menu is clicked, the main menu should close instead of holding the 1/4 space, may make the transition as if the submenu taking over the space from right to left with submenu now taking 1/4 witdth and the subsubmenu now 3/4, all will have back to "<- submenu at top. this is small screens."
  - Level 3: the main list closes; the level-2 list takes the 1/4 column, icons only, with the open item highlighted; the level-3 list takes the 3/4 column.
  - D246 opens a third-level page in that state, with the page's item marked and in view.
- The header: every sub-list has ONE header row, "← <the opened item's name>", for example "← Electronics" or "← Phones & Tablets". Tapping it moves up one level without navigating. This replaces your plan's "‹ Main menu / ‹ parent" header.
- D251, the moves. His words (04:27): "submenu opening or closing in small screens should be by moving right or left asif a slide door opens or closes for visual effect, for ecample a subsubmenu that is open has <- <subcategory name> button on top, when clicking that to go back to submenu from the subsub menu, the subsub menu should slide to right to close, and the submenu now slides to right 3/4 withdth with 1/4 on left main menu sliding right ward, the reverse happens when opposit is done as navigating from main to submenu or subsub menue."
  - Going deeper: every column slides leftward together. The 3/4 column slides into the 1/4 place, the 1/4 column slides out to the left, and the new list slides in from the right into the 3/4 place.
  - Going back: the 3/4 list slides out to the right, the 1/4 list slides right and widens into the 3/4 place, and the level above slides in from the left into the 1/4 place.
  - From the split back to the full main list: the sub-list slides out to the right while the main list widens back.
  - Mirrored in right-to-left languages. Transform and opacity only, with one duration and easing for every move, stated in the plan (ESTIMATE about 250 ms). No animation under reduced motion.
  - This replaces your plan's transition proposal (a width ease with a cross-fade). D245's fade stays for the side panel from 768 px.
- The plan names, beyond your cbedb82e plan:
  - the column state machine (full list, level 2, level 3) and where it lives;
  - the tests for D249 and D251: the third level's columns and highlight; the header row's back moves; each move's direction by box positions sampled during it; reduced motion; RTL;
  - the growth per page, and the build split into ordered parts with ESTIMATEs.

SPLIT: Part A lands first. If the platform's time limit nears, stop after Part A with the checks green, and report.

TESTS: each touched spec file run whole, both projects, retries 0; by-id runs of every test that uses a changed helper (G37).

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, with its last line pasted (no FAIL).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-r1d-a.report.md:
- step 0's sha256;
- the CI line for cbedb82e, with any red classified;
- Part A items 1–5, each with its tests;
- the growth table;
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only cbedb82e;
- the pointer to the revised R1d plan in .lovable/plan.md.
````
