-- U4f (INC-098): approve must refuse flagged rows.
-- Re-declares public.admin_set_translation_status with the flagged guard.
-- INC-074 law: re-declaring a definer seam restates its REVOKE/GRANT in-file.

CREATE OR REPLACE FUNCTION public.admin_set_translation_status(p_key text, p_lang text, p_action text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_flagged boolean;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'approve') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'approve');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;
  IF p_action NOT IN ('approve', 'clear') THEN
    RAISE EXCEPTION 'unknown translation action';
  END IF;

  IF p_action = 'approve' THEN
    SELECT t.flagged INTO v_flagged FROM public.ui_translations t
     WHERE t.key = p_key AND t.lang_code = p_lang;
    IF v_flagged IS NULL THEN RAISE EXCEPTION 'translation row not found'; END IF;
    IF v_flagged THEN
      RAISE EXCEPTION 'flagged rows cannot be approved — fix the placeholder first';
    END IF;

    UPDATE public.ui_translations
       SET status = 'approved', approved_by = auth.uid(), approved_at = now(),
           updated_by = auth.uid(), updated_at = now()
     WHERE key = p_key AND lang_code = p_lang;
  ELSE
    UPDATE public.ui_translations
       SET status = 'untranslated', value = NULL, machine = false,
           flagged = false, flag_note = NULL,
           approved_by = NULL, approved_at = NULL,
           updated_by = auth.uid(), updated_at = now()
     WHERE key = p_key AND lang_code = p_lang;
  END IF;
  IF NOT FOUND THEN RAISE EXCEPTION 'translation row not found'; END IF;

  PERFORM public.log_audit('translation.status', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', p_lang, 'action', p_action, 'machine', false));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_translation_status(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_translation_status(text, text, text) TO authenticated;

-- PROOF P1: the flagged guard is present in the installed definition.
DO $$
DECLARE v_def text;
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO v_def
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_set_translation_status';
  IF v_def IS NULL OR position('flagged rows cannot be approved' in v_def) = 0 THEN
    RAISE EXCEPTION 'P1 FAILED: flagged guard missing from admin_set_translation_status';
  END IF;
  RAISE NOTICE 'P1 OK: approve refuses flagged rows.';
END $$;

-- PROOF P2: ACL read-back — anon/PUBLIC cannot execute, authenticated can.
DO $$
BEGIN
  IF has_function_privilege('anon',
       'public.admin_set_translation_status(text, text, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P2 FAILED: anon can execute admin_set_translation_status';
  END IF;
  IF NOT has_function_privilege('authenticated',
       'public.admin_set_translation_status(text, text, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P2 FAILED: authenticated cannot execute admin_set_translation_status';
  END IF;
  RAISE NOTICE 'P2 OK: grants restated correctly.';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260831060000') ON CONFLICT DO NOTHING;