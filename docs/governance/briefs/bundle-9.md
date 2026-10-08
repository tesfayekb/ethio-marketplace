# Bundle 9 — the house style: brief, version 14 (saved unchanged, 2026-10-08)

```text
BUNDLE 9 — THE HOUSE STYLE, VERSION 14 (2026-10-08). THIS FILE REPLACES VERSION 13. Turn 13 (Part C2k) landed at df6d3ef4 and matches version 13. CI on it: 1,477 passed, 2 failed — one test, the smoke test, in both of its results. This version specifies TURN 14 = ONE TEST FIX (Part C2l). No product code changes.
Line numbers are as of commit df6d3ef4 (dev). This file is public: it is written as build instructions.

ANSWERS TO TURN 13
- Verified against version 13 by the diff of 17f4e9ac..df6d3ef4:
  - the location-row test reads displayed text and expects the width's label;
  - `signOutViaUi` below 768 opens `account-menu` by test id;
  - PW-171 compares centres, and the chips' tops to each other.
  Accepted. All three now pass in CI.
- PW-173 is green on df6d3ef4, so it is watched and not fixed. Your reading of step-where.tsx :903–939 and :420–471 is recorded.
- The one red, CI run 37822924309 (completed 18:44:28 UTC): e2e/smoke-auth-i18n.spec.ts, mobile-360, "Test timeout of 60000ms exceeded" at `signOutViaUi` (:92). The call log shows `account-menu` already OPEN (`aria-expanded="true"`, the Amharic menu on screen), with the page intercepting the click.
  - Cause, read at :81–88: the test opens the account menu at :81. Its `if (!isMobile(page))` block, the only place that closes it with Escape, is skipped on phones. That guard dates from when phones had no account menu.
  - Since turn 12 the account menu exists at every width, so the guard is stale. Census: it is the only `!isMobile(page)` guard around the account menu in the specs.

STEP 0 — keep this brief
- Before anything else, save this file byte for byte OVER docs/governance/briefs/bundle-9.md (it is already in its saved form: the header line and one fenced text block). On every later turn, read that file first. roadmap.md line 3 stays as it is; tick no roadmap line in this turn.

HOW TO WORK
- Order of the turn: step 0; C2l.1; C2l.2; the report; END THE TURN.
- The turn starts by reading CI for the last commit on dev: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address (you cannot git-fetch that branch). Paste the first six lines of ci-status.md.
- Browser tests: "local browser runs unavailable" continues; CI on the final commit is the proof. Nothing runs against ethio-prod or the published site.
- Tests (G38): no assertion is loosened, no timeout raised, no retry added. ANY test this brief does not name is not edited.
- No product code change, no migration, no database write, no package or dependency change, no new string.
- Scope: e2e/smoke-auth-i18n.spec.ts, docs/_changelog.md and the brief.
- The commit that is judged by CI ends the turn: END THE TURN and send nothing after it.

PART C2l — THE SMOKE TEST'S ACCOUNT MENU

C2l.1 — e2e/smoke-auth-i18n.spec.ts :81–88
- Remove the `if (!isMobile(page))` condition, so that at EVERY width, after `openAccountMenu(page, am["shell.accountMenu"])`:
  - the test checks `account-menu-sign-out` is visible and has the Amharic text;
  - then it presses Escape.
- Then add `await expect(page.getByRole("menu")).toHaveCount(0);` before `expectNoHorizontalOverflow`. The test now asserts more on phones, not less.
- Remove the `isMobile` import if it becomes unused. Nothing else in the test changes.

C2l.2 — One changelog line.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- The operator re-checks the three walk changes after this turn's CI is green and he has published.
- Then the records turn for bundle 9 (documents only), then BUNDLE 10 — the feed engine.

REPORT. First lines: done or not done for step 0, C2l.1, C2l.2; any cited line that read differently. Then:
- the six ci-status lines;
- "local browser runs unavailable";
- format:check and lint;
- the file list from `git diff --name-only df6d3ef4`;
- "Logs read: … · unavailable: …".
Never "CI green" from a local run.
```
