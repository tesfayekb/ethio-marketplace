-- U4j-3 — Data scope enumerates the ENTITY UNIVERSE.
--
-- Walk finding: a language with no entity_translations rows showed an empty
-- Data scope. The list and the stats meter must both describe the UNIVERSE
-- (active categories + active locations, field 'name') LEFT JOINed to
-- entity_translations for the language; a missing row is 'untranslated'
-- (value NULL) and is therefore bulk-translatable.
--
-- Definer law (INC-074): every re-declared SECURITY DEFINER function restates
-- its REVOKE/GRANT lines in this same file.

-- 1) LIST — the universe, deterministic ---------------------------------------
-- The ONLY behavioural change against the live body: the ORDER BY gains the
-- entity id as a unique tiebreak. Without it, two locations sharing a name
-- (Bole, Bole) have no stable relative order, so LIMIT/OFFSET paging — which
-- the bulk collector walks page by page — could skip or repeat a row.
CREATE OR REPLACE FUNCTION public.admin_list_entity_translations(
  p_lang text, p_status text DEFAULT NULL, p_search text DEFAULT NULL,
  p_limit integer DEFAULT 50, p_offset integer DEFAULT 0)
RETURNS TABLE(entity_type text, entity_id uuid, field text, label text,
              source_value text, value text, status text, machine boolean,
              flagged boolean, flag_note text, updated_by uuid,
              updated_at timestamptz, approved_by uuid, approved_at timestamptz,
              total_count bigint)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  WITH universe AS (
    SELECT 'category'::text AS etype, c.id AS eid, 'name'::text AS efield,
           c.name_en AS elabel
      FROM public.categories c WHERE c.is_active
    UNION ALL
    SELECT 'location'::text, l.id, 'name'::text, l.name_en
      FROM public.locations l WHERE l.is_active
  ),
  joined AS (
    SELECT u.etype, u.eid, u.efield, u.elabel,
           t.value, COALESCE(t.status, 'untranslated') AS status,
           COALESCE(t.machine, false) AS machine,
           COALESCE(t.flagged, false) AS flagged,
           t.flag_note, t.updated_by, t.updated_at, t.approved_by, t.approved_at
      FROM universe u
      LEFT JOIN public.entity_translations t
        ON t.entity_type = u.etype AND t.entity_id = u.eid
       AND t.field = u.efield AND t.lang_code = p_lang
  ),
  filtered AS (
    SELECT * FROM joined j
     WHERE (p_status IS NULL OR p_status = '' OR p_status = 'all' OR j.status = p_status)
       AND (p_search IS NULL OR p_search = ''
            OR j.elabel ILIKE '%' || p_search || '%'
            OR COALESCE(j.value, '') ILIKE '%' || p_search || '%')
  )
  SELECT f.etype, f.eid, f.efield, f.elabel, f.elabel, f.value, f.status,
         f.machine, f.flagged, f.flag_note, f.updated_by, f.updated_at,
         f.approved_by, f.approved_at, COUNT(*) OVER () AS total_count
    FROM filtered f
   ORDER BY f.etype, f.elabel, f.eid
   LIMIT GREATEST(COALESCE(p_limit, 50), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $$;

REVOKE ALL ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) TO service_role;

-- 2) STATS — the same universe, restated --------------------------------------
-- total = active categories + active locations; untranslated = total minus the
-- existing rows whose status is not 'untranslated'.
CREATE OR REPLACE FUNCTION public.admin_entity_translation_stats(p_lang text DEFAULT NULL)
RETURNS TABLE(lang_code text, total bigint, approved bigint, machine_count bigint,
              edited bigint, untranslated bigint)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  WITH langs AS (
    SELECT l.code FROM public.languages l
     WHERE (p_lang IS NULL OR p_lang = '' OR l.code = p_lang)
       AND NOT l.is_base
  ),
  universe AS (
    SELECT 'category'::text AS etype, c.id AS eid FROM public.categories c WHERE c.is_active
    UNION ALL
    SELECT 'location'::text, l.id FROM public.locations l WHERE l.is_active
  ),
  joined AS (
    SELECT g.code,
           COALESCE(t.status, 'untranslated') AS status
      FROM langs g
      CROSS JOIN universe u
      LEFT JOIN public.entity_translations t
        ON t.entity_type = u.etype AND t.entity_id = u.eid
       AND t.field = 'name' AND t.lang_code = g.code
  )
  SELECT j.code,
         COUNT(*)::bigint,
         COUNT(*) FILTER (WHERE j.status = 'approved')::bigint,
         COUNT(*) FILTER (WHERE j.status = 'machine')::bigint,
         COUNT(*) FILTER (WHERE j.status = 'edited')::bigint,
         COUNT(*) FILTER (WHERE j.status = 'untranslated')::bigint
    FROM joined j
   GROUP BY j.code
   ORDER BY j.code;
END $$;

REVOKE ALL ON FUNCTION public.admin_entity_translation_stats(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_entity_translation_stats(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_entity_translation_stats(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_entity_translation_stats(text) TO service_role;

-- 3) WRITERS — grants restated (bodies unchanged; both already UPSERT, so the
--    first write on a universe row CREATES it).
REVOKE ALL ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) TO service_role;

REVOKE ALL ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) TO service_role;

REVOKE ALL ON FUNCTION public.admin_set_entity_translation_status(text, uuid, text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_set_entity_translation_status(text, uuid, text, text, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_set_entity_translation_status(text, uuid, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_set_entity_translation_status(text, uuid, text, text, text) TO service_role;

-- 4) PROOFS -------------------------------------------------------------------
-- The gated RPCs cannot be CALLED here (auth.uid() is NULL during migration, so
-- has_permission refuses). The proof therefore does two things: it runs the
-- universe SQL against a fresh scratch language and asserts the counts, and it
-- asserts the SHIPPED bodies contain that same universe join and the unique
-- ORDER BY tiebreak — so the counted SQL is the deployed SQL.
DO $proof$
DECLARE
  v_lang     text := 'zxx-pf';
  v_expected bigint;
  v_total    bigint;
  v_untr     bigint;
  v_cat      uuid;
  v_body     text;
BEGIN
  SELECT (SELECT count(*) FROM public.categories WHERE is_active)
       + (SELECT count(*) FROM public.locations  WHERE is_active)
    INTO v_expected;

  INSERT INTO public.languages (code, name_en, name_native, rtl, sort)
  VALUES (v_lang, 'Proof Fence', 'Proof Fence', false, public.next_language_sort())
  ON CONFLICT (code) DO NOTHING;

  -- Fresh language: total = universe, untranslated = total.
  WITH universe AS (
    SELECT 'category'::text AS etype, c.id AS eid FROM public.categories c WHERE c.is_active
    UNION ALL
    SELECT 'location'::text, l.id FROM public.locations l WHERE l.is_active
  ), joined AS (
    SELECT COALESCE(t.status, 'untranslated') AS status
      FROM universe u
      LEFT JOIN public.entity_translations t
        ON t.entity_type = u.etype AND t.entity_id = u.eid
       AND t.field = 'name' AND t.lang_code = v_lang
  )
  SELECT count(*), count(*) FILTER (WHERE status = 'untranslated')
    INTO v_total, v_untr FROM joined;

  IF v_total <> v_expected OR v_untr <> v_expected THEN
    RAISE EXCEPTION 'PROOF FAILED: fresh language total=% untranslated=% expected=%',
      v_total, v_untr, v_expected;
  END IF;

  -- One machine write moves untranslated by exactly one.
  SELECT id INTO v_cat FROM public.categories WHERE is_active ORDER BY id LIMIT 1;
  IF v_cat IS NULL THEN RAISE EXCEPTION 'PROOF FAILED: no active category'; END IF;

  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine)
  VALUES ('category', v_cat, 'name', v_lang, 'proof', 'machine', true)
  ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'machine', machine = true;

  WITH universe AS (
    SELECT 'category'::text AS etype, c.id AS eid FROM public.categories c WHERE c.is_active
    UNION ALL
    SELECT 'location'::text, l.id FROM public.locations l WHERE l.is_active
  ), joined AS (
    SELECT COALESCE(t.status, 'untranslated') AS status
      FROM universe u
      LEFT JOIN public.entity_translations t
        ON t.entity_type = u.etype AND t.entity_id = u.eid
       AND t.field = 'name' AND t.lang_code = v_lang
  )
  SELECT count(*), count(*) FILTER (WHERE status = 'untranslated')
    INTO v_total, v_untr FROM joined;

  IF v_untr <> v_expected - 1 THEN
    RAISE EXCEPTION 'PROOF FAILED: after one machine write untranslated=% expected=%',
      v_untr, v_expected - 1;
  END IF;

  RAISE NOTICE 'U4j-3 universe proof OK: total=% untranslated_after_one=%', v_total, v_untr;

  -- Scratch reaped (J3 discipline applies to migrations too).
  DELETE FROM public.entity_translations WHERE lang_code = v_lang;
  DELETE FROM public.languages WHERE code = v_lang;

  -- The counted SQL is the deployed SQL.
  SELECT pg_get_functiondef(p.oid) INTO v_body
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_list_entity_translations';
  IF v_body NOT LIKE '%LEFT JOIN public.entity_translations%'
     OR v_body NOT LIKE '%ORDER BY f.etype, f.elabel, f.eid%' THEN
    RAISE EXCEPTION 'PROOF FAILED: list body is not the universe/deterministic body';
  END IF;

  SELECT pg_get_functiondef(p.oid) INTO v_body
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_entity_translation_stats';
  IF v_body NOT LIKE '%CROSS JOIN universe u%' THEN
    RAISE EXCEPTION 'PROOF FAILED: stats body is not the universe body';
  END IF;

  -- Grants: anon has none, authenticated and service_role have EXECUTE.
  IF has_function_privilege('anon', 'public.admin_list_entity_translations(text,text,text,integer,integer)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_entity_translation_stats(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF FAILED: anon can execute a console read';
  END IF;
  IF NOT (has_function_privilege('authenticated', 'public.admin_list_entity_translations(text,text,text,integer,integer)', 'EXECUTE')
      AND has_function_privilege('service_role', 'public.admin_list_entity_translations(text,text,text,integer,integer)', 'EXECUTE')
      AND has_function_privilege('service_role', 'public.admin_entity_translation_stats(text)', 'EXECUTE')) THEN
    RAISE EXCEPTION 'PROOF FAILED: expected EXECUTE grant missing';
  END IF;
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260902060000') ON CONFLICT DO NOTHING;