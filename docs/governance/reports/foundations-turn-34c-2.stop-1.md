# Foundations turn 34c-2 — STOP 1 (STEP 0: the saved brief's hash differs)

## Part A

- `git rev-parse HEAD` = `0d8d4f28c3a8c9d44f93b3a5b88d412299c21874` = BASE.
- ci-status.md, first six lines:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `1346a1be506179209286a168c323ea26ae8fc1b6` (short `1346a1b`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T19:31:59Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40382950832
```

- e2e-last-failure.md reads `last E2E run 40382950832 passed`. The newest readable evidence is turn 34w-2's run on `1346a1be`, and it is green. The runs on `eb95b9e4` (40384938946) and on BASE (40391189707) are not yet in the evidence.

## STEP 0 — the STOP

- My saved copy of the text between BRIEF-BEGIN and BRIEF-END hashed to `9cbbb95e5a66983195c7502af8191bb86f23583200013c3c3cf5e234fc25f784`, 55766 bytes. The message requires `d058f2b5f2ef76d88b848dad2a7ef079b41a2edba09ac8af26ee3eb3c0b1efad`, 55768 bytes. The difference is 2 bytes.
- What I could rule out:
  - Every EDIT block's OLD text is found exactly once in the tree.
  - Applied to a scratch copy, my EDIT and FILE blocks reproduce all 13 file hashes in the brief's hash list.
  - So the 2 bytes are in the brief's prose, outside any block. Most likely an em dash, which is 3 bytes, became a 1-byte hyphen somewhere in my copy. I could not locate it from the message.
- The brief says "a difference is a STOP", so I stopped. I removed the mismatched copy. No product, test or doc file was changed.
- One note for the next send: BLOCK 2 opens with `FILE-BEGIN src/features/session/session-policy.test.ts` but closes with `FILE-END scripts/conformance/project-reads.test.ts`. The content in between is unambiguous, and its hash matches when it is written to `session-policy.test.ts`.

## What the supervisor can do

Send the brief as a file, or send its bytes some other way that is not re-typed, so it can be saved byte for byte. Or rule that the saved copy stands, given that the 13 file hashes match.

## Files

docs/governance/reports/foundations-turn-34c-2.stop-1.md (this file). Nothing else changed.
