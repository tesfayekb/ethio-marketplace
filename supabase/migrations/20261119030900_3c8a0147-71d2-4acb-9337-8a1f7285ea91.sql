-- e2e-areas: admin-services, admin-screening

-- Foundations 1, turn F1-6b, part 5 of 7 — THE SERVICES DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-6b.md; census docs/governance/reports/f1-doors-6b.census.md, decision 7).
-- admin_set_ai_feature and admin_job_resume are redeclared WHOLE from their last declarations (live md5s checked):
-- each opens with ONE door_context gate on services:manage in the global form, with the second factor and the
-- staff_config dial (the job's resume gains the dial), and refuses by door_refuse codes inside the shell. Their
-- codes are kept (badValue:<field>, unknownFeature, overBudget); the job's unknown name becomes badValue:job after
-- the dial, and a job that is not paused still answers {ok:false, reason:'notPaused'}. Every write after the
-- checks is unchanged.

DO $pre$
DECLARE
  v_fn  text;
  v_md5 text;
  v_was text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119050300') THEN
    RAISE EXCEPTION 'F1-6b part 5: the mark 20261119050300 must be applied first';
  END IF;
  FOR v_fn, v_was IN VALUES
    ('public.admin_set_ai_feature(text,boolean,integer,integer)', '91bdeb81c03d4a00d7d07362324f175e'),
    ('public.admin_job_resume(text)', '53ae69f7bb64a21ce0b73a9972b2b1fe')
  LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6b part 5: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_set_ai_feature (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_set_ai_feature(p_feature text, p_enabled boolean, p_monthly_budget_cents integer, p_unit_cost_microusd integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v        public.ai_features%ROWTYPE;
  v_before jsonb;
  v_first  date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_month  timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
  v_spent  bigint;
  v_level  smallint := 0;
  v_on     boolean;
BEGIN
  -- The door's authority, its second factor and its dial (staff_config), in one gate before its first read.
  PERFORM public.door_context('staff', 'services', 'manage', 'staff_config', NULL, 'global');
  IF p_enabled IS NULL THEN PERFORM public.door_refuse('badValue', 'enabled'); END IF;
  IF p_unit_cost_microusd IS NULL OR p_unit_cost_microusd < 0 OR p_unit_cost_microusd > 10000000 THEN
    PERFORM public.door_refuse('badValue', 'unitCost');
  END IF;
  IF p_monthly_budget_cents IS NOT NULL AND (p_monthly_budget_cents < 0 OR p_monthly_budget_cents > 100000000) THEN
    PERFORM public.door_refuse('badValue', 'budget');
  END IF;
  SELECT * INTO v FROM public.ai_features WHERE feature = p_feature FOR UPDATE;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownFeature'); END IF;
  -- D158 (bundle 13 turn 6) — photo screening may be switched off: new photos are then held
  -- for staff (listing_photos.unscreened) and shown to no buyer until the ad is approved.
  v_before := to_jsonb(v) - 'updated_by';
  SELECT coalesce(sum(s.cost_microusd), 0)::bigint INTO v_spent
    FROM public.ai_spend_days s
   WHERE s.feature = v.feature AND s.day >= v_first;
  IF p_monthly_budget_cents IS NOT NULL THEN
    v_level := CASE WHEN v_spent >= p_monthly_budget_cents::bigint * 10000 THEN 100
                    WHEN v_spent * 10 >= p_monthly_budget_cents::bigint * 10000 * 8 THEN 80
                    ELSE 0 END;
  END IF;
  -- D184 (bundle 16 turn S1): no feature, photo screening included, is switched on past its budget.
  IF p_enabled AND v_level = 100 THEN PERFORM public.door_refuse('overBudget'); END IF;
  v_on := v.enabled OR (v.off_reason = 'budget' AND v.off_at < v_month);
  UPDATE public.ai_features
     SET enabled = p_enabled,
         off_reason = CASE WHEN p_enabled THEN NULL WHEN v_on THEN 'staff' ELSE v.off_reason END,
         off_at = CASE WHEN p_enabled THEN NULL WHEN v_on THEN now() ELSE v.off_at END,
         monthly_budget_cents = p_monthly_budget_cents,
         unit_cost_microusd = p_unit_cost_microusd,
         alert_month = v_first,
         alert_level = v_level,
         updated_at = now(),
         updated_by = v_uid
   WHERE feature = v.feature
  RETURNING * INTO v;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'ai.feature_set', 'ai_feature', v.feature,
          jsonb_build_object('before', v_before, 'after', to_jsonb(v) - 'updated_by'));
  RETURN jsonb_build_object('ok', true, 'feature', v.feature, 'on', v.enabled, 'off_reason', v.off_reason,
                            'monthly_budget_cents', v.monthly_budget_cents,
                            'unit_cost_microusd', v.unit_cost_microusd, 'alert_level', v.alert_level);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_ai_feature', 'staff_config', SQLERRM);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_job_resume (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_job_resume(p_job text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_pause record;
BEGIN
  -- The door's authority, its second factor and its dial (staff_config; INC-1038), in one gate.
  PERFORM public.door_context('staff', 'services', 'manage', 'staff_config', NULL, 'global');
  IF p_job IS NULL OR p_job NOT IN ('name-check-catchup') THEN PERFORM public.door_refuse('badValue', 'job'); END IF;
  SELECT p.reason, p.since INTO v_pause FROM public.job_pauses p WHERE p.job = p_job FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'reason', 'notPaused'); END IF;
  PERFORM public.job_pause_clear(p_job);
  PERFORM public.log_audit('job.resumed', 'job', p_job,
    jsonb_build_object('old', jsonb_build_object('reason', v_pause.reason, 'since', v_pause.since)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_job_resume', 'staff_config', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_job_resume(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_job_resume(text) TO authenticated, service_role;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
DO $proof$
DECLARE
  -- Letters only (law 15): a scratch key never reads as a number.
  v_stem    text := translate(substr(md5(gen_random_uuid()::text), 1, 10), '0123456789', 'ghijkmnopr');
  v_tag     text;
  v_s       uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_nf      uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_rl      uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess2   uuid := gen_random_uuid();
  v_sess3   uuid := gen_random_uuid();
  v_role    uuid;
  v_window  integer;
  v_start   timestamptz;
  v_claims  jsonb;
  v_who     text;
  v_call    text;
  v_want    text;
  v_status  text;
  v_spends  boolean;
  v_got     text;
  v_st      text;
  v_answer  jsonb;
  v_spent   jsonb := '{}'::jsonb;
  v_met     jsonb := '{}'::jsonb;
  v_base    jsonb;
  v_door    text;
  v_count   integer;
  v_msg     text;
  v_fn      text;
  v_was     text;
  -- 'XZ' and 'XY': scratch codes no market holds, 'XQ' a code no country holds, as earlier proofs' (K4: a recorded
  -- proof exception)
  v_code    character(2) := 'XZ';
  v_code2   character(2) := 'XY';
  v_nocode  character(2) := 'XQ';
  v_feat    text;
  v_job     text := 'name-check-catchup';
BEGIN
  FOR v_fn, v_was IN VALUES
    ('public.admin_set_ai_feature(text,boolean,integer,integer)', '58b3392f1baedd1473225f1fa9805480'),
    ('public.admin_job_resume(text)', '8fe5e060904ceff71a67d3bd754254c3')
  LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
              OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6b part 5 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn::regprocedure)
       IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6b part 5 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_tag := 'e2e-mig-f16b-5-' || v_stem;
    v_feat := 'e2e-mig-' || v_stem;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2, v_nocode)) THEN
      RAISE EXCEPTION 'F1-6b part 5 proof: a scratch code (%, % or %) already exists', v_code, v_code2, v_nocode;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true), (v_code2, v_tag || '-2', true);
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_s, v_tag || '-s@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_c, v_tag || '-c@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_nf, v_tag || '-n@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-p@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_rl, v_tag || '-r@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    -- The scratch callers' own ceilings: no verdict below rests on the live dial's value (rule 30 scan, point 4).
    -- The capped holder's ceiling is 1, already spent in this window and the next (whichever the gate reads).
    INSERT INTO public.rate_overrides (user_id, action, max_count)
    SELECT u, d, 1000 FROM unnest(ARRAY[v_s, v_c, v_nf, v_plain, v_deact]) u, unnest(ARRAY['staff_config']) d;
    INSERT INTO public.rate_overrides (user_id, action, max_count)
    SELECT v_rl, d, 1 FROM unnest(ARRAY['staff_config']) d;
    FOR v_door IN SELECT unnest(ARRAY['staff_config']) LOOP
      SELECT r.window_seconds INTO STRICT v_window FROM public.rate_dials r WHERE r.action = v_door;
      v_start := to_timestamp(floor(extract(epoch FROM clock_timestamp()) / v_window) * v_window);
      INSERT INTO public.rate_limits (key, action, window_start, count)
      VALUES (v_rl::text, v_door, v_start, 1), (v_rl::text, v_door, v_start + make_interval(secs => v_window), 1);
    END LOOP;
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE (r.name, p.action) IN (('services', 'manage'));
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 1 THEN
      RAISE EXCEPTION 'F1-6b part 5 proof: a permission of services:manage is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_s, v_role, 'global'), (v_nf, v_role, 'global'), (v_deact, v_role, 'global'), (v_rl, v_role, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_c, v_role, 'country', v_code);
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_s, v_tag || '-f', 'totp', 'verified', now(), now()),
           (gen_random_uuid(), v_c, v_tag || '-f2', 'totp', 'verified', now(), now()),
           (gen_random_uuid(), v_rl, v_tag || '-f3', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_sess, v_s, now(), now(), 'aal2'), (v_sess2, v_c, now(), now(), 'aal2'), (v_sess3, v_rl, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess2, now(), now(), 'totp'),
           (gen_random_uuid(), v_sess3, now(), now(), 'totp');
    v_claims := jsonb_build_object(
      'none', '{}',
      'plain', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text,
      'deact', json_build_object('sub', v_deact::text, 'role', 'authenticated')::text,
      'nf', json_build_object('sub', v_nf::text, 'role', 'authenticated')::text,
      's', json_build_object('sub', v_s::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text,
      'c', json_build_object('sub', v_c::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess2::text)::text,
      'rl', json_build_object('sub', v_rl::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess3::text)::text);
    -- A scratch feature on, at no unit cost, with one million micro-dollars spent today; the job's pause, if any,
    -- parked inside the rollback.
    INSERT INTO public.ai_features (feature, enabled, unit, unit_cost_microusd) VALUES (v_feat, true, 'call', 0);
    INSERT INTO public.ai_spend_days (feature, day, calls, units, cost_microusd)
    VALUES (v_feat, (now() AT TIME ZONE 'utc')::date, 1, 1, 1000000);
    DELETE FROM public.job_pauses WHERE job = v_job;
    SELECT jsonb_object_agg(d, (SELECT coalesce(sum(r.count), 0) FROM public.door_refusals r
                                 WHERE r.day = current_date AND r.door = d))
      INTO v_base FROM unnest(ARRAY['admin_set_ai_feature', 'admin_job_resume']) d;

    -- (b) every refusal, each with its exact answer: the five gates per door, the global scope, then each door's own
    --     codes in its order (the job's after its dial).
    FOR v_who, v_call, v_want, v_status, v_spends IN
      SELECT * FROM (VALUES
      ('none', format('admin_set_ai_feature(%L, true, NULL, 0)', v_feat), 'notSignedIn', '401', false),
      ('plain', format('admin_set_ai_feature(%L, true, NULL, 0)', v_feat), 'permissionDenied', '403', false),
      ('deact', format('admin_set_ai_feature(%L, true, NULL, 0)', v_feat), 'accountDeactivated', '403', false),
      ('nf', format('admin_set_ai_feature(%L, true, NULL, 0)', v_feat), 'step-up required: no verified factor', 'P0009', false),
      ('rl', format('admin_set_ai_feature(%L, true, NULL, 0)', v_feat), 'rateLimited', '429', false),
      ('none', format('admin_job_resume(%L)', v_job), 'notSignedIn', '401', false),
      ('plain', format('admin_job_resume(%L)', v_job), 'permissionDenied', '403', false),
      ('deact', format('admin_job_resume(%L)', v_job), 'accountDeactivated', '403', false),
      ('nf', format('admin_job_resume(%L)', v_job), 'step-up required: no verified factor', 'P0009', false),
      ('rl', format('admin_job_resume(%L)', v_job), 'rateLimited', '429', false),
      ('c', format('admin_set_ai_feature(%L, true, NULL, 0)', v_feat), 'permissionDenied:scope', '403', false),
      ('c', format('admin_job_resume(%L)', v_job), 'permissionDenied:scope', '403', false),
      ('s', format('admin_set_ai_feature(%L, NULL, NULL, 0)', v_feat), 'badValue:enabled', '400', true),
      ('s', format('admin_set_ai_feature(%L, true, NULL, -1)', v_feat), 'badValue:unitCost', '400', true),
      ('s', format('admin_set_ai_feature(%L, true, -1, 0)', v_feat), 'badValue:budget', '400', true),
      ('s', format('admin_set_ai_feature(%L, true, NULL, 0)', 'e2e-mig-none-' || v_stem), 'unknownFeature', '400', true),
      ('s', format('admin_set_ai_feature(%L, true, 1, 0)', v_feat), 'overBudget', '400', true),
      ('s', format('admin_job_resume(%L)', 'bogus'), 'badValue:job', '400', true)
      ) AS t(who, call, want, status, spends)
    LOOP
      PERFORM set_config('request.jwt.claims', v_claims ->> v_who, true);
      PERFORM set_config('response.status', '', true);
      BEGIN
        EXECUTE 'SELECT public.' || v_call INTO v_answer;
        v_got := v_answer ->> 'message';
        v_st := current_setting('response.status', true);
      EXCEPTION WHEN SQLSTATE 'P0009' OR SQLSTATE 'P0D01' OR SQLSTATE 'P0001' THEN
        GET STACKED DIAGNOSTICS v_got = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      IF (v_got, v_st) IS DISTINCT FROM (v_want, v_status) THEN
        RAISE EXCEPTION 'F1-6b part 5 proof (b): % as % answered % (%), not % (%)', v_call, v_who, v_got, v_st,
          v_want, v_status;
      END IF;
      IF v_spends THEN
        v_spent := v_spent || jsonb_build_object(v_who, coalesce((v_spent ->> v_who)::integer, 0) + 1);
      END IF;
      IF v_st IN ('400', '401', '403', '429') THEN
        v_door := split_part(v_call, '(', 1);
        v_met := v_met || jsonb_build_object(v_door, coalesce((v_met ->> v_door)::integer, 0) + 1);
      END IF;
    END LOOP;

    -- (c) a refused call wrote nothing.
    IF (SELECT NOT enabled OR unit_cost_microusd <> 0 OR monthly_budget_cents IS NOT NULL
          FROM public.ai_features WHERE feature = v_feat)
       OR EXISTS (SELECT 1 FROM public.job_pauses WHERE job = v_job)
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_s, v_c, v_nf, v_plain, v_deact, v_rl)) THEN
      RAISE EXCEPTION 'F1-6b part 5 proof (c): a refused call wrote a row';
    END IF;

    -- (d) the global holder switches the feature off with a budget; resumes a job that is not paused (the returned
    --     answer, no write), then a paused one.
    PERFORM set_config('request.jwt.claims', v_claims ->> 's', true);
    v_answer := public.admin_set_ai_feature(v_feat, false, 500, 3);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'feature', v_feat, 'on', false, 'off_reason', 'staff',
                                                    'monthly_budget_cents', 500, 'unit_cost_microusd', 3,
                                                    'alert_level', 0) THEN
      RAISE EXCEPTION 'F1-6b part 5 proof (d): the switch answered %', v_answer;
    END IF;
    v_spent := v_spent || jsonb_build_object('s', coalesce((v_spent ->> 's')::integer, 0) + 1);
    v_answer := public.admin_job_resume(v_job);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', false, 'reason', 'notPaused') THEN
      RAISE EXCEPTION 'F1-6b part 5 proof (d): resuming a running job answered %', v_answer;
    END IF;
    v_spent := v_spent || jsonb_build_object('s', coalesce((v_spent ->> 's')::integer, 0) + 1);
    INSERT INTO public.job_pauses (job, reason, since) VALUES (v_job, 'credits', now());
    v_answer := public.admin_job_resume(v_job);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true) THEN
      RAISE EXCEPTION 'F1-6b part 5 proof (d): resuming the paused job answered %', v_answer;
    END IF;
    v_spent := v_spent || jsonb_build_object('s', coalesce((v_spent ->> 's')::integer, 0) + 1);
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.job_pauses WHERE job = v_job)
       OR (SELECT array_agg(action ORDER BY action) FROM public.audit_log WHERE actor_id = v_s)
            IS DISTINCT FROM ARRAY['ai.feature_set', 'job.resumed']
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_c, v_nf, v_plain, v_deact, v_rl)) THEN
      RAISE EXCEPTION 'F1-6b part 5 proof (d): the pause outlived its resume, or the audit lines differ';
    END IF;

    -- (e) the dial and the meter.
    FOREACH v_who IN ARRAY ARRAY['s', 'c'] LOOP
      SELECT coalesce(sum(l.count), 0)::integer INTO v_count FROM public.rate_limits l
       WHERE l.key = CASE v_who WHEN 's' THEN v_s ELSE v_c END::text AND l.action = 'staff_config';
      IF v_count IS DISTINCT FROM coalesce((v_spent ->> v_who)::integer, 0) THEN
        RAISE EXCEPTION 'F1-6b part 5 proof (e): staff_config counted % for %, expected %', v_count, v_who, v_spent ->> v_who;
      END IF;
    END LOOP;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_nf::text, v_plain::text, v_deact::text))
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_s::text, v_c::text) AND action <> 'staff_config') THEN
      RAISE EXCEPTION 'F1-6b part 5 proof (e): a caller the gate refused, or another dial, was counted';
    END IF;
    FOREACH v_door IN ARRAY ARRAY['admin_set_ai_feature', 'admin_job_resume'] LOOP
      IF (SELECT coalesce(sum(r.count), 0) FROM public.door_refusals r WHERE r.day = current_date AND r.door = v_door)
         IS DISTINCT FROM (v_base ->> v_door)::numeric + coalesce((v_met ->> v_door)::integer, 0) THEN
        RAISE EXCEPTION 'F1-6b part 5 proof (e): door_refusals did not meter %''s % refusals', v_door, v_met ->> v_door;
      END IF;
    END LOOP;

    RAISE EXCEPTION 'f1-6b-part-5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6b-part-5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('response.status', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119050400') ON CONFLICT DO NOTHING;
