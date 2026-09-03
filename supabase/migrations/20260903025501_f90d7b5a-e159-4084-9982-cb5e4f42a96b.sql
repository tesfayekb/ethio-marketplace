-- C2-MIG — CATEGORY CONSOLE MACHINERY (Tier A)

-- ============================================================
-- 1. category_country_exclusions
-- ============================================================
CREATE TABLE public.category_country_exclusions (
  category_id  uuid NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  country_code text NOT NULL REFERENCES public.countries(code),
  created_by   uuid NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (category_id, country_code)
);

GRANT ALL ON public.category_country_exclusions TO service_role;

ALTER TABLE public.category_country_exclusions ENABLE ROW LEVEL SECURITY;

-- RPC-only surface: no anon/authenticated policies by design (E1). Deny-all is
-- the effect of RLS enabled with zero policies for those roles.
CREATE POLICY category_country_exclusions_no_client_access
  ON public.category_country_exclusions
  FOR ALL TO authenticated, anon
  USING (false) WITH CHECK (false);

CREATE INDEX idx_cat_excl_country ON public.category_country_exclusions(country_code);

-- ============================================================
-- 2. pointer-cycle trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.category_pointer_no_cycle()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
DECLARE
  v_cur   uuid := NEW.parent_id;
  v_depth int := 0;
BEGIN
  IF NEW.parent_id IS NOT NULL AND NEW.parent_id = NEW.child_id THEN
    RAISE EXCEPTION 'category pointer cycle';
  END IF;

  WHILE v_cur IS NOT NULL LOOP
    v_depth := v_depth + 1;
    IF v_depth > 50 THEN
      RAISE EXCEPTION 'category pointer cycle';
    END IF;
    IF v_cur = NEW.child_id THEN
      RAISE EXCEPTION 'category pointer cycle';
    END IF;
    SELECT p.parent_id INTO v_cur
      FROM public.category_tree_pointers p
     WHERE p.child_id = v_cur
     ORDER BY p.created_at
     LIMIT 1;
  END LOOP;

  RETURN NEW;
END $$;

CREATE TRIGGER category_tree_pointers_no_cycle
  BEFORE INSERT OR UPDATE ON public.category_tree_pointers
  FOR EACH ROW EXECUTE FUNCTION public.category_pointer_no_cycle();

-- ============================================================
-- 3. permissions (DEC-017 pattern) + policy rewrite
-- ============================================================
DO $$
DECLARE
  v_res uuid;
BEGIN
  SELECT id INTO v_res FROM public.resources WHERE name = 'categories';
  IF v_res IS NULL THEN
    RAISE EXCEPTION 'resource categories missing';
  END IF;

  INSERT INTO public.permissions (resource_id, action, requires_step_up, assignable)
  VALUES (v_res, 'view', false, true),
         (v_res, 'create', false, true),
         (v_res, 'update', false, true),
         (v_res, 'restructure', true, true),
         (v_res, 'assets', false, true)
  ON CONFLICT DO NOTHING;

  UPDATE public.permissions p
     SET requires_step_up = true
   WHERE p.resource_id = v_res AND p.action = 'restructure';
END $$;

-- roles holding categories:manage inherit all five granular permissions
INSERT INTO public.role_permissions (role_id, permission_id, is_core)
SELECT rp.role_id, np.id, false
  FROM public.role_permissions rp
  JOIN public.permissions mp ON mp.id = rp.permission_id
  JOIN public.resources r ON r.id = mp.resource_id AND r.name = 'categories'
  JOIN public.permissions np ON np.resource_id = r.id
       AND np.action IN ('view','create','update','restructure','assets')
 WHERE mp.action = 'manage'
ON CONFLICT DO NOTHING;

-- retire the broad grant (permission row itself stays, granted to none)
DELETE FROM public.role_permissions rp
 USING public.permissions p, public.resources r
 WHERE rp.permission_id = p.id
   AND p.resource_id = r.id
   AND r.name = 'categories'
   AND p.action = 'manage';

DROP POLICY IF EXISTS categories_admin_all ON public.categories;
DROP POLICY IF EXISTS category_tree_pointers_admin_all ON public.category_tree_pointers;
DROP POLICY IF EXISTS category_attributes_admin_all ON public.category_attributes;

CREATE POLICY categories_admin_insert ON public.categories
  FOR INSERT TO authenticated
  WITH CHECK (public.has_permission(auth.uid(), 'categories', 'create'));
CREATE POLICY categories_admin_update ON public.categories
  FOR UPDATE TO authenticated
  USING (public.has_permission(auth.uid(), 'categories', 'update'))
  WITH CHECK (public.has_permission(auth.uid(), 'categories', 'update'));
CREATE POLICY categories_admin_delete ON public.categories
  FOR DELETE TO authenticated
  USING (public.has_permission(auth.uid(), 'categories', 'restructure'));

CREATE POLICY category_tree_pointers_admin_insert ON public.category_tree_pointers
  FOR INSERT TO authenticated
  WITH CHECK (public.has_permission(auth.uid(), 'categories', 'create'));
CREATE POLICY category_tree_pointers_admin_update ON public.category_tree_pointers
  FOR UPDATE TO authenticated
  USING (public.has_permission(auth.uid(), 'categories', 'update'))
  WITH CHECK (public.has_permission(auth.uid(), 'categories', 'update'));
CREATE POLICY category_tree_pointers_admin_delete ON public.category_tree_pointers
  FOR DELETE TO authenticated
  USING (public.has_permission(auth.uid(), 'categories', 'restructure'));

CREATE POLICY category_attributes_admin_insert ON public.category_attributes
  FOR INSERT TO authenticated
  WITH CHECK (public.has_permission(auth.uid(), 'categories', 'create'));
CREATE POLICY category_attributes_admin_update ON public.category_attributes
  FOR UPDATE TO authenticated
  USING (public.has_permission(auth.uid(), 'categories', 'update'))
  WITH CHECK (public.has_permission(auth.uid(), 'categories', 'update'));
CREATE POLICY category_attributes_admin_delete ON public.category_attributes
  FOR DELETE TO authenticated
  USING (public.has_permission(auth.uid(), 'categories', 'restructure'));

-- supporting indexes
CREATE INDEX IF NOT EXISTS idx_ctp_parent ON public.category_tree_pointers(parent_id, display_order);
CREATE INDEX IF NOT EXISTS idx_ctp_child ON public.category_tree_pointers(child_id);
CREATE INDEX IF NOT EXISTS idx_listings_category_active
  ON public.listings(category_id) WHERE status = 'active';

-- ============================================================
-- 4. RPCs
-- ============================================================

-- 4.1 public browse tree (visibility law)
CREATE OR REPLACE FUNCTION public.get_browse_tree(p_country_code text)
RETURNS TABLE (
  id uuid, slug text, icon text, display_order integer,
  is_catchall boolean, allow_listings boolean, parent_id uuid
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  WITH RECURSIVE visible AS (
    SELECT c.id, c.slug, c.icon, c.is_catchall, c.allow_listings
      FROM public.categories c
     WHERE c.is_active
       AND (c.visible_from IS NULL OR c.visible_from <= now())
       AND (c.visible_until IS NULL OR c.visible_until > now())
       AND NOT EXISTS (
         SELECT 1 FROM public.category_country_exclusions x
          WHERE x.category_id = c.id AND x.country_code = p_country_code)
       AND (
         NOT c.is_catchall
         OR EXISTS (SELECT 1 FROM public.listings l
                     WHERE l.category_id = c.id AND l.status = 'active')
       )
  ),
  tree AS (
    SELECT p.child_id AS node_id, p.parent_id, p.display_order
      FROM public.category_tree_pointers p
     WHERE p.parent_id IS NULL
       AND EXISTS (SELECT 1 FROM visible v WHERE v.id = p.child_id)
    UNION ALL
    SELECT p.child_id, p.parent_id, p.display_order
      FROM public.category_tree_pointers p
      JOIN tree t ON t.node_id = p.parent_id
     WHERE EXISTS (SELECT 1 FROM visible v WHERE v.id = p.child_id)
  )
  SELECT v.id, v.slug, v.icon, t.display_order,
         v.is_catchall, v.allow_listings, t.parent_id
    FROM tree t
    JOIN visible v ON v.id = t.node_id
   ORDER BY t.parent_id NULLS FIRST, v.is_catchall, t.display_order;
$$;

REVOKE ALL ON FUNCTION public.get_browse_tree(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_browse_tree(text) TO anon, authenticated;

-- 4.2 admin roster
CREATE OR REPLACE FUNCTION public.admin_list_categories()
RETURNS TABLE (
  id uuid, slug text, name_en text, icon text, is_active boolean,
  is_catchall boolean, allow_listings boolean, display_order integer,
  price_enabled boolean, expiry_days integer,
  visible_from timestamptz, visible_until timestamptz,
  parent_id uuid, exclusion_count integer, listing_count integer
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT c.id, c.slug, c.name_en, c.icon, c.is_active,
         c.is_catchall, c.allow_listings, c.display_order,
         c.price_enabled, c.expiry_days,
         c.visible_from, c.visible_until,
         (SELECT p.parent_id FROM public.category_tree_pointers p
           WHERE p.child_id = c.id ORDER BY p.created_at LIMIT 1),
         (SELECT count(*)::int FROM public.category_country_exclusions x
           WHERE x.category_id = c.id),
         (SELECT count(*)::int FROM public.listings l
           WHERE l.category_id = c.id AND l.status = 'active')
    FROM public.categories c
   ORDER BY c.name_en;
END $$;

REVOKE ALL ON FUNCTION public.admin_list_categories() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO authenticated;

-- 4.3 create
CREATE OR REPLACE FUNCTION public.admin_create_category(
  p_name_en text, p_slug text, p_icon text,
  p_parent_id uuid, p_allow_listings boolean
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_id uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'create') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'create');

  INSERT INTO public.categories (name_en, slug, icon, allow_listings)
  VALUES (p_name_en, p_slug, p_icon, COALESCE(p_allow_listings, true))
  RETURNING id INTO v_id;

  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (p_parent_id, v_id,
          COALESCE((SELECT max(display_order) + 1 FROM public.category_tree_pointers p
                     WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id), 0));

  PERFORM public.log_audit('category.create', 'categories', v_id::text,
    jsonb_build_object('name_en', p_name_en, 'slug', p_slug,
                       'parent_id', p_parent_id, 'allow_listings', p_allow_listings));
  RETURN v_id;
END $$;

REVOKE ALL ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean) TO authenticated;

-- 4.4 update
CREATE OR REPLACE FUNCTION public.admin_update_category(
  p_id uuid, p_name_en text, p_icon text, p_display_order integer,
  p_allow_listings boolean, p_price_enabled boolean, p_expiry_days integer
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_old jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  SELECT to_jsonb(c) INTO v_old FROM public.categories c WHERE c.id = p_id;
  IF v_old IS NULL THEN RAISE EXCEPTION 'category not found'; END IF;

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

REVOKE ALL ON FUNCTION public.admin_update_category(uuid, text, text, integer, boolean, boolean, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_category(uuid, text, text, integer, boolean, boolean, integer) TO authenticated;

-- 4.5 visibility window
CREATE OR REPLACE FUNCTION public.admin_set_category_window(
  p_id uuid, p_visible_from timestamptz, p_visible_until timestamptz
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_from timestamptz; v_until timestamptz;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  SELECT c.visible_from, c.visible_until INTO v_from, v_until
    FROM public.categories c WHERE c.id = p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'category not found'; END IF;

  IF p_visible_from IS NOT NULL AND p_visible_until IS NOT NULL
     AND p_visible_until <= p_visible_from THEN
    RAISE EXCEPTION 'invalid visibility window';
  END IF;

  UPDATE public.categories
     SET visible_from = p_visible_from, visible_until = p_visible_until, updated_at = now()
   WHERE id = p_id;

  PERFORM public.log_audit('category.set_window', 'categories', p_id::text,
    jsonb_build_object('old', jsonb_build_object('visible_from', v_from, 'visible_until', v_until),
                       'new', jsonb_build_object('visible_from', p_visible_from, 'visible_until', p_visible_until)));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_category_window(uuid, timestamptz, timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_category_window(uuid, timestamptz, timestamptz) TO authenticated;

-- 4.6 country exclusions (replace-set)
CREATE OR REPLACE FUNCTION public.admin_set_country_exclusions(
  p_id uuid, p_country_codes text[]
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_old text[]; v_new text[];
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  IF NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_id) THEN
    RAISE EXCEPTION 'category not found';
  END IF;

  SELECT COALESCE(array_agg(x.country_code ORDER BY x.country_code), '{}')
    INTO v_old FROM public.category_country_exclusions x WHERE x.category_id = p_id;

  v_new := COALESCE(p_country_codes, '{}');

  DELETE FROM public.category_country_exclusions x
   WHERE x.category_id = p_id AND NOT (x.country_code = ANY (v_new));

  INSERT INTO public.category_country_exclusions (category_id, country_code, created_by)
  SELECT p_id, code, auth.uid() FROM unnest(v_new) AS code
  ON CONFLICT DO NOTHING;

  PERFORM public.log_audit('category.set_exclusions', 'categories', p_id::text,
    jsonb_build_object('old', to_jsonb(v_old), 'new', to_jsonb(v_new)));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_country_exclusions(uuid, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_country_exclusions(uuid, text[]) TO authenticated;

-- 4.7 retire with reassign
CREATE OR REPLACE FUNCTION public.admin_retire_category(
  p_id uuid, p_reassign_to uuid
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_live int; v_moved int := 0;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  IF NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_id) THEN
    RAISE EXCEPTION 'category not found';
  END IF;

  SELECT count(*)::int INTO v_live FROM public.listings l
   WHERE l.category_id = p_id AND l.status = 'active';

  IF v_live > 0 AND p_reassign_to IS NULL THEN
    RAISE EXCEPTION 'admin.categories.error.reassign_required'
      USING ERRCODE = 'P0010';
  END IF;

  IF v_live > 0 THEN
    IF NOT EXISTS (SELECT 1 FROM public.categories c
                    WHERE c.id = p_reassign_to AND c.is_active AND c.allow_listings) THEN
      RAISE EXCEPTION 'admin.categories.error.reassign_target_invalid'
        USING ERRCODE = 'P0010';
    END IF;
    UPDATE public.listings SET category_id = p_reassign_to, updated_at = now()
     WHERE category_id = p_id AND status = 'active';
    GET DIAGNOSTICS v_moved = ROW_COUNT;
  END IF;

  UPDATE public.categories SET is_active = false, updated_at = now() WHERE id = p_id;

  PERFORM public.log_audit('category.retire', 'categories', p_id::text,
    jsonb_build_object('reassign_to', p_reassign_to, 'listings_moved', v_moved));
END $$;

REVOKE ALL ON FUNCTION public.admin_retire_category(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_retire_category(uuid, uuid) TO authenticated;

-- 4.8 pointer operations
CREATE OR REPLACE FUNCTION public.admin_add_category_pointer(
  p_parent_id uuid, p_child_id uuid
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_id uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (p_parent_id, p_child_id,
          COALESCE((SELECT max(display_order) + 1 FROM public.category_tree_pointers p
                     WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id), 0))
  RETURNING id INTO v_id;

  PERFORM public.log_audit('category.pointer_add', 'category_tree_pointers', v_id::text,
    jsonb_build_object('parent_id', p_parent_id, 'child_id', p_child_id));
  RETURN v_id;
END $$;

REVOKE ALL ON FUNCTION public.admin_add_category_pointer(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_add_category_pointer(uuid, uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_remove_category_pointer(p_pointer_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_old jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  SELECT jsonb_build_object('parent_id', p.parent_id, 'child_id', p.child_id)
    INTO v_old FROM public.category_tree_pointers p WHERE p.id = p_pointer_id;
  IF v_old IS NULL THEN RAISE EXCEPTION 'pointer not found'; END IF;

  DELETE FROM public.category_tree_pointers WHERE id = p_pointer_id;

  PERFORM public.log_audit('category.pointer_remove', 'category_tree_pointers',
    p_pointer_id::text, jsonb_build_object('old', v_old));
END $$;

REVOKE ALL ON FUNCTION public.admin_remove_category_pointer(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_remove_category_pointer(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_move_category_pointer(
  p_pointer_id uuid, p_new_parent_id uuid
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_old uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  SELECT p.parent_id INTO v_old FROM public.category_tree_pointers p WHERE p.id = p_pointer_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'pointer not found'; END IF;

  UPDATE public.category_tree_pointers SET parent_id = p_new_parent_id WHERE id = p_pointer_id;

  PERFORM public.log_audit('category.pointer_move', 'category_tree_pointers',
    p_pointer_id::text,
    jsonb_build_object('old', jsonb_build_object('parent_id', v_old),
                       'new', jsonb_build_object('parent_id', p_new_parent_id)));
END $$;

REVOKE ALL ON FUNCTION public.admin_move_category_pointer(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_move_category_pointer(uuid, uuid) TO authenticated;

-- 4.9 reorder
CREATE OR REPLACE FUNCTION public.admin_reorder_categories(
  p_parent_id uuid, p_ordered_child_ids uuid[]
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  UPDATE public.category_tree_pointers p
     SET display_order = o.ord - 1
    FROM unnest(COALESCE(p_ordered_child_ids, '{}'::uuid[])) WITH ORDINALITY AS o(child_id, ord)
   WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id
     AND p.child_id = o.child_id;

  PERFORM public.log_audit('category.reorder', 'category_tree_pointers',
    COALESCE(p_parent_id::text, 'root'),
    jsonb_build_object('order', to_jsonb(COALESCE(p_ordered_child_ids, '{}'::uuid[]))));
END $$;

REVOKE ALL ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) TO authenticated;

-- ============================================================
-- 5. IN-MIGRATION PROOFS
-- ============================================================

-- P1 cycle trigger
DO $$
DECLARE a uuid; b uuid; caught boolean := false;
BEGIN
  INSERT INTO public.categories (name_en, slug, is_active)
  VALUES ('C2 scratch A', 'c2-scratch-a', false) RETURNING id INTO a;
  INSERT INTO public.categories (name_en, slug, is_active)
  VALUES ('C2 scratch B', 'c2-scratch-b', false) RETURNING id INTO b;
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (a, b, 0);
  BEGIN
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (b, a, 0);
  EXCEPTION WHEN others THEN
    caught := (SQLERRM LIKE '%cycle%');
  END;
  IF NOT caught THEN RAISE EXCEPTION 'P1 FAILED: cycle not refused'; END IF;
  RAISE NOTICE 'P1 OK: pointer cycle refused';

  DELETE FROM public.category_tree_pointers WHERE child_id IN (a, b) OR parent_id IN (a, b);
  DELETE FROM public.categories WHERE id IN (a, b);
END $$;

-- P2 deny-case (create + restructure) as an anonymous/no-permission caller
DO $$
DECLARE caught1 boolean := false; caught2 boolean := false;
BEGIN
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', '00000000-0000-0000-0000-0000000000ff', 'role', 'authenticated')::text, true);

  BEGIN
    PERFORM public.admin_create_category('deny', 'c2-deny-slug', NULL, NULL, true);
  EXCEPTION WHEN others THEN caught1 := (SQLERRM = 'permission denied');
  END;
  BEGIN
    PERFORM public.admin_add_category_pointer(NULL, '00000000-0000-0000-0000-000000000001');
  EXCEPTION WHEN others THEN caught2 := (SQLERRM = 'permission denied');
  END;

  PERFORM set_config('request.jwt.claims', NULL, true);

  IF NOT caught1 THEN RAISE EXCEPTION 'P2 FAILED: create not denied'; END IF;
  IF NOT caught2 THEN RAISE EXCEPTION 'P2 FAILED: restructure not denied'; END IF;
  RAISE NOTICE 'P2 OK: permission denied on create and restructure';
END $$;

-- P3 visibility law (window + exclusion)
DO $$
DECLARE v uuid; hidden uuid; n_et int; n_other int; v_country text;
BEGIN
  SELECT code INTO v_country FROM public.countries ORDER BY code LIMIT 1;

  INSERT INTO public.categories (name_en, slug, is_active)
  VALUES ('C2 scratch visible', 'c2-scratch-visible', true) RETURNING id INTO v;
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (NULL, v, 999);

  INSERT INTO public.categories (name_en, slug, is_active, visible_until)
  VALUES ('C2 scratch expired', 'c2-scratch-expired', true, now() - interval '1 day')
  RETURNING id INTO hidden;
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (NULL, hidden, 998);

  INSERT INTO public.category_country_exclusions (category_id, country_code, created_by)
  VALUES (v, v_country, '00000000-0000-0000-0000-000000000000');

  SELECT count(*)::int INTO n_et FROM public.get_browse_tree(v_country) t WHERE t.id IN (v, hidden);
  SELECT count(*)::int INTO n_other FROM public.get_browse_tree('__none__') t WHERE t.id = v;

  IF n_et <> 0 THEN RAISE EXCEPTION 'P3 FAILED: excluded/expired node visible (%)', n_et; END IF;
  IF n_other <> 1 THEN RAISE EXCEPTION 'P3 FAILED: node missing for other country (%)', n_other; END IF;
  RAISE NOTICE 'P3 OK: visibility law holds';

  DELETE FROM public.category_country_exclusions WHERE category_id = v;
  DELETE FROM public.category_tree_pointers WHERE child_id IN (v, hidden);
  DELETE FROM public.categories WHERE id IN (v, hidden);
END $$;

-- P4 policy read-back
DO $$
DECLARE n_manage int; n_new int;
BEGIN
  SELECT count(*)::int INTO n_manage FROM pg_policies
   WHERE schemaname = 'public'
     AND tablename IN ('categories','category_tree_pointers','category_attributes')
     AND (COALESCE(qual,'') LIKE '%''manage''%' OR COALESCE(with_check,'') LIKE '%''manage''%');
  SELECT count(*)::int INTO n_new FROM pg_policies
   WHERE schemaname = 'public'
     AND tablename IN ('categories','category_tree_pointers','category_attributes')
     AND (COALESCE(qual,'') LIKE '%restructure%' OR COALESCE(with_check,'') LIKE '%create%'
          OR COALESCE(qual,'') LIKE '%update%');
  IF n_manage <> 0 THEN RAISE EXCEPTION 'P4 FAILED: manage still referenced (%)', n_manage; END IF;
  IF n_new < 9 THEN RAISE EXCEPTION 'P4 FAILED: granular policies missing (%)', n_new; END IF;
  RAISE NOTICE 'P4 OK: policies granular, no manage references';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260903040000') ON CONFLICT DO NOTHING;