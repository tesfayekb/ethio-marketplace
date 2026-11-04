-- e2e-areas: feed, admin-listings, ad-page
-- P-2 (a) — the feed's rank comes from the level rows (ruling 2 §3; Q9 moved from (c) into (a);
-- DEC-331's scope). public.feed_tier_rank(text) is redeclared: no longer a literal CASE
-- (premium 2, featured 1, regular 0 — 20261009052418) but the level's 0-based position among ALL
-- rows of listing_packages of kind 'level' ordered by sort (then key, so two levels on one sort
-- still rank apart and alike on every call), enabled or not — a staff-disabled level never moves
-- the others. The seeded sorts (regular 0, featured 10, premium 20) keep the numbers 0, 1, 2, so
-- no row of feed_index changes and FE-8 / the console's feedRanks keep their expectations. An
-- unknown key still RAISEs (the typed refusal stays). STABLE now (it reads a table): it is called
-- only in SELECTs inside feed_index_refresh and feed_index_check (20261019223105 :74, :126, :130),
-- never in an index expression, a generated column or a default — confirmed by census. The grants
-- are as today (service_role only). The feed_index.tier_rank comment names the rule.
CREATE OR REPLACE FUNCTION public.feed_tier_rank(p_tier text)
RETURNS smallint
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $fn$
DECLARE
  v_rank smallint;
BEGIN
  SELECT r.pos INTO v_rank
    FROM (SELECT k.key, (row_number() OVER (ORDER BY k.sort, k.key) - 1)::smallint AS pos
            FROM public.listing_packages k
           WHERE k.kind = 'level') r
   WHERE r.key = p_tier;
  IF v_rank IS NULL THEN
    RAISE EXCEPTION 'feed_tier_rank: unknown tier %', p_tier;
  END IF;
  RETURN v_rank;
END $fn$;
COMMENT ON FUNCTION public.feed_tier_rank(text) IS
  'The feed rank of a level key: its 0-based position among every listing_packages row of kind level ordered by sort, then key (P-2 (a), ruling 2 §3). An unknown key raises.';
REVOKE ALL ON FUNCTION public.feed_tier_rank(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_tier_rank(text) TO service_role;

COMMENT ON COLUMN public.feed_index.tier_rank IS
  'The listing''s level as a rank: the level row''s 0-based position among every level ordered by sort (feed_tier_rank; today regular 0, featured 1, premium 2); a sold ad -1, read after every live one (bundle 16 turn 3c). A higher rank is read first; newest first inside a rank.';

-- PROOF: (a) the header (STABLE, invoker, search_path) and the grants (no PUBLIC, anon or
-- authenticated; service_role executes); (b) the three seeded levels answer 0, 1, 2 and an unknown
-- key raises; (c) a scratch level (e2e_mig_ key) sorted between featured and premium answers 2 and
-- premium 3 while it exists, a disabled one the same — rolled back by the sentinel.
DO $proof$
DECLARE
  v_fn  regprocedure := 'public.feed_tier_rank(text)'::regprocedure;
  v_lv  text := 'e2e_mig_lv_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_fs  integer := (SELECT sort FROM public.listing_packages WHERE key = 'featured' AND kind = 'level');
  v_ps  integer := (SELECT sort FROM public.listing_packages WHERE key = 'premium'  AND kind = 'level');
  v_msg text;
BEGIN
  -- (a)
  IF (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 feed rank proof (a): the header or the grants differ';
  END IF;
  -- (b)
  IF v_fs IS NULL OR v_ps IS NULL OR NOT (v_fs + 1 < v_ps) THEN
    RAISE EXCEPTION 'P-2 feed rank proof (b): featured (%) and premium (%) leave no sort between them', v_fs, v_ps;
  END IF;
  IF public.feed_tier_rank('regular') <> 0 OR public.feed_tier_rank('featured') <> 1 OR public.feed_tier_rank('premium') <> 2 THEN
    RAISE EXCEPTION 'P-2 feed rank proof (b): the seeded levels do not rank 0, 1, 2 (% % %)',
      public.feed_tier_rank('regular'), public.feed_tier_rank('featured'), public.feed_tier_rank('premium');
  END IF;
  BEGIN
    PERFORM public.feed_tier_rank(v_lv);
    RAISE EXCEPTION 'P-2 feed rank proof (b): an unknown key was ranked';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM NOT LIKE 'feed_tier_rank: unknown tier%' THEN RAISE; END IF;
  END;
  -- (c)
  BEGIN
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_lv, 'level', 'E2E P2 level', 30, 6, 'boost', false, true, true, true, v_fs + 1);
    IF public.feed_tier_rank(v_lv) <> 2 OR public.feed_tier_rank('premium') <> 3
       OR public.feed_tier_rank('featured') <> 1 OR public.feed_tier_rank('regular') <> 0 THEN
      RAISE EXCEPTION 'P-2 feed rank proof (c): a level between featured and premium does not take position 2 (% premium %)',
        public.feed_tier_rank(v_lv), public.feed_tier_rank('premium');
    END IF;
    UPDATE public.listing_packages SET enabled = false WHERE key = v_lv;
    IF public.feed_tier_rank(v_lv) <> 2 OR public.feed_tier_rank('premium') <> 3 THEN
      RAISE EXCEPTION 'P-2 feed rank proof (c): a disabled level moved the ranks';
    END IF;
    RAISE EXCEPTION 'p2-feed-rank-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-feed-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv) THEN
    RAISE EXCEPTION 'P-2 feed rank proof: the scratch level survived the rollback';
  END IF;
END;
$proof$;

REVOKE ALL ON FUNCTION public.feed_tier_rank(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_tier_rank(text) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261104202000') ON CONFLICT DO NOTHING;
