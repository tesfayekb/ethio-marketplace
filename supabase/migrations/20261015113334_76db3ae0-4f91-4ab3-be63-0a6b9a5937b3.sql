-- Bundle 16 turn 4a (2026-10-15). Tier A. D178 and D183 (the operator, 2026-10-14 and 2026-10-15) — EVERY PHOTO IS
-- JUDGED AT UPLOAD, AND ONLY A PASS IS SHOWN. A photo the screen passes with no doubt is shown at once. A photo it is
-- unsure about, one that may not show what the ad sells, one it fails (except nudity, which stays refused at upload and
-- is never stored, and a smaller copy that shows another picture), and one stored while photo screening is off, is kept
-- HIDDEN from buyers (`unscreened`) for a person, who allows it, removes it, or declines the whole ad. The ad's other
-- content stays live.
--
-- A. listing_photo_reviews (NEW): one row per photo kept hidden for a person — its label (unsure, not_right, fail,
--    held), for a fail the screen's code and its short phrase, and once a person decides, when, who and how (allowed,
--    or approved with the ad). Row security: the seller reads his own photos' rows, staff with listings:review read
--    every row, nobody else reads any; no browser role writes. Rows are written only by the doors below. A row goes with
--    its photo and with its ad (ON DELETE CASCADE): a removed photo leaves no open review.
-- B. listing_photo_review_label (NEW, caller's rights, no table read): the one rule for what the photo doors accept —
--    a review is stored hidden; its label is unsure, not_right or fail; a fail names one of the eight stored codes
--    (never nudity, never variant_mismatch: D183); a photo stored hidden with no review is `held`. Service only.
-- C. register_listing_photo, redeclared whole from its live definition (20261014084432; census (d)) with `p_review`
--    (default none): the review row. The eight-argument signature is dropped and its grants are restated for the nine.
-- D. replace_listing_photo, redeclared whole from its live definition (20261014084432; census (d)) with `p_review`.
--    The nine-argument signature is dropped and its grants are restated for the ten.
-- E. listing_photos_approved_with_ad, redeclared whole from its live definition (20261014022725; census (d)):
--    approving the ad shows only the photos held while screening was off (label held, or no review row: a photo held
--    before this migration), and marks their reviews decided; a photo the screen judged stays hidden.
-- F. admin_allow_listing_photo (NEW): listings:review with the second factor (as approving an ad); never the staff
--    member's own ad; a photo with an open review only. Shows the photo, marks its review allowed, audits
--    `listing.photo_allowed`. Removing a photo stays the existing staff Remove (admin_edit_listing, reason photo).
-- G. Backfill: every photo held today (`unscreened`, stored while screening was off) gets a `held` row.
-- H. Proofs (structure, body markers, policies, grants; RAISE EXCEPTION on any failure). No proof touches a real row or
--    auth.users. What the doors write is proven by the routes' own tests through the app's connection.

-- ===== A — listing_photo_reviews =====
CREATE TABLE IF NOT EXISTS public.listing_photo_reviews (
  photo_id    uuid PRIMARY KEY REFERENCES public.listing_photos(id) ON DELETE CASCADE,
  listing_id  uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  label       text NOT NULL CHECK (label IN ('unsure', 'not_right', 'fail', 'held')),
  code        text NULL,
  evidence    text NULL CHECK (evidence IS NULL OR char_length(evidence) <= 200),
  created_at  timestamptz NOT NULL DEFAULT now(),
  decided_at  timestamptz NULL,
  decided_by  uuid NULL,
  decision    text NULL CHECK (decision IN ('allowed', 'approved_with_ad')),
  CONSTRAINT listing_photo_reviews_code_check CHECK (
    (label = 'fail' AND code IN ('violence', 'weapon', 'drugs', 'hate_symbol', 'personal_document',
                                 'contact_in_image', 'stock_watermark', 'not_a_photo'))
    OR (label <> 'fail' AND code IS NULL)),
  CONSTRAINT listing_photo_reviews_decided_check CHECK ((decided_at IS NULL) = (decision IS NULL))
);
CREATE INDEX IF NOT EXISTS listing_photo_reviews_open_idx
  ON public.listing_photo_reviews (created_at) WHERE decided_at IS NULL;
CREATE INDEX IF NOT EXISTS listing_photo_reviews_listing_idx ON public.listing_photo_reviews (listing_id);
ALTER TABLE public.listing_photo_reviews ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.listing_photo_reviews FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.listing_photo_reviews TO authenticated;
GRANT ALL ON public.listing_photo_reviews TO service_role;
DROP POLICY IF EXISTS listing_photo_reviews_seller_read ON public.listing_photo_reviews;
CREATE POLICY listing_photo_reviews_seller_read ON public.listing_photo_reviews
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.listings l
                 WHERE l.id = listing_photo_reviews.listing_id AND l.seller_id = auth.uid()));
DROP POLICY IF EXISTS listing_photo_reviews_admin_read ON public.listing_photo_reviews;
CREATE POLICY listing_photo_reviews_admin_read ON public.listing_photo_reviews
  FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(), 'listings', 'review'));

-- ===== B — the one rule for a stored photo's review =====
CREATE OR REPLACE FUNCTION public.listing_photo_review_label(p_unscreened boolean, p_review jsonb)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $$
DECLARE v_label text; v_code text;
BEGIN
  IF p_review IS NULL OR p_review = 'null'::jsonb THEN
    -- D158 — stored hidden while photo screening is off: held for staff, approved with the ad.
    RETURN CASE WHEN coalesce(p_unscreened, false) THEN 'held' END;
  END IF;
  IF jsonb_typeof(p_review) <> 'object' THEN
    RAISE EXCEPTION 'review must be an object';
  END IF;
  IF NOT coalesce(p_unscreened, false) THEN
    RAISE EXCEPTION 'a photo kept for review is stored hidden';
  END IF;
  v_label := p_review->>'label';
  v_code := p_review->>'code';
  IF v_label IS NULL OR v_label NOT IN ('unsure', 'not_right', 'fail') THEN
    RAISE EXCEPTION 'unknown review label';
  END IF;
  -- D183 — nudity is refused at upload and never stored; a smaller copy showing another picture is
  -- refused too. A fail names one of the eight codes a person may still allow.
  IF v_label = 'fail' AND (v_code IS NULL OR v_code NOT IN ('violence', 'weapon', 'drugs', 'hate_symbol',
      'personal_document', 'contact_in_image', 'stock_watermark', 'not_a_photo')) THEN
    RAISE EXCEPTION 'a failed photo with this code is not stored';
  END IF;
  IF v_label <> 'fail' AND v_code IS NOT NULL THEN
    RAISE EXCEPTION 'only a failed photo carries a code';
  END IF;
  RETURN v_label;
END $$;

REVOKE ALL ON FUNCTION public.listing_photo_review_label(boolean, jsonb) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listing_photo_review_label(boolean, jsonb) TO service_role;

-- ===== C — register_listing_photo, whole, with p_review =====
DROP FUNCTION IF EXISTS public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[]);

CREATE OR REPLACE FUNCTION public.register_listing_photo(
  p_listing_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[],
  p_review jsonb DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_seller uuid; v_status text; v_cap smallint; v_count int; v_label text;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'register_listing_photo is called by the photo route only';
  END IF;
  -- Bundle 16 turn 4a (D178, D183) — a photo kept for a person's review is stored hidden.
  v_label := public.listing_photo_review_label(p_unscreened, p_review);
  SELECT seller_id, status INTO v_seller, v_status FROM public.listings WHERE id = p_listing_id;
  IF v_seller IS NULL THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  -- D22 — the plan's photo cap is the authority; the route's cap is a mirror.
  v_cap := public.plan_photo_cap(public.seller_plan(v_seller));
  SELECT count(*) INTO v_count FROM public.listing_photos WHERE listing_id = p_listing_id;
  IF v_count >= v_cap THEN
    RAISE EXCEPTION 'tooManyPhotos:%', v_cap;
  END IF;
  SELECT coalesce(max(display_order), -1) + 1 INTO v_order
    FROM public.listing_photos WHERE listing_id = p_listing_id;
  -- D158 (bundle 13 turn 6) — a photo stored while photo screening is off is HELD:
  -- `unscreened`, shown to no buyer until staff approve the ad.
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (coalesce(p_photo_id, gen_random_uuid()), p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false))
  RETURNING id INTO p_photo_id;
  -- D154 B3 (bundle 13 turn 10) — the screen's warnings, seen by the seller and staff only.
  IF cardinality(coalesce(p_warnings, '{}'::text[])) > 0 THEN
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (p_photo_id, p_listing_id, p_warnings);
  END IF;
  -- Bundle 16 turn 4a (D178) — the photo's review: why it is hidden, until a person decides.
  IF v_label IS NOT NULL THEN
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence)
    VALUES (p_photo_id, p_listing_id, v_label, p_review->>'code',
            left(nullif(btrim(coalesce(p_review->>'evidence', '')), ''), 200));
  END IF;
  -- D154 B5 — a photo added to a live ad is listed for staff.
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id, codes)
    VALUES (p_listing_id, 'added', p_photo_id, coalesce(p_warnings, '{}'::text[]));
  END IF;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, p_photo_id),
    updated_at = now() WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order);
END $$;

REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb) TO service_role;

-- ===== D — replace_listing_photo, whole, with p_review =====
DROP FUNCTION IF EXISTS public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[]);

CREATE OR REPLACE FUNCTION public.replace_listing_photo(
  p_listing_id uuid,
  p_old_photo_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[],
  p_review jsonb DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_cover uuid; v_status text; v_label text;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'replace_listing_photo is called by the photo route only';
  END IF;
  -- Bundle 16 turn 4a (D178, D183) — a photo kept for a person's review is stored hidden.
  v_label := public.listing_photo_review_label(p_unscreened, p_review);
  IF p_photo_id IS NULL OR p_old_photo_id IS NULL THEN
    RAISE EXCEPTION 'photo ids are required';
  END IF;
  -- One edit of an ad's photos at a time: the listing row is locked.
  SELECT status INTO v_status FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  SELECT display_order INTO v_order FROM public.listing_photos
   WHERE id = p_old_photo_id AND listing_id = p_listing_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'photoGone';
  END IF;
  UPDATE public.listings SET cover_photo_id = NULL
   WHERE id = p_listing_id AND cover_photo_id = p_old_photo_id;
  DELETE FROM public.listing_photos WHERE id = p_old_photo_id AND listing_id = p_listing_id;
  -- D158 — a photo stored while photo screening is off is HELD (`unscreened`).
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (p_photo_id, p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false));
  -- D154 B3 (bundle 13 turn 10) — the screen's warnings, seen by the seller and staff only.
  IF cardinality(coalesce(p_warnings, '{}'::text[])) > 0 THEN
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (p_photo_id, p_listing_id, p_warnings);
  END IF;
  -- Bundle 16 turn 4a (D178) — the photo's review: why it is hidden, until a person decides.
  IF v_label IS NOT NULL THEN
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence)
    VALUES (p_photo_id, p_listing_id, v_label, p_review->>'code',
            left(nullif(btrim(coalesce(p_review->>'evidence', '')), ''), 200));
  END IF;
  -- D154 B5 — a photo edited on a live ad is listed for staff.
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id, replaced_photo_id, codes)
    VALUES (p_listing_id, 'edited', p_photo_id, p_old_photo_id, coalesce(p_warnings, '{}'::text[]));
  END IF;
  SELECT id INTO v_cover FROM public.listing_photos
   WHERE listing_id = p_listing_id ORDER BY display_order LIMIT 1;
  UPDATE public.listings SET cover_photo_id = v_cover, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order,
                            'replaced', p_old_photo_id, 'cover_photo_id', v_cover);
END $$;

REVOKE ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb) TO service_role;

-- ===== E — the approval trigger's function, whole: only held photos are approved with the ad =====
CREATE OR REPLACE FUNCTION public.listing_photos_approved_with_ad()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE v_n integer;
BEGIN
  -- D158 — staff approve held photos with the ad: a person's decision only. A move with no
  -- session (a service caller) leaves them held.
  IF auth.uid() IS NULL THEN
    RETURN NULL;
  END IF;
  -- Bundle 16 turn 4a (D178) — only a photo held while photo screening was off is approved with the
  -- ad. A photo the screen judged (unsure, not right for the ad, failed) stays hidden until a person
  -- allows or removes it (admin_allow_listing_photo; Remove).
  UPDATE public.listing_photos p SET unscreened = false
   WHERE p.listing_id = NEW.id AND p.unscreened
     AND NOT EXISTS (SELECT 1 FROM public.listing_photo_reviews r
                      WHERE r.photo_id = p.id AND r.decided_at IS NULL AND r.label <> 'held');
  GET DIAGNOSTICS v_n = ROW_COUNT;
  UPDATE public.listing_photo_reviews SET decided_at = now(), decided_by = auth.uid(), decision = 'approved_with_ad'
   WHERE listing_id = NEW.id AND label = 'held' AND decided_at IS NULL;
  IF v_n > 0 THEN
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (auth.uid(), 'listing.photos_approved', 'listing', NEW.id::text,
            jsonb_build_object('count', v_n, 'from', OLD.status, 'to', NEW.status));
  END IF;
  RETURN NULL;
END $fn$;

REVOKE ALL ON FUNCTION public.listing_photos_approved_with_ad() FROM PUBLIC, anon, authenticated;

-- ===== F — admin_allow_listing_photo =====
CREATE OR REPLACE FUNCTION public.admin_allow_listing_photo(p_photo_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_listing uuid; v_seller uuid; v_label text; v_code text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  -- D178 — showing a photo the screen held back is a person's decision, made as an ad's approval is.
  PERFORM public.require_step_up_if_needed('listings', 'review');
  SELECT r.listing_id, r.label, r.code INTO v_listing, v_label, v_code
    FROM public.listing_photo_reviews r
   WHERE r.photo_id = p_photo_id AND r.decided_at IS NULL
   FOR UPDATE;
  IF v_listing IS NULL THEN
    RAISE EXCEPTION 'reviewGone';
  END IF;
  SELECT seller_id INTO v_seller FROM public.listings WHERE id = v_listing;
  IF v_seller = v_uid THEN
    RAISE EXCEPTION 'your own listing is changed the seller''s way';
  END IF;
  UPDATE public.listing_photos SET unscreened = false WHERE id = p_photo_id AND listing_id = v_listing;
  UPDATE public.listing_photo_reviews SET decided_at = now(), decided_by = v_uid, decision = 'allowed'
   WHERE photo_id = p_photo_id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'listing.photo_allowed', 'listing', v_listing::text,
          jsonb_strip_nulls(jsonb_build_object('photo', p_photo_id, 'label', v_label, 'code', v_code)));
  RETURN jsonb_build_object('ok', true, 'photo', p_photo_id, 'listing', v_listing);
END $$;

REVOKE ALL ON FUNCTION public.admin_allow_listing_photo(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_allow_listing_photo(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_allow_listing_photo(uuid) TO service_role;

-- ===== G — backfill: every photo held today is held for staff =====
INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label)
SELECT p.id, p.listing_id, 'held' FROM public.listing_photos p
 WHERE p.unscreened
ON CONFLICT (photo_id) DO NOTHING;

-- ===== H — proofs =====
DO $proof$
DECLARE
  v_src text;
  v_n   integer;
  v_m   text;
BEGIN
  -- P1 — the table: row security, its two read policies, no browser write, anon reads nothing.
  SELECT count(*) INTO v_n FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
   WHERE n.nspname = 'public' AND c.relname = 'listing_photo_reviews' AND c.relrowsecurity;
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T4a P1: listing_photo_reviews is missing or has no row security'; END IF;
  SELECT count(*) INTO v_n FROM pg_policy
   WHERE polrelid = 'public.listing_photo_reviews'::regclass AND polcmd = 'r'
     AND ((polname = 'listing_photo_reviews_seller_read'
           AND pg_get_expr(polqual, polrelid) LIKE '%seller_id = auth.uid()%')
       OR (polname = 'listing_photo_reviews_admin_read'
           AND pg_get_expr(polqual, polrelid) LIKE '%''listings''%''review''%'));
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T4a P1: the reviews table''s two read policies are not as written'; END IF;
  SELECT count(*) INTO v_n FROM pg_policy WHERE polrelid = 'public.listing_photo_reviews'::regclass;
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T4a P1: the reviews table has % policies, not 2', v_n; END IF;
  IF has_table_privilege('anon', 'public.listing_photo_reviews', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_photo_reviews', 'INSERT')
     OR has_table_privilege('authenticated', 'public.listing_photo_reviews', 'UPDATE')
     OR has_table_privilege('authenticated', 'public.listing_photo_reviews', 'DELETE') THEN
    RAISE EXCEPTION 'B16T4a P1: a browser role can read the reviews without a session, or write them';
  END IF;

  -- P2 — the label rule answers as written (no table is read).
  IF public.listing_photo_review_label(false, NULL) IS NOT NULL
     OR public.listing_photo_review_label(true, NULL) <> 'held'
     OR public.listing_photo_review_label(true, '{"label":"unsure"}') <> 'unsure'
     OR public.listing_photo_review_label(true, '{"label":"not_right"}') <> 'not_right'
     OR public.listing_photo_review_label(true, '{"label":"fail","code":"weapon","evidence":"a knife"}') <> 'fail' THEN
    RAISE EXCEPTION 'B16T4a P2: a stored review is not labelled as written';
  END IF;
  BEGIN
    PERFORM public.listing_photo_review_label(true, '{"label":"fail","code":"nudity"}');
    RAISE EXCEPTION 'B16T4a P2: a nudity fail would be stored';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_m = MESSAGE_TEXT;
    IF v_m <> 'a failed photo with this code is not stored' THEN RAISE EXCEPTION '%', v_m; END IF;
  END;
  BEGIN
    PERFORM public.listing_photo_review_label(true, '{"label":"fail","code":"variant_mismatch"}');
    RAISE EXCEPTION 'B16T4a P2: a mismatched copy would be stored';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_m = MESSAGE_TEXT;
    IF v_m <> 'a failed photo with this code is not stored' THEN RAISE EXCEPTION '%', v_m; END IF;
  END;
  BEGIN
    PERFORM public.listing_photo_review_label(false, '{"label":"unsure"}');
    RAISE EXCEPTION 'B16T4a P2: a photo under review would be shown';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_m = MESSAGE_TEXT;
    IF v_m <> 'a photo kept for review is stored hidden' THEN RAISE EXCEPTION '%', v_m; END IF;
  END;
  BEGIN
    PERFORM public.listing_photo_review_label(true, '{"label":"pass"}');
    RAISE EXCEPTION 'B16T4a P2: an unknown label would be stored';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_m = MESSAGE_TEXT;
    IF v_m <> 'unknown review label' THEN RAISE EXCEPTION '%', v_m; END IF;
  END;

  -- P3 — the photo doors: the old signatures gone, the bodies carry the rule and the row, service only.
  IF to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])') IS NOT NULL
     OR to_regprocedure('public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[])') IS NOT NULL THEN
    RAISE EXCEPTION 'B16T4a P3: an old photo door signature is still there';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%register_listing_photo is called by the photo route only%'
     OR v_src NOT LIKE '%listing_photo_review_label(p_unscreened, p_review)%'
     OR v_src NOT LIKE '%INSERT INTO public.listing_photo_reviews%'
     OR v_src NOT LIKE '%INSERT INTO public.listing_photo_warnings%' OR v_src NOT LIKE '%tooManyPhotos%' THEN
    RAISE EXCEPTION 'B16T4a P3: the body of register_listing_photo is not as written';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%replace_listing_photo is called by the photo route only%'
     OR v_src NOT LIKE '%listing_photo_review_label(p_unscreened, p_review)%'
     OR v_src NOT LIKE '%INSERT INTO public.listing_photo_reviews%'
     OR v_src NOT LIKE '%RAISE EXCEPTION ''photoGone''%' OR v_src NOT LIKE '%FOR UPDATE%' THEN
    RAISE EXCEPTION 'B16T4a P3: the body of replace_listing_photo is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.listing_photo_review_label(boolean, jsonb)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.listing_photo_review_label(boolean, jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T4a P3: a photo door or the label rule is not the service role''s alone';
  END IF;

  -- P4 — approving the ad approves only held photos.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.listing_photos_approved_with_ad()'::regprocedure
     AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%r.label <> ''held''%' OR v_src NOT LIKE '%''approved_with_ad''%'
     OR v_src NOT LIKE '%''listing.photos_approved''%' OR v_src NOT LIKE '%IF auth.uid() IS NULL THEN%' THEN
    RAISE EXCEPTION 'B16T4a P4: the body of listing_photos_approved_with_ad is not as written';
  END IF;
  SELECT count(*) INTO v_n FROM pg_trigger
   WHERE tgrelid = 'public.listings'::regclass AND tgname = 'listing_photos_approved_with_ad' AND NOT tgisinternal;
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T4a P4: the approval trigger is missing'; END IF;

  -- P5 — the staff door: a reviewer with the second factor, never his own ad, audited; signed-in callers only.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.admin_allow_listing_photo(uuid)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%has_permission(v_uid, ''listings'', ''review'')%'
     OR v_src NOT LIKE '%require_step_up_if_needed(''listings'', ''review'')%'
     OR v_src NOT LIKE '%your own listing is changed the seller''''s way%'
     OR v_src NOT LIKE '%r.decided_at IS NULL%' OR v_src NOT LIKE '%''listing.photo_allowed''%' THEN
    RAISE EXCEPTION 'B16T4a P5: the body of admin_allow_listing_photo is not as written';
  END IF;
  IF has_function_privilege('anon', 'public.admin_allow_listing_photo(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_allow_listing_photo(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T4a P5: admin_allow_listing_photo''s grants are not as written';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261016030000') ON CONFLICT (version) DO NOTHING;
