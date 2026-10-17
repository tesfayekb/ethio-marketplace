-- Bundle 19 turn 12 (2026-10-17). Tier A. D201 §8 — M3 PART b OF TWO: THE PUBLIC DOCUMENT AND THE OWNER'S COUNTS CARRY THE SAVES.
-- e2e-areas: ad-page, my-listings
-- Two doors redeclared WHOLE from their last declarations, header attributes kept, argument lists unchanged, grants
-- restated: public_listing_json [last declared 20261017091554, M2 part b] — counts gain saves (read here as the definer:
-- saved_listings has no client read), viewer gains saved (true only for a signed-in viewer who saved);
-- listing_counts [20261017044823, M1] — the owner's sums gain saves.
-- BODY PROOFS (DEC-190): a body is proven by its FINGERPRINT — md5 of the text with carriage returns and `--` comments
-- removed and, outside single-quoted literals, every run of whitespace collapsed to one space — so spacing a typed
-- submission may change never refuses the apply, while any changed token or literal does; headers proven as before.
-- Proofs P1–P3, RAISE EXCEPTION on any failure: part a landed; both bodies by fingerprint and header; the grants; the
-- builder on an in-memory row (nothing inserted) answers saves 0 and saved false, for no viewer and for a stranger.
-- The mark 20261018170100.
-- Applied on ethio-prod by the executor's migration tool (DEC-188), part a then part b, nothing between them; the
-- operator applies both saved files on ethio-staging in order and reads back the two marks. No lock on a hot table.

-- ===== A — part a must have landed =====
DO $gate$
BEGIN
  IF to_regclass('public.saved_listings') IS NULL THEN
    RAISE EXCEPTION 'B19M3b: part a (mark 20261018170000) has not landed — apply it first';
  END IF;
END $gate$;

-- ===== B — the two readers, whole =====
CREATE OR REPLACE FUNCTION public.public_listing_json(l public.listings, p_viewer uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
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
  SELECT coalesce(jsonb_agg(jsonb_build_object('id', loc.id, 'name_en', loc.name_en, 'name_am', loc.name_am,
                                               'level', loc.level, 'slug', loc.slug, 'country_code', loc.country_code,
                                               'position', ll.position, 'map_visible', ll.map_visible)
                            ORDER BY ll.position), '[]'::jsonb),
         coalesce(jsonb_agg(to_jsonb(loc.id) ORDER BY ll.position), '[]'::jsonb)
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
END $$;
REVOKE ALL ON FUNCTION public.public_listing_json(public.listings, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.public_listing_json(public.listings, uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.listing_counts(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_doc jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings l WHERE l.id = p_listing_id AND l.seller_id = v_uid) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  SELECT jsonb_build_object(
           'views', coalesce(sum(c.views), 0),
           'shares', coalesce(sum(c.shares_telegram + c.shares_whatsapp + c.shares_facebook + c.shares_copy + c.shares_qr), 0),
           'shares_by_channel', jsonb_build_object(
             'telegram', coalesce(sum(c.shares_telegram), 0),
             'whatsapp', coalesce(sum(c.shares_whatsapp), 0),
             'facebook', coalesce(sum(c.shares_facebook), 0),
             'copy', coalesce(sum(c.shares_copy), 0),
             'qr', coalesce(sum(c.shares_qr), 0)),
           'contacts', (SELECT count(*) FROM public.contact_reveals r WHERE r.listing_id = p_listing_id),
           -- B19 M3 (D201 §8) — the owner's count of saves.
           'saves', (SELECT count(*) FROM public.saved_listings s WHERE s.listing_id = p_listing_id))
    INTO v_doc
    FROM public.listing_counters c WHERE c.listing_id = p_listing_id;
  RETURN v_doc;
END $$;
REVOKE ALL ON FUNCTION public.listing_counts(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.listing_counts(uuid) TO authenticated, service_role;

-- ===== C — proofs =====
DO $proof$
DECLARE
  v_fp text; v_vol "char"; v_def boolean; v_cfg text;
  v_l   public.listings%ROWTYPE;
  v_doc jsonb;
BEGIN
  -- P1. Both bodies landed (fingerprint), with their headers.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.public_listing_json(public.listings, uuid)'::regprocedure;
  IF v_fp <> '8981f0ae17e422dbea21cfc4f4a2de92' THEN RAISE EXCEPTION 'B19M3b P1: public_listing_json body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M3b P1: public_listing_json header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef, coalesce(array_to_string(p.proconfig, ','), '')
    INTO v_fp, v_vol, v_def, v_cfg FROM pg_proc p WHERE p.oid = 'public.listing_counts(uuid)'::regprocedure;
  IF v_fp <> 'ada3822c17dd477b485bd5516c45f821' THEN RAISE EXCEPTION 'B19M3b P1: listing_counts body is not the one written (fingerprint %)', v_fp; END IF;
  IF v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M3b P1: listing_counts header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  -- P2. The grants.
  IF has_function_privilege('anon', 'public.public_listing_json(public.listings, uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.public_listing_json(public.listings, uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.listing_counts(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.listing_counts(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19M3b P2: the grants are not as written';
  END IF;
  -- P3. The builder on an in-memory row (nothing inserted): saves 0, saved false for no viewer and for a stranger.
  v_l.id := gen_random_uuid();
  v_l.seller_id := gen_random_uuid();
  v_l.category_id := gen_random_uuid();
  v_l.location_id := gen_random_uuid();
  v_l.public_id := 'zzzzzzzzzz';
  v_l.title := 'e2e-mig- proof row';
  v_l.description := 'e2e-mig- proof row';
  v_l.status := 'active';
  v_l.attributes := '{}'::jsonb;
  v_l.contact_pref := '{}'::jsonb;
  v_l.home_country_code := 'ET';
  v_l.price_mode := 'contact';
  v_l.photos_soon := false;
  v_l.tier := 'free';
  v_doc := public.public_listing_json(v_l, NULL);
  IF v_doc IS NULL OR (v_doc->'counts'->>'saves')::bigint <> 0 OR (v_doc->'viewer'->>'saved')::boolean THEN
    RAISE EXCEPTION 'B19M3b P3: the builder does not answer saves 0 / saved false (%)', v_doc->'counts';
  END IF;
  IF (public.public_listing_json(v_l, gen_random_uuid())->'viewer'->>'saved')::boolean THEN
    RAISE EXCEPTION 'B19M3b P3: a stranger reads as having saved';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018170100') ON CONFLICT (version) DO NOTHING;