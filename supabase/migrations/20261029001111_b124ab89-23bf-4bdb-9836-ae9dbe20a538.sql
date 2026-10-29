-- Foundations turn D1, M6a — INC-951 part 3c, the boundary/core split for the three staff_config doors the
-- category import commit and undo call per row (ruling, stop 10, item 2; stop 7's boundary/core ruling).
--   * public.<door>_core: the door's live body (ethio-prod, md5(prosrc) named per core) byte for byte, the same
--     arguments and return type; plpgsql, SECURITY INVOKER, search_path public; no gate; REVOKE ALL FROM
--     PUBLIC, anon, authenticated, service_role (only the owner and the DEFINER functions it owns run it).
--   * public.<door>: name, header and grants unchanged; its body is its own authority checks in today's order
--     (permission, step-up), then the staff_config rate_gate line, then RETURN/PERFORM of the core.
--   * admin_commit_category_import and admin_undo_category_import: their live bodies whole; the only change is
--     the callee names <door>( -> <door>_core( for these three doors.
-- The dial: staff_config 600 / 3600 (src/lib/dials.ts staffConfig, countedBy "door"); M6b gates the other 22.
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('staff_config', 600, 3600);

-- admin_add_category_pointer_core: the live body of admin_add_category_pointer byte for byte (md5(prosrc) 73ea122d818f3dc2d88cf213a5542c42); no gate.
CREATE FUNCTION public.admin_add_category_pointer_core(p_parent_id uuid, p_child_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE v_id uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  PERFORM public.assert_parent_not_catchall(p_parent_id);

  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (p_parent_id, p_child_id,
          COALESCE((SELECT max(display_order) + 1 FROM public.category_tree_pointers p
                     WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id), 0))
  RETURNING id INTO v_id;

  PERFORM public.log_audit('category.pointer_add', 'category_tree_pointers', v_id::text,
    jsonb_build_object('parent_id', p_parent_id, 'child_id', p_child_id));
  RETURN v_id;
END $function$;
REVOKE ALL ON FUNCTION public.admin_add_category_pointer_core(uuid, uuid) FROM PUBLIC, anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_add_category_pointer(p_parent_id uuid, p_child_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');
  -- INC-951 3c (D1 M6a) — the door's authority, then its dial (staff_config), then the shared core.
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  RETURN public.admin_add_category_pointer_core(p_parent_id, p_child_id);
END $function$;
REVOKE ALL ON FUNCTION public.admin_add_category_pointer(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_add_category_pointer(uuid, uuid) TO authenticated, service_role;

-- admin_create_category_core: the live body of admin_create_category byte for byte (md5(prosrc) c07851c720fb9a0da28fac81e25bf88a); no gate.
CREATE FUNCTION public.admin_create_category_core(p_name_en text, p_slug text DEFAULT NULL::text, p_icon text DEFAULT NULL::text, p_parent_id uuid DEFAULT NULL::uuid, p_allow_listings boolean DEFAULT true, p_price_enabled boolean DEFAULT true, p_expiry_days integer DEFAULT NULL::integer, p_visible_from timestamp with time zone DEFAULT NULL::timestamp with time zone, p_visible_until timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_id uuid;
  v_slug text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'create') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'create');

  PERFORM public.assert_parent_not_catchall(p_parent_id);

  IF p_slug IS NULL OR btrim(p_slug) = '' THEN
    v_slug := public.category_slug_candidate(p_name_en);
  ELSE
    v_slug := lower(btrim(p_slug));
    IF EXISTS (SELECT 1 FROM public.categories c WHERE c.slug = v_slug) THEN
      RAISE EXCEPTION 'admin.categories.error.slugTaken';
    END IF;
  END IF;

  INSERT INTO public.categories (name_en, slug, icon, allow_listings,
                                 price_enabled, expiry_days,
                                 visible_from, visible_until)
  VALUES (p_name_en, v_slug, p_icon, COALESCE(p_allow_listings, true),
          COALESCE(p_price_enabled, true), p_expiry_days,
          p_visible_from, p_visible_until)
  RETURNING id INTO v_id;

  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (p_parent_id, v_id,
          COALESCE((SELECT max(display_order) + 1 FROM public.category_tree_pointers p
                     WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id), 0));

  PERFORM public.log_audit('category.create', 'categories', v_id::text,
    jsonb_build_object('name_en', p_name_en, 'slug', v_slug,
                       'parent_id', p_parent_id, 'allow_listings', p_allow_listings,
                       'price_enabled', p_price_enabled, 'expiry_days', p_expiry_days,
                       'visible_from', p_visible_from, 'visible_until', p_visible_until));
  RETURN v_id;
END $function$;
REVOKE ALL ON FUNCTION public.admin_create_category_core(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone) FROM PUBLIC, anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_create_category(p_name_en text, p_slug text DEFAULT NULL::text, p_icon text DEFAULT NULL::text, p_parent_id uuid DEFAULT NULL::uuid, p_allow_listings boolean DEFAULT true, p_price_enabled boolean DEFAULT true, p_expiry_days integer DEFAULT NULL::integer, p_visible_from timestamp with time zone DEFAULT NULL::timestamp with time zone, p_visible_until timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'create') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'create');
  -- INC-951 3c (D1 M6a) — the door's authority, then its dial (staff_config), then the shared core.
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  RETURN public.admin_create_category_core(p_name_en, p_slug, p_icon, p_parent_id, p_allow_listings, p_price_enabled, p_expiry_days, p_visible_from, p_visible_until);
END $function$;
REVOKE ALL ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone) TO authenticated, service_role;

-- admin_set_country_exclusions_core: the live body of admin_set_country_exclusions byte for byte (md5(prosrc) 2ab9bf2f2876bbd4d6f2ce5ea69d11e3); no gate.
CREATE FUNCTION public.admin_set_country_exclusions_core(p_id uuid, p_country_codes text[])
 RETURNS void
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE v_old text[]; v_new text[];
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  IF NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_id) THEN
    RAISE EXCEPTION 'category not found';
  END IF;

  SELECT COALESCE(array_agg(x.country_code ORDER BY x.country_code), '{}')
    INTO v_old FROM public.category_country_exclusions x WHERE x.category_id = p_id;

  v_new := COALESCE(p_country_codes, '{}');

  DELETE FROM public.category_country_exclusions x
   WHERE x.category_id = p_id AND NOT (x.country_code = ANY (v_new));

  INSERT INTO public.category_country_exclusions (category_id, country_code, created_by)
  SELECT p_id, code, auth.uid() FROM unnest(v_new) AS code
  ON CONFLICT DO NOTHING;

  PERFORM public.log_audit('category.set_exclusions', 'categories', p_id::text,
    jsonb_build_object('old', to_jsonb(v_old), 'new', to_jsonb(v_new)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_set_country_exclusions_core(uuid, text[]) FROM PUBLIC, anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_set_country_exclusions(p_id uuid, p_country_codes text[])
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');
  -- INC-951 3c (D1 M6a) — the door's authority, then its dial (staff_config), then the shared core.
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  PERFORM public.admin_set_country_exclusions_core(p_id, p_country_codes);
END $function$;
REVOKE ALL ON FUNCTION public.admin_set_country_exclusions(uuid, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_country_exclusions(uuid, text[]) TO authenticated;

-- admin_commit_category_import: live body (md5(prosrc) a161c8df3e24550d1962fd6a9430c7a8) whole; the only change: 5 call(s) to the three doors -> their _core.
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

      v_id := public.admin_create_category_core(
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
        PERFORM public.admin_set_country_exclusions_core(v_id,
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
          PERFORM public.admin_add_category_pointer_core(v_spid, v_id);
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
      PERFORM public.admin_set_country_exclusions_core(v_id,
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
      PERFORM public.admin_add_category_pointer_core(c.id, v_id)
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

-- admin_undo_category_import: live body (md5(prosrc) 31d6df7d11b66a4ce09c1ec293630181) whole; the only change: 3 call(s) to the three doors -> their _core.
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
        v_id := public.admin_create_category_core(
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

      PERFORM public.admin_set_country_exclusions_core(v_id,
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
      PERFORM public.admin_add_category_pointer_core(c.id, v_id)
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

DO $proof$
DECLARE
  v_fn text; v_types text; v_md5 text; v_door_md5 text; v_acl text; v_oid oid; v_core oid; v_src text;
  v_uid uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_tag text := 'e2e-d1-m6a-' || substr(gen_random_uuid()::text, 1, 8);
  v_out jsonb; v_msg text; v_id uuid;
BEGIN
  -- (1) each core is the live body, INVOKER, owner-only; each door is checks, gate, core, with its ACL.
  FOR v_fn, v_types, v_md5, v_door_md5, v_acl IN VALUES
    ('admin_add_category_pointer', 'uuid, uuid', '73ea122d818f3dc2d88cf213a5542c42', '438b205a914020e03f3951f27d4f76db', '{postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}'),
    ('admin_create_category', 'text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone', 'c07851c720fb9a0da28fac81e25bf88a', 'acd25c60bb2f04cba651d32cb67d8346', '{postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}'),
    ('admin_set_country_exclusions', 'uuid, text[]', '2ab9bf2f2876bbd4d6f2ce5ea69d11e3', '8a9c85ddec5d1e146d781824a9ddb379', '{postgres=X/postgres,authenticated=X/postgres}')
  LOOP
    v_core := ('public.' || v_fn || '_core(' || v_types || ')')::regprocedure;
    v_oid := ('public.' || v_fn || '(' || v_types || ')')::regprocedure;
    IF (SELECT md5(prosrc) FROM pg_proc WHERE oid = v_core) <> v_md5
       OR (SELECT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_core)
       OR has_function_privilege('anon', v_core, 'EXECUTE')
       OR has_function_privilege('authenticated', v_core, 'EXECUTE')
       OR has_function_privilege('service_role', v_core, 'EXECUTE') THEN
      RAISE EXCEPTION 'M6a proof (1): % core differs', v_fn;
    END IF;
    SELECT prosrc INTO v_src FROM pg_proc WHERE oid = v_oid;
    IF md5(v_src) <> v_door_md5
       OR position('rate_gate(''staff_config'')' IN v_src) = 0
       OR position(v_fn || '_core(' IN v_src) < position('rate_gate(' IN v_src)
       OR v_src ~ '(INSERT INTO|UPDATE public\.|DELETE FROM)'
       OR (SELECT NOT prosecdef OR proconfig::text <> '{search_path=public}' OR proacl::text <> v_acl FROM pg_proc WHERE oid = v_oid) THEN
      RAISE EXCEPTION 'M6a proof (1): % door is not checks, gate, core (or its header/ACL changed)', v_fn;
    END IF;
  END LOOP;
  -- (1b) the two bulk callers: the written body, no door call left.
  FOR v_fn, v_md5 IN VALUES
    ('admin_commit_category_import(jsonb, text, text)', '7c2eb7f578e6563202030ef98395edbc'),
    ('admin_undo_category_import(uuid)', '47e09d29028884df55c32f4d5ccc48cf')
  LOOP
    SELECT prosrc INTO v_src FROM pg_proc WHERE oid = ('public.' || v_fn)::regprocedure;
    IF md5(v_src) <> v_md5
       OR v_src ~ 'public\.(admin_add_category_pointer|admin_create_category|admin_set_country_exclusions)\(' THEN
      RAISE EXCEPTION 'M6a proof (1b): % still calls a gated door', v_fn;
    END IF;
  END LOOP;

  -- (2) behaviour, staff_config overridden to 1: a 2-row category import creates both rows and spends nothing;
  -- then a direct create answers once and the next is refused with no row written.
  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_uid, 'e2e-d1-m6a-' || v_uid || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_uid, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_session, v_uid, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_uid, 'd1-m6a-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_uid, 'staff_config', 1);
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    v_out := public.admin_commit_category_import(jsonb_build_array(
      jsonb_build_object('row', 1, 'action', 'create-root', 'category_slug', v_tag || '-r', 'parent_slug', '',
                         'name_en', 'E2E D1 M6a Root'),
      jsonb_build_object('row', 2, 'action', 'upsert', 'category_slug', v_tag || '-c', 'parent_slug', v_tag || '-r',
                         'name_en', 'E2E D1 M6a Child')), NULL, 'm6a');
    IF (SELECT count(*) FROM public.categories WHERE slug LIKE v_tag || '-%') <> 2
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_uid::text) <> 0 THEN
      RAISE EXCEPTION 'M6a proof (2): import answered %, rows %, window %', v_out,
        (SELECT count(*) FROM public.categories WHERE slug LIKE v_tag || '-%'),
        (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_uid::text);
    END IF;

    v_id := public.admin_create_category('E2E D1 M6a One', v_tag || '-one');
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_create_category('E2E D1 M6a Two', v_tag || '-two');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_id IS NULL OR v_msg IS DISTINCT FROM 'rateLimited'
       OR EXISTS (SELECT 1 FROM public.categories WHERE slug = v_tag || '-two') THEN
      RAISE EXCEPTION 'M6a proof (2): the door after the import answered %', coalesce(v_msg, 'success');
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m6a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m6a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029070000');