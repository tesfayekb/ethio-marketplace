-- =====================================================================
-- D31-C (DEC-079 price basis, part C) — THE DOOR FOLLOWS THE BASIS.
-- validate_listing_draft re-declared WHOLE from 20260922150126 and
-- submit_listing WHOLE from 20260917112956 (INC-183), each gaining
-- p_price_bp integer DEFAULT NULL as the LAST parameter. The old signatures
-- are DROPPED first: an overload pair would be ambiguous (PGRST203).
-- validate: byte-identical except step 5 (basis → mode/period, commission)
-- and the return's price_bp. submit: passes p_price_bp; writes price_bp.
-- Tidy: price_basis_keys / price_basis_conflict are internal (no client grant).
-- Proofs P1–P7 on scratch rows, rolled back by sentinel. Mark 20260927040000.
-- =====================================================================

DROP FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb);
DROP FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb);

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
  p_price_bp integer DEFAULT NULL
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
    v_res := public.validate_listing_attributes(p_category_id, coalesce(p_attributes, '{}'::jsonb), p_prior);
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
    END IF;

    IF v_bval IS NOT NULL THEN
      SELECT s.forced_mode, s.period INTO v_fmode, v_fperiod FROM public.price_shape_for_basis(v_bval) s;
      v_mode := coalesce(v_fmode, p_price_mode, 'fixed');
      IF v_fmode IS NOT NULL AND p_price_mode IS NOT NULL AND p_price_mode <> v_fmode THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','modeFollowsBasis','detail',v_fmode));
      END IF;
    END IF;

    IF v_mode NOT IN ('fixed','negotiable','free','contact','commission') THEN
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
    ELSIF v_mode IN ('fixed','negotiable') THEN
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
    'price_amount', CASE WHEN v_mode IN ('fixed','negotiable') THEN p_price_amount ELSE NULL END,
    'price_currency', CASE WHEN v_mode IN ('fixed','negotiable') THEN v_cur ELSE NULL END,
    'price_period', v_period,
    'price_bp', CASE WHEN v_mode = 'commission' THEN p_price_bp ELSE NULL END,
    'location_id', v_place,
    'market', v_market
  );
END $$;

REVOKE ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer) TO authenticated;
GRANT ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer) TO service_role;

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
  p_price_bp integer DEFAULT NULL
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
             coalesce(v_prev.attributes, '{}'::jsonb), p_price_bp);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  IF p_listing_id IS NULL THEN
    INSERT INTO public.listings (
      seller_id, category_id, location_id, title, description, attributes,
      price_amount, price_currency, price_bp, price_mode, price_period, poster_expires_at,
      video_url, contact_pref, status, home_country_code, draft_step, draft_updated_at
    ) VALUES (
      v_uid, p_category_id, (v_val->>'location_id')::uuid, v_val->>'title', v_val->>'description',
      v_val->'attrs', (v_val->>'price_amount')::numeric, (v_val->>'price_currency')::char(3),
      (v_val->>'price_bp')::int, v_val->>'price_mode', v_val->>'price_period', p_poster_expires_at,
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

REVOKE ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer) TO authenticated;
GRANT ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer) TO service_role;

REVOKE EXECUTE ON FUNCTION public.price_basis_keys(uuid) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.price_basis_conflict(uuid, text, jsonb) FROM anon, authenticated;

DO $proof$
DECLARE
  v_uid  uuid := gen_random_uuid();
  v_leaf uuid := gen_random_uuid();
  v_bare uuid := gen_random_uuid();
  v_attr uuid := gen_random_uuid();
  v_cur  char(3);
  v_r    jsonb;
BEGIN
  SELECT code INTO v_cur FROM public.currencies ORDER BY code LIMIT 1;
  INSERT INTO public.categories
    (id, name_en, slug, price_enabled, is_restricted, is_active, display_order,
     is_catchall, allow_listings, capabilities, default_price_period, price_period_locked)
  VALUES
    (v_leaf, 'e2e-d31c-leaf', 'e2e-d31c-' || replace(v_leaf::text,'-',''), true, false, true, 999999,
     false, true, ARRAY[]::text[], 'once', false),
    (v_bare, 'e2e-d31c-bare', 'e2e-d31c-' || replace(v_bare::text,'-',''), true, false, true, 999999,
     false, true, ARRAY[]::text[], 'month', true);
  INSERT INTO public.attributes (id, attr_key, name_en, attr_type, options)
  VALUES (v_attr, 'pricing_type-zzd31c', 'e2e d31c basis', 'single_select', jsonb_build_array(
    jsonb_build_object('value','hourly','label_en','Hourly','label_am','በሰዓት'),
    jsonb_build_object('value','quote','label_en','Quote','label_am','በጥያቄ'),
    jsonb_build_object('value','commission','label_en','Commission','label_am','ኮሚሽን'),
    jsonb_build_object('value','fixed','label_en','Fixed','label_am','ቋሚ')));
  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, is_searchable, display_order, card_rank)
  VALUES (v_leaf, v_attr, true, false, false, 1, 2);

  -- P1 hourly + client 'once' => periodFollowsBasis
  v_r := public.validate_listing_draft(v_uid, 5::smallint, v_leaf, 'e2e d31c title', NULL, NULL, jsonb_build_object('pricing_type-zzd31c', 'hourly'), 'fixed', 100, v_cur, 'once', NULL, NULL, '{}'::jsonb, '{}'::jsonb, NULL);
  IF NOT coalesce(v_r->'refusals', '[]') @> '[{"field":"price_period","reason":"periodFollowsBasis","detail":"hour"}]' THEN
    RAISE EXCEPTION 'PROOF P1 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P1 ok — hourly + once refuses periodFollowsBasis(hour)';

  -- P2 quote + amount => mustBeEmpty; quote without amount => contact
  v_r := public.validate_listing_draft(v_uid, 5::smallint, v_leaf, 'e2e d31c title', NULL, NULL, jsonb_build_object('pricing_type-zzd31c', 'quote'), NULL, 100, NULL, NULL, NULL, NULL, '{}'::jsonb, '{}'::jsonb, NULL);
  IF NOT coalesce(v_r->'refusals', '[]') @> '[{"field":"price_amount","reason":"mustBeEmpty"}]' THEN
    RAISE EXCEPTION 'PROOF P2a failed %', v_r; END IF;
  v_r := public.validate_listing_draft(v_uid, 5::smallint, v_leaf, 'e2e d31c title', NULL, NULL, jsonb_build_object('pricing_type-zzd31c', 'quote'), NULL, NULL, NULL, NULL, NULL, NULL, '{}'::jsonb, '{}'::jsonb, NULL);
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR v_r->>'price_mode' IS DISTINCT FROM 'contact' THEN
    RAISE EXCEPTION 'PROOF P2b failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P2 ok — quote refuses an amount and returns price_mode contact';

  -- P3 commission + 1250 bp => ok
  v_r := public.validate_listing_draft(v_uid, 5::smallint, v_leaf, 'e2e d31c title', NULL, NULL, jsonb_build_object('pricing_type-zzd31c', 'commission'), NULL, NULL, NULL, NULL, NULL, NULL, '{}'::jsonb, '{}'::jsonb, 1250);
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR (v_r->>'price_bp')::int IS DISTINCT FROM 1250
     OR v_r->>'price_amount' IS NOT NULL OR v_r->>'price_currency' IS NOT NULL
     OR v_r->>'price_mode' IS DISTINCT FROM 'commission' THEN
    RAISE EXCEPTION 'PROOF P3 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P3 ok — commission 1250 bp validates, amount and currency NULL';

  -- P4 fixed + bp => mustBeEmpty on price_bp
  v_r := public.validate_listing_draft(v_uid, 5::smallint, v_leaf, 'e2e d31c title', NULL, NULL, jsonb_build_object('pricing_type-zzd31c', 'fixed'), 'fixed', 100, v_cur, NULL, NULL, NULL, '{}'::jsonb, '{}'::jsonb, 500);
  IF NOT coalesce(v_r->'refusals', '[]') @> '[{"field":"price_bp","reason":"mustBeEmpty"}]' THEN
    RAISE EXCEPTION 'PROOF P4 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P4 ok — a bp on a money price refuses mustBeEmpty';

  -- P5 hourly + commission => commissionNotOffered
  v_r := public.validate_listing_draft(v_uid, 5::smallint, v_leaf, 'e2e d31c title', NULL, NULL, jsonb_build_object('pricing_type-zzd31c', 'hourly'), 'commission', NULL, NULL, NULL, NULL, NULL, '{}'::jsonb, '{}'::jsonb, 1000);
  IF NOT coalesce(v_r->'refusals', '[]') @> '[{"field":"price_mode","reason":"commissionNotOffered"}]' THEN
    RAISE EXCEPTION 'PROOF P5 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P5 ok — commission off a commission basis refuses commissionNotOffered';

  -- P6 commission, no bp => required
  v_r := public.validate_listing_draft(v_uid, 5::smallint, v_leaf, 'e2e d31c title', NULL, NULL, jsonb_build_object('pricing_type-zzd31c', 'commission'), NULL, NULL, NULL, NULL, NULL, NULL, '{}'::jsonb, '{}'::jsonb, NULL);
  IF NOT coalesce(v_r->'refusals', '[]') @> '[{"field":"price_bp","reason":"required"}]' THEN
    RAISE EXCEPTION 'PROOF P6 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P6 ok — commission without bp refuses required';

  -- P7 basis-less leaf, locked month, client once => periodLocked (DEC-067)
  v_r := public.validate_listing_draft(v_uid, 5::smallint, v_bare, 'e2e d31c title', NULL, NULL, '{}'::jsonb, 'fixed', 100, v_cur, 'once', NULL, NULL, '{}'::jsonb, '{}'::jsonb, NULL);
  IF NOT coalesce(v_r->'refusals', '[]') @> '[{"field":"price_period","reason":"periodLocked","detail":"month"}]' THEN
    RAISE EXCEPTION 'PROOF P7 failed %', v_r; END IF;
  RAISE NOTICE 'PROOF P7 ok — basis-less locked leaf still refuses periodLocked(month)';

  RAISE EXCEPTION USING ERRCODE = 'P0001', MESSAGE = 'D31C_PROOF_ROLLBACK';
EXCEPTION
  WHEN SQLSTATE 'P0001' THEN
    IF SQLERRM <> 'D31C_PROOF_ROLLBACK' THEN RAISE; END IF;
END $proof$;

DO $readback$
DECLARE v_fn text; v_acl text; v_n int;
BEGIN
  SELECT count(*) INTO v_n FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname IN ('validate_listing_draft','submit_listing');
  IF v_n <> 2 THEN RAISE EXCEPTION 'READ-BACK failed: % door overloads', v_n; END IF;
  FOREACH v_fn IN ARRAY ARRAY['public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer)','public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, integer)',
    'public.price_basis_keys(uuid)','public.price_basis_conflict(uuid,text,jsonb)']
  LOOP
    SELECT array_to_string(coalesce(proacl, acldefault('f', proowner)), ',') INTO v_acl
      FROM pg_proc WHERE oid = v_fn::regprocedure;
    RAISE NOTICE 'READ-BACK % acl=%', v_fn, v_acl;
  END LOOP;
END $readback$;

INSERT INTO public.migration_marks (version) VALUES ('20260927040000') ON CONFLICT DO NOTHING;