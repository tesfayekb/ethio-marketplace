-- e2e-areas: my-listings, ad-page, feed, admin-monetisation
-- P-2 (a) M-1b, part 3 of 5 — the seller buys reach; the seller resumes a paused ad (plan §1, §2;
-- ruling 1 Q4: the reach door lands in (a), its surfaces in (c)).
-- 1. public.set_listing_reach(listing, reach_key) — the body of set_listing_level over kind 'reach':
--    notSignedIn · account is deactivated · listingNotFound · notLive · rateLimited ('promote') ·
--    unknownReach (an enabled, self-serve reach row) · listingNotPlaced · marketNotSet ·
--    includedReach (the market's included reach is the floor and never bought) · sameReach (the
--    until date in DETAIL) · lowerReach (the target's sort must exceed the current reach's — the ad's
--    bought reach, else the market's included one) · notOffered · creditsNotAvailable. OFF: reach,
--    reach_until = now() + the reach row's days, reach_source 'launch'; used_count + 1; one edit
--    revision (reach, reach_until, reach_source); one audit row listing.reach_set. A reach never
--    moves the ad's status or clock.
-- 2. public.resume_listing(listing) — the owner's door out of the pause (DEC-328): notSignedIn ·
--    account is deactivated · listingNotFound · notPaused · listingNotPlaced · marketNotSet ·
--    noFreeSlot (an ad at the baseline resumes only while the seller's committed baseline ads in the
--    country are under market_settings.free_regular_ads; the count in DETAIL) · then
--    transition_listing to the status it was paused from, with the time it had left.
-- Proofs at the end on scratch rows.

DO $pre$
BEGIN
  IF to_regprocedure('public.set_listing_level(uuid,text)') IS NULL
     OR to_regprocedure('public.market_settings_for(character)') IS NULL
     OR to_regprocedure('public.seller_regular_live(uuid,character)') IS NULL THEN
    RAISE EXCEPTION 'P-2 M-1b part 3: parts 1 and 2 (8816b4c0, 12091168; marks 20261104205000, 20261104210000) must be applied first';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE REACH DOOR
CREATE FUNCTION public.set_listing_reach(p_listing_id uuid, p_reach_key text)
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
  v_reach   public.listing_packages%ROWTYPE;
  v_cur     public.listing_packages%ROWTYPE;
  v_market  public.market_settings%ROWTYPE;
  v_country char(2);
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

  SELECT * INTO v_reach FROM public.listing_packages
   WHERE key = p_reach_key AND kind = 'reach' AND enabled AND self_serve FOR SHARE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownReach'; END IF;
  SELECT loc.country_code INTO v_country FROM public.locations loc WHERE loc.id = v_row.location_id;
  IF v_country IS NULL THEN RAISE EXCEPTION 'listingNotPlaced'; END IF;
  v_market := public.market_settings_for(v_country);
  IF v_reach.key = v_market.included_reach THEN RAISE EXCEPTION 'includedReach'; END IF;
  SELECT * INTO v_cur FROM public.listing_packages
   WHERE key = coalesce(v_row.reach, v_market.included_reach) AND kind = 'reach';
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownReach'; END IF;
  IF v_row.reach IS NOT NULL AND v_reach.key = v_row.reach THEN
    RAISE EXCEPTION 'sameReach' USING DETAIL = coalesce(v_row.reach_until::text, '');
  END IF;
  IF v_reach.sort <= v_cur.sort THEN RAISE EXCEPTION 'lowerReach'; END IF;
  v_price := public.product_price_for(v_reach.key, v_row.category_id, v_country);
  IF v_price IS NULL THEN RAISE EXCEPTION 'notOffered'; END IF;
  IF v_market.paid_levels THEN RAISE EXCEPTION 'creditsNotAvailable'; END IF;

  v_source := 'launch';
  v_until  := now() + make_interval(days => v_reach.days);
  UPDATE public.listings SET
    reach = v_reach.key,
    reach_until = v_until,
    reach_source = v_source,
    updated_at = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_after;
  UPDATE public.package_prices SET used_count = used_count + 1 WHERE id = (v_price->>'price_id')::uuid;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'edit',
            jsonb_build_object('reach', v_row.reach, 'reach_until', v_row.reach_until, 'reach_source', v_row.reach_source),
            jsonb_build_object('reach', v_after.reach, 'reach_until', v_after.reach_until, 'reach_source', v_after.reach_source),
            v_uid);
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.reach_set', 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('from', v_row.reach, 'to', v_reach.key, 'until', v_until, 'source', v_source,
                                                 'price_id', v_price->'price_id', 'amount', v_price->'amount',
                                                 'currency', v_price->'currency', 'credit_cost', v_price->'credit_cost')));
  RETURN jsonb_build_object('ok', true, 'reach', v_reach.key, 'until', v_until, 'source', v_source);
END $function$;
COMMENT ON FUNCTION public.set_listing_reach(uuid, text) IS
  'The seller buys a reach above the market''s included one for a live or paused ad (P-2 M-1b, D310): the launch season sets it free with source launch; every refusal is a RAISE by key and leaves no trace. Its caps apply in (c).';
REVOKE ALL ON FUNCTION public.set_listing_reach(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_reach(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_reach(uuid, text) TO service_role;

-- ------------------------------------------------------------ 2. THE RESUME DOOR
CREATE FUNCTION public.resume_listing(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_uid     uuid := auth.uid();
  v_row     public.listings%ROWTYPE;
  v_market  public.market_settings%ROWTYPE;
  v_country char(2);
  v_live    integer;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'notSignedIn'; END IF;
  PERFORM public.assert_caller_active();
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'listingNotFound'; END IF;
  IF v_row.status <> 'paused' THEN RAISE EXCEPTION 'notPaused'; END IF;
  SELECT loc.country_code INTO v_country FROM public.locations loc WHERE loc.id = v_row.location_id;
  IF v_country IS NULL THEN RAISE EXCEPTION 'listingNotPlaced'; END IF;
  v_market := public.market_settings_for(v_country);
  IF v_row.tier = public.baseline_level_key() THEN
    v_live := public.seller_regular_live(v_uid, v_country);
    IF v_live >= v_market.free_regular_ads THEN
      RAISE EXCEPTION 'noFreeSlot' USING DETAIL = v_market.free_regular_ads::text;
    END IF;
  END IF;
  PERFORM public.transition_listing(p_listing_id, v_row.resume_status);
  RETURN jsonb_build_object('ok', true, 'status', (SELECT l.status FROM public.listings l WHERE l.id = p_listing_id));
END $function$;
COMMENT ON FUNCTION public.resume_listing(uuid) IS
  'The owner resumes a paused ad to the status it was paused from, with the time it had left (P-2 M-1b, DEC-328); an ad at the baseline level needs a free slot (market_settings.free_regular_ads) — noFreeSlot otherwise.';
REVOKE ALL ON FUNCTION public.resume_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.resume_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.resume_listing(uuid) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- Scratch rows only, rolled back by the sentinel. (a) headers and grants; (b) the reach door's
-- success: reach, until = the row's days, source launch, used_count + 1, the revision, the audit row,
-- the status and clock untouched; (c) each refusal by key with nothing written (the before/after
-- snapshot of rows, revisions, audit rows, used_count and the promote dial's count); (d) resume:
-- refused without a slot, allowed once a slot opens (the other baseline ad sold), the clock back,
-- the feed row back; notPaused on a live ad; a stranger and no caller refused.
DO $proof$
DECLARE
  v_rd      regprocedure := 'public.set_listing_reach(uuid,text)'::regprocedure;
  v_rs      regprocedure := 'public.resume_listing(uuid)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_other   uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2-m1b3-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_rlow    text := 'e2e_mig_rl_' || v_stem;
  v_r0      text := 'e2e_mig_r0_' || v_stem;
  v_r1      text := 'e2e_mig_r1_' || v_stem;
  v_r2      text := 'e2e_mig_r2_' || v_stem;
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
  v_row     public.listings%ROWTYPE;
  v_was     public.listings%ROWTYPE;
  v_answer  jsonb;
  v_snap    text;
  v_snap2   text;
  v_case    text;
  v_msg     text;
  v_detail  text;
  v_fn      regprocedure;
BEGIN
  -- (a)
  FOREACH v_fn IN ARRAY ARRAY[v_rd, v_rs] LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-2 M-1b part 3 proof (a): the header or the grants of % differ', v_fn;
    END IF;
  END LOOP;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1b part 3 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1b3', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1b3';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 M-1b part 3 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p2-m1b3';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2 M1b3 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2 M1b3 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2-m1b3', 2);
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_other,  v_tag || '-other@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT v_seller, v.id, v_lang, v_tag FROM public.legal_versions v
     WHERE v.status = 'published' AND v.effective_at <= now();
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1b3 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- Reaches: rlow under the included r0 (self-serve, so the door reaches includedReach), r1 above it
    -- (15 days, priced), r2 above r1 (no price).
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
      (v_rlow, 'reach', 'E2E P2 reach low', 30, true, true,  false, 9000),
      (v_r0,   'reach', 'E2E P2 reach 0',   30, true, true,  false, 9001),
      (v_r1,   'reach', 'E2E P2 reach 1',   15, true, true,  false, 9002),
      (v_r2,   'reach', 'E2E P2 reach 2',   30, true, true,  false, 9003);
    INSERT INTO public.package_prices (package_key, country_code, amount, currency, credit_cost, valid_from)
    VALUES (v_r1, v_code, 0, v_cur, 0, now() - interval '1 hour') RETURNING id INTO v_p1;
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 1, v_r0, false);
    -- Ads: a active (the reach), b active then paused (the resume), c a draft.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1b3 a', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1b3 b', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_b;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_seller, v_cat, 'E2E P2 M1b3 c', 'scratch', v_code) RETURNING id INTO v_c;
    PERFORM set_config('request.jwt.claims', '{}', true);
    PERFORM public.transition_listing(v_b, 'paused');
    SELECT * INTO v_was FROM public.listings WHERE id = v_b;

    -- (b) the seller buys r1 for a.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    v_answer := public.set_listing_reach(v_a, v_r1);
    SELECT * INTO v_row FROM public.listings WHERE id = v_a;
    IF (v_answer->>'ok')::boolean IS NOT TRUE OR v_answer->>'reach' <> v_r1 OR v_answer->>'source' <> 'launch'
       OR v_row.reach <> v_r1 OR v_row.reach_source <> 'launch'
       OR v_row.reach_until IS NULL OR v_row.reach_until > now() + interval '15 days' OR v_row.reach_until < now() + interval '14 days 23 hours'
       OR v_row.status <> 'active' OR v_row.tier <> public.baseline_level_key()
       OR v_row.expires_at > now() + interval '10 days' OR v_row.expires_at < now() + interval '9 days 23 hours'
       OR (SELECT used_count FROM public.package_prices WHERE id = v_p1) <> 1
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_a) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions
                       WHERE listing_id = v_a AND kind = 'edit' AND actor = v_seller AND seller_id = v_seller
                         AND before->>'reach' IS NULL AND after->>'reach' = v_r1 AND after->>'reach_source' = 'launch'
                         AND (after->>'reach_until')::timestamptz = v_row.reach_until)
       OR (SELECT count(*) FROM public.audit_log WHERE entity_id = v_a::text) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE entity_id = v_a::text AND actor_id = v_seller AND action = 'listing.reach_set' AND entity_type = 'listing'
                         AND NOT (meta ? 'from') AND meta->>'to' = v_r1 AND meta->>'source' = 'launch'
                         AND (meta->>'until')::timestamptz = v_row.reach_until AND (meta->>'price_id')::uuid = v_p1) THEN
      RAISE EXCEPTION 'P-2 M-1b part 3 proof (b): the reach, its revision or its audit row differ (% / reach % until %)',
        v_answer, v_row.reach, v_row.reach_until;
    END IF;

    -- (c) every refusal by key, nothing written.
    FOR v_case IN VALUES ('notSignedIn'), ('listingNotFound'), ('notLive'), ('unknownReach'), ('includedReach'),
                         ('sameReach'), ('lowerReach'), ('notOffered'), ('creditsNotAvailable') LOOP
      SELECT concat_ws('|',
               (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_a, v_b, v_c)),
               (SELECT count(*) FROM public.audit_log WHERE entity_id IN (v_a::text, v_b::text, v_c::text)),
               (SELECT coalesce(sum(used_count), 0) FROM public.package_prices WHERE package_key IN (v_rlow, v_r0, v_r1, v_r2)),
               (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_seller::text AND action = 'promote'),
               (SELECT string_agg(id::text || ':' || status || ':' || coalesce(reach, '-') || ':' || coalesce(reach_until::text, '-') || ':' || coalesce(reach_source, '-'), ',' ORDER BY id)
                  FROM public.listings WHERE id IN (v_a, v_b, v_c)))
        INTO v_snap;
      CASE v_case
        WHEN 'notSignedIn' THEN PERFORM set_config('request.jwt.claims', '{}', true);
        WHEN 'listingNotFound' THEN PERFORM set_config('request.jwt.claims', json_build_object('sub', v_other::text, 'role', 'authenticated')::text, true);
        WHEN 'creditsNotAvailable' THEN
          INSERT INTO public.package_prices (package_key, country_code, amount, currency, credit_cost, valid_from)
          VALUES (v_r2, v_code, 5, v_cur, 1, now() - interval '1 hour');
          UPDATE public.market_settings SET paid_levels = true, paid_levels_since = now(), launch_credits = 10, launch_days = 30 WHERE country_code = v_code;
        ELSE NULL;
      END CASE;
      v_msg := NULL; v_detail := NULL;
      BEGIN
        CASE v_case
          WHEN 'notSignedIn'         THEN PERFORM public.set_listing_reach(v_a, v_r2);
          WHEN 'listingNotFound'     THEN PERFORM public.set_listing_reach(v_a, v_r2);
          WHEN 'notLive'             THEN PERFORM public.set_listing_reach(v_c, v_r1);
          WHEN 'unknownReach'        THEN PERFORM public.set_listing_reach(v_a, public.baseline_level_key());
          WHEN 'includedReach'       THEN PERFORM public.set_listing_reach(v_b, v_r0);
          WHEN 'sameReach'           THEN PERFORM public.set_listing_reach(v_a, v_r1);
          WHEN 'lowerReach'          THEN PERFORM public.set_listing_reach(v_b, v_rlow);
          WHEN 'notOffered'          THEN PERFORM public.set_listing_reach(v_a, v_r2);
          WHEN 'creditsNotAvailable' THEN PERFORM public.set_listing_reach(v_a, v_r2);
        END CASE;
      EXCEPTION WHEN raise_exception THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_detail = PG_EXCEPTION_DETAIL;
      END;
      CASE v_case
        WHEN 'notSignedIn', 'listingNotFound' THEN PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
        WHEN 'creditsNotAvailable' THEN UPDATE public.market_settings SET paid_levels = false, paid_levels_since = NULL WHERE country_code = v_code;
        ELSE NULL;
      END CASE;
      IF v_msg IS DISTINCT FROM v_case THEN
        RAISE EXCEPTION 'P-2 M-1b part 3 proof (c): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
      IF v_case = 'sameReach' AND v_detail IS DISTINCT FROM v_row.reach_until::text THEN
        RAISE EXCEPTION 'P-2 M-1b part 3 proof (c): sameReach''s detail is not the until date (%)', v_detail;
      END IF;
      SELECT concat_ws('|',
               (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_a, v_b, v_c)),
               (SELECT count(*) FROM public.audit_log WHERE entity_id IN (v_a::text, v_b::text, v_c::text)),
               (SELECT coalesce(sum(used_count), 0) FROM public.package_prices WHERE package_key IN (v_rlow, v_r0, v_r1, v_r2)),
               (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_seller::text AND action = 'promote'),
               (SELECT string_agg(id::text || ':' || status || ':' || coalesce(reach, '-') || ':' || coalesce(reach_until::text, '-') || ':' || coalesce(reach_source, '-'), ',' ORDER BY id)
                  FROM public.listings WHERE id IN (v_a, v_b, v_c)))
        INTO v_snap2;
      IF v_snap2 IS DISTINCT FROM v_snap THEN
        RAISE EXCEPTION 'P-2 M-1b part 3 proof (c): the refusal % left a trace (% -> %)', v_case, v_snap, v_snap2;
      END IF;
    END LOOP;

    -- (d) resume: a is the seller's one live baseline ad in XZ (N = 1), so b has no slot.
    v_msg := NULL; v_detail := NULL;
    BEGIN
      PERFORM public.resume_listing(v_b);
    EXCEPTION WHEN raise_exception THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_detail = PG_EXCEPTION_DETAIL;
    END;
    IF v_msg IS DISTINCT FROM 'noFreeSlot' OR v_detail IS DISTINCT FROM '1'
       OR (SELECT status FROM public.listings WHERE id = v_b) <> 'paused'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_b) <> 1 THEN
      RAISE EXCEPTION 'P-2 M-1b part 3 proof (d): without a slot the resume answered % (detail %)', coalesce(v_msg, 'success'), v_detail;
    END IF;
    -- notPaused on the live a; a stranger and no caller on b.
    v_msg := NULL;
    BEGIN PERFORM public.resume_listing(v_a); EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM; END;
    IF v_msg IS DISTINCT FROM 'notPaused' THEN RAISE EXCEPTION 'P-2 M-1b part 3 proof (d): a live ad answered %', coalesce(v_msg, 'success'); END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_other::text, 'role', 'authenticated')::text, true);
    v_msg := NULL;
    BEGIN PERFORM public.resume_listing(v_b); EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM; END;
    IF v_msg IS DISTINCT FROM 'listingNotFound' THEN RAISE EXCEPTION 'P-2 M-1b part 3 proof (d): a stranger answered %', coalesce(v_msg, 'success'); END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_msg := NULL;
    BEGIN PERFORM public.resume_listing(v_b); EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM; END;
    IF v_msg IS DISTINCT FROM 'notSignedIn' THEN RAISE EXCEPTION 'P-2 M-1b part 3 proof (d): no caller answered %', coalesce(v_msg, 'success'); END IF;
    -- The seller sells a; the slot opens; b resumes with the time it had.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    PERFORM public.transition_listing(v_a, 'sold');
    v_answer := public.resume_listing(v_b);
    SELECT * INTO v_row FROM public.listings WHERE id = v_b;
    IF v_answer->>'status' <> 'active' OR v_row.status <> 'active' OR v_row.clock_kept OR v_row.kept_remaining IS NOT NULL
       OR v_row.resume_status IS NOT NULL
       OR v_row.expires_at IS NULL OR v_row.expires_at > now() + v_was.kept_remaining OR v_row.expires_at < now() + v_was.kept_remaining - interval '1 minute'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_b AND kind = 'state'
             AND before = '{"status": "paused"}'::jsonb AND after = '{"status": "active"}'::jsonb) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_b AND tier_rank = public.feed_tier_rank(public.baseline_level_key())) THEN
      RAISE EXCEPTION 'P-2 M-1b part 3 proof (d): the resume did not give the time back (status % expires % kept %)',
        v_row.status, v_row.expires_at, v_was.kept_remaining;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

-- ------------------------------------------------------------ 4. CLOSERS
REVOKE ALL ON FUNCTION public.set_listing_reach(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_reach(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_reach(uuid, text) TO service_role;
REVOKE ALL ON FUNCTION public.resume_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.resume_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.resume_listing(uuid) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261104211000') ON CONFLICT DO NOTHING;
