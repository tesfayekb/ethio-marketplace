-- e2e-areas: my-listings, door-refusals
-- P-2 turn (b) M-2a — THE SELLER'S PROMOTE OPTIONS, one reader door on the F1 mechanism (DEC-333; ruling 1
-- of docs/governance/briefs/p2-promote.md §1, DEC-349). One object:
-- public.promote_options(listing) — STABLE SECURITY DEFINER; door_context('reader') first (notSignedIn,
--    accountDeactivated; no dial), then ownership (the ad's seller is the caller, else listingNotFound), then
--    the door's own country rule — the location's country only, as set_listing_level reads it, never the
--    home-country fallback of my_listing (listingNotPlaced) — then the market row through market_settings_for
--    (marketNotSet). Refusals by door_refuse, RAISEd out (a reader has no shell and counts nothing).
--    Answer: {ok, status, level:{key, until, source}, country, paidLevels, currency, levels:[{key, name_en,
--    name_am, sort, current, below, days, amount, currency, availability}]} — one row per enabled self-serve
--    level in sort order; `below` is set_listing_level's lowerLevel rule (sort at or under the current
--    level's); `days` from level_perks_for, `amount` and the row's `currency` from product_price_for, and
--    `availability` (available | levelNotAvailable | seasonEnded | notOffered) by the same reads and the same
--    order as set_listing_level; the top `currency` is the ad's country's own. creditsNotAvailable stays
--    set_listing_level's answer at the moment of setting. Granted to authenticated and service_role.
-- Proofs at the end on scratch rows (markets XZ and XY, currency XTS, e2e_mig_ levels, reach, prices).

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261106120600')
     OR NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261104210000') THEN
    RAISE EXCEPTION 'P-2 (b) M-2a: F1-1 M-F1a (mark 20261106120600) and P-2 M-1b part 2 (mark 20261104210000) must be applied first';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE READER
CREATE FUNCTION public.promote_options(p_listing_id uuid)
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

  RETURN jsonb_build_object(
    'ok', true,
    'status', v_row.status,
    'level', jsonb_build_object('key', v_row.tier, 'until', v_row.tier_until, 'source', v_row.tier_source),
    'country', v_country,
    'paidLevels', v_market.paid_levels,
    'currency', (SELECT c.currency_code FROM public.countries c WHERE c.code = v_country),
    'levels', v_levels);
END $function$;
COMMENT ON FUNCTION public.promote_options(uuid) IS
  'The seller''s Promote sheet in one read (P-2 (b) M-2a, DEC-349): every enabled self-serve level with its days, amount and availability by the same reads and the same country rule as set_listing_level; the market''s paid switch; refusals by door_refuse (listingNotFound, listingNotPlaced, marketNotSet).';
REVOKE ALL ON FUNCTION public.promote_options(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.promote_options(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.promote_options(uuid) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the seller's answer on a live
-- ad at a scratch level: the ad's level, country, switch and currency, the scratch rows in sort order with
-- current, below, days, amount and availability, the disabled and the staff-only rows absent; (c) the
-- season rule answers seasonEnded; (d) each refusal by code (P0D01): notSignedIn, listingNotFound (another
-- seller), listingNotPlaced (an ad with no place), marketNotSet (no row and no default); the default row
-- answers a country without its own; (e) nothing written by any read (rate limits, revisions, audit rows,
-- the ads); (f) the answer agrees with set_listing_level: available sets, notOffered and below refuse.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.promote_options(uuid)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_other   uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2b-m2a-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lb      text := 'e2e_mig_lb_' || v_stem;
  v_lc      text := 'e2e_mig_lc_' || v_stem;
  v_lok     text := 'e2e_mig_lok_' || v_stem;
  v_lns     text := 'e2e_mig_lns_' || v_stem;
  v_ldis    text := 'e2e_mig_ldis_' || v_stem;
  v_lstaff  text := 'e2e_mig_lst_' || v_stem;
  v_r0      text := 'e2e_mig_r0_' || v_stem;
  v_code    char(2) := 'XZ';
  v_code2   char(2) := 'XY';
  v_cur     char(3) := 'XTS';
  v_lang    text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
  v_s       integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'level');
  v_anc     uuid;
  v_anc2    uuid;
  v_region  uuid;
  v_region2 uuid;
  v_city    uuid;
  v_city2   uuid;
  v_cat     uuid;
  v_a       uuid;
  v_u       uuid;
  v_x       uuid;
  v_until   timestamptz := now() + interval '5 days';
  v_answer  jsonb;
  v_mine    jsonb;
  v_lv      jsonb;
  v_case    text;
  v_msg     text;
  v_state   text;
  v_snap    text;
  v_snap2   text;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_door)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_door)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_door, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_door, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_door, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (b) M-2a proof (a): promote_options''s header or grants differ';
  END IF;

  BEGIN
    -- Two scratch markets (the INC-949 proof's way): XZ with its own market row, XY with none.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2)) THEN
      RAISE EXCEPTION 'P-2 (b) M-2a proof: a scratch code (% or %) already exists', v_code, v_code2;
    END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ' and 'XY').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2b-m2a', 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES
      (v_code, 'e2e-mig-p2b-m2a', true, v_cur),
      (v_code2, 'e2e-mig-p2b-m2a-2', true, v_cur);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2b-m2a';
    SELECT a.id INTO v_anc2 FROM public.locations a
     WHERE a.country_code = v_code2 AND a.level = 'country' AND a.name_en = 'e2e-mig-p2b-m2a-2';
    IF v_anc IS NULL OR v_anc2 IS NULL THEN RAISE EXCEPTION 'P-2 (b) M-2a proof: a scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id IN (v_anc, v_anc2) AND name_en LIKE 'e2e-mig-p2b-m2a%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2b M2a Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2b M2a City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code2, 'E2E P2b M2a Region 2', v_tag || '-r2', true, v_anc2) RETURNING id INTO v_region2;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code2, 'E2E P2b M2a City 2', v_tag || '-c2', true, v_region2, 9.03, 38.74) RETURNING id INTO v_city2;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_other,  v_tag || '-other@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    -- (f) calls set_listing_level as the seller: its write is a step the acceptance guard holds otherwise.
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT v_seller, v.id, v_lang, v_tag FROM public.legal_versions v
     WHERE v.status = 'published' AND v.effective_at <= now();
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2b M2a Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- Levels above every real one (sorts derived, never a real value): lb below the ad's lc; lok priced
    -- (20 days); lns unpriced (40 days); ldis disabled; lst staff-only (not self-serve).
    INSERT INTO public.listing_packages (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort) VALUES
      (v_lb,     'level', 'E2E P2b below',   'E2E ታች', 10, 6, 'boost', false, true,  true,  false, v_s + 1),
      (v_lc,     'level', 'E2E P2b current', NULL,      15, 6, 'boost', false, true,  true,  false, v_s + 2),
      (v_lok,    'level', 'E2E P2b offered', NULL,      20, 8, 'top',   true,  true,  true,  false, v_s + 3),
      (v_lns,    'level', 'E2E P2b unpriced', NULL,     40, 8, 'top',   true,  true,  true,  false, v_s + 4),
      (v_ldis,   'level', 'E2E P2b disabled', NULL,     10, 6, 'boost', false, false, true,  false, v_s + 5),
      (v_lstaff, 'level', 'E2E P2b staff',   NULL,      10, 6, 'boost', false, true,  false, false, v_s + 6);
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', 'E2E P2b reach 0', 30, true, false, false, 9001);
    INSERT INTO public.package_prices (package_key, country_code, amount, currency, credit_cost, valid_from)
    VALUES (v_lok, v_code, 7, v_cur, 1, now() - interval '1 hour');
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 1, v_r0, false);

    -- Ads: a live in XZ at lc until v_until; u with no place; x live in XY (no market row of its own), also
    -- above the baseline so the free-slot guard reads no market for it.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier, tier_until, tier_source)
    VALUES (v_seller, v_cat, v_city, 'E2E P2b M2a a', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days',
            v_lc, v_until, 'launch')
    RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_seller, v_cat, 'E2E P2b M2a u', 'scratch', v_code) RETURNING id INTO v_u;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier, tier_until, tier_source)
    VALUES (v_seller, v_cat, v_city2, 'E2E P2b M2a x', 'scratch', v_code2, 'active', now(), now(), now() + interval '10 days',
            v_lc, v_until, 'launch')
    RETURNING id INTO v_x;

    SELECT concat_ws('|',
             (SELECT count(*) FROM public.rate_limits WHERE key IN (v_seller::text, v_other::text)),
             (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_a, v_u, v_x)),
             (SELECT count(*) FROM public.audit_log WHERE entity_id IN (v_a::text, v_u::text, v_x::text)),
             (SELECT string_agg(id::text || ':' || status || ':' || tier || ':' || coalesce(tier_until::text, '-') || ':' || coalesce(tier_source, '-'),
                                ',' ORDER BY id) FROM public.listings WHERE id IN (v_a, v_u, v_x)))
      INTO v_snap;

    -- (b) the seller's answer.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    v_answer := public.promote_options(v_a);
    SELECT coalesce(jsonb_agg(e ORDER BY o), '[]'::jsonb) INTO v_mine
      FROM jsonb_array_elements(v_answer->'levels') WITH ORDINALITY AS t(e, o)
     WHERE e->>'key' LIKE 'e2e_mig_%' || v_stem;
    IF (v_answer->>'ok')::boolean IS NOT TRUE OR v_answer->>'status' <> 'active'
       OR v_answer->'level'->>'key' <> v_lc OR (v_answer->'level'->>'until')::timestamptz <> v_until
       OR v_answer->'level'->>'source' <> 'launch'
       OR v_answer->>'country' <> v_code OR (v_answer->>'paidLevels')::boolean IS NOT FALSE
       OR v_answer->>'currency' <> v_cur
       OR jsonb_array_length(v_mine) <> 4
       OR ARRAY(SELECT e->>'key' FROM jsonb_array_elements(v_mine) e) <> ARRAY[v_lb, v_lc, v_lok, v_lns] THEN
      RAISE EXCEPTION 'P-2 (b) M-2a proof (b): the answer''s head or its scratch rows differ (%)', v_answer;
    END IF;
    v_lv := v_mine->0;
    IF (v_lv->>'current')::boolean OR NOT (v_lv->>'below')::boolean OR v_lv->>'name_en' <> 'E2E P2b below'
       OR v_lv->>'name_am' <> 'E2E ታች' OR (v_lv->>'sort')::integer <> v_s + 1 OR v_lv->>'availability' <> 'notOffered' THEN
      RAISE EXCEPTION 'P-2 (b) M-2a proof (b): the level below differs (%)', v_lv;
    END IF;
    v_lv := v_mine->1;
    IF NOT (v_lv->>'current')::boolean OR (v_lv->>'below')::boolean OR v_lv->'name_am' <> 'null'::jsonb
       OR (v_lv->>'days')::integer <> 15 THEN
      RAISE EXCEPTION 'P-2 (b) M-2a proof (b): the current level differs (%)', v_lv;
    END IF;
    v_lv := v_mine->2;
    IF (v_lv->>'current')::boolean OR (v_lv->>'below')::boolean OR (v_lv->>'days')::integer <> 20
       OR (v_lv->>'amount')::numeric <> 7 OR v_lv->>'currency' <> v_cur OR v_lv->>'availability' <> 'available' THEN
      RAISE EXCEPTION 'P-2 (b) M-2a proof (b): the offered level differs (%)', v_lv;
    END IF;
    v_lv := v_mine->3;
    IF (v_lv->>'current')::boolean OR (v_lv->>'below')::boolean OR (v_lv->>'days')::integer <> 40
       OR v_lv->'amount' <> 'null'::jsonb OR v_lv->'currency' <> 'null'::jsonb OR v_lv->>'availability' <> 'notOffered' THEN
      RAISE EXCEPTION 'P-2 (b) M-2a proof (b): the unpriced level differs (%)', v_lv;
    END IF;

    -- (c) the season rule: the category ends within the day, so every scratch level's days fall under 1.
    UPDATE public.categories SET visible_until = now() + interval '1 hour' WHERE id = v_cat AND slug LIKE 'e2e-mig-%';
    v_answer := public.promote_options(v_a);
    SELECT e INTO v_lv FROM jsonb_array_elements(v_answer->'levels') e WHERE e->>'key' = v_lok;
    IF v_lv->>'availability' <> 'seasonEnded' OR (v_lv->>'days')::integer <> 0 THEN
      RAISE EXCEPTION 'P-2 (b) M-2a proof (c): the season rule answered %', v_lv;
    END IF;
    UPDATE public.categories SET visible_until = NULL WHERE id = v_cat AND slug LIKE 'e2e-mig-%';

    -- (d) refusals by code. The default row answers XY while it exists; with none, marketNotSet. The real
    --     default row (if any) is parked on XZ inside this rolled-back block; a scratch default then answers.
    FOR v_case IN VALUES ('notSignedIn'), ('listingNotFound'), ('listingNotPlaced'), ('marketNotSet') LOOP
      CASE v_case
        WHEN 'notSignedIn' THEN PERFORM set_config('request.jwt.claims', '{}', true);
        WHEN 'listingNotFound' THEN PERFORM set_config('request.jwt.claims', json_build_object('sub', v_other::text, 'role', 'authenticated')::text, true);
        WHEN 'marketNotSet' THEN
          DELETE FROM public.market_settings WHERE country_code = v_code;
          UPDATE public.market_settings SET country_code = v_code WHERE country_code IS NULL;
        ELSE NULL;
      END CASE;
      v_msg := NULL; v_state := NULL; v_answer := NULL;
      BEGIN
        v_answer := public.promote_options(CASE v_case WHEN 'listingNotPlaced' THEN v_u WHEN 'marketNotSet' THEN v_x ELSE v_a END);
      EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
      END;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
      IF v_msg IS DISTINCT FROM v_case OR v_state IS DISTINCT FROM 'P0D01' THEN
        RAISE EXCEPTION 'P-2 (b) M-2a proof (d): % answered % (%)', v_case, coalesce(v_msg, v_answer::text), v_state;
      END IF;
    END LOOP;
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels, paid_levels_since, launch_credits, launch_days)
    VALUES (NULL, 1, v_r0, true, now(), 10, 30);
    v_answer := public.promote_options(v_x);
    IF v_answer->>'country' <> v_code2 OR (v_answer->>'paidLevels')::boolean IS NOT TRUE THEN
      RAISE EXCEPTION 'P-2 (b) M-2a proof (d): a country without its own row did not read the default (%)', v_answer;
    END IF;
    DELETE FROM public.market_settings WHERE country_code IS NULL AND included_reach = v_r0;
    UPDATE public.market_settings SET country_code = NULL WHERE country_code = v_code;
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 1, v_r0, false);

    -- (e) nothing any read wrote.
    SELECT concat_ws('|',
             (SELECT count(*) FROM public.rate_limits WHERE key IN (v_seller::text, v_other::text)),
             (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_a, v_u, v_x)),
             (SELECT count(*) FROM public.audit_log WHERE entity_id IN (v_a::text, v_u::text, v_x::text)),
             (SELECT string_agg(id::text || ':' || status || ':' || tier || ':' || coalesce(tier_until::text, '-') || ':' || coalesce(tier_source, '-'),
                                ',' ORDER BY id) FROM public.listings WHERE id IN (v_a, v_u, v_x)))
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 (b) M-2a proof (e): a read left a trace (% -> %)', v_snap, v_snap2;
    END IF;

    -- (f) the door agrees: the unpriced level refuses notOffered, the level below lowerLevel, the offered one sets.
    FOREACH v_case IN ARRAY ARRAY['notOffered', 'lowerLevel'] LOOP
      v_msg := NULL;
      BEGIN
        PERFORM public.set_listing_level(v_a, CASE v_case WHEN 'notOffered' THEN v_lns ELSE v_lb END);
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM v_case THEN
        RAISE EXCEPTION 'P-2 (b) M-2a proof (f): set_listing_level answered % where the reader said %', coalesce(v_msg, 'success'), v_case;
      END IF;
    END LOOP;
    v_answer := public.set_listing_level(v_a, v_lok);
    IF v_answer->>'level' <> v_lok OR (SELECT tier FROM public.listings WHERE id = v_a) <> v_lok THEN
      RAISE EXCEPTION 'P-2 (b) M-2a proof (f): the offered level did not set (%)', v_answer;
    END IF;
    v_answer := public.promote_options(v_a);
    IF v_answer->'level'->>'key' <> v_lok
       OR NOT (SELECT (e->>'below')::boolean FROM jsonb_array_elements(v_answer->'levels') e WHERE e->>'key' = v_lc) THEN
      RAISE EXCEPTION 'P-2 (b) M-2a proof (f): the answer after the set differs (%)', v_answer;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2b-m2a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2b-m2a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

-- ------------------------------------------------------------ 3. CLOSERS
REVOKE ALL ON FUNCTION public.promote_options(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.promote_options(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.promote_options(uuid) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261107001000') ON CONFLICT DO NOTHING;
