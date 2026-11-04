# P-2 — ruling 2 (stop 2, M-1a)

```text
RULING — P-2 turn (a), ruling 2: stop 2 (M-1a). Base: cursor/p2-plan at 8194ed404. Save as docs/governance/briefs/p2-level-reach-ruling-2.md; roadmap line 3 names it beside ruling 1.

1. The split of M-1a into two files by concern, each with its own mark and proofs — approved.
2. listings_tier_check dropped — approved: with the FK the level rows are the one declaration of the levels (DEC-331's scope); a literal CHECK beside it would be a second one. Nothing to rewrite.
3. feed_tier_rank — fold it NOW, as its own small file placed before M-1b's doors (its own mark, its own proof): STABLE (it is called only in SELECTs inside feed_index_refresh, never in an index expression — confirm, and STOP if that is wrong), rank = the level's 0-based position among ALL rows of kind 'level' ordered by sort (enabled or not, so a staff-disabled level never moves the others). The numbers stay regular 0, featured 1, premium 2, so no reindex is needed and FE-8 / feedRanks keep their expectations — the proof asserts those three values and a scratch level sorted between featured and premium answering its position; an unknown key still RAISEs (the typed refusal stays). The feed_index.tier_rank comment names the rule. The file grants and revokes as today. This moves Q9's fold from (c) into (a); register row 93 is rewritten in (c).
4. paused and the edit doors — in M-1c, redeclare save/edit (20261028223430) and submit_listing (20261015130915) whole from their live definitions so that `paused` is accepted wherever `closed` is accepted (paused → screening through an edit, as your §1 says), with proofs on scratch rows. No test in (a) edits a paused ad before M-1c lands.
5. CI and the applies: the run on 8194ed404 was CANCELLED (41846725902) — no verdict. Commit this ruling and continue straight into M-1b; the push gives this branch a full run. The staging apply of the two M-1a files is mine, through the connector, after that run's backend start is green (DEC-325), in the pairing order (71cb9d01 → mark 20261104200000, then c072fd66 → 20261104201000); I confirm here before your M-1b stop needs them. Production is the operator's, after the merge. You apply nothing.
6. Limits accepted (NH-6 Mac-only; the two live-catalogue guards are CI's).
```
