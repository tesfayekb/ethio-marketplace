-- e2e-areas: admin-translations
-- Cursor bundle 5, part 2 — THE TWO TRANSLATION LIST DOORS TAKE "AFTER THIS KEY" (INC-1141; brief
-- docs/governance/briefs/cursor-bundle-5.md STEP 3, ruling docs/governance/briefs/cursor-bundle-5-ruling-1.md answer 9).
-- A bulk translate that collects page by page with an OFFSET skips or repeats a row when the list changes between two
-- pages. Each list door gains a trailing optional argument that names the last row already read:
--   admin_list_translations(…, p_after text DEFAULT NULL) — the last page's last `key`; the page is the rows whose key
--     sorts after it (the order is unchanged: key; one row per key within a language).
--   admin_list_entity_translations(…, p_after jsonb DEFAULT NULL) — `{etype, elabel, eid, efield}` of the last row read;
--     the page is the rows that sort after it by (etype, elabel, eid, efield). `efield` joins the order as its last
--     tie-breaker (an attribute and one of its options can share a label and an id: the order of tied rows was
--     undefined), and a NULL label reads as '' in the order and in the comparison, so both sides are one key. A key that
--     is not an object of exactly those four fields, with strings for etype, eid (a uuid) and efield and a string or null
--     elabel, answers `badValue:after` (door_refuse) after the gate has answered and before any row is read.
-- With no `after` each door answers what it answered; `total_count` counts the rows the page is cut from, so with an
-- `after` it counts the rows after that key. Both functions are redeclared WHOLE from their last declaration (20261114114500
-- part 11; live md5s checked) and change only where named. The argument list changes, so each is DROPped and CREATEd and its
-- grants restated in full (a DROP + CREATE that restated only authenticated once took the service role's EXECUTE: DEC-392).

DO $pre$
DECLARE
  v_fn  text;
  v_md5 text;
  v_was text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261123050100') THEN
    RAISE EXCEPTION 'cursor-bundle-5 part 2: the newest earlier mark (20261123050100) must be applied first';
  END IF;
  FOR v_fn, v_was IN VALUES
    ('public.admin_list_translations(text,text,boolean,text,integer,integer,boolean)', 'b1b67b4d8589cf6df88a3c5b930cafd7'),
    ('public.admin_list_entity_translations(text,text,text,integer,integer)', 'efdd33f153ee14cf3e83e86aea13e31b')
  LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_list_translations (whole from 20261114114500 part 11 :39; p_after added)
DROP FUNCTION public.admin_list_translations(text, text, boolean, text, integer, integer, boolean);
CREATE FUNCTION public.admin_list_translations(
  p_lang text,
  p_status text DEFAULT NULL::text,
  p_flagged boolean DEFAULT NULL::boolean,
  p_search text DEFAULT NULL::text,
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0,
  p_orphaned boolean DEFAULT NULL::boolean,
  p_after text DEFAULT NULL::text)
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
       AND (p_after IS NULL OR t.key > p_after)
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
REVOKE ALL ON FUNCTION public.admin_list_translations(text, text, boolean, text, integer, integer, boolean, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_translations(text, text, boolean, text, integer, integer, boolean, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_translations(text, text, boolean, text, integer, integer, boolean, text) TO service_role;

-- ------------------------------------------------------------ 2. admin_list_entity_translations (whole from 20261114114500 part 11 :199; p_after added, efield last in the order)
DROP FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer);
CREATE FUNCTION public.admin_list_entity_translations(p_lang text, p_status text DEFAULT NULL::text, p_search text DEFAULT NULL::text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0, p_after jsonb DEFAULT NULL::jsonb)
 RETURNS TABLE(entity_type text, entity_id uuid, field text, label text, identifier text, source_value text, value text, status text, machine boolean, flagged boolean, flag_note text, updated_by uuid, updated_at timestamp with time zone, approved_by uuid, approved_at timestamp with time zone, total_count bigint)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_etype  text;
  v_elabel text;
  v_eid    uuid;
  v_efield text;
BEGIN
  PERFORM public.door_context('staff-reader', 'translations', 'view', NULL, NULL, 'global');

  IF p_after IS NOT NULL THEN
    IF jsonb_typeof(p_after) IS DISTINCT FROM 'object' THEN
      PERFORM public.door_refuse('badValue', 'after');
    END IF;
    IF (SELECT count(*) FROM jsonb_object_keys(p_after)) <> 4
       OR NOT (p_after ?& ARRAY['etype', 'elabel', 'eid', 'efield'])
       OR jsonb_typeof(p_after->'etype') IS DISTINCT FROM 'string'
       OR jsonb_typeof(p_after->'eid') IS DISTINCT FROM 'string'
       OR jsonb_typeof(p_after->'efield') IS DISTINCT FROM 'string'
       OR jsonb_typeof(p_after->'elabel') NOT IN ('string', 'null') THEN
      PERFORM public.door_refuse('badValue', 'after');
    END IF;
    BEGIN
      v_eid := (p_after->>'eid')::uuid;
    EXCEPTION WHEN invalid_text_representation THEN
      PERFORM public.door_refuse('badValue', 'after');
    END;
    v_etype := p_after->>'etype';
    v_elabel := COALESCE(p_after->>'elabel', '');
    v_efield := p_after->>'efield';
  END IF;

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
       AND (p_after IS NULL
            OR (j.etype, COALESCE(j.elabel, ''), j.eid, j.efield) > (v_etype, v_elabel, v_eid, v_efield))
  )
  SELECT f.etype, f.eid, f.efield, f.elabel, f.eident, f.elabel, f.value, f.status,
         f.machine, f.flagged, f.flag_note, f.updated_by, f.updated_at,
         f.approved_by, f.approved_at, COUNT(*) OVER () AS total_count
    FROM filtered f
   ORDER BY f.etype, COALESCE(f.elabel, ''), f.eid, f.efield
   LIMIT GREATEST(COALESCE(p_limit, 50), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer, jsonb) TO service_role;

-- ------------------------------------------------------------ 3. PROOF (scratch rows under a sentinel rollback)
-- (a) catalog facts: both functions STABLE SECURITY DEFINER with search_path public, EXECUTE for authenticated and the
--     service role and for neither anon nor PUBLIC; the two old signatures gone; every body this file's (md5).
-- (b) the gate answers first: no caller → notSignedIn, a caller without translations:view → permissionDenied, a malformed
--     `after` included; the holder with a malformed `after` → badValue:after, a well-formed one with a null label passes.
--     (A reader's refusal is the PGRST body {code: P0D01, message: <code>}, F1-7c.)
-- (c) the strings door by key: a page by `after`; a row inserted before the cursor and one after it between two pages — the
--     next page neither skips nor repeats, the row behind the cursor is not seen, the pages together are exactly the rows
--     present at the start plus the one inserted after the cursor; an OFFSET page over the same list repeats a row; the
--     keyset read's plan (the language an index condition, no sequential scan).
-- (d) the data door by key: the same walk over scratch categories, and a tie on (etype, elabel, eid) — an attribute and
--     its option sharing one label — read across a page edge without a skip or a repeat, `efield` the last tie-breaker.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_letters text;
  v_lang    text;
  v_attr    text;
  v_staff   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_role    uuid;
  v_attr_id uuid;
  v_fn      regprocedure;
  v_want    text;
  v_msg     text;
  v_state   text;
  v_row     record;
  v_seen    text[];
  v_page    text[];
  v_last    text;
  v_after   jsonb;
  v_total   bigint;
  v_plan    text;
  v_line    text;
  v_bad     jsonb;
  v_i       integer;
  v_who     uuid;
  v_sql     text;
  v_got     bigint;
BEGIN
  v_tag := 'e2e-mig-b5p2-' || substr(v_hex, 1, 10);
  -- one draw: letters only, for the scratch language and the scratch attribute key
  v_letters := translate(substr(v_hex, 11, 10), '0123456789', 'ghijkmnopr');
  v_lang := 'q' || substr(v_letters, 1, 7);
  v_attr := 'e2e_mig_' || substr(v_hex, 21, 10);

  -- (a)
  FOR v_fn, v_want IN VALUES
    ('public.admin_list_translations(text,text,boolean,text,integer,integer,boolean,text)'::regprocedure, '00cf17ed29fdeecbd8139e983c7aa036'),
    ('public.admin_list_entity_translations(text,text,text,integer,integer,jsonb)'::regprocedure, 'f2c1a07a86f940c679875f2a14ffdbef')
  LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (a): %''s header or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  IF to_regprocedure('public.admin_list_translations(text,text,boolean,text,integer,integer,boolean)') IS NOT NULL
     OR to_regprocedure('public.admin_list_entity_translations(text,text,text,integer,integer)') IS NOT NULL THEN
    RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (a): an old signature is still declared';
  END IF;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.languages WHERE code = v_lang AND v_tag LIKE 'e2e-mig-%')
       OR EXISTS (SELECT 1 FROM public.attributes WHERE attr_key = v_attr AND v_tag LIKE 'e2e-mig-%') THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof: a scratch code already exists';
    END IF;
    INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
    VALUES (v_lang, v_tag, v_tag, true, false, 9001);
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, v_tag || '-staff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-reader', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action = 'view';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 1 THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof: translations:view is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role, 'global');

    -- (b) the gate answers first. A reader's refusal is raised as PGRST with the body PostgREST answers (F1-7c);
    -- the outermost call's mark is per call.
    v_bad := jsonb_build_object('etype', 'category', 'elabel', 'x', 'eid', gen_random_uuid(), 'efield', 'name');
    FOR v_who, v_sql, v_want IN VALUES
      (NULL::uuid, 'SELECT count(*) FROM public.admin_list_entity_translations($1, NULL, NULL, 2, 0, ''"x"''::jsonb)', 'notSignedIn'),
      (NULL::uuid, 'SELECT count(*) FROM public.admin_list_translations($1, NULL, NULL, NULL, 2, 0, NULL, ''k'')', 'notSignedIn'),
      (v_plain, 'SELECT count(*) FROM public.admin_list_entity_translations($1, NULL, NULL, 2, 0, ''"x"''::jsonb)', 'permissionDenied'),
      (v_plain, 'SELECT count(*) FROM public.admin_list_translations($1, NULL, NULL, NULL, 2, 0, NULL, ''k'')', 'permissionDenied')
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE WHEN v_who IS NULL THEN '{}' ELSE json_build_object('sub', v_who::text, 'role', 'authenticated')::text END, true);
      PERFORM set_config('door.outer', '', true);
      v_msg := NULL; v_state := NULL;
      BEGIN
        EXECUTE v_sql INTO v_got USING v_lang;
      EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
      END;
      IF v_state IS DISTINCT FROM 'PGRST'
         OR v_msg::jsonb IS DISTINCT FROM jsonb_build_object('code', 'P0D01', 'message', v_want) THEN
        RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (b): % answered % (%), not %', v_sql, coalesce(v_msg, 'a read'), v_state, v_want;
      END IF;
    END LOOP;

    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated')::text, true);
    FOR v_after IN
      SELECT x FROM unnest(ARRAY[
        '"x"'::jsonb, '[]'::jsonb, '7'::jsonb, '{}'::jsonb,
        v_bad - 'efield',
        v_bad || '{"extra": 1}'::jsonb,
        v_bad || '{"etype": 7}'::jsonb,
        v_bad || '{"efield": null}'::jsonb,
        v_bad || '{"eid": 7}'::jsonb,
        v_bad || '{"eid": "not-a-uuid"}'::jsonb,
        v_bad || '{"elabel": 7}'::jsonb,
        v_bad || '{"elabel": {"a": 1}}'::jsonb]) AS x
    LOOP
      PERFORM set_config('door.outer', '', true);
      v_msg := NULL; v_state := NULL;
      BEGIN
        EXECUTE 'SELECT count(*) FROM public.admin_list_entity_translations($1, NULL, NULL, 2, 0, $2)' INTO v_got USING v_lang, v_after;
      EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
      END;
      IF v_state IS DISTINCT FROM 'PGRST'
         OR v_msg::jsonb IS DISTINCT FROM jsonb_build_object('code', 'P0D01', 'message', 'badValue:after') THEN
        RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (b): the malformed after % answered % (%)', v_after, coalesce(v_msg, 'a read'), v_state;
      END IF;
    END LOOP;
    -- a well-formed key, a null label included, is a key (and no row of this scratch language and tag sorts after it)
    PERFORM set_config('door.outer', '', true);
    PERFORM * FROM public.admin_list_entity_translations(v_lang, NULL, v_tag, 2, 0, v_bad);
    PERFORM * FROM public.admin_list_entity_translations(v_lang, NULL, v_tag, 2, 0, v_bad || '{"elabel": null}'::jsonb);

    -- (c) the strings door by key
    INSERT INTO public.ui_translations (key, lang_code, value, status) VALUES
      (v_tag || '.k1', v_lang, 'one', 'edited'), (v_tag || '.k2', v_lang, 'two', 'edited'),
      (v_tag || '.k3', v_lang, 'three', 'edited'), (v_tag || '.k4', v_lang, 'four', 'edited'),
      (v_tag || '.k5', v_lang, 'five', 'edited');
    v_page := ARRAY[]::text[];
    FOR v_row IN SELECT * FROM public.admin_list_translations(v_lang, NULL, NULL, NULL, 2, 0, NULL, NULL) LOOP
      v_page := v_page || v_row.key;
    END LOOP;
    IF v_page IS DISTINCT FROM ARRAY[v_tag || '.k1', v_tag || '.k2'] THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (c): the first page is %', v_page;
    END IF;
    v_seen := v_page;
    v_last := v_page[2];
    -- between the pages: one row before the cursor, one after it
    INSERT INTO public.ui_translations (key, lang_code, value, status) VALUES
      (v_tag || '.k1b', v_lang, 'one b', 'edited'), (v_tag || '.k2b', v_lang, 'two b', 'edited');
    IF (SELECT array_agg(t.key ORDER BY t.key) FROM public.ui_translations t WHERE t.lang_code = v_lang)
       IS DISTINCT FROM ARRAY[v_tag || '.k1', v_tag || '.k1b', v_tag || '.k2', v_tag || '.k2b', v_tag || '.k3', v_tag || '.k4', v_tag || '.k5'] THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (c): the scratch keys do not sort as designed under this collation';
    END IF;
    v_page := ARRAY[]::text[];
    FOR v_row IN SELECT * FROM public.admin_list_translations(v_lang, NULL, NULL, NULL, 2, 0, NULL, v_last) LOOP
      v_page := v_page || v_row.key;
      v_total := v_row.total_count;
    END LOOP;
    IF v_page IS DISTINCT FROM ARRAY[v_tag || '.k2b', v_tag || '.k3'] OR v_total <> 4 THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (c): the second page is % of %', v_page, v_total;
    END IF;
    v_seen := v_seen || v_page;
    v_last := v_page[2];
    v_page := ARRAY[]::text[];
    FOR v_row IN SELECT * FROM public.admin_list_translations(v_lang, NULL, NULL, NULL, 2, 0, NULL, v_last) LOOP
      v_page := v_page || v_row.key;
    END LOOP;
    IF v_page IS DISTINCT FROM ARRAY[v_tag || '.k4', v_tag || '.k5'] THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (c): the third page is %', v_page;
    END IF;
    v_seen := v_seen || v_page;
    v_last := v_page[2];
    IF EXISTS (SELECT 1 FROM public.admin_list_translations(v_lang, NULL, NULL, NULL, 2, 0, NULL, v_last)) THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (c): a page after the last key is not empty';
    END IF;
    IF v_seen IS DISTINCT FROM ARRAY[v_tag || '.k1', v_tag || '.k2', v_tag || '.k2b', v_tag || '.k3', v_tag || '.k4', v_tag || '.k5'] THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (c): the pages together are %', v_seen;
    END IF;
    -- the same list by OFFSET repeats the row the cursor stood on (why the collectors read by key)
    v_page := ARRAY[]::text[];
    FOR v_row IN SELECT * FROM public.admin_list_translations(v_lang, NULL, NULL, NULL, 2, 2, NULL, NULL) LOOP
      v_page := v_page || v_row.key;
    END LOOP;
    IF v_page IS DISTINCT FROM ARRAY[v_tag || '.k2', v_tag || '.k2b'] THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (c): the offset comparison page is %', v_page;
    END IF;
    -- the plan of the keyset read: the language is an index condition (no sequential scan); the key predicate is a filter on
    -- those rows and the page a sort of them — the window count reads the language's rows on every page, as it did with OFFSET
    PERFORM set_config('enable_seqscan', 'off', true);
    v_plan := '';
    FOR v_line IN EXECUTE 'EXPLAIN (COSTS OFF) SELECT t.key FROM public.ui_translations t WHERE t.lang_code = $1 AND t.key > $2 ORDER BY t.key LIMIT 2' USING v_lang, v_last LOOP
      v_plan := v_plan || v_line || E'\n';
    END LOOP;
    PERFORM set_config('enable_seqscan', 'on', true);
    IF position('Index Cond: (lang_code' IN v_plan) = 0 OR position('Seq Scan' IN v_plan) > 0 THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (c): the keyset read is not served by a language index: %', v_plan;
    END IF;

    -- (d) the data door by key: scratch categories a, b, d, e; ab (before the cursor) and c (after it) arrive between pages
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order) VALUES
      (v_tag || ' a', v_tag || '-a', true, true, true, 9999), (v_tag || ' b', v_tag || '-b', true, true, true, 9999),
      (v_tag || ' d', v_tag || '-d', true, true, true, 9999), (v_tag || ' e', v_tag || '-e', true, true, true, 9999);
    v_page := ARRAY[]::text[];
    FOR v_row IN SELECT * FROM public.admin_list_entity_translations(v_lang, NULL, v_tag, 2, 0, NULL) LOOP
      v_page := v_page || v_row.label;
      v_after := jsonb_build_object('etype', v_row.entity_type, 'elabel', v_row.label, 'eid', v_row.entity_id, 'efield', v_row.field);
    END LOOP;
    IF v_page IS DISTINCT FROM ARRAY[v_tag || ' a', v_tag || ' b'] THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (d): the first page is %', v_page;
    END IF;
    v_seen := v_page;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order) VALUES
      (v_tag || ' ab', v_tag || '-ab', true, true, true, 9999), (v_tag || ' c', v_tag || '-c', true, true, true, 9999);
    v_page := ARRAY[]::text[];
    FOR v_row IN SELECT * FROM public.admin_list_entity_translations(v_lang, NULL, v_tag, 2, 0, v_after) LOOP
      v_page := v_page || v_row.label;
      v_total := v_row.total_count;
    END LOOP;
    IF v_page IS DISTINCT FROM ARRAY[v_tag || ' c', v_tag || ' d'] OR v_total <> 3 THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (d): the second page is % of %', v_page, v_total;
    END IF;
    v_seen := v_seen || v_page;
    FOR v_row IN SELECT * FROM public.admin_list_entity_translations(v_lang, NULL, v_tag, 2, 0, v_after) LOOP
      v_after := jsonb_build_object('etype', v_row.entity_type, 'elabel', v_row.label, 'eid', v_row.entity_id, 'efield', v_row.field);
    END LOOP;
    v_page := ARRAY[]::text[];
    FOR v_row IN SELECT * FROM public.admin_list_entity_translations(v_lang, NULL, v_tag, 2, 0, v_after) LOOP
      v_page := v_page || v_row.label;
      v_after := jsonb_build_object('etype', v_row.entity_type, 'elabel', v_row.label, 'eid', v_row.entity_id, 'efield', v_row.field);
    END LOOP;
    IF v_page IS DISTINCT FROM ARRAY[v_tag || ' e'] THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (d): the third page is %', v_page;
    END IF;
    v_seen := v_seen || v_page;
    IF EXISTS (SELECT 1 FROM public.admin_list_entity_translations(v_lang, NULL, v_tag, 2, 0, v_after)) THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (d): a page after the last key is not empty';
    END IF;
    IF v_seen IS DISTINCT FROM ARRAY[v_tag || ' a', v_tag || ' b', v_tag || ' c', v_tag || ' d', v_tag || ' e'] THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (d): the pages together are %', v_seen;
    END IF;
    -- the same list by OFFSET repeats the row the cursor stood on
    v_page := ARRAY[]::text[];
    FOR v_row IN SELECT * FROM public.admin_list_entity_translations(v_lang, NULL, v_tag, 2, 2, NULL) LOOP
      v_page := v_page || v_row.label;
    END LOOP;
    IF v_page IS DISTINCT FROM ARRAY[v_tag || ' b', v_tag || ' c'] THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (d): the offset comparison page is %', v_page;
    END IF;

    -- a tie on (etype, elabel, eid): an attribute and its option share one label; `efield` orders them
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
    VALUES (v_attr, v_tag || ' tie', 'single_select', jsonb_build_array(jsonb_build_object('value', 'x1', 'label_en', v_tag || ' tie')))
    RETURNING id INTO v_attr_id;
    v_seen := ARRAY[]::text[];
    v_after := NULL;
    FOR v_i IN 1..3 LOOP
      v_page := ARRAY[]::text[];
      FOR v_row IN SELECT * FROM public.admin_list_entity_translations(v_lang, NULL, v_tag || ' tie', 1, 0, v_after) LOOP
        v_page := v_page || (v_row.entity_type || ':' || v_row.field || ':' || (v_row.entity_id = v_attr_id)::text);
        v_after := jsonb_build_object('etype', v_row.entity_type, 'elabel', v_row.label, 'eid', v_row.entity_id, 'efield', v_row.field);
      END LOOP;
      v_seen := v_seen || v_page;
    END LOOP;
    IF v_seen IS DISTINCT FROM ARRAY['attribute:label:true', 'attribute:option:x1:true'] THEN
      RAISE EXCEPTION 'cursor-bundle-5 part 2 proof (d): the tied rows were read as %', v_seen;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'cursor-bundle-5-part-2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'cursor-bundle-5-part-2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('enable_seqscan', 'on', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261123150000') ON CONFLICT DO NOTHING;
