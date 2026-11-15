-- e2e-areas: admin-locations, admin-imports

-- Foundations 1, turn F1-4b, part 7 of 9 — THE PLACES IMPORT'S PREVIEW AND EXPORT ONTO DOOR_CONTEXT (DEC-333; brief
-- docs/governance/briefs/f1-doors-4b.md).
-- admin_preview_location_import and admin_export_locations are redeclared WHOLE from their last declarations (live
-- md5 checked). Each permission check becomes ONE door_context('staff-reader', locations:import|view, NULL, the
-- country its p_scope names (read from its countries row), match). A reader's refusal raises (P0D01). Return types
-- unchanged: CREATE OR REPLACE. Proofs on scratch countries and places under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_preview_location_import(jsonb,jsonb,text)', '2e6fee80118bdf0fbe5ce06fd9d4089a'],
    ['public.admin_export_locations(text)', '31f729670c3e8a1b90c693d1d8dd8b11']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115150500') THEN
    RAISE EXCEPTION 'F1-4b part 7: part 6 (e0edb9a7) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4b part 7: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 7: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_preview_location_import (whole from 20260915170752 :677; the gate on door_context)
CREATE OR REPLACE FUNCTION public.admin_preview_location_import(
  p_countries jsonb, p_locations jsonb, p_scope text)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $fn$
DECLARE
  v_scope char(2);
BEGIN
  SELECT c.code INTO v_scope FROM public.countries c WHERE c.code = upper(btrim(p_scope));
  PERFORM public.door_context('staff-reader', 'locations', 'import', NULL, v_scope, 'match');
  RETURN public.loc_import_plan(p_countries, p_locations, p_scope);
END $fn$;
REVOKE ALL ON FUNCTION public.admin_preview_location_import(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_preview_location_import(jsonb, jsonb, text) TO authenticated;

-- ------------------------------------------------------------ 2. admin_export_locations (whole from 20260915170752 :640; the gate on door_context)
CREATE OR REPLACE FUNCTION public.admin_export_locations(p_scope text DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $fn$
DECLARE
  v_scope char(2) := NULL;
BEGIN
  SELECT c.code INTO v_scope FROM public.countries c WHERE c.code = upper(btrim(p_scope));
  PERFORM public.door_context('staff-reader', 'locations', 'view', NULL, v_scope, 'match');
  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    v_scope := upper(btrim(p_scope));
    IF NOT EXISTS (SELECT 1 FROM public.countries WHERE code = v_scope) THEN
      RAISE EXCEPTION 'unknown country scope';
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'countries', COALESCE((
      SELECT jsonb_agg(public.country_export_row(c.code) ORDER BY c.display_order, c.code)
        FROM public.countries c
       WHERE v_scope IS NULL OR c.code = v_scope), '[]'::jsonb),
    'locations', COALESCE((
      SELECT jsonb_agg(public.loc_export_row(l.id)
               ORDER BY l.country_code,
                        CASE l.level WHEN 'country' THEN 0 WHEN 'region' THEN 1
                                     WHEN 'city' THEN 2 ELSE 3 END,
                        public.loc_key_of(l.id))
        FROM public.locations l
       WHERE v_scope IS NULL OR l.country_code = v_scope), '[]'::jsonb));
END $fn$;
REVOKE ALL ON FUNCTION public.admin_export_locations(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_locations(text) TO authenticated;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: the 2 readers STABLE SECURITY DEFINER, EXECUTE for authenticated, never anon or PUBLIC; every
--     body this file's (md5).
-- (b) the gates: each reader raises permissionDenied (P0D01) to a caller without its permission; accountDeactivated
--     and notSignedIn; a country holder is raised permissionDenied:scope for no country, another country and a code
--     no country holds.
-- (c) the preview and the export answer for the holder's own country (a row of another country stays the planner's
--     outOfScope); the global holder's answers for another country.
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
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_state   text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f14b7-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_preview_location_import(jsonb,jsonb,text)', 'b9810c9ba544a70f8840bd3a8484215c'],
    ['public.admin_export_locations(text)', '3754109e0273d14cdb0425a57296eef5']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}'
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4b part 7 proof (a): the reader %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 7 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_xq)) THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: a scratch country code already exists';
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
      RAISE EXCEPTION 'F1-4b part 7 proof: a locations permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_l, 'global'), (v_deact, v_role_l, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_l, 'country', v_xz);
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-countries', v_tag) RETURNING id INTO v_role_c;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_c, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'countries' AND p.action IN ('view');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_c) <> 1 THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: a countries permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_c, 'global'), (v_deact, v_role_c, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_c, 'country', v_xz);

    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, display_order)
    VALUES (v_axz, 'region', v_xz, v_tag || ' rz1', v_tag || '-rz1', 0) RETURNING id INTO v_rz1;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, display_order)
    VALUES (v_axy, 'region', v_xy, v_tag || ' ry1', v_tag || '-ry1', 0) RETURNING id INTO v_ry1;

    -- (b) the gates: a reader raises its refusal (P0D01); the account, the permission, no caller, then the scope
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_preview_location_import', 'admin_export_locations');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_d::text)::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_export_locations(v_xz::text);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'accountDeactivated' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (b) a deactivated holder''s export answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_preview_location_import('[]'::jsonb, jsonb_build_array(jsonb_build_object('row', 1, 'location_key', v_sxz || '/' || v_tag || '-pz', 'name_en', v_tag || ' pz', 'action', '')), v_xz::text);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (b) a preview without locations:import answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_export_locations(v_xz::text);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (b) an export without locations:view answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_preview_location_import('[]'::jsonb, jsonb_build_array(jsonb_build_object('row', 1, 'location_key', v_sxz || '/' || v_tag || '-pz', 'name_en', v_tag || ' pz', 'action', '')), v_xz::text);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'notSignedIn' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (b) no caller''s preview answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_preview_location_import('[]'::jsonb, jsonb_build_array(jsonb_build_object('row', 1, 'location_key', v_sxz || '/' || v_tag || '-pz', 'name_en', v_tag || ' pz', 'action', '')), NULL);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied:scope' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (b) a preview of no country answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_preview_location_import('[]'::jsonb, jsonb_build_array(jsonb_build_object('row', 1, 'location_key', v_sxy || '/' || v_tag || '-py', 'name_en', v_tag || ' py', 'action', '')), v_xy::text);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied:scope' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (b) a preview of another country answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_export_locations(NULL);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied:scope' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (b) an export of every country answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_export_locations(v_xy::text);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied:scope' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (b) an export of another country answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_export_locations(v_xq::text);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied:scope' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (b) an export of a code no country holds answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;

    -- (c) the answers: preview and export answer for the holder's own country
    v_answer := public.admin_preview_location_import('[]'::jsonb, jsonb_build_array(jsonb_build_object('row', 1, 'location_key', v_sxz || '/' || v_tag || '-pz', 'name_en', v_tag || ' pz', 'action', '')), v_xz::text);
    IF NOT coalesce((v_answer -> 'counts' ->> 'adds')::integer = 1 AND jsonb_array_length(v_answer -> 'refusals') = 0, false) THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (c) the country holder''s preview of his country differs';
    END IF;
    v_answer := public.admin_preview_location_import('[]'::jsonb, jsonb_build_array(jsonb_build_object('row', 1, 'location_key', v_sxy || '/' || v_tag || '-py', 'name_en', v_tag || ' py', 'action', '')), v_xz::text);
    IF NOT coalesce(jsonb_array_length(v_answer -> 'refusals') = 1 AND v_answer -> 'refusals' -> 0 ->> 'reason' = 'outOfScope', false) THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (c) a row of another country under his scope is not the planner''s outOfScope';
    END IF;
    v_answer := public.admin_export_locations(v_xz::text);
    IF NOT coalesce(jsonb_array_length(v_answer -> 'countries') = 1 AND v_answer -> 'countries' -> 0 ->> 'country_code' = v_xz AND jsonb_array_length(v_answer -> 'locations') = 2, false) THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (c) the country holder''s export of his country differs';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_preview_location_import('[]'::jsonb, jsonb_build_array(jsonb_build_object('row', 1, 'location_key', v_sxy || '/' || v_tag || '-py', 'name_en', v_tag || ' py', 'action', '')), NULL);
    IF NOT coalesce((v_answer -> 'counts' ->> 'adds')::integer = 1 AND jsonb_array_length(v_answer -> 'refusals') = 0, false) THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (c) the global holder''s preview differs';
    END IF;
    v_answer := public.admin_export_locations(v_xy::text);
    IF NOT coalesce(jsonb_array_length(v_answer -> 'countries') = 1 AND jsonb_array_length(v_answer -> 'locations') = 2, false) THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (c) the global holder''s export of another country differs';
    END IF;

    -- (d) a reader spends no dial, writes no audit line and meters nothing
    IF NOT coalesce(NOT EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_staff::text, v_cstaff::text, v_plain::text, v_deact::text)), false) THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: (d) a reader spent a dial';
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_staff;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: the staff caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_cstaff;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: the cstaff caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_plain;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: the plain caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_deact;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: the deact caller wrote % audit lines (expected 0)', v_count;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_preview_location_import', 'admin_export_locations')) IS DISTINCT FROM v_refused + 0 THEN
      RAISE EXCEPTION 'F1-4b part 7 proof: door_refusals did not meter the 0 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14b7-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14b7-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115150600') ON CONFLICT DO NOTHING;
