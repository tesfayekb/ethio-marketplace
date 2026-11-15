-- e2e-areas: admin-attributes

-- Foundations 1, turn F1-4a, part 11 of 19 — THE ATTRIBUTE LINK DOOR ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_link_attribute is redeclared WHOLE from its last declaration
-- (live md5 checked). Its gate becomes ONE door_context('staff', categories:update, staff_config, global) and the
-- shell; console keys become door_refuse codes (unknownCategory, unknownAttribute, alreadyLinked,
-- priceBasisDuplicate) and attr_link_cells_refusal's answers a literal CASE
-- (badAllowedOption, badDefault, badVisibleWhen with their tails; its not-found → unknownAttribute). uuid → {ok:true, id}:
-- DROP + CREATE, grants restated. Proofs on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_link_attribute(uuid,uuid,boolean,boolean,integer,text[],jsonb,jsonb)', '83b40e3ba442a448e502892a44d4c64a']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115040900') THEN
    RAISE EXCEPTION 'F1-4a part 11: part 10 (ab599ee3) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 11: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 11: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_link_attribute (whole from 20261029013346 :16; uuid → jsonb, the gate on door_context, the codes and the shell)
DROP FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb);
CREATE FUNCTION public.admin_link_attribute(p_category_id uuid, p_attribute_id uuid, p_is_required boolean, p_is_filterable boolean, p_display_order integer, p_allowed_options text[] DEFAULT NULL::text[], p_default_value jsonb DEFAULT NULL::jsonb, p_visible_when jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_id uuid;
  v_refusal text;
  v_akey text;
  v_basis text;
BEGIN
  PERFORM public.door_context('staff', 'categories', 'update', 'staff_config', NULL, 'global');

  IF NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_category_id) THEN
    PERFORM public.door_refuse('unknownCategory');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.attributes a WHERE a.id = p_attribute_id) THEN
    PERFORM public.door_refuse('unknownAttribute');
  END IF;
  IF EXISTS (SELECT 1 FROM public.category_attribute_links l
              WHERE l.category_id = p_category_id AND l.attribute_id = p_attribute_id) THEN
    PERFORM public.door_refuse('alreadyLinked');
  END IF;

  -- M-MAINT-3 — the three cells are judged BEFORE anything is written (F5).
  v_refusal := public.attr_link_cells_refusal(
    p_category_id, p_attribute_id, p_allowed_options, p_default_value, p_visible_when);
  IF v_refusal IS NOT NULL THEN
    CASE split_part(v_refusal, ':', 1)
      WHEN 'badAllowedOption' THEN PERFORM public.door_refuse('badAllowedOption', substr(v_refusal, strpos(v_refusal, ':') + 1));
      WHEN 'badDefault' THEN PERFORM public.door_refuse('badDefault', substr(v_refusal, strpos(v_refusal, ':') + 1));
      WHEN 'badVisibleWhen' THEN PERFORM public.door_refuse('badVisibleWhen', substr(v_refusal, strpos(v_refusal, ':') + 1));
      WHEN 'admin.attributes.error.notFound' THEN PERFORM public.door_refuse('unknownAttribute');
      ELSE RAISE EXCEPTION 'attr_link_cells_refusal: unmapped answer %', v_refusal;
    END CASE;
  END IF;

  -- DEC-079 — one price basis per category lineage (F5: judged before writing).
  SELECT a.attr_key INTO v_akey FROM public.attributes a WHERE a.id = p_attribute_id;
  IF v_akey ~ '^(pricing_type|unit_of_sale)(-|$)' THEN
    v_basis := public.price_basis_conflict(p_category_id, v_akey, '[]'::jsonb);
    IF v_basis IS NOT NULL THEN
      PERFORM public.door_refuse('priceBasisDuplicate', v_basis);
    END IF;
  END IF;

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, display_order,
     allowed_options, default_value, visible_when)
  VALUES (p_category_id, p_attribute_id,
          COALESCE(p_is_required, false), COALESCE(p_is_filterable, true),
          COALESCE(p_display_order,
                   (SELECT COALESCE(max(l.display_order) + 1, 0)
                      FROM public.category_attribute_links l
                     WHERE l.category_id = p_category_id)),
          p_allowed_options,
          CASE WHEN p_default_value IS NULL OR jsonb_typeof(p_default_value) = 'null'
               THEN NULL ELSE p_default_value END,
          CASE WHEN p_visible_when IS NULL OR jsonb_typeof(p_visible_when) = 'null'
               THEN NULL ELSE p_visible_when END)
  RETURNING id INTO v_id;

  PERFORM public.log_audit('attribute.link', 'category_attribute_links', v_id::text,
    jsonb_build_object('category_id', p_category_id, 'attribute_id', p_attribute_id,
      'new', (SELECT jsonb_build_object(
                       'is_required', l.is_required, 'is_filterable', l.is_filterable,
                       'allowed_options', l.allowed_options,
                       'default_value', l.default_value,
                       'visible_when', l.visible_when)
                FROM public.category_attribute_links l WHERE l.id = v_id)));
  RETURN jsonb_build_object('ok', true, 'id', v_id);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_link_attribute', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb) IS
  'F1-4a on the door shell (DEC-333): links a definition to a category behind door_context(staff, categories:update, staff_config, global); refuses unknownCategory / unknownAttribute / alreadyLinked / badAllowedOption / badDefault / badVisibleWhen / priceBasisDuplicate; audits attribute.link; answers {ok:true, id}.';
REVOKE ALL ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_link_attribute(uuid, uuid, boolean, boolean, integer, text[], jsonb, jsonb) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: the door VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the service
--     role where it had it), never anon or PUBLIC; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and
--     notSignedIn for no caller (401), none spending staff_config, writing or auditing;
-- (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row
--     and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
--     priceBasisDuplicate needs a price-basis lineage and is not driven here.
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
  v_tag := 'e2e-mig-f14a11-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_link_attribute(uuid,uuid,boolean,boolean,integer,text[],jsonb,jsonb)', '8a4467a63fbba32766e9fb851e589ae7']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 11 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 11 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 11 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 11 proof: the scratch tree''s home pointers differ';
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
    DELETE FROM public.category_attribute_links WHERE id IN (v_ly, v_lsel, v_ldep);
    UPDATE public.attributes SET depends_on = NULL WHERE attr_key LIKE 'e2e-mig-%' AND id = v_dep;

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_link_attribute');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_link_attribute(v_root, v_sel, false, false, 0);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_link_attribute(v_root, v_sel, false, false, 0);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: (b) a caller without the permission (admin_link_attribute) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_link_attribute(v_root, v_sel, false, false, 0);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: the dial staff_config counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: the dial staff_config counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT ((NOT EXISTS (SELECT 1 FROM public.category_attribute_links WHERE category_id = v_root AND attribute_id IN (v_sel, v_y)))
        AND NOT EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_deact, v_plain))) THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_link_attribute')) IS DISTINCT FROM v_refused + 3 THEN
      RAISE EXCEPTION 'F1-4a part 11 (b) proof: door_refusals did not meter the 3 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_link_attribute');
    v_answer := public.admin_link_attribute(gen_random_uuid(), v_sel, false, false, 0);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCategory' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: (c) a link to an unknown category answered %', v_answer;
    END IF;
    v_answer := public.admin_link_attribute(v_root, gen_random_uuid(), false, false, 0);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownAttribute' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: (c) a link of an unknown definition answered %', v_answer;
    END IF;
    v_answer := public.admin_link_attribute(v_root, v_x, false, false, 0);
    IF v_answer ->> 'message' IS DISTINCT FROM 'alreadyLinked' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: (c) a second link answered %', v_answer;
    END IF;
    v_answer := public.admin_link_attribute(v_root, v_y, false, false, 0, ARRAY['a']);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badAllowedOption:typeNotSelect' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: (c) allowed options on a text definition answered %', v_answer;
    END IF;
    v_answer := public.admin_link_attribute(v_root, v_y, false, false, 0, NULL, '5'::jsonb);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badDefault:notText' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: (c) a number default on a text definition answered %', v_answer;
    END IF;
    v_answer := public.admin_link_attribute(v_root, v_y, false, false, 0, NULL, NULL, '"x"'::jsonb);
    IF v_answer ->> 'message' IS DISTINCT FROM 'badVisibleWhen:badShape' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: (c) a visibility rule of the wrong shape answered %', v_answer;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.category_attribute_links WHERE category_id = v_root AND attribute_id = v_y)) THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: (c) a refused call wrote a link';
    END IF;
    v_answer := public.admin_link_attribute(v_root, v_sel, false, false, 1);
    IF v_answer ->> 'ok' IS DISTINCT FROM 'true' OR v_answer ->> 'id' IS DISTINCT FROM (SELECT id FROM public.category_attribute_links WHERE category_id = v_root AND attribute_id = v_sel)::text THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: (c) link answered %', v_answer;
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.link')) <> 1 THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: the staff successes wrote % audit lines (expected 1)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.link'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 7 THEN
      RAISE EXCEPTION 'F1-4a part 11 proof: the dial staff_config counted % for (c) the staff writer (expected %)', v_count, 7;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_link_attribute')) IS DISTINCT FROM v_refused + 6 THEN
      RAISE EXCEPTION 'F1-4a part 11 (c) proof: door_refusals did not meter the 6 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a11-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a11-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115041000') ON CONFLICT DO NOTHING;
