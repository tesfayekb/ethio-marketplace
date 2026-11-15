-- e2e-areas: admin-attributes

-- Foundations 1, turn F1-4a, part 12 of 19 — THE ATTRIBUTE LINK EDIT DOOR ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_update_attribute_link is redeclared WHOLE from its last declaration
-- (live md5 checked). Its gate becomes ONE door_context('staff', categories:update, staff_config, global) and the
-- shell; console keys become door_refuse codes (unknownLink, badClearCell) and attr_link_cells_refusal's answers a literal CASE
-- (badAllowedOption, badDefault, badVisibleWhen with their tails; its not-found → unknownAttribute). void → {ok:true}:
-- DROP + CREATE, grants restated. Proofs on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_update_attribute_link(uuid,boolean,boolean,text[],jsonb,jsonb,text[])', 'a3e39bb834e0fe7053c3711f84f8d0bf']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115041000') THEN
    RAISE EXCEPTION 'F1-4a part 12: part 11 (e0eb5617) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 12: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 12: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_update_attribute_link (whole from 20260919134523 :702; void → jsonb, the gate on door_context, the codes and the shell)
DROP FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean, text[], jsonb, jsonb, text[]);
CREATE FUNCTION public.admin_update_attribute_link(
  p_link_id uuid,
  p_is_required boolean DEFAULT NULL,
  p_is_filterable boolean DEFAULT NULL,
  p_allowed_options text[] DEFAULT NULL,
  p_default_value jsonb DEFAULT NULL,
  p_visible_when jsonb DEFAULT NULL,
  p_clear_cells text[] DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_old public.category_attribute_links%ROWTYPE;
  v_new public.category_attribute_links%ROWTYPE;
  v_clear text[] := COALESCE(p_clear_cells, ARRAY[]::text[]);
  v_alw text[];
  v_dflt jsonb;
  v_vw jsonb;
  v_refusal text;
  v_seg text;
BEGIN
  PERFORM public.door_context('staff', 'categories', 'update', 'staff_config', NULL, 'global');

  FOREACH v_seg IN ARRAY v_clear
  LOOP
    IF v_seg NOT IN ('allowed_options','default_value','visible_when') THEN
      PERFORM public.door_refuse('badClearCell', v_seg);
    END IF;
  END LOOP;

  SELECT * INTO v_old FROM public.category_attribute_links l WHERE l.id = p_link_id;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('unknownLink');
  END IF;

  -- The TARGET state of each cell: cleared, supplied, or unchanged.
  v_alw := CASE WHEN 'allowed_options' = ANY (v_clear) THEN NULL
                WHEN p_allowed_options IS NOT NULL THEN p_allowed_options
                ELSE v_old.allowed_options END;
  v_dflt := CASE WHEN 'default_value' = ANY (v_clear) THEN NULL
                 WHEN p_default_value IS NOT NULL AND jsonb_typeof(p_default_value) <> 'null'
                   THEN p_default_value
                 ELSE v_old.default_value END;
  v_vw := CASE WHEN 'visible_when' = ANY (v_clear) THEN NULL
               WHEN p_visible_when IS NOT NULL AND jsonb_typeof(p_visible_when) <> 'null'
                 THEN p_visible_when
               ELSE v_old.visible_when END;

  v_refusal := public.attr_link_cells_refusal(
    v_old.category_id, v_old.attribute_id, v_alw, v_dflt, v_vw);
  IF v_refusal IS NOT NULL THEN
    CASE split_part(v_refusal, ':', 1)
      WHEN 'badAllowedOption' THEN PERFORM public.door_refuse('badAllowedOption', substr(v_refusal, strpos(v_refusal, ':') + 1));
      WHEN 'badDefault' THEN PERFORM public.door_refuse('badDefault', substr(v_refusal, strpos(v_refusal, ':') + 1));
      WHEN 'badVisibleWhen' THEN PERFORM public.door_refuse('badVisibleWhen', substr(v_refusal, strpos(v_refusal, ':') + 1));
      WHEN 'admin.attributes.error.notFound' THEN PERFORM public.door_refuse('unknownAttribute');
      ELSE RAISE EXCEPTION 'attr_link_cells_refusal: unmapped answer %', v_refusal;
    END CASE;
  END IF;

  UPDATE public.category_attribute_links l
     SET is_required     = COALESCE(p_is_required, l.is_required),
         is_filterable   = COALESCE(p_is_filterable, l.is_filterable),
         allowed_options = v_alw,
         default_value   = v_dflt,
         visible_when    = v_vw,
         updated_at      = now()
   WHERE l.id = p_link_id;

  SELECT * INTO v_new FROM public.category_attribute_links l WHERE l.id = p_link_id;

  PERFORM public.log_audit('attribute.link_update', 'category_attribute_links', p_link_id::text,
    jsonb_build_object(
      'category_id', v_old.category_id,
      'attribute_id', v_old.attribute_id,
      'old', jsonb_build_object('is_required', v_old.is_required,
                                'is_filterable', v_old.is_filterable,
                                'allowed_options', v_old.allowed_options,
                                'default_value', v_old.default_value,
                                'visible_when', v_old.visible_when),
      'new', jsonb_build_object('is_required', v_new.is_required,
                                'is_filterable', v_new.is_filterable,
                                'allowed_options', v_new.allowed_options,
                                'default_value', v_new.default_value,
                                'visible_when', v_new.visible_when)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_update_attribute_link', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean, text[], jsonb, jsonb, text[]) IS
  'F1-4a on the door shell (DEC-333): edits one category link behind door_context(staff, categories:update, staff_config, global); refuses badClearCell / unknownLink / badAllowedOption / badDefault / badVisibleWhen / unknownAttribute; audits attribute.link_update; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean, text[], jsonb, jsonb, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean, text[], jsonb, jsonb, text[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean, text[], jsonb, jsonb, text[]) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: the door VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service
--     role where it had it), never anon or PUBLIC; every body this file's (md5).
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
  v_tag := 'e2e-mig-f14a12-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_update_attribute_link(uuid,boolean,boolean,text[],jsonb,jsonb,text[])', '4fe573538124229cd3e1e6685e94fe24']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 12 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 12 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 12 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 12 proof: the scratch tree''s home pointers differ';
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
       AND door IN ('admin_update_attribute_link');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_update_attribute_link(v_lx, true, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_update_attribute_link(v_lx, true, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: (b) a caller without the permission (admin_update_attribute_link) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_update_attribute_link(v_lx, true, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: the dial staff_config counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: the dial staff_config counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT ((NOT (SELECT is_required FROM public.category_attribute_links WHERE id = v_lx))
        AND NOT EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_deact, v_plain))) THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_update_attribute_link')) IS DISTINCT FROM v_refused + 3 THEN
      RAISE EXCEPTION 'F1-4a part 12 (b) proof: door_refusals did not meter the 3 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_update_attribute_link');
    v_answer := public.admin_update_attribute_link(v_lx, NULL, NULL, NULL, NULL, NULL, ARRAY['nope']);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badClearCell:nope' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: (c) an unknown cell to clear answered %', v_answer;
    END IF;
    v_answer := public.admin_update_attribute_link(gen_random_uuid(), true, NULL, NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownLink' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: (c) an update of an unknown link answered %', v_answer;
    END IF;
    v_answer := public.admin_update_attribute_link(v_lx, NULL, NULL, NULL, '5'::jsonb, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badDefault:notText' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: (c) an update with a number default on a text definition answered %', v_answer;
    END IF;
    IF NOT ((SELECT default_value FROM public.category_attribute_links WHERE id = v_lx) IS NULL) THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: (c) a refused update wrote a cell';
    END IF;
    v_answer := public.admin_update_attribute_link(v_lx, true, NULL, NULL, NULL, NULL, NULL);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: (c) update link did not answer ok';
    END IF;
    IF NOT ((SELECT is_required FROM public.category_attribute_links WHERE id = v_lx)) THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: (c) the updated link differs';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.link_update')) <> 1 THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: the staff successes wrote % audit lines (expected 1)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.link_update'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 12 proof: the dial staff_config counted % for (c) the staff writer (expected %)', v_count, 4;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_update_attribute_link')) IS DISTINCT FROM v_refused + 3 THEN
      RAISE EXCEPTION 'F1-4a part 12 (c) proof: door_refusals did not meter the 3 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a12-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a12-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115041100') ON CONFLICT DO NOTHING;
