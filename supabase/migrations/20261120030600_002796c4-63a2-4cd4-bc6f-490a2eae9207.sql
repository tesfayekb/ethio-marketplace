-- e2e-areas: admin-locations, admin-countries, admin-imports

-- Foundations 1, turn F1-7b, part 7 of 8 — A COUNTRY'S OWN ROW IN THE PLACES UNDO (DEC-333, INC-1164; brief
-- docs/governance/briefs/f1-doors-7b.md; census docs/governance/reports/f1-doors-7b.census.md).
-- admin_undo_location_import is redeclared whole and written out from its live body (DEC-383; live md5 checked),
-- byte for byte apart from one named change: before anything is restored, each country revision of the batch is
-- judged by country_row_right (part 2) for the change its undo makes — an update's fields countries:update global
-- and its root order match, an opening or a closing countries:activate match, a created country's removal
-- countries:update global — and a missing right answers door_refuse('permissionDenied', <has_permission_scoped's
-- detail>), the gate's own form (permissionDenied or permissionDenied:scope); the service role passes. The
-- manifest's codes cell gains permissionDenied. Header and grants as live.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261120050500') THEN
    RAISE EXCEPTION 'F1-7b part 7: part 6 (2c3654f9) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_undo_location_import(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '03bdb90b19982f9b4e17f1b6212eb8a3' THEN
    RAISE EXCEPTION 'F1-7b part 7: the live admin_undo_location_import is not the body this file was built from (%)', v_md5;
  END IF;
END $pre$;

CREATE OR REPLACE FUNCTION public.admin_undo_location_import(p_batch uuid)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid(); rev public.location_import_revisions;
  v_n int := 0; v_id uuid; f jsonb; v_am jsonb; v_code char(2);
  v_scope text;
  v_ok boolean; v_det text;
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

  -- INC-1164: a country's own row is restored only under the right its country door requires.
  FOR rev IN
    SELECT * FROM public.location_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL AND entity_type = 'country'
  LOOP
    SELECT k.allowed, k.detail INTO v_ok, v_det
      FROM public.country_row_right(rev.entity_key, rev.action IN ('open', 'close'),
             rev.action IN ('update', 'create'), rev.action = 'update') k;
    IF NOT coalesce(v_ok, false) THEN PERFORM public.door_refuse('permissionDenied', v_det); END IF;
  END LOOP;

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
END $$;
REVOKE ALL ON FUNCTION public.admin_undo_location_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_location_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_location_import(uuid) TO service_role;

-- PROOFS (under a sentinel rollback; scratch users, roles, sessions, countries and places only):
-- (a) the body is this file's (md5), VOLATILE DEFINER, search path public, RETURNS jsonb, EXECUTE for authenticated
--     and the service role, never anon or PUBLIC.
-- (b) two batches through the commit door: a holder scoped to XZ of the places and country rights opens XZ with a
--     place (batch 1); a holder scoped to XZ of the places rights alone imports a place (batch 2).
-- (c) the places holder's undo of batch 1 {ok:false} permissionDenied at 403, and a global places holder whose
--     country right is XY's permissionDenied:scope, neither restoring anything; the places holder undoes batch 2;
--     the holder of both undoes batch 1: XZ closed again, its place gone.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_xz      character(2) := 'XZ';
  v_xy      character(2) := 'XY';
  v_places  uuid := gen_random_uuid();
  v_both    uuid := gen_random_uuid();
  v_other   uuid := gen_random_uuid();
  v_sess_p  uuid := gen_random_uuid();
  v_sess_b  uuid := gen_random_uuid();
  v_sess_o  uuid := gen_random_uuid();
  v_role_l  uuid;
  v_role_c  uuid;
  v_sxz     text;
  v_b1      uuid;
  v_b2      uuid;
  v_answer  jsonb;
  v_msg     text;
BEGIN
  v_tag := 'e2e-mig-f17b7-' || substr(v_hex, 1, 10);
  -- (a)
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) IS DISTINCT FROM 'bd3d06449cb60518cdaaba275c27b0ca'
             OR NOT p.prosecdef OR p.provolatile <> 'v' OR p.proconfig::text <> '{search_path=public}'
             OR p.prorettype <> 'jsonb'::regtype
        FROM pg_proc p WHERE p.oid = 'public.admin_undo_location_import(uuid)'::regprocedure)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = 'public.admin_undo_location_import(uuid)'::regprocedure)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', 'public.admin_undo_location_import(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_undo_location_import(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.admin_undo_location_import(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-7b part 7 proof (a): the undo''s body, header or grants differ';
  END IF;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy)) THEN
      RAISE EXCEPTION 'F1-7b part 7 proof: a scratch country code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', false), (v_xy, v_tag || ' xy', false);
    SELECT l.slug INTO STRICT v_sxz FROM public.locations l
     WHERE l.slug LIKE 'e2e-mig-%' AND l.level = 'country' AND l.country_code = v_xz;
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at)
    SELECT u, v_tag || '-' || n || '@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()
      FROM unnest(ARRAY[v_places, v_both, v_other], ARRAY['places', 'both', 'other']) AS t(u, n);
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_places, v_both, v_other]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_sess_p, v_places, now(), now(), 'aal2'), (v_sess_b, v_both, now(), now(), 'aal2'), (v_sess_o, v_other, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess_p, now(), now(), 'totp'), (gen_random_uuid(), v_sess_b, now(), now(), 'totp'),
           (gen_random_uuid(), v_sess_o, now(), now(), 'totp');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-places', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'locations' AND p.action IN ('view', 'import');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-countries', v_tag) RETURNING id INTO v_role_c;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_c, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'countries' AND p.action IN ('update', 'activate');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id IN (v_role_l, v_role_c)) <> 4 THEN
      RAISE EXCEPTION 'F1-7b part 7 proof: a permission of a scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES
      (v_places, v_role_l, 'country', v_xz), (v_both, v_role_l, 'country', v_xz), (v_both, v_role_c, 'country', v_xz),
      (v_other, v_role_c, 'country', v_xy);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_other, v_role_l, 'global');

    -- (b) the batches
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_both::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_b::text)::text, true);
    v_answer := public.admin_commit_location_import(
      jsonb_build_array(jsonb_build_object('row', 2, 'country_code', v_xz::text, 'action', 'open')),
      jsonb_build_array(jsonb_build_object('row', 2, 'location_key', v_sxz || '/' || v_tag || '-one', 'name_en', v_tag || ' one')),
      v_xz::text, v_tag);
    v_b1 := (v_answer ->> 'batch_id')::uuid;
    IF v_b1 IS NULL OR NOT coalesce((SELECT is_active FROM public.countries WHERE code = v_xz), false) THEN
      RAISE EXCEPTION 'F1-7b part 7 proof: (b) batch 1 answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_places::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_p::text)::text, true);
    v_answer := public.admin_commit_location_import('[]'::jsonb,
      jsonb_build_array(jsonb_build_object('row', 2, 'location_key', v_sxz || '/' || v_tag || '-two', 'name_en', v_tag || ' two')),
      v_xz::text, v_tag);
    v_b2 := (v_answer ->> 'batch_id')::uuid;
    IF v_b2 IS NULL THEN
      RAISE EXCEPTION 'F1-7b part 7 proof: (b) batch 2 answered %', v_answer;
    END IF;

    -- (c) the undos
    v_answer := public.admin_undo_location_import(v_b1);
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied'
       OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-7b part 7 proof: (c) the places holder''s undo of an opening answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_other::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_o::text)::text, true);
    v_answer := public.admin_undo_location_import(v_b1);
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope'
       OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-7b part 7 proof: (c) another country''s holder''s undo of an opening answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT is_active FROM public.countries WHERE code = v_xz), false)
       OR NOT EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-one')
       OR EXISTS (SELECT 1 FROM public.location_import_revisions WHERE batch_id = v_b1 AND undone_at IS NOT NULL) THEN
      RAISE EXCEPTION 'F1-7b part 7 proof: (c) a refused undo restored something';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_places::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_p::text)::text, true);
    v_answer := public.admin_undo_location_import(v_b2);
    IF (v_answer ->> 'restored') IS NULL OR EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-two') THEN
      RAISE EXCEPTION 'F1-7b part 7 proof: (c) the places holder''s undo of his places answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_both::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_b::text)::text, true);
    v_answer := public.admin_undo_location_import(v_b1);
    IF (v_answer ->> 'restored') IS NULL
       OR coalesce((SELECT is_active FROM public.countries WHERE code = v_xz), true)
       OR EXISTS (SELECT 1 FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-one') THEN
      RAISE EXCEPTION 'F1-7b part 7 proof: (c) the holder of both''s undo answered %', v_answer;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f17b7-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f17b7-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261120050600') ON CONFLICT DO NOTHING;
