-- Bundle 19 turn 12 (2026-10-17). Tier A. D201 §0 rule 4, §8 — M3 PART a OF TWO: SAVE (THE HEART) — THE TABLE, THE DIAL, THE FOUR DOORS.
-- e2e-areas: ad-page, my-listings, account
-- A signed-in buyer saves an ad with one tap (free in v1, logged-in only — the operator's Q4 ruling of 2026-10-16); the
-- count is public ("Saved by N", hidden at 0 for a buyer) and the owner sees it; Account › Saved lists the saved ads.
-- A. saved_listings(user_id, listing_id, created_at), PRIMARY KEY (user_id, listing_id); RLS on, one deny policy, no
--    client privilege — the doors read and write it as the definer (listing_counters' shape).
-- B. The dial save (200 a day).
-- C. Four doors, born closed, EXECUTE to authenticated, each keyed by the ad's PUBLIC id: save_listing (a publicly readable
--    ad only — live, or sold within 30 days — idempotent, rate_gate('save') on a NEW row only, answers {ok, saved, count});
--    unsave_listing (the caller's own row, {ok, saved:false, count}); listing_saved (the heart's own state, boolean);
--    my_saved_listings(p_after, p_size) (the caller's rows newest first as feed cards with savedAt and available, a
--    cursor {a: savedAt, i: listingId}, p_size 1..50). Part b: public_listing_json and listing_counts gain the saves.
-- BODY PROOFS (DEC-190): a body is proven by its FINGERPRINT — md5 of the text with carriage returns and `--` comments
-- removed and, outside single-quoted literals, every run of whitespace collapsed to one space — so spacing a typed
-- submission may change never refuses the apply, while any changed token or literal does; headers proven as before.
-- Proofs P1–P5, RAISE EXCEPTION on any failure (a clean apply is the pass): the table's RLS, policy and privileges; the
-- dial; the four bodies by fingerprint with their headers; the grants; each door refused with no caller. The behaviour
-- is proven by the door tests of this turn with scratch users (G27). The mark 20261018170000.
-- Applied on ethio-prod by the executor's migration tool (DEC-188), part a then part b, nothing between them; the
-- operator applies both saved files on ethio-staging in order and reads back the two marks. No lock on a hot table.

-- ===== A — saved_listings (the platform's order for a new table: CREATE → GRANT → RLS → POLICY) =====
CREATE TABLE IF NOT EXISTS public.saved_listings (
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, listing_id)
);
CREATE INDEX IF NOT EXISTS saved_listings_listing_idx ON public.saved_listings (listing_id);
-- No client reads or writes the rows: the doors do, as the definer. The birth grants are revoked; only service_role holds
-- privilege; the one policy states the deny for the browser roles.
REVOKE ALL ON public.saved_listings FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.saved_listings TO service_role;
ALTER TABLE public.saved_listings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS saved_listings_no_client ON public.saved_listings;
CREATE POLICY saved_listings_no_client ON public.saved_listings FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- ===== B — the dial =====
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('save', 200, 86400)
  ON CONFLICT (action) DO NOTHING;

-- ===== C — the doors =====
CREATE OR REPLACE FUNCTION public.save_listing(p_public_id text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
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
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'));
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
    INSERT INTO public.saved_listings (user_id, listing_id) VALUES (v_uid, v_id) ON CONFLICT DO NOTHING;
  END IF;
  SELECT count(*) INTO v_count FROM public.saved_listings s WHERE s.listing_id = v_id;
  RETURN jsonb_build_object('ok', true, 'saved', true, 'count', v_count);
END $$;
REVOKE ALL ON FUNCTION public.save_listing(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_listing(text) TO authenticated;
GRANT ALL ON FUNCTION public.save_listing(text) TO service_role;

CREATE OR REPLACE FUNCTION public.unsave_listing(p_public_id text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_id    uuid;
  v_count bigint;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;
  -- Any ad the caller saved may be unsaved, public or not (the Saved page's Remove on a grey card).
  SELECT l.id INTO v_id FROM public.listings l WHERE l.public_id = p_public_id;
  IF v_id IS NULL THEN RAISE EXCEPTION 'listingNotAvailable'; END IF;
  DELETE FROM public.saved_listings s WHERE s.user_id = v_uid AND s.listing_id = v_id;
  SELECT count(*) INTO v_count FROM public.saved_listings s WHERE s.listing_id = v_id;
  RETURN jsonb_build_object('ok', true, 'saved', false, 'count', v_count);
END $$;
REVOKE ALL ON FUNCTION public.unsave_listing(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.unsave_listing(text) TO authenticated;
GRANT ALL ON FUNCTION public.unsave_listing(text) TO service_role;

CREATE OR REPLACE FUNCTION public.listing_saved(p_public_id text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN RETURN false; END IF;
  RETURN EXISTS (SELECT 1 FROM public.saved_listings s
                   JOIN public.listings l ON l.id = s.listing_id
                  WHERE s.user_id = v_uid AND l.public_id = p_public_id);
END $$;
REVOKE ALL ON FUNCTION public.listing_saved(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.listing_saved(text) TO authenticated;
GRANT ALL ON FUNCTION public.listing_saved(text) TO service_role;

CREATE OR REPLACE FUNCTION public.my_saved_listings(p_after jsonb DEFAULT NULL, p_size integer DEFAULT 20)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_c_at  timestamptz;
  v_c_id  uuid;
  v_cards jsonb := '[]'::jsonb;
  v_rec   record;
  v_n     integer := 0;
  v_next  jsonb := NULL;
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
    IF v_n = p_size THEN
      v_next := jsonb_build_object('a', v_rec.saved_at, 'i', v_rec.listing_id);
      EXIT;
    END IF;
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
END $$;
REVOKE ALL ON FUNCTION public.my_saved_listings(jsonb, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_saved_listings(jsonb, integer) TO authenticated;
GRANT ALL ON FUNCTION public.my_saved_listings(jsonb, integer) TO service_role;


-- ===== D — proofs =====
DO $proof$
DECLARE
  v_fp text; v_vol "char"; v_def boolean; v_cfg text; v_err text;
BEGIN
  -- P1. The table: RLS on, the deny policy, no client privilege.
  IF NOT EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
                  WHERE n.nspname = 'public' AND c.relname = 'saved_listings' AND c.relrowsecurity) THEN
    RAISE EXCEPTION 'B19M3a P1: saved_listings has no row security';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'saved_listings'
                    AND policyname = 'saved_listings_no_client') THEN
    RAISE EXCEPTION 'B19M3a P1: the deny policy is missing';
  END IF;
  IF has_table_privilege('anon', 'public.saved_listings', 'SELECT')
     OR has_table_privilege('authenticated', 'public.saved_listings', 'SELECT')
     OR has_table_privilege('authenticated', 'public.saved_listings', 'INSERT')
     OR has_table_privilege('authenticated', 'public.saved_listings', 'DELETE') THEN
    RAISE EXCEPTION 'B19M3a P1: a browser role reaches saved_listings';
  END IF;
  -- P2. The dial.
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'save' AND window_seconds = 86400) THEN
    RAISE EXCEPTION 'B19M3a P2: the dial save is missing';
  END IF;
  -- P3. The four bodies landed (fingerprint), with their headers.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.save_listing(text)'::regprocedure;
  IF v_fp <> 'e44509dc202efd13c78c1d96e364c0e4' THEN RAISE EXCEPTION 'B19M3a P3: save_listing body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 'v' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M3a P3: save_listing header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.unsave_listing(text)'::regprocedure;
  IF v_fp <> '39fc89acd8392340ce8e8ea079259497' THEN RAISE EXCEPTION 'B19M3a P3: unsave_listing body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 'v' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M3a P3: unsave_listing header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.listing_saved(text)'::regprocedure;
  IF v_fp <> '0d10956eed9c35fa6a388a6393ebe17a' THEN RAISE EXCEPTION 'B19M3a P3: listing_saved body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M3a P3: listing_saved header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.my_saved_listings(jsonb, integer)'::regprocedure;
  IF v_fp <> '904d58d7133476ab1a2a36d01144ed43' THEN RAISE EXCEPTION 'B19M3a P3: my_saved_listings body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M3a P3: my_saved_listings header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  -- P4. The grants.
  IF has_function_privilege('anon', 'public.save_listing(text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.unsave_listing(text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.listing_saved(text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.my_saved_listings(jsonb, integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.save_listing(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.unsave_listing(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.listing_saved(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.my_saved_listings(jsonb, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19M3a P4: the grants are not as written';
  END IF;
  -- P5. Each door with no caller is refused at its first gate, before any read.
  BEGIN
    PERFORM public.save_listing('zzzzzzzzzz');
    RAISE EXCEPTION 'B19M3a P5: save_listing answered with no caller';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT; IF v_err <> 'not authenticated' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.unsave_listing('zzzzzzzzzz');
    RAISE EXCEPTION 'B19M3a P5: unsave_listing answered with no caller';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT; IF v_err <> 'not authenticated' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.listing_saved('zzzzzzzzzz');
    RAISE EXCEPTION 'B19M3a P5: listing_saved answered with no caller';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT; IF v_err <> 'not authenticated' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.my_saved_listings(NULL, 20);
    RAISE EXCEPTION 'B19M3a P5: my_saved_listings answered with no caller';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT; IF v_err <> 'not authenticated' THEN RAISE; END IF;
  END;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018170000') ON CONFLICT (version) DO NOTHING;