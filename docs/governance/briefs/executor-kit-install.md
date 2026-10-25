# Executor kit install — Claude Code's rulebook, guard rails and landing door (DEC-255)

```text
BRIEF — executor kit install. Base: dev faad276660b3210c3793e52d2a05abc69d2be20c. Tier B (docs, configuration and one conformance test; no app code, no migration, no string, no package).
BASE: faad276660b3210c3793e52d2a05abc69d2be20c
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
.gitignore
CLAUDE.md
.mcp.json
.claude/**
scripts/conformance/executor-hooks.test.ts
docs/features/executor.md
docs/governance/mechanisms.md
docs/_changelog.md
docs/governance/briefs/executor-kit-install.md
roadmap.md
SCOPE-END

THE SYSTEM (G0)
CONCERN: an executor's work reaches dev only inside its brief's scope, with its checks green and its report written — enforced by code, whatever the executor says.
MECHANISM: NONE YET — built here (from the supervisor's archive, byte for byte): CLAUDE.md + .claude/rules/00…60 (the rulebook), .claude/hooks/ (scope-guard, bash-guard, land.ts — the landing door, stop-gate, header, session-setup, post-edit, over lib.ts), .claude/settings.json (permissions; hook wiring with onFailure "block"), .claude/agents/reviewer.md, .claude/skills/start-turn and turn-report, .mcp.json (the production migration tool, behind the operator's approval) — to the Claude Code hooks and permissions reference and OWASP LLM Top 10 LLM06 (excessive agency) and LLM01 (prompt injection).
CONSUMERS (grep of faad2766): Claude Code sessions on this repository (new; none today). Lovable's agent is not a consumer: it follows AGENTS.md and its project knowledge, and CLAUDE.md's first lines say so. CI: scripts/**/*.test.ts are in vitest's include, so the self-test runs in component-tests.
COVERED HERE: all of it. LEFT: none.
CONFORMANCE GUARD: scripts/conformance/executor-hooks.test.ts EXH-0…15 — runs every hook on planted bad input in scratch repositories (bypass spellings, out-of-scope edits and shell writes, unlanded turns, missing reports, broken flags, undeclared deletions, a red check, dev moving under a turn); no allowlist; lands in this turn.
EXCEPTIONS: none.
FIVE LENSES — security: hooks fail closed (onFailure "block"); the permission deny-list is a second layer; the landing door checks the diff, not the spelling; no secret in any file (the production token is an environment variable the operator sets, read only by .mcp.json's server, whose apply asks the operator every time) · performance: no app code; the self-test adds about five seconds to component-tests · failure modes: a crashed hook refuses; the stop gate gives up after three refusals and says so; when dev moves the door parks commits on hold/<brief> instead of merging · consistency: one landing door, one scope decision (lib.ts scopeVerdict) for edits, shell writes and landings · future growth: the work branch is one constant (WORK_BRANCH), a flag is one list entry (KNOWN_FLAGS), the standing allowance is one list.
FORWARD-SCAN: turn 19 is the first consumer (its brief carries BASE/FLAGS/SCOPE) · REGISTER: row 37 added here.

HOW TO WORK
- This turn changes no app code. It installs files byte for byte from the attached archive; you never retype a kit file.
- Read CI first at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md (first six lines). A red that is not yours is named in the report, not fixed here.
- Scope: only the paths in the SCOPE block. Nothing else changes.
- STOP and report (do not improvise) if: the attachments cannot be reached as files; the archive's sha256 differs; tar is missing; a check below fails for a reason you cannot fix inside scope.
- Checks before the report: bunx vitest run scripts/conformance/executor-hooks.test.ts scripts/conformance/wired.test.ts · bunx eslint .claude/hooks scripts/conformance/executor-hooks.test.ts · bun run format:check (LAST).

STEP 0 — save this brief and the archive
1. Append these lines, exactly, at the end of .gitignore (so nothing of the kit's working state, and not the archive, can ever be committed):

# Claude Code executor (DEC-255): per-session state and personal settings, never committed
.claude/turn/
.claude/settings.local.json
# the kit archive while it is unpacked (executor-kit install)
/executor-kit-*.tar.gz

2. Copy the two attached files from your uploads with your file-copy tool — never by retyping:
   - executor-kit-install.md → docs/governance/briefs/executor-kit-install.md
   - executor-kit-v1.tar.gz → executor-kit-v1.tar.gz (the repository root; .gitignore now ignores it)
3. Run: sha256sum executor-kit-v1.tar.gz — it must print 9aa5595ded183fb9b9415bb8130822a75c55dc4b8d91149f605517b4cd934d7d. A different value is a STOP (paste it).
4. roadmap.md line 3: replace exactly this text
   docs/governance/briefs/foundations-turn-18.md (the Foundations bundle, turn 18: category images onto aiCall and defineRoute; browser calls onto callRoute)
   with
   docs/governance/briefs/executor-kit-install.md (the executor kit install: Claude Code's rulebook, guard rails and landing door — DEC-255)
   Everything else on line 3 stays as it is.

PART A — unpack the kit
5. Run: tar -xzf executor-kit-v1.tar.gz — it writes 23 files at their repository paths (CLAUDE.md, .mcp.json, .claude/…, scripts/conformance/executor-hooks.test.ts, docs/features/executor.md) and overwrites nothing that exists today.
6. Run: rm executor-kit-v1.tar.gz
7. Paste the output of:
   sha256sum CLAUDE.md .mcp.json docs/features/executor.md scripts/conformance/executor-hooks.test.ts $(find .claude -type f | sort)
   — 23 lines; the supervisor compares every line with its own copy.

PART B — the records (exact text)
8. docs/governance/mechanisms.md: insert this row as a new line directly after the row that begins "| 36 |":

| 37 | An executor's work reaches `dev` only inside its brief's scope, with its checks green and its report written (DEC-255) | `.claude/hooks/land.ts` (the landing door) + `scope-guard.ts`, `bash-guard.ts`, `stop-gate.ts`, `header.ts`, `session-setup.ts`, `post-edit.ts` over `lib.ts`; `.claude/settings.json` (permissions; hook wiring with `onFailure: "block"`); `CLAUDE.md` + `.claude/rules/00…60` | `scripts/conformance/executor-hooks.test.ts` EXH-0…15 | none | a second work branch is one constant (`WORK_BRANCH`); a new brief flag is one list entry (`KNOWN_FLAGS`); the standing allowance is one list | Claude Code sessions only; Lovable's agent follows `AGENTS.md` |

9. docs/_changelog.md: append at the end, after one blank line:

- Executor kit (2026-10-25, DEC-255) — Claude Code can be the executor beside Lovable: `CLAUDE.md` and `.claude/rules/` (the rulebook), `.claude/hooks/` (scope guard, bash guard, the landing door `land.ts`, stop gate, standing header, session setup, post-edit), `.claude/settings.json`, the reviewer subagent and two skills, `.mcp.json` (the production migration tool, behind the operator's approval); `docs/features/executor.md`; register row 37; self-test EXH-0…15. No app code changed.

10. roadmap.md: insert this line directly after the line that begins "  - [x] Turn 18 (docs/governance/briefs/foundations-turn-18.md":

  - [x] Executor kit install (docs/governance/briefs/executor-kit-install.md; no migration; no string; DEC-255) — Claude Code's rulebook, guard rails, landing door and self-test (EXH-0…15) installed byte for byte from the supervisor's archive; docs/features/executor.md; register row 37. No app code changed.

PART C — the checks, then the report
11. bunx vitest run scripts/conformance/executor-hooks.test.ts scripts/conformance/wired.test.ts — paste the count line (expected: 18 passed).
12. bunx eslint .claude/hooks scripts/conformance/executor-hooks.test.ts — paste the result (expected: no output).
13. bun run format:check — LAST; paste the last line.
14. Report: the file list from git diff --name-only faad276660b3210c3793e52d2a05abc69d2be20c plus git ls-files for the new files; the sha256 lines of step 7; the three check results; CI's first six lines; anything you could not do. End the turn.
```
