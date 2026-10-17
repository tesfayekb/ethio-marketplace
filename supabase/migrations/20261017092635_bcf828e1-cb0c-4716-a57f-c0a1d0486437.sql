-- Bundle 19 turn 9c (2026-10-17). Tier A. D201 §4 — M2 PART c1 OF EIGHT: attr_import_plan's TEXT, CHUNK 1 OF 4.
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
-- The mark 20261018150200.
-- Applied on ethio-prod by the executor's migration tool (DEC-188); the operator applies the saved files on ethio-staging
-- in order and reads back the marks. The eight parts are applied in order a → b → c1 → c2 → c3 → c4 → d → e in one turn,
-- nothing between them; each later part's first block refuses to run before the earlier one has landed; every part is
-- idempotent (a second apply changes nothing and the proofs still run).

-- ===== gate — part b must have landed =====
DO $gate$
DECLARE
  v_fp text; v_vol "char"; v_def boolean; v_cfg text; v_n integer; v_err text;
BEGIN
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)) INTO v_fp FROM pg_proc p WHERE p.oid = 'public.attr_export_payload(text)'::regprocedure;
  IF v_fp <> 'ed4d4c418afc0333aa501145c8bceafb' THEN
    RAISE EXCEPTION 'B19M2c1: part b (mark 20261018150100) has not landed — apply it first';
  END IF;
END $gate$;

-- ===== A — the tooling table that carries the text across parts (no client privilege; dropped by part c4) =====
-- The platform's order for a new table: (1) CREATE TABLE, (2) GRANT to the roles the policies allow, (3) ENABLE ROW
-- LEVEL SECURITY, (4) CREATE POLICY. The birth grants to anon and authenticated are revoked (E1); only service_role —
-- the migration's own connection — holds privilege, and the one policy names that role and no other.
CREATE TABLE IF NOT EXISTS public.migration_text_parts (
  fn   text    NOT NULL,
  seq  integer NOT NULL,
  body text    NOT NULL,
  PRIMARY KEY (fn, seq)
);
REVOKE ALL ON TABLE public.migration_text_parts FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.migration_text_parts TO service_role;
ALTER TABLE public.migration_text_parts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS migration_text_parts_service_only ON public.migration_text_parts;
CREATE POLICY migration_text_parts_service_only ON public.migration_text_parts
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ===== chunk 1 (lines 1–386 of the declaration) =====
DELETE FROM public.migration_text_parts WHERE fn = 'attr_import_plan' AND seq = 1;
INSERT INTO public.migration_text_parts (fn, seq, body) VALUES ('attr_import_plan', 1, $b19chunk$
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
  -- B19 M2 — the fact_rank cell: set only when the file carries the column.
  v_fact       int;
  v_fact_txt   text;
  v_fact_set   boolean;
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
$b19chunk$);
DO $proof$
DECLARE v_fp text;
BEGIN
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.body, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)) INTO v_fp FROM public.migration_text_parts p WHERE p.fn = 'attr_import_plan' AND p.seq = 1;
  IF v_fp <> '7a84457d65bb5c8f65aff1a6ccd07af3' THEN
    RAISE EXCEPTION 'B19M2c1: chunk 1 is not the attachment''s text (fingerprint %) — submit part c1 again, exactly as attached', v_fp;
  END IF;
END $proof$;
-- The declaration's header travels in this chunk, so the guard that reads SECURITY DEFINER asks for the closers in
-- this file: restated here on the door as it stands (it is closed already); part c4 restates them after the EXECUTE.
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM authenticated;
GRANT ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261018150200') ON CONFLICT (version) DO NOTHING;
