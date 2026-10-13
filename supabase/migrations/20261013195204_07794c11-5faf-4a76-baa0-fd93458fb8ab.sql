-- Bundle 13 (photos), turn 2 (2026-10-13). Tier A. The walk fixes, the database part: the text store follows the code.
-- e2e-areas: admin-translations
-- INC-603 (the operator's walk, 2026-10-13): the live site still said "up to 6 MB" after turn T17 removed it from the
-- code. The site draws the Translations store's approved texts over the compiled catalogue, and Sync keys wrote the
-- English texts again but an Amharic text only while it was empty or untranslated, so a changed Amharic text never
-- reached a key the store already held (INC-488's class; its second occurrence).
-- INC-607: Sync keys' message always said "0 keys added across 0 languages, 0 Amharic values seeded": the screen read
-- names the door never returned (inserted, seeded, languages). The door now also returns how many keys it added and in
-- how many languages; the screen reads the door's own names (src/features/admin/translations/translations-service.ts).
-- A. admin_sync_ui_keys(jsonb, jsonb), redeclared WHOLE from its live definition (20260831105914, the last file that
--    declares it; its live fingerprint is checked before this file is written) with three changes, each marked in the
--    body: (1) the keys the sync adds are counted before the upsert ('keys_added'), and the languages it seeds are
--    counted ('languages'); (2) an Amharic text no person ever wrote — no 'save' or 'machine' revision for its key, the
--    revision the console, an import and machine translation each write — follows the code's changed text; a text a
--    person wrote is kept; (3) the return and the audit row carry 'keys_added' and 'languages'. Header unchanged:
--    plpgsql, VOLATILE, SECURITY DEFINER, search_path public; its REVOKE and GRANT restated.
-- B. Proofs: the header, the grants and the body's rules. The sync itself needs translations:manage and a second
--    factor, so its behaviour is proven by TR-40 (e2e/admin-translations-console.spec.ts) on the app's own connection,
--    on scratch keys.

-- ===== A — the sync =====
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
  v_new      bigint := 0;
  v_langs    bigint := 0;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');
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
                AND NOT EXISTS (SELECT 1 FROM public.ui_translation_revisions r
                                 WHERE r.key = t.key AND r.lang_code = 'am'
                                   AND r.action IN ('save', 'machine'))));
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
END $$;

REVOKE ALL ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) TO service_role;

-- ===== B — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_src text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc
                  WHERE oid = 'public.admin_sync_ui_keys(jsonb, jsonb)'::regprocedure
                    AND prosecdef AND provolatile = 'v'
                    AND proconfig @> ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof B1 failed: admin_sync_ui_keys is not VOLATILE SECURITY DEFINER with search_path public';
  END IF;
  IF has_function_privilege('anon', 'public.admin_sync_ui_keys(jsonb, jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_sync_ui_keys(jsonb, jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof B2 failed: the grants are not as written';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc WHERE oid = 'public.admin_sync_ui_keys(jsonb, jsonb)'::regprocedure;
  IF v_src NOT LIKE '%has_permission(auth.uid(), ''translations'', ''manage'')%require_step_up_if_needed(''translations'', ''manage'')%'
     OR v_src NOT LIKE '%SELECT count(*) INTO v_new%INSERT INTO public.ui_translations%'
     OR v_src NOT LIKE '%t.value IS DISTINCT FROM a.value%r.action IN (''save'', ''machine'')%'
     OR v_src NOT LIKE '%ui_sync_mark_orphans(p_en)%''keys_added'', v_new%''languages'', v_langs%' THEN
    RAISE EXCEPTION 'proof B3 failed: the body of admin_sync_ui_keys is not as written';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261014080000') ON CONFLICT (version) DO NOTHING;
