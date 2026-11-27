# CI speed: staff sign-ins without the code-window wait, lanes planned from fresh measured times, full runs only where a verdict is due, and the browser libraries installed from the sources they need — report
Base: 32f68bb96 · Final commit: 76de8cc64 · Brief: docs/governance/briefs/cursor-ci-speed.md (sha256 592c16cdba6220c02df7533c0e7ebff55c9b3c59f0d27cbe038c52cf1dab97f1) · Ruling 1: docs/governance/briefs/cursor-ci-speed-ruling-1.md (sha256 e9291a73838020c3dde5829b16fbcf8dc654b075c66edb851699e511018850ac)
Review: READY · 0 BLOCKER · 0 MAJOR · 5 MINOR · on 76de8cc

CI on the base (read at STEP 0): run 46023270935 on `32f68bb9685485b4df91e17a97cb215e7c864e77`, SUCCESS. CI on this pull
request's final code commit: run 46051288968 on `76de8cc640e7f593cb3fd14fc55b611647385b99`, SUCCESS, every check green
(§11).

## 1. Done / not done, by part and step

- STEP 0 and STEP 1 (PLAN FIRST): the brief saved (`4345d6a14`), the census and the plan as stop 1 (`5cfe8b0c2`,
  `docs/governance/reports/cursor-ci-speed.stop-1.md`), draft pull request
  [#118](https://github.com/tesfayekb/ethio-marketplace/pull/118).
- Ruling 1 saved by scripted copy (`29d33f271`); its sha256 equals the one the message stated.
- Part A, done (`4d68f24cf`): the code-step wait leaves the node mint (DEC-488); the refused-verify line; the comments that
  stated the refusal as fact corrected; `untilSignOutCleared` (INC-1324) used by `signInStaff`; the `[staff-dump]` lines;
  CF-HELPERS-11 and CF-HELPERS-12 with planted cases at `5cfe8b0c2`; STAFF-E4 as the positive control (§10).
- Part B, done (`afe70ebb3`; one self-review fix `76de8cc64`): the weights read once a run in `backend-images`
  (`scripts/ci/lane-weights-read.sh`), handed to the lanes as job outputs; `lane-plan.ts --weights --weights-source`; the
  reporter writes the run's weights only from a green run whose 16 numbered lanes recorded results; the measured-spread
  finding line; CF-LANES-7, LWM-3 → 9.
- Part C, done (`91c89821b`): a pull request's newer push cancels its run in progress; a draft pull request's run answers
  `skipped: draft pull request` (only for a `pull_request` event); `ready_for_review` runs the lanes; the `ran` line names
  each run read and what it was (INC-1314); CF-DOCS-12/13, CF-PRRUN-1 → 5.
- Part D, done (`8b4834493`, `d31c4776f`): the install reads the distribution's own sources through a scratch
  `sourceparts` directory; the trap; CF-INSTALL-8/9, red-first on the base script.
- Decision 6: `wired.test.ts` lines for this turn's new tests (`91c89821b`, `8b4834493`, `a8930de54`).
- STEP 5a, done (`53d15de52`): `docs/features/ci-local-backend.md`, `e2e-harness.md`, `ci-guards.md`,
  `ci-status-reporter.md` (Part A's doc lines landed with part A: `e2e-harness.md`, `step-up-auth.md`).
- STEP 6, done: typecheck, lint, the scripts laws, `bun run checks` (§5), the browser run by id (§5), `check-go --at
  32f68bb96` ("[check-go] no finding"), the self-review (rule 80).
- STEP 7, done: one push (`5cfe8b0c2..76de8cc64`), `gh pr ready 118`.
- STEP 8: this report.

## 2. Files changed

`git diff --name-only 32f68bb96` (before this report's commit):

```
.github/workflows/ci.yml
.github/workflows/local-backend-proof.yml
docs/features/ci-guards.md
docs/features/ci-local-backend.md
docs/features/ci-status-reporter.md
docs/features/e2e-harness.md
docs/features/step-up-auth.md
docs/governance/briefs/cursor-ci-speed-ruling-1.md
docs/governance/briefs/cursor-ci-speed.md
docs/governance/reports/cursor-ci-speed.stop-1.md
e2e/helpers/session.ts
e2e/helpers/staff-factor.ts
e2e/helpers/ui.ts
e2e/staff-gate.spec.ts
roadmap.md
scripts/ci/docs-only.test.ts
scripts/ci/docs-only.ts
scripts/ci/install-browser-deps.sh
scripts/ci/install-browser-deps.test.ts
scripts/ci/lane-plan.ts
scripts/ci/lane-weights-read.sh
scripts/ci/lane-weights.test.ts
scripts/ci/lane-weights.ts
scripts/ci/pr-runs.test.ts
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/lanes.test.ts
scripts/conformance/wired.test.ts
scripts/e2e-failure-report.ts
scripts/fixtures/docs-only/artifacts-code-tree-67da3113.json
scripts/fixtures/docs-only/jobs-green-45859549094.json
scripts/fixtures/docs-only/run-45859549094.json
scripts/fixtures/e2e-helpers/aal2-session-5cfe8b0c2.ts.txt
scripts/fixtures/e2e-helpers/staff-factor-5cfe8b0c2.ts.txt
scripts/fixtures/install-deps-third-party-403.txt
```

New files (11, `git diff --diff-filter=A --name-only 32f68bb96 | xargs git ls-files --error-unmatch` answered all 11):
the brief, the ruling, the stop report, `scripts/ci/lane-weights-read.sh` (mode 755), `scripts/ci/pr-runs.test.ts` and
the six fixtures. No file deleted (`--diff-filter=D`: none). `roadmap.md`: line 3 only (STEP 0).

## 3. Behaviour contract — before → after

| Function | At 32f68bb96 | Now |
| --- | --- | --- |
| `aal2Session` (`e2e/helpers/ui.ts`) | waits until the next 30 s step when this worker's last mint of the factor used the current one (`untilUnusedStep`), then challenge and verify; a refused verify leaves no line | challenge and verify at once (DEC-488); each refused verify prints `[e2e:pool] <label> verify refused on attempt <n>: <text>`; the three attempts, the 8 s pause, DEC-480's challenge retry, the `aal2` check and the minted line unchanged |
| `signInStaff` (`e2e/helpers/staff-factor.ts`) | account menu shown → `signOutViaUi`, then the write; a lost session fails with `assertInjectedIdentity`'s text | the same, plus `untilSignOutCleared` between the sign-out and the write (a poll, 15 s, its own text); a lost session's failure adds three `[staff-dump]` lines (key present, menu or sign-in link, path) |
| `untilSignOutCleared` (`e2e/helpers/session.ts`) | — | new: waits in the page until the stored session key is gone |
| `planLine` (`scripts/ci/lane-plan.ts`) | `… weights from run <id> (<date>);` | `… weights from run <id> (<date>), <source>;` — the source is `the committed scripts/ci/lane-weights.json` or the evidence path, run and commit, or `the committed … — <why>` |
| `lane-plan.ts` CLI | reads `scripts/ci/lane-weights.json` | `--weights <file> --weights-source <line>`; without them, the committed file as before |
| the lanes (`local-backend-proof.yml`) | plan from the committed weights | plan from the copy `backend-images` read (job outputs `weights`, `weights_source`); the read never fails the run |
| `e2e-failure-report.ts` | — | on a green run with all 16 numbered lanes' results, writes `docs/tracking/lane-weights.json` (ci.yml publishes it); with all 16 present, adds `- Measured lane spread (DEC-375 b): …` to the failure file and the step summary; `lanesSkippedReason("skipped: draft pull request")` → `a draft pull request` |
| `decide` (`scripts/ci/docs-only.ts`) | `ran — … holds code-tree-<id>… (<n> read)` | `ran — … (<n> read: <id> not green, <id> still running, <id> not ci.yml, …)`; `(0 read)` unchanged; the skipped line unchanged |
| `docs-only.ts` main | — | a `pull_request` event with `DOCS_ONLY_DRAFT=true` answers `docs_only=true`, `lanes=skipped: draft pull request`, `tree=` before any lookup; any other event ignores the flag |
| `ci.yml` | `cancel-in-progress: false`; `pull_request` default types | `cancel-in-progress: ${{ github.event_name == 'pull_request' }}`; types `opened, synchronize, reopened, ready_for_review` |
| `install-browser-deps.sh` | `playwright install-deps` reads every source list | reads a copy of `ubuntu.sources` through `Dir::Etc::sourceparts` (its own apt file); prints `ci-mirror sources: the install reads ubuntu.sources only; left out: <lists>`; the trap removes the apt file and the scratch directory |

Seen live on this pull request: the draft run 46051106645 printed `DEC-365 lanes: skipped: draft pull request`, its `E2E
lanes` and bundle budget `skipped`; `gh pr ready` started run 46051288968, which cancelled 46051106645 in progress.

Before and after (the brief's STEP 8 measures). Before, from stop 1 (two workers, summed duration of every attempt):
run 46000329861's numbered lanes 761 → 2,527 s, mean 1,582 s (Lane seconds 1=1385 2=1125 3=873 4=761 5=1783 6=2222
7=1943 8=1489 9=861 10=2133 11=2527 12=1724 13=1225 14=2036 15=1789 16=1443); run 45929211475's wall time 1,948 s
(32.5 min); the 56 staff spec files 20,093 s against 6,682 s in the committed weights (3.01 times), the other files
7,114 s against 6,001 s (1.19 times).

After, run 46051288968 on `76de8cc64` (the weights file it wrote, the same measure: the summed duration of every attempt):
the 56 staff spec files 7,121 s against the committed 6,682 s (1.07 times; 20,093 s before); the other files 5,989 s
against 6,001 s (1.00 times); all 126 files 13,110 s against 12,682 s. Lane jobs' wall time from the Actions API
(started to completed, the 16 numbered lanes): before, run 46000329861 (attempt 2) 648 → 1,797 s, mean 1,076 s, and run
45929211475 635 → 1,744 s, mean 1,109 s; after, 549 → 720 s, mean 643 s. The run, created to the verdict job's end:
18:41:02 → 18:57:47 UTC, 1,005 s (16.8 min), against 1,948 s for run 45929211475. This run still planned from the
committed weights (no weights file was on the evidence branch yet, §11), so the fall comes from part A's sign-ins; the
plan from measured times starts with the next run.

## 4. Censuses

The brief's queued-items grep (`ci-speed`, `INC-1314`, `INC-1311`, `INC-1323`, `INC-1324`, `lane-weights` across
briefs, reports, `docs/features` and `roadmap.md`) is stop 1's section "queued" (`cursor-ci-speed.stop-1.md:252-258`).
This turn's further reads:
- The old `ran` line asserted: `rg "no green ci.yml run of this repository"` over `scripts`, `src`, `.github`,
  `docs/features` — `scripts/ci/docs-only.test.ts:178` (CF-DOCS-2, `(0 read)`, unchanged) and `:233` (CF-DOCS-6,
  changed, §5); `scripts/e2e-failure-report.ts`'s self-test sample (a redacted `n` form, not the line's text; unchanged).
- Readers of `skipped — `: `.github/workflows/ci-status-report.yml:71` (`lanesLine.startsWith('skipped — ')`), the
  reporter's `lanesSkippedReason`. The draft line does not start `skipped — ` (CF-PRRUN-5).
- apt call sites: `rg "apt-get (update|install)" .github/workflows scripts` — `local-backend-proof.yml:416-417` (§6).
- LGA-21's sign-ins: `e2e/legal-admin.spec.ts:1050` `signInJobSuperAdmin`, `:1051` and `:1072` `signInStaff` (§11).

## 5. Tests

Added: CF-HELPERS-11, CF-HELPERS-12 (`scripts/conformance/e2e-helpers.test.ts`, planted at `5cfe8b0c2`); STAFF-E4
(`e2e/staff-gate.spec.ts`); LWM-3 → 9 (`scripts/ci/lane-weights.test.ts`); CF-LANES-7 (`scripts/conformance/lanes.test.ts`);
CF-DOCS-12, CF-DOCS-13 (`scripts/ci/docs-only.test.ts`); CF-PRRUN-1 → 5 (`scripts/ci/pr-runs.test.ts`, new); CF-INSTALL-8,
CF-INSTALL-9 (`scripts/ci/install-browser-deps.test.ts`); `wired.test.ts` CF-WIRED-1's lines for them.

Changed: CF-DOCS-6's expected `ran` line now ends `(5 read: <id> not green, …)` (decision 4 c: the line names what it
read). `install-browser-deps.test.ts`'s harness: the fake `bunx` reads apt's sources as apt does (the script's
sourceparts file, else `sources.list.d`) and records them; `TMPDIR` is the test's own directory. No assertion loosened.

Fixtures, all captured: `scripts/fixtures/docs-only/artifacts-code-tree-67da3113.json`, `run-45859549094.json` and
`jobs-green-45859549094.json` (the Actions API through `ARTIFACTS_JQ`, the run read with its times, `JOBS_JQ`);
`scripts/fixtures/install-deps-third-party-403.txt` (run 46000329861 attempt 1, Lane 10, job 140510205274, lines
"Installing dependencies..." → "Error: Installation process exited with code: 100", cut by `awk` from `gh run view --job
--log`); the two `5cfe8b0c2` planted texts (cut by script from `git show`). CF-DOCS-13 answers the run as the API
answers any run in progress (`status: in_progress`, `conclusion: null`), from the captured run whose `updated_at`
(17:18:18Z) is after the lookup (17:07:41Z); it then proves the same run, completed, proves the tree.

Red-first:
- CF-INSTALL-8 and CF-INSTALL-9 on the base script (`git show 32f68bb96:scripts/ci/install-browser-deps.sh` written into
  place, then the copy put back and compared with HEAD): `2 failed | 8 skipped`, each `expected 1 to be +0` (the 403
  stopped the install); green on the fixed script. Log: `/tmp/ethio-scratch/cursor-ci-speed/install-red.log`.
- CF-HELPERS-11 and CF-HELPERS-12 refuse their planted cases (`aal2Session awaits \`untilUnusedStep\` …`;
  `staff-factor.ts` line 155).
- STAFF-E4: no timing red (§10).
- CF-PRRUN-1 → 5 and CF-DOCS-12/13 assert new behaviour (`draftDecision` and the named reads do not exist at the base);
  decision 4 (c) needs no red-first.

Local runs (DEC-374):
- `bun run typecheck`: exit 0. `bun run lint`: exit 0.
- `bunx vitest run scripts --maxWorkers=2` (after the review fix): `Test Files 151 passed (151)`, `Tests 858 passed | 1
  skipped (859)`.
- `bun run checks` on `d31c4776f`'s tree (the review fix after it touched `lane-plan.ts` and a test; the gate was not
  run again, rule 00 step 8): fast line `checks (fast): 25 PASS · 0 FAIL · 594s`; last line `checks: 36 PASS · 0 FAIL ·
  26 NOT RUN · 662s`. Component tests in it: `Test Files 663 passed (663)`, `Tests 4355 passed | 1 skipped (4356)`. The
  first run of the gate had 2 FAIL, both CF-ADOPT-1 (DEC-244) refusing `readdirSync` in the install test; fixed at its
  root in `d31c4776f` (the test records the directory apt read instead of listing one) and the gate run again whole.
  NOT RUN, each with its runner's reason: `scope` (2, the Actions API's artifacts exist only in a GitHub run), actionlint
  (the pinned binary is linux/x64), gitleaks (same), the five `Install dependencies` (installed already),
  dependency-audit (2, the advisory service is not reachable), e2e-preflight (4, staging credentials), `e2e` (6, the
  lanes' artifacts), `promote` (4, only CI promotes), Semgrep's SARIF upload (2, GitHub only).
- The browser run, once, by id, `--retries=0`, projects `mobile-360` and `desktop-1280`, on ethio-staging (§10):
  `bun run e2e:local -- e2e/staff-gate.spec.ts e2e/admin-listings.spec.ts e2e/legal-admin.spec.ts --grep "STAFF-E1
  |STAFF-E2 |STAFF-E4 |AL-31 |LGA-21 "` → `Running 10 tests using 2 workers`, `10 passed (1.7m)`; `bun run e2e:local --
  e2e/mfa-stepup.spec.ts` (whole) → `Running 26 tests using 2 workers`, `26 passed (2.7m)`. `[ssr-error]` lines: 0 in
  both logs (`rg -c`). No `[e2e:pool] … verify refused` line in either.
- J-audit (e2e/ changed): STAFF-E4 leases its own account (`leaseUser`, `grantRole`), writes no shared value, uses no
  `.first()`, no `waitForTimeout`, no `test.only`; `untilSignOutCleared` is a poll with its own failure text.

CI on the pull request proves the rest: every lane, and the repeat lane on the changed specs (`staff-gate.spec.ts`)
and the importers of the changed helpers.

## 6. K2 — siblings that bypass the mechanism

- The browser libraries' sources (part D's concern): `.github/workflows/local-backend-proof.yml:416-417` — the lane's
  certificate step runs its own `sudo apt-get update` and `apt-get install -y libnss3-tools` when `certutil` is absent,
  reading every source list; a third-party 403 there would fail that step. Left: not in part D's scope (ruling 1, scope
  for part D: the script, its test, its fixtures). Grep: `rg "apt-get (update|install)" .github/workflows scripts`.
- The code-step refusal stated as fact (part A's comments): `e2e/helpers/totp.ts:29` ("a factor accepts each code
  once") and `e2e/staff-gate.spec.ts:69` (STAFF-E2: "A code is spent once per step: the one the mint used is not typed
  again."). Left: `totp.ts` is not in part A's scope, and the spec is in scope for STAFF-E4 only. Grep: `rg -n "accepts
  each code once|spent once|refuses a code|SPENT ONCE" e2e src docs/features` (its other hits are about dials and
  resets, not codes).
- The session write after a screen sign-out (CF-HELPERS-12): the census finds no other site (`signOutWriteFindings`
  over `e2e/`).
- Weights readers: `rg "lane-weights.json" scripts .github` — the plan (`lane-plan.ts`), the maker (`lane-weights.ts`),
  the read script, the publisher line; no other reader.
- Draft state: `rg "pull_request.draft|DOCS_ONLY_DRAFT" .github scripts src e2e` — ci.yml's scope step and
  `docs-only.ts` only.

## 7. Allowlists and guards

No allowlist changed (`git diff --name-only 32f68bb96 | rg allowlist`: none). New guards: CF-HELPERS-11/12 (the e2e
helpers census, planted cases), CF-LANES-7 (the weights' wiring, planted cases), CF-PRRUN-1 → 5, CF-INSTALL-8/9; each
named in `wired.test.ts`. `scripts/check-promote-needs.sh` untouched (Q4).

## 8. Strings

None (FLAGS: no-new-string). No `t(` key touched; the i18n maps were not regenerated.

## 9. Migrations

None (FLAGS: no-migration).

## 10. Departures

- The browser runs (STAFF-E4's red attempt and its green, STEP 6's by-id run) ran on ethio-staging, not on the local
  temporary backend the ruling names: `bun run db:proof`'s stack keys are never printed or read (rule 50), so no browser
  run can target it from this machine — the same limit as bundle 8b. CI's lanes run on the temporary backend.
- STAFF-E4 is a positive control, not a timing red-first (ruling 1, decision 2's fallback). Its timing form failed on
  the base helper in both projects on its premise ("the second sign-in signed the page out first": the base helper
  never signed out — `signInStaff`'s instant `account-menu` count read 0 right after hydration and 1 after a wait,
  measured), so it was no red for INC-1324. Landed: STAFF-E4 asserts the key the wait polls holds the signed-in session,
  then that it is gone after the sign-out and the wait. Logs: `/tmp/ethio-scratch/cursor-ci-speed/staff-e4-red.log`,
  `staff-e4-diag.log`, `staff-e4-green.log` (`2 passed (17.2s)`).
- The `ran` line adds a fourth state beside the ruling's three, `<id> not ci.yml`, for an indexed run of another
  workflow (a case CF-DOCS-8 already covers); folding it into "not green" would misname it.
- The weights read sits in `backend-images` as ruled (no job of its own was needed).
- The measured-spread judge: the brief placed it in CF-LANES-2 with a stale-weights planted case; under ruling 1
  (decision 3, a finding line, never a verdict) it is `measuredSpreadLine` (`scripts/ci/lane-plan.ts`), proven by LWM-5
  (a set 36 % over the mean gives the `finding:` line; a set within the limit the plain line; a lane with no results is
  named) and LWM-6 (the reporter writes it into the failure file only when all 16 lanes recorded results).
- `install-browser-deps.sh` warns (`::warning title=ci-mirror::apt's source scope could not be written … — the install
  reads every source list`) and goes on as the base did when its apt file cannot be written.
- Commits beyond the ruling's four titles: `cursor-ci-speed: wired lines for parts A and B`, `… docs for parts B, C and
  D`, `… part D: the install test lists no directory` (the gate's CF-ADOPT-1 fix), `… the spread line reads no default
  for a lane` (the self-review's fix).
- No mechanical edit outside the listed scope was needed.

## 11. CI

The base's CI (STEP 0, the two-step SHA check in stop 1): run 46023270935 on `32f68bb9685485b4df91e17a97cb215e7c864e77`,
completed SUCCESS; no red of an earlier turn to fix.

This pull request's runs (`gh api …/actions/runs?branch=cursor/ci-speed`: 5 runs before this report's push, three of
them CI and two the Lovable branch guard, which was skipped):
- 46027232024, the stop-1 push on `5cfe8b0c2`: SUCCESS in 6 min 48 s. The scope job printed `DEC-365 lanes: skipped —
  the code tree was proven by run 46000329861 (pull_request, cursor/bundle-8b, head 6ab3ae3)`. A records-only push
  reused a proven tree (DEC-375 a), and no browser lane ran.
- 46051106645, the draft run on `76de8cc64`: its scope job printed `DEC-365 lanes: skipped: draft pull request`, and `E2E
  lanes` and the bundle budget were skipped. `gh pr ready` cancelled it while its build, component tests and Semgrep were
  still running (part C (a)). Its promote job's `cancelled` was listed as a fail by `gh pr checks` until the ready run's
  promote job replaced it.
- 46051288968, the ready run on `76de8cc64`: SUCCESS. `gh pr checks 118` gives 43 pass and 3 skipping, which are the
  draft run's `E2E lanes`, the Lovable branch guard, and the promote job (skipped on a pull request). The scope line was `ran
  — no proven code tree: no green ci.yml run of this repository holds code-tree-fbd77d227a5c… (0 read)`. The plan line
  was `16 lanes over 126 files, weights from run 43431755160 (2026-11-13), the committed scripts/ci/lane-weights.json —
  no weights file at evidence 223ed22d0; mean 793 s, largest 793 s (+0 %)`. The fallback is named as part B requires;
  the evidence branch held no weights file before this run's reporter wrote one.
- The branch evidence (`git show origin/ci-evidence:docs/tracking/branches/cursor/ci-speed/…`): `ci-status.md` gives
  commit `76de8cc640e7…`, conclusion SUCCESS, run 46051288968. `e2e-last-failure.md` gives `last E2E run 46051288968
  passed`, `Repeat: 42 of 1561 tests repeated — specs directly changed 1/1, importers of a changed helper 6/123; budget
  793 s` and `Measured lane spread (DEC-375 b): mean 453 s, largest 544 s (lane 2, +20 %); within the 25 % limit`, with
  flaky 0 and 0 errors outside a test. The server-error census had 0 lines off the allowlist, and accessibility had
  serious 0 and critical 0. `lane-weights.json` sits at the branch's path, from run 46051288968: 126 files, lanes 1-16.
  `lane-weights-read.sh` takes the newest run's file under `docs/tracking/` (the root's or any branch's), so the next run
  plans from it.
- Reds: none on the judged run, so nothing was re-run or fixed after the push. The draft run's cancelled jobs were
  cancelled by design, not by a red.
- 46053768672, the report's commit `7af88e1f5`: SUCCESS, 43 pass and 2 skipping (the Lovable branch guard and the promote
  job), every lane ran. Correction to this report's first version, which expected this run to reuse 46051288968's tree:
  `dev` moved between the two runs (`0a010e702`, Lovable's
  [#119](https://github.com/tesfayekb/ethio-marketplace/pull/119), the errors page, `32f68bb96..0a010e702`). The
  pull request's merge ref `Merge 7af88e1 into 0a010e7` therefore built a code tree no green run held. Its scope line
  was `ran — no proven code tree: no green ci.yml run of this repository holds code-tree-dae7e9255934… (0 read)`, so
  the full run was the correct answer. Run 46051288968 had merged onto `32f68bb96` (merge commit `1a1bcd1c3`, parents
  `32f68bb96 76de8cc64`). No file `dev` changed in `32f68bb96..0a010e702` is one this lane changed (`comm -12` over the
  two `git diff --name-only` lists: empty). As rule 00 directs, nothing was merged or rebased.
- This correction's commit adds one more run. With `dev` still at `0a010e702`, it is expected to reuse run
  46053768672's tree.

INC-1327 (LGA-21, three retried passes), from the flake ledger on `origin/ci-evidence` (the first line of each failed
attempt); the runs' artifacts were not read:
- 25 Nov, run 45527306417, `mobile-360`: `Test timeout of 60000ms exceeded.` LGA-21 makes three staff sign-ins
  (`signInJobSuperAdmin`, then `signInStaff` twice); each node mint could wait up to one 30 s step before this turn, so
  DEC-488's change (the wait removed) is the one that could cover it. Not proven: the artifacts were not read.
- 26 Nov, run 45736662097, `mobile-360`: `[e2e:setup] POST /factors/[account id]/challenge failed (500)`. Neither of
  part A's changes covers it (the challenge's 500 is DEC-480's retry class).
- 27 Nov, run 45935486979, `desktop-1280`: `expect(locator).toBeVisible() failed`. The ledger does not name the locator;
  if it is `signInStaff`'s signed-in marker after a lost session, INC-1324's wait covers it. Not read.

## 12. Limits

- The browser checks ran on ethio-staging, not the temporary backend (§10).
- actionlint and gitleaks did not run locally (linux/x64 binaries); CI's `Workflow lint` and `Secrets scan` judge them.
  `shellcheck` is not installed here and no project check runs it.
- The judge of DEC-488, INC-1324 and INC-1327 needs ten completed runs on dev after the merge.
- F5 (ruling 1, decision 4): under (a), a records-only push to a ready pull request whose code run is still running
  cancels that run; rule 00's order (the report pushed after the judged run) prevents it.
- The before and after of a run's wall time come from CI (§3, §11), never from a local run.

## 13. Findings

- `signInStaff` decides whether to sign the page out by an instant `account-menu` count
  (`e2e/helpers/staff-factor.ts:177`); measured, it reads 0 right after `gotoReady("/")` + `waitForHydration` and 1
  after a wait, so whether the sign-out branch runs is a race. The session write works either way (the init script
  wins), and INC-1324's wait covers the branch when it runs. Raised for Cursor 8c beside INC-1325/1326.
- `e2e/helpers/totp.ts:29` and `e2e/staff-gate.spec.ts:69` still state that a code is accepted once (§6); with
  INC-1325.
- `local-backend-proof.yml:416-417`: the certificate step's apt reads every source list (§6).
- `docs/features/e2e-harness.md:586-587` says the repeat budget is the slowest planned lane's seconds "at one worker";
  the lanes split two workers since DEC-378 (a). Read, not changed (outside this turn's change).

## 14. Records

DEC — DEC-488 (2026-11-27; the supervisor under G17, on the operator's word "make sure we dont get failures and dont spend more time and cursor credits"): the node mint of a staff session makes its first verify at once. The code-step wait bundle 6 added (`untilUnusedStep`) is removed, and the GO's several-factors design is withdrawn. supabase/auth v2.197.0, the image CI pins, keeps no record of a used code step (`verifyTOTPFactor`), and the pool minted without a wait before bundle 6. Judge, frozen before the result: over the ten completed runs on dev after the merge, a staff sign-in that fails after its last attempt with the server's invalid-code answer, on two of them, brings a wait back as the retry's pause, never before the first verify.

INC — INC-1314, corrected: the lookup counted correctly; the run it read (45859549094) was still running. Closed by DEC-486 (b); the `ran` line now names what it read.

INC — INC-1323: fixed (part D). `install-browser-deps.sh` has apt read only the distribution's own sources (a copy of `ubuntu.sources` named by its own `Dir::Etc::sourceparts` file, removed on every exit), so a third-party list such as packages.microsoft.com answering 403 no longer stops the install (CF-INSTALL-8/9).

INC — INC-1324: cause — the shell shows the signed-out header as soon as `signingOut` is set, before the app's `signOut()` clears the stored session, so `signInStaff` wrote the new session into that gap and the sign-out's late clearing removed it. Fix — after a sign-out through the screen, `signInStaff` waits (`untilSignOutCleared`, `e2e/helpers/session.ts`) until the page's stored session is gone before it writes; a lost session's failure carries `[staff-dump]` lines; CF-HELPERS-12. FIXED (watched): it closes after ten completed runs on dev with no failure of this kind from `signInStaff`; a second one reopens it with the dump's lines.

INC — INC-1325: `afterTotpStep` (`e2e/helpers/ui.ts`) and its spec callers wait a code step for a refusal the pinned auth server does not make (the CI-speed census, F1). OPEN, Cursor 8c: removed with a by-id proof, or kept with its reason.

INC — INC-1326: two node enrolment bodies, `enrolFactor` (`e2e/helpers/staff-factor.ts`) and `mintPooledSuperAdmin` (`e2e/global-setup.ts`); K2 (the census, F2). OPEN, Cursor 8c.

INC — INC-1327: LGA-21 (`e2e/legal-admin.spec.ts`) passed only on retry on 25, 26 and 27 Nov, with a different first line each time (runs 45527306417, 45736662097, 45935486979). OPEN (watched): §11 says which of the three part A's two changes cover, from artifacts you already hold or "not read"; judged on the ten runs on dev after the merge.

INC — INC-1328: SAP-1 at webkit-390 (`e2e/sage-ad-page.spec.ts`) passed only on retry on 21, 23, 24 and 27 Nov. OPEN, Cursor 8c.

slip — F3 (the other spec files' times rose since 13 Nov) is recorded with §3's per-file table; no incident. The table (summed seconds of every attempt, run 46000329861, two workers; then = the committed weights of 13 Nov): staff files 20,093 s (then 6,682 s, 3.01 times), other files 7,114 s (then 6,001 s, 1.19 times); the heaviest staff files admin-listings 1,573 (262), admin-categories-lifecycle 1,378 (217), admin-screening 1,264 (241), legal-admin 1,247 (123), admin-translations-console 1,140 (263), admin-attributes-import 1,037 (118), admin-attributes-library 1,019 (349), admin-attributes-links 959 (254), admin-attributes-editor 919 (211), admin-locations 875 (270).

DEC — DEC-485, DEC-486 and DEC-487: cited. DEC-485: a run's 32 minutes and a bundle's six to eight runs (the operator's yes of 26 Nov 22:48 New York). DEC-486: the lane plan's row amended, and which pushes run the browser lanes — (a) a pull request's newer push cancels its run, (b) a draft runs no lane, (c) INC-1314. DEC-487: overrides DEC-462's cache with part D's root-cause fix, the count restarted.

register row — the e2e staff sign-in and node mint (`e2e/helpers/ui.ts` `aal2Session`, `e2e/helpers/staff-factor.ts` `signInStaff`), amended: the mint's first challenge and verify go at once (DEC-488) and a refused verify prints `[e2e:pool] <label> verify refused on attempt <n>: <text>`; after a sign-out through the screen a session is written only once the page's stored session is gone (`untilSignOutCleared`, `e2e/helpers/session.ts`, INC-1324). Guards: CF-HELPERS-11, CF-HELPERS-12.

register row — the lane plan (`scripts/ci/lane-plan.ts`, `scripts/ci/lane-weights.ts`, `scripts/ci/lane-weights-read.sh`), amended: the weights are read once a run in `backend-images` from the newest `lane-weights.json` on ci-evidence and handed to the lanes (`--weights`, `--weights-source`), the committed file the named fallback; a green run whose 16 numbered lanes recorded results writes its weights to its evidence; the measured spread is a finding line, never a verdict. Guards: CF-LANES-7, LWM-3 → 9.

register row — the proven code tree and CI's runs (`scripts/ci/docs-only.ts`, `.github/workflows/ci.yml`), amended: a pull request's newer push cancels its run in progress (dev's queue, DEC-181); a draft pull request's run answers `skipped: draft pull request` (only for a `pull_request` event) and `ready_for_review` runs the lanes; the `ran` line names each run read and what it was. Guards: CF-DOCS-12/13, CF-PRRUN-1 → 5.

register row — the CI install of the browser's system libraries (`scripts/ci/install-browser-deps.sh`; DEC-366, DEC-462 amended by DEC-487), amended: apt reads only the distribution's own sources for the install, through the script's own `sourceparts` file and scratch directory, both removed on every exit. Guards: CF-INSTALL-8/9.

changelog — cursor-ci-speed: staff sign-ins mint without the code-step wait and wait for a screen sign-out to clear before writing a session (DEC-488, INC-1324); the lanes plan from the newest measured weights on the evidence branch, with the spread as a finding; a pull request's newer push cancels its run, a draft runs no lane, and the lookup names every run it read (INC-1314); the browser libraries install from the distribution's own sources (INC-1323, DEC-487).
