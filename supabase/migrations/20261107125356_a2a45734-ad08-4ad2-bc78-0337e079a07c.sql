-- e2e-areas: my-listings, feed, posting
-- P-2 turn (c) M-3b, part 1 of 5 — AN AD'S REACH AND ITS CAPS (docs/governance/briefs/p2-fold.md STEP 2;
-- ruling 1 of docs/governance/briefs/p2-fold-ruling-1.md §4; ruling 3 — DEC-351). Split by concern (rule 30:
-- about 25 KB a file): part 2 answers the reach in promote_options; parts 3–5 move the judge and its six
-- callers.
-- 1. public.listing_effective_reach(p_listing uuid) RETURNS text — THE one resolver of an ad's reach:
--    coalesce(l.reach, the included reach of the ad's market), the market by the judge's rule (the least
--    country of the ad's places; none = the default row, through market_settings_for). NULL for an unknown
--    ad. Service-only.
-- 2. public.listing_places_trim redeclared whole from 20261105080105 (its last declaration), header and
--    grants unchanged: the caps are the ad's market's included reach's (the sweep trims before it clears the
--    bought reach, so the trim never reads the resolver), and a NULL cap is no limit.
-- Proofs at the end on scratch rows (markets XZ / XY, currency XTS, e2e_mig_ keys), rolled back by the
-- sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261107120100') THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 1: M-3a part 2 (76d13245, mark 20261107120100) must be applied first';
  END IF;
  -- G39: the body this file redeclares is, live, the body of its last declaration.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.listing_places_trim(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '87161a988489cd5cc92dd4ac1c156601' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 1: live listing_places_trim is not 20261105080105''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE RESOLVER
CREATE FUNCTION public.listing_effective_reach(p_listing uuid)
RETURNS text
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $fn$
  SELECT coalesce(l.reach,
                  (public.market_settings_for((SELECT min(loc.country_code)
                                                 FROM public.listing_locations ll
                                                 JOIN public.locations loc ON loc.id = ll.location_id
                                                WHERE ll.listing_id = l.id))).included_reach)
    FROM public.listings l
   WHERE l.id = p_listing;
$fn$;
COMMENT ON FUNCTION public.listing_effective_reach(uuid) IS
  'An ad''s reach: the one it bought, else its market''s included reach — the market by the judge''s rule (the least country of its places; none = the default row). NULL for an unknown ad (P-2 (c) M-3b, DEC-351). Service-only.';
REVOKE ALL ON FUNCTION public.listing_effective_reach(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listing_effective_reach(uuid) TO service_role;

-- ------------------------------------------------------------ 2. THE TRIM
CREATE OR REPLACE FUNCTION public.listing_places_trim(p_listing_id uuid)
RETURNS uuid[]
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_row      public.listings%ROWTYPE;
  v_reach    text;
  v_plan     public.listing_packages%ROWTYPE;
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
  -- P-2 (c) M-3b (DEC-351): the caps of the reach the ad falls back to — its market's included reach (the sweep
  -- trims before it clears the bought one), the market by the judge's rule (the least country of the ad's places),
  -- read into a variable first (DEC-341). A NULL cap is no limit.
  v_reach := (public.market_settings_for((SELECT min(loc.country_code) FROM public.listing_locations ll
               JOIN public.locations loc ON loc.id = ll.location_id
              WHERE ll.listing_id = p_listing_id))).included_reach;
  SELECT * INTO v_plan FROM public.listing_packages k WHERE k.key = v_reach AND k.kind = 'reach';
  IF NOT FOUND THEN RAISE EXCEPTION 'listing_places_trim: no reach row % for %', v_reach, p_listing_id; END IF;
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
    IF (v_plan.max_cities IS NULL OR cardinality(v_c2) <= v_plan.max_cities)
       AND (v_plan.max_regions IS NULL OR cardinality(v_r2) <= v_plan.max_regions)
       AND (v_plan.max_countries IS NULL OR cardinality(v_l2) <= v_plan.max_countries) THEN
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
  'Cuts an ad''s places back to its market''s included reach''s caps (a NULL cap is no limit): the primary place first, then the saved order, within the distinct city / region / country caps; answers the removed place ids (P-2 M-1c, DEC-330; (c) M-3b, DEC-351). Service only; the caller records the revision.';
REVOKE ALL ON FUNCTION public.listing_places_trim(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listing_places_trim(uuid) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- Scratch rows only, rolled back by the sentinel; the only real rows read are the catalogue's reach sorts
-- (for a derived sort), read only. The real default market row, if any, is parked on XY inside the
-- rolled-back block.
--   (a) both functions' headers and grants;
--   (b) the trim's body is its last declaration's but for this file's fragments (md5 with the fragments put
--       back: 87161a988489cd5cc92dd4ac1c156601);
--   (c) the resolver: a bought reach; a market's included reach; an ad with no place reads the default
--       row's; an unknown ad answers NULL;
--   (d) the trim: an ad over its market's included caps (2 cities, regions uncapped, 1 country) keeps the
--       primary and the next place and answers the third; a second trim removes nothing; an ad within the
--       caps across two regions keeps both (a NULL cap is no limit); neither ad's row changes.
DO $proof$
DECLARE
  v_res     regprocedure := 'public.listing_effective_reach(uuid)'::regprocedure;
  v_trim    regprocedure := 'public.listing_places_trim(uuid)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2c-m3b1-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_rinc    text := 'e2e_mig_rinc_' || v_stem;
  v_rbig    text := 'e2e_mig_rbig_' || v_stem;
  v_rdef    text := 'e2e_mig_rdef_' || v_stem;
  v_code    char(2) := 'XZ';
  v_code2   char(2) := 'XY';
  v_cur     char(3) := 'XTS';
  v_s       integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'reach');
  v_ended   timestamptz := now() - interval '1 hour';
  v_anc     uuid;
  v_ra      uuid;
  v_rb      uuid;
  v_rc      uuid;
  v_c1      uuid;
  v_c2      uuid;
  v_c3      uuid;
  v_cat     uuid;
  v_a       uuid;
  v_b       uuid;
  v_u       uuid;
  v_removed uuid[];
  v_n       integer;
  v_src     text;
  v_pair    text[];
  v_pairs   text[][];
  v_md5     text;
  v_msg     text;
  v_snap    text;
  v_snap2   text;
BEGIN
  -- (a)
  IF (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_res)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_res)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_res, 'EXECUTE')
     OR has_function_privilege('authenticated', v_res, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_res, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 1 proof (a): listing_effective_reach''s header or grants differ';
  END IF;
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_trim)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_trim)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_trim, 'EXECUTE')
     OR has_function_privilege('authenticated', v_trim, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_trim, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 1 proof (a): listing_places_trim''s header or grants differ';
  END IF;

  -- (b) Both sides without chr(13) (INC-1056, law 13): prosrc, and each literal.
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_trim;
  v_pairs := ARRAY[
    ['  v_reach    text;
  v_plan     public.listing_packages%ROWTYPE;
',
     '  v_planname text;
  v_plan     public.coverage_plans%ROWTYPE;
'],
    ['  -- P-2 (c) M-3b (DEC-351): the caps of the reach the ad falls back to — its market''s included reach (the sweep
  -- trims before it clears the bought one), the market by the judge''s rule (the least country of the ad''s places),
  -- read into a variable first (DEC-341). A NULL cap is no limit.
  v_reach := (public.market_settings_for((SELECT min(loc.country_code) FROM public.listing_locations ll
               JOIN public.locations loc ON loc.id = ll.location_id
              WHERE ll.listing_id = p_listing_id))).included_reach;
  SELECT * INTO v_plan FROM public.listing_packages k WHERE k.key = v_reach AND k.kind = ''reach'';
  IF NOT FOUND THEN RAISE EXCEPTION ''listing_places_trim: no reach row % for %'', v_reach, p_listing_id; END IF;
',
     '  -- The caps the judge enforces, through its own reader (DEC-341: read into a variable first).
  v_planname := public.seller_plan(v_row.seller_id);
  SELECT * INTO v_plan FROM public.coverage_plans cp WHERE cp.plan = v_planname;
  IF NOT FOUND THEN RAISE EXCEPTION ''listing_places_trim: no coverage plan % for %'', v_planname, p_listing_id; END IF;
'],
    ['    IF (v_plan.max_cities IS NULL OR cardinality(v_c2) <= v_plan.max_cities)
       AND (v_plan.max_regions IS NULL OR cardinality(v_r2) <= v_plan.max_regions)
       AND (v_plan.max_countries IS NULL OR cardinality(v_l2) <= v_plan.max_countries) THEN
',
     '    IF cardinality(v_c2) <= v_plan.max_cities AND cardinality(v_r2) <= v_plan.max_regions
       AND cardinality(v_l2) <= v_plan.max_countries THEN
']];
  FOREACH v_pair SLICE 1 IN ARRAY v_pairs LOOP
    v_n := (length(v_src) - length(replace(v_src, replace(v_pair[1], chr(13), ''), ''))) / length(replace(v_pair[1], chr(13), ''));
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 1 proof (b): a listing_places_trim fragment occurs % times', v_n;
    END IF;
    v_src := replace(v_src, replace(v_pair[1], chr(13), ''), replace(v_pair[2], chr(13), ''));
  END LOOP;
  v_md5 := md5(v_src);
  IF v_md5 IS DISTINCT FROM '87161a988489cd5cc92dd4ac1c156601' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 1 proof (b): listing_places_trim differs from its last declaration beyond this file''s fragments (%)', v_md5;
  END IF;

  BEGIN
    -- Two scratch markets (the INC-949 proof's way): XZ with its own row, XY to park the real default on.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2)) THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 1 proof: a scratch code (% or %) already exists', v_code, v_code2;
    END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ' and 'XY').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2c-m3b1', 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES
      (v_code, 'e2e-mig-p2c-m3b1', true, v_cur),
      (v_code2, 'e2e-mig-p2c-m3b1-2', true, v_cur);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2c-m3b1';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 (c) M-3b part 1 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-p2c-m3b1%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3b1 Region A', v_tag || '-ra', true, v_anc) RETURNING id INTO v_ra;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3b1 Region B', v_tag || '-rb', true, v_anc) RETURNING id INTO v_rb;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3b1 Region C', v_tag || '-rc', true, v_anc) RETURNING id INTO v_rc;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3b1 City 1', v_tag || '-c1', true, v_ra, 9.03, 38.74) RETURNING id INTO v_c1;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3b1 City 2', v_tag || '-c2', true, v_rb, 9.03, 38.74) RETURNING id INTO v_c2;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3b1 City 3', v_tag || '-c3', true, v_rc, 9.03, 38.74) RETURNING id INTO v_c3;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2c M3b1 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- Reach rows above every real one (sorts derived, never a real value): rinc XZ's included reach (2
    -- cities, regions uncapped, 1 country); rbig bought and uncapped; rdef the scratch default's included.
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort, max_cities, max_regions, max_countries) VALUES
      (v_rinc, 'reach', 'E2E P2c reach included', 30, true, false, false, v_s + 1, 2,    NULL, 1),
      (v_rbig, 'reach', 'E2E P2c reach bought',   40, true, true,  false, v_s + 2, NULL, NULL, NULL),
      (v_rdef, 'reach', 'E2E P2c reach default',  30, true, false, false, v_s + 3, 1,    1,    1);
    -- Five free slots: both live ads sit at the baseline level in XZ (CF-SLOT-1).
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 5, v_rinc, false);
    UPDATE public.market_settings SET country_code = v_code2 WHERE country_code IS NULL;
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (NULL, 1, v_rdef, false);

    -- Ads: a live, bought rbig (its season ended, the sweep not yet run), in three cities of three regions;
    -- b live at XZ's included reach in two cities of two regions; u a draft with no place.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, reach, reach_until, reach_source)
    VALUES (v_seller, v_cat, v_c1, 'E2E P2c M3b1 a', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days',
            v_rbig, v_ended, 'launch')
    RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_c1, 'E2E P2c M3b1 b', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_b;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_seller, v_cat, 'E2E P2c M3b1 u', 'scratch', v_code) RETURNING id INTO v_u;
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES
      (v_a, v_c1, 1), (v_a, v_c2, 2), (v_a, v_c3, 3), (v_b, v_c1, 1), (v_b, v_c2, 2);

    -- (c)
    IF public.listing_effective_reach(v_a) IS DISTINCT FROM v_rbig
       OR public.listing_effective_reach(v_b) IS DISTINCT FROM v_rinc
       OR public.listing_effective_reach(v_u) IS DISTINCT FROM v_rdef
       OR public.listing_effective_reach(gen_random_uuid()) IS NOT NULL THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 1 proof (c): the resolver answered % / % / %',
        public.listing_effective_reach(v_a), public.listing_effective_reach(v_b), public.listing_effective_reach(v_u);
    END IF;

    -- (d)
    SELECT string_agg(id::text || ':' || status || ':' || location_id::text || ':' || coalesce(reach, '-') || ':'
                      || coalesce(reach_until::text, '-') || ':' || updated_at::text, ',' ORDER BY id)
      INTO v_snap FROM public.listings WHERE id IN (v_a, v_b);
    v_removed := public.listing_places_trim(v_a);
    IF v_removed IS DISTINCT FROM ARRAY[v_c3]
       OR (SELECT array_agg(ll.location_id ORDER BY ll.position) FROM public.listing_locations ll WHERE ll.listing_id = v_a)
          IS DISTINCT FROM ARRAY[v_c1, v_c2] THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 1 proof (d): the trim over the included caps answered %', v_removed;
    END IF;
    v_removed := public.listing_places_trim(v_a);
    IF v_removed IS DISTINCT FROM ARRAY[]::uuid[] THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 1 proof (d): a second trim removed %', v_removed;
    END IF;
    v_removed := public.listing_places_trim(v_b);
    IF v_removed IS DISTINCT FROM ARRAY[]::uuid[]
       OR (SELECT array_agg(ll.location_id ORDER BY ll.position) FROM public.listing_locations ll WHERE ll.listing_id = v_b)
          IS DISTINCT FROM ARRAY[v_c1, v_c2] THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 1 proof (d): an uncapped region count bound (%)', v_removed;
    END IF;
    SELECT string_agg(id::text || ':' || status || ':' || location_id::text || ':' || coalesce(reach, '-') || ':'
                      || coalesce(reach_until::text, '-') || ':' || updated_at::text, ',' ORDER BY id)
      INTO v_snap2 FROM public.listings WHERE id IN (v_a, v_b);
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 1 proof (d): the trim changed an ad''s row (% -> %)', v_snap, v_snap2;
    END IF;

    RAISE EXCEPTION 'p2c-m3b1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3b1-proof-ok' THEN RAISE; END IF;
  END;
END;
$proof$;

-- ------------------------------------------------------------ 4. CLOSERS
REVOKE ALL ON FUNCTION public.listing_effective_reach(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listing_effective_reach(uuid) TO service_role;
REVOKE ALL ON FUNCTION public.listing_places_trim(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listing_places_trim(uuid) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261107140000') ON CONFLICT DO NOTHING;
