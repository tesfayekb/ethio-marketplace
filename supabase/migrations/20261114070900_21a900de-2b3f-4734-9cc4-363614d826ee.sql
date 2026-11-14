-- e2e-areas: admin-users, impersonation, door-refusals
-- Foundations 1, turn F1-2, part 6 — RULING 1'S THREE CHANGES (DEC-333; brief docs/governance/briefs/f1-doors-2.md;
-- ruling docs/governance/briefs/f1-doors-2-ruling-1.md, part 6). Three whole redeclarations by CREATE OR REPLACE
-- (live md5 checked), each changed only where named:
-- (a) admin_update_profile is GLOBAL: door_context('staff', profiles:update, staff_moderation, NULL, 'global'). Its
--     country argument is the NEW value for the row, not the country of the row being edited, so it is not a scope;
--     the users family is global until country staff is a product feature (the target-row mode is a roadmap line).
--     The door's codes are part 3's (76ce28de) proof; one is proven again here with every earlier check cleared.
-- (b) end_impersonation spends account_pref: a door that only closes what another door opened spends a dial other
--     than its opener's, so a live session can always be ended by hand (begin keeps impersonation).
-- (c) public.security_lints() gains a sixth count, impersonation_reach (ERROR): the roles other than super_admin that
--     reach impersonation:use or impersonation:manage through get_role_hierarchy. The baseline is 0
--     (scripts/security-lints-baseline.json); the five earlier counts are 20261010055801's, unchanged.
-- Grants are unchanged by CREATE OR REPLACE; each function restates REVOKE … FROM PUBLIC. Proofs on scratch rows
-- under a sentinel rollback. Law 11, law 12, law 13, law 14, CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_update_profile(uuid,text,text,character,text)', 'e090d5a3debbf646f9df49911ef10b24'],
    ['public.end_impersonation(uuid)', 'a137b26ca25c398eef75a5f44b53b4dc'],
    ['public.security_lints()', '5b28264e213bb814054a93d17ea118bb']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114090400') THEN
    RAISE EXCEPTION 'F1-2 part 6: part 5 (d66e79e1) must be applied first';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'account_pref')
     OR NOT EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'staff_moderation') THEN
    RAISE EXCEPTION 'F1-2 part 6: the dial account_pref or staff_moderation is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-2 part 6: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_update_profile (whole from 76ce28de :80; global)
CREATE OR REPLACE FUNCTION public.admin_update_profile(p_user_id uuid, p_display_name text, p_seller_alias text DEFAULT NULL::text, p_home_country_code character DEFAULT NULL::bpchar, p_reason text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx   public.door_ctx;
  v_old   record;
  v_name  text;
  v_alias text;
  v_rule  text;
  v_meta  jsonb := '{}'::jsonb;
  v_out_state text;
BEGIN
  v_ctx := public.door_context('staff', 'profiles', 'update', 'staff_moderation', NULL, 'global');

  v_name  := btrim(COALESCE(p_display_name, ''));
  IF v_name = '' THEN
    PERFORM public.door_refuse('nameRequired');
  END IF;
  v_alias := lower(NULLIF(btrim(COALESCE(p_seller_alias, '')), ''));

  IF p_home_country_code IS NOT NULL
     AND NOT EXISTS (SELECT 1 FROM public.countries c
                      WHERE c.code = p_home_country_code AND c.is_active) THEN
    PERFORM public.door_refuse('unknownCountry');
  END IF;

  SELECT display_name, seller_alias, home_country_code
    INTO v_old
    FROM public.profiles
   WHERE user_id = p_user_id;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('unknownUser');
  END IF;

  -- A new or changed name: shape and taken always apply; rules b-e can be
  -- overruled only with a reason of at least ten characters.
  IF v_alias IS NOT NULL AND v_alias IS DISTINCT FROM lower(v_old.seller_alias) THEN
    v_rule := public.alias_rule(v_alias);
    IF v_rule = 'a' THEN
      PERFORM public.door_refuse('aliasShape');
    END IF;
    IF public.alias_taken(v_alias, p_user_id) THEN
      PERFORM public.door_refuse('aliasTaken');
    END IF;
    IF v_rule IS NOT NULL AND char_length(btrim(coalesce(p_reason, ''))) < 10 THEN
      PERFORM public.door_refuse('aliasReserved', v_rule);
    END IF;
  END IF;

  UPDATE public.profiles
     SET display_name      = v_name,
         seller_alias      = v_alias,
         home_country_code = COALESCE(p_home_country_code, home_country_code),
         updated_at        = now()
   WHERE user_id = p_user_id;

  IF lower(v_old.seller_alias) IS DISTINCT FROM v_alias THEN
    -- N1b-2c (INC-977, R1): the outgoing name's check state, read before the row is reset or removed,
    -- is stamped on its release (a held name stays 'imitates'); no row reads as 'unchecked'.
    v_out_state := coalesce((SELECT c.state FROM public.name_checks c
                              WHERE c.profile_id = p_user_id AND c.subject = 'alias'), 'unchecked');
    UPDATE public.alias_history SET released_at = now(), released_state = v_out_state
     WHERE user_id = p_user_id AND released_at IS NULL;
    IF v_alias IS NOT NULL THEN
      INSERT INTO public.alias_history (user_id, alias, alias_fold, home_country_code)
      VALUES (p_user_id, v_alias, public.name_fold(v_alias),
              (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = p_user_id));
      -- N1a (INC-977) — a name staff chose is checked by a person: 'clean', in this same transaction.
      INSERT INTO public.name_checks (profile_id, subject, checked_text, state, since, attempts, last_attempt_at, home_country_code)
      VALUES (p_user_id, 'alias', v_alias, 'clean', now(), 0, now(),
              (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = p_user_id))
      ON CONFLICT (profile_id, subject) DO UPDATE
        SET checked_text = EXCLUDED.checked_text, state = 'clean', since = now(),
            attempts = 0, last_attempt_at = now(), home_country_code = EXCLUDED.home_country_code;
    ELSE
      DELETE FROM public.name_checks WHERE profile_id = p_user_id AND subject = 'alias';
    END IF;
  END IF;

  IF v_old.display_name IS DISTINCT FROM v_name THEN
    v_meta := v_meta || jsonb_build_object('display_name',
      jsonb_build_object('old', v_old.display_name, 'new', v_name));
  END IF;
  IF v_old.seller_alias IS DISTINCT FROM v_alias THEN
    v_meta := v_meta || jsonb_build_object('seller_alias',
      jsonb_build_object('old', v_old.seller_alias, 'new', v_alias));
  END IF;
  IF p_home_country_code IS NOT NULL
     AND v_old.home_country_code IS DISTINCT FROM p_home_country_code THEN
    v_meta := v_meta || jsonb_build_object('home_country_code',
      jsonb_build_object('old', v_old.home_country_code, 'new', p_home_country_code));
  END IF;

  PERFORM public.log_audit('user.profile_edit', 'profiles', p_user_id::text, v_meta);
  IF v_rule IS NOT NULL THEN
    PERFORM public.log_audit('user.alias_assigned', 'profiles', p_user_id::text,
      jsonb_build_object('alias', v_alias, 'rule', v_rule, 'reason', btrim(p_reason)));
  END IF;
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_update_profile', 'staff_moderation', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_update_profile(uuid, text, text, character, text) IS
  'F1-2 on the door shell (DEC-333; INC-1038''s first door): the console''s profile edit behind door_context(staff, profiles:update, staff_moderation, global — DEC-380; the country argument is the row''s new value, not a scope); refuses nameRequired / unknownCountry / unknownUser / aliasShape / aliasTaken / aliasReserved:<rule> (rules b-e without a reason of ten characters); audits user.profile_edit and user.alias_assigned; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_update_profile(uuid, text, text, character, text) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 2. end_impersonation (whole from e30e4335 :101; dial account_pref)
CREATE OR REPLACE FUNCTION public.end_impersonation(p_session uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_ctx public.door_ctx; v_row public.impersonation_sessions%ROWTYPE;
BEGIN
  v_ctx := public.door_context('owner', NULL, NULL, 'account_pref');
  SELECT * INTO v_row FROM public.impersonation_sessions
   WHERE id = p_session AND actor_id = auth.uid() AND ended_at IS NULL;
  IF NOT FOUND THEN PERFORM public.door_refuse('noActiveSession'); END IF;

  UPDATE public.impersonation_sessions
     SET ended_at = now(), ended_reason = 'manual'
   WHERE id = p_session;

  PERFORM public.log_audit('impersonation.end', 'impersonation_sessions', p_session::text,
    jsonb_build_object('actor', v_row.actor_id, 'target', v_row.target_id, 'reason', 'manual'));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('end_impersonation', 'account_pref', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.end_impersonation(uuid) IS
  'F1-2 on the door shell (DEC-333): ends the caller''s own open impersonation session behind door_context(owner, dial account_pref — DEC-380: an exit never spends its entry''s dial); refuses noActiveSession; audits impersonation.end; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.end_impersonation(uuid) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 3. security_lints() (whole from 20261010055801 :19; a sixth count)
-- DEC-132 layer B, option ii: Supabase's lints 0013, 0010 and 0011, the client-writable count, and (DEC-381) the
-- impersonation reach
CREATE OR REPLACE FUNCTION public.security_lints()
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public', 'pg_catalog'
AS $sl$
  SELECT jsonb_build_array(
    jsonb_build_object('name', 'rls_disabled_in_public', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relkind = 'r' AND NOT c.relrowsecurity)),
    jsonb_build_object('name', 'security_definer_view', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
         LEFT JOIN pg_catalog.pg_depend dep ON dep.objid = c.oid AND dep.deptype = 'e'
              AND dep.classid = 'pg_catalog.pg_class'::regclass
        WHERE n.nspname = 'public' AND c.relkind = 'v' AND dep.objid IS NULL
          AND NOT (lower(COALESCE(c.reloptions::text, '{}'))::text[]
                   && ARRAY['security_invoker=1','security_invoker=true','security_invoker=yes','security_invoker=on']))),
    jsonb_build_object('name', 'function_executable_by_anon', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
         LEFT JOIN pg_catalog.pg_depend dep ON dep.objid = p.oid AND dep.deptype = 'e'
              AND dep.classid = 'pg_catalog.pg_proc'::regclass
        WHERE n.nspname = 'public' AND dep.objid IS NULL
          AND pg_catalog.has_function_privilege('anon', p.oid, 'EXECUTE'))),
    jsonb_build_object('name', 'function_search_path_mutable', 'level', 'WARN', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
         LEFT JOIN pg_catalog.pg_depend dep ON dep.objid = p.oid AND dep.deptype = 'e'
              AND dep.classid = 'pg_catalog.pg_proc'::regclass
        WHERE n.nspname = 'public' AND dep.objid IS NULL
          AND NOT EXISTS (SELECT 1 FROM unnest(COALESCE(p.proconfig, '{}')) cfg WHERE cfg LIKE 'search_path=%'))),
    jsonb_build_object('name', 'table_writable_by_client', 'level', 'WARN', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relkind IN ('r','p')
          AND EXISTS (SELECT 1 FROM unnest(ARRAY['anon','authenticated']) r(role),
                                    unnest(ARRAY['INSERT','UPDATE','DELETE','TRUNCATE']) v(priv)
                       WHERE pg_catalog.has_table_privilege(r.role, c.oid, v.priv)
                          OR (v.priv IN ('INSERT','UPDATE')
                              AND pg_catalog.has_any_column_privilege(r.role, c.oid, v.priv))))),
    jsonb_build_object('name', 'impersonation_reach', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM public.roles ro
        WHERE ro.name <> 'super_admin'
          AND EXISTS (SELECT 1 FROM public.role_permissions rp
                        JOIN public.permissions p ON p.id = rp.permission_id
                        JOIN public.resources r ON r.id = p.resource_id
                       WHERE rp.role_id IN (SELECT public.get_role_hierarchy(ro.id))
                         AND r.name = 'impersonation' AND p.action IN ('use', 'manage'))))
  );
$sl$;
REVOKE ALL ON FUNCTION public.security_lints() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.security_lints() TO service_role;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) catalog facts: the two doors VOLATILE SECURITY DEFINER, search_path public, RETURNS jsonb, EXECUTE for
--     authenticated and service_role and not for anon or PUBLIC; the lint STABLE SECURITY DEFINER, the service role's
--     only; the three bodies this file's (md5).
-- (b) admin_update_profile: a deactivated holder → accountDeactivated, a caller without profiles:update →
--     permissionDenied (403); a country holder (XZ) is refused every call — with no country, with another country
--     and with its own — permissionDenied:scope (403), nothing written, no dial spent; a global holder changes a
--     scratch user's country (its row and its audit line); unknownCountry with every earlier check cleared (400).
-- (c) end_impersonation: one begin and two ends (one refused noActiveSession, one success) leave the dial
--     impersonation at 1 and account_pref at 2; the session row and audit line as before.
-- (d) security_lints(): six names and levels in order; impersonation_reach is 0, and 1 with impersonation:use
--     granted to a scratch role.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_xz      character(2) := 'XZ';
  v_xy      character(2) := 'XY';
  v_qm      character(2) := 'QM';
  v_staff   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_cstaff  uuid := gen_random_uuid();
  v_seller  uuid := gen_random_uuid();
  v_super   uuid := gen_random_uuid();
  v_target  uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess_c  uuid := gen_random_uuid();
  v_sess_s  uuid := gen_random_uuid();
  v_role_s  uuid;
  v_role_i  uuid;
  v_id      uuid;
  v_answer  jsonb;
  v_lints   jsonb;
  v_count   integer;
  v_text    text;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f12s-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_update_profile(uuid,text,text,character,text)', '6dd073dee2218e0041bb803a9f093228'],
    ['public.end_impersonation(uuid)', '190adbc522a0b57ee1ef6ec7d9666c00']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_fn := 'public.security_lints()'::regprocedure;
  IF (SELECT NOT prosecdef OR provolatile <> 's' OR prorettype <> 'jsonb'::regtype FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-2 part 6 proof (a): security_lints()''s header or grants differ';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM '1b3036a78c88863f09752ef1592a901c' THEN
    RAISE EXCEPTION 'F1-2 part 6 proof (a): security_lints()''s body differs from this file';
  END IF;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_qm)) THEN
      RAISE EXCEPTION 'F1-2 part 6 proof: a scratch country code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', true), (v_xy, v_tag || ' xy', true);
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff,  v_tag || '-staff@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain,  v_tag || '-plain@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact,  v_tag || '-deact@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_cstaff, v_tag || '-cstaff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_seller, v_tag || '-seller@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_super,  v_tag || '-super@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_target, v_tag || '-target@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role_s;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_s, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'profiles' AND p.action = 'update';
    IF NOT EXISTS (SELECT 1 FROM public.role_permissions WHERE role_id = v_role_s) THEN
      RAISE EXCEPTION 'F1-2 part 6 proof: profiles:update is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_s, 'country', v_xz);
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_super, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    IF NOT public.is_super_admin(v_super) THEN
      RAISE EXCEPTION 'F1-2 part 6 proof: the scratch super admin did not take the role';
    END IF;
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_staff, v_cstaff, v_deact, v_super]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES
      (v_sess, v_staff, now(), now(), 'aal2'), (v_sess_c, v_cstaff, now(), now(), 'aal2'), (v_sess_s, v_super, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess_c, now(), now(), 'totp'),
           (gen_random_uuid(), v_sess_s, now(), now(), 'totp');

    -- (b) admin_update_profile: the gates
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_update_profile(v_seller, v_tag || ' deact', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (b): a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_update_profile(v_seller, v_tag || ' plain', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (b): a caller without profiles:update answered %', v_answer;
    END IF;
    -- the country holder: refused with no country, another country and its own; nothing written, no dial spent
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_update_profile(v_seller, v_tag || ' scoped', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (b): a country holder''s edit without a country answered %', v_answer;
    END IF;
    v_answer := public.admin_update_profile(v_seller, v_tag || ' scoped', NULL, v_xy, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (b): a country holder''s edit into another country answered %', v_answer;
    END IF;
    v_answer := public.admin_update_profile(v_seller, v_tag || ' scoped', NULL, v_xz, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (b): a country holder''s edit into its own country answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits
     WHERE key IN (v_deact::text, v_plain::text, v_cstaff::text) AND action = 'staff_moderation';
    SELECT coalesce(pr.display_name, '-') || '/' || coalesce(pr.home_country_code, '-') INTO v_text FROM public.profiles pr
     WHERE pr.user_id = v_seller AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_seller AND u.email LIKE 'e2e-mig-%');
    IF v_count <> 0 OR v_text IS NULL OR v_text LIKE v_tag || ' %' OR v_text LIKE '%/' || v_xz OR v_text LIKE '%/' || v_xy
       OR EXISTS (SELECT 1 FROM public.audit_log a WHERE a.entity_id = v_seller::text AND a.action = 'user.profile_edit') THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (b): a refused edit wrote a row or spent the dial (% / count %)', v_text, v_count;
    END IF;
    -- the global holder: a country change, then unknownCountry with every earlier check cleared
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_update_profile(v_seller, v_tag || ' global', NULL, v_xz, NULL);
    SELECT pr.display_name || '/' || pr.home_country_code INTO v_text FROM public.profiles pr
     WHERE pr.user_id = v_seller AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_seller AND u.email LIKE 'e2e-mig-%');
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_text IS DISTINCT FROM v_tag || ' global/' || v_xz
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_staff AND a.action = 'user.profile_edit'
                        AND a.entity_id = v_seller::text AND a.meta -> 'home_country_code' ->> 'new' = v_xz) THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (b): a global holder''s country change answered % (%)', v_answer, v_text;
    END IF;
    v_answer := public.admin_update_profile(v_seller, v_tag || ' global', NULL, v_qm, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCountry' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (b): an unknown country answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_moderation';
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (b): the dial staff_moderation counted % of 2 calls', v_count;
    END IF;

    -- (c) end_impersonation spends account_pref
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_s::text)::text, true);
    v_answer := public.begin_impersonation(v_target, 'e2e reason');
    v_id := (v_answer ->> 'session_id')::uuid;
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_id IS NULL THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (c): the begin answered %', v_answer;
    END IF;
    v_answer := public.end_impersonation(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'noActiveSession' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (c): ending another id answered %', v_answer;
    END IF;
    v_answer := public.end_impersonation(v_id);
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE
       OR NOT EXISTS (SELECT 1 FROM public.impersonation_sessions s WHERE s.id = v_id AND s.ended_at IS NOT NULL AND s.ended_reason = 'manual')
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_super AND a.action = 'impersonation.end' AND a.entity_id = v_id::text) THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (c): the end answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_super::text AND action = 'impersonation';
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (c): the dial impersonation counted % of 1 begin', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_super::text AND action = 'account_pref';
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (c): the dial account_pref counted % of 2 ends', v_count;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (d) the lint
    v_lints := public.security_lints();
    IF jsonb_array_length(v_lints) <> 6
       OR (SELECT string_agg((e->>'name') || '/' || (e->>'level'), ',' ORDER BY x.ord)
             FROM jsonb_array_elements(v_lints) WITH ORDINALITY x(e, ord))
          <> 'rls_disabled_in_public/ERROR,security_definer_view/ERROR,function_executable_by_anon/ERROR,function_search_path_mutable/WARN,table_writable_by_client/WARN,impersonation_reach/ERROR' THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (d): lint shape';
    END IF;
    IF (v_lints->5->>'count')::int <> 0 THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (d): impersonation_reach is %, expected 0', v_lints->5->>'count';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-reach', v_tag) RETURNING id INTO v_role_i;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_i, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'impersonation' AND p.action = 'use';
    IF (public.security_lints()->5->>'count')::int <> 1 THEN
      RAISE EXCEPTION 'F1-2 part 6 proof (d): the lint did not count a scratch role holding impersonation:use';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f12p6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f12p6-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114100000') ON CONFLICT DO NOTHING;
