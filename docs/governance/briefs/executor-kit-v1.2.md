# Executor kit v1.2 — the session setup brings local dev level and proves the browser, the header follows the protocol, forced fetches refused (INC-883, INC-884, INC-881; DEC-255)

```text
BRIEF — executor kit v1.2. Base: dev 1993fbf62b1fef0e4054d09b4528001f53f0a4c7 (the executor smoke's landing — the first Claude Code landing). Tier B (configuration, the executor's hooks, one conformance test and docs; no app code, no migration, no string, no package).
BASE: 1993fbf62b1fef0e4054d09b4528001f53f0a4c7
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
.claude/hooks/bash-guard.ts
.claude/hooks/header.ts
.claude/hooks/session-setup.ts
.claude/rules/00-executor-protocol.md
.claude/settings.json
docs/features/executor.md
scripts/conformance/executor-hooks.test.ts
docs/governance/mechanisms.md
docs/_changelog.md
docs/governance/briefs/executor-kit-v1.2.md
roadmap.md
SCOPE-END

THE SYSTEM (G0)
CONCERN: an executor's session starts every turn on origin/dev's rules with a working environment — and says only what its checks proved.
MECHANISM: register row 37: .claude/hooks/session-setup.ts (the session's start), header.ts (the standing header), bash-guard.ts, .claude/settings.json, .claude/rules/00-executor-protocol.md.
CONSUMERS: Claude Code sessions on this repository. The second smoke session started with a stale local dev (a snapshot from the first session): checking it out put old kit files on disk and the old permission rule returned (INC-883). The third smoke landed on dev (1993fbf6) but could not run its browser test: the setup installed only the Chromium headless shell while the harness's guard (scripts/e2e-browser-guard.ts) resolves the full Chromium, and the setup reported "installed" without checking (INC-884). The header computed its SESSION line from stale refs, and its law 7 still said "apply NOTHING" while 30-migrations.md has the executor apply on production when told. Lovable's agent is not a consumer.
COVERED HERE: session-setup.ts — fetch, then bring local dev up to origin/dev as a fast-forward before the executor can check it out (never forced; a local dev with its own commits is named, not touched), the SESSION and CI lines after the fetch, and the browser the guard resolves installed as CI does and checked again (the note reports the check, not the installer); header.ts — law 7 as 30-migrations.md says, no SESSION line at a cloud session's start (the setup prints it), the "not on dev" hint; bash-guard.ts and settings.json — forced fetches refused, the Supabase refusal's words; 00-executor-protocol.md Part A — the fast-forward fetch before the switch; the self-test hermetic (INC-881: the system git configuration ignored, the cloud-session flag cleared). LEFT: none.
CONFORMANCE GUARD: scripts/conformance/executor-hooks.test.ts — NEW EXH-19 (a stale local dev is brought level; a local dev with its own commits is left and named), EXH-4 (forced fetches refused), EXH-8 (a cloud session's start has no SESSION line in the header; law 7's words), EXH-16 (the fast-forward fetch passes both layers; a forced fetch is denied by the rules), EXH-18 (the SESSION line after the fetch). EXH-19 and the forced-fetch refusals proven red on v1.1 and green on v1.2. 20 tests in the file.
EXCEPTIONS: none.
FIVE LENSES — security: the only branch the setup moves is local dev, as a fast-forward; a forced refspec is refused by both layers · performance: a fetch at session start (seconds); the full Chromium download once per environment · failure modes: a failed fetch, a refused fast-forward and a missing browser are each reported to the executor in words that tell it to STOP or to name the limit — never a success the check did not see · consistency: the header, the protocol, the setup and the permission rules say the same thing about Part A and migrations · future growth: the work branch stays one constant (WORK_BRANCH).
FORWARD-SCAN: Foundations turn 19 is the next brief and the first app-code turn of this executor. REGISTER: row 37, its guard column EXH-0…19.

WHY
- The two smoke sessions after v1.1 found the remaining gaps between a fresh cloud session and the protocol; the fixes are code in the session's start, not instructions in a brief.

HOW TO WORK
- This turn changes no app code. It installs seven files byte for byte from the attached archive, overwriting the installed versions of exactly those seven; you never retype a kit file.
- Read CI first at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md (first six lines). A red that is not yours is named in the report, not fixed here.
- Scope: only the paths in the SCOPE block. Nothing else changes.
- STOP and report (do not improvise) if: the attachments cannot be reached as files; the archive's sha256 differs; tar is missing; a check below fails for a reason you cannot fix inside scope.
- Checks before the report: bunx vitest run scripts/conformance/executor-hooks.test.ts scripts/conformance/wired.test.ts — plainly, with no environment prefix: the test now sets its own git environment (INC-881) · bunx eslint .claude/hooks scripts/conformance/executor-hooks.test.ts · bun run format:check (LAST).

STEP 0 — save this brief and the archive
1. Copy the two attached files from your uploads with your file-copy tool — never by retyping:
   - executor-kit-v1.2.md → docs/governance/briefs/executor-kit-v1.2.md
   - executor-kit-v1.2.tar.gz → executor-kit-v1.2.tar.gz (the repository root; .gitignore already ignores /executor-kit-*.tar.gz)
2. Run: sha256sum executor-kit-v1.2.tar.gz — it must print 6b0a30d3153d246efa8bdfcfcfdbe0d896f9716fc43041d8af5d4bc49899efc5. A different value is a STOP (paste it).
3. roadmap.md line 3: replace exactly this text
   docs/governance/briefs/executor-smoke.md (the first Claude Code turn: setup, guard rails and landing proven live — DEC-255)
   with
   docs/governance/briefs/executor-kit-v1.2.md (executor kit v1.2: the session setup brings local dev level and proves the browser — INC-883, INC-884, INC-881; DEC-255)
   Everything else on line 3 stays as it is.

PART A — unpack
4. Run: tar -xzf executor-kit-v1.2.tar.gz — it overwrites exactly the seven files in the SCOPE block's first seven lines and writes nothing else.
5. Run: rm executor-kit-v1.2.tar.gz
6. Paste the output of:
   sha256sum CLAUDE.md .mcp.json docs/features/executor.md scripts/conformance/executor-hooks.test.ts $(find .claude -type f | sort)
   — 23 lines; the supervisor compares every line with its own copy.

PART B — the records (exact text)
7. docs/governance/mechanisms.md, the row that begins "| 37 |": replace exactly `scripts/conformance/executor-hooks.test.ts` EXH-0…18 with `scripts/conformance/executor-hooks.test.ts` EXH-0…19 (the backticks stay as they are; nothing else in the row changes).
8. docs/_changelog.md: append at the end, after one blank line:

- Executor kit v1.2 (2026-10-25, INC-883, INC-884, INC-881) — a cloud session's start fetches and brings a stale local dev up to origin/dev as a fast-forward before the executor can check it out (never forced; a local dev with its own commits is named), prints the SESSION and CI lines after the fetch, and makes sure the browser the harness's guard resolves exists (installed as CI does, then checked again — the note reports the check); the standing header's law 7 follows 30-migrations.md; forced fetches are refused by the guard and the rules; Part A names the fast-forward fetch; EXH-19 is new; the self-test sets its own git environment. No app code changed.

9. roadmap.md: insert this line directly after the line that begins "  - [x] Executor smoke (":

  - [x] Executor kit v1.2 (docs/governance/briefs/executor-kit-v1.2.md; no migration; no string; INC-883, INC-884, INC-881) — the session setup brings local dev level and proves the browser (EXH-19), the header follows the protocol, forced fetches refused, the self-test hermetic. No app code changed.

PART C — the checks, then the report
10. bunx vitest run scripts/conformance/executor-hooks.test.ts scripts/conformance/wired.test.ts — plainly; paste the count lines (expected: 2 files, 22 passed). If it fails in this sandbox, paste the failure as it is and say which test; do not add an environment prefix to make it pass.
11. bunx eslint .claude/hooks scripts/conformance/executor-hooks.test.ts — paste the result (expected: no output).
12. bun run format:check — LAST; paste the last line.
13. Report: the file list from git diff --name-only 1993fbf62b1fef0e4054d09b4528001f53f0a4c7; the 23 sha256 lines of step 6; the three check results; CI's first six lines; anything you could not do. End the turn.
```
