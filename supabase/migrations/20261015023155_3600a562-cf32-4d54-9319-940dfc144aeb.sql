-- Bundle 16 (My listings), turn 3c (2026-10-15). Tier A. A sold ad stays in the feed and the public reads for 30 days
-- after it sold, with its Sold (Rented, Filled) ribbon and its contact closed (D175 1); the feed card carries the
-- Reserved and "Price reduced" marks (D173). Spec: docs/features/my-listings.md.
-- e2e-areas: feed, my-listings
--
-- THE RULE, in one place for every reader below: an ad is shown to buyers while it is live (active), and a sold ad
-- for 30 days after it sold (sold_at). Contact stays closed on a sold ad: reveal_listing_contact answers only a live ad
-- and is not changed here.
-- A. feed_index_refresh, redeclared whole from 20261009052418: a sold ad keeps its rows for its 30 days, with rank -1, so
--    a page reads it after every live ad of its place (newest first among the sold).
-- B. feed_index_check, redeclared whole from 20261009052418: the same rule; a new count `sold_shown`.
-- C. feed_index_on_listing_insert and feed_index_on_listing_update, redeclared whole from 20261009052418: a sale, a
--    relist and a deletion of a sold ad rewrite its rows (they looked at live ads only).
-- D. feed_reindex_enqueue_categories and feed_reindex_enqueue_places, redeclared whole from 20261009052418: a moved
--    category or place queues the sold ads under it too.
-- E. feed_index_check_sweep, redeclared whole from 20261009052418 (the daily feed-index-check job): first, the rows of a
--    sold ad whose 30 days are over go; its answer gains `sold_left_feed`. No new job: feed_page already leaves such an
--    ad out the moment its 30 days end.
-- F. feed_page, redeclared whole from 20261014022725: the live ads and the sold ones for 30 days; the widening counts
--    live ads only; each card gains `soldWord` (sold, rented or filled — null for a live ad), `reserved` and `priceWas`
--    (the old price while the "Price reduced" mark stands, 14 days) — the same texts as my_listings' row (P4).
-- G. The public reads (listings_public_read, listing_photos_public_read, listing_locations_public_read) show a sold ad
--    for its 30 days, so its cover photo is still given a link; buyers may read `sold_at` (a column grant), which the
--    photo and place reads need.
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the headers and privileges; each redeclared body
--    equal to its earlier body beyond the named changes (carriage returns removed first); the card's texts equal to
--    my_listings'; the three policies and the column grant; the triggers in place. No proof creates or reads a listing
--    (a proof cannot create one): the behaviour is proven by FR-9…FR-11 (e2e/feed-route.spec.ts), FE-15
--    (e2e/feed-index.spec.ts), FS-15 (e2e/feed-screens.spec.ts) and MLA-11 (e2e/my-listings-ad.spec.ts).

-- ===== A — feed_index_refresh (redeclared whole) =====
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
     OR NOT (v_status = 'active' OR (v_status = 'sold' AND v_sold_at > now() - interval '30 days')) THEN
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

-- ===== B — feed_index_check (redeclared whole) =====
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
       AND (status = 'active' OR (status = 'sold' AND sold_at > now() - interval '30 days'))
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

-- ===== C — the listing triggers' functions (redeclared whole; the triggers are unchanged) =====
CREATE OR REPLACE FUNCTION public.feed_index_on_listing_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  -- Bundle 16 turn 3c (D175 1) — a sold ad too: the refresh decides whether it is shown.
  PERFORM public.feed_index_refresh(n.id) FROM new_rows n WHERE n.status IN ('active', 'sold');
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_listing_insert() FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.feed_index_on_listing_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_index_refresh(n.id)
     FROM new_rows n
     JOIN old_rows o ON o.id = n.id
    -- Bundle 16 turn 3c (D175 1) — a sold ad too: a sale, a relist or a deletion rewrites its rows.
    WHERE (o.status IN ('active', 'sold') OR n.status IN ('active', 'sold'))
      AND (o.status, o.published_at, o.category_id, o.location_id, o.tier, o.sold_at)
          IS DISTINCT FROM (n.status, n.published_at, n.category_id, n.location_id, n.tier, n.sold_at);
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_listing_update() FROM PUBLIC, anon, authenticated;

-- ===== D — the reindex queue (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.feed_reindex_enqueue_categories(p_category_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_n integer := 0;
BEGIN
  WITH RECURSIVE sub(id) AS (
    SELECT u.id FROM unnest(p_category_ids) AS u(id) WHERE u.id IS NOT NULL
    UNION
    SELECT t.child_id
      FROM sub s
      JOIN public.category_tree_pointers t ON t.parent_id = s.id
  )
  INSERT INTO public.feed_reindex_queue (listing_id)
  SELECT l.id
    FROM public.listings l
   WHERE l.status IN ('active', 'sold')
     AND l.category_id IN (SELECT id FROM sub)
  ON CONFLICT (listing_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_categories(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_categories(uuid[]) TO service_role;

CREATE OR REPLACE FUNCTION public.feed_reindex_enqueue_places(p_location_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_n integer := 0;
BEGIN
  WITH RECURSIVE sub(id) AS (
    SELECT u.id FROM unnest(p_location_ids) AS u(id) WHERE u.id IS NOT NULL
    UNION
    SELECT l.id
      FROM sub s
      JOIN public.locations l ON l.parent_id = s.id
  )
  INSERT INTO public.feed_reindex_queue (listing_id)
  SELECT l.id
    FROM public.listings l
   WHERE l.status IN ('active', 'sold')
     AND l.location_id IN (SELECT id FROM sub)
  UNION
  SELECT l.id
    FROM public.listing_locations ll
    JOIN public.listings l ON l.id = ll.listing_id
   WHERE l.status IN ('active', 'sold')
     AND ll.location_id IN (SELECT id FROM sub)
  ON CONFLICT (listing_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_places(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_places(uuid[]) TO service_role;

-- ===== E — feed_index_check_sweep (redeclared whole) =====
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
     WHERE l.status = 'sold' AND (l.sold_at IS NULL OR l.sold_at <= now() - interval '30 days')
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

-- ===== F — feed_page (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.feed_page(
  p_category_id uuid DEFAULT NULL,
  p_location_id uuid DEFAULT NULL,
  p_after jsonb DEFAULT NULL,
  p_size integer DEFAULT 20)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  c_nil     constant uuid := '00000000-0000-0000-0000-000000000000';
  c_widen   constant integer := 8;
  v_cat     uuid;
  v_steps   uuid[];
  v_last    integer;
  v_first   integer := 1;
  v_has_cur boolean := false;
  v_c_tier  smallint;
  v_c_pub   timestamptz;
  v_c_id    uuid;
  v_s       integer;
  v_left    integer;
  v_got     integer;
  v_cards   jsonb := '[]'::jsonb;
  v_n       integer := 0;
  v_rec     record;
  v_end_s   integer;
  v_end_t   smallint;
  v_end_p   timestamptz;
  v_end_i   uuid;
  v_steps_j jsonb := '[]'::jsonb;
BEGIN
  IF p_size IS NULL OR p_size < 1 OR p_size > 50 THEN
    RAISE EXCEPTION 'feed_page: badSize';
  END IF;

  -- The category: none means all categories (the named all key); one must be a live category.
  IF p_category_id IS NULL THEN
    v_cat := c_nil;
  ELSIF EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_category_id AND c.is_active) THEN
    v_cat := p_category_id;
  ELSE
    RAISE EXCEPTION 'feed_page: unknownCategory';
  END IF;

  -- The ladder: the chosen place, each parent up to its country, then everywhere.
  IF p_location_id IS NULL THEN
    v_steps := ARRAY[c_nil];
  ELSIF EXISTS (SELECT 1 FROM public.locations l WHERE l.id = p_location_id AND l.is_active) THEN
    v_steps := ARRAY(
      WITH RECURSIVE up(id, depth) AS (
        SELECT p_location_id, 0
        UNION ALL
        SELECT l.parent_id, u.depth + 1
          FROM up u
          JOIN public.locations l ON l.id = u.id
         WHERE l.parent_id IS NOT NULL AND u.depth < 8
      )
      SELECT up.id FROM up ORDER BY up.depth) || c_nil;
  ELSE
    RAISE EXCEPTION 'feed_page: unknownPlace';
  END IF;

  -- The widest step read: the first step that holds at least 8 listings, else everywhere. Bundle 16 turn 3c — only live
  -- listings count: a sold ad (rank -1) never stops the widening.
  v_last := cardinality(v_steps);
  FOR v_s IN 1 .. cardinality(v_steps) LOOP
    IF (SELECT count(*) FROM (
          SELECT 1 FROM public.feed_index f
           WHERE f.category_key = v_cat AND f.place_key = v_steps[v_s]
             AND f.tier_rank >= 0
           LIMIT c_widen) x) >= c_widen THEN
      v_last := v_s;
      EXIT;
    END IF;
  END LOOP;

  -- The cursor: the step and the last card's (tier, publish time, id) of the previous page.
  IF p_after IS NOT NULL THEN
    BEGIN
      v_first  := (p_after->>'s')::integer;
      v_c_tier := (p_after->>'t')::smallint;
      v_c_pub  := (p_after->>'p')::timestamptz;
      v_c_id   := (p_after->>'i')::uuid;
    EXCEPTION WHEN others THEN
      RAISE EXCEPTION 'feed_page: badCursor';
    END;
    IF v_first IS NULL OR v_c_tier IS NULL OR v_c_pub IS NULL OR v_c_id IS NULL
       OR v_first < 1 OR v_first > cardinality(v_steps) THEN
      RAISE EXCEPTION 'feed_page: badCursor';
    END IF;
    v_has_cur := true;
  END IF;

  FOR v_s IN v_first .. v_last LOOP
    v_left := p_size - v_n;
    EXIT WHEN v_left = 0;
    v_got := 0;
    FOR v_rec IN
      SELECT f.tier_rank, f.published_at, f.listing_id,
             l.title, l.price_amount, l.price_currency, l.price_mode, l.price_bp,
             l.price_negotiable, l.price_period, l.price_unit, l.price_unit_text,
             l.photos_soon, l.tier, l.category_id, l.location_id,
             -- Bundle 16 turn 3c (D173, D175 1) — the card's marks: the sold word, Reserved, the old price.
             CASE WHEN l.status = 'sold' THEN coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                                 WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                       FROM public.categories c WHERE c.id = l.category_id), 'sold') END AS sold_word,
             l.reserved_at IS NOT NULL AS reserved,
             CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END AS price_was,
             loc.name_en AS location_name_en, loc.name_am AS location_name_am,
             -- INC-606 — the card's photo: the listing's first stripped photo (the cover, D154).
             -- D158 (bundle 13 turn 6) — a photo held for staff is never a buyer's cover.
             (SELECT p.id FROM public.listing_photos p
               WHERE p.listing_id = f.listing_id AND p.exif_stripped AND NOT p.unscreened
               ORDER BY p.display_order
               LIMIT 1) AS cover_photo_id
        FROM public.feed_index f
        -- Bundle 16 turn 3c (D175 1) — the live ads and the sold ones for 30 days after they sold.
        JOIN public.listings l ON l.id = f.listing_id
         AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'))
        LEFT JOIN public.locations loc ON loc.id = l.location_id
       WHERE f.category_key = v_cat
         AND f.place_key = v_steps[v_s]
         AND (NOT v_has_cur OR v_s <> v_first
              OR (f.tier_rank, f.published_at, f.listing_id) < (v_c_tier, v_c_pub, v_c_id))
         AND (v_s = 1 OR NOT EXISTS (
               SELECT 1 FROM public.feed_index g
                WHERE g.category_key = v_cat AND g.place_key = v_steps[v_s - 1]
                  AND g.tier_rank = f.tier_rank AND g.published_at = f.published_at
                  AND g.listing_id = f.listing_id))
       ORDER BY f.tier_rank DESC, f.published_at DESC, f.listing_id DESC
       LIMIT v_left
    LOOP
      v_cards := v_cards || jsonb_build_array(jsonb_build_object(
        'id', v_rec.listing_id,
        'title', v_rec.title,
        'priceAmount', v_rec.price_amount,
        'priceCurrency', v_rec.price_currency,
        'priceMode', v_rec.price_mode,
        'priceBp', v_rec.price_bp,
        'priceNegotiable', v_rec.price_negotiable,
        'pricePeriod', v_rec.price_period,
        'priceUnit', v_rec.price_unit,
        'priceUnitText', v_rec.price_unit_text,
        'photosSoon', v_rec.photos_soon,
        'coverPhotoId', v_rec.cover_photo_id,
        'soldWord', v_rec.sold_word,
        'reserved', v_rec.reserved,
        'priceWas', v_rec.price_was,
        'tier', v_rec.tier,
        'publishedAt', v_rec.published_at,
        'categoryId', v_rec.category_id,
        'locationId', v_rec.location_id,
        'locationNameEn', v_rec.location_name_en,
        'locationNameAm', v_rec.location_name_am,
        'step', v_s));
      v_n := v_n + 1;
      v_got := v_got + 1;
      v_end_s := v_s;
      v_end_t := v_rec.tier_rank;
      v_end_p := v_rec.published_at;
      v_end_i := v_rec.listing_id;
    END LOOP;
    IF v_got > 0 THEN
      v_steps_j := v_steps_j || jsonb_build_array(jsonb_build_object('step', v_s, 'placeId', v_steps[v_s], 'shown', v_got));
    END IF;
  END LOOP;

  RETURN jsonb_build_object(
    'cards', v_cards,
    'ladder', to_jsonb(v_steps[1:v_last]),
    'steps', v_steps_j,
    'next', CASE WHEN v_n = p_size
                 THEN jsonb_build_object('s', v_end_s, 't', v_end_t, 'p', v_end_p, 'i', v_end_i)
            END);
END $fn$;

REVOKE ALL ON FUNCTION public.feed_page(uuid, uuid, jsonb, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_page(uuid, uuid, jsonb, integer) TO anon, authenticated, service_role;

-- ===== G — the public reads =====
GRANT SELECT (sold_at) ON public.listings TO anon, authenticated;

DROP POLICY IF EXISTS listings_public_read ON public.listings;
CREATE POLICY listings_public_read ON public.listings
  FOR SELECT TO anon, authenticated
  USING (status = 'active' OR (status = 'sold' AND sold_at > now() - interval '30 days'));

DROP POLICY IF EXISTS listing_photos_public_read ON public.listing_photos;
CREATE POLICY listing_photos_public_read ON public.listing_photos
  FOR SELECT TO anon, authenticated
  USING (
    exif_stripped
    AND NOT unscreened
    AND EXISTS (
      SELECT 1 FROM public.listings l
       WHERE l.id = listing_photos.listing_id
         AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'))
    )
  );

DROP POLICY IF EXISTS listing_locations_public_read ON public.listing_locations;
CREATE POLICY listing_locations_public_read
  ON public.listing_locations FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.listings l
     WHERE l.id = listing_id
       AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'))));

COMMENT ON TABLE public.feed_index IS
  'The feed''s ordered index (docs/governance/feed-engine-spec.md): one row per (category key, place key) of each shown listing with a publish time — a live one, and a sold one for 30 days after it sold (bundle 16 turn 3c, D175 1). A page is one range of the primary key read backwards: higher tier first, then newest, then id. Written only by feed_index_refresh; read by the feed''s read door (E2). Holds no personal data.';
COMMENT ON COLUMN public.feed_index.tier_rank IS
  'The listing''s tier (D108): premium 2, featured 1, regular 0 (feed_tier_rank); a sold ad -1, read after every live one (bundle 16 turn 3c). A higher rank is read first; newest first inside a rank.';

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n    integer;
  v_md5  text;
  v_src  text;
  v_row  text;
  v_seg  text;
BEGIN
  -- P1. The headers: each function keeps its volatility, its definer and its search path.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.feed_index_refresh(uuid)'::regprocedure, 'public.feed_reindex_enqueue_categories(uuid[])'::regprocedure,
                 'public.feed_reindex_enqueue_places(uuid[])'::regprocedure, 'public.feed_index_check_sweep()'::regprocedure)
     AND provolatile = 'v' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 4 THEN RAISE EXCEPTION 'B16T3c P1: a VOLATILE SECURITY DEFINER function lost its header'; END IF;
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.feed_index_check(uuid)'::regprocedure, 'public.feed_page(uuid,uuid,jsonb,integer)'::regprocedure)
     AND provolatile = 's' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T3c P1: feed_index_check or feed_page is not STABLE SECURITY DEFINER with search_path public'; END IF;
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.feed_index_on_listing_insert()'::regprocedure, 'public.feed_index_on_listing_update()'::regprocedure)
     AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T3c P1: a listing trigger''s function lost its header'; END IF;

  -- P2. Who may call them: feed_page anyone (the public feed); the rest the service only.
  IF NOT has_function_privilege('anon', 'public.feed_page(uuid,uuid,jsonb,integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.feed_page(uuid,uuid,jsonb,integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T3c P2: feed_page is not readable by buyers';
  END IF;
  IF has_function_privilege('anon', 'public.feed_index_refresh(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.feed_index_refresh(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.feed_index_check(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.feed_index_check(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.feed_index_check_sweep()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.feed_index_check_sweep()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.feed_reindex_enqueue_categories(uuid[])', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.feed_reindex_enqueue_places(uuid[])', 'EXECUTE')
     OR has_function_privilege('anon', 'public.feed_index_on_listing_update()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.feed_index_on_listing_insert()', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T3c P2: a service-only function is open to a browser role';
  END IF;

  -- P3. Each redeclared body is its earlier body beyond the named changes.
  SELECT md5(replace(replace(replace(replace(replace(p.prosrc, chr(13), ''), replace('  v_tier        text;
  v_sold_at     timestamptz;
', chr(13), ''), replace('  v_tier        text;
', chr(13), '')), replace('  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at
    INTO v_status, v_published, v_category_id, v_location_id, v_tier, v_sold_at
', chr(13), ''), replace('  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier
    INTO v_status, v_published, v_category_id, v_location_id, v_tier
', chr(13), '')), replace('  -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
  IF v_published IS NULL
     OR NOT (v_status = ''active'' OR (v_status = ''sold'' AND v_sold_at > now() - interval ''30 days'')) THEN
', chr(13), ''), replace('  IF v_status IS DISTINCT FROM ''active'' OR v_published IS NULL THEN
', chr(13), '')), replace('  SELECT k.category_key, k.place_key,
         CASE WHEN v_status = ''sold'' THEN -1 ELSE public.feed_tier_rank(v_tier) END, v_published, p_listing_id
', chr(13), ''), replace('  SELECT k.category_key, k.place_key, public.feed_tier_rank(v_tier), v_published, p_listing_id
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_index_refresh(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '0917d2701afb9acd5759627cb91cf3af' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_index_refresh differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(replace(replace(replace(replace(p.prosrc, chr(13), ''), replace('    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at
', chr(13), ''), replace('    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id, l.tier
', chr(13), '')), replace('    -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
    SELECT * FROM scope
     WHERE published_at IS NOT NULL
       AND (status = ''active'' OR (status = ''sold'' AND sold_at > now() - interval ''30 days''))
', chr(13), ''), replace('    SELECT * FROM scope WHERE status = ''active'' AND published_at IS NOT NULL
', chr(13), '')), replace('        WHERE NOT EXISTS (SELECT 1 FROM live v WHERE v.id = s.id)),
', chr(13), ''), replace('        WHERE s.status <> ''active'' OR s.published_at IS NULL),
', chr(13), '')), replace('    ''active_without_published_at'',
      (SELECT count(*) FROM scope WHERE status = ''active'' AND published_at IS NULL),
    ''sold_shown'',
      (SELECT count(*) FROM live WHERE status = ''sold''),
', chr(13), ''), replace('    ''active_without_published_at'',
      (SELECT count(*) FROM scope WHERE status = ''active'' AND published_at IS NULL),
', chr(13), '')), replace('CASE WHEN v.status = ''sold'' THEN -1 ELSE public.feed_tier_rank(v.tier) END', chr(13), ''), replace('public.feed_tier_rank(v.tier)', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_index_check(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '03d01e1e56694cc5aee9d321e96cf1ae' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_index_check differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(p.prosrc, chr(13), ''), replace('  -- Bundle 16 turn 3c (D175 1) — a sold ad too: the refresh decides whether it is shown.
  PERFORM public.feed_index_refresh(n.id) FROM new_rows n WHERE n.status IN (''active'', ''sold'');
', chr(13), ''), replace('  PERFORM public.feed_index_refresh(n.id) FROM new_rows n WHERE n.status = ''active'';
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_index_on_listing_insert()'::regprocedure;
  IF v_md5 IS DISTINCT FROM '971972c1996f3bd60c2192633cbddbd5' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_index_on_listing_insert differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(p.prosrc, chr(13), ''), replace('    -- Bundle 16 turn 3c (D175 1) — a sold ad too: a sale, a relist or a deletion rewrites its rows.
    WHERE (o.status IN (''active'', ''sold'') OR n.status IN (''active'', ''sold''))
      AND (o.status, o.published_at, o.category_id, o.location_id, o.tier, o.sold_at)
          IS DISTINCT FROM (n.status, n.published_at, n.category_id, n.location_id, n.tier, n.sold_at);
', chr(13), ''), replace('    WHERE (o.status = ''active'' OR n.status = ''active'')
      AND (o.status, o.published_at, o.category_id, o.location_id, o.tier)
          IS DISTINCT FROM (n.status, n.published_at, n.category_id, n.location_id, n.tier);
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_index_on_listing_update()'::regprocedure;
  IF v_md5 IS DISTINCT FROM '623c60df8a8256cf6aa7ad522ef366f7' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_index_on_listing_update differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(p.prosrc, chr(13), ''), replace('   WHERE l.status IN (''active'', ''sold'')
', chr(13), ''), replace('   WHERE l.status = ''active''
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_reindex_enqueue_categories(uuid[])'::regprocedure;
  IF v_md5 IS DISTINCT FROM '526bf60b06f650fc560a9ef28f992166' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_reindex_enqueue_categories differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(p.prosrc, chr(13), ''), replace('   WHERE l.status IN (''active'', ''sold'')
', chr(13), ''), replace('   WHERE l.status = ''active''
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_reindex_enqueue_places(uuid[])'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'd1282e1c98b6729a5406114e7e818299' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_reindex_enqueue_places differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(replace(p.prosrc, chr(13), ''), replace('DECLARE
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
     WHERE l.status = ''sold'' AND (l.sold_at IS NULL OR l.sold_at <= now() - interval ''30 days'')
  LOOP
    PERFORM public.feed_index_refresh(v_id);
    v_gone := v_gone + 1;
  END LOOP;
', chr(13), ''), replace('DECLARE
  v_result jsonb;
BEGIN
', chr(13), '')), replace('              || jsonb_build_object(''queued'', (SELECT count(*) FROM public.feed_reindex_queue),
                                    ''sold_left_feed'', v_gone);
', chr(13), ''), replace('              || jsonb_build_object(''queued'', (SELECT count(*) FROM public.feed_reindex_queue));
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_index_check_sweep()'::regprocedure;
  IF v_md5 IS DISTINCT FROM '13aa387232bc8602f1202ff814fde0ed' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_index_check_sweep differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(replace(replace(replace(regexp_replace(replace(p.prosrc, chr(13), ''), '             -- Bundle 16 turn 3c \(D173, D175 1\)[^\n]*\n([^\n]*\n){5}', ''), chr(13), ''), replace('  -- The widest step read: the first step that holds at least 8 listings, else everywhere. Bundle 16 turn 3c — only live
  -- listings count: a sold ad (rank -1) never stops the widening.
', chr(13), ''), replace('  -- The widest step read: the first step that holds at least 8 listings, else everywhere.
', chr(13), '')), replace('           WHERE f.category_key = v_cat AND f.place_key = v_steps[v_s]
             AND f.tier_rank >= 0
           LIMIT c_widen) x) >= c_widen THEN
', chr(13), ''), replace('           WHERE f.category_key = v_cat AND f.place_key = v_steps[v_s]
           LIMIT c_widen) x) >= c_widen THEN
', chr(13), '')), replace('        -- Bundle 16 turn 3c (D175 1) — the live ads and the sold ones for 30 days after they sold.
        JOIN public.listings l ON l.id = f.listing_id
         AND (l.status = ''active'' OR (l.status = ''sold'' AND l.sold_at > now() - interval ''30 days''))
', chr(13), ''), replace('        JOIN public.listings l ON l.id = f.listing_id AND l.status = ''active''
', chr(13), '')), replace('        ''soldWord'', v_rec.sold_word,
        ''reserved'', v_rec.reserved,
        ''priceWas'', v_rec.price_was,
', chr(13), ''), replace('', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.feed_page(uuid,uuid,jsonb,integer)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'e300681b63d67ed4d5e4a6e1456f9479' THEN
    RAISE EXCEPTION 'B16T3c P3: feed_page differs from its earlier body beyond the named changes';
  END IF;

  -- P4. The card's texts are my_listings' texts: the sold word and the old price.
  SELECT replace(prosrc, chr(13), '') INTO v_src FROM pg_proc WHERE oid = 'public.feed_page(uuid,uuid,jsonb,integer)'::regprocedure;
  SELECT replace(prosrc, chr(13), '') INTO v_row FROM pg_proc WHERE oid = 'public.my_listings(text,integer,integer)'::regprocedure;
  v_seg := substring(v_row FROM strpos(v_row, 'coalesce((SELECT CASE WHEN ''rented'''));
  v_seg := substring(v_seg FOR strpos(v_seg, '), ''sold'')') + length('), ''sold'')') - 1);
  IF length(v_seg) < 150 OR strpos(v_src, 'CASE WHEN l.status = ''sold'' THEN ' || v_seg || ' END AS sold_word') = 0 THEN
    RAISE EXCEPTION 'B16T3c P4: feed_page''s sold word is not my_listings'' text';
  END IF;
  v_seg := 'CASE WHEN l.price_drop_at > now() - interval ''14 days'' THEN l.price_was END';
  IF strpos(v_row, v_seg) = 0 OR strpos(v_src, v_seg || ' AS price_was') = 0 THEN
    RAISE EXCEPTION 'B16T3c P4: feed_page''s old price is not my_listings'' text';
  END IF;

  -- P5. The public reads: the three policies, for buyers, with the rule; buyers may read sold_at.
  SELECT count(*) INTO v_n FROM pg_policies
   WHERE schemaname = 'public'
     AND ((tablename = 'listings' AND policyname = 'listings_public_read')
       OR (tablename = 'listing_photos' AND policyname = 'listing_photos_public_read')
       OR (tablename = 'listing_locations' AND policyname = 'listing_locations_public_read'))
     AND cmd = 'SELECT' AND roles @> ARRAY['anon', 'authenticated']::name[] AND cardinality(roles) = 2
     AND qual LIKE '%''active''%' AND qual LIKE '%''sold''%' AND qual LIKE '%sold_at > (now() - ''30 days''::interval)%';
  IF v_n <> 3 THEN RAISE EXCEPTION 'B16T3c P5: a public read does not carry the rule (% of 3)', v_n; END IF;
  SELECT count(*) INTO v_n FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'listing_photos' AND policyname = 'listing_photos_public_read'
     AND qual LIKE '%exif_stripped%' AND qual LIKE '%NOT unscreened%';
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T3c P5: the photo read lost its stripped and held-photo rules'; END IF;
  IF NOT has_column_privilege('anon', 'public.listings', 'sold_at', 'SELECT')
     OR NOT has_column_privilege('authenticated', 'public.listings', 'sold_at', 'SELECT') THEN
    RAISE EXCEPTION 'B16T3c P5: buyers may not read sold_at';
  END IF;
  IF has_column_privilege('anon', 'public.listings', 'reserved_at', 'SELECT')
     OR has_column_privilege('anon', 'public.listings', 'price_was', 'SELECT') THEN
    RAISE EXCEPTION 'B16T3c P5: a column beyond sold_at was opened to buyers';
  END IF;

  -- P6. The feed's triggers are in place on listings.
  SELECT count(*) INTO v_n FROM pg_trigger
   WHERE tgrelid = 'public.listings'::regclass AND NOT tgisinternal
     AND tgname IN ('feed_index_on_listing_insert', 'feed_index_on_listing_update');
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T3c P6: a feed trigger on listings is missing'; END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261015170000') ON CONFLICT (version) DO NOTHING;
