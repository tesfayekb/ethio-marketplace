-- e2e-areas: posting, my-listings
-- P-2 turn (c) M-3b, part 3 of 6 — THE JUDGE READS THE AD'S REACH (docs/governance/briefs/p2-fold.md STEP 2;
-- ruling 1 of docs/governance/briefs/p2-fold-ruling-1.md §4; ruling 3 — DEC-351). Split by concern (rule 30:
-- about 25 KB a file); parts 4 to 6 pass the ad to the judge from its six callers.
-- 1. public.validate_listing_draft gains a trailing p_listing_id uuid DEFAULT NULL (DROP + CREATE: the argument
--    list changes; a caller still sending seventeen arguments resolves to the new one, judged as a new ad).
--    21.9 KB: computed insertion guarded by md5 (rule 30) — the live body CR-normalised (law 13), md5
--    6fdcdbc38cac35a964253bf7a2098b74 (20261103040808 :22), two unique fragments replaced (the plan's row type;
--    the plan's read), new md5 491536378cd106df1bc9c04359c93847, the live header and its arguments kept. The
--    caps are the ad's reach row's: listing_effective_reach(p_listing_id, v_market) (part 1) — the market the
--    sent places give, else the stored places' (ruling 4); with no ad, the included reach of the market the
--    places give (the judge's v_market); no reach row raises unknownReach; a NULL cap is no limit. Its grants
--    restated (service-only).
-- Proofs at the end on scratch rows (markets XZ / XY, currency XTS, e2e_mig_ keys), rolled back by the
-- sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261107140100') THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 3: part 2 (cf82e13d, mark 20261107140100) must be applied first';
  END IF;
  -- G39: the body this file rewrites is, live, the body the census read.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '6fdcdbc38cac35a964253bf7a2098b74' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 3: live validate_listing_draft is not 20261103040808''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE JUDGE (computed insertion, DROP + CREATE)
DO $ins$
DECLARE
  v_src text; v_norm text; v_new text;
  v_args text; v_result text;
  v_secdef boolean; v_volatile "char"; v_config text[];
  v_f1a text := '  v_plan    public.coverage_plans%ROWTYPE;
';
  v_f1b text := '  v_plan    public.listing_packages%ROWTYPE;
  v_reach   text;
';
  v_f2a text := '        SELECT * INTO v_plan FROM public.coverage_plans WHERE plan = public.seller_plan(p_uid);
';
  v_f2b text := '        -- P-2 (c) M-3b (DEC-351, ruling 1 §4): the caps are the ad''s reach row''s — its bought reach, else its
        -- market''s included one (listing_effective_reach, the one resolver), the market the sent places give, else
        -- the stored places''; with no ad yet, the included reach of the market the places give. A NULL cap is no
        -- limit: its comparison below never refuses.
        v_reach := CASE WHEN p_listing_id IS NULL THEN (public.market_settings_for(v_market)).included_reach
                        ELSE public.listing_effective_reach(p_listing_id, v_market) END;
        SELECT * INTO v_plan FROM public.listing_packages k WHERE k.key = v_reach AND k.kind = ''reach'';
        IF NOT FOUND THEN RAISE EXCEPTION ''unknownReach''; END IF;
';
BEGIN
  SELECT p.prosrc, pg_get_function_arguments(p.oid), pg_get_function_result(p.oid),
         p.prosecdef, p.provolatile, p.proconfig
    INTO v_src, v_args, v_result, v_secdef, v_volatile, v_config
    FROM pg_proc p
   WHERE p.oid = 'public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean)'::regprocedure;
  v_norm := replace(v_src, E'\r', '');
  IF md5(v_norm) <> '6fdcdbc38cac35a964253bf7a2098b74' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 3: old body md5 mismatch for validate_listing_draft: %', md5(v_norm);
  END IF;
  IF (length(v_norm) - length(replace(v_norm, v_f1a, ''))) / length(v_f1a) <> 1
     OR (length(v_norm) - length(replace(v_norm, v_f2a, ''))) / length(v_f2a) <> 1 THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 3: a fragment is not unique in validate_listing_draft';
  END IF;
  v_new := replace(replace(v_norm, v_f1a, v_f1b), v_f2a, v_f2b);
  IF md5(v_new) <> '491536378cd106df1bc9c04359c93847' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 3: new body md5 mismatch for validate_listing_draft: %', md5(v_new);
  END IF;
  IF v_config IS DISTINCT FROM ARRAY['search_path=public'] OR NOT v_secdef OR v_volatile <> 'v' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 3: validate_listing_draft''s live header differs (% % %)', v_secdef, v_volatile, v_config;
  END IF;
  EXECUTE 'DROP FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean)';
  -- The name by %I: a text census reading CREATE … FUNCTION <name>( would otherwise take this template for the
  -- judge's body (seller-names-allowlist.txt's validate_listing_draft line reads the declared text).
  EXECUTE format('CREATE FUNCTION public.%I(%s, p_listing_id uuid DEFAULT NULL::uuid) RETURNS %s LANGUAGE plpgsql SECURITY DEFINER VOLATILE SET search_path = public AS $m3b3$%s$m3b3$',
    'validate_listing_draft', v_args, v_result, v_new);
  PERFORM 1 FROM pg_proc p
   WHERE p.oid = 'public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean, uuid)'::regprocedure
     AND p.prosecdef AND p.provolatile = 'v' AND p.proconfig = ARRAY['search_path=public']
     AND p.pronargs = 18 AND p.pronargdefaults = 3
     AND md5(replace(p.prosrc, E'\r', '')) = '491536378cd106df1bc9c04359c93847';
  IF NOT FOUND THEN RAISE EXCEPTION 'P-2 (c) M-3b part 3: post-apply drift for validate_listing_draft'; END IF;
END $ins$;
REVOKE ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean, uuid) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- Scratch rows only, rolled back by the sentinel; the only real rows read are the catalogue's reach sorts (for a
-- derived sort), read only.
--   (a) the header, body (md5, law 13) and grants; the seventeen-argument judge is gone;
--   (b) the judge, as its callers call it (step 6, the places sent): a nationwide ad (bought; no city or region
--       cap, one country) keeps three cities in two regions; an ad at XZ's included reach (one city) is refused
--       coverageExceedsPlan:city for two; with no ad (seventeen arguments) the places' market's included reach
--       judges; a worldwide ad (no cap) keeps two countries, a nationwide one is refused the second.
DO $proof$
DECLARE
  v_val_fn  regprocedure := 'public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean, uuid)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2c-m3b3-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_rcity   text := 'e2e_mig_rcity_' || v_stem;
  v_rnat    text := 'e2e_mig_rnat_' || v_stem;
  v_rworld  text := 'e2e_mig_rworld_' || v_stem;
  v_code    char(2) := 'XZ';
  v_code2   char(2) := 'XY';
  v_cur     char(3) := 'XTS';
  v_s       integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'reach');
  v_anc     uuid;
  v_anc2    uuid;
  v_ra      uuid;
  v_rb      uuid;
  v_ry      uuid;
  v_a1      uuid;
  v_a2      uuid;
  v_b1      uuid;
  v_y1      uuid;
  v_cat     uuid;
  v_n       uuid;
  v_c       uuid;
  v_w       uuid;
  v_val     jsonb;
  v_msg     text;
BEGIN
  -- (a)
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_val_fn) IS DISTINCT FROM '491536378cd106df1bc9c04359c93847'
     OR (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR pronargs <> 18 OR pronargdefaults <> 3
           FROM pg_proc WHERE oid = v_val_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_val_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_val_fn, 'EXECUTE')
     OR has_function_privilege('authenticated', v_val_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_val_fn, 'EXECUTE')
     OR to_regprocedure('public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean)') IS NOT NULL THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 3 proof (a): validate_listing_draft''s body, header or grants differ';
  END IF;

  BEGIN
    -- Two scratch markets (the INC-949 proof's way): XZ with its own row (included reach: one city), XY with none.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2)) THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 3 proof: a scratch code (% or %) already exists', v_code, v_code2;
    END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ' and 'XY').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2c-m3b3', 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES
      (v_code, 'e2e-mig-p2c-m3b3', true, v_cur),
      (v_code2, 'e2e-mig-p2c-m3b3-2', true, v_cur);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2c-m3b3';
    SELECT a.id INTO v_anc2 FROM public.locations a
     WHERE a.country_code = v_code2 AND a.level = 'country' AND a.name_en = 'e2e-mig-p2c-m3b3-2';
    IF v_anc IS NULL OR v_anc2 IS NULL THEN RAISE EXCEPTION 'P-2 (c) M-3b part 3 proof: a scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id IN (v_anc, v_anc2) AND name_en LIKE 'e2e-mig-p2c-m3b3%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3b3 Region A', v_tag || '-ra', true, v_anc) RETURNING id INTO v_ra;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3b3 Region B', v_tag || '-rb', true, v_anc) RETURNING id INTO v_rb;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code2, 'E2E P2c M3b3 Region Y', v_tag || '-ry', true, v_anc2) RETURNING id INTO v_ry;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3b3 City A1', v_tag || '-a1', true, v_ra, 9.03, 38.74) RETURNING id INTO v_a1;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3b3 City A2', v_tag || '-a2', true, v_ra, 9.03, 38.74) RETURNING id INTO v_a2;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3b3 City B1', v_tag || '-b1', true, v_rb, 9.03, 38.74) RETURNING id INTO v_b1;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code2, 'E2E P2c M3b3 City Y1', v_tag || '-y1', true, v_ry, 9.03, 38.74) RETURNING id INTO v_y1;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2c M3b3 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- Reach rows above every real one (sorts derived, never a real value): rcity XZ's included (1 / 1 / 1);
    -- rnat nationwide (no city or region cap, one country); rworld no cap at all.
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort, max_cities, max_regions, max_countries) VALUES
      (v_rcity,  'reach', 'E2E P2c reach city',      30, true, false, false, v_s + 1, 1,    1,    1),
      (v_rnat,   'reach', 'E2E P2c reach nation',    30, true, true,  false, v_s + 2, NULL, NULL, 1),
      (v_rworld, 'reach', 'E2E P2c reach world',     30, true, true,  false, v_s + 3, NULL, NULL, NULL);
    -- Five free slots: the three live ads sit at the baseline level in XZ (CF-SLOT-1).
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 5, v_rcity, false);

    -- Ads, live and free-priced: n bought nationwide in three cities of two regions; c at XZ's included reach in
    -- two cities (over its cap: it predates it); w bought worldwide in XZ and XY.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at, reach, reach_until, reach_source)
    VALUES (v_seller, v_cat, v_a1, 'E2E P2c M3b3 n', 'scratch', v_code, 'free', 'active', now(), now(), now() + interval '10 days',
            v_rnat, now() + interval '5 days', 'launch')
    RETURNING id INTO v_n;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_a1, 'E2E P2c M3b3 c', 'scratch', v_code, 'free', 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_c;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at, reach, reach_until, reach_source)
    VALUES (v_seller, v_cat, v_a1, 'E2E P2c M3b3 w', 'scratch', v_code, 'free', 'active', now(), now(), now() + interval '10 days',
            v_rworld, now() + interval '5 days', 'launch')
    RETURNING id INTO v_w;
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES
      (v_n, v_a1, 1), (v_n, v_a2, 2), (v_n, v_b1, 3), (v_c, v_a1, 1), (v_c, v_a2, 2), (v_w, v_a1, 1), (v_w, v_y1, 2);

    -- (b) the coverage refusals of each judgement (the other steps' rules are not under test).
    v_val := public.validate_listing_draft(v_seller, 6::smallint, v_cat, 'E2E P2c M3b3 n', 'scratch', NULL, '{}'::jsonb,
               'free', NULL, NULL, NULL, NULL, ARRAY[v_a1, v_a2, v_b1], NULL, NULL, NULL, false, v_n);
    IF EXISTS (SELECT 1 FROM jsonb_array_elements(coalesce(v_val->'refusals', '[]'::jsonb)) r WHERE r->>'field' = 'coverage') THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 3 proof (b): a nationwide ad''s places were refused (%)', v_val;
    END IF;
    v_val := public.validate_listing_draft(v_seller, 6::smallint, v_cat, 'E2E P2c M3b3 c', 'scratch', NULL, '{}'::jsonb,
               'free', NULL, NULL, NULL, NULL, ARRAY[v_a1, v_a2], NULL, NULL, NULL, false, v_c);
    IF (SELECT coalesce(jsonb_agg(r->>'reason' ORDER BY r->>'reason'), '[]'::jsonb)
          FROM jsonb_array_elements(coalesce(v_val->'refusals', '[]'::jsonb)) r WHERE r->>'field' = 'coverage')
       IS DISTINCT FROM '["coverageExceedsPlan:city"]'::jsonb THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 3 proof (b): the included reach''s city cap did not judge (%)', v_val;
    END IF;
    v_val := public.validate_listing_draft(v_seller, 6::smallint, v_cat, 'E2E P2c M3b3 new', 'scratch', NULL, '{}'::jsonb,
               'free', NULL, NULL, NULL, NULL, ARRAY[v_a1, v_a2], NULL, NULL, NULL, false);
    IF (SELECT coalesce(jsonb_agg(r->>'reason' ORDER BY r->>'reason'), '[]'::jsonb)
          FROM jsonb_array_elements(coalesce(v_val->'refusals', '[]'::jsonb)) r WHERE r->>'field' = 'coverage')
       IS DISTINCT FROM '["coverageExceedsPlan:city"]'::jsonb THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 3 proof (b): a new ad was not judged by its market''s included reach (%)', v_val;
    END IF;
    v_val := public.validate_listing_draft(v_seller, 6::smallint, v_cat, 'E2E P2c M3b3 w', 'scratch', NULL, '{}'::jsonb,
               'free', NULL, NULL, NULL, NULL, ARRAY[v_a1, v_y1], NULL, NULL, NULL, false, v_w);
    IF EXISTS (SELECT 1 FROM jsonb_array_elements(coalesce(v_val->'refusals', '[]'::jsonb)) r WHERE r->>'field' = 'coverage') THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 3 proof (b): a worldwide ad''s two countries were refused (%)', v_val;
    END IF;
    v_val := public.validate_listing_draft(v_seller, 6::smallint, v_cat, 'E2E P2c M3b3 n', 'scratch', NULL, '{}'::jsonb,
               'free', NULL, NULL, NULL, NULL, ARRAY[v_a1, v_y1], NULL, NULL, NULL, false, v_n);
    IF (SELECT coalesce(jsonb_agg(r->>'reason' ORDER BY r->>'reason'), '[]'::jsonb)
          FROM jsonb_array_elements(coalesce(v_val->'refusals', '[]'::jsonb)) r WHERE r->>'field' = 'coverage')
       IS DISTINCT FROM '["coverageExceedsPlan:country"]'::jsonb THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 3 proof (b): a nationwide ad''s second country was not refused (%)', v_val;
    END IF;

    RAISE EXCEPTION 'p2c-m3b3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3b3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

-- ------------------------------------------------------------ 4. CLOSERS
REVOKE ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean, uuid) TO service_role;
INSERT INTO public.migration_marks (version) VALUES ('20261107140200') ON CONFLICT DO NOTHING;
