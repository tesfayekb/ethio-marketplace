-- L1a-2 — LOCATIONS ERA · PERMISSIONS + ADMIN RPCs (Tier A)
-- Purpose: retire locations:manage / countries:manage into granular actions,
-- add the coverage resource, rewrite the write policies (countries become
-- RPC-only), and declare the ten admin doors L2 will call by name (E7).
-- Spec: docs/governance/locations-era-spec.md §4 L1a; DEC-017 pattern
-- (C2 precedent 20260903025501 §3).
-- POSITIVE-PATH behaviour of these RPC bodies is proven at L2 through the route
-- (E2E LT-*): a migration cannot hold a permitted, step-up-fresh identity, and
-- faking one would prove nothing. The proofs here are DENY, permissions,
-- policies and ACLs.
-- DEC-022: declared mark 20260915180000.

-- ============================================================
-- 3.0 geo_distance_km — search_path pinned (linter 0011, raised by L1a-1)
-- Pure arithmetic, SECURITY INVOKER; pinning pg_catalog closes the warning
-- without changing the result (P4 re-asserts the distance).
-- ============================================================
CREATE OR REPLACE FUNCTION public.geo_distance_km(
  lat1 double precision, lng1 double precision,
  lat2 double precision, lng2 double precision)
RETURNS double precision
LANGUAGE sql
IMMUTABLE
PARALLEL SAFE
SET search_path = pg_catalog
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
-- 3.1 permissions (DEC-017 pattern)
-- ============================================================
INSERT INTO public.resources (name, display_name)
VALUES ('coverage','Coverage')
ON CONFLICT (name) DO NOTHING;

DO $$
DECLARE
  v_loc uuid; v_cty uuid; v_cov uuid;
BEGIN
  SELECT id INTO v_loc FROM public.resources WHERE name = 'locations';
  SELECT id INTO v_cty FROM public.resources WHERE name = 'countries';
  SELECT id INTO v_cov FROM public.resources WHERE name = 'coverage';
  IF v_loc IS NULL OR v_cty IS NULL OR v_cov IS NULL THEN
    RAISE EXCEPTION 'L1a-2: a resource row is missing (locations/countries/coverage)';
  END IF;

  INSERT INTO public.permissions (resource_id, action, requires_step_up, assignable)
  VALUES (v_loc, 'view', false, true),
         (v_loc, 'create', false, true),
         (v_loc, 'update', false, true),
         (v_loc, 'restructure', true, true),
         (v_loc, 'import', true, true),
         (v_cty, 'view', false, true),
         (v_cty, 'update', false, true),
         (v_cty, 'activate', true, true),
         (v_cov, 'view', false, true),
         (v_cov, 'update', true, true)
  ON CONFLICT DO NOTHING;

  UPDATE public.permissions p SET requires_step_up = true
   WHERE (p.resource_id = v_loc AND p.action IN ('restructure','import'))
      OR (p.resource_id = v_cty AND p.action = 'activate')
      OR (p.resource_id = v_cov AND p.action = 'update');

  UPDATE public.permissions p SET requires_step_up = false
   WHERE (p.resource_id = v_loc AND p.action IN ('view','create','update'))
      OR (p.resource_id = v_cty AND p.action IN ('view','update'))
      OR (p.resource_id = v_cov AND p.action = 'view');
END $$;

-- roles holding locations:manage inherit the five locations actions + coverage
INSERT INTO public.role_permissions (role_id, permission_id, is_core)
SELECT rp.role_id, np.id, false
  FROM public.role_permissions rp
  JOIN public.permissions mp ON mp.id = rp.permission_id
  JOIN public.resources r ON r.id = mp.resource_id AND r.name = 'locations'
  JOIN public.permissions np ON np.resource_id IN (
         SELECT id FROM public.resources WHERE name IN ('locations','coverage'))
       AND ((np.resource_id = r.id AND np.action IN ('view','create','update','restructure','import'))
         OR (np.resource_id <> r.id AND np.action IN ('view','update')))
 WHERE mp.action = 'manage'
ON CONFLICT DO NOTHING;

-- roles holding countries:manage inherit the three countries actions
INSERT INTO public.role_permissions (role_id, permission_id, is_core)
SELECT rp.role_id, np.id, false
  FROM public.role_permissions rp
  JOIN public.permissions mp ON mp.id = rp.permission_id
  JOIN public.resources r ON r.id = mp.resource_id AND r.name = 'countries'
  JOIN public.permissions np ON np.resource_id = r.id
       AND np.action IN ('view','update','activate')
 WHERE mp.action = 'manage'
ON CONFLICT DO NOTHING;

-- retire the broad power: has_permission() treats a 'manage' grant as every
-- action, so the grants must go (the permission rows stay, granted to none).
DELETE FROM public.role_permissions rp
 USING public.permissions p, public.resources r
 WHERE rp.permission_id = p.id
   AND p.resource_id = r.id
   AND r.name IN ('locations','countries')
   AND p.action = 'manage';

-- ============================================================
-- 3.2 policies and grants
-- ============================================================
DROP POLICY IF EXISTS locations_admin_all ON public.locations;
DROP POLICY IF EXISTS countries_admin_all ON public.countries;

DROP POLICY IF EXISTS locations_admin_insert ON public.locations;
CREATE POLICY locations_admin_insert ON public.locations
  FOR INSERT TO authenticated
  WITH CHECK (public.has_permission(auth.uid(), 'locations', 'create'));

DROP POLICY IF EXISTS locations_admin_update ON public.locations;
CREATE POLICY locations_admin_update ON public.locations
  FOR UPDATE TO authenticated
  USING (public.has_permission(auth.uid(), 'locations', 'update'))
  WITH CHECK (public.has_permission(auth.uid(), 'locations', 'update'));

DROP POLICY IF EXISTS locations_admin_delete ON public.locations;
CREATE POLICY locations_admin_delete ON public.locations
  FOR DELETE TO authenticated
  USING (public.has_permission(auth.uid(), 'locations', 'restructure'));

-- Countries are RPC-ONLY. A table-level `update` right cannot tell a currency
-- edit from opening a market, so the step-up on countries:activate is only real
-- when every write goes through the definer RPCs below. The public SELECT
-- policy countries_public_read and its SELECT grant stay untouched.
REVOKE INSERT, UPDATE, DELETE ON public.countries FROM authenticated;

-- ============================================================
-- 3.3 slug helper
-- ============================================================
CREATE OR REPLACE FUNCTION public.location_slug_candidate(p_name text, p_parent_id uuid)
RETURNS text
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_base text;
  v_try  text;
  v_n    int := 1;
BEGIN
  v_base := lower(coalesce(p_name, ''));
  v_base := regexp_replace(v_base, '[^a-z0-9]+', '-', 'g');
  v_base := trim(both '-' from v_base);
  IF v_base = '' THEN
    v_base := 'location';
  END IF;

  v_try := v_base;
  WHILE EXISTS (
    SELECT 1 FROM public.locations l
     WHERE l.parent_id IS NOT DISTINCT FROM p_parent_id AND l.slug = v_try
  ) LOOP
    v_n := v_n + 1;
    v_try := v_base || '-' || v_n::text;
  END LOOP;
  RETURN v_try;
END $$;

REVOKE ALL ON FUNCTION public.location_slug_candidate(text, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.location_slug_candidate(text, uuid) TO authenticated;
GRANT ALL ON FUNCTION public.location_slug_candidate(text, uuid) TO service_role;

-- ============================================================
-- 3.4 admin RPCs
-- ============================================================

-- (a) list ------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_list_locations(
  p_country_code text,
  p_search text DEFAULT NULL,
  p_level text DEFAULT NULL,
  p_active boolean DEFAULT NULL)
RETURNS TABLE (
  id uuid, parent_id uuid, level text, country_code char(2),
  region_id uuid, city_id uuid, slug text, name_en text,
  iso_3166_2 text, aliases text[], display_order integer,
  center_lat double precision, center_lng double precision,
  is_active boolean, source text, path text,
  child_count integer, listing_count integer,
  coverage_count integer, profile_default_count integer)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'locations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT l.id, l.parent_id, l.level, l.country_code,
         l.region_id, l.city_id, l.slug, l.name_en,
         l.iso_3166_2, l.aliases, l.display_order,
         l.center_lat, l.center_lng, l.is_active, l.source,
         array_to_string(
           ARRAY(SELECT a.name_en FROM (
                   SELECT c.name_en, 0 AS ord FROM public.locations c
                    WHERE c.level = 'country' AND c.country_code = l.country_code
                      AND c.id <> l.id
                   UNION ALL
                   SELECT r.name_en, 1 FROM public.locations r WHERE r.id = l.region_id
                   UNION ALL
                   SELECT ci.name_en, 2 FROM public.locations ci WHERE ci.id = l.city_id
                   UNION ALL
                   SELECT l.name_en, 3
                 ) a ORDER BY a.ord), ' › ') AS path,
         (SELECT count(*)::integer FROM public.locations k WHERE k.parent_id = l.id),
         (SELECT count(*)::integer FROM public.listings s WHERE s.location_id = l.id),
         (SELECT count(*)::integer FROM public.listing_locations v WHERE v.location_id = l.id),
         (SELECT count(*)::integer FROM public.profiles pr WHERE pr.default_post_location_id = l.id)
    FROM public.locations l
   WHERE l.country_code = upper(p_country_code)
     AND (p_level IS NULL OR l.level = p_level)
     AND (p_active IS NULL OR l.is_active = p_active)
     AND (
       p_search IS NULL OR p_search = ''
       OR l.name_en ILIKE '%' || p_search || '%'
       OR l.slug ILIKE '%' || p_search || '%'
       OR EXISTS (SELECT 1 FROM unnest(l.aliases) al WHERE al ILIKE '%' || p_search || '%')
     )
   ORDER BY CASE l.level WHEN 'country' THEN 0 WHEN 'region' THEN 1
                         WHEN 'city' THEN 2 ELSE 3 END,
            l.display_order, l.name_en;
END $$;

REVOKE ALL ON FUNCTION public.admin_list_locations(text, text, text, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_locations(text, text, text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_locations(text, text, text, boolean) TO service_role;

-- (b) upsert ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_upsert_location(
  p_id uuid,
  p_parent_id uuid,
  p_level text,
  p_name_en text,
  p_slug text,
  p_iso_3166_2 text,
  p_aliases text[],
  p_display_order integer,
  p_center_lat double precision,
  p_center_lng double precision)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_old     public.locations;
  v_slug    text;
  v_country char(2);
  v_id      uuid;
BEGIN
  IF p_id IS NULL THEN
    IF NOT public.has_permission(auth.uid(), 'locations', 'create') THEN
      RAISE EXCEPTION 'permission denied';
    END IF;
    PERFORM public.require_step_up_if_needed('locations', 'create');

    IF p_level IS NULL OR p_level NOT IN ('country','region','city','sub_city') THEN
      RAISE EXCEPTION 'badLevel';
    END IF;
    IF p_iso_3166_2 IS NOT NULL AND p_level <> 'region' THEN
      RAISE EXCEPTION 'isoOnRegionsOnly';
    END IF;
    IF coalesce(trim(p_name_en), '') = '' THEN
      RAISE EXCEPTION 'nameRequired';
    END IF;

    IF p_level = 'country' THEN
      IF p_parent_id IS NOT NULL THEN RAISE EXCEPTION 'rootMustBeCountry'; END IF;
      SELECT c.code INTO v_country FROM public.countries c
       WHERE c.code = upper(coalesce(p_slug, ''));
      IF v_country IS NULL THEN
        RAISE EXCEPTION 'unknownCountry';
      END IF;
      v_slug := public.location_slug_candidate(p_name_en, NULL);
    ELSE
      SELECT l.country_code INTO v_country FROM public.locations l WHERE l.id = p_parent_id;
      IF v_country IS NULL THEN RAISE EXCEPTION 'parentMissing'; END IF;
      v_slug := coalesce(nullif(trim(coalesce(p_slug, '')), ''),
                         public.location_slug_candidate(p_name_en, p_parent_id));
    END IF;

    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug,
                                  iso_3166_2, aliases, display_order,
                                  center_lat, center_lng, is_active, source)
    VALUES (p_parent_id, p_level, v_country, p_name_en, v_slug,
            p_iso_3166_2, coalesce(p_aliases, '{}'::text[]), coalesce(p_display_order, 0),
            p_center_lat, p_center_lng, false, 'admin')
    RETURNING id INTO v_id;

    PERFORM public.log_audit('location.create', 'location', v_id::text,
      jsonb_build_object('new', jsonb_build_object(
        'level', p_level, 'country_code', v_country, 'name_en', p_name_en,
        'slug', v_slug, 'parent_id', p_parent_id, 'iso_3166_2', p_iso_3166_2,
        'aliases', coalesce(p_aliases, '{}'::text[]),
        'display_order', coalesce(p_display_order, 0),
        'center_lat', p_center_lat, 'center_lng', p_center_lng)));
    RETURN v_id;
  END IF;

  IF NOT public.has_permission(auth.uid(), 'locations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('locations', 'update');

  SELECT * INTO v_old FROM public.locations WHERE id = p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'locationMissing'; END IF;

  -- parent, level and activation are NOT this door's business.
  IF p_parent_id IS DISTINCT FROM v_old.parent_id THEN RAISE EXCEPTION 'useMoveDoor'; END IF;
  IF p_level IS NOT NULL AND p_level IS DISTINCT FROM v_old.level THEN
    RAISE EXCEPTION 'useMoveDoor';
  END IF;
  IF p_iso_3166_2 IS NOT NULL AND v_old.level <> 'region' THEN
    RAISE EXCEPTION 'isoOnRegionsOnly';
  END IF;
  IF coalesce(trim(coalesce(p_name_en, v_old.name_en)), '') = '' THEN
    RAISE EXCEPTION 'nameRequired';
  END IF;

  UPDATE public.locations l
     SET name_en       = coalesce(p_name_en, l.name_en),
         slug          = coalesce(nullif(trim(coalesce(p_slug, '')), ''), l.slug),
         iso_3166_2    = p_iso_3166_2,
         aliases       = coalesce(p_aliases, l.aliases),
         display_order = coalesce(p_display_order, l.display_order),
         center_lat    = coalesce(p_center_lat, l.center_lat),
         center_lng    = coalesce(p_center_lng, l.center_lng)
   WHERE l.id = p_id;

  PERFORM public.log_audit('location.update', 'location', p_id::text,
    jsonb_build_object(
      'old', jsonb_build_object('name_en', v_old.name_en, 'slug', v_old.slug,
        'iso_3166_2', v_old.iso_3166_2, 'aliases', v_old.aliases,
        'display_order', v_old.display_order,
        'center_lat', v_old.center_lat, 'center_lng', v_old.center_lng),
      'new', (SELECT jsonb_build_object('name_en', n.name_en, 'slug', n.slug,
        'iso_3166_2', n.iso_3166_2, 'aliases', n.aliases,
        'display_order', n.display_order,
        'center_lat', n.center_lat, 'center_lng', n.center_lng)
        FROM public.locations n WHERE n.id = p_id)));
  RETURN p_id;
END $$;

REVOKE ALL ON FUNCTION public.admin_upsert_location(uuid, uuid, text, text, text, text, text[], integer, double precision, double precision) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_location(uuid, uuid, text, text, text, text, text[], integer, double precision, double precision) TO authenticated;
GRANT ALL ON FUNCTION public.admin_upsert_location(uuid, uuid, text, text, text, text, text[], integer, double precision, double precision) TO service_role;

-- (c) activation ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_set_location_active(p_id uuid, p_active boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_old public.locations;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'locations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('locations', 'update');

  SELECT * INTO v_old FROM public.locations WHERE id = p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'locationMissing'; END IF;
  IF v_old.is_active = p_active THEN RETURN; END IF;

  -- the ancestry guard raises 'parentInactive' here; let it surface unchanged.
  UPDATE public.locations SET is_active = p_active WHERE id = p_id;

  PERFORM public.log_audit(
    CASE WHEN p_active THEN 'location.activate' ELSE 'location.retire' END,
    'location', p_id::text,
    jsonb_build_object('slug', v_old.slug, 'old', v_old.is_active, 'new', p_active));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_location_active(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_location_active(uuid, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_location_active(uuid, boolean) TO service_role;

-- (d) move ------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_move_location(p_id uuid, p_new_parent_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_old    public.locations;
  v_parent public.locations;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'locations', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('locations', 'restructure');

  SELECT * INTO v_old FROM public.locations WHERE id = p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'locationMissing'; END IF;
  IF v_old.level = 'country' THEN RAISE EXCEPTION 'cannotMoveCountry'; END IF;

  SELECT * INTO v_parent FROM public.locations WHERE id = p_new_parent_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'parentMissing'; END IF;
  IF v_parent.country_code <> v_old.country_code THEN RAISE EXCEPTION 'crossCountry'; END IF;

  -- the BEFORE guard enforces the level step; the cascade re-fills descendants.
  UPDATE public.locations SET parent_id = p_new_parent_id WHERE id = p_id;

  PERFORM public.log_audit('location.move', 'location', p_id::text,
    jsonb_build_object('slug', v_old.slug,
      'old', jsonb_build_object('parent_id', v_old.parent_id),
      'new', jsonb_build_object('parent_id', p_new_parent_id)));
END $$;

REVOKE ALL ON FUNCTION public.admin_move_location(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_move_location(uuid, uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_move_location(uuid, uuid) TO service_role;

-- (e) reorder ---------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_reorder_locations(p_parent_id uuid, p_ids uuid[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_bad int;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'locations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('locations', 'update');

  IF p_parent_id IS NULL THEN RAISE EXCEPTION 'orderCountriesInProfile'; END IF;

  SELECT count(*) INTO v_bad
    FROM unnest(coalesce(p_ids, '{}'::uuid[])) AS u(id)
   WHERE NOT EXISTS (SELECT 1 FROM public.locations l
                      WHERE l.id = u.id AND l.parent_id = p_parent_id);
  IF v_bad > 0 THEN RAISE EXCEPTION 'notAChild'; END IF;

  UPDATE public.locations l
     SET display_order = u.ord
    FROM (SELECT id, ordinality::integer AS ord
            FROM unnest(coalesce(p_ids, '{}'::uuid[])) WITH ORDINALITY AS t(id, ordinality)) u
   WHERE l.id = u.id;

  PERFORM public.log_audit('location.reorder', 'location', p_parent_id::text,
    jsonb_build_object('parent_id', p_parent_id, 'ids', to_jsonb(coalesce(p_ids, '{}'::uuid[]))));
END $$;

REVOKE ALL ON FUNCTION public.admin_reorder_locations(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_reorder_locations(uuid, uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_reorder_locations(uuid, uuid[]) TO service_role;

-- (f) delete ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_delete_location(p_id uuid, p_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_old public.locations;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'locations', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('locations', 'restructure');

  SELECT * INTO v_old FROM public.locations WHERE id = p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'locationMissing'; END IF;
  IF v_old.slug IS DISTINCT FROM p_slug THEN RAISE EXCEPTION 'slugMismatch'; END IF;

  IF EXISTS (SELECT 1 FROM public.locations k WHERE k.parent_id = p_id) THEN
    RAISE EXCEPTION 'retireInstead:hasChildren';
  END IF;
  IF EXISTS (SELECT 1 FROM public.listings s WHERE s.location_id = p_id) THEN
    RAISE EXCEPTION 'retireInstead:hasListings';
  END IF;
  IF EXISTS (SELECT 1 FROM public.listing_locations v WHERE v.location_id = p_id) THEN
    RAISE EXCEPTION 'retireInstead:hasCoverage';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles pr WHERE pr.default_post_location_id = p_id) THEN
    RAISE EXCEPTION 'retireInstead:hasProfileDefaults';
  END IF;

  DELETE FROM public.entity_translations
   WHERE entity_type = 'location' AND entity_id = p_id;
  DELETE FROM public.locations WHERE id = p_id;

  PERFORM public.log_audit('location.delete', 'location', p_id::text,
    jsonb_build_object('old', to_jsonb(v_old)));
END $$;

REVOKE ALL ON FUNCTION public.admin_delete_location(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_delete_location(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_delete_location(uuid, text) TO service_role;

-- (g) country profile -------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_upsert_country(
  p_code text, p_name_en text, p_unit_system text,
  p_currency_code text, p_display_order integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_code char(2);
  v_old  public.countries;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'countries', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('countries', 'update');

  v_code := upper(coalesce(p_code, ''));
  IF v_code !~ '^[A-Z]{2}$' THEN RAISE EXCEPTION 'badCountryCode'; END IF;
  IF p_unit_system IS NOT NULL AND p_unit_system NOT IN ('metric','imperial') THEN
    RAISE EXCEPTION 'badUnitSystem';
  END IF;
  IF p_currency_code IS NOT NULL AND upper(p_currency_code) !~ '^[A-Z]{3}$' THEN
    RAISE EXCEPTION 'badCurrency';
  END IF;

  SELECT * INTO v_old FROM public.countries WHERE code = v_code;
  IF NOT FOUND THEN
    IF coalesce(trim(coalesce(p_name_en, '')), '') = '' THEN RAISE EXCEPTION 'nameRequired'; END IF;
    INSERT INTO public.countries (code, name_en, is_active, unit_system, currency_code, display_order)
    VALUES (v_code, p_name_en, false, coalesce(p_unit_system, 'metric'),
            upper(p_currency_code), coalesce(p_display_order, 0));
  ELSE
    -- never touches is_active: opening a market is admin_set_country_active.
    UPDATE public.countries c
       SET name_en       = coalesce(p_name_en, c.name_en),
           unit_system   = coalesce(p_unit_system, c.unit_system),
           currency_code = coalesce(upper(p_currency_code), c.currency_code),
           display_order = coalesce(p_display_order, c.display_order)
     WHERE c.code = v_code;
  END IF;

  PERFORM public.log_audit('country.upsert', 'country', v_code,
    jsonb_build_object(
      'old', CASE WHEN v_old.code IS NULL THEN NULL ELSE jsonb_build_object(
        'name_en', v_old.name_en, 'unit_system', v_old.unit_system,
        'currency_code', v_old.currency_code, 'display_order', v_old.display_order) END,
      'new', (SELECT jsonb_build_object('name_en', n.name_en, 'unit_system', n.unit_system,
        'currency_code', n.currency_code, 'display_order', n.display_order)
        FROM public.countries n WHERE n.code = v_code)));
END $$;

REVOKE ALL ON FUNCTION public.admin_upsert_country(text, text, text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_country(text, text, text, text, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_upsert_country(text, text, text, text, integer) TO service_role;

-- (h) open / close a market -------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_set_country_active(
  p_code text, p_active boolean, p_force_hide boolean DEFAULT false)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_code   char(2);
  v_row    public.countries;
  v_anchor uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'countries', 'activate') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('countries', 'activate');

  v_code := upper(coalesce(p_code, ''));
  IF v_code !~ '^[A-Z]{2}$' THEN RAISE EXCEPTION 'badCountryCode'; END IF;
  SELECT * INTO v_row FROM public.countries WHERE code = v_code;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownCountry'; END IF;

  IF p_active THEN
    UPDATE public.countries SET is_active = true WHERE code = v_code;

    SELECT id INTO v_anchor FROM public.locations
     WHERE level = 'country' AND country_code = v_code LIMIT 1;
    IF v_anchor IS NULL THEN
      INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
      VALUES (NULL, 'country', v_code, v_row.name_en,
              public.location_slug_candidate(v_row.name_en, NULL), true, 'admin')
      RETURNING id INTO v_anchor;
    ELSE
      UPDATE public.locations SET is_active = true WHERE id = v_anchor;
    END IF;

    PERFORM public.log_audit('country.open', 'country', v_code,
      jsonb_build_object('anchor', v_anchor, 'force_hide', p_force_hide));
  ELSE
    IF NOT p_force_hide AND EXISTS (
      SELECT 1 FROM public.user_roles ur WHERE ur.scope_country = v_code
    ) THEN
      RAISE EXCEPTION 'scopedRolesExist';
    END IF;

    UPDATE public.countries SET is_active = false WHERE code = v_code;
    -- the path rule hides the subtree; child rows are not written.
    UPDATE public.locations SET is_active = false
     WHERE level = 'country' AND country_code = v_code;

    PERFORM public.log_audit('country.close', 'country', v_code,
      jsonb_build_object('force_hide', p_force_hide));
  END IF;
END $$;

REVOKE ALL ON FUNCTION public.admin_set_country_active(text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_country_active(text, boolean, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_country_active(text, boolean, boolean) TO service_role;

-- (i) per-country root order -------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_set_country_root_order(p_code text, p_category_ids uuid[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_code char(2);
  v_ids  uuid[] := coalesce(p_category_ids, '{}'::uuid[]);
  v_old  jsonb;
  v_bad  int;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'countries', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('countries', 'update');

  v_code := upper(coalesce(p_code, ''));
  IF v_code !~ '^[A-Z]{2}$' THEN RAISE EXCEPTION 'badCountryCode'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'unknownCountry';
  END IF;

  IF (SELECT count(DISTINCT u) FROM unnest(v_ids) u) <> array_length(v_ids, 1)
     AND array_length(v_ids, 1) IS NOT NULL THEN
    RAISE EXCEPTION 'duplicateCategory';
  END IF;

  SELECT count(*) INTO v_bad
    FROM unnest(v_ids) AS u(id)
   WHERE NOT EXISTS (
     SELECT 1 FROM public.categories c
      JOIN public.category_tree_pointers p ON p.child_id = c.id AND p.parent_id IS NULL
     WHERE c.id = u.id AND c.is_active);
  IF v_bad > 0 THEN RAISE EXCEPTION 'notARoot'; END IF;

  SELECT to_jsonb(array_agg(x.category_id ORDER BY x.position)) INTO v_old
    FROM public.country_root_order x WHERE x.country_code = v_code;

  DELETE FROM public.country_root_order WHERE country_code = v_code;
  INSERT INTO public.country_root_order (country_code, category_id, position, created_by)
  SELECT v_code, t.id, t.ordinality::integer, auth.uid()
    FROM unnest(v_ids) WITH ORDINALITY AS t(id, ordinality);

  PERFORM public.log_audit('country.rootOrder', 'country', v_code,
    jsonb_build_object('old', v_old, 'new', to_jsonb(v_ids)));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_country_root_order(text, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_country_root_order(text, uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_country_root_order(text, uuid[]) TO service_role;

-- (j) coverage plan ---------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_set_coverage_plan(
  p_plan text, p_max_cities integer, p_max_regions integer,
  p_max_countries integer, p_allow_everywhere boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_old public.coverage_plans;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'coverage', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('coverage', 'update');

  IF coalesce(p_plan, '') !~ '^[a-z_]{2,32}$' THEN RAISE EXCEPTION 'badPlan'; END IF;
  IF coalesce(p_max_cities, 0) < 1 OR coalesce(p_max_regions, 0) < 1
     OR coalesce(p_max_countries, 0) < 1 THEN
    RAISE EXCEPTION 'belowMinimum';
  END IF;

  SELECT * INTO v_old FROM public.coverage_plans WHERE plan = p_plan;

  INSERT INTO public.coverage_plans (plan, max_cities, max_regions, max_countries,
                                     allow_everywhere, updated_by, updated_at)
  VALUES (p_plan, p_max_cities, p_max_regions, p_max_countries,
          coalesce(p_allow_everywhere, false), auth.uid(), now())
  ON CONFLICT (plan) DO UPDATE
    SET max_cities = EXCLUDED.max_cities,
        max_regions = EXCLUDED.max_regions,
        max_countries = EXCLUDED.max_countries,
        allow_everywhere = EXCLUDED.allow_everywhere,
        updated_by = EXCLUDED.updated_by,
        updated_at = now();

  PERFORM public.log_audit('coverage.plan.update', 'coverage_plan', p_plan,
    jsonb_build_object(
      'old', CASE WHEN v_old.plan IS NULL THEN NULL ELSE jsonb_build_object(
        'max_cities', v_old.max_cities, 'max_regions', v_old.max_regions,
        'max_countries', v_old.max_countries, 'allow_everywhere', v_old.allow_everywhere) END,
      'new', jsonb_build_object(
        'max_cities', p_max_cities, 'max_regions', p_max_regions,
        'max_countries', p_max_countries,
        'allow_everywhere', coalesce(p_allow_everywhere, false))));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_coverage_plan(text, integer, integer, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_coverage_plan(text, integer, integer, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_coverage_plan(text, integer, integer, integer, boolean) TO service_role;

-- ============================================================
-- 3.5 PROOFS
-- ============================================================
-- P1 DENY — an authenticated identity holding nothing.
DO $$
DECLARE
  v_uid  text := gen_random_uuid()::text;
  v_msg  text;
  v_n    int := 0;
BEGIN
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_uid, 'role', 'authenticated')::text, true);

  BEGIN PERFORM public.admin_upsert_location(NULL, NULL, 'region', 'x', NULL, NULL, NULL, 0, NULL, NULL);
    RAISE EXCEPTION 'P1 FAILED — admin_upsert_location allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P1 FAILED — upsert_location: %', v_msg; END IF;
    v_n := v_n + 1; END;

  BEGIN PERFORM public.admin_set_location_active(gen_random_uuid(), true);
    RAISE EXCEPTION 'P1 FAILED — admin_set_location_active allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P1 FAILED — set_location_active: %', v_msg; END IF;
    v_n := v_n + 1; END;

  BEGIN PERFORM public.admin_move_location(gen_random_uuid(), gen_random_uuid());
    RAISE EXCEPTION 'P1 FAILED — admin_move_location allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P1 FAILED — move_location: %', v_msg; END IF;
    v_n := v_n + 1; END;

  BEGIN PERFORM public.admin_reorder_locations(gen_random_uuid(), ARRAY[]::uuid[]);
    RAISE EXCEPTION 'P1 FAILED — admin_reorder_locations allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P1 FAILED — reorder_locations: %', v_msg; END IF;
    v_n := v_n + 1; END;

  BEGIN PERFORM public.admin_delete_location(gen_random_uuid(), 'x');
    RAISE EXCEPTION 'P1 FAILED — admin_delete_location allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P1 FAILED — delete_location: %', v_msg; END IF;
    v_n := v_n + 1; END;

  BEGIN PERFORM public.admin_upsert_country('ZZ', 'x', 'metric', 'USD', 0);
    RAISE EXCEPTION 'P1 FAILED — admin_upsert_country allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P1 FAILED — upsert_country: %', v_msg; END IF;
    v_n := v_n + 1; END;

  BEGIN PERFORM public.admin_set_country_active('ZZ', true, false);
    RAISE EXCEPTION 'P1 FAILED — admin_set_country_active allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P1 FAILED — set_country_active: %', v_msg; END IF;
    v_n := v_n + 1; END;

  BEGIN PERFORM public.admin_set_country_root_order('ZZ', ARRAY[]::uuid[]);
    RAISE EXCEPTION 'P1 FAILED — admin_set_country_root_order allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P1 FAILED — set_country_root_order: %', v_msg; END IF;
    v_n := v_n + 1; END;

  BEGIN PERFORM public.admin_set_coverage_plan('free', 1, 1, 1, false);
    RAISE EXCEPTION 'P1 FAILED — admin_set_coverage_plan allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P1 FAILED — set_coverage_plan: %', v_msg; END IF;
    v_n := v_n + 1; END;

  PERFORM set_config('request.jwt.claims', '', true);
  IF v_n <> 9 THEN RAISE EXCEPTION 'P1 FAILED — only % doors refused', v_n; END IF;
  RAISE NOTICE 'P1 OK — all nine mutating doors refuse an unprivileged identity with permission denied';
END $$;

-- P2 permissions read-back.
DO $$
DECLARE v_n int; v_roles int;
BEGIN
  SELECT count(*) INTO v_n
    FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
   WHERE (r.name = 'locations' AND p.action IN ('view','create','update','restructure','import'))
      OR (r.name = 'countries' AND p.action IN ('view','update','activate'))
      OR (r.name = 'coverage' AND p.action IN ('view','update'));
  IF v_n <> 10 THEN RAISE EXCEPTION 'P2 FAILED — % of 10 permission rows', v_n; END IF;

  SELECT count(*) INTO v_n
    FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
   WHERE p.requires_step_up
     AND ((r.name = 'locations' AND p.action IN ('restructure','import'))
       OR (r.name = 'countries' AND p.action = 'activate')
       OR (r.name = 'coverage' AND p.action = 'update'));
  IF v_n <> 4 THEN RAISE EXCEPTION 'P2 FAILED — % of 4 step-up rows', v_n; END IF;

  SELECT count(*) INTO v_n
    FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
   WHERE p.requires_step_up
     AND ((r.name = 'locations' AND p.action IN ('view','create','update'))
       OR (r.name = 'countries' AND p.action IN ('view','update'))
       OR (r.name = 'coverage' AND p.action = 'view'));
  IF v_n <> 0 THEN RAISE EXCEPTION 'P2 FAILED — % non-step-up rows require step-up', v_n; END IF;

  SELECT count(*) INTO v_n
    FROM public.role_permissions rp
    JOIN public.permissions p ON p.id = rp.permission_id
    JOIN public.resources r ON r.id = p.resource_id
   WHERE r.name IN ('locations','countries') AND p.action = 'manage';
  IF v_n <> 0 THEN RAISE EXCEPTION 'P2 FAILED — % manage grants remain', v_n; END IF;

  -- inheritance: for every role that HELD locations:manage (audit-free proof:
  -- the grants it should now hold), assert the seven rows exist.
  SELECT count(*) INTO v_roles FROM public.roles;
  SELECT count(*) INTO v_n
    FROM public.role_permissions rp
    JOIN public.permissions p ON p.id = rp.permission_id
    JOIN public.resources r ON r.id = p.resource_id
   WHERE (r.name = 'locations' AND p.action IN ('view','create','update','restructure','import'))
      OR (r.name = 'coverage' AND p.action IN ('view','update'));
  RAISE NOTICE 'P2 OK — 10 permissions, 4 step-up, zero manage grants, % inherited locations/coverage grants across % roles', v_n, v_roles;

  SELECT count(*) INTO v_n
    FROM public.role_permissions rp
    JOIN public.permissions p ON p.id = rp.permission_id
    JOIN public.resources r ON r.id = p.resource_id
   WHERE r.name = 'countries' AND p.action IN ('view','update','activate');
  RAISE NOTICE 'P2 OK — % inherited countries grants', v_n;
END $$;

-- P3 policies read-back.
DO $$
DECLARE v_n int;
BEGIN
  SELECT count(*) INTO v_n FROM pg_policies
   WHERE schemaname = 'public' AND tablename IN ('locations','countries')
     AND (qual LIKE '%''manage''%' OR with_check LIKE '%''manage''%');
  IF v_n <> 0 THEN RAISE EXCEPTION 'P3 FAILED — % policies still name manage', v_n; END IF;

  SELECT count(*) INTO v_n FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'locations';
  IF v_n <> 4 THEN RAISE EXCEPTION 'P3 FAILED — % locations policies (expected 4)', v_n; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'locations' AND policyname = 'locations_public_read')
     OR NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'locations' AND policyname = 'locations_admin_insert')
     OR NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'locations' AND policyname = 'locations_admin_update')
     OR NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'locations' AND policyname = 'locations_admin_delete') THEN
    RAISE EXCEPTION 'P3 FAILED — the locations policy set is not the expected four';
  END IF;

  SELECT count(*) INTO v_n FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'countries';
  IF v_n <> 1 OR NOT EXISTS (SELECT 1 FROM pg_policies
        WHERE tablename = 'countries' AND policyname = 'countries_public_read') THEN
    RAISE EXCEPTION 'P3 FAILED — countries holds % policies, expected only countries_public_read', v_n;
  END IF;

  IF has_table_privilege('authenticated', 'public.countries', 'UPDATE') THEN
    RAISE EXCEPTION 'P3 FAILED — authenticated still holds UPDATE on countries';
  END IF;
  RAISE NOTICE 'P3 OK — no manage in policy, three locations write policies, countries read-only + RPC-only';
END $$;

-- P4 ACL read-back.
DO $$
DECLARE
  v_sig  text;
  v_sigs text[] := ARRAY[
    'public.location_slug_candidate(text,uuid)',
    'public.admin_list_locations(text,text,text,boolean)',
    'public.admin_upsert_location(uuid,uuid,text,text,text,text,text[],integer,double precision,double precision)',
    'public.admin_set_location_active(uuid,boolean)',
    'public.admin_move_location(uuid,uuid)',
    'public.admin_reorder_locations(uuid,uuid[])',
    'public.admin_delete_location(uuid,text)',
    'public.admin_upsert_country(text,text,text,text,integer)',
    'public.admin_set_country_active(text,boolean,boolean)',
    'public.admin_set_country_root_order(text,uuid[])',
    'public.admin_set_coverage_plan(text,integer,integer,integer,boolean)'];
  v_km double precision;
BEGIN
  FOREACH v_sig IN ARRAY v_sigs LOOP
    IF has_function_privilege('anon', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'P4 FAILED — anon holds EXECUTE on %', v_sig;
    END IF;
    IF NOT has_function_privilege('authenticated', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'P4 FAILED — authenticated lacks EXECUTE on %', v_sig;
    END IF;
  END LOOP;

  IF NOT has_function_privilege('anon',
      'public.geo_distance_km(double precision,double precision,double precision,double precision)',
      'EXECUTE') THEN
    RAISE EXCEPTION 'P4 FAILED — anon lacks EXECUTE on geo_distance_km';
  END IF;
  v_km := public.geo_distance_km(9.0320, 38.7469, 8.5400, 39.2700);
  IF v_km < 78 OR v_km > 81 THEN
    RAISE EXCEPTION 'P4 FAILED — geo_distance_km after the search_path pin returned %', v_km;
  END IF;

  RAISE NOTICE 'P4 OK — % gated functions: anon none, authenticated EXECUTE; geo_distance_km public and still % km',
    array_length(v_sigs, 1), round(v_km::numeric, 2);
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260915180000') ON CONFLICT DO NOTHING;