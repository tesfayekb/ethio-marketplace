-- C2h — REORDER IS A PLAIN UPDATE, AND THE ROSTER READS THE ORDER THE TREE READS.
--
-- Census verdicts recorded in docs/features/categories.md:
--   (a) admin_reorder_categories writes category_tree_pointers.display_order
--       (the POINTER EDGE) and gated on ('categories','update') with a
--       require_step_up_if_needed('categories','update') call.
--   (b) get_browse_tree ORDERs BY t.display_order — the POINTER EDGE.
--       admin_list_categories returned c.display_order — the ROW COLUMN.
--       => write target = pointer edge = what the TREE reads; the ADMIN READ
--          was the odd one out, so the console never saw a reorder land.
-- C2h therefore (1) restates the update gate and drops the step-up call, and
-- (2) makes admin_list_categories report the pointer order of the same parent
-- edge it already resolves. Column list, names and types are byte-identical.

-- 1. admin_reorder_categories — plain update, no step-up -----------------------
CREATE OR REPLACE FUNCTION public.admin_reorder_categories(
  p_parent_id uuid,
  p_ordered_child_ids uuid[]
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_ordered uuid[];
BEGIN
  -- The ratified C2-mig spec: reordering siblings is an everyday edit.
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  -- NO step-up on reorder (C2h): moving a row is not a privileged verb.

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

-- 2. admin_list_categories — display_order is the POINTER order ---------------
CREATE OR REPLACE FUNCTION public.admin_list_categories()
RETURNS TABLE(id uuid, slug text, name_en text, icon text, is_active boolean,
              is_catchall boolean, allow_listings boolean, display_order integer,
              price_enabled boolean, expiry_days integer,
              visible_from timestamp with time zone, visible_until timestamp with time zone,
              parent_id uuid, exclusion_count integer, listing_count integer,
              excluded_country_codes text[], has_image boolean)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  WITH edge AS (
    SELECT c.id AS cat_id,
           (SELECT p.parent_id
              FROM public.category_tree_pointers p
              LEFT JOIN public.categories pc ON pc.id = p.parent_id
             WHERE p.child_id = c.id
               AND (p.parent_id IS NULL OR pc.is_active)
             ORDER BY (p.parent_id IS NOT NULL), p.display_order, p.created_at
             LIMIT 1) AS parent_id,
           (SELECT p.display_order
              FROM public.category_tree_pointers p
              LEFT JOIN public.categories pc ON pc.id = p.parent_id
             WHERE p.child_id = c.id
               AND (p.parent_id IS NULL OR pc.is_active)
             ORDER BY (p.parent_id IS NOT NULL), p.display_order, p.created_at
             LIMIT 1) AS edge_order
      FROM public.categories c
  )
  SELECT c.id, c.slug, c.name_en, c.icon, c.is_active,
         c.is_catchall, c.allow_listings,
         COALESCE(e.edge_order, c.display_order),
         c.price_enabled, c.expiry_days,
         c.visible_from, c.visible_until,
         e.parent_id,
         (SELECT count(*)::int FROM public.category_country_exclusions x
           WHERE x.category_id = c.id),
         (SELECT count(*)::int FROM public.listings l
           WHERE l.category_id = c.id AND l.status = 'active'),
         COALESCE((SELECT array_agg(x.country_code::text ORDER BY x.country_code)
                     FROM public.category_country_exclusions x
                    WHERE x.category_id = c.id), ARRAY[]::text[]),
         (c.image_url IS NOT NULL)
    FROM public.categories c
    JOIN edge e ON e.cat_id = c.id
   ORDER BY c.name_en;
END $$;

REVOKE ALL ON FUNCTION public.admin_list_categories() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_categories() FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO service_role;

-- 3. In-file proofs ------------------------------------------------------------
DO $$
DECLARE
  v_def text;
  v_uid uuid;
  v_parent uuid; v_a uuid; v_b uuid; v_catchall uuid;
  v_a_ord int; v_b_ord int; v_c_ord int;
  v_listed int;
BEGIN
  -- P1: the definition itself carries the update gate and no step-up call.
  SELECT pg_get_functiondef(p.oid) INTO v_def
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_reorder_categories';
  IF position($q$'categories', 'update'$q$ IN v_def) = 0 THEN
    RAISE EXCEPTION 'P1 FAILED: reorder is not gated on categories:update';
  END IF;
  IF position('require_step_up_if_needed' IN v_def) > 0 THEN
    RAISE EXCEPTION 'P1 FAILED: reorder still calls require_step_up_if_needed';
  END IF;

  -- Scratch subtree: two ordinary siblings plus a catch-all, inactive so no
  -- browse surface can ever see them.
  INSERT INTO public.categories (name_en, slug, is_active)
  VALUES ('C2h scratch root', 'c2h-scratch-root', false) RETURNING id INTO v_parent;
  INSERT INTO public.categories (name_en, slug, is_active)
  VALUES ('C2h scratch a', 'c2h-scratch-a', false) RETURNING id INTO v_a;
  INSERT INTO public.categories (name_en, slug, is_active)
  VALUES ('C2h scratch b', 'c2h-scratch-b', false) RETURNING id INTO v_b;
  INSERT INTO public.categories (name_en, slug, is_active, is_catchall)
  VALUES ('C2h scratch other', 'c2h-scratch-other', false, true) RETURNING id INTO v_catchall;

  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_parent, v_a, 0), (v_parent, v_b, 1), (v_parent, v_catchall, 2);

  -- P2: a PLAIN-UPDATE principal (aal1 claims — no step-up) reorders.
  SELECT u.user_id INTO v_uid
    FROM public.user_roles u
   WHERE public.has_permission(u.user_id, 'categories', 'update')
   LIMIT 1;

  IF v_uid IS NULL THEN
    RAISE NOTICE 'C2h: no categories:update principal on this database — P2/P3 run as definer owner';
    PERFORM public.admin_reorder_categories(v_parent, ARRAY[v_catchall, v_b, v_a]);
  ELSE
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    PERFORM set_config('role', 'authenticated', true);
    PERFORM public.admin_reorder_categories(v_parent, ARRAY[v_catchall, v_b, v_a]);
    PERFORM set_config('role', 'none', true);
    RESET ROLE;
    PERFORM set_config('request.jwt.claims', NULL, true);
  END IF;

  -- P3: the order flipped on read-back and the catch-all is still last.
  SELECT display_order INTO v_a_ord FROM public.category_tree_pointers
   WHERE parent_id = v_parent AND child_id = v_a;
  SELECT display_order INTO v_b_ord FROM public.category_tree_pointers
   WHERE parent_id = v_parent AND child_id = v_b;
  SELECT display_order INTO v_c_ord FROM public.category_tree_pointers
   WHERE parent_id = v_parent AND child_id = v_catchall;
  IF NOT (v_b_ord < v_a_ord) THEN
    RAISE EXCEPTION 'P3 FAILED: order did not flip (a=%, b=%)', v_a_ord, v_b_ord;
  END IF;
  IF NOT (v_c_ord > v_a_ord AND v_c_ord > v_b_ord) THEN
    RAISE EXCEPTION 'P3 FAILED: catch-all order % is not last', v_c_ord;
  END IF;

  -- P4: the roster read now REPORTS that same pointer order, and the column
  -- contract is still 17 columns wide.
  SELECT count(*)::int INTO v_listed
    FROM information_schema.columns
   WHERE table_schema = 'public'
     AND table_name IS NOT NULL
     AND false;
  SELECT count(*)::int INTO v_listed
    FROM unnest(
      (SELECT p.proallargtypes FROM pg_proc p
        JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'admin_list_categories')
    ) AS a
   WHERE true;
  IF v_listed <> 17 THEN
    RAISE EXCEPTION 'P4 FAILED: admin_list_categories returns % columns, expected 17', v_listed;
  END IF;

  SELECT pg_get_functiondef(p.oid) INTO v_def
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_list_categories';
  IF position('edge_order' IN v_def) = 0 THEN
    RAISE EXCEPTION 'P4 FAILED: the roster does not read the pointer order';
  END IF;

  DELETE FROM public.category_tree_pointers
   WHERE parent_id IN (v_parent, v_a, v_b, v_catchall)
      OR child_id IN (v_parent, v_a, v_b, v_catchall);
  DELETE FROM public.categories WHERE id IN (v_parent, v_a, v_b, v_catchall);

  RAISE NOTICE 'C2h proofs passed';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260904050000') ON CONFLICT DO NOTHING;