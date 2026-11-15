-- e2e-areas: admin-locations, admin-countries

-- Foundations 1, turn F1-4b, part 6 of 9 — THE FAMILY'S TWO LISTS ONTO DOOR_CONTEXT (DEC-333; brief
-- docs/governance/briefs/f1-doors-4b.md).
-- admin_list_locations and admin_list_countries are redeclared WHOLE from their last declarations (live md5
-- checked). Each permission check becomes ONE door_context('staff-reader', …, NULL): the place list filter (it now
-- narrows to the caller's countries), the country list global. A reader's refusal raises (P0D01). Return types
-- unchanged: CREATE OR REPLACE. Proofs on scratch countries and places under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_list_locations(text,text,text,boolean)', '7fb54bdec47ee5610eb3ac28a1f13392'],
    ['public.admin_list_countries()', 'f9a13855b567a85a203d3185a9c3620f']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115150400') THEN
    RAISE EXCEPTION 'F1-4b part 6: part 5 (c9452c23) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4b part 6: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 6: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_list_locations (whole from 20260915232928 :43; the gate on door_context)
CREATE OR REPLACE FUNCTION public.admin_list_locations(
  p_country_code text,
  p_search text DEFAULT NULL,
  p_level text DEFAULT NULL,
  p_active boolean DEFAULT NULL)
RETURNS TABLE (
  id uuid, parent_id uuid, level text, country_code char(2),
  region_id uuid, city_id uuid, slug text, name_en text,
  iso_3166_2 text, aliases text[], display_order integer,
  center_lat double precision, center_lng double precision,
  is_active boolean, source text, path text,
  child_count integer, listing_count integer,
  coverage_count integer, profile_default_count integer)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ctx public.door_ctx;
BEGIN
  v_ctx := public.door_context('staff-reader', 'locations', 'view', NULL, NULL, 'filter');

  RETURN QUERY
  SELECT l.id, l.parent_id, l.level, l.country_code,
         l.region_id, l.city_id, l.slug, l.name_en,
         l.iso_3166_2, l.aliases, l.display_order,
         l.center_lat, l.center_lng, l.is_active, l.source,
         array_to_string(
           ARRAY(SELECT a.name_en FROM (
                   SELECT c.name_en, 0 AS ord FROM public.locations c
                    WHERE c.level = 'country' AND c.country_code = l.country_code
                      AND c.id <> l.id
                   UNION ALL
                   SELECT r.name_en, 1 FROM public.locations r WHERE r.id = l.region_id
                   UNION ALL
                   SELECT ci.name_en, 2 FROM public.locations ci WHERE ci.id = l.city_id
                   UNION ALL
                   SELECT l.name_en, 3
                 ) a ORDER BY a.ord), ' › ') AS path,
         (SELECT count(*)::integer FROM public.locations k WHERE k.parent_id = l.id),
         (SELECT count(*)::integer FROM public.listings s WHERE s.location_id = l.id),
         (SELECT count(*)::integer FROM public.listing_locations v WHERE v.location_id = l.id),
         (SELECT count(*)::integer FROM public.profiles pr WHERE pr.default_post_location_id = l.id)
    FROM public.locations l
   WHERE (p_country_code IS NULL OR l.country_code = upper(p_country_code))
     AND (v_ctx.countries IS NULL OR l.country_code = ANY (v_ctx.countries))
     AND (p_level IS NULL OR l.level = p_level)
     AND (p_active IS NULL OR l.is_active = p_active)
     AND (
       p_search IS NULL OR p_search = ''
       OR l.name_en ILIKE '%' || p_search || '%'
       OR l.slug ILIKE '%' || p_search || '%'
       OR EXISTS (SELECT 1 FROM unnest(l.aliases) al WHERE al ILIKE '%' || p_search || '%')
     )
   ORDER BY l.country_code,
            CASE l.level WHEN 'country' THEN 0 WHEN 'region' THEN 1
                         WHEN 'city' THEN 2 ELSE 3 END,
            l.display_order, l.name_en;
END $$;
REVOKE ALL ON FUNCTION public.admin_list_locations(text, text, text, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_locations(text, text, text, boolean) TO authenticated;

-- ------------------------------------------------------------ 2. admin_list_countries (whole from 20260915232928 :174; the gate on door_context)
CREATE OR REPLACE FUNCTION public.admin_list_countries()
RETURNS TABLE (
  code char(2), name_en text, is_active boolean, unit_system text,
  currency_code char(3), display_order integer, updated_at timestamptz,
  anchor_id uuid, anchor_active boolean, place_count integer,
  active_place_count integer, scoped_role_count integer, root_order text[])
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM public.door_context('staff-reader', 'countries', 'view', NULL, NULL, 'global');

  RETURN QUERY
  SELECT c.code, c.name_en, c.is_active, c.unit_system, c.currency_code,
         c.display_order, c.updated_at,
         a.id AS anchor_id,
         coalesce(a.is_active, false) AS anchor_active,
         (SELECT count(*)::integer FROM public.locations l
           WHERE l.country_code = c.code AND l.level <> 'country'),
         (SELECT count(*)::integer FROM public.locations l
           WHERE l.country_code = c.code AND l.level <> 'country' AND l.is_active),
         (SELECT count(*)::integer FROM public.user_roles ur
           WHERE ur.scope_country = c.code),
         coalesce((
           SELECT array_agg(cat.slug ORDER BY cro.position)
             FROM public.country_root_order cro
             JOIN public.categories cat ON cat.id = cro.category_id
            WHERE cro.country_code = c.code
         ), '{}'::text[])
    FROM public.countries c
    LEFT JOIN public.locations a
      ON a.country_code = c.code AND a.level = 'country'
   ORDER BY c.is_active DESC, c.display_order, c.name_en;
END $$;
REVOKE ALL ON FUNCTION public.admin_list_countries() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_countries() TO authenticated;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: the 2 readers STABLE SECURITY DEFINER, EXECUTE for authenticated, never anon or PUBLIC; every
--     body this file's (md5).
-- (b) the gates: each reader raises permissionDenied (P0D01) to a caller without its permission; accountDeactivated
--     and notSignedIn; a country holder is raised permissionDenied:scope by the country list (global).
-- (c) the place list narrows to the country holder's countries (an asked-for other country answers no rows) and
--     answers every country to the global holder; the country list answers the global holder.
-- (d) no reader spends a dial, writes an audit line or meters a refusal.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- scratch codes no market holds (K4 exception, as earlier proofs' 'XZ')
  v_xz      character(2) := 'XZ';
  v_xy      character(2) := 'XY';
  v_xq      character(2) := 'XQ';
  v_staff   uuid := gen_random_uuid();
  v_cstaff  uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess_c  uuid := gen_random_uuid();
  v_sess_d  uuid := gen_random_uuid();
  v_role_l  uuid;
  v_role_c  uuid;
  v_axz     uuid;
  v_axy     uuid;
  v_sxz     text;
  v_sxy     text;
  v_rz1     uuid;
  v_ry1     uuid;
  v_count   integer;
  v_n1      integer;
  v_n2      integer;
  v_refused bigint;
  v_msg     text;
  v_state   text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f14b6-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_list_locations(text,text,text,boolean)', '61bce55bd1c482aec95991d015bfa5f8'],
    ['public.admin_list_countries()', 'af9beabbeba376e12a299f46c498ec8c']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}'
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4b part 6 proof (a): the reader %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 6 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_xq)) THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: a scratch country code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', false), (v_xy, v_tag || ' xy', false);
    SELECT l.id, l.slug INTO STRICT v_axz, v_sxz FROM public.locations l WHERE l.slug LIKE 'e2e-mig-%' AND l.level = 'country' AND l.country_code = v_xz;
    SELECT l.id, l.slug INTO STRICT v_axy, v_sxy FROM public.locations l WHERE l.slug LIKE 'e2e-mig-%' AND l.level = 'country' AND l.country_code = v_xy;
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, v_tag || '-staff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_cstaff, v_tag || '-cstaff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-deact@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_staff, v_cstaff, v_deact]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_sess, v_staff, now(), now(), 'aal2'), (v_sess_c, v_cstaff, now(), now(), 'aal2'), (v_sess_d, v_deact, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess_c, now(), now(), 'totp'),
           (gen_random_uuid(), v_sess_d, now(), now(), 'totp');
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-locations', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'locations' AND p.action IN ('view', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: a locations permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_l, 'global'), (v_deact, v_role_l, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_l, 'country', v_xz);
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-countries', v_tag) RETURNING id INTO v_role_c;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_c, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'countries' AND p.action IN ('view');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_c) <> 1 THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: a countries permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_c, 'global'), (v_deact, v_role_c, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_c, 'country', v_xz);

    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, display_order)
    VALUES (v_axz, 'region', v_xz, v_tag || ' rz1', v_tag || '-rz1', 0) RETURNING id INTO v_rz1;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, display_order)
    VALUES (v_axy, 'region', v_xy, v_tag || ' ry1', v_tag || '-ry1', 0) RETURNING id INTO v_ry1;

    -- (b) the gates: a reader raises its refusal (P0D01); the account, the permission, no caller, then the scope
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_list_locations', 'admin_list_countries');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_d::text)::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_locations(NULL, v_tag, NULL, NULL);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'accountDeactivated' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: (b) a deactivated holder''s list answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_locations(NULL, v_tag, NULL, NULL);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: (b) a list of places without locations:view answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_countries();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: (b) a list of countries without countries:view answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_countries();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'notSignedIn' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: (b) no caller''s list of countries answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_countries();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied:scope' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: (b) a country holder''s list of countries (global) answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;

    -- (c) the answers: the list narrows to the holder's countries
    SELECT count(*) FILTER (WHERE r.country_code = v_xy), count(*) FILTER (WHERE r.id IN (v_axz, v_rz1))
      INTO v_n1, v_n2 FROM public.admin_list_locations(NULL, v_tag, NULL, NULL) r;
    IF NOT coalesce(v_n1 = 0 AND v_n2 = 2, false) THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: (c) the country holder''s list is not his country''s';
    END IF;
    SELECT count(*) INTO v_n1 FROM public.admin_list_locations(v_xy::text, v_tag, NULL, NULL) r;
    IF NOT coalesce(v_n1 = 0, false) THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: (c) the country holder''s list of another country is not empty';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT count(*) FILTER (WHERE r.country_code = v_xy), count(*) FILTER (WHERE r.country_code = v_xz)
      INTO v_n1, v_n2 FROM public.admin_list_locations(NULL, v_tag, NULL, NULL) r;
    IF NOT coalesce(v_n1 = 2 AND v_n2 = 2, false) THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: (c) the global holder''s list is not every country''s';
    END IF;
    SELECT count(*) INTO v_n1 FROM public.admin_list_countries() r WHERE r.code IN (v_xz, v_xy);
    IF NOT coalesce(v_n1 = 2, false) THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: (c) the global holder''s list of countries lacks the scratch countries';
    END IF;

    -- (d) a reader spends no dial, writes no audit line and meters nothing
    IF NOT coalesce(NOT EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_staff::text, v_cstaff::text, v_plain::text, v_deact::text)), false) THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: (d) a reader spent a dial';
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_staff;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: the staff caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_cstaff;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: the cstaff caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_plain;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: the plain caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_deact;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: the deact caller wrote % audit lines (expected 0)', v_count;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_list_locations', 'admin_list_countries')) IS DISTINCT FROM v_refused + 0 THEN
      RAISE EXCEPTION 'F1-4b part 6 proof: door_refusals did not meter the 0 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14b6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14b6-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115150500') ON CONFLICT DO NOTHING;
