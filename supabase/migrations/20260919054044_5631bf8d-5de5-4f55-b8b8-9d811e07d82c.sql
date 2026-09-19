-- =====================================================================
-- M-MAINT-2 PART A — per-link option scope + defaults (schema + reads),
-- plan photo cap (D22), seller first/last name (D17), listing map pin.
-- Whole re-declarations (INC-183). In-file proofs P1a, P2, P3, P4 on
-- scratch rows and a SCRATCH identity (INC-222: no real user id, no
-- step-up toggle — none of the doors proved here is permission-gated).
-- PART B (next landing) re-declares attr_import_plan,
-- admin_commit_attribute_import, admin_undo_attribute_import and
-- attr_export_payload with the two file cells, and carries P1b.
-- No src, no e2e — consumers ride C1-R3.
-- =====================================================================

-- ---------------------------------------------------------------- 1. TABLES
ALTER TABLE public.category_attribute_links
  ADD COLUMN allowed_options text[],
  ADD COLUMN default_value jsonb;

ALTER TABLE public.category_attribute_links
  ADD CONSTRAINT category_attribute_links_allowed_options_check
  CHECK (allowed_options IS NULL OR cardinality(allowed_options) > 0);

COMMENT ON COLUMN public.category_attribute_links.allowed_options IS
  'Per-link narrowing of the definition''s option values. NULL = every active option.';
COMMENT ON COLUMN public.category_attribute_links.default_value IS
  'Per-link default (scalar or array) matching the definition''s type. NULL = no default.';

ALTER TABLE public.coverage_plans
  ADD COLUMN max_photos smallint NOT NULL DEFAULT 10;

ALTER TABLE public.coverage_plans
  ADD CONSTRAINT coverage_plans_max_photos_check
  CHECK (max_photos >= 0 AND max_photos <= 30);

ALTER TABLE public.profiles
  ADD COLUMN first_name text,
  ADD COLUMN last_name text;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_first_name_check
  CHECK (first_name IS NULL
         OR (btrim(first_name) = first_name AND first_name <> '' AND char_length(first_name) <= 60)),
  ADD CONSTRAINT profiles_last_name_check
  CHECK (last_name IS NULL
         OR (btrim(last_name) = last_name AND last_name <> '' AND char_length(last_name) <= 60));

ALTER TABLE public.listings
  ADD COLUMN pin_lat numeric(9,6),
  ADD COLUMN pin_lng numeric(9,6),
  ADD COLUMN pin_precision text,
  ADD COLUMN street_address text;

ALTER TABLE public.listings
  ADD CONSTRAINT listings_pin_pair_check
  CHECK ((pin_lat IS NULL) = (pin_lng IS NULL)),
  ADD CONSTRAINT listings_pin_lat_check
  CHECK (pin_lat IS NULL OR (pin_lat >= -90 AND pin_lat <= 90)),
  ADD CONSTRAINT listings_pin_lng_check
  CHECK (pin_lng IS NULL OR (pin_lng >= -180 AND pin_lng <= 180)),
  ADD CONSTRAINT listings_pin_precision_check
  CHECK ((pin_precision IS NULL AND pin_lat IS NULL)
         OR (pin_lat IS NOT NULL AND pin_precision IN ('exact', 'approx'))),
  ADD CONSTRAINT listings_street_address_check
  CHECK (street_address IS NULL
         OR (btrim(street_address) <> '' AND char_length(street_address) <= 200));

COMMENT ON COLUMN public.listings.pin_precision IS
  'exact = the pin may be published as given; approx = only a 500 m-rounded centre may be published.';

-- --------------------------------------------------- 2. PLAN CAP RESOLVERS
-- Plans are NOT per-seller today (public.coverage_plans holds one row, `free`,
-- and no profile column names a plan). seller_plan is the single seam: when
-- plans become per-seller, only this function changes.
CREATE OR REPLACE FUNCTION public.seller_plan(p_user_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 'free'::text;
$$;

REVOKE ALL ON FUNCTION public.seller_plan(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.seller_plan(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.plan_photo_cap(p_plan text)
RETURNS smallint
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
           (SELECT p.max_photos FROM public.coverage_plans p WHERE p.plan = p_plan),
           10::smallint);
$$;

REVOKE ALL ON FUNCTION public.plan_photo_cap(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.plan_photo_cap(text) TO service_role;

CREATE OR REPLACE FUNCTION public.plan_caps(p_plan text)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jsonb_build_object(
           'plan', p.plan,
           'max_photos', p.max_photos,
           'max_cities', p.max_cities,
           'max_regions', p.max_regions,
           'max_countries', p.max_countries,
           'allow_everywhere', p.allow_everywhere)
    FROM public.coverage_plans p
   WHERE p.plan = COALESCE(p_plan, 'free');
$$;

REVOKE ALL ON FUNCTION public.plan_caps(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.plan_caps(text) TO service_role;

-- ------------------------------- 3. get_posting_schema — WHOLE re-declaration
-- Adds the per-link cells (allowed_options, default_value) and the caller's
-- plan caps, so the wizard reads ONE document.
CREATE OR REPLACE FUNCTION public.get_posting_schema(p_category_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cat public.categories;
  v_attrs jsonb;
BEGIN
  SELECT * INTO v_cat FROM public.categories WHERE id = p_category_id;
  IF v_cat.id IS NULL THEN
    RAISE EXCEPTION 'categoryNotFound';
  END IF;
  IF NOT v_cat.is_active THEN
    RAISE EXCEPTION 'categoryInactive';
  END IF;
  IF NOT v_cat.allow_listings THEN
    RAISE EXCEPTION 'categoryNotPostable';
  END IF;

  SELECT coalesce(jsonb_agg(row ORDER BY ord, key), '[]'::jsonb)
    INTO v_attrs
    FROM (
      SELECT e.display_order AS ord, a.attr_key AS key,
             jsonb_build_object(
               'attribute_id', a.id,
               'attr_key', a.attr_key,
               'attr_type', a.attr_type,
               'name_en', a.name_en,
               'help_text_en', a.help_text_en,
               'is_required', e.is_required,
               'display_order', e.display_order,
               'card_rank', e.card_rank,
               'unit', a.unit,
               'min_bound', a.min_bound,
               'max_bound', a.max_bound,
               'decimals', a.decimals,
               'format', a.format,
               'preset', a.preset,
               'max_length', a.max_length,
               -- D-spec §12 — the per-link narrowing and default.
               'allowed_options', to_jsonb(l.allowed_options),
               'default_value', l.default_value,
               'option_count', (
                 SELECT count(*)
                   FROM jsonb_array_elements(
                          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
                  WHERE coalesce((o.value->>'active')::boolean, true)
                    AND (l.allowed_options IS NULL
                         OR (o.value->>'value') = ANY (l.allowed_options))
               ),
               'allow_other', EXISTS (
                 SELECT 1
                   FROM jsonb_array_elements(
                          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
                  WHERE o.value->>'value' = 'other'
                    AND (l.allowed_options IS NULL
                         OR 'other' = ANY (l.allowed_options))
               )
             ) AS row
        FROM public.effective_category_links(p_category_id) e
        JOIN public.attributes a ON a.id = e.attribute_id
        JOIN public.category_attribute_links l ON l.id = e.link_id
    ) s;

  RETURN jsonb_build_object(
    'category', jsonb_build_object(
      'id', v_cat.id,
      'slug', v_cat.slug,
      'name_en', v_cat.name_en,
      'price_enabled', v_cat.price_enabled,
      'default_price_period', v_cat.default_price_period,
      'price_period_locked', v_cat.price_period_locked,
      'expiry_days', v_cat.expiry_days,
      'is_restricted', v_cat.is_restricted,
      'capabilities', to_jsonb(v_cat.capabilities),
      'illustration', v_cat.image_url
    ),
    'attributes', v_attrs,
    -- D22 — the caller's plan caps travel with the schema read.
    'plan', public.plan_caps(public.seller_plan(auth.uid()))
  );
END $$;

REVOKE ALL ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role;

-- ------------------- 4. validate_listing_attributes — WHOLE re-declaration
-- A select/multi value outside a non-NULL allowed_options refuses
-- optionNotAllowed:<value>.
CREATE OR REPLACE FUNCTION public.validate_listing_attributes(
  p_category_id uuid,
  p_attrs jsonb,
  p_prior jsonb DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
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

  -- unknownAttribute — a key that the effective set does not carry.
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
      IF (jsonb_typeof(v_val) = 'string' AND (v_val #>> '{}') = v_opt->>'value')
         OR (jsonb_typeof(v_val) = 'array' AND v_val @> jsonb_build_array(v_opt->>'value'))
         OR (jsonb_typeof(v_val) = 'object' AND v_val->>'value' = v_opt->>'value') THEN
        FOR v_key IN SELECT k FROM jsonb_object_keys(v_opt->'bounds') k LOOP
          v_bmin := NULLIF(v_opt->'bounds'->v_key->>'min', '')::numeric;
          v_bmax := NULLIF(v_opt->'bounds'->v_key->>'max', '')::numeric;
          IF v_folds ? v_key THEN
            v_bmin := greatest(v_bmin, NULLIF(v_folds->v_key->>'min','')::numeric);
            v_bmax := least(v_bmax, NULLIF(v_folds->v_key->>'max','')::numeric);
            -- greatest/least ignore NULLs in Postgres, which is exactly the
            -- "tightest stated bound wins" rule.
          END IF;
          v_folds := v_folds || jsonb_build_object(v_key,
            jsonb_strip_nulls(jsonb_build_object('min', v_bmin, 'max', v_bmax)));
        END LOOP;
      END IF;
    END LOOP;
  END LOOP;

  -- The judgement, definition by definition, in display order.
  FOR v_def IN
    SELECT a.id, a.attr_key, a.attr_type, a.options, a.min_bound, a.max_bound,
           a.decimals, a.format, a.preset, a.max_length, a.depends_on,
           e.is_required, e.display_order,
           l.allowed_options
      FROM public.effective_category_links(p_category_id) e
      JOIN public.attributes a ON a.id = e.attribute_id
      JOIN public.category_attribute_links l ON l.id = e.link_id
     ORDER BY e.display_order, a.attr_key
  LOOP
    v_val := v_attrs -> v_def.attr_key;
    v_absent := v_val IS NULL
             OR jsonb_typeof(v_val) = 'null'
             OR (jsonb_typeof(v_val) = 'string' AND btrim(v_val #>> '{}') = '')
             OR (jsonb_typeof(v_val) = 'array' AND jsonb_array_length(v_val) = 0);

    IF v_absent THEN
      IF v_def.is_required THEN
        v_ref := v_ref || jsonb_build_array(
          jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'required'));
      END IF;
      CONTINUE;
    END IF;

    -- dependentMissing — a definition conditioned on a sibling answered first.
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
        -- The preset allowlist is attr_preset_ok's (DEC-050): digits:n, vin,
        -- plate-et, alnum:a-b, free:n. `plate-et` is the Ethiopian civil plate
        -- shape carried by the curation library: a region/code group of one or
        -- two digits, a serial of four to six digits and a two-letter plate
        -- class, separated by hyphens (e.g. 3-12345-AA).
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
        IF jsonb_typeof(v_val) <> 'array'
           OR EXISTS (SELECT 1 FROM jsonb_array_elements(v_val) x WHERE jsonb_typeof(x.value) <> 'string') THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'badType', 'detail', 'multi_select'));
          CONTINUE;
        END IF;
        v_list := v_val;
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
              AND NOT coalesce((v_prior -> v_def.attr_key) @> to_jsonb(v_txt), false)
              AND coalesce(v_prior ->> v_def.attr_key, '') <> v_txt THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'inactiveOption', 'detail', v_txt));
          v_bad := true;
        ELSIF v_def.allowed_options IS NOT NULL
              AND NOT (v_txt = ANY (v_def.allowed_options))
              AND NOT coalesce((v_prior -> v_def.attr_key) @> to_jsonb(v_txt), false)
              AND coalesce(v_prior ->> v_def.attr_key, '') <> v_txt THEN
          -- D-spec §12 — the LINK narrows the definition's options.
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'optionNotAllowed', 'detail', v_txt));
          v_bad := true;
        END IF;
        v_seen := v_seen || v_txt;
        v_found := NULL; v_active := NULL;
      END LOOP;
      CONTINUE WHEN v_bad;

      -- `other` canonicalisation: { value:'other', text } with text <= 120.
      IF v_def.attr_type = 'single_select' AND 'other' = ANY (v_seen) AND v_allow_other THEN
        v_txt := btrim(coalesce(v_val->>'text', ''));
        IF v_txt = '' OR char_length(v_txt) > 120 THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_def.attr_key, 'reason', 'otherNeedsText'));
          CONTINUE;
        END IF;
        v_norm := v_norm || jsonb_build_object(v_def.attr_key,
          jsonb_build_object('value', 'other', 'text', v_txt));
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

REVOKE ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb) FROM anon;
GRANT EXECUTE ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb) TO service_role;

-- ------------------- 5. register_listing_photo — WHOLE re-declaration (D22)
CREATE OR REPLACE FUNCTION public.register_listing_photo(
  p_listing_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_seller uuid; v_cap smallint; v_count int;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'register_listing_photo is called by the photo route only';
  END IF;
  SELECT seller_id INTO v_seller FROM public.listings WHERE id = p_listing_id;
  IF v_seller IS NULL THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  -- D22 — the plan's photo cap is the authority; the route's cap is a mirror.
  v_cap := public.plan_photo_cap(public.seller_plan(v_seller));
  SELECT count(*) INTO v_count FROM public.listing_photos WHERE listing_id = p_listing_id;
  IF v_count >= v_cap THEN
    RAISE EXCEPTION 'tooManyPhotos:%', v_cap;
  END IF;
  SELECT coalesce(max(display_order), -1) + 1 INTO v_order
    FROM public.listing_photos WHERE listing_id = p_listing_id;
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes)
  VALUES (coalesce(p_photo_id, gen_random_uuid()), p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes)
  RETURNING id INTO p_photo_id;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, p_photo_id),
    updated_at = now() WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order);
END $$;

REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer) TO service_role;

-- ---------- 6. save_posting_identity — WHOLE re-declaration (D17, names)
DROP FUNCTION IF EXISTS public.save_posting_identity(text, text, text, jsonb, char);

CREATE OR REPLACE FUNCTION public.save_posting_identity(
  p_alias text DEFAULT NULL,
  p_seller_type text DEFAULT NULL,
  p_business_name text DEFAULT NULL,
  p_first_name text DEFAULT NULL,
  p_last_name text DEFAULT NULL,
  p_contact_pref jsonb DEFAULT NULL,
  p_home_country_code char(2) DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_ref      jsonb := '[]'::jsonb;
  v_alias    text := lower(btrim(coalesce(p_alias, '')));
  v_type     text := nullif(btrim(coalesce(p_seller_type, '')), '');
  v_biz      text := nullif(btrim(coalesce(p_business_name, '')), '');
  v_first    text := nullif(btrim(coalesce(p_first_name, '')), '');
  v_last     text := nullif(btrim(coalesce(p_last_name, '')), '');
  v_country  char(2) := upper(nullif(btrim(coalesce(p_home_country_code, '')), ''));
  v_source   text;
  v_home     char(2);
  v_row      public.profiles%ROWTYPE;
  v_reserved text[] := ARRAY[
    'admin','administrator','ethio','ethiopia','ethiocom','eritrea','support',
    'help','staff','moderator','moderation','official','team','system','root',
    'security','billing','payments','sales','info','contact','about','null',
    'undefined','me','you','user','users','seller','sellers','buyer','buyers'];
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;

  -- ---- alias ----
  IF v_alias <> '' THEN
    IF v_alias !~ '^[a-z0-9_]{3,30}$' THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','alias','reason','badShape'));
    ELSIF v_alias = ANY (v_reserved) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','alias','reason','aliasReserved'));
    ELSIF EXISTS (SELECT 1 FROM public.profiles p
                   WHERE lower(p.seller_alias) = v_alias AND p.user_id <> v_uid) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','alias','reason','aliasTaken'));
    END IF;
  END IF;

  -- ---- seller type / business name ----
  IF v_type IS NOT NULL AND v_type NOT IN ('person','business') THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','seller_type','reason','badValue','detail',v_type));
  END IF;
  IF coalesce(v_type, (SELECT seller_type FROM public.profiles WHERE user_id = v_uid)) = 'business' THEN
    IF coalesce(v_biz, (SELECT business_name FROM public.profiles WHERE user_id = v_uid)) IS NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','business_name','reason','required'));
    END IF;
  END IF;
  IF v_biz IS NOT NULL AND char_length(v_biz) NOT BETWEEN 2 AND 80 THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','business_name','reason','badLength'));
  END IF;

  -- ---- D17 — the seller's own name, refused BY FIELD when too long ----
  IF v_first IS NOT NULL AND char_length(v_first) > 60 THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','first_name','reason','badLength'));
  END IF;
  IF v_last IS NOT NULL AND char_length(v_last) > 60 THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','last_name','reason','badLength'));
  END IF;

  -- ---- contact preferences: the same shape the draft door enforces ----
  IF p_contact_pref IS NOT NULL THEN
    v_ref := v_ref || public.listing_contact_refusals(p_contact_pref);
  END IF;

  -- ---- declared home country (never the observed fact) ----
  IF v_country IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM public.countries k WHERE k.code = v_country) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','home_country_code','reason','unknownCountry','detail',v_country));
    ELSE
      SELECT d.country_source, d.home_country_code INTO v_source, v_home
        FROM public.user_directory d WHERE d.user_id = v_uid;
      IF v_source = 'user_confirmed' AND v_home IS DISTINCT FROM v_country THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','home_country_code','reason','countryAlreadyConfirmed','detail',v_home));
      END IF;
    END IF;
  END IF;

  IF jsonb_array_length(v_ref) > 0 THEN
    RETURN jsonb_build_object('ok', false, 'refusals', v_ref);
  END IF;

  -- Every field is optional: a NULL leaves the stored value alone.
  UPDATE public.profiles SET
    seller_alias  = coalesce(nullif(v_alias, ''), seller_alias),
    seller_type   = coalesce(v_type, seller_type),
    business_name = CASE WHEN coalesce(v_type, seller_type) = 'person' AND v_type = 'person'
                         THEN NULL ELSE coalesce(v_biz, business_name) END,
    first_name    = coalesce(v_first, first_name),
    last_name     = coalesce(v_last, last_name),
    contact_prefs = coalesce(p_contact_pref, contact_prefs),
    updated_at    = now()
  WHERE user_id = v_uid;

  IF v_country IS NOT NULL AND coalesce(v_source, 'unknown') <> 'user_confirmed' THEN
    PERFORM public.confirm_home_country(v_country);
  END IF;

  SELECT * INTO v_row FROM public.profiles WHERE user_id = v_uid;
  RETURN jsonb_build_object(
    'ok', true,
    'alias', v_row.seller_alias,
    'seller_type', v_row.seller_type,
    'business_name', v_row.business_name,
    'first_name', v_row.first_name,
    'last_name', v_row.last_name,
    'contact_prefs', v_row.contact_prefs,
    'home_country_code', v_row.home_country_code
  );
END $$;

REVOKE ALL ON FUNCTION public.save_posting_identity(text, text, text, text, text, jsonb, char) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_posting_identity(text, text, text, text, text, jsonb, char) TO authenticated;
GRANT ALL ON FUNCTION public.save_posting_identity(text, text, text, text, text, jsonb, char) TO service_role;

-- ------------------------------------- 7. set_listing_pin — the owner door
-- F5 order: gates (auth -> owner -> state) -> capture (old -> new) -> mutate.
-- A refused attempt leaves no trace. NULL lat/lng clears all four columns.
CREATE OR REPLACE FUNCTION public.set_listing_pin(
  p_listing_id uuid,
  p_lat numeric DEFAULT NULL,
  p_lng numeric DEFAULT NULL,
  p_precision text DEFAULT NULL,
  p_street text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_row    public.listings%ROWTYPE;
  v_lat    numeric;
  v_lng    numeric;
  v_prec   text;
  v_street text;
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

  IF p_lat IS NULL OR p_lng IS NULL THEN
    v_lat := NULL; v_lng := NULL; v_prec := NULL; v_street := NULL;
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
    v_street := nullif(btrim(coalesce(p_street, '')), '');
    IF v_street IS NOT NULL AND char_length(v_street) > 200 THEN
      RAISE EXCEPTION 'streetTooLong:%', char_length(v_street);
    END IF;
    v_lat := round(p_lat, 6);
    v_lng := round(p_lng, 6);
  END IF;

  v_before := jsonb_build_object('pin_lat', v_row.pin_lat, 'pin_lng', v_row.pin_lng,
                                 'pin_precision', v_row.pin_precision,
                                 'street_address', v_row.street_address);
  v_after  := jsonb_build_object('pin_lat', v_lat, 'pin_lng', v_lng,
                                 'pin_precision', v_prec, 'street_address', v_street);

  UPDATE public.listings
     SET pin_lat = v_lat, pin_lng = v_lng, pin_precision = v_prec,
         street_address = v_street, updated_at = now()
   WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
  VALUES (p_listing_id, v_uid, 'edit', v_before, v_after, v_uid);

  RETURN jsonb_build_object('ok', true) || v_after;
END $$;

REVOKE ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text) TO service_role;

-- =====================================================================
-- IN-FILE PROOFS — P1a, P2, P3, P4. Every assertion RAISES on failure.
-- Fixtures are SCRATCH rows and a SCRATCH identity created here and
-- removed at the end; no real user id, no permission or step-up toggle
-- (none of the doors proved here is permission-gated).
-- =====================================================================
DO $proof$
DECLARE
  v_uid    uuid := gen_random_uuid();
  v_other  uuid := gen_random_uuid();
  v_cat    uuid;
  v_attr   uuid;
  v_link   uuid;
  v_lst    uuid;
  v_sch    jsonb;
  v_row    jsonb;
  v_res    jsonb;
  v_cap    smallint;
  v_msg    text;
  v_i      int;
  v_prof   public.profiles%ROWTYPE;
  v_lrow   public.listings%ROWTYPE;
BEGIN
  -- ---------- scratch identities (the trigger seeds profile + directory) ----
  INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role,
                          created_at, updated_at)
  VALUES (v_uid, 'e2e-mmaint2-owner@example.invalid', '{}'::jsonb,
          'authenticated', 'authenticated', now(), now()),
         (v_other, 'e2e-mmaint2-stranger@example.invalid', '{}'::jsonb,
          'authenticated', 'authenticated', now(), now());

  -- ---------- scratch taxonomy ----------
  INSERT INTO public.categories (name_en, slug, price_enabled, is_active,
                                 allow_listings, display_order)
  VALUES ('E2E MMaint2 Leaf', 'e2e-mmaint2-leaf', true, true, true, 9999)
  RETURNING id INTO v_cat;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('e2e_mmaint2_unit', 'E2E MMaint2 Unit', 'single_select',
          '[{"value":"piece","label_en":"Piece"},
            {"value":"set","label_en":"Set"},
            {"value":"liter","label_en":"Liter"}]'::jsonb)
  RETURNING id INTO v_attr;

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, display_order,
     allowed_options, default_value)
  VALUES (v_cat, v_attr, false, false, 1,
          ARRAY['piece','set'], '1'::jsonb)
  RETURNING id INTO v_link;

  -- ================= P1a — the schema read projects both cells =============
  v_sch := public.get_posting_schema(v_cat);
  v_row := v_sch->'attributes'->0;
  IF v_row->'allowed_options' IS NULL
     OR NOT (v_row->'allowed_options' @> '["piece","set"]'::jsonb)
     OR jsonb_array_length(v_row->'allowed_options') <> 2
     OR (v_row->>'default_value') <> '1'
     OR (v_row->>'option_count') <> '2' THEN
    RAISE EXCEPTION 'P1a FAILED (schema read) — %', v_row;
  END IF;

  -- a value outside the link's list refuses optionNotAllowed:<value>
  v_res := public.validate_listing_attributes(
             v_cat, jsonb_build_object('e2e_mmaint2_unit', 'liter'));
  IF (v_res->>'ok')::boolean
     OR v_res->'refusals'->0->>'reason' <> 'optionNotAllowed'
     OR v_res->'refusals'->0->>'detail' <> 'liter' THEN
    RAISE EXCEPTION 'P1a FAILED (optionNotAllowed) — %', v_res;
  END IF;

  -- a value inside the list passes
  v_res := public.validate_listing_attributes(
             v_cat, jsonb_build_object('e2e_mmaint2_unit', 'piece'));
  IF NOT (v_res->>'ok')::boolean
     OR (v_res->'attrs'->>'e2e_mmaint2_unit') <> 'piece' THEN
    RAISE EXCEPTION 'P1a FAILED (allowed value) — %', v_res;
  END IF;

  -- a NULL list means every active option (the cell is a narrowing, not a gate)
  UPDATE public.category_attribute_links SET allowed_options = NULL WHERE id = v_link;
  v_res := public.validate_listing_attributes(
             v_cat, jsonb_build_object('e2e_mmaint2_unit', 'liter'));
  IF NOT (v_res->>'ok')::boolean THEN
    RAISE EXCEPTION 'P1a FAILED (NULL = all) — %', v_res;
  END IF;
  UPDATE public.category_attribute_links
     SET allowed_options = ARRAY['piece','set'] WHERE id = v_link;

  -- the CHECK refuses an EMPTY list
  BEGIN
    UPDATE public.category_attribute_links
       SET allowed_options = ARRAY[]::text[] WHERE id = v_link;
    RAISE EXCEPTION 'P1a FAILED — an empty allowed_options was accepted';
  EXCEPTION WHEN check_violation THEN NULL;
  END;

  -- ================= P2 — the plan photo cap (D22) =========================
  -- The REAL `free` row is never modified. A SCRATCH plan row proves the
  -- column and its CHECK; the door is proved against the live cap.
  -- The plan key CHECK is ^[a-z_]{2,32}$ — the scratch name is letters and
  -- underscores only (J1: letters-only prefix where a door forbids digits).
  INSERT INTO public.coverage_plans
    (plan, max_cities, max_regions, max_countries, allow_everywhere, max_photos)
  VALUES ('eee_mmaint_plan', 1, 1, 1, false, 1);

  IF public.plan_photo_cap('eee_mmaint_plan') <> 1 THEN
    RAISE EXCEPTION 'P2 FAILED (scratch cap) — %', public.plan_photo_cap('eee_mmaint_plan');
  END IF;
  IF (public.plan_caps('eee_mmaint_plan')->>'max_photos') <> '1' THEN
    RAISE EXCEPTION 'P2 FAILED (caps document) — %', public.plan_caps('eee_mmaint_plan');
  END IF;

  BEGIN
    UPDATE public.coverage_plans SET max_photos = 31 WHERE plan = 'eee_mmaint_plan';
    RAISE EXCEPTION 'P2 FAILED — max_photos 31 was accepted';
  EXCEPTION WHEN check_violation THEN NULL;
  END;

  DELETE FROM public.coverage_plans WHERE plan = 'eee_mmaint_plan';

  -- Plans are NOT per-seller yet (one global row, `free`), so the door's live
  -- cap is free's: the refusal is proved by PARAMETER at that cap.
  INSERT INTO public.listings (seller_id, category_id, title, description,
                               home_country_code)
  VALUES (v_uid, v_cat, 'E2E MMaint2 listing', 'scratch', 'ET')
  RETURNING id INTO v_lst;

  v_cap := public.plan_photo_cap(public.seller_plan(v_uid));
  IF (v_sch->'plan'->>'max_photos')::smallint <> v_cap THEN
    RAISE EXCEPTION 'P2 FAILED (schema plan caps) — % vs %', v_sch->'plan', v_cap;
  END IF;

  FOR v_i IN 1..v_cap LOOP
    INSERT INTO public.listing_photos (listing_id, storage_path, paths,
                                       display_order, exif_stripped)
    VALUES (v_lst, 'e2e/' || v_i::text,
            jsonb_build_object('original', 'e2e/' || v_i::text), v_i - 1, true);
  END LOOP;

  -- the photo door runs with NO caller (service-only)
  PERFORM set_config('request.jwt.claims', '{}', true);
  BEGIN
    PERFORM public.register_listing_photo(
      v_lst, gen_random_uuid(),
      jsonb_build_object('original', 'e2e/over'), 10, 10, 10);
    RAISE EXCEPTION 'P2 FAILED — a photo beyond the cap was accepted';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg <> 'tooManyPhotos:' || v_cap::text THEN
      RAISE EXCEPTION 'P2 FAILED (refusal) — %', v_msg;
    END IF;
  END;

  -- one photo below the cap is accepted
  DELETE FROM public.listing_photos
   WHERE id = (SELECT id FROM public.listing_photos
                WHERE listing_id = v_lst ORDER BY display_order DESC LIMIT 1);
  v_res := public.register_listing_photo(
             v_lst, gen_random_uuid(),
             jsonb_build_object('original', 'e2e/ok'), 10, 10, 10);
  IF NOT (v_res->>'ok')::boolean THEN
    RAISE EXCEPTION 'P2 FAILED (accepted path) — %', v_res;
  END IF;

  -- ================= P3 — the identity door writes both names ==============
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_uid::text, 'role', 'authenticated')::text, true);

  v_res := public.save_posting_identity(NULL, NULL, NULL, 'Abebe', 'Bekele', NULL, NULL);
  IF NOT (v_res->>'ok')::boolean
     OR v_res->>'first_name' <> 'Abebe'
     OR v_res->>'last_name' <> 'Bekele' THEN
    RAISE EXCEPTION 'P3 FAILED (write) — %', v_res;
  END IF;
  SELECT * INTO v_prof FROM public.profiles WHERE user_id = v_uid;
  IF v_prof.first_name <> 'Abebe' OR v_prof.last_name <> 'Bekele' THEN
    RAISE EXCEPTION 'P3 FAILED (stored) — % %', v_prof.first_name, v_prof.last_name;
  END IF;

  v_res := public.save_posting_identity(NULL, NULL, NULL, repeat('a', 61), NULL, NULL, NULL);
  IF (v_res->>'ok')::boolean
     OR v_res->'refusals'->0->>'field' <> 'first_name'
     OR v_res->'refusals'->0->>'reason' <> 'badLength' THEN
    RAISE EXCEPTION 'P3 FAILED (61 chars) — %', v_res;
  END IF;
  SELECT * INTO v_prof FROM public.profiles WHERE user_id = v_uid;
  IF v_prof.first_name <> 'Abebe' THEN
    RAISE EXCEPTION 'P3 FAILED — a refused attempt left a trace: %', v_prof.first_name;
  END IF;

  -- ================= P4 — the map pin door =================================
  v_res := public.set_listing_pin(v_lst, 9.005401, 38.763611, 'exact',
                                  'Bole Road 14');
  IF NOT (v_res->>'ok')::boolean
     OR v_res->>'pin_precision' <> 'exact'
     OR v_res->>'street_address' <> 'Bole Road 14' THEN
    RAISE EXCEPTION 'P4 FAILED (set exact) — %', v_res;
  END IF;
  SELECT * INTO v_lrow FROM public.listings WHERE id = v_lst;
  IF v_lrow.pin_lat <> 9.005401 OR v_lrow.pin_lng <> 38.763611
     OR v_lrow.pin_precision <> 'exact'
     OR v_lrow.street_address <> 'Bole Road 14' THEN
    RAISE EXCEPTION 'P4 FAILED (read back) — % % % %', v_lrow.pin_lat, v_lrow.pin_lng,
      v_lrow.pin_precision, v_lrow.street_address;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listing_revisions
                  WHERE listing_id = v_lst AND after->>'pin_precision' = 'exact') THEN
    RAISE EXCEPTION 'P4 FAILED — no revision captured';
  END IF;

  v_res := public.set_listing_pin(v_lst, 9.005401, 38.763611, 'approx', NULL);
  IF v_res->>'pin_precision' <> 'approx' OR v_res->'street_address' <> 'null'::jsonb THEN
    RAISE EXCEPTION 'P4 FAILED (approx) — %', v_res;
  END IF;

  v_res := public.set_listing_pin(v_lst, NULL, NULL, NULL, NULL);
  SELECT * INTO v_lrow FROM public.listings WHERE id = v_lst;
  IF v_lrow.pin_lat IS NOT NULL OR v_lrow.pin_lng IS NOT NULL
     OR v_lrow.pin_precision IS NOT NULL OR v_lrow.street_address IS NOT NULL THEN
    RAISE EXCEPTION 'P4 FAILED (clear) — %', v_res;
  END IF;

  -- a latitude of 91 refuses BY NAME
  BEGIN
    PERFORM public.set_listing_pin(v_lst, 91, 38.763611, 'exact', NULL);
    RAISE EXCEPTION 'P4 FAILED — a latitude of 91 was accepted';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg NOT LIKE 'badLatitude:%' THEN
      RAISE EXCEPTION 'P4 FAILED (latitude refusal) — %', v_msg;
    END IF;
  END;

  -- a stranger refuses `not your listing`
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_other::text, 'role', 'authenticated')::text, true);
  BEGIN
    PERFORM public.set_listing_pin(v_lst, 9.0, 38.7, 'exact', NULL);
    RAISE EXCEPTION 'P4 FAILED — a stranger set the pin';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg <> 'not your listing' THEN
      RAISE EXCEPTION 'P4 FAILED (stranger refusal) — %', v_msg;
    END IF;
  END;

  -- ---------- cleanup: every scratch row, deepest first ----------
  PERFORM set_config('request.jwt.claims', '{}', true);
  DELETE FROM public.listing_revisions WHERE listing_id = v_lst;
  UPDATE public.listings SET cover_photo_id = NULL WHERE id = v_lst;
  DELETE FROM public.listing_photos WHERE listing_id = v_lst;
  DELETE FROM public.listings WHERE id = v_lst;
  DELETE FROM public.category_attribute_links WHERE id = v_link;
  DELETE FROM public.attributes WHERE id = v_attr;
  DELETE FROM public.category_tree_pointers WHERE child_id = v_cat OR parent_id = v_cat;
  DELETE FROM public.categories WHERE id = v_cat;
  -- The account goes FIRST: the base `user` role row may only leave with its
  -- parent account (public.user_roles_protect), and the profile, directory and
  -- role rows cascade from it.
  DELETE FROM auth.users WHERE id IN (v_uid, v_other);
  DELETE FROM public.user_roles WHERE user_id IN (v_uid, v_other);
  DELETE FROM public.profiles WHERE user_id IN (v_uid, v_other);
  DELETE FROM public.user_directory WHERE user_id IN (v_uid, v_other);

  IF EXISTS (SELECT 1 FROM public.coverage_plans WHERE plan = 'eee_mmaint_plan')
     OR EXISTS (SELECT 1 FROM public.categories WHERE slug = 'e2e-mmaint2-leaf')
     OR EXISTS (SELECT 1 FROM public.attributes WHERE attr_key = 'e2e_mmaint2_unit')
     OR EXISTS (SELECT 1 FROM auth.users WHERE id IN (v_uid, v_other)) THEN
    RAISE EXCEPTION 'PROOF CLEANUP FAILED — scratch residue remains';
  END IF;

  IF (SELECT max_photos FROM public.coverage_plans WHERE plan = 'free') <> 10 THEN
    RAISE EXCEPTION 'PROOF FAILED — the real `free` row was altered';
  END IF;

  RAISE NOTICE 'P1a, P2, P3, P4 PASSED — scratch identities and rows removed.';
END $proof$;

-- ------------------------------------------------------------ READ-BACKS
DO $readback$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ')' AS sig,
           md5(p.prosrc) AS body_md5,
           p.prosecdef AS definer
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('get_posting_schema','validate_listing_attributes',
                         'register_listing_photo','save_posting_identity',
                         'set_listing_pin','seller_plan','plan_photo_cap','plan_caps')
     ORDER BY 1
  LOOP
    RAISE NOTICE 'READ-BACK fn % definer=% md5=%', r.sig, r.definer, r.body_md5;
  END LOOP;

  FOR r IN
    SELECT c.relname AS tbl, a.attname AS col, format_type(a.atttypid, a.atttypmod) AS typ,
           a.attnotnull AS notnull
      FROM pg_attribute a JOIN pg_class c ON c.oid = a.attrelid
      JOIN pg_namespace n ON n.oid = c.relnamespace
     WHERE n.nspname = 'public'
       AND ((c.relname = 'category_attribute_links' AND a.attname IN ('allowed_options','default_value'))
         OR (c.relname = 'coverage_plans' AND a.attname = 'max_photos')
         OR (c.relname = 'profiles' AND a.attname IN ('first_name','last_name'))
         OR (c.relname = 'listings' AND a.attname IN ('pin_lat','pin_lng','pin_precision','street_address')))
     ORDER BY 1, 2
  LOOP
    RAISE NOTICE 'READ-BACK col %.% % notnull=%', r.tbl, r.col, r.typ, r.notnull;
  END LOOP;
END $readback$;

-- --------------------------------------------------------------- THE MARK
INSERT INTO public.migration_marks (version)
VALUES ('20260920000000')
ON CONFLICT DO NOTHING;