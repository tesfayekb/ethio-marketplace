-- N1b-3b M3 (INC-977, N1b-3 R6/R7): the scheduled job's health for staff, and Resume.
-- job_health_core — service-only core: the job's newest job_runs row (job_runs_job_started_idx) and its
-- job_pauses row (primary key). p_run scopes it to one run by id (the proof's own scratch row, the house
-- form); the door passes NULL. dispatched_unclaimed: the newest row is 'dispatched', unclaimed, and older
-- than 2 minutes (the site did not answer). The pause is read only when unscoped.
-- admin_job_health — services:view (the AI page's read gate); the job by parameter, from job_runs' CHECK list.
-- admin_job_resume — services:manage → step-up (admin_set_ai_feature's gate and step-up) → capture the pause
-- FOR UPDATE (none → notPaused, nothing written) → job_pause_clear (stays service-only) → audit job.resumed.

CREATE FUNCTION public.job_health_core(p_job text, p_run uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SET search_path TO 'public'
AS $function$
DECLARE
  v_run   record;
  v_pause_reason text;
  v_pause_since  timestamptz;
  v_found boolean;
BEGIN
  IF p_job IS NULL OR p_job NOT IN ('name-check-catchup') THEN RAISE EXCEPTION 'badValue:job'; END IF;
  SELECT r.outcome, r.reason, r.started_at, r.claimed_at, r.finished_at INTO v_run
    FROM public.job_runs r
   WHERE r.job = p_job AND (p_run IS NULL OR r.id = p_run)
   ORDER BY r.started_at DESC
   LIMIT 1;
  v_found := FOUND;
  IF p_run IS NULL THEN
    SELECT p.reason, p.since INTO v_pause_reason, v_pause_since FROM public.job_pauses p WHERE p.job = p_job;
  END IF;
  RETURN jsonb_build_object(
    'job', p_job,
    'last', CASE WHEN v_found THEN jsonb_build_object(
              'outcome', v_run.outcome, 'reason', v_run.reason,
              'started_at', v_run.started_at, 'finished_at', v_run.finished_at) END,
    'dispatched_unclaimed', v_found AND v_run.outcome = 'dispatched' AND v_run.claimed_at IS NULL
                            AND v_run.started_at < now() - interval '2 minutes',
    'paused', CASE WHEN v_pause_reason IS NOT NULL
              THEN jsonb_build_object('reason', v_pause_reason, 'since', v_pause_since) END);
END $function$;
REVOKE ALL ON FUNCTION public.job_health_core(text, uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.job_health_core(text, uuid) TO service_role;

CREATE FUNCTION public.admin_job_health(p_job text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'services', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  RETURN public.job_health_core(p_job, NULL);
END $function$;
REVOKE ALL ON FUNCTION public.admin_job_health(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_job_health(text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_job_health(text) TO service_role;

CREATE FUNCTION public.admin_job_resume(p_job text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_pause record;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(auth.uid(), 'services', 'manage') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('services', 'manage');
  IF p_job IS NULL OR p_job NOT IN ('name-check-catchup') THEN RAISE EXCEPTION 'badValue:job'; END IF;
  SELECT p.reason, p.since INTO v_pause FROM public.job_pauses p WHERE p.job = p_job FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'reason', 'notPaused'); END IF;
  PERFORM public.job_pause_clear(p_job);
  PERFORM public.log_audit('job.resumed', 'job', p_job,
    jsonb_build_object('old', jsonb_build_object('reason', v_pause.reason, 'since', v_pause.since)));
  RETURN jsonb_build_object('ok', true);
END $function$;
REVOKE ALL ON FUNCTION public.admin_job_resume(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_job_resume(text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_job_resume(text) TO service_role;

-- PROOF (NJH-1…5): its own scratch runs by id and its own scratch staff; never job_call, never the
-- Vault. The live pause row's key is the real job name (job_pauses' CHECK), so Resume's allow path and
-- the health door's unscoped read are proved by N1b-3c's E2E, never here; Resume's refusals write nothing.
DO $proof$
DECLARE
  v_hex  text := replace(gen_random_uuid()::text, '-', '');
  v_tag  text := 'e2e-mig-n1b3m3-' || substr(v_hex, 1, 12);
  v_s    uuid := gen_random_uuid();
  v_role uuid := gen_random_uuid();
  v_r1   uuid := gen_random_uuid();
  v_r2   uuid := gen_random_uuid();
  v_r3   uuid := gen_random_uuid();
  v_r    jsonb;
  v_refused boolean;
BEGIN
 BEGIN
  INSERT INTO public.job_runs(id, job, ts, started_at, claimed_at, finished_at, outcome, reason) VALUES
    (v_r1, 'name-check-catchup', -1 * (('x' || substr(v_hex, 1, 8))::bit(32)::bigint) - 1, now() - interval '10 minutes', NULL, NULL, 'dispatched', NULL),
    (v_r2, 'name-check-catchup', -1 * (('x' || substr(v_hex, 9, 8))::bit(32)::bigint) - 5000000000, now() - interval '30 seconds', NULL, NULL, 'dispatched', NULL),
    (v_r3, 'name-check-catchup', -1 * (('x' || substr(v_hex, 17, 8))::bit(32)::bigint) - 10000000000, now() - interval '20 minutes', now() - interval '20 minutes', now() - interval '19 minutes', 'failed', 'upstream_timeout');

  -- NJH-1: an old unclaimed dispatch is "the site did not answer"; a fresh one is not yet.
  v_r := public.job_health_core('name-check-catchup', v_r1);
  IF NOT (v_r->>'dispatched_unclaimed')::boolean OR v_r#>>'{last,outcome}' <> 'dispatched' OR (v_r->'paused') <> 'null'::jsonb
  THEN RAISE EXCEPTION 'NJH-1 old dispatch: %', v_r; END IF;
  v_r := public.job_health_core('name-check-catchup', v_r2);
  IF (v_r->>'dispatched_unclaimed')::boolean THEN RAISE EXCEPTION 'NJH-1 fresh dispatch: %', v_r; END IF;
  -- NJH-2: a finished run answers its outcome, reason and times.
  v_r := public.job_health_core('name-check-catchup', v_r3);
  IF v_r#>>'{last,outcome}' <> 'failed' OR v_r#>>'{last,reason}' <> 'upstream_timeout'
     OR (v_r#>>'{last,finished_at}') IS NULL OR (v_r->>'dispatched_unclaimed')::boolean
  THEN RAISE EXCEPTION 'NJH-2 finished: %', v_r; END IF;
  -- NJH-3: an unknown run answers no last run; an unknown job is refused.
  v_r := public.job_health_core('name-check-catchup', gen_random_uuid());
  IF (v_r->'last') <> 'null'::jsonb OR (v_r->>'dispatched_unclaimed')::boolean THEN RAISE EXCEPTION 'NJH-3 none: %', v_r; END IF;
  v_refused := false;
  BEGIN PERFORM public.job_health_core('nope', v_r1);
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:job' THEN RAISE; END IF; v_refused := true; END;
  IF NOT v_refused THEN RAISE EXCEPTION 'NJH-3 job'; END IF;

  -- NJH-4 (deny): a scratch user with no permission is refused health and Resume; then with
  -- services:manage but no second factor, Resume is refused by step-up. Nothing is audited.
  INSERT INTO auth.users(id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_s, v_tag || '@example.invalid', '{}', 'authenticated', 'authenticated', now(), now());
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_s, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_s::text, true);
  v_refused := false;
  BEGIN PERFORM public.admin_job_health('name-check-catchup');
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'permission denied' THEN RAISE; END IF; v_refused := true; END;
  IF NOT v_refused THEN RAISE EXCEPTION 'NJH-4 health deny'; END IF;
  v_refused := false;
  BEGIN PERFORM public.admin_job_resume('name-check-catchup');
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'permission denied' THEN RAISE; END IF; v_refused := true; END;
  IF NOT v_refused THEN RAISE EXCEPTION 'NJH-4 resume deny'; END IF;
  INSERT INTO public.roles(id, name) VALUES (v_role, v_tag);
  INSERT INTO public.role_permissions(role_id, permission_id)
  SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
   WHERE r.name = 'services' AND p.action = 'manage';
  INSERT INTO public.user_roles(user_id, role_id, scope_type) VALUES (v_s, v_role, 'global');
  IF (SELECT bool_or(p.requires_step_up) FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
       WHERE r.name = 'services' AND p.action = 'manage') THEN
    v_refused := false;
    BEGIN PERFORM public.admin_job_resume('name-check-catchup');
    EXCEPTION WHEN OTHERS THEN IF SQLSTATE <> 'P0009' THEN RAISE; END IF; v_refused := true; END;
    IF NOT v_refused THEN RAISE EXCEPTION 'NJH-4 step-up absent'; END IF;
  END IF;
  IF EXISTS (SELECT 1 FROM public.audit_log WHERE action = 'job.resumed' AND actor_id = v_s) THEN RAISE EXCEPTION 'NJH-4 trace'; END IF;
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);

  -- NJH-5: closers and headers.
  IF has_function_privilege('anon', 'public.job_health_core(text, uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.job_health_core(text, uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_job_health(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_job_health(text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_job_resume(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_job_resume(text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.job_pause_clear(text)', 'EXECUTE')
     OR (SELECT prosecdef FROM pg_proc WHERE oid = 'public.job_health_core(text, uuid)'::regprocedure)
     OR NOT (SELECT prosecdef FROM pg_proc WHERE oid = 'public.admin_job_health(text)'::regprocedure)
     OR NOT (SELECT prosecdef FROM pg_proc WHERE oid = 'public.admin_job_resume(text)'::regprocedure)
  THEN RAISE EXCEPTION 'NJH-5 acl'; END IF;
  RAISE EXCEPTION 'M3 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M3 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM public.job_runs WHERE id IN (v_r1, v_r2, v_r3))
    OR EXISTS (SELECT 1 FROM auth.users WHERE id = v_s AND email LIKE 'e2e-mig-%')
    OR EXISTS (SELECT 1 FROM public.roles WHERE id = v_role) THEN
   RAISE EXCEPTION 'M3 rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES ('20261030040000');