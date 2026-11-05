-- e2e-areas: feed, admin-listings, ad-page
-- P-2 (a) — the feed's rank becomes data (ruling 4, DEC-341; INC-1051, INC-1052). The first fold
-- made feed_tier_rank(text) a STABLE reader of listing_packages that RAISEs on an unknown key, and
-- the pull request's backend fell at 20261104153958's proof: a STABLE function with constant
-- arguments beside a column in a WHERE is pre-evaluated by the planner for its selectivity
-- estimate under the DO statement's snapshot — taken before the scratch level existed — so it saw
-- no row and raised (CONTEXT: "PL/pgSQL function feed_tier_rank(text) line 5 at RAISE … SQL
-- expression … tier_rank <> public.feed_tier_rank(v_l1) … inline_code_block … at IF"). Now:
--   A. public.level_ranks (key → listing_packages ON UPDATE/DELETE CASCADE, feed_rank): the level's
--      0-based position by (sort, key) among every row of kind 'level', enabled or not; internal,
--      as feed_reindex_queue (no browser grant; service_role).
--   B. ONE WRITER — level_ranks_rebuild(), AFTER INSERT OR UPDATE OF sort, key, kind OR DELETE on
--      listing_packages FOR EACH STATEMENT: the old ranks captured, DELETE + INSERT the new, every
--      live ad (active or sold) whose level's rank moved queued through the new
--      feed_reindex_enqueue_listings(uuid[]) (the siblings' shape). A rebuild that moves nothing
--      queues nothing. This migration seeds the table once by a plain INSERT (regular 0, featured 1,
--      premium 2 — the numbers feed_tier_rank gave: no live feed row changes, nothing is queued).
--   C. feed_index_refresh and feed_index_check redeclared WHOLE from 20261019223105 (:45–84,
--      :85–140), the rank read by a join on level_ranks: refresh reads it into a variable with the
--      status and RAISEs 'feed_index_refresh: no rank for level %' for a live ad with none; check
--      (LANGUAGE sql STABLE, it cannot raise) compares the joined rank in its EXCEPT pairs — a
--      missing row is NULL, never equal to the stored rank, and the ad is counted under
--      listings_with_wrong_rows: the detector's signal.
--   D. public.feed_tier_rank(text) is DROPPED (its grants and comment with it).
-- The law (docs/governance/migrations.md 11): a proof reads a STABLE reader's answer INTO a variable
-- first and the WHERE compares the variable; a STABLE function that RAISEs is never named beside a
-- column inside a WHERE clause of a DO block (CF-PROOF-1 judges).

-- ===== A — the table =====
CREATE TABLE public.level_ranks (
  key       text NOT NULL REFERENCES public.listing_packages(key) ON UPDATE CASCADE ON DELETE CASCADE,
  feed_rank smallint NOT NULL,
  CONSTRAINT level_ranks_pkey PRIMARY KEY (key)
);
COMMENT ON TABLE public.level_ranks IS
  'The feed rank of every level row of listing_packages: its 0-based position by (sort, key) among every row of kind level, enabled or not (P-2 (a), DEC-341). Written only by level_ranks_rebuild (the statement trigger on listing_packages), read by feed_index_refresh and feed_index_check.';
REVOKE ALL ON TABLE public.level_ranks FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.level_ranks TO service_role;
ALTER TABLE public.level_ranks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "level_ranks_no_client_access" ON public.level_ranks
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- ===== B — the queue's entry point by listing ids, and the one writer =====
CREATE FUNCTION public.feed_reindex_enqueue_listings(p_listing_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_n integer := 0;
BEGIN
  INSERT INTO public.feed_reindex_queue (listing_id)
  SELECT l.id
    FROM public.listings l
   WHERE l.status IN ('active', 'sold')
     AND l.id = ANY (p_listing_ids)
  ON CONFLICT (listing_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_n;
END $fn$;
COMMENT ON FUNCTION public.feed_reindex_enqueue_listings(uuid[]) IS
  'Queues the live ads (active or sold) among the given ids for a feed rewrite and wakes the drain when any was queued; the levels'' rank trigger calls it (P-2 (a), DEC-341).';
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_listings(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_listings(uuid[]) TO service_role;

CREATE FUNCTION public.level_ranks_rebuild()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_old   jsonb;
  v_moved text[];
BEGIN
  -- The old ranks first; then the whole derived table is written again (it is small: one row per
  -- level); a key whose rank is not what it was moves its live ads onto the queue.
  SELECT jsonb_object_agg(o.key, o.feed_rank) INTO v_old FROM public.level_ranks o;
  DELETE FROM public.level_ranks;
  WITH ranked AS (
    INSERT INTO public.level_ranks (key, feed_rank)
    SELECT k.key, (row_number() OVER (ORDER BY k.sort, k.key) - 1)::smallint
      FROM public.listing_packages k
     WHERE k.kind = 'level'
    RETURNING key, feed_rank)
  SELECT array_agg(n.key) INTO v_moved
    FROM ranked n
   WHERE (v_old ->> n.key)::smallint IS DISTINCT FROM n.feed_rank;
  IF v_moved IS NOT NULL THEN
    PERFORM public.feed_reindex_enqueue_listings(ARRAY(
      SELECT l.id FROM public.listings l
       WHERE l.tier = ANY (v_moved) AND l.status IN ('active', 'sold')));
  END IF;
  RETURN NULL;
END $fn$;
COMMENT ON FUNCTION public.level_ranks_rebuild() IS
  'The one writer of level_ranks: after any insert, delete or change of sort, key or kind on listing_packages it rewrites every rank and queues the live ads of every level whose rank moved (P-2 (a), DEC-341).';
REVOKE ALL ON FUNCTION public.level_ranks_rebuild() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.level_ranks_rebuild() TO service_role;

CREATE TRIGGER listing_packages_level_ranks
  AFTER INSERT OR UPDATE OF sort, key, kind OR DELETE ON public.listing_packages
  FOR EACH STATEMENT EXECUTE FUNCTION public.level_ranks_rebuild();

-- The seed: the same expression, once, by this migration (the trigger owns every later write). The
-- seeded sorts (regular 0, featured 10, premium 20) give 0, 1, 2 — what feed_tier_rank answered —
-- so no row of feed_index changes and nothing is queued.
INSERT INTO public.level_ranks (key, feed_rank)
SELECT k.key, (row_number() OVER (ORDER BY k.sort, k.key) - 1)::smallint
  FROM public.listing_packages k
 WHERE k.kind = 'level';

-- ===== C — the two readers, redeclared whole from 20261019223105 =====
CREATE OR REPLACE FUNCTION public.feed_index_refresh(p_listing_id uuid)
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_status      text;
  v_published   timestamptz;
  v_category_id uuid;
  v_location_id uuid;
  v_tier        text;
  v_sold_at     timestamptz;
  v_rank        smallint;
  v_n           integer := 0;
BEGIN
  -- The listing's row lock serialises two refreshes of the same listing.
  -- P-2 (a), DEC-341 — the level's feed rank is a row of level_ranks, read here with the status.
  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at, r.feed_rank
    INTO v_status, v_published, v_category_id, v_location_id, v_tier, v_sold_at, v_rank
    FROM public.listings l
    LEFT JOIN public.level_ranks r ON r.key = l.tier
   WHERE l.id = p_listing_id
     FOR UPDATE OF l;
  DELETE FROM public.feed_index WHERE listing_id = p_listing_id;
  -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
  IF v_published IS NULL
     OR NOT (v_status = 'active' OR (v_status = 'sold' AND v_sold_at > (SELECT public.sold_cutoff()))) THEN
    RETURN 0;
  END IF;
  IF v_rank IS NULL THEN
    RAISE EXCEPTION 'feed_index_refresh: no rank for level %', v_tier;
  END IF;
  INSERT INTO public.feed_index (category_key, place_key, tier_rank, published_at, listing_id)
  SELECT k.category_key, k.place_key,
         CASE WHEN v_status = 'sold' THEN -1 ELSE v_rank END, v_published, p_listing_id
    FROM public.feed_keys(
           v_category_id,
           ARRAY[v_location_id] || ARRAY(
             SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id)) k;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_refresh(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_refresh(uuid) TO service_role;

-- P-2 (a), DEC-341 — the expected rank joins level_ranks. This is LANGUAGE sql STABLE and cannot
-- raise: a level with no rank row gives NULL, which never equals the stored rank, so the ad is
-- counted under listings_with_wrong_rows — the detector's signal for a missing rank.
CREATE OR REPLACE FUNCTION public.feed_index_check(p_listing_id uuid DEFAULT NULL)
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  WITH scope AS (
    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at
      FROM public.listings l
     WHERE p_listing_id IS NULL OR l.id = p_listing_id
  ),
  live AS (
    -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
    SELECT s.*, r.feed_rank
      FROM scope s
      LEFT JOIN public.level_ranks r ON r.key = s.tier
     WHERE s.published_at IS NOT NULL
       AND (s.status = 'active' OR (s.status = 'sold' AND s.sold_at > (SELECT public.sold_cutoff())))
  ),
  indexed AS (
    SELECT DISTINCT f.listing_id
      FROM public.feed_index f
     WHERE p_listing_id IS NULL OR f.listing_id = p_listing_id
  )
  SELECT jsonb_build_object(
    'active_listings',
      (SELECT count(*) FROM scope WHERE status = 'active'),
    'active_without_published_at',
      (SELECT count(*) FROM scope WHERE status = 'active' AND published_at IS NULL),
    'sold_shown',
      (SELECT count(*) FROM live WHERE status = 'sold'),
    'active_without_rows',
      (SELECT count(*) FROM live v WHERE NOT EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)),
    'rows_for_inactive',
      (SELECT count(*) FROM public.feed_index f JOIN scope s ON s.id = f.listing_id
        WHERE NOT EXISTS (SELECT 1 FROM live v WHERE v.id = s.id)),
    'listings_with_wrong_rows',
      (SELECT count(*) FROM live v
        WHERE EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)
          AND EXISTS (
            (SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id
             EXCEPT
             SELECT k.category_key, k.place_key, CASE WHEN v.status = 'sold' THEN -1 ELSE v.feed_rank END, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k)
            UNION ALL
            (SELECT k.category_key, k.place_key, CASE WHEN v.status = 'sold' THEN -1 ELSE v.feed_rank END, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k
             EXCEPT
             SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id)))
  );
$fn$;
REVOKE ALL ON FUNCTION public.feed_index_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check(uuid) TO service_role;

-- ===== D — the function gives way to the table =====
DROP FUNCTION public.feed_tier_rank(text);

COMMENT ON COLUMN public.feed_index.tier_rank IS
  'The listing''s level as a rank: the level row''s feed_rank in level_ranks (its 0-based position among every level by sort, then key; today regular 0, featured 1, premium 2); a sold ad -1, read after every live one (bundle 16 turn 3c). A higher rank is read first; newest first inside a rank.';

-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
-- cron.schedule row feed_reindex_wake writes included, rolls back with the sentinel.
DO $proof$
DECLARE
  v_tbl     regclass := 'public.level_ranks'::regclass;
  v_rb      regprocedure := 'public.level_ranks_rebuild()'::regprocedure;
  v_eq      regprocedure := 'public.feed_reindex_enqueue_listings(uuid[])'::regprocedure;
  v_rf      regprocedure := 'public.feed_index_refresh(uuid)'::regprocedure;
  v_ck      regprocedure := 'public.feed_index_check(uuid)'::regprocedure;
  v_fn      regprocedure;
  v_trg     text;
  v_base    text;
  v_lv      text := 'e2e_mig_lv_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_fs      integer := (SELECT sort FROM public.listing_packages WHERE key = 'featured' AND kind = 'level');
  v_ps      integer := (SELECT sort FROM public.listing_packages WHERE key = 'premium'  AND kind = 'level');
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2-rank-' || substr(gen_random_uuid()::text, 1, 8);
  v_code    char(2) := 'XZ';
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_p       uuid;
  v_r       uuid;
  v_rank_lv smallint;
  v_rank_p  smallint;
  v_rank_r  smallint;
  v_rank_f  smallint;
  v_seeded  text;
  v_msg     text;
BEGIN
  v_base := public.baseline_level_key();
  -- (a)
  IF to_regprocedure('public.feed_tier_rank(text)') IS NOT NULL THEN
    RAISE EXCEPTION 'P-2 rank proof (a): feed_tier_rank is still declared';
  END IF;
  IF NOT (SELECT c.relrowsecurity FROM pg_class c WHERE c.oid = v_tbl)
     OR has_table_privilege('anon', v_tbl, 'SELECT') OR has_table_privilege('authenticated', v_tbl, 'SELECT')
     OR has_table_privilege('anon', v_tbl, 'INSERT') OR has_table_privilege('authenticated', v_tbl, 'UPDATE')
     OR NOT (has_table_privilege('service_role', v_tbl, 'SELECT') AND has_table_privilege('service_role', v_tbl, 'INSERT')
             AND has_table_privilege('service_role', v_tbl, 'UPDATE') AND has_table_privilege('service_role', v_tbl, 'DELETE'))
     OR NOT EXISTS (SELECT 1 FROM pg_policies p WHERE p.schemaname = 'public' AND p.tablename = 'level_ranks'
                      AND p.policyname = 'level_ranks_no_client_access' AND p.cmd = 'ALL' AND p.qual = 'false' AND p.with_check = 'false')
     OR (SELECT count(*) FROM pg_policies p WHERE p.schemaname = 'public' AND p.tablename = 'level_ranks') <> 1
     OR NOT EXISTS (SELECT 1 FROM pg_constraint c WHERE c.conrelid = v_tbl AND c.contype = 'f'
                      AND c.confrelid = 'public.listing_packages'::regclass AND c.confupdtype = 'c' AND c.confdeltype = 'c') THEN
    RAISE EXCEPTION 'P-2 rank proof (a): level_ranks is not born closed as the queue is, or its key does not follow the level';
  END IF;
  SELECT pg_get_triggerdef(t.oid) INTO v_trg FROM pg_trigger t
   WHERE t.tgrelid = 'public.listing_packages'::regclass AND t.tgname = 'listing_packages_level_ranks' AND NOT t.tgisinternal;
  IF v_trg IS NULL
     OR v_trg NOT LIKE '%AFTER INSERT OR DELETE OR UPDATE OF %'
     OR v_trg NOT LIKE '%sort%' OR v_trg NOT LIKE '%key%' OR v_trg NOT LIKE '%kind%'
     OR v_trg NOT LIKE '%FOR EACH STATEMENT EXECUTE FUNCTION public.level_ranks_rebuild()%' THEN
    RAISE EXCEPTION 'P-2 rank proof (a): the trigger differs (%)', coalesce(v_trg, 'missing');
  END IF;
  FOREACH v_fn IN ARRAY ARRAY[v_rb, v_eq, v_rf, v_ck] LOOP
    IF (SELECT NOT prosecdef OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-2 rank proof (a): the header or the grants of % differ', v_fn;
    END IF;
  END LOOP;
  IF (SELECT provolatile FROM pg_proc WHERE oid = v_rf) <> 'v' OR (SELECT provolatile FROM pg_proc WHERE oid = v_eq) <> 'v'
     OR (SELECT provolatile FROM pg_proc WHERE oid = v_ck) <> 's'
     OR (SELECT l.lanname FROM pg_proc p JOIN pg_language l ON l.oid = p.prolang WHERE p.oid = v_ck) <> 'sql' THEN
    RAISE EXCEPTION 'P-2 rank proof (a): the readers'' volatility or language differ';
  END IF;
  -- (b)
  SELECT string_agg(r.key || ':' || r.feed_rank, ',' ORDER BY r.feed_rank) INTO v_seeded
    FROM public.level_ranks r WHERE r.key IN ('regular', 'featured', 'premium');
  IF v_seeded IS DISTINCT FROM 'regular:0,featured:1,premium:2'
     OR (SELECT count(*) FROM public.level_ranks) <> (SELECT count(*) FROM public.listing_packages WHERE kind = 'level') THEN
    RAISE EXCEPTION 'P-2 rank proof (b): the seeded ranks differ (%)', coalesce(v_seeded, 'none');
  END IF;
  IF v_fs IS NULL OR v_ps IS NULL OR NOT (v_fs + 2 < v_ps) THEN
    RAISE EXCEPTION 'P-2 rank proof (b): featured (%) and premium (%) leave no two sorts between them', v_fs, v_ps;
  END IF;
  -- (c)
  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 rank proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-rank', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-rank';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 rank proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p2-rank';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2 rank Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2 rank City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 rank Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 rank premium', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days', 'premium')
    RETURNING id INTO v_p;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 rank baseline', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days', v_base)
    RETURNING id INTO v_r;
    SELECT feed_rank INTO STRICT v_rank_p FROM public.level_ranks WHERE key = 'premium';
    SELECT feed_rank INTO STRICT v_rank_r FROM public.level_ranks WHERE key = v_base;
    IF NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_p AND tier_rank = v_rank_p)
       OR NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_r AND tier_rank = v_rank_r)
       OR EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_p AND tier_rank <> v_rank_p)
       OR EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_r AND tier_rank <> v_rank_r) THEN
      RAISE EXCEPTION 'P-2 rank proof (c): the scratch ads'' first feed rows do not carry their levels'' ranks (% / %)', v_rank_p, v_rank_r;
    END IF;
    -- A level between featured and premium: the trigger rewrites the ranks and queues premium's ad.
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_lv, 'level', 'E2E P2 rank level', 30, 6, 'boost', false, true, true, true, v_fs + 1);
    SELECT feed_rank INTO STRICT v_rank_lv FROM public.level_ranks WHERE key = v_lv;
    SELECT feed_rank INTO STRICT v_rank_p  FROM public.level_ranks WHERE key = 'premium';
    SELECT feed_rank INTO STRICT v_rank_f  FROM public.level_ranks WHERE key = 'featured';
    SELECT feed_rank INTO STRICT v_rank_r  FROM public.level_ranks WHERE key = v_base;
    IF v_rank_lv <> 2 OR v_rank_p <> 3 OR v_rank_f <> 1 OR v_rank_r <> 0 THEN
      RAISE EXCEPTION 'P-2 rank proof (c): a level between featured and premium does not take 2 and move premium to 3 (% % % %)',
        v_rank_lv, v_rank_p, v_rank_f, v_rank_r;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id = v_p)
       OR EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id = v_r) THEN
      RAISE EXCEPTION 'P-2 rank proof (c): the moved level''s ad is not queued, or the unmoved one is';
    END IF;
    PERFORM public.feed_reindex_sweep(500);
    IF EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id = v_p)
       OR NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_p AND tier_rank = v_rank_p)
       OR EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_p AND tier_rank <> v_rank_p)
       OR EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_r AND tier_rank <> v_rank_r) THEN
      RAISE EXCEPTION 'P-2 rank proof (c): after the sweep the premium ad''s feed row does not carry % (or the baseline ad moved)', v_rank_p;
    END IF;
    -- (d) a sort change that moves no rank queues nothing.
    UPDATE public.listing_packages SET sort = v_fs + 2 WHERE key = v_lv;
    SELECT feed_rank INTO STRICT v_rank_lv FROM public.level_ranks WHERE key = v_lv;
    SELECT feed_rank INTO STRICT v_rank_p  FROM public.level_ranks WHERE key = 'premium';
    IF v_rank_lv <> 2 OR v_rank_p <> 3
       OR EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id IN (v_p, v_r)) THEN
      RAISE EXCEPTION 'P-2 rank proof (d): a sort change that moved no rank changed a rank or queued an ad';
    END IF;
    -- (e) a disabled level keeps its rank; its deletion puts premium back and queues its ad again.
    UPDATE public.listing_packages SET enabled = false WHERE key = v_lv;
    SELECT feed_rank INTO STRICT v_rank_lv FROM public.level_ranks WHERE key = v_lv;
    SELECT feed_rank INTO STRICT v_rank_p  FROM public.level_ranks WHERE key = 'premium';
    IF v_rank_lv <> 2 OR v_rank_p <> 3 THEN
      RAISE EXCEPTION 'P-2 rank proof (e): a disabled level moved the ranks (% %)', v_rank_lv, v_rank_p;
    END IF;
    DELETE FROM public.listing_packages WHERE key = v_lv;
    SELECT feed_rank INTO STRICT v_rank_p FROM public.level_ranks WHERE key = 'premium';
    IF v_rank_p <> 2
       OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
       OR NOT EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id = v_p)
       OR EXISTS (SELECT 1 FROM public.feed_reindex_queue WHERE listing_id = v_r) THEN
      RAISE EXCEPTION 'P-2 rank proof (e): deleting the level did not put premium back at 2 and queue its ad (%)', v_rank_p;
    END IF;
    RAISE EXCEPTION 'p2-rank-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$;

-- ------------------------------------------------------------ CLOSERS
REVOKE ALL ON TABLE public.level_ranks FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.level_ranks TO service_role;
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_listings(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_listings(uuid[]) TO service_role;
REVOKE ALL ON FUNCTION public.level_ranks_rebuild() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.level_ranks_rebuild() TO service_role;
REVOKE ALL ON FUNCTION public.feed_index_refresh(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_refresh(uuid) TO service_role;
REVOKE ALL ON FUNCTION public.feed_index_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check(uuid) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261104202000') ON CONFLICT DO NOTHING;
