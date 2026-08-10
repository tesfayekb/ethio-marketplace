-- Phase A2 — listing_locations: multi-location advertising within ONE country (DEC-013, F2)

CREATE TABLE IF NOT EXISTS public.listing_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  location_id uuid NOT NULL REFERENCES public.locations(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (listing_id, location_id)
);

CREATE INDEX IF NOT EXISTS listing_locations_listing_id_idx ON public.listing_locations (listing_id);
CREATE INDEX IF NOT EXISTS listing_locations_location_id_idx ON public.listing_locations (location_id);

GRANT SELECT ON public.listing_locations TO anon, authenticated;
GRANT INSERT, DELETE ON public.listing_locations TO authenticated;
GRANT ALL ON public.listing_locations TO service_role;

ALTER TABLE public.listing_locations ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- Single-country law. No bypass: enforced in the table trigger, not in policy.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.listing_locations_single_country()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_country  char(2);
  v_active   boolean;
  v_listing  char(2);
  v_other    char(2);
BEGIN
  SELECT country_code, is_active INTO v_country, v_active
    FROM public.locations WHERE id = NEW.location_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown location'; END IF;
  IF v_active IS NOT TRUE THEN RAISE EXCEPTION 'location is not active'; END IF;

  SELECT home_country_code INTO v_listing
    FROM public.listings WHERE id = NEW.listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF upper(v_listing) <> upper(v_country) THEN
    RAISE EXCEPTION 'listing locations must share one country';
  END IF;

  SELECT l.country_code INTO v_other
    FROM public.listing_locations ll
    JOIN public.locations l ON l.id = ll.location_id
   WHERE ll.listing_id = NEW.listing_id
     AND ll.id IS DISTINCT FROM NEW.id
   LIMIT 1;
  IF v_other IS NOT NULL AND upper(v_other) <> upper(v_country) THEN
    RAISE EXCEPTION 'listing locations must share one country';
  END IF;

  RETURN NEW;
END; $$;

REVOKE ALL ON FUNCTION public.listing_locations_single_country() FROM PUBLIC;

DROP TRIGGER IF EXISTS listing_locations_single_country ON public.listing_locations;
CREATE TRIGGER listing_locations_single_country
  BEFORE INSERT OR UPDATE ON public.listing_locations
  FOR EACH ROW EXECUTE FUNCTION public.listing_locations_single_country();

-- ---------------------------------------------------------------------------
-- RLS. Public-visibility predicate FIRST so anon short-circuits before
-- has_permission() is ever evaluated.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS listing_locations_read ON public.listing_locations;
CREATE POLICY listing_locations_read ON public.listing_locations
  FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.listings l
     WHERE l.id = listing_locations.listing_id
       AND (l.status = 'active'
            OR l.seller_id = auth.uid()
            OR public.has_permission(auth.uid(), 'listings', 'view'))
  ));

DROP POLICY IF EXISTS listing_locations_owner_insert ON public.listing_locations;
CREATE POLICY listing_locations_owner_insert ON public.listing_locations
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.listings l
     WHERE l.id = listing_locations.listing_id
       AND l.seller_id = auth.uid()
       AND l.status IN ('draft', 'active', 'expired')
  ));

DROP POLICY IF EXISTS listing_locations_owner_delete ON public.listing_locations;
CREATE POLICY listing_locations_owner_delete ON public.listing_locations
  FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.listings l
     WHERE l.id = listing_locations.listing_id
       AND l.seller_id = auth.uid()
       AND l.status IN ('draft', 'active', 'expired')
  ));

-- ---------------------------------------------------------------------------
-- In-migration proofs P1–P4. All fixtures created here and removed here;
-- expected failures are caught in BEGIN/EXCEPTION sub-blocks (which roll back
-- only the failed statement), and a final assertion proves the table is empty.
-- ---------------------------------------------------------------------------
DO $proof$
DECLARE
  v_user uuid; v_user_scratch boolean := false;
  v_cat uuid; v_et1 uuid; v_et2 uuid; v_us uuid; v_inactive uuid;
  v_listing uuid; v_n int; v_raised boolean;
BEGIN
  SELECT id INTO v_user FROM auth.users LIMIT 1;
  IF v_user IS NULL THEN
    v_user := gen_random_uuid(); v_user_scratch := true;
    INSERT INTO auth.users (id, instance_id, aud, role, email, created_at, updated_at)
      VALUES (v_user, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
              'a2-proof-' || v_user || '@example.invalid', now(), now());
  END IF;

  SELECT id INTO v_cat FROM public.categories WHERE is_active LIMIT 1;
  SELECT id INTO v_et1 FROM public.locations WHERE country_code='ET' AND is_active ORDER BY id LIMIT 1;
  SELECT id INTO v_et2 FROM public.locations WHERE country_code='ET' AND is_active AND id <> v_et1 ORDER BY id LIMIT 1;
  SELECT id INTO v_us  FROM public.locations WHERE country_code='US' AND is_active ORDER BY id LIMIT 1;

  v_inactive := gen_random_uuid();
  INSERT INTO public.locations (id, parent_id, level, country_code, name_en, slug, is_active)
    VALUES (v_inactive, v_et1, 'city', 'ET', 'A2 Proof Scratch', 'a2-proof-scratch-'||v_inactive, false);

  v_listing := gen_random_uuid();
  INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description,
                               price_mode, status, home_country_code)
    VALUES (v_listing, v_user, v_cat, v_et1, 'A2 proof', 'A2 proof', 'contact', 'draft', 'ET');

  -- P1 same-country accept
  INSERT INTO public.listing_locations (listing_id, location_id) VALUES (v_listing, v_et1);
  INSERT INTO public.listing_locations (listing_id, location_id) VALUES (v_listing, v_et2);
  SELECT count(*) INTO v_n FROM public.listing_locations WHERE listing_id = v_listing;
  IF v_n <> 2 THEN RAISE EXCEPTION 'P1 FAILED: expected 2 rows, got %', v_n; END IF;
  RAISE NOTICE 'P1 PASS: same-country multi-location accepted (2 rows)';

  -- P2 cross-country deny
  v_raised := false;
  BEGIN
    INSERT INTO public.listing_locations (listing_id, location_id) VALUES (v_listing, v_us);
  EXCEPTION WHEN OTHERS THEN
    v_raised := true;
    IF position('must share one country' in SQLERRM) = 0 THEN
      RAISE EXCEPTION 'P2 FAILED: wrong error %', SQLERRM;
    END IF;
    RAISE NOTICE 'P2 PASS: cross-country denied (%)', SQLERRM;
  END;
  IF NOT v_raised THEN RAISE EXCEPTION 'P2 FAILED: cross-country insert succeeded'; END IF;

  -- P3 inactive-location deny
  v_raised := false;
  BEGIN
    INSERT INTO public.listing_locations (listing_id, location_id) VALUES (v_listing, v_inactive);
  EXCEPTION WHEN OTHERS THEN
    v_raised := true;
    IF position('not active' in SQLERRM) = 0 THEN
      RAISE EXCEPTION 'P3 FAILED: wrong error %', SQLERRM;
    END IF;
    RAISE NOTICE 'P3 PASS: inactive location denied (%)', SQLERRM;
  END;
  IF NOT v_raised THEN RAISE EXCEPTION 'P3 FAILED: inactive insert succeeded'; END IF;

  -- P4 cascade
  DELETE FROM public.listings WHERE id = v_listing;
  SELECT count(*) INTO v_n FROM public.listing_locations WHERE listing_id = v_listing;
  IF v_n <> 0 THEN RAISE EXCEPTION 'P4 FAILED: % orphan rows', v_n; END IF;
  RAISE NOTICE 'P4 PASS: cascade removed all listing_locations rows';

  -- cleanup
  DELETE FROM public.locations WHERE id = v_inactive;
  IF v_user_scratch THEN DELETE FROM auth.users WHERE id = v_user; END IF;

  SELECT count(*) INTO v_n FROM public.listing_locations;
  IF v_n <> 0 THEN RAISE EXCEPTION 'CLEANUP FAILED: listing_locations not empty (%)', v_n; END IF;
  RAISE NOTICE 'CLEANUP OK: listing_locations empty';
END $proof$;
