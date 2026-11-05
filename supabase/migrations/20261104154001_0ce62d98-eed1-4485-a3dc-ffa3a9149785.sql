-- e2e-areas: posting, my-listings
-- P-2 (a) M-1b, part 5 of 5 — the publish door counts the free baseline (plan §5, D305).
-- public.publish_listing — CREATE OR REPLACE from 20261019115951 (M4b), whole (G39). One insertion
-- after the judge and before legal_certify: an ad at the baseline level publishes only while the
-- seller's committed baseline ads in the ad's country (its primary place: listings.location_id, else
-- the first covered place) are under the market's free_regular_ads — otherwise the judge's envelope
-- {ok:false, refusals:[{field slots, reason noFreeSlot, detail N}]}, nothing written. A level above
-- the baseline needs no slot. Its proof reverts the insertion and asserts the live body's md5; the
-- refusal itself is the helpers' behaviour (parts 1 and 3) and the browser tests' (FSL-1…3) — a
-- judge-passing scratch draft is theirs.
-- Ruling 9 (INC-1056): proof (b) normalises line endings on both sides — proof text only; no schema
-- statement, mark or grant changed.

DO $pre$
BEGIN
  IF to_regprocedure('public.market_settings_for(character)') IS NULL
     OR to_regprocedure('public.seller_regular_live(uuid,character)') IS NULL
     OR to_regprocedure('public.admin_set_listing_tier(uuid,text,text,text,integer)') IS NULL THEN
    RAISE EXCEPTION 'P-2 M-1b part 5: parts 1 to 4 (8816b4c0, 12091168, 307e79c4, fbffa284) must be applied first';
  END IF;
  IF to_regprocedure('public.publish_listing(uuid,uuid[],text)') IS NULL THEN
    RAISE EXCEPTION 'P-2 M-1b part 5: the live publish_listing(uuid,uuid[],text) is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE DOOR
CREATE OR REPLACE FUNCTION public.publish_listing(p_listing_id uuid, p_certified uuid[] DEFAULT NULL,
                                       p_language text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
  v_cov uuid[];
  v_val jsonb;
  v_rate jsonb;
  v_country char(2);
  v_market  public.market_settings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  v_rate := public.rate_gate('post');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited',
                         'resets_at', v_rate->>'resets_at')));
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('draft','rejected') THEN
    RAISE EXCEPTION 'illegal transition: % -> screening', v_row.status;
  END IF;

  -- M5 step 20 — the home-country check (bundle 3 step 12) and the naming
  -- check (step 22) live in the judge at step 8, so their refusals arrive
  -- with any others.
  SELECT array_agg(ll.location_id) INTO v_cov
    FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id;

  v_val := public.validate_listing_draft(v_uid, 8::smallint, v_row.category_id, v_row.title,
             v_row.description, v_row.video_url, v_row.attributes, v_row.price_mode,
             v_row.price_amount, v_row.price_currency, v_row.price_period,
             v_row.poster_expires_at, v_cov, v_row.contact_pref, v_row.attributes,
             v_row.price_bp, v_row.price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  -- P-2 (a) M-1b (D305) — the free baseline: an ad at the baseline level publishes only while the seller's
  -- committed baseline ads in the ad's country (its primary place) are under the market's free_regular_ads.
  IF v_row.tier = public.baseline_level_key() THEN
    SELECT loc.country_code INTO v_country FROM public.locations loc WHERE loc.id = coalesce(v_row.location_id, v_cov[1]);
    IF v_country IS NULL THEN RAISE EXCEPTION 'listingNotPlaced'; END IF;
    v_market := public.market_settings_for(v_country);
    IF public.seller_regular_live(v_uid, v_country) >= v_market.free_regular_ads THEN
      RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
        jsonb_build_object('field', 'slots', 'reason', 'noFreeSlot', 'detail', v_market.free_regular_ads)));
    END IF;
  END IF;

  -- Bundle 22 turn 4 (L1 v2 item 4) — the acceptance and the publishing certification, before anything is written.
  PERFORM public.legal_certify(v_uid, p_listing_id, 'publish', p_certified, p_language);

  UPDATE public.listings SET
    status = 'screening',
    published_first_at = coalesce(published_first_at, now()),
    draft_step = 8,
    attested_at = now(),  -- M5 step 19 — the seller's statement, stamped on every publish
    updated_at = now()
  WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'screening'), v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $function$;
REVOKE ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_listing(uuid, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants; (b) the body, its two fragments reverted (each found once), is byte
--     for byte M4b's live body (md5 a6534388c3cc4e967024439147c03271).
DO $proof$
DECLARE
  v_pub     regprocedure := 'public.publish_listing(uuid,uuid[],text)'::regprocedure;
  v_src     text;
  v_len     integer;
  v_frag    text;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_pub)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_pub)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_pub, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_pub, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_pub, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 M-1b part 5 proof (a): the header or the grants differ';
  END IF;

  -- (b)
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_pub;
  FOREACH v_frag IN ARRAY ARRAY[
    '  v_country char(2);
  v_market  public.market_settings%ROWTYPE;
',
    '  -- P-2 (a) M-1b (D305) — the free baseline: an ad at the baseline level publishes only while the seller''s
  -- committed baseline ads in the ad''s country (its primary place) are under the market''s free_regular_ads.
  IF v_row.tier = public.baseline_level_key() THEN
    SELECT loc.country_code INTO v_country FROM public.locations loc WHERE loc.id = coalesce(v_row.location_id, v_cov[1]);
    IF v_country IS NULL THEN RAISE EXCEPTION ''listingNotPlaced''; END IF;
    v_market := public.market_settings_for(v_country);
    IF public.seller_regular_live(v_uid, v_country) >= v_market.free_regular_ads THEN
      RETURN jsonb_build_object(''ok'', false, ''refusals'', jsonb_build_array(
        jsonb_build_object(''field'', ''slots'', ''reason'', ''noFreeSlot'', ''detail'', v_market.free_regular_ads)));
    END IF;
  END IF;

'] LOOP
    v_frag := replace(v_frag, chr(13), '');  -- INC-1056, law 13: both sides without CR (a pasted file is CRLF)
    v_len := (length(v_src) - length(replace(v_src, v_frag, ''))) / length(v_frag);
    IF v_len <> 1 THEN
      RAISE EXCEPTION 'P-2 M-1b part 5 proof (b): a publish-door fragment occurs % times: %', v_len, left(v_frag, 60);
    END IF;
    v_src := replace(v_src, v_frag, '');
  END LOOP;
  IF md5(v_src) IS DISTINCT FROM 'a6534388c3cc4e967024439147c03271' THEN
    RAISE EXCEPTION 'P-2 M-1b part 5 proof (b): publish_listing differs from its live body beyond this file''s insertion (%)', md5(v_src);
  END IF;
END;
$proof$;

-- ------------------------------------------------------------ 3. CLOSERS
REVOKE ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_listing(uuid, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261104213000') ON CONFLICT DO NOTHING;
