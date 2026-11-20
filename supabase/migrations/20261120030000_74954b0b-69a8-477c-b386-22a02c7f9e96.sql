-- e2e-areas: admin-locations, admin-imports

-- Foundations 1, turn F1-7b, part 1 of 8 — THE PLACES TABLE'S OWN RULES BY CODES (DEC-333, F1-4b decision 8,
-- INC-1179; brief docs/governance/briefs/f1-doors-7b.md; census docs/governance/reports/f1-doors-7b.census.md).
-- locations_ancestry_guard() is redeclared WHOLE and written out from its live body (DEC-383; live md5 checked),
-- byte for byte apart from two named changes: its seven plain raises become door_refuse with the same words
-- (SQLSTATE P0D01, the same message text), so every writer's shell answers each as a refusal; and one rule — a
-- latitude outside -90..90 or a longitude outside -180..180 is refused as badCoordinates (NaN and the infinities
-- compare outside). Header, owner and grants as live; the trigger itself is untouched.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119170900') THEN
    RAISE EXCEPTION 'F1-7b part 1: the mark 20261119170900 must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.locations_ancestry_guard()'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'b48ccd384604f2f5e27270a75afc7eec' THEN
    RAISE EXCEPTION 'F1-7b part 1: the live locations_ancestry_guard is not the body this file was built from (%)', v_md5;
  END IF;
END $pre$;

CREATE OR REPLACE FUNCTION public.locations_ancestry_guard()
RETURNS trigger
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_parent public.locations;
  v_rank   int;
  v_prank  int;
BEGIN
  IF (NEW.parent_id IS NULL) <> (NEW.level = 'country') THEN
    PERFORM public.door_refuse('rootMustBeCountry');
  END IF;

  IF NEW.slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$' THEN
    PERFORM public.door_refuse('badSlug');
  END IF;

  IF NEW.level IN ('city','sub_city')
     AND (NEW.center_lat IS NULL OR NEW.center_lng IS NULL) THEN
    PERFORM public.door_refuse('missingCoordinates');
  END IF;

  -- INC-1179: a coordinate lies on the globe (NaN and the infinities compare outside).
  IF abs(NEW.center_lat) > 90 OR abs(NEW.center_lng) > 180 THEN
    PERFORM public.door_refuse('badCoordinates');
  END IF;

  v_rank := CASE NEW.level
              WHEN 'country' THEN 0 WHEN 'region' THEN 1
              WHEN 'city' THEN 2 WHEN 'sub_city' THEN 3 END;

  IF NEW.parent_id IS NULL THEN
    NEW.region_id := NULL;
    NEW.city_id := NULL;
    RETURN NEW;
  END IF;

  SELECT * INTO v_parent FROM public.locations WHERE id = NEW.parent_id;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('parentMissing');
  END IF;

  v_prank := CASE v_parent.level
               WHEN 'country' THEN 0 WHEN 'region' THEN 1
               WHEN 'city' THEN 2 WHEN 'sub_city' THEN 3 END;
  IF v_rank IS DISTINCT FROM v_prank + 1 THEN
    PERFORM public.door_refuse('levelMismatch');
  END IF;

  IF NEW.country_code <> v_parent.country_code THEN
    PERFORM public.door_refuse('crossCountry');
  END IF;

  -- INC-209: the ANCHOR is exempt. A market's tree is prepared while the market is
  -- closed (the anchor is inactive); the path rule keeps it hidden. Below the anchor
  -- the rule is unchanged: a city under a retired region is still refused.
  IF NEW.is_active AND NOT v_parent.is_active AND v_parent.level <> 'country' THEN
    PERFORM public.door_refuse('parentInactive');
  END IF;

  -- FILL, ignoring whatever the caller sent.
  IF NEW.level = 'region' THEN
    NEW.region_id := NULL;
    NEW.city_id := NULL;
  ELSIF NEW.level = 'city' THEN
    NEW.region_id := v_parent.id;
    NEW.city_id := NULL;
  ELSE
    NEW.region_id := v_parent.region_id;
    NEW.city_id := v_parent.id;
  END IF;

  RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION public.locations_ancestry_guard() FROM PUBLIC, anon, authenticated;

-- PROOFS (under a sentinel rollback; scratch countries and places only, never a real row):
-- (a) the body is this file's (md5), DEFINER, VOLATILE, search_path public, no browser EXECUTE; the trigger stands.
-- (b) each of the eight codes from a direct INSERT and a direct UPDATE: SQLSTATE P0D01 with the code as the whole
--     message (the raw P0001 is absent); the edges -90/90 and -180/180 pass.
-- (c) through a door's shell: admin_upsert_location's create at latitude 95 and admin_set_location_active's
--     activation under a retired region answer {ok:false} with the code at 400, nothing written, each metered.
-- (d) the cost bar (F1-1 ruling 7 §1): the median of 50 single-row updates of a scratch place, every trigger of
--     the table included, stays under 5 ms.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- scratch codes no market holds (K4 exception, as earlier proofs' 'XZ')
  v_xz      character(2) := 'XZ';
  v_xy      character(2) := 'XY';
  v_staff   uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_role    uuid;
  v_axz     uuid;
  v_reg     uuid;
  v_off     uuid;
  v_city    uuid;
  v_shut    uuid;
  v_answer  jsonb;
  v_refused bigint;
  v_msg     text;
  v_cases   text[][];
  v_ms      double precision[] := '{}';
  v_t0      timestamptz;
  v_median  double precision;
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f17b1-' || substr(v_hex, 1, 10);
  -- (a)
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) IS DISTINCT FROM '43e35d1f96cd1628eb1b169b5d3b610f'
             OR NOT p.prosecdef OR p.provolatile <> 'v' OR p.proconfig::text <> '{search_path=public}'
        FROM pg_proc p WHERE p.oid = 'public.locations_ancestry_guard()'::regprocedure)
     OR has_function_privilege('anon', 'public.locations_ancestry_guard()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.locations_ancestry_guard()', 'EXECUTE')
     OR NOT EXISTS (SELECT 1 FROM pg_trigger t
                     WHERE t.tgrelid = 'public.locations'::regclass AND t.tgname = 'locations_ancestry_guard'
                       AND t.tgfoid = 'public.locations_ancestry_guard()'::regprocedure AND t.tgenabled <> 'D') THEN
    RAISE EXCEPTION 'F1-7b part 1 proof (a): the guard''s body, header, grants or trigger differ';
  END IF;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy)) THEN
      RAISE EXCEPTION 'F1-7b part 1 proof: a scratch country code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', false), (v_xy, v_tag || ' xy', false);
    SELECT l.id INTO STRICT v_axz FROM public.locations l
     WHERE l.slug LIKE 'e2e-mig-%' AND l.level = 'country' AND l.country_code = v_xz;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
    VALUES (v_axz, 'region', v_xz, v_tag || ' r', v_tag || '-r', true, 'admin') RETURNING id INTO v_reg;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
    VALUES (v_axz, 'region', v_xz, v_tag || ' off', v_tag || '-off', false, 'admin') RETURNING id INTO v_off;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
    VALUES (v_reg, 'city', v_xz, v_tag || ' c', v_tag || '-c', true, 'admin', 9.0, 38.7) RETURNING id INTO v_city;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
    VALUES (v_off, 'city', v_xz, v_tag || ' s', v_tag || '-s', false, 'admin', 9.1, 38.8) RETURNING id INTO v_shut;

    -- (b) every code, from an insert and from an update
    v_cases := ARRAY[
      ['rootMustBeCountry', format('INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source) VALUES (NULL, ''region'', %L, %L, %L, false, ''admin'')', v_xz, v_tag || ' x', v_tag || '-x1')],
      ['rootMustBeCountry', format('UPDATE public.locations SET parent_id = NULL WHERE slug LIKE ''e2e-mig-%%'' AND id = %L', v_reg)],
      ['badSlug', format('INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source) VALUES (%L, ''region'', %L, %L, ''Bad Slug'', false, ''admin'')', v_axz, v_xz, v_tag || ' x')],
      ['badSlug', format('UPDATE public.locations SET slug = ''Bad Slug'' WHERE slug LIKE ''e2e-mig-%%'' AND id = %L', v_city)],
      ['missingCoordinates', format('INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng) VALUES (%L, ''city'', %L, %L, %L, false, ''admin'', NULL, 38.0)', v_reg, v_xz, v_tag || ' x', v_tag || '-x2')],
      ['missingCoordinates', format('UPDATE public.locations SET center_lng = NULL WHERE slug LIKE ''e2e-mig-%%'' AND id = %L', v_city)],
      ['badCoordinates', format('INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng) VALUES (%L, ''city'', %L, %L, %L, false, ''admin'', 90.5, 38.0)', v_reg, v_xz, v_tag || ' x', v_tag || '-x3')],
      ['badCoordinates', format('INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng) VALUES (%L, ''city'', %L, %L, %L, false, ''admin'', 9.0, -180.5)', v_reg, v_xz, v_tag || ' x', v_tag || '-x4')],
      ['badCoordinates', format('INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng) VALUES (%L, ''region'', %L, %L, %L, false, ''admin'', ''NaN'', NULL)', v_axz, v_xz, v_tag || ' x', v_tag || '-x5')],
      ['badCoordinates', format('UPDATE public.locations SET center_lat = -90.5 WHERE slug LIKE ''e2e-mig-%%'' AND id = %L', v_city)],
      ['badCoordinates', format('UPDATE public.locations SET center_lng = 180.5 WHERE slug LIKE ''e2e-mig-%%'' AND id = %L', v_city)],
      ['badCoordinates', format('UPDATE public.locations SET center_lng = ''Infinity'' WHERE slug LIKE ''e2e-mig-%%'' AND id = %L', v_city)],
      ['parentMissing', format('INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source) VALUES (%L, ''region'', %L, %L, %L, false, ''admin'')', gen_random_uuid(), v_xz, v_tag || ' x', v_tag || '-x6')],
      ['parentMissing', format('UPDATE public.locations SET parent_id = %L WHERE slug LIKE ''e2e-mig-%%'' AND id = %L', gen_random_uuid(), v_city)],
      ['levelMismatch', format('INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng) VALUES (%L, ''city'', %L, %L, %L, false, ''admin'', 9.0, 38.0)', v_axz, v_xz, v_tag || ' x', v_tag || '-x7')],
      ['levelMismatch', format('UPDATE public.locations SET parent_id = %L WHERE slug LIKE ''e2e-mig-%%'' AND id = %L', v_axz, v_city)],
      ['crossCountry', format('INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source) VALUES (%L, ''region'', %L, %L, %L, false, ''admin'')', v_axz, v_xy, v_tag || ' x', v_tag || '-x8')],
      ['crossCountry', format('UPDATE public.locations SET country_code = %L WHERE slug LIKE ''e2e-mig-%%'' AND id = %L', v_xy, v_city)],
      ['parentInactive', format('INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng) VALUES (%L, ''city'', %L, %L, %L, true, ''admin'', 9.0, 38.0)', v_off, v_xz, v_tag || ' x', v_tag || '-x9')],
      ['parentInactive', format('UPDATE public.locations SET is_active = true WHERE slug LIKE ''e2e-mig-%%'' AND id = %L', v_shut)]];
    FOR i IN 1..array_length(v_cases, 1) LOOP
      BEGIN
        EXECUTE v_cases[i][2];
        RAISE EXCEPTION 'F1-7b part 1 proof: (b) case % (%) was not refused', i, v_cases[i][1];
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
        IF v_msg IS DISTINCT FROM v_cases[i][1] THEN
          RAISE EXCEPTION 'F1-7b part 1 proof: (b) case % answered % (expected %)', i, v_msg, v_cases[i][1];
        END IF;
      END;
    END LOOP;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
    VALUES (v_reg, 'city', v_xz, v_tag || ' e', v_tag || '-e', false, 'admin', 90, -180);
    UPDATE public.locations SET center_lat = -90, center_lng = 180 WHERE slug LIKE 'e2e-mig-%' AND id = v_city;
    IF NOT coalesce((SELECT center_lat = -90 AND center_lng = 180 AND slug = v_tag || '-c' AND parent_id = v_reg
                       FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_city), false) THEN
      RAISE EXCEPTION 'F1-7b part 1 proof: (b) the edge update or a refused update changed the city: %',
        (SELECT row_to_json(l)::text FROM public.locations l WHERE l.slug LIKE 'e2e-mig-%' AND l.id = v_city);
    END IF;
    IF (SELECT count(*) FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug ~ ('^' || v_tag || '-x[0-9]$')) <> 0 THEN
      RAISE EXCEPTION 'F1-7b part 1 proof: (b) a refused insert left a row';
    END IF;
    IF NOT coalesce((SELECT NOT is_active FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_shut), false) THEN
      RAISE EXCEPTION 'F1-7b part 1 proof: (b) a refused activation opened the place';
    END IF;

    -- (c) through a door's shell
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, v_tag || '-staff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_staff, v_tag || '-f', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-locations', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'locations' AND p.action IN ('view', 'create', 'update');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 3 THEN
      RAISE EXCEPTION 'F1-7b part 1 proof: a locations permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role, 'global');
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals
     WHERE day = current_date AND door IN ('admin_upsert_location', 'admin_set_location_active');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_upsert_location(NULL, v_reg, 'city', v_tag || ' d', v_tag || '-xd', NULL, NULL, NULL, 95.0::double precision, 38.0::double precision);
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'badCoordinates'
       OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-7b part 1 proof: (c) a create at latitude 95 answered %', v_answer;
    END IF;
    v_answer := public.admin_set_location_active(v_shut, true);
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'parentInactive'
       OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-7b part 1 proof: (c) an activation under a retired region answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-xd')
       OR NOT coalesce((SELECT NOT is_active FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_shut), false)
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id = v_staff) THEN
      RAISE EXCEPTION 'F1-7b part 1 proof: (c) a refused door call wrote';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals
         WHERE day = current_date AND door IN ('admin_upsert_location', 'admin_set_location_active')) IS DISTINCT FROM v_refused + 2 THEN
      RAISE EXCEPTION 'F1-7b part 1 proof: (c) door_refusals did not meter the 2 refusals';
    END IF;

    -- (d) the cost bar
    FOR i IN 1..50 LOOP
      v_t0 := clock_timestamp();
      UPDATE public.locations SET name_en = v_tag || ' c' || i WHERE slug LIKE 'e2e-mig-%' AND id = v_city;
      v_ms := array_append(v_ms, extract(epoch FROM clock_timestamp() - v_t0) * 1000.0);
    END LOOP;
    SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY s) INTO v_median FROM unnest(v_ms) AS s;
    IF v_median >= 5 THEN
      RAISE EXCEPTION 'F1-7b part 1 proof: (d) a place''s update takes % ms at the median (the bar is 5)', v_median;
    END IF;

    RAISE EXCEPTION 'f17b1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f17b1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261120050000') ON CONFLICT DO NOTHING;
