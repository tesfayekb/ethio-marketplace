-- ============================================================
-- U4i-7 CORRECTION (INC-125). The first cut identified "the revision this
-- write just captured" and "the row's latest revision" by (changed_at, id).
-- changed_at defaults to now() — the TRANSACTION clock — so two writes inside
-- one transaction TIE and the order is arbitrary. The proof caught it:
-- a 3-row batch with one later edit returned {restored:1, conflicted:0}.
-- The law is restated WITHOUT any ordering: the import records the exact text
-- it wrote (post_value) and identifies its own revision by id-set difference;
-- undo restores a row ONLY while its current value still equals that text, and
-- counts every other row conflicted. Later work is never overwritten.
-- ============================================================

ALTER TABLE public.ui_translation_revisions
  ADD COLUMN IF NOT EXISTS post_value text;

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

    PERFORM public.admin_save_translation(v_item.key, p_lang, v_item.value);
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

CREATE OR REPLACE FUNCTION public.admin_undo_import(p_batch uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_rev        record;
  v_cur        public.ui_translations%ROWTYPE;
  v_lang       text;
  v_restored   bigint := 0;
  v_conflicted bigint := 0;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');
  IF p_batch IS NULL THEN
    RAISE EXCEPTION 'batch id required';
  END IF;

  SELECT r.lang_code INTO v_lang
    FROM public.ui_translation_revisions r
   WHERE r.batch_id = p_batch AND r.action <> 'undo-import'
   LIMIT 1;
  IF v_lang IS NULL THEN
    RAISE EXCEPTION 'unknown import batch';
  END IF;
  IF NOT public.translation_scope_ok(v_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  FOR v_rev IN
    SELECT r.* FROM public.ui_translation_revisions r
     WHERE r.batch_id = p_batch AND r.action <> 'undo-import'
  LOOP
    SELECT * INTO v_cur FROM public.ui_translations
     WHERE key = v_rev.key AND lang_code = v_rev.lang_code;

    -- UNTOUCHED TEST, ordering-free: the row still holds exactly what the
    -- import wrote. Anything else is later work and is left alone.
    IF NOT FOUND OR v_cur.value IS DISTINCT FROM v_rev.post_value THEN
      v_conflicted := v_conflicted + 1;
      CONTINUE;
    END IF;

    INSERT INTO public.ui_translation_revisions
      (key, lang_code, prev_value, prev_status, prev_machine, action,
       changed_by, batch_id, post_value)
    VALUES (v_rev.key, v_rev.lang_code, v_cur.value, v_cur.status,
            COALESCE(v_cur.machine, false), 'undo-import', auth.uid(),
            p_batch, v_rev.prev_value);

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

INSERT INTO public.migration_marks(version) VALUES ('20260902141500') ON CONFLICT DO NOTHING;