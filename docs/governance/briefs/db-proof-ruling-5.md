# db-proof — ruling 5 (land after P-2; SUPERSEDED by ruling 6)

Base: cursor/db-proof 140401870; dev d40ab0c26

Saved by records turn R12 for the record: the ruling as delivered inline on 2026-11-05. It was never carried out — its step 1 (`git merge origin/dev`) is forbidden by Cursor rule 00 §Git, the lane stopped on it (docs/governance/reports/db-proof.stop-3.md), and ruling 6 (docs/governance/briefs/db-proof-ruling-6.md) replaced it with the re-land (S540, DEC-346).

```text
RULING 5 — db-proof: land after P-2. Base: cursor/db-proof 140401870; dev d40ab0c26 (PR #19 merged).
MODEL — Opus 5.5 High.
1. `git merge origin/dev` into cursor/db-proof (never rebase). Resolve every conflict keeping both sides' content.
2. docs/governance/mechanisms.md: P-2's rows 109–116 stay exactly as on dev; YOUR row becomes 117 (number assigned by the supervisor — S538). Change every citation of your row in your own changes (grep "row 109" and "| 109 |": docs/features/ci-local-backend.md, INC-1063/INC-1064 in docs/tracking/incidental-findings.md, the report, the rules) to 117; P-2's citations of its own 109 stay.
3. docs/tracking/incidental-findings.md: P-2's INC-1061/1062 and your INC-1063/1064 in number order.
4. The cheap guards, the laws suite, `bun run db:proof` (warm is fine) → its last line. Push, END. Report: each conflict and how it was resolved, the citations changed to 117, the db:proof line.
```
