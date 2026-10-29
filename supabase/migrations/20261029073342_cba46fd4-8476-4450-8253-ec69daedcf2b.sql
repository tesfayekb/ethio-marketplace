-- Foundations turn N1b-1, M3 (INC-977): the jobs route's doors, all service-only.
-- job_run_claim: claims the run job_call dispatched for (job, ts), once, inside the window (300 s old .. 60 s
--   ahead); a used, unknown or out-of-window (job, ts) is refused before any lease (S2).
-- job_lease_take / job_lease_release: single-flight per job (a lease row with an expiry).
-- job_pause_read / job_pause_set / job_pause_clear: the circuit breaker's stored reason.
-- job_run_finish: writes a claimed run's outcome and counts once.
-- name_check_mark: redeclared whole from live pg_get_functiondef (argument list unchanged, no DROP); 'unavailable'
--   raises attempts and last_attempt_at and leaves the state (A3); the matching-text rule is kept.

CREATE OR REPLACE FUNCTION public.name_check_mark(p_profile uuid, p_subject text, p_text text, p_state text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_n integer;
BEGIN
  IF p_state IS NULL OR p_state NOT IN ('clean','imitates','unavailable') THEN RAISE EXCEPTION 'badValue:state'; END IF;
  IF p_state = 'unavailable' THEN
    UPDATE public.name_checks
       SET attempts = attempts + 1, last_attempt_at = now()
     WHERE profile_id = p_profile AND subject = p_subject AND checked_text = p_text;
  ELSE
    UPDATE public.name_checks
       SET state = p_state, attempts = attempts + 1, last_attempt_at = now()
     WHERE profile_id = p_profile AND subject = p_subject AND checked_text = p_text;
  END IF;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n > 0;
END $function$;
REVOKE ALL ON FUNCTION public.name_check_mark(uuid, text, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.name_check_mark(uuid, text, text, text) TO service_role;

CREATE FUNCTION public.job_run_claim(p_job text, p_ts bigint)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_now bigint := floor(extract(epoch FROM clock_timestamp()))::bigint;
  v_run uuid;
BEGIN
  IF p_job IS NULL OR p_job NOT IN ('name-check-catchup') THEN RAISE EXCEPTION 'badValue:job'; END IF;
  IF p_ts IS NULL OR p_ts < v_now - 300 OR p_ts > v_now + 60 THEN RAISE EXCEPTION 'refused:window'; END IF;
  UPDATE public.job_runs SET claimed_at = now()
   WHERE job = p_job AND ts = p_ts AND outcome = 'dispatched' AND claimed_at IS NULL
  RETURNING id INTO v_run;
  IF v_run IS NULL THEN RAISE EXCEPTION 'refused:replay'; END IF;
  RETURN v_run;
END $function$;

CREATE FUNCTION public.job_lease_take(p_job text, p_holder uuid, p_seconds integer)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_n integer;
BEGIN
  IF p_job IS NULL OR p_job NOT IN ('name-check-catchup') THEN RAISE EXCEPTION 'badValue:job'; END IF;
  IF p_holder IS NULL THEN RAISE EXCEPTION 'badValue:holder'; END IF;
  IF p_seconds IS NULL OR p_seconds < 10 OR p_seconds > 900 THEN RAISE EXCEPTION 'badValue:seconds'; END IF;
  INSERT INTO public.job_leases(job, holder, expires_at)
       VALUES (p_job, p_holder, now() + make_interval(secs => p_seconds))
  ON CONFLICT (job) DO UPDATE SET holder = EXCLUDED.holder, expires_at = EXCLUDED.expires_at
   WHERE public.job_leases.expires_at < now();
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n > 0;
END $function$;

CREATE FUNCTION public.job_lease_release(p_job text, p_holder uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_n integer;
BEGIN
  DELETE FROM public.job_leases WHERE job = p_job AND holder = p_holder;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n > 0;
END $function$;

CREATE FUNCTION public.job_pause_read(p_job text)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT coalesce(
    (SELECT jsonb_build_object('paused', true, 'reason', reason, 'since', since) FROM public.job_pauses WHERE job = p_job),
    jsonb_build_object('paused', false));
$function$;

CREATE FUNCTION public.job_pause_set(p_job text, p_reason text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF p_job IS NULL OR p_job NOT IN ('name-check-catchup') THEN RAISE EXCEPTION 'badValue:job'; END IF;
  IF p_reason IS NULL OR p_reason NOT IN ('credits','policy','rate_limit') THEN RAISE EXCEPTION 'badValue:reason'; END IF;
  INSERT INTO public.job_pauses(job, reason) VALUES (p_job, p_reason)
  ON CONFLICT (job) DO UPDATE SET reason = EXCLUDED.reason;
END $function$;

CREATE FUNCTION public.job_pause_clear(p_job text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_n integer;
BEGIN
  DELETE FROM public.job_pauses WHERE job = p_job;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n > 0;
END $function$;

CREATE FUNCTION public.job_run_finish(p_run uuid, p_outcome text, p_reason text,
  p_asked integer, p_clean integer, p_imitates integer, p_unavailable integer)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_n integer;
BEGIN
  IF p_outcome IS NULL OR p_outcome NOT IN ('ok','busy','paused','switch_off','budget_spent','failed') THEN
    RAISE EXCEPTION 'badValue:outcome'; END IF;
  UPDATE public.job_runs
     SET outcome = p_outcome, reason = p_reason, finished_at = now(),
         asked = coalesce(p_asked, 0), clean = coalesce(p_clean, 0),
         imitates = coalesce(p_imitates, 0), unavailable = coalesce(p_unavailable, 0)
   WHERE id = p_run AND claimed_at IS NOT NULL AND finished_at IS NULL;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n > 0;
END $function$;

REVOKE ALL ON FUNCTION public.job_run_claim(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.job_lease_take(text, uuid, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.job_lease_release(text, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.job_pause_read(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.job_pause_set(text, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.job_pause_clear(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.job_run_finish(uuid, text, text, integer, integer, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.job_run_claim(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.job_lease_take(text, uuid, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.job_lease_release(text, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.job_pause_read(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.job_pause_set(text, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.job_pause_clear(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.job_run_finish(uuid, text, text, integer, integer, integer, integer) TO service_role;

-- Proof (INC-970, INC-980): scratch e2e-n1b users and scratch job rows only, read by their own ids; job_leases and
-- job_pauses are empty at birth (M2) and the proof asserts that before it writes; the sentinel rolls it all back.
DO $proof$
DECLARE
  v_hex  text := replace(gen_random_uuid()::text,'-','');
  v_tag  text := 'e2e-n1b-' || substr(v_hex,1,12);
  v_u1   uuid := gen_random_uuid();
  v_a1   text := 'qz' || translate(substr(v_hex,1,10),'0123456789','ghijkmnopr');
  v_now  bigint := floor(extract(epoch FROM clock_timestamp()))::bigint;
  v_run  uuid := gen_random_uuid();
  v_old  uuid := gen_random_uuid();
  v_h1   uuid := gen_random_uuid();
  v_h2   uuid := gen_random_uuid();
  v_got  uuid;
  v_c    public.name_checks%ROWTYPE;
  v_j    public.job_runs%ROWTYPE;
  v_p    jsonb;
  v_fn   text;
BEGIN
 BEGIN
  IF EXISTS (SELECT 1 FROM public.job_leases WHERE job = 'name-check-catchup')
     OR EXISTS (SELECT 1 FROM public.job_pauses WHERE job = 'name-check-catchup') THEN
    RAISE EXCEPTION 'M3 setup: a live lease or pause exists'; END IF;
  INSERT INTO auth.users(id,email,raw_user_meta_data,aud,role,created_at,updated_at)
    VALUES (v_u1, v_tag||'-a@example.invalid','{}','authenticated','authenticated',now(),now());
  DELETE FROM public.name_checks WHERE profile_id = v_u1;
  INSERT INTO public.name_checks(profile_id,subject,checked_text,state,attempts)
    VALUES (v_u1,'alias',v_a1,'unchecked',0);

  -- MK-1 (A3): 'unavailable' raises attempts and last_attempt_at and leaves the state.
  IF NOT public.name_check_mark(v_u1,'alias',v_a1,'unavailable') THEN RAISE EXCEPTION 'MK-1 no row'; END IF;
  SELECT * INTO v_c FROM public.name_checks WHERE profile_id = v_u1;
  IF v_c.state <> 'unchecked' OR v_c.attempts <> 1 OR v_c.last_attempt_at IS NULL THEN
    RAISE EXCEPTION 'MK-1 unavailable: % %', v_c.state, v_c.attempts; END IF;
  -- MK-2: 'unavailable' never moves a row to 'clean' (from 'imitates' either).
  UPDATE public.name_checks SET state = 'imitates' WHERE profile_id = v_u1;
  PERFORM public.name_check_mark(v_u1,'alias',v_a1,'unavailable');
  IF (SELECT state FROM public.name_checks WHERE profile_id = v_u1) <> 'imitates' THEN RAISE EXCEPTION 'MK-2 state moved'; END IF;
  UPDATE public.name_checks SET state = 'unchecked' WHERE profile_id = v_u1;
  -- MK-3: a stale text changes nothing, for every state.
  IF public.name_check_mark(v_u1,'alias',v_a1||'x','unavailable') THEN RAISE EXCEPTION 'MK-3 stale marked'; END IF;
  IF public.name_check_mark(v_u1,'alias',v_a1||'x','clean') THEN RAISE EXCEPTION 'MK-3 stale marked clean'; END IF;
  SELECT * INTO v_c FROM public.name_checks WHERE profile_id = v_u1;
  IF v_c.state <> 'unchecked' OR v_c.attempts <> 2 THEN RAISE EXCEPTION 'MK-3 stale changed the row'; END IF;
  -- MK-4: an unknown state is refused.
  BEGIN PERFORM public.name_check_mark(v_u1,'alias',v_a1,'unchecked'); RAISE EXCEPTION 'MK-4 refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:state' THEN RAISE; END IF; END;
  -- MK-5: 'clean' still marks.
  -- (the call and its read-back are separate statements: an OR's operand order is not guaranteed in SQL)
  IF NOT public.name_check_mark(v_u1,'alias',v_a1,'clean') THEN RAISE EXCEPTION 'MK-5 clean: no row'; END IF;
  IF (SELECT state FROM public.name_checks WHERE profile_id = v_u1) <> 'clean' THEN RAISE EXCEPTION 'MK-5 clean'; END IF;

  -- CL-1: a dispatched run is claimed once; the second claim is refused (replay).
  INSERT INTO public.job_runs(id, job, ts, outcome) VALUES (v_run, 'name-check-catchup', v_now, 'dispatched');
  v_got := public.job_run_claim('name-check-catchup', v_now);
  IF v_got IS DISTINCT FROM v_run OR (SELECT claimed_at FROM public.job_runs WHERE id = v_run) IS NULL THEN
    RAISE EXCEPTION 'CL-1 claim'; END IF;
  BEGIN PERFORM public.job_run_claim('name-check-catchup', v_now); RAISE EXCEPTION 'CL-1 replay refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'refused:replay' THEN RAISE; END IF; END;
  -- CL-2: a timestamp with no dispatched run is refused (a forged call the database never made).
  BEGIN PERFORM public.job_run_claim('name-check-catchup', v_now - 1); RAISE EXCEPTION 'CL-2 refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'refused:replay' THEN RAISE; END IF; END;
  -- CL-3: outside the window (301 s old, 61 s ahead) is refused, and the run stays unclaimed.
  INSERT INTO public.job_runs(id, job, ts, outcome) VALUES (v_old, 'name-check-catchup', v_now - 301, 'dispatched');
  BEGIN PERFORM public.job_run_claim('name-check-catchup', v_now - 301); RAISE EXCEPTION 'CL-3 old refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'refused:window' THEN RAISE; END IF; END;
  BEGIN PERFORM public.job_run_claim('name-check-catchup', v_now + 61); RAISE EXCEPTION 'CL-3 ahead refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'refused:window' THEN RAISE; END IF; END;
  IF (SELECT claimed_at FROM public.job_runs WHERE id = v_old) IS NOT NULL THEN RAISE EXCEPTION 'CL-3 claimed'; END IF;
  BEGIN PERFORM public.job_run_claim('e2e-n1b-unknown', v_now); RAISE EXCEPTION 'CL-4 refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:job' THEN RAISE; END IF; END;

  -- LS-1: one holder takes the lease; a second is refused while it lives; release frees it; an expired lease is retaken.
  IF NOT public.job_lease_take('name-check-catchup', v_h1, 120) THEN RAISE EXCEPTION 'LS-1 take'; END IF;
  IF public.job_lease_take('name-check-catchup', v_h2, 120) THEN RAISE EXCEPTION 'LS-1 second holder took it'; END IF;
  IF public.job_lease_release('name-check-catchup', v_h2) THEN RAISE EXCEPTION 'LS-1 wrong holder released'; END IF;
  IF NOT public.job_lease_release('name-check-catchup', v_h1) THEN RAISE EXCEPTION 'LS-1 release'; END IF;
  IF NOT public.job_lease_take('name-check-catchup', v_h2, 120) THEN RAISE EXCEPTION 'LS-1 retake'; END IF;
  UPDATE public.job_leases SET expires_at = now() - interval '1 second' WHERE job = 'name-check-catchup' AND holder = v_h2;
  IF NOT public.job_lease_take('name-check-catchup', v_h1, 120) THEN RAISE EXCEPTION 'LS-1 expired retake'; END IF;
  IF (SELECT holder FROM public.job_leases WHERE job = 'name-check-catchup') <> v_h1 THEN RAISE EXCEPTION 'LS-1 expired holder'; END IF;
  BEGIN PERFORM public.job_lease_take('name-check-catchup', v_h1, 5); RAISE EXCEPTION 'LS-2 refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:seconds' THEN RAISE; END IF; END;

  -- PS-1: pause read/set/clear.
  IF (public.job_pause_read('name-check-catchup')->>'paused')::boolean THEN RAISE EXCEPTION 'PS-1 paused at birth'; END IF;
  PERFORM public.job_pause_set('name-check-catchup', 'credits');
  v_p := public.job_pause_read('name-check-catchup');
  IF NOT (v_p->>'paused')::boolean OR v_p->>'reason' <> 'credits' THEN RAISE EXCEPTION 'PS-1 set: %', v_p; END IF;
  BEGIN PERFORM public.job_pause_set('name-check-catchup', 'e2e'); RAISE EXCEPTION 'PS-2 refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:reason' THEN RAISE; END IF; END;
  IF NOT public.job_pause_clear('name-check-catchup') THEN RAISE EXCEPTION 'PS-1 clear'; END IF;
  IF (public.job_pause_read('name-check-catchup')->>'paused')::boolean THEN RAISE EXCEPTION 'PS-1 still paused'; END IF;

  -- FN-1: a claimed run finishes once; an unclaimed one never.
  IF NOT public.job_run_finish(v_run, 'ok', NULL, 3, 2, 1, 0) THEN RAISE EXCEPTION 'FN-1 finish'; END IF;
  SELECT * INTO v_j FROM public.job_runs WHERE id = v_run;
  IF v_j.outcome <> 'ok' OR v_j.asked <> 3 OR v_j.clean <> 2 OR v_j.imitates <> 1 OR v_j.finished_at IS NULL THEN
    RAISE EXCEPTION 'FN-1 row'; END IF;
  IF public.job_run_finish(v_run, 'failed', NULL, 0, 0, 0, 0) THEN RAISE EXCEPTION 'FN-1 finished twice'; END IF;
  IF public.job_run_finish(v_old, 'ok', NULL, 0, 0, 0, 0) THEN RAISE EXCEPTION 'FN-2 unclaimed finished'; END IF;
  BEGIN PERFORM public.job_run_finish(v_old, 'dispatched', NULL, 0, 0, 0, 0); RAISE EXCEPTION 'FN-3 refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:outcome' THEN RAISE; END IF; END;

  -- AC-1: every door is service-only.
  FOREACH v_fn IN ARRAY ARRAY['public.name_check_mark(uuid,text,text,text)','public.job_run_claim(text,bigint)',
      'public.job_lease_take(text,uuid,integer)','public.job_lease_release(text,uuid)','public.job_pause_read(text)',
      'public.job_pause_set(text,text)','public.job_pause_clear(text)',
      'public.job_run_finish(uuid,text,text,integer,integer,integer,integer)'] LOOP
    IF has_function_privilege('public', v_fn, 'EXECUTE') OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'AC-1 %', v_fn; END IF;
  END LOOP;

  RAISE EXCEPTION 'M3 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M3 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u1) OR EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id = v_u1)
    OR EXISTS (SELECT 1 FROM public.job_runs WHERE id IN (v_run, v_old))
    OR EXISTS (SELECT 1 FROM public.job_leases WHERE holder IN (v_h1, v_h2)) THEN
   RAISE EXCEPTION 'M3 rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES('20261029233000');