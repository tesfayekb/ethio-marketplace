-- (no e2e-areas line: the nine policies answer every owner's own read of the listing and account tables, so every spec area is selected)

-- Cursor bundle 7a, Part 3, file C of five — NINE POLICIES ASK WHO IS SIGNED IN ONCE PER QUERY (INC-1283; brief
-- docs/governance/briefs/cursor-bundle-7a.md, ruling docs/governance/briefs/cursor-bundle-7a-ruling-1.md decision 7).
-- The Supabase performance advisor's auth_rls_initplan names nine row policies whose expression calls auth.uid() bare, so
-- it runs once per row. Each is changed by ALTER POLICY ... USING ((SELECT auth.uid()) ...): the expression is the policy's
-- last state byte for byte but for that wrapping, and its command, roles and permissive kind stay as they were (an ALTER
-- names none of them). Nothing else in the file changes a row, a grant or a function.
--   user_directory.directory_owner_read, profiles.profiles_owner_read, listings.listings_seller_read,
--   listing_photos.listing_photos_seller_read, listing_locations.listing_locations_owner_read,
--   seller_notices.seller_notices_own_read, listing_photo_warnings.listing_photo_warnings_seller_read,
--   listing_photo_reviews.listing_photo_reviews_seller_read, listing_reports.listing_reports_own_read.
-- The four storage.objects policies of the category assets already wrap their whole call, (SELECT public.has_permission(
-- auth.uid(), ...)), which Postgres plans as one InitPlan; they are not changed here (CF-RLS-1 reads them as wrapped).
-- Proofs on scratch rows under a sentinel rollback: the catalogue (each policy as its last state, then as this file leaves
-- it), then each table read as the row's owner and as another person with the new text and with the old one put back
-- (equal, and 1 and 0), then the plan of the seller's own listings read. Law 11, law 12, CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['user_directory', 'directory_owner_read'],
    ['profiles', 'profiles_owner_read'],
    ['listings', 'listings_seller_read'],
    ['listing_photos', 'listing_photos_seller_read'],
    ['listing_locations', 'listing_locations_owner_read'],
    ['seller_notices', 'seller_notices_own_read'],
    ['listing_photo_warnings', 'listing_photo_warnings_seller_read'],
    ['listing_photo_reviews', 'listing_photo_reviews_seller_read'],
    ['listing_reports', 'listing_reports_own_read']];
  i integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261125170100') THEN
    RAISE EXCEPTION 'cursor-bundle-7a file C: the mark 20261125170100 (file B) must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_policies p
                    WHERE p.schemaname = 'public' AND p.tablename = v_pairs[i][1] AND p.policyname = v_pairs[i][2]
                      AND p.cmd = 'SELECT' AND p.permissive = 'PERMISSIVE' AND p.roles = '{authenticated}'
                      AND p.with_check IS NULL
                      AND p.qual ~ 'auth\.uid\(\)' AND p.qual !~ 'SELECT auth\.uid\(\)') THEN
      RAISE EXCEPTION 'cursor-bundle-7a file C: the live policy % on % is not the bare-call policy this file was built from',
        v_pairs[i][2], v_pairs[i][1];
    END IF;
  END LOOP;
END $pre$;

-- the policies as they stand, for the proof (dropped at its end)
CREATE TEMP TABLE b7a_c_before AS
SELECT p.tablename, p.policyname, p.cmd, p.permissive, p.roles::text AS roles, p.qual, p.with_check
  FROM pg_policies p
 WHERE p.schemaname = 'public' AND (p.tablename, p.policyname) IN (
    ('user_directory', 'directory_owner_read'),
    ('profiles', 'profiles_owner_read'),
    ('listings', 'listings_seller_read'),
    ('listing_photos', 'listing_photos_seller_read'),
    ('listing_locations', 'listing_locations_owner_read'),
    ('seller_notices', 'seller_notices_own_read'),
    ('listing_photo_warnings', 'listing_photo_warnings_seller_read'),
    ('listing_photo_reviews', 'listing_photo_reviews_seller_read'),
    ('listing_reports', 'listing_reports_own_read'));

-- ------------------------------------------------------------ the nine policies
ALTER POLICY directory_owner_read ON public.user_directory
  USING ((SELECT auth.uid()) = user_id);

ALTER POLICY profiles_owner_read ON public.profiles
  USING ((SELECT auth.uid()) = user_id);

ALTER POLICY listings_seller_read ON public.listings
  USING ((SELECT auth.uid()) = seller_id);

ALTER POLICY listing_photos_seller_read ON public.listing_photos
  USING (EXISTS ( SELECT 1 FROM public.listings l WHERE l.id = listing_photos.listing_id AND l.seller_id = (SELECT auth.uid()) ));

ALTER POLICY listing_locations_owner_read ON public.listing_locations
  USING (EXISTS ( SELECT 1 FROM public.listings l WHERE l.id = listing_id AND l.seller_id = (SELECT auth.uid())));

ALTER POLICY seller_notices_own_read ON public.seller_notices
  USING (seller_id = (SELECT auth.uid()));

ALTER POLICY listing_photo_warnings_seller_read ON public.listing_photo_warnings
  USING (EXISTS (SELECT 1 FROM public.listings l WHERE l.id = listing_photo_warnings.listing_id AND l.seller_id = (SELECT auth.uid())));

ALTER POLICY listing_photo_reviews_seller_read ON public.listing_photo_reviews
  USING (EXISTS (SELECT 1 FROM public.listings l WHERE l.id = listing_photo_reviews.listing_id AND l.seller_id = (SELECT auth.uid())));

ALTER POLICY listing_reports_own_read ON public.listing_reports
  USING (reporter_id = (SELECT auth.uid()));

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) the catalogue: nine policies, each with the command, roles, permissive kind and WITH CHECK it had, its expression equal
--       to the old one once the wrapping is taken out, no bare auth.uid() left in any of the nine;
--   (b) rows: each table read as its row's owner (one row) and as another person (none), with this file's policies and with
--       the old text put back (the two answers equal), through the browser role and row security;
--   (c) the plan of the seller's own listings read holds an InitPlan.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_rep     uuid := gen_random_uuid();
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_l       uuid := gen_random_uuid();
  v_p       uuid := gen_random_uuid();
  v_r       record;
  v_who     uuid;
  v_key     text;
  v_call    text;
  v_want    text;
  v_text    text;
  v_msg     text;
  v_st      text;
  v_plan    text := '';
  v_now     jsonb := '{}'::jsonb;
  v_old     jsonb := '{}'::jsonb;
  v_phase   integer;
BEGIN
  -- (a) the catalogue
  IF (SELECT count(*) FROM b7a_c_before) <> 9 THEN
    RAISE EXCEPTION 'cursor-bundle-7a file C proof (a): % policies captured, not 9', (SELECT count(*) FROM b7a_c_before);
  END IF;
  FOR v_r IN SELECT b.*, p.qual AS now_qual, p.cmd AS now_cmd, p.permissive AS now_permissive, p.roles::text AS now_roles,
                    p.with_check AS now_check
               FROM b7a_c_before b
               LEFT JOIN pg_policies p ON p.schemaname = 'public' AND p.tablename = b.tablename AND p.policyname = b.policyname LOOP
    IF v_r.now_cmd IS DISTINCT FROM v_r.cmd OR v_r.now_permissive IS DISTINCT FROM v_r.permissive
       OR v_r.now_roles IS DISTINCT FROM v_r.roles OR v_r.now_check IS DISTINCT FROM v_r.with_check THEN
      RAISE EXCEPTION 'cursor-bundle-7a file C proof (a): % changed its command, roles, kind or check', v_r.policyname;
    END IF;
    IF v_r.now_qual IS NULL OR v_r.now_qual !~ '\( SELECT auth\.uid\(\) AS uid\)'
       OR regexp_replace(v_r.now_qual, '\( SELECT auth\.uid\(\) AS uid\)', 'auth.uid()', 'g') IS DISTINCT FROM v_r.qual THEN
      RAISE EXCEPTION 'cursor-bundle-7a file C proof (a): % is not its old expression with the call wrapped (% / %)',
        v_r.policyname, v_r.qual, v_r.now_qual;
    END IF;
    IF regexp_replace(v_r.now_qual, '\( SELECT auth\.uid\(\) AS uid\)', '', 'g') ~ 'auth\.uid\(\)' THEN
      RAISE EXCEPTION 'cursor-bundle-7a file C proof (a): % still calls auth.uid() bare', v_r.policyname;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-b7ac-' || substr(v_hex, 1, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'cursor-bundle-7a file C proof: the scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'cursor-bundle-7a file C proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-b7ac-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_rep, v_tag || '-r@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_b, v_rep]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- one refused ad of v_a's (not public): only its owner reads it and what hangs on it
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_l, v_a, v_cat, v_city, v_tag || ' three', 'A scratch ad for the policy proof.', v_code, 'free', 'rejected',
            NULL, NULL, NULL);
    INSERT INTO public.listing_locations (listing_id, location_id) VALUES (v_l, v_city);
    INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order, exif_stripped, unscreened)
    VALUES (v_p, v_l, v_tag || '/p', '{}'::jsonb, 0, true, false);
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes) VALUES (v_p, v_l, ARRAY['not_relevant']);
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence, created_at)
    VALUES (v_p, v_l, 'unsure', NULL, 'scratch evidence', timestamptz '1970-01-01 00:00:01+00');
    INSERT INTO public.seller_notices (seller_id, listing_id, kind, reason) VALUES (v_a, v_l, 'admin_edit', 'other');
    INSERT INTO public.listing_reports (listing_id, reporter_id, reason) VALUES (v_l, v_rep, 'spam');

    -- (b) phase 1: this file's policies; phase 2: the old text put back, read again
    FOR v_phase IN 1..2 LOOP
      IF v_phase = 2 THEN
        FOR v_r IN SELECT b.tablename, b.policyname, b.qual FROM b7a_c_before b LOOP
          EXECUTE format('ALTER POLICY %I ON public.%I USING (%s)', v_r.policyname, v_r.tablename, v_r.qual);
        END LOOP;
        IF EXISTS (SELECT 1 FROM pg_policies p JOIN b7a_c_before b USING (tablename, policyname)
                    WHERE p.schemaname = 'public' AND p.qual IS DISTINCT FROM b.qual) THEN
          RAISE EXCEPTION 'cursor-bundle-7a file C proof (b): the old text was not put back';
        END IF;
      END IF;
      -- every id below is an e2e-mig- scratch row's (this proof's own users, ad and rows)
      FOR v_key, v_who, v_call, v_want IN VALUES
        ('directory_owner', v_a, format('SELECT count(*)::text FROM public.user_directory WHERE user_id = %L', v_a), '1'),
        ('directory_other', v_b, format('SELECT count(*)::text FROM public.user_directory WHERE user_id = %L', v_a), '0'),
        ('profiles_owner', v_a, format('SELECT count(*)::text FROM public.profiles WHERE user_id = %L', v_a), '1'),
        ('profiles_other', v_b, format('SELECT count(*)::text FROM public.profiles WHERE user_id = %L', v_a), '0'),
        ('listings_owner', v_a, format('SELECT count(*)::text FROM public.listings WHERE id = %L', v_l), '1'),
        ('listings_other', v_b, format('SELECT count(*)::text FROM public.listings WHERE id = %L', v_l), '0'),
        ('photos_owner', v_a, format('SELECT count(*)::text FROM public.listing_photos WHERE id = %L', v_p), '1'),
        ('photos_other', v_b, format('SELECT count(*)::text FROM public.listing_photos WHERE id = %L', v_p), '0'),
        ('locations_owner', v_a, format('SELECT count(*)::text FROM public.listing_locations WHERE listing_id = %L', v_l), '1'),
        ('locations_other', v_b, format('SELECT count(*)::text FROM public.listing_locations WHERE listing_id = %L', v_l), '0'),
        ('notices_owner', v_a, format('SELECT count(*)::text FROM public.seller_notices WHERE listing_id = %L', v_l), '1'),
        ('notices_other', v_b, format('SELECT count(*)::text FROM public.seller_notices WHERE listing_id = %L', v_l), '0'),
        ('warnings_owner', v_a, format('SELECT count(*)::text FROM public.listing_photo_warnings WHERE photo_id = %L', v_p), '1'),
        ('warnings_other', v_b, format('SELECT count(*)::text FROM public.listing_photo_warnings WHERE photo_id = %L', v_p), '0'),
        ('reviews_owner', v_a, format('SELECT count(*)::text FROM public.listing_photo_reviews WHERE photo_id = %L', v_p), '1'),
        ('reviews_other', v_b, format('SELECT count(*)::text FROM public.listing_photo_reviews WHERE photo_id = %L', v_p), '0'),
        ('reports_owner', v_rep, format('SELECT count(*)::text FROM public.listing_reports WHERE listing_id = %L', v_l), '1'),
        ('reports_other', v_a, format('SELECT count(*)::text FROM public.listing_reports WHERE listing_id = %L', v_l), '0')
      LOOP
        PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who::text, 'role', 'authenticated')::text, true);
        EXECUTE 'SET LOCAL ROLE authenticated';
        v_msg := NULL; v_st := NULL; v_text := NULL;
        BEGIN
          EXECUTE v_call INTO v_text;
        EXCEPTION WHEN OTHERS THEN
          GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
        END;
        EXECUTE 'RESET ROLE';
        IF v_st IS NOT NULL OR v_text IS DISTINCT FROM v_want THEN
          RAISE EXCEPTION 'cursor-bundle-7a file C proof (b): % in phase % answered % (% %), not %',
            v_key, v_phase, v_text, v_st, v_msg, v_want;
        END IF;
        IF v_phase = 1 THEN v_now := v_now || jsonb_build_object(v_key, v_text);
        ELSE v_old := v_old || jsonb_build_object(v_key, v_text); END IF;
      END LOOP;
      -- (c) the plan, with this file's policies (phase 1)
      IF v_phase = 1 THEN
        PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
        EXECUTE 'SET LOCAL ROLE authenticated';
        FOR v_text IN EXECUTE format('EXPLAIN (COSTS OFF) SELECT id FROM public.listings WHERE seller_id = %L', v_a) LOOP
          v_plan := v_plan || E'\n' || v_text;
        END LOOP;
        EXECUTE 'RESET ROLE';
        IF v_plan !~ 'InitPlan' THEN
          RAISE EXCEPTION 'cursor-bundle-7a file C proof (c): the plan holds no InitPlan: %', v_plan;
        END IF;
      END IF;
    END LOOP;
    IF v_now IS DISTINCT FROM v_old OR (SELECT count(*) FROM jsonb_object_keys(v_now)) <> 18 THEN
      RAISE EXCEPTION 'cursor-bundle-7a file C proof (b): the answers differ between the new text and the old (% / %)', v_now, v_old;
    END IF;

    RAISE EXCEPTION 'b7a-c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'b7a-c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

DROP TABLE b7a_c_before;

INSERT INTO public.migration_marks (version) VALUES ('20261125170200') ON CONFLICT DO NOTHING;
