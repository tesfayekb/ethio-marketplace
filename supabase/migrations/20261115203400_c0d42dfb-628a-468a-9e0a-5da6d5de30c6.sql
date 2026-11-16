-- e2e-areas: posting, account, door-refusals

-- Foundations 1, turn F1-5a, part 5 — THE PLACE AND ALIAS DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333, DEC-391; brief
-- docs/governance/briefs/f1-doors-5a.md, ruling docs/governance/briefs/f1-doors-5a-ruling-1.md).
-- save_seller_place, clear_seller_place, check_seller_alias and suggest_seller_aliases are redeclared WHOLE from
-- their last declarations (live md5 checked): ONE door_context('owner', …) gate each, their refusals by
-- door_refuse codes, the shell. Ruling 1 §8: clear_seller_place spends draft (it spent none). DEC-391:
-- save_seller_place answers notYourListing for another seller's ad and for an id no row holds. The alias
-- verdict (alias_verdict) is answered as it was. Folds: 'not signed in' → notSignedIn; 'account is deactivated' → accountDeactivated;
-- 'not your listing' → notYourListing.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.save_seller_place(uuid)', 'e80d68439d1c0e0e6cd5524a2da94f0c'],
    ['public.clear_seller_place()', 'd84236e868e0dfc7499499306eb76dad'],
    ['public.check_seller_alias(text)', '2074df98927a2b46651f5420b9c081af'],
    ['public.suggest_seller_aliases(text,text,text,uuid)', '4a3b149eac1d2dc430e7ba18d96e896c']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261116030200') THEN
    RAISE EXCEPTION 'F1-5a part 5: part 4 (mark 20261116030200) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'door_context' AND pronamespace = 'public'::regnamespace) THEN
    RAISE EXCEPTION 'F1-5a part 5: the door mechanism (door_context, door_refuse, door_refused) is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 5: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. save_seller_place (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.save_seller_place(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_loc  uuid;
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'draft');
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  -- DEC-391 (F1-5a) — an ad that is not the caller's, or no ad at all, is one answer.
  IF NOT FOUND OR v_row.seller_id <> v_uid THEN PERFORM public.door_refuse('notYourListing'); END IF;
  -- The ad's first place: the listing's own place, else its first coverage row.
  v_loc := coalesce(v_row.location_id,
    (SELECT ll.location_id FROM public.listing_locations ll
      WHERE ll.listing_id = p_listing_id ORDER BY ll.position, ll.created_at, ll.id LIMIT 1));
  IF v_loc IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'coverage', 'reason', 'required')));
  END IF;
  INSERT INTO public.seller_places AS s (user_id, location_id, pin_lat, pin_lng, pin_precision, pin_zoom,
                                         street_address, directions, home_country_code, updated_at)
  VALUES (v_uid, v_loc, v_row.pin_lat, v_row.pin_lng, v_row.pin_precision, v_row.pin_zoom,
          v_row.street_address, v_row.directions,
          (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid), now())
  ON CONFLICT (user_id) DO UPDATE SET
    location_id = EXCLUDED.location_id, pin_lat = EXCLUDED.pin_lat, pin_lng = EXCLUDED.pin_lng,
    pin_precision = EXCLUDED.pin_precision, pin_zoom = EXCLUDED.pin_zoom,
    street_address = EXCLUDED.street_address, directions = EXCLUDED.directions,
    home_country_code = EXCLUDED.home_country_code, updated_at = now();
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('save_seller_place', 'draft', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.save_seller_place(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_seller_place(uuid) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. clear_seller_place (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.clear_seller_place()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'draft');
  DELETE FROM public.seller_places WHERE user_id = v_uid;
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('clear_seller_place', 'draft', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.clear_seller_place() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.clear_seller_place() TO authenticated, service_role;

-- ------------------------------------------------------------ 3. check_seller_alias (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.check_seller_alias(p_alias text)
 RETURNS jsonb LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'alias_check');
  RETURN public.alias_verdict(p_alias, v_uid);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('check_seller_alias', 'alias_check', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.check_seller_alias(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.check_seller_alias(text) TO authenticated, service_role;

-- ------------------------------------------------------------ 4. suggest_seller_aliases (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.suggest_seller_aliases(p_business_name text DEFAULT NULL::text, p_first_name text DEFAULT NULL::text, p_last_name text DEFAULT NULL::text, p_category_id uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_src   text;
  v_words text[];
  v_cat   text;
  v_bases text[] := ARRAY[]::text[];
  v_out   text[] := ARRAY[]::text[];
  v_base  text;
  v_try   text;
  n       integer;
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'alias_check');
  -- The category word: the LAST >=4-letter word of the leaf's English name,
  -- by position (WITH ORDINALITY), in one query.
  IF p_category_id IS NOT NULL THEN
    SELECT s.w INTO v_cat
      FROM (
        SELECT u.w, u.o
          FROM public.categories c,
               unnest(regexp_split_to_array(
                 lower(regexp_replace(c.name_en, '[^A-Za-z ]', '', 'g')), ' +')) WITH ORDINALITY AS u(w, o)
         WHERE c.id = p_category_id
      ) s
     WHERE char_length(s.w) >= 4
     ORDER BY s.o DESC
     LIMIT 1;
  END IF;
  v_src := coalesce(nullif(btrim(coalesce(p_business_name, '')), ''),
                    nullif(btrim(coalesce(p_first_name, '') || ' ' || coalesce(p_last_name, '')), ''));
  IF v_src IS NULL OR v_src ~ '[^A-Za-z .''-]' THEN
    -- No Latin name: the category word alone, as a shop name.
    IF v_cat IS NOT NULL THEN
      v_bases := v_bases || (v_cat || '_shop');
    ELSE
      RETURN jsonb_build_object('ok', true, 'suggestions', '[]'::jsonb);
    END IF;
  ELSE
    SELECT array_agg(w ORDER BY o) INTO v_words
      FROM unnest(regexp_split_to_array(lower(v_src), '[^a-z]+')) WITH ORDINALITY AS u(w, o) WHERE w <> '';
    IF coalesce(cardinality(v_words), 0) = 0 THEN
      IF v_cat IS NOT NULL THEN
        v_bases := v_bases || (v_cat || '_shop');
      ELSE
        RETURN jsonb_build_object('ok', true, 'suggestions', '[]'::jsonb);
      END IF;
    ELSE
      v_bases := v_bases || array_to_string(v_words, '');
      IF v_cat IS NOT NULL THEN
        v_bases := v_bases || (v_words[1] || '_' || v_cat);
      END IF;
      IF cardinality(v_words) > 1 THEN
        v_bases := v_bases || (v_words[1] || left(v_words[cardinality(v_words)], 1))
                           || array_to_string(v_words, '_');
      END IF;
    END IF;
  END IF;
  FOREACH v_base IN ARRAY v_bases LOOP
    EXIT WHEN cardinality(v_out) >= 3;
    v_base := left(v_base, 28);
    FOR n IN 0..99 LOOP
      v_try := v_base || CASE WHEN n = 0 THEN '' ELSE n::text END;
      CONTINUE WHEN v_try = ANY (v_out);
      IF public.alias_rule(v_try) IS NULL AND NOT public.alias_taken(v_try, v_uid) THEN
        v_out := v_out || v_try;
        EXIT;
      END IF;
      -- A refusal by a rule other than taken is not cured by digits (shape aside).
      EXIT WHEN public.alias_rule(v_try) IS NOT NULL AND public.alias_rule(v_try) <> 'a';
    END LOOP;
  END LOOP;
  -- Fill up with further numbered forms of the first base.
  n := 1;
  WHILE cardinality(v_out) < 3 AND n <= 99 LOOP
    v_try := left(v_bases[1], 28) || n::text;
    IF NOT v_try = ANY (v_out) AND public.alias_rule(v_try) IS NULL AND NOT public.alias_taken(v_try, v_uid) THEN
      v_out := v_out || v_try;
    END IF;
    n := n + 1;
  END LOOP;
  RETURN jsonb_build_object('ok', true, 'suggestions', to_jsonb(v_out));
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('suggest_seller_aliases', 'alias_check', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.suggest_seller_aliases(text, text, text, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.suggest_seller_aliases(text, text, text, uuid) TO authenticated, service_role;


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
  v_cat_off uuid;
  v_cat_np  uuid;
  v_attr    uuid;
BEGIN
  v_pairs := ARRAY[
    ['public.save_seller_place(uuid)', '29afcb4b74fd106ffad2dbbfb8ba81a6', 'browser', 't', 'jsonb'],
    ['public.clear_seller_place()', '46b0cccb973ce64f70bedcdaf37c9e6a', 'browser', 't', 'jsonb'],
    ['public.check_seller_alias(text)', '29894db712b28d729e69484311f7aafa', 'browser', 't', 'jsonb'],
    ['public.suggest_seller_aliases(text,text,text,uuid)', '00b413dd1fc9b5a969bc9d71fc4d8c84', 'browser', 't', 'jsonb']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef <> (v_pairs[i][4] = 't') OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> v_pairs[i][5]::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') <> (v_pairs[i][3] = 'browser')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') <> (v_pairs[i][3] <> 'owner') THEN
      RAISE EXCEPTION 'F1-5a part 5 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 5 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15a5-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_none) THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: the id no row holds is held';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5a part 5 proof: the scratch market has no anchor'; END IF;
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
    INSERT INTO public.categories (name_en, slug, is_active, allow_listings, display_order)
    VALUES (v_tag || ' off', v_tag || '-off', false, true, 9999) RETURNING id INTO v_cat_off;
    INSERT INTO public.categories (name_en, slug, is_active, allow_listings, display_order)
    VALUES (v_tag || ' parent', v_tag || '-np', true, false, 9999) RETURNING id INTO v_cat_np;
    INSERT INTO public.attributes (attr_key, attr_type, name_en)
    VALUES ('e2e_mig_' || substr(v_hex, 1, 8), 'single_select', v_tag) RETURNING id INTO v_attr;
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date AND door IN ('check_seller_alias', 'clear_seller_place', 'save_seller_place', 'suggest_seller_aliases');
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
    v_answer := public.save_seller_place(v_al);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: save_seller_place with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.save_seller_place(v_al);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: save_seller_place for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.save_seller_place(v_al);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: save_seller_place on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.save_seller_place(v_none);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: save_seller_place on an id no row holds answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.clear_seller_place();
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: clear_seller_place with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.clear_seller_place();
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: clear_seller_place for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.check_seller_alias('e2e_alias');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: check_seller_alias with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.check_seller_alias('e2e_alias');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: check_seller_alias for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.suggest_seller_aliases('Abebe Shop', NULL, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: suggest_seller_aliases with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.suggest_seller_aliases('Abebe Shop', NULL, NULL, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: suggest_seller_aliases for a deactivated caller answered %', v_answer;
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
      RAISE EXCEPTION 'F1-5a part 5 proof: a refused place or schema call wrote a row';
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.save_seller_place(v_al);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true), false) THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: the place saved answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT location_id = v_city FROM public.seller_places WHERE user_id = v_a), false) THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: the place was not saved';
    END IF;
    v_answer := public.clear_seller_place();
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true), false) THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: the place cleared answered %', v_answer;
    END IF;
    IF NOT coalesce(NOT EXISTS (SELECT 1 FROM public.seller_places WHERE user_id = v_a), false) THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: the place was not cleared';
    END IF;
    v_answer := public.check_seller_alias('e2e' || substr(v_hex, 1, 8));
    IF NOT coalesce(v_answer ? 'ok', false) THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: an alias checked answered %', v_answer;
    END IF;
    v_answer := public.suggest_seller_aliases('Abebe Shop', NULL, NULL, v_cat);
    IF NOT coalesce((v_answer ->> 'ok')::boolean AND jsonb_typeof(v_answer -> 'suggestions') = 'array', false) THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: the suggestions answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' ELSE 'd' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_d::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"a/alias_check":2,"a/draft":3,"b/draft":1}'::jsonb THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door IN ('check_seller_alias', 'clear_seller_place', 'save_seller_place', 'suggest_seller_aliases'))
         IS DISTINCT FROM v_refused + 10 THEN
      RAISE EXCEPTION 'F1-5a part 5 proof: door_refusals did not meter the 10 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5a-part-5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5a-part-5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261116030300') ON CONFLICT DO NOTHING;
