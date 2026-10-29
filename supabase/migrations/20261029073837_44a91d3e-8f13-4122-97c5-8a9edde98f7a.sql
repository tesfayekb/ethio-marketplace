-- lovable-cron-fallback-reviewed: operator-ruled 15-minute catch-up (R3); time-based retry of names left unchecked, no row-change event exists for "owner never returns".
-- N1b-1 M4 (INC-977): the 15-minute schedule for the seller-name catch-up.
-- The job runs public.job_call('name-check-catchup') as the database owner; job_call
-- writes a 'not_configured' heartbeat and calls nothing while either Vault entry is missing (A4).
SELECT cron.schedule('name-check-catchup', '*/15 * * * *', $cmd$SELECT public.job_call('name-check-catchup')$cmd$);

-- Proof (INC-980 rule: only the run this proof starts is read; rolled back whole).
DO $proof$
DECLARE
  v_job record;
  v_r jsonb;
  v_run uuid;
  v_row public.job_runs%ROWTYPE;
  v_q0 bigint := (SELECT count(*) FROM net.http_request_queue WHERE url LIKE '%/api/public/jobs/%');
BEGIN
 BEGIN
  SELECT * INTO v_job FROM cron.job WHERE jobname = 'name-check-catchup';
  IF NOT FOUND OR v_job.schedule <> '*/15 * * * *' OR v_job.command <> $c$SELECT public.job_call('name-check-catchup')$c$ OR NOT v_job.active THEN
    RAISE EXCEPTION 'SC-1 schedule shape'; END IF;
  IF (SELECT count(*) FROM cron.job WHERE command LIKE '%job_call%') <> 1 THEN RAISE EXCEPTION 'SC-2 one caller'; END IF;
  IF EXISTS (SELECT 1 FROM vault.secrets WHERE name IN ('job_secret','job_base_url')) THEN
    RAISE EXCEPTION 'SC-3 expected no Vault entries at apply'; END IF;
  -- SC-4: the job's own command, run once, writes 'not_configured' and queues nothing.
  EXECUTE v_job.command INTO v_r;
  v_run := (v_r->>'run')::uuid;
  SELECT * INTO v_row FROM public.job_runs WHERE id = v_run;
  IF v_r->>'outcome' <> 'not_configured' OR v_row.outcome <> 'not_configured' OR v_row.reason <> 'vault_entry_missing'
     OR v_row.job <> 'name-check-catchup' OR v_row.finished_at IS NULL THEN RAISE EXCEPTION 'SC-4 heartbeat %', v_r; END IF;
  IF (SELECT count(*) FROM net.http_request_queue WHERE url LIKE '%/api/public/jobs/%') <> v_q0 THEN
    RAISE EXCEPTION 'SC-4 queued a call'; END IF;
  RAISE EXCEPTION 'M4 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M4 proof ok' THEN RAISE; END IF; END;
 IF v_run IS NULL OR EXISTS (SELECT 1 FROM public.job_runs WHERE id = v_run) THEN RAISE EXCEPTION 'M4 rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES('20261029234500');