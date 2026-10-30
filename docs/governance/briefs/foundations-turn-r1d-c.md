# Foundations turn R1d-c — ruling

sha256 of the text inside the fence (with its final newline): `a51d551ac9bfde6cc587dce7b1ab4a99d1f49df2d7dca36c2d351ce88ffc6f5e`

````text
RULING — Foundations turn R1d-c: the last turn of redesign Part 1. CI first; whatever R1d-b left; then D259 ("Home" at the top of the category list), D255 (the phone strip follows the menu's level; the phone split postponed), D258 (one height for every band row), D256 (the top bar's spacing) and D257 (the footer's columns evenly spaced). Base: dev fa5c333f. Tier B. No migration, no new dependency. Lovable. Saved as docs/governance/briefs/foundations-turn-r1d-c.md; roadmap line 3 names it.

The operator's direction (07:08 New York): finish all of this, with the red CI fixed, in this turn, then move to the redesign's Part 2. Work through every part below without stopping between them; a clean point is not a reason to stop.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-r1d-c.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it.
- In roadmap.md, under redesign Part 1, add this line exactly: "POSTPONED (D255, 2026-10-30): the phone split — DEC-288's 1/4–3/4 columns, D241 (icons only in the narrow column), D249 (the third level) and D251 (the sliding-door moves) — kept with their decisions intact and not built; revisited after launch on usage (how often people switch main categories from inside a sub-list). The R1d plan of 60287c03 (.lovable/plan.md, Item 2, menu-columns.ts) holds its design."

R1D-B VERIFIED (dev fa5c333f, fresh clone):
- step 0's sha256 70bf846a… matches; 20 commits since ffb3ee6f; no secret in the diff; the side branches are the known eleven;
- src/components/shell/menu-width.ts (MENU_WIDTH, MENU_INSET) is the one home of the menu's width, read by the rail, the logo cell, the page column and the footer; CF-WIDTH-1 (scripts/conformance/menu-rows.test.ts) refuses a fourth copy (planted);
- use-footer-inset.ts and --rail-bottom-inset are gone; the footer's insets are 4 px on phones and 8 px from 768 px (your call on phones stands);
- SMN-E13 and its fix (panels on the menu's whole visible rows when the menu scrolls), FT-4, FT-5; checks 34 PASS · 0 FAIL; unit 2,288 / 2,288; semgrep.json and semgrep.sarif ignored.
- Owed from R1d-b: Part 4, and the growth table against 60287c03.
- CLEAN pending CI on fa5c333f.

CENSUS FIRST (G60, inside this turn): before any edit, read the real tree at the base for each part below and list in your report every file and test it touches, and every existing mechanism that already serves its concern. Stop and report only if a part's premise is wrong (the mechanism already exists, or the cause is elsewhere); otherwise build straight on.

CI FIRST
- Read the run on fa5c333f (pushed 11:54Z) when it completes, at the raw addresses in HOW TO WORK; any red is fixed first, from its failure body. Its predecessor, run 41035524031 on ffb3ee6f, was red: 13 browser tests and the used-on map, all from stop 1's footer change, which you fixed in this tree.
- INC-1013 — "the bar and the band stay while the page scrolls" (shell.spec.ts :1273–:1281 at ffb3ee6f; mobile-360): scrollTop stayed 0 for 10 s after one `window.scrollTo(0, 600)` on /dev/tall; three flake-ledger lines in seven days (10-25 shard 8 1990ac5d, 10-29 shard 8 bff53069, 10-30 smoke ffb3ee6f). Read the cause first (G21): what resets or blocks the scroll after gotoReady — the router's scroll restoration after hydration, or an overlay's scroll lock (the phone menu sheet or the peek) still open. Fix at the root; never retry the scroll until it sticks (G38). Prove it with --repeat-each 12, both projects.
- INC-1014 — `[ssr-error] /__root gate fetch threw upstream ssr language gate timed out after 1500ms` (shard 3, once, on ffb3ee6f; src/routes/__root.tsx :201). Count it across the last ten runs (e2e-last-failure.md on ci-evidence) and report the count; no allowlist line without a cause.

WHAT R1D-B LEFT (do it first, after CI):
- R1d-b's Part 4, as its ruling wrote it — R1d's Item 1 from 768 px (your plan, .lovable/plan.md "Item 1", and Item 3's second bullet):
  - MenuNav's groups (admin, account, seller) become sub-menu openers on the same mechanism from 768 px, with D248 and D254 applied. The admin menu (26 or more items) has no item limit from 768: it fits at ≥ 32 px or scrolls with a visible scrollbar (ROWS-E2).
  - MenuNav's current-item marking moves onto the URL-level helper the category rail uses: one function for every menu.
  - Below 768 px MenuNav is unchanged: phones keep today's menu (D255). CF-SUB-1's allowlist line keeps the phone sites, its reason now "phones keep today's menu (D255, 2026-10-30)", and its count falls by the sites this part moves.
  - Tests: SMN-E11 and SMN-E12 as your plan names them; ROWS-E2 from 768 px.
- R1d-b's growth table: each page's first download at fa5c333f against 60287c03, with the cause of every change.

PART 1 — D259: "Home" at the top of the main category list.
His words (06:55 New York): "in small screen the left band category menu icon starts from vehicles, and has total of 15 items. say you click a subcategory item, say appratment, but then you want to come back to main category and see all category listings, there is none to click and close that will show all category listings. there is a Main Menu: at top of subcategories, that will open the main category but the listing doesnt change when you click that, it just shows you the main category menu with still real estate selected. so i think if space allows us(i know we designed it for 16 items), can we add "all category" or home button at top of the main category, may be "Marketplace" so clicking taht will close the submenu and menu and shows all listings." At 06:57: "all listing is in Home" but the only place home is in breadcramb and users may not always know that especially with menu open covering it". He decided the name at 07:00: "Home for consistency" — the breadcrumb's first link.
THE SYSTEM. CONCERN: the category list's way back to every category. MECHANISM: the category list itself (app-rail.tsx's category nav; :609–:676 at ffb3ee6f), one list for every width.
- At the main level of the category list, the first row is "Home": the breadcrumb's own key nav.home (en "Home", am "መነሻ"; breadcrumbs.tsx :142). No new string. It has a home icon.
- It links to "/" (every category; the chosen place is kept) and is marked current there, and only there.
- Every width shows it: the phone menu, the phone strip at the main level (Part 2), and the rail open and folded (folded: its icon, with its name as the tooltip).
- On a phone, tapping it closes the menu, shows every category's listings, and returns the strip to the main level.
- It sits above the favourite row when a signed-in person has one.
- It counts toward MENU_FIT_MAX (the data-many count; :616 at ffb3ee6f). Signed out, 15 roots + "Home" = 16 rows, which fit on phones. A signed-in person with a favourite has 17, which scroll with full-size rows (D247).
- "‹ Main Menu" keeps moving the menu up without navigating (unchanged).
- Tests:
  - at 360: the row is first at the main level; from a sub-category page, "‹ Main Menu" then "Home" lands on "/" with the menu closed and the strip at the main level; RTL mirrored;
  - at 1280: the row is first in the rail, marked current on "/" and not on a category page; the folded rail shows its icon and tooltip;
  - the row-count tests (ROWS-E*, SMN-E*, the strip's count) are re-read under G38, each named.

PART 2 — D255: phones keep today's menu; the strip follows the menu's level.
His words (05:39 New York): "on small screen the menu design looks ok. I know I wanted the 1/4, 3/4 split design and etc etc. but as it is right now. may be when we minimize the submenu scenne the small bar still have the icons for the main menu, so if the submenu is open, just keep the submenu icons, if main is what is open, keep it. I think in small screen that may be the only change at this time. ask me if you have questiosn. that is a change from previous request". At 05:53 he agreed the strip has a back item at its top.
THE SYSTEM. CONCERN: the phone strip and the phone menu show the same level. MECHANISM: the category list's level state (the one the phone menu reads; D246), read by both.
- The phone strip (rail-strip, the 48 px icon column) shows the icons of the level the menu is on:
  - at the main level, "Home" and the main categories;
  - inside a category, that category's sub-items (the same level D246 opens at).
  The current item is marked.
- At a sub-level, the strip's top item is a back button with the open category's icon (accessible name "Back to <name>"). It does what the menu's "‹" row does, without opening the menu, and moves the strip and the menu one level up.
- Tapping any other icon does what it does today.
- One source: the strip and the phone menu read the same level state, never two copies. A guard (CF-SUB-1 or a census) refuses a second level state; prove it on a planted copy.
- CF-ROWS-1's strip line (hidden scrollbar) stays unless the strip can now exceed its height; say which.
- Tests at 360, in both directions: the strip mirrors the main level and a sub-level; the back item returns it; the current item is marked; RTL mirrored.

PART 3 — D258: one height for every band row.
His words (06:40 New York): "on main page i see Marketplace at top of left side menu items, the height of which is taller than the breadcramb in main body. The issue is that when the submenu opens the top of the opened submenu looks misallighed to the location line in main body that is below the nbreadcramb, and i think the issue is this first item called marketplace that made the main menu drop a little lower so when a submenu opens, on the background at the top above the submenu i see part of the location that says "showing listing in ..., If we can make the Marketplace bar equal size that will be great. It may be that there may be small space between it and the top bar as i see the background color of this marketplace space is different from the space between it and the top bar and that may be the issue." At 06:55: "all lines, be it the panal line, or breadcramb or location should have same height as well as the marketplace at top of the left menu."
Cause at ffb3ee6f (re-locate):
- the rail's `p-2` (app-rail.tsx :964) puts an 8 px strip of bg-sidebar above the menu's band;
- the band (panel-header.tsx :31 BAND `rounded-md bg-sidebar-accent/40 px-2 py-1`; :45 h2 text-base; :58 switcher min-h-11 / md:pointer-fine:min-h-9) is 32 px signed out and 44 px signed in, then `mb-2` (app-rail.tsx :969);
- signed out at 1280, the breadcrumb row is 56–89 (app-shell.tsx :1043 `min-h-8` + border-b) and the location row 89–121 (location-selector.tsx :231 `h-8`), while the menu's first row starts at 104: a side panel that spans the menu shows a 15 px slice of the location row above it;
- signed in, the panel tabs row (panel-tabs.tsx :38/:51, min-h-11 / md:pointer-fine:min-h-10 + border-b) sits above the breadcrumb row;
- the folded rail hides the band (HIDE_WHEN_COLLAPSED, app-rail.tsx :114) and its rows start at 64.
THE SYSTEM. CONCERN: one height for every horizontal band row. MECHANISM: NONE YET — one height token or class that every band row reads; never a second number.
- At every width, the panel tabs row, the breadcrumb row, the location row and the menu's band have the same height: 40 px, rule line included. The operator chose 40 px at 07:55 New York: the Sage look (Part 2) gives the location row a pressed-in track with raised segments, and 40 px leaves those segments about 30 px for a finger. So the breadcrumb and location rows grow from 32 px, and the tabs settle at 40 px from 40 / 44 px.
- The menu's band starts flush under the top bar, with no strip of another colour above it, and is one band row tall, level with the sub-band row beside it.
  - So the menu's first row starts on a band boundary: the location row's top signed out, the breadcrumb row's top signed in.
  - A side panel that spans the menu starts on that boundary, with no slice of a row above it.
  - The band's label is centred in it. Its surface stays in the sidebar token family (never bg-muted, INC-042); colour and shadow are Part 2's.
- The folded rail keeps the band's height (an empty band), so the rows do not move when the menu folds and panels from the folded rail align the same way.
- Phones: the breadcrumb and location rows take the same 40 px; the phone menu has no band (shell.spec :1353). Nothing else changes under 768 px.
- Census, by definition, every full-width row in the shell's sub-band and the menu's band. A guard line refuses a literal height on any of them, or a second source; prove it on a planted copy.
- Tests at 1280×800 and 1024×768, fine and coarse pointer, signed out and signed in, open and folded:
  - every band row is 40 px tall within 1 px (also at 360 for the breadcrumb and location rows);
  - the menu's band's top equals the top bar's bottom within 1 px;
  - the menu's first row's top equals the bottom of the sub-band row beside the band within 1 px;
  - on the feed, signed out, Services' panel (21 rows) starts at the location row's top within 1 px;
  - the tests that pin the band, the tabs or the first row (shell.spec :1839, :1856, :1944, the panel-tabs tests and ROWS-E3's heights, by census) change under G38, each named.

PART 4 — D256: the top bar's spacing.
His words (06:03 New York): "on large screen the three bar menu item is too close to ethio.com icon, when you hover you can see the shadow overlaps. needs to make good space and uniform in top bar."
Cause at ffb3ee6f (re-locate): in app-shell.tsx's shell-logo-cell (:983–:1002), the menu toggle (h-11 w-11, hover:bg-muted) sits directly before the logo link, which carries `-ms-1`.
THE SYSTEM. CONCERN: one spacing scale across the top bar. MECHANISM: NONE YET — one gap token or class for the band.
- From 768 px, the whole band has one spacing scale: the logo cell (toggle, logo) and AppHeader's items (search, language, theme, sign-in or account).
  - The same gap between neighbours, and the same inset at both ends.
  - No negative margin.
  - The toggle's hover never touches the logo.
- Census every item in the band by definition. A guard line fails on a negative margin, or a second gap value inside the band; prove it on a planted copy.
- Tests at 1280 and 1024, open and folded: the toggle's box and the logo's box do not overlap, and their gap equals the band's gap within 1 px; neighbours' gaps are equal within 1 px.

PART 5 — D257: the footer's columns evenly spaced.
His words (06:03 New York): "now the distance of the first column from left menu bar(the ethio.com logo column), compared to the distance of the last column(legal column) to right end of the page is not same visually and should be same. also the distance between the four columns should be equal visually appealing."
Cause at ffb3ee6f (re-locate): app-footer.tsx :37 is `max-w-5xl`, centred, `md:grid-cols-[1.3fr_1fr_1fr_1fr]`; each column's text is shorter than its track and start-aligned.
THE SYSTEM. CONCERN: the footer's blocks share the middle column evenly. MECHANISM: the footer's one layout (app-footer.tsx), inside the middle column (D252).
- From 768 px, the four blocks (brand, Company, Help, Legal) are sized to their content and spread with equal visible space before the first, between each pair and after the last (space-evenly, or the grid equivalent on content-sized tracks).
- The distance from the menu's edge to the brand block equals the distance from the Legal block to the page's right edge.
- Phones keep their centred three columns; say whether they are even.
- Tests at 1280 and 1024, open and folded: on the blocks' content boxes, the five gaps (edge, three between, edge) are equal within 2 px.

SPLIT: none planned. If the platform's time limit nears, stop at a clean point with the checks green, push, and report three lines (done, left, CI); "continue" follows.

TESTS: each touched spec file run whole, both projects, retries 0; by-id runs of every test that uses a changed helper (G37). A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges. Report every page's growth with its cause; the size budget passes without raising a ceiling; a page that grows by more than 0.5 KiB, or grows without a named cause, is a STOP.

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, with its last line pasted (no FAIL). CI is read at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md.

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-r1d-c.report.md:
- step 0's sha256;
- the census (files and tests per part; existing mechanisms found);
- the CI line for fa5c333f, with any red classified; INC-1013's cause and repeat run; INC-1014's count;
- what R1d-b left, done, with R1d-b's growth table;
- Parts 1–5, each done or not, with its tests;
- the growth table;
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only fa5c333f.
````
