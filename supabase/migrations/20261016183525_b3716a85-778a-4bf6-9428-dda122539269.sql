-- Bundle 18 turn 1 (2026-10-16). Tier A. INC-669 — THE WRITING BUDGET'S COUNT, READ WITHOUT SPENDING. The
-- e2e-areas: posting, my-listings
-- assist route spends a listing's five tries through consume_rate_limit (20260917000149) and the screen
-- printed "5 of 5 tries left" on every fresh open (the Edit; a draft reopened) until its first call answered,
-- because only consume_rate_limit could say the count and it cannot be asked without spending. peek_rate_limit
-- answers the remaining of the CURRENT window for an action and key and inserts nothing.
--
-- A. peek_rate_limit(text, text, integer, interval): the same window as consume_rate_limit (the one line of
--    window math, repeated and then proven equal), one row read by its key, STABLE, SECURITY DEFINER (the
--    table is closed to every client role), closed to PUBLIC, anon and authenticated, open to service_role —
--    the route's server-only client calls it after the caller and the listing's ownership are verified.
-- B. Proofs P1–P3 on no real row: the header; the grants; on a scratch key, the peek equals the spend's own
--    answer after every try and reads the limit when no row exists, and the scratch rows are removed.

-- ===== A — peek_rate_limit =====
CREATE OR REPLACE FUNCTION public.peek_rate_limit(
  p_action text,
  p_key text,
  p_limit integer,
  p_window interval
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_secs numeric := extract(epoch from p_window);
  v_start timestamptz;
  v_count integer;
BEGIN
  IF v_secs IS NULL OR v_secs <= 0 THEN
    RAISE EXCEPTION 'badWindow';
  END IF;
  -- The window consume_rate_limit counts in (20260917000149): the same expression, so both name one row.
  v_start := to_timestamp(floor(extract(epoch from clock_timestamp()) / v_secs) * v_secs);

  SELECT r.count INTO v_count FROM public.rate_limits r
   WHERE r.key = p_key AND r.action = p_action AND r.window_start = v_start;

  RETURN jsonb_build_object(
    'remaining', greatest(p_limit - coalesce(v_count, 0), 0),
    'resets_at', v_start + p_window
  );
END $$;
REVOKE ALL ON FUNCTION public.peek_rate_limit(text, text, integer, interval) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.peek_rate_limit(text, text, integer, interval) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_key    text := 'e2e-mig-b18t1-' || gen_random_uuid()::text;
  v_action text := 'e2e-mig-b18t1-peek';
  v_spend  jsonb;
  v_peek   jsonb;
  v_left   integer;
BEGIN
  -- P1. The header: stable, definer, search_path pinned.
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc
     WHERE oid = 'public.peek_rate_limit(text, text, integer, interval)'::regprocedure
       AND prosecdef AND provolatile = 's' AND proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'B18T1 P1: the header of peek_rate_limit is not as written';
  END IF;

  -- P2. Closed to every client role; open to the server's role.
  IF has_function_privilege('anon', 'public.peek_rate_limit(text, text, integer, interval)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.peek_rate_limit(text, text, integer, interval)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.peek_rate_limit(text, text, integer, interval)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B18T1 P2: a grant of peek_rate_limit is not as written';
  END IF;

  -- P3. On a scratch key: no row reads the whole limit; after each spend the peek equals the spend's own
  --     answer (the two window expressions name one row); a spend past the limit leaves the peek at zero.
  v_peek := public.peek_rate_limit(v_action, v_key, 3, interval '10 years');
  IF (v_peek->>'remaining')::integer <> 3 THEN
    RAISE EXCEPTION 'B18T1 P3: a key with no row did not read the limit: %', v_peek;
  END IF;
  FOR v_left IN REVERSE 2..0 LOOP
    v_spend := public.consume_rate_limit(v_action, v_key, 3, interval '10 years');
    v_peek  := public.peek_rate_limit(v_action, v_key, 3, interval '10 years');
    IF (v_spend->>'remaining')::integer <> v_left OR (v_peek->>'remaining')::integer <> v_left THEN
      RAISE EXCEPTION 'B18T1 P3: after a spend the peek did not equal it: spend % peek %', v_spend, v_peek;
    END IF;
  END LOOP;
  v_spend := public.consume_rate_limit(v_action, v_key, 3, interval '10 years');
  v_peek  := public.peek_rate_limit(v_action, v_key, 3, interval '10 years');
  IF (v_spend->>'allowed')::boolean OR (v_peek->>'remaining')::integer <> 0 THEN
    RAISE EXCEPTION 'B18T1 P3: past the limit: spend % peek %', v_spend, v_peek;
  END IF;
  DELETE FROM public.rate_limits WHERE key = v_key AND action = v_action;
  IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key = v_key AND action = v_action) THEN
    RAISE EXCEPTION 'B18T1 P3: the scratch rows were not removed';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018120000') ON CONFLICT (version) DO NOTHING;
