-- Cursor bundle 6, Part 3, file 3 — THE ROUTE'S ANSWER, THE VIEW-AS READERS ON THE RULE, THE STORAGE RULES RUN ONCE (DEC-461,
-- DEC-465, INC-1282, INC-1283's neighbour; brief docs/governance/briefs/cursor-bundle-6.md, ruling
-- docs/governance/briefs/cursor-bundle-6-ruling-2.md decisions 2, 4 and 5).
--   1. my_permission_answer(text,text) — NEW. The one SQL function a staff ROUTE asks (DEC-465): the same core and the same rule
--      as door_context, answered in four words for the caller only (auth.uid()): denied (the core does not hold, no caller, a
--      deactivated account), allowed (the core and the rule hold), stepUp (the core holds, the rule does not, the account has
--      a verified totp factor), stepUpNoFactor (the same, with no verified factor). Plain SQL, STABLE, never raises. Granted
--      to authenticated and the service role only. The route answers denied 403 and the two step-up words 428.
--   2. impersonated_get_profile(uuid) and impersonated_list_listings(uuid,integer,integer) — redeclared WHOLE from
--      20261119150500 (byte for byte apart from the gate's line): the gate is door_context('staff-reader', 'impersonation',
--      'use', NULL, NULL, 'global') — the same permission and country cell as begin_impersonation — so a read of another
--      person's data asks the permission and the staff-session rule (INC-1282). end_impersonation and
--      get_active_impersonation keep their classes: ending a session never needs the factor.
--   3. The four storage rules of the category-assets bucket (category_assets_assets_insert, _update, _delete,
--      category_assets_public_read) are recreated with each has_permission(...) wrapped as (SELECT public.has_permission(...)),
--      so the planner runs it once for a query, not once for every row (the rule of file 1 made a staff session's row read
--      about eight times dearer). Everything else in each rule is its last state.
-- Proofs on scratch rows under a sentinel rollback. Law 11, law 12, CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.impersonated_get_profile(uuid)', '623968df1585ba93d2c46a89a07e89a2'],
    ['public.impersonated_list_listings(uuid,integer,integer)', '88669b9b83037e9b00e0dedc97008e0d']];
  v_md5   text;
  v_name  text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261124220100') THEN
    RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3: the mark 20261124220100 (file 2) must be applied first';
  END IF;
  IF to_regprocedure('public.my_permission_answer(text,text)') IS NOT NULL THEN
    RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3: my_permission_answer already exists';
  END IF;
  IF to_regprocedure('public.has_permission_core(uuid,text,text)') IS NULL
     OR to_regprocedure('public.staff_session_holds(uuid,text,text)') IS NULL THEN
    RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3: the core or the rule of file 1 is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3: the live % is not the body this file was built from (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
  -- each storage rule stands, asks has_permission, and is not yet wrapped
  FOREACH v_name IN ARRAY ARRAY['category_assets_assets_insert', 'category_assets_assets_update',
                                'category_assets_assets_delete', 'category_assets_public_read'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_policies p
                    WHERE p.schemaname = 'storage' AND p.tablename = 'objects' AND p.policyname = v_name
                      AND coalesce(p.qual, '') || ' ' || coalesce(p.with_check, '') ~ 'has_permission\('
                      AND coalesce(p.qual, '') || ' ' || coalesce(p.with_check, '') !~ 'SELECT (public\.)?has_permission\(') THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3: the storage rule % is not the unwrapped rule this file was built from', v_name;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. my_permission_answer
CREATE FUNCTION public.my_permission_answer(p_resource text, p_action text)
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  -- DEC-465 — the route's question, answered from the same core and the same rule as door_context. For the caller only:
  -- no caller, a deactivated account (the core answers false for it) and a permission the caller does not hold are
  -- 'denied'; a holder whose session used its second factor (or whose permission is a member's) is 'allowed'; a holder
  -- whose session has not is 'stepUp' with a verified totp factor to use, 'stepUpNoFactor' without one.
  SELECT CASE
           WHEN auth.uid() IS NULL THEN 'denied'
           WHEN public.has_permission_core(auth.uid(), p_resource, p_action) IS NOT TRUE THEN 'denied'
           WHEN public.staff_session_holds(auth.uid(), p_resource, p_action) THEN 'allowed'
           WHEN EXISTS (SELECT 1 FROM auth.mfa_factors f
                         WHERE f.user_id = auth.uid() AND f.status::text = 'verified' AND f.factor_type::text = 'totp')
             THEN 'stepUp'
           ELSE 'stepUpNoFactor'
         END;
$function$;
COMMENT ON FUNCTION public.my_permission_answer(text, text) IS
  'DEC-465: the staff route''s one question — the caller''s own permission, answered from has_permission_core and the staff-session rule (staff_session_holds): denied | allowed | stepUp (a verified factor exists, the session has not used it) | stepUpNoFactor. Never raises; allowed equals has_permission(auth.uid(), …).';
REVOKE ALL ON FUNCTION public.my_permission_answer(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_permission_answer(text, text) TO authenticated;
GRANT ALL ON FUNCTION public.my_permission_answer(text, text) TO service_role;

-- ------------------------------------------------------------ 2. the view-as readers (whole from 20261119150500 :38 and :56)
CREATE OR REPLACE FUNCTION public.impersonated_get_profile(p_session uuid)
RETURNS TABLE(target_id uuid, display_name text, seller_alias text,
              home_country_code char(2), account_status text, created_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_ctx    public.door_ctx := public.door_context('staff-reader', 'impersonation', 'use', NULL, NULL, 'global');
  v_target uuid := public.impersonation_target(p_session);
BEGIN
  RETURN QUERY
  SELECT p.user_id, p.display_name, p.seller_alias, p.home_country_code,
         p.account_status, p.created_at
  FROM public.profiles p WHERE p.user_id = v_target;
END $$;
REVOKE ALL ON FUNCTION public.impersonated_get_profile(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.impersonated_get_profile(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.impersonated_get_profile(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.impersonated_list_listings(
  p_session uuid, p_limit int DEFAULT 25, p_offset int DEFAULT 0)
RETURNS TABLE(id uuid, title text, status text, price_amount numeric,
              price_currency char(3), price_mode text, price_bp integer, price_negotiable boolean,
              created_at timestamptz, total_count bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_ctx    public.door_ctx := public.door_context('staff-reader', 'impersonation', 'use', NULL, NULL, 'global');
  v_target uuid := public.impersonation_target(p_session);
BEGIN
  RETURN QUERY
  SELECT l.id, l.title, l.status, l.price_amount, l.price_currency,
         l.price_mode, l.price_bp, l.price_negotiable, l.created_at,
         COUNT(*) OVER () AS total_count
  FROM public.listings l
  WHERE l.seller_id = v_target
  ORDER BY l.created_at DESC
  LIMIT GREATEST(COALESCE(p_limit, 25), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $$;
REVOKE ALL ON FUNCTION public.impersonated_list_listings(uuid, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.impersonated_list_listings(uuid, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.impersonated_list_listings(uuid, integer, integer) TO service_role;

-- ------------------------------------------------------------ 3. the four storage rules, each call run once for a query
DROP POLICY IF EXISTS "category_assets_assets_insert" ON storage.objects;
CREATE POLICY "category_assets_assets_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'category-assets'
    AND (SELECT public.has_permission(auth.uid(), 'categories', 'assets'))
  );

DROP POLICY IF EXISTS "category_assets_assets_update" ON storage.objects;
CREATE POLICY "category_assets_assets_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'category-assets'
    AND (SELECT public.has_permission(auth.uid(), 'categories', 'assets'))
  )
  WITH CHECK (
    bucket_id = 'category-assets'
    AND (SELECT public.has_permission(auth.uid(), 'categories', 'assets'))
  );

DROP POLICY IF EXISTS "category_assets_assets_delete" ON storage.objects;
CREATE POLICY "category_assets_assets_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'category-assets'
    AND (SELECT public.has_permission(auth.uid(), 'categories', 'assets'))
  );

DROP POLICY IF EXISTS "category_assets_public_read" ON storage.objects;
CREATE POLICY "category_assets_public_read"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'category-assets'
    AND (SELECT public.has_permission(auth.uid(), 'categories', 'assets'))
  );

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) catalog facts: my_permission_answer and the two readers — language, volatility, SECURITY DEFINER, search_path public,
--       granted to authenticated and the service role, never to anon or PUBLIC; the bodies' md5 are this file's;
--   (b) my_permission_answer's four words on scratch accounts, no caller and a deactivated account read denied, and
--       allowed equals has_permission(auth.uid(), …) in every case;
--   (c) the readers: a holder at aal2 reads its own open session; at aal1 the readers answer P0009 after the permission;
--       an account whose role does not grant impersonation:use reads permissionDenied (at aal1 too, never P0009); another
--       person's session answers noActiveSession; no caller reads notSignedIn;
--   (d) the live catalog: no policy calls has_permission, has_permission_scoped or is_super_admin outside a scalar
--       subselect; a staff session at aal2 with a verified factor reads and writes the bucket, at aal1 and a member do not.
DO $proof$
DECLARE
  v_tag      text := 'e2e-mig-b6p3c-' || substr(gen_random_uuid()::text, 1, 8);
  v_super    uuid := gen_random_uuid();
  v_staff    uuid := gen_random_uuid();
  v_nofactor uuid := gen_random_uuid();
  v_pending  uuid := gen_random_uuid();
  v_member   uuid := gen_random_uuid();
  v_deact    uuid := gen_random_uuid();
  v_target   uuid := gen_random_uuid();
  v_other    uuid := gen_random_uuid();
  v_sess     uuid := gen_random_uuid();
  v_sess_m   uuid := gen_random_uuid();
  v_sess_o   uuid := gen_random_uuid();
  v_role     uuid;
  v_res      uuid;
  v_perm     uuid;
  v_perm_adm uuid;
  v_role_adm uuid;
  v_perm_as  uuid;
  v_role_as  uuid;
  v_res_name text := 'e2e_mig_res_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_member_p text;
  v_who      uuid;
  v_level    text;
  v_want     text;
  v_got      text;
  v_ok       boolean;
  v_n        integer;
  v_m        integer;
  v_wrote    boolean;
  v_msg      text;
  v_state    text;
  v_fn       text;
  v_call     text;
  v_pairs    text[][] := ARRAY[
    ['public.my_permission_answer(text,text)', 'aa18daf40b4e4786114e36e37c9e080e'],
    ['public.impersonated_get_profile(uuid)', '93790491b580346a38f8b299a17fc1b8'],
    ['public.impersonated_list_listings(uuid,integer,integer)', '9d526a3155433d5c6b4c0b7d5a5367ef']];
  i          integer;
BEGIN
  -- (a)
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1];
    IF (SELECT NOT prosecdef OR proconfig::text <> '{search_path=public}' OR provolatile <> 's'
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (a): % has a header or a grant that differs', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn::regprocedure) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (a): the body of % differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_super,    v_tag || '-super@example.invalid',    '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_staff,    v_tag || '-staff@example.invalid',    '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_nofactor, v_tag || '-nofactor@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_pending,  v_tag || '-pending@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_member,   v_tag || '-member@example.invalid',   '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact,    v_tag || '-deact@example.invalid',    '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_target,   v_tag || '-target@example.invalid',   '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_other,    v_tag || '-other@example.invalid',    '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    -- a scratch permission held by a scratch role; the staff accounts hold it; admin_panel:access too
    INSERT INTO public.resources (name, description) VALUES (v_res_name, v_tag) RETURNING id INTO v_res;
    INSERT INTO public.permissions (resource_id, action, requires_step_up) VALUES (v_res, 'edit', false) RETURNING id INTO v_perm;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-holder', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_role, v_perm);
    SELECT p.id INTO STRICT v_perm_adm FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'admin_panel' AND p.action = 'access';
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-admin-panel', v_tag) RETURNING id INTO v_role_adm;
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_role_adm, v_perm_adm);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES
      (v_staff, v_role, 'global'), (v_nofactor, v_role, 'global'), (v_pending, v_role, 'global'),
      (v_deact, v_role, 'global'), (v_staff, v_role_adm, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_super, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    -- factors: a verified totp for the super admin, the staff account and the deactivated one; a pending one for v_pending
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret) VALUES
      (gen_random_uuid(), v_super,   v_tag || '-f1', 'totp', 'verified',   now(), now(), substr(md5(gen_random_uuid()::text), 1, 16)),
      (gen_random_uuid(), v_staff,   v_tag || '-f2', 'totp', 'verified',   now(), now(), substr(md5(gen_random_uuid()::text), 1, 16)),
      (gen_random_uuid(), v_deact,   v_tag || '-f3', 'totp', 'verified',   now(), now(), substr(md5(gen_random_uuid()::text), 1, 16)),
      (gen_random_uuid(), v_pending, v_tag || '-f4', 'totp', 'unverified', now(), now(), substr(md5(gen_random_uuid()::text), 1, 16));
    -- the member role's permission, read from the data
    SELECT res.name || ':' || p.action INTO v_member_p
      FROM public.roles br
      JOIN public.role_permissions rp ON rp.role_id = br.id
      JOIN public.permissions p ON p.id = rp.permission_id
      JOIN public.resources res ON res.id = p.resource_id
     WHERE br.name = 'user' AND res.name <> 'admin_panel' ORDER BY 1 LIMIT 1;
    IF v_member_p IS NULL THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof: the member role holds no permission to read'; END IF;

    -- (b) the four words, and allowed = has_permission, for every case
    FOR v_who, v_level, v_fn, v_call, v_want IN VALUES
      (v_staff,    'aal1', v_res_name, 'edit', 'stepUp'),
      (v_staff,    'aal2', v_res_name, 'edit', 'allowed'),
      (v_nofactor, 'aal1', v_res_name, 'edit', 'stepUpNoFactor'),
      (v_nofactor, 'aal2', v_res_name, 'edit', 'stepUpNoFactor'),
      (v_pending,  'aal2', v_res_name, 'edit', 'stepUpNoFactor'),
      (v_super,    'aal1', v_res_name, 'edit', 'stepUp'),
      (v_super,    'aal2', v_res_name, 'edit', 'allowed'),
      (v_member,   'aal1', v_res_name, 'edit', 'denied'),
      (v_member,   'aal2', v_res_name, 'edit', 'denied'),
      (v_member,   'aal1', split_part(v_member_p, ':', 1), split_part(v_member_p, ':', 2), 'allowed'),
      (v_staff,    'aal1', 'admin_panel', 'access', 'allowed'),
      (v_deact,    'aal2', v_res_name, 'edit', 'denied'),
      (v_other,    'aal2', v_res_name, 'edit', 'denied')
    LOOP
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who::text, 'role', 'authenticated', 'aal', v_level)::text, true);
      v_got := public.my_permission_answer(v_fn, v_call);
      IF v_got IS DISTINCT FROM v_want THEN
        RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (b): % at % asking %:% answered %, not %', v_who, v_level, v_fn, v_call, v_got, v_want;
      END IF;
      IF (v_got = 'allowed') IS DISTINCT FROM public.has_permission(v_who, v_fn, v_call) THEN
        RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (b): allowed differs from has_permission for % at % asking %:%', v_who, v_level, v_fn, v_call;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF public.my_permission_answer(v_res_name, 'edit') IS DISTINCT FROM 'denied' THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (b): no caller did not read denied';
    END IF;
    IF public.my_permission_answer(NULL, NULL) IS DISTINCT FROM 'denied' THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (b): a null question did not read denied';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('role', 'service_role')::text, true);
    IF public.my_permission_answer(v_res_name, 'edit') IS DISTINCT FROM 'denied' THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (b): the service role (no caller) did not read denied';
    END IF;

    -- (c) the view-as readers
    INSERT INTO public.impersonation_sessions (id, actor_id, target_id, reason, expires_at) VALUES
      (v_sess,   v_super,  v_target, 'e2e migration proof scratch', now() + interval '1 hour'),
      (v_sess_m, v_member, v_target, 'e2e migration proof scratch', now() + interval '1 hour'),
      (v_sess_o, v_other,  v_target, 'e2e migration proof scratch', now() + interval '1 hour');
    -- a holder at aal2 reads its own open session
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);
    SET LOCAL ROLE authenticated;
    SELECT count(*) INTO v_n FROM public.impersonated_get_profile(v_sess) t WHERE t.target_id = v_target;
    PERFORM count(*) FROM public.impersonated_list_listings(v_sess);
    RESET ROLE;
    IF v_n <> 1 THEN RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (c): a holder at aal2 did not read its open session (%)', v_n; END IF;
    -- every refusal, through the browser role: (who, level, session, expected message fragment, expected SQLSTATE)
    FOR v_who, v_level, v_call, v_want, v_state IN VALUES
      (v_super,  'aal1', v_sess::text,   'step-up required',    'P0009'),
      (v_member, 'aal1', v_sess_m::text, 'permissionDenied',    'P0D01'),
      (v_member, 'aal2', v_sess_m::text, 'permissionDenied',    'P0D01'),
      (v_super,  'aal2', v_sess_o::text, 'noActiveSession',     'P0D01'),
      (v_other,  'aal2', v_sess::text,   'permissionDenied',    'P0D01')
    LOOP
      FOREACH v_fn IN ARRAY ARRAY['impersonated_get_profile', 'impersonated_list_listings'] LOOP
        PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who::text, 'role', 'authenticated', 'aal', v_level)::text, true);
        v_msg := NULL; v_got := NULL;
        BEGIN
          SET LOCAL ROLE authenticated;
          EXECUTE format('SELECT count(*) FROM public.%I(%L::uuid) t', v_fn, v_call) INTO v_n;
        EXCEPTION WHEN OTHERS THEN
          GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_got = RETURNED_SQLSTATE;
        END;
        RESET ROLE;
        IF v_msg IS NULL OR v_msg !~ v_want OR (v_got IS DISTINCT FROM v_state AND NOT (v_state = 'P0D01' AND v_got = 'PGRST')) THEN
          RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (c): % as % at % answered % (%), not % (%)', v_fn, v_who, v_level,
            coalesce(v_msg, 'success'), v_got, v_want, v_state;
        END IF;
      END LOOP;
    END LOOP;
    -- no caller
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_msg := NULL; v_got := NULL;
    BEGIN
      SET LOCAL ROLE authenticated;
      PERFORM count(*) FROM public.impersonated_get_profile(v_sess);
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_got = RETURNED_SQLSTATE;
    END;
    RESET ROLE;
    IF v_msg IS NULL OR v_msg !~ 'notSignedIn' THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (c): no caller answered % (%)', coalesce(v_msg, 'success'), v_got;
    END IF;

    -- (d) the live catalog: every call of a permission function stands inside a scalar subselect
    IF EXISTS (
      SELECT 1 FROM pg_policies p,
        LATERAL (SELECT coalesce(p.qual, '') || ' ' || coalesce(p.with_check, '') AS t) x
       WHERE x.t ~ '(has_permission|has_permission_scoped|is_super_admin)\('
         AND array_length(regexp_split_to_array(x.t, '(has_permission|has_permission_scoped|is_super_admin)\('), 1)
             IS DISTINCT FROM
             array_length(regexp_split_to_array(x.t, 'SELECT (public\.)?(has_permission|has_permission_scoped|is_super_admin)\('), 1)) THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (d): a policy calls a permission function outside a scalar subselect';
    END IF;
    IF (SELECT count(*) FROM pg_policies p
         WHERE p.schemaname = 'storage' AND p.tablename = 'objects'
           AND p.policyname IN ('category_assets_assets_insert', 'category_assets_assets_update',
                                'category_assets_assets_delete', 'category_assets_public_read')
           AND coalesce(p.qual, '') || ' ' || coalesce(p.with_check, '') ~ 'SELECT (public\.)?has_permission\(') <> 4 THEN
      RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (d): the four storage rules do not each hold the wrapped call';
    END IF;
    -- the bucket: a staff session at aal2 with a verified factor reads and writes; at aal1 and a member do neither
    SELECT p.id INTO STRICT v_perm_as FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action = 'assets';
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-assets', v_tag) RETURNING id INTO v_role_as;
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_role_as, v_perm_as);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_as, 'global');
    INSERT INTO storage.objects (bucket_id, name) VALUES ('category-assets', v_tag || '/probe.png');
    FOR v_who, v_level, v_want IN VALUES
      (v_staff,  'aal2', 'rw'), (v_super, 'aal2', 'rw'), (v_staff, 'aal1', 'none'), (v_member, 'aal2', 'none')
    LOOP
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who::text, 'role', 'authenticated', 'aal', v_level)::text, true);
      v_wrote := false;
      SET LOCAL ROLE authenticated;
      SELECT count(*) INTO v_n FROM storage.objects WHERE bucket_id = 'category-assets' AND name = v_tag || '/probe.png';
      UPDATE storage.objects SET metadata = '{}'::jsonb WHERE bucket_id = 'category-assets' AND name = v_tag || '/probe.png';
      GET DIAGNOSTICS v_m = ROW_COUNT;
      BEGIN
        INSERT INTO storage.objects (bucket_id, name) VALUES ('category-assets', v_tag || '/' || gen_random_uuid()::text);
        v_wrote := true;
      EXCEPTION WHEN insufficient_privilege THEN
        v_wrote := false;
      END;
      RESET ROLE;
      -- the read, the update's reach and the insert: all three hold for a writer, none for the others
      IF (v_want = 'rw') <> (v_n = 1) OR (v_want = 'rw') <> (v_m = 1) OR (v_want = 'rw') <> v_wrote THEN
        RAISE EXCEPTION 'cursor-bundle-6 part 3 file 3 proof (d): % at % read %, updated % and wrote % (expected %)', v_who, v_level, v_n, v_m, v_wrote, v_want;
      END IF;
    END LOOP;
    RAISE EXCEPTION 'b6p3f3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'b6p3f3-proof-ok' THEN RAISE; END IF;
  END;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261125010000') ON CONFLICT DO NOTHING;
