-- Phase R3 — FUNCTION MATRIX PROOF.
-- No schema change. This migration is an executable assertion suite: it fails
-- the deploy if the RBAC contract regresses. Idempotent by construction
-- (read-only + rolled-back probes). Environment-portable: every principal is
-- looked up dynamically (INC-064), never hardcoded.
DO $proof$
DECLARE
  v_super   uuid;
  v_base    uuid;
  v_all     int;
  v_n       int;
  v_ok      boolean;
BEGIN
  SELECT ur.user_id INTO v_super
  FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
  WHERE r.name = 'super_admin' LIMIT 1;

  SELECT u.id INTO v_base
  FROM auth.users u
  WHERE NOT EXISTS (
    SELECT 1 FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
    WHERE ur.user_id = u.id AND r.name <> 'user'
  )
  LIMIT 1;

  IF v_super IS NULL OR v_base IS NULL THEN
    RAISE EXCEPTION 'PROOF SETUP FAILED: need one super_admin and one base user (super=%, base=%)',
      v_super, v_base;
  END IF;

  SELECT count(*) INTO v_all FROM public.permissions;

  -- 1. SUPER ADMIN sees the whole permission surface.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super)::text, true);
  SELECT count(*) INTO v_n FROM public.get_my_permissions();
  IF v_n <> v_all THEN
    RAISE EXCEPTION 'PROOF 1 FAILED: super_admin sees % of % permissions', v_n, v_all;
  END IF;
  IF NOT public.has_permission(v_super, 'admin_panel', 'access') THEN
    RAISE EXCEPTION 'PROOF 1 FAILED: super_admin denied admin_panel:access';
  END IF;

  -- 2. BASE USER sees only the base grant, and NOT the admin panel.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_base)::text, true);
  SELECT count(*) INTO v_n
  FROM public.get_my_permissions() gp WHERE gp.permission = 'admin_panel:access';
  IF v_n <> 0 THEN
    RAISE EXCEPTION 'PROOF 2 FAILED: base user sees admin_panel:access';
  END IF;
  IF public.has_permission(v_base, 'admin_panel', 'access') THEN
    RAISE EXCEPTION 'PROOF 2 FAILED: has_permission grants base user the admin panel';
  END IF;
  IF public.is_super_admin(v_base) THEN
    RAISE EXCEPTION 'PROOF 2 FAILED: base user reads as super_admin';
  END IF;

  -- 3. PRIVILEGE ESCALATION is refused: a base user cannot assign roles.
  v_ok := false;
  BEGIN
    PERFORM public.assign_role(v_base, 'admin', NULL);
  EXCEPTION WHEN others THEN
    v_ok := true;
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'PROOF 3 FAILED: base user was permitted to assign a role';
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
    WHERE ur.user_id = v_base AND r.name <> 'user'
  ) THEN
    RAISE EXCEPTION 'PROOF 3 FAILED: base user acquired an elevated role';
  END IF;

  -- 4. super_admin is NOT assignable through the RPC, even as super_admin.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super)::text, true);
  v_ok := false;
  BEGIN
    PERFORM public.assign_role(v_base, 'super_admin', NULL);
  EXCEPTION WHEN others THEN
    v_ok := true;
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'PROOF 4 FAILED: super_admin was assignable through assign_role';
  END IF;

  PERFORM set_config('request.jwt.claims', NULL, true);

  -- 5. INC-062 GRANT MATRIX: privileged helpers stay unreachable from the
  --    Data API roles; the permission check itself stays reachable.
  IF has_function_privilege('authenticated', 'public.log_audit(text,text,text,jsonb)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.log_audit(text,text,text,jsonb)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.is_super_admin(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.is_super_admin(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF 5 FAILED: a privileged helper is executable by anon/authenticated';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.get_my_permissions()', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF 5 FAILED: authenticated cannot execute get_my_permissions()';
  END IF;

  -- 6. AUDIT LOG is append-only (R2b trigger must still bite).
  v_ok := false;
  BEGIN
    UPDATE public.audit_log SET action = action WHERE true;
  EXCEPTION WHEN others THEN
    v_ok := true;
  END;
  IF NOT v_ok AND EXISTS (SELECT 1 FROM public.audit_log) THEN
    RAISE EXCEPTION 'PROOF 6 FAILED: audit_log accepted an UPDATE';
  END IF;

  RAISE NOTICE 'PHASE R3 FUNCTION MATRIX: all proofs passed (permissions=%).', v_all;
END
$proof$;
