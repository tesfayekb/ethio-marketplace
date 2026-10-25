# Executor kit v1.1 — the permission list matches the protocol, a STOP before Part A may end, a held turn parks on the session's branch, the self-test runs the real git (INC-882, INC-881; DEC-255)

```text
BRIEF — executor kit v1.1. Base: dev 37f691b44c344e2162db888d84d849cca48e6556. Tier B (configuration, the executor's hooks, one conformance test and docs; no app code, no migration, no string, no package).
BASE: 37f691b44c344e2162db888d84d849cca48e6556
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
.claude/hooks/bash-guard.ts
.claude/hooks/land.ts
.claude/hooks/lib.ts
.claude/hooks/session-setup.ts
.claude/hooks/stop-gate.ts
.claude/rules/00-executor-protocol.md
.claude/settings.json
docs/features/executor.md
scripts/conformance/executor-hooks.test.ts
docs/governance/mechanisms.md
docs/_changelog.md
docs/governance/briefs/executor-kit-v1.1.md
roadmap.md
SCOPE-END

THE SYSTEM (G0)
CONCERN: an executor's work reaches dev only inside its brief's scope, with its checks green and its report written — and every command the protocol requires is allowed by every layer that judges it.
MECHANISM: register row 37 (installed at 37f691b4): CLAUDE.md + .claude/rules/; .claude/hooks/ (scope-guard, bash-guard, land.ts, stop-gate, header, session-setup, post-edit over lib.ts); .claude/settings.json.
CONSUMERS: Claude Code sessions on this repository. The first one (the executor smoke, 2026-10-25) stopped at its first step: the permission list denied the switch to dev (rule `Bash(git switch dev*)`) and the fast-forward catch-up from origin/dev (the blanket merge rule) — a deny outranks an allow — and the Bash guard refused the switch when followed by `2>&1`; the stop gate then refused three times although nothing of the turn existed. Lovable's agent is not a consumer.
COVERED HERE: the permission list (two denies removed; narrow denies for the merge and switch forms that stay forbidden); the guard (descriptor redirections after `git switch dev` and the catch-up merge; `/dev/null` is not a write); the stop gate (off dev with nothing of the turn on it may end); the landing door (a held turn parks on the session's own branch when the session's git refuses hold/*); the session setup (records that branch); the protocol's Part A sentence; the self-test with the real git (INC-881). LEFT: none.
CONFORMANCE GUARD: scripts/conformance/executor-hooks.test.ts — NEW EXH-16 runs every command the protocol requires through both layers (the permission rules as Claude Code reads them, and the Bash guard) and the forbidden ones through the rules alone; proven red on the v1 permission list ("git switch dev → part "git switch dev" is DENIED by Bash(git switch dev*)") and green on v1.1. NEW EXH-17 (an origin that accepts only claude/* branches: the door parks on the recorded session branch, never on any other name) and EXH-18 (the setup records the session branch). EXH-14 extended. 19 tests in the file.
EXCEPTIONS: none.
FIVE LENSES — security: no deny that guards a forbidden act is dropped without a narrower one in its place, and EXH-16 asserts the forbidden commands stay denied by the rules alone · performance: about one second more of component tests · failure modes: a turn that cannot land is parked where the session's git allows, and a STOP before any change no longer loops · consistency: the protocol, the permission list and the guard agree, and a test now holds them together · future growth: a new required command is one line in EXH-16's list.
FORWARD-SCAN: the executor smoke runs again on this kit, then Foundations turn 19. REGISTER: row 37, its guard column EXH-0…18.

WHY
- The first live session proved the guard rails refuse — and found that two of the kit's own permission rules refused the protocol's first git step.

HOW TO WORK
- This turn changes no app code. It installs nine files byte for byte from the attached archive, overwriting the installed versions of exactly those nine; you never retype a kit file.
- Read CI first at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md (first six lines). A red that is not yours is named in the report, not fixed here.
- Scope: only the paths in the SCOPE block. Nothing else changes.
- STOP and report (do not improvise) if: the attachments cannot be reached as files; the archive's sha256 differs; tar is missing; a check below fails for a reason you cannot fix inside scope.
- Checks before the report: bunx vitest run scripts/conformance/executor-hooks.test.ts scripts/conformance/wired.test.ts — run it plainly this time, with no PATH prefix: the test now finds the real git itself (INC-881) · bunx eslint .claude/hooks scripts/conformance/executor-hooks.test.ts · bun run format:check (LAST).

STEP 0 — save this brief and the archive
1. Copy the two attached files from your uploads with your file-copy tool — never by retyping:
   - executor-kit-v1.1.md → docs/governance/briefs/executor-kit-v1.1.md
   - executor-kit-v1.1.tar.gz → executor-kit-v1.1.tar.gz (the repository root; .gitignore already ignores /executor-kit-*.tar.gz)
2. Run: sha256sum executor-kit-v1.1.tar.gz — it must print fa4369e1e9562c8ce018aa414f41d43353f47f9530f82543c6c9518569f5c5cf. A different value is a STOP (paste it).
3. roadmap.md line 3: replace exactly this text
   docs/governance/briefs/executor-kit-install.md (the executor kit install: Claude Code's rulebook, guard rails and landing door — DEC-255)
   with
   docs/governance/briefs/executor-kit-v1.1.md (executor kit v1.1: the permission list matches the protocol — INC-882, INC-881; DEC-255)
   Everything else on line 3 stays as it is.

PART A — unpack
4. Run: tar -xzf executor-kit-v1.1.tar.gz — it overwrites exactly the nine files in the SCOPE block's first nine lines and writes nothing else.
5. Run: rm executor-kit-v1.1.tar.gz
6. Paste the output of:
   sha256sum CLAUDE.md .mcp.json docs/features/executor.md scripts/conformance/executor-hooks.test.ts $(find .claude -type f | sort)
   — 23 lines; the supervisor compares every line with its own copy.

PART B — the records (exact text)
7. docs/governance/mechanisms.md, the row that begins "| 37 |": replace exactly `scripts/conformance/executor-hooks.test.ts` EXH-0…15 with `scripts/conformance/executor-hooks.test.ts` EXH-0…18 (the backticks stay as they are; nothing else in the row changes).
8. docs/_changelog.md: append at the end, after one blank line:

- Executor kit v1.1 (2026-10-25, INC-882, INC-881) — the permission list no longer denies the protocol's switch to dev and its fast-forward catch-up from origin/dev (narrow denies keep the other forms forbidden); the Bash guard accepts descriptor redirections there and treats `/dev/null` as no write; the stop gate lets a STOP before Part A end; a held turn parks on the session's own branch when the session's git refuses hold/*; the session setup records that branch; EXH-16 runs every required command through both layers, EXH-17 and EXH-18 are new; the self-test runs the real git. No app code changed.

9. roadmap.md: insert this line directly after the line that begins "  - [x] Executor kit install (":

  - [x] Executor kit v1.1 (docs/governance/briefs/executor-kit-v1.1.md; no migration; no string; INC-882, INC-881) — the permission list matches the protocol (EXH-16), a STOP before Part A may end, a held turn parks on the session's branch when hold/* is refused (EXH-17, EXH-18), the self-test runs the real git. No app code changed.

PART C — the checks, then the report
10. bunx vitest run scripts/conformance/executor-hooks.test.ts scripts/conformance/wired.test.ts — plainly, no PATH prefix; paste the count lines (expected: 2 files, 21 passed). If it fails in beforeAll only because of this sandbox's git, paste that failure, then run it once more with PATH="/bin:$PATH" and paste both results.
11. bunx eslint .claude/hooks scripts/conformance/executor-hooks.test.ts — paste the result (expected: no output).
12. bun run format:check — LAST; paste the last line.
13. Report: the file list from git diff --name-only 37f691b44c344e2162db888d84d849cca48e6556; the 23 sha256 lines of step 6; the three check results; CI's first six lines; anything you could not do. End the turn.
```
