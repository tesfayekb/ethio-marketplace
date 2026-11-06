-- e2e-areas: auth-caller-gates, door-refusals, auth-signout, settings
-- Foundations 1, turn F1-1, M-F1a part 4 of 6 — THE SIGNED-IN READERS OF THE ACCOUNT ONTO door_context (DEC-333;
-- plan docs/governance/reports/f1-doors.stop-1.md §5 row F1-1; ruling 1 decisions 2 and 5). The three oldest
-- signed-in readers (2026-08) are redeclared WHOLE from their last declarations (live md5 checked, G39), their
-- 'not authenticated' RAISE replaced by ONE door_context('reader') call: a reader spends no dial and refuses by
-- RAISE P0D01 (notSignedIn, accountDeactivated), nothing to count. get_my_permissions moves from LANGUAGE sql to
-- plpgsql for the call; its two SELECTs and its return shape are the same. Grants restated as they were (the two
-- readers without a service_role grant stay without one). Proofs on scratch rows under a sentinel rollback.
-- Law 11, law 12, law 14, CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.has_password()', '3c8a8b8c375932c8af5963e4de8ab857'],
    ['public.get_my_permissions()', '5416aebbff6d4c101bf4b2a08f2ce0e6'],
    ['public.get_my_translator_languages()', 'd88913ef894c5c72a8d09cb1b48ed2eb']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261106060300') THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 4: part 3 (c4e9a6d7) must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 4: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. has_password (whole from 20260804133231 :27)
-- New: door_context('reader') replaces the 'not authenticated' RAISE. Every other byte as before.
CREATE OR REPLACE FUNCTION public.has_password()
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_ctx public.door_ctx;
  v_has boolean;
BEGIN
  v_ctx := public.door_context('reader');
  SELECT (encrypted_password IS NOT NULL AND encrypted_password <> '')
    INTO v_has
    FROM auth.users
   WHERE id = v_ctx.uid;
  RETURN COALESCE(v_has, false);
END;
$function$;
REVOKE ALL ON FUNCTION public.has_password() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_password() TO authenticated;

-- ------------------------------------------------------------ 2. get_my_permissions (whole from 20260809010130 :150)
-- New: plpgsql with door_context('reader') first; the query is the same two SELECTs. Same return shape.
CREATE OR REPLACE FUNCTION public.get_my_permissions()
 RETURNS TABLE(permission text)
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_ctx public.door_ctx;
BEGIN
  v_ctx := public.door_context('reader');
  RETURN QUERY
  SELECT DISTINCT res.name || ':' || p.action
  FROM public.permissions p
  JOIN public.resources res ON res.id = p.resource_id
  WHERE public.is_super_admin(v_ctx.uid)
  UNION
  SELECT DISTINCT res.name || ':' || p.action
  FROM public.user_roles ur
  JOIN public.role_permissions rp ON rp.role_id IN (SELECT public.get_role_hierarchy(ur.role_id))
  JOIN public.permissions p ON p.id = rp.permission_id
  JOIN public.resources res ON res.id = p.resource_id
  WHERE ur.user_id = v_ctx.uid;
END;
$function$;
REVOKE ALL ON FUNCTION public.get_my_permissions() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_permissions() TO authenticated;
GRANT ALL ON FUNCTION public.get_my_permissions() TO service_role;

-- ------------------------------------------------------------ 3. get_my_translator_languages (whole from 20260829060103 :68)
-- New: door_context('reader') replaces the 'not authenticated' RAISE. Every other byte as before.
CREATE OR REPLACE FUNCTION public.get_my_translator_languages()
 RETURNS TABLE(lang_code text)
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path = public
AS $function$
#variable_conflict use_column
DECLARE
  v_ctx public.door_ctx;
BEGIN
  v_ctx := public.door_context('reader');

  RETURN QUERY
  SELECT tl.lang_code
    FROM public.translator_languages tl
   WHERE tl.user_id = v_ctx.uid
   ORDER BY tl.lang_code;
END $function$;
REVOKE ALL ON FUNCTION public.get_my_translator_languages() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_translator_languages() TO authenticated;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) catalog facts: the three headers (STABLE, definer, search_path), their grants as restated, the new bodies'
--     md5s.
-- (b) has_password true for a scratch user with a password; get_my_permissions carries a scratch grant;
--     get_my_translator_languages a scratch assignment; a deactivated caller → accountDeactivated (P0D01) with no
--     rate_limits row; no caller → notSignedIn (P0D01) at each of the three.
DO $proof$
DECLARE
  v_tag      text := 'e2e-mig-f1a4-' || substr(gen_random_uuid()::text, 1, 8);
  v_u1       uuid := gen_random_uuid();
  v_deact    uuid := gen_random_uuid();
  v_role     uuid;
  v_res      uuid;
  v_perm     uuid;
  v_res_name text := 'e2e_mig_res_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lang_on  text := 'q' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 2);
  v_pairs    text[][] := ARRAY[
    ['public.has_password()', 'a16836e9cd638181873bef8cb88b70f5'],
    ['public.get_my_permissions()', 'd0566a3cbb2d1a173c48bcff3078ec53'],
    ['public.get_my_translator_languages()', '1ac86d192608baae887bb12fc3f04b75']];
  v_fn       regprocedure;
  v_bool     boolean;
  v_text     text;
  v_count    integer;
  v_msg      text;
  v_state    text;
  i          integer;
BEGIN
  -- (a)
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 4 proof (a): %''s header or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 4 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  IF NOT has_function_privilege('service_role', 'public.get_my_permissions()'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 4 proof (a): get_my_permissions lost its service grant';
  END IF;

  BEGIN
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_u1,    v_tag || '-u1@example.invalid',    'e2e-mig-hash', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-deact@example.invalid', NULL,           '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.resources (name, description) VALUES (v_res_name, v_tag) RETURNING id INTO v_res;
    INSERT INTO public.permissions (resource_id, action, requires_step_up) VALUES (v_res, 'edit', false) RETURNING id INTO v_perm;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-holder', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_role, v_perm);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_u1, v_role, 'global');
    INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
    VALUES (v_lang_on, v_tag || ' on', v_tag, true, true, 9001);
    INSERT INTO public.translator_languages (user_id, lang_code) VALUES (v_u1, v_lang_on);

    -- (b) the readers
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_u1::text, 'role', 'authenticated')::text, true);
    v_bool := public.has_password();
    IF v_bool IS NOT TRUE THEN RAISE EXCEPTION 'F1-1 M-F1a part 4 proof (b): has_password denied the password'; END IF;
    IF NOT EXISTS (SELECT 1 FROM public.get_my_permissions() g WHERE g.permission = v_res_name || ':edit') THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 4 proof (b): get_my_permissions lost the scratch grant';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.get_my_translator_languages() g WHERE g.lang_code = v_lang_on) THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 4 proof (b): get_my_translator_languages lost the scratch assignment';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated')::text, true);
    v_bool := NULL; v_msg := NULL; v_state := NULL;
    BEGIN
      v_bool := public.has_password();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'accountDeactivated' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 4 proof (b): has_password for a deactivated caller answered % (%)', coalesce(v_msg, v_bool::text), v_state;
    END IF;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_u1::text, v_deact::text)) THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 4 proof (b): a reader counted a dial';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    FOREACH v_text IN ARRAY ARRAY['has_password', 'get_my_permissions', 'get_my_translator_languages'] LOOP
      v_msg := NULL; v_state := NULL;
      BEGIN
        EXECUTE format('SELECT count(*) FROM public.%I()', v_text) INTO v_count;
      EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
      END;
      IF v_msg IS DISTINCT FROM 'notSignedIn' OR v_state IS DISTINCT FROM 'P0D01' THEN
        RAISE EXCEPTION 'F1-1 M-F1a part 4 proof (b): % without a caller answered % (%)', v_text, coalesce(v_msg, 'rows'), v_state;
      END IF;
    END LOOP;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261106060400') ON CONFLICT DO NOTHING;
