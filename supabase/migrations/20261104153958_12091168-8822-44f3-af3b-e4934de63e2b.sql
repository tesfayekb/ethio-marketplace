-- e2e-areas: my-listings, ad-page, feed, admin-monetisation
-- P-2 (a) M-1b, part 2 of 5 — the seller raises an ad's level (plan §2 and §4; ruling 1 Q2, Q3, Q8,
-- the dial). One object, over part 1's helpers (market_settings_for, seller_regular_live):
-- public.set_listing_level(listing, level_key) — the seller's door. Refusals, in this order, each a
--    RAISE so nothing it reached is kept (the promote dial's count rolls back with it, INC-844):
--    notSignedIn · account is deactivated (assert_caller_active) · listingNotFound (ownership on the
--    locked row) · notLive (active, reduced or paused only) · rateLimited (rate_gate 'promote') ·
--    unknownLevel (an enabled, self-serve level row) · sameLevel (the until date in DETAIL) ·
--    lowerLevel (the target's sort must exceed the current level's) · listingNotPlaced ·
--    levelNotAvailable (level_perks_for answered nothing) · seasonEnded (the perks' days under 1) ·
--    notOffered (product_price_for answered nothing — never free by default) · marketNotSet ·
--    creditsNotAvailable (the market's paid_levels switch is ON; P-3 replaces this one branch).
--    While the switch is OFF the level is set with source 'launch' and nothing charged: tier,
--    tier_until = now() + the perks' days, tier_source; a level with extends_lifetime pushes the ad's
--    clock to at least tier_until (expires_at on a live ad, kept_remaining on a paused one — Q8);
--    the price row's used_count + 1; one edit revision (tier, tier_until, tier_source, expires_at
--    before → after); one audit row listing.level_set (from, to, until, source, price_id, amount,
--    currency, credit_cost). A paused ad resumes in the same call through transition_listing to the
--    status it was paused from (Q3: with a level above the baseline it needs no free slot).
--    Granted to authenticated and service_role (public-surface and acceptance-doors lines).
-- Proofs at the end on scratch rows (market XZ, currency XTS, e2e_mig_ levels, reaches, prices).

DO $pre$
BEGIN
  IF to_regprocedure('public.market_settings_for(character)') IS NULL
     OR to_regprocedure('public.seller_regular_live(uuid,character)') IS NULL THEN
    RAISE EXCEPTION 'P-2 M-1b part 2: part 1 (8816b4c0, mark 20261104205000) must be applied first';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE DOOR
CREATE FUNCTION public.set_listing_level(p_listing_id uuid, p_level_key text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_uid     uuid := auth.uid();
  v_row     public.listings%ROWTYPE;
  v_after   public.listings%ROWTYPE;
  v_level   public.listing_packages%ROWTYPE;
  v_cur     public.listing_packages%ROWTYPE;
  v_market  public.market_settings%ROWTYPE;
  v_country char(2);
  v_perks   jsonb;
  v_days    integer;
  v_price   jsonb;
  v_until   timestamptz;
  v_source  text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'notSignedIn'; END IF;
  PERFORM public.assert_caller_active();
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'listingNotFound'; END IF;
  IF v_row.status NOT IN ('active', 'reduced', 'paused') THEN RAISE EXCEPTION 'notLive'; END IF;
  IF NOT coalesce((public.rate_gate('promote')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_level FROM public.listing_packages
   WHERE key = p_level_key AND kind = 'level' AND enabled AND self_serve FOR SHARE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownLevel'; END IF;
  SELECT * INTO v_cur FROM public.listing_packages WHERE key = v_row.tier AND kind = 'level';
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownLevel'; END IF;
  IF v_level.key = v_cur.key THEN
    RAISE EXCEPTION 'sameLevel' USING DETAIL = coalesce(v_row.tier_until::text, '');
  END IF;
  IF v_level.sort <= v_cur.sort THEN RAISE EXCEPTION 'lowerLevel'; END IF;

  SELECT loc.country_code INTO v_country FROM public.locations loc WHERE loc.id = v_row.location_id;
  IF v_country IS NULL THEN RAISE EXCEPTION 'listingNotPlaced'; END IF;
  v_perks := public.level_perks_for(v_level.key, v_row.category_id, v_country);
  IF v_perks IS NULL THEN RAISE EXCEPTION 'levelNotAvailable'; END IF;
  v_days := (v_perks->>'days')::integer;
  IF v_days IS NULL OR v_days < 1 THEN RAISE EXCEPTION 'seasonEnded'; END IF;
  v_price := public.product_price_for(v_level.key, v_row.category_id, v_country);
  IF v_price IS NULL THEN RAISE EXCEPTION 'notOffered'; END IF;
  v_market := public.market_settings_for(v_country);
  IF v_market.paid_levels THEN RAISE EXCEPTION 'creditsNotAvailable'; END IF;

  -- The launch season: the level is set, nothing is charged (P-3 adds the credit spend here).
  v_source := 'launch';
  v_until  := now() + make_interval(days => v_days);
  UPDATE public.listings SET
    tier = v_level.key,
    tier_until = v_until,
    tier_source = v_source,
    expires_at = CASE WHEN v_level.extends_lifetime AND status <> 'paused'
                       AND expires_at IS NOT NULL AND expires_at < v_until THEN v_until ELSE expires_at END,
    kept_remaining = CASE WHEN v_level.extends_lifetime AND status = 'paused'
                           AND kept_remaining IS NOT NULL AND kept_remaining < v_until - now() THEN v_until - now() ELSE kept_remaining END,
    updated_at = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_after;
  UPDATE public.package_prices SET used_count = used_count + 1 WHERE id = (v_price->>'price_id')::uuid;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'edit',
            jsonb_build_object('tier', v_row.tier, 'tier_until', v_row.tier_until, 'tier_source', v_row.tier_source, 'expires_at', v_row.expires_at),
            jsonb_build_object('tier', v_after.tier, 'tier_until', v_after.tier_until, 'tier_source', v_after.tier_source, 'expires_at', v_after.expires_at),
            v_uid);
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.level_set', 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('from', v_row.tier, 'to', v_level.key, 'until', v_until, 'source', v_source,
                                                 'price_id', v_price->'price_id', 'amount', v_price->'amount',
                                                 'currency', v_price->'currency', 'credit_cost', v_price->'credit_cost')));
  -- Q3 — a paused ad with a level above the baseline resumes now, to the status it was paused from.
  IF v_row.status = 'paused' THEN
    PERFORM public.transition_listing(p_listing_id, v_row.resume_status);
  END IF;

  RETURN jsonb_build_object('ok', true, 'level', v_level.key, 'until', v_until, 'source', v_source,
                            'status', (SELECT l.status FROM public.listings l WHERE l.id = p_listing_id));
END $function$;
COMMENT ON FUNCTION public.set_listing_level(uuid, text) IS
  'The seller raises a live or paused ad to a higher level (P-2 M-1b, D294–D297): the launch season sets it free with source launch; every refusal is a RAISE by key and leaves no trace.';
REVOKE ALL ON FUNCTION public.set_listing_level(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_level(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_level(uuid, text) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) header and grants; (b) the door's success on a
-- live ad: tier, until, source launch, the pushed clock, used_count + 1, the revision, the audit row,
-- the feed rank; (c) each refusal by key with nothing written (rows, revisions, audit rows,
-- used_count, the promote dial's count — compared before and after); (d) a paused ad resumes in the
-- same call with its pushed clock; (e) the dial refuses at its limit.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.set_listing_level(uuid,text)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_other   uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2-m1b2-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_l1      text := 'e2e_mig_l1_' || v_stem;
  v_l2      text := 'e2e_mig_l2_' || v_stem;
  v_l3      text := 'e2e_mig_l3_' || v_stem;
  v_r0      text := 'e2e_mig_r0_' || v_stem;
  v_code    char(2) := 'XZ';
  v_cur     char(3) := 'XTS';
  v_lang    text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_a       uuid;
  v_b       uuid;
  v_c       uuid;
  v_p1      uuid;
  v_fs      integer := (SELECT sort FROM public.listing_packages WHERE key = 'featured' AND kind = 'level');
  v_row     public.listings%ROWTYPE;
  v_answer  jsonb;
  v_snap    text;
  v_snap2   text;
  v_case    text;
  v_msg     text;
  v_detail  text;
  v_n       integer;
  v_base    text;
  v_rank    smallint;
BEGIN
  -- DEC-341: a STABLE reader that raises is read into a variable, never named beside a column in a WHERE.
  v_base := public.baseline_level_key();
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_door)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_door)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_door, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_door, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_door, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 M-1b part 2 proof (a): set_listing_level''s header or grants differ';
  END IF;
  IF v_fs IS NULL THEN RAISE EXCEPTION 'P-2 M-1b part 2 proof: no featured level row'; END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way), currency, seller, category, levels, reach, prices.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1b part 2 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1b2', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1b2';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 M-1b part 2 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p2-m1b2';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2 M1b2 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2 M1b2 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2-m1b2', 2);
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_other,  v_tag || '-other@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    -- The seller owes no acceptance: the door's write is a step up the acceptance guard holds otherwise.
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT v_seller, v.id, v_lang, v_tag FROM public.legal_versions v
     WHERE v.status = 'published' AND v.effective_at <= now();
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1b2 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- Levels: l1 between the baseline and featured (20 days, extends the lifetime), l2 above featured
    -- (40 days, no price at first), l3 disabled; one reach row for the scratch market's included reach.
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort) VALUES
      (v_l1, 'level', 'E2E P2 level 1', 20, 6, 'boost', false, true,  true, true,  v_fs - 1),
      (v_l2, 'level', 'E2E P2 level 2', 40, 8, 'top',   true,  true,  true, false, v_fs + 1),
      (v_l3, 'level', 'E2E P2 level 3', 10, 6, 'boost', false, false, true, true,  v_fs + 2);
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', 'E2E P2 reach 0', 30, true, false, false, 9001);
    INSERT INTO public.package_prices (package_key, country_code, amount, currency, credit_cost, valid_from)
    VALUES (v_l1, v_code, 0, v_cur, 0, now() - interval '1 hour') RETURNING id INTO v_p1;
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 1, v_r0, false);

    -- Ads: a active (10 days left), b active then paused, c a draft.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1b2 a', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1b2 b', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_b;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_seller, v_cat, 'E2E P2 M1b2 c', 'scratch', v_code) RETURNING id INTO v_c;

    PERFORM set_config('request.jwt.claims', '{}', true);
    PERFORM public.transition_listing(v_b, 'paused');

    -- (b) the seller raises a to l1.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    v_answer := public.set_listing_level(v_a, v_l1);
    SELECT * INTO v_row FROM public.listings WHERE id = v_a;
    SELECT feed_rank INTO STRICT v_rank FROM public.level_ranks WHERE key = v_l1;
    IF (v_answer->>'ok')::boolean IS NOT TRUE OR v_answer->>'level' <> v_l1 OR v_answer->>'source' <> 'launch'
       OR v_answer->>'status' <> 'active'
       OR v_row.tier <> v_l1 OR v_row.tier_source <> 'launch'
       OR v_row.tier_until IS NULL OR v_row.tier_until > now() + interval '20 days' OR v_row.tier_until < now() + interval '19 days 23 hours'
       OR v_row.expires_at IS DISTINCT FROM v_row.tier_until
       OR (SELECT used_count FROM public.package_prices WHERE id = v_p1) <> 1
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_a) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions
                       WHERE listing_id = v_a AND kind = 'edit' AND actor = v_seller AND seller_id = v_seller
                         AND before->>'tier' = v_base AND before->>'tier_until' IS NULL
                         AND after->>'tier' = v_l1 AND after->>'tier_source' = 'launch'
                         AND (after->>'tier_until')::timestamptz = v_row.tier_until
                         AND (after->>'expires_at')::timestamptz = v_row.expires_at)
       OR (SELECT count(*) FROM public.audit_log WHERE entity_id = v_a::text) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE entity_id = v_a::text AND actor_id = v_seller AND action = 'listing.level_set' AND entity_type = 'listing'
                         AND meta->>'from' = v_base AND meta->>'to' = v_l1 AND meta->>'source' = 'launch'
                         AND (meta->>'until')::timestamptz = v_row.tier_until
                         AND (meta->>'price_id')::uuid = v_p1 AND (meta->>'amount')::numeric = 0
                         AND meta->>'currency' = v_cur AND (meta->>'credit_cost')::integer = 0)
       OR NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_a)
       OR EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_a AND tier_rank <> v_rank) THEN
      RAISE EXCEPTION 'P-2 M-1b part 2 proof (b): the set, its revision, its audit row or the feed differ (% / tier % until % expires %)',
        v_answer, v_row.tier, v_row.tier_until, v_row.expires_at;
    END IF;

    -- (c) every refusal by key, nothing written.
    FOR v_case IN VALUES ('notSignedIn'), ('listingNotFound'), ('notLive'), ('unknownLevel:reach'), ('unknownLevel:disabled'),
                         ('sameLevel'), ('lowerLevel'), ('seasonEnded'), ('notOffered'), ('creditsNotAvailable') LOOP
      SELECT concat_ws('|',
               (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_a, v_b, v_c)),
               (SELECT count(*) FROM public.audit_log WHERE entity_id IN (v_a::text, v_b::text, v_c::text)),
               (SELECT coalesce(sum(used_count), 0) FROM public.package_prices WHERE package_key IN (v_l1, v_l2)),
               (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_seller::text AND action = 'promote'),
               (SELECT string_agg(id::text || ':' || status || ':' || tier || ':' || coalesce(tier_until::text, '-') || ':' || coalesce(tier_source, '-')
                                  || ':' || coalesce(expires_at::text, '-'), ',' ORDER BY id)
                  FROM public.listings WHERE id IN (v_a, v_b, v_c)))
        INTO v_snap;
      CASE v_case
        WHEN 'notSignedIn' THEN PERFORM set_config('request.jwt.claims', '{}', true);
        WHEN 'listingNotFound' THEN PERFORM set_config('request.jwt.claims', json_build_object('sub', v_other::text, 'role', 'authenticated')::text, true);
        WHEN 'seasonEnded' THEN UPDATE public.categories SET visible_until = now() + interval '1 hour' WHERE id = v_cat AND slug LIKE 'e2e-mig-%';
        WHEN 'creditsNotAvailable' THEN
          INSERT INTO public.package_prices (package_key, country_code, amount, currency, credit_cost, valid_from)
          VALUES (v_l2, v_code, 5, v_cur, 1, now() - interval '1 hour');
          UPDATE public.market_settings SET paid_levels = true, paid_levels_since = now(), launch_credits = 10, launch_days = 30 WHERE country_code = v_code;
        ELSE NULL;
      END CASE;
      v_msg := NULL; v_detail := NULL;
      BEGIN
        CASE v_case
          WHEN 'notSignedIn'           THEN PERFORM public.set_listing_level(v_a, v_l2);
          WHEN 'listingNotFound'       THEN PERFORM public.set_listing_level(v_a, v_l2);
          WHEN 'notLive'               THEN PERFORM public.set_listing_level(v_c, v_l1);
          WHEN 'unknownLevel:reach'    THEN PERFORM public.set_listing_level(v_a, v_r0);
          WHEN 'unknownLevel:disabled' THEN PERFORM public.set_listing_level(v_a, v_l3);
          WHEN 'sameLevel'             THEN PERFORM public.set_listing_level(v_a, v_l1);
          WHEN 'lowerLevel'            THEN PERFORM public.set_listing_level(v_a, public.baseline_level_key());
          WHEN 'seasonEnded'           THEN PERFORM public.set_listing_level(v_a, v_l2);
          WHEN 'notOffered'            THEN PERFORM public.set_listing_level(v_a, v_l2);
          WHEN 'creditsNotAvailable'   THEN PERFORM public.set_listing_level(v_a, v_l2);
        END CASE;
      EXCEPTION WHEN raise_exception THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_detail = PG_EXCEPTION_DETAIL;
      END;
      CASE v_case
        WHEN 'notSignedIn', 'listingNotFound' THEN PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
        WHEN 'seasonEnded' THEN UPDATE public.categories SET visible_until = NULL WHERE id = v_cat AND slug LIKE 'e2e-mig-%';
        WHEN 'creditsNotAvailable' THEN UPDATE public.market_settings SET paid_levels = false, paid_levels_since = NULL WHERE country_code = v_code;
        ELSE NULL;
      END CASE;
      IF v_msg IS DISTINCT FROM split_part(v_case, ':', 1) THEN
        RAISE EXCEPTION 'P-2 M-1b part 2 proof (c): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
      IF v_case = 'sameLevel' AND v_detail IS DISTINCT FROM v_row.tier_until::text THEN
        RAISE EXCEPTION 'P-2 M-1b part 2 proof (c): sameLevel''s detail is not the until date (%)', v_detail;
      END IF;
      SELECT concat_ws('|',
               (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_a, v_b, v_c)),
               (SELECT count(*) FROM public.audit_log WHERE entity_id IN (v_a::text, v_b::text, v_c::text)),
               (SELECT coalesce(sum(used_count), 0) FROM public.package_prices WHERE package_key IN (v_l1, v_l2)),
               (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_seller::text AND action = 'promote'),
               (SELECT string_agg(id::text || ':' || status || ':' || tier || ':' || coalesce(tier_until::text, '-') || ':' || coalesce(tier_source, '-')
                                  || ':' || coalesce(expires_at::text, '-'), ',' ORDER BY id)
                  FROM public.listings WHERE id IN (v_a, v_b, v_c)))
        INTO v_snap2;
      IF v_snap2 IS DISTINCT FROM v_snap THEN
        RAISE EXCEPTION 'P-2 M-1b part 2 proof (c): the refusal % left a trace (% -> %)', v_case, v_snap, v_snap2;
      END IF;
    END LOOP;

    -- (d) the paused b takes l1 and resumes: active, its kept 10 days pushed to the level's 20, the feed row back.
    v_answer := public.set_listing_level(v_b, v_l1);
    SELECT * INTO v_row FROM public.listings WHERE id = v_b;
    SELECT feed_rank INTO STRICT v_rank FROM public.level_ranks WHERE key = v_l1;
    IF v_answer->>'status' <> 'active' OR v_row.status <> 'active' OR v_row.tier <> v_l1 OR v_row.clock_kept
       OR v_row.kept_remaining IS NOT NULL OR v_row.resume_status IS NOT NULL
       OR v_row.expires_at IS NULL OR v_row.expires_at < v_row.tier_until - interval '1 minute' OR v_row.expires_at > v_row.tier_until + interval '1 minute'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_b AND kind = 'edit') <> 1
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_b AND kind = 'state'
             AND before = '{"status": "paused"}'::jsonb AND after = '{"status": "active"}'::jsonb) <> 1
       OR (SELECT used_count FROM public.package_prices WHERE id = v_p1) <> 2
       OR NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_b AND tier_rank = v_rank) THEN
      RAISE EXCEPTION 'P-2 M-1b part 2 proof (d): the paused ad did not resume with its clock (status % expires % until %)',
        v_row.status, v_row.expires_at, v_row.tier_until;
    END IF;

    -- (e) the dial: two sets spent in this window; a limit of 2 refuses the third, which writes nothing.
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_seller, 'promote', 2);
    v_n := (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_a, v_b));
    v_msg := NULL;
    BEGIN
      PERFORM public.set_listing_level(v_a, v_l2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'rateLimited'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_a, v_b)) <> v_n
       OR (SELECT tier FROM public.listings WHERE id = v_a) <> v_l1
       OR (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_seller::text AND action = 'promote') <> 2 THEN
      RAISE EXCEPTION 'P-2 M-1b part 2 proof (e): the dial answered % or the refused call wrote', coalesce(v_msg, 'success');
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

-- ------------------------------------------------------------ 3. CLOSERS
REVOKE ALL ON FUNCTION public.set_listing_level(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_level(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_level(uuid, text) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261104210000') ON CONFLICT DO NOTHING;
