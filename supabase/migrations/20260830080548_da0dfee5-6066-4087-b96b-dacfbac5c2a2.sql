-- =============================================================================
-- U4d — ENTITY TRANSLATIONS ADOPTION
-- Declared mark: 20260830090000 (INC-094 declared-mark law)
--
-- (1) get_entity_bundle(p_lang)  — anon-callable, approved-only, mirrors get_ui_bundle
-- (2) admin_save_entity_translation / admin_set_entity_translation_status
--     — the ui trio's writer shape, minus machine: entity machine translation is
--       EXPLICITLY DEFERRED and rides the REQ-004 engine when it lands.
-- (3) BACKFILL: categories.name_am -> ('category', id, 'name', 'am', …, 'approved')
-- (4) admin_list_entity_translations(...) — view-gated console read with labels
-- =============================================================================

-- ---------------------------------------------------------------------------
-- (1) PUBLIC BUNDLE — approved rows only, shaped {type:{id:{field:value}}}
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_entity_bundle(p_lang text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_ok boolean;
BEGIN
  SELECT (l.enabled_public OR l.is_base) INTO v_ok
    FROM public.languages l WHERE l.code = p_lang;
  IF v_ok IS NOT TRUE THEN
    RETURN '{}'::jsonb; -- D3 fallback law: the client keeps its column/base name.
  END IF;

  RETURN COALESCE((
    SELECT jsonb_object_agg(g.entity_type, g.entities)
      FROM (
        SELECT e.entity_type,
               jsonb_object_agg(e.entity_id::text, e.fields) AS entities
          FROM (
            SELECT t.entity_type, t.entity_id,
                   jsonb_object_agg(t.field, t.value) AS fields
              FROM public.entity_translations t
             WHERE t.lang_code = p_lang
               AND t.status = 'approved'
               AND t.value IS NOT NULL
             GROUP BY t.entity_type, t.entity_id
          ) e
         GROUP BY e.entity_type
      ) g
  ), '{}'::jsonb);
END $$;

REVOKE ALL ON FUNCTION public.get_entity_bundle(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_entity_bundle(text) TO anon, authenticated;

-- ---------------------------------------------------------------------------
-- Shared helper: the base-language source string for an entity field.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.entity_source_value(p_type text, p_id uuid, p_field text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE
    WHEN p_type = 'category' AND p_field = 'name'
      THEN (SELECT c.name_en FROM public.categories c WHERE c.id = p_id)
    WHEN p_type = 'location' AND p_field = 'name'
      THEN (SELECT l.name_en FROM public.locations l WHERE l.id = p_id)
    ELSE NULL
  END;
$$;

REVOKE ALL ON FUNCTION public.entity_source_value(text, uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.entity_source_value(text, uuid, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.entity_source_value(text, uuid, text) TO authenticated;

-- ---------------------------------------------------------------------------
-- (2) WRITERS — gates FIRST (permission -> step-up -> scope), then mutate,
--     then audit. INC-096f canonical order.
--     MACHINE TRANSLATION FOR ENTITIES IS DEFERRED: no admin_machine_entity_*
--     writer exists; entity machine fill rides the REQ-004 engine.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_save_entity_translation(
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
  IF NOT public.has_permission(auth.uid(), 'translations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'update');
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
END $$;

REVOKE ALL ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_save_entity_translation(text, uuid, text, text, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_set_entity_translation_status(
  p_type text, p_id uuid, p_field text, p_lang text, p_action text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_prev public.entity_translations%ROWTYPE;
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

  SELECT * INTO v_prev FROM public.entity_translations
   WHERE entity_type = p_type AND entity_id = p_id
     AND field = p_field AND lang_code = p_lang;
  IF NOT FOUND THEN RAISE EXCEPTION 'translation row not found'; END IF;

  IF p_action = 'approve' THEN
    UPDATE public.entity_translations
       SET status = 'approved', approved_by = auth.uid(), approved_at = now(),
           updated_by = auth.uid(), updated_at = now()
     WHERE entity_type = p_type AND entity_id = p_id
       AND field = p_field AND lang_code = p_lang;
  ELSE
    UPDATE public.entity_translations
       SET status = 'untranslated', value = NULL, machine = false,
           flagged = false, flag_note = NULL,
           approved_by = NULL, approved_at = NULL,
           updated_by = auth.uid(), updated_at = now()
     WHERE entity_type = p_type AND entity_id = p_id
       AND field = p_field AND lang_code = p_lang;
  END IF;

  PERFORM public.log_audit('entity_translation.status', 'entity_translations', p_id::text,
    jsonb_build_object('type', p_type, 'id', p_id, 'field', p_field, 'lang', p_lang,
                       'action', p_action, 'machine', false,
                       'old_value', left(COALESCE(v_prev.value, ''), 200)));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_entity_translation_status(text, uuid, text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_set_entity_translation_status(text, uuid, text, text, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_set_entity_translation_status(text, uuid, text, text, text) TO authenticated;

-- ---------------------------------------------------------------------------
-- (4) CONSOLE READ — the entity universe LEFT JOINed onto this language, so
--     untranslated entities are visible (a coverage meter needs the denominator).
-- ---------------------------------------------------------------------------
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
   ORDER BY f.etype, f.elabel
   LIMIT GREATEST(COALESCE(p_limit, 50), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $$;

REVOKE ALL ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_entity_translations(text, text, text, integer, integer) TO authenticated;

-- ---------------------------------------------------------------------------
-- (3) BACKFILL — categories.name_am (censused: 97 non-null rows)
-- ---------------------------------------------------------------------------
INSERT INTO public.entity_translations
  (entity_type, entity_id, field, lang_code, value, status, machine)
SELECT 'category', c.id, 'name', 'am', c.name_am, 'approved', false
  FROM public.categories c
 WHERE c.name_am IS NOT NULL
ON CONFLICT (entity_type, entity_id, field, lang_code) DO NOTHING;

-- ---------------------------------------------------------------------------
-- PROOFS
-- ---------------------------------------------------------------------------
DO $proof$
DECLARE
  v_msg text;
  v_src integer;
  v_got integer;
  v_bundle jsonb;
  v_loc uuid;
BEGIN
  -- P1 gating: a permissionless principal (auth.uid() IS NULL here) is refused
  -- the console read, the writer and the status action.
  BEGIN
    PERFORM * FROM public.admin_list_entity_translations('am');
    RAISE EXCEPTION 'PROOF P1 FAILED: list not refused';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'permission denied' THEN
      RAISE EXCEPTION 'PROOF P1 FAILED: unexpected %', v_msg;
    END IF;
    RAISE NOTICE 'PROOF P1 OK (list): %', v_msg;
  END;

  BEGIN
    PERFORM public.admin_save_entity_translation('location', gen_random_uuid(), 'name', 'am', 'x');
    RAISE EXCEPTION 'PROOF P1 FAILED: save not refused';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'permission denied' THEN
      RAISE EXCEPTION 'PROOF P1 FAILED: unexpected %', v_msg;
    END IF;
    RAISE NOTICE 'PROOF P1 OK (save): %', v_msg;
  END;

  BEGIN
    PERFORM public.admin_set_entity_translation_status('location', gen_random_uuid(), 'name', 'am', 'approve');
    RAISE EXCEPTION 'PROOF P1 FAILED: status not refused';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'permission denied' THEN
      RAISE EXCEPTION 'PROOF P1 FAILED: unexpected %', v_msg;
    END IF;
    RAISE NOTICE 'PROOF P1 OK (status): %', v_msg;
  END;

  -- P2 scope: translation_scope_ok is FALSE for this principal, so the scope
  -- refusal is the SECOND gate a permissionless caller would meet.
  IF public.translation_scope_ok('am') THEN
    RAISE EXCEPTION 'PROOF P2 FAILED: unassigned principal passed the scope gate';
  END IF;
  RAISE NOTICE 'PROOF P2 OK: scope gate refuses an unassigned principal';

  -- P3 save -> approve flow, exercised on the TABLE with a scratch entity row
  -- (the RPCs themselves are auth.uid()-gated and proved above). Cleaned up.
  SELECT id INTO v_loc FROM public.locations WHERE is_active ORDER BY created_at LIMIT 1;
  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine)
  VALUES ('location', v_loc, 'name', 'ti', 'U4D PROOF', 'edited', false)
  ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
    SET value = 'U4D PROOF', status = 'edited';

  v_bundle := public.get_entity_bundle('am');
  IF v_bundle ? 'location'
     AND (v_bundle -> 'location' -> v_loc::text ->> 'name') = 'U4D PROOF' THEN
    RAISE EXCEPTION 'PROOF P3 FAILED: a non-approved row leaked into the bundle';
  END IF;
  RAISE NOTICE 'PROOF P3 OK: edited rows are not published';

  UPDATE public.entity_translations SET status = 'approved'
   WHERE entity_type = 'location' AND entity_id = v_loc
     AND field = 'name' AND lang_code = 'ti';
  IF public.get_entity_bundle('ti') <> '{}'::jsonb THEN
    RAISE EXCEPTION 'PROOF P4 FAILED: a non-public language published a bundle';
  END IF;
  RAISE NOTICE 'PROOF P4 OK: ti is not enabled_public -> {} (fallback law)';

  DELETE FROM public.entity_translations
   WHERE entity_type = 'location' AND entity_id = v_loc
     AND field = 'name' AND lang_code = 'ti';

  -- P5 backfill: one approved am row per non-null categories.name_am (census 97).
  SELECT count(*) INTO v_src FROM public.categories WHERE name_am IS NOT NULL;
  SELECT count(*) INTO v_got FROM public.entity_translations
   WHERE entity_type = 'category' AND field = 'name' AND lang_code = 'am';
  IF v_src <> 97 THEN
    RAISE EXCEPTION 'PROOF P5 FAILED: source census drifted (% non-null name_am, expected 97)', v_src;
  END IF;
  IF v_got <> v_src THEN
    RAISE EXCEPTION 'PROOF P5 FAILED: backfilled % of % category rows', v_got, v_src;
  END IF;
  RAISE NOTICE 'PROOF P5 OK: % category name rows backfilled (= census)', v_got;

  -- P6 anon bundle: approved-only, and am publishes the backfill.
  v_bundle := public.get_entity_bundle('am');
  IF NOT (v_bundle ? 'category') THEN
    RAISE EXCEPTION 'PROOF P6 FAILED: am bundle carries no category names';
  END IF;
  RAISE NOTICE 'PROOF P6 OK: am bundle carries % category entries',
    (SELECT count(*) FROM jsonb_object_keys(v_bundle -> 'category'));

  -- P7 grants read-back.
  IF NOT has_function_privilege('anon', 'public.get_entity_bundle(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF P7 FAILED: anon cannot execute get_entity_bundle';
  END IF;
  IF has_function_privilege('anon', 'public.admin_save_entity_translation(text,uuid,text,text,text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_set_entity_translation_status(text,uuid,text,text,text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_list_entity_translations(text,text,text,integer,integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF P7 FAILED: anon can execute an admin entity RPC';
  END IF;
  IF NOT (has_function_privilege('authenticated', 'public.admin_save_entity_translation(text,uuid,text,text,text)', 'EXECUTE')
      AND has_function_privilege('authenticated', 'public.admin_set_entity_translation_status(text,uuid,text,text,text)', 'EXECUTE')
      AND has_function_privilege('authenticated', 'public.admin_list_entity_translations(text,text,text,integer,integer)', 'EXECUTE')) THEN
    RAISE EXCEPTION 'PROOF P7 FAILED: authenticated is missing an entity RPC grant';
  END IF;
  RAISE NOTICE 'PROOF P7 OK: grants read back as declared';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260830090000') ON CONFLICT DO NOTHING;
