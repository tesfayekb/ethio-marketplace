-- ============================================================
-- INC-187 FIX, PART 1 — the categories import applies order ONCE per parent
-- ============================================================
-- Mechanism (corrected): creates ignore the payload's display_order
-- (admin_create_category has no order parameter; rows are appended); updates
-- committed order ONE ROW AT A TIME — each row with an order delta was ranked
-- against its siblings' CURRENT numbers and admin_reorder_categories renumbered
-- all siblings 0..N-1, so after the first row every later file value was
-- compared on a different scale. The catch-all is excluded by the reorder door
-- (pinned at 1000000+) yet the planner counted its order cell as a change.
--
-- INC-183 law: each function below is re-declared WHOLE (never patched by text
-- anchor), restates its closers in-file, and the file ends with definition and
-- ACL read-backs.
--
-- NOTE on cat_import_plan's closers: it is an internal helper reached only
-- through the gated preview/commit doors; its standing ACL revokes EXECUTE from
-- authenticated as well. That stricter closer is restated unchanged (widening it
-- would open ungated plan reads); service_role is granted, as the law requires.

-- ============================================================
-- 1. cat_import_plan — a catch-all's display_order cell is never a change
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
GRANT ALL ON FUNCTION public.cat_import_plan(jsonb, text) TO service_role;

-- ============================================================
-- 2. admin_commit_category_import — ONE ordering pass per primary parent
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
      -- The am row leaves with the category (a deleted id can never be read
      -- again); the captured am_state above restores it on Undo.
      DELETE FROM public.entity_translations
       WHERE entity_type = 'category' AND entity_id = v_id AND field = 'name';
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
    VALUES (v_batch, 'update', v_slug, v_prev, public.cat_export_row(v_id), auth.uid());
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
-- 3. admin_undo_category_import — the previous order comes back too
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

-- ============================================================
-- 4. PROOFS
-- ============================================================
-- (i) DEFINITION READ-BACK — one ordering pass, no per-row rank fragment.
DO $$
DECLARE v_commit text; v_undo text; v_n int;
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO v_commit FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_commit_category_import';
  SELECT pg_get_functiondef(p.oid) INTO v_undo FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_undo_category_import';
  IF v_commit IS NULL OR v_undo IS NULL THEN
    RAISE EXCEPTION 'INC-187: commit/undo not found after re-declaration';
  END IF;
  v_n := (length(v_commit) - length(replace(v_commit, 'admin_reorder_categories', '')))
         / length('admin_reorder_categories');
  IF v_n <> 1 THEN
    RAISE EXCEPTION 'INC-187: commit must call admin_reorder_categories exactly once (found %)', v_n;
  END IF;
  IF position('CASE WHEN p.child_id = v_id THEN v_order' IN v_commit) > 0 THEN
    RAISE EXCEPTION 'INC-187: the per-row rank-and-renumber block is still in the commit body';
  END IF;
  v_n := (length(v_undo) - length(replace(v_undo, 'admin_reorder_categories', '')))
         / length('admin_reorder_categories');
  IF v_n <> 1 THEN
    RAISE EXCEPTION 'INC-187: undo must call admin_reorder_categories exactly once (found %)', v_n;
  END IF;
  RAISE NOTICE 'INC-187: definition read-back OK — one ordering pass in commit and in undo';
END $$;

-- (ii) PLANNER — the unedited export still plans to nothing, and a catch-all's
-- differing order cell is no longer a change.
DO $$
DECLARE v_rows jsonb; v_plan jsonb; v_slug text;
BEGIN
  SELECT COALESCE(jsonb_agg(r.value || jsonb_build_object('row', r.ordinality)), '[]'::jsonb)
    INTO v_rows
    FROM jsonb_array_elements(public.cat_export_rows(NULL)) WITH ORDINALITY AS r(value, ordinality);
  v_plan := public.cat_import_plan(v_rows, NULL);
  IF (v_plan->'counts'->>'adds')::int <> 0
     OR (v_plan->'counts'->>'changes')::int <> 0
     OR (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'INC-187: idempotency FAILED (categories): %', v_plan->'counts';
  END IF;
  RAISE NOTICE 'INC-187: unedited export yields 0 ignored cells: %', v_plan->'counts';

  SELECT c.slug INTO v_slug FROM public.categories c WHERE c.is_catchall LIMIT 1;
  IF v_slug IS NULL THEN
    RAISE NOTICE 'INC-187: no catch-all in this database — catch-all order proof skipped';
  ELSE
    SELECT COALESCE(jsonb_agg(
             CASE WHEN r.value->>'category_slug' = v_slug
                  THEN r.value || jsonb_build_object('row', r.ordinality, 'display_order', 7)
                  ELSE r.value || jsonb_build_object('row', r.ordinality) END), '[]'::jsonb)
      INTO v_rows
      FROM jsonb_array_elements(public.cat_export_rows(NULL)) WITH ORDINALITY AS r(value, ordinality);
    v_plan := public.cat_import_plan(v_rows, NULL);
    IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_plan->'items') i
                WHERE i->>'slug' = v_slug AND (i->'fields') ? 'display_order') THEN
      RAISE EXCEPTION 'INC-187: a catch-all still emits a display_order delta (%)', v_slug;
    END IF;
    IF (v_plan->'counts'->>'changes')::int <> 0 THEN
      RAISE EXCEPTION 'INC-187: a catch-all order cell still counts as a change: %',
                      v_plan->'counts';
    END IF;
    RAISE NOTICE 'INC-187: catch-all % — differing order cell emits no delta', v_slug;
  END IF;
END $$;

-- (iii) ACL READ-BACK for all three functions.
DO $$
DECLARE v_acl text;
BEGIN
  SELECT array_to_string(p.proacl, ',') INTO v_acl FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'cat_import_plan';
  RAISE NOTICE 'ACL cat_import_plan: %', v_acl;
  IF has_function_privilege('anon', 'public.cat_import_plan(jsonb, text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.cat_import_plan(jsonb, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-187: cat_import_plan must stay closed to anon and authenticated';
  END IF;

  SELECT array_to_string(p.proacl, ',') INTO v_acl FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_commit_category_import';
  RAISE NOTICE 'ACL admin_commit_category_import: %', v_acl;
  IF has_function_privilege('anon', 'public.admin_commit_category_import(jsonb, text, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-187: anon must hold no EXECUTE on admin_commit_category_import';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_commit_category_import(jsonb, text, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-187: authenticated must hold EXECUTE on admin_commit_category_import';
  END IF;

  SELECT array_to_string(p.proacl, ',') INTO v_acl FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_undo_category_import';
  RAISE NOTICE 'ACL admin_undo_category_import: %', v_acl;
  IF has_function_privilege('anon', 'public.admin_undo_category_import(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-187: anon must hold no EXECUTE on admin_undo_category_import';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_undo_category_import(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-187: authenticated must hold EXECUTE on admin_undo_category_import';
  END IF;
  RAISE NOTICE 'INC-187: ACL read-back OK for all three functions';
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20260911120000') ON CONFLICT DO NOTHING;