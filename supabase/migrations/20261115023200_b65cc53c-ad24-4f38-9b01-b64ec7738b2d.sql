-- e2e-areas: admin-attributes, admin-imports

-- Foundations 1, turn F1-4a, part 19 of 19 — THE ATTRIBUTE READERS ONTO DOOR_CONTEXT; THE IMPORT HELPERS LEAVE THE BROWSER ROLES (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). the nine attribute readers are redeclared WHOLE from their last declarations (live md5 checked): each
-- has_permission block becomes ONE door_context('staff-reader', categories:<its action>, NULL, NULL, global) — no
-- dial, no step-up, no shell. Their answers are unchanged; the export and preview planners' 'unknown category scope'
-- stays a sentence.
-- admin_export_attributes() gains the reader form (categories:view) before it delegates. import_is_slug,
-- import_norm_bool, import_norm_date and import_norm_pipe leave authenticated (no code, policy or body names them);
-- the service role keeps them. Proofs on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_list_category_attribute_links(uuid)', 'ae31c3642413d794d95be16f6e9ea4a2'],
    ['public.admin_list_effective_category_links(uuid)', 'd913a1bd6bc1b4eba91a5ad615a55db5'],
    ['public.admin_list_attributes()', '736edc4098a2aa6e72df26871f69a58a'],
    ['public.admin_list_attribute_categories()', 'bf65a83dac63191e70cd2268d0c0f452'],
    ['public.admin_attribute_holders(uuid,uuid,text)', '96173e8d4609d7b6cead70ebd4a354b0'],
    ['public.admin_attribute_option_coverage()', '99b94201b9a59fbfd79a7140e8e65864'],
    ['public.admin_preview_attribute_import(jsonb,jsonb,text)', '2e6b6bd767cb778e9f5047a651efc3ec'],
    ['public.admin_export_attributes(text)', 'fa7cc1065f1e4974b930bc7abe84de47'],
    ['public.admin_export_attributes()', 'a7b58156c48b175c2b7fd49b968b14d4']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115041700') THEN
    RAISE EXCEPTION 'F1-4a part 19: part 18 (4bce8e61) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL
     OR to_regprocedure('public.import_is_slug(text)') IS NULL
     OR to_regprocedure('public.import_norm_bool(text)') IS NULL
     OR to_regprocedure('public.import_norm_date(text)') IS NULL
     OR to_regprocedure('public.import_norm_pipe(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 19: a door mechanism function or an import helper is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 19: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_list_category_attribute_links (whole from 20261017091410 :214; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_list_category_attribute_links(p_category_id uuid)
RETURNS TABLE(link_id uuid, attribute_id uuid, attr_key text, name_en text, attr_type text,
              options jsonb, is_required boolean, is_filterable boolean,
              display_order integer, card_rank integer, fact_rank integer, depends_on_key text,
              allowed_options text[], default_value jsonb, visible_when jsonb)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'view', NULL, NULL, 'global');

  RETURN QUERY
  SELECT l.id, a.id, a.attr_key, a.name_en, a.attr_type, a.options,
         l.is_required, l.is_filterable, l.display_order, l.card_rank, l.fact_rank::integer,
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on),
         l.allowed_options, l.default_value, l.visible_when
    FROM public.category_attribute_links l
    JOIN public.attributes a ON a.id = l.attribute_id
   WHERE l.category_id = p_category_id
   ORDER BY l.display_order, a.name_en;
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_category_attribute_links(uuid) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 2. admin_list_effective_category_links (whole from 20261017091410 :244; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_list_effective_category_links(p_category_id uuid)
RETURNS TABLE(link_id uuid, attribute_id uuid, attr_key text, name_en text, attr_type text,
              options jsonb, is_required boolean, is_filterable boolean,
              display_order integer, card_rank integer, fact_rank integer, inherited boolean,
              origin_id uuid, origin_slug text, origin_name_en text, depends_on_key text,
              allowed_options text[], default_value jsonb, visible_when jsonb)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'view', NULL, NULL, 'global');

  RETURN QUERY
  SELECT e.link_id, a.id, a.attr_key, a.name_en, a.attr_type, a.options,
         e.is_required, e.is_filterable, e.display_order, e.card_rank, e.fact_rank,
         e.inherited, src.id, src.slug, src.name_en,
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on),
         l.allowed_options, l.default_value, l.visible_when
    FROM public.effective_category_links(p_category_id) e
    JOIN public.attributes a ON a.id = e.attribute_id
    JOIN public.categories src ON src.id = e.origin_id
    JOIN public.category_attribute_links l ON l.id = e.link_id
   ORDER BY e.inherited, e.display_order, a.name_en;
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_effective_category_links(uuid) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 3. admin_list_attributes (whole from 20261005172453 :1117; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_list_attributes()
RETURNS TABLE(id uuid, attr_key text, name_en text, name_am text, attr_type text,
              options jsonb, help_text_en text, usage_count integer,
              depends_on_key text, created_at timestamp with time zone,
              unit text, min_bound text, max_bound text, decimals smallint,
              format text, preset text, max_length integer, help_text_am text,
              unit_am text)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $m8c$
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'view', NULL, NULL, 'global');

  RETURN QUERY
  SELECT a.id, a.attr_key, a.name_en, a.name_am, a.attr_type,
         a.options, a.help_text_en,
         (SELECT count(*)::int FROM public.category_attribute_links l
           WHERE l.attribute_id = a.id),
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on),
         a.created_at,
         a.unit, a.min_bound, a.max_bound, a.decimals,
         a.format, a.preset, a.max_length, a.help_text_am, a.unit_am
    FROM public.attributes a
   ORDER BY a.attr_key;
END $m8c$;
REVOKE ALL ON FUNCTION public.admin_list_attributes() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 4. admin_list_attribute_categories (whole from 20260907033910 :8; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_list_attribute_categories()
RETURNS TABLE (
  link_id          uuid,
  attribute_id     uuid,
  category_id      uuid,
  category_slug    text,
  category_name_en text,
  is_active        boolean
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- GATE (F3/E7): the same permission the library roster itself requires.
  PERFORM public.door_context('staff-reader', 'categories', 'view', NULL, NULL, 'global');

  RETURN QUERY
  SELECT l.id, l.attribute_id, c.id, c.slug, c.name_en, c.is_active
    FROM public.category_attribute_links l
    JOIN public.categories c ON c.id = l.category_id
   ORDER BY c.name_en, c.slug;
END $$;
REVOKE ALL ON FUNCTION public.admin_list_attribute_categories() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 5. admin_attribute_holders (whole from 20261007033719 :36; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_attribute_holders(p_attribute_id uuid, p_link_id uuid DEFAULT NULL, p_value text DEFAULT NULL)
RETURNS integer
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $ah$
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'view', NULL, NULL, 'global');
  RETURN public.attribute_holders(p_attribute_id, p_link_id, p_value);
END $ah$;
REVOKE ALL ON FUNCTION public.admin_attribute_holders(uuid, uuid, text) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 6. admin_attribute_option_coverage (whole from 20260911193208 :1714; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_attribute_option_coverage()
RETURNS TABLE (attribute_id uuid, attr_key text, options_total int, options_with_am int)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'update', NULL, NULL, 'global');

  RETURN QUERY
    SELECT a.id,
           a.attr_key,
           COALESCE(o.total, 0)::int,
           COALESCE(o.with_am, 0)::int
      FROM public.attributes a
      LEFT JOIN LATERAL (
        SELECT count(*)::int AS total,
               count(*) FILTER (
                 WHERE btrim(COALESCE(x.value->>'label_am', '')) <> '')::int AS with_am
          FROM jsonb_array_elements(
                 CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) x
         WHERE jsonb_typeof(x.value) = 'object'
      ) o ON true
     WHERE a.attr_type IN ('single_select', 'multi_select')
     ORDER BY a.attr_key;
END $function$;
REVOKE ALL ON FUNCTION public.admin_attribute_option_coverage() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 7. admin_preview_attribute_import (whole from 20261007033719 :135; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_preview_attribute_import(p_definitions jsonb, p_links jsonb, p_scope text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_plan    jsonb;
  v_ignored jsonb;
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'import', NULL, NULL, 'global');
  v_plan := public.attr_import_plan(p_definitions, p_links, p_scope);
  v_ignored := public.import_readonly_ignored('definitions', p_definitions)
             || public.import_readonly_ignored('links', p_links);
  RETURN v_plan || jsonb_build_object(
    'ignored', v_ignored,
    'refusals', public.import_guide_refusals('attributes', NULL, v_plan->'refusals'),
    'holders', public.attr_import_holders(v_plan));
END $function$;
REVOKE ALL ON FUNCTION public.admin_preview_attribute_import(jsonb, jsonb, text) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 8. admin_export_attributes (whole from 20260907221756 :178; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_export_attributes(p_scope_slug text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'view', NULL, NULL, 'global');
  RETURN public.attr_export_payload(p_scope_slug);
END $function$;
REVOKE ALL ON FUNCTION public.admin_export_attributes(text) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 9. admin_export_attributes (whole from 20260907221756 :195; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_export_attributes()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'view', NULL, NULL, 'global');
  RETURN public.admin_export_attributes(NULL::text);
END $function$;
REVOKE ALL ON FUNCTION public.admin_export_attributes() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 10. the four import helpers leave the browser roles (no code, policy or body names them)
REVOKE ALL ON FUNCTION public.import_is_slug(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.import_is_slug(text) TO service_role;
REVOKE ALL ON FUNCTION public.import_norm_bool(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.import_norm_bool(text) TO service_role;
REVOKE ALL ON FUNCTION public.import_norm_date(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.import_norm_date(text) TO service_role;
REVOKE ALL ON FUNCTION public.import_norm_pipe(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.import_norm_pipe(text) TO service_role;

-- ------------------------------------------------------------ 11. PROOFS
-- (a) catalog facts: the 9 readers STABLE SECURITY DEFINER, EXECUTE for authenticated, never anon or PUBLIC; every
--     body this file's (md5). The four import helpers no longer executable by authenticated, still by the service
--     role, their bodies untouched.
-- (b) the readers' gates: each reader raises permissionDenied (P0D01) to a caller without its permission, a
--     deactivated holder accountDeactivated, no caller notSignedIn; staff reads each one.
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
  v_tag := 'e2e-mig-f14a19-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_list_category_attribute_links(uuid)', 'ff58ac7af9268b7d31f898ff9c1637b9'],
    ['public.admin_list_effective_category_links(uuid)', '82fbe2f83230bb9037999572f2b27a52'],
    ['public.admin_list_attributes()', 'ff9253054cbb54fca99a39b8bb9ec699'],
    ['public.admin_list_attribute_categories()', '34aed60cf2b61eba7d5d9c9e6528fdfc'],
    ['public.admin_attribute_holders(uuid,uuid,text)', 'deba30d6c740f51f36be13efa0034849'],
    ['public.admin_attribute_option_coverage()', '8f64ee71798364ff2b9f80d6139f813c'],
    ['public.admin_preview_attribute_import(jsonb,jsonb,text)', 'ad024a2688b404f5956be35a6f95a691'],
    ['public.admin_export_attributes(text)', 'be9352e1cd8d22e016f18a1f6c0f799b'],
    ['public.admin_export_attributes()', '17f4d50955796b2988d246f44e17dce1']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}'
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 19 proof (a): the reader %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 19 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  IF has_function_privilege('authenticated', 'public.import_is_slug(text)'::regprocedure, 'EXECUTE')
     OR has_function_privilege('anon', 'public.import_is_slug(text)'::regprocedure, 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.import_is_slug(text)'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-4a part 19 proof (a): public.import_is_slug(text)''s grants differ';
  END IF;
  IF has_function_privilege('authenticated', 'public.import_norm_bool(text)'::regprocedure, 'EXECUTE')
     OR has_function_privilege('anon', 'public.import_norm_bool(text)'::regprocedure, 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.import_norm_bool(text)'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-4a part 19 proof (a): public.import_norm_bool(text)''s grants differ';
  END IF;
  IF has_function_privilege('authenticated', 'public.import_norm_date(text)'::regprocedure, 'EXECUTE')
     OR has_function_privilege('anon', 'public.import_norm_date(text)'::regprocedure, 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.import_norm_date(text)'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-4a part 19 proof (a): public.import_norm_date(text)''s grants differ';
  END IF;
  IF has_function_privilege('authenticated', 'public.import_norm_pipe(text)'::regprocedure, 'EXECUTE')
     OR has_function_privilege('anon', 'public.import_norm_pipe(text)'::regprocedure, 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.import_norm_pipe(text)'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-4a part 19 proof (a): public.import_norm_pipe(text)''s grants differ';
  END IF;

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
      RAISE EXCEPTION 'F1-4a part 19 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 19 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 19 proof: the scratch tree''s home pointers differ';
    END IF;

    -- (b) the readers' gates
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_category_attribute_links(v_root);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 19 proof: (b) admin_list_category_attribute_links(v_root) for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_effective_category_links(v_root);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 19 proof: (b) admin_list_effective_category_links(v_root) for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_attributes();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 19 proof: (b) admin_list_attributes() for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_attribute_categories();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 19 proof: (b) admin_list_attribute_categories() for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_attribute_holders(gen_random_uuid(), NULL, NULL);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 19 proof: (b) admin_attribute_holders(gen_random_uuid(), NULL, NULL) for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_attribute_option_coverage();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 19 proof: (b) admin_attribute_option_coverage() for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_preview_attribute_import('[]'::jsonb, '[]'::jsonb, NULL);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 19 proof: (b) admin_preview_attribute_import(''[]''::jsonb, ''[]''::jsonb, NULL) for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_export_attributes(v_tag);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 19 proof: (b) admin_export_attributes(v_tag) for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_export_attributes();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 19 proof: (b) admin_export_attributes() for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_category_attribute_links(v_root);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'accountDeactivated' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 19 proof: (b) a deactivated holder answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_category_attribute_links(v_root);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'notSignedIn' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 19 proof: (b) no caller answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    PERFORM public.admin_list_category_attribute_links(v_root);
    PERFORM public.admin_list_effective_category_links(v_root);
    PERFORM public.admin_list_attributes();
    PERFORM public.admin_list_attribute_categories();
    PERFORM public.admin_attribute_holders(gen_random_uuid(), NULL, NULL);
    PERFORM public.admin_attribute_option_coverage();
    PERFORM public.admin_preview_attribute_import('[]'::jsonb, '[]'::jsonb, NULL);
    PERFORM public.admin_export_attributes(v_tag);
    PERFORM public.admin_export_attributes();

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a19-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a19-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115041800') ON CONFLICT DO NOTHING;
