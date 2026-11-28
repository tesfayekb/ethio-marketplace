CURSOR BUNDLE 8c-2a — one enrolment body for the tests' staff factor (INC-1326); the repeat lane planned in measured seconds (INC-1333, INC-1311); the scratch legal chain made and removed by one helper, and the sweeps that miss error reports and legal documents (INC-1334). Base: dev 3c9086dc0

Stem: `cursor-bundle-8c-2a` (brief `docs/governance/briefs/cursor-bundle-8c-2a.md` (new); report `docs/governance/reports/cursor-bundle-8c-2a.report.md` (new)). Tier A (the browser-test harness enrols staff factors and holds the service role; the repeat lane judges every push). FLAGS: no-migration, no-new-string, no-package-change, no-agents-change. NO PLANNING STOP (DEC-492 (4)): the supervisor ran the census on its own clone of 3c9086dc0 and it is written into STEP 1 below. You check the facts STEP 1 names, write what you find into the report's §2, and build straight on. You stop only when one of STEP 1's premises is wrong.

**MODEL — Claude Sonnet 5.5, in a NEW Cursor chat.**

THE ORDER (DEC-499, the supervisor's, G17, overridable; it amends DEC-494): Cursor 8c-2 is two lanes, because a Cursor lane carries at most three fixes. This lane, 8c-2a, carries three fixes, and nothing joins it after this GO. It touches no file under `src/`, so it runs beside Lovable's lane UF-1 (component tests and four screen files, all under `src/`, plus line removals in `scripts/conformance/user-facing-allowlist.txt`, which `scripts/conformance/user-facing.test.ts` reads). Cursor 8c-2b follows after UF-1 merges. It carries: the guards that judged wrong (INC-1338, INC-1339); the twin locator (INC-1336); the feed test's mock (INC-1313); the provider-errors fixture (INC-1320); WebKit (INC-1328, DEC-483); S830's law; and DEC-498 in the list's document. INC-1325's removal of `afterTotpStep` waits for DEC-488's judge, which reads the ten completed dev runs after the CI-speed merge; two had completed at this GO. Cursor 8c-3 keeps the browser tests for the list's remaining rows, with INC-1310's class guard, INC-1335 and INC-1337.

PREVENTION (G70 — three classes recurred):
- (1) A second body for one act of the harness (INC-1326; INC-1336 follows in 8c-2b).
- (2) A CI time plan that does not read the measured weights (INC-1311, then INC-1333 — the second occurrence, so this lane lands its guard).
- (3) A table a test seeds that no residue sweep removes (INC-1334).
- Repository: Part A lands CF-HELPERS-13; Part B lands CF-LANES-8 and RPL-4; Part C lands CF-HELPERS-14 and the two sweeps, and writes the census of every table a test seeds in the report's §13.
- Instructions: not needed — G0.3 already asks for a census by definition. The supervisor's own record of "five" legal copies was a partial count; the census finds nine (S833).
- Cursor rules: not needed.
- Knowledge: not needed (no Lovable path).

THE SYSTEM (G0) — fix A: the staff factor in tests
CONCERN: a test's staff factor is enrolled by one body, and the harness's comments say what the pinned auth server does.
MECHANISM: NONE YET as one body. The enrolment is built in Part A beside `authFetch` in `e2e/global-setup.ts`, which `e2e/helpers/staff-factor.ts` already imports. Its shape is the one in `e2e/helpers/staff-factor.ts` (it narrows the answer and has no cast).
CONSUMERS (grep of 3c9086dc0 for `"/factors"` and the enrolment's `factor_type` body):
  - `e2e/helpers/staff-factor.ts` line 78 (`enrolFactor`) — bypasses (a body of its own).
  - `mintPooledSuperAdmin` in `e2e/global-setup.ts`, its enrolment at line 343 — bypasses (a second body, with a cast on `totp`).
COVERED HERE:
  - INC-1326: both callers use the one enrolment body.
  - The comments that still say a factor accepts each code once are corrected: `e2e/helpers/totp.ts` line 29, `e2e/staff-gate.spec.ts` line 69 and `e2e/mfa-stepup.spec.ts` line 58. They say what DEC-488 recorded from the pinned server's source: only a challenge is single-use, and `afterTotpStep` stays until DEC-488's judge has read its ten runs (INC-1325).
  - LEFT: the removal of `afterTotpStep` and its seven calls (INC-1325, Cursor 8c-2b at the earliest).
CONFORMANCE GUARD: `scripts/conformance/e2e-helpers.test.ts` — CF-HELPERS-13 (new): no e2e file but `e2e/global-setup.ts` posts the factor enrolment (`"/factors"` with the TOTP factor type). Planted: the base text of `enrolFactor`. `scripts/conformance/wired.test.ts` names it.
EXCEPTIONS: none.
FIVE LENSES — security: the secret is read once and never printed; the error text names no secret · performance: none · failure modes: an answer with no id or secret throws with the caller's label · consistency: one enrolment for the pool and for scratch staff · future growth: a third caller imports it.
FORWARD-SCAN: Stage 2's staff queue tests enrol through it. REGISTER: the staff helper's row (`e2e/helpers/staff-factor.ts`), amended.

THE SYSTEM (G0) — fix B: the repeat lane's plan in measured seconds
CONCERN: every time plan CI makes reads the measured seconds of each spec file and project (DEC-375 b), and the repeat lane's plan is one of them.
MECHANISM: the lane plan `scripts/ci/lane-plan.ts` with the run's weights, read by `chooseWeights` (shape `Weight` at `scripts/ci/lane-weights.ts` line 22: seconds and tests per file and project). The repeat budget is already `repeatBudget` there (`scripts/ci/lane-plan.ts` line 189).
CONSUMERS:
  - The select step of the repeat lane in `.github/workflows/local-backend-proof.yml`: the literal `REPEAT_SECONDS_PER_TEST=4.7` at line 265, which bypasses the weights; `repeatPlan` called at line 311; the lines it writes at 332, 338 and 342; the time-cap line at 878; the readers at 1076 and 1296.
  - `repeatPlan` (`scripts/e2e-select.ts` line 651), with `REPEAT_MIN_EACH` and `REPEAT_MAX_EACH`, and its test RPL-3 in `scripts/conformance/repeat-lane.test.ts`.
  - The readers of the lines: `REPEAT_SUMMARY` (`scripts/e2e-failure-report.ts` line 1621), `TIME_CAP_LINE` (`scripts/e2e-failure-report.ts` line 1619), `repeatLines` (`scripts/e2e-failure-report.ts` line 1629) and its self-tests; `scripts/ci/repeat-cap.ts` with `scripts/ci/repeat-cap.test.ts`; the captured fixture `scripts/fixtures/local-backend-repeat.43144538685.txt`, read by `scripts/e2e-failure-report.test.ts` and `scripts/ci/lane-failure-evidence.test.ts`.
COVERED HERE:
  - INC-1333 and INC-1311, as one plan:
    - A test's cost is its file's measured seconds in that project divided by its tests there, for each project the list shows it in.
    - A file or project the weights lack costs the weights' median seconds per test, computed from the same weights and named on the summary line. No literal seconds remain in the workflow.
    - The plan fits its chosen tests, at `each` repetitions, within the budget on that cost.
    - When a spec does not fit whole, its tests whose ids stand on lines the push added or changed in any changed file under `e2e/` (spec or helper) are chosen first, by `--grep` of their ids, through the one id reader (`idsIn`, `scripts/test-ids.ts`). The rest are written as `- Not repeated:` lines. A changed crawl row is then repeated without its whole spec.
    - Every existing line keeps its grammar, so the captured fixture stays true and `REPEAT_SUMMARY` reads it unchanged. The summary's "at <x> s a test" carries the plan's measured mean cost per repeated test. A new kind of line takes a new prefix, and the two readers that list prefixes (lines 1076 and 1296) learn it.
CONFORMANCE GUARD: `scripts/conformance/lanes.test.ts` and `scripts/conformance/repeat-lane.test.ts`:
  - `scripts/conformance/lanes.test.ts` — CF-LANES-8 (new): the repeat lane's select step holds no literal seconds per test. Planted: the base's line 265.
  - `scripts/conformance/repeat-lane.test.ts` — RPL-4 (new): given a captured list (I1: `playwright test --list` output for the 8c-1 merge's changed specs at 3c9086dc0) and the newest weights copy on the evidence branch (docs/tracking/branches/cursor/bundle-8c-1/lane-weights.json, source run 46081846257, sha256 539169ec7171a7d794a675ce4501c5cbfe89f84622bb121eae19601339db8212), the plan stays within the budget. It repeats by id the tests the push's changed lines name, and writes a `- Not repeated:` line for each spec too large.
  - RPL-3 is re-pointed to the new plan; the report says how.
  - `scripts/conformance/wired.test.ts` names both.
EXCEPTIONS: none.
FIVE LENSES — security: none (CI planning; no secret is read) · performance: the lane ends within its budget instead of at Playwright's global timeout · failure modes: a weights copy that does not parse falls back as `chooseWeights` already does, and the line says so; a test id the id reader cannot find is written as not repeated, never dropped silently · consistency: one weights source for the sixteen lanes and the repeat lane · future growth: a new slow spec is costed by its own measurement on its next green run.
FORWARD-SCAN: every later spec, crawl rows included. REGISTER: the lane plan's row (DEC-375 b), amended: the repeat plan joins it.

THE SYSTEM (G0) — fix C: scratch rows made by one helper and swept when a run dies
CONCERN: a test's scratch legal document is made and removed through one helper, and every scratch row a dead run leaves is removed by the shard-1 setup's sweep (DEC-036's three-hour window).
MECHANISM: NONE YET for the legal chain — built in Part C as `e2e/helpers/legal-scratch.ts` (new), to J1 and J3: the kinds carry the scratch prefix, every delete throws on failure, and the helper refuses a kind without the prefix. The sweeps are the shard-1 setup's reaping section in `e2e/global-setup.ts` ("Reap the fixture graveyard", the `cutoff` of three hours), over the prefixes of `e2e/helpers/scratch.ts`.
CONSUMERS — every e2e file that inserts into `legal_documents` or `legal_versions`, or deletes the chain by document or version (grep of 3c9086dc0):
  - COUNT: 9 := rg -l -U -e 'from\("legal_documents"\)\s*\n?\s*\.insert' -e 'from\("legal_documents"\)\s*\n?\s*\.delete' -e 'from\("legal_versions"\)\s*\n?\s*\.insert' -e 'from\("legal_versions"\)\s*\n?\s*\.delete' e2e | wc -l
  - `e2e/legal-admin.spec.ts`, `e2e/legal-accept.spec.ts`, `e2e/auth-signup.spec.ts`, `e2e/auth-caller-gates.spec.ts`, `e2e/helpers/crawl-fixtures.ts`, `e2e/legal-history.spec.ts`, `e2e/legal-pages.spec.ts`, `e2e/legal-certify.spec.ts`, `e2e/legal-doors.spec.ts` — each bypasses with its own seed and destroy.
  - Their destroys differ: `e2e/auth-caller-gates.spec.ts` removes versions and documents but no notices, and relies on removing acceptances by user. The foreign keys are RESTRICT (`supabase/migrations/20261019063500_1bb93282-5a6f-4557-b00b-781967b410c6.sql`, the versions' document key and the acceptances' and notices' version keys).
  - Error reports: `e2e/admin-errors.spec.ts` (ERB-1, ERB-2) and `e2e/error-reports.spec.ts` seed `error_reports`, and no sweep removes them (their comments at `e2e/admin-errors.spec.ts` line 26 and `e2e/error-reports.spec.ts` line 25 say so).
COVERED HERE:
  - The legal chain: all nine files seed and destroy through the helper. Each test keeps its kinds, its version fields and its assertions byte for byte. Acceptance inserts that are a test's subject stay in their tests; the helper's destroy removes them by version. Deletes of acceptances by user (pool reset, `e2e/helpers/users.ts`) are not the chain and stay.
  - INC-1334, widened (G41) to the legal chain:
    - The shard-1 setup sweeps scratch legal documents (kind with the scratch prefix, `created_at` older than the cutoff) through the helper's destroy.
    - It also sweeps `error_reports` rows whose message carries the two specs' scratch tags (`SCRATCH_PREFIXES.dash` with `erb` or `erep`) and whose `created_at` is older than the cutoff. It never reads `seen_at`: ERB-1 dates its rows three days back.
    - The two comments say the sweep now exists.
  - The class census: §13 lists every table an e2e file inserts or upserts into, with what removes a dead run's rows: a sweep, a key-scoped reaper, or nothing.
    - COUNT: 34 := rg -o --no-filename -U -e '\.from\("[a-z_]+"\)\s*\n?\s*\.insert' -e '\.from\("[a-z_]+"\)\s*\n?\s*\.upsert' e2e | rg -o '"[a-z_]+"' | sort -u | wc -l
    - A table with nothing is a finding with its number left to the supervisor (G71); it is not built here.
CONFORMANCE GUARD: `scripts/conformance/e2e-helpers.test.ts` — CF-HELPERS-14 (new): outside `e2e/helpers/legal-scratch.ts` (new), no e2e file inserts into or deletes from `legal_documents` or `legal_versions`, nor deletes `legal_acceptances` or `legal_notices` by version. Planted: the base text of the destroy in `e2e/legal-accept.spec.ts`. CF-HELPERS-6 (every scratch prefix swept) still passes. `scripts/conformance/wired.test.ts` names CF-HELPERS-14.
EXCEPTIONS: none.
FIVE LENSES — security: the helper refuses a real kind, so no test edits a real legal document (J3) · performance: none · failure modes: every delete throws with its phase; a sweep failure fails the setup loudly, as the other sweeps do · consistency: one order of deletion for nine files · future growth: a new legal test takes the helper; a new seeded table is on the §13 census.
FORWARD-SCAN: Stage 2's audit and queue tests seed through helpers and are swept. REGISTER: a new row — "a scratch legal document in tests" → `e2e/helpers/legal-scratch.ts` → CF-HELPERS-14 → exceptions: none; the reaper's row, amended (two tables).

SCOPE, by area (each source file's own tests included):
- `e2e/helpers/` (`staff-factor.ts`, `totp.ts`, `legal-scratch.ts` (new), `crawl-fixtures.ts`) and `e2e/global-setup.ts` (no unit test of its own: every browser run starts with it, and the guards in `scripts/conformance/e2e-helpers.test.ts` read it).
- The e2e specs: `e2e/staff-gate.spec.ts` and `e2e/mfa-stepup.spec.ts` for their comments only; the eight legal spec files named in fix C; `e2e/admin-errors.spec.ts` and `e2e/error-reports.spec.ts` for their comments only.
- `.github/workflows/local-backend-proof.yml`, the repeat lane's select step and the two readers of its lines only; `scripts/ci/` (`lane-plan.ts`, `lane-weights.ts`, `repeat-cap.ts`); `scripts/e2e-select.ts` with `scripts/e2e-select.test.ts`; `scripts/test-ids.ts` with `scripts/test-ids.test.ts`; `scripts/e2e-failure-report.ts` with `scripts/e2e-failure-report.test.ts`; `scripts/ci/lane-weights.test.ts` and `scripts/ci/repeat-cap.test.ts`; the captured fixtures under `scripts/fixtures/`.
- `scripts/conformance/` (`e2e-helpers.test.ts`, `e2e-helpers-allowlist.txt`, `lanes.test.ts`, `lanes-allowlist.txt`, `repeat-lane.test.ts`, `wired.test.ts`, `briefs-allowlist.txt` (read by `scripts/conformance/briefs.test.ts`)).
- `docs/features/` (`e2e-harness.md`, `ci-guards.md`); the records files.
- Never anything under `src/`, nor `scripts/conformance/user-facing-allowlist.txt` or `scripts/conformance/user-facing-manifest.txt`: they are Lovable's open lane, and `scripts/conformance/user-facing.test.ts` reads both.
Never `.claude/`, `CLAUDE.md`, `supabase/`, the locale files.

THE TURN, IN THIS ORDER
STEP 0 — on the lane:
- Fetch, then `git switch -c cursor/bundle-8c-2a origin/dev` with origin/dev at `3c9086dc0`. If dev has moved, say so in the report and build on the new dev, unless the move touches a file in SCOPE: that is a STOP.
- `git status --short` must be empty.
- Save this brief byte for byte as `docs/governance/briefs/cursor-bundle-8c-2a.md` (new; scripted copy, saved bare; sha256 equal to the carrier's). Write roadmap line 3 as rule 00 writes it.
- Remove from `scripts/conformance/briefs-allowlist.txt` (read by `scripts/conformance/briefs.test.ts`) every line keyed to a brief other than this one.
- Run `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-2a.md --root .` and paste its output into the report.
- Commit `cursor-bundle-8c-2a: task saved`; it is not pushed alone.
STEP 1 — THE CENSUS, run by the supervisor on 3c9086dc0. Check each fact a line names, and write what you find into the report's §2. A wrong premise is the turn's one STOP:
- CENSUS-ITEM consumers: covered — the consumer lists in THE SYSTEM A, B and C, by `rg -n "\"/factors\"" e2e`, `rg -n "REPEAT_SECONDS_PER_TEST|repeatPlan|Not repeated|REPEAT_SUMMARY" .github scripts`, and fix C's two COUNT lines.
- CENSUS-ITEM definition: covered — fix C is defined by the tables, not by the files first named: every insert into or delete from the two legal tables, and every delete of acceptances or notices by version.
- CENSUS-ITEM tests:
  - covered — fix A: the staff specs' tests are unchanged except for the three comments.
  - Fix B: RPL-1 to RPL-3 (`scripts/conformance/repeat-lane.test.ts`), CF-LANES-1 to 7 (`scripts/conformance/lanes.test.ts`), the repeat-cap tests, and `repeatLines`' self-tests in `scripts/e2e-failure-report.test.ts`.
  - Fix C: every test of the nine legal files, which keep their assertions byte for byte, and ERB-1, ERB-2 and the error-report specs.
- CENSUS-ITEM lists: covered — `scripts/conformance/wired.test.ts` (the new laws' lines); `COPIED_NAMES` (`scripts/conformance/e2e-helpers.test.ts` line 76), which the new helper's names join; the selector's groups in `scripts/e2e-select.ts` for the new helper (a changed helper selects its importers); the guards' register `docs/features/ci-guards.md`.
- CENSUS-ITEM old-file-readers: not applicable — no file moves or is deleted.
- CENSUS-ITEM second-readers: covered — the repeat lane's lines have five readers (workflow lines 1076 and 1296, `repeat-cap.ts`, `e2e-failure-report.ts`, and the captured fixture's two tests), all listed in THE SYSTEM B.
- CENSUS-ITEM chunk-graph: not applicable — no file under `src/` changes.
- CENSUS-ITEM environments: covered — the repeat lane runs only in CI. Locally, the plan is run on the captured list and weights.
- CENSUS-ITEM mechanisms: covered — `authFetch` (`e2e/global-setup.ts`); `chooseWeights`, `repeatBudget` and `planLanes` (`scripts/ci/lane-plan.ts`); the id reader `idsIn` (`scripts/test-ids.ts`); `repeatRanks` and `changedFiles` (`scripts/e2e-select.ts`, INC-967); `likePrefix` and `likeAnywhere` (`e2e/helpers/scratch.ts`); the setup's reaping section; `copyFindings` and its allowlist grammar (`scripts/conformance/e2e-helpers.test.ts`).
- CENSUS-ITEM first-download: not applicable — no file under `src/` changes.
- CENSUS-ITEM premises:
  - INC-1326 — SOURCE: `e2e/helpers/staff-factor.ts` line 78 and `e2e/global-setup.ts`'s enrolment at line 343 (two bodies, one with a cast). RED-FIRST: CF-HELPERS-13 against the base text.
  - INC-1333 — SOURCE: `.github/workflows/local-backend-proof.yml` line 265 and run 46081846257, lane repeat: its summary line planned every selected test at two repetitions on both projects for a budget of 841 s, and Playwright's global timeout (961 s) cut the run (the lane's own time-cap lines). RED-FIRST: RPL-4 against the base planner (`repeatPlan` at 4.7 s a test chooses every selected test).
  - INC-1311 — SOURCE: `docs/governance/reports/cursor-bundle-8a.report.md` lines 524 and 574 (run 45894289368: the budget held 5 of 7 changed crawl files and the cap left 76 test runs). RED-FIRST: RPL-4's crawl case against the base planner.
  - INC-1334 — SOURCE: `e2e/admin-errors.spec.ts` line 26 and `e2e/error-reports.spec.ts` line 25 (no sweep), and the setup's reaping section, which names no legal table. CONTROL: the setup's own reaped count on a local temporary backend after seeding one stale scratch row of each kind, pasted in §5.
  - INC-1325, its comments only — SOURCE: the three lines named in THE SYSTEM A. CONTROL: no test changes; the comments' new text matches `docs/features/e2e-harness.md` line 765.
  - The pinned auth server accepts a code again in its step with a fresh challenge — SOURCE: `docs/features/e2e-harness.md` line 765 (DEC-488, read from supabase/auth v2.197.0's `verifyTOTPFactor`). It is the comments' content only; nothing is removed on it here.
  - The measured cost per crawl test — SOURCE: the weights copy named in RPL-4. The crawl files run their pages on mobile-360 only: for example, failure-crawl-admin-content.spec.ts measured 606.2 s over its tests there and 0.7 s on desktop-1280, against a planned 4.7 s a test on both projects. The committed `scripts/ci/lane-weights.json` (source run 43431755160) is older. Write each crawl file's seconds and tests per project in §2.
- CENSUS-ITEM callee-codes: not applicable — no door changes.
- CENSUS-ITEM whole-app-calls: covered — no shared hook or component gains a side effect. The setup's two new sweeps delete only scratch rows older than three hours; the failure crawl's fixture seeds its legal version through the helper with the same fields.
- CENSUS-ITEM findings: write what you find beyond the task, with file and line, in §13. That includes the K2 siblings: the TOTP verify bodies (`e2e/global-setup.ts`'s proof verify, `aal2Session` and the client `challengeAndVerify` in `e2e/helpers/ui.ts`) and the seeded-table census. A security hole is a STOP at once, described in the chat only.
- CENSUS-ITEM gate-reach: not applicable — no gate changes.
- CENSUS-ITEM user-cases: not applicable — the turn changes no screen. The legal specs' user cases are unchanged, assertion for assertion.
- CENSUS-ITEM queued: covered — `rg -n "8c-2|INC-1325|INC-1326|INC-1311|INC-1333|INC-1334|legal seed"` across `docs/governance/briefs`, `docs/governance/reports`, `docs/features` and `roadmap.md`.
  - Built here: INC-1326, INC-1333, INC-1311, INC-1334 and the legal chain.
  - Left: INC-1325's removal (DEC-488's judge, then Cursor 8c-2b or later). `docs/governance/briefs/cursor-ci-speed-ruling-1.md` line 28 kept `afterTotpStep` until that evidence is in.
  - Left: INC-1313, INC-1320, INC-1328, DEC-483 and INC-1336 (Cursor 8c-2b).
STEP 2 — PART A: the one enrolment body and its two callers; the three comments; CF-HELPERS-13 (red-first against the base text). Commit `cursor-bundle-8c-2a part A: one enrolment body, true comments`.
STEP 3 — PART B: the plan in measured seconds, the select step's call, RPL-4 (red-first against the base planner) and CF-LANES-8; RPL-3 re-pointed; the two prefix readers if a new prefix is born. Capture the list by `bunx playwright test --list --reporter=json` at 3c9086dc0. Copy the weights file RPL-4 names by script from the evidence branch (`git show origin/ci-evidence:<path>`), its sha256 checked against the one RPL-4 names. Commit `cursor-bundle-8c-2a part B: the repeat plan reads measured seconds`.
STEP 4 — PART C: `e2e/helpers/legal-scratch.ts` (new) and the nine files onto it; the two sweeps; the two comments; CF-HELPERS-14 (red-first against the base text); the §13 census of seeded tables. Commit `cursor-bundle-8c-2a part C: one legal scratch helper, two more sweeps`.
STEP 5 — the docs lines: the harness (`docs/features/e2e-harness.md`: the enrolment body, the legal helper, the two sweeps, and the repeat plan's cost). Correct its sentence at line 765 that `afterTotpStep` stays, giving DEC-488's judge as the reason. Also the guards' register (`docs/features/ci-guards.md`). Commit.
STEP 6 — the checks:
- `bun run typecheck`; `bun run lint`; `bunx vitest run scripts --maxWorkers=2`; `bun run checks`.
- Each test file the turn changed, run alone (INC-1306).
- Against the local temporary backend (`E2E_LOCAL_BACKEND=1`): the nine legal files whole, both Chromium projects, 0 retries; and ERB-1 and ERB-2 by `--grep`.
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-2a.md --at <the commit STEP 0 began from>`, its output pasted.
- Then the self-review (rule 80), before the push.
STEP 7 — ONE push; `gh pr ready <number>`; `gh pr checks <number> --watch --interval 60`; green on the last code commit → the comment per rule 00.
STEP 8 — the report, written while CI runs:
- Rule 60's fourteen headings, with the census in §2.
- §3: the repeat plan on this push's own run — its summary line and the measured mean, against 4.7 s.
- §14 Records, word for word.
- Its push changes records only.

DECIDE-AND-NAME: the helpers' names and signatures; how the plan is split between `scripts/ci/lane-plan.ts` and `scripts/e2e-select.ts`; whether the WebKit pair's tests are costed by their Chromium measurement (the weights hold Chromium only) or by the median; the new prefix, if a new line is born. A mechanical edit a standing guard demands as a consequence of your own change is in scope wherever it falls, byte for byte, named under §10, unless the file is on SCOPE's never-list (then it is a STOP).

RECORDS (§14), word for word:
- "DEC-499 (the supervisor's, G17; it amends DEC-494) — Cursor 8c-2 is two lanes.
  - 8c-2a carries one enrolment body for the tests' staff factor (INC-1326), the repeat lane planned in measured seconds (INC-1333, INC-1311), and the scratch legal chain made and removed by one helper with the sweeps that miss error reports and legal documents (INC-1334). It touches no file under src/ and runs beside Lovable's UF-1.
  - 8c-2b follows UF-1's merge, with the guards that judged wrong (INC-1338, INC-1339), the twin locator (INC-1336), INC-1313, INC-1320, WebKit (INC-1328, DEC-483), S830's law and DEC-498 in the list's document.
  - INC-1325's removal of afterTotpStep waits for DEC-488's judge over ten dev runs.
  - Why: a Cursor lane carries at most three fixes, and a lane beside an open Lovable lane keeps out of its folders."
- INC-1326, INC-1333, INC-1311: fixed (what was built). INC-1334: fixed, widened to the scratch legal chain (what was built); the seeded-table census in §13.
- The register rows named in THE SYSTEM blocks; one changelog line.

TOLERANCES (G60), by defect:
- A red whose failure or server log names a path this lane changed is a STOP; any other is named under §11 and CI judges.
- A local failure is fixed at its cause, never retried or loosened; no dial and no timeout is raised.
- A legal test whose assertion would have to change is a STOP (behaviour-preserving move).
- The repeat lane on this lane's own push is CI's to judge: a lane capped by Playwright's global timeout on this push is a STOP; a plan that names specs as not repeated is the design.

FINDINGS (G64): anything major beyond this task goes in §13 with file and line; a security hole is a STOP at once, described in the chat only.

LIMITS TO STATE: WebKit, the repeat lane's real time and the merged tree are CI's and the supervisor's.
