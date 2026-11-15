-- e2e-areas: admin-attributes

-- Foundations 1, turn F1-4a, part 14 of 19 — THE ATTRIBUTE MERGE DOOR ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_merge_attributes and
-- merge_attributes_impl are redeclared WHOLE from their last
-- declarations (live md5 checked). Each gate becomes ONE door_context('staff', categories:<its action>, staff_config,
-- global) and the shell; refusal sentences and console keys become door_refuse codes (mergeAcrossDependency, mergeHasHolders,
-- unknownAttribute, mergeNoSources, mergeTargetInSources). The merge keeps its counts answer and
-- its header (CREATE OR REPLACE); the impl's grants restated. Proofs on
-- scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.merge_attributes_impl(uuid,uuid[])', '3091c59ba0b3494a527332c5d8521ba1'],
    ['public.admin_merge_attributes(uuid,uuid[])', '9fb76772ad9195f69feeeb7911fccddc']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115041200') THEN
    RAISE EXCEPTION 'F1-4a part 14: part 13 (054d63cc) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 14: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 14: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. merge_attributes_impl (whole from 20260906043420 :211; its console keys as codes; grants restated)
CREATE OR REPLACE FUNCTION public.merge_attributes_impl(p_target uuid, p_sources uuid[])
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_sources uuid[];
  v_moved integer := 0;
  v_folded integer := 0;
  v_removed integer := 0;
  v_key text;
BEGIN
  SELECT a.attr_key INTO v_key FROM public.attributes a WHERE a.id = p_target;
  IF v_key IS NULL THEN
    PERFORM public.door_refuse('unknownAttribute');
  END IF;

  SELECT COALESCE(array_agg(DISTINCT s), ARRAY[]::uuid[]) INTO v_sources
    FROM unnest(COALESCE(p_sources, ARRAY[]::uuid[])) s WHERE s IS NOT NULL;

  IF array_length(v_sources, 1) IS NULL THEN
    PERFORM public.door_refuse('mergeNoSources');
  END IF;
  IF p_target = ANY (v_sources) THEN
    PERFORM public.door_refuse('mergeTargetInSources');
  END IF;

  -- (1) A category that ALREADY carries the target keeps ONE link and the
  --     STRICTER flags; the source link is folded away.
  UPDATE public.category_attribute_links t
     SET is_required   = t.is_required OR s.is_required,
         is_filterable = t.is_filterable OR s.is_filterable,
         updated_at    = now()
    FROM public.category_attribute_links s
   WHERE s.attribute_id = ANY (v_sources)
     AND t.attribute_id = p_target
     AND t.category_id = s.category_id;

  WITH folded AS (
    DELETE FROM public.category_attribute_links s
     WHERE s.attribute_id = ANY (v_sources)
       AND EXISTS (SELECT 1 FROM public.category_attribute_links t
                    WHERE t.attribute_id = p_target AND t.category_id = s.category_id)
    RETURNING 1
  ) SELECT count(*)::int INTO v_folded FROM folded;

  -- (1b) SIBLING SOURCES COLLIDE TOO: a category carrying two source links
  --      keeps ONE (the lowest-ordered) with the union of the flags.
  UPDATE public.category_attribute_links l
     SET is_required   = agg.req,
         is_filterable = agg.filt,
         updated_at    = now()
    FROM (
      SELECT category_id,
             bool_or(is_required) AS req,
             bool_or(is_filterable) AS filt,
             (array_agg(id ORDER BY display_order, id))[1] AS keeper
        FROM public.category_attribute_links
       WHERE attribute_id = ANY (v_sources)
       GROUP BY category_id
    ) agg
   WHERE l.id = agg.keeper;

  WITH sibling AS (
    DELETE FROM public.category_attribute_links l
     WHERE l.attribute_id = ANY (v_sources)
       AND l.id <> (SELECT (array_agg(k.id ORDER BY k.display_order, k.id))[1]
                      FROM public.category_attribute_links k
                     WHERE k.attribute_id = ANY (v_sources)
                       AND k.category_id = l.category_id)
    RETURNING 1
  ) SELECT v_folded + count(*)::int INTO v_folded FROM sibling;

  -- (2) Every surviving source link is RE-POINTED at the target.
  WITH moved AS (
    UPDATE public.category_attribute_links l
       SET attribute_id = p_target, updated_at = now()
     WHERE l.attribute_id = ANY (v_sources)
    RETURNING 1
  ) SELECT count(*)::int INTO v_moved FROM moved;

  -- (3) The now-unreferenced source definitions are removed.
  WITH gone AS (
    DELETE FROM public.attributes a WHERE a.id = ANY (v_sources) RETURNING 1
  ) SELECT count(*)::int INTO v_removed FROM gone;

  RETURN jsonb_build_object('moved', v_moved, 'folded', v_folded, 'removed', v_removed);
END $$;
REVOKE ALL ON FUNCTION public.merge_attributes_impl(uuid, uuid[]) FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------ 2. admin_merge_attributes (whole from 20261007033719 :88; the gate on door_context, the codes and the shell; its counts answer kept)
CREATE OR REPLACE FUNCTION public.admin_merge_attributes(p_target uuid, p_sources uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_counts jsonb; v_set uuid[]; v_deps text[]; v_holders int;
BEGIN
  PERFORM public.door_context('staff', 'categories', 'restructure', 'staff_config', NULL, 'global');

  -- DEC-045 — never merge across a dependency: a fold would silently repoint
  -- or orphan a dependent definition.
  v_set := ARRAY[p_target] || COALESCE(p_sources, ARRAY[]::uuid[]);
  SELECT array_agg(DISTINCT k ORDER BY k) INTO v_deps FROM (
    SELECT d.attr_key AS k FROM public.attributes d
     WHERE d.depends_on = ANY (COALESCE(p_sources, ARRAY[]::uuid[]))
    UNION
    SELECT a.attr_key FROM public.attributes a
     WHERE a.id = ANY (v_set) AND a.depends_on = ANY (v_set)
  ) x;
  IF v_deps IS NOT NULL AND array_length(v_deps, 1) > 0 THEN
    PERFORM public.door_refuse('mergeAcrossDependency', array_to_string(v_deps, ', '));
  END IF;

  -- M11 / E1.3 — never merge while a listing holds an answer to a source.
  SELECT COALESCE(sum(public.attribute_holders(s, NULL, NULL)), 0)::int INTO v_holders
    FROM unnest(COALESCE(p_sources, ARRAY[]::uuid[])) s;
  IF v_holders > 0 THEN
    PERFORM public.door_refuse('mergeHasHolders', v_holders::text);
  END IF;

  v_counts := public.merge_attributes_impl(p_target, p_sources);

  PERFORM public.log_audit('attribute.merge', 'attributes', p_target::text,
    jsonb_build_object('sources', to_jsonb(p_sources), 'counts', v_counts));

  RETURN v_counts;
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_merge_attributes', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_merge_attributes(uuid, uuid[]) IS
  'F1-4a on the door shell (DEC-333): folds definitions into one behind door_context(staff, categories:restructure, staff_config, global); refuses mergeAcrossDependency / mergeHasHolders and merge_attributes_impl''s unknownAttribute / mergeNoSources / mergeTargetInSources; audits attribute.merge; answers its counts.';
REVOKE ALL ON FUNCTION public.admin_merge_attributes(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_merge_attributes(uuid, uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_merge_attributes(uuid, uuid[]) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: the door VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service
--     role where it had it), never anon or PUBLIC; merge_attributes_impl SECURITY DEFINER and closed to browser
--     roles, its codes answered through the merge door's shell; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and
--     notSignedIn for no caller (401), none spending staff_config, writing or auditing;
-- (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row
--     and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
--     mergeHasHolders needs a listing's answer and is not driven here.
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
  v_tag := 'e2e-mig-f14a14-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_merge_attributes(uuid,uuid[])', '0dda8bba84497c8ee8860c0f453464d6']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 14 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 14 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.merge_attributes_impl(uuid,uuid[])', '19bbe66b832693b2dd693d9a1e5c3b05']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 14 proof (a): the impl %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 14 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 14 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 14 proof: the scratch tree''s home pointers differ';
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
       AND door IN ('admin_merge_attributes');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_merge_attributes(v_x, ARRAY[v_y]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_merge_attributes(v_x, ARRAY[v_y]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: (b) a caller without the permission (admin_merge_attributes) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_merge_attributes(v_x, ARRAY[v_y]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: the dial staff_config counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: the dial staff_config counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT ((EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND id = v_y))
        AND NOT EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_deact, v_plain))) THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_merge_attributes')) IS DISTINCT FROM v_refused + 3 THEN
      RAISE EXCEPTION 'F1-4a part 14 (b) proof: door_refusals did not meter the 3 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_merge_attributes');
    v_answer := public.admin_merge_attributes(v_dep, ARRAY[v_sel]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'mergeAcrossDependency:' || v_tag || '-dep' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: (c) a merge across a dependency answered %', v_answer;
    END IF;
    v_answer := public.admin_merge_attributes(gen_random_uuid(), ARRAY[]::uuid[]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownAttribute' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: (c) a merge into an unknown definition answered %', v_answer;
    END IF;
    v_answer := public.admin_merge_attributes(v_x, ARRAY[]::uuid[]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'mergeNoSources' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: (c) a merge with no sources answered %', v_answer;
    END IF;
    v_answer := public.admin_merge_attributes(v_x, ARRAY[v_x]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'mergeTargetInSources' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: (c) a merge of a definition into itself answered %', v_answer;
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND id = v_sel) AND EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND id = v_dep AND depends_on = v_sel)) THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: (c) a refused merge removed a definition';
    END IF;
    v_answer := public.admin_merge_attributes(v_x, ARRAY[v_y]);
    IF NOT (v_answer ? 'moved' AND v_answer ? 'folded' AND v_answer ? 'removed' AND NOT v_answer ? 'code') THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: (c) the merge did not answer its counts';
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND id = v_y) AND NOT EXISTS (SELECT 1 FROM public.category_attribute_links WHERE id = v_ly)) THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: (c) the merged definition is still there';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.merge')) <> 1 THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: the staff successes wrote % audit lines (expected 1)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.merge'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 5 THEN
      RAISE EXCEPTION 'F1-4a part 14 proof: the dial staff_config counted % for (c) the staff writer (expected %)', v_count, 5;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_merge_attributes')) IS DISTINCT FROM v_refused + 4 THEN
      RAISE EXCEPTION 'F1-4a part 14 (c) proof: door_refusals did not meter the 4 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a14-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a14-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115041300') ON CONFLICT DO NOTHING;
