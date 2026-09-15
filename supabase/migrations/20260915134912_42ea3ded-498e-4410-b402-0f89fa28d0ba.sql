-- INC-200 — A TYPE CHANGE CLEARS THE CELLS THAT NO LONGER APPLY.
--
-- WHAT HAPPENED. The library sweep converted compatible_make from text to
-- multi_select. The planner's change path treats an ABSENT cell as "leave as
-- is", so preset = free:40 and max_length = 40 survived onto the select and
-- attributes_max_length_check / attributes_preset_check refused the write.
--
-- CENSUS NOTE, stated plainly (this is why a THIRD function is re-declared
-- here, beyond the two the task names): admin_commit_attribute_import does NOT
-- call admin_upsert_attribute for definition upserts — it writes the row
-- itself, and it writes the TYPE in one statement (line 99 of 20260914095503)
-- and the v2 CELLS in a LATER statement (line 111). Both CHECKs are plain,
-- non-deferrable table constraints, so they fire on the FIRST statement, while
-- preset/max_length still hold the old type's values. Clearing in the planner
-- and in the door alone would therefore NOT fix the observed failure. The
-- commit is re-declared WHOLE (the body of 20260914095503, changed only in
-- PHASE 1, where the type and the cells now travel in ONE statement).
--
-- INC-183 law: attr_import_plan, admin_upsert_attribute and
-- admin_commit_attribute_import are re-declared WHOLE; every other function is
-- untouched and proven so by read-back. Closers restated in-file (A8/DEC-022-B).
-- DEC-022: declared mark 20260915150000.

------------------------------------------------------------------ BEFORE STATE
CREATE TEMP TABLE inc200_before ON COMMIT DROP AS
SELECT p.oid                          AS fn_oid,
       p.proname,
       md5(p.prosrc)                AS src_md5,
       COALESCE(p.proacl::text, '')  AS acl
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
 WHERE n.nspname = 'public'
   AND p.proname IN ('attr_import_plan', 'admin_upsert_attribute',
                     'admin_commit_attribute_import',
                     'admin_undo_attribute_import', 'admin_export_attributes',
                     'attr_cell_check', 'attr_option_shape', 'admin_merge_attributes');

/* ===================== 1. THE PLANNER (whole re-declaration) ============== */
CREATE OR REPLACE FUNCTION public.attr_import_plan(p_definitions jsonb, p_links jsonb, p_scope text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_types      text[] := ARRAY['text','number','single_select','multi_select','boolean','date'];
  v_scope_id   uuid;
  v_scope_ids  uuid[] := NULL;
  v_defs       jsonb := '[]'::jsonb;
  v_out        jsonb;
  v_ordered    jsonb;
  v_pending    jsonb;
  v_next       jsonb;
  v_guard      int;
  v_lnks       jsonb := '[]'::jsonb;
  v_refusals   jsonb := '[]'::jsonb;
  v_seen_defs  text[] := ARRAY[]::text[];
  v_seen_lnks  text[] := ARRAY[]::text[];
  v_new_keys   text[] := ARRAY[]::text[];
  e            jsonb;
  v_row        int;
  v_key        text;
  v_action     text;
  v_type       text;
  v_raw        text;
  v_seg        text;
  v_piece      jsonb;
  v_options    jsonb;
  v_depends    text;
  v_entry      jsonb;
  v_option     jsonb;
  v_parent     text;
  v_parent_ok  boolean;
  v_dep_vals   text[];
  v_att        public.attributes%ROWTYPE;
  v_name       text;
  v_change     text;
  v_cat        public.categories%ROWTYPE;
  v_origin     text;
  v_req        boolean;
  v_filt       boolean;
  v_rank       int;
  v_link       public.category_attribute_links%ROWTYPE;
  v_attr_id    uuid;
  v_bad        boolean;
  v_cats       text[];
  v_label_am   text;
  v_cur_am     text;
  v_am_change  boolean;
  v_pentry     jsonb;
  v_ptype      text;
  v_popts      jsonb;
  v_walk       text;
  v_step       text;
  v_hops       int;
  v_reason     text;
  v_cur_dep    text;
  v_dep_change boolean;
  -- IE-5 — the file's own unlinks, keyed '<category slug>|<attribute key>'.
  v_unlinks    text[] := ARRAY[]::text[];
  -- IE-6 — is this links row a DIRECT row, or an inherited echo?
  v_direct     boolean;
  -- IE-8 — the existing key a brand-new key would silently rename.
  v_rename     text;
  -- DEC-050 — definition v2 cells and the strict option shape.
  v_cells      jsonb;
  v_cell       text;
  v_calias     text;
  v_cellval    text;
  v_cell_change boolean;
  v_bad_cell   text;
  v_optmsg     text;
  v_unit       text;
  v_minb       text;
  v_maxb       text;
  v_fmt        text;
  v_pset       text;
  v_help_en    text;
  v_help_am    text;
  v_dec        int;
  v_maxlen     int;
  v_ocats      uuid[];
  v_tcats      uuid[];
  v_detail     text;
  -- DEC-050 L2a — the inherited card rank a direct row would collide with.
  v_conflict   text;
  -- DEC-057 — the option-conditioned allowed refusal, or NULL.
  v_allowed    jsonb;
  -- DEC-057 L2-mig — the post-plan definitions overlay the rule resolves through.
  v_overlay    jsonb := '[]'::jsonb;
  -- INC-200 — the type this row leaves behind, when it changes.
  v_newtype    text;
BEGIN
  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    SELECT id INTO v_scope_id FROM public.categories WHERE slug = btrim(p_scope);
    IF v_scope_id IS NULL THEN
      RAISE EXCEPTION 'unknown category scope';
    END IF;
    WITH RECURSIVE sub AS (
      SELECT v_scope_id AS id
      UNION
      SELECT c.id FROM public.categories c JOIN sub s ON s.id = public.cat_primary_parent(c.id)
    )
    SELECT array_agg(id) INTO v_scope_ids FROM sub;
  END IF;

  -- IE-5 — the file's unlinks are read BEFORE the definition verdicts, so a
  -- delete is judged against the links that SURVIVE this same pass.
  SELECT COALESCE(array_agg(c.slug || '|' || btrim(COALESCE(x.value->>'attribute_key', ''))), ARRAY[]::text[])
    INTO v_unlinks
    FROM jsonb_array_elements(COALESCE(p_links, '[]'::jsonb)) x
    JOIN public.categories c ON c.slug = btrim(COALESCE(x.value->>'category_slug', ''))
   WHERE lower(btrim(COALESCE(x.value->>'action', ''))) = 'unlink'
     AND (v_scope_ids IS NULL OR c.id = ANY (v_scope_ids))
     AND btrim(COALESCE(x.value->>'origin', '')) IN ('', c.slug);

  ---------------------------------------------------------------- definitions
  FOR e IN SELECT value FROM jsonb_array_elements(COALESCE(p_definitions, '[]'::jsonb))
  LOOP
    v_row := COALESCE((e->>'row')::int, 0);
    v_key := btrim(COALESCE(e->>'attribute_key', ''));
    v_action := lower(COALESCE(NULLIF(btrim(COALESCE(e->>'action','')), ''), 'upsert'));

    IF v_key = '' THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key','','reason','missingKey');
      CONTINUE;
    END IF;
    IF v_key = ANY (v_seen_defs) THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','duplicateKey');
      CONTINUE;
    END IF;
    v_seen_defs := v_seen_defs || v_key;

    IF v_action NOT IN ('upsert','delete') THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','badAction');
      CONTINUE;
    END IF;

    SELECT * INTO v_att FROM public.attributes WHERE attr_key = v_key;

    IF v_action = 'delete' THEN
      IF v_att.id IS NULL THEN
        v_defs := v_defs || jsonb_build_object('row',v_row,'key',v_key,'action','delete','change','none');
        CONTINUE;
      END IF;
      -- IE-4b — the refusal NAMES the categories that hold the attribute down.
      -- IE-5 — a link this SAME FILE unlinks holds nothing down.
      SELECT array_agg(c.slug ORDER BY c.slug) INTO v_cats
        FROM public.category_attribute_links l
        JOIN public.categories c ON c.id = l.category_id
       WHERE l.attribute_id = v_att.id
         AND NOT ((c.slug || '|' || v_key) = ANY (v_unlinks));
      IF COALESCE(array_length(v_cats, 1), 0) > 0 THEN
        v_refusals := v_refusals || jsonb_build_object(
          'file','definitions','row',v_row,'key',v_key,'reason','blastRadius',
          'detail', array_to_string(COALESCE(v_cats, ARRAY[]::text[]), ', '),
          'categories', to_jsonb(COALESCE(v_cats, ARRAY[]::text[])));
        CONTINUE;
      END IF;
      -- DEC-045b — a parent with dependents is held down by them, too.
      IF EXISTS (SELECT 1 FROM public.attributes d WHERE d.depends_on = v_att.id) THEN
        SELECT array_agg(d.attr_key ORDER BY d.attr_key) INTO v_cats
          FROM public.attributes d WHERE d.depends_on = v_att.id;
        v_refusals := v_refusals || jsonb_build_object(
          'file','definitions','row',v_row,'key',v_key,'reason','hasDependents',
          'detail', array_to_string(COALESCE(v_cats, ARRAY[]::text[]), ', '));
        CONTINUE;
      END IF;
      v_defs := v_defs || jsonb_build_object('row',v_row,'key',v_key,'action','delete','change','delete','id',v_att.id);
      CONTINUE;
    END IF;

    v_type := lower(btrim(COALESCE(e->>'type','')));
    IF NOT (v_type = ANY (v_types)) THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','unknownType');
      CONTINUE;
    END IF;

    v_raw := COALESCE(e->>'options', '');
    v_options := NULL;
    v_bad := false;
    IF btrim(v_raw) <> '' THEN
      IF left(btrim(v_raw), 1) = '[' THEN
        v_options := public.attr_json_or_null(btrim(v_raw));
        IF v_options IS NULL OR jsonb_typeof(v_options) <> 'array' THEN v_bad := true; END IF;
      ELSE
        v_options := '[]'::jsonb;
        FOREACH v_seg IN ARRAY string_to_array(v_raw, '|')
        LOOP
          CONTINUE WHEN btrim(v_seg) = '';
          IF left(btrim(v_seg), 1) = '{' THEN
            v_piece := public.attr_json_or_null(btrim(v_seg));
            IF v_piece IS NULL OR jsonb_typeof(v_piece) <> 'object' THEN
              v_bad := true;
              EXIT;
            END IF;
            v_options := v_options || jsonb_build_array(v_piece);
          ELSE
            v_options := v_options || jsonb_build_array(to_jsonb(v_seg));
          END IF;
        END LOOP;
        IF NOT v_bad AND jsonb_array_length(v_options) = 0 THEN v_options := NULL; END IF;
      END IF;
    END IF;
    IF v_bad THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','malformedOptions');
      CONTINUE;
    END IF;

    -- DEC-045b — the dependency is a COLUMN of its own. The legacy
    -- `{"depends_on": "<key>"}` option entry is still read (files authored
    -- before this landing), and never survives into the stored options.
    v_depends := btrim(COALESCE(e->>'depends_on',''));
    IF v_options IS NOT NULL THEN
      v_out := '[]'::jsonb;
      FOR v_entry IN SELECT value FROM jsonb_array_elements(v_options) LOOP
        IF jsonb_typeof(v_entry) = 'object' AND v_entry ? 'depends_on' AND NOT (v_entry ? 'value') THEN
          IF v_depends = '' THEN v_depends := btrim(COALESCE(v_entry->>'depends_on','')); END IF;
          CONTINUE;
        END IF;
        IF jsonb_typeof(v_entry) = 'object' AND NOT (v_entry ? 'value') THEN
          v_bad := true;
        ELSIF jsonb_typeof(v_entry) NOT IN ('object','string') THEN
          v_bad := true;
        END IF;
        v_out := v_out || jsonb_build_array(v_entry);
      END LOOP;
      v_options := CASE WHEN jsonb_array_length(v_out) = 0 THEN NULL ELSE v_out END;
    END IF;
    IF v_bad THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','malformedOptions');
      CONTINUE;
    END IF;

    -- DEC-050 — THE STRICT OPTION SHAPE. An unknown key, a non-boolean
    -- `active`, a bad alias or a malformed `bounds` is a refusal that names
    -- the definition, the option value and the reason. Never a silent drop.
    v_optmsg := public.attr_option_shape(v_key, v_options);
    IF v_optmsg IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','definitions','row',v_row,'key',v_key,'reason','badOption','detail',v_optmsg);
      CONTINUE;
    END IF;

    v_name := COALESCE(NULLIF(btrim(COALESCE(e->>'label_en','')), ''), v_key);

    -- IE-4b — label_am. The live value is read exactly as the EXPORT writes it
    -- (approved translation > the legacy column), so a file taken from the
    -- export is silent, and an EMPTY cell is never a change.
    v_label_am := btrim(COALESCE(e->>'label_am',''));
    v_cur_am := '';
    IF v_att.id IS NOT NULL THEN
      SELECT COALESCE(
               (SELECT t.value FROM public.entity_translations t
                 WHERE t.entity_type = 'attribute' AND t.entity_id = v_att.id
                   AND t.field = 'label' AND t.lang_code = 'am' AND t.status = 'approved'),
               v_att.name_am, '')
        INTO v_cur_am;
    END IF;
    v_am_change := v_label_am <> '' AND v_label_am IS DISTINCT FROM btrim(COALESCE(v_cur_am,''));

    -- DEC-050 — THE DEFINITION v2 CELLS. ABSENT = no change; a PRESENT and
    -- EMPTY cell clears it. Every present cell is judged by the door's judge,
    -- and every present cell is diffed (INC-187: nothing is silently dropped).
    v_cells := '{}'::jsonb;
    v_cell_change := false;
    v_bad_cell := NULL;
    FOREACH v_cell IN ARRAY ARRAY['unit','min_bound','max_bound','decimals','format',
                                  'preset','max_length','help_text_en','help_text_am']
    LOOP
      v_calias := CASE v_cell WHEN 'min_bound' THEN 'min'
                              WHEN 'max_bound' THEN 'max' ELSE v_cell END;
      CONTINUE WHEN NOT (e ? v_cell) AND NOT (e ? v_calias);
      v_cellval := NULLIF(btrim(COALESCE(e->>v_cell, e->>v_calias, '')), '');
      v_cells := v_cells || jsonb_build_object(
        v_cell, CASE WHEN v_cellval IS NULL THEN 'null'::jsonb ELSE to_jsonb(v_cellval) END);
    END LOOP;

    -- INC-200 — A TYPE CHANGE CLEARS THE CELLS THAT NO LONGER APPLY. When the
    -- row's type differs from the STORED type, every inapplicable cell becomes
    -- a CLEAR in the plan itself, whatever the file said: text cells off
    -- anything but text, number cells off anything but number, options off
    -- text/number/boolean. The preview therefore NAMES the clears, the commit
    -- writes them in the same statement as the type, and the export
    -- round-trips the cleared state. A caller cannot keep a preset on a select.
    IF v_att.id IS NOT NULL AND v_type IS DISTINCT FROM v_att.attr_type THEN
      v_newtype := v_type;
      IF v_newtype <> 'text' THEN
        v_cells := v_cells || jsonb_build_object('preset', 'null'::jsonb,
                                                'max_length', 'null'::jsonb);
      END IF;
      IF v_newtype <> 'number' THEN
        v_cells := v_cells || jsonb_build_object('unit', 'null'::jsonb,
                                                'min_bound', 'null'::jsonb,
                                                'max_bound', 'null'::jsonb,
                                                'decimals', 'null'::jsonb,
                                                'format', 'null'::jsonb);
      END IF;
      IF v_newtype IN ('text','number','boolean') THEN
        v_options := NULL;
      END IF;
    END IF;

    v_unit    := CASE WHEN v_cells ? 'unit'         THEN v_cells->>'unit'         ELSE v_att.unit END;
    v_minb    := CASE WHEN v_cells ? 'min_bound'    THEN v_cells->>'min_bound'    ELSE v_att.min_bound END;
    v_maxb    := CASE WHEN v_cells ? 'max_bound'    THEN v_cells->>'max_bound'    ELSE v_att.max_bound END;
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
                                           v_fmt, v_pset, v_maxlen, v_help_en, v_help_am);
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
        OR ((v_cells ? 'min_bound')    AND v_minb    IS DISTINCT FROM v_att.min_bound)
        OR ((v_cells ? 'max_bound')    AND v_maxb    IS DISTINCT FROM v_att.max_bound)
        OR ((v_cells ? 'decimals')     AND v_dec     IS DISTINCT FROM v_att.decimals::int)
        OR ((v_cells ? 'format')       AND v_fmt     IS DISTINCT FROM v_att.format)
        OR ((v_cells ? 'preset')       AND v_pset    IS DISTINCT FROM v_att.preset)
        OR ((v_cells ? 'max_length')   AND v_maxlen  IS DISTINCT FROM v_att.max_length)
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

    v_out := v_out || jsonb_build_array(v_entry || jsonb_build_object('change', v_change));
  END LOOP;
  v_defs := v_out;

  ------------------------------------- DEC-045b: PARENT BEFORE DEPENDENT
  v_ordered := '[]'::jsonb;
  v_pending := v_defs;
  v_guard := 0;
  WHILE jsonb_array_length(v_pending) > 0 AND v_guard < 64 LOOP
    v_guard := v_guard + 1;
    v_next := '[]'::jsonb;
    FOR v_entry IN SELECT value FROM jsonb_array_elements(v_pending) LOOP
      v_depends := btrim(COALESCE(v_entry->>'depends_on',''));
      IF v_depends = '' OR NOT EXISTS (
        SELECT 1 FROM jsonb_array_elements(v_pending) x
         WHERE x.value->>'key' = v_depends AND x.value->>'key' <> v_entry->>'key'
      ) THEN
        v_ordered := v_ordered || jsonb_build_array(v_entry);
      ELSE
        v_next := v_next || jsonb_build_array(v_entry);
      END IF;
    END LOOP;
    EXIT WHEN jsonb_array_length(v_next) = jsonb_array_length(v_pending);
    v_pending := v_next;
  END LOOP;
  v_defs := v_ordered || v_pending;

  -- Only a SURVIVING add lets a link name an attribute that does not exist yet.
  SELECT COALESCE(array_agg(x.value->>'key'), ARRAY[]::text[]) INTO v_new_keys
    FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'add';

  --------------------------------------------------------------------- links
  FOR e IN SELECT value FROM jsonb_array_elements(COALESCE(p_links, '[]'::jsonb))
  LOOP
    v_row := COALESCE((e->>'row')::int, 0);
    v_key := btrim(COALESCE(e->>'attribute_key',''));
    v_action := lower(COALESCE(NULLIF(btrim(COALESCE(e->>'action','')), ''), 'upsert'));
    v_origin := btrim(COALESCE(e->>'origin',''));

    IF v_action NOT IN ('upsert','unlink') THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','badAction');
      CONTINUE;
    END IF;

    SELECT * INTO v_cat FROM public.categories WHERE slug = btrim(COALESCE(e->>'category_slug',''));
    IF v_cat.id IS NULL THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','unknownCategory');
      CONTINUE;
    END IF;

    IF v_scope_ids IS NOT NULL AND NOT (v_cat.id = ANY (v_scope_ids)) THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','outOfScope');
      CONTINUE;
    END IF;

    -- IE-6 (INC-180) — DIRECTNESS IS READ FIRST. An inherited ECHO row is
    -- read-only: it is neither counted as a duplicate nor allowed to make one,
    -- so a DIRECT row for the same category and key in the same file is
    -- accepted and becomes the NEAREST link. Only an attempt to UNLINK through
    -- an echo is refused — a category cannot unlink what it does not hold.
    v_direct := (v_origin = '' OR v_origin = v_cat.slug);
    IF NOT v_direct THEN
      IF v_action = 'unlink' THEN
        v_refusals := v_refusals || jsonb_build_object(
          'file','links','row',v_row,'key',v_key,'reason','inheritedRow','detail',v_origin);
      ELSE
        v_lnks := v_lnks || jsonb_build_object(
          'row',v_row,'key',v_key,'slug',v_cat.slug,'action','upsert','change','none');
      END IF;
      CONTINUE;
    END IF;

    IF (v_cat.slug || '|' || v_key) = ANY (v_seen_lnks) THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','duplicateKey');
      CONTINUE;
    END IF;
    v_seen_lnks := v_seen_lnks || (v_cat.slug || '|' || v_key);

    SELECT id INTO v_attr_id FROM public.attributes WHERE attr_key = v_key;
    IF v_attr_id IS NULL AND NOT (v_key = ANY (v_new_keys)) THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','unknownAttribute');
      CONTINUE;
    END IF;

    v_req := lower(btrim(COALESCE(e->>'is_required','false'))) IN ('true','t','1','yes');
    v_filt := lower(btrim(COALESCE(e->>'is_filterable','false'))) IN ('true','t','1','yes');
    v_rank := NULL;
    IF btrim(COALESCE(e->>'card_rank','')) <> '' THEN
      BEGIN
        v_rank := btrim(e->>'card_rank')::int;
      EXCEPTION WHEN others THEN
        v_rank := -1;
      END;
      IF v_rank IS NULL OR v_rank < 1 OR v_rank > 3 THEN
        v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','badCardRank');
        CONTINUE;
      END IF;
    END IF;

    v_link := NULL;
    IF v_attr_id IS NOT NULL THEN
      SELECT * INTO v_link FROM public.category_attribute_links
       WHERE category_id = v_cat.id AND attribute_id = v_attr_id;
    END IF;

    IF v_action = 'unlink' THEN
      IF v_link.id IS NULL THEN
        v_lnks := v_lnks || jsonb_build_object('row',v_row,'key',v_key,'slug',v_cat.slug,'action','unlink','change','none');
      ELSE
        v_lnks := v_lnks || jsonb_build_object('row',v_row,'key',v_key,'slug',v_cat.slug,'action','unlink',
                                              'change','unlink','link_id',v_link.id,
                                              'category_id',v_cat.id,'attribute_id',v_attr_id);
      END IF;
      CONTINUE;
    END IF;

    IF v_link.id IS NULL THEN
      v_change := 'add';
    ELSIF v_link.is_required IS DISTINCT FROM v_req
       OR v_link.is_filterable IS DISTINCT FROM v_filt
       OR v_link.card_rank IS DISTINCT FROM v_rank THEN
      v_change := 'change';
    ELSE
      v_change := 'none';
    END IF;

    v_lnks := v_lnks || jsonb_build_object(
      'row',v_row,'key',v_key,'slug',v_cat.slug,'action','upsert','change',v_change,
      'link_id',v_link.id,'category_id',v_cat.id,'attribute_id',v_attr_id,
      'is_required',v_req,'is_filterable',v_filt,'card_rank',v_rank);
  END LOOP;

  ------------------------------- DEC-050 L2a: EFFECTIVE CARD-RANK UNIQUENESS
  -- UNIQUE (category_id, card_rank) guards DIRECT links only. An INHERITED
  -- card (primary lineage) occupies its rank in every descendant, so a direct
  -- rank equal to an inherited rank is refused, naming BOTH origins.
  v_out := '[]'::jsonb;
  FOR v_entry IN SELECT value FROM jsonb_array_elements(v_lnks)
  LOOP
    IF v_entry->>'action' = 'upsert'
       AND v_entry->>'change' IN ('add','change')
       AND NULLIF(v_entry->>'card_rank','') IS NOT NULL
       AND NULLIF(v_entry->>'category_id','') IS NOT NULL THEN
      v_conflict := public.attr_rank_conflict(
        (v_entry->>'category_id')::uuid,
        (v_entry->>'card_rank')::int,
        v_entry->>'key',
        v_lnks);
      IF v_conflict IS NOT NULL THEN
        v_refusals := v_refusals || jsonb_build_object(
          'file','links','row', COALESCE((v_entry->>'row')::int, 0),
          'key', v_entry->>'key',
          'reason','rankInherited',
          'category', v_entry->>'slug',
          'rank', (v_entry->>'card_rank')::int,
          'origin_category', split_part(v_conflict, '|', 1),
          'origin_key', split_part(v_conflict, '|', 2),
          'detail', v_entry->>'slug' || ' rank ' || (v_entry->>'card_rank')
                    || ' · ' || (v_entry->>'key')
                    || ' · inherited from ' || split_part(v_conflict, '|', 1)
                    || ' · ' || split_part(v_conflict, '|', 2));
        CONTINUE;
      END IF;
    END IF;
    v_out := v_out || jsonb_build_array(v_entry);
  END LOOP;
  v_lnks := v_out;

  ------------------------------------------- DEC-050: bounds co-linkage
  -- A bounds target is a NUMBER definition linked, directly or by inheritance,
  -- in AT LEAST ONE category where the owner is linked AFTER this plan is applied — DEC-057b.
  v_out := '[]'::jsonb;
  FOR v_entry IN SELECT value FROM jsonb_array_elements(v_defs)
  LOOP
    v_reason := NULL;
    v_detail := NULL;
    IF v_entry->>'action' = 'upsert'
       AND v_entry->'options' IS NOT NULL AND v_entry->'options' <> 'null'::jsonb THEN
      v_key := v_entry->>'key';
      v_row := COALESCE((v_entry->>'row')::int, 0);
      v_ocats := public.attr_postplan_cats(v_key, v_lnks);
      FOREACH v_step IN ARRAY public.attr_bounds_targets(v_entry->'options')
      LOOP
        v_ptype := NULL;
        SELECT x.value->>'attr_type' INTO v_ptype
          FROM jsonb_array_elements(v_defs) x
         WHERE x.value->>'key' = v_step AND x.value->>'action' = 'upsert'
         LIMIT 1;
        IF v_ptype IS NULL THEN
          SELECT a.attr_type INTO v_ptype FROM public.attributes a WHERE a.attr_key = v_step;
        END IF;
        IF v_ptype IS DISTINCT FROM 'number' THEN
          v_reason := 'boundsTargetNotNumber';
          v_detail := v_step;
          EXIT;
        END IF;
        v_tcats := public.attr_cats_expand(public.attr_postplan_cats(v_step, v_lnks));
        IF COALESCE(array_length(v_ocats, 1), 0) > 0 AND NOT EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE c = ANY (v_tcats)) THEN
          v_reason := 'boundsTargetNotColinked';
          v_detail := v_step;
          EXIT;
        END IF;
      END LOOP;
    END IF;

    IF v_reason IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','definitions','row',v_row,'key',v_key,'reason',v_reason,'detail',v_detail);
      CONTINUE;
    END IF;
    v_out := v_out || jsonb_build_array(v_entry);
  END LOOP;
  v_defs := v_out;

  ------------------------------------------- DEC-057: option-conditioned allowed
  -- The SINGLE RULE (attr_allowed_check) judged against the POST-PLAN link set:
  -- the target is a select definition co-linked wherever the owner is linked,
  -- never the owner, its parent or its dependents, and every listed value
  -- exists in the target's option list. The refusal carries row, key, option
  -- value, target and reason. DEC-057 L2-mig: the target itself resolves
  -- through the plan — every definition this plan creates or changes
  -- (with its post-plan option list) is passed as p_defs.
  SELECT COALESCE(jsonb_agg(jsonb_build_object(
           'attribute_key', d.value->>'key',
           'type',        d.value->>'attr_type',
           'options',     d.value->'options')), '[]'::jsonb)
    INTO v_overlay
    FROM jsonb_array_elements(v_defs) d
   WHERE d.value->>'action' = 'upsert';
  v_out := '[]'::jsonb;
  FOR v_entry IN SELECT value FROM jsonb_array_elements(v_defs)
  LOOP
    v_allowed := NULL;
    IF v_entry->>'action' = 'upsert'
       AND v_entry->'options' IS NOT NULL AND v_entry->'options' <> 'null'::jsonb THEN
      v_key := v_entry->>'key';
      v_row := COALESCE((v_entry->>'row')::int, 0);
      v_allowed := public.attr_allowed_check(v_key, v_entry->'options', v_lnks, v_overlay);
    END IF;

    IF v_allowed IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','definitions','row',v_row,'key',v_key,
        'reason', v_allowed->>'reason',
        'option', v_allowed->>'option',
        'target', v_allowed->>'target',
        'value', COALESCE(v_allowed->>'value',''),
        'detail', v_allowed->>'detail');
      CONTINUE;
    END IF;
    v_out := v_out || jsonb_build_array(v_entry);
  END LOOP;
  v_defs := v_out;

  RETURN jsonb_build_object(
    'definitions', v_defs,
    'links', v_lnks,
    'refusals', v_refusals,
    'counts', jsonb_build_object(
      'adds', (SELECT count(*) FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'add')
            + (SELECT count(*) FROM jsonb_array_elements(v_lnks) x WHERE x.value->>'change' = 'add'),
      'changes', (SELECT count(*) FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'change')
               + (SELECT count(*) FROM jsonb_array_elements(v_lnks) x WHERE x.value->>'change' = 'change'),
      'unlinks', (SELECT count(*) FROM jsonb_array_elements(v_lnks) x WHERE x.value->>'change' = 'unlink'),
      'deletes', (SELECT count(*) FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'delete'),
      'unchanged', (SELECT count(*) FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'none')
                 + (SELECT count(*) FROM jsonb_array_elements(v_lnks) x WHERE x.value->>'change' = 'none'),
      'refusals', jsonb_array_length(v_refusals)));
END $function$;

-- CLOSERS (A8 / DEC-022-B), restated in-file.
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

/* ======================= 2. THE DOOR (whole re-declaration) =============== */
CREATE OR REPLACE FUNCTION public.admin_upsert_attribute(
  p_id uuid, p_attr_key text, p_name_en text, p_attr_type text, p_options jsonb,
  p_help_text_en text, p_depends_on text DEFAULT NULL::text,
  p_unit text DEFAULT NULL::text, p_min_bound text DEFAULT NULL::text,
  p_max_bound text DEFAULT NULL::text, p_decimals smallint DEFAULT NULL::smallint,
  p_format text DEFAULT NULL::text, p_preset text DEFAULT NULL::text,
  p_max_length integer DEFAULT NULL::integer, p_help_text_am text DEFAULT NULL::text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_id uuid; v_old jsonb; v_dep uuid; v_dep_key text; v_dep_type text;
  v_vals text[]; v_parent text; v_entry jsonb;
  v_cellmsg text; v_optmsg text; v_tkey text; v_ttype text;
  v_ocats uuid[]; v_tcats uuid[]; v_allowed jsonb;
  -- INC-200 — the EFFECTIVE cells: what the row will actually carry once a
  -- type change has cleared what no longer applies.
  v_stored_type text; v_newtype text;
  v_e_unit text; v_e_min text; v_e_max text; v_e_dec smallint; v_e_fmt text;
  v_e_pset text; v_e_maxlen integer; v_e_opts jsonb;
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

  -- INC-200 — A TYPE CHANGE CLEARS THE CELLS THAT NO LONGER APPLY, whatever
  -- the caller passed: text cells (preset, max_length) off anything but text,
  -- number cells (unit, min, max, decimals, format) off anything but number,
  -- options off text/number/boolean. When the type is UNCHANGED, a NULL
  -- parameter keeps its old meaning exactly as before.
  v_e_unit   := p_unit;
  v_e_min    := p_min_bound;
  v_e_max    := p_max_bound;
  v_e_dec    := p_decimals;
  v_e_fmt    := p_format;
  v_e_pset   := p_preset;
  v_e_maxlen := p_max_length;
  v_e_opts   := p_options;
  IF p_id IS NOT NULL THEN
    SELECT a.attr_type INTO v_stored_type FROM public.attributes a WHERE a.id = p_id;
    v_newtype := COALESCE(p_attr_type, v_stored_type);
    IF v_stored_type IS NOT NULL AND v_newtype IS DISTINCT FROM v_stored_type THEN
      IF v_newtype <> 'text' THEN
        v_e_pset := NULL;
        v_e_maxlen := NULL;
      END IF;
      IF v_newtype <> 'number' THEN
        v_e_unit := NULL;
        v_e_min := NULL;
        v_e_max := NULL;
        v_e_dec := NULL;
        v_e_fmt := NULL;
      END IF;
      IF v_newtype IN ('text','number','boolean') THEN
        v_e_opts := NULL;
      END IF;
    END IF;
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
    SELECT value FROM jsonb_array_elements(public.attr_option_norm(v_e_opts))
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

  -- DEC-050 — the definition v2 cells, judged by the shared judge.
  v_cellmsg := public.attr_cell_check(p_attr_type, v_e_unit, v_e_min, v_e_max,
                                      v_e_dec::int, v_e_fmt, v_e_pset, v_e_maxlen,
                                      p_help_text_en, p_help_text_am);
  IF v_cellmsg IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.badCell:%', v_cellmsg USING ERRCODE = 'P0010';
  END IF;

  -- DEC-050 — the strict option shape. An unknown key is a refusal, never a
  -- silent drop; the refusal names the definition, the option and the reason.
  v_optmsg := public.attr_option_shape(p_attr_key, v_e_opts);
  IF v_optmsg IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.badOption:%', v_optmsg USING ERRCODE = 'P0010';
  END IF;

  -- DEC-050 — a bounds target is a NUMBER definition linked, directly or by
  -- inheritance, in AT LEAST ONE category where this definition is linked (LIVE links) — DEC-057b.
  v_ocats := public.attr_postplan_cats(p_attr_key, '[]'::jsonb);
  FOREACH v_tkey IN ARRAY public.attr_bounds_targets(v_e_opts)
  LOOP
    SELECT a.attr_type INTO v_ttype FROM public.attributes a WHERE a.attr_key = v_tkey;
    IF v_ttype IS DISTINCT FROM 'number' THEN
      RAISE EXCEPTION 'admin.attributes.error.boundsTargetNotNumber:%|%', p_attr_key, v_tkey
        USING ERRCODE = 'P0010';
    END IF;
    v_tcats := public.attr_cats_expand(public.attr_postplan_cats(v_tkey, '[]'::jsonb));
    IF COALESCE(array_length(v_ocats, 1), 0) > 0 AND NOT EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE c = ANY (v_tcats)) THEN
      RAISE EXCEPTION 'admin.attributes.error.boundsTargetNotColinked:%|%', p_attr_key, v_tkey
        USING ERRCODE = 'P0010';
    END IF;
  END LOOP;

  -- DEC-057 — option-conditioned allowed values, judged against LIVE links by
  -- the single rule. Refusals are named exactly as the bounds path names its own.
  v_allowed := public.attr_allowed_check(p_attr_key, v_e_opts, '[]'::jsonb);
  IF v_allowed IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.%:%', v_allowed->>'reason', v_allowed->>'detail'
      USING ERRCODE = 'P0010';
  END IF;

  IF p_id IS NULL THEN
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en, depends_on,
                                   unit, min_bound, max_bound, decimals, format, preset,
                                   max_length, help_text_am)
    VALUES (p_attr_key, p_name_en, p_attr_type, v_e_opts, p_help_text_en, v_dep,
            v_e_unit, v_e_min, v_e_max, v_e_dec, v_e_fmt, v_e_pset,
            v_e_maxlen, p_help_text_am)
    RETURNING id INTO v_id;

    PERFORM public.log_audit('attribute.create', 'attributes', v_id::text,
      jsonb_build_object('attr_key', p_attr_key, 'attr_type', p_attr_type,
                         'depends_on', COALESCE(v_dep_key, ''),
                         'unit', v_e_unit, 'min_bound', v_e_min, 'max_bound', v_e_max,
                         'decimals', v_e_dec, 'format', v_e_fmt, 'preset', v_e_pset,
                         'max_length', v_e_maxlen, 'help_text_am', p_help_text_am));
  ELSE
    SELECT to_jsonb(a) INTO v_old FROM public.attributes a WHERE a.id = p_id;
    IF v_old IS NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
    END IF;

    -- INC-200 — the type and every cell travel in ONE statement, so no
    -- inapplicable cell is ever briefly held against the new type.
    UPDATE public.attributes a
       SET attr_key     = p_attr_key,
           name_en      = COALESCE(p_name_en, a.name_en),
           attr_type    = COALESCE(p_attr_type, a.attr_type),
           options      = v_e_opts,
           help_text_en = p_help_text_en,
           depends_on   = v_dep,
           unit         = v_e_unit,
           min_bound    = v_e_min,
           max_bound    = v_e_max,
           decimals     = v_e_dec,
           format       = v_e_fmt,
           preset       = v_e_pset,
           max_length   = v_e_maxlen,
           help_text_am = p_help_text_am,
           updated_at   = now()
     WHERE a.id = p_id;
    v_id := p_id;

    PERFORM public.log_audit('attribute.update', 'attributes', p_id::text,
      jsonb_build_object(
        'old', jsonb_build_object('attr_key', v_old->>'attr_key', 'name_en', v_old->>'name_en',
                                  'attr_type', v_old->>'attr_type', 'options', v_old->'options',
                                  'depends_on', v_old->>'depends_on',
                                  'unit', v_old->>'unit', 'min_bound', v_old->>'min_bound',
                                  'max_bound', v_old->>'max_bound', 'decimals', v_old->>'decimals',
                                  'format', v_old->>'format', 'preset', v_old->>'preset',
                                  'max_length', v_old->>'max_length',
                                  'help_text_en', v_old->>'help_text_en',
                                  'help_text_am', v_old->>'help_text_am'),
        'new', (SELECT jsonb_build_object('attr_key', a.attr_key, 'name_en', a.name_en,
                                          'attr_type', a.attr_type, 'options', a.options,
                                          'depends_on', a.depends_on,
                                          'unit', a.unit, 'min_bound', a.min_bound,
                                          'max_bound', a.max_bound, 'decimals', a.decimals,
                                          'format', a.format, 'preset', a.preset,
                                          'max_length', a.max_length,
                                          'help_text_en', a.help_text_en,
                                          'help_text_am', a.help_text_am)
                  FROM public.attributes a WHERE a.id = p_id)));
  END IF;

  RETURN v_id;
END $function$;

-- CLOSERS (A8 / DEC-022-B), restated in-file.
REVOKE ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)
  TO authenticated;
GRANT ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)
  TO service_role;

/* ============ 3. THE COMMIT (whole re-declaration; PHASE 1 only) ========== */
CREATE OR REPLACE FUNCTION public.admin_commit_attribute_import(
  p_definitions jsonb, p_links jsonb, p_scope text DEFAULT NULL::text, p_digest text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_plan    jsonb;
  v_batch   uuid := gen_random_uuid();
  v_item    jsonb;
  v_prev    jsonb;
  v_post    jsonb;
  v_id      uuid;
  v_order   int;
  v_applied int := 0;
  v_am      jsonb;
  v_dep     uuid;
  v_cells   jsonb;
  v_prevs   jsonb := '{}'::jsonb;   -- INC-196 — Pass A's before-states, per link id.
BEGIN
  -- (1) GATES
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');

  IF NOT pg_try_advisory_xact_lock(hashtext('attribute-import'), hashtext(auth.uid()::text)) THEN
    RAISE EXCEPTION 'import already running';
  END IF;

  v_plan := public.attr_import_plan(p_definitions, p_links, p_scope);

  ------------------------------------------- PHASE 1 — DEFINITION UPSERTS
  -- DEC-045b — the planner ordered the definitions PARENT BEFORE DEPENDENT.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'definitions')
  LOOP
    CONTINUE WHEN v_item->>'change' IN ('none', 'delete');

    v_id := NULLIF(v_item->>'id','')::uuid;
    v_prev := NULL;
    IF v_id IS NOT NULL THEN
      SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                                'options',a.options,'help_text_en',a.help_text_en,
                                'unit',a.unit,'min_bound',a.min_bound,'max_bound',a.max_bound,
                                'decimals',a.decimals,'format',a.format,'preset',a.preset,
                                'max_length',a.max_length,'help_text_am',a.help_text_am,
                                'depends_on',
                                COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''))
        INTO v_prev FROM public.attributes a WHERE a.id = v_id;
      v_am := NULL;
      SELECT jsonb_build_object('value', t.value, 'status', t.status, 'machine', t.machine)
        INTO v_am
        FROM public.entity_translations t
       WHERE t.entity_type = 'attribute' AND t.entity_id = v_id
         AND t.field = 'label' AND t.lang_code = 'am';
      v_prev := v_prev || jsonb_build_object('am_state', COALESCE(v_am, 'null'::jsonb));
    END IF;

    -- DEC-050 — every PRESENT v2 cell is applied; an ABSENT cell is left
    -- alone. INC-187's lesson: what the planner diffed, the commit applies.
    v_cells := COALESCE(v_item->'cells', '{}'::jsonb);

    IF v_id IS NULL THEN
      INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
      VALUES (v_item->>'key', v_item->>'name_en', v_item->>'attr_type',
              CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END)
      RETURNING id INTO v_id;

      IF v_cells <> '{}'::jsonb THEN
        UPDATE public.attributes a
           SET unit         = CASE WHEN v_cells ? 'unit'         THEN NULLIF(v_cells->>'unit','')         ELSE a.unit END,
               min_bound    = CASE WHEN v_cells ? 'min_bound'    THEN NULLIF(v_cells->>'min_bound','')    ELSE a.min_bound END,
               max_bound    = CASE WHEN v_cells ? 'max_bound'    THEN NULLIF(v_cells->>'max_bound','')    ELSE a.max_bound END,
               decimals     = CASE WHEN v_cells ? 'decimals'     THEN NULLIF(v_cells->>'decimals','')::smallint  ELSE a.decimals END,
               format       = CASE WHEN v_cells ? 'format'       THEN NULLIF(v_cells->>'format','')       ELSE a.format END,
               preset       = CASE WHEN v_cells ? 'preset'       THEN NULLIF(v_cells->>'preset','')       ELSE a.preset END,
               max_length   = CASE WHEN v_cells ? 'max_length'   THEN NULLIF(v_cells->>'max_length','')::integer ELSE a.max_length END,
               help_text_en = CASE WHEN v_cells ? 'help_text_en' THEN NULLIF(v_cells->>'help_text_en','') ELSE a.help_text_en END,
               help_text_am = CASE WHEN v_cells ? 'help_text_am' THEN NULLIF(v_cells->>'help_text_am','') ELSE a.help_text_am END,
               updated_at   = now()
         WHERE a.id = v_id;
      END IF;
    ELSE
      -- INC-200 — THE TYPE AND THE CELLS TRAVEL IN ONE STATEMENT. Both CHECKs
      -- (attributes_preset_check, attributes_max_length_check and their number
      -- siblings) fire per statement, so a type written BEFORE the cells it
      -- invalidates is refused mid-batch. The planner has already turned the
      -- inapplicable cells into CLEARS for a type change; here they are
      -- written together with the type, and never one statement apart.
      UPDATE public.attributes a
         SET name_en      = v_item->>'name_en',
             attr_type    = v_item->>'attr_type',
             options      = CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END,
             unit         = CASE WHEN v_cells ? 'unit'         THEN NULLIF(v_cells->>'unit','')         ELSE a.unit END,
             min_bound    = CASE WHEN v_cells ? 'min_bound'    THEN NULLIF(v_cells->>'min_bound','')    ELSE a.min_bound END,
             max_bound    = CASE WHEN v_cells ? 'max_bound'    THEN NULLIF(v_cells->>'max_bound','')    ELSE a.max_bound END,
             decimals     = CASE WHEN v_cells ? 'decimals'     THEN NULLIF(v_cells->>'decimals','')::smallint  ELSE a.decimals END,
             format       = CASE WHEN v_cells ? 'format'       THEN NULLIF(v_cells->>'format','')       ELSE a.format END,
             preset       = CASE WHEN v_cells ? 'preset'       THEN NULLIF(v_cells->>'preset','')       ELSE a.preset END,
             max_length   = CASE WHEN v_cells ? 'max_length'   THEN NULLIF(v_cells->>'max_length','')::integer ELSE a.max_length END,
             help_text_en = CASE WHEN v_cells ? 'help_text_en' THEN NULLIF(v_cells->>'help_text_en','') ELSE a.help_text_en END,
             help_text_am = CASE WHEN v_cells ? 'help_text_am' THEN NULLIF(v_cells->>'help_text_am','') ELSE a.help_text_am END,
             updated_at   = now()
       WHERE a.id = v_id;
    END IF;

    IF COALESCE((v_item->>'depends_col')::boolean, false) THEN
      SELECT p.id INTO v_dep FROM public.attributes p
       WHERE p.attr_key = NULLIF(btrim(COALESCE(v_item->>'depends_on','')), '');
      UPDATE public.attributes SET depends_on = v_dep, updated_at = now() WHERE id = v_id;
    END IF;

    IF btrim(COALESCE(v_item->>'label_am','')) <> '' THEN
      PERFORM public.admin_save_entity_translation('attribute', v_id, 'label', 'am',
                                                   btrim(v_item->>'label_am'));
    END IF;

    SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                              'options',a.options,'help_text_en',a.help_text_en,
                                'unit',a.unit,'min_bound',a.min_bound,'max_bound',a.max_bound,
                                'decimals',a.decimals,'format',a.format,'preset',a.preset,
                                'max_length',a.max_length,'help_text_am',a.help_text_am,
                              'depends_on',
                              COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''))
      INTO v_post FROM public.attributes a WHERE a.id = v_id;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'definition', v_item->>'action', v_item->>'key', v_prev, v_post, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  --------------------------------- PHASE 2A — INC-196: CLEAR CHANGING RANKS
  -- The plan's link array is ordered by (origin_slug, attr_key), so a swap or
  -- a shift inside ONE category would otherwise write the incoming rank before
  -- the outgoing one is vacated. Pass A captures the BEFORE state of every
  -- change item and nulls ONLY the card_rank of those whose rank is moving —
  -- flags and display_order are untouched here and are written in Pass B.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'links')
  LOOP
    CONTINUE WHEN v_item->>'change' <> 'change';

    v_id := NULLIF(v_item->>'link_id','')::uuid;
    CONTINUE WHEN v_id IS NULL;

    v_prev := NULL;
    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank)
      INTO v_prev FROM public.category_attribute_links l WHERE l.id = v_id;
    CONTINUE WHEN v_prev IS NULL;

    v_prevs := v_prevs || jsonb_build_object(v_id::text, v_prev);

    IF (v_prev->>'card_rank') IS DISTINCT FROM NULLIF(v_item->>'card_rank','') THEN
      UPDATE public.category_attribute_links
         SET card_rank = NULL, updated_at = now()
       WHERE id = v_id;
    END IF;
  END LOOP;

  ------------------------------------------------ PHASE 3 — LINK UNLINKS
  -- Unchanged, and now BETWEEN the two passes: a rank freed by a deletion is
  -- available to the adds and final states written in Pass B.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'links')
  LOOP
    CONTINUE WHEN v_item->>'change' <> 'unlink';

    v_prev := NULL;
    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank)
      INTO v_prev FROM public.category_attribute_links l
     WHERE l.id = NULLIF(v_item->>'link_id','')::uuid;

    DELETE FROM public.category_attribute_links WHERE id = (v_item->>'link_id')::uuid;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'link', v_item->>'action',
            (v_item->>'slug') || '|' || (v_item->>'key'), v_prev, NULL, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  ------------------- PHASE 2B — INC-196: ADDS AND FINAL STATES (audit rows)
  -- One revision row per link, prev = the ORIGINAL before-state (Pass A's, when
  -- it ran), post = the FINAL after-state — exactly the shape
  -- admin_undo_attribute_import expects; its body is unchanged (read-back).
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'links')
  LOOP
    CONTINUE WHEN v_item->>'change' IN ('none', 'unlink');

    v_id := NULLIF(v_item->>'attribute_id','')::uuid;
    IF v_id IS NULL THEN
      SELECT id INTO v_id FROM public.attributes WHERE attr_key = v_item->>'key';
    END IF;

    IF v_item->>'change' = 'add' THEN
      v_prev := NULL;
      SELECT COALESCE(max(l.display_order), 0) + 1 INTO v_order
        FROM public.category_attribute_links l
       WHERE l.category_id = (v_item->>'category_id')::uuid;
      INSERT INTO public.category_attribute_links
        (category_id, attribute_id, is_required, is_filterable, display_order, card_rank)
      VALUES ((v_item->>'category_id')::uuid, v_id,
              (v_item->>'is_required')::boolean, (v_item->>'is_filterable')::boolean,
              v_order, NULLIF(v_item->>'card_rank','')::int)
      RETURNING id INTO v_id;
    ELSE
      v_id := (v_item->>'link_id')::uuid;
      v_prev := v_prevs->(v_id::text);
      IF v_prev IS NULL THEN
        SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                                  'is_required',l.is_required,'is_filterable',l.is_filterable,
                                  'display_order',l.display_order,'card_rank',l.card_rank)
          INTO v_prev FROM public.category_attribute_links l WHERE l.id = v_id;
      END IF;
      UPDATE public.category_attribute_links
         SET is_required = (v_item->>'is_required')::boolean,
             is_filterable = (v_item->>'is_filterable')::boolean,
             display_order = COALESCE(NULLIF(v_item->>'display_order','')::int, display_order),
             card_rank = NULLIF(v_item->>'card_rank','')::int,
             updated_at = now()
       WHERE id = v_id;
    END IF;

    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank)
      INTO v_post FROM public.category_attribute_links l WHERE l.id = v_id;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'link', v_item->>'action',
            (v_item->>'slug') || '|' || (v_item->>'key'), v_prev, v_post, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  -------------------------------------------- PHASE 4 — DEFINITION DELETES
  -- IE-5 — last, so a link removed by the SAME FILE no longer holds it down.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'definitions')
  LOOP
    CONTINUE WHEN v_item->>'change' <> 'delete';

    v_id := NULLIF(v_item->>'id','')::uuid;
    CONTINUE WHEN v_id IS NULL;

    SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                              'options',a.options,'help_text_en',a.help_text_en,
                                'unit',a.unit,'min_bound',a.min_bound,'max_bound',a.max_bound,
                                'decimals',a.decimals,'format',a.format,'preset',a.preset,
                                'max_length',a.max_length,'help_text_am',a.help_text_am,
                              'depends_on',
                              COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''))
      INTO v_prev FROM public.attributes a WHERE a.id = v_id;
    v_am := NULL;
    SELECT jsonb_build_object('value', t.value, 'status', t.status, 'machine', t.machine)
      INTO v_am
      FROM public.entity_translations t
     WHERE t.entity_type = 'attribute' AND t.entity_id = v_id
       AND t.field = 'label' AND t.lang_code = 'am';
    v_prev := v_prev || jsonb_build_object('am_state', COALESCE(v_am, 'null'::jsonb));

    DELETE FROM public.entity_translations
     WHERE entity_type = 'attribute' AND entity_id = v_id AND field = 'label';
    DELETE FROM public.attributes WHERE id = v_id;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'definition', v_item->>'action', v_item->>'key', v_prev, NULL, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  PERFORM public.log_audit('attribute.import', 'attributes', v_batch::text,
    jsonb_build_object('batch_id', v_batch, 'scope', p_scope, 'digest', p_digest,
                       'applied', v_applied, 'counts', v_plan->'counts'));

  RETURN jsonb_build_object('batch_id', v_batch, 'applied', v_applied,
                            'counts', v_plan->'counts', 'refusals', v_plan->'refusals');
END $function$;

-- CLOSERS (A8 / DEC-022-B), restated in-file.
REVOKE ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO service_role;

/* ======================== PROOFS (raise on failure) ======================= */
-- The gated doors cannot be CALLED from a migration (has_permission on a NULL
-- auth.uid(), require_step_up_if_needed) — as in INC-198/199, the proofs run
-- the UNGATED planner and replay the commit's and the undo's exact write
-- statements, plus body and ACL read-backs.
DO $proof$
DECLARE
  v_plan  jsonb;
  v_item  jsonb;
  v_cells jsonb;
  v_id    uuid;
  v_row   record;
  v_prev  jsonb;
BEGIN
  ---------------------------------------------------------------- P1: text → multi_select
  INSERT INTO public.attributes (attr_key, name_en, attr_type, preset, max_length)
  VALUES ('inc200-text', 'INC-200 text', 'text', 'free:40', 40)
  RETURNING id INTO v_id;

  v_plan := public.attr_import_plan(
    jsonb_build_array(jsonb_build_object(
      'row', 2, 'attribute_key', 'inc200-text', 'label_en', 'INC-200 text',
      'type', 'multi_select',
      'options', '[{"value":"a","label_en":"A"},{"value":"b","label_en":"B"},{"value":"c","label_en":"C"}]',
      'preset', 'free:40', 'max_length', '40')),
    '[]'::jsonb, NULL);

  IF jsonb_array_length(v_plan->'refusals') <> 0 THEN
    RAISE EXCEPTION 'INC-200 P1: the type change was refused: %', v_plan->'refusals';
  END IF;
  SELECT value INTO v_item FROM jsonb_array_elements(v_plan->'definitions') LIMIT 1;
  v_cells := v_item->'cells';
  IF v_item->>'change' <> 'change' THEN
    RAISE EXCEPTION 'INC-200 P1: expected a change, got %', v_item->>'change';
  END IF;
  IF v_cells->'preset' <> 'null'::jsonb OR v_cells->'max_length' <> 'null'::jsonb THEN
    RAISE EXCEPTION 'INC-200 P1: the plan did not clear the text cells: %', v_cells;
  END IF;

  -- Replay of the commit's PHASE 1 statement (type + cells, ONE statement).
  UPDATE public.attributes a
     SET name_en      = v_item->>'name_en',
         attr_type    = v_item->>'attr_type',
         options      = CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END,
         unit         = CASE WHEN v_cells ? 'unit'         THEN NULLIF(v_cells->>'unit','')         ELSE a.unit END,
         min_bound    = CASE WHEN v_cells ? 'min_bound'    THEN NULLIF(v_cells->>'min_bound','')    ELSE a.min_bound END,
         max_bound    = CASE WHEN v_cells ? 'max_bound'    THEN NULLIF(v_cells->>'max_bound','')    ELSE a.max_bound END,
         decimals     = CASE WHEN v_cells ? 'decimals'     THEN NULLIF(v_cells->>'decimals','')::smallint  ELSE a.decimals END,
         format       = CASE WHEN v_cells ? 'format'       THEN NULLIF(v_cells->>'format','')       ELSE a.format END,
         preset       = CASE WHEN v_cells ? 'preset'       THEN NULLIF(v_cells->>'preset','')       ELSE a.preset END,
         max_length   = CASE WHEN v_cells ? 'max_length'   THEN NULLIF(v_cells->>'max_length','')::integer ELSE a.max_length END,
         help_text_en = CASE WHEN v_cells ? 'help_text_en' THEN NULLIF(v_cells->>'help_text_en','') ELSE a.help_text_en END,
         help_text_am = CASE WHEN v_cells ? 'help_text_am' THEN NULLIF(v_cells->>'help_text_am','') ELSE a.help_text_am END,
         updated_at   = now()
   WHERE a.id = v_id;

  SELECT attr_type, preset, max_length, options INTO v_row
    FROM public.attributes WHERE id = v_id;
  IF v_row.attr_type <> 'multi_select' OR v_row.preset IS NOT NULL OR v_row.max_length IS NOT NULL THEN
    RAISE EXCEPTION 'INC-200 P1: after the commit the row reads type=%, preset=%, max_length=%',
      v_row.attr_type, v_row.preset, v_row.max_length;
  END IF;
  IF jsonb_array_length(v_row.options) <> 3 THEN
    RAISE EXCEPTION 'INC-200 P1: the three options did not land: %', v_row.options;
  END IF;

  ---------------------------------------------------- P4: the undo brings the text row back
  v_prev := jsonb_build_object('attr_key','inc200-text','name_en','INC-200 text',
                               'attr_type','text','options','null'::jsonb,
                               'help_text_en',NULL,'unit',NULL,'min_bound',NULL,'max_bound',NULL,
                               'decimals',NULL,'format',NULL,'preset','free:40',
                               'max_length','40','help_text_am',NULL,'depends_on','');
  UPDATE public.attributes
     SET name_en = v_prev->>'name_en',
         attr_type = v_prev->>'attr_type',
         options = CASE WHEN v_prev->'options' = 'null'::jsonb THEN NULL ELSE v_prev->'options' END,
         unit         = CASE WHEN v_prev ? 'unit'         THEN v_prev->>'unit'         ELSE unit END,
         min_bound    = CASE WHEN v_prev ? 'min_bound'    THEN v_prev->>'min_bound'    ELSE min_bound END,
         max_bound    = CASE WHEN v_prev ? 'max_bound'    THEN v_prev->>'max_bound'    ELSE max_bound END,
         decimals     = CASE WHEN v_prev ? 'decimals'     THEN (v_prev->>'decimals')::smallint ELSE decimals END,
         format       = CASE WHEN v_prev ? 'format'       THEN v_prev->>'format'       ELSE format END,
         preset       = CASE WHEN v_prev ? 'preset'       THEN v_prev->>'preset'       ELSE preset END,
         max_length   = CASE WHEN v_prev ? 'max_length'   THEN (v_prev->>'max_length')::integer ELSE max_length END,
         help_text_en = CASE WHEN v_prev ? 'help_text_en' THEN v_prev->>'help_text_en' ELSE help_text_en END,
         help_text_am = CASE WHEN v_prev ? 'help_text_am' THEN v_prev->>'help_text_am' ELSE help_text_am END,
         updated_at = now()
   WHERE attr_key = 'inc200-text';
  SELECT attr_type, preset, max_length, options INTO v_row
    FROM public.attributes WHERE attr_key = 'inc200-text';
  IF v_row.attr_type <> 'text' OR v_row.preset <> 'free:40' OR v_row.max_length <> 40
     OR v_row.options IS NOT NULL THEN
    RAISE EXCEPTION 'INC-200 P4: the undo did not restore the text definition: type=% preset=% max_length=%',
      v_row.attr_type, v_row.preset, v_row.max_length;
  END IF;

  ------------------------------------------------------------- P2: number → single_select
  INSERT INTO public.attributes (attr_key, name_en, attr_type, unit, min_bound, max_bound,
                                 decimals, format)
  VALUES ('inc200-num', 'INC-200 number', 'number', 'km', '0', '100', 1, 'plain')
  RETURNING id INTO v_id;

  v_plan := public.attr_import_plan(
    jsonb_build_array(jsonb_build_object(
      'row', 2, 'attribute_key', 'inc200-num', 'label_en', 'INC-200 number',
      'type', 'single_select',
      'options', '[{"value":"x","label_en":"X"},{"value":"y","label_en":"Y"}]',
      'unit', 'km', 'min', '0', 'max', '100', 'decimals', '1', 'format', 'plain')),
    '[]'::jsonb, NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0 THEN
    RAISE EXCEPTION 'INC-200 P2: the type change was refused: %', v_plan->'refusals';
  END IF;
  SELECT value INTO v_item FROM jsonb_array_elements(v_plan->'definitions') LIMIT 1;
  v_cells := v_item->'cells';
  IF v_cells->'unit' <> 'null'::jsonb OR v_cells->'min_bound' <> 'null'::jsonb
     OR v_cells->'max_bound' <> 'null'::jsonb OR v_cells->'decimals' <> 'null'::jsonb
     OR v_cells->'format' <> 'null'::jsonb THEN
    RAISE EXCEPTION 'INC-200 P2: the plan did not clear the five number cells: %', v_cells;
  END IF;

  UPDATE public.attributes a
     SET name_en      = v_item->>'name_en',
         attr_type    = v_item->>'attr_type',
         options      = CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END,
         unit         = CASE WHEN v_cells ? 'unit'         THEN NULLIF(v_cells->>'unit','')         ELSE a.unit END,
         min_bound    = CASE WHEN v_cells ? 'min_bound'    THEN NULLIF(v_cells->>'min_bound','')    ELSE a.min_bound END,
         max_bound    = CASE WHEN v_cells ? 'max_bound'    THEN NULLIF(v_cells->>'max_bound','')    ELSE a.max_bound END,
         decimals     = CASE WHEN v_cells ? 'decimals'     THEN NULLIF(v_cells->>'decimals','')::smallint  ELSE a.decimals END,
         format       = CASE WHEN v_cells ? 'format'       THEN NULLIF(v_cells->>'format','')       ELSE a.format END,
         preset       = CASE WHEN v_cells ? 'preset'       THEN NULLIF(v_cells->>'preset','')       ELSE a.preset END,
         max_length   = CASE WHEN v_cells ? 'max_length'   THEN NULLIF(v_cells->>'max_length','')::integer ELSE a.max_length END,
         updated_at   = now()
   WHERE a.id = v_id;

  IF EXISTS (SELECT 1 FROM public.attributes
              WHERE id = v_id
                AND (unit IS NOT NULL OR min_bound IS NOT NULL OR max_bound IS NOT NULL
                     OR decimals IS NOT NULL OR format IS NOT NULL)) THEN
    RAISE EXCEPTION 'INC-200 P2: a number cell survived the conversion to single_select';
  END IF;

  --------------------------------------- P3: SAME TYPE — NULL still means "leave as is"
  INSERT INTO public.attributes (attr_key, name_en, attr_type, preset, max_length)
  VALUES ('inc200-text2', 'INC-200 text two', 'text', 'free:40', 40);

  v_plan := public.attr_import_plan(
    jsonb_build_array(jsonb_build_object(
      'row', 2, 'attribute_key', 'inc200-text2', 'label_en', 'INC-200 text two',
      'type', 'text')),
    '[]'::jsonb, NULL);
  SELECT value INTO v_item FROM jsonb_array_elements(v_plan->'definitions') LIMIT 1;
  IF v_item->'cells' <> '{}'::jsonb THEN
    RAISE EXCEPTION 'INC-200 P3: a same-type row with no cell columns must diff no cells: %',
      v_item->'cells';
  END IF;
  IF v_item->>'change' <> 'none' THEN
    RAISE EXCEPTION 'INC-200 P3: a same-type row with no changes must read none, got %',
      v_item->>'change';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.attributes
                  WHERE attr_key = 'inc200-text2' AND preset = 'free:40' AND max_length = 40) THEN
    RAISE EXCEPTION 'INC-200 P3: the untouched text cells were disturbed';
  END IF;

  DELETE FROM public.attributes
   WHERE attr_key IN ('inc200-text', 'inc200-text2', 'inc200-num');

  RAISE NOTICE 'INC-200: proofs OK — text→multi_select and number→single_select clear their cells, same-type NULLs leave them alone, the undo restores type and cells';
END $proof$;

DO $readback$
DECLARE
  v_changed text[];
  v_src     text;
BEGIN
  -- Every function OTHER than the three re-declared here is byte-identical.
  SELECT COALESCE(array_agg(b.proname ORDER BY b.proname), ARRAY[]::text[]) INTO v_changed
    FROM inc200_before b
    JOIN pg_proc p ON p.oid = b.fn_oid
   WHERE md5(p.prosrc) <> b.src_md5
     AND b.proname NOT IN ('attr_import_plan', 'admin_upsert_attribute',
                           'admin_commit_attribute_import');
  IF COALESCE(array_length(v_changed, 1), 0) > 0 THEN
    RAISE EXCEPTION 'INC-200: these functions must be untouched: %', v_changed;
  END IF;

  -- The three re-declared bodies carry the INC-200 rule.
  FOREACH v_src IN ARRAY ARRAY['attr_import_plan', 'admin_upsert_attribute',
                               'admin_commit_attribute_import']
  LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
                    WHERE n.nspname = 'public' AND p.proname = v_src
                      AND position('INC-200' in p.prosrc) > 0) THEN
      RAISE EXCEPTION 'INC-200: % does not carry the rule', v_src;
    END IF;
  END LOOP;

  -- ACLs unchanged for every function in the census.
  IF EXISTS (
    SELECT 1 FROM inc200_before b
      JOIN pg_proc p ON p.oid = b.fn_oid
     WHERE COALESCE(p.proacl::text, '') <> b.acl
  ) THEN
    RAISE EXCEPTION 'INC-200: an ACL changed';
  END IF;

  IF has_function_privilege('anon', 'public.attr_import_plan(jsonb, jsonb, text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_commit_attribute_import(jsonb, jsonb, text, text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-200: anon must hold no EXECUTE on the attribute doors';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_commit_attribute_import(jsonb, jsonb, text, text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-200: authenticated must hold EXECUTE on the attribute doors';
  END IF;

  RAISE NOTICE 'INC-200: read-backs OK — other functions byte-identical, ACLs unchanged';
END $readback$;

INSERT INTO public.migration_marks (version) VALUES ('20260915150000') ON CONFLICT DO NOTHING;