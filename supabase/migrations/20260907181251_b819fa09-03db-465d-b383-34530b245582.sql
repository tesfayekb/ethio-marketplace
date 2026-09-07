-- C3-INH (DEC-044) — INHERITED ROWS + SUBTREE-SCOPED EXPORT.
-- Additive only: one new effective-set reader, one scoped overload of the
-- export, and an effective card count on the roster. No table touched.

/* ------------------------------------------------------------------ *
 * 1) EFFECTIVE LINKS FOR ONE CATEGORY (own ∪ ancestors, nearest wins) *
 * ------------------------------------------------------------------ */
CREATE OR REPLACE FUNCTION public.admin_list_effective_category_links(p_category_id uuid)
 RETURNS TABLE(link_id uuid, attribute_id uuid, attr_key text, name_en text, attr_type text,
               options jsonb, is_required boolean, is_filterable boolean, display_order integer,
               card_rank integer, inherited boolean, origin_id uuid, origin_slug text,
               origin_name_en text)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  WITH RECURSIVE anc AS (
    SELECT p_category_id AS src_id, 0 AS depth
    UNION ALL
    SELECT p.parent_id, a.depth + 1
      FROM anc a
      JOIN public.category_tree_pointers p
        ON p.child_id = a.src_id AND p.parent_id IS NOT NULL
     WHERE a.depth < 10
  ),
  eff AS (
    SELECT DISTINCT ON (l.attribute_id)
           l.id AS lid, l.attribute_id AS aid, l.is_required AS req, l.is_filterable AS filt,
           l.display_order AS ord, l.card_rank AS rank, anc.depth AS depth, anc.src_id AS src
      FROM anc
      JOIN public.category_attribute_links l ON l.category_id = anc.src_id
     ORDER BY l.attribute_id, anc.depth ASC, l.id
  )
  SELECT eff.lid, a.id, a.attr_key, a.name_en, a.attr_type, a.options,
         eff.req, eff.filt, eff.ord, eff.rank,
         (eff.depth > 0), src.id, src.slug, src.name_en
    FROM eff
    JOIN public.attributes a ON a.id = eff.aid
    JOIN public.categories src ON src.id = eff.src
   ORDER BY (eff.depth > 0), eff.ord, a.name_en;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_effective_category_links(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_effective_category_links(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_effective_category_links(uuid) TO service_role;

/* ------------------------------------------------ *
 * 2) SUBTREE-SCOPED EXPORT (NULL scope = whole set) *
 * ------------------------------------------------ */
CREATE OR REPLACE FUNCTION public.admin_export_attributes(p_scope_slug text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_defs jsonb;
  v_links jsonb;
  v_scope uuid;
  v_keys text[];
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  IF p_scope_slug IS NOT NULL THEN
    SELECT c.id INTO v_scope FROM public.categories c WHERE c.slug = p_scope_slug;
    IF v_scope IS NULL THEN
      RAISE EXCEPTION 'unknown category scope';
    END IF;
  END IF;

  WITH RECURSIVE scope AS (
    SELECT v_scope AS id, 0 AS d
    UNION ALL
    SELECT p.child_id, s.d + 1
      FROM scope s
      JOIN public.category_tree_pointers p ON p.parent_id = s.id
     WHERE s.d < 10
  ),
  anc AS (
    SELECT c.id AS cat_id, c.id AS src_id, 0 AS depth
      FROM public.categories c
    UNION ALL
    SELECT a.cat_id, p.parent_id, a.depth + 1
      FROM anc a
      JOIN public.category_tree_pointers p
        ON p.child_id = a.src_id AND p.parent_id IS NOT NULL
     WHERE a.depth < 10
  ),
  pathq AS (
    SELECT c.id, c.id AS cur, c.name_en::text AS path, 0 AS d
      FROM public.categories c
    UNION ALL
    SELECT q.id, pp.parent_id, cp.name_en || ' / ' || q.path, q.d + 1
      FROM pathq q
      JOIN LATERAL (
             SELECT t.parent_id
               FROM public.category_tree_pointers t
              WHERE t.child_id = q.cur AND t.parent_id IS NOT NULL
              ORDER BY t.display_order, t.parent_id
              LIMIT 1
           ) pp ON true
      JOIN public.categories cp ON cp.id = pp.parent_id
     WHERE q.d < 10
  ),
  best_path AS (
    SELECT DISTINCT ON (id) id, path FROM pathq ORDER BY id, d DESC
  ),
  eff AS (
    SELECT DISTINCT ON (anc.cat_id, l.attribute_id)
           anc.cat_id,
           l.attribute_id,
           l.is_required,
           l.is_filterable,
           l.card_rank,
           src.slug AS origin
      FROM anc
      JOIN public.category_attribute_links l ON l.category_id = anc.src_id
      JOIN public.categories src ON src.id = anc.src_id
     WHERE p_scope_slug IS NULL OR anc.cat_id IN (SELECT s.id FROM scope s)
     ORDER BY anc.cat_id, l.attribute_id, anc.depth ASC, src.slug
  )
  SELECT COALESCE(jsonb_agg(r.row ORDER BY r.path, r.attr_key), '[]'::jsonb)
    INTO v_links
    FROM (
      SELECT bp.path,
             a.attr_key,
             jsonb_build_object(
               'category_path', bp.path,
               'category_slug', c.slug,
               'attribute_key', a.attr_key,
               'is_required', eff.is_required,
               'is_filterable', eff.is_filterable,
               'card_rank', eff.card_rank,
               'origin', eff.origin
             ) AS row
        FROM eff
        JOIN public.categories c ON c.id = eff.cat_id
        JOIN public.attributes a ON a.id = eff.attribute_id
        JOIN best_path bp ON bp.id = eff.cat_id
    ) r;

  SELECT array_agg(DISTINCT x->>'attribute_key')
    INTO v_keys
    FROM jsonb_array_elements(v_links) x;

  SELECT COALESCE(jsonb_agg(d.row ORDER BY d.attr_key), '[]'::jsonb)
    INTO v_defs
    FROM (
      SELECT a.attr_key,
             jsonb_build_object(
               'attribute_key', a.attr_key,
               'label_en', a.name_en,
               'label_am', COALESCE(t.value, a.name_am),
               'type', a.attr_type,
               'options', COALESCE(
                 (SELECT string_agg(o.x, '|' ORDER BY o.ord)
                    FROM jsonb_array_elements_text(
                           CASE WHEN jsonb_typeof(a.options) = 'array'
                                THEN a.options ELSE '[]'::jsonb END
                         ) WITH ORDINALITY AS o(x, ord)),
                 ''),
               'direct_link_count',
                 (SELECT count(*) FROM public.category_attribute_links l
                   WHERE l.attribute_id = a.id)
             ) AS row
        FROM public.attributes a
        LEFT JOIN public.entity_translations t
               ON t.entity_type = 'attribute'
              AND t.entity_id = a.id
              AND t.field = 'label'
              AND t.lang_code = 'am'
              AND t.status = 'approved'
       WHERE p_scope_slug IS NULL
          OR a.attr_key = ANY(COALESCE(v_keys, ARRAY[]::text[]))
    ) d;

  RETURN jsonb_build_object('definitions', v_defs, 'links', v_links);
END $function$;

REVOKE ALL ON FUNCTION public.admin_export_attributes(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_attributes(text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_export_attributes(text) TO service_role;

-- The 0-arg door keeps its contract and delegates (one body, one truth).
CREATE OR REPLACE FUNCTION public.admin_export_attributes()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN public.admin_export_attributes(NULL::text);
END $function$;

REVOKE ALL ON FUNCTION public.admin_export_attributes() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_attributes() TO authenticated;
GRANT ALL ON FUNCTION public.admin_export_attributes() TO service_role;

/* ----------------------------------------------------- *
 * 3) ROSTER: the card-attribute flag reads the EFFECTIVE *
 *    count, so an inheriting child is no longer flagged. *
 * ----------------------------------------------------- */
CREATE OR REPLACE FUNCTION public.admin_list_categories()
 RETURNS TABLE(id uuid, slug text, name_en text, icon text, is_active boolean, is_catchall boolean, allow_listings boolean, display_order integer, price_enabled boolean, expiry_days integer, visible_from timestamp with time zone, visible_until timestamp with time zone, parent_id uuid, exclusion_count integer, listing_count integer, excluded_country_codes text[], has_image boolean, attribute_count integer, card_attribute_count integer, secondary_parent_names text[])
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
  ),
  -- DIRECT links: the "attributes: N" figure stays the category's own count.
  lnk AS (
    SELECT k.category_id,
           count(*)::int AS attribute_count
      FROM public.category_attribute_links k
     GROUP BY k.category_id
  ),
  -- C3-INH (DEC-044): the CARD count is EFFECTIVE — own ∪ ancestors, nearest
  -- link wins — because an inheriting child shows those attributes on its
  -- listing cards and must not carry the amber flag.
  anc AS (
    SELECT c.id AS cat_id, c.id AS src_id, 0 AS depth
      FROM public.categories c
    UNION ALL
    SELECT a.cat_id, p.parent_id, a.depth + 1
      FROM anc a
      JOIN public.category_tree_pointers p
        ON p.child_id = a.src_id AND p.parent_id IS NOT NULL
     WHERE a.depth < 10
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
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_categories() TO service_role;

-- READ-BACK (F4: a silent grant is not a proof).
DO $$
DECLARE
  v_sigs text[] := ARRAY[
    'public.admin_list_effective_category_links(uuid)',
    'public.admin_export_attributes(text)',
    'public.admin_export_attributes()',
    'public.admin_list_categories()'
  ];
  v_sig text;
BEGIN
  FOREACH v_sig IN ARRAY v_sigs LOOP
    IF has_function_privilege('anon', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: anon can execute %', v_sig;
    END IF;
    IF NOT has_function_privilege('authenticated', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: authenticated cannot execute %', v_sig;
    END IF;
    IF NOT has_function_privilege('service_role', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: service_role cannot execute %', v_sig;
    END IF;
  END LOOP;
  RAISE NOTICE 'ACL OK (anon=no, authenticated=yes, service_role=yes)';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260907190000') ON CONFLICT DO NOTHING;