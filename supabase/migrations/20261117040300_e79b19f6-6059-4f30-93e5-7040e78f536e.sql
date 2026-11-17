-- e2e-areas: ad-page, posting, my-listings

-- Foundations 1, turn F1-5b, part 1 — THE COUNTERS' RACE CLOSED (INC-786, INC-821; brief
-- docs/governance/briefs/f1-doors-5b.md, census docs/governance/reports/f1-doors-5b.census.md D1).
-- count_listing_view, count_listing_share and register_listing_photo are redeclared WHOLE from their last
-- declarations (live md5 checked). The one change in each: the listing read that precedes the insert keyed to
-- the listing takes FOR KEY SHARE, so a DELETE of the ad waits for the call, or the read finds the ad gone and
-- the call answers as it does for an ad that is not there (false; 'listing not found'), never 23503.
-- Service-role bodies: no grant changes (the closers restate them as they stand).

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.count_listing_view(text,text,uuid)', 'a73daf2044f2806d6b6c7705a657db9a'],
    ['public.count_listing_share(text,text,text,uuid)', '0bd42a9afd017dc2ce87daf588e5dd63'],
    ['public.register_listing_photo(uuid,uuid,jsonb,integer,integer,integer,boolean,text[],jsonb,uuid[],text)',
     '93d1579d6124c073cc54b319c21637ca']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261116031300') THEN
    RAISE EXCEPTION 'F1-5b part 1: the ledger''s newest mark 20261116031300 must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5b part 1: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. count_listing_view (whole; the read held)
CREATE OR REPLACE FUNCTION public.count_listing_view(p_public_id text, p_rate_key text, p_viewer uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id     uuid;
  v_seller uuid;
  v_gate   jsonb;
BEGIN
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN RETURN false; END IF;
  IF p_rate_key IS NULL OR btrim(p_rate_key) = '' THEN RAISE EXCEPTION 'rate key required'; END IF;
  -- INC-786: held against a DELETE until the insert below; an ad gone first is not found.
  SELECT l.id, l.seller_id INTO v_id, v_seller FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))
     FOR KEY SHARE;
  IF NOT FOUND THEN RETURN false; END IF;
  -- The owner's own view is not a view.
  IF p_viewer IS NOT NULL AND p_viewer = v_seller THEN RETURN false; END IF;
  -- One count per address and ad per hour: the first call in the window counts, the rest do not.
  v_gate := public.consume_rate_limit('listing_view', p_rate_key || ':' || p_public_id, 1, interval '1 hour');
  IF NOT coalesce((v_gate->>'allowed')::boolean, false) THEN RETURN false; END IF;
  INSERT INTO public.listing_counters (listing_id, day, views) VALUES (v_id, current_date, 1)
  ON CONFLICT (listing_id, day) DO UPDATE SET views = public.listing_counters.views + 1;
  RETURN true;
END $$;

REVOKE ALL ON FUNCTION public.count_listing_view(text, text, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.count_listing_view(text, text, uuid) TO service_role;

-- ------------------------------------------------------------ 2. count_listing_share (whole; the read held)
CREATE OR REPLACE FUNCTION public.count_listing_share(p_public_id text, p_channel text, p_rate_key text, p_viewer uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id   uuid;
  v_gate jsonb;
BEGIN
  IF p_channel IS NULL OR p_channel NOT IN ('telegram', 'whatsapp', 'facebook', 'copy', 'qr') THEN
    RAISE EXCEPTION 'unknown share channel';
  END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN RETURN false; END IF;
  IF p_rate_key IS NULL OR btrim(p_rate_key) = '' THEN RAISE EXCEPTION 'rate key required'; END IF;
  -- INC-821: held against a DELETE until the insert below; an ad gone first is not found.
  SELECT l.id INTO v_id FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))
     FOR KEY SHARE;
  IF NOT FOUND THEN RETURN false; END IF;
  v_gate := public.consume_rate_limit('listing_share', p_rate_key || ':' || p_public_id || ':' || p_channel, 1, interval '1 hour');
  IF NOT coalesce((v_gate->>'allowed')::boolean, false) THEN RETURN false; END IF;
  INSERT INTO public.listing_counters (listing_id, day, shares_telegram, shares_whatsapp, shares_facebook, shares_copy, shares_qr)
  VALUES (v_id, current_date,
          (p_channel = 'telegram')::integer, (p_channel = 'whatsapp')::integer, (p_channel = 'facebook')::integer,
          (p_channel = 'copy')::integer, (p_channel = 'qr')::integer)
  ON CONFLICT (listing_id, day) DO UPDATE SET
    shares_telegram = public.listing_counters.shares_telegram + EXCLUDED.shares_telegram,
    shares_whatsapp = public.listing_counters.shares_whatsapp + EXCLUDED.shares_whatsapp,
    shares_facebook = public.listing_counters.shares_facebook + EXCLUDED.shares_facebook,
    shares_copy     = public.listing_counters.shares_copy     + EXCLUDED.shares_copy,
    shares_qr       = public.listing_counters.shares_qr       + EXCLUDED.shares_qr;
  RETURN true;
END $$;

REVOKE ALL ON FUNCTION public.count_listing_share(text, text, text, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.count_listing_share(text, text, text, uuid) TO service_role;

-- ------------------------------------------------------------ 3. register_listing_photo (whole; the read held)
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
  -- INC-786: held against a DELETE until the photo's rows are written; an ad gone first is not found.
  SELECT seller_id, status INTO v_seller, v_status FROM public.listings WHERE id = p_listing_id FOR KEY SHARE;
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

REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text)
  TO service_role;

-- Proof: catalog facts, then the calls on scratch rows under a sentinel rollback. A proof runs in one session,
-- so the concurrent DELETE itself is not staged here: the held read is proven by the body (its FOR KEY SHARE)
-- and a gone ad by its answer.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_a       uuid := gen_random_uuid();
  v_none    uuid := gen_random_uuid();
  v_r0      text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_al      uuid := gen_random_uuid();
  v_dl      uuid := gen_random_uuid();
  v_pub     text;
  v_answer  jsonb;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_pairs := ARRAY[
    ['public.count_listing_view(text,text,uuid)', '432c3665cdf402bfb0edaf348bb2a355', 'boolean'], -- new md5: count_listing_view
    ['public.count_listing_share(text,text,text,uuid)', 'af8a433d180156fb4eb45d02369be566', 'boolean'], -- new md5: count_listing_share
    ['public.register_listing_photo(uuid,uuid,jsonb,integer,integer,integer,boolean,text[],jsonb,uuid[],text)',
     '929cc633597fefdf1b837ee92719b368', 'jsonb']]; -- new md5: register_listing_photo
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> v_pairs[i][3]::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-5b part 1 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5b part 1 proof (a): %''s body differs from this file', v_fn;
    END IF;
    IF (SELECT p.prosrc !~ 'FROM public\.listings[^;]*FOR KEY SHARE;' FROM pg_proc p WHERE p.oid = v_fn) THEN
      RAISE EXCEPTION 'F1-5b part 1 proof (a): %''s listing read is not held', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15b1-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5b part 1 proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_none) THEN
      RAISE EXCEPTION 'F1-5b part 1 proof: the id no row holds is held';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5b part 1 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT v_a, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v
     WHERE v.status = 'published' AND v.effective_at <= now();
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_al, v_a, v_cat, v_city, v_tag || ' al', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status)
    VALUES (v_dl, v_a, v_cat, v_city, v_tag || ' dl', 'scratch', v_code, 'draft');
    SELECT public_id INTO v_pub FROM public.listings WHERE id = v_al;

    -- (b) a live ad counts; the owner's own view does not.
    IF public.count_listing_view(v_pub, v_tag || '-k1', NULL) IS DISTINCT FROM true
       OR public.count_listing_view(v_pub, v_tag || '-k2', v_a) IS DISTINCT FROM false
       OR public.count_listing_share(v_pub, 'copy', v_tag || '-k1', NULL) IS DISTINCT FROM true THEN
      RAISE EXCEPTION 'F1-5b part 1 proof (b): a live ad''s view or share did not count';
    END IF;
    IF (SELECT views::text || '/' || shares_copy::text FROM public.listing_counters WHERE listing_id = v_al AND day = current_date)
       IS DISTINCT FROM '1/1' THEN
      RAISE EXCEPTION 'F1-5b part 1 proof (b): the counters row is not one view and one share';
    END IF;
    -- (c) a photo registers on the draft, held read and all.
    v_answer := public.register_listing_photo(v_dl, NULL, jsonb_build_object('original', v_tag || '/p1.webp'), 10, 10, 100);
    IF NOT coalesce((v_answer ->> 'ok')::boolean AND (v_answer ->> 'display_order') = '0', false)
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE listing_id = v_dl AND storage_path = v_tag || '/p1.webp') THEN
      RAISE EXCEPTION 'F1-5b part 1 proof (c): the draft''s photo did not register (%)', v_answer;
    END IF;
    -- (d) the ad is gone: the counters answer false, the photo 'listing not found', and nothing is written.
    DELETE FROM public.listings WHERE id IN (v_al, v_dl) AND seller_id = v_a;
    IF public.count_listing_view(v_pub, v_tag || '-k3', NULL) IS DISTINCT FROM false
       OR public.count_listing_share(v_pub, 'qr', v_tag || '-k3', NULL) IS DISTINCT FROM false THEN
      RAISE EXCEPTION 'F1-5b part 1 proof (d): a gone ad''s view or share was not the quiet false';
    END IF;
    BEGIN
      PERFORM public.register_listing_photo(v_dl, NULL, jsonb_build_object('original', v_tag || '/p2.webp'), 10, 10, 100);
      RAISE EXCEPTION 'F1-5b part 1 proof (d): a gone ad''s photo registered';
    EXCEPTION WHEN raise_exception THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      IF v_msg <> 'listing not found' THEN RAISE; END IF;
    END;
    IF EXISTS (SELECT 1 FROM public.listing_counters WHERE listing_id IN (v_al, v_dl))
       OR EXISTS (SELECT 1 FROM public.listing_photos WHERE listing_id IN (v_al, v_dl)) THEN
      RAISE EXCEPTION 'F1-5b part 1 proof (d): a gone ad kept or gained a row';
    END IF;

    RAISE EXCEPTION 'f1-5b-part-1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5b-part-1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261117060000') ON CONFLICT DO NOTHING;
