# Foundations — turn 34e: completion report

Executor: Lovable. Brief: `docs/governance/briefs/foundations-turn-34e.md`.

## 1. Done, by part

- **Part A — done.** `git rev-parse HEAD` = `529655649246c6e364e69fe57f1655e29f5459eb` = BASE (<START>). ci-status.md, first six lines:

  ```
  # CI Status (auto-generated — do not edit by hand)

  - Commit: `529655649246c6e364e69fe57f1655e29f5459eb` (short `5296556`)
  - Conclusion: **SUCCESS**
  - Completed (UTC): 2026-10-27T13:54:34Z
  - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40512047787
  ```

  e2e-last-failure.md: "last E2E run 40512047787 passed". guards-last-failure.md: run 40512047787, commit 52965564, no failing job. Nothing to fix first.
- **STEP 0 — done.** sha256 `18f632558c713f2aff802abc374587a6ef96959c5ce5723dc46ae76a63d47ea6`, 68,687 bytes — a match.
- **Part B — done.** BLOCK 1 written; red on BASE (section 3).
- **Part C — done.** BLOCKS 2–3 and every workflow EDIT applied; `scripts/ci/with-deadline.sh` mode 755. Build log: `build OK`.
- **Part D — done.** D1 (roadmap line 3) and every D2 EDIT applied.
- **THE CHECKS — done** (section 4). **Reviewer — done** (section 7).

## 2. Files (`git diff --name-only <START>` plus new files)

.github/workflows/ci-status-report.yml, ci.yml, feed-bench.yml, flake-check.yml, guard-proof.yml, local-backend-proof.yml, nightly-e2e.yml, zap-baseline.yml; AGENTS.md; docs/_changelog.md; docs/features/ci-local-backend.md; docs/governance/mechanisms.md; docs/governance/briefs/foundations-turn-34e.md; roadmap.md; scripts/ci/with-deadline.sh; scripts/ci/with-deadline.test.ts; scripts/conformance/ci-deadlines.test.ts; this report.

## 3. Red first (BASE, BLOCK 1 only)

```
+ .github/workflows/ci-status-report.yml:19 job "report" declares no timeout-minutes
+ .github/workflows/ci-status-report.yml:219 job "sync-main" declares no timeout-minutes
+ .github/workflows/ci.yml:109 a step that reaches outside declares no timeout-minutes
+ .github/workflows/ci.yml:109 an install outside scripts/ci/with-deadline.sh: run: bun install --frozen-lockfile
+ .github/workflows/ci.yml:142 job "component-tests" declares no timeout-minutes
```
Count: 61. Totals: `Tests  1 failed | 1 passed (2)` — as the supervisor's run.

## 4. The checks

- Hash list `sha256sum -c`: all 15 lines OK.
- `git diff <START> --stat -- src e2e supabase`: empty.
- C3 `bunx vitest run scripts/conformance scripts/ci`: 24 files passed, 1 failed — CF-SL-1 (known limit INC-921) under load; alone: `Tests  6 passed (6)`. Otherwise 119 passed.
- `bun run lint`: `✖ 39 problems (0 errors, 39 warnings)`.
- `bun run test:unit`: `Test Files  329 passed (329)`, `Tests  2007 passed | 1 skipped (2008)`.
- actionlint: not on this sandbox's path — not run; CI's workflow lint judges the commit.
- `bun run format:check`: run last, clean.

## 5. None

Migrations: none. Strings: none. Product code: none. Browser tests: none (CI's own run on the commit is the end-to-end check).

## 6. K2 — outside calls the census's patterns do not see (listed, not changed)

- `.github/workflows/ci.yml:323` — `pip install "semgrep==${SEMGREP_VERSION}"`: no step deadline, not through the wrapper (the job carries its own deadline).
- `.github/workflows/ci.yml:326` — `git clone --depth 1 https://github.com/semgrep/semgrep-rules`: no step deadline.
- Actions that download: `oven-sh/setup-bun@v2` (ci.yml:65, 151, 182, 199, 225, 292, 385 and the other workflows), `actions/setup-node@v5` (ci.yml:280), `actions/setup-python@v5` (ci.yml:319), `gitleaks/gitleaks-action@v3` (ci.yml:172); bounded only by their job's deadline.

## 7. Reviewer

Verdict: **READY**. No BLOCKER and no MAJOR in SCOPE. MINOR: the census sees `bun install`, `playwright install`, `apt-get`, `curl` and `supabase start`, but not `pip install` or `git clone`. The two lines above are bounded by their job's deadline only; they are left for a later turn. Hand check: `bash scripts/ci/with-deadline.sh` with no arguments prints its usage and exits 2.

## 8. Departures

- The committed applier (`scripts/brief/apply-blocks.sh`) could not be used. It reads SCOPE from the brief in force (roadmap line 3 still named records turn R4 until Part D), and it does not parse the brief's `BLOCK n — FILE-BEGIN` prefix. So the blocks were copied by a one-off script in /tmp using the applier's own block pattern, with each OLD text checked to be found exactly once. The hash list proves the result. Nothing was retyped.
- The first run of that script stopped at BLOCK 2 because `scripts/ci/` did not exist yet. Every EDIT before it had been applied. After creating the directory, only BLOCKS 2–3 were applied. The hashes confirm every file.

## 9. Limits

- CF-SL-1 timed out under the C3 load and passed alone (INC-921).
- actionlint was not available.
- The new workflows run for the first time on CI. I have not seen that run. The supervisor reads it.
