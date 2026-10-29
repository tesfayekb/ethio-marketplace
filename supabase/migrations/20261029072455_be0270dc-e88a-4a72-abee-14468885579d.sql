-- Foundations turn N1b-1, M2 (INC-977, INC-981): the database's one outside call, signed, never carrying the secret.
-- pg_net is enabled (schema extensions; its objects live in net). Its schema, functions and queue tables are owned
-- by the platform's admin role and granted to PUBLIC; this role cannot revoke them (INC-981, the DEC's named cost).
-- So no secret ever reaches net: public.job_call(p_job), the ONE caller and service-only, reads job_secret and
-- job_base_url from Vault and sends only the job name, a timestamp and hex(hmac(job || '.' || ts, secret,
-- 'sha256')) (S1). The target is fixed: the job name comes from a CHECK-ed list and the URL is the Vault base plus
-- /api/public/jobs/<name> (S3). When either Vault entry is missing, or the base is not https, it writes a
-- 'not_configured' heartbeat and calls nothing (staging and CI never get Vault rows).
-- job_runs (the jobs' one heartbeat, R1; ts + claimed_at let the route refuse a replay, S2), job_leases
-- (single-flight) and job_pauses (the circuit breaker) are born here, closed (S6); M3 adds the route-side doors.

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE TABLE public.job_runs (
  id             uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job            text        NOT NULL CHECK (job IN ('name-check-catchup')),
  ts             bigint,
  started_at     timestamptz NOT NULL DEFAULT now(),
  claimed_at     timestamptz,
  finished_at    timestamptz,
  outcome        text        NOT NULL CHECK (outcome IN ('dispatched','not_configured','ok','busy','paused','switch_off','budget_spent','failed')),
  reason         text        CHECK (reason IS NULL OR reason ~ '^[a-z][a-z0-9_]{0,47}$'),
  asked          integer     NOT NULL DEFAULT 0 CHECK (asked >= 0),
  clean          integer     NOT NULL DEFAULT 0 CHECK (clean >= 0),
  imitates       integer     NOT NULL DEFAULT 0 CHECK (imitates >= 0),
  unavailable    integer     NOT NULL DEFAULT 0 CHECK (unavailable >= 0),
  net_request_id bigint,
  UNIQUE (job, ts)
);
CREATE INDEX job_runs_job_started_idx ON public.job_runs (job, started_at DESC);

CREATE TABLE public.job_leases (
  job        text        NOT NULL PRIMARY KEY CHECK (job IN ('name-check-catchup')),
  holder     uuid        NOT NULL,
  expires_at timestamptz NOT NULL
);

CREATE TABLE public.job_pauses (
  job    text        NOT NULL PRIMARY KEY CHECK (job IN ('name-check-catchup')),
  reason text        NOT NULL CHECK (reason IN ('credits','policy','rate_limit')),
  since  timestamptz NOT NULL DEFAULT now()
);

REVOKE ALL ON public.job_runs, public.job_leases, public.job_pauses FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.job_runs, public.job_leases, public.job_pauses TO service_role;
ALTER TABLE public.job_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_leases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_pauses ENABLE ROW LEVEL SECURITY;
CREATE POLICY job_runs_deny_select ON public.job_runs FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY job_runs_deny_insert ON public.job_runs FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY job_runs_deny_update ON public.job_runs FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY job_runs_deny_delete ON public.job_runs FOR DELETE TO anon, authenticated USING (false);
CREATE POLICY job_leases_deny_select ON public.job_leases FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY job_leases_deny_insert ON public.job_leases FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY job_leases_deny_update ON public.job_leases FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY job_leases_deny_delete ON public.job_leases FOR DELETE TO anon, authenticated USING (false);
CREATE POLICY job_pauses_deny_select ON public.job_pauses FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY job_pauses_deny_insert ON public.job_pauses FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY job_pauses_deny_update ON public.job_pauses FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY job_pauses_deny_delete ON public.job_pauses FOR DELETE TO anon, authenticated USING (false);

CREATE FUNCTION public.job_call(p_job text)
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
    timeout_milliseconds := 10000);
  UPDATE public.job_runs SET net_request_id = v_req WHERE id = v_run;
  RETURN jsonb_build_object('run', v_run, 'outcome', 'dispatched');
END;
$function$;
REVOKE ALL ON FUNCTION public.job_call(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.job_call(text) TO service_role;

-- Proof (INC-970, INC-980): it reads only the job_runs rows it created (by the returned id) and net's queue
-- filtered to the jobs path; it creates no Vault row (S6: the missing-entry branch only); the sentinel rolls it
-- all back.
DO $proof$
DECLARE
  v_r   jsonb;
  v_row public.job_runs%ROWTYPE;
  v_q0  bigint := (SELECT count(*) FROM net.http_request_queue WHERE url LIKE '%/api/public/jobs/%');
BEGIN
 BEGIN
  IF EXISTS (SELECT 1 FROM vault.secrets WHERE name IN ('job_secret','job_base_url')) THEN
    RAISE EXCEPTION 'JC setup: Vault entries present; this proof must not dispatch a real call'; END IF;
  -- JC-1: no Vault entries → 'not_configured', nothing queued.
  v_r := public.job_call('name-check-catchup');
  SELECT * INTO v_row FROM public.job_runs WHERE id = (v_r->>'run')::uuid;
  IF v_r->>'outcome' <> 'not_configured' OR v_row.outcome <> 'not_configured' OR v_row.reason <> 'vault_entry_missing'
     OR v_row.net_request_id IS NOT NULL OR v_row.ts IS NOT NULL OR v_row.finished_at IS NULL THEN
    RAISE EXCEPTION 'JC-1 not configured: %', v_r; END IF;
  IF (SELECT count(*) FROM net.http_request_queue WHERE url LIKE '%/api/public/jobs/%') <> v_q0 THEN
    RAISE EXCEPTION 'JC-1 a request was queued'; END IF;
  -- JC-2: an unknown job is refused before any read or write.
  BEGIN PERFORM public.job_call('e2e-n1b-unknown'); RAISE EXCEPTION 'JC-2 refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:job' THEN RAISE; END IF; END;
  BEGIN PERFORM public.job_call(NULL); RAISE EXCEPTION 'JC-2 null refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:job' THEN RAISE; END IF; END;
  IF (SELECT count(*) FROM net.http_request_queue WHERE url LIKE '%/api/public/jobs/%') <> v_q0 THEN
    RAISE EXCEPTION 'JC-2 a request was queued'; END IF;
  -- JC-3: the heartbeat refuses a job name outside the list, and a repeated (job, ts) (the replay key).
  BEGIN INSERT INTO public.job_runs(job, outcome) VALUES ('e2e-n1b-unknown', 'ok'); RAISE EXCEPTION 'JC-3 job check absent';
  EXCEPTION WHEN check_violation THEN NULL; END;
  INSERT INTO public.job_runs(id, job, ts, outcome) VALUES ('00000000-0000-4000-8000-00000000e2e1', 'name-check-catchup', 1, 'dispatched');
  BEGIN INSERT INTO public.job_runs(job, ts, outcome) VALUES ('name-check-catchup', 1, 'dispatched'); RAISE EXCEPTION 'JC-3 replay key absent';
  EXCEPTION WHEN unique_violation THEN NULL; END;
  -- JC-4: the ACL — browser roles reach neither job_call nor the three tables; service_role reaches job_call.
  IF has_function_privilege('anon','public.job_call(text)','EXECUTE') OR has_function_privilege('authenticated','public.job_call(text)','EXECUTE')
     OR has_function_privilege('public','public.job_call(text)','EXECUTE')
     OR NOT has_function_privilege('service_role','public.job_call(text)','EXECUTE')
     OR has_table_privilege('anon','public.job_runs','SELECT') OR has_table_privilege('authenticated','public.job_runs','SELECT')
     OR has_table_privilege('anon','public.job_leases','SELECT') OR has_table_privilege('authenticated','public.job_leases','SELECT')
     OR has_table_privilege('anon','public.job_pauses','SELECT') OR has_table_privilege('authenticated','public.job_pauses','SELECT')
     OR EXISTS (SELECT 1 FROM pg_class WHERE oid IN ('public.job_runs'::regclass,'public.job_leases'::regclass,'public.job_pauses'::regclass) AND NOT relrowsecurity) THEN
    RAISE EXCEPTION 'JC-4 closers'; END IF;
  -- JC-5 (S4, at birth): no function in public other than job_call names a net.* function.
  IF EXISTS (SELECT 1 FROM pg_proc p WHERE p.pronamespace = 'public'::regnamespace
               AND p.oid <> 'public.job_call(text)'::regprocedure
               AND NOT EXISTS (SELECT 1 FROM pg_depend d WHERE d.classid = 'pg_proc'::regclass AND d.objid = p.oid AND d.deptype = 'e')
               AND pg_get_functiondef(p.oid) ~* '\mnet\.') THEN
    RAISE EXCEPTION 'JC-5 another caller of net'; END IF;
  RAISE EXCEPTION 'M2 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M2 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM public.job_runs) OR (SELECT count(*) FROM net.http_request_queue WHERE url LIKE '%/api/public/jobs/%') <> v_q0 THEN
   RAISE EXCEPTION 'JC rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES('20261029230000');