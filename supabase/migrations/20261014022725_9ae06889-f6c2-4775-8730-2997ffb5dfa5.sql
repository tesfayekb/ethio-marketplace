-- Bundle 13 (photos), turn 6 (2026-10-13). Tier A. D158 item 3 — photos held for staff while photo screening is off.
--
-- The operator's answers (D158, 2026-10-13): when photo screening is off, photos are "saved, never shown to buyers, until
-- staff approve"; posting keeps working. How staff approve (2026-10-13 21:4x local): "Approve with the ad" — every new ad
-- already passes Admin › Screening, and approving the ad approves its held photos.
--
-- A. listing_photos.unscreened (NOT NULL, default false): a photo stored while photo screening was off.
-- B. The public read (`listing_photos_public_read`) leaves a held photo out, so no buyer, signed in or not, is ever given
--    its row or a link to it. The seller's and staff's own reads are unchanged: they see it.
-- C. register_listing_photo gains `p_unscreened` (default false), redeclared whole from its live definition
--    (20260919054044; census (d)); the argument list changes, so the old signature is dropped and its REVOKE and GRANT
--    are restated for the new one.
-- D. feed_page, redeclared whole from its live definition (20261013200740; census (d)): a held photo is never a card's
--    cover.
-- E. Approving the ad approves its photos: a trigger on listings, when a PERSON moves an ad from screening (or a staff
--    hold) to live, clears `unscreened` on its photos and writes one audit row 'listing.photos_approved' with how many.
--    transition_listing lets a signed-in person make that move only as a reviewer with a fresh second factor; a service
--    caller (no session — the screening gateway of REQ-021 when it is built) leaves the photos held, because the rule is
--    "until staff approve".
-- F. admin_set_ai_feature, redeclared whole from its live definition (20261013184636; census (d)), without the
--    `screeningStaysOn` refusal: photo screening may now be switched off. Its budget still never switches it off.
-- G. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): structure, bodies and grants. Their behaviour is
--    proven on scratch rows by SC-18 and SC-19 (e2e/admin-screening.spec.ts); no proof here touches a real row or
--    auth.users.

-- ===== A — the column =====
ALTER TABLE public.listing_photos ADD COLUMN IF NOT EXISTS unscreened boolean NOT NULL DEFAULT false;
COMMENT ON COLUMN public.listing_photos.unscreened IS
  'D158 — stored while photo screening was off: shown to no buyer until staff approve the ad (cleared by the approval).';

-- ===== B — the public read leaves a held photo out =====
DROP POLICY IF EXISTS listing_photos_public_read ON public.listing_photos;
CREATE POLICY listing_photos_public_read ON public.listing_photos
  FOR SELECT TO anon, authenticated
  USING (
    exif_stripped
    AND NOT unscreened
    AND EXISTS (
      SELECT 1 FROM public.listings l
       WHERE l.id = listing_photos.listing_id AND l.status = 'active'
    )
  );

-- ===== C — register_listing_photo, whole, with p_unscreened =====
DROP FUNCTION IF EXISTS public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer);

CREATE OR REPLACE FUNCTION public.register_listing_photo(
  p_listing_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_seller uuid; v_cap smallint; v_count int;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'register_listing_photo is called by the photo route only';
  END IF;
  SELECT seller_id INTO v_seller FROM public.listings WHERE id = p_listing_id;
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
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, p_photo_id),
    updated_at = now() WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order);
END $$;

REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean) TO service_role;

-- ===== D — feed_page, whole: a held photo is never a cover =====
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
             loc.name_en AS location_name_en, loc.name_am AS location_name_am,
             -- INC-606 — the card's photo: the listing's first stripped photo (the cover, D154).
             -- D158 (bundle 13 turn 6) — a photo held for staff is never a buyer's cover.
             (SELECT p.id FROM public.listing_photos p
               WHERE p.listing_id = f.listing_id AND p.exif_stripped AND NOT p.unscreened
               ORDER BY p.display_order
               LIMIT 1) AS cover_photo_id
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
        'coverPhotoId', v_rec.cover_photo_id,
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

-- ===== E — approving the ad approves its photos =====
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
  UPDATE public.listing_photos SET unscreened = false
   WHERE listing_id = NEW.id AND unscreened;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (auth.uid(), 'listing.photos_approved', 'listing', NEW.id::text,
            jsonb_build_object('count', v_n, 'from', OLD.status, 'to', NEW.status));
  END IF;
  RETURN NULL;
END $fn$;

REVOKE ALL ON FUNCTION public.listing_photos_approved_with_ad() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS listing_photos_approved_with_ad ON public.listings;
CREATE TRIGGER listing_photos_approved_with_ad
  AFTER UPDATE OF status ON public.listings
  FOR EACH ROW
  WHEN (OLD.status IN ('screening', 'held') AND NEW.status IN ('active', 'reduced'))
  EXECUTE FUNCTION public.listing_photos_approved_with_ad();

-- ===== F — admin_set_ai_feature, whole: photo screening may be switched off =====
CREATE OR REPLACE FUNCTION public.admin_set_ai_feature(
  p_feature text,
  p_enabled boolean,
  p_monthly_budget_cents integer,
  p_unit_cost_microusd integer
)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v        public.ai_features%ROWTYPE;
  v_before jsonb;
  v_first  date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_month  timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
  v_spent  bigint;
  v_level  smallint := 0;
  v_on     boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'services', 'manage') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('services', 'manage');
  IF p_enabled IS NULL THEN RAISE EXCEPTION 'badValue:enabled'; END IF;
  IF p_unit_cost_microusd IS NULL OR p_unit_cost_microusd < 0 OR p_unit_cost_microusd > 10000000 THEN
    RAISE EXCEPTION 'badValue:unitCost';
  END IF;
  IF p_monthly_budget_cents IS NOT NULL AND (p_monthly_budget_cents < 0 OR p_monthly_budget_cents > 100000000) THEN
    RAISE EXCEPTION 'badValue:budget';
  END IF;
  SELECT * INTO v FROM public.ai_features WHERE feature = p_feature FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownFeature'; END IF;
  -- D158 (bundle 13 turn 6) — photo screening may be switched off: new photos are then held
  -- for staff (listing_photos.unscreened) and shown to no buyer until the ad is approved.
  v_before := to_jsonb(v) - 'updated_by';
  SELECT coalesce(sum(s.cost_microusd), 0)::bigint INTO v_spent
    FROM public.ai_spend_days s
   WHERE s.feature = v.feature AND s.day >= v_first;
  IF p_monthly_budget_cents IS NOT NULL THEN
    v_level := CASE WHEN v_spent >= p_monthly_budget_cents::bigint * 10000 THEN 100
                    WHEN v_spent * 10 >= p_monthly_budget_cents::bigint * 10000 * 8 THEN 80
                    ELSE 0 END;
  END IF;
  IF p_enabled AND v_level = 100 AND v.feature <> 'photo_screen' THEN RAISE EXCEPTION 'overBudget'; END IF;
  v_on := v.enabled OR (v.off_reason = 'budget' AND v.off_at < v_month);
  UPDATE public.ai_features
     SET enabled = p_enabled,
         off_reason = CASE WHEN p_enabled THEN NULL WHEN v_on THEN 'staff' ELSE v.off_reason END,
         off_at = CASE WHEN p_enabled THEN NULL WHEN v_on THEN now() ELSE v.off_at END,
         monthly_budget_cents = p_monthly_budget_cents,
         unit_cost_microusd = p_unit_cost_microusd,
         alert_month = v_first,
         alert_level = v_level,
         updated_at = now(),
         updated_by = v_uid
   WHERE feature = v.feature
  RETURNING * INTO v;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'ai.feature_set', 'ai_feature', v.feature,
          jsonb_build_object('before', v_before, 'after', to_jsonb(v) - 'updated_by'));
  RETURN jsonb_build_object('ok', true, 'feature', v.feature, 'on', v.enabled, 'off_reason', v.off_reason,
                            'monthly_budget_cents', v.monthly_budget_cents,
                            'unit_cost_microusd', v.unit_cost_microusd, 'alert_level', v.alert_level);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) TO service_role;

-- ===== G — proofs =====
DO $proof$
DECLARE
  v_src   text;
  v_qual  text;
  v_n     integer;
BEGIN
  -- A
  SELECT count(*) INTO v_n FROM information_schema.columns
   WHERE table_schema = 'public' AND table_name = 'listing_photos' AND column_name = 'unscreened'
     AND data_type = 'boolean' AND is_nullable = 'NO' AND column_default = 'false';
  IF v_n <> 1 THEN RAISE EXCEPTION 'proof A failed: listing_photos.unscreened is not boolean NOT NULL DEFAULT false'; END IF;
  -- B
  SELECT pg_get_expr(p.polqual, p.polrelid) INTO v_qual
    FROM pg_policy p WHERE p.polname = 'listing_photos_public_read'
     AND p.polrelid = 'public.listing_photos'::regclass;
  IF v_qual IS NULL OR v_qual NOT LIKE '%NOT unscreened%' OR v_qual NOT LIKE '%exif_stripped%'
     OR v_qual NOT LIKE '%''active''%' THEN
    RAISE EXCEPTION 'proof B failed: the public read is %', coalesce(v_qual, '(missing)');
  END IF;
  -- C
  IF to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer)') IS NOT NULL
     AND EXISTS (SELECT 1 FROM pg_proc WHERE oid = to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer)')
                   AND pronargs = 6) THEN
    RAISE EXCEPTION 'proof C failed: the six-argument register_listing_photo is still there';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)'::regprocedure
     AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%coalesce(p_unscreened, false)%'
     OR v_src NOT LIKE '%register_listing_photo is called by the photo route only%' THEN
    RAISE EXCEPTION 'proof C failed: the body of register_listing_photo is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof C failed: register_listing_photo is not the service role''s alone';
  END IF;
  -- D
  SELECT prosrc INTO v_src FROM pg_proc WHERE oid = 'public.feed_page(uuid, uuid, jsonb, integer)'::regprocedure
     AND prosecdef AND provolatile = 's';
  IF v_src IS NULL OR v_src NOT LIKE '%AND p.exif_stripped AND NOT p.unscreened%'
     OR v_src NOT LIKE '%''coverPhotoId'', v_rec.cover_photo_id%' THEN
    RAISE EXCEPTION 'proof D failed: the body of feed_page is not as written';
  END IF;
  IF NOT has_function_privilege('anon', 'public.feed_page(uuid, uuid, jsonb, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof D failed: feed_page is not readable without a session';
  END IF;
  -- E
  SELECT count(*) INTO v_n FROM pg_trigger t
   WHERE t.tgrelid = 'public.listings'::regclass AND t.tgname = 'listing_photos_approved_with_ad'
     AND NOT t.tgisinternal AND t.tgenabled = 'O'
     AND pg_get_triggerdef(t.oid) LIKE '%AFTER UPDATE OF status ON public.listings FOR EACH ROW WHEN%';
  IF v_n <> 1 THEN RAISE EXCEPTION 'proof E failed: the approval trigger is missing'; END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.listing_photos_approved_with_ad()'::regprocedure AND prosecdef
     AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%IF auth.uid() IS NULL THEN%'
     OR v_src NOT LIKE '%''listing.photos_approved''%' THEN
    RAISE EXCEPTION 'proof E failed: the body of the approval trigger function is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.listing_photos_approved_with_ad()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.listing_photos_approved_with_ad()', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof E failed: the trigger function is callable by a browser role';
  END IF;
  -- F
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.admin_set_ai_feature(text, boolean, integer, integer)'::regprocedure AND prosecdef;
  IF v_src IS NULL OR v_src LIKE '%screeningStaysOn%' OR v_src NOT LIKE '%overBudget%'
     OR v_src NOT LIKE '%require_step_up_if_needed(''services'', ''manage'')%' THEN
    RAISE EXCEPTION 'proof F failed: the body of admin_set_ai_feature is not as written';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261014100000') ON CONFLICT (version) DO NOTHING;
