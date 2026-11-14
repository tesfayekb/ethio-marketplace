-- e2e-areas: admin-translations
-- Foundations 1, turn F1-3, part 3 of 12 — THE TRANSLATION STATUS DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-3.md; ruling 1). admin_set_translation_status and
-- admin_set_entity_translation_status are redeclared WHOLE from their last declarations (live md5 checked). Each gate
-- becomes ONE door_context('staff', translations:approve, staff_config, global), then the translator language scope
-- (permissionDenied:language), and the shell; the refusal sentences become door_refuse codes (badValue:action,
-- unknownTranslation, translationFlagged). Both returned void: DROP + CREATE as RETURNS jsonb {ok:true}, grants
-- restated. Proofs on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_set_translation_status(text,text,text)', '6f430f356cd353f02cdddbf8656d16fb'],
    ['public.admin_set_entity_translation_status(text,uuid,text,text,text)', 'd14d2fdc386d554002d6f25791c2a4c0']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114130100') THEN
    RAISE EXCEPTION 'F1-3 part 3: part 2 (c0e4a4ff) must be applied first';
  END IF;
  IF to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-3 part 3: part 1''s language_code is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 3: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_set_translation_status (whole from 20260831052750 :5; void → jsonb, the gate on door_context and the shell)
DROP FUNCTION public.admin_set_translation_status(text, text, text);
CREATE FUNCTION public.admin_set_translation_status(p_key text, p_lang text, p_action text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_flagged boolean;
BEGIN
  PERFORM public.door_context('staff', 'translations', 'approve', 'staff_config', NULL, 'global');
  IF NOT public.translation_scope_ok(p_lang) THEN
    PERFORM public.door_refuse('permissionDenied', 'language');
  END IF;
  IF p_action NOT IN ('approve', 'clear') THEN
    PERFORM public.door_refuse('badValue', 'action');
  END IF;

  IF p_action = 'approve' THEN
    SELECT t.flagged INTO v_flagged FROM public.ui_translations t
     WHERE t.key = p_key AND t.lang_code = p_lang;
    IF v_flagged IS NULL THEN PERFORM public.door_refuse('unknownTranslation'); END IF;
    IF v_flagged THEN
      PERFORM public.door_refuse('translationFlagged');
    END IF;

    UPDATE public.ui_translations
       SET status = 'approved', approved_by = auth.uid(), approved_at = now(),
           updated_by = auth.uid(), updated_at = now()
     WHERE key = p_key AND lang_code = p_lang;
  ELSE
    UPDATE public.ui_translations
       SET status = 'untranslated', value = NULL, machine = false,
           flagged = false, flag_note = NULL,
           approved_by = NULL, approved_at = NULL,
           updated_by = auth.uid(), updated_at = now()
     WHERE key = p_key AND lang_code = p_lang;
  END IF;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownTranslation'); END IF;

  PERFORM public.log_audit('translation.status', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', p_lang, 'action', p_action, 'machine', false));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_translation_status', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_set_translation_status(text, text, text) IS
  'F1-3 on the door shell (DEC-333): approves or clears one interface text behind door_context(staff, translations:approve, staff_config, global) and the translator language scope; refuses permissionDenied[:language] / badValue:action / unknownTranslation / translationFlagged; audits translation.status; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_translation_status(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_translation_status(text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_translation_status(text, text, text) TO service_role;

-- ------------------------------------------------------------ 2. admin_set_entity_translation_status (whole from 20260830080548 :141; void → jsonb, the gate on door_context and the shell)
DROP FUNCTION public.admin_set_entity_translation_status(text, uuid, text, text, text);
CREATE FUNCTION public.admin_set_entity_translation_status(
  p_type text, p_id uuid, p_field text, p_lang text, p_action text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_prev public.entity_translations%ROWTYPE;
BEGIN
  PERFORM public.door_context('staff', 'translations', 'approve', 'staff_config', NULL, 'global');
  IF NOT public.translation_scope_ok(p_lang) THEN
    PERFORM public.door_refuse('permissionDenied', 'language');
  END IF;
  IF p_action NOT IN ('approve', 'clear') THEN
    PERFORM public.door_refuse('badValue', 'action');
  END IF;

  SELECT * INTO v_prev FROM public.entity_translations
   WHERE entity_type = p_type AND entity_id = p_id
     AND field = p_field AND lang_code = p_lang;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownTranslation'); END IF;

  IF p_action = 'approve' THEN
    UPDATE public.entity_translations
       SET status = 'approved', approved_by = auth.uid(), approved_at = now(),
           updated_by = auth.uid(), updated_at = now()
     WHERE entity_type = p_type AND entity_id = p_id
       AND field = p_field AND lang_code = p_lang;
  ELSE
    UPDATE public.entity_translations
       SET status = 'untranslated', value = NULL, machine = false,
           flagged = false, flag_note = NULL,
           approved_by = NULL, approved_at = NULL,
           updated_by = auth.uid(), updated_at = now()
     WHERE entity_type = p_type AND entity_id = p_id
       AND field = p_field AND lang_code = p_lang;
  END IF;

  PERFORM public.log_audit('entity_translation.status', 'entity_translations', p_id::text,
    jsonb_build_object('type', p_type, 'id', p_id, 'field', p_field, 'lang', p_lang,
                       'action', p_action, 'machine', false,
                       'old_value', left(COALESCE(v_prev.value, ''), 200)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_entity_translation_status', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_set_entity_translation_status(text, uuid, text, text, text) IS
  'F1-3 on the door shell (DEC-333): approves or clears one catalogue name translation behind door_context(staff, translations:approve, staff_config, global) and the translator language scope; refuses permissionDenied[:language] / badValue:action / unknownTranslation; audits entity_translation.status; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_entity_translation_status(text, uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_entity_translation_status(text, uuid, text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_entity_translation_status(text, uuid, text, text, text) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: both doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and service_role
--     and not for anon or PUBLIC; both bodies this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without translations:approve, and
--     permissionDenied:language for a translator outside the languages assigned to them (403), none spending
--     staff_config or writing.
-- (c) each door's own codes, every earlier check cleared, the exact message, a 400, nothing written; each approval
--     with its row and audit line; staff_config counted once per call past the gates; every refusal metered.
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
  v_tag := 'e2e-mig-f13p3-' || substr(v_hex, 1, 10);
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
    ['public.admin_set_translation_status(text,text,text)', '7b1cb2095a22b839276e83af65314bc0'],
    ['public.admin_set_entity_translation_status(text,uuid,text,text,text)', 'c8bb2c5dd06997bac73d4db520470931']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 3 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 3 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.languages WHERE code IN (v_lang, v_lang2, v_nolang)) THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: a scratch language code already exists';
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
      RAISE EXCEPTION 'F1-3 part 3 proof: a translations permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-translator', v_tag) RETURNING id INTO v_role_t;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_t, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action IN ('view', 'update', 'approve');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_t) <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: a translations permission of the translator role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global'), (v_tr, v_role_t, 'global');
    INSERT INTO public.ui_translations (key, lang_code, value, status, flagged)
    VALUES (v_key, v_lang, 'Hallo {name}', 'edited', false), (v_keyf, v_lang, 'Flagge', 'edited', true);
    INSERT INTO public.entity_translations (entity_type, entity_id, field, lang_code, value, status)
    VALUES ('category', v_cat, 'name', v_lang, 'Kat', 'edited');

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_set_translation_status', 'admin_set_entity_translation_status');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_set_translation_status(v_key, v_lang, 'approve');
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_set_translation_status(v_key, v_lang, 'approve');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (b) a caller without translations:approve answered %', v_answer;
    END IF;
    v_answer := public.admin_set_entity_translation_status('category', v_cat, 'name', v_lang, 'approve');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (b) a caller without translations:approve (entity) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_tr::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_t::text)::text, true);
    v_answer := public.admin_set_translation_status(v_key, v_lang, 'approve');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:language' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (b) a translator outside their languages answered %', v_answer;
    END IF;
    v_answer := public.admin_set_entity_translation_status('category', v_cat, 'name', v_lang, 'approve');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:language' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (b) a translator outside their languages (entity) answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_tr::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.ui_translations WHERE lang_code = v_lang AND status = 'approved') AND NOT EXISTS (SELECT 1 FROM public.entity_translations WHERE lang_code = v_lang AND status = 'approved')) THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (b) a refused call approved a row';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_set_translation_status', 'admin_set_entity_translation_status')) IS DISTINCT FROM v_refused + 5 THEN
      RAISE EXCEPTION 'F1-3 part 3 (b) proof: door_refusals did not meter the 5 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_set_translation_status', 'admin_set_entity_translation_status');
    v_answer := public.admin_set_translation_status(v_key, v_lang, 'nope');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:action' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (c) an unknown action answered %', v_answer;
    END IF;
    v_answer := public.admin_set_translation_status(v_tag || '.none', v_lang, 'approve');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownTranslation' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (c) approving a missing row answered %', v_answer;
    END IF;
    v_answer := public.admin_set_translation_status(v_keyf, v_lang, 'approve');
    IF v_answer ->> 'message' IS DISTINCT FROM 'translationFlagged' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (c) approving a flagged row answered %', v_answer;
    END IF;
    v_answer := public.admin_set_translation_status(v_tag || '.none', v_lang, 'clear');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownTranslation' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (c) clearing a missing row answered %', v_answer;
    END IF;
    v_answer := public.admin_set_translation_status(v_key, v_lang, 'approve');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (c) approve did not answer ok';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.ui_translations WHERE key = v_key AND lang_code = v_lang AND status = 'approved' AND approved_by = v_staff)) THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (c) the approved row differs';
    END IF;
    v_answer := public.admin_set_entity_translation_status('category', v_cat, 'name', v_lang, 'nope');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:action' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (c) an unknown entity action answered %', v_answer;
    END IF;
    v_answer := public.admin_set_entity_translation_status('category', gen_random_uuid(), 'name', v_lang, 'approve');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownTranslation' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (c) a missing entity row answered %', v_answer;
    END IF;
    v_answer := public.admin_set_entity_translation_status('category', v_cat, 'name', v_lang, 'approve');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (c) entity approve did not answer ok';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.entity_translations WHERE entity_id = v_cat AND lang_code = v_lang AND status = 'approved')) THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (c) the approved entity row differs';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.ui_translations WHERE key = v_keyf AND lang_code = v_lang AND status = 'edited')) THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: (c) a refused call approved the flagged row';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('translation.status', 'entity_translation.status')) <> 2 THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('translation.status', 'entity_translation.status'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 8 THEN
      RAISE EXCEPTION 'F1-3 part 3 proof: the dial staff_config counted % for (c) the staff approver (expected %)', v_count, 8;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_set_translation_status', 'admin_set_entity_translation_status')) IS DISTINCT FROM v_refused + 6 THEN
      RAISE EXCEPTION 'F1-3 part 3 (c) proof: door_refusals did not meter the 6 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f13p3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f13p3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114130200') ON CONFLICT DO NOTHING;
