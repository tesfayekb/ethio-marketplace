-- e2e-areas: admin-attributes, admin-categories, admin-locations, admin-roles, posting
-- Bundle 7 Part E / M11: holders counts, delete-with-children refusal, home pointer first,
-- the parent-before-child guard, security_lints(), client write privileges closed.
-- Live beside file (ethio-prod, pg_proc, read before this file):
--   admin_delete_category(p_id uuid, p_confirm_slug text) RETURNS void; provolatile v; prosecdef t; proconfig {search_path=public}
--   admin_list_category_pointers(p_category_id uuid) RETURNS TABLE(pointer_id, parent_id, parent_slug, parent_name_en, display_order); provolatile s; prosecdef t; proconfig {search_path=public}; ACL lacked service_role
--   admin_merge_attributes(p_target uuid, p_sources uuid[]) RETURNS jsonb; provolatile v; prosecdef t; proconfig {search_path=public}
--   admin_preview_attribute_import(p_definitions jsonb, p_links jsonb, p_scope text DEFAULT NULL) RETURNS jsonb; provolatile s; prosecdef t; proconfig {search_path=public}; ACL lacked service_role
-- UTC clock candidate 20261007040000; ledger candidate 20261007150000 (ledger max 20261007140000 + 1h); chosen 20261007150000.

-- ===== E1.1 — holders count (service only) =====
CREATE OR REPLACE FUNCTION public.attribute_holders(p_attribute_id uuid, p_link_id uuid DEFAULT NULL, p_value text DEFAULT NULL)
RETURNS integer
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $h$
  WITH k AS (SELECT a.attr_key FROM public.attributes a WHERE a.id = p_attribute_id),
  held AS (
    SELECT l.id, l.category_id, l.attributes -> k.attr_key AS answer
      FROM public.listings l, k
     WHERE jsonb_typeof(l.attributes) = 'object' AND l.attributes ? k.attr_key),
  cats AS (
    SELECT c.category_id FROM (SELECT DISTINCT category_id FROM held) c
     WHERE p_link_id IS NULL
        OR EXISTS (SELECT 1 FROM public.effective_category_links(c.category_id) e
                    WHERE e.link_id = p_link_id AND e.attribute_id = p_attribute_id))
  SELECT count(*)::int FROM held h
   WHERE h.category_id IN (SELECT category_id FROM cats)
     AND (p_value IS NULL OR p_value = ANY (public.attr_answer_tokens(h.answer)));
$h$;
REVOKE ALL ON FUNCTION public.attribute_holders(uuid, uuid, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.attribute_holders(uuid, uuid, text) TO service_role;

-- ===== E1.2 — console read behind categories:view =====
CREATE OR REPLACE FUNCTION public.admin_attribute_holders(p_attribute_id uuid, p_link_id uuid DEFAULT NULL, p_value text DEFAULT NULL)
RETURNS integer
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $ah$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  RETURN public.attribute_holders(p_attribute_id, p_link_id, p_value);
END $ah$;
REVOKE ALL ON FUNCTION public.admin_attribute_holders(uuid, uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_attribute_holders(uuid, uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_attribute_holders(uuid, uuid, text) TO service_role;

-- ===== E1.4 helper — the preview's holders list from a plan (service only) =====
CREATE OR REPLACE FUNCTION public.attr_import_holders(p_plan jsonb)
RETURNS jsonb
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $ih$
  SELECT COALESCE(jsonb_agg(q.h ORDER BY q.f, q.r, q.k, q.v), '[]'::jsonb)
    FROM (
      SELECT 'links' AS f, x->'row' AS r, x->>'key' AS k, ''::text AS v,
             jsonb_build_object('file','links','row',x->'row','key',x->>'key','slug',x->>'slug',
               'count', public.attribute_holders((x->>'attribute_id')::uuid, (x->>'link_id')::uuid, NULL)) AS h
        FROM jsonb_array_elements(CASE WHEN jsonb_typeof(p_plan->'links') = 'array' THEN p_plan->'links' ELSE '[]'::jsonb END) x
       WHERE x->>'change' = 'unlink' AND x->>'link_id' IS NOT NULL
      UNION ALL
      SELECT 'definitions', x->'row', x->>'key', s.v,
             jsonb_build_object('file','definitions','row',x->'row','key',x->>'key','value',s.v,
               'count', public.attribute_holders(a.id, NULL, s.v))
        FROM jsonb_array_elements(CASE WHEN jsonb_typeof(p_plan->'definitions') = 'array' THEN p_plan->'definitions' ELSE '[]'::jsonb END) x
        JOIN public.attributes a ON a.id = (x->>'id')::uuid
        CROSS JOIN LATERAL (
          SELECT DISTINCT CASE WHEN jsonb_typeof(t.o) = 'object' THEN btrim(COALESCE(t.o->>'value', ''))
                               ELSE btrim(t.o #>> '{}') END AS v
            FROM jsonb_array_elements(CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) t(o)) s
       WHERE x->>'change' = 'change' AND x->>'action' = 'upsert' AND s.v <> ''
         AND NOT EXISTS (
           SELECT 1 FROM jsonb_array_elements(CASE WHEN jsonb_typeof(x->'options') = 'array' THEN x->'options' ELSE '[]'::jsonb END) n(o)
            WHERE (CASE WHEN jsonb_typeof(n.o) = 'object' THEN btrim(COALESCE(n.o->>'value', ''))
                        ELSE btrim(n.o #>> '{}') END) = s.v)
    ) q
   WHERE (q.h->>'count')::int > 0;
$ih$;
REVOKE ALL ON FUNCTION public.attr_import_holders(jsonb) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.attr_import_holders(jsonb) TO service_role;

-- ===== E1.3 — merge refused while a listing holds a source's answer =====
CREATE OR REPLACE FUNCTION public.admin_merge_attributes(p_target uuid, p_sources uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_counts jsonb; v_set uuid[]; v_deps text[]; v_holders int;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  -- DEC-045 — never merge across a dependency: a fold would silently repoint
  -- or orphan a dependent definition.
  v_set := ARRAY[p_target] || COALESCE(p_sources, ARRAY[]::uuid[]);
  SELECT array_agg(DISTINCT k ORDER BY k) INTO v_deps FROM (
    SELECT d.attr_key AS k FROM public.attributes d
     WHERE d.depends_on = ANY (COALESCE(p_sources, ARRAY[]::uuid[]))
    UNION
    SELECT a.attr_key FROM public.attributes a
     WHERE a.id = ANY (v_set) AND a.depends_on = ANY (v_set)
  ) x;
  IF v_deps IS NOT NULL AND array_length(v_deps, 1) > 0 THEN
    RAISE EXCEPTION 'admin.attributes.error.mergeAcrossDependency:%',
      array_to_string(v_deps, ', ') USING ERRCODE = 'P0010';
  END IF;

  -- M11 / E1.3 — never merge while a listing holds an answer to a source.
  SELECT COALESCE(sum(public.attribute_holders(s, NULL, NULL)), 0)::int INTO v_holders
    FROM unnest(COALESCE(p_sources, ARRAY[]::uuid[])) s;
  IF v_holders > 0 THEN
    RAISE EXCEPTION 'admin.attributes.error.mergeHasHolders:%', v_holders USING ERRCODE = 'P0010';
  END IF;

  v_counts := public.merge_attributes_impl(p_target, p_sources);

  PERFORM public.log_audit('attribute.merge', 'attributes', p_target::text,
    jsonb_build_object('sources', to_jsonb(p_sources), 'counts', v_counts));

  RETURN v_counts;
END $function$;
REVOKE ALL ON FUNCTION public.admin_merge_attributes(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_merge_attributes(uuid, uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_merge_attributes(uuid, uuid[]) TO service_role;

-- ===== E1.4 — preview names the holders =====
CREATE OR REPLACE FUNCTION public.admin_preview_attribute_import(p_definitions jsonb, p_links jsonb, p_scope text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_plan    jsonb;
  v_ignored jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  v_plan := public.attr_import_plan(p_definitions, p_links, p_scope);
  v_ignored := public.import_readonly_ignored('definitions', p_definitions)
             || public.import_readonly_ignored('links', p_links);
  RETURN v_plan || jsonb_build_object(
    'ignored', v_ignored,
    'refusals', public.import_guide_refusals('attributes', NULL, v_plan->'refusals'),
    'holders', public.attr_import_holders(v_plan));
END $function$;
REVOKE ALL ON FUNCTION public.admin_preview_attribute_import(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_preview_attribute_import(jsonb, jsonb, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_preview_attribute_import(jsonb, jsonb, text) TO service_role;

-- ===== E2.1 — delete refused while the category has children =====
CREATE OR REPLACE FUNCTION public.admin_delete_category(p_id uuid, p_confirm_slug text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_row public.categories%ROWTYPE; v_listings int; v_children int;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  SELECT * INTO v_row FROM public.categories WHERE id = p_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'category not found';
  END IF;

  IF v_row.is_active THEN
    RAISE EXCEPTION 'admin.categories.error.delete_active' USING ERRCODE = 'P0010';
  END IF;

  IF p_confirm_slug IS DISTINCT FROM v_row.slug THEN
    RAISE EXCEPTION 'admin.categories.error.delete_slug_mismatch' USING ERRCODE = 'P0010';
  END IF;

  SELECT count(*)::int INTO v_listings FROM public.listings l WHERE l.category_id = p_id;
  IF v_listings > 0 THEN
    RAISE EXCEPTION 'admin.categories.error.delete_has_listings:%', v_listings
      USING ERRCODE = 'P0010';
  END IF;

  SELECT count(*)::int INTO v_children FROM public.category_tree_pointers t WHERE t.parent_id = p_id;
  IF v_children > 0 THEN
    RAISE EXCEPTION 'admin.categories.error.delete_has_children:%', v_children
      USING ERRCODE = 'P0010';
  END IF;

  DELETE FROM public.category_tree_pointers WHERE child_id = p_id OR parent_id = p_id;
  DELETE FROM public.category_country_exclusions WHERE category_id = p_id;
  DELETE FROM public.category_attributes WHERE category_id = p_id;
  DELETE FROM public.entity_translations
   WHERE entity_type = 'category' AND entity_id = p_id;
  DELETE FROM public.categories WHERE id = p_id;

  PERFORM public.log_audit('category.delete', 'categories', p_id::text,
    jsonb_build_object('old', to_jsonb(v_row)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_delete_category(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_delete_category(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_delete_category(uuid, text) TO service_role;

-- ===== E2.2 — pointer list carries is_primary, home first (return type changes) =====
DROP FUNCTION public.admin_list_category_pointers(uuid);
CREATE FUNCTION public.admin_list_category_pointers(p_category_id uuid)
 RETURNS TABLE(pointer_id uuid, parent_id uuid, parent_slug text, parent_name_en text, display_order integer, is_primary boolean)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT ptr.id, ptr.parent_id, parent.slug, parent.name_en, ptr.display_order, ptr.is_primary
    FROM public.category_tree_pointers ptr
    LEFT JOIN public.categories parent ON parent.id = ptr.parent_id
   WHERE ptr.child_id = p_category_id
   ORDER BY (NOT ptr.is_primary), ptr.display_order, ptr.created_at;
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_category_pointers(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_category_pointers(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_category_pointers(uuid) TO service_role;

-- ===== E3.1 — child asked before its parent (service only) =====
-- Order: details step (0) first, then price-page groups basis 1, size 2, quantity 3,
-- terms 4 (deal_group with has_unit); inside each, display_order then attr_key.
CREATE OR REPLACE FUNCTION public.catalog_order_violations(p_category_ids uuid[])
RETURNS jsonb
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $ov$
  WITH cats AS (
    SELECT c.id, c.slug FROM public.categories c
     WHERE c.id = ANY (COALESCE(p_category_ids, ARRAY[]::uuid[]))
       AND c.is_active AND c.allow_listings
       AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers t WHERE t.parent_id = c.id)),
  q AS (
    SELECT cats.id AS cat, cats.slug, a.id AS aid, a.attr_key AS k, a.attr_type, a.options,
           a.depends_on, e.display_order AS ord, l.visible_when
      FROM cats
      CROSS JOIN LATERAL public.effective_category_links(cats.id) e
      JOIN public.attributes a ON a.id = e.attribute_id
      LEFT JOIN public.category_attribute_links l ON l.id = e.link_id),
  u AS (SELECT cat, bool_or(k ~ '^unit_of_sale(-|$)') AS has_unit FROM q GROUP BY cat),
  p AS (
    SELECT q.*, CASE public.deal_group(q.k, u.has_unit)
                  WHEN 'basis' THEN 1 WHEN 'size' THEN 2 WHEN 'quantity' THEN 3 WHEN 'terms' THEN 4
                  ELSE 0 END AS step
      FROM q JOIN u USING (cat)),
  opt AS (
    SELECT p.cat, p.k AS parent, ok.key AS child
      FROM p
      CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(p.options) = 'array' THEN p.options ELSE '[]'::jsonb END) o(v)
      CROSS JOIN LATERAL (
        SELECT jsonb_object_keys(CASE WHEN jsonb_typeof(o.v -> s.f) = 'object' THEN o.v -> s.f ELSE '{}'::jsonb END) AS key
          FROM unnest(ARRAY['facts','bounds','allowed']) s(f)) ok
     WHERE p.attr_type IN ('single_select','multi_select') AND jsonb_typeof(o.v) = 'object'),
  edges AS (
    SELECT c.cat, pp.k AS parent, c.k AS child FROM p c JOIN p pp ON pp.cat = c.cat AND pp.aid = c.depends_on
    UNION SELECT opt.cat, opt.parent, opt.child FROM opt
    UNION SELECT c.cat, c.visible_when ->> 'key', c.k FROM p c
           WHERE jsonb_typeof(c.visible_when) = 'object' AND c.visible_when ? 'key'
    UNION SELECT c.cat, c.visible_when -> 'and' ->> 'key', c.k FROM p c
           WHERE jsonb_typeof(c.visible_when) = 'object' AND jsonb_typeof(c.visible_when -> 'and') = 'object'),
  bad AS (
    SELECT DISTINCT pc.slug, e.parent, e.child
      FROM edges e
      JOIN p pc ON pc.cat = e.cat AND pc.k = e.child
      JOIN p pp ON pp.cat = e.cat AND pp.k = e.parent
     WHERE e.parent <> e.child
       AND (pc.step, pc.ord, pc.k) < (pp.step, pp.ord, pp.k))
  SELECT COALESCE(jsonb_agg(jsonb_build_object('slug', slug, 'parent', parent, 'child', child)
                            ORDER BY slug, parent, child), '[]'::jsonb)
    FROM bad;
$ov$;
REVOKE ALL ON FUNCTION public.catalog_order_violations(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_order_violations(uuid[]) TO service_role;

-- ===== E3.2 — the deferred guard =====
CREATE OR REPLACE FUNCTION public.catalog_order_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $g$
DECLARE
  v_roots uuid[];
  v_cats  uuid[];
  v_done  text;
  v_bad   jsonb;
BEGIN
  -- Migrations, seeds and service-client scratch rows are not judged.
  IF auth.uid() IS NULL THEN
    RETURN NULL;
  END IF;
  IF TG_TABLE_NAME = 'category_attribute_links' THEN
    v_roots := ARRAY[NEW.category_id];
  ELSE
    SELECT array_agg(DISTINCT l.category_id) INTO v_roots
      FROM public.category_attribute_links l WHERE l.attribute_id = NEW.id;
  END IF;
  IF v_roots IS NULL THEN
    RETURN NULL;
  END IF;
  v_done := COALESCE(current_setting('ethio.catalog_order_judged', true), '');
  WITH RECURSIVE d(id) AS (
    SELECT unnest(v_roots)
    UNION
    SELECT t.child_id FROM public.category_tree_pointers t JOIN d ON t.parent_id = d.id)
  SELECT array_agg(d.id) INTO v_cats FROM d WHERE position(d.id::text IN v_done) = 0;
  IF v_cats IS NULL THEN
    RETURN NULL;
  END IF;
  PERFORM set_config('ethio.catalog_order_judged', v_done || ',' || array_to_string(v_cats, ','), true);
  v_bad := public.catalog_order_violations(v_cats);
  IF jsonb_array_length(v_bad) > 0 THEN
    RAISE EXCEPTION 'admin.attributes.error.parentAfterChild:%',
      (v_bad -> 0 ->> 'slug') || ': ' || (v_bad -> 0 ->> 'parent') || ' → ' || (v_bad -> 0 ->> 'child')
      USING ERRCODE = 'P0010';
  END IF;
  RETURN NULL;
END $g$;
REVOKE ALL ON FUNCTION public.catalog_order_guard() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_order_guard() TO service_role;

DROP TRIGGER IF EXISTS catalog_order_guard_links ON public.category_attribute_links;
CREATE CONSTRAINT TRIGGER catalog_order_guard_links
  AFTER INSERT OR UPDATE ON public.category_attribute_links
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW EXECUTE FUNCTION public.catalog_order_guard();
DROP TRIGGER IF EXISTS catalog_order_guard_attributes ON public.attributes;
CREATE CONSTRAINT TRIGGER catalog_order_guard_attributes
  AFTER UPDATE ON public.attributes
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  WHEN (OLD.options IS DISTINCT FROM NEW.options OR OLD.depends_on IS DISTINCT FROM NEW.depends_on)
  EXECUTE FUNCTION public.catalog_order_guard();

-- ===== E4.1 — security lints, counts only (service only) =====
-- Rules 1, 2, 4 start from supabase/splinter commit fccca4b1c4d8b48b8ccd69bd6b30e84adcb92975
-- (0013_rls_disabled_in_public, 0010_security_definer_view, 0011_function_search_path_mutable),
-- reduced to a count over schema public; the client-SELECT condition of 0010/0013 is dropped.
CREATE OR REPLACE FUNCTION public.security_lints()
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public', 'pg_catalog'
AS $sl$
  SELECT jsonb_build_array(
    jsonb_build_object('name', 'rls_disabled_in_public', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relkind = 'r' AND NOT c.relrowsecurity)),
    jsonb_build_object('name', 'security_definer_view', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
         LEFT JOIN pg_catalog.pg_depend dep ON dep.objid = c.oid AND dep.deptype = 'e'
              AND dep.classid = 'pg_catalog.pg_class'::regclass
        WHERE n.nspname = 'public' AND c.relkind = 'v' AND dep.objid IS NULL
          AND NOT (lower(COALESCE(c.reloptions::text, '{}'))::text[]
                   && ARRAY['security_invoker=1','security_invoker=true','security_invoker=yes','security_invoker=on']))),
    jsonb_build_object('name', 'function_executable_by_anon', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
         LEFT JOIN pg_catalog.pg_depend dep ON dep.objid = p.oid AND dep.deptype = 'e'
              AND dep.classid = 'pg_catalog.pg_proc'::regclass
        WHERE n.nspname = 'public' AND dep.objid IS NULL
          AND pg_catalog.has_function_privilege('anon', p.oid, 'EXECUTE'))),
    jsonb_build_object('name', 'function_search_path_mutable', 'level', 'WARN', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
         LEFT JOIN pg_catalog.pg_depend dep ON dep.objid = p.oid AND dep.deptype = 'e'
              AND dep.classid = 'pg_catalog.pg_proc'::regclass
        WHERE n.nspname = 'public' AND dep.objid IS NULL
          AND NOT EXISTS (SELECT 1 FROM unnest(COALESCE(p.proconfig, '{}')) cfg WHERE cfg LIKE 'search_path=%'))),
    jsonb_build_object('name', 'table_writable_by_client', 'level', 'WARN', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relkind IN ('r','p')
          AND EXISTS (SELECT 1 FROM unnest(ARRAY['anon','authenticated']) r(role),
                                    unnest(ARRAY['INSERT','UPDATE','DELETE','TRUNCATE']) v(priv)
                       WHERE pg_catalog.has_table_privilege(r.role, c.oid, v.priv))))
  );
$sl$;
REVOKE ALL ON FUNCTION public.security_lints() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.security_lints() TO service_role;

-- ===== E5.1 — the eight census tables are written by their doors only =====
REVOKE INSERT, UPDATE, DELETE ON public.categories FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.category_tree_pointers FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.category_attributes FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.locations FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.resources FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.permissions FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.roles FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.role_permissions FROM authenticated;
DROP POLICY IF EXISTS categories_admin_insert ON public.categories;
DROP POLICY IF EXISTS categories_admin_update ON public.categories;
DROP POLICY IF EXISTS categories_admin_delete ON public.categories;
DROP POLICY IF EXISTS category_tree_pointers_admin_insert ON public.category_tree_pointers;
DROP POLICY IF EXISTS category_tree_pointers_admin_update ON public.category_tree_pointers;
DROP POLICY IF EXISTS category_tree_pointers_admin_delete ON public.category_tree_pointers;
DROP POLICY IF EXISTS category_attributes_admin_insert ON public.category_attributes;
DROP POLICY IF EXISTS category_attributes_admin_update ON public.category_attributes;
DROP POLICY IF EXISTS category_attributes_admin_delete ON public.category_attributes;
DROP POLICY IF EXISTS locations_admin_insert ON public.locations;
DROP POLICY IF EXISTS locations_admin_update ON public.locations;
DROP POLICY IF EXISTS locations_admin_delete ON public.locations;
DROP POLICY IF EXISTS resources_rbac_insert ON public.resources;
DROP POLICY IF EXISTS resources_rbac_update ON public.resources;
DROP POLICY IF EXISTS resources_rbac_delete ON public.resources;
DROP POLICY IF EXISTS permissions_rbac_insert ON public.permissions;
DROP POLICY IF EXISTS permissions_rbac_update ON public.permissions;
DROP POLICY IF EXISTS permissions_rbac_delete ON public.permissions;
DROP POLICY IF EXISTS roles_rbac_insert ON public.roles;
DROP POLICY IF EXISTS roles_rbac_update ON public.roles;
DROP POLICY IF EXISTS roles_rbac_delete ON public.roles;
DROP POLICY IF EXISTS role_permissions_rbac_insert ON public.role_permissions;
DROP POLICY IF EXISTS role_permissions_rbac_update ON public.role_permissions;
DROP POLICY IF EXISTS role_permissions_rbac_delete ON public.role_permissions;

-- ===== E5.2 — nobody in the browser empties a table =====
REVOKE TRUNCATE ON ALL TABLES IN SCHEMA public FROM anon, authenticated;

-- ===== E6 — proofs (scratch rows only; no auth.users row; claims are a random id) =====
DO $proof$
DECLARE
  v_key   text := 'e2e-mig-m11-' || substr(md5(random()::text), 1, 8);
  v_attr  uuid;
  v_cat   uuid;
  v_p     uuid;
  v_c     uuid;
  v_lc    uuid;
  v_i     int;
  v_opts  jsonb;
  v_lints jsonb;
  v_n     int;
  v_t     text;
  v_claims text := json_build_object('sub', gen_random_uuid(), 'role', 'authenticated')::text;
BEGIN
  -- E1 — counts on a scratch definition nobody holds; the console read refuses.
  BEGIN
    INSERT INTO public.attributes (attr_key, name_en, attr_type) VALUES (v_key || '-h', v_key, 'text') RETURNING id INTO v_attr;
    IF public.attribute_holders(v_attr) <> 0
       OR public.attribute_holders(v_attr, gen_random_uuid()) <> 0
       OR public.attribute_holders(v_attr, NULL, 'x') <> 0 THEN
      RAISE EXCEPTION 'M11 E1: holders not 0';
    END IF;
    IF public.attr_import_holders(jsonb_build_object('definitions', '[]'::jsonb, 'links',
         jsonb_build_array(jsonb_build_object('row', 2, 'key', v_key || '-h', 'slug', v_key, 'change', 'unlink',
           'link_id', gen_random_uuid(), 'attribute_id', v_attr)))) <> '[]'::jsonb THEN
      RAISE EXCEPTION 'M11 E1: preview holders not empty';
    END IF;
    RAISE EXCEPTION 'm11-undo';
  EXCEPTION WHEN others THEN
    IF SQLERRM <> 'm11-undo' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    PERFORM public.admin_attribute_holders(gen_random_uuid());
    RAISE EXCEPTION 'M11 E1: unsigned caller not refused';
  EXCEPTION WHEN others THEN
    IF SQLERRM <> 'permission denied' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM set_config('request.jwt.claims', v_claims, true);
    PERFORM public.admin_attribute_holders(gen_random_uuid());
    RAISE EXCEPTION 'M11 E1: caller without permission not refused';
  EXCEPTION WHEN others THEN
    IF SQLERRM <> 'permission denied' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);

  -- E2 — the doors need a permitted admin (no role row may be written here);
  -- their behaviour is CT-38/CT-39/CT-40. The block proves the shapes.
  IF position('admin.categories.error.delete_has_children' IN
       pg_get_functiondef('public.admin_delete_category(uuid,text)'::regprocedure)) = 0 THEN
    RAISE EXCEPTION 'M11 E2: delete refusal missing';
  END IF;
  IF pg_get_function_result('public.admin_list_category_pointers(uuid)'::regprocedure) NOT LIKE '%is_primary boolean%'
     OR position('ORDER BY (NOT ptr.is_primary)' IN
       pg_get_functiondef('public.admin_list_category_pointers(uuid)'::regprocedure)) = 0 THEN
    RAISE EXCEPTION 'M11 E2: pointer list shape';
  END IF;

  -- E3 — the five clauses, each child placed before its parent, refused.
  FOR v_i IN 1..5 LOOP
    BEGIN
      PERFORM set_config('request.jwt.claims', v_claims, true);
      PERFORM set_config('ethio.catalog_order_judged', '', true);
      INSERT INTO public.categories (slug, name_en, is_active, allow_listings)
      VALUES (v_key || '-c' || v_i, v_key, true, true) RETURNING id INTO v_cat;
      v_opts := CASE v_i
        WHEN 2 THEN jsonb_build_array(jsonb_build_object('value','a','facts', jsonb_build_object(v_key || '-ch' || v_i, 'x')))
        WHEN 3 THEN jsonb_build_array(jsonb_build_object('value','a','bounds', jsonb_build_object(v_key || '-ch' || v_i, jsonb_build_object('min','1'))))
        WHEN 4 THEN jsonb_build_array(jsonb_build_object('value','a','allowed', jsonb_build_object(v_key || '-ch' || v_i, jsonb_build_array('x'))))
        ELSE jsonb_build_array(jsonb_build_object('value','a')) END;
      INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
      VALUES (v_key || '-pa' || v_i, v_key, 'single_select', v_opts) RETURNING id INTO v_p;
      INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
      VALUES (v_key || '-ch' || v_i, v_key, 'single_select', '[{"value":"x"}]') RETURNING id INTO v_c;
      INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, visible_when)
      VALUES (v_cat, v_c, 0, CASE WHEN v_i = 5 THEN jsonb_build_object('key', v_key || '-pa' || v_i, 'in', jsonb_build_array('a')) END);
      INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order) VALUES (v_cat, v_p, 1);
      IF v_i = 1 THEN
        -- No dependency yet: passes; then the definition gains it (the attributes trigger).
        SET CONSTRAINTS ALL IMMEDIATE;
        SET CONSTRAINTS ALL DEFERRED;
        PERFORM set_config('ethio.catalog_order_judged', '', true);
        UPDATE public.attributes SET depends_on = v_p WHERE id = v_c;
      END IF;
      SET CONSTRAINTS ALL IMMEDIATE;
      RAISE EXCEPTION 'M11 E3: clause % not refused', v_i;
    EXCEPTION WHEN others THEN
      IF SQLERRM NOT LIKE 'admin.attributes.error.parentAfterChild:%' THEN
        RAISE EXCEPTION 'M11 E3 clause %: %', v_i, SQLERRM;
      END IF;
    END;
    SET CONSTRAINTS ALL DEFERRED;
    PERFORM set_config('ethio.catalog_order_judged', '', true);
  END LOOP;

  -- E3 — right order passes; a swap ending right passes; wrong order with no caller passes.
  FOR v_i IN 1..3 LOOP
    BEGIN
      PERFORM set_config('request.jwt.claims', CASE WHEN v_i = 3 THEN '{}' ELSE v_claims END, true);
      PERFORM set_config('ethio.catalog_order_judged', '', true);
      INSERT INTO public.categories (slug, name_en, is_active, allow_listings)
      VALUES (v_key || '-r' || v_i, v_key, true, true) RETURNING id INTO v_cat;
      INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
      VALUES (v_key || '-rp' || v_i, v_key, 'single_select', '[{"value":"a"}]') RETURNING id INTO v_p;
      INSERT INTO public.attributes (attr_key, name_en, attr_type, depends_on)
      VALUES (v_key || '-rc' || v_i, v_key, 'single_select', v_p) RETURNING id INTO v_c;
      INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order)
      VALUES (v_cat, v_c, CASE WHEN v_i = 1 THEN 1 ELSE 0 END) RETURNING id INTO v_lc;
      INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order)
      VALUES (v_cat, v_p, CASE WHEN v_i = 1 THEN 0 ELSE 1 END);
      IF v_i = 2 THEN
        UPDATE public.category_attribute_links SET display_order = 5 WHERE id = v_lc;
      END IF;
      SET CONSTRAINTS ALL IMMEDIATE;
      RAISE EXCEPTION 'm11-undo';
    EXCEPTION WHEN others THEN
      IF SQLERRM <> 'm11-undo' THEN
        RAISE EXCEPTION 'M11 E3 pass case %: %', v_i, SQLERRM;
      END IF;
    END;
    SET CONSTRAINTS ALL DEFERRED;
  END LOOP;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('ethio.catalog_order_judged', '', true);
  SET CONSTRAINTS ALL DEFERRED;

  -- E4 — five names, levels, integer counts; a table without RLS counts; no client execute.
  v_lints := public.security_lints();
  IF jsonb_array_length(v_lints) <> 5
     OR (SELECT string_agg((e->>'name') || '/' || (e->>'level'), ',' ORDER BY i) FROM jsonb_array_elements(v_lints) WITH ORDINALITY x(e, i))
        <> 'rls_disabled_in_public/ERROR,security_definer_view/ERROR,function_executable_by_anon/ERROR,function_search_path_mutable/WARN,table_writable_by_client/WARN'
     OR EXISTS (SELECT 1 FROM jsonb_array_elements(v_lints) e WHERE jsonb_typeof(e->'count') <> 'number'
                   OR (SELECT count(*) FROM jsonb_object_keys(e)) <> 3) THEN
    RAISE EXCEPTION 'M11 E4: lint shape';
  END IF;
  v_n := (v_lints->0->>'count')::int;
  BEGIN
    v_t := 'e2e_mig_m11_' || substr(md5(random()::text), 1, 8);
    EXECUTE format('CREATE TABLE public.%I (id int)', v_t);
    -- ensure_rls (event trigger) enables RLS on every new table; switch it off here.
    EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY', v_t);
    IF (public.security_lints()->0->>'count')::int <> v_n + 1 THEN
      RAISE EXCEPTION 'M11 E4: rls lint did not count the scratch table';
    END IF;
    EXECUTE format('DROP TABLE public.%I', v_t);
    RAISE EXCEPTION 'm11-undo';
  EXCEPTION WHEN others THEN
    IF SQLERRM <> 'm11-undo' THEN RAISE; END IF;
  END;
  IF has_function_privilege('anon', 'public.security_lints()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.security_lints()', 'EXECUTE') THEN
    RAISE EXCEPTION 'M11 E4: lints executable by a client role';
  END IF;

  -- E5 — writes closed, reads unchanged, no TRUNCATE, policies gone.
  IF EXISTS (SELECT 1 FROM unnest(ARRAY['categories','category_tree_pointers','category_attributes','locations',
                                        'resources','permissions','roles','role_permissions']) t(n),
                           unnest(ARRAY['INSERT','UPDATE','DELETE']) v(p)
              WHERE has_table_privilege('authenticated', 'public.' || t.n, v.p)) THEN
    RAISE EXCEPTION 'M11 E5: a client write remains';
  END IF;
  IF has_table_privilege('authenticated', 'public.categories', 'SELECT')
     OR NOT has_table_privilege('authenticated', 'public.category_tree_pointers', 'SELECT')
     OR NOT has_table_privilege('authenticated', 'public.category_attributes', 'SELECT')
     OR NOT has_table_privilege('authenticated', 'public.locations', 'SELECT')
     OR NOT has_table_privilege('authenticated', 'public.resources', 'SELECT')
     OR NOT has_table_privilege('authenticated', 'public.permissions', 'SELECT')
     OR NOT has_table_privilege('authenticated', 'public.roles', 'SELECT')
     OR NOT has_table_privilege('authenticated', 'public.role_permissions', 'SELECT') THEN
    RAISE EXCEPTION 'M11 E5: a read privilege changed';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace,
                           unnest(ARRAY['anon','authenticated']) r(role)
              WHERE n.nspname = 'public' AND c.relkind IN ('r','p')
                AND has_table_privilege(r.role, c.oid, 'TRUNCATE')) THEN
    RAISE EXCEPTION 'M11 E5: TRUNCATE remains';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public'
              AND policyname ~ '^(categories_admin|category_tree_pointers_admin|category_attributes_admin|locations_admin)_(insert|update|delete)$'
                 OR (schemaname = 'public' AND policyname ~ '^(resources|permissions|roles|role_permissions)_rbac_(insert|update|delete)$')) THEN
    RAISE EXCEPTION 'M11 E5: a write policy remains';
  END IF;
END $proof$;
INSERT INTO public.migration_marks (version) VALUES ('20261007150000') ON CONFLICT (version) DO NOTHING;