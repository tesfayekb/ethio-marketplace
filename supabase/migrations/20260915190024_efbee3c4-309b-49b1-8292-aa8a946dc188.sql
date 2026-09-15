-- L1c-M — LOCATIONS ERA · PUBLIC PER-COUNTRY TREE READ (Tier B)
-- Purpose: the three PUBLIC reads the per-country locations tree needs —
-- get_location_tree (the visible tree of one open market),
-- get_location_tree_version (an md5 stamp for caching) and
-- get_open_countries (the markets a visitor may browse).
-- Spec: docs/governance/locations-era-spec.md §4 L1c (ratified 2026-09-15).
-- DEC-013 §10 — NO has_permission on the public path; these are anon reads.
-- Law 4 visibility — a node is visible iff it AND every ancestor are active,
-- evaluated IN THE READ from the trigger-filled ancestor columns (no recursion,
-- no stored rollup). A closed or unknown country returns ZERO rows, never an
-- error: the route (L1c-C) turns that into a 404.
-- Precedents mirrored: get_browse_tree (20260903025501 §4.1 — STABLE definer,
-- anon+authenticated EXECUTE, one visibility WHERE) and get_ui_bundle_version
-- (20260901234603 — md5 over max(updated_at) + count).
-- The server route and its E2E are the next landing (L1c-C).
-- DEC-022: declared mark 20260915210000.

-- ============================================================
-- 2.1 get_location_tree — the visible tree of ONE open market
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_location_tree(p_country_code text)
RETURNS TABLE (
  id            uuid,
  parent_id     uuid,
  level         text,
  slug          text,
  iso_3166_2    text,
  region_id     uuid,
  city_id       uuid,
  display_order integer,
  center_lat    double precision,
  center_lng    double precision,
  name_en       text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT l.id, l.parent_id, l.level, l.slug, l.iso_3166_2,
         l.region_id, l.city_id, l.display_order,
         l.center_lat, l.center_lng, l.name_en
    FROM public.locations l
   WHERE l.country_code = upper(p_country_code)
     -- the market must be OPEN …
     AND EXISTS (SELECT 1 FROM public.countries k
                  WHERE k.code = upper(p_country_code) AND k.is_active)
     -- … and the country ANCHOR row must be active
     AND EXISTS (SELECT 1 FROM public.locations a
                  WHERE a.country_code = upper(p_country_code)
                    AND a.level = 'country' AND a.is_active)
     AND l.is_active
     AND (
          l.level = 'country'
       OR l.level = 'region'
       OR (l.level = 'city'
           AND EXISTS (SELECT 1 FROM public.locations r
                        WHERE r.id = l.region_id AND r.is_active))
       OR (l.level = 'sub_city'
           AND EXISTS (SELECT 1 FROM public.locations c
                        WHERE c.id = l.city_id AND c.is_active)
           AND EXISTS (SELECT 1 FROM public.locations r
                        WHERE r.id = l.region_id AND r.is_active))
     )
   ORDER BY CASE l.level
              WHEN 'country' THEN 0 WHEN 'region' THEN 1
              WHEN 'city' THEN 2 ELSE 3 END,
            l.display_order, l.name_en;
$$;

REVOKE ALL ON FUNCTION public.get_location_tree(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_location_tree(text) TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_location_tree(text) TO service_role;

-- ============================================================
-- 2.2 get_location_tree_version — the cache stamp
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_location_tree_version(p_country_code text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT md5(
      upper(p_country_code)
   || '|' || coalesce((SELECT to_char(max(l.updated_at), 'YYYYMMDDHH24MISS.US')
                        FROM public.locations l
                       WHERE l.country_code = upper(p_country_code)), 'none')
   || '|' || (SELECT count(*)::text FROM public.locations l
               WHERE l.country_code = upper(p_country_code))
   || '|' || coalesce((SELECT to_char(k.updated_at, 'YYYYMMDDHH24MISS.US')
                              || ':' || k.is_active::text
                        FROM public.countries k
                       WHERE k.code = upper(p_country_code)), 'none')
  );
$$;

REVOKE ALL ON FUNCTION public.get_location_tree_version(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_location_tree_version(text) TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_location_tree_version(text) TO service_role;

-- ============================================================
-- 2.3 get_open_countries — the markets a visitor may browse
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_open_countries()
RETURNS TABLE (
  code          char(2),
  name_en       text,
  unit_system   text,
  currency_code char(3),
  display_order integer,
  anchor_slug   text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT k.code, k.name_en, k.unit_system, k.currency_code, k.display_order,
         (SELECT l.slug FROM public.locations l
           WHERE l.country_code = k.code AND l.level = 'country'
           LIMIT 1) AS anchor_slug
    FROM public.countries k
   WHERE k.is_active
   ORDER BY k.display_order, k.code;
$$;

REVOKE ALL ON FUNCTION public.get_open_countries() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_open_countries() TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_open_countries() TO service_role;

-- ============================================================
-- 2.4 PROOFS
-- ============================================================

-- P1 — THE PATH RULE. A city under a retired region disappears although its own
-- flag is untouched; the anchor row is returned first.
DO $$
DECLARE
  v_anchor uuid;
  v_region uuid;
  v_city   uuid;
  v_first  uuid;
  v_reg_of_city uuid;
  v_still_active boolean;
BEGIN
  SELECT id INTO v_anchor FROM public.locations
   WHERE country_code = 'ET' AND level = 'country';

  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug,
                                is_active, display_order, source)
  VALUES (v_anchor, 'region', 'ET', 'E2E L1c Region', 'e2e-l1c-region',
          true, 900, 'admin')
  RETURNING id INTO v_region;

  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug,
                                is_active, display_order, center_lat, center_lng, source)
  VALUES (v_region, 'city', 'ET', 'E2E L1c City', 'e2e-l1c-city',
          true, 901, 9.0301, 38.7469, 'admin')
  RETURNING id INTO v_city;

  IF NOT EXISTS (SELECT 1 FROM public.get_location_tree('ET') t WHERE t.id = v_region) THEN
    RAISE EXCEPTION 'P1 FAILED — the active scratch region is not visible';
  END IF;
  SELECT t.region_id INTO v_reg_of_city FROM public.get_location_tree('ET') t WHERE t.id = v_city;
  IF v_reg_of_city IS DISTINCT FROM v_region THEN
    RAISE EXCEPTION 'P1 FAILED — the city is missing or carries region_id % (expected %)',
      v_reg_of_city, v_region;
  END IF;

  SELECT t.id INTO v_first FROM public.get_location_tree('ET') t LIMIT 1;
  IF v_first IS DISTINCT FROM v_anchor THEN
    RAISE EXCEPTION 'P1 FAILED — the first row is % (expected the ET anchor %)', v_first, v_anchor;
  END IF;

  UPDATE public.locations SET is_active = false WHERE id = v_region;

  SELECT is_active INTO v_still_active FROM public.locations WHERE id = v_city;
  IF v_still_active IS NOT TRUE THEN
    RAISE EXCEPTION 'P1 FAILED — the city''s own flag was changed by the retire';
  END IF;
  IF EXISTS (SELECT 1 FROM public.get_location_tree('ET') t WHERE t.id = v_city) THEN
    RAISE EXCEPTION 'P1 FAILED — a city under a retired region is still visible';
  END IF;
  IF EXISTS (SELECT 1 FROM public.get_location_tree('ET') t WHERE t.id = v_region) THEN
    RAISE EXCEPTION 'P1 FAILED — the retired region is still visible';
  END IF;

  DELETE FROM public.locations WHERE id IN (v_city, v_region);
  RAISE NOTICE 'P1 OK — path rule holds; anchor first; scratch removed';
END $$;

-- P2 — CLOSED AND UNKNOWN MARKETS, and the open roster.
DO $$
DECLARE
  v_ca int;
  v_zz int;
  v_codes text;
  v_et_anchor text;
BEGIN
  SELECT count(*) INTO v_ca FROM public.get_location_tree('CA');
  IF v_ca <> 0 THEN RAISE EXCEPTION 'P2 FAILED — closed market CA returned % rows', v_ca; END IF;
  SELECT count(*) INTO v_zz FROM public.get_location_tree('ZZ');
  IF v_zz <> 0 THEN RAISE EXCEPTION 'P2 FAILED — unknown market ZZ returned % rows', v_zz; END IF;

  SELECT string_agg(trim(c.code), ',' ORDER BY trim(c.code)) INTO v_codes
    FROM public.get_open_countries() c;
  IF v_codes IS DISTINCT FROM 'ET,US' THEN
    RAISE EXCEPTION 'P2 FAILED — open roster is % (expected ET,US)', v_codes;
  END IF;
  SELECT c.anchor_slug INTO v_et_anchor FROM public.get_open_countries() c WHERE trim(c.code) = 'ET';
  IF v_et_anchor IS DISTINCT FROM 'ethiopia' THEN
    RAISE EXCEPTION 'P2 FAILED — ET anchor_slug is % (expected ethiopia)', v_et_anchor;
  END IF;
  RAISE NOTICE 'P2 OK — closed/unknown return nothing; open roster ET,US with the ET anchor';
END $$;

-- P3 — THE VERSION MOVES ON A CHANGE and differs per country.
-- NOTE: inside ONE transaction now() is frozen, so the updated_at term cannot
-- move here; the row-set term (count) is what this proof exercises. The
-- timestamp term is proven by construction (the updated_at trigger) and by the
-- route's E2E at L1c-C.
DO $$
DECLARE
  v_anchor uuid;
  v_region uuid;
  v_second uuid;
  v_before text;
  v_after  text;
  v_ca     text;
BEGIN
  SELECT id INTO v_anchor FROM public.locations
   WHERE country_code = 'ET' AND level = 'country';
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug,
                                is_active, display_order, source)
  VALUES (v_anchor, 'region', 'ET', 'E2E L1c Version Region', 'e2e-l1c-version-region',
          true, 910, 'admin')
  RETURNING id INTO v_region;

  v_before := public.get_location_tree_version('ET');
  UPDATE public.locations SET display_order = 911 WHERE id = v_region;
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug,
                                is_active, display_order, source)
  VALUES (v_anchor, 'region', 'ET', 'E2E L1c Version Region Two', 'e2e-l1c-version-region-two',
          true, 912, 'admin')
  RETURNING id INTO v_second;
  v_after := public.get_location_tree_version('ET');
  IF v_after = v_before THEN
    RAISE EXCEPTION 'P3 FAILED — the version did not change after a change (%)', v_before;
  END IF;

  v_ca := public.get_location_tree_version('CA');
  IF v_ca = v_after THEN
    RAISE EXCEPTION 'P3 FAILED — CA and ET share a version (%)', v_ca;
  END IF;

  DELETE FROM public.locations WHERE id IN (v_region, v_second);
  IF public.get_location_tree_version('ET') IS DISTINCT FROM v_before THEN
    RAISE NOTICE 'P3 note — the stamp after cleanup differs from the opening stamp (expected: the timestamp term)';
  END IF;
  RAISE NOTICE 'P3 OK — version moves on a change and is per-country; scratch removed';
END $$;

-- P4 — READ-BACK: the public ACL, no permission check in any body, the indexes.
DO $$
DECLARE
  v_src text;
  v_name text;
BEGIN
  IF NOT has_function_privilege('anon', 'public.get_location_tree(text)', 'EXECUTE')
     OR NOT has_function_privilege('anon', 'public.get_location_tree_version(text)', 'EXECUTE')
     OR NOT has_function_privilege('anon', 'public.get_open_countries()', 'EXECUTE') THEN
    RAISE EXCEPTION 'P4 FAILED — anon cannot execute one of the three public reads';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.get_location_tree(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.get_location_tree_version(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.get_open_countries()', 'EXECUTE') THEN
    RAISE EXCEPTION 'P4 FAILED — authenticated cannot execute one of the three public reads';
  END IF;

  FOR v_name, v_src IN
    SELECT p.proname, p.prosrc FROM pg_proc p
      JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('get_location_tree','get_location_tree_version','get_open_countries')
  LOOP
    IF v_src ILIKE '%has_permission%' OR v_src ILIKE '%auth.uid()%' THEN
      RAISE EXCEPTION 'P4 FAILED — % carries a permission check on the public path', v_name;
    END IF;
  END LOOP;

  IF (SELECT count(*) FROM pg_indexes
       WHERE schemaname = 'public'
         AND indexname IN ('locations_country_idx','locations_region_idx','locations_city_idx')) <> 3 THEN
    RAISE EXCEPTION 'P4 FAILED — the three ancestor/country indexes are not all present';
  END IF;
  RAISE NOTICE 'P4 OK — anon+authenticated EXECUTE, no permission check, three indexes present';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260915210000') ON CONFLICT DO NOTHING;