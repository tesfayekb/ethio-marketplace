-- e2e-areas: posting, my-listings
-- P-2 turn (c) M-3a, part 2 of 2 — AN AD'S PHOTO CAP (docs/governance/briefs/p2-fold.md STEP 2; ruling 1 of
-- docs/governance/briefs/p2-fold-ruling-1.md §1, §2 — DEC-351; D311: at most 4 / 8 / 12 photos for the three
-- levels). Split from part 1 (a new ad's caps and level) by concern (rule 30: about 25 KB a file).
-- 1. public.listing_photo_cap(p_listing uuid) RETURNS integer — the ad's level perks' max_photos through
--    level_perks_for(l.tier, l.category_id, the country of the ad's primary place): the country rule
--    set_listing_level and promote_options read; no place = no country's override. NULL when the ad is
--    unknown or its level has no perks (switched off, not a level row) — never a default. Service-only.
-- 2. public.register_listing_photo redeclared whole from 20261019140533 (its last declaration), header,
--    arguments and grants unchanged, one fragment: the cap is listing_photo_cap(p_listing_id), and a NULL
--    cap is refused (levelNotAvailable — the level door's word for perks that answer NULL), never an
--    unlimited cap. An ad that already holds more photos than its level's cap keeps them and adds none
--    until it is under the cap (ruling 1 §2); nothing is deleted.
-- Proofs at the end on scratch rows (market XZ, currency XTS, e2e_mig_ keys), rolled back by the sentinel.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261107120000') THEN
    RAISE EXCEPTION 'P-2 (c) M-3a part 2: part 1 (503c2e70, mark 20261107120000) must be applied first';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE PHOTO CAP
CREATE FUNCTION public.listing_photo_cap(p_listing uuid)
RETURNS integer
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $fn$
  SELECT (public.level_perks_for(l.tier, l.category_id, loc.country_code)->>'max_photos')::integer
    FROM public.listings l
    LEFT JOIN public.locations loc ON loc.id = l.location_id
   WHERE l.id = p_listing;
$fn$;
COMMENT ON FUNCTION public.listing_photo_cap(uuid) IS
  'An ad''s photo cap: its level''s max_photos through level_perks_for (the ad''s category, the country of its primary place). NULL when the ad is unknown or its level has no perks — never a default (P-2 (c) M-3a, D311, DEC-351). Service-only.';
REVOKE ALL ON FUNCTION public.listing_photo_cap(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listing_photo_cap(uuid) TO service_role;

-- ------------------------------------------------------------ 2. register_listing_photo
CREATE OR REPLACE FUNCTION public.register_listing_photo(
  p_listing_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[],
  p_review jsonb DEFAULT NULL,
  p_certified uuid[] DEFAULT NULL,
  p_language text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_seller uuid; v_status text; v_cap smallint; v_count int; v_label text;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'register_listing_photo is called by the photo route only';
  END IF;
  -- Bundle 16 turn 4a (D178, D183) — a photo kept for a person's review is stored hidden.
  v_label := public.listing_photo_review_label(p_unscreened, p_review);
  SELECT seller_id, status INTO v_seller, v_status FROM public.listings WHERE id = p_listing_id;
  IF v_seller IS NULL THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  -- D22, D311 (P-2 (c) M-3a) — the ad's level's photo cap is the authority; the route's cap is a mirror.
  -- A level with no perks (switched off, or no level row) is refused, never an unlimited cap.
  v_cap := public.listing_photo_cap(p_listing_id);
  IF v_cap IS NULL THEN
    RAISE EXCEPTION 'levelNotAvailable';
  END IF;
  SELECT count(*) INTO v_count FROM public.listing_photos WHERE listing_id = p_listing_id;
  IF v_count >= v_cap THEN
    RAISE EXCEPTION 'tooManyPhotos:%', v_cap;
  END IF;
  SELECT coalesce(max(display_order), -1) + 1 INTO v_order
    FROM public.listing_photos WHERE listing_id = p_listing_id;
  -- Bundle 22 turn 6 (L1 v2 item 4) — a photo added to a published ad is an edit: the acceptance and the
  -- publishing certification, before anything is written. A draft's photos are certified at its publish.
  IF v_status <> 'draft' THEN
    PERFORM public.legal_certify(v_seller, p_listing_id, 'edit', p_certified, p_language);
  END IF;
  -- D158 (bundle 13 turn 6) — a photo stored while photo screening is off is HELD:
  -- `unscreened`, shown to no buyer until staff approve the ad.
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (coalesce(p_photo_id, gen_random_uuid()), p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false))
  RETURNING id INTO p_photo_id;
  -- D154 B3 (bundle 13 turn 10) — the screen's warnings, seen by the seller and staff only.
  IF cardinality(coalesce(p_warnings, '{}'::text[])) > 0 THEN
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (p_photo_id, p_listing_id, p_warnings);
  END IF;
  -- Bundle 16 turn 4a (D178) — the photo's review: why it is hidden, until a person decides.
  IF v_label IS NOT NULL THEN
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence)
    VALUES (p_photo_id, p_listing_id, v_label, p_review->>'code',
            left(nullif(btrim(coalesce(p_review->>'evidence', '')), ''), 200));
  END IF;
  -- D154 B5 — a photo added to a live ad is listed for staff.
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id, codes)
    VALUES (p_listing_id, 'added', p_photo_id, coalesce(p_warnings, '{}'::text[]));
  END IF;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, p_photo_id),
    updated_at = now() WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order);
END $$;

REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- Scratch rows only, rolled back by the sentinel; the only real rows read are the catalogue's levels (read
-- only).
--   (a) both functions' headers and grants;
--   (b) register_listing_photo's body is its last declaration's body but for this file's one fragment (md5
--       with the fragment put back: dc559d337ee82106dcd6d86fb1a206b7, the body of 20261019140533);
--   (c) the cap: a scratch level's max_photos (3) for an ad with no place; its country's override (2) for
--       an ad placed in that country; the baseline row's value for a baseline ad (D311: 4); NULL for an
--       unknown ad and for an ad whose level is switched off;
--   (d) the door takes three photos under a cap of 3 and refuses the fourth tooManyPhotos:3; an ad whose
--       level is switched off is refused levelNotAvailable; neither refusal writes anything (the photo rows,
--       the ads' cover and stamp).
DO $proof$
DECLARE
  v_cap_fn  regprocedure := 'public.listing_photo_cap(uuid)'::regprocedure;
  v_reg     regprocedure := 'public.register_listing_photo(uuid,uuid,jsonb,integer,integer,integer,boolean,text[],jsonb,uuid[],text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2c-m3a2-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lv      text := 'e2e_mig_lv_' || v_stem;
  v_code    char(2) := 'XZ';
  v_cur     char(3) := 'XTS';
  v_s       integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'level');
  v_base    text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_a       uuid;
  v_b       uuid;
  v_c       uuid;
  v_i       integer;
  v_n       integer;
  v_src     text;
  v_pair    text[];
  v_pairs   text[][];
  v_md5     text;
  v_msg     text;
  v_state   text;
  v_snap    text;
  v_snap2   text;
BEGIN
  -- (a)
  IF (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_cap_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_cap_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_cap_fn, 'EXECUTE')
     OR has_function_privilege('authenticated', v_cap_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_cap_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof (a): listing_photo_cap''s header or grants differ';
  END IF;
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_reg)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_reg)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_reg, 'EXECUTE')
     OR has_function_privilege('authenticated', v_reg, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_reg, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof (a): register_listing_photo''s header or grants differ';
  END IF;

  -- (b) Both sides without chr(13) (INC-1056, law 13): prosrc, and each literal.
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_reg;
  v_pairs := ARRAY[
    ['  -- D22, D311 (P-2 (c) M-3a) — the ad''s level''s photo cap is the authority; the route''s cap is a mirror.
  -- A level with no perks (switched off, or no level row) is refused, never an unlimited cap.
  v_cap := public.listing_photo_cap(p_listing_id);
  IF v_cap IS NULL THEN
    RAISE EXCEPTION ''levelNotAvailable'';
  END IF;
',
     '  -- D22 — the plan''s photo cap is the authority; the route''s cap is a mirror.
  v_cap := public.plan_photo_cap(public.seller_plan(v_seller));
']];
  FOREACH v_pair SLICE 1 IN ARRAY v_pairs LOOP
    v_n := (length(v_src) - length(replace(v_src, replace(v_pair[1], chr(13), ''), ''))) / length(replace(v_pair[1], chr(13), ''));
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof (b): a register_listing_photo fragment occurs % times', v_n;
    END IF;
    v_src := replace(v_src, replace(v_pair[1], chr(13), ''), replace(v_pair[2], chr(13), ''));
  END LOOP;
  v_md5 := md5(v_src);
  IF v_md5 IS DISTINCT FROM 'dc559d337ee82106dcd6d86fb1a206b7' THEN
    RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof (b): register_listing_photo differs from its last declaration beyond this file''s fragment (%)', v_md5;
  END IF;

  BEGIN
    -- (c) a scratch market (the INC-949 proof's way), its places, a seller, a category, a scratch level with a
    --     country override, and three drafts.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof: the scratch code % already exists', v_code;
    END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2c-m3a2', 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES (v_code, 'e2e-mig-p2c-m3a2', true, v_cur);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2c-m3a2';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-p2c-m3a2%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3a2 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3a2 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2c M3a2 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_lv, 'level', 'E2E P2c M3a2 level', 10, 3, 'boost', false, true, true, false, v_s + 1);
    INSERT INTO public.level_overrides (level_key, category_id, country_code, max_photos)
    VALUES (v_lv, NULL, v_code, 2);
    v_base := public.baseline_level_key();

    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code, tier)
    VALUES (v_seller, v_cat, 'E2E P2c M3a2 a', 'scratch', v_code, v_lv) RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code, tier)
    VALUES (v_seller, v_cat, v_city, 'E2E P2c M3a2 b', 'scratch', v_code, v_lv) RETURNING id INTO v_b;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_seller, v_cat, 'E2E P2c M3a2 c', 'scratch', v_code) RETURNING id INTO v_c;

    IF public.listing_photo_cap(v_a) IS DISTINCT FROM 3 THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof (c): the level row''s cap answered %', public.listing_photo_cap(v_a);
    END IF;
    IF public.listing_photo_cap(v_b) IS DISTINCT FROM 2 THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof (c): the country''s override answered %', public.listing_photo_cap(v_b);
    END IF;
    IF (SELECT tier FROM public.listings WHERE id = v_c) IS DISTINCT FROM v_base
       OR public.listing_photo_cap(v_c) IS DISTINCT FROM (public.level_perks_for(v_base, v_cat, NULL::character)->>'max_photos')::integer
       OR public.listing_photo_cap(v_c) IS DISTINCT FROM (SELECT k.max_photos::integer FROM public.listing_packages k WHERE k.key = v_base)
       OR public.listing_photo_cap(v_c) IS DISTINCT FROM 4 THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof (c): a baseline ad''s cap is not the baseline row''s 4 (D311): %', public.listing_photo_cap(v_c);
    END IF;
    IF public.listing_photo_cap(gen_random_uuid()) IS NOT NULL THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof (c): an unknown ad answered a cap';
    END IF;
    UPDATE public.listing_packages SET enabled = false WHERE key = v_lv AND key LIKE 'e2e_mig_%';
    IF public.listing_photo_cap(v_b) IS NOT NULL THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof (c): a switched-off level answered a cap';
    END IF;
    UPDATE public.listing_packages SET enabled = true WHERE key = v_lv AND key LIKE 'e2e_mig_%';

    -- (d) the door, as the photo route calls it (no caller).
    PERFORM set_config('request.jwt.claims', '{}', true);
    FOR v_i IN 1..3 LOOP
      PERFORM public.register_listing_photo(v_a, NULL, jsonb_build_object('original', v_tag || '/a/' || v_i), 800, 600, 1000);
    END LOOP;
    IF (SELECT count(*) FROM public.listing_photos WHERE listing_id = v_a) <> 3 THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof (d): the door did not take three photos under a cap of 3';
    END IF;
    SELECT concat_ws('|',
             (SELECT count(*) FROM public.listing_photos WHERE listing_id IN (v_a, v_b)),
             (SELECT string_agg(id::text || ':' || coalesce(cover_photo_id::text, '-') || ':' || updated_at::text, ',' ORDER BY id)
                FROM public.listings WHERE id IN (v_a, v_b)))
      INTO v_snap;
    FOREACH v_msg IN ARRAY ARRAY['tooManyPhotos:3', 'levelNotAvailable'] LOOP
      IF v_msg = 'levelNotAvailable' THEN
        UPDATE public.listing_packages SET enabled = false WHERE key = v_lv AND key LIKE 'e2e_mig_%';
      END IF;
      v_state := NULL;
      BEGIN
        PERFORM public.register_listing_photo(CASE v_msg WHEN 'levelNotAvailable' THEN v_b ELSE v_a END, NULL,
                                              jsonb_build_object('original', v_tag || '/x'), 800, 600, 1000);
      EXCEPTION WHEN raise_exception THEN v_state := SQLERRM;
      END;
      IF v_state IS DISTINCT FROM v_msg THEN
        RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof (d): the door answered % where % was due', coalesce(v_state, 'success'), v_msg;
      END IF;
    END LOOP;
    SELECT concat_ws('|',
             (SELECT count(*) FROM public.listing_photos WHERE listing_id IN (v_a, v_b)),
             (SELECT string_agg(id::text || ':' || coalesce(cover_photo_id::text, '-') || ':' || updated_at::text, ',' ORDER BY id)
                FROM public.listings WHERE id IN (v_a, v_b)))
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 (c) M-3a part 2 proof (d): a refused photo left a trace (% -> %)', v_snap, v_snap2;
    END IF;

    RAISE EXCEPTION 'p2c-m3a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

-- ------------------------------------------------------------ 4. CLOSERS
REVOKE ALL ON FUNCTION public.listing_photo_cap(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listing_photo_cap(uuid) TO service_role;
REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261107120100') ON CONFLICT DO NOTHING;
