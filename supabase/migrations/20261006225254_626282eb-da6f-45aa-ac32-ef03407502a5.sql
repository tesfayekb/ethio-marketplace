-- e2e-areas: posting
-- Bundle 7 Part C / M10: seller catalogue answers and ordered places.
-- Live: validator STABLE; other four VOLATILE; all SECURITY DEFINER, search_path=public.
-- UTC clock candidate 20261007000000; ledger candidate 20261007140000; chosen 20261007140000.
ALTER TABLE public.listing_locations ADD COLUMN IF NOT EXISTS position integer NOT NULL DEFAULT 1;
WITH ordered AS (
  SELECT ll.id, row_number() OVER (PARTITION BY ll.listing_id
    ORDER BY CASE WHEN ll.location_id = l.location_id THEN 0 ELSE 1 END, ll.created_at, ll.id)::integer AS position
    FROM public.listing_locations ll JOIN public.listings l ON l.id = ll.listing_id
)
UPDATE public.listing_locations ll SET position = o.position FROM ordered o WHERE ll.id = o.id;
REVOKE INSERT, UPDATE, DELETE ON public.listing_locations FROM authenticated;
DROP POLICY IF EXISTS listing_locations_owner_insert ON public.listing_locations;
DROP POLICY IF EXISTS listing_locations_owner_update ON public.listing_locations;
DROP POLICY IF EXISTS listing_locations_owner_delete ON public.listing_locations;
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
CREATE OR REPLACE FUNCTION public.get_attribute_options(p_attribute_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_opts jsonb;
  v_found boolean;
  v_rate  jsonb;
BEGIN
  -- M5 step 20 — every read counts under options_read; the function is
  -- VOLATILE on purpose because rate_gate writes the meter.
  v_rate := public.rate_gate('options_read');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RAISE EXCEPTION 'rateLimited';
  END IF;

  SELECT true,
         coalesce((
           SELECT jsonb_agg(
                    jsonb_strip_nulls(jsonb_build_object(
                      'value',    o.value->>'value',
                      'label_en', o.value->>'label_en',
                      'label_am', o.value->>'label_am',
                      'parent',   o.value->>'parent',
                      'aliases',  CASE WHEN jsonb_typeof(o.value->'aliases') = 'array' THEN o.value->'aliases' END,
                      'bounds',   CASE WHEN jsonb_typeof(o.value->'bounds')  = 'object' THEN o.value->'bounds' END,
                      'allowed',  CASE WHEN jsonb_typeof(o.value->'allowed') = 'object' THEN o.value->'allowed' END,
                      'facts',    CASE WHEN jsonb_typeof(o.value->'facts')   = 'object' THEN o.value->'facts' END,
                      -- D28 / M-SWATCH — the declared colour, projected for the
                      -- posting form. A non-string cell is silence (the shape
                      -- rule refuses one at the door).
                      'swatch',   CASE WHEN jsonb_typeof(o.value->'swatch')  = 'string' THEN o.value->'swatch' END
                    ))
                    ORDER BY o.ordinality)
             FROM jsonb_array_elements(
                    CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END)
                  WITH ORDINALITY o(value, ordinality)
            WHERE coalesce((o.value->>'active')::boolean, true)
         ), '[]'::jsonb)
    INTO v_found, v_opts
    FROM public.attributes a
   WHERE a.id = p_attribute_id;

  IF NOT coalesce(v_found, false) THEN
    RAISE EXCEPTION 'attributeNotFound';
  END IF;

  RETURN jsonb_build_object(
    'options', v_opts,
    'version', public.get_attribute_options_version(p_attribute_id),
    'retired', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'value', o.value->>'value', 'label_en', o.value->>'label_en',
        'label_am', o.value->>'label_am') ORDER BY o.ordinality)
        FROM public.attributes a
        CROSS JOIN LATERAL jsonb_array_elements(
          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END)
          WITH ORDINALITY o(value, ordinality)
       WHERE a.id = p_attribute_id AND (o.value->>'active')::boolean = false
    ), '[]'::jsonb)
  );
END $function$;
REVOKE ALL ON FUNCTION public.get_attribute_options(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_attribute_options(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_attribute_options(uuid) TO service_role;
CREATE OR REPLACE FUNCTION public.submit_listing(p_listing_id uuid, p_step smallint, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_price_bp integer DEFAULT NULL::integer, p_price_negotiable boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_obs    char(2);
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_step   smallint;
  v_id     uuid;
  v_before jsonb;
  v_after  jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_key    text;
  v_rate   jsonb;
BEGIN
  -- F5: gates -> capture -> mutate. A refusal writes nothing.
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;

  v_rate := public.rate_gate('draft');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited',
                         'resets_at', v_rate->>'resets_at')));
  END IF;

  IF p_step IS NULL OR p_step < 1 OR p_step > 8 THEN RAISE EXCEPTION 'unknown step'; END IF;

  IF p_listing_id IS NOT NULL THEN
    SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
    IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
    IF v_prev.status <> 'draft' THEN
      RAISE EXCEPTION 'only a draft is writable here; a live listing edits through edit_listing';
    END IF;
  END IF;

  -- DEC-068: residency is a server fact, never client-supplied.
  SELECT d.observed_country_code INTO v_obs FROM public.user_directory d WHERE d.user_id = v_uid;
  IF v_obs IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','residency','reason','residencyUnknown')));
  END IF;

  v_step := greatest(coalesce(v_prev.draft_step, 0::smallint), p_step);

  v_val := public.validate_listing_draft(v_uid, p_step, p_category_id, p_title, p_description,
             p_video_url, p_attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, p_poster_expires_at, p_coverage, p_contact_pref,
             coalesce(v_prev.attributes, '{}'::jsonb), p_price_bp, p_price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  IF p_listing_id IS NULL THEN
    INSERT INTO public.listings (
      seller_id, category_id, location_id, title, description, attributes,
      price_amount, price_currency, price_bp, price_negotiable, price_mode, price_period, poster_expires_at,
      video_url, contact_pref, status, home_country_code, draft_step, draft_updated_at,
      price_unit, price_unit_text
    ) VALUES (
      v_uid, p_category_id, (v_val->>'location_id')::uuid, v_val->>'title', v_val->>'description',
      v_val->'attrs', (v_val->>'price_amount')::numeric, (v_val->>'price_currency')::char(3),
      (v_val->>'price_bp')::int, coalesce((v_val->>'price_negotiable')::boolean, false), v_val->>'price_mode', v_val->>'price_period', p_poster_expires_at,
      p_video_url, coalesce(p_contact_pref, '{"messages": true}'::jsonb), 'draft', v_obs,
      v_step, now(),
      v_val->>'price_unit', v_val->>'price_unit_text'
    ) RETURNING * INTO v_row;
    v_id := v_row.id;
  ELSE
    UPDATE public.listings SET
      category_id       = p_category_id,
      location_id       = coalesce((v_val->>'location_id')::uuid, location_id),
      title             = v_val->>'title',
      description       = v_val->>'description',
      attributes        = v_val->'attrs',
      price_amount      = (v_val->>'price_amount')::numeric,
      price_currency    = (v_val->>'price_currency')::char(3),
      price_bp          = (v_val->>'price_bp')::int,
      price_negotiable  = coalesce((v_val->>'price_negotiable')::boolean, false),
      price_mode        = v_val->>'price_mode',
      price_period      = v_val->>'price_period',
      poster_expires_at = p_poster_expires_at,
      video_url         = p_video_url,
      contact_pref      = coalesce(p_contact_pref, contact_pref),
      price_unit        = v_val->>'price_unit',
      price_unit_text   = v_val->>'price_unit_text',
      home_country_code = v_obs,
      draft_step        = v_step,
      draft_updated_at  = now(),
      updated_at        = now()
    WHERE id = p_listing_id
    RETURNING * INTO v_row;
    -- INC-324: the row is locked for the save; a delete that won the race is
    -- answered as not found, never as a null write.
    IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
    v_id := v_row.id;
  END IF;

  -- Coverage replaces wholesale (batch) once step 6 has spoken.
  IF p_coverage IS NOT NULL AND array_length(p_coverage, 1) IS NOT NULL THEN
    DELETE FROM public.listing_locations WHERE listing_id = v_id;
    INSERT INTO public.listing_locations (listing_id, location_id, position)
      SELECT v_id, c.id, row_number() OVER (ORDER BY c.first_position)::integer
        FROM (SELECT u.id, min(u.ordinality) AS first_position
                FROM unnest(p_coverage) WITH ORDINALITY u(id, ordinality)
               GROUP BY u.id) c
      ON CONFLICT DO NOTHING;
  END IF;

  -- Revision: the changed fields only.
  v_after  := to_jsonb(v_row) - 'search_tsv';
  v_before := CASE WHEN p_listing_id IS NULL THEN NULL ELSE to_jsonb(v_prev) - 'search_tsv' END;
  IF v_before IS NOT NULL THEN
    FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
      IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
        v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
        v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
      END IF;
    END LOOP;
  ELSE
    v_diff_a := v_after;
    v_diff_b := NULL;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (v_id, v_uid, CASE WHEN p_listing_id IS NULL THEN 'create' ELSE 'edit' END,
            v_diff_b, v_diff_a, v_uid);

  -- INC-321 — the answer names the currency the door stored (its own home fill
  -- included) so the client can mirror it; nothing else in the answer changes.
  RETURN jsonb_build_object('ok', true, 'listing_id', v_id, 'draft_step', v_step,
                            'price_currency', v_row.price_currency);
END $function$;
REVOKE ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO service_role;
CREATE OR REPLACE FUNCTION public.edit_listing(p_listing_id uuid, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_price_bp integer DEFAULT NULL::integer, p_price_negotiable boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_before jsonb;
  v_after  jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  v_key    text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_prev.status NOT IN ('active','reduced','rejected','held','expired') THEN
    RAISE EXCEPTION 'edit_listing takes a published listing; a draft writes through submit_listing';
  END IF;

  -- M5 — the judge at step 8 also refuses an unnamed seller and an
  -- unconfirmed home country, with the same fields as on publish.
  v_val := public.validate_listing_draft(v_uid, 8::smallint, p_category_id, p_title, p_description,
             p_video_url, p_attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, p_poster_expires_at, p_coverage, p_contact_pref, v_prev.attributes,
             p_price_bp, p_price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  UPDATE public.listings SET
    category_id       = p_category_id,
    location_id       = (v_val->>'location_id')::uuid,
    title             = v_val->>'title',
    description       = v_val->>'description',
    attributes        = v_val->'attrs',
    price_amount      = (v_val->>'price_amount')::numeric,
    price_currency    = (v_val->>'price_currency')::char(3),
    price_mode        = v_val->>'price_mode',
    price_period      = v_val->>'price_period',
    price_bp          = (v_val->>'price_bp')::integer,
    price_negotiable  = coalesce((v_val->>'price_negotiable')::boolean, false),
    poster_expires_at = p_poster_expires_at,
    video_url         = p_video_url,
    contact_pref      = p_contact_pref,
    -- M5 / DEC-109 — the unit the ad is sold per, from the basis in force.
    price_unit        = v_val->>'price_unit',
    price_unit_text   = v_val->>'price_unit_text',
    status            = 'screening',
    updated_at        = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;
  INSERT INTO public.listing_locations (listing_id, location_id, position)
      SELECT p_listing_id, c.id, row_number() OVER (ORDER BY c.first_position)::integer
        FROM (SELECT u.id, min(u.ordinality) AS first_position
                FROM unnest(p_coverage) WITH ORDINALITY u(id, ordinality)
               GROUP BY u.id) c ON CONFLICT DO NOTHING;

  v_after  := to_jsonb(v_row) - 'search_tsv';
  v_before := to_jsonb(v_prev) - 'search_tsv';
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'edit', v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $function$;
REVOKE ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO service_role;
CREATE OR REPLACE FUNCTION public.save_seller_place(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_loc  uuid;
  v_rate jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  v_rate := public.rate_gate('draft');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at')));
  END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  -- The ad's first place: the listing's own place, else its first coverage row.
  v_loc := coalesce(v_row.location_id,
    (SELECT ll.location_id FROM public.listing_locations ll
      WHERE ll.listing_id = p_listing_id ORDER BY ll.position, ll.created_at, ll.id LIMIT 1));
  IF v_loc IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'coverage', 'reason', 'required')));
  END IF;
  INSERT INTO public.seller_places AS s (user_id, location_id, pin_lat, pin_lng, pin_precision, pin_zoom,
                                         street_address, directions, home_country_code, updated_at)
  VALUES (v_uid, v_loc, v_row.pin_lat, v_row.pin_lng, v_row.pin_precision, v_row.pin_zoom,
          v_row.street_address, v_row.directions,
          (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid), now())
  ON CONFLICT (user_id) DO UPDATE SET
    location_id = EXCLUDED.location_id, pin_lat = EXCLUDED.pin_lat, pin_lng = EXCLUDED.pin_lng,
    pin_precision = EXCLUDED.pin_precision, pin_zoom = EXCLUDED.pin_zoom,
    street_address = EXCLUDED.street_address, directions = EXCLUDED.directions,
    home_country_code = EXCLUDED.home_country_code, updated_at = now();
  RETURN jsonb_build_object('ok', true);
END $function$;
REVOKE ALL ON FUNCTION public.save_seller_place(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_seller_place(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.save_seller_place(uuid) TO service_role;
CREATE OR REPLACE FUNCTION public.my_recent_categories()
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN jsonb_build_object('categories', coalesce((
    SELECT jsonb_agg(jsonb_build_object('id', c.category_id, 'ads', c.ads)
      ORDER BY c.ads DESC, c.latest DESC, c.category_id)
      FROM (
        SELECT l.category_id, count(*)::integer AS ads, max(l.published_first_at) AS latest
          FROM public.listings l JOIN public.categories cat ON cat.id = l.category_id
         WHERE l.seller_id = v_uid AND l.published_first_at IS NOT NULL
           AND cat.is_active AND cat.allow_listings
           AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers ptr WHERE ptr.parent_id = cat.id)
         GROUP BY l.category_id
         ORDER BY count(*) DESC, max(l.published_first_at) DESC, l.category_id
         LIMIT 5
      ) c
  ), '[]'::jsonb));
END $function$;
REVOKE ALL ON FUNCTION public.my_recent_categories() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_recent_categories() TO authenticated;
GRANT ALL ON FUNCTION public.my_recent_categories() TO service_role;
-- Proofs borrow no identity or reference row. The C4 ownership/order proof
-- uses PR-39 with leased accounts (operator ruling, 2026-10-06).
DO $proof$
DECLARE
  v_cat uuid;
  v_text uuid;
  v_select uuid;
  v_multi uuid;
  v_key text := 'e2e-mig-m10-' || substr(md5(random()::text), 1, 8);
  v_res jsonb;
BEGIN
  BEGIN
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings)
    VALUES (v_key, v_key, true, true) RETURNING id INTO v_cat;
    INSERT INTO public.attributes (attr_key, name_en, attr_type)
    VALUES (v_key || '-text', v_key, 'text') RETURNING id INTO v_text;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
    VALUES (v_key || '-select', v_key, 'single_select',
      '[{"value":"kept","label_en":"Kept"},{"value":"off","label_en":"Off","label_am":"Off AM","active":false},{"value":"other","label_en":"Other"}]')
    RETURNING id INTO v_select;
    INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
    VALUES (v_key || '-multi', v_key, 'multi_select',
      '[{"value":"kept","label_en":"Kept"},{"value":"other","label_en":"Other"}]')
    RETURNING id INTO v_multi;
    INSERT INTO public.category_attribute_links (category_id, attribute_id, is_required, display_order)
    VALUES (v_cat, v_text, false, 1), (v_cat, v_select, false, 2), (v_cat, v_multi, false, 3);
    DELETE FROM public.category_attribute_links WHERE category_id = v_cat AND attribute_id = v_text;
    v_res := public.validate_listing_attributes(v_cat,
      jsonb_build_object(v_key || '-text', 'held'), jsonb_build_object(v_key || '-text', 'held'));
    IF v_res->>'ok' <> 'true' OR v_res->'attrs' ? (v_key || '-text') THEN
      RAISE EXCEPTION 'M10 C1: removed prior key not released: %', v_res;
    END IF;
    v_res := public.validate_listing_attributes(v_cat,
      jsonb_build_object(v_key || '-text', 'held'), '{}'::jsonb);
    IF NOT (v_res->'refusals' @> jsonb_build_array(jsonb_build_object('attr_key', v_key || '-text', 'reason','unknownAttribute'))) THEN
      RAISE EXCEPTION 'M10 C1: new unknown key not refused: %', v_res;
    END IF;
    v_res := public.validate_listing_attributes(v_cat,
      jsonb_build_object(v_key || '-select', 'removed'), jsonb_build_object(v_key || '-select', 'removed'));
    IF v_res->>'ok' <> 'true' OR v_res->'attrs' ? (v_key || '-select') THEN
      RAISE EXCEPTION 'M10 C1: removed prior value not released: %', v_res;
    END IF;
    UPDATE public.category_attribute_links SET is_required = true WHERE category_id = v_cat AND attribute_id = v_select;
    v_res := public.validate_listing_attributes(v_cat,
      jsonb_build_object(v_key || '-select', 'removed'), jsonb_build_object(v_key || '-select', 'removed'));
    IF v_res->'refusals' <> jsonb_build_array(jsonb_build_object('attr_key', v_key || '-select', 'reason','required')) THEN
      RAISE EXCEPTION 'M10 C1: required did not ask again: %', v_res;
    END IF;
    UPDATE public.category_attribute_links SET is_required = false WHERE category_id = v_cat AND attribute_id = v_select;
    v_res := public.validate_listing_attributes(v_cat,
      jsonb_build_object(v_key || '-select', 'removed'), '{}'::jsonb);
    IF NOT (v_res->'refusals' @> jsonb_build_array(jsonb_build_object('attr_key', v_key || '-select', 'reason','unknownOption','detail','removed'))) THEN
      RAISE EXCEPTION 'M10 C1: new unknown option not refused: %', v_res;
    END IF;
    v_res := public.validate_listing_attributes(v_cat,
      jsonb_build_object(v_key || '-select', 'off'), jsonb_build_object(v_key || '-select', 'off'));
    IF v_res->>'ok' <> 'true' OR v_res->'attrs'->>(v_key || '-select') <> 'off' THEN
      RAISE EXCEPTION 'M10 C1: switched-off held answer not kept: %', v_res;
    END IF;
    v_res := public.validate_listing_attributes(v_cat,
      jsonb_build_object(v_key || '-multi', jsonb_build_array('removed','kept',jsonb_build_object('value','other','text','handmade'))),
      jsonb_build_object(v_key || '-multi', jsonb_build_array('removed','kept',jsonb_build_object('value','other','text','handmade'))));
    IF v_res->>'ok' <> 'true' OR v_res->'attrs'->(v_key || '-multi') <>
      jsonb_build_array('kept',jsonb_build_object('value','other','text','handmade')) THEN
      RAISE EXCEPTION 'M10 C1: multiple picks/other changed: %', v_res;
    END IF;
    v_res := public.get_attribute_options(v_select);
    IF v_res->'options' @> '[{"value":"off"}]'::jsonb
       OR NOT (v_res->'options' @> '[{"value":"kept"}]'::jsonb)
       OR v_res->'retired' <> '[{"value":"off","label_en":"Off","label_am":"Off AM"}]'::jsonb THEN
      RAISE EXCEPTION 'M10 C2: offered/retired projection differs: %', v_res;
    END IF;
    RAISE EXCEPTION USING ERRCODE='P0099', MESSAGE='e2e-mig-m10-proof-rollback';
  EXCEPTION WHEN SQLSTATE 'P0099' THEN
    IF SQLERRM <> 'e2e-mig-m10-proof-rollback' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  BEGIN
    PERFORM public.my_recent_categories();
    RAISE EXCEPTION USING ERRCODE='P0098', MESSAGE='M10 C4: no caller accepted';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
  END;
  IF NOT EXISTS (SELECT 1 FROM pg_attribute WHERE attrelid='public.listing_locations'::regclass
    AND attname='position' AND attnotnull AND NOT attisdropped) THEN
    RAISE EXCEPTION 'M10 C3: position must be NOT NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM public.listing_locations GROUP BY listing_id
    HAVING min(position) <> 1 OR max(position) <> count(*) OR count(DISTINCT position) <> count(*)) THEN
    RAISE EXCEPTION 'M10 C3: positions have gaps/repeats/nonpositive values';
  END IF;
  IF has_table_privilege('authenticated','public.listing_locations','INSERT')
     OR has_table_privilege('authenticated','public.listing_locations','UPDATE')
     OR has_table_privilege('authenticated','public.listing_locations','DELETE')
     OR NOT has_table_privilege('authenticated','public.listing_locations','SELECT') THEN
    RAISE EXCEPTION 'M10: place table privileges differ';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='listing_locations'
    AND policyname IN ('listing_locations_owner_insert','listing_locations_owner_update','listing_locations_owner_delete')) THEN
    RAISE EXCEPTION 'M10: place write policy remains';
  END IF;
  IF (SELECT count(*) FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
    WHERE n.nspname='public' AND p.proname IN ('validate_listing_attributes','get_attribute_options','submit_listing','edit_listing','save_seller_place')
      AND p.prosecdef AND p.proconfig = ARRAY['search_path=public']
      AND p.provolatile = CASE WHEN p.proname='validate_listing_attributes' THEN 's'::"char" ELSE 'v'::"char" END) <> 5 THEN
    RAISE EXCEPTION 'M10: live header facts changed';
  END IF;
END $proof$;
INSERT INTO public.migration_marks (version) VALUES ('20261007140000') ON CONFLICT (version) DO NOTHING;