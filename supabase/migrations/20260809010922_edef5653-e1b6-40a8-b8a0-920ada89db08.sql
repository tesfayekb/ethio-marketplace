-- Phase R1a — correction round for R1 (INC-062, INC-063)

-- A. Function-privilege lockdown (INC-062)
REVOKE ALL ON FUNCTION public.log_audit(text, text, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.is_super_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_role_hierarchy(uuid) FROM PUBLIC, anon, authenticated;

-- B. Cascade-aware base-role guard (INC-063)
CREATE OR REPLACE FUNCTION public.user_roles_protect()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_name text; v_super_count integer;
BEGIN
  SELECT name INTO v_name FROM public.roles WHERE id = OLD.role_id;
  IF v_name = 'super_admin' THEN
    SELECT count(*) INTO v_super_count
      FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
     WHERE r.name = 'super_admin';
    IF v_super_count <= 1 THEN RAISE EXCEPTION 'cannot remove last super admin'; END IF;
  END IF;
  IF v_name = 'user' THEN
    IF EXISTS (SELECT 1 FROM auth.users WHERE id = OLD.user_id) THEN
      RAISE EXCEPTION 'base user role cannot be removed';
    END IF;
    -- parent auth.users row already gone => account-deletion cascade; allow the row to go with it
  END IF;
  RETURN OLD;
END; $function$;