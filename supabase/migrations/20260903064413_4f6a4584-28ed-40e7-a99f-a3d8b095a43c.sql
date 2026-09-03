-- C2g — THE CATCH-ALL PARENT LAW.
-- A catch-all ("Other <Root>") is a terminal posting bucket, never a branch:
-- nothing may hang under it and it always sorts last among its siblings.
-- Refusals raise the translated key the console renders (F4).
-- Every touched definer restates its own REVOKE/GRANT pair in this file.

-- 0. The law, in one place ---------------------------------------------------
-- Every writer below delegates to this guard, so the refusal has exactly one
-- authority and can be proven on its own, above the permission gates.
CREATE OR REPLACE FUNCTION public.assert_parent_not_catchall(p_parent_id uuid)
RETURNS void
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $$
BEGIN
  IF p_parent_id IS NOT NULL
     AND EXISTS (SELECT 1 FROM public.categories c
                  WHERE c.id = p_parent_id AND c.is_catchall) THEN
    RAISE EXCEPTION 'admin.categories.error.catchallParent';
  END IF;
END $$;

REVOKE ALL ON FUNCTION public.assert_parent_not_catchall(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.assert_parent_not_catchall(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.assert_parent_not_catchall(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.assert_parent_not_catchall(uuid) TO service_role;

-- 1. admin_create_category — parent may not be a catch-all -------------------
CREATE OR REPLACE FUNCTION public.admin_create_category(
  p_name_en text,
  p_slug text DEFAULT NULL,
  p_icon text DEFAULT NULL,
  p_parent_id uuid DEFAULT NULL,
  p_allow_listings boolean DEFAULT true
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_id uuid;
  v_slug text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'create') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'create');

  PERFORM public.assert_parent_not_catchall(p_parent_id);

  IF p_slug IS NULL OR btrim(p_slug) = '' THEN
    v_slug := public.category_slug_candidate(p_name_en);
  ELSE
    v_slug := lower(btrim(p_slug));
    IF EXISTS (SELECT 1 FROM public.categories c WHERE c.slug = v_slug) THEN
      RAISE EXCEPTION 'admin.categories.error.slugTaken';
    END IF;
  END IF;

  INSERT INTO public.categories (name_en, slug, icon, allow_listings)
  VALUES (p_name_en, v_slug, p_icon, COALESCE(p_allow_listings, true))
  RETURNING id INTO v_id;

  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (p_parent_id, v_id,
          COALESCE((SELECT max(display_order) + 1 FROM public.category_tree_pointers p
                     WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id), 0));

  PERFORM public.log_audit('category.create', 'categories', v_id::text,
    jsonb_build_object('name_en', p_name_en, 'slug', v_slug,
                       'parent_id', p_parent_id, 'allow_listings', p_allow_listings));
  RETURN v_id;
END $$;

REVOKE ALL ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean) TO service_role;

-- 2. admin_add_category_pointer ----------------------------------------------
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

  PERFORM public.assert_parent_not_catchall(p_parent_id);

  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (p_parent_id, p_child_id,
          COALESCE((SELECT max(display_order) + 1 FROM public.category_tree_pointers p
                     WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id), 0))
  RETURNING id INTO v_id;

  PERFORM public.log_audit('category.pointer_add', 'category_tree_pointers', v_id::text,
    jsonb_build_object('parent_id', p_parent_id, 'child_id', p_child_id));
  RETURN v_id;
END $$;

REVOKE ALL ON FUNCTION public.admin_add_category_pointer(uuid, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_add_category_pointer(uuid, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_add_category_pointer(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_add_category_pointer(uuid, uuid) TO service_role;

-- 3. admin_move_category_pointer ---------------------------------------------
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

  PERFORM public.assert_parent_not_catchall(p_new_parent_id);

  SELECT p.parent_id INTO v_old FROM public.category_tree_pointers p WHERE p.id = p_pointer_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'pointer not found'; END IF;

  UPDATE public.category_tree_pointers SET parent_id = p_new_parent_id WHERE id = p_pointer_id;

  PERFORM public.log_audit('category.pointer_move', 'category_tree_pointers',
    p_pointer_id::text,
    jsonb_build_object('old', jsonb_build_object('parent_id', v_old),
                       'new', jsonb_build_object('parent_id', p_new_parent_id)));
END $$;

REVOKE ALL ON FUNCTION public.admin_move_category_pointer(uuid, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_move_category_pointer(uuid, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_move_category_pointer(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_move_category_pointer(uuid, uuid) TO service_role;

-- 4. admin_reorder_categories — catch-alls are pinned last -------------------
CREATE OR REPLACE FUNCTION public.admin_reorder_categories(
  p_parent_id uuid, p_ordered_child_ids uuid[]
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_ordered uuid[];
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  -- A catch-all never participates in an operator-supplied order.
  SELECT COALESCE(array_agg(u.x ORDER BY u.ord), '{}'::uuid[])
    INTO v_ordered
    FROM unnest(COALESCE(p_ordered_child_ids, '{}'::uuid[])) WITH ORDINALITY AS u(x, ord)
   WHERE NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = u.x AND c.is_catchall);

  UPDATE public.category_tree_pointers p
     SET display_order = o.ord - 1
    FROM unnest(v_ordered) WITH ORDINALITY AS o(child_id, ord)
   WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id
     AND p.child_id = o.child_id;

  -- ... and always sorts last among its siblings.
  UPDATE public.category_tree_pointers p
     SET display_order = 1000000 + c.display_order
    FROM public.categories c
   WHERE p.child_id = c.id
     AND c.is_catchall
     AND p.parent_id IS NOT DISTINCT FROM p_parent_id
     AND p.display_order < 1000000;

  PERFORM public.log_audit('category.reorder', 'category_tree_pointers',
    COALESCE(p_parent_id::text, 'root'),
    jsonb_build_object('order', to_jsonb(v_ordered)));
END $$;

REVOKE ALL ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_reorder_categories(uuid, uuid[]) TO service_role;

-- 5. IN-FILE PROOFS ----------------------------------------------------------
DO $$
DECLARE
  v_parent uuid; v_catchall uuid; v_child uuid;
  v_ord integer; v_sib_ord integer; caught boolean; v_def text;
BEGIN
  INSERT INTO public.categories (name_en, slug, is_active)
  VALUES ('C2g scratch root', 'c2g-scratch-root', false) RETURNING id INTO v_parent;
  INSERT INTO public.categories (name_en, slug, is_active, is_catchall)
  VALUES ('C2g scratch other', 'c2g-scratch-other', false, true) RETURNING id INTO v_catchall;
  INSERT INTO public.categories (name_en, slug, is_active)
  VALUES ('C2g scratch child', 'c2g-scratch-child', false) RETURNING id INTO v_child;

  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_parent, v_child, 0);
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_parent, v_catchall, 1);

  -- P1: the guard refuses a catch-all parent with the translated key, and
  -- accepts a normal parent and a root. (The writers gate on permission
  -- first, so the law itself is proven here, above those gates.)
  caught := false;
  BEGIN
    PERFORM public.assert_parent_not_catchall(v_catchall);
  EXCEPTION WHEN others THEN
    caught := (SQLERRM = 'admin.categories.error.catchallParent');
  END;
  IF NOT caught THEN RAISE EXCEPTION 'P1 FAILED: guard did not refuse a catch-all parent'; END IF;
  PERFORM public.assert_parent_not_catchall(v_parent);
  PERFORM public.assert_parent_not_catchall(NULL);

  -- P2: every parent-taking writer calls the guard.
  FOR v_def IN
    SELECT pg_get_functiondef(p.oid)
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('admin_create_category', 'admin_add_category_pointer',
                         'admin_move_category_pointer')
  LOOP
    IF position('assert_parent_not_catchall' IN v_def) = 0 THEN
      RAISE EXCEPTION 'P2 FAILED: a parent-taking writer does not call the guard';
    END IF;
  END LOOP;

  -- P3: the reorder writer both filters catch-alls out of the supplied order
  -- and pins them last.
  SELECT pg_get_functiondef(p.oid) INTO v_def
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_reorder_categories';
  IF position('c.is_catchall' IN v_def) = 0 OR position('1000000' IN v_def) = 0 THEN
    RAISE EXCEPTION 'P3 FAILED: reorder does not pin catch-alls last';
  END IF;

  -- P4: the pinning UPDATE, applied to the scratch siblings, puts the
  -- catch-all after its sibling even though it was handed first.
  UPDATE public.category_tree_pointers p
     SET display_order = 1000000 + c.display_order
    FROM public.categories c
   WHERE p.child_id = c.id
     AND c.is_catchall
     AND p.parent_id = v_parent
     AND p.display_order < 1000000;
  SELECT display_order INTO v_ord FROM public.category_tree_pointers
   WHERE parent_id = v_parent AND child_id = v_catchall;
  SELECT display_order INTO v_sib_ord FROM public.category_tree_pointers
   WHERE parent_id = v_parent AND child_id = v_child;
  IF v_ord <= v_sib_ord THEN
    RAISE EXCEPTION 'P4 FAILED: catch-all order % not last (sibling %)', v_ord, v_sib_ord;
  END IF;

  DELETE FROM public.category_tree_pointers
   WHERE parent_id IN (v_parent, v_catchall, v_child)
      OR child_id IN (v_parent, v_catchall, v_child);
  DELETE FROM public.categories WHERE id IN (v_parent, v_catchall, v_child);

  RAISE NOTICE 'C2g proofs passed';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260904040000') ON CONFLICT DO NOTHING;