-- e2e-areas: admin-attributes

-- Foundations 1, turn F1-4a, part 10 of 19 — THE ATTRIBUTE UPSERT ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_upsert_attribute is redeclared WHOLE
-- from its last declaration (20261029013346 :93; live md5 checked). Its gate becomes ONE door_context('staff',
-- categories:update, staff_config, global) and the shell; its console keys become door_refuse codes with their
-- details (required:attr_key, duplicateKey, unknownAttribute, dependsUnknown, dependsNotSelect, dependsSelf,
-- dependsCycle, parentWithoutDepends, parentNotInParent, badCell, badOption, boundsTargetNotNumber,
-- boundsTargetNotColinked) and attr_allowed_check's four reasons a literal CASE (allowedTargetCircular,
-- allowedTargetNotSelect, allowedTargetNotColinked, allowedUnknownValue). uuid → jsonb {ok:true, id}: DROP + CREATE,
-- grants restated. Proofs on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_upsert_attribute(uuid,text,text,text,jsonb,text,text,text,text,text,text,smallint,text,text,integer,text)', '0a8ecf076448436e9e8e713a74fe44ec']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115040800') THEN
    RAISE EXCEPTION 'F1-4a part 10: part 9 (1ca5f456) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 10: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 10: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_upsert_attribute (whole from 20261029013346 :93; uuid → jsonb, the gate on door_context, the codes and the shell)
DROP FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text);
CREATE FUNCTION public.admin_upsert_attribute(p_id uuid, p_attr_key text, p_name_en text, p_attr_type text, p_options jsonb, p_help_text_en text, p_depends_on text DEFAULT NULL::text, p_unit text DEFAULT NULL::text, p_unit_am text DEFAULT NULL::text, p_min_bound text DEFAULT NULL::text, p_max_bound text DEFAULT NULL::text, p_decimals smallint DEFAULT NULL::smallint, p_format text DEFAULT NULL::text, p_preset text DEFAULT NULL::text, p_max_length integer DEFAULT NULL::integer, p_help_text_am text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_id uuid; v_old jsonb; v_dep uuid; v_dep_key text; v_dep_type text;
  v_vals text[]; v_parent text; v_entry jsonb;
  v_cellmsg text; v_optmsg text; v_tkey text; v_ttype text;
  v_ocats uuid[]; v_tcats uuid[]; v_allowed jsonb;
  -- INC-200 — the EFFECTIVE cells: what the row will actually carry once a
  -- type change has cleared what no longer applies.
  v_stored_type text; v_newtype text;
  v_e_unit text; v_e_min text; v_e_max text; v_e_dec smallint; v_e_fmt text;
  v_e_pset text; v_e_maxlen integer; v_e_opts jsonb;
  -- M8c / C5 — unit_am: NULL keeps the stored value (a caller that does not
  -- send it never drops it, INC-188); '' clears; a type change off number clears.
  v_e_unit_am text;
BEGIN
  PERFORM public.door_context('staff', 'categories', 'update', 'staff_config', NULL, 'global');

  IF p_attr_key IS NULL OR btrim(p_attr_key) = '' THEN
    PERFORM public.door_refuse('required', 'attr_key');
  END IF;

  IF EXISTS (SELECT 1 FROM public.attributes a
              WHERE a.attr_key = p_attr_key AND (p_id IS NULL OR a.id <> p_id)) THEN
    PERFORM public.door_refuse('duplicateKey');
  END IF;

  -- INC-200 — A TYPE CHANGE CLEARS THE CELLS THAT NO LONGER APPLY, whatever
  -- the caller passed: text cells (preset, max_length) off anything but text,
  -- number cells (unit, min, max, decimals, format) off anything but number,
  -- options off text/number/boolean. When the type is UNCHANGED, a NULL
  -- parameter keeps its old meaning exactly as before.
  v_e_unit   := p_unit;
  v_e_unit_am := NULLIF(btrim(p_unit_am), '');
  IF p_unit_am IS NULL AND p_id IS NOT NULL THEN
    SELECT a.unit_am INTO v_e_unit_am FROM public.attributes a WHERE a.id = p_id;
  END IF;
  v_e_min    := p_min_bound;
  v_e_max    := p_max_bound;
  v_e_dec    := p_decimals;
  v_e_fmt    := p_format;
  v_e_pset   := p_preset;
  v_e_maxlen := p_max_length;
  v_e_opts   := p_options;
  IF p_id IS NOT NULL THEN
    SELECT a.attr_type INTO v_stored_type FROM public.attributes a WHERE a.id = p_id;
    v_newtype := COALESCE(p_attr_type, v_stored_type);
    IF v_stored_type IS NOT NULL AND v_newtype IS DISTINCT FROM v_stored_type THEN
      IF v_newtype <> 'text' THEN
        v_e_pset := NULL;
        v_e_maxlen := NULL;
      END IF;
      IF v_newtype <> 'number' THEN
        v_e_unit := NULL;
        v_e_unit_am := NULL;
        v_e_min := NULL;
        v_e_max := NULL;
        v_e_dec := NULL;
        v_e_fmt := NULL;
      END IF;
      IF v_newtype IN ('text','number','boolean') THEN
        v_e_opts := NULL;
      END IF;
    END IF;
  END IF;

  -- DEC-045 — exactly one parent, single_select, no self, no cycle.
  v_dep_key := NULLIF(btrim(COALESCE(p_depends_on, '')), '');
  IF v_dep_key IS NOT NULL THEN
    SELECT a.id, a.attr_type INTO v_dep, v_dep_type
      FROM public.attributes a WHERE a.attr_key = v_dep_key;
    IF v_dep IS NULL THEN
      PERFORM public.door_refuse('dependsUnknown', v_dep_key);
    END IF;
    IF v_dep_type IS DISTINCT FROM 'single_select' THEN
      PERFORM public.door_refuse('dependsNotSelect', v_dep_key);
    END IF;
    IF p_id IS NOT NULL AND v_dep = p_id THEN
      PERFORM public.door_refuse('dependsSelf');
    END IF;
    IF public.attr_dep_cycle(p_id, v_dep) THEN
      PERFORM public.door_refuse('dependsCycle', v_dep_key);
    END IF;
    v_vals := public.attr_option_values(v_dep);
  END IF;

  -- Every `parent` names a value of the depended-on definition; a `parent`
  -- without a dependency is refused outright (never silently dropped).
  FOR v_entry IN
    SELECT value FROM jsonb_array_elements(public.attr_option_norm(v_e_opts))
  LOOP
    v_parent := NULLIF(btrim(COALESCE(v_entry->>'parent','')), '');
    CONTINUE WHEN v_parent IS NULL;
    IF v_dep IS NULL THEN
      PERFORM public.door_refuse('parentWithoutDepends', v_parent);
    END IF;
    IF NOT (v_parent = ANY (COALESCE(v_vals, ARRAY[]::text[]))) THEN
      PERFORM public.door_refuse('parentNotInParent', v_parent);
    END IF;
  END LOOP;

  -- DEC-050 — the definition v2 cells, judged by the shared judge.
  v_cellmsg := public.attr_cell_check(p_attr_type, v_e_unit, v_e_min, v_e_max,
                                      v_e_dec::int, v_e_fmt, v_e_pset, v_e_maxlen,
                                      p_help_text_en, p_help_text_am, v_e_unit_am);
  IF v_cellmsg IS NOT NULL THEN
    PERFORM public.door_refuse('badCell', v_cellmsg);
  END IF;

  -- DEC-050 — the strict option shape. An unknown key is a refusal, never a
  -- silent drop; the refusal names the definition, the option and the reason.
  v_optmsg := public.attr_option_shape(p_attr_key, v_e_opts);
  IF v_optmsg IS NOT NULL THEN
    PERFORM public.door_refuse('badOption', v_optmsg);
  END IF;

  -- DEC-050 — a bounds target is a NUMBER definition linked, directly or by
  -- inheritance, in AT LEAST ONE category where this definition is linked (LIVE links) — DEC-057b.
  v_ocats := public.attr_postplan_cats(p_attr_key, '[]'::jsonb);
  FOREACH v_tkey IN ARRAY public.attr_bounds_targets(v_e_opts)
  LOOP
    SELECT a.attr_type INTO v_ttype FROM public.attributes a WHERE a.attr_key = v_tkey;
    IF v_ttype IS DISTINCT FROM 'number' THEN
      PERFORM public.door_refuse('boundsTargetNotNumber', p_attr_key || '|' || v_tkey);
    END IF;
    v_tcats := public.attr_cats_expand(public.attr_postplan_cats(v_tkey, '[]'::jsonb));
    IF COALESCE(array_length(v_ocats, 1), 0) > 0 AND NOT EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE c = ANY (v_tcats)) THEN
      PERFORM public.door_refuse('boundsTargetNotColinked', p_attr_key || '|' || v_tkey);
    END IF;
  END LOOP;

  -- DEC-057 — option-conditioned allowed values, judged against LIVE links by
  -- the single rule. Refusals are named exactly as the bounds path names its own.
  v_allowed := public.attr_allowed_check(p_attr_key, v_e_opts, '[]'::jsonb);
  IF v_allowed IS NOT NULL THEN
    CASE v_allowed->>'reason'
      WHEN 'allowedTargetCircular' THEN PERFORM public.door_refuse('allowedTargetCircular', v_allowed->>'detail');
      WHEN 'allowedTargetNotSelect' THEN PERFORM public.door_refuse('allowedTargetNotSelect', v_allowed->>'detail');
      WHEN 'allowedTargetNotColinked' THEN PERFORM public.door_refuse('allowedTargetNotColinked', v_allowed->>'detail');
      WHEN 'allowedUnknownValue' THEN PERFORM public.door_refuse('allowedUnknownValue', v_allowed->>'detail');
      ELSE RAISE EXCEPTION 'attr_allowed_check: unmapped reason %', v_allowed->>'reason';
    END CASE;
  END IF;

  IF p_id IS NULL THEN
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en, depends_on,
                                   unit, min_bound, max_bound, decimals, format, preset,
                                   max_length, help_text_am, unit_am)
    VALUES (p_attr_key, p_name_en, p_attr_type, v_e_opts, p_help_text_en, v_dep,
            v_e_unit, v_e_min, v_e_max, v_e_dec, v_e_fmt, v_e_pset,
            v_e_maxlen, p_help_text_am, v_e_unit_am)
    RETURNING id INTO v_id;

    PERFORM public.log_audit('attribute.create', 'attributes', v_id::text,
      jsonb_build_object('attr_key', p_attr_key, 'attr_type', p_attr_type,
                         'depends_on', COALESCE(v_dep_key, ''),
                         'unit', v_e_unit, 'unit_am', v_e_unit_am, 'min_bound', v_e_min, 'max_bound', v_e_max,
                         'decimals', v_e_dec, 'format', v_e_fmt, 'preset', v_e_pset,
                         'max_length', v_e_maxlen, 'help_text_am', p_help_text_am));
  ELSE
    SELECT to_jsonb(a) INTO v_old FROM public.attributes a WHERE a.id = p_id;
    IF v_old IS NULL THEN
      PERFORM public.door_refuse('unknownAttribute');
    END IF;

    -- INC-200 — the type and every cell travel in ONE statement, so no
    -- inapplicable cell is ever briefly held against the new type.
    UPDATE public.attributes a
       SET attr_key     = p_attr_key,
           name_en      = COALESCE(p_name_en, a.name_en),
           attr_type    = COALESCE(p_attr_type, a.attr_type),
           options      = v_e_opts,
           help_text_en = p_help_text_en,
           depends_on   = v_dep,
           unit         = v_e_unit,
           unit_am      = v_e_unit_am,
           min_bound    = v_e_min,
           max_bound    = v_e_max,
           decimals     = v_e_dec,
           format       = v_e_fmt,
           preset       = v_e_pset,
           max_length   = v_e_maxlen,
           help_text_am = p_help_text_am,
           updated_at   = now()
     WHERE a.id = p_id;
    v_id := p_id;

    PERFORM public.log_audit('attribute.update', 'attributes', p_id::text,
      jsonb_build_object(
        'old', jsonb_build_object('attr_key', v_old->>'attr_key', 'name_en', v_old->>'name_en',
                                  'attr_type', v_old->>'attr_type', 'options', v_old->'options',
                                  'depends_on', v_old->>'depends_on',
                                  'unit', v_old->>'unit', 'unit_am', v_old->>'unit_am', 'min_bound', v_old->>'min_bound',
                                  'max_bound', v_old->>'max_bound', 'decimals', v_old->>'decimals',
                                  'format', v_old->>'format', 'preset', v_old->>'preset',
                                  'max_length', v_old->>'max_length',
                                  'help_text_en', v_old->>'help_text_en',
                                  'help_text_am', v_old->>'help_text_am'),
        'new', (SELECT jsonb_build_object('attr_key', a.attr_key, 'name_en', a.name_en,
                                          'attr_type', a.attr_type, 'options', a.options,
                                          'depends_on', a.depends_on,
                                          'unit', a.unit, 'unit_am', a.unit_am, 'min_bound', a.min_bound,
                                          'max_bound', a.max_bound, 'decimals', a.decimals,
                                          'format', a.format, 'preset', a.preset,
                                          'max_length', a.max_length,
                                          'help_text_en', a.help_text_en,
                                          'help_text_am', a.help_text_am)
                  FROM public.attributes a WHERE a.id = p_id)));
  END IF;

  RETURN jsonb_build_object('ok', true, 'id', v_id);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_upsert_attribute', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text) IS
  'F1-4a on the door shell (DEC-333): creates or edits one attribute definition behind door_context(staff, categories:update, staff_config, global); refuses with the codes of its body; audits attribute.create / attribute.update; answers {ok:true, id}.';
REVOKE ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, text, smallint, text, text, integer, text) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role, never
--     anon or PUBLIC; the body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied (403), notSignedIn (401), none spending staff_config or writing.
-- (c) each code, every earlier check cleared, the exact message (badOption by its code: its tail is the shape
--     judge's), a 400, nothing written; a create and an update answering {ok:true, id} with their rows and audit
--     lines; staff_config counted once per call past the gates; every refusal metered. dependsCycle,
--     parentNotInParent, the bounds targets and the allowed-value reasons need a dependency chain or co-linked
--     definitions and are not driven here; their mapping is literal in the body.
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
  v_tag := 'e2e-mig-f14a10-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_upsert_attribute(uuid,text,text,text,jsonb,text,text,text,text,text,text,smallint,text,text,integer,text)', 'f68771ae0d571d00d16da295af68877a']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 10 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 10 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 10 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 10 proof: the scratch tree''s home pointers differ';
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
       AND door IN ('admin_upsert_attribute');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_upsert_attribute(p_id => NULL, p_attr_key => v_tag || '-new', p_name_en => 'N', p_attr_type => 'text', p_options => NULL, p_help_text_en => NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_upsert_attribute(p_id => NULL, p_attr_key => v_tag || '-new', p_name_en => 'N', p_attr_type => 'text', p_options => NULL, p_help_text_en => NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (b) a caller without the permission (admin_upsert_attribute) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_upsert_attribute(p_id => NULL, p_attr_key => v_tag || '-new', p_name_en => 'N', p_attr_type => 'text', p_options => NULL, p_help_text_en => NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: the dial staff_config counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: the dial staff_config counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND attr_key = v_tag || '-new')) THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_upsert_attribute')) IS DISTINCT FROM v_refused + 3 THEN
      RAISE EXCEPTION 'F1-4a part 10 (b) proof: door_refusals did not meter the 3 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_upsert_attribute');
    v_answer := public.admin_upsert_attribute(p_id => NULL, p_attr_key => '', p_name_en => 'N', p_attr_type => 'text', p_options => NULL, p_help_text_en => NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'required:attr_key' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) an empty key answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_attribute(p_id => NULL, p_attr_key => v_tag || '-x', p_name_en => 'N', p_attr_type => 'text', p_options => NULL, p_help_text_en => NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'duplicateKey' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) a taken key answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_attribute(p_id => NULL, p_attr_key => v_tag || '-n1', p_name_en => 'N', p_attr_type => 'single_select', p_options => NULL, p_help_text_en => NULL, p_depends_on => 'nope-' || v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'dependsUnknown:nope-' || v_tag OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) a dependency on an unknown key answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_attribute(p_id => NULL, p_attr_key => v_tag || '-n1', p_name_en => 'N', p_attr_type => 'single_select', p_options => NULL, p_help_text_en => NULL, p_depends_on => v_tag || '-x');
    IF v_answer ->> 'message' IS DISTINCT FROM 'dependsNotSelect:' || v_tag || '-x' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) a dependency on a text definition answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_attribute(p_id => v_sel, p_attr_key => v_tag || '-sel', p_name_en => 'N', p_attr_type => 'single_select', p_options => '[{"value": "a", "label_en": "A"}]'::jsonb, p_help_text_en => NULL, p_depends_on => v_tag || '-sel');
    IF v_answer ->> 'message' IS DISTINCT FROM 'dependsSelf' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) a dependency on itself answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_attribute(p_id => NULL, p_attr_key => v_tag || '-n1', p_name_en => 'N', p_attr_type => 'single_select', p_options => '[{"value": "a", "label_en": "A", "parent": "q"}]'::jsonb, p_help_text_en => NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'parentWithoutDepends:q' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) an option parent without a dependency answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_attribute(p_id => NULL, p_attr_key => v_tag || '-n1', p_name_en => 'N', p_attr_type => 'text', p_options => NULL, p_help_text_en => NULL, p_unit => 'kg');
    IF v_answer ->> 'message' IS DISTINCT FROM 'badCell:unit|onlyNumber|kg' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) a unit on a text definition answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_attribute(p_id => NULL, p_attr_key => v_tag || '-n1', p_name_en => 'N', p_attr_type => 'single_select', p_options => '[{"value": "a", "label_en": "A", "zzz": "1"}]'::jsonb, p_help_text_en => NULL);
    IF v_answer ->> 'message' NOT LIKE 'badOption:%' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) an option with an unknown key answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_attribute(p_id => gen_random_uuid(), p_attr_key => v_tag || '-n2', p_name_en => 'N', p_attr_type => 'text', p_options => NULL, p_help_text_en => NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownAttribute' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) an update of an unknown definition answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_attribute(p_id => NULL, p_attr_key => v_tag || '-new', p_name_en => 'N', p_attr_type => 'text', p_options => NULL, p_help_text_en => NULL);
    IF v_answer ->> 'ok' IS DISTINCT FROM 'true' OR v_answer ->> 'id' IS DISTINCT FROM (SELECT id FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND attr_key = v_tag || '-new')::text THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) create answered %', v_answer;
    END IF;
    v_answer := public.admin_upsert_attribute(p_id => v_x, p_attr_key => v_tag || '-x', p_name_en => 'X2', p_attr_type => 'text', p_options => NULL, p_help_text_en => NULL);
    IF v_answer ->> 'ok' IS DISTINCT FROM 'true' OR v_answer ->> 'id' IS DISTINCT FROM (v_x)::text THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) update answered %', v_answer;
    END IF;
    IF NOT ((SELECT name_en FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND id = v_x) = 'X2') THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) the updated name differs';
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND attr_key IN (v_tag || '-n1', v_tag || '-n2', '')) AND (SELECT depends_on FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND id = v_sel) IS NULL) THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: (c) a refused call wrote a definition';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.create', 'attribute.update')) <> 2 THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: the staff successes wrote % audit lines (expected 2)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.create', 'attribute.update'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 11 THEN
      RAISE EXCEPTION 'F1-4a part 10 proof: the dial staff_config counted % for (c) the staff writer (expected %)', v_count, 11;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_upsert_attribute')) IS DISTINCT FROM v_refused + 9 THEN
      RAISE EXCEPTION 'F1-4a part 10 (c) proof: door_refusals did not meter the 9 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a10-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a10-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115040900') ON CONFLICT DO NOTHING;
