# CI Status Reporter

Makes CI results readable from the repo itself, so the supervisor's fresh clone
carries CI state without an authenticated GitHub API call.

## How it works

.github/workflows/ci-status-report.yml triggers on `workflow_run: completed` of the
"CI" workflow. It reads that finished run's conclusion and per-job results and writes
docs/tracking/ci-status.md: commit SHA, overall conclusion, per-job table, UTC
completion timestamp, and the run URL. It then commits that one file to main.

## Loop safety (three independent guards)

1. The reporter triggers only on `workflow_run`, never on push — its own commit
   cannot re-trigger it.
2. ci.yml's push trigger carries `paths-ignore: ['docs/tracking/ci-status.md']`, so
   the status commit does not start a CI run.
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

## Known limitations

- The reporter does not report its own health. If its job fails, ci-status.md keeps
  showing the last successful reading, which is why the SHA cross-check above is
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
