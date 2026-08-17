-- =====================================================================
-- Phase U1f — STEP-UP AUTHENTICATION (AAL2) — Tier A
--
-- Additive + idempotent. No table is created. Three existing SECURITY DEFINER
-- functions are re-declared (CREATE OR REPLACE) and their REVOKE/GRANT lines
-- are restated in this file per the definer law (INC-074).
--
-- THE RULE (document it, apply it to every FUTURE mutation RPC):
--   every SECURITY DEFINER function that MUTATES state must, immediately after
--   its has_permission() check, call
--     PERFORM public.require_step_up_if_needed('<resource>', '<action>');
--   Read-only RPCs never call it.
--
-- SUPER ADMIN IS NOT EXEMPT. Step-up is a property of the SESSION (the JWT's
-- `aal` claim), not of the role; a super_admin on an aal1 session is refused
-- exactly like anyone else.
-- =====================================================================

-- ---------- A. SEED: which permissions demand a stepped-up session ----------
UPDATE public.permissions p
   SET requires_step_up = true
  FROM public.resources r
 WHERE r.id = p.resource_id
   AND (r.name, p.action) IN (
     ('profiles', 'update'),
     ('roles', 'assign'),
     ('roles', 'update'),
     ('roles', 'delete')
   );

-- ---------- B. THE GATE -----------------------------------------------------
CREATE OR REPLACE FUNCTION public.require_step_up_if_needed(p_resource text, p_action text)
RETURNS void
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_needs boolean;
BEGIN
  SELECT COALESCE(bool_or(p.requires_step_up), false) INTO v_needs
    FROM public.permissions p
    JOIN public.resources r ON r.id = p.resource_id
   WHERE r.name = p_resource AND p.action = p_action;

  IF v_needs AND COALESCE(auth.jwt() ->> 'aal', 'aal1') IS DISTINCT FROM 'aal2' THEN
    RAISE EXCEPTION 'step-up required'
      USING ERRCODE = 'P0009',
            HINT = 'Verify a second factor (TOTP) and retry this action.';
  END IF;
END $$;

REVOKE ALL ON FUNCTION public.require_step_up_if_needed(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.require_step_up_if_needed(text, text) TO authenticated;

-- ---------- C. THE THREE MUTATION RPCs, RE-DECLARED WITH THE GATE -----------
-- Bodies are the live ones verbatim; the only addition is the gate call
-- immediately after the permission check (permission FIRST, then step-up, so a
-- user without the permission still gets 'permission denied').

CREATE OR REPLACE FUNCTION public.admin_set_account_status(
  p_user_id uuid, p_status text, p_reason text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'profiles', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('profiles', 'update');

  IF p_status NOT IN ('active','deactivated') THEN
    RAISE EXCEPTION 'unknown account status';
  END IF;
  IF p_status = 'deactivated' AND COALESCE(btrim(p_reason), '') = '' THEN
    RAISE EXCEPTION 'a reason is required to deactivate';
  END IF;

  UPDATE public.profiles
     SET account_status = p_status,
         status_reason = CASE WHEN p_status = 'deactivated' THEN btrim(p_reason) ELSE NULL END,
         updated_at = now()
   WHERE user_id = p_user_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'user not found'; END IF;

  PERFORM public.log_audit('user.status_change', 'profiles', p_user_id::text,
    jsonb_build_object('status', p_status, 'reason', btrim(COALESCE(p_reason, ''))));
END $$;

CREATE OR REPLACE FUNCTION public.assign_role(p_target_user uuid, p_role_name text, p_scope_country char(2) DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_role_id uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'roles', 'assign') THEN
    RAISE EXCEPTION 'not permitted to assign roles';
  END IF;
  PERFORM public.require_step_up_if_needed('roles', 'assign');

  IF p_role_name IN ('super_admin','user') THEN
    RAISE EXCEPTION 'role % is not assignable through assign_role', p_role_name;
  END IF;
  SELECT id INTO v_role_id FROM public.roles WHERE name = p_role_name;
  IF v_role_id IS NULL THEN RAISE EXCEPTION 'unknown role'; END IF;

  INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country, assigned_by)
  VALUES (p_target_user, v_role_id,
          CASE WHEN p_scope_country IS NULL THEN 'global' ELSE 'country' END,
          p_scope_country, auth.uid())
  ON CONFLICT DO NOTHING;

  PERFORM public.log_audit('role.assign', 'user_roles', p_target_user::text,
    jsonb_build_object('role', p_role_name, 'scope_country', p_scope_country,
                       'scope_type', CASE WHEN p_scope_country IS NULL THEN 'global' ELSE 'country' END));
END; $$;

CREATE OR REPLACE FUNCTION public.revoke_role(p_target_user uuid, p_role_name text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_role_id uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'roles', 'assign') THEN
    RAISE EXCEPTION 'not permitted to revoke roles';
  END IF;
  PERFORM public.require_step_up_if_needed('roles', 'assign');

  IF p_role_name IN ('super_admin','user') THEN
    RAISE EXCEPTION 'role % is not revocable through revoke_role', p_role_name;
  END IF;
  SELECT id INTO v_role_id FROM public.roles WHERE name = p_role_name;
  IF v_role_id IS NULL THEN RAISE EXCEPTION 'unknown role'; END IF;

  DELETE FROM public.user_roles WHERE user_id = p_target_user AND role_id = v_role_id;

  PERFORM public.log_audit('role.revoke', 'user_roles', p_target_user::text,
    jsonb_build_object('role', p_role_name));
END; $$;

-- Definer law (INC-074): re-declared functions restate their grants in-file.
REVOKE ALL ON FUNCTION public.admin_set_account_status(uuid, text, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.assign_role(uuid, text, char(2)) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.revoke_role(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_account_status(uuid, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.assign_role(uuid, text, char(2)) TO authenticated;
GRANT EXECUTE ON FUNCTION public.revoke_role(uuid, text) TO authenticated;

-- ---------- D. IN-MIGRATION PROOFS ------------------------------------------
DO $$
DECLARE
  v_super uuid; v_base uuid; v_status text; v_reason text; v_rows integer; ok boolean;
BEGIN
  SELECT ur.user_id INTO v_super
    FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name = 'super_admin' LIMIT 1;
  SELECT p.user_id INTO v_base
    FROM public.profiles p
   WHERE NOT public.is_super_admin(p.user_id)
     AND NOT public.has_permission(p.user_id, 'profiles', 'view')
   ORDER BY p.created_at LIMIT 1;
  IF v_super IS NULL OR v_base IS NULL THEN
    RAISE EXCEPTION 'PROOFS FAILED: need one super_admin and one base user (super=%, base=%)', v_super, v_base;
  END IF;
  SELECT account_status, status_reason INTO v_status, v_reason
    FROM public.profiles WHERE user_id = v_base;

  -- P1 super_admin on an aal1 session is REFUSED on admin_set_account_status
  ok := false;
  BEGIN
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    SET LOCAL ROLE authenticated;
    PERFORM public.admin_set_account_status(v_base, 'deactivated', 'U1f proof');
    RESET ROLE;
  EXCEPTION WHEN others THEN
    RESET ROLE;
    IF SQLERRM ILIKE '%step-up required%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P1 FAILED: aal1 super_admin changed a status'; END IF;
  RAISE NOTICE 'P1 PASS: aal1 super_admin refused (step-up required)';

  -- P2 the SAME call at aal2 succeeds (scratch state restored below)
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
  SET LOCAL ROLE authenticated;
  PERFORM public.admin_set_account_status(v_base, 'deactivated', 'U1f proof');
  RESET ROLE;
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_base AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'P2 FAILED: aal2 call did not apply';
  END IF;
  RAISE NOTICE 'P2 PASS: aal2 super_admin succeeded';

  -- restore the scratch user verbatim
  UPDATE public.profiles SET account_status = v_status, status_reason = v_reason WHERE user_id = v_base;

  -- P3 assign_role at aal1 is refused
  ok := false;
  BEGIN
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    SET LOCAL ROLE authenticated;
    PERFORM public.assign_role(v_base, 'moderator', NULL);
    RESET ROLE;
  EXCEPTION WHEN others THEN
    RESET ROLE;
    IF SQLERRM ILIKE '%step-up required%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P3 FAILED: aal1 assign_role went through'; END IF;
  RAISE NOTICE 'P3 PASS: aal1 assign_role refused';

  -- P4 read RPCs are unaffected at aal1
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
  SET LOCAL ROLE authenticated;
  SELECT count(*) INTO v_rows FROM public.admin_list_users(NULL, NULL, NULL, 5, 0) l;
  RESET ROLE;
  IF v_rows < 1 THEN RAISE EXCEPTION 'P4 FAILED: aal1 read RPC returned no rows'; END IF;
  RAISE NOTICE 'P4 PASS: admin_list_users unaffected at aal1 (% rows)', v_rows;

  PERFORM set_config('request.jwt.claims', NULL, true);
END $$;