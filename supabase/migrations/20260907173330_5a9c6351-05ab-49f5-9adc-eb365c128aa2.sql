-- IE-1r PART A — PARITY REPAIR (INC-176).
-- `admin_export_attributes()` reached the connected project without a migration
-- file behind it (the IE-1 working tree was lost before the commit landed).
-- Append-only parity is restored here: the body below is BYTE-IDENTICAL to
-- `pg_get_functiondef('public.admin_export_attributes'::regproc)` as read from
-- the connected project, so applying this file is a no-op on a database that
-- already carries it and a faithful create everywhere else.
-- In-file REVOKE/GRANT closers + read-back (DEC-022-B): a redeclared definer
-- must never leave its ACL implicit.

CREATE OR REPLACE FUNCTION public.admin_export_attributes()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_defs jsonb;
  v_links jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

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
    ) d;

  WITH RECURSIVE anc AS (
    -- own links first (depth 0), then every ancestor reachable by pointer
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
    -- primary parent = the lowest-ordered pointer; the path is name_en chained
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

  RETURN jsonb_build_object('definitions', v_defs, 'links', v_links);
END $function$;

REVOKE ALL ON FUNCTION public.admin_export_attributes() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_attributes() TO authenticated;
GRANT ALL ON FUNCTION public.admin_export_attributes() TO service_role;

-- READ-BACK (F4: a silent grant is not a proof).
DO $$
DECLARE
  v_sig text := 'public.admin_export_attributes()';
BEGIN
  IF has_function_privilege('anon', v_sig, 'EXECUTE') THEN
    RAISE EXCEPTION 'CLOSER FAILED: anon can execute %', v_sig;
  END IF;
  IF NOT has_function_privilege('authenticated', v_sig, 'EXECUTE') THEN
    RAISE EXCEPTION 'CLOSER FAILED: authenticated cannot execute %', v_sig;
  END IF;
  IF NOT has_function_privilege('service_role', v_sig, 'EXECUTE') THEN
    RAISE EXCEPTION 'CLOSER FAILED: service_role cannot execute %', v_sig;
  END IF;
  RAISE NOTICE 'ACL OK: % (anon=no, authenticated=yes, service_role=yes)', v_sig;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260907180000') ON CONFLICT DO NOTHING;