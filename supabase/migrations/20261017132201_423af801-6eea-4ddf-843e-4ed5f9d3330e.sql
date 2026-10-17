-- Bundle 19 turn 14 (2026-10-17). Tier A. INC-701 — M7: THE SAVED LIST'S NEXT PAGE STARTS AFTER THE LAST CARD SHOWN.
-- e2e-areas: ad-page, account
-- my_saved_listings (M3a, mark 20261018170000) built its cursor from the row it fetched BEYOND the page, and the next
-- page reads the rows strictly below the cursor — so the first ad of every next page was never shown (AP-24 on run
-- #988: three saved, page 1 two cards, page 2 none). The door is redeclared WHOLE from its live definition with one
-- change: the cursor names the last card of the page. Header, argument list, answer shape and every other line unchanged.
-- Proofs P1–P3, RAISE EXCEPTION on any failure (a clean apply is the pass): the body by fingerprint (DEC-190) with its
-- header (STABLE, SECURITY DEFINER, search_path); the grants; refused with no caller. The paging itself is proven by
-- AP-24 with scratch users (G27). The mark 20261018200000.
-- Applied on ethio-prod by the executor's migration tool on save (DEC-188); the operator applies the saved file on
-- ethio-staging and reads back the mark. No table touched.

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
           (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days')) AS available,
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

-- ===== proofs =====
DO $proof$
DECLARE
  v_md5 text;
  v_vol "char";
  v_def boolean;
  v_cfg text;
  v_err text;
BEGIN
  -- P1. The body by fingerprint, the header as before.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef,
         coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_vol, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.my_saved_listings(jsonb, integer)'::regprocedure;
  IF v_md5 <> '7e5deb2d2ee28080f40a3d279f8a4e1d' THEN
    RAISE EXCEPTION 'B19M7 P1: my_saved_listings body is not the one written (fingerprint %)', v_md5;
  END IF;
  IF v_vol <> 's' OR NOT v_def OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M7 P1: my_saved_listings header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  -- P2. The grants.
  IF has_function_privilege('anon', 'public.my_saved_listings(jsonb, integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.my_saved_listings(jsonb, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19M7 P2: the grants are not as written';
  END IF;
  -- P3. No caller is refused at the first gate.
  BEGIN
    PERFORM public.my_saved_listings(NULL, 1);
    RAISE EXCEPTION 'B19M7 P3: my_saved_listings answered with no caller';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT;
    IF v_err <> 'not authenticated' THEN RAISE; END IF;
  END;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018200000') ON CONFLICT (version) DO NOTHING;
