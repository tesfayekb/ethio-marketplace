-- e2e-areas: admin-locations, admin-imports

-- Foundations 1, turn F1-4b, part 8 of 9 — THE PLACES IMPORT'S COMMIT ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4b.md).
-- admin_commit_location_import is redeclared WHOLE from its live body (live md5 checked; a computed declaration).
-- Its gate becomes ONE door_context('staff', locations:import, import_commit, the country its p_scope names (read
-- from its countries row), match): a country's holder commits his own country's file, a global holder any.
-- 'import already running' becomes importRunning, planHasRefusals a code; its 'am' literals become
-- language_code('pair') (K4) and the shell answers a refusal. Return type unchanged (jsonb): CREATE OR REPLACE.
-- Proofs on scratch countries under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_commit_location_import(jsonb,jsonb,text,text)', '01365b40f7c61055d5389d267da9a09f']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115150600') THEN
    RAISE EXCEPTION 'F1-4b part 8: part 7 (1b7d8f93) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4b part 8: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 8: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_commit_location_import (whole from live = literal 20261028235443 :461 + its computed gate; the gate on door_context with p_scope's country, the codes and the shell)
CREATE OR REPLACE FUNCTION public.admin_commit_location_import(
  p_countries jsonb, p_locations jsonb, p_scope text, p_digest text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $fn$
DECLARE
  v_plan jsonb; v_batch uuid := gen_random_uuid(); v_uid uuid := auth.uid();
  it jsonb; f jsonb; v_key text; v_code char(2); v_id uuid; v_prev jsonb;
  v_segs text[]; v_depth int; v_parent_id uuid; v_anchor uuid;
  v_am_prev jsonb; v_row public.countries; v_pos int;
  v_scope char(2);
BEGIN
  SELECT c.code INTO v_scope FROM public.countries c WHERE c.code = upper(btrim(p_scope));
  PERFORM public.door_context('staff', 'locations', 'import', 'import_commit', v_scope, 'match');

  IF NOT pg_try_advisory_xact_lock(hashtext('location-import'), hashtext(v_uid::text)) THEN
    PERFORM public.door_refuse('importRunning');
  END IF;

  v_plan := public.loc_import_plan(p_countries, p_locations, p_scope);
  IF jsonb_array_length(v_plan->'refusals') > 0 THEN
    PERFORM public.door_refuse('planHasRefusals');
  END IF;

  -- (1) countries create / update ------------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND value->>'op' IN ('create','update') LOOP
    v_code := it->>'key'; f := it->'fields';
    IF it->>'op' = 'create' THEN
      INSERT INTO public.countries (code, name_en, is_active, unit_system, currency_code, display_order)
      VALUES (v_code, f->>'name_en', false,
              COALESCE(f->>'unit_system','metric'),
              NULLIF(COALESCE(f->>'currency_code',''),'')::char(3),
              COALESCE((f->>'display_order')::int, 0));
      INSERT INTO public.location_import_revisions
        (batch_id, entity_type, action, entity_key, prev, post, created_by)
      VALUES (v_batch,'country','create',v_code,NULL,public.country_export_row(v_code),v_uid);
    ELSE
      v_prev := public.country_export_row(v_code);
      UPDATE public.countries SET
        name_en       = COALESCE(f->>'name_en', name_en),
        unit_system   = COALESCE(f->>'unit_system', unit_system),
        currency_code = COALESCE(NULLIF(COALESCE(f->>'currency_code',''),'')::char(3), currency_code),
        display_order = COALESCE((f->>'display_order')::int, display_order),
        updated_at    = now()
       WHERE code = v_code;
      INSERT INTO public.location_import_revisions
        (batch_id, entity_type, action, entity_key, prev, post, created_by)
      VALUES (v_batch,'country','update',v_code,v_prev,public.country_export_row(v_code),v_uid);
    END IF;
  END LOOP;

  -- (2) country open: the market and its tree anchor -------------------------
  --     INC-215: 'open+update' opens the market AND applies the row's edits in
  --     ONE statement; the anchor is named from the POST-update row.
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND value->>'op' IN ('activate','open+update') LOOP
    v_code := it->>'key'; f := it->'fields';
    v_prev := public.country_export_row(v_code);
    UPDATE public.countries SET
      is_active     = true,
      name_en       = COALESCE(f->>'name_en', name_en),
      unit_system   = COALESCE(f->>'unit_system', unit_system),
      currency_code = COALESCE(NULLIF(COALESCE(f->>'currency_code',''),'')::char(3), currency_code),
      display_order = COALESCE((f->>'display_order')::int, display_order),
      updated_at    = now()
     WHERE code = v_code;
    SELECT * INTO v_row FROM public.countries WHERE code = v_code;
    SELECT id INTO v_anchor FROM public.locations
     WHERE level = 'country' AND country_code = v_code LIMIT 1;
    IF v_anchor IS NULL THEN
      INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
      VALUES (NULL,'country',v_code,v_row.name_en,
              public.location_slug_candidate(v_row.name_en, NULL), true, 'import');
    ELSE
      UPDATE public.locations SET is_active = true WHERE id = v_anchor;
    END IF;
    IF it->>'op' = 'open+update' THEN
      INSERT INTO public.location_import_revisions
        (batch_id, entity_type, action, entity_key, prev, post, created_by)
      VALUES (v_batch,'country','update',v_code,v_prev,public.country_export_row(v_code),v_uid);
    END IF;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'country','open',v_code,v_prev,public.country_export_row(v_code),v_uid);
  END LOOP;

  -- (3a) location creates, shallowest first ---------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items') value
             WHERE value->>'file' = 'locations' AND value->>'op' = 'create'
             ORDER BY array_length(string_to_array(value->>'key','/'),1),
                      (value->>'row')::int LOOP
    v_key := it->>'key'; f := it->'fields';
    v_segs := string_to_array(v_key,'/'); v_depth := array_length(v_segs,1);
    v_parent_id := CASE WHEN v_depth > 1
      THEN public.loc_id_of_key(array_to_string(v_segs[1:v_depth-1],'/')) END;
    -- INC-200 law: one statement carries every cell.
    INSERT INTO public.locations
      (parent_id, level, country_code, name_en, slug, iso_3166_2, aliases,
       display_order, center_lat, center_lng, is_active, source)
    VALUES (v_parent_id, f->>'level', (f->>'country_code')::char(2), f->>'name_en',
            v_segs[v_depth], NULLIF(COALESCE(f->>'iso_3166_2',''),''),
            COALESCE(ARRAY(SELECT jsonb_array_elements_text(COALESCE(f->'aliases','[]'::jsonb))), '{}'::text[]),
            COALESCE((f->>'display_order')::int, 0),
            (f->>'center_lat')::double precision, (f->>'center_lng')::double precision,
            COALESCE((f->>'is_active')::boolean, false), 'import')
    RETURNING id INTO v_id;
    IF COALESCE(f->>'name_am','') <> '' THEN
      PERFORM public.admin_save_entity_translation_core('location', v_id, 'name', public.language_code('pair'), f->>'name_am');
    END IF;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','create',v_key,
            jsonb_build_object('id',v_id,'parent_id',v_parent_id,'am_state',NULL),
            public.loc_export_row(v_id), v_uid);
  END LOOP;

  -- (3b) location updates ---------------------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'locations' AND value->>'op' IN ('update','noop') LOOP
    f := it->'fields';
    CONTINUE WHEN f = '{}'::jsonb;
    v_key := it->>'key'; v_id := public.loc_id_of_key(v_key);
    CONTINUE WHEN v_id IS NULL;
    SELECT jsonb_build_object('value',t.value,'status',t.status,'machine',t.machine)
      INTO v_am_prev FROM public.entity_translations t
     WHERE t.entity_type='location' AND t.entity_id=v_id AND t.field='name' AND t.lang_code=public.language_code('pair');
    v_prev := public.loc_export_row(v_id)
              || jsonb_build_object('id',v_id,'am_state',v_am_prev);
    UPDATE public.locations SET
      name_en       = COALESCE(f->>'name_en', name_en),
      iso_3166_2    = CASE WHEN f ? 'iso_3166_2' THEN NULLIF(f->>'iso_3166_2','') ELSE iso_3166_2 END,
      aliases       = CASE WHEN f ? 'aliases'
                        THEN COALESCE(ARRAY(SELECT jsonb_array_elements_text(f->'aliases')), '{}'::text[])
                        ELSE aliases END,
      display_order = COALESCE((f->>'display_order')::int, display_order),
      center_lat    = COALESCE((f->>'center_lat')::double precision, center_lat),
      center_lng    = COALESCE((f->>'center_lng')::double precision, center_lng),
      updated_at    = now()
     WHERE id = v_id;
    IF COALESCE(f->>'name_am','') <> '' THEN
      PERFORM public.admin_save_entity_translation_core('location', v_id, 'name', public.language_code('pair'), f->>'name_am');
    END IF;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','update',v_key,v_prev,public.loc_export_row(v_id),v_uid);
  END LOOP;

  -- (3c) activations, shallowest first --------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items') value
             WHERE value->>'file' = 'locations' AND value->>'op' = 'activate'
             ORDER BY array_length(string_to_array(value->>'key','/'),1) LOOP
    v_key := it->>'key'; v_id := public.loc_id_of_key(v_key);
    v_prev := public.loc_export_row(v_id) || jsonb_build_object('id',v_id);
    UPDATE public.locations SET is_active = true, updated_at = now() WHERE id = v_id;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','activate',v_key,v_prev,public.loc_export_row(v_id),v_uid);
  END LOOP;

  -- (4) retires -------------------------------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'locations' AND value->>'op' = 'retire' LOOP
    v_key := it->>'key'; v_id := public.loc_id_of_key(v_key);
    v_prev := public.loc_export_row(v_id) || jsonb_build_object('id',v_id);
    UPDATE public.locations SET is_active = false, updated_at = now() WHERE id = v_id;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','retire',v_key,v_prev,public.loc_export_row(v_id),v_uid);
  END LOOP;

  -- (5) deletes, deepest first ---------------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items') value
             WHERE value->>'file' = 'locations' AND value->>'op' = 'delete'
             ORDER BY array_length(string_to_array(value->>'key','/'),1) DESC LOOP
    v_key := it->>'key'; v_id := public.loc_id_of_key(v_key);
    CONTINUE WHEN v_id IS NULL;
    SELECT jsonb_build_object('value',t.value,'status',t.status,'machine',t.machine)
      INTO v_am_prev FROM public.entity_translations t
     WHERE t.entity_type='location' AND t.entity_id=v_id AND t.field='name' AND t.lang_code=public.language_code('pair');
    SELECT parent_id INTO v_parent_id FROM public.locations WHERE id = v_id;
    v_prev := public.loc_export_row(v_id)
              || jsonb_build_object('id',v_id,'parent_id',v_parent_id,'am_state',v_am_prev);
    DELETE FROM public.entity_translations
     WHERE entity_type='location' AND entity_id=v_id;
    DELETE FROM public.locations WHERE id = v_id;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','delete',v_key,v_prev,NULL,v_uid);
  END LOOP;

  -- (6) country close ------------------------------------------------------
  --     INC-215: 'close+update' closes the market AND applies the row's edits
  --     in ONE statement, writing both revisions.
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND value->>'op' IN ('retire','close+update') LOOP
    v_code := it->>'key'; f := it->'fields';
    v_prev := public.country_export_row(v_code);
    UPDATE public.countries SET
      is_active     = false,
      name_en       = COALESCE(f->>'name_en', name_en),
      unit_system   = COALESCE(f->>'unit_system', unit_system),
      currency_code = COALESCE(NULLIF(COALESCE(f->>'currency_code',''),'')::char(3), currency_code),
      display_order = COALESCE((f->>'display_order')::int, display_order),
      updated_at    = now()
     WHERE code = v_code;
    UPDATE public.locations SET is_active = false
     WHERE level = 'country' AND country_code = v_code;
    IF it->>'op' = 'close+update' THEN
      INSERT INTO public.location_import_revisions
        (batch_id, entity_type, action, entity_key, prev, post, created_by)
      VALUES (v_batch,'country','update',v_code,v_prev,public.country_export_row(v_code),v_uid);
    END IF;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'country','close',v_code,v_prev,public.country_export_row(v_code),v_uid);
  END LOOP;

  -- (7) root order, one statement per country ------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND (value->'fields') ? 'root_order' LOOP
    v_code := it->>'key';
    DELETE FROM public.country_root_order WHERE country_code = v_code;
    INSERT INTO public.country_root_order (country_code, category_id, position, created_by)
    SELECT v_code, c.id, s.ord, v_uid
      FROM jsonb_array_elements_text(it->'fields'->'root_order') WITH ORDINALITY AS s(slug, ord)
      JOIN public.categories c ON c.slug = s.slug;
  END LOOP;

  PERFORM public.log_audit('location.import.commit','locations',v_batch::text,
    jsonb_build_object('counts', v_plan->'counts', 'scope', p_scope, 'digest', p_digest));

  RETURN jsonb_build_object('batch_id', v_batch, 'counts', v_plan->'counts',
                            'refusals', '[]'::jsonb);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_commit_location_import', 'import_commit', SQLERRM);
END $fn$;
REVOKE ALL ON FUNCTION public.admin_commit_location_import(jsonb, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_location_import(jsonb, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_commit_location_import(jsonb, jsonb, text, text) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role,
--     never anon or PUBLIC; the body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied (403), notSignedIn (401); a country holder refused
--     permissionDenied:scope (403) for a file scoped to another country, to none and to a code no country holds;
--     none of them applies a row, audits or spends import_commit.
-- (c) a row of another country inside the holder's own scope: planHasRefusals (400), nothing applied; the
--     translation core's permissionDenied (403) for a pair-language name without translations:update passes the
--     shell, the place its file had applied undone.
-- (d) the holder's file of his own country applies its one row and nothing of another country, its pair-language
--     name under language_code('pair'); the global holder's file of another country applies.
-- (e) import_commit counted once per call past the gate; one audit line per applied file (and the translation
--     core's own for a pair-language name); every refusal metered.
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
  v_role_t  uuid;
  v_axz     uuid;
  v_axy     uuid;
  v_sxz     text;
  v_sxy     text;
  v_new     uuid;
  v_b1      uuid;
  v_fz      jsonb;
  v_fy      jsonb;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f14b8-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_commit_location_import(jsonb,jsonb,text,text)', '7be1affca9d9acd6e62e4d7d0644d7e2']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4b part 8 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 8 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_xq)) THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: a scratch country code already exists';
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
      RAISE EXCEPTION 'F1-4b part 8 proof: a locations permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_l, 'global'), (v_deact, v_role_l, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_l, 'country', v_xz);

    v_fz := jsonb_build_array(jsonb_build_object('row', 1, 'location_key', v_sxz || '/' || v_tag || '-iz', 'name_en', v_tag || ' iz', 'name_am', v_tag || ' am', 'action', ''));
    v_fy := jsonb_build_array(jsonb_build_object('row', 1, 'location_key', v_sxy || '/' || v_tag || '-iy', 'name_en', v_tag || ' iy', 'action', ''));

    -- (b) the gates: the account, the permission, no caller, then the scope (match on the country p_scope names)
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_commit_location_import');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_d::text)::text, true);
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fz, p_scope => v_xz::text, p_digest => v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fz, p_scope => v_xz::text, p_digest => v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (b) a caller without locations:import answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fz, p_scope => v_xz::text, p_digest => v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (b) no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fy, p_scope => v_xy::text, p_digest => v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (b) a file scoped to another country answered %', v_answer;
    END IF;
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fz, p_scope => NULL, p_digest => v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (b) a file scoped to no country answered %', v_answer;
    END IF;
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fz, p_scope => v_xq::text, p_digest => v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (b) a file scoped to a code no country holds answered %', v_answer;
    END IF;
    IF NOT coalesce(NOT EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug IN (v_tag || '-iz', v_tag || '-iy')) AND NOT EXISTS (SELECT 1 FROM public.location_import_revisions WHERE created_by IN (v_cstaff, v_plain, v_deact)), false) THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (b) a refused call applied a row';
    END IF;

    -- (c) the plan's refusals: a row of another country under the holder's own scope applies nothing (planHasRefusals,
    --     400). importRunning needs a second session: not driven.
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fy, p_scope => v_xz::text, p_digest => v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'planHasRefusals' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (c) a row of another country in the holder''s scope answered %', v_answer;
    END IF;

    -- (c) the translation core's own refusal passes the shell: a pair-language name from a holder without
    --     translations:update answers permissionDenied (403) and the file's applied place is undone
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fz, p_scope => v_xz::text, p_digest => v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (c) a pair-language name without translations:update answered %', v_answer;
    END IF;
    IF NOT coalesce(NOT EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug IN (v_tag || '-iz', v_tag || '-iy')) AND NOT EXISTS (SELECT 1 FROM public.location_import_revisions WHERE created_by IN (v_cstaff, v_plain, v_deact)), false) THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (c) a refused file applied a row';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-translations', v_tag) RETURNING id INTO v_role_t;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_t, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action IN ('update', 'manage');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_t) <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: a translations permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_t, 'global'), (v_deact, v_role_t, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_t, 'country', v_xz);

    -- (d) the successes: the country holder's file of his own country touches no other; the global holder's file of
    --     another; the pair language's name lands under language_code('pair')
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fz, p_scope => v_xz::text, p_digest => v_tag);
    IF NOT coalesce((v_answer ->> 'batch_id') IS NOT NULL AND (v_answer -> 'counts' ->> 'adds')::integer = 1, false) THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (d) the holder''s file of his own country answered %', v_answer;
    END IF;
    v_b1 := (v_answer ->> 'batch_id')::uuid;
    SELECT l.id INTO v_new FROM public.locations l WHERE l.slug LIKE 'e2e-mig-%' AND l.parent_id = v_axz AND l.slug = v_tag || '-iz';
    IF NOT coalesce(v_new IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-iy') AND (SELECT count(*) FROM public.location_import_revisions WHERE batch_id = v_b1 AND created_by = v_cstaff) = 1 AND EXISTS (SELECT 1 FROM public.entity_translations t WHERE t.entity_type = 'location' AND t.entity_id = v_new AND t.field = 'name' AND t.lang_code = public.language_code('pair') AND t.value = v_tag || ' am'), false) THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (d) the holder''s file applied other than its one row';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fy, p_scope => NULL, p_digest => v_tag);
    IF NOT coalesce((v_answer ->> 'batch_id') IS NOT NULL AND (v_answer -> 'counts' ->> 'adds')::integer = 1, false) THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (d) the global holder''s file of another country answered %', v_answer;
    END IF;
    IF NOT coalesce(EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND parent_id = v_axy AND slug = v_tag || '-iy'), false) THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: (d) the global holder''s file did not apply';
    END IF;

    -- (e) the tallies: import_commit counted once per call past the gate; one audit line per applied file; every
    --     refusal metered
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'import_commit';
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: the dial import_commit counted % for the staff caller (expected 1)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_staff;
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: the staff caller wrote % audit lines (expected 1)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'import_commit';
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: the dial import_commit counted % for the cstaff caller (expected 2)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_cstaff;
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: the cstaff caller wrote % audit lines (expected 2)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'import_commit';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: the dial import_commit counted % for the plain caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_plain;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: the plain caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'import_commit';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: the dial import_commit counted % for the deact caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_deact;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: the deact caller wrote % audit lines (expected 0)', v_count;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_commit_location_import')) IS DISTINCT FROM v_refused + 8 THEN
      RAISE EXCEPTION 'F1-4b part 8 proof: door_refusals did not meter the 8 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14b8-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14b8-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115150700') ON CONFLICT DO NOTHING;
