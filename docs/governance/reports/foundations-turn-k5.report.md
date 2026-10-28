# Foundations turn K5 — completion report

Brief: docs/governance/briefs/foundations-turn-k5.md — sha256 `3ae52f7066f9d36208b7a785a2474faf3da1c2d8938bd0ae5182c155a2fb4170`, 9766 bytes (matches the carrying message). START: `a566ac17` (BASE). HEAD at the build was `bb8b3296`, which is BASE plus `.lovable/plan.md`. That file is the plan mode's committed plan, and it is left as it is (R8).

## Part A — CI first: done

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `4907c2b8356da048455b61812dae3e9cdd25b465` (short `4907c2b`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-28T18:04:12Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40738433855
```

The repeat lane's lines in local-backend-proof.md:

```text
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 56 | 56 |
- Repeat lane (DEC-283): Not repeated: e2e/ad-page.spec.ts (39 tests); Not repeated: e2e/auth-signout.spec.ts (17 tests); Repeat: nothing to repeat
- Database session samples during each start (INC-944): … repeat not run
  - repeat: not found
```

There was no red. The 4907c2b8 line shows the old stop-at-first-misfit behaviour that R1 replaces: auth-signout's 17 tests were dropped because ad-page's 39 tests did not fit before them.

## STEP 0: done

The brief was saved by `cp` of a scripted copy, and its hash and size are as above. Roadmap line 3 was replaced as stated, and no other roadmap line changed.

## Part B — the ranking (INC-967): done

`repeatRanks` in scripts/e2e-select.ts returns `{spec, rank}` items:
- rank 1 is the changed specs that are still present, sorted;
- rank 2 is the importers of a changed helper that were not changed themselves, sorted.

`repeatSpecs` returns the same list in rank order. `--repeat --ranks` prints `<rank> <spec>`.

Tests:
- RPS-5 is restated as "sorted inside each rank, unique" (R2).
- RPS-6 and RPS-7 are new.

Red first (BASE's selector, not committed):
```text
AssertionError: expected 'e2e/a11y.spec.ts' to be 'e2e/geo.spec.ts' // Object.is equality
      Tests  3 failed | 16 passed (19)
```
Green: `bunx vitest run scripts/e2e-select.test.ts` gave `Tests  19 passed (19)`.

## Part C — the take order: done

The selection step now:
- reads `--repeat --ranks`;
- carries each spec's rank through repeat-counts.txt;
- keeps the selector's order (rank one before rank two);
- skips a spec too large for what is left and tries the next one (R1);
- adds `directly changed: <taken> of <n> repeated; importers of a changed helper: <taken> of <m>` to the evidence line.

The step keeps `timeout-minutes: 5`, and CF-CID-1 is green.

A local shell simulation, with counts a=30/r1, b=5/r1, c=0/r2, d=4/r2 and take 12, gave `chosen=e2e/b.spec.ts e2e/d.spec.ts used=9 direct 1/2 helper 1/1` and `- Not repeated: e2e/a.spec.ts (30 tests)`.

## Part D — the cap's reading and the merged report (INC-966): done

**D1.** The inline Python was replaced by `bun run scripts/ci/repeat-cap.ts test-results/results.json local-backend-repeat.txt`. That script is the one reader. It also walks the results for the tests the cap left (R4).
- It exits 0 only when it answers "capped". That needs every top-level error to be the global-timeout message, coloured or plain, with no test `unexpected`.
- It exits 1 for anything else, including a report file that is absent or unreadable.

The Playwright line read (playwright 1.58.1):
```text
node_modules/playwright/lib/runner/taskRunner.js:91:      this._reporter.onError?.({ message: import_utils2.colors.red(`Timed out waiting ${this._globalTimeoutForError / 1e3}s for the ${currentTaskName} to run`) });
```
The colour codes:
```text
node_modules/playwright-core/lib/utils/isomorphic/colors.js:36:  red: (text) => applyStyle(31, 39, text),
node_modules/playwright-core/lib/utils/isomorphic/colors.js:67:const applyStyle = (open, close, text) => `\x1B[${open}m${text}\x1B[${close}m`;
```

Red first: BASE's inline rule (`'Timed out waiting' in e`) was planted into `isGlobalTimeout`, not committed.
```text
     × RCAP-3 a different error is failed — the webServer timeout included
      Tests  1 failed | 7 passed (8)
```
The inline rule accepted the webServer timeout and an `Error: …` prefix as a cap.

**D2.** In ci.yml, the merged report's `E2E_EXPECTED_SOURCES` gained `repeat?`, with a comment saying why. scripts/e2e-failure-report.ts:2596/:2604 already parses the `?` form.

**D3.** RPL-1 gained four rules:
- the merged report (ci.yml) names `repeat?`;
- no workflow under .github/workflows contains `Timed out waiting`;
- the lane calls scripts/ci/repeat-cap.ts;
- the selection reads `--repeat --ranks`.

RPL-2 plants a breach of each. The workflows are listed through the kit's `walkFiles`, because CF-ADOPT-1 refused a bare `readdirSync`.

Red first (BASE's workflows):
```text
     × RPL-1 the real workflow keeps every rule of the repeat lane
     × RPL-2 a planted copy breaking each rule is named
      Tests  2 failed | 1 passed (3)
+   "the selection does not read the selector's ranks",
+   "the cap is not read by scripts/ci/repeat-cap.ts",
```

Green: `bunx vitest run scripts/ci/repeat-cap.test.ts scripts/conformance/repeat-lane.test.ts scripts/conformance/ci-deadlines.test.ts` (with kit-adoption and e2e-select) gave `Test Files  5 passed (5)` and `Tests  34 passed (34)`.

## Part E — the records: done

- e2e-harness.md: the repeat lane's paragraph got one sentence.
- ci-local-backend.md: one sentence under a new turn K5 heading (R6).
- incidental-findings.md: a later word on INC-966 and on INC-967.
- _changelog.md: one line for the turn.

## THE CHECKS

1. `git diff a566ac17 --stat -- src e2e supabase AGENTS.md CLAUDE.md package.json bun.lock`: empty.
2. `bunx eslint` on the five files: clean. One `no-control-regex` error came up and was fixed at its root: the escape check is now a `includes("\x1B")` test, no longer an ESC in a character class.
3. `bunx vitest run scripts`: `Test Files  4 failed | 49 passed (53)`, `Tests  10 failed | 253 passed | 1 skipped (264)`. Every failing file was run alone:
   - executor-hooks (EXH-4, EXH-5, EXH-21): `Tests  25 passed (25)`
   - language-records (CF-LANG-1): `Tests  2 passed (2)`
   - strings-layers (CF-SL-1, 3, 6): `Tests  6 passed (6)`
   - nightly-hour (NH-1, 2, 3): fails alone as well, because the sandbox has no time-zone database (turn K4's known limit).

   EXH-4, EXH-5 and CF-LANG-1 are outside K4's named list. They timed out under load and pass alone, and none of them is in a file this turn touched.
4. actionlint 1.7.9 (via nix), `-shellcheck= -pyflakes=` on local-backend-proof.yml and ci.yml: no findings, exit 0.
5. `bun run format:check` was run last; its result is in the chat summary.

## K2

The webServer-message fixtures that read a Playwright-family message by its text are reported and not touched (R7):
- scripts/e2e-failure-report.ts:1723
- scripts/e2e-failure-report.ts:1737
- scripts/e2e-failure-report.ts:2053

These match "Timed out waiting 120000ms from config.webServer.", which is a different message.

No workflow now reads `Timed out waiting` inline (RPL-1).

## Reviewer

Round 1: NOT READY, one MAJOR. Malformed lists failed open: `"specs": null` read as capped, which is less strict than the removed Python. Fixed: a present list must be an array of objects, and anything else makes the verdict "failed". RCAP-9 was added.

Round 2: NOT READY, one MAJOR. Arrays passed as objects, so `"suites": [[]]` read as capped. Fixed: `isObject` now excludes arrays, and RCAP-9 gained nested-array cases for every list.

Round 3 is recorded in the chat summary. Each round found no other finding in the remaining diff.

## Departures

1. **R1, a behaviour change from BASE:** a spec that does not fit is skipped and the next one tried. BASE stopped at the first spec that did not fit.
2. **R3:** scripts/ci/repeat-cap.ts is CI tooling beside with-deadline.sh and nightly-hour.sh, so the K4 ruling applies; it does not go in src/lib.
3. **The ranks interface is a new item type.** `--repeat --ranks` prints `<rank> <spec>`, and the exported `repeatRanks` returns `{spec, rank}`.
4. **RPL-1 gained two rules beyond the brief's two:** the selection reads the ranks, and the cap is read by the script. This makes the mechanism's own use guarded.
5. **RCAP has eight cases rather than the brief's four kinds.** RCAP-6 covers an unreadable message, RCAP-7 a cap with a failed repetition, and RCAP-8 the file and the command line.
6. **`.lovable/plan.md` is in the diff from START.** It was committed by plan mode and is left as it is (R8).

## git diff --name-only a566ac17

```text
.github/workflows/ci.yml
.github/workflows/local-backend-proof.yml
.lovable/plan.md
docs/_changelog.md
docs/features/ci-local-backend.md
docs/features/e2e-harness.md
docs/governance/briefs/foundations-turn-k5.md
docs/governance/reports/foundations-turn-k5.report.md
docs/tracking/incidental-findings.md
roadmap.md
scripts/ci/repeat-cap.test.ts
scripts/ci/repeat-cap.ts
scripts/conformance/repeat-lane.test.ts
scripts/e2e-select.test.ts
scripts/e2e-select.ts
```

## CI for the last commit I can read

The last readable commit is 4907c2b8: SUCCESS, run 40738433855, with the six lines as pasted in Part A. CI on this turn's commit is not read yet.
