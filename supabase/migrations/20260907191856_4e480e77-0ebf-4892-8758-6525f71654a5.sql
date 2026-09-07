-- IE-2b — IDEMPOTENT ROUND-TRIP (INC-177)
-- Corrective for 20260907185010 (IE-2). Re-declares public.attr_import_plan
-- with SEMANTIC option comparison and JSON-aware option parsing, and proves
-- idempotency in-file with a DO block that previews the whole library against
-- its own export shape. DEFINER/REVOKE pairing (DEC-022-B) is restated here.

-- ============================================================
-- 1. NORMALISERS (SECURITY INVOKER; pure)
-- ============================================================
-- Canonical option shape: an ordered list of
--   {value, label_en, label_am, parent}
-- with null == absent == '' and every field trimmed. A bare string option is
-- {value: s, label_en: '', label_am: '', parent: ''}. A {"depends_on": ...}
-- meta entry carries no `value` and is excluded from the comparison.
CREATE OR REPLACE FUNCTION public.attr_option_norm(p_options jsonb)
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
             ) AS norm
        FROM jsonb_array_elements(
               CASE WHEN jsonb_typeof(p_options) = 'array'
                    THEN p_options ELSE '[]'::jsonb END
             ) WITH ORDINALITY AS x(value, ord)
       WHERE NOT (jsonb_typeof(x.value) = 'object' AND NOT (x.value ? 'value'))
    ) o;
$function$;

-- Safe cast: NULL when the text is not JSON (the caller refuses the row).
CREATE OR REPLACE FUNCTION public.attr_json_or_null(p_text text)
RETURNS jsonb
LANGUAGE plpgsql
IMMUTABLE
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN p_text::jsonb;
EXCEPTION WHEN others THEN
  RETURN NULL;
END $function$;

-- ============================================================
-- 2. THE PLANNER — re-declared (semantic comparison)
-- ============================================================
CREATE OR REPLACE FUNCTION public.attr_import_plan(
  p_definitions jsonb, p_links jsonb, p_scope text
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_types      text[] := ARRAY['text','number','single_select','multi_select','boolean','date','range'];
  v_scope_id   uuid;
  v_scope_ids  uuid[] := NULL;
  v_defs       jsonb := '[]'::jsonb;
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
        v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','blastRadius');
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

    -- OPTIONS. Three legal spellings, all folded to one list:
    --   a) a JSON array: [{"value":…}, …]
    --   b) the export's pipe list of JSON objects: {"value":…}|{"value":…}
    --   c) the export's pipe list of plain values: a|b|c
    -- (b) is what IE-1 emits for today's library, and reading it back as
    -- plain strings is exactly what made a round trip look "changed"
    -- (INC-177).
    v_raw := COALESCE(e->>'options', '');
    v_options := NULL;
    v_depends := NULL;
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

    IF v_options IS NOT NULL THEN
      FOR v_entry IN SELECT value FROM jsonb_array_elements(v_options) LOOP
        IF jsonb_typeof(v_entry) = 'object' AND v_entry ? 'depends_on' THEN
          v_depends := v_entry->>'depends_on';
        ELSIF jsonb_typeof(v_entry) = 'object' AND NOT (v_entry ? 'value') THEN
          v_bad := true;
        ELSIF jsonb_typeof(v_entry) NOT IN ('object','string') THEN
          v_bad := true;
        END IF;
      END LOOP;
    END IF;
    IF v_bad THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','malformedOptions');
      CONTINUE;
    END IF;

    -- DEC-045 — every `parent` must name a value of the depended-on definition.
    v_parent_ok := true;
    IF v_options IS NOT NULL AND EXISTS (
      SELECT 1 FROM jsonb_array_elements(v_options) x
       WHERE jsonb_typeof(x.value) = 'object' AND x.value ? 'parent'
         AND btrim(COALESCE(x.value->>'parent','')) <> ''
    ) THEN
      IF v_depends IS NULL OR btrim(v_depends) = '' THEN
        v_parent_ok := false;
      ELSE
        SELECT array_agg(COALESCE(x.value->>'value', trim(both '"' from x.value::text)))
          INTO v_dep_vals
          FROM public.attributes a,
               LATERAL jsonb_array_elements(COALESCE(a.options, '[]'::jsonb)) x
         WHERE a.attr_key = btrim(v_depends)
           AND NOT (jsonb_typeof(x.value) = 'object' AND NOT (x.value ? 'value'));
        IF v_dep_vals IS NULL THEN
          v_parent_ok := false;
        ELSE
          FOR v_entry IN SELECT value FROM jsonb_array_elements(v_options) LOOP
            IF jsonb_typeof(v_entry) = 'object'
               AND btrim(COALESCE(v_entry->>'parent','')) <> '' THEN
              v_parent := btrim(v_entry->>'parent');
              IF NOT (v_parent = ANY (v_dep_vals)) THEN
                v_parent_ok := false;
              END IF;
            END IF;
          END LOOP;
        END IF;
      END IF;
    END IF;
    IF NOT v_parent_ok THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','badParent');
      CONTINUE;
    END IF;

    -- THE COMPARISON (IE-2b). label_en trimmed and defaulted exactly as the
    -- write below defaults it; options compared through attr_option_norm, so
    -- key order inside an option object, an explicit null and an absent field
    -- are all the same row.
    v_name := COALESCE(NULLIF(btrim(COALESCE(e->>'label_en','')), ''), v_key);

    IF v_att.id IS NULL THEN
      v_change := 'add';
      v_new_keys := v_new_keys || v_key;
    ELSIF btrim(COALESCE(v_att.name_en,'')) IS DISTINCT FROM v_name
       OR v_att.attr_type IS DISTINCT FROM v_type
       OR public.attr_option_norm(v_att.options) IS DISTINCT FROM public.attr_option_norm(v_options) THEN
      v_change := 'change';
    ELSE
      v_change := 'none';
    END IF;

    v_defs := v_defs || jsonb_build_object(
      'row', v_row, 'key', v_key, 'action', 'upsert', 'change', v_change,
      'id', v_att.id, 'name_en', v_name,
      'attr_type', v_type, 'options', v_options);
  END LOOP;

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

-- DEC-022-B — the REVOKEs live in the same file as the DEFINER declaration.
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.attr_option_norm(jsonb) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.attr_json_or_null(text) FROM PUBLIC, anon;

-- ============================================================
-- 3. IDEMPOTENCY PROOF — the library against its own export shape
-- ============================================================
DO $$
DECLARE
  v_defs    jsonb;
  v_lnks    jsonb;
  v_plan    jsonb;
  v_adds    int;
  v_changes int;
  v_refs    int;
BEGIN
  SELECT COALESCE(jsonb_agg(d.obj), '[]'::jsonb) INTO v_defs
    FROM (
      SELECT jsonb_build_object(
               'row', (row_number() OVER (ORDER BY a.attr_key))::text,
               'attribute_key', a.attr_key,
               'label_en', a.name_en,
               'type', a.attr_type,
               'options', COALESCE(
                 (SELECT string_agg(o.x, '|' ORDER BY o.ord)
                    FROM jsonb_array_elements_text(
                           CASE WHEN jsonb_typeof(a.options) = 'array'
                                THEN a.options ELSE '[]'::jsonb END
                         ) WITH ORDINALITY AS o(x, ord)),
                 '')
             ) AS obj
        FROM public.attributes a
    ) d;

  SELECT COALESCE(jsonb_agg(l.obj), '[]'::jsonb) INTO v_lnks
    FROM (
      SELECT jsonb_build_object(
               'row', (row_number() OVER (ORDER BY c.slug, a.attr_key))::text,
               'category_slug', c.slug,
               'attribute_key', a.attr_key,
               'is_required', CASE WHEN k.is_required THEN 'true' ELSE 'false' END,
               'is_filterable', CASE WHEN k.is_filterable THEN 'true' ELSE 'false' END,
               'card_rank', COALESCE(k.card_rank::text, ''),
               'origin', c.slug
             ) AS obj
        FROM public.category_attribute_links k
        JOIN public.categories c ON c.id = k.category_id
        JOIN public.attributes a ON a.id = k.attribute_id
    ) l;

  v_plan := public.attr_import_plan(v_defs, v_lnks, NULL);
  v_adds    := (v_plan->'counts'->>'adds')::int;
  v_changes := (v_plan->'counts'->>'changes')::int;
  v_refs    := (v_plan->'counts'->>'refusals')::int;

  IF v_adds <> 0 OR v_changes <> 0 OR v_refs <> 0 THEN
    RAISE EXCEPTION
      'IE-2b idempotency proof failed: adds=% changes=% refusals=% first_refusal=%',
      v_adds, v_changes, v_refs, v_plan->'refusals'->0;
  END IF;

  RAISE NOTICE 'IE-2b idempotency proof: adds=0 changes=0 refusals=0 unchanged=%',
    v_plan->'counts'->>'unchanged';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260907210000') ON CONFLICT DO NOTHING;