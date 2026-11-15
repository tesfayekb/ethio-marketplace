-- e2e-areas: admin-attributes

-- Foundations 1, turn F1-4a, part 13 of 19 — THE ATTRIBUTE DELETE AND UNLINK DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_delete_attribute and
-- admin_unlink_attribute are redeclared WHOLE from their last
-- declarations (live md5 checked). Each gate becomes ONE door_context('staff', categories:<its action>, staff_config,
-- global) and the shell; refusal sentences and console keys become door_refuse codes (unknownAttribute, confirmMismatch,
-- deleteHasDependents, deleteHasLinks, unknownLink, unlinkHasDependents, with their details). void → {ok:true}:
-- DROP + CREATE, grants restated. Proofs on
-- scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_delete_attribute(uuid,text)', '8299ea15d58908be13e97e2ca945c03a'],
    ['public.admin_unlink_attribute(uuid)', '154192b6915ced136dfe104f0e3f01de']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115041100') THEN
    RAISE EXCEPTION 'F1-4a part 13: part 12 (4a080afb) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 13: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 13: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_delete_attribute (whole from 20260908041703 :153; void → jsonb, the gate on door_context, the codes and the shell)
DROP FUNCTION public.admin_delete_attribute(uuid, text);
CREATE FUNCTION public.admin_delete_attribute(p_id uuid, p_confirm_key text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_key text; v_links integer; v_deps text[];
BEGIN
  PERFORM public.door_context('staff', 'categories', 'restructure', 'staff_config', NULL, 'global');

  SELECT a.attr_key INTO v_key FROM public.attributes a WHERE a.id = p_id;
  IF v_key IS NULL THEN
    PERFORM public.door_refuse('unknownAttribute');
  END IF;

  IF p_confirm_key IS DISTINCT FROM v_key THEN
    PERFORM public.door_refuse('confirmMismatch');
  END IF;

  -- DEC-045 — the dependents are the blast radius and the refusal NAMES them.
  SELECT array_agg(d.attr_key ORDER BY d.attr_key) INTO v_deps
    FROM public.attributes d WHERE d.depends_on = p_id;
  IF v_deps IS NOT NULL AND array_length(v_deps, 1) > 0 THEN
    PERFORM public.door_refuse('deleteHasDependents', array_to_string(v_deps, ', '));
  END IF;

  SELECT count(*)::int INTO v_links
    FROM public.category_attribute_links l WHERE l.attribute_id = p_id;
  IF v_links > 0 THEN
    PERFORM public.door_refuse('deleteHasLinks', v_links::text);
  END IF;

  DELETE FROM public.attributes WHERE id = p_id;

  PERFORM public.log_audit('attribute.delete', 'attributes', p_id::text,
    jsonb_build_object('attr_key', v_key));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_delete_attribute', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_delete_attribute(uuid, text) IS
  'F1-4a on the door shell (DEC-333): deletes an unlinked definition behind door_context(staff, categories:restructure, staff_config, global); refuses unknownAttribute / confirmMismatch / deleteHasDependents / deleteHasLinks; audits attribute.delete; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_delete_attribute(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_delete_attribute(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_delete_attribute(uuid, text) TO service_role;

-- ------------------------------------------------------------ 2. admin_unlink_attribute (whole from 20260908041703 :197; void → jsonb, the gate on door_context, the codes and the shell)
DROP FUNCTION public.admin_unlink_attribute(uuid);
CREATE FUNCTION public.admin_unlink_attribute(p_link_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_old jsonb; v_deps text[];
BEGIN
  PERFORM public.door_context('staff', 'categories', 'update', 'staff_config', NULL, 'global');

  SELECT to_jsonb(l) INTO v_old FROM public.category_attribute_links l WHERE l.id = p_link_id;
  IF v_old IS NULL THEN
    PERFORM public.door_refuse('unknownLink');
  END IF;

  -- DEC-045 — a parent cannot leave a category while a dependent stays in it.
  SELECT array_agg(a2.attr_key ORDER BY a2.attr_key) INTO v_deps
    FROM public.category_attribute_links l2
    JOIN public.attributes a2 ON a2.id = l2.attribute_id
   WHERE l2.category_id = (v_old->>'category_id')::uuid
     AND a2.depends_on  = (v_old->>'attribute_id')::uuid;
  IF v_deps IS NOT NULL AND array_length(v_deps, 1) > 0 THEN
    PERFORM public.door_refuse('unlinkHasDependents', array_to_string(v_deps, ', '));
  END IF;

  DELETE FROM public.category_attribute_links WHERE id = p_link_id;

  PERFORM public.log_audit('attribute.unlink', 'category_attribute_links', p_link_id::text,
    jsonb_build_object('old', v_old));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_unlink_attribute', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_unlink_attribute(uuid) IS
  'F1-4a on the door shell (DEC-333): removes one category link behind door_context(staff, categories:update, staff_config, global); refuses unknownLink / unlinkHasDependents; audits attribute.unlink; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_unlink_attribute(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_unlink_attribute(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_unlink_attribute(uuid) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the
--     service role where it had it), never anon or PUBLIC; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and
--     notSignedIn for no caller (401), none spending staff_config, writing or auditing;
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
  v_tag := 'e2e-mig-f14a13-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_delete_attribute(uuid,text)', '1c2841de91046b9c9607817fac7d5a2d'],
    ['public.admin_unlink_attribute(uuid)', '43479bc7ed530b2dc875b5e319f03ff5']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 13 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 13 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 13 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 13 proof: the scratch tree''s home pointers differ';
    END IF;
    INSERT INTO public.attributes (attr_key, name_en, attr_type) VALUES (v_tag || '-x', 'X', 'text') RETURNING id INTO v_x;
    INSERT INTO public.attributes (attr_key, name_en, attr_type) VALUES (v_tag || '-y', 'Y', 'text') RETURNING id INTO v_y;
    INSERT INTO public.attributes (attr_key, name_en, attr_type) VALUES (v_tag || '-z', 'Z', 'text') RETURNING id INTO v_z;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
    VALUES (v_tag || '-sel', 'Sel', 'single_select', '[{"value": "a", "label_en": "A"}]'::jsonb) RETURNING id INTO v_sel;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options, depends_on)
    VALUES (v_tag || '-dep', 'Dep', 'single_select', '[{"value": "q", "label_en": "Q", "parent": "a"}]'::jsonb, v_sel) RETURNING id INTO v_dep;
    INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order) VALUES (v_root, v_x, 0) RETURNING id INTO v_lx;
    INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order) VALUES (v_root, v_y, 1) RETURNING id INTO v_ly;
    INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order) VALUES (v_root, v_sel, 2) RETURNING id INTO v_lsel;
    INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order) VALUES (v_root, v_dep, 3) RETURNING id INTO v_ldep;

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_delete_attribute', 'admin_unlink_attribute');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_delete_attribute(v_z, v_tag || '-z');
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_delete_attribute(v_z, v_tag || '-z');
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (b) a caller without the permission (admin_delete_attribute) answered %', v_answer;
    END IF;
    v_answer := public.admin_unlink_attribute(v_ly);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (b) a caller without the permission (admin_unlink_attribute) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_delete_attribute(v_z, v_tag || '-z');
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: the dial staff_config counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: the dial staff_config counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT ((EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND id = v_z))
        AND (EXISTS (SELECT 1 FROM public.category_attribute_links WHERE id = v_ly))
        AND NOT EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_deact, v_plain))) THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_delete_attribute', 'admin_unlink_attribute')) IS DISTINCT FROM v_refused + 4 THEN
      RAISE EXCEPTION 'F1-4a part 13 (b) proof: door_refusals did not meter the 4 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_delete_attribute', 'admin_unlink_attribute');
    v_answer := public.admin_delete_attribute(gen_random_uuid(), 'x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownAttribute' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (c) delete of an unknown definition answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_attribute(v_z, 'nope');
    IF v_answer ->> 'message' IS DISTINCT FROM 'confirmMismatch' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (c) delete with the wrong key answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_attribute(v_sel, v_tag || '-sel');
    IF v_answer ->> 'message' IS DISTINCT FROM 'deleteHasDependents:' || v_tag || '-dep' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (c) delete of a parent answered %', v_answer;
    END IF;
    v_answer := public.admin_delete_attribute(v_y, v_tag || '-y');
    IF v_answer ->> 'message' IS DISTINCT FROM 'deleteHasLinks:1' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (c) delete of a linked definition answered %', v_answer;
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND id = v_sel) AND EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND id = v_y)) THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (c) a refused delete removed a definition';
    END IF;
    v_answer := public.admin_delete_attribute(v_z, v_tag || '-z');
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (c) delete did not answer ok';
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND id = v_z)) THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (c) the deleted definition is still there';
    END IF;
    v_answer := public.admin_unlink_attribute(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownLink' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (c) unlink of an unknown link answered %', v_answer;
    END IF;
    v_answer := public.admin_unlink_attribute(v_lsel);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unlinkHasDependents:' || v_tag || '-dep' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (c) unlink of a parent beside its dependent answered %', v_answer;
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.category_attribute_links WHERE id = v_lsel)) THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (c) a refused unlink removed a link';
    END IF;
    v_answer := public.admin_unlink_attribute(v_ldep);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (c) unlink did not answer ok';
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.category_attribute_links WHERE id = v_ldep)) THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: (c) the unlinked link is still there';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.delete', 'attribute.unlink')) <> 2 THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.delete', 'attribute.unlink'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 8 THEN
      RAISE EXCEPTION 'F1-4a part 13 proof: the dial staff_config counted % for (c) the staff writer (expected %)', v_count, 8;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_delete_attribute', 'admin_unlink_attribute')) IS DISTINCT FROM v_refused + 6 THEN
      RAISE EXCEPTION 'F1-4a part 13 (c) proof: door_refusals did not meter the 6 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a13-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a13-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115041200') ON CONFLICT DO NOTHING;
