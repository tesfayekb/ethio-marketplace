-- e2e-areas: admin-locations, admin-countries, admin-imports

-- Foundations 1, turn F1-7b, part 4 of 8 — THE PLACES IMPORT PLANNER (DEC-333, F1-4b decision 8, INC-1163's class,
-- INC-1164, INC-1179; brief docs/governance/briefs/f1-doors-7b.md; census docs/governance/reports/f1-doors-7b.census.md).
-- loc_import_plan (a body over 10 KB and not a door) is redeclared by computed insertion from the live body,
-- md5-guarded before and after (rule 30, DEC-383). Its named changes, nothing else:
-- 1. an unknown scope answers door_refuse('unknownCountry') (was the sentence `unknown country scope`), and the
--    scope's text is compared before it is held in a two-letter variable;
-- 2. a countries-file code is checked as text before it is held in a two-letter variable (a longer code is the
--    row's existing badCountryCode, never a raw length error);
-- 3. INC-1164: a countries row is planned only when the caller holds the right its country door requires
--    (country_row_right, part 2): a new country and field edits countries:update global, the root order
--    countries:update match, opening or closing countries:activate match; else the row's reason permissionDenied
--    with the refused action (update | activate) as its detail — so the commit, which refuses a plan with refusals,
--    never writes a country row its doors would refuse. The service role passes.
-- 4. INC-1179: a places row whose center_lat lies outside -90..90 or center_lng outside -180..180 (NaN and the
--    infinities included) is the row's reason badCoordinates, as the places table's trigger refuses (part 1).

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261120050200') THEN
    RAISE EXCEPTION 'F1-7b part 4: part 3 (888c0aec) must be applied first';
  END IF;
  IF to_regprocedure('public.country_row_right(text,boolean,boolean,boolean)') IS NULL THEN
    RAISE EXCEPTION 'F1-7b part 4: country_row_right (part 2) is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. loc_import_plan (computed; old md5
-- f8dffb8064d4537411b98f77f14329e4, new md5 9d5650e56c2e476328f9540337eeed90)
DO $f17b_loc_import_plan$
DECLARE
  v_src      text;
  v_new      text;
  v_args     text;
  v_result   text;
  v_secdef   boolean;
  v_volatile "char";
  v_config   text;
  v_defaults text;
  v_acl      text;
  v_pairs    text[][] := ARRAY[
      [E'    v_scope := upper(btrim(p_scope));\n    IF NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = v_scope) THEN\n      RAISE EXCEPTION ''unknown country scope'';\n    END IF;',
       E'    IF NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = upper(btrim(p_scope))) THEN\n      PERFORM public.door_refuse(''unknownCountry'');\n    END IF;\n    v_scope := upper(btrim(p_scope));'],
      [E'    v_code := upper(COALESCE(btrim(r->>''country_code''), ''''));\n    v_action',
       E'    v_action'],
      [E'    IF v_code !~ ''^[A-Z]{2}$'' THEN\n      v_ref := v_ref || jsonb_build_object(''file'',''countries'',''row'',v_row,''key'',\n        COALESCE(btrim(r->>''country_code''),''''),''reason'',''badCountryCode'');\n      CONTINUE;\n    END IF;\n',
       E'    IF upper(COALESCE(btrim(r->>''country_code''), '''')) !~ ''^[A-Z]{2}$'' THEN\n      v_ref := v_ref || jsonb_build_object(''file'',''countries'',''row'',v_row,''key'',\n        COALESCE(btrim(r->>''country_code''),''''),''reason'',''badCountryCode'');\n      CONTINUE;\n    END IF;\n    v_code := upper(COALESCE(btrim(r->>''country_code''), ''''));\n'],
      [E'      -- a create is CLOSED regardless of the cell;',
       E'      -- INC-1164: a country''s own row is written only under the rights its country doors require.\n      SELECT k.allowed, k.refused INTO v_ok, v_txt\n        FROM public.country_row_right(v_code::text, v_action = ''open'', true,\n               array_length(v_slugs, 1) IS NOT NULL) k;\n      IF NOT coalesce(v_ok, false) THEN\n        v_ref := v_ref || jsonb_build_object(''file'',''countries'',''row'',v_row,''key'',v_code,\n          ''reason'',''permissionDenied'',''detail'',v_txt);\n        CONTINUE;\n      END IF;\n      -- a create is CLOSED regardless of the cell;'],
      [E'    -- INC-215: a state action NEVER swallows',
       E'    -- INC-1164: a country''s own row is written only under the rights its country doors require.\n    SELECT k.allowed, k.refused INTO v_ok, v_txt\n      FROM public.country_row_right(v_code::text,\n             (v_action = ''open'' AND NOT v_cty.is_active) OR (v_action = ''close'' AND v_cty.is_active),\n             (v_fields - ''root_order'') <> ''{}''::jsonb, v_fields ? ''root_order'') k;\n    IF NOT coalesce(v_ok, false) THEN\n      v_ref := v_ref || jsonb_build_object(''file'',''countries'',''row'',v_row,''key'',v_code,\n        ''reason'',''permissionDenied'',''detail'',v_txt);\n      CONTINUE;\n    END IF;\n    -- INC-215: a state action NEVER swallows'],
      [E'    v_id := public.loc_id_of_key(v_key);\n',
       E'    -- INC-1179: a coordinate the file gives lies on the globe (the places table''s trigger refuses the same).\n    IF coalesce(abs(public.loc_num(r->>''center_lat'')) > 90, false)\n       OR coalesce(abs(public.loc_num(r->>''center_lng'')) > 180, false) THEN\n      v_ref := v_ref || jsonb_build_object(''file'',''locations'',''row'',v_row,''key'',v_key,\n        ''reason'',''badCoordinates'');\n      CONTINUE;\n    END IF;\n    v_id := public.loc_id_of_key(v_key);\n']];
  i          integer;
BEGIN
  SELECT p.prosrc, pg_get_function_arguments(p.oid), pg_get_function_result(p.oid), p.prosecdef, p.provolatile,
         coalesce(p.proconfig::text, ''), coalesce(p.proargdefaults::text, ''), coalesce(p.proacl::text, '')
    INTO v_src, v_args, v_result, v_secdef, v_volatile, v_config, v_defaults, v_acl
    FROM pg_proc p WHERE p.oid = 'public.loc_import_plan(jsonb,jsonb,text)'::regprocedure;
  v_new := replace(v_src, chr(13), '');
  IF md5(v_new) IS DISTINCT FROM 'f8dffb8064d4537411b98f77f14329e4' OR v_config <> '{search_path=public}' THEN
    RAISE EXCEPTION 'F1-7b: the live loc_import_plan is not the body this file was built from (%)', md5(v_new);
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    IF (length(v_new) - length(replace(v_new, v_pairs[i][1], ''))) / length(v_pairs[i][1]) <> 1 THEN
      RAISE EXCEPTION 'F1-7b: change % of loc_import_plan does not find its one anchor', i;
    END IF;
    v_new := replace(v_new, v_pairs[i][1], v_pairs[i][2]);
  END LOOP;
  IF md5(v_new) IS DISTINCT FROM '9d5650e56c2e476328f9540337eeed90' THEN
    RAISE EXCEPTION 'F1-7b: the new loc_import_plan is not the body this file names (%)', md5(v_new);
  END IF;
  EXECUTE format('CREATE OR REPLACE FUNCTION public.loc_import_plan(%s) RETURNS %s LANGUAGE plpgsql %s SECURITY %s SET search_path = public AS $f17b$%s$f17b$',
    v_args, v_result,
    CASE v_volatile WHEN 's' THEN 'STABLE' WHEN 'i' THEN 'IMMUTABLE' ELSE 'VOLATILE' END,
    CASE WHEN v_secdef THEN 'DEFINER' ELSE 'INVOKER' END,
    v_new);
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p WHERE p.oid = 'public.loc_import_plan(jsonb,jsonb,text)'::regprocedure
       AND p.prosecdef = v_secdef AND p.provolatile = v_volatile
       AND coalesce(p.proconfig::text, '') = v_config
       AND coalesce(p.proargdefaults::text, '') = v_defaults
       AND coalesce(p.proacl::text, '') = v_acl
       AND pg_get_function_result(p.oid) = v_result
       AND md5(replace(p.prosrc, chr(13), '')) = '9d5650e56c2e476328f9540337eeed90') THEN
    RAISE EXCEPTION 'F1-7b: loc_import_plan drifted in its header, grants or body after the redeclaration';
  END IF;
END $f17b_loc_import_plan$;
REVOKE ALL ON FUNCTION public.loc_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.loc_import_plan(jsonb, jsonb, text) TO service_role;

-- PROOFS (under a sentinel rollback; scratch users, roles, sessions, countries and places only):
-- (a) the body is this file's (md5), STABLE DEFINER, search path public, EXECUTE for the service role only.
-- (b) the planner as the service role: an unknown scope, of two letters or three, P0D01 unknownCountry (never the
--     sentence, never 22001); a three-letter countries-file code the row reason badCountryCode; places rows at
--     latitude 91, longitude -181 and latitude NaN the row reason badCoordinates; a row at 90 / -180 planned.
-- (c) INC-1164 through the doors (the preview, the commit): a holder scoped to XZ of the places rights alone is
--     refused XZ's own row (permissionDenied, detail update for an edit, activate for an opening), and imports
--     XZ's places; his commit of the country row with a place is refused whole (planHasRefusals), nothing written;
--     his commit of a place with an Amharic name answers permissionDenied:translations (403); a holder scoped to XZ
--     of the places and country rights opens XZ and imports its place in one commit but is refused XZ's name
--     (update, global); a global holder of both renames XZ.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_xz      character(2) := 'XZ';
  v_places  uuid := gen_random_uuid();
  v_both    uuid := gen_random_uuid();
  v_glob    uuid := gen_random_uuid();
  v_sess_p  uuid := gen_random_uuid();
  v_sess_b  uuid := gen_random_uuid();
  v_sess_g  uuid := gen_random_uuid();
  v_role_l  uuid;
  v_role_c  uuid;
  v_sxz     text;
  v_doc     jsonb;
  v_answer  jsonb;
  v_msg     text;
  v_cases   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f17b4-' || substr(v_hex, 1, 10);
  -- (a)
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) IS DISTINCT FROM '9d5650e56c2e476328f9540337eeed90'
             OR NOT p.prosecdef OR p.provolatile <> 's' OR p.proconfig::text <> '{search_path=public}'
        FROM pg_proc p WHERE p.oid = 'public.loc_import_plan(jsonb,jsonb,text)'::regprocedure)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = 'public.loc_import_plan(jsonb,jsonb,text)'::regprocedure)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', 'public.loc_import_plan(jsonb,jsonb,text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.loc_import_plan(jsonb,jsonb,text)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.loc_import_plan(jsonb,jsonb,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-7b part 4 proof (a): the planner''s body, header or grants differ';
  END IF;

  BEGIN
    PERFORM set_config('request.jwt.claims', json_build_object('role', 'service_role')::text, true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_xz) THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: a scratch country code already exists';
    END IF;
    -- (b)
    v_cases := ARRAY[[v_xz::text], ['XZQ']];
    FOR i IN 1..array_length(v_cases, 1) LOOP
      BEGIN
        PERFORM public.loc_import_plan('[]'::jsonb, '[]'::jsonb, v_cases[i][1]);
        RAISE EXCEPTION 'F1-7b part 4 proof: (b) the scope % was planned', v_cases[i][1];
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
        IF v_msg IS DISTINCT FROM 'unknownCountry' THEN
          RAISE EXCEPTION 'F1-7b part 4 proof: (b) the scope % answered % (expected unknownCountry)', v_cases[i][1], v_msg;
        END IF;
      END;
    END LOOP;
    v_doc := public.loc_import_plan(
      jsonb_build_array(jsonb_build_object('row', 2, 'country_code', 'XZQ', 'name_en', v_tag || ' q')), '[]'::jsonb, NULL);
    IF v_doc -> 'refusals' IS DISTINCT FROM jsonb_build_array(jsonb_build_object(
         'file', 'countries', 'row', 2, 'key', 'XZQ', 'reason', 'badCountryCode')) THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: (b) a three-letter countries-file code planned %', v_doc -> 'refusals';
    END IF;

    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', false);
    SELECT l.slug INTO STRICT v_sxz FROM public.locations l
     WHERE l.slug LIKE 'e2e-mig-%' AND l.level = 'country' AND l.country_code = v_xz;
    v_doc := public.loc_import_plan('[]'::jsonb, jsonb_build_array(
      jsonb_build_object('row', 2, 'location_key', v_sxz || '/' || v_tag || '-a', 'name_en', v_tag || ' a', 'center_lat', '91', 'center_lng', '38'),
      jsonb_build_object('row', 3, 'location_key', v_sxz || '/' || v_tag || '-b', 'name_en', v_tag || ' b', 'center_lat', '9', 'center_lng', '-181'),
      jsonb_build_object('row', 4, 'location_key', v_sxz || '/' || v_tag || '-c', 'name_en', v_tag || ' c', 'center_lat', 'NaN', 'center_lng', '38'),
      jsonb_build_object('row', 5, 'location_key', v_sxz || '/' || v_tag || '-d', 'name_en', v_tag || ' d', 'center_lat', '90', 'center_lng', '-180')), NULL);
    IF v_doc -> 'refusals' IS DISTINCT FROM jsonb_build_array(
         jsonb_build_object('file', 'locations', 'row', 2, 'key', v_sxz || '/' || v_tag || '-a', 'reason', 'badCoordinates'),
         jsonb_build_object('file', 'locations', 'row', 3, 'key', v_sxz || '/' || v_tag || '-b', 'reason', 'badCoordinates'),
         jsonb_build_object('file', 'locations', 'row', 4, 'key', v_sxz || '/' || v_tag || '-c', 'reason', 'badCoordinates'))
       OR jsonb_array_length(v_doc -> 'items') <> 1
       OR (v_doc -> 'items' -> 0 ->> 'op') IS DISTINCT FROM 'create'
       OR (v_doc -> 'items' -> 0 ->> 'key') IS DISTINCT FROM v_sxz || '/' || v_tag || '-d' THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: (b) the coordinates planned %', v_doc;
    END IF;

    -- (c)
    PERFORM set_config('request.jwt.claims', '{}', true);
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at)
    SELECT u, v_tag || '-' || n || '@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()
      FROM unnest(ARRAY[v_places, v_both, v_glob], ARRAY['places', 'both', 'glob']) AS t(u, n);
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_places, v_both, v_glob]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_sess_p, v_places, now(), now(), 'aal2'), (v_sess_b, v_both, now(), now(), 'aal2'), (v_sess_g, v_glob, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess_p, now(), now(), 'totp'), (gen_random_uuid(), v_sess_b, now(), now(), 'totp'),
           (gen_random_uuid(), v_sess_g, now(), now(), 'totp');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-places', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'locations' AND p.action IN ('view', 'import');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-countries', v_tag) RETURNING id INTO v_role_c;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_c, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'countries' AND p.action IN ('update', 'activate');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id IN (v_role_l, v_role_c)) <> 4 THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: a permission of a scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES
      (v_places, v_role_l, 'country', v_xz), (v_both, v_role_l, 'country', v_xz), (v_both, v_role_c, 'country', v_xz);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_glob, v_role_l, 'global'), (v_glob, v_role_c, 'global');

    -- the places holder: refused the country's own row, by the right it lacks
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_places::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_p::text)::text, true);
    v_doc := public.admin_preview_location_import(
      jsonb_build_array(jsonb_build_object('row', 2, 'country_code', v_xz::text, 'name_en', v_tag || ' renamed')), '[]'::jsonb, v_xz::text);
    IF v_doc -> 'refusals' IS DISTINCT FROM jsonb_build_array(jsonb_build_object(
         'file', 'countries', 'row', 2, 'key', v_xz::text, 'reason', 'permissionDenied', 'detail', 'update')) THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: (c) the places holder''s edit of his country planned %', v_doc -> 'refusals';
    END IF;
    v_doc := public.admin_preview_location_import(
      jsonb_build_array(jsonb_build_object('row', 2, 'country_code', v_xz::text, 'action', 'open')), '[]'::jsonb, v_xz::text);
    IF v_doc -> 'refusals' IS DISTINCT FROM jsonb_build_array(jsonb_build_object(
         'file', 'countries', 'row', 2, 'key', v_xz::text, 'reason', 'permissionDenied', 'detail', 'activate')) THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: (c) the places holder''s opening of his country planned %', v_doc -> 'refusals';
    END IF;
    v_answer := public.admin_commit_location_import(
      jsonb_build_array(jsonb_build_object('row', 2, 'country_code', v_xz::text, 'action', 'open')),
      jsonb_build_array(jsonb_build_object('row', 2, 'location_key', v_sxz || '/' || v_tag || '-p', 'name_en', v_tag || ' p')),
      v_xz::text, v_tag);
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'planHasRefusals' THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: (c) the places holder''s commit of his country answered %', v_answer;
    END IF;
    v_answer := public.admin_commit_location_import('[]'::jsonb,
      jsonb_build_array(jsonb_build_object('row', 2, 'location_key', v_sxz || '/' || v_tag || '-t', 'name_en', v_tag || ' t', 'name_am', v_tag || ' t')),
      v_xz::text, v_tag);
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:translations'
       OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: (c) the places holder''s commit with a translation answered %', v_answer;
    END IF;
    IF coalesce((SELECT is_active FROM public.countries WHERE code = v_xz), true)
       OR EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug IN (v_tag || '-p', v_tag || '-t')) THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: (c) a refused commit wrote';
    END IF;
    v_answer := public.admin_commit_location_import('[]'::jsonb,
      jsonb_build_array(jsonb_build_object('row', 2, 'location_key', v_sxz || '/' || v_tag || '-p', 'name_en', v_tag || ' p')),
      v_xz::text, v_tag);
    IF (v_answer ->> 'batch_id') IS NULL
       OR NOT EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-p' AND country_code = v_xz) THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: (c) the places holder''s import of a place answered %', v_answer;
    END IF;

    -- the holder of both, scoped: opens his country and imports a place in one commit; refused the name (global)
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_both::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_b::text)::text, true);
    v_answer := public.admin_commit_location_import(
      jsonb_build_array(jsonb_build_object('row', 2, 'country_code', v_xz::text, 'action', 'open')),
      jsonb_build_array(jsonb_build_object('row', 2, 'location_key', v_sxz || '/' || v_tag || '-q', 'name_en', v_tag || ' q')),
      v_xz::text, v_tag);
    IF (v_answer ->> 'batch_id') IS NULL
       OR NOT coalesce((SELECT is_active FROM public.countries WHERE code = v_xz), false)
       OR NOT EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-q' AND country_code = v_xz) THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: (c) the holder of both''s commit answered %', v_answer;
    END IF;
    v_doc := public.admin_preview_location_import(
      jsonb_build_array(jsonb_build_object('row', 2, 'country_code', v_xz::text, 'name_en', v_tag || ' renamed')), '[]'::jsonb, v_xz::text);
    IF v_doc -> 'refusals' IS DISTINCT FROM jsonb_build_array(jsonb_build_object(
         'file', 'countries', 'row', 2, 'key', v_xz::text, 'reason', 'permissionDenied', 'detail', 'update')) THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: (c) the scoped holder''s rename (a global right) planned %', v_doc -> 'refusals';
    END IF;

    -- the global holder of both renames the country
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_glob::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_g::text)::text, true);
    v_answer := public.admin_commit_location_import(
      jsonb_build_array(jsonb_build_object('row', 2, 'country_code', v_xz::text, 'name_en', v_tag || ' renamed')), '[]'::jsonb,
      v_xz::text, v_tag);
    IF (v_answer ->> 'batch_id') IS NULL
       OR (SELECT name_en FROM public.countries WHERE code = v_xz) IS DISTINCT FROM v_tag || ' renamed' THEN
      RAISE EXCEPTION 'F1-7b part 4 proof: (c) the global holder''s rename answered %', v_answer;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f17b4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f17b4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261120050300') ON CONFLICT DO NOTHING;
