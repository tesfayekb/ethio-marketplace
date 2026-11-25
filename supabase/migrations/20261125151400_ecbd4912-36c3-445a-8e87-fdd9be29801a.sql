-- (no e2e-areas line: the permission cores answer every staff door, route and policy, so every spec area is selected)

-- Cursor bundle 7a, Part 1, file A of five — THE SERVER READS THE ROLE MATRIX EXACTLY (DEC-466, DEC-473; brief
-- docs/governance/briefs/cursor-bundle-7a.md, ruling docs/governance/briefs/cursor-bundle-7a-ruling-1.md decision 1).
-- A grant of `manage` answered for every other action of its resource in three readers: has_permission_core (a second
-- EXISTS), staff_session_holds (`IN (p_action, 'manage')` over the member role) and has_permission_scoped_core
-- (`IN (p_action, 'manage')` over the scope aggregate). The Roles console, get_my_permissions and the screens read a grant
-- exactly, so the matrix showed less than the server allowed. Each reader now answers for an action only from a grant of
-- THAT action; a grant of `manage` answers only when `manage` is asked (the doors that ask translations:manage and
-- services:manage by name). A super admin holds every permission by is_super_admin, as before. This file only removes authority.
--   1. has_permission_core, staff_session_holds, has_permission_scoped_core — redeclared WHOLE from
--      20261124203700 (byte for byte apart from the second EXISTS and the two `manage` terms and the comments that named
--      them); signatures, grants and the other two functions of that file (has_permission, has_permission_scoped) unchanged.
--   2. The DATA (DEC-473, decision 1): every `manage` permission no door, policy, route or screen asks by name goes — its
--      grants first, then the permission row — on both projects, by name: categories, countries, listings, locations,
--      permissions, profiles, roles, user_roles. translations:manage and services:manage stay (doors ask them by name).
--      Importing categories stays super admin only (the migration of 7 September designed it so); no grant is expanded.
-- Proofs on scratch rows under a sentinel rollback: a role holding only `<resource>:manage` is refused every other action
-- of that resource and admitted for `manage`, through has_permission, has_permission_core, has_permission_scoped(_core) in
-- every mode, door_context and staff_session_holds; the data's rows are read as a count that must not change for the names
-- that stay. Law 11, law 12, CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.has_permission_core(uuid,text,text)', 'c633eae927473b96a4e228a7bdd1356a'],
    ['public.staff_session_holds(uuid,text,text)', '669f735c798c7aeba8bb540a9762d649'],
    ['public.has_permission(uuid,text,text)', '47b2959aec21aef39c5e510880487665'],
    ['public.has_permission_scoped_core(uuid,text,text,character,text)', '43918073e2633dc9c9e37a1d53debd11'],
    ['public.has_permission_scoped(uuid,text,text,character,text)', 'ceeaf84a52ea75626203f7410a9daf77']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261125010000') THEN
    RAISE EXCEPTION 'cursor-bundle-7a file A: the mark 20261125010000 must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'cursor-bundle-7a file A: the live % is not the body this file was built from (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. the three readers (whole, from 20261124203700)
CREATE OR REPLACE FUNCTION public.has_permission_core(p_user_id uuid, p_resource text, p_action text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  -- Foundations 1 F1-1 (INC-409) — asked about ANOTHER person by an authenticated caller who is not a super
  -- admin, this answers false (never a RAISE: a policy expression cannot raise). The service role and a
  -- session without a role (a migration proof) read the truth as before.
  -- Bundle 16 turn S3 (D189) — a deactivated account holds no permission: every staff door and every policy that
  -- asks this function answers false for it (a super admin cannot be deactivated — profiles_status_guard).
  SELECT CASE WHEN p_user_id IS DISTINCT FROM auth.uid() AND auth.role() = 'authenticated'
                   AND NOT public.is_super_admin(auth.uid()) THEN false
              WHEN public.account_is_deactivated(p_user_id) THEN false
              WHEN public.is_super_admin(p_user_id) THEN true ELSE EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role_id IN (SELECT public.get_role_hierarchy(ur.role_id))
    JOIN public.permissions p ON rp.permission_id = p.id
    JOIN public.resources res ON p.resource_id = res.id
    WHERE ur.user_id = p_user_id AND res.name = p_resource AND p.action = p_action)
  END;
$function$;

CREATE OR REPLACE FUNCTION public.staff_session_holds(p_user_id uuid, p_resource text, p_action text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  -- DEC-461 — a staff authority holds only for a session that used its second factor. Asked about ANOTHER person, by the
  -- service role, or by a session with no role (a migration proof): as the core answered. admin_panel:access only tells the
  -- app the account is staff. A permission the default member role holds (read from its grants, hierarchy
  -- included, exactly as the core reads a grant) is a member's, not staff's. The cheap test (aal2 AND a verified factor — the
  -- staff's own, ordinary session) answers first; only a session without it pays the member-role read.
  SELECT CASE
           WHEN p_user_id IS DISTINCT FROM auth.uid() OR auth.role() IS DISTINCT FROM 'authenticated' THEN true
           WHEN p_resource = 'admin_panel' AND p_action = 'access' THEN true
           WHEN COALESCE(auth.jwt() ->> 'aal', 'aal1') = 'aal2'
                AND EXISTS (
                  SELECT 1 FROM auth.mfa_factors f
                   WHERE f.user_id = p_user_id
                     AND f.status::text = 'verified'
                     AND f.factor_type::text = 'totp') THEN true
           ELSE EXISTS (
             SELECT 1 FROM public.roles br
             JOIN public.role_permissions rp ON rp.role_id IN (SELECT public.get_role_hierarchy(br.id))
             JOIN public.permissions p ON rp.permission_id = p.id
             JOIN public.resources res ON p.resource_id = res.id
             WHERE br.name = 'user' AND res.name = p_resource AND p.action = p_action)
         END;
$function$;

CREATE OR REPLACE FUNCTION public.has_permission_scoped_core(p_user_id uuid, p_resource text, p_action text, p_country character DEFAULT NULL, p_mode text DEFAULT 'none')
 RETURNS TABLE(allowed boolean, countries character(2)[], detail text)
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path = public
AS $$
DECLARE
  v_global    boolean;
  v_countries character(2)[];
  v_code      character(2) := nullif(upper(btrim(coalesce(p_country::text, ''))), '')::character(2);
BEGIN
  IF p_mode IS NULL OR p_mode NOT IN ('none', 'match', 'global', 'filter') THEN
    RAISE EXCEPTION 'has_permission_scoped: unknown scope mode %', coalesce(p_mode, 'NULL');
  END IF;
  IF p_user_id IS NULL OR public.account_is_deactivated(p_user_id) THEN
    RETURN QUERY SELECT false, NULL::character(2)[], NULL::text; RETURN;
  END IF;
  IF public.is_super_admin(p_user_id) THEN
    RETURN QUERY SELECT true, NULL::character(2)[], NULL::text; RETURN;
  END IF;
  IF p_mode = 'none' THEN
    RETURN QUERY SELECT public.has_permission_core(p_user_id, p_resource, p_action), NULL::character(2)[], NULL::text; RETURN;
  END IF;
  SELECT bool_or(ur.scope_type = 'global'),
         array_agg(DISTINCT ur.scope_country::character(2)) FILTER (WHERE ur.scope_type = 'country' AND ur.scope_country IS NOT NULL)
    INTO v_global, v_countries
    FROM public.user_roles ur
   WHERE ur.user_id = p_user_id
     AND EXISTS (SELECT 1
                   FROM public.role_permissions rp
                   JOIN public.permissions p ON p.id = rp.permission_id
                   JOIN public.resources res ON res.id = p.resource_id
                  WHERE rp.role_id IN (SELECT public.get_role_hierarchy(ur.role_id))
                    AND res.name = p_resource
                    AND p.action = p_action);
  v_global := coalesce(v_global, false);
  IF NOT v_global AND v_countries IS NULL THEN
    RETURN QUERY SELECT false, NULL::character(2)[], NULL::text; RETURN;
  END IF;
  IF p_mode = 'global' THEN
    RETURN QUERY SELECT v_global, NULL::character(2)[], CASE WHEN v_global THEN NULL::text ELSE 'scope' END; RETURN;
  END IF;
  IF p_mode = 'filter' THEN
    RETURN QUERY SELECT true, CASE WHEN v_global THEN NULL::character(2)[] ELSE v_countries END, NULL::text; RETURN;
  END IF;
  -- match: a global grant passes; a country grant passes only for its own country.
  IF v_global THEN
    RETURN QUERY SELECT true, NULL::character(2)[], NULL::text; RETURN;
  END IF;
  IF v_code IS NULL OR NOT (v_code = ANY (v_countries)) THEN
    RETURN QUERY SELECT false, v_countries, 'scope'::text; RETURN;
  END IF;
  RETURN QUERY SELECT true, v_countries, NULL::text;
END $$;

COMMENT ON FUNCTION public.has_permission_core(uuid, text, text) IS
  'DEC-461 / DEC-466: the holding logic of has_permission without the staff-session rule — deactivation, super admin, role grants read exactly (a grant of manage answers only when manage is asked), and INC-409''s refusal to tell another person''s permissions. Read by has_permission and has_permission_scoped_core only.';
COMMENT ON FUNCTION public.staff_session_holds(uuid, text, text) IS
  'DEC-461 / DEC-466: the staff-session rule — a self-check of a permission the default member role does not hold (its grants read exactly) is true only for an aal2 session and a verified totp factor; another person, the service role, a session with no role, admin_panel:access and a member''s own permission are true. Read by has_permission, has_permission_scoped and door_context.';
COMMENT ON FUNCTION public.has_permission_scoped_core(uuid, text, text, character, text) IS
  'DEC-461 / DEC-466: has_permission_scoped without the staff-session rule — none (has_permission_core), match, global, filter, as INC-834 laid them; the scope aggregate reads a grant of the asked action exactly. Read by has_permission_scoped and door_context.';
REVOKE ALL ON FUNCTION public.has_permission_core(uuid, text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.has_permission_core(uuid, text, text) TO service_role;
REVOKE ALL ON FUNCTION public.staff_session_holds(uuid, text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.staff_session_holds(uuid, text, text) TO service_role;
REVOKE ALL ON FUNCTION public.has_permission_scoped_core(uuid, text, text, character, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.has_permission_scoped_core(uuid, text, text, character, text) TO service_role;

-- ------------------------------------------------------------ 2. the data (DEC-473): the `manage` permissions nothing asks by name
-- Grants first, then the permission row, by name; a name a project does not have changes nothing. The permissions that
-- stay (any resource not in the list: translations:manage, services:manage among them) are counted before and after.
DO $data$
DECLARE
  v_names  text[] := ARRAY['categories', 'countries', 'listings', 'locations', 'permissions', 'profiles', 'roles', 'user_roles'];
  v_before integer;
  v_after  integer;
  v_left   integer;
BEGIN
  SELECT count(*) INTO v_before
    FROM public.permissions p JOIN public.resources res ON res.id = p.resource_id
   WHERE p.action = 'manage' AND NOT (res.name = ANY (v_names));
  DELETE FROM public.role_permissions rp
   USING public.permissions p, public.resources res
   WHERE rp.permission_id = p.id AND p.resource_id = res.id
     AND p.action = 'manage' AND res.name = ANY (v_names);
  DELETE FROM public.permissions p
   USING public.resources res
   WHERE p.resource_id = res.id AND p.action = 'manage' AND res.name = ANY (v_names);
  SELECT count(*) INTO v_left
    FROM public.permissions p JOIN public.resources res ON res.id = p.resource_id
   WHERE p.action = 'manage' AND res.name = ANY (v_names);
  SELECT count(*) INTO v_after
    FROM public.permissions p JOIN public.resources res ON res.id = p.resource_id
   WHERE p.action = 'manage' AND NOT (res.name = ANY (v_names));
  IF v_left <> 0 THEN
    RAISE EXCEPTION 'cursor-bundle-7a file A data: % manage permission(s) of the removed names remain', v_left;
  END IF;
  IF v_after IS DISTINCT FROM v_before THEN
    RAISE EXCEPTION 'cursor-bundle-7a file A data: the manage permissions that stay changed from % to %', v_before, v_after;
  END IF;
  IF EXISTS (SELECT 1 FROM public.role_permissions rp
              WHERE NOT EXISTS (SELECT 1 FROM public.permissions p WHERE p.id = rp.permission_id)) THEN
    RAISE EXCEPTION 'cursor-bundle-7a file A data: a grant points at no permission';
  END IF;
END $data$;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) catalog facts: the three redeclared readers — language, volatility, SECURITY DEFINER, search_path public, no PUBLIC
--       or anon or browser grant, the service role's; the bodies' md5 are this file's; the two untouched functions keep theirs;
--   (b) a role holding only `manage` of a scratch resource is refused `update` and admitted `manage`, a role holding only
--       `update` the reverse — through has_permission, has_permission_core, has_permission_scoped and its core in every
--       mode, and door_context (staff and staff-reader);
--   (c) staff_session_holds: a `manage` grant of the member role does not make `update` a member's permission; an `update`
--       grant of the member role does (the positive control);
--   (d) no `manage` permission of the removed names remains.
DO $proof$
DECLARE
  v_tag      text := 'e2e-mig-b7a-a-' || substr(gen_random_uuid()::text, 1, 8);
  v_man      uuid := gen_random_uuid();
  v_upd      uuid := gen_random_uuid();
  v_role_m   uuid;
  v_role_u   uuid;
  v_member   uuid;
  v_res      uuid;
  v_perm_upd uuid;
  v_perm_man uuid;
  v_res_name text := 'e2e_mig_res_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_ok       boolean;
  v_ctx      public.door_ctx;
  v_msg      text;
  v_state    text;
  v_fn       text;
  v_mode     text;
  v_class    text;
  v_pairs    text[][] := ARRAY[
    ['public.has_permission_core(uuid,text,text)', '8c253aa8c98f15607cc59ca1eb715d68'],
    ['public.staff_session_holds(uuid,text,text)', '9c6a150a374bf0360217e3b0f595f809'],
    ['public.has_permission(uuid,text,text)', '47b2959aec21aef39c5e510880487665'],
    ['public.has_permission_scoped_core(uuid,text,text,character,text)', '5a15db78ea363ea973b2534cc852873d'],
    ['public.has_permission_scoped(uuid,text,text,character,text)', 'ceeaf84a52ea75626203f7410a9daf77']];
  i          integer;
BEGIN
  -- (a)
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1];
    IF (SELECT NOT prosecdef OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-7a file A proof (a): % has a header or a grant that differs', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn::regprocedure) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'cursor-bundle-7a file A proof (a): the body of % differs from this file', v_fn;
    END IF;
    IF v_fn !~ '^public\.has_permission\(' AND has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-7a file A proof (a): % is open to a browser role', v_fn;
    END IF;
  END LOOP;
  IF NOT has_function_privilege('authenticated', 'public.has_permission(uuid,text,text)'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'cursor-bundle-7a file A proof (a): has_permission lost its grant to authenticated';
  END IF;
  IF (SELECT provolatile FROM pg_proc WHERE oid = 'public.has_permission_core(uuid,text,text)'::regprocedure) <> 's'
     OR (SELECT provolatile FROM pg_proc WHERE oid = 'public.staff_session_holds(uuid,text,text)'::regprocedure) <> 's'
     OR (SELECT provolatile FROM pg_proc WHERE oid = 'public.has_permission_scoped_core(uuid,text,text,character,text)'::regprocedure) <> 's' THEN
    RAISE EXCEPTION 'cursor-bundle-7a file A proof (a): a volatility differs';
  END IF;

  -- (d) the removed names leave no permission
  IF EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources res ON res.id = p.resource_id
              WHERE p.action = 'manage'
                AND res.name IN ('categories', 'countries', 'listings', 'locations', 'permissions', 'profiles', 'roles', 'user_roles')) THEN
    RAISE EXCEPTION 'cursor-bundle-7a file A proof (d): a manage permission of a removed name remains';
  END IF;

  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_man, v_tag || '-man@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_upd, v_tag || '-upd@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    -- a scratch resource with `update` and `manage`; one role holds only manage, another only update
    INSERT INTO public.resources (name, description) VALUES (v_res_name, v_tag) RETURNING id INTO v_res;
    INSERT INTO public.permissions (resource_id, action, requires_step_up) VALUES (v_res, 'update', false) RETURNING id INTO v_perm_upd;
    INSERT INTO public.permissions (resource_id, action, requires_step_up) VALUES (v_res, 'manage', false) RETURNING id INTO v_perm_man;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-manage-only', v_tag) RETURNING id INTO v_role_m;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-update-only', v_tag) RETURNING id INTO v_role_u;
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_role_m, v_perm_man), (v_role_u, v_perm_upd);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_man, v_role_m, 'global'), (v_upd, v_role_u, 'global');
    -- a verified second factor for both, so the staff-session rule asks nothing more at aal2
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret) VALUES
      (gen_random_uuid(), v_man, v_tag || '-f1', 'totp', 'verified', now(), now(), substr(md5(gen_random_uuid()::text), 1, 16)),
      (gen_random_uuid(), v_upd, v_tag || '-f2', 'totp', 'verified', now(), now(), substr(md5(gen_random_uuid()::text), 1, 16));

    -- (b) the cores, no session (the truth the core reads): manage-only answers manage, not update; update-only the reverse
    PERFORM set_config('request.jwt.claims', '{}', true);
    FOREACH v_fn IN ARRAY ARRAY['public.has_permission_core', 'public.has_permission'] LOOP
      EXECUTE format('SELECT %s($1, $2, $3)', v_fn) INTO v_ok USING v_man, v_res_name, 'update';
      IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-7a file A proof (b): % admitted a manage-only role for update', v_fn; END IF;
      EXECUTE format('SELECT %s($1, $2, $3)', v_fn) INTO v_ok USING v_man, v_res_name, 'manage';
      IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-7a file A proof (b): % refused a manage-only role for manage', v_fn; END IF;
      EXECUTE format('SELECT %s($1, $2, $3)', v_fn) INTO v_ok USING v_upd, v_res_name, 'update';
      IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-7a file A proof (b): % refused an update-only role for update', v_fn; END IF;
      EXECUTE format('SELECT %s($1, $2, $3)', v_fn) INTO v_ok USING v_upd, v_res_name, 'manage';
      IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-7a file A proof (b): % admitted an update-only role for manage', v_fn; END IF;
    END LOOP;
    -- the scoped readers, every mode (match with no country: a global grant passes)
    FOREACH v_fn IN ARRAY ARRAY['public.has_permission_scoped_core', 'public.has_permission_scoped'] LOOP
      FOREACH v_mode IN ARRAY ARRAY['none', 'global', 'filter', 'match'] LOOP
        EXECUTE format('SELECT s.allowed FROM %s($1, $2, $3, NULL, $4) s', v_fn) INTO v_ok USING v_man, v_res_name, 'update', v_mode;
        IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-7a file A proof (b): % (%) admitted a manage-only role for update', v_fn, v_mode; END IF;
        EXECUTE format('SELECT s.allowed FROM %s($1, $2, $3, NULL, $4) s', v_fn) INTO v_ok USING v_man, v_res_name, 'manage', v_mode;
        IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-7a file A proof (b): % (%) refused a manage-only role for manage', v_fn, v_mode; END IF;
        EXECUTE format('SELECT s.allowed FROM %s($1, $2, $3, NULL, $4) s', v_fn) INTO v_ok USING v_upd, v_res_name, 'update', v_mode;
        IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-7a file A proof (b): % (%) refused an update-only role for update', v_fn, v_mode; END IF;
        EXECUTE format('SELECT s.allowed FROM %s($1, $2, $3, NULL, $4) s', v_fn) INTO v_ok USING v_upd, v_res_name, 'manage', v_mode;
        IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-7a file A proof (b): % (%) admitted an update-only role for manage', v_fn, v_mode; END IF;
      END LOOP;
    END LOOP;
    -- the door: a signed-in session at aal2 with a verified factor
    FOREACH v_class IN ARRAY ARRAY['staff', 'staff-reader'] LOOP
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_man::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
      v_msg := NULL; v_state := NULL;
      BEGIN
        v_ctx := public.door_context(v_class, v_res_name, 'update', NULL, NULL, 'none');
      EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
      END;
      IF v_msg IS NULL OR v_msg !~ 'permissionDenied' OR v_state NOT IN ('P0D01', 'PGRST') THEN
        RAISE EXCEPTION 'cursor-bundle-7a file A proof (b): % admitted a manage-only role for update (% / %)', v_class, coalesce(v_msg, 'success'), v_state;
      END IF;
      v_ctx := public.door_context(v_class, v_res_name, 'manage', NULL, NULL, 'none');
      IF v_ctx.uid IS DISTINCT FROM v_man THEN
        RAISE EXCEPTION 'cursor-bundle-7a file A proof (b): % refused a manage-only role for manage', v_class;
      END IF;
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_upd::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
      v_ctx := public.door_context(v_class, v_res_name, 'update', NULL, NULL, 'none');
      IF v_ctx.uid IS DISTINCT FROM v_upd THEN
        RAISE EXCEPTION 'cursor-bundle-7a file A proof (b): % refused an update-only role for update', v_class;
      END IF;
      v_msg := NULL; v_state := NULL;
      BEGIN
        v_ctx := public.door_context(v_class, v_res_name, 'manage', NULL, NULL, 'none');
      EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
      END;
      IF v_msg IS NULL OR v_msg !~ 'permissionDenied' OR v_state NOT IN ('P0D01', 'PGRST') THEN
        RAISE EXCEPTION 'cursor-bundle-7a file A proof (b): % admitted an update-only role for manage (% / %)', v_class, coalesce(v_msg, 'success'), v_state;
      END IF;
    END LOOP;

    -- (c) staff_session_holds reads the member role's grants exactly. The caller holds `update` (the core says yes) at aal1
    -- with no second factor; the member role is given `manage` of the scratch resource: update is still not a member's.
    SELECT id INTO STRICT v_member FROM public.roles WHERE name = 'user';
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_member, v_perm_man);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_upd::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    IF public.has_permission_core(v_upd, v_res_name, 'update') IS NOT TRUE THEN
      RAISE EXCEPTION 'cursor-bundle-7a file A proof (c): the core did not hold update for the update-only role';
    END IF;
    IF public.staff_session_holds(v_upd, v_res_name, 'update') IS NOT FALSE
       OR public.has_permission(v_upd, v_res_name, 'update') IS NOT FALSE THEN
      RAISE EXCEPTION 'cursor-bundle-7a file A proof (c): a manage grant of the member role made update a member''s permission';
    END IF;
    -- the positive control: the member role holds `update` itself
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_member, v_perm_upd);
    IF public.staff_session_holds(v_upd, v_res_name, 'update') IS NOT TRUE
       OR public.has_permission(v_upd, v_res_name, 'update') IS NOT TRUE THEN
      RAISE EXCEPTION 'cursor-bundle-7a file A proof (c): an update grant of the member role was not a member''s permission';
    END IF;

    RAISE EXCEPTION 'b7a-a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'b7a-a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261125170000') ON CONFLICT DO NOTHING;
