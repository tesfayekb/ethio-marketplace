-- e2e-areas: translations

CREATE OR REPLACE FUNCTION public.admin_entity_translation_stats(p_lang text DEFAULT NULL::text)
 RETURNS TABLE(lang_code text, total bigint, approved bigint, machine_count bigint, edited bigint, untranslated bigint)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
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
    UNION ALL
    SELECT 'attribute'::text, a.id, 'option:' || (o->>'value')
      FROM public.attributes a, jsonb_array_elements(coalesce(a.options, '[]'::jsonb)) o
     WHERE coalesce((o->>'active')::boolean, true)
       AND length(btrim(coalesce(o->>'label_en', ''))) > 0
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
REVOKE ALL ON FUNCTION public.admin_entity_translation_stats(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_entity_translation_stats(text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_entity_translation_stats(text) TO service_role;

CREATE OR REPLACE FUNCTION public.admin_list_entity_translations(p_lang text, p_status text DEFAULT NULL::text, p_search text DEFAULT NULL::text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0)
 RETURNS TABLE(entity_type text, entity_id uuid, field text, label text, identifier text, source_value text, value text, status text, machine boolean, flagged boolean, flag_note text, updated_by uuid, updated_at timestamp with time zone, approved_by uuid, approved_at timestamp with time zone, total_count bigint)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  WITH universe AS (
    SELECT 'category'::text AS etype, c.id AS eid, 'name'::text AS efield,
           c.name_en AS elabel, c.slug::text AS eident
      FROM public.categories c WHERE c.is_active
    UNION ALL
    -- A location has no operator-facing machine identity in this console.
    SELECT 'location'::text, l.id, 'name'::text, l.name_en, NULL::text
      FROM public.locations l WHERE l.is_active
    UNION ALL
    SELECT 'attribute'::text, a.id, 'label'::text, a.name_en, a.attr_key::text
      FROM public.attributes a
    UNION ALL
    SELECT 'attribute'::text, a.id, 'option:' || (o->>'value'),
           o->>'label_en', a.attr_key || ' · ' || (o->>'value')
      FROM public.attributes a, jsonb_array_elements(coalesce(a.options, '[]'::jsonb)) o
     WHERE coalesce((o->>'active')::boolean, true)
       AND length(btrim(coalesce(o->>'label_en', ''))) > 0
  ),
  joined AS (
    SELECT u.etype, u.eid, u.efield, u.elabel, u.eident,
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
  SELECT f.etype, f.eid, f.efield, f.elabel, f.eident, f.elabel, f.value, f.status,
         f.machine, f.flagged, f.flag_note, f.updated_by, f.updated_at,
         f.approved_by, f.approved_at, COUNT(*) OVER () AS total_count
    FROM filtered f
   ORDER BY f.etype, f.elabel, f.eid
   LIMIT GREATEST(COALESCE(p_limit, 50), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_entity_translations(text,text,text,integer,integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_entity_translations(text,text,text,integer,integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_entity_translations(text,text,text,integer,integer) TO service_role;

CREATE OR REPLACE FUNCTION public.admin_machine_entity_translation(p_type text, p_id uuid, p_field text, p_lang text, p_value text)
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
          OR (p_type = 'attribute' AND p_field = 'label')
          OR (p_type = 'attribute' AND p_field LIKE 'option:%')) THEN
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
REVOKE ALL ON FUNCTION public.admin_machine_entity_translation(text,uuid,text,text,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_machine_entity_translation(text,uuid,text,text,text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_machine_entity_translation(text,uuid,text,text,text) TO service_role;

CREATE OR REPLACE FUNCTION public.admin_save_entity_translation(p_type text, p_id uuid, p_field text, p_lang text, p_value text)
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
          OR (p_type = 'attribute' AND p_field = 'label')
          OR (p_type = 'attribute' AND p_field LIKE 'option:%')) THEN
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
REVOKE ALL ON FUNCTION public.admin_save_entity_translation(text,uuid,text,text,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_entity_translation(text,uuid,text,text,text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_save_entity_translation(text,uuid,text,text,text) TO service_role;

CREATE OR REPLACE FUNCTION public.entity_source_value(p_type text, p_id uuid, p_field text)
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT CASE
    WHEN p_type = 'category' AND p_field = 'name'
      THEN (SELECT c.name_en FROM public.categories c WHERE c.id = p_id)
    WHEN p_type = 'location' AND p_field = 'name'
      THEN (SELECT l.name_en FROM public.locations l WHERE l.id = p_id)
    WHEN p_type = 'attribute' AND p_field = 'label'
      THEN (SELECT a.name_en FROM public.attributes a WHERE a.id = p_id)
    WHEN p_type = 'attribute' AND p_field LIKE 'option:%'
      THEN (SELECT o->>'label_en'
              FROM public.attributes a, jsonb_array_elements(coalesce(a.options, '[]'::jsonb)) o
             WHERE a.id = p_id AND 'option:' || (o->>'value') = p_field)
    ELSE NULL
  END;
$function$;
REVOKE ALL ON FUNCTION public.entity_source_value(text,uuid,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.entity_source_value(text,uuid,text) TO authenticated;
GRANT ALL ON FUNCTION public.entity_source_value(text,uuid,text) TO service_role;

DO $proof$
DECLARE
  v_id uuid := gen_random_uuid();
  v_key text := 'e2e-m18-' || left(replace(v_id::text, '-', ''), 8);
  v_claims text := current_setting('request.jwt.claims', true);
  v_sub text := current_setting('request.jwt.claim.sub', true);
  v_role text := current_setting('request.jwt.claim.role', true);
  v_row record;
  v_oid oid;
  v_def text;
BEGIN
  INSERT INTO public.attributes (id, attr_key, name_en, attr_type, options)
  VALUES (v_id, v_key, 'e2e-m18-label', 'single_select',
    '[{"value":"a","label_en":"Alpha","label_am":"አልፋ"},{"value":"b","label_en":"Beta","active":false}]'::jsonb);
  IF public.entity_source_value('attribute',v_id,'option:a') IS DISTINCT FROM 'Alpha'
     OR public.entity_source_value('attribute',v_id,'option:b') IS DISTINCT FROM 'Beta'
     OR public.entity_source_value('attribute',v_id,'option:z') IS NOT NULL
     OR public.entity_source_value('attribute',v_id,'label') IS DISTINCT FROM 'e2e-m18-label' THEN
    RAISE EXCEPTION 'M18 proof: option and label source values';
  END IF;
  PERFORM set_config('request.jwt.claims','{}',true);
  PERFORM set_config('request.jwt.claim.sub','',true);
  PERFORM set_config('request.jwt.claim.role','',true);
  BEGIN
    PERFORM public.admin_save_entity_translation('attribute',v_id,'option:a','am','e2e-m18-save');
    RAISE EXCEPTION 'M18 proof: unauthenticated save passed';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM NOT IN ('permission denied','not authenticated') THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.admin_machine_entity_translation('attribute',v_id,'option:a','am','e2e-m18-machine');
    RAISE EXCEPTION 'M18 proof: unauthenticated machine passed';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM NOT IN ('permission denied','not authenticated') THEN RAISE; END IF;
  END;
  FOR v_row IN SELECT * FROM (VALUES
    ('entity_source_value(text,uuid,text)','s','p_field LIKE ''option:%''',false),
    ('admin_save_entity_translation(text,uuid,text,text,text)','v','OR (p_type = ''attribute'' AND p_field LIKE ''option:%'')',false),
    ('admin_machine_entity_translation(text,uuid,text,text,text)','v','OR (p_type = ''attribute'' AND p_field LIKE ''option:%'')',false),
    ('admin_list_entity_translations(text,text,text,integer,integer)','s','''option:'' || (o->>''value'')',true),
    ('admin_entity_translation_stats(text)','s','''option:'' || (o->>''value'')',true)
  ) AS expected(sig,volatility,needle,active_filter) LOOP
    v_oid := to_regprocedure('public.' || v_row.sig);
    IF v_oid IS NULL OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = v_oid
      AND prosecdef AND provolatile::text = v_row.volatility AND proconfig = ARRAY['search_path=public']) THEN
      RAISE EXCEPTION 'M18 proof: header %',v_row.sig;
    END IF;
    IF has_function_privilege('anon',v_oid,'EXECUTE')
       OR NOT has_function_privilege('authenticated',v_oid,'EXECUTE')
       OR NOT has_function_privilege('service_role',v_oid,'EXECUTE') THEN
      RAISE EXCEPTION 'M18 proof: ACL %',v_row.sig;
    END IF;
    v_def := pg_get_functiondef(v_oid);
    IF position(v_row.needle IN v_def) = 0 THEN
      RAISE EXCEPTION 'M18 proof: option branch %',v_row.sig;
    END IF;
    IF v_row.active_filter AND (
      position('coalesce((o->>''active'')::boolean, true)' IN v_def) = 0
      OR position('length(btrim(coalesce(o->>''label_en'', ''''))) > 0' IN v_def) = 0) THEN
      RAISE EXCEPTION 'M18 proof: active option universe %',v_row.sig;
    END IF;
  END LOOP;
  -- e2e-mig- scratch cleanup: both keys belong to the row inserted in this proof.
  DELETE FROM public.attributes WHERE id = v_id AND attr_key = v_key;
  PERFORM set_config('request.jwt.claims',coalesce(v_claims,''),true);
  PERFORM set_config('request.jwt.claim.sub',coalesce(v_sub,''),true);
  PERFORM set_config('request.jwt.claim.role',coalesce(v_role,''),true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261022150000') ON CONFLICT DO NOTHING;