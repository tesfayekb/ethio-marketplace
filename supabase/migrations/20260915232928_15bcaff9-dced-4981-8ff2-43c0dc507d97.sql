-- =============================================================================
-- LOCATIONS ERA L2b-M — countries, database side.
-- Purpose: (1) admin_list_locations re-declared WHOLE so a NULL country means
--          every country (the "All countries" roster); (2) a country row's
--          anchor location is born INACTIVE at creation via trigger, and
--          backfilled for existing anchor-less countries; (3) admin_list_countries
--          — the console's countries roster read.
-- locations-era-spec §5 + operator rulings 2026-09-15; INC-183 law (whole
-- re-declaration); DEC-022: declared mark 20260916000000
-- =============================================================================

-- ---------------------------------------------------------------------------
-- BEFORE-STATE capture (INC-200 pattern): every function this migration must
-- leave untouched, with its body hash and ACL.
-- ---------------------------------------------------------------------------
CREATE TEMP TABLE l2bm_before AS
SELECT p.proname, md5(p.prosrc) AS body_md5, coalesce(p.proacl::text, '') AS acl
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
 WHERE n.nspname = 'public'
   AND p.proname IN ('admin_upsert_location','admin_set_location_active',
                     'admin_move_location','admin_reorder_locations',
                     'admin_delete_location','admin_upsert_country',
                     'admin_set_country_active','admin_set_country_root_order',
                     'admin_set_coverage_plan','admin_commit_location_import',
                     'admin_undo_location_import','admin_preview_location_import',
                     'admin_export_locations','loc_import_plan','get_location_tree');

DO $$
BEGIN
  IF (SELECT count(*) FROM l2bm_before) <> 15 THEN
    RAISE EXCEPTION 'before-state capture expected 15 functions, found %',
      (SELECT count(*) FROM l2bm_before);
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 2.1  admin_list_locations — re-declared WHOLE (INC-183). One change only:
--      p_country_code IS NULL means EVERY country; a non-null code behaves
--      exactly as before (upper-cased, filtered). With a NULL scope the roster
--      is grouped by country so it stays readable.
-- ---------------------------------------------------------------------------
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
   WHERE (p_country_code IS NULL OR l.country_code = upper(p_country_code))
     AND (p_level IS NULL OR l.level = p_level)
     AND (p_active IS NULL OR l.is_active = p_active)
     AND (
       p_search IS NULL OR p_search = ''
       OR l.name_en ILIKE '%' || p_search || '%'
       OR l.slug ILIKE '%' || p_search || '%'
       OR EXISTS (SELECT 1 FROM unnest(l.aliases) al WHERE al ILIKE '%' || p_search || '%')
     )
   ORDER BY l.country_code,
            CASE l.level WHEN 'country' THEN 0 WHEN 'region' THEN 1
                         WHEN 'city' THEN 2 ELSE 3 END,
            l.display_order, l.name_en;
END $$;

REVOKE ALL ON FUNCTION public.admin_list_locations(text, text, text, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_locations(text, text, text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_locations(text, text, text, boolean) TO service_role;

-- ---------------------------------------------------------------------------
-- 2.2  countries_anchor_on_insert — every creation path gets its anchor.
--      The anchor is born INACTIVE: a closed country must be usable in the
--      console before it opens (places prepared under it stay hidden by the
--      path rule). Opening a market activates the anchor — that is
--      admin_set_country_active's job and it needs no change.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.countries_anchor_on_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.locations l
     WHERE l.country_code = NEW.code AND l.level = 'country'
  ) THEN
    INSERT INTO public.locations
      (parent_id, level, country_code, name_en, slug, source, is_active,
       display_order, aliases)
    VALUES
      (NULL, 'country', NEW.code, NEW.name_en,
       public.location_slug_candidate(NEW.name_en, NULL),
       'admin', false, 0, '{}'::text[]);
  END IF;
  RETURN NEW;
END $$;

COMMENT ON FUNCTION public.countries_anchor_on_insert() IS
  'A country row is born with an INACTIVE country-level location anchor: a closed country must be usable in the console before it opens (places prepared under it stay hidden by the path rule). Opening the market activates the anchor via admin_set_country_active.';

REVOKE ALL ON FUNCTION public.countries_anchor_on_insert() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS countries_anchor_on_insert ON public.countries;
CREATE TRIGGER countries_anchor_on_insert
AFTER INSERT ON public.countries
FOR EACH ROW EXECUTE FUNCTION public.countries_anchor_on_insert();

-- ---------------------------------------------------------------------------
-- 2.3  BACKFILL — every existing country without an anchor gets an inactive one.
-- ---------------------------------------------------------------------------
INSERT INTO public.locations
  (parent_id, level, country_code, name_en, slug, source, is_active,
   display_order, aliases)
SELECT NULL, 'country', c.code, c.name_en,
       public.location_slug_candidate(c.name_en, NULL),
       'admin', false, 0, '{}'::text[]
  FROM public.countries c
 WHERE NOT EXISTS (
   SELECT 1 FROM public.locations l
    WHERE l.country_code = c.code AND l.level = 'country'
 );

DO $$
DECLARE v_countries integer; v_anchors integer;
BEGIN
  SELECT count(*) INTO v_countries FROM public.countries;
  SELECT count(*) INTO v_anchors FROM public.locations WHERE level = 'country';
  IF v_countries <> v_anchors THEN
    RAISE EXCEPTION 'backfill incomplete: % countries vs % anchors', v_countries, v_anchors;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 2.4  admin_list_countries — the console's countries roster.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_list_countries()
RETURNS TABLE (
  code char(2), name_en text, is_active boolean, unit_system text,
  currency_code char(3), display_order integer, updated_at timestamptz,
  anchor_id uuid, anchor_active boolean, place_count integer,
  active_place_count integer, scoped_role_count integer, root_order text[])
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'countries', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT c.code, c.name_en, c.is_active, c.unit_system, c.currency_code,
         c.display_order, c.updated_at,
         a.id AS anchor_id,
         coalesce(a.is_active, false) AS anchor_active,
         (SELECT count(*)::integer FROM public.locations l
           WHERE l.country_code = c.code AND l.level <> 'country'),
         (SELECT count(*)::integer FROM public.locations l
           WHERE l.country_code = c.code AND l.level <> 'country' AND l.is_active),
         (SELECT count(*)::integer FROM public.user_roles ur
           WHERE ur.scope_country = c.code),
         coalesce((
           SELECT array_agg(cat.slug ORDER BY cro.position)
             FROM public.country_root_order cro
             JOIN public.categories cat ON cat.id = cro.category_id
            WHERE cro.country_code = c.code
         ), '{}'::text[])
    FROM public.countries c
    LEFT JOIN public.locations a
      ON a.country_code = c.code AND a.level = 'country'
   ORDER BY c.is_active DESC, c.display_order, c.name_en;
END $$;

REVOKE ALL ON FUNCTION public.admin_list_countries() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_countries() TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_countries() TO service_role;

-- ---------------------------------------------------------------------------
-- 2.5  PROOFS
-- ---------------------------------------------------------------------------

-- P1 — the trigger creates an inactive anchor for a scratch country.
DO $$
DECLARE v_id uuid; v_active boolean; v_slug text; v_source text;
BEGIN
  INSERT INTO public.countries (code, name_en, is_active)
  VALUES ('ZQ', 'E2E-Scratch-ZQ', false);

  SELECT l.id, l.is_active, l.slug, l.source INTO v_id, v_active, v_slug, v_source
    FROM public.locations l
   WHERE l.country_code = 'ZQ' AND l.level = 'country';

  IF v_id IS NULL THEN
    RAISE EXCEPTION 'P1 failed: no anchor created for the scratch country';
  END IF;
  IF v_active THEN
    RAISE EXCEPTION 'P1 failed: anchor was created ACTIVE';
  END IF;
  IF v_slug <> 'e2e-scratch-zq' THEN
    RAISE EXCEPTION 'P1 failed: slug is % (expected e2e-scratch-zq)', v_slug;
  END IF;
  IF v_source <> 'admin' THEN
    RAISE EXCEPTION 'P1 failed: source is % (expected admin)', v_source;
  END IF;

  DELETE FROM public.locations WHERE id = v_id;
  DELETE FROM public.countries WHERE code = 'ZQ';

  IF EXISTS (SELECT 1 FROM public.countries WHERE code = 'ZQ')
     OR EXISTS (SELECT 1 FROM public.locations WHERE country_code = 'ZQ') THEN
    RAISE EXCEPTION 'P1 failed: scratch rows survived cleanup';
  END IF;
  RAISE NOTICE 'P1 OK: trigger creates one inactive anchor; scratch cleaned.';
END $$;

-- P2 — backfill: count equality, and each seeded closed country has exactly
--      one INACTIVE anchor.
DO $$
DECLARE v_code text; v_n integer; v_active_n integer;
BEGIN
  IF (SELECT count(*) FROM public.countries)
     <> (SELECT count(*) FROM public.locations WHERE level = 'country') THEN
    RAISE EXCEPTION 'P2 failed: country/anchor counts differ';
  END IF;
  FOREACH v_code IN ARRAY ARRAY['CA','DE','GB','KE'] LOOP
    SELECT count(*), count(*) FILTER (WHERE l.is_active) INTO v_n, v_active_n
      FROM public.locations l
     WHERE l.country_code = v_code AND l.level = 'country';
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'P2 failed: % has % anchors (expected 1)', v_code, v_n;
    END IF;
    IF v_active_n <> 0 THEN
      RAISE EXCEPTION 'P2 failed: %s anchor is active', v_code;
    END IF;
  END LOOP;
  RAISE NOTICE 'P2 OK: counts equal; CA/DE/GB/KE each hold one inactive anchor.';
END $$;

-- P3 — deny paths. A caller with no permission is refused by both reads.
DO $$
DECLARE v_msg text; v_denied integer := 0;
BEGIN
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', '00000000-0000-0000-0000-0000000000ff',
                      'role', 'authenticated')::text, true);
  BEGIN
    PERFORM * FROM public.admin_list_countries();
    RAISE EXCEPTION 'P3 failed: admin_list_countries did not refuse';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN
      RAISE EXCEPTION 'P3 failed: admin_list_countries raised "%"', v_msg;
    END IF;
    v_denied := v_denied + 1;
  END;
  BEGIN
    PERFORM * FROM public.admin_list_locations(NULL);
    RAISE EXCEPTION 'P3 failed: admin_list_locations did not refuse';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN
      RAISE EXCEPTION 'P3 failed: admin_list_locations raised "%"', v_msg;
    END IF;
    v_denied := v_denied + 1;
  END;
  PERFORM set_config('request.jwt.claims', NULL, true);
  IF v_denied <> 2 THEN
    RAISE EXCEPTION 'P3 failed: % refusals (expected 2)', v_denied;
  END IF;
  RAISE NOTICE 'P3 OK: both reads raise exactly "permission denied".';
END $$;

-- P4 — read-back: nothing else moved.
DO $$
DECLARE v_drift text;
BEGIN
  SELECT string_agg(b.proname, ', ') INTO v_drift
    FROM l2bm_before b
    JOIN pg_proc p ON p.proname = b.proname
    JOIN pg_namespace n ON n.oid = p.pronamespace AND n.nspname = 'public'
   WHERE md5(p.prosrc) <> b.body_md5
      OR coalesce(p.proacl::text, '') <> b.acl;
  IF v_drift IS NOT NULL THEN
    RAISE EXCEPTION 'P4 failed: unexpected drift in %', v_drift;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
     WHERE t.tgrelid = 'public.countries'::regclass
       AND t.tgname = 'countries_anchor_on_insert'
       AND NOT t.tgisinternal
  ) THEN
    RAISE EXCEPTION 'P4 failed: trigger countries_anchor_on_insert missing';
  END IF;

  IF has_function_privilege('anon', 'public.admin_list_countries()', 'EXECUTE') THEN
    RAISE EXCEPTION 'P4 failed: anon holds EXECUTE on admin_list_countries';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_list_countries()', 'EXECUTE') THEN
    RAISE EXCEPTION 'P4 failed: authenticated lacks EXECUTE on admin_list_countries';
  END IF;
  IF has_function_privilege('anon', 'public.admin_list_locations(text,text,text,boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P4 failed: anon holds EXECUTE on admin_list_locations';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_list_locations(text,text,text,boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P4 failed: authenticated lacks EXECUTE on admin_list_locations';
  END IF;
  IF has_function_privilege('anon', 'public.countries_anchor_on_insert()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.countries_anchor_on_insert()', 'EXECUTE') THEN
    RAISE EXCEPTION 'P4 failed: trigger function is executable by a client role';
  END IF;
  RAISE NOTICE 'P4 OK: 15 functions unchanged; trigger present; ACLs correct.';
END $$;

DROP TABLE l2bm_before;

-- 2.6  Self-mark (DEC-022).
INSERT INTO public.migration_marks(version) VALUES ('20260916000000') ON CONFLICT DO NOTHING;
