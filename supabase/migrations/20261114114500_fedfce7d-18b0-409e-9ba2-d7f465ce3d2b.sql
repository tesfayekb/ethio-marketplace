-- e2e-areas: admin-translations
-- Foundations 1, turn F1-3, part 11 of 12 — THE TRANSLATION READERS ONTO DOOR_CONTEXT (DEC-333; brief
-- docs/governance/briefs/f1-doors-3.md; ruling 1). The nine translation readers are redeclared WHOLE from their
-- last declarations (live md5 checked, CREATE OR REPLACE, return shapes and grants kept): each gate becomes ONE
-- door_context('staff-reader', translations:view or :manage, global) — a staff reader owes its permission and no second
-- factor, spends no dial and takes no shell: its refusal raises — and the refusal sentences become door_refuse codes
-- (badValue:limit, badLanguage); the pair literal becomes a language_code call. Proofs on scratch rows under a sentinel
-- rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_list_translations(text,text,boolean,text,integer,integer,boolean)', '882c6e623d38124c7c8179956f132a76'],
    ['public.admin_translation_stats(text)', '4021e145e95e5954635564944cc8eade'],
    ['public.admin_list_translation_revisions(text,text,integer)', 'e7472929223744af768e65cf89e7d0b3'],
    ['public.admin_export_translations(text,text,integer)', '308dda363dd2a19c7bc9856a52463d9b'],
    ['public.admin_list_entity_translations(text,text,text,integer,integer)', '0c8841fd4ed3f933b6a0936c875d01de'],
    ['public.admin_entity_translation_stats(text)', '15242eeb983391385e39cbd99c9ff566'],
    ['public.admin_list_languages()', '273f4db5d774f239b7bbf68dab74b8b3'],
    ['public.admin_language_delete_preview(text)', 'eab7ddcfd4236f42c50bf7266e1749b9'],
    ['public.admin_get_translator_scope(uuid)', 'ed9a9dc89de1c3d273cf76f936d6a9a9']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114130900') THEN
    RAISE EXCEPTION 'F1-3 part 11: part 10 (6eff6f7d) must be applied first';
  END IF;
  IF to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-3 part 11: part 1''s language_code is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 11: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_list_translations (whole from 20260901234603 :61; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_list_translations(
  p_lang text,
  p_status text DEFAULT NULL::text,
  p_flagged boolean DEFAULT NULL::boolean,
  p_search text DEFAULT NULL::text,
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0,
  p_orphaned boolean DEFAULT NULL::boolean)
RETURNS TABLE(key text, lang_code text, value text, source_value text, status text,
              machine boolean, flagged boolean, flag_note text, updated_by uuid,
              updated_at timestamp with time zone, approved_by uuid,
              approved_at timestamp with time zone, orphaned boolean,
              context text, total_count bigint)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
#variable_conflict use_column
BEGIN
  PERFORM public.door_context('staff-reader', 'translations', 'view', NULL, NULL, 'global');

  RETURN QUERY
  WITH base AS (SELECT l.code FROM public.languages l WHERE l.is_base LIMIT 1),
  filtered AS (
    SELECT t.key, t.lang_code, t.value, src.value AS source_value, t.status,
           t.machine, t.flagged, t.flag_note, t.updated_by, t.updated_at,
           t.approved_by, t.approved_at, t.orphaned, src.context AS context
      FROM public.ui_translations t
      LEFT JOIN public.ui_translations src
        ON src.key = t.key AND src.lang_code = (SELECT code FROM base)
     WHERE t.lang_code = p_lang
       AND (p_orphaned IS NULL OR t.orphaned = p_orphaned)
       AND (p_status IS NULL OR p_status = '' OR p_status = 'all' OR t.status = p_status)
       AND (p_flagged IS NULL OR t.flagged = p_flagged)
       AND (p_search IS NULL OR p_search = ''
            OR t.key ILIKE '%' || p_search || '%'
            OR COALESCE(t.value, '') ILIKE '%' || p_search || '%'
            OR COALESCE(src.value, '') ILIKE '%' || p_search || '%')
  )
  SELECT f.key, f.lang_code, f.value, f.source_value, f.status, f.machine,
         f.flagged, f.flag_note, f.updated_by, f.updated_at, f.approved_by,
         f.approved_at, f.orphaned, f.context, COUNT(*) OVER () AS total_count
    FROM filtered f
   ORDER BY f.key
   LIMIT GREATEST(COALESCE(p_limit, 50), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_translations(text, text, boolean, text, integer, integer, boolean) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 2. admin_translation_stats (whole from 20260901143032 :30; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_translation_stats(p_lang text DEFAULT NULL::text)
 RETURNS TABLE(lang_code text, total bigint, untranslated bigint, machine_count bigint, edited bigint, approved bigint, flagged bigint, orphaned bigint, reviewable bigint)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
#variable_conflict use_column
BEGIN
  PERFORM public.door_context('staff-reader', 'translations', 'view', NULL, NULL, 'global');
  RETURN QUERY
  SELECT t.lang_code,
         count(*) FILTER (WHERE NOT t.orphaned),
         count(*) FILTER (WHERE NOT t.orphaned AND t.status = 'untranslated'),
         count(*) FILTER (WHERE NOT t.orphaned AND t.status = 'machine'),
         count(*) FILTER (WHERE NOT t.orphaned AND t.status = 'edited'),
         count(*) FILTER (WHERE NOT t.orphaned AND t.status = 'approved'),
         count(*) FILTER (WHERE NOT t.orphaned AND t.flagged),
         count(*) FILTER (WHERE t.orphaned),
         -- U4g-21: the SHARED definition, not a second copy.
         count(*) FILTER (WHERE public.ui_translation_reviewable(t.status, t.flagged, t.orphaned))
    FROM public.ui_translations t
   WHERE p_lang IS NULL OR t.lang_code = p_lang
   GROUP BY t.lang_code
   ORDER BY t.lang_code;
END $function$;
REVOKE ALL ON FUNCTION public.admin_translation_stats(text) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 3. admin_list_translation_revisions (whole from 20260830113828 :11; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_list_translation_revisions(
  p_key text,
  p_lang text,
  p_limit int DEFAULT 20
)
RETURNS TABLE(
  id uuid,
  action text,
  prev_value text,
  prev_status text,
  prev_machine boolean,
  changed_by uuid,
  changed_by_name text,
  changed_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.door_context('staff-reader', 'translations', 'view', NULL, NULL, 'global');

  RETURN QUERY
  SELECT r.id,
         r.action,
         r.prev_value,
         r.prev_status,
         r.prev_machine,
         r.changed_by,
         COALESCE(pr.display_name, u.email)::text AS changed_by_name,
         r.changed_at
  FROM public.ui_translation_revisions r
  LEFT JOIN public.profiles pr ON pr.user_id = r.changed_by
  LEFT JOIN auth.users u ON u.id = r.changed_by
  WHERE r.key = p_key
    AND r.lang_code = p_lang
  ORDER BY r.changed_at DESC, r.id DESC
  LIMIT LEAST(GREATEST(COALESCE(p_limit, 20), 1), 200);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_list_translation_revisions(text, text, integer) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 4. admin_export_translations (whole from 20261012101642 :12; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_export_translations(
  p_lang text, p_after text DEFAULT NULL, p_limit integer DEFAULT 1000)
RETURNS TABLE(key text, lang_code text, value text, source_value text, status text,
              machine boolean, flagged boolean, flag_note text, updated_by uuid,
              updated_at timestamp with time zone, approved_by uuid,
              approved_at timestamp with time zone, orphaned boolean, context text)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
#variable_conflict use_column
BEGIN
  PERFORM public.door_context('staff-reader', 'translations', 'view', NULL, NULL, 'global');
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 1000 THEN
    PERFORM public.door_refuse('badValue', 'limit');
  END IF;

  RETURN QUERY
  WITH base AS (SELECT l.code FROM public.languages l WHERE l.is_base LIMIT 1)
  SELECT t.key, t.lang_code, t.value, src.value AS source_value, t.status,
         t.machine, t.flagged, t.flag_note, t.updated_by, t.updated_at,
         t.approved_by, t.approved_at, t.orphaned, src.context AS context
    FROM public.ui_translations t
    LEFT JOIN public.ui_translations src
      ON src.key = t.key AND src.lang_code = (SELECT code FROM base)
   WHERE t.lang_code = p_lang
     AND (p_after IS NULL OR t.key > p_after)
   ORDER BY t.key
   LIMIT p_limit;
END $$;
REVOKE ALL ON FUNCTION public.admin_export_translations(text, text, integer) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 5. admin_list_entity_translations (whole from 20261022023137 :57; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_list_entity_translations(p_lang text, p_status text DEFAULT NULL::text, p_search text DEFAULT NULL::text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0)
 RETURNS TABLE(entity_type text, entity_id uuid, field text, label text, identifier text, source_value text, value text, status text, machine boolean, flagged boolean, flag_note text, updated_by uuid, updated_at timestamp with time zone, approved_by uuid, approved_at timestamp with time zone, total_count bigint)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'translations', 'view', NULL, NULL, 'global');

  RETURN QUERY
  WITH universe AS (
    SELECT 'category'::text AS etype, c.id AS eid, 'name'::text AS efield,
           c.name_en AS elabel, c.slug::text AS eident
      FROM public.categories c WHERE c.is_active
    UNION ALL
    -- A location has no operator-facing machine identity in this console.
    SELECT 'location'::text, l.id, 'name'::text, l.name_en, NULL::text
      FROM public.locations l WHERE l.is_active
    UNION ALL
    SELECT 'attribute'::text, a.id, 'label'::text, a.name_en, a.attr_key::text
      FROM public.attributes a
    UNION ALL
    SELECT 'attribute'::text, a.id, 'option:' || (o->>'value'),
           o->>'label_en', a.attr_key || ' · ' || (o->>'value')
      FROM public.attributes a, jsonb_array_elements(coalesce(a.options, '[]'::jsonb)) o
     WHERE coalesce((o->>'active')::boolean, true)
       AND length(btrim(coalesce(o->>'label_en', ''))) > 0
       AND p_lang IS DISTINCT FROM public.language_code('pair')
  ),
  joined AS (
    SELECT u.etype, u.eid, u.efield, u.elabel, u.eident,
           t.value, COALESCE(t.status, 'untranslated') AS status,
           COALESCE(t.machine, false) AS machine,
           COALESCE(t.flagged, false) AS flagged,
           t.flag_note, t.updated_by, t.updated_at, t.approved_by, t.approved_at
      FROM universe u
      LEFT JOIN public.entity_translations t
        ON t.entity_type = u.etype AND t.entity_id = u.eid
       AND t.field = u.efield AND t.lang_code = p_lang
  ),
  filtered AS (
    SELECT * FROM joined j
     WHERE (p_status IS NULL OR p_status = '' OR p_status = 'all' OR j.status = p_status)
       AND (p_search IS NULL OR p_search = ''
            OR j.elabel ILIKE '%' || p_search || '%'
            OR COALESCE(j.value, '') ILIKE '%' || p_search || '%')
  )
  SELECT f.etype, f.eid, f.efield, f.elabel, f.eident, f.elabel, f.value, f.status,
         f.machine, f.flagged, f.flag_note, f.updated_by, f.updated_at,
         f.approved_by, f.approved_at, COUNT(*) OVER () AS total_count
    FROM filtered f
   ORDER BY f.etype, f.elabel, f.eid
   LIMIT GREATEST(COALESCE(p_limit, 50), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 6. admin_entity_translation_stats (whole from 20261022023137 :3; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_entity_translation_stats(p_lang text DEFAULT NULL::text)
 RETURNS TABLE(lang_code text, total bigint, approved bigint, machine_count bigint, edited bigint, untranslated bigint)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'translations', 'view', NULL, NULL, 'global');

  RETURN QUERY
  WITH langs AS (
    SELECT l.code FROM public.languages l
     WHERE (p_lang IS NULL OR p_lang = '' OR l.code = p_lang)
       AND NOT l.is_base
  ),
  universe AS (
    SELECT 'category'::text AS etype, c.id AS eid, 'name'::text AS efield
      FROM public.categories c WHERE c.is_active
    UNION ALL
    SELECT 'location'::text, l.id, 'name'::text FROM public.locations l WHERE l.is_active
    UNION ALL
    SELECT 'attribute'::text, a.id, 'label'::text FROM public.attributes a
    UNION ALL
    SELECT 'attribute'::text, a.id, 'option:' || (o->>'value')
      FROM public.attributes a, jsonb_array_elements(coalesce(a.options, '[]'::jsonb)) o
     WHERE coalesce((o->>'active')::boolean, true)
       AND length(btrim(coalesce(o->>'label_en', ''))) > 0
  ),
  joined AS (
    SELECT g.code,
           COALESCE(t.status, 'untranslated') AS status
      FROM langs g
      CROSS JOIN universe u
      LEFT JOIN public.entity_translations t
        ON t.entity_type = u.etype AND t.entity_id = u.eid
       AND t.field = u.efield AND t.lang_code = g.code
     WHERE NOT (u.efield LIKE 'option:%' AND g.code = public.language_code('pair'))
  )
  SELECT j.code,
         COUNT(*)::bigint,
         COUNT(*) FILTER (WHERE j.status = 'approved')::bigint,
         COUNT(*) FILTER (WHERE j.status = 'machine')::bigint,
         COUNT(*) FILTER (WHERE j.status = 'edited')::bigint,
         COUNT(*) FILTER (WHERE j.status = 'untranslated')::bigint
    FROM joined j
   GROUP BY j.code
   ORDER BY j.code;
END $function$;
REVOKE ALL ON FUNCTION public.admin_entity_translation_stats(text) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 7. admin_list_languages (whole from 20260831064939 :100; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_list_languages()
RETURNS TABLE(code text, name_en text, name_native text, rtl boolean, is_base boolean,
              enabled_admin boolean, enabled_public boolean, sort integer,
              created_at timestamptz, updated_at timestamptz)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
#variable_conflict use_column
BEGIN
  PERFORM public.door_context('staff-reader', 'translations', 'view', NULL, NULL, 'global');

  RETURN QUERY
  SELECT l.code, l.name_en, l.name_native, l.rtl, l.is_base,
         l.enabled_admin, l.enabled_public, l.sort, l.created_at, l.updated_at
    FROM public.languages l
   ORDER BY l.sort, l.code;
END $$;
REVOKE ALL ON FUNCTION public.admin_list_languages() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 8. admin_language_delete_preview (whole from 20260902021248 :7; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_language_delete_preview(p_code text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_is_base boolean; v_public boolean;
  c_assign bigint; c_ui bigint; c_entity bigint; c_rev bigint;
BEGIN
  PERFORM public.door_context('staff-reader', 'translations', 'manage', NULL, NULL, 'global');

  SELECT l.is_base, l.enabled_public INTO v_is_base, v_public
    FROM public.languages l WHERE l.code = p_code;
  IF NOT FOUND THEN PERFORM public.door_refuse('badLanguage'); END IF;

  SELECT count(*) INTO c_assign FROM public.translator_languages WHERE lang_code = p_code;
  SELECT count(*) INTO c_ui     FROM public.ui_translations       WHERE lang_code = p_code;
  SELECT count(*) INTO c_entity FROM public.entity_translations   WHERE lang_code = p_code;
  SELECT count(*) INTO c_rev    FROM public.ui_translation_revisions WHERE lang_code = p_code;

  RETURN jsonb_build_object(
    'code', p_code,
    'is_base', v_is_base,
    'enabled_public', v_public,
    'assignments', COALESCE(c_assign, 0),
    'ui_rows', COALESCE(c_ui, 0),
    'entity_rows', COALESCE(c_entity, 0),
    'revisions', COALESCE(c_rev, 0)
  );
END $function$;
REVOKE ALL ON FUNCTION public.admin_language_delete_preview(text) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 9. admin_get_translator_scope (whole from 20260830041754 :9; the gate on door_context('staff-reader', …), the refusals as codes)
CREATE OR REPLACE FUNCTION public.admin_get_translator_scope(p_target uuid)
RETURNS TABLE(eligible boolean, languages text[])
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.door_context('staff-reader', 'translations', 'manage', NULL, NULL, 'global');

  RETURN QUERY
  SELECT
    EXISTS (
      SELECT 1
      FROM public.user_roles ur
      JOIN public.role_permissions rp ON rp.role_id = ur.role_id
      JOIN public.permissions p ON p.id = rp.permission_id
      JOIN public.resources r ON r.id = p.resource_id
      WHERE ur.user_id = p_target
        AND r.name = 'translations'
        AND p.action IN ('view', 'update', 'machine', 'approve', 'manage')
    ) AS eligible,
    COALESCE(
      (
        SELECT array_agg(tl.lang_code ORDER BY tl.lang_code)
        FROM public.translator_languages tl
        WHERE tl.user_id = p_target
      ),
      ARRAY[]::text[]
    ) AS languages;
END;
$$;
REVOKE ALL ON FUNCTION public.admin_get_translator_scope(uuid) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 10. PROOFS
-- (a) catalog facts: the 9 readers STABLE SECURITY DEFINER, EXECUTE for authenticated and not for anon or
--     PUBLIC, every body this file's (md5).
-- (b) the gates: no caller → notSignedIn, a caller without the reader's permission → permissionDenied, each raised as
--     P0D01 (a reader takes no shell: its refusal is the error).
-- (c) a holder of translations:view and :manage reads every reader; the readers' own codes (badValue:limit,
--     badLanguage).
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
      'public.admin_list_translations($1)',
      'public.admin_translation_stats($1)',
      'public.admin_list_translation_revisions($2, $1)',
      'public.admin_export_translations($1)',
      'public.admin_list_entity_translations($1)',
      'public.admin_entity_translation_stats($1)',
      'public.admin_list_languages()',
      'public.admin_language_delete_preview($1)',
      'public.admin_get_translator_scope($3)'];
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f13p11-' || substr(v_hex, 1, 10);
  -- one draw: letters only, for the scratch language and document kind
  v_letters := translate(substr(v_hex, 11, 10), '0123456789', 'ghijkmnopr');
  v_lang := 'q' || substr(v_letters, 1, 7);
  v_kind := 'e2e-mig-' || v_letters;
  v_key := v_tag || '.key';
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_list_translations(text,text,boolean,text,integer,integer,boolean)', 'b1b67b4d8589cf6df88a3c5b930cafd7'],
    ['public.admin_translation_stats(text)', '4ced09a1557c7ceaf20b52b216326507'],
    ['public.admin_list_translation_revisions(text,text,integer)', '63f3b46ab4074162471db1255c1a0f3c'],
    ['public.admin_export_translations(text,text,integer)', '1295522d513b527064c41d758cadfd7b'],
    ['public.admin_list_entity_translations(text,text,text,integer,integer)', 'efdd33f153ee14cf3e83e86aea13e31b'],
    ['public.admin_entity_translation_stats(text)', '3edca765531b315e4794a4c591edce3d'],
    ['public.admin_list_languages()', '73cf6ce46ae354b2d0e2e54fafed9d5b'],
    ['public.admin_language_delete_preview(text)', '24927e8ace52480ccff29ed2300264ba'],
    ['public.admin_get_translator_scope(uuid)', '359117388d1182dc2729180bc1bbf2cc']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}'
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-3 part 11 proof (a): the reader %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-3 part 11 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.languages WHERE code = v_lang) THEN
      RAISE EXCEPTION 'F1-3 part 11 proof: the scratch language code already exists';
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
     WHERE r.name = 'translations' AND p.action IN ('view', 'manage');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_s) <> 2 THEN
      RAISE EXCEPTION 'F1-3 part 11 proof: a reader permission is not declared';
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
        RAISE EXCEPTION 'F1-3 part 11 proof: % for no caller answered % (%)', v_call, coalesce(v_msg, 'success'), v_state;
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
        RAISE EXCEPTION 'F1-3 part 11 proof: % for a caller without its permission answered % (%)', v_call, coalesce(v_msg, 'success'), v_state;
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
        RAISE EXCEPTION 'F1-3 part 11 proof: % for the holder answered % (%)', v_call, coalesce(v_msg, 'success'), v_state;
      END IF;
    END LOOP;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_export_translations(v_lang, NULL, 0);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'badValue:limit' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-3 part 11 proof: (c) a translation export page of no rows answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_language_delete_preview(v_lang || 'x');
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'badLanguage' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-3 part 11 proof: (c) a delete preview of an unknown language answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f13p11-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f13p11-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114131000') ON CONFLICT DO NOTHING;
