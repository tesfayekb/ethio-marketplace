-- C2i — ADMIN_LIST_CATEGORIES ROW-COMPLETENESS / ORDER CORRECTIVE
--
-- Census verdict (prod, 2026-09-03): NO dropped rows and NO duplicates —
-- 153 rows, 153 distinct ids, 153 categories. The defect is ORDER
-- DISPLACEMENT: the body returned `ORDER BY c.name_en` and reported the raw
-- pointer-edge display_order, which collides wholesale once the console
-- re-groups by parent (ord=1 is shared by vehicles, electronics,
-- full-time-jobs and compact-sedans; 26 "roots" including 12 inactive
-- orphans). The roster therefore interleaved unrelated nodes.
--
-- The fix: walk the derived parent map depth-first on POINTER-EDGE order,
-- catch-alls pinned last among siblings, and report a DENSE per-parent rank
-- as display_order so the position is unique within its group. Parent pick,
-- 17-column contract, has_image, gate, STABLE and ACL are unchanged.

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
    -- edge whose parent is ACTIVE. One row per category, always.
    SELECT c.id AS cat_id,
           e.parent_id,
           e.display_order AS edge_order
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
  ),
  node AS (
    SELECT c.id, c.slug, c.name_en, c.is_catchall,
           e.parent_id, e.edge_order,
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
  )
  SELECT c.id, c.slug, c.name_en, c.icon, c.is_active,
         c.is_catchall, c.allow_listings,
         w.rnk,
         c.price_enabled, c.expiry_days,
         c.visible_from, c.visible_until,
         w.parent_id,
         (SELECT count(*)::int FROM public.category_country_exclusions x
           WHERE x.category_id = c.id),
         (SELECT count(*)::int FROM public.listings l
           WHERE l.category_id = c.id AND l.status = 'active'),
         COALESCE((SELECT array_agg(x.country_code::text ORDER BY x.country_code)
                     FROM public.category_country_exclusions x
                    WHERE x.category_id = c.id), ARRAY[]::text[]),
         (c.image_url IS NOT NULL)
    FROM walk w
    JOIN public.categories c ON c.id = w.id
   ORDER BY w.path;
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
BEGIN
  -- The proofs run the BODY's query directly (the RPC itself is gated).
  CREATE TEMP TABLE c2i_out ON COMMIT DROP AS
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
  )
  SELECT c.id, c.slug, c.is_catchall, w.parent_id, w.rnk, w.path
    FROM walk w JOIN public.categories c ON c.id = w.id;

  SELECT count(*), count(DISTINCT id) INTO v_rows, v_ids FROM c2i_out;
  SELECT count(*) INTO v_cats FROM public.categories;
  IF v_rows <> v_cats THEN
    RAISE EXCEPTION 'P1 FAILED: rows % <> categories %', v_rows, v_cats;
  END IF;
  IF v_ids <> v_rows THEN
    RAISE EXCEPTION 'P2 FAILED: duplicates (% distinct of % rows)', v_ids, v_rows;
  END IF;

  SELECT id, parent_id INTO v_veh, v_veh_parent FROM c2i_out WHERE slug = 'vehicles';
  IF v_veh IS NULL OR v_veh_parent IS NOT NULL THEN
    RAISE EXCEPTION 'P3 FAILED: vehicles missing or not a root';
  END IF;
  SELECT parent_id INTO v_cars_parent FROM c2i_out WHERE slug = 'cars';
  IF v_cars_parent IS DISTINCT FROM v_veh THEN
    RAISE EXCEPTION 'P4 FAILED: cars not under vehicles';
  END IF;

  SELECT rnk INTO v_catchall FROM c2i_out WHERE parent_id = v_veh AND is_catchall;
  SELECT max(rnk) INTO v_maxsib FROM c2i_out WHERE parent_id = v_veh;
  IF v_catchall IS NULL OR v_catchall <> v_maxsib THEN
    RAISE EXCEPTION 'P5 FAILED: catch-all not last among vehicles siblings (% of %)',
      v_catchall, v_maxsib;
  END IF;

  RAISE NOTICE 'C2i proofs OK: % rows, % distinct, catch-all last at %',
    v_rows, v_ids, v_catchall;
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260904060000') ON CONFLICT DO NOTHING;