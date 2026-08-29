-- =====================================================================
-- Phase U4a — Translations foundation (Tier A).
--
-- DB is the runtime truth for UI copy (D3, ratified 2026-08-29): en.ts /
-- am.ts remain the developer seed and the offline fallback; the shipped
-- bundle for a language is its APPROVED rows, served by get_ui_bundle().
--
-- Law F3: these functions are the AUTHORITY. Every mutation re-checks
-- has_permission() + require_step_up_if_needed() and — unless the caller
-- holds translations:manage — a translator_languages scope row.
-- Law F4: no phantom success; every refusal RAISEs.
-- INC-074: every SECURITY DEFINER function restates its REVOKE/GRANT.
-- Strings are DATA: values are stored and rendered as text, never HTML.
-- Self-marking (U1f-3 law): the last statement marks this version.
-- =====================================================================

-- ---------------------------------------------------------------------
-- A. languages
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.languages (
  code            text PRIMARY KEY,
  name_en         text NOT NULL,
  name_native     text NOT NULL,
  rtl             boolean NOT NULL DEFAULT false,
  is_base         boolean NOT NULL DEFAULT false,
  enabled_admin   boolean NOT NULL DEFAULT false,
  enabled_public  boolean NOT NULL DEFAULT false,
  sort            integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.languages TO anon, authenticated;
GRANT ALL ON public.languages TO service_role;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "languages readable when public or base" ON public.languages;
CREATE POLICY "languages readable when public or base"
  ON public.languages FOR SELECT
  TO anon, authenticated
  USING (enabled_public OR is_base);

INSERT INTO public.languages (code, name_en, name_native, rtl, is_base, enabled_admin, enabled_public, sort)
VALUES
  ('en', 'English',      'English',      false, true,  true,  true,  0),
  ('am', 'Amharic',      'አማርኛ',        false, false, true,  true,  1),
  ('om', 'Afaan Oromoo', 'Afaan Oromoo', false, false, true,  false, 2),
  ('ti', 'Tigrinya',     'ትግርኛ',        false, false, true,  false, 3)
ON CONFLICT (code) DO NOTHING;

-- ---------------------------------------------------------------------
-- B. ui_translations — definer-only; the public bundle flows through RPC.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ui_translations (
  key         text NOT NULL,
  lang_code   text NOT NULL REFERENCES public.languages(code) ON DELETE CASCADE,
  value       text,
  status      text NOT NULL DEFAULT 'untranslated'
              CHECK (status IN ('untranslated', 'machine', 'edited', 'approved')),
  machine     boolean NOT NULL DEFAULT false,
  flagged     boolean NOT NULL DEFAULT false,
  flag_note   text,
  updated_by  uuid,
  updated_at  timestamptz NOT NULL DEFAULT now(),
  approved_by uuid,
  approved_at timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (key, lang_code)
);

GRANT ALL ON public.ui_translations TO service_role;
ALTER TABLE public.ui_translations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ui_translations definer only" ON public.ui_translations;
CREATE POLICY "ui_translations definer only"
  ON public.ui_translations FOR ALL
  TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE INDEX IF NOT EXISTS ui_translations_lang_status_idx
  ON public.ui_translations (lang_code, status);

-- ---------------------------------------------------------------------
-- C. translator_languages — the SCOPE model (roles = verbs, this = scope).
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.translator_languages (
  user_id     uuid NOT NULL,
  lang_code   text NOT NULL REFERENCES public.languages(code) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, lang_code)
);

GRANT ALL ON public.translator_languages TO service_role;
ALTER TABLE public.translator_languages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "translator_languages definer only" ON public.translator_languages;
CREATE POLICY "translator_languages definer only"
  ON public.translator_languages FOR ALL
  TO anon, authenticated
  USING (false) WITH CHECK (false);

-- ---------------------------------------------------------------------
-- D. entity_translations — content copy (locations/categories/…).
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.entity_translations (
  entity_type text NOT NULL,
  entity_id   uuid NOT NULL,
  field       text NOT NULL,
  lang_code   text NOT NULL REFERENCES public.languages(code) ON DELETE CASCADE,
  value       text,
  status      text NOT NULL DEFAULT 'untranslated'
              CHECK (status IN ('untranslated', 'machine', 'edited', 'approved')),
  machine     boolean NOT NULL DEFAULT false,
  flagged     boolean NOT NULL DEFAULT false,
  flag_note   text,
  updated_by  uuid,
  updated_at  timestamptz NOT NULL DEFAULT now(),
  approved_by uuid,
  approved_at timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (entity_type, entity_id, field, lang_code)
);

GRANT ALL ON public.entity_translations TO service_role;
ALTER TABLE public.entity_translations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "entity_translations definer only" ON public.entity_translations;
CREATE POLICY "entity_translations definer only"
  ON public.entity_translations FOR ALL
  TO anon, authenticated
  USING (false) WITH CHECK (false);

-- BACKFILL: locations.name_am (columns retained; readers adopt in U4d).
INSERT INTO public.entity_translations (entity_type, entity_id, field, lang_code, value, status)
SELECT 'location', l.id, 'name', 'am', l.name_am, 'approved'
  FROM public.locations l
 WHERE l.name_am IS NOT NULL
ON CONFLICT (entity_type, entity_id, field, lang_code) DO NOTHING;

-- ---------------------------------------------------------------------
-- E. PERMISSIONS (DEC-017 pattern): registered, assignable, granted to none.
-- ---------------------------------------------------------------------
INSERT INTO public.resources (name, display_name, description)
SELECT 'translations', 'Translations', 'UI and content translation management'
 WHERE NOT EXISTS (SELECT 1 FROM public.resources WHERE name = 'translations');

INSERT INTO public.permissions (resource_id, action, description, requires_step_up, assignable)
SELECT res.id, v.action, v.descr, v.step_up, true
  FROM public.resources res
  CROSS JOIN (VALUES
    ('view',    'View translations and coverage', false),
    ('update',  'Edit translation values',        true),
    ('machine', 'Run machine translation',        true),
    ('approve', 'Approve or clear translations',  true),
    ('manage',  'Manage languages and translators', true)
  ) AS v(action, descr, step_up)
 WHERE res.name = 'translations'
   AND NOT EXISTS (
     SELECT 1 FROM public.permissions p
      WHERE p.resource_id = res.id AND p.action = v.action);

UPDATE public.permissions p
   SET requires_step_up = (p.action <> 'view'),
       assignable = true
  FROM public.resources res
 WHERE res.id = p.resource_id AND res.name = 'translations';

-- ---------------------------------------------------------------------
-- F. HELPERS
-- ---------------------------------------------------------------------

-- Pure: the {token} set of a string. No privileges involved.
CREATE OR REPLACE FUNCTION public.translation_placeholders(p_text text)
RETURNS text[] LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT COALESCE(
    (SELECT array_agg(DISTINCT m[1] ORDER BY m[1])
       FROM regexp_matches(COALESCE(p_text, ''), '\{([^{}]+)\}', 'g') AS m),
    ARRAY[]::text[]);
$$;

-- Scope: manage-holders are exempt; everyone else needs the assignment row.
CREATE OR REPLACE FUNCTION public.translation_scope_ok(p_lang text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_permission(auth.uid(), 'translations', 'manage')
      OR EXISTS (SELECT 1 FROM public.translator_languages tl
                  WHERE tl.user_id = auth.uid() AND tl.lang_code = p_lang);
$$;
REVOKE ALL ON FUNCTION public.translation_scope_ok(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.translation_scope_ok(text) TO authenticated;

-- ---------------------------------------------------------------------
-- G. RPCs
-- ---------------------------------------------------------------------

-- The runtime bundle: approved rows only, public/base languages only.
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
     WHERE t.lang_code = p_lang AND t.status = 'approved' AND t.value IS NOT NULL
  ), '{}'::jsonb);
END $$;
REVOKE ALL ON FUNCTION public.get_ui_bundle(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_ui_bundle(text) TO anon, authenticated;

-- Console list: rows + the en source value + a window total.
CREATE OR REPLACE FUNCTION public.admin_list_translations(
  p_lang text,
  p_status text DEFAULT NULL,
  p_flagged boolean DEFAULT NULL,
  p_search text DEFAULT NULL,
  p_limit int DEFAULT 50,
  p_offset int DEFAULT 0)
RETURNS TABLE (
  key text, lang_code text, value text, source_value text, status text,
  machine boolean, flagged boolean, flag_note text,
  updated_by uuid, updated_at timestamptz,
  approved_by uuid, approved_at timestamptz, total_count bigint)
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
           t.approved_by, t.approved_at
      FROM public.ui_translations t
      LEFT JOIN public.ui_translations src
        ON src.key = t.key AND src.lang_code = (SELECT code FROM base)
     WHERE t.lang_code = p_lang
       AND (p_status IS NULL OR p_status = '' OR p_status = 'all' OR t.status = p_status)
       AND (p_flagged IS NULL OR t.flagged = p_flagged)
       AND (p_search IS NULL OR p_search = ''
            OR t.key ILIKE '%' || p_search || '%'
            OR COALESCE(t.value, '') ILIKE '%' || p_search || '%'
            OR COALESCE(src.value, '') ILIKE '%' || p_search || '%')
  )
  SELECT f.key, f.lang_code, f.value, f.source_value, f.status, f.machine,
         f.flagged, f.flag_note, f.updated_by, f.updated_at, f.approved_by,
         f.approved_at, COUNT(*) OVER () AS total_count
    FROM filtered f
   ORDER BY f.key
   LIMIT GREATEST(COALESCE(p_limit, 50), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $$;
REVOKE ALL ON FUNCTION public.admin_list_translations(text, text, boolean, text, int, int) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_translations(text, text, boolean, text, int, int) TO authenticated;

-- Human edit.
CREATE OR REPLACE FUNCTION public.admin_save_translation(p_key text, p_lang text, p_value text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_base    text;
  v_src     text;
  v_want    text[];
  v_got     text[];
  v_flag    boolean := false;
  v_note    text := NULL;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'update');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    RAISE EXCEPTION 'base language rows are sync-owned';
  END IF;

  SELECT t.value INTO v_src
    FROM public.ui_translations t WHERE t.key = p_key AND t.lang_code = v_base;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown translation key';
  END IF;

  v_want := public.translation_placeholders(v_src);
  v_got  := public.translation_placeholders(p_value);
  IF v_want IS DISTINCT FROM v_got THEN
    v_flag := true;
    v_note := 'placeholder mismatch: expected {' ||
              array_to_string(v_want, '}, {') || '}';
  END IF;

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      flagged, flag_note, updated_by, updated_at)
  VALUES (p_key, p_lang, p_value, 'edited', false, v_flag, v_note, auth.uid(), now())
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'edited', machine = false,
        flagged = EXCLUDED.flagged, flag_note = EXCLUDED.flag_note,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('translation.save', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', p_lang, 'action', 'save',
                       'machine', false, 'flagged', v_flag));
END $$;
REVOKE ALL ON FUNCTION public.admin_save_translation(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_translation(text, text, text) TO authenticated;

-- Machine write (U4c's edge function calls this after the provider returns).
CREATE OR REPLACE FUNCTION public.admin_machine_translation(p_key text, p_lang text, p_value text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_base text; v_src text; v_want text[]; v_got text[];
  v_flag boolean := false; v_note text := NULL;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'machine') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'machine');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    RAISE EXCEPTION 'base language rows are sync-owned';
  END IF;

  SELECT t.value INTO v_src
    FROM public.ui_translations t WHERE t.key = p_key AND t.lang_code = v_base;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown translation key'; END IF;

  v_want := public.translation_placeholders(v_src);
  v_got  := public.translation_placeholders(p_value);
  IF v_want IS DISTINCT FROM v_got THEN
    v_flag := true;
    v_note := 'placeholder mismatch: expected {' || array_to_string(v_want, '}, {') || '}';
  END IF;

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      flagged, flag_note, updated_by, updated_at)
  VALUES (p_key, p_lang, p_value, 'machine', true, v_flag, v_note, auth.uid(), now())
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'machine', machine = true,
        flagged = EXCLUDED.flagged, flag_note = EXCLUDED.flag_note,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('translation.machine', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', p_lang, 'action', 'machine',
                       'machine', true, 'flagged', v_flag));
END $$;
REVOKE ALL ON FUNCTION public.admin_machine_translation(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_machine_translation(text, text, text) TO authenticated;

-- Approve / clear.
CREATE OR REPLACE FUNCTION public.admin_set_translation_status(p_key text, p_lang text, p_action text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
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

  IF p_action = 'approve' THEN
    UPDATE public.ui_translations
       SET status = 'approved', approved_by = auth.uid(), approved_at = now(),
           updated_by = auth.uid(), updated_at = now()
     WHERE key = p_key AND lang_code = p_lang;
  ELSE
    UPDATE public.ui_translations
       SET status = 'untranslated', value = NULL, machine = false,
           flagged = false, flag_note = NULL,
           approved_by = NULL, approved_at = NULL,
           updated_by = auth.uid(), updated_at = now()
     WHERE key = p_key AND lang_code = p_lang;
  END IF;
  IF NOT FOUND THEN RAISE EXCEPTION 'translation row not found'; END IF;

  PERFORM public.log_audit('translation.status', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', p_lang, 'action', p_action, 'machine', false));
END $$;
REVOKE ALL ON FUNCTION public.admin_set_translation_status(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_translation_status(text, text, text) TO authenticated;

-- Catalog sync: en is sync-owned; every enabled_admin language gains the keys.
CREATE OR REPLACE FUNCTION public.admin_sync_ui_keys(p_en jsonb, p_am jsonb DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_base    text;
  v_en      bigint := 0;
  v_am      bigint := 0;
  v_added   jsonb := '{}'::jsonb;
  v_lang    record;
  v_n       bigint;
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

  PERFORM public.log_audit('translation.sync', 'ui_translations', v_base,
    jsonb_build_object('lang', v_base, 'action', 'sync', 'machine', false,
                       'en_upserted', v_en, 'keys_added_per_lang', v_added,
                       'am_seeded', v_am));

  RETURN jsonb_build_object('en_upserted', v_en, 'keys_added_per_lang', v_added,
                            'am_seeded', v_am);
END $$;
REVOKE ALL ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) TO authenticated;

-- Language registry.
CREATE OR REPLACE FUNCTION public.admin_upsert_language(
  p_code text, p_name_en text, p_name_native text, p_rtl boolean DEFAULT false)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_code text;
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

  INSERT INTO public.languages (code, name_en, name_native, rtl)
  VALUES (v_code, btrim(p_name_en), btrim(p_name_native), COALESCE(p_rtl, false))
  ON CONFLICT (code) DO UPDATE
    SET name_en = EXCLUDED.name_en, name_native = EXCLUDED.name_native,
        rtl = EXCLUDED.rtl, updated_at = now();

  PERFORM public.log_audit('translation.language_upsert', 'languages', v_code,
    jsonb_build_object('lang', v_code, 'action', 'upsert', 'machine', false));
END $$;
REVOKE ALL ON FUNCTION public.admin_upsert_language(text, text, text, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_language(text, text, text, boolean) TO authenticated;

-- S10 coverage gate: a language goes public only when it is fully approved.
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

-- Translator scope assignment (replace-set semantics).
CREATE OR REPLACE FUNCTION public.admin_set_translator_languages(p_user uuid, p_langs text[])
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_old text[]; v_new text[];
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = p_user) THEN
    RAISE EXCEPTION 'user not found';
  END IF;

  v_new := COALESCE(p_langs, ARRAY[]::text[]);
  IF EXISTS (
    SELECT 1 FROM unnest(v_new) c
     WHERE NOT EXISTS (SELECT 1 FROM public.languages l WHERE l.code = c)
  ) THEN
    RAISE EXCEPTION 'unknown language';
  END IF;

  SELECT COALESCE(array_agg(tl.lang_code ORDER BY tl.lang_code), ARRAY[]::text[])
    INTO v_old FROM public.translator_languages tl WHERE tl.user_id = p_user;

  DELETE FROM public.translator_languages
   WHERE user_id = p_user AND NOT (lang_code = ANY (v_new));
  INSERT INTO public.translator_languages (user_id, lang_code)
  SELECT p_user, c FROM unnest(v_new) c
  ON CONFLICT DO NOTHING;

  PERFORM public.log_audit('translation.translator_scope', 'translator_languages',
    p_user::text,
    jsonb_build_object('action', 'scope', 'machine', false,
                       'old', to_jsonb(v_old), 'new', to_jsonb(v_new)));
END $$;
REVOKE ALL ON FUNCTION public.admin_set_translator_languages(uuid, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_translator_languages(uuid, text[]) TO authenticated;

-- Coverage meter feed.
CREATE OR REPLACE FUNCTION public.admin_translation_stats(p_lang text DEFAULT NULL)
RETURNS TABLE (
  lang_code text, total bigint, untranslated bigint, machine_count bigint,
  edited bigint, approved bigint, flagged bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
#variable_conflict use_column
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  RETURN QUERY
  SELECT t.lang_code, count(*),
         count(*) FILTER (WHERE t.status = 'untranslated'),
         count(*) FILTER (WHERE t.status = 'machine'),
         count(*) FILTER (WHERE t.status = 'edited'),
         count(*) FILTER (WHERE t.status = 'approved'),
         count(*) FILTER (WHERE t.flagged)
    FROM public.ui_translations t
   WHERE p_lang IS NULL OR t.lang_code = p_lang
   GROUP BY t.lang_code
   ORDER BY t.lang_code;
END $$;
REVOKE ALL ON FUNCTION public.admin_translation_stats(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_translation_stats(text) TO authenticated;

-- ---------------------------------------------------------------------
-- H. PROOFS — dynamic principals, fail loudly, scratch rows cleaned up.
-- ---------------------------------------------------------------------
DO $proof$
DECLARE
  v_super   uuid;
  v_base    uuid;
  v_role    uuid;
  v_session uuid := gen_random_uuid();
  v_factor  uuid := gen_random_uuid();
  can_write boolean := true;
  ok        boolean;
  n         bigint;
  v_row     public.ui_translations%ROWTYPE;
  v_res     jsonb;
  v_bundle  jsonb;
BEGIN
  SELECT ur.user_id INTO v_super FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id WHERE r.name = 'super_admin' LIMIT 1;
  SELECT ur.user_id INTO v_base FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name = 'user' AND NOT public.is_super_admin(ur.user_id) LIMIT 1;
  IF v_super IS NULL OR v_base IS NULL THEN
    RAISE EXCEPTION 'U4a PROOFS FAILED: no dynamic principals available';
  END IF;

  -- P1: a base user is refused the list.
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_base::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
  ok := false;
  BEGIN
    PERFORM * FROM public.admin_list_translations('am', NULL, NULL, NULL, 5, 0);
  EXCEPTION WHEN others THEN
    IF SQLERRM ILIKE '%permission denied%' THEN ok := true; ELSE RAISE; END IF;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P1 FAILED: a base user listed translations'; END IF;
  RAISE NOTICE 'P1 PASS: base user refused by admin_list_translations';

  -- Scratch custom role carrying translations:update/approve/view (NOT manage).
  PERFORM set_config('request.jwt.claims', NULL, true);
  INSERT INTO public.roles (name, display_name, description, is_system, priority)
  VALUES ('u4a-proof-translator', 'U4a proof', 'scratch', false, 10)
  RETURNING id INTO v_role;
  INSERT INTO public.role_permissions (role_id, permission_id, is_core)
  SELECT v_role, p.id, false FROM public.permissions p
    JOIN public.resources res ON res.id = p.resource_id
   WHERE res.name = 'translations' AND p.action IN ('view', 'update', 'approve');
  INSERT INTO public.user_roles (user_id, role_id, scope_type)
  VALUES (v_base, v_role, 'global');

  -- Seed the en catalog rows the validator reads (sync path is proved in P7).
  INSERT INTO public.ui_translations (key, lang_code, value, status)
  VALUES ('u4a.proof.plain', 'en', 'Hello there', 'approved'),
         ('u4a.proof.token', 'en', 'Hello {name}', 'approved')
  ON CONFLICT (key, lang_code) DO NOTHING;
  INSERT INTO public.ui_translations (key, lang_code, status)
  SELECT k, 'am', 'untranslated' FROM unnest(ARRAY['u4a.proof.plain','u4a.proof.token']) k
  ON CONFLICT (key, lang_code) DO NOTHING;

  -- Step-up simulation (U1f-4 factor + fresh amr pattern).
  BEGIN
    INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_base, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status,
                                 created_at, updated_at, secret)
    VALUES (v_factor, v_base, 'u4a-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
  EXCEPTION WHEN others THEN
    can_write := false;
  END;

  IF NOT can_write THEN
    RAISE NOTICE 'P2..P7 STEP-UP PATH DEFERRED: auth.* is not writable here; covered by U4b E2E';
  ELSE
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_base::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text)::text, true);

    -- P2: granted the verb but NOT assigned the language.
    ok := false;
    BEGIN
      PERFORM public.admin_save_translation('u4a.proof.plain', 'am', 'ሰላም');
    EXCEPTION WHEN others THEN
      IF SQLERRM ILIKE '%not assigned to this language%' THEN ok := true; ELSE RAISE; END IF;
    END;
    IF NOT ok THEN RAISE EXCEPTION 'P2 FAILED: an unassigned translator wrote am'; END IF;
    RAISE NOTICE 'P2 PASS: scope check refuses an unassigned language';

    -- P3: assigned -> save succeeds, status edited, audited.
    INSERT INTO public.translator_languages (user_id, lang_code) VALUES (v_base, 'am')
    ON CONFLICT DO NOTHING;
    PERFORM public.admin_save_translation('u4a.proof.plain', 'am', 'ሰላም');
    SELECT * INTO v_row FROM public.ui_translations
     WHERE key = 'u4a.proof.plain' AND lang_code = 'am';
    IF v_row.status <> 'edited' OR v_row.value IS NULL OR v_row.flagged THEN
      RAISE EXCEPTION 'P3 FAILED: row is % / flagged=%', v_row.status, v_row.flagged;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.audit_log
                    WHERE action = 'translation.save' AND entity_id = 'u4a.proof.plain') THEN
      RAISE EXCEPTION 'P3 FAILED: the save was not audited';
    END IF;
    RAISE NOTICE 'P3 PASS: assigned save writes edited + audit';

    -- P4: placeholder mismatch is saved FLAGGED with the note.
    PERFORM public.admin_save_translation('u4a.proof.token', 'am', 'ሰላም');
    SELECT * INTO v_row FROM public.ui_translations
     WHERE key = 'u4a.proof.token' AND lang_code = 'am';
    IF NOT v_row.flagged OR v_row.flag_note NOT LIKE 'placeholder mismatch:%' THEN
      RAISE EXCEPTION 'P4 FAILED: mismatch not flagged (note=%)', v_row.flag_note;
    END IF;
    RAISE NOTICE 'P4 PASS: placeholder validator flags with %', v_row.flag_note;

    -- P5: approve sets approved_by; clear empties the row.
    PERFORM public.admin_set_translation_status('u4a.proof.plain', 'am', 'approve');
    SELECT * INTO v_row FROM public.ui_translations
     WHERE key = 'u4a.proof.plain' AND lang_code = 'am';
    IF v_row.status <> 'approved' OR v_row.approved_by IS NULL THEN
      RAISE EXCEPTION 'P5 FAILED: approve did not stamp provenance';
    END IF;
    PERFORM public.admin_set_translation_status('u4a.proof.token', 'am', 'clear');
    SELECT * INTO v_row FROM public.ui_translations
     WHERE key = 'u4a.proof.token' AND lang_code = 'am';
    IF v_row.status <> 'untranslated' OR v_row.value IS NOT NULL OR v_row.flagged THEN
      RAISE EXCEPTION 'P5 FAILED: clear left residue';
    END IF;
    RAISE NOTICE 'P5 PASS: approve stamps, clear empties';

    -- Manage-gated proofs run as the super admin (short-circuits the verb).
    UPDATE auth.sessions SET user_id = v_super WHERE id = v_session;
    UPDATE auth.mfa_factors SET user_id = v_super WHERE id = v_factor;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text)::text, true);

    -- P6: the S10 coverage gate refuses a public flip with untranslated rows.
    INSERT INTO public.ui_translations (key, lang_code, status)
    VALUES ('u4a.proof.plain', 'om', 'untranslated'), ('u4a.proof.token', 'om', 'untranslated')
    ON CONFLICT (key, lang_code) DO NOTHING;
    ok := false;
    BEGIN
      PERFORM public.admin_set_language_flags('om', true, true);
    EXCEPTION WHEN others THEN
      IF SQLERRM ILIKE 'language not fully approved:%' THEN
        ok := true;
        RAISE NOTICE 'P6 PASS: %', SQLERRM;
      ELSE RAISE; END IF;
    END;
    IF NOT ok THEN RAISE EXCEPTION 'P6 FAILED: om went public unapproved'; END IF;

    -- P7: sync a 3-key catalog.
    v_res := public.admin_sync_ui_keys(
      jsonb_build_object('u4a.sync.a', 'A', 'u4a.sync.b', 'B', 'u4a.sync.c', 'C'),
      jsonb_build_object('u4a.sync.a', 'ሀ'));
    IF (v_res ->> 'en_upserted')::bigint <> 3 THEN
      RAISE EXCEPTION 'P7 FAILED: en_upserted=%', v_res ->> 'en_upserted';
    END IF;
    IF (v_res -> 'keys_added_per_lang' ->> 'am')::bigint <> 3
       OR (v_res -> 'keys_added_per_lang' ->> 'om')::bigint <> 3
       OR (v_res -> 'keys_added_per_lang' ->> 'ti')::bigint <> 3 THEN
      RAISE EXCEPTION 'P7 FAILED: per-lang adds = %', v_res -> 'keys_added_per_lang';
    END IF;
    IF (v_res ->> 'am_seeded')::bigint <> 1 THEN
      RAISE EXCEPTION 'P7 FAILED: am_seeded=%', v_res ->> 'am_seeded';
    END IF;
    RAISE NOTICE 'P7 PASS: sync result %', v_res;

    PERFORM set_config('request.jwt.claims', NULL, true);
    DELETE FROM auth.mfa_amr_claims WHERE session_id = v_session;
    DELETE FROM auth.mfa_factors WHERE id = v_factor;
    DELETE FROM auth.sessions WHERE id = v_session;
  END IF;

  PERFORM set_config('request.jwt.claims', NULL, true);

  -- P8: the backfill matches the source count.
  SELECT count(*) INTO n FROM public.entity_translations
   WHERE entity_type = 'location' AND field = 'name' AND lang_code = 'am';
  IF n <> (SELECT count(*) FROM public.locations WHERE name_am IS NOT NULL) THEN
    RAISE EXCEPTION 'P8 FAILED: backfill % vs source %', n,
      (SELECT count(*) FROM public.locations WHERE name_am IS NOT NULL);
  END IF;
  RAISE NOTICE 'P8 PASS: % location name_am rows backfilled', n;

  -- P9: the bundle carries approved rows only (anon-callable path).
  INSERT INTO public.ui_translations (key, lang_code, value, status)
  VALUES ('u4a.proof.bundle', 'am', 'ጸድቋል', 'approved')
  ON CONFLICT (key, lang_code) DO UPDATE SET value = EXCLUDED.value, status = 'approved';
  v_bundle := public.get_ui_bundle('am');
  IF NOT (v_bundle ? 'u4a.proof.bundle') THEN
    RAISE EXCEPTION 'P9 FAILED: approved key missing from the bundle';
  END IF;
  IF EXISTS (
    SELECT 1 FROM jsonb_object_keys(v_bundle) k
      JOIN public.ui_translations t ON t.key = k AND t.lang_code = 'am'
     WHERE t.status <> 'approved') THEN
    RAISE EXCEPTION 'P9 FAILED: the bundle leaked a non-approved row';
  END IF;
  RAISE NOTICE 'P9 PASS: bundle holds % approved keys', (SELECT count(*) FROM jsonb_object_keys(v_bundle));

  -- P10: five permissions, step-up per spec, assignable, zero grants.
  SELECT count(*) INTO n FROM public.permissions p
    JOIN public.resources res ON res.id = p.resource_id
   WHERE res.name = 'translations' AND p.assignable
     AND p.requires_step_up = (p.action <> 'view')
     AND p.action IN ('view', 'update', 'machine', 'approve', 'manage');
  IF n <> 5 THEN RAISE EXCEPTION 'P10 FAILED: % of 5 permissions correct', n; END IF;

  -- Cleanup BEFORE the zero-grant assertion: the scratch role held three.
  DELETE FROM public.user_roles WHERE role_id = v_role;
  DELETE FROM public.role_permissions WHERE role_id = v_role;
  DELETE FROM public.roles WHERE id = v_role;
  DELETE FROM public.translator_languages WHERE user_id = v_base;
  DELETE FROM public.ui_translations WHERE key LIKE 'u4a.%';

  SELECT count(*) INTO n FROM public.role_permissions rp
    JOIN public.permissions p ON p.id = rp.permission_id
    JOIN public.resources res ON res.id = p.resource_id
   WHERE res.name = 'translations';
  IF n <> 0 THEN RAISE EXCEPTION 'P10 FAILED: % translations grants exist', n; END IF;
  RAISE NOTICE 'P10 PASS: five permissions registered, assignable, zero grants';

  IF EXISTS (SELECT 1 FROM public.ui_translations WHERE key LIKE 'u4a.%')
     OR EXISTS (SELECT 1 FROM public.roles WHERE name = 'u4a-proof-translator') THEN
    RAISE EXCEPTION 'CLEANUP FAILED: scratch rows survived';
  END IF;
  RAISE NOTICE 'CLEANUP OK';
END $proof$;

-- Grant read-back matrix.
DO $grants$
DECLARE v_bad text;
BEGIN
  SELECT string_agg(f, ', ') INTO v_bad FROM (
    SELECT f FROM unnest(ARRAY[
      'admin_list_translations(text,text,boolean,text,int,int)',
      'admin_save_translation(text,text,text)',
      'admin_machine_translation(text,text,text)',
      'admin_set_translation_status(text,text,text)',
      'admin_sync_ui_keys(jsonb,jsonb)',
      'admin_upsert_language(text,text,text,boolean)',
      'admin_set_language_flags(text,boolean,boolean)',
      'admin_set_translator_languages(uuid,text[])',
      'admin_translation_stats(text)',
      'translation_scope_ok(text)']) f
    WHERE NOT has_function_privilege('authenticated', 'public.' || f, 'EXECUTE')
       OR has_function_privilege('anon', 'public.' || f, 'EXECUTE')
  ) x;
  IF v_bad IS NOT NULL THEN RAISE EXCEPTION 'GRANT MATRIX FAILED: %', v_bad; END IF;
  IF NOT has_function_privilege('anon', 'public.get_ui_bundle(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.get_ui_bundle(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'GRANT MATRIX FAILED: get_ui_bundle must be callable by anon';
  END IF;
  IF has_table_privilege('anon', 'public.ui_translations', 'SELECT')
     OR has_table_privilege('authenticated', 'public.ui_translations', 'SELECT')
     OR has_table_privilege('authenticated', 'public.translator_languages', 'SELECT')
     OR has_table_privilege('authenticated', 'public.entity_translations', 'SELECT') THEN
    RAISE EXCEPTION 'GRANT MATRIX FAILED: client roles reach a definer-only table';
  END IF;
  RAISE NOTICE 'GRANT MATRIX OK';
END $grants$;

INSERT INTO public.migration_marks(version) VALUES ('20260829050500') ON CONFLICT DO NOTHING;