-- e2e-areas: admin-roles

-- Cursor bundle 8b, Part 1, file B of two — OUR OWN ERROR REPORTS: THE PERMISSION AND THE THREE STAFF READERS (DEC-474
-- Part F; brief docs/governance/briefs/cursor-bundle-8b.md STEP 2). File A (the table, the write, the cores, the erase) is
-- applied first.
--   1. The resource errors with its permission view (no second factor, assignable), granted to the admin role (DEC-474);
--      a super admin holds it by is_super_admin, as every permission.
--   2. admin_error_groups(integer,text), admin_error_occurrences(text,timestamptz,uuid,integer), admin_error_stats(integer)
--      — staff readers on door_context in the global form (no second factor, no dial: a read changes nothing; the house
--      form of every staff read, F1-6b part 6), each refusing by door_refuse (a reader's refusal is raised, F1-7c) and then
--      reading through file A's core with no id scope. Their own code is badValue (days, kind, group, limit, cursor).
-- Proofs on scratch rows under a sentinel rollback.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261127010000') THEN
    RAISE EXCEPTION 'cursor-bundle-8b part 1 file B: the mark 20261127010000 (file A) must be applied first';
  END IF;
  IF EXISTS (SELECT 1 FROM public.resources WHERE name = 'errors') THEN
    RAISE EXCEPTION 'cursor-bundle-8b part 1 file B: the resource errors already exists';
  END IF;
  -- K4, named: the role DEC-474 grants the permission to; no SQL constants function exists (cursor-bundle-6's note).
  IF NOT EXISTS (SELECT 1 FROM public.roles WHERE name = 'admin') THEN
    RAISE EXCEPTION 'cursor-bundle-8b part 1 file B: the admin role is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. the permission (DEC-474)
INSERT INTO public.resources (name, display_name, description)
VALUES ('errors', 'Error reports', 'Failures in the field, cleaned and grouped (DEC-474)')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.permissions (resource_id, action, description, requires_step_up, assignable)
SELECT r.id, 'view', 'Read the error reports', false, true FROM public.resources r WHERE r.name = 'errors'
ON CONFLICT (resource_id, action) DO NOTHING;

-- K4, named: the admin role (DEC-474), as in the pre-check above.
INSERT INTO public.role_permissions (role_id, permission_id, is_core)
SELECT ro.id, p.id, false
  FROM public.roles ro
  JOIN public.resources r ON r.name = 'errors'
  JOIN public.permissions p ON p.resource_id = r.id AND p.action = 'view'
 WHERE ro.name = 'admin'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- ------------------------------------------------------------ 2. the three staff readers
CREATE FUNCTION public.admin_error_groups(p_days integer DEFAULT 7, p_kind text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $door$
BEGIN
  PERFORM public.door_context('staff-reader', 'errors', 'view', NULL, NULL, 'global');
  IF p_days IS NULL OR p_days < 1 OR p_days > 366 THEN PERFORM public.door_refuse('badValue', 'days'); END IF;
  IF p_kind IS NOT NULL AND NOT (p_kind = ANY (public.error_report_kinds())) THEN
    PERFORM public.door_refuse('badValue', 'kind');
  END IF;
  RETURN public.error_groups_core(p_days, p_kind, NULL);
END $door$;
COMMENT ON FUNCTION public.admin_error_groups(integer, text) IS
  'DEC-474 Part F: the error groups of the last p_days days (1 to 366), of one kind or all — per group its kind, code, shape, place, count, first and last seen in the window; the 200 last seen, with more when there are others. errors:view.';
REVOKE ALL ON FUNCTION public.admin_error_groups(integer, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_error_groups(integer, text) TO authenticated, service_role;

CREATE FUNCTION public.admin_error_occurrences(p_group text, p_before_at timestamptz DEFAULT NULL,
                                               p_before_id uuid DEFAULT NULL, p_limit integer DEFAULT 50)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $door$
BEGIN
  PERFORM public.door_context('staff-reader', 'errors', 'view', NULL, NULL, 'global');
  IF p_group IS NULL OR p_group !~ '^[0-9a-f]{32}$' THEN PERFORM public.door_refuse('badValue', 'group'); END IF;
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 100 THEN PERFORM public.door_refuse('badValue', 'limit'); END IF;
  IF (p_before_at IS NULL) <> (p_before_id IS NULL) THEN PERFORM public.door_refuse('badValue', 'cursor'); END IF;
  RETURN public.error_occurrences_core(p_group, p_before_at, p_before_id, p_limit, NULL);
END $door$;
COMMENT ON FUNCTION public.admin_error_occurrences(text, timestamp with time zone, uuid, integer) IS
  'DEC-474 Part F: one group''s reports, newest first, a keyset page of p_limit (1 to 100) before (p_before_at, p_before_id); next is the page''s last {at, id} or null. errors:view.';
REVOKE ALL ON FUNCTION public.admin_error_occurrences(text, timestamp with time zone, uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_error_occurrences(text, timestamp with time zone, uuid, integer) TO authenticated, service_role;

CREATE FUNCTION public.admin_error_stats(p_days integer DEFAULT 7)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $door$
BEGIN
  PERFORM public.door_context('staff-reader', 'errors', 'view', NULL, NULL, 'global');
  IF p_days IS NULL OR p_days < 1 OR p_days > 366 THEN PERFORM public.door_refuse('badValue', 'days'); END IF;
  RETURN public.error_stats_core(p_days, NULL);
END $door$;
COMMENT ON FUNCTION public.admin_error_stats(integer) IS
  'DEC-474 Part F: the last p_days days (1 to 366) of reports — counts per day (UTC) by kind, and the ten top pages, browsers (with version) and app versions. errors:view.';
REVOKE ALL ON FUNCTION public.admin_error_stats(integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_error_stats(integer) TO authenticated, service_role;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) the readers SECURITY DEFINER, STABLE, search_path public, jsonb, executed by authenticated and the service role,
--       never PUBLIC or anon; the permission without a second factor, assignable, held by the admin role and no other.
--   (b) every refusal through the browser role, each with its exact answer, before any read (the call answers nothing):
--       no caller, a member, a deactivated holder, a country-only grant, a holder with no verified factor, a holder whose
--       session has not used it; then each reader's own codes.
--   (c) the holder (a session that used its factor) reads each, in its shape; its scratch group's one report (the
--       answers over every row are judged by shape only: their exact values are file A's, on scratch ids).
DO $proof$
DECLARE
  -- Letters only (law 15): a scratch key never reads as a number.
  v_stem    text := translate(substr(md5(gen_random_uuid()::text), 1, 10), '0123456789', 'ghijkmnopr');
  v_tag     text;
  v_path    text;
  v_s       uuid := gen_random_uuid();
  v_a1      uuid := gen_random_uuid();
  v_nf      uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_role    uuid;
  v_claims  jsonb;
  v_r1      uuid;
  v_g1      text;
  v_answer  jsonb;
  v_who     text;
  v_call    text;
  v_want    text;
  v_state   text;
  v_got     text;
  v_st      text;
  v_msg     text;
  v_fn      text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
BEGIN
  -- (a)
  FOREACH v_fn IN ARRAY ARRAY[
    'public.admin_error_groups(integer,text)',
    'public.admin_error_occurrences(text,timestamp with time zone,uuid,integer)',
    'public.admin_error_stats(integer)'] LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}'
              OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file B proof (a): %''s header or grants differ', v_fn;
    END IF;
  END LOOP;
  IF NOT EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
                  WHERE r.name = 'errors' AND p.action = 'view' AND NOT p.requires_step_up AND p.assignable)
     OR (SELECT array_agg(ro.name ORDER BY ro.name) FROM public.role_permissions rp
           JOIN public.roles ro ON ro.id = rp.role_id
           JOIN public.permissions p ON p.id = rp.permission_id
           JOIN public.resources r ON r.id = p.resource_id
          WHERE r.name = 'errors') IS DISTINCT FROM ARRAY['admin']::text[] THEN
    RAISE EXCEPTION 'cursor-bundle-8b part 1 file B proof (a): errors:view is not the admin role''s alone, without a second factor';
  END IF;

  v_tag := 'e2e-mig-b8b-b-' || v_stem;
  v_path := '/' || v_tag;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_r1 := public.record_error_report('notice', 'unknownCode', 'Read failed ' || v_tag, 'src/e2e-mig.ts:10', v_path,
      NULL, NULL, NULL, NULL, NULL, NULL, false);
    SELECT group_key INTO STRICT v_g1 FROM public.error_reports WHERE id = v_r1;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file B proof: the scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_s, v_tag || '-s@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_a1, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_nf, v_tag || '-n@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_c, v_tag || '-c@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-p@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'errors' AND p.action = 'view';
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_s, v_role, 'global'), (v_a1, v_role, 'global'), (v_nf, v_role, 'global'), (v_deact, v_role, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_c, v_role, 'country', v_code);
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    SELECT gen_random_uuid(), t.u, v_tag || '-f-' || t.n, 'totp', 'verified', now(), now(),
           substr(md5(gen_random_uuid()::text), 1, 16)
      FROM unnest(ARRAY[v_s, v_a1, v_c, v_deact]) WITH ORDINALITY AS t(u, n);
    v_claims := jsonb_build_object(
      'none', '{}',
      'plain', json_build_object('sub', v_plain::text, 'role', 'authenticated', 'aal', 'aal2')::text,
      'deact', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2')::text,
      'c', json_build_object('sub', v_c::text, 'role', 'authenticated', 'aal', 'aal2')::text,
      'nf', json_build_object('sub', v_nf::text, 'role', 'authenticated', 'aal', 'aal2')::text,
      'a1', json_build_object('sub', v_a1::text, 'role', 'authenticated', 'aal', 'aal1')::text,
      's', json_build_object('sub', v_s::text, 'role', 'authenticated', 'aal', 'aal2')::text);

    -- (b)
    FOR v_who, v_call, v_want, v_state IN
      SELECT w.who, c.call, w.want, w.state FROM (VALUES
        ('none', 'notSignedIn', 'PGRST'), ('plain', 'permissionDenied', 'PGRST'),
        ('deact', 'accountDeactivated', 'PGRST'), ('c', 'permissionDenied:scope', 'PGRST'),
        ('nf', 'step-up required: no verified factor', 'P0009'), ('a1', 'step-up required', 'P0009')) AS w(who, want, state)
      CROSS JOIN (VALUES ('admin_error_groups()'), (format('admin_error_occurrences(%L)', v_g1)),
                         ('admin_error_stats()')) AS c(call)
      UNION ALL SELECT * FROM (VALUES
        ('s', 'admin_error_groups(0)', 'badValue:days', 'PGRST'),
        ('s', 'admin_error_groups(367)', 'badValue:days', 'PGRST'),
        ('s', 'admin_error_groups(7, ''bogus'')', 'badValue:kind', 'PGRST'),
        ('s', 'admin_error_occurrences(''bogus'')', 'badValue:group', 'PGRST'),
        ('s', format('admin_error_occurrences(%L, NULL, NULL, 0)', v_g1), 'badValue:limit', 'PGRST'),
        ('s', format('admin_error_occurrences(%L, NULL, NULL, 101)', v_g1), 'badValue:limit', 'PGRST'),
        ('s', format('admin_error_occurrences(%L, now())', v_g1), 'badValue:cursor', 'PGRST'),
        ('s', 'admin_error_stats(0)', 'badValue:days', 'PGRST')) AS t(who, call, want, state)
    LOOP
      PERFORM set_config('request.jwt.claims', v_claims ->> v_who, true);
      PERFORM set_config('door.outer', '', true);
      v_answer := NULL; v_got := NULL; v_st := NULL;
      BEGIN
        SET LOCAL ROLE authenticated;
        EXECUTE 'SELECT public.' || v_call INTO v_answer;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_got = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      RESET ROLE;
      IF v_st = 'PGRST' THEN v_got := v_got::jsonb ->> 'message'; END IF;
      IF v_answer IS NOT NULL OR (v_got, v_st) IS DISTINCT FROM (v_want, v_state) THEN
        RAISE EXCEPTION 'cursor-bundle-8b part 1 file B proof (b): % as % answered % (%), not % (%)', v_call, v_who,
          coalesce(v_answer::text, v_got), v_st, v_want, v_state;
      END IF;
    END LOOP;

    -- (c)
    PERFORM set_config('request.jwt.claims', v_claims ->> 's', true);
    PERFORM set_config('door.outer', '', true);
    SET LOCAL ROLE authenticated;
    v_answer := jsonb_build_object('groups', public.admin_error_groups(7, 'notice'),
                                   'occurrences', public.admin_error_occurrences(v_g1, NULL, NULL, 1),
                                   'stats', public.admin_error_stats(30));
    RESET ROLE;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF (SELECT array_agg(k ORDER BY k) FROM jsonb_object_keys(v_answer -> 'groups') k) IS DISTINCT FROM ARRAY['more', 'rows']
       OR (SELECT array_agg(k ORDER BY k) FROM jsonb_object_keys(v_answer -> 'occurrences') k)
            IS DISTINCT FROM ARRAY['next', 'rows']
       OR (SELECT array_agg(k ORDER BY k) FROM jsonb_object_keys(v_answer -> 'stats') k)
            IS DISTINCT FROM ARRAY['browsers', 'days', 'pages', 'versions']
       OR jsonb_typeof(v_answer #> '{groups,rows}') <> 'array' OR jsonb_typeof(v_answer #> '{groups,more}') <> 'boolean'
       OR v_answer #>> '{occurrences,rows,0,id}' IS DISTINCT FROM v_r1::text
       OR v_answer #> '{occurrences,next}' <> 'null'::jsonb THEN
      RAISE EXCEPTION 'cursor-bundle-8b part 1 file B proof (c): the holder read %', v_answer;
    END IF;

    RAISE EXCEPTION 'b8b-part-1-b-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'b8b-part-1-b-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('door.outer', '', true);
  IF EXISTS (SELECT 1 FROM public.error_reports WHERE path = v_path)
     OR EXISTS (SELECT 1 FROM public.roles WHERE name = v_tag || '-staff') THEN
    RAISE EXCEPTION 'cursor-bundle-8b part 1 file B proof: the rollback left a scratch row';
  END IF;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261127010100') ON CONFLICT DO NOTHING;
