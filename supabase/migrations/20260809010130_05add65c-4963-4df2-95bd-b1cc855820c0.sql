-- =====================================================================
-- Phase R1 — RBAC core (DEC-013 §1, REQ-030)
-- Additive, idempotent. No existing object is dropped or replaced except
-- handle_new_user(), which is EXTENDED (its prior inserts kept verbatim).
-- =====================================================================

-- ---------- A. TABLES -------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_name text,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
  action text NOT NULL,
  description text,
  requires_step_up boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (resource_id, action)
);

CREATE TABLE IF NOT EXISTS public.roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_name text,
  description text,
  parent_role_id uuid REFERENCES public.roles(id) ON DELETE SET NULL,
  priority integer NOT NULL DEFAULT 0,
  is_system boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  conditions jsonb,
  is_core boolean NOT NULL DEFAULT false,
  granted_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  scope_type text NOT NULL DEFAULT 'global' CHECK (scope_type IN ('global','country')),
  scope_country char(2),
  assigned_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role_id, scope_type, scope_country)
);

CREATE TABLE IF NOT EXISTS public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS user_roles_user_id_idx ON public.user_roles (user_id);
CREATE INDEX IF NOT EXISTS role_permissions_role_id_idx ON public.role_permissions (role_id);
CREATE INDEX IF NOT EXISTS permissions_resource_id_idx ON public.permissions (resource_id);
CREATE INDEX IF NOT EXISTS audit_log_entity_created_idx ON public.audit_log (entity_type, created_at DESC);

-- GRANTS. Reads/writes are still gated by the policies below; the client's
-- only intended read path is get_my_permissions().
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resources        TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.permissions      TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.roles            TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.role_permissions TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT SELECT ON public.audit_log  TO authenticated;
GRANT ALL ON public.resources        TO service_role;
GRANT ALL ON public.permissions      TO service_role;
GRANT ALL ON public.roles            TO service_role;
GRANT ALL ON public.role_permissions TO service_role;
GRANT ALL ON public.user_roles       TO service_role;
GRANT ALL ON public.audit_log        TO service_role;

ALTER TABLE public.resources        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log        ENABLE ROW LEVEL SECURITY;

-- ---------- B. FUNCTIONS ---------------------------------------------
CREATE OR REPLACE FUNCTION public.is_super_admin(p_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
    WHERE ur.user_id = p_user_id AND r.name = 'super_admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.get_role_hierarchy(p_role_id uuid)
RETURNS SETOF uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH RECURSIVE chain AS (
    SELECT id, parent_role_id FROM public.roles WHERE id = p_role_id
    UNION
    SELECT r.id, r.parent_role_id
    FROM public.roles r
    JOIN chain c ON r.id = c.parent_role_id
  )
  SELECT id FROM chain;
$$;

CREATE OR REPLACE FUNCTION public.has_permission(p_user_id uuid, p_resource text, p_action text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE WHEN public.is_super_admin(p_user_id) THEN true ELSE EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role_id IN (SELECT public.get_role_hierarchy(ur.role_id))
    JOIN public.permissions p ON rp.permission_id = p.id
    JOIN public.resources res ON p.resource_id = res.id
    WHERE ur.user_id = p_user_id AND res.name = p_resource AND p.action = p_action)
  OR EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role_id IN (SELECT public.get_role_hierarchy(ur.role_id))
    JOIN public.permissions p ON rp.permission_id = p.id
    JOIN public.resources res ON p.resource_id = res.id
    WHERE ur.user_id = p_user_id AND res.name = p_resource AND p.action = 'manage')
  END;
$$;

CREATE OR REPLACE FUNCTION public.get_my_permissions()
RETURNS TABLE (permission text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT res.name || ':' || p.action
  FROM public.permissions p
  JOIN public.resources res ON res.id = p.resource_id
  WHERE public.is_super_admin(auth.uid())
  UNION
  SELECT DISTINCT res.name || ':' || p.action
  FROM public.user_roles ur
  JOIN public.role_permissions rp ON rp.role_id IN (SELECT public.get_role_hierarchy(ur.role_id))
  JOIN public.permissions p ON p.id = rp.permission_id
  JOIN public.resources res ON res.id = p.resource_id
  WHERE ur.user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.log_audit(p_action text, p_entity_type text, p_entity_id text, p_meta jsonb)
RETURNS void
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (auth.uid(), p_action, p_entity_type, p_entity_id, COALESCE(p_meta, '{}'::jsonb));
END; $$;

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
  IF p_role_name IN ('super_admin','user') THEN
    RAISE EXCEPTION 'role % is not revocable through revoke_role', p_role_name;
  END IF;
  SELECT id INTO v_role_id FROM public.roles WHERE name = p_role_name;
  IF v_role_id IS NULL THEN RAISE EXCEPTION 'unknown role'; END IF;

  DELETE FROM public.user_roles WHERE user_id = p_target_user AND role_id = v_role_id;

  PERFORM public.log_audit('role.revoke', 'user_roles', p_target_user::text,
    jsonb_build_object('role', p_role_name));
END; $$;

CREATE OR REPLACE FUNCTION public.promote_to_super_admin(p_target_user uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_role_id uuid;
BEGIN
  IF NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'only a super admin may promote a super admin';
  END IF;
  IF public.is_super_admin(p_target_user) THEN RETURN; END IF;

  SELECT id INTO v_role_id FROM public.roles WHERE name = 'super_admin';
  INSERT INTO public.user_roles (user_id, role_id, scope_type, assigned_by)
  VALUES (p_target_user, v_role_id, 'global', auth.uid())
  ON CONFLICT DO NOTHING;

  PERFORM public.log_audit('role.promote_super_admin', 'user_roles', p_target_user::text,
    jsonb_build_object('role', 'super_admin'));
END; $$;

REVOKE ALL ON FUNCTION public.assign_role(uuid, text, char(2)) FROM public;
REVOKE ALL ON FUNCTION public.revoke_role(uuid, text) FROM public;
REVOKE ALL ON FUNCTION public.promote_to_super_admin(uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.get_my_permissions() TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_role_hierarchy(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_audit(text, text, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.assign_role(uuid, text, char(2)) TO authenticated;
GRANT EXECUTE ON FUNCTION public.revoke_role(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.promote_to_super_admin(uuid) TO authenticated;

-- ---------- C. TRIGGERS ----------------------------------------------
CREATE OR REPLACE FUNCTION public.roles_system_lock()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.is_system THEN RAISE EXCEPTION 'system role is immutable'; END IF;
  RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END; $$;

DROP TRIGGER IF EXISTS roles_system_lock ON public.roles;
CREATE TRIGGER roles_system_lock
BEFORE UPDATE OR DELETE ON public.roles
FOR EACH ROW EXECUTE FUNCTION public.roles_system_lock();

CREATE OR REPLACE FUNCTION public.role_permissions_core_lock()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.is_core THEN RAISE EXCEPTION 'core role permission is immutable'; END IF;
  RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END; $$;

DROP TRIGGER IF EXISTS role_permissions_core_lock ON public.role_permissions;
CREATE TRIGGER role_permissions_core_lock
BEFORE UPDATE OR DELETE ON public.role_permissions
FOR EACH ROW EXECUTE FUNCTION public.role_permissions_core_lock();

CREATE OR REPLACE FUNCTION public.user_roles_protect()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_name text; v_super_count integer;
BEGIN
  SELECT name INTO v_name FROM public.roles WHERE id = OLD.role_id;
  IF v_name = 'super_admin' THEN
    SELECT count(*) INTO v_super_count
      FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
     WHERE r.name = 'super_admin';
    IF v_super_count <= 1 THEN RAISE EXCEPTION 'cannot remove last super admin'; END IF;
  END IF;
  IF v_name = 'user' THEN RAISE EXCEPTION 'base user role cannot be removed'; END IF;
  RETURN OLD;
END; $$;

DROP TRIGGER IF EXISTS user_roles_protect ON public.user_roles;
CREATE TRIGGER user_roles_protect
BEFORE DELETE ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.user_roles_protect();

-- Extend handle_new_user: prior inserts preserved verbatim, base role added.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_name text;
  v_country char(2);
  v_source text;
BEGIN
  v_name := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'full_name',''),
    NULLIF(NEW.raw_user_meta_data->>'name',''),
    split_part(NEW.email, '@', 1),
    'user'
  );
  v_country := upper(NULLIF(NEW.raw_user_meta_data->>'country_guess',''));
  IF v_country IS NULL OR NOT EXISTS (SELECT 1 FROM public.countries WHERE code = v_country) THEN
    v_country := NULL;
    v_source := 'unknown';
  ELSE
    v_source := 'ip_guess';
  END IF;

  INSERT INTO public.user_directory (user_id, home_country_code, country_source)
    VALUES (NEW.id, v_country, v_source);
  INSERT INTO public.profiles (user_id, home_country_code, country_source, display_name)
    VALUES (NEW.id, v_country, v_source, v_name);

  -- Phase R1: every account carries the base 'user' role.
  INSERT INTO public.user_roles (user_id, role_id)
    VALUES (NEW.id, (SELECT id FROM public.roles WHERE name = 'user'))
    ON CONFLICT DO NOTHING;

  RETURN NEW;
END; $function$;

-- ---------- D. RLS POLICIES ------------------------------------------
DROP POLICY IF EXISTS resources_rbac_admin ON public.resources;
CREATE POLICY resources_rbac_admin ON public.resources
  FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(), 'roles', 'view'))
  WITH CHECK (public.has_permission(auth.uid(), 'roles', 'update'));

DROP POLICY IF EXISTS permissions_rbac_admin ON public.permissions;
CREATE POLICY permissions_rbac_admin ON public.permissions
  FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(), 'roles', 'view'))
  WITH CHECK (public.has_permission(auth.uid(), 'roles', 'update'));

DROP POLICY IF EXISTS roles_rbac_admin ON public.roles;
CREATE POLICY roles_rbac_admin ON public.roles
  FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(), 'roles', 'view'))
  WITH CHECK (public.has_permission(auth.uid(), 'roles', 'update'));

DROP POLICY IF EXISTS role_permissions_rbac_admin ON public.role_permissions;
CREATE POLICY role_permissions_rbac_admin ON public.role_permissions
  FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(), 'roles', 'view'))
  WITH CHECK (public.has_permission(auth.uid(), 'roles', 'update'));

DROP POLICY IF EXISTS user_roles_read ON public.user_roles;
CREATE POLICY user_roles_read ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_permission(auth.uid(), 'user_roles', 'view'));

DROP POLICY IF EXISTS audit_log_read ON public.audit_log;
CREATE POLICY audit_log_read ON public.audit_log
  FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(), 'audit_logs', 'view'));

-- ---------- E. SEEDS --------------------------------------------------
INSERT INTO public.resources (name, display_name) VALUES
  ('admin_panel','Admin Panel'),
  ('account_panel','Account Panel'),
  ('roles','Roles'),
  ('permissions','Permissions'),
  ('user_roles','User Roles'),
  ('audit_logs','Audit Logs'),
  ('categories','Categories'),
  ('listings','Listings'),
  ('locations','Locations'),
  ('countries','Countries'),
  ('profiles','Profiles')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.permissions (resource_id, action)
SELECT res.id, a.action
FROM public.resources res
CROSS JOIN LATERAL (
  SELECT unnest(
    CASE
      WHEN res.name IN ('admin_panel','account_panel') THEN ARRAY['access']
      WHEN res.name = 'roles' THEN ARRAY['view','create','update','delete','assign','manage']
      ELSE ARRAY['view','create','update','delete','manage']
    END
  ) AS action
) a
ON CONFLICT (resource_id, action) DO NOTHING;

INSERT INTO public.roles (name, display_name, priority, is_system) VALUES
  ('super_admin','Super Admin',100,true),
  ('user','User',0,true),
  ('admin','Admin',50,false),
  ('moderator','Moderator',40,false)
ON CONFLICT (name) DO NOTHING;

-- role_permissions seeds (role, resource, action, is_core)
INSERT INTO public.role_permissions (role_id, permission_id, is_core)
SELECT r.id, p.id, s.is_core
FROM (VALUES
  ('user','account_panel','access',true),
  ('admin','admin_panel','access',true),
  ('admin','account_panel','access',false),
  ('admin','categories','manage',false),
  ('admin','locations','manage',false),
  ('admin','countries','manage',false),
  ('admin','listings','view',false),
  ('admin','listings','update',false),
  ('admin','profiles','view',false),
  ('admin','audit_logs','view',false),
  ('admin','user_roles','view',false),
  ('moderator','admin_panel','access',true),
  ('moderator','account_panel','access',false),
  ('moderator','listings','view',false),
  ('moderator','listings','update',false)
) AS s(role_name, resource_name, action, is_core)
JOIN public.roles r ON r.name = s.role_name
JOIN public.resources res ON res.name = s.resource_name
JOIN public.permissions p ON p.resource_id = res.id AND p.action = s.action
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Backfill: every existing account gets the base 'user' role.
INSERT INTO public.user_roles (user_id, role_id)
SELECT u.id, (SELECT id FROM public.roles WHERE name = 'user')
FROM auth.users u
ON CONFLICT DO NOTHING;

-- BOOTSTRAP: operator becomes super_admin, or the migration fails loudly.
DO $bootstrap$
DECLARE v_uid uuid;
BEGIN
  SELECT id INTO v_uid FROM auth.users WHERE email = 'tesfayekb@gmail.com';
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'bootstrap failed: no auth.users row for tesfayekb@gmail.com';
  END IF;

  INSERT INTO public.user_roles (user_id, role_id, scope_type)
  VALUES (v_uid, (SELECT id FROM public.roles WHERE name = 'super_admin'), 'global')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (NULL, 'role.bootstrap_super_admin', 'user_roles', v_uid::text,
          jsonb_build_object('role','super_admin','source','migration bootstrap'));
END $bootstrap$;
