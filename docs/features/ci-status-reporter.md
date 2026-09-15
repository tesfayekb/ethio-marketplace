# CI Status Reporter

Makes CI results readable from the repo itself, so the supervisor's fresh clone
carries CI state without an authenticated GitHub API call.

## How it works

.github/workflows/ci-status-report.yml triggers on `workflow_run: completed` of the
"CI" workflow. It reads that finished run's conclusion and per-job results and writes
docs/tracking/ci-status.md: commit SHA, overall conclusion, per-job table, UTC
completion timestamp, and the run URL. In the same step it also writes
docs/tracking/guards-last-failure.md (below). Both files land in one `[skip ci]`
commit on dev (DEC-020), regenerated after every `git reset --hard origin/dev` inside
the push retry loop.

## guards-last-failure.md (DEC-066)

So a red build or guard never needs a log paste, the reporter downloads the log of
**every failed job whose name is not one of the four Playwright families** — `E2E smoke
tier`, `E2E shard N/M`, `E2E email`, `E2E changed specs` — because those are the E2E
failure reporter's own sources and two copies of one failure would disagree.

Per failed job it writes two blocks:

- **Evidence lines** — every line matching
  `error TS\d+ | [warn] | ✖ | ##[error] | ERROR | Error: | FAIL | failed | exit code [1-9]`,
  capped at 80 lines, ISO log timestamps stripped.
- **Tail** — the last 60 lines of the log.

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

## Known limitations

- The reporter does not report its own health. If its job fails, ci-status.md keeps
- Both tracking files are machine-owned and prettier-exempt (INC-011, DEC-066). Never
  hand-edit them.
  mandatory rather than optional.
- It checks out main and pushes to main with no rebase or retry; a commit landing in
  between causes a non-fast-forward push failure and a stale file.
- `permissions: contents: write` is repo-wide for the job's token. The write is
  confined to one file by the workflow staging only that path, i.e. by convention
  rather than by permission.
- The file is machine-owned and prettier-exempt (INC-011). Never hand-edit it.

## Scope note

ci.yml's five jobs are untouched by the reporter. Its per-job table therefore has
five rows; format:check and the bundle report are steps inside "Build, typecheck,
lint", not separate jobs.
