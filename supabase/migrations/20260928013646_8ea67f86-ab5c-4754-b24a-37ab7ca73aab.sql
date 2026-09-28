-- ============================================================
-- TURN C1-b — INC-306: THE LINKS EXPORT RESOLVES A CATEGORY'S HOME THROUGH
-- THE ONE HOME READER. Declared mark 20260928020000 (the next round hour after
-- this file's stamp — DEC-022 / INC-094).
--
-- attr_export_payload's pathq (20260920151236:399–414) and attr_link_path
-- (20260907202049:11–31) each carried their own copy of the home rule
-- (ORDER BY t.display_order, t.parent_id — no is_primary, no parent-activity
-- filter); attr_link_origin (:34–56) walked EVERY pointer. DEC-080 made the
-- home a flag read by public.cat_primary_parent; all three now follow it.
-- Re-declared WHOLE with their closers restated (INC-183). No table change.
-- ============================================================

-- a. attr_export_payload — pathq's parent pick is cat_primary_parent(q.cur).
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

  -- INH-1: both walks follow the PRIMARY lineage only.
  WITH RECURSIVE scope AS (
    SELECT v_scope AS id, 0 AS d
    UNION ALL
    SELECT c.id, s.d + 1
      FROM scope s
      JOIN public.categories c ON public.cat_primary_parent(c.id) = s.id
     WHERE s.d < 10
  ),
  anc AS (
    SELECT c.id AS cat_id, c.id AS src_id, 0 AS depth
      FROM public.categories c
    UNION ALL
    SELECT a.cat_id, public.cat_primary_parent(a.src_id), a.depth + 1
      FROM anc a
     WHERE a.depth < 10
       AND public.cat_primary_parent(a.src_id) IS NOT NULL
  ),
  pathq AS (
    SELECT c.id, c.id AS cur, c.name_en::text AS path, 0 AS d
      FROM public.categories c
    UNION ALL
    -- INC-306 / DEC-080 — the home is the one home reader's verdict; the walk
    -- stops where it answers NULL (a root).
    SELECT q.id, pp.parent_id, cp.name_en || ' / ' || q.path, q.d + 1
      FROM pathq q
      JOIN LATERAL (
             SELECT public.cat_primary_parent(q.cur) AS parent_id
           ) pp ON pp.parent_id IS NOT NULL
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
           -- M-MAINT-2 Part B — the two per-link cells travel with the link.
           l.allowed_options,
           l.default_value,
           -- M-MAINT-3b — and the D24 condition.
           l.visible_when,
           -- M-ORDER — the link's own display_order travels with it.
           l.display_order,
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
               'origin', COALESCE(eff.origin, ''),
               -- the two new cells, AFTER the existing ones (round-trip shape)
               'allowed_options', COALESCE(array_to_string(eff.allowed_options, '|'), ''),
               'default_value', COALESCE(
                 CASE WHEN eff.default_value IS NULL THEN NULL
                      WHEN jsonb_typeof(eff.default_value) = 'array'
                        THEN (SELECT string_agg(t.v, '|')
                                FROM jsonb_array_elements_text(eff.default_value) AS t(v))
                      ELSE eff.default_value #>> '{}' END,
                 ''),
               -- M-MAINT-3b — the condition, AFTER default_value, as
               -- '<sibling key>=<value>|<value>…'. NULL → '' (a blank cell
               -- changes nothing on re-import, so the export round-trips).
               'visible_when', COALESCE(
                 CASE WHEN eff.visible_when IS NULL
                        OR jsonb_typeof(eff.visible_when) = 'null' THEN NULL
                      ELSE (eff.visible_when->>'key') || '='
                           || (SELECT string_agg(t.v, '|')
                                 FROM jsonb_array_elements_text(eff.visible_when->'in') AS t(v))
                 END,
                 ''),
               -- M-ORDER — display_order, AFTER visible_when, plain text.
               'display_order', COALESCE(eff.display_order::text, '')
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
               'depends_on', COALESCE(
                 (SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''),
               -- DEC-050 L2b-mig — the nine v2 cells, plain text, NULL → ''.
               'unit', COALESCE(a.unit, ''),
               'min', COALESCE(a.min_bound, ''),
               'max', COALESCE(a.max_bound, ''),
               'decimals', COALESCE(a.decimals::text, ''),
               'format', COALESCE(a.format, ''),
               'preset', COALESCE(a.preset, ''),
               'max_length', COALESCE(a.max_length::text, ''),
               'help_text_en', COALESCE(a.help_text_en, ''),
               'help_text_am', COALESCE(a.help_text_am, ''),
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

REVOKE ALL ON FUNCTION public.attr_export_payload(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_export_payload(text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_export_payload(text) TO service_role;

-- b. attr_link_path — the same replacement.
CREATE OR REPLACE FUNCTION public.attr_link_path(p_cat uuid)
RETURNS text
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
  WITH RECURSIVE q AS (
    SELECT c.id AS cur, c.name_en::text AS path, 0 AS d
      FROM public.categories c WHERE c.id = p_cat
    UNION ALL
    SELECT pp.parent_id, cp.name_en || ' / ' || q.path, q.d + 1
      FROM q
      JOIN LATERAL (
             SELECT public.cat_primary_parent(q.cur) AS parent_id
           ) pp ON pp.parent_id IS NOT NULL
      JOIN public.categories cp ON cp.id = pp.parent_id
     WHERE q.d < 10
  )
  SELECT path FROM q ORDER BY d DESC LIMIT 1;
$function$;

-- attr_link_origin — the anc walk follows the primary lineage (INH-1).
CREATE OR REPLACE FUNCTION public.attr_link_origin(p_cat uuid, p_key text)
RETURNS text
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
  WITH RECURSIVE anc AS (
    SELECT p_cat AS src, 0 AS depth
    UNION ALL
    SELECT public.cat_primary_parent(a.src), a.depth + 1
      FROM anc a
     WHERE a.depth < 10
       AND public.cat_primary_parent(a.src) IS NOT NULL
  )
  SELECT c.slug
    FROM anc
    JOIN public.category_attribute_links l ON l.category_id = anc.src
    JOIN public.attributes a2 ON a2.id = l.attribute_id AND a2.attr_key = p_key
    JOIN public.categories c ON c.id = anc.src
   ORDER BY anc.depth, c.slug
   LIMIT 1;
$function$;

REVOKE ALL ON FUNCTION public.attr_link_path(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.attr_link_origin(uuid, text) FROM PUBLIC, anon;

-- c. PROOF P7 — scratch rows, rolled back by sentinel (DEC-080 actor pattern).
DO $proof$
DECLARE
  v_uid uuid;
  v_a uuid := gen_random_uuid();
  v_b uuid := gen_random_uuid();
  v_l uuid := gen_random_uuid();
  v_attr uuid := gen_random_uuid();
  v_pb uuid;
  v_tok text := replace(gen_random_uuid()::text, '-', '');
  v_state text;
  v_path text;
  v_seg text[];
BEGIN
  SELECT ur.user_id INTO v_uid
    FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name = 'super_admin' AND ur.scope_type = 'global'
   ORDER BY ur.created_at
   LIMIT 1;
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'PROOF BLOCKED — this database holds no global super_admin to act as';
  END IF;
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_uid::text, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_uid::text, true);

  INSERT INTO public.categories (id, slug, name_en, is_active, allow_listings, is_catchall, display_order)
  VALUES (v_a, 'e2e-inc306-a-' || v_tok, 'e2e inc306 A ' || v_tok, true, false, false, 999990),
         (v_b, 'e2e-inc306-b-' || v_tok, 'e2e inc306 B ' || v_tok, true, false, false, 999991),
         (v_l, 'e2e-inc306-l-' || v_tok, 'e2e inc306 L ' || v_tok, true, true, false, 999992);
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (NULL, v_a, 999990), (NULL, v_b, 999991);
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_a, v_l, 5);
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_b, v_l, 5) RETURNING id INTO v_pb;
  INSERT INTO public.attributes (id, attr_key, name_en, attr_type)
  VALUES (v_attr, 'e2e_inc306_' || v_tok, 'e2e inc306 ' || v_tok, 'text');
  INSERT INTO public.category_attribute_links (category_id, attribute_id)
  VALUES (v_l, v_attr);

  FOREACH v_state IN ARRAY ARRAY['tie', 'lower'] LOOP
    IF v_state = 'lower' THEN
      UPDATE public.category_tree_pointers SET display_order = 0 WHERE id = v_pb;
    END IF;

    SELECT x->>'category_path' INTO v_path
      FROM jsonb_array_elements(public.attr_export_payload(NULL)->'links') x
     WHERE x->>'category_slug' = 'e2e-inc306-l-' || v_tok
     LIMIT 1;
    v_seg := string_to_array(v_path, ' / ');
    IF v_path IS NULL OR v_seg[array_length(v_seg, 1) - 1] IS DISTINCT FROM 'e2e inc306 A ' || v_tok THEN
      RAISE EXCEPTION 'PROOF P7 (%) failed: links export category_path %', v_state, v_path;
    END IF;

    v_path := public.attr_link_path(v_l);
    v_seg := string_to_array(v_path, ' / ');
    IF v_seg[array_length(v_seg, 1) - 1] IS DISTINCT FROM 'e2e inc306 A ' || v_tok THEN
      RAISE EXCEPTION 'PROOF P7 (%) failed: attr_link_path %', v_state, v_path;
    END IF;

    IF public.cat_export_row(v_l)->>'parent_slug' IS DISTINCT FROM 'e2e-inc306-a-' || v_tok THEN
      RAISE EXCEPTION 'PROOF P7 (%) failed: cat_export_row parent_slug %',
        v_state, public.cat_export_row(v_l)->>'parent_slug';
    END IF;
    RAISE NOTICE 'PROOF P7 ok (%) — links export, attr_link_path and cat_export_row all name A', v_state;
  END LOOP;

  RAISE EXCEPTION USING ERRCODE = 'P0001', MESSAGE = 'INC306_PROOF_ROLLBACK';
EXCEPTION
  WHEN SQLSTATE 'P0001' THEN
    IF SQLERRM <> 'INC306_PROOF_ROLLBACK' THEN RAISE; END IF;
END $proof$;

-- d. PROOF P8 (a read) + e. READ-BACK.
DO $readback$
DECLARE
  v_slug text;
  v_id uuid;
  v_links jsonb := public.attr_export_payload(NULL)->'links';
  v_path text;
  v_seg text[];
  v_home text;
  v_fn text;
  v_acl text;
BEGIN
  FOREACH v_slug IN ARRAY ARRAY['bicycles', 'personal-care-services', 'industrial-equipment',
                                'nursery-furniture', 'farm-equipment', 'generators-power'] LOOP
    SELECT c.id INTO v_id FROM public.categories c WHERE c.slug = v_slug;
    SELECT x->>'category_path' INTO v_path
      FROM jsonb_array_elements(v_links) x WHERE x->>'category_slug' = v_slug LIMIT 1;
    IF v_id IS NULL OR v_path IS NULL THEN
      RAISE NOTICE 'PROOF P8 skipped: % (category %, links row %)', v_slug, v_id, v_path;
      CONTINUE;
    END IF;
    SELECT c.name_en INTO v_home FROM public.categories c WHERE c.id = public.cat_primary_parent(v_id);
    v_seg := string_to_array(v_path, ' / ');
    IF v_seg[array_length(v_seg, 1) - 1] IS DISTINCT FROM v_home THEN
      RAISE EXCEPTION 'PROOF P8 failed: % path % vs home %', v_slug, v_path, v_home;
    END IF;
    RAISE NOTICE 'PROOF P8 ok — % path "%" · home %', v_slug, v_path, v_home;
  END LOOP;

  FOREACH v_fn IN ARRAY ARRAY['public.attr_export_payload(text)',
                              'public.attr_link_path(uuid)',
                              'public.attr_link_origin(uuid, text)'] LOOP
    SELECT array_to_string(coalesce(proacl, acldefault('f', proowner)), ',') INTO v_acl
      FROM pg_proc WHERE oid = v_fn::regprocedure;
    IF v_acl LIKE '%anon=%' OR v_acl ~ '(^|,)=X'
       OR (v_fn = 'public.attr_export_payload(text)' AND v_acl NOT LIKE '%authenticated=X%') THEN
      RAISE EXCEPTION 'READ-BACK failed: % acl=%', v_fn, v_acl;
    END IF;
    RAISE NOTICE 'READ-BACK % acl=%', v_fn, v_acl;
  END LOOP;
  IF NOT EXISTS (SELECT 1 FROM pg_proc
                  WHERE oid = 'public.attr_export_payload(text)'::regprocedure
                    AND prosrc LIKE '%cat_primary_parent(q.cur)%'
                    AND prosrc NOT LIKE '%t.display_order, t.parent_id%') THEN
    RAISE EXCEPTION 'READ-BACK failed: attr_export_payload lacks its INC-306 change';
  END IF;
END $readback$;

INSERT INTO public.migration_marks (version) VALUES ('20260928020000') ON CONFLICT DO NOTHING;