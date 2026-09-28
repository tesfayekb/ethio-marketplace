-- =====================================================================
-- MIGRATION MARK 20260928040000 — D62-1 (DEC-081 THE PRICE PAGE, database half).
-- Negotiable becomes a FLAG (listings.price_negotiable), never a price mode;
-- the pricing basis is judged on the price step (validate_listing_attributes
-- p_defer_keys); currencies gain symbol + display_order.
-- Bases (re-declared WHOLE, INC-183; live prosrc md5 matched before edit):
--   validate_listing_attributes ← 20260919134523_67ef15da (section 6)
--   validate_listing_draft, submit_listing ← 20260927013608_cdc4c834
--   publish_listing, edit_listing, impersonated_list_listings ← 20260927045940_4312566f
--   price_shape_for_basis ← 20260927003341_e91792f9
-- Every added argument is LAST with a DEFAULT; old signatures DROPPED first
-- (PGRST203). Proofs P1–P7 on scratch rows, rolled back by sentinel.
-- =====================================================================

-- ---------------------------------------------------------------- a. the flag
ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS price_negotiable boolean NOT NULL DEFAULT false;

-- ---------------------------------------------------------------- b. the modes
UPDATE public.listings
   SET price_negotiable = true,
       price_mode = CASE WHEN price_amount IS NULL THEN 'contact' ELSE 'fixed' END
 WHERE price_mode = 'negotiable';

ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_price_mode_check;
ALTER TABLE public.listings ADD CONSTRAINT listings_price_mode_check
  CHECK (price_mode IN ('fixed','free','contact','commission'));
-- listings_price_mode_check is the only constraint naming 'negotiable' (census).

-- ---------------------------------------------------------------- c. currencies
ALTER TABLE public.currencies ADD COLUMN IF NOT EXISTS symbol text;
ALTER TABLE public.currencies ADD COLUMN IF NOT EXISTS display_order smallint NOT NULL DEFAULT 900;

UPDATE public.currencies c
   SET symbol = v.symbol, display_order = v.ord, updated_at = now()
  FROM (VALUES
  ('USD', '$', 1),
  ('ETB', 'Br', 2),
  ('EUR', '€', 3),
  ('GBP', '£', 4),
  ('CAD', 'C$', 5),
  ('AED', 'د.إ', 6),
  ('SAR', '﷼', 7),
  ('KES', 'KSh', 8),
  ('AUD', 'A$', 9),
  ('SEK', 'kr', 10),
  ('NOK', 'kr', 11),
  ('CHF', 'CHF', 12),
  ('ZAR', 'R', 13),
  ('DJF', 'Fdj', 14),
  ('SOS', 'Sh.So.', 15),
  ('ERN', 'Nfk', 16),
  ('UGX', 'USh', 17),
  ('TZS', 'TSh', 18),
  ('SDG', 'SDG', 19),
  ('INR', '₹', 20),
  ('CNY', '¥', 21),
  ('TRY', '₺', 22),
  ('QAR', 'QR', 23),
  ('KWD', 'KD', 24),
  ('OMR', 'OMR', 25),
  ('BHD', 'BD', 26),
  ('ILS', '₪', 27),
  ('JPY', '¥', 28)
  ) AS v(code, symbol, ord)
 WHERE c.code = v.code;
UPDATE public.currencies SET symbol = code, updated_at = now() WHERE symbol IS NULL;
-- The public SELECT policy (currencies_public_read) and grants are unchanged.

-- ---------------------------------------------------------------- d. basis → shape
CREATE OR REPLACE FUNCTION public.price_shape_for_basis(p_value text)
RETURNS TABLE(forced_mode text, period text)
LANGUAGE sql
IMMUTABLE STRICT
SET search_path = public
AS $$
  SELECT CASE p_value
           WHEN 'quote' THEN 'contact'
           WHEN 'commission' THEN 'commission'
           ELSE NULL END::text,
         CASE p_value
           WHEN 'hourly' THEN 'hour'
           WHEN 'per_hour' THEN 'hour'
           WHEN 'per_day' THEN 'day'
           WHEN 'per_night' THEN 'day'
           WHEN 'per_week' THEN 'week'
           WHEN 'per_month' THEN 'month'
           WHEN 'per_year' THEN 'year'
           WHEN 'quote' THEN NULL
           ELSE 'once' END::text;
$$;

REVOKE ALL ON FUNCTION public.price_shape_for_basis(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.price_shape_for_basis(text) TO anon, authenticated;
GRANT ALL ON FUNCTION public.price_shape_for_basis(text) TO service_role;

-- ---------------------------------------------------------------- e. attributes
DROP FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb);

CREATE OR REPLACE FUNCTION public.validate_listing_attributes(
  p_category_id uuid,
  p_attrs jsonb,
  p_prior jsonb DEFAULT NULL,
  p_defer_keys text[] DEFAULT NULL
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
           l.allowed_options, l.visible_when
      FROM public.effective_category_links(p_category_id) e
      JOIN public.attributes a ON a.id = e.attribute_id
      JOIN public.category_attribute_links l ON l.id = e.link_id
     ORDER BY e.display_order, a.attr_key
  LOOP
    v_val := v_attrs -> v_def.attr_key;

    -- M-MAINT-3 / D24 — A LINK WHOSE CONDITION IS NOT MET IS NOT THERE.
    -- It is never refused as `required`, and any value sent for it is DROPPED
    -- from the normalised attrs — so a hidden answer is never stored.
    IF v_def.visible_when IS NOT NULL
       AND NOT public.attr_visible_when_met(v_attrs, v_prior, v_def.visible_when) THEN
      CONTINUE;
    END IF;

    v_absent := v_val IS NULL
             OR jsonb_typeof(v_val) = 'null'
             OR (jsonb_typeof(v_val) = 'string' AND btrim(v_val #>> '{}') = '')
             OR (jsonb_typeof(v_val) = 'array' AND jsonb_array_length(v_val) = 0);

    IF v_absent THEN
      -- DEC-081 — a deferred key (the pricing basis before step 5) is judged later.
      IF v_def.is_required AND NOT (v_def.attr_key = ANY (coalesce(p_defer_keys, ARRAY[]::text[]))) THEN
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
        -- plate-et, alnum:a-b, free:n.
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
          -- D-spec 12 — the LINK narrows the definition's options.
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

REVOKE ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) FROM anon;
GRANT EXECUTE ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) TO authenticated;
GRANT ALL ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) TO service_role;

-- ---------------------------------------------------------------- f. validate
DROP FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer);

CREATE OR REPLACE FUNCTION public.validate_listing_draft(
  p_uid uuid,
  p_step smallint,
  p_category_id uuid,
  p_title text,
  p_description text,
  p_video_url text,
  p_attributes jsonb,
  p_price_mode text,
  p_price_amount numeric,
  p_price_currency char(3),
  p_price_period text,
  p_poster_expires_at timestamptz,
  p_coverage uuid[],
  p_contact_pref jsonb,
  p_prior jsonb,
  p_price_bp integer DEFAULT NULL,
  p_price_negotiable boolean DEFAULT false
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ref     jsonb := '[]'::jsonb;
  v_cat     public.categories%ROWTYPE;
  v_res     jsonb;
  v_attrs   jsonb := '{}'::jsonb;
  v_title   text := btrim(coalesce(p_title, ''));
  v_desc    text := coalesce(p_description, '');
  v_mode    text := coalesce(p_price_mode, 'fixed');
  v_cur     char(3);
  v_period  text;
  v_home    char(2);
  v_days    int;
  v_plan    public.coverage_plans%ROWTYPE;
  v_market  char(2);
  v_cities  int := 0;
  v_regions int := 0;
  v_lands   int := 0;
  v_bad     uuid;
  v_place   uuid;
  v_basis   text[];
  v_bval    text;
  v_fmode   text;
  v_fperiod text;
  v_derived text;
  v_neg     boolean := coalesce(p_price_negotiable, false);
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
    v_neg := coalesce(p_price_negotiable, false) OR v_bval IS NOT DISTINCT FROM 'negotiable';

    IF v_bval IS NOT NULL THEN
      SELECT s.forced_mode, s.period INTO v_fmode, v_fperiod FROM public.price_shape_for_basis(v_bval) s;
      v_mode := coalesce(v_fmode, p_price_mode, 'fixed');
      IF v_fmode IS NOT NULL AND p_price_mode IS NOT NULL AND p_price_mode <> v_fmode THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','modeFollowsBasis','detail',v_fmode));
      END IF;
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

  -- ---- step 6 — coverage against the plan (DEC-064, D19) ----
  IF p_step >= 6 THEN
    IF p_coverage IS NULL OR array_length(p_coverage, 1) IS NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','required'));
    ELSE
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
        SELECT count(DISTINCT l.country_code),
               count(*) FILTER (WHERE l.level IN ('city','sub_city')),
               count(*) FILTER (WHERE l.level = 'region'),
               count(*) FILTER (WHERE l.level = 'country'),
               min(l.country_code)
          INTO v_lands, v_cities, v_regions, v_lands, v_market
          FROM public.locations l WHERE l.id = ANY (p_coverage);
        IF (SELECT count(DISTINCT l.country_code) FROM public.locations l WHERE l.id = ANY (p_coverage)) > 1 THEN
          v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','coverage','reason','multipleMarkets'));
        END IF;
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
        v_place := p_coverage[1];
      END IF;
    END IF;
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

REVOKE ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean) TO service_role;

-- ---------------------------------------------------------------- g. submit
DROP FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer);

CREATE OR REPLACE FUNCTION public.submit_listing(
  p_listing_id uuid,
  p_step smallint,
  p_category_id uuid,
  p_title text,
  p_description text,
  p_video_url text,
  p_attributes jsonb,
  p_price_mode text,
  p_price_amount numeric,
  p_price_currency char(3),
  p_price_period text,
  p_poster_expires_at timestamptz,
  p_coverage uuid[],
  p_contact_pref jsonb,
  p_price_bp integer DEFAULT NULL,
  p_price_negotiable boolean DEFAULT false
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
BEGIN
  -- F5: gates -> capture -> mutate. A refusal writes nothing.
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF p_step IS NULL OR p_step < 1 OR p_step > 8 THEN RAISE EXCEPTION 'unknown step'; END IF;

  IF p_listing_id IS NOT NULL THEN
    SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
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
      video_url, contact_pref, status, home_country_code, draft_step, draft_updated_at
    ) VALUES (
      v_uid, p_category_id, (v_val->>'location_id')::uuid, v_val->>'title', v_val->>'description',
      v_val->'attrs', (v_val->>'price_amount')::numeric, (v_val->>'price_currency')::char(3),
      (v_val->>'price_bp')::int, coalesce((v_val->>'price_negotiable')::boolean, false), v_val->>'price_mode', v_val->>'price_period', p_poster_expires_at,
      p_video_url, coalesce(p_contact_pref, '{"messages": true}'::jsonb), 'draft', v_obs,
      v_step, now()
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
      home_country_code = v_obs,
      draft_step        = v_step,
      draft_updated_at  = now(),
      updated_at        = now()
    WHERE id = p_listing_id
    RETURNING * INTO v_row;
    v_id := v_row.id;
  END IF;

  -- Coverage replaces wholesale (batch) once step 6 has spoken.
  IF p_coverage IS NOT NULL AND array_length(p_coverage, 1) IS NOT NULL THEN
    DELETE FROM public.listing_locations WHERE listing_id = v_id;
    INSERT INTO public.listing_locations (listing_id, location_id)
      SELECT v_id, c.id FROM unnest(p_coverage) c(id)
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

  RETURN jsonb_build_object('ok', true, 'listing_id', v_id, 'draft_step', v_step);
END $$;

REVOKE ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean) TO service_role;

-- ---------------------------------------------------------------- h. publish
CREATE OR REPLACE FUNCTION public.publish_listing(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
  v_cov uuid[];
  v_val jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('draft','rejected') THEN
    RAISE EXCEPTION 'illegal transition: % -> screening', v_row.status;
  END IF;

  SELECT array_agg(ll.location_id) INTO v_cov
    FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id;

  v_val := public.validate_listing_draft(v_uid, 8::smallint, v_row.category_id, v_row.title,
             v_row.description, v_row.video_url, v_row.attributes, v_row.price_mode,
             v_row.price_amount, v_row.price_currency, v_row.price_period,
             v_row.poster_expires_at, v_cov, v_row.contact_pref, v_row.attributes,
             v_row.price_bp, v_row.price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  UPDATE public.listings SET
    status = 'screening',
    published_first_at = coalesce(published_first_at, now()),
    draft_step = 8,
    updated_at = now()
  WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'screening'), v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $$;

REVOKE ALL ON FUNCTION public.publish_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.publish_listing(uuid) TO service_role;

-- ---------------------------------------------------------------- h. edit
DROP FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer);

CREATE OR REPLACE FUNCTION public.edit_listing(
  p_listing_id uuid,
  p_category_id uuid,
  p_title text,
  p_description text,
  p_video_url text,
  p_attributes jsonb,
  p_price_mode text,
  p_price_amount numeric,
  p_price_currency char(3),
  p_price_period text,
  p_poster_expires_at timestamptz,
  p_coverage uuid[],
  p_contact_pref jsonb,
  p_price_bp integer DEFAULT NULL,
  p_price_negotiable boolean DEFAULT false
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_prev.status NOT IN ('active','reduced','rejected','held','expired') THEN
    RAISE EXCEPTION 'edit_listing takes a published listing; a draft writes through submit_listing';
  END IF;

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
    status            = 'screening',
    updated_at        = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;
  INSERT INTO public.listing_locations (listing_id, location_id)
    SELECT p_listing_id, c.id FROM unnest(p_coverage) c(id) ON CONFLICT DO NOTHING;

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
END $$;

REVOKE ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean) TO service_role;

-- ---------------------------------------------------------------- i. impersonation
DROP FUNCTION public.impersonated_list_listings(uuid, int, int);

CREATE FUNCTION public.impersonated_list_listings(
  p_session uuid, p_limit int DEFAULT 25, p_offset int DEFAULT 0)
RETURNS TABLE(id uuid, title text, status text, price_amount numeric,
              price_currency char(3), price_mode text, price_bp integer, price_negotiable boolean,
              created_at timestamptz, total_count bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v_target uuid := public.impersonation_target(p_session);
BEGIN
  RETURN QUERY
  SELECT l.id, l.title, l.status, l.price_amount, l.price_currency,
         l.price_mode, l.price_bp, l.price_negotiable, l.created_at,
         COUNT(*) OVER () AS total_count
  FROM public.listings l
  WHERE l.seller_id = v_target
  ORDER BY l.created_at DESC
  LIMIT GREATEST(COALESCE(p_limit, 25), 1)
  OFFSET GREATEST(COALESCE(p_offset, 0), 0);
END $$;

REVOKE ALL ON FUNCTION public.impersonated_list_listings(uuid, int, int) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.impersonated_list_listings(uuid, int, int) TO authenticated, service_role;
GRANT ALL ON FUNCTION public.impersonated_list_listings(uuid, int, int) TO service_role;

-- ---------------------------------------------------------------- j. proofs
-- D31-C actor pattern (20260927045940:196–220): an existing active account is
-- BORROWED so auth.uid() gates run for real; its residency fact is set inside
-- the block only. Every scratch row is rolled back by sentinel.
DO $proof$
DECLARE
  v_uid  uuid;
  v_home char(2);
  v_bare uuid := gen_random_uuid();
  v_leaf uuid := gen_random_uuid();
  v_attr uuid := gen_random_uuid();
  v_key  text := 'pricing_type-zzd62';
  v_cur  char(3);
  v_r    jsonb;
  v_id   uuid;
  v_l    public.listings%ROWTYPE;
  v_n    int;
BEGIN
  SELECT d.user_id, d.home_country_code INTO v_uid, v_home
    FROM public.user_directory d
    JOIN public.profiles p ON p.user_id = d.user_id
   WHERE d.account_status = 'active' AND p.account_status = 'active'
     AND d.home_country_code IS NOT NULL
   ORDER BY d.created_at LIMIT 1;
  IF v_uid IS NULL THEN RAISE EXCEPTION 'PROOF setup failed: no active seller'; END IF;
  UPDATE public.user_directory SET observed_country_code = v_home WHERE user_id = v_uid;
  SELECT code INTO v_cur FROM public.currencies ORDER BY code LIMIT 1;
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_uid, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_uid::text, true);

  INSERT INTO public.categories
    (id, name_en, slug, price_enabled, is_restricted, is_active, display_order,
     is_catchall, allow_listings, capabilities, default_price_period, price_period_locked)
  VALUES
    (v_bare, 'e2e-d62-bare', 'e2e-d62-' || replace(v_bare::text,'-',''), true, false, true, 999999,
     false, true, ARRAY[]::text[], 'once', false),
    (v_leaf, 'e2e-d62-leaf', 'e2e-d62-' || replace(v_leaf::text,'-',''), true, false, true, 999999,
     false, true, ARRAY[]::text[], 'once', false);
  INSERT INTO public.attributes (id, attr_key, name_en, attr_type, options)
  VALUES (v_attr, v_key, 'e2e d62 basis', 'single_select', jsonb_build_array(
    jsonb_build_object('value','negotiable','label_en','Negotiable','label_am','ድርድር'),
    jsonb_build_object('value','fixed','label_en','Fixed','label_am','ቋሚ')));
  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, is_searchable, display_order)
  VALUES (v_leaf, v_attr, true, false, false, 1);

  -- P1 a fixed price with the flag stores it, and validate's answer carries it
  v_r := public.submit_listing(NULL, 5::smallint, v_bare, 'e2e d62 fixed', '', NULL, '{}'::jsonb,
           'fixed', 100, v_cur, 'once', NULL, NULL, NULL, NULL, true);
  v_id := (v_r->>'listing_id')::uuid;
  SELECT * INTO v_l FROM public.listings WHERE id = v_id;
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR NOT v_l.price_negotiable OR v_l.price_mode <> 'fixed' THEN
    RAISE EXCEPTION 'PROOF P1a failed % / %', v_r, to_jsonb(v_l) - 'search_tsv'; END IF;
  v_r := public.validate_listing_draft(v_uid, 5::smallint, v_bare, 'e2e d62 fixed', '', NULL, '{}'::jsonb,
           'fixed', 100, v_cur, 'once', NULL, NULL, NULL, NULL, NULL, true);
  IF (v_r->>'price_negotiable')::boolean IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'PROOF P1b failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P1 ok — fixed + flag stores price_negotiable=true; validate returns it';

  -- P2 the flag on 'contact' is forced false
  v_r := public.submit_listing(v_id, 5::smallint, v_bare, 'e2e d62 fixed', '', NULL, '{}'::jsonb,
           'contact', NULL, NULL, 'once', NULL, NULL, NULL, NULL, true);
  SELECT * INTO v_l FROM public.listings WHERE id = v_id;
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR v_l.price_negotiable OR v_l.price_mode <> 'contact' THEN
    RAISE EXCEPTION 'PROOF P2 failed % / %', v_r, to_jsonb(v_l) - 'search_tsv'; END IF;
  RAISE NOTICE 'PROOF P2 ok — contact + flag stores price_negotiable=false';

  -- P3 a basis answer 'negotiable' is a fixed price with the flag set
  v_r := public.submit_listing(NULL, 5::smallint, v_leaf, 'e2e d62 basis', '', NULL,
           jsonb_build_object(v_key, 'negotiable'), 'fixed', 100, v_cur, 'once', NULL, NULL, NULL, NULL, false);
  SELECT * INTO v_l FROM public.listings WHERE id = (v_r->>'listing_id')::uuid;
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR v_l.price_mode <> 'fixed'
     OR NOT v_l.price_negotiable OR v_l.price_amount <> 100 THEN
    RAISE EXCEPTION 'PROOF P3 failed % / %', v_r, to_jsonb(v_l) - 'search_tsv'; END IF;
  RAISE NOTICE 'PROOF P3 ok — basis negotiable → mode fixed, price_negotiable=true';

  -- P4 the required basis is deferred at step 3 and refused (once) at step 5
  v_r := public.validate_listing_draft(v_uid, 3::smallint, v_leaf, NULL, NULL, NULL, '{}'::jsonb,
           NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);
  IF NOT coalesce((v_r->>'ok')::boolean, false) THEN RAISE EXCEPTION 'PROOF P4a failed %', v_r; END IF;
  v_r := public.validate_listing_draft(v_uid, 5::smallint, v_leaf, 'e2e d62 basis', '', NULL, '{}'::jsonb,
           'fixed', 100, v_cur, 'once', NULL, NULL, NULL, NULL, NULL, false);
  SELECT count(*) INTO v_n FROM jsonb_array_elements(coalesce(v_r->'refusals','[]'::jsonb)) x
   WHERE x = jsonb_build_object('attr_key', v_key, 'reason', 'required');
  IF coalesce((v_r->>'ok')::boolean, true) OR v_n <> 1 THEN
    RAISE EXCEPTION 'PROOF P4b failed (% matches) %', v_n, v_r; END IF;
  RAISE NOTICE 'PROOF P4 ok — basis absent: no refusal at step 3; one required refusal at step 5';

  -- P5 the constraint refuses the retired mode
  BEGIN
    INSERT INTO public.listings (seller_id, category_id, title, description, attributes,
        price_mode, price_amount, price_currency, price_period, status, home_country_code,
        contact_pref, draft_step)
    VALUES (v_uid, v_bare, 'e2e d62 retired', '', '{}'::jsonb, 'negotiable', 100, v_cur, 'once',
        'draft', v_home, '{"messages":true}'::jsonb, 5);
    RAISE EXCEPTION 'PROOF P5 failed: negotiable mode was accepted';
  EXCEPTION WHEN check_violation THEN
    RAISE NOTICE 'PROOF P5 ok — price_mode negotiable refused by %', SQLERRM;
  END;
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.listings'::regclass
              AND pg_get_constraintdef(oid) ILIKE '%negotiable%') THEN
    RAISE EXCEPTION 'PROOF P5b failed: a constraint still names negotiable'; END IF;

  -- P6 every currency has a symbol; no seeded code is left at 900
  IF EXISTS (SELECT 1 FROM public.currencies WHERE symbol IS NULL OR btrim(symbol) = '') THEN
    RAISE EXCEPTION 'PROOF P6a failed: a currency has no symbol'; END IF;
  IF EXISTS (SELECT 1 FROM public.currencies WHERE display_order = 900 AND code IN
      ('USD','ETB','EUR','GBP','CAD','AED','SAR','KES','AUD','SEK','NOK','CHF','ZAR','DJF',
       'SOS','ERN','UGX','TZS','SDG','INR','CNY','TRY','QAR','KWD','OMR','BHD','ILS','JPY')) THEN
    RAISE EXCEPTION 'PROOF P6b failed: a seeded code is still at 900'; END IF;
  RAISE NOTICE 'PROOF P6 ok — symbols present; seeded order applied';

  RAISE EXCEPTION USING ERRCODE = 'P0001', MESSAGE = 'D62_PROOF_ROLLBACK';
EXCEPTION
  WHEN SQLSTATE 'P0001' THEN
    IF SQLERRM <> 'D62_PROOF_ROLLBACK' THEN RAISE; END IF;
END $proof$;

-- P7 ACL + argument read-back for every re-declared door.
DO $readback$
DECLARE v_fn text; v_acl text; v_n int;
BEGIN
  SELECT count(*) INTO v_n FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname IN ('validate_listing_attributes','validate_listing_draft',
     'submit_listing','publish_listing','edit_listing','impersonated_list_listings');
  IF v_n <> 6 THEN RAISE EXCEPTION 'READ-BACK failed: % overloads', v_n; END IF;
  FOREACH v_fn IN ARRAY ARRAY[
    'public.validate_listing_attributes(uuid, jsonb, jsonb, text[])',
    'public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean)',
    'public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean)',
    'public.publish_listing(uuid)',
    'public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer, boolean)',
    'public.impersonated_list_listings(uuid, int, int)']
  LOOP
    SELECT array_to_string(coalesce(proacl, acldefault('f', proowner)), ',') INTO v_acl
      FROM pg_proc WHERE oid = v_fn::regprocedure;
    IF v_acl LIKE '%anon=%' OR v_acl ~ '(^|,)=X' THEN
      RAISE EXCEPTION 'READ-BACK failed: % acl=%', v_fn, v_acl; END IF;
    IF v_acl NOT LIKE '%authenticated=X%' THEN
      RAISE EXCEPTION 'READ-BACK failed: % lacks authenticated EXECUTE (%)', v_fn, v_acl; END IF;
    RAISE NOTICE 'READ-BACK % acl=%', v_fn, v_acl;
  END LOOP;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.validate_listing_attributes(uuid, jsonb, jsonb, text[])'::regprocedure AND prosrc LIKE '%p_defer_keys%')
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'validate_listing_draft' AND prosrc LIKE '%p_price_negotiable%' AND prosrc NOT LIKE '%''fixed'',''negotiable''%')
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'submit_listing' AND prosrc LIKE '%p_price_negotiable%')
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.publish_listing(uuid)'::regprocedure AND prosrc LIKE '%v_row.price_negotiable%')
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'edit_listing' AND prosrc LIKE '%p_price_negotiable%')
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'impersonated_list_listings' AND prosrc LIKE '%l.price_negotiable%')
     OR EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'price_shape_for_basis' AND prosrc LIKE '%negotiable%') THEN
    RAISE EXCEPTION 'READ-BACK failed: a door is missing its DEC-081 argument'; END IF;
END $readback$;

-- ---------------------------------------------------------------- k. mark
INSERT INTO public.migration_marks (version) VALUES ('20260928040000') ON CONFLICT DO NOTHING;