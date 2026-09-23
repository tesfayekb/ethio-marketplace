-- MIGRATION MARK 20260923070000 — INC-268 · attr_allowed_check memoised (WHOLE)
--
-- INC-268 — THE PLANNER'S HOT PATH IS ONE REPEATED TARGET RESOLUTION.
--
-- PROFILE (production, 2026-09-23):
--   attr_option_shape('model-phones', options)   = 114 ms
--   attr_allowed_check('model-phones', options)  = 1 512 ms   <-- the hot path
--   attr_import_plan(one byte-identical row)     = 1 856 ms
-- and the shape of the cost:
--   241 option/target pairs, 1 DISTINCT target ('screen_size-phones').
--
-- The decisive line is inside the PER-OPTION loop of attr_allowed_check:
--   v_tcats := public.attr_cats_expand(public.attr_postplan_cats(v_tkey, p_links));
-- together with `v_tid := NULL; v_ttype := NULL; v_tvals := NULL;` at the top of
-- the same iteration, which THROWS AWAY the resolution and makes the next option
-- repeat it: two category expansions (recursive, over the whole link set AND the
-- whole links payload of the file), a full scan of the p_defs overlay, an
-- attr_option_values read and up to 20 single-row dependency hops — 241 times
-- for ONE target. A definitions file that changes 363 options in several such
-- definitions multiplies that by every row, which is how r21-electronics
-- definitions runs past the statement timeout.
--
-- THE FIX: a per-call MEMO. Every target key is resolved ONCE per call — type,
-- option values, live id, and its one target-level verdict (circular, not a
-- select, not co-linked) — and every later option reads the memo. The listed
-- values are then compared set-based against the memoised array instead of one
-- loop iteration per value.
--
-- WHAT DOES NOT CHANGE: the rule, the refusal reasons, their wording, their
-- detail strings, and the ORDER in which they are returned (a target-level
-- verdict is still reported at the first option that names that target). No
-- statement_timeout dial is introduced: it is not needed.

/* ================= 1. THE RULE (whole re-declaration, INC-183) ============= */
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
  -- INC-268 — the per-call target memo: target key -> resolved facts + verdict.
  v_memo    jsonb := '{}'::jsonb;
  v_hit     jsonb;
  v_bad     text;
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
      -- Never the owner, never the owner's parent. (Option-independent, but
      -- kept first so the refusal order is exactly what it was.)
      IF v_tkey = p_owner_key OR (v_parent IS NOT NULL AND v_tkey = v_parent) THEN
        RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                  'target', v_tkey, 'reason', 'allowedTargetCircular',
                                  'detail', p_owner_key || '|' || v_val || '|' || v_tkey);
      END IF;

      ---------------------------------------------------------------- the memo
      v_hit := v_memo -> v_tkey;
      IF v_hit IS NULL THEN
        v_bad := NULL;
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
          v_bad := 'allowedTargetNotSelect';
        END IF;

        -- Never a definition that depends on the owner (directly or
        -- transitively). A plan-only target has no live id; its in-file
        -- dependency verdicts are the DEC-045b pass's, so the walk runs only
        -- with a live anchor.
        IF v_bad IS NULL THEN
          v_cur := v_tid; v_hops := 0;
          WHILE v_cur IS NOT NULL AND v_hops < 20 LOOP
            SELECT a.depends_on INTO v_cur FROM public.attributes a WHERE a.id = v_cur;
            IF v_cur IS NOT NULL
               AND EXISTS (SELECT 1 FROM public.attributes a
                            WHERE a.id = v_cur AND a.attr_key = p_owner_key) THEN
              v_bad := 'allowedTargetCircular';
              EXIT;
            END IF;
            v_hops := v_hops + 1;
          END LOOP;
        END IF;

        -- Co-linked in at least one owner category, after this plan is applied
        -- (DEC-057b).
        IF v_bad IS NULL THEN
          v_tcats := public.attr_cats_expand(public.attr_postplan_cats(v_tkey, p_links));
          IF COALESCE(array_length(v_ocats, 1), 0) > 0
             AND NOT EXISTS (SELECT 1 FROM unnest(v_ocats) c WHERE c = ANY (v_tcats)) THEN
            v_bad := 'allowedTargetNotColinked';
          END IF;
        END IF;

        -- The target's own value set, read ONCE.
        IF v_bad IS NULL AND v_tid IS NOT NULL AND v_tvals IS NULL THEN
          v_tvals := public.attr_option_values(v_tid);
        END IF;

        v_hit := jsonb_build_object(
          'bad',  CASE WHEN v_bad IS NULL THEN 'null'::jsonb ELSE to_jsonb(v_bad) END,
          'vals', to_jsonb(COALESCE(v_tvals, ARRAY[]::text[])));
        v_memo := v_memo || jsonb_build_object(v_tkey, v_hit);
      END IF;

      v_bad := CASE WHEN v_hit->'bad' = 'null'::jsonb THEN NULL ELSE v_hit->>'bad' END;
      IF v_bad IS NOT NULL THEN
        RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                  'target', v_tkey, 'reason', v_bad,
                                  'detail', p_owner_key || '|' || v_val || '|' || v_tkey);
      END IF;

      SELECT COALESCE(t.vals, ARRAY[]::text[]) INTO v_tvals
        FROM (SELECT array_agg(x.value #>> '{}') AS vals
                FROM jsonb_array_elements(v_hit->'vals') x) t;

      -- Every listed value exists in the target's option list (active or not).
      -- Set-based, first offender in list order — no per-value loop.
      v_v := NULL;
      SELECT x.value #>> '{}' INTO v_v
        FROM jsonb_array_elements(
               CASE WHEN jsonb_typeof(v_list) = 'array' THEN v_list ELSE '[]'::jsonb END)
             WITH ORDINALITY AS x(value, ord)
       WHERE (x.value #>> '{}') IS NULL
          OR NOT ((x.value #>> '{}') = ANY (v_tvals))
       ORDER BY x.ord
       LIMIT 1;
      IF FOUND THEN
        RETURN jsonb_build_object('key', p_owner_key, 'option', v_val,
                                  'target', v_tkey, 'reason', 'allowedUnknownValue',
                                  'value', COALESCE(v_v, ''),
                                  'detail', p_owner_key || '|' || v_val || '|' || v_tkey
                                            || '|' || COALESCE(v_v, ''));
      END IF;
    END LOOP;
  END LOOP;

  RETURN NULL;
END $function$;

-- INC-074 definer law: the closers are restated in the same file.
REVOKE ALL ON FUNCTION public.attr_allowed_check(text, jsonb, jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_allowed_check(text, jsonb, jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_allowed_check(text, jsonb, jsonb, jsonb) TO service_role;

/* ================= 2. PROOFS — scratch rows only (INC-222) ================ */
DO $do$
DECLARE
  v_cat   uuid;
  v_own   uuid;
  v_tgt   uuid;
  v_txt   uuid;
  v_opts  jsonb;
  v_res   jsonb;
  v_t0    timestamptz;
  v_ms    numeric;
BEGIN
  INSERT INTO public.categories (slug, name_en, is_active, allow_listings)
    VALUES ('zzp-inc268-cat', 'zzp INC-268 scratch', false, false) RETURNING id INTO v_cat;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
    VALUES ('zzp_inc268_target', 'zzp target', 'single_select',
            '[{"value":"a"},{"value":"b"},{"value":"c"}]'::jsonb)
    RETURNING id INTO v_tgt;

  INSERT INTO public.attributes (attr_key, name_en, attr_type)
    VALUES ('zzp_inc268_text', 'zzp text', 'text') RETURNING id INTO v_txt;

  -- 300 options, each naming the SAME target: the INC-268 shape.
  SELECT jsonb_agg(jsonb_build_object(
           'value', 'v' || n::text,
           'allowed', jsonb_build_object('zzp_inc268_target', jsonb_build_array('a','b'))))
    INTO v_opts FROM generate_series(1, 300) n;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
    VALUES ('zzp_inc268_owner', 'zzp owner', 'single_select', v_opts)
    RETURNING id INTO v_own;

  INSERT INTO public.category_attribute_links (category_id, attribute_id)
    VALUES (v_cat, v_own), (v_cat, v_tgt), (v_cat, v_txt);

  ---------------------------------------------------------------- P1 · speed
  v_t0 := clock_timestamp();
  v_res := public.attr_allowed_check('zzp_inc268_owner', v_opts, '[]'::jsonb, '[]'::jsonb);
  v_ms := EXTRACT(EPOCH FROM (clock_timestamp() - v_t0)) * 1000;
  IF v_res IS NOT NULL THEN
    RAISE EXCEPTION 'PROOF 1 failed: a lawful 300-option list refused: %', v_res;
  END IF;
  IF v_ms > 500 THEN
    RAISE EXCEPTION 'PROOF 1 failed: 300 options took % ms (memo not in effect)', round(v_ms);
  END IF;
  RAISE NOTICE 'PROOF 1 ok: 300 options, one target, % ms', round(v_ms, 1);

  ------------------------------------------------- P2 · unknown listed value
  v_res := public.attr_allowed_check('zzp_inc268_owner',
    '[{"value":"v1","allowed":{"zzp_inc268_target":["a","zzz"]}}]'::jsonb,
    '[]'::jsonb, '[]'::jsonb);
  IF COALESCE(v_res->>'reason','') <> 'allowedUnknownValue'
     OR COALESCE(v_res->>'value','') <> 'zzz' THEN
    RAISE EXCEPTION 'PROOF 2 failed: expected allowedUnknownValue/zzz, got %', v_res;
  END IF;
  RAISE NOTICE 'PROOF 2 ok: unknown value named — %', v_res->>'detail';

  --------------------------------------------------------- P3 · the owner itself
  v_res := public.attr_allowed_check('zzp_inc268_owner',
    '[{"value":"v1","allowed":{"zzp_inc268_owner":["v2"]}}]'::jsonb,
    '[]'::jsonb, '[]'::jsonb);
  IF COALESCE(v_res->>'reason','') <> 'allowedTargetCircular' THEN
    RAISE EXCEPTION 'PROOF 3 failed: expected allowedTargetCircular, got %', v_res;
  END IF;
  RAISE NOTICE 'PROOF 3 ok: circular target refused';

  ----------------------------------------------------------- P4 · not a select
  v_res := public.attr_allowed_check('zzp_inc268_owner',
    '[{"value":"v1","allowed":{"zzp_inc268_text":["a"]}}]'::jsonb,
    '[]'::jsonb, '[]'::jsonb);
  IF COALESCE(v_res->>'reason','') <> 'allowedTargetNotSelect' THEN
    RAISE EXCEPTION 'PROOF 4 failed: expected allowedTargetNotSelect, got %', v_res;
  END IF;
  RAISE NOTICE 'PROOF 4 ok: non-select target refused';

  -------------------------------------------------------- P5 · not co-linked
  DELETE FROM public.category_attribute_links
   WHERE category_id = v_cat AND attribute_id = v_tgt;
  v_res := public.attr_allowed_check('zzp_inc268_owner',
    '[{"value":"v1","allowed":{"zzp_inc268_target":["a"]}}]'::jsonb,
    '[]'::jsonb, '[]'::jsonb);
  IF COALESCE(v_res->>'reason','') <> 'allowedTargetNotColinked' THEN
    RAISE EXCEPTION 'PROOF 5 failed: expected allowedTargetNotColinked, got %', v_res;
  END IF;
  RAISE NOTICE 'PROOF 5 ok: uncolinked target refused';

  ------------------------------------------------------------------- cleanup
  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  DELETE FROM public.attributes WHERE id IN (v_own, v_tgt, v_txt);
  DELETE FROM public.categories WHERE id = v_cat;
  IF EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'zzp_inc268%')
     OR EXISTS (SELECT 1 FROM public.categories WHERE slug = 'zzp-inc268-cat') THEN
    RAISE EXCEPTION 'CLEANUP failed: scratch rows survived';
  END IF;
  RAISE NOTICE 'CLEANUP ok: every scratch row deleted';
END $do$;

/* ================= 3. READ-BACKS ========================================= */
DO $do$
DECLARE v_src text; v_vol text; v_acl text;
BEGIN
  SELECT p.prosrc, p.provolatile::text INTO v_src, v_vol
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'attr_allowed_check';
  IF v_src IS NULL THEN RAISE EXCEPTION 'READ-BACK failed: function absent'; END IF;
  IF position('v_memo' IN v_src) = 0 THEN
    RAISE EXCEPTION 'READ-BACK failed: the memo is not in the installed body';
  END IF;
  IF position('WITH ORDINALITY' IN v_src) = 0 THEN
    RAISE EXCEPTION 'READ-BACK failed: the set-based value check is not installed';
  END IF;
  IF v_vol <> 's' THEN
    RAISE EXCEPTION 'READ-BACK failed: volatility is % (expected STABLE)', v_vol;
  END IF;
  SELECT array_to_string(p.proacl::text[], ' ') INTO v_acl
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'attr_allowed_check';
  IF v_acl IS NULL OR position('authenticated=X' IN v_acl) = 0 THEN
    RAISE EXCEPTION 'READ-BACK failed: authenticated has no EXECUTE (acl=%)', COALESCE(v_acl,'<null>');
  END IF;
  IF position('anon=' IN v_acl) > 0 THEN
    RAISE EXCEPTION 'READ-BACK failed: anon still holds a grant (acl=%)', v_acl;
  END IF;
  RAISE NOTICE 'READ-BACK attr_allowed_check: memo + set-based values present, STABLE, authenticated only';
END $do$;