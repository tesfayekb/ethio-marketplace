-- e2e-areas: admin-translations, admin-imports, admin-users, admin-locations, admin-countries

-- Foundations 1, turn F1-7b, part 2 of 8 — THE CORES (DEC-333, F1-4b decision 7, F1-7a ruling 1 decision 6,
-- INC-1164; brief docs/governance/briefs/f1-doors-7b.md; census docs/governance/reports/f1-doors-7b.census.md).
-- * admin_save_entity_translation_core: redeclared whole, written out from its live body (DEC-383); one change —
--   its refusal for a caller without translations:update names the right: permissionDenied:translations (the gate's
--   detail form: one lowercase word after the colon, as door_context's `scope` and this core's own `language`).
-- * impersonation_target: redeclared whole, written out; one change — the sentence `impersonation session expired`
--   becomes door_refuse('noActiveSession'), the code end_impersonation answers for the same state.
-- * country_row_right (NEW, service-only): the one rule for a country's own row — the rights its country doors
--   require: field edits and a new country countries:update GLOBAL (admin_upsert_country), the root order
--   countries:update MATCH (admin_set_country_root_order), opening or closing countries:activate MATCH
--   (admin_set_country_active); has_permission_scoped judges each, the service role passes. Its callers, the places
--   planner and the places undo, follow in parts 4 and 6.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_save_entity_translation_core(text,uuid,text,text,text)', '2a931fe0328dc630c657d52ab3b99d5e'],
    ['public.impersonation_target(uuid)', 'a50583be2e3d2768b10b9cefd04a06d3']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261120050000') THEN
    RAISE EXCEPTION 'F1-7b part 2: part 1 (74954b0b) must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-7b part 2: the live % is not the body this file was built from (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
  IF to_regprocedure('public.country_row_right(text,boolean,boolean,boolean)') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-7b part 2: country_row_right already exists';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. admin_save_entity_translation_core
CREATE OR REPLACE FUNCTION public.admin_save_entity_translation_core(p_type text, p_id uuid, p_field text, p_lang text, p_value text)
RETURNS void
LANGUAGE plpgsql
VOLATILE
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_base text;
  v_src  text;
  v_prev text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'update') THEN
    PERFORM public.door_refuse('permissionDenied', 'translations');
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'update');
  IF NOT public.translation_scope_ok(p_lang) THEN
    PERFORM public.door_refuse('permissionDenied', 'language');
  END IF;

  IF NOT ((p_type IN ('category', 'location') AND p_field = 'name')
          OR (p_type = 'attribute' AND p_field = 'label')
          OR (p_type = 'attribute' AND p_field LIKE 'option:%' AND p_lang IS DISTINCT FROM public.language_code('pair'))) THEN
    PERFORM public.door_refuse('badValue', 'field');
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    PERFORM public.door_refuse('baseLocked');
  END IF;

  v_src := public.entity_source_value(p_type, p_id, p_field);
  IF v_src IS NULL THEN
    PERFORM public.door_refuse('unknownEntity');
  END IF;

  SELECT t.value INTO v_prev FROM public.entity_translations t
   WHERE t.entity_type = p_type AND t.entity_id = p_id
     AND t.field = p_field AND t.lang_code = p_lang;

  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine,
     flagged, flag_note, updated_by, updated_at)
  VALUES (p_type, p_id, p_field, p_lang, p_value, 'edited', false,
          false, NULL, auth.uid(), now())
  ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'edited', machine = false,
        flagged = false, flag_note = NULL,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('entity_translation.save', 'entity_translations', p_id::text,
    jsonb_build_object('type', p_type, 'id', p_id, 'field', p_field, 'lang', p_lang,
                       'action', 'save', 'machine', false,
                       'old_value', left(COALESCE(v_prev, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $$;
REVOKE ALL ON FUNCTION public.admin_save_entity_translation_core(text, uuid, text, text, text) FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------ 2. impersonation_target
CREATE OR REPLACE FUNCTION public.impersonation_target(p_session uuid)
RETURNS uuid
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_target uuid;
BEGIN
  SELECT s.target_id INTO v_target
  FROM public.impersonation_sessions s
  WHERE s.id = p_session AND s.actor_id = auth.uid()
    AND s.ended_at IS NULL AND s.expires_at > now();
  IF v_target IS NULL THEN PERFORM public.door_refuse('noActiveSession'); END IF;
  RETURN v_target;
END $$;
REVOKE ALL ON FUNCTION public.impersonation_target(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.impersonation_target(uuid) TO service_role;

-- ------------------------------------------------------------ 3. country_row_right (new)
CREATE FUNCTION public.country_row_right(p_code text, p_activate boolean, p_fields boolean, p_root_order boolean)
RETURNS TABLE (allowed boolean, refused text, detail text)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_ok  boolean;
  v_det text;
BEGIN
  allowed := true;
  refused := NULL;
  detail := NULL;
  IF auth.role() IS DISTINCT FROM 'service_role' THEN
    IF p_activate THEN
      SELECT s.allowed, s.detail INTO v_ok, v_det
        FROM public.has_permission_scoped(v_uid, 'countries', 'activate', p_code::bpchar, 'match') s;
      IF NOT coalesce(v_ok, false) THEN
        allowed := false; refused := 'activate'; detail := v_det;
      END IF;
    END IF;
    IF allowed AND p_fields THEN
      SELECT s.allowed, s.detail INTO v_ok, v_det
        FROM public.has_permission_scoped(v_uid, 'countries', 'update', p_code::bpchar, 'global') s;
      IF NOT coalesce(v_ok, false) THEN
        allowed := false; refused := 'update'; detail := v_det;
      END IF;
    END IF;
    IF allowed AND p_root_order THEN
      SELECT s.allowed, s.detail INTO v_ok, v_det
        FROM public.has_permission_scoped(v_uid, 'countries', 'update', p_code::bpchar, 'match') s;
      IF NOT coalesce(v_ok, false) THEN
        allowed := false; refused := 'update'; detail := v_det;
      END IF;
    END IF;
  END IF;
  RETURN NEXT;
END $$;
COMMENT ON FUNCTION public.country_row_right(text, boolean, boolean, boolean) IS
  'F1-7b (INC-1164): the rights a change of a country''s own row needs, as its country doors require them — opening or closing countries:activate (match), field edits and a new country countries:update (global), the root order countries:update (match); one row: allowed, the refused action (activate | update) and has_permission_scoped''s detail (NULL | scope); the service role passes. Service-only: called by loc_import_plan and admin_undo_location_import.';
REVOKE ALL ON FUNCTION public.country_row_right(text, boolean, boolean, boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.country_row_right(text, boolean, boolean, boolean) TO service_role;

-- PROOFS (under a sentinel rollback; scratch users, roles, sessions and countries only):
-- (a) each body this file's (md5); the cores' headers and grants as live; country_row_right STABLE DEFINER, search
--     path public, EXECUTE for the service role only.
-- (b) the translation core, called as a scratch user without translations:update: P0D01 permissionDenied:translations;
--     as a holder of it with a fresh second factor: past that check (the next refusal is the field's, badValue:field).
-- (c) impersonation_target: an unknown or expired session P0D01 noActiveSession, through both impersonation readers
--     too; an open session of the caller answers its target.
-- (d) country_row_right, case by case: the service role passes; no caller is refused; a holder scoped to XZ of
--     countries:update and countries:activate opens and orders XZ but is refused field edits (update, scope) and XY
--     (activate, scope); a holder of the places rights alone is refused with no detail; a global holder passes all.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_xz      character(2) := 'XZ';
  v_xy      character(2) := 'XY';
  v_plain   uuid := gen_random_uuid();
  v_trans   uuid := gen_random_uuid();
  v_scoped  uuid := gen_random_uuid();
  v_glob    uuid := gen_random_uuid();
  v_places  uuid := gen_random_uuid();
  v_target  uuid := gen_random_uuid();
  v_sess_t  uuid := gen_random_uuid();
  v_role_t  uuid;
  v_role_c  uuid;
  v_role_l  uuid;
  v_live    uuid;
  v_gone    uuid;
  v_got     uuid;
  v_row     record;
  v_msg     text;
  v_cases   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f17b2-' || substr(v_hex, 1, 10);
  -- (a)
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) IS DISTINCT FROM '3db0a060f737adea54a00b34b7da3bee'
             OR p.prosecdef OR p.provolatile <> 'v' OR p.proconfig::text <> '{search_path=public}'
        FROM pg_proc p WHERE p.oid = 'public.admin_save_entity_translation_core(text,uuid,text,text,text)'::regprocedure)
     OR has_function_privilege('anon', 'public.admin_save_entity_translation_core(text,uuid,text,text,text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.admin_save_entity_translation_core(text,uuid,text,text,text)', 'EXECUTE')
     OR (SELECT md5(replace(p.prosrc, chr(13), '')) IS DISTINCT FROM '247e6d7ed630def625479b3414a771f4'
             OR NOT p.prosecdef OR p.provolatile <> 's' OR p.proconfig::text <> '{search_path=public}'
        FROM pg_proc p WHERE p.oid = 'public.impersonation_target(uuid)'::regprocedure)
     OR has_function_privilege('anon', 'public.impersonation_target(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.impersonation_target(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.impersonation_target(uuid)', 'EXECUTE')
     OR (SELECT NOT p.prosecdef OR p.provolatile <> 's' OR p.proconfig::text <> '{search_path=public}'
        FROM pg_proc p WHERE p.oid = 'public.country_row_right(text,boolean,boolean,boolean)'::regprocedure)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = 'public.country_row_right(text,boolean,boolean,boolean)'::regprocedure)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', 'public.country_row_right(text,boolean,boolean,boolean)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.country_row_right(text,boolean,boolean,boolean)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.country_row_right(text,boolean,boolean,boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-7b part 2 proof (a): a core''s body, header or grants differ';
  END IF;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy)) THEN
      RAISE EXCEPTION 'F1-7b part 2 proof: a scratch country code already exists';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_xz, v_tag || ' xz', false), (v_xy, v_tag || ' xy', false);
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at)
    SELECT u, v_tag || '-' || n || '@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()
      FROM unnest(ARRAY[v_plain, v_trans, v_scoped, v_glob, v_places, v_target],
                  ARRAY['plain', 'trans', 'scoped', 'glob', 'places', 'target']) AS t(u, n);
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_trans, v_tag || '-f', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess_t, v_trans, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess_t, now(), now(), 'totp');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-translations', v_tag) RETURNING id INTO v_role_t;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_t, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'translations' AND p.action IN ('update', 'manage');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-countries', v_tag) RETURNING id INTO v_role_c;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_c, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'countries' AND p.action IN ('update', 'activate');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-places', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'locations' AND p.action IN ('view', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id IN (v_role_t, v_role_c, v_role_l)) <> 6 THEN
      RAISE EXCEPTION 'F1-7b part 2 proof: a permission of a scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES
      (v_trans, v_role_t, 'global'), (v_glob, v_role_c, 'global'), (v_places, v_role_l, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_scoped, v_role_c, 'country', v_xz);

    -- (b) the translation core
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    BEGIN
      PERFORM public.admin_save_entity_translation_core('location', gen_random_uuid(), 'name', 'xx', v_tag);
      RAISE EXCEPTION 'F1-7b part 2 proof: (b) the core let a caller without translations:update through';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      IF v_msg IS DISTINCT FROM 'permissionDenied:translations' THEN
        RAISE EXCEPTION 'F1-7b part 2 proof: (b) the core refused a caller without the right as %', v_msg;
      END IF;
    END;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_trans::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_t::text)::text, true);
    BEGIN
      PERFORM public.admin_save_entity_translation_core('location', gen_random_uuid(), 'label', public.language_code('pair'), v_tag);
      RAISE EXCEPTION 'F1-7b part 2 proof: (b) the core saved a field no entity type has';
    EXCEPTION WHEN SQLSTATE 'P0D01' THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      IF v_msg IS DISTINCT FROM 'badValue:field' THEN
        RAISE EXCEPTION 'F1-7b part 2 proof: (b) a holder of the right was refused as % (expected badValue:field)', v_msg;
      END IF;
    END;

    -- (c) impersonation_target
    INSERT INTO public.impersonation_sessions (actor_id, target_id, reason, expires_at)
    VALUES (v_plain, v_target, v_tag, now() + interval '1 hour') RETURNING id INTO v_live;
    INSERT INTO public.impersonation_sessions (actor_id, target_id, reason, started_at, expires_at)
    VALUES (v_plain, v_target, v_tag, now() - interval '2 hours', now() - interval '1 hour') RETURNING id INTO v_gone;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_got := public.impersonation_target(v_live);
    IF v_got IS DISTINCT FROM v_target THEN
      RAISE EXCEPTION 'F1-7b part 2 proof: (c) an open session answered %', v_got;
    END IF;
    v_cases := ARRAY[
      ['target', format('SELECT public.impersonation_target(%L)', v_gone)],
      ['target', format('SELECT public.impersonation_target(%L)', gen_random_uuid())],
      ['profile', format('SELECT * FROM public.impersonated_get_profile(%L)', v_gone)],
      ['listings', format('SELECT * FROM public.impersonated_list_listings(%L)', v_gone)]];
    FOR i IN 1..array_length(v_cases, 1) LOOP
      BEGIN
        EXECUTE v_cases[i][2];
        RAISE EXCEPTION 'F1-7b part 2 proof: (c) case % (%) answered without a refusal', i, v_cases[i][1];
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
        IF v_msg IS DISTINCT FROM 'noActiveSession' THEN
          RAISE EXCEPTION 'F1-7b part 2 proof: (c) case % answered % (expected noActiveSession)', i, v_msg;
        END IF;
      END;
    END LOOP;

    -- (d) country_row_right: [caller, code, activate, fields, root order, allowed, refused, detail]
    v_cases := ARRAY[
      ['service', v_xz::text, 'true', 'true', 'true', 'true', '', ''],
      ['none', v_xz::text, 'true', 'false', 'false', 'false', 'activate', ''],
      ['none', v_xz::text, 'false', 'true', 'false', 'false', 'update', ''],
      [v_scoped::text, v_xz::text, 'true', 'false', 'true', 'true', '', ''],
      [v_scoped::text, v_xz::text, 'false', 'true', 'false', 'false', 'update', 'scope'],
      [v_scoped::text, v_xy::text, 'true', 'false', 'false', 'false', 'activate', 'scope'],
      [v_scoped::text, v_xy::text, 'false', 'false', 'true', 'false', 'update', 'scope'],
      [v_places::text, v_xz::text, 'false', 'false', 'true', 'false', 'update', ''],
      [v_places::text, v_xz::text, 'true', 'true', 'true', 'false', 'activate', ''],
      [v_glob::text, v_xy::text, 'true', 'true', 'true', 'true', '', ''],
      [v_glob::text, v_xz::text, 'false', 'false', 'false', 'true', '', '']];
    FOR i IN 1..array_length(v_cases, 1) LOOP
      IF v_cases[i][1] = 'service' THEN
        PERFORM set_config('request.jwt.claims', json_build_object('role', 'service_role')::text, true);
      ELSIF v_cases[i][1] = 'none' THEN
        PERFORM set_config('request.jwt.claims', '{}', true);
      ELSE
        PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cases[i][1], 'role', 'authenticated')::text, true);
      END IF;
      SELECT k.allowed, k.refused, k.detail INTO STRICT v_row
        FROM public.country_row_right(v_cases[i][2], v_cases[i][3]::boolean, v_cases[i][4]::boolean, v_cases[i][5]::boolean) k;
      IF v_row.allowed IS DISTINCT FROM v_cases[i][6]::boolean
         OR v_row.refused IS DISTINCT FROM nullif(v_cases[i][7], '')
         OR v_row.detail IS DISTINCT FROM nullif(v_cases[i][8], '') THEN
        RAISE EXCEPTION 'F1-7b part 2 proof: (d) case % answered (%, %, %)', i, v_row.allowed, v_row.refused, v_row.detail;
      END IF;
    END LOOP;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f17b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f17b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261120050100') ON CONFLICT DO NOTHING;
