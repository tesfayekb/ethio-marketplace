-- C2j — ORPHAN-VISIBLE ROSTER (INC-146)
--
-- Census verdict (prod, 2026-09-03): 153 categories, 10 of them carry ZERO
-- pointer edges. Under the C2i body those 10 fall out of the LATERAL with a
-- NULL parent and are therefore walked AS ROOTS, interleaved among the
-- ratified top-level nodes and competing with them for root ranks. They are
-- not "missing" so much as MISPLACED — indistinguishable from a real root.
--
-- C2j makes the class explicit: the tree walk covers only categories that
-- actually have a pointer edge, and every edge-less category is appended
-- after the walk as an ORPHAN TAIL, ordered by slug, parent fields NULL.
-- The 17-column contract, the gate, STABLE/SECURITY DEFINER and the ACL are
-- byte-identical otherwise.

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
    -- Parent pick, unchanged: a NULL-root edge wins, else the lowest-order
    -- edge whose parent is ACTIVE. Only EDGED categories enter the walk.
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
    SELECT c.id, c.slug, c.name_en, c.is_catchall,
           e.parent_id,
           COALESCE(e.edge_order, c.display_order) AS fallback_order
      FROM public.categories c
      JOIN edge e ON e.cat_id = c.id
  ),
  ranked AS (
    SELECT n.id, n.parent_id,
           row_number() OVER (
             PARTITION BY n.parent_id
             ORDER BY n.is_catchall, n.fallback_order, n.name_en, n.id
           )::int AS rnk
      FROM node n
  ),
  walk AS (
    SELECT r.id, r.parent_id, r.rnk, ARRAY[r.rnk] AS path, 1 AS depth
      FROM ranked r
     WHERE r.parent_id IS NULL
    UNION ALL
    SELECT r.id, r.parent_id, r.rnk, w.path || r.rnk, w.depth + 1
      FROM ranked r
      JOIN walk w ON w.id = r.parent_id
     WHERE w.depth < 20
  ),
  orphan AS (
    SELECT c.id,
           NULL::uuid AS parent_id,
           row_number() OVER (ORDER BY c.slug)::int AS rnk,
           ARRAY[row_number() OVER (ORDER BY c.slug)::int] AS path
      FROM public.categories c
     WHERE NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p
                        WHERE p.child_id = c.id)
  ),
  listed AS (
    SELECT w.id, w.parent_id, w.rnk, w.path, 0 AS seg FROM walk w
    UNION ALL
    SELECT o.id, o.parent_id, o.rnk, o.path, 1 AS seg FROM orphan o
  )
  SELECT c.id, c.slug, c.name_en, c.icon, c.is_active,
         c.is_catchall, c.allow_listings,
         l.rnk,
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
   ORDER BY l.seg, l.path;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_categories() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO service_role;

-- ---------------------------------------------------------------- PROOFS
DO $proof$
DECLARE
  v_rows int; v_ids int; v_cats int;
  v_veh uuid; v_veh_parent uuid; v_cars_parent uuid;
  v_catchall int; v_maxsib int;
  v_orphan uuid; v_seen int; v_seg int; v_parent uuid;
BEGIN
  -- An EDGE-LESS scratch row is created here so the orphan class is proved,
  -- not assumed. It is deleted at the end of the proof block.
  INSERT INTO public.categories (name_en, slug)
  VALUES ('C2j proof orphan', 'zzz-c2j-proof-orphan')
  RETURNING id INTO v_orphan;

  -- The proofs run the BODY's query directly (the RPC itself is gated).
  CREATE TEMP TABLE c2j_out ON COMMIT DROP AS
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
    SELECT c.id, c.slug, c.name_en, c.is_catchall, e.parent_id,
           COALESCE(e.edge_order, c.display_order) AS fallback_order
      FROM public.categories c JOIN edge e ON e.cat_id = c.id
  ),
  ranked AS (
    SELECT n.id, n.parent_id,
           row_number() OVER (PARTITION BY n.parent_id
             ORDER BY n.is_catchall, n.fallback_order, n.name_en, n.id)::int AS rnk
      FROM node n
  ),
  walk AS (
    SELECT r.id, r.parent_id, r.rnk, ARRAY[r.rnk] AS path, 1 AS depth
      FROM ranked r WHERE r.parent_id IS NULL
    UNION ALL
    SELECT r.id, r.parent_id, r.rnk, w.path || r.rnk, w.depth + 1
      FROM ranked r JOIN walk w ON w.id = r.parent_id WHERE w.depth < 20
  ),
  orphan AS (
    SELECT c.id, NULL::uuid AS parent_id,
           row_number() OVER (ORDER BY c.slug)::int AS rnk,
           ARRAY[row_number() OVER (ORDER BY c.slug)::int] AS path
      FROM public.categories c
     WHERE NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p
                        WHERE p.child_id = c.id)
  ),
  listed AS (
    SELECT w.id, w.parent_id, w.rnk, w.path, 0 AS seg FROM walk w
    UNION ALL
    SELECT o.id, o.parent_id, o.rnk, o.path, 1 AS seg FROM orphan o
  )
  SELECT c.id, c.slug, c.is_catchall, l.parent_id, l.rnk, l.path, l.seg
    FROM listed l JOIN public.categories c ON c.id = l.id;

  SELECT count(*), count(DISTINCT id) INTO v_rows, v_ids FROM c2j_out;
  SELECT count(*) INTO v_cats FROM public.categories;
  IF v_rows <> v_cats THEN
    RAISE EXCEPTION 'P1 FAILED: rows % <> categories %', v_rows, v_cats;
  END IF;
  IF v_ids <> v_rows THEN
    RAISE EXCEPTION 'P2 FAILED: duplicates (% distinct of % rows)', v_ids, v_rows;
  END IF;

  -- P3 — the edge-less scratch row IS in the output, in the orphan tail,
  -- with NULL parent fields.
  SELECT count(*) INTO v_seen FROM c2j_out WHERE id = v_orphan;
  IF v_seen <> 1 THEN
    RAISE EXCEPTION 'P3 FAILED: edge-less row appears % time(s)', v_seen;
  END IF;
  SELECT seg, parent_id INTO v_seg, v_parent FROM c2j_out WHERE id = v_orphan;
  IF v_seg <> 1 OR v_parent IS NOT NULL THEN
    RAISE EXCEPTION 'P4 FAILED: edge-less row seg=% parent=%', v_seg, v_parent;
  END IF;

  SELECT id, parent_id INTO v_veh, v_veh_parent FROM c2j_out WHERE slug = 'vehicles';
  IF v_veh IS NULL OR v_veh_parent IS NOT NULL THEN
    RAISE EXCEPTION 'P5 FAILED: vehicles missing or not a root';
  END IF;
  IF (SELECT seg FROM c2j_out WHERE id = v_veh) <> 0 THEN
    RAISE EXCEPTION 'P6 FAILED: vehicles is not in the tree walk';
  END IF;
  SELECT parent_id INTO v_cars_parent FROM c2j_out WHERE slug = 'cars';
  IF v_cars_parent IS DISTINCT FROM v_veh THEN
    RAISE EXCEPTION 'P7 FAILED: cars not under vehicles';
  END IF;

  SELECT rnk INTO v_catchall FROM c2j_out WHERE parent_id = v_veh AND is_catchall;
  SELECT max(rnk) INTO v_maxsib FROM c2j_out WHERE parent_id = v_veh;
  IF v_catchall IS NULL OR v_catchall <> v_maxsib THEN
    RAISE EXCEPTION 'P8 FAILED: catch-all not last among vehicles siblings (% of %)',
      v_catchall, v_maxsib;
  END IF;

  DELETE FROM public.categories WHERE id = v_orphan;

  RAISE NOTICE 'C2j proofs OK: % rows, % distinct, orphan tail proved, catch-all last at %',
    v_rows, v_ids, v_catchall;
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260904070000') ON CONFLICT DO NOTHING;