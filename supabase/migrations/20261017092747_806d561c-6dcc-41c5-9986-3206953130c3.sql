-- Bundle 19 turn 9c (2026-10-17). Tier A. D201 §4 — M2 PART c2 OF EIGHT: attr_import_plan's TEXT, CHUNK 2 OF 4.
-- e2e-areas: admin-attributes
-- attr_import_plan(jsonb, jsonb, text) [last declared 20261005171442] is redeclared WHOLE (INC-183 law) with the fact cell:
-- read only when the file carries the column (fact_set — blank clears, 1–4 sets, else badFactRank); a fact_rank-only
-- change is a change; the END-STATE direct clash check (factRankClash) mirrors the card rank's (INC-327). Its whole
-- declaration is 67,232 bytes — larger than the migration tool carries in one call — so the text travels in four
-- line-aligned chunks (every boundary outside any literal) through public.migration_text_parts; part c4 joins them
-- with newlines, proves the joined text's fingerprint equals the declaration's, EXECUTEs it, restates the grants,
-- proves the live body and the planner's six cases, and drops the table. Each chunk part proves its own chunk's
-- fingerprint, so a mis-typed chunk is refused where it happens and re-submitted alone.
-- BODY PROOFS (DEC-190): a body is proven by its FINGERPRINT — md5 of the text with carriage returns and `--` comments
-- removed and, outside single-quoted literals, every run of whitespace collapsed to one space — so the spacing a
-- retyped submission may change never refuses an apply (INC-685), while any changed token or literal still does;
-- header attributes (volatility, SECURITY DEFINER, search_path) are proven as before. A clean apply is the pass.
-- The mark 20261018150300.
-- Applied on ethio-prod by the executor's migration tool (DEC-188); the operator applies the saved files on ethio-staging
-- in order and reads back the marks. The eight parts are applied in order a → b → c1 → c2 → c3 → c4 → d → e in one turn,
-- nothing between them; each later part's first block refuses to run before the earlier one has landed; every part is
-- idempotent (a second apply changes nothing and the proofs still run).

-- ===== gate — part c1 must have landed =====
DO $gate$
BEGIN
  IF to_regclass('public.migration_text_parts') IS NULL THEN
    RAISE EXCEPTION 'B19M2c2: part c1 (mark 20261018150200) has not landed — apply the parts in order';
  END IF;
  IF (SELECT count(*) FROM public.migration_text_parts WHERE fn = 'attr_import_plan' AND seq < 2) <> 1 THEN
    RAISE EXCEPTION 'B19M2c2: part c1 (mark 20261018150200) has not landed — apply it first';
  END IF;
END $gate$;

-- ===== chunk 2 (lines 387–705 of the declaration) =====
DELETE FROM public.migration_text_parts WHERE fn = 'attr_import_plan' AND seq = 2;
INSERT INTO public.migration_text_parts (fn, seq, body) VALUES ('attr_import_plan', 2, $b19chunk$
    v_fmt     := CASE WHEN v_cells ? 'format'       THEN v_cells->>'format'       ELSE v_att.format END;
    v_pset    := CASE WHEN v_cells ? 'preset'       THEN v_cells->>'preset'       ELSE v_att.preset END;
    v_help_en := CASE WHEN v_cells ? 'help_text_en' THEN v_cells->>'help_text_en' ELSE v_att.help_text_en END;
    v_help_am := CASE WHEN v_cells ? 'help_text_am' THEN v_cells->>'help_text_am' ELSE v_att.help_text_am END;

    v_dec := v_att.decimals;
    IF v_cells ? 'decimals' THEN
      BEGIN
        v_dec := NULLIF(v_cells->>'decimals', '')::int;
      EXCEPTION WHEN others THEN
        v_bad_cell := 'decimals|notANumber|' || COALESCE(v_cells->>'decimals', '');
      END;
    END IF;
    v_maxlen := v_att.max_length;
    IF v_bad_cell IS NULL AND v_cells ? 'max_length' THEN
      BEGIN
        v_maxlen := NULLIF(v_cells->>'max_length', '')::int;
      EXCEPTION WHEN others THEN
        v_bad_cell := 'max_length|notANumber|' || COALESCE(v_cells->>'max_length', '');
      END;
    END IF;

    IF v_bad_cell IS NULL THEN
      v_bad_cell := public.attr_cell_check(v_type, v_unit, v_minb, v_maxb, v_dec,
                                           v_fmt, v_pset, v_maxlen, v_help_en, v_help_am,
                                           v_unit_am);
    END IF;

    IF v_bad_cell IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','definitions','row',v_row,'key',v_key,'reason','badCell',
        'cell', split_part(v_bad_cell, '|', 1),
        'detail', split_part(v_bad_cell, '|', 2),
        'value', split_part(v_bad_cell, '|', 3));
      CONTINUE;
    END IF;

    IF v_att.id IS NULL THEN
      v_cell_change := (v_cells <> '{}'::jsonb);
    ELSE
      v_cell_change :=
           ((v_cells ? 'unit')         AND v_unit    IS DISTINCT FROM v_att.unit)
        OR ((v_cells ? 'unit_am')      AND v_unit_am IS DISTINCT FROM v_att.unit_am)
        OR ((v_cells ? 'min_bound')    AND v_minb    IS DISTINCT FROM v_att.min_bound)
        OR ((v_cells ? 'max_bound')    AND v_maxb    IS DISTINCT FROM v_att.max_bound)
        OR ((v_cells ? 'decimals')     AND v_dec     IS DISTINCT FROM v_att.decimals::int)
        OR ((v_cells ? 'format')       AND v_fmt    IS DISTINCT FROM v_att.format)
        OR ((v_cells ? 'preset')       AND v_pset   IS DISTINCT FROM v_att.preset)
        OR ((v_cells ? 'max_length')   AND v_maxlen IS DISTINCT FROM v_att.max_length)
        OR ((v_cells ? 'help_text_en') AND v_help_en IS DISTINCT FROM v_att.help_text_en)
        OR ((v_cells ? 'help_text_am') AND v_help_am IS DISTINCT FROM v_att.help_text_am);
    END IF;

    -- The verdict itself is deferred: only the WHOLE file can say whether a
    -- dependency names a definition this same file creates.
    v_defs := v_defs || jsonb_build_object(
      'row', v_row, 'key', v_key, 'action', 'upsert',
      'id', v_att.id, 'name_en', v_name,
      'attr_type', v_type, 'options', v_options,
      'depends_on', v_depends,
      'depends_col', (e ? 'depends_on') OR v_depends <> '',
      'am_change', v_am_change,
      'label_am', CASE WHEN v_label_am <> '' AND (v_att.id IS NULL OR v_am_change)
                       THEN v_label_am ELSE NULL END,
      'cells', v_cells, 'cell_change', v_cell_change);
  END LOOP;

  --------------------------------------------- DEC-045b: dependency verdicts
  v_out := '[]'::jsonb;
  FOR v_entry IN SELECT value FROM jsonb_array_elements(v_defs)
  LOOP
    IF v_entry->>'action' <> 'upsert' THEN
      v_out := v_out || jsonb_build_array(v_entry);
      CONTINUE;
    END IF;

    v_key := v_entry->>'key';
    v_row := COALESCE((v_entry->>'row')::int, 0);
    v_depends := btrim(COALESCE(v_entry->>'depends_on',''));
    v_options := CASE WHEN v_entry->'options' = 'null'::jsonb THEN NULL ELSE v_entry->'options' END;
    v_reason := NULL;
    v_dep_vals := NULL;

    IF v_depends <> '' THEN
      IF v_depends = v_key THEN
        v_reason := 'dependsSelf';
      ELSE
        SELECT x.value INTO v_pentry
          FROM jsonb_array_elements(v_defs) x
         WHERE x.value->>'key' = v_depends AND x.value->>'action' = 'upsert'
         LIMIT 1;
        v_ptype := NULL;
        v_popts := NULL;
        IF v_pentry IS NOT NULL THEN
          v_ptype := v_pentry->>'attr_type';
          v_popts := CASE WHEN v_pentry->'options' = 'null'::jsonb THEN NULL ELSE v_pentry->'options' END;
        ELSE
          SELECT a.attr_type, a.options INTO v_ptype, v_popts
            FROM public.attributes a WHERE a.attr_key = v_depends;
          IF v_ptype IS NULL THEN v_reason := 'unknownParent'; END IF;
        END IF;

        IF v_reason IS NULL AND v_ptype IS DISTINCT FROM 'single_select' THEN
          v_reason := 'dependsNotSelect';
        END IF;

        -- CYCLE: walk the chain the file would leave behind (file overlays DB).
        IF v_reason IS NULL THEN
          v_walk := v_depends;
          v_hops := 0;
          WHILE v_walk IS NOT NULL AND v_walk <> '' AND v_hops < 32 LOOP
            v_hops := v_hops + 1;
            SELECT btrim(COALESCE(x.value->>'depends_on','')) INTO v_step
              FROM jsonb_array_elements(v_defs) x
             WHERE x.value->>'key' = v_walk AND x.value->>'action' = 'upsert'
             LIMIT 1;
            IF NOT FOUND THEN
              SELECT COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), '')
                INTO v_step FROM public.attributes a WHERE a.attr_key = v_walk;
            END IF;
            EXIT WHEN v_step IS NULL OR v_step = '';
            IF v_step = v_key THEN
              v_reason := 'dependsCycle';
              EXIT;
            END IF;
            v_walk := v_step;
          END LOOP;
        END IF;

        -- AT-25's law: every `parent` names a VALUE of the parent definition.
        IF v_reason IS NULL THEN
          SELECT array_agg(COALESCE(x.value->>'value', trim(both '"' from x.value::text)))
            INTO v_dep_vals
            FROM jsonb_array_elements(COALESCE(v_popts, '[]'::jsonb)) x
           WHERE NOT (jsonb_typeof(x.value) = 'object' AND NOT (x.value ? 'value'));
          v_parent_ok := true;
          FOR v_option IN SELECT value FROM jsonb_array_elements(COALESCE(v_options, '[]'::jsonb)) LOOP
            IF jsonb_typeof(v_option) = 'object'
               AND btrim(COALESCE(v_option->>'parent','')) <> '' THEN
              v_parent := btrim(v_option->>'parent');
              IF v_dep_vals IS NULL OR NOT (v_parent = ANY (v_dep_vals)) THEN
                v_parent_ok := false;
              END IF;
            END IF;
          END LOOP;
          IF NOT v_parent_ok THEN v_reason := 'badParent'; END IF;
        END IF;
      END IF;
    ELSE
      -- A `parent` without a dependency has nothing to be a parent of.
      IF EXISTS (
        SELECT 1 FROM jsonb_array_elements(COALESCE(v_options, '[]'::jsonb)) x
         WHERE jsonb_typeof(x.value) = 'object' AND x.value ? 'parent'
           AND btrim(COALESCE(x.value->>'parent','')) <> ''
      ) THEN
        v_reason := 'badParent';
      END IF;
    END IF;

    IF v_reason IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','definitions','row',v_row,'key',v_key,'reason',v_reason,'detail',v_depends);
      CONTINUE;
    END IF;

    -- THE VERDICT, dependency included.
    SELECT * INTO v_att FROM public.attributes WHERE attr_key = v_key;
    v_cur_dep := NULL;
    IF v_att.id IS NOT NULL THEN
      SELECT COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = v_att.depends_on), '')
        INTO v_cur_dep;
    END IF;
    v_dep_change := COALESCE((v_entry->>'depends_col')::boolean, false)
                    AND COALESCE(v_cur_dep,'') IS DISTINCT FROM v_depends;

    IF v_att.id IS NULL THEN
      -- IE-8 — RENAME DETECTOR. A new key whose label_en + type + options match
      -- a definition ABSENT from this file is a renamed identity, not an add.
      SELECT a.attr_key INTO v_rename
        FROM public.attributes a
       WHERE a.attr_key <> v_key
         AND NOT (a.attr_key = ANY (v_seen_defs))
         AND btrim(COALESCE(a.name_en, '')) = COALESCE(v_entry->>'name_en', '')
         AND a.attr_type = COALESCE(v_entry->>'attr_type', '')
         AND public.attr_option_norm(a.options) IS NOT DISTINCT FROM public.attr_option_norm(v_options)
       ORDER BY a.attr_key
       LIMIT 1;
      IF v_rename IS NOT NULL THEN
        v_refusals := v_refusals || jsonb_build_object(
          'file','definitions','row',v_row,'key',v_key,
          'reason','keyRename','detail',v_rename);
        CONTINUE;
      END IF;
      v_change := 'add';
    ELSIF btrim(COALESCE(v_att.name_en,'')) IS DISTINCT FROM (v_entry->>'name_en')
       OR v_att.attr_type IS DISTINCT FROM (v_entry->>'attr_type')
       OR public.attr_option_norm(v_att.options) IS DISTINCT FROM public.attr_option_norm(v_options)
       OR public.attr_option_norm_v2(v_att.options) IS DISTINCT FROM public.attr_option_norm_v2(v_options)
       OR COALESCE((v_entry->>'am_change')::boolean, false)
       OR COALESCE((v_entry->>'cell_change')::boolean, false)
       OR v_dep_change THEN
      v_change := 'change';
    ELSE
      v_change := 'none';
    END IF;

    -- M8b / B3 (INC-438) — A VALUE STILL IN USE. A change that REMOVES an
    -- option value (absent from the row, or turned active=false while active)
    -- is refused while a cell of the catalogue still names that value of THIS
    -- key: (1) visible_when on any link, (2) allowed_options / default_value on
    -- this definition's links, (3) another definition's option allowed / facts,
    -- (4) a dependent definition's option parent. A holder this same file
    -- unlinks or rewrites so it no longer names the value is not counted.
    IF v_change = 'change' AND v_att.id IS NOT NULL THEN
      SELECT COALESCE(array_agg(DISTINCT s.v ORDER BY s.v), ARRAY[]::text[]) INTO v_removed
        FROM (SELECT CASE WHEN jsonb_typeof(t.o) = 'object' THEN btrim(COALESCE(t.o->>'value', ''))
                          ELSE btrim(t.o #>> '{}') END AS v,
                     CASE WHEN jsonb_typeof(t.o) = 'object' THEN COALESCE(t.o->>'active', 'true') <> 'false'
                          ELSE true END AS act
                FROM jsonb_array_elements(CASE WHEN jsonb_typeof(v_att.options) = 'array'
                                               THEN v_att.options ELSE '[]'::jsonb END) AS t(o)
               WHERE NOT (jsonb_typeof(t.o) = 'object' AND NOT (t.o ? 'value'))) s
       WHERE s.v <> ''
         AND (NOT EXISTS (
                SELECT 1 FROM jsonb_array_elements(CASE WHEN jsonb_typeof(v_options) = 'array'
                                                        THEN v_options ELSE '[]'::jsonb END) AS n(o)
                 WHERE (CASE WHEN jsonb_typeof(n.o) = 'object' THEN btrim(COALESCE(n.o->>'value', ''))
                             ELSE btrim(n.o #>> '{}') END) = s.v)
              OR (s.act AND EXISTS (
                SELECT 1 FROM jsonb_array_elements(CASE WHEN jsonb_typeof(v_options) = 'array'
                                                        THEN v_options ELSE '[]'::jsonb END) AS n(o)
                 WHERE jsonb_typeof(n.o) = 'object'
                   AND btrim(COALESCE(n.o->>'value', '')) = s.v
                   AND n.o->>'active' = 'false')));

      IF COALESCE(array_length(v_removed, 1), 0) > 0 THEN
        WITH rv AS (SELECT unnest(v_removed) AS val),
        h AS (
          -- (1) a D24 condition on any link names this key with the value.
          SELECT rv.val, c.slug || '·' || a.attr_key || '·visible_when' AS holder
            FROM public.category_attribute_links l
            JOIN public.categories c ON c.id = l.category_id
            JOIN public.attributes a ON a.id = l.attribute_id
            JOIN rv ON ((l.visible_when->>'key') = v_key
                        AND jsonb_typeof(l.visible_when->'in') = 'array'
                        AND (l.visible_when->'in') ? rv.val)
                    OR ((l.visible_when->'and'->>'key') = v_key
                        AND jsonb_typeof(l.visible_when->'and'->'in') = 'array'
                        AND (l.visible_when->'and'->'in') ? rv.val)
           WHERE l.visible_when IS NOT NULL
             AND NOT EXISTS (
                   SELECT 1 FROM jsonb_array_elements(v_file_links) AS f(f)
                    WHERE f.f->>'slug' = c.slug AND f.f->>'key' = a.attr_key
                      AND ((f.f->>'unlink')::boolean
                           OR (f.f->>'vw' IS NOT NULL AND NOT EXISTS (
                                 SELECT 1 FROM unnest(string_to_array(f.f->>'vw', '&')) AS p(p)
                                  WHERE btrim(split_part(p.p, '=', 1)) = v_key
                                    AND position('=' in p.p) > 0
                                    AND rv.val = ANY (ARRAY(
                                          SELECT btrim(q) FROM unnest(string_to_array(
                                            substr(p.p, position('=' in p.p) + 1), '|')) AS q))))))
          UNION ALL
          -- (2a) this definition's link shortlists.
          SELECT rv.val, c.slug || '·' || v_key || '·allowed_options'
            FROM public.category_attribute_links l
            JOIN public.categories c ON c.id = l.category_id
            JOIN rv ON rv.val = ANY (l.allowed_options)
           WHERE l.attribute_id = v_att.id
             AND NOT EXISTS (
                   SELECT 1 FROM jsonb_array_elements(v_file_links) AS f(f)
                    WHERE f.f->>'slug' = c.slug AND f.f->>'key' = v_key
                      AND ((f.f->>'unlink')::boolean
                           OR ((f.f->>'alw_set')::boolean
                               AND NOT (rv.val = ANY (ARRAY(
                                     SELECT btrim(q) FROM unnest(string_to_array(f.f->>'alw', '|')) AS q))))))
          UNION ALL
          -- (2b) this definition's link defaults (a scalar or a list).
          SELECT rv.val, c.slug || '·' || v_key || '·default_value'
            FROM public.category_attribute_links l
            JOIN public.categories c ON c.id = l.category_id
            JOIN rv ON (jsonb_typeof(l.default_value) = 'string' AND l.default_value #>> '{}' = rv.val)
                    OR (jsonb_typeof(l.default_value) = 'array' AND l.default_value ? rv.val)
           WHERE l.attribute_id = v_att.id
             AND NOT EXISTS (
                   SELECT 1 FROM jsonb_array_elements(v_file_links) AS f(f)
                    WHERE f.f->>'slug' = c.slug AND f.f->>'key' = v_key
                      AND ((f.f->>'unlink')::boolean
                           OR ((f.f->>'dflt_set')::boolean
                               AND NOT (rv.val = ANY (ARRAY(
                                     SELECT btrim(q) FROM unnest(string_to_array(f.f->>'dflt', '|')) AS q))))))
          UNION ALL
          -- (3) another definition's option record: allowed / facts name the value.
          SELECT rv.val, COALESCE(t.o->>'value', '') || '·' || d.attr_key || '·' || k.cell
            FROM public.attributes d
            CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(d.options) = 'array'
                                                         THEN d.options ELSE '[]'::jsonb END) AS t(o)
            CROSS JOIN (VALUES ('allowed'), ('facts')) AS k(cell)
            JOIN rv ON jsonb_typeof(t.o) = 'object'
                   AND jsonb_typeof(t.o->k.cell) = 'object'
                   AND ((t.o->k.cell->v_key) = to_jsonb(rv.val)
                        OR (jsonb_typeof(t.o->k.cell->v_key) = 'array' AND (t.o->k.cell->v_key) ? rv.val))
           WHERE d.id <> v_att.id
             AND NOT EXISTS (
                   SELECT 1 FROM jsonb_array_elements(v_defs) x
                    WHERE x.value->>'key' = d.attr_key
                      AND (x.value->>'action' = 'delete'
                           OR NOT EXISTS (
                                SELECT 1 FROM jsonb_array_elements(CASE WHEN jsonb_typeof(x.value->'options') = 'array'
                                                                        THEN x.value->'options' ELSE '[]'::jsonb END) AS t2(o)
                                 WHERE jsonb_typeof(t2.o) = 'object'
                                   AND jsonb_typeof(t2.o->k.cell) = 'object'
                                   AND ((t2.o->k.cell->v_key) = to_jsonb(rv.val)
                                        OR (jsonb_typeof(t2.o->k.cell->v_key) = 'array'
                                            AND (t2.o->k.cell->v_key) ? rv.val)))))
          UNION ALL
          -- (4) a dependent definition's option names the value as its parent.
          SELECT rv.val, COALESCE(t.o->>'value', '') || '·' || d.attr_key || '·parent'
            FROM public.attributes d
            CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(d.options) = 'array'
$b19chunk$);
DO $proof$
DECLARE v_fp text;
BEGIN
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.body, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)) INTO v_fp FROM public.migration_text_parts p WHERE p.fn = 'attr_import_plan' AND p.seq = 2;
  IF v_fp <> 'ee65d4603258afbf17450454f66dc219' THEN
    RAISE EXCEPTION 'B19M2c2: chunk 2 is not the attachment''s text (fingerprint %) — submit part c2 again, exactly as attached', v_fp;
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018150300') ON CONFLICT (version) DO NOTHING;
