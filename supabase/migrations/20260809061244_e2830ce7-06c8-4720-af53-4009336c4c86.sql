-- Phase R2b — audit hardening + per-command RBAC policies.

-- A. Audit log append-only (no bypass; retention exemptions are out of scope here).
CREATE OR REPLACE FUNCTION public.audit_log_append_only()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  RAISE EXCEPTION 'audit log is append-only';
END;
$$;

DROP TRIGGER IF EXISTS audit_log_append_only ON public.audit_log;
CREATE TRIGGER audit_log_append_only
  BEFORE UPDATE OR DELETE ON public.audit_log
  FOR EACH ROW EXECUTE FUNCTION public.audit_log_append_only();

REVOKE ALL ON FUNCTION public.audit_log_append_only() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.audit_log_append_only() FROM anon;
REVOKE ALL ON FUNCTION public.audit_log_append_only() FROM authenticated;

-- B. Prune meaningless audit actions; seed audit_logs:export.
DO $$
DECLARE
  v_rp_before bigint;
  v_rp_after bigint;
  v_deleted bigint;
BEGIN
  SELECT count(*) INTO v_rp_before
  FROM public.role_permissions rp
  JOIN public.permissions p ON p.id = rp.permission_id
  JOIN public.resources r ON r.id = p.resource_id
  WHERE r.name = 'audit_logs';

  DELETE FROM public.permissions p
  USING public.resources r
  WHERE p.resource_id = r.id
    AND r.name = 'audit_logs'
    AND p.action IN ('create','update','delete','manage');
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  SELECT count(*) INTO v_rp_after
  FROM public.role_permissions rp
  JOIN public.permissions p ON p.id = rp.permission_id
  JOIN public.resources r ON r.id = p.resource_id
  WHERE r.name = 'audit_logs';

  IF v_rp_after <> v_rp_before THEN
    RAISE EXCEPTION 'R2b ABORT: unexpected role_permissions cascade for audit_logs (% -> %)',
      v_rp_before, v_rp_after;
  END IF;

  RAISE NOTICE 'R2b: pruned % audit_logs permission rows; role_permissions unchanged at %',
    v_deleted, v_rp_after;
END $$;

INSERT INTO public.permissions (resource_id, action, description)
SELECT r.id, 'export', 'Export audit log entries'
FROM public.resources r
WHERE r.name = 'audit_logs'
ON CONFLICT DO NOTHING;

-- C. Split the four RBAC ALL policies into per-command policies.
DROP POLICY IF EXISTS resources_rbac_admin ON public.resources;
CREATE POLICY resources_rbac_select ON public.resources FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(),'roles','view'));
CREATE POLICY resources_rbac_insert ON public.resources FOR INSERT TO authenticated
  WITH CHECK (public.has_permission(auth.uid(),'roles','create'));
CREATE POLICY resources_rbac_update ON public.resources FOR UPDATE TO authenticated
  USING (public.has_permission(auth.uid(),'roles','update'))
  WITH CHECK (public.has_permission(auth.uid(),'roles','update'));
CREATE POLICY resources_rbac_delete ON public.resources FOR DELETE TO authenticated
  USING (public.has_permission(auth.uid(),'roles','delete'));

DROP POLICY IF EXISTS permissions_rbac_admin ON public.permissions;
CREATE POLICY permissions_rbac_select ON public.permissions FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(),'roles','view'));
CREATE POLICY permissions_rbac_insert ON public.permissions FOR INSERT TO authenticated
  WITH CHECK (public.has_permission(auth.uid(),'roles','create'));
CREATE POLICY permissions_rbac_update ON public.permissions FOR UPDATE TO authenticated
  USING (public.has_permission(auth.uid(),'roles','update'))
  WITH CHECK (public.has_permission(auth.uid(),'roles','update'));
CREATE POLICY permissions_rbac_delete ON public.permissions FOR DELETE TO authenticated
  USING (public.has_permission(auth.uid(),'roles','delete'));

DROP POLICY IF EXISTS roles_rbac_admin ON public.roles;
CREATE POLICY roles_rbac_select ON public.roles FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(),'roles','view'));
CREATE POLICY roles_rbac_insert ON public.roles FOR INSERT TO authenticated
  WITH CHECK (public.has_permission(auth.uid(),'roles','create'));
CREATE POLICY roles_rbac_update ON public.roles FOR UPDATE TO authenticated
  USING (public.has_permission(auth.uid(),'roles','update'))
  WITH CHECK (public.has_permission(auth.uid(),'roles','update'));
CREATE POLICY roles_rbac_delete ON public.roles FOR DELETE TO authenticated
  USING (public.has_permission(auth.uid(),'roles','delete'));

DROP POLICY IF EXISTS role_permissions_rbac_admin ON public.role_permissions;
CREATE POLICY role_permissions_rbac_select ON public.role_permissions FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(),'roles','view'));
CREATE POLICY role_permissions_rbac_insert ON public.role_permissions FOR INSERT TO authenticated
  WITH CHECK (public.has_permission(auth.uid(),'roles','create'));
CREATE POLICY role_permissions_rbac_update ON public.role_permissions FOR UPDATE TO authenticated
  USING (public.has_permission(auth.uid(),'roles','update'))
  WITH CHECK (public.has_permission(auth.uid(),'roles','update'));
CREATE POLICY role_permissions_rbac_delete ON public.role_permissions FOR DELETE TO authenticated
  USING (public.has_permission(auth.uid(),'roles','delete'));

-- Append-only proof (environment-agnostic; no fixture dependency).
DO $$
DECLARE
  v_upd text := NULL;
  v_del text := NULL;
  v_id uuid;
BEGIN
  INSERT INTO public.audit_log (action, entity_type, entity_id, meta)
  VALUES ('r2b_probe','audit_log','probe','{}'::jsonb)
  RETURNING id INTO v_id;

  BEGIN
    UPDATE public.audit_log SET action = 'x' WHERE id = v_id;
    RAISE EXCEPTION 'R2b PROOF FAILED: audit_log UPDATE succeeded';
  EXCEPTION WHEN others THEN
    v_upd := SQLERRM;
    IF v_upd LIKE 'R2b PROOF FAILED%' THEN RAISE EXCEPTION '%', v_upd; END IF;
  END;

  BEGIN
    DELETE FROM public.audit_log WHERE id = v_id;
    RAISE EXCEPTION 'R2b PROOF FAILED: audit_log DELETE succeeded';
  EXCEPTION WHEN others THEN
    v_del := SQLERRM;
    IF v_del LIKE 'R2b PROOF FAILED%' THEN RAISE EXCEPTION '%', v_del; END IF;
  END;

  RAISE NOTICE 'R2b PROOF update blocked: %', v_upd;
  RAISE NOTICE 'R2b PROOF delete blocked: %', v_del;
END $$;
