-- DEC-045a — DEPENDENT OPTIONS: schema, validation, refusals, readers, export.

ALTER TABLE public.attributes
  ADD COLUMN IF NOT EXISTS depends_on uuid NULL REFERENCES public.attributes(id);

CREATE INDEX IF NOT EXISTS attributes_depends_on_idx ON public.attributes(depends_on);

-- The normalized option VALUES of one definition (the legal `parent` vocabulary).
CREATE OR REPLACE FUNCTION public.attr_option_values(p_id uuid)
RETURNS text[]
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
  SELECT COALESCE(array_agg(t.x->>'value' ORDER BY t.ord), ARRAY[]::text[])
    FROM public.attributes a,
         LATERAL jsonb_array_elements(public.attr_option_norm(a.options))
                 WITH ORDINALITY AS t(x, ord)
   WHERE a.id = p_id
     AND btrim(COALESCE(t.x->>'value','')) <> '';
$function$;

-- Would pointing p_id at p_parent close a depends_on loop?
CREATE OR REPLACE FUNCTION public.attr_dep_cycle(p_id uuid, p_parent uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $function$
DECLARE v_cur uuid := p_parent; v_hops int := 0;
BEGIN
  WHILE v_cur IS NOT NULL AND v_hops < 20 LOOP
    IF p_id IS NOT NULL AND v_cur = p_id THEN RETURN true; END IF;
    SELECT a.depends_on INTO v_cur FROM public.attributes a WHERE a.id = v_cur;
    v_hops := v_hops + 1;
  END LOOP;
  RETURN false;
END $function$;

/* ------------------------------ upsert door ------------------------------ */

DROP FUNCTION IF EXISTS public.admin_upsert_attribute(uuid, text, text, text, jsonb, text);

CREATE OR REPLACE FUNCTION public.admin_upsert_attribute(
  p_id uuid, p_attr_key text, p_name_en text, p_attr_type text,
  p_options jsonb, p_help_text_en text, p_depends_on text DEFAULT NULL)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_id uuid; v_old jsonb; v_dep uuid; v_dep_key text; v_dep_type text;
  v_vals text[]; v_parent text; v_entry jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  IF p_attr_key IS NULL OR btrim(p_attr_key) = '' THEN
    RAISE EXCEPTION 'admin.attributes.error.keyRequired' USING ERRCODE = 'P0010';
  END IF;

  IF EXISTS (SELECT 1 FROM public.attributes a
              WHERE a.attr_key = p_attr_key AND (p_id IS NULL OR a.id <> p_id)) THEN
    RAISE EXCEPTION 'admin.attributes.error.keyTaken' USING ERRCODE = 'P0010';
  END IF;

  -- DEC-045 — exactly one parent, single_select, no self, no cycle.
  v_dep_key := NULLIF(btrim(COALESCE(p_depends_on, '')), '');
  IF v_dep_key IS NOT NULL THEN
    SELECT a.id, a.attr_type INTO v_dep, v_dep_type
      FROM public.attributes a WHERE a.attr_key = v_dep_key;
    IF v_dep IS NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.dependsUnknown:%', v_dep_key USING ERRCODE = 'P0010';
    END IF;
    IF v_dep_type IS DISTINCT FROM 'single_select' THEN
      RAISE EXCEPTION 'admin.attributes.error.dependsNotSelect:%', v_dep_key USING ERRCODE = 'P0010';
    END IF;
    IF p_id IS NOT NULL AND v_dep = p_id THEN
      RAISE EXCEPTION 'admin.attributes.error.dependsSelf' USING ERRCODE = 'P0010';
    END IF;
    IF public.attr_dep_cycle(p_id, v_dep) THEN
      RAISE EXCEPTION 'admin.attributes.error.dependsCycle:%', v_dep_key USING ERRCODE = 'P0010';
    END IF;
    v_vals := public.attr_option_values(v_dep);
  END IF;

  -- Every `parent` names a value of the depended-on definition; a `parent`
  -- without a dependency is refused outright (never silently dropped).
  FOR v_entry IN
    SELECT value FROM jsonb_array_elements(public.attr_option_norm(p_options))
  LOOP
    v_parent := NULLIF(btrim(COALESCE(v_entry->>'parent','')), '');
    CONTINUE WHEN v_parent IS NULL;
    IF v_dep IS NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.parentWithoutDepends:%', v_parent
        USING ERRCODE = 'P0010';
    END IF;
    IF NOT (v_parent = ANY (COALESCE(v_vals, ARRAY[]::text[]))) THEN
      RAISE EXCEPTION 'admin.attributes.error.parentNotInParent:%', v_parent
        USING ERRCODE = 'P0010';
    END IF;
  END LOOP;

  IF p_id IS NULL THEN
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en, depends_on)
    VALUES (p_attr_key, p_name_en, p_attr_type, p_options, p_help_text_en, v_dep)
    RETURNING id INTO v_id;

    PERFORM public.log_audit('attribute.create', 'attributes', v_id::text,
      jsonb_build_object('attr_key', p_attr_key, 'attr_type', p_attr_type,
                         'depends_on', COALESCE(v_dep_key, '')));
  ELSE
    SELECT to_jsonb(a) INTO v_old FROM public.attributes a WHERE a.id = p_id;
    IF v_old IS NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
    END IF;

    UPDATE public.attributes a
       SET attr_key     = p_attr_key,
           name_en      = COALESCE(p_name_en, a.name_en),
           attr_type    = COALESCE(p_attr_type, a.attr_type),
           options      = p_options,
           help_text_en = p_help_text_en,
           depends_on   = v_dep,
           updated_at   = now()
     WHERE a.id = p_id;
    v_id := p_id;

    PERFORM public.log_audit('attribute.update', 'attributes', p_id::text,
      jsonb_build_object(
        'old', jsonb_build_object('attr_key', v_old->>'attr_key', 'name_en', v_old->>'name_en',
                                  'attr_type', v_old->>'attr_type', 'options', v_old->'options',
                                  'depends_on', v_old->>'depends_on'),
        'new', (SELECT jsonb_build_object('attr_key', a.attr_key, 'name_en', a.name_en,
                                          'attr_type', a.attr_type, 'options', a.options,
                                          'depends_on', a.depends_on)
                  FROM public.attributes a WHERE a.id = p_id)));
  END IF;

  RETURN v_id;
END $function$;

REVOKE ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text)
  TO authenticated;

/* ------------------------------ delete door ------------------------------ */

CREATE OR REPLACE FUNCTION public.admin_delete_attribute(p_id uuid, p_confirm_key text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_key text; v_links integer; v_deps text[];
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  SELECT a.attr_key INTO v_key FROM public.attributes a WHERE a.id = p_id;
  IF v_key IS NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
  END IF;

  IF p_confirm_key IS DISTINCT FROM v_key THEN
    RAISE EXCEPTION 'admin.attributes.error.confirmMismatch' USING ERRCODE = 'P0010';
  END IF;

  -- DEC-045 — the dependents are the blast radius and the refusal NAMES them.
  SELECT array_agg(d.attr_key ORDER BY d.attr_key) INTO v_deps
    FROM public.attributes d WHERE d.depends_on = p_id;
  IF v_deps IS NOT NULL AND array_length(v_deps, 1) > 0 THEN
    RAISE EXCEPTION 'admin.attributes.error.deleteHasDependents:%',
      array_to_string(v_deps, ', ') USING ERRCODE = 'P0010';
  END IF;

  SELECT count(*)::int INTO v_links
    FROM public.category_attribute_links l WHERE l.attribute_id = p_id;
  IF v_links > 0 THEN
    RAISE EXCEPTION 'admin.attributes.error.deleteHasLinks:%', v_links USING ERRCODE = 'P0010';
  END IF;

  DELETE FROM public.attributes WHERE id = p_id;

  PERFORM public.log_audit('attribute.delete', 'attributes', p_id::text,
    jsonb_build_object('attr_key', v_key));
END $function$;

/* ------------------------------ unlink door ------------------------------ */

CREATE OR REPLACE FUNCTION public.admin_unlink_attribute(p_link_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_old jsonb; v_deps text[];
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  SELECT to_jsonb(l) INTO v_old FROM public.category_attribute_links l WHERE l.id = p_link_id;
  IF v_old IS NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.linkNotFound' USING ERRCODE = 'P0010';
  END IF;

  -- DEC-045 — a parent cannot leave a category while a dependent stays in it.
  SELECT array_agg(a2.attr_key ORDER BY a2.attr_key) INTO v_deps
    FROM public.category_attribute_links l2
    JOIN public.attributes a2 ON a2.id = l2.attribute_id
   WHERE l2.category_id = (v_old->>'category_id')::uuid
     AND a2.depends_on  = (v_old->>'attribute_id')::uuid;
  IF v_deps IS NOT NULL AND array_length(v_deps, 1) > 0 THEN
    RAISE EXCEPTION 'admin.attributes.error.unlinkHasDependents:%',
      array_to_string(v_deps, ', ') USING ERRCODE = 'P0010';
  END IF;

  DELETE FROM public.category_attribute_links WHERE id = p_link_id;

  PERFORM public.log_audit('attribute.unlink', 'category_attribute_links', p_link_id::text,
    jsonb_build_object('old', v_old));
END $function$;

/* ------------------------------- merge door ------------------------------- */

CREATE OR REPLACE FUNCTION public.admin_merge_attributes(p_target uuid, p_sources uuid[])
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_counts jsonb; v_set uuid[]; v_deps text[];
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

  v_counts := public.merge_attributes_impl(p_target, p_sources);

  PERFORM public.log_audit('attribute.merge', 'attributes', p_target::text,
    jsonb_build_object('sources', to_jsonb(p_sources), 'counts', v_counts));

  RETURN v_counts;
END $function$;

/* --------------------------------- readers -------------------------------- */

DROP FUNCTION IF EXISTS public.admin_list_attributes();

CREATE OR REPLACE FUNCTION public.admin_list_attributes()
RETURNS TABLE(id uuid, attr_key text, name_en text, name_am text, attr_type text,
              options jsonb, help_text_en text, usage_count integer,
              depends_on_key text, created_at timestamp with time zone)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT a.id, a.attr_key, a.name_en, a.name_am, a.attr_type,
         a.options, a.help_text_en,
         (SELECT count(*)::int FROM public.category_attribute_links l
           WHERE l.attribute_id = a.id),
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on),
         a.created_at
    FROM public.attributes a
   ORDER BY a.attr_key;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_attributes() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_attributes() TO authenticated;

DROP FUNCTION IF EXISTS public.admin_list_category_attribute_links(uuid);

CREATE OR REPLACE FUNCTION public.admin_list_category_attribute_links(p_category_id uuid)
RETURNS TABLE(link_id uuid, attribute_id uuid, attr_key text, name_en text, attr_type text,
              options jsonb, is_required boolean, is_filterable boolean,
              display_order integer, card_rank integer, depends_on_key text)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT l.id, a.id, a.attr_key, a.name_en, a.attr_type, a.options,
         l.is_required, l.is_filterable, l.display_order, l.card_rank,
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on)
    FROM public.category_attribute_links l
    JOIN public.attributes a ON a.id = l.attribute_id
   WHERE l.category_id = p_category_id
   ORDER BY l.display_order, a.name_en;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_category_attribute_links(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_category_attribute_links(uuid) TO authenticated;

DROP FUNCTION IF EXISTS public.admin_list_effective_category_links(uuid);

CREATE OR REPLACE FUNCTION public.admin_list_effective_category_links(p_category_id uuid)
RETURNS TABLE(link_id uuid, attribute_id uuid, attr_key text, name_en text, attr_type text,
              options jsonb, is_required boolean, is_filterable boolean,
              display_order integer, card_rank integer, inherited boolean,
              origin_id uuid, origin_slug text, origin_name_en text, depends_on_key text)
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
         (eff.depth > 0), src.id, src.slug, src.name_en,
         (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on)
    FROM eff
    JOIN public.attributes a ON a.id = eff.aid
    JOIN public.categories src ON src.id = eff.src
   ORDER BY (eff.depth > 0), eff.ord, a.name_en;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_effective_category_links(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_effective_category_links(uuid) TO authenticated;

/* --------------------------------- export --------------------------------- */

CREATE OR REPLACE FUNCTION public.attr_export_payload(p_scope_slug text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $function$
DECLARE
  v_defs  jsonb;
  v_links jsonb;
  v_scope uuid;
  v_keys  text[];
BEGIN
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
               'is_required', CASE WHEN eff.is_required THEN 'true' ELSE 'false' END,
               'is_filterable', CASE WHEN eff.is_filterable THEN 'true' ELSE 'false' END,
               'card_rank', COALESCE(eff.card_rank::text, ''),
               'origin', COALESCE(eff.origin, '')
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
               'label_en', COALESCE(a.name_en, ''),
               'label_am', COALESCE(t.value, a.name_am, ''),
               'type', COALESCE(a.attr_type, ''),
               'options', COALESCE(
                 (SELECT string_agg(o.x, '|' ORDER BY o.ord)
                    FROM jsonb_array_elements_text(
                           CASE WHEN jsonb_typeof(a.options) = 'array'
                                THEN a.options ELSE '[]'::jsonb END
                         ) WITH ORDINALITY AS o(x, ord)),
                 ''),
               -- DEC-045a — emitted now, read-only until the importer learns it.
               'depends_on', COALESCE(
                 (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''),
               'is_per_variant', '',
               'direct_link_count',
                 (SELECT count(*)::text FROM public.category_attribute_links l
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

/* ---------------- live proof: the round trip is still silent -------------- */

DO $proof$
DECLARE v_payload jsonb; v_plan jsonb;
BEGIN
  v_payload := public.attr_export_payload(NULL);
  v_plan := public.attr_import_plan(v_payload->'definitions', v_payload->'links', NULL);
  IF (v_plan->'counts'->>'adds')::int <> 0
     OR (v_plan->'counts'->>'changes')::int <> 0
     OR (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'DEC-045a round-trip proof failed: %', v_plan->'counts';
  END IF;
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260908110000') ON CONFLICT DO NOTHING;