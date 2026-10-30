TURN P1 — records turn R9's stop answered, BND-E1's wait (INC-1020), the Sage 3D style change spec imported, then redesign Part 2's plan (DEC-289, D250, D258, D260). No app code. Base: dev d5b48d71. Tier B. No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-p1.md.

R9 VERIFIED (dev d5b48d71, fresh clone): step 0's sha256 4d12d3fe… matches; the seven files equal EXPECTED. Your stop was right: the format red is my record's (INC-1019, slip S499) — a bare `scripts/**` in a roadmap.md line, which prettier escapes. This turn's script makes it a code span; nothing else in the records changes. P0's CI: run 41096998961 SUCCESS, main promoted to 8c48bb2a; one flaky pass, BND-E1 (INC-1020), fixed in Part B.

THE TURN, IN THIS ORDER
1. STEP 0: save this brief (the text between the message's BEGIN BRIEF and END BRIEF lines) byte for byte as docs/governance/briefs/foundations-turn-p1.md, in one fenced block, and prove its sha256 equals the value after END BRIEF. Do not edit roadmap.md or docs/_changelog.md yourself: step 4's script writes them, roadmap line 3 included.
2. Read CI (the last completed run) and note it. A red is fixed after step 4, never before it: the sha256 values below assume dev d5b48d71 unchanged.
3. Write each data file below to /tmp/p1/<name>, outside the repository, exactly: its content is every byte after the newline that ends its FILE line, up to the start of its END line. Copy by script from this message; never retype. Check each file's sha256 and byte count against its FILE line; a mismatch is a STOP.
4. From the repository root run: `python3 /tmp/p1/p1_apply.py /tmp/p1 .` It creates the spec, corrects one phrase in docs/governance/sage/README.md's import note, makes R9's INC-1017 roadmap line's path a code span (`scripts/**`, INC-1019), and writes roadmap line 3, P0's tick and the changelog line. Every sha256 it prints must equal the EXPECTED list; a mismatch is a STOP. These are the operator's approved spec (DEC-289) and the supervisor's records, imported word for word: never edit them.
5. Then fix any CI red at its root. The format red on d5b48d71 is INC-1019, which step 4 fixes.
6. PART B — INC-1020: BND-E1 (e2e/shell-bands.spec.ts :63, signed in) read the band rows once, before the panel tabs a signed-in person sees had rendered, and passed on retry (run 41096998961, shard 15, desktop-1280: received ["panel-header", "shell-breadcrumb-row", "location-row"]). The test waits until the panel tabs are visible before it reads the rows; no assertion changes (G38). Check every other test in the file that reads the band rows signed in for the same read. Run e2e/shell-bands.spec.ts whole, both projects, retries 0.
7. Then THE PLAN below.

EXPECTED (step 4)
0bda02f25309c83f0906706b39ae9463f6486fc919e232dcc122624766802042 docs/governance/sage/sage-3d-style-change-spec.md
56cf94517f4cd0d67346773dc6b88852d0efe3f2eeab44c8c35b71cfad749af9 docs/governance/sage/README.md
3be8461ccf879fbeb55b7bdc201bd2c986223c7fd2c347dd27d073db2176b50a roadmap.md
baebf670c4a6dfadf46fa79ca7c25020ad6704f997006ad011e46c4185d0b9e1 docs/_changelog.md

THE PLAN — redesign Part 2, the Sage look. Plan only: docs/governance/plans/redesign-part-2.md is the one file this part writes; no app code, no test, no style change. Write it so that either executor can build from it, part by part (the operator is piloting Cursor on Part 2, DEC-303): each part names its files, its tests and what it must not touch, and never relies on one executor's own tools.

The operator's words (2026-10-30, New York): at 03:53 "THE COLOR SHADOWN ETC SHOULD BE PART OF THE REDESIGN TASKS SO WE HAVE UNIFORMITY."; at 07:08 "move to redesign work"; at 07:56 "the sage design should be the same for panel bar, breadcrumb and location bar. uniformity". On 2026-10-29 he approved R1–R11 of the spec (DEC-289) and wants the search bar and the location bar built exactly as designed.

THE SYSTEM (G0)
- CONCERN: one look — every colour, shadow, radius and type value comes from tokens, every surface reads them, and a theme is data.
- MECHANISM: src/styles.css's tokens (light in :root, dark in .dark) and src/styles.tokens.test.ts's contrast pairs, for the values; NONE YET for a theme as data and its resolver (D250).
- FIVE LENSES — security: a theme is validated token data, never raw CSS (D250's guard for later owner and staff themes); performance: device fonts only (DEC-289), no new download on the first paint beyond the tokens' bytes, flags and ribbons as shared drawings; failure: an unknown theme name falls back to the system theme; consistency: every surface the spec names reads the same tokens, light and dark; growth: themes per account and per shop (D250) take this mechanism by data and scope.

1. Census, from the real tree at the base, with file:line:
   - every surface the spec's fourteen components name, and the class or token that styles it today;
   - every colour, shadow, radius or font value written outside the tokens (the look law), app-wide;
   - the token module, the contrast test, the /dev/style fixture page, and the dark-mode switch with its before-first-paint script;
   - the language mechanism (D239, DEC-287: account against device), which the theme resolver follows or shares;
   - the tier marking today (listing-card.tsx's tier pill, `data-tier`), the status ribbon (ListingRibbon), and the dropdown and dialog primitives;
   - the tests that assert a look value today (each will be named under G38 when it changes).
2. Where the spec and later decisions differ, the later decision governs; list each and say how the plan follows it:
   - menu rows: the spec's fixed 42 px rows, 11 px gap and 3 px between rows (§2) give way to D247, D248 and D254 (rows share the height, 32–48 px from 768 px, panels match the main menu); the tile, radius, colours and shadows of §2 and §3 apply;
   - the rail's padding (§2, 14 px 10 px) gives way to D258 (the menu's band flush under the top bar);
   - the location row (§4, 48 px; 46 px on phones) gives way to D258: every band row is 40 px (band-row.ts), and the track and its segments are sized to fit inside it;
   - D260: the panel tabs bar, the breadcrumb row and the location row take one band look from the same tokens (surface, edge, shadow, text and label style); the location track sits inside it;
   - the footer (§10): its look only; its place and insets are D252, D253 and D257's;
   - D259's "Home" row and D255's strip back item take the same tiles as every menu row;
   - DEC-289 over §8's per-instance SVG: flags and ribbons are shared drawings (one definition per tier and mode, reused), never a per-card inline SVG with its own gradients and filters; say how the three palettes are served from one shared drawing. The designer's files are docs/governance/sage/ (sage-tokens.css, six SVGs).
3. D250 — themes as data, built now for the built-in themes only (Sage light and Sage dark):
   - every look value is a token; a theme is a named set of token values with light and dark values, defined as data in one module;
   - one resolver picks the theme in the order shop page, signed-in account, device, system; the device stores the theme's name; a removed name falls back to the system theme;
   - the theme applies before the first paint (the dark-mode switch's script is the model) and by scope for a container (a shop's page later);
   - a contrast test (WCAG 2.2 AA) runs on every built-in theme: the spec's acceptance pairs and every pair styles.tokens.test.ts holds today;
   - no account, shop or staff themes now, no admin screen, no migration.
4. Cards: the three card types (regular, Featured, Premium; §7), the satin status ribbon coloured by card type (§8), the invite card (§9). No listing has a tier today and D242's control is not built: say how the tests seed tiered scratch listings (G27), and how two listings are marked for the operator's walk — by a step for the operator, or on the preview only.
5. The spec's open questions, each with the measurement that answers it: the Amharic tier words on the flag at ×1 (never below 9 px); the raised Post listing disc (R6) over content above the bottom bar; "No longer available" on the satin band at 3 cards a row.
6. The build split into ordered parts, each with its files, its tests and its growth per page (ESTIMATE), for example: the tokens, theme data, resolver and contrast tests first; then the shell (top band, menus and tiles, the band rows, footer, bottom bar); the location track; cards, tiers and ribbons; the ad page; menus and dialogs; the dark set. Each part is one turn's work at most. A page that grows by more than 1 KiB, or without a named cause, is a STOP for a ruling.
7. The existing tests stay green unchanged, except those that assert a look value the spec changes: each named, with what replaces it (G38). New checks: the contrast tests, LL-1 (no card gets a plain border), a computed-style check per component at 390, 834 and 1440 px (light and dark), and the acceptance list of the spec's last section.
8. One walk for the operator at the end, at 390, 834 and 1440 px and in dark mode, written by the supervisor at the close (G31).

A premise of this brief that the census finds wrong (a mechanism already exists, a decision is read wrongly) is reported first in the plan, before any part that depends on it.

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, with its last line pasted (no FAIL).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-p1.report.md:
- step 0's sha256;
- the CI line;
- the four printed sha256 lines;
- Part B: what changed in BND-E1 (and any sibling), with the run's count line;
- the plan's parts, each with its files, tests and growth estimate;
- the conflicts list (item 2) and any premise the census found wrong;
- the checks' last line;
- K2;
- git diff --name-only d5b48d71.
