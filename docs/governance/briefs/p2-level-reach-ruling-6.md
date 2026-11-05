# P-2 turn (a) — ruling 6 (proof (a)'s trigger check — catalog facts, not deparsed text)

Base: cursor/p2-plan at f6e1f6b1f

````text
RULING — P-2 (a), ruling 6: proof (a)'s trigger check — catalog facts, not deparsed text. Base: cursor/p2-plan f6e1f6b1f. Save as docs/governance/briefs/p2-level-reach-ruling-6.md.
**MODEL — Claude Fable 5.1 (High)**

CI run 41969678989: every lane's backend start failed at the fold (statement 24, the proof): "P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild())". The trigger is right; the check is wrong: it LIKE-matches "EXECUTE FUNCTION public.level_ranks_rebuild()" and pg_get_triggerdef prints the function unqualified when its schema is on the search_path. INC-1054 — class: a proof asserting catalog state by LIKE on a deparsed definition (pg_get_triggerdef / indexdef / constraintdef), whose spelling depends on search_path and server version; siblings 20261014022725 :427 and 20261014194317 :932 are applied history (list them, touch nothing).

1. THE FIX (the fold, in place): the trigger assertion reads pg_trigger columns, never pg_get_triggerdef text — t.tgfoid = 'public.level_ranks_rebuild()'::regprocedure; t.tgenabled = 'O'; (t.tgtype & 1) = 0 (statement) AND (t.tgtype & 2) = 0 (AFTER) AND (t.tgtype & 4) <> 0 (INSERT) AND (t.tgtype & 8) <> 0 (DELETE) AND (t.tgtype & 16) <> 0 (UPDATE); the UPDATE OF column set = exactly {sort, key, kind} (t.tgattr joined to pg_attribute by attnum, compared as a sorted array). Nothing else in the proof changes.
2. LAW 12 in docs/governance/migrations.md (bold, as law 11): a proof asserts catalog facts from catalog columns — pg_trigger.tgtype bits, tgattr → attnames, tgfoid::regprocedure, tgenabled; pg_proc.provolatile/prosecdef/proconfig; pg_constraint.con*; pg_policies.qual/with_check — never by LIKE on a pg_get_*def text; pg_get_functiondef is read for md5 body comparisons only.
3. CF-PROOF-2 beside CF-PROOF-1 (the same test file, PRF-5): in every migration with stamp ≥ 20261104000000, no `pg_get_(trigger|index|constraint)def(` followed by LIKE / NOT LIKE in a DO block; planted fixture red; the two older sites sit below the floor, so no allowlist line; wired already (the file is). Register row 110 gains the second rule; the changelog line grows by a clause.
4. RECORDS CORRECTION (ruling 5 verification): the guard's header, the allowlist header, migrations law 11, register row 110 and the wired.test.ts comment cite "DEC-340" for the proof law — DEC-340 is the CI evidence capture (lane B); the law belongs to INC-1052 / DEC-341. Replace the number in those five places.
5. The stop-4 report gains a §6 (this run's cause, the fix, INC-1054); the pairing lines stand.

Then: `bash scripts/check-migrations.sh` → `bunx vitest run scripts/conformance --maxWorkers=2` → `bun run checks` → push ONCE → END THE TURN. One full CI run judges it; the preflight's STAGING BEHIND red is expected (eight files not on staging yet); any lane red whose body touches the fold is a STOP.
````
