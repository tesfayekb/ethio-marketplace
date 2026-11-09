-- e2e-areas: my-listings, posting
-- P-2 turn (c) M-3c-b, part 1 of 5 — AN AD'S CAPS (docs/governance/briefs/p2-fold-c2b-ruling-1.md §3 Q1, §4 (i);
-- DEC-356). It follows M-3c-a part 7 (4d6e08ad, mark 20261108130000).
-- 1. public.listing_caps(p_listing uuid, p_country character DEFAULT NULL) RETURNS jsonb — THE one resolver of the
--    caps that apply to an ad, composed of its two halves' resolvers: the photos are listing_photo_cap's (the ad's
--    level's perks), the places are the reach row's that listing_effective_reach names (the bought reach, else the
--    market's included reach). The keys are get_posting_schema's plan block's (plan, max_photos, max_cities,
--    max_regions, max_countries), so the client has one caps shape for both sources; a NULL limit is no limit.
--    NULL — a typed absence — for an unknown ad or a reach with no row. Service-only, as its two siblings.
-- 2. public.my_listing_private(uuid) redeclared whole from its last declaration (20261003221958 :86), header,
--    body and grants byte for byte apart from one key: `caps`, the ad's caps through listing_caps (INC-1080: an ad
--    being edited obeys its own caps, never the posting document's baseline). The body names the row `v_row`,
--    so the call reads `public.listing_caps(v_row.id)`. admin_listing_detail is not changed (staff lock the photos
--    and places steps).
-- Proofs at the end on scratch rows (market XZ, currency XTS, e2e_mig_ keys), rolled back by the sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261108130000') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 1: M-3c-a part 7 (4d6e08ad, mark 20261108130000) must be applied first';
  END IF;
  -- G39: the body this file redeclares is, live, the body of its last declaration.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.my_listing_private(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '4d2baee59c0d512d02c1133a1a031979' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 1: live my_listing_private is not 20261003221958''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE RESOLVER
CREATE FUNCTION public.listing_caps(p_listing uuid, p_country character DEFAULT NULL::bpchar)
RETURNS jsonb
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $fn$
  SELECT jsonb_build_object(
           'plan',          r.key,
           'max_photos',    public.listing_photo_cap(p_listing),
           'max_cities',    r.max_cities,
           'max_regions',   r.max_regions,
           'max_countries', r.max_countries)
    FROM public.listing_packages r
   WHERE r.kind = 'reach'
     AND r.key = public.listing_effective_reach(p_listing, p_country);
$fn$;
COMMENT ON FUNCTION public.listing_caps(uuid, character) IS
  'An ad''s caps in the posting document''s plan shape: the photos through listing_photo_cap, the places from the reach row listing_effective_reach names (a NULL limit is no limit). NULL for an unknown ad or a reach with no row (P-2 (c) M-3c-b, DEC-356, p2-fold-c2b ruling 1 §3 Q1). Service-only.';
REVOKE ALL ON FUNCTION public.listing_caps(uuid, character) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listing_caps(uuid, character) TO service_role;

-- ------------------------------------------------------------ 2. THE OWNER'S READ
CREATE OR REPLACE FUNCTION public.my_listing_private(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings
   WHERE id = p_listing_id AND seller_id = v_uid;
  IF NOT FOUND THEN RAISE EXCEPTION 'not your listing'; END IF;
  RETURN jsonb_build_object(
    'listing_id', v_row.id,
    'contact_pref', v_row.contact_pref,
    'pin_lat', v_row.pin_lat,
    'pin_lng', v_row.pin_lng,
    'pin_precision', v_row.pin_precision,
    'pin_zoom', v_row.pin_zoom,
    'street_address', v_row.street_address,
    'directions', v_row.directions,
    'caps', public.listing_caps(v_row.id)
  );
END $function$;
REVOKE ALL ON FUNCTION public.my_listing_private(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing_private(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing_private(uuid) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- Scratch rows only, rolled back by the sentinel; no real row's value is an expectation.
--   (a) the headers and grants: listing_caps service-only; my_listing_private the seller's;
--   (b) my_listing_private, with its one addition taken back, is 20261003221958's body (md5);
--   (c) an ad on a scratch level (6 photos) with a scratch bought reach (cities NULL, regions 3, countries 1):
--       the seller's read answers caps {plan: that reach, max_photos: 6, max_cities: null, max_regions: 3,
--       max_countries: 1}, equal to listing_caps; every other key is unchanged;
--   (d) the same seller's second ad with no bought reach, placed in the scratch market: the market's included
--       reach's caps (2 / 1 / 1);
--   (e) an unknown ad's caps are NULL; another scratch seller is refused `not your listing`.
DO $proof$
DECLARE
  v_caps    regprocedure := 'public.listing_caps(uuid,character)'::regprocedure;
  v_door    regprocedure := 'public.my_listing_private(uuid)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_other   uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2c-m3cb1-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lvl     text := 'e2e_mig_lvl_' || v_stem;
  v_rbuy    text := 'e2e_mig_rbuy_' || v_stem;
  v_rinc    text := 'e2e_mig_rinc_' || v_stem;
  v_code    char(2) := 'XZ';
  v_cur     char(3) := 'XTS';
  v_sl      integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'level');
  v_sr      integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'reach');
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_a       uuid;
  v_b       uuid;
  v_answer  jsonb;
  v_n       integer;
  v_src     text;
  v_md5     text;
  v_msg     text;
  v_frag    text;
BEGIN
  -- (a)
  IF (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' OR pronargs <> 2
             OR pronargdefaults <> 1 FROM pg_proc WHERE oid = v_caps)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_caps)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_caps, 'EXECUTE')
     OR has_function_privilege('authenticated', v_caps, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_caps, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 1 proof (a): listing_caps''s header or grants differ';
  END IF;
  IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_door)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_door)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_door, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_door, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_door, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 1 proof (a): my_listing_private''s header or grants differ';
  END IF;

  -- (b) Both sides without chr(13), the fragment on one line of this file (INC-1056, INC-1089).
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_door;
  v_frag := replace(',' || chr(10) || '    ''caps'', public.listing_caps(v_row.id)', chr(13), '');
  v_n := (length(v_src) - length(replace(v_src, v_frag, ''))) / length(v_frag);
  IF v_n <> 1 THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 1 proof (b): the caps key occurs % times in my_listing_private', v_n;
  END IF;
  v_md5 := md5(replace(v_src, v_frag, ''));
  IF v_md5 IS DISTINCT FROM '4d2baee59c0d512d02c1133a1a031979' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 1 proof (b): my_listing_private differs from its last declaration beyond the caps key (%)', v_md5;
  END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way).
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 1 proof: the scratch code % already exists', v_code;
    END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2c-m3cb1', 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES (v_code, 'e2e-mig-p2c-m3cb1', true, v_cur);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2c-m3cb1';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 (c) M-3c-b part 1 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-p2c-m3cb1%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3cb1 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3cb1 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_other,  v_tag || '-other@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2c M3cb1 Main', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- Rows above every real one (sorts derived, never a real value): a level of 6 photos; a bought reach with
    -- no city limit, 3 regions, 1 country; the scratch market's included reach, 2 / 1 / 1.
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled,
                                         self_serve, extends_lifetime, sort)
    VALUES (v_lvl, 'level', 'E2E P2c M3cb1 level', 30, 6, 'standard', false, true, false, false, v_sl + 1);
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort,
                                         max_cities, max_regions, max_countries) VALUES
      (v_rbuy, 'reach', 'E2E P2c M3cb1 reach bought',   30, true, true,  false, v_sr + 1, NULL, 3, 1),
      (v_rinc, 'reach', 'E2E P2c M3cb1 reach included', 30, true, false, false, v_sr + 2, 2,    1, 1);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 5, v_rinc, false);
    -- Two drafts of the scratch seller at the scratch level in the scratch city: a with the bought reach (staff
    -- marks: no end), b with none.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 tier, tier_source, reach, reach_source)
    VALUES (v_seller, v_cat, v_city, 'E2E P2c M3cb1 a', 'scratch', v_code, v_lvl, 'staff', v_rbuy, 'staff')
    RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 tier, tier_source)
    VALUES (v_seller, v_cat, v_city, 'E2E P2c M3cb1 b', 'scratch', v_code, v_lvl, 'staff')
    RETURNING id INTO v_b;
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES (v_a, v_city, 1), (v_b, v_city, 1);

    PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_seller, 'role', 'authenticated')::text, true);
    -- (c)
    v_answer := public.my_listing_private(v_a);
    IF v_answer->'caps' IS DISTINCT FROM jsonb_build_object('plan', v_rbuy, 'max_photos', 6, 'max_cities', NULL,
                                                            'max_regions', 3, 'max_countries', 1)
       OR v_answer->'caps' IS DISTINCT FROM public.listing_caps(v_a) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 1 proof (c): a bought reach''s caps differ (%)', v_answer->'caps';
    END IF;
    IF (SELECT array_agg(k ORDER BY k) FROM jsonb_object_keys(v_answer) k)
       IS DISTINCT FROM ARRAY['caps', 'contact_pref', 'directions', 'listing_id', 'pin_lat', 'pin_lng',
                              'pin_precision', 'pin_zoom', 'street_address']
       OR (v_answer->>'listing_id')::uuid IS DISTINCT FROM v_a THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 1 proof (c): the owner''s read answers other keys (%)', v_answer;
    END IF;
    -- (d)
    v_answer := public.my_listing_private(v_b);
    IF v_answer->'caps' IS DISTINCT FROM jsonb_build_object('plan', v_rinc, 'max_photos', 6, 'max_cities', 2,
                                                            'max_regions', 1, 'max_countries', 1) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 1 proof (d): the market''s included reach''s caps differ (%)', v_answer->'caps';
    END IF;
    -- (e)
    IF public.listing_caps(gen_random_uuid()) IS NOT NULL THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 1 proof (e): an unknown ad has caps';
    END IF;
    PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_other, 'role', 'authenticated')::text, true);
    BEGIN
      PERFORM public.my_listing_private(v_a);
      RAISE EXCEPTION 'P-2 (c) M-3c-b part 1 proof (e): another seller read the ad';
    EXCEPTION WHEN raise_exception THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      IF v_msg <> 'not your listing' THEN RAISE; END IF;
    END;

    RAISE EXCEPTION 'p2c-m3cb1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3cb1-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM auth.users WHERE id IN (v_seller, v_other) AND email LIKE 'e2e-mig-%')
     OR EXISTS (SELECT 1 FROM public.listing_packages WHERE key IN (v_lvl, v_rbuy, v_rinc)) THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-b part 1 proof: the scratch rows outlived the sentinel';
  END IF;
END;
$proof$;

-- ------------------------------------------------------------ 4. CLOSERS
REVOKE ALL ON FUNCTION public.listing_caps(uuid, character) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listing_caps(uuid, character) TO service_role;
REVOKE ALL ON FUNCTION public.my_listing_private(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing_private(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing_private(uuid) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261109070000') ON CONFLICT DO NOTHING;
