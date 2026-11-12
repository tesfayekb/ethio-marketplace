STOP — housekeeping-3 STEP 9: the smoke lane's outbound-calls guard no longer finds the CLI pin (Part E)
DONE: parts A, B, C, D, E, F (commits 3cc79e92a, 9ad29b413, 3e2063e83, c63c2e3c5, 071dbfefc, c7306e1b1); STEP 8 (the checks, below); STEP 9's push (a10a525a6) and its CI read
LEFT: the red's fix (it needs a file outside SCOPE); STEP 9's green; the self-review; STEP 10 (the report and its docs-only push)
CI: the last commit read, a10a525a6, from `docs/tracking/ci-status.md` on ci-evidence (dev's status reporter, as ruling 1 Q7 said):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `a10a525a665c06b03f74ae2244bfff1bf846d6a3` (short `a10a525`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-11T23:26:59Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43116753764
```

Two-step SHA check: the file's commit is a10a525a6 = `git rev-parse HEAD` of the pushed lane before this
stop report = the pull request's head at the read. The run: 38 jobs, 35 success, 2 failure ("E2E lanes /
Lane smoke on temporary Supabase" and the merged "E2E (Playwright, ethio-staging)"), 1 skipped
(promote, not dev); `gh pr checks 34`: 40 pass, 2 fail, 1 skipping.

FILES: this turn's, `git diff --name-only e295dc131` (the lane head this turn began from), 51 paths before
this file:

```
.github/workflows/ci-status-report.yml
.github/workflows/ci.yml
.github/workflows/feed-bench.yml
.github/workflows/flake-check.yml
.github/workflows/guard-proof.yml
.github/workflows/local-backend-proof.yml
.github/workflows/nightly-e2e.yml
docs/features/ci-guards.md
docs/features/ci-local-backend.md
docs/features/ci-status-reporter.md
docs/features/e2e-harness.md
docs/features/guard-proof.md
docs/features/nightly-e2e.md
docs/governance/briefs/housekeeping-3-ruling-1.md
docs/governance/briefs/housekeeping-3.md
docs/governance/reports/housekeeping-3.stop-1.md
docs/tracking/branches/README.md
roadmap.md
scripts/check-promote-needs.sh
scripts/ci/backend-config.py
scripts/ci/backend-config.test.ts
scripts/ci/checks-cache.ts
scripts/ci/docs-only.test.ts
scripts/ci/docs-only.ts
scripts/ci/install-browser-deps.sh
scripts/ci/install-browser-deps.test.ts
scripts/ci/lane-failure-evidence.test.ts
scripts/ci/laws-changed.ts
scripts/ci/redact.py
scripts/ci/redact.test.ts
scripts/ci/turn-checks-allowlist.txt
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/ci-deadlines.test.ts
scripts/conformance/ci-images.test.ts
scripts/conformance/db-proof.test.ts
scripts/conformance/wired.test.ts
scripts/db-proof.sh
scripts/e2e-failure-report.test.ts
scripts/e2e-failure-report.ts
scripts/fixtures/ci-promote-needs-bad.yml
scripts/fixtures/docs-only/jobs-green-43103925609.json
scripts/fixtures/docs-only/jobs-red-43033934604.json
scripts/fixtures/docs-only/runs-8511aeed9.json
scripts/fixtures/install-deps-fetch-failure.txt
scripts/fixtures/install-deps-success.txt
scripts/fixtures/lane-step-failure.install.txt
scripts/fixtures/lane-step-failure.smoke.txt
scripts/publish-evidence.selftest.sh
scripts/publish-evidence.sh
scripts/publish-evidence.test.ts
docs/governance/reports/housekeeping-3.stop-2.md (this file)
```

(`git diff --name-only 2b11a9d29` prints 295 paths before this file: the bundle's turns 1, 1b, lockfile
and 2 on this lane, plus the 51 above; `git merge-base origin/dev HEAD` = 2b11a9d29 = `origin/dev`,
read again at this stop, so the base is exact and dev has not moved.)

## The red — what the lane printed

The smoke lane's step `outbound-calls-guard` failed; every other lane passed (the evidence head: Passed
2598 · Skipped 334 · Failed 0; "Sources without results: smoke"). Its step file, as the E2E evidence
at `docs/tracking/branches/cursor/housekeeping/e2e-last-failure.md` on ci-evidence quotes it:

```
Outbound-calls guard FAIL: allowlist: the CLI pin is unreadable
Outbound-calls guard FAIL: allowlist: supabase_functions.http_request() expired (CLI 2.120.0, pin CLI unknown)
Outbound-calls guard FAIL: supabase_functions.http_request(): calls net.* outside job_call
Step outbound-calls-guard: outcome failure
::error::Outbound-calls guard failed (INC-981); the lines are in local-backend-proof.md
```

The brief's TOLERANCES make this a STOP: the failure names the CLI pin, a path this turn changed (Part E,
the pin read once). It is not INFRA and not a test red; it is this turn's defect.

## The cause

`scripts/check-outbound-calls.ts` :94 → :96 finds the CLI pin by the FORM of the setup-cli step's line:

```
const pin = /^\s*version: (\d+\.\d+\.\d+)$/m.exec(
  readFileSync(".github/workflows/local-backend-proof.yml", "utf8"),
)?.[1];
```

Part E (071dbfefc, ruling 1 Q15) made both setup-cli steps read `version: ${{ env.SUPABASE_CLI_VERSION }}`
(local-backend-proof.yml :65 and :313; at e295dc131 they read `version: 2.120.0` at :65 and :319), so
the pattern matches nothing: the pin becomes "unknown", the allowlist's one line
(`scripts/conformance/outbound-calls-allowlist.txt` :3, `… | CLI 2.120.0`) reads as expired, and its
caller `supabase_functions.http_request()` is refused. Measured read-only with `bun -e` on the files:
the pattern finds `2.120.0` in e295dc131's workflow and `none` in today's; the one pin's own form
`/^ {2}SUPABASE_CLI_VERSION: (\S+)$/m` finds `2.120.0` in today's.

The census missed it. My census for concern 5 (b) looked for the literal (`2.120.0`, four copies) and
for readers of `SUPABASE_CLI_VERSION`, not for every reader of the pin by definition; this reader
reads the pin through the line the brief named as the bypass. The guard runs only in the smoke lane
(`docs/features/scheduled-jobs.md` :33), never in `bun run checks` or the scripts suite, so nothing
local could fail. A census of every reader of `local-backend-proof.yml` under `scripts/`, `src/` and
`e2e/` (`rg -n "local-backend-proof\.yml" scripts src e2e`) finds this file as the only one that reads
the pin by any form other than the `SUPABASE_CLI_VERSION:` line. db-proof.sh :63, CF-DBP-1 :130,
CF-CI-IMG-5 :160 and LFE-3 :96 all read that line.

## What I need — the fix needs one file outside SCOPE

`scripts/check-outbound-calls.ts` is not in the brief's SCOPE or ruling 1's §B. The fix I propose
(answer (a)):

1. `scripts/check-outbound-calls.ts` reads the one pin: an exported `cliPin(workflowText)` returning
   `/^ {2}SUPABASE_CLI_VERSION: (\S+)$/m`'s capture (the form db-proof.sh, CF-DBP-1 and CF-CI-IMG-5
   read), used at :94; no other change to the guard.
2. `scripts/conformance/ci-images.test.ts` (in SCOPE): CF-CI-IMG-6 (new; free —
   `rg -n "CF-CI-IMG-6" scripts src e2e` → none) asserts `cliPin` of the real workflow equals the pin
   CF-CI-IMG-5 reads, and that a planted workflow without the line answers none. Red first on
   a10a525a6's guard (today's pattern answers none on the real workflow), green after. Named in
   `wired.test.ts`.
3. While there, in `.github/workflows/ci.yml` (in SCOPE): the Verdict step's TESTS text names
   `docs/tracking/e2e-last-failure.md`, which after DEC-321 is dev's path only. It would print the
   path through `bash scripts/publish-evidence.sh --print-path "$EVIDENCE_REF" e2e-last-failure.md`
   (Part C's one mapping). This is optional; the ruling says whether it lands here or goes to §13.

The alternative (b) — the two setup-cli steps back to the literal `version: 2.120.0` — undoes Q15's
"the literal appears once" and CF-CI-IMG-5; I do not recommend it.

Whichever answer lands goes in one commit; then the checks run whole, one push, and the wait. That
push's run is the judged run. The report push stays the docs-only live case.

## What this stop's own push will do

This stop report's push will run the lanes again and the smoke lane will red by the same cause. Its
`before` is a10a525a6, whose run failed, so DEC-365's walk passes over it (and over the five Part
commits, which have no run) to 8511aeed9's green run, whose diff to this push holds code. That run is
expected, not a new finding; the walk took the safe side, as Q9 and Q10 intend.

## What the run already shows (for the report)

- STEP 8 (on c7306e1b1, then the docs commit a10a525a6 below): `bun run typecheck` exit 0; `bun run
  checks` → `checks (fast): 25 PASS · 0 FAIL · 395s — …` and `checks: 34 PASS · 0 FAIL · 25 NOT RUN ·
  450s`. Among the NOT RUN lines: `scope › Decide whether the lanes run` (GitHub-only; CF-DOCS-1…6),
  actionlint and gitleaks (linux/x64 binaries; this machine darwin/arm64), and the audit and staging
  preflight (no service or credential). `bun scripts/brief/check-go.ts
  docs/governance/briefs/housekeeping-3.md` on the final tree prints 5 findings: CF-BRIEF-6 twice
  (anchors ci-status-report.yml :213 and laws-changed.ts :126 hold other text, because Parts C and F
  edited those files) and CF-BRIEF-7 three times (CF-INSTALL-1, DEC-366 and CF-DOCS-1 "already used",
  by this turn's own work). On the base tree, at STEP 0, it printed `[check-go] no finding`.
- One commit after Part F: a10a525a6 `housekeeping-3: the harness page names the per-ref proof
  evidence` (`docs/features/e2e-harness.md` :596 → :600, the proof's evidence path per ref — the
  self-review's finding, docs only).
- DEC-365, the first live decision (the `scope` job's log, job 130846609937): `DEC-365 lanes: ran —
  not docs-only: .github/workflows/ci-status-report.yml is not a record (40 of 48 paths; diff base
  8511aeed96f5ca9c2cba453176ab4b6fbe757a85, push base 8511aeed96f5ca9c2cba453176ab4b6fbe757a85)`; the
  same line heads the E2E evidence as `- Lanes:`.
- DEC-321: `docs/tracking/branches/cursor/housekeeping/e2e-last-failure.md` and
  `…/local-backend-proof.md` exist on ci-evidence with the run's merge commit 1959f7764; the branch
  `ci-status.md` does not exist yet (404) and the root `ci-status.md` names a10a525a6 — dev's status
  reporter until the merge, as Q7 and Q12 said.
- Part B: the smoke source reads `smoke: no results file … Failed step: outbound-calls-guard` with no
  INFRA mark (the guard is not in `INFRA_STEP_IDS`, rightly), and the Verdict printed `E2E failed — see
  docs/tracking/e2e-last-failure.md` (the TESTS text).
- Part A: no lane died at the install step. Eighteen lanes ran it and succeeded; the smoke lane's
  install step was skipped after its guard failed (the run's jobs API, the step named "… system
  libraries"). The script is judged only by what it prints when a mirror fails (STEP 9).
