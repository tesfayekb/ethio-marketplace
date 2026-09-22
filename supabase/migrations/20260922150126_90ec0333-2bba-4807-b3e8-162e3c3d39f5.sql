-- =====================================================================
-- D34 — AN "OTHER" LEAF IS A POSTING TARGET.
--
-- WHY. The catch-all row of a level is the answer a seller reaches for when no
-- named leaf fits; D30 already places it LAST on its level. The door, however,
-- refused any category carrying `is_catchall`, so the wizard could only ever
-- offer those leaves as dead ends. The catch-all flag governs ORDER and
-- curation, not postability.
--
-- WHAT. public.validate_listing_draft re-declared WHOLE (INC-183) from its
-- latest body (20260917112956, section D), byte-identical except ONE line: the
-- `OR v_cat.is_catchall` disjunct of the step-1 category gate is gone. Every
-- other gate is unchanged and keeps its own refusal name:
--   - an unknown / inactive category  → categoryNotPostable
--   - allow_listings false (a FOLDER) → categoryNotPostable
--   - a category with children        → categoryNotPostable
-- The definer closers are restated in-file (definer law, INC-074).
--
-- PROOFS — scratch rows only (INC-222), deleted in this same file:
--   P1 a scratch Other leaf (is_catchall true, allow_listings true, no children)
--      validates ok at step 1;
--   P2 a scratch FOLDER (allow_listings false) still refuses categoryNotPostable;
--   P3 a scratch NON-LEAF (one pointer child) still refuses categoryNotPostable;
--   P4 cleanup leaves nothing behind.
--
-- Own mark 20260922160000.
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

-- ---------------------------------------------------------------- PROOFS
DO $proof$
DECLARE
  v_uid    uuid := gen_random_uuid();
  v_other  uuid;
  v_folder uuid;
  v_branch uuid;
  v_child  uuid;
  v_res    jsonb;
  v_n      int;
BEGIN
  INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
  VALUES ('e2e-d34-other', 'e2e-d34 other', true, true, true, 9940)
  RETURNING id INTO v_other;
  INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
  VALUES ('e2e-d34-folder', 'e2e-d34 folder', true, false, false, 9941)
  RETURNING id INTO v_folder;
  INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
  VALUES ('e2e-d34-branch', 'e2e-d34 branch', true, true, false, 9942)
  RETURNING id INTO v_branch;
  INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
  VALUES ('e2e-d34-leaf', 'e2e-d34 leaf', true, true, false, 9943)
  RETURNING id INTO v_child;
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_branch, v_child, 1);

  -- P1 — an Other LEAF is a posting target.
  v_res := public.validate_listing_draft(v_uid, 1::smallint, v_other,
             NULL, NULL, NULL, '{}'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL,
             '{}'::jsonb, '{}'::jsonb);
  IF NOT coalesce((v_res->>'ok')::boolean, false) THEN
    RAISE EXCEPTION 'PROOF 1 failed: an Other leaf was refused (%)', v_res::text;
  END IF;
  RAISE NOTICE 'PROOF 1 ok — an Other leaf validates at step 1';

  -- P2 — a FOLDER is still refused, by its own name.
  v_res := public.validate_listing_draft(v_uid, 1::smallint, v_folder,
             NULL, NULL, NULL, '{}'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL,
             '{}'::jsonb, '{}'::jsonb);
  IF coalesce((v_res->>'ok')::boolean, false)
     OR v_res->'refusals'->0->>'reason' <> 'categoryNotPostable' THEN
    RAISE EXCEPTION 'PROOF 2 failed: a folder was not refused as categoryNotPostable (%)', v_res::text;
  END IF;
  RAISE NOTICE 'PROOF 2 ok — a folder still refuses categoryNotPostable';

  -- P3 — a NON-LEAF is still refused, by its own name.
  v_res := public.validate_listing_draft(v_uid, 1::smallint, v_branch,
             NULL, NULL, NULL, '{}'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL,
             '{}'::jsonb, '{}'::jsonb);
  IF coalesce((v_res->>'ok')::boolean, false)
     OR v_res->'refusals'->0->>'reason' <> 'categoryNotPostable' THEN
    RAISE EXCEPTION 'PROOF 3 failed: a non-leaf was not refused as categoryNotPostable (%)', v_res::text;
  END IF;
  RAISE NOTICE 'PROOF 3 ok — a category with children still refuses categoryNotPostable';

  -- P4 — CLEANUP: pointers first, then the scratch categories.
  DELETE FROM public.category_tree_pointers WHERE parent_id = v_branch;
  DELETE FROM public.categories WHERE slug LIKE 'e2e-d34-%';
  SELECT count(*) INTO v_n FROM public.categories WHERE slug LIKE 'e2e-d34-%';
  IF v_n <> 0 THEN
    RAISE EXCEPTION 'CLEANUP failed: % scratch categories remain', v_n;
  END IF;
  RAISE NOTICE 'CLEANUP ok — 0 scratch categories remain';
END $proof$;

-- READ-BACK — the catch-all disjunct is gone, every other gate stands, and the
-- definer closers hold.
DO $readback$
DECLARE r record;
BEGIN
  SELECT p.provolatile AS vol, p.prosecdef AS secdef,
         (position('v_cat.is_catchall' in p.prosrc) = 0) AS no_catchall,
         (position('NOT v_cat.allow_listings' in p.prosrc) > 0) AS folder_gate,
         (position('category_tree_pointers' in p.prosrc) > 0) AS leaf_gate
    INTO r
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'validate_listing_draft';
  IF NOT r.no_catchall OR NOT r.folder_gate OR NOT r.leaf_gate
     OR r.vol <> 's' OR NOT r.secdef THEN
    RAISE EXCEPTION 'READ-BACK failed: catchall_gone=% folder=% leaf=% volatility=% secdef=%',
      r.no_catchall, r.folder_gate, r.leaf_gate, r.vol, r.secdef;
  END IF;
  RAISE NOTICE 'READ-BACK validate_listing_draft: catch-all gate gone, folder and leaf gates stand, STABLE SECURITY DEFINER';

  FOR r IN
    SELECT unnest(p.proacl)::text AS ace
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public' AND p.proname = 'validate_listing_draft'
  LOOP
    RAISE NOTICE 'READ-BACK acl validate_listing_draft %', r.ace;
  END LOOP;
END $readback$;

-- This file's own mark.
INSERT INTO public.migration_marks (version)
VALUES ('20260922160000') ON CONFLICT DO NOTHING;