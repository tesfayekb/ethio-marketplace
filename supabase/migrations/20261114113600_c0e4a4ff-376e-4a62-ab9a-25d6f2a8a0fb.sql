-- e2e-areas: admin-translations
-- Foundations 1, turn F1-3, part 2 of 12 — THE CATALOGUE-NAME WRITERS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-3.md; ruling 1). admin_save_entity_translation,
-- admin_machine_entity_translation and their cores are redeclared WHOLE from their last declarations (live md5
-- checked). Each door's gate becomes ONE door_context('staff', translations:update or :machine, the manifest's dial,
-- global) and the shell; the cores' refusal sentences become door_refuse codes (permissionDenied,
-- permissionDenied:language, badValue:field, baseLocked, unknownEntity, required:value) and their language literals
-- language_code calls. The doors returned void: DROP + CREATE as RETURNS jsonb {ok:true}, grants restated; the cores
-- keep their shape and stay closed to browser roles. Proofs on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_save_entity_translation_core(text,uuid,text,text,text)', '66c953cd0ef9f4c53d194a525342bc4c'],
    ['public.admin_machine_entity_translation_core(text,uuid,text,text,text)', '99dd2893c7d979f9a0703dcf6272a8ee'],
    ['public.admin_save_entity_translation(text,uuid,text,text,text)', '7fed0cc8b27463facfb0c4ba412dc9fa'],
    ['public.admin_machine_entity_translation(text,uuid,text,text,text)', '8202e632832fcfba35e6b22053c65328']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114130000') THEN
    RAISE EXCEPTION 'F1-3 part 2: part 1 (1dd7586c) must be applied first';
  END IF;
  IF to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-3 part 2: part 1''s language_code is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 2: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_save_entity_translation_core (whole from 20261028233839 :530; the refusals as codes, the language literals as roles)
CREATE OR REPLACE FUNCTION public.admin_save_entity_translation_core(p_type text, p_id uuid, p_field text, p_lang text, p_value text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_base text;
  v_src  text;
  v_prev text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'update') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'update');
  IF NOT public.translation_scope_ok(p_lang) THEN
    PERFORM public.door_refuse('permissionDenied', 'language');
  END IF;

  IF NOT ((p_type IN ('category', 'location') AND p_field = 'name')
          OR (p_type = 'attribute' AND p_field = 'label')
          OR (p_type = 'attribute' AND p_field LIKE 'option:%' AND p_lang IS DISTINCT FROM public.language_code('pair'))) THEN
    PERFORM public.door_refuse('badValue', 'field');
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    PERFORM public.door_refuse('baseLocked');
  END IF;

  v_src := public.entity_source_value(p_type, p_id, p_field);
  IF v_src IS NULL THEN
    PERFORM public.door_refuse('unknownEntity');
  END IF;

  SELECT t.value INTO v_prev FROM public.entity_translations t
   WHERE t.entity_type = p_type AND t.entity_id = p_id
     AND t.field = p_field AND t.lang_code = p_lang;

  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine,
     flagged, flag_note, updated_by, updated_at)
  VALUES (p_type, p_id, p_field, p_lang, p_value, 'edited', false,
          false, NULL, auth.uid(), now())
  ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'edited', machine = false,
        flagged = false, flag_note = NULL,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('entity_translation.save', 'entity_translations', p_id::text,
    jsonb_build_object('type', p_type, 'id', p_id, 'field', p_field, 'lang', p_lang,
                       'action', 'save', 'machine', false,
                       'old_value', left(COALESCE(v_prev, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_entity_translation_core(text, uuid, text, text, text) FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------ 2. admin_machine_entity_translation_core (whole from 20261028233839 :688; the refusals as codes, the language literals as roles)
CREATE OR REPLACE FUNCTION public.admin_machine_entity_translation_core(p_type text, p_id uuid, p_field text, p_lang text, p_value text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_base text;
  v_src  text;
  v_prev text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'machine') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'machine');
  IF NOT public.translation_scope_ok(p_lang) THEN
    PERFORM public.door_refuse('permissionDenied', 'language');
  END IF;

  IF NOT ((p_type IN ('category', 'location') AND p_field = 'name')
          OR (p_type = 'attribute' AND p_field = 'label')
          OR (p_type = 'attribute' AND p_field LIKE 'option:%' AND p_lang IS DISTINCT FROM public.language_code('pair'))) THEN
    PERFORM public.door_refuse('badValue', 'field');
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    PERFORM public.door_refuse('baseLocked');
  END IF;

  v_src := public.entity_source_value(p_type, p_id, p_field);
  IF v_src IS NULL THEN
    PERFORM public.door_refuse('unknownEntity');
  END IF;

  IF btrim(COALESCE(p_value, '')) = '' THEN
    PERFORM public.door_refuse('required', 'value');
  END IF;

  SELECT t.value INTO v_prev FROM public.entity_translations t
   WHERE t.entity_type = p_type AND t.entity_id = p_id
     AND t.field = p_field AND t.lang_code = p_lang;

  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine,
     flagged, flag_note, updated_by, updated_at)
  VALUES (p_type, p_id, p_field, p_lang, p_value, 'machine', true,
          false, NULL, auth.uid(), now())
  ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'machine', machine = true,
        flagged = false, flag_note = NULL,
        approved_by = NULL, approved_at = NULL,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('entity_translation.machine', 'entity_translations', p_id::text,
    jsonb_build_object('type', p_type, 'id', p_id, 'field', p_field, 'lang', p_lang,
                       'action', 'machine', 'machine', true,
                       'old_value', left(COALESCE(v_prev, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_machine_entity_translation_core(text, uuid, text, text, text) FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------ 3. admin_save_entity_translation (whole from 20261028233839 :587; void → jsonb, the gate on door_context and the shell)
DROP FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text);
CREATE FUNCTION public.admin_save_entity_translation(p_type text, p_id uuid, p_field text, p_lang text, p_value text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'translations', 'update', 'staff_translation', NULL, 'global');
  PERFORM public.admin_save_entity_translation_core(p_type, p_id, p_field, p_lang, p_value);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_save_entity_translation', 'staff_translation', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) IS
  'F1-3 on the door shell (DEC-333): saves one catalogue name translation behind door_context(staff, translations:update, staff_translation, global); the core refuses permissionDenied[:language] / badValue:field / baseLocked / unknownEntity; audits entity_translation.save; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) TO service_role;

-- ------------------------------------------------------------ 4. admin_machine_entity_translation (whole from 20261028233839 :750; void → jsonb, the gate on door_context and the shell)
DROP FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text);
CREATE FUNCTION public.admin_machine_entity_translation(p_type text, p_id uuid, p_field text, p_lang text, p_value text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'translations', 'machine', 'staff_machine_translation', NULL, 'global');
  PERFORM public.admin_machine_entity_translation_core(p_type, p_id, p_field, p_lang, p_value);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_machine_entity_translation', 'staff_machine_translation', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) IS
  'F1-3 on the door shell (DEC-333): stores one machine translation of a catalogue name behind door_context(staff, translations:machine, staff_machine_translation, global); the core refuses permissionDenied[:language] / badValue:field / baseLocked / unknownEntity / required:value; audits entity_translation.machine; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) TO service_role;

-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: both doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and service_role
--     and not for anon or PUBLIC; both cores SECURITY INVOKER and closed to browser roles; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without translations:update or :machine,
--     permissionDenied:language for a translator outside the languages assigned to them (403), none spending a dial or
--     writing; the same translator, once assigned the language, saves.
-- (c) each door's own codes, every earlier check cleared, the exact message, a 400, nothing written; an option name
--     in the pair language (its label lives in the option record) is refused as an unknown field; each success with its row and audit line; both dials
--     counted once per call past the gates; every refusal metered.
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
  v_tag := 'e2e-mig-f13p2-' || substr(v_hex, 1, 10);
  -- one draw: letters only, for the scratch language codes
  v_letters := translate(substr(v_hex, 11, 10), '0123456789', 'ghijkmnopr');
  v_lang := 'q' || substr(v_letters, 1, 7);
  v_lang2 := 'r' || substr(v_letters, 1, 7);
  v_nolang := 's' || substr(v_letters, 1, 7);
  v_key := v_tag || '.key';
  v_key2 := v_tag || '.key2';
  v_keyf := v_tag || '.flagged';
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_save_entity_translation(text,uuid,text,text,text)', '35979e378d3440271844b3a2b2267726'],
    ['public.admin_machine_entity_translation(text,uuid,text,text,text)', 'eabe7f068cf5710ebb1cfb62ebe05050']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 2 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 2 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.admin_save_entity_translation_core(text,uuid,text,text,text)', '2a931fe0328dc630c657d52ab3b99d5e'],
    ['public.admin_machine_entity_translation_core(text,uuid,text,text,text)', '2fa9342262182b06b4747da06bb76bc5']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'void'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 2 proof (a): the core %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 2 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.languages WHERE code IN (v_lang, v_lang2, v_nolang)) THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: a scratch language code already exists';
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
      RAISE EXCEPTION 'F1-3 part 2 proof: a translations permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-translator', v_tag) RETURNING id INTO v_role_t;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_t, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action IN ('view', 'update', 'machine');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_t) <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: a translations permission of the translator role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global'), (v_tr, v_role_t, 'global');

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_save_entity_translation', 'admin_machine_entity_translation');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_save_entity_translation('category', v_cat, 'name', v_lang, 'Kat');
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_save_entity_translation('category', v_cat, 'name', v_lang, 'Kat');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (b) a caller without translations:update answered %', v_answer;
    END IF;
    v_answer := public.admin_machine_entity_translation('category', v_cat, 'name', v_lang, 'Kat');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (b) a caller without translations:machine answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_tr::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_t::text)::text, true);
    v_answer := public.admin_save_entity_translation('category', v_cat, 'name', v_lang, 'Kat');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:language' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (b) a translator outside their languages (save) answered %', v_answer;
    END IF;
    v_answer := public.admin_machine_entity_translation('category', v_cat, 'name', v_lang, 'Kat');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:language' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (b) a translator outside their languages (machine) answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_translation';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: the dial staff_translation counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_machine_translation';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: the dial staff_machine_translation counted % for (b) a caller without permission (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_tr::text AND action = 'staff_translation';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: the dial staff_translation counted % for (b) a translator outside their languages (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_tr::text AND action = 'staff_machine_translation';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: the dial staff_machine_translation counted % for (b) a translator outside their languages (expected %)', v_count, 0;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.entity_translations WHERE lang_code = v_lang)) THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (b) a refused call wrote a translation';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_save_entity_translation', 'admin_machine_entity_translation')) IS DISTINCT FROM v_refused + 5 THEN
      RAISE EXCEPTION 'F1-3 part 2 (b) proof: door_refusals did not meter the 5 refusals';
    END IF;
    INSERT INTO public.translator_languages (user_id, lang_code) VALUES (v_tr, v_lang);
    v_answer := public.admin_save_entity_translation('category', v_cat, 'name', v_lang, 'Kat');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (b) an assigned translator did not save';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.entity_translations WHERE entity_type = 'category' AND entity_id = v_cat AND field = 'name' AND lang_code = v_lang AND value = 'Kat' AND updated_by = v_tr)) THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (b) the assigned translator''s row differs';
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_tr::text AND action = 'staff_translation';
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: the dial staff_translation counted % for (b) the assigned translator (expected %)', v_count, 1;
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_save_entity_translation', 'admin_machine_entity_translation');
    v_answer := public.admin_save_entity_translation('category', v_cat, 'nope', v_lang, 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:field' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (c) save of an unknown field answered %', v_answer;
    END IF;
    v_answer := public.admin_save_entity_translation('attribute', v_cat, 'option:x', public.language_code('pair'), 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:field' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (c) save of an option name in the pair language answered %', v_answer;
    END IF;
    v_answer := public.admin_save_entity_translation('category', v_cat, 'name', public.language_code('base'), 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'baseLocked' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (c) save into the base language answered %', v_answer;
    END IF;
    v_answer := public.admin_save_entity_translation('category', gen_random_uuid(), 'name', v_lang, 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownEntity' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (c) save of an unknown entity answered %', v_answer;
    END IF;
    v_answer := public.admin_save_entity_translation('category', v_cat, 'name', v_lang, 'Katze');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (c) save did not answer ok';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.entity_translations WHERE entity_type = 'category' AND entity_id = v_cat AND field = 'name' AND lang_code = v_lang AND value = 'Katze' AND status = 'edited' AND updated_by = v_staff)) THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (c) the saved row differs';
    END IF;
    v_answer := public.admin_machine_entity_translation('category', v_cat2, 'nope', v_lang, 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:field' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (c) machine of an unknown field answered %', v_answer;
    END IF;
    v_answer := public.admin_machine_entity_translation('category', v_cat2, 'name', v_lang, '  ');
    IF v_answer ->> 'message' IS DISTINCT FROM 'required:value' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (c) machine of an empty value answered %', v_answer;
    END IF;
    v_answer := public.admin_machine_entity_translation('category', v_cat2, 'name', v_lang, 'Mat');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (c) machine did not answer ok';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.entity_translations WHERE entity_type = 'category' AND entity_id = v_cat2 AND field = 'name' AND lang_code = v_lang AND value = 'Mat' AND status = 'machine')) THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (c) the machine row differs';
    END IF;
    IF NOT ((SELECT count(*) FROM public.entity_translations WHERE lang_code = v_lang) = 2) THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: (c) a refused call wrote a row';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('entity_translation.save', 'entity_translation.machine')) <> 2 THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('entity_translation.save', 'entity_translation.machine'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_translation';
    IF v_count <> 5 THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: the dial staff_translation counted % for (c) the staff writer (expected %)', v_count, 5;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_machine_translation';
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 2 proof: the dial staff_machine_translation counted % for (c) the staff writer (expected %)', v_count, 3;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_save_entity_translation', 'admin_machine_entity_translation')) IS DISTINCT FROM v_refused + 6 THEN
      RAISE EXCEPTION 'F1-3 part 2 (c) proof: door_refusals did not meter the 6 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f13p2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f13p2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114130100') ON CONFLICT DO NOTHING;
