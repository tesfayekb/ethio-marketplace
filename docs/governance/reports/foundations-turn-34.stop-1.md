STOP — turn 34 STEP 0: the saved brief's sha256 differs from the carrying message's
DONE: Part A; STEP 0 recorded (brief saved, roadmap.md line 3 and the turn-34 lines written; commit 4cf92b0) — the hash check failed
LEFT: parts B, C, D, E, F; THE CHECKS; THE END-TO-END CHECK; the completion report
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `3464182843f7991b1fa5bbadbdb2a020cf734921` (short `3464182`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T03:56:37Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40265155741
FILES:
docs/governance/briefs/foundations-turn-34.md
roadmap.md

## The conflict

.claude/rules/00-executor-protocol.md, STEP 0: "Save the brief byte for byte as
`docs/governance/briefs/<file>.md` (the text between BRIEF-BEGIN and BRIEF-END, title line and
fence included) and compare its `sha256sum` with the value the carrying message states (a
difference is a STOP)." The brief's STEP 0 says the same: "a difference is a STOP".

- Expected (carrying message): `9d59722dae4c0a7c2b477b4e821e6fc0075b32f8260ee80d98a49c899c0a7465`
- Saved (`sha256sum docs/governance/briefs/foundations-turn-34.md`):
  `9d0a4d42973b127a5815ac719779f2d1f2d617f5b99a822530831e9d878ade4c` (123091 bytes, LF, one
  final newline, title line through the closing fence).
- Variants tried, none equal to the expected value: without the final newline
  (`2970fe2a…`), with a second final newline (`3e0dc7dd…`), CRLF (`80fb81f4…`), with a leading
  newline, without the title line, without the title and the blank line, with the BRIEF-BEGIN /
  BRIEF-END lines included.

## What the saved copy is proven to hold

A scratch dry run (outside the repository; nothing in the tree changed) applied every FILE, EDIT
and APPEND block of the saved copy, plus B5's two allowlist lines, F2's four register rows and F6's
AGENTS.md line, to the files as they stand at BASE, and hashed the results against the brief's own
hash list:

- 52 of 52 lines of THE CHECKS' hash list matched (the three APPEND targets — performance-strategy.md,
  ci-guards.md, _changelog.md — match with one blank line before the appended text).
- Every EDIT's OLD text was found exactly once at BASE.

So every code, test, guard, allowlist, register and doc block in the saved copy is byte-exact. The
difference lies in text no hash covers: the header, SCOPE, THE SYSTEM, WHY, STEP 0 (including the
two roadmap lines written to roadmap.md :509-:510), HOW TO WORK, the parts' lead-in lines, THE
END-TO-END CHECK or THE COMPLETION REPORT paragraphs. I cannot tell whether the difference is a
character I transcribed differently or one changed in delivery; no character in the saved copy is
outside ASCII except — – → … · §, and no line has trailing whitespace or a tab.

## Part A notes

- The session's startup hook reported that local `dev` (37f691b) could not be fast-forwarded. That
  was the shallow clone hiding the ancestry: after `git fetch --deepen=600 origin dev`,
  `git merge-base --is-ancestor 37f691b origin/dev` answered yes, `git fetch origin dev:dev`
  fast-forwarded `dev` 37f691b4..34641828, and `git switch dev` followed.
  `git rev-parse HEAD origin/dev` → 3464182843f7991b1fa5bbadbdb2a020cf734921 twice = BASE, so
  `git diff --name-only BASE..origin/dev` is empty.
- CI on BASE: SUCCESS (above); e2e-last-failure.md: "last E2E run 40265155741 passed", commit
  3464182; guards-last-failure.md: "No failed build/guard jobs in this run.", commit 3464182.

## The question

The committed copy (4cf92b0) is the saved text; a `diff` against the supervisor's own copy will
show the differing bytes. Ruling asked: either (1) the brief re-sent or the differing text named, or
(2) `continue` with the saved copy as the brief in force (its 52 hashed blocks proven above).
