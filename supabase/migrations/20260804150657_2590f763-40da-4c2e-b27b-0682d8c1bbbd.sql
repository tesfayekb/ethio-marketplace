-- P2-a Geography: the canonical locations tree (country -> region -> city).
-- Mirrors public.countries' posture exactly: globally shared reference data,
-- public read, no write policy (admin writes via service role only).
-- Ruling: NO partition column — a diaspora user must read the active country's
-- locations, so this is a lookup like countries, not personal data.
-- Names ship as name_en/name_am columns (no translations table exists yet);
-- they migrate into the admin translation dashboard when that is built.
CREATE TABLE public.locations (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id    uuid REFERENCES public.locations(id),
  level        text NOT NULL CHECK (level IN ('country','region','city')),
  country_code char(2) NOT NULL REFERENCES public.countries(code),
  name_en      text NOT NULL,
  name_am      text,
  slug         text NOT NULL,
  center_lat   double precision,
  center_lng   double precision,
  is_active    boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  -- a country row is exactly the rootless row; region/city always have a parent
  CONSTRAINT locations_root_is_country CHECK ((level = 'country') = (parent_id IS NULL)),
  -- slug unique within a parent (root rows handled by the partial index below)
  CONSTRAINT locations_parent_slug_unique UNIQUE (parent_id, slug)
);

-- Root (country-level) slugs are globally unique; UNIQUE(parent_id, slug) does not
-- constrain NULL parents in Postgres, so a partial index carries that rule.
CREATE UNIQUE INDEX locations_root_slug_unique
  ON public.locations (slug) WHERE parent_id IS NULL;

-- country_code must equal the row's own country for country rows and the ancestor's
-- country for children. Enforced by SEED DISCIPLINE this phase: every INSERT below
-- derives country_code from its parent. A trigger enforcing ancestry is DEFERRED
-- until admin writes exist (today no role holds INSERT/UPDATE on this table).

CREATE INDEX locations_active_idx  ON public.locations (is_active) WHERE is_active;
CREATE INDEX locations_parent_idx  ON public.locations (parent_id);
CREATE INDEX locations_country_idx ON public.locations (country_code);

-- No shared updated_at trigger function exists yet in this database (census);
-- create it here, idempotently, as the project-wide helper.
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_locations_updated_at
  BEFORE UPDATE ON public.locations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Active-only visibility (apex supported_regions pattern). Inactive rows — including
-- the future "add my city" submissions awaiting admin review — are invisible to the
-- Data API entirely.
CREATE POLICY "locations_public_read"
  ON public.locations FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- No INSERT/UPDATE/DELETE policy and no write grants: deny-by-default, like countries.
GRANT SELECT ON public.locations TO anon, authenticated;

-- ---------------------------------------------------------------------------
-- Shallow seed: active markets ET + US. Major regions + a handful of seed cities.
-- NOT a gazetteer — the comprehensive world list is an admin-side static asset,
-- and the "add my city" post-flow path (later feature) covers gaps for users.
-- ---------------------------------------------------------------------------
INSERT INTO public.locations (parent_id, level, country_code, name_en, name_am, slug, center_lat, center_lng, is_active)
VALUES
  (NULL, 'country', 'ET', 'Ethiopia', 'ኢትዮጵያ', 'ethiopia', NULL, NULL, true),
  (NULL, 'country', 'US', 'United States', 'አሜሪካ', 'united-states', NULL, NULL, true);

-- ET regions
INSERT INTO public.locations (parent_id, level, country_code, name_en, name_am, slug, is_active)
SELECT c.id, 'region', c.country_code, r.name_en, r.name_am, r.slug, true
FROM public.locations c
CROSS JOIN (VALUES
  ('Addis Ababa', 'አዲስ አበባ', 'addis-ababa'),
  ('Oromia',      'ኦሮሚያ',   'oromia'),
  ('Amhara',      'አማራ',    'amhara'),
  ('Tigray',      'ትግራይ',   'tigray'),
  ('Dire Dawa',   'ድሬ ዳዋ',  'dire-dawa'),
  ('Sidama',      'ሲዳማ',    'sidama')
) AS r(name_en, name_am, slug)
WHERE c.slug = 'ethiopia' AND c.parent_id IS NULL;

-- ET cities
INSERT INTO public.locations (parent_id, level, country_code, name_en, name_am, slug, center_lat, center_lng, is_active)
SELECT p.id, 'city', p.country_code, x.name_en, x.name_am, x.slug, x.lat, x.lng, true
FROM (VALUES
  ('addis-ababa', 'Addis Ababa', 'አዲስ አበባ', 'addis-ababa',  9.0300,  38.7400),
  ('oromia',      'Adama',       'አዳማ',     'adama',        8.5400,  39.2700),
  ('oromia',      'Bishoftu',    'ቢሾፍቱ',    'bishoftu',     8.7500,  38.9800),
  ('oromia',      'Jimma',       'ጅማ',      'jimma',        7.6700,  36.8300),
  ('amhara',      'Bahir Dar',   'ባህር ዳር',  'bahir-dar',   11.5900,  37.3900),
  ('amhara',      'Gondar',      'ጎንደር',    'gondar',      12.6100,  37.4700),
  ('tigray',      'Mekelle',     'መቀለ',     'mekelle',     13.4900,  39.4700),
  ('dire-dawa',   'Dire Dawa',   'ድሬ ዳዋ',   'dire-dawa',    9.5900,  41.8600),
  ('sidama',      'Hawassa',     'ሀዋሳ',     'hawassa',      7.0600,  38.4800)
) AS x(parent_slug, name_en, name_am, slug, lat, lng)
JOIN public.locations p ON p.slug = x.parent_slug AND p.level = 'region' AND p.country_code = 'ET';

-- US regions (states)
INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active)
SELECT c.id, 'region', c.country_code, r.name_en, r.slug, true
FROM public.locations c
CROSS JOIN (VALUES
  ('California', 'california'),
  ('New York',   'new-york'),
  ('Texas',      'texas'),
  ('Minnesota',  'minnesota'),
  ('Maryland',   'maryland'),
  ('Washington', 'washington')
) AS r(name_en, slug)
WHERE c.slug = 'united-states' AND c.parent_id IS NULL;

-- US cities (name_am deliberately NULL — not guessed)
INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, center_lat, center_lng, is_active)
SELECT p.id, 'city', p.country_code, x.name_en, x.slug, x.lat, x.lng, true
FROM (VALUES
  ('california', 'Los Angeles',   'los-angeles',   34.0522, -118.2437),
  ('california', 'San Jose',      'san-jose',      37.3382, -121.8863),
  ('new-york',   'New York City', 'new-york-city', 40.7128,  -74.0060),
  ('texas',      'Dallas',        'dallas',        32.7767,  -96.7970),
  ('texas',      'Houston',       'houston',       29.7604,  -95.3698),
  ('minnesota',  'Minneapolis',   'minneapolis',   44.9778,  -93.2650),
  ('minnesota',  'Saint Paul',    'saint-paul',    44.9537,  -93.0900),
  ('maryland',   'Silver Spring', 'silver-spring', 38.9907,  -77.0261),
  ('washington', 'Seattle',       'seattle',       47.6062, -122.3321)
) AS x(parent_slug, name_en, slug, lat, lng)
JOIN public.locations p ON p.slug = x.parent_slug AND p.level = 'region' AND p.country_code = 'US';
