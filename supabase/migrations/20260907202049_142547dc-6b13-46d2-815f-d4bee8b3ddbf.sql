-- IE-3 — COLUMN CLASSES, SCOPE ISOLATION AND GUIDED REFUSALS
-- Corrective for 20260907185010 / 20260907191856 (attributes import) and
-- 20260907194932 (categories import). Additive: two pure helpers, one
-- read-only reporter, one refusal guide, and the two PREVIEW doors
-- re-declared to carry both. No planner is rewritten; no table is touched.
-- DEFINER/REVOKE pairing (DEC-022-B) is restated for every DEFINER below.

-- ============================================================
-- 1. TRUTH HELPERS (invoker; pure reads)
-- ============================================================
CREATE OR REPLACE FUNCTION public.attr_link_path(p_cat uuid)
RETURNS text
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
  WITH RECURSIVE q AS (
    SELECT c.id AS cur, c.name_en::text AS path, 0 AS d
      FROM public.categories c WHERE c.id = p_cat
    UNION ALL
    SELECT pp.parent_id, cp.name_en || ' / ' || q.path, q.d + 1
      FROM q
      JOIN LATERAL (
             SELECT t.parent_id FROM public.category_tree_pointers t
              WHERE t.child_id = q.cur AND t.parent_id IS NOT NULL
              ORDER BY t.display_order, t.parent_id LIMIT 1
           ) pp ON true
      JOIN public.categories cp ON cp.id = pp.parent_id
     WHERE q.d < 10
  )
  SELECT path FROM q ORDER BY d DESC LIMIT 1;
$function$;

CREATE OR REPLACE FUNCTION public.attr_link_origin(p_cat uuid, p_key text)
RETURNS text
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
  WITH RECURSIVE anc AS (
    SELECT p_cat AS src, 0 AS depth
    UNION ALL
    SELECT t.parent_id, a.depth + 1
      FROM anc a
      JOIN public.category_tree_pointers t
        ON t.child_id = a.src AND t.parent_id IS NOT NULL
     WHERE a.depth < 10
  )
  SELECT c.slug
    FROM anc
    JOIN public.category_attribute_links l ON l.category_id = anc.src
    JOIN public.attributes a2 ON a2.id = l.attribute_id AND a2.attr_key = p_key
    JOIN public.categories c ON c.id = anc.src
   ORDER BY anc.depth, c.slug
   LIMIT 1;
$function$;

REVOKE ALL ON FUNCTION public.attr_link_path(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.attr_link_origin(uuid, text) FROM PUBLIC, anon;

-- ============================================================
-- 2. THE READ-ONLY REPORTER
-- ============================================================
-- Column classes (the law, restated in the feature docs):
--   attributes/definitions read-only: label_am, is_per_variant,
--                                     direct_link_count
--   attributes/links       read-only: category_path, origin
--   categories             read-only: category_path, name_am, is_catchall,
--                                     listing_count, origin_scope
-- An edited read-only cell is NEVER applied. It is reported here with its
-- row and column so the preview can show it under "Ignored (read-only)";
-- the row's editable changes still apply.
-- origin_scope is never compared (it names the download's scope, not the
-- row) — it is simply never applied.
CREATE OR REPLACE FUNCTION public.import_readonly_ignored(p_kind text, p_rows jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_out   jsonb := '[]'::jsonb;
  v_row   jsonb;
  v_num   int;
  v_key   text;
  v_id    uuid;
  v_cat   uuid;
  v_truth jsonb;
  v_file  text;
BEGIN
  v_file := CASE WHEN p_kind = 'categories' THEN 'categories' ELSE p_kind END;

  FOR v_row IN SELECT value FROM jsonb_array_elements(COALESCE(p_rows, '[]'::jsonb))
  LOOP
    v_num := COALESCE(NULLIF(v_row->>'row','')::int, 0);
    v_truth := NULL;

    IF p_kind = 'definitions' THEN
      v_key := btrim(COALESCE(v_row->>'attribute_key',''));
      SELECT a.id INTO v_id FROM public.attributes a WHERE a.attr_key = v_key;
      CONTINUE WHEN v_id IS NULL;
      SELECT jsonb_build_object(
               'label_am', COALESCE(t.value, a.name_am, ''),
               'is_per_variant', '',
               'direct_link_count',
                 (SELECT count(*)::text FROM public.category_attribute_links l
                   WHERE l.attribute_id = a.id))
        INTO v_truth
        FROM public.attributes a
        LEFT JOIN public.entity_translations t
               ON t.entity_type = 'attribute' AND t.entity_id = a.id
              AND t.field = 'label' AND t.lang_code = 'am' AND t.status = 'approved'
       WHERE a.id = v_id;

    ELSIF p_kind = 'links' THEN
      v_key := btrim(COALESCE(v_row->>'attribute_key',''));
      SELECT c.id INTO v_cat FROM public.categories c
       WHERE c.slug = btrim(COALESCE(v_row->>'category_slug',''));
      CONTINUE WHEN v_cat IS NULL;
      v_truth := jsonb_build_object(
        'category_path', COALESCE(public.attr_link_path(v_cat), ''),
        'origin', COALESCE(public.attr_link_origin(v_cat, v_key), ''));

    ELSIF p_kind = 'categories' THEN
      SELECT c.id INTO v_cat FROM public.categories c
       WHERE c.slug = btrim(COALESCE(v_row->>'category_slug',''));
      CONTINUE WHEN v_cat IS NULL;
      v_truth := public.cat_export_row(v_cat);
      CONTINUE WHEN v_truth IS NULL OR jsonb_typeof(v_truth) <> 'object';
      v_truth := jsonb_build_object(
        'category_path', COALESCE(v_truth->>'category_path',''),
        'name_am',       COALESCE(v_truth->>'name_am',''),
        'is_catchall',   COALESCE(v_truth->>'is_catchall',''),
        'listing_count', COALESCE(v_truth->>'listing_count',''));
    ELSE
      RAISE EXCEPTION 'unknown import kind';
    END IF;

    -- One entry per edited read-only cell, in column order.
    v_out := v_out || (
      SELECT COALESCE(jsonb_agg(jsonb_build_object(
               'file', v_file, 'row', v_num, 'column', k.key,
               'key', COALESCE(NULLIF(btrim(COALESCE(v_row->>'attribute_key','')), ''),
                               btrim(COALESCE(v_row->>'category_slug','')))
             ) ORDER BY k.ord), '[]'::jsonb)
        FROM jsonb_each_text(v_truth) WITH ORDINALITY AS k(key, val, ord)
       WHERE v_row ? k.key
         AND btrim(COALESCE(v_row->>k.key, '')) IS DISTINCT FROM btrim(COALESCE(k.val, ''))
    );
  END LOOP;

  RETURN v_out;
END $function$;

REVOKE ALL ON FUNCTION public.import_readonly_ignored(text, jsonb) FROM PUBLIC, anon, authenticated;

-- ============================================================
-- 3. GUIDED REFUSALS — the message names the fix
-- ============================================================
-- The vocabulary stays the server's; the guide only ADDS the `detail` the
-- console needs to speak plainly (the old slug behind a rename attempt).
CREATE OR REPLACE FUNCTION public.import_guide_refusals(
  p_kind text, p_rows jsonb, p_refusals jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_out  jsonb := '[]'::jsonb;
  v_ref  jsonb;
  v_row  jsonb;
  v_old  text;
BEGIN
  FOR v_ref IN SELECT value FROM jsonb_array_elements(COALESCE(p_refusals, '[]'::jsonb))
  LOOP
    IF p_kind = 'categories'
       AND v_ref->>'reason' IN ('slugRename','unknownSlug')
       AND COALESCE(v_ref->>'detail','') = '' THEN
      SELECT value INTO v_row
        FROM jsonb_array_elements(COALESCE(p_rows, '[]'::jsonb))
       WHERE COALESCE(NULLIF(value->>'row','')::int, -1) = COALESCE(NULLIF(v_ref->>'row','')::int, -2)
       LIMIT 1;

      v_old := NULL;
      IF v_row IS NOT NULL THEN
        -- The roster row this file is trying to rename: same primary parent
        -- and the same English name, but a slug the file does not carry.
        SELECT c.slug INTO v_old
          FROM public.categories c
         WHERE lower(btrim(c.name_en)) = lower(btrim(COALESCE(v_row->>'name_en','')))
           AND c.slug <> btrim(COALESCE(v_row->>'category_slug',''))
           AND NOT EXISTS (
                 SELECT 1 FROM jsonb_array_elements(COALESCE(p_rows,'[]'::jsonb)) o
                  WHERE btrim(COALESCE(o.value->>'category_slug','')) = c.slug)
         ORDER BY c.created_at
         LIMIT 1;
      END IF;

      IF v_old IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_object('reason','slugRename','detail', v_old);
      END IF;
    END IF;

    v_out := v_out || v_ref;
  END LOOP;

  RETURN v_out;
END $function$;

REVOKE ALL ON FUNCTION public.import_guide_refusals(text, jsonb, jsonb) FROM PUBLIC, anon, authenticated;

-- ============================================================
-- 4. THE PREVIEW DOORS — re-declared to carry both
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_preview_attribute_import(
  p_definitions jsonb, p_links jsonb, p_scope text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_plan    jsonb;
  v_ignored jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  v_plan := public.attr_import_plan(p_definitions, p_links, p_scope);
  v_ignored := public.import_readonly_ignored('definitions', p_definitions)
             || public.import_readonly_ignored('links', p_links);
  RETURN v_plan || jsonb_build_object(
    'ignored', v_ignored,
    'refusals', public.import_guide_refusals('attributes', NULL, v_plan->'refusals'));
END $function$;

REVOKE ALL ON FUNCTION public.admin_preview_attribute_import(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_preview_attribute_import(jsonb, jsonb, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_preview_category_import(p_rows jsonb, p_scope text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_plan jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  v_plan := public.cat_import_plan(p_rows, p_scope);
  RETURN v_plan || jsonb_build_object(
    'ignored', public.import_readonly_ignored('categories', p_rows),
    'refusals', public.import_guide_refusals('categories', p_rows, v_plan->'refusals'));
END $function$;

REVOKE ALL ON FUNCTION public.admin_preview_category_import(jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_preview_category_import(jsonb, text) TO authenticated;

-- ============================================================
-- 5. PROOFS
-- ============================================================
-- (a) SCOPE ISOLATION — neither plan can reach the other's doors.
DO $$
DECLARE
  v_attr text := pg_get_functiondef('public.attr_import_plan(jsonb,jsonb,text)'::regprocedure);
  v_cat  text := pg_get_functiondef('public.cat_import_plan(jsonb,text)'::regprocedure);
BEGIN
  IF v_cat ~* '(public\.)?attributes\b' OR v_cat ~* 'category_attribute_links' THEN
    RAISE EXCEPTION 'ISOLATION FAILED: the categories plan references attribute tables';
  END IF;
  IF v_attr ~* '(insert into|update|delete from)\s+public\.categor' THEN
    RAISE EXCEPTION 'ISOLATION FAILED: the attributes plan writes category tables';
  END IF;
  IF v_attr ~* 'admin_(create|update|retire|reactivate|delete)_category' THEN
    RAISE EXCEPTION 'ISOLATION FAILED: the attributes plan calls lifecycle doors';
  END IF;
  RAISE NOTICE 'ISOLATION OK: attributes plan -> attribute doors; categories plan -> lifecycle doors';
END $$;

-- (b) THE READ-ONLY REPORTER IS SILENT ON AN UNEDITED EXPORT.
DO $$
DECLARE
  v_rows jsonb;
  v_n    int;
BEGIN
  SELECT COALESCE(jsonb_agg(e.r || jsonb_build_object('row', e.ord::text)), '[]'::jsonb)
    INTO v_rows
    FROM jsonb_array_elements(public.cat_export_rows(NULL)) WITH ORDINALITY AS e(r, ord);
  SELECT jsonb_array_length(public.import_readonly_ignored('categories', v_rows)) INTO v_n;
  IF v_n <> 0 THEN
    RAISE EXCEPTION 'READ-ONLY PROOF FAILED: % ignored cells on an unedited export', v_n;
  END IF;
  RAISE NOTICE 'READ-ONLY PROOF OK: 0 ignored cells on the roster''s own export';
END $$;

-- (c) ACL READ-BACK.
DO $$
DECLARE
  v_sigs text[] := ARRAY[
    'public.import_readonly_ignored(text,jsonb)',
    'public.import_guide_refusals(text,jsonb,jsonb)'];
  v_sig text;
BEGIN
  FOREACH v_sig IN ARRAY v_sigs LOOP
    IF has_function_privilege('anon', v_sig, 'EXECUTE')
       OR has_function_privilege('authenticated', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: % is reachable from the client', v_sig;
    END IF;
  END LOOP;
  IF NOT has_function_privilege('authenticated',
        'public.admin_preview_category_import(jsonb,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'CLOSER FAILED: the categories preview door is closed to authenticated';
  END IF;
  RAISE NOTICE 'ACL OK: helpers server-only; preview doors open to authenticated';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260908010000') ON CONFLICT DO NOTHING;