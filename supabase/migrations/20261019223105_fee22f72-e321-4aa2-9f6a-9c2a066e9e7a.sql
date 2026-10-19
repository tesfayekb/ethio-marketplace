-- e2e-areas: feed, ad-page, legal
-- Bundle 22 (Stage 1) turn 8 — M8b (part 2 of 4): the three public row-level policies and eight functions read the sold
-- window from the setting. Each policy is re-created whole from 20261015023155_3600a562 (section G) and each function
-- re-declared whole from its last declaration in the repository (feed_index_refresh, feed_index_check and
-- feed_index_check_sweep: 20261015023155_3600a562; public_listing, count_listing_view and count_listing_share:
-- 20261017044823_6a61a7ca; save_listing: 20261017122742_dd874885; report_listing: 20261017115807_1c740888), header,
-- body, revoke and grants unchanged apart from one named change in each: the expression now() - interval '30 days'
-- becomes (SELECT public.sold_cutoff()) (a scalar subquery, read once per statement). Comments that say "30 days" are
-- kept: 30 is the setting's default. With the setting at 30, every answer is the same as before.
-- Gated on M8a's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020080000') THEN
    RAISE EXCEPTION 'bundle 22 turn 8 M8a (mark 20261020080000) must be applied first';
  END IF;
END $$;

DROP POLICY IF EXISTS listings_public_read ON public.listings;
CREATE POLICY listings_public_read ON public.listings
  FOR SELECT TO anon, authenticated
  USING (status = 'active' OR (status = 'sold' AND sold_at > (SELECT public.sold_cutoff())));

DROP POLICY IF EXISTS listing_photos_public_read ON public.listing_photos;
CREATE POLICY listing_photos_public_read ON public.listing_photos
  FOR SELECT TO anon, authenticated
  USING (
    exif_stripped
    AND NOT unscreened
    AND EXISTS (
      SELECT 1 FROM public.listings l
       WHERE l.id = listing_photos.listing_id
         AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))
    )
  );

DROP POLICY IF EXISTS listing_locations_public_read ON public.listing_locations;
CREATE POLICY listing_locations_public_read
  ON public.listing_locations FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.listings l
     WHERE l.id = listing_id
       AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))));

CREATE OR REPLACE FUNCTION public.feed_index_refresh(p_listing_id uuid)
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_status      text;
  v_published   timestamptz;
  v_category_id uuid;
  v_location_id uuid;
  v_tier        text;
  v_sold_at     timestamptz;
  v_n           integer := 0;
BEGIN
  -- The listing's row lock serialises two refreshes of the same listing.
  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at
    INTO v_status, v_published, v_category_id, v_location_id, v_tier, v_sold_at
    FROM public.listings l
   WHERE l.id = p_listing_id
     FOR UPDATE;
  DELETE FROM public.feed_index WHERE listing_id = p_listing_id;
  -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
  IF v_published IS NULL
     OR NOT (v_status = 'active' OR (v_status = 'sold' AND v_sold_at > (SELECT public.sold_cutoff()))) THEN
    RETURN 0;
  END IF;
  INSERT INTO public.feed_index (category_key, place_key, tier_rank, published_at, listing_id)
  SELECT k.category_key, k.place_key,
         CASE WHEN v_status = 'sold' THEN -1 ELSE public.feed_tier_rank(v_tier) END, v_published, p_listing_id
    FROM public.feed_keys(
           v_category_id,
           ARRAY[v_location_id] || ARRAY(
             SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id)) k;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_refresh(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_refresh(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.feed_index_check(p_listing_id uuid DEFAULT NULL)
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  WITH scope AS (
    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at
      FROM public.listings l
     WHERE p_listing_id IS NULL OR l.id = p_listing_id
  ),
  live AS (
    -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
    SELECT * FROM scope
     WHERE published_at IS NOT NULL
       AND (status = 'active' OR (status = 'sold' AND sold_at > (SELECT public.sold_cutoff())))
  ),
  indexed AS (
    SELECT DISTINCT f.listing_id
      FROM public.feed_index f
     WHERE p_listing_id IS NULL OR f.listing_id = p_listing_id
  )
  SELECT jsonb_build_object(
    'active_listings',
      (SELECT count(*) FROM scope WHERE status = 'active'),
    'active_without_published_at',
      (SELECT count(*) FROM scope WHERE status = 'active' AND published_at IS NULL),
    'sold_shown',
      (SELECT count(*) FROM live WHERE status = 'sold'),
    'active_without_rows',
      (SELECT count(*) FROM live v WHERE NOT EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)),
    'rows_for_inactive',
      (SELECT count(*) FROM public.feed_index f JOIN scope s ON s.id = f.listing_id
        WHERE NOT EXISTS (SELECT 1 FROM live v WHERE v.id = s.id)),
    'listings_with_wrong_rows',
      (SELECT count(*) FROM live v
        WHERE EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)
          AND EXISTS (
            (SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id
             EXCEPT
             SELECT k.category_key, k.place_key, CASE WHEN v.status = 'sold' THEN -1 ELSE public.feed_tier_rank(v.tier) END, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k)
            UNION ALL
            (SELECT k.category_key, k.place_key, CASE WHEN v.status = 'sold' THEN -1 ELSE public.feed_tier_rank(v.tier) END, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k
             EXCEPT
             SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id)))
  );
$fn$;
REVOKE ALL ON FUNCTION public.feed_index_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.feed_index_check_sweep()
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_result jsonb;
  v_id     uuid;
  v_gone   integer := 0;
BEGIN
  -- Bundle 16 turn 3c (D175 1) — a sold ad whose 30 days are over leaves the feed: its rows go (feed_page already
  -- reads only the ads it shows).
  FOR v_id IN
    SELECT DISTINCT f.listing_id
      FROM public.feed_index f
      JOIN public.listings l ON l.id = f.listing_id
     WHERE l.status = 'sold' AND (l.sold_at IS NULL OR l.sold_at <= (SELECT public.sold_cutoff()))
  LOOP
    PERFORM public.feed_index_refresh(v_id);
    v_gone := v_gone + 1;
  END LOOP;
  v_result := public.feed_index_check(NULL)
              || jsonb_build_object('queued', (SELECT count(*) FROM public.feed_reindex_queue),
                                    'sold_left_feed', v_gone);
  INSERT INTO public.feed_index_check_runs (result) VALUES (v_result);
  DELETE FROM public.feed_index_check_runs WHERE ran_at < now() - interval '60 days';
  -- A queue that still holds rows is woken again (its drain stops only when the queue is empty).
  IF (v_result->>'queued')::int > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_result;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_check_sweep() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check_sweep() TO service_role;

CREATE OR REPLACE FUNCTION public.public_listing(p_public_id text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_row  public.listings%ROWTYPE;
  v_rate jsonb;
BEGIN
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RETURN NULL;
  END IF;
  -- A signed-in caller is counted here; an anonymous caller is counted by the route, by hashed address.
  v_rate := public.rate_gate('listing_read');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RAISE EXCEPTION 'rateLimited';
  END IF;
  -- listings_public_read (20261015023155), restated: live, or sold within 30 days. Anything else is "not there".
  SELECT * INTO v_row FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())));
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;
  RETURN public.public_listing_json(v_row, auth.uid());
END $$;
REVOKE ALL ON FUNCTION public.public_listing(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.public_listing(text) TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.count_listing_view(p_public_id text, p_rate_key text, p_viewer uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id     uuid;
  v_seller uuid;
  v_gate   jsonb;
BEGIN
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN RETURN false; END IF;
  IF p_rate_key IS NULL OR btrim(p_rate_key) = '' THEN RAISE EXCEPTION 'rate key required'; END IF;
  SELECT l.id, l.seller_id INTO v_id, v_seller FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())));
  IF NOT FOUND THEN RETURN false; END IF;
  -- The owner's own view is not a view.
  IF p_viewer IS NOT NULL AND p_viewer = v_seller THEN RETURN false; END IF;
  -- One count per address and ad per hour: the first call in the window counts, the rest do not.
  v_gate := public.consume_rate_limit('listing_view', p_rate_key || ':' || p_public_id, 1, interval '1 hour');
  IF NOT coalesce((v_gate->>'allowed')::boolean, false) THEN RETURN false; END IF;
  INSERT INTO public.listing_counters (listing_id, day, views) VALUES (v_id, current_date, 1)
  ON CONFLICT (listing_id, day) DO UPDATE SET views = public.listing_counters.views + 1;
  RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.count_listing_view(text, text, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.count_listing_view(text, text, uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.count_listing_share(p_public_id text, p_channel text, p_rate_key text, p_viewer uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id   uuid;
  v_gate jsonb;
BEGIN
  IF p_channel IS NULL OR p_channel NOT IN ('telegram', 'whatsapp', 'facebook', 'copy', 'qr') THEN
    RAISE EXCEPTION 'unknown share channel';
  END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN RETURN false; END IF;
  IF p_rate_key IS NULL OR btrim(p_rate_key) = '' THEN RAISE EXCEPTION 'rate key required'; END IF;
  SELECT l.id INTO v_id FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())));
  IF NOT FOUND THEN RETURN false; END IF;
  v_gate := public.consume_rate_limit('listing_share', p_rate_key || ':' || p_public_id || ':' || p_channel, 1, interval '1 hour');
  IF NOT coalesce((v_gate->>'allowed')::boolean, false) THEN RETURN false; END IF;
  INSERT INTO public.listing_counters (listing_id, day, shares_telegram, shares_whatsapp, shares_facebook, shares_copy, shares_qr)
  VALUES (v_id, current_date,
          (p_channel = 'telegram')::integer, (p_channel = 'whatsapp')::integer, (p_channel = 'facebook')::integer,
          (p_channel = 'copy')::integer, (p_channel = 'qr')::integer)
  ON CONFLICT (listing_id, day) DO UPDATE SET
    shares_telegram = public.listing_counters.shares_telegram + EXCLUDED.shares_telegram,
    shares_whatsapp = public.listing_counters.shares_whatsapp + EXCLUDED.shares_whatsapp,
    shares_facebook = public.listing_counters.shares_facebook + EXCLUDED.shares_facebook,
    shares_copy     = public.listing_counters.shares_copy     + EXCLUDED.shares_copy,
    shares_qr       = public.listing_counters.shares_qr       + EXCLUDED.shares_qr;
  RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.count_listing_share(text, text, text, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.count_listing_share(text, text, text, uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.save_listing(p_public_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_id    uuid;
  v_rate  jsonb;
  v_count bigint;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;
  -- The public predicate (listings_public_read): a live ad, or a sold one within its 30 days. Anything else is not there.
  SELECT l.id INTO v_id FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())));
  IF v_id IS NULL THEN RAISE EXCEPTION 'listingNotAvailable'; END IF;
  -- The owner does not save his own ad (D201 §5: no Save for the owner), so "Saved by N" counts buyers only.
  IF EXISTS (SELECT 1 FROM public.listings l WHERE l.id = v_id AND l.seller_id = v_uid) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'ownListing');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.saved_listings s WHERE s.user_id = v_uid AND s.listing_id = v_id) THEN
    v_rate := public.rate_gate('save');
    IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
      RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at');
    END IF;
    -- INC-694 — personal data carries the saver's home country (Knowledge E3), from user_directory.
    INSERT INTO public.saved_listings (user_id, listing_id, home_country_code)
    VALUES (v_uid, v_id, (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid))
    ON CONFLICT DO NOTHING;
  END IF;
  SELECT count(*) INTO v_count FROM public.saved_listings s WHERE s.listing_id = v_id;
  RETURN jsonb_build_object('ok', true, 'saved', true, 'count', v_count);
END $function$;
REVOKE ALL ON FUNCTION public.save_listing(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_listing(text) TO authenticated;
GRANT ALL ON FUNCTION public.save_listing(text) TO service_role;

CREATE OR REPLACE FUNCTION public.report_listing(p_public_id text, p_reason text, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_id     uuid;
  v_seller uuid;
  v_note   text;
  v_rate   jsonb;
  v_home   character(2);
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;
  IF p_reason IS NULL OR p_reason NOT IN ('spam', 'scam', 'prohibited', 'wrongCategory', 'duplicate', 'alreadySold', 'under18', 'copyright', 'other') THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'badReason');
  END IF;
  v_note := nullif(btrim(coalesce(p_note, '')), '');
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'noteTooLong');
  END IF;
  -- The public predicate (listings_public_read): a live ad, or a sold one within its 30 days.
  SELECT l.id, l.seller_id INTO v_id, v_seller FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())));
  IF v_id IS NULL THEN RAISE EXCEPTION 'listingNotAvailable'; END IF;
  IF v_seller = v_uid THEN RETURN jsonb_build_object('ok', false, 'reason', 'ownListing'); END IF;
  IF EXISTS (SELECT 1 FROM public.listing_reports r
              WHERE r.listing_id = v_id AND r.reporter_id = v_uid AND r.status = 'open') THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'alreadyReported');
  END IF;
  v_rate := public.rate_gate('report');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at');
  END IF;
  SELECT d.home_country_code INTO v_home FROM public.user_directory d WHERE d.user_id = v_uid;
  INSERT INTO public.listing_reports (listing_id, reporter_id, home_country_code, reason, note)
  VALUES (v_id, v_uid, v_home, p_reason, v_note);
  RETURN jsonb_build_object('ok', true);
END $$;
REVOKE ALL ON FUNCTION public.report_listing(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.report_listing(text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.report_listing(text, text, text) TO service_role;

-- Proofs, with no caller (G39): the policies and the functions read the window from the setting and carry no typed 30
-- days; headers and grants as declared. The answers with a buyer and a seller are proven by the public-read, feed and
-- ad-page tests and LG-22.
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT * FROM (VALUES ('listings', 'listings_public_read'), ('listing_photos', 'listing_photos_public_read'),
                                 ('listing_locations', 'listing_locations_public_read')) AS t(tbl, pol) LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_policies p
                    WHERE p.schemaname = 'public' AND p.tablename = r.tbl AND p.policyname = r.pol
                      AND p.cmd = 'SELECT' AND p.roles @> ARRAY['anon', 'authenticated']::name[]
                      AND position('sold_cutoff()' IN p.qual) > 0 AND position('30 days' IN p.qual) = 0) THEN
      RAISE EXCEPTION 'proof failed: policy % on % does not read the sold window from the setting', r.pol, r.tbl;
    END IF;
  END LOOP;
END $$;
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  v_src  text;
  r      record;
BEGIN
  FOR r IN SELECT * FROM (VALUES
      ('public.feed_index_refresh(uuid)', 'v'::"char", false, false),
      ('public.feed_index_check(uuid)', 's'::"char", false, false),
      ('public.feed_index_check_sweep()', 'v'::"char", false, false),
      ('public.public_listing(text)', 'v'::"char", true, true),
      ('public.count_listing_view(text, text, uuid)', 'v'::"char", false, false),
      ('public.count_listing_share(text, text, text, uuid)', 'v'::"char", false, false),
      ('public.save_listing(text)', 'v'::"char", false, true),
      ('public.report_listing(text, text, text)', 'v'::"char", false, true)) AS t(sig, vol, anon_ok, auth_ok) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig, p.prosrc INTO v_vol, v_def, v_conf, v_src
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM true
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF position('(SELECT public.sold_cutoff())' IN v_src) = 0 OR position('interval ''30 days''' IN v_src) > 0 THEN
      RAISE EXCEPTION 'proof failed: % does not read the sold window from the setting', r.sig;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE') IS DISTINCT FROM r.anon_ok
       OR has_function_privilege('authenticated', r.sig, 'EXECUTE') IS DISTINCT FROM r.auth_ok
       OR NOT has_function_privilege('service_role', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: % grants', r.sig;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020090000') ON CONFLICT (version) DO NOTHING;
