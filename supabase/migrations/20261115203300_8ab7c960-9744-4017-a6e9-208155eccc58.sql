-- e2e-areas: posting, my-listings, door-refusals

-- Foundations 1, turn F1-5a, part 4 — THE PHOTO DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333, DEC-391; brief
-- docs/governance/briefs/f1-doors-5a.md, ruling docs/governance/briefs/f1-doors-5a-ruling-1.md).
-- move_listing_photo, remove_listing_photo and set_cover_photo are redeclared WHOLE from their last declarations
-- (live md5 checked): ONE door_context('owner', …) gate each, their refusals by door_refuse codes, the shell.
-- Ruling 1 §8: move_listing_photo and set_cover_photo spend revise (they spent none); ruling 1 §7:
-- remove_listing_photo spends photo_remove at the gate, before the row is read (it was read first). DEC-391:
-- another seller's ad and an id no row holds answer notYourListing alike. Folds: 'not signed in' →
-- notSignedIn; 'account is deactivated' → accountDeactivated; 'not your listing' / 'listing not found' →
-- notYourListing; 'photo not found' → photoGone; 'position must be …' → badValue:position.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.move_listing_photo(uuid,uuid,integer)', '6b6405681888846fb00dee3ee5a45a07'],
    ['public.remove_listing_photo(uuid,uuid)', '1a7ac7eb852358fe63d4ecb3b77efdf8'],
    ['public.set_cover_photo(uuid,uuid)', 'efa88b38de5af98b6d09e10deaf79fac']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261116030100') THEN
    RAISE EXCEPTION 'F1-5a part 4: part 3 (mark 20261116030100) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'door_context' AND pronamespace = 'public'::regnamespace) THEN
    RAISE EXCEPTION 'F1-5a part 4: the door mechanism (door_context, door_refuse, door_refused) is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 4: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. move_listing_photo (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.move_listing_photo(p_listing_id uuid, p_photo_id uuid, p_position integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_count integer;
  v_place integer;
  v_cover uuid;
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'revise');
  IF NOT EXISTS (SELECT 1 FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid) THEN
    PERFORM public.door_refuse('notYourListing');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listing_photos
                  WHERE id = p_photo_id AND listing_id = p_listing_id) THEN
    PERFORM public.door_refuse('photoGone');
  END IF;
  IF p_position IS NULL OR p_position < 0 THEN
    PERFORM public.door_refuse('badValue', 'position');
  END IF;
  SELECT count(*)::integer INTO v_count FROM public.listing_photos WHERE listing_id = p_listing_id;
  v_place := least(p_position, v_count - 1);
  -- Pass 1: every photo of this listing out of the way (-1 minus its place).
  UPDATE public.listing_photos SET display_order = -1 - display_order
   WHERE listing_id = p_listing_id;
  -- Pass 2: the others in their old order, closed up around the chosen place; the photo at that place.
  WITH others AS (
    SELECT x.id, (row_number() OVER (ORDER BY x.display_order DESC) - 1)::integer AS i
      FROM public.listing_photos x
     WHERE x.listing_id = p_listing_id AND x.id <> p_photo_id
  ), placed AS (
    SELECT o.id, CASE WHEN o.i >= v_place THEN o.i + 1 ELSE o.i END AS place FROM others o
    UNION ALL
    SELECT p_photo_id, v_place
  )
  UPDATE public.listing_photos AS p SET display_order = placed.place
    FROM placed
   WHERE p.id = placed.id AND p.listing_id = p_listing_id;
  SELECT id INTO v_cover FROM public.listing_photos
   WHERE listing_id = p_listing_id AND display_order = 0;
  UPDATE public.listings SET cover_photo_id = v_cover, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'position', v_place, 'cover_photo_id', v_cover);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('move_listing_photo', 'revise', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.move_listing_photo(uuid, uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.move_listing_photo(uuid, uuid, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. remove_listing_photo (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.remove_listing_photo(p_listing_id uuid, p_photo_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_next uuid; v_status text;
BEGIN
  -- INC-951 — the door's last line behind the route's own dials (dial photo_remove); F1-5a — spent by the
  -- gate, before the row is read.
  PERFORM public.door_context('owner', NULL, NULL, 'photo_remove');
  IF NOT EXISTS (SELECT 1 FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid) THEN
    PERFORM public.door_refuse('notYourListing');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listing_photos
                  WHERE id = p_photo_id AND listing_id = p_listing_id) THEN
    PERFORM public.door_refuse('photoGone');
  END IF;
  UPDATE public.listings SET cover_photo_id = NULL
   WHERE id = p_listing_id AND cover_photo_id = p_photo_id;
  DELETE FROM public.listing_photos WHERE id = p_photo_id AND listing_id = p_listing_id;
  -- D154 B5 (bundle 13 turn 10) — a photo the seller removes from a live ad is listed for staff.
  SELECT status INTO v_status FROM public.listings WHERE id = p_listing_id;
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id)
    VALUES (p_listing_id, 'removed', p_photo_id);
  END IF;
  SELECT id INTO v_next FROM public.listing_photos
   WHERE listing_id = p_listing_id ORDER BY display_order LIMIT 1;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, v_next), updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'removed', p_photo_id, 'cover_photo_id', v_next);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('remove_listing_photo', 'photo_remove', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.remove_listing_photo(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.remove_listing_photo(uuid, uuid) TO authenticated, service_role;

-- ------------------------------------------------------------ 3. set_cover_photo (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.set_cover_photo(p_listing_id uuid, p_photo_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid();
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'revise');
  IF NOT EXISTS (SELECT 1 FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid) THEN
    PERFORM public.door_refuse('notYourListing');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listing_photos
                  WHERE id = p_photo_id AND listing_id = p_listing_id) THEN
    PERFORM public.door_refuse('photoGone');
  END IF;
  -- D154: the cover is the first photo. Pass 1 moves every photo of this listing out of the way (-1 minus its
  -- place); pass 2 puts the chosen photo at 0 and the others behind it in their old order.
  UPDATE public.listing_photos SET display_order = -1 - display_order
   WHERE listing_id = p_listing_id;
  UPDATE public.listing_photos AS p SET display_order = o.place
    FROM (SELECT x.id,
                 (row_number() OVER (ORDER BY (x.id = p_photo_id) DESC, x.display_order DESC) - 1)::integer AS place
            FROM public.listing_photos x
           WHERE x.listing_id = p_listing_id) AS o
   WHERE p.id = o.id AND p.listing_id = p_listing_id;
  UPDATE public.listings SET cover_photo_id = p_photo_id, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'cover_photo_id', p_photo_id);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('set_cover_photo', 'revise', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.set_cover_photo(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_cover_photo(uuid, uuid) TO authenticated, service_role;


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
  v_bl      uuid := gen_random_uuid();
  v_p1      uuid := gen_random_uuid();
  v_p2      uuid := gen_random_uuid();
  v_p3      uuid := gen_random_uuid();
  v_q1      uuid := gen_random_uuid();
BEGIN
  v_pairs := ARRAY[
    ['public.move_listing_photo(uuid,uuid,integer)', 'c002a8db3f0f2d7385becaf3b01e7e8b', 'browser', 't', 'jsonb'],
    ['public.remove_listing_photo(uuid,uuid)', '4f7c41822c373315bcaba9edf5ec0312', 'browser', 't', 'jsonb'],
    ['public.set_cover_photo(uuid,uuid)', '1935398e6d36b878da0a9d4cceafdb90', 'browser', 't', 'jsonb']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef <> (v_pairs[i][4] = 't') OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> v_pairs[i][5]::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') <> (v_pairs[i][3] = 'browser')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') <> (v_pairs[i][3] <> 'owner') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 4 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15a4-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_none) THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: the id no row holds is held';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5a part 4 proof: the scratch market has no anchor'; END IF;
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
    VALUES (v_bl, v_b, v_cat, v_city, v_tag || ' bl', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.listing_photos (id, listing_id, storage_path, display_order) VALUES
      (v_p1, v_al, v_tag || '/p1.webp', 0), (v_p2, v_al, v_tag || '/p2.webp', 1), (v_p3, v_al, v_tag || '/p3.webp', 2),
      (v_q1, v_bl, v_tag || '/q1.webp', 0);
    UPDATE public.listings SET cover_photo_id = v_p1 WHERE id = v_al;
    UPDATE public.listings SET cover_photo_id = v_q1 WHERE id = v_bl;
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date AND door IN ('move_listing_photo', 'remove_listing_photo', 'set_cover_photo');
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
    v_answer := public.move_listing_photo(v_al, v_p2, 1);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: move_listing_photo with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.move_listing_photo(v_al, v_p2, 1);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: move_listing_photo for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.move_listing_photo(v_al, v_p2, 1);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: move_listing_photo on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.move_listing_photo(v_none, v_p2, 1);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: move_listing_photo on an id no row holds answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.remove_listing_photo(v_al, v_p2);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: remove_listing_photo with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.remove_listing_photo(v_al, v_p2);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: remove_listing_photo for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.remove_listing_photo(v_al, v_p2);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: remove_listing_photo on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.remove_listing_photo(v_none, v_p2);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: remove_listing_photo on an id no row holds answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.set_cover_photo(v_al, v_p2);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: set_cover_photo with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.set_cover_photo(v_al, v_p2);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: set_cover_photo for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.set_cover_photo(v_al, v_p2);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: set_cover_photo on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.set_cover_photo(v_none, v_p2);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: set_cover_photo on an id no row holds answered %', v_answer;
    END IF;
    v_answer := public.move_listing_photo(v_al, v_q1, 1);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('photoGone', 'photoGone', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: a move of another ad''s photo answered %', v_answer;
    END IF;
    v_answer := public.remove_listing_photo(v_al, v_q1);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('photoGone', 'photoGone', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: a removal of another ad''s photo answered %', v_answer;
    END IF;
    v_answer := public.set_cover_photo(v_al, v_q1);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('photoGone', 'photoGone', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: another ad''s photo as the cover answered %', v_answer;
    END IF;
    v_answer := public.move_listing_photo(v_al, v_p2, -1);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('badValue:position', 'badValue', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: a move to a negative place answered %', v_answer;
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
      RAISE EXCEPTION 'F1-5a part 4 proof: a refused photo call wrote a row, moved a photo or left a photo object changed';
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.move_listing_photo(v_al, v_p3, 0);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'position', 0, 'cover_photo_id', v_p3), false) THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: the move to the front answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT string_agg(id::text, ',' ORDER BY display_order) FROM public.listing_photos WHERE listing_id = v_al) = concat_ws(',', v_p3, v_p1, v_p2), false) THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: the move did not reorder the photos';
    END IF;
    v_answer := public.set_cover_photo(v_al, v_p2);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'cover_photo_id', v_p2), false) THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: the cover choice answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT string_agg(id::text, ',' ORDER BY display_order) FROM public.listing_photos WHERE listing_id = v_al) = concat_ws(',', v_p2, v_p3, v_p1)
       AND (SELECT cover_photo_id = v_p2 FROM public.listings WHERE id = v_al), false) THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: the cover choice did not put the photo first';
    END IF;
    v_answer := public.remove_listing_photo(v_al, v_p2);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'removed', v_p2, 'cover_photo_id', v_p3), false) THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: the removal of the cover answered %', v_answer;
    END IF;
    IF NOT coalesce(NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2)
       AND (SELECT cover_photo_id = v_p3 FROM public.listings WHERE id = v_al)
       AND (SELECT count(*) = 1 FROM public.listing_photo_changes WHERE listing_id = v_al AND kind = 'removed' AND photo_id = v_p2), false) THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: the removal did not take the photo, move the cover and list the change';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' ELSE 'd' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_d::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"a/photo_remove":3,"a/revise":7,"b/photo_remove":1,"b/revise":2}'::jsonb THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door IN ('move_listing_photo', 'remove_listing_photo', 'set_cover_photo'))
         IS DISTINCT FROM v_refused + 16 THEN
      RAISE EXCEPTION 'F1-5a part 4 proof: door_refusals did not meter the 16 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5a-part-4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5a-part-4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261116030200') ON CONFLICT DO NOTHING;
