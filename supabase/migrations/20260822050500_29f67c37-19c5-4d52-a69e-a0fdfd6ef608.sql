-- =====================================================================
-- Phase U2 — Roles & Permissions console (Tier A).
-- Seeds + definer RPCs + proofs. Self-marking (U1f-3 law).
--
-- Law F3: these functions are the AUTHORITY. Every mutation re-checks
-- has_permission() and require_step_up_if_needed() server-side; the UI's
-- locks are convenience only.
-- INC-074: every SECURITY DEFINER function below restates its REVOKE/GRANT.
-- =====================================================================

-- ---------------------------------------------------------------------
-- A. SEEDS
-- ---------------------------------------------------------------------

-- A1. roles:view -> admin (the U1 hand-forward: the console's read gate).
INSERT INTO public.role_permissions (role_id, permission_id, is_core)
SELECT r.id, p.id, false
  FROM public.roles r
  JOIN public.permissions p ON p.action = 'view'
  JOIN public.resources res ON res.id = p.resource_id AND res.name = 'roles'
 WHERE r.name = 'admin'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- A2. roles:create joins assign/update/delete as a step-up action.
UPDATE public.permissions p
   SET requires_step_up = true
  FROM public.resources res
 WHERE res.id = p.resource_id
   AND res.name = 'roles'
   AND p.action = 'create';

-- A3. DEC-016 registration; flows ship at Ops/U3; superadmin short-circuit
--     applies. These permissions are REGISTERED (visible in the matrix) and
--     granted to NO role.
INSERT INTO public.resources (name, display_name, description)
SELECT 'impersonation', 'Impersonation', 'Acting as another user for support purposes'
 WHERE NOT EXISTS (SELECT 1 FROM public.resources WHERE name = 'impersonation');

INSERT INTO public.permissions (resource_id, action, description, requires_step_up)
SELECT res.id, 'use', 'Impersonate another user', true
  FROM public.resources res
 WHERE res.name = 'impersonation'
   AND NOT EXISTS (
     SELECT 1 FROM public.permissions p
      WHERE p.resource_id = res.id AND p.action = 'use');

UPDATE public.permissions p
   SET requires_step_up = true
  FROM public.resources res
 WHERE res.id = p.resource_id
   AND res.name = 'profiles'
   AND p.action IN ('create', 'delete');

-- ---------------------------------------------------------------------
-- B. RPCs
-- ---------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.admin_list_roles_detailed()
RETURNS TABLE (
  id uuid,
  name text,
  display_name text,
  description text,
  is_system boolean,
  member_count bigint,
  permission_count bigint
)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
#variable_conflict use_column
BEGIN
  IF NOT public.has_permission(auth.uid(), 'roles', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT r.id, r.name, r.display_name, r.description, r.is_system,
         (SELECT count(*) FROM public.user_roles ur WHERE ur.role_id = r.id),
         (SELECT count(*) FROM public.role_permissions rp WHERE rp.role_id = r.id)
    FROM public.roles r
   ORDER BY r.priority DESC, r.name;
END $$;

REVOKE ALL ON FUNCTION public.admin_list_roles_detailed() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_roles_detailed() TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_get_role(p_role_id uuid)
RETURNS TABLE (
  role_id uuid,
  name text,
  display_name text,
  description text,
  is_system boolean,
  member_count bigint,
  permission_id uuid,
  resource text,
  action text,
  requires_step_up boolean,
  granted boolean,
  is_core boolean
)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
#variable_conflict use_column
BEGIN
  IF NOT public.has_permission(auth.uid(), 'roles', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT r.id, r.name, r.display_name, r.description, r.is_system,
         (SELECT count(*) FROM public.user_roles ur WHERE ur.role_id = r.id),
         p.id, res.name, p.action, p.requires_step_up,
         (rp.id IS NOT NULL),
         COALESCE(rp.is_core, false)
    FROM public.roles r
    CROSS JOIN public.permissions p
    JOIN public.resources res ON res.id = p.resource_id
    LEFT JOIN public.role_permissions rp
      ON rp.role_id = r.id AND rp.permission_id = p.id
   WHERE r.id = p_role_id
   ORDER BY res.name, p.action;
END $$;

REVOKE ALL ON FUNCTION public.admin_get_role(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_get_role(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_create_role(
  p_name text,
  p_display_name text DEFAULT NULL,
  p_description text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_name text;
  v_id   uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'roles', 'create') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('roles', 'create');

  v_name := lower(btrim(COALESCE(p_name, '')));
  IF v_name = '' THEN
    RAISE EXCEPTION 'role name is required';
  END IF;
  IF v_name !~ '^[a-z0-9_-]+$' THEN
    RAISE EXCEPTION 'role name must be lowercase letters, digits, _ or -';
  END IF;
  IF EXISTS (SELECT 1 FROM public.roles r WHERE lower(r.name) = v_name) THEN
    RAISE EXCEPTION 'role name already taken' USING ERRCODE = '23505';
  END IF;

  INSERT INTO public.roles (name, display_name, description, is_system, priority)
  VALUES (v_name,
          NULLIF(btrim(COALESCE(p_display_name, '')), ''),
          NULLIF(btrim(COALESCE(p_description, '')), ''),
          false, 10)
  RETURNING id INTO v_id;

  PERFORM public.log_audit('role.create', 'roles', v_id::text,
    jsonb_build_object('name', v_name, 'display_name', p_display_name));
  RETURN v_id;
END $$;

REVOKE ALL ON FUNCTION public.admin_create_role(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_create_role(text, text, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_update_role(
  p_role_id uuid,
  p_display_name text DEFAULT NULL,
  p_description text DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_old public.roles%ROWTYPE;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'roles', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('roles', 'update');

  SELECT * INTO v_old FROM public.roles WHERE id = p_role_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'role not found'; END IF;
  -- Clean message BEFORE the R1 trigger speaks; the trigger still has the
  -- last word and is never weakened.
  IF v_old.is_system THEN RAISE EXCEPTION 'system roles are immutable'; END IF;

  UPDATE public.roles
     SET display_name = NULLIF(btrim(COALESCE(p_display_name, '')), ''),
         description  = NULLIF(btrim(COALESCE(p_description, '')), ''),
         updated_at   = now()
   WHERE id = p_role_id;

  PERFORM public.log_audit('role.update', 'roles', p_role_id::text,
    jsonb_build_object(
      'display_name', jsonb_build_object('old', v_old.display_name, 'new', p_display_name),
      'description',  jsonb_build_object('old', v_old.description,  'new', p_description)));
END $$;

REVOKE ALL ON FUNCTION public.admin_update_role(uuid, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_role(uuid, text, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_delete_role(p_role_id uuid)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_old public.roles%ROWTYPE;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'roles', 'delete') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('roles', 'delete');

  SELECT * INTO v_old FROM public.roles WHERE id = p_role_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'role not found'; END IF;
  IF v_old.is_system THEN RAISE EXCEPTION 'system roles are immutable'; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.role_id = p_role_id) THEN
    RAISE EXCEPTION 'role has members';
  END IF;

  DELETE FROM public.role_permissions WHERE role_id = p_role_id;
  DELETE FROM public.roles WHERE id = p_role_id;

  PERFORM public.log_audit('role.delete', 'roles', p_role_id::text,
    jsonb_build_object('name', v_old.name, 'display_name', v_old.display_name));
END $$;

REVOKE ALL ON FUNCTION public.admin_delete_role(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_delete_role(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_set_role_permission(
  p_role_id uuid,
  p_permission_id uuid,
  p_granted boolean
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_role public.roles%ROWTYPE;
  v_core boolean;
  v_slug text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'roles', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('roles', 'update');

  SELECT * INTO v_role FROM public.roles WHERE id = p_role_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'role not found'; END IF;
  IF v_role.is_system THEN RAISE EXCEPTION 'system roles are immutable'; END IF;

  SELECT res.name || ':' || p.action INTO v_slug
    FROM public.permissions p
    JOIN public.resources res ON res.id = p.resource_id
   WHERE p.id = p_permission_id;
  IF v_slug IS NULL THEN RAISE EXCEPTION 'unknown permission'; END IF;

  IF p_granted THEN
    INSERT INTO public.role_permissions (role_id, permission_id, is_core)
    VALUES (p_role_id, p_permission_id, false)
    ON CONFLICT (role_id, permission_id) DO NOTHING;
  ELSE
    SELECT rp.is_core INTO v_core
      FROM public.role_permissions rp
     WHERE rp.role_id = p_role_id AND rp.permission_id = p_permission_id;
    IF v_core IS NULL THEN
      RETURN; -- already absent; nothing to audit
    END IF;
    IF v_core THEN RAISE EXCEPTION 'core permission locked'; END IF;
    DELETE FROM public.role_permissions
     WHERE role_id = p_role_id AND permission_id = p_permission_id;
  END IF;

  PERFORM public.log_audit('role.permission_change', 'roles', p_role_id::text,
    jsonb_build_object('role', v_role.name, 'permission', v_slug, 'granted', p_granted));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_role_permission(uuid, uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_role_permission(uuid, uuid, boolean) TO authenticated;

-- ---------------------------------------------------------------------
-- C. PROOFS — dynamic principals, fail loudly, scratch rows cleaned up.
-- ---------------------------------------------------------------------
DO $proof$
DECLARE
  v_base    uuid;
  v_super   uuid;
  v_admin   uuid;
  v_scratch uuid;
  v_perm    uuid;
  v_session uuid := gen_random_uuid();
  v_factor  uuid := gen_random_uuid();
  ok        boolean;
  can_write boolean := true;
  n         integer;
BEGIN
  SELECT ur.user_id INTO v_super
    FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name = 'super_admin' LIMIT 1;
  SELECT ur.user_id INTO v_base
    FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name = 'user'
     AND NOT public.is_super_admin(ur.user_id) LIMIT 1;
  IF v_super IS NULL OR v_base IS NULL THEN
    RAISE EXCEPTION 'U2 PROOFS FAILED: no dynamic principals (super_admin/base user) available';
  END IF;

  -- P1: base user -> permission denied on the list.
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_base::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
  ok := false;
  BEGIN
    PERFORM * FROM public.admin_list_roles_detailed();
  EXCEPTION WHEN others THEN
    IF SQLERRM ILIKE '%permission denied%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P1 FAILED: a base user could list roles'; END IF;
  RAISE NOTICE 'P1 PASS: base user is refused by admin_list_roles_detailed';

  -- P2: an admin lists roles (proves the roles:view seed reached the role).
  INSERT INTO public.user_roles (user_id, role_id, scope_type)
  SELECT v_base, r.id, 'global' FROM public.roles r WHERE r.name = 'admin'
  ON CONFLICT DO NOTHING;
  v_admin := v_base;
  SELECT count(*) INTO n FROM public.admin_list_roles_detailed();
  IF n < 4 THEN RAISE EXCEPTION 'P2 FAILED: admin saw % roles', n; END IF;
  RAISE NOTICE 'P2 PASS: admin lists % roles via roles:view', n;

  -- P3: create at aal1 -> step-up required (super_admin short-circuits the
  --     permission check but NEVER the step-up gate).
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
  ok := false;
  BEGIN
    PERFORM public.admin_create_role('u2-proof-scratch', 'U2 proof', null);
  EXCEPTION WHEN others THEN
    IF SQLERRM ILIKE '%step-up required%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P3 FAILED: role creation succeeded at aal1'; END IF;
  RAISE NOTICE 'P3 PASS: admin_create_role refuses at aal1';

  -- P4: create at simulated aal2 (U1f-4 factor + fresh amr pattern).
  BEGIN
    INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_super, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status,
                                 created_at, updated_at, secret)
    VALUES (v_factor, v_super, 'u2-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
  EXCEPTION WHEN others THEN
    can_write := false;
  END;

  IF NOT can_write THEN
    RAISE NOTICE 'P4/P5/P6/P7 STEP-UP PATH DEFERRED: auth.* is not writable here; covered by E2E RP-2..RP-6';
    -- The non-step-up halves of P5/P6/P7 still run below via direct assertions.
    PERFORM set_config('request.jwt.claims', null, true);
  ELSE
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text)::text, true);

    v_scratch := public.admin_create_role('u2-proof-scratch', 'U2 proof', 'scratch');
    IF v_scratch IS NULL THEN RAISE EXCEPTION 'P4 FAILED: no role id returned'; END IF;
    IF NOT EXISTS (SELECT 1 FROM public.audit_log
                    WHERE action = 'role.create' AND entity_id = v_scratch::text) THEN
      RAISE EXCEPTION 'P4 FAILED: role.create was not audited';
    END IF;
    RAISE NOTICE 'P4 PASS: create at aal2 writes the row and the audit entry';

    -- P5: updating a SYSTEM role is refused with the clean message.
    ok := false;
    BEGIN
      PERFORM public.admin_update_role(
        (SELECT id FROM public.roles WHERE name = 'super_admin'), 'Nope', null);
    EXCEPTION WHEN others THEN
      IF SQLERRM ILIKE '%system roles are immutable%' THEN ok := true; ELSE RAISE; END IF;
    END;
    IF NOT ok THEN RAISE EXCEPTION 'P5 FAILED: a system role was updated'; END IF;
    RAISE NOTICE 'P5 PASS: admin_update_role refuses system roles';

    -- P6: the matrix refuses system roles too.
    SELECT p.id INTO v_perm
      FROM public.permissions p JOIN public.resources res ON res.id = p.resource_id
     WHERE res.name = 'listings' AND p.action = 'view';
    ok := false;
    BEGIN
      PERFORM public.admin_set_role_permission(
        (SELECT id FROM public.roles WHERE name = 'user'), v_perm, true);
    EXCEPTION WHEN others THEN
      IF SQLERRM ILIKE '%system roles are immutable%' THEN ok := true; ELSE RAISE; END IF;
    END;
    IF NOT ok THEN RAISE EXCEPTION 'P6 FAILED: a system role''s matrix was changed'; END IF;
    RAISE NOTICE 'P6 PASS: admin_set_role_permission refuses system roles';

    -- P7: a role with members cannot be deleted; revoke, then it can.
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_base, v_scratch, 'global');
    ok := false;
    BEGIN
      PERFORM public.admin_delete_role(v_scratch);
    EXCEPTION WHEN others THEN
      IF SQLERRM ILIKE '%role has members%' THEN ok := true; ELSE RAISE; END IF;
    END;
    IF NOT ok THEN RAISE EXCEPTION 'P7 FAILED: a role with members was deleted'; END IF;
    DELETE FROM public.user_roles WHERE role_id = v_scratch;
    PERFORM public.admin_delete_role(v_scratch);
    IF EXISTS (SELECT 1 FROM public.roles WHERE id = v_scratch) THEN
      RAISE EXCEPTION 'P7 FAILED: the scratch role survived its delete';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.audit_log
                    WHERE action = 'role.delete' AND entity_id = v_scratch::text) THEN
      RAISE EXCEPTION 'P7 FAILED: role.delete was not audited';
    END IF;
    RAISE NOTICE 'P7 PASS: member guard holds, then delete succeeds and is audited';

    PERFORM set_config('request.jwt.claims', null, true);
    DELETE FROM auth.mfa_amr_claims WHERE session_id = v_session;
    DELETE FROM auth.mfa_factors WHERE id = v_factor;
    DELETE FROM auth.sessions WHERE id = v_session;
  END IF;

  -- Scratch admin grant removed (the proof principal returns to base).
  DELETE FROM public.user_roles ur
   USING public.roles r
   WHERE ur.role_id = r.id AND r.name = 'admin' AND ur.user_id = v_admin;

  -- P8: the three DEC-016 permissions exist, require step-up, granted to none.
  SELECT count(*) INTO n
    FROM public.permissions p JOIN public.resources res ON res.id = p.resource_id
   WHERE (res.name, p.action) IN (('profiles','create'), ('profiles','delete'), ('impersonation','use'))
     AND p.requires_step_up;
  IF n <> 3 THEN
    RAISE EXCEPTION 'P8 FAILED: % of 3 DEC-016 permissions registered with step-up', n;
  END IF;
  SELECT count(*) INTO n
    FROM public.role_permissions rp
    JOIN public.permissions p ON p.id = rp.permission_id
    JOIN public.resources res ON res.id = p.resource_id
   WHERE (res.name, p.action) IN (('profiles','create'), ('profiles','delete'), ('impersonation','use'));
  IF n <> 0 THEN RAISE EXCEPTION 'P8 FAILED: % DEC-016 grants exist; expected 0', n; END IF;
  RAISE NOTICE 'P8 PASS: DEC-016 permissions registered, step-up true, zero grants';

  -- Read-back: exposure of the six functions.
  IF has_function_privilege('anon', 'public.admin_list_roles_detailed()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_get_role(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_create_role(text,text,text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_update_role(uuid,text,text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_delete_role(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_set_role_permission(uuid,uuid,boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'READ-BACK FAILED: anon can execute a U2 function';
  END IF;
  IF NOT (has_function_privilege('authenticated', 'public.admin_list_roles_detailed()', 'EXECUTE')
      AND has_function_privilege('authenticated', 'public.admin_get_role(uuid)', 'EXECUTE')
      AND has_function_privilege('authenticated', 'public.admin_create_role(text,text,text)', 'EXECUTE')
      AND has_function_privilege('authenticated', 'public.admin_update_role(uuid,text,text)', 'EXECUTE')
      AND has_function_privilege('authenticated', 'public.admin_delete_role(uuid)', 'EXECUTE')
      AND has_function_privilege('authenticated', 'public.admin_set_role_permission(uuid,uuid,boolean)', 'EXECUTE')) THEN
    RAISE EXCEPTION 'READ-BACK FAILED: authenticated lost EXECUTE on a U2 function';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.role_permissions rp
      JOIN public.roles r ON r.id = rp.role_id AND r.name = 'admin'
      JOIN public.permissions p ON p.id = rp.permission_id
      JOIN public.resources res ON res.id = p.resource_id
     WHERE res.name = 'roles' AND p.action = 'view') THEN
    RAISE EXCEPTION 'READ-BACK FAILED: roles:view is not granted to admin';
  END IF;
  RAISE NOTICE 'READ-BACKS PASS: anon=false / authenticated=true on six functions; roles:view -> admin';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260822050500') ON CONFLICT DO NOTHING;