-- DEC-050 L2a — EFFECTIVE CARD-RANK UNIQUENESS (Tier A).
--
-- The DB's UNIQUE (category_id, card_rank) guards DIRECT links only. An
-- INHERITED card (primary lineage, INH-1) occupies its rank in every
-- descendant, so a child could take the same rank through the link manager or
-- the import and two rank-2 tiles could coexist. Both writers now refuse a
-- direct rank equal to an inherited rank in the same category, naming both
-- origins (reason `rankInherited`).
--
-- INC-183 law: whole re-declarations, closers in-file, definition + ACL
-- read-backs. Nothing in L1's rules changes.

/* ============ 1. THE INHERITED-RANK READ (primary lineage only) =========== */

-- Every card rank a category INHERITS: own links excluded (depth > 0), the
-- nearest link per attribute wins, the plan overlays the live links so the
-- planner judges the POST-PLAN world. '[]' asks the LIVE question — that is
-- what the door does.
CREATE OR REPLACE FUNCTION public.attr_inherited_ranks(p_cat uuid, p_links jsonb)
RETURNS TABLE(card_rank int, origin_slug text, attr_key text)
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
  WITH RECURSIVE anc AS (
    SELECT p_cat AS src_id, 0 AS depth
    UNION ALL
    SELECT public.cat_primary_parent(a.src_id), a.depth + 1
      FROM anc a
     WHERE a.depth < 10
       AND public.cat_primary_parent(a.src_id) IS NOT NULL
  ),
  plan AS (
    SELECT NULLIF(x.value->>'category_id','')::uuid AS category_id,
           x.value->>'key'                          AS attr_key,
           x.value->>'change'                       AS change,
           NULLIF(x.value->>'card_rank','')::int    AS card_rank
      FROM jsonb_array_elements(COALESCE(p_links, '[]'::jsonb)) x
     WHERE NULLIF(x.value->>'category_id','') IS NOT NULL
       AND COALESCE(x.value->>'key','') <> ''
  ),
  live AS (
    SELECT a.src_id, a.depth, c.slug AS origin_slug, at.attr_key,
           l.card_rank::int AS card_rank, l.id AS lid
      FROM anc a
      JOIN public.categories c ON c.id = a.src_id
      JOIN public.category_attribute_links l ON l.category_id = a.src_id
      JOIN public.attributes at ON at.id = l.attribute_id
     WHERE a.depth > 0
  ),
  merged AS (
    SELECT live.depth, live.origin_slug, live.attr_key, live.lid,
           CASE WHEN EXISTS (SELECT 1 FROM plan p
                              WHERE p.category_id = live.src_id
                                AND p.attr_key = live.attr_key
                                AND p.change IN ('add','change'))
                THEN (SELECT p.card_rank FROM plan p
                       WHERE p.category_id = live.src_id
                         AND p.attr_key = live.attr_key
                         AND p.change IN ('add','change')
                       LIMIT 1)
                ELSE live.card_rank END AS card_rank,
           EXISTS (SELECT 1 FROM plan p
                    WHERE p.category_id = live.src_id
                      AND p.attr_key = live.attr_key
                      AND p.change = 'unlink') AS gone
      FROM live
    UNION ALL
    SELECT a.depth, c.slug, p.attr_key, NULL::uuid, p.card_rank, false
      FROM plan p
      JOIN anc a ON a.src_id = p.category_id AND a.depth > 0
      JOIN public.categories c ON c.id = a.src_id
     WHERE p.change = 'add'
  ),
  eff AS (
    SELECT DISTINCT ON (m.attr_key) m.attr_key, m.card_rank, m.origin_slug
      FROM merged m
     WHERE NOT m.gone
     ORDER BY m.attr_key, m.depth ASC, m.lid
  )
  SELECT eff.card_rank, eff.origin_slug, eff.attr_key
    FROM eff
   WHERE eff.card_rank IS NOT NULL;
$function$;

REVOKE ALL ON FUNCTION public.attr_inherited_ranks(uuid, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_inherited_ranks(uuid, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_inherited_ranks(uuid, jsonb) TO service_role;

-- THE RULE, in one place: '<origin category slug>|<origin attribute key>' when
-- the requested rank is already occupied by an INHERITED card of a DIFFERENT
-- attribute; NULL otherwise. An attribute overriding its OWN inherited link is
-- not a collision.
CREATE OR REPLACE FUNCTION public.attr_rank_conflict(p_cat uuid, p_rank int, p_attr_key text, p_links jsonb)
RETURNS text
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
  SELECT r.origin_slug || '|' || r.attr_key
    FROM public.attr_inherited_ranks(p_cat, p_links) r
   WHERE p_rank IS NOT NULL
     AND p_cat IS NOT NULL
     AND r.card_rank = p_rank
     AND r.attr_key IS DISTINCT FROM COALESCE(p_attr_key, '')
   ORDER BY r.origin_slug, r.attr_key
   LIMIT 1;
$function$;

REVOKE ALL ON FUNCTION public.attr_rank_conflict(uuid, int, text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_rank_conflict(uuid, int, text, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_rank_conflict(uuid, int, text, jsonb) TO service_role;

/* ============ 2. THE IMPORT PLANNER (whole re-declaration, INC-183) ======= */

-- The whole L1 body (20260911193208), changed ONLY by the DEC-050 L2a pass
-- appended after the links loop. Every L1 rule — the strict option shape,
-- the v2 cells, bounds co-linkage, aliases, presets, the retired `range` —
-- stands verbatim.

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
  -- in EVERY category where the owner is linked AFTER this plan is applied.
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
        IF EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE NOT (c = ANY (v_tcats))) THEN
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

/* ============ 3. THE CARD DOOR (whole re-declaration, INC-183) ============ */

-- The whole body from 20260906035541, changed ONLY by the L2a rule. Gate,
-- step-up and audit are byte-identical in behaviour.
CREATE OR REPLACE FUNCTION public.admin_set_card_attributes(
  p_category_id uuid, p_ordered_attribute_ids uuid[]
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ids uuid[];
  v_old jsonb;
  v_i int;
  v_akey text;
  v_conflict text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  v_ids := COALESCE(p_ordered_attribute_ids, '{}');

  IF array_length(v_ids, 1) > 3 THEN
    RAISE EXCEPTION 'admin.attributes.error.cardLimit' USING ERRCODE = 'P0010';
  END IF;

  IF EXISTS (
    SELECT 1 FROM unnest(v_ids) AS aid
     WHERE NOT EXISTS (SELECT 1 FROM public.category_attribute_links l
                        WHERE l.category_id = p_category_id AND l.attribute_id = aid)
  ) THEN
    RAISE EXCEPTION 'admin.attributes.error.linkNotFound' USING ERRCODE = 'P0010';
  END IF;

  -- DEC-050 L2a — a requested rank that an INHERITED card already occupies is
  -- refused, naming both origins.
  FOR v_i IN 1 .. COALESCE(array_length(v_ids, 1), 0) LOOP
    SELECT a.attr_key INTO v_akey FROM public.attributes a WHERE a.id = v_ids[v_i];
    v_conflict := public.attr_rank_conflict(p_category_id, v_i, v_akey, '[]'::jsonb);
    IF v_conflict IS NOT NULL THEN
      RAISE EXCEPTION 'admin.attributes.error.rankInherited'
        USING ERRCODE = 'P0010',
              DETAIL = format('category=%s rank=%s attribute=%s inherited_from=%s inherited_attribute=%s',
                              p_category_id::text, v_i, COALESCE(v_akey, ''),
                              split_part(v_conflict, '|', 1), split_part(v_conflict, '|', 2));
    END IF;
  END LOOP;

  SELECT COALESCE(jsonb_agg(jsonb_build_object('attribute_id', l.attribute_id, 'card_rank', l.card_rank)
                            ORDER BY l.card_rank), '[]'::jsonb)
    INTO v_old
    FROM public.category_attribute_links l
   WHERE l.category_id = p_category_id AND l.card_rank IS NOT NULL;

  UPDATE public.category_attribute_links
     SET card_rank = NULL, updated_at = now()
   WHERE category_id = p_category_id AND card_rank IS NOT NULL;

  UPDATE public.category_attribute_links l
     SET card_rank = u.ord, updated_at = now()
    FROM unnest(v_ids) WITH ORDINALITY AS u(aid, ord)
   WHERE l.category_id = p_category_id AND l.attribute_id = u.aid;

  PERFORM public.log_audit('attribute.set_card', 'categories', p_category_id::text,
    jsonb_build_object('old', v_old, 'new', to_jsonb(v_ids)));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_card_attributes(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_card_attributes(uuid, uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_card_attributes(uuid, uuid[]) TO service_role;

/* ======================== 4. PROOFS (in-file) ============================= */

-- PROOF 1 — the rule itself, on a scratch root + child: an inherited rank is
-- seen, a direct rank equal to it collides, a different rank does not, and the
-- attribute's OWN inherited link is not a collision. Scratch rows removed.
DO $proof$
DECLARE
  v_root uuid; v_child uuid; v_a1 uuid; v_a2 uuid;
  v_conf text; v_n int;
BEGIN
  -- cat_primary_parent only follows a pointer to an ACTIVE parent, so the
  -- scratch lineage must be active; both rows are deleted below.
  INSERT INTO public.categories (name_en, slug, is_active)
  VALUES ('e2e-l2a root', 'e2e-l2a-root', true) RETURNING id INTO v_root;
  INSERT INTO public.categories (name_en, slug, is_active)
  VALUES ('e2e-l2a child', 'e2e-l2a-child', true) RETURNING id INTO v_child;
  INSERT INTO public.category_tree_pointers (parent_id, child_id) VALUES (v_root, v_child);

  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('e2e-l2a-inherited', 'Inherited', 'text') RETURNING id INTO v_a1;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('e2e-l2a-direct', 'Direct', 'text') RETURNING id INTO v_a2;

  INSERT INTO public.category_attribute_links (category_id, attribute_id, card_rank)
  VALUES (v_root, v_a1, 2);
  INSERT INTO public.category_attribute_links (category_id, attribute_id)
  VALUES (v_child, v_a2);

  SELECT count(*) INTO v_n FROM public.attr_inherited_ranks(v_child, '[]'::jsonb) r
   WHERE r.card_rank = 2 AND r.attr_key = 'e2e-l2a-inherited';
  IF v_n <> 1 THEN
    RAISE EXCEPTION 'PROOF 1 FAILED: the child does not see the inherited rank 2 (n=%)', v_n;
  END IF;

  v_conf := public.attr_rank_conflict(v_child, 2, 'e2e-l2a-direct', '[]'::jsonb);
  IF v_conf IS DISTINCT FROM 'e2e-l2a-root|e2e-l2a-inherited' THEN
    RAISE EXCEPTION 'PROOF 1 FAILED: rank 2 did not collide, or named the wrong origins (%)', v_conf;
  END IF;

  IF public.attr_rank_conflict(v_child, 3, 'e2e-l2a-direct', '[]'::jsonb) IS NOT NULL THEN
    RAISE EXCEPTION 'PROOF 1 FAILED: rank 3 was refused';
  END IF;

  IF public.attr_rank_conflict(v_child, 2, 'e2e-l2a-inherited', '[]'::jsonb) IS NOT NULL THEN
    RAISE EXCEPTION 'PROOF 1 FAILED: an attribute overriding its own inherited link was refused';
  END IF;

  ---------------------------------------------------- (i) the planner refuses
  DECLARE v_plan jsonb;
  BEGIN
    v_plan := public.attr_import_plan(
      '[]'::jsonb,
      '[{"row":2,"category_slug":"e2e-l2a-child","attribute_key":"e2e-l2a-direct","card_rank":"2"}]'::jsonb,
      NULL);
    IF NOT (v_plan->'refusals') @> '[{"reason":"rankInherited","origin_category":"e2e-l2a-root","origin_key":"e2e-l2a-inherited","rank":2}]'::jsonb THEN
      RAISE EXCEPTION 'PROOF 1 FAILED: the planner tolerated a direct rank equal to an inherited rank (%)',
        v_plan->'refusals';
    END IF;
    IF (v_plan->'links') @> '[{"key":"e2e-l2a-direct","change":"change"}]'::jsonb THEN
      RAISE EXCEPTION 'PROOF 1 FAILED: the refused row survived into the plan (%)', v_plan->'links';
    END IF;

    ------------------------------------------ (iii) a different rank is planned
    v_plan := public.attr_import_plan(
      '[]'::jsonb,
      '[{"row":2,"category_slug":"e2e-l2a-child","attribute_key":"e2e-l2a-direct","card_rank":"3"}]'::jsonb,
      NULL);
    IF jsonb_array_length(v_plan->'refusals') <> 0 THEN
      RAISE EXCEPTION 'PROOF 1 FAILED: rank 3 was refused by the planner (%)', v_plan->'refusals';
    END IF;
    IF NOT (v_plan->'links') @> '[{"key":"e2e-l2a-direct","card_rank":3}]'::jsonb THEN
      RAISE EXCEPTION 'PROOF 1 FAILED: rank 3 did not survive into the plan (%)', v_plan->'links';
    END IF;
  END;

  -- scratch rows removed.
  DELETE FROM public.category_attribute_links WHERE category_id IN (v_root, v_child);
  DELETE FROM public.category_tree_pointers WHERE child_id = v_child;
  DELETE FROM public.categories WHERE id IN (v_root, v_child);
  DELETE FROM public.attributes WHERE id IN (v_a1, v_a2);

  IF EXISTS (SELECT 1 FROM public.categories WHERE slug IN ('e2e-l2a-root','e2e-l2a-child'))
     OR EXISTS (SELECT 1 FROM public.attributes WHERE attr_key IN ('e2e-l2a-inherited','e2e-l2a-direct')) THEN
    RAISE EXCEPTION 'PROOF 1 FAILED: scratch rows survived';
  END IF;

  RAISE NOTICE 'DEC-050 L2a PROOF 1 OK: inherited ranks are seen, collisions refused with both origins named, scratch removed';
END $proof$;

-- PROOF 2 — (ii) the DOOR carries the same rule. The door's own gate refuses
-- an unauthenticated caller (auth.uid() is NULL in a migration), so the rule
-- is proven by DEFINITION read-back: the door calls attr_rank_conflict and
-- raises the rankInherited key, and its gate and audit are still in place.
DO $proof$
DECLARE v_src text;
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO v_src
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_set_card_attributes';
  IF v_src IS NULL THEN
    RAISE EXCEPTION 'PROOF 2 FAILED: the door is missing';
  END IF;
  IF position('attr_rank_conflict' IN v_src) = 0
     OR position('admin.attributes.error.rankInherited' IN v_src) = 0 THEN
    RAISE EXCEPTION 'PROOF 2 FAILED: the door does not carry the L2a rule';
  END IF;
  IF position('has_permission(auth.uid(), ''categories'', ''update'')' IN v_src) = 0
     OR position('require_step_up_if_needed' IN v_src) = 0
     OR position('attribute.set_card' IN v_src) = 0
     OR position('admin.attributes.error.cardLimit' IN v_src) = 0
     OR position('admin.attributes.error.linkNotFound' IN v_src) = 0 THEN
    RAISE EXCEPTION 'PROOF 2 FAILED: the door lost its gate, step-up, audit or an earlier refusal';
  END IF;
  RAISE NOTICE 'DEC-050 L2a PROOF 2 OK: the door refuses an inherited rank; gate, step-up and audit unchanged';
END $proof$;

-- PROOF 3 — the L1 rules are still present VERBATIM in the planner body.
DO $proof$
DECLARE v_src text; v_needle text;
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO v_src
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'attr_import_plan';
  FOREACH v_needle IN ARRAY ARRAY[
    'attr_option_shape',            -- strict option keys, active, aliases, bounds shape
    'attr_cell_check',              -- unit/bounds/decimals/format/preset/max_length/help caps
    'boundsTargetNotColinked',      -- bounds co-linkage over the post-plan link set
    'boundsTargetNotNumber',
    'attr_postplan_cats',
    'attr_cats_expand',
    'cat_primary_parent(c.id)',     -- INH-1 primary-lineage scope walk
    'attr_option_norm_v2',
    'keyRename', 'blastRadius', 'hasDependents', 'dependsCycle', 'badParent',
    'inheritedRow', 'badCardRank',
    'attr_rank_conflict', 'rankInherited'
  ]
  LOOP
    IF position(v_needle IN v_src) = 0 THEN
      RAISE EXCEPTION 'PROOF 3 FAILED: the planner lost %', v_needle;
    END IF;
  END LOOP;
  IF position('''range''' IN v_src) <> 0 THEN
    RAISE EXCEPTION 'PROOF 3 FAILED: the range type came back';
  END IF;
  RAISE NOTICE 'DEC-050 L2a PROOF 3 OK: every L1 rule stands and the L2a rule is present';
END $proof$;

-- PROOF 4 — ACL read-backs (planner: authenticated EXECUTE, anon none; door:
-- authenticated EXECUTE, anon none; helpers likewise; service_role ALL).
DO $proof$
DECLARE v_f text;
BEGIN
  FOREACH v_f IN ARRAY ARRAY[
    'public.attr_import_plan(jsonb,jsonb,text)',
    'public.admin_set_card_attributes(uuid,uuid[])',
    'public.attr_inherited_ranks(uuid,jsonb)',
    'public.attr_rank_conflict(uuid,integer,text,jsonb)'
  ]
  LOOP
    IF has_function_privilege('anon', v_f, 'EXECUTE') THEN
      RAISE EXCEPTION 'PROOF 4 FAILED: anon may execute %', v_f;
    END IF;
    IF NOT has_function_privilege('authenticated', v_f, 'EXECUTE') THEN
      RAISE EXCEPTION 'PROOF 4 FAILED: authenticated may not execute %', v_f;
    END IF;
    IF NOT has_function_privilege('service_role', v_f, 'EXECUTE') THEN
      RAISE EXCEPTION 'PROOF 4 FAILED: service_role may not execute %', v_f;
    END IF;
  END LOOP;
  RAISE NOTICE 'DEC-050 L2a PROOF 4 OK: ACLs read back as declared';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260911223000') ON CONFLICT DO NOTHING;