-- e2e-areas: admin-monetisation

-- Foundations 1, turn F1-6b, part 4 of 7 — THE PRODUCT AND MARKET DOORS ONTO DOOR_CONTEXT AND THE SHELL
-- (DEC-333; brief docs/governance/briefs/f1-doors-6b.md; census docs/governance/reports/f1-doors-6b.census.md).
-- admin_save_listing_package and admin_save_market_settings are redeclared WHOLE from their last declarations
-- (live md5s checked): each opens with ONE door_context gate on packages:update — the product in the global form
-- (a product serves every market), the market's settings in the match form on its own country argument — with
-- the second factor and the staff_config dial, and refuses by door_refuse codes inside the shell. The sentences
-- become codes: bad key → badKey, unknown kind → unknownKind, bad name → badName, bad days → badDays, kind change
-- → kindChange, caps on level → capsOnLevel, bad photos → badPhotos, unknown placement → unknownPlacement, perks
-- on reach → perksOnReach, bad caps → badCaps, unknown country → unknownCountry, bad free ads → badFreeAds,
-- unknown reach → unknownReach, launch bundle required → launchRequired, bad launch bundle → badLaunch. Every
-- write after the checks is unchanged.

DO $pre$
DECLARE
  v_fn  text;
  v_md5 text;
  v_was text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119050200') THEN
    RAISE EXCEPTION 'F1-6b part 4: the mark 20261119050200 must be applied first';
  END IF;
  FOR v_fn, v_was IN VALUES
    ('public.admin_save_listing_package(text,text,text,integer,boolean,boolean,boolean,text,smallint,text,boolean,integer,jsonb)', '61aa36df2245ba685201bb0dc33e28ca'),
    ('public.admin_save_market_settings(integer,text,boolean,character,integer,integer)', '099dd961a52251a050eb2aafa2521bcd')
  LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6b part 4: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_save_listing_package (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_save_listing_package(p_key text, p_kind text, p_name_en text, p_days integer, p_enabled boolean, p_self_serve boolean, p_extends_lifetime boolean, p_name_am text DEFAULT NULL::text, p_max_photos smallint DEFAULT NULL::smallint, p_placement text DEFAULT NULL::text, p_badge boolean DEFAULT NULL::boolean, p_sort integer DEFAULT NULL::integer, p_caps jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_old    public.listing_packages%ROWTYPE;
  v_new    public.listing_packages%ROWTYPE;
  v_photos smallint;
  v_place  text;
  v_badge  boolean;
  v_am     text;
  v_cities    integer;
  v_regions   integer;
  v_countries integer;
BEGIN
  -- The door's authority (a product serves every market: only a global grant passes), its second factor and its
  -- dial (staff_config), in one gate before any read of its own.
  PERFORM public.door_context('staff', 'packages', 'update', 'staff_config', NULL, 'global');

  IF coalesce(p_key, '') !~ '^[a-z][a-z0-9_]{1,31}$' THEN
    PERFORM public.door_refuse('badKey');
  END IF;
  IF p_kind IS NULL OR p_kind NOT IN ('level', 'reach') THEN
    PERFORM public.door_refuse('unknownKind');
  END IF;
  IF btrim(coalesce(p_name_en, '')) = '' OR length(p_name_en) > 80 OR length(coalesce(p_name_am, '')) > 80 THEN
    PERFORM public.door_refuse('badName');
  END IF;
  IF coalesce(p_days, 0) < 1 THEN
    PERFORM public.door_refuse('badDays');
  END IF;

  SELECT * INTO v_old FROM public.listing_packages WHERE key = p_key FOR UPDATE;
  -- A product's kind never changes once the row exists (ruling 2).
  IF v_old.key IS NOT NULL AND v_old.kind <> p_kind THEN
    PERFORM public.door_refuse('kindChange');
  END IF;
  -- A NULL Amharic name keeps the stored one; a blank clears it.
  v_am := CASE WHEN p_name_am IS NULL THEN v_old.name_am ELSE nullif(btrim(p_name_am), '') END;
  IF p_kind = 'level' THEN
    -- P-2 (c) M-3c-b (DEC-356): a level has no place caps.
    IF p_caps IS NOT NULL THEN
      PERFORM public.door_refuse('capsOnLevel');
    END IF;
    v_cities := NULL;
    v_regions := NULL;
    v_countries := NULL;
    -- A level's perks: a NULL keeps the stored value; the row must end with every perk set.
    v_photos := coalesce(p_max_photos, v_old.max_photos);
    v_place := coalesce(p_placement, v_old.placement);
    v_badge := coalesce(p_badge, v_old.badge, false);
    IF v_photos IS NULL OR v_photos < 0 OR v_photos > 30 THEN
      PERFORM public.door_refuse('badPhotos');
    END IF;
    IF v_place IS NULL OR v_place NOT IN ('standard', 'boost', 'top') THEN
      PERFORM public.door_refuse('unknownPlacement');
    END IF;
  ELSE
    IF p_max_photos IS NOT NULL OR p_placement IS NOT NULL OR coalesce(p_badge, false) THEN
      PERFORM public.door_refuse('perksOnReach');
    END IF;
    v_photos := NULL;
    v_place := NULL;
    v_badge := false;
    -- P-2 (c) M-3c-b (DEC-356): a reach row's caps — a NULL p_caps keeps the stored ones, and a new row
    -- must state them; given, an object of exactly the three keys, each a JSON null (no limit) or a whole
    -- number of at least 1, set exactly.
    IF p_caps IS NULL THEN
      IF v_old.key IS NULL THEN
        PERFORM public.door_refuse('badCaps');
      END IF;
      v_cities := v_old.max_cities;
      v_regions := v_old.max_regions;
      v_countries := v_old.max_countries;
    ELSE
      IF jsonb_typeof(p_caps) IS DISTINCT FROM 'object' THEN
        PERFORM public.door_refuse('badCaps');
      END IF;
      IF (SELECT array_agg(k ORDER BY k) FROM jsonb_object_keys(p_caps) k)
           IS DISTINCT FROM ARRAY['max_cities', 'max_countries', 'max_regions']
         OR EXISTS (SELECT 1 FROM jsonb_each(p_caps) e
                     WHERE jsonb_typeof(e.value) <> 'null'
                       AND (jsonb_typeof(e.value) <> 'number' OR e.value::text !~ '^[1-9][0-9]{0,8}$')) THEN
        PERFORM public.door_refuse('badCaps');
      END IF;
      v_cities := (p_caps->>'max_cities')::integer;
      v_regions := (p_caps->>'max_regions')::integer;
      v_countries := (p_caps->>'max_countries')::integer;
    END IF;
  END IF;

  INSERT INTO public.listing_packages
    (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort, created_by, updated_by, updated_at,
     max_cities, max_regions, max_countries)
  VALUES (p_key, p_kind, btrim(p_name_en), v_am, p_days, v_photos, v_place, v_badge,
          coalesce(p_enabled, true), coalesce(p_self_serve, false), coalesce(p_extends_lifetime, true),
          coalesce(p_sort, v_old.sort, 0), v_uid, v_uid, now(),
          v_cities, v_regions, v_countries)
  ON CONFLICT (key) DO UPDATE
    SET kind = EXCLUDED.kind,
        name_en = EXCLUDED.name_en,
        name_am = EXCLUDED.name_am,
        days = EXCLUDED.days,
        max_photos = EXCLUDED.max_photos,
        placement = EXCLUDED.placement,
        badge = EXCLUDED.badge,
        enabled = EXCLUDED.enabled,
        self_serve = EXCLUDED.self_serve,
        extends_lifetime = EXCLUDED.extends_lifetime,
        sort = EXCLUDED.sort,
        max_cities = EXCLUDED.max_cities,
        max_regions = EXCLUDED.max_regions,
        max_countries = EXCLUDED.max_countries,
        updated_by = EXCLUDED.updated_by,
        updated_at = now()
  RETURNING * INTO v_new;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'package.saved', 'listing_package', p_key,
            jsonb_build_object(
              'old', CASE WHEN v_old.key IS NULL THEN NULL
                          ELSE to_jsonb(v_old) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at' END,
              'new', to_jsonb(v_new) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at'));

  RETURN jsonb_build_object('ok', true, 'key', p_key, 'created', v_old.key IS NULL);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_save_listing_package', 'staff_config', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_listing_package(text, text, text, integer, boolean, boolean, boolean, text, smallint, text, boolean, integer, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_listing_package(text, text, text, integer, boolean, boolean, boolean, text, smallint, text, boolean, integer, jsonb) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_save_market_settings (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_save_market_settings(p_free_regular_ads integer, p_included_reach text, p_paid_levels boolean, p_country_code character DEFAULT NULL::bpchar, p_launch_credits integer DEFAULT NULL::integer, p_launch_days integer DEFAULT NULL::integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_on    boolean := coalesce(p_paid_levels, false);
  v_old   public.market_settings%ROWTYPE;
  v_new   public.market_settings%ROWTYPE;
  v_since timestamptz;
BEGIN
  -- The door's authority over the market it writes (its own argument; NULL = the row for every market), its second
  -- factor and its dial (staff_config), in one gate before any read of its own.
  PERFORM public.door_context('staff', 'packages', 'update', 'staff_config', p_country_code, 'match');

  IF p_country_code IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = p_country_code) THEN
    PERFORM public.door_refuse('unknownCountry');
  END IF;
  IF p_free_regular_ads IS NULL OR p_free_regular_ads < 0 THEN
    PERFORM public.door_refuse('badFreeAds');
  END IF;
  -- The reach row is the lock: an enabled reach product only.
  PERFORM 1 FROM public.listing_packages k WHERE k.key = p_included_reach AND k.kind = 'reach' AND k.enabled FOR UPDATE;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('unknownReach');
  END IF;
  IF v_on AND (p_launch_credits IS NULL OR p_launch_days IS NULL) THEN
    PERFORM public.door_refuse('launchRequired');
  END IF;
  IF (p_launch_credits IS NOT NULL AND p_launch_credits < 1) OR (p_launch_days IS NOT NULL AND p_launch_days < 1) THEN
    PERFORM public.door_refuse('badLaunch');
  END IF;

  SELECT * INTO v_old FROM public.market_settings WHERE country_code IS NOT DISTINCT FROM p_country_code FOR UPDATE;
  v_since := CASE WHEN NOT v_on THEN NULL
                  WHEN v_old.paid_levels THEN v_old.paid_levels_since
                  ELSE now() END;
  INSERT INTO public.market_settings
    (country_code, free_regular_ads, included_reach, paid_levels, paid_levels_since, launch_credits, launch_days, created_by, updated_by, updated_at)
  VALUES (p_country_code, p_free_regular_ads, p_included_reach, v_on, v_since, p_launch_credits, p_launch_days, v_uid, v_uid, now())
  ON CONFLICT ON CONSTRAINT market_settings_scope_unique DO UPDATE
    SET free_regular_ads = EXCLUDED.free_regular_ads,
        included_reach = EXCLUDED.included_reach,
        paid_levels = EXCLUDED.paid_levels,
        paid_levels_since = EXCLUDED.paid_levels_since,
        launch_credits = EXCLUDED.launch_credits,
        launch_days = EXCLUDED.launch_days,
        updated_by = EXCLUDED.updated_by,
        updated_at = now()
  RETURNING * INTO v_new;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'market.saved', 'market_settings', v_new.id::text,
            jsonb_build_object(
              'old', CASE WHEN v_old.id IS NULL THEN NULL
                          ELSE to_jsonb(v_old) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at' END,
              'new', to_jsonb(v_new) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at'));

  RETURN jsonb_build_object('ok', true, 'id', v_new.id, 'created', v_old.id IS NULL);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_save_market_settings', 'staff_config', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_market_settings(integer, text, boolean, character, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_market_settings(integer, text, boolean, character, integer, integer) TO authenticated, service_role;

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
  v_lv      text;
  v_r       text;
  v_new     text;
  v_new2    text;
BEGIN
  FOR v_fn, v_was IN VALUES
    ('public.admin_save_listing_package(text,text,text,integer,boolean,boolean,boolean,text,smallint,text,boolean,integer,jsonb)', '21d53ab14f2622e084c722a6ac5525c6'),
    ('public.admin_save_market_settings(integer,text,boolean,character,integer,integer)', '9d7a6d5a3def8e5ed80a8e1394ce153b')
  LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
              OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6b part 4 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn::regprocedure)
       IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6b part 4 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_tag := 'e2e-mig-f16b-4-' || v_stem;
    v_lv := 'e2e_mig_lv_' || v_stem;
    v_r := 'e2e_mig_rc_' || v_stem;
    v_new := 'e2e_mig_nl_' || v_stem;
    v_new2 := 'e2e_mig_nr_' || v_stem;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2, v_nocode)) THEN
      RAISE EXCEPTION 'F1-6b part 4 proof: a scratch code (%, % or %) already exists', v_code, v_code2, v_nocode;
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
     WHERE (r.name, p.action) IN (('packages', 'update'));
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 1 THEN
      RAISE EXCEPTION 'F1-6b part 4 proof: a permission of packages:update is not declared';
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
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve,
                                         extends_lifetime, sort) VALUES
      (v_lv, 'level', v_tag, 10, 6, 'boost', false, true, false, false, 9000),
      (v_r, 'reach', v_tag, 30, NULL, NULL, false, true, false, false, 9001);
    SELECT jsonb_object_agg(d, (SELECT coalesce(sum(r.count), 0) FROM public.door_refusals r
                                 WHERE r.day = current_date AND r.door = d))
      INTO v_base FROM unnest(ARRAY['admin_save_listing_package', 'admin_save_market_settings']) d;

    -- (b) every refusal, each with its exact answer: the five gates per door, the scope (a product serves every
    --     market, so only a global grant passes; a market's settings, its own argument), then each door's own codes
    --     in its order.
    FOR v_who, v_call, v_want, v_status, v_spends IN
      SELECT * FROM (VALUES
      ('none', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false)', v_lv, 'level', v_tag), 'notSignedIn', '401', false),
      ('plain', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false)', v_lv, 'level', v_tag), 'permissionDenied', '403', false),
      ('deact', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false)', v_lv, 'level', v_tag), 'accountDeactivated', '403', false),
      ('nf', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false)', v_lv, 'level', v_tag), 'step-up required: no verified factor', 'P0009', false),
      ('rl', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false)', v_lv, 'level', v_tag), 'rateLimited', '429', false),
      ('none', format('admin_save_market_settings(3, %L, false, %L)', v_r, v_code), 'notSignedIn', '401', false),
      ('plain', format('admin_save_market_settings(3, %L, false, %L)', v_r, v_code), 'permissionDenied', '403', false),
      ('deact', format('admin_save_market_settings(3, %L, false, %L)', v_r, v_code), 'accountDeactivated', '403', false),
      ('nf', format('admin_save_market_settings(3, %L, false, %L)', v_r, v_code), 'step-up required: no verified factor', 'P0009', false),
      ('rl', format('admin_save_market_settings(3, %L, false, %L)', v_r, v_code), 'rateLimited', '429', false),
      ('c', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false)', v_lv, 'level', v_tag), 'permissionDenied:scope', '403', false),
      ('c', format('admin_save_market_settings(3, %L, false, %L)', v_r, v_code2), 'permissionDenied:scope', '403', false),
      ('c', format('admin_save_market_settings(3, %L, false)', v_r), 'permissionDenied:scope', '403', false),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false)', 'Bad-Key', 'level', v_tag), 'badKey', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false)', v_new, 'bogus', v_tag), 'unknownKind', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false)', v_new, 'level', ''), 'badName', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false)', v_new, 'level', repeat('n', 81)), 'badName', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 0, true, false, false)', v_new, 'level', v_tag), 'badDays', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false)', v_lv, 'reach', v_tag), 'kindChange', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false, NULL, 6::smallint, %L, false, NULL, %L::jsonb)', v_new, 'level', v_tag, 'boost', '{}'), 'capsOnLevel', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false, NULL, 31::smallint, %L)', v_new, 'level', v_tag, 'boost'), 'badPhotos', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false, NULL, 6::smallint, %L)', v_new, 'level', v_tag, 'bogus'), 'unknownPlacement', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false, NULL, 6::smallint)', v_new2, 'reach', v_tag), 'perksOnReach', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false)', v_new2, 'reach', v_tag), 'badCaps', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false, NULL, NULL, NULL, NULL, NULL, %L::jsonb)', v_new2, 'reach', v_tag, '[]'), 'badCaps', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false, NULL, NULL, NULL, NULL, NULL, %L::jsonb)', v_new2, 'reach', v_tag, '{"max_cities": null}'), 'badCaps', '400', true),
      ('s', format('admin_save_listing_package(%L, %L, %L, 10, true, false, false, NULL, NULL, NULL, NULL, NULL, %L::jsonb)', v_new2, 'reach', v_tag, '{"max_cities": 0, "max_regions": null, "max_countries": null}'), 'badCaps', '400', true),
      ('s', format('admin_save_market_settings(3, %L, false, %L)', v_r, v_nocode), 'unknownCountry', '400', true),
      ('s', format('admin_save_market_settings(-1, %L, false, %L)', v_r, v_code), 'badFreeAds', '400', true),
      ('s', format('admin_save_market_settings(3, %L, false, %L)', v_r || 'x', v_code), 'unknownReach', '400', true),
      ('s', format('admin_save_market_settings(3, %L, false, %L)', v_lv, v_code), 'unknownReach', '400', true),
      ('s', format('admin_save_market_settings(3, %L, true, %L)', v_r, v_code), 'launchRequired', '400', true),
      ('s', format('admin_save_market_settings(3, %L, false, %L, 0, 5)', v_r, v_code), 'badLaunch', '400', true)
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
        RAISE EXCEPTION 'F1-6b part 4 proof (b): % as % answered % (%), not % (%)', v_call, v_who, v_got, v_st,
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
    IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key IN (v_new, v_new2))
       OR (SELECT kind FROM public.listing_packages WHERE key = v_lv) IS DISTINCT FROM 'level'
       OR EXISTS (SELECT 1 FROM public.market_settings WHERE country_code IN (v_code, v_code2))
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_s, v_c, v_nf, v_plain, v_deact, v_rl)) THEN
      RAISE EXCEPTION 'F1-6b part 4 proof (c): a refused call wrote a row';
    END IF;

    -- (d) the global holder creates a level and a reach product; the country holder saves XZ's settings.
    PERFORM set_config('request.jwt.claims', v_claims ->> 's', true);
    v_answer := public.admin_save_listing_package(v_new, 'level', v_tag, 10, true, false, false, NULL, 6::smallint, 'boost');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'key', v_new, 'created', true) THEN
      RAISE EXCEPTION 'F1-6b part 4 proof (d): the level''s save answered %', v_answer;
    END IF;
    v_spent := v_spent || jsonb_build_object('s', coalesce((v_spent ->> 's')::integer, 0) + 1);
    v_answer := public.admin_save_listing_package(v_new2, 'reach', v_tag, 10, true, false, false, NULL, NULL, NULL, NULL,
                                                  NULL, '{"max_cities": 2, "max_regions": null, "max_countries": null}');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'key', v_new2, 'created', true) THEN
      RAISE EXCEPTION 'F1-6b part 4 proof (d): the reach''s save answered %', v_answer;
    END IF;
    v_spent := v_spent || jsonb_build_object('s', coalesce((v_spent ->> 's')::integer, 0) + 1);
    PERFORM set_config('request.jwt.claims', v_claims ->> 'c', true);
    v_answer := public.admin_save_market_settings(3, v_r, true, v_code, 2, 30);
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR (v_answer ->> 'created')::boolean IS NOT TRUE THEN
      RAISE EXCEPTION 'F1-6b part 4 proof (d): XZ''s settings answered %', v_answer;
    END IF;
    v_spent := v_spent || jsonb_build_object('c', coalesce((v_spent ->> 'c')::integer, 0) + 1);
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF NOT coalesce((SELECT kind = 'level' AND max_photos = 6 AND placement = 'boost' AND created_by = v_s
                       FROM public.listing_packages WHERE key = v_new), false)
       OR NOT coalesce((SELECT kind = 'reach' AND max_cities = 2 AND max_regions IS NULL AND max_countries IS NULL
                          FROM public.listing_packages WHERE key = v_new2), false)
       OR NOT coalesce((SELECT paid_levels AND paid_levels_since IS NOT NULL AND launch_credits = 2 AND launch_days = 30
                               AND free_regular_ads = 3 AND included_reach = v_r AND updated_by = v_c
                          FROM public.market_settings WHERE country_code = v_code), false)
       OR (SELECT array_agg(action) FROM public.audit_log WHERE actor_id = v_s)
            IS DISTINCT FROM ARRAY['package.saved', 'package.saved']
       OR (SELECT array_agg(action) FROM public.audit_log WHERE actor_id = v_c) IS DISTINCT FROM ARRAY['market.saved']
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_nf, v_plain, v_deact, v_rl)) THEN
      RAISE EXCEPTION 'F1-6b part 4 proof (d): the successes'' rows or audit lines differ';
    END IF;

    -- (e) the dial and the meter.
    FOREACH v_who IN ARRAY ARRAY['s', 'c'] LOOP
      SELECT coalesce(sum(l.count), 0)::integer INTO v_count FROM public.rate_limits l
       WHERE l.key = CASE v_who WHEN 's' THEN v_s ELSE v_c END::text AND l.action = 'staff_config';
      IF v_count IS DISTINCT FROM coalesce((v_spent ->> v_who)::integer, 0) THEN
        RAISE EXCEPTION 'F1-6b part 4 proof (e): staff_config counted % for %, expected %', v_count, v_who, v_spent ->> v_who;
      END IF;
    END LOOP;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_nf::text, v_plain::text, v_deact::text))
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_s::text, v_c::text) AND action <> 'staff_config') THEN
      RAISE EXCEPTION 'F1-6b part 4 proof (e): a caller the gate refused, or another dial, was counted';
    END IF;
    FOREACH v_door IN ARRAY ARRAY['admin_save_listing_package', 'admin_save_market_settings'] LOOP
      IF (SELECT coalesce(sum(r.count), 0) FROM public.door_refusals r WHERE r.day = current_date AND r.door = v_door)
         IS DISTINCT FROM (v_base ->> v_door)::numeric + coalesce((v_met ->> v_door)::integer, 0) THEN
        RAISE EXCEPTION 'F1-6b part 4 proof (e): door_refusals did not meter %''s % refusals', v_door, v_met ->> v_door;
      END IF;
    END LOOP;

    RAISE EXCEPTION 'f1-6b-part-4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6b-part-4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('response.status', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119050300') ON CONFLICT DO NOTHING;
