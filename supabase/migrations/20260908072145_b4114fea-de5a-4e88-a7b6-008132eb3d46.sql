-- DEC-045b — IMPORTABLE depends_on.
-- Re-declares public.attr_import_plan, public.admin_commit_attribute_import and
-- public.admin_undo_attribute_import; every one of them restates its
-- REVOKE/GRANT closers in-file and the ACL is read back at the end (DEC-022-B).

CREATE OR REPLACE FUNCTION public.attr_import_plan(p_definitions jsonb, p_links jsonb, p_scope text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_types      text[] := ARRAY['text','number','single_select','multi_select','boolean','date','range'];
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
BEGIN
  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    SELECT id INTO v_scope_id FROM public.categories WHERE slug = btrim(p_scope);
    IF v_scope_id IS NULL THEN
      RAISE EXCEPTION 'unknown category scope';
    END IF;
    WITH RECURSIVE sub AS (
      SELECT v_scope_id AS id
      UNION
      SELECT p.child_id FROM public.category_tree_pointers p JOIN sub s ON s.id = p.parent_id
    )
    SELECT array_agg(id) INTO v_scope_ids FROM sub;
  END IF;

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
      IF EXISTS (SELECT 1 FROM public.category_attribute_links l WHERE l.attribute_id = v_att.id) THEN
        -- IE-4b — the refusal NAMES the categories that hold the attribute down.
        SELECT array_agg(c.slug ORDER BY c.slug) INTO v_cats
          FROM public.category_attribute_links l
          JOIN public.categories c ON c.id = l.category_id
         WHERE l.attribute_id = v_att.id;
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

    v_name := COALESCE(NULLIF(btrim(COALESCE(e->>'label_en','')), ''), v_key);

    -- IE-4b — label_am. The live value is read exactly as the EXPORT writes it
    -- (approved translation ▸ the legacy column), so a file taken from the
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
                       THEN v_label_am ELSE NULL END);
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
      v_change := 'add';
    ELSIF btrim(COALESCE(v_att.name_en,'')) IS DISTINCT FROM (v_entry->>'name_en')
       OR v_att.attr_type IS DISTINCT FROM (v_entry->>'attr_type')
       OR public.attr_option_norm(v_att.options) IS DISTINCT FROM public.attr_option_norm(v_options)
       OR COALESCE((v_entry->>'am_change')::boolean, false)
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

    IF v_origin <> '' AND v_origin <> v_cat.slug THEN
      IF v_action = 'unlink' OR v_link.id IS NOT NULL THEN
        v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','inheritedRow','detail',v_origin);
        CONTINUE;
      END IF;
      v_lnks := v_lnks || jsonb_build_object('row',v_row,'key',v_key,'slug',v_cat.slug,'action','upsert','change','none');
      CONTINUE;
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

CREATE OR REPLACE FUNCTION public.admin_commit_attribute_import(p_definitions jsonb, p_links jsonb, p_scope text DEFAULT NULL::text, p_digest text DEFAULT NULL::text)
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

  -- (2)+(3) CAPTURE then MUTATE, row by row. `change = none` writes nothing.
  -- DEC-045b — the planner ordered the definitions PARENT BEFORE DEPENDENT, so
  -- a dependency named in the same file resolves by the time it is written.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'definitions')
  LOOP
    CONTINUE WHEN v_item->>'change' = 'none';

    v_id := NULLIF(v_item->>'id','')::uuid;
    v_prev := NULL;
    IF v_id IS NOT NULL THEN
      SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                                'options',a.options,'help_text_en',a.help_text_en,
                                'depends_on',
                                COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''))
        INTO v_prev FROM public.attributes a WHERE a.id = v_id;
      -- IE-4b — CAPTURE the prior am state (none, or value + status + machine).
      v_am := NULL;
      SELECT jsonb_build_object('value', t.value, 'status', t.status, 'machine', t.machine)
        INTO v_am
        FROM public.entity_translations t
       WHERE t.entity_type = 'attribute' AND t.entity_id = v_id
         AND t.field = 'label' AND t.lang_code = 'am';
      v_prev := v_prev || jsonb_build_object('am_state', COALESCE(v_am, 'null'::jsonb));
    END IF;

    IF v_item->>'change' = 'delete' THEN
      -- The am row leaves with the attribute; the captured state restores it.
      DELETE FROM public.entity_translations
       WHERE entity_type = 'attribute' AND entity_id = v_id AND field = 'label';
      DELETE FROM public.attributes WHERE id = v_id;
      v_post := NULL;
    ELSE
      IF v_id IS NULL THEN
        INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
        VALUES (v_item->>'key', v_item->>'name_en', v_item->>'attr_type',
                CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END)
        RETURNING id INTO v_id;
      ELSE
        UPDATE public.attributes
           SET name_en = v_item->>'name_en',
               attr_type = v_item->>'attr_type',
               options = CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END,
               updated_at = now()
         WHERE id = v_id;
      END IF;

      -- DEC-045b — the dependency is applied only when the FILE carried the
      -- column: a file without it leaves the live dependency untouched.
      IF COALESCE((v_item->>'depends_col')::boolean, false) THEN
        SELECT p.id INTO v_dep FROM public.attributes p
         WHERE p.attr_key = NULLIF(btrim(COALESCE(v_item->>'depends_on','')), '');
        UPDATE public.attributes SET depends_on = v_dep, updated_at = now() WHERE id = v_id;
      END IF;

      -- IE-4b — the planner only ever emits a NON-EMPTY label_am, and only when
      -- it differs from the live value: an identical cell writes nothing, and
      -- an empty cell never reaches here at all (silence, not a deletion).
      IF btrim(COALESCE(v_item->>'label_am','')) <> '' THEN
        PERFORM public.admin_save_entity_translation('attribute', v_id, 'label', 'am',
                                                     btrim(v_item->>'label_am'));
      END IF;

      SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                                'options',a.options,'help_text_en',a.help_text_en,
                                'depends_on',
                                COALESCE((SELECT p.attr_key FROM public.attributes p WHERE p.id = a.depends_on), ''))
        INTO v_post FROM public.attributes a WHERE a.id = v_id;
    END IF;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'definition', v_item->>'action', v_item->>'key', v_prev, v_post, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'links')
  LOOP
    CONTINUE WHEN v_item->>'change' = 'none';

    v_prev := NULL;
    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank)
      INTO v_prev FROM public.category_attribute_links l
     WHERE l.id = NULLIF(v_item->>'link_id','')::uuid;

    IF v_item->>'change' = 'unlink' THEN
      DELETE FROM public.category_attribute_links WHERE id = (v_item->>'link_id')::uuid;
      v_post := NULL;
    ELSE
      v_id := NULLIF(v_item->>'attribute_id','')::uuid;
      IF v_id IS NULL THEN
        SELECT id INTO v_id FROM public.attributes WHERE attr_key = v_item->>'key';
      END IF;

      IF v_item->>'change' = 'add' THEN
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
        UPDATE public.category_attribute_links
           SET is_required = (v_item->>'is_required')::boolean,
               is_filterable = (v_item->>'is_filterable')::boolean,
               card_rank = NULLIF(v_item->>'card_rank','')::int,
               updated_at = now()
         WHERE id = v_id;
      END IF;

      SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                                'is_required',l.is_required,'is_filterable',l.is_filterable,
                                'display_order',l.display_order,'card_rank',l.card_rank)
        INTO v_post FROM public.category_attribute_links l WHERE l.id = v_id;
    END IF;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'link', v_item->>'action',
            (v_item->>'slug') || '|' || (v_item->>'key'), v_prev, v_post, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  PERFORM public.log_audit('attribute.import', 'attributes', v_batch::text,
    jsonb_build_object('batch_id', v_batch, 'scope', p_scope, 'digest', p_digest,
                       'applied', v_applied, 'counts', v_plan->'counts'));

  RETURN jsonb_build_object('batch_id', v_batch, 'applied', v_applied,
                            'counts', v_plan->'counts', 'refusals', v_plan->'refusals');
END $function$;

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
  -- Break the edges BETWEEN this batch's own creations first, so the deletions
  -- below are order-free; edges from rows the batch did not create are left
  -- alone and become the `conflicted` verdict.
  UPDATE public.attributes a
     SET depends_on = NULL
   WHERE a.depends_on IS NOT NULL
     AND a.attr_key IN (SELECT r.entity_key FROM public.attribute_import_revisions r
                         WHERE r.batch_id = p_batch AND r.kind = 'definition'
                           AND r.prev IS NULL AND r.undone_at IS NULL);

  FOR v_rev IN
    SELECT * FROM public.attribute_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL
     ORDER BY (kind = 'definition') ASC, created_at DESC
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
        -- A definition another row now depends on is held down by it.
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
                 updated_at = now()
           WHERE attr_key = v_rev.entity_key;
        ELSE
          INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en, depends_on)
          VALUES (v_rev.prev->>'attr_key', v_rev.prev->>'name_en', v_rev.prev->>'attr_type',
                  CASE WHEN v_rev.prev->'options' = 'null'::jsonb THEN NULL ELSE v_rev.prev->'options' END,
                  v_rev.prev->>'help_text_en',
                  (SELECT p.id FROM public.attributes p
                    WHERE p.attr_key = NULLIF(btrim(COALESCE(v_rev.prev->>'depends_on','')), '')));
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
          (category_id, attribute_id, is_required, is_filterable, display_order, card_rank)
        VALUES (v_cat, v_attr,
                (v_rev.prev->>'is_required')::boolean,
                (v_rev.prev->>'is_filterable')::boolean,
                COALESCE((v_rev.prev->>'display_order')::int, 0),
                NULLIF(v_rev.prev->>'card_rank','')::int)
        ON CONFLICT (category_id, attribute_id) DO UPDATE
          SET is_required = EXCLUDED.is_required,
              is_filterable = EXCLUDED.is_filterable,
              display_order = EXCLUDED.display_order,
              card_rank = EXCLUDED.card_rank,
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

-- ---------------------------------------------------------------- CLOSERS
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

REVOKE ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO service_role;

REVOKE ALL ON FUNCTION public.admin_undo_attribute_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_attribute_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_attribute_import(uuid) TO service_role;

-- ACL READ-BACK: the closers are proven in the same file that re-declared them.
DO $proof$
DECLARE
  v_sig text;
BEGIN
  FOREACH v_sig IN ARRAY ARRAY[
    'public.attr_import_plan(jsonb, jsonb, text)',
    'public.admin_commit_attribute_import(jsonb, jsonb, text, text)',
    'public.admin_undo_attribute_import(uuid)'
  ]
  LOOP
    IF NOT has_function_privilege('authenticated', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'DEC-045b ACL proof: authenticated cannot execute %', v_sig;
    END IF;
    IF NOT has_function_privilege('service_role', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'DEC-045b ACL proof: service_role cannot execute %', v_sig;
    END IF;
    IF has_function_privilege('anon', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'DEC-045b ACL proof: anon can execute %', v_sig;
    END IF;
    RAISE NOTICE 'DEC-045b ACL ok: %', v_sig;
  END LOOP;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20260908130000')
ON CONFLICT (version) DO NOTHING;