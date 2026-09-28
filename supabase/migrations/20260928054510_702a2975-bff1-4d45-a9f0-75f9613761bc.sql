-- D62-1b (DEC-081 hotfix, INC-309) — 'negotiable' is an ALIAS at every step.
-- A pre-D62-2 client sends price_mode 'negotiable'. validate_listing_draft
-- resolved the alias only at step >= 5, so submit_listing stored the raw mode
-- from steps 1–4 and listings_price_mode_check threw. validate_listing_draft
-- is re-declared WHOLE (same signature; INC-183) with the alias resolved at the
-- top. Nothing else changes: no other door, no constraint, no mode list.

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
  v_bad     uuid;
  v_place   uuid;
  v_basis   text[];
  v_bval    text;
  v_fmode   text;
  v_fperiod text;
  v_derived text;
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

-- ---------------------------------------------------------------- proofs
DO $proof$
DECLARE
  v_uid  uuid;
  v_home char(2);
  v_bare uuid := gen_random_uuid();
  v_cur  char(3);
  v_r    jsonb;
  v_l    public.listings%ROWTYPE;
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
  VALUES (v_bare, 'e2e-d62b-bare', 'e2e-d62b-' || replace(v_bare::text,'-',''), true, false, true, 999999,
     false, true, ARRAY[]::text[], 'once', false);

  -- P8 step 1 with the alias: no exception, stored fixed + flag
  v_r := public.submit_listing(NULL, 1::smallint, v_bare, NULL, NULL, NULL, '{}'::jsonb,
           'negotiable', NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);
  SELECT * INTO v_l FROM public.listings WHERE id = (v_r->>'listing_id')::uuid;
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR v_l.price_mode <> 'fixed' OR NOT v_l.price_negotiable THEN
    RAISE EXCEPTION 'PROOF P8 failed % / %', v_r, to_jsonb(v_l) - 'search_tsv'; END IF;
  RAISE NOTICE 'PROOF P8 ok — step 1 negotiable → fixed, price_negotiable=true';

  -- P9 step 5 with the alias and an amount: ok, fixed + flag
  v_r := public.submit_listing(v_l.id, 5::smallint, v_bare, 'e2e d62b', '', NULL, '{}'::jsonb,
           'negotiable', 100, v_cur, 'once', NULL, NULL, NULL, NULL, false);
  SELECT * INTO v_l FROM public.listings WHERE id = v_l.id;
  IF NOT coalesce((v_r->>'ok')::boolean, false) OR v_l.price_mode <> 'fixed' OR NOT v_l.price_negotiable
     OR v_l.price_amount <> 100 THEN
    RAISE EXCEPTION 'PROOF P9 failed % / %', v_r, to_jsonb(v_l) - 'search_tsv'; END IF;
  IF (public.validate_listing_draft(v_uid, 1::smallint, v_bare, NULL, NULL, NULL, '{}'::jsonb,
        'negotiable', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false)->>'price_mode') <> 'fixed' THEN
    RAISE EXCEPTION 'PROOF P9b failed: validate returned a non-fixed mode for the alias'; END IF;
  RAISE NOTICE 'PROOF P9 ok — step 5 negotiable + amount → fixed, flag, amount kept';

  RAISE EXCEPTION USING ERRCODE = 'P0001', MESSAGE = 'D62B_PROOF_ROLLBACK';
EXCEPTION
  WHEN SQLSTATE 'P0001' THEN
    IF SQLERRM <> 'D62B_PROOF_ROLLBACK' THEN RAISE; END IF;
END $proof$;

-- P10 ACL + body read-back
DO $readback$
DECLARE v_acl text;
BEGIN
  SELECT array_to_string(coalesce(proacl, acldefault('f', proowner)), ',') INTO v_acl
    FROM pg_proc WHERE oid = 'public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean)'::regprocedure;
  IF v_acl LIKE '%anon=%' OR v_acl ~ '(^|,)=X' OR v_acl NOT LIKE '%authenticated=X%'
     OR v_acl NOT LIKE '%service_role=X%' THEN
    RAISE EXCEPTION 'READ-BACK P10 failed: acl=%', v_acl; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb, integer, boolean)'::regprocedure
                  AND prosrc LIKE '%WHEN p_price_mode = ''negotiable'' THEN ''fixed''%') THEN
    RAISE EXCEPTION 'READ-BACK P10 failed: alias resolution missing from the body'; END IF;
  RAISE NOTICE 'READ-BACK P10 ok acl=%', v_acl;
END $readback$;

-- ---------------------------------------------------------------- mark
INSERT INTO public.migration_marks (version) VALUES ('20260928060000') ON CONFLICT DO NOTHING;