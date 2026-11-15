-- e2e-areas: admin-categories

-- Foundations 1, turn F1-4a, part 2 of 19 — THE CATEGORY DELETE AND REACTIVATE DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_delete_category and
-- admin_reactivate_category split into door + core (D1 M6a's form). Each core is NEW: its
-- door's body, SECURITY INVOKER, closed to every browser role and the service role, keeping the door's own permission
-- and step-up check, its refusal sentences and console keys as door_refuse codes (permissionDenied, unknownCategory, deleteActive,
-- deleteSlugMismatch, deleteHasListings:n, deleteHasChildren:n, alreadyActive) and its log_audit. Each
-- door (void) is DROP + CREATE as RETURNS jsonb: door_context('staff', categories:<its action>, staff_config,
-- global), the core, {ok:true} and the shell; grants restated. The category import doors call the cores (parts 5
-- and 6), so a refusal inside an import raises through the import's own shell and the whole file rolls back. Proofs
-- on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_delete_category(uuid,text)', '2b0fa9fc979012d75566769fe3f98b43'],
    ['public.admin_reactivate_category(uuid)', '9eb19830715ae0f8553888f60d4a1677']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115040000') THEN
    RAISE EXCEPTION 'F1-4a part 2: part 1 (e6e74b07) must be applied first';
  END IF;
  IF to_regprocedure('public.admin_delete_category_core(uuid,text)') IS NOT NULL
     OR to_regprocedure('public.admin_reactivate_category_core(uuid)') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-4a part 2: a core this file creates already exists';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 2: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 2: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_delete_category_core (new; the body of admin_delete_category from 20261007033719 :161; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code)
CREATE FUNCTION public.admin_delete_category_core(p_id uuid, p_confirm_slug text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE v_row public.categories%ROWTYPE; v_listings int; v_children int;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  SELECT * INTO v_row FROM public.categories WHERE id = p_id;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('unknownCategory');
  END IF;

  IF v_row.is_active THEN
    PERFORM public.door_refuse('deleteActive');
  END IF;

  IF p_confirm_slug IS DISTINCT FROM v_row.slug THEN
    PERFORM public.door_refuse('deleteSlugMismatch');
  END IF;

  SELECT count(*)::int INTO v_listings FROM public.listings l WHERE l.category_id = p_id;
  IF v_listings > 0 THEN
    PERFORM public.door_refuse('deleteHasListings', v_listings::text);
  END IF;

  SELECT count(*)::int INTO v_children FROM public.category_tree_pointers t WHERE t.parent_id = p_id;
  IF v_children > 0 THEN
    PERFORM public.door_refuse('deleteHasChildren', v_children::text);
  END IF;

  DELETE FROM public.category_tree_pointers WHERE child_id = p_id OR parent_id = p_id;
  DELETE FROM public.category_country_exclusions WHERE category_id = p_id;
  DELETE FROM public.category_attributes WHERE category_id = p_id;
  DELETE FROM public.entity_translations
   WHERE entity_type = 'category' AND entity_id = p_id;
  DELETE FROM public.categories WHERE id = p_id;

  PERFORM public.log_audit('category.delete', 'categories', p_id::text,
    jsonb_build_object('old', to_jsonb(v_row)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_delete_category_core(uuid, text) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_delete_category (whole from 20261007033719 :161; void → jsonb: door_context, the core, {ok:true} and the shell)
DROP FUNCTION public.admin_delete_category(uuid, text);
CREATE FUNCTION public.admin_delete_category(p_id uuid, p_confirm_slug text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'categories', 'restructure', 'staff_config', NULL, 'global');
  PERFORM public.admin_delete_category_core(p_id, p_confirm_slug);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_delete_category', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_delete_category(uuid, text) IS
  'F1-4a on the door shell (DEC-333): deletes a retired category behind door_context(staff, categories:restructure, staff_config, global); its core refuses permissionDenied / unknownCategory / deleteActive / deleteSlugMismatch / deleteHasListings:n / deleteHasChildren:n and audits category.delete; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_delete_category(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_delete_category(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_delete_category(uuid, text) TO service_role;

-- ------------------------------------------------------------ 3. admin_reactivate_category_core (new; the body of admin_reactivate_category from 20260903052438 :26; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code)
CREATE FUNCTION public.admin_reactivate_category_core(p_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $function$
DECLARE v_active boolean;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  SELECT c.is_active INTO v_active FROM public.categories c WHERE c.id = p_id;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('unknownCategory');
  END IF;
  IF v_active THEN
    PERFORM public.door_refuse('alreadyActive');
  END IF;

  UPDATE public.categories SET is_active = true, updated_at = now() WHERE id = p_id;

  PERFORM public.log_audit('category.reactivate', 'categories', p_id::text,
    jsonb_build_object('reactivated', true));
END $function$;
REVOKE ALL ON FUNCTION public.admin_reactivate_category_core(uuid) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 4. admin_reactivate_category (whole from 20260903052438 :26; void → jsonb: door_context, the core, {ok:true} and the shell)
DROP FUNCTION public.admin_reactivate_category(uuid);
CREATE FUNCTION public.admin_reactivate_category(p_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'categories', 'restructure', 'staff_config', NULL, 'global');
  PERFORM public.admin_reactivate_category_core(p_id);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_reactivate_category', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_reactivate_category(uuid) IS
  'F1-4a on the door shell (DEC-333): reactivates a retired category behind door_context(staff, categories:restructure, staff_config, global); its core refuses permissionDenied / unknownCategory / alreadyActive and audits category.reactivate; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_reactivate_category(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_reactivate_category(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_reactivate_category(uuid) TO service_role;

-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the
--     service role where it had it), never anon or PUBLIC; the cores VOLATILE SECURITY INVOKER, closed to
--     authenticated and the service role; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and
--     notSignedIn for no caller (401), none spending staff_config, writing or auditing; each core called by a
--     caller without its permission refuses permissionDenied itself (the import doors reach the cores directly).
-- (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row
--     and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
--     deleteHasListings needs a live listing and is not driven here.
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
  v_tag := 'e2e-mig-f14a2-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_delete_category(uuid,text)', 'f07860e4b4856694af09af5f747d3fc2'],
    ['public.admin_reactivate_category(uuid)', '592b766fd81529ff72a060442b0cd07f']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 2 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 2 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.admin_delete_category_core(uuid,text)', '62a1cec7085437b7d262815dbbfbbd08'],
    ['public.admin_reactivate_category_core(uuid)', '259443c03ab92ff2cd6eef753d5934c5']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'void'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 2 proof (a): the core %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 2 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 2 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 2 proof: the scratch tree''s home pointers differ';
    END IF;
    UPDATE public.categories SET is_active = false WHERE slug LIKE 'e2e-mig-%' AND id = v_b;

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_delete_category', 'admin_reactivate_category');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_delete_category(v_b, v_tag || '-b');
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_delete_category(v_b, v_tag || '-b');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (b) a caller without the permission (admin_delete_category) answered %', v_answer;
    END IF;
    v_answer := public.admin_reactivate_category(v_c);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (b) a caller without the permission (admin_reactivate_category) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_delete_category(v_b, v_tag || '-b');
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: the dial staff_config counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: the dial staff_config counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT ((EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_b))
        AND (NOT (SELECT is_active FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_c))
        AND NOT EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_deact, v_plain))) THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_delete_category', 'admin_reactivate_category')) IS DISTINCT FROM v_refused + 4 THEN
      RAISE EXCEPTION 'F1-4a part 2 (b) proof: door_refusals did not meter the 4 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_delete_category_core(v_b, v_tag || '-b');
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (b) the delete category core called by a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_reactivate_category_core(v_c);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (b) the reactivate category core called by a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_delete_category', 'admin_reactivate_category');
    v_answer := public.admin_delete_category(gen_random_uuid(), 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCategory' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (c) delete of an unknown category answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_category(v_a, v_tag || '-a');
    IF v_answer ->> 'message' IS DISTINCT FROM 'deleteActive' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (c) delete of an active category answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_category(v_b, 'nope');
    IF v_answer ->> 'message' IS DISTINCT FROM 'deleteSlugMismatch' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (c) delete with the wrong slug answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_category(v_c, v_tag || '-c');
    IF v_answer ->> 'message' IS DISTINCT FROM 'deleteHasChildren:1' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (c) delete of a category with a child answered %', v_answer;
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_a AND is_active) AND EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_b) AND EXISTS (SELECT 1 FROM public.category_tree_pointers WHERE id = v_pd)) THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (c) a refused delete removed something';
    END IF;
    v_answer := public.admin_delete_category(v_b, v_tag || '-b');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (c) delete did not answer ok';
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_b)) THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (c) the deleted category is still there';
    END IF;
    v_answer := public.admin_reactivate_category(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCategory' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (c) reactivate of an unknown category answered %', v_answer;
    END IF;
    v_answer := public.admin_reactivate_category(v_a);
    IF v_answer ->> 'message' IS DISTINCT FROM 'alreadyActive' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (c) reactivate of an active category answered %', v_answer;
    END IF;
    v_answer := public.admin_reactivate_category(v_c);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (c) reactivate did not answer ok';
    END IF;
    IF NOT ((SELECT is_active FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_c)) THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: (c) the reactivated category is still retired';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category.delete', 'category.reactivate')) <> 2 THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category.delete', 'category.reactivate'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 8 THEN
      RAISE EXCEPTION 'F1-4a part 2 proof: the dial staff_config counted % for (c) the staff writer (expected %)', v_count, 8;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_delete_category', 'admin_reactivate_category')) IS DISTINCT FROM v_refused + 6 THEN
      RAISE EXCEPTION 'F1-4a part 2 (c) proof: door_refusals did not meter the 6 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115040100') ON CONFLICT DO NOTHING;
