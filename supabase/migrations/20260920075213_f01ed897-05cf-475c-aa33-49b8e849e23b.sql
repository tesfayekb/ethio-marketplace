-- =====================================================================
-- M-MAINT-3b — PART 2 of 2 · THE UNDO, THE EXPORT, THE FACTS KEY RULE
--   and the IN-FILE PROOFS (INC-222 scratch identities).
--
-- CENSUS (INC-183, whole re-declarations):
--   admin_undo_attribute_import  20260919061105_41548d66-c858-479a-9f88-6e960d77e4e9.sql
--   attr_export_payload          20260919061105_41548d66-c858-479a-9f88-6e960d77e4e9.sql
--   attr_option_shape            20260917210006_86c1bbd7-b80c-4563-b57c-83d4def31bf7.sql
--
-- INC-236 — the `facts` KEY RULE becomes the DEFINITION-KEY charset
--   ^[a-z0-9_][a-z0-9_-]{1,63}$ (hyphens allowed, matching attribute_key).
--   The refusal text is unchanged: `badFacts:key:<k>`.
--   THE LAW, restated: bounds ENFORCE, facts PREFILL. The validator never
--   reads facts; the options read projects them for the form.
--
-- Part 1 (planner + commit) applied ahead of this file.
-- INC-212: every SECURITY DEFINER function restates its closers in this file.
-- No src, no e2e.
-- =====================================================================

-- ----------------------------------------------------------- THE UNDO DOOR
CREATE OR REPLACE FUNCTION public.admin_undo_attribute_import(p_batch uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_rev        record;
  v_restored   int := 0;
  v_conflicted int := 0;
  v_slug       text;
  v_key        text;
  v_attr       uuid;
  v_cat        uuid;
  v_exists     boolean;
  v_am         jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');
  IF p_batch IS NULL THEN
    RAISE EXCEPTION 'batch id required';
  END IF;

  PERFORM 1 FROM public.attribute_import_revisions WHERE batch_id = p_batch LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown import batch';
  END IF;

  -- DEC-045b — a parent and its dependent can both be CREATIONS of this batch.
  UPDATE public.attributes a
     SET depends_on = NULL
   WHERE a.depends_on IS NOT NULL
     AND a.attr_key IN (SELECT r.entity_key FROM public.attribute_import_revisions r
                         WHERE r.batch_id = p_batch AND r.kind = 'definition'
                           AND r.prev IS NULL AND r.undone_at IS NULL);

  -- LINK PASS A (INC-197) — every rank this undo is about to change is cleared
  -- FIRST, so no restore ever meets a rank still held by another link of the
  -- same category. A changed link whose prev rank differs from its current one
  -- is cleared; an added link about to be deleted is cleared too (its rank can
  -- be the very rank a changed link is going back to).
  FOR v_rev IN
    SELECT * FROM public.attribute_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL AND kind = 'link'
     ORDER BY created_at DESC
  LOOP
    v_slug := split_part(v_rev.entity_key, '|', 1);
    v_key := split_part(v_rev.entity_key, '|', 2);
    SELECT id INTO v_cat FROM public.categories WHERE slug = v_slug;
    SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_key;
    CONTINUE WHEN v_cat IS NULL OR v_attr IS NULL;

    IF v_rev.prev IS NULL THEN
      UPDATE public.category_attribute_links
         SET card_rank = NULL, updated_at = now()
       WHERE category_id = v_cat AND attribute_id = v_attr
         AND card_rank IS NOT NULL;
    ELSE
      UPDATE public.category_attribute_links
         SET card_rank = NULL, updated_at = now()
       WHERE category_id = v_cat AND attribute_id = v_attr
         AND card_rank IS NOT NULL
         AND card_rank IS DISTINCT FROM NULLIF(v_rev.prev->>'card_rank', '')::int;
    END IF;
  END LOOP;

  -- LINK DELETES (INC-197) — the links this batch ADDED go before anything is
  -- restored, exactly as the commit's unlinks sit between its two passes.
  FOR v_rev IN
    SELECT * FROM public.attribute_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL AND kind = 'link'
       AND prev IS NULL
     ORDER BY created_at DESC
  LOOP
    v_slug := split_part(v_rev.entity_key, '|', 1);
    v_key := split_part(v_rev.entity_key, '|', 2);
    SELECT id INTO v_cat FROM public.categories WHERE slug = v_slug;
    SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_key;
    IF v_cat IS NULL OR v_attr IS NULL THEN
      v_conflicted := v_conflicted + 1;
      CONTINUE;
    END IF;

    DELETE FROM public.category_attribute_links
     WHERE category_id = v_cat AND attribute_id = v_attr;

    UPDATE public.attribute_import_revisions SET undone_at = now() WHERE id = v_rev.id;
    v_restored := v_restored + 1;
  END LOOP;

  FOR v_rev IN
    SELECT * FROM public.attribute_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL
     ORDER BY CASE
                WHEN kind = 'definition' AND prev IS NOT NULL AND post IS NULL THEN 0
                WHEN kind = 'link' THEN 1
                ELSE 2
              END ASC,
              created_at DESC
  LOOP
    IF v_rev.kind = 'definition' THEN
      IF v_rev.prev IS NULL THEN
        IF EXISTS (SELECT 1 FROM public.category_attribute_links l
                     JOIN public.attributes a ON a.id = l.attribute_id
                    WHERE a.attr_key = v_rev.entity_key) THEN
          v_conflicted := v_conflicted + 1;
          CONTINUE;
        END IF;
        SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_rev.entity_key;
        IF v_attr IS NOT NULL AND EXISTS (
          SELECT 1 FROM public.attributes d WHERE d.depends_on = v_attr
        ) THEN
          v_conflicted := v_conflicted + 1;
          CONTINUE;
        END IF;
        IF v_attr IS NOT NULL THEN
          DELETE FROM public.entity_translations
           WHERE entity_type = 'attribute' AND entity_id = v_attr AND field = 'label';
          PERFORM public.log_audit('entity_translation.undo_remove', 'attributes', v_attr::text,
            jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'label'));
        END IF;
        DELETE FROM public.attributes WHERE attr_key = v_rev.entity_key;
      ELSE
        SELECT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key = v_rev.entity_key) INTO v_exists;
        IF v_exists THEN
          UPDATE public.attributes
             SET name_en = v_rev.prev->>'name_en',
                 attr_type = v_rev.prev->>'attr_type',
                 options = CASE WHEN v_rev.prev->'options' = 'null'::jsonb THEN NULL ELSE v_rev.prev->'options' END,
                 depends_on = (SELECT p.id FROM public.attributes p
                                WHERE p.attr_key = NULLIF(btrim(COALESCE(v_rev.prev->>'depends_on','')), '')),
                 -- DEC-050 — the v2 cells come back exactly as they were.
                 unit         = CASE WHEN v_rev.prev ? 'unit'         THEN v_rev.prev->>'unit'         ELSE unit END,
                 min_bound    = CASE WHEN v_rev.prev ? 'min_bound'    THEN v_rev.prev->>'min_bound'    ELSE min_bound END,
                 max_bound    = CASE WHEN v_rev.prev ? 'max_bound'    THEN v_rev.prev->>'max_bound'    ELSE max_bound END,
                 decimals     = CASE WHEN v_rev.prev ? 'decimals'     THEN (v_rev.prev->>'decimals')::smallint  ELSE decimals END,
                 format       = CASE WHEN v_rev.prev ? 'format'       THEN v_rev.prev->>'format'       ELSE format END,
                 preset       = CASE WHEN v_rev.prev ? 'preset'       THEN v_rev.prev->>'preset'       ELSE preset END,
                 max_length   = CASE WHEN v_rev.prev ? 'max_length'   THEN (v_rev.prev->>'max_length')::integer ELSE max_length END,
                 help_text_en = CASE WHEN v_rev.prev ? 'help_text_en' THEN v_rev.prev->>'help_text_en' ELSE help_text_en END,
                 help_text_am = CASE WHEN v_rev.prev ? 'help_text_am' THEN v_rev.prev->>'help_text_am' ELSE help_text_am END,
                 updated_at = now()
           WHERE attr_key = v_rev.entity_key;
        ELSE
          INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en, depends_on,
                                         unit, min_bound, max_bound, decimals, format, preset,
                                         max_length, help_text_am)
          VALUES (v_rev.prev->>'attr_key', v_rev.prev->>'name_en', v_rev.prev->>'attr_type',
                  CASE WHEN v_rev.prev->'options' = 'null'::jsonb THEN NULL ELSE v_rev.prev->'options' END,
                  v_rev.prev->>'help_text_en',
                  (SELECT p.id FROM public.attributes p
                    WHERE p.attr_key = NULLIF(btrim(COALESCE(v_rev.prev->>'depends_on','')), '')),
                  v_rev.prev->>'unit', v_rev.prev->>'min_bound', v_rev.prev->>'max_bound',
                  (v_rev.prev->>'decimals')::smallint, v_rev.prev->>'format', v_rev.prev->>'preset',
                  (v_rev.prev->>'max_length')::integer, v_rev.prev->>'help_text_am');
        END IF;

        SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_rev.entity_key;
        v_am := v_rev.prev->'am_state';
        IF v_attr IS NOT NULL AND v_am IS NOT NULL AND jsonb_typeof(v_am) = 'object' THEN
          INSERT INTO public.entity_translations
            (entity_type, entity_id, field, lang_code, value, status, machine, updated_by)
          VALUES ('attribute', v_attr, 'label', 'am', v_am->>'value',
                  COALESCE(v_am->>'status', 'edited'),
                  COALESCE((v_am->>'machine')::boolean, false), auth.uid())
          ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
            SET value = EXCLUDED.value, status = EXCLUDED.status,
                machine = EXCLUDED.machine, updated_by = EXCLUDED.updated_by,
                updated_at = now();
          PERFORM public.log_audit('entity_translation.undo_restore', 'attributes', v_attr::text,
            jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'label',
                               'restored', v_am));
        ELSIF v_attr IS NOT NULL AND v_am IS NOT NULL AND jsonb_typeof(v_am) = 'null' THEN
          DELETE FROM public.entity_translations
           WHERE entity_type = 'attribute' AND entity_id = v_attr
             AND field = 'label' AND lang_code = 'am';
          PERFORM public.log_audit('entity_translation.undo_remove', 'attributes', v_attr::text,
            jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'label'));
        END IF;
      END IF;
    ELSE
      -- LINK PASS B (INC-197) — the unlinked links come back and the changed
      -- links go to their full prev state (flags, display_order, card_rank,
      -- allowed_options + default_value since M-MAINT-2 Part B, and the D24
      -- condition since M-MAINT-3b).
      -- Every rank in the way was cleared in Pass A; the added links are gone.
      v_slug := split_part(v_rev.entity_key, '|', 1);
      v_key := split_part(v_rev.entity_key, '|', 2);
      SELECT id INTO v_cat FROM public.categories WHERE slug = v_slug;
      SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_key;
      IF v_cat IS NULL OR v_attr IS NULL THEN
        v_conflicted := v_conflicted + 1;
        CONTINUE;
      END IF;

      IF v_rev.prev IS NULL THEN
        DELETE FROM public.category_attribute_links
         WHERE category_id = v_cat AND attribute_id = v_attr;
      ELSE
        INSERT INTO public.category_attribute_links
          (category_id, attribute_id, is_required, is_filterable, display_order, card_rank,
           allowed_options, default_value, visible_when)
        VALUES (v_cat, v_attr,
                (v_rev.prev->>'is_required')::boolean,
                (v_rev.prev->>'is_filterable')::boolean,
                COALESCE((v_rev.prev->>'display_order')::int, 0),
                NULLIF(v_rev.prev->>'card_rank','')::int,
                CASE WHEN v_rev.prev->'allowed_options' IS NULL
                       OR v_rev.prev->'allowed_options' = 'null'::jsonb
                     THEN NULL
                     ELSE ARRAY(SELECT jsonb_array_elements_text(v_rev.prev->'allowed_options')) END,
                CASE WHEN v_rev.prev->'default_value' IS NULL
                       OR v_rev.prev->'default_value' = 'null'::jsonb
                     THEN NULL ELSE v_rev.prev->'default_value' END,
                CASE WHEN v_rev.prev->'visible_when' IS NULL
                       OR v_rev.prev->'visible_when' = 'null'::jsonb
                     THEN NULL ELSE v_rev.prev->'visible_when' END)
        ON CONFLICT (category_id, attribute_id) DO UPDATE
          SET is_required = EXCLUDED.is_required,
              is_filterable = EXCLUDED.is_filterable,
              display_order = EXCLUDED.display_order,
              card_rank = EXCLUDED.card_rank,
              allowed_options = EXCLUDED.allowed_options,
              default_value = EXCLUDED.default_value,
              visible_when = EXCLUDED.visible_when,
              updated_at = now();
      END IF;
    END IF;

    UPDATE public.attribute_import_revisions SET undone_at = now() WHERE id = v_rev.id;
    v_restored := v_restored + 1;
  END LOOP;

  PERFORM public.log_audit('attribute.import_undo', 'attributes', p_batch::text,
    jsonb_build_object('batch_id', p_batch, 'restored', v_restored, 'conflicted', v_conflicted));

  RETURN jsonb_build_object('batch_id', p_batch, 'restored', v_restored,
                            'conflicted', v_conflicted);
END $function$;

REVOKE ALL ON FUNCTION public.admin_undo_attribute_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_attribute_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_attribute_import(uuid) TO service_role;

-- ------------------------------------------------------------ THE EXPORT
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
           -- M-MAINT-2 Part B — the two per-link cells travel with the link.
           l.allowed_options,
           l.default_value,
           -- M-MAINT-3b — and the D24 condition.
           l.visible_when,
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
                 '')
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

-- ------------------------------------- THE OPTION SHAPE (INC-236, facts keys)
CREATE OR REPLACE FUNCTION public.attr_option_shape(p_key text, p_options jsonb)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SET search_path TO 'public'
AS $function$
DECLARE
  v_opt     jsonb;
  v_val     text;
  v_k       text;
  v_alias   text;
  v_all     text[] := ARRAY[]::text[];
  v_n       int;
  v_b       jsonb;
  v_bmin    text;
  v_bmax    text;
BEGIN
  IF p_options IS NULL OR jsonb_typeof(p_options) <> 'array' THEN RETURN NULL; END IF;

  FOR v_opt IN SELECT value FROM jsonb_array_elements(p_options)
  LOOP
    CONTINUE WHEN jsonb_typeof(v_opt) <> 'object';
    v_val := COALESCE(v_opt->>'value', '');

    FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt) k
    LOOP
      IF v_k NOT IN ('value','label_en','label_am','parent','active','bounds','aliases','allowed','facts') THEN
        RETURN p_key || '|' || v_val || '|unknownOptionKey:' || v_k;
      END IF;
    END LOOP;

    IF v_opt ? 'active' AND jsonb_typeof(v_opt->'active') <> 'boolean' THEN
      RETURN p_key || '|' || v_val || '|activeNotBoolean';
    END IF;

    IF v_opt ? 'aliases' THEN
      IF jsonb_typeof(v_opt->'aliases') <> 'array' THEN
        RETURN p_key || '|' || v_val || '|aliasesNotArray';
      END IF;
      v_n := jsonb_array_length(v_opt->'aliases');
      IF v_n < 1 OR v_n > 5 THEN
        RETURN p_key || '|' || v_val || '|aliasesCount:' || v_n::text;
      END IF;
      FOR v_alias IN SELECT x.value #>> '{}' FROM jsonb_array_elements(v_opt->'aliases') x
      LOOP
        IF v_alias IS NULL THEN RETURN p_key || '|' || v_val || '|aliasNotString'; END IF;
        IF char_length(v_alias) < 1 OR char_length(v_alias) > 32 THEN
          RETURN p_key || '|' || v_val || '|aliasLength:' || v_alias;
        END IF;
        IF v_alias ~ '[[:cntrl:]]' THEN
          RETURN p_key || '|' || v_val || '|aliasControlChar';
        END IF;
        IF lower(v_alias) = ANY (v_all) THEN
          RETURN p_key || '|' || v_val || '|aliasDuplicate:' || v_alias;
        END IF;
        v_all := v_all || lower(v_alias);
      END LOOP;
      IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_opt->'aliases') x
                  WHERE jsonb_typeof(x.value) <> 'string') THEN
        RETURN p_key || '|' || v_val || '|aliasNotString';
      END IF;
    END IF;

    IF v_opt ? 'bounds' THEN
      IF jsonb_typeof(v_opt->'bounds') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|boundsNotObject';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'bounds') k
      LOOP
        v_b := v_opt->'bounds'->v_k;
        IF jsonb_typeof(v_b) <> 'object' THEN
          RETURN p_key || '|' || v_val || '|boundsNotObject:' || v_k;
        END IF;
        IF EXISTS (SELECT 1 FROM jsonb_object_keys(v_b) bk WHERE bk NOT IN ('min','max')) THEN
          RETURN p_key || '|' || v_val || '|boundsUnknownKey:' || v_k;
        END IF;
        v_bmin := v_b #>> '{min}';
        v_bmax := v_b #>> '{max}';
        IF v_bmin IS NOT NULL AND NOT public.attr_bound_ok(v_bmin) THEN
          RETURN p_key || '|' || v_val || '|boundsBadValue:' || v_bmin;
        END IF;
        IF v_bmax IS NOT NULL AND NOT public.attr_bound_ok(v_bmax) THEN
          RETURN p_key || '|' || v_val || '|boundsBadValue:' || v_bmax;
        END IF;
        IF v_bmin ~ '^-?[0-9]+(\.[0-9]+)?$' AND v_bmax ~ '^-?[0-9]+(\.[0-9]+)?$'
           AND v_bmin::numeric > v_bmax::numeric THEN
          RETURN p_key || '|' || v_val || '|boundsMinAboveMax:' || v_k;
        END IF;
      END LOOP;
    END IF;

    -- DEC-057 — `allowed` is an object of select-target keys to value lists.
    IF v_opt ? 'allowed' THEN
      IF jsonb_typeof(v_opt->'allowed') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|allowedNotObject';
      END IF;
      IF (SELECT count(*) FROM jsonb_object_keys(v_opt->'allowed') ak) > 5 THEN
        RETURN p_key || '|' || v_val || '|allowedTooMany';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'allowed') k
      LOOP
        v_b := v_opt->'allowed'->v_k;
        IF jsonb_typeof(v_b) <> 'array' THEN
          RETURN p_key || '|' || v_val || '|allowedValuesNotArray:' || v_k;
        END IF;
        v_n := jsonb_array_length(v_b);
        IF v_n < 1 THEN
          RETURN p_key || '|' || v_val || '|allowedEmpty:' || v_k;
        END IF;
        IF v_n > 50 THEN
          RETURN p_key || '|' || v_val || '|allowedTooMany:' || v_k;
        END IF;
        IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_b) x
                    WHERE jsonb_typeof(x.value) <> 'string') THEN
          RETURN p_key || '|' || v_val || '|allowedValuesNotArray:' || v_k;
        END IF;
        IF (SELECT count(DISTINCT x.value #>> '{}') FROM jsonb_array_elements(v_b) x) <> v_n THEN
          RETURN p_key || '|' || v_val || '|allowedDuplicate:' || v_k;
        END IF;
      END LOOP;
    END IF;

    -- D18 — `facts` is a PREFILL, never a rule: an object of attribute keys to
    -- a scalar or a list of strings, at most 20 entries. The validator never
    -- reads it; the options read projects it for the form. BOUNDS ENFORCE,
    -- FACTS PREFILL.
    -- INC-236 — the KEY charset is the DEFINITION-KEY charset
    -- (^[a-z0-9_][a-z0-9_-]{1,63}$, hyphens allowed, matching attribute_key),
    -- so a real definition key such as 'fuel_type-vehicles' is accepted. The
    -- refusal text is unchanged: badFacts:key:<k>.
    IF v_opt ? 'facts' THEN
      IF jsonb_typeof(v_opt->'facts') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|badFacts:notObject';
      END IF;
      IF (SELECT count(*) FROM jsonb_object_keys(v_opt->'facts') fk) > 20 THEN
        RETURN p_key || '|' || v_val || '|badFacts:tooMany';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'facts') k
      LOOP
        IF v_k !~ '^[a-z0-9_][a-z0-9_-]{1,63}$' THEN
          RETURN p_key || '|' || v_val || '|badFacts:key:' || v_k;
        END IF;
        v_b := v_opt->'facts'->v_k;
        IF jsonb_typeof(v_b) = 'array' THEN
          v_n := jsonb_array_length(v_b);
          IF v_n < 1 OR v_n > 20 THEN
            RETURN p_key || '|' || v_val || '|badFacts:listLength:' || v_k;
          END IF;
          IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_b) x
                      WHERE jsonb_typeof(x.value) <> 'string') THEN
            RETURN p_key || '|' || v_val || '|badFacts:listNotStrings:' || v_k;
          END IF;
        ELSIF jsonb_typeof(v_b) NOT IN ('string','number','boolean') THEN
          RETURN p_key || '|' || v_val || '|badFacts:value:' || v_k;
        END IF;
      END LOOP;
    END IF;
  END LOOP;

  RETURN NULL;
END $function$;

REVOKE ALL ON FUNCTION public.attr_option_shape(text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_option_shape(text, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_option_shape(text, jsonb) TO service_role;

-- =====================================================================
-- IN-FILE PROOF P1 — INC-236, the facts key charset. Pure function calls.
-- =====================================================================
DO $proof1$
DECLARE
  v_msg text;
BEGIN
  v_msg := public.attr_option_shape('e2e_mmaint3b_probe',
    '[{"value":"electric","facts":{"fuel_type-vehicles":"electric","doors-cars":4}}]'::jsonb);
  IF v_msg IS NOT NULL THEN
    RAISE EXCEPTION 'P1 FAILED — hyphenated facts keys refused: %', v_msg;
  END IF;

  v_msg := public.attr_option_shape('e2e_mmaint3b_probe',
    '[{"value":"electric","facts":{"bad key!":1}}]'::jsonb);
  IF v_msg IS DISTINCT FROM 'e2e_mmaint3b_probe|electric|badFacts:key:bad key!' THEN
    RAISE EXCEPTION 'P1 FAILED — bad facts key not refused by name: %', COALESCE(v_msg,'<null>');
  END IF;

  RAISE NOTICE 'P1 PASSED — facts keys accept the definition-key charset; a bad key still refuses.';
END $proof1$;

-- =====================================================================
-- IN-FILE PROOF P2 — the links-file `visible_when` cell, end to end.
-- INC-222: a SCRATCH identity with an in-transaction role grant and its own
-- scratch session/factor/amr rows (the U1f-4 pattern) — never a real user id,
-- never a permission or step-up TOGGLE. Every scratch row is removed at the
-- end, the account FIRST.
-- =====================================================================
DO $proof2$
DECLARE
  v_uid     uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_factor  uuid := gen_random_uuid();
  v_cat     uuid;
  v_fuel    uuid;
  v_charge  uuid;
  v_link    uuid;
  v_plan    jsonb;
  v_res     jsonb;
  v_batch   uuid;
  v_exp     jsonb;
  v_row     jsonb;
  v_lrow    public.category_attribute_links%ROWTYPE;
  v_links   jsonb;
  v_schema  jsonb;
  v_can     boolean := true;
BEGIN
  -- ---------- scratch identity (the trigger seeds profile + directory) ----
  INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role,
                          created_at, updated_at)
  VALUES (v_uid, 'e2e-mmaint3b-admin@example.invalid', '{}'::jsonb,
          'authenticated', 'authenticated', now(), now());

  INSERT INTO public.user_roles (user_id, role_id, scope_type)
  SELECT v_uid, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';

  BEGIN
    INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_uid, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status,
                                 created_at, updated_at, secret)
    VALUES (v_factor, v_uid, 'mmaint3b-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
  EXCEPTION WHEN others THEN
    v_can := false;
  END;

  -- ---------- scratch taxonomy: a leaf with fuel + charging_type ----------
  INSERT INTO public.categories (name_en, slug, price_enabled, is_active,
                                 allow_listings, display_order)
  VALUES ('E2E MMaint3b Leaf', 'e2e-mmaint3b-leaf', true, true, true, 9997)
  RETURNING id INTO v_cat;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('e2e_mmaint3b_fuel', 'E2E MMaint3b Fuel', 'single_select',
          '[{"value":"electric","label_en":"Electric"},
            {"value":"petrol","label_en":"Petrol"}]'::jsonb)
  RETURNING id INTO v_fuel;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('e2e_mmaint3b_charge', 'E2E MMaint3b Charging Type', 'single_select',
          '[{"value":"ac","label_en":"AC"},
            {"value":"dc","label_en":"DC"}]'::jsonb)
  RETURNING id INTO v_charge;

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, display_order)
  VALUES (v_cat, v_fuel, false, false, 1);

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, display_order)
  VALUES (v_cat, v_charge, false, false, 2)
  RETURNING id INTO v_link;

  v_links := jsonb_build_array(jsonb_build_object(
    'row', 1,
    'category_slug', 'e2e-mmaint3b-leaf',
    'attribute_key', 'e2e_mmaint3b_charge',
    'is_required', 'false',
    'is_filterable', 'false',
    'visible_when', 'e2e_mmaint3b_fuel=electric'));

  -- ---- the PLAN carries the condition as a field diff ----
  v_plan := public.attr_import_plan('[]'::jsonb, v_links, NULL);
  IF v_plan->'links'->0->>'change' <> 'change'
     OR (v_plan->'links'->0->'visible_when'->>'key') <> 'e2e_mmaint3b_fuel'
     OR NOT (v_plan->'links'->0->'visible_when'->'in' @> '["electric"]'::jsonb)
     OR jsonb_array_length(v_plan->'refusals') <> 0 THEN
    RAISE EXCEPTION 'P2 FAILED (plan) — %', v_plan->'links';
  END IF;

  -- ---- an UNKNOWN SIBLING refuses BY NAME ----
  v_plan := public.attr_import_plan('[]'::jsonb,
    jsonb_build_array(jsonb_build_object(
      'row', 1, 'category_slug', 'e2e-mmaint3b-leaf',
      'attribute_key', 'e2e_mmaint3b_charge',
      'visible_when', 'e2e_mmaint3b_nope=electric')), NULL);
  IF v_plan->'refusals'->0->>'reason' <> 'badVisibleWhen'
     OR v_plan->'refusals'->0->>'detail' <> 'unknownSibling:e2e_mmaint3b_nope' THEN
    RAISE EXCEPTION 'P2 FAILED (unknownSibling) — %', v_plan->'refusals';
  END IF;

  -- ---- the ROW'S OWN KEY refuses, and a malformed cell refuses ----
  v_plan := public.attr_import_plan('[]'::jsonb,
    jsonb_build_array(jsonb_build_object(
      'row', 1, 'category_slug', 'e2e-mmaint3b-leaf',
      'attribute_key', 'e2e_mmaint3b_charge',
      'visible_when', 'e2e_mmaint3b_charge=ac')), NULL);
  IF v_plan->'refusals'->0->>'detail' <> 'self' THEN
    RAISE EXCEPTION 'P2 FAILED (self) — %', v_plan->'refusals';
  END IF;

  v_plan := public.attr_import_plan('[]'::jsonb,
    jsonb_build_array(jsonb_build_object(
      'row', 1, 'category_slug', 'e2e-mmaint3b-leaf',
      'attribute_key', 'e2e_mmaint3b_charge',
      'visible_when', 'e2e_mmaint3b_fuel')), NULL);
  IF v_plan->'refusals'->0->>'detail' <> 'badShape' THEN
    RAISE EXCEPTION 'P2 FAILED (badShape) — %', v_plan->'refusals';
  END IF;

  -- ---- a value the sibling does not offer refuses BY NAME ----
  v_plan := public.attr_import_plan('[]'::jsonb,
    jsonb_build_array(jsonb_build_object(
      'row', 1, 'category_slug', 'e2e-mmaint3b-leaf',
      'attribute_key', 'e2e_mmaint3b_charge',
      'visible_when', 'e2e_mmaint3b_fuel=hydrogen')), NULL);
  IF v_plan->'refusals'->0->>'detail' <> 'notInOptions:hydrogen' THEN
    RAISE EXCEPTION 'P2 FAILED (notInOptions) — %', v_plan->'refusals';
  END IF;

  IF NOT v_can THEN
    RAISE NOTICE 'P2 COMMIT/UNDO/EXPORT PATH DEFERRED: auth.* is not writable here';
  ELSE
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text)::text, true);

    -- ---- COMMIT applies the condition ----
    v_res := public.admin_commit_attribute_import('[]'::jsonb, v_links, NULL, NULL);
    v_batch := (v_res->>'batch_id')::uuid;
    SELECT * INTO v_lrow FROM public.category_attribute_links WHERE id = v_link;
    IF v_lrow.visible_when IS DISTINCT FROM
       '{"key":"e2e_mmaint3b_fuel","in":["electric"]}'::jsonb THEN
      RAISE EXCEPTION 'P2 FAILED (commit) — %', v_lrow.visible_when;
    END IF;

    -- ---- the SCHEMA READ projects it ----
    v_schema := public.get_posting_schema(v_cat);
    IF NOT EXISTS (
      SELECT 1 FROM jsonb_array_elements(v_schema->'attributes') x
       WHERE x.value->>'attr_key' = 'e2e_mmaint3b_charge'
         AND (x.value->'visible_when'->>'key') = 'e2e_mmaint3b_fuel') THEN
      RAISE EXCEPTION 'P2 FAILED (schema) — %', v_schema->'attributes';
    END IF;

    -- ---- the revision captured the BEFORE and the AFTER ----
    IF NOT EXISTS (
      SELECT 1 FROM public.attribute_import_revisions r
       WHERE r.batch_id = v_batch AND r.kind = 'link'
         AND (r.post->'visible_when'->>'key') = 'e2e_mmaint3b_fuel'
         AND (r.prev->'visible_when') = 'null'::jsonb) THEN
      RAISE EXCEPTION 'P2 FAILED — the revision did not capture the condition';
    END IF;

    -- ---- the EXPORT echoes it after default_value ----
    v_exp := public.attr_export_payload('e2e-mmaint3b-leaf');
    SELECT x.value INTO v_row
      FROM jsonb_array_elements(v_exp->'links') x
     WHERE x.value->>'attribute_key' = 'e2e_mmaint3b_charge';
    IF (v_row->>'visible_when') <> 'e2e_mmaint3b_fuel=electric' THEN
      RAISE EXCEPTION 'P2 FAILED (export) — %', v_row;
    END IF;

    -- ---- A BLANK CELL CHANGES NOTHING (the name_am rule) ----
    v_plan := public.attr_import_plan('[]'::jsonb,
      jsonb_build_array(jsonb_build_object(
        'row', 1, 'category_slug', 'e2e-mmaint3b-leaf',
        'attribute_key', 'e2e_mmaint3b_charge',
        'is_required', 'false', 'is_filterable', 'false',
        'visible_when', '')), NULL);
    IF v_plan->'links'->0->>'change' <> 'none' THEN
      RAISE EXCEPTION 'P2 FAILED (blank cell planned a change) — %', v_plan->'links';
    END IF;
    PERFORM public.admin_commit_attribute_import('[]'::jsonb,
      jsonb_build_array(jsonb_build_object(
        'row', 1, 'category_slug', 'e2e-mmaint3b-leaf',
        'attribute_key', 'e2e_mmaint3b_charge',
        'is_required', 'false', 'is_filterable', 'false',
        'visible_when', '')), NULL, NULL);
    SELECT * INTO v_lrow FROM public.category_attribute_links WHERE id = v_link;
    IF v_lrow.visible_when IS DISTINCT FROM
       '{"key":"e2e_mmaint3b_fuel","in":["electric"]}'::jsonb THEN
      RAISE EXCEPTION 'P2 FAILED (blank cell cleared the condition) — %', v_lrow.visible_when;
    END IF;

    -- ---- a MISSING COLUMN is ignored, too ----
    PERFORM public.admin_commit_attribute_import('[]'::jsonb,
      jsonb_build_array(jsonb_build_object(
        'row', 1, 'category_slug', 'e2e-mmaint3b-leaf',
        'attribute_key', 'e2e_mmaint3b_charge',
        'is_required', 'true', 'is_filterable', 'false')), NULL, NULL);
    SELECT * INTO v_lrow FROM public.category_attribute_links WHERE id = v_link;
    IF v_lrow.visible_when IS DISTINCT FROM
       '{"key":"e2e_mmaint3b_fuel","in":["electric"]}'::jsonb
       OR v_lrow.is_required IS NOT TRUE THEN
      RAISE EXCEPTION 'P2 FAILED (missing column) — % / %',
        v_lrow.visible_when, v_lrow.is_required;
    END IF;

    -- ---- UNDO restores the PRIOR condition (the first batch) ----
    v_res := public.admin_undo_attribute_import(v_batch);
    SELECT * INTO v_lrow FROM public.category_attribute_links WHERE id = v_link;
    IF v_lrow.visible_when IS NOT NULL THEN
      RAISE EXCEPTION 'P2 FAILED (undo) — %', v_lrow.visible_when;
    END IF;

    v_exp := public.attr_export_payload('e2e-mmaint3b-leaf');
    SELECT x.value INTO v_row
      FROM jsonb_array_elements(v_exp->'links') x
     WHERE x.value->>'attribute_key' = 'e2e_mmaint3b_charge';
    IF (v_row->>'visible_when') <> '' THEN
      RAISE EXCEPTION 'P2 FAILED (export after undo) — %', v_row;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
  END IF;

  -- ---------- cleanup: the account FIRST, then the scratch rows ----------
  DELETE FROM auth.users WHERE id = v_uid;
  DELETE FROM public.user_roles WHERE user_id = v_uid;
  DELETE FROM public.profiles WHERE user_id = v_uid;
  DELETE FROM public.user_directory WHERE user_id = v_uid;
  DELETE FROM auth.mfa_amr_claims WHERE session_id = v_session;
  DELETE FROM auth.mfa_factors WHERE id = v_factor;
  DELETE FROM auth.sessions WHERE id = v_session;
  DELETE FROM public.attribute_import_revisions
   WHERE entity_key IN ('e2e-mmaint3b-leaf|e2e_mmaint3b_charge',
                        'e2e-mmaint3b-leaf|e2e_mmaint3b_fuel',
                        'e2e_mmaint3b_charge', 'e2e_mmaint3b_fuel');
  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  DELETE FROM public.attributes WHERE id IN (v_fuel, v_charge);
  DELETE FROM public.category_tree_pointers WHERE child_id = v_cat OR parent_id = v_cat;
  DELETE FROM public.categories WHERE id = v_cat;

  IF EXISTS (SELECT 1 FROM public.categories WHERE slug = 'e2e-mmaint3b-leaf')
     OR EXISTS (SELECT 1 FROM public.attributes
                 WHERE attr_key IN ('e2e_mmaint3b_fuel','e2e_mmaint3b_charge'))
     OR EXISTS (SELECT 1 FROM auth.users WHERE id = v_uid) THEN
    RAISE EXCEPTION 'PROOF CLEANUP FAILED — scratch residue remains';
  END IF;

  RAISE NOTICE 'P2 PASSED — scratch identity and rows removed.';
END $proof2$;

-- ------------------------------------------------------------ READ-BACKS
DO $readback$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ')' AS sig,
           md5(p.prosrc) AS body_md5,
           p.prosecdef AS definer
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('admin_undo_attribute_import','attr_export_payload',
                         'attr_option_shape')
     ORDER BY 1
  LOOP
    RAISE NOTICE 'READ-BACK fn % definer=% md5=%', r.sig, r.definer, r.body_md5;
  END LOOP;

  IF (SELECT p.prosrc FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'attr_export_payload')
     NOT LIKE '%visible_when%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED — the export does not echo the condition';
  END IF;
  IF (SELECT p.prosrc FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'admin_undo_attribute_import')
     NOT LIKE '%visible_when = EXCLUDED.visible_when%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED — the undo does not restore the condition';
  END IF;
  IF (SELECT p.prosrc FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'attr_option_shape')
     NOT LIKE '%[a-z0-9_][a-z0-9_-]{1,63}%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED — the facts key charset was not applied';
  END IF;
  RAISE NOTICE 'READ-BACK OK — undo, export and the facts charset are in place.';
END $readback$;

-- --------------------------------------------------------------- THE MARK
INSERT INTO public.migration_marks (version)
VALUES ('20260920090002')
ON CONFLICT DO NOTHING;