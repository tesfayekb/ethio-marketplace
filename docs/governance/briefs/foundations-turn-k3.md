# Foundations — turn K3: the nightly at 11:30 New York all year (DEC-277); THE CHECKS once per code tree (DEC-278); every CI action with its own deadline (INC-941, DEC-282); a failed backend start names the database's sessions (INC-944); records R7: brief (saved unchanged, 2026-10-28)

```text
FOUNDATIONS — TURN K3 (2026-10-28; G0; DEC-277, DEC-278, DEC-282, INC-941, INC-944; register rows 37, 59 and 63, new; anchors located at 8cb2201dfa9cb07eafb851cbceeccf7731f1b0fb). The CI and kit turn of roadmap.md ("The CI and kit turn") — Lovable's, because .github/workflows/** and .claude/** are closed to the Claude Code executor. Five parts. (1) DEC-277: the nightly full run starts at 11:30 in New York all year. GitHub's schedules are UTC only, so .github/workflows/nightly-e2e.yml carries two (15:30 UTC — New York on summer time; 16:30 UTC — winter time) and a first job, `hour`, that runs the new scripts/ci/nightly-hour.sh: only the schedule that falls at 11 o'clock in New York on the run's UTC day goes on; its two test jobs wait on `hour`. The script judges the schedule that fired (`github.event.schedule`), never the clock, so a run GitHub starts late cannot skip both; a run started by hand always goes on; the clock changes of 2026-11-01 and 2027-03-14 need no re-time. Today's `0 18 * * *` (DEC-171) is retired. (2) DEC-278: THE CHECKS run once per code tree — `bun .claude/hooks/land.ts --checks` runs the landing door's step 7 alone (lint, typecheck, unit, i18n, build, migration guard, format — each green step cached for the committed tree), pushes nothing, and the landing then finds them green for the same tree; the protocol's step 5 and the turn-report skill say so, and the permission rules allow the command. The reviewer is unchanged. (3) INC-941: CF-CID-1 gains its sixth rule — every step that uses an action declares its own `timeout-minutes` — and pip's installs and git's downloads count as installs (through scripts/ci/with-deadline.sh), `git push` as an outside call; the 69 action steps without one get DEC-282's ceilings; the semgrep rules are fetched as the pinned commit only. (4) INC-944: while the lanes' backend starts, the database's busy sessions are sampled every 5 seconds; a failed start writes the last sample into the evidence it already publishes, and the run's proof lists each lane's sample count. (5) Records R7, and two small owed items: .claude/rules/20-tests.md names `layoutBoxes` (turn 34f's owed line); CF-LINT-1/2 gain a non-empty floor (CF-LINT-4). LEFT, each on its own roadmap line: INC-936 (the nightly's red nights read first), INC-938 (needs Bun's type definitions — a package change, its own turn), the check-brief rules as conformance tests (the cleanup turn). Tier B (CI and the executor's kit; no product code, no migration, no string, no package change; AGENTS.md unchanged; no file deleted). Base: dev 8cb2201dfa9cb07eafb851cbceeccf7731f1b0fb (Foundations turn 34c-4's report; CI SUCCESS on 8cb2201d (run 40610714870, completed 2026-10-28T01:02:33Z; 1 flaky — ODE-1, INC-961; main promoted)). The executor is Lovable. ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — the census, red first; C — the workflows and the nightly's hour; D — the kit; E — the lint census's floor; F — the records; THE CHECKS; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: 8cb2201dfa9cb07eafb851cbceeccf7731f1b0fb
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
.claude/hooks/land.ts
.claude/rules/00-executor-protocol.md
.claude/rules/20-tests.md
.claude/settings.json
.claude/skills/turn-report/SKILL.md
.github/workflows/ci-status-report.yml
.github/workflows/ci.yml
.github/workflows/feed-bench.yml
.github/workflows/flake-check.yml
.github/workflows/guard-proof.yml
.github/workflows/local-backend-proof.yml
.github/workflows/nightly-e2e.yml
.github/workflows/zap-baseline.yml
docs/features/ci-local-backend.md
docs/features/nightly-e2e.md
docs/governance/instructions-amendments.md
docs/governance/launch-gate.md
docs/spec/spec-ledger.md
docs/tracking/action-tracker.md
docs/tracking/incidental-findings.md
scripts/ci/nightly-hour.sh
scripts/ci/nightly-hour.test.ts
scripts/conformance/ci-deadlines.test.ts
scripts/conformance/executor-hooks.test.ts
scripts/conformance/lint-rules.test.ts
SCOPE-END

THE SYSTEM (G0) — three concerns.
1 — CONCERN: a scheduled job that encodes a local time keeps it across the clock changes (governance §10's DST rule; register row 63, new).
MECHANISM: NONE YET — built in Part C as scripts/ci/nightly-hour.sh `<event> [<schedule> [<UTC day>]]`: prints `go=true|false` (and writes it to $GITHUB_OUTPUT when GitHub gives one); `workflow_dispatch` → go; a schedule is go only when its "M H * * *", on the run's UTC day (default today), is 11 o'clock in America/New_York; an unreadable call, schedule or day exits 2 with an `::error title=nightly-hour::` line and prints no verdict.
CONSUMERS (every schedule in .github/workflows/ at BASE, by its definition — a `cron:` line): nightly-e2e.yml :10 (`0 18 * * *`, DEC-171) — the only one; it moves onto the mechanism here (two schedules, the `hour` job; its jobs `nightly-e2e` and `cloudflare-parity-smoke` gain `needs: hour` and `if: needs.hour.outputs.go == 'true'`).
COVERED HERE: the one consumer. LEFT: none.
CONFORMANCE GUARD: NH-1…5 (scripts/ci/nightly-hour.test.ts: summer — 15:30 goes, 16:30 stands down; winter — the other way; both clock-change days have exactly one run at 11:30; a dispatch goes and reaches $GITHUB_OUTPUT; malformed input is an error with no verdict); CF-CID-1 holds the `hour` job's deadlines; the wired census (scripts/conformance/wired.test.ts) finds the script named by the workflow. No allowlist.
EXCEPTIONS: none.
FIVE LENSES — security: the `hour` job reads nothing secret (the event's name and schedule, through env, never interpolated into the script's text) and holds the workflow's read-only token · performance: one 5-second job a day stands down; the nightly itself is unchanged · failure modes: an unreadable schedule fails the `hour` job loudly (the nightly does not run silently wrong); a late start is judged by its schedule; a run GitHub drops is a missing heartbeat, as today · consistency: one script decides the hour · future growth: a second local-time job reuses the script (its zone and hour become arguments then).
2 — CONCERN: an executor's work reaches dev only with its checks green, and the checks run once per code tree (register row 37; DEC-278).
MECHANISM: .claude/hooks/land.ts — step 7 becomes `theChecks()`, shared by the landing and the new `--checks` mode (steps 1, 2 and 7 only; no report, scope or push; prints `CHECKS GREEN for code tree <key>`); any other argument exits 2. The cache key and markers are today's (the committed tree, reports left out).
CONSUMERS (every place that tells the executor how to run THE CHECKS — grep of BASE for "THE CHECKS", "land.ts" and the check list in .claude/ and CLAUDE.md): .claude/rules/00-executor-protocol.md :54–:58 (step 5) — moves onto `--checks`; .claude/skills/turn-report/SKILL.md :8–:21 (§1) — moves; .claude/settings.json :44 (the allow list) — gains `Bash(bun .claude/hooks/land.ts --checks)`; CLAUDE.md :55–:57 ("land.ts runs lint → … before anything reaches dev") — stays true, unchanged; scripts/conformance/executor-hooks.test.ts EXH-7 and EXH-16 (the allowed and required commands) — gain it.
COVERED HERE: all. LEFT: none.
CONFORMANCE GUARD: EXH-24 (new, scripts/conformance/executor-hooks.test.ts: `--checks` refuses a red check and pushes nothing; green, it prints CHECKS GREEN without a report and pushes nothing; the landing then says "already green for this code tree" for lint and format and lands; with nothing unlanded it says "Nothing to check"; `--check` exits 2); EXH-7 and EXH-16 (the permission rules and the guard allow it). No allowlist.
EXCEPTIONS: none.
FIVE LENSES — security: `--checks` cannot push (it exits before step 8) and changes nothing in the tree (step 7's own dirty-tree refusal stands); the permission rule is the exact command · performance: the executor's own check run and the landing no longer run the same checks twice on one tree (ESTIMATE 10–20 minutes saved a turn) · failure modes: a red step fails `--checks` with today's words; a code change after it runs the changed tree's checks again at the landing · consistency: one function runs the checks for both doors · future growth: a new check is one entry in the step list, for both.
3 — CONCERN: every CI job and every outside call carries a deadline (register row 59; INC-935's census, widened by its definition — INC-941).
MECHANISM: scripts/ci/with-deadline.sh and `timeout-minutes` (row 59, turn 34e) — unchanged; CF-CID-1's patterns widen.
CONSUMERS (CF-CID-1 with the sixth rule, run on BASE — Part B's red: 80 findings): 69 action steps without `timeout-minutes` (checkout ×25, setup-bun ×16, cache ×7, download-artifact ×7, upload-artifact ×7, setup-node, setup-python, setup-cli, github-script, upload-sarif, gitleaks, the ZAP action); ci.yml's semgrep install (`pip install`) and rules (`git clone`, `git -C … fetch`); ci.yml's promote job (`git fetch origin main`, `git push origin HEAD:main`); ci-status-report.yml's sync-main job (`git fetch origin main dev`, the lease-protected push).
COVERED HERE: all. LEFT: outside calls inside repository scripts the census cannot see in a workflow's text (scripts/publish-evidence.sh's push, scripts/staging-gate.ts and scripts/security-lints.ts's reads) — bounded by their job's deadline; K2 lists each with file:line.
CONFORMANCE GUARD: CF-CID-1 (six rules) — red on BASE with 80 findings, the first `.github/workflows/ci-status-report.yml:236 a step that uses actions/checkout@v7 declares no timeout-minutes`; CF-CID-2 (the planted workflow: eight breaches named — three new: an action step without a deadline, `pip install` outside the wrapper, a `git push` without a step deadline — and its kept steps not). No allowlist.
EXCEPTIONS: none.
FIVE LENSES — security: no new permission; the sessions sampler (INC-944) reads pg_stat_activity inside the temporary backend's own container with that backend's well-known local password, writes addresses-free rows (time, pid, application, state, wait, 120 characters of query — the queries are this repository's own migrations) into a log the evidence step already redacts · performance: a healthy run adds nothing measurable (a step deadline costs nothing; the sampler is one `docker exec` every 5 s during a 90–250 s start) · failure modes: a hung action is stopped at its ceiling and named, instead of holding its job to the job's deadline; the semgrep fetch is retried once out loud; a sampler that cannot read the database leaves a count of 0 and its first error line in a failed start's log, never a failed step · consistency: one census over every workflow · future growth: a new action, install or download is named by CF-CID-1 until it carries its deadline.
FORWARD-SCAN: none of the next turns adds a workflow; the private-repository switch (launch-gate) changes no schedule. REGISTER: rows 37 and 59 updated, row 63 added (Part F).
DEC-282 (the supervisor, under G17 — reversible CI tooling; overridable): the 69 action steps' deadlines are wide ceilings until measured — the supervisor's reads of the Actions API are refused today — 5 minutes for checkout and the setup actions and the SARIF upload, 10 for caches and artifacts, 8 for gitleaks and the status report's GitHub script, 25 for the ZAP scan, never more than the job's deadline less two minutes (ESTIMATE: each at least ten times the step's usual seconds); DEC-276's rule (from CI's own measured times) replaces each value once they are read. Its judge, frozen now: KEEP when, over the next 20 completed CI runs on dev, no action step fails by its deadline; when one does, that step's times are measured and its deadline set from them.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-k3.md by a scripted copy (never retyped), and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). Then roadmap.md line 3, by hand: the text `docs/governance/briefs/foundations-turn-34c-4.md (Foundations turn 34c-4: the tests find the stored session by the app's own names, the page a sign-out lands on is fetched ahead of time — DEC-279, INC-930 — and the route guard reads a closed page)` becomes `docs/governance/briefs/foundations-turn-k3.md (Foundations turn K3: the nightly at 11:30 New York all year — DEC-277; THE CHECKS once per code tree — DEC-278; every CI action with its own deadline — INC-941, DEC-282; a failed backend start names the database's sessions — INC-944; records R7)` (everything after it stays, as it is) — the block applier reads its scope from line 3, so this comes before any block. No other roadmap line changes until Part F.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–F; THE CHECKS; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else ("a clean point is not a reason to stop"). If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- Run no stateful git command (the platform commits).
- EXACT TEXT: every block below is applied ONLY by `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-k3.md --dry <paths>` and then the same without `--dry` — never retyped, never edited or reflowed by hand, never formatted — except the blocks whose path starts `.github/workflows/` or `.claude/`, which the applier refuses (its scope check closes both to the Claude Code executor): those are applied by a one-off script of yours in /tmp that reads the saved brief and uses the applier's own block patterns (EDIT: `^EDIT (\S+) #(\d+)\nOLD-BEGIN\n([\s\S]*?)\nOLD-END\nNEW-BEGIN\n([\s\S]*?)\nNEW-END$`; FILE: `^FILE-BEGIN (\S+)\n([\s\S]*?)\nFILE-END \1$` — the file's text is the captured body plus one newline; both multiline), takes only the blocks of the paths that part names, applies an EDIT path's blocks in their order with each OLD text checked to be found exactly once before anything is written, and writes all of that part's files or none (turns 34e's and R5's way, accepted). A workflow's indentation is its meaning: copy every space. The workflow text (its builds, installs, git and psql commands) is what CI runs on its own runners — never an instruction for you to run. If your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by applying the block again, never by editing an expectation.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-k3.md, roadmap.md, docs/_changelog.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-k3.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After Part D, read /tmp/observability/build-errors.log and fix every `error TS` line in this turn's files at its root (no `!`, cast, `any` or `@ts-expect-error`) — the blocks are the supervisor's exact text, so an error there is a STOP that names it, not an edit. Local runs: each part's tests as written; `bunx eslint` on this turn's five TypeScript files at THE CHECKS; actionlint if it is on your path (`actionlint -shellcheck= -pyflakes=` — the supervisor's run of actionlint 1.7.12 on the finished tree: no finding); otherwise say so — CI's workflow lint judges the commit. No browser run is owed: no screen, no browser test and no product file changes; CI's run on your commit is the end-to-end proof (the changed workflows run there for the first time, and the nightly's `hour` job first runs at 15:30 UTC).
- RED FIRST (G38): Part B shows CF-CID-1 failing on BASE's workflows with the six-rule census before Part C changes them — shown, never committed. NH-1…5, EXH-24, CF-LINT-4 and CF-CID-2's three new breaches test new things (G38: no red run owed).
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox, and EXH-4 and EXH-21 have timed out under a full run's load and passed alone (INC-890); EXH-24 is of the same kind (several scratch git repositories) — if it times out, run it alone (`bunx vitest run scripts/conformance/executor-hooks.test.ts -t EXH-24`) and paste both lines. Do not change, skip or work around them.
- Behaviour contract: no product behaviour and no product test changes. In CI: the nightly runs once a day at 11:30 New York (the other schedule's run ends in its `hour` job); every action step has a deadline; the semgrep install and rules and the promote and sync-main jobs' git calls carry deadlines (the downloads through the wrapper); a failed backend start writes the database's busy sessions into its evidence, and the run's proof lists each lane's sample count. In the kit: `land.ts --checks` exists and the landing behaves as at BASE. In the records: as Part F says. Nothing else changes.
- Knowledge K: K1 the censuses above; K2 the report lists (file:line) every outside call in a workflow that CF-CID-1's patterns still do not see — inside a repository script a step calls (expected at least: scripts/publish-evidence.sh's `git push`, scripts/staging-gate.ts's API reads, scripts/security-lints.ts's REST read) or a `docker pull`, `wget` or `gh` download — listed, not changed; K3 every guard lands with its mechanism (NH-1…5, EXH-24, CF-CID-1's sixth rule, CF-LINT-4); K4–K6 do not arise.
- The reviewer: after THE CHECKS, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed (STOP when the fix would change a block's text) and reviewed again; a MAJOR or MINOR is listed with its reason for the supervisor's ruling (the blocks are exact text).
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first (expected: SUCCESS on 8cb2201d (run 40610714870, completed 2026-10-28T01:02:33Z; 1 flaky — ODE-1, INC-961; main promoted)). Any red on BASE is a STOP that names it (the supervisor reads it before this turn).

PART B — THE CENSUS, RED FIRST.
B1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-k3.md --dry scripts/conformance/ci-deadlines.test.ts` and the same without `--dry`, then `bunx vitest run scripts/conformance/ci-deadlines.test.ts` — RED, shown and not committed: paste the totals, the count (`… 2>&1 | grep -c 'declares no\|install outside\|ports are reserved\|runs once'`) and the first finding (the supervisor's run on BASE's workflows: `Tests  1 failed | 1 passed (2)`; 80 findings; the first `.github/workflows/ci-status-report.yml:236 a step that uses actions/checkout@v7 declares no timeout-minutes`).

PART C — THE WORKFLOWS AND THE NIGHTLY'S HOUR (INC-941, DEC-282, DEC-277, INC-944).
C1. The workflows' EDIT blocks by your one-off script (HOW TO WORK) — the paths .github/workflows/ci-status-report.yml, ci.yml, feed-bench.yml, flake-check.yml, guard-proof.yml, local-backend-proof.yml, nightly-e2e.yml and zap-baseline.yml, all or none; paste the script's count line (expected: 50 EDIT blocks to 8 files).
C2. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-k3.md --dry scripts/ci/nightly-hour.sh scripts/ci/nightly-hour.test.ts docs/features/nightly-e2e.md docs/features/ci-local-backend.md`, then the same without `--dry`; paste the output (expected: `FILE scripts/ci/nightly-hour.sh (2393 bytes)` · `FILE scripts/ci/nightly-hour.test.ts (3696 bytes)` · `EDIT docs/features/nightly-e2e.md #1` · `EDIT docs/features/ci-local-backend.md #1` · `applied 4 block(s) to 4 file(s)`).
C3. `bunx vitest run scripts/conformance/ci-deadlines.test.ts scripts/ci/nightly-hour.test.ts scripts/ci/with-deadline.test.ts scripts/conformance/wired.test.ts` — paste the totals (the supervisor's run: 4 files, every test passed); actionlint's last line or why it did not run; and `bash scripts/ci/nightly-hour.sh schedule "30 16 * * *" 2026-11-01` (expected, two lines: `nightly-hour: "30 16 * * *" on 2026-11-01 is 11:30 in New York — this is the nightly's run` and `go=true`).

PART D — THE KIT (DEC-278; turn 34f's owed line).
D1. The kit's blocks by your one-off script — the paths .claude/hooks/land.ts (a FILE block: the whole file), .claude/settings.json, .claude/rules/00-executor-protocol.md, .claude/rules/20-tests.md and .claude/skills/turn-report/SKILL.md, all or none; paste its count line (expected: 1 FILE block and 6 EDIT blocks to 5 files).
D2. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-k3.md --dry scripts/conformance/executor-hooks.test.ts` and the same without `--dry`; then `bunx vitest run scripts/conformance/executor-hooks.test.ts` — paste the totals (the supervisor's run: every test passed, EXH-24 included; the known limits apply) — and `bun .claude/hooks/land.ts --check; echo "exit $?"` (expected: `land.ts takes no argument but --checks (THE CHECKS only, no push); it was given: --check` and `exit 2` — it stops before reading anything, so it is safe to run in your sandbox; do NOT run `land.ts` without that argument or with `--checks`: the landing door is the Claude Code executor's).

PART E — THE LINT CENSUS'S FLOOR.
E1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-k3.md --dry scripts/conformance/lint-rules.test.ts` and the same without `--dry`; then `bunx vitest run scripts/conformance/lint-rules.test.ts` — paste the totals (the supervisor's run: 4 passed — CF-LINT-1…4).

PART F — THE RECORDS (R7), BY THE APPLIER.
F1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-k3.md --dry docs/tracking/incidental-findings.md docs/tracking/action-tracker.md docs/governance/instructions-amendments.md docs/spec/spec-ledger.md docs/governance/launch-gate.md docs/governance/mechanisms.md roadmap.md docs/_changelog.md`, then the same without `--dry`; paste the output (expected: `EDIT docs/tracking/incidental-findings.md #1` · `EDIT docs/tracking/action-tracker.md #1` · `EDIT docs/tracking/action-tracker.md #2` · `EDIT docs/governance/instructions-amendments.md #1` · `EDIT docs/spec/spec-ledger.md #1` · `EDIT docs/governance/launch-gate.md #1` · `EDIT docs/governance/launch-gate.md #2` · `EDIT docs/governance/launch-gate.md #3` · `EDIT docs/governance/launch-gate.md #4` · `EDIT docs/governance/mechanisms.md #1` · `EDIT docs/governance/mechanisms.md #2` · `EDIT docs/governance/mechanisms.md #3` · `EDIT roadmap.md #1` · `EDIT roadmap.md #2` · `EDIT roadmap.md #3` · `EDIT roadmap.md #4` · `EDIT roadmap.md #5` · `EDIT roadmap.md #6` · `EDIT docs/_changelog.md #1` · `applied 19 block(s) to 8 file(s)`).
F2. Paste: `grep -n '^## INC-95[5-9] \|^## INC-96[01] \|^Numbering: next free INC-96' docs/tracking/incidental-findings.md | cut -c1-40` (eight lines, in that order: INC-955 … INC-961, then `Numbering: next free INC-962.`); `grep -c '^- S46[01] \|^- S45[89] ' docs/governance/instructions-amendments.md` (4); `tail -1 docs/spec/spec-ledger.md`; `tail -1 docs/tracking/action-tracker.md | cut -c1-30` (`- ACT-021 (2026-10-27) — a pho`); `grep -c '^  - \[ \] Turn .*bundle-22-turn-' roadmap.md` (0 — bundle 22's turn lines all ticked; 19 at <START>); `sed -n 3p roadmap.md | cut -c1-80` (names foundations-turn-k3.md).

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-k3.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src e2e supabase AGENTS.md CLAUDE.md package.json bun.lock` (empty); `bunx eslint .claude/hooks/land.ts scripts/ci/nightly-hour.test.ts scripts/conformance/ci-deadlines.test.ts scripts/conformance/executor-hooks.test.ts scripts/conformance/lint-rules.test.ts` (clean); `bunx vitest run scripts` (paste the totals — the supervisor's run: every test passed; the known limits apply; CI runs the whole unit suite on your commit); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
334edc2d56f2c2f5bde117d9b2fc6a7fe29d41923e5a336d8aafb84806cbb6ef  scripts/conformance/ci-deadlines.test.ts
9ec3ec11c038bf203aa58979b071e08e9683c6ab394a02d351eec5ed8354aa20  .github/workflows/ci-status-report.yml
d5181321d7aa9e2ab3503b2a1c0b6c60a17549c314b5bcea80980693a202a5e9  .github/workflows/ci.yml
0eb321adaa86894a771217cc32fd9d402e5796e7514ea0f2140650d99306d7a2  .github/workflows/feed-bench.yml
53ee003c4d5446b6ead03f7952eb0bd707353a3afee68a1e7820e732463feab4  .github/workflows/flake-check.yml
77d98b3eaf291bd094468e758432c0942b34d336d67eac3c9aeae4fdecfa4f67  .github/workflows/guard-proof.yml
0fce7d8df6edaa07f88322314a84c36524ab3ac62eda0b249f72b420888d6a11  .github/workflows/local-backend-proof.yml
c52b2ddd1565472709a24bf310746dba634ed4c40bd61bed3e69bd71b52926b3  .github/workflows/nightly-e2e.yml
f43ff03f5d4fc4243266c4467e692457884cc7dcc41f46034f9df63407cde5d8  .github/workflows/zap-baseline.yml
b4faef21afbd8b252bda9a1bfef6504c950f887b8e18da3d7a92ea93f5ef83dd  scripts/ci/nightly-hour.sh
b5567725159cee535e768c5ab98f9f4d6d5d328ccf94666ac555ff2d98ee2fc6  scripts/ci/nightly-hour.test.ts
4c9b190131259b6624e44b50904c176e2cb1d3c7aefb1cef9b972a80e8c3ed26  docs/features/nightly-e2e.md
66058a78127c5e9462ed38e48484daed5fcc2d7ede1100ae38bd587c2dc54147  docs/features/ci-local-backend.md
98e039c0744b5c169d6083349be1d9341d2d1b76e86f71927d4cf49eaa83f8c3  .claude/hooks/land.ts
345095726658d185c1b48f6e1c8bbc6f6151cb8a1f0e20ba622ca04652c30d4f  .claude/settings.json
ed8fbbe2144777b19d1a3746f0fc9feb4f17c71393c0ccb68ed91c50984a0d85  .claude/rules/00-executor-protocol.md
4c04fa3cd4e530c2ffbba86957d4a440f530a82d5107991341a2131b8b3bf0e2  .claude/rules/20-tests.md
47ff957993cfda9a11784a1e97ac2a2136b751dc21027a10ba8ccd4f2e9306cf  .claude/skills/turn-report/SKILL.md
54957019a163ae25408d769beb514cd6e562600588c78bc1b4cd19c1ab0516cd  scripts/conformance/executor-hooks.test.ts
72db31efa220fcb491472353a0cc7e26ec281eef07e235472761e2bd22bef3fb  scripts/conformance/lint-rules.test.ts
a72b78e8407554271fcc7a316912200bd913d97a1bceb695df4e18c7b2b837ba  docs/tracking/incidental-findings.md
7d56b28a8a35993741e7ef3ac2a14283fa0589306679d4afe3c699906f10d563  docs/tracking/action-tracker.md
d533128911fdd5a3e20d5c253c15581852820f076e4506e58dfe94bac0a3764d  docs/governance/instructions-amendments.md
13fbf4e89272d2d173fecae71bbc221685f010a07c88581838bb460ceb2c8ac5  docs/spec/spec-ledger.md
560fdcf7ccf8a432bbf4a3397ff7908dc827d850f125af6f27fcedd5c7e13351  docs/governance/launch-gate.md
bf371d006981454eee0d7825b06b584de68fda5c14ab333a0a001925dfa4749c  docs/governance/mechanisms.md
00f07b113c1d97a6ec80e256381fbf3077e9db95b3812adb9679771905505f9f  docs/_changelog.md

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-k3.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the red-first lines; every test total; actionlint's last line or why it did not run; the K2 list (file:line); "none" for migrations, strings, product code and browser tests; the reviewer's verdict and its findings; every departure with its reason; the first six lines of ci-status.md for the last commit you can read (this turn's own run will not have completed — say so); every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; listed for the operator as overridable): DEC-282 as above; the nightly's two schedules at :30 (DEC-277's form); the hour judged from the schedule that fired, not the clock; `--checks` as a mode of the landing door rather than a second script (one list of checks); CF-LINT's floors at about half of today's counts (src 890 → 400, e2e 118 → 50); the semgrep rules fetched as the pinned commit only (a retry is then safe).

EDIT scripts/conformance/ci-deadlines.test.ts #1
OLD-BEGIN
 * INC-943, DEC-276); downloads, `apt-get update` and `bun install` may be retried.
 */
OLD-END
NEW-BEGIN
 * INC-943, DEC-276); downloads, `apt-get update` and `bun install` may be retried.
 * INC-941 (Foundations turn K3) — the same rule by its definition: pip's installs and git's network
 * commands reach outside too (a `pip install` or `git clone` hung is a 15-minute job lost), and
 * so does every action a step uses (setup-bun, setup-node, setup-python, gitleaks, cache,
 * artifacts, checkout): each declares its own deadline. A download that is safe to repeat
 * (`pip install`, `git clone`, `git fetch`) runs through the wrapper; a push does not (it is not
 * repeated blindly), it carries its step deadline.
 */
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #2
OLD-BEGIN
const OUTSIDE =
  /\b(?:bun install|playwright install|apt-get (?:update|install)|curl|supabase start)\b/;
/** A command line that installs, and so must run through the retrying deadline. */
const INSTALL = /\b(?:bun install|playwright install|apt-get (?:update|install))\b/;
const WRAPPER = "scripts/ci/with-deadline.sh";
OLD-END
NEW-BEGIN
const OUTSIDE =
  /\b(?:bun install|playwright install|apt-get (?:update|install)|curl|wget|supabase start|pip install|git(?: -C \S+)? (?:clone|fetch|push|ls-remote))\b/;
/** A command line that installs or downloads, and so must run through the retrying deadline. */
const INSTALL =
  /\b(?:bun install|playwright install|apt-get (?:update|install)|pip install|git(?: -C \S+)? (?:clone|fetch))\b/;
/** The action a step uses (`uses: owner/action@ref`), or null — a local `./` workflow is no action. */
function actionOf(step: Step): string | null {
  for (const line of step.text.split("\n")) {
    const use = /^\s*(?:- )?uses:\s*(\S+)/.exec(line);
    if (use) return (use[1] ?? "").startsWith("./") ? null : (use[1] ?? null);
  }
  return null;
}
const WRAPPER = "scripts/ci/with-deadline.sh";
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #3
OLD-BEGIN

/** Every breach of the five rules in the given workflows. */
export function deadlineFindings(files: Array<{ file: string; text: string }>): Finding[] {
OLD-END
NEW-BEGIN

/** Every breach of the six rules in the given workflows. */
export function deadlineFindings(files: Array<{ file: string; text: string }>): Finding[] {
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #4
OLD-BEGIN
        if (commands.some((line) => line.includes(RESERVE))) reserved = true;
        if (commands.some((line) => OUTSIDE.test(line)) && !step.timeout)
          findings.push({
OLD-END
NEW-BEGIN
        if (commands.some((line) => line.includes(RESERVE))) reserved = true;
        const action = actionOf(step);
        if (action !== null && !step.timeout)
          findings.push({
            file,
            line: step.line,
            what: `a step that uses ${action} declares no timeout-minutes`,
          });
        else if (commands.some((line) => OUTSIDE.test(line)) && !step.timeout)
          findings.push({
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #5
OLD-BEGIN
describe("every CI job and every outside call carries a deadline (INC-935)", () => {
  it("CF-CID-1 every workflow's jobs, outside calls, installs and backend starts keep the five rules", () => {
    const jobs = workflows.flatMap(({ file, text }) => readWorkflow(file, text));
OLD-END
NEW-BEGIN
describe("every CI job and every outside call carries a deadline (INC-935)", () => {
  it("CF-CID-1 every workflow's jobs, actions, outside calls, installs and backend starts keep the six rules", () => {
    const jobs = workflows.flatMap(({ file, text }) => readWorkflow(file, text));
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #6
OLD-BEGIN

  it("CF-CID-2 a planted workflow's five breaches are named and its kept steps are not", () => {
    const dir = "node_modules/.cache/ci-deadlines";
OLD-END
NEW-BEGIN

  it("CF-CID-2 a planted workflow's eight breaches are named and its kept steps are not", () => {
    const dir = "node_modules/.cache/ci-deadlines";
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #7
OLD-BEGIN
          `        run: bash ${WRAPPER} 300 2 -- bunx playwright install --with-deps chromium`,
          "",
OLD-END
NEW-BEGIN
          `        run: bash ${WRAPPER} 300 2 -- bunx playwright install --with-deps chromium`,
          "  actions:",
          "    runs-on: ubuntu-24.04",
          "    timeout-minutes: 10",
          "    steps:",
          "      - uses: actions/checkout@v5",
          "      - name: Setup kept",
          "        timeout-minutes: 5",
          "        uses: oven-sh/setup-bun@v2",
          "      - name: Python packages",
          "        timeout-minutes: 5",
          "        run: pip install semgrep",
          "      - name: Rules kept",
          "        timeout-minutes: 5",
          `        run: bash ${WRAPPER} 300 2 -- git -C /tmp/rules fetch --depth 1 origin main`,
          "      - name: Push",
          "        run: git -C /tmp/rules push origin HEAD:main",
          "",
NEW-END
EDIT scripts/conformance/ci-deadlines.test.ts #8
OLD-BEGIN
          `${file}:32 a package install retried (2 tries; it runs once): run: bash ${WRAPPER} 300 2 -- bunx playwright install --with-deps chromium`,
        ].join("\n"),
OLD-END
NEW-BEGIN
          `${file}:32 a package install retried (2 tries; it runs once): run: bash ${WRAPPER} 300 2 -- bunx playwright install --with-deps chromium`,
          `${file}:39 a step that uses actions/checkout@v5 declares no timeout-minutes`,
          `${file}:43 an install outside ${WRAPPER}: run: pip install semgrep`,
          `${file}:49 a step that reaches outside declares no timeout-minutes`,
        ].join("\n"),
NEW-END
EDIT .github/workflows/ci-status-report.yml #1
OLD-BEGIN
    steps:
      - uses: actions/checkout@v7
        with:
          ref: dev

      - name: Build status file
        uses: actions/github-script@v9
        with:
OLD-END
NEW-BEGIN
    steps:
      - uses: actions/checkout@v7
        timeout-minutes: 5
        with:
          ref: dev

      - name: Build status file
        timeout-minutes: 8
        uses: actions/github-script@v9
        with:
NEW-END
EDIT .github/workflows/ci-status-report.yml #2
OLD-BEGIN
          fi
      - uses: actions/checkout@v7
        with:
          ref: dev
OLD-END
NEW-BEGIN
          fi
      - uses: actions/checkout@v7
        timeout-minutes: 5
        with:
          ref: dev
NEW-END
EDIT .github/workflows/ci-status-report.yml #3
OLD-BEGIN

      - name: Show what will be overwritten
        run: |
          set -eu
          git fetch origin main dev
          echo "main HEAD: $(git rev-parse origin/main)"
          echo "dev  HEAD: $(git rev-parse origin/dev)"
OLD-END
NEW-BEGIN

      - name: Show what will be overwritten
        timeout-minutes: 5
        run: |
          set -eu
          bash scripts/ci/with-deadline.sh 120 2 -- git fetch origin main dev
          echo "main HEAD: $(git rev-parse origin/main)"
          echo "dev  HEAD: $(git rev-parse origin/dev)"
NEW-END
EDIT .github/workflows/ci-status-report.yml #4
OLD-BEGIN

      - name: Force main to dev (lease-protected)
        run: |
          set -eu
OLD-END
NEW-BEGIN

      - name: Force main to dev (lease-protected)
        timeout-minutes: 5
        run: |
          set -eu
NEW-END
EDIT .github/workflows/ci.yml #1
OLD-BEGIN
    name: Build, typecheck, lint
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v5
        with:
          # INC-076: the deletion guard needs the previous main commit in the
          # local object store, so the shallow default will not do.
          fetch-depth: 0
      # INC-076 (ratified): a push that deletes files must SAY so. The guard is
OLD-END
NEW-BEGIN
    name: Build, typecheck, lint
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
        with:
          # INC-076: the deletion guard needs the previous main commit in the
          # local object store, so the shallow default will not do.
          fetch-depth: 0
      # INC-076 (ratified): a push that deletes files must SAY so. The guard is
NEW-END
EDIT .github/workflows/ci.yml #2
OLD-BEGIN
      - name: Shell-pipes guard (INC-832)
        run: |
          SELF_TEST=1 bash scripts/check-shell-pipes.sh
          bash scripts/check-shell-pipes.sh
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.14
      - name: Promote needs every job (with self-test)
        run: |
          if out="$(bash scripts/check-promote-needs.sh scripts/fixtures/ci-promote-needs-bad.yml 2>&1)"; then
OLD-END
NEW-BEGIN
      - name: Shell-pipes guard (INC-832)
        run: |
          SELF_TEST=1 bash scripts/check-shell-pipes.sh
          bash scripts/check-shell-pipes.sh
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
          bun-version: 1.3.14
      - name: Promote needs every job (with self-test)
        run: |
          if out="$(bash scripts/check-promote-needs.sh scripts/fixtures/ci-promote-needs-bad.yml 2>&1)"; then
NEW-END
EDIT .github/workflows/ci.yml #3
OLD-BEGIN
    name: Component tests
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.14
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
OLD-END
NEW-BEGIN
    name: Component tests
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
          bun-version: 1.3.14
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
NEW-END
EDIT .github/workflows/ci.yml #4
OLD-BEGIN
    permissions:
      contents: read
      pull-requests: read
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0
      - uses: gitleaks/gitleaks-action@v3
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  migration-lint:
    name: Migration linter (with self-test)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.14
      # Self-tests first: a guard that only ever passes proves nothing.
      - name: Guard self-tests (RLS fixture + SECURITY DEFINER sample)
        run: SELF_TEST=1 bash scripts/check-migrations.sh
OLD-END
NEW-BEGIN
    permissions:
      contents: read
      pull-requests: read
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
        with:
          fetch-depth: 0
      - uses: gitleaks/gitleaks-action@v3
        timeout-minutes: 8
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  migration-lint:
    name: Migration linter (with self-test)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
          bun-version: 1.3.14
      # Self-tests first: a guard that only ever passes proves nothing.
      - name: Guard self-tests (RLS fixture + SECURITY DEFINER sample)
        run: SELF_TEST=1 bash scripts/check-migrations.sh
NEW-END
EDIT .github/workflows/ci.yml #5
OLD-BEGIN
    name: i18n used-on map is fresh (U4i ②)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      # The map is a pure function of src/: regenerating it must be a no-op.
      # A diff here means someone added or removed a t("key") call site without
      # rerunning `bun run i18n:usage`.
OLD-END
NEW-BEGIN
    name: i18n used-on map is fresh (U4i ②)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
          bun-version: latest
      # The map is a pure function of src/: regenerating it must be a no-op.
      # A diff here means someone added or removed a t("key") call site without
      # rerunning `bun run i18n:usage`.
NEW-END
EDIT .github/workflows/ci.yml #6
OLD-BEGIN
    name: Hardcoded string scan (enforcing)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
      - name: Run string scan
        run: bash scripts/check-hardcoded-strings.sh

  import-gate:
    name: Import gate guard (with self-test)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
      # The guard passes on real routes AND rejects its own bad fixture (a
      # hand-rolled second door); both directions run in the same step.
      - name: One door for every import/export
        run: bash scripts/check-import-gate.sh

OLD-END
NEW-BEGIN
    name: Hardcoded string scan (enforcing)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - name: Run string scan
        run: bash scripts/check-hardcoded-strings.sh

  import-gate:
    name: Import gate guard (with self-test)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
      # The guard passes on real routes AND rejects its own bad fixture (a
      # hand-rolled second door); both directions run in the same step.
      - name: One door for every import/export
        run: bash scripts/check-import-gate.sh

NEW-END
EDIT .github/workflows/ci.yml #7
OLD-BEGIN
    name: Listing-write seam guard (with self-test)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
      # Direction 1: the guard must PASS on real source.
      - name: Guard src/
        run: bash scripts/check-listing-writes.sh src
      # Direction 2: the guard must FAIL on the known-bad fixture. A guard that
      # only ever passes proves nothing (same discipline as the migration linter).
OLD-END
NEW-BEGIN
    name: Listing-write seam guard (with self-test)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      # Direction 1: the guard must PASS on real source.
      - name: Guard src/
        run: bash scripts/check-listing-writes.sh src
      # Direction 2: the guard must FAIL on the known-bad fixture. A guard that
      # only ever passes proves nothing (same discipline as the migration linter).
NEW-END
EDIT .github/workflows/ci.yml #8
OLD-BEGIN
    name: Browse-path guard (no RBAC seam on the marketplace path, with self-test)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
      # Direction 1: the guard must PASS on real source.
      - name: Guard src/
        run: bash scripts/check-browse-imports.sh src
      # Direction 2: the guard must FAIL on the known-bad fixture.
      - name: Self-test — guard must reject the bad fixture
OLD-END
NEW-BEGIN
    name: Browse-path guard (no RBAC seam on the marketplace path, with self-test)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      # Direction 1: the guard must PASS on real source.
      - name: Guard src/
        run: bash scripts/check-browse-imports.sh src
      # Direction 2: the guard must FAIL on the known-bad fixture.
      - name: Self-test — guard must reject the bad fixture
NEW-END
EDIT .github/workflows/ci.yml #9
OLD-BEGIN
    name: Marketplace weight guard (no heavy deps on the first-paint path)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: "22"
      - name: Guard the marketplace module graph
        run: node scripts/check-marketplace-imports.mjs

OLD-END
NEW-BEGIN
    name: Marketplace weight guard (no heavy deps on the first-paint path)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: actions/setup-node@v5
        timeout-minutes: 5
        with:
          node-version: "22"
      - name: Guard the marketplace module graph
        run: node scripts/check-marketplace-imports.mjs

NEW-END
EDIT .github/workflows/ci.yml #10
OLD-BEGIN
    name: First-paint bundle budget (gzipped ceiling)
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.14
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
OLD-END
NEW-BEGIN
    name: First-paint bundle budget (gzipped ceiling)
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
          bun-version: 1.3.14
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
NEW-END
EDIT .github/workflows/ci.yml #11
OLD-BEGIN
    env:
      SEMGREP_VERSION: "1.179.0"
      SEMGREP_RULES_SHA: a84ff9cc2453ca91d581380de4b8b3f272f6f4be
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install pinned Semgrep
        run: pip install "semgrep==${SEMGREP_VERSION}"
      - name: Fetch pinned rules
        run: |
          git clone --depth 1 https://github.com/semgrep/semgrep-rules /tmp/semgrep-rules
          git -C /tmp/semgrep-rules fetch --depth 1 origin "$SEMGREP_RULES_SHA"
          git -C /tmp/semgrep-rules checkout --quiet "$SEMGREP_RULES_SHA"
          # Excluded rule (baseline 2026-10-05: 304 noise results; i18n is
          # enforced by our own string scan and usage map).
          rm -f /tmp/semgrep-rules/typescript/react/portability/i18next/i18next-key-format.yaml
          # Excluded rules (DEC-153 b; counted on dev at 2cf755cd: 51, 2 and 1
OLD-END
NEW-BEGIN
    env:
      SEMGREP_VERSION: "1.179.0"
      SEMGREP_RULES_SHA: a84ff9cc2453ca91d581380de4b8b3f272f6f4be
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: actions/setup-python@v5
        timeout-minutes: 5
        with:
          python-version: "3.12"
      - name: Install pinned Semgrep
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- pip install "semgrep==${SEMGREP_VERSION}"
      # INC-941 — only the pinned commit is fetched (no clone of the default branch), and the
      # fetch is safe to repeat, so it runs through the retrying deadline.
      - name: Fetch pinned rules
        timeout-minutes: 12
        run: |
          git init --quiet /tmp/semgrep-rules
          git -C /tmp/semgrep-rules remote add origin https://github.com/semgrep/semgrep-rules
          bash scripts/ci/with-deadline.sh 300 2 -- git -C /tmp/semgrep-rules fetch --depth 1 origin "$SEMGREP_RULES_SHA"
          git -C /tmp/semgrep-rules checkout --quiet "$SEMGREP_RULES_SHA"
          # Excluded rule (baseline 2026-10-05: 304 noise results; i18n is
          # enforced by our own string scan and usage map).
          rm -f /tmp/semgrep-rules/typescript/react/portability/i18next/i18next-key-format.yaml
          # Excluded rules (DEC-153 b; counted on dev at 2cf755cd: 51, 2 and 1
NEW-END
EDIT .github/workflows/ci.yml #12
OLD-BEGIN
      # (GitHub's incident of 2026-10-07) turned this job red while the scan had
      # passed; the scan's own steps above decide the job now, and a failed
      # upload is the warning step below. The CI status reporter names every
      # "Warn: " step that ran in guards-last-failure.md.
      - name: Upload SARIF
        id: sarif
        if: always() && hashFiles('semgrep.sarif') != ''
        continue-on-error: true
        uses: github/codeql-action/upload-sarif@v3
        with:
OLD-END
NEW-BEGIN
      # (GitHub's incident of 2026-10-07) turned this job red while the scan had
      # passed; the scan's own steps above decide the job now, and a failed
      # upload is the warning step below. The CI status reporter names every
      # "Warn: " step that ran in guards-last-failure.md.
      - name: Upload SARIF
        timeout-minutes: 5
        id: sarif
        if: always() && hashFiles('semgrep.sarif') != ''
        continue-on-error: true
        uses: github/codeql-action/upload-sarif@v3
        with:
NEW-END
EDIT .github/workflows/ci.yml #13
OLD-BEGIN
    name: Dependency vulnerability audit (enforcing on high/critical)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.14
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
OLD-END
NEW-BEGIN
    name: Dependency vulnerability audit (enforcing on high/critical)
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
          bun-version: 1.3.14
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
NEW-END
EDIT .github/workflows/ci.yml #14
OLD-BEGIN
      E2E_SUPABASE_URL: https://jatpuhfdjfzctjipklmk.supabase.co
      E2E_SUPABASE_PUBLISHABLE_KEY: ${{ vars.E2E_SUPABASE_PUBLISHABLE_KEY }}
      E2E_SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.E2E_SUPABASE_SERVICE_ROLE_KEY }}
    steps:
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.14
      - name: Cache bun install
        id: bun-cache
        uses: actions/cache@v5
        with:
          path: ~/.bun/install/cache
          key: bun-${{ runner.os }}-${{ hashFiles('bun.lock') }}
OLD-END
NEW-BEGIN
      E2E_SUPABASE_URL: https://jatpuhfdjfzctjipklmk.supabase.co
      E2E_SUPABASE_PUBLISHABLE_KEY: ${{ vars.E2E_SUPABASE_PUBLISHABLE_KEY }}
      E2E_SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.E2E_SUPABASE_SERVICE_ROLE_KEY }}
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
          bun-version: 1.3.14
      - name: Cache bun install
        timeout-minutes: 10
        id: bun-cache
        uses: actions/cache@v5
        with:
          path: ~/.bun/install/cache
          key: bun-${{ runner.os }}-${{ hashFiles('bun.lock') }}
NEW-END
EDIT .github/workflows/ci.yml #15
OLD-BEGIN
    timeout-minutes: 15
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.14
      # INC-084e — DOWNLOAD RESILIENCE. actions/download-artifact@v4 FAILS the
      # step when a `pattern` matches nothing (e.g. every upstream job died
      # before uploading). A missing or partial artifact set must never kill
      # the job before the reporter runs: the reporter's whole purpose is to
      # describe exactly that situation.
      - name: Download shard results
        uses: actions/download-artifact@v7
        continue-on-error: true
        with:
          pattern: e2e-results-*
          path: shard-results
      # Log tails only exist for RED jobs; a run where every job wrote results
      # downloads nothing here and the step is a no-op.
      - name: Download job log tails
        uses: actions/download-artifact@v7
        continue-on-error: true
        with:
          pattern: e2e-log-*
          path: shard-logs
OLD-END
NEW-BEGIN
    timeout-minutes: 15
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
          bun-version: 1.3.14
      # INC-084e — DOWNLOAD RESILIENCE. actions/download-artifact@v4 FAILS the
      # step when a `pattern` matches nothing (e.g. every upstream job died
      # before uploading). A missing or partial artifact set must never kill
      # the job before the reporter runs: the reporter's whole purpose is to
      # describe exactly that situation.
      - name: Download shard results
        timeout-minutes: 10
        uses: actions/download-artifact@v7
        continue-on-error: true
        with:
          pattern: e2e-results-*
          path: shard-results
      # Log tails only exist for RED jobs; a run where every job wrote results
      # downloads nothing here and the step is a no-op.
      - name: Download job log tails
        timeout-minutes: 10
        uses: actions/download-artifact@v7
        continue-on-error: true
        with:
          pattern: e2e-log-*
          path: shard-logs
NEW-END
EDIT .github/workflows/ci.yml #16
OLD-BEGIN
      # merge-multiple:false, EACH artifact lands in its OWN subdirectory named
      # after the artifact — shard-contexts/e2e-context-smoke/test-results/<slug>/
      # error-context.md. The reporter walks for error-context.md by name, so
      # it handles that shape, the merged-flat shape and the empty directory.
      - name: Download error contexts
        uses: actions/download-artifact@v7
        continue-on-error: true
        with:
          pattern: e2e-context-*
          path: shard-contexts
OLD-END
NEW-BEGIN
      # merge-multiple:false, EACH artifact lands in its OWN subdirectory named
      # after the artifact — shard-contexts/e2e-context-smoke/test-results/<slug>/
      # error-context.md. The reporter walks for error-context.md by name, so
      # it handles that shape, the merged-flat shape and the empty directory.
      - name: Download error contexts
        timeout-minutes: 10
        uses: actions/download-artifact@v7
        continue-on-error: true
        with:
          pattern: e2e-context-*
          path: shard-contexts
NEW-END
EDIT .github/workflows/ci.yml #17
OLD-BEGIN
          if ! test -n "$PROMOTE_TOKEN"; then
            echo "::error::PROMOTE_TOKEN is not set — the repository secret that writing main needs (INC-787, DEC-210)"
            exit 1
          fi
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0
          token: ${{ secrets.PROMOTE_TOKEN }}
      - name: Configure the actions bot
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
      - name: Fast-forward guard (ff-only law — never merge/rebase here)
        run: |
          git fetch origin main
          git merge-base --is-ancestor origin/main HEAD || { echo "::error::MAIN DIVERGED — fast-forward impossible; manual reconcile per DEC-020 (ff-only law, never merge/rebase here); run the sync-main dispatch after confirming main's extra commits are tracking-only"; exit 1; }
      - name: Promote dev to main
        run: git push origin HEAD:main
OLD-END
NEW-BEGIN
          if ! test -n "$PROMOTE_TOKEN"; then
            echo "::error::PROMOTE_TOKEN is not set — the repository secret that writing main needs (INC-787, DEC-210)"
            exit 1
          fi
      - uses: actions/checkout@v5
        timeout-minutes: 5
        with:
          fetch-depth: 0
          token: ${{ secrets.PROMOTE_TOKEN }}
      - name: Configure the actions bot
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
      - name: Fast-forward guard (ff-only law — never merge/rebase here)
        timeout-minutes: 5
        run: |
          bash scripts/ci/with-deadline.sh 120 2 -- git fetch origin main
          git merge-base --is-ancestor origin/main HEAD || { echo "::error::MAIN DIVERGED — fast-forward impossible; manual reconcile per DEC-020 (ff-only law, never merge/rebase here); run the sync-main dispatch after confirming main's extra commits are tracking-only"; exit 1; }
      - name: Promote dev to main
        timeout-minutes: 5
        run: git push origin HEAD:main
NEW-END
EDIT .github/workflows/feed-bench.yml #1
OLD-BEGIN
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
OLD-END
NEW-BEGIN
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
NEW-END
EDIT .github/workflows/flake-check.yml #1
OLD-BEGIN
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
OLD-END
NEW-BEGIN
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
NEW-END
EDIT .github/workflows/flake-check.yml #2
OLD-BEGIN
      - name: Cache Playwright browsers
        uses: actions/cache@v5
OLD-END
NEW-BEGIN
      - name: Cache Playwright browsers
        timeout-minutes: 10
        uses: actions/cache@v5
NEW-END
EDIT .github/workflows/flake-check.yml #3
OLD-BEGIN
      - name: Upload the report
        if: always()
OLD-END
NEW-BEGIN
      - name: Upload the report
        timeout-minutes: 10
        if: always()
NEW-END
EDIT .github/workflows/guard-proof.yml #1
OLD-BEGIN
      - uses: actions/checkout@v7
      - uses: oven-sh/setup-bun@v2
        with:
OLD-END
NEW-BEGIN
      - uses: actions/checkout@v7
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
NEW-END
EDIT .github/workflows/guard-proof.yml #2
OLD-BEGIN
      - name: Cache Playwright browsers
        uses: actions/cache@v5
OLD-END
NEW-BEGIN
      - name: Cache Playwright browsers
        timeout-minutes: 10
        uses: actions/cache@v5
NEW-END
EDIT .github/workflows/local-backend-proof.yml #1
OLD-BEGIN
          echo "PROOF_BEGIN=$(date +%s)" >> "$GITHUB_ENV"
      - uses: actions/checkout@v5
        with:
          persist-credentials: false
OLD-END
NEW-BEGIN
          echo "PROOF_BEGIN=$(date +%s)" >> "$GITHUB_ENV"
      - uses: actions/checkout@v5
        timeout-minutes: 5
        with:
          persist-credentials: false
NEW-END
EDIT .github/workflows/local-backend-proof.yml #2
OLD-BEGIN
        run: echo "INSTALL_BEGIN=$(date +%s)" >> "$GITHUB_ENV"
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.14
      - name: Cache bun install
        uses: actions/cache@v5
        with:
OLD-END
NEW-BEGIN
        run: echo "INSTALL_BEGIN=$(date +%s)" >> "$GITHUB_ENV"
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
          bun-version: 1.3.14
      - name: Cache bun install
        timeout-minutes: 10
        uses: actions/cache@v5
        with:
NEW-END
EDIT .github/workflows/local-backend-proof.yml #3
OLD-BEGIN
        run: echo "CLI_BEGIN=$(date +%s)" >> "$GITHUB_ENV"
      - uses: supabase/setup-cli@v3.0.1
        with:
          version: 2.120.0
OLD-END
NEW-BEGIN
        run: echo "CLI_BEGIN=$(date +%s)" >> "$GITHUB_ENV"
      - uses: supabase/setup-cli@v3.0.1
        timeout-minutes: 5
        with:
          version: 2.120.0
NEW-END
EDIT .github/workflows/local-backend-proof.yml #4
OLD-BEGIN
          begin=$(date +%s)
          set +e
          supabase start --workdir .ci-local -x realtime,studio,imgproxy,vector,logflare,edge-runtime,postgres-meta,supavisor > local-backend-start.log 2>&1
          result=$?
          set -e
          echo "START_SECONDS=$(( $(date +%s) - begin ))" >> "$GITHUB_ENV"
          echo "START_EXIT=$result" >> "$GITHUB_ENV"
          : > local-backend-failure.txt
          if [ "$result" -ne 0 ]; then
            # INC-935: who holds the backend's ports, for the evidence (addresses and process names only).
            { echo "Port holders (54320-54329):"; sudo ss -Htanp | grep -E ':5432[0-9]\b' || echo "none"; } >> local-backend-start.log 2>&1
            # Raw log is never printed: the evidence step redacts credentials.
            exit "$result"
OLD-END
NEW-BEGIN
          begin=$(date +%s)
          set +e
          # INC-944 — while the start applies the migrations, the database's busy sessions are
          # sampled every 5 seconds (time, pid, application, state, wait, the first 120 characters
          # of the query), because the CLI stops its containers when the start fails: a deadlock
          # then names the other session from the last sample. Read-only; never retries the start.
          samples="$RUNNER_TEMP/db-sessions"
          mkdir -p "$samples"
          (
            n=0
            while sleep 5; do
              db=$(docker ps --filter name=supabase_db_ --format '{{.Names}}' 2>/dev/null | head -1)
              [ -n "$db" ] || continue
              if docker exec -e PGPASSWORD=postgres "$db" psql -h 127.0.0.1 -U postgres -d postgres -AtF ' | ' -c "select now()::time(0), pid, coalesce(application_name, ''), state, coalesce(wait_event_type, '') || ':' || coalesce(wait_event, ''), left(regexp_replace(coalesce(query, ''), '\s+', ' ', 'g'), 120) from pg_stat_activity where pid <> pg_backend_pid() and state is distinct from 'idle'" > "$samples/now" 2> "$samples/err"; then
                mv "$samples/now" "$samples/last"
                n=$((n + 1))
                echo "$n" > "$samples/count"
              fi
            done
          ) > /dev/null 2>&1 &
          sampler=$!
          supabase start --workdir .ci-local -x realtime,studio,imgproxy,vector,logflare,edge-runtime,postgres-meta,supavisor > local-backend-start.log 2>&1
          result=$?
          kill "$sampler" 2>/dev/null
          set -e
          echo "START_SECONDS=$(( $(date +%s) - begin ))" >> "$GITHUB_ENV"
          echo "START_EXIT=$result" >> "$GITHUB_ENV"
          echo "START_SAMPLES=$(cat "$samples/count" 2>/dev/null || echo 0)" >> "$GITHUB_ENV"
          : > local-backend-failure.txt
          if [ "$result" -ne 0 ]; then
            # INC-935: who holds the backend's ports, for the evidence (addresses and process names only).
            { echo "Port holders (54320-54329):"; sudo ss -Htanp | grep -E ':5432[0-9]\b' || echo "none"; } >> local-backend-start.log 2>&1
            # INC-944: the database's busy sessions at the last sample before the start failed.
            {
              echo "Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):"
              if [ -s "$samples/last" ]; then cat "$samples/last"; else echo "none sampled ($(head -c 200 "$samples/err" 2>/dev/null || echo 'the database never answered'))"; fi
            } >> local-backend-start.log 2>&1
            # Raw log is never printed: the evidence step redacts credentials.
            exit "$result"
NEW-END
EDIT .github/workflows/local-backend-proof.yml #5
OLD-BEGIN
        run: echo "BROWSER_BEGIN=$(date +%s)" >> "$GITHUB_ENV"
      - name: Cache Playwright browsers
        uses: actions/cache@v5
        with:
OLD-END
NEW-BEGIN
        run: echo "BROWSER_BEGIN=$(date +%s)" >> "$GITHUB_ENV"
      - name: Cache Playwright browsers
        timeout-minutes: 10
        uses: actions/cache@v5
        with:
NEW-END
EDIT .github/workflows/local-backend-proof.yml #6
OLD-BEGIN
          for label, key in [('checkout', 'CHECKOUT_SECONDS'), ('install', 'INSTALL_SECONDS'), ('CLI install', 'CLI_SECONDS'), ('working copy', 'PREPARE_SECONDS'), ('certificate', 'CERT_SECONDS'), ('start (migrations included)', 'START_SECONDS'), ('build', 'BUILD_SECONDS'), ('browser install', 'BROWSER_SECONDS'), ('tests', 'TEST_SECONDS')]:
              lines.append('- Seconds — ' + label + ': ' + env.get(key, 'not run'))
          ok = env.get('MIGRATIONS_OK') == '1'
          migrations = Path('local-backend-migrations.txt')
OLD-END
NEW-BEGIN
          for label, key in [('checkout', 'CHECKOUT_SECONDS'), ('install', 'INSTALL_SECONDS'), ('CLI install', 'CLI_SECONDS'), ('working copy', 'PREPARE_SECONDS'), ('certificate', 'CERT_SECONDS'), ('start (migrations included)', 'START_SECONDS'), ('build', 'BUILD_SECONDS'), ('browser install', 'BROWSER_SECONDS'), ('tests', 'TEST_SECONDS')]:
              lines.append('- Seconds — ' + label + ': ' + env.get(key, 'not run'))
          lines.append('- Database session samples during the start (INC-944): ' + env.get('START_SAMPLES', 'not run'))
          ok = env.get('MIGRATIONS_OK') == '1'
          migrations = Path('local-backend-migrations.txt')
NEW-END
EDIT .github/workflows/local-backend-proof.yml #7
OLD-BEGIN
          PY
      - name: Keep lane JSON, log and proof evidence
        if: always()
        uses: actions/upload-artifact@v6
OLD-END
NEW-BEGIN
          PY
      - name: Keep lane JSON, log and proof evidence
        timeout-minutes: 10
        if: always()
        uses: actions/upload-artifact@v6
NEW-END
EDIT .github/workflows/local-backend-proof.yml #8
OLD-BEGIN
          overwrite: true
      - name: Upload lane results
        if: always()
        uses: actions/upload-artifact@v6
OLD-END
NEW-BEGIN
          overwrite: true
      - name: Upload lane results
        timeout-minutes: 10
        if: always()
        uses: actions/upload-artifact@v6
NEW-END
EDIT .github/workflows/local-backend-proof.yml #9
OLD-BEGIN
          retention-days: 7
      - name: Upload lane log
        if: always()
        uses: actions/upload-artifact@v6
OLD-END
NEW-BEGIN
          retention-days: 7
      - name: Upload lane log
        timeout-minutes: 10
        if: always()
        uses: actions/upload-artifact@v6
NEW-END
EDIT .github/workflows/local-backend-proof.yml #10
OLD-BEGIN
          retention-days: 7
      - name: Upload lane error contexts
        if: always()
        uses: actions/upload-artifact@v6
OLD-END
NEW-BEGIN
          retention-days: 7
      - name: Upload lane error contexts
        timeout-minutes: 10
        if: always()
        uses: actions/upload-artifact@v6
NEW-END
EDIT .github/workflows/local-backend-proof.yml #11
OLD-BEGIN
    steps:
      - uses: actions/checkout@v5
        with:
          persist-credentials: false
      - uses: actions/download-artifact@v7
        with:
          pattern: local-proof-*
          path: local-proof-artifacts
      - uses: oven-sh/setup-bun@v2
        if: always()
        with:
          bun-version: 1.3.14
      - name: Download lane results
        if: always()
        uses: actions/download-artifact@v7
OLD-END
NEW-BEGIN
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
        with:
          persist-credentials: false
      - uses: actions/download-artifact@v7
        timeout-minutes: 8
        with:
          pattern: local-proof-*
          path: local-proof-artifacts
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        if: always()
        with:
          bun-version: 1.3.14
      - name: Download lane results
        timeout-minutes: 8
        if: always()
        uses: actions/download-artifact@v7
NEW-END
EDIT .github/workflows/local-backend-proof.yml #12
OLD-BEGIN
          path: lane-results
      - name: Download lane logs
        if: always()
        uses: actions/download-artifact@v7
OLD-END
NEW-BEGIN
          path: lane-results
      - name: Download lane logs
        timeout-minutes: 8
        if: always()
        uses: actions/download-artifact@v7
NEW-END
EDIT .github/workflows/local-backend-proof.yml #13
OLD-BEGIN
          path: lane-logs
      - name: Download lane error contexts
        if: always()
        uses: actions/download-artifact@v7
OLD-END
NEW-BEGIN
          path: lane-logs
      - name: Download lane error contexts
        timeout-minutes: 8
        if: always()
        uses: actions/download-artifact@v7
NEW-END
EDIT .github/workflows/local-backend-proof.yml #14
OLD-BEGIN
          slowest_lane, slowest = 'none', 0
          details = []
          for lane in lanes:
              fragment = fragments.get(lane)
OLD-END
NEW-BEGIN
          slowest_lane, slowest = 'none', 0
          details = []
          samples = []
          for lane in lanes:
              fragment = fragments.get(lane)
NEW-END
EDIT .github/workflows/local-backend-proof.yml #15
OLD-BEGIN
              job = field(fragment, '- Seconds — job: ')
              start = field(fragment, '- Seconds — start (migrations included): ')
              migrations = field(fragment, '- Migrations: ', 'not confirmed')
              count_line = field(fragment, '- Smoke: ', '')
OLD-END
NEW-BEGIN
              job = field(fragment, '- Seconds — job: ')
              start = field(fragment, '- Seconds — start (migrations included): ')
              samples.append(lane + ' ' + field(fragment, '- Database session samples during the start (INC-944): '))
              migrations = field(fragment, '- Migrations: ', 'not confirmed')
              count_line = field(fragment, '- Smoke: ', '')
NEW-END
EDIT .github/workflows/local-backend-proof.yml #16
OLD-BEGIN
              if heading in fragment:
                  details += ['', '## Lane ' + lane, *fragment[fragment.index(heading):fragment.index('- Smoke: ' + count_line)]]
          lines += ['| TOTAL | — | — | — | ' + ' | '.join(str(totals[key]) for key in totals) + ' | ' + str(sum(totals.values())) + ' |', '- Full evidence: docs/tracking/local-backend-last-failure.md (CI\'s failure reporter over the eighteen lanes)', '', '- Slowest lane: ' + slowest_lane + ' ' + str(slowest) + ' s']
          lines += ['- Teardown:', *['  - ' + lane + ': ' + field(fragments.get(lane, []), '- Teardown: ', 'no evidence') for lane in lanes]]
          smoke = fragments.get('smoke', [])
OLD-END
NEW-BEGIN
              if heading in fragment:
                  details += ['', '## Lane ' + lane, *fragment[fragment.index(heading):fragment.index('- Smoke: ' + count_line)]]
          lines += ['| TOTAL | — | — | — | ' + ' | '.join(str(totals[key]) for key in totals) + ' | ' + str(sum(totals.values())) + ' |', '- Full evidence: docs/tracking/local-backend-last-failure.md (CI\'s failure reporter over the eighteen lanes)', '', '- Slowest lane: ' + slowest_lane + ' ' + str(slowest) + ' s', '- Database session samples during each start (INC-944): ' + (', '.join(samples) or 'none')]
          lines += ['- Teardown:', *['  - ' + lane + ': ' + field(fragments.get(lane, []), '- Teardown: ', 'no evidence') for lane in lanes]]
          smoke = fragments.get('smoke', [])
NEW-END
EDIT .github/workflows/nightly-e2e.yml #1
OLD-BEGIN

# Cases that need REAL elapsed time (A-3 resend exhaustion). See
# docs/features/nightly-e2e.md. Deliberately NOT triggered on push.
on:
  schedule:
    # DEC-171 — 18:00 UTC (was 06:00): away from the operator's working hours,
    # when its @global-state specs and its load shared ethio-staging with the
    # day's CI runs (INC-545).
    - cron: "0 18 * * *"
  workflow_dispatch:

# DEC-153 (a) — read-only by default; only the job that publishes the
# nightly's evidence to ci-evidence holds write.
permissions:
  contents: read

jobs:
  nightly-e2e:
    name: Nightly E2E (Playwright, real time, ethio-staging)
    runs-on: ubuntu-24.04
    timeout-minutes: 360
    # DEC-153 (a) — publish-evidence.sh pushes the heartbeat and failure evidence.
    permissions:
      contents: write
OLD-END
NEW-BEGIN

# Cases that need REAL elapsed time (A-3 resend exhaustion). See
# docs/features/nightly-e2e.md. Deliberately NOT triggered on push.
on:
  schedule:
    # DEC-277 — 11:30 in New York, all year (the operator's hour; DEC-171's
    # 18:00 UTC retired). GitHub's schedules are UTC, so two: 15:30 UTC (New
    # York on summer time) and 16:30 UTC (winter time). The `hour` job lets only
    # the one that falls at 11 o'clock in New York go on
    # (scripts/ci/nightly-hour.sh), so a clock change needs no re-time.
    - cron: "30 15 * * *"
    - cron: "30 16 * * *"
  workflow_dispatch:

# DEC-153 (a) — read-only by default; only the job that publishes the
# nightly's evidence to ci-evidence holds write.
permissions:
  contents: read

jobs:
  # DEC-277 — the one schedule of the day that falls at 11:30 in New York goes
  # on; the other ends here in seconds and writes no heartbeat. A run started
  # by hand always goes on. The answer reads the schedule that fired, never the
  # clock, so a run GitHub starts late is judged by the hour it was due.
  hour:
    name: The nightly's hour (DEC-277)
    runs-on: ubuntu-24.04
    timeout-minutes: 5
    outputs:
      go: ${{ steps.hour.outputs.go }}
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 3
      - name: Is this the nightly's hour?
        id: hour
        timeout-minutes: 1
        env:
          EVENT: ${{ github.event_name }}
          SCHEDULE: ${{ github.event.schedule }}
        run: bash scripts/ci/nightly-hour.sh "$EVENT" "$SCHEDULE"

  nightly-e2e:
    name: Nightly E2E (Playwright, real time, ethio-staging)
    needs: hour
    if: needs.hour.outputs.go == 'true'
    runs-on: ubuntu-24.04
    timeout-minutes: 360
    # DEC-153 (a) — publish-evidence.sh pushes the heartbeat and failure evidence.
    permissions:
      contents: write
NEW-END
EDIT .github/workflows/nightly-e2e.yml #2
OLD-BEGIN
      # DEC-030 — the NIGHTLY keeps the unretried truth: acceptance measurement
      # (pass bar §6) needs retries: 0. Only the parallel matrix retries once.
      E2E_RETRIES: "0"
    steps:
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
      # INC-943 (DEC-276): measured over 371 lane runs, the combined install took 14 s at the median, 582 s at the
OLD-END
NEW-BEGIN
      # DEC-030 — the NIGHTLY keeps the unretried truth: acceptance measurement
      # (pass bar §6) needs retries: 0. Only the parallel matrix retries once.
      E2E_RETRIES: "0"
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
          bun-version: latest
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
      - name: Resolve Playwright version
        id: pw
        run: echo "version=$(node -p "require('@playwright/test/package.json').version")" >> "$GITHUB_OUTPUT"
      - name: Cache Playwright browsers
        timeout-minutes: 10
        uses: actions/cache@v5
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      # INC-943 (DEC-276): measured over 371 lane runs, the combined install took 14 s at the median, 582 s at the
NEW-END
EDIT .github/workflows/nightly-e2e.yml #3
OLD-BEGIN
          echo "quarantined=${QUAR}" >> "$GITHUB_OUTPUT"
          if [ "${QUAR:-0}" -gt 0 ]; then
            echo "::warning::${QUAR} quarantined @global-state failure(s) reported in docs/tracking/nightly-last-failure.md (INC-117/DEC-028) — non-gating."
          fi
      - name: Upload report on failure
        if: always() && (steps.run.outcome == 'failure' || steps.runfull.outcome == 'failure')
        uses: actions/upload-artifact@v6
        with:
          name: playwright-report-nightly
          # INC-100 — evidence artifacts are OVERWRITE-ON-RERUN: without this,
OLD-END
NEW-BEGIN
          echo "quarantined=${QUAR}" >> "$GITHUB_OUTPUT"
          if [ "${QUAR:-0}" -gt 0 ]; then
            echo "::warning::${QUAR} quarantined @global-state failure(s) reported in docs/tracking/nightly-last-failure.md (INC-117/DEC-028) — non-gating."
          fi
      - name: Upload report on failure
        timeout-minutes: 10
        if: always() && (steps.run.outcome == 'failure' || steps.runfull.outcome == 'failure')
        uses: actions/upload-artifact@v6
        with:
          name: playwright-report-nightly
          # INC-100 — evidence artifacts are OVERWRITE-ON-RERUN: without this,
NEW-END
EDIT .github/workflows/nightly-e2e.yml #4
OLD-BEGIN
  # refusal is therefore no longer an excused runtime class: it means the pin
  # or the wrangler version must be bumped (together, in one landing). The job
  # is gating.
  cloudflare-parity-smoke:
    name: Cloudflare parity smoke (wrangler-served)
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    env:
      E2E_SHARD: cfsmoke
      E2E_EMAIL_SINK: ${{ vars.E2E_EMAIL_SINK }}
OLD-END
NEW-BEGIN
  # refusal is therefore no longer an excused runtime class: it means the pin
  # or the wrangler version must be bumped (together, in one landing). The job
  # is gating.
  cloudflare-parity-smoke:
    name: Cloudflare parity smoke (wrangler-served)
    needs: hour
    if: needs.hour.outputs.go == 'true'
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    env:
      E2E_SHARD: cfsmoke
      E2E_EMAIL_SINK: ${{ vars.E2E_EMAIL_SINK }}
NEW-END
EDIT .github/workflows/nightly-e2e.yml #5
OLD-BEGIN
      # needs no provider key and spends nothing. PROD is unaffected.
      E2E_FAKE_TRANSLATE: "1"
      E2E_FAKE_GEOCODE: "1"
    steps:
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
      # INC-943 (DEC-276): measured over 371 lane runs, the combined install took 14 s at the median, 582 s at the
OLD-END
NEW-BEGIN
      # needs no provider key and spends nothing. PROD is unaffected.
      E2E_FAKE_TRANSLATE: "1"
      E2E_FAKE_GEOCODE: "1"
    steps:
      - uses: actions/checkout@v5
        timeout-minutes: 5
      - uses: oven-sh/setup-bun@v2
        timeout-minutes: 5
        with:
          bun-version: latest
      - name: Install dependencies
        timeout-minutes: 12
        run: bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
      - name: Resolve Playwright version
        id: pw
        run: echo "version=$(node -p "require('@playwright/test/package.json').version")" >> "$GITHUB_OUTPUT"
      - name: Cache Playwright browsers
        timeout-minutes: 10
        uses: actions/cache@v5
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}
      # INC-943 (DEC-276): measured over 371 lane runs, the combined install took 14 s at the median, 582 s at the
NEW-END
EDIT .github/workflows/nightly-e2e.yml #6
OLD-BEGIN
              echo "::error::workerd refused the PINNED compatibility_date (DEC-019-B/INC-111) — bump the pin in vite.config.ts together with the wrangler version in package.json, in one landing. This is a gating failure, not an excused runtime class."
            fi
            exit 1
          }
      - name: Upload report on failure
        if: failure()
        uses: actions/upload-artifact@v6
        with:
          name: playwright-report-cf-parity
          # INC-100 — evidence artifacts are OVERWRITE-ON-RERUN: without this,
OLD-END
NEW-BEGIN
              echo "::error::workerd refused the PINNED compatibility_date (DEC-019-B/INC-111) — bump the pin in vite.config.ts together with the wrangler version in package.json, in one landing. This is a gating failure, not an excused runtime class."
            fi
            exit 1
          }
      - name: Upload report on failure
        timeout-minutes: 10
        if: failure()
        uses: actions/upload-artifact@v6
        with:
          name: playwright-report-cf-parity
          # INC-100 — evidence artifacts are OVERWRITE-ON-RERUN: without this,
NEW-END
EDIT .github/workflows/zap-baseline.yml #1
OLD-BEGIN
      - name: ZAP baseline scan
        # zaproxy/action-baseline v0.15.0, pinned by commit.
OLD-END
NEW-BEGIN
      - name: ZAP baseline scan
        timeout-minutes: 25
        # zaproxy/action-baseline v0.15.0, pinned by commit.
NEW-END
FILE-BEGIN scripts/ci/nightly-hour.sh
#!/usr/bin/env bash
# DEC-277 (Foundations turn K3) — THE NIGHTLY STARTS AT 11:30 IN NEW YORK, ALL YEAR.
# Usage: bash scripts/ci/nightly-hour.sh <event name> [<cron> [<UTC day YYYY-MM-DD>]]
# GitHub's schedules are in UTC, so the nightly carries two: 15:30 UTC (New York on summer
# time) and 16:30 UTC (winter time). Each scheduled run asks this script whether ITS cron, on
# the run's UTC day, falls at 11 o'clock in New York; only that one goes on. The answer reads
# the schedule that fired (github.event.schedule), never the clock: a run GitHub starts late is
# judged by the hour it was due, so a delay can never skip both. A run started by hand
# (workflow_dispatch) always goes on. Prints "go=true|false" (and writes it to $GITHUB_OUTPUT
# when GitHub provides one); a cron it cannot read is an error (exit 2), never a silent skip.
set -euo pipefail

readonly WANT_HOUR=11
event="${1:-}"
cron="${2:-}"
day="${3:-$(date -u +%F)}"

say() {
  echo "go=$1"
  if [ -n "${GITHUB_OUTPUT:-}" ]; then echo "go=$1" >>"$GITHUB_OUTPUT"; fi
}

if [ -z "$event" ]; then
  echo "::error title=nightly-hour::usage: nightly-hour.sh <event name> [<cron> [<UTC day>]]" >&2
  exit 2
fi
if [ "$event" != "schedule" ]; then
  echo "nightly-hour: started by ${event} — runs now"
  say true
  exit 0
fi
if ! [[ "$cron" =~ ^([0-9]{1,2})\ ([0-9]{1,2})\ \*\ \*\ \*$ ]]; then
  echo "::error title=nightly-hour::cannot read the schedule \"${cron}\" (expected \"M H * * *\")" >&2
  exit 2
fi
minute=$((10#${BASH_REMATCH[1]}))
hour=$((10#${BASH_REMATCH[2]}))
if [ "$minute" -gt 59 ] || [ "$hour" -gt 23 ]; then
  echo "::error title=nightly-hour::cannot read the schedule \"${cron}\" (minute 0-59, hour 0-23)" >&2
  exit 2
fi
if ! [[ "$day" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
  echo "::error title=nightly-hour::cannot read the day \"${day}\" (expected YYYY-MM-DD)" >&2
  exit 2
fi
due=$(printf '%sT%02d:%02d:00Z' "$day" "$hour" "$minute")
if ! local_time=$(TZ=America/New_York date -d "$due" +%H:%M 2>/dev/null); then
  echo "::error title=nightly-hour::cannot read the day \"${day}\"" >&2
  exit 2
fi
if [ "$((10#${local_time%%:*}))" -eq "$WANT_HOUR" ]; then
  echo "nightly-hour: \"${cron}\" on ${day} is ${local_time} in New York — this is the nightly's run"
  say true
else
  echo "nightly-hour: \"${cron}\" on ${day} is ${local_time} in New York — the other schedule runs today"
  say false
fi
FILE-END scripts/ci/nightly-hour.sh
FILE-BEGIN scripts/ci/nightly-hour.test.ts
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * DEC-277 (Foundations turn K3) — scripts/ci/nightly-hour.sh: the nightly starts at 11:30 in New
 * York all year. Two UTC schedules (15:30 and 16:30); each run goes on only when its own schedule,
 * on the run's UTC day, is 11 o'clock in New York — so the clock changes of 1 November 2026 and
 * 14 March 2027 need no re-time, and a run GitHub starts late is judged by the hour it was due.
 */

const SCRIPT = "scripts/ci/nightly-hour.sh";
const SUMMER = "30 15 * * *";
const WINTER = "30 16 * * *";

function run(args: string[], output?: string) {
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.GITHUB_OUTPUT;
  if (output !== undefined) env.GITHUB_OUTPUT = output;
  const result = spawnSync("bash", [SCRIPT, ...args], { encoding: "utf8", env, timeout: 20_000 });
  return { code: result.status, out: `${result.stdout}${result.stderr}` };
}

/** The verdict a run prints on its last line ("go=true" or "go=false"). */
function verdict(out: string): string {
  return out.trim().split("\n").at(-1) ?? "";
}

describe("the nightly starts at 11:30 in New York, all year (DEC-277)", () => {
  it("NH-1 in summer the 15:30 UTC schedule runs and the 16:30 one stands down", () => {
    const summer = run(["schedule", SUMMER, "2026-07-15"]);
    const winterCron = run(["schedule", WINTER, "2026-07-15"]);
    expect(summer.code).toBe(0);
    expect(summer.out).toContain("11:30 in New York");
    expect(verdict(summer.out)).toBe("go=true");
    expect(winterCron.code).toBe(0);
    expect(winterCron.out).toContain("12:30 in New York");
    expect(verdict(winterCron.out)).toBe("go=false");
  });

  it("NH-2 in winter the 16:30 UTC schedule runs and the 15:30 one stands down", () => {
    const summerCron = run(["schedule", SUMMER, "2026-12-15"]);
    const winter = run(["schedule", WINTER, "2026-12-15"]);
    expect(verdict(summerCron.out)).toBe("go=false");
    expect(summerCron.out).toContain("10:30 in New York");
    expect(verdict(winter.out)).toBe("go=true");
    expect(winter.out).toContain("11:30 in New York");
  });

  it("NH-3 each clock-change day has exactly one run at 11:30 (2026-11-01, 2027-03-14)", () => {
    for (const [day, runs] of [
      ["2026-11-01", WINTER],
      ["2027-03-14", SUMMER],
    ] as const) {
      const going = [SUMMER, WINTER].filter(
        (cron) => verdict(run(["schedule", cron, day]).out) === "go=true",
      );
      expect(going, day).toEqual([runs]);
    }
  });

  it("NH-4 a run started by hand always goes on, and the answer reaches GITHUB_OUTPUT", () => {
    const dir = mkdtempSync(join(tmpdir(), "nh-"));
    try {
      const output = join(dir, "output");
      const result = run(["workflow_dispatch"], output);
      expect(result.code).toBe(0);
      expect(verdict(result.out)).toBe("go=true");
      expect(readFileSync(output, "utf8")).toBe("go=true\n");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("NH-5 a schedule, a day or a call it cannot read is an error, never a silent skip", () => {
    for (const args of [
      [],
      ["schedule", "0 18 * *", "2026-07-15"],
      ["schedule", "30 25 * * *", "2026-07-15"],
      ["schedule", SUMMER, "2026-13-40"],
      ["schedule", SUMMER, "15 July"],
    ]) {
      const result = run(args);
      expect(result.code, args.join(" ")).toBe(2);
      expect(result.out).toContain("::error title=nightly-hour::");
      expect(result.out).not.toContain("go=");
    }
  });
});
FILE-END scripts/ci/nightly-hour.test.ts
EDIT docs/features/nightly-e2e.md #1
OLD-BEGIN
- Trigger: `schedule` at `0 18 * * *` (18:00 UTC; 06:00 UTC until DEC-171, 2026-10-11) **and** `workflow_dispatch`.
OLD-END
NEW-BEGIN
- Trigger: `schedule` at 11:30 in New York all year (DEC-277, Foundations turn K3) **and** `workflow_dispatch`. GitHub's schedules are UTC, so the workflow carries two, `30 15 * * *` (New York on summer time) and `30 16 * * *` (winter time); its first job, `hour`, runs `bash scripts/ci/nightly-hour.sh <event> <schedule>`, and only the schedule that falls at 11 o'clock in New York on the run's UTC day goes on — the other ends in seconds, its two test jobs skipped, and writes no heartbeat. The answer reads the schedule that fired (`github.event.schedule`), never the clock, so a late start cannot skip both; the clock changes (2026-11-01, 2027-03-14) need no re-time (NH-1…5, scripts/ci/nightly-hour.test.ts). A run started by hand always goes on. Earlier hours: 06:00 UTC, then 18:00 UTC (DEC-171, 2026-10-11).
NEW-END
EDIT docs/features/ci-local-backend.md #1
OLD-BEGIN
Turn 34e's first run (40519893778, `a308c6b3`) lost lanes 3, 5 and 12 to its own deadline: `bunx playwright install --with-deps chromium` ran past 300 s on its first try and failed at once on its second (`ci-deadline … failed with exit 1 on try 2 of 2`). The 300 s was not measured. Measured afterwards over 371 lane runs (2026-10-25 → 10-27), the combined install took 14 s at the median, 582 s at the 90th percentile, 809 s at the 99th and 895 s at most — 66 of the 371 (18%) ran past 300 s, and passed slowly before turn 34e. A package install cut off part-way leaves the system's package manager interrupted, so its retry cannot succeed. Now each browser install is two steps: `bunx playwright install-deps chromium` (the system libraries) once with 1500 s, then `bunx playwright install chromium` (the browser, a download that may be repeated) with 900 s a try and one retry; the certificate tools' `apt-get install` runs once and `apt-get update` keeps its retry, both with 600 s. CF-CID-1 gains the fifth rule — a package install (`apt-get install`, `playwright install-deps`, `playwright install --with-deps`) runs with one try — and CF-CID-2 its planted breach. DEC-276: every deadline is set from CI's own measured step times (the maximum over at least 300 runs of the step, with at least half again as margin; the brief shows the median, the 99th percentile and the maximum), and a retry only where re-running is safe. Its judge: KEEP when, over the next 20 completed runs on dev, no install step fails by its deadline; when one does, its measured times are read and its deadline set again from them.
OLD-END
NEW-BEGIN
Turn 34e's first run (40519893778, `a308c6b3`) lost lanes 3, 5 and 12 to its own deadline: `bunx playwright install --with-deps chromium` ran past 300 s on its first try and failed at once on its second (`ci-deadline … failed with exit 1 on try 2 of 2`). The 300 s was not measured. Measured afterwards over 371 lane runs (2026-10-25 → 10-27), the combined install took 14 s at the median, 582 s at the 90th percentile, 809 s at the 99th and 895 s at most — 66 of the 371 (18%) ran past 300 s, and passed slowly before turn 34e. A package install cut off part-way leaves the system's package manager interrupted, so its retry cannot succeed. Now each browser install is two steps: `bunx playwright install-deps chromium` (the system libraries) once with 1500 s, then `bunx playwright install chromium` (the browser, a download that may be repeated) with 900 s a try and one retry; the certificate tools' `apt-get install` runs once and `apt-get update` keeps its retry, both with 600 s. CF-CID-1 gains the fifth rule — a package install (`apt-get install`, `playwright install-deps`, `playwright install --with-deps`) runs with one try — and CF-CID-2 its planted breach. DEC-276: every deadline is set from CI's own measured step times (the maximum over at least 300 runs of the step, with at least half again as margin; the brief shows the median, the 99th percentile and the maximum), and a retry only where re-running is safe. Its judge: KEEP when, over the next 20 completed runs on dev, no install step fails by its deadline; when one does, its measured times are read and its deadline set again from them.

## Foundations turn K3 — every action has its deadline; a failed start names the database's busy sessions (INC-941, INC-944, DEC-282)

CF-CID-1 gains its sixth rule: every step that uses an action (checkout, setup-bun, setup-node, setup-python, setup-cli, caches, artifacts, gitleaks, the SARIF upload, the status report's script, the ZAP scan) declares its own `timeout-minutes`, and pip's installs and git's downloads (`git clone`, `git fetch`) count as installs — through `scripts/ci/with-deadline.sh` — while `git push` carries its step deadline. The semgrep rules are fetched as the pinned commit only (`git init`, then one `git fetch --depth 1` of the pinned SHA through the wrapper), so a retry is safe. The action steps' deadlines are DEC-282's wide ceilings until their times are measured (DEC-276). INC-944: while `supabase start` applies the migrations, the database's busy sessions are sampled every 5 seconds from inside its container (time, pid, application, state, wait, the first 120 characters of the query); a failed start appends the last sample to the start log the evidence step publishes, and the run's proof (docs/tracking/local-backend-proof.md on ci-evidence) lists each lane's sample count (`Database session samples during each start (INC-944)`) — a count of 0 on a green run means the sampler could not read the database — so the next deadlock names the other session.
NEW-END
FILE-BEGIN .claude/hooks/land.ts
/**
 * bun .claude/hooks/land.ts — the ONE way the executor's commits reach `dev`.
 *
 * Lovable lands each turn on dev and CI judges it there (DEC-020); this script does the same and
 * refuses to push anything CI would refuse for a reason the executor could have seen first:
 *
 *   1. on `dev`, tree clean (every change committed, nothing untracked)
 *   2. origin/dev fetched and an ancestor of HEAD (dev moved under the turn → STOP, never merge)
 *   3. every path in the landing (origin/dev..HEAD) inside the brief's SCOPE + standing allowance
 *   4. every deleted base file declared (commit marker or intentional-deletions.txt line)
 *   5. the brief's FLAGS respected
 *   6. the last commit carries the report: a stop report (STOP|QUESTION|MIGRATION + DONE + LEFT)
 *      or the final report (twelve sections, every landed path, the last code commit named)
 *   7. THE CHECKS green: lint → typecheck → test:unit → i18n:usage (maps unchanged) → build →
 *      check-migrations.sh (when migrations land) → format:check — each step's pass is cached per
 *      code tree, so a re-run after a fix repeats only what can have changed
 *   8. `git push origin dev` (fast-forward only: the ruleset refuses a force push) and the read-back
 *
 * The Bash guard refuses every other `git push`, and the Stop gate refuses to end a turn while
 * commits are unlanded. Run it with a long Bash timeout (it can take 15–25 minutes the first time).
 *
 * `bun .claude/hooks/land.ts --checks` (DEC-278) is the protocol's step 5: steps 1, 2 and 7 only —
 * THE CHECKS on the committed tree, each green step cached for that code tree — and no push. The
 * landing then finds them green for the same tree (the report's commit is not code) and does not
 * run them again.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import {
  PROJECT_DIR,
  WORK_BRANCH,
  git,
  currentBranch,
  run,
  readScope,
  scopeVerdict,
  reportPaths,
  reviewLineProblem,
  lines,
  unlanded,
} from "./lib";

const turnDir = join(PROJECT_DIR, ".claude", "turn");
mkdirSync(turnDir, { recursive: true });
const args = process.argv.slice(2);
const checksOnly = args.length === 1 && args[0] === "--checks";
if (args.length > 0 && !checksOnly) {
  process.stderr.write(
    `land.ts takes no argument but --checks (THE CHECKS only, no push); it was given: ${args.join(" ")}\n`,
  );
  process.exit(2);
}

function fail(step: string, reason: string): never {
  process.stderr.write(
    `LAND REFUSED at ${step}:\n${reason}\n\nNothing was pushed. Fix it at the root (a new commit — never amend), then run bun .claude/hooks/land.ts again.\n`,
  );
  process.exit(1);
}
function say(text: string): void {
  process.stdout.write(`${text}\n`);
}

/**
 * When the turn cannot land (dev moved under it, or the push to dev was refused), its commits are
 * parked on hold/<brief stem> — a branch no workflow runs on — so the supervisor can read them, and
 * the Stop gate lets the turn end. When the session's git refuses that branch too (Claude Code on the
 * web may allow only the branch the session started on), they are parked on that branch, recorded
 * by session-setup.ts in .claude/turn/session-branch. Nothing is ever force-pushed.
 */
function park(ref: string): { ok: boolean; err: string } {
  const p = Bun.spawnSync(["git", "push", "origin", `HEAD:${ref}`], {
    cwd: PROJECT_DIR,
    stdout: "pipe",
    stderr: "pipe",
  });
  return { ok: p.exitCode === 0, err: new TextDecoder().decode(p.stderr).trim() };
}

function hold(step: string, reason: string): never {
  const stem = (readScope().brief ?? "no-brief").replace(/^.*\//, "").replace(/\.md$/, "");
  const head = git(["rev-parse", "HEAD"]);
  const marker = join(turnDir, `held-${head.slice(0, 12)}`);
  const tail =
    "Make sure the last commit carries a stop report that says why (STOP — <reason>), then end the turn; the supervisor rules.";
  const first = park(`refs/heads/hold/${stem}`);
  if (first.ok) {
    writeFileSync(marker, `hold/${stem}`);
    process.stderr.write(
      `LAND HELD at ${step}:\n${reason}\n\nYour commits are parked on hold/${stem} (${head.slice(0, 12)}); nothing reached dev. ${tail}\n`,
    );
    process.exit(3);
  }
  const sessionFile = join(turnDir, "session-branch");
  const session = existsSync(sessionFile) ? readFileSync(sessionFile, "utf8").trim() : "";
  if (/^claude\/[\w./-]+$/.test(session)) {
    const second = park(`refs/heads/${session}`);
    if (second.ok) {
      writeFileSync(marker, session);
      process.stderr.write(
        `LAND HELD at ${step}:\n${reason}\n\nParking on hold/${stem} was refused (${first.err.split("\n").pop()}); your commits are parked on this session's branch ${session} (${head.slice(0, 12)}). Nothing reached dev. ${tail}\n`,
      );
      process.exit(3);
    }
    process.stderr.write(
      `LAND HELD at ${step}:\n${reason}\n\nParking was refused on hold/${stem}:\n${first.err}\nand on ${session}:\n${second.err}\nSay these refusals in your last message and end the turn.\n`,
    );
  } else {
    process.stderr.write(
      `LAND HELD at ${step}:\n${reason}\n\nParking on hold/${stem} was refused too:\n${first.err}\nSay both refusals in your last message and end the turn.\n`,
    );
  }
  writeFileSync(marker, "push refused");
  process.exit(3);
}

// 1. Branch and tree.
const branch = currentBranch();
if (branch !== WORK_BRANCH)
  fail(
    "1 branch",
    `you are on "${branch}"; the executor works and lands on ${WORK_BRANCH} (git switch ${WORK_BRANCH}).`,
  );
const status = git(["status", "--porcelain"]);
if (status !== "")
  fail(
    "1 clean tree",
    `uncommitted or untracked files:\n${status}\nCommit them (git add + git commit with a title that claims only what happened) or remove them.`,
  );

// 2. dev has not moved under the turn.
const fetch = Bun.spawnSync(["git", "fetch", "origin", WORK_BRANCH], {
  cwd: PROJECT_DIR,
  stdout: "pipe",
  stderr: "pipe",
});
if (fetch.exitCode !== 0)
  fail(
    "2 fetch",
    `git fetch origin ${WORK_BRANCH} failed:\n${new TextDecoder().decode(fetch.stderr)}`,
  );
const ancestor =
  Bun.spawnSync(["git", "merge-base", "--is-ancestor", `origin/${WORK_BRANCH}`, "HEAD"], {
    cwd: PROJECT_DIR,
  }).exitCode === 0;
if (!ancestor) {
  const theirs = git(["log", "--oneline", `HEAD..origin/${WORK_BRANCH}`]);
  hold(
    "2 dev moved",
    `origin/${WORK_BRANCH} has commits this turn does not:\n${theirs}\nSTOP — never merge or rebase; the supervisor re-bases the brief.`,
  );
}
const commits = unlanded();
if (commits.length === 0) {
  say(
    `Nothing to ${checksOnly ? "check" : "land"}: HEAD ${git(["rev-parse", "--short", "HEAD"])} is already on origin/${WORK_BRANCH}.`,
  );
  process.exit(0);
}
const range = `origin/${WORK_BRANCH}..HEAD`;
const paths = lines(git(["diff", "--name-only", range]));

if (checksOnly) {
  await theChecks();
  say(
    `CHECKS GREEN for code tree ${treeKey()} (${commits.length} unlanded commit(s)). The landing finds them green for this tree; a change to code runs them again.`,
  );
  process.exit(0);
}

// 3. Scope of the whole landing (the diff is the authority, whatever tool wrote the files).
const scope = readScope();
const outside = paths.map((f) => ({ f, v: scopeVerdict(f) })).filter((x) => !x.v.ok);
if (outside.length > 0) {
  fail(
    "3 scope",
    `${outside.length} path(s) in this landing are outside the brief's SCOPE:\n${outside.map((x) => `  ${x.f} — ${x.v.ok ? "" : x.v.reason.split(". ")[0]}`).join("\n")}\nUndo each in a NEW commit: git restore --source=origin/${WORK_BRANCH} --staged --worktree -- <path> (git rm -- <path> for a file origin/${WORK_BRANCH} does not have), commit "turn NN: revert out-of-scope change to <path>". If the brief needs that file, STOP and ask for a ruling naming it.`,
  );
}

// 4. Deletions declared.
const deleted = lines(git(["diff", "--name-only", "--diff-filter=D", range]));
if (deleted.length > 0) {
  const manifestAdds = git(["diff", range, "--", "docs/tracking/intentional-deletions.txt"])
    .split("\n")
    .filter((l) => l.startsWith("+") && !l.startsWith("+++"))
    .map((l) => l.slice(1).trim());
  const markerFiles = new Set<string>();
  let marked = false;
  for (const l of git(["log", "--diff-filter=D", "--name-only", "--format=@@%s", range]).split(
    "\n",
  )) {
    if (l.startsWith("@@")) marked = /\[intentional-delete\]/.test(l);
    else if (l.trim() !== "" && marked) markerFiles.add(l.trim());
  }
  const undeclared = deleted.filter((f) => !manifestAdds.includes(f) && !markerFiles.has(f));
  if (undeclared.length > 0)
    fail(
      "4 deletions",
      `deleted without a declaration (scripts/check-deletions.sh will fail in CI):\n${undeclared.join("\n")}\nAdd each path to docs/tracking/intentional-deletions.txt in a new commit (and use the [intentional-delete] marker in the commit that deletes).`,
    );
}

// 5. FLAGS.
const flagHits: string[] = [];
if (scope.flags.includes("no-migration") && paths.some((f) => f.startsWith("supabase/migrations/")))
  flagHits.push("FLAGS says no-migration, but supabase/migrations/ changed");
if (scope.flags.includes("no-new-string") && paths.some((f) => f.startsWith("src/i18n/locales/")))
  flagHits.push("FLAGS says no-new-string, but src/i18n/locales/ changed");
if (
  scope.flags.includes("no-package-change") &&
  paths.some((f) => /^(package\.json|bun\.lock)$/.test(f))
)
  flagHits.push("FLAGS says no-package-change, but package.json or bun.lock changed");
if (scope.flags.includes("no-agents-change") && paths.includes("AGENTS.md"))
  flagHits.push("FLAGS says no-agents-change, but AGENTS.md changed");
if (flagHits.length > 0)
  fail(
    "5 flags",
    `${flagHits.join("\n")}\nA change the brief's FLAGS forbid is a STOP: revert it in a new commit, or STOP and ask for a ruling.`,
  );

// 6. The report rides the last commit.
const rp = reportPaths(scope.brief);
if (rp === null)
  fail(
    "6 report",
    "no brief in force (roadmap.md line 3) — STEP 0 saves the brief and names it before anything lands.",
  );
const lastCommitPaths = lines(git(["diff-tree", "--no-commit-id", "--name-only", "-r", "HEAD"]));
const stopReport = lastCommitPaths.find((f) => f.startsWith(rp.stopPrefix) && f.endsWith(".md"));
const finalReport = lastCommitPaths.includes(rp.final) ? rp.final : undefined;
const reportFile = finalReport ?? stopReport;
if (reportFile === undefined) {
  fail(
    "6 report",
    `the last commit carries no report. A landing ends with one:\n  a stop (STOP, QUESTION, MIGRATION): ${rp.stopPrefix}<n>.md — first line "STOP|QUESTION|MIGRATION — turn NN part X: <subject>", then DONE, LEFT, CI, FILES and the question or the apply line;\n  the end of the brief: ${rp.final} — the twelve sections of .claude/rules/60-report.md.\nWrite it after your last code commit, commit it on its own, then land.`,
  );
}
const reportText = readFileSync(join(PROJECT_DIR, reportFile), "utf8");
if (finalReport === undefined) {
  if (
    !/^(STOP|QUESTION|MIGRATION)\b/.test(reportText) ||
    !/^DONE\b/m.test(reportText) ||
    !/^LEFT\b/m.test(reportText)
  ) {
    fail(
      "6 stop report",
      `${reportFile} must begin with STOP, QUESTION or MIGRATION and carry a DONE line and a LEFT line (then CI, FILES and the question or the apply line).`,
    );
  }
  if (
    /^MIGRATION\b/.test(reportText) &&
    !/apply\s+\S+\s+→\s+expect mark\s+\d{14}/.test(reportText)
  ) {
    fail(
      "6 migration report",
      `${reportFile} is a MIGRATION stop but carries no pairing line "apply <uuid-fragment> → expect mark <14-digit mark>".`,
    );
  }
} else {
  const missing = Array.from({ length: 12 }, (_, i) => `## ${i + 1}.`).filter(
    (h) => !reportText.includes(h),
  );
  if (missing.length > 0)
    fail(
      "6 final report",
      `${reportFile} is missing sections ${missing.join(", ")} (.claude/rules/60-report.md).`,
    );
  // the last commit that changed anything but the reports — a report fixed in a later commit still names it
  const lastCode = git([
    "log",
    "-1",
    "--format=%h",
    "--abbrev=7",
    "HEAD",
    "--",
    ".",
    ":(exclude)docs/governance/reports",
  ]).slice(0, 7);
  if (lastCode === "" || !reportText.includes(lastCode))
    fail(
      "6 final report",
      `${reportFile} must name the last code commit (${lastCode || "none found"}) on its second line ("Final commit: <sha>").`,
    );
  const reviewProblem = reviewLineProblem(reportText, lastCode);
  if (reviewProblem !== null) fail("6 final report", `${reportFile}: ${reviewProblem}`);
  const unlisted = paths.filter((f) => f !== reportFile && !reportText.includes(f));
  if (unlisted.length > 0)
    fail(
      "6 final report",
      `section 2 must list every path this turn changed; missing from ${reportFile}:\n${unlisted.join("\n")}`,
    );
}

// 7. THE CHECKS, cached per code tree (the reports folder is not code).
await theChecks();

/** The committed tree's key, the reports folder left out (a report is not code). */
function treeKey(): string {
  return createHash("sha256")
    .update(
      git(["ls-tree", "-r", "HEAD"])
        .split("\n")
        .filter((l) => !l.includes("\tdocs/governance/reports/"))
        .join("\n"),
    )
    .digest("hex")
    .slice(0, 16);
}

/** Step 7 — THE CHECKS, each green step cached per code tree; shared by the landing and --checks. */
async function theChecks(): Promise<void> {
  const key = treeKey();
  const touched = (re: RegExp) => paths.some((f) => re.test(f));
  type Step = { key: string; name: string; cmd: string[]; timeoutMs: number; when?: () => boolean };
  const steps: Step[] = [
    { key: "lint", name: "bun run lint", cmd: ["bun", "run", "lint"], timeoutMs: 600_000 },
    {
      key: "typecheck",
      name: "bun run typecheck",
      cmd: ["bun", "run", "typecheck"],
      timeoutMs: 600_000,
    },
    {
      key: "unit",
      name: "bun run test:unit",
      cmd: ["bun", "run", "test:unit"],
      timeoutMs: 1_200_000,
    },
    {
      key: "i18n",
      name: "bun run i18n:usage",
      cmd: ["bun", "run", "i18n:usage"],
      timeoutMs: 180_000,
      when: () => touched(/^(src|e2e)\//),
    },
    {
      key: "i18n-maps",
      name: "i18n maps committed",
      cmd: [
        "git",
        "diff",
        "--exit-code",
        "--stat",
        "--",
        "docs/generated/i18n-usage.json",
        "public/i18n-usage.json",
      ],
      timeoutMs: 30_000,
      when: () => touched(/^(src|e2e)\//),
    },
    {
      key: "build",
      name: "bun run build",
      cmd: ["bun", "run", "build"],
      timeoutMs: 900_000,
      when: () => touched(/^(src|public|index\.html|vite\.config|package\.json|tsconfig)/),
    },
    {
      key: "migrations",
      name: "bash scripts/check-migrations.sh",
      cmd: ["bash", "scripts/check-migrations.sh"],
      timeoutMs: 180_000,
      when: () => touched(/^supabase\/migrations\//),
    },
    {
      key: "format",
      name: "bun run format:check",
      cmd: ["bun", "run", "format:check"],
      timeoutMs: 600_000,
    },
  ];
  for (const step of steps) {
    if (step.when !== undefined && !step.when()) {
      say(`· ${step.name}: not needed for this landing`);
      continue;
    }
    const marker = join(turnDir, `pass-${step.key}-${key}`);
    if (existsSync(marker)) {
      say(`✓ ${step.name} (already green for this code tree)`);
      continue;
    }
    const r = await run(step.cmd, { timeoutMs: step.timeoutMs });
    if (r.code !== 0)
      fail(
        `7 ${step.name}`,
        `${step.timedOut ? "timed out" : `exit ${r.code}`}:\n${r.tail}\nFix the cause (never weaken a check, never --no-verify), commit, land again.`,
      );
    if (git(["status", "--porcelain"]) !== "")
      fail(
        `7 ${step.name}`,
        `the step changed files in the tree:\n${git(["status", "--porcelain"])}\nCommit them (the i18n maps travel with the strings), then land again.`,
      );
    writeFileSync(marker, new Date().toISOString());
    say(`✓ ${step.name}`);
  }
}

// 8. Push (fast-forward) and read back.
const head = git(["rev-parse", "HEAD"]);
const push = Bun.spawnSync(["git", "push", "origin", `HEAD:refs/heads/${WORK_BRANCH}`], {
  cwd: PROJECT_DIR,
  stdout: "pipe",
  stderr: "pipe",
});
const pushErr = new TextDecoder().decode(push.stderr);
if (push.exitCode !== 0)
  hold(
    "8 push",
    `git push origin ${WORK_BRANCH} was refused:\n${pushErr}\nDo not retry with another form of push.`,
  );
Bun.spawnSync(["git", "fetch", "origin", WORK_BRANCH], { cwd: PROJECT_DIR });
const remote = git(["rev-parse", `origin/${WORK_BRANCH}`]);
if (remote !== head)
  fail(
    "8 read-back",
    `pushed, but origin/${WORK_BRANCH} reads ${remote.slice(0, 12)}, not ${head.slice(0, 12)}.`,
  );
writeFileSync(join(turnDir, `landed-${head.slice(0, 12)}`), new Date().toISOString());
say(
  `LANDED ${head.slice(0, 12)} on ${WORK_BRANCH} (${commits.length} commit(s), ${paths.length} path(s), report ${reportFile}).`,
);
say(
  "CI runs now on dev; its verdict is written to branch ci-evidence when the run completes. End the turn — the supervisor reads it.",
);
process.exit(0);
FILE-END .claude/hooks/land.ts
EDIT .claude/settings.json #1
OLD-BEGIN
      "Bash(bun .claude/hooks/land.ts)",
      "Bash(git switch dev)",
OLD-END
NEW-BEGIN
      "Bash(bun .claude/hooks/land.ts)",
      "Bash(bun .claude/hooks/land.ts --checks)",
      "Bash(git switch dev)",
NEW-END
EDIT .claude/rules/00-executor-protocol.md #1
OLD-BEGIN
5. **THE CHECKS** (`bun .claude/hooks/land.ts` runs them again before it pushes, and caches each
   green step per code tree): `bun run lint` → `bun run typecheck` → `bun run test:unit` →
   `bun run i18n:usage` (both maps committed when they move) → `bun run build` →
   `bash scripts/check-migrations.sh` (when supabase/migrations/ changed) → `bun run format:check`
   LAST. Every red is fixed at its root first.
OLD-END
NEW-BEGIN
5. **THE CHECKS** — once per code tree (DEC-278): commit, then `bun .claude/hooks/land.ts --checks`
   (Bash timeout 1800000 ms; it pushes nothing). It runs `bun run lint` → `bun run typecheck` →
   `bun run test:unit` → `bun run i18n:usage` (both maps committed when they move) → `bun run build`
   → `bash scripts/check-migrations.sh` (when supabase/migrations/ changed) → `bun run format:check`
   LAST, and caches each green step for the committed tree; the landing finds them green for the same
   tree (the report's commit is not code) and does not run them again. Every red is fixed at its root
   first, in a new commit, and `--checks` runs again — a step already green for the new tree is not
   repeated. Paste its lines as THE CHECKS' evidence.
NEW-END
EDIT .claude/rules/20-tests.md #1
OLD-BEGIN
position; `gotoReady` / `findRow` (render invariant: no `[object Object]`, `undefined`, `NaN`).
OLD-END
NEW-BEGIN
position; `gotoReady` / `findRow` (render invariant: no `[object Object]`, `undefined`, `NaN`);
`layoutBoxes({ name: locator, … })` for every box a test compares — read together in one frame after
`settled(page)`, never `boundingBox()` one by one (INC-940; e2e/helpers/ui.ts).
NEW-END
EDIT .claude/skills/turn-report/SKILL.md #1
OLD-BEGIN
## 1. The checks, in this order (land.ts runs the same list again and caches green steps)
OLD-END
NEW-BEGIN
## 1. The checks, once per code tree (DEC-278)

Commit first (the checks read the committed tree), then:
NEW-END
EDIT .claude/skills/turn-report/SKILL.md #2
OLD-BEGIN
bun run lint
bun run typecheck
bun run test:unit
bun run i18n:usage && git diff --stat -- docs/generated/i18n-usage.json public/i18n-usage.json   # commit both when they move
bun run build
bash scripts/check-migrations.sh        # when supabase/migrations/ changed; paste the guard lines
bun run format:check                     # LAST
OLD-END
NEW-BEGIN
bun .claude/hooks/land.ts --checks       # Bash timeout 1800000 ms; pushes nothing
NEW-END
EDIT .claude/skills/turn-report/SKILL.md #3
OLD-BEGIN
Every red is fixed at its root (no `!`, cast, `any`, `@ts-expect-error`; no loosened assertion), then
the list runs again from the failed step.
OLD-END
NEW-BEGIN
It runs, in this order and each green step cached for the tree: `bun run lint` → `bun run typecheck`
→ `bun run test:unit` → `bun run i18n:usage` (commit both maps when they move) → `bun run build` →
`bash scripts/check-migrations.sh` (when supabase/migrations/ changed) → `bun run format:check` LAST.
Paste its lines. The landing finds them green for the same tree and does not run them again.

Every red is fixed at its root (no `!`, cast, `any`, `@ts-expect-error`; no loosened assertion) in a
new commit, then `--checks` runs again (a step already green for the new tree is not repeated).
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #1
OLD-BEGIN

function land(cwd: string) {
  const r = spawnSync("bun", [join(HOOKS, "land.ts")], {
    cwd,
OLD-END
NEW-BEGIN

function land(cwd: string, args: string[] = []) {
  const r = spawnSync("bun", [join(HOOKS, "land.ts"), ...args], {
    cwd,
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #2
OLD-BEGIN
    allowed("bun .claude/hooks/land.ts");
    allowed("gh run list --branch dev --limit 3");
OLD-END
NEW-BEGIN
    allowed("bun .claude/hooks/land.ts");
    allowed("bun .claude/hooks/land.ts --checks");
    allowed("gh run list --branch dev --limit 3");
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #3
OLD-BEGIN
      "bun .claude/hooks/land.ts",
      "gh run list --branch dev --limit 3",
OLD-END
NEW-BEGIN
      "bun .claude/hooks/land.ts",
      "bun .claude/hooks/land.ts --checks",
      "gh run list --branch dev --limit 3",
NEW-END
EDIT scripts/conformance/executor-hooks.test.ts #4
OLD-BEGIN

  it("EXH-12 a final report must carry the twelve sections, name the last code commit and list every landed path", () => {
OLD-END
NEW-BEGIN

  it("EXH-24 --checks runs THE CHECKS alone and pushes nothing; the landing then finds them green for the same tree (DEC-278)", () => {
    const red = freshClone("checks-red", {
      ...SCRIPTS,
      lint: "echo 'planted lint error' && exit 1",
    });
    write(red.dir, "src/server/ai/new.ts", "export const x = 1;\n");
    commit(red.dir, "turn 99 part B: new module");
    const refused = land(red.dir, ["--checks"]);
    expect(refused.code).toBe(1);
    expect(refused.err).toMatch(/7 bun run lint/);
    expect(remoteDev(red.origin)).toBe(sh("git rev-parse origin/dev", red.dir).trim());

    const { dir, origin } = freshClone("checks-green");
    const before = remoteDev(origin);
    write(dir, "src/server/ai/new.ts", "export const x = 1;\n");
    commit(dir, "turn 99 part B: new module");
    // no report yet and nothing in SCOPE checked: --checks is THE CHECKS alone
    const checks = land(dir, ["--checks"]);
    expect(checks.code, checks.err).toBe(0);
    expect(checks.out).toMatch(/✓ bun run lint\n/);
    expect(checks.out).toMatch(/CHECKS GREEN for code tree [0-9a-f]{16}/);
    expect(remoteDev(origin)).toBe(before);
    expect(land(dir, ["--checks"]).out).toMatch(
      /bun run lint \(already green for this code tree\)/,
    );
    write(dir, STOP_1, STOP_TEXT);
    const head = commit(dir, "turn 99: stop 1 — which door?");
    const landed = land(dir);
    expect(landed.code, landed.err).toBe(0);
    expect(landed.out).toMatch(/bun run lint \(already green for this code tree\)/);
    expect(landed.out).toMatch(/bun run format:check \(already green for this code tree\)/);
    expect(landed.out).toMatch(/LANDED/);
    expect(remoteDev(origin)).toBe(head);
    expect(land(dir, ["--checks"]).out).toMatch(/Nothing to check/);

    const wrong = land(dir, ["--check"]);
    expect(wrong.code).toBe(2);
    expect(wrong.err).toMatch(/takes no argument but --checks/);
  });

  it("EXH-12 a final report must carry the twelve sections, name the last code commit and list every landed path", () => {
NEW-END
EDIT scripts/conformance/lint-rules.test.ts #1
OLD-BEGIN

async function breaches(roots: string[]): Promise<string[]> {
  const eslint = new ESLint({ cwd: ROOT });
  const found: string[] = [];
  for (const full of walkFiles(
OLD-END
NEW-BEGIN

/** Every file under the roots that lacks a list it owes, and how many files were read (a census
 * that reads nothing passes nothing — the floor below each test). */
async function breaches(roots: string[]): Promise<{ read: number; found: string[] }> {
  const eslint = new ESLint({ cwd: ROOT });
  const found: string[] = [];
  let read = 0;
  for (const full of walkFiles(
NEW-END
EDIT scripts/conformance/lint-rules.test.ts #2
OLD-BEGIN
    if (await eslint.isPathIgnored(full)) continue;
    const missing = missingLists(
OLD-END
NEW-BEGIN
    if (await eslint.isPathIgnored(full)) continue;
    read += 1;
    const missing = missingLists(
NEW-END
EDIT scripts/conformance/lint-rules.test.ts #3
OLD-BEGIN
  }
  return found;
}

const PLANTED = "export function planted(e: unknown): boolean {\n  return e instanceof Error;\n}\n";
OLD-END
NEW-BEGIN
  }
  return { read, found };
}

/** About half of each tree's files at Foundations turn K3 (src 890, e2e 118): far below any honest
 * count, far above zero — the census fails when its walk reads (almost) nothing. */
const SRC_FLOOR = 400;
const E2E_FLOOR = 50;

const PLANTED = "export function planted(e: unknown): boolean {\n  return e instanceof Error;\n}\n";
NEW-END
EDIT scripts/conformance/lint-rules.test.ts #4
OLD-BEGIN
    async () => {
      expect(await breaches(["src"])).toEqual([]);
    },
OLD-END
NEW-BEGIN
    async () => {
      const { read, found } = await breaches(["src"]);
      // the floor: a list that matches no file must not pass (records owed, roadmap — CF-LINT floor)
      expect(read).toBeGreaterThan(SRC_FLOOR);
      expect(found).toEqual([]);
    },
NEW-END
EDIT scripts/conformance/lint-rules.test.ts #5
OLD-BEGIN
    async () => {
      expect(await breaches(["e2e"])).toEqual([]);
    },
OLD-END
NEW-BEGIN
    async () => {
      const { read, found } = await breaches(["e2e"]);
      expect(read).toBeGreaterThan(E2E_FLOOR);
      expect(found).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it(
    "CF-LINT-4 a census that reads no file stays under its floor (the floor is what fails it)",
    async () => {
      const empty = await breaches(["docs"]);
      expect(empty).toEqual({ read: 0, found: [] });
      expect(empty.read).toBeLessThanOrEqual(E2E_FLOOR);
    },
NEW-END
EDIT docs/tracking/incidental-findings.md #1
OLD-BEGIN
Numbering: next free INC-955.
OLD-END
NEW-BEGIN
## INC-955 — the shell's "didn't load" notice is drawn under an open dialog (2026-10-27; the operator's walk of `562db573`, line 8)

Defect: src/components/shell/on-demand-notice.tsx :29–:31 draws the notice `fixed … z-50`; a dialog's overlay and content are z-50 too (src/components/ui/dialog.tsx :25, :52) and the last-mounted portal wins (:35), and a modal hides the rest of the page from assistive technology — so a download that fails while a dialog is open (offline, "Enlarge map") is neither seen nor heard until the dialog closes. Fix: the notice drawn in the top layer above any open overlay and outside the modal's hidden region, with a census of every overlay consumer (dialog, sheet, drawer, popover, menu). Class: concern "a failed download is announced where the person is looking"; mechanism the on-demand failure notice (OnDemandNotice + LoadFailedHere, on-demand-notice.tsx :20, :72; register row 52). Tier B. Status (2026-10-27): OPEN — the cleanup turn.

## INC-956 — the maps' download-failure place says "Map pin" (2026-10-27; the operator's walk, line 8)

Defect: MapPreview (src/features/posting/preview/listing-detail.tsx :50) and MapLarge (:55) hand MapUnavailable (:65–:79 → `post.pin.title`) to resilientLazy as the failure place, so a map whose code could not download shows the pin's title, not the failure and its Refresh; the mechanism's in-place form is LoadFailedHere (on-demand-notice.tsx :72), used by the calendar and the pin dropper. Turn 34f-2's review ruling on MAJOR 1 (block S79) is revised: the frame was right, its word was the loading word. Fix: MapUnavailable draws LoadFailedHere inside MapFrame (the box kept, INC-940), with a census of every resilientLazy fallback. Class: as INC-955 (a piece with room says so in place); mechanism LoadFailedHere (register row 52). Tier B. Status (2026-10-27): OPEN — the cleanup turn.

## INC-957 — a line that must fit at 360 wraps in Amharic on an iPhone (2026-10-27; the operator's walk, line 7)

Defect: since DEC-262 (turn 33, src/styles.css :111–:126) Ge'ez text falls to the device's own face — Kefa on Apple devices, Noto Sans Ethiopic on Android and in CI's Linux Chromium — and Kefa is about 10% wider. The Home heading `feed.headingIn` ("በ{location} ውስጥ ያሉ ማስታወቂያዎች", am-base.ts :335; drawn by src/components/marketplace/feed.tsx :286–:288, h1 text-xl, semibold) measures 302.7 px in Noto Sans Ethiopic 600 at 20 px and about 335 pt in Kefa in a line about 325 pt wide (ESTIMATES scaled from the operator's screenshot), so it wraps to two lines on an iPhone while CI, measuring Noto, sees one. Fix: DEC-281 fixes the one instance (the shorter heading "የ{location} ማስታወቂያዎች", 212.9 px). The class (the outgoing thread's verdict, 2026-10-27): a census of the single-line slots (headings, buttons, tabs, bottom-bar labels, chips) at 360 in every language, and/or a wider Ethiopic test font in CI, so a slot that fits in Noto and overflows in Kefa is found by a test. Class: concern "a line that must fit at 360 fits in every language and every platform's font"; mechanism NONE YET. Status (2026-10-27): OPEN — the instance with the cleanup turn (DEC-281); the class with the Foundations locale and format work.

## INC-958 — a pin's missing precision defaults to the exact point (2026-10-27; turn 34f-2's review MINOR, the outgoing thread's verdict)

Defect: src/features/posting/preview/listing-detail.tsx :1169, :1179 and :1218 default `view.pinPrecision ?? "exact"` — the LESS private side — and :415 does the same for the Google Maps link (no precision → the exact coordinates). Unreachable today (listings_pin_precision_check, 20260919054044 :59–:61, never lets a pin exist without its precision), but it is §7's sentinel-default pattern on a privacy field; the supervisor's "SAFE" ruling of 2026-10-27 is withdrawn. Fix: a pin is drawn and linked only when its precision is known — typed absence: no map and no link — in the cleanup turn, without waiting for the typed-absence census. Class: concern "a pin's precision is known before it is drawn or linked"; mechanism the ad page's view (one typed reader). Status (2026-10-27): OPEN — the cleanup turn.

## INC-959 — the e2e reads of the browser's client wait on nothing (2026-10-28; turn 34c-4's K2)

Defect: the e2e reads of `window.__ethioSupabase` (91 mentions in 24 files at `562db573`, grep-counted) each reach for the client the app hands over after its first paint (DEC-261); the synchronous readers of turn 34c-1's K2 (admin-users.spec.ts, admin-translations-data.spec.ts, admin-translations-console.spec.ts) read it before it exists on a slow run. Fix: one helper that waits for the hand-off, with its census and an allowlist that falls file by file (G0.4) — roadmap line written by turn 34c-4. Class: concern "a test reads the browser's client only after the app hands it over"; mechanism NONE YET (e2e/helpers/session.ts is its home). Status (2026-10-28): OPEN.

## INC-960 — the phone's account menu needs its code for an offline sign-out (2026-10-28; turn 34c-4's limit)

Defect: on a phone the sign-out is inside the account menu, whose code arrives on its first opening; a person who never opened it online cannot open it offline, so SO-13's phone leg opens the menu once while online. Fix: the account menu's code fetched ahead with Home's for a signed-in visitor (the second consumer of `createHomeAhead`, src/lib/sign-out-landing.ts — register row 62), and SO-13's phone leg without the online opening. Class: concern "the code an offline path needs is on the device before it is needed"; mechanism `createHomeAhead` (row 62). Status (2026-10-28): OPEN.

## INC-961 — ODE-1 retried under the route guard's stricter rule (2026-10-28; run 40610714870 on `8cb2201d`, its third line in seven days)

Defect: ODE-1 (e2e/on-demand-failure.spec.ts — the menu whose code cannot download, then Refresh reloads) passed on retry on desktop-1280, shard 13, in turn 34c-4's run: its route handler's `route.fetch` failed with "Target page, context or browser has been closed" while running the callback (e2e/helpers/route-guard.ts :38, the handler at :26–:29 of the spec's helper), then "browserContext.close: Test ended". Turn 34c-4 made the guard end a request quietly only when its page is in fact closed (`routePageClosed`); here the page was reloading by the test's own Refresh, or the context was closing at the test's end before the page reported itself closed. Its two lines of 2026-10-26 were INC-934's (closed by turn 34d) — so this is the class's third line in seven days (DEC-030: an INC). Fix: the failure's trace and the guard's two conditions read first (G21), then the cause fixed at its root — the test's own reload and its end both counted as the page going away, by evidence rather than by its message — never a retry or a loosened match (G38). Class: concern "a test's interception ends with its page" (register row 57, `whilePageLives`). Status (2026-10-28): OPEN — the cleanup turn.
INC-952 (later word, 2026-10-28; records turn R6's reviewer, MINOR): the lines it cites, gateway.ts :400–:418, are the review's at `91ca9f47`; at `562db573` and `8cb2201d` the audit write is src/server/ai/gateway.ts :390–:406 (`recordAiCall`).

INC-930 (later word, 2026-10-28): DEC-279 BUILT by turn 34c-4 (`8cb2201d`; src/lib/sign-out-landing.ts, SO-13). Its phone leg's limit is INC-960.

Numbering: next free INC-962.
NEW-END
EDIT docs/tracking/action-tracker.md #1
OLD-BEGIN

- ACT-021 (2026-10-27) — a phone measurement of the published site after the next Publish (the handover supplement §4e): the speed lab (scripts/perf/lab.ts — the slow-4G phone of turn 23's baseline) on home, category, the ad page, seller and sign-in — first-paint bytes, LCP, CLS, TBT and the time to the first working tap — to show what turns 24–34f bought; the speed study's baseline (D234) before turns 35–37. The supervisor's read-only work. Status: OPEN.

- ACT-018 — status 2026-10-13: CLOSED with bundle 11 (blocks S62 and S63; forty-three executor turns). Open from it: D135 (the look; the operator's choice, with the shell brief), the admin groups' summary pages (last in the admin work), INC-579.
OLD-END
NEW-BEGIN

- ACT-018 — status 2026-10-13: CLOSED with bundle 11 (blocks S62 and S63; forty-three executor turns). Open from it: D135 (the look; the operator's choice, with the shell brief), the admin groups' summary pages (last in the admin work), INC-579.
NEW-END
EDIT docs/tracking/action-tracker.md #2
OLD-BEGIN
- ACT-009 — status 2026-10-14 (bundle 14 closed): the carried items stand (INC-398, the flaky tests, a full read of the Amharic catalogue, the four-lens review of the posting era); INC-497 still waits for its first `[ct18-dump]`. The E2E account pool before 2026-11-01: run 38576830362 signed in 136 accounts (pool 30, fresh 106) — ESTIMATE 30,000–45,000 monthly active users on ethio-staging at the day's pace, under the 100,000 the plan includes; the operator's glance at the staging usage page confirms it before 2026-11-01. Status: OPEN (carried).
OLD-END
NEW-BEGIN
- ACT-009 — status 2026-10-14 (bundle 14 closed): the carried items stand (INC-398, the flaky tests, a full read of the Amharic catalogue, the four-lens review of the posting era); INC-497 still waits for its first `[ct18-dump]`. The E2E account pool before 2026-11-01: run 38576830362 signed in 136 accounts (pool 30, fresh 106) — ESTIMATE 30,000–45,000 monthly active users on ethio-staging at the day's pace, under the 100,000 the plan includes; the operator's glance at the staging usage page confirms it before 2026-11-01. Status: OPEN (carried).

- ACT-021 (2026-10-27) — a phone measurement of the published site after the next Publish (the handover supplement §4e): the speed lab (scripts/perf/lab.ts — the slow-4G phone of turn 23's baseline) on home, category, the ad page, seller and sign-in — first-paint bytes, LCP, CLS, TBT and the time to the first working tap — to show what turns 24–34f bought; the speed study's baseline (D234) before turns 35–37. The supervisor's read-only work. Status: OPEN.
NEW-END
EDIT docs/governance/instructions-amendments.md #1
OLD-BEGIN
- S457 (G53 — a handover is loss-free; 2026-10-27 21:0xZ, found by the operator) — the handoff of 2026-10-27 (docs/governance/handoffs/2026-10-27-foundations-handover.md) left out what the outgoing thread held outside the repository: the Foundation fixes tracker's address and the operator's rules for it, the two reminders bound to the outgoing session, the security review of 2026-10-26's unregistered findings, the standing directives in the project memory newer than v1.15, and the kit decision put to the operator on 2026-10-26 and never answered. The operator: "this is exactly what should have been avoided". The outgoing thread wrote the supplement (docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md). Corrective: before any handoff is written, a checklist runs and its results appear in the handoff — (1) the scheduled tasks listed; (2) the Project docs and memory files changed since the last handoff listed; (3) the tracker read whole and compared with the roadmap; (4) every decision put to the operator and not answered listed; (5) the latest security review read and its findings confirmed registered. In force from 2026-10-27; installed in G53 at v1.16.
- Also logged, not numbered (2026-10-27): the supervisor estimated instructions v1.15 at about 40% shorter than v1.14; it is 5% shorter, because v1.14 is mostly rules (G5 — the measured value recorded).
OLD-END
NEW-BEGIN
- S457 (G53 — a handover is loss-free; 2026-10-27 21:0xZ, found by the operator) — the handoff of 2026-10-27 (docs/governance/handoffs/2026-10-27-foundations-handover.md) left out what the outgoing thread held outside the repository: the Foundation fixes tracker's address and the operator's rules for it, the two reminders bound to the outgoing session, the security review of 2026-10-26's unregistered findings, the standing directives in the project memory newer than v1.15, and the kit decision put to the operator on 2026-10-26 and never answered. The operator: "this is exactly what should have been avoided". The outgoing thread wrote the supplement (docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md). Corrective: before any handoff is written, a checklist runs and its results appear in the handoff — (1) the scheduled tasks listed; (2) the Project docs and memory files changed since the last handoff listed; (3) the tracker read whole and compared with the roadmap; (4) every decision put to the operator and not answered listed; (5) the latest security review read and its findings confirmed registered. In force from 2026-10-27; installed in G53 at v1.16.
- S458 (G41 — a records turn's own line is ticked after its CI; 2026-10-27 22:2xZ, found by records turn R6's reviewer) — R6 wrote its own roadmap line ticked before its run had completed (R5 did the same). Corrective: a records turn's own line lands unticked and the next records turn ticks it with its run's result. With it, the 34f-2 review ruling "the rest accepted as written" (block S79) was too broad: a MINOR it covered (the pin's precision default) was a §7 pattern — INC-958. Every finding of a review is ruled by name.
- S459 (G31 — a walk line's expected result is read against the code; 2026-10-27 23:2xZ, found by the operator's walk) — walk line 8 step 5 said the map opens once the connection returns, without a refresh; the code keeps a failed download for the page's life and only a refresh cures it (src/components/shell/on-demand-notice.tsx :11–:13, INC-918). The operator saw the designed behaviour. Corrective: every walk line about a failure path is read against the mechanism's own comment and tests before it is sent.
- S460 (G3 addendum 2 and G5 — a figure is measured, not quoted from the record; 2026-10-27 23:4xZ, found by the outgoing thread) — answer 15 of the new thread's answers repeated launch-gate :98's October CI estimate ($300–600 a month for a private repository); the outgoing thread measured 244 job-minutes a run and about 540 runs a week (ESTIMATE $900–1,500 a month). Corrective: a cost figure is re-measured when it is quoted, and wears its ESTIMATE label.
- S461 (G16 addendum — an expected result is produced by running it; 2026-10-28 00:4xZ, found by turn 34c-4's executor) — the brief said the i18n maps would not change; its two new source files moved the maps' `scanned` count (595 → 597), so the executor committed them as a departure. Corrective: a brief that adds a source file under src/ or e2e/ runs `bun run i18n:usage` in the prototype and carries the maps' result.
- Also logged, not numbered (2026-10-27): the supervisor estimated instructions v1.15 at about 40% shorter than v1.14; it is 5% shorter, because v1.14 is mostly rules (G5 — the measured value recorded).
NEW-END
EDIT docs/spec/spec-ledger.md #1
OLD-BEGIN
NUMBERING after this block: next free DEC-281, D239, INC-955, S458, ACT-022.
OLD-END
NEW-BEGIN
NUMBERING after this block: next free DEC-281, D239, INC-955, S458, ACT-022.

S80 · 2026-10-27 22:1xZ → 2026-10-28 01:xxZ · RECORDS TURN R6 LANDED; THE ORDER OF WORK RECONCILED; THE WALK OF `562db573` (INC-955–INC-957, DEC-281); THE OUTGOING THREAD'S VERDICT (INC-958); FOUNDATIONS TURN 34c-4 (DEC-279 BUILT; INC-959–INC-961); FOUNDATIONS TURN K3 (DEC-277 AND DEC-278 BUILT; INC-941 AND DEC-282; INC-944'S EVIDENCE; RECORDS R7)

What landed (times Z unless marked local; local is UTC−4):
- 22:13Z — records turn R6 (the Claude Code executor; brief c5b77f38… / 91,145 B), landed `562db573`: run 40590576844 SUCCESS (22:13:14Z, 0 flaky, main promoted). A rebuilt R6 (7df2a4fc…) was never pasted; its parts ride records R7 (this block, in turn K3).
- 22:35Z — the nightly on `562db573`: SUCCESS (nightly-status.md on ci-evidence).
- 00:39Z (10-28) — Foundations turn 34c-4 (the Claude Code executor; brief c3c813db… / 93,833 B) landed `8cb2201d`: every file byte-equal to the supervisor's prototype but the two i18n maps (their `scanned` count, 595 → 597 — S461); run 40610714870 SUCCESS (01:02:33Z; one retried pass, ODE-1 — INC-961; main promoted).
- Foundations turn K3 (Lovable; this block's records ride it) — its result is recorded by the next records turn.

THE OPERATOR'S WORDS (local time)
- 17:4x — the two reminders set in the new session; the order to be redrawn holding every open roadmap.md and launch-gate.md line (his rule of 2026-10-06); INC-939 to the database turns; INC-938 needs Lovable for .claude/hooks; the nightly must handle 1 November.
- 17:5x — the outgoing thread's order of work (the Project doc claude/order-of-work-2026-10-27.md) replaces the new thread's order; disagreements listed with file:line; fifteen questions answered; no executor turn before the outgoing thread's verdict.
- 19:29 — the walk of the published `562db573` (eight lines): 1–6 PASS; line 7 — Amharic reads larger and the Home heading wraps on his iPhone; line 8 — offline, "Enlarge map" shows "Map pin" and the shell's notice hides behind the dialog.
- 19:38 — "Shorten the Amharic heading, for example “የአዲስ አበባ ማስታወቂያዎች” … is the best" — DEC-281.
- 19:4x — the outgoing thread's VERDICT on the new thread's answers (the Project doc claude/supervisor-answers-2026-10-27.md), checked at `562db573`: PASS; its corrections to the order accepted; "Proceed with 34c-4"; five additions (below).
- 19:5x — ACT-U0-1: "Already set" (the 7-day session time-box, the 4-hour inactivity timeout and compromised-refresh-token detection, on both projects).

DECISIONS
- DEC-281 (the operator, 2026-10-27 19:38 local; INC-957): the Amharic `feed.headingIn` becomes "የ{location} ማስታወቂያዎች" (212.9 px in Noto Sans Ethiopic 600 at 20 px, against 302.7 px today), built by script with its code points checked (G43); the fonts stay the device's own (DEC-262 unchanged). The only key of the concern in use (docs/generated/i18n-usage.json: / and /c/$slug); `feed.heading` is unused (INC-903's list). Rides the cleanup turn.
- DEC-282 (the supervisor, 2026-10-28, under G17 — reversible CI tooling; overridable): INC-941's action steps get a deadline each before their times are measured, because this session's reads of the Actions API are refused today: a wide ceiling — 5 minutes for checkout and the setup actions (setup-bun, setup-node, setup-python, setup-cli) and the SARIF upload; 10 for caches and artifacts; 8 for gitleaks and the status report's GitHub script; 25 for the ZAP scan; never more than its job's deadline less two minutes (ESTIMATE: each at least ten times the step's usual seconds). DEC-276's rule (every deadline from CI's own measured times: the maximum over at least 300 runs of the step, half again as margin) replaces each value once the times are read. Its judge, frozen now: KEEP when, over the next 20 completed CI runs on dev, no action step fails by its deadline; when one does, that step's times are measured and its deadline set from them.
- DEC-277 and DEC-278 BUILT in Foundations turn K3: the nightly's `hour` job (scripts/ci/nightly-hour.sh, NH-1…5 — the schedule that fired is judged on the run's UTC day, so a late start never skips both and the clock changes of 2026-11-01 and 2027-03-14 need no re-time); `bun .claude/hooks/land.ts --checks` (EXH-24), protocol step 5 and the turn-report skill.

THE ORDER OF WORK: the outgoing thread's document (claude/order-of-work-2026-10-27.md, written at `e2287d6d`) is the order, with the new thread's corrections accepted by the verdict — decision (2)'s rule-file part has its record (DEC-278: not path-scoped); 34f-2's MAJORs were ruled in block S79; launch-gate :72 is done for ethio-prod (:120); EXIF stripping is done (:69); DEC-277 needs no seasonal re-time; records R7 added; bundle 22's turns 14c, 14d, 15e and 15h spot-checked against block S76 (each landed with its run); INC-786/INC-821 and INC-443's backfill with the door mechanism; INC-952 with the AI gateway follow-up; INC-955, INC-956 and DEC-281 in the cleanup turn. The reconciled order lands in the repository with the next handoff (G53); until then the Project doc and roadmap.md line 3 carry it.

THE OUTGOING THREAD'S FIVE ADDITIONS (adopted): (1) the pin's precision default — INC-958 (the supervisor's "SAFE" withdrawn); (2) INC-957 widened to "a line that must fit at 360 in every language and every platform's font"; (3) DEC-277 is built by turn K3, not before; (4) the tracker marks the turn in progress; (5) ACT-U0-1 asked — answered "Already set". Answer 15's private-repository CI estimate is replaced: 244 job-minutes a CI run, about 540 workflow runs a week — ESTIMATE $900–1,500 a month at hosted Linux rates before included minutes, measured again before the switch (S460).

THE SUPERVISOR'S RULINGS (G17; overridable)
- Records turn R6's review (READY · 0 BLOCKER · 1 MAJOR · 3 MINOR on 2b0582f): the MAJOR (its own line ticked before its CI) ACCEPTED — a records turn's own line lands unticked (S458); the MINORs — 34c-4's line loses its second INC-930 sentence, ACT-021 moves to the action tracker's end, INC-952 gains its base line numbers — done in turn K3.
- Turn 34c-4's review (READY · 0 BLOCKER · 1 MAJOR · 7 MINOR on efea10e): the MAJOR (the Home-ahead mechanism has behaviour tests and no conformance census) ACCEPTED — `SIGN_OUT_LANDING` and a census of the sign-out navigations, the cleanup turn; the narrowed "no session" checks of SO-11, SO-12 and SO-13 ACCEPTED as a weakened-proof risk (G38) — `sessionsIn(page)`, the cleanup turn; the route guard's three out-of-date sentences and docs/features/admin-shell.md's DEC-279 line, the cleanup turn; the E2E project address printed in a refusal KEPT (it is publishable). Its departure 1 (the i18n maps) ACCEPTED (S461). Its limit is INC-960.
- INC-938 needs Bun's type definitions (not installed): a package change, its own turn and DEC under G42 — not turn K3.
- INC-936: the nightly is green again (22:35Z); its red nights of 10-19 → 10-26 are read whole before any ruling (G21) — not turn K3.
- The check-brief rules as conformance tests: scripts/ only — the cleanup turn (Claude Code).
- Launch gate: ACT-U0-1 marked done on the operator's word; INC-433 (closed 2026-10-05) and INC-480/INC-482 (bundle 8's Part A) ticked; leaked-password protection ON on ethio-prod, ethio-staging still to read.
- Bundle 22's turn lines 12 → 17 (nineteen lines) ticked: each landed with its run in block S76.

INCIDENTS — INC-955 (the on-demand failure notice under an open dialog), INC-956 (the maps' failure place says "Map pin"), INC-957 (a single-line slot wraps in Amharic on an iPhone; DEC-281 its instance), INC-958 (a pin's missing precision defaults to the exact point), INC-959 (the e2e reads of the browser's client wait on nothing), INC-960 (the phone's account menu needs its code for an offline sign-out), INC-961 (ODE-1 retried under the route guard's stricter rule — its third line in seven days); the later words on INC-930 and INC-952; in docs/tracking/incidental-findings.md.

SLIPS — S458 (a records turn's own line ticked before its CI; a review's findings ruled by name), S459 (a walk line not read against the mechanism), S460 (a cost figure quoted, not re-measured), S461 (the i18n maps' result guessed); in docs/governance/instructions-amendments.md §Slips.

OPERATOR STEPS OWED — the leaked-password protection read on ethio-staging; a Publish and one walk at the next bundle close (34c-4's sign-out, the map and the Amharic heading once the cleanup turn lands).

JUDGES OPEN AT THE CLOSE OF THIS BLOCK: INC-940 — the Flake check GREEN (2026-10-27); the second half, no AP-36 line in 20 CI runs from `e2287d6d` — 3 of 20 at run 40610714870, none since the fix. DEC-275 and DEC-276's twenty-run judges, as block S79 left them.

CURATOR STATE AT THE CLOSE OF THIS BLOCK: unchanged — as block S76 left it.

NUMBERING after this block: next free DEC-283, D239, INC-962, S462, ACT-022.
NEW-END
EDIT docs/governance/launch-gate.md #1
OLD-BEGIN
- ACT-U0-1: On Supabase Pro upgrade — set Sessions time-box to 7 days + inactivity timeout to 4 hours AND enable compromised-refresh-token detection, on ethio-prod AND ethio-staging. Until then the client session policy (U0k) is the effective enforcement.
OLD-END
NEW-BEGIN
- ACT-U0-1: On Supabase Pro upgrade — set Sessions time-box to 7 days + inactivity timeout to 4 hours AND enable compromised-refresh-token detection, on ethio-prod AND ethio-staging. Until then the client session policy (U0k) is the effective enforcement. — DONE on both projects (the operator, 2026-10-27: "Already set").
NEW-END
EDIT docs/governance/launch-gate.md #2
OLD-BEGIN
- [ ] Leaked-password protection toggle — UNKNOWN: the line above says Pro-plan gated; the security census of 2026-09-28 (`docs/tracking/security-scan-2026-09-28.md`) lists "Leaked Password Protection Disabled" as a warning, and the record of 2026-09-29 says the toggle was then enabled by the operator; the line was never updated. Confirm on the Supabase Auth settings of ethio-prod.
OLD-END
NEW-BEGIN
- [ ] Leaked-password protection toggle — UNKNOWN: the line above says Pro-plan gated; the security census of 2026-09-28 (`docs/tracking/security-scan-2026-09-28.md`) lists "Leaked Password Protection Disabled" as a warning, and the record of 2026-09-29 says the toggle was then enabled by the operator; the line was never updated. Confirm on the Supabase Auth settings of ethio-prod. — ethio-prod: ON since 2026-10-07 (the ticked line "Leaked-password protection on ethio-prod" below); ethio-staging still to be read (2026-10-27).
NEW-END
EDIT docs/governance/launch-gate.md #3
OLD-BEGIN
- [ ] INC-433 — the non-monotonic migration mark is healed (M7's `20261005040000` sits below M6's `20261005100000`; until the heal `max(version)` on both databases misreads the state; the next migration carries the UPDATE form the preflight understands and the mark rule gains "and above the ledger's current newest mark") — NOT DONE (low; the next migration — the engine batch or L1's first).
OLD-END
NEW-BEGIN
- [x] INC-433 — the non-monotonic migration mark is healed (M7's `20261005040000` sits below M6's `20261005100000`; until the heal `max(version)` on both databases misreads the state; the next migration carries the UPDATE form the preflight understands and the mark rule gains "and above the ledger's current newest mark") — NOT DONE (low; the next migration — the engine batch or L1's first). — FIXED and CLOSED 2026-10-05 (docs/tracking/incidental-findings.md, INC-433; ticked 2026-10-28).
NEW-END
EDIT docs/governance/launch-gate.md #4
OLD-BEGIN
- [ ] INC-480 and INC-482 (privileges hygiene found by M11's census and the third database lint; bodies in the Project record) — NOT DONE; the first migration of the next bundle, read back on ethio-prod before real users.
OLD-END
NEW-BEGIN
- [x] INC-480 and INC-482 (privileges hygiene found by M11's census and the third database lint; bodies in the Project record) — NOT DONE; the first migration of the next bundle, read back on ethio-prod before real users. — DONE: closed by bundle 8's Part A (roadmap.md, ticked; ticked here 2026-10-28).
NEW-END
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 36 | Browser → route calls attach the session, enforce a deadline, read an envelope, download bytes and upload with progress one way | `src/lib/route-client.ts` callRoute/downloadRoute/uploadRoute | `scripts/conformance/route-client.test.ts` RCG-1…4; RCL-1…15; PSV-1…6 | route-client-allowlist.txt (9 files; INC-861, INC-875 outside-host probe, non-route reviews 2027-04-24) | a new route is one call; auth mode, method, JSON/form, bytes, deadline and caller signal are arguments | Foundations turn 13: staff transfer screens and ad counters; turn 14: posting doors and the thirteen INC-875 readers moved, INC-875 closed |
| 37 | An executor's work reaches `dev` only inside its brief's scope, with its checks green and its report written (DEC-255) | `.claude/hooks/land.ts` (the landing door) + `scope-guard.ts`, `bash-guard.ts`, `stop-gate.ts`, `header.ts`, `session-setup.ts`, `post-edit.ts` over `lib.ts`; `.claude/settings.json` (permissions; hook wiring with `onFailure: "block"`); `CLAUDE.md` + `.claude/rules/00…60` | `scripts/conformance/executor-hooks.test.ts` EXH-0…19 | none | a second work branch is one constant (`WORK_BRANCH`); a new brief flag is one list entry (`KNOWN_FLAGS`); the standing allowance is one list | Claude Code sessions only; Lovable's agent follows `AGENTS.md` |
| 38 | A lint concern's rule reaches every file it owes — no later block drops it (INC-891) | `RESTRICTED_SYNTAX` in `eslint.config.js` — one list per concern (typedClient DEC-025, caughtError INC-815, routeBoundary DEC-237, specLint DEC-027), composed by every block that sets `no-restricted-syntax` | `scripts/conformance/lint-rules.test.ts` CF-LINT-1…3 (each file's computed config against the owed table; a planted `instanceof Error` refused at a screen, a route and a server path) | the owed table's two caughtError exemptions: test files and `src/lib/lovable-error-reporting.ts` (INC-815) | a new concern is one list and one owed-table line; a new block composes the lists its files owe | Foundations turn 21 |
OLD-END
NEW-BEGIN
| 36 | Browser → route calls attach the session, enforce a deadline, read an envelope, download bytes and upload with progress one way | `src/lib/route-client.ts` callRoute/downloadRoute/uploadRoute | `scripts/conformance/route-client.test.ts` RCG-1…4; RCL-1…15; PSV-1…6 | route-client-allowlist.txt (9 files; INC-861, INC-875 outside-host probe, non-route reviews 2027-04-24) | a new route is one call; auth mode, method, JSON/form, bytes, deadline and caller signal are arguments | Foundations turn 13: staff transfer screens and ad counters; turn 14: posting doors and the thirteen INC-875 readers moved, INC-875 closed |
| 37 | An executor's work reaches `dev` only inside its brief's scope, with its checks green and its report written (DEC-255) | `.claude/hooks/land.ts` (the landing door; `--checks` runs THE CHECKS alone, cached per code tree, so the landing does not run them again — DEC-278) + `scope-guard.ts`, `bash-guard.ts`, `stop-gate.ts`, `header.ts`, `session-setup.ts`, `post-edit.ts` over `lib.ts`; `.claude/settings.json` (permissions; hook wiring with `onFailure: "block"`); `CLAUDE.md` + `.claude/rules/00…60` | `scripts/conformance/executor-hooks.test.ts` EXH-0…24 (EXH-24: `--checks` pushes nothing and the landing finds its steps green) | none | a second work branch is one constant (`WORK_BRANCH`); a new brief flag is one list entry (`KNOWN_FLAGS`); the standing allowance is one list | Claude Code sessions only; Lovable's agent follows `AGENTS.md` |
| 38 | A lint concern's rule reaches every file it owes — no later block drops it (INC-891) | `RESTRICTED_SYNTAX` in `eslint.config.js` — one list per concern (typedClient DEC-025, caughtError INC-815, routeBoundary DEC-237, specLint DEC-027), composed by every block that sets `no-restricted-syntax` | `scripts/conformance/lint-rules.test.ts` CF-LINT-1…3 (each file's computed config against the owed table; a planted `instanceof Error` refused at a screen, a route and a server path) | the owed table's two caughtError exemptions: test files and `src/lib/lovable-error-reporting.ts` (INC-815) | a new concern is one list and one owed-table line; a new block composes the lists its files owe | Foundations turn 21 |
NEW-END
EDIT docs/governance/mechanisms.md #2
OLD-BEGIN
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…6: blocks in order, a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a file that cannot be staged — writes nothing; the command line and `--dry`; the wrapper run under the kit's scopeVerdict; BA-6, the census: no other code in src/, e2e/, scripts/ or .claude/ names a block marker) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK. Hardened in records turn R3 from R1's reviewer (MAJORs 1–2, MINORs 1–3, 5–6): run-on and unended blocks refused, EDIT numbers checked, writes staged, BA-6, docs/features/brief-applier.md; in records turn R4 from R3's reviewer (its MAJOR and two MINORs): an edited file keeps its mode, a directory at a target's path is refused before anything is placed, a failed placing is a refusal with no staged file left, BA-6 also names a parser of FILE blocks |
| 59 | Every CI job and every outside call carries a deadline: a step with none held a run for an hour (lane 16's browser install, run 40397087967) and a job with none runs to GitHub's 360 minutes; the temporary backend's fixed ports sit inside Linux's ephemeral range, so an outgoing connection could hold one (lanes 16, 8, 7, 10: "address already in use") (INC-935, DEC-275) | `scripts/ci/with-deadline.sh <seconds> <tries> -- <command>` (coreutils `timeout` on the command's process group; a failed or overdue try retried after 10 s as a `ci-retry` warning; the last try's code is the step's; a package install runs once — INC-943, DEC-276); `timeout-minutes` on every job (but the one that calls the lanes' reusable workflow) and on every step that reaches outside; the lanes' first step `sysctl net.ipv4.ip_local_reserved_ports=54320-54329`, and a failed start writes who held the ports into its evidence | `scripts/conformance/ci-deadlines.test.ts` (CF-CID-1: every workflow's jobs, outside calls, installs, package installs run once and backend starts; CF-CID-2: planted); `scripts/ci/with-deadline.test.ts` (WDL-1…4) | none — the nightly's 360 minutes is GitHub's own ceiling for its full serial suite (its length is the nightly's own concern) | a new workflow, job or install is named by CF-CID-1 until it carries its deadline | ci.yml, local-backend-proof.yml, nightly-e2e.yml, flake-check.yml, guard-proof.yml, feed-bench.yml, ci-status-report.yml, zap-baseline.yml since turn 34e; Foundations turn 34e |
| 60 | A part of the page that arrives after the first paint (a `resilientLazy` or `lazy` component, anything behind `<Suspense>`) holds its box from the first paint: its place while it loads and when it cannot download is the size of what it will show, so nothing around it moves when it arrives (WCAG 2.2 predictable layout; Core Web Vitals CLS) — AP-36's four retried passes, the Location box growing as the still map arrived (INC-940) | `src/features/posting/map/map-frame.tsx` `MapFrame` (the reserver) over `src/features/posting/map/still-map.ts` (`STILL_MAP_BOX`, `STILL_MAP_CREDIT`, `stillMapCaptionKey`), which the still map (`map-preview.tsx`) draws from; the provider's credit lies on the box at its foot | `scripts/conformance/holds-its-box.test.ts` — HB-1 enumerates every resilientLazy/lazy binding and every Suspense in src/ (13 at turn 34f), HB-2 plants a text place, an empty place and a silent download; `src/features/posting/map/map-frame.test.tsx` MFR-1/2 (the frame and the map draw the same box and caption); `src/features/posting/preview/listing-detail-map.test.tsx` LDM-1; `e2e/ad-page-layout.spec.ts` ALS-1 (the built page: the Location box keeps its height when the map's three downloads are let go) | `scripts/conformance/holds-its-box-allowlist.txt` (`<file>#<name> | reason | until`): the crumbs (one line of the crumb bar), the large map and the pin map (fixed overlays), the feed's cover preload (renders nothing), the home and category feeds' spinner (INC-945 — the QueryState mechanism) | a new reserver is a name in RESERVERS; a late part is a census key | turn 34f; the images' boxes are the Picture mechanism's (roadmap); data read after the paint is this row's data half — the ad page's place names come with the page in turn 34f-2 (INC-947), the rest with the QueryState mechanism |
OLD-END
NEW-BEGIN
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…6: blocks in order, a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a file that cannot be staged — writes nothing; the command line and `--dry`; the wrapper run under the kit's scopeVerdict; BA-6, the census: no other code in src/, e2e/, scripts/ or .claude/ names a block marker) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK. Hardened in records turn R3 from R1's reviewer (MAJORs 1–2, MINORs 1–3, 5–6): run-on and unended blocks refused, EDIT numbers checked, writes staged, BA-6, docs/features/brief-applier.md; in records turn R4 from R3's reviewer (its MAJOR and two MINORs): an edited file keeps its mode, a directory at a target's path is refused before anything is placed, a failed placing is a refusal with no staged file left, BA-6 also names a parser of FILE blocks |
| 59 | Every CI job and every outside call carries a deadline: a step with none held a run for an hour (lane 16's browser install, run 40397087967) and a job with none runs to GitHub's 360 minutes; the temporary backend's fixed ports sit inside Linux's ephemeral range, so an outgoing connection could hold one (lanes 16, 8, 7, 10: "address already in use") (INC-935, DEC-275) | `scripts/ci/with-deadline.sh <seconds> <tries> -- <command>` (coreutils `timeout` on the command's process group; a failed or overdue try retried after 10 s as a `ci-retry` warning; the last try's code is the step's; a package install runs once — INC-943, DEC-276); `timeout-minutes` on every job (but the one that calls the lanes' reusable workflow) and on every step that reaches outside — every action a step uses included, and pip, `git clone`, `git fetch` through the wrapper, `git push` with its step deadline (INC-941, Foundations turn K3; an action step's deadline is DEC-282's ceiling until DEC-276's measurement); the lanes' first step `sysctl net.ipv4.ip_local_reserved_ports=54320-54329`, and a failed start writes who held the ports into its evidence, and the database's busy sessions at the last 5-second sample before it failed (INC-944) | `scripts/conformance/ci-deadlines.test.ts` (CF-CID-1: every workflow's jobs, actions, outside calls, installs, package installs run once and backend starts — six rules; CF-CID-2: planted, eight breaches); `scripts/ci/with-deadline.test.ts` (WDL-1…4) | none — the nightly's 360 minutes is GitHub's own ceiling for its full serial suite (its length is the nightly's own concern) | a new workflow, job or install is named by CF-CID-1 until it carries its deadline | ci.yml, local-backend-proof.yml, nightly-e2e.yml, flake-check.yml, guard-proof.yml, feed-bench.yml, ci-status-report.yml, zap-baseline.yml since turn 34e; Foundations turn 34e |
| 60 | A part of the page that arrives after the first paint (a `resilientLazy` or `lazy` component, anything behind `<Suspense>`) holds its box from the first paint: its place while it loads and when it cannot download is the size of what it will show, so nothing around it moves when it arrives (WCAG 2.2 predictable layout; Core Web Vitals CLS) — AP-36's four retried passes, the Location box growing as the still map arrived (INC-940) | `src/features/posting/map/map-frame.tsx` `MapFrame` (the reserver) over `src/features/posting/map/still-map.ts` (`STILL_MAP_BOX`, `STILL_MAP_CREDIT`, `stillMapCaptionKey`), which the still map (`map-preview.tsx`) draws from; the provider's credit lies on the box at its foot | `scripts/conformance/holds-its-box.test.ts` — HB-1 enumerates every resilientLazy/lazy binding and every Suspense in src/ (13 at turn 34f), HB-2 plants a text place, an empty place and a silent download; `src/features/posting/map/map-frame.test.tsx` MFR-1/2 (the frame and the map draw the same box and caption); `src/features/posting/preview/listing-detail-map.test.tsx` LDM-1; `e2e/ad-page-layout.spec.ts` ALS-1 (the built page: the Location box keeps its height when the map's three downloads are let go) | `scripts/conformance/holds-its-box-allowlist.txt` (`<file>#<name> | reason | until`): the crumbs (one line of the crumb bar), the large map and the pin map (fixed overlays), the feed's cover preload (renders nothing), the home and category feeds' spinner (INC-945 — the QueryState mechanism) | a new reserver is a name in RESERVERS; a late part is a census key | turn 34f; the images' boxes are the Picture mechanism's (roadmap); data read after the paint is this row's data half — the ad page's place names come with the page in turn 34f-2 (INC-947), the rest with the QueryState mechanism |
NEW-END
EDIT docs/governance/mechanisms.md #3
OLD-BEGIN
| 62 | The page a sign-out lands on is on the device before it is needed: every sign-out ends on "/", and a tab opened on another page never downloaded the Home page's code, so a sign-out made offline there showed the root's "This page didn't load" view until the connection returned (INC-930) | `src/lib/sign-out-landing.ts` `createHomeAhead(load, report)` — for a signed-in visitor, online, the Home route's code (`router.loadRouteChunk` for "/", about 13.5 KB compressed) is fetched once per page life; a failure is logged and not retried (INC-918) — driven by the shell (`src/components/app-shell.tsx`, the visitor's reading and the `online` event) | HA-1…4 (`src/lib/sign-out-landing.test.ts`); SO-13 (`e2e/auth-signout.spec.ts`: a tab opened on /settings signs out offline and Home draws by its own code) | none | another page a flow lands on offline is another `load` given to the same function | DEC-279 (the operator's choice (b), 2026-10-27); Foundations turn 34c-4 |

OLD-END
NEW-BEGIN
| 62 | The page a sign-out lands on is on the device before it is needed: every sign-out ends on "/", and a tab opened on another page never downloaded the Home page's code, so a sign-out made offline there showed the root's "This page didn't load" view until the connection returned (INC-930) | `src/lib/sign-out-landing.ts` `createHomeAhead(load, report)` — for a signed-in visitor, online, the Home route's code (`router.loadRouteChunk` for "/", about 13.5 KB compressed) is fetched once per page life; a failure is logged and not retried (INC-918) — driven by the shell (`src/components/app-shell.tsx`, the visitor's reading and the `online` event) | HA-1…4 (`src/lib/sign-out-landing.test.ts`); SO-13 (`e2e/auth-signout.spec.ts`: a tab opened on /settings signs out offline and Home draws by its own code) | none | another page a flow lands on offline is another `load` given to the same function | DEC-279 (the operator's choice (b), 2026-10-27); Foundations turn 34c-4 |
| 63 | A scheduled job that encodes a local time keeps it across the clock changes: GitHub's schedules are UTC only, so a job at a local hour moved by an hour twice a year (governance §10's DST rule; DEC-277 — the nightly at 11:30 New York) | `scripts/ci/nightly-hour.sh <event> <schedule> [<UTC day>]` — the job carries one UTC schedule per offset (15:30 and 16:30 UTC) and its first job (`hour`) lets only the schedule that falls at the wanted local hour on the run's UTC day go on; the schedule that fired (`github.event.schedule`) is judged, never the clock, so a late start never skips both; a dispatched run always goes on; an unreadable schedule is an error, never a silent skip | `scripts/ci/nightly-hour.test.ts` (NH-1…5: summer, winter, both clock-change days, a dispatch, malformed input) | none | a second local-time job reuses the script (today its zone and hour are the nightly's constants — they become arguments with that job) | nightly-e2e.yml (its two test jobs wait on `hour`); Foundations turn K3 |

NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [x] Turn 11 (docs/governance/briefs/bundle-22-turn-11.md; docs only; no migration) — the records of the close by carrier: block S75, INC-759…INC-780 with the later word and the watch list, system-state, the handover, the condensed running record and the manifest
  - [ ] Turn 12 (docs/governance/briefs/bundle-22-turn-12.md and its ruling of 2026-10-20, which brings the tick's wording to DEC-208; M12 mark 20261020200000; eleven strings in force, six retired, and version 1's eight tick keys replaced by the ruling) — after the close, the operator's decisions of 2026-10-19 (22:38–23:59 local): DEC-206, one tick — 'I am 18 or older' only the first time, and (DEC-208, 2026-10-20 00:15 local) 'I have read and agree to the Terms of Service and the Privacy Policy' at signup and '… the updated Terms of Service and the updated Privacy Policy' at every new version, storage covered inside the Terms (no separate tick); 'Decline, sign out'; the gate reads again on the window's return; legal times shown in the viewer's own time zone; Admin › Users › Legal shows 18+ only where confirmed; the export door admin_export_legal_acceptances (legal:export with step-up; D226); LG-11 rewritten, LG-23, LG-24, LGA-9
  - [ ] Turn 13 (docs/governance/briefs/bundle-22-turn-13-v2.md; no migration; 16 strings, one retired) — Admin › Legal made easy to use (D226; the operator 2026-10-19 22:38 local): the text in force read in place; every version listed under its document; Compare with the previous version; Download (.md, the facts filled in) and Print of a version; Export acceptances (CSV through turn 12's door, with the step-up); a draft filled from a .md or .txt file; legal dates in the viewer's own time zone (DEC-207); LGA-10 to LGA-14
  - [ ] Turn 14 (docs/governance/briefs/bundle-22-turn-14-v2.md; no migration; no string) — FV-1 measured as polled truth (INC-773, run 1059's red); temporary test backends, phase 1 (D228, DEC-209; the operator 2026-10-20 01:31 local: "agree with your plan for turn 14 onwad. proceed please"): the census (docs/features/ci-local-backend.md); the guard's narrow exception for http://127.0.0.1:54321 under E2E_LOCAL_BACKEND; the proof workflow local-backend-proof.yml (the smoke tier on a temporary backend, non-gating, evidence on ci-evidence)
  - [ ] Turn 14b (docs/governance/briefs/bundle-22-turn-14b.md; no migration; no string) — LGA-13 reads the export's CRLF line ending (INC-785, run 1060's red); the proof's working copy: 20260922120000 skipped (never applied, INC-266), three patches, six fixtures, the parity lines (D228, DEC-209)
  - [ ] Turn 14c (docs/governance/briefs/bundle-22-turn-14c.md; no migration; no string) — the proof's start step records every failure's reason and accepts the CLI's key names (ANON_KEY or PUBLISHABLE_KEY, SERVICE_ROLE_KEY or SECRET_KEY); the evidence masks the CLI's local S3 keys; FV-1, RM-1 and "the menu opens in place" poll one helper whose failure names the gap, both containers and every row's height (INC-773, INC-784)

  <!-- prettier-ignore -->
  - [ ] Turn 14d (docs/governance/briefs/bundle-22-turn-14d.md; no migration; no string) — the proof's start step finds the single supabase_db_ container instead of assuming its name; the evidence keeps its own commit unmasked (D228, DEC-209)

  - [ ] Turn 14e (docs/governance/briefs/bundle-22-turn-14e.md; no migration; no string) — the promote job and sync-main write main with the repository secret `PROMOTE_TOKEN` (INC-787, DEC-210); the proof job sets `SUPABASE_PROJECT_ID` to `ethio-ci-local` (D228, DEC-209)

  - [ ] Turn 15 (docs/governance/briefs/bundle-22-turn-15-v2.md; no migration; no string) — one shared category tree (INC-788: every reader subscribes to one held tree; INC-773 and INC-784 are its symptoms); the full suite on temporary backends — the smoke lane and twelve shard lanes, each with its own backend, and a summary job (D228, DEC-209 proceed; DEC-211, the rule for switching CI)
  - [ ] Turn 15b (docs/governance/briefs/bundle-22-turn-15b.md; no migration; no string) — the proof's summary runs CI's failure reporter over the thirteen lanes (docs/tracking/local-backend-last-failure.md); G-1 asserts the configured auth server; the read-only census of staging's reference data (DEC-211)
  - [ ] Turn 15c (docs/governance/briefs/bundle-22-turn-15c.md; no migration; no string) — the temporary backend's API on https from a per-run certificate authority (INC-789); the languages page's publication gate follows the door (INC-790); a save run queued before a Next never carries it (INC-791); import previews in tests honour the door's budget (INC-792) (D228, DEC-211)
  - [ ] Turn 15d (docs/governance/briefs/bundle-22-turn-15d.md; no migration; no string) — the proof lane masks its results file as data, so a failure's body reaches the report (INC-794); the target guard's last local case on https (D228, DEC-211)
  - [ ] Turn 15e (docs/governance/briefs/bundle-22-turn-15e.md; no migration; no string) — the render-leak guard's first line names the element that holds the token (INC-796), so LGC-3's “undefined” on the staff ad page can be found (INC-795) (D228, DEC-211)
  - [ ] Turn 15f (docs/governance/briefs/bundle-22-turn-15f.md; no migration; one string) — the staff history's draft label (INC-795) with a test that every listing status has its label; a census of every dynamic label; the proof's lanes may run 60 minutes (D228, DEC-211)
  - [ ] Turn 15g (docs/governance/briefs/bundle-22-turn-15g.md; no migration; no string) — the fixtures that seed a scratch place wait until the public tree serves it (INC-797), with a census of every scratch chain (D228, DEC-211)
  - [ ] Turn 15h (docs/governance/briefs/bundle-22-turn-15h.md; no migration; no string) — the scratch-seller factories wait for the served place only on request, and only the tests whose outcome reads it ask (INC-797, S345) (D228, DEC-211)
  - [ ] Turn 15j (docs/governance/briefs/bundle-22-turn-15j-v3.md; no migration; no string; one package change) — vite ^8.1.6 and the override launch-editor ^2.14.2 clear GHSA-587h-7wmj-h5pm (INC-800, DEC-213)
  - [ ] Turn 15k (docs/governance/briefs/bundle-22-turn-15k.md; no migration; no string) — the staff history shows an unknown reason as its stored code (INC-799); every server failure reply carries a fixed code (INC-802, INC-803, INC-804); the view-session id from the platform's generator (INC-805); AP-41's host pattern (INC-806)
  - [ ] Turn 16 (docs/governance/briefs/bundle-22-turn-16-v3.md; no migration; no string) — CI's gating browser tests on temporary backends (DEC-211's switch, DEC-214's keep rule); the staging smoke tier, shards and fast lane retired; the account pool retired for CI; then the operator's staging compaction — VACUUM FULL of feed_index and listings, audit rows kept (DEC-212)
  - [x] Turn 18 (docs/governance/briefs/bundle-22-turn-18.md; no migration; no string) — the email-serial project (A-1+A-2, SU-3, SU-1, SU-2) runs in a fourteenth lane on its own temporary backend: auth confirms e-mail as hosted, mail to its own inbox, 30 sends an hour; the staging e-mail job and the shared staging build are removed; each lane reports its teardown line (DEC-218, judged on the next two runs; INC-808) — CI: run 39556647691, SUCCESS; email lane's four tests (A-1+A-2, SU-3, SU-1, SU-2) passed, none skipped or retried
OLD-END
NEW-BEGIN
  - [x] Turn 11 (docs/governance/briefs/bundle-22-turn-11.md; docs only; no migration) — the records of the close by carrier: block S75, INC-759…INC-780 with the later word and the watch list, system-state, the handover, the condensed running record and the manifest
  - [x] Turn 12 (docs/governance/briefs/bundle-22-turn-12.md and its ruling of 2026-10-20, which brings the tick's wording to DEC-208; M12 mark 20261020200000; eleven strings in force, six retired, and version 1's eight tick keys replaced by the ruling) — after the close, the operator's decisions of 2026-10-19 (22:38–23:59 local): DEC-206, one tick — 'I am 18 or older' only the first time, and (DEC-208, 2026-10-20 00:15 local) 'I have read and agree to the Terms of Service and the Privacy Policy' at signup and '… the updated Terms of Service and the updated Privacy Policy' at every new version, storage covered inside the Terms (no separate tick); 'Decline, sign out'; the gate reads again on the window's return; legal times shown in the viewer's own time zone; Admin › Users › Legal shows 18+ only where confirmed; the export door admin_export_legal_acceptances (legal:export with step-up; D226); LG-11 rewritten, LG-23, LG-24, LGA-9 — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 13 (docs/governance/briefs/bundle-22-turn-13-v2.md; no migration; 16 strings, one retired) — Admin › Legal made easy to use (D226; the operator 2026-10-19 22:38 local): the text in force read in place; every version listed under its document; Compare with the previous version; Download (.md, the facts filled in) and Print of a version; Export acceptances (CSV through turn 12's door, with the step-up); a draft filled from a .md or .txt file; legal dates in the viewer's own time zone (DEC-207); LGA-10 to LGA-14 — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 14 (docs/governance/briefs/bundle-22-turn-14-v2.md; no migration; no string) — FV-1 measured as polled truth (INC-773, run 1059's red); temporary test backends, phase 1 (D228, DEC-209; the operator 2026-10-20 01:31 local: "agree with your plan for turn 14 onwad. proceed please"): the census (docs/features/ci-local-backend.md); the guard's narrow exception for http://127.0.0.1:54321 under E2E_LOCAL_BACKEND; the proof workflow local-backend-proof.yml (the smoke tier on a temporary backend, non-gating, evidence on ci-evidence) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 14b (docs/governance/briefs/bundle-22-turn-14b.md; no migration; no string) — LGA-13 reads the export's CRLF line ending (INC-785, run 1060's red); the proof's working copy: 20260922120000 skipped (never applied, INC-266), three patches, six fixtures, the parity lines (D228, DEC-209) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 14c (docs/governance/briefs/bundle-22-turn-14c.md; no migration; no string) — the proof's start step records every failure's reason and accepts the CLI's key names (ANON_KEY or PUBLISHABLE_KEY, SERVICE_ROLE_KEY or SECRET_KEY); the evidence masks the CLI's local S3 keys; FV-1, RM-1 and "the menu opens in place" poll one helper whose failure names the gap, both containers and every row's height (INC-773, INC-784) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).

  <!-- prettier-ignore -->
  - [x] Turn 14d (docs/governance/briefs/bundle-22-turn-14d.md; no migration; no string) — the proof's start step finds the single supabase_db_ container instead of assuming its name; the evidence keeps its own commit unmasked (D228, DEC-209) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).

  - [x] Turn 14e (docs/governance/briefs/bundle-22-turn-14e.md; no migration; no string) — the promote job and sync-main write main with the repository secret `PROMOTE_TOKEN` (INC-787, DEC-210); the proof job sets `SUPABASE_PROJECT_ID` to `ethio-ci-local` (D228, DEC-209) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).

  - [x] Turn 15 (docs/governance/briefs/bundle-22-turn-15-v2.md; no migration; no string) — one shared category tree (INC-788: every reader subscribes to one held tree; INC-773 and INC-784 are its symptoms); the full suite on temporary backends — the smoke lane and twelve shard lanes, each with its own backend, and a summary job (D228, DEC-209 proceed; DEC-211, the rule for switching CI) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 15b (docs/governance/briefs/bundle-22-turn-15b.md; no migration; no string) — the proof's summary runs CI's failure reporter over the thirteen lanes (docs/tracking/local-backend-last-failure.md); G-1 asserts the configured auth server; the read-only census of staging's reference data (DEC-211) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 15c (docs/governance/briefs/bundle-22-turn-15c.md; no migration; no string) — the temporary backend's API on https from a per-run certificate authority (INC-789); the languages page's publication gate follows the door (INC-790); a save run queued before a Next never carries it (INC-791); import previews in tests honour the door's budget (INC-792) (D228, DEC-211) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 15d (docs/governance/briefs/bundle-22-turn-15d.md; no migration; no string) — the proof lane masks its results file as data, so a failure's body reaches the report (INC-794); the target guard's last local case on https (D228, DEC-211) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 15e (docs/governance/briefs/bundle-22-turn-15e.md; no migration; no string) — the render-leak guard's first line names the element that holds the token (INC-796), so LGC-3's “undefined” on the staff ad page can be found (INC-795) (D228, DEC-211) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 15f (docs/governance/briefs/bundle-22-turn-15f.md; no migration; one string) — the staff history's draft label (INC-795) with a test that every listing status has its label; a census of every dynamic label; the proof's lanes may run 60 minutes (D228, DEC-211) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 15g (docs/governance/briefs/bundle-22-turn-15g.md; no migration; no string) — the fixtures that seed a scratch place wait until the public tree serves it (INC-797), with a census of every scratch chain (D228, DEC-211) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 15h (docs/governance/briefs/bundle-22-turn-15h.md; no migration; no string) — the scratch-seller factories wait for the served place only on request, and only the tests whose outcome reads it ask (INC-797, S345) (D228, DEC-211) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 15j (docs/governance/briefs/bundle-22-turn-15j-v3.md; no migration; no string; one package change) — vite ^8.1.6 and the override launch-editor ^2.14.2 clear GHSA-587h-7wmj-h5pm (INC-800, DEC-213) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 15k (docs/governance/briefs/bundle-22-turn-15k.md; no migration; no string) — the staff history shows an unknown reason as its stored code (INC-799); every server failure reply carries a fixed code (INC-802, INC-803, INC-804); the view-session id from the platform's generator (INC-805); AP-41's host pattern (INC-806) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 16 (docs/governance/briefs/bundle-22-turn-16-v3.md; no migration; no string) — CI's gating browser tests on temporary backends (DEC-211's switch, DEC-214's keep rule); the staging smoke tier, shards and fast lane retired; the account pool retired for CI; then the operator's staging compaction — VACUUM FULL of feed_index and listings, audit rows kept (DEC-212) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 18 (docs/governance/briefs/bundle-22-turn-18.md; no migration; no string) — the email-serial project (A-1+A-2, SU-3, SU-1, SU-2) runs in a fourteenth lane on its own temporary backend: auth confirms e-mail as hosted, mail to its own inbox, 30 sends an hour; the staging e-mail job and the shared staging build are removed; each lane reports its teardown line (DEC-218, judged on the next two runs; INC-808) — CI: run 39556647691, SUCCESS; email lane's four tests (A-1+A-2, SU-3, SU-1, SU-2) passed, none skipped or retried
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [x] Turn 34c-3 (docs/governance/briefs/foundations-turn-34c-3.md; no migration; Lovable) — the guard debt of turn 32b's reviewer: the overlay facades tell no stale failure — an older ask's late failure says nothing, a dialog's owner that closed it meanwhile hears no closing (OVF-21, OVF-22), an uncontrolled dialog's listener hears the failed opening (OVF-19), OVF-17/18 read the trigger's closed state and the owner's last word; the strings layers' hook offers no retry (INC-918; PSL-3); the E2E colour reader reads rgb()'s alpha (EC-6). Final HEAD 83badbba; CI run 40400996498: queued when turn K2's brief was sent (the supervisor reads it).
  - [ ] Turn 34c-4 — the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2): sized by the tests the helper change reaches (the sign-in helpers reach most specs — G37), so the helper first, its callers after. INC-930: the operator chose (b) on 2026-10-27 (DEC-279) — for a signed-in visitor the Home page's code is fetched ahead of time (at most 13.5 KB compressed, once, measured 2026-10-26), so an offline sign-out lands on a working page. And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell. With it, turn 34d's reviewer's points on the route guard (e2e/helpers/route-guard.ts): it ends a request quietly only when the page is in fact closed (a disposed response on a live page is the test's own failure); it reads the error's text through errorText (INC-937); CF-RG-1 accepts `whilePageLives` by name only (a planted other wrapper is named) and its log line counts handlers, not files.
  - [ ] INC-959 — the e2e reads of the browser's client (`window.__ethioSupabase`, 91 mentions in 24 files at `562db573`, grep-counted; the synchronous readers of turn 34c-1's K2: admin-users.spec.ts, admin-translations-data.spec.ts, admin-translations-console.spec.ts) go through one helper that waits for the client's hand-off (DEC-261), with its census and an allowlist that falls file by file (G0.4) — the part of turn 34c-4's line that turn left (its K2)
  - [ ] INC-937 — a caught error's text is read through `errorText` (src/lib/error-text.ts; rule 10 F4) in e2e/ and scripts/ as in src/: the census (src/lib/error-text.test.ts :113) reads the three folders, and the 40 hand reads (30 in 13 e2e files, 10 in 6 scripts files; the route guard's in turn 34c-4) move onto it, each left one an allowlist line with its reason and expiry.
  - [ ] INC-938 — every TypeScript file is type-checked: `bun run typecheck` (tsconfig.json's include) covers neither scripts/ nor .claude/hooks/, so the conformance censuses, the CI scripts, the kit and the block applier are type-checked by nobody (vitest transpiles without types; records turn R1's reviewer, MINOR 4) — a typecheck over both (Bun's globals typed for the kit), its first run's errors fixed or listed. With it the block applier's two MINORs from records turn R4's reviewer: a failed placing says which files it placed (repository paths) instead of "nothing written", and that branch gets its test.
  - [ ] INC-939 — each storage bucket allows only what its door allows: listing-photos and category-assets carry no allowed_mime_types or file_size_limit — defence in depth only (no client writes listing photos since 20261015102153; category assets need staff rights) — a migration turn (Tier A): the image types and the media pipeline's byte caps set on each bucket, proven on staging.
  - [ ] INC-936 — the nightly's red nights read whole before any fix (G21): AP-41 (three nights running — the place link), LG-21, PW-132 and the rest of 10-19 → 10-26, each class dispositioned in a ruling (staging under load, a real defect, a test to fix); the nightly's length (280–358 minutes against GitHub's 360) brought under its ceiling, and a heartbeat written on a cancelled run.
  - [ ] INC-941 (Lovable — .github/workflows/\*\* is closed to the Claude Code executor) — the CI deadline census by its definition: pip and git's network commands (ci.yml :323, :326–:328) through scripts/ci/with-deadline.sh, every downloading `uses:` step (setup-bun, setup-node, setup-python, gitleaks) with a step `timeout-minutes`, CF-CID naming each with a planted bypass.
  - [ ] INC-942 — one typed way to pass a database function's optional argument (with the door mechanism): the eleven `null as unknown as T` casts (category-images-service.ts :159, category-dialogs.tsx :681, attributes-service.ts ×7, locations-service.ts :98–:99) onto it, and a census that refuses the cast.
  - [ ] INC-944 — lane 7's backend start deadlocked applying 20261007033719 (`DROP POLICY … ON public.locations`) against a second database session: on its next occurrence the start's evidence names that session (the sessions read before the CLI stops its containers, or the start re-run once with `--debug`), then the cause fixed at its root — never retried away (G38).
  - [ ] INC-945 — the home and category feeds' place while their first page streams is the cards' shape, not a spinner (src/routes/index.tsx :34, src/routes/c.$slug.tsx :39): with the QueryState mechanism; both lines leave scripts/conformance/holds-its-box-allowlist.txt
OLD-END
NEW-BEGIN
  - [x] Turn 34c-3 (docs/governance/briefs/foundations-turn-34c-3.md; no migration; Lovable) — the guard debt of turn 32b's reviewer: the overlay facades tell no stale failure — an older ask's late failure says nothing, a dialog's owner that closed it meanwhile hears no closing (OVF-21, OVF-22), an uncontrolled dialog's listener hears the failed opening (OVF-19), OVF-17/18 read the trigger's closed state and the owner's last word; the strings layers' hook offers no retry (INC-918; PSL-3); the E2E colour reader reads rgb()'s alpha (EC-6). Final HEAD 83badbba; CI run 40400996498: queued when turn K2's brief was sent (the supervisor reads it).
  - [x] Turn 34c-4 (docs/governance/briefs/foundations-turn-34c-4.md; no migration; the Claude Code executor; G0) — the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2): sized by the tests the helper change reaches (the sign-in helpers reach most specs — G37), so the helper first, its callers after. INC-930: the operator chose (b) on 2026-10-27 (DEC-279) — for a signed-in visitor the Home page's code is fetched ahead of time (at most 13.5 KB compressed, once, measured 2026-10-26), so an offline sign-out lands on a working page. With it, turn 34d's reviewer's points on the route guard (e2e/helpers/route-guard.ts): it ends a request quietly only when the page is in fact closed (a disposed response on a live page is the test's own failure); it reads the error's text through errorText (INC-937); CF-RG-1 accepts `whilePageLives` by name only (a planted other wrapper is named) and its log line counts handlers, not files. Landed `8cb2201d`; run 40610714870 SUCCESS (01:02:33Z; one retried pass, ODE-1 — INC-961; main promoted). Its limit (the phone's account menu offline) is INC-960; its K2 is INC-959.
  - [ ] INC-959 — the e2e reads of the browser's client (`window.__ethioSupabase`, 91 mentions in 24 files at `562db573`, grep-counted; the synchronous readers of turn 34c-1's K2: admin-users.spec.ts, admin-translations-data.spec.ts, admin-translations-console.spec.ts) go through one helper that waits for the client's hand-off (DEC-261), with its census and an allowlist that falls file by file (G0.4) — the part of turn 34c-4's line that turn left (its K2)
  - [ ] INC-955 — the shell's on-demand failure notice is drawn under an open dialog and hidden from assistive technology by the modal: the notice in the top layer above any open overlay, outside the modal's hidden region, with a census of every overlay consumer (the cleanup turn).
  - [ ] INC-956 — the maps' download-failure place (MapUnavailable, listing-detail.tsx) says "Map pin": it draws LoadFailedHere inside MapFrame, with a census of every resilientLazy fallback (the cleanup turn).
  - [ ] INC-957 / DEC-281 — the Amharic Home heading `feed.headingIn` becomes "የ{location} ማስታወቂያዎች" (built by script, code points checked — G43; the cleanup turn, with the i18n maps); the class — a census of the single-line slots at 360 in every language and platform font, and/or a wider Ethiopic test font in CI — with the Foundations locale and format work.
  - [ ] INC-958 — a pin is drawn and linked only when its precision is known (listing-detail.tsx :1169, :1179, :1218, :415 default a missing precision to "exact"): typed absence, no map and no link (the cleanup turn).
  - [ ] INC-961 — ODE-1 retried under the route guard's stricter rule (run 40610714870, its third line in seven days): the trace and the guard's two conditions read first, then the cause fixed at its root, never a retry or a loosened match (the cleanup turn, with turn 34c-4's review).
  - [ ] INC-960 — the phone's account menu code fetched ahead with Home's for a signed-in visitor (createHomeAhead's second consumer, register row 62), SO-13's phone leg without the online opening.
  - [ ] Turn 34c-4's review, for the cleanup turn: the sign-out landing one constant (`SIGN_OUT_LANDING`, src/lib/sign-out-landing.ts) with a census of every sign-out navigation in app-shell.tsx (the MAJOR, G0.4); SO-11, SO-12 and SO-13's "no session" checks read every project's stored session again (`sessionsIn(page)`, G38); the route guard's three out-of-date sentences; docs/features/admin-shell.md's sign-out section gains DEC-279.
  - [ ] INC-937 — a caught error's text is read through `errorText` (src/lib/error-text.ts; rule 10 F4) in e2e/ and scripts/ as in src/: the census (src/lib/error-text.test.ts :113) reads the three folders, and the 40 hand reads (30 in 13 e2e files, 10 in 6 scripts files; the route guard's in turn 34c-4) move onto it, each left one an allowlist line with its reason and expiry.
  - [ ] INC-938 — every TypeScript file is type-checked: `bun run typecheck` (tsconfig.json's include) covers neither scripts/ nor .claude/hooks/, so the conformance censuses, the CI scripts, the kit and the block applier are type-checked by nobody (vitest transpiles without types; records turn R1's reviewer, MINOR 4) — a typecheck over both (Bun's globals typed for the kit), its first run's errors fixed or listed. With it the block applier's two MINORs from records turn R4's reviewer: a failed placing says which files it placed (repository paths) instead of "nothing written", and that branch gets its test. — Bun's type definitions are not installed (no `bun-types` or `@types/bun` in node_modules at `8cb2201d`), so the kit's typecheck needs a package change: its own turn and DEC under G42 (Lovable for .claude/hooks), not Foundations turn K3.
  - [ ] INC-939 — each storage bucket allows only what its door allows: listing-photos and category-assets carry no allowed_mime_types or file_size_limit — defence in depth only (no client writes listing photos since 20261015102153; category assets need staff rights) — a migration turn (Tier A): the image types and the media pipeline's byte caps set on each bucket, proven on staging.
  - [ ] INC-936 — the nightly's red nights read whole before any fix (G21): AP-41 (three nights running — the place link), LG-21, PW-132 and the rest of 10-19 → 10-26, each class dispositioned in a ruling (staging under load, a real defect, a test to fix); the nightly's length (280–358 minutes against GitHub's 360) brought under its ceiling, and a heartbeat written on a cancelled run.
  - [x] INC-941 (Lovable — .github/workflows/\*\* is closed to the Claude Code executor) — the CI deadline census by its definition: pip and git's network commands (ci.yml :323, :326–:328) through scripts/ci/with-deadline.sh, every downloading `uses:` step (setup-bun, setup-node, setup-python, gitleaks) with a step `timeout-minutes`, CF-CID naming each with a planted bypass. — Foundations turn K3: CF-CID-1's six rules (every action a step uses declares `timeout-minutes`; pip, `git clone` and `git fetch` through the wrapper; `git push` with its step deadline), the semgrep rules fetched as the pinned commit only; the action steps' deadlines are DEC-282's ceilings until measured (DEC-276).
  - [ ] INC-942 — one typed way to pass a database function's optional argument (with the door mechanism): the eleven `null as unknown as T` casts (category-images-service.ts :159, category-dialogs.tsx :681, attributes-service.ts ×7, locations-service.ts :98–:99) onto it, and a census that refuses the cast.
  - [ ] INC-944 — lane 7's backend start deadlocked applying 20261007033719 (`DROP POLICY … ON public.locations`) against a second database session: on its next occurrence the start's evidence names that session (the sessions read before the CLI stops its containers, or the start re-run once with `--debug`), then the cause fixed at its root — never retried away (G38). — the start's evidence built in Foundations turn K3: the database's busy sessions sampled every 5 seconds while the start runs, the last sample written into the failed start's log, each lane's sample count in local-backend-proof.md on ci-evidence; the line stays open until the next occurrence names the session and the cause is fixed.
  - [ ] INC-945 — the home and category feeds' place while their first page streams is the cards' shape, not a spinner (src/routes/index.tsx :34, src/routes/c.$slug.tsx :39): with the QueryState mechanism; both lines leave scripts/conformance/holds-its-box-allowlist.txt
NEW-END
EDIT roadmap.md #3
OLD-BEGIN
  - [ ] INC-948 — PW-30 fails whenever e2e/post-wizard-place.spec.ts runs whole against ethio-staging (BASE too): its trace and the step's DOM read first (G21), then the cause fixed
  - [ ] Records owed by turn 34f (a Lovable turn — .claude/\*\* is closed to the Claude Code executor): .claude/rules/20-tests.md's "Harness helpers you must use" gains `layoutBoxes(targets)` beside `settled(page)` (the binding text, docs/features/e2e-harness.md, has it from turn 34f)
  - [ ] INC-949 — `public_listing_json` names only the places the location tree shows: redeclared whole from its live definition (a Tier A migration turn, G39) with the tree's rule written once as one SQL predicate both doors use, proofs on scratch rows; `places.list` also carries each place's ancestor path for the Maps address (turn 34f-2's review, MAJOR 3)
OLD-END
NEW-BEGIN
  - [ ] INC-948 — PW-30 fails whenever e2e/post-wizard-place.spec.ts runs whole against ethio-staging (BASE too): its trace and the step's DOM read first (G21), then the cause fixed
  - [x] Records owed by turn 34f (a Lovable turn — .claude/\*\* is closed to the Claude Code executor): .claude/rules/20-tests.md's "Harness helpers you must use" gains `layoutBoxes(targets)` beside `settled(page)` (the binding text, docs/features/e2e-harness.md, has it from turn 34f) — Foundations turn K3.
  - [ ] INC-949 — `public_listing_json` names only the places the location tree shows: redeclared whole from its live definition (a Tier A migration turn, G39) with the tree's rule written once as one SQL predicate both doors use, proofs on scratch rows; `places.list` also carries each place's ancestor path for the Maps address (turn 34f-2's review, MAJOR 3)
NEW-END
EDIT roadmap.md #4
OLD-BEGIN
  - [ ] INC-443, the rest — the public-surface allowlist (scripts/public-surface-allowlist.txt) gains the eleven older browser grants it lacks (listing_reveal_count, cat_primary_pointer, cat_primary_parent, get_category_tree_version, admin_list_categories, price_shape_for_basis, impersonated_list_listings, attr_answer_tokens, attr_answer_other_text, attr_contact_like, listing_contact_refusals), each with its reason; the admin_reveal_listing_contact line loses "with a fresh second factor" (D129); transition_listing listed once
  - [ ] The CI and kit turn (Lovable — .github/workflows/\*\* and .claude/\*\* are closed to the Claude Code executor) — DEC-277: the nightly at 11:30 New York (two crons, 15:30 and 16:30 UTC, the job going on only when the New York hour is 11); DEC-278: the full checks once per code tree (protocol step 5 through land.ts's cache), the reviewer unchanged; the records owed by turn 34f (above); INC-941; INC-936's rulings once the red nights are read
  - [ ] ACT-021 — a phone measurement of the published site after the next Publish (the speed lab's slow-4G phone; home, category, ad, seller, sign-in): what turns 24–34f bought, the speed study's baseline
OLD-END
NEW-BEGIN
  - [ ] INC-443, the rest — the public-surface allowlist (scripts/public-surface-allowlist.txt) gains the eleven older browser grants it lacks (listing_reveal_count, cat_primary_pointer, cat_primary_parent, get_category_tree_version, admin_list_categories, price_shape_for_basis, impersonated_list_listings, attr_answer_tokens, attr_answer_other_text, attr_contact_like, listing_contact_refusals), each with its reason; the admin_reveal_listing_contact line loses "with a fresh second factor" (D129); transition_listing listed once
  - [ ] Foundations turn K3 (docs/governance/briefs/foundations-turn-k3.md; no migration; Lovable — .github/workflows/\*\* and .claude/\*\* are closed to the Claude Code executor; G0) — DEC-277: the nightly at 11:30 New York all year (two crons, 15:30 and 16:30 UTC; the `hour` job and scripts/ci/nightly-hour.sh, NH-1…5); DEC-278: THE CHECKS once per code tree (`bun .claude/hooks/land.ts --checks`, protocol step 5, EXH-24), the reviewer unchanged; the records owed by turn 34f (`layoutBoxes` in .claude/rules/20-tests.md); INC-941; INC-944's start evidence; the CF-LINT floor; records turn R7 (block S80, INC-955–INC-961, S458–S461, the ticks). LEFT, each on its own line: INC-936 (the red nights read first), INC-938 (a package change), the check-brief rules as conformance tests (the cleanup turn).
  - [ ] ACT-021 — a phone measurement of the published site after the next Publish (the speed lab's slow-4G phone; home, category, ad, seller, sign-in): what turns 24–34f bought, the speed study's baseline
NEW-END
EDIT roadmap.md #5
OLD-BEGIN
  - [ ] docs/features/e2e-harness.md §Authoring laws gains D237's rule: a test that picks a language signed in on a shared account restores it before it ends.
  - [ ] CF-LINT-1/2 gain a non-empty floor: the census fails when it finds no file to read (a list that matches nothing passes today).
  - [ ] Turn 33's two minors: the "CF-FT allowlist" named in docs before it exists, and the font census missing the `font:` shorthand.
OLD-END
NEW-BEGIN
  - [ ] docs/features/e2e-harness.md §Authoring laws gains D237's rule: a test that picks a language signed in on a shared account restores it before it ends.
  - [x] CF-LINT-1/2 gain a non-empty floor: the census fails when it finds no file to read (a list that matches nothing passes today). — Foundations turn K3 (CF-LINT-1 reads more than 400 src files, CF-LINT-2 more than 50 e2e files; CF-LINT-4: an empty walk stays under the floor).
  - [ ] Turn 33's two minors: the "CF-FT allowlist" named in docs before it exists, and the font census missing the `font:` shorthand.
NEW-END
EDIT roadmap.md #6
OLD-BEGIN
  - [ ] Before launch (owed; spec first, after peer research) — the privacy-request inbox: a signed-in "Your data" request form and staff logging the requests that reach privacy@ethio.com; each request shows its due date (the response-time facts), is flagged as it nears and when overdue, and is marked answered or not with who, when and a note (D229, the operator 2026-10-21)
  - [ ] Turn 17 (docs/governance/briefs/bundle-22-turn-17-v4.md; no migration; no string) — no one escapes the acceptance, first half (D227): a brand-new account through the sign-up form meets the acceptance before any page (SU-3); a refusal test per door (LG-25 edit, LG-26 renew, LG-27 photos, with LG-17 and LG-20); the write-door guard in the smoke lane with its allowlist (DEC-215)
  - [x] Turn 17b (docs/governance/briefs/bundle-22-turn-17b-v2.md; one migration M13, mark 20261021180000; no string) — the acceptance guard on the tables (DEC-216): the seller's own changes to what others see are held while an acceptance is owed, taking down never is; the twelve owed doors classed `guarded` or `takedown` (INC-807 closed); LG-28…LG-31 — CI run 1080 on edfa9c80: SUCCESS (lanes 13/13: 2,133 passed, 0 failed, 0 flaky); main promoted
OLD-END
NEW-BEGIN
  - [ ] Before launch (owed; spec first, after peer research) — the privacy-request inbox: a signed-in "Your data" request form and staff logging the requests that reach privacy@ethio.com; each request shows its due date (the response-time facts), is flagged as it nears and when overdue, and is marked answered or not with who, when and a note (D229, the operator 2026-10-21)
  - [x] Turn 17 (docs/governance/briefs/bundle-22-turn-17-v4.md; no migration; no string) — no one escapes the acceptance, first half (D227): a brand-new account through the sign-up form meets the acceptance before any page (SU-3); a refusal test per door (LG-25 edit, LG-26 renew, LG-27 photos, with LG-17 and LG-20); the write-door guard in the smoke lane with its allowlist (DEC-215) — landed; its commit and run in spec-ledger block S76 (ticked by Foundations turn K3, R7).
  - [x] Turn 17b (docs/governance/briefs/bundle-22-turn-17b-v2.md; one migration M13, mark 20261021180000; no string) — the acceptance guard on the tables (DEC-216): the seller's own changes to what others see are held while an acceptance is owed, taking down never is; the twelve owed doors classed `guarded` or `takedown` (INC-807 closed); LG-28…LG-31 — CI run 1080 on edfa9c80: SUCCESS (lanes 13/13: 2,133 passed, 0 failed, 0 flaky); main promoted
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34c-4 (2026-10-27; DEC-279, INC-930; register rows 55, 57 and 62) — the tests find the browser's stored session by the app's own names: the rule moves to src/lib/session-key.ts, read by the door and by e2e/helpers/session.ts, whose stored-session helpers replace ten searches for "any sb-…-auth-token" and the session clocks' hand-built names (CF-PROJECT-3/4). For a signed-in visitor the Home page's code is fetched ahead of time (src/lib/sign-out-landing.ts, HA-1…4), so a sign-out made offline from a page opened directly lands on a working Home page (SO-13). The route guard ends a request quietly only when its page is in fact closed, reads the error's words through errorText, and is recognised by name only (RG-3, CF-RG-2).
OLD-END
NEW-BEGIN
- Foundations turn 34c-4 (2026-10-27; DEC-279, INC-930; register rows 55, 57 and 62) — the tests find the browser's stored session by the app's own names: the rule moves to src/lib/session-key.ts, read by the door and by e2e/helpers/session.ts, whose stored-session helpers replace ten searches for "any sb-…-auth-token" and the session clocks' hand-built names (CF-PROJECT-3/4). For a signed-in visitor the Home page's code is fetched ahead of time (src/lib/sign-out-landing.ts, HA-1…4), so a sign-out made offline from a page opened directly lands on a working Home page (SO-13). The route guard ends a request quietly only when its page is in fact closed, reads the error's words through errorText, and is recognised by name only (RG-3, CF-RG-2).

- Foundations turn K3 (2026-10-28; DEC-277, DEC-278, DEC-282, INC-941, INC-944; register rows 37, 59 and 63, new; Lovable) — the nightly starts at 11:30 New York all year: two schedules (15:30 and 16:30 UTC) and an `hour` job (scripts/ci/nightly-hour.sh, NH-1…5) that lets only the one at 11 o'clock New York go on. THE CHECKS run once per code tree: `bun .claude/hooks/land.ts --checks` runs them alone, pushes nothing and caches each green step, and the landing finds them green (EXH-24; the protocol's step 5 and the turn-report skill). Every action a CI step uses declares its own deadline (DEC-282's ceilings until DEC-276's measurement), pip and git's downloads run through the retrying wrapper and the semgrep rules are fetched as the pinned commit only (CF-CID-1's six rules, CF-CID-2's eight planted breaches). A failed backend start writes the database's busy sessions at its last sample (INC-944). CF-LINT-1/2 gain a floor (CF-LINT-4). .claude/rules/20-tests.md names `layoutBoxes`. Records R7: spec-ledger block S80, INC-955–INC-961, S458–S461, bundle 22's turn lines ticked, three launch-gate lines settled. No product code, no migration, no string.
NEW-END
```
