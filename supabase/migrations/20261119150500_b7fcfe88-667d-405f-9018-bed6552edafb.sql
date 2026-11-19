-- e2e-areas: admin-users

-- Foundations 1, turn F1-7a, part 6 of 10 — THE IMPERSONATION READERS ON THE GATE (DEC-333; brief
-- docs/governance/briefs/f1-doors-7a.md; ruling docs/governance/briefs/f1-doors-7a-ruling-1.md, decision 6).
-- impersonated_get_profile and impersonated_list_listings take door_context('reader') before impersonation_target,
-- which keeps its body (it reads the staff member's own session row and refuses one that is not theirs or has
-- ended). Each is redeclared whole from its last declaration, byte for byte apart from the gate's line and CREATE OR
-- REPLACE; grants restated as they stand (authenticated, service_role).

DO $pre$
DECLARE
  v_md5  text;
  v_fn   text;
  v_want text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119170400') THEN
    RAISE EXCEPTION 'F1-7a part 6: the mark 20261119170400 must be applied first';
  END IF;
  FOR v_fn, v_want IN VALUES
      ('public.impersonated_get_profile(uuid)', 'b39a3d18661a80b0ed30ccf7de74e1ab'),
      ('public.impersonated_list_listings(uuid,integer,integer)', 'a27491a4009fe4a05e43a57423ac169e') LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'F1-7a part 6: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- The live definitions before the redeclarations: the proof runs them as pg_temp copies beside the new bodies.
CREATE TEMP TABLE f17a_p6_before ON COMMIT DROP AS
SELECT p.proname::text AS name, pg_get_functiondef(p.oid) AS def
  FROM pg_proc p
 WHERE p.oid = ANY (ARRAY[
   'public.impersonated_get_profile(uuid)'::regprocedure,
   'public.impersonated_list_listings(uuid,integer,integer)'::regprocedure]);

-- ------------------------------------------------------------ 1. impersonated_get_profile
CREATE OR REPLACE FUNCTION public.impersonated_get_profile(p_session uuid)
RETURNS TABLE(target_id uuid, display_name text, seller_alias text,
              home_country_code char(2), account_status text, created_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_ctx    public.door_ctx := public.door_context('reader');
  v_target uuid := public.impersonation_target(p_session);
BEGIN
  RETURN QUERY
  SELECT p.user_id, p.display_name, p.seller_alias, p.home_country_code,
         p.account_status, p.created_at
  FROM public.profiles p WHERE p.user_id = v_target;
END $$;
REVOKE ALL ON FUNCTION public.impersonated_get_profile(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.impersonated_get_profile(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.impersonated_get_profile(uuid) TO service_role;

-- ------------------------------------------------------------ 2. impersonated_list_listings
CREATE OR REPLACE FUNCTION public.impersonated_list_listings(
  p_session uuid, p_limit int DEFAULT 25, p_offset int DEFAULT 0)
RETURNS TABLE(id uuid, title text, status text, price_amount numeric,
              price_currency char(3), price_mode text, price_bp integer, price_negotiable boolean,
              created_at timestamptz, total_count bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_ctx    public.door_ctx := public.door_context('reader');
  v_target uuid := public.impersonation_target(p_session);
BEGIN
  RETURN QUERY
  SELECT l.id, l.title, l.status, l.price_amount, l.price_currency,
         l.price_mode, l.price_bp, l.price_negotiable, l.created_at,
         COUNT(*) OVER () AS total_count
  FROM public.listings l
  WHERE l.seller_id = v_target
  ORDER BY l.created_at DESC
  LIMIT GREATEST(COALESCE(p_limit, 25), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $$;
REVOKE ALL ON FUNCTION public.impersonated_list_listings(uuid, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.impersonated_list_listings(uuid, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.impersonated_list_listings(uuid, integer, integer) TO service_role;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) each body is the redeclared one, STABLE SECURITY DEFINER with search_path public, callable by authenticated
--       and the service role, never by anon or PUBLIC;
--   (b) on scratch rows (a person with an ad; a staff member's open impersonation session on that person), each
--       reader's rows equal the old body's on the same rows, and the browser role reads the same;
--   (c) signed out → notSignedIn; a deactivated caller → accountDeactivated (the gate answers before the session is
--       read); a session that is not the caller's answers impersonation_target's own refusal, before and after alike;
--   (d) the cost: 200 calls of each reader, old and new medians as a NOTICE; a new median over 5 ms fails (ruling 7's
--       bar, F1-1).
DO $proof$
DECLARE
  v_stem    text := translate(substr(md5(gen_random_uuid()::text), 1, 10), '0123456789', 'ghijkmnopr');
  v_tag     text;
  -- 'XZ' a scratch code no market holds (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_l       uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_r       record;
  v_fn      text;
  v_who     text;
  v_call    text;
  v_want    text;
  v_got     text;
  v_st      text;
  v_old_got text;
  v_old     jsonb;
  v_new     jsonb;
  v_as      jsonb;
  v_t0      timestamptz;
  v_old_ms  double precision[];
  v_new_ms  double precision[];
  v_mo      double precision;
  v_mn      double precision;
  i         integer;
  v_msg     text;
BEGIN
  -- (a)
  FOR v_fn, v_want IN VALUES
      ('public.impersonated_get_profile(uuid)', '623968df1585ba93d2c46a89a07e89a2'),
      ('public.impersonated_list_listings(uuid,integer,integer)', '88669b9b83037e9b00e0dedc97008e0d') LOOP
    IF (SELECT md5(replace(prosrc, chr(13), '')) IS DISTINCT FROM v_want
               OR proconfig::text <> '{search_path=public}' OR provolatile <> 's' OR NOT prosecdef
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0) THEN
      RAISE EXCEPTION 'F1-7a part 6 proof (a): % is not the redeclared STABLE DEFINER reader with its grants', v_fn;
    END IF;
  END LOOP;

  BEGIN
    FOR v_r IN SELECT name, def FROM f17a_p6_before LOOP
      EXECUTE regexp_replace(v_r.def, '^CREATE OR REPLACE FUNCTION public\.' || v_r.name || '\(',
                             'CREATE FUNCTION pg_temp.f17a_old_' || v_r.name || '(');
    END LOOP;
    FOR v_r IN SELECT substr(p.proname, 10) AS name, pg_get_function_identity_arguments(p.oid) AS def
                 FROM pg_proc p
                WHERE p.pronamespace = pg_my_temp_schema() AND p.proname LIKE 'f17a\_old\_%' LOOP
      EXECUTE format('REVOKE ALL ON FUNCTION pg_temp.f17a_old_%s(%s) FROM PUBLIC', v_r.name, v_r.def);
    END LOOP;
    IF (SELECT count(*) FROM f17a_p6_before) <> 2 THEN
      RAISE EXCEPTION 'F1-7a part 6 proof: % old definitions captured, not 2', (SELECT count(*) FROM f17a_p6_before);
    END IF;

    v_tag := 'e2e-mig-f17a6-' || v_stem;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-7a part 6 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
       AND a.name_en LIKE 'e2e-mig-%';
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_d
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_d AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_l, v_a, v_cat, v_city, v_tag || ' ad', 'scratch', v_code, 'active', now(), now(),
            now() + interval '10 days');
    INSERT INTO public.impersonation_sessions (id, actor_id, target_id, reason, expires_at)
    VALUES (v_s, v_b, v_a, 'e2e migration proof scratch', now() + interval '1 hour');

    -- (b) the staff member's reads, old body beside new; then the new one through the browser role
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_b::text, 'role', 'authenticated')::text, true);
    FOREACH v_call IN ARRAY ARRAY[format('impersonated_get_profile(%L::uuid)', v_s),
                                  format('impersonated_list_listings(%L::uuid)', v_s),
                                  format('impersonated_list_listings(%L::uuid, 1, 1)', v_s)] LOOP
      EXECUTE format('SELECT coalesce(jsonb_agg(to_jsonb(t)), ''[]''::jsonb) FROM %s t', 'pg_temp.f17a_old_' || v_call)
        INTO v_old;
      EXECUTE format('SELECT coalesce(jsonb_agg(to_jsonb(t)), ''[]''::jsonb) FROM %s t', 'public.' || v_call) INTO v_new;
      SET LOCAL ROLE authenticated;
      EXECUTE format('SELECT coalesce(jsonb_agg(to_jsonb(t)), ''[]''::jsonb) FROM %s t', 'public.' || v_call) INTO v_as;
      RESET ROLE;
      IF v_new IS DISTINCT FROM v_old OR v_as IS DISTINCT FROM v_new THEN
        RAISE EXCEPTION 'F1-7a part 6 proof (b): % read % before and % after (% as the browser role)',
          v_call, v_old, v_new, v_as;
      END IF;
    END LOOP;
    IF (SELECT t.target_id FROM public.impersonated_get_profile(v_s) t) IS DISTINCT FROM v_a
       OR (SELECT t.id FROM public.impersonated_list_listings(v_s) t) IS DISTINCT FROM v_l THEN
      RAISE EXCEPTION 'F1-7a part 6 proof (b): the scratch rows did not reach the reads';
    END IF;

    -- (c) the gate's refusals, through the browser role
    FOR v_who, v_call IN
      SELECT w.who, c.call
        FROM (VALUES ('out'), ('deactivated')) AS w(who)
       CROSS JOIN (VALUES (format('impersonated_get_profile(%L::uuid)', v_s)),
                          (format('impersonated_list_listings(%L::uuid)', v_s))) AS c(call)
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE v_who WHEN 'out' THEN '{}'
                   ELSE json_build_object('sub', v_d::text, 'role', 'authenticated')::text END, true);
      v_want := CASE v_who WHEN 'out' THEN 'notSignedIn' ELSE 'accountDeactivated' END;
      v_got := NULL; v_st := NULL;
      SET LOCAL ROLE authenticated;
      BEGIN
        EXECUTE format('SELECT count(*)::text::jsonb FROM %s t', 'public.' || v_call) INTO v_new;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_got = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      RESET ROLE;
      IF v_got IS DISTINCT FROM v_want OR v_st IS DISTINCT FROM 'P0D01' THEN
        RAISE EXCEPTION 'F1-7a part 6 proof (c): % as % answered % (%), not %', v_call, v_who,
          coalesce(v_got, 'success'), v_st, v_want;
      END IF;
    END LOOP;
    -- a session that is not the caller's: impersonation_target's own refusal, before and after alike
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    FOREACH v_call IN ARRAY ARRAY[format('impersonated_get_profile(%L::uuid)', v_s),
                                  format('impersonated_list_listings(%L::uuid)', v_s)] LOOP
      v_old_got := NULL; v_got := NULL;
      BEGIN
        EXECUTE format('SELECT count(*)::text::jsonb FROM %s t', 'pg_temp.f17a_old_' || v_call) INTO v_old;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_old_got = MESSAGE_TEXT;
      END;
      SET LOCAL ROLE authenticated;
      BEGIN
        EXECUTE format('SELECT count(*)::text::jsonb FROM %s t', 'public.' || v_call) INTO v_new;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_got = MESSAGE_TEXT;
      END;
      RESET ROLE;
      IF v_old_got IS NULL OR v_got IS DISTINCT FROM v_old_got THEN
        RAISE EXCEPTION 'F1-7a part 6 proof (c): % on another''s session answered % before and % after', v_call,
          coalesce(v_old_got, 'success'), coalesce(v_got, 'success');
      END IF;
    END LOOP;

    -- (d) the cost
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_b::text, 'role', 'authenticated')::text, true);
    FOREACH v_call IN ARRAY ARRAY[format('impersonated_get_profile(%L::uuid)', v_s),
                                  format('impersonated_list_listings(%L::uuid)', v_s)] LOOP
      v_fn := split_part(v_call, '(', 1);
      v_old_ms := ARRAY[]::double precision[];
      v_new_ms := ARRAY[]::double precision[];
      FOR i IN 1..200 LOOP
        v_t0 := clock_timestamp();
        EXECUTE format('SELECT coalesce(jsonb_agg(to_jsonb(t)), ''[]''::jsonb) FROM %s t', 'pg_temp.f17a_old_' || v_call)
          INTO v_old;
        v_old_ms := array_append(v_old_ms, extract(epoch FROM clock_timestamp() - v_t0) * 1000.0);
        v_t0 := clock_timestamp();
        EXECUTE format('SELECT coalesce(jsonb_agg(to_jsonb(t)), ''[]''::jsonb) FROM %s t', 'public.' || v_call)
          INTO v_new;
        v_new_ms := array_append(v_new_ms, extract(epoch FROM clock_timestamp() - v_t0) * 1000.0);
      END LOOP;
      SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY s) INTO v_mo FROM unnest(v_old_ms) AS s;
      SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY s) INTO v_mn FROM unnest(v_new_ms) AS s;
      RAISE NOTICE 'F1-7a part 6 cost: % median old % ms, new % ms', v_fn, round(v_mo::numeric, 4), round(v_mn::numeric, 4);
      IF v_mn > 5 THEN
        RAISE EXCEPTION 'F1-7a part 6 proof (d): % takes % ms a call (ruling 7''s bar: 5 ms)', v_fn, round(v_mn::numeric, 3);
      END IF;
    END LOOP;

    RAISE EXCEPTION 'f1-7a-part-6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-7a-part-6-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119170500') ON CONFLICT DO NOTHING;
