-- Bundle 19 turn 9c (2026-10-17). Tier A. D201 §4 — M2 PART c3 OF EIGHT: attr_import_plan's TEXT, CHUNK 3 OF 4.
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
-- The mark 20261018150400.
-- Applied on ethio-prod by the executor's migration tool (DEC-188); the operator applies the saved files on ethio-staging
-- in order and reads back the marks. The eight parts are applied in order a → b → c1 → c2 → c3 → c4 → d → e in one turn,
-- nothing between them; each later part's first block refuses to run before the earlier one has landed; every part is
-- idempotent (a second apply changes nothing and the proofs still run).

-- ===== gate — part c2 must have landed =====
DO $gate$
BEGIN
  IF to_regclass('public.migration_text_parts') IS NULL THEN
    RAISE EXCEPTION 'B19M2c3: part c1 (mark 20261018150200) has not landed — apply the parts in order';
  END IF;
  IF (SELECT count(*) FROM public.migration_text_parts WHERE fn = 'attr_import_plan' AND seq < 3) <> 2 THEN
    RAISE EXCEPTION 'B19M2c3: part c2 (mark 20261018150300) has not landed — apply it first';
  END IF;
END $gate$;

-- ===== chunk 3 (lines 706–1095 of the declaration) =====
DELETE FROM public.migration_text_parts WHERE fn = 'attr_import_plan' AND seq = 3;
INSERT INTO public.migration_text_parts (fn, seq, body) VALUES ('attr_import_plan', 3, $b19chunk$
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

    -- B19 M2 (D201 §4) — THE fact_rank CELL, LAST in the file and optional: a file
    -- without the column changes no rank (an export made before the column still
    -- imports); a present BLANK cell clears the rank; 1–4 sets it; anything else
    -- refuses badFactRank with the offending text.
    v_fact_set := false;
    v_fact := NULL;
    v_fact_txt := NULL;
    IF e ? 'fact_rank' THEN
      v_fact_set := true;
      v_fact_txt := btrim(COALESCE(e->>'fact_rank',''));
      IF v_fact_txt <> '' THEN
        IF v_fact_txt !~ '^[1-4]$' THEN
          v_refusals := v_refusals || jsonb_build_object(
            'file','links','row',v_row,'key',v_key,'reason','badFactRank',
            'category', v_cat.slug, 'detail', v_fact_txt, 'value', v_fact_txt);
          CONTINUE;
        END IF;
        v_fact := v_fact_txt::int;
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
$b19chunk$);
DO $proof$
DECLARE v_fp text;
BEGIN
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.body, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)) INTO v_fp FROM public.migration_text_parts p WHERE p.fn = 'attr_import_plan' AND p.seq = 3;
  IF v_fp <> 'fe2c51a862545df029c86a1d4114efc8' THEN
    RAISE EXCEPTION 'B19M2c3: chunk 3 is not the attachment''s text (fingerprint %) — submit part c3 again, exactly as attached', v_fp;
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018150400') ON CONFLICT (version) DO NOTHING;
