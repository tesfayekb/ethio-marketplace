-- ============================================================
-- C3c PART A — roster widening (parity-proven) + attribute merge door
-- ============================================================
-- A.1 SNAPSHOT THE FROZEN CONTRACT (INC-139 parity law).
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

  CREATE TEMP TABLE c3c_before ON COMMIT DROP AS
    SELECT * FROM public.admin_list_categories() WITH ORDINALITY;
  RAISE NOTICE 'PARITY: snapshot of the frozen 17-column contract taken (% rows)',
    (SELECT count(*) FROM c3c_before);
END $$;

-- A.2 WIDEN. Three columns are APPENDED; every existing column, its type and
-- the row ordering are byte-identical (proven below).
DROP FUNCTION IF EXISTS public.admin_list_categories();

CREATE FUNCTION public.admin_list_categories()
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
         (c.image_url IS NOT NULL),
         -- C3c: the link counts and the SECONDARY browse parents.
         (SELECT count(*)::int FROM public.category_attribute_links k
           WHERE k.category_id = c.id),
         (SELECT count(*)::int FROM public.category_attribute_links k
           WHERE k.category_id = c.id AND k.card_rank IS NOT NULL),
         COALESCE((SELECT array_agg(pc.name_en ORDER BY pc.name_en)
                     FROM public.category_tree_pointers p
                     JOIN public.categories pc ON pc.id = p.parent_id
                    WHERE p.child_id = c.id
                      AND pc.is_active
                      AND (l.parent_id IS NULL OR p.parent_id <> l.parent_id)),
                  ARRAY[]::text[])
    FROM listed l
    JOIN public.categories c ON c.id = l.id
   ORDER BY l.seg, l.path, l.slug;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_categories() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO authenticated;

-- A.3 PARITY PROOF — row count, ordering, key rows and every old column.
DO $$
DECLARE v_before int; v_after int; v_diff int; v_ord int; v_key int;
BEGIN
  CREATE TEMP TABLE c3c_after ON COMMIT DROP AS
    SELECT * FROM public.admin_list_categories() WITH ORDINALITY;

  SELECT count(*) INTO v_before FROM c3c_before;
  SELECT count(*) INTO v_after  FROM c3c_after;
  IF v_before <> v_after THEN
    RAISE EXCEPTION 'PARITY FAILED: row count % -> %', v_before, v_after;
  END IF;

  SELECT count(*) INTO v_ord
    FROM c3c_before b JOIN c3c_after a ON a.ordinality = b.ordinality
   WHERE a.slug IS DISTINCT FROM b.slug;
  IF v_ord <> 0 THEN
    RAISE EXCEPTION 'PARITY FAILED: % rows changed position', v_ord;
  END IF;

  SELECT count(*) INTO v_diff FROM (
    SELECT id, slug, name_en, icon, is_active, is_catchall, allow_listings, display_order,
           price_enabled, expiry_days, visible_from, visible_until, parent_id,
           exclusion_count, listing_count, excluded_country_codes, has_image FROM c3c_before
    EXCEPT ALL
    SELECT id, slug, name_en, icon, is_active, is_catchall, allow_listings, display_order,
           price_enabled, expiry_days, visible_from, visible_until, parent_id,
           exclusion_count, listing_count, excluded_country_codes, has_image FROM c3c_after
  ) d;
  IF v_diff <> 0 THEN
    RAISE EXCEPTION 'PARITY FAILED: % old-column rows differ', v_diff;
  END IF;

  SELECT count(*) INTO v_key FROM c3c_after
   WHERE slug IN ('vehicles','jobs','real-estate','services');
  IF v_key < 4 THEN
    RAISE EXCEPTION 'PARITY FAILED: key rows missing (found %)', v_key;
  END IF;

  RAISE NOTICE 'PARITY PASS: % rows, ordering identical, 17 old columns byte-identical, key rows present',
    v_after;
  RAISE NOTICE 'C3c: attribute links seen = %, card ranks seen = %, rows with secondary parents = %',
    (SELECT COALESCE(sum(attribute_count), 0) FROM c3c_after),
    (SELECT COALESCE(sum(card_attribute_count), 0) FROM c3c_after),
    (SELECT count(*) FROM c3c_after WHERE array_length(secondary_parent_names, 1) > 0);
END $$;

-- ============================================================
-- A.4 PER-CATEGORY LINK LISTING
-- The link manager cannot read category_attribute_links directly (both C3b
-- tables carry `no client access` policies), so the gated read lands here.
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_list_category_attribute_links(p_category_id uuid)
RETURNS TABLE(
  link_id uuid, attribute_id uuid, attr_key text, name_en text, attr_type text,
  options jsonb, is_required boolean, is_filterable boolean,
  display_order integer, card_rank integer
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
  SELECT l.id, a.id, a.attr_key, a.name_en, a.attr_type, a.options,
         l.is_required, l.is_filterable, l.display_order, l.card_rank
    FROM public.category_attribute_links l
    JOIN public.attributes a ON a.id = l.attribute_id
   WHERE l.category_id = p_category_id
   ORDER BY l.display_order, a.name_en;
END $$;

REVOKE ALL ON FUNCTION public.admin_list_category_attribute_links(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_category_attribute_links(uuid) TO authenticated;

-- ============================================================
-- A.5 MERGE — worker + gate (the project's *_impl split, so the positive
-- path is provable in-file while the door itself stays step-up gated).
-- ============================================================
CREATE OR REPLACE FUNCTION public.merge_attributes_impl(p_target uuid, p_sources uuid[])
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_sources uuid[];
  v_moved integer := 0;
  v_folded integer := 0;
  v_removed integer := 0;
  v_key text;
BEGIN
  SELECT a.attr_key INTO v_key FROM public.attributes a WHERE a.id = p_target;
  IF v_key IS NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
  END IF;

  SELECT COALESCE(array_agg(DISTINCT s), ARRAY[]::uuid[]) INTO v_sources
    FROM unnest(COALESCE(p_sources, ARRAY[]::uuid[])) s WHERE s IS NOT NULL;

  IF array_length(v_sources, 1) IS NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.mergeNoSources' USING ERRCODE = 'P0010';
  END IF;
  IF p_target = ANY (v_sources) THEN
    RAISE EXCEPTION 'admin.attributes.error.mergeTargetInSources' USING ERRCODE = 'P0010';
  END IF;

  -- (1) A category that ALREADY carries the target keeps ONE link and the
  --     STRICTER flags; the source link is folded away.
  UPDATE public.category_attribute_links t
     SET is_required   = t.is_required OR s.is_required,
         is_filterable = t.is_filterable OR s.is_filterable,
         updated_at    = now()
    FROM public.category_attribute_links s
   WHERE s.attribute_id = ANY (v_sources)
     AND t.attribute_id = p_target
     AND t.category_id = s.category_id;

  WITH folded AS (
    DELETE FROM public.category_attribute_links s
     WHERE s.attribute_id = ANY (v_sources)
       AND EXISTS (SELECT 1 FROM public.category_attribute_links t
                    WHERE t.attribute_id = p_target AND t.category_id = s.category_id)
    RETURNING 1
  ) SELECT count(*)::int INTO v_folded FROM folded;

  -- (1b) SIBLING SOURCES COLLIDE TOO: a category carrying two source links
  --      keeps ONE (the lowest-ordered) with the union of the flags.
  UPDATE public.category_attribute_links l
     SET is_required   = agg.req,
         is_filterable = agg.filt,
         updated_at    = now()
    FROM (
      SELECT category_id,
             bool_or(is_required) AS req,
             bool_or(is_filterable) AS filt,
             (array_agg(id ORDER BY display_order, id))[1] AS keeper
        FROM public.category_attribute_links
       WHERE attribute_id = ANY (v_sources)
       GROUP BY category_id
    ) agg
   WHERE l.id = agg.keeper;

  WITH sibling AS (
    DELETE FROM public.category_attribute_links l
     WHERE l.attribute_id = ANY (v_sources)
       AND l.id <> (SELECT (array_agg(k.id ORDER BY k.display_order, k.id))[1]
                      FROM public.category_attribute_links k
                     WHERE k.attribute_id = ANY (v_sources)
                       AND k.category_id = l.category_id)
    RETURNING 1
  ) SELECT v_folded + count(*)::int INTO v_folded FROM sibling;

  -- (2) Every surviving source link is RE-POINTED at the target.
  WITH moved AS (
    UPDATE public.category_attribute_links l
       SET attribute_id = p_target, updated_at = now()
     WHERE l.attribute_id = ANY (v_sources)
    RETURNING 1
  ) SELECT count(*)::int INTO v_moved FROM moved;

  -- (3) The now-unreferenced source definitions are removed.
  WITH gone AS (
    DELETE FROM public.attributes a WHERE a.id = ANY (v_sources) RETURNING 1
  ) SELECT count(*)::int INTO v_removed FROM gone;

  RETURN jsonb_build_object('moved', v_moved, 'folded', v_folded, 'removed', v_removed);
END $$;

REVOKE ALL ON FUNCTION public.merge_attributes_impl(uuid, uuid[]) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.admin_merge_attributes(p_target uuid, p_sources uuid[])
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_counts jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  v_counts := public.merge_attributes_impl(p_target, p_sources);

  PERFORM public.log_audit('attribute.merge', 'attributes', p_target::text,
    jsonb_build_object('sources', to_jsonb(p_sources), 'counts', v_counts));

  RETURN v_counts;
END $$;

REVOKE ALL ON FUNCTION public.admin_merge_attributes(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_merge_attributes(uuid, uuid[]) TO authenticated;

-- ============================================================
-- PROOFS (in-file; every failure aborts the migration)
-- ============================================================
DO $$
DECLARE
  v_cat uuid; v_cat2 uuid; v_t uuid; v_s1 uuid; v_s2 uuid;
  v_counts jsonb; v_ok boolean; v_n int; v_req boolean;
BEGIN
  -- The parity snapshot borrowed a permitted identity for one statement; the
  -- refusal proofs below must run as NOBODY, so the claim is cleared first.
  PERFORM set_config('request.jwt.claims', '', true);

  -- Scratch definitions + two scratch categories.
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
       VALUES ('c3c_proof_target', 'C3c target', 'text') RETURNING id INTO v_t;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
       VALUES ('c3c_proof_src1', 'C3c source 1', 'text') RETURNING id INTO v_s1;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
       VALUES ('c3c_proof_src2', 'C3c source 2', 'text') RETURNING id INTO v_s2;

  INSERT INTO public.categories (name_en, slug, display_order)
       VALUES ('C3c proof A', 'c3c-proof-a', 9001) RETURNING id INTO v_cat;
  INSERT INTO public.categories (name_en, slug, display_order)
       VALUES ('C3c proof B', 'c3c-proof-b', 9002) RETURNING id INTO v_cat2;

  -- A: carries the target AND source 1 (fold, stricter is_required wins).
  INSERT INTO public.category_attribute_links (category_id, attribute_id, is_required, display_order)
       VALUES (v_cat, v_t, false, 0), (v_cat, v_s1, true, 1);
  -- B: carries source 1 and source 2 only (both re-point).
  INSERT INTO public.category_attribute_links (category_id, attribute_id, is_required, display_order)
       VALUES (v_cat2, v_s1, false, 0), (v_cat2, v_s2, false, 1);

  -- P1: the GATED door refuses an unpermitted caller (auth.uid() is NULL here).
  v_ok := false;
  BEGIN PERFORM public.admin_merge_attributes(v_t, ARRAY[v_s1]);
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'permission denied'); END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P1 FAILED: admin_merge_attributes allowed an ungated caller'; END IF;
  RAISE NOTICE 'P1 PASS: admin_merge_attributes refuses an ungated caller';

  -- P2: target in sources is refused.
  v_ok := false;
  BEGIN PERFORM public.merge_attributes_impl(v_t, ARRAY[v_t, v_s1]);
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'admin.attributes.error.mergeTargetInSources'); END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P2 FAILED: target inside sources was accepted'; END IF;
  RAISE NOTICE 'P2 PASS: a merge into itself is refused';

  -- P3: the real merge — 1 link moves, 2 fold, 2 definitions are removed.
  v_counts := public.merge_attributes_impl(v_t, ARRAY[v_s1, v_s2]);
  IF (v_counts->>'moved')::int <> 1 OR (v_counts->>'folded')::int <> 2
     OR (v_counts->>'removed')::int <> 2 THEN
    RAISE EXCEPTION 'P3 FAILED: unexpected counts %', v_counts;
  END IF;

  SELECT count(*)::int INTO v_n FROM public.attributes
   WHERE id IN (v_s1, v_s2);
  IF v_n <> 0 THEN RAISE EXCEPTION 'P3 FAILED: % source definitions survived', v_n; END IF;

  SELECT count(*)::int INTO v_n FROM public.category_attribute_links
   WHERE category_id = v_cat AND attribute_id = v_t;
  IF v_n <> 1 THEN RAISE EXCEPTION 'P3 FAILED: category A holds % target links', v_n; END IF;

  SELECT l.is_required INTO v_req FROM public.category_attribute_links l
   WHERE l.category_id = v_cat AND l.attribute_id = v_t;
  IF NOT v_req THEN RAISE EXCEPTION 'P3 FAILED: the stricter is_required was not carried'; END IF;

  SELECT count(*)::int INTO v_n FROM public.category_attribute_links
   WHERE category_id = v_cat2 AND attribute_id = v_t;
  IF v_n <> 1 THEN RAISE EXCEPTION 'P3 FAILED: category B holds % target links', v_n; END IF;
  RAISE NOTICE 'P3 PASS: merge relinked 1, folded 2 (stricter required carried), removed 2';

  -- P4: the link listing refuses an unpermitted caller.
  v_ok := false;
  BEGIN PERFORM count(*) FROM public.admin_list_category_attribute_links(v_cat);
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'permission denied'); END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P4 FAILED: link listing allowed an ungated caller'; END IF;
  RAISE NOTICE 'P4 PASS: admin_list_category_attribute_links refuses an ungated caller';

  -- P5: the widened roster still refuses an unpermitted caller.
  v_ok := false;
  BEGIN PERFORM count(*) FROM public.admin_list_categories();
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'permission denied'); END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P5 FAILED: widened roster allowed an ungated caller'; END IF;
  RAISE NOTICE 'P5 PASS: the widened admin_list_categories still refuses an ungated caller';

  -- CLEANUP — the proofs leave nothing behind.
  DELETE FROM public.category_attribute_links WHERE category_id IN (v_cat, v_cat2);
  DELETE FROM public.categories WHERE id IN (v_cat, v_cat2);
  DELETE FROM public.attributes WHERE id = v_t;

  SELECT count(*)::int INTO v_n FROM public.attributes WHERE attr_key LIKE 'c3c_proof_%';
  IF v_n <> 0 THEN RAISE EXCEPTION 'CLEANUP FAILED: % scratch definitions remain', v_n; END IF;
  SELECT count(*)::int INTO v_n FROM public.categories WHERE slug LIKE 'c3c-proof-%';
  IF v_n <> 0 THEN RAISE EXCEPTION 'CLEANUP FAILED: % scratch categories remain', v_n; END IF;
  RAISE NOTICE 'CLEANUP PASS: no proof residue';
END $$;

-- ACL read-back
DO $$
DECLARE v_ok boolean;
BEGIN
  SELECT has_function_privilege('authenticated', 'public.admin_merge_attributes(uuid, uuid[])', 'EXECUTE')
     AND NOT has_function_privilege('anon', 'public.admin_merge_attributes(uuid, uuid[])', 'EXECUTE')
     AND NOT has_function_privilege('authenticated', 'public.merge_attributes_impl(uuid, uuid[])', 'EXECUTE')
     AND has_function_privilege('authenticated', 'public.admin_list_categories()', 'EXECUTE')
     AND NOT has_function_privilege('anon', 'public.admin_list_categories()', 'EXECUTE')
     AND has_function_privilege('authenticated', 'public.admin_list_category_attribute_links(uuid)', 'EXECUTE')
     AND NOT has_function_privilege('anon', 'public.admin_list_category_attribute_links(uuid)', 'EXECUTE')
    INTO v_ok;
  IF NOT v_ok THEN RAISE EXCEPTION 'ACL FAILED: unexpected execute privileges'; END IF;
  RAISE NOTICE 'ACL PASS: authenticated-only doors, impl unreachable from the client';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260906090000') ON CONFLICT DO NOTHING;