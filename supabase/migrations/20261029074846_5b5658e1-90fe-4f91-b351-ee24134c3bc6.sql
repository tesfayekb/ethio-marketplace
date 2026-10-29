-- N1b-1 M6 (INC-977): job_call's outside-call timeout 10 s → 60 s, so the route's capped run
-- (stops starting new names at 40 s; each model call ≤ 15 s) finishes before pg_net closes the request.
-- Redeclared whole from live pg_get_functiondef (md5 b6e4a7527589cfba544084168cf5ae16); the one changed line is
-- timeout_milliseconds. Argument list unchanged, no DROP (G39).
CREATE OR REPLACE FUNCTION public.job_call(p_job text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_secret text;
  v_base   text;
  v_ts     bigint := floor(extract(epoch FROM clock_timestamp()))::bigint;
  v_run    uuid;
  v_req    bigint;
BEGIN
  IF p_job IS NULL OR p_job NOT IN ('name-check-catchup') THEN RAISE EXCEPTION 'badValue:job'; END IF;
  SELECT decrypted_secret INTO v_secret FROM vault.decrypted_secrets WHERE name = 'job_secret' LIMIT 1;
  SELECT rtrim(decrypted_secret, '/') INTO v_base FROM vault.decrypted_secrets WHERE name = 'job_base_url' LIMIT 1;
  IF coalesce(v_secret, '') = '' OR coalesce(v_base, '') = '' THEN
    INSERT INTO public.job_runs(job, outcome, reason, finished_at)
      VALUES (p_job, 'not_configured', 'vault_entry_missing', now()) RETURNING id INTO v_run;
    RETURN jsonb_build_object('run', v_run, 'outcome', 'not_configured');
  END IF;
  IF v_base !~ '^https://[a-z0-9.-]+(:[0-9]{1,5})?$' THEN
    INSERT INTO public.job_runs(job, outcome, reason, finished_at)
      VALUES (p_job, 'not_configured', 'base_url_shape', now()) RETURNING id INTO v_run;
    RETURN jsonb_build_object('run', v_run, 'outcome', 'not_configured');
  END IF;
  INSERT INTO public.job_runs(job, ts, outcome) VALUES (p_job, v_ts, 'dispatched') RETURNING id INTO v_run;
  v_req := net.http_post(
    url := v_base || '/api/public/jobs/' || p_job,
    body := '{}'::jsonb,
    headers := jsonb_build_object(
      'content-type', 'application/json',
      'x-job-timestamp', v_ts::text,
      'x-job-signature', encode(extensions.hmac(p_job || '.' || v_ts::text, v_secret, 'sha256'), 'hex')),
    timeout_milliseconds := 60000);
  UPDATE public.job_runs SET net_request_id = v_req WHERE id = v_run;
  RETURN jsonb_build_object('run', v_run, 'outcome', 'dispatched');
END;
$function$;
REVOKE ALL ON FUNCTION public.job_call(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.job_call(text) TO service_role;

-- Proof (INC-980: reads only the run its own call returns; rolled back whole).
DO $proof$
DECLARE
  v_def text := pg_get_functiondef('public.job_call(text)'::regprocedure);
  v_r jsonb;
  v_run uuid;
  v_q0 bigint := (SELECT count(*) FROM net.http_request_queue WHERE url LIKE '%/api/public/jobs/%');
BEGIN
 BEGIN
  IF position('timeout_milliseconds := 60000' IN v_def) = 0 OR position('10000' IN v_def) > 0 THEN
    RAISE EXCEPTION 'TO-1 timeout line'; END IF;
  IF has_function_privilege('public', 'public.job_call(text)', 'EXECUTE') OR has_function_privilege('anon', 'public.job_call(text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.job_call(text)', 'EXECUTE') OR NOT has_function_privilege('service_role', 'public.job_call(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'TO-2 acl'; END IF;
  IF EXISTS (SELECT 1 FROM vault.secrets WHERE name IN ('job_secret','job_base_url')) THEN RAISE EXCEPTION 'TO-3 expected no Vault entries'; END IF;
  v_r := public.job_call('name-check-catchup');
  v_run := (v_r->>'run')::uuid;
  IF v_r->>'outcome' <> 'not_configured' THEN RAISE EXCEPTION 'TO-3 outcome %', v_r; END IF;
  IF (SELECT outcome FROM public.job_runs WHERE id = v_run) <> 'not_configured' THEN RAISE EXCEPTION 'TO-3 heartbeat'; END IF;
  IF (SELECT count(*) FROM net.http_request_queue WHERE url LIKE '%/api/public/jobs/%') <> v_q0 THEN RAISE EXCEPTION 'TO-3 queued'; END IF;
  RAISE EXCEPTION 'M6 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M6 proof ok' THEN RAISE; END IF; END;
 IF v_run IS NULL OR EXISTS (SELECT 1 FROM public.job_runs WHERE id = v_run) THEN RAISE EXCEPTION 'M6 rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES('20261030003000');