# CI Status Reporter

Makes CI results readable from the repo itself, so the supervisor's fresh clone
carries CI state without an authenticated GitHub API call.

## How it works

.github/workflows/ci-status-report.yml triggers on `workflow_run: completed` of the
"CI" workflow. It reads that finished run's conclusion and per-job results and writes
docs/tracking/ci-status.md: commit SHA, overall conclusion, per-job table, UTC
completion timestamp, and the run URL. In the same step it also writes
docs/tracking/guards-last-failure.md (below). Both files land in one `[skip ci]`
commit on branch `ci-evidence` through `scripts/publish-evidence.sh` (DEC-098).

## Where the evidence lives (DEC-098)

Evidence lives on branch `ci-evidence` at `docs/tracking/<file>` — ci-status.md,
guards-last-failure.md, e2e-last-failure.md, flake-ledger.md, nightly-status.md and
nightly-last-failure.md. Read it with
`git fetch origin ci-evidence && git show origin/ci-evidence:docs/tracking/ci-status.md`.
The publisher works in its own worktree, never touches dev or main, retries three
times regenerating on top of the fetched branch, and a failed publish is a warning,
never a red job. The copies on dev are frozen until stage 2.

## Evidence per ref (DEC-321, housekeeping turn 3)

Every caller of `scripts/publish-evidence.sh` sets `EVIDENCE_REF` to the ref its run tested: this
reporter `github.event.workflow_run.head_branch`; ci.yml's E2E verdict job, the lanes' summary,
flake-check, the nightly and the feed bench `github.head_ref || github.ref_name`. A `dev` run
publishes at `docs/tracking/<file>` as before; any other ref at
`docs/tracking/branches/<ref>/<file>`, the ref sanitised to `[A-Za-z0-9._/-]` and refused when it
could name a path outside `branches/` (`..`, a `.` segment, a leading or trailing `/`, nothing
left). A missing or refused ref publishes nothing, with a `::warning::`, like a path outside
docs/tracking. The flake ledger stays one file for every ref (DEC-030), and each new line names its
ref after the commit (`· ref \`<ref>\``). A lane's evidence is read at
`git show origin/ci-evidence:docs/tracking/branches/<ref>/ci-status.md`. Guards: CF-PUBLISH-1…3
(`scripts/publish-evidence.test.ts`, the mapping through `--print-path <ref> <file>`), the
self-test's cases (f) and (g) (`scripts/publish-evidence.selftest.sh`, a lane ref and a refused ref
against a bare repository), and CF-CID-5/6 (every workflow step that calls the publisher sets
`EVIDENCE_REF`in its own`env:`; six calls). This reporter publishes from dev's code
(`workflow_run`runs the default branch's workflow and it checks out`ref: dev`), so a lane's
`ci-status.md`and`guards-last-failure.md` reach its branch folder from the first run after this
change merges; ci.yml's and the lanes' files move at once, from the pull request's own code.

## A docs-only push (DEC-365, housekeeping turn 3)

The reporter reads the log of the `Scope (docs-only push, DEC-365)` job for its
`DEC-365 lanes: <line>` and writes `- Lanes: <line>` under the run's URL. When the line says
`skipped — docs-only push; …` (the commit whose lanes were green and its run), the skipped
`E2E lanes` and `First-paint bundle budget (gzipped ceiling)` rows read `skipped (docs-only)`. A
scope log that cannot be read is written as `- Lanes: unknown — …` and the rows stay `skipped`.
The words show from the first run after the change merges (the reporter runs dev's code).

## guards-last-failure.md (DEC-066)

So a red build or guard never needs a log paste, the reporter downloads the log of
**every failed job whose name does not match `/^E2E (email|lanes)/`** — the staging
`E2E email` job and `E2E lanes / Lane … on temporary Supabase` (including its
reporting summary) — because those are the E2E
failure reporter's own sources and two copies of one failure would disagree.
The lanes are nineteen since DEC-283: the eighteen and `repeat` (`E2E lanes / Lane
repeat on temporary Supabase`), which repeats the push's changed specs; its results
are the reporter's source `repeat`, read like a numbered lane's.

Per failed job it writes two blocks:

- **Evidence lines** — every line matching
  `error TS\d+ | [warn] | ✖ | ##[error] | ERROR | Error: | FAIL | failed | exit code [1-9]`,
  and every ESLint error line (` N:N  error  …`) with the file line above it (INC-419,
  DEC-179), capped at 80 lines, ISO log timestamps stripped.
- **Tail** — the last 60 lines of the log.

**Warnings (INC-492, DEC-180).** After the header, every file carries
`## Warnings (non-gating steps that ran, INC-492)`: each step of this run whose name
starts with `Warn: ` and that ran, as `- <job> › <step>`, read from the jobs' own step
list, or `No warning step ran in this run.` A `Warn: ` step runs only when something
non-gating went wrong (today: the Semgrep job's failed SARIF upload), so its job stays
green and the failed-job list never shows it.

The file is written on **every** completed run: with no failures it says
`No failed build/guard jobs in this run.`, so a stale file is always visible as a stale
run URL rather than as silence. The header carries the run URL, commit SHA, run attempt
and the UTC write time, and is labelled `PLATFORM-ORIGIN?` when the head commit message
is "Lovable update" or "Work in progress" — the same rule the E2E reporter uses.

**Self-report law.** A log download that fails is recorded as
`log unavailable: <message>` for that job. The reporter reports its own gaps; it never
drops a failed job silently.

**Extract-only (pre-committed rule, DEC-066).** The reporter changes no guard, no
verdict, no gate and never the promote job. When the evidence regex misses a failure's
true lines the tail still carries them, and the regex is widened by INC — never
silently. The whole file stays under 400 lines; tails are truncated first, evidence
lines never.

## Loop safety (three independent guards)

1. The reporter triggers only on `workflow_run`, never on push — its own commit
   cannot re-trigger it.
2. ci.yml's push trigger `paths-ignore` lists both docs/tracking/ci-status.md and
   docs/tracking/guards-last-failure.md, so the status commit does not start a CI run.
3. The status commit message carries `[skip ci]`.

Any one of these would break the cycle; all three are present.

## How the supervisor uses it

docs/tracking/ci-status.md is the PRIMARY CI check, read on every verification clone.
Because the status commit is itself paths-ignored, the file always lags HEAD by that
commit. The check is therefore two steps:

1. Read the conclusion.
2. Confirm the reported SHA is the newest NON-status commit in the clone.

A SHA mismatch means the file is stale (see limitations) and the GitHub Actions API
or an operator glance is the fallback. A FAILURE conclusion is a DRIFT-class event
that jumps the queue.

Reading order on a red run:

1. docs/tracking/ci-status.md — the conclusion, plus the two-step SHA check above.
2. docs/tracking/e2e-last-failure.md — for a failed Playwright job.
3. docs/tracking/guards-last-failure.md — for every other failed job (build,
   typecheck, lint, format, guards, migration checks).

## Before the push: `bun run checks` (CI-2)

`bun run checks` (`scripts/ci/turn-checks.sh` → `scripts/ci/turn-checks.ts`) runs, before a push, every
CI step that needs no backend: it reads `.github/workflows/ci.yml` itself and runs each job's `run:`
steps in CI's order with their own env and deadline, so actionlint, gitleaks and semgrep come from the
versions and checksums ci.yml pins (downloads cached under `~/.cache/ethio-checks`, never committed).
It never stops at a FAIL; inside a job a failed step ends that job, as in CI.

- One line per step: `PASS`, `FAIL` or `NOT RUN` with its reason; the last line
  `checks: N PASS · N FAIL · N NOT RUN · Ns`. Scanner output stays in the step's log (counts only).
- Steps it does not run are lines of `scripts/ci/turn-checks-allowlist.txt` (`job › step | reason |
until`): the installs, the SARIF upload, the dependency audit, the staging preflight, the E2E merge
  and promote.
- Typecheck is the platform harness's verdict (`/tmp/observability/build-errors.log`): PASS only when
  newer than every change under src/, e2e/ and scripts/ with no error; otherwise NOT RUN.
- A pinned download or checksum that fails is NOT RUN; no unpinned stand-in.
- A pinned binary built for another machine is NOT RUN before any download, with the reason
  `pinned binary <platform/arch> (<asset>); this machine <platform/arch>`: the asset's name is read from
  the step's own text (`tarball="…"` or the `releases/download/…` address); a name the reader cannot
  classify is NOT RUN `pinned asset platform unknown: <name>` (INC-1094). A Linux arm64 or Windows
  executor needs a row in the two platform tables in turn-checks.ts, nothing else.
- `bun run checks --no-tests` runs every guard and scanner and no vitest or playwright step: those
  print NOT RUN `--no-tests`, and the last line says so (INC-1064). Any other argument is refused.
- The laws step's Semgrep on changed files (`scripts/ci/laws-changed.ts`) keeps CI's pinned rules
  and its venv under the same cache root (`scripts/ci/checks-cache.ts`, never /tmp, which the machine
  sweeps); the rules count as cached only when `javascript/` and `typescript/` each hold a `.yaml`
  (`semgrepRulesWhole`), otherwise the archive is fetched again (INC-1098).
- The NEAR band (DEC-361): after the budget check, a NOTE for every size inside DEC-296's one band
  (`scripts/budget-band.mjs`, the local allowance included), with its growth against the turn's base
  build (HEAD's tree, built once per base and cached). A budget step whose only failure is that band
  is a PASS: CI's bundle-budget job judges, and a line moves only with a named cause.
- Guard: `scripts/ci/turn-checks.test.ts` TCK-1…10.

## Known limitations

- The reporter does not report its own health. If its job fails, ci-status.md keeps
- Both tracking files are machine-owned and prettier-exempt (INC-011, DEC-066). Never
  hand-edit them.
  mandatory rather than optional.
- It checks out main and pushes to main with no rebase or retry; a commit landing in
  between causes a non-fast-forward push failure and a stale file.
- `permissions: contents: write` is repo-wide for the job's token. The write is
  confined to the two tracking files by the workflow staging only those paths, i.e. by
  convention rather than by permission.
- Both tracking files are machine-owned and prettier-exempt (INC-011, DEC-066). Never
  hand-edit them.
- guards-last-failure.md carries an extract, not the whole log: the 400-line budget
  truncates tails. The run URL in the header is the full record.

## Scope note

ci.yml's five jobs are untouched by the reporter. Its per-job table therefore has
five rows; format:check and the bundle report are steps inside "Build, typecheck,
lint", not separate jobs.
