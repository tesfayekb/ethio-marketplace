STOP — executor smoke part A: the Part A fast-forward of dev is refused by the permission rules
DONE: none (Part A stopped at A1; STEP 0 not started; no brief saved, no roadmap line changed)
LEFT: Part A (A1 fast-forward, A2, A3), STEP 0, parts B, C, D, E
CI: (two-step read: the reported commit is 37f691b, not BASE 22584e33 — the run on 22584e33 has not completed)
# CI Status (auto-generated — do not edit by hand)

- Commit: `37f691b44c344e2162db888d84d849cca48e6556` (short `37f691b`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-25T09:38:47Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40180337027
FILES: `git diff --name-only 22584e336b7e54f79e9c28108934c697809c076c` at local dev 37f691b (the
difference is the v1.1 landing local dev never received, not work of this turn):
.claude/hooks/bash-guard.ts
.claude/hooks/land.ts
.claude/hooks/lib.ts
.claude/hooks/session-setup.ts
.claude/hooks/stop-gate.ts
.claude/rules/00-executor-protocol.md
.claude/settings.json
docs/_changelog.md
docs/features/executor.md
docs/governance/briefs/executor-kit-v1.1.md
docs/governance/mechanisms.md
roadmap.md
scripts/conformance/executor-hooks.test.ts
plus this file, docs/governance/reports/executor-smoke.stop-1.md.

## What happened (commands and their output, in order)

1. The session started on `claude/wonderful-mccarthy-wsvkkl` at 22584e3 (header: "SESSION (startup):
   branch claude/wonderful-mccarthy-wsvkkl at 22584e3; origin/dev 37f691b; unlanded commits: 6").
   The clone's local `dev` branch pointed at 37f691b (pre-v1.1).
2. `git fetch origin dev main ci-evidence` → `37f691b..22584e3  dev -> origin/dev`.
   `git switch dev` → `Switched to branch 'dev'` / `Your branch is behind 'origin/dev' by 6 commits,
   and can be fast-forwarded.` `git status -sb | head -1` → `## dev...origin/dev [behind 6]`.
   `git rev-parse HEAD origin/dev origin/main` →
   `37f691b44c344e2162db888d84d849cca48e6556` / `22584e336b7e54f79e9c28108934c697809c076c` /
   `37f691b44c344e2162db888d84d849cca48e6556`.
   `git rev-list --count origin/dev..HEAD` → `0`; `git status --short | wc -l` → `0`.
3. A compound line beginning `git rev-list --count origin/dev..HEAD && git merge --ff-only origin/dev
   2>&1 | tail -3; …` was refused by the Bash guard hook, word for word:
   `PreToolUse:Bash hook error: [bun "$CLAUDE_PROJECT_DIR"/.claude/hooks/bash-guard.ts]: BASH GUARD
   (.claude/hooks/bash-guard.ts): refused — the only merge is catching up a clean dev with git merge
   --ff-only origin/dev at Part A; if dev moved during the turn, STOP (the supervisor re-bases the
   brief) — never merge.` (Its pattern accepts `git merge --ff-only origin/dev` only when followed by
   end of command, `;`, `&` or `|`; the `2>&1` redirect made the line a refused merge.)
4. The protocol's exact command alone, `git merge --ff-only origin/dev`, was refused by the
   permission rules, word for word:
   `Permission to use Bash with command git merge --ff-only origin/dev has been denied.`
   No other spelling was tried.

## Cause (read from the files, not changed)

`git switch dev` checked out local dev at 37f691b, which put the pre-v1.1 `.claude/settings.json` on
disk, and the session's permission rules follow that file. At 37f691b the deny list holds
`"Bash(git merge *)"` (line 66), which matches `git merge --ff-only origin/dev` and wins over the
allow line `"Bash(git merge --ff-only origin/dev)"` (line 46) — the INC-882 defect that v1.1 fixed.
`git diff HEAD origin/dev -- .claude/settings.json` shows v1.1 removed `"Bash(git merge *)"` and
`"Bash(git switch dev*)"` from deny. So a session whose clone holds a stale local `dev` falls back to
the old rules at the first `git switch dev`, and the Part A fast-forward cannot run: the v1.1 fix
reaches a session only when local dev already contains v1.1. The hooks on disk
(`.claude/hooks/*.ts`) are likewise the 37f691b versions from that point on.

## The question

Part A cannot catch local dev up to BASE in this session, and the rules forbid every other way
(reset, branch re-creation, merge). No brief was saved and nothing of this turn was built. How should
the session reach a local dev at 22584e33 — a fresh session whose clone's dev is current, or a ruling?
This commit sits on local dev at 37f691b, so land.ts is expected to HOLD it (dev is behind origin/dev).
