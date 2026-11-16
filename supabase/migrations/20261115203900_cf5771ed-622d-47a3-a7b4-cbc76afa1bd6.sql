-- e2e-areas: posting, my-listings, door-refusals

-- Foundations 1, turn F1-5a, part 10 — THE PIN AND PUBLISH DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333, DEC-391; brief
-- docs/governance/briefs/f1-doors-5a.md, ruling docs/governance/briefs/f1-doors-5a-ruling-1.md).
-- set_listing_pin and publish_listing are redeclared WHOLE from their last declarations (live md5 checked): ONE
-- door_context('owner', …) gate each on the dial it spent (revise, post), their refusals by door_refuse codes,
-- the shell. DEC-391: another seller's ad and an id no row holds answer notYourListing alike.
-- validate_listing_draft's field refusals, the free-slot answer and legal_certify's raise are kept as they are.
-- Folds: 'not signed in' → notSignedIn; 'account is deactivated' → accountDeactivated; 'not your listing' → notYourListing; 'pin not editable' →
-- pinNotEditable:<status>; the place text's lengths → streetTooLong:<n> / directionsTooLong:<n>; 'contact in
-- the note' → contactInNote; the pin's ranges → badLatitude / badLongitude / badPrecision / badZoom (each with
-- the value sent); 'illegal transition' → illegalTransition:<status>-screening; 'listing has no place' →
-- listingNotPlaced.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.set_listing_pin(uuid,numeric,numeric,text,text,smallint,text)', '34c6bdd95f57c63dae9003dbc2cb9b7a'],
    ['public.publish_listing(uuid,uuid[],text)', '2a455cfb87b99a51389f08a72fe5665c']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261116030700') THEN
    RAISE EXCEPTION 'F1-5a part 10: part 9 (mark 20261116030700) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'door_context' AND pronamespace = 'public'::regnamespace) THEN
    RAISE EXCEPTION 'F1-5a part 10: the door mechanism (door_context, door_refuse, door_refused) is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 10: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. set_listing_pin (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.set_listing_pin(p_listing_id uuid, p_lat numeric DEFAULT NULL::numeric, p_lng numeric DEFAULT NULL::numeric, p_precision text DEFAULT NULL::text, p_street text DEFAULT NULL::text, p_zoom smallint DEFAULT NULL::smallint, p_directions text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_row    public.listings%ROWTYPE;
  v_lat    numeric;
  v_lng    numeric;
  v_prec   text;
  v_street text;
  v_dirs   text;
  v_zoom   smallint;
  v_before jsonb;
  v_after  jsonb;
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'revise');

  SELECT * INTO v_row FROM public.listings
   WHERE id = p_listing_id AND seller_id = v_uid;
  IF v_row.id IS NULL THEN PERFORM public.door_refuse('notYourListing'); END IF;

  -- Bundle 16 turn E2a (INC-631's rule) — a closed ad is edited like a live one.
  IF v_row.status NOT IN ('draft','active','reduced','closed','paused','rejected','held','expired') THEN
    PERFORM public.door_refuse('pinNotEditable', v_row.status);
  END IF;

  v_street := nullif(btrim(regexp_replace(
                regexp_replace(coalesce(p_street, ''), '[[:cntrl:]<>]', ' ', 'g'),
                '\s+', ' ', 'g')), '');
  IF v_street IS NOT NULL AND char_length(v_street) > 200 THEN
    PERFORM public.door_refuse('streetTooLong', char_length(v_street)::text);
  END IF;
  IF v_street IS NOT NULL AND public.attr_contact_like(v_street) THEN
    PERFORM public.door_refuse('contactInNote');
  END IF;

  -- step 5 / step 10 — the directions line is sanitised as the note is and
  -- refused with contactInNote under the same rule.
  v_dirs := nullif(btrim(regexp_replace(
              regexp_replace(coalesce(p_directions, ''), '[[:cntrl:]<>]', ' ', 'g'),
              '\s+', ' ', 'g')), '');
  IF v_dirs IS NOT NULL AND char_length(v_dirs) > 200 THEN
    PERFORM public.door_refuse('directionsTooLong', char_length(v_dirs)::text);
  END IF;
  IF v_dirs IS NOT NULL AND public.attr_contact_like(v_dirs) THEN
    PERFORM public.door_refuse('contactInNote');
  END IF;

  IF p_lat IS NULL OR p_lng IS NULL THEN
    v_lat := NULL; v_lng := NULL; v_prec := NULL; v_zoom := NULL;
  ELSE
    IF p_lat < -90 OR p_lat > 90 THEN
      PERFORM public.door_refuse('badLatitude', p_lat::text);
    END IF;
    IF p_lng < -180 OR p_lng > 180 THEN
      PERFORM public.door_refuse('badLongitude', p_lng::text);
    END IF;
    -- INC-963 — a pin's precision is known before it is stored: none sent is refused.
    IF p_precision IS NULL OR btrim(p_precision) = '' THEN
      PERFORM public.door_refuse('badPrecision', 'missing');
    END IF;
    v_prec := lower(btrim(p_precision));
    IF v_prec NOT IN ('exact','approx') THEN
      PERFORM public.door_refuse('badPrecision', v_prec);
    END IF;
    IF p_zoom IS NOT NULL AND (p_zoom < 3 OR p_zoom > 20) THEN
      PERFORM public.door_refuse('badZoom', p_zoom::text);
    END IF;
    v_lat := round(p_lat, 6);
    v_lng := round(p_lng, 6);
    -- A re-sent pin without a zoom keeps the zoom it was saved at.
    v_zoom := coalesce(p_zoom, CASE WHEN v_row.pin_lat IS NOT NULL THEN v_row.pin_zoom END);
  END IF;

  v_before := jsonb_build_object('pin_lat', v_row.pin_lat, 'pin_lng', v_row.pin_lng,
                                 'pin_precision', v_row.pin_precision, 'pin_zoom', v_row.pin_zoom,
                                 'street_address', v_row.street_address,
                                 'directions', v_row.directions);
  v_after  := jsonb_build_object('pin_lat', v_lat, 'pin_lng', v_lng,
                                 'pin_precision', v_prec, 'pin_zoom', v_zoom,
                                 'street_address', v_street,
                                 'directions', v_dirs);

  UPDATE public.listings
     SET pin_lat = v_lat, pin_lng = v_lng, pin_precision = v_prec, pin_zoom = v_zoom,
         street_address = v_street, directions = v_dirs,
         pin_show_lat = CASE WHEN v_lat IS NULL THEN NULL
                             WHEN v_prec = 'approx' THEN round(v_lat, 2)
                             ELSE v_lat END,
         pin_show_lng = CASE WHEN v_lng IS NULL THEN NULL
                             WHEN v_prec = 'approx' THEN round(v_lng, 2)
                             ELSE v_lng END,
         updated_at = now()
   WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
  VALUES (p_listing_id, v_uid, 'edit', v_before, v_after, v_uid);

  RETURN jsonb_build_object('ok', true) || v_after;
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('set_listing_pin', 'revise', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. publish_listing (whole; the owner gate and the shell)
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
  v_country char(2);
  v_market  public.market_settings%ROWTYPE;
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'post');

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  -- DEC-391 (F1-5a) — an ad that is not the caller's, or no ad at all, is one answer.
  IF NOT FOUND OR v_row.seller_id <> v_uid THEN PERFORM public.door_refuse('notYourListing'); END IF;
  IF v_row.status NOT IN ('draft','rejected') THEN
    PERFORM public.door_refuse('illegalTransition', v_row.status || '-screening');
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
    IF v_country IS NULL THEN PERFORM public.door_refuse('listingNotPlaced'); END IF;
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
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('publish_listing', 'post', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_listing(uuid, uuid[], text) TO authenticated, service_role;


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
    ['public.set_listing_pin(uuid,numeric,numeric,text,text,smallint,text)', '3ed3aa2a32a01f557db05fa677b38050', 'browser', 't', 'jsonb'],
    ['public.publish_listing(uuid,uuid[],text)', '84bd1f64f00f96a9e9f3149c5837c3ad', 'browser', 't', 'jsonb']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef <> (v_pairs[i][4] = 't') OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> v_pairs[i][5]::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') <> (v_pairs[i][3] = 'browser')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') <> (v_pairs[i][3] <> 'owner') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 10 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15a10-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_none) THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: the id no row holds is held';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5a part 10 proof: the scratch market has no anchor'; END IF;
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
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date AND door IN ('publish_listing', 'set_listing_pin');
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
    v_answer := public.set_listing_pin(v_al, 9.03, 38.74, 'exact');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: set_listing_pin with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.set_listing_pin(v_al, 9.03, 38.74, 'exact');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: set_listing_pin for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.set_listing_pin(v_al, 9.03, 38.74, 'exact');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: set_listing_pin on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.set_listing_pin(v_none, 9.03, 38.74, 'exact');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: set_listing_pin on an id no row holds answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.publish_listing(v_ad, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: publish_listing with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.publish_listing(v_ad, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: publish_listing for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.publish_listing(v_ad, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: publish_listing on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.publish_listing(v_none, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: publish_listing on an id no row holds answered %', v_answer;
    END IF;
    v_answer := public.set_listing_pin(v_arm, 9.03, 38.74, 'exact');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('pinNotEditable:removed', 'pinNotEditable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: a pin on a removed ad answered %', v_answer;
    END IF;
    v_answer := public.set_listing_pin(v_al, NULL, NULL, NULL, repeat('a', 201));
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('streetTooLong:201', 'streetTooLong', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: a street line too long answered %', v_answer;
    END IF;
    v_answer := public.set_listing_pin(v_al, NULL, NULL, NULL, NULL, NULL, repeat('a', 201));
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('directionsTooLong:201', 'directionsTooLong', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: a directions line too long answered %', v_answer;
    END IF;
    v_answer := public.set_listing_pin(v_al, 91, 38.74, 'exact');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('badLatitude:91', 'badLatitude', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: a latitude out of range answered %', v_answer;
    END IF;
    v_answer := public.set_listing_pin(v_al, 9.03, 200, 'exact');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('badLongitude:200', 'badLongitude', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: a longitude out of range answered %', v_answer;
    END IF;
    v_answer := public.set_listing_pin(v_al, 9.03, 38.74, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('badPrecision:missing', 'badPrecision', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: a pin with no precision answered %', v_answer;
    END IF;
    v_answer := public.set_listing_pin(v_al, 9.03, 38.74, 'fuzzy');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('badPrecision:fuzzy', 'badPrecision', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: a pin with an unknown precision answered %', v_answer;
    END IF;
    v_answer := public.set_listing_pin(v_al, 9.03, 38.74, 'exact', NULL, 2::smallint);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('badZoom:2', 'badZoom', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: a pin with a zoom out of range answered %', v_answer;
    END IF;
    v_answer := public.publish_listing(v_al, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('illegalTransition:active-screening', 'illegalTransition', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: a live ad published answered %', v_answer;
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
      RAISE EXCEPTION 'F1-5a part 10 proof: a refused draft-side call wrote a row';
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.set_listing_pin(v_al, 9.0312345, 38.7456789, 'approx');
    IF NOT coalesce((v_answer ->> 'ok')::boolean AND (v_answer ->> 'pin_lat')::numeric = 9.031235, false) THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: the pin answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT pin_show_lat = 9.03 AND pin_precision = 'approx' FROM public.listings WHERE id = v_al), false) THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: the pin was not stored';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' ELSE 'd' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_d::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"a/post":2,"a/revise":10,"b/post":1,"b/revise":1}'::jsonb THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door IN ('publish_listing', 'set_listing_pin'))
         IS DISTINCT FROM v_refused + 17 THEN
      RAISE EXCEPTION 'F1-5a part 10 proof: door_refusals did not meter the 17 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5a-part-10-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5a-part-10-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261116030800') ON CONFLICT DO NOTHING;
