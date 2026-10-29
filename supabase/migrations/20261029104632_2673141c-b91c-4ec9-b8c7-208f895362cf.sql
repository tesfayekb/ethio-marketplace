-- N1b-3b M2 (INC-977, N1b-3 R5/R6): the staff queue of held seller names, and its Clear.
-- R5: admin_audit_facets reads its actions from audit_log itself (GROUP BY a.action), so the new
-- 'name_check.cleared' action needs no registration and no admin.audit.action.* key.
-- name_check_queue_page — the service-only core: one keyset page of 'imitates' rows, ordered by since,
-- then profile_id (subject is the one value 'alias', name_checks_subject_check). p_only scopes it to the
-- given profiles (the proof's own scratch rows, the house form for whole-table statements); the door
-- passes NULL. The name, the checked text and the model's reason travel only when p_show_names.
-- admin_name_check_list — the door: listings:view (the Screening page's gate); names and reasons only
-- with profiles:view as well (R6). admin_name_check_clear — gates (profiles:update → step-up) → capture
-- (the row FOR UPDATE: 'imitates' and the same text, else 'stale' and nothing written) → mutate ('clean';
-- the M1 trigger nulls imitates_of) → audit name_check.cleared (F5).

CREATE INDEX name_checks_imitates_since_idx ON public.name_checks (since, profile_id) WHERE state = 'imitates';

CREATE FUNCTION public.name_check_queue_page(p_after_since timestamp with time zone, p_after_profile uuid, p_limit integer, p_show_names boolean, p_only uuid[] DEFAULT NULL::uuid[])
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
    SELECT c.profile_id, c.subject, c.checked_text, c.imitates_of, c.since, c.attempts
      FROM public.name_checks c
     WHERE c.state = 'imitates'
       AND (p_only IS NULL OR c.profile_id = ANY (p_only))
       AND (p_after_since IS NULL OR (c.since, c.profile_id) > (p_after_since, p_after_profile))
     ORDER BY c.since, c.profile_id
     LIMIT p_limit
  )
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'profile_id', g.profile_id,
           'subject', g.subject,
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

CREATE FUNCTION public.admin_name_check_list(p_after_since timestamp with time zone DEFAULT NULL::timestamp with time zone, p_after_profile uuid DEFAULT NULL::uuid, p_limit integer DEFAULT 50)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'listings', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  RETURN public.name_check_queue_page(p_after_since, p_after_profile, p_limit,
                                      public.has_permission(auth.uid(), 'profiles', 'view'), NULL);
END $function$;
REVOKE ALL ON FUNCTION public.admin_name_check_list(timestamp with time zone, uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_name_check_list(timestamp with time zone, uuid, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_name_check_list(timestamp with time zone, uuid, integer) TO service_role;

CREATE FUNCTION public.admin_name_check_clear(p_profile uuid, p_subject text, p_text text, p_reason text DEFAULT NULL::text)
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
  IF NOT FOUND OR v_row.state IS DISTINCT FROM 'imitates' OR v_row.checked_text IS DISTINCT FROM v_text THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'stale');
  END IF;
  UPDATE public.name_checks SET state = 'clean', since = now()
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

-- PROOF (NCQ-9…12): its own scratch users only; the queue is read through the core scoped to them
-- (the door's allow path spans every row, so it is proved live by N1b-3c's E2E, never here); mutation
-- and readback in separate statements; rolled back whole, raising on failure.
DO $proof$
DECLARE
  v_hex   text := replace(gen_random_uuid()::text, '-', '');
  v_tag   text := 'e2e-mig-n1b3m2-' || substr(v_hex, 1, 12);
  v_u1    uuid := gen_random_uuid();
  v_u2    uuid := gen_random_uuid();
  v_s     uuid := gen_random_uuid();
  v_role  uuid := gen_random_uuid();
  v_sess  uuid := gen_random_uuid();
  v_a1    text := 'qz' || translate(substr(v_hex, 1, 10), '0123456789', 'ghijkmnopr');
  v_a2    text := 'qy' || translate(substr(v_hex, 11, 10), '0123456789', 'ghijkmnopr');
  v_lang  text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
  v_r     jsonb;
  v_n     integer;
  v_audit integer;
  v_refused boolean;
BEGIN
 BEGIN
  INSERT INTO auth.users(id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
    (v_u1, v_tag || '-1@example.invalid', '{}', 'authenticated', 'authenticated', now(), now()),
    (v_u2, v_tag || '-2@example.invalid', '{}', 'authenticated', 'authenticated', now(), now()),
    (v_s,  v_tag || '-s@example.invalid', '{}', 'authenticated', 'authenticated', now(), now());
  INSERT INTO public.legal_acceptances(user_id, version_id, language, method)
  SELECT u, v.id, v_lang, v_tag FROM public.legal_versions v, unnest(ARRAY[v_u1, v_u2]) u
   WHERE v.status = 'published' AND v.effective_at <= now();
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_u1, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u1::text, true);
  v_r := public.save_posting_identity(p_alias => v_a1);
  IF (v_r->>'ok')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'NCQ setup 1: %', v_r; END IF;
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_u2, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u2::text, true);
  v_r := public.save_posting_identity(p_alias => v_a2);
  IF (v_r->>'ok')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'NCQ setup 2: %', v_r; END IF;
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);
  IF public.name_check_mark(v_u1, 'alias', v_a1, 'imitates', 'Ethio Telecom') IS NOT TRUE
     OR public.name_check_mark(v_u2, 'alias', v_a2, 'imitates') IS NOT TRUE THEN RAISE EXCEPTION 'NCQ setup marks'; END IF;
  UPDATE public.name_checks SET since = now() - interval '2 hours' WHERE profile_id = v_u1;
  UPDATE public.name_checks SET since = now() - interval '1 hour' WHERE profile_id = v_u2;

  -- NCQ-9: the core's page — oldest first, keyset continues, names and reasons only when shown.
  v_r := public.name_check_queue_page(NULL, NULL, 1, true, ARRAY[v_u1, v_u2]);
  IF jsonb_array_length(v_r->'rows') <> 1 OR (v_r#>>'{rows,0,profile_id}')::uuid <> v_u1
     OR v_r#>>'{rows,0,name}' IS DISTINCT FROM v_a1 OR v_r#>>'{rows,0,checked_text}' IS DISTINCT FROM v_a1
     OR v_r#>>'{rows,0,of}' IS DISTINCT FROM 'Ethio Telecom' OR (v_r#>>'{rows,0,name_hidden}')::boolean
     OR (v_r#>>'{next,profile_id}')::uuid IS DISTINCT FROM v_u1 THEN RAISE EXCEPTION 'NCQ-9 first page: %', v_r; END IF;
  v_r := public.name_check_queue_page((v_r#>>'{next,since}')::timestamptz, (v_r#>>'{next,profile_id}')::uuid, 1, true, ARRAY[v_u1, v_u2]);
  IF jsonb_array_length(v_r->'rows') <> 1 OR (v_r#>>'{rows,0,profile_id}')::uuid <> v_u2
     OR (v_r->'rows'->0->'of') <> 'null'::jsonb THEN RAISE EXCEPTION 'NCQ-9 second page: %', v_r; END IF;
  v_r := public.name_check_queue_page((v_r#>>'{next,since}')::timestamptz, (v_r#>>'{next,profile_id}')::uuid, 1, true, ARRAY[v_u1, v_u2]);
  IF jsonb_array_length(v_r->'rows') <> 0 OR (v_r->'next') <> 'null'::jsonb THEN RAISE EXCEPTION 'NCQ-9 end: %', v_r; END IF;
  v_r := public.name_check_queue_page(NULL, NULL, 10, false, ARRAY[v_u1, v_u2]);
  IF jsonb_array_length(v_r->'rows') <> 2 OR (v_r->'next') <> 'null'::jsonb
     OR (v_r->'rows'->0->'name') <> 'null'::jsonb OR (v_r->'rows'->0->'checked_text') <> 'null'::jsonb
     OR (v_r->'rows'->0->'of') <> 'null'::jsonb OR NOT (v_r#>>'{rows,0,name_hidden}')::boolean
  THEN RAISE EXCEPTION 'NCQ-9 hidden: %', v_r; END IF;
  -- A 'clean' or 'unchecked' row is never listed.
  UPDATE public.name_checks SET state = 'clean' WHERE profile_id = v_u2;
  v_r := public.name_check_queue_page(NULL, NULL, 10, true, ARRAY[v_u1, v_u2]);
  IF jsonb_array_length(v_r->'rows') <> 1 THEN RAISE EXCEPTION 'NCQ-9 clean listed: %', v_r; END IF;
  UPDATE public.name_checks SET state = 'imitates' WHERE profile_id = v_u2;
  -- Bad bounds are refused.
  v_refused := false;
  BEGIN PERFORM public.name_check_queue_page(NULL, NULL, 101, true, ARRAY[v_u1]);
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:limit' THEN RAISE; END IF; v_refused := true; END;
  IF NOT v_refused THEN RAISE EXCEPTION 'NCQ-9 limit'; END IF;
  v_refused := false;
  BEGIN PERFORM public.name_check_queue_page(now(), NULL, 10, true, ARRAY[v_u1]);
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:after' THEN RAISE; END IF; v_refused := true; END;
  IF NOT v_refused THEN RAISE EXCEPTION 'NCQ-9 after'; END IF;

  -- NCQ-10 (deny): without listings:view the list is refused before any read; without profiles:update
  -- Clear is refused and nothing changes.
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_s, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_s::text, true);
  v_refused := false;
  BEGIN PERFORM public.admin_name_check_list();
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'permission denied' THEN RAISE; END IF; v_refused := true; END;
  IF NOT v_refused THEN RAISE EXCEPTION 'NCQ-10 list deny'; END IF;
  v_refused := false;
  BEGIN PERFORM public.admin_name_check_clear(v_u1, 'alias', v_a1, 'staff review');
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'permission denied' THEN RAISE; END IF; v_refused := true; END;
  IF NOT v_refused THEN RAISE EXCEPTION 'NCQ-10 clear deny'; END IF;
  SELECT count(*) INTO v_audit FROM public.audit_log WHERE action = 'name_check.cleared' AND entity_id IN (v_u1::text, v_u2::text);
  IF (SELECT state FROM public.name_checks WHERE profile_id = v_u1) IS DISTINCT FROM 'imitates' OR v_audit <> 0
  THEN RAISE EXCEPTION 'NCQ-10 trace'; END IF;

  -- NCQ-11 (step-up): profiles:update without a fresh second factor is refused, and nothing changes.
  INSERT INTO public.roles(id, name) VALUES (v_role, v_tag);
  INSERT INTO public.role_permissions(role_id, permission_id)
  SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
   WHERE (r.name = 'profiles' AND p.action = 'update');
  INSERT INTO public.user_roles(user_id, role_id, scope_type) VALUES (v_s, v_role, 'global');
  v_refused := false;
  BEGIN PERFORM public.admin_name_check_clear(v_u1, 'alias', v_a1, 'staff review');
  EXCEPTION WHEN OTHERS THEN IF SQLSTATE <> 'P0009' THEN RAISE; END IF; v_refused := true; END;
  IF NOT v_refused THEN RAISE EXCEPTION 'NCQ-11 step-up absent'; END IF;
  SELECT count(*) INTO v_audit FROM public.audit_log WHERE action = 'name_check.cleared' AND entity_id IN (v_u1::text, v_u2::text);
  IF (SELECT state FROM public.name_checks WHERE profile_id = v_u1) IS DISTINCT FROM 'imitates' OR v_audit <> 0
  THEN RAISE EXCEPTION 'NCQ-11 trace'; END IF;

  -- NCQ-12: with a fresh scratch TOTP session — a stale text writes nothing; the right text clears,
  -- nulls the reason, audits once with the old state and reason; a second Clear is stale.
  INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_s, now(), now(), 'aal2');
  INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status, created_at, updated_at)
  VALUES (gen_random_uuid(), v_s, v_tag, 'totp', 'verified', now(), now());
  INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
  VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_s, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess)::text, true);
  v_r := public.admin_name_check_clear(v_u1, 'alias', v_a1 || 'x', 'staff review');
  IF v_r IS DISTINCT FROM '{"ok": false, "reason": "stale"}'::jsonb THEN RAISE EXCEPTION 'NCQ-12 stale: %', v_r; END IF;
  SELECT count(*) INTO v_audit FROM public.audit_log WHERE action = 'name_check.cleared' AND entity_id IN (v_u1::text, v_u2::text);
  IF (SELECT state FROM public.name_checks WHERE profile_id = v_u1) IS DISTINCT FROM 'imitates' OR v_audit <> 0
  THEN RAISE EXCEPTION 'NCQ-12 stale trace'; END IF;
  v_r := public.admin_name_check_clear(v_u1, 'alias', upper(v_a1) || ' ', '  staff review  ');
  IF v_r IS DISTINCT FROM '{"ok": true}'::jsonb THEN RAISE EXCEPTION 'NCQ-12 clear: %', v_r; END IF;
  IF (SELECT state FROM public.name_checks WHERE profile_id = v_u1) IS DISTINCT FROM 'clean'
     OR (SELECT imitates_of FROM public.name_checks WHERE profile_id = v_u1) IS NOT NULL
     OR (SELECT state FROM public.name_checks WHERE profile_id = v_u2) IS DISTINCT FROM 'imitates'
  THEN RAISE EXCEPTION 'NCQ-12 readback'; END IF;
  SELECT count(*) INTO v_audit FROM public.audit_log
   WHERE action = 'name_check.cleared' AND entity_type = 'profiles' AND entity_id = v_u1::text AND actor_id = v_s
     AND meta = jsonb_build_object('subject', 'alias', 'text', v_a1,
                                   'old', jsonb_build_object('state', 'imitates', 'of', 'Ethio Telecom'),
                                   'new', jsonb_build_object('state', 'clean'), 'reason', 'staff review');
  IF v_audit <> 1 THEN RAISE EXCEPTION 'NCQ-12 audit %', v_audit; END IF;
  v_r := public.admin_name_check_clear(v_u1, 'alias', v_a1, 'again');
  IF v_r IS DISTINCT FROM '{"ok": false, "reason": "stale"}'::jsonb THEN RAISE EXCEPTION 'NCQ-12 twice: %', v_r; END IF;
  SELECT count(*) INTO v_n FROM public.audit_log WHERE action = 'name_check.cleared' AND entity_id = v_u1::text;
  IF v_n <> 1 THEN RAISE EXCEPTION 'NCQ-12 second audit'; END IF;
  -- The public reads show the cleared name again (seller_public_alias), and still hold the other.
  IF public.seller_public_alias(v_u1) IS DISTINCT FROM v_a1 OR public.seller_public_alias(v_u2) IS NOT NULL
  THEN RAISE EXCEPTION 'NCQ-12 public'; END IF;
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);

  -- NCQ-13: headers and closers read back.
  IF has_function_privilege('anon', 'public.name_check_queue_page(timestamptz, uuid, integer, boolean, uuid[])', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.name_check_queue_page(timestamptz, uuid, integer, boolean, uuid[])', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_name_check_list(timestamptz, uuid, integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_name_check_list(timestamptz, uuid, integer)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_name_check_clear(uuid, text, text, text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_name_check_clear(uuid, text, text, text)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.admin_name_check_clear(uuid, text, text, text)', 'EXECUTE')
     OR (SELECT prosecdef FROM pg_proc WHERE oid = 'public.name_check_queue_page(timestamptz, uuid, integer, boolean, uuid[])'::regprocedure)
     OR NOT (SELECT prosecdef FROM pg_proc WHERE oid = 'public.admin_name_check_list(timestamptz, uuid, integer)'::regprocedure)
     OR NOT (SELECT prosecdef FROM pg_proc WHERE oid = 'public.admin_name_check_clear(uuid, text, text, text)'::regprocedure)
  THEN RAISE EXCEPTION 'NCQ-13 acl'; END IF;
  RAISE EXCEPTION 'M2 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M2 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id IN (v_u1, v_u2, v_s) AND email LIKE 'e2e-mig-%') OR EXISTS (SELECT 1 FROM public.roles WHERE id = v_role)
    OR EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id IN (v_u1, v_u2))
    OR EXISTS (SELECT 1 FROM public.audit_log WHERE entity_id IN (v_u1::text, v_u2::text)) THEN
   RAISE EXCEPTION 'M2 rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES ('20261030033000');