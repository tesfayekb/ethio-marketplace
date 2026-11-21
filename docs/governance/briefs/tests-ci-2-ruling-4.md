RULING — tests-ci-2, stop 4: the bench's quiet window, the false PASS line (INC-1228), two ceilings after dev's L22c, then the one push. Base: cursor/tests-ci-2 3be465ac3.

PREVENTION (G70)
- Class (the supervisor's, S707 and S708): a dispatched Feed bench yields to every CI, Nightly E2E or Guard Proof run that starts while it works, a queued one too (`scripts/staging-gate.ts`, DEC-168), and both yields were started by the supervisor's own steps. Run 44892283273 yielded to the merge of pull request #89 (S707). Run 44894899898 yielded to this lane's stop-4 push, CI run 44894986213: the supervisor asked for the dispatch while ruling 3 still told you to STOP by a push (S708). Second occurrence, so a guard and not a note. Changed here: decision 1 (the lane pushes nothing inside the window) and decision 2 (the window written where the bench is documented). In force now for the supervisor: a dispatch step is written only after a check has shown no run queued or in progress, every lane with an open pull request told to push nothing, and no merge owed; the step names the window and its end.
- Class: a line that states a success or a measurement the run did not make (INC-1228; the banned pattern "phantom success"). Changed here: decision 3.
- Class: a ratchet computed on a lane's tree is stale once dev grows a page before the lane merges. Changed here: decision 4. In force now: a lane that holds a ratchet reads the budget job of its pull request's newest run before its final push.
Repository: decisions 2, 3 and 4. Cursor rules: decision 1's push rule, at the next rules turn. Knowledge: not needed (a push to a Lovable branch with no pull request starts no run).

THE RULINGS
1. THE QUIET WINDOW. From the moment you save this ruling until the operator tells you the bench has completed, push nothing. Commit as you go. If you must stop inside the window, say so in the chat only; its file rides the next push.
   - CI run 44894986213 (your stop-4 push) is running the browser lanes: the pull request's merge with dev is a new tree since dev took pull request #89. It will end red on decision 4's two lines. It is the red of a report commit: named in the report, never re-run.
   - The operator dispatches "Feed bench" on `cursor/tests-ci-2` once that run has completed, when the supervisor tells him. The supervisor watches the bench and tells him when it has completed; he tells you.
   - Then read the bench as ruling 3, decision 3, says.
2. THE WINDOW IN THE REPOSITORY. Beside the staging gate's paragraph in `docs/features/feed-engine.md`, and in the header comment of `.github/workflows/feed-bench.yml`, say what makes a dispatched run yield and when to dispatch:
   - It yields to a CI, Nightly E2E or Guard Proof run from the moment that run is queued: a push to a branch with an open pull request (a docs-only push too), a merge into dev, a pull request opened, the nightly crons.
   - So a dispatch is made when no such run is queued or in progress, and nothing of that kind happens until it completes.
   - The measured length of a run, from this turn's numbers.
3. INC-1228 RIDES THIS TURN. `verdict()` in `scripts/feed-bench.ts` calls a run with no measured shape a pass, and `main()` prints its lines after a yield or a failure. The status file prints `0 bytes` for a page size nobody measured (`let bytes = 0`). The concern: the log, the status file and the exit code tell one story, and none of them states a value that was not measured.
   - A PASS line is printed only when every shape the bench defines and the page size were measured and met their targets.
   - Each value that was not measured gets its own line that says so, in the log and in the status file. An unmeasured page size is an absence, never the number 0.
   - For a run that failed, yielded or was skipped, the outcome and the exit code stay what they are today. A run that neither failed nor yielded and measured less than everything is a MISS.
   - Tests, in `scripts/feed-bench.test.ts`: FB-10, a yielded run (no shape, no page size) prints no PASS line and prints the not-measured lines, shown red on the base first; FB-11, a run that failed after some shapes prints no PASS line, with a control: everything measured and met prints PASS.
   - How `verdict()` learns the shapes the bench defines is yours to decide; name it under §10.
4. TWO CEILINGS AFTER DEV'S L22c. The budget job of CI run 44894986213 measured this lane merged with dev `37b62562a`: `/account_/saved` 221.8 KiB against your ratcheted 222, and `/l/$slug` 248.8 KiB against 249. Both sit inside the NEAR band. In run 44890392019, before dev took pull request #89, they were 221.5 and 248.5.
   - The cause is dev's and was ruled on that pull request: L22c's readers of the instant (save, contact, report, the listing detail) and its `…When` sentences in the base layer.
   - Your ratchet is right. In `scripts/route-budgets.mjs` the two lines move in DEC-296's form with CI's numbers: `/account_/saved` 222 → 223 = ceilingFor(221.8), and `/l/$slug` 249 → 250 = ceilingFor(248.8). The comment names run 44894986213 and the cause.
   - Your tree does not hold L22c, so your local build cannot show these sizes. The proof is the budget job of the final push: read it before you write the report.
   - No other line of the ratchet moves. On that merge the next smallest headroom is 0.4 KiB.
5. THE GATE, ONCE, WHILE THE BENCH RUNS. Build decisions 2, 3 and 4 on top of ruling 3's decision 1 now, then run `bun run checks` whole and do the self-review while the bench runs. After the bench, the only edits are `timeout-minutes`, DEC-412's brackets and the lines that state the bench's measured length. Then re-run only what reads the files those edits touch (the script tests that read `.github/workflows/feed-bench.yml`, found by grep and named under §10, and prettier on the changed files). Do not run the whole gate a second time: CI judges the final tree whole. This order is this turn's alone; name it under §10.
6. ONE PUSH, after the bench. Three code commits, one push:
   - `tests-ci-2: the repeat lane's serial pass, the bench's limit` (ruling 3's, with decision 2's lines);
   - `tests-ci-2: a bench that measured nothing prints no PASS (INC-1228)`;
   - `tests-ci-2: two ceilings after dev's L22c (DEC-296)`.
   Then STEP 7. The report's CI line is the run of that push's head. If the bench is red for a reason that is not a yield, STOP in the chat with its log's lines.

RECORDS (word for word into §14, beside ruling 3's)
INC-1228 — the Feed bench's log printed `PASS: every target met` on two runs that yielded before measuring anything (44892283273, 44894899898), and its status file printed a page size of `0 bytes`. `verdict()` called no measured shape a pass, `main()` printed its lines after a yield or a failure, and the unmeasured page size was the number 0. The outcome line and the exit code were right. Class: a line that states a success or a measurement the run did not make (phantom success; a sentinel number). Mechanism: `verdict()` and the status renderer in `scripts/feed-bench.ts`. Fix: [the law as built]; FB-10, FB-11. Status: CLOSED by [commit].
