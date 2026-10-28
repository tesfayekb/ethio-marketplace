# Foundations — turn K5: the repeat lane repeats what a push changed first (INC-967), and its evidence reaches the merged report (INC-966): brief (saved unchanged, 2026-10-28)

```text
FOUNDATIONS — TURN K5 (2026-10-28; G0; INC-966, INC-967; DEC-283's lane; anchors located at a566ac17). Lovable. SPEC-BUILT: this brief states the behaviour, the constraints and the tests; you write the code. The supervisor verifies by a full diff review, the guards below and CI's run on your commit. Tier B (CI infrastructure; no product code, no migration, no string, no package change).

BASE: a566ac17
CI ON BASE: the run on a566ac17 (turn C3's landing) had not completed when this brief was written; the last completed run, on 4907c2b8, was SUCCESS (run 40738433855)

FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
.github/workflows/**
scripts/**
docs/features/**
docs/tracking/incidental-findings.md
SCOPE-END
(G60: the scope is by area; your PLAN narrows it to the files you will change, and the supervisor's approval of the plan is the file list.)

THE SYSTEM (G0)
CONCERN: every changed browser test is repeated inside the normal CI run (DEC-283) — and when the budget cannot carry all, what the push changed itself is repeated first.
MECHANISM: the repeat lane (.github/workflows/local-backend-proof.yml, step "Select the specs to repeat (DEC-283)" :94) fed by `repeatSpecs` (scripts/e2e-select.ts :426) and `repeatPlan` (:453); the lane's cap check is inline Python in the workflow (:678, `'Timed out waiting' in e`).
CONSUMERS (grep of a566ac17): the selector's `--repeat` output (:512); the workflow's take loop over repeat-counts.txt (:117–:140); the lane reporter's sources (local-backend-proof.yml, `repeat?`) and the merged report's E2E_EXPECTED_SOURCES (ci.yml :590 — no `repeat`); RPL-1…3 (scripts/conformance/repeat-lane.test.ts).
COVERED HERE: all. LEFT: none.
CONFORMANCE GUARD: RPS-6… (ranking), RCAP-1… (the cap's reading), RPL-1 widened (the merged report names the repeat lane; the cap is read by scripts/ci/repeat-cap.ts, not inline).
EXCEPTIONS: none.
FIVE LENSES — security: none · performance: no change to the lane's budget (720 s) or the run's wall clock · failure modes: a capped run with no failed test stays green and lists what was not repeated; a cap message the script cannot read is red, never green · consistency: one reader of the cap, tested · future growth: the ranking is one function; a third tier (e.g. specs of changed src areas) is one more rank.
FORWARD-SCAN: none. REGISTER: the supervisor updates the repeat lane's row in its records turn.

PLAN FIRST (G60). This brief arrives first in plan mode: change nothing, and report, from the real tree at BASE: (1) every file and test the two concerns touch — the selector and its tests, every step of local-backend-proof.yml that reads or writes the repeat lane's selection, evidence or cap, every place in ci.yml and scripts/ that lists or parses the lanes' sources, the guard RPL-1…3, and the docs that describe the lane; (2) any existing code that already ranks, orders or caps the repeat lane's specs (so nothing is built twice); (3) the exact template of Playwright's global-timeout message in the installed package (file:line, pasted); (4) any conflict of this brief with your Knowledge or AGENTS.md; (5) the file list you propose. The supervisor answers with one ruling that approves the file list; then this same brief is sent again for the build, and you begin at STEP 0.

STEP 0 — save this brief (the text between BRIEF-BEGIN and BRIEF-END, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-k5.md by a scripted copy (never retyped), and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). Then roadmap.md line 3, by hand: the text `docs/governance/briefs/foundations-turn-c3.md (Foundations turn C3: the browser client in tests reached one way, INC-959; INC-937's residue; turn C2's review; the owed docs and small guards; the supervisor's brief checks as conformance tests)` becomes `docs/governance/briefs/foundations-turn-k5.md (Foundations turn K5: the repeat lane repeats what a push changed first — INC-967; its failures reach the merged report and its cap is read by a tested script — INC-966)` (everything after it stays). No other roadmap line changes.

HOW TO WORK
- Order: Part A, STEP 0, Parts B–E, THE CHECKS, the reviewer, THE COMPLETION REPORT, END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with `git diff --name-only <START>`; the supervisor sends "continue".
- Run no stateful git command (the platform commits). Read CI only at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/<file>.
- THE FILES: SCOPE, plus docs/governance/briefs/foundations-turn-k5.md, roadmap.md, docs/_changelog.md and docs/governance/reports/foundations-turn-k5.report.md. Anything else is a STOP naming the file and why.
- Your platform rule stands: do not run builds or typechecks by hand; read /tmp/observability/build-errors.log and fix every `error TS` line in this turn's files at its root. Local runs: the unit tests each part names; `bunx eslint` on this turn's TypeScript files; actionlint if on your path. No browser run is owed.
- RED FIRST (G38): RPS-6… against BASE's selector, RCAP-1… against the inline reading's rule (or on a planted case), RPL-1's new rules against BASE's workflow — shown, never committed.
- The reviewer after THE CHECKS; a BLOCKER is fixed and reviewed again; MAJOR and MINOR listed for the supervisor.
- If any rule of yours conflicts with this text, STOP before saving and quote it.

PART A — CI FIRST. Paste the first six lines of ci-status.md and the repeat lane's lines of local-backend-proof.md. A red other than none known is a STOP that names it.

PART B — THE RANKING (INC-967; scripts/e2e-select.ts, scripts/e2e-select.test.ts). `repeatSpecs` returns two ranks in order: first every spec file the push changed itself (sorted), then every spec that imports a changed e2e helper and was not changed itself (sorted); no duplicates. `--repeat` prints them in that order, one per line, and a second line set `--repeat --ranks` (or an equivalent you name) gives the workflow the rank of each. RPS-6: a push that changes one spec and one helper lists the changed spec first even when the helper's importers sort before it. RPS-7: a spec both changed and importing the helper appears once, in the first rank. Red first, then green; `bunx vitest run scripts/e2e-select.test.ts` — paste.

PART C — THE TAKE ORDER (local-backend-proof.yml, the selection step). The take loop keeps the selector's order (rank one before rank two) and, inside the budget, takes rank one's specs before any of rank two's; a spec too large for what is left is skipped and the next one tried (as today). The evidence line adds "directly changed: <taken> of <n> repeated; importers of a changed helper: <taken> of <m>". Each step keeps its deadline (CF-CID-1).

PART D — THE CAP'S READING AND THE MERGED REPORT (INC-966). D1. The inline cap check (:678) moves to scripts/ci/repeat-cap.ts: given the Playwright report's top-level errors, it answers "capped" only when every error is Playwright's global-timeout message — its exact template, read from the installed package (node_modules/playwright/lib/runner/taskRunner.js :91: `Timed out waiting ${seconds}s for the ${task} to run`, with the ANSI colour codes Playwright adds — paste the line you read) — and otherwise "failed"; a message it cannot read is "failed", never "capped". RCAP-1… unit tests with fixtures built from that template (coloured and plain), a different error, a mix, and none. The workflow calls the script. D2. ci.yml :590: E2E_EXPECTED_SOURCES gains `repeat?` (the optional form the lane reporter uses since turn K4), so a failed repetition's body reaches docs/tracking/e2e-last-failure.md; its comment says why. D3. RPL-1 gains: the merged report names `repeat?`; no inline `'Timed out waiting'` remains in the workflow; planted copies for both (RPL-2). `bunx vitest run scripts/ci/repeat-cap.test.ts scripts/conformance/repeat-lane.test.ts scripts/conformance/ci-deadlines.test.ts` — paste.

PART E — THE RECORDS. docs/features/e2e-harness.md: the repeat lane's paragraph says the ranking and the cap's reader (your words, one or two sentences). docs/tracking/incidental-findings.md: a dated later word under INC-966 and under INC-967: "FIXED in Foundations turn K5 (<test ids>)." docs/_changelog.md: one line for the turn.

THE CHECKS (in this order): `git diff <START> --stat -- src e2e supabase AGENTS.md CLAUDE.md package.json bun.lock` (empty); `bunx eslint scripts/e2e-select.ts scripts/e2e-select.test.ts scripts/ci/repeat-cap.ts scripts/ci/repeat-cap.test.ts scripts/conformance/repeat-lane.test.ts` (clean); `bunx vitest run scripts` (paste the totals; the known limits of turn K4 apply — NH-1/2/3 without a time-zone database, CF-SL, EXH-21: run each that fails alone and paste both lines); actionlint's last line or why it did not run; `bun run format:check` last.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-k5.report.md (and its summary in chat): done or not done by part; `git diff --name-only <START>`; every red-first line and test total; the Playwright line you read; K2 (any other place that reads Playwright's messages by text, file:line); the reviewer's verdict and findings; departures with reasons; the first six lines of ci-status.md for the last commit you can read. END THE TURN; the supervisor reads the run.
```
