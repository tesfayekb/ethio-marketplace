-- Foundations turn D1, M3 — INC-949: one place predicate for every public read of places.
-- New: place_is_shown(uuid) — sql, STABLE, SECURITY INVOKER, search_path public; service_role only
-- (its callers are SECURITY DEFINER doors owned by postgres). Indexes relied on, all existing:
-- locations_pkey (id), countries_pkey (code), locations_country_idx (country_code).
-- get_location_tree redeclared whole from its live definition (2026-10-28 22:47 UTC): its WHERE
-- is the shared rule. Header unchanged: sql, STABLE, DEFINER, search_path public; ACL anon,
-- authenticated, service_role.
-- public_listing_json redeclared whole from its live definition: places.list and places.coverage
-- name only shown places; each listed place carries its ancestor path (country first). Header
-- unchanged: plpgsql, STABLE, DEFINER, search_path public; ACL service_role.
CREATE FUNCTION public.place_is_shown(p_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
  -- INC-949 — the location tree's one rule: an active place in an open market whose
  -- country anchor and ancestors are active.
  SELECT EXISTS (
    SELECT 1 FROM public.locations l
     WHERE l.id = p_id
       AND l.is_active
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
       ));
$function$;
REVOKE ALL ON FUNCTION public.place_is_shown(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.place_is_shown(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.get_location_tree(p_country_code text)
 RETURNS TABLE(id uuid, parent_id uuid, level text, slug text, iso_3166_2 text, region_id uuid, city_id uuid, display_order integer, center_lat double precision, center_lng double precision, name_en text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT l.id, l.parent_id, l.level, l.slug, l.iso_3166_2,
         l.region_id, l.city_id, l.display_order,
         l.center_lat, l.center_lng, l.name_en
    FROM public.locations l
   WHERE l.country_code = upper(p_country_code)
     -- INC-949 — the tree's one rule, shared with every public read of places.
     AND public.place_is_shown(l.id)
   ORDER BY CASE l.level
              WHEN 'country' THEN 0 WHEN 'region' THEN 1
              WHEN 'city' THEN 2 ELSE 3 END,
            l.display_order, l.name_en;
$function$;
REVOKE ALL ON FUNCTION public.get_location_tree(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_location_tree(text) TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.public_listing_json(l listings, p_viewer uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_cat      public.categories%ROWTYPE;
  v_path     jsonb;
  v_illus    text;
  v_deal     jsonb;
  v_has_unit boolean;
  v_defs     jsonb;
  v_photos   jsonb;
  v_cover    uuid;
  v_places   jsonb;
  v_coverage jsonb;
  v_country  text;
  v_seller   jsonb;
  v_alias    text;
  v_bname    text;
  v_stype    text;
  v_since    timestamptz;
  v_prev     text;
  v_channels jsonb;
  v_views    bigint;
  v_shares   bigint;
  v_saves    bigint;
  v_sold     text;
  v_unit_lbl jsonb;
BEGIN
  -- The category, its primary-parent path (root first), the nearest picture and the deal groups.
  SELECT * INTO v_cat FROM public.categories c WHERE c.id = l.category_id;
  WITH RECURSIVE up AS (
    SELECT l.category_id AS id, 0 AS depth
    UNION ALL
    SELECT public.cat_primary_parent(up.id), up.depth + 1
      FROM up
     WHERE up.depth < 12 AND public.cat_primary_parent(up.id) IS NOT NULL
  )
  SELECT coalesce(jsonb_agg(jsonb_build_object('id', c.id, 'slug', c.slug, 'name_en', c.name_en, 'name_am', c.name_am)
                            ORDER BY up.depth DESC), '[]'::jsonb),
         (SELECT c2.image_url FROM up u2 JOIN public.categories c2 ON c2.id = u2.id
           WHERE c2.image_url IS NOT NULL ORDER BY u2.depth LIMIT 1)
    INTO v_path, v_illus
    FROM up JOIN public.categories c ON c.id = up.id;
  IF v_cat.id IS NOT NULL THEN
    SELECT EXISTS (SELECT 1 FROM public.effective_category_links(l.category_id) e
                     JOIN public.attributes a ON a.id = e.attribute_id
                    WHERE a.attr_key ~ '^unit_of_sale(-|$)')
      INTO v_has_unit;
    SELECT jsonb_build_object('basis', '[]'::jsonb, 'size', '[]'::jsonb, 'quantity', '[]'::jsonb, 'terms', '[]'::jsonb)
           || coalesce(jsonb_object_agg(g.grp, g.keys), '{}'::jsonb)
      INTO v_deal
      FROM (SELECT public.deal_group(a.attr_key, v_has_unit) AS grp,
                   jsonb_agg(a.attr_key ORDER BY e.display_order, a.attr_key) AS keys
              FROM public.effective_category_links(l.category_id) e
              JOIN public.attributes a ON a.id = e.attribute_id
             WHERE public.deal_group(a.attr_key, v_has_unit) IS NOT NULL
             GROUP BY 1) g;
    -- The answered facts only, as get_posting_schema's rows, each with the records of the options the answer names.
    SELECT coalesce(jsonb_agg(row ORDER BY ord, key), '[]'::jsonb)
      INTO v_defs
      FROM (
        SELECT e.display_order AS ord, a.attr_key AS key,
               jsonb_build_object(
                 'attribute_id', a.id,
                 'attr_key', a.attr_key,
                 'attr_type', a.attr_type,
                 'name_en', a.name_en,
                 'name_am', a.name_am,
                 'help_text_en', a.help_text_en,
                 'help_text_am', a.help_text_am,
                 'is_required', e.is_required,
                 'is_filterable', e.is_filterable,
                 'display_order', e.display_order,
                 'card_rank', e.card_rank,
                 -- B19 M2 (D201 §4) — the key-facts rank, as get_posting_schema serves it.
                 'fact_rank', e.fact_rank,
                 'unit', a.unit,
                 'unit_am', a.unit_am,
                 'min_bound', a.min_bound,
                 'max_bound', a.max_bound,
                 'decimals', a.decimals,
                 'format', a.format,
                 'preset', a.preset,
                 'max_length', a.max_length,
                 'allowed_options', to_jsonb(k.allowed_options),
                 'default_value', k.default_value,
                 'visible_when', k.visible_when,
                 'option_count', 0,
                 'allow_other', false,
                 'options', coalesce((
                   SELECT jsonb_agg(o.value ORDER BY o.ordinality)
                      FROM jsonb_array_elements(
                            CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END)
                          WITH ORDINALITY o
                    WHERE o.value->>'value' IS NOT NULL
                      AND (
                        (jsonb_typeof(l.attributes -> a.attr_key) = 'string'
                         AND l.attributes ->> a.attr_key = o.value->>'value')
                        OR (jsonb_typeof(l.attributes -> a.attr_key) = 'array'
                            AND l.attributes -> a.attr_key ? (o.value->>'value'))
                      )), '[]'::jsonb)
                ) AS row
          FROM public.effective_category_links(l.category_id) e
          JOIN public.attributes a ON a.id = e.attribute_id
          JOIN public.category_attribute_links k ON k.id = e.link_id
         WHERE jsonb_typeof(l.attributes) = 'object'
           AND l.attributes ? a.attr_key
           AND jsonb_typeof(l.attributes -> a.attr_key) <> 'null'
           AND NOT (jsonb_typeof(l.attributes -> a.attr_key) = 'string' AND l.attributes ->> a.attr_key = '')
           AND NOT (jsonb_typeof(l.attributes -> a.attr_key) = 'array' AND jsonb_array_length(l.attributes -> a.attr_key) = 0)
      ) s;
  ELSE
    v_has_unit := false;
    v_deal := jsonb_build_object('basis', '[]'::jsonb, 'size', '[]'::jsonb, 'quantity', '[]'::jsonb, 'terms', '[]'::jsonb);
    v_defs := '[]'::jsonb;
  END IF;

  -- The photos a buyer may see: the public policy's own predicate (stripped, not held), in display order.
  SELECT coalesce(jsonb_agg(jsonb_build_object('id', p.id, 'display_order', p.display_order, 'paths', p.paths,
                                               'width', p.width, 'height', p.height)
                            ORDER BY p.display_order, p.created_at), '[]'::jsonb),
         (SELECT p2.id FROM public.listing_photos p2
           WHERE p2.listing_id = l.id AND p2.exif_stripped AND NOT p2.unscreened
           ORDER BY p2.display_order, p2.created_at LIMIT 1)
    INTO v_photos, v_cover
    FROM public.listing_photos p
   WHERE p.listing_id = l.id AND p.exif_stripped AND NOT p.unscreened;

  -- The places: the ad's coverage rows with their names, and the country of the primary place.
  -- INC-949 — the list and the coverage name only places the tree shows (place_is_shown),
  -- each listed place with its ancestor path (country first) for the Maps address.
  SELECT coalesce(jsonb_agg(jsonb_build_object('id', loc.id, 'name_en', loc.name_en, 'name_am', loc.name_am,
                                               'level', loc.level, 'slug', loc.slug, 'country_code', loc.country_code,
                                               'position', ll.position, 'map_visible', ll.map_visible,
                                               'path', (SELECT coalesce(jsonb_agg(jsonb_build_object(
                                                          'id', a.id, 'name_en', a.name_en, 'name_am', a.name_am,
                                                          'level', a.level, 'slug', a.slug)
                                                        ORDER BY CASE a.level WHEN 'country' THEN 0
                                                                              WHEN 'region' THEN 1 ELSE 2 END),
                                                        '[]'::jsonb)
                                                  FROM public.locations a
                                                 WHERE a.id <> loc.id
                                                   AND (a.id = loc.region_id OR a.id = loc.city_id
                                                        OR (a.level = 'country' AND a.country_code = loc.country_code))))
                            ORDER BY ll.position) FILTER (WHERE public.place_is_shown(loc.id)), '[]'::jsonb),
         coalesce(jsonb_agg(to_jsonb(loc.id) ORDER BY ll.position) FILTER (WHERE public.place_is_shown(loc.id)), '[]'::jsonb)
    INTO v_places, v_coverage
    FROM public.listing_locations ll
    JOIN public.locations loc ON loc.id = ll.location_id
   WHERE ll.listing_id = l.id;
  SELECT loc.country_code INTO v_country FROM public.locations loc WHERE loc.id = l.location_id;

  -- The seller's public line: my_seller_line's rules, keyed by the ad's seller.
  SELECT pr.seller_alias, pr.business_name, pr.seller_type, pr.created_at
    INTO v_alias, v_bname, v_stype, v_since
    FROM public.profiles pr WHERE pr.user_id = l.seller_id;
  SELECT h.alias INTO v_prev FROM public.alias_history h
   WHERE h.user_id = l.seller_id AND h.released_at IS NOT NULL
     AND h.released_at > now() - interval '365 days'
     AND h.alias_fold IS DISTINCT FROM public.name_fold(v_alias)
   ORDER BY h.released_at DESC LIMIT 1;
  v_seller := jsonb_build_object(
    'alias', v_alias,
    'business_name', CASE WHEN v_stype = 'business' THEN v_bname END,
    'previous_alias', v_prev,
    'member_since', v_since);

  -- The contact channels the seller offers — names only; the values live in reveal_listing_contact's answer.
  SELECT coalesce(jsonb_agg(to_jsonb(e.key) ORDER BY e.key), '[]'::jsonb)
    INTO v_channels
    FROM jsonb_each(CASE WHEN jsonb_typeof(l.contact_pref) = 'object' THEN l.contact_pref ELSE '{}'::jsonb END) e
   WHERE e.key IN ('phone', 'phone2', 'telegram', 'whatsapp')
     AND jsonb_typeof(e.value) = 'object'
     AND coalesce((e.value->>'show')::boolean, false);

  SELECT coalesce(sum(c.views), 0),
         coalesce(sum(c.shares_telegram + c.shares_whatsapp + c.shares_facebook + c.shares_copy + c.shares_qr), 0)
    INTO v_views, v_shares
    FROM public.listing_counters c WHERE c.listing_id = l.id;
  -- B19 M3 (D201 §8) — the public count of saves, read here as the definer: the table itself has no client read.
  SELECT count(*) INTO v_saves FROM public.saved_listings s WHERE s.listing_id = l.id;

  v_sold := CASE WHEN l.status = 'sold'
                 THEN coalesce(CASE WHEN 'rented' = ANY (coalesce(v_cat.capabilities, ARRAY[]::text[])) THEN 'rented'
                                    WHEN 'filled' = ANY (coalesce(v_cat.capabilities, ARRAY[]::text[])) THEN 'filled' END,
                               'sold') END;
  v_unit_lbl := CASE WHEN l.price_unit IS NOT NULL THEN public.price_unit_labels() -> l.price_unit END;

  RETURN jsonb_build_object(
    'public_id', l.public_id,
    'title', l.title,
    'description', l.description,
    'status', l.status,
    'is_sold', l.status = 'sold',
    'sold_at', l.sold_at,
    'sold_word', v_sold,
    'reserved', l.reserved_at IS NOT NULL,
    'published_at', l.published_at,
    'expires_at', l.expires_at,
    'renewed_at', l.renewed_at,
    'tier', l.tier,
    'photos_soon', l.photos_soon,
    'video_url', l.video_url,
    'country', v_country,
    'price', jsonb_build_object(
      'mode', l.price_mode,
      'amount', l.price_amount,
      'currency', l.price_currency,
      'period', l.price_period,
      'bp', l.price_bp,
      'negotiable', l.price_negotiable,
      'unit', l.price_unit,
      'unit_text', l.price_unit_text,
      'unit_label', v_unit_lbl,
      'was', CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END,
      'drop_at', CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_drop_at END),
    'category', CASE WHEN v_cat.id IS NULL THEN NULL ELSE jsonb_build_object(
      'id', v_cat.id,
      'slug', v_cat.slug,
      'name_en', v_cat.name_en,
      'name_am', v_cat.name_am,
      'capabilities', to_jsonb(coalesce(v_cat.capabilities, ARRAY[]::text[])),
      'illustration_url', v_illus,
      'deal', v_deal,
      'path', v_path) END,
    'attributes', CASE WHEN jsonb_typeof(l.attributes) = 'object' THEN l.attributes ELSE '{}'::jsonb END,
    'definitions', v_defs,
    'photos', v_photos,
    'cover_photo_id', v_cover,
    'places', jsonb_build_object(
      'location_id', l.location_id,
      'coverage', v_coverage,
      'list', v_places,
      'pin', CASE WHEN l.pin_show_lat IS NULL OR l.pin_show_lng IS NULL THEN NULL ELSE jsonb_build_object(
        'lat', l.pin_show_lat,
        'lng', l.pin_show_lng,
        'precision', l.pin_precision,
        'zoom', CASE WHEN l.pin_precision = 'approx' THEN NULL ELSE l.pin_zoom END) END,
      'directions', l.directions,
      'street_address', l.street_address),
    'seller', v_seller,
    'contact_channels', v_channels,
    'counts', jsonb_build_object('views', v_views, 'shares', v_shares, 'saves', v_saves),
    'viewer', jsonb_build_object('owner', p_viewer IS NOT NULL AND p_viewer = l.seller_id,
                                 'saved', p_viewer IS NOT NULL AND EXISTS (SELECT 1 FROM public.saved_listings s
                                                                            WHERE s.listing_id = l.id AND s.user_id = p_viewer)));
END $function$;
REVOKE ALL ON FUNCTION public.public_listing_json(listings, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.public_listing_json(listings, uuid) TO service_role;

-- PROOF (INC-949): a scratch market, rolled back by the sentinel.
DO $proof$
DECLARE
  v_uid  uuid := gen_random_uuid();
  v_code char(2) := 'XZ';
  v_anc  uuid; v_r1 uuid; v_r2 uuid; v_c1 uuid; v_c2 uuid; v_c3 uuid;
  v_cat  uuid;
  v_lst  uuid;
  v_doc  jsonb;
  v_ids  uuid[];
BEGIN
  IF has_function_privilege('anon', 'public.place_is_shown(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.place_is_shown(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('anon', 'public.get_location_tree(text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.public_listing_json(listings,uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.public_listing_json(listings,uuid)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.public_listing_json(listings,uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'INC-949 proof: an ACL differs';
  END IF;
  IF (SELECT p.provolatile::text || p.prosecdef::text FROM pg_proc p WHERE p.oid = 'public.place_is_shown'::regproc) <> 'sfalse'
     OR (SELECT p.provolatile::text || p.prosecdef::text FROM pg_proc p WHERE p.oid = 'public.get_location_tree'::regproc) <> 'strue'
     OR (SELECT p.provolatile::text || p.prosecdef::text FROM pg_proc p WHERE p.oid = 'public.public_listing_json'::regproc) <> 'strue' THEN
    RAISE EXCEPTION 'INC-949 proof: a header differs';
  END IF;
  IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'INC-949 proof: scratch code % already exists', v_code;
  END IF;
  BEGIN
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'E2E D1 M3', true);
    -- A new country brings its own anchor row (the countries trigger); the proof uses it.
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country';
    IF v_anc IS NULL OR (SELECT count(*) FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country') <> 1 THEN
      RAISE EXCEPTION 'INC-949 proof: the scratch market has no single anchor';
    END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E M3 R1', 'e2e-m3-r1', true, v_anc) RETURNING id INTO v_r1;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E M3 R2', 'e2e-m3-r2', true, v_anc) RETURNING id INTO v_r2;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E M3 C1', 'e2e-m3-c1', true, v_r1, 9.03, 38.74) RETURNING id INTO v_c1;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E M3 C2', 'e2e-m3-c2', false, v_r1, 9.03, 38.74) RETURNING id INTO v_c2;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E M3 C3', 'e2e-m3-c3', true, v_r2, 9.03, 38.74) RETURNING id INTO v_c3;
    -- R2 is switched off after its city is placed (the ancestry guard refuses an active
    -- city under an inactive region), so C3 is an active city whose region is off.
    UPDATE public.locations SET is_active = false WHERE id = v_r2;

    -- (d) the predicate itself.
    IF NOT public.place_is_shown(v_c1) OR public.place_is_shown(v_c2) OR public.place_is_shown(v_c3) THEN
      RAISE EXCEPTION 'INC-949 proof (d): place_is_shown C1 % C2 % C3 %',
        public.place_is_shown(v_c1), public.place_is_shown(v_c2), public.place_is_shown(v_c3);
    END IF;

    -- (a) the tree shows C1 and neither C2 nor C3.
    SELECT array_agg(t.id) INTO v_ids FROM public.get_location_tree(lower(v_code)) t;
    IF NOT (v_c1 = ANY (v_ids)) OR v_c2 = ANY (v_ids) OR v_c3 = ANY (v_ids) THEN
      RAISE EXCEPTION 'INC-949 proof (a): tree %', v_ids;
    END IF;

    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_uid, 'e2e-d1-m3-' || v_uid || '@example.invalid', '{}'::jsonb,
            'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E D1 M3 Leaf', 'e2e-d1-m3-' || substr(v_uid::text, 1, 8), true, true, true, 9999)
    RETURNING id INTO v_cat;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_uid, v_cat, 'E2E D1 M3 listing', 'scratch', v_code)
    RETURNING id INTO v_lst;
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES
      (v_lst, v_c1, 1), (v_lst, v_c2, 2), (v_lst, v_c3, 3);

    -- (b) the ad's list and coverage name C1 only.
    SELECT public.public_listing_json(x, NULL) INTO v_doc FROM public.listings x WHERE x.id = v_lst;
    IF jsonb_array_length(v_doc->'places'->'list') <> 1
       OR (v_doc->'places'->'list'->0->>'id')::uuid <> v_c1
       OR v_doc->'places'->'coverage' <> jsonb_build_array(v_c1) THEN
      RAISE EXCEPTION 'INC-949 proof (b): places %', v_doc->'places';
    END IF;

    -- (c) C1's path: the country anchor, then R1.
    IF (v_doc->'places'->'list'->0->'path'->0->>'id')::uuid IS DISTINCT FROM v_anc
       OR (v_doc->'places'->'list'->0->'path'->1->>'id')::uuid IS DISTINCT FROM v_r1
       OR jsonb_array_length(v_doc->'places'->'list'->0->'path') <> 2 THEN
      RAISE EXCEPTION 'INC-949 proof (c): path %', v_doc->'places'->'list'->0->'path';
    END IF;

    RAISE EXCEPTION 'd1-m3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m3-proof-ok' THEN RAISE; END IF;
  END;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029020000');
