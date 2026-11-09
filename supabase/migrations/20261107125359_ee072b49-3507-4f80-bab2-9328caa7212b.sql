-- e2e-areas: my-listings, posting
-- P-2 turn (c) M-3b, part 4 of 6 — THE SELLER'S LIVE DOORS PASS THEIR AD (docs/governance/briefs/p2-fold.md STEP 2;
-- ruling 1 of docs/governance/briefs/p2-fold-ruling-1.md §4; ruling 3 — DEC-351). Split by concern (rule 30:
-- about 25 KB a file): the doors that judge an ad's stored places, so its reach's caps apply to them.
-- 1. public.edit_my_listing passes its ad to the judge (11.7 KB: computed insertion guarded by md5, rule 30 — the
--    live body CR-normalised (law 13), md5 12c05d47758d54fe541961e7f5c8ce2d (20261019115951 with 20261105080108's
--    two fragments), one unique fragment replaced (the judge's last argument), new md5
--    77def52b1ce62164e8f2ee1a84af6715, the live header kept). Its grants restated.
-- 2. public.publish_listing redeclared whole from 20261104154001 (its last declaration), header, arguments and
--    grants unchanged, one fragment: the judge's last argument is its ad.
-- Proofs at the end on scratch rows (market XZ, currency XTS, e2e_mig_ keys), rolled back by the sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261107140200') THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 4: part 3 (704f04ac, mark 20261107140200) must be applied first';
  END IF;
  -- G39: each body this file rewrites is, live, the body the census read.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.edit_my_listing(uuid, jsonb, uuid[], text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '12c05d47758d54fe541961e7f5c8ce2d' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 4: live edit_my_listing is not 20261105080108''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.publish_listing(uuid, uuid[], text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '0eabacd706c7c4bb33bf1bfc556f834a' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 4: live publish_listing is not 20261104154001''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. edit_my_listing (computed insertion)
DO $ins$
DECLARE
  v_src text; v_norm text; v_new text;
  v_args text; v_result text;
  v_secdef boolean; v_volatile "char"; v_config text[]; v_defaults text; v_acl text;
  v_f1a text := '         ELSE v_prev.price_negotiable END);
';
  v_f1b text := '         ELSE v_prev.price_negotiable END, p_listing_id);
';
BEGIN
  SELECT p.prosrc, pg_get_function_arguments(p.oid), pg_get_function_result(p.oid),
         p.prosecdef, p.provolatile, p.proconfig,
         coalesce(p.proargdefaults::text, ''), coalesce(p.proacl::text, '')
    INTO v_src, v_args, v_result, v_secdef, v_volatile, v_config, v_defaults, v_acl
    FROM pg_proc p WHERE p.oid = 'public.edit_my_listing(uuid, jsonb, uuid[], text)'::regprocedure;
  v_norm := replace(v_src, E'\r', '');
  IF md5(v_norm) <> '12c05d47758d54fe541961e7f5c8ce2d' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 4: old body md5 mismatch for edit_my_listing: %', md5(v_norm);
  END IF;
  IF (length(v_norm) - length(replace(v_norm, v_f1a, ''))) / length(v_f1a) <> 1 THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 4: the fragment is not unique in edit_my_listing';
  END IF;
  v_new := replace(v_norm, v_f1a, v_f1b);
  IF md5(v_new) <> '77def52b1ce62164e8f2ee1a84af6715' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 4: new body md5 mismatch for edit_my_listing: %', md5(v_new);
  END IF;
  EXECUTE format('CREATE OR REPLACE FUNCTION public.edit_my_listing(%s) RETURNS %s LANGUAGE plpgsql SECURITY %s %s SET search_path = public AS $m3b4$%s$m3b4$',
    v_args, v_result,
    CASE WHEN v_secdef THEN 'DEFINER' ELSE 'INVOKER' END,
    CASE v_volatile WHEN 's' THEN 'STABLE' WHEN 'i' THEN 'IMMUTABLE' ELSE 'VOLATILE' END,
    v_new);
  PERFORM 1 FROM pg_proc p
   WHERE p.oid = 'public.edit_my_listing(uuid, jsonb, uuid[], text)'::regprocedure
     AND p.prosecdef = v_secdef AND p.provolatile = v_volatile
     AND coalesce(p.proconfig::text, '') = coalesce(v_config::text, '')
     AND coalesce(p.proargdefaults::text, '') = v_defaults
     AND coalesce(p.proacl::text, '') = v_acl
     AND md5(replace(p.prosrc, E'\r', '')) = '77def52b1ce62164e8f2ee1a84af6715';
  IF NOT FOUND THEN RAISE EXCEPTION 'P-2 (c) M-3b part 4: post-apply drift for edit_my_listing'; END IF;
END $ins$;
REVOKE ALL ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) TO service_role;

-- ------------------------------------------------------------ 2. publish_listing (whole from 20261104154001 :27)
CREATE OR REPLACE FUNCTION public.publish_listing(p_listing_id uuid, p_certified uuid[] DEFAULT NULL,
                                       p_language text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
  v_cov uuid[];
  v_val jsonb;
  v_rate jsonb;
  v_country char(2);
  v_market  public.market_settings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  v_rate := public.rate_gate('post');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited',
                         'resets_at', v_rate->>'resets_at')));
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('draft','rejected') THEN
    RAISE EXCEPTION 'illegal transition: % -> screening', v_row.status;
  END IF;

  -- M5 step 20 — the home-country check (bundle 3 step 12) and the naming
  -- check (step 22) live in the judge at step 8, so their refusals arrive
  -- with any others.
  SELECT array_agg(ll.location_id) INTO v_cov
    FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id;

  v_val := public.validate_listing_draft(v_uid, 8::smallint, v_row.category_id, v_row.title,
             v_row.description, v_row.video_url, v_row.attributes, v_row.price_mode,
             v_row.price_amount, v_row.price_currency, v_row.price_period,
             v_row.poster_expires_at, v_cov, v_row.contact_pref, v_row.attributes,
             v_row.price_bp, v_row.price_negotiable, p_listing_id);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  -- P-2 (a) M-1b (D305) — the free baseline: an ad at the baseline level publishes only while the seller's
  -- committed baseline ads in the ad's country (its primary place) are under the market's free_regular_ads.
  IF v_row.tier = public.baseline_level_key() THEN
    SELECT loc.country_code INTO v_country FROM public.locations loc WHERE loc.id = coalesce(v_row.location_id, v_cov[1]);
    IF v_country IS NULL THEN RAISE EXCEPTION 'listingNotPlaced'; END IF;
    v_market := public.market_settings_for(v_country);
    IF public.seller_regular_live(v_uid, v_country) >= v_market.free_regular_ads THEN
      RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
        jsonb_build_object('field', 'slots', 'reason', 'noFreeSlot', 'detail', v_market.free_regular_ads)));
    END IF;
  END IF;

  -- Bundle 22 turn 4 (L1 v2 item 4) — the acceptance and the publishing certification, before anything is written.
  PERFORM public.legal_certify(v_uid, p_listing_id, 'publish', p_certified, p_language);

  UPDATE public.listings SET
    status = 'screening',
    published_first_at = coalesce(published_first_at, now()),
    draft_step = 8,
    attested_at = now(),  -- M5 step 19 — the seller's statement, stamped on every publish
    updated_at = now()
  WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'screening'), v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $function$;
REVOKE ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_listing(uuid, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- Scratch rows only, rolled back by the sentinel; the real rows read are the catalogue's reach sorts (for a
-- derived sort) and the published legal versions (the seller's acceptances), read only.
--   (a) both headers and grants; edit_my_listing's body (md5, law 13); publish_listing's body is its last
--       declaration's but for this file's fragment (md5 with the fragment put back:
--       0eabacd706c7c4bb33bf1bfc556f834a);
--   (b) edit_my_listing as the seller, a title change (law 14): a nationwide ad's edit (bought; no city or
--       region cap) lands, to review, and its three places in two regions stay; an ad at its market's included
--       reach (one city) holding two is answered coverageExceedsPlan:city with nothing written — its row, its
--       places, revisions, audit rows, certifications — and its 'revise' dial spent once (the door's order: the
--       dial before the judge, unchanged here).
DO $proof$
DECLARE
  v_eml     regprocedure := 'public.edit_my_listing(uuid, jsonb, uuid[], text)'::regprocedure;
  v_pub     regprocedure := 'public.publish_listing(uuid, uuid[], text)'::regprocedure;
  v_fn      regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2c-m3b4-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_rcity   text := 'e2e_mig_rcity_' || v_stem;
  v_rnat    text := 'e2e_mig_rnat_' || v_stem;
  v_lang    text := 'q' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 2);
  v_code    char(2) := 'XZ';
  v_cur     char(3) := 'XTS';
  v_s       integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'reach');
  v_title   text := 'E2E P2c M3b4 edited';
  v_anc     uuid;
  v_ra      uuid;
  v_rb      uuid;
  v_a1      uuid;
  v_a2      uuid;
  v_b1      uuid;
  v_cat     uuid;
  v_n       uuid;
  v_c       uuid;
  v_ans     jsonb;
  v_cert    uuid[];
  v_k       integer;
  v_src     text;
  v_pair    text[];
  v_pairs   text[][];
  v_md5     text;
  v_msg     text;
  v_snap    text;
  v_snap2   text;
  v_dial    bigint;
BEGIN
  -- (a)
  FOREACH v_fn IN ARRAY ARRAY[v_eml, v_pub] LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 4 proof (a): the header or grants of % differ', v_fn;
    END IF;
  END LOOP;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_eml) IS DISTINCT FROM '77def52b1ce62164e8f2ee1a84af6715' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 4 proof (a): edit_my_listing''s body differs';
  END IF;
  -- Both sides without chr(13) (INC-1056, law 13): prosrc, and each literal.
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_pub;
  v_pairs := ARRAY[
    ['             v_row.price_bp, v_row.price_negotiable, p_listing_id);
',
     '             v_row.price_bp, v_row.price_negotiable);
']];
  FOREACH v_pair SLICE 1 IN ARRAY v_pairs LOOP
    v_k := (length(v_src) - length(replace(v_src, replace(v_pair[1], chr(13), ''), ''))) / length(replace(v_pair[1], chr(13), ''));
    IF v_k <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 4 proof (a): a publish_listing fragment occurs % times', v_k;
    END IF;
    v_src := replace(v_src, replace(v_pair[1], chr(13), ''), replace(v_pair[2], chr(13), ''));
  END LOOP;
  v_md5 := md5(v_src);
  IF v_md5 IS DISTINCT FROM '0eabacd706c7c4bb33bf1bfc556f834a' THEN
    RAISE EXCEPTION 'P-2 (c) M-3b part 4 proof (a): publish_listing differs from its last declaration beyond this file''s fragment (%)', v_md5;
  END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way); its included reach: one city.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 4 proof: the scratch code % already exists', v_code;
    END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2c-m3b4', 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES (v_code, 'e2e-mig-p2c-m3b4', true, v_cur);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2c-m3b4';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 (c) M-3b part 4 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-p2c-m3b4%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3b4 Region A', v_tag || '-ra', true, v_anc) RETURNING id INTO v_ra;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3b4 Region B', v_tag || '-rb', true, v_anc) RETURNING id INTO v_rb;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3b4 City A1', v_tag || '-a1', true, v_ra, 9.03, 38.74) RETURNING id INTO v_a1;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3b4 City A2', v_tag || '-a2', true, v_ra, 9.03, 38.74) RETURNING id INTO v_a2;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3b4 City B1', v_tag || '-b1', true, v_rb, 9.03, 38.74) RETURNING id INTO v_b1;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    -- The edits are the seller's: the acceptances and the certification name a scratch public language (INC-1040).
    INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
    VALUES (v_lang, v_tag, v_tag, true, true, 9001);
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT v_seller, v.id, v_lang, v_tag FROM public.legal_versions v
     WHERE v.status = 'published' AND v.effective_at <= now();
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2c M3b4 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- Reach rows above every real one (sorts derived, never a real value): rcity XZ's included (1 / 1 / 1);
    -- rnat nationwide (no city or region cap, one country).
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort, max_cities, max_regions, max_countries) VALUES
      (v_rcity, 'reach', 'E2E P2c reach city',   30, true, false, false, v_s + 1, 1,    1,    1),
      (v_rnat,  'reach', 'E2E P2c reach nation', 30, true, true,  false, v_s + 2, NULL, NULL, 1);
    -- Five free slots: both live ads sit at the baseline level in XZ (CF-SLOT-1).
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 5, v_rcity, false);

    -- Ads, live and free-priced: n bought nationwide in three cities of two regions; c at XZ's included reach in
    -- two cities (over its cap: it predates it).
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at, reach, reach_until, reach_source)
    VALUES (v_seller, v_cat, v_a1, 'E2E P2c M3b4 n', 'scratch', v_code, 'free', 'active', now(), now(), now() + interval '10 days',
            v_rnat, now() + interval '5 days', 'launch')
    RETURNING id INTO v_n;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_a1, 'E2E P2c M3b4 c', 'scratch', v_code, 'free', 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_c;
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES
      (v_n, v_a1, 1), (v_n, v_a2, 2), (v_n, v_b1, 3), (v_c, v_a1, 1), (v_c, v_a2, 2);

    -- (b) the seller.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    SELECT array_agg((e->>'version_id')::uuid) INTO v_cert FROM jsonb_array_elements(public.legal_publishing_set(v_n)) e;
    v_ans := public.edit_my_listing(v_n, jsonb_build_object('title', v_title), v_cert, v_lang);
    IF (v_ans->>'ok')::boolean IS NOT TRUE OR v_ans->>'status' <> 'screening'
       OR (SELECT title FROM public.listings WHERE id = v_n) IS DISTINCT FROM v_title
       OR (SELECT array_agg(ll.location_id ORDER BY ll.position) FROM public.listing_locations ll WHERE ll.listing_id = v_n)
          IS DISTINCT FROM ARRAY[v_a1, v_a2, v_b1] THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 4 proof (b): the nationwide ad''s edit did not land with its places (%)', v_ans;
    END IF;
    SELECT concat_ws('|',
             (SELECT id::text || ':' || status || ':' || title || ':' || updated_at::text FROM public.listings WHERE id = v_c),
             (SELECT string_agg(ll.location_id::text, ',' ORDER BY ll.position) FROM public.listing_locations ll WHERE ll.listing_id = v_c),
             (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_c),
             (SELECT count(*) FROM public.audit_log WHERE entity_id = v_c::text),
             (SELECT count(*) FROM public.listing_certifications WHERE listing_id = v_c))
      INTO v_snap;
    SELECT coalesce(sum(r.count), 0) INTO v_dial FROM public.rate_limits r WHERE r.key = v_seller::text AND r.action = 'revise';
    SELECT array_agg((e->>'version_id')::uuid) INTO v_cert FROM jsonb_array_elements(public.legal_publishing_set(v_c)) e;
    v_ans := public.edit_my_listing(v_c, jsonb_build_object('title', v_title), v_cert, v_lang);
    IF (v_ans->>'ok')::boolean IS NOT FALSE
       OR (SELECT coalesce(jsonb_agg(r->>'reason' ORDER BY r->>'reason'), '[]'::jsonb)
             FROM jsonb_array_elements(coalesce(v_ans->'refusals', '[]'::jsonb)) r)
          IS DISTINCT FROM '["coverageExceedsPlan:city"]'::jsonb THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 4 proof (b): the ad over its included cap was answered %', v_ans;
    END IF;
    SELECT concat_ws('|',
             (SELECT id::text || ':' || status || ':' || title || ':' || updated_at::text FROM public.listings WHERE id = v_c),
             (SELECT string_agg(ll.location_id::text, ',' ORDER BY ll.position) FROM public.listing_locations ll WHERE ll.listing_id = v_c),
             (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_c),
             (SELECT count(*) FROM public.audit_log WHERE entity_id = v_c::text),
             (SELECT count(*) FROM public.listing_certifications WHERE listing_id = v_c))
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 4 proof (b): a refused edit left a trace (% -> %)', v_snap, v_snap2;
    END IF;
    IF (SELECT coalesce(sum(r.count), 0) FROM public.rate_limits r WHERE r.key = v_seller::text AND r.action = 'revise')
       IS DISTINCT FROM v_dial + 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3b part 4 proof (b): the refused edit''s dial moved by other than one';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2c-m3b4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3b4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

-- ------------------------------------------------------------ 4. CLOSERS
REVOKE ALL ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) TO service_role;
REVOKE ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_listing(uuid, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261107140300') ON CONFLICT DO NOTHING;
