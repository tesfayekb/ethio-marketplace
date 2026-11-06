-- e2e-areas: auth-caller-gates, door-refusals, admin-legal
-- Foundations 1, turn F1-1, M-F1a part 3 of 6 — INC-409, base_languages(), the two stray grants, one new dial
-- (plan docs/governance/reports/f1-doors.stop-1.md §3.6 and §4; ruling 1 decisions 5 and 8). has_permission(uuid,text,text)
-- is redeclared WHOLE from 20261023100132 :78 (live md5 checked, G39) with ONE new first branch (INC-409): asked
-- about another person by an authenticated caller who is not a super admin, it answers false — false, never a
-- RAISE, because a policy expression cannot raise; the grant stays (229 policies read it). base_languages()
-- (INC-850): a STABLE staff reader behind door_context('staff-reader', 'legal', 'edit', global scope) answering the enabled admin
-- languages a legal draft may take beyond the base pair and the hidden pseudo tag, so the legal editor leaves
-- admin_list_languages (translations:view). The two grants no browser caller needs are revoked: the trigger
-- function languages_country_codes_valid() and require_step_up_if_needed(text,text), both granted to
-- authenticated outside every guard's domain (plan §1.1). One new rate dial, account_pref (ESTIMATE 60 per hour),
-- for user_set_preferred_language in part 4 (DEC-336: no door without a dial). Proofs on scratch rows under a
-- sentinel rollback. Law 11, law 12, CF-SQL-1.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261106120200')
     OR to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 3: part 2 (8b7c2e41) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.has_permission(uuid,text,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '75ce49ae5318a3c1f65573d54869d088' THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 3: the live has_permission is not 20261023100132''s body (%)', v_md5;
  END IF;
  IF to_regprocedure('public.base_languages()') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 3: base_languages() already exists';
  END IF;
  IF EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'account_pref') THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 3: the dial account_pref already exists';
  END IF;
  IF to_regprocedure('public.languages_country_codes_valid()') IS NULL
     OR to_regprocedure('public.require_step_up_if_needed(text,text)') IS NULL THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 3: a function whose grant this part revokes is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. has_permission (whole from 20261023100132 :78)
-- New: the first CASE branch (INC-409). Every other byte as before.
CREATE OR REPLACE FUNCTION public.has_permission(p_user_id uuid, p_resource text, p_action text)
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
REVOKE ALL ON FUNCTION public.has_permission(uuid, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text, text) TO service_role;

-- ------------------------------------------------------------ 2. base_languages() — INC-850
-- K4 exception, named: the base pair and the hidden pseudo tag are the literals 20261024045415's missing_languages
-- names (en by is_base; 'am', 'zxa' by code) — no SQL constants function exists yet (reported in F1-1's report).
CREATE FUNCTION public.base_languages()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path = public
AS $$
BEGIN
  PERFORM public.door_context('staff-reader', 'legal', 'edit', NULL, NULL, 'global');
  RETURN (SELECT coalesce(jsonb_agg(jsonb_build_object('code', l.code, 'name_en', l.name_en, 'name_native', l.name_native)
                                    ORDER BY l.sort, l.code), '[]'::jsonb)
            FROM public.languages l
           WHERE l.enabled_admin AND NOT l.is_base AND l.code NOT IN ('am', 'zxa'));
END $$;
COMMENT ON FUNCTION public.base_languages() IS
  'INC-850 / DEC-333: the enabled admin languages a legal draft may take beyond the base pair and the hidden pseudo tag — [{code, name_en, name_native}] — behind door_context(staff-reader, legal, edit).';
REVOKE ALL ON FUNCTION public.base_languages() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.base_languages() TO authenticated;
GRANT ALL ON FUNCTION public.base_languages() TO service_role;

-- ------------------------------------------------------------ 3. the two stray grants (plan §1.1)
REVOKE ALL ON FUNCTION public.languages_country_codes_valid() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.languages_country_codes_valid() TO service_role;
REVOKE ALL ON FUNCTION public.require_step_up_if_needed(text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.require_step_up_if_needed(text, text) TO service_role;

-- ------------------------------------------------------------ 4. the dial account_pref (ESTIMATE: 60 per hour)
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('account_pref', 60, 3600);

-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: has_permission's header, grants and the new body's md5; base_languages STABLE SECURITY
--     DEFINER with search_path public, EXECUTE to authenticated and not anon; the two revoked functions hold no
--     browser grant; the dial row.
-- (b) INC-409 on scratch accounts: holder A with a scratch permission — B (authenticated, no super admin) asking
--     about A → false; A about A → true; super admin S about A → true; the service role about A → true; with no
--     claims (a proof) → true; and B about B → B's own truth (false), the policy reading.
-- (c) base_languages on a scratch language (enabled_admin): a legal editor (legal:edit only) reads it, en and am
--     and zxa are absent, a disabled scratch language is absent; a caller without legal:edit → permissionDenied
--     (P0D01); no caller → notSignedIn.
DO $proof$
DECLARE
  v_tag      text := 'e2e-mig-f1a3-' || substr(gen_random_uuid()::text, 1, 8);
  v_a        uuid := gen_random_uuid();
  v_b        uuid := gen_random_uuid();
  v_s        uuid := gen_random_uuid();
  v_ed       uuid := gen_random_uuid();
  v_role     uuid;
  v_role_ed  uuid;
  v_res      uuid;
  v_perm     uuid;
  v_perm_ed  uuid;
  v_res_name text := 'e2e_mig_res_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lang_on  text := 'q' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 2);
  v_lang_off text := 'q' || substr(replace(gen_random_uuid()::text, '-', ''), 9, 2);
  v_fn       regprocedure := 'public.has_permission(uuid,text,text)'::regprocedure;
  v_bl       regprocedure := 'public.base_languages()'::regprocedure;
  v_answer   jsonb;
  v_ok       boolean;
  v_msg      text;
  v_state    text;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (a): has_permission''s header or grants differ';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM 'c633eae927473b96a4e228a7bdd1356a' THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (a): has_permission''s body differs from this file';
  END IF;
  IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_bl)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_bl)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_bl, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_bl, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_bl, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (a): base_languages''s header or grants differ';
  END IF;
  IF has_function_privilege('authenticated', 'public.languages_country_codes_valid()'::regprocedure, 'EXECUTE')
     OR has_function_privilege('anon', 'public.languages_country_codes_valid()'::regprocedure, 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.require_step_up_if_needed(text,text)'::regprocedure, 'EXECUTE')
     OR has_function_privilege('anon', 'public.require_step_up_if_needed(text,text)'::regprocedure, 'EXECUTE')
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = 'public.require_step_up_if_needed(text,text)'::regprocedure)) a WHERE a.grantee = 0)
     OR NOT has_function_privilege('service_role', 'public.require_step_up_if_needed(text,text)'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (a): a stray grant survives';
  END IF;
  IF (SELECT max_count || '/' || window_seconds FROM public.rate_dials WHERE action = 'account_pref') IS DISTINCT FROM '60/3600' THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (a): the dial account_pref is not 60 per 3600 s';
  END IF;

  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a,  v_tag || '-a@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b,  v_tag || '-b@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_s,  v_tag || '-s@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_ed, v_tag || '-ed@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.resources (name, description) VALUES (v_res_name, v_tag) RETURNING id INTO v_res;
    INSERT INTO public.permissions (resource_id, action, requires_step_up) VALUES (v_res, 'edit', false) RETURNING id INTO v_perm;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-holder', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_role, v_perm);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_a, v_role, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_s, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    -- a legal editor: legal:edit only
    SELECT p.id INTO STRICT v_perm_ed FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'legal' AND p.action = 'edit';
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-editor', v_tag) RETURNING id INTO v_role_ed;
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_role_ed, v_perm_ed);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_ed, v_role_ed, 'global');

    -- (b)
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_b::text, 'role', 'authenticated')::text, true);
    v_ok := public.has_permission(v_a, v_res_name, 'edit');
    IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (b): B learnt A''s permission'; END IF;
    v_ok := public.has_permission(auth.uid(), v_res_name, 'edit');
    IF v_ok IS NOT FALSE THEN RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (b): B about B did not answer B''s own truth'; END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    v_ok := public.has_permission(v_a, v_res_name, 'edit');
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (b): A about A was refused'; END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_s::text, 'role', 'authenticated')::text, true);
    v_ok := public.has_permission(v_a, v_res_name, 'edit');
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (b): a super admin about A was refused'; END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('role', 'service_role')::text, true);
    v_ok := public.has_permission(v_a, v_res_name, 'edit');
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (b): the service role about A was refused'; END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_ok := public.has_permission(v_a, v_res_name, 'edit');
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (b): a proof without claims was refused'; END IF;

    -- (c)
    INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
    VALUES (v_lang_on, v_tag || ' on', v_tag, true, false, 9001), (v_lang_off, v_tag || ' off', v_tag, false, false, 9002);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_ed::text, 'role', 'authenticated')::text, true);
    v_answer := public.base_languages();
    IF jsonb_typeof(v_answer) <> 'array'
       OR NOT EXISTS (SELECT 1 FROM jsonb_array_elements(v_answer) e WHERE e ->> 'code' = v_lang_on AND e ->> 'name_en' = v_tag || ' on')
       OR EXISTS (SELECT 1 FROM jsonb_array_elements(v_answer) e WHERE e ->> 'code' IN (v_lang_off, 'en', 'am', 'zxa'))
       OR EXISTS (SELECT 1 FROM jsonb_array_elements(v_answer) e JOIN public.languages l ON l.code = e ->> 'code' WHERE l.is_base OR NOT l.enabled_admin) THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (c): base_languages answered % for the legal editor', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_b::text, 'role', 'authenticated')::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      v_answer := public.base_languages();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (c): a caller without legal:edit answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      v_answer := public.base_languages();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'notSignedIn' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (c): no caller answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    RAISE EXCEPTION 'f1a3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261106120300') ON CONFLICT DO NOTHING;
