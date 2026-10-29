-- N1b-2b M2 (INC-977, INC-986): the public seller name, fail-closed, and the ad's public read through it.
-- 1. seller_public_alias redeclared whole: it hides whenever the name's check row is 'imitates', with no
--    text condition (INC-986: the doors store checked_text lower-cased, a legacy alias may be mixed-case).
--    The doors reset the row to 'unchecked' in the same transaction whenever the name changes, so an
--    'imitates' row belongs to the current name; any other leftover hides, the safe direction.
-- 2. public_listing_json redeclared whole from the live pg_get_functiondef (argument list unchanged);
--    only the seller block changes: both names come from the two helpers.

CREATE OR REPLACE FUNCTION public.seller_public_alias(p_profile uuid, p_subject text DEFAULT 'alias')
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
  -- One profiles primary-key read and one name_checks primary-key read. A subject this
  -- function does not know yet (the business name, D222) answers NULL: hidden, never leaked.
  SELECT pr.seller_alias
    FROM public.profiles pr
   WHERE pr.user_id = p_profile
     AND p_subject = 'alias'
     AND NOT EXISTS (
       SELECT 1 FROM public.name_checks c
        WHERE c.profile_id = p_profile AND c.subject = p_subject AND c.state = 'imitates');
$function$;
REVOKE ALL ON FUNCTION public.seller_public_alias(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.seller_public_alias(uuid, text) TO service_role;

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

  -- The seller's public line (N1b-2, INC-977): the name through seller_public_alias (NULL while its
  -- check is 'imitates'), the previous name through seller_public_previous_alias (only a 'clean' release).
  SELECT public.seller_public_alias(pr.user_id), pr.business_name, pr.seller_type, pr.created_at
    INTO v_alias, v_bname, v_stype, v_since
    FROM public.profiles pr WHERE pr.user_id = l.seller_id;
  v_prev := public.seller_public_previous_alias(l.seller_id);
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

REVOKE ALL ON FUNCTION public.public_listing_json(public.listings, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.public_listing_json(public.listings, uuid) TO service_role;

-- Proof (INC-980): one scratch e2e-n1b2 seller whose alias is then set mixed-case on its own profile (the
-- legacy shape, INC-986); the ad is an in-memory listings row, never written; the sentinel rolls it all back.
DO $proof$
DECLARE
  v_hex  text := replace(gen_random_uuid()::text, '-', '');
  v_tag  text := 'e2e-n1b2-' || substr(v_hex, 1, 12);
  v_u    uuid := gen_random_uuid();
  v_a    text := 'qz' || translate(substr(v_hex, 1, 10), '0123456789', 'ghijkmnopr');
  v_mixed text;
  v_lang text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
  v_r    jsonb;
  v_l    public.listings;
  v_j    jsonb;
  v_def  text;
BEGIN
 BEGIN
  INSERT INTO auth.users(id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_u, v_tag || '@example.invalid', '{}', 'authenticated', 'authenticated', now(), now());
  INSERT INTO public.legal_acceptances(user_id, version_id, language, method)
  SELECT v_u, v.id, v_lang, v_tag FROM public.legal_versions v WHERE v.status = 'published' AND v.effective_at <= now();
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_u, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u::text, true);
  v_r := public.save_posting_identity(p_alias => v_a);
  IF (v_r->>'ok')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'SPA proof setup: save %', v_r; END IF;
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);
  v_l := jsonb_populate_record(NULL::public.listings, jsonb_build_object('id', gen_random_uuid(), 'seller_id', v_u));

  -- SPA-2a: 'unchecked' — the ad's public read carries the name.
  v_j := public.public_listing_json(v_l, NULL);
  IF v_j->'seller'->>'alias' IS DISTINCT FROM v_a THEN RAISE EXCEPTION 'SPA-2a unchecked hidden %', v_j->'seller'; END IF;
  -- SPA-2b: 'clean' — still shown.
  PERFORM public.name_check_mark(v_u, 'alias', v_a, 'clean');
  IF public.public_listing_json(v_l, NULL)->'seller'->>'alias' IS DISTINCT FROM v_a THEN RAISE EXCEPTION 'SPA-2b clean hidden'; END IF;
  -- SPA-2c: 'imitates' — the public read carries no name, for a visitor and for the owner.
  PERFORM public.name_check_mark(v_u, 'alias', v_a, 'imitates');
  IF (public.public_listing_json(v_l, NULL)->'seller') ? 'alias' IS NOT TRUE
     OR public.public_listing_json(v_l, NULL)->'seller'->>'alias' IS NOT NULL
     OR public.public_listing_json(v_l, v_u)->'seller'->>'alias' IS NOT NULL THEN RAISE EXCEPTION 'SPA-2c imitates shown'; END IF;
  IF position(v_a IN public.public_listing_json(v_l, NULL)::text) > 0 THEN RAISE EXCEPTION 'SPA-2c name in the bytes'; END IF;
  -- SPA-1f (INC-986): the legacy mixed-case alias with an 'imitates' row on the lower-cased text answers NULL.
  v_mixed := upper(substr(v_a, 1, 1)) || substr(v_a, 2);
  UPDATE public.profiles SET seller_alias = v_mixed WHERE user_id = v_u;
  IF (SELECT seller_alias FROM public.profiles WHERE user_id = v_u) IS DISTINCT FROM v_mixed THEN RAISE EXCEPTION 'SPA-1f setup'; END IF;
  IF (SELECT checked_text FROM public.name_checks WHERE profile_id = v_u AND subject = 'alias') IS DISTINCT FROM v_a THEN RAISE EXCEPTION 'SPA-1f setup text'; END IF;
  IF public.seller_public_alias(v_u) IS NOT NULL THEN RAISE EXCEPTION 'SPA-1f mixed-case shown'; END IF;
  IF public.public_listing_json(v_l, NULL)->'seller'->>'alias' IS NOT NULL THEN RAISE EXCEPTION 'SPA-2d mixed-case shown'; END IF;

  -- SPA-5f: the ad's previous name — a legacy NULL release withheld, a 'clean' release shown.
  INSERT INTO public.alias_history(user_id, alias, alias_fold, taken_at, released_at, released_state)
    VALUES (v_u, v_a || 'p', public.name_fold(v_a || 'p'), now() - interval '3 days', now() - interval '2 days', NULL);
  IF public.public_listing_json(v_l, NULL)->'seller'->>'previous_alias' IS NOT NULL THEN RAISE EXCEPTION 'SPA-5f legacy shown'; END IF;
  UPDATE public.alias_history SET released_state = 'clean' WHERE user_id = v_u AND alias = v_a || 'p';
  IF public.public_listing_json(v_l, NULL)->'seller'->>'previous_alias' IS DISTINCT FROM v_a || 'p' THEN RAISE EXCEPTION 'SPA-5f clean hidden'; END IF;

  -- Read-back: the definitions and the closers.
  v_def := pg_get_functiondef('public.public_listing_json(public.listings, uuid)'::regprocedure);
  IF position('seller_public_alias(pr.user_id)' IN v_def) = 0 OR position('seller_public_previous_alias(l.seller_id)' IN v_def) = 0
     OR position('alias_history' IN v_def) > 0 OR position('pr.seller_alias' IN v_def) > 0 THEN RAISE EXCEPTION 'SPA-2e definition'; END IF;
  IF position('checked_text' IN pg_get_functiondef('public.seller_public_alias(uuid, text)'::regprocedure)) > 0 THEN RAISE EXCEPTION 'SPA-1g text condition'; END IF;
  IF has_function_privilege('anon', 'public.seller_public_alias(uuid, text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.seller_public_alias(uuid, text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.public_listing_json(public.listings, uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.public_listing_json(public.listings, uuid)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.public_listing_json(public.listings, uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'SPA-2f acl'; END IF;
  RAISE EXCEPTION 'M2 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M2 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u) OR EXISTS (SELECT 1 FROM public.alias_history WHERE user_id = v_u) THEN
   RAISE EXCEPTION 'M2 rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES ('20261030013000');