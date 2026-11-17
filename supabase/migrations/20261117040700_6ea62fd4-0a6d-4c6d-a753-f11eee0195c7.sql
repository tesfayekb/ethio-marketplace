-- e2e-areas: shell, auth, legal

-- Foundations 1, turn F1-5b, part 5 — THE VIEWING PLACE AND THE ACCEPTANCE ONTO DOOR_CONTEXT AND THE SHELL
-- (DEC-333; brief docs/governance/briefs/f1-doors-5b.md, census docs/governance/reports/f1-doors-5b.census.md
-- D4, D5, D7, D9). user_set_viewing_location and accept_legal are redeclared WHOLE from their last declarations
-- (live md5 checked): ONE door_context('owner', NULL, NULL, <dial>) gate each, their refusals by door_refuse
-- codes, the shell. Both already spent their dial first; the gate keeps that order.
-- Folds: 'not signed in' / 'not authenticated' → notSignedIn; 'account is deactivated' → accountDeactivated;
-- the raised and returned rateLimited → the gate's rateLimited (INC-1170); the returned placeNotOpen →
-- door_refuse('placeNotOpen'); 'no profile row' → door_refuse('noProfile'); emptyList, adultRequired,
-- badLanguage, notInForce, notApplicable → door_refuse with the same code. accept_legal's stored language
-- names its two catalogue languages through language_code (K4), the same values.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.user_set_viewing_location(uuid)', 'c9764e258d14da9f84e83ef643d11379'],
    ['public.accept_legal(uuid[],text,boolean,boolean)', '750497f2b0710fc1b6fad10b6317d81a']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261117060300') THEN
    RAISE EXCEPTION 'F1-5b part 5: part 4 (mark 20261117060300) must be applied first';
  END IF;
  IF to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-5b part 5: language_code(text) is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5b part 5: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. user_set_viewing_location (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.user_set_viewing_location(p_location uuid)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_country text;
  v_at      timestamptz;
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'viewing_place');

  IF p_location IS NOT NULL THEN
    SELECT l.country_code INTO v_country FROM public.locations l WHERE l.id = p_location;
    IF v_country IS NULL
       OR NOT EXISTS (SELECT 1 FROM public.get_location_tree(v_country) t WHERE t.id = p_location) THEN
      PERFORM public.door_refuse('placeNotOpen');
    END IF;
    v_at := now();
  END IF;

  UPDATE public.profiles p
     SET viewing_location_id = p_location,
         viewing_location_at = v_at
   WHERE p.user_id = v_uid;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('noProfile');
  END IF;

  RETURN jsonb_build_object('ok', true, 'id', p_location, 'country', v_country, 'at', v_at);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('user_set_viewing_location', 'viewing_place', SQLERRM);
END $$;

REVOKE ALL ON FUNCTION public.user_set_viewing_location(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.user_set_viewing_location(uuid) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. accept_legal (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.accept_legal(p_version_ids uuid[], p_language text, p_adult boolean, p_data_consent boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid     uuid := auth.uid();
  v_method  text;
  v_home    char(2);
  v_vid     uuid;
  v_v       public.legal_versions%ROWTYPE;
  v_privacy boolean;
BEGIN
  -- INC-951 — one call counts once, however many documents it accepts (dial legal_accept).
  PERFORM public.door_context('owner', NULL, NULL, 'legal_accept');
  IF p_version_ids IS NULL OR array_length(p_version_ids, 1) IS NULL THEN
    PERFORM public.door_refuse('emptyList');
  END IF;
  IF p_adult IS DISTINCT FROM true AND NOT EXISTS (
       SELECT 1 FROM public.legal_acceptances a WHERE a.user_id = v_uid AND a.adult_confirmed) THEN
    PERFORM public.door_refuse('adultRequired');
  END IF;
  IF p_language IS NULL OR NOT EXISTS (
       SELECT 1 FROM public.languages l WHERE l.code = p_language AND l.enabled_public) THEN
    PERFORM public.door_refuse('badLanguage');
  END IF;
  v_method := coalesce(
    auth.jwt() -> 'app_metadata' ->> 'provider',
    (auth.jwt() -> 'amr' -> 0 ->> 'method'),
    'unknown');
  SELECT p.home_country_code INTO v_home FROM public.profiles p WHERE p.user_id = v_uid;
  FOREACH v_vid IN ARRAY p_version_ids LOOP
    SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = v_vid;
    IF NOT FOUND OR v_v.status <> 'published' OR v_v.effective_at > now() THEN
      PERFORM public.door_refuse('notInForce');
    END IF;
    IF EXISTS (SELECT 1 FROM public.legal_documents d
                WHERE d.id = v_v.document_id
                  AND d.country_code IS NOT NULL
                  AND d.country_code IS DISTINCT FROM v_home) THEN
      PERFORM public.door_refuse('notApplicable');
    END IF;
    SELECT (d.kind = 'privacy' OR d.kind ~ '^e2e-[a-z0-9-]*-privacy$') INTO v_privacy
      FROM public.legal_documents d WHERE d.id = v_v.document_id;
    INSERT INTO public.legal_acceptances
      (user_id, version_id, language, method, adult_confirmed, home_country_code, data_consent)
    VALUES (v_uid, v_vid, CASE WHEN p_language IN (public.language_code('base'), public.language_code('pair')) OR EXISTS (SELECT 1 FROM public.legal_version_texts t WHERE t.version_id = v_vid AND t.language = p_language) THEN p_language ELSE public.language_code('base') END, v_method, p_adult IS TRUE, v_home, v_privacy AND p_data_consent IS TRUE)
    ON CONFLICT (user_id, version_id) DO NOTHING;
  END LOOP;
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('accept_legal', 'legal_accept', SQLERRM);
END;
$function$;

REVOKE ALL ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) TO authenticated, service_role;

-- Proof: catalog facts, then the calls on scratch rows under a sentinel rollback.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_pair    text := public.language_code('pair');
  v_b       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_e       uuid := gen_random_uuid();
  v_g       uuid := gen_random_uuid();
  v_cb      text := json_build_object('sub', v_b::text, 'role', 'authenticated')::text;
  v_cd      text := json_build_object('sub', v_d::text, 'role', 'authenticated')::text;
  v_ce      text := json_build_object('sub', v_e::text, 'role', 'authenticated')::text;
  v_cg      text := json_build_object('sub', v_g::text, 'role', 'authenticated')::text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_doc     uuid;
  v_xdoc    uuid;
  v_pv      uuid;
  v_dv      uuid;
  v_xv      uuid;
  v_answer  jsonb;
  v_refused bigint;
  v_snap    text;
  v_snap2   text;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_pairs := ARRAY[
    ['public.user_set_viewing_location(uuid)', '35008a03b42eff15570e86ce7e0d3ad4'], -- new md5: user_set_viewing_location
    ['public.accept_legal(uuid[],text,boolean,boolean)', '9dfef28b18d7ea336d3a2aa8da7a2208']]; -- new md5: accept_legal
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> 'jsonb'::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-5b part 5 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5b part 5 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15b5-' || substr(v_hex, 1, 10);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: scratch code % already exists', v_code;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.languages WHERE code = v_pair AND enabled_public) THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: the pair language is not public';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5b part 5 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_e, v_tag || '-e@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_g, v_tag || '-g@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    -- The scratch callers' own ceilings: no verdict below rests on a live dial's value (rule 30 scan, point 4).
    INSERT INTO public.rate_overrides (user_id, action, max_count)
    SELECT u, a, 1000 FROM unnest(ARRAY[v_b, v_d, v_e, v_g]) u, unnest(ARRAY['viewing_place', 'legal_accept']) a;
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_d
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_d AND u.email LIKE 'e2e-mig-%');
    DELETE FROM public.profiles
     WHERE user_id = v_g
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_g AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.legal_documents (kind, country_code)
    VALUES ('e2e-f15b5-' || substr(v_hex, 11, 12), NULL) RETURNING id INTO v_doc;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog, material,
                                       effective_at, published_at, settings_snapshot)
    VALUES (v_doc, 1, 'published', 'v1', v_tag, v_tag, v_tag, false,
            now() - interval '1 minute', now() - interval '1 minute', jsonb_build_object('seed', v_tag))
    RETURNING id INTO v_pv;
    INSERT INTO public.legal_versions (document_id, version, status, label)
    VALUES (v_doc, 2, 'draft', 'v2') RETURNING id INTO v_dv;
    INSERT INTO public.legal_documents (kind, country_code)
    VALUES ('e2e-f15b5x-' || substr(v_hex, 11, 12), v_code) RETURNING id INTO v_xdoc;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog, material,
                                       effective_at, published_at, settings_snapshot)
    VALUES (v_xdoc, 1, 'published', 'v1', v_tag, v_tag, v_tag, false,
            now() - interval '1 minute', now() - interval '1 minute', jsonb_build_object('seed', v_tag))
    RETURNING id INTO v_xv;
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals
     WHERE day = current_date AND door IN ('user_set_viewing_location', 'accept_legal');
    SELECT coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                      WHERE p.user_id IN (v_b, v_d, v_e, v_g)
                        AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.legal_acceptances a WHERE a.user_id IN (v_b, v_d, v_e, v_g))
      INTO v_snap;

    -- (b) the refusals, each by its code and status.
    v_answer := public.user_set_viewing_location(v_city);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: user_set_viewing_location with no caller answered %', v_answer;
    END IF;
    v_answer := public.accept_legal(ARRAY[v_pv], v_lang, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: accept_legal with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.user_set_viewing_location(v_city);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: user_set_viewing_location for a deactivated caller answered %', v_answer;
    END IF;
    v_answer := public.accept_legal(ARRAY[v_pv], v_lang, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: accept_legal for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.user_set_viewing_location(gen_random_uuid());
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('placeNotOpen', 'placeNotOpen', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: a place no row holds answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cg, true);
    v_answer := public.user_set_viewing_location(v_city);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('noProfile', 'noProfile', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: a caller with no profile row answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ce, true);
    v_answer := public.accept_legal('{}'::uuid[], v_lang, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('emptyList', 'emptyList', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: an empty acceptance answered %', v_answer;
    END IF;
    v_answer := public.accept_legal(ARRAY[v_pv], v_lang, false);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('adultRequired', 'adultRequired', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: an acceptance without the adult tick answered %', v_answer;
    END IF;
    v_answer := public.accept_legal(ARRAY[v_pv], v_tag, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('badLanguage', 'badLanguage', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: an acceptance in a language no one reads answered %', v_answer;
    END IF;
    v_answer := public.accept_legal(ARRAY[v_pv, v_dv], v_lang, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notInForce', 'notInForce', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: an acceptance of a draft answered %', v_answer;
    END IF;
    v_answer := public.accept_legal(ARRAY[v_xv], v_lang, true);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notApplicable', 'notApplicable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: an acceptance of another market''s document answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                      WHERE p.user_id IN (v_b, v_d, v_e, v_g)
                        AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.legal_acceptances a WHERE a.user_id IN (v_b, v_d, v_e, v_g))
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: a refused place or acceptance wrote a row';
    END IF;

    -- (c) the work: a place kept and cleared; an acceptance kept once, in the pair language.
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.user_set_viewing_location(v_city);
    IF (v_answer ->> 'ok', v_answer ->> 'id', v_answer ->> 'country') IS DISTINCT FROM ('true', v_city::text, v_code::text)
       OR v_answer ->> 'at' IS NULL THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: the place answered %', v_answer;
    END IF;
    IF (SELECT p.viewing_location_id FROM public.profiles p JOIN auth.users u ON u.id = p.user_id
         WHERE p.user_id = v_b AND u.email LIKE 'e2e-mig-%') IS DISTINCT FROM v_city THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: the place was not kept';
    END IF;
    v_answer := public.user_set_viewing_location(NULL);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'id', NULL, 'country', NULL, 'at', NULL), false)
       OR (SELECT p.viewing_location_id IS NULL FROM public.profiles p JOIN auth.users u ON u.id = p.user_id
            WHERE p.user_id = v_b AND u.email LIKE 'e2e-mig-%') IS NOT TRUE THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: the place was not cleared (%)', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ce, true);
    v_answer := public.accept_legal(ARRAY[v_pv], v_pair, true);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true), false) THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: the acceptance answered %', v_answer;
    END IF;
    v_answer := public.accept_legal(ARRAY[v_pv], v_lang, true);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true), false) THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: the repeat acceptance answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF (SELECT string_agg(a.language || '/' || a.adult_confirmed::text, ',') FROM public.legal_acceptances a
         WHERE a.user_id = v_e) IS DISTINCT FROM v_pair || '/true' THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: the acceptance was not kept once, in the pair language';
    END IF;

    -- (d) the dial: every call past the gate counts once (INC-844); a gate refusal counts none.
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_b::text THEN 'b' WHEN v_d::text THEN 'd' WHEN v_e::text THEN 'e' ELSE 'g' END
                   || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_b::text, v_d::text, v_e::text, v_g::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"b/viewing_place":3,"e/legal_accept":7,"g/viewing_place":1}'::jsonb THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals
         WHERE day = current_date AND door IN ('user_set_viewing_location', 'accept_legal')) IS DISTINCT FROM v_refused + 11 THEN
      RAISE EXCEPTION 'F1-5b part 5 proof: door_refusals did not meter the 11 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5b-part-5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5b-part-5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261117060400') ON CONFLICT DO NOTHING;
