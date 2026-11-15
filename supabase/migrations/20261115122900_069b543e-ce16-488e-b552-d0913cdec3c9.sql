-- e2e-areas: admin-locations

-- Foundations 1, turn F1-4b, part 3 of 9 — THE PLACE TREE'S ORDER AND ACTIVATION ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4b.md).
-- admin_reorder_locations and admin_set_location_active are redeclared WHOLE from their last declarations (live
-- md5 checked). Each gate becomes ONE door_context('staff', locations:update, staff_config, the country of the
-- place it acts on (a reorder: the parent's), match); both now spend staff_config as their lines say. Sentences
-- become door_refuse codes of the same words and the shell answers a refusal; the ancestry trigger's own raise
-- passes it unchanged. void → {ok:true}: DROP + CREATE, grants restated. Proofs on scratch countries and places
-- under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_reorder_locations(uuid,uuid[])', '20debae4abc3bb7df39bf876853fe672'],
    ['public.admin_set_location_active(uuid,boolean)', 'a3745632a8652791f7b3ebbea415a931']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115150100') THEN
    RAISE EXCEPTION 'F1-4b part 3: part 2 (89eaa5c9) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4b part 3: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 3: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_reorder_locations (whole from 20260915162505 :434; the gate on door_context with the place's country, the codes and the shell; jsonb)
DROP FUNCTION public.admin_reorder_locations(uuid, uuid[]);
CREATE FUNCTION public.admin_reorder_locations(p_parent_id uuid, p_ids uuid[])
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_bad   int;
  v_scope char(2);
BEGIN
  SELECT l.country_code INTO v_scope FROM public.locations l WHERE l.id = p_parent_id;
  PERFORM public.door_context('staff', 'locations', 'update', 'staff_config', v_scope, 'match');

  IF p_parent_id IS NULL THEN PERFORM public.door_refuse('orderCountriesInProfile'); END IF;

  SELECT count(*) INTO v_bad
    FROM unnest(coalesce(p_ids, '{}'::uuid[])) AS u(id)
   WHERE NOT EXISTS (SELECT 1 FROM public.locations l
                      WHERE l.id = u.id AND l.parent_id = p_parent_id);
  IF v_bad > 0 THEN PERFORM public.door_refuse('notAChild'); END IF;

  UPDATE public.locations l
     SET display_order = u.ord
    FROM (SELECT id, ordinality::integer AS ord
            FROM unnest(coalesce(p_ids, '{}'::uuid[])) WITH ORDINALITY AS t(id, ordinality)) u
   WHERE l.id = u.id;

  PERFORM public.log_audit('location.reorder', 'location', p_parent_id::text,
    jsonb_build_object('parent_id', p_parent_id, 'ids', to_jsonb(coalesce(p_ids, '{}'::uuid[]))));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_reorder_locations', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_reorder_locations(uuid, uuid[]) IS
  'F1-4b on the door shell (DEC-333): orders a place''s children behind door_context(staff, locations:update, staff_config, the parent''s country, match); refuses orderCountriesInProfile / notAChild; audits location.reorder; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_reorder_locations(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_reorder_locations(uuid, uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_reorder_locations(uuid, uuid[]) TO service_role;

-- ------------------------------------------------------------ 2. admin_set_location_active (whole from 20260915162505 :366; the gate on door_context with the place's country, the codes and the shell; jsonb)
DROP FUNCTION public.admin_set_location_active(uuid, boolean);
CREATE FUNCTION public.admin_set_location_active(p_id uuid, p_active boolean)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_old   public.locations;
  v_scope char(2);
BEGIN
  SELECT l.country_code INTO v_scope FROM public.locations l WHERE l.id = p_id;
  PERFORM public.door_context('staff', 'locations', 'update', 'staff_config', v_scope, 'match');

  SELECT * INTO v_old FROM public.locations WHERE id = p_id;
  IF NOT FOUND THEN PERFORM public.door_refuse('locationMissing'); END IF;
  IF v_old.is_active = p_active THEN RETURN jsonb_build_object('ok', true); END IF;

  -- the ancestry guard raises 'parentInactive' here; let it surface unchanged.
  UPDATE public.locations SET is_active = p_active WHERE id = p_id;

  PERFORM public.log_audit(
    CASE WHEN p_active THEN 'location.activate' ELSE 'location.retire' END,
    'location', p_id::text,
    jsonb_build_object('slug', v_old.slug, 'old', v_old.is_active, 'new', p_active));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_location_active', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_set_location_active(uuid, boolean) IS
  'F1-4b on the door shell (DEC-333): activates or retires a place behind door_context(staff, locations:update, staff_config, the place''s country, match); refuses locationMissing; the ancestry trigger''s parentInactive passes unchanged; audits location.activate / location.retire; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_location_active(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_location_active(uuid, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_location_active(uuid, boolean) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the
--     service role, never anon or PUBLIC; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied (403) for each door, notSignedIn (401); a country holder
--     refused permissionDenied:scope (403) for another country's place, for a place that does not exist and for
--     the countries' own order; none of them writes, audits or spends staff_config.
-- (c) each code with every earlier check cleared, its exact message and a 400, nothing written; the ancestry
--     trigger's parentInactive passes the shell as its own raise (P0001), unmetered.
-- (d) the country holder orders and activates (twice: the second a no-op) in his own country; the global holder
--     activates in another: {ok:true}.
-- (e) staff_config counted once per call past the gate (the no-op activation too); one audit line per success that
--     wrote; every refusal metered.
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
  v_role_l  uuid;
  v_axz     uuid;
  v_axy     uuid;
  v_sxz     text;
  v_sxy     text;
  v_rz1     uuid;
  v_rz2     uuid;
  v_cz      uuid;
  v_ry1     uuid;
  v_ry2     uuid;
  v_cy      uuid;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_state   text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f14b3-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_reorder_locations(uuid,uuid[])', 'f3d48e81b788c42ae2de8f261644aaf4'],
    ['public.admin_set_location_active(uuid,boolean)', '80e42fb16ab528da01e3178ec495f666']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4b part 3 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 3 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_xq)) THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: a scratch country code already exists';
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
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-locations', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'locations' AND p.action IN ('view', 'update', 'restructure');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 3 THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: a locations permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_l, 'global'), (v_deact, v_role_l, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_l, 'country', v_xz);

    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, display_order)
    VALUES (v_axz, 'region', v_xz, v_tag || ' rz1', v_tag || '-rz1', 5) RETURNING id INTO v_rz1;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, display_order)
    VALUES (v_axz, 'region', v_xz, v_tag || ' rz2', v_tag || '-rz2', 6) RETURNING id INTO v_rz2;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, center_lat, center_lng)
    VALUES (v_rz1, 'city', v_xz, v_tag || ' cz', v_tag || '-cz', 9.03::double precision, 38.74::double precision)
    RETURNING id INTO v_cz;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, display_order)
    VALUES (v_axy, 'region', v_xy, v_tag || ' ry1', v_tag || '-ry1', 5) RETURNING id INTO v_ry1;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, display_order)
    VALUES (v_axy, 'region', v_xy, v_tag || ' ry2', v_tag || '-ry2', 6) RETURNING id INTO v_ry2;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, center_lat, center_lng)
    VALUES (v_ry1, 'city', v_xy, v_tag || ' cy', v_tag || '-cy', 9.03::double precision, 38.74::double precision)
    RETURNING id INTO v_cy;

    -- (b) the gates: the account, the permission, no caller, then the scope (match on the place's country)
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_reorder_locations', 'admin_set_location_active');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_d::text)::text, true);
    v_answer := public.admin_set_location_active(v_rz1, true);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (b) a deactivated holder''s activation answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_reorder_locations(v_axz, ARRAY[v_rz2, v_rz1]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (b) a reorder without locations:update answered %', v_answer;
    END IF;
    v_answer := public.admin_set_location_active(v_rz1, true);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (b) an activation without locations:update answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_set_location_active(v_rz1, true);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (b) no caller''s activation answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_reorder_locations(v_axy, ARRAY[v_ry2, v_ry1]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (b) a reorder in another country answered %', v_answer;
    END IF;
    v_answer := public.admin_reorder_locations(NULL, ARRAY[v_axz]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (b) a reorder of the countries answered %', v_answer;
    END IF;
    v_answer := public.admin_reorder_locations(gen_random_uuid(), ARRAY[v_rz1]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (b) a reorder under no place answered %', v_answer;
    END IF;
    v_answer := public.admin_set_location_active(v_ry1, true);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (b) an activation in another country answered %', v_answer;
    END IF;
    v_answer := public.admin_set_location_active(gen_random_uuid(), true);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (b) an activation of no place answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT display_order FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_ry1) = 5 AND (SELECT display_order FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_rz1) = 5 AND NOT (SELECT is_active FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_ry1) AND NOT (SELECT is_active FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_rz1), false) THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (b) a refused reorder or activation wrote a place';
    END IF;

    -- (c) each code, every earlier check cleared (a global holder passes the gate), its exact message and a 400
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_reorder_locations(NULL, ARRAY[v_axz]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'orderCountriesInProfile' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (c) a reorder of the countries answered %', v_answer;
    END IF;
    v_answer := public.admin_reorder_locations(v_axz, ARRAY[v_cz]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notAChild' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (c) a reorder naming a grandchild answered %', v_answer;
    END IF;
    v_answer := public.admin_set_location_active(gen_random_uuid(), true);
    IF v_answer ->> 'message' IS DISTINCT FROM 'locationMissing' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (c) an activation of no place answered %', v_answer;
    END IF;
    -- the ancestry trigger's own raise is no door code: it passes the shell, unmetered and uncounted.
    v_msg := NULL; v_state := NULL;
    BEGIN
      v_answer := public.admin_set_location_active(v_cz, true);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'parentInactive' OR v_state IS DISTINCT FROM 'P0001' THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (c) an activation under a retired region answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    IF NOT coalesce(NOT (SELECT is_active FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_cz), false) THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (c) a refused activation wrote a place';
    END IF;

    -- (d) the successes: the country's holder in his own country, the global holder in another
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_reorder_locations(v_axz, ARRAY[v_rz2, v_rz1]);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false) THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (d) a reorder in the holder''s own country answered %', v_answer;
    END IF;
    v_answer := public.admin_set_location_active(v_rz1, true);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false) THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (d) an activation in the holder''s own country answered %', v_answer;
    END IF;
    v_answer := public.admin_set_location_active(v_rz1, true);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false) THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (d) an activation already made answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_set_location_active(v_ry1, true);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false) THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (d) a global holder''s activation answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT display_order FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_rz2) = 1 AND (SELECT display_order FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_rz1) = 2 AND (SELECT is_active FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_rz1) AND (SELECT is_active FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_ry1), false) THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: (d) the order and the activations differ';
    END IF;

    -- (e) the tallies: staff_config counted once per call past the gate (the no-op activation too), never for a gate's
    --     refusal or the trigger's raise; one audit line per success that wrote; every refusal metered
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 4 THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: the dial staff_config counted % for the staff caller (expected 4)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_staff;
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: the staff caller wrote % audit lines (expected 1)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'staff_config';
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: the dial staff_config counted % for the cstaff caller (expected 3)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_cstaff;
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: the cstaff caller wrote % audit lines (expected 2)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: the dial staff_config counted % for the plain caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_plain;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: the plain caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: the dial staff_config counted % for the deact caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_deact;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: the deact caller wrote % audit lines (expected 0)', v_count;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_reorder_locations', 'admin_set_location_active')) IS DISTINCT FROM v_refused + 12 THEN
      RAISE EXCEPTION 'F1-4b part 3 proof: door_refusals did not meter the 12 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14b3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14b3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115150200') ON CONFLICT DO NOTHING;
