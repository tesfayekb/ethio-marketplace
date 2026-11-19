-- e2e-areas: admin-monetisation

-- Foundations 1, turn F1-6b, part 2 of 7 — THE PRICE EDIT AND END DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333;
-- brief docs/governance/briefs/f1-doors-6b.md; census docs/governance/reports/f1-doors-6b.census.md, decisions 1-3
-- and 5). admin_edit_package_price and admin_end_package_price are redeclared WHOLE from their last declarations
-- (live md5s checked): each opens with ONE door_context gate on packages:update in the match form on the price
-- row's country, read before the gate (an unknown id reads NULL, which a country-only grant never passes), with
-- the second factor and the staff_config dial, and refuses by door_refuse codes inside the shell. Under the lock
-- the edit judges every other market it touches (the row's own should it have moved since the gate read it, and
-- the market it moves the row to) as the gate judges its own; the end judges the row's own should it have moved.
-- The service role passes, as at the gate. The sentences become codes: price not found → priceNotFound, price in
-- use → priceInUse, price already ended → priceEnded, bad amount → badAmount, bad credit cost → badCreditCost,
-- unknown currency → unknownCurrency, unknown country → unknownCountry, unknown category → unknownCategory, bad
-- window → badWindow, overlapping window → overlappingWindow. Every write after the checks is unchanged.

DO $pre$
DECLARE
  v_fn  text;
  v_md5 text;
  v_was text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119050000') THEN
    RAISE EXCEPTION 'F1-6b part 2: the mark 20261119050000 must be applied first';
  END IF;
  FOR v_fn, v_was IN VALUES
    ('public.admin_edit_package_price(uuid,numeric,character,integer,character,uuid,timestamp with time zone,timestamp with time zone)', '17b4f48616e93109f6602d1ac81986e5'),
    ('public.admin_end_package_price(uuid,timestamp with time zone)', '4e2cfdd4d137f0f724ec1c1899e0a5ab')
  LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6b part 2: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_edit_package_price (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_edit_package_price(p_id uuid, p_amount numeric, p_currency character, p_credit_cost integer, p_country_code character DEFAULT NULL::bpchar, p_category_id uuid DEFAULT NULL::uuid, p_valid_from timestamp with time zone DEFAULT NULL::timestamp with time zone, p_valid_to timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_old  public.package_prices%ROWTYPE;
  v_new  public.package_prices%ROWTYPE;
  v_from timestamptz;
  v_scope   character(2);
  v_ctx     public.door_ctx;
  v_country character(2);
  v_allowed boolean;
  v_detail  text;
BEGIN
  -- The door's authority over the price's market (the row's country, read before the gate: F1-6a's match
  -- form; an unknown id reads NULL, which a country-only grant never passes), its second factor and its dial
  -- (staff_config), in one gate.
  SELECT x.country_code INTO v_scope FROM public.package_prices x WHERE x.id = p_id;
  v_ctx := public.door_context('staff', 'packages', 'update', 'staff_config', v_scope, 'match');

  PERFORM 1 FROM public.listing_packages k
    JOIN public.package_prices x ON x.package_key = k.key
   WHERE x.id = p_id
   FOR UPDATE OF k;
  SELECT * INTO v_old FROM public.package_prices WHERE id = p_id FOR UPDATE;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('priceNotFound');
  END IF;
  -- A market the edit touches beyond the one the gate judged (the row's own, should it have moved since the gate
  -- read it, and the market it moves the row to) is judged as the gate judges its own: a price is neither edited
  -- nor moved outside the caller's countries. The service role passes, as at the gate.
  IF v_ctx.role IS DISTINCT FROM 'service_role' THEN
    FOREACH v_country IN ARRAY ARRAY[v_old.country_code, p_country_code] LOOP
      IF v_country IS DISTINCT FROM v_scope THEN
        SELECT s.allowed, s.detail INTO v_allowed, v_detail
          FROM public.has_permission_scoped(v_uid, 'packages', 'update', v_country, 'match') s;
        IF NOT coalesce(v_allowed, false) THEN
          PERFORM public.door_refuse('permissionDenied', v_detail);
        END IF;
      END IF;
    END LOOP;
  END IF;
  IF v_old.used_count > 0 THEN
    PERFORM public.door_refuse('priceInUse');
  END IF;
  IF v_old.valid_to IS NOT NULL AND v_old.valid_to <= now() THEN
    PERFORM public.door_refuse('priceEnded');
  END IF;
  v_from := coalesce(p_valid_from, v_old.valid_from);
  IF p_amount IS NULL OR p_amount < 0 THEN
    PERFORM public.door_refuse('badAmount');
  END IF;
  IF p_credit_cost IS NULL OR p_credit_cost < 0 THEN
    PERFORM public.door_refuse('badCreditCost');
  END IF;
  IF p_currency IS NULL OR NOT EXISTS (SELECT 1 FROM public.currencies c WHERE c.code = p_currency) THEN
    PERFORM public.door_refuse('unknownCurrency');
  END IF;
  IF p_country_code IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = p_country_code) THEN
    PERFORM public.door_refuse('unknownCountry');
  END IF;
  IF p_category_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_category_id) THEN
    PERFORM public.door_refuse('unknownCategory');
  END IF;
  IF p_valid_to IS NOT NULL AND p_valid_to <= v_from THEN
    PERFORM public.door_refuse('badWindow');
  END IF;
  IF EXISTS (SELECT 1 FROM public.package_prices x
              WHERE x.package_key = v_old.package_key
                AND x.id <> v_old.id
                AND x.country_code IS NOT DISTINCT FROM p_country_code
                AND x.category_id IS NOT DISTINCT FROM p_category_id
                AND x.valid_from < coalesce(p_valid_to, 'infinity'::timestamptz)
                AND coalesce(x.valid_to, 'infinity'::timestamptz) > v_from) THEN
    PERFORM public.door_refuse('overlappingWindow');
  END IF;

  UPDATE public.package_prices
     SET country_code = p_country_code, category_id = p_category_id, amount = p_amount, currency = p_currency,
         credit_cost = p_credit_cost, valid_from = v_from, valid_to = p_valid_to, updated_by = v_uid
   WHERE id = p_id
  RETURNING * INTO v_new;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'package_price.edited', 'package_price', p_id::text,
            jsonb_build_object(
              'old', to_jsonb(v_old) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at',
              'new', to_jsonb(v_new) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at'));

  RETURN jsonb_build_object('ok', true, 'id', p_id);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_edit_package_price', 'staff_config', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_edit_package_price(uuid, numeric, character, integer, character, uuid, timestamp with time zone, timestamp with time zone) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_edit_package_price(uuid, numeric, character, integer, character, uuid, timestamp with time zone, timestamp with time zone) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_end_package_price (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_end_package_price(p_id uuid, p_valid_to timestamp with time zone DEFAULT now())
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.package_prices%ROWTYPE;
  v_to  timestamptz := coalesce(p_valid_to, now());
  v_scope   character(2);
  v_ctx     public.door_ctx;
  v_allowed boolean;
  v_detail  text;
BEGIN
  -- The door's authority over the price's market (the row's country, read before the gate: F1-6a's match
  -- form; an unknown id reads NULL, which a country-only grant never passes), its second factor and its dial
  -- (staff_config), in one gate.
  SELECT x.country_code INTO v_scope FROM public.package_prices x WHERE x.id = p_id;
  v_ctx := public.door_context('staff', 'packages', 'update', 'staff_config', v_scope, 'match');

  -- The package row is the lock for every window of its prices (as the save door takes it).
  PERFORM 1 FROM public.listing_packages k
    JOIN public.package_prices x ON x.package_key = k.key
   WHERE x.id = p_id
   FOR UPDATE OF k;
  SELECT * INTO v_row FROM public.package_prices WHERE id = p_id FOR UPDATE;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('priceNotFound');
  END IF;
  -- The row's market, should it have moved since the gate read it, is judged as the gate judges its own.
  IF v_ctx.role IS DISTINCT FROM 'service_role' AND v_row.country_code IS DISTINCT FROM v_scope THEN
    SELECT s.allowed, s.detail INTO v_allowed, v_detail
      FROM public.has_permission_scoped(v_uid, 'packages', 'update', v_row.country_code, 'match') s;
    IF NOT coalesce(v_allowed, false) THEN
      PERFORM public.door_refuse('permissionDenied', v_detail);
    END IF;
  END IF;
  IF v_row.valid_to IS NOT NULL AND v_row.valid_to <= now() THEN
    PERFORM public.door_refuse('priceEnded');
  END IF;
  IF v_to <= v_row.valid_from THEN
    PERFORM public.door_refuse('badWindow');
  END IF;
  IF EXISTS (SELECT 1 FROM public.package_prices x
              WHERE x.package_key = v_row.package_key
                AND x.id <> v_row.id
                AND x.country_code IS NOT DISTINCT FROM v_row.country_code
                AND x.category_id IS NOT DISTINCT FROM v_row.category_id
                AND x.valid_from < v_to
                AND coalesce(x.valid_to, 'infinity'::timestamptz) > v_row.valid_from) THEN
    PERFORM public.door_refuse('overlappingWindow');
  END IF;

  UPDATE public.package_prices SET valid_to = v_to, updated_by = v_uid WHERE id = p_id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'package_price.ended', 'package_price', p_id::text,
            jsonb_strip_nulls(jsonb_build_object(
              'package', v_row.package_key, 'from', v_row.valid_to, 'to', v_to)));

  RETURN jsonb_build_object('ok', true, 'id', p_id, 'valid_to', v_to);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_end_package_price', 'staff_config', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_end_package_price(uuid, timestamp with time zone) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_end_package_price(uuid, timestamp with time zone) TO authenticated, service_role;

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
  -- ISO 4217 keeps XTS for testing; no market ever prices in it, and no currency holds XQQ (K4: a recorded proof
  -- exception, as 'XZ')
  v_cur     character(3) := 'XTS';
  v_nocur   character(3) := 'XQQ';
  v_lv      text;
  v_cat     uuid;
  v_used    uuid := gen_random_uuid();
  v_ended   uuid := gen_random_uuid();
  v_live    uuid := gen_random_uuid();
  v_y       uuid := gen_random_uuid();
  v_any     uuid := gen_random_uuid();
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
BEGIN
  FOR v_fn, v_was IN VALUES
    ('public.admin_edit_package_price(uuid,numeric,character,integer,character,uuid,timestamp with time zone,timestamp with time zone)', '4f19e847b2bf84d1c74ea21eee289ae9'),
    ('public.admin_end_package_price(uuid,timestamp with time zone)', '405da859e79cc550f35b936cfe09f0a5')
  LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
              OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6b part 2 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn::regprocedure)
       IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6b part 2 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_tag := 'e2e-mig-f16b-2-' || v_stem;
    v_lv := 'e2e_mig_lv_' || v_stem;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2, v_nocode)) THEN
      RAISE EXCEPTION 'F1-6b part 2 proof: a scratch code (%, % or %) already exists', v_code, v_code2, v_nocode;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true), (v_code2, v_tag || '-2', true);
    IF EXISTS (SELECT 1 FROM public.currencies WHERE code IN (v_cur, v_nocur)) THEN
      RAISE EXCEPTION 'F1-6b part 2 proof: a scratch currency (% or %) already exists', v_cur, v_nocur;
    END IF;
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, v_tag, 2);
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
     WHERE (r.name, p.action) IN (('packages', 'update'));
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 1 THEN
      RAISE EXCEPTION 'F1-6b part 2 proof: a permission of packages:update is not declared';
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
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag, v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve,
                                         extends_lifetime, sort)
    VALUES (v_lv, 'level', v_tag, 10, 6, 'boost', false, true, false, false, 9000);
    -- Seven windows: used and past, ended, live in XZ; live in XY; live for every market (a category's); and two
    -- of a category in XZ, one ending in 3 days and one opening in 5.
    INSERT INTO public.package_prices (id, package_key, country_code, category_id, amount, currency, credit_cost,
                                       valid_from, valid_to, used_count) VALUES
      (v_used, v_lv, v_code, NULL, 10, v_cur, 0, now() - interval '10 days', now() - interval '6 days', 1),
      (v_ended, v_lv, v_code, NULL, 10, v_cur, 0, now() - interval '6 days', now() - interval '5 days', 0),
      (v_live, v_lv, v_code, NULL, 10, v_cur, 0, now() - interval '1 day', NULL, 0),
      (v_y, v_lv, v_code2, NULL, 10, v_cur, 0, now() - interval '1 day', NULL, 0),
      (v_any, v_lv, NULL, v_cat, 10, v_cur, 0, now() - interval '1 day', NULL, 0),
      (v_a, v_lv, v_code, v_cat, 10, v_cur, 0, now() - interval '1 day', now() + interval '3 days', 0),
      (v_b, v_lv, v_code, v_cat, 10, v_cur, 0, now() + interval '5 days', NULL, 0);
    SELECT jsonb_object_agg(d, (SELECT coalesce(sum(r.count), 0) FROM public.door_refusals r
                                 WHERE r.day = current_date AND r.door = d))
      INTO v_base FROM unnest(ARRAY['admin_edit_package_price', 'admin_end_package_price']) d;

    -- (b) every refusal, each with its exact answer: the five gates per door, the market scope (at the gate on the row's country, and in the edit's body for a move out of the caller's countries),
    --     then each door's own codes in its order.
    FOR v_who, v_call, v_want, v_status, v_spends IN
      SELECT * FROM (VALUES
      ('none', format('admin_edit_package_price(%L, 1, %L, 0, %L)', v_live, v_cur, v_code), 'notSignedIn', '401', false),
      ('plain', format('admin_edit_package_price(%L, 1, %L, 0, %L)', v_live, v_cur, v_code), 'permissionDenied', '403', false),
      ('deact', format('admin_edit_package_price(%L, 1, %L, 0, %L)', v_live, v_cur, v_code), 'accountDeactivated', '403', false),
      ('nf', format('admin_edit_package_price(%L, 1, %L, 0, %L)', v_live, v_cur, v_code), 'step-up required: no verified factor', 'P0009', false),
      ('rl', format('admin_edit_package_price(%L, 1, %L, 0, %L)', v_live, v_cur, v_code), 'rateLimited', '429', false),
      ('none', format('admin_end_package_price(%L)', v_live), 'notSignedIn', '401', false),
      ('plain', format('admin_end_package_price(%L)', v_live), 'permissionDenied', '403', false),
      ('deact', format('admin_end_package_price(%L)', v_live), 'accountDeactivated', '403', false),
      ('nf', format('admin_end_package_price(%L)', v_live), 'step-up required: no verified factor', 'P0009', false),
      ('rl', format('admin_end_package_price(%L)', v_live), 'rateLimited', '429', false),
      ('c', format('admin_edit_package_price(%L, 1, %L, 0, %L)', v_y, v_cur, v_code2), 'permissionDenied:scope', '403', false),
      ('c', format('admin_edit_package_price(%L, 1, %L, 0, NULL, %L)', v_any, v_cur, v_cat), 'permissionDenied:scope', '403', false),
      ('c', format('admin_edit_package_price(%L, 1, %L, 0, %L)', v_live, v_cur, v_code2), 'permissionDenied:scope', '403', false),
      ('c', format('admin_edit_package_price(%L, 1, %L, 0)', v_live, v_cur), 'permissionDenied:scope', '403', false),
      ('c', format('admin_end_package_price(%L)', v_y), 'permissionDenied:scope', '403', false),
      ('c', format('admin_end_package_price(%L)', v_any), 'permissionDenied:scope', '403', false),
      ('s', format('admin_edit_package_price(%L, 1, %L, 0)', gen_random_uuid(), v_cur), 'priceNotFound', '400', true),
      ('s', format('admin_edit_package_price(%L, 1, %L, 0, %L)', v_used, v_cur, v_code), 'priceInUse', '400', true),
      ('s', format('admin_edit_package_price(%L, 1, %L, 0, %L)', v_ended, v_cur, v_code), 'priceEnded', '400', true),
      ('s', format('admin_edit_package_price(%L, -1, %L, 0, %L)', v_live, v_cur, v_code), 'badAmount', '400', true),
      ('s', format('admin_edit_package_price(%L, 1, %L, -1, %L)', v_live, v_cur, v_code), 'badCreditCost', '400', true),
      ('s', format('admin_edit_package_price(%L, 1, %L, 0, %L)', v_live, v_nocur, v_code), 'unknownCurrency', '400', true),
      ('s', format('admin_edit_package_price(%L, 1, %L, 0, %L)', v_live, v_cur, v_nocode), 'unknownCountry', '400', true),
      ('s', format('admin_edit_package_price(%L, 1, %L, 0, %L, %L)', v_live, v_cur, v_code, gen_random_uuid()), 'unknownCategory', '400', true),
      ('s', format('admin_edit_package_price(%L, 1, %L, 0, %L, NULL, NULL, %L)', v_live, v_cur, v_code, now() - interval '2 days'), 'badWindow', '400', true),
      ('s', format('admin_edit_package_price(%L, 1, %L, 0, %L, NULL, %L)', v_live, v_cur, v_code, now() - interval '5 days 12 hours'), 'overlappingWindow', '400', true),
      ('s', format('admin_end_package_price(%L)', gen_random_uuid()), 'priceNotFound', '400', true),
      ('s', format('admin_end_package_price(%L)', v_ended), 'priceEnded', '400', true),
      ('s', format('admin_end_package_price(%L, %L)', v_a, now() - interval '2 days'), 'badWindow', '400', true),
      ('s', format('admin_end_package_price(%L, %L)', v_a, now() + interval '10 days'), 'overlappingWindow', '400', true)
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
        RAISE EXCEPTION 'F1-6b part 2 proof (b): % as % answered % (%), not % (%)', v_call, v_who, v_got, v_st,
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
    IF (SELECT count(*) FROM public.package_prices WHERE package_key = v_lv) <> 7
       OR (SELECT amount <> 10 OR country_code IS DISTINCT FROM v_code OR valid_to IS NOT NULL
             FROM public.package_prices WHERE id = v_live)
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_s, v_c, v_nf, v_plain, v_deact, v_rl)) THEN
      RAISE EXCEPTION 'F1-6b part 2 proof (c): a refused call wrote a row';
    END IF;

    -- (d) the country holder edits and ends a price of its own market.
    PERFORM set_config('request.jwt.claims', v_claims ->> 'c', true);
    v_answer := public.admin_edit_package_price(v_live, 7, v_cur, 1, v_code);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'id', v_live) THEN
      RAISE EXCEPTION 'F1-6b part 2 proof (d): the edit answered %', v_answer;
    END IF;
    v_spent := v_spent || jsonb_build_object('c', coalesce((v_spent ->> 'c')::integer, 0) + 1);
    IF NOT coalesce((SELECT amount = 7 AND credit_cost = 1 AND valid_to IS NULL AND updated_by = v_c
                       FROM public.package_prices WHERE id = v_live), false) THEN
      RAISE EXCEPTION 'F1-6b part 2 proof (d): the edit did not write the row';
    END IF;
    v_answer := public.admin_end_package_price(v_live, now() + interval '1 day');
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_answer ->> 'id' IS DISTINCT FROM v_live::text THEN
      RAISE EXCEPTION 'F1-6b part 2 proof (d): the end answered %', v_answer;
    END IF;
    v_spent := v_spent || jsonb_build_object('c', coalesce((v_spent ->> 'c')::integer, 0) + 1);
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF NOT coalesce((SELECT amount = 7 AND valid_to IS NOT NULL AND updated_by = v_c
                       FROM public.package_prices WHERE id = v_live), false)
       OR (SELECT count(*) FROM public.package_prices WHERE package_key = v_lv) <> 7
       OR (SELECT array_agg(action ORDER BY action) FROM public.audit_log WHERE actor_id = v_c)
            IS DISTINCT FROM ARRAY['package_price.edited', 'package_price.ended']
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_s, v_nf, v_plain, v_deact, v_rl)) THEN
      RAISE EXCEPTION 'F1-6b part 2 proof (d): the end did not write the row, or the audit lines differ';
    END IF;

    -- (e) the dial and the meter.
    FOREACH v_who IN ARRAY ARRAY['s', 'c'] LOOP
      SELECT coalesce(sum(l.count), 0)::integer INTO v_count FROM public.rate_limits l
       WHERE l.key = CASE v_who WHEN 's' THEN v_s ELSE v_c END::text AND l.action = 'staff_config';
      IF v_count IS DISTINCT FROM coalesce((v_spent ->> v_who)::integer, 0) THEN
        RAISE EXCEPTION 'F1-6b part 2 proof (e): staff_config counted % for %, expected %', v_count, v_who, v_spent ->> v_who;
      END IF;
    END LOOP;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_nf::text, v_plain::text, v_deact::text))
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_s::text, v_c::text) AND action <> 'staff_config') THEN
      RAISE EXCEPTION 'F1-6b part 2 proof (e): a caller the gate refused, or another dial, was counted';
    END IF;
    FOREACH v_door IN ARRAY ARRAY['admin_edit_package_price', 'admin_end_package_price'] LOOP
      IF (SELECT coalesce(sum(r.count), 0) FROM public.door_refusals r WHERE r.day = current_date AND r.door = v_door)
         IS DISTINCT FROM (v_base ->> v_door)::numeric + coalesce((v_met ->> v_door)::integer, 0) THEN
        RAISE EXCEPTION 'F1-6b part 2 proof (e): door_refusals did not meter %''s % refusals', v_door, v_met ->> v_door;
      END IF;
    END LOOP;

    RAISE EXCEPTION 'f1-6b-part-2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6b-part-2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('response.status', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119050100') ON CONFLICT DO NOTHING;
