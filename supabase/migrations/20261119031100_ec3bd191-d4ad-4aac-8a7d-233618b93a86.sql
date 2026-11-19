-- e2e-areas: my-listings, admin-monetisation

-- Foundations 1, turn F1-6b, part 7 of 7 — THE PRICE RESOLVERS CLOSE TO BROWSER ROLES (DEC-333; brief
-- docs/governance/briefs/f1-doors-6b.md; census docs/governance/reports/f1-doors-6b.census.md).
-- product_price_for(text, uuid, character) is called by package_price_for and by three definer doors
-- (promote_options, set_listing_level, set_listing_reach), which run it as their owner; package_price_for(uuid,
-- text) is called by none. No browser code calls either, so their EXECUTE leaves anon, authenticated and PUBLIC.
-- The service role keeps it. Their bodies are unchanged (live md5s checked).

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119050500') THEN
    RAISE EXCEPTION 'F1-6b part 7: the mark 20261119050500 must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.package_price_for(uuid,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '68a7d7e26e100bbb55eacbde14c3c04e' THEN
    RAISE EXCEPTION 'F1-6b part 7: the live package_price_for is not its last declaration''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.product_price_for(text,uuid,character)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '4b6f682fd38679c23091ad077e0bba43' THEN
    RAISE EXCEPTION 'F1-6b part 7: the live product_price_for is not its last declaration''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. the resolvers close to browser roles
REVOKE EXECUTE ON FUNCTION public.package_price_for(uuid, text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.product_price_for(text, uuid, character) FROM anon, authenticated, PUBLIC;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) neither resolver is callable by a browser role or PUBLIC; the service role keeps it; the bodies unchanged;
--   (b) the seller's Promote sheet (promote_options, a definer) still prices a self-serve scratch level through the
--       resolver, while the seller's own direct call of either resolver is refused.
DO $proof$
DECLARE
  v_stem    text := translate(substr(md5(gen_random_uuid()::text), 1, 10), '0123456789', 'ghijkmnopr');
  v_tag     text;
  v_seller  uuid := gen_random_uuid();
  -- 'XZ' a scratch code no market holds; ISO 4217 keeps XTS for testing (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_cur     character(3) := 'XTS';
  v_lv      text;
  v_r       text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_ad      uuid;
  v_answer  jsonb;
  v_level   jsonb;
  v_fn      text;
  v_was     text;
  v_direct  text;
  v_direct2 text;
  v_msg     text;
BEGIN
  -- (a)
  FOR v_fn, v_was IN VALUES
    ('public.package_price_for(uuid,text)', '68a7d7e26e100bbb55eacbde14c3c04e'),
    ('public.product_price_for(text,uuid,character)', '4b6f682fd38679c23091ad077e0bba43')
  LOOP
    IF has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0) THEN
      RAISE EXCEPTION 'F1-6b part 7 proof (a): % is still granted to a browser role or PUBLIC', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn::regprocedure)
       IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6b part 7 proof (a): %''s body changed', v_fn;
    END IF;
  END LOOP;

  BEGIN
    v_tag := 'e2e-mig-f16b-7-' || v_stem;
    v_lv := 'e2e_mig_lv_' || v_stem;
    v_r := 'e2e_mig_rc_' || v_stem;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code)
       OR EXISTS (SELECT 1 FROM public.currencies WHERE code = v_cur) THEN
      RAISE EXCEPTION 'F1-6b part 7 proof: a scratch code (% or %) already exists', v_code, v_cur;
    END IF;
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, v_tag, 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES (v_code, v_tag, true, v_cur);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-6b part 7 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag, v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve,
                                         extends_lifetime, sort) VALUES
      (v_lv, 'level', v_tag, 10, 6, 'boost', false, true, true, false, 9000),
      (v_r, 'reach', v_tag, 30, NULL, NULL, false, true, false, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 5, v_r, false);
    INSERT INTO public.package_prices (package_key, country_code, category_id, amount, currency, credit_cost, valid_from)
    VALUES (v_lv, v_code, NULL, 42.50, v_cur, 0, now() - interval '1 day');
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, v_tag, 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_ad;
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES (v_ad, v_city, 1);

    -- (b) as the seller, through the browser role.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    SET LOCAL ROLE authenticated;
    v_answer := public.promote_options(v_ad);
    BEGIN
      PERFORM public.product_price_for(v_lv, v_cat, v_code);
      v_direct := 'answered';
    EXCEPTION WHEN insufficient_privilege THEN
      v_direct := 'refused';
    END;
    BEGIN
      PERFORM public.package_price_for(v_ad, v_lv);
      v_direct2 := 'answered';
    EXCEPTION WHEN insufficient_privilege THEN
      v_direct2 := 'refused';
    END;
    RESET ROLE;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT e INTO v_level FROM jsonb_array_elements(v_answer -> 'levels') e WHERE e ->> 'key' = v_lv;
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE
       OR (v_level -> 'amount')::numeric IS DISTINCT FROM 42.50
       OR v_level ->> 'currency' IS DISTINCT FROM 'XTS' THEN
      RAISE EXCEPTION 'F1-6b part 7 proof (b): the Promote sheet no longer prices the scratch level (%)', v_level;
    END IF;
    IF (v_direct, v_direct2) IS DISTINCT FROM ('refused', 'refused') THEN
      RAISE EXCEPTION 'F1-6b part 7 proof (b): the seller''s direct call of a resolver % / %', v_direct, v_direct2;
    END IF;

    RAISE EXCEPTION 'f1-6b-part-7-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6b-part-7-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119050600') ON CONFLICT DO NOTHING;
