-- e2e-areas: my-listings, ad-page, feed, admin-monetisation
-- P-2 (a) M-1b, part 1 of 5 — the two helpers the doors and the sweep read (plan §2 and §4; ruling 1
-- Q2). Split from the level door by concern (rule 30: about 25 KB a file).
-- 1. public.market_settings_for(country) — the one read of "the market row for a country, else the
--    default row (no country)"; raises marketNotSet when neither exists. Service-only; the doors
--    and the sweep call it, never a default of their own.
-- 2. public.seller_regular_live(seller, country) — the one count of a seller's committed ads at the
--    baseline level in a country (status screening, held, active, reduced: three posted at once may
--    not become six live). Service-only; publish_listing, resume_listing and the sweep call it.
-- Proofs at the end on scratch rows (market XZ, e2e_mig_ keys).

DO $pre$
BEGIN
  IF to_regprocedure('public.baseline_level_key()') IS NULL
     OR NOT EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'promote')
     -- M-1a part 2's mark is the ledger (law 9), never a LIKE on a deparsed definition (law 12).
     OR NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261104201000') THEN
    RAISE EXCEPTION 'P-2 M-1b part 1: M-1a (71cb9d01 and c072fd66) must be applied first';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE MARKET ROW
CREATE FUNCTION public.market_settings_for(p_country_code character)
RETURNS public.market_settings
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $fn$
DECLARE
  v_row public.market_settings%ROWTYPE;
BEGIN
  SELECT * INTO v_row FROM public.market_settings m WHERE m.country_code = p_country_code;
  IF NOT FOUND THEN
    SELECT * INTO v_row FROM public.market_settings m WHERE m.country_code IS NULL;
  END IF;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'marketNotSet';
  END IF;
  RETURN v_row;
END $fn$;
COMMENT ON FUNCTION public.market_settings_for(character) IS
  'The market_settings row for a country, else the default row (no country); raises marketNotSet when neither exists (P-2 M-1b). Never a default in a caller.';
REVOKE ALL ON FUNCTION public.market_settings_for(character) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.market_settings_for(character) TO service_role;

-- ------------------------------------------------------------ 2. THE FREE-SLOT COUNT
CREATE FUNCTION public.seller_regular_live(p_seller uuid, p_country_code character)
RETURNS integer
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $fn$
  SELECT count(*)::integer
    FROM public.listings l
    JOIN public.locations loc ON loc.id = l.location_id
   WHERE l.seller_id = p_seller
     AND loc.country_code = p_country_code
     AND l.status IN ('screening', 'held', 'active', 'reduced')
     AND l.tier = public.baseline_level_key();
$fn$;
COMMENT ON FUNCTION public.seller_regular_live(uuid, character) IS
  'A seller''s committed ads (screening, held, active, reduced) at the baseline level whose primary place is in the country — the free-slot count against market_settings.free_regular_ads (P-2 M-1b, D305). Rides listings_seller_idx.';
REVOKE ALL ON FUNCTION public.seller_regular_live(uuid, character) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.seller_regular_live(uuid, character) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) headers and grants of both, and
-- listings_seller_idx exists; (b) market_settings_for answers the country's row, else the default,
-- else raises; (c) seller_regular_live counts the baseline ads of one seller in one country by status.
DO $proof$
DECLARE
  v_mkt     regprocedure := 'public.market_settings_for(character)'::regprocedure;
  v_cnt     regprocedure := 'public.seller_regular_live(uuid,character)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_other   uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2-m1b1-' || substr(gen_random_uuid()::text, 1, 8);
  v_r0      text := 'e2e_mig_r0_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_code    char(2) := 'XZ';
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_a       uuid;
  v_b       uuid;
  v_c       uuid;
  v_m       public.market_settings%ROWTYPE;
  v_msg     text;
BEGIN
  -- (a)
  IF (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_mkt)
     OR (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_cnt)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_mkt)) a WHERE a.grantee = 0)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_cnt)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_mkt, 'EXECUTE') OR has_function_privilege('authenticated', v_mkt, 'EXECUTE')
     OR has_function_privilege('anon', v_cnt, 'EXECUTE') OR has_function_privilege('authenticated', v_cnt, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_mkt, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_cnt, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 M-1b part 1 proof (a): the helpers'' headers or grants differ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND tablename = 'listings' AND indexname = 'listings_seller_idx') THEN
    RAISE EXCEPTION 'P-2 M-1b part 1 proof (a): listings_seller_idx is missing';
  END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way), seller, category, one reach row, the market row.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1b part 1 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1b1', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1b1';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 M-1b part 1 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p2-m1b1';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2 M1b1 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2 M1b1 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_other,  v_tag || '-other@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1b1 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', 'E2E P2 reach 0', 30, true, false, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 1, v_r0, false);

    -- (b) the market row.
    v_m := public.market_settings_for(v_code);
    IF v_m.country_code IS DISTINCT FROM v_code OR v_m.free_regular_ads <> 1 THEN
      RAISE EXCEPTION 'P-2 M-1b part 1 proof (b): the country''s row was not answered';
    END IF;
    -- 'XY': a second scratch code that is never a market (as 'XZ' is the scratch market).
    v_m := public.market_settings_for('XY');
    IF v_m.country_code IS NOT NULL THEN
      RAISE EXCEPTION 'P-2 M-1b part 1 proof (b): a country without a row did not fall to the default';
    END IF;
    -- With no default row (parked on the scratch code inside this rolled-back block) the read raises.
    DELETE FROM public.market_settings WHERE country_code = v_code;
    UPDATE public.market_settings SET country_code = v_code WHERE country_code IS NULL;
    BEGIN
      PERFORM public.market_settings_for('XY');
      RAISE EXCEPTION 'P-2 M-1b part 1 proof (b): no row at all did not raise';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'marketNotSet' THEN RAISE; END IF;
    END;
    UPDATE public.market_settings SET country_code = NULL WHERE country_code = v_code;
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 1, v_r0, false);

    -- (c) the count: a and b live at the baseline, c a draft; a screening one counts, a paused or sold
    --     one does not, one above the baseline does not; another country counts nothing.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1b1 a', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1b1 b', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_b;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1b1 c', 'scratch', v_code) RETURNING id INTO v_c;
    IF public.seller_regular_live(v_seller, v_code) <> 2 OR public.seller_regular_live(v_seller, 'XY') <> 0
       OR public.seller_regular_live(v_other, v_code) <> 0 THEN
      RAISE EXCEPTION 'P-2 M-1b part 1 proof (c): the count is wrong (%)', public.seller_regular_live(v_seller, v_code);
    END IF;
    UPDATE public.listings SET status = 'screening' WHERE id = v_c;
    IF public.seller_regular_live(v_seller, v_code) <> 3 THEN
      RAISE EXCEPTION 'P-2 M-1b part 1 proof (c): a screening ad was not counted';
    END IF;
    UPDATE public.listings SET status = 'draft' WHERE id = v_c;
    PERFORM set_config('request.jwt.claims', '{}', true);
    PERFORM public.transition_listing(v_b, 'paused');
    IF public.seller_regular_live(v_seller, v_code) <> 1 THEN
      RAISE EXCEPTION 'P-2 M-1b part 1 proof (c): a paused ad was counted';
    END IF;
    UPDATE public.listings SET tier = 'featured', tier_until = now() + interval '1 day', tier_source = 'staff' WHERE id = v_a;
    IF public.seller_regular_live(v_seller, v_code) <> 0 THEN
      RAISE EXCEPTION 'P-2 M-1b part 1 proof (c): an ad above the baseline was counted';
    END IF;
    UPDATE public.listings SET tier = public.baseline_level_key(), tier_until = NULL, tier_source = NULL WHERE id = v_a;
    PERFORM public.transition_listing(v_a, 'sold');
    IF public.seller_regular_live(v_seller, v_code) <> 0 THEN
      RAISE EXCEPTION 'P-2 M-1b part 1 proof (c): a sold ad was counted';
    END IF;

    RAISE EXCEPTION 'p2-m1b1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

-- ------------------------------------------------------------ 4. CLOSERS
REVOKE ALL ON FUNCTION public.market_settings_for(character) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.market_settings_for(character) TO service_role;
REVOKE ALL ON FUNCTION public.seller_regular_live(uuid, character) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.seller_regular_live(uuid, character) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261104205000') ON CONFLICT DO NOTHING;
