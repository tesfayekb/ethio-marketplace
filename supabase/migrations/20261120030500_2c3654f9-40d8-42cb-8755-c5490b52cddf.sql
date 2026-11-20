-- e2e-areas: admin-countries, admin-users, admin-roles

-- Foundations 1, turn F1-7b, part 6 of 8 — THE ROLE AND COUNTRY DOORS CHECK A CODE BEFORE POSTGRES DOES (DEC-333,
-- INC-1156, INC-1163; brief docs/governance/briefs/f1-doors-7b.md; census
-- docs/governance/reports/f1-doors-7b.census.md). Four doors, each redeclared whole and written out from its live
-- body (DEC-383; live md5 checked), byte for byte apart from the named change; headers, grants and comments as live
-- except assign_role's comment, restated with its new codes.
-- * assign_role (INC-1156): after its gate and its role checks, a scope that is not two letters answers
--   badCountryCode (the country doors' check) and a person no account holds answers unknownUser — read where its
--   foreign key reads, auth.users — before the insert reaches the column's length or the key.
-- * admin_upsert_country, admin_set_country_active, admin_set_country_root_order (INC-1163): the code is checked as
--   text before it is held in a two-letter variable; a longer code answers badCountryCode.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.assign_role(uuid,text,character)', '1546e9c54840be08feb2f509b1e18958'],
    ['public.admin_upsert_country(text,text,text,text,integer)', 'd897481fbdaca05de73d6f6d2b8979ba'],
    ['public.admin_set_country_active(text,boolean,boolean)', 'ee6abf5b62714bb22868ab96d646f3fb'],
    ['public.admin_set_country_root_order(text,uuid[])', '539563ee560f0cfab603e045e4023f9f']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261120050400') THEN
    RAISE EXCEPTION 'F1-7b part 6: part 5 (b2c15e1f) must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-7b part 6: the live % is not the body this file was built from (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. assign_role
CREATE OR REPLACE FUNCTION public.assign_role(p_target_user uuid, p_role_name text, p_scope_country character DEFAULT NULL::bpchar)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ctx     public.door_ctx;
  v_role_id uuid;
BEGIN
  v_ctx := public.door_context('staff', 'roles', 'assign', 'staff_config', p_scope_country, 'match');

  IF p_role_name IN ('super_admin','user') THEN
    PERFORM public.door_refuse('roleReserved', p_role_name);
  END IF;
  SELECT id INTO v_role_id FROM public.roles WHERE name = p_role_name;
  IF v_role_id IS NULL THEN PERFORM public.door_refuse('unknownRole'); END IF;
  -- INC-1156: the scope's shape and the person, by the door's codes, before the insert reaches
  -- the column's length or the key.
  IF p_scope_country IS NOT NULL AND upper(p_scope_country::text) !~ '^[A-Z]{2}$' THEN
    PERFORM public.door_refuse('badCountryCode');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p_target_user) THEN
    PERFORM public.door_refuse('unknownUser');
  END IF;

  INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country, assigned_by)
  VALUES (p_target_user, v_role_id,
          CASE WHEN p_scope_country IS NULL THEN 'global' ELSE 'country' END,
          p_scope_country, auth.uid())
  ON CONFLICT DO NOTHING;

  PERFORM public.log_audit('role.assign', 'user_roles', p_target_user::text,
    jsonb_build_object('role', p_role_name, 'scope_country', p_scope_country,
                       'scope_type', CASE WHEN p_scope_country IS NULL THEN 'global' ELSE 'country' END));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('assign_role', 'staff_config', SQLERRM);
END; $$;
COMMENT ON FUNCTION public.assign_role(uuid, text, character) IS
  'F1-2 on the door shell (DEC-333): assigns a role behind door_context(staff, roles:assign, staff_config, the scope country in match mode — INC-834); refuses roleReserved (super_admin, user) / unknownRole / badCountryCode (a scope that is not two letters) / unknownUser (no account holds the person; F1-7b, INC-1156); audits role.assign; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.assign_role(uuid, text, character) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.assign_role(uuid, text, character) TO authenticated;
GRANT ALL ON FUNCTION public.assign_role(uuid, text, character) TO service_role;

-- ------------------------------------------------------------ 2. admin_upsert_country
CREATE OR REPLACE FUNCTION public.admin_upsert_country(p_code text, p_name_en text, p_unit_system text, p_currency_code text, p_display_order integer)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code char(2);
  v_old  public.countries;
BEGIN
  PERFORM public.door_context('staff', 'countries', 'update', 'staff_config', NULL, 'global');

  IF upper(coalesce(p_code, '')) !~ '^[A-Z]{2}$' THEN PERFORM public.door_refuse('badCountryCode'); END IF;
  v_code := upper(coalesce(p_code, ''));
  IF p_unit_system IS NOT NULL AND p_unit_system NOT IN ('metric','imperial') THEN
    PERFORM public.door_refuse('badUnitSystem');
  END IF;
  IF p_currency_code IS NOT NULL AND upper(p_currency_code) !~ '^[A-Z]{3}$' THEN
    PERFORM public.door_refuse('badCurrency');
  END IF;

  SELECT * INTO v_old FROM public.countries WHERE code = v_code;
  IF NOT FOUND THEN
    IF coalesce(trim(coalesce(p_name_en, '')), '') = '' THEN PERFORM public.door_refuse('nameRequired'); END IF;
    INSERT INTO public.countries (code, name_en, is_active, unit_system, currency_code, display_order)
    VALUES (v_code, p_name_en, false, coalesce(p_unit_system, 'metric'),
            upper(p_currency_code), coalesce(p_display_order, 0));
  ELSE
    -- never touches is_active: opening a market is admin_set_country_active.
    UPDATE public.countries c
       SET name_en       = coalesce(p_name_en, c.name_en),
           unit_system   = coalesce(p_unit_system, c.unit_system),
           currency_code = coalesce(upper(p_currency_code), c.currency_code),
           display_order = coalesce(p_display_order, c.display_order)
     WHERE c.code = v_code;
  END IF;

  PERFORM public.log_audit('country.upsert', 'country', v_code,
    jsonb_build_object(
      'old', CASE WHEN v_old.code IS NULL THEN NULL ELSE jsonb_build_object(
        'name_en', v_old.name_en, 'unit_system', v_old.unit_system,
        'currency_code', v_old.currency_code, 'display_order', v_old.display_order) END,
      'new', (SELECT jsonb_build_object('name_en', n.name_en, 'unit_system', n.unit_system,
        'currency_code', n.currency_code, 'display_order', n.display_order)
        FROM public.countries n WHERE n.code = v_code)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_upsert_country', 'staff_config', SQLERRM);
END $$;
REVOKE ALL ON FUNCTION public.admin_upsert_country(text, text, text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_country(text, text, text, text, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_upsert_country(text, text, text, text, integer) TO service_role;

-- ------------------------------------------------------------ 3. admin_set_country_active
CREATE OR REPLACE FUNCTION public.admin_set_country_active(p_code text, p_active boolean, p_force_hide boolean DEFAULT false)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code   char(2);
  v_row    public.countries;
  v_anchor uuid;
  v_scope  char(2);
BEGIN
  SELECT c.code INTO v_scope FROM public.countries c WHERE c.code = upper(coalesce(p_code, ''));
  PERFORM public.door_context('staff', 'countries', 'activate', 'staff_config', v_scope, 'match');

  IF upper(coalesce(p_code, '')) !~ '^[A-Z]{2}$' THEN PERFORM public.door_refuse('badCountryCode'); END IF;
  v_code := upper(coalesce(p_code, ''));
  SELECT * INTO v_row FROM public.countries WHERE code = v_code;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownCountry'); END IF;

  IF p_active THEN
    UPDATE public.countries SET is_active = true WHERE code = v_code;

    SELECT id INTO v_anchor FROM public.locations
     WHERE level = 'country' AND country_code = v_code LIMIT 1;
    IF v_anchor IS NULL THEN
      INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
      VALUES (NULL, 'country', v_code, v_row.name_en,
              public.location_slug_candidate(v_row.name_en, NULL), true, 'admin')
      RETURNING id INTO v_anchor;
    ELSE
      UPDATE public.locations SET is_active = true WHERE id = v_anchor;
    END IF;

    PERFORM public.log_audit('country.open', 'country', v_code,
      jsonb_build_object('anchor', v_anchor, 'force_hide', p_force_hide));
  ELSE
    IF NOT p_force_hide AND EXISTS (
      SELECT 1 FROM public.user_roles ur WHERE ur.scope_country = v_code
    ) THEN
      PERFORM public.door_refuse('scopedRolesExist');
    END IF;

    UPDATE public.countries SET is_active = false WHERE code = v_code;
    -- the path rule hides the subtree; child rows are not written.
    UPDATE public.locations SET is_active = false
     WHERE level = 'country' AND country_code = v_code;

    PERFORM public.log_audit('country.close', 'country', v_code,
      jsonb_build_object('force_hide', p_force_hide));
  END IF;
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_country_active', 'staff_config', SQLERRM);
END $$;
REVOKE ALL ON FUNCTION public.admin_set_country_active(text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_country_active(text, boolean, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_country_active(text, boolean, boolean) TO service_role;

-- ------------------------------------------------------------ 4. admin_set_country_root_order
CREATE OR REPLACE FUNCTION public.admin_set_country_root_order(p_code text, p_category_ids uuid[])
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code char(2);
  v_ids  uuid[] := coalesce(p_category_ids, '{}'::uuid[]);
  v_old  jsonb;
  v_bad  int;
  v_scope char(2);
BEGIN
  SELECT c.code INTO v_scope FROM public.countries c WHERE c.code = upper(coalesce(p_code, ''));
  PERFORM public.door_context('staff', 'countries', 'update', 'staff_config', v_scope, 'match');

  IF upper(coalesce(p_code, '')) !~ '^[A-Z]{2}$' THEN PERFORM public.door_refuse('badCountryCode'); END IF;
  v_code := upper(coalesce(p_code, ''));
  IF NOT EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    PERFORM public.door_refuse('unknownCountry');
  END IF;

  IF (SELECT count(DISTINCT u) FROM unnest(v_ids) u) <> array_length(v_ids, 1)
     AND array_length(v_ids, 1) IS NOT NULL THEN
    PERFORM public.door_refuse('duplicateCategory');
  END IF;

  SELECT count(*) INTO v_bad
    FROM unnest(v_ids) AS u(id)
   WHERE NOT EXISTS (
     SELECT 1 FROM public.categories c
      JOIN public.category_tree_pointers p ON p.child_id = c.id AND p.parent_id IS NULL
     WHERE c.id = u.id AND c.is_active);
  IF v_bad > 0 THEN PERFORM public.door_refuse('notARoot'); END IF;

  SELECT to_jsonb(array_agg(x.category_id ORDER BY x.position)) INTO v_old
    FROM public.country_root_order x WHERE x.country_code = v_code;

  DELETE FROM public.country_root_order WHERE country_code = v_code;
  INSERT INTO public.country_root_order (country_code, category_id, position, created_by)
  SELECT v_code, t.id, t.ordinality::integer, auth.uid()
    FROM unnest(v_ids) WITH ORDINALITY AS t(id, ordinality);

  PERFORM public.log_audit('country.rootOrder', 'country', v_code,
    jsonb_build_object('old', v_old, 'new', to_jsonb(v_ids)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_country_root_order', 'staff_config', SQLERRM);
END $$;
REVOKE ALL ON FUNCTION public.admin_set_country_root_order(text, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_country_root_order(text, uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_country_root_order(text, uuid[]) TO service_role;

-- PROOFS (under a sentinel rollback; scratch users, roles, sessions and countries only):
-- (a) each body this file's (md5), header and grants as live (EXECUTE for authenticated, never anon or PUBLIC).
-- (b) assign_role, as a holder of roles:assign with a fresh second factor: a person no account holds {ok:false}
--     unknownUser at 400; a three-letter scope badCountryCode at 400; neither writes a role or an audit line; a known
--     person is assigned; a reserved role still answers roleReserved.
-- (c) the three country doors, as a holder of countries:update and countries:activate: a three-letter code
--     {ok:false} badCountryCode at 400, nothing written; a two-letter code is created, opened and ordered.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_xz      character(2) := 'XZ';
  v_staff   uuid := gen_random_uuid();
  v_target  uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_role    uuid;
  v_grant   uuid;
  v_answer  jsonb;
  v_msg     text;
  v_cases   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f17b6-' || substr(v_hex, 1, 10);
  -- (a)
  v_cases := ARRAY[
    ['public.assign_role(uuid,text,character)', '28ba9888b3e7973c692d0c84fa805efb', 'v'],
    ['public.admin_upsert_country(text,text,text,text,integer)', '7209bdfc35f85997db188d2dcb6e6475', 'v'],
    ['public.admin_set_country_active(text,boolean,boolean)', 'e04c4eb5be72bd2b5a794150a2269de0', 'v'],
    ['public.admin_set_country_root_order(text,uuid[])', '17138fe248c76d25009e109306b8d785', 'v']];
  FOR i IN 1..array_length(v_cases, 1) LOOP
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) IS DISTINCT FROM v_cases[i][2] OR p.provolatile::text <> v_cases[i][3]
               OR NOT p.prosecdef OR p.proconfig::text <> '{search_path=public}' OR p.prorettype <> 'jsonb'::regtype
          FROM pg_proc p WHERE p.oid = v_cases[i][1]::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_cases[i][1]::regprocedure)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_cases[i][1]::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_cases[i][1]::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-7b part 6 proof (a): %''s body, header or grants differ', v_cases[i][1];
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_xz) THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: a scratch code already exists';
    END IF;
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at)
    SELECT u, v_tag || '-' || n || '@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()
      FROM unnest(ARRAY[v_staff, v_target], ARRAY['staff', 'target']) AS t(u, n);
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_staff, v_tag || '-f', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE (r.name = 'roles' AND p.action = 'assign') OR (r.name = 'countries' AND p.action IN ('update', 'activate'));
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 3 THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: a permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role, 'global');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-given', v_tag) RETURNING id INTO v_grant;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);

    -- (b) assign_role
    v_answer := public.assign_role(gen_random_uuid(), v_tag || '-given', NULL);
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'unknownUser'
       OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: (b) an unknown person''s role answered %', v_answer;
    END IF;
    v_answer := public.assign_role(v_target, v_tag || '-given', 'XZQ');
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'badCountryCode'
       OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: (b) a three-letter scope answered %', v_answer;
    END IF;
    IF EXISTS (SELECT 1 FROM public.user_roles WHERE role_id = v_grant AND role_id IN (SELECT r.id FROM public.roles r WHERE r.name LIKE 'e2e-mig-%'))
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id = v_staff) THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: (b) a refused assignment wrote';
    END IF;
    v_answer := public.assign_role(v_target, 'super_admin', NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'roleReserved:super_admin' THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: (b) a reserved role answered %', v_answer;
    END IF;
    v_answer := public.assign_role(v_target, v_tag || '-given', NULL);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false)
       OR NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = v_target AND role_id = v_grant AND scope_type = 'global'
                        AND role_id IN (SELECT r.id FROM public.roles r WHERE r.name LIKE 'e2e-mig-%')) THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: (b) a known person''s role answered %', v_answer;
    END IF;

    -- (c) the three country doors
    v_answer := public.admin_upsert_country('XZQ', v_tag || ' q', NULL, NULL, NULL);
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'badCountryCode'
       OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: (c) the editor''s three-letter code answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_active('XZQ', true, false);
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'badCountryCode'
       OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: (c) the opening''s three-letter code answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_root_order('XZQ', '{}'::uuid[]);
    IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'message' IS DISTINCT FROM 'badCountryCode'
       OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: (c) the root order''s three-letter code answered %', v_answer;
    END IF;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = 'XZ') THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: (c) a refused three-letter code wrote a country';
    END IF;
    v_answer := public.admin_upsert_country(lower(v_xz::text), v_tag || ' xz', NULL, NULL, NULL);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false) THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: (c) a two-letter code''s creation answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_active(v_xz::text, true, false);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false) THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: (c) a two-letter code''s opening answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_root_order(v_xz::text, '{}'::uuid[]);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false)
       OR NOT coalesce((SELECT is_active AND name_en = v_tag || ' xz' FROM public.countries WHERE code = v_xz), false) THEN
      RAISE EXCEPTION 'F1-7b part 6 proof: (c) a two-letter code''s order answered %', v_answer;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f17b6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f17b6-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261120050500') ON CONFLICT DO NOTHING;
