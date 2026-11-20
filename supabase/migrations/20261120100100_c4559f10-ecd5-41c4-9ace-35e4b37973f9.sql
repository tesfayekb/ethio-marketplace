-- e2e-areas: admin-users, admin-roles

-- Foundations 1, turn F1-7c, part 2 of 4 — assign_role STORES ITS SCOPE UPPER-CASED (DEC-333; INC-1217; brief
-- docs/governance/briefs/f1-doors-7c.md; ruling docs/governance/briefs/f1-doors-7c-ruling-1.md, decision 1).
-- has_permission_scoped already folds the country it judges (upper(btrim(...))), so a scope given as `xz` passed the
-- gate and was stored as `xz`, where every reader of user_roles.scope_country compares upper-case codes. assign_role
-- now stores upper(p_scope_country) in the row and in its audit line. Redeclared whole from its live body
-- (20261120030500_2c3654f9 :36, md5 checked), byte for byte apart from those two expressions; header and grants as
-- live; the comment restated with the fold.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261120120000') THEN
    RAISE EXCEPTION 'F1-7c part 2: part 1 (909988ad) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.assign_role(uuid,text,character)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '28ba9888b3e7973c692d0c84fa805efb' THEN
    RAISE EXCEPTION 'F1-7c part 2: the live assign_role is not the body this file was built from (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. assign_role (whole from 20261120030500 :36)
CREATE OR REPLACE FUNCTION public.assign_role(p_target_user uuid, p_role_name text, p_scope_country character DEFAULT NULL::bpchar)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
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
  -- INC-1156: the scope's shape and the person, by the door's codes, before the insert reaches
  -- the column's length or the key.
  IF p_scope_country IS NOT NULL AND upper(p_scope_country::text) !~ '^[A-Z]{2}$' THEN
    PERFORM public.door_refuse('badCountryCode');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p_target_user) THEN
    PERFORM public.door_refuse('unknownUser');
  END IF;

  INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country, assigned_by)
  VALUES (p_target_user, v_role_id,
          CASE WHEN p_scope_country IS NULL THEN 'global' ELSE 'country' END,
          upper(p_scope_country), auth.uid())
  ON CONFLICT DO NOTHING;

  PERFORM public.log_audit('role.assign', 'user_roles', p_target_user::text,
    jsonb_build_object('role', p_role_name, 'scope_country', upper(p_scope_country),
                       'scope_type', CASE WHEN p_scope_country IS NULL THEN 'global' ELSE 'country' END));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('assign_role', 'staff_config', SQLERRM);
END; $$;
COMMENT ON FUNCTION public.assign_role(uuid, text, character) IS
  'F1-2 on the door shell (DEC-333): assigns a role behind door_context(staff, roles:assign, staff_config, the scope country in match mode — INC-834); refuses roleReserved (super_admin, user) / unknownRole / badCountryCode (a scope that is not two letters) / unknownUser (no account holds the person; F1-7b, INC-1156); stores the scope upper-cased (F1-7c, INC-1217); audits role.assign; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.assign_role(uuid, text, character) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.assign_role(uuid, text, character) TO authenticated;
GRANT ALL ON FUNCTION public.assign_role(uuid, text, character) TO service_role;

-- PROOFS (under a sentinel rollback; scratch users, roles and sessions only):
-- (a) the body is this file's (md5), its header and grants as live (EXECUTE for authenticated, never anon or PUBLIC).
-- (b) as a global holder of roles:assign with a fresh second factor: a scope given as `xz` is stored as XZ, in the
--     row and in the audit line; the same scope given again as `XZ` adds no second row; a global assignment stays
--     global with no scope.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_staff   uuid := gen_random_uuid();
  v_target  uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_role    uuid;
  v_grant   uuid;
  v_answer  jsonb;
  v_msg     text;
BEGIN
  v_tag := 'e2e-mig-f17c2-' || substr(v_hex, 1, 10);
  -- (a)
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) IS DISTINCT FROM 'c3ebab1053ab8977c6b87754d7893110' OR p.provolatile::text <> 'v'
             OR NOT p.prosecdef OR p.proconfig::text <> '{search_path=public}' OR p.prorettype <> 'jsonb'::regtype
        FROM pg_proc p WHERE p.oid = 'public.assign_role(uuid,text,character)'::regprocedure)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = 'public.assign_role(uuid,text,character)'::regprocedure)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', 'public.assign_role(uuid,text,character)'::regprocedure, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.assign_role(uuid,text,character)'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-7c part 2 proof (a): assign_role''s body, header or grants differ';
  END IF;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at)
    SELECT u, v_tag || '-' || n || '@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()
      FROM unnest(ARRAY[v_staff, v_target], ARRAY['staff', 'target']) AS t(u, n);
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_staff, v_tag || '-f', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'roles' AND p.action = 'assign';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 1 THEN
      RAISE EXCEPTION 'F1-7c part 2 proof: roles:assign is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role, 'global');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-given', v_tag) RETURNING id INTO v_grant;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);

    -- (b)
    v_answer := public.assign_role(v_target, v_tag || '-given', 'xz');
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false) THEN
      RAISE EXCEPTION 'F1-7c part 2 proof (b): a lower-case scope answered %', v_answer;
    END IF;
    IF (SELECT array_agg(ur.scope_country::text) FROM public.user_roles ur WHERE ur.user_id = v_target AND ur.role_id = v_grant
          AND ur.role_id IN (SELECT r.id FROM public.roles r WHERE r.name LIKE 'e2e-mig-%'))
         IS DISTINCT FROM ARRAY['XZ']
       OR (SELECT ur.scope_type FROM public.user_roles ur WHERE ur.user_id = v_target AND ur.role_id = v_grant
          AND ur.role_id IN (SELECT r.id FROM public.roles r WHERE r.name LIKE 'e2e-mig-%')) IS DISTINCT FROM 'country' THEN
      RAISE EXCEPTION 'F1-7c part 2 proof (b): a lower-case scope was not stored upper-cased';
    END IF;
    IF (SELECT a.meta ->> 'scope_country' FROM public.audit_log a
         WHERE a.actor_id = v_staff AND a.action = 'role.assign' AND a.entity_id = v_target::text) IS DISTINCT FROM 'XZ' THEN
      RAISE EXCEPTION 'F1-7c part 2 proof (b): the audit line does not carry the upper-cased scope';
    END IF;
    v_answer := public.assign_role(v_target, v_tag || '-given', 'XZ');
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false)
       OR (SELECT count(*) FROM public.user_roles ur WHERE ur.user_id = v_target AND ur.role_id = v_grant
             AND ur.role_id IN (SELECT r.id FROM public.roles r WHERE r.name LIKE 'e2e-mig-%')) <> 1 THEN
      RAISE EXCEPTION 'F1-7c part 2 proof (b): the same scope in upper case added a second row (%)', v_answer;
    END IF;
    v_answer := public.assign_role(v_staff, v_tag || '-given', NULL);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false)
       OR NOT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = v_staff AND ur.role_id = v_grant
                        AND ur.scope_type = 'global' AND ur.scope_country IS NULL
                        AND ur.role_id IN (SELECT r.id FROM public.roles r WHERE r.name LIKE 'e2e-mig-%')) THEN
      RAISE EXCEPTION 'F1-7c part 2 proof (b): a global assignment answered %', v_answer;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f17c2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f17c2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('response.status', '', true);
  PERFORM set_config('door.outer', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261120120100') ON CONFLICT DO NOTHING;
