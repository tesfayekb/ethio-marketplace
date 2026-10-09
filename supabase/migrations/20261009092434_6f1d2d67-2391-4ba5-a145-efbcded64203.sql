-- E3c (bundle 10, the feed engine's speed judge, D101 §5, DEC-166): feed_bench times feed_page inside the database. It calls feed_page p_runs times (1 to 200) with the given category, place and cursor at 20 cards a page, and answers each call's milliseconds (clock_timestamp) with the last page's size in bytes and its number of cards. Read-only; executable by service_role only. Called by scripts/feed-bench.ts on ethio-staging, never by the app.
-- e2e-areas: feed

CREATE OR REPLACE FUNCTION public.feed_bench(p_category_id uuid, p_location_id uuid, p_after jsonb, p_runs integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY INVOKER
 SET search_path TO 'public'
AS $fn$
DECLARE
  v_ms   double precision[] := ARRAY[]::double precision[];
  v_page jsonb;
  v_t0   timestamptz;
  i      integer;
BEGIN
  IF p_runs IS NULL OR p_runs < 1 OR p_runs > 200 THEN
    RAISE EXCEPTION 'feed_bench: badRuns';
  END IF;
  FOR i IN 1..p_runs LOOP
    v_t0 := clock_timestamp();
    v_page := public.feed_page(p_category_id, p_location_id, p_after, 20);
    v_ms := v_ms || (extract(epoch FROM clock_timestamp() - v_t0) * 1000)::double precision;
  END LOOP;
  RETURN jsonb_build_object(
    'ms', to_jsonb(v_ms),
    'bytes', octet_length(v_page::text),
    'cards', jsonb_array_length(v_page->'cards'));
END $fn$;
REVOKE ALL ON FUNCTION public.feed_bench(uuid, uuid, jsonb, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_bench(uuid, uuid, jsonb, integer) TO service_role;
COMMENT ON FUNCTION public.feed_bench(uuid, uuid, jsonb, integer) IS
  'The feed engine''s speed judge (bundle 10 E3c, DEC-166): times p_runs calls of feed_page (20 cards) inside the database and answers their milliseconds, the last page''s bytes and its cards. Service role only; called by scripts/feed-bench.ts on ethio-staging.';

-- Proofs: the header facts, the privileges and the refusal. No proof reads a row (the refusal comes before any read).
DO $proof$
DECLARE
  v_fn  regprocedure := 'public.feed_bench(uuid,uuid,jsonb,integer)'::regprocedure;
  v_err text;
  v_bad integer;
BEGIN
  IF (SELECT prosecdef FROM pg_proc WHERE oid = v_fn) IS DISTINCT FROM false
     OR (SELECT provolatile FROM pg_proc WHERE oid = v_fn) IS DISTINCT FROM 'v'
     OR NOT (SELECT proconfig FROM pg_proc WHERE oid = v_fn) @> ARRAY['search_path=public'] THEN
    RAISE EXCEPTION 'E3c P1: feed_bench header facts differ';
  END IF;
  IF has_function_privilege('anon', v_fn, 'EXECUTE')
     OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'E3c P2: feed_bench privileges differ';
  END IF;
  FOREACH v_bad IN ARRAY ARRAY[0, 201] LOOP
    v_err := NULL;
    BEGIN
      PERFORM public.feed_bench(NULL, NULL, NULL, v_bad);
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    IF v_err IS DISTINCT FROM 'feed_bench: badRuns' THEN
      RAISE EXCEPTION 'E3c P3: % runs was not refused as badRuns (got %)', v_bad, coalesce(v_err, 'no error');
    END IF;
  END LOOP;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261009220000') ON CONFLICT (version) DO NOTHING;
