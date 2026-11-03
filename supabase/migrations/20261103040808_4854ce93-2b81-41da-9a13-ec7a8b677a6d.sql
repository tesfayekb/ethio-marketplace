-- e2e-areas: admin-monetisation, posting
-- Turn P-1b part A, M-d (INC-1034; ruling 1 §2 Q11) — the draft door reads the seller's plan
-- through the one seam. validate_listing_draft is redeclared WHOLE from its live definition
-- (ethio-prod and ethio-staging, 2026-11-03: md5(prosrc) dfa2d9cd3e4d633314717597e9902986, the
-- body of 20261028224333); the ONE change is the plan read on the coverage step:
-- `WHERE plan = 'free'` becomes `WHERE plan = public.seller_plan(p_uid)` (the seam of
-- 20260919054044; one row, free, today — the behaviour is unchanged until plans become
-- per-seller). Header unchanged: plpgsql, VOLATILE, SECURITY DEFINER, search_path public; ACL
-- unchanged (service_role only). The guard below stops the apply if the live body has moved
-- since the ruling's read; proof (b) strips the one change and reads the live md5 back.
-- CF-PLAN-1 (scripts/conformance/plan-seam.test.ts) judges every later declaration.
DO $$
DECLARE v_md5 text;
BEGIN
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5
    FROM pg_proc p WHERE p.oid = 'public.validate_listing_draft'::regproc;
  IF v_md5 IS DISTINCT FROM 'dfa2d9cd3e4d633314717597e9902986' THEN
    RAISE EXCEPTION 'P-1b M-d: the live validate_listing_draft differs from the body this file redeclares (%)', v_md5;
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.validate_listing_draft(p_uid uuid, p_step smallint, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_prior jsonb, p_price_bp integer DEFAULT NULL::integer, p_price_negotiable boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  -- M5 (bundle 4 steps 3, 7, 10, 16, 20, 22).
  v_deal    text[];
  v_bif     jsonb;
  v_bkey    text;
  v_unit    text;
  v_unit_tx text;
  v_prof    public.profiles%ROWTYPE;
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
  -- M5 / DEC-109 — the price page (door step 4) owns the deal rows
  -- (deal_keys: basis, size, quantity, terms); they are deferred while
  -- p_step < 4, in place of "price_basis_keys while p_step < 5".
  IF p_step >= 3 THEN
    v_deal := CASE WHEN p_step < 4 THEN public.deal_keys(p_category_id) ELSE ARRAY[]::text[] END;
    v_res := public.validate_listing_attributes(p_category_id, coalesce(p_attributes, '{}'::jsonb), p_prior,
             CASE WHEN p_step < 4 THEN v_deal ELSE NULL END);
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
      -- M5 — a deal row is judged on the price page: skipped while p_step < 4.
      IF v_kid.attr_key = ANY (v_deal) THEN
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

  -- M5 / DEC-110 — the basis in force, from the answers, at every step: it
  -- names the unit the ad is sold per (price_unit, and the seller's written
  -- unit when the token is other). Ambiguous or none → no unit.
  v_bif  := public.price_basis_in_force(p_category_id, v_attrs, p_prior);
  v_bkey := v_bif->>'key';
  IF v_bkey IS NOT NULL THEN
    v_unit := CASE jsonb_typeof(v_attrs->v_bkey)
                WHEN 'string' THEN v_attrs->>v_bkey
                WHEN 'object' THEN v_attrs->v_bkey->>'value'
                ELSE NULL END;
    IF btrim(coalesce(v_unit, '')) = '' THEN v_unit := NULL; END IF;
    IF v_unit = 'other' THEN
      v_unit_tx := nullif(btrim(coalesce(public.attr_answer_other_text(v_attrs->v_bkey), '')), '');
    END IF;
  END IF;

  -- M5 / DEC-110 — the video link's shape is judged whenever a link is sent,
  -- at any step, so the photos page refuses it on its own Next.
  IF p_video_url IS NOT NULL
     AND p_video_url !~ '^https://(www\.)?(youtube\.com/watch\?v=|youtu\.be/)[A-Za-z0-9_-]{6,20}' THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','video_url','reason','badShape'));
  END IF;

  -- ---- step 5 — title, description (M5 / DEC-110: the title step is 5) ----
  IF p_step >= 5 THEN
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
  END IF;

  -- ---- step 4 — price, currency, period (DEC-067, D13; M5: the price step is 4) ----
  -- DEC-079 / D31 — the basis IN FORCE (price_basis_in_force, M5 / DEC-109)
  -- lets the seller's basis answer decide the price type and the period
  -- (price_shape_for_basis). The basis outranks the DEC-067 period lock (L5).
  -- No basis in force → DEC-067 unchanged; a basis not in force decides nothing.
  IF p_step >= 4 THEN
    IF coalesce((v_bif->>'ambiguous')::boolean, false) THEN
      v_basis := public.price_basis_keys(p_category_id);
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','priceBasisAmbiguous','detail',array_to_string(v_basis,'|')));
    ELSIF v_bkey IS NOT NULL THEN
      v_bval := v_unit;
      -- DEC-081 — the basis is judged HERE (deferred at step 3). The step-3 pass
      -- at p_step >= 4 may already carry the same refusal; it is never doubled.
      IF v_bval IS NULL
         AND EXISTS (SELECT 1 FROM public.effective_category_links(p_category_id) e
                      JOIN public.attributes a ON a.id = e.attribute_id
                     WHERE a.attr_key = v_bkey AND e.is_required)
         AND NOT v_ref @> jsonb_build_array(jsonb_build_object('attr_key', v_bkey, 'reason', 'required')) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('attr_key', v_bkey, 'reason', 'required'));
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
      -- INC-793 — the rate meets listings_price_bp_check (1–10000) before it is stored.
      ELSIF p_price_bp < 1 OR p_price_bp > 10000 THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_bp','reason','commissionRange','detail',p_price_bp::text));
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

  ELSE
    v_period := coalesce(p_price_period, v_cat.default_price_period);
    v_cur := upper(p_price_currency);
    -- INC-793 — below the price page the door's output still meets every listings
    -- price constraint: a known mode and period, the amount paired with its currency,
    -- a commission rate in range.
    IF v_mode NOT IN ('fixed','free','contact','commission') THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','badValue','detail',v_mode));
    END IF;
    IF v_period IS NOT NULL AND v_period NOT IN ('once','hour','day','week','month','year') THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_period','reason','badValue','detail',v_period));
    END IF;
    IF v_mode = 'fixed' AND p_price_amount IS NULL THEN
      v_cur := NULL;
    ELSIF v_mode = 'fixed' THEN
      IF v_cur IS NULL THEN
        SELECT d.home_country_code INTO v_home FROM public.user_directory d WHERE d.user_id = p_uid;
        v_cur := (SELECT k.currency_code FROM public.countries k WHERE k.code = v_home);
      END IF;
      IF v_cur IS NULL THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_currency','reason','required'));
      ELSIF NOT EXISTS (SELECT 1 FROM public.currencies c WHERE c.code = v_cur) THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_currency','reason','unknownCurrency','detail',v_cur));
        v_cur := NULL;
      END IF;
    END IF;
    IF v_mode = 'commission' AND p_price_bp IS NOT NULL AND (p_price_bp < 1 OR p_price_bp > 10000) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_bp','reason','commissionRange','detail',p_price_bp::text));
    END IF;
  END IF;

  -- ---- the seller's own end date (M5 / DEC-117; INC-400, INC-414, INC-415) ----
  -- An ad has no end unless the seller sets a date or its category holds a
  -- limit: no 60-day fallback. Judged whenever a date is sent, at any step.
  v_days := v_cat.expiry_days;
  IF p_poster_expires_at IS NOT NULL THEN
    IF p_poster_expires_at < now() + interval '1 day' THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','poster_expires_at','reason','posterExpiryTooSoon'));
    ELSIF v_days IS NOT NULL AND p_poster_expires_at > now() + make_interval(days => v_days) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','poster_expires_at','reason','posterExpiryTooLate','detail',v_days::text));
    END IF;
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
        SELECT * INTO v_plan FROM public.coverage_plans WHERE plan = public.seller_plan(p_uid);
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

  -- ---- step 8 — review (M5): the seller is named and the home country is
  -- confirmed. Publish and edit_listing judge at step 8, so these refusals
  -- arrive with any others; saves on the contact step (7) are not refused.
  IF p_step >= 8 THEN
    -- Bundle 3 step 12 / M5 step 20 — a post needs a home country the seller confirmed.
    IF coalesce((SELECT d.country_source FROM public.user_directory d WHERE d.user_id = p_uid), '')
         <> 'user_confirmed' THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','home_country_code','reason','required'));
    END IF;
    -- M5 step 22 (INC-423) — a public name always; a person also a first and
    -- a last name; a business a business name (its two names may stay empty).
    SELECT * INTO v_prof FROM public.profiles WHERE user_id = p_uid;
    IF btrim(coalesce(v_prof.seller_alias, '')) = '' THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','alias','reason','required'));
    END IF;
    IF coalesce(v_prof.seller_type, 'person') = 'business' THEN
      IF btrim(coalesce(v_prof.business_name, '')) = '' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','business_name','reason','required'));
      END IF;
    ELSE
      IF btrim(coalesce(v_prof.first_name, '')) = '' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','first_name','reason','required'));
      END IF;
      IF btrim(coalesce(v_prof.last_name, '')) = '' THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','last_name','reason','required'));
      END IF;
    END IF;
  END IF;

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
    'market', v_market,
    'price_unit', v_unit,
    'price_unit_text', v_unit_tx
  );
END $function$;

REVOKE ALL ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.validate_listing_draft(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, jsonb, integer, boolean) TO service_role;

-- PROOF (P-1b M-d): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public, the identity arguments
--       unchanged; closed to anon and authenticated, open to service_role.
--   (b) the body with the one change restored is byte for byte the live body
--       (md5 dfa2d9cd3e4d633314717597e9902986).
--   (c) a scratch seller's draft with one city more than the seller's plan allows is still
--       refused coverageExceedsPlan:city (the plan now read through seller_plan); with the
--       plan's cities it is not.
DO $proof$
DECLARE
  v_fn     regprocedure := 'public.validate_listing_draft(uuid,smallint,uuid,text,text,text,jsonb,text,numeric,character,text,timestamptz,uuid[],jsonb,jsonb,integer,boolean)'::regprocedure;
  v_uid    uuid := gen_random_uuid();
  v_tag    text := 'e2e-mig-p1b-md-' || substr(gen_random_uuid()::text, 1, 8);
  v_code   char(2) := 'XZ';
  v_anc    uuid;
  v_region uuid;
  v_city   uuid;
  v_cities uuid[] := '{}';
  v_cat    uuid;
  v_max    integer;
  v_md5    text;
  v_out    jsonb;
  v_i      integer;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-1b M-d proof (a): the header or the grants differ';
  END IF;
  IF pg_get_function_identity_arguments(v_fn) <> 'p_uid uuid, p_step smallint, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_prior jsonb, p_price_bp integer, p_price_negotiable boolean' THEN
    RAISE EXCEPTION 'P-1b M-d proof (a): the argument list differs (%)', pg_get_function_identity_arguments(v_fn);
  END IF;
  -- (b)
  SELECT md5(replace(replace(p.prosrc, chr(13), ''),
                     'WHERE plan = public.seller_plan(p_uid);', 'WHERE plan = ''free'';'))
    INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn;
  IF v_md5 IS DISTINCT FROM 'dfa2d9cd3e4d633314717597e9902986' THEN
    RAISE EXCEPTION 'P-1b M-d proof (b): the body differs from the live one beyond the one change (%)', v_md5;
  END IF;
  IF (SELECT p.prosrc FROM pg_proc p WHERE p.oid = v_fn) NOT LIKE '%WHERE plan = public.seller_plan(p_uid);%' THEN
    RAISE EXCEPTION 'P-1b M-d proof (b): the seam read is not in the body';
  END IF;

  BEGIN
    -- (c) the scratch market XZ (the M1b way) with max_cities + 1 cities, a scratch seller and category.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-1b M-d proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p1b-md', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p1b-md';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-1b M-d proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p1b-md';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P1b Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_uid, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    SELECT c.max_cities INTO v_max FROM public.coverage_plans c WHERE c.plan = public.seller_plan(v_uid);
    IF v_max IS NULL THEN RAISE EXCEPTION 'P-1b M-d proof: the seller''s plan has no row'; END IF;
    FOR v_i IN 1 .. v_max + 1 LOOP
      INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
      VALUES ('city', v_code, 'E2E P1b City ' || v_i, v_tag || '-c' || v_i, true, v_region, 9.03, 38.74 + v_i / 100.0)
      RETURNING id INTO v_city;
      v_cities := v_cities || v_city;
    END LOOP;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1b Leaf', v_tag || '-leaf', true, true, true, 9998) RETURNING id INTO v_cat;

    v_out := public.validate_listing_draft(v_uid, 2::smallint, v_cat, 'E2E title', 'E2E description', NULL, '{}'::jsonb,
               'free', NULL, NULL, NULL, NULL, v_cities, NULL, NULL);
    IF coalesce((v_out->>'ok')::boolean, true)
       OR NOT v_out->'refusals' @> '[{"field":"coverage","reason":"coverageExceedsPlan:city"}]'::jsonb THEN
      RAISE EXCEPTION 'P-1b M-d proof (c): % cities answered %', v_max + 1, v_out;
    END IF;
    v_out := public.validate_listing_draft(v_uid, 2::smallint, v_cat, 'E2E title', 'E2E description', NULL, '{}'::jsonb,
               'free', NULL, NULL, NULL, NULL, v_cities[1:v_max], NULL, NULL);
    IF v_out->'refusals' @> '[{"field":"coverage","reason":"coverageExceedsPlan:city"}]'::jsonb THEN
      RAISE EXCEPTION 'P-1b M-d proof (c): % cities were refused: %', v_max, v_out;
    END IF;

    RAISE EXCEPTION 'p1b-md-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-md-proof-ok' THEN RAISE; END IF;
  END;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261103190000') ON CONFLICT DO NOTHING;
