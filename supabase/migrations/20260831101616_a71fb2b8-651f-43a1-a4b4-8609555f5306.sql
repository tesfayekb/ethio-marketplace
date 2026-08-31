-- U4g-10 (INC-103) — NULLABLE FILTER LAW.
-- `p_orphaned` collapsed to false via COALESCE, so an absent filter silently
-- meant "hide orphans" instead of "no filter". Every nullable list filter in
-- this function is written as (p IS NULL OR col = p); this one now matches.
CREATE OR REPLACE FUNCTION public.admin_list_translations(
  p_lang text,
  p_status text DEFAULT NULL::text,
  p_flagged boolean DEFAULT NULL::boolean,
  p_search text DEFAULT NULL::text,
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0,
  p_orphaned boolean DEFAULT NULL::boolean
)
RETURNS TABLE(
  key text, lang_code text, value text, source_value text, status text,
  machine boolean, flagged boolean, flag_note text, updated_by uuid,
  updated_at timestamptz, approved_by uuid, approved_at timestamptz,
  orphaned boolean, total_count bigint
)
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
           t.approved_by, t.approved_at, t.orphaned
      FROM public.ui_translations t
      LEFT JOIN public.ui_translations src
        ON src.key = t.key AND src.lang_code = (SELECT code FROM base)
     WHERE t.lang_code = p_lang
       -- NULL = no filter (both sets). The console always sends an explicit
       -- boolean, so the live view still hides orphans.
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
         f.approved_at, f.orphaned, COUNT(*) OVER () AS total_count
    FROM filtered f
   ORDER BY f.key
   LIMIT GREATEST(COALESCE(p_limit, 50), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_translations(text, text, boolean, text, integer, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_translations(text, text, boolean, text, integer, integer, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_translations(text, text, boolean, text, integer, integer, boolean) TO service_role;

-- PROOF. The function itself is gated on auth.uid(), which a migration session
-- does not have, so the proof exercises the corrected PREDICATE over the same
-- table with a live probe row: absent/false include it, true excludes it.
DO $proof$
DECLARE
  v_probe text := 'e2e.probe.u4g10';
  v_null int; v_false int; v_true int;
BEGIN
  INSERT INTO public.ui_translations(key, lang_code, value, status, machine, flagged, orphaned)
  VALUES (v_probe, 'am', NULL, 'untranslated', false, false, false)
  ON CONFLICT (key, lang_code) DO NOTHING;

  SELECT count(*) INTO v_null FROM public.ui_translations t
   WHERE t.lang_code = 'am' AND t.key = v_probe AND (NULL::boolean IS NULL OR t.orphaned = NULL::boolean);
  SELECT count(*) INTO v_false FROM public.ui_translations t
   WHERE t.lang_code = 'am' AND t.key = v_probe AND (false IS NULL OR t.orphaned = false);
  SELECT count(*) INTO v_true FROM public.ui_translations t
   WHERE t.lang_code = 'am' AND t.key = v_probe AND (true IS NULL OR t.orphaned = true);

  IF v_null <> 1 OR v_false <> 1 OR v_true <> 0 THEN
    RAISE EXCEPTION 'U4g-10 proof failed: null=% false=% true=%', v_null, v_false, v_true;
  END IF;
  RAISE NOTICE 'U4g-10 proof: absent=% false=% true=%', v_null, v_false, v_true;

  DELETE FROM public.ui_translations WHERE key = v_probe;
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260831120000') ON CONFLICT DO NOTHING;