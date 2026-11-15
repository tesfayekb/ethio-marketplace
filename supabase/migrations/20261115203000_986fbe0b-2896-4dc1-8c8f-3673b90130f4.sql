-- e2e-areas: admin-translations

-- Foundations 1, turn F1-5a, part 1 — THE TWO LOST SERVICE-ROLE GRANTS RESTORED (DEC-392; brief
-- docs/governance/briefs/f1-doors-5a.md, ruling docs/governance/briefs/f1-doors-5a-ruling-2.md §2).
-- A DROP + CREATE that restated only authenticated took the service role's EXECUTE from two functions:
-- admin_list_translations (20260901234603, 2026-09-01) and admin_upsert_language (20261114114100, F1-3). Each grant
-- is the one its earlier declaration gave. No browser role gains or loses anything; no body changes.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115150800') THEN
    RAISE EXCEPTION 'F1-5a part 1: F1-4b (its last part, 08f47ace) must be applied first';
  END IF;
  IF to_regprocedure('public.admin_list_translations(text,text,boolean,text,integer,integer,boolean)') IS NULL
     OR to_regprocedure('public.admin_upsert_language(text,text,text,boolean,text[])') IS NULL THEN
    RAISE EXCEPTION 'F1-5a part 1: a function whose grant is restored is missing';
  END IF;
END $pre$;

GRANT EXECUTE ON FUNCTION public.admin_list_translations(text, text, boolean, text, integer, integer, boolean) TO service_role;
GRANT EXECUTE ON FUNCTION public.admin_upsert_language(text, text, text, boolean, text[]) TO service_role;

-- Proof: the service role may execute both; the browser roles are as they were (authenticated may, anon may not).
DO $proof$
DECLARE
  v_fns text[] := ARRAY[
    'public.admin_list_translations(text,text,boolean,text,integer,integer,boolean)',
    'public.admin_upsert_language(text,text,text,boolean,text[])'];
  v_fn  text;
BEGIN
  FOREACH v_fn IN ARRAY v_fns LOOP
    IF NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-5a part 1 proof: service_role may not execute %', v_fn;
    END IF;
    IF NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-5a part 1 proof: authenticated lost EXECUTE on %', v_fn;
    END IF;
    IF has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-5a part 1 proof: anon may execute %', v_fn;
    END IF;
  END LOOP;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115220000') ON CONFLICT DO NOTHING;
