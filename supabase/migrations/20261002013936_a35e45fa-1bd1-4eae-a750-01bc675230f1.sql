-- D + L + M (+ S2 DB, Part O shared reader). Bases read live on ethio-prod:
-- validate_listing_attributes 5f42fd71… · set_listing_pin 624cb19a… · catalog_find 00d3e036…
-- attr_visible_when_met 54a3513d… · listings_search_tsv_refresh ad441449…

-- ── Part O: ONE shared reader of an answer's shape ─────────────────────────
CREATE OR REPLACE FUNCTION public.attr_answer_tokens(p_val jsonb)
RETURNS text[] LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT CASE jsonb_typeof(p_val)
    WHEN 'string' THEN ARRAY[p_val #>> '{}']
    WHEN 'object' THEN CASE WHEN jsonb_typeof(p_val->'value') = 'string'
                            THEN ARRAY[p_val->>'value'] ELSE ARRAY[]::text[] END
    WHEN 'array' THEN coalesce((
      SELECT array_agg(CASE jsonb_typeof(x) WHEN 'string' THEN x #>> '{}' ELSE x->>'value' END ORDER BY i)
        FROM jsonb_array_elements(p_val) WITH ORDINALITY e(x, i)
       WHERE jsonb_typeof(x) = 'string'
          OR (jsonb_typeof(x) = 'object' AND jsonb_typeof(x->'value') = 'string')), ARRAY[]::text[])
    ELSE ARRAY[]::text[] END;
$$;
REVOKE ALL ON FUNCTION public.attr_answer_tokens(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_answer_tokens(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_answer_tokens(jsonb) TO service_role;

CREATE OR REPLACE FUNCTION public.attr_answer_other_text(p_val jsonb)
RETURNS text LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT CASE jsonb_typeof(p_val)
    WHEN 'object' THEN CASE WHEN jsonb_typeof(p_val->'text') = 'string' THEN p_val->>'text' END
    WHEN 'array' THEN (SELECT x->>'text' FROM jsonb_array_elements(p_val) WITH ORDINALITY e(x, i)
                        WHERE jsonb_typeof(x) = 'object' AND jsonb_typeof(x->'text') = 'string'
                        ORDER BY i LIMIT 1)
    ELSE NULL END;
$$;
REVOKE ALL ON FUNCTION public.attr_answer_other_text(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_answer_other_text(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_answer_other_text(jsonb) TO service_role;

-- ── Part D: phone-like run — 7+ digits allowing spaces . - ( ) and a leading + ─
CREATE OR REPLACE FUNCTION public.attr_contact_like(p_text text)
RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT coalesce(p_text, '') ~ '[0-9]([ .()-]*[0-9]){6,}';
$$;
REVOKE ALL ON FUNCTION public.attr_contact_like(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_contact_like(text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_contact_like(text) TO service_role;

-- ── Part O readers (1/3): show-when rules ──────────────────────────────────
CREATE OR REPLACE FUNCTION public.attr_visible_when_met(p_attrs jsonb, p_prior jsonb, p_vw jsonb)
RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT CASE
    WHEN p_vw IS NULL OR jsonb_typeof(p_vw) = 'null' THEN true
    ELSE EXISTS (
      SELECT 1
        FROM (SELECT COALESCE(p_attrs -> (p_vw->>'key'), p_prior -> (p_vw->>'key')) AS val) x,
             jsonb_array_elements_text(p_vw->'in') AS t(v)
       WHERE x.val IS NOT NULL
         AND t.v = ANY (public.attr_answer_tokens(x.val)))
  END;
$$;
REVOKE ALL ON FUNCTION public.attr_visible_when_met(jsonb, jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_visible_when_met(jsonb, jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_visible_when_met(jsonb, jsonb, jsonb) TO service_role;

-- ── Part O readers (2/3): listing search text (trigger helper, invoker) ────
CREATE OR REPLACE FUNCTION public.listings_search_tsv_refresh()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $function$
DECLARE
  v_attr_text text;
BEGIN
  SELECT coalesce(string_agg(t.txt, ' '), '')
    INTO v_attr_text
    FROM (
      SELECT CASE
               WHEN jsonb_typeof(e.value) = 'string' THEN e.value #>> '{}'
               WHEN jsonb_typeof(e.value) = 'array' THEN btrim(
                 coalesce((SELECT string_agg(x #>> '{}', ' ')
                             FROM jsonb_array_elements(e.value) x
                            WHERE jsonb_typeof(x) = 'string'), '')
                 || ' ' || coalesce(public.attr_answer_other_text(e.value), ''))
               WHEN jsonb_typeof(e.value) = 'object' THEN public.attr_answer_other_text(e.value)
               ELSE NULL
             END AS txt
        FROM jsonb_each(CASE WHEN jsonb_typeof(NEW.attributes) = 'object'
                             THEN NEW.attributes ELSE '{}'::jsonb END) e
    ) t
   WHERE t.txt IS NOT NULL AND t.txt <> '';

  NEW.search_tsv :=
      setweight(to_tsvector('simple', coalesce(NEW.title, '')), 'A')
   || setweight(to_tsvector('simple', coalesce(NEW.description, '')), 'B')
   || setweight(to_tsvector('simple', v_attr_text), 'C');
  RETURN NEW;
END $function$;

-- ── Part O readers (3/3) + Part D: the answers door, whole ──────────────────
CREATE OR REPLACE FUNCTION public.validate_listing_attributes(p_category_id uuid, p_attrs jsonb, p_prior jsonb DEFAULT NULL::jsonb, p_defer_keys text[] DEFAULT NULL::text[])
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
BEGIN
  SELECT array_agg(a.attr_key)
    INTO v_keys
    FROM public.effective_category_links(p_category_id) e
    JOIN public.attributes a ON a.id = e.attribute_id;
  v_keys := coalesce(v_keys, ARRAY[]::text[]);

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
          IF v_folds ? v_key THEN
            v_bmin := greatest(v_bmin, NULLIF(v_folds->v_key->>'min','')::numeric);
            v_bmax := least(v_bmax, NULLIF(v_folds->v_key->>'max','')::numeric);
          END IF;
          v_folds := v_folds || jsonb_build_object(v_key,
            jsonb_strip_nulls(jsonb_build_object('min', v_bmin, 'max', v_bmax)));
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
      IF v_def.is_required AND NOT (v_def.attr_key = ANY (coalesce(p_defer_keys, ARRAY[]::text[]))) THEN
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
END $function$;
REVOKE ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) TO authenticated;
GRANT ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) TO service_role;

-- ── Part L: the pin's zoom ──────────────────────────────────────────────────
ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS pin_zoom smallint;
ALTER TABLE public.listings ADD CONSTRAINT listings_pin_zoom_check
  CHECK ((pin_zoom IS NULL) OR ((pin_lat IS NOT NULL) AND (pin_zoom >= 3) AND (pin_zoom <= 20)));

DROP FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text);
CREATE FUNCTION public.set_listing_pin(p_listing_id uuid, p_lat numeric DEFAULT NULL::numeric, p_lng numeric DEFAULT NULL::numeric, p_precision text DEFAULT NULL::text, p_street text DEFAULT NULL::text, p_zoom smallint DEFAULT NULL::smallint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_row    public.listings%ROWTYPE;
  v_lat    numeric;
  v_lng    numeric;
  v_prec   text;
  v_street text;
  v_zoom   smallint;
  v_before jsonb;
  v_after  jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  SELECT * INTO v_row FROM public.listings
   WHERE id = p_listing_id AND seller_id = v_uid;
  IF v_row.id IS NULL THEN RAISE EXCEPTION 'not your listing'; END IF;

  IF v_row.status NOT IN ('draft','active','reduced','rejected','held','expired') THEN
    RAISE EXCEPTION 'pinNotEditable:%', v_row.status;
  END IF;

  v_street := nullif(btrim(regexp_replace(
                regexp_replace(coalesce(p_street, ''), '[[:cntrl:]<>]', ' ', 'g'),
                '\s+', ' ', 'g')), '');
  IF v_street IS NOT NULL AND char_length(v_street) > 200 THEN
    RAISE EXCEPTION 'streetTooLong:%', char_length(v_street);
  END IF;
  IF v_street IS NOT NULL AND public.attr_contact_like(v_street) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;

  IF p_lat IS NULL OR p_lng IS NULL THEN
    v_lat := NULL; v_lng := NULL; v_prec := NULL; v_zoom := NULL;
  ELSE
    IF p_lat < -90 OR p_lat > 90 THEN
      RAISE EXCEPTION 'badLatitude:%', p_lat;
    END IF;
    IF p_lng < -180 OR p_lng > 180 THEN
      RAISE EXCEPTION 'badLongitude:%', p_lng;
    END IF;
    v_prec := lower(btrim(coalesce(p_precision, 'exact')));
    IF v_prec NOT IN ('exact','approx') THEN
      RAISE EXCEPTION 'badPrecision:%', v_prec;
    END IF;
    IF p_zoom IS NOT NULL AND (p_zoom < 3 OR p_zoom > 20) THEN
      RAISE EXCEPTION 'badZoom:%', p_zoom;
    END IF;
    v_lat := round(p_lat, 6);
    v_lng := round(p_lng, 6);
    -- A re-sent pin without a zoom keeps the zoom it was saved at.
    v_zoom := coalesce(p_zoom, CASE WHEN v_row.pin_lat IS NOT NULL THEN v_row.pin_zoom END);
  END IF;

  v_before := jsonb_build_object('pin_lat', v_row.pin_lat, 'pin_lng', v_row.pin_lng,
                                 'pin_precision', v_row.pin_precision, 'pin_zoom', v_row.pin_zoom,
                                 'street_address', v_row.street_address);
  v_after  := jsonb_build_object('pin_lat', v_lat, 'pin_lng', v_lng,
                                 'pin_precision', v_prec, 'pin_zoom', v_zoom,
                                 'street_address', v_street);

  UPDATE public.listings
     SET pin_lat = v_lat, pin_lng = v_lng, pin_precision = v_prec, pin_zoom = v_zoom,
         street_address = v_street, updated_at = now()
   WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
  VALUES (p_listing_id, v_uid, 'edit', v_before, v_after, v_uid);

  RETURN jsonb_build_object('ok', true) || v_after;
END $function$;
REVOKE ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint) TO service_role;

-- ── Part M: other-food joins the catch-all pattern ─────────────────────────
UPDATE public.categories SET is_catchall = true, display_order = 999
 WHERE slug = 'other-food' AND is_catchall = false;
UPDATE public.category_tree_pointers p SET display_order = 1000999
  FROM public.categories c
 WHERE c.id = p.child_id AND c.slug = 'other-food' AND p.display_order <> 1000999;

-- ── S2: a visitor's search never rebuilds (INC-273) ─────────────────────────
CREATE OR REPLACE FUNCTION public.catalog_find(q text, lang text, lim integer DEFAULT 8)
 RETURNS TABLE(leaf_id uuid, slug text, path text[], icon text, matches jsonb, score numeric)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
#variable_conflict use_column
DECLARE v_q text:=catalog_find.q; v_lang text:=catalog_find.lang; v_lim integer:=catalog_find.lim;
BEGIN
 IF v_q IS NULL OR char_length(btrim(v_q))<2 OR char_length(v_q)>64 THEN RETURN; END IF;
 IF v_lim IS NULL OR v_lim<1 OR v_lim>8 THEN RAISE EXCEPTION 'badLimit' USING ERRCODE='22023'; END IF;
 IF v_lang IS NULL OR v_lang !~ '^[a-z]{2,3}$' THEN RAISE EXCEPTION 'badLang' USING ERRCODE='22023'; END IF;
 -- S2: answers from the current index; rebuilds happen after commits and in the sweep.
 RETURN QUERY WITH terms AS (SELECT DISTINCT t FROM unnest(regexp_split_to_array(public.catalog_find_norm(v_q),' ')) t WHERE char_length(t)>=2 LIMIT 6),
 lex AS (SELECT tr.t,x.term_norm,CASE WHEN x.term_norm=tr.t THEN 3.0 WHEN x.term_norm LIKE tr.t||'%' OR x.term_norm LIKE '% '||tr.t||'%' THEN 2.0 ELSE similarity(x.term_norm,tr.t)::numeric END m
  FROM terms tr JOIN public.catalog_find_terms x ON char_length(tr.t)>=3 AND (x.term_norm % tr.t OR x.term_norm LIKE '%'||tr.t||'%')
  UNION ALL SELECT tr.t,x.term_norm,CASE WHEN x.term_norm=tr.t THEN 3.0 ELSE 2.0 END::numeric FROM terms tr JOIN public.catalog_find_terms x ON char_length(tr.t)=2 AND x.term_norm LIKE tr.t||'%'),
 hits AS (SELECT l.t,i.category_id,i.attribute_key,i.option_value,(l.m*1000+CASE WHEN i.lang=v_lang THEN 150 ELSE 0 END+i.weight/4.0)::numeric pts FROM lex l JOIN public.catalog_find_index i ON i.term_norm=l.term_norm WHERE l.m>=0.3),
 best AS (SELECT DISTINCT ON (h.category_id,h.t) h.category_id,h.t,h.pts,h.attribute_key,h.option_value FROM hits h ORDER BY h.category_id,h.t,h.pts DESC,h.attribute_key NULLS FIRST),
 leafs AS (SELECT b.category_id,count(*) n,sum(b.pts) s,coalesce(jsonb_agg(DISTINCT jsonb_build_object('key',b.attribute_key,'value',b.option_value)) FILTER (WHERE b.option_value IS NOT NULL),'[]'::jsonb) pairs FROM best b GROUP BY b.category_id),
 top AS (SELECT l.* FROM leafs l ORDER BY l.n DESC,l.s DESC LIMIT 16),
 ranked AS (SELECT l.*,coalesce(x.lc,0) lc FROM top l LEFT JOIN LATERAL (SELECT count(*) lc FROM public.listings x WHERE x.category_id=l.category_id AND x.status='active') x ON true)
 SELECT r.category_id,c.slug,public.catalog_find_path(r.category_id,v_lang),c.icon,r.pairs,round(r.s,1) FROM ranked r JOIN public.categories c ON c.id=r.category_id ORDER BY r.n DESC,r.s DESC,r.lc DESC,c.slug LIMIT v_lim;
END $function$;
REVOKE ALL ON FUNCTION public.catalog_find(text, text, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.catalog_find(text, text, integer) TO anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_find(text, text, integer) TO service_role;

-- One round trip per search: rate check + version + rows in one call.
CREATE OR REPLACE FUNCTION public.catalog_search(q text, lang text, lim integer, p_rate_key text, p_rate_limit integer DEFAULT 120)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_rate jsonb; v_rows jsonb;
BEGIN
  v_rate := public.consume_catalog_find_rate(p_rate_key, p_rate_limit);
  IF coalesce((v_rate->>'allowed')::boolean, false) IS NOT TRUE THEN
    RETURN jsonb_build_object('allowed', false, 'rate', v_rate);
  END IF;
  SELECT coalesce(jsonb_agg(to_jsonb(f)), '[]'::jsonb) INTO v_rows
    FROM public.catalog_find(q, lang, lim) f;
  RETURN jsonb_build_object('allowed', true, 'rate', v_rate,
                            'version', public.catalog_find_version(), 'rows', v_rows);
END $function$;
REVOKE ALL ON FUNCTION public.catalog_search(text, text, integer, text, integer) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_search(text, text, integer, text, integer) TO service_role;

-- Sweep heartbeat: every run writes a row, "nothing to do" included (§9).
CREATE TABLE public.catalog_find_sweep_runs (
  id bigserial PRIMARY KEY,
  ran_at timestamptz NOT NULL DEFAULT now(),
  catalog_version text NOT NULL,
  rebuilt boolean NOT NULL,
  rows_written integer
);
REVOKE ALL ON public.catalog_find_sweep_runs FROM anon, authenticated;
GRANT ALL ON public.catalog_find_sweep_runs TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.catalog_find_sweep_runs_id_seq TO service_role;
ALTER TABLE public.catalog_find_sweep_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY catalog_find_sweep_runs_deny_select ON public.catalog_find_sweep_runs FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY catalog_find_sweep_runs_deny_insert ON public.catalog_find_sweep_runs FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY catalog_find_sweep_runs_deny_update ON public.catalog_find_sweep_runs FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY catalog_find_sweep_runs_deny_delete ON public.catalog_find_sweep_runs FOR DELETE TO anon, authenticated USING (false);

CREATE OR REPLACE FUNCTION public.catalog_find_sweep()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_rows integer; v_version text;
BEGIN
  -- catalog_find_refresh takes the existing advisory lock and returns -1
  -- when the index already carries the current version.
  v_rows := public.catalog_find_refresh(false);
  v_version := public.catalog_find_version();
  INSERT INTO public.catalog_find_sweep_runs(catalog_version, rebuilt, rows_written)
  VALUES (v_version, v_rows >= 0, CASE WHEN v_rows >= 0 THEN v_rows END);
  DELETE FROM public.catalog_find_sweep_runs WHERE ran_at < now() - interval '14 days';
  RETURN v_rows;
END $function$;
REVOKE ALL ON FUNCTION public.catalog_find_sweep() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_find_sweep() TO service_role;

CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.schedule('catalog-find-sweep', '7 * * * *', 'SELECT public.catalog_find_sweep()');

-- ── Proofs (behaviour; scratch rows created and removed here only) ─────────
DO $proof$
DECLARE v_cat uuid; v_free uuid; v_imei uuid; v_multi uuid; r jsonb;
BEGIN
  ASSERT public.attr_contact_like('+251 911 234 567'), 'P1 phone must match';
  ASSERT NOT public.attr_contact_like('Model 320D'), 'P2 model must not match';
  ASSERT public.attr_answer_tokens('["a",{"value":"other","text":"x"}]') = ARRAY['a','other'], 'P3 tokens';
  ASSERT public.attr_answer_other_text('["a",{"value":"other","text":"x"}]') = 'x', 'P4 other text';
  ASSERT public.attr_visible_when_met('{"k":["a",{"value":"other","text":"x"}]}', NULL, '{"key":"k","in":["other"]}'), 'P5 show-when reads object element';

  INSERT INTO public.categories(name_en, slug) VALUES ('e2e proof', 'e2e-proof-dlm') RETURNING id INTO v_cat;
  INSERT INTO public.attributes(attr_key, name_en, attr_type) VALUES ('e2e_proof_free', 'p', 'text') RETURNING id INTO v_free;
  INSERT INTO public.attributes(attr_key, name_en, attr_type, preset) VALUES ('e2e_proof_imei', 'p', 'text', 'digits:15') RETURNING id INTO v_imei;
  INSERT INTO public.attributes(attr_key, name_en, attr_type, options) VALUES ('e2e_proof_multi', 'p', 'multi_select',
    '[{"value":"a","label_en":"A"},{"value":"other","label_en":"Other"}]') RETURNING id INTO v_multi;
  INSERT INTO public.category_attribute_links(category_id, attribute_id, display_order)
  VALUES (v_cat, v_free, 1), (v_cat, v_imei, 2), (v_cat, v_multi, 3);

  r := public.validate_listing_attributes(v_cat, '{"e2e_proof_free":"+251 911 234 567"}');
  ASSERT r->'refusals'->0->>'reason' = 'contactInText', 'P6 phone refused: ' || r::text;
  r := public.validate_listing_attributes(v_cat, '{"e2e_proof_free":"Model 320D","e2e_proof_imei":"356938035643809"}');
  ASSERT (r->>'ok')::boolean, 'P7 model + IMEI accepted: ' || r::text;
  r := public.validate_listing_attributes(v_cat, '{"e2e_proof_multi":["a",{"value":"other","text":" teff "}]}');
  ASSERT r->'attrs'->'e2e_proof_multi' = '["a",{"value":"other","text":"teff"}]'::jsonb, 'P8 multi other kept: ' || r::text;
  r := public.validate_listing_attributes(v_cat, '{"e2e_proof_multi":["a","other"]}');
  ASSERT r->'refusals'->0->>'reason' = 'otherNeedsText', 'P9 other needs text: ' || r::text;

  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  DELETE FROM public.attributes WHERE id IN (v_free, v_imei, v_multi);
  DELETE FROM public.categories WHERE id = v_cat;
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20261002030000') ON CONFLICT DO NOTHING;