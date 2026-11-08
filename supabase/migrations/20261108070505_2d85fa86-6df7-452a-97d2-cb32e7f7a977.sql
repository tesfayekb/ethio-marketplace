-- e2e-areas: ad-page
-- P-2 turn (c) M-3c-a, part 6 of 6 — THE LEVEL'S LOOK ON THE AD PAGE (docs/governance/briefs/
-- p2-fold-c2a-ruling-2.md §1, §3 — DEC-352). It follows part 5 (the saved page).
-- public.public_listing_json (12.5 KB, over rule 30's 10 KB) by computed insertion guarded by md5 — the live body
-- CR-normalised (law 13), md5 0cde7e7441adfd35187f8b411af26f78 (20261029090431 (2c2b5ef0) :29), one unique fragment
-- replaced: beside `tier` the document answers `level` {key, placement, badge} from the ad's all-categories,
-- everywhere feed_index row, the row the cards read (so the page and the cards are stale together); NULL axes for a
-- level unknown or switched off, or an ad with no such row — never a resolver call, never an error; no dictionary.
-- New md5 658946271564eb7906d91729e995407b; the live header and its arguments kept; its grants restated (service-only).
-- The name goes through format('%I'): the seller-name census (scripts/conformance/seller-names.test.ts latestBodies,
-- INC-1083) takes a CREATE … FUNCTION <name>( template for the latest body, and this one keeps reading the last
-- declared text. Its one caller is public_listing (20261019223105 :203). Proofs at the end on scratch rows (market XZ,
-- currency XTS, e2e_mig_ keys), rolled back by the sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261108090400') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 6: part 5 (5e07ef82, mark 20261108090400) must be applied first';
  END IF;
  -- G39: the body this file rewrites is, live, the body the census read.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.public_listing_json(public.listings, uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '0cde7e7441adfd35187f8b411af26f78' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 6: live public_listing_json is not 20261029090431''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE AD PAGE'S DOCUMENT (computed insertion)
DO $ins$
DECLARE
  v_src text; v_norm text; v_new text;
  v_args text; v_result text;
  v_secdef boolean; v_volatile "char"; v_config text[];
  v_f1a text := '    ''tier'', l.tier,
';
  v_f1b text := '    ''tier'', l.tier,
    -- P-2 (c) M-3c-a (DEC-352): the level''s look — its key and the two axes the ad''s all-categories, everywhere
    -- feed row carries (written by feed_index_refresh from level_perks_for); NULL axes for a level unknown or
    -- switched off, or an ad with no such row.
    ''level'', (SELECT jsonb_build_object(''key'', l.tier, ''placement'', f.placement, ''badge'', f.badge)
                FROM (VALUES (1)) AS one (x)
                LEFT JOIN public.feed_index f
                  ON f.listing_id = l.id AND f.category_key = ''00000000-0000-0000-0000-000000000000''::uuid AND f.place_key = ''00000000-0000-0000-0000-000000000000''::uuid),
';
BEGIN
  SELECT p.prosrc, pg_get_function_arguments(p.oid), pg_get_function_result(p.oid),
         p.prosecdef, p.provolatile, p.proconfig
    INTO v_src, v_args, v_result, v_secdef, v_volatile, v_config
    FROM pg_proc p
   WHERE p.oid = 'public.public_listing_json(public.listings, uuid)'::regprocedure;
  v_norm := replace(v_src, E'\r', '');
  v_f1a := replace(v_f1a, E'\r', '');
  v_f1b := replace(v_f1b, E'\r', '');
  IF md5(v_norm) <> '0cde7e7441adfd35187f8b411af26f78' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 6: old body md5 mismatch for public_listing_json: %', md5(v_norm);
  END IF;
  IF (length(v_norm) - length(replace(v_norm, v_f1a, ''))) / length(v_f1a) <> 1 THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 6: the fragment is not unique in public_listing_json';
  END IF;
  v_new := replace(v_norm, v_f1a, v_f1b);
  IF md5(v_new) <> '658946271564eb7906d91729e995407b' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 6: new body md5 mismatch for public_listing_json: %', md5(v_new);
  END IF;
  IF v_config IS DISTINCT FROM ARRAY['search_path=public'] OR NOT v_secdef OR v_volatile <> 's' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 6: public_listing_json''s live header differs (% % %)', v_secdef, v_volatile, v_config;
  END IF;
  EXECUTE format('CREATE OR REPLACE FUNCTION public.%I(%s) RETURNS %s LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $m3ca6$%s$m3ca6$',
    'public_listing_json', v_args, v_result, v_new);
  PERFORM 1 FROM pg_proc p
   WHERE p.oid = 'public.public_listing_json(public.listings, uuid)'::regprocedure
     AND p.prosecdef AND p.provolatile = 's' AND p.proconfig = ARRAY['search_path=public']
     AND md5(replace(p.prosrc, E'\r', '')) = '658946271564eb7906d91729e995407b';
  IF NOT FOUND THEN RAISE EXCEPTION 'P-2 (c) M-3c-a part 6: post-apply drift for public_listing_json'; END IF;
END $ins$;
REVOKE ALL ON FUNCTION public.public_listing_json(public.listings, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.public_listing_json(public.listings, uuid) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel; the only real rows read are the level rows (a derived sort), read
-- only.
--   (a) the header and grants (service-only);
--   (b) the body, with its fragment put back, is 20261029090431's (md5);
--   (c) the document of an ad at a scratch level answers `level` as its index row holds it — that level's overrides
--       for its main category (badge) and for that category in its location's country (placement), written by the
--       refresh; an ad at a switched-off scratch level answers its key with NULL axes and is still answered; `tier`
--       is unchanged and no dictionary is answered;
--   (d) an ad with no all-categories, everywhere row (its scratch rows removed) answers its key with NULL axes.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.public_listing_json(public.listings, uuid)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2c-m3ca6-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lon     text := 'e2e_mig_lon_' || v_stem;
  v_loff    text := 'e2e_mig_loff_' || v_stem;
  v_code    char(2) := 'XZ';
  v_cur     char(3) := 'XTS';
  v_s       integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'level');
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_a       uuid;
  v_b       uuid;
  v_answer  jsonb;
  v_n       integer;
  v_src     text;
  v_pair    text[];
  v_pairs   text[][];
  v_md5     text;
  v_msg     text;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_door)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_door)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_door, 'EXECUTE')
     OR has_function_privilege('authenticated', v_door, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_door, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 6 proof (a): public_listing_json''s header or grants differ';
  END IF;

  -- (b) Both sides without chr(13) (INC-1056, law 13): prosrc, and each literal.
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_door;
  v_pairs := ARRAY[
    ['    ''tier'', l.tier,
    -- P-2 (c) M-3c-a (DEC-352): the level''s look — its key and the two axes the ad''s all-categories, everywhere
    -- feed row carries (written by feed_index_refresh from level_perks_for); NULL axes for a level unknown or
    -- switched off, or an ad with no such row.
    ''level'', (SELECT jsonb_build_object(''key'', l.tier, ''placement'', f.placement, ''badge'', f.badge)
                FROM (VALUES (1)) AS one (x)
                LEFT JOIN public.feed_index f
                  ON f.listing_id = l.id AND f.category_key = ''00000000-0000-0000-0000-000000000000''::uuid AND f.place_key = ''00000000-0000-0000-0000-000000000000''::uuid),
',
     '    ''tier'', l.tier,
']];
  FOREACH v_pair SLICE 1 IN ARRAY v_pairs LOOP
    v_n := (length(v_src) - length(replace(v_src, replace(v_pair[1], chr(13), ''), ''))) / length(replace(v_pair[1], chr(13), ''));
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 6 proof (b): the public_listing_json fragment occurs % times', v_n;
    END IF;
    v_src := replace(v_src, replace(v_pair[1], chr(13), ''), replace(v_pair[2], chr(13), ''));
  END LOOP;
  v_md5 := md5(v_src);
  IF v_md5 IS DISTINCT FROM '0cde7e7441adfd35187f8b411af26f78' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 6 proof (b): public_listing_json differs from its last declaration beyond this file''s fragment (%)', v_md5;
  END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way).
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 6 proof: the scratch code % already exists', v_code;
    END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2c-m3ca6', 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES (v_code, 'e2e-mig-p2c-m3ca6', true, v_cur);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2c-m3ca6';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 (c) M-3c-a part 6 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-p2c-m3ca6%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3ca6 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3ca6 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2c M3ca6 Main', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- Two levels above every real one (sorts derived, never a real value): lon enabled (standard, no badge),
    -- loff switched off (top, badge) — its perks are NULL.
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve,
                                         extends_lifetime, sort) VALUES
      (v_lon,  'level', 'E2E P2c level on',  30, 4, 'standard', false, true,  false, false, v_s + 1),
      (v_loff, 'level', 'E2E P2c level off', 30, 4, 'top',      true,  false, false, false, v_s + 2);
    -- lon's overrides: its main category everywhere (badge), and that category in XZ (placement).
    INSERT INTO public.level_overrides (level_key, category_id, country_code, placement, badge) VALUES
      (v_lon, v_cat, NULL,   NULL,    true),
      (v_lon, v_cat, v_code, 'boost', NULL);
    -- Ads: a at lon, b at loff, both live in the scratch category at the scratch city (staff marks: no end).
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier, tier_source)
    VALUES (v_seller, v_cat, v_city, 'E2E P2c M3ca6 a', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days',
            v_lon, 'staff')
    RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier, tier_source)
    VALUES (v_seller, v_cat, v_city, 'E2E P2c M3ca6 b', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days',
            v_loff, 'staff')
    RETURNING id INTO v_b;
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES (v_a, v_city, 1), (v_b, v_city, 1);

    -- (c)
    SELECT public.public_listing_json(l, NULL) INTO v_answer FROM public.listings l WHERE l.id = v_a;
    IF v_answer->'level' IS DISTINCT FROM jsonb_build_object('key', v_lon, 'placement', 'boost', 'badge', true)
       OR v_answer->>'tier' IS DISTINCT FROM v_lon OR v_answer ? 'levels' THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 6 proof (c): the ad page''s level differs (%)', v_answer->'level';
    END IF;
    SELECT public.public_listing_json(l, NULL) INTO v_answer FROM public.listings l WHERE l.id = v_b;
    IF v_answer->'level' IS DISTINCT FROM jsonb_build_object('key', v_loff, 'placement', NULL, 'badge', NULL)
       OR v_answer->>'tier' IS DISTINCT FROM v_loff OR v_answer ? 'levels' THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 6 proof (c): the switched-off ad page''s level differs (%)', v_answer->'level';
    END IF;
    -- (d)
    DELETE FROM public.feed_index WHERE listing_id = v_a;
    SELECT public.public_listing_json(l, NULL) INTO v_answer FROM public.listings l WHERE l.id = v_a;
    IF v_answer->'level' IS DISTINCT FROM jsonb_build_object('key', v_lon, 'placement', NULL, 'badge', NULL)
       OR v_answer->>'tier' IS DISTINCT FROM v_lon THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 6 proof (d): an ad with no index row does not answer NULL axes (%)', v_answer->'level';
    END IF;

    RAISE EXCEPTION 'p2c-m3ca6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3ca6-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_seller AND email LIKE 'e2e-mig-%')
     OR EXISTS (SELECT 1 FROM public.listing_packages WHERE key IN (v_lon, v_loff)) THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 6 proof: the scratch rows outlived the sentinel';
  END IF;
END;
$proof$;

-- ------------------------------------------------------------ 3. CLOSERS
REVOKE ALL ON FUNCTION public.public_listing_json(public.listings, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.public_listing_json(public.listings, uuid) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261108090500') ON CONFLICT DO NOTHING;
