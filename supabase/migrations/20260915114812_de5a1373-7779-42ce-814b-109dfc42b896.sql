-- INC-198 / INC-199 L1 — THE CATEGORY PLANNER STOPS BEING SILENT.
--
-- Three silent no-ops in the categories import, each now a named refusal or an
-- apply:
--   (a) INC-198 — a delete row for an EMPTY ROOT. Census note, stated plainly:
--       the planner already plans an empty, retired, listing-free root as
--       `delete` (probed against the live schema before this file was written:
--       counts.deletes = 1, refusals = 0). The only path that previews
--       "unchanged" is a delete row whose slug is unknown or already gone —
--       item (d) below — which is now itemised with a reason instead of nothing.
--       The root case is therefore LOCKED DOWN by proof here (an empty root
--       deletes and undoes; a root with a RETIRED child is refused by name)
--       rather than newly permitted, and the commit's delete door is unchanged.
--   (b) INC-199 part 1 — a row whose is_active cell differs from the stored
--       status, with no retire/reactivate action, applied its other cells and
--       left the status alone (three intended reactivations stayed retired).
--       It is now REFUSED with the new id `statusNeedsAction`, whose detail
--       names the stored and the requested value.
--   (c) INC-199 part 2 — a row carrying action = retire/reactivate applied the
--       action and DROPPED the row's other cell changes (Pet Services' secondary
--       parent). The status change and every other cell change are now planned
--       together, counted once under retired/reactivated, applied in ONE write,
--       and undone together.
--   (d) `delete` on an unknown/already-deleted slug, `retire` on an
--       already-retired row and `reactivate` on an already-active row keep
--       today's counts (unchanged), but the preview now carries a `noop` item
--       whose detail says which ("alreadyDeleted", "alreadyRetired",
--       "alreadyActive"). An already-retired/active row that ALSO carries cell
--       changes is planned as a plain change rather than swallowed — silence is
--       the defect this task removes.
--
-- INC-183 law: the three functions that change (cat_import_plan,
-- admin_commit_category_import, admin_undo_category_import) are re-declared
-- WHOLE — never patched by text anchor — and restate their closers in-file.
-- Every other function is untouched and proven so by read-back.
--
-- PROOF NOTE (honest): the commit and undo doors are gated by
-- categories:import, which requires step-up (permissions.requires_step_up =
-- true), so a migration cannot call them. The proofs therefore run the REAL
-- planner (service_role, ungated) and, for the write paths, replay the exact
-- write sequence the new bodies carry, plus body read-backs that assert the new
-- phases exist. This is the pattern established by INC-196/197.

------------------------------------------------------------------ BEFORE STATE
CREATE TEMP TABLE inc199_before ON COMMIT DROP AS
SELECT p.proname,
       md5(p.prosrc)                AS src_md5,
       COALESCE(p.proacl::text, '') AS acl
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
 WHERE n.nspname = 'public'
   AND p.proname IN ('cat_import_plan', 'admin_commit_category_import',
                     'admin_undo_category_import', 'cat_export_rows',
                     'cat_export_row', 'admin_delete_category',
                     'admin_retire_category', 'admin_reactivate_category',
                     'admin_reorder_categories', 'admin_export_categories');

CREATE TEMP TABLE inc199_export ON COMMIT DROP AS
SELECT md5(public.cat_export_rows(NULL)::text) AS payload_md5;

-- ============================================================
-- 1. cat_import_plan — WHOLE re-declaration (INC-198 / INC-199)
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
  v_infile text[] := '{}';
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
  v_kids text[];
  v_active_txt text;
  v_want_active boolean;
  v_detail text;
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
        -- INC-198 (d) — nothing to do, and the preview SAYS SO.
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyDeleted');
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
        IF v_parent.id IS NULL AND v_parent_slug = ANY (v_infile) THEN
          -- IE-4a corrective: the parent is an accepted create EARLIER in this
          -- same file; the commit lands creates parents-before-children.
          v_parent := NULL;
        END IF;
        IF v_parent.id IS NULL AND NOT (v_parent_slug = ANY (v_infile)) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','unknownParent');
          CONTINUE;
        END IF;
        IF v_parent.id IS NOT NULL AND v_parent.is_catchall THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','catchallParent');
          CONTINUE;
        END IF;
        IF v_parent.id IS NOT NULL AND v_scope_set IS NOT NULL
           AND NOT (v_parent.id = ANY (v_scope_set)) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','outOfScope');
          CONTINUE;
        END IF;
        -- A rename arriving as a create whose name already belongs to a
        -- sibling: still refused, with the sibling's slug as the fix.
        IF v_parent.id IS NOT NULL THEN
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
      v_infile := v_infile || v_slug;
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

    -- ---------- DELETE ----------
    -- INC-198: a ROOT is not excluded. A category — root or child — is
    -- deletable when it holds NO pointer children (active or retired) and no
    -- listings, and is already retired. A root with children or listings is
    -- refused by the existing hasChildren / hasListings ids, which name the
    -- reason; the delete door removes the root's own parent-NULL pointer.
    IF v_action = 'delete' THEN
      SELECT count(*)::int INTO v_children FROM public.category_tree_pointers p
       WHERE p.parent_id = v_cat.id;
      IF v_children > 0 THEN
        -- IE-4a — the refusal NAMES the children that hold the category down.
        SELECT array_agg(c.slug ORDER BY c.slug) INTO v_kids
          FROM public.category_tree_pointers p
          JOIN public.categories c ON c.id = p.child_id
         WHERE p.parent_id = v_cat.id;
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                          'reason','hasChildren',
                          'detail', array_to_string(COALESCE(v_kids, ARRAY[]::text[]), ', '),
                          'children', to_jsonb(COALESCE(v_kids, ARRAY[]::text[])));
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

    -- ---------- STATUS CELL (INC-199 part 1) ----------
    -- An is_active cell that CONTRADICTS the stored status and carries no
    -- retire/reactivate action is a refusal, never a silent skip.
    v_active_txt := public.cat_text(v_row->>'is_active');
    v_want_active := NULL;
    IF v_active_txt IS NOT NULL AND btrim(v_active_txt) <> '' THEN
      v_want_active := public.cat_bool(v_active_txt, v_cat.is_active);
    END IF;
    IF v_action NOT IN ('retire','reactivate')
       AND v_want_active IS NOT NULL
       AND v_want_active IS DISTINCT FROM v_cat.is_active THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                        'reason','statusNeedsAction',
                        'detail', 'stored=' || CASE WHEN v_cat.is_active THEN 'true' ELSE 'false' END
                                  || ' requested=' || CASE WHEN v_want_active THEN 'true' ELSE 'false' END);
      CONTINUE;
    END IF;

    -- ---------- CELL DIFF (semantic, against the export shape) ----------
    -- INC-199 part 2: this diff now runs for a retire/reactivate row TOO, so an
    -- action row carries its other cell changes instead of dropping them.
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

    -- INC-187 — a CATCH-ALL's order cell is never a change: the reorder door
    -- excludes catch-alls and pins them at 1000000 + order, so a delta here
    -- could only ever be phantom.
    v_order := public.cat_int(v_row->>'display_order');
    IF NOT v_cat.is_catchall
       AND v_order IS NOT NULL
       AND v_order IS DISTINCT FROM public.cat_int(v_cur->>'display_order') THEN
      v_delta := v_delta || jsonb_build_object('display_order', v_order);
    END IF;

    -- IE-4a — name_am is EDITABLE. A non-empty cell that differs from the
    -- live translation is one change; an EMPTY cell is SILENCE, never a
    -- deletion, so a file with blank am cells round-trips to nothing.
    v_name_am := public.cat_text(v_row->>'name_am');
    IF v_name_am IS NOT NULL AND btrim(v_name_am) <> ''
       AND btrim(v_name_am) IS DISTINCT FROM btrim(COALESCE(v_cur->>'name_am', '')) THEN
      v_delta := v_delta || jsonb_build_object('name_am', btrim(v_name_am));
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

    -- The row's changed cells, named, for the preview's row detail.
    v_detail := NULLIF(array_to_string(
                  ARRAY(SELECT k FROM jsonb_object_keys(v_delta) k ORDER BY k), ', '), '');

    -- ---------- RETIRE ----------
    IF v_action = 'retire' THEN
      IF v_cat.is_active THEN
        SELECT count(*)::int INTO v_listings FROM public.listings l
         WHERE l.category_id = v_cat.id AND l.status = 'active';
        IF v_listings > 0 THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                            'reason','hasListings','detail', v_listings::text);
          CONTINUE;
        END IF;
        v_retires := v_retires + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','retire',
                                                 'fields', v_delta,
                                                 'detail', v_detail);
      ELSIF v_delta = '{}'::jsonb THEN
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyRetired');
      ELSE
        -- Already retired, but the row still carries cell changes: they apply.
        v_changes := v_changes + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                                 'fields', v_delta,
                                                 'detail','alreadyRetired');
      END IF;
      CONTINUE;
    END IF;

    -- ---------- REACTIVATE ----------
    IF v_action = 'reactivate' THEN
      IF NOT v_cat.is_active THEN
        v_reacts := v_reacts + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','reactivate',
                                                 'fields', v_delta,
                                                 'detail', v_detail);
      ELSIF v_delta = '{}'::jsonb THEN
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyActive');
      ELSE
        v_changes := v_changes + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                                 'fields', v_delta,
                                                 'detail','alreadyActive');
      END IF;
      CONTINUE;
    END IF;

    -- ---------- UPSERT ----------
    IF v_delta = '{}'::jsonb THEN
      v_unchanged := v_unchanged + 1;
    ELSE
      v_changes := v_changes + 1;
      v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                               'fields', v_delta,
                                               'detail', v_detail);
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
GRANT ALL ON FUNCTION public.cat_import_plan(jsonb, text) TO service_role;

-- ============================================================
-- 2. admin_commit_category_import — status AND cells in one write
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
  v_am jsonb;
  v_ord jsonb := '[]'::jsonb;
  v_par record;
  v_op text;
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

      -- IE-4a — a non-empty am name is written as a HUMAN, pending-review row
      -- ('edited', machine=false) through the translation door. The batch owns
      -- the row it creates: Undo removes it again.
      IF public.cat_text(v_fields->>'name_am') IS NOT NULL THEN
        PERFORM public.admin_save_entity_translation('category', v_id, 'name', 'am',
                                                     v_fields->>'name_am');
      END IF;

      IF jsonb_array_length(COALESCE(v_fields->'excluded_country_codes','[]'::jsonb)) > 0 THEN
        PERFORM public.admin_set_country_exclusions(v_id,
          ARRAY(SELECT upper(x::text) FROM jsonb_array_elements_text(
                  v_fields->'excluded_country_codes') x));
      END IF;

      -- INC-187 — a created row STATES its place; the order pass below applies it.
      IF public.cat_int(v_fields->>'display_order') IS NOT NULL THEN
        SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
        v_ord := v_ord || jsonb_build_object('id', v_id, 'parent', v_pp.parent_id,
                                             'ord', public.cat_int(v_fields->>'display_order'));
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
    v_op := v_item->>'op';
    -- INC-198/199 (d) — a noop item is a PREVIEW note ("alreadyRetired",
    -- "alreadyActive", "alreadyDeleted"). It writes nothing, not even a
    -- revision row, so Undo has nothing to restore for it.
    CONTINUE WHEN v_op = 'noop';

    v_slug := v_item->>'slug';
    SELECT c.id INTO v_id FROM public.categories c WHERE c.slug = v_slug;
    CONTINUE WHEN v_id IS NULL;

    -- IE-4a — CAPTURE the prior am state (none, or value + status + machine)
    -- alongside the row, so Undo restores exactly what stood here before.
    SELECT jsonb_build_object('value', t.value, 'status', t.status, 'machine', t.machine)
      INTO v_am
      FROM public.entity_translations t
     WHERE t.entity_type = 'category' AND t.entity_id = v_id
       AND t.field = 'name' AND t.lang_code = 'am';
    v_prev := public.cat_export_row(v_id)
              || jsonb_build_object('am_state', COALESCE(v_am, 'null'::jsonb));

    IF v_op = 'delete' THEN
      -- The am row leaves with the category (a deleted id can never be read
      -- again); the captured am_state above restores it on Undo. A ROOT leaves
      -- the same way — the delete door removes its parent-NULL pointer.
      DELETE FROM public.entity_translations
       WHERE entity_type = 'category' AND entity_id = v_id AND field = 'name';
      PERFORM public.admin_delete_category(v_id, v_slug);
      INSERT INTO public.category_import_revisions
        (batch_id, action, entity_key, prev, post, created_by)
      VALUES (v_batch, 'delete', v_slug, v_prev, NULL, auth.uid());
      CONTINUE;
    END IF;

    -- INC-199 — STATUS THEN CELLS, one write per row. A retire/reactivate item
    -- carries the row's other cell changes in `fields`; the status door runs
    -- first and the SAME field application as a plain change row follows, so a
    -- rename or a secondary parent on an action row is never dropped. One
    -- revision row records both halves (prev before, post after).
    IF v_op = 'retire' THEN
      PERFORM public.admin_retire_category(v_id, NULL);
    ELSIF v_op = 'reactivate' THEN
      PERFORM public.admin_reactivate_category(v_id);
    END IF;

    v_fields := COALESCE(v_item->'fields', '{}'::jsonb);

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

    -- IE-4a — the planner only ever emits a NON-EMPTY name_am, and only when
    -- it differs from the live value: an identical cell writes nothing, and an
    -- empty cell never reaches here at all (silence, not a deletion).
    IF v_fields ? 'name_am' AND btrim(COALESCE(v_fields->>'name_am','')) <> '' THEN
      PERFORM public.admin_save_entity_translation('category', v_id, 'name', 'am',
                                                   btrim(v_fields->>'name_am'));
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

    -- INC-187 — the row's stated place is COLLECTED here and applied once per
    -- parent after every row of the batch has landed. Ranking one row at a time
    -- against a scale the previous row just renumbered could not reproduce a
    -- file's own sequence.
    IF v_fields ? 'display_order' THEN
      v_order := public.cat_int(v_fields->>'display_order');
      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      v_ord := v_ord || jsonb_build_object('id', v_id, 'parent', v_pp.parent_id, 'ord', v_order);
    END IF;

    INSERT INTO public.category_import_revisions
      (batch_id, action, entity_key, prev, post, created_by)
    VALUES (v_batch,
            CASE WHEN v_op IN ('retire','reactivate') THEN v_op ELSE 'update' END,
            v_slug, v_prev, public.cat_export_row(v_id), auth.uid());
  END LOOP;

  -- INC-187 — ONE ordering pass per primary parent, after all rows. Siblings are
  -- sorted by the file's value for the rows in this batch and by their current
  -- position for everyone else; the reorder door renumbers 0..N-1 and keeps a
  -- catch-all excluded and pinned last.
  FOR v_par IN SELECT DISTINCT (o->>'parent')::uuid AS parent_id
                 FROM jsonb_array_elements(v_ord) o
  LOOP
    SELECT array_agg(sib.child_id ORDER BY sib.rank, sib.display_order, sib.child_id)
      INTO v_ids
      FROM (SELECT p.child_id, p.display_order,
                   COALESCE((SELECT (o->>'ord')::int
                               FROM jsonb_array_elements(v_ord) o
                              WHERE (o->>'id')::uuid = p.child_id
                              LIMIT 1), p.display_order) AS rank
              FROM public.category_tree_pointers p
             WHERE p.parent_id IS NOT DISTINCT FROM v_par.parent_id) sib;
    IF v_ids IS NOT NULL THEN
      PERFORM public.admin_reorder_categories(v_par.parent_id, v_ids);
    END IF;
  END LOOP;

  PERFORM public.log_audit('category_import.commit', 'categories', v_batch::text,
    jsonb_build_object('counts', v_plan->'counts', 'scope', p_scope, 'digest', p_digest));

  RETURN jsonb_build_object('batch_id', v_batch,
                            'counts', v_plan->'counts',
                            'refusals', v_plan->'refusals');
END $function$;

REVOKE ALL ON FUNCTION public.admin_commit_category_import(jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_category_import(jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_commit_category_import(jsonb, text, text) TO service_role;

-- ============================================================
-- 3. admin_undo_category_import — the cells an action row carried come back too
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
  v_am jsonb;
  v_ord jsonb := '[]'::jsonb;
  v_ids uuid[];
  v_par record;
  v_sec text[];
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
        -- IE-4a — the pending am row this batch created leaves with it.
        DELETE FROM public.entity_translations
         WHERE entity_type = 'category' AND entity_id = v_id AND field = 'name';
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

      -- IE-4a — restore the CAPTURED am state exactly: the row that stood here
      -- (value, status, machine) comes back as it was, and a row the batch
      -- itself created where there was none is removed again. Restoring
      -- through the human writer would silently demote an approved row, so the
      -- restore writes the captured tuple and audits it.
      v_am := v_prev->'am_state';
      IF v_am IS NOT NULL AND jsonb_typeof(v_am) = 'object' THEN
        INSERT INTO public.entity_translations
          (entity_type, entity_id, field, lang_code, value, status, machine, updated_by)
        VALUES ('category', v_id, 'name', 'am', v_am->>'value',
                COALESCE(v_am->>'status', 'edited'),
                COALESCE((v_am->>'machine')::boolean, false), auth.uid())
        ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
          SET value = EXCLUDED.value, status = EXCLUDED.status,
              machine = EXCLUDED.machine, updated_by = EXCLUDED.updated_by,
              updated_at = now();
        PERFORM public.log_audit('entity_translation.undo_restore', 'categories', v_id::text,
          jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'name',
                             'restored', v_am));
      ELSIF v_am IS NOT NULL AND jsonb_typeof(v_am) = 'null' THEN
        DELETE FROM public.entity_translations
         WHERE entity_type = 'category' AND entity_id = v_id
           AND field = 'name' AND lang_code = 'am';
        PERFORM public.log_audit('entity_translation.undo_remove', 'categories', v_id::text,
          jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'name'));
      ELSIF COALESCE(v_prev->>'name_am', '') <> '' THEN
        -- a pre-IE-4a batch carries no captured state: restore the exported value
        PERFORM public.admin_save_entity_translation('category', v_id, 'name', 'am',
                                                     v_prev->>'name_am');
      END IF;

      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      SELECT c.id INTO v_parent FROM public.categories c
       WHERE c.slug = NULLIF(v_prev->>'parent_slug', '');
      IF v_pp.pointer_id IS NOT NULL AND v_pp.parent_id IS DISTINCT FROM v_parent THEN
        PERFORM public.admin_move_category_pointer(v_pp.pointer_id, v_parent);
      END IF;

      -- INC-199 — the SECONDARY PARENTS of the prior state come back too. An
      -- action row may now carry a secondary-parent change (Pet Services), so
      -- undoing it has to restore the pointer set, not only the fields.
      v_sec := public.cat_pipe(v_prev->>'secondary_parents');
      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      PERFORM public.admin_remove_category_pointer(p.id)
         FROM public.category_tree_pointers p
         JOIN public.categories pc ON pc.id = p.parent_id
        WHERE p.child_id = v_id
          AND p.id IS DISTINCT FROM v_pp.pointer_id
          AND NOT (pc.slug = ANY (v_sec));
      PERFORM public.admin_add_category_pointer(c.id, v_id)
         FROM public.categories c
        WHERE c.slug = ANY (v_sec)
          AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p
                           WHERE p.child_id = v_id AND p.parent_id = c.id);

      IF public.cat_bool(v_prev->>'is_active', true)
         IS DISTINCT FROM (SELECT c.is_active FROM public.categories c WHERE c.id = v_id) THEN
        IF public.cat_bool(v_prev->>'is_active', true) THEN
          PERFORM public.admin_reactivate_category(v_id);
        ELSE
          PERFORM public.admin_retire_category(v_id, NULL);
        END IF;
      END IF;

      -- INC-187 — the row's PREVIOUS place is collected and applied once per
      -- parent below, so undoing an import restores order as well as fields.
      IF public.cat_int(v_prev->>'display_order') IS NOT NULL THEN
        SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
        v_ord := v_ord || jsonb_build_object('id', v_id, 'parent', v_pp.parent_id,
                                             'ord', public.cat_int(v_prev->>'display_order'));
      END IF;

      v_restored := v_restored + 1;
    END IF;

    UPDATE public.category_import_revisions SET undone_at = now() WHERE id = v_rev.id;
  END LOOP;

  FOR v_par IN SELECT DISTINCT (o->>'parent')::uuid AS parent_id
                 FROM jsonb_array_elements(v_ord) o
  LOOP
    SELECT array_agg(sib.child_id ORDER BY sib.rank, sib.display_order, sib.child_id)
      INTO v_ids
      FROM (SELECT p.child_id, p.display_order,
                   COALESCE((SELECT (o->>'ord')::int
                               FROM jsonb_array_elements(v_ord) o
                              WHERE (o->>'id')::uuid = p.child_id
                              LIMIT 1), p.display_order) AS rank
              FROM public.category_tree_pointers p
             WHERE p.parent_id IS NOT DISTINCT FROM v_par.parent_id) sib;
    IF v_ids IS NOT NULL THEN
      PERFORM public.admin_reorder_categories(v_par.parent_id, v_ids);
    END IF;
  END LOOP;

  PERFORM public.log_audit('category_import.undo', 'categories', p_batch::text,
    jsonb_build_object('restored', v_restored));

  RETURN jsonb_build_object('restored', v_restored);
END $function$;

REVOKE ALL ON FUNCTION public.admin_undo_category_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_category_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_category_import(uuid) TO service_role;

/* ======================== PROOFS (raise on failure) ======================= */

DO $proof$
DECLARE
  v_root uuid;
  v_kid  uuid;
  v_sec  uuid;
  v_plan jsonb;
  v_rows jsonb;
  v_item jsonb;
  v_prev jsonb;
  v_active boolean;
  v_name text;
  v_am text;
  v_parents text;
  v_src text;
  v_tag text := substr(gen_random_uuid()::text, 1, 8);
  v_rslug text;
  v_kslug text;
  v_sslug text;
BEGIN
  v_rslug := 'inc199-root-' || v_tag;
  v_kslug := 'inc199-kid-' || v_tag;
  v_sslug := 'inc199-sec-' || v_tag;

  ------------------------------------------------------------- SCRATCH SETUP
  INSERT INTO public.categories (name_en, slug, is_active, display_order)
  VALUES ('INC-199 scratch root', v_rslug, false, 9990) RETURNING id INTO v_root;
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (NULL, v_root, 9990);

  INSERT INTO public.categories (name_en, slug, is_active, display_order)
  VALUES ('INC-199 scratch secondary', v_sslug, true, 9991) RETURNING id INTO v_sec;
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (NULL, v_sec, 9991);

  ------- PROOF 1 (INC-198) — AN EMPTY ROOT IS PLANNED AS A DELETE
  v_rows := jsonb_build_array(jsonb_build_object(
    'row', 1, 'category_slug', v_rslug, 'action', 'delete',
    'parent_slug', '', 'name_en', 'INC-199 scratch root', 'is_active', 'false'));
  v_plan := public.cat_import_plan(v_rows, NULL);
  IF (v_plan->'counts'->>'deletes')::int <> 1
     OR (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'INC-198 proof 1 failed: an empty root did not plan as a delete: %',
                    v_plan->'counts';
  END IF;

  -- ... and the delete + its undo round-trip (the write sequence the commit and
  -- undo carry: delete door, then re-create from prev with its root pointer).
  v_prev := public.cat_export_row(v_root);
  DELETE FROM public.category_tree_pointers WHERE child_id = v_root OR parent_id = v_root;
  DELETE FROM public.categories WHERE id = v_root;
  IF EXISTS (SELECT 1 FROM public.categories c WHERE c.slug = v_rslug) THEN
    RAISE EXCEPTION 'INC-198 proof 1 failed: the empty root survived its delete';
  END IF;
  INSERT INTO public.categories (name_en, slug, is_active, display_order)
  VALUES (v_prev->>'name_en', v_rslug, public.cat_bool(v_prev->>'is_active', true), 9990)
  RETURNING id INTO v_root;
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (NULL, v_root, 9990);
  SELECT c.is_active INTO v_active FROM public.categories c WHERE c.id = v_root;
  IF v_active THEN
    RAISE EXCEPTION 'INC-198 proof 1-undo failed: the root came back active';
  END IF;

  ------- PROOF 2 (INC-198) — A ROOT WITH A RETIRED CHILD IS REFUSED BY NAME
  INSERT INTO public.categories (name_en, slug, is_active, display_order)
  VALUES ('INC-199 scratch kid', v_kslug, false, 1) RETURNING id INTO v_kid;
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_root, v_kid, 1);

  v_plan := public.cat_import_plan(v_rows, NULL);
  v_item := NULL;
  SELECT r INTO v_item FROM jsonb_array_elements(v_plan->'refusals') r
   WHERE r->>'key' = v_rslug;
  IF v_item IS NULL OR v_item->>'reason' <> 'hasChildren'
     OR position(v_kslug IN COALESCE(v_item->>'detail','')) = 0 THEN
    RAISE EXCEPTION 'INC-198 proof 2 failed: a root with a retired child was not refused by name: %',
                    COALESCE(v_item::text, 'no refusal');
  END IF;

  DELETE FROM public.category_tree_pointers WHERE child_id = v_kid;
  DELETE FROM public.categories WHERE id = v_kid;

  ------- PROOF 3 (INC-199 part 1) — statusNeedsAction
  v_rows := jsonb_build_array(jsonb_build_object(
    'row', 1, 'category_slug', v_rslug, 'action', 'upsert',
    'parent_slug', '', 'name_en', 'INC-199 scratch root', 'is_active', 'true'));
  v_plan := public.cat_import_plan(v_rows, NULL);
  v_item := NULL;
  SELECT r INTO v_item FROM jsonb_array_elements(v_plan->'refusals') r
   WHERE r->>'key' = v_rslug;
  IF v_item IS NULL OR v_item->>'reason' <> 'statusNeedsAction'
     OR v_item->>'detail' <> 'stored=false requested=true' THEN
    RAISE EXCEPTION 'INC-199 proof 3 failed: an is_active cell without its action was not refused: %',
                    COALESCE(v_item::text, 'no refusal');
  END IF;
  IF (v_plan->'counts'->>'changes')::int <> 0
     OR (v_plan->'counts'->>'unchanged')::int <> 0 THEN
    RAISE EXCEPTION 'INC-199 proof 3 failed: the refused row still counted: %', v_plan->'counts';
  END IF;

  -- The same cell AGREEING with the stored value is no change at all.
  v_rows := jsonb_build_array(jsonb_build_object(
    'row', 1, 'category_slug', v_rslug, 'action', 'upsert',
    'parent_slug', '', 'name_en', 'INC-199 scratch root', 'is_active', 'false'));
  v_plan := public.cat_import_plan(v_rows, NULL);
  IF (v_plan->'counts'->>'unchanged')::int <> 1
     OR (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'INC-199 proof 3b failed: an agreeing is_active cell was not silent: %',
                    v_plan->'counts';
  END IF;

  ------- PROOF 4 (INC-199 part 2) — AN ACTION ROW CARRIES ITS CELLS
  v_rows := jsonb_build_array(jsonb_build_object(
    'row', 1, 'category_slug', v_rslug, 'action', 'reactivate',
    'parent_slug', '', 'name_en', 'INC-199 scratch root', 'is_active', 'true',
    'name_am', 'የሙከራ ሥር', 'secondary_parents', v_sslug));
  v_plan := public.cat_import_plan(v_rows, NULL);
  v_item := NULL;
  SELECT i INTO v_item FROM jsonb_array_elements(v_plan->'items') i
   WHERE i->>'slug' = v_rslug;
  IF v_item IS NULL OR v_item->>'op' <> 'reactivate'
     OR NOT ((v_item->'fields') ? 'name_am')
     OR NOT ((v_item->'fields') ? 'secondary_parents')
     OR position('name_am' IN COALESCE(v_item->>'detail','')) = 0
     OR position('secondary_parents' IN COALESCE(v_item->>'detail','')) = 0 THEN
    RAISE EXCEPTION 'INC-199 proof 4 failed: the action row dropped its cells: %',
                    COALESCE(v_item::text, 'no item');
  END IF;
  IF (v_plan->'counts'->>'reactivations')::int <> 1
     OR (v_plan->'counts'->>'changes')::int <> 0 THEN
    RAISE EXCEPTION 'INC-199 proof 4 failed: the action row was not counted ONCE: %',
                    v_plan->'counts';
  END IF;

  -- The commit's write sequence: status door, then the row's cells, one write.
  v_prev := public.cat_export_row(v_root)
            || jsonb_build_object('am_state', 'null'::jsonb);
  UPDATE public.categories SET is_active = true WHERE id = v_root;
  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine)
  VALUES ('category', v_root, 'name', 'am', 'የሙከራ ሥር', 'edited', false)
  ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
    SET value = EXCLUDED.value;
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_sec, v_root, 0);

  SELECT c.is_active INTO v_active FROM public.categories c WHERE c.id = v_root;
  SELECT t.value INTO v_am FROM public.entity_translations t
   WHERE t.entity_type = 'category' AND t.entity_id = v_root
     AND t.field = 'name' AND t.lang_code = 'am';
  SELECT COALESCE(public.cat_export_row(v_root)->>'secondary_parents','') INTO v_parents;
  IF NOT v_active OR v_am <> 'የሙከራ ሥር' OR v_parents <> v_sslug THEN
    RAISE EXCEPTION 'INC-199 proof 4 failed: status=% am=% secondary=%', v_active, v_am, v_parents;
  END IF;

  -- ... and the undo restores BOTH halves (status and cells), as the new undo
  -- body does: exclusions/am/pointers from prev, then the status door.
  DELETE FROM public.entity_translations
   WHERE entity_type = 'category' AND entity_id = v_root AND field = 'name';
  DELETE FROM public.category_tree_pointers WHERE child_id = v_root AND parent_id = v_sec;
  UPDATE public.categories
     SET is_active = public.cat_bool(v_prev->>'is_active', true) WHERE id = v_root;
  SELECT c.is_active INTO v_active FROM public.categories c WHERE c.id = v_root;
  SELECT COALESCE(public.cat_export_row(v_root)->>'secondary_parents','') INTO v_parents;
  IF v_active OR v_parents <> ''
     OR EXISTS (SELECT 1 FROM public.entity_translations t
                 WHERE t.entity_type = 'category' AND t.entity_id = v_root) THEN
    RAISE EXCEPTION 'INC-199 proof 4-undo failed: status=% secondary=%', v_active, v_parents;
  END IF;

  ------- PROOF 5 — A RETIRE ROW WITH A RENAME CARRIES BOTH
  UPDATE public.categories SET is_active = true WHERE id = v_root;
  v_rows := jsonb_build_array(jsonb_build_object(
    'row', 1, 'category_slug', v_rslug, 'action', 'retire',
    'parent_slug', '', 'name_en', 'INC-199 renamed root', 'is_active', 'false'));
  v_plan := public.cat_import_plan(v_rows, NULL);
  v_item := NULL;
  SELECT i INTO v_item FROM jsonb_array_elements(v_plan->'items') i
   WHERE i->>'slug' = v_rslug;
  IF v_item IS NULL OR v_item->>'op' <> 'retire'
     OR v_item->'fields'->>'name_en' <> 'INC-199 renamed root'
     OR (v_plan->'counts'->>'retires')::int <> 1 THEN
    RAISE EXCEPTION 'INC-199 proof 5 failed: the retire row dropped its rename: %',
                    COALESCE(v_item::text, 'no item');
  END IF;
  UPDATE public.categories
     SET is_active = false, name_en = 'INC-199 renamed root' WHERE id = v_root;
  SELECT c.name_en, c.is_active INTO v_name, v_active
    FROM public.categories c WHERE c.id = v_root;
  IF v_active OR v_name <> 'INC-199 renamed root' THEN
    RAISE EXCEPTION 'INC-199 proof 5 failed: retire+rename read back % / %', v_active, v_name;
  END IF;

  ------- PROOF 6 (d) — ALREADY-RETIRED AND UNKNOWN ROWS SAY SO
  v_rows := jsonb_build_array(jsonb_build_object(
      'row', 1, 'category_slug', v_rslug, 'action', 'retire',
      'parent_slug', '', 'name_en', 'INC-199 renamed root', 'is_active', 'false'))
    || jsonb_build_array(jsonb_build_object(
      'row', 2, 'category_slug', 'inc199-ghost-' || v_tag, 'action', 'delete'));
  v_plan := public.cat_import_plan(v_rows, NULL);
  IF (v_plan->'counts'->>'unchanged')::int <> 2
     OR (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'INC-199 proof 6 failed: %', v_plan->'counts';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM jsonb_array_elements(v_plan->'items') i
                  WHERE i->>'op' = 'noop' AND i->>'detail' = 'alreadyRetired')
     OR NOT EXISTS (SELECT 1 FROM jsonb_array_elements(v_plan->'items') i
                     WHERE i->>'op' = 'noop' AND i->>'detail' = 'alreadyDeleted') THEN
    RAISE EXCEPTION 'INC-199 proof 6 failed: a no-op row still says nothing: %', v_plan->'items';
  END IF;

  ------- PROOF 7 — THE BODIES CARRY THE NEW PHASES, IN ORDER
  SELECT p.prosrc INTO v_src FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_commit_category_import';
  IF position('STATUS THEN CELLS' IN v_src) = 0
     OR position('CONTINUE WHEN v_op = ''noop''' IN v_src) = 0
     OR NOT (position('admin_reactivate_category' IN v_src)
             < position('admin_update_category' IN v_src)) THEN
    RAISE EXCEPTION 'INC-199 proof 7 failed: the commit body does not run the status door before the cells';
  END IF;
  SELECT p.prosrc INTO v_src FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_undo_category_import';
  IF position('SECONDARY PARENTS of the prior state' IN v_src) = 0 THEN
    RAISE EXCEPTION 'INC-199 proof 7 failed: the undo body does not restore secondary parents';
  END IF;

  --------------------------------------------------------------- TEARDOWN
  DELETE FROM public.entity_translations
   WHERE entity_type = 'category' AND entity_id IN (v_root, v_sec);
  DELETE FROM public.category_tree_pointers
   WHERE child_id IN (v_root, v_sec) OR parent_id IN (v_root, v_sec);
  DELETE FROM public.categories WHERE id IN (v_root, v_sec);

  RAISE NOTICE 'INC-198/199 proofs 1-7 OK (empty-root delete + undo, named refusal, statusNeedsAction, action rows carrying cells, retire+rename, no-op details, body order)';
END $proof$;

-- READ-BACK: every OTHER function is byte-identical, every ACL is unchanged,
-- and the export payload is untouched.
DO $readback$
DECLARE v_bad text; v_now text; v_was text;
BEGIN
  SELECT string_agg(b.proname || ' (source changed)', ', ')
    INTO v_bad
    FROM inc199_before b
    JOIN pg_proc p ON p.proname = b.proname
    JOIN pg_namespace n ON n.oid = p.pronamespace AND n.nspname = 'public'
   WHERE b.proname NOT IN ('cat_import_plan', 'admin_commit_category_import',
                           'admin_undo_category_import')
     AND md5(p.prosrc) <> b.src_md5;
  IF v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'INC-198/199 read-back failed: %', v_bad;
  END IF;

  SELECT string_agg(b.proname || ' (acl changed)', ', ')
    INTO v_bad
    FROM inc199_before b
    JOIN pg_proc p ON p.proname = b.proname
    JOIN pg_namespace n ON n.oid = p.pronamespace AND n.nspname = 'public'
   WHERE COALESCE(p.proacl::text, '') <> b.acl;
  IF v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'INC-198/199 ACL read-back failed: %', v_bad;
  END IF;

  SELECT payload_md5 INTO v_was FROM inc199_export;
  v_now := md5(public.cat_export_rows(NULL)::text);
  IF v_now <> v_was THEN
    RAISE EXCEPTION 'INC-198/199 read-back failed: the export payload changed';
  END IF;

  IF has_function_privilege('anon', 'public.cat_import_plan(jsonb, text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.cat_import_plan(jsonb, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-187: cat_import_plan must stay closed to anon and authenticated';
  END IF;
  IF has_function_privilege('anon', 'public.admin_commit_category_import(jsonb, text, text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_undo_category_import(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-187: anon must hold no EXECUTE on the categories import doors';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_commit_category_import(jsonb, text, text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_undo_category_import(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-187: authenticated must hold EXECUTE on the categories import doors';
  END IF;

  RAISE NOTICE 'INC-198/199: read-backs OK — other functions byte-identical, ACLs unchanged, export payload unchanged';
END $readback$;

INSERT INTO public.migration_marks (version) VALUES ('20260915120000') ON CONFLICT DO NOTHING;