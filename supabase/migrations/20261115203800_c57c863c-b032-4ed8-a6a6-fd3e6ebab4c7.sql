-- e2e-areas: posting, my-listings, door-refusals

-- Foundations 1, turn F1-5a, part 9 — THE PHOTOS-SOON AND COPY DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333, DEC-391; brief
-- docs/governance/briefs/f1-doors-5a.md, ruling docs/governance/briefs/f1-doors-5a-ruling-1.md).
-- set_listing_photos_soon and copy_my_listing are redeclared WHOLE from their last declarations (live md5
-- checked): ONE door_context('owner', …, 'draft') gate each, their refusals by door_refuse codes, the shell.
-- DEC-391: another seller's ad and an id no row holds answer notYourListing alike; copy_my_listing keeps
-- listingNotFound for the caller's own deleted ad. Folds: 'not signed in' → notSignedIn; 'account is deactivated' → accountDeactivated;
-- 'not your listing' / 'listing not found' → notYourListing / listingNotFound; 'photos soon is not editable' →
-- photosSoonNotEditable:<status>; 'a draft is not copied' / 'not copied' → notCopied:<status>; 'residency
-- unknown' → residencyUnknown.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.set_listing_photos_soon(uuid,boolean)', 'c5d2c31b7448076f78448f0cf7e22b1b'],
    ['public.copy_my_listing(uuid)', 'c639fa133b2d16458bc8e60992f4ea1a']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261116030600') THEN
    RAISE EXCEPTION 'F1-5a part 9: part 8 (mark 20261116030600) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'door_context' AND pronamespace = 'public'::regnamespace) THEN
    RAISE EXCEPTION 'F1-5a part 9: the door mechanism (door_context, door_refuse, door_refused) is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 9: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. set_listing_photos_soon (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.set_listing_photos_soon(p_listing_id uuid, p_on boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_on   boolean := coalesce(p_on, false);
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'draft');
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  -- DEC-391 (F1-5a) — an ad that is not the caller's, or no ad at all, is one answer.
  IF NOT FOUND OR v_row.seller_id <> v_uid THEN PERFORM public.door_refuse('notYourListing'); END IF;
  -- The statuses set_listing_pin accepts (bundle 17 turn 4, INC-666: 'closed' joins them, as it joined the pin door).
  IF v_row.status NOT IN ('draft','active','reduced','closed','paused','rejected','held','expired') THEN
    PERFORM public.door_refuse('photosSoonNotEditable', v_row.status);
  END IF;
  IF v_row.photos_soon IS DISTINCT FROM v_on THEN
    UPDATE public.listings SET photos_soon = v_on, updated_at = now() WHERE id = p_listing_id;
    INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
      VALUES (p_listing_id, v_uid, 'edit',
              jsonb_build_object('photos_soon', v_row.photos_soon),
              jsonb_build_object('photos_soon', v_on), v_uid);
  END IF;
  RETURN jsonb_build_object('ok', true, 'photos_soon', v_on);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('set_listing_photos_soon', 'draft', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.set_listing_photos_soon(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_photos_soon(uuid, boolean) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. copy_my_listing (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.copy_my_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_src  public.listings%ROWTYPE;
  v_row  public.listings%ROWTYPE;
  v_obs  char(2);
BEGIN
  -- A copy is a new draft: it counts against the posting form's own dial.
  PERFORM public.door_context('owner', NULL, NULL, 'draft');

  SELECT * INTO v_src FROM public.listings WHERE id = p_listing_id;
  -- DEC-391 (F1-5a) — an ad that is not the caller's, or no ad at all, is one answer; the caller's own deleted
  -- ad is gone.
  IF NOT FOUND OR v_src.seller_id <> v_uid THEN PERFORM public.door_refuse('notYourListing'); END IF;
  IF v_src.deleted_at IS NOT NULL THEN PERFORM public.door_refuse('listingNotFound'); END IF;
  IF v_src.status = 'draft' THEN PERFORM public.door_refuse('notCopied', 'draft'); END IF;
  -- A removed ad (staff's) or a refused one (screening's) is not posted again by copying it; a refused ad is edited.
  IF v_src.status IN ('removed', 'rejected') THEN PERFORM public.door_refuse('notCopied', v_src.status); END IF;
  -- DEC-068 — the home country of a new ad is the server's residency fact, as submit_listing writes it.
  SELECT d.observed_country_code INTO v_obs FROM public.user_directory d WHERE d.user_id = v_uid;
  IF v_obs IS NULL THEN PERFORM public.door_refuse('residencyUnknown'); END IF;

  -- D182 4 — Post a similar ad: a new draft with the ad's details — its category, words, answers, price, video
  -- link, places, pin and contact choice — and none of its photos, dates or marks. The posting form opens it on
  -- the photos step and judges every step again as the seller saves it.
  INSERT INTO public.listings (
    seller_id, category_id, location_id, title, description, attributes,
    price_amount, price_currency, price_bp, price_negotiable, price_mode, price_period,
    video_url, contact_pref, status, home_country_code, draft_step, draft_updated_at,
    price_unit, price_unit_text,
    pin_lat, pin_lng, pin_precision, pin_show_lat, pin_show_lng, pin_zoom, street_address, directions
  ) VALUES (
    v_uid, v_src.category_id, v_src.location_id, v_src.title, v_src.description, v_src.attributes,
    v_src.price_amount, v_src.price_currency, v_src.price_bp, v_src.price_negotiable, v_src.price_mode,
    v_src.price_period,
    v_src.video_url, v_src.contact_pref, 'draft', v_obs, 1, now(),
    v_src.price_unit, v_src.price_unit_text,
    v_src.pin_lat, v_src.pin_lng, v_src.pin_precision, v_src.pin_show_lat, v_src.pin_show_lng, v_src.pin_zoom,
    v_src.street_address, v_src.directions
  ) RETURNING * INTO v_row;

  INSERT INTO public.listing_locations (listing_id, location_id, position)
    SELECT v_row.id, ll.location_id, ll.position
      FROM public.listing_locations ll
     WHERE ll.listing_id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (v_row.id, v_uid, 'create', NULL,
            (to_jsonb(v_row) - 'search_tsv') || jsonb_build_object('copied_from', p_listing_id), v_uid);

  RETURN jsonb_build_object('ok', true, 'listing_id', v_row.id);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('copy_my_listing', 'draft', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.copy_my_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.copy_my_listing(uuid) TO authenticated, service_role;


-- Proof: catalog facts, then the calls on scratch rows under a sentinel rollback.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_none    uuid := gen_random_uuid();
  v_ca      text := json_build_object('sub', v_a::text, 'role', 'authenticated')::text;
  v_cb      text := json_build_object('sub', v_b::text, 'role', 'authenticated')::text;
  v_cd      text := json_build_object('sub', v_d::text, 'role', 'authenticated')::text;
  v_r0      text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_snap    text;
  v_snap2   text;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
  v_al      uuid := gen_random_uuid();
  v_ad      uuid := gen_random_uuid();
  v_arm     uuid := gen_random_uuid();
  v_ax      uuid := gen_random_uuid();
  v_bl      uuid := gen_random_uuid();
BEGIN
  v_pairs := ARRAY[
    ['public.set_listing_photos_soon(uuid,boolean)', 'b21b91134258df76aba40a5bc60cd1da', 'browser', 't', 'jsonb'],
    ['public.copy_my_listing(uuid)', 'ce59eea9750497cf900ed2fbec14edc8', 'browser', 't', 'jsonb']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef <> (v_pairs[i][4] = 't') OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> v_pairs[i][5]::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') <> (v_pairs[i][3] = 'browser')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') <> (v_pairs[i][3] <> 'owner') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 9 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15a9-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_none) THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: the id no row holds is held';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5a part 9 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_b, v_d]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_d
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_d AND u.email LIKE 'e2e-mig-%');
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
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_ad, v_a, v_cat, v_city, v_tag || ' ad', 'scratch', v_code, 'draft',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_arm, v_a, v_cat, v_city, v_tag || ' arm', 'scratch', v_code, 'removed',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_ax, v_a, v_cat, v_city, v_tag || ' ax', 'scratch', v_code, 'removed',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_bl, v_b, v_cat, v_city, v_tag || ' bl', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    UPDATE public.listings SET deleted_at = now() WHERE id = v_ax;
    UPDATE public.user_directory d SET observed_country_code = NULL WHERE d.user_id IN (v_a, v_b, v_d)
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = d.user_id AND u.email LIKE 'e2e-mig-%');
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date AND door IN ('copy_my_listing', 'set_listing_photos_soon');
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_revisions r WHERE r.seller_id IN (v_a, v_b, v_d))
        || '#' || coalesce((SELECT string_agg(p.id::text || '@' || p.display_order, ',' ORDER BY p.id) FROM public.listing_photos p
                              JOIN public.listings l ON l.id = p.listing_id WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_photo_changes c JOIN public.listings l ON l.id = c.listing_id
                    WHERE l.seller_id IN (v_a, v_b, v_d))
        || '#' || (SELECT count(*) FROM storage.objects o WHERE o.name LIKE v_tag || '%')
        || '#' || coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.user_id) FROM public.seller_places s
                              WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                              WHERE p.user_id IN (v_a, v_b, v_d)
                                AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.audit_log a WHERE a.actor_id IN (v_a, v_b, v_d)
                    OR a.entity_id IN (SELECT l.id::text FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)))
        || '#' || (SELECT count(*) FROM public.seller_notices n WHERE n.seller_id IN (v_a, v_b, v_d))
      INTO v_snap;
    v_answer := public.set_listing_photos_soon(v_al, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: set_listing_photos_soon with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.set_listing_photos_soon(v_al, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: set_listing_photos_soon for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.set_listing_photos_soon(v_al, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: set_listing_photos_soon on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.set_listing_photos_soon(v_none, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: set_listing_photos_soon on an id no row holds answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.copy_my_listing(v_al);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: copy_my_listing with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.copy_my_listing(v_al);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: copy_my_listing for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.copy_my_listing(v_al);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: copy_my_listing on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.copy_my_listing(v_none);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: copy_my_listing on an id no row holds answered %', v_answer;
    END IF;
    v_answer := public.set_listing_photos_soon(v_arm, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('photosSoonNotEditable:removed', 'photosSoonNotEditable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: photos soon on a removed ad answered %', v_answer;
    END IF;
    v_answer := public.copy_my_listing(v_ax);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotFound', 'listingNotFound', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: a copy of the caller''s deleted ad answered %', v_answer;
    END IF;
    v_answer := public.copy_my_listing(v_ad);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notCopied:draft', 'notCopied', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: a copy of a draft answered %', v_answer;
    END IF;
    v_answer := public.copy_my_listing(v_arm);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notCopied:removed', 'notCopied', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: a copy of a removed ad answered %', v_answer;
    END IF;
    v_answer := public.copy_my_listing(v_al);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('residencyUnknown', 'residencyUnknown', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: a copy with no residency fact answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_revisions r WHERE r.seller_id IN (v_a, v_b, v_d))
        || '#' || coalesce((SELECT string_agg(p.id::text || '@' || p.display_order, ',' ORDER BY p.id) FROM public.listing_photos p
                              JOIN public.listings l ON l.id = p.listing_id WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_photo_changes c JOIN public.listings l ON l.id = c.listing_id
                    WHERE l.seller_id IN (v_a, v_b, v_d))
        || '#' || (SELECT count(*) FROM storage.objects o WHERE o.name LIKE v_tag || '%')
        || '#' || coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.user_id) FROM public.seller_places s
                              WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                              WHERE p.user_id IN (v_a, v_b, v_d)
                                AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.audit_log a WHERE a.actor_id IN (v_a, v_b, v_d)
                    OR a.entity_id IN (SELECT l.id::text FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)))
        || '#' || (SELECT count(*) FROM public.seller_notices n WHERE n.seller_id IN (v_a, v_b, v_d))
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: a refused draft-side call wrote a row';
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.set_listing_photos_soon(v_al, true);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'photos_soon', true), false) THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: photos soon set answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT photos_soon FROM public.listings WHERE id = v_al), false) THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: photos soon was not set';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    UPDATE public.user_directory d SET observed_country_code = v_code WHERE d.user_id = v_a
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = d.user_id AND u.email LIKE 'e2e-mig-%');
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.copy_my_listing(v_al);
    IF NOT coalesce((v_answer ->> 'ok')::boolean AND v_answer ? 'listing_id', false) THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: the copy answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT status = 'draft' AND seller_id = v_a AND category_id = v_cat AND home_country_code = v_code
          FROM public.listings WHERE id = (v_answer ->> 'listing_id')::uuid), false) THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: the copy is not the seller''s new draft';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' ELSE 'd' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_d::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"a/draft":9,"b/draft":2}'::jsonb THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door IN ('copy_my_listing', 'set_listing_photos_soon'))
         IS DISTINCT FROM v_refused + 13 THEN
      RAISE EXCEPTION 'F1-5a part 9 proof: door_refusals did not meter the 13 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5a-part-9-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5a-part-9-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261116030700') ON CONFLICT DO NOTHING;
