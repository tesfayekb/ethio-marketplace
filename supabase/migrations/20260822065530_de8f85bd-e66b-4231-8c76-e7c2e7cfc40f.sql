-- =====================================================================
-- U2b — DEC-017 assignable-scope for custom roles (Tier A).
--
-- Law F3: `assignable` is enforced INSIDE admin_set_role_permission; the UI
-- lock is convenience only.
-- INC-074: every re-declared SECURITY DEFINER function restates REVOKE/GRANT.
-- Self-marking (U1f-3 law).
-- =====================================================================

-- A. The flag ---------------------------------------------------------
ALTER TABLE public.permissions
  ADD COLUMN IF NOT EXISTS assignable boolean NOT NULL DEFAULT true;

COMMENT ON COLUMN public.permissions.assignable IS
  'DEC-017: false => reserved for system roles; admin_set_role_permission refuses to grant it to a custom role.';

-- B. The reserved set (only censused rows that exist are touched) ------
UPDATE public.permissions p
   SET assignable = false
  FROM public.resources res
 WHERE res.id = p.resource_id
   AND (
        (res.name = 'roles' AND p.action IN ('create', 'update', 'delete', 'assign', 'manage'))
     OR (res.name = 'user_roles')
     OR (res.name = 'permissions')
     OR (res.name = 'impersonation' AND p.action = 'use')
     OR (res.name = 'profiles' AND p.action IN ('create', 'delete'))
   );

-- C. admin_set_role_permission — re-declared with the assignable gate ---
CREATE OR REPLACE FUNCTION public.admin_set_role_permission(
  p_role_id uuid, p_permission_id uuid, p_granted boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_role       public.roles%ROWTYPE;
  v_core       boolean;
  v_slug       text;
  v_assignable boolean;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'roles', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('roles', 'update');

  SELECT * INTO v_role FROM public.roles WHERE id = p_role_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'role not found'; END IF;
  IF v_role.is_system THEN RAISE EXCEPTION 'system roles are immutable'; END IF;

  SELECT res.name || ':' || p.action, p.assignable
    INTO v_slug, v_assignable
    FROM public.permissions p
    JOIN public.resources res ON res.id = p.resource_id
   WHERE p.id = p_permission_id;
  IF v_slug IS NULL THEN RAISE EXCEPTION 'unknown permission'; END IF;

  -- DEC-017: escalation vectors are reserved for system roles. The role here
  -- is non-system by the check above, so a GRANT is refused outright. A
  -- REVOKE of an existing grant stays allowed (cleanup path).
  IF p_granted AND v_assignable IS NOT TRUE THEN
    RAISE EXCEPTION 'permission is not assignable to custom roles';
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
      RETURN; -- already absent; nothing to audit
    END IF;
    IF v_core THEN RAISE EXCEPTION 'core permission locked'; END IF;
    DELETE FROM public.role_permissions
     WHERE role_id = p_role_id AND permission_id = p_permission_id;
  END IF;

  PERFORM public.log_audit('role.permission_change', 'roles', p_role_id::text,
    jsonb_build_object('role', v_role.name, 'permission', v_slug, 'granted', p_granted));
END $function$;

REVOKE ALL ON FUNCTION public.admin_set_role_permission(uuid, uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_role_permission(uuid, uuid, boolean) TO authenticated;

-- D. admin_get_role — matrix shape gains assignable + user_baseline --------
DROP FUNCTION IF EXISTS public.admin_get_role(uuid);

CREATE FUNCTION public.admin_get_role(p_role_id uuid)
RETURNS TABLE(
  role_id uuid, name text, display_name text, description text, is_system boolean,
  member_count bigint, permission_id uuid, resource text, action text,
  requires_step_up boolean, granted boolean, is_core boolean,
  assignable boolean, user_baseline boolean)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
         COALESCE(rp.is_core, false),
         p.assignable,
         -- Derived LIVE from the base `user` role's grants.
         EXISTS (
           SELECT 1 FROM public.role_permissions brp
             JOIN public.roles br ON br.id = brp.role_id AND br.name = 'user'
            WHERE brp.permission_id = p.id
         )
    FROM public.roles r
    CROSS JOIN public.permissions p
    JOIN public.resources res ON res.id = p.resource_id
    LEFT JOIN public.role_permissions rp
      ON rp.role_id = r.id AND rp.permission_id = p.id
   WHERE r.id = p_role_id
   ORDER BY res.name, p.action;
END $function$;

REVOKE ALL ON FUNCTION public.admin_get_role(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_get_role(uuid) TO authenticated;

-- E. PROOFS (fail loudly) ---------------------------------------------
DO $proof$
DECLARE
  v_super     uuid;
  v_scratch   uuid;
  v_perm_bad  uuid;
  v_perm_ok   uuid;
  v_perm_base uuid;
  v_perm_adm  uuid;
  v_session   uuid := gen_random_uuid();
  v_factor    uuid := gen_random_uuid();
  ok          boolean;
  can_write   boolean := true;
  n           integer;
  b1          boolean;
  b2          boolean;
BEGIN
  SELECT ur.user_id INTO v_super
    FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name = 'super_admin' LIMIT 1;
  IF v_super IS NULL THEN
    RAISE EXCEPTION 'U2b PROOFS FAILED: no super_admin principal available';
  END IF;

  SELECT p.id INTO v_perm_bad FROM public.permissions p
    JOIN public.resources res ON res.id = p.resource_id
   WHERE res.name = 'roles' AND p.action = 'update';
  SELECT p.id INTO v_perm_ok FROM public.permissions p
    JOIN public.resources res ON res.id = p.resource_id
   WHERE res.name = 'listings' AND p.action = 'view';
  SELECT p.id INTO v_perm_base FROM public.permissions p
    JOIN public.resources res ON res.id = p.resource_id
   WHERE res.name = 'account_panel' AND p.action = 'access';
  SELECT p.id INTO v_perm_adm FROM public.permissions p
    JOIN public.resources res ON res.id = p.resource_id
   WHERE res.name = 'admin_panel' AND p.action = 'access';
  IF v_perm_bad IS NULL OR v_perm_ok IS NULL OR v_perm_base IS NULL OR v_perm_adm IS NULL THEN
    RAISE EXCEPTION 'U2b PROOFS FAILED: a census permission row is missing';
  END IF;

  BEGIN
    INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_super, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status,
                                 created_at, updated_at, secret)
    VALUES (v_factor, v_super, 'u2b-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
  EXCEPTION WHEN others THEN
    can_write := false;
  END;

  IF NOT can_write THEN
    RAISE NOTICE 'P1/P2/P3/P4/P5 STEP-UP PATH DEFERRED: auth.* is not writable here; covered by E2E RP-11/RP-12';
  ELSE
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text)::text, true);

    v_scratch := public.admin_create_role('u2b-proof-scratch', 'U2b proof', 'scratch');

    -- P1: a reserved permission cannot be granted to a custom role.
    ok := false;
    BEGIN
      PERFORM public.admin_set_role_permission(v_scratch, v_perm_bad, true);
    EXCEPTION WHEN others THEN
      IF SQLERRM ILIKE '%not assignable to custom roles%' THEN ok := true; ELSE RAISE; END IF;
    END;
    IF NOT ok THEN RAISE EXCEPTION 'P1 FAILED: roles:update was granted to a custom role'; END IF;
    RAISE NOTICE 'P1 PASS: roles:update refused as not assignable';

    -- P2: an assignable permission still grants.
    PERFORM public.admin_set_role_permission(v_scratch, v_perm_ok, true);
    IF NOT EXISTS (SELECT 1 FROM public.role_permissions
                    WHERE role_id = v_scratch AND permission_id = v_perm_ok) THEN
      RAISE EXCEPTION 'P2 FAILED: listings:view was not granted';
    END IF;
    RAISE NOTICE 'P2 PASS: listings:view grants normally';

    -- P3: the system-role path is unchanged — immutability wins BEFORE
    --     assignable is ever consulted; the trigger remains the authority.
    ok := false;
    BEGIN
      PERFORM public.admin_set_role_permission(
        (SELECT id FROM public.roles WHERE name = 'super_admin'), v_perm_ok, true);
    EXCEPTION WHEN others THEN
      IF SQLERRM ILIKE '%system roles are immutable%' THEN ok := true; ELSE RAISE; END IF;
    END;
    IF NOT ok THEN RAISE EXCEPTION 'P3 FAILED: a system role accepted a permission change'; END IF;
    RAISE NOTICE 'P3 PASS: system-role refusal unchanged';

    -- P4: the matrix shape carries user_baseline, derived live.
    SELECT user_baseline INTO b1 FROM public.admin_get_role(v_scratch)
     WHERE permission_id = v_perm_base;
    SELECT user_baseline INTO b2 FROM public.admin_get_role(v_scratch)
     WHERE permission_id = v_perm_adm;
    IF b1 IS NOT TRUE OR b2 IS NOT FALSE THEN
      RAISE EXCEPTION 'P4 FAILED: user_baseline account_panel:access=% admin_panel:access=%', b1, b2;
    END IF;
    RAISE NOTICE 'P4 PASS: user_baseline true for the base grant, false for admin_panel:access';

    -- P5: a pre-existing NON-assignable grant can still be revoked.
    INSERT INTO public.role_permissions (role_id, permission_id, is_core)
    VALUES (v_scratch, v_perm_bad, false)
    ON CONFLICT (role_id, permission_id) DO NOTHING;
    PERFORM public.admin_set_role_permission(v_scratch, v_perm_bad, false);
    IF EXISTS (SELECT 1 FROM public.role_permissions
                WHERE role_id = v_scratch AND permission_id = v_perm_bad) THEN
      RAISE EXCEPTION 'P5 FAILED: a non-assignable grant could not be revoked';
    END IF;
    RAISE NOTICE 'P5 PASS: revoke of a non-assignable grant is permitted';

    -- Scratch cleanup.
    DELETE FROM public.role_permissions WHERE role_id = v_scratch;
    DELETE FROM public.roles WHERE id = v_scratch;

    PERFORM set_config('request.jwt.claims', null, true);
    DELETE FROM auth.mfa_amr_claims WHERE session_id = v_session;
    DELETE FROM auth.mfa_factors WHERE id = v_factor;
    DELETE FROM auth.sessions WHERE id = v_session;
  END IF;

  -- Read-back: the reserved set is exactly the censused list (roles x5,
  -- user_roles x5, permissions x5, impersonation:use, profiles:create,
  -- profiles:delete = 18).
  SELECT count(*) INTO n FROM public.permissions p WHERE p.assignable = false;
  IF n <> 18 THEN
    RAISE EXCEPTION 'READ-BACK FAILED: % non-assignable permissions; expected 18', n;
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.permissions p JOIN public.resources res ON res.id = p.resource_id
     WHERE res.name = 'roles' AND p.action = 'view' AND p.assignable = false) THEN
    RAISE EXCEPTION 'READ-BACK FAILED: roles:view must stay assignable';
  END IF;
  RAISE NOTICE 'READ-BACK PASS: 18 reserved permissions, roles:view assignable';

  -- Read-back: pg grants intact on both re-declared functions.
  IF has_function_privilege('anon', 'public.admin_get_role(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_set_role_permission(uuid,uuid,boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'READ-BACK FAILED: anon can execute a re-declared U2b function';
  END IF;
  IF NOT (has_function_privilege('authenticated', 'public.admin_get_role(uuid)', 'EXECUTE')
      AND has_function_privilege('authenticated', 'public.admin_set_role_permission(uuid,uuid,boolean)', 'EXECUTE')) THEN
    RAISE EXCEPTION 'READ-BACK FAILED: authenticated lost EXECUTE on a re-declared U2b function';
  END IF;
  RAISE NOTICE 'READ-BACK PASS: anon=false / authenticated=true on both functions';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260822065530') ON CONFLICT DO NOTHING;