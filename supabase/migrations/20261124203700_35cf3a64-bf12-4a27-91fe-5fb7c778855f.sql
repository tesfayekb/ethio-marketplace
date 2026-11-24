-- Cursor bundle 6, Part 3, file 1 of 2 — THE STAFF-SESSION RULE (DEC-461, DEC-438's "every staff action and staff read"; brief
-- docs/governance/briefs/cursor-bundle-6.md, ruling docs/governance/briefs/cursor-bundle-6-ruling-1.md decisions 1 and 2).
-- A staff account's authority holds only for a session that used its second factor. THE RULE: when the caller asks about
-- its OWN authority (p_user_id = auth.uid()) for a permission the default member role does not hold, the permission holds
-- only if the session is aal2 (auth.jwt() ->> 'aal') AND the account has a verified totp factor. The service role, a
-- session with no role (a migration proof), a question about ANOTHER person, and admin_panel:access (it only tells the
-- app the account is staff, for AdminGate and the session policy; it grants no data and no action — census: no policy,
-- door, function or route grants anything through it) answer as before. A super admin is held to the rule too.
-- THE FORM (cores first, G74 law 6):
--   1. has_permission_core(uuid,text,text) — the current has_permission body byte for byte (20261106051700 :44), answering
--      without the session rule. New, born closed (service role only; the definer functions below call it as their owner).
--   2. staff_session_holds(uuid,text,text) — the rule itself, one function. New, born closed. The member role's permission
--      set is READ FROM ITS GRANTS (roles, role_permissions, permissions, resources), never a literal list. K4, named: the
--      base role is the role 'user' that handle_new_user gives every account and admin_get_role reads as the user baseline
--      (20260822065530); no SQL constants function exists yet (reported in the bundle's report).
--   3. has_permission(uuid,text,text) — redeclared WHOLE, header unchanged: the core AND the rule. Its grants are restated.
--      A holder's call pays one more read; a non-holder's call pays nothing more (the core answers false first).
--   4. has_permission_scoped_core(uuid,text,text,character,text) — the current has_permission_scoped body byte for byte
--      (20261106051500 :72) apart from its one line that asked has_permission, which asks the core: the scoped logic without
--      the rule. New, born closed. has_permission_scoped(…) — redeclared WHOLE, header unchanged: the core's answer AND the
--      rule.
--   5. door_context — redeclared WHOLE from 20261120100000 :64: it asks the CORE for the permission (a member still reads
--      permissionDenied first); then, for the staff and staff-reader classes, applies the session rule and refuses with
--      SQLSTATE P0009 — 'step-up required: no verified factor' when the account has none (the message AL-25, AL-8, ML-10,
--      SC-16 and ATR-4 assert), 'step-up required' when its session has not used it — which every guarded staff action's
--      step-up dialog already cures and every server route already answers as 428; then step-up as before.
-- Callers (census, docs/governance/reports/cursor-bundle-6.stop-2.md): every door reaches the rule through door_context;
-- the staff server routes (callerHasPermission) and the four storage-bucket policies reach it through has_permission; no
-- other policy names has_permission, is_super_admin, user_roles or has_role (proof (h) judges the live catalog).
-- This file is items 1-4 (the cores, the rule, has_permission, has_permission_scoped) with their proofs (a)-(e) and (g);
-- file 2 is item 5 (door_context) and proof (f). Proofs on scratch rows under a sentinel rollback. Law 11, law 12, CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.has_permission(uuid,text,text)', 'c633eae927473b96a4e228a7bdd1356a'],
    ['public.has_permission_scoped(uuid,text,text,character,text)', '3825186312d23eb61175be8134b624f8']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261123150000') THEN
    RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1: the mark 20261123150000 must be applied first';
  END IF;
  IF to_regprocedure('public.has_permission_core(uuid,text,text)') IS NOT NULL
     OR to_regprocedure('public.staff_session_holds(uuid,text,text)') IS NOT NULL
     OR to_regprocedure('public.has_permission_scoped_core(uuid,text,text,character,text)') IS NOT NULL THEN
    RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1: a core or the rule already exists';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1: the live % is not the body this file was built from (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. has_permission_core (the current has_permission body)
CREATE FUNCTION public.has_permission_core(p_user_id uuid, p_resource text, p_action text)
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
  OR EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role_id IN (SELECT public.get_role_hierarchy(ur.role_id))
    JOIN public.permissions p ON rp.permission_id = p.id
    JOIN public.resources res ON p.resource_id = res.id
    WHERE ur.user_id = p_user_id AND res.name = p_resource AND p.action = 'manage')
  END;
$function$;
COMMENT ON FUNCTION public.has_permission_core(uuid, text, text) IS
  'DEC-461: the holding logic of has_permission without the staff-session rule — deactivation, super admin, role grants (with manage), and INC-409''s refusal to tell another person''s permissions. Read by has_permission and has_permission_scoped_core only.';
REVOKE ALL ON FUNCTION public.has_permission_core(uuid, text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.has_permission_core(uuid, text, text) TO service_role;

-- ------------------------------------------------------------ 2. staff_session_holds (the rule)
CREATE FUNCTION public.staff_session_holds(p_user_id uuid, p_resource text, p_action text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  -- DEC-461 — a staff authority holds only for a session that used its second factor. Asked about ANOTHER person, by the
  -- service role, or by a session with no role (a migration proof): as the core answered. admin_panel:access only tells the
  -- app the account is staff. A permission the default member role holds (read from its grants, hierarchy and manage
  -- included, as the core reads a grant) is a member's, not staff's. The cheap test (aal2 AND a verified factor — the
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
             WHERE br.name = 'user' AND res.name = p_resource AND p.action IN (p_action, 'manage'))
         END;
$function$;
COMMENT ON FUNCTION public.staff_session_holds(uuid, text, text) IS
  'DEC-461: the staff-session rule — a self-check of a permission the default member role does not hold is true only for an aal2 session and a verified totp factor; another person, the service role, a session with no role, admin_panel:access and a member''s own permission are true. Read by has_permission, has_permission_scoped and door_context.';
REVOKE ALL ON FUNCTION public.staff_session_holds(uuid, text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.staff_session_holds(uuid, text, text) TO service_role;

-- ------------------------------------------------------------ 3. has_permission (whole; the core AND the rule)
CREATE OR REPLACE FUNCTION public.has_permission(p_user_id uuid, p_resource text, p_action text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  -- DEC-461 — the holding logic (has_permission_core) first: a non-holder answers false at once. A holder is then held to
  -- the staff-session rule (staff_session_holds).
  SELECT CASE WHEN public.has_permission_core(p_user_id, p_resource, p_action) IS NOT TRUE THEN false
              ELSE public.staff_session_holds(p_user_id, p_resource, p_action) END;
$function$;
REVOKE ALL ON FUNCTION public.has_permission(uuid, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text, text) TO service_role;

-- ------------------------------------------------------------ 4. has_permission_scoped_core (the current body) and has_permission_scoped
CREATE FUNCTION public.has_permission_scoped_core(p_user_id uuid, p_resource text, p_action text, p_country character DEFAULT NULL, p_mode text DEFAULT 'none')
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
                    AND p.action IN (p_action, 'manage'));
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
COMMENT ON FUNCTION public.has_permission_scoped_core(uuid, text, text, character, text) IS
  'DEC-461: has_permission_scoped without the staff-session rule — none (has_permission_core), match, global, filter, as INC-834 laid them. Read by has_permission_scoped and door_context.';
REVOKE ALL ON FUNCTION public.has_permission_scoped_core(uuid, text, text, character, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.has_permission_scoped_core(uuid, text, text, character, text) TO service_role;

CREATE OR REPLACE FUNCTION public.has_permission_scoped(p_user_id uuid, p_resource text, p_action text, p_country character DEFAULT NULL, p_mode text DEFAULT 'none')
 RETURNS TABLE(allowed boolean, countries character(2)[], detail text)
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path = public
AS $$
BEGIN
  -- DEC-461 — the scoped core's answer AND the staff-session rule.
  RETURN QUERY
    SELECT c.allowed AND public.staff_session_holds(p_user_id, p_resource, p_action), c.countries, c.detail
      FROM public.has_permission_scoped_core(p_user_id, p_resource, p_action, p_country, p_mode) c;
END $$;
COMMENT ON FUNCTION public.has_permission_scoped(uuid, text, text, character, text) IS
  'DEC-333 / INC-834 / DEC-461: the scope-aware permission check — has_permission_scoped_core (none, match, global, filter; a super admin passes every mode) AND the staff-session rule. door_context asks the core and applies the rule itself, to refuse with P0009.';
REVOKE ALL ON FUNCTION public.has_permission_scoped(uuid, text, text, character, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.has_permission_scoped(uuid, text, text, character, text) TO service_role;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) catalog facts: the three new functions and the two redeclared ones — language, volatility, SECURITY DEFINER,
--       search_path public, no PUBLIC or anon grant; the new ones closed to browser roles; has_permission still granted
--       to authenticated; the bodies' md5 are this file's;
--   (b) the rule on scratch accounts: aal1 staff self-check false (a factor present or not); aal2 with no verified factor
--       false; aal2 with a verified factor true; a pending (unverified) factor does not count;
--   (c) a permission the member role holds is true at aal1 (read from the member role's grants); admin_panel:access too;
--   (d) the unchanged answers: a super admin about ANOTHER person; the service role; a session with no role; a stranger
--       asking about another person (INC-409) — all at aal1; the core answers a staff self-check true at aal1;
--   (e) has_permission_scoped: the same four self-check answers, and its core true at aal1;
--   (g) the live catalog: the policies naming has_permission are the four storage-bucket rules, and none names
--       is_super_admin, user_roles, has_role or reads the token's aal.
DO $proof$
DECLARE
  v_tag      text := 'e2e-mig-b6p3a-' || substr(gen_random_uuid()::text, 1, 8);
  v_staff    uuid := gen_random_uuid();
  v_nofactor uuid := gen_random_uuid();
  v_pending  uuid := gen_random_uuid();
  v_super    uuid := gen_random_uuid();
  v_member   uuid := gen_random_uuid();
  v_other    uuid := gen_random_uuid();
  v_role     uuid;
  v_role_adm uuid;
  v_res      uuid;
  v_perm     uuid;
  v_perm_adm uuid;
  v_res_name text := 'e2e_mig_res_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_member_p text;
  v_ok       boolean;
  v_row      record;
  v_ctx      public.door_ctx;
  v_msg      text;
  v_state    text;
  v_fn       text;
  v_pairs    text[][] := ARRAY[
    ['public.has_permission_core(uuid,text,text)', 'c633eae927473b96a4e228a7bdd1356a'],
    ['public.staff_session_holds(uuid,text,text)', '669f735c798c7aeba8bb540a9762d649'],
    ['public.has_permission(uuid,text,text)', '47b2959aec21aef39c5e510880487665'],
    ['public.has_permission_scoped_core(uuid,text,text,character,text)', '43918073e2633dc9c9e37a1d53debd11'],
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
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (a): % has a header or a grant that differs', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn::regprocedure) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (a): the body of % differs from this file', v_fn;
    END IF;
    IF v_fn !~ '^public\.has_permission\(' AND has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (a): % is open to a browser role', v_fn;
    END IF;
  END LOOP;
  IF NOT has_function_privilege('authenticated', 'public.has_permission(uuid,text,text)'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (a): has_permission lost its grant to authenticated';
  END IF;
  IF (SELECT provolatile FROM pg_proc WHERE oid = 'public.has_permission(uuid,text,text)'::regprocedure) <> 's'
     OR (SELECT provolatile FROM pg_proc WHERE oid = 'public.staff_session_holds(uuid,text,text)'::regprocedure) <> 's' THEN
    RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (a): a volatility differs';
  END IF;

  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff,    v_tag || '-staff@example.invalid',    '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_nofactor, v_tag || '-nofactor@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_pending,  v_tag || '-pending@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_super,    v_tag || '-super@example.invalid',    '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_member,   v_tag || '-member@example.invalid',   '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_other,    v_tag || '-other@example.invalid',    '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    -- a scratch permission, held by a scratch role; the staff accounts hold it; admin_panel:access too
    INSERT INTO public.resources (name, description) VALUES (v_res_name, v_tag) RETURNING id INTO v_res;
    INSERT INTO public.permissions (resource_id, action, requires_step_up) VALUES (v_res, 'edit', false) RETURNING id INTO v_perm;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-holder', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_role, v_perm);
    SELECT p.id INTO STRICT v_perm_adm FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'admin_panel' AND p.action = 'access';
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-admin-panel', v_tag) RETURNING id INTO v_role_adm;
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_role_adm, v_perm_adm);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES
      (v_staff, v_role, 'global'), (v_nofactor, v_role, 'global'), (v_pending, v_role, 'global'),
      (v_staff, v_role_adm, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_super, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    -- factors: a verified totp for the staff and the super admin, a pending one for v_pending
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret) VALUES
      (gen_random_uuid(), v_staff,   v_tag || '-f1', 'totp', 'verified',   now(), now(), substr(md5(gen_random_uuid()::text), 1, 16)),
      (gen_random_uuid(), v_super,   v_tag || '-f2', 'totp', 'verified',   now(), now(), substr(md5(gen_random_uuid()::text), 1, 16)),
      (gen_random_uuid(), v_pending, v_tag || '-f3', 'totp', 'unverified', now(), now(), substr(md5(gen_random_uuid()::text), 1, 16));
    -- the member role's permission, read from the data
    SELECT res.name || ':' || p.action INTO v_member_p
      FROM public.roles br
      JOIN public.role_permissions rp ON rp.role_id = br.id
      JOIN public.permissions p ON p.id = rp.permission_id
      JOIN public.resources res ON res.id = p.resource_id
     WHERE br.name = 'user' AND res.name <> 'admin_panel' ORDER BY 1 LIMIT 1;
    IF v_member_p IS NULL THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof: the member role holds no permission to read'; END IF;

    -- (b) the rule
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    v_ok := public.has_permission(v_staff, v_res_name, 'edit');
    IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (b): an aal1 staff self-check held with a factor present'; END IF;
    IF public.has_permission_core(v_staff, v_res_name, 'edit') IS NOT TRUE THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (d): the core did not answer an aal1 staff self-check true';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_nofactor::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    v_ok := public.has_permission(v_nofactor, v_res_name, 'edit');
    IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (b): an aal1 staff self-check held with no factor'; END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_nofactor::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
    v_ok := public.has_permission(v_nofactor, v_res_name, 'edit');
    IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (b): an aal2 staff self-check held with no verified factor'; END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_pending::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
    v_ok := public.has_permission(v_pending, v_res_name, 'edit');
    IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (b): an unverified factor counted'; END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
    v_ok := public.has_permission(v_staff, v_res_name, 'edit');
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (b): an aal2 staff self-check with a verified factor was refused'; END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    v_ok := public.has_permission(v_super, v_res_name, 'edit');
    IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (b): a super admin was not held to the rule at aal1'; END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
    v_ok := public.has_permission(v_super, v_res_name, 'edit');
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (b): a super admin at aal2 with a factor was refused'; END IF;

    -- (c) a member's permission and admin_panel:access hold at aal1
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_member::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    v_ok := public.has_permission(v_member, split_part(v_member_p, ':', 1), split_part(v_member_p, ':', 2));
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (c): a member''s own permission % was refused at aal1', v_member_p; END IF;
    v_ok := public.has_permission(v_member, v_res_name, 'edit');
    IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (c): a member held a staff permission'; END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    v_ok := public.has_permission(v_staff, 'admin_panel', 'access');
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (c): admin_panel:access was refused at aal1'; END IF;

    -- (d) the unchanged answers
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    v_ok := public.has_permission(v_staff, v_res_name, 'edit');
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (d): a super admin about another person changed'; END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_other::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
    v_ok := public.has_permission(v_staff, v_res_name, 'edit');
    IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (d): a stranger learnt another person''s permission'; END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('role', 'service_role')::text, true);
    v_ok := public.has_permission(v_staff, v_res_name, 'edit');
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (d): the service role was refused'; END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_ok := public.has_permission(v_staff, v_res_name, 'edit');
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (d): a session with no role was refused'; END IF;

    -- (e) has_permission_scoped and its core
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    SELECT s.allowed INTO v_ok FROM public.has_permission_scoped(v_staff, v_res_name, 'edit', NULL, 'global') s;
    IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (e): the scoped check held at aal1'; END IF;
    SELECT s.allowed INTO v_ok FROM public.has_permission_scoped_core(v_staff, v_res_name, 'edit', NULL, 'global') s;
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (e): the scoped core did not answer true at aal1'; END IF;
    SELECT s.allowed INTO v_ok FROM public.has_permission_scoped(v_staff, v_res_name, 'edit', NULL, 'none') s;
    IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (e): the scoped check (none) held at aal1'; END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
    SELECT s.allowed INTO v_ok FROM public.has_permission_scoped(v_staff, v_res_name, 'edit', NULL, 'global') s;
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (e): the scoped check at aal2 with a factor was refused'; END IF;

    -- (g) the live catalog's authority policies
    IF (SELECT string_agg(p.schemaname || '.' || p.tablename || '::' || p.policyname, ', ' ORDER BY p.policyname)
          FROM pg_policies p
         WHERE coalesce(p.qual, '') || ' ' || coalesce(p.with_check, '') ~ 'has_permission[a-z_]*\(')
       IS DISTINCT FROM 'storage.objects::category_assets_assets_delete, storage.objects::category_assets_assets_insert, storage.objects::category_assets_assets_update, storage.objects::category_assets_public_read' THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (g): the policies that name has_permission are not the four storage-bucket rules';
    END IF;
    IF EXISTS (SELECT 1 FROM pg_policies p
                WHERE coalesce(p.qual, '') || ' ' || coalesce(p.with_check, '') ~ '(is_super_admin|user_roles|has_role|auth\.jwt|aal2)') THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 1 proof (g): a policy reads authority outside has_permission';
    END IF;
    RAISE EXCEPTION 'b6p3f1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'b6p3f1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261124220000') ON CONFLICT DO NOTHING;
