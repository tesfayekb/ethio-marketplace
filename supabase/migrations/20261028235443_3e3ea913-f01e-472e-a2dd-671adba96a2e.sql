-- Foundations turn D1, M5b — INC-951 part 3b, the six bulk callers move to the cores (ruling, stop 7, item 3).
-- Each caller is its live ethio-prod body (2026-10-28 23:5x UTC, md5(prosrc) named per function, equal to
-- its latest migration's body) redeclared whole; the only change is the callee name, <door>( -> <door>_core(.
-- Header (DEFINER, VOLATILE, search_path public) and ACL unchanged: the REVOKE/GRANT lines restate today's
-- ACL exactly (admin_import_translations has no service_role grant today and gains none here).
-- The bulk callers' own checks (signed in, permission, step-up, scope) stay; their file dials (M6) meter them.
-- The cores are owner-only (M5a); these DEFINER callers are owned by the cores' owner, so they run them.

-- admin_import_translations: live body (md5(prosrc) 8b49fa8c5e078c995eceff13e12a8271) whole; the only change: 1 call(s) public.admin_save_translation( -> public.admin_save_translation_core(.
CREATE OR REPLACE FUNCTION public.admin_import_translations(p_lang text, p_items jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_base      text;
  v_item      record;
  v_flagged   boolean;
  v_current   text;
  v_found     boolean;
  v_batch     uuid := gen_random_uuid();
  v_before    uuid[];
  v_new       uuid;
  v_imported  bigint := 0;
  v_flag      bigint := 0;
  v_skipped   bigint := 0;
  v_unchanged bigint := 0;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'update');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  IF jsonb_typeof(COALESCE(p_items, 'null'::jsonb)) <> 'array' THEN
    RAISE EXCEPTION 'p_items must be a json array';
  END IF;
  IF jsonb_array_length(p_items) > 5000 THEN
    RAISE EXCEPTION 'too many rows (max 5000)';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    RAISE EXCEPTION 'base language rows are sync-owned';
  END IF;

  FOR v_item IN
    SELECT e->>'key' AS key, e->>'value' AS value
      FROM jsonb_array_elements(p_items) AS e
  LOOP
    CONTINUE WHEN v_item.key IS NULL OR btrim(v_item.key) = '' OR v_item.value IS NULL;

    PERFORM 1 FROM public.ui_translations t
      WHERE t.key = v_item.key AND t.lang_code = v_base AND NOT t.orphaned;
    IF NOT FOUND THEN
      v_skipped := v_skipped + 1;
      CONTINUE;
    END IF;

    -- NO-OP LAW (INC-124): one normalization on both sides.
    v_current := NULL;
    v_found := false;
    SELECT t.value, true INTO v_current, v_found
      FROM public.ui_translations t
     WHERE t.key = v_item.key AND t.lang_code = p_lang;

    IF v_found AND v_current IS NOT NULL
       AND regexp_replace(v_current, '[[:space:]]+$', '') =
           regexp_replace(v_item.value, '[[:space:]]+$', '') THEN
      v_unchanged := v_unchanged + 1;
      CONTINUE;
    END IF;

    -- BATCH STAMP by ID-SET DIFFERENCE: timestamps can tie inside one
    -- transaction, ids cannot. The writer captures at most one revision.
    SELECT COALESCE(array_agg(r.id), ARRAY[]::uuid[]) INTO v_before
      FROM public.ui_translation_revisions r
     WHERE r.key = v_item.key AND r.lang_code = p_lang;

    PERFORM public.admin_save_translation_core(v_item.key, p_lang, v_item.value);
    v_imported := v_imported + 1;

    SELECT r.id INTO v_new
      FROM public.ui_translation_revisions r
     WHERE r.key = v_item.key AND r.lang_code = p_lang
       AND NOT (r.id = ANY (v_before))
     LIMIT 1;

    IF v_new IS NOT NULL THEN
      UPDATE public.ui_translation_revisions
         SET batch_id = v_batch,
             -- What the import actually stored: undo's untouched test.
             post_value = (SELECT t.value FROM public.ui_translations t
                            WHERE t.key = v_item.key AND t.lang_code = p_lang)
       WHERE id = v_new;
    END IF;

    SELECT t.flagged INTO v_flagged
      FROM public.ui_translations t
     WHERE t.key = v_item.key AND t.lang_code = p_lang;
    IF COALESCE(v_flagged, false) THEN
      v_flag := v_flag + 1;
      UPDATE public.ui_translations
         SET flag_note = COALESCE(flag_note, '') || ' · import'
       WHERE key = v_item.key AND lang_code = p_lang
         AND COALESCE(flag_note, '') NOT LIKE '%· import';
    END IF;
  END LOOP;

  PERFORM public.log_audit('translation.import', 'ui_translations', p_lang,
    jsonb_build_object('lang', p_lang, 'action', 'import', 'machine', false,
                       'batch_id', v_batch,
                       'imported', v_imported, 'flagged', v_flag,
                       'unchanged', v_unchanged, 'skipped', v_skipped));

  RETURN jsonb_build_object('imported', v_imported, 'flagged', v_flag,
                            'unchanged', v_unchanged, 'skipped', v_skipped,
                            'batch_id', v_batch);
END $function$;
REVOKE ALL ON FUNCTION public.admin_import_translations(text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_import_translations(text, jsonb) TO authenticated;

-- admin_commit_category_import: live body (md5(prosrc) ff02453732c277dfe713d74ea86450b1) whole; the only change: 2 call(s) public.admin_save_entity_translation( -> public.admin_save_entity_translation_core(.
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
  v_sp text;
  v_spid uuid;
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
      -- M8a A3 — a guest parent created by this same file waits for its pass.
      IF EXISTS (SELECT 1 FROM jsonb_array_elements_text(
                   CASE WHEN jsonb_typeof(v_fields->'secondary_parents') = 'array'
                        THEN v_fields->'secondary_parents' ELSE '[]'::jsonb END) x
                  WHERE NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.slug = x)
                    AND EXISTS (SELECT 1 FROM jsonb_array_elements(v_pending) q
                                 WHERE q->>'slug' = x)) THEN
        v_next := v_next || v_item;
        CONTINUE;
      END IF;

      v_id := public.admin_create_category(
        v_fields->>'name_en', v_slug, v_fields->>'icon', v_parent,
        (v_fields->>'allow_listings')::boolean, (v_fields->>'price_enabled')::boolean,
        public.cat_int(v_fields->>'expiry_days'),
        public.cat_ts(v_fields->>'visible_from'),
        public.cat_ts(v_fields->>'visible_until'));

      -- DEC-052 / DEC-067 — the three cells the create stated, in ONE statement.
      IF v_fields ? 'capabilities' OR v_fields ? 'default_price_period'
         OR v_fields ? 'price_period_locked' THEN
        UPDATE public.categories SET
          capabilities = CASE WHEN v_fields ? 'capabilities'
            THEN COALESCE(ARRAY(SELECT jsonb_array_elements_text(v_fields->'capabilities')),
                          '{}'::text[])
            ELSE capabilities END,
          default_price_period = COALESCE(NULLIF(v_fields->>'default_price_period',''),
                                          default_price_period),
          price_period_locked = COALESCE((v_fields->>'price_period_locked')::boolean,
                                         price_period_locked),
          updated_at = now()
         WHERE id = v_id;
      END IF;

      -- IE-4a — a non-empty am name is written as a HUMAN, pending-review row
      -- ('edited', machine=false) through the translation door. The batch owns
      -- the row it creates: Undo removes it again.
      IF public.cat_text(v_fields->>'name_am') IS NOT NULL THEN
        PERFORM public.admin_save_entity_translation_core('category', v_id, 'name', 'am',
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

      -- M8a A3 (INC-314) — the create row's guest parents become pointers.
      FOR v_sp IN SELECT x FROM jsonb_array_elements_text(
                    CASE WHEN jsonb_typeof(v_fields->'secondary_parents') = 'array'
                        THEN v_fields->'secondary_parents' ELSE '[]'::jsonb END) x
      LOOP
        SELECT c.id INTO v_spid FROM public.categories c WHERE c.slug = v_sp;
        IF v_spid IS NULL THEN
          RAISE EXCEPTION 'unknownParent: %', v_sp;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p
                        WHERE p.child_id = v_id AND p.parent_id = v_spid) THEN
          PERFORM public.admin_add_category_pointer(v_spid, v_id);
        END IF;
      END LOOP;

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
      -- M8a A4 (INC-307) — the delete captures the category's attribute links
      -- (each row minus id and category_id, plus its attr_key) so Undo can
      -- restore them; the links leave by cascade with the category.
      v_prev := v_prev || jsonb_build_object('links', COALESCE((
        SELECT jsonb_agg((to_jsonb(l) - 'id' - 'category_id')
                         || jsonb_build_object('attr_key', a.attr_key)
                         ORDER BY l.display_order, l.attribute_id)
          FROM public.category_attribute_links l
          JOIN public.attributes a ON a.id = l.attribute_id
         WHERE l.category_id = v_id), '[]'::jsonb));
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

    -- DEC-052 / DEC-067 — the three cells, in ONE statement, touching only the
    -- cells the row carries.
    IF v_fields ? 'capabilities' OR v_fields ? 'default_price_period'
       OR v_fields ? 'price_period_locked' THEN
      UPDATE public.categories SET
        capabilities = CASE WHEN v_fields ? 'capabilities'
          THEN COALESCE(ARRAY(SELECT jsonb_array_elements_text(v_fields->'capabilities')),
                        '{}'::text[])
          ELSE capabilities END,
        default_price_period = COALESCE(NULLIF(v_fields->>'default_price_period',''),
                                        default_price_period),
        price_period_locked = COALESCE((v_fields->>'price_period_locked')::boolean,
                                       price_period_locked),
        updated_at = now()
       WHERE id = v_id;
    END IF;

    -- IE-4a — the planner only ever emits a NON-EMPTY name_am, and only when
    -- it differs from the live value: an identical cell writes nothing, and an
    -- empty cell never reaches here at all (silence, not a deletion).
    IF v_fields ? 'name_am' AND btrim(COALESCE(v_fields->>'name_am','')) <> '' THEN
      PERFORM public.admin_save_entity_translation_core('category', v_id, 'name', 'am',
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
    SELECT array_agg(sib.child_id ORDER BY (NOT sib.is_primary), sib.rank, sib.display_order, sib.child_id)
      INTO v_ids
      FROM (SELECT p.child_id, p.display_order, p.is_primary,
                   COALESCE((SELECT (o->>'ord')::int
                               FROM jsonb_array_elements(v_ord) o
                              WHERE (o->>'id')::uuid = p.child_id
                                AND (o->>'parent')::uuid IS NOT DISTINCT FROM p.parent_id
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

-- admin_commit_location_import: live body (md5(prosrc) 58ec37ee8531e7469a85360cd4946368) whole; the only change: 2 call(s) public.admin_save_entity_translation( -> public.admin_save_entity_translation_core(.
CREATE OR REPLACE FUNCTION public.admin_commit_location_import(
  p_countries jsonb, p_locations jsonb, p_scope text, p_digest text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $fn$
DECLARE
  v_plan jsonb; v_batch uuid := gen_random_uuid(); v_uid uuid := auth.uid();
  it jsonb; f jsonb; v_key text; v_code char(2); v_id uuid; v_prev jsonb;
  v_segs text[]; v_depth int; v_parent_id uuid; v_anchor uuid;
  v_am_prev jsonb; v_row public.countries; v_pos int;
BEGIN
  IF NOT public.has_permission(v_uid, 'locations', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('locations', 'import');
  IF NOT pg_try_advisory_xact_lock(hashtext('location-import'), hashtext(v_uid::text)) THEN
    RAISE EXCEPTION 'import already running';
  END IF;

  v_plan := public.loc_import_plan(p_countries, p_locations, p_scope);
  IF jsonb_array_length(v_plan->'refusals') > 0 THEN
    RAISE EXCEPTION 'planHasRefusals';
  END IF;

  -- (1) countries create / update ------------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND value->>'op' IN ('create','update') LOOP
    v_code := it->>'key'; f := it->'fields';
    IF it->>'op' = 'create' THEN
      INSERT INTO public.countries (code, name_en, is_active, unit_system, currency_code, display_order)
      VALUES (v_code, f->>'name_en', false,
              COALESCE(f->>'unit_system','metric'),
              NULLIF(COALESCE(f->>'currency_code',''),'')::char(3),
              COALESCE((f->>'display_order')::int, 0));
      INSERT INTO public.location_import_revisions
        (batch_id, entity_type, action, entity_key, prev, post, created_by)
      VALUES (v_batch,'country','create',v_code,NULL,public.country_export_row(v_code),v_uid);
    ELSE
      v_prev := public.country_export_row(v_code);
      UPDATE public.countries SET
        name_en       = COALESCE(f->>'name_en', name_en),
        unit_system   = COALESCE(f->>'unit_system', unit_system),
        currency_code = COALESCE(NULLIF(COALESCE(f->>'currency_code',''),'')::char(3), currency_code),
        display_order = COALESCE((f->>'display_order')::int, display_order),
        updated_at    = now()
       WHERE code = v_code;
      INSERT INTO public.location_import_revisions
        (batch_id, entity_type, action, entity_key, prev, post, created_by)
      VALUES (v_batch,'country','update',v_code,v_prev,public.country_export_row(v_code),v_uid);
    END IF;
  END LOOP;

  -- (2) country open: the market and its tree anchor -------------------------
  --     INC-215: 'open+update' opens the market AND applies the row's edits in
  --     ONE statement; the anchor is named from the POST-update row.
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND value->>'op' IN ('activate','open+update') LOOP
    v_code := it->>'key'; f := it->'fields';
    v_prev := public.country_export_row(v_code);
    UPDATE public.countries SET
      is_active     = true,
      name_en       = COALESCE(f->>'name_en', name_en),
      unit_system   = COALESCE(f->>'unit_system', unit_system),
      currency_code = COALESCE(NULLIF(COALESCE(f->>'currency_code',''),'')::char(3), currency_code),
      display_order = COALESCE((f->>'display_order')::int, display_order),
      updated_at    = now()
     WHERE code = v_code;
    SELECT * INTO v_row FROM public.countries WHERE code = v_code;
    SELECT id INTO v_anchor FROM public.locations
     WHERE level = 'country' AND country_code = v_code LIMIT 1;
    IF v_anchor IS NULL THEN
      INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
      VALUES (NULL,'country',v_code,v_row.name_en,
              public.location_slug_candidate(v_row.name_en, NULL), true, 'import');
    ELSE
      UPDATE public.locations SET is_active = true WHERE id = v_anchor;
    END IF;
    IF it->>'op' = 'open+update' THEN
      INSERT INTO public.location_import_revisions
        (batch_id, entity_type, action, entity_key, prev, post, created_by)
      VALUES (v_batch,'country','update',v_code,v_prev,public.country_export_row(v_code),v_uid);
    END IF;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'country','open',v_code,v_prev,public.country_export_row(v_code),v_uid);
  END LOOP;

  -- (3a) location creates, shallowest first ---------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items') value
             WHERE value->>'file' = 'locations' AND value->>'op' = 'create'
             ORDER BY array_length(string_to_array(value->>'key','/'),1),
                      (value->>'row')::int LOOP
    v_key := it->>'key'; f := it->'fields';
    v_segs := string_to_array(v_key,'/'); v_depth := array_length(v_segs,1);
    v_parent_id := CASE WHEN v_depth > 1
      THEN public.loc_id_of_key(array_to_string(v_segs[1:v_depth-1],'/')) END;
    -- INC-200 law: one statement carries every cell.
    INSERT INTO public.locations
      (parent_id, level, country_code, name_en, slug, iso_3166_2, aliases,
       display_order, center_lat, center_lng, is_active, source)
    VALUES (v_parent_id, f->>'level', (f->>'country_code')::char(2), f->>'name_en',
            v_segs[v_depth], NULLIF(COALESCE(f->>'iso_3166_2',''),''),
            COALESCE(ARRAY(SELECT jsonb_array_elements_text(COALESCE(f->'aliases','[]'::jsonb))), '{}'::text[]),
            COALESCE((f->>'display_order')::int, 0),
            (f->>'center_lat')::double precision, (f->>'center_lng')::double precision,
            COALESCE((f->>'is_active')::boolean, false), 'import')
    RETURNING id INTO v_id;
    IF COALESCE(f->>'name_am','') <> '' THEN
      PERFORM public.admin_save_entity_translation_core('location', v_id, 'name', 'am', f->>'name_am');
    END IF;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','create',v_key,
            jsonb_build_object('id',v_id,'parent_id',v_parent_id,'am_state',NULL),
            public.loc_export_row(v_id), v_uid);
  END LOOP;

  -- (3b) location updates ---------------------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'locations' AND value->>'op' IN ('update','noop') LOOP
    f := it->'fields';
    CONTINUE WHEN f = '{}'::jsonb;
    v_key := it->>'key'; v_id := public.loc_id_of_key(v_key);
    CONTINUE WHEN v_id IS NULL;
    SELECT jsonb_build_object('value',t.value,'status',t.status,'machine',t.machine)
      INTO v_am_prev FROM public.entity_translations t
     WHERE t.entity_type='location' AND t.entity_id=v_id AND t.field='name' AND t.lang_code='am';
    v_prev := public.loc_export_row(v_id)
              || jsonb_build_object('id',v_id,'am_state',v_am_prev);
    UPDATE public.locations SET
      name_en       = COALESCE(f->>'name_en', name_en),
      iso_3166_2    = CASE WHEN f ? 'iso_3166_2' THEN NULLIF(f->>'iso_3166_2','') ELSE iso_3166_2 END,
      aliases       = CASE WHEN f ? 'aliases'
                        THEN COALESCE(ARRAY(SELECT jsonb_array_elements_text(f->'aliases')), '{}'::text[])
                        ELSE aliases END,
      display_order = COALESCE((f->>'display_order')::int, display_order),
      center_lat    = COALESCE((f->>'center_lat')::double precision, center_lat),
      center_lng    = COALESCE((f->>'center_lng')::double precision, center_lng),
      updated_at    = now()
     WHERE id = v_id;
    IF COALESCE(f->>'name_am','') <> '' THEN
      PERFORM public.admin_save_entity_translation_core('location', v_id, 'name', 'am', f->>'name_am');
    END IF;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','update',v_key,v_prev,public.loc_export_row(v_id),v_uid);
  END LOOP;

  -- (3c) activations, shallowest first --------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items') value
             WHERE value->>'file' = 'locations' AND value->>'op' = 'activate'
             ORDER BY array_length(string_to_array(value->>'key','/'),1) LOOP
    v_key := it->>'key'; v_id := public.loc_id_of_key(v_key);
    v_prev := public.loc_export_row(v_id) || jsonb_build_object('id',v_id);
    UPDATE public.locations SET is_active = true, updated_at = now() WHERE id = v_id;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','activate',v_key,v_prev,public.loc_export_row(v_id),v_uid);
  END LOOP;

  -- (4) retires -------------------------------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'locations' AND value->>'op' = 'retire' LOOP
    v_key := it->>'key'; v_id := public.loc_id_of_key(v_key);
    v_prev := public.loc_export_row(v_id) || jsonb_build_object('id',v_id);
    UPDATE public.locations SET is_active = false, updated_at = now() WHERE id = v_id;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','retire',v_key,v_prev,public.loc_export_row(v_id),v_uid);
  END LOOP;

  -- (5) deletes, deepest first ---------------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items') value
             WHERE value->>'file' = 'locations' AND value->>'op' = 'delete'
             ORDER BY array_length(string_to_array(value->>'key','/'),1) DESC LOOP
    v_key := it->>'key'; v_id := public.loc_id_of_key(v_key);
    CONTINUE WHEN v_id IS NULL;
    SELECT jsonb_build_object('value',t.value,'status',t.status,'machine',t.machine)
      INTO v_am_prev FROM public.entity_translations t
     WHERE t.entity_type='location' AND t.entity_id=v_id AND t.field='name' AND t.lang_code='am';
    SELECT parent_id INTO v_parent_id FROM public.locations WHERE id = v_id;
    v_prev := public.loc_export_row(v_id)
              || jsonb_build_object('id',v_id,'parent_id',v_parent_id,'am_state',v_am_prev);
    DELETE FROM public.entity_translations
     WHERE entity_type='location' AND entity_id=v_id;
    DELETE FROM public.locations WHERE id = v_id;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','delete',v_key,v_prev,NULL,v_uid);
  END LOOP;

  -- (6) country close ------------------------------------------------------
  --     INC-215: 'close+update' closes the market AND applies the row's edits
  --     in ONE statement, writing both revisions.
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND value->>'op' IN ('retire','close+update') LOOP
    v_code := it->>'key'; f := it->'fields';
    v_prev := public.country_export_row(v_code);
    UPDATE public.countries SET
      is_active     = false,
      name_en       = COALESCE(f->>'name_en', name_en),
      unit_system   = COALESCE(f->>'unit_system', unit_system),
      currency_code = COALESCE(NULLIF(COALESCE(f->>'currency_code',''),'')::char(3), currency_code),
      display_order = COALESCE((f->>'display_order')::int, display_order),
      updated_at    = now()
     WHERE code = v_code;
    UPDATE public.locations SET is_active = false
     WHERE level = 'country' AND country_code = v_code;
    IF it->>'op' = 'close+update' THEN
      INSERT INTO public.location_import_revisions
        (batch_id, entity_type, action, entity_key, prev, post, created_by)
      VALUES (v_batch,'country','update',v_code,v_prev,public.country_export_row(v_code),v_uid);
    END IF;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'country','close',v_code,v_prev,public.country_export_row(v_code),v_uid);
  END LOOP;

  -- (7) root order, one statement per country ------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND (value->'fields') ? 'root_order' LOOP
    v_code := it->>'key';
    DELETE FROM public.country_root_order WHERE country_code = v_code;
    INSERT INTO public.country_root_order (country_code, category_id, position, created_by)
    SELECT v_code, c.id, s.ord, v_uid
      FROM jsonb_array_elements_text(it->'fields'->'root_order') WITH ORDINALITY AS s(slug, ord)
      JOIN public.categories c ON c.slug = s.slug;
  END LOOP;

  PERFORM public.log_audit('location.import.commit','locations',v_batch::text,
    jsonb_build_object('counts', v_plan->'counts', 'scope', p_scope, 'digest', p_digest));

  RETURN jsonb_build_object('batch_id', v_batch, 'counts', v_plan->'counts',
                            'refusals', '[]'::jsonb);
END $fn$;
REVOKE ALL ON FUNCTION public.admin_commit_location_import(jsonb, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_location_import(jsonb, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_commit_location_import(jsonb, jsonb, text, text) TO service_role;

-- admin_commit_attribute_import: live body (md5(prosrc) 6e14f510363ef8d7851cf372d085e0a6) whole; the only change: 1 call(s) public.admin_save_entity_translation( -> public.admin_save_entity_translation_core(.
CREATE OR REPLACE FUNCTION public.admin_commit_attribute_import(
  p_definitions jsonb, p_links jsonb, p_scope text DEFAULT NULL::text, p_digest text DEFAULT NULL::text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $m8c$
DECLARE
  v_plan    jsonb;
  v_batch   uuid := gen_random_uuid();
  v_item    jsonb;
  v_prev    jsonb;
  v_post    jsonb;
  v_id      uuid;
  v_order   int;
  v_applied int := 0;
  v_am      jsonb;
  v_dep     uuid;
  v_cells   jsonb;
  v_prevs   jsonb := '{}'::jsonb;   -- INC-196 — Pass A's before-states, per link id.
  -- M-MAINT-2 Part B — the two per-link cells, as the plan left them.
  v_alw     text[];
  v_dflt    jsonb;
  -- M-MAINT-3b — the third cell, as the plan left it.
  v_vw      jsonb;
BEGIN
  -- (1) GATES
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');

  IF NOT pg_try_advisory_xact_lock(hashtext('attribute-import'), hashtext(auth.uid()::text)) THEN
    RAISE EXCEPTION 'import already running';
  END IF;

  v_plan := public.attr_import_plan(p_definitions, p_links, p_scope);

  ------------------------------------------- PHASE 1 — DEFINITION UPSERTS
  -- DEC-045b — the planner ordered the definitions PARENT BEFORE DEPENDENT.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'definitions')
  LOOP
    CONTINUE WHEN v_item->>'change' IN ('none', 'delete');

    v_id := NULLIF(v_item->>'id','')::uuid;
    v_prev := NULL;
    IF v_id IS NOT NULL THEN
      SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                                'options',a.options,'help_text_en',a.help_text_en,
                                'unit',a.unit,'unit_am',a.unit_am,'min_bound',a.min_bound,'max_bound',a.max_bound,
                                'decimals',a.decimals,'format',a.format,'preset',a.preset,
                                'max_length',a.max_length,'help_text_am',a.help_text_am,
                                'depends_on',
                                COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''))
        INTO v_prev FROM public.attributes a WHERE a.id = v_id;
      v_am := NULL;
      SELECT jsonb_build_object('value', t.value, 'status', t.status, 'machine', t.machine)
        INTO v_am
        FROM public.entity_translations t
       WHERE t.entity_type = 'attribute' AND t.entity_id = v_id
         AND t.field = 'label' AND t.lang_code = 'am';
      v_prev := v_prev || jsonb_build_object('am_state', COALESCE(v_am, 'null'::jsonb));
    END IF;

    -- DEC-050 — every PRESENT v2 cell is applied; an ABSENT cell is left
    -- alone. INC-187's lesson: what the planner diffed, the commit applies.
    v_cells := COALESCE(v_item->'cells', '{}'::jsonb);

    IF v_id IS NULL THEN
      INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
      VALUES (v_item->>'key', v_item->>'name_en', v_item->>'attr_type',
              CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END)
      RETURNING id INTO v_id;

      IF v_cells <> '{}'::jsonb THEN
        UPDATE public.attributes a
           SET unit         = CASE WHEN v_cells ? 'unit'         THEN NULLIF(v_cells->>'unit','')         ELSE a.unit END,
               unit_am      = CASE WHEN v_cells ? 'unit_am'      THEN NULLIF(v_cells->>'unit_am','')      ELSE a.unit_am END,
               min_bound    = CASE WHEN v_cells ? 'min_bound'    THEN NULLIF(v_cells->>'min_bound','')    ELSE a.min_bound END,
               max_bound    = CASE WHEN v_cells ? 'max_bound'    THEN NULLIF(v_cells->>'max_bound','')    ELSE a.max_bound END,
               decimals     = CASE WHEN v_cells ? 'decimals'     THEN NULLIF(v_cells->>'decimals','')::smallint  ELSE a.decimals END,
               format       = CASE WHEN v_cells ? 'format'       THEN NULLIF(v_cells->>'format','')       ELSE a.format END,
               preset       = CASE WHEN v_cells ? 'preset'       THEN NULLIF(v_cells->>'preset','')       ELSE a.preset END,
               max_length   = CASE WHEN v_cells ? 'max_length'   THEN NULLIF(v_cells->>'max_length','')::integer ELSE a.max_length END,
               help_text_en = CASE WHEN v_cells ? 'help_text_en' THEN NULLIF(v_cells->>'help_text_en','') ELSE a.help_text_en END,
               help_text_am = CASE WHEN v_cells ? 'help_text_am' THEN NULLIF(v_cells->>'help_text_am','') ELSE a.help_text_am END,
               updated_at   = now()
         WHERE a.id = v_id;
      END IF;
    ELSE
      -- INC-200 — THE TYPE AND THE CELLS TRAVEL IN ONE STATEMENT. Both CHECKs
      -- (attributes_preset_check, attributes_max_length_check and their number
      -- siblings) fire per statement, so a type written BEFORE the cells it
      -- invalidates is refused mid-batch. The planner has already turned the
      -- inapplicable cells into CLEARS for a type change; here they are
      -- written together with the type, and never one statement apart.
      UPDATE public.attributes a
         SET name_en      = v_item->>'name_en',
             attr_type    = v_item->>'attr_type',
             options      = CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END,
             unit         = CASE WHEN v_cells ? 'unit'         THEN NULLIF(v_cells->>'unit','')         ELSE a.unit END,
             unit_am      = CASE WHEN v_cells ? 'unit_am'      THEN NULLIF(v_cells->>'unit_am','')      ELSE a.unit_am END,
             min_bound    = CASE WHEN v_cells ? 'min_bound'    THEN NULLIF(v_cells->>'min_bound','')    ELSE a.min_bound END,
             max_bound    = CASE WHEN v_cells ? 'max_bound'    THEN NULLIF(v_cells->>'max_bound','')    ELSE a.max_bound END,
             decimals     = CASE WHEN v_cells ? 'decimals'     THEN NULLIF(v_cells->>'decimals','')::smallint  ELSE a.decimals END,
             format       = CASE WHEN v_cells ? 'format'       THEN NULLIF(v_cells->>'format','')       ELSE a.format END,
             preset       = CASE WHEN v_cells ? 'preset'       THEN NULLIF(v_cells->>'preset','')       ELSE a.preset END,
             max_length   = CASE WHEN v_cells ? 'max_length'   THEN NULLIF(v_cells->>'max_length','')::integer ELSE a.max_length END,
             help_text_en = CASE WHEN v_cells ? 'help_text_en' THEN NULLIF(v_cells->>'help_text_en','') ELSE a.help_text_en END,
             help_text_am = CASE WHEN v_cells ? 'help_text_am' THEN NULLIF(v_cells->>'help_text_am','') ELSE a.help_text_am END,
             updated_at   = now()
       WHERE a.id = v_id;
    END IF;

    IF COALESCE((v_item->>'depends_col')::boolean, false) THEN
      SELECT p.id INTO v_dep FROM public.attributes p
       WHERE p.attr_key = NULLIF(btrim(COALESCE(v_item->>'depends_on','')), '');
      UPDATE public.attributes SET depends_on = v_dep, updated_at = now() WHERE id = v_id;
    END IF;

    IF btrim(COALESCE(v_item->>'label_am','')) <> '' THEN
      PERFORM public.admin_save_entity_translation_core('attribute', v_id, 'label', 'am',
                                                   btrim(v_item->>'label_am'));
    END IF;

    SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                              'options',a.options,'help_text_en',a.help_text_en,
                                'unit',a.unit,'unit_am',a.unit_am,'min_bound',a.min_bound,'max_bound',a.max_bound,
                                'decimals',a.decimals,'format',a.format,'preset',a.preset,
                                'max_length',a.max_length,'help_text_am',a.help_text_am,
                              'depends_on',
                              COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''))
      INTO v_post FROM public.attributes a WHERE a.id = v_id;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'definition', v_item->>'action', v_item->>'key', v_prev, v_post, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  --------------------------------- PHASE 2A — INC-196: CLEAR CHANGING RANKS
  -- The plan's link array is ordered by (origin_slug, attr_key), so a swap or
  -- a shift inside ONE category would otherwise write the incoming rank before
  -- the outgoing one is vacated. Pass A captures the BEFORE state of every
  -- change item and nulls ONLY the card_rank of those whose rank is moving —
  -- flags, display_order and the three per-link cells are untouched here and
  -- are written in Pass B.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'links')
  LOOP
    CONTINUE WHEN v_item->>'change' <> 'change';

    v_id := NULLIF(v_item->>'link_id','')::uuid;
    CONTINUE WHEN v_id IS NULL;

    v_prev := NULL;
    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank,'fact_rank',l.fact_rank,
                              'allowed_options',l.allowed_options,'default_value',l.default_value,
                              'visible_when',l.visible_when)
      INTO v_prev FROM public.category_attribute_links l WHERE l.id = v_id;
    CONTINUE WHEN v_prev IS NULL;

    v_prevs := v_prevs || jsonb_build_object(v_id::text, v_prev);

    IF (v_prev->>'card_rank') IS DISTINCT FROM NULLIF(v_item->>'card_rank','') THEN
      UPDATE public.category_attribute_links
         SET card_rank = NULL, updated_at = now()
       WHERE id = v_id;
    END IF;
    -- B19 M2 — the same vacating pass for a moving fact_rank, only when the
    -- file carries the cell (fact_set); a file without the column moves nothing.
    IF COALESCE((v_item->>'fact_set')::boolean, false)
       AND (v_prev->>'fact_rank') IS DISTINCT FROM NULLIF(v_item->>'fact_rank','') THEN
      UPDATE public.category_attribute_links
         SET fact_rank = NULL, updated_at = now()
       WHERE id = v_id;
    END IF;
  END LOOP;

  ------------------------------------------------ PHASE 3 — LINK UNLINKS
  -- Unchanged, and now BETWEEN the two passes: a rank freed by a deletion is
  -- available to the adds and final states written in Pass B.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'links')
  LOOP
    CONTINUE WHEN v_item->>'change' <> 'unlink';

    v_prev := NULL;
    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank,'fact_rank',l.fact_rank,
                              'allowed_options',l.allowed_options,'default_value',l.default_value,
                              'visible_when',l.visible_when)
      INTO v_prev FROM public.category_attribute_links l
     WHERE l.id = NULLIF(v_item->>'link_id','')::uuid;

    DELETE FROM public.category_attribute_links WHERE id = (v_item->>'link_id')::uuid;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'link', v_item->>'action',
            (v_item->>'slug') || '|' || (v_item->>'key'), v_prev, NULL, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  ------------------- PHASE 2B — INC-196: ADDS AND FINAL STATES (audit rows)
  -- One revision row per link, prev = the ORIGINAL before-state (Pass A's, when
  -- it ran), post = the FINAL after-state — exactly the shape
  -- admin_undo_attribute_import expects. M-MAINT-2 Part B: the per-link cells
  -- are written here, and only when the file CARRIED them. M-MAINT-3b: the
  -- condition joins them, under the same rule — a BLANK cell carried nothing,
  -- so the stored condition is left exactly as the console left it.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'links')
  LOOP
    CONTINUE WHEN v_item->>'change' IN ('none', 'unlink');

    v_id := NULLIF(v_item->>'attribute_id','')::uuid;
    IF v_id IS NULL THEN
      SELECT id INTO v_id FROM public.attributes WHERE attr_key = v_item->>'key';
    END IF;

    v_alw := CASE WHEN v_item->'allowed_options' IS NULL
                    OR v_item->'allowed_options' = 'null'::jsonb
                  THEN NULL
                  ELSE ARRAY(SELECT jsonb_array_elements_text(v_item->'allowed_options')) END;
    v_dflt := CASE WHEN v_item->'default_value' IS NULL
                     OR v_item->'default_value' = 'null'::jsonb
                   THEN NULL ELSE v_item->'default_value' END;
    v_vw := CASE WHEN v_item->'visible_when' IS NULL
                   OR v_item->'visible_when' = 'null'::jsonb
                 THEN NULL ELSE v_item->'visible_when' END;

    IF v_item->>'change' = 'add' THEN
      v_prev := NULL;
      -- M-ORDER — the file's own display_order wins on an ADD; with no cell
      -- the append rule stands (max + 1). The UPDATE path below already
      -- honours the plan's value and keeps the stored one when it is blank.
      v_order := NULLIF(v_item->>'display_order','')::int;
      IF v_order IS NULL THEN
        SELECT COALESCE(max(l.display_order), 0) + 1 INTO v_order
          FROM public.category_attribute_links l
         WHERE l.category_id = (v_item->>'category_id')::uuid;
      END IF;
      INSERT INTO public.category_attribute_links
        (category_id, attribute_id, is_required, is_filterable, display_order, card_rank,
         fact_rank, allowed_options, default_value, visible_when)
      VALUES ((v_item->>'category_id')::uuid, v_id,
              (v_item->>'is_required')::boolean, (v_item->>'is_filterable')::boolean,
              v_order, NULLIF(v_item->>'card_rank','')::int,
              NULLIF(v_item->>'fact_rank','')::smallint, v_alw, v_dflt, v_vw)
      RETURNING id INTO v_id;
    ELSE
      v_id := (v_item->>'link_id')::uuid;
      v_prev := v_prevs->(v_id::text);
      IF v_prev IS NULL THEN
        SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                                  'is_required',l.is_required,'is_filterable',l.is_filterable,
                                  'display_order',l.display_order,'card_rank',l.card_rank,'fact_rank',l.fact_rank,
                                  'allowed_options',l.allowed_options,'default_value',l.default_value,
                                  'visible_when',l.visible_when)
          INTO v_prev FROM public.category_attribute_links l WHERE l.id = v_id;
      END IF;
      UPDATE public.category_attribute_links l
         SET is_required = (v_item->>'is_required')::boolean,
             is_filterable = (v_item->>'is_filterable')::boolean,
             display_order = COALESCE(NULLIF(v_item->>'display_order','')::int, l.display_order),
             card_rank = NULLIF(v_item->>'card_rank','')::int,
             -- B19 M2 — the fact rank moves only when the file carries the cell.
             fact_rank = CASE WHEN COALESCE((v_item->>'fact_set')::boolean, false)
                              THEN NULLIF(v_item->>'fact_rank','')::smallint ELSE l.fact_rank END,
             allowed_options = CASE WHEN COALESCE((v_item->>'allowed_set')::boolean, false)
                                    THEN v_alw ELSE l.allowed_options END,
             default_value = CASE WHEN COALESCE((v_item->>'default_set')::boolean, false)
                                  THEN v_dflt ELSE l.default_value END,
             visible_when = CASE WHEN COALESCE((v_item->>'visible_when_set')::boolean, false)
                                 THEN v_vw ELSE l.visible_when END,
             updated_at = now()
       WHERE l.id = v_id;
    END IF;

    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank,'fact_rank',l.fact_rank,
                              'allowed_options',l.allowed_options,'default_value',l.default_value,
                              'visible_when',l.visible_when)
      INTO v_post FROM public.category_attribute_links l WHERE l.id = v_id;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'link', v_item->>'action',
            (v_item->>'slug') || '|' || (v_item->>'key'), v_prev, v_post, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  -------------------------------------------- PHASE 4 — DEFINITION DELETES
  -- IE-5 — last, so a link removed by the SAME FILE no longer holds it down.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'definitions')
  LOOP
    CONTINUE WHEN v_item->>'change' <> 'delete';

    v_id := NULLIF(v_item->>'id','')::uuid;
    CONTINUE WHEN v_id IS NULL;

    SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                              'options',a.options,'help_text_en',a.help_text_en,
                                'unit',a.unit,'unit_am',a.unit_am,'min_bound',a.min_bound,'max_bound',a.max_bound,
                                'decimals',a.decimals,'format',a.format,'preset',a.preset,
                                'max_length',a.max_length,'help_text_am',a.help_text_am,
                              'depends_on',
                              COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''))
      INTO v_prev FROM public.attributes a WHERE a.id = v_id;
    v_am := NULL;
    SELECT jsonb_build_object('value', t.value, 'status', t.status, 'machine', t.machine)
      INTO v_am
      FROM public.entity_translations t
     WHERE t.entity_type = 'attribute' AND t.entity_id = v_id
       AND t.field = 'label' AND t.lang_code = 'am';
    v_prev := v_prev || jsonb_build_object('am_state', COALESCE(v_am, 'null'::jsonb));

    DELETE FROM public.entity_translations
     WHERE entity_type = 'attribute' AND entity_id = v_id AND field = 'label';
    DELETE FROM public.attributes WHERE id = v_id;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'definition', v_item->>'action', v_item->>'key', v_prev, NULL, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  PERFORM public.log_audit('attribute.import', 'attributes', v_batch::text,
    jsonb_build_object('batch_id', v_batch, 'scope', p_scope, 'digest', p_digest,
                       'applied', v_applied, 'counts', v_plan->'counts'));

  RETURN jsonb_build_object('batch_id', v_batch, 'applied', v_applied,
                            'counts', v_plan->'counts', 'refusals', v_plan->'refusals');
END $m8c$;
REVOKE ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO service_role;

-- admin_undo_category_import: live body (md5(prosrc) c91e117b0dcc39cbd36b7caf42347aeb) whole; the only change: 1 call(s) public.admin_save_entity_translation( -> public.admin_save_entity_translation_core(.
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
  v_recreated boolean;
  v_link jsonb;
  v_lattr uuid;
  v_links_restored int := 0;
  v_links_skipped jsonb := '[]'::jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');

  IF NOT EXISTS (SELECT 1 FROM public.category_import_revisions r WHERE r.batch_id = p_batch) THEN
    RAISE EXCEPTION 'unknown import batch';
  END IF;

  -- INC-481 (M12) — the walk follows cat_import_undo_order: non-creations first,
  -- then creations from the fewest descendants up, so a created child is always
  -- removed before its created parent. Ordering by the random uuid id was not
  -- newest-first and let the delete door refuse a parent that still had a child.
  FOR v_rev IN SELECT r.* FROM public.category_import_revisions r
                 JOIN public.cat_import_undo_order(p_batch) o ON o.revision_id = r.id
                ORDER BY o.pos
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
      v_recreated := (v_id IS NULL);
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

      -- DEC-052 / DEC-067 — the three cells come back exactly as they stood.
      IF v_prev ? 'capabilities' OR v_prev ? 'default_price_period'
         OR v_prev ? 'price_period_locked' THEN
        UPDATE public.categories SET
          capabilities = CASE WHEN v_prev ? 'capabilities'
            THEN ARRAY(SELECT lower(btrim(x))
                         FROM unnest(string_to_array(COALESCE(v_prev->>'capabilities',''), '|')) x
                        WHERE btrim(x) <> '')
            ELSE capabilities END,
          default_price_period = COALESCE(NULLIF(v_prev->>'default_price_period',''),
                                          default_price_period),
          price_period_locked = CASE WHEN v_prev ? 'price_period_locked'
            THEN public.cat_bool(v_prev->>'price_period_locked', price_period_locked)
            ELSE price_period_locked END,
          updated_at = now()
         WHERE id = v_id;
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
        PERFORM public.admin_save_entity_translation_core('category', v_id, 'name', 'am',
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

      -- M8a A5 (INC-307) — a recreated category gets back the attribute links
      -- its delete captured; a link whose attribute is gone is skipped and named.
      -- Class rule: an undo restores every dependent row the delete removed, or
      -- says which it cannot.
      IF v_recreated THEN
        FOR v_link IN SELECT value FROM jsonb_array_elements(COALESCE(v_prev->'links', '[]'::jsonb))
        LOOP
          v_lattr := NULL;
          SELECT a.id INTO v_lattr FROM public.attributes a WHERE a.attr_key = v_link->>'attr_key';
          IF v_lattr IS NULL THEN
            v_links_skipped := v_links_skipped || jsonb_build_array(v_link->>'attr_key');
            CONTINUE;
          END IF;
          INSERT INTO public.category_attribute_links
            (category_id, attribute_id, is_required, is_filterable, is_searchable,
             display_order, card_rank, allowed_options, default_value, visible_when)
          VALUES
            (v_id, v_lattr,
             (v_link->>'is_required')::boolean,
             (v_link->>'is_filterable')::boolean,
             (v_link->>'is_searchable')::boolean,
             (v_link->>'display_order')::int,
             (v_link->>'card_rank')::int,
             CASE WHEN jsonb_typeof(v_link->'allowed_options') = 'array'
                  THEN ARRAY(SELECT jsonb_array_elements_text(v_link->'allowed_options')) END,
             CASE WHEN jsonb_typeof(v_link->'default_value') IN ('null') OR NOT (v_link ? 'default_value')
                  THEN NULL ELSE v_link->'default_value' END,
             CASE WHEN jsonb_typeof(v_link->'visible_when') IN ('null') OR NOT (v_link ? 'visible_when')
                  THEN NULL ELSE v_link->'visible_when' END);
          v_links_restored := v_links_restored + 1;
        END LOOP;
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
    SELECT array_agg(sib.child_id ORDER BY (NOT sib.is_primary), sib.rank, sib.display_order, sib.child_id)
      INTO v_ids
      FROM (SELECT p.child_id, p.display_order, p.is_primary,
                   COALESCE((SELECT (o->>'ord')::int
                               FROM jsonb_array_elements(v_ord) o
                              WHERE (o->>'id')::uuid = p.child_id
                                AND (o->>'parent')::uuid IS NOT DISTINCT FROM p.parent_id
                              LIMIT 1), p.display_order) AS rank
              FROM public.category_tree_pointers p
             WHERE p.parent_id IS NOT DISTINCT FROM v_par.parent_id) sib;
    IF v_ids IS NOT NULL THEN
      PERFORM public.admin_reorder_categories(v_par.parent_id, v_ids);
    END IF;
  END LOOP;

  PERFORM public.log_audit('category_import.undo', 'categories', p_batch::text,
    jsonb_build_object('restored', v_restored, 'links_restored', v_links_restored,
                       'links_skipped', v_links_skipped));

  RETURN jsonb_build_object('restored', v_restored,
                            'links_restored', v_links_restored,
                            'links_skipped', v_links_skipped);
END $function$;
REVOKE ALL ON FUNCTION public.admin_undo_category_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_category_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_category_import(uuid) TO service_role;

-- admin_undo_listing_edit: live body (md5(prosrc) 2c7f4f98e5f51b9f6456198918b0080b) whole; the only change: 1 call(s) public.admin_edit_listing( -> public.admin_edit_listing_core(.
CREATE OR REPLACE FUNCTION public.admin_undo_listing_edit(
  p_listing_id uuid, p_at timestamptz, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_row     public.listings%ROWTYPE;
  v_rev     public.listing_revisions%ROWTYPE;
  v_now     jsonb;
  v_key     text;
  v_changes jsonb := '{}'::jsonb;
  v_out     jsonb;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  -- A draft is the seller's private work: it is not found here (D136).
  IF NOT FOUND OR v_row.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;

  -- The listing's newest revision, in the order its History shows them.
  SELECT * INTO v_rev FROM public.listing_revisions r
   WHERE r.listing_id = p_listing_id
   ORDER BY r.created_at DESC, r.id DESC
   LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'nothing to undo';
  END IF;
  IF p_at IS NULL OR v_rev.created_at <> p_at THEN
    RAISE EXCEPTION 'the listing has changed since this edit';
  END IF;
  IF v_rev.kind <> 'edit' OR v_rev.actor IS NULL OR v_rev.actor = v_rev.seller_id
     OR jsonb_typeof(v_rev.before) IS DISTINCT FROM 'object' OR jsonb_typeof(v_rev.after) IS DISTINCT FROM 'object'
     -- An undo is not undone again: the admin edits the listing instead.
     OR EXISTS (SELECT 1 FROM public.seller_notices sn
                 WHERE sn.listing_id = p_listing_id AND sn.created_at = v_rev.created_at AND sn.reason = 'undo') THEN
    RAISE EXCEPTION 'nothing to undo';
  END IF;
  IF v_rev.after ? 'photos_removed' THEN
    RAISE EXCEPTION 'a photo removal is not undone';
  END IF;

  -- Every value the edit wrote must still be the listing's.
  v_now := to_jsonb(v_row);
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_rev.after) k LOOP
    IF (v_now->v_key) IS DISTINCT FROM (v_rev.after->v_key) THEN
      RAISE EXCEPTION 'the listing has changed since this edit';
    END IF;
  END LOOP;

  -- The edit's before-values for what an admin can change; the price's unit follows from them.
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_rev.before) k LOOP
    IF v_key IN ('title','description','category_id','attributes','price_mode','price_amount',
                 'price_currency','price_period','price_bp','price_negotiable') THEN
      v_changes := v_changes || jsonb_build_object(v_key, v_rev.before->v_key);
    END IF;
  END LOOP;
  IF v_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to undo';
  END IF;

  -- The same door as any admin edit: the same rules, one revision, one audit row and one seller notice.
  PERFORM set_config('app.listing_undo', 'on', true);
  v_out := public.admin_edit_listing_core(p_listing_id, v_changes, 'undo', p_note);
  PERFORM set_config('app.listing_undo', 'off', true);
  RETURN v_out;
END $$;
REVOKE ALL ON FUNCTION public.admin_undo_listing_edit(uuid, timestamp with time zone, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_listing_edit(uuid, timestamp with time zone, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_listing_edit(uuid, timestamp with time zone, text) TO service_role;

DO $proof$
DECLARE
  v_sig text; v_callee text; v_md5 text; v_acl text; v_oid oid;
  v_uid uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_base text; v_lang text;
  v_pre text := 'e2e-d1-m5b.' || substr(gen_random_uuid()::text, 1, 8) || '.';
  v_out jsonb; v_msg text;
BEGIN
  -- (1) each caller: the written body, the core as callee, no door call left, header and ACL unchanged.
  FOR v_sig, v_callee, v_md5, v_acl IN VALUES
    ('admin_import_translations(text, jsonb)', 'admin_save_translation', 'd9480129cde6ed8ccf23a4b8fb249d77', '{postgres=X/postgres,authenticated=X/postgres}'),
    ('admin_commit_category_import(jsonb, text, text)', 'admin_save_entity_translation', 'a161c8df3e24550d1962fd6a9430c7a8', '{postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}'),
    ('admin_commit_location_import(jsonb, jsonb, text, text)', 'admin_save_entity_translation', 'ff6537cbe59100921b3bc263a783db46', '{postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}'),
    ('admin_commit_attribute_import(jsonb, jsonb, text, text)', 'admin_save_entity_translation', 'd5d95e418ce4cec746a1bf10a0d33b2b', '{postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}'),
    ('admin_undo_category_import(uuid)', 'admin_save_entity_translation', '31d6df7d11b66a4ce09c1ec293630181', '{postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}'),
    ('admin_undo_listing_edit(uuid, timestamp with time zone, text)', 'admin_edit_listing', 'ca70dc4662e277b6040246a4c2428eae', '{postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}')
  LOOP
    v_oid := ('public.' || v_sig)::regprocedure;
    IF (SELECT md5(prosrc) FROM pg_proc WHERE oid = v_oid) <> v_md5 THEN
      RAISE EXCEPTION 'M5b proof (1): % body is not the one written', v_sig;
    END IF;
    IF (SELECT prosrc FROM pg_proc WHERE oid = v_oid) ~ ('public\.' || v_callee || '\(')
       OR position('public.' || v_callee || '_core(' IN (SELECT prosrc FROM pg_proc WHERE oid = v_oid)) = 0 THEN
      RAISE EXCEPTION 'M5b proof (1): % still calls the door', v_sig;
    END IF;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR proacl::text <> v_acl
          FROM pg_proc WHERE oid = v_oid) THEN
      RAISE EXCEPTION 'M5b proof (1): % header or ACL changed', v_sig;
    END IF;
  END LOOP;
  -- (1b) the cores stay owner-only.
  FOR v_oid IN SELECT p.oid FROM pg_proc p WHERE p.pronamespace = 'public'::regnamespace AND p.proname IN
      ('admin_save_translation_core', 'admin_save_entity_translation_core', 'admin_edit_listing_core') LOOP
    IF has_function_privilege('authenticated', v_oid, 'EXECUTE') OR has_function_privilege('service_role', v_oid, 'EXECUTE') THEN
      RAISE EXCEPTION 'M5b proof (1b): % is executable by a browser or service role', v_oid::regprocedure;
    END IF;
  END LOOP;

  -- (2) ruling 5: a 3-row translations import with staff_translation overridden to 1 completes all 3 rows,
  -- spends nothing on the door dial; the door itself then still answers once and refuses the next.
  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_uid, 'e2e-d1-m5b-' || v_uid || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_uid, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_session, v_uid, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_uid, 'd1-m5b-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_uid, 'staff_translation', 1);
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
    SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
    SELECT l.code INTO v_lang FROM public.languages l WHERE l.code <> v_base ORDER BY l.code LIMIT 1;
    INSERT INTO public.ui_translations (key, lang_code, value, status) VALUES
      (v_pre || 'a', v_base, 'A', 'approved'), (v_pre || 'b', v_base, 'B', 'approved'), (v_pre || 'c', v_base, 'C', 'approved');

    v_out := public.admin_import_translations(v_lang, jsonb_build_array(
      jsonb_build_object('key', v_pre || 'a', 'value', 'One'),
      jsonb_build_object('key', v_pre || 'b', 'value', 'Two'),
      jsonb_build_object('key', v_pre || 'c', 'value', 'Three')));
    IF (v_out->>'imported')::int <> 3
       OR (SELECT count(*) FROM public.ui_translations WHERE key LIKE v_pre || '%' AND lang_code = v_lang) <> 3
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_uid::text) <> 0 THEN
      RAISE EXCEPTION 'M5b proof (2): import answered %, the door dial window holds %', v_out,
        (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_uid::text);
    END IF;

    PERFORM public.admin_save_translation(v_pre || 'a', v_lang, 'Four');
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_save_translation(v_pre || 'b', v_lang, 'Five');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'rateLimited'
       OR (SELECT value FROM public.ui_translations WHERE key = v_pre || 'a' AND lang_code = v_lang) IS DISTINCT FROM 'Four'
       OR (SELECT value FROM public.ui_translations WHERE key = v_pre || 'b' AND lang_code = v_lang) IS DISTINCT FROM 'Two' THEN
      RAISE EXCEPTION 'M5b proof (2): the door after the import answered %', coalesce(v_msg, 'success');
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m5b-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m5b-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029060000');