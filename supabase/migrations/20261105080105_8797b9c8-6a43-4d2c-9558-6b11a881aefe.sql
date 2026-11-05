-- e2e-areas: my-listings, feed, posting
-- P-2 (a) M-1c, part 2 of 7 — the trim of an ad's places (DEC-330, confirmed; ruling 9 H1 option A; ruling 10).
-- ONE service-only function, public.listing_places_trim(p_listing_id uuid) RETURNS uuid[]: the ad's places
-- cut back to the caps the judge enforces today — coverage_plans through seller_plan(seller_id), the
-- judge's own reader (validate_listing_draft, 20261103040808 :383), never a second copy of that read;
-- (c) moves this one read to the reach row when the caps fold. The primary place (listings.location_id)
-- is kept first, then listing_locations in position order, each kept while the distinct cities
-- (coalesce(city_id, id)), regions (region_id) and countries stay within max_cities / max_regions /
-- max_countries — the judge's own counts (:377). The others are deleted (one WHERE'd DELETE, CF-SQL-1)
-- and their ids answered in the seller's saved order, for the caller's revision row. Nothing else of the ad is touched; the caller
-- (the sweep, part 3) writes the revision, the audit row and the feed queue. Law 11: seller_plan() is
-- read into a variable. Proofs on scratch rows, rolled back by the sentinel.
-- Ruling 15 (INC-1067): the proof holds for any caps — proof text only; no schema statement, mark or grant changed.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_attribute WHERE attrelid = 'public.listing_expiry_sweep_runs'::regclass AND attname = 'reminded' AND NOT attisdropped) THEN
    RAISE EXCEPTION 'P-2 M-1c part 2: part 1 (4e04fad3) must be applied first';
  END IF;
  IF to_regprocedure('public.listing_places_trim(uuid)') IS NOT NULL THEN
    RAISE EXCEPTION 'P-2 M-1c part 2: listing_places_trim already exists';
  END IF;
  IF to_regprocedure('public.seller_plan(uuid)') IS NULL OR to_regclass('public.coverage_plans') IS NULL THEN
    RAISE EXCEPTION 'P-2 M-1c part 2: the judge''s caps reader (seller_plan → coverage_plans) is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE TRIM
CREATE FUNCTION public.listing_places_trim(p_listing_id uuid)
RETURNS uuid[]
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_row      public.listings%ROWTYPE;
  v_planname text;
  v_plan     public.coverage_plans%ROWTYPE;
  v_place    record;
  v_keep     uuid[] := ARRAY[]::uuid[];
  v_removed  uuid[];
  v_cities   uuid[] := ARRAY[]::uuid[];
  v_regions  uuid[] := ARRAY[]::uuid[];
  v_lands    text[] := ARRAY[]::text[];
  v_c2       uuid[];
  v_r2       uuid[];
  v_l2       text[];
BEGIN
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing_places_trim: no listing %', p_listing_id; END IF;
  -- The caps the judge enforces, through its own reader (DEC-341: read into a variable first).
  v_planname := public.seller_plan(v_row.seller_id);
  SELECT * INTO v_plan FROM public.coverage_plans cp WHERE cp.plan = v_planname;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing_places_trim: no coverage plan % for %', v_planname, p_listing_id; END IF;
  -- The walk: the primary place first, then the seller's saved order; a place stays while the counts hold.
  FOR v_place IN
    SELECT loc.id, coalesce(loc.city_id, loc.id) AS city, loc.region_id AS region, loc.country_code::text AS land
      FROM public.listing_locations ll
      JOIN public.locations loc ON loc.id = ll.location_id
     WHERE ll.listing_id = p_listing_id
     ORDER BY (ll.location_id = v_row.location_id) DESC NULLS LAST, ll.position, ll.location_id
  LOOP
    v_c2 := CASE WHEN v_place.city = ANY (v_cities) THEN v_cities ELSE v_cities || v_place.city END;
    v_r2 := CASE WHEN v_place.region IS NULL OR v_place.region = ANY (v_regions) THEN v_regions ELSE v_regions || v_place.region END;
    v_l2 := CASE WHEN v_place.land IS NULL OR v_place.land = ANY (v_lands) THEN v_lands ELSE v_lands || v_place.land END;
    IF cardinality(v_c2) <= v_plan.max_cities AND cardinality(v_r2) <= v_plan.max_regions
       AND cardinality(v_l2) <= v_plan.max_countries THEN
      v_keep := v_keep || v_place.id; v_cities := v_c2; v_regions := v_r2; v_lands := v_l2;
    END IF;
  END LOOP;
  WITH gone AS (
    DELETE FROM public.listing_locations ll
     WHERE ll.listing_id = p_listing_id AND NOT (ll.location_id = ANY (v_keep))
    RETURNING ll.location_id, ll.position)
  SELECT coalesce(array_agg(g.location_id ORDER BY g.position, g.location_id), ARRAY[]::uuid[]) INTO v_removed FROM gone g;
  RETURN v_removed;
END $fn$;
COMMENT ON FUNCTION public.listing_places_trim(uuid) IS
  'Cuts an ad''s places back to the caps the judge enforces (seller_plan → coverage_plans; (c) moves the read to the reach row): the primary place first, then the saved order, within the distinct city / region / country caps; answers the removed place ids (P-2 M-1c, DEC-330). Service only; the caller records the revision.';
REVOKE ALL ON FUNCTION public.listing_places_trim(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listing_places_trim(uuid) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) under the seller's plan as the database holds it
-- (C = max_cities, every cap 1 or more), a scratch ad with C + 1 scratch cities in one scratch region, the
-- primary saved last: the primary and the first C − 1 others are kept in saved order, exactly the last
-- other is answered and gone; a second call answers nothing and removes nothing; an ad within the caps is
-- untouched; nothing else of either ad changes. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_fn      regprocedure := 'public.listing_places_trim(uuid)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2-m1c2-' || substr(gen_random_uuid()::text, 1, 8);
  v_code    char(2) := 'XZ';
  v_anc     uuid;
  v_regA    uuid;
  v_city    uuid[] := ARRAY[]::uuid[];
  v_id      uuid;
  v_prim    uuid;
  v_cat     uuid;
  v_a       uuid;
  v_b       uuid;
  v_plan    public.coverage_plans%ROWTYPE;
  v_planname text;
  v_cmax    integer;
  v_rmax    integer;
  v_lmax    integer;
  v_removed uuid[];
  v_snap    text;
  v_snap2   text;
  v_msg     text;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE') OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 M-1c part 2 proof (a): the header or the grants differ';
  END IF;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1c part 2 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1c2', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1c2';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 M-1c part 2 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p2-m1c2';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2 M1c2 Region A', v_tag || '-ra', true, v_anc) RETURNING id INTO v_regA;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1c2 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- The caps are the judge's own for this seller, whatever the database holds (law 11: read into
    -- variables first); the scenario follows from C = max_cities and holds for every cap of 1 or more.
    v_planname := public.seller_plan(v_seller);
    SELECT * INTO v_plan FROM public.coverage_plans cp WHERE cp.plan = v_planname;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'P-2 M-1c part 2 proof: no coverage plan % for the seller', v_planname;
    END IF;
    v_cmax := v_plan.max_cities;
    v_rmax := v_plan.max_regions;
    v_lmax := v_plan.max_countries;
    IF coalesce(v_cmax, 0) < 1 OR coalesce(v_rmax, 0) < 1 OR coalesce(v_lmax, 0) < 1 THEN
      RAISE EXCEPTION 'P-2 M-1c part 2 proof: the plan % has a cap below 1 (% / % / %)', v_planname, v_cmax, v_rmax, v_lmax;
    END IF;
    -- C + 1 scratch cities in the one scratch region (one region and one country never bind).
    FOR i IN 1..v_cmax + 1 LOOP
      INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
      VALUES ('city', v_code, 'E2E P2 M1c2 City ' || i, v_tag || '-c' || i, true, v_regA, 9.0 + i * 0.001, 38.7 + i * 0.001)
      RETURNING id INTO v_id;
      v_city := v_city || v_id;
    END LOOP;
    v_prim := v_city[v_cmax + 1];
    -- a: the primary saved LAST (position C + 1), the C others before it in the city order (positions 1 … C);
    -- b: one place, within the caps.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_prim, 'E2E P2 M1c2 a', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_a;
    INSERT INTO public.listing_locations (listing_id, location_id, position)
    SELECT v_a, o.id, o.n FROM unnest(v_city) WITH ORDINALITY AS o(id, n);
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city[1], 'E2E P2 M1c2 b', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_b;
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES (v_b, v_city[1], 1);
    SELECT string_agg(id::text || ':' || status || ':' || location_id::text || ':' || updated_at::text, ',' ORDER BY id)
      INTO v_snap FROM public.listings WHERE id IN (v_a, v_b);

    -- (b) the primary kept; the first C − 1 others kept in saved order; exactly the last other removed and answered.
    v_removed := public.listing_places_trim(v_a);
    IF v_removed IS DISTINCT FROM ARRAY[v_city[v_cmax]]
       OR (SELECT array_agg(ll.location_id ORDER BY ll.position) FROM public.listing_locations ll WHERE ll.listing_id = v_a)
          IS DISTINCT FROM (v_city[1:v_cmax - 1] || v_prim) THEN
      RAISE EXCEPTION 'P-2 M-1c part 2 proof (b): the trim did not keep the primary and the first % others (removed %)', v_cmax - 1, v_removed;
    END IF;
    v_removed := public.listing_places_trim(v_a);
    IF v_removed IS DISTINCT FROM ARRAY[]::uuid[]
       OR (SELECT count(*) FROM public.listing_locations ll WHERE ll.listing_id = v_a) <> v_cmax THEN
      RAISE EXCEPTION 'P-2 M-1c part 2 proof (b): a second trim moved something (%)', v_removed;
    END IF;
    v_removed := public.listing_places_trim(v_b);
    IF v_removed IS DISTINCT FROM ARRAY[]::uuid[]
       OR (SELECT array_agg(ll.location_id) FROM public.listing_locations ll WHERE ll.listing_id = v_b) IS DISTINCT FROM ARRAY[v_city[1]] THEN
      RAISE EXCEPTION 'P-2 M-1c part 2 proof (b): an ad within the caps was trimmed (%)', v_removed;
    END IF;
    SELECT string_agg(id::text || ':' || status || ':' || location_id::text || ':' || updated_at::text, ',' ORDER BY id)
      INTO v_snap2 FROM public.listings WHERE id IN (v_a, v_b);
    IF v_snap2 IS DISTINCT FROM v_snap
       OR EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id IN (v_a, v_b))
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id IN (v_a::text, v_b::text)) THEN
      RAISE EXCEPTION 'P-2 M-1c part 2 proof (b): the trim touched the ad beyond its places (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c2-proof-ok' THEN RAISE; END IF;
  END;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261105100200') ON CONFLICT DO NOTHING;
