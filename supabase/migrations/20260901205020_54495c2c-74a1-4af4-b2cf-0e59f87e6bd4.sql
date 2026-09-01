-- Phase U4k — entity (content-name) BULK APPROVAL.
--
-- Walk findings (om/ti): the Data scope could machine-fill 129 content names
-- but had no way to approve them, so nothing ever reached the public bundle.
--
-- ENTITY LAYER HAS NO FLAG/REVISION MACHINERY. `entity_translations` carries a
-- `flagged` column for shape parity with `ui_translations`, but there is no
-- `entity_translation_revisions` table and no flag workflow: nothing captures a
-- prior value, and no surface can raise a flag. This writer therefore approves
-- every ('machine','edited') row and reports ONE count. When the entity layer
-- grows revisions/flags, this writer gains capture-before-mutate like its UI
-- twin (F5) — until then the absence is stated, never implied.
--
-- COUNT LAW (E6): zero rows is a legitimate answer — it approves zero and SAYS
-- zero; it is never reported as success-with-unknown or suppressed.
--
-- Definer law (INC-074): every SECURITY DEFINER function declared here states
-- its REVOKE/GRANT in this same file; the touched RPC family's grants are
-- restated and read back in the proof block.

-- ---------------------------------------------------------------------------
-- A. Internal writer. Split from its gate for the same reason as the UI twin
--    (U4g): require_step_up_if_needed() demands a live TOTP amr claim that a
--    migration's own proof block cannot have. NO client role may execute it.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.approve_all_entity_translations_impl(p_lang text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_base     text;
  v_approved int := 0;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.languages l WHERE l.code = p_lang) THEN
    RAISE EXCEPTION 'unknown language';
  END IF;
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    RAISE EXCEPTION 'base language rows are sync-owned';
  END IF;

  UPDATE public.entity_translations t
     SET status = 'approved',
         approved_by = auth.uid(), approved_at = now(),
         updated_by = auth.uid(), updated_at = now()
   WHERE t.lang_code = p_lang
     AND t.status IN ('machine', 'edited');
  GET DIAGNOSTICS v_approved = ROW_COUNT;

  PERFORM public.log_audit('entity_translation.approve_all', 'entity_translations', p_lang,
    jsonb_build_object('lang', p_lang, 'approved', v_approved));

  RETURN jsonb_build_object('approved', v_approved);
END $$;

REVOKE ALL ON FUNCTION public.approve_all_entity_translations_impl(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.approve_all_entity_translations_impl(text) TO service_role;

-- ---------------------------------------------------------------------------
-- B. The only reachable entry point: gates FIRST (permission -> step-up ->
--    scope), then the writer (F5).
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_approve_all_entity_translations(p_lang text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'approve') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'approve');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;
  RETURN public.approve_all_entity_translations_impl(p_lang);
END $$;

REVOKE ALL ON FUNCTION public.admin_approve_all_entity_translations(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_approve_all_entity_translations(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_approve_all_entity_translations(text) TO service_role;

-- Grants restated for the rest of the entity console family (INC-074).
REVOKE ALL ON FUNCTION public.admin_entity_translation_stats(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_entity_translation_stats(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_entity_translation_stats(text) TO service_role;
GRANT ALL ON public.entity_translations TO service_role;

-- ---------------------------------------------------------------------------
-- C. PROOFS — a scratch language, seeded and reaped in-block.
-- ---------------------------------------------------------------------------
DO $proof$
DECLARE
  v_lang    text := 'zxx-ak';
  v_ids     uuid[];
  v_res     jsonb;
  v_meta    jsonb;
  v_base    text;
  v_left    int;
  v_refused boolean := false;
BEGIN
  INSERT INTO public.languages (code, name_en, name_native, rtl, sort)
  VALUES (v_lang, 'Approve Fence', 'Approve Fence', false, public.next_language_sort())
  ON CONFLICT (code) DO NOTHING;
  DELETE FROM public.entity_translations WHERE lang_code = v_lang;

  SELECT array_agg(id) INTO v_ids
    FROM (SELECT id FROM public.categories WHERE is_active ORDER BY id LIMIT 3) s;
  IF v_ids IS NULL OR array_length(v_ids, 1) < 3 THEN
    RAISE EXCEPTION 'PROOF FAILED: fewer than three active categories to seed';
  END IF;

  -- 2 machine + 1 edited.
  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine)
  VALUES ('category', v_ids[1], 'name', v_lang, 'p1', 'machine', true),
         ('category', v_ids[2], 'name', v_lang, 'p2', 'machine', true),
         ('category', v_ids[3], 'name', v_lang, 'p3', 'edited',  false);

  v_res := public.approve_all_entity_translations_impl(v_lang);
  IF (v_res->>'approved')::int <> 3 THEN
    RAISE EXCEPTION 'PROOF FAILED: approved=% expected 3', v_res->>'approved';
  END IF;

  SELECT count(*) INTO v_left FROM public.entity_translations
   WHERE lang_code = v_lang AND status <> 'approved';
  IF v_left <> 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: % rows left unapproved', v_left;
  END IF;

  SELECT meta INTO v_meta FROM public.audit_log
   WHERE action = 'entity_translation.approve_all' AND entity_id = v_lang
   ORDER BY created_at DESC LIMIT 1;
  IF v_meta IS NULL OR (v_meta->>'approved')::int <> 3 OR v_meta->>'lang' <> v_lang THEN
    RAISE EXCEPTION 'PROOF FAILED: audit meta % does not match', v_meta;
  END IF;

  -- E6: a second run approves ZERO and says so.
  v_res := public.approve_all_entity_translations_impl(v_lang);
  IF (v_res->>'approved')::int <> 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: idempotent run approved %', v_res->>'approved';
  END IF;

  -- The base language is refused.
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  BEGIN
    PERFORM public.approve_all_entity_translations_impl(v_base);
  EXCEPTION WHEN OTHERS THEN
    v_refused := true;
  END;
  IF NOT v_refused THEN
    RAISE EXCEPTION 'PROOF FAILED: the base language was not refused';
  END IF;

  -- Grants read back: anon has none; authenticated reaches the gate only.
  IF has_function_privilege('anon', 'public.admin_approve_all_entity_translations(text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.approve_all_entity_translations_impl(text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.approve_all_entity_translations_impl(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF FAILED: a client role can reach the ungated writer';
  END IF;
  IF NOT (has_function_privilege('authenticated', 'public.admin_approve_all_entity_translations(text)', 'EXECUTE')
      AND has_function_privilege('service_role', 'public.admin_approve_all_entity_translations(text)', 'EXECUTE')
      AND has_function_privilege('authenticated', 'public.admin_entity_translation_stats(text)', 'EXECUTE')) THEN
    RAISE EXCEPTION 'PROOF FAILED: expected EXECUTE grant missing';
  END IF;

  RAISE NOTICE 'U4k approve-all proof OK: 3 approved, zero-run reported zero, base refused';

  -- Scratch reaped (J3 discipline applies to migrations too).
  DELETE FROM public.entity_translations WHERE lang_code = v_lang;
  DELETE FROM public.languages WHERE code = v_lang;
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260902070000') ON CONFLICT DO NOTHING;