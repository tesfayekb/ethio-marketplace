-- ============================================================================
-- P2-c — Listings core + lifecycle + the screening seam
-- IDEMPOTENT: guarded DDL throughout (standing rule adopted this task).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- a. public.listings — the marketplace's central object (REQ-019)
--    RATEABLE SEAM (REQ-011): listings.id is the rateable-interaction anchor.
--    Future contact / mark-complete / ratings rows reference listings.id.
--    Nothing here blocks that; no ratings table is created this phase.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.listings (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id       uuid NOT NULL REFERENCES public.categories(id),
  location_id       uuid NOT NULL REFERENCES public.locations(id),
  title             text NOT NULL,
  description       text NOT NULL,
  -- Structured attributes (REQ-024), validated against category_attributes
  -- inside submit_listing (the only write path).
  attributes        jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- REQ-018 pricing. numeric, never float (Rule E4).
  price_amount      numeric(12,2),
  price_currency    char(3),
  price_mode        text NOT NULL DEFAULT 'fixed',
  -- REQ-022 state machine.
  status            text NOT NULL DEFAULT 'draft',
  -- REQ-012 / DEC-008 partition seam: listings ARE user data.
  home_country_code char(2) NOT NULL REFERENCES public.countries(code),
  published_at      timestamptz,
  expires_at        timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE public.listings ADD CONSTRAINT listings_price_mode_check
    CHECK (price_mode IN ('fixed','negotiable','free','contact'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE public.listings ADD CONSTRAINT listings_status_check
    CHECK (status IN ('draft','active','expired','sold','removed'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE public.listings ADD CONSTRAINT listings_price_pair_check
    CHECK ((price_amount IS NULL) = (price_currency IS NULL));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE public.listings ADD CONSTRAINT listings_free_has_no_price_check
    CHECK (price_mode <> 'free' OR price_amount IS NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

COMMENT ON TABLE public.listings IS
  'Central marketplace object. Writes ONLY via public.submit_listing / public.transition_listing (REQ-021 chokepoint). listings.id is the rateable-interaction anchor (REQ-011).';

DROP TRIGGER IF EXISTS update_listings_updated_at ON public.listings;
CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS listings_active_idx      ON public.listings (status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS listings_seller_idx      ON public.listings (seller_id);
CREATE INDEX IF NOT EXISTS listings_category_idx    ON public.listings (category_id);
CREATE INDEX IF NOT EXISTS listings_location_idx    ON public.listings (location_id);
CREATE INDEX IF NOT EXISTS listings_published_idx   ON public.listings (published_at DESC);
CREATE INDEX IF NOT EXISTS listings_country_idx     ON public.listings (home_country_code);

-- ---------------------------------------------------------------------------
-- b. public.listing_photos
--    !!! DEC-009 GATE !!!  exif_stripped is the hard gate: a photo is NOT
--    surfaceable to anyone but its owner until the P2-c-photos strip pipeline
--    sets exif_stripped = true. The display layer MUST filter on it, and the
--    public read policy below already enforces it. Do not surface photos with
--    exif_stripped = false anywhere, ever.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.listing_photos (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id    uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  storage_path  text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  exif_stripped boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE public.listing_photos
    ADD CONSTRAINT listing_photos_order_unique UNIQUE (listing_id, display_order);
EXCEPTION WHEN duplicate_table THEN NULL; WHEN duplicate_object THEN NULL; END $$;

COMMENT ON COLUMN public.listing_photos.exif_stripped IS
  'DEC-009 gate. FALSE = raw upload, may carry GPS/EXIF; NEVER surfaced. The P2-c-photos strip pipeline flips it to TRUE, which is the only state the display layer may show.';

CREATE INDEX IF NOT EXISTS listing_photos_listing_idx ON public.listing_photos (listing_id);

-- ---------------------------------------------------------------------------
-- d. THE SCREENING SEAM — the only write paths to listings
-- ---------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.submit_listing(uuid, uuid, uuid, text, text, jsonb, numeric, char, text, text, char);
CREATE OR REPLACE FUNCTION public.submit_listing(
  p_seller_id         uuid,
  p_category_id       uuid,
  p_location_id       uuid,
  p_title             text,
  p_description       text,
  p_home_country_code char(2),
  p_attributes        jsonb   DEFAULT '{}'::jsonb,
  p_price_amount      numeric DEFAULT NULL,
  p_price_currency    char(3) DEFAULT NULL,
  p_price_mode        text    DEFAULT 'fixed',
  p_status            text    DEFAULT 'draft',
  p_listing_id        uuid    DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_cat        public.categories%ROWTYPE;
  v_attr       record;
  v_id         uuid;
  v_prev       public.listings%ROWTYPE;
  v_expires    timestamptz;
  v_published  timestamptz;
BEGIN
  -- Ownership: a user submits only their own listing.
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF auth.uid() <> p_seller_id THEN RAISE EXCEPTION 'not your listing'; END IF;

  IF p_status NOT IN ('draft','active') THEN
    RAISE EXCEPTION 'submit_listing accepts only draft or active; use transition_listing';
  END IF;

  SELECT * INTO v_cat FROM public.categories WHERE id = p_category_id AND is_active;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown or inactive category'; END IF;

  IF NOT EXISTS (SELECT 1 FROM public.locations WHERE id = p_location_id AND is_active) THEN
    RAISE EXCEPTION 'unknown or inactive location';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.countries WHERE code = upper(p_home_country_code)) THEN
    RAISE EXCEPTION 'unknown country';
  END IF;

  -- REQ-018: a category with price disabled may not carry a price.
  IF NOT v_cat.price_enabled AND p_price_amount IS NOT NULL THEN
    RAISE EXCEPTION 'category does not allow a price';
  END IF;

  -- REQ-024 attribute validation (see docs/features/listings.md, D-017):
  -- required-present + type/options conformance. Deep per-type coercion rules
  -- and cross-field rules land with the attribute builder at P2-d.
  IF jsonb_typeof(COALESCE(p_attributes,'{}'::jsonb)) <> 'object' THEN
    RAISE EXCEPTION 'attributes must be a json object';
  END IF;
  FOR v_attr IN
    SELECT * FROM public.category_attributes WHERE category_id = p_category_id
  LOOP
    IF v_attr.is_required AND NOT (p_attributes ? v_attr.attr_key) THEN
      RAISE EXCEPTION 'missing required attribute: %', v_attr.attr_key;
    END IF;
    IF p_attributes ? v_attr.attr_key AND jsonb_typeof(p_attributes -> v_attr.attr_key) <> 'null' THEN
      IF v_attr.attr_type = 'number' AND jsonb_typeof(p_attributes -> v_attr.attr_key) <> 'number' THEN
        RAISE EXCEPTION 'attribute % must be a number', v_attr.attr_key;
      ELSIF v_attr.attr_type = 'boolean' AND jsonb_typeof(p_attributes -> v_attr.attr_key) <> 'boolean' THEN
        RAISE EXCEPTION 'attribute % must be a boolean', v_attr.attr_key;
      ELSIF v_attr.attr_type IN ('text','select') AND jsonb_typeof(p_attributes -> v_attr.attr_key) <> 'string' THEN
        RAISE EXCEPTION 'attribute % must be a string', v_attr.attr_key;
      END IF;
      IF v_attr.attr_type = 'select' AND v_attr.options IS NOT NULL THEN
        IF NOT (v_attr.options @> jsonb_build_array(p_attributes -> v_attr.attr_key)) THEN
          RAISE EXCEPTION 'attribute % is not one of the allowed options', v_attr.attr_key;
        END IF;
      END IF;
    END IF;
  END LOOP;

  -- ==== REQ-021 SCREENING GATEWAY LANDS HERE (P2-d) ====================
  -- Pass-through stub. The AI screening call will be made at this point,
  -- BEFORE any row is written, and may reject or quarantine the submission.
  -- Because this function is the ONLY write path, screening slots in with
  -- zero new write paths to audit.
  -- =====================================================================

  IF p_listing_id IS NOT NULL THEN
    SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
    IF v_prev.seller_id <> auth.uid() THEN RAISE EXCEPTION 'not your listing'; END IF;
    IF v_prev.status IN ('sold','removed') THEN
      RAISE EXCEPTION 'listing is closed and cannot be edited';
    END IF;
  END IF;

  -- REQ-022: expiry computed from the category, at publish time.
  -- active→active is a renewal and resets the window.
  IF p_status = 'active' THEN
    v_expires   := now() + make_interval(days => v_cat.expiry_days);
    v_published := COALESCE(v_prev.published_at, now());
  ELSE
    v_expires   := v_prev.expires_at;
    v_published := v_prev.published_at;
  END IF;

  IF p_listing_id IS NULL THEN
    INSERT INTO public.listings (
      seller_id, category_id, location_id, title, description, attributes,
      price_amount, price_currency, price_mode, status, home_country_code,
      published_at, expires_at
    ) VALUES (
      p_seller_id, p_category_id, p_location_id, p_title, p_description,
      COALESCE(p_attributes,'{}'::jsonb), p_price_amount, p_price_currency,
      p_price_mode, p_status, upper(p_home_country_code), v_published, v_expires
    ) RETURNING id INTO v_id;
  ELSE
    UPDATE public.listings SET
      category_id = p_category_id,
      location_id = p_location_id,
      title = p_title,
      description = p_description,
      attributes = COALESCE(p_attributes,'{}'::jsonb),
      price_amount = p_price_amount,
      price_currency = p_price_currency,
      price_mode = p_price_mode,
      status = p_status,
      home_country_code = upper(p_home_country_code),
      published_at = v_published,
      expires_at = v_expires
    WHERE id = p_listing_id
    RETURNING id INTO v_id;
  END IF;

  RETURN v_id;
END; $$;

COMMENT ON FUNCTION public.submit_listing IS
  'THE write path for listing create/edit (REQ-021 chokepoint). The screening gateway fills the marked stub at P2-d.';

DROP FUNCTION IF EXISTS public.transition_listing(uuid, text);
CREATE OR REPLACE FUNCTION public.transition_listing(
  p_listing_id uuid,
  p_new_status text
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_row public.listings%ROWTYPE;
  v_ok  boolean := false;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> auth.uid() THEN RAISE EXCEPTION 'not your listing'; END IF;

  -- §7 anti-state-scatter: the legal state machine lives here and nowhere else.
  --   draft   -> active | removed
  --   active  -> active (renewal) | expired | sold | removed
  --   expired -> active (relist)  | removed
  --   sold    -> removed
  --   removed -> (terminal)
  v_ok := CASE v_row.status
    WHEN 'draft'   THEN p_new_status IN ('active','removed')
    WHEN 'active'  THEN p_new_status IN ('active','expired','sold','removed')
    WHEN 'expired' THEN p_new_status IN ('active','removed')
    WHEN 'sold'    THEN p_new_status IN ('removed')
    ELSE false
  END;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'illegal transition: % -> %', v_row.status, p_new_status;
  END IF;

  IF p_new_status = 'active' THEN
    UPDATE public.listings SET
      status = 'active',
      published_at = COALESCE(published_at, now()),
      expires_at = now() + make_interval(days => (
        SELECT expiry_days FROM public.categories WHERE id = v_row.category_id))
    WHERE id = p_listing_id;
  ELSE
    UPDATE public.listings SET status = p_new_status WHERE id = p_listing_id;
  END IF;
END; $$;

COMMENT ON FUNCTION public.transition_listing IS
  'THE status-mutation path. Enforces the REQ-022 state machine; rejects illegal transitions. active->active is a renewal and resets expiry.';

-- ---------------------------------------------------------------------------
-- e. Expiry sweeper — AUTHORED, NOT SCHEDULED.
--    FOLLOW-UP (named): wire pg_cron or an external scheduler to call this.
--    Idempotent; safe to run repeatedly.
-- ---------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.expire_stale_listings();
CREATE OR REPLACE FUNCTION public.expire_stale_listings()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_count integer;
BEGIN
  UPDATE public.listings
     SET status = 'expired'
   WHERE status = 'active'
     AND expires_at IS NOT NULL
     AND expires_at < now();
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END; $$;

COMMENT ON FUNCTION public.expire_stale_listings IS
  'REQ-022 expiry sweeper. Authored at P2-c; its schedule (pg_cron / external) is a named follow-up.';

-- Function ACLs: seam fns to authenticated only; sweeper to service_role only.
REVOKE ALL ON FUNCTION public.submit_listing(uuid, uuid, uuid, text, text, char, jsonb, numeric, char, text, text, uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.expire_stale_listings() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_listing(uuid, uuid, uuid, text, text, char, jsonb, numeric, char, text, text, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.expire_stale_listings() TO service_role;

-- ---------------------------------------------------------------------------
-- f. RLS — deny-by-default at the table; the seam functions are the gate.
-- ---------------------------------------------------------------------------
GRANT SELECT ON public.listings TO anon, authenticated;
GRANT ALL ON public.listings TO service_role;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS listings_public_read ON public.listings;
CREATE POLICY listings_public_read ON public.listings
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

DROP POLICY IF EXISTS listings_seller_read ON public.listings;
CREATE POLICY listings_seller_read ON public.listings
  FOR SELECT TO authenticated
  USING (auth.uid() = seller_id);

-- No INSERT/UPDATE/DELETE policy and no write grants: every mutation must go
-- through submit_listing / transition_listing.

GRANT SELECT ON public.listing_photos TO anon, authenticated;
GRANT ALL ON public.listing_photos TO service_role;
ALTER TABLE public.listing_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS listing_photos_public_read ON public.listing_photos;
CREATE POLICY listing_photos_public_read ON public.listing_photos
  FOR SELECT TO anon, authenticated
  USING (
    exif_stripped
    AND EXISTS (
      SELECT 1 FROM public.listings l
       WHERE l.id = listing_photos.listing_id AND l.status = 'active'
    )
  );

DROP POLICY IF EXISTS listing_photos_seller_read ON public.listing_photos;
CREATE POLICY listing_photos_seller_read ON public.listing_photos
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.listings l
       WHERE l.id = listing_photos.listing_id AND l.seller_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- g. Storage RLS for the private 'listing-photos' bucket.
--    Path-prefix ownership: objects live at <user_id>/<listing_id>/<file>.
--    (Documented simplification — the per-listing predicate is enforced by the
--    app writing the path; the prefix guarantees cross-user isolation.)
--    NO public read on the bucket; reads are proxied by the app after the strip.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS listing_photos_object_insert ON storage.objects;
CREATE POLICY listing_photos_object_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'listing-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS listing_photos_object_owner_read ON storage.objects;
CREATE POLICY listing_photos_object_owner_read ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'listing-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS listing_photos_object_public_read ON storage.objects;
CREATE POLICY listing_photos_object_public_read ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (
    bucket_id = 'listing-photos'
    AND EXISTS (
      SELECT 1
        FROM public.listing_photos p
        JOIN public.listings l ON l.id = p.listing_id
       WHERE p.storage_path = storage.objects.name
         AND p.exif_stripped
         AND l.status = 'active'
    )
  );

DROP POLICY IF EXISTS listing_photos_object_owner_delete ON storage.objects;
CREATE POLICY listing_photos_object_owner_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'listing-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );