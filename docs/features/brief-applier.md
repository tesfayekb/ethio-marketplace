# The block applier (register row 58)

A brief carries every new or rewritten file as a FILE block and every change as an EDIT block. The executor — Claude Code or Lovable — applies them with one script, never by retyping them:

```
bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]
```

With no path it applies every block of the brief in the order written; with paths, only their blocks. `--dry` checks and prints, and writes nothing.

## What a block is

- `FILE-BEGIN <path>` … `FILE-END <path>`: the file's whole text (the script adds the final newline).
- `EDIT <path> #<n>`, then `OLD-BEGIN` … `OLD-END` and `NEW-BEGIN` … `NEW-END`: the OLD text, found exactly once in the file, becomes the NEW text. An empty NEW is one blank line. A path's EDITs are numbered 1, 2, 3 … in the order written.
- Each marker stands alone on its line. A block written inside a FILE block is that file's text.

## What it refuses — and then writes nothing

- A marker line that no whole block holds: a block that runs on, never ends or lacks an end line.
- A path's EDIT numbers out of order.
- A path outside the repository, or outside the brief's scope — the kit's own `scopeVerdict` (.claude/hooks/lib.ts), the answer the editing tools get.
- An OLD text found zero times or more than once, or an EDIT to a file that does not exist.
- A path named on the command line that has no block.

Every file is staged beside its target (`<file>.apply-blocks-staged`) and renamed into place only when all are staged, so a file that cannot be written leaves the others as they were.

## Its tests

scripts/brief/apply-blocks.test.ts — BA-1…6. BA-6 names any other code that parses the markers: there is one parser of briefs.
