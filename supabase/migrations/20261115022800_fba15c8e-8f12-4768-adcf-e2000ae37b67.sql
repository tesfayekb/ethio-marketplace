-- e2e-areas: admin-attributes

-- Foundations 1, turn F1-4a, part 15 of 19 — THE ATTRIBUTE CARD, FACT AND ORDER DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_set_card_attributes,
-- admin_set_fact_attributes and admin_set_attribute_link_order are redeclared WHOLE from their last
-- declarations (live md5 checked). Each gate becomes ONE door_context('staff', categories:<its action>, staff_config,
-- global) and the shell; refusal sentences and console keys become door_refuse codes (cardLimit, unknownLink, rankInherited — its
-- DETAIL moved into the code's tail —, factLimit, orderMismatch). void → {ok:true}: DROP + CREATE, grants
-- restated. Proofs on
-- scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_set_card_attributes(uuid,uuid[])', 'dd7d93387dc5e164c3dc50bda49ce72f'],
    ['public.admin_set_fact_attributes(uuid,uuid[])', '6827b7f59779ebe51ee63586df13cb85'],
    ['public.admin_set_attribute_link_order(uuid,uuid[])', '14a9c380dd85900b9c36994812433ae8']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115041300') THEN
    RAISE EXCEPTION 'F1-4a part 15: part 14 (a289cdfa) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 15: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 15: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_set_card_attributes (whole from 20260911223202 :842; void → jsonb, the gate on door_context, the codes and the shell)
DROP FUNCTION public.admin_set_card_attributes(uuid, uuid[]);
CREATE FUNCTION public.admin_set_card_attributes(
  p_category_id uuid, p_ordered_attribute_ids uuid[]
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ids uuid[];
  v_old jsonb;
  v_i int;
  v_akey text;
  v_conflict text;
BEGIN
  PERFORM public.door_context('staff', 'categories', 'update', 'staff_config', NULL, 'global');

  v_ids := COALESCE(p_ordered_attribute_ids, '{}');

  IF array_length(v_ids, 1) > 3 THEN
    PERFORM public.door_refuse('cardLimit');
  END IF;

  IF EXISTS (
    SELECT 1 FROM unnest(v_ids) AS aid
     WHERE NOT EXISTS (SELECT 1 FROM public.category_attribute_links l
                        WHERE l.category_id = p_category_id AND l.attribute_id = aid)
  ) THEN
    PERFORM public.door_refuse('unknownLink');
  END IF;

  -- DEC-050 L2a — a requested rank that an INHERITED card already occupies is
  -- refused, naming both origins.
  FOR v_i IN 1 .. COALESCE(array_length(v_ids, 1), 0) LOOP
    SELECT a.attr_key INTO v_akey FROM public.attributes a WHERE a.id = v_ids[v_i];
    v_conflict := public.attr_rank_conflict(p_category_id, v_i, v_akey, '[]'::jsonb);
    IF v_conflict IS NOT NULL THEN
      PERFORM public.door_refuse('rankInherited',
        format('category=%s rank=%s attribute=%s inherited_from=%s inherited_attribute=%s',
               p_category_id::text, v_i, COALESCE(v_akey, ''),
               split_part(v_conflict, '|', 1), split_part(v_conflict, '|', 2)));
    END IF;
  END LOOP;

  SELECT COALESCE(jsonb_agg(jsonb_build_object('attribute_id', l.attribute_id, 'card_rank', l.card_rank)
                            ORDER BY l.card_rank), '[]'::jsonb)
    INTO v_old
    FROM public.category_attribute_links l
   WHERE l.category_id = p_category_id AND l.card_rank IS NOT NULL;

  UPDATE public.category_attribute_links
     SET card_rank = NULL, updated_at = now()
   WHERE category_id = p_category_id AND card_rank IS NOT NULL;

  UPDATE public.category_attribute_links l
     SET card_rank = u.ord, updated_at = now()
    FROM unnest(v_ids) WITH ORDINALITY AS u(aid, ord)
   WHERE l.category_id = p_category_id AND l.attribute_id = u.aid;

  PERFORM public.log_audit('attribute.set_card', 'categories', p_category_id::text,
    jsonb_build_object('old', v_old, 'new', to_jsonb(v_ids)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_card_attributes', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_set_card_attributes(uuid, uuid[]) IS
  'F1-4a on the door shell (DEC-333): sets a category''s card definitions behind door_context(staff, categories:update, staff_config, global); refuses cardLimit / unknownLink / rankInherited; audits attribute.set_card; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_card_attributes(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_card_attributes(uuid, uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_card_attributes(uuid, uuid[]) TO service_role;

-- ------------------------------------------------------------ 2. admin_set_fact_attributes (whole from 20261017091410 :277; void → jsonb, the gate on door_context, the codes and the shell)
DROP FUNCTION public.admin_set_fact_attributes(uuid, uuid[]);
CREATE FUNCTION public.admin_set_fact_attributes(
  p_category_id uuid, p_ordered_attribute_ids uuid[]
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ids uuid[];
  v_old jsonb;
BEGIN
  PERFORM public.door_context('staff', 'categories', 'update', 'staff_config', NULL, 'global');

  v_ids := COALESCE(p_ordered_attribute_ids, '{}');

  IF array_length(v_ids, 1) > 4 THEN
    PERFORM public.door_refuse('factLimit');
  END IF;

  IF EXISTS (
    SELECT 1 FROM unnest(v_ids) AS aid
     WHERE NOT EXISTS (SELECT 1 FROM public.category_attribute_links l
                        WHERE l.category_id = p_category_id AND l.attribute_id = aid)
  ) THEN
    PERFORM public.door_refuse('unknownLink');
  END IF;

  SELECT COALESCE(jsonb_agg(jsonb_build_object('attribute_id', l.attribute_id, 'fact_rank', l.fact_rank)
                            ORDER BY l.fact_rank), '[]'::jsonb)
    INTO v_old
    FROM public.category_attribute_links l
   WHERE l.category_id = p_category_id AND l.fact_rank IS NOT NULL;

  UPDATE public.category_attribute_links
     SET fact_rank = NULL, updated_at = now()
   WHERE category_id = p_category_id AND fact_rank IS NOT NULL;

  UPDATE public.category_attribute_links l
     SET fact_rank = u.ord::smallint, updated_at = now()
    FROM unnest(v_ids) WITH ORDINALITY AS u(aid, ord)
   WHERE l.category_id = p_category_id AND l.attribute_id = u.aid;

  PERFORM public.log_audit('attribute.set_facts', 'categories', p_category_id::text,
    jsonb_build_object('old', v_old, 'new', to_jsonb(v_ids)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_fact_attributes', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_set_fact_attributes(uuid, uuid[]) IS
  'F1-4a on the door shell (DEC-333): sets a category''s fact definitions behind door_context(staff, categories:update, staff_config, global); refuses factLimit / unknownLink; audits attribute.set_facts; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_fact_attributes(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_fact_attributes(uuid, uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_fact_attributes(uuid, uuid[]) TO service_role;

-- ------------------------------------------------------------ 3. admin_set_attribute_link_order (whole from 20260906043646 :7; void → jsonb, the gate on door_context, the codes and the shell)
DROP FUNCTION public.admin_set_attribute_link_order(uuid, uuid[]);
CREATE FUNCTION public.admin_set_attribute_link_order(
  p_category_id uuid, p_ordered_link_ids uuid[]
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_ids uuid[]; v_have integer; v_want integer; v_old jsonb;
BEGIN
  PERFORM public.door_context('staff', 'categories', 'update', 'staff_config', NULL, 'global');

  v_ids := COALESCE(p_ordered_link_ids, '{}');

  -- TOTALITY (E6): the list must be the category's WHOLE link set, exactly once.
  SELECT count(*)::int INTO v_have
    FROM public.category_attribute_links l WHERE l.category_id = p_category_id;
  SELECT count(DISTINCT u)::int INTO v_want FROM unnest(v_ids) u;
  IF v_have <> v_want OR EXISTS (
    SELECT 1 FROM unnest(v_ids) AS lid
     WHERE NOT EXISTS (SELECT 1 FROM public.category_attribute_links l
                        WHERE l.id = lid AND l.category_id = p_category_id)
  ) THEN
    PERFORM public.door_refuse('orderMismatch');
  END IF;

  SELECT COALESCE(jsonb_agg(l.id ORDER BY l.display_order, l.id), '[]'::jsonb)
    INTO v_old
    FROM public.category_attribute_links l WHERE l.category_id = p_category_id;

  UPDATE public.category_attribute_links l
     SET display_order = u.ord - 1, updated_at = now()
    FROM unnest(v_ids) WITH ORDINALITY AS u(lid, ord)
   WHERE l.id = u.lid AND l.category_id = p_category_id;

  PERFORM public.log_audit('attribute.reorder', 'categories', p_category_id::text,
    jsonb_build_object('old', v_old, 'new', to_jsonb(v_ids)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_attribute_link_order', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.admin_set_attribute_link_order(uuid, uuid[]) IS
  'F1-4a on the door shell (DEC-333): orders a category''s links behind door_context(staff, categories:update, staff_config, global); refuses orderMismatch; audits attribute.reorder; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_attribute_link_order(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_attribute_link_order(uuid, uuid[]) TO authenticated;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) catalog facts: the 3 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated (and the
--     service role where it had it), never anon or PUBLIC; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and
--     notSignedIn for no caller (401), none spending staff_config, writing or auditing;
-- (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row
--     and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
--     rankInherited needs an inherited card and is not driven here.
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
  v_tag := 'e2e-mig-f14a15-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_set_attribute_link_order(uuid,uuid[])', 'f7e7095824e65cd24aaf2169ac8ea5b2']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 15 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 15 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.admin_set_card_attributes(uuid,uuid[])', 'dcc278902ea4baf4590be0b779d10dc5'],
    ['public.admin_set_fact_attributes(uuid,uuid[])', '46f25c6b3a42f13e796c001b1d8f6000']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 15 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 15 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 15 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 15 proof: the scratch tree''s home pointers differ';
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
       AND door IN ('admin_set_card_attributes', 'admin_set_fact_attributes', 'admin_set_attribute_link_order');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_set_card_attributes(v_root, ARRAY[v_x]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_set_card_attributes(v_root, ARRAY[v_x]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (b) a caller without the permission (admin_set_card_attributes) answered %', v_answer;
    END IF;
    v_answer := public.admin_set_fact_attributes(v_root, ARRAY[v_x]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (b) a caller without the permission (admin_set_fact_attributes) answered %', v_answer;
    END IF;
    v_answer := public.admin_set_attribute_link_order(v_root, ARRAY[v_ldep, v_lsel, v_ly, v_lx]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (b) a caller without the permission (admin_set_attribute_link_order) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_set_card_attributes(v_root, ARRAY[v_x]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: the dial staff_config counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: the dial staff_config counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT (((SELECT card_rank FROM public.category_attribute_links WHERE id = v_lx) IS NULL)
        AND ((SELECT fact_rank FROM public.category_attribute_links WHERE id = v_lx) IS NULL)
        AND ((SELECT display_order FROM public.category_attribute_links WHERE id = v_lx) = 0)
        AND NOT EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_deact, v_plain))) THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_set_card_attributes', 'admin_set_fact_attributes', 'admin_set_attribute_link_order')) IS DISTINCT FROM v_refused + 5 THEN
      RAISE EXCEPTION 'F1-4a part 15 (b) proof: door_refusals did not meter the 5 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_set_card_attributes', 'admin_set_fact_attributes', 'admin_set_attribute_link_order');
    v_answer := public.admin_set_card_attributes(v_root, ARRAY[v_x, v_sel, v_dep, v_z]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'cardLimit' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) four card definitions answered %', v_answer;
    END IF;
    v_answer := public.admin_set_card_attributes(v_root, ARRAY[gen_random_uuid()]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownLink' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) a card of an unlinked definition answered %', v_answer;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.category_attribute_links WHERE category_id = v_root AND card_rank IS NOT NULL)) THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) a refused card wrote a rank';
    END IF;
    v_answer := public.admin_set_card_attributes(v_root, ARRAY[v_x]);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) card did not answer ok';
    END IF;
    IF NOT ((SELECT card_rank FROM public.category_attribute_links WHERE id = v_lx) = 1) THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) the card rank differs';
    END IF;
    v_answer := public.admin_set_fact_attributes(v_root, ARRAY[v_x, v_sel, v_dep, v_z, v_y]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'factLimit' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) five fact definitions answered %', v_answer;
    END IF;
    v_answer := public.admin_set_fact_attributes(v_root, ARRAY[gen_random_uuid()]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownLink' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) a fact of an unlinked definition answered %', v_answer;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.category_attribute_links WHERE category_id = v_root AND fact_rank IS NOT NULL)) THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) a refused fact wrote a rank';
    END IF;
    v_answer := public.admin_set_fact_attributes(v_root, ARRAY[v_x]);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) facts did not answer ok';
    END IF;
    IF NOT ((SELECT fact_rank FROM public.category_attribute_links WHERE id = v_lx) = 1) THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) the fact rank differs';
    END IF;
    v_answer := public.admin_set_attribute_link_order(v_root, ARRAY[v_lx]);
    IF v_answer ->> 'message' IS DISTINCT FROM 'orderMismatch' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) an order that is not the whole set answered %', v_answer;
    END IF;
    IF NOT ((SELECT display_order FROM public.category_attribute_links WHERE id = v_lx) = 0) THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) a refused order moved a link';
    END IF;
    v_answer := public.admin_set_attribute_link_order(v_root, ARRAY[v_lsel, v_lx, v_ly, v_ldep]);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) link order did not answer ok';
    END IF;
    IF NOT ((SELECT display_order FROM public.category_attribute_links WHERE id = v_lsel) = 0 AND (SELECT display_order FROM public.category_attribute_links WHERE id = v_lx) = 1) THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: (c) the link order differs';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.set_card', 'attribute.set_facts', 'attribute.reorder')) <> 3 THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: the staff successes wrote % audit lines (expected 3)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.set_card', 'attribute.set_facts', 'attribute.reorder'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 8 THEN
      RAISE EXCEPTION 'F1-4a part 15 proof: the dial staff_config counted % for (c) the staff writer (expected %)', v_count, 8;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_set_card_attributes', 'admin_set_fact_attributes', 'admin_set_attribute_link_order')) IS DISTINCT FROM v_refused + 5 THEN
      RAISE EXCEPTION 'F1-4a part 15 (c) proof: door_refusals did not meter the 5 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a15-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a15-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115041400') ON CONFLICT DO NOTHING;
