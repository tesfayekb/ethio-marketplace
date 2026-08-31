-- U4g-12 (INC-105) — SYNC OWNS ONLY WHAT SYNC INTRODUCED.
-- Declared mark: 20260831130000
--
-- Finding: admin_sync_ui_keys treated the ingested catalog as the whole world,
-- so it orphaned rows it never introduced (direct/fixture inserts) — sibling
-- scratch keys vanished mid-test. CLASS RULE: a sweep may only touch rows it
-- owns. Ownership is now recorded on the row itself: ui_translations.origin.

-- 1. ORIGIN COLUMN -----------------------------------------------------------
ALTER TABLE public.ui_translations
  ADD COLUMN IF NOT EXISTS origin text NOT NULL DEFAULT 'manual';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conrelid = 'public.ui_translations'::regclass
       AND conname = 'ui_translations_origin_check'
  ) THEN
    ALTER TABLE public.ui_translations
      ADD CONSTRAINT ui_translations_origin_check
      CHECK (origin IN ('sync', 'manual'));
  END IF;
END $$;

-- 2. BACKFILL — every pre-existing non-scratch key came from a sync run.
UPDATE public.ui_translations
   SET origin = 'sync'
 WHERE origin <> 'sync'
   AND key NOT LIKE 'e2e.%';

-- 3. ORPHAN MARKING — sync-origin rows ONLY.
CREATE OR REPLACE FUNCTION public.ui_sync_mark_orphans(p_en jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_orphaned bigint := 0; v_restored bigint := 0;
BEGIN
  -- INC-105: a sweep may only touch rows it owns. Rows inserted directly
  -- (fixtures, manual authoring) are invisible to the catalog payload and are
  -- therefore never orphaned by it.
  UPDATE public.ui_translations t
     SET orphaned = true, updated_at = now()
   WHERE NOT t.orphaned AND t.origin = 'sync' AND NOT (p_en ? t.key);
  GET DIAGNOSTICS v_orphaned = ROW_COUNT;

  UPDATE public.ui_translations t
     SET orphaned = false, updated_at = now()
   WHERE t.orphaned AND t.origin = 'sync' AND (p_en ? t.key);
  GET DIAGNOSTICS v_restored = ROW_COUNT;

  RETURN jsonb_build_object('orphaned', v_orphaned, 'restored', v_restored);
END $$;
REVOKE ALL ON FUNCTION public.ui_sync_mark_orphans(jsonb) FROM PUBLIC, anon, authenticated;

-- 4. SYNC — every row it writes is stamped origin='sync'.
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

-- 5. GRANTS RESTATED (E1 / INC-099: a re-declared seam restates its grants).
GRANT SELECT ON public.ui_translations TO authenticated;
GRANT ALL ON public.ui_translations TO service_role;

-- 6. PROOFS -------------------------------------------------------------------
DO $$
DECLARE
  v_base   text;
  v_man    text := 'e2e.origin.proof.manual';
  v_syn    text := 'e2e.origin.proof.sync';
  v_full   jsonb;
  v_short  jsonb;
  v_res    jsonb;
  v_flag   boolean;
BEGIN
  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;

  INSERT INTO public.ui_translations (key, lang_code, value, status, origin)
  VALUES (v_man, v_base, 'manual probe', 'approved', 'manual'),
         (v_syn, v_base, 'sync probe',   'approved', 'sync')
  ON CONFLICT (key, lang_code) DO UPDATE
    SET origin = EXCLUDED.origin, orphaned = false;

  -- The catalog as it stands, minus the sync probe: a SHRUNKEN sync.
  SELECT jsonb_object_agg(k, 'x') INTO v_full
    FROM (SELECT DISTINCT key AS k FROM public.ui_translations) s;
  v_short := v_full - v_syn;

  v_res := public.ui_sync_mark_orphans(v_short);

  SELECT orphaned INTO v_flag FROM public.ui_translations
   WHERE key = v_man AND lang_code = v_base;
  IF v_flag THEN
    RAISE EXCEPTION 'PROOF 1 FAILED: a manual-origin key was orphaned by sync';
  END IF;

  SELECT orphaned INTO v_flag FROM public.ui_translations
   WHERE key = v_syn AND lang_code = v_base;
  IF NOT v_flag THEN
    RAISE EXCEPTION 'PROOF 2 FAILED: a sync-origin key absent from the payload was not orphaned';
  END IF;

  -- Re-sync with the full catalog clears it again.
  v_res := public.ui_sync_mark_orphans(v_full);
  SELECT orphaned INTO v_flag FROM public.ui_translations
   WHERE key = v_syn AND lang_code = v_base;
  IF v_flag THEN
    RAISE EXCEPTION 'PROOF 3 FAILED: a returning sync key was not un-orphaned';
  END IF;

  -- Grants read-back (totality: both roles present).
  IF NOT has_table_privilege('authenticated', 'public.ui_translations', 'SELECT') THEN
    RAISE EXCEPTION 'PROOF 4 FAILED: authenticated cannot read ui_translations';
  END IF;
  IF NOT has_table_privilege('service_role', 'public.ui_translations', 'INSERT') THEN
    RAISE EXCEPTION 'PROOF 5 FAILED: service_role lacks write on ui_translations';
  END IF;

  -- Backfill totality: no non-scratch row is left unowned.
  IF EXISTS (SELECT 1 FROM public.ui_translations
              WHERE origin <> 'sync' AND key NOT LIKE 'e2e.%') THEN
    RAISE EXCEPTION 'PROOF 6 FAILED: a non-scratch key was left without sync origin';
  END IF;

  DELETE FROM public.ui_translations WHERE key IN (v_man, v_syn);
  RAISE NOTICE 'U4g-12 proofs OK (manual survives, sync orphans, re-sync clears)';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260831130000') ON CONFLICT DO NOTHING;