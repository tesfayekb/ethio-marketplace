-- e2e-areas: admin-categories

-- Foundations 1, turn F1-4a, part 1 of 19 — THE CATEGORY EDIT AND RETIRE DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_update_category and
-- admin_retire_category split into door + core (D1 M6a's form). Each core is NEW: its
-- door's body, SECURITY INVOKER, closed to every browser role and the service role, keeping the door's own permission
-- and step-up check, its refusal sentences and console keys as door_refuse codes (permissionDenied, unknownCategory, reassignRequired,
-- reassignTargetInvalid) and its log_audit. Each
-- door (void) is DROP + CREATE as RETURNS jsonb: door_context('staff', categories:<its action>, staff_config,
-- global), the core, {ok:true} and the shell; grants restated. The category import doors call the cores (parts 5
-- and 6), so a refusal inside an import raises through the import's own shell and the whole file rolls back. Proofs
-- on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_update_category(uuid,text,text,integer,boolean,boolean,integer)', '884c2b71bd6770e46364f157b9308dde'],
    ['public.admin_retire_category(uuid,uuid)', '6cf5b7a647e56f8c9fdff95e53fc7119']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261114150000') THEN
    RAISE EXCEPTION 'F1-4a part 1: the ledger''s newest mark (5624a06f) must be applied first';
  END IF;
  IF to_regprocedure('public.admin_update_category_core(uuid,text,text,integer,boolean,boolean,integer)') IS NOT NULL
     OR to_regprocedure('public.admin_retire_category_core(uuid,uuid)') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-4a part 1: a core this file creates already exists';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 1: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 1: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_update_category_core (new; the body of admin_update_category from 20260903025501 :276; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code)
CREATE FUNCTION public.admin_update_category_core(
  p_id uuid, p_name_en text, p_icon text, p_display_order integer,
  p_allow_listings boolean, p_price_enabled boolean, p_expiry_days integer
) RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
DECLARE v_old jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  SELECT to_jsonb(c) INTO v_old FROM public.categories c WHERE c.id = p_id;
  IF v_old IS NULL THEN PERFORM public.door_refuse('unknownCategory'); END IF;

  UPDATE public.categories c
     SET name_en        = COALESCE(p_name_en, c.name_en),
         icon           = COALESCE(p_icon, c.icon),
         display_order  = COALESCE(p_display_order, c.display_order),
         allow_listings = COALESCE(p_allow_listings, c.allow_listings),
         price_enabled  = COALESCE(p_price_enabled, c.price_enabled),
         expiry_days    = COALESCE(p_expiry_days, c.expiry_days),
         updated_at     = now()
   WHERE c.id = p_id;

  PERFORM public.log_audit('category.update', 'categories', p_id::text,
    jsonb_build_object(
      'old', jsonb_build_object('name_en', v_old->>'name_en', 'icon', v_old->>'icon',
              'display_order', v_old->'display_order', 'allow_listings', v_old->'allow_listings',
              'price_enabled', v_old->'price_enabled', 'expiry_days', v_old->'expiry_days'),
      'new', (SELECT jsonb_build_object('name_en', c.name_en, 'icon', c.icon,
              'display_order', c.display_order, 'allow_listings', c.allow_listings,
              'price_enabled', c.price_enabled, 'expiry_days', c.expiry_days)
                FROM public.categories c WHERE c.id = p_id)));
END $$;
REVOKE ALL ON FUNCTION public.admin_update_category_core(uuid, text, text, integer, boolean, boolean, integer) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 2. admin_update_category (whole from 20260903025501 :276; void → jsonb: door_context, the core, {ok:true} and the shell)
DROP FUNCTION public.admin_update_category(uuid, text, text, integer, boolean, boolean, integer);
CREATE FUNCTION public.admin_update_category(p_id uuid, p_name_en text, p_icon text, p_display_order integer, p_allow_listings boolean, p_price_enabled boolean, p_expiry_days integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'categories', 'update', 'staff_config', NULL, 'global');
  PERFORM public.admin_update_category_core(p_id, p_name_en, p_icon, p_display_order, p_allow_listings, p_price_enabled, p_expiry_days);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_update_category', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_update_category(uuid, text, text, integer, boolean, boolean, integer) IS
  'F1-4a on the door shell (DEC-333): edits a category''s cells behind door_context(staff, categories:update, staff_config, global); its core refuses permissionDenied / unknownCategory and audits category.update; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_update_category(uuid, text, text, integer, boolean, boolean, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_category(uuid, text, text, integer, boolean, boolean, integer) TO authenticated;

-- ------------------------------------------------------------ 3. admin_retire_category_core (new; the body of admin_retire_category from 20260903025501 :393; SECURITY INVOKER, closed to every browser role and the service role; its door's permission and step-up and every refusal as a code)
CREATE FUNCTION public.admin_retire_category_core(
  p_id uuid, p_reassign_to uuid
) RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
DECLARE v_live int; v_moved int := 0;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    PERFORM public.door_refuse('permissionDenied');
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  IF NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_id) THEN
    PERFORM public.door_refuse('unknownCategory');
  END IF;

  SELECT count(*)::int INTO v_live FROM public.listings l
   WHERE l.category_id = p_id AND l.status = 'active';

  IF v_live > 0 AND p_reassign_to IS NULL THEN
    PERFORM public.door_refuse('reassignRequired');
  END IF;

  IF v_live > 0 THEN
    IF NOT EXISTS (SELECT 1 FROM public.categories c
                    WHERE c.id = p_reassign_to AND c.is_active AND c.allow_listings) THEN
      PERFORM public.door_refuse('reassignTargetInvalid');
    END IF;
    UPDATE public.listings SET category_id = p_reassign_to, updated_at = now()
     WHERE category_id = p_id AND status = 'active';
    GET DIAGNOSTICS v_moved = ROW_COUNT;
  END IF;

  UPDATE public.categories SET is_active = false, updated_at = now() WHERE id = p_id;

  PERFORM public.log_audit('category.retire', 'categories', p_id::text,
    jsonb_build_object('reassign_to', p_reassign_to, 'listings_moved', v_moved));
END $$;
REVOKE ALL ON FUNCTION public.admin_retire_category_core(uuid, uuid) FROM PUBLIC, anon, authenticated, service_role;

-- ------------------------------------------------------------ 4. admin_retire_category (whole from 20260903025501 :393; void → jsonb: door_context, the core, {ok:true} and the shell)
DROP FUNCTION public.admin_retire_category(uuid, uuid);
CREATE FUNCTION public.admin_retire_category(p_id uuid, p_reassign_to uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff', 'categories', 'restructure', 'staff_config', NULL, 'global');
  PERFORM public.admin_retire_category_core(p_id, p_reassign_to);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_retire_category', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_retire_category(uuid, uuid) IS
  'F1-4a on the door shell (DEC-333): retires a category behind door_context(staff, categories:restructure, staff_config, global); its core refuses permissionDenied / unknownCategory / reassignRequired / reassignTargetInvalid and audits category.retire; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_retire_category(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_retire_category(uuid, uuid) TO authenticated;

-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated, never anon
--     or PUBLIC; the cores VOLATILE SECURITY INVOKER, closed to authenticated and the service role; every body
--     this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and
--     notSignedIn for no caller (401), none spending staff_config, writing or auditing; each core called by a
--     caller without its permission refuses permissionDenied itself (the import doors reach the cores directly).
-- (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row
--     and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
--     reassignRequired and reassignTargetInvalid need a live listing and are not driven here.
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
  v_tag := 'e2e-mig-f14a1-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_update_category(uuid,text,text,integer,boolean,boolean,integer)', 'df761fa298c22ebbc45f1813bf57261e'],
    ['public.admin_retire_category(uuid,uuid)', '6dad977618973dacbaef4aaccd0251aa']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 1 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 1 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.admin_update_category_core(uuid,text,text,integer,boolean,boolean,integer)', 'a514bf83dce00b80232d21781a23ca2d'],
    ['public.admin_retire_category_core(uuid,uuid)', '398c1c254b85af4e6cefcd8e75635b85']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'void'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 1 proof (a): the core %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 1 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 1 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 1 proof: the scratch tree''s home pointers differ';
    END IF;

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_update_category', 'admin_retire_category');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_update_category(v_a, 'Z', NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_update_category(v_a, 'Z', NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (b) a caller without the permission (admin_update_category) answered %', v_answer;
    END IF;
    v_answer := public.admin_retire_category(v_b, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (b) a caller without the permission (admin_retire_category) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_update_category(v_a, 'Z', NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: the dial staff_config counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: the dial staff_config counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT (((SELECT name_en FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_a) = v_tag || ' a')
        AND ((SELECT is_active FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_b))
        AND NOT EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_deact, v_plain))) THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_update_category', 'admin_retire_category')) IS DISTINCT FROM v_refused + 4 THEN
      RAISE EXCEPTION 'F1-4a part 1 (b) proof: door_refusals did not meter the 4 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_update_category_core(v_a, 'Z', NULL, NULL, NULL, NULL, NULL);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (b) the update category core called by a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_retire_category_core(v_b, NULL);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (b) the retire category core called by a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_update_category', 'admin_retire_category');
    v_answer := public.admin_update_category(gen_random_uuid(), 'Z', NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCategory' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (c) update of an unknown category answered %', v_answer;
    END IF;
    v_answer := public.admin_update_category(v_a, v_tag || ' a2', NULL, NULL, NULL, NULL, NULL);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (c) update did not answer ok';
    END IF;
    IF NOT ((SELECT name_en FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_a) = v_tag || ' a2') THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (c) the updated name differs';
    END IF;
    v_answer := public.admin_retire_category(gen_random_uuid(), NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCategory' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (c) retire of an unknown category answered %', v_answer;
    END IF;
    v_answer := public.admin_retire_category(v_b, NULL);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (c) retire did not answer ok';
    END IF;
    IF NOT (NOT (SELECT is_active FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_b)) THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: (c) the retired category is still active';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category.update', 'category.retire')) <> 2 THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category.update', 'category.retire'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 1 proof: the dial staff_config counted % for (c) the staff writer (expected %)', v_count, 4;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_update_category', 'admin_retire_category')) IS DISTINCT FROM v_refused + 2 THEN
      RAISE EXCEPTION 'F1-4a part 1 (c) proof: door_refusals did not meter the 2 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115040000') ON CONFLICT DO NOTHING;
