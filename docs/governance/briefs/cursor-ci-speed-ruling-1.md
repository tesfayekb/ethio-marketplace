RULING — cursor-ci-speed, stop 1: the code-step wait leaves the mint and no factor is added; no plan job; INC-1314 needs no wait; then parts A to D in one go. Base: cursor/ci-speed 5cfe8b0c2

**MODEL — Claude Opus 5.5 (High), in the SAME Cursor chat.**

Save this ruling as `docs/governance/briefs/cursor-ci-speed-ruling-1.md` (new), by scripted copy (sha256 in `expected.txt`).

PREVENTION (G70)

- Class (S822, mine): the GO stated two premises as facts that nobody had measured.
  - Premise (i), "the auth server refuses a second use of a code in its step", came from a comment in our own helper and from INC-620's record. No refusal was ever measured, and the vendor's source at the pinned tag keeps no record of a used step. Your census read it there.
  - Premise (iv), "the lookup reads the run and does not count it", was written without the run's times. The run it read was still running at the lookup (17:07:41Z) and finished at 17:18:18Z.
  - The plan-first step caught both before any code, so they cost no build. An earlier GO had the same class (S565), so this one gets a guard and not a note:
    - Repository: changed. The GO template's `premises` item gains this sentence: "a vendor's or a platform's behaviour is answered from its source or documentation at the pinned version, or from a measured run with its id and line; a comment in our code is not a source". A check-go law beside it requires every listed premise to carry `SOURCE:` or `OPEN:`. Both land in Cursor 8c's first part, beside S817's and S821's laws. In this turn, the comments and the harness document that state the refusal are corrected (decision 1).
    - Instructions: changed, in force now. A GO states an outside system's behaviour as fact only with its citation; otherwise it is a premise for the census. A run whose lanes line reads `skipped: draft pull request` judges nothing: the judged run is the ready head's.
    - Cursor rules: not needed. Rule 00 already opens a stop's pull request as a draft, marks it ready at the final push, and pushes the report after the judged run.
    - Knowledge: not needed.
- Class 2: a wait joined a shared helper on a belief, and the staff specs ran 3.01 times slower (your measure) with nothing to say so. The standing checks are CF-HELPERS-11 (decision 1) and the measured-spread finding (decision 3).

DECISIONS

1. Part A, the mint (Q1; DEC-488). The several-factors design is withdrawn. The wait leaves the mint, and nothing is enrolled.
   - Why: the server CI pins keeps no record of a used step, and before bundle 6 the pool minted with no wait. The wait guards nothing. More factors per account would add auth calls, a second secret beside the dialog's and a new global-setup check, for no gain.
   - `untilUnusedStep` and `stepsUsed` leave `e2e/helpers/ui.ts`. `aal2Session` makes its first challenge and verify at once.
   - Nothing else in the mint changes: the fresh challenge for each attempt, the attempts and the pause between them, DEC-480's challenge retry, the `aal2` check and the minted line.
   - A refused verify attempt prints one line: `[e2e:pool] <label> verify refused on attempt <n>: <the refusal's text>`. It holds no code, secret or token. Today a refusal that a retry heals leaves no trace.
   - The comments that state the refusal as fact say what you read instead: in `e2e/helpers/ui.ts` (at the mint, at its retry and at `afterTotpStep`) and in `docs/features/e2e-harness.md`.
   - `e2e/global-setup.ts`, the two enrolment bodies and `declareStaffFactor` are not touched. F2 is INC-1326, for Cursor 8c.
   - `afterTotpStep` and its callers stay as they are (the second half of Q1). F1 is INC-1325, for Cursor 8c: they cost little, and a wrong removal would cost more.
   - Guard: CF-HELPERS-11 in `scripts/conformance/e2e-helpers.test.ts`. The node mint holds no wait before its first verify request: no timer and no sleeping helper between the function's start and that request. Planted case: `aal2Session`'s text at `5cfe8b0c2`, cut by script, is refused. The GO's planned unit test of the factor choice is withdrawn with the design it tested.
   - DEC-488's judge, frozen now: over the ten completed runs on dev after the merge, a staff sign-in that fails after its last attempt with the server's invalid-code answer, on two of them, brings a wait back as the retry's pause (to the next step), never before the first verify.

2. Part A, INC-1324 (Q2). Your reading is accepted as the cause to fix: the header shows signed out before the store is cleared, and the helper writes into that gap.
   - The law: no helper writes a session into a page whose sign-out is still in flight. After a sign-out through the screen and before the write, the helper waits until the page's stored session is gone. That is a poll in the page with its own failure text, never a sleep.
   - Where it sits is yours (DECIDE-AND-NAME): an option of `signOutViaUi` whose default stays as it is (a shared helper never changes its default), or a named wait beside the store's key in `e2e/helpers/session.ts`. `signInStaff` uses it.
   - Guard: CF-HELPERS-12 in the same census. An `e2e/` file that calls `signOutViaUi` and writes a session into a page uses the wait. Planted case: `e2e/helpers/staff-factor.ts` at `5cfe8b0c2`.
   - Evidence, because the artifacts kept no trace this time: when `signInStaff` finds no session after its write, the failure carries `[staff-dump]` lines. They say whether the store's key is present, whether the page shows the account menu or the sign-in link, and the page's address. No token, secret or e-mail address.
   - STAFF-E4 in `e2e/staff-gate.spec.ts` is approved as the red-first. Show it failing once on the base helper (the old code written into place from `git show`, then put back from a copy) and passing with the fix, by id on the local temporary backend. CI's repeat lane proves the passing side on the final push; no local repeat.
   - If STAFF-E4 cannot be shown red on the base helper, land no timing test: land the wait with a positive control (G38) and say so in §10.
   - INC-1324 is then FIXED (watched). It closes after ten completed runs on dev with no failure of this kind from `signInStaff`; a second one reopens it with the dump's lines.

3. Part B, the lane plan. Approved without the plan job.
   - Why no plan job: a job that installs and lists before any lane starts is a new single point of failure for every lane, and it starts the lanes later than today, while your measure (v) shows the limit already full.
   - The weights are read once a run, at one evidence commit, in the job the lanes already wait for (`backend-images`), and handed to the lanes as a job output. Each lane writes that one copy to a file and computes its plan as today, with its own `--list`; `scripts/ci/lane-plan.ts` takes the file by an argument. The repeat lane's budget reads the same copy. Every lane then plans from the same weights and the same commit's list, so every lane computes the same plan.
   - No install step joins that job: the read and the choice use what the runner image carries. If the choice cannot be made there without an install, a job of its own with no install (checkout, the read, the output) is the alternative; name it under §10.
   - The read can never fail the run. A fetch that fails, no file, an empty output, or a file `parseWeights` refuses all end at the committed `scripts/ci/lane-weights.json`, and the plan line names the source and the reason.
   - The read runs under `scripts/ci/with-deadline.sh` and uses the run's own read token, so it still works when the repository is private (DEC-116).
   - The choice: among the weights files under `docs/tracking/` at that evidence commit, the one from the newest run.
   - The reporter writes the weights only from a run whose merged verdict is green and whose numbered lanes all completed with their results. A red run's times carry its timeouts. The existing publisher carries the file; `scripts/publish-evidence.sh` is not changed.
   - The measured-spread judge is a finding line in the run's summary and in the failure file. It never changes a verdict.
   - The committed weights file and LWM-2 stay as they are.

4. Part C, the pushes (Q3, Q4, Q5).
   - (a) as designed: a pull request's newer push cancels its run in progress; dev's queue stays (DEC-181).
   - (b) as designed, with one addition: the draft answer exists only for a `pull_request` event. A push never takes it, whatever the environment holds, and `scripts/ci/pr-runs.test.ts` (new) proves that too.
   - Q4: the bundle budget skips with the lanes on a draft, so `scripts/check-promote-needs.sh` stays untouched.
   - Q5: the text is `skipped: draft pull request`, confirmed. I read the status reporter's `skipped — ` test at this base.
   - (c) is your third option (Q3). INC-1314's record is corrected: the lookup counted correctly, and its candidate was still running. Nothing waits, no job is added and no timeout is raised. What (c) builds:
     - The `ran` line says what it read: for each run read, its id and whether it was green, not green or still running. The next reader then sees the cause in the line.
     - One pinned test with the 8a stop-1 case, from the API reads you captured, proves that a running candidate proves nothing and is named. It needs no red-first: there is no defect.
     - Every test and fixture that asserts the old line's text changes with it, named under §5.
   - F5 is accepted as a limit and named under §12. Rule 00's order (the report's push after the judged run) is what prevents it.

5. Part D, the browser libraries. Approved as designed, with these conditions:
   - The script's own apt file and its scratch directory are removed on every exit (a trap), and a leftover from an earlier attempt is overwritten, never an error.
   - The test proves both are gone after a success and after a failure.
   - No file the runner image owns is edited or deleted.

6. Q6: `scripts/conformance/wired.test.ts` joins the scope for the lines that name this turn's new tests (K3). Nothing else in it changes.

SCOPE, narrowed to the plan
- Part A: `e2e/helpers/ui.ts`, `e2e/helpers/staff-factor.ts`, `e2e/helpers/session.ts`, `e2e/staff-gate.spec.ts` (STAFF-E4 only), `scripts/conformance/e2e-helpers.test.ts` with its planted fixtures under `scripts/fixtures/`, `docs/features/e2e-harness.md`. Not `e2e/global-setup.ts`, and no other spec.
- Part B: the lane plan and the lane weights under `scripts/ci/` with their tests (`scripts/ci/lane-weights.test.ts`, `scripts/conformance/lanes.test.ts`), `scripts/e2e-failure-report.ts`, `scripts/e2e-failure-report.test.ts`, `.github/workflows/local-backend-proof.yml`, `.github/workflows/ci.yml`, their fixtures under `scripts/fixtures/`.
- Part C: `.github/workflows/ci.yml`, `scripts/ci/docs-only.ts`, `scripts/ci/docs-only.test.ts`, `scripts/fixtures/docs-only/`, `scripts/ci/pr-runs.test.ts` (new), `scripts/e2e-failure-report.ts` with its test.
- Part D: `scripts/ci/install-browser-deps.sh`, `scripts/ci/install-browser-deps.test.ts`, its captured fixtures under `scripts/fixtures/`.
- Everywhere: `scripts/conformance/wired.test.ts` (decision 6), `docs/features/` and the records files.
- A mechanical edit that a standing conformance guard demands as a consequence of this turn's own change is in scope wherever it falls, byte for byte, named under §10.

TEST IDS (checked free at `5cfe8b0c2`): CF-HELPERS-11 and CF-HELPERS-12; STAFF-E4; CF-DOCS-12 onward; CF-LANES-7 onward; LWM-3 onward; CF-INSTALL-8 onward; CF-PRRUN-1 onward for `scripts/ci/pr-runs.test.ts`.

STEPS, amended
- STEP 2's commit: `cursor-ci-speed part A: staff sign-ins without the code-step wait`.
- STEP 3's commit: `cursor-ci-speed part B: lanes planned from measured times`.
- STEP 6's browser run, by id, once, on the local temporary backend: STAFF-E1, STAFF-E2, STAFF-E4, AL-31, LGA-21, and `e2e/mfa-stepup.spec.ts` whole. CI proves the rest.
- This ruling plans no further stop. Everything it leaves open is yours to decide and name. A STOP is for a red whose failure names a path this turn changed, a security hole, or a file no clause of the scope reaches.
- STEP 7 stands: one push, then `gh pr ready`. With (b) in the tree, the push's own run on the draft runs no lanes, and the ready run is the judged one.

TOLERANCES, amended
- The GO's second tolerance now reads: a node mint that waits before its first verify request is a defect.
- The rest stand.

RECORDS (for §14, word for word; the numbers are assigned here)
- DEC-488 (2026-11-27; the supervisor under G17, on the operator's word "make sure we dont get failures and dont spend more time and cursor credits"): the node mint of a staff session makes its first verify at once. The code-step wait bundle 6 added (`untilUnusedStep`) is removed, and the GO's several-factors design is withdrawn. supabase/auth v2.197.0, the image CI pins, keeps no record of a used code step (`verifyTOTPFactor`), and the pool minted without a wait before bundle 6. Judge, frozen before the result: over the ten completed runs on dev after the merge, a staff sign-in that fails after its last attempt with the server's invalid-code answer, on two of them, brings a wait back as the retry's pause, never before the first verify.
- INC-1314, corrected: the lookup counted correctly; the run it read (45859549094) was still running. Closed by DEC-486 (b); the `ran` line now names what it read.
- INC-1323: fixed (part D).
- INC-1324: its cause and its fix (part A), in one line each; FIXED (watched) as decision 2 says.
- INC-1325: `afterTotpStep` (`e2e/helpers/ui.ts`) and its spec callers wait a code step for a refusal the pinned auth server does not make (the CI-speed census, F1). OPEN, Cursor 8c: removed with a by-id proof, or kept with its reason.
- INC-1326: two node enrolment bodies, `enrolFactor` (`e2e/helpers/staff-factor.ts`) and `mintPooledSuperAdmin` (`e2e/global-setup.ts`); K2 (the census, F2). OPEN, Cursor 8c.
- INC-1327: LGA-21 (`e2e/legal-admin.spec.ts`) passed only on retry on 25, 26 and 27 Nov, with a different first line each time (runs 45527306417, 45736662097, 45935486979). OPEN (watched): §11 says which of the three part A's two changes cover, from artifacts you already hold or "not read"; judged on the ten runs on dev after the merge.
- INC-1328: SAP-1 at webkit-390 (`e2e/sage-ad-page.spec.ts`) passed only on retry on 21, 23, 24 and 27 Nov. OPEN, Cursor 8c.
- F3 (the other spec files' times rose since 13 Nov) is recorded with §3's per-file table; no incident.
- DEC-485, DEC-486 and DEC-487: cited. The register rows of the mechanisms: amended. One changelog line.
