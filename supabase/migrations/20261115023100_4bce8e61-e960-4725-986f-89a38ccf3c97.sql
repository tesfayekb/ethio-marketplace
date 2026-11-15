-- e2e-areas: admin-categories, admin-imports, posting

-- Foundations 1, turn F1-4a, part 18 of 19 — THE CATEGORY READERS AND THE FINDER REBUILD ONTO DOOR_CONTEXT (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). the five category readers are redeclared WHOLE from their last declarations (live md5 checked): each
-- has_permission block becomes ONE door_context('staff-reader', categories:<its action>, NULL, NULL, global) — no
-- dial, no step-up, no shell. Their answers are unchanged; the export and preview planners' 'unknown category scope'
-- stays a sentence.
-- catalog_find_rebuild becomes ONE door_context('staff', categories:import, staff_config, global) and the shell
-- (integer → {ok:true, entries}: DROP + CREATE, grants restated); its only caller is the service role, which passes
-- every gate. Proofs on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_list_categories()', '169bbead67ff53bc1c94693b19bc52d9'],
    ['public.admin_list_category_pointers(uuid)', '4c20d5c3ee5e518323afa57e867940dd'],
    ['public.admin_get_category_images(uuid)', 'b768b7890e338406fc65e29006e7ecca'],
    ['public.admin_export_categories(text)', 'bf97e21f686b66b653287819fee16680'],
    ['public.admin_preview_category_import(jsonb,text)', 'cecc3fc759b89a4250719727bcd2c2b8'],
    ['public.catalog_find_rebuild()', 'ebd2e9cb25c2c13e0b0f9b0853deb016']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115041600') THEN
    RAISE EXCEPTION 'F1-4a part 18: part 17 (29cf246d) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 18: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 18: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_list_categories (whole from 20260928002133 :317; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_list_categories()
 RETURNS TABLE(id uuid, slug text, name_en text, icon text, is_active boolean, is_catchall boolean, allow_listings boolean, display_order integer, price_enabled boolean, expiry_days integer, visible_from timestamp with time zone, visible_until timestamp with time zone, parent_id uuid, exclusion_count integer, listing_count integer, excluded_country_codes text[], has_image boolean, attribute_count integer, card_attribute_count integer, secondary_parent_names text[])
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'view', NULL, NULL, 'global');

  RETURN QUERY
  WITH RECURSIVE edge AS (
    SELECT c.id AS cat_id, e.parent_id, e.display_order AS edge_order
      FROM public.categories c
      LEFT JOIN LATERAL (
        SELECT p.parent_id, p.display_order
          FROM public.category_tree_pointers p
          LEFT JOIN public.categories pc ON pc.id = p.parent_id
         WHERE p.child_id = c.id
           AND (p.parent_id IS NULL OR pc.is_active)
         ORDER BY (NOT p.is_primary), (p.parent_id IS NOT NULL), p.display_order, p.created_at
         LIMIT 1
      ) e ON TRUE
     WHERE EXISTS (SELECT 1 FROM public.category_tree_pointers p2
                    WHERE p2.child_id = c.id)
  ),
  node AS (
    SELECT c.id, c.slug, c.is_catchall, e.parent_id,
           COALESCE(e.edge_order, c.display_order) AS edge_order
      FROM public.categories c
      JOIN edge e ON e.cat_id = c.id
  ),
  walk AS (
    SELECT n.id, n.slug, n.parent_id, n.edge_order,
           ARRAY[n.edge_order] AS path, 1 AS depth
      FROM node n
     WHERE n.parent_id IS NULL
    UNION ALL
    SELECT n.id, n.slug, n.parent_id, n.edge_order,
           w.path || n.edge_order, w.depth + 1
      FROM node n
      JOIN walk w ON w.id = n.parent_id
     WHERE w.depth < 20
  ),
  orphan AS (
    SELECT c.id, c.slug, NULL::uuid AS parent_id,
           row_number() OVER (ORDER BY c.slug)::int AS edge_order,
           ARRAY[row_number() OVER (ORDER BY c.slug)::int] AS path
      FROM public.categories c
     WHERE NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p
                        WHERE p.child_id = c.id)
  ),
  listed AS (
    SELECT w.id, w.slug, w.parent_id, w.edge_order, w.path, 0 AS seg FROM walk w
    UNION ALL
    SELECT o.id, o.slug, o.parent_id, o.edge_order, o.path, 1 AS seg FROM orphan o
  ),
  -- DIRECT links: the "attributes: N" figure stays the category's own count.
  lnk AS (
    SELECT k.category_id,
           count(*)::int AS attribute_count
      FROM public.category_attribute_links k
     GROUP BY k.category_id
  ),
  -- C3-INH (DEC-044), amended by INH-1: the CARD count is EFFECTIVE over the
  -- PRIMARY lineage only — own ∪ primary ancestors, nearest link wins. A
  -- secondary (browse) parent confers nothing, so its child keeps the amber
  -- flag until it carries (or primarily inherits) its own card attributes.
  anc AS (
    SELECT c.id AS cat_id, c.id AS src_id, 0 AS depth
      FROM public.categories c
    UNION ALL
    SELECT a.cat_id, public.cat_primary_parent(a.src_id), a.depth + 1
      FROM anc a
     WHERE a.depth < 10
       AND public.cat_primary_parent(a.src_id) IS NOT NULL
  ),
  effl AS (
    SELECT DISTINCT ON (anc.cat_id, k.attribute_id)
           anc.cat_id, k.attribute_id, k.card_rank
      FROM anc
      JOIN public.category_attribute_links k ON k.category_id = anc.src_id
     ORDER BY anc.cat_id, k.attribute_id, anc.depth ASC, k.id
  ),
  effcard AS (
    SELECT effl.cat_id AS category_id,
           count(*) FILTER (WHERE effl.card_rank IS NOT NULL)::int AS card_attribute_count
      FROM effl
     GROUP BY effl.cat_id
  ),
  sec AS (
    SELECT l.id AS category_id,
           array_agg(pc.name_en ORDER BY pc.name_en) AS names
      FROM listed l
      JOIN public.category_tree_pointers p ON p.child_id = l.id
      JOIN public.categories pc ON pc.id = p.parent_id AND pc.is_active
     WHERE l.parent_id IS NULL OR p.parent_id <> l.parent_id
     GROUP BY l.id
  ),
  excl AS (
    SELECT x.category_id,
           count(*)::int AS exclusion_count,
           array_agg(x.country_code::text ORDER BY x.country_code) AS codes
      FROM public.category_country_exclusions x
     GROUP BY x.category_id
  ),
  lst AS (
    SELECT li.category_id, count(*)::int AS listing_count
      FROM public.listings li
     WHERE li.status = 'active'
     GROUP BY li.category_id
  )
  SELECT c.id, c.slug, c.name_en, c.icon, c.is_active,
         c.is_catchall, c.allow_listings,
         l.edge_order,
         c.price_enabled, c.expiry_days,
         c.visible_from, c.visible_until,
         l.parent_id,
         COALESCE(e.exclusion_count, 0),
         COALESCE(s.listing_count, 0),
         COALESCE(e.codes, ARRAY[]::text[]),
         (c.image_url IS NOT NULL),
         COALESCE(k.attribute_count, 0),
         COALESCE(ec.card_attribute_count, 0),
         COALESCE(sp.names, ARRAY[]::text[])
    FROM listed l
    JOIN public.categories c ON c.id = l.id
    LEFT JOIN lnk  k  ON k.category_id  = l.id
    LEFT JOIN effcard ec ON ec.category_id = l.id
    LEFT JOIN sec  sp ON sp.category_id = l.id
    LEFT JOIN excl e  ON e.category_id  = l.id
    LEFT JOIN lst  s  ON s.category_id  = l.id
   ORDER BY l.seg, l.path, l.slug;
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_categories() FROM PUBLIC, anon;

-- ------------------------------------------------------------ 2. admin_list_category_pointers (whole from 20261007033719 :215; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_list_category_pointers(p_category_id uuid)
 RETURNS TABLE(pointer_id uuid, parent_id uuid, parent_slug text, parent_name_en text, display_order integer, is_primary boolean)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'view', NULL, NULL, 'global');

  RETURN QUERY
  SELECT ptr.id, ptr.parent_id, parent.slug, parent.name_en, ptr.display_order, ptr.is_primary
    FROM public.category_tree_pointers ptr
    LEFT JOIN public.categories parent ON parent.id = ptr.parent_id
   WHERE ptr.child_id = p_category_id
   ORDER BY (NOT ptr.is_primary), ptr.display_order, ptr.created_at;
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_category_pointers(uuid) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 3. admin_get_category_images (whole from 20260904053127 :5; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_get_category_images(p_id uuid)
RETURNS TABLE (
  image_url text,
  image_thumb_url text,
  og_image_url text,
  image_accepted_at timestamptz)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'assets', NULL, NULL, 'global');

  RETURN QUERY
  SELECT c.image_url, c.image_thumb_url, c.og_image_url, c.image_accepted_at
    FROM public.categories c
   WHERE c.id = p_id;
END $function$;
REVOKE ALL ON FUNCTION public.admin_get_category_images(uuid) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 4. admin_export_categories (whole from 20260907194932 :201; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_export_categories(p_scope text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_scope uuid;
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'view', NULL, NULL, 'global');

  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    SELECT c.id INTO v_scope FROM public.categories c WHERE c.slug = lower(btrim(p_scope));
    IF v_scope IS NULL THEN RAISE EXCEPTION 'unknown category scope'; END IF;
  END IF;

  RETURN jsonb_build_object('categories', public.cat_export_rows(v_scope));
END $function$;
REVOKE ALL ON FUNCTION public.admin_export_categories(text) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 5. admin_preview_category_import (whole from 20260907202049 :246; the gate on door_context (staff-reader); its answer kept)
CREATE OR REPLACE FUNCTION public.admin_preview_category_import(p_rows jsonb, p_scope text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_plan jsonb;
BEGIN
  PERFORM public.door_context('staff-reader', 'categories', 'import', NULL, NULL, 'global');
  v_plan := public.cat_import_plan(p_rows, p_scope);
  RETURN v_plan || jsonb_build_object(
    'ignored', public.import_readonly_ignored('categories', p_rows),
    'refusals', public.import_guide_refusals('categories', p_rows, v_plan->'refusals'));
END $function$;
REVOKE ALL ON FUNCTION public.admin_preview_category_import(jsonb, text) FROM PUBLIC, anon;

-- ------------------------------------------------------------ 6. catalog_find_rebuild (whole from 20260924104238 :71; integer → jsonb, ONE door_context and the shell)
DROP FUNCTION public.catalog_find_rebuild();
CREATE FUNCTION public.catalog_find_rebuild()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  PERFORM public.door_context('staff', 'categories', 'import', 'staff_config', NULL, 'global');
  RETURN jsonb_build_object('ok', true, 'entries', public.catalog_find_refresh(true));
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('catalog_find_rebuild', 'staff_config', SQLERRM);
END $$;
COMMENT ON FUNCTION public.catalog_find_rebuild() IS
  'F1-4a on the door shell (DEC-333): rebuilds the catalogue finder behind door_context(staff, categories:import, staff_config, global); answers {ok:true, entries}.';
REVOKE ALL ON FUNCTION public.catalog_find_rebuild() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.catalog_find_rebuild() TO authenticated;
GRANT ALL ON FUNCTION public.catalog_find_rebuild() TO service_role;

-- ------------------------------------------------------------ 7. PROOFS
-- (a) catalog facts: the 5 readers STABLE SECURITY DEFINER, EXECUTE for authenticated, never anon or PUBLIC;
--     catalog_find_rebuild VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service
--     role; every body this file's (md5).
-- (b) the readers' gates: each reader raises permissionDenied (P0D01) to a caller without its permission, a
--     deactivated holder accountDeactivated, no caller notSignedIn; staff reads each one (the scratch root among
--     the listed categories).
-- (c) the rebuild: permissionDenied (403) for a caller without categories:import, spending nothing; staff rebuilds
--     ({ok:true, entries}), staff_config counted once.
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
  v_tag := 'e2e-mig-f14a18-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_list_categories()', '2c3dd247885335c5cacf4cde61acade8'],
    ['public.admin_list_category_pointers(uuid)', 'deeb356fcd8affed70c8dcef0e456e51'],
    ['public.admin_get_category_images(uuid)', '36e52d44771440c23754c1cc8ce1d53e'],
    ['public.admin_export_categories(text)', 'e0b47db317c37a67d62ddb02b929cdeb'],
    ['public.admin_preview_category_import(jsonb,text)', '4c02fdfda3cd15f9d3b454efec4bb8e1']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}'
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 18 proof (a): the reader %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 18 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;
  v_pairs := ARRAY[
    ['public.catalog_find_rebuild()', '3b19019fefa7ed866678558f71b7d238']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 18 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 18 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 18 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 18 proof: the scratch tree''s home pointers differ';
    END IF;

    -- (b) the readers' gates
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_categories();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: (b) admin_list_categories() for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_category_pointers(v_a);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: (b) admin_list_category_pointers(v_a) for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_get_category_images(v_root);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: (b) admin_get_category_images(v_root) for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_export_categories(v_tag);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: (b) admin_export_categories(v_tag) for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_preview_category_import('[]'::jsonb, NULL);
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: (b) admin_preview_category_import(''[]''::jsonb, NULL) for a caller without its permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_categories();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'accountDeactivated' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: (b) a deactivated holder answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.admin_list_categories();
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'notSignedIn' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: (b) no caller answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    IF NOT (EXISTS (SELECT 1 FROM public.admin_list_categories() l WHERE l.id = v_root)) THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: (b) staff does not see the scratch root';
    END IF;
    PERFORM public.admin_list_categories();
    PERFORM public.admin_list_category_pointers(v_a);
    PERFORM public.admin_get_category_images(v_root);
    PERFORM public.admin_export_categories(v_tag);
    PERFORM public.admin_preview_category_import('[]'::jsonb, NULL);

    -- (c) the rebuild
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('catalog_find_rebuild');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.catalog_find_rebuild();
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: (c) the rebuild for a caller without categories:import answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: the dial staff_config counted % for (c) the refused rebuild (expected %)', v_count, 0;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('catalog_find_rebuild')) IS DISTINCT FROM v_refused + 1 THEN
      RAISE EXCEPTION 'F1-4a part 18 (c) proof: door_refusals did not meter the 1 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.catalog_find_rebuild();
    IF NOT (v_answer ->> 'ok' = 'true' AND (v_answer ->> 'entries')::integer >= 0) THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: (c) the rebuild did not answer its entries';
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-4a part 18 proof: the dial staff_config counted % for (c) the staff rebuild (expected %)', v_count, 1;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a18-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a18-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115041700') ON CONFLICT DO NOTHING;
