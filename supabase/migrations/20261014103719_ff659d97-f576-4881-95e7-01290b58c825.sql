-- Bundle 13 (photos), turn 14 (2026-10-14). Tier A. The operator (2026-10-14): "please document or have the
-- documentation in the admin section so we can see daily charges with ability to turn on or off the feature" —
-- Admin › Services › AI shows the spend of each of the last 30 days. The switch stays the row's Edit
-- (`admin_set_ai_feature`, 20261013184636).
-- e2e-areas: admin-services
--
-- A. A read door, admin_ai_spend_days(p_days integer DEFAULT 30): signed-in callers only (REVOKE FROM PUBLIC, anon;
--    EXECUTE to authenticated, as `admin_ai_features`); it refuses no caller ('not authenticated'), a caller without
--    services:view ('permission denied') and a window outside 1 to 92 days ('badValue:days'). It answers the rows of
--    `ai_spend_days` for the last p_days UTC days, today included, scratch `e2e-` features left out, newest day first:
--    feature, day, calls, units, cost_microusd. No table, policy or table grant changes: `ai_spend_days` stays closed
--    to the browser.
-- B. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the header (STABLE, SECURITY DEFINER,
--    search_path public) and the grants; no caller and a caller without the permission (a random id: no such account
--    exists) are refused, in that order before the window is read.

-- A
CREATE OR REPLACE FUNCTION public.admin_ai_spend_days(p_days integer DEFAULT 30)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_first date;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'services', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  IF p_days IS NULL OR p_days < 1 OR p_days > 92 THEN RAISE EXCEPTION 'badValue:days'; END IF;
  v_first := (now() AT TIME ZONE 'utc')::date - (p_days - 1);
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'feature', s.feature,
             'day', s.day,
             'calls', s.calls,
             'units', s.units,
             'cost_microusd', s.cost_microusd)
           ORDER BY s.day DESC, s.feature)
      FROM public.ai_spend_days s
     WHERE s.day >= v_first
       AND s.feature !~ '^e2e-'), '[]'::jsonb);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_ai_spend_days(integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_ai_spend_days(integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_ai_spend_days(integer) TO service_role;

-- B
DO $$
DECLARE
  v_msg text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc
                  WHERE oid = 'public.admin_ai_spend_days(integer)'::regprocedure
                    AND provolatile = 's' AND prosecdef
                    AND proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof B1 failed: the header is not as written';
  END IF;
  IF has_function_privilege('anon', 'public.admin_ai_spend_days(integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_ai_spend_days(integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof B1 failed: the grants are not as written';
  END IF;

  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.admin_ai_spend_days(30);
    RAISE EXCEPTION 'proof B2 failed: no caller read the spend';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'proof B2 failed: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims',
                     json_build_object('sub', gen_random_uuid()::text, 'role', 'authenticated')::text, true);
  BEGIN
    PERFORM public.admin_ai_spend_days(0);
    RAISE EXCEPTION 'proof B2 failed: a caller without services:view read the spend';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'proof B2 failed: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261014140000') ON CONFLICT (version) DO NOTHING;
