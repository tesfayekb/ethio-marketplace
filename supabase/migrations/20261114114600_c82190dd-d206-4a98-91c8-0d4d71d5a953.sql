-- e2e-areas: legal
-- Foundations 1, turn F1-3, part 12 of 12 — THE LEGAL READERS ONTO DOOR_CONTEXT (DEC-333; brief
-- docs/governance/briefs/f1-doors-3.md; ruling 1). The six legal readers are redeclared WHOLE from their last
-- declarations (live md5 checked, CREATE OR REPLACE, return shapes and grants kept): each gate becomes ONE
-- door_context('staff-reader', legal:view or :edit, or profiles:view, global) — a staff reader owes its permission and
-- no second factor, spends no dial and takes no shell: its refusal raises — and the refusal sentences become
-- door_refuse codes (unknownVersion, unknownUser); legal_review_overdue refuses a caller without legal:view instead of
-- answering false; the language literals become language_code calls. user_has_translation_permission, which no code,
-- policy or body calls, is closed to browser roles (ruling 1 item 4(e)). Proofs on scratch rows under a sentinel
-- rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_legal_documents()', '2c888cc34f8d72b5749d05bd87755378'],
    ['public.admin_legal_version(uuid)', '3c3ca58a5432ef2867639eafcccada65'],
    ['public.admin_legal_settings()', '2d59432c2527e7429d99ba293655f3b1'],
    ['public.legal_review_overdue()', 'f76983a0bfe12e3ae5a7289dd7a3d37c'],
    ['public.admin_user_legal_history(uuid)', '37ff6b882a31735bf2f1ba18ad33456d'],
    ['public.base_languages()', '973e515da2826cb33ca4f3d339bb70e8']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114131000') THEN
    RAISE EXCEPTION 'F1-3 part 12: part 11 (fedfce7d) must be applied first';
  END IF;
  IF to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-3 part 12: part 1''s language_code is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 12: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_legal_documents (whole from 20261024045415 :7; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_legal_documents()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  PERFORM public.door_context('staff-reader', 'legal', 'view', NULL, NULL, 'global');
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'document_id', d.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'review', (SELECT jsonb_build_object('at', e.at, 'kind', e.kind, 'by_name', p.display_name,
                                                  'note', e.note, 'due_at', public.legal_review_due(d.id))
                          FROM (SELECT v.published_at AS at, 'publish'::text AS kind, v.published_by AS who,
                                       NULL::text AS note
                                  FROM public.legal_versions v
                                 WHERE v.document_id = d.id AND v.status = 'published'
                                UNION ALL
                                SELECT r.reviewed_at, 'review', r.reviewed_by, r.note
                                  FROM public.legal_reviews r
                                 WHERE r.document_id = d.id) e
                          LEFT JOIN public.profiles p ON p.user_id = e.who
                         ORDER BY e.at DESC, (e.kind = 'review') DESC
                         LIMIT 1),
             'versions', coalesce((
               SELECT jsonb_agg(jsonb_build_object(
                        'version_id', v.id,
                        'version', v.version,
                        'status', v.status,
                        'label', v.label,
                        'material', v.material,
                        'effective_at', v.effective_at,
                        'published_at', v.published_at,
                        'published_by_name', p.display_name,
                        'acceptances', (SELECT count(*) FROM public.legal_acceptances a
                                         WHERE a.version_id = v.id),
                        'signed_in_unaccepted', public.legal_signed_in_unaccepted(v.id),
                        'languages', (SELECT coalesce(jsonb_agg(t.language ORDER BY t.language), '[]'::jsonb) FROM public.legal_version_texts t WHERE t.version_id = v.id),
                        'missing_languages', (SELECT coalesce(jsonb_agg(jsonb_build_object('code', l.code, 'name_en', l.name_en) ORDER BY l.sort, l.code), '[]'::jsonb) FROM public.languages l WHERE l.enabled_admin AND l.code NOT IN (public.language_code('base'), public.language_code('pair'), public.language_code('pseudo')) AND NOT EXISTS (SELECT 1 FROM public.legal_version_texts t WHERE t.version_id = v.id AND t.language = l.code)),
                        'created_at', v.created_at)
                      ORDER BY v.version DESC)
                 FROM public.legal_versions v
                 LEFT JOIN public.profiles p ON p.user_id = v.published_by
                WHERE v.document_id = d.id), '[]'::jsonb))
           ORDER BY array_position(ARRAY['terms', 'privacy', 'publishing'], d.kind) NULLS LAST,
                    d.kind, d.country_code NULLS FIRST)
      FROM public.legal_documents d), '[]'::jsonb);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_legal_documents() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 2. admin_legal_version (whole from 20261024045415 :66; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_legal_version(p_version_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_v   public.legal_versions%ROWTYPE;
  v_d   public.legal_documents%ROWTYPE;
BEGIN
  PERFORM public.door_context('staff-reader', 'legal', 'view', NULL, NULL, 'global');
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = p_version_id;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownVersion'); END IF;
  SELECT * INTO v_d FROM public.legal_documents d WHERE d.id = v_v.document_id;
  RETURN jsonb_build_object(
    'version_id', v_v.id,
    'document_id', v_d.id,
    'kind', v_d.kind,
    'country_code', v_d.country_code,
    'version', v_v.version,
    'status', v_v.status,
    'label', v_v.label,
    'body_en', v_v.body_en,
    'body_am', v_v.body_am,
             'texts', (SELECT coalesce(jsonb_object_agg(t.language, t.body ORDER BY t.language), '{}'::jsonb) FROM public.legal_version_texts t WHERE t.version_id = v_v.id),
    'missing_languages', (SELECT coalesce(jsonb_agg(jsonb_build_object('code', l.code, 'name_en', l.name_en) ORDER BY l.sort, l.code), '[]'::jsonb) FROM public.languages l WHERE l.enabled_admin AND l.code NOT IN (public.language_code('base'), public.language_code('pair'), public.language_code('pseudo')) AND NOT EXISTS (SELECT 1 FROM public.legal_version_texts t WHERE t.version_id = v_v.id AND t.language = l.code)),
    'changelog', v_v.changelog,
    'material', v_v.material,
    'effective_at', v_v.effective_at,
    'published_at', v_v.published_at,
    'published_by', v_v.published_by,
    'created_by', v_v.created_by,
    'settings_snapshot', v_v.settings_snapshot,
    'created_at', v_v.created_at);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_legal_version(uuid) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 3. admin_legal_settings (whole from 20261019063635 :267; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_legal_settings()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  PERFORM public.door_context('staff-reader', 'legal', 'view', NULL, NULL, 'global');
  RETURN (SELECT to_jsonb(s) - 'id' FROM public.legal_settings s WHERE s.id);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_legal_settings() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 4. legal_review_overdue (whole from 20261021092329 :133; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.legal_review_overdue()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  PERFORM public.door_context('staff-reader', 'legal', 'view', NULL, NULL, 'global');
  RETURN EXISTS (
    SELECT 1 FROM public.legal_documents d
     WHERE (d.kind IN ('terms', 'privacy', 'publishing')
            OR d.kind = 'e2e-rev-u' || replace(v_uid::text, '-', ''))
       AND public.legal_review_due(d.id) <= now());
END;
$$;
REVOKE ALL ON FUNCTION public.legal_review_overdue() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 5. admin_user_legal_history (whole from 20261019103558 :294; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_user_legal_history(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  PERFORM public.door_context('staff-reader', 'profiles', 'view', NULL, NULL, 'global');
  IF NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = p_user_id) THEN
    PERFORM public.door_refuse('unknownUser');
  END IF;
  RETURN jsonb_build_object(
    'acceptances', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
               'version_id', a.version_id,
               'kind', d.kind,
               'country_code', d.country_code,
               'version', v.version,
               'label', v.label,
               'accepted_at', a.accepted_at,
               'language', a.language,
               'method', a.method,
               'adult_confirmed', a.adult_confirmed,
               'data_consent', a.data_consent)
             ORDER BY a.accepted_at DESC)
        FROM public.legal_acceptances a
        JOIN public.legal_versions v ON v.id = a.version_id
        JOIN public.legal_documents d ON d.id = v.document_id
       WHERE a.user_id = p_user_id), '[]'::jsonb),
    'notices', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
               'version_id', n.version_id,
               'kind', d.kind,
               'country_code', d.country_code,
               'version', v.version,
               'label', v.label,
               'channel', n.channel,
               'status', n.status,
               'sent_at', n.sent_at)
             ORDER BY n.sent_at DESC)
        FROM public.legal_notices n
        JOIN public.legal_versions v ON v.id = n.version_id
        JOIN public.legal_documents d ON d.id = v.document_id
       WHERE n.user_id = p_user_id), '[]'::jsonb));
END;
$$;
REVOKE ALL ON FUNCTION public.admin_user_legal_history(uuid) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 6. base_languages (whole from 20261106051700 :77; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.base_languages()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path = public
AS $$
BEGIN
  PERFORM public.door_context('staff-reader', 'legal', 'edit', NULL, NULL, 'global');
  RETURN (SELECT coalesce(jsonb_agg(jsonb_build_object('code', l.code, 'name_en', l.name_en, 'name_native', l.name_native)
                                    ORDER BY l.sort, l.code), '[]'::jsonb)
            FROM public.languages l
           WHERE l.enabled_admin AND NOT l.is_base AND l.code NOT IN (public.language_code('pair'), public.language_code('pseudo')));
END $$;
REVOKE ALL ON FUNCTION public.base_languages() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 7. user_has_translation_permission (no code, policy or body calls it — census F1-1; closed to browser roles, ruling 1 item 4(e))
REVOKE ALL ON FUNCTION public.user_has_translation_permission(uuid) FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------ 8. PROOFS
-- (a) catalog facts: the 6 readers STABLE SECURITY DEFINER, EXECUTE for authenticated and not for anon or
--     PUBLIC, every body this file's (md5); user_has_translation_permission closed to browser roles.
-- (b) the gates: no caller → notSignedIn, a caller without the reader's permission → permissionDenied, each raised as
--     P0D01 (a reader takes no shell: its refusal is the error); legal_review_overdue refuses, never answers false.
-- (c) a holder of legal:view and :edit and profiles:view reads every reader; the readers' own codes (unknownVersion,
--     unknownUser); the missing languages leave out the base, pair and pseudo languages and name an admin-enabled scratch
--     language; base_languages names it.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_letters text;
  v_lang    text;
  v_kind    text;
  v_key     text;
  v_staff   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_role_s  uuid;
  v_doc     uuid;
  v_ver     uuid;
  v_answer  jsonb;
  v_msg     text;
  v_state   text;
  v_call    text;
  v_calls   text[] := ARRAY[
      'public.admin_legal_documents()',
      'public.admin_legal_version($4)',
      'public.admin_legal_settings()',
      'public.legal_review_overdue()',
      'public.admin_user_legal_history($3)',
      'public.base_languages()'];
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f13p12-' || substr(v_hex, 1, 10);
  -- one draw: letters only, for the scratch language and document kind
  v_letters := translate(substr(v_hex, 11, 10), '0123456789', 'ghijkmnopr');
  v_lang := 'q' || substr(v_letters, 1, 7);
  v_kind := 'e2e-mig-' || v_letters;
  v_key := v_tag || '.key';
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_legal_documents()', 'bbe23b21d66be2fd09a33d628029d744'],
    ['public.admin_legal_version(uuid)', '13e24935339f7ecf462716e64ad5bbc6'],
    ['public.admin_legal_settings()', '9113cb9b2c96217d2479042b5e66a233'],
    ['public.legal_review_overdue()', '355639b6e6d810f078e9e56e82432453'],
    ['public.admin_user_legal_history(uuid)', 'd4f32debd3e4e6b1d7e970018de71d21'],
    ['public.base_languages()', '4b8a0ab32c1d68f85622d0dfe52a140d']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}'
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 12 proof (a): the reader %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 12 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_fn := 'public.user_has_translation_permission(uuid)'::regprocedure;
  IF has_function_privilege('anon', v_fn, 'EXECUTE') OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0) THEN
    RAISE EXCEPTION 'F1-3 part 12 proof (a): user_has_translation_permission is open to a browser role';
  END IF;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.languages WHERE code = v_lang) THEN
      RAISE EXCEPTION 'F1-3 part 12 proof: the scratch language code already exists';
    END IF;
    INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
    VALUES (v_lang, v_tag, v_tag, true, false, 9001);
    INSERT INTO public.ui_translations (key, lang_code, value, status)
    VALUES (v_key, public.language_code('base'), 'Hello', 'approved');
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, v_tag || '-staff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-reader', v_tag) RETURNING id INTO v_role_s;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_s, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE (r.name = 'legal' AND p.action IN ('view', 'edit')) OR (r.name = 'profiles' AND p.action = 'view');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_s) <> 3 THEN
      RAISE EXCEPTION 'F1-3 part 12 proof: a reader permission is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_s, 'global');
    INSERT INTO public.legal_documents (kind, country_code) VALUES (v_kind, NULL) RETURNING id INTO v_doc;
    INSERT INTO public.legal_versions (document_id, version, label, body_en, body_am, created_by)
    VALUES (v_doc, 1, 'L1', 'Body', 'Body am', v_staff) RETURNING id INTO v_ver;

    -- (b) the gates
    PERFORM set_config('request.jwt.claims', '{}', true);
    FOREACH v_call IN ARRAY v_calls LOOP
      v_msg := NULL; v_state := NULL;
      BEGIN
        EXECUTE 'SELECT ' || v_call USING v_lang, v_key, v_plain, v_ver;
      EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
      END;
      IF v_msg IS DISTINCT FROM 'notSignedIn' OR v_state IS DISTINCT FROM 'P0D01' THEN
        RAISE EXCEPTION 'F1-3 part 12 proof: % for no caller answered % (%)', v_call, coalesce(v_msg, 'success'), v_state;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    FOREACH v_call IN ARRAY v_calls LOOP
      v_msg := NULL; v_state := NULL;
      BEGIN
        EXECUTE 'SELECT ' || v_call USING v_lang, v_key, v_plain, v_ver;
      EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
      END;
      IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
        RAISE EXCEPTION 'F1-3 part 12 proof: % for a caller without its permission answered % (%)', v_call, coalesce(v_msg, 'success'), v_state;
      END IF;
    END LOOP;

    -- (c) the holder reads; the readers' own codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated')::text, true);
    FOREACH v_call IN ARRAY v_calls LOOP
      v_msg := NULL; v_state := NULL;
      BEGIN
        EXECUTE 'SELECT ' || v_call USING v_lang, v_key, v_plain, v_ver;
      EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
      END;
      IF v_msg IS NOT NULL THEN
        RAISE EXCEPTION 'F1-3 part 12 proof: % for the holder answered % (%)', v_call, coalesce(v_msg, 'success'), v_state;
      END IF;
    END LOOP;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_legal_version(gen_random_uuid());
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'unknownVersion' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-3 part 12 proof: (c) an unknown legal version answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_user_legal_history(gen_random_uuid());
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'unknownUser' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-3 part 12 proof: (c) the legal history of an unknown user answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_answer := public.admin_legal_version(v_ver);
    IF NOT (v_answer -> 'missing_languages' @> jsonb_build_array(jsonb_build_object('code', v_lang)) AND NOT (v_answer -> 'missing_languages' @> jsonb_build_array(jsonb_build_object('code', public.language_code('base')))) AND NOT (v_answer -> 'missing_languages' @> jsonb_build_array(jsonb_build_object('code', public.language_code('pair')))) AND NOT (v_answer -> 'missing_languages' @> jsonb_build_array(jsonb_build_object('code', public.language_code('pseudo'))))) THEN
      RAISE EXCEPTION 'F1-3 part 12 proof: (c) the version''s missing languages differ';
    END IF;
    v_answer := public.base_languages();
    IF NOT (strpos(v_answer::text, '"' || v_lang || '"') > 0) THEN
      RAISE EXCEPTION 'F1-3 part 12 proof: (c) base_languages differs';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f13p12-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f13p12-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114131100') ON CONFLICT DO NOTHING;
