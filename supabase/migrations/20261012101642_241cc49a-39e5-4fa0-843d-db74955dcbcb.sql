-- Bundle 11, turn C6 (2026-10-12). Tier A. The translations export reads by key (INC-568, INC-452's class).
-- e2e-areas: admin-translations
-- A. admin_export_translations(lang, after, limit) — NEW: one language's rows (every status, orphaned or not), with
--    the base language's value and context, ordered by key, after the key given, at most `limit` (1 to 1000) rows.
--    The export asks for each next page after the last key it already has, so another writer adding or removing
--    rows in the language between two pages can neither repeat nor drop a row that was there throughout.
--    The same right as the list it replaces for the export: translations:view. Read only.
-- B. Proofs: catalogue reads and calls with no session or a scratch identity that holds nothing; the door's
--    behaviour is proven by TR-29 and the export's unit tests.

-- ===== A — the export's reader, by key =====
CREATE FUNCTION public.admin_export_translations(
  p_lang text, p_after text DEFAULT NULL, p_limit integer DEFAULT 1000)
RETURNS TABLE(key text, lang_code text, value text, source_value text, status text,
              machine boolean, flagged boolean, flag_note text, updated_by uuid,
              updated_at timestamp with time zone, approved_by uuid,
              approved_at timestamp with time zone, orphaned boolean, context text)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
#variable_conflict use_column
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(auth.uid(), 'translations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 1000 THEN
    RAISE EXCEPTION 'limit out of range';
  END IF;

  RETURN QUERY
  WITH base AS (SELECT l.code FROM public.languages l WHERE l.is_base LIMIT 1)
  SELECT t.key, t.lang_code, t.value, src.value AS source_value, t.status,
         t.machine, t.flagged, t.flag_note, t.updated_by, t.updated_at,
         t.approved_by, t.approved_at, t.orphaned, src.context AS context
    FROM public.ui_translations t
    LEFT JOIN public.ui_translations src
      ON src.key = t.key AND src.lang_code = (SELECT code FROM base)
   WHERE t.lang_code = p_lang
     AND (p_after IS NULL OR t.key > p_after)
   ORDER BY t.key
   LIMIT p_limit;
END $$;

REVOKE ALL ON FUNCTION public.admin_export_translations(text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_translations(text, text, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_export_translations(text, text, integer) TO service_role;

-- ===== B — proofs (catalogue reads, and calls with no session or a scratch identity that holds nothing) =====
DO $proof$
DECLARE
  v_fn  text := 'public.admin_export_translations(text,text,integer)';
  v_def text;
  v_err text;
  v_who uuid := gen_random_uuid();
BEGIN
  -- B1: a stable definer with a fixed search path; the signed-in role runs it, anon and PUBLIC do not.
  IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
     OR (SELECT p.proconfig FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> ARRAY['search_path=public']
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> 's' THEN
    RAISE EXCEPTION 'C6 B1: % is not a stable definer with its search path', v_fn;
  END IF;
  IF has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
     OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                 WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
    RAISE EXCEPTION 'C6 B1: % privileges', v_fn;
  END IF;

  -- B2: its gates in order, the page asked for after a key, ordered by key, and nothing written.
  v_def := pg_get_functiondef(v_fn::regprocedure);
  IF v_def NOT LIKE '%auth.uid() IS NULL%has_permission(auth.uid(), ''translations'', ''view'')%p_limit > 1000%t.key > p_after%ORDER BY t.key%LIMIT p_limit%' THEN
    RAISE EXCEPTION 'C6 B2: admin_export_translations''s gates or its order';
  END IF;
  IF v_def LIKE '%UPDATE public.%' OR v_def LIKE '%INSERT INTO%' OR v_def LIKE '%DELETE%' OR v_def LIKE '%OFFSET%' THEN
    RAISE EXCEPTION 'C6 B2: the export reader writes nothing and never pages by position';
  END IF;

  -- B3: with no session it refuses before reading anything.
  PERFORM set_config('request.jwt.claims', '', true);
  v_err := NULL;
  BEGIN
    PERFORM public.admin_export_translations('en');
  EXCEPTION WHEN OTHERS THEN
    v_err := SQLERRM;
  END;
  IF v_err IS DISTINCT FROM 'not signed in' THEN
    RAISE EXCEPTION 'C6 B3: the export reader answered % to a call with no session', coalesce(v_err, 'nothing');
  END IF;

  -- B4: a scratch identity that holds no permission (no account row is written) is refused.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who, 'role', 'authenticated')::text, true);
  v_err := NULL;
  BEGIN
    PERFORM public.admin_export_translations('en');
  EXCEPTION WHEN OTHERS THEN
    v_err := SQLERRM;
  END;
  IF v_err IS DISTINCT FROM 'permission denied' THEN
    RAISE EXCEPTION 'C6 B4: the export reader answered % to an identity with no permission', coalesce(v_err, 'nothing');
  END IF;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261012180000') ON CONFLICT (version) DO NOTHING;
