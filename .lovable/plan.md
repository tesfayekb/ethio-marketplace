# Foundations turn K5: PLAN FIRST answers (read at BASE a566ac17)

HEAD is `a566ac17`, which matches BASE. Nothing was changed.

## (1) Files and tests the two concerns touch

**The selector (INC-967)**
- `scripts/e2e-select.ts`
  - :25 is the `--repeat` usage comment.
  - :421–443 is `repeatSpecs`. It ends with `return [...selected].sort()`, so there is a single sorted rank.
  - :446–465 is `repeatPlan`.
  - :512–515 is the `--repeat` branch of `main`.
- `scripts/e2e-select.test.ts`
  - RPS-1 to RPS-5 are at :97–127.
  - **RPS-5 asserts `list == sorted(list)` (:123–127).** That contradicts the ranking, so RPS-5 must be restated as "sorted inside each rank, unique".

**`.github/workflows/local-backend-proof.yml`**
- :41 is the matrix entry `repeat`.
- :70–72 sets fetch-depth for the repeat lane.
- :91–150 is the step "Select the specs to repeat (DEC-283)":
  - :101 calls `e2e-select.ts --repeat`.
  - :109 runs `--list`.
  - :110–122 is inline Python that writes `repeat-counts.txt` in the selector's order.
  - :123 calls `repeatPlan`.
  - :127–140 is the take loop.
  - :147 writes the evidence line.
  - The step then writes `REPEAT_SPECS` and `REPEAT_TESTS` to `GITHUB_ENV`.
- :161–651: the heavy steps, gated by `matrix.lane != 'repeat' || env.REPEAT_SPECS != ''`.
- :659–661 is the repeated run, with `--repeat-each`, `--retries 0` and `--global-timeout`.
- :668–700 is the cap check:
  - inline Python, with `'Timed out waiting' in e` at :678;
  - a walk of the results that names "Not repeated (time cap)" titles;
  - it writes `local-backend-repeat.txt`.
- :793–803 is the lane reporter's fragment, which reads `local-backend-repeat.txt`.
- :932 is the lane reporter's `E2E_EXPECTED_SOURCES: …,16,repeat?`.
- :964, :968 and :1022 are the summary's lane list, its evidence pattern and the "Repeat lane (DEC-283)" line.

**`.github/workflows/ci.yml`**
- :485 and :495 are the "nineteen lanes" comments.
- :589–590: the merged report's `E2E_EXPECTED_SOURCES: smoke,email,1,…,16`, with no `repeat`. This is INC-966.

**Places in `scripts/` that parse the sources**
- `scripts/e2e-failure-report.ts:2592–2604` parses `E2E_EXPECTED_SOURCES`. It already handles the `?` optional suffix (:2596, :2604), so it needs no change.
- Other users of the same variable:
  - `flake-check.yml:136` (`flake`)
  - `nightly-e2e.yml:187` (`nightly,full`)

**The guard: `scripts/conformance/repeat-lane.test.ts`**
- `repeatLaneFindings` is at :58–94. RPL-1 is at :104, RPL-2 (planted copies) at :108 and RPL-3 at :150.
- **It reads only `local-backend-proof.yml`.** Its sources rule at :67 takes the first `E2E_EXPECTED_SOURCES` match in that file. So ci.yml :590 is not judged today; widening the guard means reading ci.yml as well.
- `scripts/conformance/ci-deadlines.test.ts` (CF-CID-1) applies to every step, including the selection step's `timeout-minutes: 5`.

**Docs**
- `docs/features/e2e-harness.md`: the repeat lane paragraph.
- `docs/features/ci-local-backend.md`: the lane and its evidence.
- `docs/tracking/incidental-findings.md`: INC-966 at :5449 and INC-967 at :5459, both OPEN.

## (2) Existing ranking, ordering or capping

- **Ranking:** none. `repeatSpecs` returns one sorted set.
- **Ordering:** the take loop keeps the selector's file order.
- **Capping:** `repeatPlan` caps the test count (`take`) and `each`. The Playwright `--global-timeout` is the wall cap, and the inline Python at :678 reads it.
- **Discrepancy with the brief:** Part C says a spec too large is "skipped and the next one tried (as today)". At BASE that is not what happens. :125 says "the first spec that does not fit ends the selection", and :133–137 sets `full=1`, after which every later spec is listed as not repeated. Making it skip and try the next spec is therefore a behaviour change. Requested ruling: implement skip-and-continue, as Part C states, and list it as a departure from "as today".

Nothing is built twice. The ranking goes into `repeatSpecs`, and the cap reading moves out of the inline Python into one script.

## (3) Playwright's global-timeout template

Installed `playwright` 1.58.1, `node_modules/playwright/lib/runner/taskRunner.js:91`:

```text
      this._reporter.onError?.({ message: import_utils2.colors.red(`Timed out waiting ${this._globalTimeoutForError / 1e3}s for the ${currentTaskName} to run`) });
```

`colors.red` wraps the message in ANSI red (`\x1b[31m … \x1b[39m`). RCAP fixtures will use both the coloured and the plain form, and in the build I will confirm the exact codes from the installed colors module.

K2: a second place reads a Playwright-family message by its text. `scripts/e2e-failure-report.ts` :1723, :1737 and :2053 are fixtures and tests matching the webServer message "Timed out waiting 120000ms from config.webServer.". That is a different message, which I will report and not touch.

## (4) Conflicts with Knowledge or AGENTS.md

None blocking.
- **Pure utilities ONLY in /src/lib:** `scripts/ci/repeat-cap.ts` is CI tooling, the same case as your K4 ruling. It sits beside `with-deadline.sh` and `nightly-hour.sh`. Unless you rule otherwise, I will cite the K4 ruling.
- **No new dependency:** none. The workflow calls the script with `bun run`, which is already used in this step.
- **No string, migration or package change:** none of these are needed.

## (5) Proposed file list

Inside SCOPE:
- `scripts/e2e-select.ts`: two ranks, and `--repeat --ranks` printing `<rank> <spec>`.
- `scripts/e2e-select.test.ts`: new RPS-6 and RPS-7; RPS-5 restated as sorted inside each rank.
- `scripts/ci/repeat-cap.ts`: new.
- `scripts/ci/repeat-cap.test.ts`: new. RCAP-1 to RCAP-5 cover the coloured template, the plain template, a different error, a mix, no errors, and an unreadable message.
- `.github/workflows/local-backend-proof.yml`: the ranked take loop with skip-and-continue, the per-rank evidence line, and the cap check calling `scripts/ci/repeat-cap.ts`.
- `.github/workflows/ci.yml`: :590 gains `repeat?`, plus a comment saying why.
- `scripts/conformance/repeat-lane.test.ts`:
  - RPL-1 also reads ci.yml's merged-report sources and forbids an inline `'Timed out waiting'`.
  - RPL-2 gets the two matching planted copies.
- `docs/features/e2e-harness.md`: the paragraph.
- `docs/features/ci-local-backend.md`: one sentence on the per-rank evidence line. Optional; drop it if you prefer.
- `docs/tracking/incidental-findings.md`: the later word on INC-966 and INC-967.

Brief-named extras:
- `docs/governance/briefs/foundations-turn-k5.md`
- `roadmap.md` (line 3)
- `docs/_changelog.md`
- `docs/governance/reports/foundations-turn-k5.report.md`

Nothing under `src`, `e2e`, `supabase`, `AGENTS.md`, `CLAUDE.md` or the package files changes.

How the cap script is called: the results JSON path is passed in. Its exit code is 0 for "capped" and 1 for "failed", and an unreadable or absent file counts as "failed". The step that walks the tests left by the cap moves into the same script, so there is one reader.
