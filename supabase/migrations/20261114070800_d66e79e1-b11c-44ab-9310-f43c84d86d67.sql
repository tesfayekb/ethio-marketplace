-- e2e-areas: admin-users, admin-roles, admin-audit
-- Foundations 1, turn F1-2, part 5 of 5 — THE FAMILY'S STAFF READERS ONTO DOOR_CONTEXT (DEC-333; brief
-- docs/governance/briefs/f1-doors-2.md; ruling 1 decisions 2 and 4). The nine staff readers of the roles, users and
-- audit consoles are redeclared WHOLE from their last declarations (live md5 checked), each one's has_permission gate
-- replaced by door_context('staff-reader', <its manifest permission>, no dial, <its scope mode>): caller class →
-- deactivation → permission with scope, no step-up and no dial (a read changes nothing). A reader keeps its return
-- type (CREATE OR REPLACE; Postgres refuses a changed one) and its grants; a refusal RAISEs its code
-- (permissionDenied[:scope], accountDeactivated, notSignedIn) as the reader's error. INC-834: admin_list_users takes
-- the filter mode — a country holder's list narrows to its countries (one predicate on the list's country column);
-- the rest are global. admin_list_roles accepted roles:view as well as profiles:view; it takes its line's
-- profiles:view (its one caller is the users console). Proofs on scratch rows under a sentinel rollback. Law 11,
-- law 12, law 13, law 14, CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_list_users(text,text,text,integer,integer)', 'ea0247997aff648cdbdca68a62d22352'],
    ['public.admin_get_user(uuid)', 'af136b5d6ba4d3806b268b8229f0a4be'],
    ['public.admin_list_roles()', '3be262ba188a2eff3fa37a59d7c387be'],
    ['public.admin_list_roles_detailed()', '69ad8c2392d36279a674e5b87178599d'],
    ['public.admin_get_role(uuid)', '73228e2ec085b5d5e7aa73a414f71891'],
    ['public.admin_user_activity(uuid,integer)', '06a853d09b6801389996f7162382415b'],
    ['public.admin_list_audit(text,text,text,timestamp with time zone,timestamp with time zone,integer,integer)', '525ba63e176efa805e396e0782913a17'],
    ['public.admin_audit_facets()', 'd5a60e97c1464f522e3b7940c304dc02'],
    ['public.admin_audit_stats(integer)', '5eab6b70e7751a323a0a40a7d1c116c9']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114090300')
     OR (SELECT prorettype FROM pg_proc WHERE oid = 'public.begin_impersonation(uuid,text)'::regprocedure) <> 'jsonb'::regtype THEN
    RAISE EXCEPTION 'F1-2 part 5: part 4 (e30e4335) must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-2 part 5: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_list_users (whole from 20260816120338 :231; filter)
CREATE OR REPLACE FUNCTION public.admin_list_users(
  p_search text DEFAULT NULL,
  p_status text DEFAULT NULL,
  p_role text DEFAULT NULL,
  p_limit integer DEFAULT 25,
  p_offset integer DEFAULT 0
)
RETURNS TABLE(
  user_id uuid, display_name text, email text, home_country_code character(2),
  account_status text, created_at timestamptz, roles text[], total_count bigint
)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
#variable_conflict use_column
DECLARE
  v_ctx public.door_ctx;
BEGIN
  v_ctx := public.door_context('staff-reader', 'profiles', 'view', NULL, NULL, 'filter');

  RETURN QUERY
  WITH base AS (
    SELECT p.user_id AS uid, p.display_name AS dname, u.email::text AS mail,
           p.home_country_code AS country, p.account_status AS status,
           p.created_at AS joined, p.seller_alias AS alias,
           COALESCE(ARRAY(
             SELECT r.name FROM public.user_roles ur
             JOIN public.roles r ON r.id = ur.role_id
             WHERE ur.user_id = p.user_id
             ORDER BY r.priority DESC
           ), ARRAY[]::text[]) AS role_names
    FROM public.profiles p
    JOIN auth.users u ON u.id = p.user_id
  ), filtered AS (
    SELECT * FROM base b
    WHERE (p_status IS NULL OR p_status = 'all' OR b.status = p_status)
      AND (p_role IS NULL OR p_role = 'all' OR p_role = ANY (b.role_names))
      AND (
        p_search IS NULL OR p_search = ''
        OR b.dname ILIKE '%' || p_search || '%'
        OR b.mail ILIKE '%' || p_search || '%'
        OR COALESCE(b.alias, '') ILIKE '%' || p_search || '%'
      )
      AND (v_ctx.countries IS NULL OR b.country = ANY (v_ctx.countries))
  )
  SELECT f.uid, f.dname, f.mail, f.country, f.status, f.joined, f.role_names,
         COUNT(*) OVER () AS total_count
  FROM filtered f
  ORDER BY f.joined DESC
  LIMIT GREATEST(COALESCE(p_limit, 25), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $$;
REVOKE ALL ON FUNCTION public.admin_list_users(text, text, text, integer, integer) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 2. admin_get_user (whole from 20260816120338 :282; global)
CREATE OR REPLACE FUNCTION public.admin_get_user(p_user_id uuid)
RETURNS TABLE(
  user_id uuid, display_name text, email text, home_country_code character(2),
  account_status text, created_at timestamptz, roles text[],
  seller_alias text, show_phone boolean, show_telegram boolean, contact_whatsapp boolean,
  status_reason text, status_changed_at timestamptz, last_sign_in_at timestamptz
)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
#variable_conflict use_column
BEGIN
  PERFORM public.door_context('staff-reader', 'profiles', 'view', NULL, NULL, 'global');

  RETURN QUERY
  SELECT p.user_id, p.display_name, u.email::text, p.home_country_code,
         p.account_status, p.created_at,
         COALESCE(ARRAY(
           SELECT r.name FROM public.user_roles ur
           JOIN public.roles r ON r.id = ur.role_id
           WHERE ur.user_id = p.user_id ORDER BY r.priority DESC
         ), ARRAY[]::text[]),
         p.seller_alias, p.show_phone, p.show_telegram, p.contact_whatsapp,
         p.status_reason, p.status_changed_at, u.last_sign_in_at
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.user_id
  WHERE p.user_id = p_user_id;
END $$;
REVOKE ALL ON FUNCTION public.admin_get_user(uuid) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 3. admin_list_roles (whole from 20260816120338 :363; global)
CREATE OR REPLACE FUNCTION public.admin_list_roles()
RETURNS TABLE(name text, display_name text, is_system boolean, priority integer)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
#variable_conflict use_column
BEGIN
  PERFORM public.door_context('staff-reader', 'profiles', 'view', NULL, NULL, 'global');
  RETURN QUERY
  SELECT r.name, r.display_name, r.is_system, r.priority
  FROM public.roles r ORDER BY r.priority DESC;
END $$;
REVOKE ALL ON FUNCTION public.admin_list_roles() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 4. admin_list_roles_detailed (whole from 20260822050500 :58; global)
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
  PERFORM public.door_context('staff-reader', 'roles', 'view', NULL, NULL, 'global');

  RETURN QUERY
  SELECT r.id, r.name, r.display_name, r.description, r.is_system,
         (SELECT count(*) FROM public.user_roles ur WHERE ur.role_id = r.id),
         (SELECT count(*) FROM public.role_permissions rp WHERE rp.role_id = r.id)
    FROM public.roles r
   ORDER BY r.priority DESC, r.name;
END $$;
REVOKE ALL ON FUNCTION public.admin_list_roles_detailed() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 5. admin_get_role (whole from 20260822065530 :93; global)
CREATE OR REPLACE FUNCTION public.admin_get_role(p_role_id uuid)
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
  PERFORM public.door_context('staff-reader', 'roles', 'view', NULL, NULL, 'global');

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

-- ------------------------------------------------------------ 6. admin_user_activity (whole from 20260901165322 :23; global)
CREATE OR REPLACE FUNCTION public.admin_user_activity(p_user_id uuid, p_limit integer DEFAULT 50)
RETURNS TABLE(
  id uuid,
  actor_id uuid,
  action text,
  entity_type text,
  entity_id text,
  meta jsonb,
  created_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
#variable_conflict use_column
DECLARE
  v_limit integer := GREATEST(COALESCE(p_limit, 50), 1);
  v_entity text := p_user_id::text;
BEGIN
  -- A per-user activity view rides on profiles:view; the GLOBAL audit viewer
  -- (U3) is the one that requires audit_logs:view.
  PERFORM public.door_context('staff-reader', 'profiles', 'view', NULL, NULL, 'global');

  RETURN QUERY
  WITH by_actor AS (
    SELECT a.id, a.actor_id, a.action, a.entity_type, a.entity_id, a.meta, a.created_at
    FROM public.audit_log a
    WHERE a.actor_id = p_user_id
    ORDER BY a.created_at DESC
    LIMIT v_limit
  ),
  by_entity AS (
    SELECT a.id, a.actor_id, a.action, a.entity_type, a.entity_id, a.meta, a.created_at
    FROM public.audit_log a
    WHERE a.entity_id = v_entity
    ORDER BY a.created_at DESC
    LIMIT v_limit
  ),
  merged AS (
    SELECT * FROM by_actor
    UNION
    SELECT * FROM by_entity
  )
  SELECT m.id, m.actor_id, m.action, m.entity_type, m.entity_id, m.meta, m.created_at
  FROM merged m
  ORDER BY m.created_at DESC
  LIMIT v_limit;
END $function$;
REVOKE ALL ON FUNCTION public.admin_user_activity(uuid, integer) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 7. admin_list_audit (whole from 20260903033520 :28; global)
CREATE OR REPLACE FUNCTION public.admin_list_audit(
  p_search text DEFAULT NULL::text,
  p_action text DEFAULT NULL::text,
  p_entity_type text DEFAULT NULL::text,
  p_from timestamp with time zone DEFAULT NULL::timestamp with time zone,
  p_to timestamp with time zone DEFAULT NULL::timestamp with time zone,
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0
)
RETURNS TABLE(
  id uuid,
  actor_id uuid,
  actor_name text,
  action text,
  entity_type text,
  entity_id text,
  meta jsonb,
  created_at timestamp with time zone,
  total_count bigint
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
#variable_conflict use_column
DECLARE
  v_actor_ids uuid[] := ARRAY[]::uuid[];
  v_has_search boolean := p_search IS NOT NULL AND p_search <> '';
  v_total bigint;
BEGIN
  -- (a) gate first: door_context's staff-reader order
  PERFORM public.door_context('staff-reader', 'audit_logs', 'view', NULL, NULL, 'global');

  -- (b) pre-resolve name search against profiles, off the audit page path
  IF v_has_search THEN
    v_actor_ids := ARRAY(
      SELECT pr.user_id FROM public.profiles pr
      WHERE pr.display_name ILIKE '%' || p_search || '%'
    );
  END IF;

  -- (d) capped count: exact to 10,000; 10,001 means "10,000+"
  SELECT count(*) INTO v_total FROM (
    SELECT 1
    FROM public.audit_log a2
    WHERE (p_action IS NULL OR p_action = '' OR p_action = 'all' OR a2.action = p_action)
      AND (p_entity_type IS NULL OR p_entity_type = '' OR p_entity_type = 'all'
           OR a2.entity_type = p_entity_type)
      AND (p_from IS NULL OR a2.created_at >= p_from)
      AND (p_to IS NULL OR a2.created_at <= p_to)
      AND (NOT v_has_search
           OR a2.entity_id ILIKE '%' || p_search || '%'
           OR a2.actor_id = ANY(v_actor_ids))
    LIMIT 10001
  ) c;

  -- (c) page from audit_log alone, then join profiles over the page only
  RETURN QUERY
  WITH page AS (
    SELECT a.id, a.actor_id, a.action, a.entity_type, a.entity_id, a.meta, a.created_at
    FROM public.audit_log a
    WHERE (p_action IS NULL OR p_action = '' OR p_action = 'all' OR a.action = p_action)
      AND (p_entity_type IS NULL OR p_entity_type = '' OR p_entity_type = 'all'
           OR a.entity_type = p_entity_type)
      AND (p_from IS NULL OR a.created_at >= p_from)
      AND (p_to IS NULL OR a.created_at <= p_to)
      AND (NOT v_has_search
           OR a.entity_id ILIKE '%' || p_search || '%'
           OR a.actor_id = ANY(v_actor_ids))
    ORDER BY a.created_at DESC
    LIMIT GREATEST(COALESCE(p_limit, 50), 1)
    OFFSET GREATEST(COALESCE(p_offset, 0), 0)
  )
  SELECT p.id, p.actor_id, pr.display_name AS actor_name, p.action, p.entity_type,
         p.entity_id, p.meta, p.created_at, v_total AS total_count
  FROM page p
  LEFT JOIN public.profiles pr ON pr.user_id = p.actor_id
  ORDER BY p.created_at DESC;
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_audit(text, text, text, timestamp with time zone, timestamp with time zone, integer, integer) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 8. admin_audit_facets (whole from 20260822073000 :83; global)
CREATE OR REPLACE FUNCTION public.admin_audit_facets()
RETURNS TABLE(kind text, value text)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  PERFORM public.door_context('staff-reader', 'audit_logs', 'view', NULL, NULL, 'global');
  RETURN QUERY
    SELECT 'action'::text, a.action FROM public.audit_log a GROUP BY a.action
    UNION ALL
    SELECT 'entity_type'::text, a.entity_type FROM public.audit_log a GROUP BY a.entity_type
    ORDER BY 1, 2;
END $$;
REVOKE ALL ON FUNCTION public.admin_audit_facets() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 9. admin_audit_stats (whole from 20260822073000 :100; global)
CREATE OR REPLACE FUNCTION public.admin_audit_stats(p_days int DEFAULT 14)
RETURNS TABLE(days jsonb, top_actions jsonb, count_24h bigint, count_7d bigint,
              active_impersonations bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v_days int := LEAST(GREATEST(COALESCE(p_days, 14), 1), 90);
BEGIN
  PERFORM public.door_context('staff-reader', 'audit_logs', 'view', NULL, NULL, 'global');

  RETURN QUERY
  WITH span AS (
    SELECT (current_date - (v_days - 1) + s)::date AS day
    FROM generate_series(0, v_days - 1) s
  ), per_day AS (
    SELECT sp.day,
           (SELECT count(*) FROM public.audit_log a
             WHERE a.created_at >= sp.day::timestamptz
               AND a.created_at < (sp.day + 1)::timestamptz) AS n
    FROM span sp
  ), tops AS (
    SELECT a.action, count(*) AS n
    FROM public.audit_log a
    WHERE a.created_at >= now() - make_interval(days => v_days)
    GROUP BY a.action ORDER BY count(*) DESC, a.action LIMIT 5
  )
  SELECT
    COALESCE((SELECT jsonb_agg(jsonb_build_object('day', d.day, 'count', d.n) ORDER BY d.day)
                FROM per_day d), '[]'::jsonb),
    COALESCE((SELECT jsonb_agg(jsonb_build_object('action', t.action, 'count', t.n))
                FROM tops t), '[]'::jsonb),
    (SELECT count(*) FROM public.audit_log a WHERE a.created_at >= now() - interval '24 hours'),
    (SELECT count(*) FROM public.audit_log a WHERE a.created_at >= now() - interval '7 days'),
    (SELECT count(*) FROM public.impersonation_sessions s
      WHERE s.ended_at IS NULL AND s.expires_at > now());
END $$;
REVOKE ALL ON FUNCTION public.admin_audit_stats(integer) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 10. PROOFS
-- (a) catalog facts: each reader STABLE SECURITY DEFINER with search_path public, EXECUTE for authenticated and not
--     for anon or PUBLIC, its body this file's (md5).
-- (b) the gates on all nine: no caller → notSignedIn; a deactivated holder → accountDeactivated; a signed-in caller
--     without the permission → permissionDenied; a roles:view holder is refused admin_list_roles (profiles:view now).
-- (c) INC-834: a country holder (XZ) of the three permissions reads admin_list_users narrowed to XZ (the XY user
--     absent) and is refused every global reader (permissionDenied:scope); the global holder reads all nine — the
--     list with both scratch users, the detail of one, a role's matrix — with no second factor and no dial spent.
DO $proof$
DECLARE
  v_tag     text := 'e2e-mig-f12s-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 10);
  v_xz      character(2) := 'XZ';
  v_xy      character(2) := 'XY';
  v_staff   uuid := gen_random_uuid();
  v_cstaff  uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_rview   uuid := gen_random_uuid();
  v_u_xz    uuid := gen_random_uuid();
  v_u_xy    uuid := gen_random_uuid();
  v_role_s  uuid;
  v_role_r  uuid;
  v_calls   text[];
  v_globals text[];
  v_call    text;
  v_who     uuid;
  v_want    text;
  v_msg     text;
  v_count   bigint;
  v_ids     uuid[];
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_list_users(text,text,text,integer,integer)', '03329d6df73a8b6eaebecf914a50b4d6'],
    ['public.admin_get_user(uuid)', '4e951b5348fca85e70d47aa150d771be'],
    ['public.admin_list_roles()', '7e03c157989fea281a38f4df718d7de6'],
    ['public.admin_list_roles_detailed()', '6c6902f40b51985088afac61ac7b270c'],
    ['public.admin_get_role(uuid)', '062dff559107ebdaebaab6d9fe3b6427'],
    ['public.admin_user_activity(uuid,integer)', 'ebed193a543c5725f6884139f4c6a6ee'],
    ['public.admin_list_audit(text,text,text,timestamp with time zone,timestamp with time zone,integer,integer)', 'b56f0f1475fa5e57f37b58f8462a5409'],
    ['public.admin_audit_facets()', '4201f9dca9ff2243f65e0e5b9a8fc433'],
    ['public.admin_audit_stats(integer)', 'f52f725f36c4b4b11c42a64693e4446f']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR NOT proretset OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-2 part 5 proof (a): %''s header or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-2 part 5 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy)) THEN
      RAISE EXCEPTION 'F1-2 part 5 proof: a scratch country code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', true), (v_xy, v_tag || ' xy', true);
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff,  v_tag || '-staff@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_cstaff, v_tag || '-cstaff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain,  v_tag || '-plain@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact,  v_tag || '-deact@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_rview,  v_tag || '-rview@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_u_xz,   v_tag || '-uxz@example.invalid',    NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_u_xy,   v_tag || '-uxy@example.invalid',    NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    UPDATE public.profiles SET home_country_code = CASE WHEN user_id = v_u_xz THEN v_xz ELSE v_xy END
     WHERE user_id IN (v_u_xz, v_u_xy)
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = profiles.user_id AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role_s;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_s, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE (r.name, p.action) IN (('profiles', 'view'), ('roles', 'view'), ('audit_logs', 'view'));
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-rview', v_tag) RETURNING id INTO v_role_r;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_r, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'roles' AND p.action = 'view';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_s) <> 3
       OR (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_r) <> 1 THEN
      RAISE EXCEPTION 'F1-2 part 5 proof: profiles:view, roles:view or audit_logs:view is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global'), (v_rview, v_role_r, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_s, 'country', v_xz);

    v_calls := ARRAY[
      format('public.admin_list_users(%L)', v_tag),
      format('public.admin_get_user(%L::uuid)', v_u_xz),
      'public.admin_list_roles()',
      'public.admin_list_roles_detailed()',
      format('public.admin_get_role(%L::uuid)', v_role_s),
      format('public.admin_user_activity(%L::uuid)', v_u_xz),
      format('public.admin_list_audit(%L)', v_tag),
      'public.admin_audit_facets()',
      'public.admin_audit_stats(1)'];
    v_globals := v_calls[2:9];

    -- (b) the gates: no caller, a deactivated holder, a caller without the permission
    FOREACH v_who IN ARRAY ARRAY[NULL, v_deact, v_plain]::uuid[] LOOP
      v_want := CASE WHEN v_who IS NULL THEN 'notSignedIn' WHEN v_who = v_deact THEN 'accountDeactivated' ELSE 'permissionDenied' END;
      PERFORM set_config('request.jwt.claims', CASE WHEN v_who IS NULL THEN '{}'
        ELSE json_build_object('sub', v_who::text, 'role', 'authenticated')::text END, true);
      FOREACH v_call IN ARRAY v_calls LOOP
        v_msg := NULL;
        BEGIN
          EXECUTE 'SELECT count(*) FROM ' || v_call INTO v_count;
        EXCEPTION WHEN SQLSTATE 'P0D01' THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
        END;
        IF v_msg IS DISTINCT FROM v_want THEN
          RAISE EXCEPTION 'F1-2 part 5 proof (b): % for % answered % (want %)', v_call, coalesce(v_who::text, 'no caller'), coalesce(v_msg, 'rows'), v_want;
        END IF;
      END LOOP;
    END LOOP;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_rview::text, 'role', 'authenticated')::text, true);
    v_msg := NULL;
    BEGIN
      SELECT count(*) INTO v_count FROM public.admin_list_roles();
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    END;
    SELECT count(*) INTO v_count FROM public.admin_list_roles_detailed();
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_count < 1 THEN
      RAISE EXCEPTION 'F1-2 part 5 proof (b): a roles:view holder''s admin_list_roles answered %', coalesce(v_msg, 'rows');
    END IF;

    -- (c) INC-834: the country holder
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated')::text, true);
    SELECT array_agg(l.user_id ORDER BY l.user_id) INTO v_ids FROM public.admin_list_users(v_tag || '-ux') l;
    IF v_ids IS DISTINCT FROM ARRAY[v_u_xz] THEN
      RAISE EXCEPTION 'F1-2 part 5 proof (c): the country holder''s list read % (want only the XZ user)', v_ids;
    END IF;
    FOREACH v_call IN ARRAY v_globals LOOP
      v_msg := NULL;
      BEGIN
        EXECUTE 'SELECT count(*) FROM ' || v_call INTO v_count;
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      END;
      IF v_msg IS DISTINCT FROM 'permissionDenied:scope' THEN
        RAISE EXCEPTION 'F1-2 part 5 proof (c): the country holder''s % answered %', v_call, coalesce(v_msg, 'rows');
      END IF;
    END LOOP;
    -- the global holder: no factor, no aal2 — a read owes its permission only
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated')::text, true);
    SELECT array_agg(l.user_id ORDER BY l.user_id) INTO v_ids FROM public.admin_list_users(v_tag || '-ux') l;
    IF v_ids IS DISTINCT FROM (SELECT array_agg(x ORDER BY x) FROM unnest(ARRAY[v_u_xz, v_u_xy]) x) THEN
      RAISE EXCEPTION 'F1-2 part 5 proof (c): the global holder''s list read %', v_ids;
    END IF;
    SELECT count(*) INTO v_count FROM public.admin_get_user(v_u_xz) g WHERE g.home_country_code = v_xz;
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-2 part 5 proof (c): the global holder''s detail read % rows', v_count;
    END IF;
    SELECT count(*) INTO v_count FROM public.admin_get_role(v_role_s) g WHERE g.granted;
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-2 part 5 proof (c): the scratch role''s matrix read % granted rows of 3', v_count;
    END IF;
    FOREACH v_call IN ARRAY v_calls LOOP
      EXECUTE 'SELECT count(*) FROM ' || v_call INTO v_count;
    END LOOP;
    SELECT count(*) INTO v_count FROM public.rate_limits WHERE key IN (v_staff::text, v_cstaff::text);
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-2 part 5 proof (c): a reader spent a dial (% rows)', v_count;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f12p5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f12p5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114090400') ON CONFLICT DO NOTHING;
