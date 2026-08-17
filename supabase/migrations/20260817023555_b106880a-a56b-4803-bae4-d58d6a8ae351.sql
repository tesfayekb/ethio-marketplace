-- restates grants for definer functions re-declared in 20260816120338
-- Forward-only rider. CREATE OR REPLACE preserves live grants, but the
-- definer-guard law requires each file that (re-)declares a SECURITY DEFINER
-- function to be self-describing about its privilege posture. The lines below
-- are restated verbatim from the creating migration
-- 20260804174739_0ce87c13-1bf0-4cc8-8d61-8dd8212d961c.sql (lines 319-323).

REVOKE ALL ON FUNCTION public.submit_listing(uuid, uuid, uuid, text, text, char, jsonb, numeric, char, text, text, uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_listing(uuid, uuid, uuid, text, text, char, jsonb, numeric, char, text, text, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;

-- In-file proof: posture after restatement must be anon=false, authenticated=true.
DO $$
DECLARE
  v_bad int;
BEGIN
  SELECT count(*) INTO v_bad
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
  WHERE n.nspname = 'public'
    AND p.proname IN ('submit_listing', 'transition_listing')
    AND (has_function_privilege('anon', p.oid, 'EXECUTE')
         OR NOT has_function_privilege('authenticated', p.oid, 'EXECUTE'));
  IF v_bad > 0 THEN
    RAISE EXCEPTION 'grant restatement proof failed: % seam(s) have the wrong posture', v_bad;
  END IF;
END $$;