-- e2e-areas: admin-translations
-- Foundations 1, turn F1-3, part 4 of 12 — APPROVE-ALL ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-3.md; ruling 1). admin_approve_all_translations,
-- admin_approve_all_entity_translations and their two impls are redeclared WHOLE from their last declarations (live
-- md5 checked). Each door's gate becomes ONE door_context('staff', translations:approve, staff_config, global) — they
-- spent no dial and now spend the manifest's —, then the translator language scope (permissionDenied:language), and
-- the shell; the impls' refusal sentences become door_refuse codes (badLanguage, baseLocked). All keep RETURNS jsonb and
-- their grants. Proofs on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_approve_all_translations(text)', 'e5831ae1657d8279970b49e8232e9394'],
    ['public.admin_approve_all_entity_translations(text)', 'dbd476290f459afaffdc6f16f05ee8ca'],
    ['public.approve_all_translations_impl(text)', 'b6654d89a6a21953267dad2fafeeaf5d'],
    ['public.approve_all_entity_translations_impl(text)', 'c868b270737586931dd5bb59eb987822']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114130200') THEN
    RAISE EXCEPTION 'F1-3 part 4: part 3 (607adce0) must be applied first';
  END IF;
  IF to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-3 part 4: part 1''s language_code is missing';
  END IF;
  IF (SELECT count(*) FROM public.rate_dials WHERE action IN ('staff_config')) <> 1 THEN
    RAISE EXCEPTION 'F1-3 part 4: a dial of these doors is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 4: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_approve_all_translations (whole from 20260831060745 :78; the gate on door_context, the staff_config dial and the shell)
CREATE OR REPLACE FUNCTION public.admin_approve_all_translations(p_lang text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  PERFORM public.door_context('staff', 'translations', 'approve', 'staff_config', NULL, 'global');
  IF NOT public.translation_scope_ok(p_lang) THEN
    PERFORM public.door_refuse('permissionDenied', 'language');
  END IF;
  RETURN public.approve_all_translations_impl(p_lang);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_approve_all_translations', 'staff_config', SQLERRM);
END $$;
REVOKE ALL ON FUNCTION public.admin_approve_all_translations(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_approve_all_translations(text) TO authenticated;

-- ------------------------------------------------------------ 2. admin_approve_all_entity_translations (whole from 20260901205020 :65; the gate on door_context, the staff_config dial and the shell)
CREATE OR REPLACE FUNCTION public.admin_approve_all_entity_translations(p_lang text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.door_context('staff', 'translations', 'approve', 'staff_config', NULL, 'global');
  IF NOT public.translation_scope_ok(p_lang) THEN
    PERFORM public.door_refuse('permissionDenied', 'language');
  END IF;
  RETURN public.approve_all_entity_translations_impl(p_lang);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_approve_all_entity_translations', 'staff_config', SQLERRM);
END $$;
REVOKE ALL ON FUNCTION public.admin_approve_all_entity_translations(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_approve_all_entity_translations(text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_approve_all_entity_translations(text) TO service_role;

-- ------------------------------------------------------------ 3. approve_all_translations_impl (whole from 20260901143032 :64; the refusals as codes)
CREATE OR REPLACE FUNCTION public.approve_all_translations_impl(p_lang text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_base     text;
  v_approved int := 0;
  v_skipped  int := 0;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.languages l WHERE l.code = p_lang) THEN
    PERFORM public.door_refuse('badLanguage');
  END IF;
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    PERFORM public.door_refuse('baseLocked');
  END IF;

  -- Flagged rows are SKIPPED, never approved (U4f law): reviewable-but-for-the-flag.
  SELECT count(*) INTO v_skipped
    FROM public.ui_translations t
   WHERE t.lang_code = p_lang
     AND t.flagged
     AND public.ui_translation_reviewable(t.status, false, t.orphaned);

  -- CAPTURE before MUTATE: one revision per row, action 'approve'.
  INSERT INTO public.ui_translation_revisions
    (key, lang_code, prev_value, prev_status, prev_machine, action, changed_by)
  SELECT t.key, t.lang_code, t.value, t.status, COALESCE(t.machine, false),
         'approve', auth.uid()
    FROM public.ui_translations t
   WHERE t.lang_code = p_lang
     AND public.ui_translation_reviewable(t.status, t.flagged, t.orphaned);

  UPDATE public.ui_translations t
     SET status = 'approved', approved_by = auth.uid(), approved_at = now(),
         updated_by = auth.uid(), updated_at = now()
   WHERE t.lang_code = p_lang
     AND public.ui_translation_reviewable(t.status, t.flagged, t.orphaned);
  GET DIAGNOSTICS v_approved = ROW_COUNT;

  PERFORM public.log_audit('translation.approve_all', 'ui_translations', p_lang,
    jsonb_build_object('lang', p_lang, 'action', 'approve_all', 'machine', false,
                       'approved', v_approved, 'skipped_flagged', v_skipped));

  RETURN jsonb_build_object('approved', v_approved, 'skipped_flagged', v_skipped);
END $function$;
REVOKE ALL ON FUNCTION public.approve_all_translations_impl(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.approve_all_translations_impl(text) TO service_role;

-- ------------------------------------------------------------ 4. approve_all_entity_translations_impl (whole from 20260901205020 :26; the refusals as codes)
CREATE OR REPLACE FUNCTION public.approve_all_entity_translations_impl(p_lang text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_base     text;
  v_approved int := 0;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.languages l WHERE l.code = p_lang) THEN
    PERFORM public.door_refuse('badLanguage');
  END IF;
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    PERFORM public.door_refuse('baseLocked');
  END IF;

  UPDATE public.entity_translations t
     SET status = 'approved',
         approved_by = auth.uid(), approved_at = now(),
         updated_by = auth.uid(), updated_at = now()
   WHERE t.lang_code = p_lang
     AND t.status IN ('machine', 'edited');
  GET DIAGNOSTICS v_approved = ROW_COUNT;

  PERFORM public.log_audit('entity_translation.approve_all', 'entity_translations', p_lang,
    jsonb_build_object('lang', p_lang, 'approved', v_approved));

  RETURN jsonb_build_object('approved', v_approved);
END $$;
REVOKE ALL ON FUNCTION public.approve_all_entity_translations_impl(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.approve_all_entity_translations_impl(text) TO service_role;

-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: both doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and service_role
--     where it held it) and not for anon or PUBLIC; both impls closed to browser roles; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without translations:approve,
--     permissionDenied:language for a translator outside the languages assigned to them (403), none spending
--     staff_config or writing.
-- (c) each door's own codes, every earlier check cleared, the exact message, a 400; each approve-all with its answer,
--     rows and audit line, a flagged row skipped; staff_config counted once per call past the gates (the approve-all
--     doors spent no dial before); every refusal metered.
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
  v_tag := 'e2e-mig-f13p4-' || substr(v_hex, 1, 10);
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
    ['public.admin_approve_all_translations(text)', '22d02c3e88079eef90b0bd9f95efc5bd'],
    ['public.admin_approve_all_entity_translations(text)', 'fe7769aef5c96edd6426c08c896cda20']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 4 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 4 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.approve_all_translations_impl(text)', '34eae52826ecc67f15ab82db256a827e'],
    ['public.approve_all_entity_translations_impl(text)', '22eadb3c700c5ad8a305be3d778c4381']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 4 proof (a): the impl %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 4 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.languages WHERE code IN (v_lang, v_lang2, v_nolang)) THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: a scratch language code already exists';
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
      RAISE EXCEPTION 'F1-3 part 4 proof: a translations permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-translator', v_tag) RETURNING id INTO v_role_t;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_t, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action IN ('view', 'update', 'approve');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_t) <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: a translations permission of the translator role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global'), (v_tr, v_role_t, 'global');
    INSERT INTO public.ui_translations (key, lang_code, value, status, flagged)
    VALUES (v_key, v_lang, 'Hallo {name}', 'edited', false),
           (v_key2, v_lang, 'Tschuess {name}', 'machine', false),
           (v_keyf, v_lang, 'Flagge', 'edited', true);
    INSERT INTO public.entity_translations (entity_type, entity_id, field, lang_code, value, status)
    VALUES ('category', v_cat, 'name', v_lang, 'Kat', 'edited'),
           ('category', v_cat2, 'name', v_lang, 'Kat zwei', 'machine');

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_approve_all_translations', 'admin_approve_all_entity_translations');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_approve_all_translations(v_lang);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_approve_all_translations(v_lang);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (b) a caller without translations:approve answered %', v_answer;
    END IF;
    v_answer := public.admin_approve_all_entity_translations(v_lang);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (b) a caller without translations:approve (entities) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_tr::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_t::text)::text, true);
    v_answer := public.admin_approve_all_translations(v_lang);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:language' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (b) a translator outside their languages answered %', v_answer;
    END IF;
    v_answer := public.admin_approve_all_entity_translations(v_lang);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:language' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (b) a translator outside their languages (entities) answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_tr::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.ui_translations WHERE lang_code = v_lang AND status = 'approved') AND NOT EXISTS (SELECT 1 FROM public.entity_translations WHERE lang_code = v_lang AND status = 'approved')) THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (b) a refused call approved a row';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_approve_all_translations', 'admin_approve_all_entity_translations')) IS DISTINCT FROM v_refused + 5 THEN
      RAISE EXCEPTION 'F1-3 part 4 (b) proof: door_refusals did not meter the 5 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_approve_all_translations', 'admin_approve_all_entity_translations');
    v_answer := public.admin_approve_all_translations(public.language_code('base'));
    IF v_answer ->> 'message' IS DISTINCT FROM 'baseLocked' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (c) approve all in the base language answered %', v_answer;
    END IF;
    v_answer := public.admin_approve_all_translations(v_nolang);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badLanguage' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (c) approve all in an unknown language answered %', v_answer;
    END IF;
    v_answer := public.admin_approve_all_translations(v_lang);
    IF NOT (v_answer = '{"approved": 2, "skipped_flagged": 1}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (c) approve all answered otherwise';
    END IF;
    IF NOT ((SELECT count(*) FROM public.ui_translations WHERE lang_code = v_lang AND status = 'approved' AND approved_by = v_staff) = 2 AND EXISTS (SELECT 1 FROM public.ui_translations WHERE key = v_keyf AND lang_code = v_lang AND status = 'edited')) THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (c) approve all approved the flagged row or left another';
    END IF;
    v_answer := public.admin_approve_all_entity_translations(public.language_code('base'));
    IF v_answer ->> 'message' IS DISTINCT FROM 'baseLocked' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (c) approve all entities in the base language answered %', v_answer;
    END IF;
    v_answer := public.admin_approve_all_entity_translations(v_nolang);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badLanguage' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (c) approve all entities in an unknown language answered %', v_answer;
    END IF;
    v_answer := public.admin_approve_all_entity_translations(v_lang);
    IF NOT (v_answer = '{"approved": 2}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (c) approve all entities answered otherwise';
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.entity_translations WHERE lang_code = v_lang AND status <> 'approved')) THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: (c) approve all entities left a row';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('translation.approve_all', 'entity_translation.approve_all')) <> 2 THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('translation.approve_all', 'entity_translation.approve_all'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 6 THEN
      RAISE EXCEPTION 'F1-3 part 4 proof: the dial staff_config counted % for (c) the staff approver (expected %)', v_count, 6;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_approve_all_translations', 'admin_approve_all_entity_translations')) IS DISTINCT FROM v_refused + 4 THEN
      RAISE EXCEPTION 'F1-3 part 4 (c) proof: door_refusals did not meter the 4 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f13p4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f13p4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114130300') ON CONFLICT DO NOTHING;
