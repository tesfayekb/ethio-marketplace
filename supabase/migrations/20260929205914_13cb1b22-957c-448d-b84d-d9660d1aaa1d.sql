-- W6-R PART A — INC-340 + INC-341 (2026-09-29).
-- validate_listing_draft is re-declared WHOLE (INC-183) from its live base
-- a3a572bf (md5 64539a18c20b5f7ae2b327809d8af2ab, read back before this file)
-- with ONE change, INC-341: the step-6 counts. Every place is now a city or a
-- sub-city, so
--   v_cities  = distinct cities, a sub-city counting as its own city (coalesce(city_id, id));
--   v_regions = distinct region_id of the chosen places;
--   v_lands   = distinct country_code.
-- Before this, region-LEVEL nodes were counted (always 0), so max_regions was
-- never enforced by the door.
-- INC-340 / G27: the proofs depend on NO reference place or country row. They
-- build scratch markets (free ISO user-assigned codes picked at runtime) inside
-- one rolled-back block. The 'free' plan row is read, never written.
-- STAGING: this file REPLACES a3a572bf there (a3a572bf is never applied on
-- staging). It inserts its own mark AND a3a572bf's mark 20260929235900; the
-- preflight (scripts/e2e-migration-preflight.ts, missingAgainstLedger) accepts a
-- file when its declared mark is in the ledger, so no allowlist line is needed.

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

REVOKE ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean) TO service_role;

-- ---------------------------------------------------------------- proofs
-- G27 for proofs (INC-340): NO reference place or country row is read. Two
-- scratch markets on FREE user-assigned ISO codes (picked at runtime), a
-- scratch category and a scratch draft; the 'free' plan row is read only.
-- Everything rolls back. No proof skips.
DO $proof$
DECLARE
  v_uid   uuid;
  v_m1    char(2);
  v_m2    char(2);
  v_a1    uuid;
  v_a2    uuid;
  v_r1    uuid;
  v_r2    uuid;
  v_c1    uuid;
  v_c2    uuid;
  v_c3    uuid;
  v_s1    uuid;
  v_mr    uuid;
  v_mc    uuid;
  v_leaf  uuid := gen_random_uuid();
  v_id    uuid;
  v_r     jsonb;
  v_plan  public.coverage_plans%ROWTYPE;
  v_tag   text := replace(gen_random_uuid()::text, '-', '');
  v_codes text[];
BEGIN
  SELECT * INTO v_plan FROM public.coverage_plans WHERE plan = 'free';
  IF NOT FOUND THEN RAISE EXCEPTION 'PROOF setup failed: no free plan'; END IF;

  SELECT d.user_id INTO v_uid
    FROM public.user_directory d
    JOIN public.profiles p ON p.user_id = d.user_id
   WHERE d.account_status = 'active' AND p.account_status = 'active'
   ORDER BY d.created_at LIMIT 1;
  IF v_uid IS NULL THEN RAISE EXCEPTION 'PROOF setup failed: no active seller'; END IF;

  -- Free user-assigned codes: AA, QM–QZ, XA–XZ, ZZ, not already present.
  SELECT array_agg(s.c ORDER BY s.c) INTO v_codes
    FROM unnest(ARRAY['AA','ZZ']
        || ARRAY(SELECT 'Q' || chr(g) FROM generate_series(ascii('M'), ascii('Z')) g)
        || ARRAY(SELECT 'X' || chr(g) FROM generate_series(ascii('A'), ascii('Z')) g)) s(c)
   WHERE NOT EXISTS (SELECT 1 FROM public.countries k WHERE k.code = s.c);
  IF coalesce(cardinality(v_codes), 0) < 2 THEN
    RAISE EXCEPTION 'PROOF setup failed: fewer than two free user-assigned codes'; END IF;
  v_m1 := v_codes[1];
  v_m2 := v_codes[2];

  INSERT INTO public.countries (code, name_en, is_active)
  VALUES (v_m1, 'e2e w6r market ' || v_m1, true), (v_m2, 'e2e w6r market ' || v_m2, true);
  -- countries_anchor_on_insert creates each anchor inactive; open them.
  UPDATE public.locations SET is_active = true WHERE level = 'country' AND country_code IN (v_m1, v_m2);
  SELECT id INTO STRICT v_a1 FROM public.locations WHERE level = 'country' AND country_code = v_m1;
  SELECT id INTO STRICT v_a2 FROM public.locations WHERE level = 'country' AND country_code = v_m2;

  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
  VALUES (v_a1, 'region', v_m1, 'e2e r1', 'e2e-w6r-r1-' || v_tag, true, 'admin') RETURNING id INTO v_r1;
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
  VALUES (v_a1, 'region', v_m1, 'e2e r2', 'e2e-w6r-r2-' || v_tag, true, 'admin') RETURNING id INTO v_r2;
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
  VALUES (v_r1, 'city', v_m1, 'e2e c1', 'e2e-w6r-c1-' || v_tag, true, 'admin', 9.03, 38.74) RETURNING id INTO v_c1;
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
  VALUES (v_r1, 'city', v_m1, 'e2e c2', 'e2e-w6r-c2-' || v_tag, true, 'admin', 9.04, 38.75) RETURNING id INTO v_c2;
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
  VALUES (v_c1, 'sub_city', v_m1, 'e2e s1', 'e2e-w6r-s1-' || v_tag, true, 'admin', 9.02, 38.73) RETURNING id INTO v_s1;
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
  VALUES (v_r2, 'city', v_m1, 'e2e c3', 'e2e-w6r-c3-' || v_tag, true, 'admin', 8.55, 39.27) RETURNING id INTO v_c3;
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
  VALUES (v_a2, 'region', v_m2, 'e2e mr', 'e2e-w6r-mr-' || v_tag, true, 'admin') RETURNING id INTO v_mr;
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
  VALUES (v_mr, 'city', v_m2, 'e2e mc', 'e2e-w6r-mc-' || v_tag, true, 'admin', 15.33, 38.93) RETURNING id INTO v_mc;

  INSERT INTO public.categories
    (id, name_en, slug, price_enabled, is_restricted, is_active, display_order,
     is_catchall, allow_listings, capabilities, default_price_period, price_period_locked)
  VALUES (v_leaf, 'e2e-w6r-leaf', 'e2e-w6r-' || v_tag, true, false, true, 999999,
     false, true, ARRAY[]::text[], 'once', false);

  -- P22 region-only coverage → cityRequired
  v_r := public.validate_listing_draft(v_uid, 6::smallint, v_leaf, 'e2e w6r', NULL, NULL, '{}'::jsonb,
           'free', NULL, NULL, NULL, NULL, ARRAY[v_r1], NULL, NULL, NULL, false);
  IF NOT coalesce(v_r->'refusals','[]'::jsonb) @> jsonb_build_array(jsonb_build_object('field','coverage','reason','cityRequired','detail',v_r1::text)) THEN
    RAISE EXCEPTION 'PROOF P22 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P22 ok — region-only coverage → cityRequired';

  -- P23 a country anchor → cityRequired
  v_r := public.validate_listing_draft(v_uid, 6::smallint, v_leaf, 'e2e w6r', NULL, NULL, '{}'::jsonb,
           'free', NULL, NULL, NULL, NULL, ARRAY[v_a1], NULL, NULL, NULL, false);
  IF NOT coalesce(v_r->'refusals','[]'::jsonb) @> jsonb_build_array(jsonb_build_object('field','coverage','reason','cityRequired','detail',v_a1::text)) THEN
    RAISE EXCEPTION 'PROOF P23 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P23 ok — country anchor → cityRequired';

  -- P24 a city → accepted, and it is the item's place
  v_r := public.validate_listing_draft(v_uid, 6::smallint, v_leaf, 'e2e w6r', NULL, NULL, '{}'::jsonb,
           'free', NULL, NULL, NULL, NULL, ARRAY[v_c1], NULL, NULL, NULL, false);
  IF coalesce(v_r->'refusals','[]'::jsonb) @> '[{"field":"coverage"}]'::jsonb OR (v_r->>'location_id')::uuid IS DISTINCT FROM v_c1 THEN
    RAISE EXCEPTION 'PROOF P24 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P24 ok — a city → accepted';

  -- P25 a sub-city → accepted
  v_r := public.validate_listing_draft(v_uid, 6::smallint, v_leaf, 'e2e w6r', NULL, NULL, '{}'::jsonb,
           'free', NULL, NULL, NULL, NULL, ARRAY[v_s1], NULL, NULL, NULL, false);
  IF coalesce(v_r->'refusals','[]'::jsonb) @> '[{"field":"coverage"}]'::jsonb OR (v_r->>'location_id')::uuid IS DISTINCT FROM v_s1 THEN
    RAISE EXCEPTION 'PROOF P25 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P25 ok — a sub-city → accepted';

  -- P26 two cities in two markets → coverageExceedsPlan:country (detail 2) iff the plan allows < 2; never multipleMarkets
  v_r := public.validate_listing_draft(v_uid, 6::smallint, v_leaf, 'e2e w6r', NULL, NULL, '{}'::jsonb,
           'free', NULL, NULL, NULL, NULL, ARRAY[v_c1, v_mc], NULL, NULL, NULL, false);
  IF (coalesce(v_r->'refusals','[]'::jsonb) @> jsonb_build_array(jsonb_build_object('field','coverage','reason','coverageExceedsPlan:country','detail','2')))
     IS DISTINCT FROM (v_plan.max_countries < 2) THEN
    RAISE EXCEPTION 'PROOF P26 failed: country count (max_countries %) %', v_plan.max_countries, v_r; END IF;
  IF coalesce(v_r->'refusals','[]'::jsonb) @> '[{"reason":"multipleMarkets"}]'::jsonb THEN
    RAISE EXCEPTION 'PROOF P26 failed: multipleMarkets still raised %', v_r; END IF;
  RAISE NOTICE 'PROOF P26 ok — two markets counted as 2 countries, no multipleMarkets';

  -- P28 (INC-341) C1 + C3: two regions of one market → coverageExceedsPlan:region (detail 2) iff the plan allows < 2
  v_r := public.validate_listing_draft(v_uid, 6::smallint, v_leaf, 'e2e w6r', NULL, NULL, '{}'::jsonb,
           'free', NULL, NULL, NULL, NULL, ARRAY[v_c1, v_c3], NULL, NULL, NULL, false);
  IF (coalesce(v_r->'refusals','[]'::jsonb) @> jsonb_build_array(jsonb_build_object('field','coverage','reason','coverageExceedsPlan:region','detail','2')))
     IS DISTINCT FROM (v_plan.max_regions < 2) THEN
    RAISE EXCEPTION 'PROOF P28 failed: region count (max_regions %) %', v_plan.max_regions, v_r; END IF;
  IF coalesce(v_r->'refusals','[]'::jsonb) @> '[{"reason":"coverageExceedsPlan:country"}]'::jsonb THEN
    RAISE EXCEPTION 'PROOF P28 failed: one market counted as more %', v_r; END IF;
  RAISE NOTICE 'PROOF P28 ok — two regions of one market counted as 2 regions, 1 country';

  -- P29 C1 + S1: a city and its own sub-city → ONE city, one region, one country
  v_r := public.validate_listing_draft(v_uid, 6::smallint, v_leaf, 'e2e w6r', NULL, NULL, '{}'::jsonb,
           'free', NULL, NULL, NULL, NULL, ARRAY[v_c1, v_s1], NULL, NULL, NULL, false);
  IF coalesce(v_r->'refusals','[]'::jsonb) @> '[{"reason":"coverageExceedsPlan:city"}]'::jsonb
     OR coalesce(v_r->'refusals','[]'::jsonb) @> '[{"reason":"coverageExceedsPlan:region"}]'::jsonb
     OR coalesce(v_r->'refusals','[]'::jsonb) @> '[{"reason":"coverageExceedsPlan:country"}]'::jsonb THEN
    RAISE EXCEPTION 'PROOF P29 failed: city + own sub-city over-counted %', v_r; END IF;
  -- and the control: two DIFFERENT cities of one region are two cities
  v_r := public.validate_listing_draft(v_uid, 6::smallint, v_leaf, 'e2e w6r', NULL, NULL, '{}'::jsonb,
           'free', NULL, NULL, NULL, NULL, ARRAY[v_c1, v_c2], NULL, NULL, NULL, false);
  IF (coalesce(v_r->'refusals','[]'::jsonb) @> jsonb_build_array(jsonb_build_object('field','coverage','reason','coverageExceedsPlan:city','detail','2')))
     IS DISTINCT FROM (v_plan.max_cities < 2) THEN
    RAISE EXCEPTION 'PROOF P29 failed: control C1 + C2 (max_cities %) %', v_plan.max_cities, v_r; END IF;
  RAISE NOTICE 'PROOF P29 ok — a city and its own sub-city count as ONE city';

  -- P27 a save at p_step 3 carrying region-only coverage → cityRequired, nothing written
  UPDATE public.user_directory SET observed_country_code = v_m1 WHERE user_id = v_uid;
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_uid, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_uid::text, true);
  v_r := public.submit_listing(NULL, 1::smallint, v_leaf, NULL, NULL, NULL, '{}'::jsonb,
           NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);
  IF NOT coalesce((v_r->>'ok')::boolean, false) THEN RAISE EXCEPTION 'PROOF P27 setup failed %', v_r; END IF;
  v_id := (v_r->>'listing_id')::uuid;
  v_r := public.submit_listing(v_id, 3::smallint, v_leaf, NULL, NULL, NULL, '{}'::jsonb,
           NULL, NULL, NULL, NULL, NULL, ARRAY[v_r1], NULL, NULL, false);
  IF coalesce((v_r->>'ok')::boolean, true)
     OR NOT coalesce(v_r->'refusals','[]'::jsonb) @> jsonb_build_array(jsonb_build_object('field','coverage','reason','cityRequired')) THEN
    RAISE EXCEPTION 'PROOF P27 failed: not refused %', v_r; END IF;
  IF EXISTS (SELECT 1 FROM public.listing_locations WHERE listing_id = v_id)
     OR (SELECT draft_step FROM public.listings WHERE id = v_id) <> 1 THEN
    RAISE EXCEPTION 'PROOF P27 failed: something was written'; END IF;
  v_r := public.submit_listing(v_id, 3::smallint, v_leaf, NULL, NULL, NULL, '{}'::jsonb,
           NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);
  IF NOT coalesce((v_r->>'ok')::boolean, false) THEN
    RAISE EXCEPTION 'PROOF P27 failed: coverage required below step 6 %', v_r; END IF;
  RAISE NOTICE 'PROOF P27 ok — step-3 region-only save → cityRequired, nothing written; no coverage → ok';

  RAISE EXCEPTION USING ERRCODE = 'P0001', MESSAGE = 'W6R_PROOF_ROLLBACK';
EXCEPTION
  WHEN SQLSTATE 'P0001' THEN
    IF SQLERRM <> 'W6R_PROOF_ROLLBACK' THEN RAISE; END IF;
END $proof$;

-- READ-BACK: ACL unchanged; body carries cityRequired, no multipleMarkets, the three distinct counts
DO $readback$
DECLARE v_acl text;
BEGIN
  SELECT array_to_string(coalesce(proacl, acldefault('f', proowner)), ',') INTO v_acl
    FROM pg_proc WHERE oid = 'public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean)'::regprocedure;
  IF v_acl LIKE '%anon=%' OR v_acl ~ '(^|,)=X' OR v_acl NOT LIKE '%authenticated=X%'
     OR v_acl NOT LIKE '%service_role=X%' THEN
    RAISE EXCEPTION 'READ-BACK failed: acl=%', v_acl; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean)'::regprocedure
                  AND prosrc LIKE '%cityRequired%' AND prosrc NOT LIKE '%multipleMarkets%'
                  AND prosrc LIKE '%DEC-086%'
                  AND prosrc LIKE '%count(DISTINCT l.country_code)%'
                  AND prosrc LIKE '%count(DISTINCT coalesce(l.city_id, l.id))%'
                  AND prosrc LIKE '%count(DISTINCT l.region_id)%'
                  AND prosrc LIKE '%INTO v_lands, v_cities, v_regions, v_anchors, v_market%') THEN
    RAISE EXCEPTION 'READ-BACK failed: body'; END IF;
  RAISE NOTICE 'READ-BACK ok acl=%', v_acl;
END $readback$;

-- ---------------------------------------------------------------- marks
-- a3a572bf's mark: on staging this file replaces a3a572bf.
INSERT INTO public.migration_marks (version) VALUES ('20260929235900') ON CONFLICT DO NOTHING;
-- this file's own declared mark (the newest literal in the file).
INSERT INTO public.migration_marks (version) VALUES ('20260930001000') ON CONFLICT DO NOTHING;