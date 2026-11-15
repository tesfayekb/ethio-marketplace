-- e2e-areas: admin-categories

-- Foundations 1, turn F1-4a, part 3 of 19 — THE CATEGORY ORDER AND WINDOW DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_reorder_categories and
-- admin_set_category_window split into door + core (D1 M6a's form). Each core is NEW: its
-- door's body, SECURITY INVOKER, closed to every browser role and the service role, keeping the door's own permission
-- and step-up check, its refusal sentences and console keys as door_refuse codes (permissionDenied, unknownCategory, badValue:visible_until) and its log_audit. Each
-- door (void) is DROP + CREATE as RETURNS jsonb: door_context('staff', categories:<its action>, staff_config,
-- global), the core, {ok:true} and the shell; grants restated. The category import doors call the cores (parts 5
-- and 6), so a refusal inside an import raises through the import's own shell and the whole file rolls back. Proofs
-- on scratch rows under a sentinel rollback.
-- admin_reorder_categories keeps C2h (no step-up) through categories:update's step-up flag (false).
-- assert_parent_not_catchall (the check the move core and the create and add-pointer cores share) raises the code
-- catchallParent instead of its console key; header and grants as they stand.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.assert_parent_not_catchall(uuid)', '9f23d9df407f414e9fb716a85584016d'],
    ['public.admin_reorder_categories(uuid,uuid[])', '41ef08f09ae02b0361cd4baa0e024ea9'],
    ['public.admin_set_category_window(uuid,timestamp with time zone,timestamp with time zone)', '0fa3a9d6d31bace88f4765a587ee36d2']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115040100') THEN
    RAISE EXCEPTION 'F1-4a part 3: part 2 (8c759b29) must be applied first';
  END IF;
  IF to_regprocedure('public.admin_reorder_categories_core(uuid,uuid[])') IS NOT NULL
     OR to_regprocedure('public.admin_set_category_window_core(uuid,timestamp with time zone,timestamp with time zone)') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-4a part 3: a core this file creates already exists';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 3: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 3: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. assert_parent_not_catchall (whole from 20260903064413 :10; its console key as the code catchallParent; header and grants as they stand)
CREATE OR REPLACE FUNCTION public.assert_parent_not_catchall(p_parent_id uuid)
RETURNS void
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $$
BEGIN
  IF p_parent_id IS NOT NULL
     AND EXISTS (SELECT 1 FROM public.categories c
                  WHERE c.id = p_parent_id AND c.is_catchall) THEN
    PERFORM public.door_refuse('catchallParent');
  END IF;
END $$;
REVOKE ALL ON FUNCTION public.assert_parent_not_catchall(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.assert_parent_not_catchall(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.assert_parent_not_catchall(uuid) TO service_role;

-- ------------------------------------------------------------ 2. admin_reorder_categories_core (new; the body of admin_reorder_categories from 20260903073853 :16; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code)
CREATE FUNCTION public.admin_reorder_categories_core(
  p_parent_id uuid,
  p_ordered_child_ids uuid[]
)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
DECLARE v_ordered uuid[];
BEGIN
  -- The ratified C2-mig spec: reordering siblings is an everyday edit.
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  -- NO step-up on reorder (C2h): moving a row is not a privileged verb.

  -- A catch-all never participates in an operator-supplied order.
  SELECT COALESCE(array_agg(u.x ORDER BY u.ord), '{}'::uuid[])
    INTO v_ordered
    FROM unnest(COALESCE(p_ordered_child_ids, '{}'::uuid[])) WITH ORDINALITY AS u(x, ord)
   WHERE NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = u.x AND c.is_catchall);

  UPDATE public.category_tree_pointers p
     SET display_order = o.ord - 1
    FROM unnest(v_ordered) WITH ORDINALITY AS o(child_id, ord)
   WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id
     AND p.child_id = o.child_id;

  -- ... and always sorts last among its siblings.
  UPDATE public.category_tree_pointers p
     SET display_order = 1000000 + c.display_order
    FROM public.categories c
   WHERE p.child_id = c.id
     AND c.is_catchall
     AND p.parent_id IS NOT DISTINCT FROM p_parent_id
     AND p.display_order < 1000000;

  PERFORM public.log_audit('category.reorder', 'category_tree_pointers',
    COALESCE(p_parent_id::text, 'root'),
    jsonb_build_object('order', to_jsonb(v_ordered)));
END $$;
REVOKE ALL ON FUNCTION public.admin_reorder_categories_core(uuid, uuid[]) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 3. admin_reorder_categories (whole from 20260903073853 :16; void → jsonb: door_context, the core, {ok:true} and the shell)
DROP FUNCTION public.admin_reorder_categories(uuid, uuid[]);
CREATE FUNCTION public.admin_reorder_categories(p_parent_id uuid, p_ordered_child_ids uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'categories', 'update', 'staff_config', NULL, 'global');
  PERFORM public.admin_reorder_categories_core(p_parent_id, p_ordered_child_ids);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_reorder_categories', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) IS
  'F1-4a on the door shell (DEC-333): orders a parent''s children behind door_context(staff, categories:update, staff_config, global) — no step-up through the row (C2h); its core refuses permissionDenied and audits category.reorder; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) TO service_role;

-- ------------------------------------------------------------ 4. admin_set_category_window_core (new; the body of admin_set_category_window from 20260903025501 :319; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code)
CREATE FUNCTION public.admin_set_category_window_core(
  p_id uuid, p_visible_from timestamptz, p_visible_until timestamptz
) RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
DECLARE v_from timestamptz; v_until timestamptz;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  SELECT c.visible_from, c.visible_until INTO v_from, v_until
    FROM public.categories c WHERE c.id = p_id;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownCategory'); END IF;

  IF p_visible_from IS NOT NULL AND p_visible_until IS NOT NULL
     AND p_visible_until <= p_visible_from THEN
    PERFORM public.door_refuse('badValue', 'visible_until');
  END IF;

  UPDATE public.categories
     SET visible_from = p_visible_from, visible_until = p_visible_until, updated_at = now()
   WHERE id = p_id;

  PERFORM public.log_audit('category.set_window', 'categories', p_id::text,
    jsonb_build_object('old', jsonb_build_object('visible_from', v_from, 'visible_until', v_until),
                       'new', jsonb_build_object('visible_from', p_visible_from, 'visible_until', p_visible_until)));
END $$;
REVOKE ALL ON FUNCTION public.admin_set_category_window_core(uuid, timestamp with time zone, timestamp with time zone) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 5. admin_set_category_window (whole from 20260903025501 :319; void → jsonb: door_context, the core, {ok:true} and the shell)
DROP FUNCTION public.admin_set_category_window(uuid, timestamp with time zone, timestamp with time zone);
CREATE FUNCTION public.admin_set_category_window(p_id uuid, p_visible_from timestamptz, p_visible_until timestamptz)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'categories', 'update', 'staff_config', NULL, 'global');
  PERFORM public.admin_set_category_window_core(p_id, p_visible_from, p_visible_until);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_category_window', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_set_category_window(uuid, timestamp with time zone, timestamp with time zone) IS
  'F1-4a on the door shell (DEC-333): sets a category''s visibility window behind door_context(staff, categories:update, staff_config, global); its core refuses permissionDenied / unknownCategory / badValue:visible_until and audits category.set_window; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_category_window(uuid, timestamp with time zone, timestamp with time zone) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_category_window(uuid, timestamp with time zone, timestamp with time zone) TO authenticated;

-- ------------------------------------------------------------ 6. PROOFS
-- (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the
--     service role where it had it), never anon or PUBLIC; the cores VOLATILE SECURITY INVOKER, closed to
--     authenticated and the service role; assert_parent_not_catchall STABLE SECURITY INVOKER with its grants as
--     they stand, raising catchallParent as P0D01; every body this file's (md5).
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
  v_tag := 'e2e-mig-f14a3-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_set_category_window(uuid,timestamp with time zone,timestamp with time zone)', 'bab389b6825029bd691a840f0342fe2c']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 3 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 3 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.admin_reorder_categories(uuid,uuid[])', '5ccb55fd6a1e2c40a933955087ce6db3']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 3 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 3 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.admin_reorder_categories_core(uuid,uuid[])', '93f0521e311a71420819c7d68f9f61e5'],
    ['public.admin_set_category_window_core(uuid,timestamp with time zone,timestamp with time zone)', '33a1d7a83e69c2500b7e63e55afb86e6']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'void'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 3 proof (a): the core %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 3 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.assert_parent_not_catchall(uuid)', '7479a4f6b855e105f48f2b7de207c96f']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'void'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 3 proof (a): the helper %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 3 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 3 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 3 proof: the scratch tree''s home pointers differ';
    END IF;

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_reorder_categories', 'admin_set_category_window');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_reorder_categories(v_root, ARRAY[v_b, v_a]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_reorder_categories(v_root, ARRAY[v_b, v_a]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (b) a caller without the permission (admin_reorder_categories) answered %', v_answer;
    END IF;
    v_answer := public.admin_set_category_window(v_a, now(), now() + interval '1 day');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (b) a caller without the permission (admin_set_category_window) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_reorder_categories(v_root, ARRAY[v_b, v_a]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: the dial staff_config counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: the dial staff_config counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT (((SELECT display_order FROM public.category_tree_pointers WHERE id = v_pb) = 1)
        AND ((SELECT visible_from FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_a) IS NULL AND (SELECT visible_until FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_a) IS NULL)
        AND NOT EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_deact, v_plain))) THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_reorder_categories', 'admin_set_category_window')) IS DISTINCT FROM v_refused + 4 THEN
      RAISE EXCEPTION 'F1-4a part 3 (b) proof: door_refusals did not meter the 4 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_reorder_categories_core(v_root, ARRAY[v_b, v_a]);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (b) the reorder categories core called by a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_set_category_window_core(v_a, NULL, now() + interval '1 day');
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (b) the set category window core called by a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.assert_parent_not_catchall(v_cc);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'catchallParent' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (c) assert_parent_not_catchall on a catch-all answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_reorder_categories', 'admin_set_category_window');
    v_answer := public.admin_reorder_categories(v_root, ARRAY[v_b, v_a]);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (c) reorder did not answer ok';
    END IF;
    IF NOT ((SELECT display_order FROM public.category_tree_pointers WHERE id = v_pb) = 0 AND (SELECT display_order FROM public.category_tree_pointers WHERE id = v_pa) = 1) THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (c) the order differs';
    END IF;
    v_answer := public.admin_set_category_window(gen_random_uuid(), NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCategory' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (c) window of an unknown category answered %', v_answer;
    END IF;
    v_answer := public.admin_set_category_window(v_a, now(), now() - interval '1 day');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:visible_until' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (c) a window that ends before it starts answered %', v_answer;
    END IF;
    v_answer := public.admin_set_category_window(v_a, NULL, now() + interval '1 day');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (c) window did not answer ok';
    END IF;
    IF NOT ((SELECT visible_until FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_a) IS NOT NULL) THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: (c) the window differs';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category.reorder', 'category.set_window')) <> 2 THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category.reorder', 'category.set_window'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 3 proof: the dial staff_config counted % for (c) the staff writer (expected %)', v_count, 4;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_reorder_categories', 'admin_set_category_window')) IS DISTINCT FROM v_refused + 2 THEN
      RAISE EXCEPTION 'F1-4a part 3 (c) proof: door_refusals did not meter the 2 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115040200') ON CONFLICT DO NOTHING;
