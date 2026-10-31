-- INC-1023 (turn D1, foundations-turn-d-strings.md): a shipped string reaches the live site.
-- 1. ui_text_written(key, lang): the ONE authorship predicate (INC-603) — a 'save' or 'machine'
--    revision exists. The console's save, the import (admin_save_translation_core) and machine
--    translation each write one; a sync copy and an approval alone do not.
-- 2. get_ui_bundle_parts(lang): get_ui_bundle's rows (same filter, same header), split into
--    { written, copied } so the app lets the build's own text beat a copy (D2). get_ui_bundle and
--    get_ui_bundle_version are NOT touched: the published site keeps reading them unchanged.
-- 3. admin_sync_ui_keys redeclared whole from its live definition; only INC-603's inline test
--    now reads the predicate.

CREATE OR REPLACE FUNCTION public.ui_text_written(p_key text, p_lang text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (SELECT 1 FROM public.ui_translation_revisions r
                  WHERE r.key = p_key AND r.lang_code = p_lang
                    AND r.action IN ('save', 'machine'));
$function$;
REVOKE ALL ON FUNCTION public.ui_text_written(text, text) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_ui_bundle_parts(p_lang text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_ok boolean;
BEGIN
  SELECT (l.enabled_public OR l.is_base) INTO v_ok
    FROM public.languages l WHERE l.code = p_lang;
  IF v_ok IS NOT TRUE THEN
    RETURN jsonb_build_object('written', '{}'::jsonb, 'copied', '{}'::jsonb); -- D3 fallback law
  END IF;
  RETURN (
    SELECT jsonb_build_object(
             'written', COALESCE(jsonb_object_agg(s.key, s.value) FILTER (WHERE s.w), '{}'::jsonb),
             'copied',  COALESCE(jsonb_object_agg(s.key, s.value) FILTER (WHERE NOT s.w), '{}'::jsonb))
      FROM (SELECT t.key, t.value, public.ui_text_written(t.key, p_lang) AS w
              FROM public.ui_translations t
             WHERE t.lang_code = p_lang AND t.status = 'approved'
               AND t.value IS NOT NULL AND NOT t.orphaned) s
  );
END $function$;
REVOKE ALL ON FUNCTION public.get_ui_bundle_parts(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_ui_bundle_parts(text) TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_ui_bundle_parts(text) TO service_role;

CREATE OR REPLACE FUNCTION public.admin_sync_ui_keys(p_en jsonb, p_am jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  v_new      bigint := 0;
  v_langs    bigint := 0;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  IF jsonb_typeof(COALESCE(p_en, 'null'::jsonb)) <> 'object' THEN
    RAISE EXCEPTION 'p_en must be a json object';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;

  -- INC-607 — the keys this sync ADDS, counted before the upsert (whose own
  -- count is every key of the catalogue).
  SELECT count(*) INTO v_new
    FROM jsonb_object_keys(p_en) AS k(key)
   WHERE NOT EXISTS (SELECT 1 FROM public.ui_translations x
                      WHERE x.key = k.key AND x.lang_code = v_base);

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      updated_by, updated_at, approved_by, approved_at,
                                      origin)
  SELECT e.key, v_base, e.value, 'approved', false, auth.uid(), now(), auth.uid(), now(),
         'sync'
    FROM jsonb_each_text(p_en) AS e(key, value)
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'approved',
        updated_by = auth.uid(), updated_at = now(), origin = 'sync';
  GET DIAGNOSTICS v_en = ROW_COUNT;

  FOR v_lang IN
    SELECT l.code FROM public.languages l WHERE l.enabled_admin AND NOT l.is_base
  LOOP
    INSERT INTO public.ui_translations (key, lang_code, status, origin)
    SELECT e.key, v_lang.code, 'untranslated', 'sync'
      FROM jsonb_each_text(p_en) AS e(key, value)
    ON CONFLICT (key, lang_code) DO UPDATE SET origin = 'sync';
    GET DIAGNOSTICS v_n = ROW_COUNT;
    v_added := v_added || jsonb_build_object(v_lang.code, v_n);
    v_langs := v_langs + 1;
  END LOOP;

  IF p_am IS NOT NULL AND jsonb_typeof(p_am) = 'object' THEN
    UPDATE public.ui_translations t
       SET value = a.value, status = 'approved', machine = false, flagged = false,
           flag_note = NULL, updated_by = auth.uid(), updated_at = now(),
           approved_by = auth.uid(), approved_at = now()
      FROM jsonb_each_text(p_am) AS a(key, value)
     WHERE t.lang_code = 'am' AND t.key = a.key
       AND (t.status = 'untranslated' OR t.value IS NULL OR t.value = ''
            -- INC-603 — an Amharic text no person ever wrote (no 'save' or
            -- 'machine' revision: the console, an import and machine
            -- translation all write one) follows the code's changed text. A
            -- text a person wrote is kept.
            OR (t.value IS DISTINCT FROM a.value
                AND NOT public.ui_text_written(t.key, 'am')));
    GET DIAGNOSTICS v_am = ROW_COUNT;
  END IF;

  v_marks := public.ui_sync_mark_orphans(p_en);
  v_orphaned := (v_marks->>'orphaned')::bigint;
  v_restored := (v_marks->>'restored')::bigint;

  PERFORM public.log_audit('translation.sync', 'ui_translations', v_base,
    jsonb_build_object('lang', v_base, 'action', 'sync', 'machine', false,
                       'en_upserted', v_en, 'keys_added_per_lang', v_added,
                       'am_seeded', v_am, 'orphaned', v_orphaned,
                       'orphans_restored', v_restored, 'keys_added', v_new,
                       'languages', v_langs));

  RETURN jsonb_build_object('en_upserted', v_en, 'keys_added_per_lang', v_added,
                            'am_seeded', v_am, 'orphaned', v_orphaned,
                            'orphans_restored', v_restored, 'keys_added', v_new,
                            'languages', v_langs);
END $function$;
REVOKE ALL ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) TO service_role;

-- PROOF (scratch keys only, as no caller). Every failure raises; the block removes its own rows.
DO $proof$
DECLARE
  v_base text;
  v_parts jsonb;
  v_flat jsonb;
  k text := 'e2e.scratch.inc1023.';
BEGIN
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  INSERT INTO public.ui_translations (key, lang_code, value, status, origin) VALUES
    (k || 'copied',   v_base, 'C', 'approved', 'sync'),
    (k || 'saved',    v_base, 'S', 'approved', 'sync'),
    (k || 'machined', v_base, 'M', 'approved', 'sync'),
    (k || 'approved', v_base, 'A', 'approved', 'sync');
  INSERT INTO public.ui_translation_revisions (key, lang_code, action) VALUES
    (k || 'saved',    v_base, 'save'),
    (k || 'machined', v_base, 'machine'),
    (k || 'approved', v_base, 'approve');

  v_parts := public.get_ui_bundle_parts(v_base);
  IF v_parts->'copied'->>(k || 'copied') IS DISTINCT FROM 'C' THEN RAISE EXCEPTION 'proof: no-revision row not copied'; END IF;
  IF v_parts->'written'->>(k || 'saved') IS DISTINCT FROM 'S' THEN RAISE EXCEPTION 'proof: save row not written'; END IF;
  IF v_parts->'written'->>(k || 'machined') IS DISTINCT FROM 'M' THEN RAISE EXCEPTION 'proof: machine row not written'; END IF;
  IF v_parts->'copied'->>(k || 'approved') IS DISTINCT FROM 'A' THEN RAISE EXCEPTION 'proof: approve-only row not copied'; END IF;
  IF (v_parts->'written') ? (k || 'copied') OR (v_parts->'copied') ? (k || 'saved') THEN RAISE EXCEPTION 'proof: a row in both parts'; END IF;

  v_flat := public.get_ui_bundle(v_base);
  IF v_flat->>(k || 'copied') IS DISTINCT FROM 'C' OR v_flat->>(k || 'saved') IS DISTINCT FROM 'S'
     OR v_flat->>(k || 'machined') IS DISTINCT FROM 'M' OR v_flat->>(k || 'approved') IS DISTINCT FROM 'A'
     OR jsonb_typeof(v_flat->(k || 'saved')) <> 'string' THEN
    RAISE EXCEPTION 'proof: get_ui_bundle answer changed';
  END IF;

  IF has_function_privilege('anon', 'public.ui_text_written(text, text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.ui_text_written(text, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof: the predicate reaches a browser role';
  END IF;
  IF NOT has_function_privilege('anon', 'public.get_ui_bundle_parts(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof: get_ui_bundle_parts not anon-callable';
  END IF;

  DELETE FROM public.ui_translation_revisions WHERE key LIKE 'e2e.scratch.inc1023.%';
  DELETE FROM public.ui_translations WHERE key LIKE 'e2e.scratch.inc1023.%';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20261031014000');