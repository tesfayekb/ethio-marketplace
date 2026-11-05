# P-2 turn (a) — ruling 3 (CI red on ca191c2f5 — fix first)

Base: cursor/p2-plan at ca191c2f5

```text
RULING — P-2 turn (a), ruling 3: CI red on ca191c2f5 — fix first. Base: cursor/p2-plan at ca191c2f5. Save as docs/governance/briefs/p2-level-reach-ruling-3.md.

1. THE RED (run 41863913123): the temporary backend failed to start — "Applying migration 20261104153958_12091168 … ERROR: feed_tier_rank: unknown tier e2e_mig_l1_<stem> (SQLSTATE P0001)"; the preflight was cancelled and lanes 2, 10, 12 are red only because no backend came up. This is the turn's own path. The fold file (153313) applies before 153958 by name and its body reads listing_packages of kind 'level'; 153958's proof inserts the scratch level at :195 before the door call at :223, with no role switch — so find, from the backend-start job log (gh run view 41863913123 --log, the migration step), WHICH statement raised: the door's write path (the feed refresh after the UPDATE), the direct call at :246, or the cleanup — and why the scratch row was not found there (the function in effect, a snapshot, a sub-block rolled back, the cleanup's order: ads must go before the level rows and nothing may evaluate feed_tier_rank after the scratch rows are gone). Fix at the root; a proof that avoids the scratch key is not a fix (G38). State the cause in one line in the next stop report.
2. Re-check every M-1b proof for the same shape (a scratch key reaching feed_tier_rank, listing_packages read after a scratch row is removed) before pushing.
3. Push once, END THE TURN for that run (DEC-325: the staging applies — mine for the files without a DROP, the operator's for fbffa284 — wait for a green backend start on the fixed commit). Nothing is applied anywhere until then.
4. Stop 3's pairing lines stand as written; file 4's DROP goes to the operator's staging SQL editor when its turn comes; I regenerate types.ts from staging after the applies.
```
