# P-2 turn (a) — ruling 5 (the ruling-4 plan is approved; build)

Base: cursor/p2-plan at ca191c2f5

````text
RULING — P-2 (a), ruling 5: the ruling-4 plan is approved; build. Base: cursor/p2-plan ca191c2f5 (+ your unpushed 9f39da541). Save as docs/governance/briefs/p2-level-reach-ruling-5.md.
**MODEL — Claude Fable 5.1 (High)**

1. (vii)-1 — option (a). The baseline_level_key sites are the same class: each proof reads `v_base := public.baseline_level_key()` once (a simple expression) and compares the variable; the nested `feed_tier_rank(baseline_level_key())` at 153959 :357 and 154000 :322 becomes a rank read from level_ranks by v_base into a variable. This amends ruling 4 e: in 153958 / 153959 / 154000 the six rank sites AND the eight baseline sites change, nothing else. The allowlist starts and stays EMPTY.
2. (vii)-2 — confirmed: feed_index_check stays LANGUAGE sql STABLE; a missing rank row yields NULL, never equals the stored rank, and the ad is counted under listings_with_wrong_rows — that is the detector's signal; say so in its comment.
3. (ii) feed_index_refresh as planned: LEFT JOIN level_ranks … FOR UPDATE OF l; the early RETURN first (a non-live ad needs no rank); then `IF v_rank IS NULL THEN RAISE EXCEPTION 'feed_index_refresh: no rank for level %', v_tier`.
4. (iii)/(iv) as planned: feed_reindex_enqueue_listings(uuid[]) in the siblings' exact shape; level_ranks_rebuild() SECURITY DEFINER; the trigger AFTER INSERT OR UPDATE OF sort, key, kind OR DELETE … FOR EACH STATEMENT; rebuild by DELETE + INSERT with the old ranks captured first. level_ranks takes the internal-table pattern of feed_reindex_queue (20261009052418 :221–225): REVOKE ALL FROM PUBLIC, anon, authenticated; GRANT ALL TO service_role; RLS on; one policy `level_ranks_no_client_access FOR ALL TO anon, authenticated USING (false) WITH CHECK (false)` — the migration linter wants a policy per new table, and this is the one the feed's tables use.
5. (v) CF-PROOF-1 as planned (proof-readers.ts / .test.ts / -allowlist.txt beside plan-seam; the DO-block scanner with comments and literals blanked token by token; the planted red fixture plus the regprocedure / INTO / := negatives; wired as plan-seam is). Its allowlist is empty at landing.
6. (vi) sizes: report each file's size; a file over 26 KB is split by concern (rule 30), under that it is the "about".
7. FE-14 as planned (level_ranks joins the table list; the two rpc lines go). docs/features/feed-engine.md, mechanisms.md rows, docs/governance/migrations.md's new law, _changelog.md as ruling 4 g.

Then: `bash scripts/check-migrations.sh` → `bunx vitest run scripts --maxWorkers=2` → `bun run checks` → the stop-4 report (docs/governance/reports/p2-level-reach.stop-4.md: cause, CONTEXT, what changed, the pairing lines restated) → push ONCE → END THE TURN. One full CI run judges the commit; a red is a STOP only when its body or server log touches a path this turn changed.
````
