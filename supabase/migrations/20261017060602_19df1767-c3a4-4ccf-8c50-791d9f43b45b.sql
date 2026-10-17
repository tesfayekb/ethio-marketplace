-- Bundle 19 turn 6 (2026-10-17). Tier A. D201 §2 — M1b: THE THREE READS THAT NAME AN AD CARRY ITS PUBLIC ID.
-- e2e-areas: ad-page, feed, my-listings
-- The feed card becomes a link to the ad's page (/l/<words>-<public_id>) and the seller's ad page links to the
-- buyer's view; both need `public_id` in the rows they already read. Three doors are redeclared WHOLE from their
-- last declaration in the repository, each with ONE change — the row object gains `'publicId', <row>.public_id`
-- (feed_page's inner SELECT also reads l.public_id) — and every header attribute kept (STABLE, SECURITY DEFINER,
-- search_path public), argument lists unchanged, grants restated:
-- A. feed_page(uuid, uuid, jsonb, integer) — last declared 20261015023155 (bundle 16 turn 3c); the card gains publicId.
-- B. my_listings(text, integer, integer, text, uuid, text) — last declared 20261015071455 (turn R1); the row gains publicId.
-- C. my_listing(uuid) — last declared 20261015012743 (bundle 16 turn 3); the listing object gains publicId.
-- D. Proofs P1–P3 in one DO block, no row read or written: the headers; the grants as before; each new body with
--    its inserted line(s) removed equals the previous body byte for byte (md5 over prosrc with carriage returns
--    removed — INC-624), so nothing else moved. RAISE EXCEPTION on any failure; a clean apply is the pass. The
--    behaviour (the card's publicId equals the row's; the seller's rows carry it) is proven by the route and page
--    tests of this turn. No table lock: a redeclaration locks only the function itself, so this file applies under load.

-- ===== A — feed_page =====
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

-- ===== B — my_listings =====
CREATE OR REPLACE FUNCTION public.my_listings(p_group text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0,
                                             p_search text DEFAULT NULL, p_category uuid DEFAULT NULL,
                                             p_mark text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_counts jsonb;
  v_rows   jsonb;
  v_term   text := lower(btrim(coalesce(p_search, '')));
  v_policy public.listing_policy%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_group IS NULL OR p_group NOT IN ('live','review','attention','closed','sold','drafts') THEN
    RAISE EXCEPTION 'unknown group';
  END IF;
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 100 OR p_offset IS NULL OR p_offset < 0 THEN
    RAISE EXCEPTION 'bad page';
  END IF;
  -- Bundle 16 turn R1 (D181) — the seller's search (words of the title) and filters (a category with everything
  -- under it; Reserved; Price reduced).
  IF length(v_term) > 100 THEN RAISE EXCEPTION 'bad search'; END IF;
  IF p_mark IS NOT NULL AND p_mark NOT IN ('reserved','reduced') THEN RAISE EXCEPTION 'unknown mark'; END IF;

  -- The groups of My listings (D138, D173–D175): live (active, reduced — reach is staff's lever and is not shown),
  -- in review (screening, held), needs attention (rejected, removed), closed (closed, expired), sold, drafts.
  WITH mine AS (
    SELECT l.status,
           CASE l.status
             WHEN 'active' THEN 'live'      WHEN 'reduced' THEN 'live'
             WHEN 'screening' THEN 'review' WHEN 'held' THEN 'review'
             WHEN 'rejected' THEN 'attention' WHEN 'removed' THEN 'attention'
             WHEN 'closed' THEN 'closed'    WHEN 'expired' THEN 'closed'
             WHEN 'sold' THEN 'sold'        WHEN 'draft' THEN 'drafts'
           END AS grp
      FROM public.listings l
     WHERE l.seller_id = v_uid
       AND l.deleted_at IS NULL
       -- Bundle 16 turn R1 (D181) — the seller's search and filters; the counts follow them.
       AND (v_term = '' OR position(v_term IN lower(coalesce(l.title, ''))) > 0)
       AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
       AND (p_mark IS NULL
            OR (p_mark = 'reserved' AND l.reserved_at IS NOT NULL)
            OR (p_mark = 'reduced' AND l.status <> 'sold' AND l.price_drop_at > now() - interval '14 days'))
  )
  SELECT jsonb_build_object(
           'live',      count(*) FILTER (WHERE grp = 'live'),
           'review',    count(*) FILTER (WHERE grp = 'review'),
           'attention', count(*) FILTER (WHERE grp = 'attention'),
           'closed',    count(*) FILTER (WHERE grp = 'closed'),
           'sold',      count(*) FILTER (WHERE grp = 'sold'),
           'drafts',    count(*) FILTER (WHERE grp = 'drafts'))
    INTO v_counts
    FROM mine;

  SELECT coalesce(jsonb_agg(r.row ORDER BY r.changed DESC, r.id DESC), '[]'::jsonb)
    INTO v_rows
    FROM (
      SELECT l.id, coalesce(l.updated_at, l.created_at) AS changed,
             jsonb_build_object(
               'id', l.id,
               'publicId', l.public_id,
               'status', l.status,
               'title', l.title,
               'categoryId', l.category_id,
               'coverPhotoId', (SELECT p.id FROM public.listing_photos p
                                 WHERE p.listing_id = l.id AND p.exif_stripped
                                 ORDER BY p.display_order
                                 LIMIT 1),
               'photosSoon', l.photos_soon,
               'priceMode', l.price_mode,
               'priceAmount', l.price_amount,
               'priceCurrency', l.price_currency,
               'pricePeriod', l.price_period,
               'priceBp', l.price_bp,
               'priceNegotiable', l.price_negotiable,
               'priceUnit', l.price_unit,
               'priceUnitText', l.price_unit_text,
               -- D173 2 — the "Price reduced" record while its 14 days stand.
               'priceWas', CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END,
               'reserved', l.reserved_at IS NOT NULL,
               'publishedFirstAt', l.published_first_at,
               'publishedAt', l.published_at,
               'renewedAt', l.renewed_at,
               'expiresAt', l.expires_at,
               -- The days an ad has left (live) or keeps while closed: whole days, rounded up; null with no end date.
               'daysLeft', CASE WHEN l.status IN ('active','reduced') AND l.expires_at IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM (l.expires_at - now())) / 86400))::integer END,
               'daysKept', CASE WHEN l.status = 'closed' AND l.kept_remaining IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM l.kept_remaining) / 86400))::integer END,
               'soldAt', l.sold_at,
               -- Bundle 16 turn 3b (call H) — the word a sold ad takes: Rented or Filled when its category says so.
               'soldWord', coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                                 WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                       FROM public.categories c WHERE c.id = l.category_id), 'sold'),
               'createdAt', l.created_at,
               'updatedAt', l.updated_at,
               -- A removed ad's latest staff reason (seller_notices, which the seller already reads).
               'removedReason', CASE WHEN l.status = 'removed' THEN
                                  (SELECT sn.reason FROM public.seller_notices sn
                                    WHERE sn.listing_id = l.id AND sn.seller_id = v_uid AND sn.kind = 'admin_remove'
                                    ORDER BY sn.created_at DESC
                                    LIMIT 1) END) AS row
        FROM public.listings l
       WHERE l.seller_id = v_uid
         AND l.deleted_at IS NULL
         -- Bundle 16 turn R1 (D181) — the seller's search and filters; the counts follow them.
         AND (v_term = '' OR position(v_term IN lower(coalesce(l.title, ''))) > 0)
         AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
         AND (p_mark IS NULL
              OR (p_mark = 'reserved' AND l.reserved_at IS NOT NULL)
              OR (p_mark = 'reduced' AND l.status <> 'sold' AND l.price_drop_at > now() - interval '14 days'))
         AND CASE l.status
               WHEN 'active' THEN 'live'      WHEN 'reduced' THEN 'live'
               WHEN 'screening' THEN 'review' WHEN 'held' THEN 'review'
               WHEN 'rejected' THEN 'attention' WHEN 'removed' THEN 'attention'
               WHEN 'closed' THEN 'closed'    WHEN 'expired' THEN 'closed'
               WHEN 'sold' THEN 'sold'        WHEN 'draft' THEN 'drafts'
             END = p_group
       ORDER BY coalesce(l.updated_at, l.created_at) DESC, l.id DESC
       LIMIT p_limit OFFSET p_offset
    ) r;

  -- Bundle 16 turn R1 (D181) — the admin's renew setting, as my_listing gives it, for the rows' Renew.
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;
  RETURN jsonb_build_object('counts', v_counts, 'rows', v_rows,
                            'renewAllowed', coalesce(v_policy.renew_allowed, false),
                            'renewDays', v_policy.renew_days);
END $function$;
REVOKE ALL ON FUNCTION public.my_listings(text, integer, integer, text, uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listings(text, integer, integer, text, uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.my_listings(text, integer, integer, text, uuid, text) TO service_role;

-- ===== C — my_listing =====
CREATE OR REPLACE FUNCTION public.my_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_policy public.listing_policy%ROWTYPE;
  v_out    jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;

  SELECT jsonb_build_object(
           'listing',
             jsonb_build_object(
               'id', l.id,
               'publicId', l.public_id,
               'status', l.status,
               'title', l.title,
               'categoryId', l.category_id,
               'coverPhotoId', (SELECT p.id FROM public.listing_photos p
                                 WHERE p.listing_id = l.id AND p.exif_stripped
                                 ORDER BY p.display_order
                                 LIMIT 1),
               'photosSoon', l.photos_soon,
               'priceMode', l.price_mode,
               'priceAmount', l.price_amount,
               'priceCurrency', l.price_currency,
               'pricePeriod', l.price_period,
               'priceBp', l.price_bp,
               'priceNegotiable', l.price_negotiable,
               'priceUnit', l.price_unit,
               'priceUnitText', l.price_unit_text,
               -- D173 2 — the "Price reduced" record while its 14 days stand.
               'priceWas', CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END,
               'reserved', l.reserved_at IS NOT NULL,
               'publishedFirstAt', l.published_first_at,
               'publishedAt', l.published_at,
               'renewedAt', l.renewed_at,
               'expiresAt', l.expires_at,
               -- The days an ad has left (live) or keeps while closed: whole days, rounded up; null with no end date.
               'daysLeft', CASE WHEN l.status IN ('active','reduced') AND l.expires_at IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM (l.expires_at - now())) / 86400))::integer END,
               'daysKept', CASE WHEN l.status = 'closed' AND l.kept_remaining IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM l.kept_remaining) / 86400))::integer END,
               'soldAt', l.sold_at,
               -- Bundle 16 turn 3b (call H) — the word a sold ad takes: Rented or Filled when its category says so.
               'soldWord', coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                                 WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                       FROM public.categories c WHERE c.id = l.category_id), 'sold'),
               'createdAt', l.created_at,
               'updatedAt', l.updated_at,
               -- A removed ad's latest staff reason (seller_notices, which the seller already reads).
               'removedReason', CASE WHEN l.status = 'removed' THEN
                                  (SELECT sn.reason FROM public.seller_notices sn
                                    WHERE sn.listing_id = l.id AND sn.seller_id = v_uid AND sn.kind = 'admin_remove'
                                    ORDER BY sn.created_at DESC
                                    LIMIT 1) END),
           'group', CASE l.status
               WHEN 'active' THEN 'live'      WHEN 'reduced' THEN 'live'
               WHEN 'screening' THEN 'review' WHEN 'held' THEN 'review'
               WHEN 'rejected' THEN 'attention' WHEN 'removed' THEN 'attention'
               WHEN 'closed' THEN 'closed'    WHEN 'expired' THEN 'closed'
               WHEN 'sold' THEN 'sold'        WHEN 'draft' THEN 'drafts'
             END,
           -- A closed ad reopens to the live status it was closed from (transition_listing takes exactly that one).
           'resumeStatus', l.resume_status,
           'countryCode', coalesce(loc.country_code, l.home_country_code),
           -- D174 3, D175 2 — the admin's renew setting, so the page offers Renew only when it is allowed.
           'renewAllowed', coalesce(v_policy.renew_allowed, false),
           'renewDays', v_policy.renew_days)
    INTO v_out
    FROM public.listings l
    LEFT JOIN public.locations loc ON loc.id = l.location_id
   WHERE l.id = p_listing_id AND l.seller_id = v_uid
     AND l.deleted_at IS NULL;

  -- One answer for "not yours" and "not there".
  IF v_out IS NULL THEN RAISE EXCEPTION 'not your listing'; END IF;
  RETURN v_out;
END $function$;
REVOKE ALL ON FUNCTION public.my_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing(uuid) TO service_role;

-- ===== D — proofs =====
DO $proof$
DECLARE
  v_src text;
  v_md5 text;
BEGIN
  -- P1. Headers kept.
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.feed_page(uuid, uuid, jsonb, integer)'::regprocedure
                    AND prosecdef AND provolatile = 's' AND proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'B19T6 P1: feed_page header is not as before';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.my_listings(text, integer, integer, text, uuid, text)'::regprocedure
                    AND prosecdef AND provolatile = 's' AND proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'B19T6 P1: my_listings header is not as before';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.my_listing(uuid)'::regprocedure
                    AND prosecdef AND provolatile = 's' AND proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'B19T6 P1: my_listing header is not as before';
  END IF;

  -- P2. Grants as before.
  IF NOT has_function_privilege('anon', 'public.feed_page(uuid, uuid, jsonb, integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.feed_page(uuid, uuid, jsonb, integer)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.my_listings(text, integer, integer, text, uuid, text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.my_listings(text, integer, integer, text, uuid, text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.my_listing(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.my_listing(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19T6 P2: a grant is not as before';
  END IF;

  -- P3. Each body is the previous body plus its inserted line(s), nothing else.
  SELECT replace(prosrc, chr(13), '') INTO v_src FROM pg_proc WHERE oid = 'public.feed_page(uuid, uuid, jsonb, integer)'::regprocedure;
  IF v_src NOT LIKE '%''publicId'', v_rec.public_id,%' OR v_src NOT LIKE '%l.public_id, l.title, l.price_amount,%' THEN
    RAISE EXCEPTION 'B19T6 P3: feed_page does not carry the public id';
  END IF;
  v_md5 := md5(replace(replace(v_src, '        ''publicId'', v_rec.public_id,' || chr(10), ''), 'l.public_id, l.title,', 'l.title,'));
  IF v_md5 <> 'bb4ce97d7eeb47f8271c97e055e071f2' THEN
    RAISE EXCEPTION 'B19T6 P3: feed_page body differs from 20261015023155 beyond the insertion (md5 %)', v_md5;
  END IF;
  SELECT replace(prosrc, chr(13), '') INTO v_src FROM pg_proc WHERE oid = 'public.my_listings(text, integer, integer, text, uuid, text)'::regprocedure;
  IF v_src NOT LIKE '%''publicId'', l.public_id,%' THEN
    RAISE EXCEPTION 'B19T6 P3: my_listings does not carry the public id';
  END IF;
  v_md5 := md5(replace(v_src, '               ''publicId'', l.public_id,' || chr(10), ''));
  IF v_md5 <> 'a83c2bd9f15b608e75b4c1893b5ac320' THEN
    RAISE EXCEPTION 'B19T6 P3: my_listings body differs from 20261015071455 beyond the insertion (md5 %)', v_md5;
  END IF;
  SELECT replace(prosrc, chr(13), '') INTO v_src FROM pg_proc WHERE oid = 'public.my_listing(uuid)'::regprocedure;
  IF v_src NOT LIKE '%''publicId'', l.public_id,%' THEN
    RAISE EXCEPTION 'B19T6 P3: my_listing does not carry the public id';
  END IF;
  v_md5 := md5(replace(v_src, '               ''publicId'', l.public_id,' || chr(10), ''));
  IF v_md5 <> '6ec24960451f1436c82f87596058365b' THEN
    RAISE EXCEPTION 'B19T6 P3: my_listing body differs from 20261015012743 beyond the insertion (md5 %)', v_md5;
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018140000') ON CONFLICT (version) DO NOTHING;
