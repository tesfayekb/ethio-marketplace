-- lovable-cron-fallback-reviewed: operator brief bundle-2 step 6 requires the catalog-find-sweep every 5 minutes (288 runs/day) as a safety net; rebuild-after-commit is the main path.
-- Bundle 2 — the one migration (brief: docs/governance/briefs/bundle-2.md).
-- Bases (live definitions, md5 of prosrc): attr_contact_like 3a1df2c0…,
-- validate_listing_attributes 3510323c…, validate_listing_draft ce028abc…,
-- set_listing_pin (last declaration a35e45fa), listing_contact_refusals,
-- attr_option_shape a330bd4d…, cat_import_plan bcb4caf9….
-- Steps: 2 (attr_contact_like R1–R6), 3 (Other write-ins), 4 (title/description),
-- 5 (notes keep contactInNote), 6 (sweep every 5 minutes), 10 (listings.directions
-- + set_listing_pin p_directions), 11 (census: no door change — a sub-city counts
-- as its city via coalesce(l.city_id, l.id)), 14 (phone2), 17 (own_place, DEC-105),
-- 19 (attr_option_shape allowed ceiling 150).
-- Ruling 2026-10-03: no drops except set_listing_pin; every live argument name,
-- order, type and DEFAULT kept.

-- ---- step 10 — the directions line ----
ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS directions text;

-- ---- step 2 — attr_contact_like under R1–R6 (INC-382) ----
CREATE OR REPLACE FUNCTION public.attr_contact_like(p_text text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
DECLARE
  v_run    text;
  v_digits text;
  v_groups text[];
  v_lens   int[];
  v_d      int;
BEGIN
  IF p_text IS NULL OR p_text = '' THEN RETURN false; END IF;
  -- R6 — an e-mail address, or a t.me/ or wa.me/ link.
  IF p_text ~* '[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+([.][A-Za-z0-9-]+)*[.][A-Za-z]{2,}'
     OR p_text ~* '(^|[^A-Za-z0-9])(t|wa)[.]me/' THEN
    RETURN true;
  END IF;
  -- A run: digits joined by at most two of space, dot, hyphen, round bracket;
  -- a leading + belongs to the run.
  FOR v_run IN
    SELECT m[1] FROM regexp_matches(p_text, '(\+?[0-9]([ .()()-]{0,2}[0-9])*)', 'g') m
  LOOP
    v_groups := regexp_split_to_array(regexp_replace(v_run, '^\+', ''), '[ .()()-]+');
    v_digits := array_to_string(v_groups, '');
    v_d := char_length(v_digits);
    SELECT array_agg(char_length(g)) INTO v_lens FROM unnest(v_groups) g;
    -- R1 — starts with + and D >= 8
    IF v_run LIKE '+%' AND v_d >= 8 THEN RETURN true; END IF;
    -- R2 — first digit 0 and D in 9..15
    IF left(v_digits, 1) = '0' AND v_d BETWEEN 9 AND 15 THEN RETURN true; END IF;
    -- R3 — a group of 10+ digits, or exactly 9 starting with 7 or 9
    IF EXISTS (SELECT 1 FROM unnest(v_groups) g
               WHERE char_length(g) >= 10
                  OR (char_length(g) = 9 AND left(g, 1) IN ('7', '9'))) THEN
      RETURN true;
    END IF;
    -- R4 — D = 9, first digit 7 or 9, every group at least 2 digits
    IF v_d = 9 AND left(v_digits, 1) IN ('7', '9')
       AND NOT EXISTS (SELECT 1 FROM unnest(v_groups) g WHERE char_length(g) < 2) THEN
      RETURN true;
    END IF;
    -- R5 — groups 3-3-4, or 1-3-3-4 starting with 1
    IF v_lens = ARRAY[3, 3, 4] THEN RETURN true; END IF;
    IF v_lens = ARRAY[1, 3, 3, 4] AND v_groups[1] = '1' THEN RETURN true; END IF;
  END LOOP;
  RETURN false;
END $$;
REVOKE ALL ON FUNCTION public.attr_contact_like(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_contact_like(text) TO authenticated;
GRANT ALL ON FUNCTION public.attr_contact_like(text) TO service_role;

-- ---- step 3 — Other write-ins checked with the same rule ----
CREATE OR REPLACE FUNCTION public.validate_listing_attributes(
  p_category_id uuid, p_attrs jsonb, p_prior jsonb DEFAULT NULL, p_defer_keys text[] DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
END $$;
REVOKE ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) TO authenticated;
GRANT ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) TO service_role;

-- ---- step 4 — the title and the description under the same rule ----
CREATE OR REPLACE FUNCTION public.validate_listing_draft(
  p_uid uuid, p_step smallint, p_category_id uuid, p_title text, p_description text,
  p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric,
  p_price_currency character(3), p_price_period text, p_poster_expires_at timestamptz,
  p_coverage uuid[], p_contact_pref jsonb, p_prior jsonb, p_price_bp integer DEFAULT NULL,
  p_price_negotiable boolean DEFAULT false)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ref     jsonb := '[]'::jsonb;
  v_cat     public.categories%ROWTYPE;
  v_res     jsonb;
  v_attrs   jsonb := '{}'::jsonb;
  v_title   text := btrim(coalesce(p_title, ''));
  v_desc    text := coalesce(p_description, '');
  -- D62-1b / INC-309 — 'negotiable' is an ALIAS at every step: a fixed price
  -- with the flag. It is resolved here, once, so no step stores it as a mode.
  v_mode    text := CASE WHEN p_price_mode = 'negotiable' THEN 'fixed' ELSE coalesce(p_price_mode, 'fixed') END;
  v_cur     char(3);
  v_period  text;
  v_home    char(2);
  v_days    int;
  v_plan    public.coverage_plans%ROWTYPE;
  v_market  char(2);
  v_cities  int := 0;
  v_regions int := 0;
  v_lands   int := 0;
  v_anchors int := 0;
  v_bad     uuid;
  v_place   uuid;
  v_basis   text[];
  v_bval    text;
  v_fmode   text;
  v_fperiod text;
  v_derived text;
  v_ans     jsonb;
  v_kid     record;
  v_pval    text;
  v_kval    jsonb;
  v_neg     boolean := coalesce(p_price_negotiable, false) OR p_price_mode IS NOT DISTINCT FROM 'negotiable';
BEGIN
  -- ---- step 1 — the category (leaf, postable) ----
  -- D34 — a catch-all leaf is postable. `is_catchall` orders a level (D30) and
  -- guides curation; it is not a refusal.
  IF p_step >= 1 THEN
    SELECT * INTO v_cat FROM public.categories WHERE id = p_category_id;
    IF p_category_id IS NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','category_id','reason','required'));
    ELSIF NOT FOUND
       OR NOT v_cat.is_active
       OR NOT v_cat.allow_listings
       OR EXISTS (SELECT 1 FROM public.category_tree_pointers t WHERE t.parent_id = v_cat.id) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','category_id','reason','categoryNotPostable'));
    END IF;
  END IF;

  -- Nothing downstream is meaningful without a postable category.
  IF jsonb_array_length(v_ref) > 0 THEN
    RETURN jsonb_build_object('ok', false, 'refusals', v_ref);
  END IF;

  -- ---- step 2 — photos: registered through their own door, nothing here ----

  -- ---- step 3 — attributes (the A1 validation authority) ----
  IF p_step >= 3 THEN
    v_res := public.validate_listing_attributes(p_category_id, coalesce(p_attributes, '{}'::jsonb), p_prior,
             CASE WHEN p_step < 5 THEN public.price_basis_keys(p_category_id) ELSE NULL END);
    IF coalesce((v_res->>'ok')::boolean, false) THEN
      v_attrs := coalesce(v_res->'attrs', '{}'::jsonb);
    ELSE
      v_ref := v_ref || coalesce(v_res->'refusals', '[]'::jsonb);
    END IF;
  ELSE
    v_attrs := coalesce(p_attributes, '{}'::jsonb);
  END IF;

  -- DEC-086 — AN EXACT-MODEL QUESTION IS REQUIRED WHENEVER IT MATTERS. A
  -- dependent pick-list whose options carry facts, allowed or bounds is
  -- required once its parent is answered AND that answer offers 2+ child
  -- options ('other' counts, and is a valid answer). Never doubled.
  IF p_step >= 3 THEN
    v_ans := CASE WHEN coalesce((v_res->>'ok')::boolean, false) THEN v_attrs
                  ELSE coalesce(p_attributes, '{}'::jsonb) END;
    FOR v_kid IN
      SELECT c.attr_key, c.options, l.allowed_options, l.visible_when, p.attr_key AS parent_key
        FROM public.effective_category_links(p_category_id) e
        JOIN public.attributes c ON c.id = e.attribute_id
        JOIN public.category_attribute_links l ON l.id = e.link_id
        JOIN public.attributes p ON p.id = c.depends_on
       WHERE c.attr_type IN ('single_select', 'multi_select')
         AND jsonb_typeof(c.options) = 'array'
         AND EXISTS (SELECT 1 FROM jsonb_array_elements(c.options) o
                      WHERE jsonb_typeof(o.value) = 'object'
                        AND (o.value ? 'facts' OR o.value ? 'allowed' OR o.value ? 'bounds'))
    LOOP
      IF v_kid.visible_when IS NOT NULL
         AND NOT public.attr_visible_when_met(v_ans, p_prior, v_kid.visible_when) THEN
        CONTINUE;
      END IF;
      v_pval := CASE jsonb_typeof(v_ans->v_kid.parent_key)
                  WHEN 'string' THEN v_ans->>v_kid.parent_key
                  WHEN 'object' THEN v_ans->v_kid.parent_key->>'value'
                  ELSE NULL END;
      IF btrim(coalesce(v_pval, '')) = '' THEN CONTINUE; END IF;
      IF (SELECT count(*) FROM jsonb_array_elements(v_kid.options) o
           WHERE jsonb_typeof(o.value) = 'object'
             AND coalesce((o.value->>'active')::boolean, true)
             AND (v_kid.allowed_options IS NULL OR (o.value->>'value') = ANY (v_kid.allowed_options))
             AND ((o.value->>'parent') = v_pval
                  OR (o.value->>'value' = 'other' AND (o.value->>'parent') IS NULL))) < 2 THEN
        CONTINUE;
      END IF;
      v_kval := v_ans -> v_kid.attr_key;
      IF (v_kval IS NULL OR jsonb_typeof(v_kval) = 'null'
          OR (jsonb_typeof(v_kval) = 'string' AND btrim(v_kval #>> '{}') = '')
          OR (jsonb_typeof(v_kval) = 'array' AND jsonb_array_length(v_kval) = 0)
          OR (jsonb_typeof(v_kval) = 'object' AND btrim(coalesce(v_kval->>'value', '')) = ''))
         AND NOT v_ref @> jsonb_build_array(jsonb_build_object('attr_key', v_kid.attr_key, 'reason', 'required')) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_kid.attr_key, 'reason', 'required'));
      END IF;
    END LOOP;
  END IF;

  -- ---- step 4 — title, description, video ----
  IF p_step >= 4 THEN
    IF char_length(v_title) = 0 THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','title','reason','required'));
    ELSIF char_length(v_title) > 120 THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','title','reason','tooLong','detail','120'));
    END IF;
    IF char_length(v_desc) > 5000 THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','description','reason','tooLong','detail','5000'));
    END IF;
    -- Bundle 2 step 4 — the title and the description are free text: the
    -- phone rule applies, reason contactInText at that field.
    IF public.attr_contact_like(v_title) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','title','reason','contactInText'));
    END IF;
    IF public.attr_contact_like(v_desc) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','description','reason','contactInText'));
    END IF;
    IF p_video_url IS NOT NULL
       AND p_video_url !~ '^https://(www\.)?(youtube\.com/watch\?v=|youtu\.be/)[A-Za-z0-9_-]{6,20}' THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','video_url','reason','badShape'));
    END IF;
  END IF;

  -- ---- step 5 — price, currency, period, poster window (DEC-067, D13) ----
  -- DEC-079 / D31 — a leaf carrying ONE pricing basis lets the seller's basis
  -- answer decide the price type and the period (price_shape_for_basis). The
  -- basis outranks the DEC-067 period lock (L5). No basis → DEC-067 unchanged.
  IF p_step >= 5 THEN
    v_basis := public.price_basis_keys(p_category_id);
    IF cardinality(v_basis) >= 2 THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','priceBasisAmbiguous','detail',array_to_string(v_basis,'|')));
    ELSIF cardinality(v_basis) = 1 THEN
      v_bval := CASE jsonb_typeof(v_attrs->v_basis[1])
                  WHEN 'string' THEN v_attrs->>v_basis[1]
                  WHEN 'object' THEN v_attrs->v_basis[1]->>'value'
                  ELSE NULL END;
      IF btrim(coalesce(v_bval, '')) = '' THEN v_bval := NULL; END IF;
      -- DEC-081 — the basis is judged HERE (deferred at step 3). The step-3 pass
      -- at p_step >= 5 may already carry the same refusal; it is never doubled.
      IF v_bval IS NULL
         AND EXISTS (SELECT 1 FROM public.effective_category_links(p_category_id) e
                      JOIN public.attributes a ON a.id = e.attribute_id
                     WHERE a.attr_key = v_basis[1] AND e.is_required)
         AND NOT v_ref @> jsonb_build_array(jsonb_build_object('attr_key', v_basis[1], 'reason', 'required')) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_basis[1], 'reason', 'required'));
      END IF;
    END IF;

    -- DEC-081 — Negotiable is a FLAG on a price, never a mode.
    v_neg := v_neg OR v_bval IS NOT DISTINCT FROM 'negotiable';

    IF v_bval IS NOT NULL THEN
      SELECT s.forced_mode, s.period INTO v_fmode, v_fperiod FROM public.price_shape_for_basis(v_bval) s;
      -- The comparison reads the alias-resolved v_mode; an ABSENT mode (NULL
      -- argument) still defers to the basis without a refusal, as before.
      IF v_fmode IS NOT NULL AND p_price_mode IS NOT NULL AND v_mode <> v_fmode THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','modeFollowsBasis','detail',v_fmode));
      END IF;
      v_mode := coalesce(v_fmode, v_mode);
    END IF;

    IF v_mode NOT IN ('fixed','free','contact','commission') THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','badValue','detail',v_mode));
    ELSIF v_mode = 'commission' THEN
      IF v_bval IS DISTINCT FROM 'commission' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','commissionNotOffered'));
      END IF;
      IF p_price_bp IS NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_bp','reason','required'));
      END IF;
      IF p_price_amount IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_amount','reason','mustBeEmpty'));
      END IF;
      IF p_price_currency IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_currency','reason','mustBeEmpty'));
      END IF;
      v_cur := NULL;
    ELSIF v_mode = 'fixed' THEN
      IF NOT v_cat.price_enabled THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','priceNotAllowed'));
      ELSIF p_price_amount IS NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_amount','reason','required'));
      ELSIF p_price_amount <= 0 THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_amount','reason','notPositive'));
      END IF;
      SELECT d.home_country_code INTO v_home FROM public.user_directory d WHERE d.user_id = p_uid;
      v_cur := upper(coalesce(p_price_currency,
        (SELECT k.currency_code FROM public.countries k WHERE k.code = v_home)));
      IF v_cur IS NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_currency','reason','required'));
      ELSIF NOT EXISTS (SELECT 1 FROM public.currencies c WHERE c.code = v_cur) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_currency','reason','unknownCurrency','detail',v_cur));
        v_cur := NULL;
      END IF;
    ELSE
      IF p_price_amount IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_amount','reason','mustBeEmpty'));
      END IF;
      v_cur := NULL;
    END IF;

    IF v_mode IN ('free','contact') THEN
      v_neg := false;
    END IF;

    IF v_mode <> 'commission' AND p_price_bp IS NOT NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_bp','reason','mustBeEmpty'));
    END IF;

    IF v_bval IS NOT NULL THEN
      v_derived := coalesce(v_fperiod, v_cat.default_price_period);
      IF p_price_period IS NOT NULL AND p_price_period <> v_derived THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_period','reason','periodFollowsBasis','detail',v_derived));
      END IF;
      v_period := v_derived;
      IF v_period NOT IN ('once','hour','day','week','month','year') THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_period','reason','badValue','detail',v_period));
      END IF;
    ELSE
      v_period := coalesce(p_price_period, v_cat.default_price_period);
      IF v_period NOT IN ('once','hour','day','week','month','year') THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_period','reason','badValue','detail',v_period));
      ELSIF v_cat.price_period_locked AND v_period <> v_cat.default_price_period THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_period','reason','periodLocked','detail',v_cat.default_price_period));
      END IF;
    END IF;

    v_days := coalesce(v_cat.expiry_days, 60);
    IF p_poster_expires_at IS NOT NULL THEN
      IF p_poster_expires_at < now() + interval '1 day' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','poster_expires_at','reason','posterExpiryTooSoon'));
      ELSIF p_poster_expires_at > now() + make_interval(days => v_days) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','poster_expires_at','reason','posterExpiryTooLate','detail',v_days::text));
      END IF;
    END IF;
  ELSE
    v_period := coalesce(p_price_period, v_cat.default_price_period);
    v_cur := upper(p_price_currency);
  END IF;

  -- ---- step 6 — coverage against the plan (DEC-064 as amended 2026-09-29, D19) ----
  -- W6 ruling (1): places that are SENT are judged at ANY step, because
  -- submit_listing writes them on every send. Only "a place is required" waits
  -- for step 6. W6 INC-337: every place is a CITY or a SUB-CITY; a region or a
  -- country alone never counts. The one-market refusal is retired (2026-09-29):
  -- countries are counted against the plan's max_countries.
  IF p_coverage IS NOT NULL AND array_length(p_coverage, 1) IS NOT NULL THEN
    SELECT c.id INTO v_bad
      FROM unnest(p_coverage) c(id)
     WHERE NOT EXISTS (
       SELECT 1 FROM public.locations l
        JOIN public.countries k ON k.code = l.country_code
       WHERE l.id = c.id AND l.is_active AND k.is_active)
     LIMIT 1;
    IF v_bad IS NOT NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','unknownPlace','detail',v_bad::text));
    ELSE
      SELECT c.id INTO v_bad
        FROM unnest(p_coverage) c(id)
        JOIN public.locations l ON l.id = c.id
       WHERE l.level NOT IN ('city','sub_city')
       LIMIT 1;
      IF v_bad IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','cityRequired','detail',v_bad::text));
      ELSE
        -- G29 — each count lands in its OWN variable (1dc182d8:298 named v_lands twice).
        -- INC-341 — every place is a city or a sub-city: a sub-city counts as
        -- its own city, regions are the distinct regions of the chosen places.
        SELECT count(DISTINCT l.country_code),
               count(DISTINCT coalesce(l.city_id, l.id)),
               count(DISTINCT l.region_id),
               count(*) FILTER (WHERE l.level = 'country'),
               min(l.country_code)
          INTO v_lands, v_cities, v_regions, v_anchors, v_market
          FROM public.locations l WHERE l.id = ANY (p_coverage);
        SELECT * INTO v_plan FROM public.coverage_plans WHERE plan = 'free';
        IF v_cities > v_plan.max_cities THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','coverageExceedsPlan:city','detail',v_cities::text));
        END IF;
        IF v_regions > v_plan.max_regions THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','coverageExceedsPlan:region','detail',v_regions::text));
        END IF;
        IF v_lands > v_plan.max_countries THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','coverageExceedsPlan:country','detail',v_lands::text));
        END IF;
        IF p_step >= 6 THEN
          v_place := p_coverage[1];
        END IF;
      END IF;
    END IF;
  ELSIF p_step >= 6 THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','required'));
  END IF;

  -- ---- step 7 — the contact shape ----
  IF p_step >= 7 THEN
    v_ref := v_ref || public.listing_contact_refusals(p_contact_pref);
  END IF;

  -- ---- step 8 — review: no fields of its own ----

  IF jsonb_array_length(v_ref) > 0 THEN
    RETURN jsonb_build_object('ok', false, 'refusals', v_ref);
  END IF;

  RETURN jsonb_build_object(
    'ok', true,
    'attrs', v_attrs,
    'title', v_title,
    'description', v_desc,
    'price_mode', v_mode,
    'price_amount', CASE WHEN v_mode = 'fixed' THEN p_price_amount ELSE NULL END,
    'price_currency', CASE WHEN v_mode = 'fixed' THEN v_cur ELSE NULL END,
    'price_period', v_period,
    'price_bp', CASE WHEN v_mode = 'commission' THEN p_price_bp ELSE NULL END,
    'price_negotiable', v_neg,
    'location_id', v_place,
    'market', v_market
  );
END $$;
REVOKE ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean) TO service_role;

-- ---- step 10 — set_listing_pin gains p_directions (signature replaced, as
-- a35e45fa did for p_zoom). A directions line without a pin is kept, as the
-- note is; the reverse geocoder never writes it. ----
DROP FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint);
CREATE FUNCTION public.set_listing_pin(
  p_listing_id uuid, p_lat numeric DEFAULT NULL, p_lng numeric DEFAULT NULL, p_precision text DEFAULT NULL,
  p_street text DEFAULT NULL, p_zoom smallint DEFAULT NULL, p_directions text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_row    public.listings%ROWTYPE;
  v_lat    numeric;
  v_lng    numeric;
  v_prec   text;
  v_street text;
  v_dirs   text;
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

  -- step 5 / step 10 — the directions line is sanitised as the note is and
  -- refused with contactInNote under the same rule.
  v_dirs := nullif(btrim(regexp_replace(
              regexp_replace(coalesce(p_directions, ''), '[[:cntrl:]<>]', ' ', 'g'),
              '\s+', ' ', 'g')), '');
  IF v_dirs IS NOT NULL AND char_length(v_dirs) > 200 THEN
    RAISE EXCEPTION 'directionsTooLong:%', char_length(v_dirs);
  END IF;
  IF v_dirs IS NOT NULL AND public.attr_contact_like(v_dirs) THEN
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
                                 'street_address', v_row.street_address,
                                 'directions', v_row.directions);
  v_after  := jsonb_build_object('pin_lat', v_lat, 'pin_lng', v_lng,
                                 'pin_precision', v_prec, 'pin_zoom', v_zoom,
                                 'street_address', v_street,
                                 'directions', v_dirs);

  UPDATE public.listings
     SET pin_lat = v_lat, pin_lng = v_lng, pin_precision = v_prec, pin_zoom = v_zoom,
         street_address = v_street, directions = v_dirs, updated_at = now()
   WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
  VALUES (p_listing_id, v_uid, 'edit', v_before, v_after, v_uid);

  RETURN jsonb_build_object('ok', true) || v_after;
END $$;
REVOKE ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO service_role;

-- ---- step 14 — an optional second phone (contact_pref.phone2 {show, value})
-- under the phone rule; any other unknown key is still refused. ----
CREATE OR REPLACE FUNCTION public.listing_contact_refusals(p_pref jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
DECLARE
  v_ref  jsonb := '[]'::jsonb;
  v_key  text;
  v_obj  jsonb;
  v_val  text;
  v_ok   boolean;
BEGIN
  IF p_pref IS NULL OR jsonb_typeof(p_pref) <> 'object' THEN
    RETURN jsonb_build_array(jsonb_build_object('field','contact_pref','reason','badShape'));
  END IF;
  IF jsonb_typeof(p_pref->'messages') <> 'boolean' OR NOT (p_pref->>'messages')::boolean THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','contact_pref.messages','reason','messagesRequired'));
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_pref) k LOOP
    IF v_key NOT IN ('messages','phone','phone2','telegram','whatsapp') THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','contact_pref.'||v_key,'reason','unknownKey'));
    END IF;
  END LOOP;
  FOREACH v_key IN ARRAY ARRAY['phone','phone2','telegram','whatsapp'] LOOP
    CONTINUE WHEN NOT (p_pref ? v_key);
    v_obj := p_pref -> v_key;
    IF jsonb_typeof(v_obj) <> 'object'
       OR jsonb_typeof(v_obj->'show') <> 'boolean'
       OR EXISTS (SELECT 1 FROM jsonb_object_keys(v_obj) k WHERE k NOT IN ('show','value')) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','contact_pref.'||v_key,'reason','badShape'));
      CONTINUE;
    END IF;
    v_val := NULLIF(btrim(coalesce(v_obj->>'value','')), '');
    IF v_val IS NULL THEN
      IF (v_obj->>'show')::boolean THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','contact_pref.'||v_key,'reason','showNeedsValue'));
      END IF;
      CONTINUE;
    END IF;
    v_ok := CASE v_key
      WHEN 'telegram' THEN regexp_replace(v_val, '^@', '') ~ '^[A-Za-z0-9_]{5,32}$'
      ELSE v_val ~ '^\+[0-9]{7,15}$'
    END;
    IF NOT v_ok THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','contact_pref.'||v_key,'reason','badHandle','detail',v_val));
    END IF;
  END LOOP;
  RETURN v_ref;
END $$;
REVOKE ALL ON FUNCTION public.listing_contact_refusals(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.listing_contact_refusals(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.listing_contact_refusals(jsonb) TO service_role;

-- ---- step 17 (DEC-105) — own_place joins the allowed capability tokens.
-- It only widens the allowed set: every existing row stays valid and no row
-- is changed. ----
ALTER TABLE public.categories DROP CONSTRAINT IF EXISTS categories_capabilities_check;
ALTER TABLE public.categories ADD CONSTRAINT categories_capabilities_check
  CHECK (capabilities <@ ARRAY['bookable','map_pin','own_place']::text[]);

CREATE OR REPLACE FUNCTION public.cat_import_plan(p_rows jsonb, p_scope text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_scope uuid;
  v_scope_set uuid[] := NULL;
  v_row jsonb;
  v_num int;
  v_slug text;
  v_action text;
  v_cat public.categories%ROWTYPE;
  v_parent public.categories%ROWTYPE;
  v_parent_slug text;
  v_seen text[] := '{}';
  v_infile text[] := '{}';
  v_ref jsonb := '[]'::jsonb;
  v_items jsonb := '[]'::jsonb;
  v_delta jsonb;
  v_cur jsonb;
  v_adds int := 0; v_changes int := 0; v_retires int := 0;
  v_reacts int := 0; v_deletes int := 0; v_unchanged int := 0;
  v_children int; v_listings int;
  v_name_am text;
  v_order int;
  v_export jsonb := NULL;
  v_rename text;
  v_kids text[];
  v_active_txt text;
  v_want_active boolean;
  v_detail text;
  -- DEC-052 / DEC-067 cells
  v_caps text[];
  v_period text;
  v_lock text;
  v_bad text;
  -- INC-275 — ONE tree read per plan: the export keyed by slug, and the file's
  -- own slug set. No per-row export, walk or version call below.
  v_by_slug jsonb;
  v_file_slugs jsonb;
  -- DEC-079 — categories that carry, or hold a descendant carrying, a price
  -- basis (primary lineage), read ONCE per plan: id -> the basis key.
  v_basis_map jsonb;
  v_bkey text;
BEGIN
  v_export := public.cat_export_rows(NULL);
  WITH RECURSIVE d AS (
    SELECT l.category_id AS cid, a.attr_key AS k
      FROM public.category_attribute_links l
      JOIN public.attributes a ON a.id = l.attribute_id
     WHERE a.attr_key ~ '^(pricing_type|unit_of_sale)(-|$)'
  ),
  up AS (
    SELECT cid, k FROM d
    UNION
    SELECT public.cat_primary_parent(up.cid), up.k FROM up
     WHERE public.cat_primary_parent(up.cid) IS NOT NULL
  ),
  down AS (
    SELECT cid, k FROM d
    UNION
    SELECT c.id, down.k FROM public.categories c JOIN down ON down.cid = public.cat_primary_parent(c.id)
  ),
  hit AS (SELECT cid, min(k) AS k FROM (SELECT * FROM up UNION SELECT * FROM down) u GROUP BY cid)
  SELECT COALESCE(jsonb_object_agg(cid::text, k), '{}'::jsonb) INTO v_basis_map FROM hit;
  SELECT COALESCE(jsonb_object_agg(r->>'category_slug', r), '{}'::jsonb)
    INTO v_by_slug FROM jsonb_array_elements(v_export) r;
  SELECT COALESCE(jsonb_object_agg(k, true), '{}'::jsonb) INTO v_file_slugs
    FROM (SELECT DISTINCT lower(btrim(COALESCE(o->>'category_slug',''))) k
            FROM jsonb_array_elements(COALESCE(p_rows,'[]'::jsonb)) o) f
   WHERE k <> '';

  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    SELECT c.id INTO v_scope FROM public.categories c WHERE c.slug = lower(btrim(p_scope));
    IF v_scope IS NULL THEN RAISE EXCEPTION 'unknown category scope'; END IF;
    SELECT array_agg(d.id) INTO v_scope_set FROM public.cat_descendants(v_scope) d;
  END IF;

  FOR v_row IN SELECT * FROM jsonb_array_elements(COALESCE(p_rows, '[]'::jsonb))
  LOOP
    v_num := COALESCE(public.cat_int(v_row->>'row'), 0);
    v_slug := lower(COALESCE(public.cat_text(v_row->>'category_slug'), ''));
    v_action := lower(COALESCE(public.cat_text(v_row->>'action'), 'upsert'));
    v_parent_slug := lower(COALESCE(public.cat_text(v_row->>'parent_slug'), ''));

    IF v_slug = '' THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key','',
                                           'reason','missingSlug');
      CONTINUE;
    END IF;

    IF v_slug = ANY (v_seen) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','duplicateSlug');
      CONTINUE;
    END IF;
    v_seen := v_seen || v_slug;

    IF v_action NOT IN ('upsert','create-root','retire','reactivate','delete') THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badAction');
      CONTINUE;
    END IF;

    v_caps := ARRAY(SELECT lower(btrim(x))
                      FROM unnest(string_to_array(COALESCE(v_row->>'capabilities',''), '|')) x
                     WHERE btrim(x) <> '');
    v_bad := NULL;
    -- DEC-105 — own_place is an allowed capability token.
    SELECT x INTO v_bad FROM unnest(v_caps) x
     WHERE x NOT IN ('bookable','map_pin','own_place') LIMIT 1;
    IF v_bad IS NOT NULL THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badCapability','detail',v_bad);
      CONTINUE;
    END IF;
    IF (SELECT count(DISTINCT u) FROM unnest(v_caps) u) <> COALESCE(array_length(v_caps,1),0) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badCapability','detail','duplicate');
      CONTINUE;
    END IF;
    v_period := lower(COALESCE(public.cat_text(v_row->>'default_price_period'), ''));
    IF v_period <> '' AND v_period NOT IN ('once','hour','day','week','month','year') THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badPeriod','detail',v_period);
      CONTINUE;
    END IF;
    v_lock := public.cat_text(v_row->>'price_period_locked');

    SELECT * INTO v_cat FROM public.categories c WHERE c.slug = v_slug;

    -- DEC-079 — a row may not CREATE a period lock on a basis-carrying lineage
    -- (the basis decides the period). A row restating a stored lock passes.
    IF v_action <> 'delete'
       AND v_lock IS NOT NULL AND btrim(v_lock) <> ''
       AND public.cat_bool(v_lock, false)
       AND (v_cat.id IS NULL OR NOT v_cat.price_period_locked) THEN
      v_bkey := CASE WHEN v_cat.id IS NULL THEN NULL ELSE v_basis_map ->> v_cat.id::text END;
      IF v_bkey IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','periodLockedWithBasis','detail',v_bkey);
        CONTINUE;
      END IF;
    END IF;

    IF v_scope_set IS NOT NULL AND v_cat.id IS NOT NULL
       AND NOT (v_cat.id = ANY (v_scope_set)) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','outOfScope');
      CONTINUE;
    END IF;

    -- ---------- CREATE ----------
    IF v_cat.id IS NULL THEN
      IF v_action IN ('retire','reactivate') THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownSlug');
        CONTINUE;
      END IF;
      IF v_action = 'delete' THEN
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyDeleted');
        CONTINUE;
      END IF;

      IF v_action <> 'create-root'
         AND btrim(COALESCE(v_row->>'category_path','')) <> '' THEN
        v_rename := NULL;
        SELECT r->>'category_slug' INTO v_rename
          FROM jsonb_array_elements(v_export) r
         WHERE btrim(COALESCE(r->>'category_path','')) = btrim(COALESCE(v_row->>'category_path',''))
           AND lower(btrim(COALESCE(r->>'parent_slug',''))) = v_parent_slug
           AND lower(btrim(COALESCE(r->>'category_slug',''))) <> v_slug
           AND NOT (v_file_slugs ? lower(btrim(COALESCE(r->>'category_slug',''))))
         LIMIT 1;
        IF v_rename IS NOT NULL THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','slugRename','detail', v_rename);
          CONTINUE;
        END IF;
      END IF;

      IF v_parent_slug = '' AND v_action <> 'create-root' THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownSlug');
        CONTINUE;
      END IF;
      IF v_parent_slug <> '' THEN
        SELECT * INTO v_parent FROM public.categories c WHERE c.slug = v_parent_slug;
        IF v_parent.id IS NULL AND v_parent_slug = ANY (v_infile) THEN
          v_parent := NULL;
        END IF;
        IF v_parent.id IS NULL AND NOT (v_parent_slug = ANY (v_infile)) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','unknownParent');
          CONTINUE;
        END IF;
        IF v_parent.id IS NOT NULL AND v_parent.is_catchall THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','catchallParent');
          CONTINUE;
        END IF;
        IF v_parent.id IS NOT NULL AND v_scope_set IS NOT NULL
           AND NOT (v_parent.id = ANY (v_scope_set)) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','outOfScope');
          CONTINUE;
        END IF;
        IF v_parent.id IS NOT NULL THEN
          SELECT sib.slug INTO v_rename
            FROM public.categories sib
            JOIN public.category_tree_pointers p ON p.child_id = sib.id
           WHERE p.parent_id = v_parent.id
             AND lower(btrim(sib.name_en)) = lower(btrim(COALESCE(v_row->>'name_en','')))
           LIMIT 1;
          IF v_rename IS NOT NULL THEN
            v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                                 'reason','slugRename','detail', v_rename);
            CONTINUE;
          END IF;
        END IF;
      ELSE
        v_parent := NULL;
      END IF;

      IF public.cat_text(v_row->>'name_en') IS NULL THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','missingName');
        CONTINUE;
      END IF;

      IF (public.cat_text(v_row->>'visible_from') IS NOT NULL
            AND public.cat_ts(v_row->>'visible_from') IS NULL)
         OR (public.cat_text(v_row->>'visible_until') IS NOT NULL
            AND public.cat_ts(v_row->>'visible_until') IS NULL) THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','badDate');
        CONTINUE;
      END IF;

      v_adds := v_adds + 1;
      v_infile := v_infile || v_slug;
      v_items := v_items || jsonb_build_object(
        'row', v_num, 'slug', v_slug, 'op', 'create',
        'parent_slug', NULLIF(v_parent_slug, ''),
        'fields', jsonb_build_object(
          'name_en', public.cat_text(v_row->>'name_en'),
          'name_am', public.cat_text(v_row->>'name_am'),
          'icon', public.cat_text(v_row->>'icon'),
          'allow_listings', public.cat_bool(v_row->>'allow_listings', true),
          'price_enabled', public.cat_bool(v_row->>'price_enabled', true),
          'expiry_days', public.cat_int(v_row->>'expiry_days'),
          'display_order', public.cat_int(v_row->>'display_order'),
          'visible_from', public.cat_ts(v_row->>'visible_from'),
          'visible_until', public.cat_ts(v_row->>'visible_until'),
          'excluded_country_codes', to_jsonb(public.cat_pipe(v_row->>'excluded_country_codes')),
          'secondary_parents', to_jsonb(public.cat_pipe(v_row->>'secondary_parents')))
        || CASE WHEN v_row ? 'capabilities'
                THEN jsonb_build_object('capabilities', to_jsonb(v_caps))
                ELSE '{}'::jsonb END
        || CASE WHEN v_period <> ''
                THEN jsonb_build_object('default_price_period', v_period)
                ELSE '{}'::jsonb END
        || CASE WHEN v_lock IS NOT NULL AND btrim(v_lock) <> ''
                THEN jsonb_build_object('price_period_locked',
                                        public.cat_bool(v_lock, false))
                ELSE '{}'::jsonb END);
      CONTINUE;
    END IF;

    -- ---------- DELETE ----------
    IF v_action = 'delete' THEN
      SELECT count(*)::int INTO v_children FROM public.category_tree_pointers p
       WHERE p.parent_id = v_cat.id;
      IF v_children > 0 THEN
        SELECT array_agg(c.slug ORDER BY c.slug) INTO v_kids
          FROM public.category_tree_pointers p
          JOIN public.categories c ON c.id = p.child_id
         WHERE p.parent_id = v_cat.id;
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                          'reason','hasChildren',
                          'detail', array_to_string(COALESCE(v_kids, ARRAY[]::text[]), ', '),
                          'children', to_jsonb(COALESCE(v_kids, ARRAY[]::text[])));
        CONTINUE;
      END IF;
      SELECT count(*)::int INTO v_listings FROM public.listings l WHERE l.category_id = v_cat.id;
      IF v_listings > 0 THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                          'reason','hasListings','detail', v_listings::text);
        CONTINUE;
      END IF;
      IF v_cat.is_active THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','deleteActive');
        CONTINUE;
      END IF;
      v_deletes := v_deletes + 1;
      v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','delete');
      CONTINUE;
    END IF;

    -- ---------- STATUS CELL (INC-199 part 1) ----------
    v_active_txt := public.cat_text(v_row->>'is_active');
    v_want_active := NULL;
    IF v_active_txt IS NOT NULL AND btrim(v_active_txt) <> '' THEN
      v_want_active := public.cat_bool(v_active_txt, v_cat.is_active);
    END IF;
    IF v_action NOT IN ('retire','reactivate')
       AND v_want_active IS NOT NULL
       AND v_want_active IS DISTINCT FROM v_cat.is_active THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                        'reason','statusNeedsAction',
                        'detail', 'stored=' || CASE WHEN v_cat.is_active THEN 'true' ELSE 'false' END
                                  || ' requested=' || CASE WHEN v_want_active THEN 'true' ELSE 'false' END);
      CONTINUE;
    END IF;

    -- ---------- CELL DIFF (semantic, against the export shape) ----------
    -- INC-275: the current row comes from the once-per-plan export map.
    v_cur := COALESCE(v_by_slug -> v_cat.slug, 'null'::jsonb);
    v_delta := '{}'::jsonb;

    IF (public.cat_text(v_row->>'visible_from') IS NOT NULL
          AND public.cat_ts(v_row->>'visible_from') IS NULL)
       OR (public.cat_text(v_row->>'visible_until') IS NOT NULL
          AND public.cat_ts(v_row->>'visible_until') IS NULL) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badDate');
      CONTINUE;
    END IF;

    IF public.cat_text(v_row->>'name_en') IS NOT NULL
       AND public.cat_text(v_row->>'name_en') IS DISTINCT FROM btrim(v_cat.name_en) THEN
      v_delta := v_delta || jsonb_build_object('name_en', public.cat_text(v_row->>'name_en'));
    END IF;

    IF COALESCE(public.cat_text(v_row->>'icon'), '')
       IS DISTINCT FROM COALESCE(v_cur->>'icon', '') THEN
      v_delta := v_delta || jsonb_build_object('icon', COALESCE(public.cat_text(v_row->>'icon'), ''));
    END IF;

    IF public.cat_bool(v_row->>'allow_listings', v_cat.allow_listings) IS DISTINCT FROM v_cat.allow_listings THEN
      v_delta := v_delta || jsonb_build_object('allow_listings',
                    public.cat_bool(v_row->>'allow_listings', v_cat.allow_listings));
    END IF;

    IF public.cat_bool(v_row->>'price_enabled', v_cat.price_enabled) IS DISTINCT FROM v_cat.price_enabled THEN
      v_delta := v_delta || jsonb_build_object('price_enabled',
                    public.cat_bool(v_row->>'price_enabled', v_cat.price_enabled));
    END IF;

    IF public.cat_int(v_row->>'expiry_days') IS DISTINCT FROM v_cat.expiry_days THEN
      v_delta := v_delta || jsonb_build_object('expiry_days', public.cat_int(v_row->>'expiry_days'));
    END IF;

    IF v_row ? 'capabilities'
       AND array_to_string(v_caps,'|') IS DISTINCT FROM COALESCE(v_cur->>'capabilities','') THEN
      v_delta := v_delta || jsonb_build_object('capabilities', to_jsonb(v_caps));
    END IF;
    IF v_period <> ''
       AND v_period IS DISTINCT FROM COALESCE(v_cur->>'default_price_period','') THEN
      v_delta := v_delta || jsonb_build_object('default_price_period', v_period);
    END IF;
    IF v_lock IS NOT NULL AND btrim(v_lock) <> ''
       AND public.cat_bool(v_lock, v_cat.price_period_locked)
           IS DISTINCT FROM v_cat.price_period_locked THEN
      v_delta := v_delta || jsonb_build_object('price_period_locked',
                    public.cat_bool(v_lock, v_cat.price_period_locked));
    END IF;

    v_order := public.cat_int(v_row->>'display_order');
    IF NOT v_cat.is_catchall
       AND v_order IS NOT NULL
       AND v_order IS DISTINCT FROM public.cat_int(v_cur->>'display_order') THEN
      v_delta := v_delta || jsonb_build_object('display_order', v_order);
    END IF;

    v_name_am := public.cat_text(v_row->>'name_am');
    IF v_name_am IS NOT NULL AND btrim(v_name_am) <> ''
       AND btrim(v_name_am) IS DISTINCT FROM btrim(COALESCE(v_cur->>'name_am', '')) THEN
      v_delta := v_delta || jsonb_build_object('name_am', btrim(v_name_am));
    END IF;

    IF public.cat_ts(v_row->>'visible_from') IS DISTINCT FROM v_cat.visible_from
       OR public.cat_ts(v_row->>'visible_until') IS DISTINCT FROM v_cat.visible_until THEN
      v_delta := v_delta || jsonb_build_object(
        'visible_from', public.cat_ts(v_row->>'visible_from'),
        'visible_until', public.cat_ts(v_row->>'visible_until'));
    END IF;

    IF public.cat_pipe(v_row->>'excluded_country_codes')
       IS DISTINCT FROM public.cat_pipe(v_cur->>'excluded_country_codes') THEN
      IF EXISTS (SELECT 1 FROM unnest(public.cat_pipe(v_row->>'excluded_country_codes')) code
                  WHERE NOT EXISTS (SELECT 1 FROM public.countries c
                                    WHERE lower(c.code) = code)) THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownCountry');
        CONTINUE;
      END IF;
      v_delta := v_delta || jsonb_build_object('excluded_country_codes',
                    to_jsonb(public.cat_pipe(v_row->>'excluded_country_codes')));
    END IF;

    IF v_parent_slug IS DISTINCT FROM COALESCE(v_cur->>'parent_slug', '') THEN
      IF v_parent_slug = '' THEN
        v_delta := v_delta || jsonb_build_object('parent_slug', '');
      ELSE
        SELECT * INTO v_parent FROM public.categories c WHERE c.slug = v_parent_slug;
        IF v_parent.id IS NULL THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','unknownParent');
          CONTINUE;
        END IF;
        IF v_parent.is_catchall THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','catchallParent');
          CONTINUE;
        END IF;
        IF v_parent.id = v_cat.id
           OR v_parent.id IN (SELECT d.id FROM public.cat_descendants(v_cat.id) d) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','cycle');
          CONTINUE;
        END IF;
        v_delta := v_delta || jsonb_build_object('parent_slug', v_parent_slug);
      END IF;
    END IF;

    -- INC-275: secondary parents checked against the in-memory export map.
    IF public.cat_pipe(v_row->>'secondary_parents')
       IS DISTINCT FROM public.cat_pipe(v_cur->>'secondary_parents') THEN
      IF EXISTS (SELECT 1 FROM unnest(public.cat_pipe(v_row->>'secondary_parents')) s
                  WHERE NOT (v_by_slug ? s)
                     OR v_by_slug -> s ->> 'is_catchall' = 'true') THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownParent');
        CONTINUE;
      END IF;
      v_delta := v_delta || jsonb_build_object('secondary_parents',
                    to_jsonb(public.cat_pipe(v_row->>'secondary_parents')));
    END IF;

    v_detail := NULLIF(array_to_string(
                  ARRAY(SELECT k FROM jsonb_object_keys(v_delta) k ORDER BY k), ', '), '');

    -- ---------- RETIRE ----------
    IF v_action = 'retire' THEN
      IF v_cat.is_active THEN
        SELECT count(*)::int INTO v_listings FROM public.listings l
         WHERE l.category_id = v_cat.id AND l.status = 'active';
        IF v_listings > 0 THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                             'reason','hasListings','detail', v_listings::text);
          CONTINUE;
        END IF;
        v_retires := v_retires + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','retire',
                                                 'fields', v_delta,
                                                 'detail', v_detail);
      ELSIF v_delta = '{}'::jsonb THEN
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyRetired');
      ELSE
        v_changes := v_changes + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                                 'fields', v_delta,
                                                 'detail','alreadyRetired');
      END IF;
      CONTINUE;
    END IF;

    -- ---------- REACTIVATE ----------
    IF v_action = 'reactivate' THEN
      IF NOT v_cat.is_active THEN
        v_reacts := v_reacts + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','reactivate',
                                                 'fields', v_delta,
                                                 'detail', v_detail);
      ELSIF v_delta = '{}'::jsonb THEN
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyActive');
      ELSE
        v_changes := v_changes + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                                 'fields', v_delta,
                                                 'detail','alreadyActive');
      END IF;
      CONTINUE;
    END IF;

    -- ---------- UPSERT ----------
    IF v_delta = '{}'::jsonb THEN
      v_unchanged := v_unchanged + 1;
    ELSE
      v_changes := v_changes + 1;
      v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                               'fields', v_delta,
                                               'detail', v_detail);
    END IF;
  END LOOP;

  RETURN jsonb_build_object(
    'counts', jsonb_build_object(
      'adds', v_adds, 'changes', v_changes, 'retires', v_retires,
      'reactivations', v_reacts, 'deletes', v_deletes,
      'unchanged', v_unchanged, 'refusals', jsonb_array_length(v_ref)),
    'refusals', v_ref,
    'items', v_items);
END $$;
REVOKE ALL ON FUNCTION public.cat_import_plan(jsonb, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cat_import_plan(jsonb, text) TO service_role;
GRANT ALL ON FUNCTION public.cat_import_plan(jsonb, text) TO service_role;

-- ---- step 19 — an option's allowed list ceiling rises from 50 to 150
-- (migration ff92c5b8:147). ----
CREATE OR REPLACE FUNCTION public.attr_option_shape(p_key text, p_options jsonb)
RETURNS text
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
DECLARE
  v_opt     jsonb;
  v_val     text;
  v_k       text;
  v_alias   text;
  v_all     text[] := ARRAY[]::text[];
  v_n       int;
  v_b       jsonb;
  v_bmin    text;
  v_bmax    text;
  v_sw      text;
BEGIN
  IF p_options IS NULL OR jsonb_typeof(p_options) <> 'array' THEN RETURN NULL; END IF;

  FOR v_opt IN SELECT value FROM jsonb_array_elements(p_options)
  LOOP
    CONTINUE WHEN jsonb_typeof(v_opt) <> 'object';
    v_val := COALESCE(v_opt->>'value', '');

    FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt) k
    LOOP
      IF v_k NOT IN ('value','label_en','label_am','parent','active','bounds','aliases','allowed','facts','swatch') THEN
        RETURN p_key || '|' || v_val || '|unknownOptionKey:' || v_k;
      END IF;
    END LOOP;

    IF v_opt ? 'active' AND jsonb_typeof(v_opt->'active') <> 'boolean' THEN
      RETURN p_key || '|' || v_val || '|activeNotBoolean';
    END IF;

    IF v_opt ? 'aliases' THEN
      IF jsonb_typeof(v_opt->'aliases') <> 'array' THEN
        RETURN p_key || '|' || v_val || '|aliasesNotArray';
      END IF;
      v_n := jsonb_array_length(v_opt->'aliases');
      IF v_n < 1 OR v_n > 5 THEN
        RETURN p_key || '|' || v_val || '|aliasesCount:' || v_n::text;
      END IF;
      FOR v_alias IN SELECT x.value #>> '{}' FROM jsonb_array_elements(v_opt->'aliases') x
      LOOP
        IF v_alias IS NULL THEN RETURN p_key || '|' || v_val || '|aliasNotString'; END IF;
        IF char_length(v_alias) < 1 OR char_length(v_alias) > 32 THEN
          RETURN p_key || '|' || v_val || '|aliasLength:' || v_alias;
        END IF;
        IF v_alias ~ '[[:cntrl:]]' THEN
          RETURN p_key || '|' || v_val || '|aliasControlChar';
        END IF;
        IF lower(v_alias) = ANY (v_all) THEN
          RETURN p_key || '|' || v_val || '|aliasDuplicate:' || v_alias;
        END IF;
        v_all := v_all || lower(v_alias);
      END LOOP;
      IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_opt->'aliases') x
                  WHERE jsonb_typeof(x.value) <> 'string') THEN
        RETURN p_key || '|' || v_val || '|aliasNotString';
      END IF;
    END IF;

    IF v_opt ? 'bounds' THEN
      IF jsonb_typeof(v_opt->'bounds') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|boundsNotObject';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'bounds') k
      LOOP
        v_b := v_opt->'bounds'->v_k;
        IF jsonb_typeof(v_b) <> 'object' THEN
          RETURN p_key || '|' || v_val || '|boundsNotObject:' || v_k;
        END IF;
        IF EXISTS (SELECT 1 FROM jsonb_object_keys(v_b) bk WHERE bk NOT IN ('min','max')) THEN
          RETURN p_key || '|' || v_val || '|boundsUnknownKey:' || v_k;
        END IF;
        v_bmin := v_b #>> '{min}';
        v_bmax := v_b #>> '{max}';
        IF v_bmin IS NOT NULL AND NOT public.attr_bound_ok(v_bmin) THEN
          RETURN p_key || '|' || v_val || '|boundsBadValue:' || v_bmin;
        END IF;
        IF v_bmax IS NOT NULL AND NOT public.attr_bound_ok(v_bmax) THEN
          RETURN p_key || '|' || v_val || '|boundsBadValue:' || v_bmax;
        END IF;
        IF v_bmin ~ '^-?[0-9]+(\.[0-9]+)?$' AND v_bmax ~ '^-?[0-9]+(\.[0-9]+)?$'
           AND v_bmin::numeric > v_bmax::numeric THEN
          RETURN p_key || '|' || v_val || '|boundsMinAboveMax:' || v_k;
        END IF;
      END LOOP;
    END IF;

    -- DEC-057 — `allowed` is an object of select-target keys to value lists.
    IF v_opt ? 'allowed' THEN
      IF jsonb_typeof(v_opt->'allowed') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|allowedNotObject';
      END IF;
      IF (SELECT count(*) FROM jsonb_object_keys(v_opt->'allowed') ak) > 5 THEN
        RETURN p_key || '|' || v_val || '|allowedTooMany';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'allowed') k
      LOOP
        v_b := v_opt->'allowed'->v_k;
        IF jsonb_typeof(v_b) <> 'array' THEN
          RETURN p_key || '|' || v_val || '|allowedValuesNotArray:' || v_k;
        END IF;
        v_n := jsonb_array_length(v_b);
        IF v_n < 1 THEN
          RETURN p_key || '|' || v_val || '|allowedEmpty:' || v_k;
        END IF;
        -- Bundle 2 step 19 — the ceiling on an option's allowed list is 150.
        IF v_n > 150 THEN
          RETURN p_key || '|' || v_val || '|allowedTooMany:' || v_k;
        END IF;
        IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_b) x
                    WHERE jsonb_typeof(x.value) <> 'string') THEN
          RETURN p_key || '|' || v_val || '|allowedValuesNotArray:' || v_k;
        END IF;
        IF (SELECT count(DISTINCT x.value #>> '{}') FROM jsonb_array_elements(v_b) x) <> v_n THEN
          RETURN p_key || '|' || v_val || '|allowedDuplicate:' || v_k;
        END IF;
      END LOOP;
    END IF;

    -- D18 — `facts` is a PREFILL, never a rule: an object of attribute keys to
    -- a scalar or a list of strings, at most 20 entries. The validator never
    -- reads it; the options read projects it for the form. BOUNDS ENFORCE,
    -- FACTS PREFILL.
    -- INC-236 — the KEY charset is the DEFINITION-KEY charset
    -- (^[a-z0-9_][a-z0-9_-]{1,63}$, hyphens allowed, matching attribute_key),
    -- so a real definition key such as 'fuel_type-vehicles' is accepted. The
    -- refusal text is unchanged: badFacts:key:<k>.
    IF v_opt ? 'facts' THEN
      IF jsonb_typeof(v_opt->'facts') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|badFacts:notObject';
      END IF;
      IF (SELECT count(*) FROM jsonb_object_keys(v_opt->'facts') fk) > 20 THEN
        RETURN p_key || '|' || v_val || '|badFacts:tooMany';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'facts') k
      LOOP
        IF v_k !~ '^[a-z0-9_][a-z0-9_-]{1,63}$' THEN
          RETURN p_key || '|' || v_val || '|badFacts:key:' || v_k;
        END IF;
        v_b := v_opt->'facts'->v_k;
        IF jsonb_typeof(v_b) = 'array' THEN
          v_n := jsonb_array_length(v_b);
          IF v_n < 1 OR v_n > 20 THEN
            RETURN p_key || '|' || v_val || '|badFacts:listLength:' || v_k;
          END IF;
          IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_b) x
                      WHERE jsonb_typeof(x.value) <> 'string') THEN
            RETURN p_key || '|' || v_val || '|badFacts:listNotStrings:' || v_k;
          END IF;
        ELSIF jsonb_typeof(v_b) NOT IN ('string','number','boolean') THEN
          RETURN p_key || '|' || v_val || '|badFacts:value:' || v_k;
        END IF;
      END LOOP;
    END IF;

    -- D28 / M-SWATCH — WHAT COLOUR THIS OPTION IS, said by the catalogue. One
    -- STRING in exactly three spellings; anything else is refused by name, so a
    -- colour WORD ('red') or a short hex ('#GGG') can never land.
    IF v_opt ? 'swatch' THEN
      IF jsonb_typeof(v_opt->'swatch') <> 'string' THEN
        RETURN p_key || '|' || v_val || '|badSwatch:notString';
      END IF;
      v_sw := btrim(v_opt->>'swatch');
      IF v_sw = '' THEN
        RETURN p_key || '|' || v_val || '|badSwatch:empty';
      END IF;
      IF v_sw ~ '^pattern:' THEN
        v_k := lower(btrim(substring(v_sw from 9)));
        IF v_k NOT IN ('tabby','brindle','calico','tricolour','multicolour','striped') THEN
          RETURN p_key || '|' || v_val || '|badSwatch:pattern:' || v_k;
        END IF;
      ELSIF v_sw !~ '^#[0-9a-fA-F]{6}$'
        AND v_sw !~ '^#[0-9a-fA-F]{6}\|#[0-9a-fA-F]{6}$' THEN
        RETURN p_key || '|' || v_val || '|badSwatch:' || v_sw;
      END IF;
    END IF;
  END LOOP;

  RETURN NULL;
END $$;
REVOKE ALL ON FUNCTION public.attr_option_shape(text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_option_shape(text, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_option_shape(text, jsonb) TO service_role;

-- ---- step 6 — the sweep runs every 5 minutes; the heartbeat row proves it ----
SELECT cron.unschedule('catalog-find-sweep');
SELECT cron.schedule('catalog-find-sweep', '*/5 * * * *', 'SELECT public.catalog_find_sweep()');

-- ---- proofs (scratch rows only, removed by this block) ----
DO $$
DECLARE
  v_cat uuid;
  v_attr uuid;
  v_res jsonb;
  v_plan jsonb;
  v_opts jsonb;
  v_refused boolean;
BEGIN
  -- step 2 — the two judge lists, every row an ASSERT
  ASSERT public.attr_contact_like('+251 911 234 567'), 'match +251 911 234 567';
  ASSERT public.attr_contact_like('+251911234567'), 'match +251911234567';
  ASSERT public.attr_contact_like('0911 23 45 67'), 'match 0911 23 45 67';
  ASSERT public.attr_contact_like('0911234567'), 'match 0911234567';
  ASSERT public.attr_contact_like('911234567'), 'match 911234567';
  ASSERT public.attr_contact_like('911 234 567'), 'match 911 234 567';
  ASSERT public.attr_contact_like('91 123 4567'), 'match 91 123 4567';
  ASSERT public.attr_contact_like('09 11 23 45 67'), 'match 09 11 23 45 67';
  ASSERT public.attr_contact_like('251911234567'), 'match 251911234567';
  ASSERT public.attr_contact_like('00251911234567'), 'match 00251911234567';
  ASSERT public.attr_contact_like('call 0911-234567'), 'match call 0911-234567';
  ASSERT public.attr_contact_like('0911.23.45.67'), 'match 0911.23.45.67';
  ASSERT public.attr_contact_like('(404) 555-1234'), 'match (404) 555-1234';
  ASSERT public.attr_contact_like('404.555.1234'), 'match 404.555.1234';
  ASSERT public.attr_contact_like('+1 404 555 1234'), 'match +1 404 555 1234';
  ASSERT public.attr_contact_like('abebe@example.com'), 'match abebe@example.com';
  ASSERT public.attr_contact_like('t.me/abebe_shop'), 'match t.me/abebe_shop';
  ASSERT public.attr_contact_like('wa.me/251911234567'), 'match wa.me/251911234567';
  ASSERT NOT public.attr_contact_like('Sizes 42 43 44 45'), 'no-match Sizes 42 43 44 45';
  ASSERT NOT public.attr_contact_like('Sizes 38 39 40 41 42 43'), 'no-match Sizes 38..43';
  ASSERT NOT public.attr_contact_like('Sizes 90 92 94 96 98'), 'no-match Sizes 90..98';
  ASSERT NOT public.attr_contact_like('Corolla 2008 1300cc'), 'no-match Corolla 2008 1300cc';
  ASSERT NOT public.attr_contact_like('Bole Road, House 1234, 3rd floor'), 'no-match Bole Road';
  ASSERT NOT public.attr_contact_like('Model 320D'), 'no-match Model 320D';
  ASSERT NOT public.attr_contact_like('2015 2016 2017 models'), 'no-match 2015 2016 2017';
  ASSERT NOT public.attr_contact_like('was 150000 now 120000'), 'no-match was 150000';
  ASSERT NOT public.attr_contact_like('150000000 birr'), 'no-match 150000000 birr';
  ASSERT NOT public.attr_contact_like('2023 12000 km'), 'no-match 2023 12000 km';
  ASSERT NOT public.attr_contact_like('120 x 60 x 75 cm'), 'no-match 120 x 60 x 75';
  ASSERT NOT public.attr_contact_like('Plot 25, Block 14, House 1234'), 'no-match Plot 25';
  ASSERT NOT public.attr_contact_like('1,500,000'), 'no-match 1,500,000';
  ASSERT NOT public.attr_contact_like('ISBN 978-99944-0-000-0'), 'no-match ISBN';
  ASSERT NOT public.attr_contact_like('Yeka, woreda 12, house 456'), 'no-match Yeka';
  ASSERT NOT public.attr_contact_like('500 ETB per kg, minimum 10 kg'), 'no-match 500 ETB';

  -- step 19 — 150 accepted, 151 refused as allowedTooMany
  SELECT jsonb_build_array(jsonb_build_object(
           'value', 'a', 'label_en', 'A',
           'allowed', jsonb_build_object('sizes',
             (SELECT jsonb_agg('v' || g) FROM generate_series(1, 150) g))))
    INTO v_opts;
  ASSERT public.attr_option_shape('e2e-mig-b2', v_opts) IS NULL, '150 allowed accepted';
  SELECT jsonb_build_array(jsonb_build_object(
           'value', 'a', 'label_en', 'A',
           'allowed', jsonb_build_object('sizes',
             (SELECT jsonb_agg('v' || g) FROM generate_series(1, 151) g))))
    INTO v_opts;
  ASSERT public.attr_option_shape('e2e-mig-b2', v_opts) LIKE '%allowedTooMany%', '151 refused';

  -- step 17 — a scratch category saved with own_place is accepted by the table
  INSERT INTO public.categories (name_en, slug, capabilities, is_active, price_enabled, is_restricted, display_order, is_catchall, allow_listings, default_price_period, price_period_locked)
  VALUES ('e2e mig b2 caps', 'e2e-mig-b2-caps', '{own_place}', false, true, false, 2000000, false, true, 'once', false);
  -- a direct write of an unknown token is still refused by the table rule
  BEGIN
    INSERT INTO public.categories (name_en, slug, capabilities, is_active, price_enabled, is_restricted, display_order, is_catchall, allow_listings, default_price_period, price_period_locked)
    VALUES ('e2e mig b2 fly', 'e2e-mig-b2-fly', '{fly}', false, true, false, 2000000, false, true, 'once', false);
    RAISE EXCEPTION 'unknown capability token was accepted';
  EXCEPTION WHEN check_violation THEN
    NULL;
  END;
  DELETE FROM public.categories WHERE slug = 'e2e-mig-b2-caps';

  -- 'bookable|fly' is still refused by the planner as badCapability; own_place passes
  v_plan := public.cat_import_plan(
    jsonb_build_array(jsonb_build_object('row', 1, 'category_slug', 'e2e-mig-b2-fly',
      'action', 'create-root', 'name_en', 'x', 'capabilities', 'bookable|fly')), NULL);
  ASSERT v_plan->'refusals' @> jsonb_build_array(jsonb_build_object('reason', 'badCapability')),
    'planner refuses fly';
  v_plan := public.cat_import_plan(
    jsonb_build_array(jsonb_build_object('row', 1, 'category_slug', 'e2e-mig-b2-ownplace',
      'action', 'create-root', 'name_en', 'x', 'capabilities', 'own_place')), NULL);
  ASSERT jsonb_array_length(v_plan->'refusals') = 0, 'planner accepts own_place';

  -- step 3 — an Other write-in with a phone number is refused contactInText
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('e2e-mig-b2-attr', 'e2e mig b2 attr', 'single_select',
          jsonb_build_array(jsonb_build_object('value', 'a', 'label_en', 'A'),
                            jsonb_build_object('value', 'other', 'label_en', 'Other')))
  RETURNING id INTO v_attr;
  INSERT INTO public.categories (name_en, slug, is_active, allow_listings, price_enabled, is_restricted, display_order, is_catchall, default_price_period, price_period_locked)
  VALUES ('e2e mig b2 leaf', 'e2e-mig-b2-leaf', true, true, true, false, 2000000, false, 'once', false)
  RETURNING id INTO v_cat;
  INSERT INTO public.category_attribute_links (category_id, attribute_id, is_required, is_filterable, is_searchable, display_order)
  VALUES (v_cat, v_attr, false, false, false, 0);
  v_res := public.validate_listing_attributes(v_cat,
    jsonb_build_object('e2e-mig-b2-attr', jsonb_build_object('value', 'other', 'text', '+251 911 234 567')),
    NULL, NULL);
  ASSERT v_res->'refusals' @> jsonb_build_array(jsonb_build_object('reason', 'contactInText')),
    'Other write-in refused contactInText';
  v_res := public.validate_listing_attributes(v_cat,
    jsonb_build_object('e2e-mig-b2-attr', jsonb_build_object('value', 'other', 'text', 'Abebe shop')),
    NULL, NULL);
  ASSERT coalesce((v_res->>'ok')::boolean, false), 'plain Other write-in accepted';

  -- step 4 — a title holding a phone number is refused contactInText
  v_res := public.validate_listing_draft(NULL, 4::smallint, v_cat, 'Call +251 911 234 567',
    'plain description', NULL, '{}'::jsonb, 'free', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
  ASSERT v_res->'refusals' @> jsonb_build_array(jsonb_build_object('field', 'title', 'reason', 'contactInText')),
    'title refused contactInText';
  v_res := public.validate_listing_draft(NULL, 4::smallint, v_cat, 'Sofa in good shape',
    'reach me on 0911 23 45 67', NULL, '{}'::jsonb, 'free', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
  ASSERT v_res->'refusals' @> jsonb_build_array(jsonb_build_object('field', 'description', 'reason', 'contactInText')),
    'description refused contactInText';
  v_res := public.validate_listing_draft(NULL, 4::smallint, v_cat, 'Sofa in good shape',
    'Bole Road, House 1234, 3rd floor', NULL, '{}'::jsonb, 'free', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
  ASSERT coalesce((v_res->>'ok')::boolean, false), 'plain title and description accepted';

  DELETE FROM public.category_attribute_links WHERE category_id = v_cat AND attribute_id = v_attr;
  DELETE FROM public.categories WHERE id = v_cat;
  DELETE FROM public.attributes WHERE id = v_attr;

  -- step 14 — phone2 accepted under the phone rule; an unknown key still refused
  ASSERT public.listing_contact_refusals(jsonb_build_object('messages', true,
           'phone2', jsonb_build_object('show', true, 'value', '+251911234567'))) = '[]'::jsonb,
    'phone2 accepted';
  ASSERT public.listing_contact_refusals(jsonb_build_object('messages', true,
           'fax', jsonb_build_object('show', true, 'value', '+251911234567')))
         @> jsonb_build_array(jsonb_build_object('reason', 'unknownKey')),
    'unknown key refused';
  ASSERT public.listing_contact_refusals(jsonb_build_object('messages', true,
           'phone2', jsonb_build_object('show', true, 'value', '0911')))
         @> jsonb_build_array(jsonb_build_object('reason', 'badHandle')),
    'bad phone2 refused';

  -- step 6 — the sweep is scheduled every 5 minutes
  ASSERT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'catalog-find-sweep' AND schedule = '*/5 * * * *'),
    'sweep every 5 minutes';

  -- ACL read-backs
  ASSERT has_function_privilege('authenticated', 'public.attr_contact_like(text)', 'EXECUTE'), 'acl attr_contact_like';
  ASSERT has_function_privilege('authenticated', 'public.validate_listing_attributes(uuid,jsonb,jsonb,text[])', 'EXECUTE'), 'acl validate_listing_attributes';
  ASSERT has_function_privilege('authenticated', 'public.validate_listing_draft(uuid,smallint,uuid,text,text,text,jsonb,text,numeric,character,text,timestamptz,uuid[],jsonb,jsonb,integer,boolean)', 'EXECUTE'), 'acl validate_listing_draft';
  ASSERT has_function_privilege('authenticated', 'public.set_listing_pin(uuid,numeric,numeric,text,text,smallint,text)', 'EXECUTE'), 'acl set_listing_pin';
  ASSERT has_function_privilege('authenticated', 'public.listing_contact_refusals(jsonb)', 'EXECUTE'), 'acl listing_contact_refusals';
  ASSERT has_function_privilege('authenticated', 'public.attr_option_shape(text,jsonb)', 'EXECUTE'), 'acl attr_option_shape';
  ASSERT has_function_privilege('service_role', 'public.cat_import_plan(jsonb,text)', 'EXECUTE'), 'acl cat_import_plan';
  ASSERT NOT has_function_privilege('authenticated', 'public.cat_import_plan(jsonb,text)', 'EXECUTE'), 'acl cat_import_plan not authenticated';

  -- ruling 2026-10-03 — defaults kept: two-argument attribute check still works
  v_res := public.validate_listing_attributes(gen_random_uuid(), '{}'::jsonb);
  ASSERT v_res IS NOT NULL, 'validate_listing_attributes callable with two arguments';
  -- the draft door without its last two arguments still works
  v_res := public.validate_listing_draft(NULL, 4::smallint, NULL, 'Sofa in good shape',
    'Plain words', NULL, '{}'::jsonb, 'free', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
  ASSERT v_res IS NOT NULL, 'validate_listing_draft callable without p_price_bp, p_price_negotiable';
  -- no EXECUTE for PUBLIC or anon on any of the seven (none had it before)
  ASSERT NOT EXISTS (
    SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace,
         LATERAL aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
    WHERE n.nspname = 'public'
      AND p.proname IN ('attr_contact_like','validate_listing_attributes','validate_listing_draft',
                        'set_listing_pin','listing_contact_refusals','attr_option_shape','cat_import_plan')
      AND a.privilege_type = 'EXECUTE'
      AND (a.grantee = 0 OR a.grantee = 'anon'::regrole)), 'no PUBLIC/anon EXECUTE on the seven';
  ASSERT (SELECT count(*) FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
          WHERE n.nspname = 'public' AND p.proname IN ('attr_contact_like','validate_listing_attributes',
            'validate_listing_draft','set_listing_pin','listing_contact_refusals','attr_option_shape','cat_import_plan')) = 7,
    'exactly seven functions, one signature each';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20261003000000') ON CONFLICT DO NOTHING;