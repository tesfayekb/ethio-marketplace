-- N1b-2c M3a (INC-977): the seller page and the owner's line read the held state.
-- Each function is redeclared whole from its live pg_get_functiondef (md5-checked at build; argument list
-- unchanged; no DROP); only the lines marked N1b-2c change, by computed insertion:
-- 1. seller_feed_page: the shown name comes from seller_public_alias; a held name answers unknownSeller,
--    the same not-found as an unknown name (R5). The lookup by the lower-cased key is unchanged.
-- 2. my_seller_line: adds under_review (any 'imitates' row on the name subject; no text condition, INC-986).

CREATE OR REPLACE FUNCTION public.seller_feed_page(p_seller_key text, p_after jsonb DEFAULT NULL::jsonb, p_size integer DEFAULT 20)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  SELECT p.user_id, p.business_name, p.seller_type, p.created_at
    INTO v_seller, v_business, v_type, v_since
    FROM public.profiles p
   WHERE lower(p.seller_alias) = v_key
     AND p.account_status = 'active';
  IF v_seller IS NULL THEN
    RAISE EXCEPTION 'seller_feed_page: unknownSeller';
  END IF;
  -- N1b-2c (INC-977, R5): the shown name comes from the one helper; a held name ('imitates') answers
  -- exactly as an unknown name does, for every caller, the owner included.
  v_alias := public.seller_public_alias(v_seller);
  IF v_alias IS NULL THEN
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
END $function$
;
REVOKE ALL ON FUNCTION public.seller_feed_page(text, jsonb, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.seller_feed_page(text, jsonb, integer) TO anon, authenticated;
GRANT ALL ON FUNCTION public.seller_feed_page(text, jsonb, integer) TO service_role;

CREATE OR REPLACE FUNCTION public.my_seller_line()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_p   public.profiles%ROWTYPE;
  v_prev text;
  v_last timestamptz;
  v_corr timestamptz;
  v_review boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_p FROM public.profiles WHERE user_id = v_uid;
  SELECT h.alias INTO v_prev FROM public.alias_history h
   WHERE h.user_id = v_uid AND h.released_at IS NOT NULL
     AND h.released_at > now() - interval '365 days'
     AND h.alias_fold IS DISTINCT FROM public.name_fold(v_p.seller_alias)
   ORDER BY h.released_at DESC LIMIT 1;
  SELECT max(h.taken_at) INTO v_last FROM public.alias_history h WHERE h.user_id = v_uid;
  IF v_last IS NOT NULL AND now() - v_last < interval '24 hours' THEN
    v_corr := v_last + interval '24 hours';
  END IF;
  -- N1b-2c (INC-977): the owner keeps their own name and learns it is held; the same fail-closed
  -- test as seller_public_alias (any 'imitates' row on the name subject, no text condition, INC-986).
  v_review := EXISTS (SELECT 1 FROM public.name_checks c
                       WHERE c.profile_id = v_uid AND c.subject = 'alias' AND c.state = 'imitates');
  RETURN jsonb_build_object('alias', v_p.seller_alias, 'previous_alias', v_prev,
                            'member_since', v_p.created_at,
                            'next_change_at', public.alias_next_change_at(v_uid),
                            'correction_until', v_corr,
                            'under_review', v_review);
END $function$
;
REVOKE ALL ON FUNCTION public.my_seller_line() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_seller_line() TO authenticated;
GRANT ALL ON FUNCTION public.my_seller_line() TO service_role;

-- Proof (INC-980): its own scratch e2e-n1b2 seller (v_u) only, the legacy mixed-case alias shape included (INC-986); rolled back whole on the sentinel.
DO $proof$
DECLARE
  v_hex  text := replace(gen_random_uuid()::text, '-', '');
  v_tag  text := 'e2e-n1b2-' || substr(v_hex, 1, 12);
  v_u    uuid := gen_random_uuid();
  v_a    text := 'qz' || translate(substr(v_hex, 1, 10), '0123456789', 'ghijkmnopr');
  v_mixed text;
  v_lang text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
  v_r    jsonb;
  v_unk_msg text;
  v_unk_st  text;
  v_msg  text;
  v_st   text;
BEGIN
 BEGIN
  INSERT INTO auth.users(id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_u, v_tag || '@example.invalid', '{}', 'authenticated', 'authenticated', now(), now());
  INSERT INTO public.legal_acceptances(user_id, version_id, language, method)
  SELECT u, v.id, v_lang, v_tag FROM public.legal_versions v, unnest(ARRAY[v_u]) u
   WHERE v.status = 'published' AND v.effective_at <= now();
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_u, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u::text, true);
  v_r := public.save_posting_identity(p_alias => v_a);
  IF (v_r->>'ok')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'SPA proof setup: save %', v_r; END IF;

  -- The not-found an unknown name gets: its message and its state.
  BEGIN PERFORM public.seller_feed_page('qq' || substr(v_hex, 13, 12)); RAISE EXCEPTION 'SPA-3 unknown found';
  EXCEPTION WHEN OTHERS THEN v_unk_msg := SQLERRM; v_unk_st := SQLSTATE; END;
  IF v_unk_msg <> 'seller_feed_page: unknownSeller' THEN RAISE EXCEPTION 'SPA-3 unknown: %', v_unk_msg; END IF;

  -- SPA-3a: 'unchecked' is found, with its name.
  IF public.seller_feed_page(v_a)->'seller'->>'alias' IS DISTINCT FROM v_a THEN RAISE EXCEPTION 'SPA-3a unchecked'; END IF;
  -- SPA-3b: 'clean' is found; SPA-6b: the owner's line is not under review.
  PERFORM public.name_check_mark(v_u, 'alias', v_a, 'clean');
  IF public.seller_feed_page(v_a)->'seller'->>'alias' IS DISTINCT FROM v_a THEN RAISE EXCEPTION 'SPA-3b clean'; END IF;
  v_r := public.my_seller_line();
  IF v_r->>'alias' IS DISTINCT FROM v_a OR v_r->'under_review' IS DISTINCT FROM 'false'::jsonb THEN RAISE EXCEPTION 'SPA-6b %', v_r; END IF;

  -- SPA-3c: 'imitates' answers exactly as an unknown name, by any key case.
  PERFORM public.name_check_mark(v_u, 'alias', v_a, 'imitates');
  BEGIN PERFORM public.seller_feed_page(v_a); RAISE EXCEPTION 'SPA-3c held found';
  EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM; v_st := SQLSTATE; END;
  IF v_msg IS DISTINCT FROM v_unk_msg OR v_st IS DISTINCT FROM v_unk_st THEN RAISE EXCEPTION 'SPA-3c answer: %', v_msg; END IF;
  BEGIN PERFORM public.seller_feed_page(upper(v_a)); RAISE EXCEPTION 'SPA-3c held found upper';
  EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM; END;
  IF v_msg IS DISTINCT FROM v_unk_msg THEN RAISE EXCEPTION 'SPA-3c upper: %', v_msg; END IF;
  -- SPA-6a: the owner keeps the name and is told it is under review.
  v_r := public.my_seller_line();
  IF v_r->>'alias' IS DISTINCT FROM v_a OR v_r->'under_review' IS DISTINCT FROM 'true'::jsonb THEN RAISE EXCEPTION 'SPA-6a %', v_r; END IF;

  -- SPA-3d / SPA-6c: the legacy mixed-case alias, held on the lower-cased text — not found; the owner sees it as stored.
  v_mixed := upper(substr(v_a, 1, 1)) || substr(v_a, 2);
  UPDATE public.profiles SET seller_alias = v_mixed WHERE user_id = v_u;
  BEGIN PERFORM public.seller_feed_page(v_a); RAISE EXCEPTION 'SPA-3d held found';
  EXCEPTION WHEN OTHERS THEN v_msg := SQLERRM; END;
  IF v_msg IS DISTINCT FROM v_unk_msg THEN RAISE EXCEPTION 'SPA-3d: %', v_msg; END IF;
  v_r := public.my_seller_line();
  IF v_r->>'alias' IS DISTINCT FROM v_mixed OR v_r->'under_review' IS DISTINCT FROM 'true'::jsonb THEN RAISE EXCEPTION 'SPA-6c %', v_r; END IF;

  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);

  -- SPA-3e: definitions and closers read back.
  IF position('seller_public_alias(v_seller)' IN pg_get_functiondef('public.seller_feed_page(text, jsonb, integer)'::regprocedure)) = 0
     OR position('p.seller_alias,' IN pg_get_functiondef('public.seller_feed_page(text, jsonb, integer)'::regprocedure)) > 0
     OR position('''under_review''' IN pg_get_functiondef('public.my_seller_line()'::regprocedure)) = 0
  THEN RAISE EXCEPTION 'SPA-3e definitions'; END IF;
  IF NOT has_function_privilege('anon', 'public.seller_feed_page(text, jsonb, integer)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.my_seller_line()', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.my_seller_line()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.seller_public_alias(uuid, text)', 'EXECUTE')
  THEN RAISE EXCEPTION 'SPA-3f acl'; END IF;
  RAISE EXCEPTION 'M3a proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M3a proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u)
    OR EXISTS (SELECT 1 FROM public.alias_history WHERE user_id = v_u) THEN
   RAISE EXCEPTION 'M3a rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES ('20261030020000');