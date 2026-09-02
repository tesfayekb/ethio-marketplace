-- ============================================================
-- U4i-4 — LANGUAGE DELETION (destructive, typed-confirm surface)
-- One writer + one preview reader. Base and published languages are refused.
-- ============================================================

-- ---------- PREVIEW (read-only counts for the confirm dialog) ----------
CREATE OR REPLACE FUNCTION public.admin_language_delete_preview(p_code text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_is_base boolean; v_public boolean;
  c_assign bigint; c_ui bigint; c_entity bigint; c_rev bigint;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  SELECT l.is_base, l.enabled_public INTO v_is_base, v_public
    FROM public.languages l WHERE l.code = p_code;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown language'; END IF;

  SELECT count(*) INTO c_assign FROM public.translator_languages WHERE lang_code = p_code;
  SELECT count(*) INTO c_ui     FROM public.ui_translations       WHERE lang_code = p_code;
  SELECT count(*) INTO c_entity FROM public.entity_translations   WHERE lang_code = p_code;
  SELECT count(*) INTO c_rev    FROM public.ui_translation_revisions WHERE lang_code = p_code;

  RETURN jsonb_build_object(
    'code', p_code,
    'is_base', v_is_base,
    'enabled_public', v_public,
    'assignments', COALESCE(c_assign, 0),
    'ui_rows', COALESCE(c_ui, 0),
    'entity_rows', COALESCE(c_entity, 0),
    'revisions', COALESCE(c_rev, 0)
  );
END $function$;

REVOKE ALL ON FUNCTION public.admin_language_delete_preview(text) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_language_delete_preview(text) TO authenticated;

-- ---------- WRITER ------------------------------------------------------
-- Writer order (F5): gates (permission -> step-up -> refusals) -> capture
-- (counts) -> mutate -> ONE audit entry. A refused attempt leaves no trace.
CREATE OR REPLACE FUNCTION public.admin_delete_language(p_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_is_base boolean; v_public boolean;
  c_assign bigint; c_ui bigint; c_entity bigint; c_rev bigint;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');

  SELECT l.is_base, l.enabled_public INTO v_is_base, v_public
    FROM public.languages l WHERE l.code = p_code;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown language'; END IF;

  IF v_is_base THEN
    RAISE EXCEPTION 'the base language cannot be deleted';
  END IF;
  IF v_public THEN
    RAISE EXCEPTION 'language is published — unpublish it first, then delete';
  END IF;

  WITH d AS (
    DELETE FROM public.ui_translation_revisions WHERE lang_code = p_code RETURNING 1
  ) SELECT count(*) INTO c_rev FROM d;

  WITH d AS (
    DELETE FROM public.ui_translations WHERE lang_code = p_code RETURNING 1
  ) SELECT count(*) INTO c_ui FROM d;

  WITH d AS (
    DELETE FROM public.entity_translations WHERE lang_code = p_code RETURNING 1
  ) SELECT count(*) INTO c_entity FROM d;

  WITH d AS (
    DELETE FROM public.translator_languages WHERE lang_code = p_code RETURNING 1
  ) SELECT count(*) INTO c_assign FROM d;

  DELETE FROM public.languages WHERE code = p_code;

  PERFORM public.log_audit('translation.language_delete', 'languages', p_code,
    jsonb_build_object(
      'lang', p_code,
      'action', 'delete',
      'machine', false,
      'assignments', COALESCE(c_assign, 0),
      'ui_rows', COALESCE(c_ui, 0),
      'entity_rows', COALESCE(c_entity, 0),
      'revisions', COALESCE(c_rev, 0)
    ));

  RETURN jsonb_build_object(
    'code', p_code,
    'assignments', COALESCE(c_assign, 0),
    'ui_rows', COALESCE(c_ui, 0),
    'entity_rows', COALESCE(c_entity, 0),
    'revisions', COALESCE(c_rev, 0)
  );
END $function$;

REVOKE ALL ON FUNCTION public.admin_delete_language(text) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_delete_language(text) TO authenticated;

-- ---------- LEDGER -------------------------------------------------------
INSERT INTO public.migration_marks(version) VALUES ('20260902120000') ON CONFLICT DO NOTHING;