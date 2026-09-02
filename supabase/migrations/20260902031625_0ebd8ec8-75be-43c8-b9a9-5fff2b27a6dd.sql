-- ============================================================
-- U4i-7 (INC-125) — IMPORTS ARE BATCH-TAGGED AND UNDOABLE.
-- An import is a transaction you can take back: every revision it captures
-- carries the run's batch id, and the undo restores ONLY rows nothing has
-- touched since. A row edited after the import is COUNTED conflicted and left
-- exactly as it is — an undo never overwrites later work.
-- Definer law (INC-074): every re-declared function restates its REVOKE/GRANT.
-- ============================================================

ALTER TABLE public.ui_translation_revisions
  ADD COLUMN IF NOT EXISTS batch_id uuid;

CREATE INDEX IF NOT EXISTS ui_translation_revisions_batch_idx
  ON public.ui_translation_revisions (batch_id, changed_at DESC)
  WHERE batch_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- A. IMPORT — one batch uuid per call, stamped on every revision it captures.
-- The no-op law of U4i-6 (INC-124) is unchanged: an identical value is not
-- written, so it captures no revision and is nothing to undo.
-- ---------------------------------------------------------------------------
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
  v_before    uuid;
  v_after     uuid;
  v_imported  bigint := 0;
  v_flag      bigint := 0;
  v_skipped   bigint := 0;
  v_unchanged bigint := 0;
BEGIN
  -- Gates run ONCE up front so a refusal leaves no trace (law F5); the writer
  -- then re-runs the identical gates per row.
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
      -- UNKNOWN OR ORPHANED KEY: counted, never invented (F4).
      v_skipped := v_skipped + 1;
      CONTINUE;
    END IF;

    -- NO-OP LAW (INC-124): one normalization on both sides, trailing
    -- whitespace and newlines only.
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

    -- BATCH STAMP: the writer owns revision capture, so the latest revision id
    -- is read BEFORE and AFTER the write. Only a genuinely NEW revision is
    -- stamped — an older one is never retro-tagged into this batch.
    SELECT r.id INTO v_before
      FROM public.ui_translation_revisions r
     WHERE r.key = v_item.key AND r.lang_code = p_lang
     ORDER BY r.changed_at DESC, r.id DESC LIMIT 1;

    PERFORM public.admin_save_translation(v_item.key, p_lang, v_item.value);
    v_imported := v_imported + 1;

    SELECT r.id INTO v_after
      FROM public.ui_translation_revisions r
     WHERE r.key = v_item.key AND r.lang_code = p_lang
     ORDER BY r.changed_at DESC, r.id DESC LIMIT 1;

    IF v_after IS NOT NULL AND v_after IS DISTINCT FROM v_before THEN
      UPDATE public.ui_translation_revisions
         SET batch_id = v_batch
       WHERE id = v_after AND batch_id IS NULL;
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

-- ---------------------------------------------------------------------------
-- B. UNDO — restore each still-latest revision of the batch; count the rest.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_undo_import(p_batch uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_rev        record;
  v_latest     uuid;
  v_cur        public.ui_translations%ROWTYPE;
  v_lang       text;
  v_restored   bigint := 0;
  v_conflicted bigint := 0;
BEGIN
  -- Gates BEFORE any capture or mutation (law F5).
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');
  IF p_batch IS NULL THEN
    RAISE EXCEPTION 'batch id required';
  END IF;

  SELECT r.lang_code INTO v_lang
    FROM public.ui_translation_revisions r
   WHERE r.batch_id = p_batch AND r.action = 'save'
   LIMIT 1;
  IF v_lang IS NULL THEN
    RAISE EXCEPTION 'unknown import batch';
  END IF;
  IF NOT public.translation_scope_ok(v_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  FOR v_rev IN
    SELECT r.* FROM public.ui_translation_revisions r
     WHERE r.batch_id = p_batch AND r.action = 'save'
     ORDER BY r.changed_at ASC
  LOOP
    SELECT r2.id INTO v_latest
      FROM public.ui_translation_revisions r2
     WHERE r2.key = v_rev.key AND r2.lang_code = v_rev.lang_code
     ORDER BY r2.changed_at DESC, r2.id DESC LIMIT 1;

    IF v_latest IS DISTINCT FROM v_rev.id THEN
      -- Somebody wrote the row after the import: LATER WORK IS NEVER
      -- OVERWRITTEN. Counted, left exactly as it stands.
      v_conflicted := v_conflicted + 1;
      CONTINUE;
    END IF;

    SELECT * INTO v_cur FROM public.ui_translations
     WHERE key = v_rev.key AND lang_code = v_rev.lang_code;
    IF NOT FOUND THEN
      v_conflicted := v_conflicted + 1;
      CONTINUE;
    END IF;

    -- Capture the restore itself, so the trail reads import → undo.
    INSERT INTO public.ui_translation_revisions
      (key, lang_code, prev_value, prev_status, prev_machine, action,
       changed_by, batch_id)
    VALUES (v_rev.key, v_rev.lang_code, v_cur.value, v_cur.status,
            COALESCE(v_cur.machine, false), 'undo-import', auth.uid(), p_batch);

    UPDATE public.ui_translations
       SET value = v_rev.prev_value,
           status = v_rev.prev_status,
           machine = COALESCE(v_rev.prev_machine, false),
           flagged = false,
           flag_note = NULL,
           updated_by = auth.uid(),
           updated_at = now(),
           approved_by = CASE WHEN v_rev.prev_status = 'approved'
                              THEN COALESCE(approved_by, auth.uid()) ELSE NULL END,
           approved_at = CASE WHEN v_rev.prev_status = 'approved'
                              THEN COALESCE(approved_at, now()) ELSE NULL END
     WHERE key = v_rev.key AND lang_code = v_rev.lang_code;

    v_restored := v_restored + 1;
  END LOOP;

  PERFORM public.log_audit('translation.undo_import', 'ui_translations', v_lang,
    jsonb_build_object('lang', v_lang, 'action', 'undo-import',
                       'batch_id', p_batch,
                       'restored', v_restored, 'conflicted', v_conflicted));

  RETURN jsonb_build_object('restored', v_restored, 'conflicted', v_conflicted);
END $function$;

REVOKE ALL ON FUNCTION public.admin_undo_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_import(uuid) TO authenticated;

-- ---------- LEDGER -------------------------------------------------------
INSERT INTO public.migration_marks(version) VALUES ('20260902140000') ON CONFLICT DO NOTHING;