-- DEC-057b-mig — CO-LINKAGE MEANS AT LEAST ONE SHARED CATEGORY.
--
-- Operator walk finding, 2026-09-13 (DEC-057 amendment): `bounds` and
-- `allowed` targets were refused unless linked in EVERY category where the
-- owner is linked. Real catalogs link owners more widely than their targets
-- (`series-phones` at Feature Phones without storage; `model-cars` at Vehicle
-- Hire without fuel/transmission). A constraint applies wherever BOTH
-- attributes are present; where the target is absent there is nothing to
-- constrain. New rule: the target must be linked in AT LEAST ONE category
-- where the owner is linked (live links overlaid by the plan, as today); the
-- refusal ids `boundsTargetNotColinked` / `allowedTargetNotColinked` now mean
-- "linked in none of the owner's categories".
--
-- INC-183 law: the three judges are re-declared WHOLE — the allowed rule
-- (attr_allowed_check), the planner (attr_import_plan) and the door
-- (admin_upsert_attribute, whose bounds co-linkage comparison is in-body).
-- Each flips exactly one comparison: the universal "every owner category is
-- covered" test becomes "the owner's category set INTERSECTS the target's
-- (direct or inherited, plan-overlaid) set"; an owner linked nowhere is
-- unconstrained, as before. Nothing else changes (target type rules,
-- circularity, value existence, limits). Closers restated in-file; ACL
-- read-backs below.

/* ============ 1. THE ALLOWED RULE (whole re-declaration) ============ */
CREATE OR REPLACE FUNCTION public.attr_allowed_check(p_owner_key text, p_options jsonb, p_links jsonb, p_defs jsonb DEFAULT '[]'::jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $function$
DECLARE
  v_opt     jsonb;
  v_val     text;
  v_tkey    text;
  v_list    jsonb;
  v_ttype   text;
  v_tid     uuid;
  v_tvals   text[];
  v_v       text;
  v_ocats   uuid[];
  v_tcats   uuid[];
  v_parent  text;
  v_cur     uuid;
  v_hops    int;
BEGIN
  IF p_options IS NULL OR jsonb_typeof(p_options) <> 'array' THEN RETURN NULL; END IF;
  IF NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(p_options) o
     WHERE jsonb_typeof(o.value) = 'object'
       AND jsonb_typeof(o.value->'allowed') = 'object'
       AND (o.value->'allowed') <> '{}'::jsonb) THEN
    RETURN NULL;
  END IF;

  v_ocats := public.attr_cats_expand(public.attr_postplan_cats(p_owner_key, p_links));
  SELECT a.attr_key INTO v_parent
    FROM public.attributes a
    JOIN public.attributes o ON o.depends_on = a.id
   WHERE o.attr_key = p_owner_key;

  FOR v_opt IN SELECT value FROM jsonb_array_elements(p_options)
  LOOP
    CONTINUE WHEN jsonb_typeof(v_opt) <> 'object';
    CONTINUE WHEN jsonb_typeof(v_opt->'allowed') <> 'object';
    v_val := COALESCE(v_opt->>'value', '');

    FOR v_tkey, v_list IN SELECT key, value FROM jsonb_each(v_opt->'allowed')
    LOOP
      -- Never the owner, never the owner's parent.
      IF v_tkey = p_owner_key OR (v_parent IS NOT NULL AND v_tkey = v_parent) THEN
        RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                  'target', v_tkey, 'reason', 'allowedTargetCircular',
                                  'detail', p_owner_key || '|' || v_val || '|' || v_tkey);
      END IF;

      -- DEC-057 L2-mig: the target's type and option list resolve from live
      -- definitions OVERLAID by p_defs (the plan's own creates/changes win for
      -- the same key). p_defs entries are { attribute_key, type, options }.
      v_tid := NULL; v_ttype := NULL; v_tvals := NULL;
      SELECT d.value->>'type' INTO v_ttype
        FROM jsonb_array_elements(COALESCE(p_defs, '[]'::jsonb)) d
       WHERE d.value->>'attribute_key' = v_tkey
       LIMIT 1;
      IF v_ttype IS NOT NULL THEN
        SELECT array_agg(o.value->>'value') INTO v_tvals
          FROM jsonb_array_elements(COALESCE(p_defs, '[]'::jsonb)) d,
               LATERAL jsonb_array_elements(
                 CASE WHEN jsonb_typeof(d.value->'options') = 'array'
                      THEN d.value->'options' ELSE '[]'::jsonb END) o
         WHERE d.value->>'attribute_key' = v_tkey;
      ELSE
        SELECT a.id, a.attr_type INTO v_tid, v_ttype
          FROM public.attributes a WHERE a.attr_key = v_tkey;
      END IF;
      -- The walk below still anchors live when the target exists there.
      IF v_tid IS NULL THEN
        SELECT a.id INTO v_tid FROM public.attributes a WHERE a.attr_key = v_tkey;
      END IF;
      IF v_ttype IS NULL OR v_ttype NOT IN ('single_select','multi_select') THEN
        RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                  'target', v_tkey, 'reason', 'allowedTargetNotSelect',
                                  'detail', p_owner_key || '|' || v_val || '|' || v_tkey);
      END IF;

      -- Never a definition that depends on the owner (directly or transitively).
      -- A plan-only target has no live id; its in-file dependency verdicts are
      -- the DEC-045b pass's, so the walk runs only with a live anchor.
      v_cur := v_tid; v_hops := 0;
      WHILE v_cur IS NOT NULL AND v_hops < 20 LOOP
        SELECT a.depends_on INTO v_cur FROM public.attributes a WHERE a.id = v_cur;
        IF v_cur IS NOT NULL
           AND EXISTS (SELECT 1 FROM public.attributes a
                        WHERE a.id = v_cur AND a.attr_key = p_owner_key) THEN
          RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                    'target', v_tkey, 'reason', 'allowedTargetCircular',
                                    'detail', p_owner_key || '|' || v_val || '|' || v_tkey);
        END IF;
        v_hops := v_hops + 1;
      END LOOP;

      -- Co-linked in at least one owner category, after this plan is applied (DEC-057b).
      v_tcats := public.attr_cats_expand(public.attr_postplan_cats(v_tkey, p_links));
      IF COALESCE(array_length(v_ocats, 1), 0) > 0 AND NOT EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE c = ANY (v_tcats)) THEN
        RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                  'target', v_tkey, 'reason', 'allowedTargetNotColinked',
                                  'detail', p_owner_key || '|' || v_val || '|' || v_tkey);
      END IF;

      -- Every listed value exists in the target's option list (active or not).
      IF v_tid IS NOT NULL AND v_tvals IS NULL THEN
        v_tvals := public.attr_option_values(v_tid);
      END IF;
      FOR v_v IN SELECT x.value #>> '{}' FROM jsonb_array_elements(
                   CASE WHEN jsonb_typeof(v_list) = 'array' THEN v_list ELSE '[]'::jsonb END) x
      LOOP
        IF v_v IS NULL OR NOT (v_v = ANY (COALESCE(v_tvals, ARRAY[]::text[]))) THEN
          RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                    'target', v_tkey, 'reason', 'allowedUnknownValue',
                                    'value', COALESCE(v_v, ''),
                                    'detail', p_owner_key || '|' || v_val || '|' || v_tkey
                                              || '|' || COALESCE(v_v, ''));
        END IF;
      END LOOP;
    END LOOP;
  END LOOP;

  RETURN NULL;
END $function$;

REVOKE ALL ON FUNCTION public.attr_allowed_check(text, jsonb, jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_allowed_check(text, jsonb, jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_allowed_check(text, jsonb, jsonb, jsonb) TO service_role;

/* ============ 2. THE PLANNER (whole re-declaration) ============ */
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

-- Closers restated in-file. The planner's ACL is UNCHANGED (not widened, not
-- narrowed): EXECUTE for authenticated exactly as it stands today.
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

/* ============ 3. THE DOOR (whole re-declaration) ============ */
CREATE OR REPLACE FUNCTION public.admin_upsert_attribute(
  p_id uuid, p_attr_key text, p_name_en text, p_attr_type text,
  p_options jsonb, p_help_text_en text, p_depends_on text DEFAULT NULL,
  p_unit text DEFAULT NULL, p_min_bound text DEFAULT NULL, p_max_bound text DEFAULT NULL,
  p_decimals smallint DEFAULT NULL, p_format text DEFAULT NULL, p_preset text DEFAULT NULL,
  p_max_length integer DEFAULT NULL, p_help_text_am text DEFAULT NULL)
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

  -- DEC-050 — the definition v2 cells, judged by the shared judge.
  v_cellmsg := public.attr_cell_check(p_attr_type, p_unit, p_min_bound, p_max_bound,
                                      p_decimals::int, p_format, p_preset, p_max_length,
                                      p_help_text_en, p_help_text_am);
  IF v_cellmsg IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.badCell:%', v_cellmsg USING ERRCODE = 'P0010';
  END IF;

  -- DEC-050 — the strict option shape. An unknown key is a refusal, never a
  -- silent drop; the refusal names the definition, the option and the reason.
  v_optmsg := public.attr_option_shape(p_attr_key, p_options);
  IF v_optmsg IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.badOption:%', v_optmsg USING ERRCODE = 'P0010';
  END IF;

  -- DEC-050 — a bounds target is a NUMBER definition linked, directly or by
  -- inheritance, in AT LEAST ONE category where this definition is linked (LIVE links) — DEC-057b.
  v_ocats := public.attr_postplan_cats(p_attr_key, '[]'::jsonb);
  FOREACH v_tkey IN ARRAY public.attr_bounds_targets(p_options)
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
  v_allowed := public.attr_allowed_check(p_attr_key, p_options, '[]'::jsonb);
  IF v_allowed IS NOT NULL THEN
    RAISE EXCEPTION 'admin.attributes.error.%:%', v_allowed->>'reason', v_allowed->>'detail'
      USING ERRCODE = 'P0010';
  END IF;

  IF p_id IS NULL THEN
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en, depends_on,
                                   unit, min_bound, max_bound, decimals, format, preset,
                                   max_length, help_text_am)
    VALUES (p_attr_key, p_name_en, p_attr_type, p_options, p_help_text_en, v_dep,
            p_unit, p_min_bound, p_max_bound, p_decimals, p_format, p_preset,
            p_max_length, p_help_text_am)
    RETURNING id INTO v_id;

    PERFORM public.log_audit('attribute.create', 'attributes', v_id::text,
      jsonb_build_object('attr_key', p_attr_key, 'attr_type', p_attr_type,
                         'depends_on', COALESCE(v_dep_key, ''),
                         'unit', p_unit, 'min_bound', p_min_bound, 'max_bound', p_max_bound,
                         'decimals', p_decimals, 'format', p_format, 'preset', p_preset,
                         'max_length', p_max_length, 'help_text_am', p_help_text_am));
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
           unit         = p_unit,
           min_bound    = p_min_bound,
           max_bound    = p_max_bound,
           decimals     = p_decimals,
           format       = p_format,
           preset       = p_preset,
           max_length   = p_max_length,
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

REVOKE ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)
  TO authenticated;
GRANT ALL ON FUNCTION public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)
  TO service_role;

/* ============ 4. PROOFS IN-FILE (every proof raises on failure) ============ */
-- Scratch: owner linked at A and B; target number for bounds, select for
-- allowed. The door is permission-gated (auth.uid() is NULL in a migration),
-- so the bounds judgements are proven through the planner and the door is
-- proven by READ-BACK of its flipped comparison (block $p3$).
DO $p1$
DECLARE
  v_a uuid; v_b uuid; v_c uuid; v_num uuid; v_sel uuid; v_own uuid;
  v_plan jsonb; v_ref jsonb; v_r jsonb;
  v_bounds jsonb := '[{"value":"a","bounds":{"dec057b_num":{"min":"1"}}}]'::jsonb;
  v_allowed jsonb := '[{"value":"a","allowed":{"dec057b_sel":["x"]}}]'::jsonb;
  v_defs jsonb := jsonb_build_array(
    jsonb_build_object('row', 2, 'attribute_key', 'dec057b_own', 'type', 'single_select',
      'label_en', 'DEC057B owner'));
BEGIN
  INSERT INTO public.categories (name_en, slug) VALUES ('DEC057B scratch A', 'dec057b-scratch-a') RETURNING id INTO v_a;
  INSERT INTO public.categories (name_en, slug) VALUES ('DEC057B scratch B', 'dec057b-scratch-b') RETURNING id INTO v_b;
  INSERT INTO public.categories (name_en, slug) VALUES ('DEC057B scratch C', 'dec057b-scratch-c') RETURNING id INTO v_c;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('dec057b_num', 'DEC057B number', 'number') RETURNING id INTO v_num;
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('dec057b_sel', 'DEC057B select', 'single_select', '[{"value":"x"}]'::jsonb) RETURNING id INTO v_sel;
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('dec057b_own', 'DEC057B owner', 'single_select', '[{"value":"a"},{"value":"b"}]'::jsonb) RETURNING id INTO v_own;
  INSERT INTO public.category_attribute_links (category_id, attribute_id)
  VALUES (v_a, v_own), (v_b, v_own);

  -- (i) TARGET AT A ONLY: accepted under the new rule, bounds AND allowed.
  INSERT INTO public.category_attribute_links (category_id, attribute_id)
  VALUES (v_a, v_num), (v_a, v_sel);
  v_plan := public.attr_import_plan(v_defs, '[]'::jsonb, NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0 THEN
    RAISE EXCEPTION 'PROOF (i) FAILED (planner bounds): %', v_plan->'refusals';
  END IF;
  -- planner-level bounds: give the owner its bounds options in the plan
  v_plan := public.attr_import_plan(
    jsonb_build_array(
      jsonb_build_object('row', 2, 'attribute_key', 'dec057b_own', 'type', 'single_select',
        'label_en', 'DEC057B owner', 'options', v_bounds)),
    '[]'::jsonb, NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0 THEN
    RAISE EXCEPTION 'PROOF (i) FAILED (planner bounds options): %', v_plan->'refusals';
  END IF;
  v_r := public.attr_allowed_check('dec057b_own', v_allowed, '[]'::jsonb);
  IF v_r IS NOT NULL THEN
    RAISE EXCEPTION 'PROOF (i) FAILED (allowed): %', v_r;
  END IF;
  RAISE NOTICE 'PROOF (i) OK: owner at A+B, target at A only — accepted (bounds and allowed)';

  -- (ii) TARGET AT C ONLY: refused with the existing ids.
  DELETE FROM public.category_attribute_links
   WHERE attribute_id IN (v_num, v_sel);
  INSERT INTO public.category_attribute_links (category_id, attribute_id)
  VALUES (v_c, v_num), (v_c, v_sel);
  v_plan := public.attr_import_plan(
    jsonb_build_array(
      jsonb_build_object('row', 2, 'attribute_key', 'dec057b_own', 'type', 'single_select',
        'label_en', 'DEC057B owner', 'options', v_bounds)),
    '[]'::jsonb, NULL);
  v_ref := v_plan->'refusals'->0;
  IF COALESCE(v_ref->>'reason','') <> 'boundsTargetNotColinked'
     OR COALESCE(v_ref->>'detail','') <> 'dec057b_num' THEN
    RAISE EXCEPTION 'PROOF (ii) FAILED (bounds): %', v_plan->'refusals';
  END IF;
  v_r := public.attr_allowed_check('dec057b_own', v_allowed, '[]'::jsonb);
  IF COALESCE(v_r->>'reason','') <> 'allowedTargetNotColinked'
     OR COALESCE(v_r->>'target','') <> 'dec057b_sel' THEN
    RAISE EXCEPTION 'PROOF (ii) FAILED (allowed): %', v_r;
  END IF;
  RAISE NOTICE 'PROOF (ii) OK: target at C only — refused with the existing ids';

  -- (iii) TARGET AT A AND B: accepted.
  INSERT INTO public.category_attribute_links (category_id, attribute_id)
  VALUES (v_a, v_num), (v_b, v_num), (v_a, v_sel), (v_b, v_sel);
  DELETE FROM public.category_attribute_links
   WHERE category_id = v_c AND attribute_id IN (v_num, v_sel);
  v_plan := public.attr_import_plan(
    jsonb_build_array(
      jsonb_build_object('row', 2, 'attribute_key', 'dec057b_own', 'type', 'single_select',
        'label_en', 'DEC057B owner', 'options', v_bounds)),
    '[]'::jsonb, NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0 THEN
    RAISE EXCEPTION 'PROOF (iii) FAILED (bounds): %', v_plan->'refusals';
  END IF;
  v_r := public.attr_allowed_check('dec057b_own', v_allowed, '[]'::jsonb);
  IF v_r IS NOT NULL THEN
    RAISE EXCEPTION 'PROOF (iii) FAILED (allowed): %', v_r;
  END IF;
  RAISE NOTICE 'PROOF (iii) OK: target at A and B — accepted';

  -- (iv) PLAN OVERLAY: target linked at A BY THE PLAN (no live target links).
  DELETE FROM public.category_attribute_links
   WHERE attribute_id IN (v_num, v_sel);
  v_plan := public.attr_import_plan(
    jsonb_build_array(
      jsonb_build_object('row', 2, 'attribute_key', 'dec057b_own', 'type', 'single_select',
        'label_en', 'DEC057B owner', 'options', v_bounds)),
    jsonb_build_array(
      jsonb_build_object('attribute_key', 'dec057b_num', 'action', 'upsert',
                         'category_slug', 'dec057b-scratch-a')),
    NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0 THEN
    RAISE EXCEPTION 'PROOF (iv) FAILED (bounds overlay): %', v_plan->'refusals';
  END IF;
  v_r := public.attr_allowed_check('dec057b_own', v_allowed,
    jsonb_build_array(
      jsonb_build_object('key', 'dec057b_sel', 'change', 'add', 'category_id', v_a::text)));
  IF v_r IS NOT NULL THEN
    RAISE EXCEPTION 'PROOF (iv) FAILED (allowed overlay): %', v_r;
  END IF;
  RAISE NOTICE 'PROOF (iv) OK: target linked in the plan at A — accepted';

  -- (v) REGRESSION: an owner linked NOWHERE stays unconstrained.
  DELETE FROM public.category_attribute_links WHERE attribute_id = v_own;
  v_plan := public.attr_import_plan(
    jsonb_build_array(
      jsonb_build_object('row', 2, 'attribute_key', 'dec057b_own', 'type', 'single_select',
        'label_en', 'DEC057B owner', 'options', v_bounds)),
    '[]'::jsonb, NULL);
  IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_plan->'refusals') r
              WHERE r.value->>'reason' = 'boundsTargetNotColinked') THEN
    RAISE EXCEPTION 'PROOF (v) FAILED: unlinked owner refused: %', v_plan->'refusals';
  END IF;
  v_r := public.attr_allowed_check('dec057b_own', v_allowed, '[]'::jsonb);
  IF COALESCE(v_r->>'reason','') = 'allowedTargetNotColinked' THEN
    RAISE EXCEPTION 'PROOF (v) FAILED: unlinked owner refused by allowed rule: %', v_r;
  END IF;
  RAISE NOTICE 'PROOF (v) OK: an owner linked nowhere is unconstrained';

  DELETE FROM public.category_attribute_links
   WHERE attribute_id IN (SELECT id FROM public.attributes WHERE attr_key LIKE 'dec057b_%');
  DELETE FROM public.attributes WHERE attr_key LIKE 'dec057b_%';
  DELETE FROM public.categories WHERE slug LIKE 'dec057b-scratch-%';
  IF EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'dec057b\_%')
     OR EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'dec057b-scratch-%') THEN
    RAISE EXCEPTION 'PROOF FAILED: scratch rows survived';
  END IF;
  RAISE NOTICE 'SCRATCH OK: rows removed';
END $p1$;

-- ACL read-backs: all three judges identical to today's grants.
DO $p2$
DECLARE
  v_h text := 'public.attr_allowed_check(text, jsonb, jsonb, jsonb)';
  v_p text := 'public.attr_import_plan(jsonb, jsonb, text)';
  v_d text := 'public.admin_upsert_attribute(uuid, text, text, text, jsonb, text, text, text, text, text, smallint, text, text, integer, text)';
BEGIN
  IF has_function_privilege('anon', v_h, 'EXECUTE')
     OR has_function_privilege('anon', v_p, 'EXECUTE')
     OR has_function_privilege('anon', v_d, 'EXECUTE') THEN
    RAISE EXCEPTION 'CLOSER FAILED: anon can execute a gated function';
  END IF;
  IF NOT has_function_privilege('authenticated', v_h, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_p, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_d, 'EXECUTE') THEN
    RAISE EXCEPTION 'CLOSER FAILED: authenticated lost EXECUTE';
  END IF;
  IF NOT has_function_privilege('service_role', v_h, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_p, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_d, 'EXECUTE') THEN
    RAISE EXCEPTION 'CLOSER FAILED: service_role lost EXECUTE';
  END IF;
  RAISE NOTICE 'ACL OK: rule, planner and door (anon=no, authenticated=yes, service_role=yes)';
END $p2$;

-- READ-BACK: every judge carries the flipped comparison, and nothing else in
-- the comparison sites changed (the universal form is gone everywhere).
DO $p3$
DECLARE
  v_h text := pg_get_functiondef('public.attr_allowed_check(text,jsonb,jsonb,jsonb)'::regprocedure);
  v_p text := pg_get_functiondef('public.attr_import_plan(jsonb,jsonb,text)'::regprocedure);
  v_d text := pg_get_functiondef('public.admin_upsert_attribute(uuid,text,text,text,jsonb,text,text,text,text,text,smallint,text,text,integer,text)'::regprocedure);
BEGIN
  IF v_h LIKE '%WHERE NOT (c = ANY (v_tcats))%'
     OR v_p LIKE '%WHERE NOT (c = ANY (v_tcats))%'
     OR v_d LIKE '%WHERE NOT (c = ANY (v_tcats))%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED: the universal co-linkage form survives';
  END IF;
  IF v_h NOT LIKE '%NOT EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE c = ANY (v_tcats))%'
     OR v_p NOT LIKE '%NOT EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE c = ANY (v_tcats))%'
     OR v_d NOT LIKE '%NOT EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE c = ANY (v_tcats))%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED: a judge is missing the intersection comparison';
  END IF;
  IF v_d NOT LIKE '%attr_allowed_check(p_attr_key, p_options, ''[]''::jsonb)%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED: the door no longer calls the rule with three arguments';
  END IF;
  RAISE NOTICE 'READ-BACK OK: all three judges intersect; the door still calls the rule live-only';
END $p3$;

INSERT INTO public.migration_marks(version) VALUES ('20260913120000') ON CONFLICT DO NOTHING;