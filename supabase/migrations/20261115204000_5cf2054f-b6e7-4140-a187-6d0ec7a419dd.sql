-- e2e-areas: my-listings, admin-monetisation, door-refusals

-- Foundations 1, turn F1-5a, part 11 — THE LEVEL AND REACH DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333, DEC-391; brief
-- docs/governance/briefs/f1-doors-5a.md, ruling docs/governance/briefs/f1-doors-5a-ruling-1.md).
-- set_listing_level and set_listing_reach are redeclared WHOLE from their last declarations (live md5 checked):
-- ONE door_context('owner', …, 'promote') gate each, their refusals by door_refuse codes (they were codes
-- already), the shell. set_listing_level resumes a paused ad through transition_listing_core (part 2). DEC-391:
-- another seller's ad and an id no row holds answer notYourListing alike (listingNotFound is gone from both;
-- LDR-2 reads notYourListing). Folds: 'not signed in' → notSignedIn; 'account is deactivated' →
-- accountDeactivated; listingNotFound → notYourListing.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.set_listing_level(uuid,text)', '91b6da31335bfb3fa4798cff3b7d6b66'],
    ['public.set_listing_reach(uuid,text)', '00492e7bc78a52ba2374c408e9457c44']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261116030800') THEN
    RAISE EXCEPTION 'F1-5a part 11: part 10 (mark 20261116030800) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'door_context' AND pronamespace = 'public'::regnamespace) THEN
    RAISE EXCEPTION 'F1-5a part 11: the door mechanism (door_context, door_refuse, door_refused) is missing';
  END IF;
  IF to_regprocedure('public.transition_listing_core(uuid,text)') IS NULL THEN
    RAISE EXCEPTION 'F1-5a part 11: transition_listing_core (part 2) is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 11: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. set_listing_level (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.set_listing_level(p_listing_id uuid, p_level_key text)
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
  PERFORM public.door_context('owner', NULL, NULL, 'promote');
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid FOR UPDATE;
  -- DEC-391 (F1-5a) — an ad that is not the caller's, or no ad at all, is one answer.
  IF NOT FOUND THEN PERFORM public.door_refuse('notYourListing'); END IF;
  IF v_row.status NOT IN ('active', 'reduced', 'paused') THEN PERFORM public.door_refuse('notLive'); END IF;

  SELECT * INTO v_level FROM public.listing_packages
   WHERE key = p_level_key AND kind = 'level' AND enabled AND self_serve FOR SHARE;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownLevel'); END IF;
  SELECT * INTO v_cur FROM public.listing_packages WHERE key = v_row.tier AND kind = 'level';
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownLevel'); END IF;
  IF v_level.key = v_cur.key THEN
    PERFORM public.door_refuse('sameLevel', v_row.tier_until::text);
  END IF;
  IF v_level.sort <= v_cur.sort THEN PERFORM public.door_refuse('lowerLevel'); END IF;

  SELECT loc.country_code INTO v_country FROM public.locations loc WHERE loc.id = v_row.location_id;
  IF v_country IS NULL THEN PERFORM public.door_refuse('listingNotPlaced'); END IF;
  v_perks := public.level_perks_for(v_level.key, v_row.category_id, v_country);
  IF v_perks IS NULL THEN PERFORM public.door_refuse('levelNotAvailable'); END IF;
  v_days := (v_perks->>'days')::integer;
  IF v_days IS NULL OR v_days < 1 THEN PERFORM public.door_refuse('seasonEnded'); END IF;
  v_price := public.product_price_for(v_level.key, v_row.category_id, v_country);
  IF v_price IS NULL THEN PERFORM public.door_refuse('notOffered'); END IF;
  v_market := public.market_settings_for(v_country);
  IF v_market.paid_levels THEN PERFORM public.door_refuse('creditsNotAvailable'); END IF;

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
    PERFORM public.transition_listing_core(p_listing_id, v_row.resume_status);
  END IF;

  RETURN jsonb_build_object('ok', true, 'level', v_level.key, 'until', v_until, 'source', v_source,
                            'status', (SELECT l.status FROM public.listings l WHERE l.id = p_listing_id));
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('set_listing_level', 'promote', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.set_listing_level(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_level(uuid, text) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. set_listing_reach (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.set_listing_reach(p_listing_id uuid, p_reach_key text)
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
  PERFORM public.door_context('owner', NULL, NULL, 'promote');
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid FOR UPDATE;
  -- DEC-391 (F1-5a) — an ad that is not the caller's, or no ad at all, is one answer.
  IF NOT FOUND THEN PERFORM public.door_refuse('notYourListing'); END IF;
  IF v_row.status NOT IN ('active', 'reduced', 'paused') THEN PERFORM public.door_refuse('notLive'); END IF;

  SELECT * INTO v_reach FROM public.listing_packages
   WHERE key = p_reach_key AND kind = 'reach' AND enabled AND self_serve FOR SHARE;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownReach'); END IF;
  SELECT loc.country_code INTO v_country FROM public.locations loc WHERE loc.id = v_row.location_id;
  IF v_country IS NULL THEN PERFORM public.door_refuse('listingNotPlaced'); END IF;
  v_market := public.market_settings_for(v_country);
  IF v_reach.key = v_market.included_reach THEN PERFORM public.door_refuse('includedReach'); END IF;
  SELECT * INTO v_cur FROM public.listing_packages
   WHERE key = coalesce(v_row.reach, v_market.included_reach) AND kind = 'reach';
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownReach'); END IF;
  IF v_row.reach IS NOT NULL AND v_reach.key = v_row.reach THEN
    PERFORM public.door_refuse('sameReach', v_row.reach_until::text);
  END IF;
  IF v_reach.sort <= v_cur.sort THEN PERFORM public.door_refuse('lowerReach'); END IF;
  v_price := public.product_price_for(v_reach.key, v_row.category_id, v_country);
  IF v_price IS NULL THEN PERFORM public.door_refuse('notOffered'); END IF;
  IF v_market.paid_levels THEN PERFORM public.door_refuse('creditsNotAvailable'); END IF;

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
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('set_listing_reach', 'promote', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.set_listing_reach(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_reach(uuid, text) TO authenticated, service_role;


-- Proof: catalog facts, then the calls on scratch rows under a sentinel rollback.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_none    uuid := gen_random_uuid();
  v_ca      text := json_build_object('sub', v_a::text, 'role', 'authenticated')::text;
  v_cb      text := json_build_object('sub', v_b::text, 'role', 'authenticated')::text;
  v_cd      text := json_build_object('sub', v_d::text, 'role', 'authenticated')::text;
  v_r0      text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_snap    text;
  v_snap2   text;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
  v_al      uuid := gen_random_uuid();
  v_ad      uuid := gen_random_uuid();
  v_bl      uuid := gen_random_uuid();
BEGIN
  v_pairs := ARRAY[
    ['public.set_listing_level(uuid,text)', '6bf9af3d6a3103aa69b1047c30b6ada4', 'browser', 't', 'jsonb'],
    ['public.set_listing_reach(uuid,text)', 'ee3e01f89b2ca6f6ae10b6ba9221c432', 'browser', 't', 'jsonb']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef <> (v_pairs[i][4] = 't') OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> v_pairs[i][5]::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') <> (v_pairs[i][3] = 'browser')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') <> (v_pairs[i][3] <> 'owner') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 11 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15a11-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_none) THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: the id no row holds is held';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5a part 11 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_b, v_d]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_d
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_d AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);

    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_al, v_a, v_cat, v_city, v_tag || ' al', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_ad, v_a, v_cat, v_city, v_tag || ' ad', 'scratch', v_code, 'draft',
            NULL, NULL, NULL);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_bl, v_b, v_cat, v_city, v_tag || ' bl', 'scratch', v_code, 'active',
            now(), now(), now() + interval '10 days');
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date AND door IN ('set_listing_level', 'set_listing_reach');
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_revisions r WHERE r.seller_id IN (v_a, v_b, v_d))
        || '#' || coalesce((SELECT string_agg(p.id::text || '@' || p.display_order, ',' ORDER BY p.id) FROM public.listing_photos p
                              JOIN public.listings l ON l.id = p.listing_id WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_photo_changes c JOIN public.listings l ON l.id = c.listing_id
                    WHERE l.seller_id IN (v_a, v_b, v_d))
        || '#' || (SELECT count(*) FROM storage.objects o WHERE o.name LIKE v_tag || '%')
        || '#' || coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.user_id) FROM public.seller_places s
                              WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                              WHERE p.user_id IN (v_a, v_b, v_d)
                                AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.audit_log a WHERE a.actor_id IN (v_a, v_b, v_d)
                    OR a.entity_id IN (SELECT l.id::text FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)))
        || '#' || (SELECT count(*) FROM public.seller_notices n WHERE n.seller_id IN (v_a, v_b, v_d))
      INTO v_snap;
    v_answer := public.set_listing_level(v_al, 'e2e-none');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: set_listing_level with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.set_listing_level(v_al, 'e2e-none');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: set_listing_level for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.set_listing_level(v_al, 'e2e-none');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: set_listing_level on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.set_listing_level(v_none, 'e2e-none');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: set_listing_level on an id no row holds answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.set_listing_reach(v_al, 'e2e-none');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: set_listing_reach with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.set_listing_reach(v_al, 'e2e-none');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: set_listing_reach for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.set_listing_reach(v_al, 'e2e-none');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: set_listing_reach on another seller''s ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.set_listing_reach(v_none, 'e2e-none');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notYourListing', 'notYourListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: set_listing_reach on an id no row holds answered %', v_answer;
    END IF;
    v_answer := public.set_listing_level(v_ad, public.baseline_level_key());
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notLive', 'notLive', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: a draft''s level answered %', v_answer;
    END IF;
    v_answer := public.set_listing_level(v_al, 'e2e-none-' || v_hex);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('unknownLevel', 'unknownLevel', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: an unknown level answered %', v_answer;
    END IF;
    v_answer := public.set_listing_level(v_al, public.baseline_level_key());
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('sameLevel', 'sameLevel', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: the level it has answered %', v_answer;
    END IF;
    v_answer := public.set_listing_reach(v_ad, v_r0);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notLive', 'notLive', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: a draft''s reach answered %', v_answer;
    END IF;
    v_answer := public.set_listing_reach(v_al, 'e2e-none-' || v_hex);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('unknownReach', 'unknownReach', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: an unknown reach answered %', v_answer;
    END IF;
    v_answer := public.set_listing_reach(v_al, v_r0);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('includedReach', 'includedReach', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: the market''s included reach answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_revisions r WHERE r.seller_id IN (v_a, v_b, v_d))
        || '#' || coalesce((SELECT string_agg(p.id::text || '@' || p.display_order, ',' ORDER BY p.id) FROM public.listing_photos p
                              JOIN public.listings l ON l.id = p.listing_id WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_photo_changes c JOIN public.listings l ON l.id = c.listing_id
                    WHERE l.seller_id IN (v_a, v_b, v_d))
        || '#' || (SELECT count(*) FROM storage.objects o WHERE o.name LIKE v_tag || '%')
        || '#' || coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.user_id) FROM public.seller_places s
                              WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                              WHERE p.user_id IN (v_a, v_b, v_d)
                                AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.audit_log a WHERE a.actor_id IN (v_a, v_b, v_d)
                    OR a.entity_id IN (SELECT l.id::text FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)))
        || '#' || (SELECT count(*) FROM public.seller_notices n WHERE n.seller_id IN (v_a, v_b, v_d))
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: a refused level or reach call wrote a row';
    END IF;
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' ELSE 'd' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_d::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"a/promote":8,"b/promote":2}'::jsonb THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door IN ('set_listing_level', 'set_listing_reach'))
         IS DISTINCT FROM v_refused + 14 THEN
      RAISE EXCEPTION 'F1-5a part 11 proof: door_refusals did not meter the 14 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5a-part-11-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5a-part-11-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261116030900') ON CONFLICT DO NOTHING;
