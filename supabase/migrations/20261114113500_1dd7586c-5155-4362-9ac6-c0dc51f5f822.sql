-- e2e-areas: admin-translations
-- Foundations 1, turn F1-3, part 1 of 12 — LANGUAGE_CODE AND THE INTERFACE-TEXT WRITERS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-3.md; ruling 1). public.language_code(role) is
-- new: the one place SQL writes a language code (K4) — base, pair, pseudo — and an unknown role raises (ruling 1 item
-- 4(c)). admin_save_translation, admin_machine_translation and their cores are redeclared WHOLE from their last
-- declarations (live md5 checked). Each door's gate becomes ONE door_context('staff', translations:update or :machine,
-- the manifest's dial, global) and the shell; the cores' refusal sentences become door_refuse codes (permissionDenied,
-- permissionDenied:language — a translator outside the languages assigned to them —, baseLocked, unknownKey). The
-- doors returned void: DROP + CREATE as RETURNS jsonb {ok:true}, grants restated; the cores keep their shape (CREATE OR
-- REPLACE) and stay closed to browser roles. Audit stays each writer's own log_audit. Proofs on scratch rows under a
-- sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_save_translation_core(text,text,text)', '05ae84291234466d01b27dde965b71af'],
    ['public.admin_machine_translation_core(text,text,text)', '4baa491f62e3f5d4599e278292c82556'],
    ['public.admin_save_translation(text,text,text)', 'dfe3fb22da9e7965df47af8754a78163'],
    ['public.admin_machine_translation(text,text,text)', '078c76480929687fa8369518c556f990']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114100000') THEN
    RAISE EXCEPTION 'F1-3 part 1: F1-2 part 5 (21a900de) must be applied first';
  END IF;
  IF to_regprocedure('public.language_code(text)') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-3 part 1: language_code already exists';
  END IF;
  IF (SELECT count(*) FROM public.rate_dials WHERE action IN ('staff_translation', 'staff_machine_translation')) <> 2 THEN
    RAISE EXCEPTION 'F1-3 part 1: a dial of these doors is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 1: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. language_code (new; the one SQL constants function of K4)
CREATE FUNCTION public.language_code(p_role text)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
 SECURITY INVOKER
 SET search_path = public
AS $$
BEGIN
  IF p_role IS NULL OR p_role NOT IN ('base', 'pair', 'pseudo') THEN
    RAISE EXCEPTION 'language_code: unknown role %', coalesce(p_role, 'NULL');
  END IF;
  RETURN CASE p_role WHEN 'base' THEN 'en' WHEN 'pair' THEN 'am' ELSE 'zxa' END;
END $$;
COMMENT ON FUNCTION public.language_code(text) IS
  'F1-3 (K4): the one place SQL writes a language code — base, pair, pseudo; an unknown role raises. Bodies name a role, never a code.';
REVOKE ALL ON FUNCTION public.language_code(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.language_code(text) TO service_role;

-- ------------------------------------------------------------ 2. admin_save_translation_core (whole from 20261028233839 :440; the refusals as codes, the base literal as a role)
CREATE OR REPLACE FUNCTION public.admin_save_translation_core(p_key text, p_lang text, p_value text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_base    text;
  v_src     text;
  v_want    text[];
  v_got     text[];
  v_flag    boolean := false;
  v_note    text := NULL;
  v_prev    public.ui_translations%ROWTYPE;
  v_had     boolean := false;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'update') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'update');
  IF NOT public.translation_scope_ok(p_lang) THEN
    PERFORM public.door_refuse('permissionDenied', 'language');
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    PERFORM public.door_refuse('baseLocked');
  END IF;

  SELECT t.value INTO v_src
    FROM public.ui_translations t WHERE t.key = p_key AND t.lang_code = v_base;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('unknownKey');
  END IF;

  v_want := public.translation_placeholders(v_src);
  v_got  := public.translation_placeholders(p_value);
  IF v_want IS DISTINCT FROM v_got THEN
    v_flag := true;
    v_note := 'placeholder mismatch: expected {' ||
              array_to_string(v_want, '}, {') || '}';
  END IF;

  SELECT * INTO v_prev FROM public.ui_translations
   WHERE key = p_key AND lang_code = p_lang;
  v_had := FOUND;

  -- U4c revision capture: a prior VALUE, or a status that this write changes.
  IF v_had AND (v_prev.value IS NOT NULL OR v_prev.status IS DISTINCT FROM 'edited') THEN
    INSERT INTO public.ui_translation_revisions
      (key, lang_code, prev_value, prev_status, prev_machine, action, changed_by)
    VALUES (p_key, p_lang, v_prev.value, v_prev.status,
            COALESCE(v_prev.machine, false), 'save', auth.uid());
  END IF;

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      flagged, flag_note, updated_by, updated_at)
  VALUES (p_key, p_lang, p_value, 'edited', false, v_flag, v_note, auth.uid(), now())
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'edited', machine = false,
        flagged = EXCLUDED.flagged, flag_note = EXCLUDED.flag_note,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('translation.save', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', p_lang, 'action', 'save',
                       'machine', false, 'flagged', v_flag,
                       'old_value', left(COALESCE(v_prev.value, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_translation_core(text, text, text) FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------ 3. admin_machine_translation_core (whole from 20261028233839 :606; the refusals as codes, the base literal as a role)
CREATE OR REPLACE FUNCTION public.admin_machine_translation_core(p_key text, p_lang text, p_value text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_base text; v_src text; v_want text[]; v_got text[];
  v_flag boolean := false; v_note text := NULL;
  v_prev public.ui_translations%ROWTYPE;
  v_had  boolean := false;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'machine') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'machine');
  IF NOT public.translation_scope_ok(p_lang) THEN
    PERFORM public.door_refuse('permissionDenied', 'language');
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    PERFORM public.door_refuse('baseLocked');
  END IF;

  SELECT t.value INTO v_src
    FROM public.ui_translations t WHERE t.key = p_key AND t.lang_code = v_base;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownKey'); END IF;

  v_want := public.translation_placeholders(v_src);
  v_got  := public.translation_placeholders(p_value);
  IF v_want IS DISTINCT FROM v_got THEN
    v_flag := true;
    v_note := 'placeholder mismatch: expected {' || array_to_string(v_want, '}, {') || '}';
  END IF;

  SELECT * INTO v_prev FROM public.ui_translations
   WHERE key = p_key AND lang_code = p_lang;
  v_had := FOUND;

  IF v_had AND (v_prev.value IS NOT NULL OR v_prev.status IS DISTINCT FROM 'machine') THEN
    INSERT INTO public.ui_translation_revisions
      (key, lang_code, prev_value, prev_status, prev_machine, action, changed_by)
    VALUES (p_key, p_lang, v_prev.value, v_prev.status,
            COALESCE(v_prev.machine, false), 'machine', auth.uid());
  END IF;

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      flagged, flag_note, updated_by, updated_at)
  VALUES (p_key, p_lang, p_value, 'machine', true, v_flag, v_note, auth.uid(), now())
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'machine', machine = true,
        flagged = EXCLUDED.flagged, flag_note = EXCLUDED.flag_note,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('translation.machine', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', p_lang, 'action', 'machine',
                       'machine', true, 'flagged', v_flag,
                       'old_value', left(COALESCE(v_prev.value, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_machine_translation_core(text, text, text) FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------ 4. admin_save_translation (whole from 20261028233839 :511; void → jsonb, the gate on door_context and the shell)
DROP FUNCTION public.admin_save_translation(text, text, text);
CREATE FUNCTION public.admin_save_translation(p_key text, p_lang text, p_value text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'translations', 'update', 'staff_translation', NULL, 'global');
  PERFORM public.admin_save_translation_core(p_key, p_lang, p_value);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_save_translation', 'staff_translation', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_save_translation(text, text, text) IS
  'F1-3 on the door shell (DEC-333): saves one interface text behind door_context(staff, translations:update, staff_translation, global); the core refuses permissionDenied[:language] / baseLocked / unknownKey; audits translation.save; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_save_translation(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_translation(text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_save_translation(text, text, text) TO service_role;

-- ------------------------------------------------------------ 5. admin_machine_translation (whole from 20261028233839 :669; void → jsonb, the gate on door_context and the shell)
DROP FUNCTION public.admin_machine_translation(text, text, text);
CREATE FUNCTION public.admin_machine_translation(p_key text, p_lang text, p_value text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'translations', 'machine', 'staff_machine_translation', NULL, 'global');
  PERFORM public.admin_machine_translation_core(p_key, p_lang, p_value);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_machine_translation', 'staff_machine_translation', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_machine_translation(text, text, text) IS
  'F1-3 on the door shell (DEC-333): stores one machine translation of an interface text behind door_context(staff, translations:machine, staff_machine_translation, global); the core refuses permissionDenied[:language] / baseLocked / unknownKey; audits translation.machine; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_machine_translation(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_machine_translation(text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_machine_translation(text, text, text) TO service_role;

-- ------------------------------------------------------------ 6. PROOFS
-- (a) catalog facts: language_code IMMUTABLE SECURITY INVOKER, closed to browser roles, its three answers and its
--     refusal of an unknown role; both doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and
--     service_role and not for anon or PUBLIC; both cores SECURITY INVOKER and closed to browser roles; every body this
--     file's (md5).
-- (b) the gates: a deactivated holder → accountDeactivated, a caller without translations:update or :machine →
--     permissionDenied, a translator outside the languages assigned to them → permissionDenied:language (403), none
--     spending a dial or writing; the same translator, once assigned the language, saves.
-- (c) each door's own codes, every earlier check cleared (law 14), the exact message, a 400, nothing written; each
--     success with its row and audit line; staff_translation and staff_machine_translation counted once per call past
--     the gates; every refusal metered in door_refusals.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_letters text;
  v_lang    text;
  v_lang2   text;
  v_nolang  text;
  v_key     text;
  v_key2    text;
  v_keyf    text;
  v_staff   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_tr      uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess_t  uuid := gen_random_uuid();
  v_role_s  uuid;
  v_role_t  uuid;
  v_cat     uuid;
  v_cat2    uuid;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f13p1-' || substr(v_hex, 1, 10);
  -- one draw: letters only, for the scratch language codes
  v_letters := translate(substr(v_hex, 11, 10), '0123456789', 'ghijkmnopr');
  v_lang := 'q' || substr(v_letters, 1, 7);
  v_lang2 := 'r' || substr(v_letters, 1, 7);
  v_nolang := 's' || substr(v_letters, 1, 7);
  v_key := v_tag || '.key';
  v_key2 := v_tag || '.key2';
  v_keyf := v_tag || '.flagged';
  -- (a)
  -- K4 exception: the proof reads back the constants function's own three answers.
  IF public.language_code('base') IS DISTINCT FROM 'en' OR public.language_code('pair') IS DISTINCT FROM 'am'
     OR public.language_code('pseudo') IS DISTINCT FROM 'zxa' THEN
    RAISE EXCEPTION 'F1-3 part 1 proof (a): language_code answers differ';
  END IF;
  v_msg := NULL;
  BEGIN
    PERFORM public.language_code(v_tag);
  EXCEPTION WHEN raise_exception THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
  END;
  IF v_msg IS DISTINCT FROM 'language_code: unknown role ' || v_tag THEN
    RAISE EXCEPTION 'F1-3 part 1 proof (a): language_code accepted an unknown role (%)', coalesce(v_msg, 'no refusal');
  END IF;
  v_fn := 'public.language_code(text)'::regprocedure;
  IF (SELECT prosecdef OR provolatile <> 'i' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'text'::regtype
        FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
     OR (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM 'b269b6aa796a72a820099e3a26898cdd' THEN
    RAISE EXCEPTION 'F1-3 part 1 proof (a): language_code''s header, grants or body differ';
  END IF;
  v_pairs := ARRAY[
    ['public.admin_save_translation(text,text,text)', '6abd99593724d674b35cfb4abcbb24e4'],
    ['public.admin_machine_translation(text,text,text)', 'f4d4637aac17e1c5bac162fe8723c077']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 1 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 1 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.admin_save_translation_core(text,text,text)', 'aedffc40aed2e0f07ffae8b4c65a13a6'],
    ['public.admin_machine_translation_core(text,text,text)', '81e2d89b7b89c8746aa1d22a04bb53e7']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'void'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 1 proof (a): the core %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 1 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.languages WHERE code IN (v_lang, v_lang2, v_nolang)) THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: a scratch language code already exists';
    END IF;
    INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
    VALUES (v_lang, v_tag, v_tag, true, false, 9001);
    INSERT INTO public.ui_translations (key, lang_code, value, status)
    VALUES (v_key, public.language_code('base'), 'Hello {name}', 'approved'),
           (v_key2, public.language_code('base'), 'Bye {name}', 'approved'),
           (v_keyf, public.language_code('base'), 'Flag', 'approved');
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag, v_tag) RETURNING id INTO v_cat;
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' two', v_tag || '-two') RETURNING id INTO v_cat2;
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, v_tag || '-staff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-deact@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_tr, v_tag || '-tr@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_staff, v_tr]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2'), (v_sess_t, v_tr, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess_t, now(), now(), 'totp');
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role_s;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_s, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action IN ('view', 'update', 'machine', 'approve', 'manage');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_s) <> 5 THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: a translations permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-translator', v_tag) RETURNING id INTO v_role_t;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_t, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action IN ('view', 'update', 'machine');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_t) <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: a translations permission of the translator role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global'), (v_tr, v_role_t, 'global');

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_save_translation', 'admin_machine_translation');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_save_translation(v_key, v_lang, 'Hallo {name}');
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_save_translation(v_key, v_lang, 'Hallo {name}');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (b) a caller without translations:update answered %', v_answer;
    END IF;
    v_answer := public.admin_machine_translation(v_key, v_lang, 'Hallo {name}');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (b) a caller without translations:machine answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_tr::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_t::text)::text, true);
    v_answer := public.admin_save_translation(v_key, v_lang, 'Hallo {name}');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:language' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (b) a translator outside their languages (save) answered %', v_answer;
    END IF;
    v_answer := public.admin_machine_translation(v_key, v_lang, 'Hallo {name}');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:language' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (b) a translator outside their languages (machine) answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_translation';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: the dial staff_translation counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_machine_translation';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: the dial staff_machine_translation counted % for (b) a caller without permission (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_tr::text AND action = 'staff_translation';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: the dial staff_translation counted % for (b) a translator outside their languages (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_tr::text AND action = 'staff_machine_translation';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: the dial staff_machine_translation counted % for (b) a translator outside their languages (expected %)', v_count, 0;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.ui_translations WHERE lang_code = v_lang)) THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (b) a refused call wrote a translation';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_save_translation', 'admin_machine_translation')) IS DISTINCT FROM v_refused + 5 THEN
      RAISE EXCEPTION 'F1-3 part 1 (b) proof: door_refusals did not meter the 5 refusals';
    END IF;
    INSERT INTO public.translator_languages (user_id, lang_code) VALUES (v_tr, v_lang);
    v_answer := public.admin_save_translation(v_key, v_lang, 'Hallo {name}');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (b) an assigned translator did not save';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.ui_translations WHERE key = v_key AND lang_code = v_lang AND value = 'Hallo {name}' AND status = 'edited' AND NOT flagged AND updated_by = v_tr)) THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (b) the assigned translator''s row differs';
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_tr::text AND action = 'staff_translation';
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: the dial staff_translation counted % for (b) the assigned translator (expected %)', v_count, 1;
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_save_translation', 'admin_machine_translation');
    v_answer := public.admin_save_translation(v_key, public.language_code('base'), 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'baseLocked' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (c) save into the base language answered %', v_answer;
    END IF;
    v_answer := public.admin_save_translation(v_tag || '.none', v_lang, 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownKey' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (c) save of an unknown key answered %', v_answer;
    END IF;
    v_answer := public.admin_save_translation(v_key2, v_lang, 'Tschuess');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (c) save did not answer ok';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.ui_translations WHERE key = v_key2 AND lang_code = v_lang AND value = 'Tschuess' AND status = 'edited' AND flagged AND updated_by = v_staff)) THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (c) the saved row differs (a placeholder mismatch flags it)';
    END IF;
    v_answer := public.admin_machine_translation(v_key, public.language_code('base'), 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'baseLocked' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (c) machine into the base language answered %', v_answer;
    END IF;
    v_answer := public.admin_machine_translation(v_tag || '.none', v_lang, 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownKey' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (c) machine of an unknown key answered %', v_answer;
    END IF;
    v_answer := public.admin_machine_translation(v_keyf, v_lang, 'Flagge');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (c) machine did not answer ok';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.ui_translations WHERE key = v_keyf AND lang_code = v_lang AND value = 'Flagge' AND status = 'machine' AND machine)) THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (c) the machine row differs';
    END IF;
    IF NOT ((SELECT count(*) FROM public.ui_translations WHERE lang_code = v_lang) = 3) THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: (c) a refused call wrote a row';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('translation.save', 'translation.machine')) <> 2 THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('translation.save', 'translation.machine'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_translation';
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: the dial staff_translation counted % for (c) the staff writer (expected %)', v_count, 3;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_machine_translation';
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 1 proof: the dial staff_machine_translation counted % for (c) the staff writer (expected %)', v_count, 3;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_save_translation', 'admin_machine_translation')) IS DISTINCT FROM v_refused + 4 THEN
      RAISE EXCEPTION 'F1-3 part 1 (c) proof: door_refusals did not meter the 4 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f13p1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f13p1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114130000') ON CONFLICT DO NOTHING;
