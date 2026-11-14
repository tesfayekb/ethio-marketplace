-- e2e-areas: admin-translations
-- Foundations 1, turn F1-3, part 6 of 12 — THE KEY AND TRANSLATOR DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-3.md; ruling 1). admin_sync_ui_keys,
-- admin_set_key_context and admin_set_translator_languages are redeclared WHOLE from their last declarations (live
-- md5 checked). Each gate becomes ONE door_context('staff', translations:manage, staff_config, global) and the shell;
-- the refusal sentences become door_refuse codes (badValue:en, tooLong:context, unknownKey, unknownUser, badLanguage)
-- and the pair literal a language_code call. Two returned void: DROP + CREATE as RETURNS jsonb {ok:true}, grants
-- restated. Proofs on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_sync_ui_keys(jsonb,jsonb)', 'f45a0dae70eb71b3458d6c4be445f7ab'],
    ['public.admin_set_key_context(text,text)', '9cc2dcf68408c39139a77e28e911f93a'],
    ['public.admin_set_translator_languages(uuid,text[])', '89ed6c228c5d95d252b44c5b730d20fd']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114130400') THEN
    RAISE EXCEPTION 'F1-3 part 6: part 5 (a501b0a5) must be applied first';
  END IF;
  IF to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-3 part 6: part 1''s language_code is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 6: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_sync_ui_keys (whole from 20261031013352 :50; the gate on door_context and the shell, the pair literal as a role)
CREATE OR REPLACE FUNCTION public.admin_sync_ui_keys(p_en jsonb, p_am jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_base     text;
  v_en       bigint := 0;
  v_am       bigint := 0;
  v_added    jsonb := '{}'::jsonb;
  v_lang     record;
  v_n        bigint;
  v_orphaned bigint := 0;
  v_restored bigint := 0;
  v_marks    jsonb;
  v_new      bigint := 0;
  v_langs    bigint := 0;
BEGIN
  PERFORM public.door_context('staff', 'translations', 'manage', 'staff_config', NULL, 'global');
  IF jsonb_typeof(COALESCE(p_en, 'null'::jsonb)) <> 'object' THEN
    PERFORM public.door_refuse('badValue', 'en');
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;

  -- INC-607 — the keys this sync ADDS, counted before the upsert (whose own
  -- count is every key of the catalogue).
  SELECT count(*) INTO v_new
    FROM jsonb_object_keys(p_en) AS k(key)
   WHERE NOT EXISTS (SELECT 1 FROM public.ui_translations x
                      WHERE x.key = k.key AND x.lang_code = v_base);

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      updated_by, updated_at, approved_by, approved_at,
                                      origin)
  SELECT e.key, v_base, e.value, 'approved', false, auth.uid(), now(), auth.uid(), now(),
         'sync'
    FROM jsonb_each_text(p_en) AS e(key, value)
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'approved',
        updated_by = auth.uid(), updated_at = now(), origin = 'sync';
  GET DIAGNOSTICS v_en = ROW_COUNT;

  FOR v_lang IN
    SELECT l.code FROM public.languages l WHERE l.enabled_admin AND NOT l.is_base
  LOOP
    INSERT INTO public.ui_translations (key, lang_code, status, origin)
    SELECT e.key, v_lang.code, 'untranslated', 'sync'
      FROM jsonb_each_text(p_en) AS e(key, value)
    ON CONFLICT (key, lang_code) DO UPDATE SET origin = 'sync';
    GET DIAGNOSTICS v_n = ROW_COUNT;
    v_added := v_added || jsonb_build_object(v_lang.code, v_n);
    v_langs := v_langs + 1;
  END LOOP;

  IF p_am IS NOT NULL AND jsonb_typeof(p_am) = 'object' THEN
    UPDATE public.ui_translations t
       SET value = a.value, status = 'approved', machine = false, flagged = false,
           flag_note = NULL, updated_by = auth.uid(), updated_at = now(),
           approved_by = auth.uid(), approved_at = now()
      FROM jsonb_each_text(p_am) AS a(key, value)
     WHERE t.lang_code = public.language_code('pair') AND t.key = a.key
       AND (t.status = 'untranslated' OR t.value IS NULL OR t.value = ''
            -- INC-603 — an Amharic text no person ever wrote (no 'save' or
            -- 'machine' revision: the console, an import and machine
            -- translation all write one) follows the code's changed text. A
            -- text a person wrote is kept.
            OR (t.value IS DISTINCT FROM a.value
                AND NOT public.ui_text_written(t.key, public.language_code('pair'))));
    GET DIAGNOSTICS v_am = ROW_COUNT;
  END IF;

  v_marks := public.ui_sync_mark_orphans(p_en);
  v_orphaned := (v_marks->>'orphaned')::bigint;
  v_restored := (v_marks->>'restored')::bigint;

  PERFORM public.log_audit('translation.sync', 'ui_translations', v_base,
    jsonb_build_object('lang', v_base, 'action', 'sync', 'machine', false,
                       'en_upserted', v_en, 'keys_added_per_lang', v_added,
                       'am_seeded', v_am, 'orphaned', v_orphaned,
                       'orphans_restored', v_restored, 'keys_added', v_new,
                       'languages', v_langs));

  RETURN jsonb_build_object('en_upserted', v_en, 'keys_added_per_lang', v_added,
                            'am_seeded', v_am, 'orphaned', v_orphaned,
                            'orphans_restored', v_restored, 'keys_added', v_new,
                            'languages', v_langs);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_sync_ui_keys', 'staff_config', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) TO service_role;

-- ------------------------------------------------------------ 2. admin_set_key_context (whole from 20260901234603 :14; void → jsonb, the gate on door_context and the shell)
DROP FUNCTION public.admin_set_key_context(text, text);
CREATE FUNCTION public.admin_set_key_context(p_key text, p_context text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_base text; v_prev text; v_next text;
BEGIN
  PERFORM public.door_context('staff', 'translations', 'manage', 'staff_config', NULL, 'global');

  v_next := NULLIF(btrim(COALESCE(p_context, '')), '');
  IF length(COALESCE(v_next, '')) > 500 THEN
    PERFORM public.door_refuse('tooLong', 'context');
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;

  SELECT t.context INTO v_prev
    FROM public.ui_translations t
   WHERE t.key = p_key AND t.lang_code = v_base;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('unknownKey');
  END IF;

  UPDATE public.ui_translations
     SET context = v_next
   WHERE key = p_key AND lang_code = v_base;

  PERFORM public.log_audit('translation.context', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', v_base, 'action', 'context',
                       'machine', false,
                       'old_value', left(COALESCE(v_prev, ''), 200),
                       'new_value', left(COALESCE(v_next, ''), 200)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_key_context', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_set_key_context(text, text) IS
  'F1-3 on the door shell (DEC-333): sets the translator note of one interface key behind door_context(staff, translations:manage, staff_config, global); refuses tooLong:context / unknownKey; audits translation.context; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_key_context(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_key_context(text, text) TO authenticated;

-- ------------------------------------------------------------ 3. admin_set_translator_languages (whole from 20260829050332 :534; void → jsonb, the gate on door_context and the shell)
DROP FUNCTION public.admin_set_translator_languages(uuid, text[]);
CREATE FUNCTION public.admin_set_translator_languages(p_user uuid, p_langs text[])
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_old text[]; v_new text[];
BEGIN
  PERFORM public.door_context('staff', 'translations', 'manage', 'staff_config', NULL, 'global');
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = p_user) THEN
    PERFORM public.door_refuse('unknownUser');
  END IF;

  v_new := COALESCE(p_langs, ARRAY[]::text[]);
  IF EXISTS (
    SELECT 1 FROM unnest(v_new) c
     WHERE NOT EXISTS (SELECT 1 FROM public.languages l WHERE l.code = c)
  ) THEN
    PERFORM public.door_refuse('badLanguage');
  END IF;

  SELECT COALESCE(array_agg(tl.lang_code ORDER BY tl.lang_code), ARRAY[]::text[])
    INTO v_old FROM public.translator_languages tl WHERE tl.user_id = p_user;

  DELETE FROM public.translator_languages
   WHERE user_id = p_user AND NOT (lang_code = ANY (v_new));
  INSERT INTO public.translator_languages (user_id, lang_code)
  SELECT p_user, c FROM unnest(v_new) c
  ON CONFLICT DO NOTHING;

  PERFORM public.log_audit('translation.translator_scope', 'translator_languages',
    p_user::text,
    jsonb_build_object('action', 'scope', 'machine', false,
                       'old', to_jsonb(v_old), 'new', to_jsonb(v_new)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_translator_languages', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_set_translator_languages(uuid, text[]) IS
  'F1-3 on the door shell (DEC-333): sets the languages one translator may write behind door_context(staff, translations:manage, staff_config, global); refuses unknownUser / badLanguage; audits translation.translator_scope; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_translator_languages(uuid, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_translator_languages(uuid, text[]) TO authenticated;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) catalog facts: the three doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and
--     service_role where it held it) and not for anon or PUBLIC; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without translations:manage (a translator
--     included), none spending staff_config or writing.
-- (c) each door's own codes, every earlier check cleared, the exact message, a 400, nothing written; the key note and
--     the translator's languages, each with its row and audit line. admin_sync_ui_keys spans the whole catalogue: proven
--     on its refusal only. staff_config counted once per call past the gates; every refusal metered.
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
  v_tag := 'e2e-mig-f13p6-' || substr(v_hex, 1, 10);
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
    ['public.admin_sync_ui_keys(jsonb,jsonb)', '82ce774ba1e27217c63921ff09e4a86d'],
    ['public.admin_set_key_context(text,text)', '501894bc242cc6beec55c7bd74e5cc86'],
    ['public.admin_set_translator_languages(uuid,text[])', 'e4986105eca53d8dca258a7938cb5dee']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 6 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 6 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.languages WHERE code IN (v_lang, v_lang2, v_nolang)) THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: a scratch language code already exists';
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
      RAISE EXCEPTION 'F1-3 part 6 proof: a translations permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-translator', v_tag) RETURNING id INTO v_role_t;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_t, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action IN ('view', 'update', 'approve');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_t) <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: a translations permission of the translator role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global'), (v_tr, v_role_t, 'global');

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_sync_ui_keys', 'admin_set_key_context', 'admin_set_translator_languages');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_set_key_context(v_key, 'note');
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_set_translator_languages(v_tr, ARRAY[v_lang]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (b) a caller without translations:manage answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_tr::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_t::text)::text, true);
    v_answer := public.admin_set_key_context(v_key, 'note');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (b) a translator (key note) answered %', v_answer;
    END IF;
    v_answer := public.admin_set_translator_languages(v_tr, ARRAY[v_lang]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (b) a translator (own languages) answered %', v_answer;
    END IF;
    v_answer := public.admin_sync_ui_keys('{}'::jsonb);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (b) a translator (sync) answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_tr::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.translator_languages WHERE user_id = v_tr) AND EXISTS (SELECT 1 FROM public.ui_translations WHERE key = v_key AND context IS NULL)) THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (b) a refused call wrote';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_sync_ui_keys', 'admin_set_key_context', 'admin_set_translator_languages')) IS DISTINCT FROM v_refused + 5 THEN
      RAISE EXCEPTION 'F1-3 part 6 (b) proof: door_refusals did not meter the 5 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_sync_ui_keys', 'admin_set_key_context', 'admin_set_translator_languages');
    v_answer := public.admin_sync_ui_keys('[]'::jsonb);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:en' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (c) sync of a base list that is not an object answered %', v_answer;
    END IF;
    v_answer := public.admin_set_key_context(v_key, repeat('x', 501));
    IF v_answer ->> 'message' IS DISTINCT FROM 'tooLong:context' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (c) a key note over 500 characters answered %', v_answer;
    END IF;
    v_answer := public.admin_set_key_context(v_tag || '.none', 'note');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownKey' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (c) a note on an unknown key answered %', v_answer;
    END IF;
    v_answer := public.admin_set_key_context(v_key, 'e2e note');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (c) the key note did not answer ok';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.ui_translations WHERE key = v_key AND lang_code = public.language_code('base') AND context = 'e2e note')) THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (c) the key note differs';
    END IF;
    v_answer := public.admin_set_translator_languages(gen_random_uuid(), ARRAY[v_lang]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownUser' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (c) languages for an unknown user answered %', v_answer;
    END IF;
    v_answer := public.admin_set_translator_languages(v_tr, ARRAY[v_nolang]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badLanguage' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (c) an unknown language for a translator answered %', v_answer;
    END IF;
    v_answer := public.admin_set_translator_languages(v_tr, ARRAY[v_lang]);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (c) the translator languages did not answer ok';
    END IF;
    IF NOT ((SELECT array_agg(lang_code) FROM public.translator_languages WHERE user_id = v_tr) = ARRAY[v_lang]) THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: (c) the translator languages differ';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('translation.context', 'translation.translator_scope')) <> 2 THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('translation.context', 'translation.translator_scope'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 7 THEN
      RAISE EXCEPTION 'F1-3 part 6 proof: the dial staff_config counted % for (c) the staff manager (expected %)', v_count, 7;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_sync_ui_keys', 'admin_set_key_context', 'admin_set_translator_languages')) IS DISTINCT FROM v_refused + 5 THEN
      RAISE EXCEPTION 'F1-3 part 6 (c) proof: door_refusals did not meter the 5 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f13p6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f13p6-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114130500') ON CONFLICT DO NOTHING;
