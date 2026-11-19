-- e2e-areas: admin-monetisation, admin-services, admin-screening

-- Foundations 1, turn F1-6b, part 6 of 7 — THE MONETISATION AND SERVICES READERS ONTO DOOR_CONTEXT (DEC-333;
-- brief docs/governance/briefs/f1-doors-6b.md; census docs/governance/reports/f1-doors-6b.census.md, decision 8).
-- admin_list_monetisation (packages:view), admin_ai_features, admin_ai_spend_days, admin_list_ai_calls and
-- admin_job_health (services:view) are redeclared WHOLE from their last declarations (live md5s checked): each
-- opens with ONE door_context gate as a staff reader in the global form (no second factor, no dial) and raises its
-- refusals by door_refuse (no shell: a reader's refusal is raised). Their codes are kept (badValue:<field>);
-- job_health_core is unchanged. Every read after the gate is unchanged.

DO $pre$
DECLARE
  v_fn  text;
  v_md5 text;
  v_was text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119050400') THEN
    RAISE EXCEPTION 'F1-6b part 6: the mark 20261119050400 must be applied first';
  END IF;
  FOR v_fn, v_was IN VALUES
    ('public.admin_list_monetisation()', '6af21e1705a12f7dd9f23e5f7abc87fc'),
    ('public.admin_ai_features()', 'fe97165ba126161e6ec01d124724ee9f'),
    ('public.admin_ai_spend_days(integer)', 'a8b2161a8b86fecb9e62942cb07d842d'),
    ('public.admin_list_ai_calls(text,text,timestamp with time zone,uuid,integer)', '1f18e0da99886c6d81f7c07171bd7007'),
    ('public.admin_job_health(text)', '0093fdc7f97b8e264b99055012d2cdd2')
  LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6b part 6: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_list_monetisation (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_list_monetisation()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  PERFORM public.door_context('staff-reader', 'packages', 'view', NULL, NULL, 'global');
  RETURN jsonb_build_object(
    'markets', coalesce((
      SELECT jsonb_agg(to_jsonb(m) - 'created_by' - 'updated_by'
                       || jsonb_build_object('created_by_name', pc.display_name, 'updated_by_name', pu.display_name)
                       ORDER BY m.country_code NULLS FIRST)
        FROM public.market_settings m
        LEFT JOIN public.profiles pc ON pc.user_id = m.created_by
        LEFT JOIN public.profiles pu ON pu.user_id = m.updated_by), '[]'::jsonb),
    'products', coalesce((
      SELECT jsonb_agg(to_jsonb(k) - 'created_by' - 'updated_by'
                       || jsonb_build_object('created_by_name', pc.display_name, 'updated_by_name', pu.display_name)
                       ORDER BY k.sort, k.key)
        FROM public.listing_packages k
        LEFT JOIN public.profiles pc ON pc.user_id = k.created_by
        LEFT JOIN public.profiles pu ON pu.user_id = k.updated_by), '[]'::jsonb),
    'overrides', coalesce((
      SELECT jsonb_agg(to_jsonb(o) - 'created_by' - 'updated_by'
                       || jsonb_build_object('created_by_name', pc.display_name, 'updated_by_name', pu.display_name)
                       ORDER BY o.level_key, o.category_id, o.country_code)
        FROM public.level_overrides o
        LEFT JOIN public.profiles pc ON pc.user_id = o.created_by
        LEFT JOIN public.profiles pu ON pu.user_id = o.updated_by), '[]'::jsonb),
    'prices', coalesce((
      SELECT jsonb_agg(to_jsonb(p) - 'created_by' - 'updated_by'
                       || jsonb_build_object('created_by_name', pc.display_name, 'updated_by_name', pu.display_name)
                       ORDER BY p.package_key, p.valid_from DESC, p.id)
        FROM public.package_prices p
        LEFT JOIN public.profiles pc ON pc.user_id = p.created_by
        LEFT JOIN public.profiles pu ON pu.user_id = p.updated_by), '[]'::jsonb));
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_monetisation() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_monetisation() TO authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_ai_features (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_ai_features()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_first date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_today date := (now() AT TIME ZONE 'utc')::date;
  v_month timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
BEGIN
  PERFORM public.door_context('staff-reader', 'services', 'view', NULL, NULL, 'global');
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'feature', f.feature,
             'on', f.enabled OR (f.off_reason = 'budget' AND f.off_at < v_month),
             'off_reason', CASE WHEN f.enabled OR (f.off_reason = 'budget' AND f.off_at < v_month)
                                THEN NULL ELSE f.off_reason END,
             'off_at', CASE WHEN f.enabled OR (f.off_reason = 'budget' AND f.off_at < v_month)
                            THEN NULL ELSE f.off_at END,
             'monthly_budget_cents', f.monthly_budget_cents,
             'unit', f.unit,
             'unit_cost_microusd', f.unit_cost_microusd,
             'month_spent_microusd', coalesce(m.cost, 0),
             'month_calls', coalesce(m.calls, 0),
             'month_units', coalesce(m.units, 0),
             'today_calls', coalesce(t.calls, 0),
             'alert_level', CASE WHEN f.alert_month = v_first THEN f.alert_level ELSE 0 END,
             'updated_at', f.updated_at)
           ORDER BY f.feature)
      FROM public.ai_features f
      LEFT JOIN LATERAL (
        SELECT sum(s.cost_microusd)::bigint AS cost, sum(s.calls)::bigint AS calls, sum(s.units)::bigint AS units
          FROM public.ai_spend_days s
         WHERE s.feature = f.feature AND s.day >= v_first) m ON true
      LEFT JOIN public.ai_spend_days t ON t.feature = f.feature AND t.day = v_today
     WHERE f.feature !~ '^e2e-'), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_ai_features() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_ai_features() TO authenticated, service_role;

-- ------------------------------------------------------------ 3. admin_ai_spend_days (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_ai_spend_days(p_days integer DEFAULT 30)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_first date;
BEGIN
  PERFORM public.door_context('staff-reader', 'services', 'view', NULL, NULL, 'global');
  IF p_days IS NULL OR p_days < 1 OR p_days > 92 THEN PERFORM public.door_refuse('badValue', 'days'); END IF;
  v_first := (now() AT TIME ZONE 'utc')::date - (p_days - 1);
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'feature', s.feature,
             'day', s.day,
             'calls', s.calls,
             'units', s.units,
             'cost_microusd', s.cost_microusd)
           ORDER BY s.day DESC, s.feature)
      FROM public.ai_spend_days s
     WHERE s.day >= v_first
       AND s.feature !~ '^e2e-'), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_ai_spend_days(integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_ai_spend_days(integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 4. admin_list_ai_calls (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_list_ai_calls(
  p_feature text DEFAULT NULL, p_outcome text DEFAULT NULL,
  p_before_at timestamptz DEFAULT NULL,p_before_id uuid DEFAULT NULL,
  p_limit integer DEFAULT 50)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $door$
DECLARE v_uid uuid := auth.uid();
BEGIN
  PERFORM public.door_context('staff-reader', 'services', 'view', NULL, NULL, 'global');
  IF p_limit IS NULL OR p_limit<1 OR p_limit>100 THEN PERFORM public.door_refuse('badValue', 'limit'); END IF;
  IF p_feature IS NOT NULL AND (length(p_feature)<1 OR length(p_feature)>80) THEN PERFORM public.door_refuse('badValue', 'feature'); END IF;
  IF p_outcome IS NOT NULL AND p_outcome NOT IN ('ok','featureOff','budget','unavailable','timeout','providerError','unusableAnswer') THEN PERFORM public.door_refuse('badValue', 'outcome'); END IF;
  IF (p_before_at IS NULL) <> (p_before_id IS NULL) THEN PERFORM public.door_refuse('badValue', 'cursor'); END IF;
  -- profiles:view is the existing staff users console's permission; no new permission.
  RETURN public.admin_list_ai_calls_core(p_feature,p_outcome,p_before_at,p_before_id,p_limit,true,
    public.has_permission(v_uid,'profiles','view'));
END;
$door$;
REVOKE ALL ON FUNCTION public.admin_list_ai_calls(text, text, timestamp with time zone, uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_ai_calls(text, text, timestamp with time zone, uuid, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 5. admin_job_health (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_job_health(p_job text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'services', 'view', NULL, NULL, 'global');
  RETURN public.job_health_core(p_job, NULL);
END $function$;
REVOKE ALL ON FUNCTION public.admin_job_health(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_job_health(text) TO authenticated, service_role;

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
BEGIN
  FOR v_fn, v_was IN VALUES
    ('public.admin_list_monetisation()', 'cf98d052dd78670623c02587a38efa46'),
    ('public.admin_ai_features()', '7461cc089d2978b6f0c4e26accd5f956'),
    ('public.admin_ai_spend_days(integer)', '6b39878dde86a016a0379d78cb5f56c1'),
    ('public.admin_list_ai_calls(text,text,timestamp with time zone,uuid,integer)', 'dd2ed5cc4271ef93395cbe7818f50ba0'),
    ('public.admin_job_health(text)', '3f7e49670afef5f2ef9b93cceecf58aa')
  LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}'
              OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6b part 6 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn::regprocedure)
       IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6b part 6 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_tag := 'e2e-mig-f16b-6-' || v_stem;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2, v_nocode)) THEN
      RAISE EXCEPTION 'F1-6b part 6 proof: a scratch code (%, % or %) already exists', v_code, v_code2, v_nocode;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true), (v_code2, v_tag || '-2', true);
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_s, v_tag || '-s@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_c, v_tag || '-c@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_nf, v_tag || '-n@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-p@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_rl, v_tag || '-r@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE (r.name, p.action) IN (('packages', 'view'), ('services', 'view'));
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 2 THEN
      RAISE EXCEPTION 'F1-6b part 6 proof: a permission of packages:view, services:view is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_s, v_role, 'global'), (v_nf, v_role, 'global'), (v_deact, v_role, 'global'), (v_rl, v_role, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_c, v_role, 'country', v_code);
    v_claims := jsonb_build_object(
      'none', '{}',
      'plain', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text,
      'deact', json_build_object('sub', v_deact::text, 'role', 'authenticated')::text,
      'nf', json_build_object('sub', v_nf::text, 'role', 'authenticated')::text,
      's', json_build_object('sub', v_s::text, 'role', 'authenticated')::text,
      'c', json_build_object('sub', v_c::text, 'role', 'authenticated')::text,
      'rl', json_build_object('sub', v_rl::text, 'role', 'authenticated')::text);
    SELECT jsonb_object_agg(d, (SELECT coalesce(sum(r.count), 0) FROM public.door_refusals r
                                 WHERE r.day = current_date AND r.door = d))
      INTO v_base FROM unnest(ARRAY['admin_list_monetisation', 'admin_ai_features', 'admin_ai_spend_days', 'admin_list_ai_calls', 'admin_job_health']) d;

    -- (b) every refusal, each with its exact message: the gate (no caller, no permission, a deactivated holder, and a
    --     country-only grant, which a global reader never passes), then each reader's own codes.
    FOR v_who, v_call, v_want, v_status, v_spends IN
      SELECT * FROM (VALUES
      ('none', 'admin_list_monetisation()', 'notSignedIn', 'P0D01', false),
      ('plain', 'admin_list_monetisation()', 'permissionDenied', 'P0D01', false),
      ('deact', 'admin_list_monetisation()', 'accountDeactivated', 'P0D01', false),
      ('c', 'admin_list_monetisation()', 'permissionDenied:scope', 'P0D01', false),
      ('none', 'admin_ai_features()', 'notSignedIn', 'P0D01', false),
      ('plain', 'admin_ai_features()', 'permissionDenied', 'P0D01', false),
      ('deact', 'admin_ai_features()', 'accountDeactivated', 'P0D01', false),
      ('c', 'admin_ai_features()', 'permissionDenied:scope', 'P0D01', false),
      ('none', 'admin_ai_spend_days(30)', 'notSignedIn', 'P0D01', false),
      ('plain', 'admin_ai_spend_days(30)', 'permissionDenied', 'P0D01', false),
      ('deact', 'admin_ai_spend_days(30)', 'accountDeactivated', 'P0D01', false),
      ('c', 'admin_ai_spend_days(30)', 'permissionDenied:scope', 'P0D01', false),
      ('none', 'admin_list_ai_calls()', 'notSignedIn', 'P0D01', false),
      ('plain', 'admin_list_ai_calls()', 'permissionDenied', 'P0D01', false),
      ('deact', 'admin_list_ai_calls()', 'accountDeactivated', 'P0D01', false),
      ('c', 'admin_list_ai_calls()', 'permissionDenied:scope', 'P0D01', false),
      ('none', 'admin_job_health(''name-check-catchup'')', 'notSignedIn', 'P0D01', false),
      ('plain', 'admin_job_health(''name-check-catchup'')', 'permissionDenied', 'P0D01', false),
      ('deact', 'admin_job_health(''name-check-catchup'')', 'accountDeactivated', 'P0D01', false),
      ('c', 'admin_job_health(''name-check-catchup'')', 'permissionDenied:scope', 'P0D01', false),
      ('s', 'admin_ai_spend_days(0)', 'badValue:days', 'P0D01', false),
      ('s', 'admin_ai_spend_days(93)', 'badValue:days', 'P0D01', false),
      ('s', 'admin_list_ai_calls(NULL, NULL, NULL, NULL, 0)', 'badValue:limit', 'P0D01', false),
      ('s', 'admin_list_ai_calls('''')', 'badValue:feature', 'P0D01', false),
      ('s', 'admin_list_ai_calls(NULL, ''bogus'')', 'badValue:outcome', 'P0D01', false),
      ('s', 'admin_list_ai_calls(NULL, NULL, now())', 'badValue:cursor', 'P0D01', false),
      ('s', 'admin_job_health(''bogus'')', 'badValue:job', 'P0001', false)
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
        RAISE EXCEPTION 'F1-6b part 6 proof (b): % as % answered % (%), not % (%)', v_call, v_who, v_got, v_st,
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

    -- (d) the global holder reads each, in its shape.
    PERFORM set_config('request.jwt.claims', v_claims ->> 's', true);
    v_answer := public.admin_list_monetisation();
    IF (SELECT array_agg(k ORDER BY k) FROM jsonb_object_keys(v_answer) k)
         IS DISTINCT FROM ARRAY['markets', 'overrides', 'prices', 'products'] THEN
      RAISE EXCEPTION 'F1-6b part 6 proof (d): admin_list_monetisation answered keys of %', v_answer;
    END IF;
    IF jsonb_typeof(public.admin_ai_features()) <> 'array' OR jsonb_typeof(public.admin_ai_spend_days(30)) <> 'array' THEN
      RAISE EXCEPTION 'F1-6b part 6 proof (d): admin_ai_features or admin_ai_spend_days answered no list';
    END IF;
    v_answer := public.admin_list_ai_calls();
    IF (SELECT array_agg(k ORDER BY k) FROM jsonb_object_keys(v_answer) k) IS DISTINCT FROM ARRAY['next', 'rows'] THEN
      RAISE EXCEPTION 'F1-6b part 6 proof (d): admin_list_ai_calls answered keys of %', v_answer;
    END IF;
    v_answer := public.admin_job_health('name-check-catchup');
    IF (SELECT array_agg(k ORDER BY k) FROM jsonb_object_keys(v_answer) k)
         IS DISTINCT FROM ARRAY['dispatched_unclaimed', 'job', 'last', 'paused'] THEN
      RAISE EXCEPTION 'F1-6b part 6 proof (d): admin_job_health answered keys of %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (e) a reader spends no dial and meters nothing.
    IF EXISTS (SELECT 1 FROM public.rate_limits
                WHERE key IN (v_s::text, v_c::text, v_nf::text, v_plain::text, v_deact::text, v_rl::text)) THEN
      RAISE EXCEPTION 'F1-6b part 6 proof (e): a reader counted a dial';
    END IF;
    FOREACH v_door IN ARRAY ARRAY['admin_list_monetisation', 'admin_ai_features', 'admin_ai_spend_days', 'admin_list_ai_calls', 'admin_job_health'] LOOP
      IF (SELECT coalesce(sum(r.count), 0) FROM public.door_refusals r WHERE r.day = current_date AND r.door = v_door)
         IS DISTINCT FROM (v_base ->> v_door)::numeric THEN
        RAISE EXCEPTION 'F1-6b part 6 proof (e): door_refusals metered a refusal of the reader %', v_door;
      END IF;
    END LOOP;
    RAISE EXCEPTION 'f1-6b-part-6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6b-part-6-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('response.status', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119050500') ON CONFLICT DO NOTHING;
