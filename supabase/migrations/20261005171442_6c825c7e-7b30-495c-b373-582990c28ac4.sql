-- M8b — bundle 5 Part B (INC-327, INC-438) and the unit_am cell of Part C (C4).
-- e2e-areas: admin-attributes
-- 1. attributes.unit_am — the Amharic twin of unit (empty = English prints).
-- 2. attr_cell_check gains p_unit_am text DEFAULT NULL as its LAST argument
--    (argument-list change: the ten-argument signature is dropped; ten-argument
--    callers resolve to the new one through the default). unit_am obeys unit's law.
-- 3. attr_import_plan redeclared WHOLE from the live definition (INC-183):
--    B2 rankClash (end-state direct card ranks), B3 optionInUse (a removed or
--    deactivated option value still named by a catalogue cell), C4 unit_am cell.
--    The commit rebuilds this plan and skips refused rows; it is not redeclared.
ALTER TABLE public.attributes ADD COLUMN unit_am text;

DROP FUNCTION public.attr_cell_check(text, text, text, text, integer, text, text, integer, text, text);
CREATE FUNCTION public.attr_cell_check(
  p_type text, p_unit text, p_min text, p_max text, p_decimals integer,
  p_format text, p_preset text, p_max_length integer, p_help_en text, p_help_am text,
  p_unit_am text DEFAULT NULL)
RETURNS text
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $m8b$
DECLARE
  v_tok text;
BEGIN
  IF p_unit IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'number' THEN RETURN 'unit|onlyNumber|' || p_unit; END IF;
    IF char_length(p_unit) < 1 OR char_length(p_unit) > 16 THEN RETURN 'unit|badLength|' || p_unit; END IF;
  END IF;
  -- M8b / C4 — unit_am obeys the law of unit: number only, the same ceiling.
  IF p_unit_am IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'number' THEN RETURN 'unit_am|onlyNumber|' || p_unit_am; END IF;
    IF char_length(p_unit_am) < 1 OR char_length(p_unit_am) > 16 THEN RETURN 'unit_am|badLength|' || p_unit_am; END IF;
  END IF;

  IF p_min IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'number' THEN RETURN 'min_bound|onlyNumber|' || p_min; END IF;
    IF NOT public.attr_bound_ok(p_min) THEN RETURN 'min_bound|badBound|' || p_min; END IF;
  END IF;
  IF p_max IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'number' THEN RETURN 'max_bound|onlyNumber|' || p_max; END IF;
    IF NOT public.attr_bound_ok(p_max) THEN RETURN 'max_bound|badBound|' || p_max; END IF;
  END IF;
  IF p_min ~ '^-?[0-9]+(\.[0-9]+)?$' AND p_max ~ '^-?[0-9]+(\.[0-9]+)?$'
     AND p_min::numeric > p_max::numeric THEN
    RETURN 'min_bound|minAboveMax|' || p_min || '>' || p_max;
  END IF;

  IF p_decimals IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'number' THEN RETURN 'decimals|onlyNumber|' || p_decimals::text; END IF;
    IF p_decimals < 0 OR p_decimals > 3 THEN RETURN 'decimals|outOfRange|' || p_decimals::text; END IF;
    IF p_format = 'year' AND p_decimals <> 0 THEN RETURN 'decimals|yearForcesZero|' || p_decimals::text; END IF;
  END IF;

  IF p_format IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'number' THEN RETURN 'format|onlyNumber|' || p_format; END IF;
    IF p_format NOT IN ('plain', 'year') THEN RETURN 'format|unknown|' || p_format; END IF;
  END IF;

  IF p_preset IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'text' THEN RETURN 'preset|onlyText|' || p_preset; END IF;
    IF NOT public.attr_preset_ok(p_preset) THEN RETURN 'preset|notAllowed|' || p_preset; END IF;
  END IF;

  IF p_max_length IS NOT NULL THEN
    IF p_type IS DISTINCT FROM 'text' THEN RETURN 'max_length|onlyText|' || p_max_length::text; END IF;
    IF p_max_length < 1 OR p_max_length > 1000 THEN RETURN 'max_length|outOfRange|' || p_max_length::text; END IF;
  END IF;

  IF char_length(COALESCE(p_help_en, '')) > 240 THEN
    RETURN 'help_text_en|tooLong|' || char_length(p_help_en)::text;
  END IF;
  IF char_length(COALESCE(p_help_am, '')) > 240 THEN
    RETURN 'help_text_am|tooLong|' || char_length(p_help_am)::text;
  END IF;

  -- M6 / DEC-095 — a {category:<slug>} token names an active category that
  -- accepts ads; anything else is refused.
  SELECT 'help_text_' || h.lang || '|unknownCategoryToken|' || m[1] INTO v_tok
    FROM (VALUES (1, 'en', p_help_en), (2, 'am', p_help_am)) AS h(n, lang, txt)
    CROSS JOIN LATERAL regexp_matches(COALESCE(h.txt, ''), '\{category:([^}]*)\}', 'g') AS m
   WHERE NOT EXISTS (SELECT 1 FROM public.categories c
                      WHERE c.slug = m[1] AND c.is_active AND c.allow_listings)
   ORDER BY h.n
   LIMIT 1;
  IF v_tok IS NOT NULL THEN
    RETURN v_tok;
  END IF;

  RETURN NULL;
END $m8b$;
REVOKE ALL ON FUNCTION public.attr_cell_check(text, text, text, text, integer, text, text, integer, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_cell_check(text, text, text, text, integer, text, text, integer, text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_cell_check(text, text, text, text, integer, text, text, integer, text, text, text) TO service_role;

CREATE OR REPLACE FUNCTION public.attr_import_plan(p_definitions jsonb, p_links jsonb, p_scope text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $m8b$
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
  v_vw_parts   text[];
  v_vw_pairs   jsonb;
  v_vw_pair    jsonb;
  v_vw_part    text;
  v_sibopts    jsonb;
  v_sibvals    text[];
  -- M-SHAPE — does this row's option cell differ from the stored one?
  v_opt_same   boolean;
  -- M8b / C4 — the Amharic unit cell.
  v_unit_am    text;
  -- M8b / B3 (INC-438) — the file's links rows, collected before the
  -- definitions loop, and the values a definitions row removes / their holders.
  v_file_links jsonb := '[]'::jsonb;
  v_removed    text[];
  v_holders    text[];
  v_hvals      text[];
  -- M8b / B2 (INC-327) — the end-state direct card ranks of the touched categories.
  v_rank_end   jsonb;
  v_clash      text;
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

  -- M8b / B3 — the file's DIRECT links rows, read before the definitions
  -- verdicts so an optionInUse holder the same file rewrites or unlinks is
  -- not counted. A BLANK visible_when cell changes nothing (it still holds).
  SELECT COALESCE(jsonb_agg(jsonb_build_object(
           'slug',     btrim(COALESCE(x.value->>'category_slug', '')),
           'key',      btrim(COALESCE(x.value->>'attribute_key', '')),
           'unlink',   lower(btrim(COALESCE(x.value->>'action', ''))) = 'unlink',
           'vw',       CASE WHEN btrim(COALESCE(x.value->>'visible_when', '')) <> ''
                            THEN btrim(x.value->>'visible_when') END,
           'alw_set',  x.value ? 'allowed_options',
           'alw',      btrim(COALESCE(x.value->>'allowed_options', '')),
           'dflt_set', x.value ? 'default_value',
           'dflt',     btrim(COALESCE(x.value->>'default_value', '')))), '[]'::jsonb)
    INTO v_file_links
    FROM jsonb_array_elements(COALESCE(p_links, '[]'::jsonb)) x
   WHERE lower(btrim(COALESCE(x.value->>'action', ''))) IN ('', 'upsert', 'unlink')
     AND btrim(COALESCE(x.value->>'origin', '')) IN ('', btrim(COALESCE(x.value->>'category_slug', '')));

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
        -- INC-265 — records separate at the JSON boundary `}|{`, never at a
        -- bare pipe: D28's two-tone swatch and any label carrying a pipe put the
        -- character INSIDE a record, and `string_to_array` cut the record in half.
        FOREACH v_seg IN ARRAY public.attr_split_option_cell(v_raw)
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
    FOREACH v_cell IN ARRAY ARRAY['unit','unit_am','min_bound','max_bound','decimals','format',
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
                                                'unit_am', 'null'::jsonb,
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
    v_unit_am := CASE WHEN v_cells ? 'unit_am'      THEN v_cells->>'unit_am'      ELSE v_att.unit_am END;
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
                                                         THEN d.options ELSE '[]'::jsonb END) AS t(o)
            JOIN rv ON jsonb_typeof(t.o) = 'object' AND btrim(COALESCE(t.o->>'parent', '')) = rv.val
           WHERE d.depends_on = v_att.id
             AND NOT EXISTS (
                   SELECT 1 FROM jsonb_array_elements(v_defs) x
                    WHERE x.value->>'key' = d.attr_key
                      AND (x.value->>'action' = 'delete'
                           OR NOT EXISTS (
                                SELECT 1 FROM jsonb_array_elements(CASE WHEN jsonb_typeof(x.value->'options') = 'array'
                                                                        THEN x.value->'options' ELSE '[]'::jsonb END) AS t2(o)
                                 WHERE jsonb_typeof(t2.o) = 'object'
                                   AND btrim(COALESCE(t2.o->>'parent', '')) = rv.val)))
        )
        SELECT COALESCE(array_agg(DISTINCT h.holder ORDER BY h.holder), ARRAY[]::text[]),
               COALESCE(array_agg(DISTINCT h.val ORDER BY h.val), ARRAY[]::text[])
          INTO v_holders, v_hvals
          FROM h;

        IF COALESCE(array_length(v_holders, 1), 0) > 0 THEN
          v_refusals := v_refusals || jsonb_build_object(
            'file','definitions','row',v_row,'key',v_key,'reason','optionInUse',
            'value', array_to_string(v_hvals, '|'),
            'holders', to_jsonb(v_holders),
            'detail', array_to_string(v_hvals, '|') || ' · '
                      || array_to_string(v_holders[1:10], ', ')
                      || CASE WHEN array_length(v_holders, 1) > 10
                              THEN ' … +' || (array_length(v_holders, 1) - 10)::text ELSE '' END);
          CONTINUE;
        END IF;
      END IF;
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
        -- M6 / INC-381 — the cell reads k1=a|b or k1=a|b&k2=c|d (one "and").
        v_vw_parts := string_to_array(v_vw_txt, '&');
        v_vw_pairs := '[]'::jsonb;
        IF array_length(v_vw_parts, 1) > 2 THEN
          v_bad_link := 'badShape';
        ELSE
          FOREACH v_vw_part IN ARRAY v_vw_parts
          LOOP
            v_vw_part := btrim(v_vw_part);
            v_vw_key := btrim(split_part(v_vw_part, '=', 1));
            v_vw_vals := ARRAY[]::text[];
            IF position('=' in v_vw_part) > 0 THEN
              FOREACH v_seg IN ARRAY string_to_array(substr(v_vw_part, position('=' in v_vw_part) + 1), '|')
              LOOP
                CONTINUE WHEN btrim(v_seg) = '';
                IF NOT (btrim(v_seg) = ANY (v_vw_vals)) THEN
                  v_vw_vals := v_vw_vals || btrim(v_seg);
                END IF;
              END LOOP;
            END IF;
            IF position('=' in v_vw_part) = 0 OR v_vw_key = ''
               OR COALESCE(array_length(v_vw_vals, 1), 0) = 0 THEN
              v_bad_link := 'badShape';
              EXIT;
            ELSIF v_vw_key = v_key THEN
              v_bad_link := 'self';
              EXIT;
            END IF;
            v_vw_pairs := v_vw_pairs || jsonb_build_array(
              jsonb_build_object('key', v_vw_key, 'in', to_jsonb(v_vw_vals)));
          END LOOP;
        END IF;

        IF v_bad_link IS NULL THEN
          v_vw := v_vw_pairs->0;
          IF jsonb_array_length(v_vw_pairs) = 2 THEN
            v_vw := v_vw || jsonb_build_object('and', v_vw_pairs->1);
          END IF;
          IF NOT public.attr_visible_when_ok(v_vw) THEN
            v_bad_link := 'badShape';
          END IF;
        END IF;

        IF v_bad_link IS NULL THEN
          FOR v_vw_pair IN SELECT x.value FROM jsonb_array_elements(v_vw_pairs) x
          LOOP
            v_vw_key := v_vw_pair->>'key';
            SELECT COALESCE(array_agg(t.v), ARRAY[]::text[]) INTO v_vw_vals
              FROM jsonb_array_elements_text(v_vw_pair->'in') AS t(v);
            IF NOT EXISTS (
                    SELECT 1 FROM public.effective_category_links(v_cat.id) el
                      JOIN public.attributes a2 ON a2.id = el.attribute_id
                     WHERE a2.attr_key = v_vw_key)
              AND NOT EXISTS (
                    SELECT 1 FROM jsonb_array_elements(v_lnks) x
                     WHERE x.value->>'slug' = v_cat.slug
                       AND x.value->>'key' = v_vw_key
                       AND x.value->>'action' = 'upsert') THEN
              v_bad_link := 'unknownSibling:' || v_vw_key;
              EXIT;
            END IF;
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
            EXIT WHEN v_bad_link IS NOT NULL;
          END LOOP;
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

  ------------------------------- M8b / B2 (INC-327): END-STATE DIRECT RANK CLASH
  -- UNIQUE (category_id, card_rank) guards direct links at the commit; the
  -- preview must refuse what the constraint would. For every category a links
  -- row touches, the END STATE: an existing direct link the file does not name
  -- keeps its rank; an upsert row sets its rank (empty clears); an unlink
  -- vacates. A rank held by two keys refuses every FILE row that holds it. A
  -- swap or shift inside one file has no clash in its end state.
  SELECT COALESCE(jsonb_agg(jsonb_build_object('cid', s.cid, 'k', s.k, 'r', s.r)), '[]'::jsonb)
    INTO v_rank_end
    FROM (
      SELECT l.category_id::text AS cid, a.attr_key AS k, l.card_rank AS r
        FROM public.category_attribute_links l
        JOIN public.attributes a ON a.id = l.attribute_id
       WHERE l.card_rank IS NOT NULL
         AND l.category_id::text IN (
               SELECT x.value->>'category_id' FROM jsonb_array_elements(v_lnks) x
                WHERE NULLIF(x.value->>'category_id', '') IS NOT NULL)
         AND NOT EXISTS (
               SELECT 1 FROM jsonb_array_elements(v_lnks) x
                WHERE x.value->>'category_id' = l.category_id::text
                  AND x.value->>'key' = a.attr_key)
      UNION ALL
      SELECT x.value->>'category_id', x.value->>'key', (x.value->>'card_rank')::int
        FROM jsonb_array_elements(v_lnks) x
       WHERE x.value->>'action' = 'upsert'
         AND NULLIF(x.value->>'category_id', '') IS NOT NULL
         AND NULLIF(x.value->>'card_rank', '') IS NOT NULL
    ) s;
  v_out := '[]'::jsonb;
  FOR v_entry IN SELECT value FROM jsonb_array_elements(v_lnks)
  LOOP
    v_clash := NULL;
    IF v_entry->>'action' = 'upsert'
       AND NULLIF(v_entry->>'category_id', '') IS NOT NULL
       AND NULLIF(v_entry->>'card_rank', '') IS NOT NULL THEN
      SELECT r.value->>'k' INTO v_clash
        FROM jsonb_array_elements(v_rank_end) r
       WHERE r.value->>'cid' = v_entry->>'category_id'
         AND (r.value->>'r')::int = (v_entry->>'card_rank')::int
         AND r.value->>'k' <> v_entry->>'key'
       ORDER BY r.value->>'k'
       LIMIT 1;
      IF v_clash IS NOT NULL THEN
        v_refusals := v_refusals || jsonb_build_object(
          'file','links','row', COALESCE((v_entry->>'row')::int, 0),
          'key', v_entry->>'key',
          'reason','rankClash',
          'category', v_entry->>'slug',
          'rank', (v_entry->>'card_rank')::int,
          'origin_key', v_clash,
          'detail', v_entry->>'slug' || ' rank ' || (v_entry->>'card_rank')
                    || ' · ' || (v_entry->>'key') || ' · also held by ' || v_clash);
        CONTINUE;
      END IF;
    END IF;
    v_out := v_out || jsonb_build_array(v_entry);
  END LOOP;
  v_lnks := v_out;

  ------------------------------- DEC-079: PRICE-BASIS UNIQUENESS
  -- A category (and every primary descendant) carries at most ONE price-basis
  -- definition (pricing_type* | unit_of_sale*) after the plan is applied; a
  -- link that would make a second one is refused, naming both keys.
  v_out := '[]'::jsonb;
  FOR v_entry IN SELECT value FROM jsonb_array_elements(v_lnks)
  LOOP
    IF v_entry->>'action' = 'upsert'
       AND v_entry->>'change' IN ('add','change')
       AND COALESCE(v_entry->>'key','') ~ '^(pricing_type|unit_of_sale)(-|$)'
       AND NULLIF(v_entry->>'category_id','') IS NOT NULL THEN
      v_conflict := public.price_basis_conflict(
        (v_entry->>'category_id')::uuid, v_entry->>'key', v_lnks);
      IF v_conflict IS NOT NULL THEN
        v_refusals := v_refusals || jsonb_build_object(
          'file','links','row', COALESCE((v_entry->>'row')::int, 0),
          'key', v_entry->>'key',
          'reason','priceBasisDuplicate',
          'category', v_entry->>'slug',
          'detail', v_conflict);
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
END $m8b$;
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM authenticated;
GRANT ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

-- Proofs — scratch rows inside a block that always rolls back.
DO $p$
DECLARE
  v_s text := 'm8b-proof-' || substr(md5(random()::text), 1, 8);
  v_k text := 'm8b_' || substr(md5(random()::text), 1, 8);
  v_cat uuid;
  v_n1 uuid; v_n2 uuid; v_n3 uuid; v_p uuid; v_d uuid; v_e uuid; v_u uuid;
  v_plan jsonb;
  v_ref jsonb;
BEGIN
  BEGIN
    INSERT INTO public.categories (slug, name_en) VALUES (v_s, v_s) RETURNING id INTO v_cat;
    INSERT INTO public.attributes (attr_key, name_en, attr_type) VALUES (v_k || '_n1', 'n1', 'number') RETURNING id INTO v_n1;
    INSERT INTO public.attributes (attr_key, name_en, attr_type) VALUES (v_k || '_n2', 'n2', 'number') RETURNING id INTO v_n2;
    INSERT INTO public.attributes (attr_key, name_en, attr_type) VALUES (v_k || '_n3', 'n3', 'number') RETURNING id INTO v_n3;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
      VALUES (v_k || '_p', 'P', 'single_select',
              '[{"value":"a","label_en":"a"},{"value":"b","label_en":"b"},{"value":"c","label_en":"c"}]'::jsonb)
      RETURNING id INTO v_p;
    INSERT INTO public.attributes (attr_key, name_en, attr_type) VALUES (v_k || '_d', 'D', 'number') RETURNING id INTO v_d;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
      VALUES (v_k || '_e', 'E', 'single_select',
              jsonb_build_array(jsonb_build_object('value','x','label_en','x',
                'allowed', jsonb_build_object(v_k || '_p', jsonb_build_array('c')))))
      RETURNING id INTO v_e;
    INSERT INTO public.attributes (attr_key, name_en, attr_type) VALUES (v_k || '_u', 'U', 'number') RETURNING id INTO v_u;
    INSERT INTO public.category_attribute_links (category_id, attribute_id, card_rank) VALUES
      (v_cat, v_n1, 1), (v_cat, v_n2, 2), (v_cat, v_n3, 3);
    INSERT INTO public.category_attribute_links (category_id, attribute_id) VALUES (v_cat, v_p);
    INSERT INTO public.category_attribute_links (category_id, attribute_id, visible_when)
      VALUES (v_cat, v_d, jsonb_build_object('key', v_k || '_p', 'in', jsonb_build_array('b')));

    -- B2: a direct rank another direct link keeps is refused, naming it.
    v_plan := public.attr_import_plan('[]'::jsonb, jsonb_build_array(jsonb_build_object(
      'row', 2, 'category_slug', v_s, 'attribute_key', v_k || '_n2', 'card_rank', '3')), NULL);
    SELECT x.value INTO v_ref FROM jsonb_array_elements(v_plan->'refusals') x WHERE x.value->>'reason' = 'rankClash';
    ASSERT v_ref IS NOT NULL AND v_ref->>'origin_key' = v_k || '_n3' AND (v_ref->>'rank')::int = 3,
      'M8b: rankClash not refused: ' || (v_plan->'refusals')::text;
    -- B2: a swap inside one file is accepted.
    v_plan := public.attr_import_plan('[]'::jsonb, jsonb_build_array(
      jsonb_build_object('row', 2, 'category_slug', v_s, 'attribute_key', v_k || '_n1', 'card_rank', '3'),
      jsonb_build_object('row', 3, 'category_slug', v_s, 'attribute_key', v_k || '_n3', 'card_rank', '1')), NULL);
    ASSERT jsonb_array_length(v_plan->'refusals') = 0, 'M8b: swap refused: ' || (v_plan->'refusals')::text;

    -- B3 kind (1): P loses b while D's condition names it.
    v_plan := public.attr_import_plan(jsonb_build_array(jsonb_build_object(
      'row', 2, 'attribute_key', v_k || '_p', 'label_en', 'P', 'type', 'single_select',
      'options', '[{"value":"a","label_en":"a"},{"value":"c","label_en":"c"}]')), '[]'::jsonb, NULL);
    SELECT x.value INTO v_ref FROM jsonb_array_elements(v_plan->'refusals') x WHERE x.value->>'reason' = 'optionInUse';
    ASSERT v_ref IS NOT NULL AND position(v_s || '·' || v_k || '_d·visible_when' IN v_ref->>'detail') > 0,
      'M8b: optionInUse (1) not refused: ' || (v_plan->'refusals')::text;
    -- B3 the same-file exception: D's condition rewritten to a.
    v_plan := public.attr_import_plan(jsonb_build_array(jsonb_build_object(
      'row', 2, 'attribute_key', v_k || '_p', 'label_en', 'P', 'type', 'single_select',
      'options', '[{"value":"a","label_en":"a"},{"value":"c","label_en":"c"}]')),
      jsonb_build_array(jsonb_build_object('row', 2, 'category_slug', v_s, 'attribute_key', v_k || '_d',
        'visible_when', v_k || '_p=a')), NULL);
    ASSERT NOT EXISTS (SELECT 1 FROM jsonb_array_elements(v_plan->'refusals') x WHERE x.value->>'reason' = 'optionInUse'),
      'M8b: same-file exception refused: ' || (v_plan->'refusals')::text;
    -- B3 kind (3): P loses c while E's option allowed names it.
    v_plan := public.attr_import_plan(jsonb_build_array(jsonb_build_object(
      'row', 2, 'attribute_key', v_k || '_p', 'label_en', 'P', 'type', 'single_select',
      'options', '[{"value":"a","label_en":"a"},{"value":"b","label_en":"b"}]')), '[]'::jsonb, NULL);
    SELECT x.value INTO v_ref FROM jsonb_array_elements(v_plan->'refusals') x WHERE x.value->>'reason' = 'optionInUse';
    ASSERT v_ref IS NOT NULL AND position('·' || v_k || '_e·allowed' IN v_ref->>'detail') > 0,
      'M8b: optionInUse (3) not refused: ' || (v_plan->'refusals')::text;

    -- C4: unit_am round-trips through the plan's cells, and obeys unit's law.
    v_plan := public.attr_import_plan(jsonb_build_array(jsonb_build_object(
      'row', 2, 'attribute_key', v_k || '_u', 'label_en', 'U', 'type', 'number', 'unit_am', 'ኪግ')), '[]'::jsonb, NULL);
    ASSERT jsonb_array_length(v_plan->'refusals') = 0
       AND v_plan->'definitions'->0->'cells'->>'unit_am' = 'ኪግ'
       AND v_plan->'definitions'->0->>'change' = 'change',
      'M8b: unit_am cell lost: ' || v_plan::text;
    ASSERT public.attr_cell_check('single_select', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ኪግ')
           = 'unit_am|onlyNumber|ኪግ', 'M8b: unit_am on a select not refused';
    ASSERT public.attr_cell_check('number', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) IS NULL,
      'M8b: ten-argument call broken';

    RAISE EXCEPTION 'm8b-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'm8b-proof-ok' THEN RAISE; END IF;
  END;
  ASSERT has_function_privilege('service_role', 'public.attr_import_plan(jsonb, jsonb, text)', 'EXECUTE')
     AND NOT has_function_privilege('authenticated', 'public.attr_import_plan(jsonb, jsonb, text)', 'EXECUTE')
     AND NOT has_function_privilege('anon', 'public.attr_import_plan(jsonb, jsonb, text)', 'EXECUTE')
     AND has_function_privilege('authenticated', 'public.attr_cell_check(text, text, text, text, integer, text, text, integer, text, text, text)', 'EXECUTE')
     AND NOT has_function_privilege('anon', 'public.attr_cell_check(text, text, text, text, integer, text, text, integer, text, text, text)', 'EXECUTE'),
    'M8b: ACL changed';
END $p$;

INSERT INTO public.migration_marks (version) VALUES ('20261006130000') ON CONFLICT DO NOTHING;