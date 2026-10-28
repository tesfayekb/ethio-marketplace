-- Foundations turn D1, M3b — INC-949 follow-up (ruling on stop 3).
-- (1) The one rule as a view the planner sees through: public.shown_locations (security_invoker,
--     service_role only). get_location_tree selects from it; place_is_shown is EXISTS over it
--     (header and grant unchanged). public_listing_json is unchanged (its FILTERs call place_is_shown).
-- (2) One country anchor per market: locations_one_anchor_per_country.
CREATE VIEW public.shown_locations WITH (security_invoker = true) AS
  -- INC-949 — the location tree's one rule: an active place in an open market whose
  -- country anchor and ancestors are active.
  SELECT l.*
    FROM public.locations l
   WHERE l.is_active
     AND EXISTS (SELECT 1 FROM public.countries k
                  WHERE k.code = l.country_code AND k.is_active)
     AND EXISTS (SELECT 1 FROM public.locations a
                  WHERE a.country_code = l.country_code
                    AND a.level = 'country' AND a.is_active)
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
     );
REVOKE ALL ON public.shown_locations FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.shown_locations TO service_role;

CREATE OR REPLACE FUNCTION public.place_is_shown(p_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
  -- INC-949 — the one rule lives in public.shown_locations.
  SELECT EXISTS (SELECT 1 FROM public.shown_locations s WHERE s.id = p_id);
$function$;
REVOKE ALL ON FUNCTION public.place_is_shown(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.place_is_shown(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.get_location_tree(p_country_code text)
 RETURNS TABLE(id uuid, parent_id uuid, level text, slug text, iso_3166_2 text, region_id uuid, city_id uuid, display_order integer, center_lat double precision, center_lng double precision, name_en text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  -- INC-949 — the tree's one rule, shared with every public read of places (shown_locations).
  SELECT l.id, l.parent_id, l.level, l.slug, l.iso_3166_2,
         l.region_id, l.city_id, l.display_order,
         l.center_lat, l.center_lng, l.name_en
    FROM public.shown_locations l
   WHERE l.country_code = upper(p_country_code)
   ORDER BY CASE l.level
              WHEN 'country' THEN 0 WHEN 'region' THEN 1
              WHEN 'city' THEN 2 ELSE 3 END,
            l.display_order, l.name_en;
$function$;
REVOKE ALL ON FUNCTION public.get_location_tree(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_location_tree(text) TO anon, authenticated, service_role;

CREATE UNIQUE INDEX locations_one_anchor_per_country
  ON public.locations (country_code) WHERE level = 'country';

-- PROOF (INC-949 / M3b): a scratch market, rolled back by the sentinel.
DO $proof$
DECLARE
  v_uid  uuid := gen_random_uuid();
  v_code char(2) := 'XZ';
  v_anc  uuid; v_r1 uuid; v_r2 uuid; v_c1 uuid; v_c2 uuid; v_c3 uuid;
  v_cat  uuid;
  v_lst  uuid;
  v_doc  jsonb;
  v_ids  uuid[];
  v_dup  boolean := false;
BEGIN
  IF has_table_privilege('anon', 'public.shown_locations', 'SELECT')
     OR has_table_privilege('authenticated', 'public.shown_locations', 'SELECT')
     OR NOT has_table_privilege('service_role', 'public.shown_locations', 'SELECT')
     OR has_function_privilege('anon', 'public.place_is_shown(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.place_is_shown(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('anon', 'public.get_location_tree(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'M3b proof: an ACL differs';
  END IF;
  IF (SELECT p.provolatile::text || p.prosecdef::text FROM pg_proc p WHERE p.oid = 'public.place_is_shown'::regproc) <> 'sfalse'
     OR (SELECT p.provolatile::text || p.prosecdef::text FROM pg_proc p WHERE p.oid = 'public.get_location_tree'::regproc) <> 'strue'
     OR NOT EXISTS (SELECT 1 FROM pg_class c WHERE c.oid = 'public.shown_locations'::regclass
                     AND 'security_invoker=true' = ANY (c.reloptions)) THEN
    RAISE EXCEPTION 'M3b proof: a header differs';
  END IF;
  IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'M3b proof: scratch code % already exists', v_code;
  END IF;
  BEGIN
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'E2E D1 M3b', true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'M3b proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc;

    -- (e) a second anchor for the market is refused.
    BEGIN
      INSERT INTO public.locations (level, country_code, name_en, slug, is_active)
      VALUES ('country', v_code, 'E2E M3b Second', 'e2e-m3b-second', true);
    EXCEPTION WHEN unique_violation THEN v_dup := true;
    END;
    IF NOT v_dup THEN RAISE EXCEPTION 'M3b proof (e): a second anchor was stored'; END IF;

    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E M3b R1', 'e2e-m3b-r1', true, v_anc) RETURNING id INTO v_r1;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E M3b R2', 'e2e-m3b-r2', true, v_anc) RETURNING id INTO v_r2;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E M3b C1', 'e2e-m3b-c1', true, v_r1, 9.03, 38.74) RETURNING id INTO v_c1;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E M3b C2', 'e2e-m3b-c2', false, v_r1, 9.03, 38.74) RETURNING id INTO v_c2;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E M3b C3', 'e2e-m3b-c3', true, v_r2, 9.03, 38.74) RETURNING id INTO v_c3;
    UPDATE public.locations SET is_active = false WHERE id = v_r2;

    -- (d) the predicate.
    IF NOT public.place_is_shown(v_c1) OR public.place_is_shown(v_c2) OR public.place_is_shown(v_c3) THEN
      RAISE EXCEPTION 'M3b proof (d): place_is_shown differs';
    END IF;
    -- (a) the tree.
    SELECT array_agg(t.id) INTO v_ids FROM public.get_location_tree(lower(v_code)) t;
    IF NOT (v_c1 = ANY (v_ids)) OR NOT (v_anc = ANY (v_ids)) OR NOT (v_r1 = ANY (v_ids))
       OR v_c2 = ANY (v_ids) OR v_c3 = ANY (v_ids) OR v_r2 = ANY (v_ids) THEN
      RAISE EXCEPTION 'M3b proof (a): tree %', v_ids;
    END IF;

    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_uid, 'e2e-d1-m3b-' || v_uid || '@example.invalid', '{}'::jsonb,
            'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E D1 M3b Leaf', 'e2e-d1-m3b-' || substr(v_uid::text, 1, 8), true, true, true, 9999)
    RETURNING id INTO v_cat;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_uid, v_cat, 'E2E D1 M3b listing', 'scratch', v_code)
    RETURNING id INTO v_lst;
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES
      (v_lst, v_c1, 1), (v_lst, v_c2, 2), (v_lst, v_c3, 3);

    -- (b)/(c) the ad's list, coverage and path.
    SELECT public.public_listing_json(x, NULL) INTO v_doc FROM public.listings x WHERE x.id = v_lst;
    IF jsonb_array_length(v_doc->'places'->'list') <> 1
       OR (v_doc->'places'->'list'->0->>'id')::uuid <> v_c1
       OR v_doc->'places'->'coverage' <> jsonb_build_array(v_c1)
       OR jsonb_array_length(v_doc->'places'->'list'->0->'path') <> 2
       OR (v_doc->'places'->'list'->0->'path'->0->>'id')::uuid IS DISTINCT FROM v_anc
       OR (v_doc->'places'->'list'->0->'path'->1->>'id')::uuid IS DISTINCT FROM v_r1 THEN
      RAISE EXCEPTION 'M3b proof (b/c): places %', v_doc->'places';
    END IF;

    RAISE EXCEPTION 'd1-m3b-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m3b-proof-ok' THEN RAISE; END IF;
  END;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029030000');
