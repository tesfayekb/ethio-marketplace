CI speed: staff sign-ins without the code-window wait, lanes planned from fresh measured times, full runs only where a verdict is due, and the browser libraries installed from the sources they need. Base: dev 32f68bb96

Stem: `cursor-ci-speed` (brief `docs/governance/briefs/cursor-ci-speed.md`, new at STEP 0; report `docs/governance/reports/cursor-ci-speed.report.md`, new at the end). Tier A (the test harness mints staff identities and their second factor; CI decides what proves a merge). FLAGS: no-migration, no-new-string, no-package-change, no-agents-change. PLAN FIRST: the census stops once, and no other stop is planned. The operator asked that this turn spend as little time and as few runs as it can, and that it leave no failure behind: every question the repository's laws or this brief answer is decided and named under §10 (DECIDE-AND-NAME), never asked.

**MODEL — Claude Opus 5.5 (High), in a NEW Cursor chat.**

PREVENTION (G70 — the turn fixes a recurrence): a run took about 32 minutes and a bundle paid six to eight of them (DEC-485, the operator's yes of 26 Nov 22:48 New York). Three measured causes, read on run 45929211475 and the ci-evidence history:
- Staff specs were 2.9 times slower than on 13 Nov; every other spec was unchanged. This came with Cursor bundle 6, whose helper waits for the next 30-second code window before a second sign-in of the same staff factor (`untilUnusedStep` in `e2e/helpers/ui.ts`).
- The lane plan read weights measured on 13 Nov (`scripts/ci/lane-weights.json`): the lanes' test seconds ran from 456 to 1540 against one plan of 793.
- Every push to a pull request runs every browser lane: stop pushes, review pushes and records-only pushes (INC-1314). A newer push waits behind the run in progress.
- Two more causes of re-runs, found on 27 Nov: the browser libraries' install failed twice in one day because a package source the runner image carries and the libraries do not need (packages.microsoft.com) answered 403 (INC-1323; DEC-487 overrides DEC-462's cache with this root-cause fix, the count restarted); and AL-31 lost its injected staff session three times in one day inside `signInStaff` (INC-1324).

The places a fix may live:
- Repository: this turn.
- Instructions: the supervisor reads per-file measured times before it calls a lane slow.
- Cursor rules: not needed (rule 00 already opens a stop's pull request as a draft and marks it ready at the final push).
- Knowledge: not needed (Lovable's pull requests are opened ready by the supervisor).

THE SYSTEM (G0) — 1. A staff sign-in in a test
CONCERN: every test that signs a staff account in gets a real aal2 session at once, without waiting for a code window and without sharing a session another test or worker can refresh away (INC-168, INC-169).
MECHANISM: `aal2Session` in `e2e/helpers/ui.ts` (the one node mint), fed by `e2e/helpers/staff-factor.ts` (`signInStaff`, `asStaff`, `staffSession`, `declareStaffFactor`) and by the pool's factors from `e2e/global-setup.ts`; the wait is `untilUnusedStep` in `e2e/helpers/ui.ts`.
CONSUMERS: every caller of `aal2Session`, `signInStaff`, `asStaff`, `staffSession` and the pool's fresh-session readers across `e2e/` and `scripts/` (the census lists them by file and marks each).
COVERED HERE: INC-1324 first: AL-31 passed only on retry three times on 27 Nov (runs 45915473124, 45928742041, 46000329861; flake ledger), each time `signInStaff` (`e2e/helpers/staff-factor.ts` line 171, `assertInjectedIdentity`) found no session right after injecting the staff session. The census reads the cause before any design: what removed the session (a 401 that drove the shell's ended-sign-in listener, `onUnauthorised` in `src/components/app-shell.tsx`, to `hardReset`; the helper's own timing; or another cause), from the lane logs and the code; the fix is at that cause in Part A, red-first when it can be reproduced, or with a positive control when it cannot (G38); a cause in `src/` is named in the census with its file, and ruling 1 rules its scope, so it costs no extra stop. Then the wait leaves the common path: a mint uses a factor whose last accepted code is not in the current step. The census reads how many factors an account may hold (`max_enrolled_factors = 10` in `scripts/ci/local-backend-config.toml`) and proposes the design in its plan: several factors per staff account, enrolled once per worker, a fresh session per sign-in, and the aal2 check unchanged.
CONFORMANCE GUARD: `src/test/staff-factor-choice.test.ts` (new), a unit test of the helper's factor choice (its ids grep-checked free), beside the e2e helpers' census `scripts/conformance/e2e-helpers.test.ts`: N mints of one account inside one code step wait for nothing while a factor is unused; they wait only when every factor of the account was used in that step, and they never present a code twice.
EXCEPTIONS: none.
FIVE LENSES — security: the session stays a real aal2 session, minted per sign-in; no factor check is weakened, no secret is printed, the factors are scratch factors of test accounts · performance: no staff sign-in waits for a code window in the common path · failure modes: a mint whose every factor was used in the step waits for the next step (today's behaviour) and says so in the run log · consistency: one mint (`aal2Session`) for the pool and the staff helper · future growth: more staff roles and more workers take more factors up to the server's limit.
FORWARD-SCAN: Stage 2's screening tests sign staff in through the same helper. REGISTER: the staff sign-in helper's row (cited by the census).

THE SYSTEM (G0) — 2. The lane plan
CONCERN: the browser lanes split the tests by what each file costs now, so no lane carries twice the mean.
MECHANISM: `scripts/ci/lane-plan.ts` with `scripts/ci/lane-weights.ts` and `scripts/ci/lane-weights.json`; each lane computes the plan in `.github/workflows/local-backend-proof.yml`; the per-file measured times are written by `scripts/e2e-failure-report.ts` (its "Spec file | Tests | Summed duration" table).
CONSUMERS: the plan step of every numbered lane, the repeat budget (`--repeat-budget`), `scripts/conformance/lanes.test.ts` (CF-LANES-1 → 3), `scripts/ci/lane-weights.test.ts`, and every reader of the weights file (the census greps its path across `scripts/`, `.github/`, `e2e/` and `src/`).
COVERED HERE:
- The weights come from the newest measured run: the reporter writes a machine-readable per-file, per-project weights file on the evidence branch, from a completed run whose numbered lanes all completed.
- One plan job reads it once per run, at a pinned evidence commit, and computes every lane's file list; each lane takes its own list from that job. Every lane then runs the same plan even if the evidence branch moves during the run.
- The committed weights file stays as the fallback when the evidence file is absent or does not parse; the run's plan line says which source it used.
- The census reads the cost of one more job against the run's concurrent-job limit (39 jobs per run today; lanes 11, 9 and 3 each started the moment an earlier job ended).
CONFORMANCE GUARD: `scripts/conformance/lanes.test.ts` — CF-LANES-2 also judges the MEASURED spread. The reporter compares each lane's measured test seconds with its planned share, and a lane over the mean by more than the spread limit, with no file alone in it, is a finding in the run's summary. Planted case: stale weights.
EXCEPTIONS: none.
FIVE LENSES — security: the plan job reads the evidence branch only; it writes nothing and holds no secret · performance: the slowest lane falls toward the mean · failure modes: an absent or broken evidence file falls back to the committed weights, named; a file with no weight is weighed by the median, as today · consistency: one plan per run · future growth: new spec files are weighed from their first completed run.
FORWARD-SCAN: every later spec file. REGISTER: the lane plan's row (DEC-375 b), amended by DEC-486.

THE SYSTEM (G0) — 3. Which pushes run the browser lanes
CONCERN: a full browser run happens where a verdict is due — the final push of a pull request, and dev — and nowhere else.
MECHANISM: `.github/workflows/ci.yml` (its triggers, its `concurrency`, the scope job) and `scripts/ci/docs-only.ts` (`isRecord`, `lanesGreen`, `decide`, the proven-tree lookup).
CONSUMERS: every job of `ci.yml` and `local-backend-proof.yml` that a skip affects, the merged verdict job, the promote job, the status reporter (`docs/tracking/branches/<ref>/ci-status.md`), `scripts/ci/docs-only.test.ts`, and rule 00's draft and ready steps.
COVERED HERE (DEC-486):
- (a) A newer push to a pull request cancels that pull request's run in progress. Pushes to dev keep DEC-181's queue: a run on dev that has started always finishes.
- (b) A push to a DRAFT pull request runs every job but the browser lanes. The skipped lanes and the merged verdict say "skipped: draft pull request". Marking the pull request ready (`ready_for_review`) runs the lanes on its head.
- (c) INC-1314: a records-only push whose code tree a completed green run already holds reuses that run's verdict. Today the lookup reads the run and does not count it. Red-first with the 8a stop-1 case.
CONFORMANCE GUARD: `scripts/ci/docs-only.test.ts` gains INC-1314's case. A workflow test (the census names the file that already reads `ci.yml`, or a new one) fails if the pull-request concurrency group stops cancelling, if dev's starts cancelling, if a draft pull request runs a numbered lane, or if a ready pull request skips one.
EXCEPTIONS: none.
FIVE LENSES — security: nothing merges without the lanes on the final head: a draft cannot be merged, and ready runs them · performance: a bundle pays one full run per final push, plus dev's run when dev moved · failure modes: a cancelled run reports "cancelled", never green; a draft's skip is never read as a pass by the reporter or the promote job · consistency: Cursor's and Lovable's pull requests are judged alike once ready · future growth: more lanes cost no extra runs.
FORWARD-SCAN: Lovable's pull requests are opened ready (unchanged). REGISTER: the CI evidence row (DEC-181 amended for pull requests, DEC-375 a).

THE SYSTEM (G0) — 4. The browser's system libraries
CONCERN: the browser's system libraries install from the package sources they need, so a source they do not need cannot fail a lane before its tests (INC-1323, DEC-487).
MECHANISM: `scripts/ci/install-browser-deps.sh` (every CI site installs them only there, CF-CID-1), with `scripts/ci/install-browser-deps.test.ts` and its captured fixtures under `scripts/fixtures/`.
CONSUMERS: every caller of the script in the two workflows (the census greps them) and `scripts/conformance/ci-deadlines.test.ts`.
COVERED HERE: the script's package update and install read only the distribution's own sources (the ones its mirror probe already handles); every other source list on the runner is left out of this install, by an apt option or a scratch sources directory, without editing or deleting a file the runner image owns. The probe, the deadline and the one retry stay as they are. The failure fixture is captured from run 46000329861's log (I1), never written by hand.
CONFORMANCE GUARD: `scripts/ci/install-browser-deps.test.ts` gains the case: a third-party source that answers 403, under `INSTALL_DEPS_ROOT`, does not stop the install; red-first against the base script.
EXCEPTIONS: none.
FIVE LENSES — security: no package source is trusted that was not before; nothing is unsigned or forced · performance: one fewer source fetched on every lane · failure modes: a distribution mirror that fails is handled as today; a third-party source can no longer fail the step · consistency: one install script · future growth: a future package that needs another source names it there, in one place.
FORWARD-SCAN: every browser a project adds (DEC-371). REGISTER: the CI install row (DEC-366, DEC-462 amended by DEC-487).

SCOPE, by area (the plan narrows it to files): `e2e/helpers/` (the staff sign-in, the pool's sessions) and `e2e/global-setup.ts`, with their unit tests under `src/test/` and `scripts/conformance/e2e-helpers.test.ts`, and the staff specs the census lists for a by-id run (`e2e/staff-gate.spec.ts` among them; a spec is edited only where its sign-in call changes); `scripts/ci/` (the plan, the weights, the proven-tree lookup, the browser libraries' install) with their tests, and their captured fixtures under `scripts/fixtures/`; `scripts/e2e-failure-report.ts` and its tests (`scripts/e2e-failure-report.test.ts`); `scripts/conformance/lanes.test.ts`; `.github/workflows/ci.yml` and `.github/workflows/local-backend-proof.yml`; `docs/features/` (the harness, CI, lanes); the records files. Read only: `supabase/`, `src/`. Never a path rule 00 forbids: `.claude/`, `CLAUDE.md`.

THE TURN, IN THIS ORDER
STEP 0 — on the lane `cursor/ci-speed` from dev: fetch, switch, `git status --short` empty. Dev's run on the base (run 46023270935) may still be running when you start; read it in STEP 1, and a red there is reported first, at its cause. Save this brief byte for byte as `docs/governance/briefs/cursor-ci-speed.md` (new; scripted copy, saved bare; sha256 equal to the carrier's). Roadmap line 3: `The brief in force: docs/governance/briefs/cursor-ci-speed.md (CI speed). Previous: ` + the line as it stands after "The brief in force: ". Remove from `scripts/conformance/briefs-allowlist.txt` every line keyed to a brief other than this one. Run `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-ci-speed.md` on the tree as saved and paste its output. Commit `cursor-ci-speed: task saved`; it is not pushed by itself.
STEP 1 — THE CENSUS (STOP at its end). Answer every item by its key word, or write "CENSUS-ITEM <key>: not applicable — <why>":
- consumers — for each of the three concerns, every consumer by its definition (file:line, uses or bypasses), including every reader of `scripts/ci/lane-weights.json` and of the draft or ready state.
- definition — the three concerns' consumers by definition, and where a COUNT would differ.
- tests — each consumer's own tests.
- lists — the allowlists, the workflow tests, `scripts/conformance/wired.test.ts`, exact-list assertions over job names.
- old-file-readers — every reader of a file this turn moves or renames (none is planned).
- second-readers — not planned; say so after the grep.
- chunk-graph — not applicable unless `src/` changes (it does not).
- environments — not applicable unless a build option changes (none is planned).
- mechanisms — the three mechanisms above, read whole before anything is proposed.
- first-download — not applicable: `src/` does not change.
- premises — every premise above. In particular, from the vendor's source or the repository's record, never from memory:
  - (i) whether the auth server refuses a second use of a TOTP code in the same step;
  - (ii) the auth server's per-account factor limit on CI's temporary backend;
  - (iii) GitHub's `pull_request` draft field and `ready_for_review` event as the workflow reads them;
  - (iv) why the INC-1314 lookup did not count the run it read, with the 8a stop-1 case reproduced;
  - (v) the run's concurrent-job limit, measured from run 45929211475's job start times;
  - (vi) INC-1324's cause, as concern 1 says;
  - (vii) INC-1323's failure, from run 46000329861 attempt 1, Lane 10, step 31's log (`gh run view --log` or the Actions API): the line that names the 403 and the one that stops apt.
  - Measure before the change: per-file summed staff-spec time and per-lane test seconds, from the newest completed dev run's evidence. A premise you find wrong is `OPEN:` with what you read.
- callee-codes — not applicable: no door changes.
- findings — beyond the task, file:line.
- gate-reach — not applicable: no gate changes.
- user-cases — not applicable: no route or component changes.
- queued — rg `ci-speed`, `INC-1314`, `INC-1311`, `INC-1323`, `INC-1324` and `lane-weights` across `docs/governance/briefs`, `docs/governance/reports`, `docs/features` and `roadmap.md`; each item marked built here or left (where). INC-1311 (crawl tests longer than the repeat budget) stays with Cursor 8c.
- the design of concern 1 in one paragraph: the factor set's size, where the factors are enrolled (the worker, global setup), how a mint picks one, what a mint does when every factor was used in the step, and what the pool's accounts carry.
Write the stop report `docs/governance/reports/cursor-ci-speed.stop-1.md` (new); STOP.
STEP 2 — Part A, the staff sign-in, as ruled. Its unit tests (red-first for "no wait while a factor is unused", against the base helper). Commit `cursor-ci-speed part A: staff sign-ins use an unused factor`.
STEP 3 — Part B, the lane plan, as ruled: the weights file on the evidence branch, the plan job, the lanes reading their lists, the measured-spread finding, the fallback. Its tests. Commit `cursor-ci-speed part B: one plan a run from measured times`.
STEP 4 — Part C, the pushes, as ruled: (a), (b) and (c), with their tests (INC-1314 red-first). Commit `cursor-ci-speed part C: full runs only where a verdict is due`.
STEP 5 — Part D, the browser libraries' install, as ruled, with its red-first case. Commit `cursor-ci-speed part D: browser libraries from the sources they need`.
STEP 5a — docs: `docs/features/` (the harness's staff sign-in, the lanes, CI's runs, the install). Commit.
STEP 6 — `bun run typecheck`; `bun run lint`; `bunx vitest run scripts --maxWorkers=2`; `bun run checks`; actionlint on the two workflows; the staff specs whose helper changed, by `--grep`, once against the local temporary backend (`E2E_LOCAL_BACKEND=1`); `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-ci-speed.md --at <the commit STEP 0 began from>` (its output pasted). Then the self-review (rule 80), before the push.
STEP 7 — ONE push, after the checks and the self-review; `gh pr ready <number>` (rule 00 step 9) is the turn's own proof of (b): its run runs the lanes. `gh pr checks <number> --watch --interval 60`.
STEP 8 — the report, written while CI runs: rule 60's headings. §3 carries the before and after:
- each lane's test seconds, and the run's wall time from created to verdict;
- the staff specs' summed time per file;
- the number of runs this lane's own pull request cost, from the Actions API.
§14 carries the records word for word. Its push changes records only and, with (c), reuses the judged run.

DECIDE-AND-NAME: the weights file's format and name on the evidence branch; the plan job's name and how lanes receive their list (job outputs or an artifact); the workflow test's file; job names, provided every name a reader asserts is updated with it and listed under §10.

RECORDS (for §14, unnumbered where the supervisor numbers them):
- INC-1314: fixed (part C (c)).
- INC-1323: fixed (part D).
- INC-1324: its cause and its fix (part A), in one line each.
- DEC-487: cited.
- DEC-485 and DEC-486: cited.
- The register rows of the three mechanisms: amended.
- One changelog line.

TOLERANCES (G60), by defect:
- A red whose failure or server log names a path this turn changed is a STOP.
- A staff sign-in that still waits for a code window while one of its account's factors is unused is a defect.
- A numbered lane over the measured mean by more than the spread limit, with no file alone in it, on this lane's own final run, is named under §11 with its files. It is not a STOP unless its cause is this turn's plan.
- A draft pull request that runs a numbered lane, or a ready one that skips it, is a defect.
- An install step that fails on a source the browser libraries do not need is a defect.
- AL-31, or any staff spec whose helper changed, that passes only on retry on this lane's final run is named under §11; it is a STOP only if its failure names a path this turn changed.
- A local failure is fixed at its cause, never retried or loosened. No dial and no timeout is raised.

FINDINGS (G64): anything major beyond this task goes in §13 with file:line; a security hole is a STOP at once, described in the chat only.

LIMITS TO STATE:
- The before and after of a run's wall time come from CI, never from a local run.
- The concurrent-job limit is measured from job start times, not quoted.
