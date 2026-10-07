-- e2e-areas: admin-categories
-- Bundle 7 turn 7b / M12 (INC-481): the category import undo walks children before parents.
-- Live beside file (ethio-prod, pg_proc, read before this file):
--   admin_undo_category_import(p_batch uuid) RETURNS jsonb; provolatile v; prosecdef t; proconfig {search_path=public};
--   md5(pg_get_functiondef) 04877ea826f7fd03986d5582e6a407f5 (11215 bytes) — the body below is that text with ONE statement changed (the loop's query).
--   cat_descendants(p_root uuid) RETURNS TABLE(id uuid); provolatile s; prosecdef f; counts the root itself and walks home and guest pointers.
-- UTC clock candidate 20261007080000; ledger candidate 20261007160000 (ledger max 20261007150000 + 1h); chosen 20261007160000.

-- ===== M12 a — the undo's order (helper, service only) =====
CREATE OR REPLACE FUNCTION public.cat_import_undo_order(p_batch uuid)
RETURNS TABLE(revision_id uuid, pos bigint)
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
  SELECT r.id AS revision_id,
         row_number() OVER (
           ORDER BY (r.action = 'create'),
                    CASE WHEN r.action = 'create'
                         THEN (SELECT count(*) FROM public.categories c
                                CROSS JOIN LATERAL public.cat_descendants(c.id) d
                               WHERE c.slug = r.entity_key)
                         ELSE 0 END,
                    r.entity_key, r.id) AS pos
    FROM public.category_import_revisions r
   WHERE r.batch_id = p_batch AND r.undone_at IS NULL
$function$;

REVOKE ALL ON FUNCTION public.cat_import_undo_order(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.cat_import_undo_order(uuid) TO service_role;

-- ===== M12 b — admin_undo_category_import redeclared whole =====
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

-- ===== M12 c — proof (scratch rows only, removed by the block) =====
DO $proof$
DECLARE
  v_tag text := 'e2e-mig-m12-' || substr(md5(random()::text), 1, 8);
  v_batch uuid := gen_random_uuid();
  v_actor uuid := gen_random_uuid();
  v_a uuid; v_b uuid; v_x uuid; v_c uuid; v_g uuid; v_y uuid;
  v_keys text[];
  v_n int;
  v_def text;
BEGIN
  INSERT INTO public.categories (slug, name_en) VALUES (v_tag || '-a', 'e2e-mig-m12-a') RETURNING id INTO v_a;
  INSERT INTO public.categories (slug, name_en) VALUES (v_tag || '-b', 'e2e-mig-m12-b') RETURNING id INTO v_b;
  INSERT INTO public.categories (slug, name_en) VALUES (v_tag || '-x', 'e2e-mig-m12-x') RETURNING id INTO v_x;
  INSERT INTO public.categories (slug, name_en) VALUES (v_tag || '-c', 'e2e-mig-m12-c') RETURNING id INTO v_c;
  INSERT INTO public.categories (slug, name_en) VALUES (v_tag || '-g', 'e2e-mig-m12-g') RETURNING id INTO v_g;
  INSERT INTO public.categories (slug, name_en) VALUES (v_tag || '-y', 'e2e-mig-m12-y') RETURNING id INTO v_y;
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES
    (NULL, v_a, 2000000), (v_a, v_b, 0), (v_b, v_x, 0), (v_a, v_c, 1), (v_c, v_g, 0), (v_a, v_y, 2);
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order, is_primary)
    VALUES (v_x, v_c, 0, false);

  INSERT INTO public.category_import_revisions (batch_id, action, entity_key, created_by) VALUES
    (v_batch, 'create', v_tag || '-x', v_actor),
    (v_batch, 'create', v_tag || '-c', v_actor),
    (v_batch, 'create', v_tag || '-g', v_actor),
    (v_batch, 'create', v_tag || '-none', v_actor),
    (v_batch, 'update', v_tag || '-y', v_actor),
    (v_batch, 'retire', v_tag || '-a', v_actor);

  SELECT array_agg(r.entity_key || ':' || r.action ORDER BY o.pos) INTO v_keys
    FROM public.cat_import_undo_order(v_batch) o
    JOIN public.category_import_revisions r ON r.id = o.revision_id;
  IF cardinality(v_keys) IS DISTINCT FROM 6 THEN
    RAISE EXCEPTION 'M12 proof: helper returned % rows, expected 6', cardinality(v_keys);
  END IF;
  IF v_keys IS DISTINCT FROM ARRAY[
       v_tag || '-a:retire', v_tag || '-y:update', v_tag || '-none:create',
       v_tag || '-g:create', v_tag || '-c:create', v_tag || '-x:create'] THEN
    RAISE EXCEPTION 'M12 proof: wrong order %', v_keys;
  END IF;

  UPDATE public.category_import_revisions SET undone_at = now()
   WHERE batch_id = v_batch AND entity_key = v_tag || '-y';
  SELECT count(*) INTO v_n FROM public.cat_import_undo_order(v_batch);
  IF v_n <> 5 THEN
    RAISE EXCEPTION 'M12 proof: after one undone row the helper returned %, expected 5', v_n;
  END IF;

  v_def := pg_get_functiondef('public.admin_undo_category_import(uuid)'::regprocedure);
  IF position('cat_import_undo_order' IN v_def) = 0 THEN
    RAISE EXCEPTION 'M12 proof: the undo does not name cat_import_undo_order';
  END IF;
  IF position('ORDER BY r.id DESC' IN v_def) > 0 THEN
    RAISE EXCEPTION 'M12 proof: the undo still holds ORDER BY r.id DESC';
  END IF;
  IF has_function_privilege('anon', 'public.cat_import_undo_order(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.cat_import_undo_order(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'M12 proof: a browser role can execute cat_import_undo_order';
  END IF;

  DELETE FROM public.category_import_revisions WHERE batch_id = v_batch;
  DELETE FROM public.category_tree_pointers
   WHERE child_id IN (v_a, v_b, v_x, v_c, v_g, v_y);
  DELETE FROM public.categories WHERE slug LIKE 'e2e-mig-m12-%' AND id IN (v_a, v_b, v_x, v_c, v_g, v_y);
  SELECT count(*) INTO v_n FROM public.categories WHERE slug LIKE 'e2e-mig-m12-%';
  IF v_n <> 0 THEN
    RAISE EXCEPTION 'M12 proof: % scratch categories left', v_n;
  END IF;
  SELECT count(*) INTO v_n FROM public.category_import_revisions WHERE batch_id = v_batch;
  IF v_n <> 0 THEN
    RAISE EXCEPTION 'M12 proof: % scratch revisions left', v_n;
  END IF;
END $proof$;
INSERT INTO public.migration_marks (version) VALUES ('20261007160000') ON CONFLICT (version) DO NOTHING;