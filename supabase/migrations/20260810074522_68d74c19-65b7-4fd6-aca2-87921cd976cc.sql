-- Phase A2b — F10 exact-location columns + INC-067 policy split.
-- Idempotent; append-only. No PostGIS: plain doubles (REQ-003 weight discipline).

ALTER TABLE public.listing_locations
  ADD COLUMN IF NOT EXISTS lat double precision,
  ADD COLUMN IF NOT EXISTS lng double precision,
  ADD COLUMN IF NOT EXISTS map_visible boolean NOT NULL DEFAULT false;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'listing_locations_latlng_pair') THEN
    ALTER TABLE public.listing_locations
      ADD CONSTRAINT listing_locations_latlng_pair CHECK ((lat IS NULL) = (lng IS NULL));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'listing_locations_map_needs_pin') THEN
    ALTER TABLE public.listing_locations
      ADD CONSTRAINT listing_locations_map_needs_pin CHECK (NOT map_visible OR lat IS NOT NULL);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'listing_locations_latlng_range') THEN
    ALTER TABLE public.listing_locations
      ADD CONSTRAINT listing_locations_latlng_range CHECK (
        (lat IS NULL OR (lat >= -90 AND lat <= 90))
        AND (lng IS NULL OR (lng >= -180 AND lng <= 180))
      );
  END IF;
END $$;

-- Rows are now editable, so the owner needs UPDATE. The existing
-- listing_locations_single_country trigger already fires BEFORE UPDATE, so a
-- location_id change stays covered — no duplicate check here.
GRANT UPDATE ON public.listing_locations TO authenticated;

DROP POLICY IF EXISTS listing_locations_owner_update ON public.listing_locations;
CREATE POLICY listing_locations_owner_update
  ON public.listing_locations FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.listings l
     WHERE l.id = listing_id AND l.seller_id = auth.uid()
       AND l.status IN ('draft','active','expired')))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.listings l
     WHERE l.id = listing_id AND l.seller_id = auth.uid()
       AND l.status IN ('draft','active','expired')));

-- INC-067: an anon-reachable policy may never reference has_permission().
DROP POLICY IF EXISTS listing_locations_read ON public.listing_locations;

DROP POLICY IF EXISTS listing_locations_public_read ON public.listing_locations;
CREATE POLICY listing_locations_public_read
  ON public.listing_locations FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.listings l
     WHERE l.id = listing_id AND l.status = 'active'));

DROP POLICY IF EXISTS listing_locations_owner_read ON public.listing_locations;
CREATE POLICY listing_locations_owner_read
  ON public.listing_locations FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.listings l
     WHERE l.id = listing_id AND l.seller_id = auth.uid()));

DROP POLICY IF EXISTS listing_locations_admin_read ON public.listing_locations;
CREATE POLICY listing_locations_admin_read
  ON public.listing_locations FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(), 'listings', 'view'));

-- ==== In-migration proofs (self-contained, self-cleaning) ==================
DO $$
DECLARE
  v_user uuid; v_cat uuid; v_loc uuid; v_cc char(2); v_listing uuid;
  v_ok boolean; v_count int; v_bad text;
BEGIN
  SELECT id INTO v_user FROM auth.users ORDER BY created_at LIMIT 1;
  SELECT id INTO v_cat FROM public.categories WHERE is_active ORDER BY created_at LIMIT 1;
  SELECT id, country_code INTO v_loc, v_cc
    FROM public.locations WHERE is_active ORDER BY created_at LIMIT 1;
  IF v_user IS NULL OR v_cat IS NULL OR v_loc IS NULL THEN
    RAISE EXCEPTION 'A2b proofs: fixture prerequisites missing';
  END IF;

  INSERT INTO public.listings (seller_id, category_id, location_id, title, description,
                               price_mode, status, home_country_code)
  VALUES (v_user, v_cat, v_loc, 'A2b proof fixture', 'temporary', 'contact', 'draft', v_cc)
  RETURNING id INTO v_listing;

  -- P1 pin pair law
  v_ok := false;
  BEGIN
    INSERT INTO public.listing_locations (listing_id, location_id, lat)
    VALUES (v_listing, v_loc, 9.03);
  EXCEPTION WHEN check_violation THEN v_ok := true;
  END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P1 FAILED: lat without lng was accepted'; END IF;
  INSERT INTO public.listing_locations (listing_id, location_id, lat, lng)
  VALUES (v_listing, v_loc, 9.03, 38.74);
  RAISE NOTICE 'P1 OK: pair law enforced, full pin accepted';

  -- P2 map_visible law
  v_ok := false;
  BEGIN
    UPDATE public.listing_locations
       SET lat = NULL, lng = NULL, map_visible = true
     WHERE listing_id = v_listing;
  EXCEPTION WHEN check_violation THEN v_ok := true;
  END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P2 FAILED: map_visible without pin was accepted'; END IF;
  UPDATE public.listing_locations SET map_visible = true WHERE listing_id = v_listing;
  RAISE NOTICE 'P2 OK: map_visible requires a pin';

  -- P3 range law
  v_ok := false;
  BEGIN
    UPDATE public.listing_locations SET lat = 91 WHERE listing_id = v_listing;
  EXCEPTION WHEN check_violation THEN v_ok := true;
  END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P3 FAILED: lat=91 was accepted'; END IF;
  RAISE NOTICE 'P3 OK: range law enforced';

  -- P4 policy census
  SELECT count(*) INTO v_count FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'listing_locations';
  IF v_count <> 6 THEN
    RAISE EXCEPTION 'P4 FAILED: expected 6 policies, found %', v_count;
  END IF;
  SELECT string_agg(policyname, ', ') INTO v_bad FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'listing_locations'
     AND 'anon' = ANY (roles)
     AND coalesce(qual, '') || coalesce(with_check, '') ILIKE '%has_permission%';
  IF v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'P4 FAILED (INC-067): anon-reachable policy references has_permission: %', v_bad;
  END IF;
  RAISE NOTICE 'P4 OK: 6 policies, no has_permission on any anon-reachable policy';

  -- Cleanup
  DELETE FROM public.listing_locations WHERE listing_id = v_listing;
  DELETE FROM public.listings WHERE id = v_listing;
  SELECT count(*) INTO v_count FROM public.listing_locations;
  IF v_count <> 0 THEN RAISE EXCEPTION 'cleanup FAILED: % rows remain', v_count; END IF;
  RAISE NOTICE 'A2b proofs P1-P4 passed; table empty';
END $$;
