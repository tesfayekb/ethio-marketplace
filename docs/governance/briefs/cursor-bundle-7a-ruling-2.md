RULING — cursor-bundle-7a, stop 3: the advisor step's file and the answer it reads. Base: cursor/bundle-7a 5383572b6

**MODEL — Claude Sonnet 5.5, in the SAME Cursor chat (it is stopped at STOP 3).**

Save this ruling by scripted copy as `docs/governance/briefs/cursor-bundle-7a-ruling-2.md` (sha256 in the carrier). Your stop is right on both points.

PREVENTION (G70)

- Class 1 — ruling 1, decision 9 named the wrong workflow file: `.github/workflows/ci.yml` for a smoke-lane step. The smoke lane's steps live in `.github/workflows/local-backend-proof.yml` (:656 to :700; `ci.yml:590` only calls it). I named the file from the lane's name, not from a search for where its steps are written (S789).
  - Instructions — in force now: before a ruling widens SCOPE to a workflow file, the supervisor searches for the step's neighbours (`rg -n "matrix.lane == 'smoke'" .github/workflows`) and names the file that holds them.
  - Repository, Cursor rules, Knowledge — not needed. Rule 50 stopped the edit, which is the guard working.
- Class 2 — a step that reads an outside tool's answer was planned before anyone had read that answer's shape.
  - Repository — changed here (decision 3): the reader takes exactly the shape the pinned CLI writes, read from the CLI 2.120.0 bundle's own code. Your final report pastes the first smoke run's lines as the capture.
  - Instructions — in force now: a ruling that adds a step reading an outside tool's output names that output's shape before the step is built, from a real capture or the pinned version's own code.
  - Cursor rules, Knowledge — not needed.

WHAT THE SUPERVISOR READ (CLI 2.120.0, the release binary of `SUPABASE_CLI_VERSION`, `local-backend-proof.yml:13`)

- `supabase db advisors --help`: the flags `--local`, `--db-url`, `--linked`, `--type all|security|performance`, `--level info|warn|error` (default warn), `--fail-on none|info|warn|error` (default none). JSON comes from the global `--output-format text|json|stream-json`. `-o` formats status variables and is not the flag for this command.
- The command's report, in the bundled code:
  - no findings: it writes `No issues found` to stderr, and then `success("db advisors",{results:[]})`;
  - findings: `success("db advisors",{results:e})`.
- The JSON writer: `success:(l,H)=>i({...H,message:l})`, where `i` writes `JSON.stringify(...)` plus a newline to stdout. "Connecting to local database..." goes to stderr.
- So stdout is one line, `{"results":[…],"message":"db advisors"}`. Each finding has `name`, `title`, `level`, `facing`, `categories`, `description`, `detail`, `remediation`, `metadata` (when present) and `cacheKey`. The level filter keeps a finding whose level is at or above `--level`.
- The hosted performance advisor on ethio-staging, read at 18:32Z after your files C and D were applied:
  - no `auth_rls_initplan` and no `duplicate_index`;
  - WARN: `multiple_permissive_policies` 3;
  - INFO: `unindexed_foreign_keys` 59, `unused_index` 8, `no_primary_key` 1, and the hosted-only `auth_db_connections_absolute` 1.
  - So the step should clear both gates on this tree.

DECISIONS

1. SCOPE widens to `.github/workflows/local-backend-proof.yml` for the one step, and to its line in `scripts/conformance/wired.test.ts`.
   - The step goes after "Database security lints (DEC-240)", with its neighbours' `if: matrix.lane == 'smoke' && (matrix.lane != 'repeat' || env.REPEAT_SPECS != '')`.
   - `ci.yml` gets nothing; decision 9's file is corrected here.
   - The `wired.test.ts` line names `bun scripts/ci/advisor-lints.ts` in that workflow, as the `scripts/security-lints.ts` line does. It lands in the same commit as the step.
2. The command: `supabase db advisors --local --workdir .ci-local --type performance --level info --output-format json`.
   - `--workdir .ci-local` is what the workflow's other CLI calls use (:454, :470, :564).
   - stdout goes to a file under `$RUNNER_TEMP`, and `advisor-lints.ts` reads that file. A non-zero exit of the CLI fails the step (it cannot connect, or it cannot read).
   - `--level info`, so every lint's count reaches the log. The two gated lints are WARN.
   - `--fail-on` stays at its default (none). The judge decides.
   - Only counts reach the log; `detail` and `metadata` never do (DEC-310).
3. The reader takes exactly the pinned CLI's shape: a JSON object whose `results` is a list, each entry carrying a non-empty string `name`.
   - Drop the bare-list form and the `lints` form. They were guesses, and `lints` is the hosted API's shape, a different tool. Anything else fails, as now: empty text, text that is not JSON, no `results` list, or an entry with no name.
   - The module comment names CLI 2.120.0 and the two expressions above. It also says a change of `SUPABASE_CLI_VERSION` re-reads the shape (the fail-closed reader will say so on the first run).
   - Fixtures: the test's envelope fixtures follow the quoted expressions, with a comment naming them. This is the source's shape, not a capture (rule 20), so your final report pastes the PR run's smoke-lane `advisors:` lines and the step's duration as the capture.
   - CF-ADVISOR-1a to 1f keep their ids. 1a to 1c and the self-test's planted answers use the `results` envelope. 1d reads the `results` form, the empty one included. 1e adds a bare list and a `lints` object to its refusals.
4. DEC-472's frozen judge stands as ruling 1 wrote it. The first run's line count and seconds start its ten runs.
5. Dev has moved (`1094b3d1b`). Do nothing about it. The pull request's CI builds the merge of your branch with dev, and the supervisor reads the merged tree's guards.
6. Then STEP 4 to STEP 6 as ruling 1 says: `bun run checks` once on the final tree, the self-review, the one push, the report.

NUMBERS ASSIGNED (G66): S789 (the supervisor's). No new INC or DEC.
