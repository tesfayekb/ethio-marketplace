-- IE-3b — SILENT READ-ONLY REPORTER (INC-178), ONE SERIALIZER, GUIDED SLUG RENAME
-- Corrective for 20260907194932 (categories import), 20260907185010 /
-- 20260907191856 (attributes import) and 20260907202049 (IE-3).
-- Additive: one normaliser, one attributes serializer, the read-only reporter
-- and the refusal guide re-declared, and cat_import_plan re-declared with the
-- slug-rename detector moved AHEAD of the parent check.
-- DEFINER/REVOKE pairing (DEC-022-B) is restated for every DEFINER below.

-- ============================================================
-- 1. ONE NORMALISER FOR EVERY CELL, EDITABLE OR READ-ONLY
-- ============================================================
-- The reporter used to compare read-only cells as raw text while the planners
-- compared editable cells semantically (INC-178): a boolean spelled the same
-- way but derived twice, or a name_am read through a different status filter,
-- reported the whole roster as "edited". One normaliser now serves both.
CREATE OR REPLACE FUNCTION public.import_norm(p_column text, p_value text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $function$
  SELECT CASE
    WHEN p_column IN ('is_active','allow_listings','is_catchall','price_enabled',
                      'is_required','is_filterable','is_per_variant')
      THEN CASE WHEN btrim(COALESCE(p_value,'')) = '' THEN ''
                WHEN public.cat_bool(p_value, false) THEN 'true' ELSE 'false' END
    WHEN p_column IN ('excluded_country_codes','secondary_parents')
      THEN array_to_string(public.cat_pipe(p_value), '|')
    WHEN p_column IN ('visible_from','visible_until')
      THEN COALESCE(to_char(public.cat_ts(p_value) AT TIME ZONE 'UTC',
                            'YYYY-MM-DD"T"HH24:MI:SS"Z"'), '')
    WHEN p_column IN ('display_order','expiry_days','listing_count',
                      'direct_link_count','card_rank')
      THEN COALESCE(public.cat_int(p_value)::text, '')
    ELSE btrim(COALESCE(p_value, ''))
  END
$function$;

REVOKE ALL ON FUNCTION public.import_norm(text, text) FROM PUBLIC, anon;

-- ============================================================
-- 2. THE ATTRIBUTES SERIALIZER — the RPC emits the CSV's own text
-- ============================================================
-- PART A: every cell leaves the database as the exact text the file carries
-- (booleans 'true'/'false', nulls '', pipes joined, counts decimal). The route
-- only quotes and escapes; nothing is formatted twice.
CREATE OR REPLACE FUNCTION public.attr_export_payload(p_scope_slug text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $function$
DECLARE
  v_defs  jsonb;
  v_links jsonb;
  v_scope uuid;
  v_keys  text[];
BEGIN
  IF p_scope_slug IS NOT NULL THEN
    SELECT c.id INTO v_scope FROM public.categories c WHERE c.slug = p_scope_slug;
    IF v_scope IS NULL THEN
      RAISE EXCEPTION 'unknown category scope';
    END IF;
  END IF;

  WITH RECURSIVE scope AS (
    SELECT v_scope AS id, 0 AS d
    UNION ALL
    SELECT p.child_id, s.d + 1
      FROM scope s
      JOIN public.category_tree_pointers p ON p.parent_id = s.id
     WHERE s.d < 10
  ),
  anc AS (
    SELECT c.id AS cat_id, c.id AS src_id, 0 AS depth
      FROM public.categories c
    UNION ALL
    SELECT a.cat_id, p.parent_id, a.depth + 1
      FROM anc a
      JOIN public.category_tree_pointers p
        ON p.child_id = a.src_id AND p.parent_id IS NOT NULL
     WHERE a.depth < 10
  ),
  pathq AS (
    SELECT c.id, c.id AS cur, c.name_en::text AS path, 0 AS d
      FROM public.categories c
    UNION ALL
    SELECT q.id, pp.parent_id, cp.name_en || ' / ' || q.path, q.d + 1
      FROM pathq q
      JOIN LATERAL (
             SELECT t.parent_id
               FROM public.category_tree_pointers t
              WHERE t.child_id = q.cur AND t.parent_id IS NOT NULL
              ORDER BY t.display_order, t.parent_id
              LIMIT 1
           ) pp ON true
      JOIN public.categories cp ON cp.id = pp.parent_id
     WHERE q.d < 10
  ),
  best_path AS (
    SELECT DISTINCT ON (id) id, path FROM pathq ORDER BY id, d DESC
  ),
  eff AS (
    SELECT DISTINCT ON (anc.cat_id, l.attribute_id)
           anc.cat_id,
           l.attribute_id,
           l.is_required,
           l.is_filterable,
           l.card_rank,
           src.slug AS origin
      FROM anc
      JOIN public.category_attribute_links l ON l.category_id = anc.src_id
      JOIN public.categories src ON src.id = anc.src_id
     WHERE p_scope_slug IS NULL OR anc.cat_id IN (SELECT s.id FROM scope s)
     ORDER BY anc.cat_id, l.attribute_id, anc.depth ASC, src.slug
  )
  SELECT COALESCE(jsonb_agg(r.row ORDER BY r.path, r.attr_key), '[]'::jsonb)
    INTO v_links
    FROM (
      SELECT bp.path,
             a.attr_key,
             jsonb_build_object(
               'category_path', bp.path,
               'category_slug', c.slug,
               'attribute_key', a.attr_key,
               'is_required', CASE WHEN eff.is_required THEN 'true' ELSE 'false' END,
               'is_filterable', CASE WHEN eff.is_filterable THEN 'true' ELSE 'false' END,
               'card_rank', COALESCE(eff.card_rank::text, ''),
               'origin', COALESCE(eff.origin, '')
             ) AS row
        FROM eff
        JOIN public.categories c ON c.id = eff.cat_id
        JOIN public.attributes a ON a.id = eff.attribute_id
        JOIN best_path bp ON bp.id = eff.cat_id
    ) r;

  SELECT array_agg(DISTINCT x->>'attribute_key')
    INTO v_keys
    FROM jsonb_array_elements(v_links) x;

  SELECT COALESCE(jsonb_agg(d.row ORDER BY d.attr_key), '[]'::jsonb)
    INTO v_defs
    FROM (
      SELECT a.attr_key,
             jsonb_build_object(
               'attribute_key', a.attr_key,
               'label_en', COALESCE(a.name_en, ''),
               'label_am', COALESCE(t.value, a.name_am, ''),
               'type', COALESCE(a.attr_type, ''),
               'options', COALESCE(
                 (SELECT string_agg(o.x, '|' ORDER BY o.ord)
                    FROM jsonb_array_elements_text(
                           CASE WHEN jsonb_typeof(a.options) = 'array'
                                THEN a.options ELSE '[]'::jsonb END
                         ) WITH ORDINALITY AS o(x, ord)),
                 ''),
               'is_per_variant', '',
               'direct_link_count',
                 (SELECT count(*)::text FROM public.category_attribute_links l
                   WHERE l.attribute_id = a.id)
             ) AS row
        FROM public.attributes a
        LEFT JOIN public.entity_translations t
               ON t.entity_type = 'attribute'
              AND t.entity_id = a.id
              AND t.field = 'label'
              AND t.lang_code = 'am'
              AND t.status = 'approved'
       WHERE p_scope_slug IS NULL
          OR a.attr_key = ANY(COALESCE(v_keys, ARRAY[]::text[]))
    ) d;

  RETURN jsonb_build_object('definitions', v_defs, 'links', v_links);
END $function$;

REVOKE ALL ON FUNCTION public.attr_export_payload(text) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.admin_export_attributes(p_scope_slug text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  RETURN public.attr_export_payload(p_scope_slug);
END $function$;

REVOKE ALL ON FUNCTION public.admin_export_attributes(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_attributes(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_export_attributes()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN public.admin_export_attributes(NULL::text);
END $function$;

REVOKE ALL ON FUNCTION public.admin_export_attributes() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_attributes() TO authenticated;

-- ============================================================
-- 3. THE READ-ONLY REPORTER — silent unless a cell really differs
-- ============================================================
-- Truth comes from the SAME serializer the export uses (no second derivation),
-- and both sides pass through import_norm. A column that merely EXISTS in the
-- file is never reported; only a cell whose normalised value differs is.
CREATE OR REPLACE FUNCTION public.import_readonly_ignored(p_kind text, p_rows jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_out   jsonb := '[]'::jsonb;
  v_map   jsonb := '{}'::jsonb;
  v_cols  text[];
  v_row   jsonb;
  v_num   int;
  v_id    text;
  v_truth jsonb;
  v_col   text;
BEGIN
  IF p_kind = 'definitions' THEN
    v_cols := ARRAY['label_am','is_per_variant','direct_link_count'];
    SELECT COALESCE(jsonb_object_agg(d->>'attribute_key', d), '{}'::jsonb) INTO v_map
      FROM jsonb_array_elements(public.attr_export_payload(NULL)->'definitions') d;

  ELSIF p_kind = 'links' THEN
    v_cols := ARRAY['category_path','origin'];
    SELECT COALESCE(jsonb_object_agg((l->>'category_slug') || '/' || (l->>'attribute_key'), l),
                    '{}'::jsonb) INTO v_map
      FROM jsonb_array_elements(public.attr_export_payload(NULL)->'links') l;

  ELSIF p_kind = 'categories' THEN
    -- origin_scope names the download, not the row: never compared, never applied.
    v_cols := ARRAY['category_path','name_am','is_catchall','listing_count'];
    SELECT COALESCE(jsonb_object_agg(c->>'category_slug', c), '{}'::jsonb) INTO v_map
      FROM jsonb_array_elements(public.cat_export_rows(NULL)) c;

  ELSE
    RAISE EXCEPTION 'unknown import kind';
  END IF;

  FOR v_row IN SELECT value FROM jsonb_array_elements(COALESCE(p_rows, '[]'::jsonb))
  LOOP
    v_num := COALESCE(public.cat_int(v_row->>'row'), 0);

    IF p_kind = 'definitions' THEN
      v_id := btrim(COALESCE(v_row->>'attribute_key',''));
    ELSIF p_kind = 'links' THEN
      v_id := btrim(COALESCE(v_row->>'category_slug','')) || '/'
              || btrim(COALESCE(v_row->>'attribute_key',''));
    ELSE
      v_id := lower(btrim(COALESCE(v_row->>'category_slug','')));
    END IF;

    v_truth := v_map -> v_id;
    CONTINUE WHEN v_truth IS NULL OR jsonb_typeof(v_truth) <> 'object';

    FOREACH v_col IN ARRAY v_cols LOOP
      CONTINUE WHEN NOT (v_row ? v_col);
      IF public.import_norm(v_col, v_row->>v_col)
         IS DISTINCT FROM public.import_norm(v_col, v_truth->>v_col) THEN
        v_out := v_out || jsonb_build_object(
          'file', p_kind, 'row', v_num, 'column', v_col,
          'key', COALESCE(NULLIF(btrim(COALESCE(v_row->>'attribute_key','')), ''),
                          btrim(COALESCE(v_row->>'category_slug',''))));
      END IF;
    END LOOP;
  END LOOP;

  RETURN v_out;
END $function$;

REVOKE ALL ON FUNCTION public.import_readonly_ignored(text, jsonb) FROM PUBLIC, anon, authenticated;

-- ============================================================
-- 4. THE REFUSAL GUIDE — matched on category_path + parent_slug
-- ============================================================
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
  v_out    jsonb := '[]'::jsonb;
  v_export jsonb := NULL;
  v_ref    jsonb;
  v_row    jsonb;
  v_old    text;
BEGIN
  FOR v_ref IN SELECT value FROM jsonb_array_elements(COALESCE(p_refusals, '[]'::jsonb))
  LOOP
    IF p_kind = 'categories'
       AND v_ref->>'reason' IN ('slugRename','unknownSlug')
       AND COALESCE(v_ref->>'detail','') = '' THEN
      SELECT value INTO v_row
        FROM jsonb_array_elements(COALESCE(p_rows, '[]'::jsonb))
       WHERE COALESCE(public.cat_int(value->>'row'), -1)
             = COALESCE(public.cat_int(v_ref->>'row'), -2)
       LIMIT 1;

      v_old := NULL;
      IF v_row IS NOT NULL THEN
        IF v_export IS NULL THEN v_export := public.cat_export_rows(NULL); END IF;
        -- The roster row this file is trying to rename: the SAME address in
        -- the tree (path + primary parent), a slug the file does not carry.
        SELECT r->>'category_slug' INTO v_old
          FROM jsonb_array_elements(v_export) r
         WHERE btrim(COALESCE(v_row->>'category_path','')) <> ''
           AND btrim(COALESCE(r->>'category_path','')) = btrim(COALESCE(v_row->>'category_path',''))
           AND lower(btrim(COALESCE(r->>'parent_slug','')))
               = lower(btrim(COALESCE(v_row->>'parent_slug','')))
           AND lower(btrim(COALESCE(r->>'category_slug','')))
               <> lower(btrim(COALESCE(v_row->>'category_slug','')))
           AND NOT EXISTS (
                 SELECT 1 FROM jsonb_array_elements(COALESCE(p_rows,'[]'::jsonb)) o
                  WHERE lower(btrim(COALESCE(o.value->>'category_slug','')))
                        = lower(btrim(COALESCE(r->>'category_slug',''))))
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
-- 5. THE CATEGORIES PLAN — rename detected BEFORE the parent check
-- ============================================================
-- PART C: an operator who edits the slug of a ROOT category used to fall into
-- "unknownSlug" (no parent to check a sibling name against). The detector now
-- runs first and matches on the row's own read-only address (category_path)
-- plus its parent, so the refusal always names the old slug and the fix.
CREATE OR REPLACE FUNCTION public.cat_import_plan(p_rows jsonb, p_scope text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_scope uuid;
  v_scope_set uuid[] := NULL;
  v_row jsonb;
  v_num int;
  v_slug text;
  v_action text;
  v_cat public.categories%ROWTYPE;
  v_parent public.categories%ROWTYPE;
  v_parent_slug text;
  v_seen text[] := '{}';
  v_ref jsonb := '[]'::jsonb;
  v_items jsonb := '[]'::jsonb;
  v_delta jsonb;
  v_cur jsonb;
  v_adds int := 0; v_changes int := 0; v_retires int := 0;
  v_reacts int := 0; v_deletes int := 0; v_unchanged int := 0;
  v_children int; v_listings int;
  v_name_am text;
  v_order int;
  v_export jsonb := NULL;
  v_rename text;
BEGIN
  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    SELECT c.id INTO v_scope FROM public.categories c WHERE c.slug = lower(btrim(p_scope));
    IF v_scope IS NULL THEN RAISE EXCEPTION 'unknown category scope'; END IF;
    SELECT array_agg(d.id) INTO v_scope_set FROM public.cat_descendants(v_scope) d;
  END IF;

  FOR v_row IN SELECT * FROM jsonb_array_elements(COALESCE(p_rows, '[]'::jsonb))
  LOOP
    v_num := COALESCE(public.cat_int(v_row->>'row'), 0);
    v_slug := lower(COALESCE(public.cat_text(v_row->>'category_slug'), ''));
    v_action := lower(COALESCE(public.cat_text(v_row->>'action'), 'upsert'));
    v_parent_slug := lower(COALESCE(public.cat_text(v_row->>'parent_slug'), ''));

    IF v_slug = '' THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key','',
                                           'reason','missingSlug');
      CONTINUE;
    END IF;

    IF v_slug = ANY (v_seen) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','duplicateSlug');
      CONTINUE;
    END IF;
    v_seen := v_seen || v_slug;

    IF v_action NOT IN ('upsert','create-root','retire','reactivate','delete') THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badAction');
      CONTINUE;
    END IF;

    SELECT * INTO v_cat FROM public.categories c WHERE c.slug = v_slug;

    -- Scope law: an existing row must live inside the filtered subtree.
    IF v_scope_set IS NOT NULL AND v_cat.id IS NOT NULL
       AND NOT (v_cat.id = ANY (v_scope_set)) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','outOfScope');
      CONTINUE;
    END IF;

    -- ---------- CREATE ----------
    IF v_cat.id IS NULL THEN
      IF v_action IN ('retire','reactivate') THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownSlug');
        CONTINUE;
      END IF;
      IF v_action = 'delete' THEN
        v_unchanged := v_unchanged + 1;
        CONTINUE;
      END IF;

      -- SLUG RENAME, FIRST. The row still carries the read-only address of an
      -- existing category the file has otherwise dropped: slugs are identity.
      IF v_action <> 'create-root'
         AND btrim(COALESCE(v_row->>'category_path','')) <> '' THEN
        IF v_export IS NULL THEN v_export := public.cat_export_rows(NULL); END IF;
        v_rename := NULL;
        SELECT r->>'category_slug' INTO v_rename
          FROM jsonb_array_elements(v_export) r
         WHERE btrim(COALESCE(r->>'category_path','')) = btrim(COALESCE(v_row->>'category_path',''))
           AND lower(btrim(COALESCE(r->>'parent_slug',''))) = v_parent_slug
           AND lower(btrim(COALESCE(r->>'category_slug',''))) <> v_slug
           AND NOT EXISTS (
                 SELECT 1 FROM jsonb_array_elements(COALESCE(p_rows,'[]'::jsonb)) o
                  WHERE lower(btrim(COALESCE(o.value->>'category_slug','')))
                        = lower(btrim(COALESCE(r->>'category_slug',''))))
         LIMIT 1;
        IF v_rename IS NOT NULL THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','slugRename','detail', v_rename);
          CONTINUE;
        END IF;
      END IF;

      IF v_parent_slug = '' AND v_action <> 'create-root' THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownSlug');
        CONTINUE;
      END IF;
      IF v_parent_slug <> '' THEN
        SELECT * INTO v_parent FROM public.categories c WHERE c.slug = v_parent_slug;
        IF v_parent.id IS NULL THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','unknownParent');
          CONTINUE;
        END IF;
        IF v_parent.is_catchall THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','catchallParent');
          CONTINUE;
        END IF;
        IF v_scope_set IS NOT NULL AND NOT (v_parent.id = ANY (v_scope_set)) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','outOfScope');
          CONTINUE;
        END IF;
        -- A rename arriving as a create whose name already belongs to a
        -- sibling: still refused, with the sibling's slug as the fix.
        SELECT sib.slug INTO v_rename
          FROM public.categories sib
          JOIN public.category_tree_pointers p ON p.child_id = sib.id
         WHERE p.parent_id = v_parent.id
           AND lower(btrim(sib.name_en)) = lower(btrim(COALESCE(v_row->>'name_en','')))
         LIMIT 1;
        IF v_rename IS NOT NULL THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','slugRename','detail', v_rename);
          CONTINUE;
        END IF;
      ELSE
        v_parent := NULL;
      END IF;

      IF public.cat_text(v_row->>'name_en') IS NULL THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','missingName');
        CONTINUE;
      END IF;

      IF (public.cat_text(v_row->>'visible_from') IS NOT NULL
            AND public.cat_ts(v_row->>'visible_from') IS NULL)
         OR (public.cat_text(v_row->>'visible_until') IS NOT NULL
            AND public.cat_ts(v_row->>'visible_until') IS NULL) THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','badDate');
        CONTINUE;
      END IF;

      v_adds := v_adds + 1;
      v_items := v_items || jsonb_build_object(
        'row', v_num, 'slug', v_slug, 'op', 'create',
        'parent_slug', NULLIF(v_parent_slug, ''),
        'fields', jsonb_build_object(
          'name_en', public.cat_text(v_row->>'name_en'),
          'name_am', public.cat_text(v_row->>'name_am'),
          'icon', public.cat_text(v_row->>'icon'),
          'allow_listings', public.cat_bool(v_row->>'allow_listings', true),
          'price_enabled', public.cat_bool(v_row->>'price_enabled', true),
          'expiry_days', public.cat_int(v_row->>'expiry_days'),
          'display_order', public.cat_int(v_row->>'display_order'),
          'visible_from', public.cat_ts(v_row->>'visible_from'),
          'visible_until', public.cat_ts(v_row->>'visible_until'),
          'excluded_country_codes', to_jsonb(public.cat_pipe(v_row->>'excluded_country_codes')),
          'secondary_parents', to_jsonb(public.cat_pipe(v_row->>'secondary_parents'))));
      CONTINUE;
    END IF;

    -- ---------- RETIRE / REACTIVATE / DELETE ----------
    IF v_action = 'retire' THEN
      IF NOT v_cat.is_active THEN v_unchanged := v_unchanged + 1; CONTINUE; END IF;
      SELECT count(*)::int INTO v_listings FROM public.listings l
       WHERE l.category_id = v_cat.id AND l.status = 'active';
      IF v_listings > 0 THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                          'reason','hasListings','detail', v_listings::text);
        CONTINUE;
      END IF;
      v_retires := v_retires + 1;
      v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','retire');
      CONTINUE;
    END IF;

    IF v_action = 'reactivate' THEN
      IF v_cat.is_active THEN v_unchanged := v_unchanged + 1; CONTINUE; END IF;
      v_reacts := v_reacts + 1;
      v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','reactivate');
      CONTINUE;
    END IF;

    IF v_action = 'delete' THEN
      SELECT count(*)::int INTO v_children FROM public.category_tree_pointers p
       WHERE p.parent_id = v_cat.id;
      IF v_children > 0 THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                          'reason','hasChildren','detail', v_children::text);
        CONTINUE;
      END IF;
      SELECT count(*)::int INTO v_listings FROM public.listings l WHERE l.category_id = v_cat.id;
      IF v_listings > 0 THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                          'reason','hasListings','detail', v_listings::text);
        CONTINUE;
      END IF;
      IF v_cat.is_active THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','deleteActive');
        CONTINUE;
      END IF;
      v_deletes := v_deletes + 1;
      v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','delete');
      CONTINUE;
    END IF;

    -- ---------- UPSERT (semantic diff against the export shape) ----------
    v_cur := public.cat_export_row(v_cat.id);
    v_delta := '{}'::jsonb;

    IF (public.cat_text(v_row->>'visible_from') IS NOT NULL
          AND public.cat_ts(v_row->>'visible_from') IS NULL)
       OR (public.cat_text(v_row->>'visible_until') IS NOT NULL
          AND public.cat_ts(v_row->>'visible_until') IS NULL) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badDate');
      CONTINUE;
    END IF;

    IF public.cat_text(v_row->>'name_en') IS NOT NULL
       AND public.cat_text(v_row->>'name_en') IS DISTINCT FROM btrim(v_cat.name_en) THEN
      v_delta := v_delta || jsonb_build_object('name_en', public.cat_text(v_row->>'name_en'));
    END IF;

    IF COALESCE(public.cat_text(v_row->>'icon'), '')
       IS DISTINCT FROM COALESCE(v_cur->>'icon', '') THEN
      v_delta := v_delta || jsonb_build_object('icon', COALESCE(public.cat_text(v_row->>'icon'), ''));
    END IF;

    IF public.cat_bool(v_row->>'allow_listings', v_cat.allow_listings) IS DISTINCT FROM v_cat.allow_listings THEN
      v_delta := v_delta || jsonb_build_object('allow_listings',
                    public.cat_bool(v_row->>'allow_listings', v_cat.allow_listings));
    END IF;

    IF public.cat_bool(v_row->>'price_enabled', v_cat.price_enabled) IS DISTINCT FROM v_cat.price_enabled THEN
      v_delta := v_delta || jsonb_build_object('price_enabled',
                    public.cat_bool(v_row->>'price_enabled', v_cat.price_enabled));
    END IF;

    IF public.cat_int(v_row->>'expiry_days') IS DISTINCT FROM v_cat.expiry_days THEN
      v_delta := v_delta || jsonb_build_object('expiry_days', public.cat_int(v_row->>'expiry_days'));
    END IF;

    v_order := public.cat_int(v_row->>'display_order');
    IF v_order IS NOT NULL AND v_order IS DISTINCT FROM public.cat_int(v_cur->>'display_order') THEN
      v_delta := v_delta || jsonb_build_object('display_order', v_order);
    END IF;

    v_name_am := public.cat_text(v_row->>'name_am');
    IF COALESCE(v_name_am, '') IS DISTINCT FROM COALESCE(v_cur->>'name_am', '') THEN
      v_delta := v_delta || jsonb_build_object('name_am', COALESCE(v_name_am, ''));
    END IF;

    IF public.cat_ts(v_row->>'visible_from') IS DISTINCT FROM v_cat.visible_from
       OR public.cat_ts(v_row->>'visible_until') IS DISTINCT FROM v_cat.visible_until THEN
      v_delta := v_delta || jsonb_build_object(
        'visible_from', public.cat_ts(v_row->>'visible_from'),
        'visible_until', public.cat_ts(v_row->>'visible_until'));
    END IF;

    IF public.cat_pipe(v_row->>'excluded_country_codes')
       IS DISTINCT FROM public.cat_pipe(v_cur->>'excluded_country_codes') THEN
      IF EXISTS (SELECT 1 FROM unnest(public.cat_pipe(v_row->>'excluded_country_codes')) code
                  WHERE NOT EXISTS (SELECT 1 FROM public.countries c
                                     WHERE lower(c.code) = code)) THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownCountry');
        CONTINUE;
      END IF;
      v_delta := v_delta || jsonb_build_object('excluded_country_codes',
                    to_jsonb(public.cat_pipe(v_row->>'excluded_country_codes')));
    END IF;

    -- Parent change → reparent through the pointer door (cycle + catch-all law).
    IF v_parent_slug IS DISTINCT FROM COALESCE(v_cur->>'parent_slug', '') THEN
      IF v_parent_slug = '' THEN
        v_delta := v_delta || jsonb_build_object('parent_slug', '');
      ELSE
        SELECT * INTO v_parent FROM public.categories c WHERE c.slug = v_parent_slug;
        IF v_parent.id IS NULL THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','unknownParent');
          CONTINUE;
        END IF;
        IF v_parent.is_catchall THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','catchallParent');
          CONTINUE;
        END IF;
        IF v_parent.id = v_cat.id
           OR v_parent.id IN (SELECT d.id FROM public.cat_descendants(v_cat.id) d) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','cycle');
          CONTINUE;
        END IF;
        v_delta := v_delta || jsonb_build_object('parent_slug', v_parent_slug);
      END IF;
    END IF;

    IF public.cat_pipe(v_row->>'secondary_parents')
       IS DISTINCT FROM public.cat_pipe(v_cur->>'secondary_parents') THEN
      IF EXISTS (SELECT 1 FROM unnest(public.cat_pipe(v_row->>'secondary_parents')) s
                  WHERE NOT EXISTS (SELECT 1 FROM public.categories c
                                     WHERE c.slug = s AND NOT c.is_catchall)) THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownParent');
        CONTINUE;
      END IF;
      v_delta := v_delta || jsonb_build_object('secondary_parents',
                    to_jsonb(public.cat_pipe(v_row->>'secondary_parents')));
    END IF;

    IF v_delta = '{}'::jsonb THEN
      v_unchanged := v_unchanged + 1;
    ELSE
      v_changes := v_changes + 1;
      v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                               'fields', v_delta);
    END IF;
  END LOOP;

  RETURN jsonb_build_object(
    'counts', jsonb_build_object(
      'adds', v_adds, 'changes', v_changes, 'retires', v_retires,
      'reactivations', v_reacts, 'deletes', v_deletes,
      'unchanged', v_unchanged, 'refusals', jsonb_array_length(v_ref)),
    'refusals', v_ref,
    'items', v_items);
END $function$;

REVOKE ALL ON FUNCTION public.cat_import_plan(jsonb, text) FROM PUBLIC, anon, authenticated;

-- ============================================================
-- 6. PROOFS
-- ============================================================
-- (a) SILENCE + NO-OP on the live roster's own export.
DO $$
DECLARE
  v_rows jsonb;
  v_plan jsonb;
  v_n    int;
BEGIN
  SELECT COALESCE(jsonb_agg(e.r || jsonb_build_object('row', (e.ord + 1)::text)), '[]'::jsonb)
    INTO v_rows
    FROM jsonb_array_elements(public.cat_export_rows(NULL)) WITH ORDINALITY AS e(r, ord);

  SELECT jsonb_array_length(public.import_readonly_ignored('categories', v_rows)) INTO v_n;
  IF v_n <> 0 THEN
    RAISE EXCEPTION 'SILENCE FAILED (categories): % ignored cells on an unedited export', v_n;
  END IF;

  v_plan := public.cat_import_plan(v_rows, NULL);
  IF (v_plan->'counts'->>'changes')::int <> 0
     OR (v_plan->'counts'->>'adds')::int <> 0
     OR (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'SILENCE FAILED (categories): plan is not a no-op %', v_plan->'counts';
  END IF;
  RAISE NOTICE 'SILENCE OK (categories): 0 ignored, 0 changes, % unchanged',
    v_plan->'counts'->>'unchanged';
END $$;

-- (b) SILENCE + NO-OP on the live attribute library's own export.
DO $$
DECLARE
  v_pay   jsonb := public.attr_export_payload(NULL);
  v_defs  jsonb;
  v_links jsonb;
  v_plan  jsonb;
  v_n     int;
BEGIN
  SELECT COALESCE(jsonb_agg(e.r || jsonb_build_object('row', (e.ord + 1)::text)), '[]'::jsonb)
    INTO v_defs
    FROM jsonb_array_elements(v_pay->'definitions') WITH ORDINALITY AS e(r, ord);
  SELECT COALESCE(jsonb_agg(e.r || jsonb_build_object('row', (e.ord + 1)::text)), '[]'::jsonb)
    INTO v_links
    FROM jsonb_array_elements(v_pay->'links') WITH ORDINALITY AS e(r, ord);

  SELECT jsonb_array_length(public.import_readonly_ignored('definitions', v_defs))
       + jsonb_array_length(public.import_readonly_ignored('links', v_links))
    INTO v_n;
  IF v_n <> 0 THEN
    RAISE EXCEPTION 'SILENCE FAILED (attributes): % ignored cells on an unedited export', v_n;
  END IF;

  v_plan := public.attr_import_plan(v_defs, v_links, NULL);
  IF (v_plan->'counts'->>'changes')::int <> 0
     OR (v_plan->'counts'->>'adds')::int <> 0
     OR (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'SILENCE FAILED (attributes): plan is not a no-op %', v_plan->'counts';
  END IF;
  RAISE NOTICE 'SILENCE OK (attributes): 0 ignored, 0 changes, % unchanged',
    v_plan->'counts'->>'unchanged';
END $$;

-- (c) THE OPERATOR'S EDIT, ON REAL DATA: auto-parts -> auto-part.
DO $$
DECLARE
  v_src  jsonb;
  v_row  jsonb;
  v_plan jsonb;
  v_ref  jsonb;
BEGIN
  SELECT r INTO v_src FROM jsonb_array_elements(public.cat_export_rows(NULL)) r
   WHERE r->>'category_slug' = 'auto-parts';
  IF v_src IS NULL THEN
    RAISE NOTICE 'RENAME PROOF SKIPPED: auto-parts is not in this roster';
    RETURN;
  END IF;

  v_row := v_src || jsonb_build_object('category_slug','auto-part','row','10');
  v_plan := public.cat_import_plan(jsonb_build_array(v_row), NULL);
  v_ref := v_plan->'refusals'->0;

  IF COALESCE(v_ref->>'reason','') <> 'slugRename' OR COALESCE(v_ref->>'detail','') <> 'auto-parts' THEN
    RAISE EXCEPTION 'RENAME PROOF FAILED: row 10 decided as % (detail %)',
      COALESCE(v_ref->>'reason','none'), COALESCE(v_ref->>'detail','');
  END IF;
  IF (v_plan->'counts'->>'adds')::int <> 0 THEN
    RAISE EXCEPTION 'RENAME PROOF FAILED: the rename was planned as a create';
  END IF;
  RAISE NOTICE 'RENAME PROOF OK: row 10 -> slugRename, old slug auto-parts, 0 adds';
END $$;

-- (d) ACL READ-BACK.
DO $$
DECLARE
  v_closed text[] := ARRAY[
    'public.import_readonly_ignored(text,jsonb)',
    'public.import_guide_refusals(text,jsonb,jsonb)',
    'public.cat_import_plan(jsonb,text)',
    'public.attr_export_payload(text)'];
  v_sig text;
BEGIN
  FOREACH v_sig IN ARRAY v_closed LOOP
    IF has_function_privilege('anon', v_sig, 'EXECUTE')
       OR has_function_privilege('authenticated', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: % is reachable from the client', v_sig;
    END IF;
  END LOOP;
  IF NOT has_function_privilege('authenticated',
        'public.admin_export_attributes(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated',
        'public.admin_export_attributes()', 'EXECUTE') THEN
    RAISE EXCEPTION 'CLOSER FAILED: the attributes export door is closed to authenticated';
  END IF;
  IF has_function_privilege('anon', 'public.admin_export_attributes(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'CLOSER FAILED: the attributes export door is open to anon';
  END IF;
  RAISE NOTICE 'ACL OK: serializer + planners server-only; export doors authenticated-only';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260908040000') ON CONFLICT DO NOTHING;