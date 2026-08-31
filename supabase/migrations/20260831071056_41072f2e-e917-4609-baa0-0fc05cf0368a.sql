-- U4g-4 — trigger helpers default to SECURITY INVOKER; DEFINER is for gated
-- entry points only (INC-099c). Re-declare languages_append_sort as INVOKER and
-- restate its REVOKEs in the SAME file (defence in depth: triggers are never
-- called directly).

CREATE OR REPLACE FUNCTION public.languages_append_sort()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.sort IS NULL OR (NEW.sort = 0 AND COALESCE(NEW.is_base, false) = false) THEN
    NEW.sort := public.next_language_sort();
  END IF;
  RETURN NEW;
END $$;

REVOKE ALL ON FUNCTION public.languages_append_sort() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.languages_append_sort() FROM anon;
REVOKE ALL ON FUNCTION public.languages_append_sort() FROM authenticated;

-- P1 — the function is no longer SECURITY DEFINER.
DO $p1$
DECLARE v_secdef boolean;
BEGIN
  SELECT p.prosecdef INTO v_secdef
  FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
  WHERE n.nspname = 'public' AND p.proname = 'languages_append_sort';
  IF v_secdef IS DISTINCT FROM false THEN
    RAISE EXCEPTION 'PROOF FAILED: languages_append_sort is not SECURITY INVOKER (prosecdef=%)', v_secdef;
  END IF;
  RAISE NOTICE 'U4g-4 P1 OK — languages_append_sort is SECURITY INVOKER';
END $p1$;

-- P2 — the trigger still appends: a scratch language lands at max+1, then goes.
DO $p2$
DECLARE v_expected integer; v_got integer;
BEGIN
  SELECT COALESCE(MAX(sort), 0) + 1 INTO v_expected FROM public.languages;
  INSERT INTO public.languages(code, name_en, name_native)
  VALUES ('zxq', 'U4g-4 scratch', 'U4g-4 scratch');
  SELECT sort INTO v_got FROM public.languages WHERE code = 'zxq';
  DELETE FROM public.languages WHERE code = 'zxq';
  IF v_got IS DISTINCT FROM v_expected THEN
    RAISE EXCEPTION 'PROOF FAILED: appended sort % (expected %)', v_got, v_expected;
  END IF;
  RAISE NOTICE 'U4g-4 P2 OK — trigger appended at % under invoker semantics', v_got;
END $p2$;

-- P3 — grant read-back: no client role may execute the trigger helper.
DO $p3$
BEGIN
  IF has_function_privilege('anon', 'public.languages_append_sort()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.languages_append_sort()', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF FAILED: trigger helper reachable by a client role';
  END IF;
  RAISE NOTICE 'U4g-4 P3 OK — anon/authenticated denied EXECUTE';
END $p3$;

INSERT INTO public.migration_marks(version) VALUES ('20260831110000') ON CONFLICT DO NOTHING;