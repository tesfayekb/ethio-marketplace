-- e2e-areas: admin-roles, admin-users, door-refusals
-- Foundations 1, turn F1-2, part 1 of 5 — THE ROLE-ASSIGNMENT DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-2.md; the plan's §5 row F1-2; ruling 1 decisions 2, 4 and 5). assign_role and
-- revoke_role are redeclared WHOLE from their last declarations (live md5 checked), their gates (has_permission +
-- require_step_up_if_needed) replaced by ONE door_context('staff', 'roles', 'assign', …) call that also spends the
-- manifest's dial staff_config, their refusal sentences by door_refuse codes, and each takes the shell (EXCEPTION
-- WHEN SQLSTATE 'P0D01' → door_refused). Each returned void, which cannot carry the shell's answer: DROP + CREATE
-- as RETURNS jsonb, grants restated. INC-834: assign_role is scoped by its country argument (match), revoke_role
-- global. Audit stays log_audit with each door's own meta (the console and the tests read it). Folds: 'not
-- permitted to …' → permissionDenied (door_context); 'role % is not assignable/revocable …' → roleReserved:<role>;
-- 'unknown role' → unknownRole. Proofs on scratch rows under a sentinel rollback. Law 11, law 12, law 13, law 14,
-- CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.assign_role(uuid,text,character)', '8c494275feb267bbb2b9402929709981'],
    ['public.revoke_role(uuid,text)', '88478a12f150718f1342c5219a9fe94e']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261109110000') THEN
    RAISE EXCEPTION 'F1-2 part 1: the ledger''s newest mark 20261109110000 is not applied';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'staff_config') THEN
    RAISE EXCEPTION 'F1-2 part 1: door_context, door_refused or the dial staff_config is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-2 part 1: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. assign_role (whole from 20260817052646 :91; void → jsonb)
DROP FUNCTION public.assign_role(uuid, text, character);
CREATE FUNCTION public.assign_role(p_target_user uuid, p_role_name text, p_scope_country char(2) DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ctx     public.door_ctx;
  v_role_id uuid;
BEGIN
  v_ctx := public.door_context('staff', 'roles', 'assign', 'staff_config', p_scope_country, 'match');

  IF p_role_name IN ('super_admin','user') THEN
    PERFORM public.door_refuse('roleReserved', p_role_name);
  END IF;
  SELECT id INTO v_role_id FROM public.roles WHERE name = p_role_name;
  IF v_role_id IS NULL THEN PERFORM public.door_refuse('unknownRole'); END IF;

  INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country, assigned_by)
  VALUES (p_target_user, v_role_id,
          CASE WHEN p_scope_country IS NULL THEN 'global' ELSE 'country' END,
          p_scope_country, auth.uid())
  ON CONFLICT DO NOTHING;

  PERFORM public.log_audit('role.assign', 'user_roles', p_target_user::text,
    jsonb_build_object('role', p_role_name, 'scope_country', p_scope_country,
                       'scope_type', CASE WHEN p_scope_country IS NULL THEN 'global' ELSE 'country' END));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('assign_role', 'staff_config', SQLERRM);
END; $$;
COMMENT ON FUNCTION public.assign_role(uuid, text, character) IS
  'F1-2 on the door shell (DEC-333): assigns a role behind door_context(staff, roles:assign, staff_config, the scope country in match mode — INC-834); refuses roleReserved (super_admin, user) / unknownRole; audits role.assign; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.assign_role(uuid, text, character) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.assign_role(uuid, text, character) TO authenticated;
GRANT ALL ON FUNCTION public.assign_role(uuid, text, character) TO service_role;

-- ------------------------------------------------------------ 2. revoke_role (whole from 20260817052646 :121; void → jsonb)
DROP FUNCTION public.revoke_role(uuid, text);
CREATE FUNCTION public.revoke_role(p_target_user uuid, p_role_name text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ctx     public.door_ctx;
  v_role_id uuid;
BEGIN
  v_ctx := public.door_context('staff', 'roles', 'assign', 'staff_config', NULL, 'global');

  IF p_role_name IN ('super_admin','user') THEN
    PERFORM public.door_refuse('roleReserved', p_role_name);
  END IF;
  SELECT id INTO v_role_id FROM public.roles WHERE name = p_role_name;
  IF v_role_id IS NULL THEN PERFORM public.door_refuse('unknownRole'); END IF;

  DELETE FROM public.user_roles WHERE user_id = p_target_user AND role_id = v_role_id;

  PERFORM public.log_audit('role.revoke', 'user_roles', p_target_user::text,
    jsonb_build_object('role', p_role_name));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('revoke_role', 'staff_config', SQLERRM);
END; $$;
COMMENT ON FUNCTION public.revoke_role(uuid, text) IS
  'F1-2 on the door shell (DEC-333): revokes a role behind door_context(staff, roles:assign, staff_config, global); refuses roleReserved (super_admin, user) / unknownRole; audits role.revoke; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.revoke_role(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.revoke_role(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.revoke_role(uuid, text) TO service_role;


-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: each door VOLATILE SECURITY DEFINER, search_path public, RETURNS jsonb, EXECUTE for
--     authenticated and service_role and not for anon or PUBLIC, its body this file's (md5).
-- (b) the gates through door_context: a deactivated holder → accountDeactivated (403), a caller without the
--     permission → permissionDenied (403), neither spending the dial nor writing; INC-834 on assign_role — a
--     country holder of roles:assign refuses a global assignment and another country's (permissionDenied:scope)
--     and passes for its own country.
-- (c) each door's own codes, every earlier check cleared (law 14), the exact message, a 400, the dial counted once
--     and nothing written or audited; each door's success with its rows, its audit and its answer; door_refusals
--     metered per door.
DO $proof$
DECLARE
  v_tag     text := 'e2e-mig-f12r-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 10);
  v_xz      character(2) := 'XZ';
  v_xy      character(2) := 'XY';
  v_staff   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_cstaff  uuid := gen_random_uuid();
  v_target  uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess_c  uuid := gen_random_uuid();
  v_role_s  uuid;
  v_role_c  uuid;
  v_answer  jsonb;
  v_count   integer;
  v_rows    integer;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  -- (a)
  v_pairs := ARRAY[
    ['public.assign_role(uuid,text,character)', '1546e9c54840be08feb2f509b1e18958'],
    ['public.revoke_role(uuid,text)', 'ab80b44d06a5858a043cd4e3c5bd7923']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy)) THEN
      RAISE EXCEPTION 'F1-2 part 1 proof: a scratch country code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', true), (v_xy, v_tag || ' xy', true);
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff,  v_tag || '-staff@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain,  v_tag || '-plain@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact,  v_tag || '-deact@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_cstaff, v_tag || '-cstaff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_target, v_tag || '-target@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    -- the staff role: roles:assign; a custom scratch role to assign
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role_s;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_s, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'roles' AND p.action = 'assign';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_s) <> 1 THEN
      RAISE EXCEPTION 'F1-2 part 1 proof: roles:assign is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-custom', v_tag) RETURNING id INTO v_role_c;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_s, 'country', v_xz);
    -- roles:assign's step-up is cleared: a verified factor, an aal2 session, a fresh totp claim
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_staff, v_cstaff, v_deact]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');

    -- (b) the gates
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.assign_role(v_target, v_tag || '-custom', NULL);
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    SELECT count(*)::integer INTO v_rows FROM public.user_roles ur
     WHERE ur.user_id = v_target AND ur.role_id = v_role_c
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_target AND u.email LIKE 'e2e-mig-%');
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403'
       OR v_count <> 0 OR v_rows <> 0 THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (b): a deactivated holder answered % (count %, rows %)', v_answer, v_count, v_rows;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.assign_role(v_target, v_tag || '-custom', NULL);
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    SELECT count(*)::integer INTO v_rows FROM public.user_roles ur
     WHERE ur.user_id = v_target AND ur.role_id = v_role_c
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_target AND u.email LIKE 'e2e-mig-%');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403'
       OR v_count <> 0 OR v_rows <> 0 THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (b): a caller without roles:assign answered % (count %, rows %)', v_answer, v_count, v_rows;
    END IF;
    -- INC-834: the country holder of roles:assign (XZ), stepped up on its own session
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess_c, v_cstaff, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess_c, now(), now(), 'totp');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.assign_role(v_target, v_tag || '-custom', NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (b): a country holder''s global assignment answered %', v_answer;
    END IF;
    v_answer := public.assign_role(v_target, v_tag || '-custom', v_xy);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (b): a country holder''s other-country assignment answered %', v_answer;
    END IF;
    v_answer := public.assign_role(v_target, v_tag || '-custom', v_xz);
    SELECT count(*)::integer INTO v_rows FROM public.user_roles ur
     WHERE ur.user_id = v_target AND ur.role_id = v_role_c AND ur.scope_type = 'country' AND ur.scope_country = v_xz
       AND ur.assigned_by = v_cstaff
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_target AND u.email LIKE 'e2e-mig-%');
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'staff_config';
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_rows <> 1 OR v_count <> 1 THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (b): a country holder''s own-country assignment answered % (rows %, count %)', v_answer, v_rows, v_count;
    END IF;

    -- (c) the staff caller (global, stepped up)
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('assign_role', 'revoke_role');
    -- assign_role / revoke_role: roleReserved (first after the gates), unknownRole (a free, unreserved name)
    v_answer := public.assign_role(v_target, 'super_admin', NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'roleReserved:super_admin' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (c): assign_role super_admin answered %', v_answer;
    END IF;
    v_answer := public.assign_role(v_target, v_tag || '-none', NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownRole' THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (c): assign_role of an unknown role answered %', v_answer;
    END IF;
    v_answer := public.revoke_role(v_target, 'user');
    IF v_answer ->> 'message' IS DISTINCT FROM 'roleReserved:user' THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (c): revoke_role user answered %', v_answer;
    END IF;
    v_answer := public.revoke_role(v_target, v_tag || '-none');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownRole' THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (c): revoke_role of an unknown role answered %', v_answer;
    END IF;
    v_answer := public.revoke_role(v_target, v_tag || '-custom');
    SELECT count(*)::integer INTO v_rows FROM public.user_roles ur
     WHERE ur.user_id = v_target AND ur.role_id = v_role_c
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_target AND u.email LIKE 'e2e-mig-%');
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_rows <> 0
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_staff AND a.action = 'role.revoke'
                        AND a.entity_id = v_target::text AND a.meta ->> 'role' = v_tag || '-custom') THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (c): revoke_role answered % (rows %)', v_answer, v_rows;
    END IF;
    v_answer := public.assign_role(v_target, v_tag || '-custom', NULL);
    SELECT count(*)::integer INTO v_rows FROM public.user_roles ur
     WHERE ur.user_id = v_target AND ur.role_id = v_role_c AND ur.scope_type = 'global' AND ur.assigned_by = v_staff
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_target AND u.email LIKE 'e2e-mig-%');
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_rows <> 1
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_staff AND a.action = 'role.assign'
                        AND a.entity_id = v_target::text AND a.meta ->> 'scope_type' = 'global') THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (c): assign_role answered % (rows %)', v_answer, v_rows;
    END IF;
    -- the dial: 2 successes and 4 refusals past the gates, each counted once; 4 refusals metered
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 6 THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (c): the dial staff_config counted % of 6 calls', v_count;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('assign_role', 'revoke_role'))
       IS DISTINCT FROM v_refused + 4 THEN
      RAISE EXCEPTION 'F1-2 part 1 proof (c): door_refusals did not meter the 4 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f12p1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f12p1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114090000') ON CONFLICT DO NOTHING;
