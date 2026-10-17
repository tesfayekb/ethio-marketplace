-- Bundle 19 turn 9c (2026-10-17). Tier A. D201 §4 — M2 PART c4 OF EIGHT: attr_import_plan's TEXT, CHUNK 4 OF 4 — ASSEMBLED, EXECUTED, PROVEN.
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
-- The mark 20261018150500.
-- Applied on ethio-prod by the executor's migration tool (DEC-188); the operator applies the saved files on ethio-staging
-- in order and reads back the marks. The eight parts are applied in order a → b → c1 → c2 → c3 → c4 → d → e in one turn,
-- nothing between them; each later part's first block refuses to run before the earlier one has landed; every part is
-- idempotent (a second apply changes nothing and the proofs still run).

-- ===== gate — part c3 must have landed =====
DO $gate$
BEGIN
  IF to_regclass('public.migration_text_parts') IS NULL THEN
    RAISE EXCEPTION 'B19M2c4: part c1 (mark 20261018150200) has not landed — apply the parts in order';
  END IF;
  IF (SELECT count(*) FROM public.migration_text_parts WHERE fn = 'attr_import_plan' AND seq < 4) <> 3 THEN
    RAISE EXCEPTION 'B19M2c4: part c3 (mark 20261018150400) has not landed — apply it first';
  END IF;
END $gate$;

-- ===== chunk 4 (lines 1096–1452 of the declaration) =====
DELETE FROM public.migration_text_parts WHERE fn = 'attr_import_plan' AND seq = 4;
INSERT INTO public.migration_text_parts (fn, seq, body) VALUES ('attr_import_plan', 4, $b19chunk$
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
       OR (v_ord_set AND v_link.display_order IS DISTINCT FROM v_ord)
       -- B19 M2 — so is a fact_rank-only change, when the file carries the cell.
       OR (v_fact_set AND v_link.fact_rank IS DISTINCT FROM v_fact) THEN
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
      'display_order', CASE WHEN v_ord IS NULL THEN '' ELSE v_ord::text END,
      'fact_set',v_fact_set,
      'fact_rank', CASE WHEN v_fact IS NULL THEN '' ELSE v_fact::text END);
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

  ------------------------------- B19 M2 (D201 §4): END-STATE DIRECT FACT-RANK CLASH
  -- UNIQUE (category_id, fact_rank) guards direct links at the commit, as the
  -- card rank's does; the preview refuses what the constraint would. The END
  -- STATE per category: a stored rank stands unless the file names its link
  -- with the cell set (or unlinks it); a file row with the cell set contributes
  -- its own value (blank = none). A rank held by two keys refuses every FILE
  -- row that holds it. There is no inherited-rank rule for facts: the read sorts
  -- by rank, then form order, and takes four.
  SELECT COALESCE(jsonb_agg(jsonb_build_object('cid', s.cid, 'k', s.k, 'r', s.r)), '[]'::jsonb)
    INTO v_rank_end
    FROM (
      SELECT l.category_id::text AS cid, a.attr_key AS k, l.fact_rank::int AS r
        FROM public.category_attribute_links l
        JOIN public.attributes a ON a.id = l.attribute_id
       WHERE l.fact_rank IS NOT NULL
         AND l.category_id::text IN (
               SELECT x.value->>'category_id' FROM jsonb_array_elements(v_lnks) x
                WHERE NULLIF(x.value->>'category_id', '') IS NOT NULL)
         AND NOT EXISTS (
               SELECT 1 FROM jsonb_array_elements(v_lnks) x
                WHERE x.value->>'category_id' = l.category_id::text
                  AND x.value->>'key' = a.attr_key
                  AND (x.value->>'action' = 'unlink'
                       OR COALESCE((x.value->>'fact_set')::boolean, false)))
      UNION ALL
      SELECT x.value->>'category_id', x.value->>'key', (x.value->>'fact_rank')::int
        FROM jsonb_array_elements(v_lnks) x
       WHERE x.value->>'action' = 'upsert'
         AND COALESCE((x.value->>'fact_set')::boolean, false)
         AND NULLIF(x.value->>'category_id', '') IS NOT NULL
         AND NULLIF(x.value->>'fact_rank', '') IS NOT NULL
    ) s;
  v_out := '[]'::jsonb;
  FOR v_entry IN SELECT value FROM jsonb_array_elements(v_lnks)
  LOOP
    v_clash := NULL;
    IF v_entry->>'action' = 'upsert'
       AND COALESCE((v_entry->>'fact_set')::boolean, false)
       AND NULLIF(v_entry->>'category_id', '') IS NOT NULL
       AND NULLIF(v_entry->>'fact_rank', '') IS NOT NULL THEN
      SELECT r.value->>'k' INTO v_clash
        FROM jsonb_array_elements(v_rank_end) r
       WHERE r.value->>'cid' = v_entry->>'category_id'
         AND (r.value->>'r')::int = (v_entry->>'fact_rank')::int
         AND r.value->>'k' <> v_entry->>'key'
       ORDER BY r.value->>'k'
       LIMIT 1;
      IF v_clash IS NOT NULL THEN
        v_refusals := v_refusals || jsonb_build_object(
          'file','links','row', COALESCE((v_entry->>'row')::int, 0),
          'key', v_entry->>'key',
          'reason','factRankClash',
          'category', v_entry->>'slug',
          'rank', (v_entry->>'fact_rank')::int,
          'origin_key', v_clash,
          'detail', v_entry->>'slug' || ' key fact ' || (v_entry->>'fact_rank')
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
$b19chunk$);
DO $proof$
DECLARE v_fp text;
BEGIN
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.body, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)) INTO v_fp FROM public.migration_text_parts p WHERE p.fn = 'attr_import_plan' AND p.seq = 4;
  IF v_fp <> 'a42131945a362adeda05931b76e7bf88' THEN
    RAISE EXCEPTION 'B19M2c4: chunk 4 is not the attachment''s text (fingerprint %) — submit part c4 again, exactly as attached', v_fp;
  END IF;
END $proof$;

-- ===== B — assemble, prove the text, execute =====
DO $exec$
DECLARE v_text text; v_fp text;
BEGIN
  SELECT string_agg(btrim(p.body, E'\n'), E'\n' ORDER BY p.seq) INTO v_text
    FROM public.migration_text_parts p WHERE p.fn = 'attr_import_plan';
  IF (SELECT count(*) FROM public.migration_text_parts WHERE fn = 'attr_import_plan') <> 4 THEN
    RAISE EXCEPTION 'B19M2c4: the four chunks are not all present';
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(v_text, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)) INTO v_fp;
  IF v_fp <> '3a7e5efaf2473ba9596f570ea0f48bc5' THEN
    RAISE EXCEPTION 'B19M2c4: the joined declaration is not the one written (fingerprint %)', v_fp;
  END IF;
  EXECUTE v_text;
END $exec$;
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM authenticated;
GRANT ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

-- ===== C — proofs =====
DO $proof$
DECLARE
  v_fp text; v_vol "char"; v_def boolean; v_cfg text; v_n integer; v_err text;
  v_root uuid; v_leaf uuid; v_a1 uuid; v_a2 uuid; v_a3 uuid;
  v_slug text := 'e2e-mig-b19m2c-' || substr(md5(random()::text), 1, 8);
  v_plan jsonb;
BEGIN
  -- P1. The body landed (fingerprint), with its header.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.attr_import_plan(jsonb, jsonb, text)'::regprocedure;
  IF v_fp <> '2463130389aa175d629fbed84695ded9' THEN RAISE EXCEPTION 'B19M2c4 P1: attr_import_plan body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M2c4 P1: attr_import_plan header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  -- P2. The grants.
  IF has_function_privilege('anon', 'public.attr_import_plan(jsonb, jsonb, text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.attr_import_plan(jsonb, jsonb, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19M2c4 P2: the grants are not as written';
  END IF;
  -- Scratch rows (e2e-mig-, removed below): a root, an active leaf, three attributes, three links — ranks 2, 1 and none.
  INSERT INTO public.categories (name_en, slug, is_active, allow_listings)
  VALUES ('e2e-mig- B19M2c root', v_slug || '-root', true, false) RETURNING id INTO v_root;
  INSERT INTO public.categories (name_en, slug, is_active, allow_listings)
  VALUES ('e2e-mig- B19M2c leaf', v_slug, true, true) RETURNING id INTO v_leaf;
  INSERT INTO public.category_tree_pointers (parent_id, child_id) VALUES (v_root, v_leaf);
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES (v_slug || '-a1', 'e2e-mig- A1', 'single_select', '[{"value":"x","label":"X"}]'::jsonb) RETURNING id INTO v_a1;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES (v_slug || '-a2', 'e2e-mig- A2', 'number') RETURNING id INTO v_a2;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES (v_slug || '-a3', 'e2e-mig- A3', 'text') RETURNING id INTO v_a3;
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, is_filterable, fact_rank)
  VALUES (v_leaf, v_a1, 1, true, 2), (v_leaf, v_a2, 2, true, 1), (v_leaf, v_a3, 3, false, NULL);
  -- P3. The planner's six cases.
  v_plan := public.attr_import_plan('[]'::jsonb,
    jsonb_build_array(jsonb_build_object('row', 2, 'category_slug', v_slug, 'attribute_key', v_slug || '-a1',
                                         'is_required', 'false', 'is_filterable', 'true')), NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0
     OR NOT (v_plan->'links') @> jsonb_build_array(jsonb_build_object('key', v_slug || '-a1', 'change', 'none', 'fact_set', false)) THEN
    RAISE EXCEPTION 'B19M2c4 P3a: a file without the column moved the rank (%)', v_plan;
  END IF;
  v_plan := public.attr_import_plan('[]'::jsonb,
    jsonb_build_array(jsonb_build_object('row', 2, 'category_slug', v_slug, 'attribute_key', v_slug || '-a1',
                                         'is_required', 'false', 'is_filterable', 'true', 'fact_rank', '')), NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0
     OR NOT (v_plan->'links') @> jsonb_build_array(jsonb_build_object('key', v_slug || '-a1', 'change', 'change', 'fact_set', true, 'fact_rank', '')) THEN
    RAISE EXCEPTION 'B19M2c4 P3b: a blank cell did not plan a clear (%)', v_plan;
  END IF;
  v_plan := public.attr_import_plan('[]'::jsonb,
    jsonb_build_array(jsonb_build_object('row', 2, 'category_slug', v_slug, 'attribute_key', v_slug || '-a1',
                                         'is_required', 'false', 'is_filterable', 'true', 'fact_rank', '5')), NULL);
  IF NOT (v_plan->'refusals') @> jsonb_build_array(jsonb_build_object('reason', 'badFactRank', 'detail', '5')) THEN
    RAISE EXCEPTION 'B19M2c4 P3c: rank 5 was not refused (%)', v_plan->'refusals';
  END IF;
  v_plan := public.attr_import_plan('[]'::jsonb,
    jsonb_build_array(
      jsonb_build_object('row', 2, 'category_slug', v_slug, 'attribute_key', v_slug || '-a1',
                         'is_required', 'false', 'is_filterable', 'true', 'fact_rank', '3'),
      jsonb_build_object('row', 3, 'category_slug', v_slug, 'attribute_key', v_slug || '-a3',
                         'is_required', 'false', 'is_filterable', 'false', 'fact_rank', '3')), NULL);
  IF NOT (v_plan->'refusals') @> jsonb_build_array(jsonb_build_object('reason', 'factRankClash', 'rank', 3)) THEN
    RAISE EXCEPTION 'B19M2c4 P3d: two rows claiming rank 3 did not clash (%)', v_plan->'refusals';
  END IF;
  v_plan := public.attr_import_plan('[]'::jsonb,
    jsonb_build_array(jsonb_build_object('row', 2, 'category_slug', v_slug, 'attribute_key', v_slug || '-a3',
                                         'is_required', 'false', 'is_filterable', 'false', 'fact_rank', '3')), NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0
     OR NOT (v_plan->'links') @> jsonb_build_array(jsonb_build_object('key', v_slug || '-a3', 'change', 'change', 'fact_set', true, 'fact_rank', '3')) THEN
    RAISE EXCEPTION 'B19M2c4 P3e: a legal rank was not planned as a change (%)', v_plan;
  END IF;
  v_plan := public.attr_import_plan('[]'::jsonb,
    jsonb_build_array(jsonb_build_object('row', 2, 'category_slug', v_slug, 'attribute_key', v_slug || '-a3',
                                         'is_required', 'false', 'is_filterable', 'false', 'fact_rank', '1')), NULL);
  IF NOT (v_plan->'refusals') @> jsonb_build_array(jsonb_build_object('reason', 'factRankClash', 'rank', 1, 'origin_key', v_slug || '-a2')) THEN
    RAISE EXCEPTION 'B19M2c4 P3f: a stored rank was not seen by the clash check (%)', v_plan->'refusals';
  END IF;
  DELETE FROM public.category_attribute_links WHERE category_id IN (v_root, v_leaf);
  DELETE FROM public.category_tree_pointers WHERE child_id = v_leaf;
  DELETE FROM public.attributes WHERE id IN (v_a1, v_a2, v_a3) AND attr_key LIKE 'e2e-mig-%';
  DELETE FROM public.categories WHERE id IN (v_root, v_leaf) AND slug LIKE 'e2e-mig-%';
END $proof$;

-- ===== D — the tooling table has done its work =====
DROP TABLE IF EXISTS public.migration_text_parts;

INSERT INTO public.migration_marks (version) VALUES ('20261018150500') ON CONFLICT (version) DO NOTHING;
