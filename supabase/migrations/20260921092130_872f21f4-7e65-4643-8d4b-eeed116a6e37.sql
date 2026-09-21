-- =====================================================================
-- M-SHAPE / INC-254 — THE PLANNER RE-VALIDATES ONLY WHAT THE FILE CHANGES.
--
-- CENSUS (live, before this file): `attr_option_shape` carries NO option-value
-- charset rule at all — it judges option-record KEYS, `active`, `aliases`,
-- `bounds`, `allowed` and `facts`. No function, constraint or app file refuses a
-- digit-led option value; 45 live definitions hold one (`220v`, `128gb`, `4x2`,
-- `17+`, …) and every one passes. NO VALUE RULE IS INTRODUCED HERE: a charset
-- would be a NEW restriction, and the stored `17+` proves it would refuse the
-- catalog's own state. `badShape` for an attributes file comes only from a LINKS
-- row condition cell, never from an option cell.
--
-- THE ONE CHANGE (re-declared WHOLE, INC-183; body censused against live
-- pg_get_functiondef, md5 ad8759c1d40dbd2a94f05b4c9eba9bbb, from
-- 20260920150901_bd008b3e-1ac4-44f6-8143-1441cc365b81.sql): the DEC-050 strict
-- option shape now runs ONLY when the row's parsed option list DIFFERS from the
-- stored one. An option cell identical to the stored jsonb is the catalog's own
-- state, already judged when it was written, so a byte-identical re-import
-- plans as unchanged without re-validation. Anything altered — one added key,
-- one changed alias, one new option, a brand-new definition — is judged in full.
-- =====================================================================

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
  -- M-ORDER — the links file's own display_order cell (integer >= 0).
  v_ord        int;
  v_ord_txt    text;
  v_ord_set    boolean;
  -- DEC-057 L2-mig — the post-plan definitions overlay the rule resolves through.
  v_overlay    jsonb := '[]'::jsonb;
  -- INC-200 — the type this row leaves behind, when it changes.
  v_newtype    text;
  -- M-MAINT-2 Part B — the two per-link cells.
  v_alw_txt    text;
  v_alw        text[];
  v_alw_set    boolean;
  v_dflt_txt   text;
  v_dflt       jsonb;
  v_dflt_set   boolean;
  v_lopts      jsonb;
  v_ltype      text;
  v_lvals      text[];
  v_eff_vals   text[];
  v_bad_link   text;
  v_dt         date;
  -- M-MAINT-3b — the THIRD per-link cell: the D24 condition.
  v_vw_txt     text;
  v_vw         jsonb;
  v_vw_set     boolean;
  v_vw_key     text;
  v_vw_vals    text[];
  v_sibopts    jsonb;
  v_sibvals    text[];
  -- M-SHAPE — does this row's option cell differ from the stored one?
  v_opt_same   boolean;
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
    --
    -- M-SHAPE (INC-254) — BUT ONLY FOR A CELL THE FILE CHANGES. An option list
    -- identical to the stored one is the catalog's own state: it was judged when
    -- it was written and re-judging it can only refuse the operator's own
    -- export. So an unchanged cell skips the shape check and falls through to
    -- the ordinary diff, which will report `none`. Every altered cell — and
    -- every cell of a brand-new definition — is judged in full, as before.
    v_opt_same := (v_att.id IS NOT NULL AND v_options IS NOT DISTINCT FROM v_att.options);
    v_optmsg := CASE WHEN v_opt_same THEN NULL
                     ELSE public.attr_option_shape(v_key, v_options) END;
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

    -- M-ORDER — THE display_order CELL. ABSENT or BLANK changes NOTHING (the
    -- name_am rule), so a console Move up/down survives every import. A
    -- present, non-blank cell must be a NON-NEGATIVE INTEGER; anything else
    -- refuses badDisplayOrder with the offending value. Ties are NOT resolved
    -- here: the posting read keeps its own tie-break (display_order, attr_key).
    v_ord_set := false;
    v_ord := NULL;
    v_ord_txt := NULL;
    IF e ? 'display_order' THEN
      v_ord_txt := btrim(COALESCE(e->>'display_order',''));
      IF v_ord_txt <> '' THEN
        IF v_ord_txt !~ '^[0-9]+$' THEN
          v_refusals := v_refusals || jsonb_build_object(
            'file','links','row',v_row,'key',v_key,'reason','badDisplayOrder',
            'category', v_cat.slug, 'detail', v_ord_txt, 'value', v_ord_txt);
          CONTINUE;
        END IF;
        v_ord_set := true;
        v_ord := v_ord_txt::int;
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

    -- M-MAINT-2 PART B — THE TWO PER-LINK CELLS. ABSENT = no change; a PRESENT
    -- and EMPTY cell clears it. `allowed_options` is a SUBSET of the
    -- definition's own option values — the POST-PLAN definition, so a file that
    -- adds the definition and narrows the link in the same pass is legal.
    -- `default_value` is judged against the definition's TYPE and, when a
    -- shortlist is in force (this row's, or the stored one when the row is
    -- silent), against ITS values. Nothing is silently dropped.
    v_alw_set := (e ? 'allowed_options');
    v_dflt_set := (e ? 'default_value');
    v_alw := NULL;
    v_dflt := NULL;
    v_bad_link := NULL;

    IF v_alw_set OR v_dflt_set THEN
      v_ltype := NULL;
      v_lopts := NULL;
      SELECT x.value->>'attr_type',
             CASE WHEN x.value->'options' = 'null'::jsonb THEN NULL ELSE x.value->'options' END
        INTO v_ltype, v_lopts
        FROM jsonb_array_elements(v_defs) x
       WHERE x.value->>'key' = v_key AND x.value->>'action' = 'upsert'
       LIMIT 1;
      IF v_ltype IS NULL THEN
        SELECT a.attr_type, a.options INTO v_ltype, v_lopts
          FROM public.attributes a WHERE a.attr_key = v_key;
      END IF;
      SELECT COALESCE(array_agg(o->>'value'), ARRAY[]::text[]) INTO v_lvals
        FROM jsonb_array_elements(public.attr_option_norm(v_lopts)) o;
    END IF;

    IF v_alw_set THEN
      v_alw_txt := btrim(COALESCE(e->>'allowed_options',''));
      IF v_alw_txt = '' THEN
        v_alw := NULL;
      ELSIF COALESCE(v_ltype,'') NOT IN ('single_select','multi_select') THEN
        v_bad_link := 'typeNotSelect';
      ELSE
        v_alw := ARRAY[]::text[];
        FOREACH v_seg IN ARRAY string_to_array(v_alw_txt, '|')
        LOOP
          CONTINUE WHEN btrim(v_seg) = '';
          IF NOT (btrim(v_seg) = ANY (v_lvals)) THEN
            v_bad_link := btrim(v_seg);
            EXIT;
          END IF;
          IF NOT (btrim(v_seg) = ANY (v_alw)) THEN
            v_alw := v_alw || btrim(v_seg);
          END IF;
        END LOOP;
        IF v_bad_link IS NULL AND COALESCE(array_length(v_alw, 1), 0) = 0 THEN
          v_alw := NULL;
        END IF;
      END IF;
    END IF;

    IF v_bad_link IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','links','row',v_row,'key',v_key,'reason','badAllowedOption',
        'category', v_cat.slug, 'detail', v_bad_link, 'value', v_bad_link);
      CONTINUE;
    END IF;

    IF v_dflt_set THEN
      v_dflt_txt := btrim(COALESCE(e->>'default_value',''));
      IF v_dflt_txt = '' THEN
        v_dflt := NULL;
      ELSE
        v_eff_vals := CASE
          WHEN v_alw_set AND v_alw IS NOT NULL THEN v_alw
          WHEN NOT v_alw_set AND v_link.id IS NOT NULL AND v_link.allowed_options IS NOT NULL
            THEN v_link.allowed_options
          ELSE v_lvals END;
        CASE COALESCE(v_ltype,'')
          WHEN 'number' THEN
            BEGIN
              v_dflt := to_jsonb(v_dflt_txt::numeric);
            EXCEPTION WHEN others THEN
              v_bad_link := 'notANumber:' || v_dflt_txt;
            END;
          WHEN 'boolean' THEN
            IF lower(v_dflt_txt) IN ('true','t','1','yes') THEN
              v_dflt := to_jsonb(true);
            ELSIF lower(v_dflt_txt) IN ('false','f','0','no') THEN
              v_dflt := to_jsonb(false);
            ELSE
              v_bad_link := 'notABoolean:' || v_dflt_txt;
            END IF;
          WHEN 'date' THEN
            BEGIN
              v_dt := v_dflt_txt::date;
              v_dflt := to_jsonb(v_dt::text);
            EXCEPTION WHEN others THEN
              v_bad_link := 'notADate:' || v_dflt_txt;
            END;
          WHEN 'single_select' THEN
            IF NOT (v_dflt_txt = ANY (v_eff_vals)) THEN
              v_bad_link := 'notInOptions:' || v_dflt_txt;
            ELSE
              v_dflt := to_jsonb(v_dflt_txt);
            END IF;
          WHEN 'multi_select' THEN
            v_dflt := '[]'::jsonb;
            FOREACH v_seg IN ARRAY string_to_array(v_dflt_txt, '|')
            LOOP
              CONTINUE WHEN btrim(v_seg) = '';
              IF NOT (btrim(v_seg) = ANY (v_eff_vals)) THEN
                v_bad_link := 'notInOptions:' || btrim(v_seg);
                EXIT;
              END IF;
              v_dflt := v_dflt || jsonb_build_array(btrim(v_seg));
            END LOOP;
            IF v_bad_link IS NULL AND jsonb_array_length(v_dflt) = 0 THEN
              v_dflt := NULL;
            END IF;
          ELSE
            v_dflt := to_jsonb(v_dflt_txt);
        END CASE;
      END IF;
    END IF;

    IF v_bad_link IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','links','row',v_row,'key',v_key,'reason','badDefault',
        'category', v_cat.slug, 'detail', v_bad_link, 'value', v_dflt_txt);
      CONTINUE;
    END IF;

    -- M-MAINT-3b — THE THIRD PER-LINK CELL: the D24 condition, text form
    -- `<sibling key>=<value>|<value>…`. THE BLANK RULE (the name_am rule): a
    -- BLANK cell changes NOTHING and a MISSING column is ignored, so a
    -- console-set condition survives every import. The judgements MIRROR the
    -- link doors (attr_link_cells_refusal): the shape checker, never the row's
    -- own key, a sibling linked to the same category (or linked by this same
    -- file), and every listed value one of the sibling's own option values.
    v_vw_set := false;
    v_vw := NULL;
    v_vw_txt := NULL;
    IF e ? 'visible_when' THEN
      v_vw_txt := btrim(COALESCE(e->>'visible_when',''));
      IF v_vw_txt <> '' THEN
        v_vw_set := true;
        v_vw_key := btrim(split_part(v_vw_txt, '=', 1));
        v_vw_vals := ARRAY[]::text[];
        IF position('=' in v_vw_txt) > 0 THEN
          FOREACH v_seg IN ARRAY string_to_array(substr(v_vw_txt, position('=' in v_vw_txt) + 1), '|')
          LOOP
            CONTINUE WHEN btrim(v_seg) = '';
            IF NOT (btrim(v_seg) = ANY (v_vw_vals)) THEN
              v_vw_vals := v_vw_vals || btrim(v_seg);
            END IF;
          END LOOP;
        END IF;

        IF position('=' in v_vw_txt) = 0 OR v_vw_key = ''
           OR COALESCE(array_length(v_vw_vals, 1), 0) = 0 THEN
          v_bad_link := 'badShape';
        ELSIF v_vw_key = v_key THEN
          v_bad_link := 'self';
        ELSE
          v_vw := jsonb_build_object('key', v_vw_key, 'in', to_jsonb(v_vw_vals));
          IF NOT public.attr_visible_when_ok(v_vw) THEN
            v_bad_link := 'badShape';
          ELSIF NOT EXISTS (
                  SELECT 1 FROM public.effective_category_links(v_cat.id) el
                    JOIN public.attributes a2 ON a2.id = el.attribute_id
                   WHERE a2.attr_key = v_vw_key)
            AND NOT EXISTS (
                  SELECT 1 FROM jsonb_array_elements(v_lnks) x
                   WHERE x.value->>'slug' = v_cat.slug
                     AND x.value->>'key' = v_vw_key
                     AND x.value->>'action' = 'upsert') THEN
            v_bad_link := 'unknownSibling:' || v_vw_key;
          ELSE
            -- the sibling's option pool, the POST-PLAN one when this file
            -- creates or changes the sibling definition.
            v_sibopts := NULL;
            SELECT CASE WHEN x.value->'options' = 'null'::jsonb THEN NULL ELSE x.value->'options' END
              INTO v_sibopts
              FROM jsonb_array_elements(v_defs) x
             WHERE x.value->>'key' = v_vw_key AND x.value->>'action' = 'upsert'
             LIMIT 1;
            IF v_sibopts IS NULL THEN
              SELECT a2.options INTO v_sibopts
                FROM public.attributes a2 WHERE a2.attr_key = v_vw_key;
            END IF;
            SELECT COALESCE(array_agg(o->>'value'), ARRAY[]::text[]) INTO v_sibvals
              FROM jsonb_array_elements(public.attr_option_norm(v_sibopts)) o;
            FOREACH v_seg IN ARRAY v_vw_vals
            LOOP
              IF NOT (v_seg = ANY (COALESCE(v_sibvals, ARRAY[]::text[]))) THEN
                v_bad_link := 'notInOptions:' || v_seg;
                EXIT;
              END IF;
            END LOOP;
          END IF;
        END IF;
      END IF;
    END IF;

    IF v_bad_link IS NOT NULL THEN
      v_refusals := v_refusals || jsonb_build_object(
        'file','links','row',v_row,'key',v_key,'reason','badVisibleWhen',
        'category', v_cat.slug, 'detail', v_bad_link, 'value', COALESCE(v_vw_txt,''));
      CONTINUE;
    END IF;

    IF v_link.id IS NULL THEN
      v_change := 'add';
    ELSIF v_link.is_required IS DISTINCT FROM v_req
       OR v_link.is_filterable IS DISTINCT FROM v_filt
       OR v_link.card_rank IS DISTINCT FROM v_rank
       OR (v_alw_set AND v_link.allowed_options IS DISTINCT FROM v_alw)
       OR (v_dflt_set AND v_link.default_value IS DISTINCT FROM v_dflt)
       OR (v_vw_set AND v_link.visible_when IS DISTINCT FROM v_vw)
       -- M-ORDER — a display_order-only change is a field change.
       OR (v_ord_set AND v_link.display_order IS DISTINCT FROM v_ord) THEN
      v_change := 'change';
    ELSE
      v_change := 'none';
    END IF;

    v_lnks := v_lnks || jsonb_build_object(
      'row',v_row,'key',v_key,'slug',v_cat.slug,'action','upsert','change',v_change,
      'link_id',v_link.id,'category_id',v_cat.id,'attribute_id',v_attr_id,
      'is_required',v_req,'is_filterable',v_filt,'card_rank',v_rank,
      'allowed_set',v_alw_set,
      'allowed_options', CASE WHEN v_alw IS NULL THEN 'null'::jsonb ELSE to_jsonb(v_alw) END,
      'default_set',v_dflt_set,
      'default_value', COALESCE(v_dflt, 'null'::jsonb),
      'visible_when_set',v_vw_set,
      'visible_when', COALESCE(v_vw, 'null'::jsonb),
      'display_order_set',v_ord_set,
      'display_order', CASE WHEN v_ord IS NULL THEN '' ELSE v_ord::text END);
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

REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

-- =====================================================================
-- PROOFS (read-only: attr_import_plan is STABLE and writes nothing).
-- =====================================================================
DO $proof$
DECLARE
  v_att   public.attributes%ROWTYPE;
  v_plan  jsonb;
  v_row   jsonb;
  v_n     int;
BEGIN
  SELECT * INTO v_att FROM public.attributes WHERE attr_key = 'voltage';
  IF v_att.id IS NULL THEN
    RAISE EXCEPTION 'PROOF setup: voltage definition absent';
  END IF;

  -- PROOF 1 — THE OPERATOR'S OWN FILE. The voltage row exactly as the export
  -- writes it (digit-led values `220v`/`110v`/`380v_three_phase`, the two
  -- aliases) plans as UNCHANGED, with no refusal at all.
  v_plan := public.attr_import_plan(
    jsonb_build_array(jsonb_build_object(
      'row', 1, 'attribute_key', 'voltage', 'action', 'upsert',
      'label_en', btrim(COALESCE(v_att.name_en, '')),
      'type', v_att.attr_type,
      'options', v_att.options::text)),
    '[]'::jsonb, NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0 THEN
    RAISE EXCEPTION 'PROOF 1 failed: byte-identical voltage refused %', v_plan->'refusals';
  END IF;
  IF (v_plan->'definitions'->0->>'change') IS DISTINCT FROM 'none' THEN
    RAISE EXCEPTION 'PROOF 1 failed: voltage planned as % ', v_plan->'definitions'->0->>'change';
  END IF;
  RAISE NOTICE 'PROOF 1 ok — byte-identical voltage: change=none, refusals=0';

  -- PROOF 2 — A NEW DIGIT-LED OPTION VALUE PASSES. Nothing refuses `128gb`.
  v_plan := public.attr_import_plan(
    jsonb_build_array(jsonb_build_object(
      'row', 1, 'attribute_key', 'm_shape_probe', 'action', 'upsert',
      'label_en', 'M-SHAPE probe', 'type', 'single_select',
      'options', '[{"value":"128gb","label_en":"128 GB"},{"value":"256gb","label_en":"256 GB"}]')),
    '[]'::jsonb, NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0 THEN
    RAISE EXCEPTION 'PROOF 2 failed: 128gb refused %', v_plan->'refusals';
  END IF;
  IF (v_plan->'definitions'->0->>'change') IS DISTINCT FROM 'add' THEN
    RAISE EXCEPTION 'PROOF 2 failed: probe planned as %', v_plan->'definitions'->0->>'change';
  END IF;
  RAISE NOTICE 'PROOF 2 ok — new digit-led option value: change=add, refusals=0';

  -- PROOF 3 — A GENUINELY BAD OPTION RECORD STILL REFUSES, on a NEW definition.
  v_plan := public.attr_import_plan(
    jsonb_build_array(jsonb_build_object(
      'row', 1, 'attribute_key', 'm_shape_probe', 'action', 'upsert',
      'label_en', 'M-SHAPE probe', 'type', 'single_select',
      'options', '[{"value":"128gb","label_en":"128 GB","nope":"x"}]')),
    '[]'::jsonb, NULL);
  v_row := v_plan->'refusals'->0;
  IF (v_row->>'reason') IS DISTINCT FROM 'badOption'
     OR position('unknownOptionKey' in COALESCE(v_row->>'detail','')) = 0 THEN
    RAISE EXCEPTION 'PROOF 3 failed: bad option record not refused %', v_plan->'refusals';
  END IF;
  RAISE NOTICE 'PROOF 3 ok — bad option record on a new definition: % / %',
    v_row->>'reason', v_row->>'detail';

  -- PROOF 4 — A CHANGED CELL ON AN EXISTING DEFINITION IS STILL JUDGED IN FULL.
  -- The same voltage row with ONE extra key in ONE option is no longer
  -- identical to the stored list, so the strict shape runs and refuses.
  v_plan := public.attr_import_plan(
    jsonb_build_array(jsonb_build_object(
      'row', 1, 'attribute_key', 'voltage', 'action', 'upsert',
      'label_en', btrim(COALESCE(v_att.name_en, '')),
      'type', v_att.attr_type,
      'options', (
        SELECT jsonb_agg(CASE WHEN o.value->>'value' = '220v'
                              THEN o.value || jsonb_build_object('nope', 'x')
                              ELSE o.value END ORDER BY o.ord)
          FROM jsonb_array_elements(v_att.options) WITH ORDINALITY AS o(value, ord))::text)),
    '[]'::jsonb, NULL);
  v_row := v_plan->'refusals'->0;
  IF (v_row->>'reason') IS DISTINCT FROM 'badOption'
     OR position('unknownOptionKey' in COALESCE(v_row->>'detail','')) = 0 THEN
    RAISE EXCEPTION 'PROOF 4 failed: a CHANGED option cell escaped the shape check %',
      v_plan->'refusals';
  END IF;
  RAISE NOTICE 'PROOF 4 ok — changed option cell still judged: % / %',
    v_row->>'reason', v_row->>'detail';

  -- PROOF 5 — EVERY LIVE DEFINITION ROUND-TRIPS. Each stored option list,
  -- re-imported byte-identical, plans as unchanged with no refusal (E6: the
  -- empty set is named — there must be at least one definition to walk).
  v_n := 0;
  FOR v_att IN SELECT * FROM public.attributes ORDER BY attr_key LOOP
    v_plan := public.attr_import_plan(
      jsonb_build_array(jsonb_build_object(
        'row', 1, 'attribute_key', v_att.attr_key, 'action', 'upsert',
        'label_en', btrim(COALESCE(v_att.name_en, '')),
        'type', v_att.attr_type,
        -- the export carries the dependency column, so a dependent
        -- definition's `parent` values resolve exactly as in a real file.
        'depends_on', COALESCE(
          (SELECT p2.attr_key FROM public.attributes p2 WHERE p2.id = v_att.depends_on), ''),
        'options', COALESCE(v_att.options::text, ''))),
      '[]'::jsonb, NULL);
    IF jsonb_array_length(v_plan->'refusals') <> 0 THEN
      RAISE EXCEPTION 'PROOF 5 failed: % refused on a byte-identical re-import %',
        v_att.attr_key, v_plan->'refusals';
    END IF;
    v_n := v_n + 1;
  END LOOP;
  IF v_n = 0 THEN
    RAISE EXCEPTION 'PROOF 5 failed: no definitions to walk';
  END IF;
  RAISE NOTICE 'PROOF 5 ok — % live definitions re-import with zero refusals', v_n;
END $proof$;

-- READ-BACKS — the definition carries the new guard, and the ACL is intact.
DO $readback$
DECLARE r record;
BEGIN
  SELECT p.provolatile AS vol, p.prosecdef AS secdef,
         (position('v_opt_same' in p.prosrc) > 0) AS has_guard,
         (position('THEN NULL' in p.prosrc) > 0) AS has_skip
    INTO r
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'attr_import_plan';
  IF NOT r.has_guard OR NOT r.has_skip OR r.vol <> 's' OR NOT r.secdef THEN
    RAISE EXCEPTION 'READ-BACK failed: guard=% skip=% volatility=% secdef=%',
      r.has_guard, r.has_skip, r.vol, r.secdef;
  END IF;
  RAISE NOTICE 'READ-BACK definition attr_import_plan: guard present, STABLE SECURITY DEFINER';

  FOR r IN
    SELECT unnest(p.proacl)::text AS ace
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public' AND p.proname = 'attr_import_plan'
  LOOP
    RAISE NOTICE 'READ-BACK acl attr_import_plan %', r.ace;
  END LOOP;
END $readback$;

INSERT INTO public.migration_marks (version)
VALUES ('20260922090000') ON CONFLICT DO NOTHING;