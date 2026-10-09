-- E2b (bundle 10, the feed engine): the read door. feed_page returns one page of cards for a category (or all) and a place (or everywhere), in D108's order — premium, then featured, then regular, newest first in each — from the chosen place outward (the widening ladder: the chosen place, then each parent, then everywhere, stopping at the first step that holds at least 8 listings; the chosen place's listings always come first). Continue-after-last paging by cursor. Spec: docs/governance/feed-engine-spec.md.
-- e2e-areas: feed

CREATE FUNCTION public.feed_page(
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

  -- The widest step read: the first step that holds at least 8 listings, else everywhere.
  v_last := cardinality(v_steps);
  FOR v_s IN 1 .. cardinality(v_steps) LOOP
    IF (SELECT count(*) FROM (
          SELECT 1 FROM public.feed_index f
           WHERE f.category_key = v_cat AND f.place_key = v_steps[v_s]
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
             loc.name_en AS location_name_en, loc.name_am AS location_name_am
        FROM public.feed_index f
        JOIN public.listings l ON l.id = f.listing_id AND l.status = 'active'
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
COMMENT ON FUNCTION public.feed_page(uuid, uuid, jsonb, integer) IS
  'The public feed''s read door (bundle 10 E2b): at most 50 cards of active listings with the card''s public fields only (no seller), in D108''s order from the chosen place outward, and the cursor of the next page. Reads feed_index (closed to browsers) as its owner.';

-- Proofs on scratch rows only (a proof cannot create a listing: listings.seller_id references auth.users),
-- so these prove the input rules, the ladder and the privileges; the order and paging are proven by the route tests.
DO $proof$
DECLARE
  v_tag     text := replace(gen_random_uuid()::text, '-', '');
  v_cc      text;
  v_country uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_dead    uuid;
  v_r       jsonb;
  v_err     text;
  v_want    text;
BEGIN
  BEGIN
    SELECT s.c INTO v_cc
      FROM unnest(ARRAY['AA', 'ZZ']
           || ARRAY(SELECT 'Q' || chr(g) FROM generate_series(ascii('M'), ascii('Z')) g)
           || ARRAY(SELECT 'X' || chr(g) FROM generate_series(ascii('A'), ascii('Z')) g)) AS s(c)
     WHERE NOT EXISTS (SELECT 1 FROM public.countries k WHERE k.code = s.c)
     ORDER BY s.c
     LIMIT 1;
    IF v_cc IS NULL THEN
      RAISE EXCEPTION 'E2b proof setup: no free user-assigned country code';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_cc, 'e2e-mig-feed ' || v_cc, false);
    SELECT l.id INTO STRICT v_country
      FROM public.locations l
     WHERE l.level = 'country' AND l.country_code = v_cc AND l.name_en = 'e2e-mig-feed ' || v_cc;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
      VALUES (v_country, 'region', v_cc, 'e2e-mig-feed region', 'e2e-mig-feed-r-' || v_tag, true, 'admin')
      RETURNING id INTO v_region;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
      VALUES (v_region, 'city', v_cc, 'e2e-mig-feed city', 'e2e-mig-feed-c-' || v_tag, true, 'admin', 9.03, 38.74)
      RETURNING id INTO v_city;
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
      VALUES ('e2e-mig-feed-p-' || v_tag, 'e2e-mig-feed P', true, true, false, 999999) RETURNING id INTO v_cat;
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
      VALUES ('e2e-mig-feed-d-' || v_tag, 'e2e-mig-feed D', false, true, false, 999999) RETURNING id INTO v_dead;

    -- P1: an empty scratch branch gives an empty page; the ladder is city, region, country, everywhere.
    v_r := public.feed_page(v_cat, v_city, NULL, 20);
    IF jsonb_array_length(v_r->'cards') <> 0 OR v_r->'next' <> 'null'::jsonb
       OR v_r->'ladder' <> jsonb_build_array(v_city, v_region, v_country, '00000000-0000-0000-0000-000000000000'::uuid) THEN
      RAISE EXCEPTION 'E2b P1: the empty page or its ladder differs: %', v_r;
    END IF;
    -- P2: everywhere is a one-step ladder.
    v_r := public.feed_page(v_cat, NULL, NULL, 20);
    IF v_r->'ladder' <> jsonb_build_array('00000000-0000-0000-0000-000000000000'::uuid) THEN
      RAISE EXCEPTION 'E2b P2: the everywhere ladder differs: %', v_r->'ladder';
    END IF;
    -- P3: refusals, each by its own name.
    FOREACH v_err IN ARRAY ARRAY['badSize0', 'badSize51', 'unknownCategory', 'deadCategory', 'unknownPlace', 'badCursor', 'cursorStep'] LOOP
      BEGIN
        CASE v_err
          WHEN 'badSize0' THEN PERFORM public.feed_page(v_cat, v_city, NULL, 0);
          WHEN 'badSize51' THEN PERFORM public.feed_page(v_cat, v_city, NULL, 51);
          WHEN 'unknownCategory' THEN PERFORM public.feed_page(gen_random_uuid(), v_city, NULL, 20);
          WHEN 'deadCategory' THEN PERFORM public.feed_page(v_dead, v_city, NULL, 20);
          WHEN 'unknownPlace' THEN PERFORM public.feed_page(v_cat, gen_random_uuid(), NULL, 20);
          WHEN 'badCursor' THEN PERFORM public.feed_page(v_cat, v_city, '{"s": "x"}'::jsonb, 20);
          WHEN 'cursorStep' THEN PERFORM public.feed_page(v_cat, v_city,
            jsonb_build_object('s', 9, 't', 0, 'p', now(), 'i', gen_random_uuid()), 20);
        END CASE;
        RAISE EXCEPTION 'E2b P3: % was not refused', v_err;
      EXCEPTION WHEN raise_exception THEN
        IF SQLERRM LIKE 'E2b P3:%' THEN
          RAISE;
        END IF;
        v_want := CASE v_err
                    WHEN 'badSize0' THEN 'feed_page: badSize'
                    WHEN 'badSize51' THEN 'feed_page: badSize'
                    WHEN 'unknownCategory' THEN 'feed_page: unknownCategory'
                    WHEN 'deadCategory' THEN 'feed_page: unknownCategory'
                    WHEN 'unknownPlace' THEN 'feed_page: unknownPlace'
                    ELSE 'feed_page: badCursor'
                  END;
        IF SQLERRM <> v_want THEN
          RAISE EXCEPTION 'E2b P3: % was refused as "%"', v_err, SQLERRM;
        END IF;
      END;
    END LOOP;

    RAISE EXCEPTION USING ERRCODE = 'P0099', MESSAGE = 'e2e-mig-feed-e2b-rollback';
  EXCEPTION WHEN SQLSTATE 'P0099' THEN
    IF SQLERRM <> 'e2e-mig-feed-e2b-rollback' THEN
      RAISE;
    END IF;
  END;

  -- P4: the browser roles may call the read door, and still cannot read the index.
  IF NOT has_function_privilege('anon', 'public.feed_page(uuid,uuid,jsonb,integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.feed_page(uuid,uuid,jsonb,integer)', 'EXECUTE')
     OR has_table_privilege('anon', 'public.feed_index', 'SELECT')
     OR has_table_privilege('authenticated', 'public.feed_index', 'SELECT') THEN
    RAISE EXCEPTION 'E2b P4: the read door''s privileges differ';
  END IF;
  -- P5: header facts.
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.feed_page(uuid,uuid,jsonb,integer)'::regprocedure
                  AND p.prosecdef AND p.provolatile = 's' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E2b P5: feed_page header facts differ';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261009190000') ON CONFLICT (version) DO NOTHING;
