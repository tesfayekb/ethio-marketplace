-- M8c — bundle 5 Part C, door side (C5): the Amharic unit cell travels.
-- e2e-areas: admin-attributes, posting
-- Each function is redeclared WHOLE from the live definition (INC-183):
-- attr_export_payload projects unit_am after unit; admin_commit_attribute_import
-- writes unit_am as it writes unit and captures it in every revision row that
-- captures unit; admin_undo_attribute_import restores it from those rows (named
-- here because the brief's undo proof needs it); get_posting_schema projects
-- unit_am beside unit; admin_upsert_attribute takes p_unit_am after p_unit
-- (argument-list change: old signature dropped; NULL keeps the stored value so
-- a caller that does not send it never drops it, INC-188; '' clears);
-- admin_list_attributes projects unit_am (return shape change: dropped, re-created).

CREATE OR REPLACE FUNCTION public.attr_export_payload(p_scope_slug text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $m8c$
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

  -- INH-1: both walks follow the PRIMARY lineage only.
  WITH RECURSIVE scope AS (
    SELECT v_scope AS id, 0 AS d
    UNION ALL
    SELECT c.id, s.d + 1
      FROM scope s
      JOIN public.categories c ON public.cat_primary_parent(c.id) = s.id
     WHERE s.d < 10
  ),
  anc AS (
    SELECT c.id AS cat_id, c.id AS src_id, 0 AS depth
      FROM public.categories c
    UNION ALL
    SELECT a.cat_id, public.cat_primary_parent(a.src_id), a.depth + 1
      FROM anc a
     WHERE a.depth < 10
       AND public.cat_primary_parent(a.src_id) IS NOT NULL
  ),
  pathq AS (
    SELECT c.id, c.id AS cur, c.name_en::text AS path, 0 AS d
      FROM public.categories c
    UNION ALL
    -- INC-306 / DEC-080 — the home is the one home reader's verdict; the walk
    -- stops where it answers NULL (a root).
    SELECT q.id, pp.parent_id, cp.name_en || ' / ' || q.path, q.d + 1
      FROM pathq q
      JOIN LATERAL (
             SELECT public.cat_primary_parent(q.cur) AS parent_id
           ) pp ON pp.parent_id IS NOT NULL
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
           -- M-MAINT-2 Part B — the two per-link cells travel with the link.
           l.allowed_options,
           l.default_value,
           -- M-MAINT-3b — and the D24 condition.
           l.visible_when,
           -- M-ORDER — the link's own display_order travels with it.
           l.display_order,
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
               'origin', COALESCE(eff.origin, ''),
               -- the two new cells, AFTER the existing ones (round-trip shape)
               'allowed_options', COALESCE(array_to_string(eff.allowed_options, '|'), ''),
               'default_value', COALESCE(
                 CASE WHEN eff.default_value IS NULL THEN NULL
                      WHEN jsonb_typeof(eff.default_value) = 'array'
                        THEN (SELECT string_agg(t.v, '|')
                                FROM jsonb_array_elements_text(eff.default_value) AS t(v))
                      ELSE eff.default_value #>> '{}' END,
                 ''),
               -- M-MAINT-3b — the condition, AFTER default_value, as
               -- '<sibling key>=<value>|<value>…'. NULL → '' (a blank cell
               -- changes nothing on re-import, so the export round-trips).
               'visible_when', COALESCE(
                 CASE WHEN eff.visible_when IS NULL
                        OR jsonb_typeof(eff.visible_when) = 'null' THEN NULL
                      ELSE (eff.visible_when->>'key') || '='
                           || (SELECT string_agg(t.v, '|')
                                 FROM jsonb_array_elements_text(eff.visible_when->'in') AS t(v))
                           -- M6 / INC-381 — the second pair as '&<key>=<value>|…'.
                           || CASE WHEN jsonb_typeof(eff.visible_when->'and') = 'object'
                                   THEN '&' || (eff.visible_when->'and'->>'key') || '='
                                        || (SELECT string_agg(t.v, '|')
                                              FROM jsonb_array_elements_text(eff.visible_when->'and'->'in') AS t(v))
                                   ELSE '' END
                 END,
                 ''),
               -- M-ORDER — display_order, AFTER visible_when, plain text.
               'display_order', COALESCE(eff.display_order::text, '')
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
               'depends_on', COALESCE(
                 (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''),
               -- DEC-050 L2b-mig — the nine v2 cells, plain text, NULL → ''.
               'unit', COALESCE(a.unit, ''),
               -- M8c / C5 — the Amharic unit, after unit.
               'unit_am', COALESCE(a.unit_am, ''),
               'min', COALESCE(a.min_bound, ''),
               'max', COALESCE(a.max_bound, ''),
               'decimals', COALESCE(a.decimals::text, ''),
               'format', COALESCE(a.format, ''),
               'preset', COALESCE(a.preset, ''),
               'max_length', COALESCE(a.max_length::text, ''),
               'help_text_en', COALESCE(a.help_text_en, ''),
               'help_text_am', COALESCE(a.help_text_am, ''),
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
END $m8c$;
REVOKE ALL ON FUNCTION public.attr_export_payload(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_export_payload(text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_export_payload(text) TO service_role;

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
      PERFORM public.admin_save_entity_translation('attribute', v_id, 'label', 'am',
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
                              'display_order',l.display_order,'card_rank',l.card_rank,
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
                              'display_order',l.display_order,'card_rank',l.card_rank,
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
         allowed_options, default_value, visible_when)
      VALUES ((v_item->>'category_id')::uuid, v_id,
              (v_item->>'is_required')::boolean, (v_item->>'is_filterable')::boolean,
              v_order, NULLIF(v_item->>'card_rank','')::int,
              v_alw, v_dflt, v_vw)
      RETURNING id INTO v_id;
    ELSE
      v_id := (v_item->>'link_id')::uuid;
      v_prev := v_prevs->(v_id::text);
      IF v_prev IS NULL THEN
        SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                                  'is_required',l.is_required,'is_filterable',l.is_filterable,
                                  'display_order',l.display_order,'card_rank',l.card_rank,
                                  'allowed_options',l.allowed_options,'default_value',l.default_value,
                                  'visible_when',l.visible_when)
          INTO v_prev FROM public.category_attribute_links l WHERE l.id = v_id;
      END IF;
      UPDATE public.category_attribute_links l
         SET is_required = (v_item->>'is_required')::boolean,
             is_filterable = (v_item->>'is_filterable')::boolean,
             display_order = COALESCE(NULLIF(v_item->>'display_order','')::int, l.display_order),
             card_rank = NULLIF(v_item->>'card_rank','')::int,
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
                              'display_order',l.display_order,'card_rank',l.card_rank,
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

CREATE OR REPLACE FUNCTION public.admin_undo_attribute_import(p_batch uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $m8c$
DECLARE
  v_rev        record;
  v_restored   int := 0;
  v_conflicted int := 0;
  v_slug       text;
  v_key        text;
  v_attr       uuid;
  v_cat        uuid;
  v_exists     boolean;
  v_am         jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');
  IF p_batch IS NULL THEN
    RAISE EXCEPTION 'batch id required';
  END IF;

  PERFORM 1 FROM public.attribute_import_revisions WHERE batch_id = p_batch LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown import batch';
  END IF;

  -- DEC-045b — a parent and its dependent can both be CREATIONS of this batch.
  UPDATE public.attributes a
     SET depends_on = NULL
   WHERE a.depends_on IS NOT NULL
     AND a.attr_key IN (SELECT r.entity_key FROM public.attribute_import_revisions r
                         WHERE r.batch_id = p_batch AND r.kind = 'definition'
                           AND r.prev IS NULL AND r.undone_at IS NULL);

  -- LINK PASS A (INC-197) — every rank this undo is about to change is cleared
  -- FIRST, so no restore ever meets a rank still held by another link of the
  -- same category. A changed link whose prev rank differs from its current one
  -- is cleared; an added link about to be deleted is cleared too (its rank can
  -- be the very rank a changed link is going back to).
  FOR v_rev IN
    SELECT * FROM public.attribute_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL AND kind = 'link'
     ORDER BY created_at DESC
  LOOP
    v_slug := split_part(v_rev.entity_key, '|', 1);
    v_key := split_part(v_rev.entity_key, '|', 2);
    SELECT id INTO v_cat FROM public.categories WHERE slug = v_slug;
    SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_key;
    CONTINUE WHEN v_cat IS NULL OR v_attr IS NULL;

    IF v_rev.prev IS NULL THEN
      UPDATE public.category_attribute_links
         SET card_rank = NULL, updated_at = now()
       WHERE category_id = v_cat AND attribute_id = v_attr
         AND card_rank IS NOT NULL;
    ELSE
      UPDATE public.category_attribute_links
         SET card_rank = NULL, updated_at = now()
       WHERE category_id = v_cat AND attribute_id = v_attr
         AND card_rank IS NOT NULL
         AND card_rank IS DISTINCT FROM NULLIF(v_rev.prev->>'card_rank', '')::int;
    END IF;
  END LOOP;

  -- LINK DELETES (INC-197) — the links this batch ADDED go before anything is
  -- restored, exactly as the commit's unlinks sit between its two passes.
  FOR v_rev IN
    SELECT * FROM public.attribute_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL AND kind = 'link'
       AND prev IS NULL
     ORDER BY created_at DESC
  LOOP
    v_slug := split_part(v_rev.entity_key, '|', 1);
    v_key := split_part(v_rev.entity_key, '|', 2);
    SELECT id INTO v_cat FROM public.categories WHERE slug = v_slug;
    SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_key;
    IF v_cat IS NULL OR v_attr IS NULL THEN
      v_conflicted := v_conflicted + 1;
      CONTINUE;
    END IF;

    DELETE FROM public.category_attribute_links
     WHERE category_id = v_cat AND attribute_id = v_attr;

    UPDATE public.attribute_import_revisions SET undone_at = now() WHERE id = v_rev.id;
    v_restored := v_restored + 1;
  END LOOP;

  FOR v_rev IN
    SELECT * FROM public.attribute_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL
     ORDER BY CASE
                WHEN kind = 'definition' AND prev IS NOT NULL AND post IS NULL THEN 0
                WHEN kind = 'link' THEN 1
                ELSE 2
              END ASC,
              created_at DESC
  LOOP
    IF v_rev.kind = 'definition' THEN
      IF v_rev.prev IS NULL THEN
        IF EXISTS (SELECT 1 FROM public.category_attribute_links l
                     JOIN public.attributes a ON a.id = l.attribute_id
                    WHERE a.attr_key = v_rev.entity_key) THEN
          v_conflicted := v_conflicted + 1;
          CONTINUE;
        END IF;
        SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_rev.entity_key;
        IF v_attr IS NOT NULL AND EXISTS (
          SELECT 1 FROM public.attributes d WHERE d.depends_on = v_attr
        ) THEN
          v_conflicted := v_conflicted + 1;
          CONTINUE;
        END IF;
        IF v_attr IS NOT NULL THEN
          DELETE FROM public.entity_translations
           WHERE entity_type = 'attribute' AND entity_id = v_attr AND field = 'label';
          PERFORM public.log_audit('entity_translation.undo_remove', 'attributes', v_attr::text,
            jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'label'));
        END IF;
        DELETE FROM public.attributes WHERE attr_key = v_rev.entity_key;
      ELSE
        SELECT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key = v_rev.entity_key) INTO v_exists;
        IF v_exists THEN
          UPDATE public.attributes
             SET name_en = v_rev.prev->>'name_en',
                 attr_type = v_rev.prev->>'attr_type',
                 options = CASE WHEN v_rev.prev->'options' = 'null'::jsonb THEN NULL ELSE v_rev.prev->'options' END,
                 depends_on = (SELECT p.id FROM public.attributes p
                                WHERE p.attr_key = NULLIF(btrim(COALESCE(v_rev.prev->>'depends_on','')), '')),
                 -- DEC-050 — the v2 cells come back exactly as they were.
                 unit         = CASE WHEN v_rev.prev ? 'unit'         THEN v_rev.prev->>'unit'         ELSE unit END,
                 unit_am      = CASE WHEN v_rev.prev ? 'unit_am'      THEN v_rev.prev->>'unit_am'      ELSE unit_am END,
                 min_bound    = CASE WHEN v_rev.prev ? 'min_bound'    THEN v_rev.prev->>'min_bound'    ELSE min_bound END,
                 max_bound    = CASE WHEN v_rev.prev ? 'max_bound'    THEN v_rev.prev->>'max_bound'    ELSE max_bound END,
                 decimals     = CASE WHEN v_rev.prev ? 'decimals'     THEN (v_rev.prev->>'decimals')::smallint  ELSE decimals END,
                 format       = CASE WHEN v_rev.prev ? 'format'       THEN v_rev.prev->>'format'       ELSE format END,
                 preset       = CASE WHEN v_rev.prev ? 'preset'       THEN v_rev.prev->>'preset'       ELSE preset END,
                 max_length   = CASE WHEN v_rev.prev ? 'max_length'   THEN (v_rev.prev->>'max_length')::integer ELSE max_length END,
                 help_text_en = CASE WHEN v_rev.prev ? 'help_text_en' THEN v_rev.prev->>'help_text_en' ELSE help_text_en END,
                 help_text_am = CASE WHEN v_rev.prev ? 'help_text_am' THEN v_rev.prev->>'help_text_am' ELSE help_text_am END,
                 updated_at = now()
           WHERE attr_key = v_rev.entity_key;
        ELSE
          INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en, depends_on,
                                         unit, min_bound, max_bound, decimals, format, preset,
                                         max_length, help_text_am, unit_am)
          VALUES (v_rev.prev->>'attr_key', v_rev.prev->>'name_en', v_rev.prev->>'attr_type',
                  CASE WHEN v_rev.prev->'options' = 'null'::jsonb THEN NULL ELSE v_rev.prev->'options' END,
                  v_rev.prev->>'help_text_en',
                  (SELECT p.id FROM public.attributes p
                    WHERE p.attr_key = NULLIF(btrim(COALESCE(v_rev.prev->>'depends_on','')), '')),
                  v_rev.prev->>'unit', v_rev.prev->>'min_bound', v_rev.prev->>'max_bound',
                  (v_rev.prev->>'decimals')::smallint, v_rev.prev->>'format', v_rev.prev->>'preset',
                  (v_rev.prev->>'max_length')::integer, v_rev.prev->>'help_text_am',
                  v_rev.prev->>'unit_am');
        END IF;

        SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_rev.entity_key;
        v_am := v_rev.prev->'am_state';
        IF v_attr IS NOT NULL AND v_am IS NOT NULL AND jsonb_typeof(v_am) = 'object' THEN
          INSERT INTO public.entity_translations
            (entity_type, entity_id, field, lang_code, value, status, machine, updated_by)
          VALUES ('attribute', v_attr, 'label', 'am', v_am->>'value',
                  COALESCE(v_am->>'status', 'edited'),
                  COALESCE((v_am->>'machine')::boolean, false), auth.uid())
          ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
            SET value = EXCLUDED.value, status = EXCLUDED.status,
                machine = EXCLUDED.machine, updated_by = EXCLUDED.updated_by,
                updated_at = now();
          PERFORM public.log_audit('entity_translation.undo_restore', 'attributes', v_attr::text,
            jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'label',
                               'restored', v_am));
        ELSIF v_attr IS NOT NULL AND v_am IS NOT NULL AND jsonb_typeof(v_am) = 'null' THEN
          DELETE FROM public.entity_translations
           WHERE entity_type = 'attribute' AND entity_id = v_attr
             AND field = 'label' AND lang_code = 'am';
          PERFORM public.log_audit('entity_translation.undo_remove', 'attributes', v_attr::text,
            jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'label'));
        END IF;
      END IF;
    ELSE
      -- LINK PASS B (INC-197) — the unlinked links come back and the changed
      -- links go to their full prev state (flags, display_order, card_rank,
      -- allowed_options + default_value since M-MAINT-2 Part B, and the D24
      -- condition since M-MAINT-3b).
      -- Every rank in the way was cleared in Pass A; the added links are gone.
      v_slug := split_part(v_rev.entity_key, '|', 1);
      v_key := split_part(v_rev.entity_key, '|', 2);
      SELECT id INTO v_cat FROM public.categories WHERE slug = v_slug;
      SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_key;
      IF v_cat IS NULL OR v_attr IS NULL THEN
        v_conflicted := v_conflicted + 1;
        CONTINUE;
      END IF;

      IF v_rev.prev IS NULL THEN
        DELETE FROM public.category_attribute_links
         WHERE category_id = v_cat AND attribute_id = v_attr;
      ELSE
        INSERT INTO public.category_attribute_links
          (category_id, attribute_id, is_required, is_filterable, display_order, card_rank,
           allowed_options, default_value, visible_when)
        VALUES (v_cat, v_attr,
                (v_rev.prev->>'is_required')::boolean,
                (v_rev.prev->>'is_filterable')::boolean,
                COALESCE((v_rev.prev->>'display_order')::int, 0),
                NULLIF(v_rev.prev->>'card_rank','')::int,
                CASE WHEN v_rev.prev->'allowed_options' IS NULL
                       OR v_rev.prev->'allowed_options' = 'null'::jsonb
                     THEN NULL
                     ELSE ARRAY(SELECT jsonb_array_elements_text(v_rev.prev->'allowed_options')) END,
                CASE WHEN v_rev.prev->'default_value' IS NULL
                       OR v_rev.prev->'default_value' = 'null'::jsonb
                     THEN NULL ELSE v_rev.prev->'default_value' END,
                CASE WHEN v_rev.prev->'visible_when' IS NULL
                       OR v_rev.prev->'visible_when' = 'null'::jsonb
                     THEN NULL ELSE v_rev.prev->'visible_when' END)
        ON CONFLICT (category_id, attribute_id) DO UPDATE
          SET is_required = EXCLUDED.is_required,
              is_filterable = EXCLUDED.is_filterable,
              display_order = EXCLUDED.display_order,
              card_rank = EXCLUDED.card_rank,
              allowed_options = EXCLUDED.allowed_options,
              default_value = EXCLUDED.default_value,
              visible_when = EXCLUDED.visible_when,
              updated_at = now();
      END IF;
    END IF;

    UPDATE public.attribute_import_revisions SET undone_at = now() WHERE id = v_rev.id;
    v_restored := v_restored + 1;
  END LOOP;

  PERFORM public.log_audit('attribute.import_undo', 'attributes', p_batch::text,
    jsonb_build_object('batch_id', p_batch, 'restored', v_restored, 'conflicted', v_conflicted));

  RETURN jsonb_build_object('batch_id', p_batch, 'restored', v_restored,
                            'conflicted', v_conflicted);
END $m8c$;
REVOKE ALL ON FUNCTION public.admin_undo_attribute_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_attribute_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_attribute_import(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.get_posting_schema(p_category_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $m8c$
DECLARE
  v_cat public.categories;
  v_attrs jsonb;
  v_doc jsonb;
  v_rate jsonb;
  v_deal jsonb;
  v_has_unit boolean;
BEGIN
  v_rate := public.rate_gate('schema_read');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RAISE EXCEPTION 'rateLimited';
  END IF;

  SELECT * INTO v_cat FROM public.categories WHERE id = p_category_id;
  IF v_cat.id IS NULL THEN
    RAISE EXCEPTION 'categoryNotFound';
  END IF;
  IF NOT v_cat.is_active THEN
    RAISE EXCEPTION 'categoryInactive';
  END IF;
  IF NOT v_cat.allow_listings THEN
    RAISE EXCEPTION 'categoryNotPostable';
  END IF;

  -- M5 / DEC-109 — the price page's rows, grouped by deal_group, display order.
  SELECT EXISTS (SELECT 1 FROM public.effective_category_links(p_category_id) e
                   JOIN public.attributes a ON a.id = e.attribute_id
                  WHERE a.attr_key ~ '^unit_of_sale(-|$)')
    INTO v_has_unit;
  SELECT jsonb_build_object('basis', '[]'::jsonb, 'size', '[]'::jsonb,
                            'quantity', '[]'::jsonb, 'terms', '[]'::jsonb)
         || coalesce(jsonb_object_agg(g.grp, g.keys), '{}'::jsonb)
    INTO v_deal
    FROM (SELECT public.deal_group(a.attr_key, v_has_unit) AS grp,
                 jsonb_agg(a.attr_key ORDER BY e.display_order, a.attr_key) AS keys
            FROM public.effective_category_links(p_category_id) e
            JOIN public.attributes a ON a.id = e.attribute_id
           WHERE public.deal_group(a.attr_key, v_has_unit) IS NOT NULL
           GROUP BY 1) g;

  SELECT coalesce(jsonb_agg(row ORDER BY ord, key), '[]'::jsonb)
    INTO v_attrs
    FROM (
      SELECT e.display_order AS ord, a.attr_key AS key,
             jsonb_build_object(
               'attribute_id', a.id,
               'attr_key', a.attr_key,
               'attr_type', a.attr_type,
               'name_en', a.name_en,
               'name_am', a.name_am,
               'help_text_en', a.help_text_en,
               'help_text_am', a.help_text_am,
               'is_required', e.is_required,
               'display_order', e.display_order,
               'card_rank', e.card_rank,
               'unit', a.unit,
               'unit_am', a.unit_am,
               'min_bound', a.min_bound,
               'max_bound', a.max_bound,
               'decimals', a.decimals,
               'format', a.format,
               'preset', a.preset,
               'max_length', a.max_length,
               'allowed_options', to_jsonb(l.allowed_options),
               'default_value', l.default_value,
               'visible_when', l.visible_when,
               'option_count', (
                 SELECT count(*)
                   FROM jsonb_array_elements(
                          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
                  WHERE coalesce((o.value->>'active')::boolean, true)
                    AND (l.allowed_options IS NULL
                         OR (o.value->>'value') = ANY (l.allowed_options))
               ),
               'allow_other', EXISTS (
                 SELECT 1
                   FROM jsonb_array_elements(
                          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
                  WHERE o.value->>'value' = 'other'
                    AND (l.allowed_options IS NULL
                         OR 'other' = ANY (l.allowed_options))
               )
             ) AS row
        FROM public.effective_category_links(p_category_id) e
        JOIN public.attributes a ON a.id = e.attribute_id
        JOIN public.category_attribute_links l ON l.id = e.link_id
    ) s;

  v_doc := jsonb_build_object(
    'category', jsonb_build_object(
      'id', v_cat.id,
      'slug', v_cat.slug,
      'name_en', v_cat.name_en,
      'price_enabled', v_cat.price_enabled,
      'default_price_period', v_cat.default_price_period,
      'price_period_locked', v_cat.price_period_locked,
      'expiry_days', v_cat.expiry_days,
      'is_restricted', v_cat.is_restricted,
      'capabilities', to_jsonb(v_cat.capabilities),
      'illustration', v_cat.image_url,
      'deal', v_deal
    ),
    'attributes', v_attrs,
    'plan', public.plan_caps(public.seller_plan(auth.uid()))
  );
  -- M5 / DEC-109 — no schema-time priceBasisAmbiguous: ambiguity is judged
  -- with the answers (price_basis_in_force, validate_listing_draft step 4).
  RETURN v_doc;
END $m8c$;
REVOKE ALL ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role;

DROP FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text);
CREATE FUNCTION public.admin_upsert_attribute(
  p_id uuid, p_attr_key text, p_name_en text, p_attr_type text, p_options jsonb,
  p_help_text_en text, p_depends_on text DEFAULT NULL::text,
  p_unit text DEFAULT NULL::text, p_unit_am text DEFAULT NULL::text, p_min_bound text DEFAULT NULL::text,
  p_max_bound text DEFAULT NULL::text, p_decimals smallint DEFAULT NULL::smallint,
  p_format text DEFAULT NULL::text, p_preset text DEFAULT NULL::text,
  p_max_length integer DEFAULT NULL::integer, p_help_text_am text DEFAULT NULL::text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $m8c$
DECLARE
  v_id uuid; v_old jsonb; v_dep uuid; v_dep_key text; v_dep_type text;
  v_vals text[]; v_parent text; v_entry jsonb;
  v_cellmsg text; v_optmsg text; v_tkey text; v_ttype text;
  v_ocats uuid[]; v_tcats uuid[]; v_allowed jsonb;
  -- INC-200 — the EFFECTIVE cells: what the row will actually carry once a
  -- type change has cleared what no longer applies.
  v_stored_type text; v_newtype text;
  v_e_unit text; v_e_min text; v_e_max text; v_e_dec smallint; v_e_fmt text;
  v_e_pset text; v_e_maxlen integer; v_e_opts jsonb;
  -- M8c / C5 — unit_am: NULL keeps the stored value (a caller that does not
  -- send it never drops it, INC-188); '' clears; a type change off number clears.
  v_e_unit_am text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  IF p_attr_key IS NULL OR btrim(p_attr_key) = '' THEN
    RAISE EXCEPTION 'admin.attributes.error.keyRequired' USING ERRCODE = 'P0010';
  END IF;

  IF EXISTS (SELECT 1 FROM public.attributes a
              WHERE a.attr_key = p_attr_key AND (p_id IS NULL OR a.id <> p_id)) THEN
    RAISE EXCEPTION 'admin.attributes.error.keyTaken' USING ERRCODE = 'P0010';
  END IF;

  -- INC-200 — A TYPE CHANGE CLEARS THE CELLS THAT NO LONGER APPLY, whatever
  -- the caller passed: text cells (preset, max_length) off anything but text,
  -- number cells (unit, min, max, decimals, format) off anything but number,
  -- options off text/number/boolean. When the type is UNCHANGED, a NULL
  -- parameter keeps its old meaning exactly as before.
  v_e_unit   := p_unit;
  v_e_unit_am := NULLIF(btrim(p_unit_am), '');
  IF p_unit_am IS NULL AND p_id IS NOT NULL THEN
    SELECT a.unit_am INTO v_e_unit_am FROM public.attributes a WHERE a.id = p_id;
  END IF;
  v_e_min    := p_min_bound;
  v_e_max    := p_max_bound;
  v_e_dec    := p_decimals;
  v_e_fmt    := p_format;
  v_e_pset   := p_preset;
  v_e_maxlen := p_max_length;
  v_e_opts   := p_options;
  IF p_id IS NOT NULL THEN
    SELECT a.attr_type INTO v_stored_type FROM public.attributes a WHERE a.id = p_id;
    v_newtype := COALESCE(p_attr_type, v_stored_type);
    IF v_stored_type IS NOT NULL AND v_newtype IS DISTINCT FROM v_stored_type THEN
      IF v_newtype <> 'text' THEN
        v_e_pset := NULL;
        v_e_maxlen := NULL;
      END IF;
      IF v_newtype <> 'number' THEN
        v_e_unit := NULL;
        v_e_unit_am := NULL;
        v_e_min := NULL;
        v_e_max := NULL;
        v_e_dec := NULL;
        v_e_fmt := NULL;
      END IF;
      IF v_newtype IN ('text','number','boolean') THEN
        v_e_opts := NULL;
      END IF;
    END IF;
  END IF;

  -- DEC-045 — exactly one parent, single_select, no self, no cycle.
  v_dep_key := NULLIF(btrim(COALESCE(p_depends_on, '')), '');
  IF v_dep_key IS NOT NULL THEN
    SELECT a.id, a.attr_type INTO v_dep, v_dep_type
      FROM public.attributes a WHERE a.attr_key = v_dep_key;
    IF v_dep IS NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.dependsUnknown:%', v_dep_key USING ERRCODE = 'P0010';
    END IF;
    IF v_dep_type IS DISTINCT FROM 'single_select' THEN
      RAISE EXCEPTION 'admin.attributes.error.dependsNotSelect:%', v_dep_key USING ERRCODE = 'P0010';
    END IF;
    IF p_id IS NOT NULL AND v_dep = p_id THEN
      RAISE EXCEPTION 'admin.attributes.error.dependsSelf' USING ERRCODE = 'P0010';
    END IF;
    IF public.attr_dep_cycle(p_id, v_dep) THEN
      RAISE EXCEPTION 'admin.attributes.error.dependsCycle:%', v_dep_key USING ERRCODE = 'P0010';
    END IF;
    v_vals := public.attr_option_values(v_dep);
  END IF;

  -- Every `parent` names a value of the depended-on definition; a `parent`
  -- without a dependency is refused outright (never silently dropped).
  FOR v_entry IN
    SELECT value FROM jsonb_array_elements(public.attr_option_norm(v_e_opts))
  LOOP
    v_parent := NULLIF(btrim(COALESCE(v_entry->>'parent','')), '');
    CONTINUE WHEN v_parent IS NULL;
    IF v_dep IS NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.parentWithoutDepends:%', v_parent
        USING ERRCODE = 'P0010';
    END IF;
    IF NOT (v_parent = ANY (COALESCE(v_vals, ARRAY[]::text[]))) THEN
      RAISE EXCEPTION 'admin.attributes.error.parentNotInParent:%', v_parent
        USING ERRCODE = 'P0010';
    END IF;
  END LOOP;

  -- DEC-050 — the definition v2 cells, judged by the shared judge.
  v_cellmsg := public.attr_cell_check(p_attr_type, v_e_unit, v_e_min, v_e_max,
                                      v_e_dec::int, v_e_fmt, v_e_pset, v_e_maxlen,
                                      p_help_text_en, p_help_text_am, v_e_unit_am);
  IF v_cellmsg IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.badCell:%', v_cellmsg USING ERRCODE = 'P0010';
  END IF;

  -- DEC-050 — the strict option shape. An unknown key is a refusal, never a
  -- silent drop; the refusal names the definition, the option and the reason.
  v_optmsg := public.attr_option_shape(p_attr_key, v_e_opts);
  IF v_optmsg IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.badOption:%', v_optmsg USING ERRCODE = 'P0010';
  END IF;

  -- DEC-050 — a bounds target is a NUMBER definition linked, directly or by
  -- inheritance, in AT LEAST ONE category where this definition is linked (LIVE links) — DEC-057b.
  v_ocats := public.attr_postplan_cats(p_attr_key, '[]'::jsonb);
  FOREACH v_tkey IN ARRAY public.attr_bounds_targets(v_e_opts)
  LOOP
    SELECT a.attr_type INTO v_ttype FROM public.attributes a WHERE a.attr_key = v_tkey;
    IF v_ttype IS DISTINCT FROM 'number' THEN
      RAISE EXCEPTION 'admin.attributes.error.boundsTargetNotNumber:%|%', p_attr_key, v_tkey
        USING ERRCODE = 'P0010';
    END IF;
    v_tcats := public.attr_cats_expand(public.attr_postplan_cats(v_tkey, '[]'::jsonb));
    IF COALESCE(array_length(v_ocats, 1), 0) > 0 AND NOT EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE c = ANY (v_tcats)) THEN
      RAISE EXCEPTION 'admin.attributes.error.boundsTargetNotColinked:%|%', p_attr_key, v_tkey
        USING ERRCODE = 'P0010';
    END IF;
  END LOOP;

  -- DEC-057 — option-conditioned allowed values, judged against LIVE links by
  -- the single rule. Refusals are named exactly as the bounds path names its own.
  v_allowed := public.attr_allowed_check(p_attr_key, v_e_opts, '[]'::jsonb);
  IF v_allowed IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.%:%', v_allowed->>'reason', v_allowed->>'detail'
      USING ERRCODE = 'P0010';
  END IF;

  IF p_id IS NULL THEN
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en, depends_on,
                                   unit, min_bound, max_bound, decimals, format, preset,
                                   max_length, help_text_am, unit_am)
    VALUES (p_attr_key, p_name_en, p_attr_type, v_e_opts, p_help_text_en, v_dep,
            v_e_unit, v_e_min, v_e_max, v_e_dec, v_e_fmt, v_e_pset,
            v_e_maxlen, p_help_text_am, v_e_unit_am)
    RETURNING id INTO v_id;

    PERFORM public.log_audit('attribute.create', 'attributes', v_id::text,
      jsonb_build_object('attr_key', p_attr_key, 'attr_type', p_attr_type,
                         'depends_on', COALESCE(v_dep_key, ''),
                         'unit', v_e_unit, 'unit_am', v_e_unit_am, 'min_bound', v_e_min, 'max_bound', v_e_max,
                         'decimals', v_e_dec, 'format', v_e_fmt, 'preset', v_e_pset,
                         'max_length', v_e_maxlen, 'help_text_am', p_help_text_am));
  ELSE
    SELECT to_jsonb(a) INTO v_old FROM public.attributes a WHERE a.id = p_id;
    IF v_old IS NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
    END IF;

    -- INC-200 — the type and every cell travel in ONE statement, so no
    -- inapplicable cell is ever briefly held against the new type.
    UPDATE public.attributes a
       SET attr_key     = p_attr_key,
           name_en      = COALESCE(p_name_en, a.name_en),
           attr_type    = COALESCE(p_attr_type, a.attr_type),
           options      = v_e_opts,
           help_text_en = p_help_text_en,
           depends_on   = v_dep,
           unit         = v_e_unit,
           unit_am      = v_e_unit_am,
           min_bound    = v_e_min,
           max_bound    = v_e_max,
           decimals     = v_e_dec,
           format       = v_e_fmt,
           preset       = v_e_pset,
           max_length   = v_e_maxlen,
           help_text_am = p_help_text_am,
           updated_at   = now()
     WHERE a.id = p_id;
    v_id := p_id;

    PERFORM public.log_audit('attribute.update', 'attributes', p_id::text,
      jsonb_build_object(
        'old', jsonb_build_object('attr_key', v_old->>'attr_key', 'name_en', v_old->>'name_en',
                                  'attr_type', v_old->>'attr_type', 'options', v_old->'options',
                                  'depends_on', v_old->>'depends_on',
                                  'unit', v_old->>'unit', 'unit_am', v_old->>'unit_am', 'min_bound', v_old->>'min_bound',
                                  'max_bound', v_old->>'max_bound', 'decimals', v_old->>'decimals',
                                  'format', v_old->>'format', 'preset', v_old->>'preset',
                                  'max_length', v_old->>'max_length',
                                  'help_text_en', v_old->>'help_text_en',
                                  'help_text_am', v_old->>'help_text_am'),
        'new', (SELECT jsonb_build_object('attr_key', a.attr_key, 'name_en', a.name_en,
                                          'attr_type', a.attr_type, 'options', a.options,
                                          'depends_on', a.depends_on,
                                          'unit', a.unit, 'unit_am', a.unit_am, 'min_bound', a.min_bound,
                                          'max_bound', a.max_bound, 'decimals', a.decimals,
                                          'format', a.format, 'preset', a.preset,
                                          'max_length', a.max_length,
                                          'help_text_en', a.help_text_en,
                                          'help_text_am', a.help_text_am)
                  FROM public.attributes a WHERE a.id = p_id)));
  END IF;

  RETURN v_id;
END $m8c$;
REVOKE ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text) TO service_role;

DROP FUNCTION public.admin_list_attributes();
CREATE FUNCTION public.admin_list_attributes()
RETURNS TABLE(id uuid, attr_key text, name_en text, name_am text, attr_type text,
              options jsonb, help_text_en text, usage_count integer,
              depends_on_key text, created_at timestamp with time zone,
              unit text, min_bound text, max_bound text, decimals smallint,
              format text, preset text, max_length integer, help_text_am text,
              unit_am text)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $m8c$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT a.id, a.attr_key, a.name_en, a.name_am, a.attr_type,
         a.options, a.help_text_en,
         (SELECT count(*)::int FROM public.category_attribute_links l
           WHERE l.attribute_id = a.id),
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on),
         a.created_at,
         a.unit, a.min_bound, a.max_bound, a.decimals,
         a.format, a.preset, a.max_length, a.help_text_am, a.unit_am
    FROM public.attributes a
   ORDER BY a.attr_key;
END $m8c$;
REVOKE ALL ON FUNCTION public.admin_list_attributes() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_attributes() TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_attributes() TO service_role;

-- Proofs — a scratch admin and scratch rows inside a block that always rolls back.
DO $p$
DECLARE
  v_uid     uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_s       text := 'm8c-proof-' || substr(md5(random()::text), 1, 8);
  v_k       text := 'm8c_' || substr(md5(random()::text), 1, 8);
  v_cat     uuid;
  v_attr    uuid;
  v_exp     jsonb;
  v_doc     jsonb;
  v_res     jsonb;
  v_am      text;
BEGIN
  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_uid, v_k || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_uid, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_uid, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_uid, 'm8c-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    INSERT INTO public.categories (slug, name_en, is_active, allow_listings)
    VALUES (v_s, v_s, true, true) RETURNING id INTO v_cat;

    -- the editor door saves unit_am; a later save that does not send it keeps it.
    v_attr := public.admin_upsert_attribute(NULL, v_k, 'M8c', 'number', NULL, NULL,
                                            p_unit => 'people', p_unit_am => 'ሰዎች');
    PERFORM public.admin_upsert_attribute(v_attr, v_k, 'M8c', 'number', NULL, NULL, p_unit => 'people');
    SELECT unit_am INTO v_am FROM public.attributes WHERE id = v_attr;
    ASSERT v_am = 'ሰዎች', 'M8c: upsert dropped unit_am: ' || COALESCE(v_am, 'NULL');
    ASSERT EXISTS (SELECT 1 FROM public.admin_list_attributes() l WHERE l.attr_key = v_k AND l.unit_am = 'ሰዎች'),
      'M8c: list does not project unit_am';
    INSERT INTO public.category_attribute_links (category_id, attribute_id) VALUES (v_cat, v_attr);

    v_exp := public.attr_export_payload(v_s);
    ASSERT EXISTS (SELECT 1 FROM jsonb_array_elements(v_exp->'definitions') d
                    WHERE d.value->>'attribute_key' = v_k AND d.value->>'unit_am' = 'ሰዎች'),
      'M8c: export lost unit_am: ' || (v_exp->'definitions')::text;
    v_doc := public.get_posting_schema(v_cat);
    ASSERT EXISTS (SELECT 1 FROM jsonb_array_elements(v_doc->'attributes') x
                    WHERE x.value->>'attr_key' = v_k AND x.value->>'unit_am' = 'ሰዎች'),
      'M8c: posting schema lost unit_am';

    -- an import that changes unit_am, then its undo restores the previous value.
    v_res := public.admin_commit_attribute_import(jsonb_build_array(jsonb_build_object(
      'row', 2, 'attribute_key', v_k, 'label_en', 'M8c', 'type', 'number',
      'unit', 'people', 'unit_am', 'ሰው')), '[]'::jsonb, NULL, NULL);
    SELECT unit_am INTO v_am FROM public.attributes WHERE id = v_attr;
    ASSERT v_am = 'ሰው', 'M8c: commit did not write unit_am: ' || v_res::text;
    PERFORM public.admin_undo_attribute_import((v_res->>'batch_id')::uuid);
    SELECT unit_am INTO v_am FROM public.attributes WHERE id = v_attr;
    ASSERT v_am = 'ሰዎች', 'M8c: undo did not restore unit_am: ' || COALESCE(v_am, 'NULL');

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'm8c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'm8c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  ASSERT has_function_privilege('authenticated', 'public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text)', 'EXECUTE')
     AND NOT has_function_privilege('anon', 'public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text)', 'EXECUTE')
     AND has_function_privilege('authenticated', 'public.admin_list_attributes()', 'EXECUTE')
     AND NOT has_function_privilege('anon', 'public.admin_list_attributes()', 'EXECUTE')
     AND NOT has_function_privilege('anon', 'public.get_posting_schema(uuid)', 'EXECUTE')
     AND NOT has_function_privilege('anon', 'public.admin_commit_attribute_import(jsonb, jsonb, text, text)', 'EXECUTE')
     AND NOT has_function_privilege('anon', 'public.admin_undo_attribute_import(uuid)', 'EXECUTE'),
    'M8c: ACL changed';
END $p$;

INSERT INTO public.migration_marks (version) VALUES ('20261006140000') ON CONFLICT DO NOTHING;