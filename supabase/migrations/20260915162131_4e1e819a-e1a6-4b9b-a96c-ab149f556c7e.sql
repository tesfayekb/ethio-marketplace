-- L1a-1 — LOCATIONS ERA · SCHEMA (Tier A)
-- Purpose: widen the locations tree to four levels, add trigger-filled ancestor
-- columns, aliases/iso_3166_2/display_order/source, the coordinates law, the
-- ancestry guard + cascade triggers, geo_distance_km, the country profile
-- (DEC-055), country_root_order and coverage_plans (DEC-064).
-- Spec: docs/governance/locations-era-spec.md §3, DEC-033/DEC-055/DEC-064.
-- Additive + idempotent (IF NOT EXISTS / DO-guarded). No console UI, no import
-- family, no public tree RPC — those are L1b/L1c/L2.
-- DEC-022: declared mark 20260915170000.

-- ============================================================
-- 2.1 level CHECK widened (dropped BY QUERY, never by an assumed name)
-- ============================================================
DO $$
DECLARE
  v_name text;
BEGIN
  -- The level-VALUES check only. locations_root_is_country also mentions
  -- "level" and must survive, so the match is on the value list.
  SELECT conname INTO v_name
    FROM pg_constraint
   WHERE conrelid = 'public.locations'::regclass
     AND contype = 'c'
     AND pg_get_constraintdef(oid) LIKE '%level%'
     AND pg_get_constraintdef(oid) LIKE '%''city''%'
   LIMIT 1;
  IF v_name IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.locations DROP CONSTRAINT %I', v_name);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conrelid = 'public.locations'::regclass AND conname = 'locations_level_check'
  ) THEN
    ALTER TABLE public.locations
      ADD CONSTRAINT locations_level_check
      CHECK (level IN ('country','region','city','sub_city'));
  END IF;
END $$;

-- ============================================================
-- 2.2 new columns + indexes
-- ============================================================
ALTER TABLE public.locations
  ADD COLUMN IF NOT EXISTS region_id     uuid NULL REFERENCES public.locations(id),
  ADD COLUMN IF NOT EXISTS city_id       uuid NULL REFERENCES public.locations(id),
  ADD COLUMN IF NOT EXISTS display_order integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS iso_3166_2    text NULL,
  ADD COLUMN IF NOT EXISTS aliases       text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS source        text NOT NULL DEFAULT 'admin';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conrelid = 'public.locations'::regclass AND conname = 'locations_source_check'
  ) THEN
    ALTER TABLE public.locations
      ADD CONSTRAINT locations_source_check CHECK (source IN ('seed','admin','import'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS locations_region_idx ON public.locations(region_id);
CREATE INDEX IF NOT EXISTS locations_city_idx ON public.locations(city_id);
CREATE UNIQUE INDEX IF NOT EXISTS locations_iso_3166_2_unique
  ON public.locations(iso_3166_2) WHERE iso_3166_2 IS NOT NULL;

-- ============================================================
-- 2.3 backfill — every existing row is the P2-a seed
-- ============================================================
UPDATE public.locations SET source = 'seed' WHERE source <> 'seed';
-- ancestor columns hold ANCESTORS only, never self: regions and countries keep NULLs.
UPDATE public.locations SET region_id = parent_id
 WHERE level = 'city' AND region_id IS DISTINCT FROM parent_id;

-- ============================================================
-- 2.4 COORDINATES LAW — proof FIRST, then the constraint (P3)
-- ============================================================
DO $$
DECLARE
  v_bad text;
BEGIN
  SELECT string_agg(slug, ', ' ORDER BY slug) INTO v_bad
    FROM public.locations
   WHERE level IN ('city','sub_city') AND (center_lat IS NULL OR center_lng IS NULL);
  IF v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'P3 FAILED — city/sub_city rows without a centre: %', v_bad;
  END IF;
  RAISE NOTICE 'P3 OK — every city/sub_city row carries a centre; the constraint may land';
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conrelid = 'public.locations'::regclass AND conname = 'locations_city_needs_center'
  ) THEN
    ALTER TABLE public.locations
      ADD CONSTRAINT locations_city_needs_center
      CHECK (level NOT IN ('city','sub_city')
             OR (center_lat IS NOT NULL AND center_lng IS NOT NULL));
  END IF;
END $$;

-- ============================================================
-- 2.5 ancestry guard + cascade
-- ============================================================
CREATE OR REPLACE FUNCTION public.locations_ancestry_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_parent public.locations;
  v_rank   int;
  v_prank  int;
BEGIN
  IF (NEW.parent_id IS NULL) <> (NEW.level = 'country') THEN
    RAISE EXCEPTION 'rootMustBeCountry';
  END IF;

  IF NEW.slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$' THEN
    RAISE EXCEPTION 'badSlug';
  END IF;

  IF NEW.level IN ('city','sub_city')
     AND (NEW.center_lat IS NULL OR NEW.center_lng IS NULL) THEN
    RAISE EXCEPTION 'missingCoordinates';
  END IF;

  v_rank := CASE NEW.level
              WHEN 'country' THEN 0 WHEN 'region' THEN 1
              WHEN 'city' THEN 2 WHEN 'sub_city' THEN 3 END;

  IF NEW.parent_id IS NULL THEN
    NEW.region_id := NULL;
    NEW.city_id := NULL;
    RETURN NEW;
  END IF;

  SELECT * INTO v_parent FROM public.locations WHERE id = NEW.parent_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'parentMissing';
  END IF;

  v_prank := CASE v_parent.level
               WHEN 'country' THEN 0 WHEN 'region' THEN 1
               WHEN 'city' THEN 2 WHEN 'sub_city' THEN 3 END;
  IF v_rank IS DISTINCT FROM v_prank + 1 THEN
    RAISE EXCEPTION 'levelMismatch';
  END IF;

  IF NEW.country_code <> v_parent.country_code THEN
    RAISE EXCEPTION 'crossCountry';
  END IF;

  IF NEW.is_active AND NOT v_parent.is_active THEN
    RAISE EXCEPTION 'parentInactive';
  END IF;

  -- FILL, ignoring whatever the caller sent.
  IF NEW.level = 'region' THEN
    NEW.region_id := NULL;
    NEW.city_id := NULL;
  ELSIF NEW.level = 'city' THEN
    NEW.region_id := v_parent.id;
    NEW.city_id := NULL;
  ELSE
    NEW.region_id := v_parent.region_id;
    NEW.city_id := v_parent.id;
  END IF;

  RETURN NEW;
END $$;

REVOKE ALL ON FUNCTION public.locations_ancestry_guard() FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.locations_ancestry_cascade()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Deactivating a parent must NOT fail on active children: the path rule hides
  -- them, and the BEFORE guard's 'parentInactive' fires only for a row being
  -- written ACTIVE under an inactive parent. So when this row just became
  -- inactive we do not touch the children at all.
  IF NEW.is_active = false AND OLD.is_active = true THEN
    RETURN NULL;
  END IF;

  -- The touch re-runs the BEFORE guard on each child, which re-fills its
  -- ancestor columns and cascades in turn. The WHEN clause on this trigger
  -- ends the recursion (depth <= 3).
  UPDATE public.locations SET parent_id = parent_id WHERE parent_id = NEW.id;
  RETURN NULL;
END $$;

REVOKE ALL ON FUNCTION public.locations_ancestry_cascade() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS locations_ancestry_guard ON public.locations;
CREATE TRIGGER locations_ancestry_guard
  BEFORE INSERT OR UPDATE ON public.locations
  FOR EACH ROW EXECUTE FUNCTION public.locations_ancestry_guard();

DROP TRIGGER IF EXISTS locations_ancestry_cascade ON public.locations;
CREATE TRIGGER locations_ancestry_cascade
  AFTER UPDATE ON public.locations
  FOR EACH ROW
  WHEN (OLD.parent_id IS DISTINCT FROM NEW.parent_id
        OR OLD.country_code IS DISTINCT FROM NEW.country_code
        OR OLD.region_id IS DISTINCT FROM NEW.region_id
        OR OLD.city_id IS DISTINCT FROM NEW.city_id
        OR OLD.is_active IS DISTINCT FROM NEW.is_active)
  EXECUTE FUNCTION public.locations_ancestry_cascade();

-- ============================================================
-- 2.6 geo_distance_km — haversine, NOT security definer
-- ============================================================
CREATE OR REPLACE FUNCTION public.geo_distance_km(
  lat1 double precision, lng1 double precision,
  lat2 double precision, lng2 double precision)
RETURNS double precision
LANGUAGE sql
IMMUTABLE
PARALLEL SAFE
AS $$
  SELECT 2 * 6371.0088 * asin(sqrt(
      power(sin(radians(lat2 - lat1) / 2), 2)
    + cos(radians(lat1)) * cos(radians(lat2))
    * power(sin(radians(lng2 - lng1) / 2), 2)
  ));
$$;

GRANT EXECUTE ON FUNCTION public.geo_distance_km(double precision, double precision, double precision, double precision)
  TO anon, authenticated, service_role;

-- ============================================================
-- 2.7 country profile (DEC-055 first landing)
-- ============================================================
ALTER TABLE public.countries
  ADD COLUMN IF NOT EXISTS unit_system   text NOT NULL DEFAULT 'metric',
  ADD COLUMN IF NOT EXISTS currency_code char(3) NULL,
  ADD COLUMN IF NOT EXISTS display_order integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at    timestamptz NOT NULL DEFAULT now();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conrelid = 'public.countries'::regclass AND conname = 'countries_unit_system_check'
  ) THEN
    ALTER TABLE public.countries
      ADD CONSTRAINT countries_unit_system_check CHECK (unit_system IN ('metric','imperial'));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conrelid = 'public.countries'::regclass AND conname = 'countries_currency_code_check'
  ) THEN
    ALTER TABLE public.countries
      ADD CONSTRAINT countries_currency_code_check CHECK (currency_code ~ '^[A-Z]{3}$');
  END IF;
END $$;

DROP TRIGGER IF EXISTS update_countries_updated_at ON public.countries;
CREATE TRIGGER update_countries_updated_at
  BEFORE UPDATE ON public.countries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- 2.8 country_root_order — server-only surface
-- ============================================================
CREATE TABLE IF NOT EXISTS public.country_root_order (
  country_code char(2) NOT NULL REFERENCES public.countries(code),
  category_id  uuid NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  position     integer NOT NULL CHECK (position >= 1),
  created_by   uuid,
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (country_code, category_id),
  UNIQUE (country_code, position)
);

GRANT ALL ON public.country_root_order TO service_role;
ALTER TABLE public.country_root_order ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS country_root_order_no_client_access ON public.country_root_order;
CREATE POLICY country_root_order_no_client_access ON public.country_root_order
  FOR ALL TO authenticated
  USING (false) WITH CHECK (false);

-- ============================================================
-- 2.9 coverage_plans (DEC-064)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.coverage_plans (
  plan             text PRIMARY KEY CHECK (plan ~ '^[a-z_]{2,32}$'),
  max_cities       integer NOT NULL CHECK (max_cities >= 1),
  max_regions      integer NOT NULL CHECK (max_regions >= 1),
  max_countries    integer NOT NULL CHECK (max_countries >= 1),
  allow_everywhere boolean NOT NULL DEFAULT false,
  updated_by       uuid,
  updated_at       timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.coverage_plans TO anon, authenticated;
GRANT ALL ON public.coverage_plans TO service_role;
ALTER TABLE public.coverage_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS coverage_plans_public_read ON public.coverage_plans;
CREATE POLICY coverage_plans_public_read ON public.coverage_plans
  FOR SELECT TO anon, authenticated
  USING (true);

INSERT INTO public.coverage_plans (plan, max_cities, max_regions, max_countries, allow_everywhere)
VALUES ('free', 1, 1, 1, false)
ON CONFLICT (plan) DO NOTHING;

-- ============================================================
-- 2.10 PROOFS
-- ============================================================
-- P1 — the four-level chain, the cascade, and the deactivation rules.
DO $$
DECLARE
  v_country uuid;
  v_r1      uuid;
  v_r2      uuid;
  v_city    uuid;
  v_sub     uuid;
  v_row     public.locations;
  v_msg     text;
BEGIN
  SELECT id INTO v_country FROM public.locations
   WHERE level = 'country' AND country_code = 'ET' LIMIT 1;
  IF v_country IS NULL THEN RAISE EXCEPTION 'P1 FAILED — no ET country row'; END IF;

  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
  VALUES (v_country, 'region', 'ET', 'E2E L1A Region', 'e2e-l1a-region', true, 'admin')
  RETURNING id INTO v_r1;

  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, center_lat, center_lng, is_active, source)
  VALUES (v_r1, 'city', 'ET', 'E2E L1A City', 'e2e-l1a-city', 9.0, 38.7, true, 'admin')
  RETURNING id INTO v_city;

  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, center_lat, center_lng, is_active, source)
  VALUES (v_city, 'sub_city', 'ET', 'E2E L1A Sub', 'e2e-l1a-sub', 9.01, 38.71, true, 'admin')
  RETURNING id INTO v_sub;

  SELECT * INTO v_row FROM public.locations WHERE id = v_city;
  IF v_row.region_id IS DISTINCT FROM v_r1 OR v_row.city_id IS NOT NULL
     OR v_row.country_code <> 'ET' THEN
    RAISE EXCEPTION 'P1 FAILED — city ancestors: region_id=% city_id=%', v_row.region_id, v_row.city_id;
  END IF;

  SELECT * INTO v_row FROM public.locations WHERE id = v_sub;
  IF v_row.region_id IS DISTINCT FROM v_r1 OR v_row.city_id IS DISTINCT FROM v_city
     OR v_row.country_code <> 'ET' THEN
    RAISE EXCEPTION 'P1 FAILED — sub ancestors: region_id=% city_id=%', v_row.region_id, v_row.city_id;
  END IF;

  -- cascade: move the city under a second region; the sub-city follows.
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
  VALUES (v_country, 'region', 'ET', 'E2E L1A Region 2', 'e2e-l1a-region-2', true, 'admin')
  RETURNING id INTO v_r2;

  UPDATE public.locations SET parent_id = v_r2 WHERE id = v_city;

  SELECT * INTO v_row FROM public.locations WHERE id = v_sub;
  IF v_row.region_id IS DISTINCT FROM v_r2 OR v_row.city_id IS DISTINCT FROM v_city THEN
    RAISE EXCEPTION 'P1 FAILED — cascade did not reach the sub-city: region_id=%', v_row.region_id;
  END IF;

  -- deactivating a parent succeeds and leaves active descendants alone.
  UPDATE public.locations SET is_active = false WHERE id = v_r2;
  IF NOT (SELECT is_active FROM public.locations WHERE id = v_city)
     OR NOT (SELECT is_active FROM public.locations WHERE id = v_sub) THEN
    RAISE EXCEPTION 'P1 FAILED — deactivating the region touched its descendants';
  END IF;

  -- the guard reads the DIRECT parent, so hide the city too, then prove that
  -- re-activating the sub-city under an inactive chain is refused.
  UPDATE public.locations SET is_active = false WHERE id = v_sub;
  UPDATE public.locations SET is_active = false WHERE id = v_city;
  BEGIN
    UPDATE public.locations SET is_active = true WHERE id = v_sub;
    RAISE EXCEPTION 'P1 FAILED — reactivating under an inactive parent was allowed';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg <> 'parentInactive' THEN
      RAISE EXCEPTION 'P1 FAILED — expected parentInactive, got %', v_msg;
    END IF;
  END;

  DELETE FROM public.locations WHERE id IN (v_sub, v_city, v_r1, v_r2);
  RAISE NOTICE 'P1 OK — four-level chain, cascade, deactivation rules and parentInactive';
END $$;

-- P2 — refusals, one sub-transaction each, asserting the exact message.
DO $$
DECLARE
  v_country uuid;
  v_region  uuid;
  v_msg     text;
BEGIN
  SELECT id INTO v_country FROM public.locations
   WHERE level = 'country' AND country_code = 'ET' LIMIT 1;

  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
  VALUES (v_country, 'region', 'ET', 'E2E L1A P2 Region', 'e2e-l1a-p2-region', true, 'admin')
  RETURNING id INTO v_region;

  BEGIN
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, center_lat, center_lng)
    VALUES (v_region, 'sub_city', 'ET', 'x', 'e2e-l1a-p2-sub', 9.0, 38.7);
    RAISE EXCEPTION 'P2 FAILED — levelMismatch not raised';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg <> 'levelMismatch' THEN RAISE EXCEPTION 'P2 FAILED — levelMismatch got %', v_msg; END IF;
  END;

  BEGIN
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, center_lat, center_lng)
    VALUES (v_region, 'city', 'US', 'x', 'e2e-l1a-p2-cross', 9.0, 38.7);
    RAISE EXCEPTION 'P2 FAILED — crossCountry not raised';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg <> 'crossCountry' THEN RAISE EXCEPTION 'P2 FAILED — crossCountry got %', v_msg; END IF;
  END;

  BEGIN
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, center_lat, center_lng)
    VALUES (v_region, 'city', 'ET', 'x', 'Bad Slug!', 9.0, 38.7);
    RAISE EXCEPTION 'P2 FAILED — badSlug not raised';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg <> 'badSlug' THEN RAISE EXCEPTION 'P2 FAILED — badSlug got %', v_msg; END IF;
  END;

  BEGIN
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug)
    VALUES (v_region, 'city', 'ET', 'x', 'e2e-l1a-p2-nocentre');
    RAISE EXCEPTION 'P2 FAILED — missingCoordinates not raised';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg <> 'missingCoordinates' THEN RAISE EXCEPTION 'P2 FAILED — missingCoordinates got %', v_msg; END IF;
  END;

  BEGIN
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug)
    VALUES (NULL, 'region', 'ET', 'x', 'e2e-l1a-p2-orphan');
    RAISE EXCEPTION 'P2 FAILED — rootMustBeCountry not raised';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg <> 'rootMustBeCountry' THEN RAISE EXCEPTION 'P2 FAILED — rootMustBeCountry got %', v_msg; END IF;
  END;

  DELETE FROM public.locations WHERE id = v_region;
  RAISE NOTICE 'P2 OK — levelMismatch, crossCountry, badSlug, missingCoordinates, rootMustBeCountry';
END $$;

-- P4 — Addis Ababa -> Adama, computed 79.4 km.
DO $$
DECLARE v_km double precision;
BEGIN
  v_km := public.geo_distance_km(9.0320, 38.7469, 8.5400, 39.2700);
  IF v_km < 78 OR v_km > 81 THEN
    RAISE EXCEPTION 'P4 FAILED — geo_distance_km returned %', v_km;
  END IF;
  RAISE NOTICE 'P4 OK — geo_distance_km Addis->Adama = % km', round(v_km::numeric, 2);
END $$;

-- P5 — coverage_plans seed and its CHECK.
DO $$
DECLARE v_n int; v_msg text;
BEGIN
  SELECT count(*) INTO v_n FROM public.coverage_plans;
  IF v_n <> 1 THEN RAISE EXCEPTION 'P5 FAILED — % coverage_plans rows', v_n; END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.coverage_plans
     WHERE plan = 'free' AND max_cities = 1 AND max_regions = 1
       AND max_countries = 1 AND allow_everywhere = false
  ) THEN RAISE EXCEPTION 'P5 FAILED — the free plan is not 1/1/1/false'; END IF;

  BEGIN
    INSERT INTO public.coverage_plans (plan, max_cities, max_regions, max_countries)
    VALUES ('e2e_bad', 0, 1, 1);
    RAISE EXCEPTION 'P5 FAILED — max_cities = 0 was accepted';
  EXCEPTION WHEN check_violation THEN
    NULL;
  END;
  RAISE NOTICE 'P5 OK — free = 1/1/1/false and max_cities >= 1 enforced';
END $$;

-- P6 — read-back.
DO $$
DECLARE v_def text; v_n int;
BEGIN
  SELECT pg_get_constraintdef(oid) INTO v_def FROM pg_constraint
   WHERE conrelid = 'public.locations'::regclass AND conname = 'locations_level_check';
  IF v_def IS NULL OR v_def NOT LIKE '%sub_city%' OR v_def NOT LIKE '%country%'
     OR v_def NOT LIKE '%region%' OR v_def NOT LIKE '%city%' THEN
    RAISE EXCEPTION 'P6 FAILED — locations_level_check: %', COALESCE(v_def, '(missing)');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conrelid = 'public.locations'::regclass
                    AND conname = 'locations_city_needs_center') THEN
    RAISE EXCEPTION 'P6 FAILED — locations_city_needs_center missing';
  END IF;

  SELECT count(*) INTO v_n FROM public.locations
   WHERE level = 'city' AND (region_id IS DISTINCT FROM parent_id OR source <> 'seed');
  IF v_n <> 0 THEN RAISE EXCEPTION 'P6 FAILED — % city rows unbackfilled', v_n; END IF;

  SELECT count(*) INTO v_n FROM pg_trigger
   WHERE tgrelid = 'public.locations'::regclass
     AND tgname IN ('locations_ancestry_guard','locations_ancestry_cascade');
  IF v_n <> 2 THEN RAISE EXCEPTION 'P6 FAILED — % ancestry triggers', v_n; END IF;

  IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.country_root_order'::regclass)
     OR NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.coverage_plans'::regclass) THEN
    RAISE EXCEPTION 'P6 FAILED — RLS not enabled on the new tables';
  END IF;

  SELECT count(*) INTO v_n FROM pg_policies
   WHERE schemaname = 'public'
     AND policyname IN ('country_root_order_no_client_access','coverage_plans_public_read');
  IF v_n <> 2 THEN RAISE EXCEPTION 'P6 FAILED — % named policies', v_n; END IF;

  RAISE NOTICE 'P6 OK — constraints, backfill, triggers, RLS and policies read back';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260915170000') ON CONFLICT DO NOTHING;