-- e2e-areas: admin-locations

-- Foundations 1, turn F1-4b, part 1 of 9 — THE PLACE EDITOR'S DOOR ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4b.md).
-- admin_upsert_location is redeclared WHOLE from its last declaration (live md5 checked). Each branch's gate becomes
-- ONE door_context('staff', locations:create|update, staff_config, the place's country, match): a create reads the
-- country of its parent (or, for a country anchor, the countries row its slug names), an edit the country of the
-- place it edits. Its sentences become door_refuse codes of the same words and the shell answers a refusal. uuid →
-- {ok:true, id}: DROP + CREATE, grants restated. Proofs on scratch countries and places under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_upsert_location(uuid,uuid,text,text,text,text,text[],integer,double precision,double precision)', '5e34ea13998c57e8d182c13b2c669597']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115041800') THEN
    RAISE EXCEPTION 'F1-4b part 1: F1-4a (its last part, c4b183c2) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4b part 1: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 1: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_upsert_location (whole from 20261029015903 :219; the two gates on door_context with the place's country, the codes and the shell; jsonb)
DROP FUNCTION public.admin_upsert_location(uuid, uuid, text, text, text, text, text[], integer, double precision, double precision);
CREATE FUNCTION public.admin_upsert_location(p_id uuid, p_parent_id uuid, p_level text, p_name_en text, p_slug text, p_iso_3166_2 text, p_aliases text[], p_display_order integer, p_center_lat double precision, p_center_lng double precision)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_old     public.locations;
  v_slug    text;
  v_country char(2);
  v_id      uuid;
  v_scope   char(2);
BEGIN
  IF p_id IS NULL THEN
    IF p_level = 'country' THEN
      SELECT c.code INTO v_scope FROM public.countries c WHERE c.code = upper(coalesce(p_slug, ''));
    ELSE
      SELECT l.country_code INTO v_scope FROM public.locations l WHERE l.id = p_parent_id;
    END IF;
    PERFORM public.door_context('staff', 'locations', 'create', 'staff_config', v_scope, 'match');

    IF p_level IS NULL OR p_level NOT IN ('country','region','city','sub_city') THEN
      PERFORM public.door_refuse('badLevel');
    END IF;
    IF p_iso_3166_2 IS NOT NULL AND p_level <> 'region' THEN
      PERFORM public.door_refuse('isoOnRegionsOnly');
    END IF;
    IF coalesce(trim(p_name_en), '') = '' THEN
      PERFORM public.door_refuse('nameRequired');
    END IF;

    IF p_level = 'country' THEN
      IF p_parent_id IS NOT NULL THEN PERFORM public.door_refuse('rootMustBeCountry'); END IF;
      SELECT c.code INTO v_country FROM public.countries c
       WHERE c.code = upper(coalesce(p_slug, ''));
      IF v_country IS NULL THEN
        PERFORM public.door_refuse('unknownCountry');
      END IF;
      v_slug := public.location_slug_candidate(p_name_en, NULL);
    ELSE
      SELECT l.country_code INTO v_country FROM public.locations l WHERE l.id = p_parent_id;
      IF v_country IS NULL THEN PERFORM public.door_refuse('parentMissing'); END IF;
      v_slug := coalesce(nullif(trim(coalesce(p_slug, '')), ''),
                         public.location_slug_candidate(p_name_en, p_parent_id));
    END IF;

    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug,
                                  iso_3166_2, aliases, display_order,
                                  center_lat, center_lng, is_active, source)
    VALUES (p_parent_id, p_level, v_country, p_name_en, v_slug,
            p_iso_3166_2, coalesce(p_aliases, '{}'::text[]), coalesce(p_display_order, 0),
            p_center_lat, p_center_lng, false, 'admin')
    RETURNING id INTO v_id;

    PERFORM public.log_audit('location.create', 'location', v_id::text,
      jsonb_build_object('new', jsonb_build_object(
        'level', p_level, 'country_code', v_country, 'name_en', p_name_en,
        'slug', v_slug, 'parent_id', p_parent_id, 'iso_3166_2', p_iso_3166_2,
        'aliases', coalesce(p_aliases, '{}'::text[]),
        'display_order', coalesce(p_display_order, 0),
        'center_lat', p_center_lat, 'center_lng', p_center_lng)));
    RETURN jsonb_build_object('ok', true, 'id', v_id);
  END IF;

  SELECT l.country_code INTO v_scope FROM public.locations l WHERE l.id = p_id;
  PERFORM public.door_context('staff', 'locations', 'update', 'staff_config', v_scope, 'match');

  SELECT * INTO v_old FROM public.locations WHERE id = p_id;
  IF NOT FOUND THEN PERFORM public.door_refuse('locationMissing'); END IF;

  -- parent, level and activation are NOT this door's business.
  IF p_parent_id IS DISTINCT FROM v_old.parent_id THEN PERFORM public.door_refuse('useMoveDoor'); END IF;
  IF p_level IS NOT NULL AND p_level IS DISTINCT FROM v_old.level THEN
    PERFORM public.door_refuse('useMoveDoor');
  END IF;
  IF p_iso_3166_2 IS NOT NULL AND v_old.level <> 'region' THEN
    PERFORM public.door_refuse('isoOnRegionsOnly');
  END IF;
  IF coalesce(trim(coalesce(p_name_en, v_old.name_en)), '') = '' THEN
    PERFORM public.door_refuse('nameRequired');
  END IF;

  UPDATE public.locations l
     SET name_en       = coalesce(p_name_en, l.name_en),
         slug          = coalesce(nullif(trim(coalesce(p_slug, '')), ''), l.slug),
         iso_3166_2    = p_iso_3166_2,
         aliases       = coalesce(p_aliases, l.aliases),
         display_order = coalesce(p_display_order, l.display_order),
         center_lat    = coalesce(p_center_lat, l.center_lat),
         center_lng    = coalesce(p_center_lng, l.center_lng)
   WHERE l.id = p_id;

  PERFORM public.log_audit('location.update', 'location', p_id::text,
    jsonb_build_object(
      'old', jsonb_build_object('name_en', v_old.name_en, 'slug', v_old.slug,
        'iso_3166_2', v_old.iso_3166_2, 'aliases', v_old.aliases,
        'display_order', v_old.display_order,
        'center_lat', v_old.center_lat, 'center_lng', v_old.center_lng),
      'new', (SELECT jsonb_build_object('name_en', n.name_en, 'slug', n.slug,
        'iso_3166_2', n.iso_3166_2, 'aliases', n.aliases,
        'display_order', n.display_order,
        'center_lat', n.center_lat, 'center_lng', n.center_lng)
        FROM public.locations n WHERE n.id = p_id)));
  RETURN jsonb_build_object('ok', true, 'id', p_id);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_upsert_location', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_upsert_location(uuid, uuid, text, text, text, text, text[], integer, double precision, double precision) IS
  'F1-4b on the door shell (DEC-333): creates or edits a place behind door_context(staff, locations:create|update, staff_config, the place''s country, match); refuses badLevel / isoOnRegionsOnly / nameRequired / rootMustBeCountry / unknownCountry / parentMissing / locationMissing / useMoveDoor; audits location.create / location.update; answers {ok:true, id}.';
REVOKE ALL ON FUNCTION public.admin_upsert_location(uuid, uuid, text, text, text, text, text[], integer, double precision, double precision) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_location(uuid, uuid, text, text, text, text, text[], integer, double precision, double precision) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: the door VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the
--     service role, never anon or PUBLIC; its body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied (403), notSignedIn (401); a country holder refused
--     permissionDenied:scope (403) for another country's place, for a parent or place that does not exist and for
--     another country's anchor; none of them writes, audits or spends staff_config.
-- (c) each code with every earlier check cleared, its exact message and a 400, nothing written.
-- (d) the country holder creates and edits in his own country, the global holder in another: {ok:true, id}.
-- (e) staff_config counted once per call past the gate; one audit line per success; every refusal metered.
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
  v_axz     uuid;
  v_axy     uuid;
  v_sxz     text;
  v_sxy     text;
  v_rz1     uuid;
  v_cz      uuid;
  v_ry1     uuid;
  v_new     uuid;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f14b1-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_upsert_location(uuid,uuid,text,text,text,text,text[],integer,double precision,double precision)', '0accd0e416c4624af33600e86db5f77f']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4b part 1 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 1 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_xq)) THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: a scratch country code already exists';
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
     WHERE r.name = 'locations' AND p.action IN ('view', 'create', 'update', 'restructure');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: a locations permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_l, 'global'), (v_deact, v_role_l, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_l, 'country', v_xz);

    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, display_order)
    VALUES (v_axz, 'region', v_xz, v_tag || ' rz1', v_tag || '-rz1', 0) RETURNING id INTO v_rz1;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, center_lat, center_lng)
    VALUES (v_rz1, 'city', v_xz, v_tag || ' cz', v_tag || '-cz', 9.03::double precision, 38.74::double precision)
    RETURNING id INTO v_cz;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, display_order)
    VALUES (v_axy, 'region', v_xy, v_tag || ' ry1', v_tag || '-ry1', 0) RETURNING id INTO v_ry1;

    -- (b) the gates: the account, the permission, no caller, then the scope (match on the place's country)
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_upsert_location');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_d::text)::text, true);
    v_answer := public.admin_upsert_location(v_rz1, v_axz, NULL, v_tag || ' renamed', NULL, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_upsert_location(NULL, v_axz, 'region', v_tag || ' new', v_tag || '-new', NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (b) a caller without locations:create answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_upsert_location(NULL, v_axz, 'region', v_tag || ' new', v_tag || '-new', NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (b) no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_upsert_location(NULL, v_axy, 'region', v_tag || ' new', v_tag || '-new', NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (b) a create under another country''s place answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(NULL, gen_random_uuid(), 'region', v_tag || ' new', v_tag || '-new', NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (b) a create under no place answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(NULL, NULL, 'country', v_tag || ' new', v_xy::text, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (b) a country anchor of another country answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(v_ry1, v_axy, NULL, v_tag || ' renamed', NULL, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (b) an edit of another country''s place answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(gen_random_uuid(), NULL, NULL, v_tag || ' renamed', NULL, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (b) an edit of no place answered %', v_answer;
    END IF;
    IF NOT coalesce(NOT EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-new') AND (SELECT name_en FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_ry1) = v_tag || ' ry1' AND (SELECT name_en FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_rz1) = v_tag || ' rz1', false) THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (b) a refused call wrote a place';
    END IF;

    -- (c) each code, every earlier check cleared (a global holder passes the gate), its exact message and a 400
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_upsert_location(NULL, v_axz, 'planet', v_tag || ' new', v_tag || '-new', NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badLevel' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (c) a create at an unknown level answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(NULL, v_rz1, 'city', v_tag || ' new', v_tag || '-new', 'XZ-01', NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'isoOnRegionsOnly' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (c) a create of a city with an iso code answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(NULL, v_axz, 'region', '  ', v_tag || '-new', NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'nameRequired' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (c) a create with a blank name answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(NULL, v_axz, 'country', v_tag || ' new', v_xz::text, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'rootMustBeCountry' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (c) a country anchor with a parent answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(NULL, NULL, 'country', v_tag || ' new', v_xq::text, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCountry' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (c) a country anchor of no country answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(NULL, gen_random_uuid(), 'region', v_tag || ' new', v_tag || '-new', NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'parentMissing' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (c) a create under no place answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(gen_random_uuid(), NULL, NULL, v_tag || ' renamed', NULL, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'locationMissing' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (c) an edit of no place answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(v_rz1, v_axy, NULL, v_tag || ' renamed', NULL, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'useMoveDoor' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (c) an edit that moves answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(v_cz, v_rz1, NULL, NULL, NULL, 'XZ-01', NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'isoOnRegionsOnly' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (c) an edit of a city with an iso code answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(v_rz1, v_axz, NULL, '  ', NULL, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'nameRequired' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (c) an edit with a blank name answered %', v_answer;
    END IF;
    IF NOT coalesce(NOT EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-new') AND (SELECT name_en FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_rz1) = v_tag || ' rz1' AND (SELECT parent_id FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_rz1) = v_axz AND (SELECT iso_3166_2 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_cz) IS NULL, false) THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (c) a refused call wrote a place';
    END IF;

    -- (d) the successes: the country's holder in his own country, the global holder in any
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_upsert_location(NULL, v_axz, 'region', v_tag || ' rz2', v_tag || '-rz2', NULL, NULL, NULL, NULL, NULL);
    IF NOT coalesce((v_answer ->> 'ok')::boolean AND (v_answer ->> 'id') IS NOT NULL, false) THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (d) a create in the holder''s own country answered %', v_answer;
    END IF;
    v_new := (v_answer ->> 'id')::uuid;
    IF NOT coalesce((SELECT parent_id = v_axz AND country_code = v_xz AND level = 'region' AND slug = v_tag || '-rz2' AND NOT is_active FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_new), false) THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (d) the created place differs';
    END IF;
    v_answer := public.admin_upsert_location(v_rz1, v_axz, NULL, v_tag || ' rz1 renamed', NULL, NULL, NULL, NULL, NULL, NULL);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'id', v_rz1), false) THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (d) an edit in the holder''s own country answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_upsert_location(v_ry1, v_axy, NULL, v_tag || ' ry1 renamed', NULL, NULL, NULL, NULL, NULL, NULL);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'id', v_ry1), false) THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (d) a global holder''s edit answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_location(NULL, v_axy, 'region', v_tag || ' ry2', v_tag || '-ry2', NULL, NULL, NULL, NULL, NULL);
    IF NOT coalesce((v_answer ->> 'ok')::boolean AND (v_answer ->> 'id') IS NOT NULL, false) THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (d) a global holder''s create answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT name_en FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_rz1) = v_tag || ' rz1 renamed' AND (SELECT name_en FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_ry1) = v_tag || ' ry1 renamed' AND EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND parent_id = v_axy AND slug = v_tag || '-ry2'), false) THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: (d) the edits differ';
    END IF;

    -- (e) the tallies: staff_config counted once per call past the gate, never for a gate's refusal; one audit line per
    --     success; every refusal metered
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 12 THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: the dial staff_config counted % for the staff caller (expected 12)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_staff;
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: the staff caller wrote % audit lines (expected 2)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'staff_config';
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: the dial staff_config counted % for the cstaff caller (expected 2)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_cstaff;
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: the cstaff caller wrote % audit lines (expected 2)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: the dial staff_config counted % for the plain caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_plain;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: the plain caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: the dial staff_config counted % for the deact caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_deact;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: the deact caller wrote % audit lines (expected 0)', v_count;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_upsert_location')) IS DISTINCT FROM v_refused + 18 THEN
      RAISE EXCEPTION 'F1-4b part 1 proof: door_refusals did not meter the 18 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14b1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14b1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115150000') ON CONFLICT DO NOTHING;
