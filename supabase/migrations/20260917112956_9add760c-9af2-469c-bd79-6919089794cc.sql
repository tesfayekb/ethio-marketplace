-- U6-A2-M1 — THE DRAFT AND LIFECYCLE DOORS (Tier A).
-- Spec: docs/governance/u6-posting-spec.md §3–§4 A2 and §12
--   (D12 step validation, D13 currency, D14 draft timestamps, D19 sub-city coverage);
--   DEC-064 (coverage plans), DEC-067 (price/period), DEC-068 (server-derived residency).
-- INC-183: every re-declared function is restated WHOLE (DROP+CREATE where the
--   signature changes); no text-anchored patching.
-- INC-212: every new table REVOKEs its birth grants from anon/authenticated
--   before its own GRANTs.
-- Declared mark: 20260917120000 (last statement).
-- No path to 'active' exists from any owner door: publish lands in 'screening'
-- and only the D1 gateway (service_role / listings:review) may move it on.

-- =====================================================================
-- A. public.currencies — the D13 currency reference
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.currencies (
  code        char(3) PRIMARY KEY,
  name_en     text NOT NULL,
  minor_units smallint NOT NULL DEFAULT 2,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT currencies_code_shape CHECK (code ~ '^[A-Z]{3}$'),
  CONSTRAINT currencies_minor_units_range CHECK (minor_units BETWEEN 0 AND 4)
);

COMMENT ON TABLE public.currencies IS
  'D13: the currency allowlist. A seller posts in any listed currency; viewers see the amount as posted.';

-- INC-212: Supabase''s default privileges grant every new public table to
-- anon/authenticated at birth. Revoke first, then grant deliberately.
REVOKE ALL ON public.currencies FROM anon, authenticated;
GRANT SELECT ON public.currencies TO anon, authenticated;
GRANT ALL ON public.currencies TO service_role;

ALTER TABLE public.currencies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS currencies_public_read ON public.currencies;
CREATE POLICY currencies_public_read ON public.currencies
  FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.currencies (code, name_en, minor_units) VALUES
  ('AED', 'UAE Dirham', 2),
  ('AFN', 'Afghani', 2),
  ('ALL', 'Lek', 2),
  ('AMD', 'Armenian Dram', 2),
  ('ANG', 'Netherlands Antillean Guilder', 2),
  ('AOA', 'Kwanza', 2),
  ('ARS', 'Argentine Peso', 2),
  ('AUD', 'Australian Dollar', 2),
  ('AWG', 'Aruban Florin', 2),
  ('AZN', 'Azerbaijan Manat', 2),
  ('BAM', 'Convertible Mark', 2),
  ('BBD', 'Barbados Dollar', 2),
  ('BDT', 'Taka', 2),
  ('BGN', 'Bulgarian Lev', 2),
  ('BHD', 'Bahraini Dinar', 3),
  ('BIF', 'Burundi Franc', 0),
  ('BMD', 'Bermudian Dollar', 2),
  ('BND', 'Brunei Dollar', 2),
  ('BOB', 'Boliviano', 2),
  ('BRL', 'Brazilian Real', 2),
  ('BSD', 'Bahamian Dollar', 2),
  ('BTN', 'Ngultrum', 2),
  ('BWP', 'Pula', 2),
  ('BYN', 'Belarusian Ruble', 2),
  ('BZD', 'Belize Dollar', 2),
  ('CAD', 'Canadian Dollar', 2),
  ('CDF', 'Congolese Franc', 2),
  ('CHF', 'Swiss Franc', 2),
  ('CLP', 'Chilean Peso', 0),
  ('CNY', 'Yuan Renminbi', 2),
  ('COP', 'Colombian Peso', 2),
  ('CRC', 'Costa Rican Colon', 2),
  ('CUP', 'Cuban Peso', 2),
  ('CVE', 'Cabo Verde Escudo', 2),
  ('CZK', 'Czech Koruna', 2),
  ('DJF', 'Djibouti Franc', 0),
  ('DKK', 'Danish Krone', 2),
  ('DOP', 'Dominican Peso', 2),
  ('DZD', 'Algerian Dinar', 2),
  ('EGP', 'Egyptian Pound', 2),
  ('ERN', 'Nakfa', 2),
  ('ETB', 'Ethiopian Birr', 2),
  ('EUR', 'Euro', 2),
  ('FJD', 'Fiji Dollar', 2),
  ('FKP', 'Falkland Islands Pound', 2),
  ('GBP', 'Pound Sterling', 2),
  ('GEL', 'Lari', 2),
  ('GHS', 'Ghana Cedi', 2),
  ('GIP', 'Gibraltar Pound', 2),
  ('GMD', 'Dalasi', 2),
  ('GNF', 'Guinean Franc', 0),
  ('GTQ', 'Quetzal', 2),
  ('GYD', 'Guyana Dollar', 2),
  ('HKD', 'Hong Kong Dollar', 2),
  ('HNL', 'Lempira', 2),
  ('HTG', 'Gourde', 2),
  ('HUF', 'Forint', 2),
  ('IDR', 'Rupiah', 2),
  ('ILS', 'New Israeli Sheqel', 2),
  ('INR', 'Indian Rupee', 2),
  ('IQD', 'Iraqi Dinar', 3),
  ('IRR', 'Iranian Rial', 2),
  ('ISK', 'Iceland Krona', 0),
  ('JMD', 'Jamaican Dollar', 2),
  ('JOD', 'Jordanian Dinar', 3),
  ('JPY', 'Yen', 0),
  ('KES', 'Kenyan Shilling', 2),
  ('KGS', 'Som', 2),
  ('KHR', 'Riel', 2),
  ('KMF', 'Comorian Franc', 0),
  ('KPW', 'North Korean Won', 2),
  ('KRW', 'Won', 0),
  ('KWD', 'Kuwaiti Dinar', 3),
  ('KYD', 'Cayman Islands Dollar', 2),
  ('KZT', 'Tenge', 2),
  ('LAK', 'Lao Kip', 2),
  ('LBP', 'Lebanese Pound', 2),
  ('LKR', 'Sri Lanka Rupee', 2),
  ('LRD', 'Liberian Dollar', 2),
  ('LSL', 'Loti', 2),
  ('LYD', 'Libyan Dinar', 3),
  ('MAD', 'Moroccan Dirham', 2),
  ('MDL', 'Moldovan Leu', 2),
  ('MGA', 'Malagasy Ariary', 2),
  ('MKD', 'Denar', 2),
  ('MMK', 'Kyat', 2),
  ('MNT', 'Tugrik', 2),
  ('MOP', 'Pataca', 2),
  ('MRU', 'Ouguiya', 2),
  ('MUR', 'Mauritius Rupee', 2),
  ('MVR', 'Rufiyaa', 2),
  ('MWK', 'Malawi Kwacha', 2),
  ('MXN', 'Mexican Peso', 2),
  ('MYR', 'Malaysian Ringgit', 2),
  ('MZN', 'Mozambique Metical', 2),
  ('NAD', 'Namibia Dollar', 2),
  ('NGN', 'Naira', 2),
  ('NIO', 'Cordoba Oro', 2),
  ('NOK', 'Norwegian Krone', 2),
  ('NPR', 'Nepalese Rupee', 2),
  ('NZD', 'New Zealand Dollar', 2),
  ('OMR', 'Rial Omani', 3),
  ('PAB', 'Balboa', 2),
  ('PEN', 'Sol', 2),
  ('PGK', 'Kina', 2),
  ('PHP', 'Philippine Peso', 2),
  ('PKR', 'Pakistan Rupee', 2),
  ('PLN', 'Zloty', 2),
  ('PYG', 'Guarani', 0),
  ('QAR', 'Qatari Rial', 2),
  ('RON', 'Romanian Leu', 2),
  ('RSD', 'Serbian Dinar', 2),
  ('RUB', 'Russian Ruble', 2),
  ('RWF', 'Rwanda Franc', 0),
  ('SAR', 'Saudi Riyal', 2),
  ('SBD', 'Solomon Islands Dollar', 2),
  ('SCR', 'Seychelles Rupee', 2),
  ('SDG', 'Sudanese Pound', 2),
  ('SEK', 'Swedish Krona', 2),
  ('SGD', 'Singapore Dollar', 2),
  ('SHP', 'Saint Helena Pound', 2),
  ('SLE', 'Leone', 2),
  ('SOS', 'Somali Shilling', 2),
  ('SRD', 'Surinam Dollar', 2),
  ('SSP', 'South Sudanese Pound', 2),
  ('STN', 'Dobra', 2),
  ('SVC', 'El Salvador Colon', 2),
  ('SYP', 'Syrian Pound', 2),
  ('SZL', 'Lilangeni', 2),
  ('THB', 'Baht', 2),
  ('TJS', 'Somoni', 2),
  ('TMT', 'Turkmenistan New Manat', 2),
  ('TND', 'Tunisian Dinar', 3),
  ('TOP', 'Pa''anga', 2),
  ('TRY', 'Turkish Lira', 2),
  ('TTD', 'Trinidad and Tobago Dollar', 2),
  ('TWD', 'New Taiwan Dollar', 2),
  ('TZS', 'Tanzanian Shilling', 2),
  ('UAH', 'Hryvnia', 2),
  ('UGX', 'Uganda Shilling', 0),
  ('USD', 'US Dollar', 2),
  ('UYU', 'Peso Uruguayo', 2),
  ('UZS', 'Uzbekistan Sum', 2),
  ('VES', 'Bolivar Soberano', 2),
  ('VND', 'Dong', 0),
  ('VUV', 'Vatu', 0),
  ('WST', 'Tala', 2),
  ('XAF', 'CFA Franc BEAC', 0),
  ('XCD', 'East Caribbean Dollar', 2),
  ('XCG', 'Caribbean Guilder', 2),
  ('XOF', 'CFA Franc BCEAO', 0),
  ('XPF', 'CFP Franc', 0),
  ('YER', 'Yemeni Rial', 2),
  ('ZAR', 'Rand', 2),
  ('ZMW', 'Zambian Kwacha', 2),
  ('ZWG', 'Zimbabwe Gold', 2)
ON CONFLICT (code) DO NOTHING;

DO $$
DECLARE v_n int; v_bad int; v_missing text;
BEGIN
  SELECT count(*) INTO v_n FROM public.currencies;
  IF v_n < 150 THEN RAISE EXCEPTION 'currencies seed FAILED: only % rows', v_n; END IF;
  SELECT count(*) INTO v_bad FROM public.currencies WHERE code !~ '^[A-Z]{3}$';
  IF v_bad > 0 THEN RAISE EXCEPTION 'currencies seed FAILED: % malformed codes', v_bad; END IF;
  SELECT string_agg(DISTINCT k.currency_code, ',') INTO v_missing
    FROM public.countries k
   WHERE k.currency_code IS NOT NULL
     AND NOT EXISTS (SELECT 1 FROM public.currencies c WHERE c.code = k.currency_code);
  IF v_missing IS NOT NULL THEN
    RAISE EXCEPTION 'currencies seed FAILED: countries use unseeded codes (%)', v_missing;
  END IF;
  RAISE NOTICE 'READ-BACK PASS: currencies seeded, % rows, every countries.currency_code present', v_n;
END $$;

-- =====================================================================
-- B. listings — D14 draft facts; the one-country trigger retires
-- =====================================================================
ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS draft_step smallint NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS draft_updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS published_first_at timestamptz,
  ADD COLUMN IF NOT EXISTS renewed_count integer NOT NULL DEFAULT 0;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'listings_draft_step_range') THEN
    ALTER TABLE public.listings
      ADD CONSTRAINT listings_draft_step_range CHECK (draft_step BETWEEN 0 AND 8);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'listings_renewed_count_range') THEN
    ALTER TABLE public.listings
      ADD CONSTRAINT listings_renewed_count_range CHECK (renewed_count >= 0);
  END IF;
END $$;

-- A draft exists before a place is chosen (step 6 sets it); anything that has
-- left 'draft' must carry its place. The NOT NULL moves from the column to the
-- lifecycle where it belongs.
ALTER TABLE public.listings ALTER COLUMN location_id DROP NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'listings_place_unless_draft') THEN
    ALTER TABLE public.listings
      ADD CONSTRAINT listings_place_unless_draft
      CHECK (status = 'draft' OR location_id IS NOT NULL);
  END IF;
END $$;

-- DEC-064: coverage is counted against the caller''s plan inside the door, so
-- the blanket one-country trigger of 20260810073508 retires.
DROP TRIGGER IF EXISTS listing_locations_single_country ON public.listing_locations;
DROP FUNCTION IF EXISTS public.listing_locations_single_country();

-- =====================================================================
-- C. public.listing_contact_refusals — the D17/2.3 contact shape
-- =====================================================================
CREATE OR REPLACE FUNCTION public.listing_contact_refusals(p_pref jsonb)
RETURNS jsonb
LANGUAGE plpgsql
IMMUTABLE
SECURITY INVOKER
SET search_path TO 'public'
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
    IF v_key NOT IN ('messages','phone','telegram','whatsapp') THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','contact_pref.'||v_key,'reason','unknownKey'));
    END IF;
  END LOOP;
  FOREACH v_key IN ARRAY ARRAY['phone','telegram','whatsapp'] LOOP
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

-- =====================================================================
-- D. public.validate_listing_draft — the single validation authority (D12)
--    Steps <= p_step are validated strictly; later steps are tolerated empty.
--    publish/edit call it with step 8, so there is exactly one rule set.
-- =====================================================================
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
  p_prior jsonb
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
BEGIN
  -- ---- step 1 — the category (leaf, postable) ----
  IF p_step >= 1 THEN
    SELECT * INTO v_cat FROM public.categories WHERE id = p_category_id;
    IF p_category_id IS NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','category_id','reason','required'));
    ELSIF NOT FOUND
       OR NOT v_cat.is_active
       OR NOT v_cat.allow_listings
       OR v_cat.is_catchall
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
  IF p_step >= 5 THEN
    IF v_mode NOT IN ('fixed','negotiable','free','contact') THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','badValue','detail',v_mode));
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

    v_period := coalesce(p_price_period, v_cat.default_price_period);
    IF v_period NOT IN ('once','hour','day','week','month','year') THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_period','reason','badValue','detail',v_period));
    ELSIF v_cat.price_period_locked AND v_period <> v_cat.default_price_period THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_period','reason','periodLocked','detail',v_cat.default_price_period));
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
    'location_id', v_place,
    'market', v_market
  );
END $$;

REVOKE ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb, jsonb) TO service_role;

-- =====================================================================
-- E. public.submit_listing — the draft door, re-declared WHOLE (INC-183)
--    The pre-A2 signature is dropped: the contract changed.
-- =====================================================================
DROP FUNCTION IF EXISTS public.submit_listing(uuid, uuid, uuid, text, text, char, jsonb, numeric, char, text, text, uuid);

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
  p_contact_pref jsonb
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
             coalesce(v_prev.attributes, '{}'::jsonb));
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  IF p_listing_id IS NULL THEN
    INSERT INTO public.listings (
      seller_id, category_id, location_id, title, description, attributes,
      price_amount, price_currency, price_mode, price_period, poster_expires_at,
      video_url, contact_pref, status, home_country_code, draft_step, draft_updated_at
    ) VALUES (
      v_uid, p_category_id, (v_val->>'location_id')::uuid, v_val->>'title', v_val->>'description',
      v_val->'attrs', (v_val->>'price_amount')::numeric, (v_val->>'price_currency')::char(3),
      v_val->>'price_mode', v_val->>'price_period', p_poster_expires_at,
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

REVOKE ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb) TO service_role;

-- =====================================================================
-- F. publish_listing — nothing goes live here (NAMED DEFERRAL: D1 gateway)
-- =====================================================================
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
             v_row.poster_expires_at, v_cov, v_row.contact_pref, v_row.attributes);
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

-- =====================================================================
-- G. edit_listing — a live listing''s edit; every edit is re-screened
-- =====================================================================
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
  p_contact_pref jsonb
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
             p_price_period, p_poster_expires_at, p_coverage, p_contact_pref, v_prev.attributes);
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

REVOKE ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, char, text, timestamptz, uuid[], jsonb) TO service_role;

-- =====================================================================
-- H. transition_listing — re-declared WHOLE over the nine states
-- =====================================================================
CREATE OR REPLACE FUNCTION public.transition_listing(p_listing_id uuid, p_new_status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_row      public.listings%ROWTYPE;
  v_service  boolean := (v_uid IS NULL AND current_setting('role', true) IS DISTINCT FROM 'anon');
  v_reviewer boolean := false;
  v_enforcer boolean := false;
  v_owner    boolean := false;
  v_ok       boolean := false;
BEGIN
  IF p_new_status NOT IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed') THEN
    RAISE EXCEPTION 'unknown status: %', p_new_status;
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;

  IF v_uid IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
      RAISE EXCEPTION 'account is deactivated';
    END IF;
    v_owner    := (v_row.seller_id = v_uid);
    v_reviewer := public.has_permission(v_uid, 'listings', 'review');
    v_enforcer := public.has_permission(v_uid, 'listings', 'enforce');
    IF NOT (v_owner OR v_reviewer OR v_enforcer) THEN
      RAISE EXCEPTION 'not your listing';
    END IF;
  END IF;

  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches 'active'.
  IF p_new_status IN ('active','reduced','rejected','held') THEN
    IF NOT (v_service OR v_reviewer) THEN
      RAISE EXCEPTION 'reviewer only: % -> %', v_row.status, p_new_status;
    END IF;
    v_ok := CASE v_row.status
      WHEN 'screening' THEN p_new_status IN ('active','reduced','rejected','held')
      WHEN 'held'      THEN p_new_status IN ('active','reduced','rejected')
      ELSE false
    END;
  ELSIF p_new_status = 'screening' THEN
    v_ok := v_row.status IN ('draft','active','reduced','rejected','expired','sold');
  ELSIF p_new_status IN ('sold','expired') THEN
    v_ok := v_row.status IN ('active','reduced');
  ELSIF p_new_status = 'removed' THEN
    IF v_owner AND NOT (v_service OR v_enforcer) THEN
      IF v_row.status = 'rejected' AND coalesce(v_row.screening->>'severe','false') = 'true' THEN
        RAISE EXCEPTION 'a listing rejected for a severe reason is removed by enforcement only';
      END IF;
      v_ok := true;
    ELSE
      v_ok := (v_service OR v_enforcer);
      IF NOT v_ok THEN
        RAISE EXCEPTION 'enforcement only: % -> removed', v_row.status;
      END IF;
    END IF;
  ELSE
    v_ok := false;
  END IF;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'illegal transition: % -> %', v_row.status, p_new_status;
  END IF;

  IF p_new_status IN ('active','reduced') THEN
    UPDATE public.listings SET
      status = p_new_status,
      published_at = coalesce(published_at, now()),
      published_first_at = coalesce(published_first_at, now()),
      expires_at = now() + make_interval(days => coalesce(
        (SELECT c.expiry_days FROM public.categories c WHERE c.id = v_row.category_id), 60)),
      updated_at = now()
    WHERE id = p_listing_id;
  ELSE
    UPDATE public.listings SET status = p_new_status, updated_at = now()
     WHERE id = p_listing_id;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', p_new_status), v_uid);
END $$;

REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.transition_listing(uuid, text) TO service_role;

-- =====================================================================
-- I. mark_sold / renew_listing / relist_listing / delete_draft
-- =====================================================================
CREATE OR REPLACE FUNCTION public.mark_sold(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('active','reduced') THEN
    RAISE EXCEPTION 'illegal transition: % -> sold', v_row.status;
  END IF;
  UPDATE public.listings SET status = 'sold',
    contact_pref = '{"messages": true}'::jsonb, updated_at = now()
   WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status, 'contact_pref', v_row.contact_pref),
            jsonb_build_object('status', 'sold', 'contact_pref', '{"messages": true}'::jsonb), v_uid);
  RETURN jsonb_build_object('ok', true, 'status', 'sold');
END $$;

REVOKE ALL ON FUNCTION public.mark_sold(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mark_sold(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.mark_sold(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.renew_listing(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_row public.listings%ROWTYPE; v_last timestamptz;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status <> 'active' THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','status','reason','renewNeedsActive')));
  END IF;
  SELECT max(r.created_at) INTO v_last FROM public.listing_revisions r
   WHERE r.listing_id = p_listing_id AND r.kind = 'state' AND r.after ? 'renewed_count';
  IF v_last IS NOT NULL AND v_last > now() - interval '7 days' THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','renew','reason','renewTooSoon')));
  END IF;
  UPDATE public.listings SET
    expires_at = now() + make_interval(days => coalesce(
      (SELECT c.expiry_days FROM public.categories c WHERE c.id = v_row.category_id), 60)),
    renewed_count = renewed_count + 1,
    updated_at = now()
  WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('renewed_count', v_row.renewed_count, 'expires_at', v_row.expires_at),
            jsonb_build_object('renewed_count', v_row.renewed_count + 1), v_uid);
  RETURN jsonb_build_object('ok', true, 'renewed_count', v_row.renewed_count + 1);
END $$;

REVOKE ALL ON FUNCTION public.renew_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.renew_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.renew_listing(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.relist_listing(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('expired','sold') THEN
    RAISE EXCEPTION 'illegal transition: % -> screening', v_row.status;
  END IF;
  UPDATE public.listings SET status = 'screening', updated_at = now() WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'screening'), v_uid);
  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $$;

REVOKE ALL ON FUNCTION public.relist_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.relist_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.relist_listing(uuid) TO service_role;

-- delete_draft removes the rows. The storage objects behind listing_photos are
-- A2-C/B1''s concern (the strip route owns the bucket); this door only clears
-- the database rows and says so.
CREATE OR REPLACE FUNCTION public.delete_draft(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status <> 'draft' THEN RAISE EXCEPTION 'only a draft is deleted here'; END IF;
  UPDATE public.listings SET cover_photo_id = NULL WHERE id = p_listing_id;
  DELETE FROM public.listing_photos WHERE listing_id = p_listing_id;
  DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;
  DELETE FROM public.listing_revisions WHERE listing_id = p_listing_id;
  DELETE FROM public.listings WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'deleted', p_listing_id);
END $$;

REVOKE ALL ON FUNCTION public.delete_draft(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_draft(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.delete_draft(uuid) TO service_role;

-- =====================================================================
-- J. PROOFS — scratch rows only, every one cleaned; RAISE on failure
-- =====================================================================
DO $proof$
DECLARE
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_cat     uuid;
  v_anchor  uuid;
  v_region  uuid;
  v_c1      uuid;
  v_c2      uuid;
  v_r       jsonb;
  v_id      uuid;
  v_reasons text[] := ARRAY[]::text[];
  v_n       int;
  v_status  text;
  v_msg     text;
BEGIN
  -- Scratch identities (deleted at the end; no real user is impersonated).
  INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at)
  VALUES (v_a, 'a2m-proof-a-'||substr(v_a::text,1,8)||'@example.invalid', '{}'::jsonb, now(), now()),
         (v_b, 'a2m-proof-b-'||substr(v_b::text,1,8)||'@example.invalid', '{}'::jsonb, now(), now());

  -- A scratch postable leaf with no required attributes.
  INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings,
                                 display_order, default_price_period, price_period_locked, expiry_days)
  VALUES ('A2M Proof Leaf', 'e2e-a2m-proof-leaf', true, true, true, 9000, 'once', false, 30)
  RETURNING id INTO v_cat;

  SELECT l.id INTO v_anchor FROM public.locations l
   WHERE l.country_code = 'ET' AND l.level = 'country' LIMIT 1;
  SELECT l.id INTO v_region FROM public.locations l
   WHERE l.country_code = 'ET' AND l.level = 'region' AND l.is_active LIMIT 1;
  SELECT l.id INTO v_c1 FROM public.locations l
   WHERE l.country_code = 'ET' AND l.level = 'city' AND l.is_active ORDER BY l.name_en LIMIT 1;
  SELECT l.id INTO v_c2 FROM public.locations l
   WHERE l.country_code = 'ET' AND l.level = 'city' AND l.is_active AND l.id <> v_c1
   ORDER BY l.name_en LIMIT 1;
  IF v_region IS NULL OR v_c1 IS NULL OR v_c2 IS NULL THEN
    RAISE EXCEPTION 'PROOF SETUP FAILED — the ET tree lacks a region and two cities';
  END IF;

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text)::text, true);

  -- P1 — residencyUnknown fires while observed_country_code is unset.
  v_r := public.submit_listing(NULL, 1::smallint, v_cat, NULL, NULL, NULL, NULL,
           NULL, NULL, NULL, NULL, NULL, NULL, NULL);
  IF (v_r->'refusals'->0->>'reason') <> 'residencyUnknown' THEN
    RAISE EXCEPTION 'P1 FAILED — expected residencyUnknown, got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'residencyUnknown');
  IF EXISTS (SELECT 1 FROM public.listings WHERE seller_id = v_a) THEN
    RAISE EXCEPTION 'P1 FAILED — a refusal wrote a row';
  END IF;

  UPDATE public.user_directory SET observed_country_code = 'ET', observed_at = now(),
    home_country_code = 'ET', country_source = 'user_confirmed' WHERE user_id = v_a;
  UPDATE public.profiles SET home_country_code = 'ET', country_source = 'user_confirmed'
   WHERE user_id = v_a;

  -- P2 — step 1 with a non-postable category.
  v_r := public.submit_listing(NULL, 1::smallint, v_anchor, NULL, NULL, NULL, NULL,
           NULL, NULL, NULL, NULL, NULL, NULL, NULL);
  IF (v_r->'refusals'->0->>'reason') <> 'categoryNotPostable' THEN
    RAISE EXCEPTION 'P2 FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'categoryNotPostable');

  -- P3 — a step-3 draft with no price at all is accepted (later steps tolerated).
  v_r := public.submit_listing(NULL, 3::smallint, v_cat, NULL, NULL, NULL, '{}'::jsonb,
           NULL, NULL, NULL, NULL, NULL, NULL, NULL);
  IF NOT (v_r->>'ok')::boolean THEN RAISE EXCEPTION 'P3 FAILED — got %', v_r; END IF;
  v_id := (v_r->>'listing_id')::uuid;

  -- P4 — step 5 without an amount refuses; the draft is untouched.
  v_r := public.submit_listing(v_id, 5::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', NULL, NULL, NULL, NULL, NULL, NULL);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'field' = 'price_amount' AND x->>'reason' = 'required') <> 1 THEN
    RAISE EXCEPTION 'P4 FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'required');

  -- P5 — unknown currency, then the home-country default applies.
  v_r := public.submit_listing(v_id, 5::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ZZZ', 'once', NULL, NULL, NULL);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'unknownCurrency') <> 1 THEN
    RAISE EXCEPTION 'P5 FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'unknownCurrency');
  v_r := public.submit_listing(v_id, 5::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, NULL, NULL, NULL, NULL, NULL);
  IF NOT (v_r->>'ok')::boolean THEN RAISE EXCEPTION 'P5b FAILED — got %', v_r; END IF;
  IF (SELECT price_currency FROM public.listings WHERE id = v_id) <> 'ETB' THEN
    RAISE EXCEPTION 'P5b FAILED — the currency did not default to ETB';
  END IF;

  -- P6 — free must carry no amount; a bad mode is named.
  v_r := public.submit_listing(v_id, 5::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'free', 10, NULL, NULL, NULL, NULL, NULL);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'mustBeEmpty') <> 1 THEN
    RAISE EXCEPTION 'P6 FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'mustBeEmpty');
  v_r := public.submit_listing(v_id, 5::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'auction', 10, NULL, NULL, NULL, NULL, NULL);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'badValue') <> 1 THEN
    RAISE EXCEPTION 'P6b FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'badValue');

  -- P7 — the poster window and the video shape.
  v_r := public.submit_listing(v_id, 5::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ETB', 'once', now() + interval '2 hours', NULL, NULL);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'posterExpiryTooSoon') <> 1 THEN
    RAISE EXCEPTION 'P7 FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'posterExpiryTooSoon');
  v_r := public.submit_listing(v_id, 5::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ETB', 'once', now() + interval '400 days', NULL, NULL);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'posterExpiryTooLate') <> 1 THEN
    RAISE EXCEPTION 'P7b FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'posterExpiryTooLate');
  v_r := public.submit_listing(v_id, 4::smallint, v_cat, 'A2M proof title', 'body',
           'http://example.com/x', '{}'::jsonb, 'fixed', 100, 'ETB', 'once', NULL, NULL, NULL);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'badShape' AND x->>'field' = 'video_url') <> 1 THEN
    RAISE EXCEPTION 'P7c FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'badShape');
  v_r := public.submit_listing(v_id, 4::smallint, v_cat, repeat('x', 130), 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ETB', 'once', NULL, NULL, NULL);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'tooLong') <> 1 THEN
    RAISE EXCEPTION 'P7d FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'tooLong');

  -- P8 — the locked period.
  UPDATE public.categories SET price_period_locked = true, default_price_period = 'month'
   WHERE id = v_cat;
  v_r := public.submit_listing(v_id, 5::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ETB', 'week', NULL, NULL, NULL);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'periodLocked') <> 1 THEN
    RAISE EXCEPTION 'P8 FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'periodLocked');
  v_r := public.submit_listing(v_id, 5::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ETB', 'month', NULL, NULL, NULL);
  IF NOT (v_r->>'ok')::boolean THEN RAISE EXCEPTION 'P8b FAILED — got %', v_r; END IF;
  UPDATE public.categories SET price_period_locked = false, default_price_period = 'once'
   WHERE id = v_cat;

  -- P9 — coverage: unknown place, two cities over the free plan, then one city.
  v_r := public.submit_listing(v_id, 6::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ETB', 'once', NULL, ARRAY[gen_random_uuid()], NULL);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'unknownPlace') <> 1 THEN
    RAISE EXCEPTION 'P9 FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'unknownPlace');
  v_r := public.submit_listing(v_id, 6::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ETB', 'once', NULL, ARRAY[v_c1, v_c2], NULL);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'coverageExceedsPlan:city') <> 1 THEN
    RAISE EXCEPTION 'P9b FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'coverageExceedsPlan:city');
  v_r := public.submit_listing(v_id, 6::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ETB', 'once', NULL, ARRAY[v_c1], NULL);
  IF NOT (v_r->>'ok')::boolean THEN RAISE EXCEPTION 'P9c FAILED — got %', v_r; END IF;
  IF (SELECT location_id FROM public.listings WHERE id = v_id) <> v_c1 THEN
    RAISE EXCEPTION 'P9c FAILED — the item''s own place is not the first coverage id';
  END IF;

  -- P10 — the contact shape.
  v_r := public.submit_listing(v_id, 7::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ETB', 'once', NULL, ARRAY[v_c1],
           '{"messages": false}'::jsonb);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'messagesRequired') <> 1 THEN
    RAISE EXCEPTION 'P10 FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'messagesRequired');
  v_r := public.submit_listing(v_id, 7::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ETB', 'once', NULL, ARRAY[v_c1],
           '{"messages": true, "phone": {"show": true, "value": "12"}}'::jsonb);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'badHandle') <> 1 THEN
    RAISE EXCEPTION 'P10b FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'badHandle');
  v_r := public.submit_listing(v_id, 7::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ETB', 'once', NULL, ARRAY[v_c1],
           '{"messages": true, "fax": {"show": true}}'::jsonb);
  IF (SELECT count(*) FROM jsonb_array_elements(v_r->'refusals') x
       WHERE x->>'reason' = 'unknownKey') <> 1 THEN
    RAISE EXCEPTION 'P10c FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'unknownKey');
  v_r := public.submit_listing(v_id, 8::smallint, v_cat, 'A2M proof title', 'body', NULL,
           '{}'::jsonb, 'fixed', 100, 'ETB', 'once', NULL, ARRAY[v_c1],
           '{"messages": true, "phone": {"show": true, "value": "+251911234567"}}'::jsonb);
  IF NOT (v_r->>'ok')::boolean THEN RAISE EXCEPTION 'P10d FAILED — got %', v_r; END IF;
  IF (v_r->>'draft_step')::int <> 8 THEN RAISE EXCEPTION 'P10d FAILED — draft_step %', v_r; END IF;

  -- P11 — another account''s listing is refused by name.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_b::text)::text, true);
  UPDATE public.user_directory SET observed_country_code = 'ET', observed_at = now()
   WHERE user_id = v_b;
  BEGIN
    v_r := public.submit_listing(v_id, 8::smallint, v_cat, 'hijack', 'body', NULL, '{}'::jsonb,
             'fixed', 100, 'ETB', 'once', NULL, ARRAY[v_c1], '{"messages": true}'::jsonb);
    RAISE EXCEPTION 'P11 FAILED — a stranger wrote the draft';
  EXCEPTION WHEN OTHERS THEN
    v_msg := SQLERRM;
    IF v_msg NOT LIKE '%not your listing%' THEN RAISE EXCEPTION 'P11 FAILED — %', v_msg; END IF;
  END;
  v_reasons := array_append(v_reasons, 'not your listing');
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text)::text, true);

  -- P12 — publish lands in screening, never active.
  v_r := public.publish_listing(v_id);
  IF (v_r->>'status') <> 'screening' THEN RAISE EXCEPTION 'P12 FAILED — got %', v_r; END IF;
  SELECT status INTO v_status FROM public.listings WHERE id = v_id;
  IF v_status <> 'screening' THEN RAISE EXCEPTION 'P12 FAILED — status %', v_status; END IF;
  IF (SELECT published_first_at FROM public.listings WHERE id = v_id) IS NULL THEN
    RAISE EXCEPTION 'P12 FAILED — published_first_at unset';
  END IF;

  -- P13 — the owner cannot reach active/held; the reviewer branch refuses them.
  BEGIN
    PERFORM public.transition_listing(v_id, 'active');
    RAISE EXCEPTION 'P13 FAILED — the owner reached active';
  EXCEPTION WHEN OTHERS THEN
    v_msg := SQLERRM;
    IF v_msg NOT LIKE '%reviewer only%' THEN RAISE EXCEPTION 'P13 FAILED — %', v_msg; END IF;
  END;
  v_reasons := array_append(v_reasons, 'reviewer only');

  -- The gateway branch (no session = the service caller) does the promotion.
  PERFORM set_config('request.jwt.claims', NULL, true);
  PERFORM public.transition_listing(v_id, 'active');
  SELECT status INTO v_status FROM public.listings WHERE id = v_id;
  IF v_status <> 'active' THEN RAISE EXCEPTION 'P13b FAILED — status %', v_status; END IF;
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text)::text, true);

  -- P14 — an illegal move is refused by name.
  BEGIN
    PERFORM public.transition_listing(v_id, 'draft');
    RAISE EXCEPTION 'P14 FAILED — active -> draft was allowed';
  EXCEPTION WHEN OTHERS THEN
    v_msg := SQLERRM;
    IF v_msg NOT LIKE '%illegal transition%' THEN RAISE EXCEPTION 'P14 FAILED — %', v_msg; END IF;
  END;
  v_reasons := array_append(v_reasons, 'illegal transition');

  -- P15 — renew once, then refuse inside seven days.
  v_r := public.renew_listing(v_id);
  IF NOT (v_r->>'ok')::boolean THEN RAISE EXCEPTION 'P15 FAILED — got %', v_r; END IF;
  v_r := public.renew_listing(v_id);
  IF (v_r->'refusals'->0->>'reason') <> 'renewTooSoon' THEN
    RAISE EXCEPTION 'P15b FAILED — got %', v_r;
  END IF;
  v_reasons := array_append(v_reasons, 'renewTooSoon');

  -- P16 — an edit re-screens.
  v_r := public.edit_listing(v_id, v_cat, 'A2M proof edited', 'body', NULL, '{}'::jsonb,
           'fixed', 120, 'ETB', 'once', NULL, ARRAY[v_c1], '{"messages": true}'::jsonb);
  IF (v_r->>'status') <> 'screening' THEN RAISE EXCEPTION 'P16 FAILED — got %', v_r; END IF;
  PERFORM set_config('request.jwt.claims', NULL, true);
  PERFORM public.transition_listing(v_id, 'active');
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text)::text, true);

  -- P17 — sold strips the contact channels; relist returns to screening.
  v_r := public.mark_sold(v_id);
  IF (v_r->>'status') <> 'sold' THEN RAISE EXCEPTION 'P17 FAILED — got %', v_r; END IF;
  IF (SELECT contact_pref FROM public.listings WHERE id = v_id) <> '{"messages": true}'::jsonb THEN
    RAISE EXCEPTION 'P17 FAILED — the contact channels survived the sale';
  END IF;
  v_r := public.relist_listing(v_id);
  IF (v_r->>'status') <> 'screening' THEN RAISE EXCEPTION 'P17b FAILED — got %', v_r; END IF;

  -- P18 — revisions were written throughout.
  SELECT count(*) INTO v_n FROM public.listing_revisions WHERE listing_id = v_id;
  IF v_n < 8 THEN RAISE EXCEPTION 'P18 FAILED — only % revision rows', v_n; END IF;

  -- P19 — delete_draft takes a draft only.
  BEGIN
    PERFORM public.delete_draft(v_id);
    RAISE EXCEPTION 'P19 FAILED — a screening listing was deleted as a draft';
  EXCEPTION WHEN OTHERS THEN
    v_msg := SQLERRM;
    IF v_msg NOT LIKE '%only a draft is deleted here%' THEN RAISE EXCEPTION 'P19 FAILED — %', v_msg; END IF;
  END;
  v_r := public.submit_listing(NULL, 1::smallint, v_cat, NULL, NULL, NULL, '{}'::jsonb,
           NULL, NULL, NULL, NULL, NULL, NULL, NULL);
  PERFORM public.delete_draft((v_r->>'listing_id')::uuid);
  IF EXISTS (SELECT 1 FROM public.listings WHERE id = (v_r->>'listing_id')::uuid) THEN
    RAISE EXCEPTION 'P19b FAILED — the draft survived';
  END IF;

  RAISE NOTICE 'PROOFS PASS — refusal vocabulary exercised: %', array_to_string(v_reasons, ', ');

  -- CLEANUP (scratch only).
  PERFORM set_config('request.jwt.claims', NULL, true);
  DELETE FROM public.listing_revisions WHERE listing_id IN
    (SELECT id FROM public.listings WHERE seller_id IN (v_a, v_b));
  DELETE FROM public.listing_locations WHERE listing_id IN
    (SELECT id FROM public.listings WHERE seller_id IN (v_a, v_b));
  DELETE FROM public.listings WHERE seller_id IN (v_a, v_b);
  DELETE FROM public.categories WHERE id = v_cat;
  DELETE FROM auth.users WHERE id IN (v_a, v_b);
  IF EXISTS (SELECT 1 FROM public.categories WHERE slug = 'e2e-a2m-proof-leaf')
     OR EXISTS (SELECT 1 FROM auth.users WHERE id IN (v_a, v_b)) THEN
    RAISE EXCEPTION 'CLEANUP FAILED — scratch rows survived';
  END IF;
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260917120000') ON CONFLICT DO NOTHING;