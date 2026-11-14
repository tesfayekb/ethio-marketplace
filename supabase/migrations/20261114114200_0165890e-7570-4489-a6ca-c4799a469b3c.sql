-- e2e-areas: legal
-- Foundations 1, turn F1-3, part 8 of 12 — THE LEGAL DRAFT AND PUBLISH DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-3.md; ruling 1). admin_save_legal_draft,
-- admin_discard_legal_draft and admin_publish_legal_version are redeclared WHOLE from their last declarations (live
-- md5 checked). Each gate becomes ONE door_context('staff', legal:edit or :publish, staff_config) and the shell.
-- INC-834: the draft door is scoped by its country argument (match — a country holder saves only its own country's
-- draft; a draft for no country passes only a global holder); discard and publish stay global. The refusal sentences
-- become door_refuse codes and the language literals language_code calls. All three keep RETURNS jsonb and their
-- grants. Proofs on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_save_legal_draft(text,character,text,text,text,text,jsonb)', 'baf0a1bb63062668a0335b1f9647db0f'],
    ['public.admin_discard_legal_draft(uuid)', 'd2e79240e6784b25781c9c6cdc6dfd99'],
    ['public.admin_publish_legal_version(uuid,boolean,timestamp with time zone)', '61baef330e15b4f8fc829e0f519a22e0']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114130600') THEN
    RAISE EXCEPTION 'F1-3 part 8: part 7 (c2dc755f) must be applied first';
  END IF;
  IF to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-3 part 8: part 1''s language_code is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 8: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_save_legal_draft (whole from 20261029002140 :190; the gate on door_context scoped by the document's country and the shell)
CREATE OR REPLACE FUNCTION public.admin_save_legal_draft(p_kind text, p_country character, p_label text, p_body_en text, p_body_am text, p_changelog text, p_texts jsonb DEFAULT '{}'::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_d   public.legal_documents%ROWTYPE;
  v_v   public.legal_versions%ROWTYPE;
  v_text record;
  v_languages jsonb;
BEGIN
  PERFORM public.door_context('staff', 'legal', 'edit', 'staff_config', p_country, 'match');
  IF p_texts IS NULL OR jsonb_typeof(p_texts) <> 'object' THEN PERFORM public.door_refuse('badValue', 'texts'); END IF;
  FOR v_text IN SELECT key, value FROM jsonb_each(p_texts) LOOP
    IF v_text.key IN (public.language_code('base'), public.language_code('pair')) OR NOT EXISTS (
      SELECT 1 FROM public.languages l WHERE l.code = v_text.key AND l.enabled_admin
    ) THEN PERFORM public.door_refuse('badLanguage'); END IF;
    IF jsonb_typeof(v_text.value) <> 'string' THEN PERFORM public.door_refuse('badValue', 'texts'); END IF;
    IF length(v_text.value #>> '{}') > 200000 THEN PERFORM public.door_refuse('tooLong'); END IF;
  END LOOP;
  IF p_kind IS NULL OR (p_kind NOT IN ('terms', 'privacy', 'publishing') AND p_kind !~ '^e2e-[a-z0-9-]{1,40}$') THEN
    PERFORM public.door_refuse('badValue', 'kind');
  END IF;
  IF p_country IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = p_country) THEN
    PERFORM public.door_refuse('badValue', 'country');
  END IF;
  SELECT * INTO v_d FROM public.legal_documents d
   WHERE d.kind = p_kind AND d.country_code IS NOT DISTINCT FROM p_country;
  IF NOT FOUND THEN
    INSERT INTO public.legal_documents (kind, country_code) VALUES (p_kind, p_country)
    RETURNING * INTO v_d;
  END IF;
  IF p_label IS NULL OR length(btrim(p_label)) NOT BETWEEN 1 AND 60 THEN
    PERFORM public.door_refuse('labelRequired');
  END IF;
  IF EXISTS (SELECT 1 FROM public.legal_versions v
              WHERE v.document_id = v_d.id AND v.label = p_label AND v.status <> 'draft') THEN
    PERFORM public.door_refuse('labelTaken');
  END IF;
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.document_id = v_d.id AND v.status = 'draft';
  IF FOUND THEN
    IF EXISTS (SELECT 1 FROM public.legal_versions v
                WHERE v.document_id = v_d.id AND v.label = p_label AND v.id <> v_v.id) THEN
      PERFORM public.door_refuse('labelTaken');
    END IF;
    UPDATE public.legal_versions
       SET label = p_label, body_en = p_body_en, body_am = p_body_am, changelog = p_changelog
     WHERE id = v_v.id
    RETURNING * INTO v_v;
  ELSE
    INSERT INTO public.legal_versions (document_id, version, label, body_en, body_am, changelog, created_by)
    VALUES (v_d.id,
            coalesce((SELECT max(v.version) FROM public.legal_versions v WHERE v.document_id = v_d.id), 0) + 1,
            p_label, p_body_en, p_body_am, p_changelog, v_uid)
    RETURNING * INTO v_v;
  END IF;
  DELETE FROM public.legal_version_texts WHERE version_id = v_v.id;
  INSERT INTO public.legal_version_texts (version_id, language, body)
  SELECT v_v.id, key, value #>> '{}' FROM jsonb_each(p_texts)
   WHERE length(btrim(value #>> '{}')) > 0;
  SELECT coalesce(jsonb_agg(t.language ORDER BY t.language), '[]'::jsonb) INTO v_languages
    FROM public.legal_version_texts t WHERE t.version_id = v_v.id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.draft_saved', 'legal_version', v_v.id::text,
          jsonb_build_object('kind', v_d.kind, 'country_code', v_d.country_code,
                             'version', v_v.version, 'label', p_label, 'languages', v_languages));
  RETURN jsonb_build_object('ok', true, 'document_id', v_d.id, 'version_id', v_v.id, 'version', v_v.version);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_save_legal_draft', 'staff_config', SQLERRM);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_save_legal_draft(text, character, text, text, text, text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_legal_draft(text, character, text, text, text, text, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_save_legal_draft(text, character, text, text, text, text, jsonb) TO service_role;

-- ------------------------------------------------------------ 2. admin_discard_legal_draft (whole from 20261029002140 :57; the gate on door_context and the shell)
CREATE OR REPLACE FUNCTION public.admin_discard_legal_draft(p_version_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_v   public.legal_versions%ROWTYPE;
BEGIN
  PERFORM public.door_context('staff', 'legal', 'edit', 'staff_config', NULL, 'global');
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = p_version_id;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownVersion'); END IF;
  IF v_v.status <> 'draft' THEN PERFORM public.door_refuse('notDraft'); END IF;
  DELETE FROM public.legal_versions WHERE id = v_v.id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.draft_discarded', 'legal_version', v_v.id::text,
          jsonb_build_object('document_id', v_v.document_id, 'version', v_v.version, 'label', v_v.label));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_discard_legal_draft', 'staff_config', SQLERRM);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_discard_legal_draft(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_discard_legal_draft(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_discard_legal_draft(uuid) TO service_role;

-- ------------------------------------------------------------ 3. admin_publish_legal_version (whole from 20261029002140 :123; the gate on door_context and the shell)
CREATE OR REPLACE FUNCTION public.admin_publish_legal_version(p_version_id uuid, p_material boolean, p_effective_at timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid       uuid := auth.uid();
  v_v         public.legal_versions%ROWTYPE;
  v_notice    integer;
  v_effective timestamptz;
  v_snapshot  jsonb;
  v_problem   text;
BEGIN
  PERFORM public.door_context('staff', 'legal', 'publish', 'staff_config', NULL, 'global');
  IF p_material IS NULL THEN PERFORM public.door_refuse('badValue', 'material'); END IF;
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = p_version_id FOR UPDATE;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownVersion'); END IF;
  IF v_v.status <> 'draft' THEN PERFORM public.door_refuse('notDraft'); END IF;
  IF v_v.label IS NULL OR length(btrim(v_v.label)) NOT BETWEEN 1 AND 60 THEN
    PERFORM public.door_refuse('labelRequired');
  END IF;
  IF v_v.body_en IS NULL OR v_v.body_am IS NULL
     OR length(btrim(v_v.body_en)) = 0 OR length(btrim(v_v.body_am)) = 0 THEN
    PERFORM public.door_refuse('bothLanguages');
  END IF;
  IF v_v.changelog IS NULL OR length(btrim(v_v.changelog)) = 0 THEN
    PERFORM public.door_refuse('changelogRequired');
  END IF;
  SELECT s.notice_days INTO v_notice FROM public.legal_settings s WHERE s.id;
  SELECT to_jsonb(s) - 'id' - 'updated_at' - 'updated_by' INTO v_snapshot
    FROM public.legal_settings s WHERE s.id;
  v_problem := public.legal_text_fact_problem(v_v.body_en || E'\n' || v_v.body_am || E'\n' || (SELECT coalesce(string_agg(t.body, E'\n' ORDER BY t.language), '') FROM public.legal_version_texts t WHERE t.version_id = v_v.id), v_snapshot);
  IF v_problem LIKE 'unknownFact:%' THEN PERFORM public.door_refuse('unknownFact', substr(v_problem, 13)); END IF;
  IF v_problem IS NOT NULL THEN PERFORM public.door_refuse('factMissing', substr(v_problem, 13)); END IF;
  IF p_material THEN
    v_effective := coalesce(p_effective_at, now() + make_interval(days => v_notice));
    IF v_effective < now() + make_interval(days => v_notice) THEN
      PERFORM public.door_refuse('noticeTooShort');
    END IF;
  ELSE
    v_effective := coalesce(p_effective_at, now());
  END IF;
  UPDATE public.legal_versions
     SET status = 'published',
         material = p_material,
         effective_at = v_effective,
         published_at = now(),
         published_by = v_uid,
         settings_snapshot = v_snapshot
   WHERE id = v_v.id
  RETURNING * INTO v_v;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.published', 'legal_version', v_v.id::text,
          jsonb_build_object('document_id', v_v.document_id, 'version', v_v.version,
                             'label', v_v.label, 'material', p_material, 'effective_at', v_effective));
  RETURN jsonb_build_object('version_id', v_v.id, 'effective_at', v_effective);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_publish_legal_version', 'staff_config', SQLERRM);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_publish_legal_version(uuid, boolean, timestamp with time zone) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_publish_legal_version(uuid, boolean, timestamp with time zone) TO authenticated;
GRANT ALL ON FUNCTION public.admin_publish_legal_version(uuid, boolean, timestamp with time zone) TO service_role;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) catalog facts: the three doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and
--     service_role and not for anon or PUBLIC; every body this file's (md5).
-- (b) the gates: accountDeactivated; permissionDenied for a caller without legal:edit; INC-834 — a country holder (XZ)
--     is refused a draft for no country or another country (permissionDenied:scope), and the global discard and
--     publish; none spending staff_config or writing.
-- (c) each door's own codes, every earlier check cleared, the exact message, a 400, nothing written; a draft saved,
--     published and discarded, each with its row and audit line. labelRequired on publish cannot be reached (the version
--     table's CHECK holds every stored label to 1-60 characters). staff_config counted once per call past the gates;
--     every refusal metered.
-- (d) the country holder saves a draft for its own country.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_letters text;
  v_kind    text;
  v_kind2   text;
  v_lang    text;
  v_xz      character(2) := 'XZ';
  v_xy      character(2) := 'XY';
  v_qm      character(2) := 'QM';
  v_staff   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_cstaff  uuid := gen_random_uuid();
  v_reader  uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess_c  uuid := gen_random_uuid();
  v_role_s  uuid;
  v_doc     uuid;
  v_doc_xz  uuid;
  v_ver     uuid;
  v_ver2    uuid;
  v_ver_xz  uuid;
  v_ver_fx  uuid;
  v_answer  jsonb;
  v_before  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f13p8-' || substr(v_hex, 1, 10);
  -- one draw: letters only, for the scratch document kinds and language
  v_letters := translate(substr(v_hex, 11, 10), '0123456789', 'ghijkmnopr');
  v_kind := 'e2e-mig-' || v_letters;
  v_kind2 := 'e2e-mig-' || v_letters || '-xz';
  v_lang := 'q' || substr(v_letters, 1, 7);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_save_legal_draft(text,character,text,text,text,text,jsonb)', 'cb68d37406f87ffcfe46d0c675a6dbe8'],
    ['public.admin_discard_legal_draft(uuid)', '6290b36d609eea4ccefc6c770d3ea437'],
    ['public.admin_publish_legal_version(uuid,boolean,timestamp with time zone)', '25c0ccef4d171c47212d3f12265a0f4a']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 8 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 8 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_qm)) THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: a scratch country code already exists';
    END IF;
    IF EXISTS (SELECT 1 FROM public.languages WHERE code = v_lang) THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: the scratch language code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', true), (v_xy, v_tag || ' xy', true);
    INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
    VALUES (v_lang, v_tag, v_tag, true, false, 9001);
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, v_tag || '-staff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-deact@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_cstaff, v_tag || '-cstaff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_reader, v_tag || '-reader@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_staff, v_cstaff]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2'), (v_sess_c, v_cstaff, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess_c, now(), now(), 'totp');
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-legal', v_tag) RETURNING id INTO v_role_s;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_s, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'legal' AND p.action IN ('view', 'edit', 'publish', 'export');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_s) <> 4 THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: a legal permission of the legal role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_s, 'country', v_xz);

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_save_legal_draft', 'admin_discard_legal_draft', 'admin_publish_legal_version');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L1', 'en', 'am', 'c');
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L1', 'en', 'am', 'c');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (b) a caller without legal:edit answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L1', 'en', 'am', 'c');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (b) a country holder, a draft for no country answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft(v_kind, v_xy, 'L1', 'en', 'am', 'c');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (b) a country holder, a draft for another country answered %', v_answer;
    END IF;
    v_answer := public.admin_discard_legal_draft(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (b) a country holder, a discard answered %', v_answer;
    END IF;
    v_answer := public.admin_publish_legal_version(gen_random_uuid(), false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (b) a country holder, a publish answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.legal_documents WHERE kind = v_kind)) THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (b) a refused call wrote a document';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_save_legal_draft', 'admin_discard_legal_draft', 'admin_publish_legal_version')) IS DISTINCT FROM v_refused + 6 THEN
      RAISE EXCEPTION 'F1-3 part 8 (b) proof: door_refusals did not meter the 6 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_save_legal_draft', 'admin_discard_legal_draft', 'admin_publish_legal_version');
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L1', 'en', 'am', 'c', '[]'::jsonb);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:texts' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) texts that are not an object answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L1', 'en', 'am', 'c', jsonb_build_object(public.language_code('base'), 'x'));
    IF v_answer ->> 'message' IS DISTINCT FROM 'badLanguage' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) a base-language text answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L1', 'en', 'am', 'c', jsonb_build_object(v_lang, 1));
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:texts' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) a text that is not a string answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L1', 'en', 'am', 'c', jsonb_build_object(v_lang, repeat('x', 200001)));
    IF v_answer ->> 'message' IS DISTINCT FROM 'tooLong' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) a text over 200000 characters answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft('nope', NULL, 'L1', 'en', 'am', 'c');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:kind' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) an unknown kind answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft(v_kind, v_qm, 'L1', 'en', 'am', 'c');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:country' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) an unknown country answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft(v_kind, NULL, ' ', 'en', 'am', 'c');
    IF v_answer ->> 'message' IS DISTINCT FROM 'labelRequired' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) a draft without a label answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L1', 'Body', NULL, NULL);
    IF NOT ((v_answer ->> 'ok')::boolean AND (v_answer ->> 'version')::integer = 1) THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) the draft answered otherwise';
    END IF;
    v_doc := (v_answer ->> 'document_id')::uuid;
    v_ver := (v_answer ->> 'version_id')::uuid;
    v_answer := public.admin_publish_legal_version(v_ver, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:material' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) publish without the material choice answered %', v_answer;
    END IF;
    v_answer := public.admin_publish_legal_version(gen_random_uuid(), false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownVersion' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) publish of an unknown version answered %', v_answer;
    END IF;
    v_answer := public.admin_publish_legal_version(v_ver, false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'bothLanguages' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) publish of a draft in one language answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L1', 'Body', 'Body am', NULL);
    v_answer := public.admin_publish_legal_version(v_ver, false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'changelogRequired' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) publish of a draft without a change log answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L1', 'Body {{qz_mig_nofact}}', 'Body am', 'c');
    v_answer := public.admin_publish_legal_version(v_ver, false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownFact:qz_mig_nofact' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) publish of a draft naming an unknown fact answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L1', 'Body', 'Body am', 'c');
    v_answer := public.admin_publish_legal_version(v_ver, true, now() - interval '1 day');
    IF v_answer ->> 'message' IS DISTINCT FROM 'noticeTooShort' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) a material version effective in the past answered %', v_answer;
    END IF;
    v_answer := public.admin_publish_legal_version(v_ver, false);
    IF NOT ((v_answer ->> 'version_id')::uuid = v_ver) THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) publish answered otherwise';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.legal_versions WHERE id = v_ver AND status = 'published' AND published_by = v_staff AND settings_snapshot IS NOT NULL)) THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) the published version differs';
    END IF;
    v_answer := public.admin_publish_legal_version(v_ver, false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notDraft' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) publish of a published version answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L1', 'Body', 'Body am', 'c');
    IF v_answer ->> 'message' IS DISTINCT FROM 'labelTaken' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) a label a published version holds answered %', v_answer;
    END IF;
    v_answer := public.admin_discard_legal_draft(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownVersion' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) discard of an unknown version answered %', v_answer;
    END IF;
    v_answer := public.admin_discard_legal_draft(v_ver);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notDraft' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) discard of a published version answered %', v_answer;
    END IF;
    v_answer := public.admin_save_legal_draft(v_kind, NULL, 'L2', 'Body', 'Body am', 'c');
    v_ver2 := (v_answer ->> 'version_id')::uuid;
    v_answer := public.admin_discard_legal_draft(v_ver2);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) discard did not answer ok';
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.legal_versions WHERE id = v_ver2)) THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (c) the discarded draft remains';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('legal.published', 'legal.draft_discarded')) <> 2 THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: the publish and discard wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('legal.published', 'legal.draft_discarded'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 24 THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: the dial staff_config counted % for (c) the staff editor (expected %)', v_count, 24;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_save_legal_draft', 'admin_discard_legal_draft', 'admin_publish_legal_version')) IS DISTINCT FROM v_refused + 17 THEN
      RAISE EXCEPTION 'F1-3 part 8 (c) proof: door_refusals did not meter the 17 refusals';
    END IF;

    -- (d) the country holder's own country
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_save_legal_draft(v_kind2, v_xz, 'L1', 'Body', 'Body am', 'c');
    IF NOT ((v_answer ->> 'ok')::boolean AND EXISTS (SELECT 1 FROM public.legal_documents WHERE kind = v_kind2 AND country_code = v_xz)) THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: (d) the country holder''s draft answered otherwise';
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'staff_config';
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-3 part 8 proof: the dial staff_config counted % for (d) the country holder (expected %)', v_count, 1;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f13p8-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f13p8-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114130700') ON CONFLICT DO NOTHING;
