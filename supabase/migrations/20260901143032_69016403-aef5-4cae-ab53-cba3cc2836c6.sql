-- U4g-21 (INC-113) — ONE PREDICATE FOR COUNT AND ACTION.
--
-- `admin_translation_stats.reviewable` and `approve_all_translations_impl`'s
-- row predicate were two independent copies of the same rule. They agreed on
-- 2026-09-01, but a duplicated rule is a drift waiting to happen: the number an
-- operator reads and the rows the sweep touches must be the SAME definition.
--
-- reviewable := status IN ('machine','edited') AND NOT flagged AND NOT orphaned

CREATE OR REPLACE FUNCTION public.ui_translation_reviewable(
  p_status   text,
  p_flagged  boolean,
  p_orphaned boolean
) RETURNS boolean
LANGUAGE sql
IMMUTABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $$
  SELECT p_status IN ('machine', 'edited')
     AND NOT COALESCE(p_flagged, false)
     AND NOT COALESCE(p_orphaned, false)
$$;

REVOKE ALL ON FUNCTION public.ui_translation_reviewable(text, boolean, boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ui_translation_reviewable(text, boolean, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.ui_translation_reviewable(text, boolean, boolean) TO service_role;

-- The COUNT side.
CREATE OR REPLACE FUNCTION public.admin_translation_stats(p_lang text DEFAULT NULL::text)
 RETURNS TABLE(lang_code text, total bigint, untranslated bigint, machine_count bigint, edited bigint, approved bigint, flagged bigint, orphaned bigint, reviewable bigint)
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
  SELECT t.lang_code,
         count(*) FILTER (WHERE NOT t.orphaned),
         count(*) FILTER (WHERE NOT t.orphaned AND t.status = 'untranslated'),
         count(*) FILTER (WHERE NOT t.orphaned AND t.status = 'machine'),
         count(*) FILTER (WHERE NOT t.orphaned AND t.status = 'edited'),
         count(*) FILTER (WHERE NOT t.orphaned AND t.status = 'approved'),
         count(*) FILTER (WHERE NOT t.orphaned AND t.flagged),
         count(*) FILTER (WHERE t.orphaned),
         -- U4g-21: the SHARED definition, not a second copy.
         count(*) FILTER (WHERE public.ui_translation_reviewable(t.status, t.flagged, t.orphaned))
    FROM public.ui_translations t
   WHERE p_lang IS NULL OR t.lang_code = p_lang
   GROUP BY t.lang_code
   ORDER BY t.lang_code;
END $function$;

REVOKE ALL ON FUNCTION public.admin_translation_stats(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_translation_stats(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_translation_stats(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_translation_stats(text) TO service_role;

-- The ACTION side.
CREATE OR REPLACE FUNCTION public.approve_all_translations_impl(p_lang text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_base     text;
  v_approved int := 0;
  v_skipped  int := 0;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.languages l WHERE l.code = p_lang) THEN
    RAISE EXCEPTION 'unknown language';
  END IF;
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    RAISE EXCEPTION 'base language rows are sync-owned';
  END IF;

  -- Flagged rows are SKIPPED, never approved (U4f law): reviewable-but-for-the-flag.
  SELECT count(*) INTO v_skipped
    FROM public.ui_translations t
   WHERE t.lang_code = p_lang
     AND t.flagged
     AND public.ui_translation_reviewable(t.status, false, t.orphaned);

  -- CAPTURE before MUTATE: one revision per row, action 'approve'.
  INSERT INTO public.ui_translation_revisions
    (key, lang_code, prev_value, prev_status, prev_machine, action, changed_by)
  SELECT t.key, t.lang_code, t.value, t.status, COALESCE(t.machine, false),
         'approve', auth.uid()
    FROM public.ui_translations t
   WHERE t.lang_code = p_lang
     AND public.ui_translation_reviewable(t.status, t.flagged, t.orphaned);

  UPDATE public.ui_translations t
     SET status = 'approved', approved_by = auth.uid(), approved_at = now(),
         updated_by = auth.uid(), updated_at = now()
   WHERE t.lang_code = p_lang
     AND public.ui_translation_reviewable(t.status, t.flagged, t.orphaned);
  GET DIAGNOSTICS v_approved = ROW_COUNT;

  PERFORM public.log_audit('translation.approve_all', 'ui_translations', p_lang,
    jsonb_build_object('lang', p_lang, 'action', 'approve_all', 'machine', false,
                       'approved', v_approved, 'skipped_flagged', v_skipped));

  RETURN jsonb_build_object('approved', v_approved, 'skipped_flagged', v_skipped);
END $function$;

REVOKE ALL ON FUNCTION public.approve_all_translations_impl(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.approve_all_translations_impl(text) FROM anon;
REVOKE ALL ON FUNCTION public.approve_all_translations_impl(text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.approve_all_translations_impl(text) TO service_role;

INSERT INTO public.migration_marks(version) VALUES ('20260901150000') ON CONFLICT DO NOTHING;