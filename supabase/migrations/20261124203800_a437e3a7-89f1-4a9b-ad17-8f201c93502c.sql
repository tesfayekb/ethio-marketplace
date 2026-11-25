-- Cursor bundle 6, Part 3, file 2 of 2 — THE STAFF-SESSION RULE, door_context (DEC-461, DEC-438's "every staff action and staff read"; brief
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
-- File 1 (the cores, the rule, has_permission, has_permission_scoped) is applied first. This file is item 5 and proof (f).
-- Proofs on scratch rows under a sentinel rollback. Law 11, law 12, CF-SQL-1.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261124220000') THEN
    RAISE EXCEPTION 'cursor-bundle-6 part 3 file 2: the mark 20261124220000 (file 1) must be applied first';
  END IF;
  IF to_regprocedure('public.staff_session_holds(uuid,text,text)') IS NULL
     OR to_regprocedure('public.has_permission_scoped_core(uuid,text,text,character,text)') IS NULL THEN
    RAISE EXCEPTION 'cursor-bundle-6 part 3 file 2: the cores of file 1 are missing';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p
       WHERE p.oid = 'public.door_context(text,text,text,text,character,text)'::regprocedure)
     IS DISTINCT FROM 'aa7e8bc66d8a6698a851cc3843c4cabc' THEN
    RAISE EXCEPTION 'cursor-bundle-6 part 3 file 2: the live door_context is not the body this file was built from';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 5. door_context (whole from 20261120100000 :64)
CREATE OR REPLACE FUNCTION public.door_context(p_class text, p_resource text DEFAULT NULL, p_action text DEFAULT NULL, p_dial text DEFAULT NULL, p_country character DEFAULT NULL, p_scope_mode text DEFAULT 'none')
 RETURNS public.door_ctx
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path = public
AS $$
DECLARE
  v_ctx       public.door_ctx;
  v_allowed   boolean;
  v_countries character(2)[];
  v_detail    text;
  v_gate      jsonb;
BEGIN
  IF p_class IS NULL OR p_class NOT IN ('owner', 'staff', 'public', 'reader', 'staff-reader') THEN
    RAISE EXCEPTION 'door_context: unknown class %', coalesce(p_class, 'NULL');
  END IF;
  IF p_class IN ('staff', 'staff-reader') AND (p_resource IS NULL OR p_action IS NULL) THEN
    RAISE EXCEPTION 'door_context: a staff class names its permission';
  END IF;
  IF p_class IN ('reader', 'staff-reader') AND p_dial IS NOT NULL THEN
    RAISE EXCEPTION 'door_context: a reader spends no dial';
  END IF;
  -- F1-7c (INC-1213): the outermost call's kind, for door_refuse. A call that spends a dial is a door, whose shell
  -- reads P0D01, and always marks it; a call with none is a reader and marks it only when nothing is marked yet.
  IF p_dial IS NOT NULL THEN
    PERFORM set_config('door.outer', 'door', true);
  ELSIF coalesce(current_setting('door.outer', true), '') = '' THEN
    PERFORM set_config('door.outer', 'reader', true);
  END IF;
  v_ctx.uid := auth.uid();
  v_ctx.role := auth.role();
  -- A job is not a person: the service role passes every gate and spends no dial.
  IF v_ctx.role = 'service_role' THEN
    RETURN v_ctx;
  END IF;
  -- 1. caller class
  IF v_ctx.uid IS NULL AND p_class <> 'public' THEN
    PERFORM public.door_refuse('notSignedIn');
  END IF;
  -- 2. deactivation (skipped for a signed-out public call: nothing to read)
  IF v_ctx.uid IS NOT NULL AND public.account_is_deactivated(v_ctx.uid) THEN
    PERFORM public.door_refuse('accountDeactivated');
  END IF;
  -- 3. permission with scope, 4. step-up (P0009 kept: the server's 428 and the client's dialog read it)
  IF p_resource IS NOT NULL THEN
    SELECT s.allowed, s.countries, s.detail INTO v_allowed, v_countries, v_detail
      FROM public.has_permission_scoped_core(v_ctx.uid, p_resource, p_action, p_country, p_scope_mode) s;
    IF NOT coalesce(v_allowed, false) THEN
      PERFORM public.door_refuse('permissionDenied', v_detail);
    END IF;
    v_ctx.countries := v_countries;
    -- DEC-461: a staff or staff-reader caller owes a session that used its second factor. After the permission (a member
    -- reads permissionDenied above), before step-up; P0009 is the code every guarded action's step-up dialog cures and
    -- every server route answers as 428. The message names why: no verified factor, or a session that has not used it.
    IF p_class IN ('staff', 'staff-reader') AND NOT public.staff_session_holds(v_ctx.uid, p_resource, p_action) THEN
      IF NOT EXISTS (SELECT 1 FROM auth.mfa_factors f
                      WHERE f.user_id = v_ctx.uid AND f.status::text = 'verified' AND f.factor_type::text = 'totp') THEN
        RAISE EXCEPTION 'step-up required: no verified factor'
          USING ERRCODE = 'P0009', HINT = 'Set up an authenticator app (TOTP) and retry this action.';
      END IF;
      RAISE EXCEPTION 'step-up required'
        USING ERRCODE = 'P0009', HINT = 'Verify a second factor (TOTP) and retry this action.';
    END IF;
    -- a staff reader owes its permission, never a second factor (a read changes nothing)
    IF p_class <> 'staff-reader' THEN
      PERFORM public.require_step_up_if_needed(p_resource, p_action);
    END IF;
  END IF;
  -- 5. dial (rate_gate counts nothing for a signed-out caller)
  IF p_dial IS NOT NULL AND v_ctx.uid IS NOT NULL THEN
    v_gate := public.rate_gate(p_dial);
    v_ctx.dial_remaining := (v_gate ->> 'remaining')::integer;
    v_ctx.resets_at := (v_gate ->> 'resets_at')::timestamptz;
    IF NOT coalesce((v_gate ->> 'allowed')::boolean, false) THEN
      PERFORM public.door_refuse('rateLimited', v_gate ->> 'resets_at');
    END IF;
  END IF;
  RETURN v_ctx;
END $$;
COMMENT ON FUNCTION public.door_context(text, text, text, text, character, text) IS
  'DEC-333: the one gate order every door calls first — caller class → deactivation → permission with scope → (staff classes) the staff-session rule → step-up → dial; refusals are door_refuse codes (notSignedIn, accountDeactivated, permissionDenied[:scope], rateLimited); step-up and the staff-session rule keep P0009. Classes: owner | staff | public | reader | staff-reader. F1-7c: marks the outermost call (door.outer, transaction-local) — door when it spends a dial, reader when it spends none and nothing is marked — for door_refuse. DEC-461: asks has_permission_scoped_core; a staff or staff-reader caller whose session has not used its second factor is refused P0009 after the permission check.';
REVOKE ALL ON FUNCTION public.door_context(text, text, text, text, character, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.door_context(text, text, text, text, character, text) TO service_role;

-- Proof (a) the door_context header, grants and body; (f) the door at aal1 and aal2 for the staff and staff-reader classes
-- (P0009 with its two messages), a member (permissionDenied, never P0009), the owner and reader classes (untouched), no caller.
DO $proof$
DECLARE
  v_tag      text := 'e2e-mig-b6p3b-' || substr(gen_random_uuid()::text, 1, 8);
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
BEGIN
  -- (a) catalog facts: header, grants and body of the redeclared door_context
  v_fn := 'public.door_context(text,text,text,text,character,text)';
  IF (SELECT NOT prosecdef OR proconfig::text <> '{search_path=public}' OR provolatile <> 'v' FROM pg_proc WHERE oid = v_fn::regprocedure)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
     OR has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'cursor-bundle-6 part 3 file 2 proof (a): door_context has a header or a grant that differs';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn::regprocedure) IS DISTINCT FROM '0cb7e9f7968e88a10aee13b79f18e3e0' THEN
    RAISE EXCEPTION 'cursor-bundle-6 part 3 file 2 proof (a): the body of door_context differs from this file';
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
    IF v_member_p IS NULL THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 2 proof: the member role holds no permission to read'; END IF;

    -- (f) door_context
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    FOREACH v_fn IN ARRAY ARRAY['staff', 'staff-reader'] LOOP
      v_msg := NULL; v_state := NULL;
      BEGIN
        v_ctx := public.door_context(v_fn, v_res_name, 'edit', NULL, NULL, 'none');
      EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
      END;
      IF v_msg IS DISTINCT FROM 'step-up required' OR v_state IS DISTINCT FROM 'P0009' THEN
        RAISE EXCEPTION 'cursor-bundle-6 part 3 file 2 proof (f): % at aal1 with a factor answered % (%)', v_fn, coalesce(v_msg, 'success'), v_state;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_nofactor::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    FOREACH v_fn IN ARRAY ARRAY['staff', 'staff-reader'] LOOP
      v_msg := NULL; v_state := NULL;
      BEGIN
        v_ctx := public.door_context(v_fn, v_res_name, 'edit', NULL, NULL, 'none');
      EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
      END;
      IF v_msg IS DISTINCT FROM 'step-up required: no verified factor' OR v_state IS DISTINCT FROM 'P0009' THEN
        RAISE EXCEPTION 'cursor-bundle-6 part 3 file 2 proof (f): % at aal1 with no factor answered % (%)', v_fn, coalesce(v_msg, 'success'), v_state;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
    FOREACH v_fn IN ARRAY ARRAY['staff', 'staff-reader'] LOOP
      v_ctx := public.door_context(v_fn, v_res_name, 'edit', NULL, NULL, 'none');
      IF v_ctx.uid IS DISTINCT FROM v_staff THEN
        RAISE EXCEPTION 'cursor-bundle-6 part 3 file 2 proof (f): % at aal2 with a factor did not answer the caller', v_fn;
      END IF;
    END LOOP;
    -- no permission: permissionDenied (door_refuse's own code, P0D01 or its PGRST envelope), at aal1 and at aal2, never P0009
    FOREACH v_state IN ARRAY ARRAY['aal1', 'aal2'] LOOP
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_member::text, 'role', 'authenticated', 'aal', v_state)::text, true);
      v_msg := NULL; v_fn := NULL;
      BEGIN
        v_ctx := public.door_context('staff', v_res_name, 'edit', NULL, NULL, 'none');
      EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_fn = RETURNED_SQLSTATE;
      END;
      IF v_msg IS NULL OR v_msg !~ 'permissionDenied' OR v_fn NOT IN ('P0D01', 'PGRST') THEN
        RAISE EXCEPTION 'cursor-bundle-6 part 3 file 2 proof (f): a member at % answered % (%)', v_state, coalesce(v_msg, 'success'), v_fn;
      END IF;
    END LOOP;
    -- the owner and reader classes name no permission: untouched at aal1
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    v_ctx := public.door_context('owner');
    v_ctx := public.door_context('reader');
    -- no caller
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      v_ctx := public.door_context('staff', v_res_name, 'edit', NULL, NULL, 'none');
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS NULL OR v_msg !~ 'notSignedIn' OR v_state NOT IN ('P0D01', 'PGRST') THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 2 proof (f): no caller answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;

    RAISE EXCEPTION 'b6p3f2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'b6p3f2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261124220100') ON CONFLICT DO NOTHING;
