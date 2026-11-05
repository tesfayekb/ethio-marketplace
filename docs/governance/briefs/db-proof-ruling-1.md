# db-proof — ruling 1 (the plan approved; build)

Base: dev c89271ca2

````text
RULING — db-proof, ruling 1: the plan is approved; build. Base: cursor/db-proof 3d80d4b57. Save as docs/governance/briefs/db-proof-ruling-1.md.
**MODEL — Claude Opus 5.5 (High)**

A — yes: scripts/ci/local-backend-db.sh holds admin_sql, hold_background_work, restore_background_work, db_error_capture and ledger_check; CI's start step sources it and calls them in today's order; everything CI-only stays inline. DEC-343's frozen rule covers the start step too: ADMITTED only when (1) CI's lanes stay green with "applied N/N" and the restore line unchanged, (2) the PR's "Working copy" lines show dev's exact before → after hashes, and (3) the local planted-file proof shows the server record through the shared db_error_capture. Anything else → both steps revert.
B — the throwaway self-signed localhost certificate; the config stays identical to CI's.
C — db:proof prints the excerpt to the operator's terminal as planned (scratch ids and example.invalid addresses are not secrets); a report pastes only its LAST line, never the excerpt. Your finding 9 (redact() inline three times) goes on the roadmap as its own CI turn — one redaction module — not this turn.
D — run fresh automatically, with the one-line reason first.
E — scope as listed, plus: AGENTS.md one db:proof line; rule 60 one line (the report pastes db:proof's last line for a migration turn); rule 00's computer line corrected (macOS arm64, a Cursor worktree — your finding 7); docs/governance/mechanisms.md ONE row for failed-apply evidence (the INC-999 excerpt + the DEC-340 capture + db:proof — this also settles the row PR #22 owed; your finding 11). Findings 8 (the CLI pin four times in the workflow) and 10 (the images job's derived config) → roadmap lines, not this turn.

Timing: you may run db:proof (cold pull included) now — P-2 is waiting on CI. Never run `bun run checks` while the P-2 lane runs its checks; ask in your report if you need it.

Then: the build → the local byte-identity diff (empty) → db:proof --fresh on dev's head (PASS, cold, timed) → warm re-run (timed) → the planted file (FAIL with the server record) → removed, `git status --short` empty → PASS again → docker system df / docker stats measured → push ONCE → END THE TURN. CI judges the extraction; your report carries every timing and measurement.
````
