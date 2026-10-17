-- Bundle 19 turn 16 (2026-10-17). Tier A. D201 §12 and INC-702 — M8: THE SELLER'S ADS BY HIS PUBLIC KEY, AND THE
-- PERSONAL-DATA RULE ON AN AD'S HISTORY AND ON THE NOTICES TO ITS SELLER.
-- e2e-areas: ad-page, feed, admin-listings, my-listings
-- A. seller_feed_page(p_seller_key text, p_after jsonb, p_size integer) — NEW, born closed, EXECUTE to anon and
--    authenticated (a public read, named in scripts/public-surface-allowlist.txt): the key is the seller's alias
--    lower-cased (never an id); an unknown key, a seller who is not active, or a key outside [a-z0-9_]{1,60} answers
--    'seller_feed_page: unknownSeller'; the seller's ads in feed_page's order and public predicate (the feed index's
--    all-categories / everywhere row of each listing; live, or sold within 30 days), feed_page's card shape and cursor
--    (one step), plus {seller: {alias, businessName (a business only), memberSince}}. feed_page itself is unchanged.
-- B. INC-702 — listing_revisions and seller_notices name a seller (personal data, Knowledge E3) and carry no
--    home_country_code: the column (REFERENCES countries), filled for the rows already there from user_directory, and
--    ONE BEFORE INSERT trigger function fill_seller_home_country() on both tables (every writing door covered, none
--    redeclared); born closed (no browser role may execute it).
-- C. Proofs P1–P5, RAISE EXCEPTION on any failure (a clean apply is the pass): the door's header, body by fingerprint
--    (DEC-190) and grants; the door refused for a malformed key; the columns and their reference; the trigger
--    function's header, body by fingerprint and closed grants; the two triggers in place. No proof reads or writes a
--    real row (G27); the behaviour is proven by the door tests of this turn with scratch users; the backfill is read
--    back after the apply.
-- D. The mark 20261018210000.
-- Applied on ethio-prod by the executor's migration tool on save (DEC-188); the operator applies the saved file on
-- ethio-staging and reads back the mark. The two ALTERs take a short lock on small tables.

-- ===== A — seller_feed_page =====
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
       AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'))
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

-- ===== B — INC-702: the column, filled, and one trigger =====
ALTER TABLE public.listing_revisions
  ADD COLUMN IF NOT EXISTS home_country_code character(2) REFERENCES public.countries(code);
UPDATE public.listing_revisions t
   SET home_country_code = d.home_country_code
  FROM public.user_directory d
 WHERE d.user_id = t.seller_id
   AND t.home_country_code IS NULL;
ALTER TABLE public.seller_notices
  ADD COLUMN IF NOT EXISTS home_country_code character(2) REFERENCES public.countries(code);
UPDATE public.seller_notices t
   SET home_country_code = d.home_country_code
  FROM public.user_directory d
 WHERE d.user_id = t.seller_id
   AND t.home_country_code IS NULL;

CREATE OR REPLACE FUNCTION public.fill_seller_home_country()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  -- INC-702 — a row naming a seller carries his home country (Knowledge E3), from user_directory, unless the writer
  -- gave one. One trigger for every writing door of the two tables.
  IF NEW.home_country_code IS NULL THEN
    SELECT d.home_country_code INTO NEW.home_country_code
      FROM public.user_directory d
     WHERE d.user_id = NEW.seller_id;
  END IF;
  RETURN NEW;
END $fn$;
REVOKE ALL ON FUNCTION public.fill_seller_home_country() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.fill_seller_home_country() TO service_role;

DROP TRIGGER IF EXISTS listing_revisions_home_country ON public.listing_revisions;
CREATE TRIGGER listing_revisions_home_country
  BEFORE INSERT ON public.listing_revisions
  FOR EACH ROW EXECUTE FUNCTION public.fill_seller_home_country();
DROP TRIGGER IF EXISTS seller_notices_home_country ON public.seller_notices;
CREATE TRIGGER seller_notices_home_country
  BEFORE INSERT ON public.seller_notices
  FOR EACH ROW EXECUTE FUNCTION public.fill_seller_home_country();

-- ===== C — proofs =====
DO $proof$
DECLARE
  v_md5 text;
  v_vol "char";
  v_def boolean;
  v_cfg text;
  v_err text;
  v_t   text;
BEGIN
  -- P1. The door: body by fingerprint, header, grants.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef,
         coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_vol, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.seller_feed_page(text, jsonb, integer)'::regprocedure;
  IF v_md5 <> '574286ce47962d859902bdadfece0b2a' THEN
    RAISE EXCEPTION 'B19M8 P1: seller_feed_page body is not the one written (fingerprint %)', v_md5;
  END IF;
  IF v_vol <> 's' OR NOT v_def OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M8 P1: seller_feed_page header is not as written (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  IF NOT has_function_privilege('anon', 'public.seller_feed_page(text, jsonb, integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.seller_feed_page(text, jsonb, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19M8 P1: the grants are not as written';
  END IF;
  -- P2. A malformed key is refused before any read.
  BEGIN
    PERFORM public.seller_feed_page('not a key!', NULL, 20);
    RAISE EXCEPTION 'B19M8 P2: the door answered a malformed key';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT;
    IF v_err <> 'seller_feed_page: unknownSeller' THEN RAISE; END IF;
  END;
  -- P3. The two columns, each referencing countries(code).
  FOREACH v_t IN ARRAY ARRAY['listing_revisions', 'seller_notices'] LOOP
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                    WHERE table_schema = 'public' AND table_name = v_t AND column_name = 'home_country_code'
                      AND data_type = 'character' AND character_maximum_length = 2) THEN
      RAISE EXCEPTION 'B19M8 P3: %.home_country_code is missing or not char(2)', v_t;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint c
                    WHERE c.conrelid = format('public.%I', v_t)::regclass AND c.contype = 'f'
                      AND c.confrelid = 'public.countries'::regclass
                      AND pg_get_constraintdef(c.oid) LIKE 'FOREIGN KEY (home_country_code)%') THEN
      RAISE EXCEPTION 'B19M8 P3: %.home_country_code does not reference countries', v_t;
    END IF;
  END LOOP;
  -- P4. The trigger function: body by fingerprint, header, closed to the browser roles.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.fill_seller_home_country()'::regprocedure;
  IF v_md5 <> '4f267457a9c0127e40b849da10f4cbc5' THEN
    RAISE EXCEPTION 'B19M8 P4: fill_seller_home_country body is not the one written (fingerprint %)', v_md5;
  END IF;
  IF NOT v_def OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M8 P4: fill_seller_home_country header is not as written';
  END IF;
  IF has_function_privilege('anon', 'public.fill_seller_home_country()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.fill_seller_home_country()', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19M8 P4: fill_seller_home_country is executable by a browser role';
  END IF;
  -- P5. The two triggers, BEFORE INSERT FOR EACH ROW, enabled.
  FOREACH v_t IN ARRAY ARRAY['listing_revisions', 'seller_notices'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_trigger g
                    WHERE g.tgrelid = format('public.%I', v_t)::regclass
                      AND g.tgname = v_t || '_home_country'
                      AND g.tgfoid = 'public.fill_seller_home_country()'::regprocedure
                      AND g.tgenabled = 'O'
                      AND (g.tgtype & 1) = 1 AND (g.tgtype & 2) = 2 AND (g.tgtype & 4) = 4) THEN
      RAISE EXCEPTION 'B19M8 P5: the trigger on % is not as written', v_t;
    END IF;
  END LOOP;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018210000') ON CONFLICT (version) DO NOTHING;
