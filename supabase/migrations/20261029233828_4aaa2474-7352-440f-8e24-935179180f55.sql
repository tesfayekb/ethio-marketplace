-- J-1 (INC-1002, INC-1000): a name the AI cannot check goes to staff, still shown; a lost job call is closed.
-- 1. name_checks gains 'needs_review' and unusable_streak. name_check_mark takes 'unusable': it counts
--    the streak and moves an 'unchecked' row to 'needs_review' at the fifth in a row (N = 5); 'unavailable'
--    (provider down) leaves the streak; 'clean' and 'imitates' reset it. A changed checked_text resets it
--    in the existing BEFORE UPDATE trigger, so the doors' upserts (save_posting_identity,
--    admin_update_profile) need no change. 'needs_review' is public as 'unchecked' is (DEC-286 hides only
--    'imitates'): seller_public_alias and my_seller_line already test only 'imitates', and
--    seller_public_previous_alias shows only 'clean', so none is redeclared; alias_history's
--    released_state CHECK admits the state the doors copy on release.
-- 2. The staff queue (name_check_queue_page) lists 'imitates' and 'needs_review' rows and names each
--    row's state; admin_name_check_clear allows either.
-- 3. job_runs gains 'lost': job_call closes the job's older 'dispatched' rows nobody claimed, once they
--    are past any claim (job_run_claim's 300 s window; 10 minutes here), before it dispatches anew.
--    job_health_core reads it as the newest row's outcome; it is not redeclared.
-- Every function below is redeclared whole from its live definition (ethio-prod, 2026-10-29) with its closers.

ALTER TABLE public.name_checks ADD COLUMN unusable_streak integer NOT NULL DEFAULT 0;
ALTER TABLE public.name_checks ADD CONSTRAINT name_checks_unusable_streak_check CHECK (unusable_streak >= 0);
ALTER TABLE public.name_checks DROP CONSTRAINT name_checks_state_check;
ALTER TABLE public.name_checks
  ADD CONSTRAINT name_checks_state_check CHECK (state IN ('unchecked', 'clean', 'imitates', 'needs_review'));
ALTER TABLE public.alias_history DROP CONSTRAINT alias_history_released_state_ok;
ALTER TABLE public.alias_history
  ADD CONSTRAINT alias_history_released_state_ok
  CHECK (released_state IS NULL OR released_state IN ('clean', 'unchecked', 'imitates', 'needs_review'));
ALTER TABLE public.job_runs DROP CONSTRAINT job_runs_outcome_check;
ALTER TABLE public.job_runs
  ADD CONSTRAINT job_runs_outcome_check
  CHECK (outcome IN ('dispatched','not_configured','ok','busy','paused','switch_off','budget_spent','failed','lost'));

CREATE OR REPLACE FUNCTION public.name_checks_clear_imitates_of()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  -- A writer that moves the row out of 'imitates' takes the stated reason with it. A write that
  -- keeps the state is left to the CHECKs (a reason on a 'clean' row is refused, never nulled).
  IF NEW.state IS DISTINCT FROM OLD.state AND NEW.state <> 'imitates' THEN
    NEW.imitates_of := NULL;
  END IF;
  -- J-1 (INC-1002): a new name starts its unusable-answer streak from zero.
  IF NEW.checked_text IS DISTINCT FROM OLD.checked_text THEN
    NEW.unusable_streak := 0;
  END IF;
  RETURN NEW;
END $function$;
REVOKE ALL ON FUNCTION public.name_checks_clear_imitates_of() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_checks_clear_imitates_of() TO service_role;

CREATE OR REPLACE FUNCTION public.name_check_mark(p_profile uuid, p_subject text, p_text text, p_state text, p_of text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_n integer;
        v_of text := nullif(btrim(coalesce(p_of, '')), '');
BEGIN
  IF p_state IS NULL OR p_state NOT IN ('clean','imitates','unavailable','unusable') THEN RAISE EXCEPTION 'badValue:state'; END IF;
  -- N1b-3 R4: the reason is bounded (80, nameCheckOutput) and kept only with 'imitates'.
  IF v_of IS NOT NULL AND char_length(v_of) > 80 THEN RAISE EXCEPTION 'badValue:of'; END IF;
  IF p_state = 'unavailable' THEN
    UPDATE public.name_checks
       SET attempts = attempts + 1, last_attempt_at = now()
     WHERE profile_id = p_profile AND subject = p_subject AND checked_text = p_text;
  ELSIF p_state = 'unusable' THEN
    -- J-1 (INC-1002): the fifth unusable answer in a row moves an unchecked name to staff (N = 5).
    UPDATE public.name_checks
       SET attempts = attempts + 1, last_attempt_at = now(),
           unusable_streak = unusable_streak + 1,
           state = CASE WHEN state = 'unchecked' AND unusable_streak + 1 >= 5 THEN 'needs_review' ELSE state END,
           since = CASE WHEN state = 'unchecked' AND unusable_streak + 1 >= 5 THEN now() ELSE since END
     WHERE profile_id = p_profile AND subject = p_subject AND checked_text = p_text;
  ELSE
    UPDATE public.name_checks
       SET state = p_state, attempts = attempts + 1, last_attempt_at = now(), unusable_streak = 0,
           imitates_of = CASE WHEN p_state = 'imitates' THEN v_of ELSE NULL END
     WHERE profile_id = p_profile AND subject = p_subject AND checked_text = p_text;
  END IF;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n > 0;
END $function$;
REVOKE ALL ON FUNCTION public.name_check_mark(uuid, text, text, text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_check_mark(uuid, text, text, text, text) TO service_role;

CREATE OR REPLACE FUNCTION public.name_check_queue_page(p_after_since timestamp with time zone, p_after_profile uuid, p_limit integer, p_show_names boolean, p_only uuid[] DEFAULT NULL::uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SET search_path TO 'public'
AS $function$
DECLARE
  v_rows  jsonb;
  v_count integer;
  v_last_since timestamptz;
  v_last_profile uuid;
BEGIN
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 100 THEN RAISE EXCEPTION 'badValue:limit'; END IF;
  IF (p_after_since IS NULL) <> (p_after_profile IS NULL) THEN RAISE EXCEPTION 'badValue:after'; END IF;
  WITH page AS (
    SELECT c.profile_id, c.subject, c.state, c.checked_text, c.imitates_of, c.since, c.attempts
      FROM public.name_checks c
     WHERE c.state IN ('imitates', 'needs_review')
       AND (p_only IS NULL OR c.profile_id = ANY (p_only))
       AND (p_after_since IS NULL OR (c.since, c.profile_id) > (p_after_since, p_after_profile))
     ORDER BY c.since, c.profile_id
     LIMIT p_limit
  )
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'profile_id', g.profile_id,
           'subject', g.subject,
           'state', g.state,
           'name', CASE WHEN p_show_names THEN pr.seller_alias END,
           'checked_text', CASE WHEN p_show_names THEN g.checked_text END,
           'of', CASE WHEN p_show_names THEN g.imitates_of END,
           'name_hidden', NOT coalesce(p_show_names, false),
           'since', g.since,
           'attempts', g.attempts) ORDER BY g.since, g.profile_id), '[]'::jsonb),
         count(*),
         (array_agg(g.since ORDER BY g.since DESC, g.profile_id DESC))[1],
         (array_agg(g.profile_id ORDER BY g.since DESC, g.profile_id DESC))[1]
    INTO v_rows, v_count, v_last_since, v_last_profile
    FROM page g
    LEFT JOIN public.profiles pr ON pr.user_id = g.profile_id;
  RETURN jsonb_build_object(
    'rows', v_rows,
    'next', CASE WHEN v_count = p_limit THEN jsonb_build_object('since', v_last_since, 'profile_id', v_last_profile) END);
END $function$;
REVOKE ALL ON FUNCTION public.name_check_queue_page(timestamp with time zone, uuid, integer, boolean, uuid[]) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.name_check_queue_page(timestamp with time zone, uuid, integer, boolean, uuid[]) TO service_role;

CREATE OR REPLACE FUNCTION public.admin_name_check_clear(p_profile uuid, p_subject text, p_text text, p_reason text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_text   text := lower(btrim(coalesce(p_text, '')));
  v_reason text := nullif(btrim(coalesce(p_reason, '')), '');
  v_row    record;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'profiles', 'update') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('profiles', 'update');
  IF p_profile IS NULL OR p_subject IS NULL OR v_text = '' THEN RAISE EXCEPTION 'badValue:name'; END IF;
  IF v_reason IS NOT NULL AND char_length(v_reason) > 500 THEN RAISE EXCEPTION 'badValue:reason'; END IF;
  SELECT c.state, c.checked_text, c.imitates_of INTO v_row
    FROM public.name_checks c
   WHERE c.profile_id = p_profile AND c.subject = p_subject
   FOR UPDATE;
  IF NOT FOUND OR v_row.state NOT IN ('imitates', 'needs_review') OR v_row.checked_text IS DISTINCT FROM v_text THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'stale');
  END IF;
  UPDATE public.name_checks SET state = 'clean', since = now(), unusable_streak = 0
   WHERE profile_id = p_profile AND subject = p_subject;
  PERFORM public.log_audit('name_check.cleared', 'profiles', p_profile::text,
    jsonb_build_object('subject', p_subject, 'text', v_text,
                       'old', jsonb_build_object('state', v_row.state, 'of', v_row.imitates_of),
                       'new', jsonb_build_object('state', 'clean'),
                       'reason', v_reason));
  RETURN jsonb_build_object('ok', true);
END $function$;
REVOKE ALL ON FUNCTION public.admin_name_check_clear(uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_name_check_clear(uuid, text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_name_check_clear(uuid, text, text, text) TO service_role;

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
  -- J-1 (INC-1000): a call nobody claimed is past any claim after job_run_claim's 300 s window;
  -- it is closed as 'lost', so it never stays 'dispatched'. Why it was lost is in the route's log.
  UPDATE public.job_runs SET outcome = 'lost', reason = 'never_claimed', finished_at = now()
   WHERE job = p_job AND outcome = 'dispatched' AND claimed_at IS NULL
     AND started_at < now() - interval '10 minutes';
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
GRANT ALL ON FUNCTION public.job_call(text) TO service_role;

-- PROOF (NCAP-1…7): its own scratch seller and scratch staff only, rolled back whole, raising on failure.
DO $proof$
DECLARE
  v_hex  text := replace(gen_random_uuid()::text, '-', '');
  v_tag  text := 'e2e-mig-j1-' || substr(v_hex, 1, 12);
  v_u    uuid := gen_random_uuid();
  v_s    uuid := gen_random_uuid();
  v_role uuid := gen_random_uuid();
  v_sess uuid := gen_random_uuid();
  v_a    text := 'qz' || translate(substr(v_hex, 1, 10), '0123456789', 'ghijkmnopr');
  v_lang text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
  v_r    jsonb;
  v_ok   boolean;
  v_i    integer;
  v_c    record;
BEGIN
 BEGIN
  INSERT INTO auth.users(id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_u, v_tag || '@example.invalid', '{}', 'authenticated', 'authenticated', now(), now()),
           (v_s, v_tag || '-s@example.invalid', '{}', 'authenticated', 'authenticated', now(), now());
  INSERT INTO public.legal_acceptances(user_id, version_id, language, method)
  SELECT v_u, v.id, v_lang, v_tag FROM public.legal_versions v
   WHERE v.status = 'published' AND v.effective_at <= now();
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_u, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u::text, true);
  v_r := public.save_posting_identity(p_alias => v_a);
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);
  IF (v_r->>'ok')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'NCAP setup: save %', v_r; END IF;

  -- NCAP-1: four unusable answers keep the name unchecked; the fifth moves it to needs_review.
  FOR v_i IN 1..4 LOOP
    v_ok := public.name_check_mark(v_u, 'alias', v_a, 'unusable');
    IF v_ok IS NOT TRUE THEN RAISE EXCEPTION 'NCAP-1 mark %', v_i; END IF;
  END LOOP;
  SELECT state, unusable_streak INTO v_c FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias';
  IF v_c.state IS DISTINCT FROM 'unchecked' OR v_c.unusable_streak IS DISTINCT FROM 4 THEN RAISE EXCEPTION 'NCAP-1 four: %', row_to_json(v_c); END IF;

  -- NCAP-2: 'unavailable' does not count, and does not reset.
  v_ok := public.name_check_mark(v_u, 'alias', v_a, 'unavailable');
  SELECT state, unusable_streak INTO v_c FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias';
  IF v_c.state IS DISTINCT FROM 'unchecked' OR v_c.unusable_streak IS DISTINCT FROM 4 THEN RAISE EXCEPTION 'NCAP-2: %', row_to_json(v_c); END IF;

  v_ok := public.name_check_mark(v_u, 'alias', v_a, 'unusable');
  SELECT state, unusable_streak INTO v_c FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias';
  IF v_c.state IS DISTINCT FROM 'needs_review' OR v_c.unusable_streak IS DISTINCT FROM 5 THEN RAISE EXCEPTION 'NCAP-1 fifth: %', row_to_json(v_c); END IF;

  -- NCAP-7: a needs_review name is still shown, and its owner is not told it is under review.
  IF public.seller_public_alias(v_u) IS DISTINCT FROM v_a THEN RAISE EXCEPTION 'NCAP-7 hidden'; END IF;
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_u, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u::text, true);
  v_r := public.my_seller_line();
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);
  IF (v_r->>'under_review')::boolean IS NOT FALSE THEN RAISE EXCEPTION 'NCAP-7 under review: %', v_r; END IF;

  -- NCAP-4: the queue lists it with its state; the catch-up's pick (state 'unchecked') no longer holds it.
  v_r := public.name_check_queue_page(NULL, NULL, 10, true, ARRAY[v_u]);
  IF jsonb_array_length(v_r->'rows') <> 1 OR v_r#>>'{rows,0,state}' <> 'needs_review' OR v_r#>>'{rows,0,checked_text}' <> v_a
  THEN RAISE EXCEPTION 'NCAP-4 queue: %', v_r; END IF;
  IF EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id = v_u AND state = 'unchecked') THEN RAISE EXCEPTION 'NCAP-4 pick'; END IF;

  -- NCAP-5: scratch staff with profiles:update and a fresh second factor clears it, audited with the old state.
  INSERT INTO public.roles(id, name) VALUES (v_role, v_tag);
  INSERT INTO public.role_permissions(role_id, permission_id)
  SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
   WHERE (r.name = 'profiles' AND p.action = 'update');
  INSERT INTO public.user_roles(user_id, role_id, scope_type) VALUES (v_s, v_role, 'global');
  INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_s, now(), now(), 'aal2');
  INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status, created_at, updated_at)
  VALUES (gen_random_uuid(), v_s, v_tag, 'totp', 'verified', now(), now());
  INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
  VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_s, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess)::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_s::text, true);
  v_r := public.admin_name_check_clear(v_u, 'alias', v_a, 'staff review');
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);
  IF v_r IS DISTINCT FROM '{"ok": true}'::jsonb THEN RAISE EXCEPTION 'NCAP-5 clear: %', v_r; END IF;
  SELECT state, unusable_streak INTO v_c FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias';
  IF v_c.state IS DISTINCT FROM 'clean' OR v_c.unusable_streak IS DISTINCT FROM 0 THEN RAISE EXCEPTION 'NCAP-5 readback: %', row_to_json(v_c); END IF;
  IF NOT EXISTS (SELECT 1 FROM public.audit_log WHERE action = 'name_check.cleared' AND entity_id = v_u::text AND actor_id = v_s
                  AND meta#>>'{old,state}' = 'needs_review') THEN RAISE EXCEPTION 'NCAP-5 audit'; END IF;

  -- NCAP-3: 'clean' and 'imitates' reset the streak.
  UPDATE public.name_checks SET state = 'unchecked' WHERE profile_id = v_u AND subject = 'alias';
  v_ok := public.name_check_mark(v_u, 'alias', v_a, 'unusable');
  v_ok := public.name_check_mark(v_u, 'alias', v_a, 'unusable');
  v_ok := public.name_check_mark(v_u, 'alias', v_a, 'imitates', 'Ethio Telecom');
  IF (SELECT unusable_streak FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM 0
  THEN RAISE EXCEPTION 'NCAP-3 imitates'; END IF;
  v_ok := public.name_check_mark(v_u, 'alias', v_a, 'unusable');
  v_ok := public.name_check_mark(v_u, 'alias', v_a, 'clean');
  IF (SELECT unusable_streak FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM 0
  THEN RAISE EXCEPTION 'NCAP-3 clean'; END IF;

  -- NCAP-6: a new name resets the row to unchecked with no streak; the released name was stamped with its state.
  UPDATE public.name_checks SET state = 'unchecked' WHERE profile_id = v_u AND subject = 'alias';
  FOR v_i IN 1..5 LOOP v_ok := public.name_check_mark(v_u, 'alias', v_a, 'unusable'); END LOOP;
  IF (SELECT state FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM 'needs_review'
  THEN RAISE EXCEPTION 'NCAP-6 setup'; END IF;
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_u, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u::text, true);
  v_r := public.save_posting_identity(p_alias => v_a || 'b');
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);
  IF (v_r->>'ok')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'NCAP-6 rename %', v_r; END IF;
  SELECT state, unusable_streak, checked_text INTO v_c FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias';
  IF v_c.state IS DISTINCT FROM 'unchecked' OR v_c.unusable_streak IS DISTINCT FROM 0 OR v_c.checked_text IS DISTINCT FROM v_a || 'b'
  THEN RAISE EXCEPTION 'NCAP-6 readback: %', row_to_json(v_c); END IF;
  IF (SELECT released_state FROM public.alias_history WHERE user_id = v_u AND alias = v_a) IS DISTINCT FROM 'needs_review'
  THEN RAISE EXCEPTION 'NCAP-6 released state'; END IF;
  -- NCAP-7 (previous name): a released needs_review name is withheld, as an unchecked one is.
  IF public.seller_public_previous_alias(v_u) IS NOT NULL THEN RAISE EXCEPTION 'NCAP-7 previous shown'; END IF;

  -- Closers read back.
  IF has_function_privilege('anon', 'public.name_check_mark(uuid, text, text, text, text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.name_check_mark(uuid, text, text, text, text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.name_check_queue_page(timestamp with time zone, uuid, integer, boolean, uuid[])', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_name_check_clear(uuid, text, text, text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_name_check_clear(uuid, text, text, text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.job_call(text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.job_call(text)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.job_call(text)', 'EXECUTE')
     OR NOT (SELECT prosecdef FROM pg_proc WHERE oid = 'public.name_check_mark(uuid, text, text, text, text)'::regprocedure)
     OR NOT (SELECT prosecdef FROM pg_proc WHERE oid = 'public.admin_name_check_clear(uuid, text, text, text)'::regprocedure)
     OR NOT (SELECT prosecdef FROM pg_proc WHERE oid = 'public.job_call(text)'::regprocedure)
  THEN RAISE EXCEPTION 'NCAP acl'; END IF;
  RAISE EXCEPTION 'J1 NCAP proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'J1 NCAP proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id IN (v_u, v_s) AND email LIKE 'e2e-mig-%')
    OR EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id = v_u)
    OR EXISTS (SELECT 1 FROM public.roles WHERE id = v_role) THEN
   RAISE EXCEPTION 'J1 NCAP rollback failed'; END IF;
END;
$proof$;

-- PROOF (JLOST-1…3): the close step's own predicate on scratch job_runs rows (negative ts, never a real
-- run's), rolled back whole. It never calls job_call (that would read the Vault and dispatch): the
-- UPDATE below is job_call's own close statement, read back from its definition first.
DO $proof$
DECLARE
  v_hex text := replace(gen_random_uuid()::text, '-', '');
  v_old uuid := gen_random_uuid();
  v_new uuid := gen_random_uuid();
  v_cl  uuid := gen_random_uuid();
  v_def text := pg_get_functiondef('public.job_call(text)'::regprocedure);
BEGIN
 BEGIN
  IF position('SET outcome = ''lost'', reason = ''never_claimed''' IN v_def) = 0
     OR position('AND started_at < now() - interval ''10 minutes''' IN v_def) = 0
     OR position('outcome = ''dispatched'' AND claimed_at IS NULL' IN v_def) = 0
     OR position('lost' IN v_def) > position('INSERT INTO public.job_runs(job, ts, outcome)' IN v_def)
  THEN RAISE EXCEPTION 'JLOST def'; END IF;
  INSERT INTO public.job_runs(id, job, ts, started_at, claimed_at, finished_at, outcome, reason) VALUES
    (v_old, 'name-check-catchup', -1 * (('x' || substr(v_hex, 1, 8))::bit(32)::bigint) - 1, now() - interval '20 minutes', NULL, NULL, 'dispatched', NULL),
    (v_new, 'name-check-catchup', -1 * (('x' || substr(v_hex, 9, 8))::bit(32)::bigint) - 5000000000, now() - interval '2 minutes', NULL, NULL, 'dispatched', NULL),
    (v_cl,  'name-check-catchup', -1 * (('x' || substr(v_hex, 17, 8))::bit(32)::bigint) - 10000000000, now() - interval '30 minutes', now() - interval '30 minutes', NULL, 'dispatched', NULL);
  UPDATE public.job_runs SET outcome = 'lost', reason = 'never_claimed', finished_at = now()
   WHERE job = 'name-check-catchup' AND outcome = 'dispatched' AND claimed_at IS NULL
     AND started_at < now() - interval '10 minutes'
     AND id IN (v_old, v_new, v_cl);
  -- JLOST-1: an old unclaimed row is closed as lost, with its reason and time.
  IF (SELECT outcome || '/' || reason FROM public.job_runs WHERE id = v_old) IS DISTINCT FROM 'lost/never_claimed'
     OR (SELECT finished_at FROM public.job_runs WHERE id = v_old) IS NULL THEN RAISE EXCEPTION 'JLOST-1'; END IF;
  -- JLOST-2: a fresh unclaimed row and a claimed row stay as they were.
  IF (SELECT outcome FROM public.job_runs WHERE id = v_new) IS DISTINCT FROM 'dispatched'
     OR (SELECT outcome FROM public.job_runs WHERE id = v_cl) IS DISTINCT FROM 'dispatched' THEN RAISE EXCEPTION 'JLOST-2'; END IF;
  -- JLOST-3: the health line reads 'lost' as the outcome of the newest finished run, and a lost row is never claimable.
  IF public.job_health_core('name-check-catchup', v_old)#>>'{last,outcome}' IS DISTINCT FROM 'lost'
     OR (public.job_health_core('name-check-catchup', v_old)->>'dispatched_unclaimed')::boolean THEN RAISE EXCEPTION 'JLOST-3 health'; END IF;
  RAISE EXCEPTION 'J1 JLOST proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'J1 JLOST proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM public.job_runs WHERE id IN (v_old, v_new, v_cl)) THEN RAISE EXCEPTION 'J1 JLOST rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES ('20261030050000');