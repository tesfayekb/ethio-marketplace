# Foundations turn R1d-c-2 — ruling (saved byte for byte)

sha256 of the ruling text: 238d1513d25b21dfac9405f596a0b388619ac393642252b98547f0e41fc523d2

````text
RULING — Foundations turn R1d-c, continue: the growth stop (stop 1). Base: dev 22f5151f. Tier B. No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-r1d-c-2.md; roadmap line 3 names it beside foundations-turn-r1d-c.md.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-r1d-c-2.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names both R1d-c files.

VERIFIED (dev 22f5151f, fresh clone): step 0's sha256 a51d551a… matches; 47 commits since fa5c333f; no secret in the diff; the side branches are the known eleven. Stop 1 read whole. band-row.ts (BAND_ROW, 40 px) is read by the tabs, the breadcrumb row, the location row and the panel header, and CF-BAND-1 refuses another height; bar-spacing.ts and CF-BAR-1; the footer is md:flex md:justify-evenly; Home (nav.home) is the main level's first row with HM-1..HM-3; menu-current.ts is the one current-item rule and MENU_LINK_ACTIVE fixed the double mark on /settings; INC-1013's cause (the router's scroll restoration on its first onRendered, after data-app-ready) is right. The work is CLEAN except the stop below.

RULING 1 — the growth (DEC-302, the supervisor under G17):
a. INC-1013's ready mark in one place. data-app-ready is set once both have happened: hydration, and the router's first render with its scroll restoration. Use the least code that keeps that guarantee — no custom window event and no listener in __root if the router can set the mark itself. A scroll made after data-app-ready is never reset by a late restore. If router-settled.ts no longer has a job, delete it (declared deletion).
b. Your option 2b: the code that builds MenuNav's side-panel rows leaves the first download and lives in the sub-menu layer that already loads when a panel opens (submenu-impl via the overlay loader). Behaviour and tests unchanged: SMN-E11, SMN-E12, ROWS-E2, A-5, A-6, A-7, IN-1.
c. Your call: any other new R1d-c code that runs only after a tap may move behind the same on-demand load, under the same tests. Nothing that paints on first load moves (no flash, no layout shift).
d. Then accept what remains. Every page over its ceiling, and every NEAR page that grew, gets its ceiling raised in scripts/route-budgets.mjs by DEC-296's rule (floor(size + 0.3) + 1, size = your local size + 0.1 KiB). Each raised line's comment starts with: "R1d-c (DEC-302: D259 Home row, D255 strip level, D240 menu panels, one current-item rule, D258 band row, INC-1013 ready mark): +<n> KiB; was <old>." No other ceiling moves.
e. No size STOP this time. Report the measured growth per page against fa5c333f, after the trims. Growth from a cause not named in d is a STOP.

RULING 2 — INC-1013's proof is CI's repeat lane on your push (DEC-283), not a local repeat. The R1d-c ruling's "--repeat-each 12" was my error against AGENTS.md (slip S498). Run no local repeat.

RULING 3 — INC-1014: 1 run in 10, cause unknown. It stays open with its count; no allowlist line; nothing to build this turn.

RULING 4 — K2:
- The strip's back item: its name is the menu's "‹" row's own words — the parent's name, or "Main Menu" (app-rail.tsx :542 and :702). That is the rule; the R1d-c ruling's "Back to <name>" was mine. No new string.
- The phone footer's three equal columns stay; D257 is from 768 px.
- RTL by dir="rtl" stands.
- location-form-fields.tsx:160 stays in K2.

CI FIRST: read the run on 22f5151f when it completes (raw addresses in HOW TO WORK). Expected red: the size budget and the NEAR band, which are this stop. Any other red is fixed first, from its failure body. If the run is still going when you reach the checks, read it again before you push.

SCOPE (by area): the rail and the sub-menu layer (src/components/shell/**, src/components/ui/submenu*, src/components/ui/overlay*); the ready mark (src/router.tsx, src/routes/__root.tsx, src/lib/router-settled.ts); scripts/route-budgets.mjs; each source file's own tests and the specs that exercise them; the conformance allowlists the moves require; the standing docs allowance.

TESTS: each touched spec file run whole, both projects, retries 0; by-id runs of every test that uses a changed helper (G37). A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, run WHOLE, with its last line pasted (no FAIL), and the unit suite's full count. CI is read at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md.

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-r1d-c.report.md:
- step 0's sha256 for both R1d-c files;
- the CI line for 22f5151f, with any red classified;
- Ruling 1: what moved (a, b, c), the growth table (fa5c333f → now, per page, with the ceilings you raised and their old values);
- the census for this continuation (files and tests touched);
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only fa5c333f.
````
