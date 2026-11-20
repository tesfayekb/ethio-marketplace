-- e2e-areas: admin-categories, admin-locations

-- Foundations 1, turn F1-7b, part 5 of 8 — THE EXPORTS ANSWER AN UNKNOWN SCOPE BY ITS CODE (DEC-333, F1-4a
-- decision 4, F1-4b; brief docs/governance/briefs/f1-doors-7b.md; census
-- docs/governance/reports/f1-doors-7b.census.md). Two doors, each redeclared whole and written out from its live
-- body (DEC-383; live md5 checked), byte for byte apart from the named change; headers and grants as live.
-- * admin_export_categories: `unknown category scope` becomes door_refuse('unknownCategory').
-- * admin_export_locations: `unknown country scope` becomes door_refuse('unknownCountry'), the scope's text compared
--   before it is held in a two-letter variable (a longer scope raised 22001 there).

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_export_categories(text)', 'e0b47db317c37a67d62ddb02b929cdeb'],
    ['public.admin_export_locations(text)', '3754109e0273d14cdb0425a57296eef5']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261120050300') THEN
    RAISE EXCEPTION 'F1-7b part 5: part 4 (6e8a509c) must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-7b part 5: the live % is not the body this file was built from (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_export_categories
CREATE OR REPLACE FUNCTION public.admin_export_categories(p_scope text DEFAULT NULL::text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_scope uuid;
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'view', NULL, NULL, 'global');

  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    SELECT c.id INTO v_scope FROM public.categories c WHERE c.slug = lower(btrim(p_scope));
    IF v_scope IS NULL THEN PERFORM public.door_refuse('unknownCategory'); END IF;
  END IF;

  RETURN jsonb_build_object('categories', public.cat_export_rows(v_scope));
END $$;
REVOKE ALL ON FUNCTION public.admin_export_categories(text) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 2. admin_export_locations
CREATE OR REPLACE FUNCTION public.admin_export_locations(p_scope text DEFAULT NULL::text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_scope char(2) := NULL;
BEGIN
  SELECT c.code INTO v_scope FROM public.countries c WHERE c.code = upper(btrim(p_scope));
  PERFORM public.door_context('staff-reader', 'locations', 'view', NULL, v_scope, 'match');
  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    IF NOT EXISTS (SELECT 1 FROM public.countries WHERE code = upper(btrim(p_scope))) THEN
      PERFORM public.door_refuse('unknownCountry');
    END IF;
    v_scope := upper(btrim(p_scope));
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
END $$;
REVOKE ALL ON FUNCTION public.admin_export_locations(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_locations(text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_export_locations(text) TO service_role;

-- PROOFS (under a sentinel rollback; a scratch user, role, session and codes only):
-- (a) each body this file's (md5), header and grants as live (EXECUTE for authenticated, never anon or PUBLIC).
-- (b) the exports, as a holder of categories:view and locations:view: an unknown category scope P0D01
--     unknownCategory; an unknown country scope of two letters or three P0D01 unknownCountry (never 22001); no scope
--     answers the document.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_xz      character(2) := 'XZ';
  v_staff   uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_role    uuid;
  v_doc     jsonb;
  v_msg     text;
  v_cases   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f17b5-' || substr(v_hex, 1, 10);
  -- (a)
  v_cases := ARRAY[
    ['public.admin_export_categories(text)', '4e06837141b4d95722f4db029a647376', 's'],
    ['public.admin_export_locations(text)', '55bd5d3040fe5419c650fc1ed8182af6', 's']];
  FOR i IN 1..array_length(v_cases, 1) LOOP
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) IS DISTINCT FROM v_cases[i][2] OR p.provolatile::text <> v_cases[i][3]
               OR NOT p.prosecdef OR p.proconfig::text <> '{search_path=public}' OR p.prorettype <> 'jsonb'::regtype
          FROM pg_proc p WHERE p.oid = v_cases[i][1]::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_cases[i][1]::regprocedure)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_cases[i][1]::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_cases[i][1]::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-7b part 5 proof (a): %''s body, header or grants differ', v_cases[i][1];
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_xz) OR EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag) THEN
      RAISE EXCEPTION 'F1-7b part 5 proof: a scratch code or slug already exists';
    END IF;
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at)
    SELECT u, v_tag || '-' || n || '@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()
      FROM unnest(ARRAY[v_staff], ARRAY['staff']) AS t(u, n);
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_staff, v_tag || '-f', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE (r.name = 'categories' AND p.action = 'view') OR (r.name = 'locations' AND p.action = 'view');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 2 THEN
      RAISE EXCEPTION 'F1-7b part 5 proof: a permission of the scratch role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role, 'global');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);

    -- (b) the exports
    v_cases := ARRAY[
      ['unknownCategory', format('SELECT public.admin_export_categories(%L)', v_tag)],
      ['unknownCountry', format('SELECT public.admin_export_locations(%L)', v_xz)],
      ['unknownCountry', format('SELECT public.admin_export_locations(%L)', 'XZQ')]];
    FOR i IN 1..array_length(v_cases, 1) LOOP
      BEGIN
        EXECUTE v_cases[i][2];
        RAISE EXCEPTION 'F1-7b part 5 proof: (b) case % answered without a refusal', i;
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
        IF v_msg IS DISTINCT FROM v_cases[i][1] THEN
          RAISE EXCEPTION 'F1-7b part 5 proof: (b) case % answered % (expected %)', i, v_msg, v_cases[i][1];
        END IF;
      END;
    END LOOP;
    v_doc := public.admin_export_categories(NULL);
    IF v_doc IS NULL OR NOT (v_doc ? 'categories') THEN
      RAISE EXCEPTION 'F1-7b part 5 proof: (b) the categories export with no scope answered nothing';
    END IF;
    v_doc := public.admin_export_locations(NULL);
    IF v_doc IS NULL OR NOT (v_doc ? 'countries') OR NOT (v_doc ? 'locations') THEN
      RAISE EXCEPTION 'F1-7b part 5 proof: (b) the places export with no scope answered nothing';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f17b5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f17b5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261120050400') ON CONFLICT DO NOTHING;
