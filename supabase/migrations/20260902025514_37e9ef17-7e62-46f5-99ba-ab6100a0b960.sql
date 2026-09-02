-- ============================================================
-- U4i-6 (b) — IMPORT IDEMPOTENCY IS SERVER LAW (INC-124)
-- A client-side comparator is advisory; the writer itself refuses to write a
-- row whose value equals the stored one under ONE normalization (trailing
-- whitespace/newlines trimmed). No write ⇒ no status change ⇒ no revision ⇒
-- an approved row survives a full round-trip re-import.
-- ============================================================

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

    -- NO-OP LAW: one normalization on both sides, trailing whitespace and
    -- newlines only (leading space can be meaningful in a UI string).
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

    PERFORM public.admin_save_translation(v_item.key, p_lang, v_item.value);
    v_imported := v_imported + 1;

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
                       'imported', v_imported, 'flagged', v_flag,
                       'unchanged', v_unchanged, 'skipped', v_skipped));

  RETURN jsonb_build_object('imported', v_imported, 'flagged', v_flag,
                            'unchanged', v_unchanged, 'skipped', v_skipped);
END $function$;

-- Definer law (INC-074): grants restated in the file that re-declares.
REVOKE ALL ON FUNCTION public.admin_import_translations(text, jsonb) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_import_translations(text, jsonb) TO authenticated;

-- ---------- LEDGER -------------------------------------------------------
INSERT INTO public.migration_marks(version) VALUES ('20260902130000') ON CONFLICT DO NOTHING;