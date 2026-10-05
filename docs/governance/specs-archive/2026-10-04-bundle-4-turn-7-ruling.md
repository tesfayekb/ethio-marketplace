Source: supervisor thread, turn 1349, Sun 2026-10-04 17:37 New York.
Status at 2026-10-04: built as dev 83da74b2 (usage map only; the executor could not apply M6 on ethio-prod — the operator applied it later, mark 20261005100000 read back in turn 1365).
Related: bundle 4, M6 (20261004212627_e44f20e5, mark 20261005100000).

RULING — bundle 4, turn 7 (short). Base: dev aeac0bfa. Main is still 72cc8102.

M6 REVIEWED AND ACCEPTED
- Nine doors redeclared whole; the diffs against their previous declarations show only the intended changes; volatility as live; no DROP; no stored row changes; proofs on scratch rows, rolled back.
- The seven lines in scripts/public-surface-allowlist.txt are accepted: each rule already had EXECUTE for signed-in users in an earlier migration.
- M6 is applied on ethio-staging by the operator: mark 20261005100000 read back.

CI on aeac0bf (run 37236173535) is red for two reasons:
- E2E preflight: staging was behind. Fixed by the apply above.
- "i18n used-on map is fresh": the map is stale (scanned 336, the tree has 337). You did not regenerate it in the M6 turn.

DO THESE, IN ORDER
1. Apply M6 on ethio-prod: apply e44f20e5 → expect mark 20261005100000. Paste the read-back of the mark.
2. Regenerate the translation usage map and commit both files.
3. Run all five checks on the whole tree, not only the touched files: typecheck, lint, whole unit run, whole-tree format check, the usage map. The whole-tree format check was skipped in three of your last reports.
4. Push, and END THE TURN. Change nothing else. This run is the first full proof of Part F and of M6, and it must not be cancelled by another push.

REPORT: the prod read-back, the five checks, the commit.

NEXT TURN starts by reading CI on that commit (the three curl lines). I will send its ruling once the run has finished.
