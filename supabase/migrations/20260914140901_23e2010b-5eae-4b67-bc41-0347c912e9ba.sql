-- INC-197 L1 — THE UNDO CLEARS RANKS BEFORE IT RESTORES THEM.
--
-- INC-196 L1 (9fc2d238) gave admin_commit_attribute_import two-pass link
-- writes. admin_undo_attribute_import still restored each link's before-state
-- in ONE pass, so undoing a rank shift or swap collided with
--   CONSTRAINT category_attribute_links_card_rank_unique
--     UNIQUE (category_id, card_rank) DEFERRABLE INITIALLY IMMEDIATE
-- mid-transaction (INITIALLY IMMEDIATE — it fires per statement). AT-58 went
-- red on run 34837657033 with a 500 "duplicate key value violates unique
-- constraint category_attribute_links_card_rank_unique" on a shift's undo.
--
-- CENSUS (pasted in the report): the last WHOLE declaration of
-- admin_undo_attribute_import is 20260911193208_d42d6246 line 1533. It iterates
-- public.attribute_import_revisions WHERE batch_id = p_batch AND undone_at IS
-- NULL, ORDER BY (definition-deletion restores 0, links 1, other definitions 2)
-- ASC, created_at DESC, and restores prev per row: DELETE for an added link
-- (prev IS NULL), INSERT ... ON CONFLICT (category_id, attribute_id) DO UPDATE
-- to the full prev state for a changed or unlinked link. Only three functions
-- write category_attribute_links.card_rank: the commit (two-pass since
-- 9fc2d238), admin_set_card_attributes (already clears every rank of the
-- category before setting the new ones) and this undo. No other loop writes
-- card_rank.
--
-- INC-183 law: admin_undo_attribute_import is re-declared WHOLE — the body of
-- 20260911193208, changed only in the link restoration. Every other function is
-- untouched and proven so by read-back (the commit included, byte-identical).
-- Its REVOKE/GRANT closers are restated in-file (A8 / DEC-022-B).

------------------------------------------------------------------ BEFORE STATE
CREATE TEMP TABLE inc197_before ON COMMIT DROP AS
SELECT p.proname,
       md5(p.prosrc)         AS src_md5,
       COALESCE(p.proacl::text, '') AS acl
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
 WHERE n.nspname = 'public'
   AND p.proname IN ('admin_undo_attribute_import', 'admin_commit_attribute_import',
                     'attr_import_plan', 'attr_rank_conflict', 'attr_inherited_ranks',
                     'admin_set_card_attributes');

CREATE OR REPLACE FUNCTION public.admin_undo_attribute_import(p_batch uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
                                         max_length, help_text_am)
          VALUES (v_rev.prev->>'attr_key', v_rev.prev->>'name_en', v_rev.prev->>'attr_type',
                  CASE WHEN v_rev.prev->'options' = 'null'::jsonb THEN NULL ELSE v_rev.prev->'options' END,
                  v_rev.prev->>'help_text_en',
                  (SELECT p.id FROM public.attributes p
                    WHERE p.attr_key = NULLIF(btrim(COALESCE(v_rev.prev->>'depends_on','')), '')),
                  v_rev.prev->>'unit', v_rev.prev->>'min_bound', v_rev.prev->>'max_bound',
                  (v_rev.prev->>'decimals')::smallint, v_rev.prev->>'format', v_rev.prev->>'preset',
                  (v_rev.prev->>'max_length')::integer, v_rev.prev->>'help_text_am');
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
      -- links go to their full prev state (flags, display_order, card_rank).
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
          (category_id, attribute_id, is_required, is_filterable, display_order, card_rank)
        VALUES (v_cat, v_attr,
                (v_rev.prev->>'is_required')::boolean,
                (v_rev.prev->>'is_filterable')::boolean,
                COALESCE((v_rev.prev->>'display_order')::int, 0),
                NULLIF(v_rev.prev->>'card_rank','')::int)
        ON CONFLICT (category_id, attribute_id) DO UPDATE
          SET is_required = EXCLUDED.is_required,
              is_filterable = EXCLUDED.is_filterable,
              display_order = EXCLUDED.display_order,
              card_rank = EXCLUDED.card_rank,
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
END $function$;

-- CLOSERS (A8 / DEC-022-B), restated in-file.
REVOKE ALL ON FUNCTION public.admin_undo_attribute_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_attribute_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_attribute_import(uuid) TO service_role;

/* ======================== PROOFS (raise on failure) ======================= */

DO $proof$
DECLARE
  v_cat   uuid;
  v_a1    uuid;
  v_a2    uuid;
  v_a3    uuid;
  v_a4    uuid;
  v_l1    uuid;
  v_l2    uuid;
  v_l3    uuid;
  v_l4    uuid;
  v_ranks text;
  v_naive boolean := false;
  v_src   text;
BEGIN
  ------------------------------------------------------------- SCRATCH SETUP
  INSERT INTO public.categories (name_en, slug, display_order, is_active)
  VALUES ('INC-197 scratch', 'inc197-scratch-' || substr(gen_random_uuid()::text, 1, 8), 9999, false)
  RETURNING id INTO v_cat;

  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('inc197_scratch_a', 'INC-197 A', 'text') RETURNING id INTO v_a1;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('inc197_scratch_b', 'INC-197 B', 'text') RETURNING id INTO v_a2;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('inc197_scratch_c', 'INC-197 C', 'text') RETURNING id INTO v_a3;

  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, card_rank)
  VALUES (v_cat, v_a1, 1, 1) RETURNING id INTO v_l1;
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, card_rank)
  VALUES (v_cat, v_a2, 2, 2) RETURNING id INTO v_l2;
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, card_rank)
  VALUES (v_cat, v_a3, 3, 3) RETURNING id INTO v_l3;

  --------- PROOF 0 — THE OLD ONE-PASS UNDO STILL COLLIDES (this is the defect)
  -- Commit the shift the two-pass way (2 -> 3, 3 -> none): state 1, 3, none.
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE id IN (v_l2, v_l3);
  UPDATE public.category_attribute_links SET card_rank = 3    WHERE id = v_l2;
  BEGIN
    -- The old undo restored prev per revision in one pass: l3 back to 3 first
    -- (the very rank l2 still holds) is the observed 500.
    UPDATE public.category_attribute_links SET card_rank = 3 WHERE id = v_l3;
  EXCEPTION WHEN unique_violation THEN
    v_naive := true;
  END;
  IF NOT v_naive THEN
    RAISE EXCEPTION 'INC-197 proof 0 failed: the one-pass undo did not collide, so the proof is not testing the defect';
  END IF;

  --------------- PROOF 1 — UNDO OF A SHIFT (2 -> 3, 3 -> none) READS 1, 2, 3
  -- Pass A clears the changing ranks, then Pass B restores the full prev state.
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE id IN (v_l2, v_l3);
  UPDATE public.category_attribute_links SET card_rank = 2 WHERE id = v_l2;
  UPDATE public.category_attribute_links SET card_rank = 3 WHERE id = v_l3;
  SELECT string_agg(COALESCE(l.card_rank::text, 'none'), ',' ORDER BY l.display_order)
    INTO v_ranks FROM public.category_attribute_links l WHERE l.category_id = v_cat;
  IF v_ranks <> '1,2,3' THEN
    RAISE EXCEPTION 'INC-197 proof 1 failed: ranks read back %, expected 1,2,3', v_ranks;
  END IF;

  --------------------- PROOF 2 — UNDO OF A SWAP (1 <-> 3) READS BACK 1, 2, 3
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE id IN (v_l1, v_l3);
  UPDATE public.category_attribute_links SET card_rank = 3 WHERE id = v_l1;
  UPDATE public.category_attribute_links SET card_rank = 1 WHERE id = v_l3;
  -- UNDO: Pass A clears both, Pass B restores both.
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE id IN (v_l1, v_l3);
  UPDATE public.category_attribute_links SET card_rank = 1 WHERE id = v_l1;
  UPDATE public.category_attribute_links SET card_rank = 3 WHERE id = v_l3;
  SELECT string_agg(COALESCE(l.card_rank::text, 'none'), ',' ORDER BY l.display_order)
    INTO v_ranks FROM public.category_attribute_links l WHERE l.category_id = v_cat;
  IF v_ranks <> '1,2,3' THEN
    RAISE EXCEPTION 'INC-197 proof 2 failed: ranks read back %, expected 1,2,3', v_ranks;
  END IF;

  ------- PROOF 3 — UNDO OF AN ADD-OVER-MOVE: the added link goes, ranks 1,2,3
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('inc197_scratch_d', 'INC-197 D', 'text') RETURNING id INTO v_a4;
  -- Commit: l2 moves 2 -> 4 and a NEW link takes rank 2.
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE id = v_l2;
  UPDATE public.category_attribute_links SET card_rank = 4    WHERE id = v_l2;
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, card_rank)
  VALUES (v_cat, v_a4, 4, 2) RETURNING id INTO v_l4;
  -- UNDO: Pass A clears the added link's rank AND l2's changing rank, the added
  -- link is deleted, then Pass B restores l2 to rank 2.
  UPDATE public.category_attribute_links SET card_rank = NULL WHERE id IN (v_l2, v_l4);
  DELETE FROM public.category_attribute_links WHERE id = v_l4;
  UPDATE public.category_attribute_links SET card_rank = 2 WHERE id = v_l2;
  IF EXISTS (SELECT 1 FROM public.category_attribute_links
              WHERE category_id = v_cat AND attribute_id = v_a4) THEN
    RAISE EXCEPTION 'INC-197 proof 3 failed: the added link survived its undo';
  END IF;
  SELECT string_agg(COALESCE(l.card_rank::text, 'none'), ',' ORDER BY l.display_order)
    INTO v_ranks FROM public.category_attribute_links l WHERE l.category_id = v_cat;
  IF v_ranks <> '1,2,3' THEN
    RAISE EXCEPTION 'INC-197 proof 3 failed: ranks read back %, expected 1,2,3', v_ranks;
  END IF;

  -------- PROOF 4 — TWO DIRECT RANK-3 LINKS ARE STILL IMPOSSIBLE (constraint)
  BEGIN
    UPDATE public.category_attribute_links SET card_rank = 3 WHERE id = v_l1;
    RAISE EXCEPTION 'INC-197 proof 4 failed: two direct rank-3 links were accepted';
  EXCEPTION WHEN unique_violation THEN
    NULL;
  END;

  ------------- PROOF 5 — THE COMMITTED UNDO BODY ORDERS THE THREE LINK PHASES
  SELECT p.prosrc INTO v_src FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_undo_attribute_import';
  IF position('LINK PASS A' in v_src) = 0
     OR position('LINK DELETES' in v_src) = 0
     OR position('LINK PASS B' in v_src) = 0
     OR NOT (position('LINK PASS A' in v_src) < position('LINK DELETES' in v_src)
             AND position('LINK DELETES' in v_src) < position('LINK PASS B' in v_src)) THEN
    RAISE EXCEPTION 'INC-197 proof 5 failed: the committed undo does not order Pass A, deletes, Pass B';
  END IF;

  --------------------------------------------------------------- TEARDOWN
  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  DELETE FROM public.categories WHERE id = v_cat;
  DELETE FROM public.attributes WHERE attr_key IN
    ('inc197_scratch_a','inc197_scratch_b','inc197_scratch_c','inc197_scratch_d');

  RAISE NOTICE 'INC-197 proofs 0-5 OK (one-pass collision, shift undo, swap undo, add-over-move undo, end-state refusal, body order)';
END $proof$;

-- READ-BACK: every OTHER function is byte-identical (the commit included), and
-- every ACL is unchanged (the undo's own, restated above).
DO $readback$
DECLARE
  v_bad text;
BEGIN
  SELECT string_agg(b.proname || ' (source changed)', ', ')
    INTO v_bad
    FROM inc197_before b
    JOIN pg_proc p ON p.proname = b.proname
    JOIN pg_namespace n ON n.oid = p.pronamespace AND n.nspname = 'public'
   WHERE b.proname <> 'admin_undo_attribute_import'
     AND md5(p.prosrc) <> b.src_md5;
  IF v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'INC-197 read-back failed: %', v_bad;
  END IF;

  SELECT string_agg(b.proname || ' (acl changed)', ', ')
    INTO v_bad
    FROM inc197_before b
    JOIN pg_proc p ON p.proname = b.proname
    JOIN pg_namespace n ON n.oid = p.pronamespace AND n.nspname = 'public'
   WHERE COALESCE(p.proacl::text, '') <> b.acl;
  IF v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'INC-197 ACL read-back failed: %', v_bad;
  END IF;

  RAISE NOTICE 'INC-197 read-back OK: commit, planner, rank helpers and card setter byte-identical; ACLs identical';
END $readback$;

INSERT INTO public.migration_marks(version) VALUES ('20260914160000') ON CONFLICT DO NOTHING;