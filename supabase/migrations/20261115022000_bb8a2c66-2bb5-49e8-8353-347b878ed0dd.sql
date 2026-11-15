-- e2e-areas: admin-categories

-- Foundations 1, turn F1-4a, part 7 of 19 — THE CATEGORY CREATE AND POINTER ADD DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_create_category and
-- admin_add_category_pointer (D1 M6a's door + core) are redeclared WHOLE from their last
-- declarations (live md5 checked). Each gate becomes ONE door_context('staff', categories:<its action>, staff_config,
-- global) and the shell; refusal sentences and console keys become door_refuse codes (permissionDenied, catchallParent, slugTaken). Return
-- types: create and add pointer uuid → {ok:true, id}, DROP + CREATE, grants restated; the cores keep their shape (CREATE OR REPLACE) and D1 M6a's grants. Proofs on
-- scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_create_category_core(text,text,text,uuid,boolean,boolean,integer,timestamp with time zone,timestamp with time zone)', 'c07851c720fb9a0da28fac81e25bf88a'],
    ['public.admin_add_category_pointer_core(uuid,uuid)', '73ea122d818f3dc2d88cf213a5542c42'],
    ['public.admin_create_category(text,text,text,uuid,boolean,boolean,integer,timestamp with time zone,timestamp with time zone)', 'acd25c60bb2f04cba651d32cb67d8346'],
    ['public.admin_add_category_pointer(uuid,uuid)', '438b205a914020e03f3951f27d4f76db']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115040500') THEN
    RAISE EXCEPTION 'F1-4a part 7: part 6 (be051beb) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 7: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 7: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_create_category_core (whole from 20261029001111 :60; its refusals as codes; D1 M6a's grants restated)
CREATE OR REPLACE FUNCTION public.admin_create_category_core(p_name_en text, p_slug text DEFAULT NULL::text, p_icon text DEFAULT NULL::text, p_parent_id uuid DEFAULT NULL::uuid, p_allow_listings boolean DEFAULT true, p_price_enabled boolean DEFAULT true, p_expiry_days integer DEFAULT NULL::integer, p_visible_from timestamp with time zone DEFAULT NULL::timestamp with time zone, p_visible_until timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_id uuid;
  v_slug text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'create') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'create');

  PERFORM public.assert_parent_not_catchall(p_parent_id);

  IF p_slug IS NULL OR btrim(p_slug) = '' THEN
    v_slug := public.category_slug_candidate(p_name_en);
  ELSE
    v_slug := lower(btrim(p_slug));
    IF EXISTS (SELECT 1 FROM public.categories c WHERE c.slug = v_slug) THEN
      PERFORM public.door_refuse('slugTaken');
    END IF;
  END IF;

  INSERT INTO public.categories (name_en, slug, icon, allow_listings,
                                 price_enabled, expiry_days,
                                 visible_from, visible_until)
  VALUES (p_name_en, v_slug, p_icon, COALESCE(p_allow_listings, true),
          COALESCE(p_price_enabled, true), p_expiry_days,
          p_visible_from, p_visible_until)
  RETURNING id INTO v_id;

  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (p_parent_id, v_id,
          COALESCE((SELECT max(display_order) + 1 FROM public.category_tree_pointers p
                     WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id), 0));

  PERFORM public.log_audit('category.create', 'categories', v_id::text,
    jsonb_build_object('name_en', p_name_en, 'slug', v_slug,
                       'parent_id', p_parent_id, 'allow_listings', p_allow_listings,
                       'price_enabled', p_price_enabled, 'expiry_days', p_expiry_days,
                       'visible_from', p_visible_from, 'visible_until', p_visible_until));
  RETURN v_id;
END $function$;
REVOKE ALL ON FUNCTION public.admin_create_category_core(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_create_category (whole from 20261029001111 :108; the gate on door_context, the core and the shell; jsonb)
DROP FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone);
CREATE FUNCTION public.admin_create_category(p_name_en text, p_slug text DEFAULT NULL::text, p_icon text DEFAULT NULL::text, p_parent_id uuid DEFAULT NULL::uuid, p_allow_listings boolean DEFAULT true, p_price_enabled boolean DEFAULT true, p_expiry_days integer DEFAULT NULL::integer, p_visible_from timestamp with time zone DEFAULT NULL::timestamp with time zone, p_visible_until timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'categories', 'create', 'staff_config', NULL, 'global');
  RETURN jsonb_build_object('ok', true, 'id', public.admin_create_category_core(p_name_en, p_slug, p_icon, p_parent_id, p_allow_listings, p_price_enabled, p_expiry_days, p_visible_from, p_visible_until));
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_create_category', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone) IS
  'F1-4a on the door shell (DEC-333): creates a category behind door_context(staff, categories:create, staff_config, global); its core refuses permissionDenied / catchallParent / slugTaken and audits category.create; answers {ok:true, id}.';
REVOKE ALL ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone) TO authenticated;
GRANT ALL ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamp with time zone, timestamp with time zone) TO service_role;

-- ------------------------------------------------------------ 3. admin_add_category_pointer_core (whole from 20261029001111 :14; its refusals as codes; D1 M6a's grants restated)
CREATE OR REPLACE FUNCTION public.admin_add_category_pointer_core(p_parent_id uuid, p_child_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE v_id uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  PERFORM public.assert_parent_not_catchall(p_parent_id);

  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (p_parent_id, p_child_id,
          COALESCE((SELECT max(display_order) + 1 FROM public.category_tree_pointers p
                     WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id), 0))
  RETURNING id INTO v_id;

  PERFORM public.log_audit('category.pointer_add', 'category_tree_pointers', v_id::text,
    jsonb_build_object('parent_id', p_parent_id, 'child_id', p_child_id));
  RETURN v_id;
END $function$;
REVOKE ALL ON FUNCTION public.admin_add_category_pointer_core(uuid, uuid) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 4. admin_add_category_pointer (whole from 20261029001111 :41; the gate on door_context, the core and the shell; jsonb)
DROP FUNCTION public.admin_add_category_pointer(uuid, uuid);
CREATE FUNCTION public.admin_add_category_pointer(p_parent_id uuid, p_child_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'categories', 'restructure', 'staff_config', NULL, 'global');
  RETURN jsonb_build_object('ok', true, 'id', public.admin_add_category_pointer_core(p_parent_id, p_child_id));
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_add_category_pointer', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_add_category_pointer(uuid, uuid) IS
  'F1-4a on the door shell (DEC-333): adds a tree pointer behind door_context(staff, categories:restructure, staff_config, global); its core refuses permissionDenied / catchallParent and audits category.pointer_add; answers {ok:true, id}.';
REVOKE ALL ON FUNCTION public.admin_add_category_pointer(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_add_category_pointer(uuid, uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_add_category_pointer(uuid, uuid) TO service_role;

-- ------------------------------------------------------------ 5. PROOFS
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
  v_tag := 'e2e-mig-f14a7-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_create_category(text,text,text,uuid,boolean,boolean,integer,timestamp with time zone,timestamp with time zone)', '105ddf6cfe4e2b372281079313ef6275'],
    ['public.admin_add_category_pointer(uuid,uuid)', '32d48012af4646468b102952ef1d711d']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 7 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 7 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.admin_create_category_core(text,text,text,uuid,boolean,boolean,integer,timestamp with time zone,timestamp with time zone)', 'e90a15b9da716c1f69e8634568ce32e5'],
    ['public.admin_add_category_pointer_core(uuid,uuid)', 'eb7b3b14efe73e7aecb0347aba155e78']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'uuid'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 7 proof (a): the core %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 7 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 7 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 7 proof: the scratch tree''s home pointers differ';
    END IF;

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_create_category', 'admin_add_category_pointer');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_create_category(v_tag || ' new', v_tag || '-new', NULL, v_root);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_create_category(v_tag || ' new', v_tag || '-new', NULL, v_root);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (b) a caller without the permission (admin_create_category) answered %', v_answer;
    END IF;
    v_answer := public.admin_add_category_pointer(v_r2, v_d);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (b) a caller without the permission (admin_add_category_pointer) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_create_category(v_tag || ' new', v_tag || '-new', NULL, v_root);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: the dial staff_config counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: the dial staff_config counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT ((NOT EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-new'))
        AND (NOT EXISTS (SELECT 1 FROM public.category_tree_pointers WHERE parent_id = v_r2 AND child_id = v_d))
        AND NOT EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_deact, v_plain))) THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_create_category', 'admin_add_category_pointer')) IS DISTINCT FROM v_refused + 4 THEN
      RAISE EXCEPTION 'F1-4a part 7 (b) proof: door_refusals did not meter the 4 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_create_category_core(v_tag || ' new', v_tag || '-new', NULL, v_root, true, true, NULL, NULL, NULL);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (b) the create category core called by a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_add_category_pointer_core(v_r2, v_d);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (b) the add category pointer core called by a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_create_category', 'admin_add_category_pointer');
    v_answer := public.admin_create_category(v_tag || ' x', v_tag || '-x', NULL, v_cc);
    IF v_answer ->> 'message' IS DISTINCT FROM 'catchallParent' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (c) create under a catch-all answered %', v_answer;
    END IF;
    v_answer := public.admin_create_category(v_tag || ' again', v_tag, NULL, v_root);
    IF v_answer ->> 'message' IS DISTINCT FROM 'slugTaken' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (c) create with a taken slug answered %', v_answer;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND (slug = v_tag || '-x' OR name_en = v_tag || ' again'))) THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (c) a refused create wrote a category';
    END IF;
    v_answer := public.admin_create_category(v_tag || ' new', v_tag || '-new', NULL, v_root);
    IF v_answer ->> 'ok' IS DISTINCT FROM 'true' OR v_answer ->> 'id' IS DISTINCT FROM (SELECT id FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-new')::text THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (c) create answered %', v_answer;
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.category_tree_pointers p JOIN public.categories c ON c.id = p.child_id WHERE c.slug LIKE 'e2e-mig-%' AND c.slug = v_tag || '-new' AND p.parent_id = v_root AND p.is_primary)) THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (c) the created category''s home differs';
    END IF;
    v_answer := public.admin_add_category_pointer(v_cc, v_d);
    IF v_answer ->> 'message' IS DISTINCT FROM 'catchallParent' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (c) a pointer under a catch-all answered %', v_answer;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.category_tree_pointers WHERE parent_id = v_cc AND child_id = v_d)) THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (c) a refused pointer was written';
    END IF;
    v_answer := public.admin_add_category_pointer(v_r2, v_d);
    IF v_answer ->> 'ok' IS DISTINCT FROM 'true' OR v_answer ->> 'id' IS DISTINCT FROM (SELECT id FROM public.category_tree_pointers WHERE parent_id = v_r2 AND child_id = v_d)::text THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: (c) add pointer answered %', v_answer;
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category.create', 'category.pointer_add')) <> 2 THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category.create', 'category.pointer_add'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 5 THEN
      RAISE EXCEPTION 'F1-4a part 7 proof: the dial staff_config counted % for (c) the staff writer (expected %)', v_count, 5;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_create_category', 'admin_add_category_pointer')) IS DISTINCT FROM v_refused + 3 THEN
      RAISE EXCEPTION 'F1-4a part 7 (c) proof: door_refusals did not meter the 3 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a7-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a7-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115040600') ON CONFLICT DO NOTHING;
