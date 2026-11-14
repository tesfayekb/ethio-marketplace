-- e2e-areas: admin-audit, door-refusals
-- Foundations 1, turn F1-2, part 4 of 5 — THE IMPERSONATION DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-2.md; ruling 1 decisions 2, 4 and 5; view-as v2, DEC-373, rebuilds them later).
-- begin_impersonation and end_impersonation are redeclared WHOLE from their last declarations (live md5 checked),
-- their gates replaced by ONE door_context call that spends the manifest's dial impersonation, their refusal
-- sentences by door_refuse codes, and each takes the shell; get_active_impersonation, a signed-in reader, takes
-- door_context('reader') and keeps its return type. begin_impersonation returned a table and end_impersonation void:
-- DROP + CREATE as RETURNS jsonb, grants restated. begin_impersonation's super-admin rule is now its permission:
-- impersonation:use is reached by no role but super_admin and is assignable to none (the pre-check asserts it), and
-- door_context passes a super admin on every permission. The gate order is door_context's (permission → step-up →
-- dial, then the door's own checks), so a refused begin spends the dial (INC-844's count). Audit stays log_audit.
-- Folds: 'impersonation is super-admin only' → permissionDenied; 'cannot impersonate yourself' → impersonateSelf;
-- 'cannot impersonate a super admin' → impersonateSuperAdmin; 'user not found' → unknownUser; 'a reason of at least 5
-- characters is required' → badLength:reason; 'an impersonation session is already active' → sessionActive;
-- 'rateLimited' → door_context; 'account is deactivated' → accountDeactivated; 'no active impersonation session' →
-- noActiveSession. Proofs on scratch rows under a sentinel rollback. Law 11, law 12, law 13, law 14, CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.begin_impersonation(uuid,text)', '17dc83839234800e063c63daf2c13eff'],
    ['public.end_impersonation(uuid)', '7e7fba195064fb0303cff2b4d832d5fa'],
    ['public.get_active_impersonation()', 'c8b8863e56899e153d8e738416522cca']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114090200')
     OR (SELECT prorettype FROM pg_proc WHERE oid = 'public.admin_update_profile(uuid,text,text,character,text)'::regprocedure) <> 'jsonb'::regtype THEN
    RAISE EXCEPTION 'F1-2 part 4: part 3 (76ce28de) must be applied first';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'impersonation') THEN
    RAISE EXCEPTION 'F1-2 part 4: the dial impersonation is missing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
                  WHERE r.name = 'impersonation' AND p.action = 'use' AND NOT p.assignable)
     OR EXISTS (SELECT 1 FROM public.roles ro
                 WHERE ro.name <> 'super_admin'
                   AND EXISTS (SELECT 1 FROM public.role_permissions rp
                                 JOIN public.permissions p ON p.id = rp.permission_id
                                 JOIN public.resources r ON r.id = p.resource_id
                                WHERE rp.role_id IN (SELECT public.get_role_hierarchy(ro.id))
                                  AND r.name = 'impersonation' AND p.action IN ('use', 'manage'))) THEN
    RAISE EXCEPTION 'F1-2 part 4: impersonation:use is assignable or reached by a role other than super_admin';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-2 part 4: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. begin_impersonation (whole from 20261028230748 :156; table → jsonb)
DROP FUNCTION public.begin_impersonation(uuid, text);
CREATE FUNCTION public.begin_impersonation(p_target uuid, p_reason text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_ctx public.door_ctx; v_reason text; v_id uuid; v_expires timestamptz;
BEGIN
  -- impersonation:use is reached by no role but super_admin and assignable to none: the permission is the
  -- super-admin rule.
  v_ctx := public.door_context('staff', 'impersonation', 'use', 'impersonation', NULL, 'global');
  IF p_target = auth.uid() THEN PERFORM public.door_refuse('impersonateSelf'); END IF;
  IF public.is_super_admin(p_target) THEN PERFORM public.door_refuse('impersonateSuperAdmin'); END IF;
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = p_target) THEN
    PERFORM public.door_refuse('unknownUser');
  END IF;

  v_reason := btrim(COALESCE(p_reason, ''));
  IF length(v_reason) < 5 THEN PERFORM public.door_refuse('badLength', 'reason'); END IF;

  IF EXISTS (SELECT 1 FROM public.impersonation_sessions s
              WHERE s.actor_id = auth.uid() AND s.ended_at IS NULL AND s.expires_at > now()) THEN
    PERFORM public.door_refuse('sessionActive');
  END IF;

  v_expires := now() + interval '15 minutes';
  INSERT INTO public.impersonation_sessions (actor_id, target_id, reason, expires_at)
  VALUES (auth.uid(), p_target, v_reason, v_expires)
  RETURNING id INTO v_id;

  PERFORM public.log_audit('impersonation.start', 'impersonation_sessions', v_id::text,
    jsonb_build_object('actor', auth.uid(), 'target', p_target, 'reason', v_reason,
                       'expires_at', v_expires));

  RETURN jsonb_build_object('ok', true, 'session_id', v_id, 'expires_at', v_expires);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('begin_impersonation', 'impersonation', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.begin_impersonation(uuid, text) IS
  'F1-2 on the door shell (DEC-333): opens a 15-minute read-only impersonation session behind door_context(staff, impersonation:use — super admins only, step-up, dial impersonation, global); refuses impersonateSelf / impersonateSuperAdmin / unknownUser / badLength:reason / sessionActive; audits impersonation.start; answers {ok:true, session_id, expires_at}.';
REVOKE ALL ON FUNCTION public.begin_impersonation(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.begin_impersonation(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.begin_impersonation(uuid, text) TO service_role;

-- ------------------------------------------------------------ 2. end_impersonation (whole from 20261023100132 :386; void → jsonb)
DROP FUNCTION public.end_impersonation(uuid);
CREATE FUNCTION public.end_impersonation(p_session uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_ctx public.door_ctx; v_row public.impersonation_sessions%ROWTYPE;
BEGIN
  v_ctx := public.door_context('owner', NULL, NULL, 'impersonation');
  SELECT * INTO v_row FROM public.impersonation_sessions
   WHERE id = p_session AND actor_id = auth.uid() AND ended_at IS NULL;
  IF NOT FOUND THEN PERFORM public.door_refuse('noActiveSession'); END IF;

  UPDATE public.impersonation_sessions
     SET ended_at = now(), ended_reason = 'manual'
   WHERE id = p_session;

  PERFORM public.log_audit('impersonation.end', 'impersonation_sessions', p_session::text,
    jsonb_build_object('actor', v_row.actor_id, 'target', v_row.target_id, 'reason', 'manual'));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('end_impersonation', 'impersonation', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.end_impersonation(uuid) IS
  'F1-2 on the door shell (DEC-333): ends the caller''s own open impersonation session behind door_context(owner, dial impersonation); refuses noActiveSession; audits impersonation.end; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.end_impersonation(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.end_impersonation(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.end_impersonation(uuid) TO service_role;

-- ------------------------------------------------------------ 3. get_active_impersonation (whole from 20260822073000 :202; a reader)
CREATE OR REPLACE FUNCTION public.get_active_impersonation()
RETURNS TABLE(id uuid, target_id uuid, target_name text, expires_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  PERFORM public.door_context('reader');
  RETURN QUERY
  SELECT s.id, s.target_id, pr.display_name, s.expires_at
  FROM public.impersonation_sessions s
  LEFT JOIN public.profiles pr ON pr.user_id = s.target_id
  WHERE s.actor_id = auth.uid() AND s.ended_at IS NULL AND s.expires_at > now()
  ORDER BY s.started_at DESC LIMIT 1;
END $$;
COMMENT ON FUNCTION public.get_active_impersonation() IS
  'F1-2 (DEC-333): the caller''s own open impersonation session (none, or one row) behind door_context(reader); a caller with no session id is refused notSignedIn, a deactivated one accountDeactivated.';
REVOKE ALL ON FUNCTION public.get_active_impersonation() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) catalog facts: the doors VOLATILE and RETURNS jsonb, the reader STABLE; all SECURITY DEFINER with search_path
--     public, EXECUTE for authenticated and service_role and not for anon or PUBLIC, the bodies this file's (md5).
-- (b) the gates: a deactivated account → accountDeactivated on both doors and the reader; a staff member who
--     is not a super admin → permissionDenied (403) on begin; no caller → notSignedIn on the reader; none spends the
--     dial or opens a session.
-- (c) the codes, every earlier check cleared (law 14): impersonateSelf, impersonateSuperAdmin, unknownUser,
--     badLength:reason, then a session (its row, audit and answer), sessionActive; the reader returns it; end refuses
--     noActiveSession for another id, ends the session (row and audit), refuses it a second time; the reader then
--     returns nothing; the dial counted once per call past the gates; the refusals metered.
DO $proof$
DECLARE
  v_tag     text := 'e2e-mig-f12i-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 10);
  v_super   uuid := gen_random_uuid();
  v_super2  uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_staff   uuid := gen_random_uuid();
  v_target  uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess_d  uuid := gen_random_uuid();
  v_role_s  uuid;
  v_answer  jsonb;
  v_count   integer;
  v_id      uuid;
  v_got     uuid;
  v_tid     uuid;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  -- (a)
  v_pairs := ARRAY[
    ['public.begin_impersonation(uuid,text)', '71d3951ce07aef565bb0ab763cd7cf53', 'v'],
    ['public.end_impersonation(uuid)', 'a137b26ca25c398eef75a5f44b53b4dc', 'v'],
    ['public.get_active_impersonation()', '20c2194b0746f0634601948f5f791cec', 's']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile::text <> v_pairs[i][3] OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (a): %''s header or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  IF (SELECT prorettype FROM pg_proc WHERE oid = 'public.begin_impersonation(uuid,text)'::regprocedure) <> 'jsonb'::regtype
     OR (SELECT prorettype FROM pg_proc WHERE oid = 'public.end_impersonation(uuid)'::regprocedure) <> 'jsonb'::regtype THEN
    RAISE EXCEPTION 'F1-2 part 4 proof (a): a door''s return type is not jsonb';
  END IF;

  BEGIN
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_super,  v_tag || '-super@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_super2, v_tag || '-super2@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact,  v_tag || '-deact@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_staff,  v_tag || '-staff@example.invalid',  NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_target, v_tag || '-target@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT u, r.id, 'global' FROM public.roles r, unnest(ARRAY[v_super, v_super2]) u WHERE r.name = 'super_admin';
    IF NOT public.is_super_admin(v_super) OR NOT public.is_super_admin(v_super2) THEN
      RAISE EXCEPTION 'F1-2 part 4 proof: the scratch super admins did not take the role';
    END IF;
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    -- a staff member who is not a super admin, stepped up on its own permission (profiles:update)
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role_s;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_s, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'profiles' AND p.action = 'update';
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_s, 'global');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_super, v_deact, v_staff]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_super, now(), now(), 'aal2'), (v_sess_d, v_deact, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess_d, now(), now(), 'totp');

    -- (b) the gates
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_d::text)::text, true);
    v_answer := public.begin_impersonation(v_target, 'e2e reason');
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (b): a deactivated caller''s begin answered %', v_answer;
    END IF;
    v_answer := public.end_impersonation(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (b): a deactivated caller''s end answered %', v_answer;
    END IF;
    v_msg := NULL;
    BEGIN
      SELECT g.id INTO v_got FROM public.get_active_impersonation() g;
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    END;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'impersonation';
    IF v_msg IS DISTINCT FROM 'accountDeactivated' OR v_count <> 0 THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (b): a deactivated caller''s read answered % (count %)', v_msg, v_count;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
    v_answer := public.begin_impersonation(v_target, 'e2e reason');
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'impersonation';
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403'
       OR v_count <> 0 OR EXISTS (SELECT 1 FROM public.impersonation_sessions s WHERE s.actor_id = v_staff) THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (b): a staff member who is not a super admin answered % (count %)', v_answer, v_count;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_msg := NULL;
    BEGIN
      SELECT g.id INTO v_got FROM public.get_active_impersonation() g;
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    END;
    IF v_msg IS DISTINCT FROM 'notSignedIn' THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (b): a read with no caller answered %', coalesce(v_msg, 'rows');
    END IF;

    -- (c) the super admin, stepped up
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('begin_impersonation', 'end_impersonation');
    v_answer := public.begin_impersonation(v_super, 'e2e reason');
    IF v_answer ->> 'message' IS DISTINCT FROM 'impersonateSelf' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): a self target answered %', v_answer;
    END IF;
    v_answer := public.begin_impersonation(v_super2, 'e2e reason');
    IF v_answer ->> 'message' IS DISTINCT FROM 'impersonateSuperAdmin' THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): a super-admin target answered %', v_answer;
    END IF;
    v_answer := public.begin_impersonation(gen_random_uuid(), 'e2e reason');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownUser' THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): an unknown target answered %', v_answer;
    END IF;
    v_answer := public.begin_impersonation(v_target, ' abc ');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badLength:reason' OR EXISTS (SELECT 1 FROM public.impersonation_sessions s WHERE s.actor_id = v_super) THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): a short reason answered %', v_answer;
    END IF;
    v_answer := public.begin_impersonation(v_target, ' e2e reason ');
    v_id := (v_answer ->> 'session_id')::uuid;
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_answer ->> 'expires_at' IS NULL
       OR NOT EXISTS (SELECT 1 FROM public.impersonation_sessions s WHERE s.id = v_id AND s.actor_id = v_super AND s.target_id = v_target
                        AND s.reason = 'e2e reason' AND s.ended_at IS NULL AND s.expires_at = (v_answer ->> 'expires_at')::timestamptz)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_super AND a.action = 'impersonation.start' AND a.entity_id = v_id::text) THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): the begin answered %', v_answer;
    END IF;
    v_answer := public.begin_impersonation(v_target, 'e2e reason');
    IF v_answer ->> 'message' IS DISTINCT FROM 'sessionActive' THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): a second session answered %', v_answer;
    END IF;
    SELECT g.id, g.target_id INTO v_got, v_tid FROM public.get_active_impersonation() g;
    IF v_got IS DISTINCT FROM v_id OR v_tid IS DISTINCT FROM v_target THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): the reader returned % for %', v_got, v_id;
    END IF;
    v_answer := public.end_impersonation(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'noActiveSession' THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): ending another id answered %', v_answer;
    END IF;
    v_answer := public.end_impersonation(v_id);
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE
       OR NOT EXISTS (SELECT 1 FROM public.impersonation_sessions s WHERE s.id = v_id AND s.ended_at IS NOT NULL AND s.ended_reason = 'manual')
       OR NOT EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_super AND a.action = 'impersonation.end' AND a.entity_id = v_id::text) THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): the end answered %', v_answer;
    END IF;
    v_answer := public.end_impersonation(v_id);
    IF v_answer ->> 'message' IS DISTINCT FROM 'noActiveSession' THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): ending an ended session answered %', v_answer;
    END IF;
    v_got := NULL;
    SELECT g.id INTO v_got FROM public.get_active_impersonation() g;
    IF v_got IS NOT NULL THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): the reader still returned the ended session';
    END IF;
    -- the dial: 2 successes and 7 refusals past the gates, each counted once; 7 refusals metered
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_super::text AND action = 'impersonation';
    IF v_count <> 9 THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): the dial impersonation counted % of 9 calls', v_count;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('begin_impersonation', 'end_impersonation')) IS DISTINCT FROM v_refused + 7 THEN
      RAISE EXCEPTION 'F1-2 part 4 proof (c): door_refusals did not meter the 7 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f12p4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f12p4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261114090300') ON CONFLICT DO NOTHING;
