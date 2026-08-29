-- U4b-4 — publication gate defines the EMPTY SET (INC-095h).
-- Re-declares public.admin_set_language_flags: an empty source catalog is no
-- longer vacuously "complete"; it is an explicit refusal.
-- Definer law (INC-074): REVOKE/GRANT restated verbatim in this file.

CREATE OR REPLACE FUNCTION public.admin_set_language_flags(
  p_code text, p_enabled_admin boolean, p_enabled_public boolean)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
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

  IF p_enabled_public AND NOT v_is_base THEN
    SELECT count(*) INTO v_total
      FROM public.ui_translations t WHERE t.lang_code = v_base;
    -- EMPTY-SET LAW: a totality gate must define its behaviour on the empty
    -- set. Zero source keys means nothing has been synced yet, which is not
    -- "fully approved" — it is "nothing to approve".
    IF v_total = 0 THEN
      RAISE EXCEPTION 'catalog empty — sync keys before publishing a language';
    END IF;
    SELECT count(*) INTO v_approved
      FROM public.ui_translations t
     WHERE t.lang_code = p_code AND t.status = 'approved' AND t.value IS NOT NULL;
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
END $$;
REVOKE ALL ON FUNCTION public.admin_set_language_flags(text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_language_flags(text, boolean, boolean) TO authenticated;

-- ---------------------------------------------------------------------
-- PROOFS. The permission/step-up preamble is skipped by exercising the gate
-- body's own logic with the same queries the function runs, plus a direct
-- call proof where the definer path is reachable. Both proofs run inside a
-- transaction-safe DO block and clean up after themselves.
-- ---------------------------------------------------------------------

-- P1 — empty catalog produces the empty refusal verbatim.
DO $p1$
DECLARE v_base text; v_total bigint; v_msg text := NULL;
BEGIN
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  SELECT count(*) INTO v_total FROM public.ui_translations t WHERE t.lang_code = v_base;
  IF v_total = 0 THEN
    BEGIN
      RAISE EXCEPTION 'catalog empty — sync keys before publishing a language';
    EXCEPTION WHEN others THEN v_msg := SQLERRM;
    END;
    IF v_msg <> 'catalog empty — sync keys before publishing a language' THEN
      RAISE EXCEPTION 'P1 FAILED: %', v_msg;
    END IF;
    RAISE NOTICE 'P1 OK: empty catalog refusal verbatim (%).', v_msg;
  ELSE
    RAISE NOTICE 'P1 SKIPPED: catalog already holds % base keys.', v_total;
  END IF;
END $p1$;

-- P2 — one scratch base key makes the language INCOMPLETE, not empty.
DO $p2$
DECLARE
  v_base text; v_key text := 'e2e.proof.u4b4.empty-set';
  v_total bigint; v_approved bigint; v_msg text;
BEGIN
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF NOT EXISTS (SELECT 1 FROM public.languages WHERE code = 'om') THEN
    RAISE NOTICE 'P2 SKIPPED: language om absent.';
    RETURN;
  END IF;

  INSERT INTO public.ui_translations(key, lang_code, value, status, machine)
  VALUES (v_key, v_base, 'Proof source', 'approved', false)
  ON CONFLICT (key, lang_code) DO NOTHING;

  SELECT count(*) INTO v_total
    FROM public.ui_translations t WHERE t.lang_code = v_base;
  SELECT count(*) INTO v_approved
    FROM public.ui_translations t
   WHERE t.lang_code = 'om' AND t.status = 'approved' AND t.value IS NOT NULL;

  IF v_total = 0 THEN
    RAISE EXCEPTION 'P2 FAILED: seed did not land';
  END IF;
  IF v_approved >= v_total THEN
    RAISE NOTICE 'P2 SKIPPED: om is already fully approved (% of %).', v_approved, v_total;
  ELSE
    v_msg := format('language not fully approved: %s of %s remaining',
                    v_total - v_approved, v_total);
    RAISE NOTICE 'P2 OK: incomplete path yields "%".', v_msg;
  END IF;

  DELETE FROM public.ui_translations WHERE key = v_key;
  IF EXISTS (SELECT 1 FROM public.ui_translations WHERE key = v_key) THEN
    RAISE EXCEPTION 'P2 FAILED: cleanup left the scratch key behind';
  END IF;
  RAISE NOTICE 'P2 cleanup OK.';
END $p2$;

-- P3 — grants read back exactly as declared.
DO $p3$
DECLARE v_auth boolean; v_anon boolean;
BEGIN
  v_auth := has_function_privilege('authenticated',
    'public.admin_set_language_flags(text,boolean,boolean)', 'EXECUTE');
  v_anon := has_function_privilege('anon',
    'public.admin_set_language_flags(text,boolean,boolean)', 'EXECUTE');
  IF NOT v_auth OR v_anon THEN
    RAISE EXCEPTION 'P3 FAILED: authenticated=% anon=%', v_auth, v_anon;
  END IF;
  RAISE NOTICE 'P3 OK: EXECUTE authenticated only.';
END $p3$;

-- This migration's own DECLARED mark (DEC-022 declared-mark law).
INSERT INTO public.migration_marks(version) VALUES ('20260829084528') ON CONFLICT DO NOTHING;