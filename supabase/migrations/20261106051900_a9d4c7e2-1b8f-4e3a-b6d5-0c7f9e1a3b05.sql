-- e2e-areas: auth-caller-gates, door-refusals, auth-signout, settings
-- Foundations 1, turn F1-1, M-F1a part 5 of 6 — THE ACCOUNT'S WRITE DOORS ONTO THE SHELL (DEC-333; plan
-- docs/governance/reports/f1-doors.stop-1.md §5 row F1-1; ruling 1 decisions 2 and 5). The three owner doors of the
-- account are redeclared WHOLE from their last declarations (live md5 checked, G39), their gates replaced by ONE
-- door_context('owner', …, dial) call, their refusal sentences by door_refuse codes, their audit inserts by
-- door_audit, and each takes the shell (EXCEPTION WHEN SQLSTATE 'P0D01' → door_refused: the dial counted on a
-- refusal, INC-844). Where the return type changes the door becomes RETURNS jsonb by DROP + CREATE with its grants
-- restated. Folds: 'not authenticated' / 'not signed in' → notSignedIn; 'account is deactivated' →
-- accountDeactivated; 'rateLimited' stays; 'last sign-in method: …' → lastSignInMethod; 'language not published' →
-- languageNotPublished; 'no profile row' → noProfile. require_recent_password()'s P0009 ('recent sign-in required')
-- is kept: the client's step-up reading owns it. change_home_country keeps its field-level envelope answers
-- (countryTooSoon, unknownCountry — code-shaped already); only its gates and audit move. Proofs on scratch rows
-- under a sentinel rollback. Law 11, law 12, law 14 (every refusal under test clears the checks before it),
-- CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.remove_own_password()', 'a7e45c5620c19dfed53ccad8b14ad73d'],
    ['public.user_set_preferred_language(text)', '300d9fc2a8fb90718bf45d8a9df63f42'],
    ['public.change_home_country(character)', 'b47a7b6c22d2170f30cebbdfd8f6ffdc']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261106120400')
     OR NOT EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'account_pref') THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 5: part 4 (f3b8d2a1) must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. remove_own_password (whole from 20261023100132 :452; void → jsonb)
-- New: door_context('owner', dial password_remove) for the three gates, door_refuse('lastSignInMethod') for the
-- last-method sentence, door_audit for the audit row, the shell, RETURNS jsonb {ok:true}. require_recent_password()
-- and the two writes as before.
DROP FUNCTION public.remove_own_password();
CREATE FUNCTION public.remove_own_password()
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx   public.door_ctx;
  v_proof uuid;
BEGIN
  v_ctx := public.door_context('owner', NULL, NULL, 'password_remove');
  v_proof := public.require_recent_password();

  IF NOT EXISTS (
    SELECT 1 FROM auth.identities
     WHERE user_id = v_ctx.uid AND provider <> 'email'
  ) THEN
    PERFORM public.door_refuse('lastSignInMethod');
  END IF;

  UPDATE auth.users
     SET encrypted_password = NULL, updated_at = now()
   WHERE id = v_ctx.uid;

  DELETE FROM auth.sessions WHERE id = v_proof AND user_id = v_ctx.uid;

  PERFORM public.door_audit(v_ctx, 'account.password_removed', 'auth.users', v_ctx.uid::text,
    NULL, jsonb_build_object('proof', 'password', 'dial', 'password_remove'));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('remove_own_password', 'password_remove', SQLERRM);
END;
$function$;
COMMENT ON FUNCTION public.remove_own_password() IS
  'P1-g truth model (R2) on the door shell (F1-1, DEC-333): removes the CALLER''s password behind door_context(owner, password_remove) and a fresh password proof (require_recent_password, P0009); refuses lastSignInMethod when no non-email identity remains; consumes the proof session; audits account.password_removed; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.remove_own_password() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.remove_own_password() TO authenticated;
GRANT ALL ON FUNCTION public.remove_own_password() TO service_role;

-- ------------------------------------------------------------ 2. user_set_preferred_language (whole from 20261023100132 :338; text → jsonb)
-- New: door_context('owner', dial account_pref) for the two gates, door_refuse codes for the two sentences,
-- door_audit, the shell, RETURNS jsonb {ok:true, language}. The publication check, capture and mutate as before.
DROP FUNCTION public.user_set_preferred_language(text);
CREATE FUNCTION public.user_set_preferred_language(p_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx  public.door_ctx;
  v_prev text;
BEGIN
  v_ctx := public.door_context('owner', NULL, NULL, 'account_pref');
  -- GATE 2 — publication: base or enabled_public only (U4f gate, server-side).
  IF p_code IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.languages l
     WHERE l.code = p_code AND (l.is_base OR l.enabled_public)
  ) THEN
    PERFORM public.door_refuse('languageNotPublished');
  END IF;
  -- CAPTURE (old value) before MUTATE.
  SELECT pr.preferred_language INTO v_prev
    FROM public.profiles pr WHERE pr.user_id = v_ctx.uid;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('noProfile');
  END IF;
  -- MUTATE — own row only.
  UPDATE public.profiles pr
     SET preferred_language = p_code, updated_at = now()
   WHERE pr.user_id = v_ctx.uid;

  PERFORM public.door_audit(v_ctx, 'profile.preferred_language', 'profiles', v_ctx.uid::text,
    to_jsonb(v_prev), to_jsonb(p_code));

  RETURN jsonb_build_object('ok', true, 'language', p_code);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('user_set_preferred_language', 'account_pref', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.user_set_preferred_language(text) IS
  'U4f on the door shell (F1-1, DEC-333): the caller''s own preferred_language behind door_context(owner, account_pref); refuses languageNotPublished / noProfile; audits profile.preferred_language {old, new}; answers {ok:true, language}.';
REVOKE ALL ON FUNCTION public.user_set_preferred_language(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.user_set_preferred_language(text) TO authenticated;
GRANT ALL ON FUNCTION public.user_set_preferred_language(text) TO service_role;

-- ------------------------------------------------------------ 3. change_home_country (whole from 20261004034256 :358)
-- New: door_context('owner', dial identity) replaces the 'not authenticated' RAISE and the rate_gate envelope;
-- door_audit replaces the hand-written audit insert; the shell. The field-level envelope answers and the writes
-- as before.
CREATE OR REPLACE FUNCTION public.change_home_country(p_country character)
 RETURNS jsonb LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx  public.door_ctx;
  v_uid  uuid;
  v_code character(2);
  v_cur  record;
BEGIN
  v_ctx := public.door_context('owner', NULL, NULL, 'identity');
  v_uid := v_ctx.uid;
  v_code := upper(btrim(coalesce(p_country::text, '')));
  IF v_code IS NULL OR v_code = ''
     OR NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = v_code) THEN
    RETURN jsonb_build_object('ok', false, 'field', 'home_country_code', 'reason', 'unknownCountry');
  END IF;
  SELECT d.home_country_code, d.country_source, d.home_country_changed_at INTO v_cur
    FROM public.user_directory d WHERE d.user_id = v_uid;
  IF NOT FOUND OR v_cur.country_source IS DISTINCT FROM 'user_confirmed' THEN
    UPDATE public.user_directory
       SET home_country_code = v_code, country_source = 'user_confirmed'
     WHERE user_id = v_uid;
    UPDATE public.profiles
       SET home_country_code = v_code, country_source = 'user_confirmed', updated_at = now()
     WHERE user_id = v_uid;
    RETURN jsonb_build_object('ok', true);
  END IF;
  IF v_code = v_cur.home_country_code THEN
    RETURN jsonb_build_object('ok', true);
  END IF;
  IF v_cur.home_country_changed_at IS NOT NULL
     AND now() - v_cur.home_country_changed_at < interval '30 days' THEN
    RETURN jsonb_build_object('ok', false, 'field', 'home_country_code', 'reason', 'countryTooSoon',
                              'detail', v_cur.home_country_changed_at + interval '30 days');
  END IF;
  UPDATE public.user_directory
     SET home_country_code = v_code, home_country_changed_at = now()
   WHERE user_id = v_uid;
  UPDATE public.profiles
     SET home_country_code = v_code, updated_at = now()
   WHERE user_id = v_uid;
  PERFORM public.door_audit(v_ctx, 'user.home_country_changed', 'profile', v_uid::text,
    to_jsonb(v_cur.home_country_code), to_jsonb(v_code));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('change_home_country', 'identity', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.change_home_country(character) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.change_home_country(character) FROM anon;
GRANT EXECUTE ON FUNCTION public.change_home_country(character) TO authenticated;
GRANT ALL ON FUNCTION public.change_home_country(character) TO service_role;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) catalog facts: the three headers (VOLATILE, definer, search_path), their grants as restated (authenticated
--     EXECUTE, service_role, never anon or PUBLIC), the new bodies' md5s, the two return types now jsonb.
-- (b) user_set_preferred_language: a published scratch language is set ({ok:true, language}, the profile and an
--     audit row {new}, the dial counted once); an unpublished one is refused languageNotPublished at 400 with
--     the profile unchanged, the dial counted (INC-844) and a door_refusals row; a deactivated caller is refused
--     accountDeactivated at 403 with no count.
-- (c) remove_own_password: without a fresh proof → P0009 (recent sign-in required) propagates unchanged and, being
--     a RAISE, leaves no count; a scratch user with only the email identity → lastSignInMethod at 400, the
--     password kept, the dial counted, a door_refusals row; a scratch user with a password, a non-email identity
--     and a fresh password proof on another session → {ok:true}, the password cleared, the proof session gone, the
--     caller's own session kept, the audit row.
-- (d) change_home_country: a first country confirms ({ok:true}, user_confirmed); a change sets the stamp and
--     audits {old, new}; a second change inside 30 days answers the countryTooSoon envelope (ok:false, field,
--     reason, detail) with the rows unchanged; an unknown code answers unknownCountry; the dial identity counted
--     on every call; a deactivated caller → accountDeactivated at 403.
DO $proof$
DECLARE
  v_tag      text := 'e2e-mig-f1a5-' || substr(gen_random_uuid()::text, 1, 8);
  v_xz       character(2) := 'XZ';
  v_xy       character(2) := 'XY';
  v_qm       character(2) := 'QM';
  v_u1       uuid := gen_random_uuid();
  v_u2       uuid := gen_random_uuid();
  v_deact    uuid := gen_random_uuid();
  v_s1       uuid := gen_random_uuid();
  v_s2       uuid := gen_random_uuid();
  v_lang_on  text := 'q' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 2);
  v_lang_off text := 'q' || substr(replace(gen_random_uuid()::text, '-', ''), 9, 2);
  v_pairs    text[][] := ARRAY[
    ['public.remove_own_password()', 'dba262364769cf5c085c021f7a235206'],
    ['public.user_set_preferred_language(text)', '864c44ac6a9021e8a3f6c1d44401a250'],
    ['public.change_home_country(character)', '0febedd71690d159351e4e5176a5be28']];
  v_fn       regprocedure;
  v_answer   jsonb;
  v_text     text;
  v_count    integer;
  v_msg      text;
  v_state    text;
  i          integer;
BEGIN
  -- (a)
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (a): %''s header or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  IF (SELECT prorettype FROM pg_proc WHERE oid = 'public.remove_own_password()'::regprocedure) <> 'jsonb'::regtype
     OR (SELECT prorettype FROM pg_proc WHERE oid = 'public.user_set_preferred_language(text)'::regprocedure) <> 'jsonb'::regtype THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (a): a return type is not jsonb';
  END IF;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_qm)) THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof: a scratch code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', true), (v_xy, v_tag || ' xy', true);
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_u1,    v_tag || '-u1@example.invalid',    'e2e-mig-hash', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_u2,    v_tag || '-u2@example.invalid',    'e2e-mig-hash', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-deact@example.invalid', NULL,           '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
    VALUES (v_lang_on, v_tag || ' on', v_tag, true, true, 9001), (v_lang_off, v_tag || ' off', v_tag, true, false, 9002);

    -- (b) user_set_preferred_language
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_u1::text, 'role', 'authenticated')::text, true);
    v_answer := public.user_set_preferred_language(v_lang_on);
    SELECT pr.preferred_language INTO v_text FROM public.profiles pr
     WHERE pr.user_id = v_u1 AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_u1 AND u.email LIKE 'e2e-mig-%');
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_u1::text AND action = 'account_pref';
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_answer ->> 'language' IS DISTINCT FROM v_lang_on OR v_text IS DISTINCT FROM v_lang_on
       OR v_count <> 1
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_u1 AND a.action = 'profile.preferred_language'
                        AND a.entity_id = v_u1::text AND a.meta ->> 'new' = v_lang_on) THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (b): the published language was not set with its records (% / % / count %)', v_answer, v_text, v_count;
    END IF;
    v_answer := public.user_set_preferred_language(v_lang_off);
    SELECT pr.preferred_language INTO v_text FROM public.profiles pr
     WHERE pr.user_id = v_u1 AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_u1 AND u.email LIKE 'e2e-mig-%');
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_u1::text AND action = 'account_pref';
    IF v_answer ->> 'ok' IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'languageNotPublished'
       OR current_setting('response.status', true) IS DISTINCT FROM '400'
       OR v_text IS DISTINCT FROM v_lang_on OR v_count <> 2
       OR (SELECT count FROM public.door_refusals WHERE door = 'user_set_preferred_language' AND code = 'languageNotPublished' AND day = current_date) IS DISTINCT FROM 1 THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (b): the unpublished language was not refused with its records (% / % / count %)', v_answer, v_text, v_count;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated')::text, true);
    v_answer := public.user_set_preferred_language(v_lang_on);
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'account_pref';
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' OR v_count <> 0 THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (b): a deactivated caller answered % (count %)', v_answer, v_count;
    END IF;

    -- (c) remove_own_password: u1 holds a non-email identity and a fresh password proof on session s2 (claims name s1)
    INSERT INTO auth.identities (id, provider_id, user_id, identity_data, provider, created_at, updated_at)
    VALUES (gen_random_uuid(), v_tag || '-oauth', v_u1, jsonb_build_object('sub', v_tag || '-oauth'), 'e2e_mig_provider', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_s1, v_u1, now(), now(), 'aal1'), (v_s2, v_u1, now(), now(), 'aal1');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_s2, now(), now(), 'password');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_u2::text, 'role', 'authenticated')::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      v_answer := public.remove_own_password();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_u2::text AND action = 'password_remove';
    IF v_state IS DISTINCT FROM 'P0009' OR v_msg IS DISTINCT FROM 'recent sign-in required' OR v_count <> 0 THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (c): without a fresh proof the door answered % (% / count %)', coalesce(v_msg, v_answer::text), v_state, v_count;
    END IF;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (gen_random_uuid(), v_u2, now(), now(), 'aal1');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    SELECT gen_random_uuid(), s.id, now(), now(), 'password' FROM auth.sessions s WHERE s.user_id = v_u2;
    v_answer := public.remove_own_password();
    SELECT u.encrypted_password INTO v_text FROM auth.users u WHERE u.id = v_u2 AND u.email LIKE 'e2e-mig-%';
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_u2::text AND action = 'password_remove';
    IF v_answer ->> 'message' IS DISTINCT FROM 'lastSignInMethod' OR current_setting('response.status', true) IS DISTINCT FROM '400'
       OR v_text IS DISTINCT FROM 'e2e-mig-hash' OR v_count <> 1
       OR (SELECT count FROM public.door_refusals WHERE door = 'remove_own_password' AND code = 'lastSignInMethod' AND day = current_date) IS DISTINCT FROM 1 THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (c): the last method was not refused with its records (% / count %)', v_answer, v_count;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_u1::text, 'role', 'authenticated', 'session_id', v_s1::text)::text, true);
    v_answer := public.remove_own_password();
    SELECT u.encrypted_password INTO v_text FROM auth.users u WHERE u.id = v_u1 AND u.email LIKE 'e2e-mig-%';
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_text IS NOT NULL
       OR EXISTS (SELECT 1 FROM auth.sessions s WHERE s.id = v_s2)
       OR NOT EXISTS (SELECT 1 FROM auth.sessions s WHERE s.id = v_s1)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_u1 AND a.action = 'account.password_removed'
                        AND a.meta -> 'new' ->> 'dial' = 'password_remove') THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (c): the password was not removed with its records (%)', v_answer;
    END IF;

    -- (d) change_home_country (u1: the directory row the trigger made, country unknown)
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_u1::text, 'role', 'authenticated')::text, true);
    v_answer := public.change_home_country(v_xz);
    SELECT d.country_source || ':' || d.home_country_code INTO v_text FROM public.user_directory d
     WHERE d.user_id = v_u1 AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_u1 AND u.email LIKE 'e2e-mig-%');
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_text IS DISTINCT FROM 'user_confirmed:' || v_xz THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (d): the first country did not confirm (% / %)', v_answer, v_text;
    END IF;
    v_answer := public.change_home_country(v_xy);
    SELECT d.home_country_code INTO v_text FROM public.user_directory d
     WHERE d.user_id = v_u1 AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_u1 AND u.email LIKE 'e2e-mig-%');
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_text IS DISTINCT FROM v_xy
       OR (SELECT d.home_country_changed_at FROM public.user_directory d
             WHERE d.user_id = v_u1 AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_u1 AND u.email LIKE 'e2e-mig-%')) IS NULL
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_u1 AND a.action = 'user.home_country_changed'
                        AND a.meta ->> 'old' = v_xz AND a.meta ->> 'new' = v_xy) THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (d): the change was not stamped and audited (% / %)', v_answer, v_text;
    END IF;
    v_answer := public.change_home_country(v_xz);
    SELECT d.home_country_code INTO v_text FROM public.user_directory d
     WHERE d.user_id = v_u1 AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_u1 AND u.email LIKE 'e2e-mig-%');
    IF v_answer ->> 'ok' IS DISTINCT FROM 'false' OR v_answer ->> 'reason' IS DISTINCT FROM 'countryTooSoon'
       OR v_answer ->> 'field' IS DISTINCT FROM 'home_country_code' OR v_answer ->> 'detail' IS NULL OR v_text IS DISTINCT FROM v_xy THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (d): the early change was not refused countryTooSoon (% / %)', v_answer, v_text;
    END IF;
    v_answer := public.change_home_country(v_qm);
    IF v_answer ->> 'reason' IS DISTINCT FROM 'unknownCountry' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (d): an unknown code answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_u1::text AND action = 'identity';
    IF v_count <> 4 THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (d): the dial identity counted % of 4 calls', v_count;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated')::text, true);
    v_answer := public.change_home_country(v_xz);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 5 proof (d): a deactivated caller answered %', v_answer;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261106120500') ON CONFLICT DO NOTHING;
