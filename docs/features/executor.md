# The Claude Code executor — rulebook, guard rails and landing door (DEC-255)

Since 2026-10-25 a Claude Code session can be the executor of this repository, beside Lovable's agent.
The supervisor writes each brief, starts and drives the session, and verifies the work from a fresh
clone; the operator approves scope, approves every production migration, publishes and walks the
site. Lovable keeps the preview, Publish and hosting, and its agent can still work on `dev` on any
day; its rules stay `AGENTS.md` and its project knowledge.

## What the executor reads

- `CLAUDE.md` (root): the mission, the stack, the fifteen laws in short form, the turn in one line;
  it imports `AGENTS.md` and `docs/conventions.md`.
- `.claude/rules/00-executor-protocol.md` … `60-report.md`: the turn, the code laws by concern, the
  test laws (J1–J9 restated), migrations, CI evidence, security, the report. Claude Code loads them at
  session start and again after compaction.
- The standing header (`.claude/hooks/header.ts`): the twelve laws, the brief in force with its
  `BASE`, `FLAGS`, report paths and `SCOPE`, printed on every prompt and at session start.

## The guard rails (code, not instruction)

| Rail          | Hook                                       | What it does                                                                                                                                                                                                                                                                                                          |
| ------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope guard   | `PreToolUse` Edit/Write → `scope-guard.ts` | refuses any path outside the brief's `SCOPE-BEGIN … SCOPE-END` block and the standing allowance; never a generated file or the rails themselves                                                                                                                                                                       |
| Bash guard    | `PreToolUse` Bash → `bash-guard.ts`        | refuses hand pushes, history rewrites, database commands, direct browser runs, package changes, secret reads, inline scripts, GitHub writes, and shell writes outside scope — read through quotes, heredocs and the documented bypass spellings                                                                       |
| Landing door  | `bun .claude/hooks/land.ts`                | the one way commits reach `dev`: clean tree, `dev` not moved (else the commits are parked on `hold/<brief>`), every landed path in scope, deletions declared, FLAGS held, the report on the last commit, lint → typecheck → unit → i18n maps → build → migration guard → format:check green; then a fast-forward push |
| Stop gate     | `Stop` → `stop-gate.ts`                    | a turn may not end with a dirty tree or unlanded commits; gives up after three refusals and says so                                                                                                                                                                                                                   |
| Session setup | `SessionStart` → `session-setup.ts`        | in a cloud session: `bun install --frozen-lockfile` and the Playwright Chromium shell                                                                                                                                                                                                                                 |
| Post-edit     | `PostToolUse` → `post-edit.ts`             | Prettier and ESLint on the edited file, as advice                                                                                                                                                                                                                                                                     |
| Permissions   | `.claude/settings.json`                    | a second layer under the hooks; web tools off; the production migration tool asks the operator every time                                                                                                                                                                                                             |

Every hook entry that can block carries `onFailure: "block"`: a hook that crashes or times out
refuses rather than lets the action through.

## The brief's machine lines

A brief for the executor carries, inside its fenced block: `BASE: <dev sha>`, `FLAGS:` (any of
`no-migration`, `no-new-string`, `no-package-change`, `no-agents-change`) and a
`SCOPE-BEGIN … SCOPE-END` block of globs. Reports are committed beside it:
`docs/governance/reports/<brief-stem>.stop-<n>.md` at a stop, `<brief-stem>.report.md` at the end.

## Migrations

The executor writes the file and lands it with a MIGRATION stop report. The supervisor applies it on
ethio-staging first and reads back the specific mark; then, on the supervisor's
`apply <fragment> on ethio-prod`, the executor applies it through the `supabase-prod` tool
(`.mcp.json`), which runs only after the operator approves the prompt. `execute_sql` on that server
is denied.

## The proof

`scripts/conformance/executor-hooks.test.ts` (EXH-0…15) runs every hook on planted bad input in
scratch repositories: the bypass spellings, out-of-scope edits and shell writes, unlanded turns,
missing reports, broken flags, undeclared deletions, a red check, `dev` moving under a turn. It runs
in CI's component tests with the rest of `scripts/**/*.test.ts`.
