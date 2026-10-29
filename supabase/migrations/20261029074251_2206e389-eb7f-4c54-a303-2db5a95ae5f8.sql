-- N1b-1 M5 (INC-977): job_runs retention, 14 days, on the prune family (ai-calls-prune / rate-limits-prune).
-- Keeps each job's newest row whatever its age, so "never ran" stays visible.
CREATE TABLE public.job_runs_prune_runs (
  id bigserial PRIMARY KEY,
  ran_at timestamptz NOT NULL DEFAULT now(),
  deleted integer NOT NULL CHECK (deleted >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
REVOKE ALL ON public.job_runs_prune_runs FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.job_runs_prune_runs TO service_role;
ALTER TABLE public.job_runs_prune_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY job_runs_prune_runs_deny_select ON public.job_runs_prune_runs FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY job_runs_prune_runs_deny_insert ON public.job_runs_prune_runs FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY job_runs_prune_runs_deny_update ON public.job_runs_prune_runs FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY job_runs_prune_runs_deny_delete ON public.job_runs_prune_runs FOR DELETE TO anon, authenticated USING (false);
REVOKE ALL ON SEQUENCE public.job_runs_prune_runs_id_seq FROM PUBLIC, anon, authenticated;
GRANT ALL ON SEQUENCE public.job_runs_prune_runs_id_seq TO service_role;
CREATE TRIGGER job_runs_prune_runs_updated_at BEFORE UPDATE ON public.job_runs_prune_runs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- The core takes an optional id scope so a proof runs it on its own rows only (INC-980);
-- the live prune passes NULL (every row) and alone trims the heartbeat table.
CREATE FUNCTION public.job_runs_prune_core(p_only uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_count integer;
BEGIN
  WITH scope AS (
    SELECT id, job, started_at FROM public.job_runs
     WHERE p_only IS NULL OR id = ANY (p_only)
  ), newest AS (
    SELECT DISTINCT ON (job) id FROM scope ORDER BY job, started_at DESC, id DESC
  )
  DELETE FROM public.job_runs r
   USING scope s
   WHERE r.id = s.id
     AND s.started_at < now() - interval '14 days'
     AND r.id NOT IN (SELECT id FROM newest);
  GET DIAGNOSTICS v_count = ROW_COUNT;
  INSERT INTO public.job_runs_prune_runs (deleted) VALUES (v_count);
  IF p_only IS NULL THEN
    DELETE FROM public.job_runs_prune_runs WHERE ran_at < now() - interval '14 days';
  END IF;
  RETURN v_count;
END;
$function$;
REVOKE ALL ON FUNCTION public.job_runs_prune_core(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.job_runs_prune_core(uuid[]) TO service_role;

CREATE FUNCTION public.job_runs_prune()
RETURNS integer
LANGUAGE sql
VOLATILE SECURITY DEFINER
SET search_path = public
AS $function$ SELECT public.job_runs_prune_core(NULL) $function$;
REVOKE ALL ON FUNCTION public.job_runs_prune() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.job_runs_prune() TO service_role;

DO $cron$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'job-runs-prune') THEN
    PERFORM cron.unschedule('job-runs-prune');
  END IF;
  PERFORM cron.schedule('job-runs-prune', '41 4 * * *', 'SELECT public.job_runs_prune()');
END;
$cron$;

-- Proof: scratch rows only, scoped by id; rolled back whole.
DO $proof$
DECLARE
  a uuid := '00000000-0000-4000-8000-00000000e5a1';
  b uuid := '00000000-0000-4000-8000-00000000e5b2';
  c uuid := '00000000-0000-4000-8000-00000000e5c3';
  v_n integer;
  v_hb_max bigint;
  v_hb public.job_runs_prune_runs%ROWTYPE;
  v_fn text;
BEGIN
 BEGIN
  INSERT INTO public.job_runs(id, job, started_at, outcome) VALUES
    (a, 'name-check-catchup', now() - interval '20 days', 'not_configured'),
    (b, 'name-check-catchup', now() - interval '15 days', 'not_configured'),
    (c, 'name-check-catchup', now() - interval '13 days', 'not_configured');
  v_hb_max := coalesce((SELECT max(id) FROM public.job_runs_prune_runs), 0);

  -- PR-1: older than 14 days goes; younger stays.
  v_n := public.job_runs_prune_core(ARRAY[a, b, c]);
  IF v_n <> 2 THEN RAISE EXCEPTION 'PR-1 deleted %', v_n; END IF;
  IF EXISTS (SELECT 1 FROM public.job_runs WHERE id IN (a, b)) THEN RAISE EXCEPTION 'PR-1 old kept'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.job_runs WHERE id = c) THEN RAISE EXCEPTION 'PR-1 young lost'; END IF;

  -- PR-2: its heartbeat names the count.
  SELECT * INTO STRICT v_hb FROM public.job_runs_prune_runs WHERE id > v_hb_max;
  IF v_hb.deleted <> 2 THEN RAISE EXCEPTION 'PR-2 heartbeat %', v_hb.deleted; END IF;

  -- PR-3: the newest row is kept whatever its age.
  INSERT INTO public.job_runs(id, job, started_at, outcome) VALUES (a, 'name-check-catchup', now() - interval '30 days', 'not_configured');
  v_n := public.job_runs_prune_core(ARRAY[a]);
  IF v_n <> 0 THEN RAISE EXCEPTION 'PR-3 deleted %', v_n; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.job_runs WHERE id = a) THEN RAISE EXCEPTION 'PR-3 newest lost'; END IF;

  -- PR-4: a scoped run never trims the heartbeat table (only the live prune does).
  INSERT INTO public.job_runs_prune_runs(ran_at, deleted) VALUES (now() - interval '20 days', 0) RETURNING id INTO v_hb_max;
  v_n := public.job_runs_prune_core(ARRAY[a]);
  IF NOT EXISTS (SELECT 1 FROM public.job_runs_prune_runs WHERE id = v_hb_max) THEN RAISE EXCEPTION 'PR-4 scoped trim'; END IF;

  -- PR-5: the schedule and the ACL.
  IF NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'job-runs-prune' AND schedule = '41 4 * * *'
                 AND command = 'SELECT public.job_runs_prune()' AND active) THEN RAISE EXCEPTION 'PR-5 schedule'; END IF;
  FOREACH v_fn IN ARRAY ARRAY['public.job_runs_prune()', 'public.job_runs_prune_core(uuid[])'] LOOP
    IF has_function_privilege('public', v_fn, 'EXECUTE') OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'PR-5 acl %', v_fn; END IF;
  END LOOP;
  IF has_table_privilege('anon', 'public.job_runs_prune_runs', 'SELECT') OR has_table_privilege('authenticated', 'public.job_runs_prune_runs', 'SELECT')
     OR has_sequence_privilege('anon', 'public.job_runs_prune_runs_id_seq', 'USAGE') OR has_sequence_privilege('authenticated', 'public.job_runs_prune_runs_id_seq', 'USAGE') THEN
    RAISE EXCEPTION 'PR-5 table acl'; END IF;

  RAISE EXCEPTION 'M5 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M5 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM public.job_runs WHERE id IN (a, b, c)) OR EXISTS (SELECT 1 FROM public.job_runs_prune_runs) THEN
   RAISE EXCEPTION 'M5 rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES('20261030000000');