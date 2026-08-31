-- =====================================================================
-- Phase U4g — bulk approval, language order, orphan handling (Tier A).
--
-- Declared-mark law (DEC-022 / INC-094): the last statement declares the mark.
-- Definer law (INC-074): every re-declared seam restates its REVOKE/GRANT.
-- Writer law (F5): gates -> capture -> mutate, in that order, in every writer.
-- =====================================================================

-- ---------------------------------------------------------------------
-- A. ui_translations.orphaned — keys the code no longer ships.
-- ---------------------------------------------------------------------
ALTER TABLE public.ui_translations
  ADD COLUMN IF NOT EXISTS orphaned boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS ui_translations_orphaned_idx
  ON public.ui_translations (lang_code, orphaned);

-- Grants restated for the touched table (client roles stay definer-only).
GRANT ALL ON public.ui_translations TO service_role;

-- ---------------------------------------------------------------------
-- B. admin_approve_all_translations — flag-safe bulk approval.
--
-- The MUTATION lives in an internal writer so the migration's own proofs can
-- exercise real behaviour: require_step_up_if_needed() demands a fresh TOTP
-- amr claim on a live session, which cannot exist inside a migration. The
-- internal writer is executable by NO client role; the gated wrapper below is
-- the only reachable entry point, and it is the single authority (F3).
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.approve_all_translations_impl(p_lang text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
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

  -- Flagged rows are SKIPPED, never approved (U4f law).
  SELECT count(*) INTO v_skipped
    FROM public.ui_translations t
   WHERE t.lang_code = p_lang
     AND t.status IN ('machine', 'edited')
     AND t.flagged AND NOT t.orphaned;

  -- CAPTURE before MUTATE: one revision per row, action 'approve'.
  INSERT INTO public.ui_translation_revisions
    (key, lang_code, prev_value, prev_status, prev_machine, action, changed_by)
  SELECT t.key, t.lang_code, t.value, t.status, COALESCE(t.machine, false),
         'approve', auth.uid()
    FROM public.ui_translations t
   WHERE t.lang_code = p_lang
     AND t.status IN ('machine', 'edited')
     AND NOT t.flagged AND NOT t.orphaned;

  UPDATE public.ui_translations t
     SET status = 'approved', approved_by = auth.uid(), approved_at = now(),
         updated_by = auth.uid(), updated_at = now()
   WHERE t.lang_code = p_lang
     AND t.status IN ('machine', 'edited')
     AND NOT t.flagged AND NOT t.orphaned;
  GET DIAGNOSTICS v_approved = ROW_COUNT;

  PERFORM public.log_audit('translation.approve_all', 'ui_translations', p_lang,
    jsonb_build_object('lang', p_lang, 'action', 'approve_all', 'machine', false,
                       'approved', v_approved, 'skipped_flagged', v_skipped));

  RETURN jsonb_build_object('approved', v_approved, 'skipped_flagged', v_skipped);
END $$;
REVOKE ALL ON FUNCTION public.approve_all_translations_impl(text) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.admin_approve_all_translations(p_lang text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'approve') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'approve');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;
  RETURN public.approve_all_translations_impl(p_lang);
END $$;
REVOKE ALL ON FUNCTION public.admin_approve_all_translations(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_approve_all_translations(text) TO authenticated;

-- ---------------------------------------------------------------------
-- C. admin_set_language_order — the roster order the switcher follows.
-- Same split as B: internal writer + gated wrapper.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_language_order_impl(p_codes text[])
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_codes text[];
  v_old   jsonb;
  v_new   jsonb;
BEGIN
  v_codes := COALESCE(p_codes, ARRAY[]::text[]);
  IF array_length(v_codes, 1) IS NULL THEN
    RAISE EXCEPTION 'no language codes given';
  END IF;
  IF EXISTS (
    SELECT 1 FROM unnest(v_codes) c
     WHERE NOT EXISTS (SELECT 1 FROM public.languages l WHERE l.code = c)
  ) THEN
    RAISE EXCEPTION 'unknown language';
  END IF;

  SELECT jsonb_agg(x.code ORDER BY x.sort, x.code) INTO v_old
    FROM (SELECT l.code, l.sort FROM public.languages l) x;

  UPDATE public.languages l
     SET sort = pos.ord::int - 1, updated_at = now()
    FROM unnest(v_codes) WITH ORDINALITY AS pos(code, ord)
   WHERE l.code = pos.code;

  -- Everyone not named keeps their relative order, after the named block.
  WITH rest AS (
    SELECT l.code, row_number() OVER (ORDER BY l.sort, l.code) AS rn
      FROM public.languages l
     WHERE NOT (l.code = ANY (v_codes))
  )
  UPDATE public.languages l
     SET sort = array_length(v_codes, 1) + rest.rn::int - 1, updated_at = now()
    FROM rest
   WHERE l.code = rest.code;

  SELECT jsonb_agg(x.code ORDER BY x.sort, x.code) INTO v_new
    FROM (SELECT l.code, l.sort FROM public.languages l) x;

  PERFORM public.log_audit('translation.language_order', 'languages', 'roster',
    jsonb_build_object('action', 'order', 'machine', false,
                       'old', v_old, 'new', v_new));
END $$;
REVOKE ALL ON FUNCTION public.set_language_order_impl(text[]) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.admin_set_language_order(p_codes text[])
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');
  PERFORM public.set_language_order_impl(p_codes);
END $$;
REVOKE ALL ON FUNCTION public.admin_set_language_order(text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_language_order(text[]) TO authenticated;

-- ---------------------------------------------------------------------
-- D. admin_sync_ui_keys — the ingested catalog defines the LIVE key set.
--    Keys absent from it are orphaned; returning keys clear the flag.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.ui_sync_mark_orphans(p_en jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_orphaned bigint := 0; v_restored bigint := 0;
BEGIN
  UPDATE public.ui_translations t
     SET orphaned = true, updated_at = now()
   WHERE NOT t.orphaned AND NOT (p_en ? t.key);
  GET DIAGNOSTICS v_orphaned = ROW_COUNT;

  UPDATE public.ui_translations t
     SET orphaned = false, updated_at = now()
   WHERE t.orphaned AND (p_en ? t.key);
  GET DIAGNOSTICS v_restored = ROW_COUNT;

  RETURN jsonb_build_object('orphaned', v_orphaned, 'restored', v_restored);
END $$;
REVOKE ALL ON FUNCTION public.ui_sync_mark_orphans(jsonb) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.admin_sync_ui_keys(p_en jsonb, p_am jsonb DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_base     text;
  v_en       bigint := 0;
  v_am       bigint := 0;
  v_added    jsonb := '{}'::jsonb;
  v_lang     record;
  v_n        bigint;
  v_orphaned bigint := 0;
  v_restored bigint := 0;
  v_marks    jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');
  IF jsonb_typeof(COALESCE(p_en, 'null'::jsonb)) <> 'object' THEN
    RAISE EXCEPTION 'p_en must be a json object';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      updated_by, updated_at, approved_by, approved_at)
  SELECT e.key, v_base, e.value, 'approved', false, auth.uid(), now(), auth.uid(), now()
    FROM jsonb_each_text(p_en) AS e(key, value)
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'approved',
        updated_by = auth.uid(), updated_at = now();
  GET DIAGNOSTICS v_en = ROW_COUNT;

  FOR v_lang IN
    SELECT l.code FROM public.languages l WHERE l.enabled_admin AND NOT l.is_base
  LOOP
    INSERT INTO public.ui_translations (key, lang_code, status)
    SELECT e.key, v_lang.code, 'untranslated'
      FROM jsonb_each_text(p_en) AS e(key, value)
    ON CONFLICT (key, lang_code) DO NOTHING;
    GET DIAGNOSTICS v_n = ROW_COUNT;
    v_added := v_added || jsonb_build_object(v_lang.code, v_n);
  END LOOP;

  IF p_am IS NOT NULL AND jsonb_typeof(p_am) = 'object' THEN
    UPDATE public.ui_translations t
       SET value = a.value, status = 'approved', machine = false, flagged = false,
           flag_note = NULL, updated_by = auth.uid(), updated_at = now(),
           approved_by = auth.uid(), approved_at = now()
      FROM jsonb_each_text(p_am) AS a(key, value)
     WHERE t.lang_code = 'am' AND t.key = a.key
       AND (t.status = 'untranslated' OR t.value IS NULL OR t.value = '');
    GET DIAGNOSTICS v_am = ROW_COUNT;
  END IF;

  -- ORPHAN MARKING: the payload is the catalog. Absent keys are orphaned in
  -- EVERY language; a key that returns clears the flag everywhere.
  v_marks := public.ui_sync_mark_orphans(p_en);
  v_orphaned := (v_marks->>'orphaned')::bigint;
  v_restored := (v_marks->>'restored')::bigint;

  PERFORM public.log_audit('translation.sync', 'ui_translations', v_base,
    jsonb_build_object('lang', v_base, 'action', 'sync', 'machine', false,
                       'en_upserted', v_en, 'keys_added_per_lang', v_added,
                       'am_seeded', v_am, 'orphaned', v_orphaned,
                       'orphans_restored', v_restored));

  RETURN jsonb_build_object('en_upserted', v_en, 'keys_added_per_lang', v_added,
                            'am_seeded', v_am, 'orphaned', v_orphaned,
                            'orphans_restored', v_restored);
END $$;
REVOKE ALL ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) TO authenticated;

-- ---------------------------------------------------------------------
-- E. Readers/gates EXCLUDE orphaned rows.
-- ---------------------------------------------------------------------

-- E1. The shipped bundle.
CREATE OR REPLACE FUNCTION public.get_ui_bundle(p_lang text)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v_ok boolean;
BEGIN
  SELECT (l.enabled_public OR l.is_base) INTO v_ok
    FROM public.languages l WHERE l.code = p_lang;
  IF v_ok IS NOT TRUE THEN
    RETURN '{}'::jsonb; -- D3 fallback law: client keeps the compiled catalog.
  END IF;
  RETURN COALESCE((
    SELECT jsonb_object_agg(t.key, t.value)
      FROM public.ui_translations t
     WHERE t.lang_code = p_lang AND t.status = 'approved'
       AND t.value IS NOT NULL AND NOT t.orphaned
  ), '{}'::jsonb);
END $$;
REVOKE ALL ON FUNCTION public.get_ui_bundle(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_ui_bundle(text) TO anon, authenticated;

-- E2. Coverage meter — orphans excluded, and reported separately.
DROP FUNCTION IF EXISTS public.admin_translation_stats(text);
CREATE OR REPLACE FUNCTION public.admin_translation_stats(p_lang text DEFAULT NULL)
RETURNS TABLE (
  lang_code text, total bigint, untranslated bigint, machine_count bigint,
  edited bigint, approved bigint, flagged bigint, orphaned bigint,
  reviewable bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
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
         count(*) FILTER (WHERE NOT t.orphaned AND NOT t.flagged
                            AND t.status IN ('machine', 'edited'))
    FROM public.ui_translations t
   WHERE p_lang IS NULL OR t.lang_code = p_lang
   GROUP BY t.lang_code
   ORDER BY t.lang_code;
END $$;
REVOKE ALL ON FUNCTION public.admin_translation_stats(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_translation_stats(text) TO authenticated;

-- E3. Publication gate — an orphaned key can never block publication.
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
      FROM public.ui_translations t
     WHERE t.lang_code = v_base AND NOT t.orphaned;
    -- EMPTY-SET LAW (INC-095h): zero live source keys is a refusal.
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
END $$;
REVOKE ALL ON FUNCTION public.admin_set_language_flags(text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_language_flags(text, boolean, boolean) TO authenticated;

-- E4. Console list gains p_orphaned. The old 6-arg signature is DROPPED so no
--     overload ambiguity can reach PostgREST.
DROP FUNCTION IF EXISTS public.admin_list_translations(text, text, boolean, text, int, int);
CREATE OR REPLACE FUNCTION public.admin_list_translations(
  p_lang text,
  p_status text DEFAULT NULL,
  p_flagged boolean DEFAULT NULL,
  p_search text DEFAULT NULL,
  p_limit int DEFAULT 50,
  p_offset int DEFAULT 0,
  p_orphaned boolean DEFAULT NULL)
RETURNS TABLE (
  key text, lang_code text, value text, source_value text, status text,
  machine boolean, flagged boolean, flag_note text,
  updated_by uuid, updated_at timestamptz,
  approved_by uuid, approved_at timestamptz, orphaned boolean,
  total_count bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
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
       -- NULL means "the live catalog": orphans are hidden unless asked for.
       AND t.orphaned = COALESCE(p_orphaned, false)
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
END $$;
REVOKE ALL ON FUNCTION public.admin_list_translations(text, text, boolean, text, int, int, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_translations(text, text, boolean, text, int, int, boolean) TO authenticated;

-- ---------------------------------------------------------------------
-- PROOFS — dynamic principals, loud failure, scratch rows cleaned up.
-- ---------------------------------------------------------------------

-- P1: approve-all on a scratch language — 3 machine approved (3 revisions),
--     1 flagged skipped. P2: the base language is refused.
DO $p1$
DECLARE
  v_super uuid; v_base text; v_res jsonb; v_rev bigint; v_ok boolean; v_msg text;
  v_lang text := 'qzz';
  v_keys text[] := ARRAY['e2e.proof.u4g.k1','e2e.proof.u4g.k2',
                         'e2e.proof.u4g.k3','e2e.proof.u4g.flagged'];
BEGIN
  SELECT ur.user_id INTO v_super FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id WHERE r.name = 'super_admin' LIMIT 1;
  IF v_super IS NULL THEN RAISE EXCEPTION 'P1 FAILED: no superadmin principal'; END IF;
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;

  INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
  VALUES (v_lang, 'U4g Proof', 'U4g Proof', true, false, 900)
  ON CONFLICT (code) DO NOTHING;

  INSERT INTO public.ui_translations(key, lang_code, value, status)
  SELECT k, v_base, 'Proof source', 'approved' FROM unnest(v_keys) k
  ON CONFLICT (key, lang_code) DO NOTHING;

  INSERT INTO public.ui_translations(key, lang_code, value, status, machine, flagged)
  VALUES (v_keys[1], v_lang, 'm1', 'machine', true, false),
         (v_keys[2], v_lang, 'm2', 'machine', true, false),
         (v_keys[3], v_lang, 'e3', 'edited',  false, false),
         (v_keys[4], v_lang, 'f4', 'machine', true, true)
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = EXCLUDED.status,
        machine = EXCLUDED.machine, flagged = EXCLUDED.flagged;

  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);

  v_res := public.approve_all_translations_impl(v_lang);
  IF (v_res->>'approved')::int <> 3 OR (v_res->>'skipped_flagged')::int <> 1 THEN
    RAISE EXCEPTION 'P1 FAILED: %', v_res;
  END IF;
  IF (SELECT count(*) FROM public.ui_translations t
       WHERE t.lang_code = v_lang AND t.status = 'approved') <> 3 THEN
    RAISE EXCEPTION 'P1 FAILED: approved row count wrong';
  END IF;
  IF (SELECT status FROM public.ui_translations
       WHERE key = v_keys[4] AND lang_code = v_lang) <> 'machine' THEN
    RAISE EXCEPTION 'P1 FAILED: flagged row was approved';
  END IF;
  SELECT count(*) INTO v_rev FROM public.ui_translation_revisions
   WHERE lang_code = v_lang AND action = 'approve';
  IF v_rev <> 3 THEN RAISE EXCEPTION 'P1 FAILED: % approve revisions', v_rev; END IF;
  RAISE NOTICE 'P1 OK: 3 approved with 3 revisions, 1 flagged skipped.';

  -- P2: base refused.
  v_ok := false;
  BEGIN
    PERFORM public.approve_all_translations_impl(v_base);
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg ILIKE '%sync-owned%' THEN v_ok := true; END IF;
  END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P2 FAILED: base not refused (%)', v_msg; END IF;
  RAISE NOTICE 'P2 OK: base language refused (%).', v_msg;

  PERFORM set_config('request.jwt.claims', NULL, true);

  DELETE FROM public.ui_translation_revisions WHERE lang_code = v_lang;
  DELETE FROM public.ui_translations WHERE key = ANY (v_keys);
  DELETE FROM public.languages WHERE code = v_lang;
  IF EXISTS (SELECT 1 FROM public.ui_translations WHERE key = ANY (v_keys)) THEN
    RAISE EXCEPTION 'P1/P2 FAILED: cleanup left scratch rows behind';
  END IF;
  RAISE NOTICE 'P1/P2 cleanup OK.';
END $p1$;

-- P3: reorder writes sort by array position and audits old -> new.
DO $p3$
DECLARE
  v_super uuid; v_before text[]; v_codes text[]; v_after text[]; v_audit bigint;
BEGIN
  SELECT ur.user_id INTO v_super FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id WHERE r.name = 'super_admin' LIMIT 1;
  SELECT array_agg(l.code ORDER BY l.sort, l.code) INTO v_before FROM public.languages l;
  IF array_length(v_before, 1) < 2 THEN
    RAISE NOTICE 'P3 SKIPPED: fewer than two languages.'; RETURN;
  END IF;
  v_codes := ARRAY[v_before[2], v_before[1]];

  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
  PERFORM public.set_language_order_impl(v_codes);

  IF (SELECT sort FROM public.languages WHERE code = v_codes[1]) <> 0
     OR (SELECT sort FROM public.languages WHERE code = v_codes[2]) <> 1 THEN
    RAISE EXCEPTION 'P3 FAILED: sort not written by array position';
  END IF;
  SELECT array_agg(l.code ORDER BY l.sort, l.code) INTO v_after FROM public.languages l;
  IF v_after[1] <> v_codes[1] OR v_after[2] <> v_codes[2] THEN
    RAISE EXCEPTION 'P3 FAILED: order is % (wanted % first)', v_after, v_codes;
  END IF;
  SELECT count(*) INTO v_audit FROM public.audit_log
   WHERE action = 'translation.language_order';
  IF v_audit < 1 THEN RAISE EXCEPTION 'P3 FAILED: no audit entry'; END IF;

  -- restore the original order
  PERFORM public.set_language_order_impl(v_before);
  PERFORM set_config('request.jwt.claims', NULL, true);
  SELECT array_agg(l.code ORDER BY l.sort, l.code) INTO v_after FROM public.languages l;
  IF v_after IS DISTINCT FROM v_before THEN
    RAISE EXCEPTION 'P3 FAILED: original order not restored (% vs %)', v_after, v_before;
  END IF;
  RAISE NOTICE 'P3 OK: order written by position, audited, restored.';
END $p3$;

-- P4: a shrunken payload orphans the missing key; stats exclude it; a re-sync
--     containing it clears the flag. The payload is built FROM the live base
--     catalog, so nothing real is orphaned by this proof.
DO $p4$
DECLARE
  v_super uuid; v_base text; v_key text := 'e2e.proof.u4g.orphan';
  v_full jsonb; v_short jsonb; v_total_before bigint; v_total_after bigint;
BEGIN
  SELECT ur.user_id INTO v_super FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id WHERE r.name = 'super_admin' LIMIT 1;
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;

  INSERT INTO public.ui_translations(key, lang_code, value, status)
  VALUES (v_key, v_base, 'Orphan proof', 'approved')
  ON CONFLICT (key, lang_code) DO NOTHING;

  SELECT COALESCE(jsonb_object_agg(t.key, COALESCE(t.value, '')), '{}'::jsonb)
    INTO v_full FROM public.ui_translations t WHERE t.lang_code = v_base;
  v_short := v_full - v_key;

  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);

  SELECT s.total INTO v_total_before
    FROM public.admin_translation_stats(v_base) s WHERE s.lang_code = v_base;

  PERFORM public.ui_sync_mark_orphans(v_short);
  IF NOT (SELECT orphaned FROM public.ui_translations
           WHERE key = v_key AND lang_code = v_base) THEN
    RAISE EXCEPTION 'P4 FAILED: absent key was not orphaned';
  END IF;
  SELECT s.total INTO v_total_after
    FROM public.admin_translation_stats(v_base) s WHERE s.lang_code = v_base;
  IF v_total_after <> v_total_before - 1 THEN
    RAISE EXCEPTION 'P4 FAILED: stats did not exclude the orphan (% -> %)',
      v_total_before, v_total_after;
  END IF;

  PERFORM public.ui_sync_mark_orphans(v_full);
  IF (SELECT orphaned FROM public.ui_translations
       WHERE key = v_key AND lang_code = v_base) THEN
    RAISE EXCEPTION 'P4 FAILED: returning key did not clear the flag';
  END IF;
  IF (SELECT count(*) FROM public.ui_translations WHERE orphaned) <> 0 THEN
    RAISE EXCEPTION 'P4 FAILED: orphans remain after the restoring sync';
  END IF;

  PERFORM set_config('request.jwt.claims', NULL, true);
  DELETE FROM public.ui_translation_revisions WHERE key = v_key;
  DELETE FROM public.ui_translations WHERE key = v_key;
  RAISE NOTICE 'P4 OK: orphan marked, excluded, then restored; scratch cleaned.';
END $p4$;

-- P5: grant read-backs for every seam this migration declares.
DO $p5$
DECLARE r record;
BEGIN
  FOR r IN SELECT unnest(ARRAY[
      'public.admin_approve_all_translations(text)',
      'public.admin_set_language_order(text[])',
      'public.admin_sync_ui_keys(jsonb,jsonb)',
      'public.admin_translation_stats(text)',
      'public.admin_set_language_flags(text,boolean,boolean)',
      'public.admin_list_translations(text,text,boolean,text,int,int,boolean)'
    ]) AS sig
  LOOP
    IF has_function_privilege('anon', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'P5 FAILED: anon can execute %', r.sig;
    END IF;
    IF NOT has_function_privilege('authenticated', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'P5 FAILED: authenticated cannot execute %', r.sig;
    END IF;
  END LOOP;
  IF NOT has_function_privilege('anon', 'public.get_ui_bundle(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P5 FAILED: anon lost get_ui_bundle';
  END IF;
  RAISE NOTICE 'P5 OK: grants read back as declared.';
END $p5$;

INSERT INTO public.migration_marks(version) VALUES ('20260831070000') ON CONFLICT DO NOTHING;