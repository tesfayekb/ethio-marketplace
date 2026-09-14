-- INC-196 L1 — THE COMMIT CLEARS RANKS BEFORE IT SETS THEM.
--
-- Travel's attributes import previewed clean and the commit failed: at
-- vehicle-hire the plan moved model-cars 2 -> 3 and seats 3 -> none, the links
-- loop ran in plan order (ORDER BY origin_slug, attr_key), and
-- category_attribute_links_card_rank_unique refused the instant two direct
-- links held rank 3. The END state was valid; the WRITE ORDER was not.
--
-- CENSUS NOTE, stated plainly: the constraint is
--   CONSTRAINT category_attribute_links_card_rank_unique
--     UNIQUE (category_id, card_rank) DEFERRABLE INITIALLY IMMEDIATE
-- (20260906035541 line 49) — DEFERRABLE, not "plain UNIQUE" as the task text
-- said. It is INITIALLY IMMEDIATE, so it still fires per statement exactly as
-- observed. The fix here is the write order, not SET CONSTRAINTS: a deferral
-- would hide ordering bugs and weaken the same-statement guarantee.
--
-- INC-183 law: admin_commit_attribute_import is re-declared WHOLE (the body of
-- 20260911193208, changed only in the links phases). Every other function is
-- untouched and proven so by read-back. Its REVOKE/GRANT closers are restated
-- in-file (A8 / DEC-022-B).

------------------------------------------------------------------ BEFORE STATE
CREATE TEMP TABLE inc196_before ON COMMIT DROP AS
SELECT p.proname,
       md5(p.prosrc)         AS src_md5,
       COALESCE(p.proacl::text, '') AS acl
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
 WHERE n.nspname = 'public'
   AND p.proname IN ('admin_undo_attribute_import', 'attr_import_plan',
                     'attr_rank_conflict', 'attr_inherited_ranks',
                     'admin_commit_attribute_import');

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

    IF v_id IS NULL THEN
      INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
      VALUES (v_item->>'key', v_item->>'name_en', v_item->>'attr_type',
              CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END)
      RETURNING id INTO v_id;
    ELSE
      UPDATE public.attributes
         SET name_en = v_item->>'name_en',
             attr_type = v_item->>'attr_type',
             options = CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END,
             updated_at = now()
       WHERE id = v_id;
    END IF;

    -- DEC-050 — every PRESENT v2 cell is applied; an ABSENT cell is left
    -- alone. INC-187's lesson: what the planner diffed, the commit applies.
    v_cells := COALESCE(v_item->'cells', '{}'::jsonb);
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
  -- flags and display_order are untouched here and are written in Pass B.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'links')
  LOOP
    CONTINUE WHEN v_item->>'change' <> 'change';

    v_id := NULLIF(v_item->>'link_id','')::uuid;
    CONTINUE WHEN v_id IS NULL;

    v_prev := NULL;
    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank)
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
                              'display_order',l.display_order,'card_rank',l.card_rank)
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
  -- admin_undo_attribute_import expects; its body is unchanged (read-back).
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'links')
  LOOP
    CONTINUE WHEN v_item->>'change' IN ('none', 'unlink');

    v_id := NULLIF(v_item->>'attribute_id','')::uuid;
    IF v_id IS NULL THEN
      SELECT id INTO v_id FROM public.attributes WHERE attr_key = v_item->>'key';
    END IF;

    IF v_item->>'change' = 'add' THEN
      v_prev := NULL;
      SELECT COALESCE(max(l.display_order), 0) + 1 INTO v_order
        FROM public.category_attribute_links l
       WHERE l.category_id = (v_item->>'category_id')::uuid;
      INSERT INTO public.category_attribute_links
        (category_id, attribute_id, is_required, is_filterable, display_order, card_rank)
      VALUES ((v_item->>'category_id')::uuid, v_id,
              (v_item->>'is_required')::boolean, (v_item->>'is_filterable')::boolean,
              v_order, NULLIF(v_item->>'card_rank','')::int)
      RETURNING id INTO v_id;
    ELSE
      v_id := (v_item->>'link_id')::uuid;
      v_prev := v_prevs->(v_id::text);
      IF v_prev IS NULL THEN
        SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                                  'is_required',l.is_required,'is_filterable',l.is_filterable,
                                  'display_order',l.display_order,'card_rank',l.card_rank)
          INTO v_prev FROM public.category_attribute_links l WHERE l.id = v_id;
      END IF;
      UPDATE public.category_attribute_links
         SET is_required = (v_item->>'is_required')::boolean,
             is_filterable = (v_item->>'is_filterable')::boolean,
             display_order = COALESCE(NULLIF(v_item->>'display_order','')::int, display_order),
             card_rank = NULLIF(v_item->>'card_rank','')::int,
             updated_at = now()
       WHERE id = v_id;
    END IF;

    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank)
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

-- CLOSERS (A8 / DEC-022-B), restated in-file.
REVOKE ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO service_role;

/* ======================== PROOFS (raise on failure) ======================= */

DO $proof$
DECLARE
  v_cat   uuid;
  v_a1    uuid;
  v_a2    uuid;
  v_a3    uuid;
  v_l1    uuid;
  v_l2    uuid;
  v_l3    uuid;
  v_ranks text;
  v_naive boolean := false;
  v_src   text;
BEGIN
  ------------------------------------------------------------- SCRATCH SETUP
  INSERT INTO public.categories (name_en, slug, display_order, is_active)
  VALUES ('INC-196 scratch', 'inc196-scratch-' || substr(gen_random_uuid()::text, 1, 8), 9999, false)
  RETURNING id INTO v_cat;

  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('inc196_scratch_a', 'INC-196 A', 'text') RETURNING id INTO v_a1;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('inc196_scratch_b', 'INC-196 B', 'text') RETURNING id INTO v_a2;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('inc196_scratch_c', 'INC-196 C', 'text') RETURNING id INTO v_a3;

  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, card_rank)
  VALUES (v_cat, v_a1, 1, 1) RETURNING id INTO v_l1;
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, card_rank)
  VALUES (v_cat, v_a2, 2, 2) RETURNING id INTO v_l2;
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, card_rank)
  VALUES (v_cat, v_a3, 3, 3) RETURNING id INTO v_l3;

  ------------------- PROOF 0 — THE OLD ONE-PASS ORDER STILL FAILS (the bug)
  BEGIN
    UPDATE public.category_attribute_links SET card_rank = 3 WHERE id = v_l2; -- 2 -> 3
    UPDATE public.category_attribute_links SET card_rank = NULL WHERE id = v_l3; -- 3 -> none
  EXCEPTION WHEN unique_violation THEN
    v_naive := true;
  END;
  IF NOT v_naive THEN
    RAISE EXCEPTION 'INC-196 proof 0 failed: the one-pass order did not collide, so the proof is not testing the defect';
  END IF;

  ------------------------------- PROOF 1 — SHIFT: 2 -> 3 and 3 -> none
  -- Pass A (clear changing ranks), Phase 3 (no unlinks), Pass B (final states).
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE id IN (v_l2, v_l3);
  UPDATE public.category_attribute_links SET card_rank = 3    WHERE id = v_l2;
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE id = v_l3;

  SELECT string_agg(COALESCE(l.card_rank::text, 'none'), ',' ORDER BY l.display_order)
    INTO v_ranks FROM public.category_attribute_links l WHERE l.category_id = v_cat;
  IF v_ranks <> '1,3,none' THEN
    RAISE EXCEPTION 'INC-196 proof 1 failed: ranks read back %, expected 1,3,none', v_ranks;
  END IF;

  -- UNDO of the shift restores the prior ranks and flags exactly.
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE id IN (v_l2, v_l3);
  UPDATE public.category_attribute_links SET card_rank = 2 WHERE id = v_l2;
  UPDATE public.category_attribute_links SET card_rank = 3 WHERE id = v_l3;
  SELECT string_agg(COALESCE(l.card_rank::text, 'none'), ',' ORDER BY l.display_order)
    INTO v_ranks FROM public.category_attribute_links l WHERE l.category_id = v_cat;
  IF v_ranks <> '1,2,3' THEN
    RAISE EXCEPTION 'INC-196 proof 1-undo failed: ranks read back %, expected 1,2,3', v_ranks;
  END IF;

  ------------------------------------- PROOF 2 — SWAP: rank 1 <-> rank 3
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE id IN (v_l1, v_l3);
  UPDATE public.category_attribute_links SET card_rank = 3 WHERE id = v_l1;
  UPDATE public.category_attribute_links SET card_rank = 1 WHERE id = v_l3;
  SELECT string_agg(COALESCE(l.card_rank::text, 'none'), ',' ORDER BY l.display_order)
    INTO v_ranks FROM public.category_attribute_links l WHERE l.category_id = v_cat;
  IF v_ranks <> '3,2,1' THEN
    RAISE EXCEPTION 'INC-196 proof 2 failed: ranks read back %, expected 3,2,1', v_ranks;
  END IF;

  -- UNDO of the swap.
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE id IN (v_l1, v_l3);
  UPDATE public.category_attribute_links SET card_rank = 1 WHERE id = v_l1;
  UPDATE public.category_attribute_links SET card_rank = 3 WHERE id = v_l3;
  SELECT string_agg(COALESCE(l.card_rank::text, 'none'), ',' ORDER BY l.display_order)
    INTO v_ranks FROM public.category_attribute_links l WHERE l.category_id = v_cat;
  IF v_ranks <> '1,2,3' THEN
    RAISE EXCEPTION 'INC-196 proof 2-undo failed: ranks read back %, expected 1,2,3', v_ranks;
  END IF;

  --------- PROOF 3 — ADD-OVER-MOVE: a new rank-2 link while 2 moves to 4
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE id = v_l2;  -- Pass A
  UPDATE public.category_attribute_links SET card_rank = 4    WHERE id = v_l2;  -- Pass B: final
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, card_rank)
  SELECT v_cat, a.id, 4, 2 FROM public.attributes a WHERE a.attr_key = 'inc196_scratch_d';
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('inc196_scratch_d', 'INC-196 D', 'text');
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, card_rank)
  SELECT v_cat, a.id, 4, 2 FROM public.attributes a WHERE a.attr_key = 'inc196_scratch_d';

  SELECT string_agg(COALESCE(l.card_rank::text, 'none'), ',' ORDER BY l.display_order, l.card_rank)
    INTO v_ranks FROM public.category_attribute_links l WHERE l.category_id = v_cat;
  IF v_ranks <> '1,4,3,2' THEN
    RAISE EXCEPTION 'INC-196 proof 3 failed: ranks read back %, expected 1,4,3,2', v_ranks;
  END IF;

  -- UNDO of the add-over-move: the new link goes, the moved one returns to 2.
  DELETE FROM public.category_attribute_links l
   USING public.attributes a
   WHERE a.id = l.attribute_id AND a.attr_key = 'inc196_scratch_d';
  UPDATE public.category_attribute_links SET card_rank = 2 WHERE id = v_l2;
  SELECT string_agg(COALESCE(l.card_rank::text, 'none'), ',' ORDER BY l.display_order)
    INTO v_ranks FROM public.category_attribute_links l WHERE l.category_id = v_cat;
  IF v_ranks <> '1,2,3' THEN
    RAISE EXCEPTION 'INC-196 proof 3-undo failed: ranks read back %, expected 1,2,3', v_ranks;
  END IF;

  -------- PROOF 4 — AN END STATE WITH TWO RANK-3 LINKS IS STILL IMPOSSIBLE
  BEGIN
    UPDATE public.category_attribute_links SET card_rank = 3 WHERE id = v_l1;
    RAISE EXCEPTION 'INC-196 proof 4 failed: two direct rank-3 links were accepted';
  EXCEPTION WHEN unique_violation THEN
    NULL; -- the constraint (and, before any write, the planner) still refuses it
  END;

  ------------- PROOF 5 — THE NEW BODY CARRIES BOTH PASSES IN THE RIGHT ORDER
  SELECT p.prosrc INTO v_src FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_commit_attribute_import';
  IF position('PHASE 2A' in v_src) = 0
     OR position('PHASE 3' in v_src) = 0
     OR position('PHASE 2B' in v_src) = 0
     OR NOT (position('PHASE 2A' in v_src) < position('PHASE 3' in v_src)
             AND position('PHASE 3' in v_src) < position('PHASE 2B' in v_src)) THEN
    RAISE EXCEPTION 'INC-196 proof 5 failed: the committed body does not order Pass A, unlinks, Pass B';
  END IF;

  --------------------------------------------------------------- TEARDOWN
  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  DELETE FROM public.categories WHERE id = v_cat;
  DELETE FROM public.attributes WHERE attr_key IN
    ('inc196_scratch_a','inc196_scratch_b','inc196_scratch_c','inc196_scratch_d');

  RAISE NOTICE 'INC-196 proofs 0-5 OK (shift, swap, add-over-move, undo, end-state refusal, body order)';
END $proof$;

-- READ-BACK: every OTHER function is byte-identical, and every ACL is
-- unchanged (including the commit's own, restated above).
DO $readback$
DECLARE
  v_bad text;
BEGIN
  SELECT string_agg(b.proname || ' (source changed)', ', ')
    INTO v_bad
    FROM inc196_before b
    JOIN pg_proc p ON p.proname = b.proname
    JOIN pg_namespace n ON n.oid = p.pronamespace AND n.nspname = 'public'
   WHERE b.proname <> 'admin_commit_attribute_import'
     AND md5(p.prosrc) <> b.src_md5;
  IF v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'INC-196 read-back failed: %', v_bad;
  END IF;

  SELECT string_agg(b.proname || ' (acl changed)', ', ')
    INTO v_bad
    FROM inc196_before b
    JOIN pg_proc p ON p.proname = b.proname
    JOIN pg_namespace n ON n.oid = p.pronamespace AND n.nspname = 'public'
   WHERE COALESCE(p.proacl::text, '') <> b.acl;
  IF v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'INC-196 ACL read-back failed: %', v_bad;
  END IF;

  RAISE NOTICE 'INC-196 read-back OK: undo, planner and rank helpers byte-identical; ACLs identical';
END $readback$;

INSERT INTO public.migration_marks(version) VALUES ('20260914120000') ON CONFLICT DO NOTHING;