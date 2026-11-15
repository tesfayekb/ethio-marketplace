-- e2e-areas: admin-categories

-- Foundations 1, turn F1-4a, part 8 of 19 — THE CATEGORY EXCLUSIONS AND HOME POINTER DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_set_country_exclusions (D1
-- M6a's door + core) and admin_set_primary_pointer are redeclared WHOLE from their last
-- declarations (live md5 checked). Each gate becomes ONE door_context('staff', categories:<its action>, staff_config,
-- global) and the shell; refusal sentences and console keys become door_refuse codes (permissionDenied, unknownCategory, unknownPointer,
-- parentInactive). void → {ok:true}: DROP + CREATE, grants
-- restated; the core keeps its shape (CREATE OR REPLACE) and D1 M6a's grants. Proofs on
-- scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_set_country_exclusions_core(uuid,text[])', '2ab9bf2f2876bbd4d6f2ce5ea69d11e3'],
    ['public.admin_set_country_exclusions(uuid,text[])', '8a9c85ddec5d1e146d781824a9ddb379'],
    ['public.admin_set_primary_pointer(uuid)', '5c9ca44ccdd81032fa7da7b108983d10']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115040600') THEN
    RAISE EXCEPTION 'F1-4a part 8: part 7 (bb8a2c66) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 8: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 8: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_set_country_exclusions_core (whole from 20261029001111 :127; its refusals as codes; D1 M6a's grants restated)
CREATE OR REPLACE FUNCTION public.admin_set_country_exclusions_core(p_id uuid, p_country_codes text[])
 RETURNS void
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE v_old text[]; v_new text[];
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  IF NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_id) THEN
    PERFORM public.door_refuse('unknownCategory');
  END IF;

  SELECT COALESCE(array_agg(x.country_code ORDER BY x.country_code), '{}')
    INTO v_old FROM public.category_country_exclusions x WHERE x.category_id = p_id;

  v_new := COALESCE(p_country_codes, '{}');

  DELETE FROM public.category_country_exclusions x
   WHERE x.category_id = p_id AND NOT (x.country_code = ANY (v_new));

  INSERT INTO public.category_country_exclusions (category_id, country_code, created_by)
  SELECT p_id, code, auth.uid() FROM unnest(v_new) AS code
  ON CONFLICT DO NOTHING;

  PERFORM public.log_audit('category.set_exclusions', 'categories', p_id::text,
    jsonb_build_object('old', to_jsonb(v_old), 'new', to_jsonb(v_new)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_set_country_exclusions_core(uuid, text[]) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_set_country_exclusions (whole from 20261029001111 :161; the gate on door_context, the core and the shell; jsonb)
DROP FUNCTION public.admin_set_country_exclusions(uuid, text[]);
CREATE FUNCTION public.admin_set_country_exclusions(p_id uuid, p_country_codes text[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'categories', 'update', 'staff_config', NULL, 'global');
  PERFORM public.admin_set_country_exclusions_core(p_id, p_country_codes);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_country_exclusions', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_set_country_exclusions(uuid, text[]) IS
  'F1-4a on the door shell (DEC-333): sets a category''s excluded countries behind door_context(staff, categories:update, staff_config, global); its core refuses permissionDenied / unknownCategory and audits category.set_exclusions; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_country_exclusions(uuid, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_country_exclusions(uuid, text[]) TO authenticated;

-- ------------------------------------------------------------ 3. admin_set_primary_pointer (whole from 20260928002133 :213; the gate on door_context, the codes and the shell; jsonb)
DROP FUNCTION public.admin_set_primary_pointer(uuid);
CREATE FUNCTION public.admin_set_primary_pointer(p_pointer_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_child uuid;
  v_parent uuid;
  v_prev uuid;
BEGIN
  PERFORM public.door_context('staff', 'categories', 'restructure', 'staff_config', NULL, 'global');

  SELECT p.child_id, p.parent_id INTO v_child, v_parent
    FROM public.category_tree_pointers p WHERE p.id = p_pointer_id;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownPointer'); END IF;
  IF v_parent IS NOT NULL AND NOT EXISTS (
       SELECT 1 FROM public.categories c WHERE c.id = v_parent AND c.is_active) THEN
    PERFORM public.door_refuse('parentInactive');
  END IF;

  SELECT p.id INTO v_prev FROM public.category_tree_pointers p
   WHERE p.child_id = v_child AND p.is_primary;

  -- Two statements: the partial unique index forbids a single swap.
  UPDATE public.category_tree_pointers SET is_primary = false
   WHERE child_id = v_child AND is_primary;
  UPDATE public.category_tree_pointers SET is_primary = true WHERE id = p_pointer_id;

  PERFORM public.log_audit('category.pointer_home', 'category_tree_pointers',
    p_pointer_id::text,
    jsonb_build_object('child_id', v_child,
                       'old', jsonb_build_object('pointer_id', v_prev),
                       'new', jsonb_build_object('pointer_id', p_pointer_id, 'parent_id', v_parent)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_primary_pointer', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_set_primary_pointer(uuid) IS
  'F1-4a on the door shell (DEC-333): makes a pointer its child''s home behind door_context(staff, categories:restructure, staff_config, global); refuses unknownPointer / parentInactive; audits category.pointer_home; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_primary_pointer(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_primary_pointer(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_primary_pointer(uuid) TO service_role;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the
--     service role where it had it), never anon or PUBLIC; the cores VOLATILE SECURITY INVOKER, closed to
--     authenticated and the service role; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and
--     notSignedIn for no caller (401), none spending staff_config, writing or auditing; each core called by a
--     caller without its permission refuses permissionDenied itself (the import doors reach the cores directly).
-- (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row
--     and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_staff   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_lim     uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess_l  uuid := gen_random_uuid();
  v_role_s  uuid;
  v_role_l  uuid;
  v_root    uuid;
  v_a       uuid;
  v_b       uuid;
  v_c       uuid;
  v_d       uuid;
  v_cc      uuid;
  v_r2      uuid;
  v_pa      uuid;
  v_pb      uuid;
  v_pa2     uuid;
  v_pd      uuid;
  v_x       uuid;
  v_y       uuid;
  v_z       uuid;
  v_sel     uuid;
  v_dep     uuid;
  v_lx      uuid;
  v_ly      uuid;
  v_lsel    uuid;
  v_ldep    uuid;
  v_batch   uuid;
  v_rows    jsonb;
  v_defs    jsonb;
  v_links   jsonb;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_state   text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f14a8-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_set_country_exclusions(uuid,text[])', '96de2887a74c5fc4218c37a13daf7d08']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 8 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 8 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.admin_set_primary_pointer(uuid)', '4660748b5b654a25906f104b2925eeef']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 8 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 8 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.admin_set_country_exclusions_core(uuid,text[])', '0477b37c8f9249c5b4761edeac70765b']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'void'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 8 proof (a): the core %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 8 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, v_tag || '-staff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-deact@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_lim, v_tag || '-lim@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_staff, v_lim]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2'), (v_sess_l, v_lim, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess_l, now(), now(), 'totp');
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role_s;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_s, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'restructure', 'assets', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_s) <> 6 THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: a categories permission of the lim role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global'), (v_lim, v_role_l, 'global');
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag, v_tag) RETURNING id INTO v_root;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (NULL, v_root, 0);
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' a', v_tag || '-a') RETURNING id INTO v_a;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_root, v_a, 0) RETURNING id INTO v_pa;
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' b', v_tag || '-b') RETURNING id INTO v_b;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_root, v_b, 1) RETURNING id INTO v_pb;
    INSERT INTO public.categories (name_en, slug, is_active) VALUES (v_tag || ' c', v_tag || '-c', false) RETURNING id INTO v_c;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_root, v_c, 2);
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' d', v_tag || '-d') RETURNING id INTO v_d;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_c, v_d, 0) RETURNING id INTO v_pd;
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' r2', v_tag || '-r2') RETURNING id INTO v_r2;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_root, v_r2, 3);
    INSERT INTO public.categories (name_en, slug, is_catchall) VALUES (v_tag || ' cc', v_tag || '-cc', true) RETURNING id INTO v_cc;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_root, v_cc, 1000000);
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_r2, v_a, 0) RETURNING id INTO v_pa2;
    IF NOT (SELECT is_primary FROM public.category_tree_pointers WHERE id = v_pa)
       OR (SELECT is_primary FROM public.category_tree_pointers WHERE id = v_pa2) THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: the scratch tree''s home pointers differ';
    END IF;

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_set_country_exclusions', 'admin_set_primary_pointer');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_set_country_exclusions(v_a, ARRAY[]::text[]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_set_country_exclusions(v_a, ARRAY[]::text[]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (b) a caller without the permission (admin_set_country_exclusions) answered %', v_answer;
    END IF;
    v_answer := public.admin_set_primary_pointer(v_pa2);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (b) a caller without the permission (admin_set_primary_pointer) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_set_country_exclusions(v_a, ARRAY[]::text[]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: the dial staff_config counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: the dial staff_config counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT ((NOT EXISTS (SELECT 1 FROM public.audit_log WHERE action = 'category.set_exclusions' AND actor_id IN (v_deact, v_plain)))
        AND (NOT (SELECT is_primary FROM public.category_tree_pointers WHERE id = v_pa2))
        AND NOT EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_deact, v_plain))) THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_set_country_exclusions', 'admin_set_primary_pointer')) IS DISTINCT FROM v_refused + 4 THEN
      RAISE EXCEPTION 'F1-4a part 8 (b) proof: door_refusals did not meter the 4 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_set_country_exclusions_core(v_a, ARRAY[]::text[]);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (b) the set country exclusions core called by a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_set_country_exclusions', 'admin_set_primary_pointer');
    v_answer := public.admin_set_country_exclusions(gen_random_uuid(), ARRAY[]::text[]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCategory' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (c) exclusions of an unknown category answered %', v_answer;
    END IF;
    v_answer := public.admin_set_country_exclusions(v_a, ARRAY[]::text[]);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (c) exclusions did not answer ok';
    END IF;
    v_answer := public.admin_set_primary_pointer(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownPointer' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (c) home of an unknown pointer answered %', v_answer;
    END IF;
    v_answer := public.admin_set_primary_pointer(v_pd);
    IF v_answer ->> 'message' IS DISTINCT FROM 'parentInactive' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (c) home under a retired parent answered %', v_answer;
    END IF;
    IF NOT ((SELECT is_primary FROM public.category_tree_pointers WHERE id = v_pd)) THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (c) a refused home pointer moved';
    END IF;
    v_answer := public.admin_set_primary_pointer(v_pa2);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (c) home pointer did not answer ok';
    END IF;
    IF NOT ((SELECT is_primary FROM public.category_tree_pointers WHERE id = v_pa2) AND NOT (SELECT is_primary FROM public.category_tree_pointers WHERE id = v_pa)) THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: (c) the home pointer differs';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category.set_exclusions', 'category.pointer_home')) <> 2 THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category.set_exclusions', 'category.pointer_home'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 5 THEN
      RAISE EXCEPTION 'F1-4a part 8 proof: the dial staff_config counted % for (c) the staff writer (expected %)', v_count, 5;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_set_country_exclusions', 'admin_set_primary_pointer')) IS DISTINCT FROM v_refused + 3 THEN
      RAISE EXCEPTION 'F1-4a part 8 (c) proof: door_refusals did not meter the 3 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a8-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a8-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115040700') ON CONFLICT DO NOTHING;
