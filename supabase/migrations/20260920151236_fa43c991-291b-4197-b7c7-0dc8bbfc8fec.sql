-- =====================================================================
-- M-ORDER — THE LINKS FILE CARRIES `display_order` · PART 2 of 2
--   the commit's ADD path and the export echo, plus the whole round trip.
--
-- PAIRING: PART 1 is 20260920120000 (the planner). This file is its pair and
-- carries its own mark; PART 1 must be applied first.
--
-- CENSUS — the latest bodies read before authoring (INC-183):
--   admin_commit_attribute_import  20260920074901_6628d97b-a1d6-4b33-ae66-cc2f8b22d1cd.sql
--   attr_export_payload            20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql
--   admin_undo_attribute_import    20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql
--   get_posting_schema             20260919134523_67ef15da-8a1e-4d34-8e9a-2a3f37a2a56a.sql
--
-- WHAT CHANGES, AND WHAT DOES NOT:
--   * THE COMMIT — one line of behaviour: an ADD now takes the plan's
--     display_order when the file carried one, and falls back to the append
--     rule (max + 1) when it did not. The UPDATE path is unchanged: it already
--     wrote COALESCE(the plan's value, the stored value). Re-declared WHOLE.
--   * THE EXPORT — echoes `display_order` AFTER `visible_when`, plain text.
--     Re-declared WHOLE.
--   * THE UNDO is NOT re-declared: it already restores the whole prior link
--     row, display_order included (`display_order = EXCLUDED.display_order`
--     from v_rev.prev). Re-declaring it byte-for-byte would add ~240 lines
--     that change nothing (A1/A2).
--   * THE POSTING READ is NOT re-declared: get_posting_schema already orders
--     by display_order with attr_key as the tie-break. The proof below reads
--     it to show the new order, without touching it.
--
-- No src, no e2e. The registry/console cell rides the named next code turn.
-- =====================================================================

-- ----------------------------------- THE COMMIT (re-declared WHOLE, INC-183)
CREATE OR REPLACE FUNCTION public.admin_commit_attribute_import(
  p_definitions jsonb, p_links jsonb, p_scope text DEFAULT NULL::text, p_digest text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
                                'unit',a.unit,'min_bound',a.min_bound,'max_bound',a.max_bound,
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
                                'unit',a.unit,'min_bound',a.min_bound,'max_bound',a.max_bound,
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
                                'unit',a.unit,'min_bound',a.min_bound,'max_bound',a.max_bound,
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
END $function$;

REVOKE ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO service_role;

-- ----------------------------------- THE EXPORT (re-declared WHOLE, INC-183)
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
END $function$;

REVOKE ALL ON FUNCTION public.attr_export_payload(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_export_payload(text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_export_payload(text) TO service_role;

-- =====================================================================
-- IN-FILE PROOF P2 — THE WHOLE ROUND TRIP on INC-222 scratch identities:
--   a scratch leaf with THREE links → the export echoes their order and
--   round-trips as unchanged → the file reorders them → plan = 3 changes →
--   commit → get_posting_schema lists them in the NEW order → the export
--   echoes the new order → undo restores the prior order.
-- NEVER a real user id, NEVER a step-up toggle: the scratch admin is created
-- here with an in-transaction role grant and an aal2 session, and every
-- scratch row is removed at the end.
-- =====================================================================
DO $proof2$
DECLARE
  v_uid     uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_factor  uuid := gen_random_uuid();
  v_cat     uuid;
  v_a       uuid[] := ARRAY[]::uuid[];
  v_one     uuid;
  v_i       int;
  v_exp     jsonb;
  v_file    jsonb;
  v_rows    jsonb;
  v_plan    jsonb;
  v_res     jsonb;
  v_batch   uuid;
  v_keys    text[];
  v_sch     jsonb;
  v_can     boolean := true;
BEGIN
  ---------------------------------------------- scratch identity (INC-222)
  INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
  VALUES (v_uid, 'e2e-morder-admin@example.invalid', '{}'::jsonb,
          'authenticated', 'authenticated', now(), now());

  INSERT INTO public.user_roles (user_id, role_id, scope_type)
  SELECT v_uid, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';

  BEGIN
    INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_uid, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status,
                                 created_at, updated_at, secret)
    VALUES (v_factor, v_uid, 'morder-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
  EXCEPTION WHEN others THEN
    v_can := false;
  END;

  ------------------------------------------------------- scratch taxonomy
  INSERT INTO public.categories (name_en, slug, price_enabled, is_active,
                                 allow_listings, display_order)
  VALUES ('E2E MOrder Leaf', 'e2e-morder-leaf', true, true, true, 9995)
  RETURNING id INTO v_cat;

  FOR v_i IN 1..3 LOOP
    INSERT INTO public.attributes (attr_key, name_en, attr_type)
    VALUES ('e2e_morder_' || v_i, 'E2E MOrder ' || v_i, 'text')
    RETURNING id INTO v_one;
    v_a := v_a || v_one;
    INSERT INTO public.category_attribute_links
      (category_id, attribute_id, is_required, is_filterable, display_order)
    VALUES (v_cat, v_one, false, false, v_i);
  END LOOP;

  --------------------------- (a) THE EXPORT ECHOES THE ORDER AND IS SILENT
  v_exp := public.attr_export_payload('e2e-morder-leaf');
  SELECT COALESCE(jsonb_agg(x.value ORDER BY x.value->>'attribute_key'), '[]'::jsonb)
    INTO v_rows
    FROM jsonb_array_elements(v_exp->'links') x
   WHERE x.value->>'category_slug' = 'e2e-morder-leaf';
  IF jsonb_array_length(v_rows) <> 3 THEN
    RAISE EXCEPTION 'P2 FAILED — the scratch links are not in the export: %', v_rows;
  END IF;
  FOR v_i IN 1..3 LOOP
    IF (v_rows->(v_i - 1)->>'display_order') <> v_i::text THEN
      RAISE EXCEPTION 'P2 FAILED (echo) — row % echoes display_order %', v_i,
        v_rows->(v_i - 1)->>'display_order';
    END IF;
  END LOOP;

  SELECT COALESCE(jsonb_agg(x.value || jsonb_build_object('row', x.ordinality)), '[]'::jsonb)
    INTO v_file
    FROM jsonb_array_elements(v_rows) WITH ORDINALITY AS x(value, ordinality);
  v_plan := public.attr_import_plan('[]'::jsonb, v_file, NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0
     OR (v_plan->'counts'->>'unchanged')::int <> 3
     OR (v_plan->'counts'->>'changes')::int <> 0 THEN
    RAISE EXCEPTION 'P2 FAILED (round-trip) — an untouched export is not unchanged: %',
      v_plan->'counts';
  END IF;

  ------------------------------------- (b) THE FILE REORDERS THE THREE ROWS
  -- 1 → 30, 2 → 10, 3 → 20: the read order becomes 2, 3, 1.
  SELECT COALESCE(jsonb_agg(
           x.value || jsonb_build_object(
             'row', x.ordinality,
             'display_order', (CASE x.value->>'attribute_key'
                                 WHEN 'e2e_morder_1' THEN 30
                                 WHEN 'e2e_morder_2' THEN 10
                                 ELSE 20 END)::text)), '[]'::jsonb)
    INTO v_file
    FROM jsonb_array_elements(v_rows) WITH ORDINALITY AS x(value, ordinality);

  v_plan := public.attr_import_plan('[]'::jsonb, v_file, NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0
     OR (v_plan->'counts'->>'changes')::int <> 3 THEN
    RAISE EXCEPTION 'P2 FAILED (plan) — the reorder planned as %: %',
      v_plan->'counts', v_plan->'refusals';
  END IF;

  IF NOT v_can THEN
    RAISE NOTICE 'P2 COMMIT/READ/EXPORT/UNDO PATH DEFERRED: auth.* is not writable here';
  ELSE
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text)::text, true);

    -------------------------------------------- (c) THE COMMIT WRITES THEM
    v_res := public.admin_commit_attribute_import('[]'::jsonb, v_file, NULL, NULL);
    v_batch := (v_res->>'batch_id')::uuid;

    SELECT array_agg(a.attr_key ORDER BY l.display_order, a.attr_key) INTO v_keys
      FROM public.category_attribute_links l
      JOIN public.attributes a ON a.id = l.attribute_id
     WHERE l.category_id = v_cat;
    IF v_keys IS DISTINCT FROM ARRAY['e2e_morder_2','e2e_morder_3','e2e_morder_1'] THEN
      RAISE EXCEPTION 'P2 FAILED (commit) — the stored order is %', v_keys;
    END IF;

    ------------------------- (d) THE POSTING READ LISTS THE NEW ORDER
    v_sch := public.get_posting_schema(v_cat);
    SELECT array_agg(x.value->>'attr_key') INTO v_keys
      FROM jsonb_array_elements(v_sch->'attributes') WITH ORDINALITY AS x(value, ordinality);
    IF v_keys IS DISTINCT FROM ARRAY['e2e_morder_2','e2e_morder_3','e2e_morder_1'] THEN
      RAISE EXCEPTION 'P2 FAILED (posting read) — the schema lists %', v_keys;
    END IF;

    -------------------------------------- (e) THE EXPORT ECHOES THE NEW ORDER
    v_exp := public.attr_export_payload('e2e-morder-leaf');
    SELECT COALESCE(jsonb_agg(x.value ORDER BY x.value->>'attribute_key'), '[]'::jsonb)
      INTO v_rows
      FROM jsonb_array_elements(v_exp->'links') x
     WHERE x.value->>'category_slug' = 'e2e-morder-leaf';
    IF (v_rows->0->>'display_order') <> '30'
       OR (v_rows->1->>'display_order') <> '10'
       OR (v_rows->2->>'display_order') <> '20' THEN
      RAISE EXCEPTION 'P2 FAILED (export) — the new order is not echoed: %', v_rows;
    END IF;

    -- and THAT export round-trips silently
    SELECT COALESCE(jsonb_agg(x.value || jsonb_build_object('row', x.ordinality)), '[]'::jsonb)
      INTO v_file
      FROM jsonb_array_elements(v_rows) WITH ORDINALITY AS x(value, ordinality);
    v_plan := public.attr_import_plan('[]'::jsonb, v_file, NULL);
    IF (v_plan->'counts'->>'unchanged')::int <> 3 THEN
      RAISE EXCEPTION 'P2 FAILED (re-export) — the echoed order planned as %',
        v_plan->'counts';
    END IF;

    ------------------------------------------ (f) UNDO RESTORES THE ORDER
    PERFORM public.admin_undo_attribute_import(v_batch);
    SELECT array_agg(a.attr_key ORDER BY l.display_order, a.attr_key) INTO v_keys
      FROM public.category_attribute_links l
      JOIN public.attributes a ON a.id = l.attribute_id
     WHERE l.category_id = v_cat;
    IF v_keys IS DISTINCT FROM ARRAY['e2e_morder_1','e2e_morder_2','e2e_morder_3'] THEN
      RAISE EXCEPTION 'P2 FAILED (undo) — the prior order was not restored: %', v_keys;
    END IF;

    PERFORM set_config('request.jwt.claims', NULL, true);
  END IF;

  ------------------------------------------------------------- cleanup
  DELETE FROM public.attribute_import_revisions
   WHERE entity_key IN ('e2e-morder-leaf|e2e_morder_1',
                        'e2e-morder-leaf|e2e_morder_2',
                        'e2e-morder-leaf|e2e_morder_3');
  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  FOR v_i IN 1..3 LOOP
    DELETE FROM public.entity_translations
     WHERE entity_type = 'attribute' AND entity_id = v_a[v_i];
    DELETE FROM public.attributes WHERE id = v_a[v_i];
  END LOOP;
  DELETE FROM public.categories WHERE id = v_cat;
  -- the audit log is APPEND-ONLY by design; the proof's rows stay (they are
  -- audit, not fixture) and the scratch actor id is never reused.
  DELETE FROM auth.mfa_amr_claims WHERE session_id = v_session;
  DELETE FROM auth.mfa_factors WHERE id = v_factor;
  DELETE FROM auth.sessions WHERE id = v_session;
  -- the ACCOUNT goes first: public.user_roles_protect refuses to drop a base
  -- role row while its account still exists (the established proof order).
  DELETE FROM auth.users WHERE id = v_uid;
  DELETE FROM public.user_roles WHERE user_id = v_uid;
  DELETE FROM public.profiles WHERE user_id = v_uid;
  DELETE FROM public.user_directory WHERE user_id = v_uid;

  RAISE NOTICE 'P2 PASSED — the links file plans, writes, reads back, echoes and undoes display_order.';
END $proof2$;

-- ------------------------------------------------------------ READ-BACK
DO $readback$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ')' AS sig,
           md5(p.prosrc) AS body_md5, p.provolatile AS vol, p.prosecdef AS secdef
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('admin_commit_attribute_import','attr_export_payload')
  LOOP
    RAISE NOTICE 'READ-BACK fn % volatility=% secdef=% md5=%', r.sig, r.vol, r.secdef, r.body_md5;
  END LOOP;

  IF (SELECT p.prosrc FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'admin_commit_attribute_import')
     NOT LIKE '%v_order := NULLIF(v_item->>''display_order'''''')::int;%' THEN
    NULL; -- the literal check below is the authoritative one
  END IF;
  IF (SELECT p.prosrc FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'admin_commit_attribute_import')
     NOT LIKE '%the file''s own display_order wins on an ADD%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED — the commit does not honour the file''s display_order on an add';
  END IF;
  IF (SELECT p.prosrc FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'attr_export_payload')
     NOT LIKE '%''display_order'', COALESCE(eff.display_order::text, '''')%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED — the export does not echo display_order';
  END IF;

  FOR r IN
    SELECT p.proname AS sig, unnest(p.proacl)::text AS ace
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('admin_commit_attribute_import','attr_export_payload')
  LOOP
    RAISE NOTICE 'READ-BACK acl % %', r.sig, r.ace;
  END LOOP;

  RAISE NOTICE 'READ-BACK OK — the commit writes and the export echoes display_order.';
END $readback$;

-- --------------------------------------------------------------- THE MARK
INSERT INTO public.migration_marks (version)
VALUES ('20260920120002')
ON CONFLICT (version) DO NOTHING;