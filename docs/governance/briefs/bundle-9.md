# Bundle 9 — the house style: brief, version 11 (saved unchanged, 2026-10-08)

```text
BUNDLE 9 — THE HOUSE STYLE, VERSION 11 (2026-10-08). THIS FILE REPLACES VERSION 10. Turn 10 (Parts C2g and C2h) landed at f4bae585 — the platform pushed it at 11:15:46 UTC although the turn stopped before its browser runs — and it is verified by diff against version 10. CI on f4bae585 is RED with two failures, both in shard 5 (desktop-1280). This version specifies TURN 11 = THE FIX: the width walk's test is split (the supervisor's design loaded pages 26 times in one test), and the browser problem is ruled.
Line numbers are as of commit f4bae585 (dev). This file is public: it is written as build instructions.

ANSWERS TO TURN 10
- Your work matches version 10: the `rail-icons` variant (src/styles.css :6–18) and every collapsed utility moved to it; `useWidthQuery` for the tooltips and the menu's content; the » / « below 1024 and the collapse toggle from 1024; the "overlay" variant so the names show in the menu from 768 px; `menuIsOverlay`, openRailScope and signOutViaUi; `--nav-active` in both themes; the bar's pill, 24 px icons, the semibold label; ITEM_ACTIVE on `bg-nav-active`; the two admin-shell lines; the width walk; the docs. Accepted.
- CI on f4bae585 (run 37768908534, completed 11:59:46 UTC): 1,486 passed, 2 failed, both in shard 5, desktop-1280. (1) e2e/phone-frame.spec.ts :174 "account and post at every width" — the 60 s test timeout ran out: the test loads "/account" 13 times and "/post" 13 times in one test, and the shard's browser logged two "429 (Too Many Requests)" responses. That was the brief's design, not your error. (2) e2e/post-wizard-pricing.spec.ts PW-58 (:503) — "150" did not show the range refusal: the field showed "Enter your commission percentage." in both attempts. It ran in the same shard as the 26 rapid page loads; the supervisor's HYPOTHESIS is that the burst exhausted a request limit that the price step's own reads need. It is not to be edited: C2i.1 removes the burst, and CI then shows whether PW-58 is green again.
- The 44 px check and your "36 px on mouse screens": no conflict. The walk measures only the controls in `shell-topbar` and `bottom-bar`. The 36 px rows (`md:pointer-fine:min-h-9`) are the side menu's rows (src/components/shell/app-rail.tsx :67 and :448) and the panel header (panel-header.tsx :60), which the walk does not measure. The top bar's buttons are `min-h-11` (app-header.tsx :34–35). The check passed in CI on "/" and "/admin/categories" at every width. It stays as written.
- Committing without a local browser run: the platform pushed your work anyway, and CI ran the whole suite on it. Rule for this turn and later turns while the browser cannot start: try ONCE to make it start (C2i.0); if it still cannot, the rule "a file that is not fully green is not committed" is replaced, for the files this turn changes only, by "CI on the turn's final commit is the proof". Say "local browser runs unavailable" in the report's first lines, and change nothing in the project to work around it.

STEP 0 — keep this brief
- Before anything else, save this file byte for byte OVER docs/governance/briefs/bundle-9.md (it is already in its saved form: the header line and one fenced text block). On every later turn, read that file first. roadmap.md line 3 stays as it is; tick no roadmap line in this turn.

HOW TO WORK
- Order of the turn: step 0; C2i.0; C2i.1; C2i.2 if the browser runs; the report; END THE TURN. Do not stop between steps: a clean point is not a reason to stop. Stop only for a question this brief cannot answer, or the end.
- The turn starts by reading CI for the last commit on dev: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address (you cannot git-fetch that branch). Paste the first six lines of ci-status.md.
- Browser tests are started only with `bun run e2e:local <files>` or `bun run e2e:changed` (AGENTS.md; DEC-146). Nothing signs in to, or runs a test against, ethio-prod or the published site.
- Tests (G38): a red is fixed at its root. No assertion is loosened, no timeout raised, no retry added, no test skipped or moved to make a run pass. ANY test this brief does not name is not edited.
- No migration, no database write, no project package or dependency change, no new string. Closed surfaces (G22): the workflow files, the failure reporter, the migration check and e2e/global-setup.ts are not touched.
- Records: you write the changelog line; the decision and incident ledgers are the supervisor's.
- The commit that is judged by CI ends the turn: when the work is done, END THE TURN and send nothing after it (the platform pushes).

PART C2i — THE FIX AFTER TURN 10

C2i.0 — THE BROWSER, ONCE
- Run `bunx playwright install-deps chromium` once. It installs the system libraries the browser needs; it is not a project package change. If it fails, for example because it needs administrator rights, do not try anything else.
- Then run `bun run e2e:local e2e/phone-frame.spec.ts` once to see whether the browser starts. Report the outcome in one line: "browser starts" or "browser does not start: <the first error line>".

C2i.1 — THE WIDTH WALK, SPLIT (e2e/phone-frame.spec.ts)
- :174–184 "account and post at every width" becomes TWO tests. Both keep `checkFrame` (:99) unchanged, the WALK widths (:97) and the same signed-in identity.
- (a) "account at every width": the same loop over WALK on "/account" only, one load per width.
- (b) "the posting wizard resized through every width without a reload": one `gotoReady(page, "/post")` at 360 × 800, wait for `post-step-1`, then for each width in WALK `setViewportSize({ width, height: 800 })` and `checkFrame(page, width)`, with no reload. This is the same pattern as :186–194, and it keeps the posting page out of a burst of reloads.
- No test timeout is changed. "signed out home at every width", "admin categories at every width" and "one session resized through every width without a reload" are unchanged.

C2i.2 — ONLY IF THE BROWSER STARTS
- Local runs, each file whole, alone, both projects where the configuration runs it in both, 2 workers, 0 retries, fake mode: e2e/phone-frame.spec.ts; e2e/post-wizard-pricing.spec.ts with `-g "PW-58"` and `--repeat-each 12 --workers 8` in both projects; e2e/shell.spec.ts; e2e/admin-shell.spec.ts.
- The measurements version 10 asked for, measured in a test you do not commit, local build:
  - at 900 × 800: the rail's and the logo cell's widths, whether a tooltip shows on a rail icon, the menu's width and its first row;
  - at 360 × 740: the bar's height, its tallest item's height, and the pill's box;
  - the label table of version 10's C2h.4.
- If the browser does not start, the runs and measurements wait for a later turn. CI on this turn's commit is the proof.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- The feed engine — the server filters every page by the category's whole branch and by place, orders it and pages it, fast at any catalogue size. The operator approved its spec on 2026-10-08. It comes next, in its own bundle.
- Then: subcategories in the menus, the scroll area (from 768 px only the page body scrolls), and PART D1 (the pattern console). The short bottom-bar labels go with the subcategories.

REPORT. First lines: done or not done for step 0, C2i.0 to C2i.2; the C2i.0 line; any cited line that read differently; any file outside this brief's lists. Then: the six ci-status lines; each local browser run (file, project, passed/failed/skipped, retries), or "local browser runs unavailable"; the measurements if taken; format:check, lint; the file list from `git diff --name-only f4bae585`; "Logs read: … · unavailable: …"; limitations. Never "CI green" from a local run.
```
