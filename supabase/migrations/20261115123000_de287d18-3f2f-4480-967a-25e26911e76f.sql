-- e2e-areas: admin-countries

-- Foundations 1, turn F1-4b, part 4 of 9 — THE COUNTRY EDITOR ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4b.md).
-- admin_upsert_country is redeclared WHOLE from its last declaration (live md5 checked). Its gate becomes ONE
-- door_context('staff', countries:update, staff_config, NULL, global): a country's display order is every market's.
-- Sentences become door_refuse codes of the same words and the shell answers a refusal. void → {ok:true}: DROP +
-- CREATE, grants restated. Proofs on scratch countries under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_upsert_country(text,text,text,text,integer)', 'c758ed59da93c3f4739a1a862239047d']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115150200') THEN
    RAISE EXCEPTION 'F1-4b part 4: part 3 (069b543e) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4b part 4: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 4: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_upsert_country (whole from 20261029015903 :117; the gate on door_context, the codes and the shell; jsonb)
DROP FUNCTION public.admin_upsert_country(text, text, text, text, integer);
CREATE FUNCTION public.admin_upsert_country(p_code text, p_name_en text, p_unit_system text, p_currency_code text, p_display_order integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_code char(2);
  v_old  public.countries;
BEGIN
  PERFORM public.door_context('staff', 'countries', 'update', 'staff_config', NULL, 'global');

  v_code := upper(coalesce(p_code, ''));
  IF v_code !~ '^[A-Z]{2}$' THEN PERFORM public.door_refuse('badCountryCode'); END IF;
  IF p_unit_system IS NOT NULL AND p_unit_system NOT IN ('metric','imperial') THEN
    PERFORM public.door_refuse('badUnitSystem');
  END IF;
  IF p_currency_code IS NOT NULL AND upper(p_currency_code) !~ '^[A-Z]{3}$' THEN
    PERFORM public.door_refuse('badCurrency');
  END IF;

  SELECT * INTO v_old FROM public.countries WHERE code = v_code;
  IF NOT FOUND THEN
    IF coalesce(trim(coalesce(p_name_en, '')), '') = '' THEN PERFORM public.door_refuse('nameRequired'); END IF;
    INSERT INTO public.countries (code, name_en, is_active, unit_system, currency_code, display_order)
    VALUES (v_code, p_name_en, false, coalesce(p_unit_system, 'metric'),
            upper(p_currency_code), coalesce(p_display_order, 0));
  ELSE
    -- never touches is_active: opening a market is admin_set_country_active.
    UPDATE public.countries c
       SET name_en       = coalesce(p_name_en, c.name_en),
           unit_system   = coalesce(p_unit_system, c.unit_system),
           currency_code = coalesce(upper(p_currency_code), c.currency_code),
           display_order = coalesce(p_display_order, c.display_order)
     WHERE c.code = v_code;
  END IF;

  PERFORM public.log_audit('country.upsert', 'country', v_code,
    jsonb_build_object(
      'old', CASE WHEN v_old.code IS NULL THEN NULL ELSE jsonb_build_object(
        'name_en', v_old.name_en, 'unit_system', v_old.unit_system,
        'currency_code', v_old.currency_code, 'display_order', v_old.display_order) END,
      'new', (SELECT jsonb_build_object('name_en', n.name_en, 'unit_system', n.unit_system,
        'currency_code', n.currency_code, 'display_order', n.display_order)
        FROM public.countries n WHERE n.code = v_code)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_upsert_country', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_upsert_country(text, text, text, text, integer) IS
  'F1-4b on the door shell (DEC-333): creates or edits a country behind door_context(staff, countries:update, staff_config, global); refuses badCountryCode / badUnitSystem / badCurrency / nameRequired; audits country.upsert; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_upsert_country(text, text, text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_country(text, text, text, text, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: the door VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the
--     service role, never anon or PUBLIC; its body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied (403), notSignedIn (401); a country holder refused
--     permissionDenied:scope (403) even for his own country (global); none of them writes, audits or spends
--     staff_config.
-- (c) each code with every earlier check cleared, its exact message and a 400, nothing written.
-- (d) the global holder edits a country and creates one: {ok:true}.
-- (e) staff_config counted once per call past the gate; one audit line per success; every refusal metered.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- scratch codes no market holds (K4 exception, as earlier proofs' 'XZ')
  v_xz      character(2) := 'XZ';
  v_xy      character(2) := 'XY';
  v_xq      character(2) := 'XQ';
  v_staff   uuid := gen_random_uuid();
  v_cstaff  uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess_c  uuid := gen_random_uuid();
  v_sess_d  uuid := gen_random_uuid();
  v_role_c  uuid;
  v_axz     uuid;
  v_axy     uuid;
  v_sxz     text;
  v_sxy     text;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f14b4-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_upsert_country(text,text,text,text,integer)', 'd897481fbdaca05de73d6f6d2b8979ba']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4b part 4 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 4 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_xq)) THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: a scratch country code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', false), (v_xy, v_tag || ' xy', false);
    SELECT l.id, l.slug INTO STRICT v_axz, v_sxz FROM public.locations l WHERE l.slug LIKE 'e2e-mig-%' AND l.level = 'country' AND l.country_code = v_xz;
    SELECT l.id, l.slug INTO STRICT v_axy, v_sxy FROM public.locations l WHERE l.slug LIKE 'e2e-mig-%' AND l.level = 'country' AND l.country_code = v_xy;
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, v_tag || '-staff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_cstaff, v_tag || '-cstaff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-deact@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_staff, v_cstaff, v_deact]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_sess, v_staff, now(), now(), 'aal2'), (v_sess_c, v_cstaff, now(), now(), 'aal2'), (v_sess_d, v_deact, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess_c, now(), now(), 'totp'),
           (gen_random_uuid(), v_sess_d, now(), now(), 'totp');
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-countries', v_tag) RETURNING id INTO v_role_c;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_c, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'countries' AND p.action IN ('view', 'update', 'activate');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_c) <> 3 THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: a countries permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_c, 'global'), (v_deact, v_role_c, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_c, 'country', v_xz);


    -- (b) the gates: the account, the permission, no caller, then the scope (global for the editor; match on the
    --     country for the opening and the root order)
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_upsert_country');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_d::text)::text, true);
    v_answer := public.admin_upsert_country(v_xz::text, v_tag || ' renamed', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (b) a deactivated holder''s edit answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_upsert_country(v_xz::text, v_tag || ' renamed', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (b) an edit without countries:update answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_upsert_country(v_xz::text, v_tag || ' renamed', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (b) no caller''s edit answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_upsert_country(v_xz::text, v_tag || ' renamed', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (b) a country holder''s edit of his own country (the editor is global) answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT name_en FROM public.countries WHERE code = v_xz) = v_tag || ' xz', false) THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (b) a refused edit wrote a country';
    END IF;

    -- (c) each code, every earlier check cleared (a global holder passes the gate), its exact message and a 400
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_upsert_country('X1', v_tag || ' renamed', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badCountryCode' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (c) an edit of a malformed code answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_country(v_xz::text, NULL, 'furlong', NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badUnitSystem' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (c) an edit with an unknown unit system answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_country(v_xz::text, NULL, NULL, '12', NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badCurrency' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (c) an edit with a malformed currency answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_country(v_xq::text, '  ', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'nameRequired' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (c) a new country with a blank name answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT name_en FROM public.countries WHERE code = v_xz) = v_tag || ' xz' AND (SELECT unit_system FROM public.countries WHERE code = v_xz) = 'metric' AND NOT EXISTS (SELECT 1 FROM public.countries WHERE code = v_xq), false) THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (c) a refused edit wrote a country';
    END IF;

    -- (d) the successes: the country's holder opens and orders his own country; the global holder edits, creates and
    --     opens
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_upsert_country(v_xy::text, v_tag || ' xy renamed', NULL, NULL, NULL);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false) THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (d) a global holder''s edit answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_country(v_xq::text, v_tag || ' xq', NULL, NULL, NULL);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false) THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (d) a global holder''s new country answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT name_en FROM public.countries WHERE code = v_xy) = v_tag || ' xy renamed' AND NOT (SELECT is_active FROM public.countries WHERE code = v_xq), false) THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: (d) the edits differ';
    END IF;

    -- (e) the tallies: staff_config counted once per call past the gate; one audit line per success; every refusal
    --     metered
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 6 THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: the dial staff_config counted % for the staff caller (expected 6)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_staff;
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: the staff caller wrote % audit lines (expected 2)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: the dial staff_config counted % for the cstaff caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_cstaff;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: the cstaff caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: the dial staff_config counted % for the plain caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_plain;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: the plain caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: the dial staff_config counted % for the deact caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_deact;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: the deact caller wrote % audit lines (expected 0)', v_count;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_upsert_country')) IS DISTINCT FROM v_refused + 8 THEN
      RAISE EXCEPTION 'F1-4b part 4 proof: door_refusals did not meter the 8 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14b4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14b4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115150300') ON CONFLICT DO NOTHING;
