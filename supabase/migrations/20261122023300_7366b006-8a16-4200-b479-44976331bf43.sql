-- e2e-areas: admin-locations

-- Cursor bundle 2, part 3 of 5 — THE PLACES LIST TAKES SEVERAL COUNTRIES (DEC-420; brief docs/governance/briefs/cursor-bundle-2.md
-- item 1, ruling docs/governance/briefs/cursor-bundle-2-ruling-1.md answer 4; census docs/governance/reports/cursor-bundle-2.census.md).
-- admin_list_locations takes `p_country_code text[]` where it took one text, read by the list rule (door_filter_countries,
-- part 1, field `country`): NULL or empty is no filter, at most 20 values, each two letters once read as the doors read it,
-- a code naming no market matches no row. Values are OR-ed; the caller's reach stays AND-ed after them. It is redeclared
-- WHOLE from its last declaration (20261115123200 :36, live md5 checked) and changed only where named; the argument's type
-- changes, so it is DROPped and CREATEd and its grants restated as they stand: authenticated (20261115123200) and the service
-- role (20260915232928, which the door guard requires restated after a drop).

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261122040100') THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 3: part 2 (mark 20261122040100) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5
    FROM pg_proc p WHERE p.oid = 'public.admin_list_locations(text,text,text,boolean)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '61bce55bd1c482aec95991d015bfa5f8' THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 3: the live admin_list_locations is not its last declaration''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. admin_list_locations (whole from 20261115123200 :36; the country list)
DROP FUNCTION public.admin_list_locations(text, text, text, boolean);
CREATE FUNCTION public.admin_list_locations(
  p_country_code text[] DEFAULT NULL,
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
  v_countries character(2)[];
BEGIN
  v_ctx := public.door_context('staff-reader', 'locations', 'view', NULL, NULL, 'filter');
  -- cursor-bundle-2 (DEC-420, DEC-423): a country list read by the list rule; NULL or empty is no filter.
  v_countries := public.door_filter_countries(p_country_code, 'country');

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
   WHERE (v_countries IS NULL OR l.country_code = ANY (v_countries))
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
REVOKE ALL ON FUNCTION public.admin_list_locations(text[], text, text, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_locations(text[], text, text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_locations(text[], text, text, boolean) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: the new argument list, the old one gone, STABLE SECURITY DEFINER with search_path public, EXECUTE for
--     authenticated and the service role, never anon or PUBLIC; the body this file's (md5).
-- (b) the lists on scratch places (XZ and XY, each an anchor and a region): two countries OR-ed (case and spaces read as the
--     doors read them), one, NULL and the empty list (every country), a well-formed code naming no market (no row).
-- (c) the refusals, each badValue:country (21 values, a NULL value, a three-letter code); a caller without
--     locations:view is refused before the list is read.
-- (d) the reach: an XZ-scoped holder lists XZ's places in either list form and never XY's.
-- (e) the plan: a country list keeps locations_country_idx.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ' and 'XY': scratch codes no market holds, as earlier proofs' (K4: a recorded proof exception); 'XQ' names no market
  v_xz      character(2) := 'XZ';
  v_xy      character(2) := 'XY';
  v_staff   uuid := gen_random_uuid();
  v_cstaff  uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_role    uuid;
  v_axz     uuid;
  v_axy     uuid;
  v_rz      uuid;
  v_ry      uuid;
  v_fn      regprocedure := 'public.admin_list_locations(text[],text,text,boolean)'::regprocedure;
  v_want    text;
  v_call    text;
  v_who     uuid;
  v_exp     uuid[];
  v_got     uuid[];
  v_msg     text;
  v_st      text;
  v_plan    text;
  v_line    text;
  v_read    text := 'SELECT coalesce(array_agg(r.id ORDER BY r.id), ARRAY[]::uuid[]) FROM public.admin_list_locations(p_search => %L%s) r';
BEGIN
  -- (a)
  IF to_regprocedure('public.admin_list_locations(text,text,text,boolean)') IS NOT NULL THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 3 proof (a): the old argument list stands';
  END IF;
  IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 3 proof (a): % header or grants differ', v_fn;
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM '72ba9a070eabdc79d8a34a25b257d973' THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 3 proof (a): % body differs from this file', v_fn;
  END IF;

  v_tag := 'e2e-mig-b2a2-' || substr(v_hex, 1, 10);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, 'XQ')) THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 3 proof: a scratch country code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', false), (v_xy, v_tag || ' xy', false);
    SELECT l.id INTO STRICT v_axz FROM public.locations l WHERE l.slug LIKE 'e2e-mig-%' AND l.level = 'country' AND l.country_code = v_xz;
    SELECT l.id INTO STRICT v_axy FROM public.locations l WHERE l.slug LIKE 'e2e-mig-%' AND l.level = 'country' AND l.country_code = v_xy;
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, v_tag || '-staff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_cstaff, v_tag || '-cstaff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-locations', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'locations' AND p.action = 'view';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 1 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 3 proof: locations:view is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role, 'country', v_xz);
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, display_order)
    VALUES (v_axz, 'region', v_xz, v_tag || ' rz', v_tag || '-rz', 0) RETURNING id INTO v_rz;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, display_order)
    VALUES (v_axy, 'region', v_xy, v_tag || ' ry', v_tag || '-ry', 0) RETURNING id INTO v_ry;

    -- (b) the lists, as the global holder
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated')::text, true);
    FOR v_call, v_exp IN VALUES
      (format(v_read, v_tag, ''), ARRAY[v_axz, v_rz, v_axy, v_ry]),
      (format(v_read, v_tag, ', p_country_code => NULL'), ARRAY[v_axz, v_rz, v_axy, v_ry]),
      (format(v_read, v_tag, ', p_country_code => ARRAY[]::text[]'), ARRAY[v_axz, v_rz, v_axy, v_ry]),
      (format(v_read, v_tag, ', p_country_code => ARRAY[''XZ'', ''XY'']'), ARRAY[v_axz, v_rz, v_axy, v_ry]),
      (format(v_read, v_tag, ', p_country_code => ARRAY[''xz'', '' XY '', ''XZ'']'), ARRAY[v_axz, v_rz, v_axy, v_ry]),
      (format(v_read, v_tag, ', p_country_code => ARRAY[''XZ'']'), ARRAY[v_axz, v_rz]),
      (format(v_read, v_tag, ', p_country_code => ARRAY[''xy'']'), ARRAY[v_axy, v_ry]),
      (format(v_read, v_tag, ', p_country_code => ARRAY[''XQ'']'), ARRAY[]::uuid[]),
      (format(v_read, v_tag, ', p_country_code => ARRAY[''XZ''], p_level => ''region'''), ARRAY[v_rz])
    LOOP
      EXECUTE v_call INTO v_got;
      IF v_got IS DISTINCT FROM (SELECT coalesce(array_agg(x ORDER BY x), ARRAY[]::uuid[]) FROM unnest(v_exp) x) THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 3 proof (b): % read % (expected %)', v_call, v_got, v_exp;
      END IF;
    END LOOP;

    -- (c) the refusals: the global holder passes the gate and the list rule answers; no permission, no caller first
    FOR v_who, v_call, v_want IN VALUES
      (v_staff, format(v_read, v_tag, ', p_country_code => ARRAY(SELECT ''XZ'' FROM generate_series(1, 21))'), 'badValue:country'),
      (v_staff, format(v_read, v_tag, ', p_country_code => ARRAY[''XYZ'']'), 'badValue:country'),
      (v_staff, format(v_read, v_tag, ', p_country_code => ARRAY[''XZ'', NULL]'), 'badValue:country'),
      (v_plain, format(v_read, v_tag, ', p_country_code => ARRAY[''XYZ'']'), 'permissionDenied'),
      (NULL::uuid, format(v_read, v_tag, ', p_country_code => ARRAY[''XYZ'']'), 'notSignedIn')
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE WHEN v_who IS NULL THEN '{}' ELSE json_build_object('sub', v_who::text, 'role', 'authenticated')::text END, true);
      v_msg := NULL; v_st := NULL;
      -- a reader's refusal is raised as PGRST with the body PostgREST answers (F1-7c); the mark is per call
      PERFORM set_config('door.outer', '', true);
      BEGIN
        EXECUTE v_call INTO v_got;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      IF v_st IS DISTINCT FROM 'PGRST'
         OR v_msg::jsonb IS DISTINCT FROM jsonb_build_object('code', 'P0D01', 'message', v_want) THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 3 proof (c): % answered % (%), not %', v_call, coalesce(v_msg, 'a read'), v_st, v_want;
      END IF;
    END LOOP;
    -- exactly twenty values pass
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated')::text, true);
    EXECUTE format(v_read, v_tag, ', p_country_code => ARRAY(SELECT ''XZ'' FROM generate_series(1, 20))') INTO v_got;
    IF cardinality(v_got) <> 2 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 3 proof (c): twenty equal countries did not read the XZ places';
    END IF;

    -- (d) the reach: the XZ-scoped holder reads XZ's places in either list form, never XY's
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated')::text, true);
    FOR v_call, v_exp IN VALUES
      (format(v_read, v_tag, ''), ARRAY[v_axz, v_rz]),
      (format(v_read, v_tag, ', p_country_code => ARRAY[''XZ'', ''XY'']'), ARRAY[v_axz, v_rz]),
      (format(v_read, v_tag, ', p_country_code => ARRAY[''XY'']'), ARRAY[]::uuid[])
    LOOP
      EXECUTE v_call INTO v_got;
      IF v_got IS DISTINCT FROM (SELECT coalesce(array_agg(x ORDER BY x), ARRAY[]::uuid[]) FROM unnest(v_exp) x) THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 3 proof (d): the XZ holder''s % read % (expected %)', v_call, v_got, v_exp;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (e) the plan: a country list is an index condition on locations_country_idx
    PERFORM set_config('enable_seqscan', 'off', true);
    v_plan := '';
    FOR v_line IN EXECUTE 'EXPLAIN (COSTS OFF) SELECT l.id FROM public.locations l WHERE l.country_code = ANY ($1) AND l.slug LIKE ''e2e-mig-%'''
                  USING public.door_filter_countries(ARRAY['XZ', 'XY'], 'country') LOOP
      v_plan := v_plan || v_line || E'\n';
    END LOOP;
    PERFORM set_config('enable_seqscan', 'on', true);
    IF position('locations_country_idx' IN v_plan) = 0 THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 3 proof (e): a country list does not use locations_country_idx: %', v_plan;
    END IF;

    RAISE EXCEPTION 'cursor-bundle-2-part-3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'cursor-bundle-2-part-3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('door.outer', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261122040200') ON CONFLICT DO NOTHING;
