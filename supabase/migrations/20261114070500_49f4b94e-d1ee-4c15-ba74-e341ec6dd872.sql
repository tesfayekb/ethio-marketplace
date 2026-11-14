-- e2e-areas: admin-roles, door-refusals
-- Foundations 1, turn F1-2, part 2 of 5 — THE ROLE-DEFINITION DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-2.md; the plan's §5 row F1-2; ruling 1 decisions 2, 4 and 5). The four doors that
-- define custom roles are redeclared WHOLE from their last declarations (live md5 checked), their gates
-- (has_permission + require_step_up_if_needed) replaced by ONE door_context('staff', …, 'staff_config', NULL,
-- 'global') call, their refusal sentences by door_refuse codes, and each takes the shell (EXCEPTION WHEN SQLSTATE
-- 'P0D01' → door_refused). Each returned void or uuid, which cannot carry the shell's answer: DROP + CREATE as
-- RETURNS jsonb, grants restated. Audit stays log_audit with each door's own meta. Folds: 'permission denied' →
-- permissionDenied (door_context); 'role not found' → unknownRole; 'role name is required' → nameRequired; 'role
-- name must be …' → badSlug; 'role name already taken' → duplicateKey:name; 'system roles are immutable' →
-- systemRole; 'role has members' → hasDependents; 'unknown permission' → unknownPermission; 'permission is not
-- assignable to custom roles' → permissionReserved; 'core permission locked' → corePermission. Proofs on scratch
-- rows under a sentinel rollback. Law 11, law 12, law 13, law 14, CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_create_role(text,text,text)', '4fd93dc4907b353ea7acd55729ed14d0'],
    ['public.admin_update_role(uuid,text,text)', '8283039b93b2111395e5149041df379d'],
    ['public.admin_delete_role(uuid)', '2ba6a6eddc588483b8121fb9fe097908'],
    ['public.admin_set_role_permission(uuid,uuid,boolean)', '83a47472db5215de27fec82afb9c01c6']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114090000')
     OR (SELECT prorettype FROM pg_proc WHERE oid = 'public.assign_role(uuid,text,character)'::regprocedure) <> 'jsonb'::regtype THEN
    RAISE EXCEPTION 'F1-2 part 2: part 1 (7102c888) must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-2 part 2: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_create_role (whole from 20260822050500 :126; uuid → jsonb)
DROP FUNCTION public.admin_create_role(text, text, text);
CREATE FUNCTION public.admin_create_role(
  p_name text,
  p_display_name text DEFAULT NULL,
  p_description text DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_ctx  public.door_ctx;
  v_name text;
  v_id   uuid;
BEGIN
  v_ctx := public.door_context('staff', 'roles', 'create', 'staff_config', NULL, 'global');

  v_name := lower(btrim(COALESCE(p_name, '')));
  IF v_name = '' THEN
    PERFORM public.door_refuse('nameRequired');
  END IF;
  IF v_name !~ '^[a-z0-9_-]+$' THEN
    PERFORM public.door_refuse('badSlug');
  END IF;
  IF EXISTS (SELECT 1 FROM public.roles r WHERE lower(r.name) = v_name) THEN
    PERFORM public.door_refuse('duplicateKey', 'name');
  END IF;

  INSERT INTO public.roles (name, display_name, description, is_system, priority)
  VALUES (v_name,
          NULLIF(btrim(COALESCE(p_display_name, '')), ''),
          NULLIF(btrim(COALESCE(p_description, '')), ''),
          false, 10)
  RETURNING id INTO v_id;

  PERFORM public.log_audit('role.create', 'roles', v_id::text,
    jsonb_build_object('name', v_name, 'display_name', p_display_name));
  RETURN jsonb_build_object('ok', true, 'id', v_id);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_create_role', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_create_role(text, text, text) IS
  'F1-2 on the door shell (DEC-333): creates a custom role behind door_context(staff, roles:create, staff_config, global); refuses nameRequired / badSlug / duplicateKey:name; audits role.create; answers {ok:true, id}.';
REVOKE ALL ON FUNCTION public.admin_create_role(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_create_role(text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_create_role(text, text, text) TO service_role;

-- ------------------------------------------------------------ 2. admin_update_role (whole from 20260822050500 :167; void → jsonb)
DROP FUNCTION public.admin_update_role(uuid, text, text);
CREATE FUNCTION public.admin_update_role(
  p_role_id uuid,
  p_display_name text DEFAULT NULL,
  p_description text DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_ctx public.door_ctx;
  v_old public.roles%ROWTYPE;
BEGIN
  v_ctx := public.door_context('staff', 'roles', 'update', 'staff_config', NULL, 'global');

  SELECT * INTO v_old FROM public.roles WHERE id = p_role_id;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownRole'); END IF;
  -- Clean message BEFORE the R1 trigger speaks; the trigger still has the
  -- last word and is never weakened.
  IF v_old.is_system THEN PERFORM public.door_refuse('systemRole'); END IF;

  UPDATE public.roles
     SET display_name = NULLIF(btrim(COALESCE(p_display_name, '')), ''),
         description  = NULLIF(btrim(COALESCE(p_description, '')), ''),
         updated_at   = now()
   WHERE id = p_role_id;

  PERFORM public.log_audit('role.update', 'roles', p_role_id::text,
    jsonb_build_object(
      'display_name', jsonb_build_object('old', v_old.display_name, 'new', p_display_name),
      'description',  jsonb_build_object('old', v_old.description,  'new', p_description)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_update_role', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_update_role(uuid, text, text) IS
  'F1-2 on the door shell (DEC-333): edits a custom role''s words behind door_context(staff, roles:update, staff_config, global); refuses unknownRole / systemRole; audits role.update; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_update_role(uuid, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_role(uuid, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_update_role(uuid, text, text) TO service_role;

-- ------------------------------------------------------------ 3. admin_delete_role (whole from 20260822050500 :201; void → jsonb)
DROP FUNCTION public.admin_delete_role(uuid);
CREATE FUNCTION public.admin_delete_role(p_role_id uuid)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_ctx public.door_ctx;
  v_old public.roles%ROWTYPE;
BEGIN
  v_ctx := public.door_context('staff', 'roles', 'delete', 'staff_config', NULL, 'global');

  SELECT * INTO v_old FROM public.roles WHERE id = p_role_id;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownRole'); END IF;
  IF v_old.is_system THEN PERFORM public.door_refuse('systemRole'); END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.role_id = p_role_id) THEN
    PERFORM public.door_refuse('hasDependents');
  END IF;

  DELETE FROM public.role_permissions WHERE role_id = p_role_id;
  DELETE FROM public.roles WHERE id = p_role_id;

  PERFORM public.log_audit('role.delete', 'roles', p_role_id::text,
    jsonb_build_object('name', v_old.name, 'display_name', v_old.display_name));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_delete_role', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_delete_role(uuid) IS
  'F1-2 on the door shell (DEC-333): deletes an empty custom role behind door_context(staff, roles:delete, staff_config, global); refuses unknownRole / systemRole / hasDependents (members); audits role.delete; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_delete_role(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_delete_role(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_delete_role(uuid) TO service_role;

-- ------------------------------------------------------------ 4. admin_set_role_permission (whole from 20260822065530 :31; void → jsonb)
DROP FUNCTION public.admin_set_role_permission(uuid, uuid, boolean);
CREATE FUNCTION public.admin_set_role_permission(
  p_role_id uuid, p_permission_id uuid, p_granted boolean)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx        public.door_ctx;
  v_role       public.roles%ROWTYPE;
  v_core       boolean;
  v_slug       text;
  v_assignable boolean;
BEGIN
  v_ctx := public.door_context('staff', 'roles', 'update', 'staff_config', NULL, 'global');

  SELECT * INTO v_role FROM public.roles WHERE id = p_role_id;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownRole'); END IF;
  IF v_role.is_system THEN PERFORM public.door_refuse('systemRole'); END IF;

  SELECT res.name || ':' || p.action, p.assignable
    INTO v_slug, v_assignable
    FROM public.permissions p
    JOIN public.resources res ON res.id = p.resource_id
   WHERE p.id = p_permission_id;
  IF v_slug IS NULL THEN PERFORM public.door_refuse('unknownPermission'); END IF;

  -- DEC-017: escalation vectors are reserved for system roles. The role here
  -- is non-system by the check above, so a GRANT is refused outright. A
  -- REVOKE of an existing grant stays allowed (cleanup path).
  IF p_granted AND v_assignable IS NOT TRUE THEN
    PERFORM public.door_refuse('permissionReserved');
  END IF;

  IF p_granted THEN
    INSERT INTO public.role_permissions (role_id, permission_id, is_core)
    VALUES (p_role_id, p_permission_id, false)
    ON CONFLICT (role_id, permission_id) DO NOTHING;
  ELSE
    SELECT rp.is_core INTO v_core
      FROM public.role_permissions rp
     WHERE rp.role_id = p_role_id AND rp.permission_id = p_permission_id;
    IF v_core IS NULL THEN
      RETURN jsonb_build_object('ok', true); -- already absent; nothing to audit
    END IF;
    IF v_core THEN PERFORM public.door_refuse('corePermission'); END IF;
    DELETE FROM public.role_permissions
     WHERE role_id = p_role_id AND permission_id = p_permission_id;
  END IF;

  PERFORM public.log_audit('role.permission_change', 'roles', p_role_id::text,
    jsonb_build_object('role', v_role.name, 'permission', v_slug, 'granted', p_granted));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_role_permission', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_set_role_permission(uuid, uuid, boolean) IS
  'F1-2 on the door shell (DEC-333): grants or revokes one permission of a custom role behind door_context(staff, roles:update, staff_config, global); refuses unknownRole / systemRole / unknownPermission / permissionReserved (DEC-017) / corePermission; audits role.permission_change; answers {ok:true} (an absent grant''s revoke too, unaudited).';
REVOKE ALL ON FUNCTION public.admin_set_role_permission(uuid, uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_role_permission(uuid, uuid, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_role_permission(uuid, uuid, boolean) TO service_role;

-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: each door VOLATILE SECURITY DEFINER, search_path public, RETURNS jsonb, EXECUTE for
--     authenticated and service_role and not for anon or PUBLIC, its body this file's (md5).
-- (b) the gates through door_context: a deactivated holder → accountDeactivated (403), a caller without the
--     permission → permissionDenied (403), neither spending the dial nor writing.
-- (c) each door's own codes, every earlier check cleared (law 14), the exact message, a 400, the dial counted once
--     and nothing written or audited; each door's success with its rows, its audit and its answer; door_refusals
--     metered per door.
DO $proof$
DECLARE
  v_tag     text := 'e2e-mig-f12d-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 10);
  v_res_name text := 'e2e_mig_res_' || substr(v_tag, 14);
  v_staff   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_target  uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_role_s  uuid;
  v_role_c  uuid;
  v_role_d  uuid;
  v_sys     uuid;
  v_res     uuid;
  v_perm_a  uuid;
  v_perm_r  uuid;
  v_perm_k  uuid;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_create_role(text,text,text)', '0827e879b29b39a6df01728247ef6a3a'],
    ['public.admin_update_role(uuid,text,text)', '7030c27da6f60577abce0fcc11a86972'],
    ['public.admin_delete_role(uuid)', '0f1126eb277c2f672889d2afa45adda1'],
    ['public.admin_set_role_permission(uuid,uuid,boolean)', 'e971cfa19aaa7aba816e99ca7c318e0f']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff,  v_tag || '-staff@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain,  v_tag || '-plain@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact,  v_tag || '-deact@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_target, v_tag || '-target@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    -- the staff role: the three definition permissions; a custom role with a member, an empty and a system scratch
    -- role; a scratch resource with an assignable, a reserved and a core-held permission
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role_s;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_s, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'roles' AND p.action IN ('create', 'update', 'delete');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_s) <> 3 THEN
      RAISE EXCEPTION 'F1-2 part 2 proof: the three role-definition permissions are not all declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-custom', v_tag) RETURNING id INTO v_role_c;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-empty', v_tag) RETURNING id INTO v_role_d;
    INSERT INTO public.roles (name, description, is_system) VALUES (v_tag || '-system', v_tag, true) RETURNING id INTO v_sys;
    INSERT INTO public.resources (name, description) VALUES (v_res_name, v_tag) RETURNING id INTO v_res;
    INSERT INTO public.permissions (resource_id, action, requires_step_up, assignable) VALUES (v_res, 'edit', false, true) RETURNING id INTO v_perm_a;
    INSERT INTO public.permissions (resource_id, action, requires_step_up, assignable) VALUES (v_res, 'view', false, false) RETURNING id INTO v_perm_r;
    INSERT INTO public.permissions (resource_id, action, requires_step_up, assignable) VALUES (v_res, 'update', false, true) RETURNING id INTO v_perm_k;
    INSERT INTO public.role_permissions (role_id, permission_id, is_core) VALUES (v_role_c, v_perm_k, true);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global'), (v_target, v_role_c, 'global');
    -- every role permission's step-up is cleared: a verified factor, an aal2 session, a fresh totp claim
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_staff, v_deact]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');

    -- (b) the gates
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_create_role(v_tag || '-by-deact');
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403'
       OR v_count <> 0 OR EXISTS (SELECT 1 FROM public.roles WHERE name = v_tag || '-by-deact') THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (b): a deactivated holder answered % (count %)', v_answer, v_count;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_delete_role(v_role_d);
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403'
       OR v_count <> 0 OR NOT EXISTS (SELECT 1 FROM public.roles WHERE id = v_role_d) THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (b): a caller without roles:delete answered % (count %)', v_answer, v_count;
    END IF;

    -- (c) the staff caller (global, stepped up)
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_create_role', 'admin_update_role', 'admin_delete_role', 'admin_set_role_permission');
    -- admin_create_role: nameRequired, badSlug (non-empty), duplicateKey:name (non-empty, well-shaped), then a new role
    v_answer := public.admin_create_role('  ');
    IF v_answer ->> 'message' IS DISTINCT FROM 'nameRequired' THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): a blank role name answered %', v_answer;
    END IF;
    v_answer := public.admin_create_role(v_tag || ' bad');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badSlug' THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): a misshapen role name answered %', v_answer;
    END IF;
    v_answer := public.admin_create_role(upper(v_tag) || '-CUSTOM');
    IF v_answer ->> 'message' IS DISTINCT FROM 'duplicateKey:name' THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): a taken role name answered %', v_answer;
    END IF;
    v_answer := public.admin_create_role(v_tag || '-new', ' New ', NULL);
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE
       OR (v_answer ->> 'id')::uuid IS DISTINCT FROM (SELECT r.id FROM public.roles r WHERE r.name = v_tag || '-new' AND NOT r.is_system AND r.display_name = 'New')
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_staff AND a.action = 'role.create' AND a.entity_id = v_answer ->> 'id') THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): admin_create_role answered %', v_answer;
    END IF;
    -- admin_update_role: unknownRole, systemRole (a role that exists), then a custom role's words
    v_answer := public.admin_update_role(gen_random_uuid(), 'x', NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownRole' THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): admin_update_role of no role answered %', v_answer;
    END IF;
    v_answer := public.admin_update_role(v_sys, 'x', NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'systemRole'
       OR (SELECT display_name FROM public.roles WHERE id = v_sys) IS NOT NULL THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): admin_update_role of a system role answered %', v_answer;
    END IF;
    v_answer := public.admin_update_role(v_role_c, 'Custom', 'words');
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE
       OR (SELECT display_name || '/' || description FROM public.roles WHERE id = v_role_c) IS DISTINCT FROM 'Custom/words'
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_staff AND a.action = 'role.update' AND a.entity_id = v_role_c::text) THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): admin_update_role answered %', v_answer;
    END IF;
    -- admin_delete_role: unknownRole, systemRole, hasDependents (a custom role with a member), then an empty role
    v_answer := public.admin_delete_role(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownRole' THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): admin_delete_role of no role answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_role(v_sys);
    IF v_answer ->> 'message' IS DISTINCT FROM 'systemRole' OR NOT EXISTS (SELECT 1 FROM public.roles WHERE id = v_sys) THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): admin_delete_role of a system role answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_role(v_role_c);
    IF v_answer ->> 'message' IS DISTINCT FROM 'hasDependents' OR NOT EXISTS (SELECT 1 FROM public.roles WHERE id = v_role_c) THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): admin_delete_role of a role with members answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_role(v_role_d);
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR EXISTS (SELECT 1 FROM public.roles WHERE id = v_role_d)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_staff AND a.action = 'role.delete' AND a.entity_id = v_role_d::text) THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): admin_delete_role answered %', v_answer;
    END IF;
    -- admin_set_role_permission: unknownRole, systemRole, unknownPermission, permissionReserved (a grant of the
    -- reserved one), corePermission (a revoke of the core-held one), an absent revoke, then a grant
    v_answer := public.admin_set_role_permission(gen_random_uuid(), v_perm_a, true);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownRole' THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): a permission on no role answered %', v_answer;
    END IF;
    v_answer := public.admin_set_role_permission(v_sys, v_perm_a, true);
    IF v_answer ->> 'message' IS DISTINCT FROM 'systemRole' THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): a permission on a system role answered %', v_answer;
    END IF;
    v_answer := public.admin_set_role_permission(v_role_c, gen_random_uuid(), true);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownPermission' THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): an unknown permission answered %', v_answer;
    END IF;
    v_answer := public.admin_set_role_permission(v_role_c, v_perm_r, true);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionReserved'
       OR EXISTS (SELECT 1 FROM public.role_permissions WHERE role_id = v_role_c AND permission_id = v_perm_r) THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): a reserved permission''s grant answered %', v_answer;
    END IF;
    v_answer := public.admin_set_role_permission(v_role_c, v_perm_k, false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'corePermission'
       OR NOT EXISTS (SELECT 1 FROM public.role_permissions WHERE role_id = v_role_c AND permission_id = v_perm_k) THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): a core permission''s revoke answered %', v_answer;
    END IF;
    v_answer := public.admin_set_role_permission(v_role_c, v_perm_a, false);
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE
       OR EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_staff AND a.action = 'role.permission_change' AND a.entity_id = v_role_c::text) THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): an absent grant''s revoke answered % or was audited', v_answer;
    END IF;
    v_answer := public.admin_set_role_permission(v_role_c, v_perm_a, true);
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE
       OR NOT EXISTS (SELECT 1 FROM public.role_permissions WHERE role_id = v_role_c AND permission_id = v_perm_a AND NOT is_core)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_staff AND a.action = 'role.permission_change'
                        AND a.entity_id = v_role_c::text AND (a.meta ->> 'granted')::boolean) THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): a grant answered %', v_answer;
    END IF;
    -- the dial: 5 successes and 13 refusals past the gates, each counted once; 13 refusals metered
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 18 THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): the dial staff_config counted % of 18 calls', v_count;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_create_role', 'admin_update_role', 'admin_delete_role', 'admin_set_role_permission'))
       IS DISTINCT FROM v_refused + 13 THEN
      RAISE EXCEPTION 'F1-2 part 2 proof (c): door_refusals did not meter the 13 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f12p2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f12p2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114090100') ON CONFLICT DO NOTHING;
