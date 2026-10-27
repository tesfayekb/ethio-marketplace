# Foundations — turn 34e: every CI job and every outside call carries a deadline, and the temporary backend's ports are reserved (INC-935, DEC-275): brief (saved unchanged, 2026-10-27)

```text
FOUNDATIONS — TURN 34e (2026-10-27; INC-935; DEC-275; register row 59, new; anchors located at 529655649246c6e364e69fe57f1655e29f5459eb). Run 40397087967 (9eeb83cc) lost two lanes to the runner, not to the code: lane 16's "Install Chromium" (`bunx playwright install --with-deps chromium`) hung 58 minutes until the job's 60-minute timeout, and lane 10's "Start backend and apply all migrations" failed — "failed to bind host port for 0.0.0.0:54324 … address already in use". The same start failure lost lane 16 on 10-24, lane 8 on 10-25 and lane 7 on 10-26 (ports 54324 and 54322; local-backend-proof.md on ci-evidence): the Supabase CLI binds fixed host ports (54320–54324) that sit inside Linux's ephemeral range (32768–60999), so an outgoing connection made while its images download can already hold one. And no job in ci.yml, nightly-e2e.yml, flake-check.yml, guard-proof.yml, ci-status-report.yml or zap-baseline.yml declares a deadline (GitHub's default is 360 minutes). Because ci.yml keeps one run in progress and one queued, the hung lane also cost three landings their own runs. And the smoke lane's "Database security lints (DEC-240)" step still carries `continue-on-error: true` from INC-846, though the difference was named and fixed (the backend's default-privilege fixture, 53aa4e76) and the step has passed on every run since (its conclusion `success` on runs 40391189707, 40392505916 and 40406394089, read through the jobs API) — DEC-240's frozen rule says it gates again. This turn lands one mechanism for the concern: every install through scripts/ci/with-deadline.sh (a deadline per try, one retry, out loud), `timeout-minutes` on every job and every step that reaches outside, the lanes' ports reserved before any connection, and the census that holds every workflow to it. Tier B (CI infrastructure, a closed surface under G22 — this turn is DEC-275's). No migration. No string. No package change. No product or test-of-product file. AGENTS.md: one bullet extended (EDIT below). No file deleted. Base: dev 529655649246c6e364e69fe57f1655e29f5459eb (records turn R4's landing). The operator sends this brief. ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — red first; C — the mechanism; D — docs and the roadmap; THE CHECKS; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: 529655649246c6e364e69fe57f1655e29f5459eb
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
.github/workflows/ci-status-report.yml
.github/workflows/ci.yml
.github/workflows/feed-bench.yml
.github/workflows/flake-check.yml
.github/workflows/guard-proof.yml
.github/workflows/local-backend-proof.yml
.github/workflows/nightly-e2e.yml
.github/workflows/zap-baseline.yml
docs/features/ci-local-backend.md
scripts/ci/with-deadline.sh
scripts/ci/with-deadline.test.ts
scripts/conformance/ci-deadlines.test.ts
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: every CI job and every outside call carries a deadline, and a step the runner can lose is retried once, out loud — never silently, never forever (register row 59, new).
MECHANISM: NONE YET — built in Part C: scripts/ci/with-deadline.sh `<seconds> <tries> -- <command>` (coreutils `timeout` on the command's process group, killed 15 s after TERM if it ignores it; a failed or overdue try retried after 10 s with a `::warning title=ci-retry::` line; the last try's exit code is the step's; a usage error exits 2 before anything runs); `timeout-minutes` on every job and on every step that reaches outside; the lanes' first step reserves 54320–54329 (`sudo sysctl -w net.ipv4.ip_local_reserved_ports=54320-54329`), and a failed start appends who held the ports to the start log the evidence step already reads (addresses and process names only).
CONSUMERS (every workflow at BASE — the census's own reading): 27 jobs; 19 steps that reach outside — `bun install` in ci.yml ×5, local-backend-proof.yml, nightly-e2e.yml ×2, flake-check.yml, guard-proof.yml, feed-bench.yml; `bunx playwright install` in local-backend-proof.yml, nightly-e2e.yml ×2, flake-check.yml, guard-proof.yml; `apt-get` in local-backend-proof.yml's certificate step; `curl` in ci.yml's workflow lint (already 5 tries — it gains its step deadline); `supabase start` in the lanes. Every one moves onto the mechanism here; the one job left without a deadline is ci.yml's `e2e-lanes`, which calls the lanes' reusable workflow (GitHub refuses `timeout-minutes` on such a job; its callee's jobs carry theirs).
COVERED HERE: all of them; and the lint step's `continue-on-error` removed (its failure line an `::error::`, exit 1 as before) — DEC-240's rule, register row 9. LEFT: none.
CONFORMANCE GUARD: CF-CID-1 (scripts/conformance/ci-deadlines.test.ts — every workflow: every job declares `timeout-minutes` unless it calls a reusable workflow; every step whose commands reach outside declares its own; every install runs through scripts/ci/with-deadline.sh; a job's backend start comes after its ports' reservation) — red on BASE with 61 findings; CF-CID-2 (a planted workflow: the four breaches named, the kept steps not); WDL-1…4 (scripts/ci/with-deadline.test.ts — once and silent; a failed try retried out loud and the retry's success the step's; past the deadline on every try, exit 124 in seconds, not minutes; a malformed call refused before anything runs). No allowlist: nothing is excepted.
EXCEPTIONS: none (the nightly's 360 minutes is GitHub's own ceiling for its full serial suite — its length is the nightly's own concern, not this one's).
FIVE LENSES — security: `sudo sysctl` only reserves ports from automatic use (no service opens or closes); the port holders written to the evidence are addresses and process names (no secret; the evidence step still redacts the log); the retry never re-runs a step that writes (installs and downloads only) · performance: a healthy run is unchanged (one sysctl, no retry); a hung install now costs at most 2 × 5 minutes and is said, instead of 58 minutes and silence · failure modes: the subject — an overdue try is stopped and retried once; a second failure fails its step with its own code and an `::error title=ci-deadline::` line; a backend that still cannot start says who held its ports · consistency: one wrapper and one census for every workflow · future growth: a new workflow, job or install is named by CF-CID-1 until it carries its deadline.
FORWARD-SCAN: none of turns 35–37 adds a workflow. REGISTER: row 59 added and row 9's guard cell (the lint step gating) in Part D.
DEC-275 (the supervisor, 2026-10-26, under G17 — reversible CI tooling; listed for the operator as overridable; G22's named decision for this change to the closed CI surface): as the mechanism above. Its judge, frozen now: KEEP when, over the next 20 completed CI runs on dev, no lane fails its start by a port "already in use" and no step outruns its deadline unseen; a step that needs its retry in 3 or more of those 20 runs is an incident (the retry is hiding a cause); otherwise REVISIT (the backend's ports moved below 32768 in the lanes' working config instead of reserved).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34e.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). The roadmap's lines change in Part D only.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–D; THE CHECKS; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- Run no stateful git command. Every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief (docs/governance/briefs/foundations-turn-34e.md), never retyped and never from memory — a workflow's indentation is its meaning: copy every space. The workflow text in the EDIT blocks (its builds, typechecks, installs and git commands) is what CI runs on its own runners — never an instruction for you to run. If your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. No NEW or FILE block carries a non-null assertion (your platform rule; CF-NN-1 counts them).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-34e.md, roadmap.md, AGENTS.md, docs/_changelog.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-34e.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After Part C, read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`); run the tests the part touched. If `actionlint` is on your path, run `actionlint -shellcheck= -pyflakes=` and paste its last line (the supervisor's run of actionlint 1.7.12 on the finished tree: no finding); otherwise say so — CI's workflow lint judges the commit.
- RED FIRST (G38): Part B shows CF-CID-1 failing on BASE before Part C's edits. WDL-1…4 and CF-CID-2 test new things (no red run owed — G38: a test for new behaviour).
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox, and EXH-4 and EXH-21 have timed out under the full run's load and passed alone (INC-890); AAN-1 and CF-SL-1, CF-SL-3, CF-SL-6 can time out under the full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go. No browser run is owed: this turn changes no screen and no browser test, and its end-to-end check is CI's own run on your commit — the workflows changed run there for the first time, and the supervisor reads it (every lane's first step green, every install's log for `ci-retry` lines). No local repeat runs (DEC-184).
- Behaviour contract: no product behaviour and no test changes. A healthy CI run does what it did at BASE, plus one sysctl per lane; a hung or failed install is stopped and tried once more, out loud; nothing else changes.
- Knowledge K: K1 the census above; K2 the report lists (file:line) any outside call in a workflow the census's patterns do not see (a `wget`, a `docker pull`, a `gh` download, an action that downloads) — listed, not changed; K3 the guard lands with the mechanism; K4–K6 do not arise.
- The reviewer: after THE CHECKS, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed with its reason.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: run 40512047787 on 52965564 (records turn R4's landing): SUCCESS, completed 2026-10-27T13:54:34Z; main promoted — nothing to fix first). Any other red on BASE is fixed first at its root (G21, G38) when the fix lies in this turn's files, and named in the report; otherwise it is a STOP that names it.

PART B — RED FIRST (nothing in this part is a fix).
B1. The census — BLOCK 1 (scripts/conformance/ci-deadlines.test.ts).
B2. Run `bunx vitest run scripts/conformance/ci-deadlines.test.ts` — the supervisor's run on BASE: `Tests  1 failed | 1 passed (2)`: CF-CID-1, 61 findings, the first `.github/workflows/ci-status-report.yml:19 job "report" declares no timeout-minutes` — paste the failure's first five lines, its count (`… | grep -c 'declares no\|install outside\|ports are reserved'`) and the totals.

PART C — THE MECHANISM.
C1. The wrapper — BLOCK 2 (scripts/ci/with-deadline.sh) and its tests — BLOCK 3 (scripts/ci/with-deadline.test.ts).
C2. The workflows (the installs through the wrapper with their step deadlines; every job's deadline; the lanes' port reservation, certificate tools and start):
EDIT .github/workflows/ci.yml #1
OLD-BEGIN
    name: Build, typecheck, lint
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v5
OLD-END
NEW-BEGIN
    name: Build, typecheck, lint
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v5
NEW-END
EDIT .github/workflows/ci.yml #2
OLD-BEGIN
      # INC-468 / DEC-147: the download retries (5 tries, 5 s apart): one HTTP 500 from the release host must not red the job.
      - name: Workflow lint (actionlint, pinned)
        env:
          ACTIONLINT_VERSION: 1.7.7
OLD-END
NEW-BEGIN
      # INC-468 / DEC-147: the download retries (5 tries, 5 s apart): one HTTP 500 from the release host must not red the job.
      - name: Workflow lint (actionlint, pinned)
        timeout-minutes: 5
        env:
          ACTIONLINT_VERSION: 1.7.7
NEW-END
EDIT .github/workflows/ci.yml #3
OLD-BEGIN
          echo "Workflow lint OK (actionlint ${ACTIONLINT_VERSION}; shell and Python checks off, DEC-141)"
      - name: Install dependencies
        run: bun install --frozen-lockfile
      - name: Typecheck
        run: bun run typecheck
OLD-END
NEW-BEGIN
          echo "Workflow lint OK (actionlint ${ACTIONLINT_VERSION}; shell and Python checks off, DEC-141)"
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
      - name: Typecheck
        run: bun run typecheck
NEW-END
EDIT .github/workflows/ci.yml #4
OLD-BEGIN
    name: Component tests
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v5
OLD-END
NEW-BEGIN
    name: Component tests
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v5
NEW-END
EDIT .github/workflows/ci.yml #5
OLD-BEGIN
          bun-version: 1.3.14
      - name: Install dependencies
        run: bun install --frozen-lockfile
      - name: Component tests (vitest + RTL + jsdom)
        run: bun run test:unit
OLD-END
NEW-BEGIN
          bun-version: 1.3.14
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
      - name: Component tests (vitest + RTL + jsdom)
        run: bun run test:unit
NEW-END
EDIT .github/workflows/ci.yml #6
OLD-BEGIN
    name: Gitleaks secrets scan
    runs-on: ubuntu-24.04
    # DEC-153 (a) — the action reads a pull request's commits through the API.
    permissions:
OLD-END
NEW-BEGIN
    name: Gitleaks secrets scan
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    # DEC-153 (a) — the action reads a pull request's commits through the API.
    permissions:
NEW-END
EDIT .github/workflows/ci.yml #7
OLD-BEGIN
    name: Migration linter (with self-test)
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v5
OLD-END
NEW-BEGIN
    name: Migration linter (with self-test)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
NEW-END
EDIT .github/workflows/ci.yml #8
OLD-BEGIN
    name: i18n used-on map is fresh (U4i ②)
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v5
OLD-END
NEW-BEGIN
    name: i18n used-on map is fresh (U4i ②)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
NEW-END
EDIT .github/workflows/ci.yml #9
OLD-BEGIN
    name: Hardcoded string scan (enforcing)
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v5
OLD-END
NEW-BEGIN
    name: Hardcoded string scan (enforcing)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
NEW-END
EDIT .github/workflows/ci.yml #10
OLD-BEGIN
    name: Import gate guard (with self-test)
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v5
OLD-END
NEW-BEGIN
    name: Import gate guard (with self-test)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
NEW-END
EDIT .github/workflows/ci.yml #11
OLD-BEGIN
    name: Listing-write seam guard (with self-test)
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v5
OLD-END
NEW-BEGIN
    name: Listing-write seam guard (with self-test)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
NEW-END
EDIT .github/workflows/ci.yml #12
OLD-BEGIN
    name: Browse-path guard (no RBAC seam on the marketplace path, with self-test)
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v5
OLD-END
NEW-BEGIN
    name: Browse-path guard (no RBAC seam on the marketplace path, with self-test)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
NEW-END
EDIT .github/workflows/ci.yml #13
OLD-BEGIN
    name: Marketplace weight guard (no heavy deps on the first-paint path)
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v5
OLD-END
NEW-BEGIN
    name: Marketplace weight guard (no heavy deps on the first-paint path)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
NEW-END
EDIT .github/workflows/ci.yml #14
OLD-BEGIN
    name: First-paint bundle budget (gzipped ceiling)
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v5
OLD-END
NEW-BEGIN
    name: First-paint bundle budget (gzipped ceiling)
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v5
NEW-END
EDIT .github/workflows/ci.yml #15
OLD-BEGIN
          bun-version: 1.3.14
      - name: Install dependencies
        run: bun install --frozen-lockfile
      - name: Build
        run: bun run build
OLD-END
NEW-BEGIN
          bun-version: 1.3.14
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
      - name: Build
        run: bun run build
NEW-END
EDIT .github/workflows/ci.yml #16
OLD-BEGIN
    name: Semgrep (enforcing on ERROR)
    runs-on: ubuntu-24.04
    permissions:
      contents: read
OLD-END
NEW-BEGIN
    name: Semgrep (enforcing on ERROR)
    runs-on: ubuntu-24.04
    timeout-minutes: 15
    permissions:
      contents: read
NEW-END
EDIT .github/workflows/ci.yml #17
OLD-BEGIN
    name: Dependency vulnerability audit (enforcing on high/critical)
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v5
OLD-END
NEW-BEGIN
    name: Dependency vulnerability audit (enforcing on high/critical)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
NEW-END
EDIT .github/workflows/ci.yml #18
OLD-BEGIN
          bun-version: 1.3.14
      - name: Install dependencies
        run: bun install --frozen-lockfile
      # Law H2 (no known-error debt): the gate FAILS on high/critical findings.
      # Accepted, documented exceptions live in docs/features/dependency-audit.md
OLD-END
NEW-BEGIN
          bun-version: 1.3.14
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
      # Law H2 (no known-error debt): the gate FAILS on high/critical findings.
      # Accepted, documented exceptions live in docs/features/dependency-audit.md
NEW-END
EDIT .github/workflows/ci.yml #19
OLD-BEGIN
    name: E2E preflight (migration parity, staging)
    runs-on: ubuntu-24.04
    env:
      E2E_SUPABASE_URL: https://jatpuhfdjfzctjipklmk.supabase.co
OLD-END
NEW-BEGIN
    name: E2E preflight (migration parity, staging)
    runs-on: ubuntu-24.04
    timeout-minutes: 15
    env:
      E2E_SUPABASE_URL: https://jatpuhfdjfzctjipklmk.supabase.co
NEW-END
EDIT .github/workflows/ci.yml #20
OLD-BEGIN
        run: echo "bun cache-hit=${{ steps.bun-cache.outputs.cache-hit }}"
      - name: Install dependencies
        run: bun install --frozen-lockfile
      # INC-074: staging must carry the newest local migration, or the suite
      # fails with N cryptic reds instead of one named file.
OLD-END
NEW-BEGIN
        run: echo "bun cache-hit=${{ steps.bun-cache.outputs.cache-hit }}"
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
      # INC-074: staging must carry the newest local migration, or the suite
      # fails with N cryptic reds instead of one named file.
NEW-END
EDIT .github/workflows/ci.yml #21
OLD-BEGIN
    if: always()
    runs-on: ubuntu-24.04
    permissions:
      contents: write
OLD-END
NEW-BEGIN
    if: always()
    runs-on: ubuntu-24.04
    timeout-minutes: 15
    permissions:
      contents: write
NEW-END
EDIT .github/workflows/ci.yml #22
OLD-BEGIN
    if: github.ref == 'refs/heads/dev' && success()
    runs-on: ubuntu-24.04
    permissions:
      contents: read
OLD-END
NEW-BEGIN
    if: github.ref == 'refs/heads/dev' && success()
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    permissions:
      contents: read
NEW-END
EDIT .github/workflows/local-backend-proof.yml #1
OLD-BEGIN
    steps:
      - name: Begin proof clock
OLD-END
NEW-BEGIN
    steps:
      # INC-935 (DEC-275): the CLI binds fixed host ports (54320-54324) that sit inside Linux's ephemeral range
      # (32768-60999), so an outgoing connection made while the images download could hold one and the start
      # failed with "address already in use" (lanes 16, 8, 7 and 10, 2026-10-24 → 10-26). Reserved before any
      # connection is made, no outgoing connection is given them.
      - name: Reserve the temporary backend's ports (INC-935)
        timeout-minutes: 1
        run: sudo sysctl -w net.ipv4.ip_local_reserved_ports=54320-54329
      - name: Begin proof clock
NEW-END
EDIT .github/workflows/local-backend-proof.yml #2
OLD-BEGIN
      - name: Install dependencies
        run: bun install --frozen-lockfile
      - name: Record install seconds
OLD-END
NEW-BEGIN
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
      - name: Record install seconds
NEW-END
EDIT .github/workflows/local-backend-proof.yml #3
OLD-BEGIN
      - name: Make the temporary backend's certificate
        run: |
OLD-END
NEW-BEGIN
      - name: Make the temporary backend's certificate
        timeout-minutes: 8
        run: |
NEW-END
EDIT .github/workflows/local-backend-proof.yml #4
OLD-BEGIN
          else
            sudo apt-get update > /dev/null
            sudo apt-get install -y libnss3-tools > /dev/null
            echo "certutil: installed" >> local-backend-status.txt
OLD-END
NEW-BEGIN
          else
            bash scripts/ci/with-deadline.sh 180 2 -- sudo apt-get update > /dev/null
            bash scripts/ci/with-deadline.sh 180 2 -- sudo apt-get install -y libnss3-tools > /dev/null
            echo "certutil: installed" >> local-backend-status.txt
NEW-END
EDIT .github/workflows/local-backend-proof.yml #5
OLD-BEGIN
        id: backend
        run: |
OLD-END
NEW-BEGIN
        id: backend
        timeout-minutes: 15
        run: |
NEW-END
EDIT .github/workflows/local-backend-proof.yml #6
OLD-BEGIN
          if [ "$result" -ne 0 ]; then
            # Raw log is never printed: the evidence step redacts credentials.
OLD-END
NEW-BEGIN
          if [ "$result" -ne 0 ]; then
            # INC-935: who holds the backend's ports, for the evidence (addresses and process names only).
            { echo "Port holders (54320-54329):"; sudo ss -Htanp | grep -E ':5432[0-9]\b' || echo "none"; } >> local-backend-start.log 2>&1
            # Raw log is never printed: the evidence step redacts credentials.
NEW-END
EDIT .github/workflows/local-backend-proof.yml #7
OLD-BEGIN
      # INC-846 (turn 31): the step's first run read function_executable_by_anon 28 on the temporary
      # backend against the baseline 19 read from ethio-staging. DEC-240's frozen rule: a count that
      # differs from staging's for the same commit makes this a ::warning step until the difference is
      # named (nine unlisted grants, or the backend's default-privilege fixture); the nightly's staging read gates.
      - name: Database security lints (DEC-240)
        if: matrix.lane == 'smoke'
        continue-on-error: true
        run: |
OLD-END
NEW-BEGIN
      # INC-846 (turn 31): the step's first run read function_executable_by_anon 28 on the temporary
      # backend against the baseline 19 read from ethio-staging; the difference was named (the backend's
      # default-privilege fixture, fixed on 53aa4e76) and the step has matched the baseline on every run
      # since — DEC-240's frozen rule: it gates again (turn 34e).
      - name: Database security lints (DEC-240)
        if: matrix.lane == 'smoke'
        run: |
NEW-END
EDIT .github/workflows/local-backend-proof.yml #8
OLD-BEGIN
            echo "anon-executable functions outside the allowlist: $(grep -c . "local-backend-anon-functions-${{ matrix.lane }}.tsv") (names in the local-proof-${{ matrix.lane }} artifact)"
            echo "::warning::Database security lints differ from the baseline on the temporary backend (INC-846; DEC-240: a warning until the difference is named)"
            exit 1
OLD-END
NEW-BEGIN
            echo "anon-executable functions outside the allowlist: $(grep -c . "local-backend-anon-functions-${{ matrix.lane }}.tsv") (names in the local-proof-${{ matrix.lane }} artifact)"
            echo "::error::Database security lints differ from the baseline on the temporary backend (DEC-240)"
            exit 1
NEW-END
EDIT .github/workflows/local-backend-proof.yml #9
OLD-BEGIN
      - name: Install Chromium
        run: bunx playwright install --with-deps chromium
      - name: Record browser seconds
OLD-END
NEW-BEGIN
      - name: Install Chromium
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bunx playwright install --with-deps chromium
      - name: Record browser seconds
NEW-END
EDIT .github/workflows/nightly-e2e.yml #1
OLD-BEGIN

jobs:
  nightly-e2e:
    name: Nightly E2E (Playwright, real time, ethio-staging)
    runs-on: ubuntu-24.04
    # DEC-153 (a) — publish-evidence.sh pushes the heartbeat and failure evidence.
    permissions:
      contents: write
      # DEC-168 — the staging gate reads the repository's runs.
      actions: read
OLD-END
NEW-BEGIN

jobs:
  nightly-e2e:
    name: Nightly E2E (Playwright, real time, ethio-staging)
    runs-on: ubuntu-24.04
    timeout-minutes: 360
    # DEC-153 (a) — publish-evidence.sh pushes the heartbeat and failure evidence.
    permissions:
      contents: write
      # DEC-168 — the staging gate reads the repository's runs.
      actions: read
NEW-END
EDIT .github/workflows/nightly-e2e.yml #2
OLD-BEGIN
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - name: Install dependencies
        run: bun install --frozen-lockfile
      - name: Resolve Playwright version
        id: pw
        run: echo "version=$(node -p "require('@playwright/test/package.json').version")" >> "$GITHUB_OUTPUT"
      - name: Cache Playwright browsers
        uses: actions/cache@v5
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      - name: Install Chromium
        run: bunx playwright install --with-deps chromium
      # DEC-018: E2E runs the PRODUCTION build in E2E mode. Each job builds its
      # own dist/ (the build is seconds and needs the job's VITE_* env anyway);
      # artifact-sharing was not worth the plumbing.
      - name: Build the app in E2E mode (VITE_E2E=1)
        run: bun run build:e2e
OLD-END
NEW-BEGIN
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
      - name: Resolve Playwright version
        id: pw
        run: echo "version=$(node -p "require('@playwright/test/package.json').version")" >> "$GITHUB_OUTPUT"
      - name: Cache Playwright browsers
        uses: actions/cache@v5
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      - name: Install Chromium
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bunx playwright install --with-deps chromium
      # DEC-018: E2E runs the PRODUCTION build in E2E mode. Each job builds its
      # own dist/ (the build is seconds and needs the job's VITE_* env anyway);
      # artifact-sharing was not worth the plumbing.
      - name: Build the app in E2E mode (VITE_E2E=1)
        run: bun run build:e2e
NEW-END
EDIT .github/workflows/nightly-e2e.yml #3
OLD-BEGIN
  # or the wrangler version must be bumped (together, in one landing). The job
  # is gating.
  cloudflare-parity-smoke:
    name: Cloudflare parity smoke (wrangler-served)
    runs-on: ubuntu-24.04
    env:
      E2E_SHARD: cfsmoke
      E2E_EMAIL_SINK: ${{ vars.E2E_EMAIL_SINK }}
      E2E_SUPABASE_URL: https://jatpuhfdjfzctjipklmk.supabase.co
      E2E_SUPABASE_PUBLISHABLE_KEY: ${{ vars.E2E_SUPABASE_PUBLISHABLE_KEY }}
OLD-END
NEW-BEGIN
  # or the wrangler version must be bumped (together, in one landing). The job
  # is gating.
  cloudflare-parity-smoke:
    name: Cloudflare parity smoke (wrangler-served)
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    env:
      E2E_SHARD: cfsmoke
      E2E_EMAIL_SINK: ${{ vars.E2E_EMAIL_SINK }}
      E2E_SUPABASE_URL: https://jatpuhfdjfzctjipklmk.supabase.co
      E2E_SUPABASE_PUBLISHABLE_KEY: ${{ vars.E2E_SUPABASE_PUBLISHABLE_KEY }}
NEW-END
EDIT .github/workflows/nightly-e2e.yml #4
OLD-BEGIN
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - name: Install dependencies
        run: bun install --frozen-lockfile
      - name: Resolve Playwright version
        id: pw
        run: echo "version=$(node -p "require('@playwright/test/package.json').version")" >> "$GITHUB_OUTPUT"
      - name: Cache Playwright browsers
        uses: actions/cache@v5
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      - name: Install Chromium
        run: bunx playwright install --with-deps chromium
      - name: Build the app for the Cloudflare target (VITE_E2E=1)
        run: bun run build:e2e:cloudflare
      - name: Verify the worker artifact and its pinned compatibility date
        run: |
          test -f dist/server/wrangler.json || { echo "::error::cloudflare e2e build did not emit dist/server/wrangler.json — nitro target drift"; find dist -maxdepth 3 -type f | head -60; exit 1; }
OLD-END
NEW-BEGIN
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
      - name: Resolve Playwright version
        id: pw
        run: echo "version=$(node -p "require('@playwright/test/package.json').version")" >> "$GITHUB_OUTPUT"
      - name: Cache Playwright browsers
        uses: actions/cache@v5
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      - name: Install Chromium
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bunx playwright install --with-deps chromium
      - name: Build the app for the Cloudflare target (VITE_E2E=1)
        run: bun run build:e2e:cloudflare
      - name: Verify the worker artifact and its pinned compatibility date
        run: |
          test -f dist/server/wrangler.json || { echo "::error::cloudflare e2e build did not emit dist/server/wrangler.json — nitro target drift"; find dist -maxdepth 3 -type f | head -60; exit 1; }
NEW-END
EDIT .github/workflows/flake-check.yml #1
OLD-BEGIN
    runs-on: ubuntu-24.04
    # DEC-153 (a) / INC-676 — publish-evidence.sh pushes status and failure evidence.
OLD-END
NEW-BEGIN
    runs-on: ubuntu-24.04
    timeout-minutes: 120
    # DEC-153 (a) / INC-676 — publish-evidence.sh pushes status and failure evidence.
NEW-END
EDIT .github/workflows/flake-check.yml #2
OLD-BEGIN
      - name: Install dependencies
        run: bun install --frozen-lockfile
      - name: Resolve Playwright version
OLD-END
NEW-BEGIN
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
      - name: Resolve Playwright version
NEW-END
EDIT .github/workflows/flake-check.yml #3
OLD-BEGIN
      - name: Install Chromium
        run: bunx playwright install --with-deps chromium
      # DEC-018: E2E runs the PRODUCTION build in E2E mode. Each job builds its
OLD-END
NEW-BEGIN
      - name: Install Chromium
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bunx playwright install --with-deps chromium
      # DEC-018: E2E runs the PRODUCTION build in E2E mode. Each job builds its
NEW-END
EDIT .github/workflows/guard-proof.yml #1
OLD-BEGIN
    runs-on: ubuntu-24.04
    env:
OLD-END
NEW-BEGIN
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    env:
NEW-END
EDIT .github/workflows/guard-proof.yml #2
OLD-BEGIN
      - name: Install dependencies
        run: bun install --frozen-lockfile
      - name: Resolve Playwright version
OLD-END
NEW-BEGIN
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
      - name: Resolve Playwright version
NEW-END
EDIT .github/workflows/guard-proof.yml #3
OLD-BEGIN
      - name: Install Chromium
        run: bunx playwright install --with-deps chromium

OLD-END
NEW-BEGIN
      - name: Install Chromium
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bunx playwright install --with-deps chromium

NEW-END
EDIT .github/workflows/feed-bench.yml #1
OLD-BEGIN
        run: bun install --frozen-lockfile
OLD-END
NEW-BEGIN
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
NEW-END
EDIT .github/workflows/ci-status-report.yml #1
OLD-BEGIN
    if: github.event_name == 'workflow_run'
    runs-on: ubuntu-24.04
    permissions:
      contents: write
OLD-END
NEW-BEGIN
    if: github.event_name == 'workflow_run'
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    permissions:
      contents: write
NEW-END
EDIT .github/workflows/ci-status-report.yml #2
OLD-BEGIN
    if: github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-24.04
    permissions:
      contents: read
OLD-END
NEW-BEGIN
    if: github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    permissions:
      contents: read
NEW-END
EDIT .github/workflows/zap-baseline.yml #1
OLD-BEGIN
    runs-on: ubuntu-24.04
    steps:
OLD-END
NEW-BEGIN
    runs-on: ubuntu-24.04
    timeout-minutes: 30
    steps:
NEW-END
C3. Read /tmp/observability/build-errors.log; `bunx vitest run scripts/conformance scripts/ci` — every test passes (paste the totals; the known limits above excepted).

PART D — DOCS AND THE ROADMAP.
D1. roadmap.md, line 3: the text after "The brief in force: " up to and including `(Foundations records turn R4: the slips S379–S454, the roadmap's owed lines, INC-938, INC-939 and INC-940 — G41)` becomes `docs/governance/briefs/foundations-turn-34e.md (Foundations turn 34e: every CI job and every outside call carries a deadline — INC-935, DEC-275)` (everything after it stays, as it is).
D2. These edits (AGENTS.md's CI line; the register's rows 9 (the lint step gating) and 59; the lanes' feature page; the changelog; records turn R4 ticked with its closing run; this turn's own line):
EDIT AGENTS.md #1
OLD-BEGIN
- CI: 16 lanes, 1 worker each.
OLD-END
NEW-BEGIN
- CI: 16 lanes, 1 worker each; every job and every outside call carries a deadline — installs run through `scripts/ci/with-deadline.sh` (one loud retry), the lanes reserve the backend's ports first (CF-CID-1, DEC-275).
NEW-END
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 8 | A grant to anon, authenticated or PUBLIC is named with its reason | `scripts/public-surface-allowlist.txt` (`object | reason`) read by `check-migrations.sh` | the migration guard (a migration after M1 granting an unnamed object fails) | — | — | the anon COUNT is also measured by the lints (row 9); the door manifest absorbs both (row 20) |
| 9 | The anon and RLS surface is measured against one baseline on every commit | `public.security_lints()` + `scripts/security-lints.ts` (REST or `--tsv`) + `scripts/security-lints-baseline.json` (DEC-148, DEC-240) | the smoke-lane step (warning while INC-846 is open) and the nightly step before its heartbeat; `scripts/security-lints.test.ts` | — | a new lint is one name in the door and one line in the baseline | first smoke-lane reading 28 vs staging's 19 — INC-846 |
| 10 | A stand-in (fake mode) exists only in the E2E build | `standInMode(flag)` in `src/server/stand-in.ts` (isE2E && the flag or E2E_FAKE_TRANSLATE) — the AI tasks, the photo policy, background removal, category images, translations; the geocoder's flag stays outside the AI census (DEC-249) | SIN-1…3 in `src/server/stand-in.test.ts` (no file but stand-in.ts reads an `E2E_FAKE_*`/`GEMINI_FAKE`/`AI_FAKE` flag; false whenever isE2E is false); GWC-6 | none | — | INC-828, INC-839 (ids unchanged); moved off meter.ts in turn 16 |
OLD-END
NEW-BEGIN
| 8 | A grant to anon, authenticated or PUBLIC is named with its reason | `scripts/public-surface-allowlist.txt` (`object | reason`) read by `check-migrations.sh` | the migration guard (a migration after M1 granting an unnamed object fails) | — | — | the anon COUNT is also measured by the lints (row 9); the door manifest absorbs both (row 20) |
| 9 | The anon and RLS surface is measured against one baseline on every commit | `public.security_lints()` + `scripts/security-lints.ts` (REST or `--tsv`) + `scripts/security-lints-baseline.json` (DEC-148, DEC-240) | the smoke-lane step (gating again since turn 34e: INC-846 fixed on 53aa4e76 and every run since matching — DEC-240's rule) and the nightly step before its heartbeat; `scripts/security-lints.test.ts` | — | a new lint is one name in the door and one line in the baseline | first smoke-lane reading 28 vs staging's 19 — INC-846 |
| 10 | A stand-in (fake mode) exists only in the E2E build | `standInMode(flag)` in `src/server/stand-in.ts` (isE2E && the flag or E2E_FAKE_TRANSLATE) — the AI tasks, the photo policy, background removal, category images, translations; the geocoder's flag stays outside the AI census (DEC-249) | SIN-1…3 in `src/server/stand-in.test.ts` (no file but stand-in.ts reads an `E2E_FAKE_*`/`GEMINI_FAKE`/`AI_FAKE` flag; false whenever isE2E is false); GWC-6 | none | — | INC-828, INC-839 (ids unchanged); moved off meter.ts in turn 16 |
NEW-END
EDIT docs/governance/mechanisms.md #2
OLD-BEGIN
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…6: blocks in order, a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a file that cannot be staged — writes nothing; the command line and `--dry`; the wrapper run under the kit's scopeVerdict; BA-6, the census: no other code in src/, e2e/, scripts/ or .claude/ names a block marker) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK. Hardened in records turn R3 from R1's reviewer (MAJORs 1–2, MINORs 1–3, 5–6): run-on and unended blocks refused, EDIT numbers checked, writes staged, BA-6, docs/features/brief-applier.md; in records turn R4 from R3's reviewer (its MAJOR and two MINORs): an edited file keeps its mode, a directory at a target's path is refused before anything is placed, a failed placing is a refusal with no staged file left, BA-6 also names a parser of FILE blocks |

OLD-END
NEW-BEGIN
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…6: blocks in order, a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a file that cannot be staged — writes nothing; the command line and `--dry`; the wrapper run under the kit's scopeVerdict; BA-6, the census: no other code in src/, e2e/, scripts/ or .claude/ names a block marker) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK. Hardened in records turn R3 from R1's reviewer (MAJORs 1–2, MINORs 1–3, 5–6): run-on and unended blocks refused, EDIT numbers checked, writes staged, BA-6, docs/features/brief-applier.md; in records turn R4 from R3's reviewer (its MAJOR and two MINORs): an edited file keeps its mode, a directory at a target's path is refused before anything is placed, a failed placing is a refusal with no staged file left, BA-6 also names a parser of FILE blocks |
| 59 | Every CI job and every outside call carries a deadline: a step with none held a run for an hour (lane 16's browser install, run 40397087967) and a job with none runs to GitHub's 360 minutes; the temporary backend's fixed ports sit inside Linux's ephemeral range, so an outgoing connection could hold one (lanes 16, 8, 7, 10: "address already in use") (INC-935, DEC-275) | `scripts/ci/with-deadline.sh <seconds> <tries> -- <command>` (coreutils `timeout` on the command's process group; a failed or overdue try retried after 10 s as a `ci-retry` warning; the last try's code is the step's); `timeout-minutes` on every job (but the one that calls the lanes' reusable workflow) and on every step that reaches outside; the lanes' first step `sysctl net.ipv4.ip_local_reserved_ports=54320-54329`, and a failed start writes who held the ports into its evidence | `scripts/conformance/ci-deadlines.test.ts` (CF-CID-1: every workflow's jobs, outside calls, installs and backend starts; CF-CID-2: planted); `scripts/ci/with-deadline.test.ts` (WDL-1…4) | none — the nightly's 360 minutes is GitHub's own ceiling for its full serial suite (its length is the nightly's own concern) | a new workflow, job or install is named by CF-CID-1 until it carries its deadline | ci.yml, local-backend-proof.yml, nightly-e2e.yml, flake-check.yml, guard-proof.yml, feed-bench.yml, ci-status-report.yml, zap-baseline.yml since turn 34e; Foundations turn 34e |

NEW-END
EDIT docs/features/ci-local-backend.md #1
OLD-BEGIN
With one worker a lane (DEC-230) a run took about 22 minutes (run 39598287446: lane 8 1,226 s). The numbered lanes go from 12 to 16 (local-backend-proof.yml's matrix and --shard, and E2E_EXPECTED_SOURCES in both workflows), each still one worker. DEC-232's rule, frozen before any number: KEEP when each of the first two CI runs has its slowest numbered lane at most 1,000 s, no lane failed by the layout itself, and the whole run at most 18 minutes from its commit; REVERT to 12 lanes when either run misses the first or the third.
OLD-END
NEW-BEGIN
With one worker a lane (DEC-230) a run took about 22 minutes (run 39598287446: lane 8 1,226 s). The numbered lanes go from 12 to 16 (local-backend-proof.yml's matrix and --shard, and E2E_EXPECTED_SOURCES in both workflows), each still one worker. DEC-232's rule, frozen before any number: KEEP when each of the first two CI runs has its slowest numbered lane at most 1,000 s, no lane failed by the layout itself, and the whole run at most 18 minutes from its commit; REVERT to 12 lanes when either run misses the first or the third.

## Turn 34e — every job and outside call carries a deadline; the backend's ports reserved (INC-935, DEC-275)

Run 40397087967 (9eeb83cc) lost two lanes to the runner, not the code: lane 16's `Install Chromium` hung 58 minutes until the job's 60-minute timeout, and lane 10's `supabase start` failed — "failed to bind host port for 0.0.0.0:54324 … address already in use". The same start failure lost lanes 16, 8 and 7 on 2026-10-24 → 10-26 (ports 54324 and 54322): the CLI binds fixed host ports inside Linux's ephemeral range (32768–60999), so an outgoing connection made while its images download can already hold one. Each lane now reserves 54320–54329 from the ephemeral range in its first step (`net.ipv4.ip_local_reserved_ports`), before any connection is made, and a failed start writes who held the ports into the start log the evidence step reads. Every install (bun, the browser, the certificate tools) runs through `scripts/ci/with-deadline.sh` — a deadline per try and one retry, announced as a `ci-retry` warning so a retry is never silent — and every job and every step that reaches outside declares `timeout-minutes`. CF-CID-1 (scripts/conformance/ci-deadlines.test.ts) holds every workflow to these rules; WDL-1…4 hold the wrapper. DEC-275's judge: KEEP when, over the next 20 completed runs on dev, no lane fails its start by a port already in use and no step outruns its deadline unseen; a step that needs its retry in three or more of those runs is an incident (the retry hides a cause).
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations records turn R4 (2026-10-27; G41; register row 58) — the block applier from records turn R3's reviewer: an edited file keeps its mode (an executable stays executable), a directory at a target's path is refused before anything is placed, a failed placing is a refusal with no staged file left, BA-6 also names a parser of FILE blocks. The slips S379–S454 appended word for word to docs/governance/instructions-amendments.md §Slips, each with the guardrail it names and its corrective; INC-938 (the typecheck's reach), INC-939 (the storage buckets' type and size allowlists) and INC-940 (AP-36's three retried passes in seven days) into the incident ledger, "Numbering: next free INC-941."; the roadmap's owed lines; the scenario suite's line renamed. The records of 2026-10-23 → 2026-10-27 are in the repository (R1–R4).
OLD-END
NEW-BEGIN
- Foundations records turn R4 (2026-10-27; G41; register row 58) — the block applier from records turn R3's reviewer: an edited file keeps its mode (an executable stays executable), a directory at a target's path is refused before anything is placed, a failed placing is a refusal with no staged file left, BA-6 also names a parser of FILE blocks. The slips S379–S454 appended word for word to docs/governance/instructions-amendments.md §Slips, each with the guardrail it names and its corrective; INC-938 (the typecheck's reach), INC-939 (the storage buckets' type and size allowlists) and INC-940 (AP-36's three retried passes in seven days) into the incident ledger, "Numbering: next free INC-941."; the roadmap's owed lines; the scenario suite's line renamed. The records of 2026-10-23 → 2026-10-27 are in the repository (R1–R4).

- Foundations turn 34e (2026-10-27; INC-935, DEC-275) — every CI job and every outside call carries a deadline: installs (bun, the browser, the certificate tools) run through scripts/ci/with-deadline.sh — a deadline per try and one retry, announced as a `ci-retry` warning; every job (but the one that calls the lanes' reusable workflow) and every step that reaches outside declares `timeout-minutes`; each lane reserves the temporary backend's ports 54320–54329 from Linux's ephemeral range in its first step, and a failed start writes who held them into its evidence. CF-CID-1/2 hold every workflow to the rules; WDL-1…4 hold the wrapper. And DEC-240's lint step in the smoke lane gates again (its rule: the difference named — INC-846, fixed on 53aa4e76 — and every run since matching the baseline).
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] Records turn R4 (docs/governance/briefs/foundations-records-r4.md; no migration; the Claude Code executor; G41) — the block applier's fixes from records turn R3's reviewer (an edited file keeps its mode; a directory at a target refused before anything is placed; a failed placing a refusal; BA-6 sees FILE blocks); the slips S379–S454 appended to docs/governance/instructions-amendments.md §Slips; INC-938, INC-939 and INC-940 into the incident ledger ("Numbering: next free INC-941."); the roadmap's owed lines (INC-878, INC-885–INC-888, INC-898, INC-899, INC-902, INC-903, INC-786 / INC-821, INC-843); the sign-in and sign-up scenario suite's line renamed (its old "Turn 34" number belongs to speed turn S11). With it the records of 2026-10-23 → 2026-10-27 are in the repository (R1–R4).
OLD-END
NEW-BEGIN
  - [x] Records turn R4 (docs/governance/briefs/foundations-records-r4.md; no migration; the Claude Code executor; G41) — the block applier's fixes from records turn R3's reviewer (an edited file keeps its mode; a directory at a target refused before anything is placed; a failed placing a refusal; BA-6 sees FILE blocks); the slips S379–S454 appended to docs/governance/instructions-amendments.md §Slips; INC-938, INC-939 and INC-940 into the incident ledger ("Numbering: next free INC-941."); the roadmap's owed lines (INC-878, INC-885–INC-888, INC-898, INC-899, INC-902, INC-903, INC-786 / INC-821, INC-843); the sign-in and sign-up scenario suite's line renamed (its old "Turn 34" number belongs to speed turn S11). With it the records of 2026-10-23 → 2026-10-27 are in the repository (R1–R4). Final HEAD 52965564; CI run 40512047787: SUCCESS.
  - [ ] Turn 34e (docs/governance/briefs/foundations-turn-34e.md; no migration; Lovable; DEC-275) — INC-935: every CI job and every outside call carries a deadline — scripts/ci/with-deadline.sh (a deadline per try, one loud retry) on every install, `timeout-minutes` on every job and every step that reaches outside, the lanes reserve the temporary backend's ports (54320–54329) from the kernel's ephemeral range before any connection (the four "address already in use" lanes of 10-24 → 10-26); CF-CID-1/2, WDL-1…4; register row 59; DEC-240's lint step gates again (INC-846 fixed).
NEW-END

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34e.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src e2e supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: every test passes — the supervisor ran the touched files (5 files, 16 tests: WDL-1…4, CF-CID-1/2, wired, non-null, BA-1…6); CI runs the whole suite on your commit); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
d62884b2c544f3aad76df9f06bd8cd7b6806b180befc56f99add6b20e5f718a2  .github/workflows/ci-status-report.yml
523a263c8a953500381d48aa77da83d7dd0b08952b7ed56f78e003ef55bbd49f  .github/workflows/ci.yml
24e97e6286fbf27b4455eb82d6b0622c68ad7478b6b05487f69abf065a865ee3  .github/workflows/feed-bench.yml
68e975da853371e6526bac20b62423162637d0d774f13ccc81c13bedcf9c635b  .github/workflows/flake-check.yml
873d0ce1214391891017cbf29ec53fe00d59b317ed0e27be0fc126829964dd04  .github/workflows/guard-proof.yml
7add803e7fd419fa55c1504bc5785955332c2e77e95af65b3b2057d9ef77aea2  .github/workflows/local-backend-proof.yml
de9f45ffe8e4fc7cb69e69adc9f1ef199f83c563c6bd99cf8be53d0c1b30a255  .github/workflows/nightly-e2e.yml
0bc93ff78ae060c0cba3113209b40cd5d5d4161af90d721b5fe992cce9765330  .github/workflows/zap-baseline.yml
298e4f0ac8b96c6b2213dc631b32c14dfdb88f6057789fdf8d4fa0c76ab38da0  AGENTS.md
16f5f653ff7f7ec7ed8d3a3ed189fee984fd16d31a886d0df65f4cbfbf8730a9  docs/_changelog.md
3a3defbd944b53205d33b06706cc6d4b067ae35128b4bd1f3af9543d31f236d6  docs/features/ci-local-backend.md
4e60385b4c56da0095e5e80df8b0409250d8cefdb3de5993df8ba9fca5c5a9f1  docs/governance/mechanisms.md
ff3b18be091219405c3306606a722805c318fbf8c83e93247d7cf11ebb271918  scripts/ci/with-deadline.sh
7e0ff710409ab39b1e7d9e44e3c1026a1442d73e2ff3691da6cc7100b918ffa9  scripts/ci/with-deadline.test.ts
9595b529df693e0e59b9d1f4156a5857bd71b14d802750a530b0dc1326de2a7f  scripts/conformance/ci-deadlines.test.ts

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34e.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the red-first lines; the unit totals; actionlint's last line or why it did not run; the K2 list (file:line); "none" for migrations, strings, product code and browser tests; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): DEC-275 as above; the ports are reserved rather than moved (moving them would change the address every browser test reads, `https://127.0.0.1:54321`); the job deadlines are generous multiples of the measured times (run 40406394089: the build 1.9 minutes → 20, the component tests 4.2 → 20, each guard under a minute → 10, the slowest lane 24 minutes inside its existing 60); the nightly keeps GitHub's own 360 minutes, now written; an install that fails twice fails its step with its own exit code — never a pass.

BLOCK 1 — FILE-BEGIN scripts/conformance/ci-deadlines.test.ts
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename } from "node:path";
import { describe, expect, it } from "vitest";
import { report, walkFiles } from "./kit";

/**
 * INC-935 (Foundations turn 34e, DEC-275) — EVERY CI JOB AND EVERY OUTSIDE CALL CARRIES A DEADLINE.
 * A step with no deadline of its own held a whole run for an hour (lane 16's browser install,
 * run 40397087967), and a job with none runs to GitHub's 360 minutes. So, in every workflow:
 * every job declares `timeout-minutes` (a job that calls a reusable workflow cannot, and its
 * callee's jobs do); every step that reaches outside (an install, a download, the backend's
 * start) declares its own; every install runs through scripts/ci/with-deadline.sh, which retries
 * it once, out loud; and a job that starts the temporary backend first reserves the backend's
 * ports from the kernel's ephemeral range (the four "address already in use" lanes of
 * 2026-10-24 → 10-26).
 */

export type Step = { line: number; text: string; timeout: boolean };
export type Job = {
  file: string;
  id: string;
  line: number;
  callsWorkflow: boolean;
  timeout: boolean;
  steps: Step[];
};

/** A workflow's jobs and their steps, read by indentation (two spaces a level, as every workflow here is written). */
export function readWorkflow(file: string, text: string): Job[] {
  const lines = text.split("\n");
  const jobs: Job[] = [];
  const start = lines.indexOf("jobs:");
  if (start < 0) return jobs;
  let job: Job | null = null;
  let step: Step | null = null;
  for (let index = start + 1; index < lines.length; index += 1) {
    const text = lines[index] ?? "";
    if (/^\S/.test(text)) break;
    const head = /^ {2}([A-Za-z0-9_-]+):\s*$/.exec(text);
    if (head) {
      job = {
        file,
        id: head[1] ?? "",
        line: index + 1,
        callsWorkflow: false,
        timeout: false,
        steps: [],
      };
      jobs.push(job);
      step = null;
      continue;
    }
    if (job === null) continue;
    if (/^ {4}timeout-minutes:\s*\d+\s*$/.test(text)) job.timeout = true;
    if (/^ {4}uses:\s*\S/.test(text)) job.callsWorkflow = true;
    if (/^ {6}- /.test(text)) {
      step = { line: index + 1, text: `${text}\n`, timeout: false };
      job.steps.push(step);
      continue;
    }
    if (/^ {0,5}\S/.test(text)) {
      step = null;
      continue;
    }
    if (step === null) continue;
    step.text += `${text}\n`;
    if (/^ {8}timeout-minutes:\s*\d+\s*$/.test(text)) step.timeout = true;
  }
  return jobs;
}

/** A command line that reaches outside the runner. */
const OUTSIDE =
  /\b(?:bun install|playwright install|apt-get (?:update|install)|curl|supabase start)\b/;
/** A command line that installs, and so must run through the retrying deadline. */
const INSTALL = /\b(?:bun install|playwright install|apt-get (?:update|install))\b/;
const WRAPPER = "scripts/ci/with-deadline.sh";
const RESERVE = "net.ipv4.ip_local_reserved_ports=54320-54329";

/** The command lines of a step: its run text without comments and without its name. */
function commandLines(step: Step): string[] {
  return step.text
    .split("\n")
    .filter((line) => !/^\s*#/.test(line) && !/^\s*(?:- )?name:/.test(line));
}

type Finding = { file: string; line: number; what: string };

/** Every breach of the four rules in the given workflows. */
export function deadlineFindings(files: Array<{ file: string; text: string }>): Finding[] {
  const findings: Finding[] = [];
  for (const { file, text } of files) {
    for (const job of readWorkflow(file, text)) {
      if (!job.callsWorkflow && !job.timeout)
        findings.push({
          file,
          line: job.line,
          what: `job "${job.id}" declares no timeout-minutes`,
        });
      let reserved = false;
      for (const step of job.steps) {
        const commands = commandLines(step);
        if (commands.some((line) => line.includes(RESERVE))) reserved = true;
        if (commands.some((line) => OUTSIDE.test(line)) && !step.timeout)
          findings.push({
            file,
            line: step.line,
            what: "a step that reaches outside declares no timeout-minutes",
          });
        for (const line of commands)
          if (INSTALL.test(line) && !line.includes(WRAPPER))
            findings.push({
              file,
              line: step.line,
              what: `an install outside ${WRAPPER}: ${line.trim()}`,
            });
        if (commands.some((line) => /\bsupabase start\b/.test(line)) && !reserved)
          findings.push({
            file,
            line: step.line,
            what: "the backend starts before its ports are reserved",
          });
      }
    }
  }
  return findings;
}

const workflows = walkFiles([".github/workflows"], { ext: ["yml"] }).map((file) => ({
  file,
  text: readFileSync(file, "utf8"),
}));

describe("every CI job and every outside call carries a deadline (INC-935)", () => {
  it("CF-CID-1 every workflow's jobs, outside calls, installs and backend starts keep the four rules", () => {
    const jobs = workflows.flatMap(({ file, text }) => readWorkflow(file, text));
    const outside = jobs
      .flatMap((job) => job.steps)
      .filter((step) => commandLines(step).some((line) => OUTSIDE.test(line)));
    console.log(
      `[ci-deadlines] workflows: ${workflows.length}; jobs: ${jobs.length}; steps reaching outside: ${outside.length}`,
    );
    expect(workflows.map(({ file }) => basename(file))).toContain("local-backend-proof.yml");
    expect(jobs.length).toBeGreaterThan(20);
    expect(outside.length).toBeGreaterThan(10);
    expect(report(deadlineFindings(workflows))).toBe("");
  });

  it("CF-CID-2 a planted workflow's four breaches are named and its kept steps are not", () => {
    const dir = "node_modules/.cache/ci-deadlines";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/planted.yml`;
    try {
      writeFileSync(
        file,
        [
          "name: planted",
          "on: push",
          "jobs:",
          "  caller:",
          "    uses: ./.github/workflows/other.yml",
          "  kept:",
          "    runs-on: ubuntu-24.04",
          "    timeout-minutes: 10",
          "    steps:",
          "      - name: Reserve",
          "        timeout-minutes: 1",
          `        run: sudo sysctl -w ${RESERVE}`,
          "      - name: Install dependencies",
          "        timeout-minutes: 12",
          `        run: bash ${WRAPPER} 300 2 -- bun install --frozen-lockfile`,
          "      - name: Start",
          "        timeout-minutes: 15",
          "        run: supabase start",
          "  bare:",
          "    runs-on: ubuntu-24.04",
          "    steps:",
          "      - name: Install dependencies",
          "        run: bun install --frozen-lockfile",
          "      - name: Start",
          "        timeout-minutes: 15",
          "        run: |",
          "          # bun install is named in a comment only",
          "          supabase start",
          "",
        ].join("\n"),
      );
      const text = readFileSync(file, "utf8");
      expect(report(deadlineFindings([{ file, text }]))).toBe(
        [
          `${file}:19 job "bare" declares no timeout-minutes`,
          `${file}:22 a step that reaches outside declares no timeout-minutes`,
          `${file}:22 an install outside ${WRAPPER}: run: bun install --frozen-lockfile`,
          `${file}:24 the backend starts before its ports are reserved`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
FILE-END scripts/conformance/ci-deadlines.test.ts

BLOCK 2 — FILE-BEGIN scripts/ci/with-deadline.sh
#!/usr/bin/env bash
# INC-935 (Foundations turn 34e, DEC-275) — EVERY OUTSIDE CALL IN CI CARRIES A DEADLINE.
# Usage: bash scripts/ci/with-deadline.sh <seconds> <tries> -- <command> [args...]
# Runs the command under coreutils `timeout` (its whole process group is signalled; a
# command that ignores TERM is killed 15 s later). A failed or overdue try is retried
# after a 10-second pause, at most <tries> times in all, each retry announced as a
# GitHub warning so a retry is never silent; the last try's exit code is the step's.
# Only for steps that can be run again safely (installs, downloads).
set -u
if [ "$#" -lt 4 ] || [ "$3" != "--" ]; then
  echo "usage: with-deadline.sh <seconds> <tries> -- <command> [args...]" >&2
  exit 2
fi
seconds=$1
tries=$2
shift 3
case "$seconds$tries" in
  *[!0-9]*)
    echo "with-deadline.sh: <seconds> and <tries> are whole numbers" >&2
    exit 2
    ;;
esac
if [ "$seconds" -lt 1 ] || [ "$tries" -lt 1 ]; then
  echo "with-deadline.sh: <seconds> and <tries> are at least 1" >&2
  exit 2
fi
pause=${WITH_DEADLINE_PAUSE:-10}
attempt=1
while :; do
  timeout --kill-after=15 "$seconds" "$@"
  code=$?
  if [ "$code" -eq 0 ]; then
    exit 0
  fi
  if [ "$code" -eq 124 ] || [ "$code" -eq 137 ]; then
    what="ran past its ${seconds}s deadline"
  else
    what="failed with exit ${code}"
  fi
  if [ "$attempt" -ge "$tries" ]; then
    echo "::error title=ci-deadline::$* ${what} on try ${attempt} of ${tries}"
    exit "$code"
  fi
  echo "::warning title=ci-retry::$* ${what} on try ${attempt} of ${tries}; trying again"
  attempt=$((attempt + 1))
  sleep "$pause"
done
FILE-END scripts/ci/with-deadline.sh

BLOCK 3 — FILE-BEGIN scripts/ci/with-deadline.test.ts
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * INC-935 (Foundations turn 34e, DEC-275) — scripts/ci/with-deadline.sh: a CI install runs under a
 * deadline, a failed or overdue try is retried out loud, and the last try's exit code is the step's.
 */

const SCRIPT = "scripts/ci/with-deadline.sh";

function run(args: string[]) {
  const result = spawnSync("bash", [SCRIPT, ...args], {
    encoding: "utf8",
    env: { ...process.env, WITH_DEADLINE_PAUSE: "0" },
    timeout: 20_000,
  });
  return { code: result.status, out: `${result.stdout}${result.stderr}` };
}

describe("every outside call in CI carries a deadline (INC-935)", () => {
  it("WDL-1 a command that succeeds runs once and says nothing", () => {
    const result = run(["5", "2", "--", "bash", "-c", "echo once"]);
    expect(result.code).toBe(0);
    expect(result.out).toBe("once\n");
  });

  it("WDL-2 a failed try is retried out loud and the second try's success is the step's", () => {
    const dir = mkdtempSync(join(tmpdir(), "wdl-"));
    try {
      const mark = join(dir, "tried");
      const result = run([
        "5",
        "2",
        "--",
        "bash",
        "-c",
        `if [ -e "${mark}" ]; then echo second; exit 0; fi; touch "${mark}"; exit 3`,
      ]);
      expect(result.code).toBe(0);
      expect(result.out).toContain("::warning title=ci-retry::");
      expect(result.out).toContain("failed with exit 3 on try 1 of 2; trying again");
      expect(result.out).toContain("second\n");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("WDL-3 a command past its deadline is stopped on every try and the step fails with the deadline's code", () => {
    const begun = Date.now();
    const result = run(["1", "2", "--", "sleep", "30"]);
    expect(Date.now() - begun).toBeLessThan(15_000);
    expect(result.code).toBe(124);
    expect(result.out).toContain("ran past its 1s deadline on try 1 of 2; trying again");
    expect(result.out).toContain(
      "::error title=ci-deadline::sleep 30 ran past its 1s deadline on try 2 of 2",
    );
  });

  it("WDL-4 a call without its deadline, its tries or the separator is refused before anything runs", () => {
    expect(run(["5", "--", "true"]).code).toBe(2);
    expect(run(["5", "2", "true"]).code).toBe(2);
    expect(run(["0", "2", "--", "true"]).code).toBe(2);
    expect(run(["five", "2", "--", "true"]).code).toBe(2);
  });
});
FILE-END scripts/ci/with-deadline.test.ts
```
