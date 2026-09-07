-- C3-UX-2 PART B — ATTRIBUTES BECOME AN ENTITY_TRANSLATIONS ENTITY TYPE.
-- Additive only: entity_translations carries NO check constraint on
-- entity_type, and get_entity_bundle is already type-agnostic, so registering
-- ('attribute','label') is purely a matter of teaching the four gated doors
-- about the new (type, field) pair. No table, column, policy or grant changes.

CREATE OR REPLACE FUNCTION public.entity_source_value(p_type text, p_id uuid, p_field text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT CASE
    WHEN p_type = 'category' AND p_field = 'name'
      THEN (SELECT c.name_en FROM public.categories c WHERE c.id = p_id)
    WHEN p_type = 'location' AND p_field = 'name'
      THEN (SELECT l.name_en FROM public.locations l WHERE l.id = p_id)
    WHEN p_type = 'attribute' AND p_field = 'label'
      THEN (SELECT a.name_en FROM public.attributes a WHERE a.id = p_id)
    ELSE NULL
  END;
$function$;

CREATE OR REPLACE FUNCTION public.admin_list_entity_translations(
  p_lang text, p_status text DEFAULT NULL::text, p_search text DEFAULT NULL::text,
  p_limit integer DEFAULT 50, p_offset integer DEFAULT 0)
RETURNS TABLE(entity_type text, entity_id uuid, field text, label text, source_value text,
              value text, status text, machine boolean, flagged boolean, flag_note text,
              updated_by uuid, updated_at timestamp with time zone, approved_by uuid,
              approved_at timestamp with time zone, total_count bigint)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
    UNION ALL
    -- C3-UX-2: attribute LABELS join the roster; a definition has no active
    -- flag, so the universe is every row in the library.
    SELECT 'attribute'::text, a.id, 'label'::text, a.name_en
      FROM public.attributes a
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
END $function$;

CREATE OR REPLACE FUNCTION public.admin_entity_translation_stats(p_lang text DEFAULT NULL::text)
RETURNS TABLE(lang_code text, total bigint, approved bigint, machine_count bigint,
              edited bigint, untranslated bigint)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
    SELECT 'category'::text AS etype, c.id AS eid, 'name'::text AS efield
      FROM public.categories c WHERE c.is_active
    UNION ALL
    SELECT 'location'::text, l.id, 'name'::text FROM public.locations l WHERE l.is_active
    UNION ALL
    SELECT 'attribute'::text, a.id, 'label'::text FROM public.attributes a
  ),
  joined AS (
    SELECT g.code,
           COALESCE(t.status, 'untranslated') AS status
      FROM langs g
      CROSS JOIN universe u
      LEFT JOIN public.entity_translations t
        ON t.entity_type = u.etype AND t.entity_id = u.eid
       AND t.field = u.efield AND t.lang_code = g.code
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
END $function$;

CREATE OR REPLACE FUNCTION public.admin_save_entity_translation(
  p_type text, p_id uuid, p_field text, p_lang text, p_value text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_base text;
  v_src  text;
  v_prev text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'update');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  IF NOT ((p_type IN ('category', 'location') AND p_field = 'name')
          OR (p_type = 'attribute' AND p_field = 'label')) THEN
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

  SELECT t.value INTO v_prev FROM public.entity_translations t
   WHERE t.entity_type = p_type AND t.entity_id = p_id
     AND t.field = p_field AND t.lang_code = p_lang;

  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine,
     flagged, flag_note, updated_by, updated_at)
  VALUES (p_type, p_id, p_field, p_lang, p_value, 'edited', false,
          false, NULL, auth.uid(), now())
  ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'edited', machine = false,
        flagged = false, flag_note = NULL,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('entity_translation.save', 'entity_translations', p_id::text,
    jsonb_build_object('type', p_type, 'id', p_id, 'field', p_field, 'lang', p_lang,
                       'action', 'save', 'machine', false,
                       'old_value', left(COALESCE(v_prev, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $function$;

CREATE OR REPLACE FUNCTION public.admin_machine_entity_translation(
  p_type text, p_id uuid, p_field text, p_lang text, p_value text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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

  IF NOT ((p_type IN ('category', 'location') AND p_field = 'name')
          OR (p_type = 'attribute' AND p_field = 'label')) THEN
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
END $function$;

DO $proof$
DECLARE v_ok boolean; v_id uuid;
BEGIN
  -- P1: the attribute source value resolves.
  SELECT a.id INTO v_id FROM public.attributes a LIMIT 1;
  IF v_id IS NOT NULL THEN
    IF public.entity_source_value('attribute', v_id, 'label') IS NULL THEN
      RAISE EXCEPTION 'P1 FAILED: attribute label has no source value';
    END IF;
    RAISE NOTICE 'P1 PASS: attribute label source value resolves';
  END IF;

  -- P2: an unknown (type, field) pair still resolves to NULL.
  IF public.entity_source_value('attribute', v_id, 'name') IS NOT NULL THEN
    RAISE EXCEPTION 'P2 FAILED: attribute/name accepted';
  END IF;
  RAISE NOTICE 'P2 PASS: unknown attribute field still refused';

  -- P3: an unpermitted caller is refused by the roster door.
  v_ok := false;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-000000000000"}', true);
    PERFORM count(*) FROM public.admin_list_entity_translations('am');
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'permission denied');
  END;
  PERFORM set_config('request.jwt.claims', NULL, true);
  IF NOT v_ok THEN RAISE EXCEPTION 'P3 FAILED: unpermitted caller allowed'; END IF;
  RAISE NOTICE 'P3 PASS: unpermitted caller refused';

  -- P4: anon holds no EXECUTE on the writer.
  SELECT NOT has_function_privilege('anon',
    'public.admin_save_entity_translation(text,uuid,text,text,text)', 'EXECUTE') INTO v_ok;
  IF NOT v_ok THEN RAISE EXCEPTION 'P4 FAILED: anon can execute the writer'; END IF;
  RAISE NOTICE 'P4 PASS: anon has no EXECUTE on the writer';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260907060000') ON CONFLICT DO NOTHING;