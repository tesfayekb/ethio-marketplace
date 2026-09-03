-- C2k — PIN THE ROSTER ORDER (INC-147)
--
-- Census verdict (prod, 2026-09-03): category_tree_pointers.display_order is
-- NOT unique within a sibling group — 'vehicles' and 'electronics' both hold
-- root order 1 (legacy pre-C1 roots collide with the C1 roots), plus 15 other
-- colliding (parent, display_order) groups, including three-way 500 ties.
-- A numeric-path walk therefore cannot pin an order, and 'vehicles' loses the
-- first root to 'electronics' on any deterministic tie-break.
--
-- Operator ruling (2026-09-03): renumber in this same migration from a PINNED
-- source (no judgment calls) — roots take the ratified 14-slug sequence from
-- docs/spec/category-era/c1-target-taxonomy.md, other root edges follow by
-- slug; every child sibling group is dense-renumbered by (display_order, slug)
-- with catch-alls forced last. The roster then orders by the NUMERIC
-- order-path (root edge order, then each child edge order), ties by slug.

-- ------------------------------------------------- 1. ROOT EDGES, PINNED
UPDATE public.category_tree_pointers p
   SET display_order = v.ord
  FROM (
    SELECT c.id AS child_id, t.ord::int AS ord
      FROM unnest(ARRAY[
        'vehicles','electronics','fashion','home-garden','beauty-personal-care',
        'real-estate','services','sports-leisure','construction','travel',
        'agriculture-farming','pets-animals','babies-kids','commercial-equipment'
      ]) WITH ORDINALITY AS t(slug, ord)
      JOIN public.categories c ON c.slug = t.slug
  ) v
 WHERE p.parent_id IS NULL AND p.child_id = v.child_id;

-- Any root edge outside the ratified list (retired roots such as 'jobs')
-- is renumbered AFTER 14, by slug.
UPDATE public.category_tree_pointers p
   SET display_order = v.ord
  FROM (
    SELECT p2.child_id,
           14 + row_number() OVER (ORDER BY c.slug)::int AS ord
      FROM public.category_tree_pointers p2
      JOIN public.categories c ON c.id = p2.child_id
     WHERE p2.parent_id IS NULL
       AND c.slug <> ALL (ARRAY[
        'vehicles','electronics','fashion','home-garden','beauty-personal-care',
        'real-estate','services','sports-leisure','construction','travel',
        'agriculture-farming','pets-animals','babies-kids','commercial-equipment'])
  ) v
 WHERE p.parent_id IS NULL AND p.child_id = v.child_id;

-- ------------------------------------- 2. CHILD SIBLING GROUPS, DENSIFIED
-- Current relative order preserved deterministically by (display_order, slug);
-- catch-alls forced last (ties impossible after densification).
UPDATE public.category_tree_pointers p
   SET display_order = v.ord
  FROM (
    SELECT p2.id,
           row_number() OVER (
             PARTITION BY p2.parent_id
             ORDER BY c.is_catchall, p2.display_order, c.slug
           )::int AS ord
      FROM public.category_tree_pointers p2
      JOIN public.categories c ON c.id = p2.child_id
     WHERE p2.parent_id IS NOT NULL
  ) v
 WHERE p.id = v.id;

-- --------------------------------------------------- 3. THE ROSTER READ
CREATE OR REPLACE FUNCTION public.admin_list_categories()
RETURNS TABLE(
  id uuid, slug text, name_en text, icon text, is_active boolean,
  is_catchall boolean, allow_listings boolean, display_order integer,
  price_enabled boolean, expiry_days integer,
  visible_from timestamptz, visible_until timestamptz,
  parent_id uuid, exclusion_count integer, listing_count integer,
  excluded_country_codes text[], has_image boolean
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

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
         ORDER BY (p.parent_id IS NOT NULL), p.display_order, p.created_at
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
  )
  SELECT c.id, c.slug, c.name_en, c.icon, c.is_active,
         c.is_catchall, c.allow_listings,
         l.edge_order,
         c.price_enabled, c.expiry_days,
         c.visible_from, c.visible_until,
         l.parent_id,
         (SELECT count(*)::int FROM public.category_country_exclusions x
           WHERE x.category_id = c.id),
         (SELECT count(*)::int FROM public.listings li
           WHERE li.category_id = c.id AND li.status = 'active'),
         COALESCE((SELECT array_agg(x.country_code::text ORDER BY x.country_code)
                     FROM public.category_country_exclusions x
                    WHERE x.category_id = c.id), ARRAY[]::text[]),
         (c.image_url IS NOT NULL)
    FROM listed l
    JOIN public.categories c ON c.id = l.id
   ORDER BY l.seg, l.path, l.slug;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_categories() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO service_role;

-- ---------------------------------------------------------------- PROOFS
DO $proof$
DECLARE
  v_rows int; v_ids int; v_cats int; v_dupes int;
  v_veh uuid; v_veh_parent uuid; v_cars_parent uuid;
  v_catchall int; v_maxsib int;
  v_orphan uuid; v_seen int; v_seg int; v_parent uuid;
  v_roots text[]; v_first text;
  v_expected text[] := ARRAY[
    'vehicles','electronics','fashion','home-garden','beauty-personal-care',
    'real-estate','services','sports-leisure','construction','travel',
    'agriculture-farming','pets-animals','babies-kids','commercial-equipment'];
BEGIN
  -- P0 — per-parent uniqueness over the WHOLE pointer table.
  SELECT count(*) INTO v_dupes FROM (
    SELECT parent_id, display_order FROM public.category_tree_pointers
     GROUP BY 1, 2 HAVING count(*) > 1) d;
  IF v_dupes <> 0 THEN
    RAISE EXCEPTION 'P0 FAILED: % colliding sibling groups remain', v_dupes;
  END IF;

  INSERT INTO public.categories (name_en, slug)
  VALUES ('C2k proof orphan', 'zzz-c2k-proof-orphan')
  RETURNING id INTO v_orphan;

  CREATE TEMP TABLE c2k_out ON COMMIT DROP AS
  WITH RECURSIVE edge AS (
    SELECT c.id AS cat_id, e.parent_id, e.display_order AS edge_order
      FROM public.categories c
      LEFT JOIN LATERAL (
        SELECT p.parent_id, p.display_order
          FROM public.category_tree_pointers p
          LEFT JOIN public.categories pc ON pc.id = p.parent_id
         WHERE p.child_id = c.id
           AND (p.parent_id IS NULL OR pc.is_active)
         ORDER BY (p.parent_id IS NOT NULL), p.display_order, p.created_at
         LIMIT 1
      ) e ON TRUE
     WHERE EXISTS (SELECT 1 FROM public.category_tree_pointers p2
                    WHERE p2.child_id = c.id)
  ),
  node AS (
    SELECT c.id, c.slug, c.is_catchall, e.parent_id,
           COALESCE(e.edge_order, c.display_order) AS edge_order
      FROM public.categories c JOIN edge e ON e.cat_id = c.id
  ),
  walk AS (
    SELECT n.id, n.slug, n.parent_id, n.edge_order,
           ARRAY[n.edge_order] AS path, 1 AS depth
      FROM node n WHERE n.parent_id IS NULL
    UNION ALL
    SELECT n.id, n.slug, n.parent_id, n.edge_order,
           w.path || n.edge_order, w.depth + 1
      FROM node n JOIN walk w ON w.id = n.parent_id WHERE w.depth < 20
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
  )
  SELECT c.id, c.slug, c.is_catchall, l.parent_id, l.edge_order AS rnk,
         l.path, l.seg,
         row_number() OVER (ORDER BY l.seg, l.path, l.slug)::int AS pos
    FROM listed l JOIN public.categories c ON c.id = l.id;

  SELECT count(*), count(DISTINCT id) INTO v_rows, v_ids FROM c2k_out;
  SELECT count(*) INTO v_cats FROM public.categories;
  IF v_rows <> v_cats THEN
    RAISE EXCEPTION 'P1 FAILED: rows % <> categories %', v_rows, v_cats;
  END IF;
  IF v_ids <> v_rows THEN
    RAISE EXCEPTION 'P2 FAILED: duplicates (% distinct of % rows)', v_ids, v_rows;
  END IF;

  SELECT count(*) INTO v_seen FROM c2k_out WHERE id = v_orphan;
  IF v_seen <> 1 THEN
    RAISE EXCEPTION 'P3 FAILED: edge-less row appears % time(s)', v_seen;
  END IF;
  SELECT seg, parent_id INTO v_seg, v_parent FROM c2k_out WHERE id = v_orphan;
  IF v_seg <> 1 OR v_parent IS NOT NULL THEN
    RAISE EXCEPTION 'P4 FAILED: edge-less row seg=% parent=%', v_seg, v_parent;
  END IF;

  SELECT id, parent_id INTO v_veh, v_veh_parent FROM c2k_out WHERE slug = 'vehicles';
  IF v_veh IS NULL OR v_veh_parent IS NOT NULL THEN
    RAISE EXCEPTION 'P5 FAILED: vehicles missing or not a root';
  END IF;

  -- P6 STRICT — the first walked root is 'vehicles' AND the walked root
  -- sequence equals the ratified root-edge display_order sequence exactly.
  SELECT array_agg(slug ORDER BY pos) INTO v_roots
    FROM c2k_out WHERE seg = 0 AND parent_id IS NULL;
  v_first := v_roots[1];
  IF v_first <> 'vehicles' THEN
    RAISE EXCEPTION 'P6 FAILED: first walked root is %', v_first;
  END IF;
  IF v_roots[1:14] IS DISTINCT FROM v_expected THEN
    RAISE EXCEPTION 'P6 FAILED: walked root sequence % <> ratified sequence',
      v_roots[1:14];
  END IF;
  IF EXISTS (
    SELECT 1 FROM c2k_out a
      JOIN public.category_tree_pointers p
        ON p.child_id = a.id AND p.parent_id IS NULL
     WHERE a.seg = 0 AND a.parent_id IS NULL
       AND a.rnk <> p.display_order) THEN
    RAISE EXCEPTION 'P6 FAILED: walked root order <> root-edge display_order';
  END IF;

  SELECT parent_id INTO v_cars_parent FROM c2k_out WHERE slug = 'cars';
  IF v_cars_parent IS DISTINCT FROM v_veh THEN
    RAISE EXCEPTION 'P7 FAILED: cars not under vehicles';
  END IF;

  SELECT rnk INTO v_catchall FROM c2k_out WHERE parent_id = v_veh AND is_catchall;
  SELECT max(rnk) INTO v_maxsib FROM c2k_out WHERE parent_id = v_veh;
  IF v_catchall IS NULL OR v_catchall <> v_maxsib THEN
    RAISE EXCEPTION 'P8 FAILED: catch-all not last among vehicles siblings (% of %)',
      v_catchall, v_maxsib;
  END IF;

  DELETE FROM public.categories WHERE id = v_orphan;

  RAISE NOTICE 'C2k proofs OK: % rows, % distinct, roots pinned, catch-all last at %',
    v_rows, v_ids, v_catchall;
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260904080000') ON CONFLICT DO NOTHING;