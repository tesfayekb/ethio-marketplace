-- e2e-areas: my-listings, ad-page, door-refusals

-- Foundations 1, turn F1-5a, part 7 — THE SOLD AND RESERVED DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333, DEC-391; brief
-- docs/governance/briefs/f1-doors-5a.md, ruling docs/governance/briefs/f1-doors-5a-ruling-1.md).
-- mark_sold and set_listing_reserved are redeclared WHOLE from their last declarations (live md5 checked): ONE
-- door_context('owner', …, 'revise') gate each, their refusals by door_refuse codes, the shell. DEC-391: another
-- seller's ad and an id no row holds answer notYourListing alike. Folds: 'not signed in' → notSignedIn; 'account is deactivated' → accountDeactivated;
-- 'not your listing' / 'listing not found' → notYourListing; 'cannot mark sold from <status>' →
-- illegalTransition:<status>-sold; 'reserved must be true or false' → badValue:reserved; 'only a live ad is
-- reserved' → notLive.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.mark_sold(uuid)', 'b48bcfcfacfc144842eca514ee438521'],
    ['public.set_listing_reserved(uuid,boolean)', 'cb753d8ec611ab543e5e50416d80290b']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261116030400') THEN
    RAISE EXCEPTION 'F1-5a part 7: part 6 (mark 20261116030400) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'door_context' AND pronamespace = 'public'::regnamespace) THEN
    RAISE EXCEPTION 'F1-5a part 7: the door mechanism (door_context, door_refuse, door_refused) is missing';
  END IF;
  IF to_regprocedure('public.transition_listing_core(uuid,text)') IS NULL THEN
    RAISE EXCEPTION 'F1-5a part 7: transition_listing_core (part 2) is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 7: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. mark_sold (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.mark_sold(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_row public.listings%ROWTYPE;
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'revise');
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  -- DEC-391 (F1-5a) — an ad that is not the caller's, or no ad at all, is one answer.
  IF NOT FOUND OR v_row.seller_id <> v_uid THEN PERFORM public.door_refuse('notYourListing'); END IF;
  IF v_row.status NOT IN ('active','reduced','closed','paused') THEN
    PERFORM public.door_refuse('illegalTransition', v_row.status || '-sold');
  END IF;
  -- D175 1 (bundle 16) — the seller's contact choice is kept as it is: a sold ad's contact is closed to everyone by
  -- its status (reveal_listing_contact answers only an active ad). sold_at and Reserved: listings_state_marks.
  UPDATE public.listings SET status = 'sold',
    clock_kept = false, kept_remaining = NULL, resume_status = NULL, updated_at = now()
   WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'sold'), v_uid);
  RETURN jsonb_build_object('ok', true, 'status', 'sold');
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('mark_sold', 'revise', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.mark_sold(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mark_sold(uuid) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. set_listing_reserved (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.set_listing_reserved(p_listing_id uuid, p_reserved boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'revise');
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  -- DEC-391 (F1-5a) — an ad that is not the caller's, or no ad at all, is one answer.
  IF NOT FOUND OR v_row.seller_id <> v_uid THEN PERFORM public.door_refuse('notYourListing'); END IF;
  IF p_reserved IS NULL THEN PERFORM public.door_refuse('badValue', 'reserved'); END IF;
  -- D173 1 — Reserved is a mark on a live ad: it stays in search, its time keeps running.
  IF v_row.status NOT IN ('active','reduced') THEN
    PERFORM public.door_refuse('notLive');
  END IF;
  IF (v_row.reserved_at IS NOT NULL) = p_reserved THEN
    RETURN jsonb_build_object('ok', true, 'reserved', p_reserved);
  END IF;
  UPDATE public.listings SET
    reserved_at = CASE WHEN p_reserved THEN now() ELSE NULL END,
    updated_at = now()
  WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('reserved', v_row.reserved_at IS NOT NULL),
            jsonb_build_object('reserved', p_reserved), v_uid);
  RETURN jsonb_build_object('ok', true, 'reserved', p_reserved);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('set_listing_reserved', 'revise', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.set_listing_reserved(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_reserved(uuid, boolean) TO authenticated, service_role;


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
  v_al2     uuid := gen_random_uuid();
  v_ad      uuid := gen_random_uuid();
  v_ap      uuid := gen_random_uuid();
  v_bl      uuid := gen_random_uuid();
BEGIN
  v_pairs := ARRAY[
    ['public.mark_sold(uuid)', '5868a9b698756139709c251f8a3117ce', 'browser', 't', 'jsonb'],
    ['public.set_listing_reserved(uuid,boolean)', '742fded2f212cfa4b2021fc3ba7cb1ed', 'browser', 't', 'jsonb']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef <> (v_pairs[i][4] = 't') OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> v_pairs[i][5]::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') <> (v_pairs[i][3] = 'browser')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') <> (v_pairs[i][3] <> 'owner') THEN
      RAISE EXCEPTION 'F1-5a part 7 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 7 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15a7-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_none) THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: the id no row holds is held';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5a part 7 proof: the scratch market has no anchor'; END IF;
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
    VALUES (v_al2, v_a, v_cat, v_city, v_tag || ' al2', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_ad, v_a, v_cat, v_city, v_tag || ' ad', 'scratch', v_code, 'draft',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_ap, v_a, v_cat, v_city, v_tag || ' ap', 'scratch', v_code, 'paused',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_bl, v_b, v_cat, v_city, v_tag || ' bl', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    UPDATE public.listings SET resume_status = 'active', clock_kept = true, kept_remaining = interval '5 days', expires_at = NULL
     WHERE id = v_ap;
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date AND door IN ('mark_sold', 'set_listing_reserved');
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
    v_answer := public.mark_sold(v_al);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: mark_sold with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.mark_sold(v_al);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: mark_sold for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.mark_sold(v_al);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: mark_sold on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.mark_sold(v_none);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: mark_sold on an id no row holds answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.set_listing_reserved(v_al, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: set_listing_reserved with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.set_listing_reserved(v_al, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: set_listing_reserved for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.set_listing_reserved(v_al, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: set_listing_reserved on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.set_listing_reserved(v_none, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: set_listing_reserved on an id no row holds answered %', v_answer;
    END IF;
    v_answer := public.mark_sold(v_ad);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('illegalTransition:draft-sold', 'illegalTransition', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: a draft sold answered %', v_answer;
    END IF;
    v_answer := public.set_listing_reserved(v_al2, NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('badValue:reserved', 'badValue', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: a reserve with no value answered %', v_answer;
    END IF;
    v_answer := public.set_listing_reserved(v_ad, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notLive', 'notLive', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: a draft reserved answered %', v_answer;
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
      RAISE EXCEPTION 'F1-5a part 7 proof: a refused state call wrote a row';
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.mark_sold(v_al);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'status', 'sold'), false) THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: the ad sold answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT status = 'sold' FROM public.listings WHERE id = v_al), false) THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: the ad is not sold';
    END IF;
    v_answer := public.set_listing_reserved(v_al2, true);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'reserved', true), false) THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: the ad reserved answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT reserved_at IS NOT NULL FROM public.listings WHERE id = v_al2), false) THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: the ad is not reserved';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' ELSE 'd' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_d::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"a/revise":7,"b/revise":2}'::jsonb THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door IN ('mark_sold', 'set_listing_reserved'))
         IS DISTINCT FROM v_refused + 11 THEN
      RAISE EXCEPTION 'F1-5a part 7 proof: door_refusals did not meter the 11 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5a-part-7-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5a-part-7-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261116030500') ON CONFLICT DO NOTHING;
