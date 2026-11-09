-- e2e-areas: my-listings, door-refusals
-- P-2 turn (c) M-3b, part 2 of 5 — THE REACH IN THE PROMOTE ANSWER (docs/governance/briefs/p2-fold.md STEP 2;
-- ruling 1 of docs/governance/briefs/p2-fold-ruling-1.md §4; ruling 3 — DEC-351). Split by concern (rule 30:
-- about 25 KB a file); it reads part 1's resolver.
-- public.promote_options redeclared whole from 20261106233808 (its last declaration), header and grants
-- unchanged: beside the levels it answers `reach` (the ad's reach through listing_effective_reach, its until,
-- its source, the market's included key) and `reaches` (every enabled self-serve reach row with its days,
-- its price and the refusal set_listing_reach would answer, by that door's own reads and in its order).
-- Proofs at the end on scratch rows (market XZ, currency XTS, e2e_mig_ keys), rolled back by the sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261107140000') THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 2: part 1 (a2a45734, mark 20261107140000) must be applied first';
  END IF;
  -- G39: the body this file redeclares is, live, the body of its last declaration.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.promote_options(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '289edad282d69672248641cbef4a7224' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 2: live promote_options is not 20261106233808''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE ANSWER
CREATE OR REPLACE FUNCTION public.promote_options(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_ctx      public.door_ctx;
  v_row      public.listings%ROWTYPE;
  v_country  char(2);
  v_market   public.market_settings%ROWTYPE;
  v_cur_sort integer;
  v_level    public.listing_packages%ROWTYPE;
  v_perks    jsonb;
  v_days     integer;
  v_price    jsonb;
  v_levels   jsonb := '[]'::jsonb;
  v_reach    text;
  v_rsort    integer;
  v_reaches  jsonb := '[]'::jsonb;
BEGIN
  v_ctx := public.door_context('reader');
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id AND seller_id = v_ctx.uid;
  IF NOT FOUND THEN PERFORM public.door_refuse('listingNotFound'); END IF;
  SELECT loc.country_code INTO v_country FROM public.locations loc WHERE loc.id = v_row.location_id;
  IF v_country IS NULL THEN PERFORM public.door_refuse('listingNotPlaced'); END IF;
  BEGIN
    v_market := public.market_settings_for(v_country);
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'marketNotSet' THEN RAISE; END IF;
    PERFORM public.door_refuse('marketNotSet');
  END;
  SELECT k.sort INTO v_cur_sort FROM public.listing_packages k WHERE k.key = v_row.tier AND k.kind = 'level';

  FOR v_level IN
    SELECT * FROM public.listing_packages k
     WHERE k.kind = 'level' AND k.enabled AND k.self_serve
     ORDER BY k.sort, k.key
  LOOP
    v_perks := public.level_perks_for(v_level.key, v_row.category_id, v_country);
    v_days  := (v_perks->>'days')::integer;
    v_price := public.product_price_for(v_level.key, v_row.category_id, v_country);
    v_levels := v_levels || jsonb_build_array(jsonb_build_object(
      'key', v_level.key,
      'name_en', v_level.name_en,
      'name_am', v_level.name_am,
      'sort', v_level.sort,
      'current', v_level.key = v_row.tier,
      'below', v_level.key <> v_row.tier AND (v_cur_sort IS NULL OR v_level.sort <= v_cur_sort),
      'days', v_days,
      'amount', v_price->'amount',
      'currency', v_price->>'currency',
      'availability', CASE WHEN v_perks IS NULL THEN 'levelNotAvailable'
                           WHEN v_days IS NULL OR v_days < 1 THEN 'seasonEnded'
                           WHEN v_price IS NULL THEN 'notOffered'
                           ELSE 'available' END));
  END LOOP;

  -- P-2 (c) M-3b (DEC-351): the reach rows beside the levels, by set_listing_reach's reads in its order — the ad's
  -- reach through the one resolver; every enabled self-serve reach row with its days, its price for the ad's
  -- category and country, and the refusal set_listing_reach would answer (includedReach, unknownReach, sameReach,
  -- lowerReach, notOffered), else available. creditsNotAvailable stays the door's answer at the moment of setting.
  v_reach := public.listing_effective_reach(p_listing_id);
  SELECT k.sort INTO v_rsort FROM public.listing_packages k WHERE k.key = v_reach AND k.kind = 'reach';
  FOR v_level IN
    SELECT * FROM public.listing_packages k
     WHERE k.kind = 'reach' AND k.enabled AND k.self_serve
     ORDER BY k.sort, k.key
  LOOP
    v_price := public.product_price_for(v_level.key, v_row.category_id, v_country);
    v_reaches := v_reaches || jsonb_build_array(jsonb_build_object(
      'key', v_level.key,
      'name_en', v_level.name_en,
      'name_am', v_level.name_am,
      'sort', v_level.sort,
      'current', v_level.key = v_reach,
      'below', v_level.key <> v_reach AND (v_rsort IS NULL OR v_level.sort <= v_rsort),
      'days', v_level.days,
      'amount', v_price->'amount',
      'currency', v_price->>'currency',
      'availability', CASE WHEN v_level.key = v_market.included_reach THEN 'includedReach'
                           WHEN v_rsort IS NULL THEN 'unknownReach'
                           WHEN v_row.reach IS NOT NULL AND v_level.key = v_row.reach THEN 'sameReach'
                           WHEN v_level.sort <= v_rsort THEN 'lowerReach'
                           WHEN v_price IS NULL THEN 'notOffered'
                           ELSE 'available' END));
  END LOOP;

  RETURN jsonb_build_object(
    'ok', true,
    'status', v_row.status,
    'level', jsonb_build_object('key', v_row.tier, 'until', v_row.tier_until, 'source', v_row.tier_source),
    'country', v_country,
    'paidLevels', v_market.paid_levels,
    'currency', (SELECT c.currency_code FROM public.countries c WHERE c.code = v_country),
    'levels', v_levels,
    'reach', jsonb_build_object('key', v_reach, 'until', v_row.reach_until, 'source', v_row.reach_source,
                                'included', v_market.included_reach),
    'reaches', v_reaches);
END $function$;
COMMENT ON FUNCTION public.promote_options(uuid) IS
  'The seller''s Promote sheet in one read (P-2 (b) M-2a, DEC-349; (c) M-3b, DEC-351): every enabled self-serve level with its days, amount and availability by the same reads and the same country rule as set_listing_level; the ad''s reach and every enabled self-serve reach row by set_listing_reach''s reads; the market''s paid switch; refusals by door_refuse (listingNotFound, listingNotPlaced, marketNotSet).';
REVOKE ALL ON FUNCTION public.promote_options(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.promote_options(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.promote_options(uuid) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel; the real rows read are the catalogue's reach sorts (for a
-- derived sort) and the published legal versions (the seller's acceptances), read only.
--   (a) the header and grants;
--   (b) the body is its last declaration's but for this file's fragments (md5 with the fragments put back:
--       289edad282d69672248641cbef4a7224);
--   (c) the reach answer: its head and the scratch rows in sort order (the included row absent: not
--       self-serve), each with current, below, days, amount, currency and availability; a bought reach
--       answers sameReach and puts the rows under it lowerReach; nothing any read wrote;
--   (d) the answer agrees with set_listing_reach: lowerReach and notOffered refuse, available sets, and the
--       next answer carries the reach just set.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.promote_options(uuid)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2c-m3b2-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_rlow    text := 'e2e_mig_rlow_' || v_stem;
  v_rinc    text := 'e2e_mig_rinc_' || v_stem;
  v_rmid    text := 'e2e_mig_rmid_' || v_stem;
  v_rbig    text := 'e2e_mig_rbig_' || v_stem;
  v_lang    text := 'q' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 2);
  v_code    char(2) := 'XZ';
  v_cur     char(3) := 'XTS';
  v_s       integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'reach');
  v_until   timestamptz := now() + interval '5 days';
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_a       uuid;
  v_b       uuid;
  v_answer  jsonb;
  v_mine    jsonb;
  v_n       integer;
  v_src     text;
  v_pair    text[];
  v_pairs   text[][];
  v_md5     text;
  v_case    text;
  v_msg     text;
  v_snap    text;
  v_snap2   text;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_door)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_door)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_door, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_door, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_door, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof (a): promote_options''s header or grants differ';
  END IF;

  -- (b) Both sides without chr(13) (INC-1056, law 13): prosrc, and each literal.
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_door;
  v_pairs := ARRAY[
    ['  v_levels   jsonb := ''[]''::jsonb;
  v_reach    text;
  v_rsort    integer;
  v_reaches  jsonb := ''[]''::jsonb;
',
     '  v_levels   jsonb := ''[]''::jsonb;
'],
    ['  END LOOP;

  -- P-2 (c) M-3b (DEC-351): the reach rows beside the levels, by set_listing_reach''s reads in its order — the ad''s
  -- reach through the one resolver; every enabled self-serve reach row with its days, its price for the ad''s
  -- category and country, and the refusal set_listing_reach would answer (includedReach, unknownReach, sameReach,
  -- lowerReach, notOffered), else available. creditsNotAvailable stays the door''s answer at the moment of setting.
  v_reach := public.listing_effective_reach(p_listing_id);
  SELECT k.sort INTO v_rsort FROM public.listing_packages k WHERE k.key = v_reach AND k.kind = ''reach'';
  FOR v_level IN
    SELECT * FROM public.listing_packages k
     WHERE k.kind = ''reach'' AND k.enabled AND k.self_serve
     ORDER BY k.sort, k.key
  LOOP
    v_price := public.product_price_for(v_level.key, v_row.category_id, v_country);
    v_reaches := v_reaches || jsonb_build_array(jsonb_build_object(
      ''key'', v_level.key,
      ''name_en'', v_level.name_en,
      ''name_am'', v_level.name_am,
      ''sort'', v_level.sort,
      ''current'', v_level.key = v_reach,
      ''below'', v_level.key <> v_reach AND (v_rsort IS NULL OR v_level.sort <= v_rsort),
      ''days'', v_level.days,
      ''amount'', v_price->''amount'',
      ''currency'', v_price->>''currency'',
      ''availability'', CASE WHEN v_level.key = v_market.included_reach THEN ''includedReach''
                           WHEN v_rsort IS NULL THEN ''unknownReach''
                           WHEN v_row.reach IS NOT NULL AND v_level.key = v_row.reach THEN ''sameReach''
                           WHEN v_level.sort <= v_rsort THEN ''lowerReach''
                           WHEN v_price IS NULL THEN ''notOffered''
                           ELSE ''available'' END));
  END LOOP;

  RETURN jsonb_build_object(
',
     '  END LOOP;

  RETURN jsonb_build_object(
'],
    ['    ''levels'', v_levels,
    ''reach'', jsonb_build_object(''key'', v_reach, ''until'', v_row.reach_until, ''source'', v_row.reach_source,
                                ''included'', v_market.included_reach),
    ''reaches'', v_reaches);
',
     '    ''levels'', v_levels);
']];
  FOREACH v_pair SLICE 1 IN ARRAY v_pairs LOOP
    v_n := (length(v_src) - length(replace(v_src, replace(v_pair[1], chr(13), ''), ''))) / length(replace(v_pair[1], chr(13), ''));
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof (b): a promote_options fragment occurs % times', v_n;
    END IF;
    v_src := replace(v_src, replace(v_pair[1], chr(13), ''), replace(v_pair[2], chr(13), ''));
  END LOOP;
  v_md5 := md5(v_src);
  IF v_md5 IS DISTINCT FROM '289edad282d69672248641cbef4a7224' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof (b): promote_options differs from its last declaration beyond this file''s fragments (%)', v_md5;
  END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way).
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof: the scratch code % already exists', v_code;
    END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2c-m3b2', 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES (v_code, 'e2e-mig-p2c-m3b2', true, v_cur);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2c-m3b2';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-p2c-m3b2%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3b2 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3b2 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    -- (d) calls set_listing_reach as the seller: its write is a step the acceptance guard holds otherwise; the
    -- acceptances name a scratch language (INC-1040).
    INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
    VALUES (v_lang, v_tag, v_tag, true, false, 9001);
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT v_seller, v.id, v_lang, v_tag FROM public.legal_versions v
     WHERE v.status = 'published' AND v.effective_at <= now();
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2c M3b2 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- Reach rows above every real one (sorts derived, never a real value): rlow under XZ's included rinc
    -- (staff-only); rmid priced (20 days); rbig unpriced (40 days).
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
      (v_rlow, 'reach', 'E2E P2c reach low',      10, true, true,  false, v_s + 1),
      (v_rinc, 'reach', 'E2E P2c reach included', 30, true, false, false, v_s + 2),
      (v_rmid, 'reach', 'E2E P2c reach offered',  20, true, true,  false, v_s + 3),
      (v_rbig, 'reach', 'E2E P2c reach unpriced', 40, true, true,  false, v_s + 4);
    INSERT INTO public.package_prices (package_key, country_code, amount, currency, credit_cost, valid_from)
    VALUES (v_rmid, v_code, 7, v_cur, 1, now() - interval '1 hour');
    -- Five free slots: both live ads sit at the baseline level in XZ (CF-SLOT-1).
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 5, v_rinc, false);

    -- Ads: a live, bought rbig until v_until; b live at XZ's included reach.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, reach, reach_until, reach_source)
    VALUES (v_seller, v_cat, v_city, 'E2E P2c M3b2 a', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days',
            v_rbig, v_until, 'launch')
    RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E P2c M3b2 b', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_b;
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES (v_a, v_city, 1), (v_b, v_city, 1);

    -- (c)
    SELECT concat_ws('|',
             (SELECT count(*) FROM public.rate_limits WHERE key = v_seller::text),
             (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_a, v_b)),
             (SELECT count(*) FROM public.audit_log WHERE entity_id IN (v_a::text, v_b::text)),
             (SELECT string_agg(id::text || ':' || coalesce(reach, '-') || ':' || updated_at::text, ',' ORDER BY id)
                FROM public.listings WHERE id IN (v_a, v_b)))
      INTO v_snap;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    v_answer := public.promote_options(v_b);
    SELECT coalesce(jsonb_agg(e ORDER BY o), '[]'::jsonb) INTO v_mine
      FROM jsonb_array_elements(v_answer->'reaches') WITH ORDINALITY AS t(e, o)
     WHERE e->>'key' LIKE 'e2e_mig_%' || v_stem;
    IF (v_answer->>'ok')::boolean IS NOT TRUE OR jsonb_typeof(v_answer->'levels') IS DISTINCT FROM 'array'
       OR v_answer->'reach' IS DISTINCT FROM jsonb_build_object('key', v_rinc, 'until', NULL, 'source', NULL, 'included', v_rinc)
       OR ARRAY(SELECT e->>'key' FROM jsonb_array_elements(v_mine) e) IS DISTINCT FROM ARRAY[v_rlow, v_rmid, v_rbig] THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof (c): the answer''s reach or its scratch rows differ (%)', v_answer;
    END IF;
    IF v_mine->0 IS DISTINCT FROM jsonb_build_object('key', v_rlow, 'name_en', 'E2E P2c reach low', 'name_am', NULL,
         'sort', v_s + 1, 'current', false, 'below', true, 'days', 10, 'amount', NULL, 'currency', NULL,
         'availability', 'lowerReach')
       OR v_mine->2 IS DISTINCT FROM jsonb_build_object('key', v_rbig, 'name_en', 'E2E P2c reach unpriced', 'name_am', NULL,
         'sort', v_s + 4, 'current', false, 'below', false, 'days', 40, 'amount', NULL, 'currency', NULL,
         'availability', 'notOffered') THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof (c): the row below or the unpriced row differs (%)', v_mine;
    END IF;
    IF (v_mine->1->>'current')::boolean OR (v_mine->1->>'below')::boolean OR (v_mine->1->>'days')::integer <> 20
       OR (v_mine->1->>'amount')::numeric <> 7 OR v_mine->1->>'currency' <> v_cur
       OR v_mine->1->>'availability' <> 'available' THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof (c): the offered row differs (%)', v_mine->1;
    END IF;
    v_answer := public.promote_options(v_a);
    SELECT coalesce(jsonb_object_agg(e->>'key', e), '{}'::jsonb) INTO v_mine
      FROM jsonb_array_elements(v_answer->'reaches') e WHERE e->>'key' LIKE 'e2e_mig_%' || v_stem;
    IF v_answer->'reach'->>'key' IS DISTINCT FROM v_rbig
       OR (v_answer->'reach'->>'until')::timestamptz IS DISTINCT FROM v_until
       OR v_answer->'reach'->>'source' IS DISTINCT FROM 'launch'
       OR v_answer->'reach'->>'included' IS DISTINCT FROM v_rinc
       OR NOT (v_mine->v_rbig->>'current')::boolean OR v_mine->v_rbig->>'availability' <> 'sameReach'
       OR NOT (v_mine->v_rmid->>'below')::boolean OR v_mine->v_rmid->>'availability' <> 'lowerReach' THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof (c): a bought reach''s answer differs (%)', v_answer;
    END IF;
    SELECT concat_ws('|',
             (SELECT count(*) FROM public.rate_limits WHERE key = v_seller::text),
             (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_a, v_b)),
             (SELECT count(*) FROM public.audit_log WHERE entity_id IN (v_a::text, v_b::text)),
             (SELECT string_agg(id::text || ':' || coalesce(reach, '-') || ':' || updated_at::text, ',' ORDER BY id)
                FROM public.listings WHERE id IN (v_a, v_b)))
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof (c): a read left a trace (% -> %)', v_snap, v_snap2;
    END IF;

    -- (d)
    FOREACH v_case IN ARRAY ARRAY['lowerReach', 'notOffered'] LOOP
      v_msg := NULL;
      BEGIN
        PERFORM public.set_listing_reach(v_b, CASE v_case WHEN 'lowerReach' THEN v_rlow ELSE v_rbig END);
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM v_case THEN
        RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof (d): set_listing_reach answered % where the reader said %', coalesce(v_msg, 'success'), v_case;
      END IF;
    END LOOP;
    v_answer := public.set_listing_reach(v_b, v_rmid);
    IF v_answer->>'reach' IS DISTINCT FROM v_rmid OR (SELECT reach FROM public.listings WHERE id = v_b) IS DISTINCT FROM v_rmid THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof (d): the offered reach did not set (%)', v_answer;
    END IF;
    v_answer := public.promote_options(v_b);
    SELECT coalesce(jsonb_object_agg(e->>'key', e), '{}'::jsonb) INTO v_mine
      FROM jsonb_array_elements(v_answer->'reaches') e WHERE e->>'key' LIKE 'e2e_mig_%' || v_stem;
    IF v_answer->'reach'->>'key' IS DISTINCT FROM v_rmid OR v_answer->'reach'->>'source' IS DISTINCT FROM 'launch'
       OR v_mine->v_rmid->>'availability' <> 'sameReach' OR v_mine->v_rlow->>'availability' <> 'lowerReach' THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 2 proof (d): the answer after the set differs (%)', v_answer;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2c-m3b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

-- ------------------------------------------------------------ 3. CLOSERS
REVOKE ALL ON FUNCTION public.promote_options(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.promote_options(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.promote_options(uuid) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261107140100') ON CONFLICT DO NOTHING;
