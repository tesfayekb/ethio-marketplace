-- E1 (bundle 10, the feed engine): the feed's ordered index. feed_index, feed_keys, feed_index_refresh, feed_index_check, the backfill of today's active listings, and the proofs. Spec: docs/governance/feed-engine-spec.md.
-- e2e-areas: feed

-- 1. The table: one row per (category key, place key) of each active, published listing.
CREATE TABLE public.feed_index (
  category_key uuid NOT NULL,
  place_key    uuid NOT NULL,
  tier_rank    smallint NOT NULL DEFAULT 0,
  published_at timestamptz NOT NULL,
  listing_id   uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  CONSTRAINT feed_index_pkey PRIMARY KEY (category_key, place_key, tier_rank, published_at, listing_id)
);
CREATE INDEX feed_index_listing_idx ON public.feed_index (listing_id);

COMMENT ON TABLE public.feed_index IS
  'The feed''s ordered index (docs/governance/feed-engine-spec.md): one row per (category key, place key) of each active listing with a publish time. A page is one range of the primary key read backwards: higher tier first, then newest, then id. Written only by feed_index_refresh; read by the feed''s read door (E2). Holds no personal data.';
COMMENT ON COLUMN public.feed_index.category_key IS
  'The listing''s category, each of its parents along every pointer, or the named key 00000000-0000-0000-0000-000000000000 = all categories (an explicit key, never a default for a missing value).';
COMMENT ON COLUMN public.feed_index.place_key IS
  'Each place the listing is shown in, each of their parents up to the country, or the named key 00000000-0000-0000-0000-000000000000 = everywhere (an explicit key, never a default for a missing value).';
COMMENT ON COLUMN public.feed_index.tier_rank IS
  'The promotion tier''s order (REQ-024): a higher rank is read first. 0 for every listing in v1.';

ALTER TABLE public.feed_index ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feed_index_no_client_access" ON public.feed_index
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
REVOKE ALL ON TABLE public.feed_index FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.feed_index TO service_role;

-- 2. The keys of a category and a set of places.
CREATE FUNCTION public.feed_keys(p_category_id uuid, p_location_ids uuid[])
RETURNS TABLE (category_key uuid, place_key uuid)
LANGUAGE sql
STABLE SECURITY INVOKER
SET search_path TO 'public'
AS $fn$
  WITH RECURSIVE
  cats(id) AS (
    SELECT p_category_id WHERE p_category_id IS NOT NULL
    UNION
    SELECT t.parent_id
      FROM cats c
      JOIN public.category_tree_pointers t ON t.child_id = c.id
     WHERE t.parent_id IS NOT NULL
  ),
  places(id) AS (
    SELECT u.id FROM unnest(p_location_ids) AS u(id) WHERE u.id IS NOT NULL
    UNION
    SELECT l.parent_id
      FROM places p
      JOIN public.locations l ON l.id = p.id
     WHERE l.parent_id IS NOT NULL
  ),
  ck(id) AS (
    SELECT id FROM cats
    UNION
    SELECT '00000000-0000-0000-0000-000000000000'::uuid WHERE p_category_id IS NOT NULL
  ),
  pk(id) AS (
    SELECT id FROM places
    UNION
    SELECT '00000000-0000-0000-0000-000000000000'::uuid
  )
  SELECT ck.id, pk.id FROM ck CROSS JOIN pk;
$fn$;
REVOKE ALL ON FUNCTION public.feed_keys(uuid, uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_keys(uuid, uuid[]) TO service_role;

-- 3. Rewrite one listing's rows.
CREATE FUNCTION public.feed_index_refresh(p_listing_id uuid)
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
  v_n           integer := 0;
BEGIN
  -- The listing's row lock serialises two refreshes of the same listing.
  SELECT l.status, l.published_at, l.category_id, l.location_id
    INTO v_status, v_published, v_category_id, v_location_id
    FROM public.listings l
   WHERE l.id = p_listing_id
     FOR UPDATE;
  DELETE FROM public.feed_index WHERE listing_id = p_listing_id;
  IF v_status IS DISTINCT FROM 'active' OR v_published IS NULL THEN
    RETURN 0;
  END IF;
  INSERT INTO public.feed_index (category_key, place_key, tier_rank, published_at, listing_id)
  SELECT k.category_key, k.place_key, 0, v_published, p_listing_id
    FROM public.feed_keys(
           v_category_id,
           ARRAY[v_location_id] || ARRAY(
             SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id)) k;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_refresh(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_refresh(uuid) TO service_role;

-- 4. Counts only: is the index what the listings say it should be?
CREATE FUNCTION public.feed_index_check(p_listing_id uuid DEFAULT NULL)
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  WITH scope AS (
    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id
      FROM public.listings l
     WHERE p_listing_id IS NULL OR l.id = p_listing_id
  ),
  live AS (
    SELECT * FROM scope WHERE status = 'active' AND published_at IS NOT NULL
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
    'active_without_rows',
      (SELECT count(*) FROM live v WHERE NOT EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)),
    'rows_for_inactive',
      (SELECT count(*) FROM public.feed_index f JOIN scope s ON s.id = f.listing_id
        WHERE s.status <> 'active' OR s.published_at IS NULL),
    'listings_with_wrong_rows',
      (SELECT count(*) FROM live v
        WHERE EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)
          AND EXISTS (
            (SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id
             EXCEPT
             SELECT k.category_key, k.place_key, 0::smallint, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k)
            UNION ALL
            (SELECT k.category_key, k.place_key, 0::smallint, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k
             EXCEPT
             SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id)))
  );
$fn$;
REVOKE ALL ON FUNCTION public.feed_index_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check(uuid) TO service_role;

-- 5. The backfill of today's active listings, and its check on the same state.
DO $backfill$
DECLARE
  v_check jsonb;
BEGIN
  LOCK TABLE public.listings, public.listing_locations, public.category_tree_pointers, public.locations IN SHARE MODE;
  PERFORM public.feed_index_refresh(l.id) FROM public.listings l WHERE l.status = 'active';
  v_check := public.feed_index_check(NULL);
  IF (v_check->>'active_without_rows')::int <> 0
     OR (v_check->>'rows_for_inactive')::int <> 0
     OR (v_check->>'listings_with_wrong_rows')::int <> 0 THEN
    RAISE EXCEPTION 'E1 backfill check failed: %', v_check;
  END IF;
END $backfill$;

-- 6. Proofs on scratch rows only; everything inside the inner block is rolled back.
DO $proof$
DECLARE
  v_tag     text := replace(gen_random_uuid()::text, '-', '');
  v_nil     constant uuid := '00000000-0000-0000-0000-000000000000';
  v_cc      text;
  v_country uuid;
  v_region  uuid;
  v_city1   uuid;
  v_city2   uuid;
  v_a       uuid;
  v_b       uuid;
  v_c       uuid;
  v_g       uuid;
  v_n       integer;
  v_role    text;
  v_priv    text;
  v_fn      text;
BEGIN
  BEGIN
    SELECT s.c INTO v_cc
      FROM unnest(ARRAY['AA', 'ZZ']
           || ARRAY(SELECT 'Q' || chr(g) FROM generate_series(ascii('M'), ascii('Z')) g)
           || ARRAY(SELECT 'X' || chr(g) FROM generate_series(ascii('A'), ascii('Z')) g)) AS s(c)
     WHERE NOT EXISTS (SELECT 1 FROM public.countries k WHERE k.code = s.c)
     ORDER BY s.c
     LIMIT 1;
    IF v_cc IS NULL THEN
      RAISE EXCEPTION 'E1 proof setup: no free user-assigned country code';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_cc, 'e2e-mig-feed ' || v_cc, false);
    SELECT l.id INTO STRICT v_country
      FROM public.locations l
     WHERE l.level = 'country' AND l.country_code = v_cc AND l.name_en = 'e2e-mig-feed ' || v_cc;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
      VALUES (v_country, 'region', v_cc, 'e2e-mig-feed region', 'e2e-mig-feed-r-' || v_tag, true, 'admin')
      RETURNING id INTO v_region;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
      VALUES (v_region, 'city', v_cc, 'e2e-mig-feed city one', 'e2e-mig-feed-c1-' || v_tag, true, 'admin', 9.03, 38.74)
      RETURNING id INTO v_city1;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
      VALUES (v_region, 'city', v_cc, 'e2e-mig-feed city two', 'e2e-mig-feed-c2-' || v_tag, true, 'admin', 9.04, 38.75)
      RETURNING id INTO v_city2;
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
      VALUES ('e2e-mig-feed-a-' || v_tag, 'e2e-mig-feed A', true, false, false, 999999) RETURNING id INTO v_a;
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
      VALUES ('e2e-mig-feed-b-' || v_tag, 'e2e-mig-feed B', true, false, false, 999999) RETURNING id INTO v_b;
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
      VALUES ('e2e-mig-feed-c-' || v_tag, 'e2e-mig-feed C', true, true, false, 999999) RETURNING id INTO v_c;
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
      VALUES ('e2e-mig-feed-g-' || v_tag, 'e2e-mig-feed G', true, false, false, 999999) RETURNING id INTO v_g;
    INSERT INTO public.category_tree_pointers (parent_id, child_id)
      VALUES (v_a, v_b), (v_b, v_c), (v_g, v_c);

    -- P1: C under B under A, and surfaced under G; city one under the region under the country.
    SELECT count(*) INTO v_n FROM public.feed_keys(v_c, ARRAY[v_city1]);
    IF v_n <> 20 THEN
      RAISE EXCEPTION 'E1 P1: feed_keys(C, city one) gave % rows, expected 20', v_n;
    END IF;
    IF EXISTS (
      SELECT 1
        FROM unnest(ARRAY[v_c, v_b, v_a, v_g, v_nil]) AS e(id)
       CROSS JOIN unnest(ARRAY[v_city1, v_region, v_country, v_nil]) AS p(id)
       WHERE NOT EXISTS (
         SELECT 1 FROM public.feed_keys(v_c, ARRAY[v_city1]) k
          WHERE k.category_key = e.id AND k.place_key = p.id)) THEN
      RAISE EXCEPTION 'E1 P1: a named key pair is missing';
    END IF;
    -- P2: a top category in a country.
    SELECT count(*) INTO v_n FROM public.feed_keys(v_a, ARRAY[v_country]);
    IF v_n <> 4 THEN
      RAISE EXCEPTION 'E1 P2: feed_keys(A, country) gave % rows, expected 4', v_n;
    END IF;
    -- P3: two cities share their parents once.
    SELECT count(*) INTO v_n FROM public.feed_keys(v_c, ARRAY[v_city1, v_city2]);
    IF v_n <> 25 THEN
      RAISE EXCEPTION 'E1 P3: feed_keys(C, city one and two) gave % rows, expected 25', v_n;
    END IF;
    SELECT count(*) INTO v_n FROM public.feed_keys(v_c, ARRAY[v_city1, v_city1]);
    IF v_n <> 20 THEN
      RAISE EXCEPTION 'E1 P3: a repeated place gave % rows, expected 20', v_n;
    END IF;
    -- P4: no place gives the everywhere key only.
    SELECT count(*) INTO v_n FROM public.feed_keys(v_c, NULL) k WHERE k.place_key = v_nil;
    IF v_n <> 5 OR (SELECT count(*) FROM public.feed_keys(v_c, NULL)) <> 5 THEN
      RAISE EXCEPTION 'E1 P4: feed_keys(C, null) is not the 5 category keys with the everywhere key';
    END IF;
    IF (SELECT count(*) FROM public.feed_keys(v_c, ARRAY[]::uuid[])) <> 5 THEN
      RAISE EXCEPTION 'E1 P4: feed_keys(C, empty) is not 5 rows';
    END IF;
    -- P5: no category gives no rows.
    IF (SELECT count(*) FROM public.feed_keys(NULL, ARRAY[v_city1])) <> 0 THEN
      RAISE EXCEPTION 'E1 P5: feed_keys(null, city one) is not empty';
    END IF;
    -- P6: a refresh of an id that is no listing writes nothing.
    IF public.feed_index_refresh(gen_random_uuid()) <> 0 THEN
      RAISE EXCEPTION 'E1 P6: a refresh of a missing listing wrote rows';
    END IF;

    RAISE EXCEPTION USING ERRCODE = 'P0099', MESSAGE = 'e2e-mig-feed-e1-rollback';
  EXCEPTION WHEN SQLSTATE 'P0099' THEN
    IF SQLERRM <> 'e2e-mig-feed-e1-rollback' THEN
      RAISE;
    END IF;
  END;

  -- P7: the table is closed to the browser roles; the functions run for service_role only.
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    FOREACH v_priv IN ARRAY ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE'] LOOP
      IF has_table_privilege(v_role, 'public.feed_index', v_priv) THEN
        RAISE EXCEPTION 'E1 P7: % holds % on public.feed_index', v_role, v_priv;
      END IF;
    END LOOP;
    FOREACH v_fn IN ARRAY ARRAY['public.feed_keys(uuid,uuid[])', 'public.feed_index_refresh(uuid)', 'public.feed_index_check(uuid)'] LOOP
      IF has_function_privilege(v_role, v_fn, 'EXECUTE') THEN
        RAISE EXCEPTION 'E1 P7: % can execute %', v_role, v_fn;
      END IF;
    END LOOP;
  END LOOP;
  FOREACH v_fn IN ARRAY ARRAY['public.feed_keys(uuid,uuid[])', 'public.feed_index_refresh(uuid)', 'public.feed_index_check(uuid)'] LOOP
    IF NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'E1 P7: service_role cannot execute %', v_fn;
    END IF;
  END LOOP;
  IF NOT (SELECT c.relrowsecurity FROM pg_class c WHERE c.oid = 'public.feed_index'::regclass) THEN
    RAISE EXCEPTION 'E1 P7: row level security is off on public.feed_index';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies p
                  WHERE p.schemaname = 'public' AND p.tablename = 'feed_index'
                    AND p.policyname = 'feed_index_no_client_access') THEN
    RAISE EXCEPTION 'E1 P7: the closing policy is missing';
  END IF;

  -- P8: header facts.
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.feed_keys(uuid,uuid[])'::regprocedure
                  AND NOT p.prosecdef AND p.provolatile = 's' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E1 P8: feed_keys header facts differ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.feed_index_refresh(uuid)'::regprocedure
                  AND p.prosecdef AND p.provolatile = 'v' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E1 P8: feed_index_refresh header facts differ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.feed_index_check(uuid)'::regprocedure
                  AND p.prosecdef AND p.provolatile = 's' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E1 P8: feed_index_check header facts differ';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261009160000') ON CONFLICT (version) DO NOTHING;