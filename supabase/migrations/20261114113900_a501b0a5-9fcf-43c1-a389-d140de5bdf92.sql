-- e2e-areas: admin-translations, admin-imports
-- Foundations 1, turn F1-3, part 5 of 12 — THE TRANSLATION IMPORT AND ITS UNDO ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-3.md; ruling 1). admin_import_translations and
-- admin_undo_import are redeclared WHOLE and written out from their live bodies (md5 checked; their last declarations
-- were written by computed insertion — a door's body is redeclared written-out, DEC-383). Each gate becomes ONE
-- door_context('staff', translations:update or :manage, the D1 M6c-6 dial import_commit or import_undo, global) — the
-- manifest's dial cells now name them (INC-1158) —, then the translator language scope, and the shell; the refusal
-- sentences become door_refuse codes (badValue:items, tooManyRows, baseLocked, required:batch, unknownBatch). Both keep
-- RETURNS jsonb and their grants. Proofs on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_import_translations(text,jsonb)', '1a043985654770be62cdf12358c7b269'],
    ['public.admin_undo_import(uuid)', '9f49201faa7c3284707c3e51a41b9f40']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114130300') THEN
    RAISE EXCEPTION 'F1-3 part 5: part 4 (d7031bb9) must be applied first';
  END IF;
  IF to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-3 part 5: part 1''s language_code is missing';
  END IF;
  IF (SELECT count(*) FROM public.rate_dials WHERE action IN ('import_commit', 'import_undo')) <> 2 THEN
    RAISE EXCEPTION 'F1-3 part 5: a dial of these doors is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 5: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_import_translations (whole from the live body, md5 1a043985654770be62cdf12358c7b269; the gate on door_context with the import_commit dial and the shell)
CREATE OR REPLACE FUNCTION public.admin_import_translations(p_lang text, p_items jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_base      text;
  v_item      record;
  v_flagged   boolean;
  v_current   text;
  v_found     boolean;
  v_batch     uuid := gen_random_uuid();
  v_before    uuid[];
  v_new       uuid;
  v_imported  bigint := 0;
  v_flag      bigint := 0;
  v_skipped   bigint := 0;
  v_unchanged bigint := 0;
BEGIN
  PERFORM public.door_context('staff', 'translations', 'update', 'import_commit', NULL, 'global');
  IF NOT public.translation_scope_ok(p_lang) THEN
    PERFORM public.door_refuse('permissionDenied', 'language');
  END IF;

  IF jsonb_typeof(COALESCE(p_items, 'null'::jsonb)) <> 'array' THEN
    PERFORM public.door_refuse('badValue', 'items');
  END IF;
  IF jsonb_array_length(p_items) > 5000 THEN
    PERFORM public.door_refuse('tooManyRows');
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    PERFORM public.door_refuse('baseLocked');
  END IF;

  FOR v_item IN
    SELECT e->>'key' AS key, e->>'value' AS value
      FROM jsonb_array_elements(p_items) AS e
  LOOP
    CONTINUE WHEN v_item.key IS NULL OR btrim(v_item.key) = '' OR v_item.value IS NULL;

    PERFORM 1 FROM public.ui_translations t
      WHERE t.key = v_item.key AND t.lang_code = v_base AND NOT t.orphaned;
    IF NOT FOUND THEN
      v_skipped := v_skipped + 1;
      CONTINUE;
    END IF;

    -- NO-OP LAW (INC-124): one normalization on both sides.
    v_current := NULL;
    v_found := false;
    SELECT t.value, true INTO v_current, v_found
      FROM public.ui_translations t
     WHERE t.key = v_item.key AND t.lang_code = p_lang;

    IF v_found AND v_current IS NOT NULL
       AND regexp_replace(v_current, '[[:space:]]+$', '') =
           regexp_replace(v_item.value, '[[:space:]]+$', '') THEN
      v_unchanged := v_unchanged + 1;
      CONTINUE;
    END IF;

    -- BATCH STAMP by ID-SET DIFFERENCE: timestamps can tie inside one
    -- transaction, ids cannot. The writer captures at most one revision.
    SELECT COALESCE(array_agg(r.id), ARRAY[]::uuid[]) INTO v_before
      FROM public.ui_translation_revisions r
     WHERE r.key = v_item.key AND r.lang_code = p_lang;

    PERFORM public.admin_save_translation_core(v_item.key, p_lang, v_item.value);
    v_imported := v_imported + 1;

    SELECT r.id INTO v_new
      FROM public.ui_translation_revisions r
     WHERE r.key = v_item.key AND r.lang_code = p_lang
       AND NOT (r.id = ANY (v_before))
     LIMIT 1;

    IF v_new IS NOT NULL THEN
      UPDATE public.ui_translation_revisions
         SET batch_id = v_batch,
             -- What the import actually stored: undo's untouched test.
             post_value = (SELECT t.value FROM public.ui_translations t
                            WHERE t.key = v_item.key AND t.lang_code = p_lang)
       WHERE id = v_new;
    END IF;

    SELECT t.flagged INTO v_flagged
      FROM public.ui_translations t
     WHERE t.key = v_item.key AND t.lang_code = p_lang;
    IF COALESCE(v_flagged, false) THEN
      v_flag := v_flag + 1;
      UPDATE public.ui_translations
         SET flag_note = COALESCE(flag_note, '') || ' · import'
       WHERE key = v_item.key AND lang_code = p_lang
         AND COALESCE(flag_note, '') NOT LIKE '%· import';
    END IF;
  END LOOP;

  PERFORM public.log_audit('translation.import', 'ui_translations', p_lang,
    jsonb_build_object('lang', p_lang, 'action', 'import', 'machine', false,
                       'batch_id', v_batch,
                       'imported', v_imported, 'flagged', v_flag,
                       'unchanged', v_unchanged, 'skipped', v_skipped));

  RETURN jsonb_build_object('imported', v_imported, 'flagged', v_flag,
                            'unchanged', v_unchanged, 'skipped', v_skipped,
                            'batch_id', v_batch);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_import_translations', 'import_commit', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_import_translations(text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_import_translations(text, jsonb) TO authenticated;

-- ------------------------------------------------------------ 2. admin_undo_import (whole from the live body, md5 9f49201faa7c3284707c3e51a41b9f40; the gate on door_context with the import_undo dial and the shell)
CREATE OR REPLACE FUNCTION public.admin_undo_import(p_batch uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_rev        record;
  v_cur        public.ui_translations%ROWTYPE;
  v_lang       text;
  v_restored   bigint := 0;
  v_conflicted bigint := 0;
BEGIN
  PERFORM public.door_context('staff', 'translations', 'manage', 'import_undo', NULL, 'global');
  IF p_batch IS NULL THEN
    PERFORM public.door_refuse('required', 'batch');
  END IF;

  SELECT r.lang_code INTO v_lang
    FROM public.ui_translation_revisions r
   WHERE r.batch_id = p_batch AND r.action <> 'undo-import'
   LIMIT 1;
  IF v_lang IS NULL THEN
    PERFORM public.door_refuse('unknownBatch');
  END IF;
  IF NOT public.translation_scope_ok(v_lang) THEN
    PERFORM public.door_refuse('permissionDenied', 'language');
  END IF;

  FOR v_rev IN
    SELECT r.* FROM public.ui_translation_revisions r
     WHERE r.batch_id = p_batch AND r.action <> 'undo-import'
  LOOP
    SELECT * INTO v_cur FROM public.ui_translations
     WHERE key = v_rev.key AND lang_code = v_rev.lang_code;

    -- UNTOUCHED TEST, ordering-free: the row still holds exactly what the
    -- import wrote. Anything else is later work and is left alone.
    IF NOT FOUND OR v_cur.value IS DISTINCT FROM v_rev.post_value THEN
      v_conflicted := v_conflicted + 1;
      CONTINUE;
    END IF;

    INSERT INTO public.ui_translation_revisions
      (key, lang_code, prev_value, prev_status, prev_machine, action,
       changed_by, batch_id, post_value)
    VALUES (v_rev.key, v_rev.lang_code, v_cur.value, v_cur.status,
            COALESCE(v_cur.machine, false), 'undo-import', auth.uid(),
            p_batch, v_rev.prev_value);

    UPDATE public.ui_translations
       SET value = v_rev.prev_value,
           status = v_rev.prev_status,
           machine = COALESCE(v_rev.prev_machine, false),
           flagged = false,
           flag_note = NULL,
           updated_by = auth.uid(),
           updated_at = now(),
           approved_by = CASE WHEN v_rev.prev_status = 'approved'
                              THEN COALESCE(approved_by, auth.uid()) ELSE NULL END,
           approved_at = CASE WHEN v_rev.prev_status = 'approved'
                              THEN COALESCE(approved_at, now()) ELSE NULL END
     WHERE key = v_rev.key AND lang_code = v_rev.lang_code;

    v_restored := v_restored + 1;
  END LOOP;

  PERFORM public.log_audit('translation.undo_import', 'ui_translations', v_lang,
    jsonb_build_object('lang', v_lang, 'action', 'undo-import',
                       'batch_id', p_batch,
                       'restored', v_restored, 'conflicted', v_conflicted));

  RETURN jsonb_build_object('restored', v_restored, 'conflicted', v_conflicted);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_undo_import', 'import_undo', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_undo_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_import(uuid) TO authenticated;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: both doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and not for anon
--     or PUBLIC; both bodies this file's (md5).
-- (b) the gates: accountDeactivated; permissionDenied for a caller without translations:update (import) or :manage
--     (undo); permissionDenied:language for a translator outside the languages assigned to them (import); none spending
--     a dial or writing.
-- (c) each door's own codes, every earlier check cleared, the exact message, a 400, nothing written; an import over a
--     row written before it, its batch, and the undo that restores that row; import_commit and import_undo counted once
--     per call past the gates; every refusal metered.
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
  v_batch   uuid;
  v_items   jsonb;
BEGIN
  v_tag := 'e2e-mig-f13p5-' || substr(v_hex, 1, 10);
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
    ['public.admin_import_translations(text,jsonb)', '5ab86adfc00ce78217add81b565380de'],
    ['public.admin_undo_import(uuid)', '37891ecd7a6c1c63dca4ae2d1c369dd0']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 5 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 5 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.languages WHERE code IN (v_lang, v_lang2, v_nolang)) THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: a scratch language code already exists';
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
      RAISE EXCEPTION 'F1-3 part 5 proof: a translations permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-translator', v_tag) RETURNING id INTO v_role_t;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_t, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action IN ('view', 'update');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_t) <> 2 THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: a translations permission of the translator role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global'), (v_tr, v_role_t, 'global');
    INSERT INTO public.ui_translations (key, lang_code, value, status)
    VALUES (v_key, v_lang, 'Alt {name}', 'approved');
    v_items := jsonb_build_array(jsonb_build_object('key', v_key, 'value', 'Neu {name}'));

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_import_translations', 'admin_undo_import');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_import_translations(v_lang, v_items);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_import_translations(v_lang, v_items);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (b) a caller without translations:update answered %', v_answer;
    END IF;
    v_answer := public.admin_undo_import(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (b) a caller without translations:manage answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_tr::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_t::text)::text, true);
    v_answer := public.admin_import_translations(v_lang, v_items);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:language' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (b) a translator outside their languages answered %', v_answer;
    END IF;
    v_answer := public.admin_undo_import(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (b) a translator without translations:manage answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'import_commit';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: the dial import_commit counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'import_commit';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: the dial import_commit counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_tr::text AND action = 'import_commit';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: the dial import_commit counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_tr::text AND action = 'import_undo';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: the dial import_undo counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.ui_translations WHERE key = v_key AND lang_code = v_lang AND value = 'Alt {name}') AND NOT EXISTS (SELECT 1 FROM public.ui_translation_revisions WHERE key = v_key AND lang_code = v_lang)) THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (b) a refused import wrote';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_import_translations', 'admin_undo_import')) IS DISTINCT FROM v_refused + 5 THEN
      RAISE EXCEPTION 'F1-3 part 5 (b) proof: door_refusals did not meter the 5 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_import_translations', 'admin_undo_import');
    v_answer := public.admin_import_translations(v_lang, '{}'::jsonb);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:items' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (c) items that are not a list answered %', v_answer;
    END IF;
    v_answer := public.admin_import_translations(v_lang, (SELECT jsonb_agg(jsonb_build_object('key', v_key, 'value', g::text)) FROM generate_series(1, 5001) g));
    IF v_answer ->> 'message' IS DISTINCT FROM 'tooManyRows' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (c) more than 5000 items answered %', v_answer;
    END IF;
    v_answer := public.admin_import_translations(public.language_code('base'), v_items);
    IF v_answer ->> 'message' IS DISTINCT FROM 'baseLocked' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (c) an import into the base language answered %', v_answer;
    END IF;
    v_answer := public.admin_import_translations(v_lang, v_items);
    IF NOT ((v_answer ->> 'imported')::integer = 1 AND (v_answer ->> 'skipped')::integer = 0 AND v_answer ? 'batch_id') THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (c) the import answered otherwise';
    END IF;
    v_batch := (v_answer ->> 'batch_id')::uuid;
    IF NOT (EXISTS (SELECT 1 FROM public.ui_translations WHERE key = v_key AND lang_code = v_lang AND value = 'Neu {name}') AND EXISTS (SELECT 1 FROM public.ui_translation_revisions WHERE batch_id = v_batch AND key = v_key AND prev_value = 'Alt {name}')) THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (c) the imported row or its revision differs';
    END IF;
    v_answer := public.admin_undo_import(NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'required:batch' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (c) an undo naming no batch answered %', v_answer;
    END IF;
    v_answer := public.admin_undo_import(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownBatch' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (c) an undo of an unknown batch answered %', v_answer;
    END IF;
    v_answer := public.admin_undo_import(v_batch);
    IF NOT (v_answer = '{"restored": 1, "conflicted": 0}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (c) the undo answered otherwise';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.ui_translations WHERE key = v_key AND lang_code = v_lang AND value = 'Alt {name}' AND status = 'approved')) THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: (c) the undo did not restore the row';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('translation.import', 'translation.undo_import')) <> 2 THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('translation.import', 'translation.undo_import'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'import_commit';
    IF v_count <> 4 THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: the dial import_commit counted % for (c) the staff importer (expected %)', v_count, 4;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'import_undo';
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 5 proof: the dial import_undo counted % for (c) the staff importer (expected %)', v_count, 3;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_import_translations', 'admin_undo_import')) IS DISTINCT FROM v_refused + 5 THEN
      RAISE EXCEPTION 'F1-3 part 5 (c) proof: door_refusals did not meter the 5 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f13p5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f13p5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114130400') ON CONFLICT DO NOTHING;
