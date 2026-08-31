-- U4g-3b — the trigger helper is internal: no role may call it directly
-- (guard law: every SECURITY DEFINER function restates its REVOKEs in-file).
REVOKE ALL ON FUNCTION public.languages_append_sort() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.languages_append_sort() FROM anon;
REVOKE ALL ON FUNCTION public.languages_append_sort() FROM authenticated;

DO $proof$
BEGIN
  IF has_function_privilege('anon', 'public.languages_append_sort()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.languages_append_sort()', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF FAILED: trigger helper still reachable by client roles';
  END IF;
  RAISE NOTICE 'U4g-3b PROOF OK';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260831100000') ON CONFLICT DO NOTHING;