-- U4b-6 (INC-095k): invoker-blind client probe replaced by a gated SECURITY DEFINER read.
-- has_permission() is an invoker-RLS read: called from the browser for an arbitrary
-- target it returns empty-truth (false) because user_roles is not readable by the caller.
-- This purpose-built definer read gates the CALLER on translations:manage and answers
-- honestly for the TARGET.

CREATE OR REPLACE FUNCTION public.user_has_translation_permission(p_target uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role_id = ur.role_id
    JOIN public.permissions p ON p.id = rp.permission_id
    JOIN public.resources r ON r.id = p.resource_id
    WHERE ur.user_id = p_target
      AND r.name = 'translations'
      AND p.action IN ('view', 'update', 'machine', 'approve', 'manage')
  );
END;
$$;

REVOKE ALL ON FUNCTION public.user_has_translation_permission(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.user_has_translation_permission(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.user_has_translation_permission(uuid) TO authenticated;

-- ---------------------------------------------------------------------------
-- PROOFS
-- ---------------------------------------------------------------------------
DO $proof$
DECLARE
  v_target uuid;
  v_role uuid;
  v_perm uuid;
  v_res uuid;
  v_result boolean;
  v_msg text;
BEGIN
  -- Scratch target principal (dynamic lookup — INC-064 portability rule).
  SELECT id INTO v_target FROM auth.users ORDER BY created_at LIMIT 1;
  IF v_target IS NULL THEN
    RAISE NOTICE 'PROOF SKIPPED: no auth.users principal available';
    RETURN;
  END IF;

  -- P1: a caller without translations:manage is refused.
  -- auth.uid() is NULL in a migration session, so has_permission() is false here.
  BEGIN
    PERFORM public.user_has_translation_permission(v_target);
    RAISE EXCEPTION 'PROOF P1 FAILED: non-manager caller was not refused';
  EXCEPTION
    WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      IF v_msg <> 'permission denied' THEN
        RAISE EXCEPTION 'PROOF P1 FAILED: unexpected message %', v_msg;
      END IF;
      RAISE NOTICE 'PROOF P1 OK: %', v_msg;
  END;

  -- P2: the body's truth table, evaluated directly (the caller gate is proved by P1).
  SELECT id INTO v_res FROM public.resources WHERE name = 'translations';
  IF v_res IS NULL THEN
    RAISE NOTICE 'PROOF P2 SKIPPED: translations resource absent';
    RETURN;
  END IF;
  SELECT id INTO v_perm FROM public.permissions
   WHERE resource_id = v_res AND action = 'view';

  -- Scratch role, no permissions yet.
  INSERT INTO public.roles(name, display_name, description, is_system)
  VALUES ('e2e_scratch_u4b6', 'U4b-6 proof role', 'temporary', false)
  RETURNING id INTO v_role;

  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role_id = ur.role_id
    JOIN public.permissions p ON p.id = rp.permission_id
    JOIN public.resources r ON r.id = p.resource_id
    WHERE ur.user_id = v_target AND r.name = 'translations'
      AND p.action IN ('view','update','machine','approve','manage')
      AND ur.role_id = v_role
  ) INTO v_result;
  IF v_result THEN
    RAISE EXCEPTION 'PROOF P2a FAILED: permissionless scratch role reported true';
  END IF;
  RAISE NOTICE 'PROOF P2a OK: permissionless scratch role -> false';

  -- Grant translations:view to the scratch role and re-evaluate.
  INSERT INTO public.role_permissions(role_id, permission_id, is_core)
  VALUES (v_role, v_perm, false);
  INSERT INTO public.user_roles(user_id, role_id, scope_type)
  VALUES (v_target, v_role, 'global');

  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role_id = ur.role_id
    JOIN public.permissions p ON p.id = rp.permission_id
    JOIN public.resources r ON r.id = p.resource_id
    WHERE ur.user_id = v_target AND r.name = 'translations'
      AND p.action IN ('view','update','machine','approve','manage')
      AND ur.role_id = v_role
  ) INTO v_result;
  IF NOT v_result THEN
    RAISE EXCEPTION 'PROOF P2b FAILED: target with translations:view reported false';
  END IF;
  RAISE NOTICE 'PROOF P2b OK: target with translations:view -> true';

  -- Cleanup.
  DELETE FROM public.user_roles WHERE role_id = v_role;
  DELETE FROM public.role_permissions WHERE role_id = v_role;
  DELETE FROM public.roles WHERE id = v_role;
  RAISE NOTICE 'PROOF cleanup OK';
END
$proof$;

-- Grant read-back.
DO $grants$
DECLARE
  v_acl text;
BEGIN
  SELECT array_to_string(proacl, ',') INTO v_acl
  FROM pg_proc WHERE proname = 'user_has_translation_permission'
    AND pronamespace = 'public'::regnamespace;
  RAISE NOTICE 'GRANT READ-BACK user_has_translation_permission: %', v_acl;
END
$grants$;

INSERT INTO public.migration_marks(version) VALUES ('20260830040000') ON CONFLICT DO NOTHING;