-- ============================================================
-- U4i — translator experience & delivery
-- Items: ① key context notes · ④ cacheable bundle version
--        ⑤ CSV/XLIFF import writer · ⑦ pseudo-localization guard
-- ============================================================

-- ---------- ① CONTEXT NOTES -------------------------------------------
-- CENSUS: there is NO `ui_translation_keys` table in this schema (the key set
-- lives as base-language rows of `ui_translations`), so the note is a column on
-- ui_translations carried by the BASE row only — one note per key, never per
-- language.
ALTER TABLE public.ui_translations ADD COLUMN IF NOT EXISTS context text;

CREATE OR REPLACE FUNCTION public.admin_set_key_context(p_key text, p_context text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_base text; v_prev text; v_next text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');

  v_next := NULLIF(btrim(COALESCE(p_context, '')), '');
  IF length(COALESCE(v_next, '')) > 500 THEN
    RAISE EXCEPTION 'context too long (max 500)';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;

  SELECT t.context INTO v_prev
    FROM public.ui_translations t
   WHERE t.key = p_key AND t.lang_code = v_base;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown translation key';
  END IF;

  UPDATE public.ui_translations
     SET context = v_next
   WHERE key = p_key AND lang_code = v_base;

  PERFORM public.log_audit('translation.context', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', v_base, 'action', 'context',
                       'machine', false,
                       'old_value', left(COALESCE(v_prev, ''), 200),
                       'new_value', left(COALESCE(v_next, ''), 200)));
END $function$;

REVOKE ALL ON FUNCTION public.admin_set_key_context(text, text) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_set_key_context(text, text) TO authenticated;

-- ---------- ① READER EXPOSURE ------------------------------------------
-- The OUT signature gains `context`, so the reader is dropped and recreated
-- (CREATE OR REPLACE cannot change a RETURNS TABLE shape). Body is otherwise
-- byte-identical to 20260830 + U4g.
DROP FUNCTION IF EXISTS public.admin_list_translations(text, text, boolean, text, integer, integer, boolean);

CREATE FUNCTION public.admin_list_translations(
  p_lang text,
  p_status text DEFAULT NULL::text,
  p_flagged boolean DEFAULT NULL::boolean,
  p_search text DEFAULT NULL::text,
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0,
  p_orphaned boolean DEFAULT NULL::boolean)
RETURNS TABLE(key text, lang_code text, value text, source_value text, status text,
              machine boolean, flagged boolean, flag_note text, updated_by uuid,
              updated_at timestamp with time zone, approved_by uuid,
              approved_at timestamp with time zone, orphaned boolean,
              context text, total_count bigint)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
#variable_conflict use_column
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  WITH base AS (SELECT l.code FROM public.languages l WHERE l.is_base LIMIT 1),
  filtered AS (
    SELECT t.key, t.lang_code, t.value, src.value AS source_value, t.status,
           t.machine, t.flagged, t.flag_note, t.updated_by, t.updated_at,
           t.approved_by, t.approved_at, t.orphaned, src.context AS context
      FROM public.ui_translations t
      LEFT JOIN public.ui_translations src
        ON src.key = t.key AND src.lang_code = (SELECT code FROM base)
     WHERE t.lang_code = p_lang
       AND (p_orphaned IS NULL OR t.orphaned = p_orphaned)
       AND (p_status IS NULL OR p_status = '' OR p_status = 'all' OR t.status = p_status)
       AND (p_flagged IS NULL OR t.flagged = p_flagged)
       AND (p_search IS NULL OR p_search = ''
            OR t.key ILIKE '%' || p_search || '%'
            OR COALESCE(t.value, '') ILIKE '%' || p_search || '%'
            OR COALESCE(src.value, '') ILIKE '%' || p_search || '%')
  )
  SELECT f.key, f.lang_code, f.value, f.source_value, f.status, f.machine,
         f.flagged, f.flag_note, f.updated_by, f.updated_at, f.approved_by,
         f.approved_at, f.orphaned, f.context, COUNT(*) OVER () AS total_count
    FROM filtered f
   ORDER BY f.key
   LIMIT GREATEST(COALESCE(p_limit, 50), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_translations(text, text, boolean, text, integer, integer, boolean) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_list_translations(text, text, boolean, text, integer, integer, boolean) TO authenticated;

-- ---------- ⑤ IMPORT WRITER ---------------------------------------------
-- SINGLE-WRITER PROOF: this function performs NO insert/update on the target
-- language itself. Every row goes through public.admin_save_translation, which
-- re-runs permission → step-up → scope, rejects the base language, rejects
-- unknown keys, runs translation_placeholders(), sets status='edited',
-- machine=false, captures a revision and audits. The only extra write here is
-- the "· import" provenance suffix appended to a flag note the WRITER raised.
CREATE OR REPLACE FUNCTION public.admin_import_translations(p_lang text, p_items jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_base     text;
  v_item     record;
  v_flagged  boolean;
  v_imported bigint := 0;
  v_flag     bigint := 0;
  v_skipped  bigint := 0;
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
                       'skipped', v_skipped));

  RETURN jsonb_build_object('imported', v_imported, 'flagged', v_flag,
                            'skipped', v_skipped);
END $function$;

REVOKE ALL ON FUNCTION public.admin_import_translations(text, jsonb) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_import_translations(text, jsonb) TO authenticated;

-- ---------- ④ CACHEABLE BUNDLE VERSION ----------------------------------
-- The ETag source for GET /api/i18n/:lang. Anon-callable exactly like
-- get_ui_bundle, and gated the same way: an unpublished language yields the
-- constant "empty" version alongside get_ui_bundle's `{}`.
CREATE OR REPLACE FUNCTION public.get_ui_bundle_version(p_lang text)
RETURNS text
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_ok boolean; v_max timestamptz; v_count bigint;
BEGIN
  SELECT (l.enabled_public OR l.is_base) INTO v_ok
    FROM public.languages l WHERE l.code = p_lang;
  IF v_ok IS NOT TRUE THEN
    RETURN md5(COALESCE(p_lang, '') || '|empty');
  END IF;
  SELECT max(t.updated_at), count(*) INTO v_max, v_count
    FROM public.ui_translations t
   WHERE t.lang_code = p_lang AND t.status = 'approved'
     AND t.value IS NOT NULL AND NOT t.orphaned;
  RETURN md5(COALESCE(p_lang, '') || '|'
             || COALESCE(to_char(v_max, 'YYYYMMDDHH24MISS.US'), 'none') || '|'
             || COALESCE(v_count, 0)::text);
END $function$;

REVOKE ALL ON FUNCTION public.get_ui_bundle_version(text) FROM public;
GRANT EXECUTE ON FUNCTION public.get_ui_bundle_version(text) TO anon, authenticated;

-- ---------- ⑦ PSEUDO-LOCALIZATION IS NEVER PUBLISHABLE -------------------
-- Re-declared verbatim from 20260831 (U4g) with ONE added rule. The definer
-- law (INC-074) requires the REVOKE/GRANT restated in this file.
CREATE OR REPLACE FUNCTION public.admin_set_language_flags(p_code text, p_enabled_admin boolean, p_enabled_public boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_base text; v_total bigint; v_approved bigint; v_is_base boolean;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');

  SELECT l.is_base INTO v_is_base FROM public.languages l WHERE l.code = p_code;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown language'; END IF;
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;

  -- U4i ⑦: 'zxa' is the reserved pseudo-localization row (layout QA only).
  IF p_enabled_public AND p_code = 'zxa' THEN
    RAISE EXCEPTION 'pseudo-localization language is never publishable';
  END IF;

  IF p_enabled_public AND NOT v_is_base THEN
    SELECT count(*) INTO v_total
      FROM public.ui_translations t
     WHERE t.lang_code = v_base AND NOT t.orphaned;
    IF v_total = 0 THEN
      RAISE EXCEPTION 'catalog empty — sync keys before publishing a language';
    END IF;
    SELECT count(*) INTO v_approved
      FROM public.ui_translations t
     WHERE t.lang_code = p_code AND t.status = 'approved'
       AND t.value IS NOT NULL AND NOT t.orphaned;
    IF v_approved < v_total THEN
      RAISE EXCEPTION 'language not fully approved: % of % remaining',
        v_total - v_approved, v_total;
    END IF;
  END IF;

  UPDATE public.languages
     SET enabled_admin = COALESCE(p_enabled_admin, enabled_admin),
         enabled_public = COALESCE(p_enabled_public, enabled_public),
         updated_at = now()
   WHERE code = p_code;

  PERFORM public.log_audit('translation.language_flags', 'languages', p_code,
    jsonb_build_object('lang', p_code, 'action', 'flags', 'machine', false,
                       'enabled_admin', p_enabled_admin,
                       'enabled_public', p_enabled_public));
END $function$;

REVOKE ALL ON FUNCTION public.admin_set_language_flags(text, boolean, boolean) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_set_language_flags(text, boolean, boolean) TO authenticated;

-- ---------- LEDGER -------------------------------------------------------
INSERT INTO public.migration_marks(version) VALUES ('20260902090000') ON CONFLICT DO NOTHING;