RULING — speed, stop 1: the census — two workers (DEC-376), the proven tree's index, the weights, the serial lane. Base: cursor/speed 58257391c.

The census is accepted whole; its three questions are answered below, and its corrected line numbers stand. Build Parts A → D against this ruling; the brief is not rebuilt. Save this ruling by scripted copy, BARE, as `docs/governance/briefs/speed-ruling-1.md` (sha256 as the operator's line gives it) in Part A's commit, and name it in §10.

PREVENTION (G70). Root causes, as classes:
(1) The GO re-decided a frozen decision without reading it. It put two workers on the lanes and never named DEC-217, DEC-230 or AGENTS.md :31 (S599 in the supervisor's record; the second occurrence of the class — S332, 2026-10-20, proposed more shards before reading DEC-171). The supervisor's grep for the setting was case-sensitive (`workers`), so it missed `E2E_WORKERS: "1"` at local-backend-proof.yml :177 and wrote "unset". Guard, in code, this turn: CF-BRIEF-18 (item 6) — a GO that names a setting cites the newest decision that set it.
(2) Two premises about another system's data were written without a probe: what the Actions API says about a pull request's run, and what the Timing section holds. The census is the guard, and it worked in one stop. Template line (records turn): a GO that reads an outside system's data names the field it needs and the probe that showed it, or marks the premise OPEN for the census.
(3) The supervisor's estimate of CI time counted test time only. It left out each lane's fixed start and setup (about 195 s: the webkit job's proof step took 698 s for 503 s of tests on run 43355488221) and the three lanes outside the split — smoke (990 s), repeat (1,016 s) and webkit (698 s) — which bound the run's time whatever the sixteen do (S600). Item 4 brings them into the plan.
(4) Two rules outlived their cause (the class of DEC-374 itself). The smoke lane re-runs specs the sixteen lanes also run. And the `@global-state` tests are kept out of every per-push lane for a shared staging database that the lanes left at DEC-211 (INC-1135, item 5).
Repository: CF-BRIEF-18, the lane plan covering every lane, INC-1135's fix. Instructions: v1.18 — G40 gains "a GO that changes a setting on a closed surface cites the decision that set it"; G68's MAGNITUDE check names fixed overheads and every lane. Cursor rules: this turn's Part A and D. Knowledge: not needed. Stops this turn: 1.

1. Q1 — two workers: (a), under a new decision, DEC-376 (item 10). The operator's paste of this ruling is its approval; the reply that carried it put the override to him.
   - Workers: lanes 1 → 16, `webkit` and `repeat` run two; `email` and the serial lane (item 4) run one. The job-wide `E2E_WORKERS: "1"` (:177) becomes a value by lane, and CF-LANES-3 reads it.
   - AGENTS.md :31 joins the scope for its first clause only: "CI: 16 lanes by measured time, 2 workers each (email and the serial lane: 1; DEC-376);" — the rest of the line unchanged. Keep AGENTS.md inside its byte budget (AGL-2): reword this turn's lines within the bytes they hold where you can; where you cannot, the count in `scripts/conformance/agents-lines-allowlist.txt` follows with its reason, named in §10.
   - `playwright.config.ts` :45 → :48: the comment names DEC-376 beside DEC-024; its revert rule stands and is item 11's rule (b).
   - `docs/features/ci-local-backend.md` :658 → :664 and `e2e-harness.md` gain the new state (docs allowance).

2. Q2 — the proven tree: your design, with two changes.
   (a) The index is written by the scope job, not the summary job. When the scope job decides the lanes RUN, it uploads an artifact named `code-tree-<id>` (one small text file: the commit, the event, the ref; `overwrite: true`; `retention-days: 30`). `<id>` is `codeTreeId(GITHUB_SHA)`: the sha256 of the commit's `git ls-tree -r` lines with every `isRecord` path set aside — one function in `scripts/ci/docs-only.ts`. local-backend-proof.yml's summary job is not touched for this.
   (b) A flaky test does not refuse a reuse. The proof standard is the one `promote` uses today: the run completed with conclusion success, a lane job succeeded (the lanes ran, not skipped), and the verdict succeeded (`lanesGreen`, unchanged). A test that passed on retry is ledgered by the run that saw it. So the index carries no claim about the run's results; the API judges the run.
   The lookup, one rule for a merge, a docs-only push and a pull-request push:
   - The scope job computes its own `<id>` and reads `actions/artifacts?name=code-tree-<id>` (one read under `with-deadline.sh`).
   - Candidates are taken newest first, at most 5, never the run itself.
   - A candidate counts only when its run is this repository's (`head_repository_id == repository_id`), its workflow is `.github/workflows/ci.yml`, and `lanesGreen` holds.
   - The first that counts is reused. A failed read, a shape the parser does not know, or no candidate → the lanes run.
   - The first-parent walk and `WALK_BOUND` are retired.
   The line: `Lanes: skipped — the code tree was proven by run <id> (<event>, <ref>, head <sha7>)`; the "ran — …" forms as today, their reasons reworded to the new rule.
   The readers join the scope, in the same commit as the writer:
   - `.github/workflows/ci-status-report.yml` :71 matches the stable prefix `skipped — ` and marks the rows `skipped (proven tree)`.
   - `scripts/e2e-failure-report.ts` :1574 → :1590 takes its headline's reason from the line ("ran no lanes — the code tree was proven by run <id>"); its self-test :2432 follows.
   - `scripts/ci/turn-checks-allowlist.txt` :11's reason is brought up to date.
   The output names `docs_only` and `lanes` stay (about twenty readers; a rename changes no behaviour). The scope job's comment says what `docs_only` now means.
   Tests: CF-DOCS-1 and 4 stay; 2, 3, 5 and 6 are rewritten to the rule; new, from fixtures captured from the real API answers (G20):
   - CF-DOCS-7: a merge commit whose id equals a green pull-request run's is reused.
   - CF-DOCS-8: the same id held only by a cancelled, failed, still-running or lanes-skipped run, or by a fork's run, runs the lanes; an id that differs by one source file runs the lanes.
   - CF-DOCS-9: every read failure runs the lanes.
   - CF-DOCS-10: `codeTreeId` is the same across a record-only change and differs for a one-byte source change, a rename and a mode change; and the skipped line the writer makes is accepted by both readers (a planted mismatch fails).
   `ci-status-report.yml` runs from the default branch, so its new match is live after the merge; its proof in this turn is its self-test.

3. Q3 — the weights: yes, from a green dev run's `results.json` files, lanes 1 → 16 only (`gh run download <run> -p 'e2e-results-*'`; run 43431755160 on 203907b3d is green and inside the 7-day retention).
   - The weights file holds seconds and test count per spec file and project, the run id and its date. The maker is offline (it reads a folder of results); its unit test uses a small captured fixture.
   - The plan's unit is the SPEC FILE with both Chromium projects, as the lanes' command runs it. A per-project file list would need a second invocation or a config change, and no file is heavier than a lane's mean share: the heaviest, `shell.spec.ts`, is about 9.7 of 11.1 minutes.
   - The plan is deterministic and offline. Every spec file on disk that the lanes run is in exactly one lane's list. A file missing from the weights is weighed by the median file. A file heavier than the mean gets a lane to itself, and the summary names it.

4. The lanes outside the split. They bound the run's time, so the plan covers them (concern 3's consumers by definition; the supervisor's read of run 43355488221's lane table).
   - The `smoke` lane becomes THE SERIAL LANE; the name stays (every list that reads lanes keeps it — CF-CID-10). Today it re-runs `shell.spec.ts`, `auth-signout.spec.ts` and `smoke-auth-i18n.spec.ts`, which lanes 1 → 16 also run (the Timing section: `shell.spec.ts` "Ran in smoke, shard 8, shard 16"), for about 13 minutes of repeated tests. From this turn it runs only what no other lane runs: the `@a11y` tests (`e2e/a11y.spec.ts`) and the `@global-state` tests (item 5), one worker, on its own backend. Every test still runs on every push, once.
   - Before you remove a repeated test from this lane, read its readers (the reporter's accessibility section, the census of server errors, any rule that names the smoke source). If a reader needs a test in this source, the test stays here and leaves the sixteen lanes' lists. Name it in §10.
   - The `repeat` lane's budget is derived so that its job ends within the slowest planned lane's job. `REPEAT_SECONDS_PER_TEST` is re-measured at two workers on this turn's run. The summary prints the budget and the counts as today.
   - CF-LANES-1 reads: every test of `playwright test --list` over the Chromium projects runs in exactly one of {lanes 1 → 16, the serial lane}; the email project's file runs in the email lane. Planted: a file in no list, a file in two, a `@global-state` test in none.

5. INC-1135 — the `@global-state` tests on every push, by rule. They join the serial lane in Part C: `--grep "@a11y|@global-state" --workers=1`, both Chromium projects. On this turn's first run:
   - If they pass, they stay, and INC-1135 is FIXED.
   - If one fails for a cause in its own fixture that one module fixes, fix it in item 11's one commit.
   - Otherwise the lane goes back to `--grep "@a11y"` in that commit, CF-LANES-1 carries the `@global-state` tests as an allowlist line (reason; until INC-1135), and §13 holds the failure bodies. This is not a stop.
   The nightly's serial run is not changed.

6. CF-BRIEF-18 (prevention 1). SCOPE gains the GO checker's law file, its runner and `scripts/conformance/briefs.test.ts`, as CF-BRIEF-16 and 17 did.
   - The law: when a brief names, in a code span, a setting that appears as a key in `.github/workflows/` or in `playwright.config.ts` (an upper-case name with an underscore), and an entry of `docs/spec/spec-ledger.md` that begins with a decision's id names that setting, the brief cites the NEWEST such decision.
   - Planted: a brief naming `E2E_WORKERS` without DEC-230 is a finding ("names E2E_WORKERS; its newest decision is DEC-230").
   - The brief in force names `E2E_WORKERS` without it. It is saved byte for byte and is not edited: it takes a line in `scripts/conformance/briefs-allowlist.txt` (the law was born from this brief's own miss; until the next brief's STEP 0), and STEP 6's `check-go` then prints that one expected line.
   - `docs/governance/go-template.md` gains one sentence beside its premises line: "a setting the task changes is named with the decision that set it".

7. Corrections to the brief's text (the brief stays as saved; the report's §10 names these).
   - DEC-374's sentence "the repeat lane repeating each changed spec" is wrong. The lane repeats the changed specs that fit its budget, directly changed specs first: the pictures run repeated 2 of 14 changed files. Item 10 carries the corrected text.
   - DEC-375's judge (c), "the median push to result is at most 12 minutes", was set from an estimate that left out the fixed overhead. DEC-376's judge replaces it (item 10).
   - ESTIMATE, replacing the brief's: push to result about 12 → 13 minutes at two workers (band 11 → 14); about 16 at one (band 14 → 18). The measurements supersede.

8. Findings, filed by the supervisor (change nothing for them beyond what this ruling names).
   - `e2e/global-setup.ts` :602's log text ("owner: shard 1") stays with the e2e leftovers turn (INC-1109's list).
   - The lanes' fixed start and setup is the next CI-time lever. §11 reports it by step for one lane (the seconds of each step from the job's own timings). The records turn writes the roadmap line.

9. SCOPE ADDITIONS (the approved list = the brief's plus):
   - `AGENTS.md` :31 (item 1);
   - `scripts/conformance/agents-lines-allowlist.txt` (only if the count must follow);
   - `.github/workflows/ci-status-report.yml` (:71's match and its label);
   - `scripts/e2e-failure-report.ts` with its self-test (item 2);
   - `scripts/ci/turn-checks-allowlist.txt` (:11);
   - `scripts/check-promote-needs.sh` and its fixture (only if the scope job's shape makes them follow);
   - the GO checker's files, `scripts/conformance/briefs.test.ts` and `scripts/conformance/briefs-allowlist.txt` (item 6);
   - `docs/governance/go-template.md` (item 6's sentence);
   - a new allowlist for CF-LANES through `kit.ts`;
   - `scripts/e2e-select.ts` with its test (only if the repeat budget's arithmetic lives there);
   - an e2e fixture of a `@global-state` test (item 5's one-module fix only).
   Not in scope: local-backend-proof.yml's summary job beyond the plan's summary line; `.claude/`; `src/`.

10. RECORDS (word for word into §14, in place of the brief's DEC-374 and DEC-375; the executor fills the brackets).
   DEC-374 (the supervisor, 2026-11-13 under G17, flagged to the operator 2026-11-12 21:4x New York; his words "THAT IS VERY VERY LONG. ITS AN ISSUE") — the executor's pre-push gate is `bun run checks` with the typecheck, the lint, the touched unit tests and the scripts laws, plus the browser runs of the test ids the turn adds or changes and each red-first run; no spec file runs whole locally unless the turn wrote it new; the push follows at once; CI on the pull request is the full proof: every test in its lane, and the repeat lane repeating the changed specs that fit its budget, directly changed first, with no retries (DEC-283). Why: the whole-file local runs repeated CI's proof serially against a shared staging backend (the pictures turn's report: "518 tests" in about 35 minutes before the push), while the gate itself takes [n] s. Frozen judge: over the next five build turns, adopted if CI reds that a removed local whole-file run would have caught are at most one; whole-file runs of the changed specs return if they are two or more.
   DEC-375 (the supervisor, 2026-11-13 under G17 and G22 — the lanes, the scope decider and the promote path are closed surfaces; the operator's words 2026-11-12 21:51 "THE DURATION OF EACH CI CAN NOT BE THIS LONG"; measured: push to result 20–27 minutes, shards 4.4–18.6 minutes on run 43305919223) — (a) a push whose code tree (the tree with the records set aside) equals the code tree of a run of this repository that completed green with its lanes run reuses that proof: the scope job indexes each tree it sends to the lanes (`code-tree-<id>`) and looks its own up, so the merge commit of a pull request proven green, and a docs-only push, run no lanes again; DEC-365's first-parent walk is retired into this rule and its count of safe skips continues here. (b) Every Chromium test runs in exactly one lane: lanes 1 → 16 are split by measured seconds per spec file (the lane plan and its weights file), not by count; the `smoke` lane is the serial lane (the `@a11y` and `@global-state` tests) and no longer re-runs specs the sixteen run; the repeat lane's budget ends with the slowest planned lane. Frozen judges: (a) adopted when the first three merges whose tree equals a proven tree promote main without running the lanes and no later dev run shows a red the reused proof missed; reverted at the first such red. (b) adopted when the slowest of lanes 1 → 16 is within 25 % of their mean on five code runs [this turn: n %]; back to `--shard` if not.
   DEC-376 (the supervisor, 2026-11-13, under G17, G22 and the OVERRIDE RULE — put to the operator in the reply that carried ruling 1 of the speed turn; his paste of that ruling is its approval) — the browser lanes run two workers again (lanes 1 → 16, `webkit`, `repeat`; the email lane and the serial lane stay at one), replacing the state DEC-230's rule left (one worker since run 1088, 2026-10-21). What changed since: the two causes are fixed (INC-814, turn 22; INC-817, turn 22c); every scratch key and identity is worker-tagged (the speed census's list); the executor's local runs have used two workers on every turn. The count restarts: a red or a flaky test caused by two workers sharing a backend, which is not a fix of the test's own scratch state in the turn that finds it, returns the lanes to one worker with no further exception until a new decision on new evidence. Frozen judge: adopted when over the next ten code runs there is no such failure and the median test time of lanes 1 → 16 is at most 75 % of the plan's one-worker seconds [this turn: n %] (DEC-217 measured 67 → 78 %).
   INC-1135 — the `@global-state` tests (four spec files: admin-categories-images, admin-translations-console, admin-translations-governance, shell) ran in no per-push lane (every lane's command excluded them, local-backend-proof.yml :788 → :798) and only in the nightly's serial run on staging (DEC-028, nightly-e2e.yml :151 → :163), where their failures are non-gating; that run wrote no results on 2026-11-12 ("Sources without results: full") and the nightly concluded FAILURE every day from 2026-11-08 to 2026-11-12 — so no pull request and no promotion was judged on them. Cause: DEC-028 excluded them for the shards' shared staging database; since DEC-211 each lane has its own backend and the reason no longer held. Fix: the serial lane runs them on every push, one worker, its own backend; the speed turn; [FIXED <commit>: n tests, n s / OPEN — the lane runs `@a11y` only; the failure bodies in §13]. Class: a rule kept after its cause went away; a test set whose only runner can fail without anyone judging it.
   register rows (unnumbered): the brief's three, with row 3 reading "every Chromium test in exactly one lane, split by measured time, two workers (DEC-375 b, DEC-376)" → the lane plan and its weights file → CF-LANES-1 → 3 → exceptions: the email lane and the serial lane at one worker · "a GO cites the decision that set a setting it names" → the GO checker → CF-BRIEF-18 → exceptions: `speed.md` until the next brief's STEP 0.
   changelog — the brief's line, with "(DEC-375 b, c)" reading "(DEC-375 b, DEC-376)" and, after it: "; the smoke lane is the serial lane and re-runs nothing; the `@global-state` tests run on every push (INC-1135) [or: stay with the nightly — INC-1135 OPEN]; a GO cites the decision behind a setting it names (CF-BRIEF-18)".

11. ORDER AND PUSHES as the brief: Parts A → D, one commit each (CF-BRIEF-18 rides Part D; this ruling is saved in Part A's commit), STEP 6, ONE push, then read its run. Whatever the first run shows is handled by these rules in ONE further code commit, without a stop:
   (a) A red whose failure names a path this turn changed, in the plan, the decider or a guard → fixed at its root.
   (b) A red or flaky test caused by two workers sharing a backend → fixed when the cause is that test's own scratch state in one module (J3); otherwise the lanes go back to one worker in that commit (the lane value, AGENTS.md :31's clause back to "1 worker each", CF-LANES-3's expectation), and DEC-376's bracket says so.
   (c) The `@global-state` tests → item 5's rule.
   (d) A lane more than 25 % over the mean → named with its file in §11; the weights are refreshed in that commit only when they are the cause.
   Then the report (a docs-only push), on which the scope job's line names the reused proof.
   §11 reports, for the judged run: push to result in minutes; each lane's planned and actual seconds; the serial lane's seconds; the repeat lane's budget and counts; the test time of lanes 1 → 16 against the plan's one-worker seconds; one lane's fixed overhead by step.
   A stop is only for a security finding or a file this ruling and the brief do not name.
