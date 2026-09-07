-- CAT-IE — CATEGORY EXPORT + IMPORT (preview → confirm/discard → undo)
-- Every mutation travels through the existing lifecycle doors (F5: gates →
-- capture → mutate). Permission: categories:import (registered by IE-2).

-- ============================================================
-- 1. CAPTURE TABLE — old → new, batch-tagged (undo's only source)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.category_import_revisions (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id   uuid NOT NULL,
  action     text NOT NULL CHECK (action IN ('create','update','retire','reactivate','delete')),
  entity_key text NOT NULL,
  prev       jsonb,
  post       jsonb,
  undone_at  timestamptz,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.category_import_revisions TO service_role;

ALTER TABLE public.category_import_revisions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS category_import_revisions_no_client_access
  ON public.category_import_revisions;
CREATE POLICY category_import_revisions_no_client_access
  ON public.category_import_revisions
  FOR ALL TO authenticated, anon
  USING (false) WITH CHECK (false);

CREATE INDEX IF NOT EXISTS idx_cir_batch
  ON public.category_import_revisions(batch_id, id);

-- ============================================================
-- 2. NORMALISERS (INC-177 discipline: semantic, not textual)
-- ============================================================
CREATE OR REPLACE FUNCTION public.cat_bool(p_text text, p_default boolean)
RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path TO 'public' AS $$
  SELECT CASE
           WHEN p_text IS NULL OR btrim(p_text) = '' THEN p_default
           WHEN lower(btrim(p_text)) IN ('true','t','1','yes','y') THEN true
           ELSE false
         END
$$;

CREATE OR REPLACE FUNCTION public.cat_pipe(p_text text)
RETURNS text[] LANGUAGE sql IMMUTABLE SET search_path TO 'public' AS $$
  SELECT COALESCE(
    (SELECT array_agg(v ORDER BY v)
       FROM (SELECT DISTINCT lower(btrim(x)) AS v
               FROM unnest(string_to_array(COALESCE(p_text, ''), '|')) AS x
              WHERE btrim(x) <> '') s),
    '{}'::text[])
$$;

CREATE OR REPLACE FUNCTION public.cat_int(p_text text)
RETURNS integer LANGUAGE plpgsql IMMUTABLE SET search_path TO 'public' AS $$
BEGIN
  IF p_text IS NULL OR btrim(p_text) = '' THEN RETURN NULL; END IF;
  RETURN btrim(p_text)::integer;
EXCEPTION WHEN others THEN RETURN NULL;
END $$;

CREATE OR REPLACE FUNCTION public.cat_ts(p_text text)
RETURNS timestamptz LANGUAGE plpgsql IMMUTABLE SET search_path TO 'public' AS $$
BEGIN
  IF p_text IS NULL OR btrim(p_text) = '' THEN RETURN NULL; END IF;
  RETURN btrim(p_text)::timestamptz;
EXCEPTION WHEN others THEN RETURN NULL;
END $$;

CREATE OR REPLACE FUNCTION public.cat_text(p_text text)
RETURNS text LANGUAGE sql IMMUTABLE SET search_path TO 'public' AS $$
  SELECT NULLIF(btrim(COALESCE(p_text, '')), '')
$$;

-- ============================================================
-- 3. TREE READERS (internal)
-- ============================================================
CREATE OR REPLACE FUNCTION public.cat_primary_pointer(p_id uuid)
RETURNS TABLE(pointer_id uuid, parent_id uuid, display_order integer)
LANGUAGE sql STABLE SET search_path TO 'public' AS $$
  SELECT p.id, p.parent_id, p.display_order
    FROM public.category_tree_pointers p
    LEFT JOIN public.categories pc ON pc.id = p.parent_id
   WHERE p.child_id = p_id
     AND (p.parent_id IS NULL OR pc.is_active)
   ORDER BY (p.parent_id IS NOT NULL), p.display_order, p.created_at
   LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.cat_descendants(p_root uuid)
RETURNS TABLE(id uuid)
LANGUAGE sql STABLE SET search_path TO 'public' AS $$
  WITH RECURSIVE d AS (
    SELECT p_root AS id, 0 AS depth
    UNION ALL
    SELECT p.child_id, d.depth + 1
      FROM public.category_tree_pointers p
      JOIN d ON p.parent_id = d.id
     WHERE d.depth < 20
  )
  SELECT DISTINCT d.id FROM d
$$;

-- One row of the export, as jsonb keyed by the CSV column names. Used by the
-- export door AND by the import's capture (prev/post snapshots).
CREATE OR REPLACE FUNCTION public.cat_export_rows(p_scope uuid)
RETURNS jsonb
LANGUAGE sql STABLE SET search_path TO 'public' AS $$
  WITH scoped AS (
    SELECT c.* FROM public.categories c
     WHERE p_scope IS NULL
        OR c.id IN (SELECT d.id FROM public.cat_descendants(p_scope) d)
  ),
  edge AS (
    SELECT s.id AS cat_id, e.parent_id, e.display_order
      FROM scoped s
      LEFT JOIN LATERAL public.cat_primary_pointer(s.id) e ON TRUE
  ),
  path AS (
    WITH RECURSIVE up AS (
      SELECT c.id AS cat_id, c.id AS node, c.slug::text AS acc, 0 AS depth
        FROM scoped c
      UNION ALL
      SELECT u.cat_id, e.parent_id, pc.slug || '/' || u.acc, u.depth + 1
        FROM up u
        JOIN LATERAL public.cat_primary_pointer(u.node) e ON TRUE
        JOIN public.categories pc ON pc.id = e.parent_id
       WHERE u.depth < 20
    )
    SELECT DISTINCT ON (cat_id) cat_id, acc FROM up ORDER BY cat_id, depth DESC
  ),
  sec AS (
    SELECT p.child_id AS cat_id,
           array_agg(pc.slug ORDER BY pc.slug) AS slugs
      FROM public.category_tree_pointers p
      JOIN public.categories pc ON pc.id = p.parent_id
      JOIN edge e ON e.cat_id = p.child_id
     WHERE e.parent_id IS NULL OR p.parent_id <> e.parent_id
     GROUP BY p.child_id
  ),
  excl AS (
    SELECT x.category_id, array_agg(x.country_code::text ORDER BY x.country_code) AS codes
      FROM public.category_country_exclusions x GROUP BY x.category_id
  ),
  lst AS (
    SELECT l.category_id, count(*)::int AS n
      FROM public.listings l WHERE l.status = 'active' GROUP BY l.category_id
  )
  SELECT COALESCE(jsonb_agg(obj ORDER BY obj->>'category_path'), '[]'::jsonb)
    FROM (
      SELECT jsonb_build_object(
               'category_path', COALESCE(pa.acc, s.slug),
               'category_slug', s.slug,
               'parent_slug', COALESCE(pp.slug, ''),
               'name_en', s.name_en,
               'name_am', COALESCE(tr.value, ''),
               'display_order', COALESCE(e.display_order, s.display_order)::text,
               'is_active', CASE WHEN s.is_active THEN 'true' ELSE 'false' END,
               'allow_listings', CASE WHEN s.allow_listings THEN 'true' ELSE 'false' END,
               'is_catchall', CASE WHEN s.is_catchall THEN 'true' ELSE 'false' END,
               'price_enabled', CASE WHEN s.price_enabled THEN 'true' ELSE 'false' END,
               'expiry_days', COALESCE(s.expiry_days::text, ''),
               'icon', COALESCE(s.icon, ''),
               'visible_from', COALESCE(to_char(s.visible_from AT TIME ZONE 'UTC',
                                                'YYYY-MM-DD"T"HH24:MI:SS"Z"'), ''),
               'visible_until', COALESCE(to_char(s.visible_until AT TIME ZONE 'UTC',
                                                 'YYYY-MM-DD"T"HH24:MI:SS"Z"'), ''),
               'excluded_country_codes', array_to_string(COALESCE(x.codes, '{}'), '|'),
               'secondary_parents', array_to_string(COALESCE(sc.slugs, '{}'), '|'),
               'listing_count', COALESCE(li.n, 0)::text,
               'origin_scope', COALESCE((SELECT c2.slug FROM public.categories c2
                                          WHERE c2.id = p_scope), '')
             ) AS obj
        FROM scoped s
        LEFT JOIN edge e ON e.cat_id = s.id
        LEFT JOIN public.categories pp ON pp.id = e.parent_id
        LEFT JOIN path pa ON pa.cat_id = s.id
        LEFT JOIN sec sc ON sc.cat_id = s.id
        LEFT JOIN excl x ON x.category_id = s.id
        LEFT JOIN lst li ON li.category_id = s.id
        LEFT JOIN public.entity_translations tr
               ON tr.entity_type = 'category' AND tr.entity_id = s.id
              AND tr.field = 'name' AND tr.lang_code = 'am'
    ) q
$$;

CREATE OR REPLACE FUNCTION public.cat_export_row(p_id uuid)
RETURNS jsonb
LANGUAGE sql STABLE SET search_path TO 'public' AS $$
  SELECT COALESCE(
    (SELECT r FROM jsonb_array_elements(public.cat_export_rows(NULL)) r
      WHERE r->>'category_slug' = (SELECT c.slug FROM public.categories c WHERE c.id = p_id)),
    'null'::jsonb)
$$;

-- ============================================================
-- 4. EXPORT DOOR — categories:view, subtree-scoped
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_export_categories(p_scope text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_scope uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    SELECT c.id INTO v_scope FROM public.categories c WHERE c.slug = lower(btrim(p_scope));
    IF v_scope IS NULL THEN RAISE EXCEPTION 'unknown category scope'; END IF;
  END IF;

  RETURN jsonb_build_object('categories', public.cat_export_rows(v_scope));
END $function$;

REVOKE ALL ON FUNCTION public.admin_export_categories(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_categories(text) TO authenticated;

-- ============================================================
-- 5. THE PLANNER — one validator, shared by preview and commit
-- ============================================================
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
  v_pp record;
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
        -- A rename of an existing category's SLUG arrives as a create whose
        -- name already belongs to a sibling: slugs are identity (refused).
        IF EXISTS (
          SELECT 1 FROM public.categories sib
            JOIN public.category_tree_pointers p ON p.child_id = sib.id
           WHERE p.parent_id = v_parent.id
             AND lower(btrim(sib.name_en)) = lower(btrim(COALESCE(v_row->>'name_en','')))
        ) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','slugRename');
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
-- 6. PREVIEW — writes nothing
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_preview_category_import(p_rows jsonb, p_scope text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  RETURN public.cat_import_plan(p_rows, p_scope);
END $function$;

REVOKE ALL ON FUNCTION public.admin_preview_category_import(jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_preview_category_import(jsonb, text) TO authenticated;

-- ============================================================
-- 7. COMMIT — F5: gates → capture → mutate, through the doors
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_commit_category_import(
  p_rows jsonb, p_scope text, p_digest text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_plan jsonb;
  v_batch uuid := gen_random_uuid();
  v_item jsonb;
  v_fields jsonb;
  v_slug text;
  v_id uuid;
  v_parent uuid;
  v_prev jsonb;
  v_pending jsonb := '[]'::jsonb;
  v_progress boolean;
  v_next jsonb;
  v_order int;
  v_ids uuid[];
  v_pp record;
BEGIN
  -- GATES
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');
  IF NOT pg_try_advisory_xact_lock(hashtext('category-import'), hashtext(auth.uid()::text)) THEN
    RAISE EXCEPTION 'import already running';
  END IF;

  v_plan := public.cat_import_plan(p_rows, p_scope);

  -- CREATES first, parents before children (repeat passes until settled).
  SELECT COALESCE(jsonb_agg(i), '[]'::jsonb) INTO v_pending
    FROM jsonb_array_elements(v_plan->'items') i WHERE i->>'op' = 'create';

  LOOP
    EXIT WHEN jsonb_array_length(v_pending) = 0;
    v_progress := false;
    v_next := '[]'::jsonb;
    FOR v_item IN SELECT * FROM jsonb_array_elements(v_pending)
    LOOP
      v_slug := v_item->>'slug';
      v_fields := v_item->'fields';
      v_parent := NULL;
      IF v_item->>'parent_slug' IS NOT NULL THEN
        SELECT c.id INTO v_parent FROM public.categories c WHERE c.slug = v_item->>'parent_slug';
        IF v_parent IS NULL THEN
          v_next := v_next || v_item;
          CONTINUE;
        END IF;
      END IF;

      v_id := public.admin_create_category(
        v_fields->>'name_en', v_slug, v_fields->>'icon', v_parent,
        (v_fields->>'allow_listings')::boolean, (v_fields->>'price_enabled')::boolean,
        public.cat_int(v_fields->>'expiry_days'),
        public.cat_ts(v_fields->>'visible_from'),
        public.cat_ts(v_fields->>'visible_until'));

      IF public.cat_text(v_fields->>'name_am') IS NOT NULL THEN
        PERFORM public.admin_save_entity_translation('category', v_id, 'name', 'am',
                                                     v_fields->>'name_am');
      END IF;

      IF jsonb_array_length(COALESCE(v_fields->'excluded_country_codes','[]'::jsonb)) > 0 THEN
        PERFORM public.admin_set_country_exclusions(v_id,
          ARRAY(SELECT upper(x::text) FROM jsonb_array_elements_text(
                  v_fields->'excluded_country_codes') x));
      END IF;

      FOR v_next IN SELECT v_next LOOP EXIT; END LOOP; -- no-op guard

      INSERT INTO public.category_import_revisions
        (batch_id, action, entity_key, prev, post, created_by)
      VALUES (v_batch, 'create', v_slug, NULL, public.cat_export_row(v_id), auth.uid());

      v_progress := true;
    END LOOP;

    IF NOT v_progress THEN
      EXIT;
    END IF;
    v_pending := v_next;
  END LOOP;

  -- UPDATES, RETIRES, REACTIVATIONS, DELETES
  FOR v_item IN SELECT * FROM jsonb_array_elements(v_plan->'items')
                 WHERE value->>'op' <> 'create'
  LOOP
    v_slug := v_item->>'slug';
    SELECT c.id INTO v_id FROM public.categories c WHERE c.slug = v_slug;
    CONTINUE WHEN v_id IS NULL;
    v_prev := public.cat_export_row(v_id);

    IF v_item->>'op' = 'retire' THEN
      PERFORM public.admin_retire_category(v_id, NULL);
      INSERT INTO public.category_import_revisions
        (batch_id, action, entity_key, prev, post, created_by)
      VALUES (v_batch, 'retire', v_slug, v_prev, public.cat_export_row(v_id), auth.uid());
      CONTINUE;
    END IF;

    IF v_item->>'op' = 'reactivate' THEN
      PERFORM public.admin_reactivate_category(v_id);
      INSERT INTO public.category_import_revisions
        (batch_id, action, entity_key, prev, post, created_by)
      VALUES (v_batch, 'reactivate', v_slug, v_prev, public.cat_export_row(v_id), auth.uid());
      CONTINUE;
    END IF;

    IF v_item->>'op' = 'delete' THEN
      PERFORM public.admin_delete_category(v_id, v_slug);
      INSERT INTO public.category_import_revisions
        (batch_id, action, entity_key, prev, post, created_by)
      VALUES (v_batch, 'delete', v_slug, v_prev, NULL, auth.uid());
      CONTINUE;
    END IF;

    v_fields := v_item->'fields';

    IF v_fields ? 'name_en' OR v_fields ? 'icon' OR v_fields ? 'allow_listings'
       OR v_fields ? 'price_enabled' OR v_fields ? 'expiry_days' THEN
      PERFORM public.admin_update_category(
        v_id,
        COALESCE(v_fields->>'name_en', (SELECT c.name_en FROM public.categories c WHERE c.id = v_id)),
        COALESCE(v_fields->>'icon', (SELECT c.icon FROM public.categories c WHERE c.id = v_id)),
        NULL,
        COALESCE((v_fields->>'allow_listings')::boolean,
                 (SELECT c.allow_listings FROM public.categories c WHERE c.id = v_id)),
        COALESCE((v_fields->>'price_enabled')::boolean,
                 (SELECT c.price_enabled FROM public.categories c WHERE c.id = v_id)),
        CASE WHEN v_fields ? 'expiry_days' THEN public.cat_int(v_fields->>'expiry_days')
             ELSE (SELECT c.expiry_days FROM public.categories c WHERE c.id = v_id) END);
    END IF;

    IF v_fields ? 'name_am' THEN
      PERFORM public.admin_save_entity_translation('category', v_id, 'name', 'am',
                                                   NULLIF(v_fields->>'name_am', ''));
    END IF;

    IF v_fields ? 'visible_from' OR v_fields ? 'visible_until' THEN
      PERFORM public.admin_set_category_window(v_id,
        public.cat_ts(v_fields->>'visible_from'), public.cat_ts(v_fields->>'visible_until'));
    END IF;

    IF v_fields ? 'excluded_country_codes' THEN
      PERFORM public.admin_set_country_exclusions(v_id,
        ARRAY(SELECT upper(x::text) FROM jsonb_array_elements_text(
                v_fields->'excluded_country_codes') x));
    END IF;

    IF v_fields ? 'parent_slug' THEN
      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      SELECT c.id INTO v_parent FROM public.categories c
       WHERE c.slug = NULLIF(v_fields->>'parent_slug', '');
      PERFORM public.admin_move_category_pointer(v_pp.pointer_id, v_parent);
    END IF;

    IF v_fields ? 'secondary_parents' THEN
      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      -- remove the secondary pointers that left the file
      PERFORM public.admin_remove_category_pointer(p.id)
         FROM public.category_tree_pointers p
         JOIN public.categories pc ON pc.id = p.parent_id
        WHERE p.child_id = v_id
          AND p.id <> v_pp.pointer_id
          AND NOT (pc.slug = ANY (ARRAY(SELECT x::text FROM jsonb_array_elements_text(
                                          v_fields->'secondary_parents') x)));
      -- add the ones that arrived
      PERFORM public.admin_add_category_pointer(c.id, v_id)
         FROM public.categories c
        WHERE c.slug = ANY (ARRAY(SELECT x::text FROM jsonb_array_elements_text(
                                    v_fields->'secondary_parents') x))
          AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p
                           WHERE p.child_id = v_id AND p.parent_id = c.id);
    END IF;

    IF v_fields ? 'display_order' THEN
      v_order := public.cat_int(v_fields->>'display_order');
      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      SELECT array_agg(sib.child_id ORDER BY sib.rank, sib.display_order, sib.child_id)
        INTO v_ids
        FROM (SELECT p.child_id, p.display_order,
                     CASE WHEN p.child_id = v_id THEN v_order ELSE p.display_order END AS rank
                FROM public.category_tree_pointers p
               WHERE p.parent_id IS NOT DISTINCT FROM v_pp.parent_id) sib;
      PERFORM public.admin_reorder_categories(v_pp.parent_id, v_ids);
    END IF;

    INSERT INTO public.category_import_revisions
      (batch_id, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'update', v_slug, v_prev, public.cat_export_row(v_id), auth.uid());
  END LOOP;

  PERFORM public.log_audit('category_import.commit', 'categories', v_batch::text,
    jsonb_build_object('counts', v_plan->'counts', 'scope', p_scope, 'digest', p_digest));

  RETURN jsonb_build_object('batch_id', v_batch,
                            'counts', v_plan->'counts',
                            'refusals', v_plan->'refusals');
END $function$;

REVOKE ALL ON FUNCTION public.admin_commit_category_import(jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_category_import(jsonb, text, text) TO authenticated;

-- ============================================================
-- 8. UNDO — restore through the same doors, in reverse
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_undo_category_import(p_batch uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_rev record;
  v_id uuid;
  v_parent uuid;
  v_prev jsonb;
  v_restored int := 0;
  v_pp record;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');

  IF NOT EXISTS (SELECT 1 FROM public.category_import_revisions r WHERE r.batch_id = p_batch) THEN
    RAISE EXCEPTION 'unknown import batch';
  END IF;

  FOR v_rev IN SELECT * FROM public.category_import_revisions r
                WHERE r.batch_id = p_batch AND r.undone_at IS NULL
                ORDER BY r.id DESC
  LOOP
    SELECT c.id INTO v_id FROM public.categories c WHERE c.slug = v_rev.entity_key;
    v_prev := v_rev.prev;

    IF v_rev.action = 'create' THEN
      IF v_id IS NOT NULL THEN
        IF (SELECT c.is_active FROM public.categories c WHERE c.id = v_id) THEN
          PERFORM public.admin_retire_category(v_id, NULL);
        END IF;
        PERFORM public.admin_delete_category(v_id, v_rev.entity_key);
        v_restored := v_restored + 1;
      END IF;
    ELSIF v_prev IS NOT NULL THEN
      IF v_id IS NULL THEN
        SELECT c.id INTO v_parent FROM public.categories c
         WHERE c.slug = NULLIF(v_prev->>'parent_slug', '');
        v_id := public.admin_create_category(
          v_prev->>'name_en', v_rev.entity_key, NULLIF(v_prev->>'icon',''), v_parent,
          public.cat_bool(v_prev->>'allow_listings', true),
          public.cat_bool(v_prev->>'price_enabled', true),
          public.cat_int(v_prev->>'expiry_days'),
          public.cat_ts(v_prev->>'visible_from'), public.cat_ts(v_prev->>'visible_until'));
      ELSE
        PERFORM public.admin_update_category(v_id, v_prev->>'name_en',
          NULLIF(v_prev->>'icon',''), NULL,
          public.cat_bool(v_prev->>'allow_listings', true),
          public.cat_bool(v_prev->>'price_enabled', true),
          public.cat_int(v_prev->>'expiry_days'));
        PERFORM public.admin_set_category_window(v_id,
          public.cat_ts(v_prev->>'visible_from'), public.cat_ts(v_prev->>'visible_until'));
      END IF;

      PERFORM public.admin_set_country_exclusions(v_id,
        ARRAY(SELECT upper(x) FROM unnest(public.cat_pipe(v_prev->>'excluded_country_codes')) x));

      IF COALESCE(v_prev->>'name_am', '') <> '' THEN
        PERFORM public.admin_save_entity_translation('category', v_id, 'name', 'am',
                                                     v_prev->>'name_am');
      END IF;

      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      SELECT c.id INTO v_parent FROM public.categories c
       WHERE c.slug = NULLIF(v_prev->>'parent_slug', '');
      IF v_pp.pointer_id IS NOT NULL AND v_pp.parent_id IS DISTINCT FROM v_parent THEN
        PERFORM public.admin_move_category_pointer(v_pp.pointer_id, v_parent);
      END IF;

      IF public.cat_bool(v_prev->>'is_active', true)
         IS DISTINCT FROM (SELECT c.is_active FROM public.categories c WHERE c.id = v_id) THEN
        IF public.cat_bool(v_prev->>'is_active', true) THEN
          PERFORM public.admin_reactivate_category(v_id);
        ELSE
          PERFORM public.admin_retire_category(v_id, NULL);
        END IF;
      END IF;

      v_restored := v_restored + 1;
    END IF;

    UPDATE public.category_import_revisions SET undone_at = now() WHERE id = v_rev.id;
  END LOOP;

  PERFORM public.log_audit('category_import.undo', 'categories', p_batch::text,
    jsonb_build_object('restored', v_restored));

  RETURN jsonb_build_object('restored', v_restored);
END $function$;

REVOKE ALL ON FUNCTION public.admin_undo_category_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_category_import(uuid) TO authenticated;

-- ============================================================
-- 9. IDEMPOTENCY PROOF — the live roster re-imported changes nothing
-- ============================================================
DO $$
DECLARE
  v_rows jsonb;
  v_plan jsonb;
BEGIN
  SELECT COALESCE(jsonb_agg(r || jsonb_build_object('row', (ord)::text)), '[]'::jsonb)
    INTO v_rows
    FROM jsonb_array_elements(public.cat_export_rows(NULL)) WITH ORDINALITY AS t(r, ord);

  v_plan := public.cat_import_plan(v_rows, NULL);

  IF (v_plan->'counts'->>'adds')::int <> 0
     OR (v_plan->'counts'->>'changes')::int <> 0
     OR (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'CAT-IE idempotency proof failed: adds=% changes=% refusals=% first=%',
      v_plan->'counts'->>'adds', v_plan->'counts'->>'changes',
      v_plan->'counts'->>'refusals', v_plan->'refusals'->0;
  END IF;

  RAISE NOTICE 'CAT-IE idempotency proof: adds=0 changes=0 refusals=0 unchanged=%',
    v_plan->'counts'->>'unchanged';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260907230000') ON CONFLICT DO NOTHING;
