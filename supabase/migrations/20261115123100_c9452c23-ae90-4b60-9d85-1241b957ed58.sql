-- e2e-areas: admin-countries

-- Foundations 1, turn F1-4b, part 5 of 9 — THE COUNTRY OPENING AND ROOT ORDER ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4b.md).
-- admin_set_country_active and admin_set_country_root_order are redeclared WHOLE from their last declarations (live
-- md5 checked). Each gate becomes ONE door_context('staff', countries:<its action>, staff_config, the country it
-- acts on (read from its countries row), match). Sentences become door_refuse codes of the same words and the shell
-- answers a refusal. void → {ok:true}: DROP + CREATE, grants restated. Proofs on scratch countries and categories
-- under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_set_country_active(text,boolean,boolean)', '2b5e63633c558226538386b9708b02b0'],
    ['public.admin_set_country_root_order(text,uuid[])', '469796970d43dd930d182f6d02784c9c']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115140300') THEN
    RAISE EXCEPTION 'F1-4b part 5: part 4 (de287d18) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4b part 5: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 5: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_set_country_active (whole from 20261029015441 :84; the gate on door_context, the codes and the shell; jsonb)
DROP FUNCTION public.admin_set_country_active(text, boolean, boolean);
CREATE FUNCTION public.admin_set_country_active(p_code text, p_active boolean, p_force_hide boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_code   char(2);
  v_row    public.countries;
  v_anchor uuid;
  v_scope  char(2);
BEGIN
  SELECT c.code INTO v_scope FROM public.countries c WHERE c.code = upper(coalesce(p_code, ''));
  PERFORM public.door_context('staff', 'countries', 'activate', 'staff_config', v_scope, 'match');

  v_code := upper(coalesce(p_code, ''));
  IF v_code !~ '^[A-Z]{2}$' THEN PERFORM public.door_refuse('badCountryCode'); END IF;
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
END $function$;
COMMENT ON FUNCTION public.admin_set_country_active(text, boolean, boolean) IS
  'F1-4b on the door shell (DEC-333): opens or closes a country behind door_context(staff, countries:activate, staff_config, the country, match); refuses badCountryCode / unknownCountry / scopedRolesExist; audits country.open / country.close; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_country_active(text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_country_active(text, boolean, boolean) TO authenticated;

-- ------------------------------------------------------------ 2. admin_set_country_root_order (whole from 20261029015441 :144; the gate on door_context, the codes and the shell; jsonb)
DROP FUNCTION public.admin_set_country_root_order(text, uuid[]);
CREATE FUNCTION public.admin_set_country_root_order(p_code text, p_category_ids uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_code char(2);
  v_ids  uuid[] := coalesce(p_category_ids, '{}'::uuid[]);
  v_old  jsonb;
  v_bad  int;
  v_scope char(2);
BEGIN
  SELECT c.code INTO v_scope FROM public.countries c WHERE c.code = upper(coalesce(p_code, ''));
  PERFORM public.door_context('staff', 'countries', 'update', 'staff_config', v_scope, 'match');

  v_code := upper(coalesce(p_code, ''));
  IF v_code !~ '^[A-Z]{2}$' THEN PERFORM public.door_refuse('badCountryCode'); END IF;
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
END $function$;
COMMENT ON FUNCTION public.admin_set_country_root_order(text, uuid[]) IS
  'F1-4b on the door shell (DEC-333): orders a country''s root categories behind door_context(staff, countries:update, staff_config, the country, match); refuses badCountryCode / unknownCountry / duplicateCategory / notARoot; audits country.rootOrder; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_country_root_order(text, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_country_root_order(text, uuid[]) TO authenticated;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated, never anon
--     or PUBLIC; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied (403) for each door, notSignedIn (401); a country holder
--     refused permissionDenied:scope (403) for another country and for a code no country holds; none of them
--     writes, audits or spends staff_config.
-- (c) each code with every earlier check cleared, its exact message and a 400, nothing written.
-- (d) the country holder opens and orders his own country; the global holder opens another: {ok:true}.
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
  v_role_c  uuid;
  v_axz     uuid;
  v_axy     uuid;
  v_sxz     text;
  v_sxy     text;
  v_cat1    uuid;
  v_cat2    uuid;
  v_cat3    uuid;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f14b5-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_set_country_active(text,boolean,boolean)', 'ee6abf5b62714bb22868ab96d646f3fb'],
    ['public.admin_set_country_root_order(text,uuid[])', '539563ee560f0cfab603e045e4023f9f']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4b part 5 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4b part 5 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_xz, v_xy, v_xq)) THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: a scratch country code already exists';
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
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-countries', v_tag) RETURNING id INTO v_role_c;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_c, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'countries' AND p.action IN ('view', 'update', 'activate');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_c) <> 3 THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: a countries permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_c, 'global'), (v_deact, v_role_c, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_cstaff, v_role_c, 'country', v_xz);

    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' k1', v_tag || '-k1') RETURNING id INTO v_cat1;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (NULL, v_cat1, 0);
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' k2', v_tag || '-k2') RETURNING id INTO v_cat2;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (NULL, v_cat2, 1);
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' k3', v_tag || '-k3') RETURNING id INTO v_cat3;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_cat1, v_cat3, 0);

    -- (b) the gates: the account, the permission, no caller, then the scope (global for the editor; match on the
    --     country for the opening and the root order)
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_set_country_active', 'admin_set_country_root_order');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_d::text)::text, true);
    v_answer := public.admin_set_country_active(v_xz::text, true, false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (b) a deactivated holder''s opening answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_set_country_active(v_xz::text, true, false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (b) an opening without countries:activate answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_root_order(v_xz::text, ARRAY[v_cat1]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (b) a root order without countries:update answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_set_country_root_order(v_xz::text, ARRAY[v_cat1]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (b) no caller''s root order answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_set_country_active(v_xy::text, true, false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (b) an opening of another country answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_active(v_xq::text, true, false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (b) an opening of no country answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_root_order(v_xy::text, ARRAY[v_cat1]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (b) a root order of another country answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_root_order(v_xq::text, ARRAY[v_cat1]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied:scope' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (b) a root order of no country answered %', v_answer;
    END IF;
    IF NOT coalesce(NOT (SELECT is_active FROM public.countries WHERE code = v_xz) AND NOT (SELECT is_active FROM public.countries WHERE code = v_xy) AND NOT EXISTS (SELECT 1 FROM public.countries WHERE code = v_xq) AND NOT EXISTS (SELECT 1 FROM public.country_root_order WHERE country_code IN (v_xz, v_xy)), false) THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (b) a refused opening or root order wrote a country';
    END IF;

    -- (c) each code, every earlier check cleared (a global holder passes the gate), its exact message and a 400
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_set_country_active('1', true, false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badCountryCode' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (c) an opening of a malformed code answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_active(v_xq::text, true, false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCountry' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (c) an opening of no country answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_active(v_xz::text, false, false);
    IF v_answer ->> 'message' IS DISTINCT FROM 'scopedRolesExist' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (c) a closing with a scoped role answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_root_order('1', ARRAY[v_cat1]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badCountryCode' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (c) a root order of a malformed code answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_root_order(v_xq::text, ARRAY[v_cat1]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCountry' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (c) a root order of no country answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_root_order(v_xz::text, ARRAY[v_cat1, v_cat1]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'duplicateCategory' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (c) a root order naming a category twice answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_root_order(v_xz::text, ARRAY[v_cat3]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notARoot' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (c) a root order naming a child answered %', v_answer;
    END IF;
    IF NOT coalesce(NOT (SELECT is_active FROM public.countries WHERE code = v_xz) AND NOT EXISTS (SELECT 1 FROM public.country_root_order WHERE country_code IN (v_xz, v_xy)), false) THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (c) a refused opening or root order wrote a country';
    END IF;

    -- (d) the successes: the country's holder opens and orders his own country; the global holder edits, creates and
    --     opens
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_cstaff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_c::text)::text, true);
    v_answer := public.admin_set_country_active(v_xz::text, true, false);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false) THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (d) an opening of the holder''s own country answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_root_order(v_xz::text, ARRAY[v_cat2, v_cat1]);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false) THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (d) a root order of the holder''s own country answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_set_country_active(v_xy::text, true, false);
    IF NOT coalesce(v_answer = '{"ok": true}'::jsonb, false) THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (d) a global holder''s opening answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT is_active FROM public.countries WHERE code = v_xz) AND (SELECT is_active FROM public.locations WHERE slug LIKE 'e2e-mig-%' AND id = v_axz) AND (SELECT array_agg(category_id ORDER BY position) FROM public.country_root_order WHERE country_code = v_xz) = ARRAY[v_cat2, v_cat1] AND (SELECT is_active FROM public.countries WHERE code = v_xy), false) THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: (d) the openings and the root order differ';
    END IF;

    -- (e) the tallies: staff_config counted once per call past the gate; one audit line per success; every refusal
    --     metered
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 8 THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: the dial staff_config counted % for the staff caller (expected 8)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_staff;
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: the staff caller wrote % audit lines (expected 1)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_cstaff::text AND action = 'staff_config';
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: the dial staff_config counted % for the cstaff caller (expected 2)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_cstaff;
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: the cstaff caller wrote % audit lines (expected 2)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: the dial staff_config counted % for the plain caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_plain;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: the plain caller wrote % audit lines (expected 0)', v_count;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: the dial staff_config counted % for the deact caller (expected 0)', v_count;
    END IF;
    SELECT count(*)::integer INTO v_count FROM public.audit_log WHERE actor_id = v_deact;
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: the deact caller wrote % audit lines (expected 0)', v_count;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_set_country_active', 'admin_set_country_root_order')) IS DISTINCT FROM v_refused + 15 THEN
      RAISE EXCEPTION 'F1-4b part 5 proof: door_refusals did not meter the 15 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14b5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14b5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115140400') ON CONFLICT DO NOTHING;
