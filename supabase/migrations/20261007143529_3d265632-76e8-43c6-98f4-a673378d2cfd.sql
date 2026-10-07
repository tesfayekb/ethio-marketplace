-- M13 (bundle 8): Part B only — the census found fifteen functions open through PUBLIC, not the fourteen the brief expects, so this file carries no privilege statement of Part A (step A1 (i)).
-- Part B (INC-477): the answer door enforces a chosen option's `allowed` list.
CREATE OR REPLACE FUNCTION public.validate_listing_attributes(
  p_category_id uuid, p_attrs jsonb, p_prior jsonb DEFAULT NULL, p_defer_keys text[] DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $m6$
DECLARE
  v_attrs jsonb := CASE WHEN jsonb_typeof(p_attrs) = 'object' THEN p_attrs ELSE '{}'::jsonb END;
  v_prior jsonb := CASE WHEN jsonb_typeof(p_prior) = 'object' THEN p_prior ELSE '{}'::jsonb END;
  v_ref   jsonb := '[]'::jsonb;
  v_norm  jsonb := '{}'::jsonb;
  v_keys  text[];
  v_def   record;
  v_opt   jsonb;
  v_val   jsonb;
  v_folds jsonb := '{}'::jsonb;
  v_key   text;
  v_txt   text;
  v_num   numeric;
  v_min   numeric;
  v_max   numeric;
  v_bmin  numeric;
  v_bmax  numeric;
  v_absent boolean;
  v_allow_other boolean;
  v_active boolean;
  v_found  boolean;
  v_seen   text[];
  v_list   jsonb;
  v_elem   jsonb;
  v_parent_key text;
  v_bad    boolean;
  v_set    boolean;
  v_allow  jsonb := '{}'::jsonb;
  v_contrib jsonb := '{}'::jsonb;
BEGIN
  SELECT array_agg(a.attr_key)
    INTO v_keys
    FROM public.effective_category_links(p_category_id) e
    JOIN public.attributes a ON a.id = e.attribute_id;
  v_keys := coalesce(v_keys, ARRAY[]::text[]);

  -- M10 / INC-467: release only answers already held and since removed.
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_attrs) k LOOP
    IF NOT (v_key = ANY (v_keys)) AND v_prior ? v_key THEN
      v_attrs := v_attrs - v_key;
    END IF;
  END LOOP;
  FOR v_def IN
    SELECT a.attr_key, a.attr_type, a.options
      FROM public.effective_category_links(p_category_id) e
      JOIN public.attributes a ON a.id = e.attribute_id
     WHERE a.attr_type IN ('single_select', 'multi_select')
  LOOP
    v_val := v_attrs -> v_def.attr_key;
    IF v_def.attr_type = 'single_select'
       AND (jsonb_typeof(v_val) = 'string'
         OR (jsonb_typeof(v_val) = 'object' AND jsonb_typeof(v_val->'value') = 'string')) THEN
      v_txt := CASE WHEN jsonb_typeof(v_val) = 'string' THEN v_val #>> '{}'
                    ELSE v_val->>'value' END;
      IF NOT (jsonb_typeof(v_val) = 'object' AND v_txt = 'other')
         AND v_txt = ANY (public.attr_answer_tokens(v_prior -> v_def.attr_key))
         AND NOT EXISTS (SELECT 1 FROM jsonb_array_elements(
           CASE WHEN jsonb_typeof(v_def.options) = 'array' THEN v_def.options ELSE '[]'::jsonb END) o
           WHERE o.value->>'value' = v_txt) THEN
        v_attrs := v_attrs - v_def.attr_key;
      END IF;
    ELSIF v_def.attr_type = 'multi_select' AND jsonb_typeof(v_val) = 'array' THEN
      SELECT coalesce(jsonb_agg(x.value ORDER BY x.ordinality), '[]'::jsonb)
        INTO v_list
        FROM jsonb_array_elements(v_val) WITH ORDINALITY x(value, ordinality)
       WHERE NOT (jsonb_typeof(x.value) = 'string'
         AND (x.value #>> '{}') = ANY (public.attr_answer_tokens(v_prior -> v_def.attr_key))
         AND NOT EXISTS (SELECT 1 FROM jsonb_array_elements(
           CASE WHEN jsonb_typeof(v_def.options) = 'array' THEN v_def.options ELSE '[]'::jsonb END) o
           WHERE o.value->>'value' = (x.value #>> '{}')));
      v_attrs := jsonb_set(v_attrs, ARRAY[v_def.attr_key], v_list);
    END IF;
  END LOOP;

  FOR v_key IN SELECT k FROM jsonb_object_keys(v_attrs) k LOOP
    IF NOT (v_key = ANY (v_keys)) THEN
      v_ref := v_ref || jsonb_build_array(
        jsonb_build_object('attr_key', v_key, 'reason', 'unknownAttribute'));
    END IF;
  END LOOP;

  -- DEC-050 FOLD — a selected option may tighten a sibling's bounds.
  FOR v_def IN
    SELECT a.attr_key, a.options
      FROM public.effective_category_links(p_category_id) e
      JOIN public.attributes a ON a.id = e.attribute_id
     WHERE jsonb_typeof(a.options) = 'array'
  LOOP
    v_val := v_attrs -> v_def.attr_key;
    CONTINUE WHEN v_val IS NULL;
    FOR v_opt IN
      SELECT o.value
        FROM jsonb_array_elements(v_def.options) o
       WHERE jsonb_typeof(o.value->'bounds') = 'object'
    LOOP
      IF (v_opt->>'value') = ANY (public.attr_answer_tokens(v_val)) THEN
        FOR v_key IN SELECT k FROM jsonb_object_keys(v_opt->'bounds') k LOOP
          v_bmin := NULLIF(v_opt->'bounds'->v_key->>'min', '')::numeric;
          v_bmax := NULLIF(v_opt->'bounds'->v_key->>'max', '')::numeric;
          -- M6 / INC-374 — settled when any contributing option says so.
          v_set := (v_opt->'bounds'->v_key->'settled') = 'true'::jsonb;
          IF v_folds ? v_key THEN
            v_bmin := greatest(v_bmin, NULLIF(v_folds->v_key->>'min','')::numeric);
            v_bmax := least(v_bmax, NULLIF(v_folds->v_key->>'max','')::numeric);
            v_set := v_set OR (v_folds->v_key->'settled') = 'true'::jsonb;
          END IF;
          v_folds := v_folds || jsonb_build_object(v_key,
            jsonb_strip_nulls(jsonb_build_object('min', v_bmin, 'max', v_bmax,
              'settled', CASE WHEN v_set THEN true END)));
        END LOOP;
      END IF;
    END LOOP;
  END LOOP;

  -- Bundle 8 B1 / INC-477 — a select answered with ONE value narrows the
  -- siblings its option's `allowed` names; two lists meet at their intersection.
  FOR v_def IN
    SELECT a.attr_key, a.options
      FROM public.effective_category_links(p_category_id) e
      JOIN public.attributes a ON a.id = e.attribute_id
     WHERE a.attr_type IN ('single_select', 'multi_select')
       AND jsonb_typeof(a.options) = 'array'
  LOOP
    v_val := v_attrs -> v_def.attr_key;
    v_txt := CASE WHEN jsonb_typeof(v_val) = 'string' THEN v_val #>> '{}'
                  WHEN jsonb_typeof(v_val) = 'object' AND jsonb_typeof(v_val->'value') = 'string'
                    THEN v_val->>'value' END;
    CONTINUE WHEN v_txt IS NULL;
    v_opt := NULL;
    SELECT o.value INTO v_opt
      FROM jsonb_array_elements(v_def.options) o
     WHERE o.value->>'value' = v_txt
     LIMIT 1;
    CONTINUE WHEN v_opt IS NULL OR jsonb_typeof(v_opt->'allowed') IS DISTINCT FROM 'object';
    FOR v_key IN SELECT k FROM jsonb_object_keys(v_opt->'allowed') k LOOP
      CONTINUE WHEN jsonb_typeof(v_opt->'allowed'->v_key) <> 'array';
      SELECT coalesce(jsonb_agg(x.value), '[]'::jsonb)
        INTO v_list
        FROM jsonb_array_elements(v_opt->'allowed'->v_key) x
       WHERE jsonb_typeof(x.value) = 'string'
         AND (NOT (v_allow ? v_key) OR (v_allow->v_key) @> jsonb_build_array(x.value));
      v_allow := v_allow || jsonb_build_object(v_key, v_list);
      v_contrib := v_contrib || jsonb_build_object(v_key,
        coalesce(v_contrib->v_key, '[]'::jsonb) || jsonb_build_array(v_def.attr_key));
    END LOOP;
  END LOOP;

  FOR v_def IN
    SELECT a.id, a.attr_key, a.attr_type, a.options, a.min_bound, a.max_bound,
           a.decimals, a.format, a.preset, a.max_length, a.depends_on,
           e.is_required, e.display_order,
           l.allowed_options, l.visible_when
      FROM public.effective_category_links(p_category_id) e
      JOIN public.attributes a ON a.id = e.attribute_id
      JOIN public.category_attribute_links l ON l.id = e.link_id
      ORDER BY e.display_order, a.attr_key
  LOOP
    v_val := v_attrs -> v_def.attr_key;

    IF v_def.visible_when IS NOT NULL
       AND NOT public.attr_visible_when_met(v_attrs, v_prior, v_def.visible_when) THEN
      CONTINUE;
    END IF;

    v_absent := v_val IS NULL
             OR jsonb_typeof(v_val) = 'null'
             OR (jsonb_typeof(v_val) = 'string' AND btrim(v_val #>> '{}') = '')
             OR (jsonb_typeof(v_val) = 'array' AND jsonb_array_length(v_val) = 0);

    IF v_absent THEN
      -- M6 / INC-374 — a key whose folded bounds are settled is not asked.
      IF v_def.is_required AND NOT (v_def.attr_key = ANY (coalesce(p_defer_keys, ARRAY[]::text[])))
         AND (v_folds->v_def.attr_key->'settled') IS DISTINCT FROM 'true'::jsonb THEN
        v_ref := v_ref || jsonb_build_array(
          jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'required'));
      END IF;
      CONTINUE;
    END IF;

    IF v_def.depends_on IS NOT NULL THEN
      SELECT p.attr_key INTO v_parent_key FROM public.attributes p WHERE p.id = v_def.depends_on;
      IF v_parent_key IS NOT NULL
         AND (v_attrs -> v_parent_key) IS NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object(
          'attr_key', v_def.attr_key, 'reason', 'dependentMissing', 'detail', v_parent_key));
        CONTINUE;
      END IF;
    END IF;

    v_allow_other := EXISTS (
      SELECT 1 FROM jsonb_array_elements(
        CASE WHEN jsonb_typeof(v_def.options) = 'array' THEN v_def.options ELSE '[]'::jsonb END) o
       WHERE o.value->>'value' = 'other');

    IF v_def.attr_type = 'text' THEN
      IF jsonb_typeof(v_val) <> 'string' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'text'));
        CONTINUE;
      END IF;
      v_txt := btrim(v_val #>> '{}');
      IF v_def.max_length IS NOT NULL AND char_length(v_txt) > v_def.max_length THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'tooLong', 'detail', v_def.max_length::text));
        CONTINUE;
      END IF;
      IF v_def.preset IS NOT NULL THEN
        v_bad := CASE
          WHEN v_def.preset ~ '^digits:[0-9]{1,2}$'
            THEN v_txt !~ ('^[0-9]{' || split_part(v_def.preset, ':', 2) || '}$')
          WHEN v_def.preset = 'vin'
            THEN char_length(v_txt) <> 17 OR upper(v_txt) !~ '^[A-HJ-NPR-Z0-9]{17}$'
          WHEN v_def.preset = 'plate-et'
            THEN upper(v_txt) !~ '^[0-9]{1,2}-[0-9]{4,6}-[A-Z]{2}$'
          WHEN v_def.preset ~ '^alnum:[0-9]{1,2}-[0-9]{1,2}$'
            THEN v_txt !~ ('^[A-Za-z0-9]{'
                 || split_part(split_part(v_def.preset, ':', 2), '-', 1) || ','
                 || split_part(split_part(v_def.preset, ':', 2), '-', 2) || '}$')
          WHEN v_def.preset ~ '^free:[0-9]{1,4}$'
            THEN char_length(v_txt) > (split_part(v_def.preset, ':', 2))::int
          ELSE false
        END;
        IF v_bad THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badPreset', 'detail', v_def.preset));
          CONTINUE;
        END IF;
      END IF;
      -- Part D — free text only. An identity preset (digits:n, vin, plate-et,
      -- alnum) is identity data and is never judged as a phone number.
      IF (v_def.preset IS NULL OR v_def.preset ~ '^free:') AND public.attr_contact_like(v_txt) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'contactInText'));
        CONTINUE;
      END IF;
      v_norm := v_norm || jsonb_build_object(v_def.attr_key, to_jsonb(v_txt));

    ELSIF v_def.attr_type = 'number' THEN
      IF jsonb_typeof(v_val) <> 'number' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'number'));
        CONTINUE;
      END IF;
      v_num := (v_val #>> '{}')::numeric;
      IF v_def.decimals IS NOT NULL AND scale(v_num) > v_def.decimals THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badDecimals', 'detail', v_def.decimals::text));
        CONTINUE;
      END IF;
      v_min := public.attr_bound_value(v_def.min_bound);
      v_max := public.attr_bound_value(v_def.max_bound);
      IF v_folds ? v_def.attr_key THEN
        v_min := greatest(v_min, NULLIF(v_folds->v_def.attr_key->>'min','')::numeric);
        v_max := least(v_max, NULLIF(v_folds->v_def.attr_key->>'max','')::numeric);
      END IF;
      IF (v_min IS NOT NULL AND v_num < v_min) OR (v_max IS NOT NULL AND v_num > v_max) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object(
          'attr_key', v_def.attr_key, 'reason', 'outOfBounds',
          'detail', coalesce(v_min::text,'-') || '..' || coalesce(v_max::text,'-')));
        CONTINUE;
      END IF;
      IF v_def.decimals IS NOT NULL THEN v_num := round(v_num, v_def.decimals); END IF;
      v_norm := v_norm || jsonb_build_object(v_def.attr_key, to_jsonb(v_num));

    ELSIF v_def.attr_type = 'boolean' THEN
      IF jsonb_typeof(v_val) <> 'boolean' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'boolean'));
        CONTINUE;
      END IF;
      v_norm := v_norm || jsonb_build_object(v_def.attr_key, v_val);

    ELSIF v_def.attr_type = 'date' THEN
      IF jsonb_typeof(v_val) <> 'string' OR (v_val #>> '{}') !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'date'));
        CONTINUE;
      END IF;
      v_norm := v_norm || jsonb_build_object(v_def.attr_key, to_jsonb(v_val #>> '{}'));

    ELSIF v_def.attr_type = 'range' THEN
      IF jsonb_typeof(v_val) <> 'object'
         OR jsonb_typeof(v_val->'min') <> 'number' OR jsonb_typeof(v_val->'max') <> 'number' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'range'));
        CONTINUE;
      END IF;
      v_norm := v_norm || jsonb_build_object(v_def.attr_key,
        jsonb_build_object('min', v_val->'min', 'max', v_val->'max'));

    ELSIF v_def.attr_type IN ('single_select','multi_select') THEN
      IF v_def.attr_type = 'single_select' THEN
        IF jsonb_typeof(v_val) = 'string' THEN
          v_list := jsonb_build_array(v_val);
        ELSIF jsonb_typeof(v_val) = 'object' AND jsonb_typeof(v_val->'value') = 'string' THEN
          v_list := jsonb_build_array(v_val->'value');
        ELSE
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'single_select'));
          CONTINUE;
        END IF;
      ELSE
        -- Part O — every element is a string, except at most ONE
        -- {"value":"other","text":…} object.
        IF jsonb_typeof(v_val) <> 'array'
           OR EXISTS (SELECT 1 FROM jsonb_array_elements(v_val) x
                       WHERE NOT (jsonb_typeof(x.value) = 'string'
                              OR (jsonb_typeof(x.value) = 'object' AND x.value->>'value' = 'other')))
           OR (SELECT count(*) FROM jsonb_array_elements(v_val) x WHERE jsonb_typeof(x.value) = 'object') > 1 THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'multi_select'));
          CONTINUE;
        END IF;
        v_list := to_jsonb(public.attr_answer_tokens(v_val));
        IF jsonb_array_length(v_list) > 20
           OR (SELECT count(DISTINCT x.value) FROM jsonb_array_elements(v_list) x) <> jsonb_array_length(v_list) THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badMulti'));
          CONTINUE;
        END IF;
      END IF;

      v_bad := false;
      v_seen := ARRAY[]::text[];
      FOR v_elem IN SELECT x.value FROM jsonb_array_elements(v_list) x LOOP
        v_txt := btrim(v_elem #>> '{}');
        SELECT true, coalesce((o.value->>'active')::boolean, true)
          INTO v_found, v_active
          FROM jsonb_array_elements(
                 CASE WHEN jsonb_typeof(v_def.options) = 'array' THEN v_def.options ELSE '[]'::jsonb END) o
         WHERE o.value->>'value' = v_txt
         LIMIT 1;
        IF NOT coalesce(v_found, false) THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'unknownOption', 'detail', v_txt));
          v_bad := true;
        ELSIF NOT v_active
              AND NOT (v_txt = ANY (public.attr_answer_tokens(v_prior -> v_def.attr_key))) THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'inactiveOption', 'detail', v_txt));
          v_bad := true;
        ELSIF v_def.allowed_options IS NOT NULL
              AND NOT (v_txt = ANY (v_def.allowed_options))
              AND NOT (v_txt = ANY (public.attr_answer_tokens(v_prior -> v_def.attr_key))) THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'optionNotAllowed', 'detail', v_txt));
          v_bad := true;
        -- Bundle 8 B1 / INC-477 — the chosen options' `allowed` fold; a stored
        -- combination this save leaves as it was is kept.
        ELSIF v_allow ? v_def.attr_key
              AND NOT ((v_allow->v_def.attr_key) @> jsonb_build_array(v_txt))
              AND NOT (v_txt = ANY (public.attr_answer_tokens(v_prior -> v_def.attr_key))
                AND NOT EXISTS (
                  SELECT 1 FROM jsonb_array_elements_text(v_contrib->v_def.attr_key) c(k)
                   WHERE (CASE WHEN jsonb_typeof(v_prior->c.k) = 'string' THEN v_prior->>c.k
                               WHEN jsonb_typeof(v_prior->c.k) = 'object'
                                AND jsonb_typeof(v_prior->c.k->'value') = 'string'
                                 THEN v_prior->c.k->>'value' END)
                         IS DISTINCT FROM
                         (CASE WHEN jsonb_typeof(v_attrs->c.k) = 'string' THEN v_attrs->>c.k
                               WHEN jsonb_typeof(v_attrs->c.k) = 'object'
                                AND jsonb_typeof(v_attrs->c.k->'value') = 'string'
                                 THEN v_attrs->c.k->>'value' END))) THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'optionNotAllowed', 'detail', v_txt));
          v_bad := true;
        END IF;
        v_seen := v_seen || v_txt;
        v_found := NULL; v_active := NULL;
      END LOOP;
      CONTINUE WHEN v_bad;

      IF 'other' = ANY (v_seen) AND v_allow_other THEN
        v_txt := btrim(coalesce(public.attr_answer_other_text(v_val), ''));
        IF v_txt = '' OR char_length(v_txt) > 120 THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'otherNeedsText'));
          CONTINUE;
        END IF;
        -- Bundle 2 step 3 — an Other write-in is free text: the phone rule
        -- applies, reason contactInText at this attribute.
        IF public.attr_contact_like(v_txt) THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'contactInText'));
          CONTINUE;
        END IF;
        IF v_def.attr_type = 'single_select' THEN
          v_norm := v_norm || jsonb_build_object(v_def.attr_key,
            jsonb_build_object('value', 'other', 'text', v_txt));
        ELSE
          v_norm := v_norm || jsonb_build_object(v_def.attr_key,
            (SELECT jsonb_agg(CASE WHEN u.t = 'other'
                                   THEN jsonb_build_object('value', 'other', 'text', v_txt)
                                   ELSE to_jsonb(u.t) END ORDER BY u.i)
               FROM unnest(v_seen) WITH ORDINALITY u(t, i)));
        END IF;
      ELSIF v_def.attr_type = 'single_select' THEN
        v_norm := v_norm || jsonb_build_object(v_def.attr_key, to_jsonb(v_seen[1]));
      ELSE
        v_norm := v_norm || jsonb_build_object(v_def.attr_key, to_jsonb(v_seen));
      END IF;

    ELSE
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', v_def.attr_type));
    END IF;
  END LOOP;

  IF jsonb_array_length(v_ref) > 0 THEN
    RETURN jsonb_build_object('ok', false, 'refusals', v_ref);
  END IF;
  RETURN jsonb_build_object('ok', true, 'attrs', v_norm);
END $m6$;
REVOKE ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) TO authenticated;
GRANT ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) TO service_role;
DO $proof$
DECLARE
  v_cat uuid;
  v_k text := 'e2e_mig_m13_' || substr(md5(random()::text), 1, 8);
  v_c text; v_p text; v_q text; v_r text; v_t text;
  v_res jsonb;
  v_opt jsonb;
  v_ids uuid[] := ARRAY[]::uuid[];
  v_id uuid;
BEGIN
  v_c := v_k || '_c'; v_p := v_k || '_p'; v_q := v_k || '_q'; v_r := v_k || '_r'; v_t := v_k || '_t';
  BEGIN
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings)
    VALUES (replace(v_k, '_', '-'), v_k, true, true) RETURNING id INTO v_cat;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options) VALUES
      (v_c, v_c, 'single_select', '[{"value":"a","label_en":"A"},{"value":"b","label_en":"B"},{"value":"c","label_en":"C"},{"value":"other","label_en":"Other"}]')
    RETURNING id INTO v_id;
    v_ids := v_ids || v_id;
    v_opt := jsonb_build_array(
      jsonb_build_object('value','p1','label_en','P1','allowed', jsonb_build_object(v_c, '["a","b"]'::jsonb)),
      jsonb_build_object('value','p2','label_en','P2','allowed', jsonb_build_object(v_c, '["a"]'::jsonb)));
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options) VALUES (v_p, v_p, 'single_select', v_opt) RETURNING id INTO v_id;
    v_ids := v_ids || v_id;
    v_opt := jsonb_build_array(
      jsonb_build_object('value','q1','label_en','Q1','allowed', jsonb_build_object(v_c, '["b","c"]'::jsonb)),
      jsonb_build_object('value','q2','label_en','Q2'));
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options) VALUES (v_q, v_q, 'single_select', v_opt) RETURNING id INTO v_id;
    v_ids := v_ids || v_id;
    v_opt := jsonb_build_array(
      jsonb_build_object('value','r1','label_en','R1','allowed', jsonb_build_object(v_c, '["a"]'::jsonb)));
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options) VALUES (v_r, v_r, 'multi_select', v_opt) RETURNING id INTO v_id;
    v_ids := v_ids || v_id;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, min_bound, max_bound, decimals)
    VALUES (v_t, v_t, 'number', '1', '999', 0) RETURNING id INTO v_id;
    v_ids := v_ids || v_id;
    INSERT INTO public.category_attribute_links (category_id, attribute_id, is_required, display_order)
    SELECT v_cat, u.id, false, u.n::int FROM unnest(v_ids) WITH ORDINALITY u(id, n);

    -- (1) P = p2 allows [a]: C = b refused at C.
    v_res := public.validate_listing_attributes(v_cat, jsonb_build_object(v_p,'p2', v_c,'b'), NULL);
    IF NOT (v_res->'refusals' @> jsonb_build_array(jsonb_build_object('attr_key',v_c,'reason','optionNotAllowed','detail','b'))) THEN
      RAISE EXCEPTION 'M13 B4 (1): not refused: %', v_res;
    END IF;
    -- (2) P = p2, C = a accepted.
    v_res := public.validate_listing_attributes(v_cat, jsonb_build_object(v_p,'p2', v_c,'a'), NULL);
    IF v_res->>'ok' <> 'true' THEN RAISE EXCEPTION 'M13 B4 (2): refused: %', v_res; END IF;
    -- (3) p1 [a,b] meets q1 [b,c]: a refused, b accepted.
    v_res := public.validate_listing_attributes(v_cat, jsonb_build_object(v_p,'p1', v_q,'q1', v_c,'a'), NULL);
    IF NOT (v_res->'refusals' @> jsonb_build_array(jsonb_build_object('attr_key',v_c,'reason','optionNotAllowed','detail','a'))) THEN
      RAISE EXCEPTION 'M13 B4 (3): a not refused: %', v_res;
    END IF;
    v_res := public.validate_listing_attributes(v_cat, jsonb_build_object(v_p,'p1', v_q,'q1', v_c,'b'), NULL);
    IF v_res->>'ok' <> 'true' THEN RAISE EXCEPTION 'M13 B4 (3): b refused: %', v_res; END IF;
    -- (5) a list answer contributes nothing.
    v_res := public.validate_listing_attributes(v_cat, jsonb_build_object(v_r,'["r1"]'::jsonb, v_c,'b'), NULL);
    IF v_res->>'ok' <> 'true' THEN RAISE EXCEPTION 'M13 B4 (5): refused: %', v_res; END IF;
    -- (6) stored P = p2, C = b: kept when P is left as stored; refused when P changes.
    v_res := public.validate_listing_attributes(v_cat, jsonb_build_object(v_p,'p2', v_c,'b', v_t,6),
      jsonb_build_object(v_p,'p2', v_c,'b', v_t,5));
    IF v_res->>'ok' <> 'true' THEN RAISE EXCEPTION 'M13 B4 (6) kept: refused: %', v_res; END IF;
    v_res := public.validate_listing_attributes(v_cat, jsonb_build_object(v_p,'p2', v_q,'q1', v_c,'b'),
      jsonb_build_object(v_p,'p2', v_c,'b'));
    IF NOT (v_res->'refusals' @> jsonb_build_array(jsonb_build_object('attr_key',v_c,'reason','optionNotAllowed','detail','b'))) THEN
      RAISE EXCEPTION 'M13 B4 (6) changed: not refused: %', v_res;
    END IF;
    -- (7) other is judged like any other value.
    v_res := public.validate_listing_attributes(v_cat,
      jsonb_build_object(v_p,'p2', v_c, jsonb_build_object('value','other','text','handmade')), NULL);
    IF NOT (v_res->'refusals' @> jsonb_build_array(jsonb_build_object('attr_key',v_c,'reason','optionNotAllowed','detail','other'))) THEN
      RAISE EXCEPTION 'M13 B4 (7): not refused: %', v_res;
    END IF;
    RAISE EXCEPTION USING ERRCODE='P0099', MESSAGE='e2e-mig-m13-proof-rollback';
  EXCEPTION WHEN SQLSTATE 'P0099' THEN
    IF SQLERRM <> 'e2e-mig-m13-proof-rollback' THEN RAISE; END IF;
  END;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p
    WHERE p.oid = 'public.validate_listing_attributes(uuid,jsonb,jsonb,text[])'::regprocedure
      AND p.prosecdef AND p.provolatile = 's' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'M13 B4: header facts changed';
  END IF;
  IF has_function_privilege('anon', 'public.validate_listing_attributes(uuid,jsonb,jsonb,text[])', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.validate_listing_attributes(uuid,jsonb,jsonb,text[])', 'EXECUTE') THEN
    RAISE EXCEPTION 'M13 B4: execute privileges differ';
  END IF;
END $proof$;
INSERT INTO public.migration_marks (version) VALUES ('20261008040000') ON CONFLICT (version) DO NOTHING;