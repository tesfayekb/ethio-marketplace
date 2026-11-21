STOP — tests-ci-2 ruling 3 decision 3: the Feed bench yielded, so it has no numbers
DONE: ruling 3 decision 1 (built and tested in the working tree, not committed; see below)
LEFT: ruling 3 decisions 2 to 4; STEP 7
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `2ece00075f3e5251d3fbd3f2779b909bfa6fb7e9` (short `2ece000`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-21T10:01:29Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44891883638

FILES:
.github/workflows/ci.yml
.github/workflows/feed-bench.yml
.github/workflows/local-backend-proof.yml
.github/workflows/lovable-branch-guard.yml
docs/features/attributes.md
docs/features/ci-guards.md
docs/features/display-primitives.md
docs/features/e2e-harness.md
docs/features/feed-engine.md
docs/features/performance-strategy.md
docs/governance/briefs/tests-ci-2-ruling-1.md
docs/governance/briefs/tests-ci-2-ruling-2.md
docs/governance/briefs/tests-ci-2-ruling-3.md
docs/governance/briefs/tests-ci-2.md
docs/governance/reports/tests-ci-2.census.md
docs/governance/reports/tests-ci-2.stop-1.md
docs/governance/reports/tests-ci-2.stop-2.md
docs/governance/reports/tests-ci-2.stop-3.md
e2e/helpers/posting.ts
e2e/menu-rows.spec.ts
e2e/shell-bands.spec.ts
e2e/submenu-look.spec.ts
e2e/submenu-touch.spec.ts
e2e/submenu.spec.ts
roadmap.md
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/check-datatable-minwidth.sh
scripts/check-migrations.sh
scripts/ci/lovable-branch-guard.sh
scripts/ci/lovable-branch-guard.test.ts
scripts/ci/repeat-cap.test.ts
scripts/ci/repeat-cap.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/import-cycles-allowlist.txt
scripts/conformance/import-cycles.test.ts
scripts/conformance/import-cycles.ts
scripts/conformance/lanes.test.ts
scripts/conformance/migration-guards.test.ts
scripts/conformance/migration-guards.ts
scripts/conformance/migration-reader.ts
scripts/conformance/repeat-lane.test.ts
scripts/conformance/shared-value-tables.txt
scripts/conformance/shared-values.ts
scripts/conformance/wired.test.ts
scripts/datatable-minwidth.ts
scripts/feed-bench-market.ts
scripts/feed-bench.test.ts
scripts/feed-bench.ts
scripts/fixtures/bad-datatable-minwidth-class-example.tsx.txt
scripts/route-budgets.mjs
scripts/shell-guards.test.ts

## The bench's state

The operator dispatched "Feed bench" on `cursor/tests-ci-2` at `2ece00075`: run 44892283273,
10:01:07 to 10:04:43 UTC, conclusion failure. I read the whole log and the status file it published
(`docs/tracking/branches/cursor/tests-ci-2/feed-bench-status.md` on ci-evidence):

- The staging gate waited 34 s for this lane's own CI run 44891883638, then found staging quiet.
- The seed then ran 154.6 s: sellers 124.9 s for 2,048 sellers, listings 1.4 s, 0 listings seeded.
- At 10:04:39 it yielded (`feed-bench YIELDED: CI run 44892432414 (in_progress, 37b62562) started`).
  That run is `dev`'s CI for the merge of pull request #89 (L22c, Lovable), started 10:02:50 and green.
- Cleanup took 13.4 s and left 0 rows. Measure did not run: no shape, no page size.
- Verdict: YIELDED, exit 1.

So the bench has no numbers to set `timeout-minutes` from or to fill DEC-412's brackets, and ruling 3,
decision 3, says: "If the bench is red … STOP with its state. Do not push without its numbers."

The bench needs a window with no CI run on staging for about its whole length. This run's seed alone
took 2.6 minutes before 100,500 listings were inserted, so a merge to `dev` during the window yields
it again.

## A defect the run surfaced (not fixed; the supervisor's to place)

After the YIELDED line the log printed `PASS: every target met`. `verdict()`
(`scripts/feed-bench.ts:79`–`:96`, unchanged since before this turn: the same line is at `:94` in
`96b53abfe`) calls a run with no measured shape a pass. `main()` (`:707`–`:709`) prints its lines
after a yield or a failure. The status file and the exit code are right; only the log line claims a
success that did not happen. The narrow fix is a `MISS: no shape was measured` line when `shapes` is
empty, plus an FB test for a yielded run. `scripts/feed-bench.ts` is in the brief's scope. I have not
made the fix because ruling 3 says decision 1 does not touch the bench and its one code commit has a
fixed title.

## Decision 1: built, not committed

Ruling 3, decision 4, puts decision 1 and the bench's limit in one code commit, so decision 1 is in
the working tree, uncommitted. These six files are not in any commit (`git diff --stat`, 399
insertions, 17 deletions):

- `.github/workflows/local-backend-proof.yml`:
  - The select step lists the serial pass's tests (`--list --pass-with-no-tests --project=mobile-360
    --grep "@global-state" --grep-invert "@a11y" $specs`) and counts them into `tests`, each spec's
    fit, `REPEAT_EACH`, `REPEAT_PARALLEL_TESTS` and `REPEAT_SERIAL_TESTS`.
  - It writes a `- Repeat serially (DEC-415):` line.
  - The run step runs the parallel pass, then the serial pass (the Chromium pair,
    `--grep "@global-state" --grep-invert "@a11y" --workers=1 --repeat-each "$REPEAT_EACH"
    --retries 0`, a cap of what is left of the one deadline, `$REPEAT_SPECS`). A pass with no test
    is skipped. The parallel pass's `test-results/` is set aside and joined back. The step is red
    when either pass fails.
- `scripts/ci/repeat-cap.ts`: `mergedReport`, `cappedBeforeLoad`, `mergeDirs`, and the `--merge
  <aside-dir> <results-dir> <evidence-file>` command line.
- `scripts/ci/repeat-cap.test.ts`: RCAP-10 and RCAP-11.
- `scripts/conformance/lanes.test.ts`:
  - CF-LANES-5, with planted cases: the serial pass removed, its count removed, two workers, its own
    count, a different tag filter, and no merge.
  - CF-LANES-3 now takes the most workers any of a lane's runs uses. Its planted two-worker case
    still names the repeat lane, which the serial pass's `--workers=1` had hidden.
- `scripts/conformance/repeat-lane.test.ts`: RPL-2's planted anchors are made unique for two run
  lines and two `repeat-cap.ts` calls.
- `docs/features/e2e-harness.md`: what the lane repeats; `@a11y` stays out.

Proof so far:

- `bun run typecheck` and `bun run lint` pass.
- `bunx vitest run scripts --maxWorkers=2` passes: 127 files, 684 tests passed, 1 skipped, 98 s at
  load 3.80.
- `bash -n` passes on the two changed step scripts.
- A dry run of the two steps in `/tmp/ethio-scratch/tests-ci-2/dry/` used stubbed `bunx` and
  selector output:
  - The planner took a spec of only `@global-state` tests and counted 3 serial and 3 parallel tests.
  - With both passes green the step exited 0, and one `results.json` held both passes and both error
    contexts.
  - With the serial pass failing, `repeat-cap: failed` and the step exited 1.
- Not yet run: `bun run checks` and the self-review (both belong to the final tree with the bench's
  limit).
- The §10 items ruling 3 asks for:
  - The count lives in the select step's planner, in the workflow.
  - `scripts/e2e-select.ts` and `scripts/ci/lane-plan.ts` are unchanged.
  - The spec selection is unchanged. The per-spec budget fit now includes the serial tests, as
    decision 1's budget clause requires.

During a dry run my stub of `bun` ran the merge from the repository's root, so it wrote
`test-results/results.json` and `test-results/t/` there. Both are build output, ignored by
`.gitignore:42`, and I removed both; `test-results/.last-run.json`, which predates the dry run,
stayed.

## What this needs

1. The operator dispatches "Feed bench" on `cursor/tests-ci-2` again at a time when no merge to
   `dev` and no pull request run is expected, for at least ten minutes. This stop's push is
   docs-only: its CI run skips the lanes in under a minute. Dispatch after it has finished.
2. The supervisor rules whether the `verdict()` fix rides decision 1's commit.
3. Then, I read the run, set `timeout-minutes`, fill DEC-412's brackets, commit decision 1 and the
   limit as `tests-ci-2: the repeat lane's serial pass, the bench's limit`, run `bun run checks` and
   the self-review, push once, and write the report.
