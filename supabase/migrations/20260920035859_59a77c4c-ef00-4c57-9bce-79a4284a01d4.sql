-- =====================================================================
-- U6-C1-R3b-2 Part 2b — reader projection closer.
-- INC-183 census: the only functions re-declared WHOLE in this migration are
--   1. public.admin_list_category_attribute_links(uuid)
--   2. public.admin_list_effective_category_links(uuid)
-- Their gates, ordering and existing projections are unchanged. The only
-- behavioural change is the appended projection of allowed_options,
-- default_value and visible_when from each selected link.
-- =====================================================================

DROP FUNCTION IF EXISTS public.admin_list_category_attribute_links(uuid);

CREATE OR REPLACE FUNCTION public.admin_list_category_attribute_links(p_category_id uuid)
RETURNS TABLE(link_id uuid, attribute_id uuid, attr_key text, name_en text, attr_type text,
              options jsonb, is_required boolean, is_filterable boolean,
              display_order integer, card_rank integer, depends_on_key text,
              allowed_options text[], default_value jsonb, visible_when jsonb)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT l.id, a.id, a.attr_key, a.name_en, a.attr_type, a.options,
         l.is_required, l.is_filterable, l.display_order, l.card_rank,
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on),
         l.allowed_options, l.default_value, l.visible_when
    FROM public.category_attribute_links l
    JOIN public.attributes a ON a.id = l.attribute_id
   WHERE l.category_id = p_category_id
   ORDER BY l.display_order, a.name_en;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_category_attribute_links(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_category_attribute_links(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_category_attribute_links(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_category_attribute_links(uuid) TO service_role;

DROP FUNCTION IF EXISTS public.admin_list_effective_category_links(uuid);

CREATE OR REPLACE FUNCTION public.admin_list_effective_category_links(p_category_id uuid)
RETURNS TABLE(link_id uuid, attribute_id uuid, attr_key text, name_en text, attr_type text,
              options jsonb, is_required boolean, is_filterable boolean,
              display_order integer, card_rank integer, inherited boolean,
              origin_id uuid, origin_slug text, origin_name_en text, depends_on_key text,
              allowed_options text[], default_value jsonb, visible_when jsonb)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT e.link_id, a.id, a.attr_key, a.name_en, a.attr_type, a.options,
         e.is_required, e.is_filterable, e.display_order, e.card_rank,
         e.inherited, src.id, src.slug, src.name_en,
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on),
         l.allowed_options, l.default_value, l.visible_when
    FROM public.effective_category_links(p_category_id) e
    JOIN public.attributes a ON a.id = e.attribute_id
    JOIN public.categories src ON src.id = e.origin_id
    JOIN public.category_attribute_links l ON l.id = e.link_id
   ORDER BY e.inherited, e.display_order, a.name_en;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_effective_category_links(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_effective_category_links(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_effective_category_links(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_effective_category_links(uuid) TO service_role;

-- =====================================================================
-- IN-FILE PROOF — a scratch link is set through the existing link door with
-- all three cells, then both readers must return the exact values.
-- INC-222: scratch identity + in-transaction super_admin role grant; never a
-- real user id and never a permission/step-up toggle. Cleanup is account-first.
-- =====================================================================
DO $proof$
DECLARE
  v_uid       uuid := gen_random_uuid();
  v_session   uuid := gen_random_uuid();
  v_factor    uuid := gen_random_uuid();
  v_cat       uuid;
  v_parent    uuid;
  v_target    uuid;
  v_parent_link uuid;
  v_target_link uuid;
  v_direct    record;
  v_effective record;
BEGIN
  INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
  VALUES (v_uid, 'e2e-r3b2-reader-proof@example.invalid', '{}'::jsonb,
          'authenticated', 'authenticated', now(), now());

  INSERT INTO public.user_roles (user_id, role_id, scope_type)
  SELECT v_uid, r.id, 'global'
    FROM public.roles r
   WHERE r.name = 'super_admin';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'PROOF FAILED — super_admin role is absent';
  END IF;

  INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal)
  VALUES (v_session, v_uid, now(), now(), 'aal2');
  INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status,
                               created_at, updated_at, secret)
  VALUES (v_factor, v_uid, 'r3b2-reader-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
  INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
  VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');

  INSERT INTO public.categories (name_en, slug, price_enabled, is_active,
                                 allow_listings, display_order)
  VALUES ('E2E R3b2 Reader Leaf', 'e2e-rb-reader-leaf', true, true, true, 9998)
  RETURNING id INTO v_cat;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('e2e_rb_reader_parent', 'E2E R3b2 Reader Parent', 'single_select',
          '[{"value":"on","label_en":"On"},{"value":"off","label_en":"Off"}]'::jsonb)
  RETURNING id INTO v_parent;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('e2e_rb_reader_target', 'E2E R3b2 Reader Target', 'single_select',
          '[{"value":"alpha","label_en":"Alpha"},{"value":"beta","label_en":"Beta"}]'::jsonb)
  RETURNING id INTO v_target;

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, display_order)
  VALUES (v_cat, v_parent, false, true, 1)
  RETURNING id INTO v_parent_link;

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, display_order)
  VALUES (v_cat, v_target, false, true, 2)
  RETURNING id INTO v_target_link;

  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                      'session_id', v_session::text)::text, true);

  PERFORM public.admin_update_attribute_link(
    v_target_link, NULL, NULL,
    ARRAY['alpha'], to_jsonb('alpha'::text),
    jsonb_build_object('key', 'e2e_rb_reader_parent', 'in', jsonb_build_array('on')));

  SELECT * INTO v_direct
    FROM public.admin_list_category_attribute_links(v_cat) r
   WHERE r.link_id = v_target_link;
  IF NOT FOUND
     OR v_direct.allowed_options IS DISTINCT FROM ARRAY['alpha']
     OR v_direct.default_value IS DISTINCT FROM '"alpha"'::jsonb
     OR v_direct.visible_when IS DISTINCT FROM
        jsonb_build_object('key', 'e2e_rb_reader_parent', 'in', jsonb_build_array('on')) THEN
    RAISE EXCEPTION 'PROOF FAILED — direct reader did not return all three cells';
  END IF;

  SELECT * INTO v_effective
    FROM public.admin_list_effective_category_links(v_cat) r
   WHERE r.link_id = v_target_link;
  IF NOT FOUND
     OR v_effective.allowed_options IS DISTINCT FROM ARRAY['alpha']
     OR v_effective.default_value IS DISTINCT FROM '"alpha"'::jsonb
     OR v_effective.visible_when IS DISTINCT FROM
        jsonb_build_object('key', 'e2e_rb_reader_parent', 'in', jsonb_build_array('on')) THEN
    RAISE EXCEPTION 'PROOF FAILED — effective reader did not return all three cells';
  END IF;

  PERFORM set_config('request.jwt.claims', '{}', true);

  -- Account FIRST, then every remaining scratch row.
  DELETE FROM auth.users WHERE id = v_uid;
  DELETE FROM public.user_roles WHERE user_id = v_uid;
  DELETE FROM public.profiles WHERE user_id = v_uid;
  DELETE FROM public.user_directory WHERE user_id = v_uid;
  DELETE FROM auth.mfa_amr_claims WHERE session_id = v_session;
  DELETE FROM auth.mfa_factors WHERE id = v_factor;
  DELETE FROM auth.sessions WHERE id = v_session;
  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  DELETE FROM public.attributes WHERE id IN (v_parent, v_target);
  DELETE FROM public.category_tree_pointers WHERE child_id = v_cat OR parent_id = v_cat;
  DELETE FROM public.categories WHERE id = v_cat;

  IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_uid)
     OR EXISTS (SELECT 1 FROM public.categories WHERE slug = 'e2e-rb-reader-leaf')
     OR EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e_rb_reader_%') THEN
    RAISE EXCEPTION 'PROOF CLEANUP FAILED — scratch residue remains';
  END IF;

  RAISE NOTICE 'READER PROOF PASSED — both readers returned all three link cells; scratch removed.';
END $proof$;

-- md5 read-backs for the two whole declarations and their ACL/security shape.
DO $readback$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ')' AS sig,
           md5(p.prosrc) AS body_md5,
           p.prosecdef AS definer,
           p.proconfig::text AS config,
           array_to_string(p.proacl, ',') AS acl
      FROM pg_proc p
      JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('admin_list_category_attribute_links',
                         'admin_list_effective_category_links')
     ORDER BY 1
  LOOP
    RAISE NOTICE 'READ-BACK fn % definer=% config=% md5=% acl=%',
      r.sig, r.definer, r.config, r.body_md5, r.acl;
  END LOOP;
END $readback$;

INSERT INTO public.migration_marks (version)
VALUES ('20260920000008')
ON CONFLICT DO NOTHING;