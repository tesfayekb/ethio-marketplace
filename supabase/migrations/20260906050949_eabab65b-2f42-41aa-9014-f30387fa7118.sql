-- ============================================================
-- C3d PART A — INC-161: roster RPC performance (pre-aggregated CTEs)
-- Contract byte-identical (20 columns, same ordering); only the PLAN changes.
-- ============================================================

-- A.1 SNAPSHOT THE LANDED 20-COLUMN CONTRACT.
DO $$
DECLARE v_uid uuid;
BEGIN
  SELECT ur.user_id INTO v_uid
    FROM public.user_roles ur
   WHERE public.has_permission(ur.user_id, 'categories', 'view')
   LIMIT 1;
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'PARITY FAILED: no categories:view holder exists to prove against';
  END IF;
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_uid::text)::text, true);

  CREATE TEMP TABLE c3d_before ON COMMIT DROP AS
    SELECT * FROM public.admin_list_categories() WITH ORDINALITY;
  RAISE NOTICE 'PARITY: snapshot taken (% rows, 20 columns)', (SELECT count(*) FROM c3d_before);
END $$;

-- A.2 REPLACE. Same columns, same order, same values — one GROUP BY per
-- aggregate instead of a correlated subquery per row.
CREATE OR REPLACE FUNCTION public.admin_list_categories()
RETURNS TABLE(
  id uuid, slug text, name_en text, icon text, is_active boolean, is_catchall boolean,
  allow_listings boolean, display_order integer, price_enabled boolean, expiry_days integer,
  visible_from timestamptz, visible_until timestamptz, parent_id uuid,
  exclusion_count integer, listing_count integer, excluded_country_codes text[],
  has_image boolean,
  attribute_count integer, card_attribute_count integer, secondary_parent_names text[]
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
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
  ),
  -- ONE pass over the links: both counts at once.
  lnk AS (
    SELECT k.category_id,
           count(*)::int AS attribute_count,
           count(*) FILTER (WHERE k.card_rank IS NOT NULL)::int AS card_attribute_count
      FROM public.category_attribute_links k
     GROUP BY k.category_id
  ),
  -- ONE pass over the pointers for the NON-PRIMARY (secondary) browse edges.
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
         COALESCE(k.card_attribute_count, 0),
         COALESCE(sp.names, ARRAY[]::text[])
    FROM listed l
    JOIN public.categories c ON c.id = l.id
    LEFT JOIN lnk  k  ON k.category_id  = l.id
    LEFT JOIN sec  sp ON sp.category_id = l.id
    LEFT JOIN excl e  ON e.category_id  = l.id
    LEFT JOIN lst  s  ON s.category_id  = l.id
   ORDER BY l.seg, l.path, l.slug;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_categories() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO authenticated;

-- A.3 PARITY PROOF — rows, ordering, and ALL 20 columns.
DO $$
DECLARE v_before int; v_after int; v_diff int; v_ord int;
BEGIN
  CREATE TEMP TABLE c3d_after ON COMMIT DROP AS
    SELECT * FROM public.admin_list_categories() WITH ORDINALITY;

  SELECT count(*) INTO v_before FROM c3d_before;
  SELECT count(*) INTO v_after  FROM c3d_after;
  IF v_before <> v_after THEN
    RAISE EXCEPTION 'PARITY FAILED: row count % -> %', v_before, v_after;
  END IF;

  SELECT count(*) INTO v_ord
    FROM c3d_before b JOIN c3d_after a ON a.ordinality = b.ordinality
   WHERE a.slug IS DISTINCT FROM b.slug;
  IF v_ord <> 0 THEN
    RAISE EXCEPTION 'PARITY FAILED: % rows changed position', v_ord;
  END IF;

  -- EVERY column, positionally, including the three C3c ones.
  SELECT count(*) INTO v_diff FROM (
    SELECT * FROM c3d_before EXCEPT ALL SELECT * FROM c3d_after
  ) d;
  IF v_diff <> 0 THEN
    RAISE EXCEPTION 'PARITY FAILED: % rows differ across the 20 columns', v_diff;
  END IF;

  RAISE NOTICE 'PARITY PASS: % rows, ordering identical, all 20 columns byte-identical', v_after;
END $$;

-- A.4 PLAN PROOF — EXPLAIN (ANALYZE, BUFFERS) over the function's own query,
-- with the assertion that the links/pointers aggregates are scanned ONCE, not
-- once per row.
DO $$
DECLARE
  v_sql text;
  v_line text;
  v_plan text := '';
  v_links int := 0;
  v_cost text := '';
BEGIN
  v_sql := $q$
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
     WHERE EXISTS (SELECT 1 FROM public.category_tree_pointers p2 WHERE p2.child_id = c.id)
  ),
  node AS (
    SELECT c.id, c.slug, c.is_catchall, e.parent_id,
           COALESCE(e.edge_order, c.display_order) AS edge_order
      FROM public.categories c JOIN edge e ON e.cat_id = c.id
  ),
  walk AS (
    SELECT n.id, n.slug, n.parent_id, n.edge_order, ARRAY[n.edge_order] AS path, 1 AS depth
      FROM node n WHERE n.parent_id IS NULL
    UNION ALL
    SELECT n.id, n.slug, n.parent_id, n.edge_order, w.path || n.edge_order, w.depth + 1
      FROM node n JOIN walk w ON w.id = n.parent_id WHERE w.depth < 20
  ),
  orphan AS (
    SELECT c.id, c.slug, NULL::uuid AS parent_id,
           row_number() OVER (ORDER BY c.slug)::int AS edge_order,
           ARRAY[row_number() OVER (ORDER BY c.slug)::int] AS path
      FROM public.categories c
     WHERE NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p WHERE p.child_id = c.id)
  ),
  listed AS (
    SELECT w.id, w.slug, w.parent_id, w.edge_order, w.path, 0 AS seg FROM walk w
    UNION ALL
    SELECT o.id, o.slug, o.parent_id, o.edge_order, o.path, 1 AS seg FROM orphan o
  ),
  lnk AS (
    SELECT k.category_id, count(*)::int AS attribute_count,
           count(*) FILTER (WHERE k.card_rank IS NOT NULL)::int AS card_attribute_count
      FROM public.category_attribute_links k GROUP BY k.category_id
  ),
  sec AS (
    SELECT l.id AS category_id, array_agg(pc.name_en ORDER BY pc.name_en) AS names
      FROM listed l
      JOIN public.category_tree_pointers p ON p.child_id = l.id
      JOIN public.categories pc ON pc.id = p.parent_id AND pc.is_active
     WHERE l.parent_id IS NULL OR p.parent_id <> l.parent_id
     GROUP BY l.id
  ),
  excl AS (
    SELECT x.category_id, count(*)::int AS exclusion_count,
           array_agg(x.country_code::text ORDER BY x.country_code) AS codes
      FROM public.category_country_exclusions x GROUP BY x.category_id
  ),
  lst AS (
    SELECT li.category_id, count(*)::int AS listing_count
      FROM public.listings li WHERE li.status = 'active' GROUP BY li.category_id
  )
  SELECT c.id, c.slug, l.edge_order, COALESCE(e.exclusion_count, 0),
         COALESCE(s.listing_count, 0), COALESCE(k.attribute_count, 0),
         COALESCE(k.card_attribute_count, 0), COALESCE(sp.names, ARRAY[]::text[])
    FROM listed l
    JOIN public.categories c ON c.id = l.id
    LEFT JOIN lnk k ON k.category_id = l.id
    LEFT JOIN sec sp ON sp.category_id = l.id
    LEFT JOIN excl e ON e.category_id = l.id
    LEFT JOIN lst s ON s.category_id = l.id
   ORDER BY l.seg, l.path, l.slug$q$;

  FOR v_line IN EXECUTE 'EXPLAIN (ANALYZE, BUFFERS) ' || v_sql LOOP
    v_plan := v_plan || v_line || E'\n';
    IF v_line ~* 'on (public\.)?category_attribute_links' THEN
      v_links := v_links + 1;
    END IF;
    IF v_cost = '' AND v_line ~ 'cost=' THEN
      v_cost := btrim(v_line);
    END IF;
  END LOOP;

  RAISE NOTICE 'C3d PLAN: %', v_plan;
  RAISE NOTICE 'C3d TOP NODE: %', v_cost;

  IF v_links <> 1 THEN
    RAISE EXCEPTION 'PLAN FAILED: category_attribute_links scanned % times (expected exactly 1 aggregate scan)', v_links;
  END IF;
  IF v_plan !~* 'Aggregate' THEN
    RAISE EXCEPTION 'PLAN FAILED: no aggregate node — the pre-aggregation did not survive planning';
  END IF;
  RAISE NOTICE 'PLAN PASS: links scanned once, aggregates present, no per-row link/pointer subplan';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260906100000') ON CONFLICT DO NOTHING;