-- e2e-areas: admin-monetisation

-- Foundations 1, turn F1-6b, part 3 of 7 — THE LEVEL-OVERRIDE DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333;
-- brief docs/governance/briefs/f1-doors-6b.md; census docs/governance/reports/f1-doors-6b.census.md, decision 4).
-- admin_save_level_override and admin_clear_level_override are redeclared WHOLE from their last declarations (live
-- md5s checked): each opens with ONE door_context gate on packages:update in the match form — the save on its own
-- country argument, the clear on the override row's country read before the gate — with the second factor and
-- the staff_config dial, and refuses by door_refuse codes inside the shell. The sentences become codes: unknown
-- level → unknownLevel, not a main category → notMainCategory, unknown country → unknownCountry, bad days →
-- badDays, bad photos → badPhotos, unknown placement → unknownPlacement, empty override → emptyOverride, not found
-- → overrideNotFound. Every write after the checks is unchanged.

DO $pre$
DECLARE
  v_fn  text;
  v_md5 text;
  v_was text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119050100') THEN
    RAISE EXCEPTION 'F1-6b part 3: the mark 20261119050100 must be applied first';
  END IF;
  FOR v_fn, v_was IN VALUES
    ('public.admin_save_level_override(text,uuid,character,integer,smallint,text,boolean)', '3e9f4bbf42a4962c7697d90d70ab79b1'),
    ('public.admin_clear_level_override(uuid)', 'b36a2428334919371725ffe3d28df066')
  LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6b part 3: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_save_level_override (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_save_level_override(p_level_key text, p_category_id uuid DEFAULT NULL::uuid, p_country_code character DEFAULT NULL::bpchar, p_days integer DEFAULT NULL::integer, p_max_photos smallint DEFAULT NULL::smallint, p_placement text DEFAULT NULL::text, p_badge boolean DEFAULT NULL::boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_old public.level_overrides%ROWTYPE;
  v_new public.level_overrides%ROWTYPE;
BEGIN
  -- The door's authority over the market it writes (its own argument; NULL = the row for every market), its second
  -- factor and its dial (staff_config), in one gate before any read of its own.
  PERFORM public.door_context('staff', 'packages', 'update', 'staff_config', p_country_code, 'match');

  -- The level row is the lock for its override rows.
  PERFORM 1 FROM public.listing_packages k WHERE k.key = p_level_key AND k.kind = 'level' FOR UPDATE;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('unknownLevel');
  END IF;
  IF p_category_id IS NOT NULL
     AND (NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_category_id)
          OR EXISTS (SELECT 1 FROM public.category_tree_pointers t
                      WHERE t.child_id = p_category_id AND t.parent_id IS NOT NULL)) THEN
    PERFORM public.door_refuse('notMainCategory');
  END IF;
  IF p_country_code IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = p_country_code) THEN
    PERFORM public.door_refuse('unknownCountry');
  END IF;
  IF p_days IS NOT NULL AND p_days < 1 THEN
    PERFORM public.door_refuse('badDays');
  END IF;
  IF p_max_photos IS NOT NULL AND (p_max_photos < 0 OR p_max_photos > 30) THEN
    PERFORM public.door_refuse('badPhotos');
  END IF;
  IF p_placement IS NOT NULL AND p_placement NOT IN ('standard', 'boost', 'top') THEN
    PERFORM public.door_refuse('unknownPlacement');
  END IF;
  IF p_days IS NULL AND p_max_photos IS NULL AND p_placement IS NULL AND p_badge IS NULL THEN
    PERFORM public.door_refuse('emptyOverride');
  END IF;

  SELECT * INTO v_old FROM public.level_overrides
   WHERE level_key = p_level_key
     AND category_id IS NOT DISTINCT FROM p_category_id
     AND country_code IS NOT DISTINCT FROM p_country_code
   FOR UPDATE;
  INSERT INTO public.level_overrides
    (level_key, category_id, country_code, days, max_photos, placement, badge, created_by, updated_by, updated_at)
  VALUES (p_level_key, p_category_id, p_country_code, p_days, p_max_photos, p_placement, p_badge, v_uid, v_uid, now())
  ON CONFLICT ON CONSTRAINT level_overrides_scope_unique DO UPDATE
    SET days = EXCLUDED.days,
        max_photos = EXCLUDED.max_photos,
        placement = EXCLUDED.placement,
        badge = EXCLUDED.badge,
        updated_by = EXCLUDED.updated_by,
        updated_at = now()
  RETURNING * INTO v_new;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'level_override.saved', 'level_override', v_new.id::text,
            jsonb_build_object(
              'old', CASE WHEN v_old.id IS NULL THEN NULL
                          ELSE to_jsonb(v_old) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at' END,
              'new', to_jsonb(v_new) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at'));

  RETURN jsonb_build_object('ok', true, 'id', v_new.id, 'created', v_old.id IS NULL);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_save_level_override', 'staff_config', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_level_override(text, uuid, character, integer, smallint, text, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_level_override(text, uuid, character, integer, smallint, text, boolean) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_clear_level_override (whole from its last declaration)
CREATE OR REPLACE FUNCTION public.admin_clear_level_override(p_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_old public.level_overrides%ROWTYPE;
  v_scope character(2);
BEGIN
  -- The door's authority over the override's market (the row's country, read before the gate: F1-6a's match
  -- form; a row's country never changes, and an unknown id reads NULL, which a country-only grant never passes),
  -- its second factor and its dial (staff_config), in one gate.
  SELECT o.country_code INTO v_scope FROM public.level_overrides o WHERE o.id = p_id;
  PERFORM public.door_context('staff', 'packages', 'update', 'staff_config', v_scope, 'match');

  SELECT * INTO v_old FROM public.level_overrides WHERE id = p_id FOR UPDATE;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('overrideNotFound');
  END IF;
  DELETE FROM public.level_overrides WHERE id = p_id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'level_override.cleared', 'level_override', p_id::text,
            jsonb_build_object('old', to_jsonb(v_old) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at'));

  RETURN jsonb_build_object('ok', true, 'id', p_id);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_clear_level_override', 'staff_config', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_clear_level_override(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_clear_level_override(uuid) TO authenticated, service_role;

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
  v_main    uuid;
  v_child   uuid;
  v_oz      uuid := gen_random_uuid();
  v_oy      uuid := gen_random_uuid();
  v_oany    uuid := gen_random_uuid();
  v_new     uuid;
BEGIN
  FOR v_fn, v_was IN VALUES
    ('public.admin_save_level_override(text,uuid,character,integer,smallint,text,boolean)', 'a2fffdc32f917e8cf761570129821f9b'),
    ('public.admin_clear_level_override(uuid)', '7c44eb7a9d43d05391fc3ecb762cdedb')
  LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
              OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-6b part 3 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn::regprocedure)
       IS DISTINCT FROM v_was THEN
      RAISE EXCEPTION 'F1-6b part 3 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_tag := 'e2e-mig-f16b-3-' || v_stem;
    v_lv := 'e2e_mig_lv_' || v_stem;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2, v_nocode)) THEN
      RAISE EXCEPTION 'F1-6b part 3 proof: a scratch code (%, % or %) already exists', v_code, v_code2, v_nocode;
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
      RAISE EXCEPTION 'F1-6b part 3 proof: a permission of packages:update is not declared';
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
    VALUES (v_tag || ' main', v_tag || '-m', true, true, false, 9999) RETURNING id INTO v_main;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag || '-l', true, true, true, 9999) RETURNING id INTO v_child;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (NULL, v_main, 9999);
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_main, v_child, 0);
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve,
                                         extends_lifetime, sort)
    VALUES (v_lv, 'level', v_tag, 10, 6, 'boost', false, true, false, false, 9000);
    -- Three overrides: XZ's, XY's, and the main category's for every market.
    INSERT INTO public.level_overrides (id, level_key, category_id, country_code, days) VALUES
      (v_oz, v_lv, NULL, v_code, 5), (v_oy, v_lv, NULL, v_code2, 5), (v_oany, v_lv, v_main, NULL, 5);
    SELECT jsonb_object_agg(d, (SELECT coalesce(sum(r.count), 0) FROM public.door_refusals r
                                 WHERE r.day = current_date AND r.door = d))
      INTO v_base FROM unnest(ARRAY['admin_save_level_override', 'admin_clear_level_override']) d;

    -- (b) every refusal, each with its exact answer: the five gates per door, the market scope (the save's argument,
    --     the clear's row; an unknown row reads no market), then each door's own codes in its order.
    FOR v_who, v_call, v_want, v_status, v_spends IN
      SELECT * FROM (VALUES
      ('none', format('admin_save_level_override(%L, NULL, %L, 3)', v_lv, v_code), 'notSignedIn', '401', false),
      ('plain', format('admin_save_level_override(%L, NULL, %L, 3)', v_lv, v_code), 'permissionDenied', '403', false),
      ('deact', format('admin_save_level_override(%L, NULL, %L, 3)', v_lv, v_code), 'accountDeactivated', '403', false),
      ('nf', format('admin_save_level_override(%L, NULL, %L, 3)', v_lv, v_code), 'step-up required: no verified factor', 'P0009', false),
      ('rl', format('admin_save_level_override(%L, NULL, %L, 3)', v_lv, v_code), 'rateLimited', '429', false),
      ('none', format('admin_clear_level_override(%L)', v_oz), 'notSignedIn', '401', false),
      ('plain', format('admin_clear_level_override(%L)', v_oz), 'permissionDenied', '403', false),
      ('deact', format('admin_clear_level_override(%L)', v_oz), 'accountDeactivated', '403', false),
      ('nf', format('admin_clear_level_override(%L)', v_oz), 'step-up required: no verified factor', 'P0009', false),
      ('rl', format('admin_clear_level_override(%L)', v_oz), 'rateLimited', '429', false),
      ('c', format('admin_save_level_override(%L, NULL, %L, 3)', v_lv, v_code2), 'permissionDenied:scope', '403', false),
      ('c', format('admin_save_level_override(%L, NULL, NULL, 3)', v_lv), 'permissionDenied:scope', '403', false),
      ('c', format('admin_clear_level_override(%L)', v_oy), 'permissionDenied:scope', '403', false),
      ('c', format('admin_clear_level_override(%L)', v_oany), 'permissionDenied:scope', '403', false),
      ('c', format('admin_clear_level_override(%L)', gen_random_uuid()), 'permissionDenied:scope', '403', false),
      ('s', format('admin_save_level_override(%L, NULL, %L, 3)', 'e2e_mig_none_' || v_stem, v_code), 'unknownLevel', '400', true),
      ('s', format('admin_save_level_override(%L, %L, %L, 3)', v_lv, v_child, v_code), 'notMainCategory', '400', true),
      ('s', format('admin_save_level_override(%L, %L, %L, 3)', v_lv, gen_random_uuid(), v_code), 'notMainCategory', '400', true),
      ('s', format('admin_save_level_override(%L, NULL, %L, 3)', v_lv, v_nocode), 'unknownCountry', '400', true),
      ('s', format('admin_save_level_override(%L, NULL, %L, 0)', v_lv, v_code), 'badDays', '400', true),
      ('s', format('admin_save_level_override(%L, NULL, %L, NULL, 31::smallint)', v_lv, v_code), 'badPhotos', '400', true),
      ('s', format('admin_save_level_override(%L, NULL, %L, NULL, NULL, %L)', v_lv, v_code, 'bogus'), 'unknownPlacement', '400', true),
      ('s', format('admin_save_level_override(%L, NULL, %L)', v_lv, v_code), 'emptyOverride', '400', true),
      ('s', format('admin_clear_level_override(%L)', gen_random_uuid()), 'overrideNotFound', '400', true)
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
        RAISE EXCEPTION 'F1-6b part 3 proof (b): % as % answered % (%), not % (%)', v_call, v_who, v_got, v_st,
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
    IF (SELECT count(*) FROM public.level_overrides WHERE level_key = v_lv) <> 3
       OR (SELECT days FROM public.level_overrides WHERE id = v_oz) IS DISTINCT FROM 5
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_s, v_c, v_nf, v_plain, v_deact, v_rl)) THEN
      RAISE EXCEPTION 'F1-6b part 3 proof (c): a refused call wrote a row';
    END IF;

    -- (d) the country holder saves the main category's override in XZ; the global holder rewrites XZ's; the country
    --     holder clears it.
    PERFORM set_config('request.jwt.claims', v_claims ->> 'c', true);
    v_answer := public.admin_save_level_override(v_lv, v_main, v_code, 7);
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR (v_answer ->> 'created')::boolean IS NOT TRUE THEN
      RAISE EXCEPTION 'F1-6b part 3 proof (d): the country holder''s save answered %', v_answer;
    END IF;
    v_new := (v_answer ->> 'id')::uuid;
    v_spent := v_spent || jsonb_build_object('c', coalesce((v_spent ->> 'c')::integer, 0) + 1);
    PERFORM set_config('request.jwt.claims', v_claims ->> 's', true);
    v_answer := public.admin_save_level_override(v_lv, NULL, v_code, 9, 4::smallint);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'id', v_oz, 'created', false) THEN
      RAISE EXCEPTION 'F1-6b part 3 proof (d): the global holder''s save answered %', v_answer;
    END IF;
    v_spent := v_spent || jsonb_build_object('s', coalesce((v_spent ->> 's')::integer, 0) + 1);
    IF (SELECT days <> 9 OR max_photos IS DISTINCT FROM 4::smallint FROM public.level_overrides WHERE id = v_oz) THEN
      RAISE EXCEPTION 'F1-6b part 3 proof (d): XZ''s override was not rewritten';
    END IF;
    PERFORM set_config('request.jwt.claims', v_claims ->> 'c', true);
    v_answer := public.admin_clear_level_override(v_oz);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'id', v_oz) THEN
      RAISE EXCEPTION 'F1-6b part 3 proof (d): the clear answered %', v_answer;
    END IF;
    v_spent := v_spent || jsonb_build_object('c', coalesce((v_spent ->> 'c')::integer, 0) + 1);
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.level_overrides WHERE id = v_oz)
       OR NOT coalesce((SELECT days = 7 AND country_code = v_code AND category_id = v_main AND created_by = v_c
                          FROM public.level_overrides WHERE id = v_new), false)
       OR (SELECT count(*) FROM public.level_overrides WHERE level_key = v_lv) <> 3
       OR (SELECT array_agg(action ORDER BY action) FROM public.audit_log WHERE actor_id = v_c)
            IS DISTINCT FROM ARRAY['level_override.cleared', 'level_override.saved']
       OR (SELECT array_agg(action) FROM public.audit_log WHERE actor_id = v_s)
            IS DISTINCT FROM ARRAY['level_override.saved']
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_nf, v_plain, v_deact, v_rl)) THEN
      RAISE EXCEPTION 'F1-6b part 3 proof (d): the successes'' rows or audit lines differ';
    END IF;

    -- (e) the dial and the meter.
    FOREACH v_who IN ARRAY ARRAY['s', 'c'] LOOP
      SELECT coalesce(sum(l.count), 0)::integer INTO v_count FROM public.rate_limits l
       WHERE l.key = CASE v_who WHEN 's' THEN v_s ELSE v_c END::text AND l.action = 'staff_config';
      IF v_count IS DISTINCT FROM coalesce((v_spent ->> v_who)::integer, 0) THEN
        RAISE EXCEPTION 'F1-6b part 3 proof (e): staff_config counted % for %, expected %', v_count, v_who, v_spent ->> v_who;
      END IF;
    END LOOP;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_nf::text, v_plain::text, v_deact::text))
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_s::text, v_c::text) AND action <> 'staff_config') THEN
      RAISE EXCEPTION 'F1-6b part 3 proof (e): a caller the gate refused, or another dial, was counted';
    END IF;
    FOREACH v_door IN ARRAY ARRAY['admin_save_level_override', 'admin_clear_level_override'] LOOP
      IF (SELECT coalesce(sum(r.count), 0) FROM public.door_refusals r WHERE r.day = current_date AND r.door = v_door)
         IS DISTINCT FROM (v_base ->> v_door)::numeric + coalesce((v_met ->> v_door)::integer, 0) THEN
        RAISE EXCEPTION 'F1-6b part 3 proof (e): door_refusals did not meter %''s % refusals', v_door, v_met ->> v_door;
      END IF;
    END LOOP;

    RAISE EXCEPTION 'f1-6b-part-3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6b-part-3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('response.status', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119050200') ON CONFLICT DO NOTHING;
