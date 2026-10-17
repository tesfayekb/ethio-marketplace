-- Bundle 19 turn 9c (2026-10-17). Tier A. D201 §4 — M2 PART d OF EIGHT: THE COMMIT CARRIES THE CELL.
-- e2e-areas: admin-attributes
-- admin_commit_attribute_import(jsonb, jsonb, text, text) [last declared 20261005172453] redeclared WHOLE: the revision
-- snapshots carry fact_rank; Pass A vacates a moving fact rank when the cell is set; the add writes it; the change
-- writes it only when set. Every header attribute kept, argument list unchanged, grants restated.
-- BODY PROOFS (DEC-190): a body is proven by its FINGERPRINT — md5 of the text with carriage returns and `--` comments
-- removed and, outside single-quoted literals, every run of whitespace collapsed to one space — so the spacing a
-- retyped submission may change never refuses an apply (INC-685), while any changed token or literal still does;
-- header attributes (volatility, SECURITY DEFINER, search_path) are proven as before. A clean apply is the pass.
-- Proofs P1–P2, RAISE EXCEPTION on any failure: part c4 landed; the body by fingerprint and header; the grants.
-- The door gates on has_permission and so is proven in behaviour by the admin-attributes route tests of turn 10 (the
-- import of a file with the cell; its undo). The mark 20261018150600.
-- Applied on ethio-prod by the executor's migration tool (DEC-188); the operator applies the saved files on ethio-staging
-- in order and reads back the marks. The eight parts are applied in order a → b → c1 → c2 → c3 → c4 → d → e in one turn,
-- nothing between them; each later part's first block refuses to run before the earlier one has landed; every part is
-- idempotent (a second apply changes nothing and the proofs still run).

-- ===== A — part c4 must have landed =====
DO $gate$
DECLARE
  v_fp text; v_vol "char"; v_def boolean; v_cfg text; v_n integer; v_err text;
BEGIN
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)) INTO v_fp FROM pg_proc p WHERE p.oid = 'public.attr_import_plan(jsonb, jsonb, text)'::regprocedure;
  IF v_fp <> '2463130389aa175d629fbed84695ded9' THEN
    RAISE EXCEPTION 'B19M2d: part c4 (mark 20261018150500) has not landed — apply it first';
  END IF;
END $gate$;

-- ===== B — the door, whole =====
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

-- ===== C — proofs =====
DO $proof$
DECLARE
  v_fp text; v_vol "char"; v_def boolean; v_cfg text; v_n integer; v_err text;
BEGIN
  -- P1. The body landed (fingerprint), with its header.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.admin_commit_attribute_import(jsonb, jsonb, text, text)'::regprocedure;
  IF v_fp <> '110b86f0489a45ccce51c7f9fd3670ee' THEN RAISE EXCEPTION 'B19M2d P1: admin_commit_attribute_import body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 'v' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M2d P1: admin_commit_attribute_import header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  -- P2. The grants.
  IF has_function_privilege('anon', 'public.admin_commit_attribute_import(jsonb, jsonb, text, text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_commit_attribute_import(jsonb, jsonb, text, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19M2d P2: the grants are not as written';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018150600') ON CONFLICT (version) DO NOTHING;
