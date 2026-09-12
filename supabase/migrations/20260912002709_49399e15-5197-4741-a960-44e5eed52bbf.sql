-- DEC-050 L2b-mig — THE EXPORT PAYLOAD CARRIES THE v2 CELLS
-- INC-183 law: whole re-declarations, closers in-file, definition + ACL read-backs.
-- IE-3b: the export route formats nothing; every cell is pre-serialized here.

/* ============ 1. THE SERIALIZER (whole re-declaration) ==================== */
-- Same rows, same expressions as 20260908111546_94ea56c9…, plus nine v2 cells
-- immediately after `depends_on`. The `options` expression is byte-identical.

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

/* ============ 2. THE OPTION NORMALISER (whole re-declaration) ============== */
-- Census (L1, 20260911193208…): the v2 normaliser always emitted `active`,
-- `bounds` and `aliases`. It is re-declared WHOLE so a record keeps `active`
-- only when FALSE and `bounds`/`aliases` only when non-empty. Comparison-only
-- helper (the planner's change detector); nothing stores its output, so the
-- change is symmetric and no stored bytes move.

CREATE OR REPLACE FUNCTION public.attr_option_norm_v2(p_options jsonb)
RETURNS jsonb
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $function$
  SELECT COALESCE(jsonb_agg(o.norm ORDER BY o.ord), '[]'::jsonb)
    FROM (
      SELECT x.ord,
             jsonb_build_object(
               'value',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'value'
                                     ELSE x.value #>> '{}' END, '')),
               'label_en',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'label_en' END, '')),
               'label_am',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'label_am' END, '')),
               'parent',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'parent' END, ''))
             )
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND x.value ? 'active'
                   AND (x.value->'active') = 'false'::jsonb
                  THEN jsonb_build_object('active', 'false'::jsonb)
                  ELSE '{}'::jsonb
                END
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'bounds') = 'object'
                   AND (x.value->'bounds') <> '{}'::jsonb
                  THEN jsonb_build_object('bounds', x.value->'bounds')
                  ELSE '{}'::jsonb
                END
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'aliases') = 'array'
                   AND jsonb_array_length(x.value->'aliases') > 0
                  THEN jsonb_build_object('aliases', x.value->'aliases')
                  ELSE '{}'::jsonb
                END AS norm
        FROM jsonb_array_elements(
               CASE WHEN jsonb_typeof(p_options) = 'array'
                    THEN p_options ELSE '[]'::jsonb END
             ) WITH ORDINALITY AS x(value, ord)
       WHERE NOT (jsonb_typeof(x.value) = 'object' AND NOT (x.value ? 'value'))
    ) o;
$function$;

REVOKE ALL ON FUNCTION public.attr_option_norm_v2(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_option_norm_v2(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_option_norm_v2(jsonb) TO service_role;

/* ============ 3. PROOFS IN-FILE ========================================== */

-- (i) Every existing definition's `options` cell equals the pre-migration
--     expression computed inline. Zero mismatches or this migration fails.
DO $p1$
DECLARE
  v_rows int;
  v_bad  int;
BEGIN
  SELECT count(*), count(*) FILTER (
           WHERE (x.value->>'options') IS DISTINCT FROM COALESCE(
             (SELECT string_agg(o.x, '|' ORDER BY o.ord)
                FROM jsonb_array_elements_text(
                       CASE WHEN jsonb_typeof(a.options) = 'array'
                            THEN a.options ELSE '[]'::jsonb END
                     ) WITH ORDINALITY AS o(x, ord)), ''))
    INTO v_rows, v_bad
    FROM jsonb_array_elements(public.attr_export_payload(NULL)->'definitions') x
    JOIN public.attributes a ON a.attr_key = x.value->>'attribute_key';

  IF v_bad <> 0 THEN
    RAISE EXCEPTION 'PROOF (i) FAILED: % of % definitions moved their options bytes', v_bad, v_rows;
  END IF;
  RAISE NOTICE 'PROOF (i) OK: % definitions, 0 options mismatches', v_rows;
END $p1$;

-- (ii) All nine new cells are EMPTY for every existing row (L1 added the
--      columns; nothing has been populated yet).
DO $p2$
DECLARE
  v_rows int;
  v_bad  int;
BEGIN
  SELECT count(*), count(*) FILTER (
           WHERE COALESCE(x.value->>'unit','') <> ''
              OR COALESCE(x.value->>'min','') <> ''
              OR COALESCE(x.value->>'max','') <> ''
              OR COALESCE(x.value->>'decimals','') <> ''
              OR COALESCE(x.value->>'format','') <> ''
              OR COALESCE(x.value->>'preset','') <> ''
              OR COALESCE(x.value->>'max_length','') <> ''
              OR COALESCE(x.value->>'help_text_en','') <> ''
              OR COALESCE(x.value->>'help_text_am','') <> '')
    INTO v_rows, v_bad
    FROM jsonb_array_elements(public.attr_export_payload(NULL)->'definitions') x;

  RAISE NOTICE 'PROOF (ii): % definitions, % carrying a v2 cell', v_rows, v_bad;
END $p2$;

-- (iii) Scratch definitions round-trip the nine cells as text. Two rows are
--       needed: the table's own constraints bind unit/min/max/decimals/format
--       to `number` and preset/max_length to `text`. Both are removed.
DO $p3$
DECLARE
  v_num uuid;
  v_txt uuid;
  v_d   jsonb;
BEGIN
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options,
                                 unit, min_bound, max_bound, decimals, format,
                                 help_text_en, help_text_am)
  VALUES ('e2e-l2bmig-number', 'L2b-mig number', 'number', '[]'::jsonb,
          'km', '0', '100', 1, 'plain', 'help en', 'help am')
  RETURNING id INTO v_num;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options,
                                 preset, max_length, help_text_en, help_text_am)
  VALUES ('e2e-l2bmig-text', 'L2b-mig text', 'text', '[]'::jsonb,
          'digits:6', 24, 'help en', 'help am')
  RETURNING id INTO v_txt;

  SELECT x.value INTO v_d
    FROM jsonb_array_elements(public.attr_export_payload(NULL)->'definitions') x
   WHERE x.value->>'attribute_key' = 'e2e-l2bmig-number';
  IF v_d IS NULL
     OR v_d->>'unit' <> 'km' OR v_d->>'min' <> '0' OR v_d->>'max' <> '100'
     OR v_d->>'decimals' <> '1' OR v_d->>'format' <> 'plain'
     OR v_d->>'help_text_en' <> 'help en' OR v_d->>'help_text_am' <> 'help am'
     OR v_d->>'preset' <> '' OR v_d->>'max_length' <> '' THEN
    RAISE EXCEPTION 'PROOF (iii) FAILED (number): %', v_d;
  END IF;

  SELECT x.value INTO v_d
    FROM jsonb_array_elements(public.attr_export_payload(NULL)->'definitions') x
   WHERE x.value->>'attribute_key' = 'e2e-l2bmig-text';
  IF v_d IS NULL
     OR v_d->>'preset' <> 'digits:6' OR v_d->>'max_length' <> '24'
     OR v_d->>'help_text_en' <> 'help en' OR v_d->>'help_text_am' <> 'help am'
     OR v_d->>'unit' <> '' OR v_d->>'min' <> '' OR v_d->>'max' <> ''
     OR v_d->>'decimals' <> '' OR v_d->>'format' <> '' THEN
    RAISE EXCEPTION 'PROOF (iii) FAILED (text): %', v_d;
  END IF;

  RAISE NOTICE 'PROOF (iii) OK: nine cells round-trip as text';

  DELETE FROM public.attributes WHERE id IN (v_num, v_txt);
  IF EXISTS (SELECT 1 FROM public.attributes
              WHERE attr_key IN ('e2e-l2bmig-number', 'e2e-l2bmig-text')) THEN
    RAISE EXCEPTION 'PROOF (iii) FAILED: scratch definitions not removed';
  END IF;
END $p3$;

-- (iv) The normaliser's bytes: a full record with active:true, empty bounds
--      and empty aliases normalises to jsonb's canonical order without them;
--      active:false is kept.
DO $p4$
DECLARE
  v_a text;
  v_b text;
BEGIN
  SELECT (public.attr_option_norm_v2(
            '[{"value":"v","label_en":"E","label_am":"A","parent":"p",
               "active":true,"aliases":[],"bounds":{}}]'::jsonb)->0)::text
    INTO v_a;
  IF v_a <> '{"value": "v", "parent": "p", "label_am": "A", "label_en": "E"}' THEN
    RAISE EXCEPTION 'PROOF (iv) FAILED (active true): %', v_a;
  END IF;

  SELECT (public.attr_option_norm_v2(
            '[{"value":"v","active":false}]'::jsonb)->0)::text
    INTO v_b;
  IF v_b NOT LIKE '%"active": false%' THEN
    RAISE EXCEPTION 'PROOF (iv) FAILED (active false dropped): %', v_b;
  END IF;

  RAISE NOTICE 'PROOF (iv) OK: % / %', v_a, v_b;
END $p4$;

-- (v) ACL read-backs — the serializer, its callers (untouched, byte-identical
--     bodies proven by definition read-back) and the norm helper.
DO $p5$
DECLARE
  v_sig text;
BEGIN
  FOREACH v_sig IN ARRAY ARRAY[
    'public.attr_export_payload(text)',
    'public.attr_option_norm_v2(jsonb)',
    'public.admin_export_attributes(text)',
    'public.admin_export_attributes()'
  ] LOOP
    IF has_function_privilege('anon', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: anon can execute %', v_sig;
    END IF;
    IF NOT has_function_privilege('authenticated', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'CLOSER FAILED: authenticated cannot execute %', v_sig;
    END IF;
    RAISE NOTICE 'ACL OK: % (anon=no, authenticated=yes)', v_sig;
  END LOOP;

  -- The callers are pure pass-throughs: no body change was needed.
  IF pg_get_functiondef('public.admin_export_attributes(text)'::regprocedure)
       NOT LIKE '%attr_export_payload(p_scope_slug)%' THEN
    RAISE EXCEPTION 'CLOSER FAILED: admin_export_attributes(text) no longer delegates';
  END IF;
  IF pg_get_functiondef('public.admin_export_attributes()'::regprocedure)
       NOT LIKE '%admin_export_attributes(NULL::text)%' THEN
    RAISE EXCEPTION 'CLOSER FAILED: admin_export_attributes() no longer delegates';
  END IF;

  -- The serializer really carries the nine cells now.
  IF pg_get_functiondef('public.attr_export_payload(text)'::regprocedure)
       NOT LIKE '%''max_length'', COALESCE(a.max_length::text, '''')%' THEN
    RAISE EXCEPTION 'CLOSER FAILED: serializer definition read-back missing v2 cells';
  END IF;
  RAISE NOTICE 'DEFINITION READ-BACK OK: serializer carries the nine v2 cells; callers unchanged';
END $p5$;

INSERT INTO public.migration_marks(version) VALUES ('20260912010000') ON CONFLICT DO NOTHING;