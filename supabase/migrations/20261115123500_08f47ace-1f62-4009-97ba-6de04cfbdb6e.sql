-- e2e-areas: admin-locations, admin-imports

-- Foundations 1, turn F1-4b, part 9 of 9 — THE PLACES IMPORT'S UNDO ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4b.md).
-- admin_undo_location_import is redeclared WHOLE from its live body (live md5 checked; a computed declaration). Its
-- gate becomes ONE door_context('staff', locations:import, import_undo, the batch's one country, match): the country
-- its revisions name (a country revision's key, a place revision's country_code), read back from its countries row;
-- a batch over two countries, or of none, is a global holder's. 'unknown import batch' becomes unknownBatch,
-- batchAlreadyUndone a code, undoBlocked keeps its detail (hasRows); its 'am' literals become language_code('pair')
-- (K4) and the shell answers a refusal, undoing every row the call had restored. Return type unchanged (jsonb):
-- CREATE OR REPLACE. Proofs on scratch countries under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_undo_location_import(uuid)', 'c4168e1ff2402a72509cb643441f97dc']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115150700') THEN
    RAISE EXCEPTION 'F1-4b part 9: part 8 (33896921) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4b part 9: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 9: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_undo_location_import (whole from live = literal 20260916013820 :36 + its computed gate; the gate on door_context with the batch's country, the codes and the shell)
CREATE OR REPLACE FUNCTION public.admin_undo_location_import(p_batch uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $fn$
DECLARE
  v_uid uuid := auth.uid(); rev public.location_import_revisions;
  v_n int := 0; v_id uuid; f jsonb; v_am jsonb; v_code char(2);
  v_scope text;
BEGIN
  -- the batch's one country: a country revision's key, a place revision's country_code (after or before);
  -- a batch over two countries, or none, is a global holder's.
  SELECT CASE WHEN count(*) > 0 AND count(s.code) = count(*) AND count(DISTINCT s.code) = 1
              THEN min(s.code) END
    INTO v_scope
    FROM (SELECT CASE WHEN r.entity_type = 'country' THEN r.entity_key
                      ELSE coalesce(r.post ->> 'country_code', r.prev ->> 'country_code') END AS code
            FROM public.location_import_revisions r
           WHERE r.batch_id = p_batch) s;
  SELECT c.code INTO v_scope FROM public.countries c WHERE c.code = v_scope;
  PERFORM public.door_context('staff', 'locations', 'import', 'import_undo', v_scope, 'match');


  IF NOT EXISTS (SELECT 1 FROM public.location_import_revisions WHERE batch_id = p_batch) THEN
    PERFORM public.door_refuse('unknownBatch');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.location_import_revisions
                  WHERE batch_id = p_batch AND undone_at IS NULL) THEN
    PERFORM public.door_refuse('batchAlreadyUndone');
  END IF;

  -- reverse apply order, derived from (entity_type, action)
  FOR rev IN
    SELECT * FROM public.location_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL
     ORDER BY CASE entity_type || ':' || action
                WHEN 'country:update' THEN 1 WHEN 'country:close' THEN 2
                WHEN 'location:delete' THEN 3 WHEN 'location:retire' THEN 4
                WHEN 'location:activate' THEN 5 WHEN 'location:update' THEN 6
                WHEN 'location:create' THEN 7 WHEN 'country:create' THEN 8
                ELSE 9 END,
              -- INC-201: deleted rows come back SHALLOWEST-first so a parent exists
              -- before its child returns; every other group keeps deepest-first.
              CASE WHEN entity_type = 'location' AND action = 'delete'
                   THEN array_length(string_to_array(entity_key,'/'),1)
                   ELSE -array_length(string_to_array(entity_key,'/'),1) END
  LOOP
    IF rev.entity_type = 'country' THEN
      v_code := rev.entity_key;
      IF rev.action = 'update' THEN
        UPDATE public.countries SET
          name_en = rev.prev->>'name_en',
          unit_system = rev.prev->>'unit_system',
          currency_code = NULLIF(rev.prev->>'currency_code','')::char(3),
          display_order = (rev.prev->>'display_order')::int,
          updated_at = now()
         WHERE code = v_code;
        DELETE FROM public.country_root_order WHERE country_code = v_code;
        INSERT INTO public.country_root_order (country_code, category_id, position, created_by)
        SELECT v_code, c.id, s.ord, v_uid
          FROM unnest(string_to_array(COALESCE(rev.prev->>'root_order',''),'|')) WITH ORDINALITY AS s(slug, ord)
          JOIN public.categories c ON c.slug = s.slug
         WHERE btrim(s.slug) <> '';
      ELSIF rev.action = 'close' THEN
        UPDATE public.countries SET is_active = (rev.prev->>'is_active') = 'true', updated_at = now()
         WHERE code = v_code;
        UPDATE public.locations SET is_active = (rev.prev->>'is_active') = 'true'
         WHERE level = 'country' AND country_code = v_code;
      ELSIF rev.action = 'open' THEN
        UPDATE public.countries SET is_active = false, updated_at = now() WHERE code = v_code;
        UPDATE public.locations SET is_active = false
         WHERE level = 'country' AND country_code = v_code;
      ELSIF rev.action = 'create' THEN
        -- INC-206 — the market was born WITH its anchor place (the L2b-M
        -- trigger `countries_anchor_on_insert`), so the undo of a create must
        -- first take that birth row back. It is removed ONLY when it carries
        -- nothing of its own: no child place, no listing (direct or through
        -- listing_locations) and no coverage reference (a profile defaulting
        -- there). Anything else it holds is a row the operator made, and the
        -- checks below then refuse the undo exactly as before.
        SELECT id INTO v_id
          FROM public.locations
         WHERE country_code = v_code AND level = 'country' AND parent_id IS NULL;
        IF v_id IS NOT NULL
           AND NOT EXISTS (SELECT 1 FROM public.locations c WHERE c.parent_id = v_id)
           AND NOT EXISTS (SELECT 1 FROM public.listings l WHERE l.location_id = v_id)
           AND NOT EXISTS (SELECT 1 FROM public.listing_locations ll WHERE ll.location_id = v_id)
           AND NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.default_post_location_id = v_id) THEN
          DELETE FROM public.entity_translations
           WHERE entity_type = 'location' AND entity_id = v_id;
          DELETE FROM public.locations WHERE id = v_id;
        END IF;
        v_id := NULL;
        IF EXISTS (SELECT 1 FROM public.locations WHERE country_code = v_code)
           OR EXISTS (SELECT 1 FROM public.user_roles WHERE scope_country = v_code) THEN
          PERFORM public.door_refuse('undoBlocked', 'hasRows');
        END IF;
        DELETE FROM public.country_root_order WHERE country_code = v_code;
        DELETE FROM public.countries WHERE code = v_code;
      END IF;
    ELSE
      IF rev.action = 'delete' THEN
        INSERT INTO public.locations
          (id, parent_id, level, country_code, name_en, slug, iso_3166_2, aliases,
           display_order, center_lat, center_lng, is_active, source)
        VALUES ((rev.prev->>'id')::uuid, NULLIF(rev.prev->>'parent_id','')::uuid,
                rev.prev->>'level', (rev.prev->>'country_code')::char(2),
                rev.prev->>'name_en',
                (string_to_array(rev.entity_key,'/'))[array_length(string_to_array(rev.entity_key,'/'),1)],
                NULLIF(rev.prev->>'iso_3166_2',''),
                COALESCE(public.cat_pipe(rev.prev->>'aliases'), '{}'::text[]),
                (rev.prev->>'display_order')::int,
                public.loc_num(rev.prev->>'center_lat'), public.loc_num(rev.prev->>'center_lng'),
                (rev.prev->>'is_active') = 'true', rev.prev->>'source');
        v_id := (rev.prev->>'id')::uuid;
      ELSE
        v_id := public.loc_id_of_key(rev.entity_key);
      END IF;

      IF v_id IS NOT NULL AND rev.action = 'retire' THEN
        UPDATE public.locations SET is_active = (rev.prev->>'is_active') = 'true', updated_at = now()
         WHERE id = v_id;
      ELSIF v_id IS NOT NULL AND rev.action = 'activate' THEN
        UPDATE public.locations SET is_active = (rev.prev->>'is_active') = 'true', updated_at = now()
         WHERE id = v_id;
      ELSIF v_id IS NOT NULL AND rev.action = 'update' THEN
        UPDATE public.locations SET
          name_en = rev.prev->>'name_en',
          iso_3166_2 = NULLIF(rev.prev->>'iso_3166_2',''),
          aliases = COALESCE(public.cat_pipe(rev.prev->>'aliases'), '{}'::text[]),
          display_order = (rev.prev->>'display_order')::int,
          center_lat = public.loc_num(rev.prev->>'center_lat'),
          center_lng = public.loc_num(rev.prev->>'center_lng'),
          updated_at = now()
         WHERE id = v_id;
      ELSIF v_id IS NOT NULL AND rev.action = 'create' THEN
        DELETE FROM public.entity_translations WHERE entity_type='location' AND entity_id=v_id;
        DELETE FROM public.locations WHERE id = v_id;
        v_id := NULL;
      END IF;

      -- the am state, exactly as it was
      IF v_id IS NOT NULL AND rev.action IN ('update','delete') THEN
        v_am := rev.prev->'am_state';
        IF v_am IS NULL OR v_am = 'null'::jsonb THEN
          DELETE FROM public.entity_translations
           WHERE entity_type='location' AND entity_id=v_id AND field='name' AND lang_code=public.language_code('pair');
        ELSE
          INSERT INTO public.entity_translations
            (entity_type, entity_id, field, lang_code, value, status, machine, updated_by, updated_at)
          VALUES ('location', v_id, 'name', public.language_code('pair'), v_am->>'value',
                  COALESCE(v_am->>'status','edited'), COALESCE((v_am->>'machine')::boolean,false),
                  v_uid, now())
          ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
            SET value = EXCLUDED.value, status = EXCLUDED.status,
                machine = EXCLUDED.machine, updated_by = v_uid, updated_at = now();
        END IF;
      END IF;
    END IF;

    UPDATE public.location_import_revisions SET undone_at = now() WHERE id = rev.id;
    v_n := v_n + 1;
  END LOOP;

  PERFORM public.log_audit('location.import.undo','locations',p_batch::text,
    jsonb_build_object('restored', v_n));
  RETURN jsonb_build_object('restored', v_n);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_undo_location_import', 'import_undo', SQLERRM);
END $fn$;
REVOKE ALL ON FUNCTION public.admin_undo_location_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_location_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_location_import(uuid) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role,
--     never anon or PUBLIC; the body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied (403), notSignedIn (401); a country holder refused
--     permissionDenied:scope (403) for a batch of another country, over two countries, of a country he does not
--     hold and for no batch; none of them restores a row, audits or spends import_undo.
-- (c) unknownBatch; undoBlocked:hasRows for a created country that now holds a role, every restored row undone.
-- (d) the holder undoes his own country's batch ({restored:1}) and is then told batchAlreadyUndone; the global holder
--     undoes the batch over two countries ({restored:2}).
-- (e) import_undo counted once per call past the gate; one audit line per applied file (and the translation core's
--     own for a pair-language name) and per undo; every refusal metered.
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
  v_b1      uuid;
  v_b2      uuid;
  v_b3      uuid;
  v_b4      uuid;
  v_fz      jsonb;
  v_fy      jsonb;
  v_fzy     jsonb;
  v_fq      jsonb;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f14b9-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_undo_location_import(uuid)', '03bdb90b19982f9b4e17f1b6212eb8a3']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4b part 9 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 9 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_xq)) THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: a scratch country code already exists';
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
      RAISE EXCEPTION 'F1-4b part 9 proof: a locations permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_l, 'global'), (v_deact, v_role_l, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_l, 'country', v_xz);
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-translations', v_tag) RETURNING id INTO v_role_t;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_t, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action IN ('update', 'manage');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_t) <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: a translations permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_t, 'global'), (v_deact, v_role_t, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_t, 'country', v_xz);

    v_fz := jsonb_build_array(jsonb_build_object('row', 1, 'location_key', v_sxz || '/' || v_tag || '-iz', 'name_en', v_tag || ' iz', 'name_am', v_tag || ' am', 'action', ''));
    v_fy := jsonb_build_array(jsonb_build_object('row', 1, 'location_key', v_sxy || '/' || v_tag || '-iy', 'name_en', v_tag || ' iy', 'action', ''));
    v_fzy := jsonb_build_array(
      jsonb_build_object('row', 1, 'location_key', v_sxz || '/' || v_tag || '-jz', 'name_en', v_tag || ' jz', 'action', ''),
      jsonb_build_object('row', 2, 'location_key', v_sxy || '/' || v_tag || '-jy', 'name_en', v_tag || ' jy', 'action', ''));
    v_fq := jsonb_build_array(jsonb_build_object('row', 1, 'country_code', v_xq::text, 'name_en', v_tag || ' xq', 'action', ''));

    -- the batches, through the commit door (part 5's proof): the holder's of his country, a global one of another, a
    -- global one over both, a global one that creates a country
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fz, p_scope => v_xz::text, p_digest => v_tag);
    IF NOT coalesce((v_answer ->> 'batch_id') IS NOT NULL, false) THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: a batch of the holder''s own country answered %', v_answer;
    END IF;
    v_b1 := (v_answer ->> 'batch_id')::uuid;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fy, p_scope => NULL, p_digest => v_tag);
    IF NOT coalesce((v_answer ->> 'batch_id') IS NOT NULL, false) THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: a batch of another country answered %', v_answer;
    END IF;
    v_b2 := (v_answer ->> 'batch_id')::uuid;
    v_answer := public.admin_commit_location_import(p_countries => '[]'::jsonb, p_locations => v_fzy, p_scope => NULL, p_digest => v_tag);
    IF NOT coalesce((v_answer ->> 'batch_id') IS NOT NULL, false) THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: a batch over two countries answered %', v_answer;
    END IF;
    v_b3 := (v_answer ->> 'batch_id')::uuid;
    v_answer := public.admin_commit_location_import(p_countries => v_fq, p_locations => '[]'::jsonb, p_scope => NULL, p_digest => v_tag);
    IF NOT coalesce((v_answer ->> 'batch_id') IS NOT NULL, false) THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: a batch that creates a country answered %', v_answer;
    END IF;
    v_b4 := (v_answer ->> 'batch_id')::uuid;

    -- (b) the gates: the account, the permission, no caller, then the scope (match on the batch's one country)
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_undo_location_import');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_d::text)::text, true);
    v_answer := public.admin_undo_location_import(v_b1);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_undo_location_import(v_b1);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (b) a caller without locations:import answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_undo_location_import(v_b1);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (b) no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_undo_location_import(v_b2);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (b) a batch of another country answered %', v_answer;
    END IF;
    v_answer := public.admin_undo_location_import(v_b3);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (b) a batch over two countries answered %', v_answer;
    END IF;
    v_answer := public.admin_undo_location_import(v_b4);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (b) a batch of a country he does not hold answered %', v_answer;
    END IF;
    v_answer := public.admin_undo_location_import(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (b) no batch answered %', v_answer;
    END IF;
    IF NOT coalesce(EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-iy') AND EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-jz') AND EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-jy') AND EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-iz') AND NOT EXISTS (SELECT 1 FROM public.location_import_revisions WHERE batch_id IN (v_b1, v_b2, v_b3, v_b4) AND undone_at IS NOT NULL), false) THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (b) a refused call restored a row';
    END IF;

    -- (c) each code, every earlier check cleared, its exact message and a 400
    -- a role on the created country, so its undo is blocked
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_plain, v_role_l, 'country', v_xq);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_undo_location_import(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownBatch' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (c) no batch answered %', v_answer;
    END IF;
    v_answer := public.admin_undo_location_import(v_b4);
    IF v_answer ->> 'message' IS DISTINCT FROM 'undoBlocked:hasRows' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (c) a batch whose country now holds a role answered %', v_answer;
    END IF;
    IF NOT coalesce(EXISTS (SELECT 1 FROM public.countries WHERE code = v_xq) AND NOT EXISTS (SELECT 1 FROM public.location_import_revisions WHERE batch_id = v_b4 AND undone_at IS NOT NULL), false) THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (c) a blocked undo restored a row';
    END IF;

    -- (d) the successes: the holder undoes his own country's batch, then is told it is undone; the global holder undoes
    --     the batch over two countries
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_undo_location_import(v_b1);
    IF NOT coalesce((v_answer ->> 'restored')::integer = 1, false) THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (d) the holder''s undo of his own country''s batch answered %', v_answer;
    END IF;
    IF NOT coalesce(NOT EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-iz'), false) THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (d) the holder''s undo left the place';
    END IF;
    v_answer := public.admin_undo_location_import(v_b1);
    IF v_answer ->> 'message' IS DISTINCT FROM 'batchAlreadyUndone' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (d) the same batch again answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_undo_location_import(v_b3);
    IF NOT coalesce((v_answer ->> 'restored')::integer = 2, false) THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (d) the global holder''s undo over two countries answered %', v_answer;
    END IF;
    IF NOT coalesce(NOT EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug IN (v_tag || '-jz', v_tag || '-jy')) AND EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-iy'), false) THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: (d) the global holder''s undo left a place';
    END IF;

    -- (e) the tallies: import_undo counted once per call past the gate (import_commit once per batch made); one audit
    --     line per applied file and per undo; every refusal metered
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'import_undo';
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: the dial import_undo counted % for the staff caller (expected 3)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'import_commit';
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: the dial import_commit counted % for the staff caller (expected 3)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_staff;
    IF v_count <> 4 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: the staff caller wrote % audit lines (expected 4)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'import_undo';
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: the dial import_undo counted % for the cstaff caller (expected 2)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'import_commit';
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: the dial import_commit counted % for the cstaff caller (expected 1)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_cstaff;
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: the cstaff caller wrote % audit lines (expected 3)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'import_undo';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: the dial import_undo counted % for the plain caller (expected 0)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'import_commit';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: the dial import_commit counted % for the plain caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_plain;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: the plain caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'import_undo';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: the dial import_undo counted % for the deact caller (expected 0)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'import_commit';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: the dial import_commit counted % for the deact caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_deact;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: the deact caller wrote % audit lines (expected 0)', v_count;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_undo_location_import')) IS DISTINCT FROM v_refused + 10 THEN
      RAISE EXCEPTION 'F1-4b part 9 proof: door_refusals did not meter the 10 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14b9-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14b9-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115150800') ON CONFLICT DO NOTHING;
