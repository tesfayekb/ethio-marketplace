-- e2e-areas: admin-users, mfa-stepup, door-refusals
-- Foundations 1, turn F1-2, part 3 of 5 — THE USER DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-2.md; ruling 1 decisions 2, 4 and 5). admin_set_account_status and
-- admin_update_profile are redeclared WHOLE from their last declarations (live md5 checked), their gates replaced by
-- ONE door_context('staff', profiles:update, …) call that spends the manifest's dial staff_moderation — INC-1038's
-- first door, admin_update_profile, spent none — their refusal sentences by door_refuse codes, and each takes the
-- shell. Both returned void: DROP + CREATE as RETURNS jsonb, grants restated. INC-834: admin_update_profile is scoped
-- by its country argument (match: a country holder sets only its own country, and a call that sets none passes only a
-- global holder); admin_set_account_status is global. Audit stays log_audit with each door's meta. Folds:
-- 'permission denied' → permissionDenied (door_context); 'unknown account status' → badValue:status; 'a reason is
-- required to deactivate' → required:reason; 'user not found' → unknownUser; 'display name is required' →
-- nameRequired; 'unknown country' → unknownCountry; 'seller alias refused: shape' → aliasShape; 'seller alias already
-- taken' → aliasTaken; 'seller alias needs a reason: <rule>' → aliasReserved:<rule> (the posting form's codes for the
-- same rules). Proofs on scratch rows under a sentinel rollback. Law 11, law 12, law 13, law 14, CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_set_account_status(uuid,text,text)', 'fd8c13195dcc80c85d1d7d6a8e5ab7f1'],
    ['public.admin_update_profile(uuid,text,text,character,text)', '0c81e815191566e5c8cd298754d729d7']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114090100')
     OR (SELECT prorettype FROM pg_proc WHERE oid = 'public.admin_create_role(text,text,text)'::regprocedure) <> 'jsonb'::regtype THEN
    RAISE EXCEPTION 'F1-2 part 3: part 2 (49f4b94e) must be applied first';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'staff_moderation') THEN
    RAISE EXCEPTION 'F1-2 part 3: the dial staff_moderation is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-2 part 3: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_set_account_status (whole from 20260817052646 :61; void → jsonb)
DROP FUNCTION public.admin_set_account_status(uuid, text, text);
CREATE FUNCTION public.admin_set_account_status(
  p_user_id uuid, p_status text, p_reason text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  v_ctx public.door_ctx;
BEGIN
  v_ctx := public.door_context('staff', 'profiles', 'update', 'staff_moderation', NULL, 'global');

  IF p_status NOT IN ('active','deactivated') THEN
    PERFORM public.door_refuse('badValue', 'status');
  END IF;
  IF p_status = 'deactivated' AND COALESCE(btrim(p_reason), '') = '' THEN
    PERFORM public.door_refuse('required', 'reason');
  END IF;

  UPDATE public.profiles
     SET account_status = p_status,
         status_reason = CASE WHEN p_status = 'deactivated' THEN btrim(p_reason) ELSE NULL END,
         updated_at = now()
   WHERE user_id = p_user_id;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownUser'); END IF;

  PERFORM public.log_audit('user.status_change', 'profiles', p_user_id::text,
    jsonb_build_object('status', p_status, 'reason', btrim(COALESCE(p_reason, ''))));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_account_status', 'staff_moderation', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_set_account_status(uuid, text, text) IS
  'F1-2 on the door shell (DEC-333): sets an account active or deactivated behind door_context(staff, profiles:update, staff_moderation, global); refuses badValue:status / required:reason / unknownUser; audits user.status_change; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_account_status(uuid, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_account_status(uuid, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_account_status(uuid, text, text) TO service_role;

-- ------------------------------------------------------------ 2. admin_update_profile (whole from 20261029092611 :157; void → jsonb)
DROP FUNCTION public.admin_update_profile(uuid, text, text, character, text);
CREATE FUNCTION public.admin_update_profile(p_user_id uuid, p_display_name text, p_seller_alias text DEFAULT NULL::text, p_home_country_code character DEFAULT NULL::bpchar, p_reason text DEFAULT NULL::text)
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
  v_ctx := public.door_context('staff', 'profiles', 'update', 'staff_moderation', p_home_country_code, 'match');

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
  'F1-2 on the door shell (DEC-333; INC-1038''s first door): the console''s profile edit behind door_context(staff, profiles:update, staff_moderation, the new country in match mode — INC-834); refuses nameRequired / unknownCountry / unknownUser / aliasShape / aliasTaken / aliasReserved:<rule> (rules b-e without a reason of ten characters); audits user.profile_edit and user.alias_assigned; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_update_profile(uuid, text, text, character, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_profile(uuid, text, text, character, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_update_profile(uuid, text, text, character, text) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: both doors VOLATILE SECURITY DEFINER, search_path public, RETURNS jsonb, EXECUTE for
--     authenticated and service_role and not for anon or PUBLIC, the bodies this file's (md5).
-- (b) the gates: a deactivated holder → accountDeactivated (403), a caller without profiles:update →
--     permissionDenied (403), neither spending the dial nor writing; INC-834 — a country holder (XZ) is refused the
--     global status door and a profile edit that sets no country or another country (permissionDenied:scope), and
--     sets its own country.
-- (c) each door's own codes, every earlier check cleared (law 14), the exact message, a 400, nothing written; each
--     success with its row and audit; the dial staff_moderation counted once per call past the gates.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_letters text;
  v_xz      character(2) := 'XZ';
  v_xy      character(2) := 'XY';
  v_qm      character(2) := 'QM';
  v_staff   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_cstaff  uuid := gen_random_uuid();
  v_seller  uuid := gen_random_uuid();
  v_other   uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess_c  uuid := gen_random_uuid();
  v_role_s  uuid;
  v_answer  jsonb;
  v_count   integer;
  v_text    text;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f12u-' || substr(v_hex, 1, 10);
  -- one draw: letters only, for the scratch aliases
  v_letters := translate(substr(v_hex, 11, 10), '0123456789', 'ghijkmnopr');
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_set_account_status(uuid,text,text)', 'a0a03ca83a23ae2640bc5749d5f2e49c'],
    ['public.admin_update_profile(uuid,text,text,character,text)', 'e090d5a3debbf646f9df49911ef10b24']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_qm)) THEN
      RAISE EXCEPTION 'F1-2 part 3 proof: a scratch country code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', true), (v_xy, v_tag || ' xy', true);
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff,  v_tag || '-staff@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain,  v_tag || '-plain@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact,  v_tag || '-deact@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_cstaff, v_tag || '-cstaff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_seller, v_tag || '-seller@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_other,  v_tag || '-other@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role_s;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_s, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'profiles' AND p.action = 'update';
    IF NOT EXISTS (SELECT 1 FROM public.role_permissions WHERE role_id = v_role_s) THEN
      RAISE EXCEPTION 'F1-2 part 3 proof: profiles:update is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_s, 'country', v_xz);
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_staff, v_cstaff, v_deact]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2'), (v_sess_c, v_cstaff, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess_c, now(), now(), 'totp');

    -- (b) the gates
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_set_account_status(v_seller, 'deactivated', 'e2e reason');
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_moderation';
    SELECT pr.account_status INTO v_text FROM public.profiles pr
     WHERE pr.user_id = v_seller AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_seller AND u.email LIKE 'e2e-mig-%');
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403'
       OR v_count <> 0 OR v_text IS DISTINCT FROM 'active' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (b): a deactivated holder answered % (count %, status %)', v_answer, v_count, v_text;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_update_profile(v_seller, v_tag || ' plain', NULL, NULL, NULL);
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_moderation';
    SELECT pr.display_name INTO v_text FROM public.profiles pr
     WHERE pr.user_id = v_seller AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_seller AND u.email LIKE 'e2e-mig-%');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403'
       OR v_count <> 0 OR v_text IS NOT DISTINCT FROM v_tag || ' plain' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (b): a caller without profiles:update answered % (count %)', v_answer, v_count;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_set_account_status(v_seller, 'deactivated', 'e2e reason');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (b): a country holder''s status change answered %', v_answer;
    END IF;
    v_answer := public.admin_update_profile(v_seller, v_tag || ' scoped', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (b): a country holder''s edit without a country answered %', v_answer;
    END IF;
    v_answer := public.admin_update_profile(v_seller, v_tag || ' scoped', NULL, v_xy, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (b): a country holder''s edit into another country answered %', v_answer;
    END IF;
    v_answer := public.admin_update_profile(v_seller, v_tag || ' scoped', NULL, v_xz, NULL);
    SELECT pr.display_name || '/' || pr.home_country_code INTO v_text FROM public.profiles pr
     WHERE pr.user_id = v_seller AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_seller AND u.email LIKE 'e2e-mig-%');
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'staff_moderation';
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_text IS DISTINCT FROM v_tag || ' scoped/' || v_xz OR v_count <> 1 THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (b): a country holder''s own-country edit answered % (% / count %)', v_answer, v_text, v_count;
    END IF;

    -- (c) the staff caller (global, stepped up)
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_set_account_status', 'admin_update_profile');
    -- admin_set_account_status: badValue:status, required:reason (a known status), unknownUser (a valid change)
    v_answer := public.admin_set_account_status(v_seller, 'paused', 'e2e reason');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:status' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): an unknown status answered %', v_answer;
    END IF;
    v_answer := public.admin_set_account_status(v_seller, 'deactivated', '   ');
    IF v_answer ->> 'message' IS DISTINCT FROM 'required:reason' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): a deactivation without a reason answered %', v_answer;
    END IF;
    v_answer := public.admin_set_account_status(gen_random_uuid(), 'deactivated', 'e2e reason');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownUser' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): an unknown user''s status answered %', v_answer;
    END IF;
    v_answer := public.admin_set_account_status(v_seller, 'deactivated', ' e2e reason ');
    SELECT pr.account_status || '/' || pr.status_reason INTO v_text FROM public.profiles pr
     WHERE pr.user_id = v_seller AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_seller AND u.email LIKE 'e2e-mig-%');
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_text IS DISTINCT FROM 'deactivated/e2e reason'
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_staff AND a.action = 'user.status_change'
                        AND a.entity_id = v_seller::text AND a.meta ->> 'status' = 'deactivated') THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): the deactivation answered % (%)', v_answer, v_text;
    END IF;
    v_answer := public.admin_set_account_status(v_seller, 'active', NULL);
    SELECT pr.account_status INTO v_text FROM public.profiles pr
     WHERE pr.user_id = v_seller AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_seller AND u.email LIKE 'e2e-mig-%');
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_text IS DISTINCT FROM 'active' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): the reactivation answered % (%)', v_answer, v_text;
    END IF;
    -- admin_update_profile: nameRequired, unknownCountry (a name), unknownUser (a name, no country), then the
    -- alias rules on the seller — aliasShape, aliasTaken (well-shaped), aliasReserved:b (well-shaped, free)
    v_answer := public.admin_update_profile(v_seller, '  ', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'nameRequired' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): a blank display name answered %', v_answer;
    END IF;
    v_answer := public.admin_update_profile(v_seller, v_tag, NULL, v_qm, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCountry' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): an unknown country answered %', v_answer;
    END IF;
    v_answer := public.admin_update_profile(gen_random_uuid(), v_tag, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownUser' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): an unknown user''s edit answered %', v_answer;
    END IF;
    v_answer := public.admin_update_profile(v_other, v_tag || ' other', 'qz' || v_letters, NULL, NULL);
    SELECT pr.seller_alias INTO v_text FROM public.profiles pr
     WHERE pr.user_id = v_other AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_other AND u.email LIKE 'e2e-mig-%');
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_text IS DISTINCT FROM 'qz' || v_letters
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_staff AND a.action = 'user.profile_edit'
                        AND a.entity_id = v_other::text AND a.meta -> 'seller_alias' ->> 'new' = 'qz' || v_letters) THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): a clean alias answered % (%)', v_answer, v_text;
    END IF;
    v_answer := public.admin_update_profile(v_seller, v_tag, 'q!', NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'aliasShape' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): a misshapen alias answered %', v_answer;
    END IF;
    v_answer := public.admin_update_profile(v_seller, v_tag, 'QZ' || upper(v_letters), NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'aliasTaken' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): a taken alias answered %', v_answer;
    END IF;
    v_answer := public.admin_update_profile(v_seller, v_tag, 'ethio' || v_letters, NULL, 'short');
    SELECT coalesce(pr.seller_alias, '-') INTO v_text FROM public.profiles pr
     WHERE pr.user_id = v_seller AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_seller AND u.email LIKE 'e2e-mig-%');
    IF v_answer ->> 'message' IS DISTINCT FROM 'aliasReserved:b' OR v_text IS DISTINCT FROM '-' THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): a reserved alias without a reason answered % (%)', v_answer, v_text;
    END IF;
    v_answer := public.admin_update_profile(v_seller, v_tag, 'ethio' || v_letters, NULL, 'e2e reason of ten');
    SELECT pr.seller_alias INTO v_text FROM public.profiles pr
     WHERE pr.user_id = v_seller AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_seller AND u.email LIKE 'e2e-mig-%');
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_text IS DISTINCT FROM 'ethio' || v_letters
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_staff AND a.action = 'user.alias_assigned'
                        AND a.entity_id = v_seller::text AND a.meta ->> 'rule' = 'b') THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): a reserved alias with its reason answered % (%)', v_answer, v_text;
    END IF;
    -- the dial: 4 successes and 9 refusals past the gates, each counted once; 9 refusals metered
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_moderation';
    IF v_count <> 13 THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): the dial staff_moderation counted % of 13 calls', v_count;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_set_account_status', 'admin_update_profile')) IS DISTINCT FROM v_refused + 9 THEN
      RAISE EXCEPTION 'F1-2 part 3 proof (c): door_refusals did not meter the 9 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f12p3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f12p3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114090200') ON CONFLICT DO NOTHING;
