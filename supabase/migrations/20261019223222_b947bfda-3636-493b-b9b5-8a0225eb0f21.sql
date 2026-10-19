-- e2e-areas: feed, ad-page, account
-- Bundle 22 (Stage 1) turn 8 — M8c (part 3 of 4): the three page reads read the sold window from the setting. Each is
-- re-declared whole from its last declaration in the repository (feed_page: 20261017060602_19df1767; seller_feed_page:
-- 20261017135824_7d6dcee1; my_saved_listings: 20261017132201_423af801), header, body, revoke and grants unchanged
-- apart from one named change in each: now() - interval '30 days' becomes (SELECT public.sold_cutoff()).
-- Gated on M8b's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020090000') THEN
    RAISE EXCEPTION 'bundle 22 turn 8 M8b (mark 20261020090000) must be applied first';
  END IF;
END $$;

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
             l.public_id, l.title, l.price_amount, l.price_currency, l.price_mode, l.price_bp,
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
         AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))
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
        'publicId', v_rec.public_id,
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

CREATE OR REPLACE FUNCTION public.seller_feed_page(p_seller_key text, p_after jsonb DEFAULT NULL, p_size integer DEFAULT 20)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  c_nil      constant uuid := '00000000-0000-0000-0000-000000000000';
  v_key      text := lower(btrim(coalesce(p_seller_key, '')));
  v_seller   uuid;
  v_alias    text;
  v_business text;
  v_type     text;
  v_since    timestamptz;
  v_has_cur  boolean := false;
  v_c_tier   smallint;
  v_c_pub    timestamptz;
  v_c_id     uuid;
  v_cards    jsonb := '[]'::jsonb;
  v_n        integer := 0;
  v_rec      record;
  v_end_t    smallint;
  v_end_p    timestamptz;
  v_end_i    uuid;
BEGIN
  IF p_size IS NULL OR p_size < 1 OR p_size > 50 THEN
    RAISE EXCEPTION 'seller_feed_page: badSize';
  END IF;
  -- D201 §12 — the public seller key is the seller's alias, lower-cased (the alias is unique on lower(); never an id).
  IF v_key !~ '^[a-z0-9_]{1,60}$' THEN
    RAISE EXCEPTION 'seller_feed_page: unknownSeller';
  END IF;
  SELECT p.user_id, p.seller_alias, p.business_name, p.seller_type, p.created_at
    INTO v_seller, v_alias, v_business, v_type, v_since
    FROM public.profiles p
   WHERE lower(p.seller_alias) = v_key
     AND p.account_status = 'active';
  IF v_seller IS NULL THEN
    RAISE EXCEPTION 'seller_feed_page: unknownSeller';
  END IF;

  -- The cursor: the last card's (tier, publish time, id) of the previous page — feed_page's shape, one step.
  IF p_after IS NOT NULL THEN
    BEGIN
      v_c_tier := (p_after->>'t')::smallint;
      v_c_pub  := (p_after->>'p')::timestamptz;
      v_c_id   := (p_after->>'i')::uuid;
    EXCEPTION WHEN others THEN
      RAISE EXCEPTION 'seller_feed_page: badCursor';
    END;
    IF v_c_tier IS NULL OR v_c_pub IS NULL OR v_c_id IS NULL THEN
      RAISE EXCEPTION 'seller_feed_page: badCursor';
    END IF;
    v_has_cur := true;
  END IF;

  -- The seller's ads in the feed's own order and public predicate: the feed index's "all categories, everywhere"
  -- row of each listing (one per ad), live or sold within 30 days, by the listings' seller index.
  FOR v_rec IN
    SELECT f.tier_rank, f.published_at, f.listing_id,
           l.public_id, l.title, l.price_amount, l.price_currency, l.price_mode, l.price_bp,
           l.price_negotiable, l.price_period, l.price_unit, l.price_unit_text,
           l.photos_soon, l.tier, l.category_id, l.location_id,
           CASE WHEN l.status = 'sold' THEN coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                               WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                     FROM public.categories c WHERE c.id = l.category_id), 'sold') END AS sold_word,
           l.reserved_at IS NOT NULL AS reserved,
           CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END AS price_was,
           loc.name_en AS location_name_en, loc.name_am AS location_name_am,
           (SELECT p.id FROM public.listing_photos p
             WHERE p.listing_id = l.id AND p.exif_stripped AND NOT p.unscreened
             ORDER BY p.display_order
             LIMIT 1) AS cover_photo_id
      FROM public.listings l
      JOIN public.feed_index f
        ON f.listing_id = l.id AND f.category_key = c_nil AND f.place_key = c_nil
      LEFT JOIN public.locations loc ON loc.id = l.location_id
     WHERE l.seller_id = v_seller
       AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))
       AND (NOT v_has_cur OR (f.tier_rank, f.published_at, f.listing_id) < (v_c_tier, v_c_pub, v_c_id))
     ORDER BY f.tier_rank DESC, f.published_at DESC, f.listing_id DESC
     LIMIT p_size
  LOOP
    v_cards := v_cards || jsonb_build_array(jsonb_build_object(
      'id', v_rec.listing_id,
      'publicId', v_rec.public_id,
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
      'step', 1));
    v_n := v_n + 1;
    v_end_t := v_rec.tier_rank;
    v_end_p := v_rec.published_at;
    v_end_i := v_rec.listing_id;
  END LOOP;

  RETURN jsonb_build_object(
    'seller', jsonb_build_object(
      'alias', v_alias,
      'businessName', CASE WHEN v_type = 'business' THEN v_business END,
      'memberSince', v_since),
    'cards', v_cards,
    'ladder', '[]'::jsonb,
    'steps', '[]'::jsonb,
    'next', CASE WHEN v_n = p_size
                 THEN jsonb_build_object('s', 1, 't', v_end_t, 'p', v_end_p, 'i', v_end_i)
            END);
END $fn$;
REVOKE ALL ON FUNCTION public.seller_feed_page(text, jsonb, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.seller_feed_page(text, jsonb, integer) TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.my_saved_listings(p_after jsonb DEFAULT NULL::jsonb, p_size integer DEFAULT 20)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_c_at  timestamptz;
  v_c_id  uuid;
  v_cards jsonb := '[]'::jsonb;
  v_rec   record;
  v_n     integer := 0;
  v_next  jsonb := NULL;
  v_last_at timestamptz;
  v_last_id uuid;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_size IS NULL OR p_size < 1 OR p_size > 50 THEN RAISE EXCEPTION 'my_saved_listings: badSize'; END IF;
  IF p_after IS NOT NULL THEN
    BEGIN
      v_c_at := (p_after->>'a')::timestamptz;
      v_c_id := (p_after->>'i')::uuid;
    EXCEPTION WHEN others THEN
      RAISE EXCEPTION 'my_saved_listings: badCursor';
    END;
    IF v_c_at IS NULL OR v_c_id IS NULL THEN RAISE EXCEPTION 'my_saved_listings: badCursor'; END IF;
  END IF;
  FOR v_rec IN
    SELECT s.created_at AS saved_at, s.listing_id,
           l.public_id, l.title, l.price_amount, l.price_currency, l.price_mode, l.price_bp,
           l.price_negotiable, l.price_period, l.price_unit, l.price_unit_text,
           l.photos_soon, l.tier, l.category_id, l.location_id, l.published_at,
           (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff()))) AS available,
           CASE WHEN l.status = 'sold' THEN coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                               WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                     FROM public.categories c WHERE c.id = l.category_id), 'sold') END AS sold_word,
           l.reserved_at IS NOT NULL AS reserved,
           CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END AS price_was,
           loc.name_en AS location_name_en, loc.name_am AS location_name_am,
           (SELECT p.id FROM public.listing_photos p
             WHERE p.listing_id = l.id AND p.exif_stripped AND NOT p.unscreened
             ORDER BY p.display_order
             LIMIT 1) AS cover_photo_id
      FROM public.saved_listings s
      JOIN public.listings l ON l.id = s.listing_id
      LEFT JOIN public.locations loc ON loc.id = l.location_id
     WHERE s.user_id = v_uid
       AND (v_c_at IS NULL OR (s.created_at, s.listing_id) < (v_c_at, v_c_id))
     ORDER BY s.created_at DESC, s.listing_id DESC
     LIMIT p_size + 1
  LOOP
    -- INC-701 — the cursor names the LAST card of this page (the next page reads the rows below it); the extra row
    -- fetched only says that a next page exists.
    IF v_n = p_size THEN
      v_next := jsonb_build_object('a', v_last_at, 'i', v_last_id);
      EXIT;
    END IF;
    v_last_at := v_rec.saved_at;
    v_last_id := v_rec.listing_id;
    -- An ad no longer public travels as a grey card only: its ids (for Remove), when it was saved, and available false —
    -- no title, price, place, mark or photo, so nothing written after it left the public (an edit under review, an ad
    -- removed by staff) reaches a buyer through his list.
    IF NOT v_rec.available THEN
      v_cards := v_cards || jsonb_build_array(jsonb_build_object(
        'id', v_rec.listing_id,
        'publicId', v_rec.public_id,
        'savedAt', v_rec.saved_at,
        'available', false));
      v_n := v_n + 1;
      CONTINUE;
    END IF;
    v_cards := v_cards || jsonb_build_array(jsonb_build_object(
      'id', v_rec.listing_id,
      'publicId', v_rec.public_id,
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
      'step', 1,
      'savedAt', v_rec.saved_at,
      'available', v_rec.available));
    v_n := v_n + 1;
  END LOOP;
  RETURN jsonb_build_object('cards', v_cards, 'next', v_next);
END $function$;
REVOKE ALL ON FUNCTION public.my_saved_listings(jsonb, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_saved_listings(jsonb, integer) TO authenticated;
GRANT ALL ON FUNCTION public.my_saved_listings(jsonb, integer) TO service_role;

-- Proofs, with no caller (G39): each reads the window from the setting and carries no typed 30 days; headers and
-- grants as declared.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  v_src  text;
  r      record;
BEGIN
  FOR r IN SELECT * FROM (VALUES
      ('public.feed_page(uuid, uuid, jsonb, integer)', 's'::"char", true, true),
      ('public.seller_feed_page(text, jsonb, integer)', 's'::"char", true, true),
      ('public.my_saved_listings(jsonb, integer)', 's'::"char", false, true)) AS t(sig, vol, anon_ok, auth_ok) LOOP
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

INSERT INTO public.migration_marks (version) VALUES ('20261020100000') ON CONFLICT (version) DO NOTHING;
