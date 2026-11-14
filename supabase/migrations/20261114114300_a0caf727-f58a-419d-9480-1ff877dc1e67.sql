-- e2e-areas: legal
-- Foundations 1, turn F1-3, part 9 of 12 — THE LEGAL TRANSLATION, REVIEW AND EXPORT DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-3.md; ruling 1). admin_add_legal_translation,
-- admin_mark_legal_reviewed and admin_export_legal_acceptances are redeclared WHOLE from their last declarations (live
-- md5 checked). Each gate becomes ONE door_context('staff', legal:publish, :edit or :export, the manifest's dial) and
-- the shell. INC-834: each is scoped by its target's country (match), the document's country read before the gate — a
-- country holder writes only its own country's rows; a global document, or a row that does not exist, passes only a
-- global holder. The export passes the gate, spends legal_export and writes its audit line on every call, the line
-- naming the page's cursor and row count (ruling 1 item 4(a), DEC-383). The refusal sentences become door_refuse codes
-- and the language literals language_code calls. All three keep RETURNS jsonb and their grants. Proofs on scratch rows
-- under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_add_legal_translation(uuid,text,text)', 'dcc64aace95421a2ee96b27af948b744'],
    ['public.admin_mark_legal_reviewed(uuid,text)', '390bb8aaa7135d8808845d562c9fa0fe'],
    ['public.admin_export_legal_acceptances(uuid,timestamp with time zone,uuid,integer)', '628e71d63aef14abf983de2e330d7b82']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114130700') THEN
    RAISE EXCEPTION 'F1-3 part 9: part 8 (0165890e) must be applied first';
  END IF;
  IF to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-3 part 9: part 1''s language_code is missing';
  END IF;
  IF (SELECT count(*) FROM public.rate_dials WHERE action IN ('staff_config', 'legal_export')) <> 2 THEN
    RAISE EXCEPTION 'F1-3 part 9: a dial of these doors is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 9: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_add_legal_translation (whole from 20261029002140 :13; the gate on door_context scoped by the version's document country and the shell)
CREATE OR REPLACE FUNCTION public.admin_add_legal_translation(p_version_id uuid, p_language text, p_body text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_v public.legal_versions%ROWTYPE;
  v_d public.legal_documents%ROWTYPE;
  v_problem text;
  v_scope character(2);
BEGIN
  SELECT d.country_code INTO v_scope FROM public.legal_versions v JOIN public.legal_documents d ON d.id = v.document_id WHERE v.id = p_version_id;
  PERFORM public.door_context('staff', 'legal', 'publish', 'staff_config', v_scope, 'match');
  SELECT * INTO v_v FROM public.legal_versions WHERE id = p_version_id FOR UPDATE;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownVersion'); END IF;
  IF v_v.status <> 'published' THEN PERFORM public.door_refuse('notPublished'); END IF;
  IF p_language IS NULL OR p_language IN (public.language_code('base'), public.language_code('pair')) OR NOT EXISTS (
    SELECT 1 FROM public.languages l WHERE l.code = p_language AND l.enabled_admin
  ) THEN PERFORM public.door_refuse('badLanguage'); END IF;
  IF p_body IS NULL OR length(btrim(p_body)) = 0 THEN PERFORM public.door_refuse('badValue', 'body'); END IF;
  IF length(p_body) > 200000 THEN PERFORM public.door_refuse('tooLong'); END IF;
  IF EXISTS (SELECT 1 FROM public.legal_version_texts t WHERE t.version_id = v_v.id AND t.language = p_language) THEN
    PERFORM public.door_refuse('translationExists');
  END IF;
  v_problem := public.legal_text_fact_problem(p_body, v_v.settings_snapshot);
  IF v_problem LIKE 'unknownFact:%' THEN PERFORM public.door_refuse('unknownFact', substr(v_problem, 13)); END IF;
  IF v_problem IS NOT NULL THEN PERFORM public.door_refuse('factMissing', substr(v_problem, 13)); END IF;
  SELECT * INTO v_d FROM public.legal_documents WHERE id = v_v.document_id;
  INSERT INTO public.legal_version_texts (version_id, language, body) VALUES (v_v.id, p_language, p_body);
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.translation_added', 'legal_version', v_v.id::text,
    jsonb_build_object('kind', v_d.kind, 'country_code', v_d.country_code,
      'version', v_v.version, 'label', v_v.label, 'language', p_language));
  RETURN jsonb_build_object('ok', true, 'version_id', v_v.id, 'language', p_language);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_add_legal_translation', 'staff_config', SQLERRM);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_add_legal_translation(uuid, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_add_legal_translation(uuid, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_add_legal_translation(uuid, text, text) TO service_role;

-- ------------------------------------------------------------ 2. admin_mark_legal_reviewed (whole from 20261029002140 :87; the gate on door_context scoped by the document's country and the shell)
CREATE OR REPLACE FUNCTION public.admin_mark_legal_reviewed(p_document_id uuid, p_note text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_note text := btrim(coalesce(p_note, ''));
  v_row  public.legal_reviews%ROWTYPE;
  v_scope character(2);
BEGIN
  SELECT d.country_code INTO v_scope FROM public.legal_documents d WHERE d.id = p_document_id;
  PERFORM public.door_context('staff', 'legal', 'edit', 'staff_config', v_scope, 'match');
  IF p_document_id IS NULL OR NOT EXISTS (SELECT 1 FROM public.legal_versions v
                                           WHERE v.document_id = p_document_id AND v.status = 'published') THEN
    PERFORM public.door_refuse('nothingToReview');
  END IF;
  IF length(v_note) < 1 OR length(v_note) > 2000 THEN PERFORM public.door_refuse('badValue', 'note'); END IF;
  INSERT INTO public.legal_reviews (document_id, reviewed_by, home_country_code, note)
  VALUES (p_document_id, v_uid,
          (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = v_uid), v_note)
  RETURNING * INTO v_row;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.reviewed', 'legal_document', p_document_id::text,
          jsonb_build_object('review_id', v_row.id, 'note', v_note));
  RETURN jsonb_build_object('reviewed_at', v_row.reviewed_at, 'due_at', public.legal_review_due(p_document_id));
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_mark_legal_reviewed', 'staff_config', SQLERRM);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_mark_legal_reviewed(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_mark_legal_reviewed(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_mark_legal_reviewed(uuid, text) TO service_role;

-- ------------------------------------------------------------ 3. admin_export_legal_acceptances (whole from 20261028230748 :199; the gate on door_context scoped by the version's document country, its dial and audit line on every page, and the shell)
CREATE OR REPLACE FUNCTION public.admin_export_legal_acceptances(p_version_id uuid, p_after_at timestamp with time zone DEFAULT NULL::timestamp with time zone, p_after_id uuid DEFAULT NULL::uuid, p_limit integer DEFAULT 1000)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid     uuid := auth.uid();
  v_version integer;
  v_kind    text;
  v_country char(2);
  v_scope   char(2);
  v_rows    jsonb;
  v_count   integer;
  v_last_at timestamptz;
  v_last_id uuid;
BEGIN
  SELECT d.country_code INTO v_scope FROM public.legal_versions v JOIN public.legal_documents d ON d.id = v.document_id WHERE v.id = p_version_id;
  PERFORM public.door_context('staff', 'legal', 'export', 'legal_export', v_scope, 'match');
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 5000 THEN PERFORM public.door_refuse('badValue', 'limit'); END IF;
  IF (p_after_at IS NULL) <> (p_after_id IS NULL) THEN PERFORM public.door_refuse('badValue', 'after'); END IF;
  SELECT v.version, d.kind, d.country_code INTO v_version, v_kind, v_country
    FROM public.legal_versions v
    JOIN public.legal_documents d ON d.id = v.document_id
   WHERE v.id = p_version_id AND v.status = 'published';
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownVersion'); END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'account_id', p.user_id,
           'accepted_at', p.accepted_at,
           'language', p.language,
           'method', p.method,
           'home_country', p.home_country_code,
           'adult_confirmed', p.adult_confirmed,
           'data_consent', p.data_consent) ORDER BY p.accepted_at, p.id), '[]'::jsonb),
         count(*)
    INTO v_rows, v_count
    FROM (SELECT a.id, a.user_id, a.accepted_at, a.language, a.method, a.home_country_code,
                 a.adult_confirmed, a.data_consent
            FROM public.legal_acceptances a
           WHERE a.version_id = p_version_id
             AND (p_after_at IS NULL OR (a.accepted_at, a.id) > (p_after_at, p_after_id))
           ORDER BY a.accepted_at, a.id
           LIMIT p_limit) p;
  SELECT a.accepted_at, a.id INTO v_last_at, v_last_id
    FROM public.legal_acceptances a
   WHERE a.version_id = p_version_id
     AND (p_after_at IS NULL OR (a.accepted_at, a.id) > (p_after_at, p_after_id))
   ORDER BY a.accepted_at, a.id
   OFFSET greatest(v_count - 1, 0) LIMIT 1;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.acceptances_exported', 'legal_version', p_version_id::text,
          jsonb_build_object('kind', v_kind, 'country', v_country, 'version', v_version,
                             'after_at', p_after_at, 'after_id', p_after_id, 'row_count', v_count));
  RETURN jsonb_build_object(
    'version', v_version,
    'kind', v_kind,
    'country_code', v_country,
    'rows', v_rows,
    'next', CASE WHEN v_count = p_limit THEN jsonb_build_object('at', v_last_at, 'id', v_last_id) END);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_export_legal_acceptances', 'legal_export', SQLERRM);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_export_legal_acceptances(uuid, timestamp with time zone, uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_legal_acceptances(uuid, timestamp with time zone, uuid, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_export_legal_acceptances(uuid, timestamp with time zone, uuid, integer) TO service_role;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) catalog facts: the three doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and
--     service_role and not for anon or PUBLIC; every body this file's (md5).
-- (b) the gates: accountDeactivated; permissionDenied for a caller without the legal permission; INC-834 — a country
--     holder (XZ) is refused every door on a global document and on a version or document that does not exist
--     (permissionDenied:scope); none spending a dial or writing.
-- (c) each door's own codes, every earlier check cleared, the exact message, a 400, nothing written; a translation and
--     a review, each with its row and audit line; the export metered and audited on its first page and on a later page
--     alike — one legal_export count and one audit line each, the line naming the page's cursor and row count.
--     factMissing is driven on a version whose settings snapshot the proof writes. staff_config and legal_export
--     counted once per call past the gates; every refusal metered.
-- (d) the country holder translates, reviews and exports its own country's document.
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
  v_tag := 'e2e-mig-f13p9-' || substr(v_hex, 1, 10);
  -- one draw: letters only, for the scratch document kinds and language
  v_letters := translate(substr(v_hex, 11, 10), '0123456789', 'ghijkmnopr');
  v_kind := 'e2e-mig-' || v_letters;
  v_kind2 := 'e2e-mig-' || v_letters || '-xz';
  v_lang := 'q' || substr(v_letters, 1, 7);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_add_legal_translation(uuid,text,text)', '074a321525e6a6eef0da4888282e6847'],
    ['public.admin_mark_legal_reviewed(uuid,text)', '9a80c828651a2a0d189e95b68f1d53da'],
    ['public.admin_export_legal_acceptances(uuid,timestamp with time zone,uuid,integer)', 'ab4feb71a682d3caf98c37f54170a5f7']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 9 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 9 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_qm)) THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: a scratch country code already exists';
    END IF;
    IF EXISTS (SELECT 1 FROM public.languages WHERE code = v_lang) THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the scratch language code already exists';
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
      RAISE EXCEPTION 'F1-3 part 9 proof: a legal permission of the legal role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_s, 'country', v_xz);
    INSERT INTO public.legal_documents (kind, country_code) VALUES (v_kind, NULL) RETURNING id INTO v_doc;
    INSERT INTO public.legal_documents (kind, country_code) VALUES (v_kind2, v_xz) RETURNING id INTO v_doc_xz;
    INSERT INTO public.legal_versions (document_id, version, label, body_en, body_am, changelog, created_by, status,
                                       material, effective_at, published_at, published_by, settings_snapshot)
    VALUES (v_doc, 1, 'L1', 'Body', 'Body am', 'c', v_staff, 'published', false, now(), now(), v_staff,
            '{}'::jsonb)
    RETURNING id INTO v_ver;
    INSERT INTO public.legal_versions (document_id, version, label, body_en, body_am, changelog, created_by, status,
                                       material, effective_at, published_at, published_by, settings_snapshot)
    VALUES (v_doc, 2, 'L2', 'Body', 'Body am', 'c', v_staff, 'published', false, now(), now(), v_staff,
            '{"qz_mig_fact": ""}'::jsonb)
    RETURNING id INTO v_ver_fx;
    INSERT INTO public.legal_versions (document_id, version, label, body_en, body_am, changelog, created_by, status,
                                       material, effective_at, published_at, published_by, settings_snapshot)
    VALUES (v_doc_xz, 1, 'L1', 'Body', 'Body am', 'c', v_staff, 'published', false, now(), now(), v_staff,
            '{}'::jsonb)
    RETURNING id INTO v_ver_xz;
    INSERT INTO public.legal_versions (document_id, version, label, body_en, body_am, changelog, created_by)
    VALUES (v_doc, 3, 'L3', 'Body', 'Body am', 'c', v_staff) RETURNING id INTO v_ver2;
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method, adult_confirmed)
    VALUES (v_plain, v_ver, public.language_code('base'), 'e2e', true), (v_reader, v_ver, public.language_code('base'), 'e2e', true);

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_add_legal_translation', 'admin_mark_legal_reviewed', 'admin_export_legal_acceptances');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_add_legal_translation(v_ver, v_lang, 'Text');
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_export_legal_acceptances(v_ver);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (b) a caller without legal:export answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_add_legal_translation(gen_random_uuid(), v_lang, 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (b) a country holder, a translation of an unknown version answered %', v_answer;
    END IF;
    v_answer := public.admin_mark_legal_reviewed(gen_random_uuid(), 'n');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (b) a country holder, a review of an unknown document answered %', v_answer;
    END IF;
    v_answer := public.admin_export_legal_acceptances(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (b) a country holder, an export of an unknown version answered %', v_answer;
    END IF;
    v_answer := public.admin_add_legal_translation(v_ver, v_lang, 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (b) a country holder, a translation of a global version answered %', v_answer;
    END IF;
    v_answer := public.admin_mark_legal_reviewed(v_doc, 'n');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (b) a country holder, a review of a global document answered %', v_answer;
    END IF;
    v_answer := public.admin_export_legal_acceptances(v_ver);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (b) a country holder, an export of a global version answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'legal_export';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the dial legal_export counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the dial staff_config counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'legal_export';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the dial legal_export counted % for (b) the refused callers (expected %)', v_count, 0;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.legal_version_texts WHERE version_id IN (v_ver, v_ver_xz)) AND NOT EXISTS (SELECT 1 FROM public.legal_reviews WHERE document_id IN (v_doc, v_doc_xz)) AND NOT EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_plain, v_cstaff, v_deact))) THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (b) a refused call wrote';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_add_legal_translation', 'admin_mark_legal_reviewed', 'admin_export_legal_acceptances')) IS DISTINCT FROM v_refused + 8 THEN
      RAISE EXCEPTION 'F1-3 part 9 (b) proof: door_refusals did not meter the 8 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_add_legal_translation', 'admin_mark_legal_reviewed', 'admin_export_legal_acceptances');
    v_answer := public.admin_add_legal_translation(gen_random_uuid(), v_lang, 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownVersion' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) a translation of an unknown version answered %', v_answer;
    END IF;
    v_answer := public.admin_add_legal_translation(v_ver2, v_lang, 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'notPublished' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) a translation of a draft answered %', v_answer;
    END IF;
    v_answer := public.admin_add_legal_translation(v_ver, public.language_code('pair'), 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badLanguage' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) a translation into the pair language answered %', v_answer;
    END IF;
    v_answer := public.admin_add_legal_translation(v_ver, v_lang, ' ');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:body' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) an empty translation answered %', v_answer;
    END IF;
    v_answer := public.admin_add_legal_translation(v_ver, v_lang, repeat('x', 200001));
    IF v_answer ->> 'message' IS DISTINCT FROM 'tooLong' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) a translation over 200000 characters answered %', v_answer;
    END IF;
    v_answer := public.admin_add_legal_translation(v_ver, v_lang, 'x {{qz_mig_nofact}}');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownFact:qz_mig_nofact' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) a translation naming an unknown fact answered %', v_answer;
    END IF;
    v_answer := public.admin_add_legal_translation(v_ver_fx, v_lang, 'x {{qz_mig_fact}}');
    IF v_answer ->> 'message' IS DISTINCT FROM 'factMissing:qz_mig_fact' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) a translation naming an empty fact answered %', v_answer;
    END IF;
    v_answer := public.admin_add_legal_translation(v_ver, v_lang, 'Text');
    IF NOT ((v_answer ->> 'ok')::boolean AND v_answer ->> 'language' = v_lang AND EXISTS (SELECT 1 FROM public.legal_version_texts WHERE version_id = v_ver AND language = v_lang AND body = 'Text')) THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) the translation answered otherwise';
    END IF;
    v_answer := public.admin_add_legal_translation(v_ver, v_lang, 'Text');
    IF v_answer ->> 'message' IS DISTINCT FROM 'translationExists' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) a second translation into one language answered %', v_answer;
    END IF;
    v_answer := public.admin_mark_legal_reviewed(gen_random_uuid(), 'n');
    IF v_answer ->> 'message' IS DISTINCT FROM 'nothingToReview' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) a review of a document without a published version answered %', v_answer;
    END IF;
    v_answer := public.admin_mark_legal_reviewed(v_doc, ' ');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:note' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) a review without a note answered %', v_answer;
    END IF;
    v_answer := public.admin_mark_legal_reviewed(v_doc, 'e2e review');
    IF NOT (v_answer ? 'reviewed_at' AND EXISTS (SELECT 1 FROM public.legal_reviews WHERE document_id = v_doc AND reviewed_by = v_staff)) THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) the review answered otherwise';
    END IF;
    v_answer := public.admin_export_legal_acceptances(v_ver, NULL, NULL, 0);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:limit' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) an export page of no rows answered %', v_answer;
    END IF;
    v_answer := public.admin_export_legal_acceptances(v_ver, now(), NULL, 1);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:after' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) an export cursor in one half answered %', v_answer;
    END IF;
    v_answer := public.admin_export_legal_acceptances(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownVersion' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) an export of an unknown version answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'legal_export';
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the dial legal_export counted % for (c) the export refusals (expected %)', v_count, 3;
    END IF;
    v_answer := public.admin_export_legal_acceptances(v_ver, NULL, NULL, 1);
    IF NOT (jsonb_array_length(v_answer -> 'rows') = 1 AND jsonb_typeof(v_answer -> 'next') = 'object') THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) the first export page answered otherwise';
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'legal_export';
    IF v_count <> 4 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the dial legal_export counted % for (c) the first export page (expected %)', v_count, 4;
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('legal.acceptances_exported')) <> 1 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the first export page wrote % audit lines (expected 1)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('legal.acceptances_exported'));
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id = v_staff AND action = 'legal.acceptances_exported' AND (meta ->> 'row_count')::integer = 1 AND meta -> 'after_at' = 'null'::jsonb)) THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) the first page''s audit line differs';
    END IF;
    v_answer := public.admin_export_legal_acceptances(v_ver, (v_answer -> 'next' ->> 'at')::timestamptz, (v_answer -> 'next' ->> 'id')::uuid, 1);
    IF NOT (jsonb_array_length(v_answer -> 'rows') = 1) THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) the later export page answered otherwise';
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'legal_export';
    IF v_count <> 5 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the dial legal_export counted % for (c) the later export page (expected %)', v_count, 5;
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('legal.acceptances_exported')) <> 2 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the later export page wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('legal.acceptances_exported'));
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id = v_staff AND action = 'legal.acceptances_exported' AND (meta ->> 'row_count')::integer = 1 AND meta -> 'after_at' <> 'null'::jsonb AND meta -> 'after_id' <> 'null'::jsonb)) THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (c) the later page''s audit line differs';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('legal.translation_added', 'legal.reviewed')) <> 2 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the translation and review wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('legal.translation_added', 'legal.reviewed'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 12 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the dial staff_config counted % for (c) the staff editor (expected %)', v_count, 12;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_add_legal_translation', 'admin_mark_legal_reviewed', 'admin_export_legal_acceptances')) IS DISTINCT FROM v_refused + 13 THEN
      RAISE EXCEPTION 'F1-3 part 9 (c) proof: door_refusals did not meter the 13 refusals';
    END IF;

    -- (d) the country holder's own country
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_add_legal_translation(v_ver_xz, v_lang, 'Text');
    IF NOT ((v_answer ->> 'ok')::boolean) THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (d) the country holder''s translation answered otherwise';
    END IF;
    v_answer := public.admin_mark_legal_reviewed(v_doc_xz, 'e2e review');
    IF NOT (v_answer ? 'reviewed_at') THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (d) the country holder''s review answered otherwise';
    END IF;
    v_answer := public.admin_export_legal_acceptances(v_ver_xz);
    IF NOT (v_answer ->> 'country_code' = v_xz AND jsonb_array_length(v_answer -> 'rows') = 0) THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: (d) the country holder''s export answered otherwise';
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'legal_export';
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the dial legal_export counted % for (d) the country holder (expected %)', v_count, 1;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'staff_config';
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-3 part 9 proof: the dial staff_config counted % for (d) the country holder (expected %)', v_count, 2;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f13p9-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f13p9-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114130800') ON CONFLICT DO NOTHING;
