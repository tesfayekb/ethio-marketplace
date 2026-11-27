STOP — cursor-ci-speed STEP 1: the census (PLAN FIRST)
DONE: STEP 0 (brief saved, sha256 592c16cdba6220c02df7533c0e7ebff55c9b3c59f0d27cbe038c52cf1dab97f1 equal to the carrier's; roadmap line 3; check-go "[check-go] no finding"), STEP 1 (this census)
LEFT: parts A, B, C, D; steps 5a → 8
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `32f68bb9685485b4df91e17a97cb215e7c864e77` (short `32f68bb`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-27T15:25:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46023270935
FILES:
docs/governance/briefs/cursor-ci-speed.md
roadmap.md
docs/governance/reports/cursor-ci-speed.stop-1.md

The questions for ruling 1 are at the end (Q1 → Q6). Everything else below is decided and named.

## Orientation

- `<BASE>` = `<HEAD>` = `32f68bb9685485b4df91e17a97cb215e7c864e77`; no anchor is stale. `git status --short` was
  empty before the switch. Lane: `cursor/ci-speed`.
- Dev's run on the base, 46023270935: completed, SUCCESS; its lanes were skipped because run 46000329861
  (pull_request, `cursor/bundle-8b`, head `6ab3ae3`) proved the same code tree. No red to fix first.
- `briefs-allowlist.txt` held no keyed line, so STEP 0 removed none.
- Evidence read: root `ci-status.md`, `e2e-last-failure.md` and `flake-ledger.md` on `origin/ci-evidence`; the job
  logs and the `local-proof-14`, `e2e-log-14` and `e2e-results-14` artifacts of runs 45915473124, 45928742041 and
  46000329861; every `e2e-results-*` artifact of runs 46000329861 and 45929211475; the scope job log of run
  45864957571; Lane 10's attempt-1 log of run 46000329861; the job timings of runs 45929211475 and 46000329861.
  Scratch copies sit under `/tmp/ethio-scratch/cursor-ci-speed/` (the operator's to remove).
- The vendor's source was read at its tag, not from memory: supabase/auth `v2.197.0` (the GoTrue image CI pins,
  `public.ecr.aws/supabase/gotrue:v2.197.0` in the lanes' `IMAGES_LIST`) files `internal/api/mfa.go`,
  `internal/conf/configuration.go`, `internal/models/factor.go` and `internal/models/user.go`, and `mfa.go` at the
  latest release `v2.199.0`. GitHub's own pages: "Events that trigger workflows" and "Webhook events and payloads".

## premises

- (i) THE AUTH SERVER DOES NOT REFUSE A SECOND USE OF A TOTP CODE IN ITS STEP. OPEN: the brief and the repository
  (INC-620's class rule 3; `e2e/helpers/ui.ts:974-975` and `:1204-1212`; `docs/features/e2e-harness.md:567`)
  say it does. What I read: `verifyTOTPFactor` (mfa.go v2.197.0, lines 600-700) validates the code with
  `totp.ValidateCustom(..., {Period: 30, Skew: 1, ...})` and records no step or code; the only single-use object
  is the CHALLENGE (`validateChallenge`, mfa.go:552: `challenge.VerifiedAt != nil` refuses it). An MFA
  verification hook could refuse, but none is configured (`scripts/ci/local-backend-config.toml` has only
  `[auth.hook.before_user_created]`; no migration names one). `v2.199.0` has the same verify. No record I found
  measured such a refusal: INC-620's red was the retired stamp (S207), and bundle 6's commit `38467e91a`
  added `untilUnusedStep` on that class rule. So `untilUnusedStep` (ui.ts:941-945) waits for a refusal that
  CI's server never makes. Not read: ethio-staging's auth version (rule 50: no connection outside the tests).
- (ii) The per-account factor limit on CI's temporary backend: `max_enrolled_factors = 10`
  (`scripts/ci/local-backend-config.toml:110`); the server's `MaxVerifiedFactors` defaults to 10
  (configuration.go:214-215). `validateFactors` (mfa.go:100-135) also refuses a new factor when the account
  already has a verified factor and the enrolling session is not aal2, and refuses a friendly name the account
  already holds. Both constrain any multi-factor design (the staff helper's fixed name `staff-test-factor`,
  staff-factor.ts:80, would collide).
- (iii) GitHub: "By default, a workflow only runs when a `pull_request` event's activity type is `opened`,
  `synchronize`, or `reopened`. To trigger workflows by different activity types, use the `types` keyword";
  `ready_for_review` is a `pull_request` activity type ("A draft pull request was marked as ready for review").
  The pull request object carries `draft` (boolean); read live on pull request 117:
  `{"draft":false,"number":117,"state":"closed"}`. The workflow reads it as `github.event.pull_request.draft`.
  Nothing in the repository reads draft state today (rg over `.github`, `scripts`, `src`, `e2e`, `.cursor/rules`).
- (iv) INC-1314. OPEN: the lookup did not miss a COMPLETED green run. Run 45864957571's scope job printed
  `DEC-365 lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-67da3113b363…
  (1 read)` at 17:07:41Z. The one run it read was 45859549094 (push, dev, `70df931`), whose verdict job completed
  at 17:18:05Z and the run at 17:18:18Z. At the lookup it was still running, and `decide` skips a run whose
  `status !== "completed"` (scripts/ci/docs-only.ts:228-229), as CF-DOCS-8 asserts ("a … running … run proves
  nothing"). Reproduced by the API reads (artifacts list of `code-tree-67da3113…`: runs 45864957571 and
  45859549094; run 45859549094's job times). A red-first test of "a completed green run is not counted" cannot be
  written: the code counts that run today. Q3 asks what (c) builds.
- (v) The run's concurrent-job limit, measured from run 45929211475's job start times: 20. At +41 s, 20 jobs were
  running; Lane 16 (+53 s) waited 16 s; Lane 11 started at +152 s as Build ended (+149 s); Lane 9 at +173 s as
  Semgrep ended (+171 s); Lane 3 at +236 s as the e-mail lane ended (+233 s). The run has 39 jobs.
- (vi) INC-1324's cause: the staff helper's own timing, not a 401. In each of the three runs the failed attempt
  is the SECOND `signInStaff(page, buyer)` of AL-31 (`e2e/admin-listings.spec.ts:2155` → `holder` :2121 →
  `signInStaff` staff-factor.ts:171 → `assertInjectedIdentity`), the only one made on a signed-in page. That call
  mints session B in node, then `signOutViaUi` (ui.ts:490-508), then writes B into the store and reloads. The shell
  shows the signed-out header as soon as `signingOut` is set (`isAuthenticated: user !== null && !signingOut`,
  src/components/app-shell.tsx:933), which is BEFORE `await signOut()` (app-shell.tsx:717) has sent `/logout` and
  supabase-js has removed the stored session. `signOutViaUi`'s three waits (the URL `/`, already true; no
  account menu; the sign-in link) can therefore all pass while the sign-out is in flight; the helper writes B,
  and the sign-out's late removal deletes it; the reload then holds no session. Evidence that no server refusal
  removed it: each run's auth capture counts only `GET /user -> 200` (233 in run 45915473124), no 401 or 403 on
  `/user`; the six `POST /token -> 400` appear in all three runs alike. The cause is in `e2e/`, not `src/`. The
  removal's timing was not observed directly: the artifacts keep no trace. The fix and its red-first are in the
  design below (Q2).
- (vii) INC-1323, run 46000329861 attempt 1, Lane 10 (job 140510205274), step 31 "Install Chromium's system
  libraries": the line naming the 403 is
  `E: Failed to fetch https://packages.microsoft.com/ubuntu/24.04/prod/dists/noble/InRelease  403  Forbidden [IP: 13.107.246.40 443]`;
  the line that stops apt is
  `E: The repository 'https://packages.microsoft.com/ubuntu/24.04/prod noble InRelease' is no longer signed.`;
  the script then printed `the install failed (exit 1) after apt's fetch stage — final, never run twice (DEC-276)`.
  The install is `bunx playwright install-deps`, which runs `apt-get update` and `apt-get install -y
  --no-install-recommends …` under `sudo -- sh -c` (node_modules/playwright-core/lib/server/registry/
  dependencies.js:100-137), so an `APT_CONFIG` variable would not survive `sudo`.
- Before the change (measured, two workers, the summed duration of every attempt):
  - Run 46000329861 (the base's code tree): numbered lanes 761 → 2,527 s, mean 1,582 s. Lane seconds:
    1=1385 2=1125 3=873 4=761 5=1783 6=2222 7=1943 8=1489 9=861 10=2133 11=2527 12=1724 13=1225 14=2036 15=1789
    16=1443; smoke 404, webkit 601, repeat 897, email 19. The planned mean is 793 s at one worker, so the measured
    largest lane is 1.60 times the measured mean.
  - Run 45929211475: lanes 827 → 2,499 s, mean 1,638 s; wall from the first job created to the last ended
    1,948 s (32.5 min); Lane 11 was the long pole (+152 s → +1,896 s).
  - Staff-spec time (the 56 spec files that call `signInStaff`, `asStaff`, `staffSession` or
    `signInJobSuperAdmin`): 20,093 s now against 6,682 s in the committed weights of 13 Nov, 3.01 times. The
    other files the weights hold: 7,114 s against 6,001 s, 1.19 times (run 45929211475: 3.01 and 1.22). So
    "every other spec was unchanged" holds only roughly: they also rose by a fifth. The heaviest staff files now:
    admin-listings 1,573 s (262 then), admin-categories-lifecycle 1,378 (217), admin-screening 1,264 (241),
    legal-admin 1,247 (123), admin-translations-console 1,140 (263), admin-attributes-import 1,037 (118),
    admin-attributes-library 1,019 (349), admin-attributes-links 959 (254), admin-attributes-editor 919 (211),
    admin-locations 875 (270). The full per-file table goes into the report's §3 with the after.
  - Of the three AL-31 failures, the failed attempts took 19.9 s, 24.9 s and 24.0 s and their passing retries
    30.7 s, 31.2 s and 30.9 s: the retries' second mint waited for the next code window.

## consumers (by definition)

Concern 1 — a test that signs a staff account in through a node-minted aal2 session:
- The mint: `aal2Session` e2e/helpers/ui.ts:962 (uses `untilUnusedStep` :941 and `stepsUsed` :936).
- Its two callers: `freshAal2Session` ui.ts:1044 (the pool: `signInJobSuperAdmin` ui.ts:1114) and `staffSession`
  staff-factor.ts:118 (under `asStaff` :133 and `signInStaff` :151). `declareStaffFactor` staff-factor.ts:59.
- The pool's factors: `mintPooledSuperAdmin` e2e/global-setup.ts:299-412 (one factor a slot; it asserts EXACTLY
  one verified TOTP factor, :387-400).
- Spec callers (files : calls): signInStaff/asStaff/staffSession/declareStaffFactor in 36 spec files (ad-page-doors 1,
  admin-attributes-editor 1, admin-attributes-import 1, admin-attributes-library 2, admin-audit 2,
  admin-categories-console 6, admin-categories-lifecycle 1, admin-countries 1, admin-guides 1, admin-listings 11,
  admin-locations 3, admin-monetisation 2, admin-roles 2, admin-screening 5, admin-shell 6,
  admin-translations-console 1, admin-users 15, auth-caller-gates 1, auth-signout 5, category-image-routes 2,
  door-refusals 1, i18n-coverage 2, import-security 1, legal-admin 7, legal-doors 5, menu-rows 1, mfa-stepup 4,
  my-listings-doors 1, one-line-slots-admin 1, one-line-slots 1, rbac 1, shell-table-law 1, shell 2, staff-gate 1,
  submenu 1) and `e2e/helpers/failure-crawl-tests.ts` 1; signInJobSuperAdmin/pooledSuperAdmin in 41 files
  (listed by `rg -c` in the census run) and `scripts/e2e-leases.test.ts` 2. All USE the mechanism; none mints
  its own aal2 session.
- Readers of the "spent step" premise (they wait for the next step before typing a code into the step-up
  dialog): `afterTotpStep` ui.ts:1213 and its callers mfa-stepup.spec.ts:114, :310, :437; staff-gate.spec.ts:51;
  admin-listings.spec.ts:1870; admin-monetisation.spec.ts:1414; admin-translations-console.spec.ts:334.
- The browser's step-up answers with the account's FIRST verified factor: `stepUpWithCode`
  src/features/auth/mfa/mfa-service.ts:312-318 (`factors.factors[0]`), so the secret a helper returns for the
  step-up dialog must be that factor's.
- Sign-out then inject (INC-1324's class): only `signInStaff` (staff-factor.ts:155-169) writes a session right
  after `signOutViaUi`. `switchUser` (ui.ts:673-703) signs back in through the form, whose sign-in waits for its
  own commit (`awaitSessionCommit`, src/features/auth/auth-service.ts:196). Other `signOutViaUi` callers
  (admin-roles 1, auth-reset 1, auth-signout 5, feed-screens 1, i18n-sign-in-language 1, settings 2, shell 2,
  smoke-auth-i18n 1, viewing-place 1, ui.ts 2) assert the signed-out page, not a following injection.
- Bypasses (K2): two node enrolment bodies, `enrolFactor` staff-factor.ts:75-90 and the pool's own
  `mintPooledSuperAdmin` global-setup.ts:343-375 (enrol → challenge → verify). `mintPrivateSuperAdmin`
  ui.ts:888 enrols through the UI on purpose (`@private-identity`, the real door).

Concern 2 — the lane plan:
- `scripts/ci/lane-plan.ts` (planLanes, repeatBudget, laneLine, planLine), `scripts/ci/lane-weights.ts`
  (weightsFrom, parseWeights, WEIGHTS_FILE), `scripts/ci/lane-weights.json` (run 43431755160, 2026-11-13).
- Readers of the weights file (rg `lane-weights` over scripts, .github, e2e, src): lane-plan.ts:5/:24/:210,
  lane-weights.ts, lane-weights.test.ts:3/:66 (LWM-2 asserts the committed source is run 43431755160),
  scripts/conformance/lanes.test.ts:24/:35, scripts/conformance/wired.test.ts:569-585 (asserts the text
  "CF-LANES-3", "LWM-2" and that local-backend-proof.yml contains "scripts/ci/lane-plan.ts").
- The plan's callers: local-backend-proof.yml:244-245 (the repeat budget, `--repeat-budget`) and :884-890 (each
  numbered lane computes the plan, `--lane "$PROOF_LANE"`, then `--test-list`); the lane's evidence lines
  PLAN_LINE / PLAN_SUMMARY (:887, :977).
- The per-file times: `timingSection` / `testTimings` in scripts/e2e-failure-report.ts:1004-1076.

Concern 3 — which pushes run the browser lanes:
- ci.yml: triggers :7-16 (push to dev; pull_request to dev, default types), `concurrency` :31-33
  (`cancel-in-progress: false` for every ref, DEC-181), `scope` :51-86 (docs-only.ts; uploads `code-tree-<id>`),
  `bundle-budget` :408-412, `e2e-lanes` :594-604 (`if: ${{ !cancelled() && needs.scope.outputs.docs_only !=
  'true' }}`), the verdict `e2e` :606-798 (E2E_DOCS_ONLY, the Verdict step :772-798), `promote` :809-879.
- scripts/ci/docs-only.ts (isRecord, codeTreeId, lanesGreen :174, decide :207, skippedLine :202,
  SKIPPED_PREFIX :29, LANE_JOB :31, VERDICT_JOB :33).
- Readers of the scope's line: scripts/e2e-failure-report.ts:36/:1555/:1625-1631 (SKIPPED_PREFIX), and
  .github/workflows/ci-status-report.yml:45-75 (outside scope; it reads `DEC-365 lanes:` and treats a line that
  starts with `skipped — ` as a proven tree). A line `skipped: draft pull request` does NOT start with that
  prefix, so the status file prints `- Lanes: skipped: draft pull request` and the lane rows plain `skipped`,
  with no change to that file.
- scripts/check-promote-needs.sh (outside scope) requires `e2e-lanes`' `if:` to be exactly
  `!cancelled() && needs.scope.outputs.docs_only != 'true'`; a draft condition added there would fail it. The
  design below routes the draft decision through `scope`, so that form stays.
- Rule 00 step 5 / step 9: a stop opens the pull request as a draft; the final push is followed by
  `gh pr ready`.

Concern 4 — the browser's system libraries:
- `scripts/ci/install-browser-deps.sh` and its callers: local-backend-proof.yml:813 (in scope);
  guard-proof.yml:51, flake-check.yml:89, nightly-e2e.yml:117 and :352 (outside scope; they call the same script,
  so they gain the fix with no edit). Guards: scripts/ci/install-browser-deps.test.ts (CF-INSTALL-*),
  scripts/conformance/ci-deadlines.test.ts:26-61/:396-511, wired.test.ts:500-503.

## definition

The counts above are by definition (every caller of the helper, every reader of the file or line), not by
folder. A count would differ for concern 1 if "staff specs" were taken by name (`admin-*.spec.ts`: 25 files)
instead of by the helper they call (56 spec files by the four entry points); the measurement uses the
definition.

## tests

- staff-factor.ts and aal2Session: no unit test today (rg over src/ and scripts/ for staff-factor, aal2Session,
  untilUnusedStep finds only the census `scripts/conformance/e2e-helpers.test.ts`, which names the helpers in its
  list at :26/:73). `src/test/staff-factor-choice.test.ts` is new; the id prefix `SFC-` is free (rg over src,
  scripts, e2e).
- e2e: staff-gate.spec.ts (STAFF-E1, STAFF-E2), mfa-stepup.spec.ts, admin-listings.spec.ts (AL-31) for the by-id run.
- lane-plan / lane-weights: scripts/conformance/lanes.test.ts (CF-LANES-1 → 6), scripts/ci/lane-weights.test.ts
  (LWM-1/2), scripts/conformance/repeat-lane.test.ts (RPL-1 → 3, CF-CID-10).
- docs-only.ts: scripts/ci/docs-only.test.ts (CF-DOCS-1 → 11), fixtures under scripts/fixtures/docs-only/.
- e2e-failure-report.ts: scripts/e2e-failure-report.test.ts.
- install-browser-deps.sh: scripts/ci/install-browser-deps.test.ts, fixtures scripts/fixtures/install-deps-*.txt.

## lists

- Allowlists: `scripts/conformance/lanes-allowlist.txt` (CF-LANES-2), `scripts/conformance/non-null-allowlist.txt`
  (no file may gain a `!`), the e2e helpers' census list (e2e-helpers.test.ts:73).
- Workflow tests: ci-deadlines.test.ts (every outside call in a workflow under `with-deadline.sh`; a new plan job's
  checkout, install and evidence fetch must carry deadlines), repeat-lane.test.ts CF-CID-10 ("every list that
  reads lanes equals the lane matrix" — the plan job's output keys must equal the matrix's numbered lanes),
  check-promote-needs.sh (promote's needs list in ci.yml; the plan job lives in local-backend-proof.yml and is not
  in it), docs-only.test.ts.
- wired.test.ts:569-585 asserts strings that stay true (local-backend-proof.yml keeps "scripts/ci/lane-plan.ts").
  A new guard file is discovered by test:unit's `scripts/**/*.test.ts`; Q6 asks for wired.test.ts in scope
  only if the supervisor wants the new workflow test named there.
- Exact-list assertions over job names: none over the reusable workflow's job names; `LANE_JOB = "E2E lanes /
  Lane "` (docs-only.ts:31) counts a job as a lane by that prefix, so the plan job's name must not start with
  "Lane ". ci-status-report.yml `docsSkippable` matches `E2E lanes / ` (any job under it).

## old-file-readers

Not applicable: no file is moved or renamed. The committed `scripts/ci/lane-weights.json` stays (the fallback).

## second-readers

Not planned. After the grep: the new evidence weights file has one reader, the plan job; the draft flag has one
reader, docs-only.ts through `scope`.

## chunk-graph, environments, first-download, callee-codes, gate-reach, user-cases

Not applicable: `src/` does not change; no build option, door, gate, route or component changes.

## mechanisms (read whole before this plan)

`aal2Session`, `staffSession` / `signInStaff` / `asStaff`, `mintPooledSuperAdmin`, `injectSession` /
`assertInjectedIdentity` (e2e/helpers/session.ts:276-335), `signOutViaUi`, `afterTotpStep`; lane-plan.ts and
lane-weights.ts whole; docs-only.ts whole; ci.yml's scope, e2e-lanes, e2e and promote jobs; the proof workflow's
plan and repeat-budget steps; install-browser-deps.sh whole; publish-evidence.sh's path mapping (only the flake
ledger publishes at the root for every ref; any other file of a pull-request run lands under
`branches/<ref>/`).

## findings

- F1 (premise i): the code-window wait guards a refusal CI's auth server does not make; seven spec sites wait
  up to a step each for it (the `afterTotpStep` callers above), and the comments at ui.ts:974-975,
  ui.ts:1008-1009, ui.ts:1204-1212 and e2e-harness.md:567 state it as fact.
- F2 (K2): two node enrolment bodies (staff-factor.ts:75-90, global-setup.ts:343-375).
- F3: the other spec files also rose 1.19-1.22 times since 13 Nov (above).
- F4 (flake ledger, three or more in seven days, no open incident): LGA-21 (legal-admin.spec.ts, 25, 26 and 27 Nov;
  a staff spec) and SAP-1 at 390 (sage-ad-page.spec.ts, webkit-390, 21, 23, 24 and 27 Nov). AL-31's three are
  INC-1324.
- F5: under (a), a records-only push to a READY pull request whose code run is still running cancels that run,
  and (c) then finds no completed run, so the lanes run again. Rule 00 orders the report push after every check is
  green, so the lane's own flow does not meet it; a stop's push goes to a draft.
- F6: this stop's own push runs every lane: the draft rule (b) does not exist on the base's ci.yml, which the
  pull request's first run uses.

## queued

rg `ci-speed`, `INC-1314`, `INC-1311`, `INC-1323`, `INC-1324`, `lane-weights` over briefs, reports, features and
roadmap.md: INC-1314 — built here (part C (c), on Q3); INC-1323 — built here (part D); INC-1324 — built here
(part A); INC-1311 — left with Cursor 8c (cursor-bundle-8a-ruling-2.md:36); `lane-weights` — the speed turn's and
8a/8b's records of the committed file, all built; e2e-harness.md:618-666 and ci-local-backend.md:668 describe the
committed weights and are updated in STEP 5a.

## the design

Concern 1 (the brief's design, adjusted to what the source says). Each staff account carries FOUR verified TOTP
factors: one "browser" factor and three "node" factors (5 would also fit the limit of 10). The browser factor is
the first verified factor the app's own list gives (`GET /user`, the read `stepUpWithCode` makes); its secret is
the one `signInStaff` / `signInJobSuperAdmin` return for the step-up dialog, and node mints never use it, so a
mint never spends the code the dialog will type. Node mints pick, per account, the node factor whose last
accepted step (this worker's memory, as `stepsUsed` today) is not the current step, least recently used first;
only when all three were used in the current step does a mint wait for the next step, and it prints
`[e2e:pool] <label> waited <n> s for a code step: every factor used in step <s>`. Enrolment, in ONE node helper
shared by the pool and the staff helper (closing F2): enrol factor 1 on the password grant, verify (aal2), then
enrol factors 2-4 with that aal2 token (the server refuses an aal1 enrolment once a factor is verified), each
with a distinct friendly name (`e2e-<process>-<n>`). The pool's slots enrol their four in `global-setup.ts`
(its check becomes "exactly four verified TOTP factors"); a leased staff account enrols its four once per borrower
in the worker (as today's one), and a declared factor (`declareStaffFactor`, from a Settings enrolment) stays a
one-factor account that waits as today. The aal2 check (`aal=aal2` on the minted token, and `expectAal2` in the
page) is unchanged. INC-1324's fix, separate from the factors: `signInStaff` waits after `signOutViaUi` until
the page's stored session is gone (a poll of `storageKey()` in the page, never a sleep) before it writes the new
one. Red-first: a by-id e2e test that holds the page's `/auth/v1/logout` answer for two seconds through
`whilePageLives` and signs the same staff account in twice fails on the base helper with "page holds no session"
and passes with the wait.

Alternative the premise opens (Q1): since CI's server accepts a code again in its step with a fresh challenge,
the wait can simply leave the mint: `aal2Session` keeps its fresh challenge per attempt and its three attempts,
drops `untilUnusedStep`, and the guard test proves that N mints of one factor in one step wait for nothing. No
extra factor is enrolled (each extra factor costs three auth calls a slot in global setup and a borrower in the
worker). The brief's guard clause "they never present a code twice" would then not hold, by design.

Concern 2. The weights on the evidence branch: `lane-weights.json`, the same shape `parseWeights` reads
(source {run, date, lanes}, files → project → {seconds, tests}), written by `scripts/e2e-failure-report.ts` in
the merged `e2e` job when all sixteen numbered lanes completed and every one carried a results.json, and
published by the existing publisher with the run's evidence (dev at `docs/tracking/lane-weights.json`, a pull
request's under `docs/tracking/branches/<ref>/lane-weights.json`; the publisher is not changed). One new job in
local-backend-proof.yml, `plan` (name "Plan the lanes (DEC-375 b)", so it is never counted as a lane by
`LANE_JOB`), parallel to `backend-images`: it fetches `ci-evidence` once under `with-deadline.sh`, pins that
commit, reads every `lane-weights.json` under `docs/tracking/` there and takes the one with the highest
`source.run` that parses; when none parses it uses the committed `scripts/ci/lane-weights.json`. It runs
`playwright test --list` once, computes the plan, and gives the lanes job outputs: a JSON object lane → file list,
the repeat budget, and the plan line, which now names its source (`weights from run <id> (<date>), evidence
<sha7>` or `weights from the committed file (fallback: <reason>)`). Each numbered lane writes its list from
`needs.plan.outputs` and runs it with `--test-list`; the repeat lane takes the budget. Cost: one more job (40 a
run). It runs while the 20-job limit is already full, and the lanes start after it rather than after
`backend-images` (14 s in run 45929211475); each lane stops running its own `--list` and plan. Guard: CF-LANES-2
gains the measured-spread judge (lane-plan.ts exports it): the reporter compares each lane's measured seconds with
the measured mean, and a lane over it by more than `SPREAD_LIMIT` with no file alone in it is a line in the run's
summary and in e2e-last-failure.md; planted case: the 13 Nov weights planned against run 46000329861's measured
results (captured by script, cut to the fixture) is named.

Concern 3. (a) ci.yml's concurrency keeps one group per ref and sets `cancel-in-progress: ${{ github.event_name
== 'pull_request' }}`: dev's runs queue as DEC-181 says, a pull request's newer push cancels its run in progress.
(b) `pull_request.types: [opened, synchronize, reopened, ready_for_review]`; `scope` passes
`github.event.pull_request.draft` to docs-only.ts, and `decide` answers, before any lookup, `docs_only=true` with
the line `skipped: draft pull request` for a draft pull request (no code-tree index is uploaded, so a draft run
never proves a tree; `lanesGreen` would refuse it anyway, its lanes being skipped). `e2e-lanes` and
`bundle-budget` keep their exact `if:`; the verdict prints `Lanes: skipped: draft pull request` and passes; the
status file prints `- Lanes: skipped: draft pull request` with plain `skipped` rows (its "proven tree" form is
only for `skipped — `); e2e-failure-report.ts writes "ran no lanes — skipped: draft pull request" and never a
green report. Marking ready runs the lanes on the head (a new `ready_for_review` run, which cancels the draft's
run by (a)). `bundle-budget` is not a browser lane but sits behind the same output: Q4. (c) as ruled on Q3. Guard:
`scripts/ci/pr-runs.test.ts` (new; docs-only.test.ts is already 394 lines): it reads ci.yml and fails if the
pull-request concurrency stops cancelling, if dev's starts cancelling, if `ready_for_review` leaves the types,
if a draft's decision runs a numbered lane, or if a ready one skips it; docs-only.test.ts gains the draft cases
and INC-1314's case.

Concern 4. install-browser-deps.sh, before the install, copies the distribution's own source file
(`ubuntu.sources`, after the mirror probe and drop) into a scratch directory and writes ONE apt configuration file
of its own, `$root/etc/apt/apt.conf.d/99ci-browser-deps-sources`, with `Dir::Etc::sourceparts "<scratch>";`
(the distribution's main `sources.list` stays as it is), so `apt-get update` and `install` under `sudo` read only
those sources; the file and the scratch directory are removed on exit (a trap), so later apt steps of the job see
the runner as it was. No runner file is edited or deleted. Red-first: the test's fake `bunx` answers with the
captured 403 output (cut by script from run 46000329861 attempt 1, Lane 10's step 31) when a third-party list
such as `microsoft-prod.list` is visible to apt under `INSTALL_DEPS_ROOT`, and with the captured success
otherwise; the base script fails, the fixed one passes.

## Questions for ruling 1

- Q1 (premise i): build the brief's multi-factor design (several factors per staff account), or remove the
  code-window wait from the mint because CI's auth server does not refuse a reused code? And may the seven
  `afterTotpStep` waits in the specs (F1) stay as they are (the brief allows a spec edit only where its sign-in
  call changes)?
- Q2 (INC-1324): the fix is in `e2e/helpers/staff-factor.ts` (in scope). Its red-first is a NEW e2e test (in
  `e2e/staff-gate.spec.ts`, id `STAFF-E4`, free by grep: E1 → E3 are taken), which the brief's "a spec is edited only where its sign-in call
  changes" does not cover: may I add it, or is a positive control in the unit test enough (G38)?
- Q3 (INC-1314, premise iv): the lookup counted correctly; the run it read was still running. Which do you rule:
  (c1) `scope` waits for a running candidate to finish before deciding (this raises the scope job's
  `timeout-minutes: 10`, ci.yml:55, which the tolerances forbid without a ruling); (c2) a new job between `scope`
  and `e2e-lanes` waits under its own deadline only when a candidate is running; or (c3) INC-1314 is closed by (b)
  (that push was a stop's, now a draft), and (c) adds only the running-candidate case as a pinned test with no
  behaviour change?
- Q4: on a draft, `bundle-budget` also skips under the shared `docs_only` output. Keep it so (one decision, and
  check-promote-needs.sh's exact form unchanged), or must it run on drafts (which needs check-promote-needs.sh in
  scope)?
- Q5: the brief writes the draft line as "skipped: draft pull request". With that exact text the status reporter
  needs no change (it reads only `skipped — `). Confirm the text.
- Q6: wired.test.ts is outside scope; the new `scripts/ci/pr-runs.test.ts` and `src/test/staff-factor-choice.test.ts`
  are found by test:unit's globs without it. Add wired.test.ts lines anyway (scope it), or leave it?
