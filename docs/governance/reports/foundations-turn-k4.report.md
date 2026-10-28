# Foundations turn K4 — completion report

## 1. Verdict

DONE, every part, after the supervisor's ruling on where `repeatPlan` lives (see §10). CI on this landing has not been read: it will not have finished when this turn ends.

## 2. Starting point (Part A)

- `git rev-parse HEAD` at the ruling: `d08cff3e` = BASE `ebd91c10` plus the STOP report (`docs/governance/reports/foundations-turn-k4.report.md`, outside SCOPE but among THE FILES) and the platform's empty `d716152a`. No SCOPE path differs from BASE.
- First six lines of ci-status.md (read at the authorized URL):

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `ebd91c10054b43e0820efabad2b9705af2831677` (short `ebd91c1`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-28T12:22:19Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40684645197
```

## 3. STEP 0

Saved by script from the carrying message: `662918646a9712bd8373da14d28ac830ee110e429574faecc43186a9405b76b0`, 19463 bytes — matches. roadmap.md line 3: the C1-2 text replaced with the K4 text; nothing else changed.

## 4. Parts

- **B (selector).** `repeatSpecs(changed)` and the `--repeat [--base <sha>]` mode in scripts/e2e-select.ts: a changed spec still present selects itself; a changed e2e non-spec selects its importers transitively; src/, migrations, playwright.config.ts and the global setup/teardown select nothing; never ALL; sorted, unique. A git failure throws, so the step is red.
- **C (lane).** local-backend-proof.yml: matrix gains `repeat` (E2E_SHARD `local-repeat` via the existing expression); checkout `fetch-depth` 0 for repeat only; step "Select the specs to repeat (DEC-283)" right after Install dependencies (deadline 5 min) with REPEAT_BUDGET_SECONDS=720 and REPEAT_SECONDS_PER_TEST=4.7, counting with `playwright test --list`, the count from `repeatPlan`, specs taken in order while they fit (the first misfit ends the selection), the rest written as "not repeated"; the skip condition on the CLI, working copy, certificate, backend start, the three smoke-only database guards, build, Playwright version, browser cache, both browser installs and the run; the run branch with `--repeat-each "$REPEAT_EACH" --retries 0 --global-timeout "$REPEAT_GLOBAL_TIMEOUT_MS"` (840000); a time cap reached with no failed test is green and lists the unrun titles "not repeated (time cap)". Evidence: "- Repeat: …" lines in the lane fragment; summary lanes/regex/texts say repeat, nineteen, /19. The repeat count and selection are shown on a line of their own below the table ("- Repeat lane (DEC-283): …"), not in the Migrations cell — the cell keeps the backend's ledger, which the repeat lane also has when it runs. ci.yml: both comments say "nineteen lanes (eighteen and the repeat lane, DEC-283)". `e2e` needs `[e2e-lanes]` (ci.yml:497) and judges `needs.e2e-lanes.result` (ci.yml:592), and e2e-lanes is `uses: ./.github/workflows/local-backend-proof.yml` (ci.yml:490), so the lane is in the verdict and in promote with no change.
- **e2e-failure-report.ts census.** The one place a lane source is named/parsed is `sourceLabel` (:1217–1221): a non-numeric id is its own label, so `repeat` → `repeat` already; the flake ledger line uses that label (:538). Added the self-test assertion `sourceLabel("e2e-results-repeat") === "repeat"` and the doc comment. Flaky needs nothing: with retries 0 no test reaches status `flaky`.
- **D (guard).** scripts/conformance/repeat-lane.test.ts, RPL-1…3; `repeatPlan` in scripts/e2e-select.ts per the ruling.
- **E (records).** Inserted by script from the saved brief:

```text
5437:## INC-964 — a small module shared by a page's first download and a piece fetched on demand becomes a chunk of its own (2026-10-28; Foundations turn C1-2, stops 1 and 2)
5441:## INC-965 — the draft route answers a slow residency lookup with a raw "Internal server error" (2026-10-28; Foundations turn C1-2, stop 3)
5445:Numbering: next free INC-966.
S81 · 2026-10-28 · FOUNDATIONS TURN C1-2 LANDED (`ebd91c10`; three stops ruled
- DEC-283 (the operator, 2026-10-28 06:48 New York, "Approve it"): every changed
NUMBERING after this block: next free DEC-284, D239, INC-966, S466, ACT-022.
```

E3 changelog line appended. E4: neither doc counted lanes in words; added one paragraph to e2e-harness.md (§Temporary test backends, after "The prerequisite census…") and one to ci-status-reporter.md (§guards-last-failure.md, after the "E2E lanes" paragraph), each naming nineteen lanes and the repeat lane with DEC-283.

## 5. Files (`git diff --name-only ebd91c10` plus new files)

.github/workflows/ci.yml · .github/workflows/local-backend-proof.yml · docs/_changelog.md · docs/features/ci-status-reporter.md · docs/features/e2e-harness.md · docs/governance/briefs/foundations-turn-k4.md (new) · docs/governance/reports/foundations-turn-k4.report.md · docs/spec/spec-ledger.md · docs/tracking/incidental-findings.md · roadmap.md · scripts/conformance/repeat-lane.test.ts (new) · scripts/e2e-failure-report.ts · scripts/e2e-select.test.ts · scripts/e2e-select.ts

## 6. Red first (shown, never committed)

- B2 against BASE's selector: `Tests 5 failed | 12 passed (17)` (RPS-1…5: the mode did not exist).
- D, RPL-1 against BASE's workflow: `Tests 1 failed | 2 skipped (3)`; findings included "the matrix has no repeat lane", "the summary's lane list leaves repeat out", "the summary's evidence pattern leaves repeat out", "the reporter's expected sources leave repeat out", "the repeat lane runs no repeated tests", "the repeat lane has no selection step" (19 findings).

## 7. Test totals

- `bunx vitest run scripts/e2e-select.test.ts`: 17 passed.
- `bunx vitest run scripts/conformance/repeat-lane.test.ts scripts/conformance/ci-deadlines.test.ts scripts/e2e-select.test.ts`: 3 files, 22 passed.
- `bunx vitest run scripts`: 47 files, 7 failed | 229 passed | 1 skipped. The seven: NH-1/2/3 (the sandbox has no time-zone database — the limit turn K3 named; with TZDIR from nixpkgs tzdata: `Tests 6 passed (6)`), CF-SL-1/3/6 (timeouts under load; strings-layers.test.ts alone: `Tests 6 passed (6)`), EXH-21 (timeout; alone: `Tests 1 passed | 24 skipped (25)`).
- `bun scripts/e2e-failure-report.ts --self-test`: Self-test OK.
- A local dry run of the selection step (GITHUB_ENV in /tmp) chose, counted and cut correctly: REPEAT_EACH=2, 38 tests taken of 1081 (this sandbox's origin/main is old).
- Browser tests: none (no browser run owed).

## 8. THE CHECKS

- `git diff ebd91c10 --stat -- src e2e supabase AGENTS.md CLAUDE.md package.json bun.lock`: empty.
- eslint on the four TypeScript files: clean (exit 0). No non-null assertion added (the selector's existing ones at :344 and :351 are untouched).
- actionlint: not on this sandbox's path; not run. Both workflows parse as YAML (bun `yaml`), and the two new shell scripts pass `bash -n`.
- /tmp/observability/build-errors.log: no build in this turn touches app files.
- `bun run format:check` (prettier on every touched file), last: clean.

## 9. Knowledge

- **K1 census** (`grep -rn "eighteen\|range(1, 17)\|1\[0-6\]\|E2E_EXPECTED_SOURCES" .github scripts docs/features`, at BASE): ci.yml:485, ci.yml:495, ci.yml:590, flake-check.yml:136, local-backend-proof.yml:813, :845, :849, :903, :909, nightly-e2e.yml:187, scripts/e2e-failure-report.ts:2587, docs/features/ci-guards.md:271, :375, :623, :989, :1019, docs/features/ci-local-backend.md:661. Changed: ci.yml:485/:495 and every local-backend-proof.yml line.
- **K2 (not changed):** **ci.yml:590** — the merged `e2e` job's reporter lists the eighteen sources, so a failed repetition makes `e2e` red (through `needs.e2e-lanes.result`) but its failure body appears only in local-backend-last-failure.md, not in e2e-last-failure.md (brief C8 says the merged verdict needs nothing new; listed for the supervisor's ruling); flake-check.yml:136 and nightly-e2e.yml:187 (other workflows' own sources); scripts/e2e-failure-report.ts:2587 (the default when no list is given); docs/features/ci-guards.md:271, :375, :623, :989, :1019 (history of the shard counts); docs/features/ci-local-backend.md:661 (the numbered lanes 12 → 16, history).
- K3: the guard lands with the lane. K4–K6: do not arise.

## 10. Departures

1. **The supervisor's ruling (2026-10-28, before STEP 0):** `repeatPlan` stays in scripts/e2e-select.ts as Part D says; Knowledge's "pure utilities ONLY /src/lib" governs the app's code, not CI tooling; no file under src/ changes.
2. **fetch-depth** is `${{ matrix.lane == 'repeat' && '0' || '1' }}`, not the brief's unquoted `&& 0 || 1`: GitHub's expressions treat the number 0 as false, so the brief's form always yields 1 and the selector would have no history.
3. **The reporter's expected sources** read `…,16,repeat?` (the reporter's existing optional-source mark, DEC-023-B), not `repeat`: with nothing selected the lane writes no results.json, and a required source without one is counted "silent" and gating on any red run, naming the empty lane as a dead runner. A repeat lane that did run and died is still red through its job and its evidence fragment.
4. **The empty lane's count line** is the format every lane writes (`- Smoke: 0 passed · 0 failed · 0 flaky · 0 skipped · total 0`), not the brief's comma form; the summary reads both alike. "- Repeat: nothing to repeat" is written as stated.
5. **INC-964's text** carries `listings\_` where the brief has `listings_`: prettier's format:check escapes the underscore; the rendered text is the same.
6. Ordering of C4: after the first spec that does not fit, no later spec is taken ("while their test count fits").

## 11. Reviewer

Independent review on the final tree (self-run, fresh read of the diff): **READY**, no BLOCKER.
- MINOR: ci.yml:590 (K2 above).
- MINOR: the time-cap test matches Playwright's global-timeout message ("Timed out waiting …"); unproven here because no browser run is owed — the first capped run proves it.
- Found and fixed before landing: a selected spec whose every test the tags drop (for example a nightly `@global-state` spec) counted 0 tests and would have been passed to Playwright, which fails on "No tests found". Such specs are now skipped, and a selection left empty is "nothing to repeat".

## 12. Limits

No migration, no string, no product code, no package change, no browser test. actionlint not run. CI on this landing not read; the supervisor reads the run, whose repeat lane must say "nothing to repeat".
