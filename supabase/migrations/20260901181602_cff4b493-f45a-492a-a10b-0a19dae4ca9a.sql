-- U4j — data-layer AI + guided language creation.

-- 1) languages.country_codes -------------------------------------------------
ALTER TABLE public.languages
  ADD COLUMN IF NOT EXISTS country_codes text[] NOT NULL DEFAULT '{}'::text[];

-- FK-equivalent validation for an array column: a trigger (CHECK cannot query).
CREATE OR REPLACE FUNCTION public.languages_country_codes_valid()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE v_bad text;
BEGIN
  NEW.country_codes := COALESCE(NEW.country_codes, '{}'::text[]);
  SELECT string_agg(u.cc, ', ') INTO v_bad
    FROM unnest(NEW.country_codes) AS u(cc)
   WHERE NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = u.cc);
  IF v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'unknown country code: %', v_bad;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS languages_country_codes_valid ON public.languages;
CREATE TRIGGER languages_country_codes_valid
  BEFORE INSERT OR UPDATE OF country_codes ON public.languages
  FOR EACH ROW EXECUTE FUNCTION public.languages_country_codes_valid();

-- 2) admin_machine_entity_translation ----------------------------------------
-- Mirrors admin_machine_translation: gates (permission -> step-up -> scope),
-- base-language refusal, machine status + provenance, audit old->new.
-- Placeholder validation is N/A: entity names carry no {tokens}.
CREATE OR REPLACE FUNCTION public.admin_machine_entity_translation(
  p_type text, p_id uuid, p_field text, p_lang text, p_value text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_base text;
  v_src  text;
  v_prev text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'machine') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'machine');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  IF p_type NOT IN ('category', 'location') OR p_field <> 'name' THEN
    RAISE EXCEPTION 'unknown entity field';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    RAISE EXCEPTION 'base language rows are sync-owned';
  END IF;

  v_src := public.entity_source_value(p_type, p_id, p_field);
  IF v_src IS NULL THEN
    RAISE EXCEPTION 'unknown entity';
  END IF;

  IF btrim(COALESCE(p_value, '')) = '' THEN
    RAISE EXCEPTION 'empty machine value';
  END IF;

  SELECT t.value INTO v_prev FROM public.entity_translations t
   WHERE t.entity_type = p_type AND t.entity_id = p_id
     AND t.field = p_field AND t.lang_code = p_lang;

  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine,
     flagged, flag_note, updated_by, updated_at)
  VALUES (p_type, p_id, p_field, p_lang, p_value, 'machine', true,
          false, NULL, auth.uid(), now())
  ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'machine', machine = true,
        flagged = false, flag_note = NULL,
        approved_by = NULL, approved_at = NULL,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('entity_translation.machine', 'entity_translations', p_id::text,
    jsonb_build_object('type', p_type, 'id', p_id, 'field', p_field, 'lang', p_lang,
                       'action', 'machine', 'machine', true,
                       'old_value', left(COALESCE(v_prev, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $$;

REVOKE ALL ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_machine_entity_translation(text, uuid, text, text, text) TO service_role;

-- 3) admin_entity_translation_stats ------------------------------------------
-- Same universe as admin_list_entity_translations (active categories +
-- active locations, field 'name'), so the meter and the list never disagree.
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

-- 4) admin_upsert_language gains p_country_codes ------------------------------
-- The 4-arg form is DROPPED, not overloaded: a defaulted 5th parameter would
-- make every existing named-argument call ambiguous ("function is not unique").
DROP FUNCTION IF EXISTS public.admin_upsert_language(text, text, text, boolean);

CREATE OR REPLACE FUNCTION public.admin_upsert_language(
  p_code text, p_name_en text, p_name_native text,
  p_rtl boolean DEFAULT false, p_country_codes text[] DEFAULT '{}'::text[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_code text; v_sort integer; v_countries text[];
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');

  v_code := lower(btrim(COALESCE(p_code, '')));
  IF v_code !~ '^[a-z]{2,8}(-[a-z0-9]{2,8})?$' THEN
    RAISE EXCEPTION 'invalid language code';
  END IF;
  IF btrim(COALESCE(p_name_en, '')) = '' OR btrim(COALESCE(p_name_native, '')) = '' THEN
    RAISE EXCEPTION 'language names are required';
  END IF;

  SELECT COALESCE(array_agg(DISTINCT upper(btrim(c))), '{}'::text[]) INTO v_countries
    FROM unnest(COALESCE(p_country_codes, '{}'::text[])) AS c
   WHERE btrim(c) <> '';

  v_sort := public.next_language_sort();

  INSERT INTO public.languages (code, name_en, name_native, rtl, sort, country_codes)
  VALUES (v_code, btrim(p_name_en), btrim(p_name_native), COALESCE(p_rtl, false),
          v_sort, v_countries)
  ON CONFLICT (code) DO UPDATE
    SET name_en = EXCLUDED.name_en, name_native = EXCLUDED.name_native,
        rtl = EXCLUDED.rtl, country_codes = EXCLUDED.country_codes,
        updated_at = now();

  PERFORM public.log_audit('translation.language_upsert', 'languages', v_code,
    jsonb_build_object('lang', v_code, 'action', 'upsert', 'machine', false,
                       'countries', to_jsonb(v_countries)));
END $$;

REVOKE ALL ON FUNCTION public.admin_upsert_language(text, text, text, boolean, text[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_upsert_language(text, text, text, boolean, text[]) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_language(text, text, text, boolean, text[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_upsert_language(text, text, text, boolean, text[]) TO service_role;

-- languages_country_codes_valid is SECURITY INVOKER (trigger helper default).
REVOKE ALL ON FUNCTION public.languages_country_codes_valid() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.languages_country_codes_valid() TO authenticated;
GRANT EXECUTE ON FUNCTION public.languages_country_codes_valid() TO service_role;

-- 5) PROOFS -------------------------------------------------------------------
DO $proof$
DECLARE
  v_col   boolean;
  v_bad   boolean := false;
  v_stats boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = 'languages'
       AND column_name = 'country_codes'
  ) INTO v_col;
  IF NOT v_col THEN RAISE EXCEPTION 'PROOF FAILED: country_codes missing'; END IF;

  -- Country validation refuses an unknown code.
  BEGIN
    UPDATE public.languages SET country_codes = ARRAY['ZZ'] WHERE is_base;
    v_bad := true;
  EXCEPTION WHEN OTHERS THEN
    v_bad := false;
  END;
  IF v_bad THEN RAISE EXCEPTION 'PROOF FAILED: unknown country accepted'; END IF;

  -- Gating: both writers refuse an unauthenticated caller (auth.uid() IS NULL).
  BEGIN
    PERFORM public.admin_machine_entity_translation(
      'category', gen_random_uuid(), 'name', 'am', 'x');
    RAISE EXCEPTION 'PROOF FAILED: machine entity writer ungated';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM LIKE 'PROOF FAILED%' THEN RAISE; END IF;
  END;

  BEGIN
    PERFORM public.admin_upsert_language('zz', 'X', 'X', false, '{}'::text[]);
    RAISE EXCEPTION 'PROOF FAILED: upsert_language ungated';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM LIKE 'PROOF FAILED%' THEN RAISE; END IF;
  END;

  SELECT EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'admin_entity_translation_stats'
  ) INTO v_stats;
  IF NOT v_stats THEN RAISE EXCEPTION 'PROOF FAILED: stats function missing'; END IF;

  RAISE NOTICE 'U4j proofs OK';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260901190000') ON CONFLICT DO NOTHING;