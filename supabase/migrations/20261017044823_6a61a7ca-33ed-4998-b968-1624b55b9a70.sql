-- Bundle 19 turn 4 (2026-10-17). Tier A. D201 §2, §3, §9 — M1: THE AD'S PUBLIC ID, THE PUBLIC READ AND THE
-- e2e-areas: ad-page, feed, my-listings
-- COUNTERS. The product detail page (docs/governance/product-detail-page-spec.md v1) needs one key a visitor may
-- see, one read that returns only what the public RLS already allows, and counters that no client reads directly.
--
-- A. public_id: a 10-character id from the 31-symbol alphabet 23456789abcdefghjkmnpqrstuvwxyz (no 0, 1, i, l, o),
--    drawn by new_public_id() from gen_random_uuid()'s bytes with rejection sampling (no modulo bias), the column
--    backfilled for every existing row with the updated_at and feed-index triggers PAUSED for that one statement
--    (a key that changes nothing a buyer sees must not bump updated_at nor re-index every live ad), then NOT NULL,
--    DEFAULT, a unique index and a shape check. The uuid stays the key everywhere else; no column grant is added
--    (feed_page and public_listing are definers; a REST read of public_id is a later turn's decision).
-- B. listing_counters: one row per ad and day — views and five share channels. RLS on, one deny policy, no client
--    privilege: the doors below read and write it.
-- C. public_listing_json(l, p_viewer): the one builder of the public document from a listings row — the columns the
--    public RLS exposes, the price with its unit label and the 14-day "was" (as feed_page), the category with its
--    primary-parent path, nearest illustration and deal groups, the answered facts as get_posting_schema's rows
--    with the chosen options' records, the screened stripped photos, the places with the SHOWN pin only
--    (pin_show_lat/lng — rounded for an approximate pin by set_listing_pin), the seller's public line (alias,
--    business name, previous alias within 365 days, member since — my_seller_line's rules), the contact channels'
--    NAMES only, the view and share sums, and the viewer's owner flag. It never carries a phone, chat handle,
--    e-mail, the seller's user id, home_country_code, screening, or pin_lat/pin_lng. Service-role only: an
--    internal helper the two readers call.
-- D. public_listing(p_public_id): anon and authenticated (allowlisted); rate_gate('listing_read') for a signed-in
--    caller (an anonymous caller is counted by the route, by hashed address — the photo-links precedent), the
--    public predicate restated as its own WHERE (defence in depth), null for a draft, removed, expired, long-sold or
--    unknown id. VOLATILE, not STABLE: rate_gate writes a row (get_posting_schema's precedent).
--    count_listing_view(p_public_id, p_rate_key, p_viewer) and count_listing_share(p_public_id, p_channel,
--    p_rate_key, p_viewer): service-role only, called by server routes that hash the caller's address; one count per
--    address, ad (and channel) per hour through consume_rate_limit; the owner's own view is not counted; UPSERT into
--    today's bucket. listing_counts(p_listing_id): the owner's sums (views, shares by channel, contacts from
--    contact_reveals); "not your listing" otherwise (listing_reveal_count's rule).
-- E. The listing_read dial: 600 per hour per signed-in caller (ESTIMATE; set with the bench).
-- F. Proofs P1–P8 in one DO block: structure and backfill shape; the id draw; headers and grants; the counters'
--    deny as each browser role (WHERE false — nothing read); the builder on an IN-MEMORY row (no insert, no real
--    row): no contact value, no seller id, no exact coordinate for an approximate pin, the owner flag; the readers on
--    an unknown id; the dial row. RAISE EXCEPTION on any failure — a clean apply is the pass. No proof touches a
--    real row or auth.users (the backfill check reads only the shape of the new column).

-- ===== A — public_id =====
CREATE OR REPLACE FUNCTION public.new_public_id()
RETURNS text
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_alpha constant text := '23456789abcdefghjkmnpqrstuvwxyz';
  v_bytes bytea;
  v_byte  integer;
  v_out   text;
  v_i     integer;
BEGIN
  LOOP
    v_out := '';
    v_bytes := decode(replace(gen_random_uuid()::text, '-', ''), 'hex');
    v_i := 0;
    WHILE length(v_out) < 10 LOOP
      IF v_i >= 16 THEN
        v_bytes := decode(replace(gen_random_uuid()::text, '-', ''), 'hex');
        v_i := 0;
      END IF;
      v_byte := get_byte(v_bytes, v_i);
      v_i := v_i + 1;
      -- 248 = 31 × 8: a byte at or above it is drawn again, so each symbol is equally likely.
      IF v_byte < 248 THEN
        v_out := v_out || substr(v_alpha, (v_byte % 31) + 1, 1);
      END IF;
    END LOOP;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.listings l WHERE l.public_id = v_out);
  END LOOP;
  RETURN v_out;
END $$;
REVOKE ALL ON FUNCTION public.new_public_id() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.new_public_id() TO service_role;

ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS public_id text;

-- The backfill: one statement, the two triggers that fire on ANY update paused for it and re-enabled at once
-- (update_listings_updated_at — BEFORE UPDATE; feed_index_on_listing_update — AFTER UPDATE, statement level).
-- The other triggers on listings are UPDATE OF named columns and do not fire for public_id.
ALTER TABLE public.listings DISABLE TRIGGER update_listings_updated_at;
ALTER TABLE public.listings DISABLE TRIGGER feed_index_on_listing_update;
UPDATE public.listings SET public_id = public.new_public_id() WHERE public_id IS NULL;
ALTER TABLE public.listings ENABLE TRIGGER update_listings_updated_at;
ALTER TABLE public.listings ENABLE TRIGGER feed_index_on_listing_update;

ALTER TABLE public.listings
  ALTER COLUMN public_id SET NOT NULL,
  ALTER COLUMN public_id SET DEFAULT public.new_public_id();
CREATE UNIQUE INDEX IF NOT EXISTS listings_public_id_key ON public.listings (public_id);
ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_public_id_shape;
ALTER TABLE public.listings
  ADD CONSTRAINT listings_public_id_shape CHECK (public_id ~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$');

-- ===== B — listing_counters =====
CREATE TABLE IF NOT EXISTS public.listing_counters (
  listing_id      uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  day             date NOT NULL,
  views           integer NOT NULL DEFAULT 0 CHECK (views >= 0),
  shares_telegram integer NOT NULL DEFAULT 0 CHECK (shares_telegram >= 0),
  shares_whatsapp integer NOT NULL DEFAULT 0 CHECK (shares_whatsapp >= 0),
  shares_facebook integer NOT NULL DEFAULT 0 CHECK (shares_facebook >= 0),
  shares_copy     integer NOT NULL DEFAULT 0 CHECK (shares_copy >= 0),
  shares_qr       integer NOT NULL DEFAULT 0 CHECK (shares_qr >= 0),
  PRIMARY KEY (listing_id, day)
);
ALTER TABLE public.listing_counters ENABLE ROW LEVEL SECURITY;
-- No client reads or writes the buckets: the doors do. The policy states the deny; the privileges enforce it.
DROP POLICY IF EXISTS listing_counters_no_client ON public.listing_counters;
CREATE POLICY listing_counters_no_client ON public.listing_counters
  FOR SELECT TO anon, authenticated USING (false);
REVOKE ALL ON public.listing_counters FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.listing_counters TO service_role;

-- ===== C — the builder =====
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
    'counts', jsonb_build_object('views', v_views, 'shares', v_shares),
    'viewer', jsonb_build_object('owner', p_viewer IS NOT NULL AND p_viewer = l.seller_id));
END $$;
REVOKE ALL ON FUNCTION public.public_listing_json(public.listings, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.public_listing_json(public.listings, uuid) TO service_role;

-- ===== D — the doors =====
CREATE OR REPLACE FUNCTION public.public_listing(p_public_id text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_row  public.listings%ROWTYPE;
  v_rate jsonb;
BEGIN
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RETURN NULL;
  END IF;
  -- A signed-in caller is counted here; an anonymous caller is counted by the route, by hashed address.
  v_rate := public.rate_gate('listing_read');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RAISE EXCEPTION 'rateLimited';
  END IF;
  -- listings_public_read (20261015023155), restated: live, or sold within 30 days. Anything else is "not there".
  SELECT * INTO v_row FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'));
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;
  RETURN public.public_listing_json(v_row, auth.uid());
END $$;
REVOKE ALL ON FUNCTION public.public_listing(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.public_listing(text) TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.count_listing_view(p_public_id text, p_rate_key text, p_viewer uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id     uuid;
  v_seller uuid;
  v_gate   jsonb;
BEGIN
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN RETURN false; END IF;
  IF p_rate_key IS NULL OR btrim(p_rate_key) = '' THEN RAISE EXCEPTION 'rate key required'; END IF;
  SELECT l.id, l.seller_id INTO v_id, v_seller FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'));
  IF NOT FOUND THEN RETURN false; END IF;
  -- The owner's own view is not a view.
  IF p_viewer IS NOT NULL AND p_viewer = v_seller THEN RETURN false; END IF;
  -- One count per address and ad per hour: the first call in the window counts, the rest do not.
  v_gate := public.consume_rate_limit('listing_view', p_rate_key || ':' || p_public_id, 1, interval '1 hour');
  IF NOT coalesce((v_gate->>'allowed')::boolean, false) THEN RETURN false; END IF;
  INSERT INTO public.listing_counters (listing_id, day, views) VALUES (v_id, current_date, 1)
  ON CONFLICT (listing_id, day) DO UPDATE SET views = public.listing_counters.views + 1;
  RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.count_listing_view(text, text, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.count_listing_view(text, text, uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.count_listing_share(p_public_id text, p_channel text, p_rate_key text, p_viewer uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id   uuid;
  v_gate jsonb;
BEGIN
  IF p_channel IS NULL OR p_channel NOT IN ('telegram', 'whatsapp', 'facebook', 'copy', 'qr') THEN
    RAISE EXCEPTION 'unknown share channel';
  END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN RETURN false; END IF;
  IF p_rate_key IS NULL OR btrim(p_rate_key) = '' THEN RAISE EXCEPTION 'rate key required'; END IF;
  SELECT l.id INTO v_id FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'));
  IF NOT FOUND THEN RETURN false; END IF;
  v_gate := public.consume_rate_limit('listing_share', p_rate_key || ':' || p_public_id || ':' || p_channel, 1, interval '1 hour');
  IF NOT coalesce((v_gate->>'allowed')::boolean, false) THEN RETURN false; END IF;
  INSERT INTO public.listing_counters (listing_id, day, shares_telegram, shares_whatsapp, shares_facebook, shares_copy, shares_qr)
  VALUES (v_id, current_date,
          (p_channel = 'telegram')::integer, (p_channel = 'whatsapp')::integer, (p_channel = 'facebook')::integer,
          (p_channel = 'copy')::integer, (p_channel = 'qr')::integer)
  ON CONFLICT (listing_id, day) DO UPDATE SET
    shares_telegram = public.listing_counters.shares_telegram + EXCLUDED.shares_telegram,
    shares_whatsapp = public.listing_counters.shares_whatsapp + EXCLUDED.shares_whatsapp,
    shares_facebook = public.listing_counters.shares_facebook + EXCLUDED.shares_facebook,
    shares_copy     = public.listing_counters.shares_copy     + EXCLUDED.shares_copy,
    shares_qr       = public.listing_counters.shares_qr       + EXCLUDED.shares_qr;
  RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.count_listing_share(text, text, text, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.count_listing_share(text, text, text, uuid) TO service_role;

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
           'contacts', (SELECT count(*) FROM public.contact_reveals r WHERE r.listing_id = p_listing_id))
    INTO v_doc
    FROM public.listing_counters c WHERE c.listing_id = p_listing_id;
  RETURN v_doc;
END $$;
REVOKE ALL ON FUNCTION public.listing_counts(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.listing_counts(uuid) TO authenticated, service_role;

-- ===== E — the dial =====
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('listing_read', 600, 3600)
  ON CONFLICT (action) DO NOTHING;

-- ===== F — proofs =====
DO $proof$
DECLARE
  v_n      integer;
  v_i      integer;
  v_id     text;
  v_ids    text[] := ARRAY[]::text[];
  v_role   text;
  v_state  text;
  v_err    text;
  v_l      public.listings%ROWTYPE;
  v_doc    jsonb;
  v_sid    uuid := gen_random_uuid();
  v_src    text;
BEGIN
  -- P1. The column: NOT NULL, the default, the unique index, the shape check; every row holds a well-formed id;
  --     the paused triggers are enabled again.
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                  WHERE table_schema = 'public' AND table_name = 'listings' AND column_name = 'public_id'
                    AND is_nullable = 'NO' AND column_default LIKE '%new_public_id()%') THEN
    RAISE EXCEPTION 'B19T4 P1: listings.public_id is not NOT NULL with the default';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND tablename = 'listings'
                    AND indexname = 'listings_public_id_key' AND indexdef LIKE 'CREATE UNIQUE INDEX%') THEN
    RAISE EXCEPTION 'B19T4 P1: the unique index listings_public_id_key is missing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'listings_public_id_shape' AND contype = 'c') THEN
    RAISE EXCEPTION 'B19T4 P1: the shape check is missing';
  END IF;
  SELECT count(*) INTO v_n FROM public.listings l WHERE l.public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$';
  IF v_n <> 0 THEN
    RAISE EXCEPTION 'B19T4 P1: % row(s) hold an id outside the shape', v_n;
  END IF;
  SELECT count(*) INTO v_n FROM pg_trigger t
   WHERE t.tgrelid = 'public.listings'::regclass
     AND t.tgname IN ('update_listings_updated_at', 'feed_index_on_listing_update')
     AND t.tgenabled = 'O';
  IF v_n <> 2 THEN
    RAISE EXCEPTION 'B19T4 P1: the paused triggers are not both enabled (%)', v_n;
  END IF;

  -- P2. The draw: 300 ids, each ten symbols of the alphabet, all distinct.
  FOR v_i IN 1..300 LOOP
    v_id := public.new_public_id();
    IF v_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
      RAISE EXCEPTION 'B19T4 P2: new_public_id drew %', v_id;
    END IF;
    v_ids := v_ids || v_id;
  END LOOP;
  SELECT count(DISTINCT x) INTO v_n FROM unnest(v_ids) x;
  IF v_n <> 300 THEN
    RAISE EXCEPTION 'B19T4 P2: % distinct ids of 300', v_n;
  END IF;

  -- P3. Headers and grants.
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.public_listing(text)'::regprocedure
                    AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'B19T4 P3: public_listing header is not as written';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.public_listing_json(public.listings, uuid)'::regprocedure
                    AND prosecdef AND provolatile = 's' AND proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'B19T4 P3: public_listing_json header is not as written';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.listing_counts(uuid)'::regprocedure
                    AND prosecdef AND provolatile = 's' AND proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'B19T4 P3: listing_counts header is not as written';
  END IF;
  IF NOT has_function_privilege('anon', 'public.public_listing(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.public_listing(text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.public_listing_json(public.listings, uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.public_listing_json(public.listings, uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.count_listing_view(text, text, uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.count_listing_view(text, text, uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.count_listing_share(text, text, text, uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.count_listing_share(text, text, text, uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.listing_counts(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.listing_counts(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.new_public_id()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.new_public_id()', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.count_listing_view(text, text, uuid)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.count_listing_share(text, text, text, uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19T4 P3: a grant is not as written';
  END IF;
  -- The builder's body names no private column.
  SELECT prosrc INTO v_src FROM pg_proc WHERE oid = 'public.public_listing_json(public.listings, uuid)'::regprocedure;
  IF v_src LIKE '%l.pin_lat%' OR v_src LIKE '%l.pin_lng%' OR v_src LIKE '%l.home_country_code%'
     OR v_src LIKE '%l.screening%' OR v_src LIKE '%''seller_id''%' OR v_src LIKE '%contact_phone%'
     OR v_src LIKE '%contact_telegram%' OR v_src LIKE '%email%' THEN
    RAISE EXCEPTION 'B19T4 P3: the builder names a private column';
  END IF;

  -- P4. listing_counters: RLS on, the deny policy, no client privilege; as each browser role a read is refused
  --     (WHERE false — nothing is read).
  IF NOT EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.listing_counters'::regclass AND relrowsecurity) THEN
    RAISE EXCEPTION 'B19T4 P4: RLS is off on listing_counters';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'listing_counters'
                    AND policyname = 'listing_counters_no_client') THEN
    RAISE EXCEPTION 'B19T4 P4: the deny policy is missing';
  END IF;
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF has_table_privilege(v_role, 'public.listing_counters', 'SELECT')
       OR has_table_privilege(v_role, 'public.listing_counters', 'INSERT')
       OR has_table_privilege(v_role, 'public.listing_counters', 'UPDATE')
       OR has_table_privilege(v_role, 'public.listing_counters', 'DELETE') THEN
      RAISE EXCEPTION 'B19T4 P4: % holds a privilege on listing_counters', v_role;
    END IF;
    EXECUTE format('SET LOCAL ROLE %I', v_role);
    v_state := NULL;
    BEGIN
      PERFORM c.views FROM public.listing_counters c WHERE false;
    EXCEPTION WHEN OTHERS THEN
      v_state := SQLSTATE;
      v_err := SQLERRM;
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN
      RAISE EXCEPTION 'B19T4 P4: % reading listing_counters: expected 42501, got % %', v_role,
        coalesce(v_state, 'no error'), coalesce(v_err, '');
    END IF;
  END LOOP;

  -- P5. The builder on an in-memory row (nothing inserted): no contact value, no seller id, no exact coordinate for
  --     an approximate pin, the channel names only, the owner flag both ways, no category → null category.
  v_l.id := gen_random_uuid();
  v_l.seller_id := v_sid;
  v_l.category_id := gen_random_uuid();
  v_l.location_id := gen_random_uuid();
  v_l.public_id := 'zzzzzzzzzz';
  v_l.title := 'e2e-mig- proof row';
  v_l.description := 'e2e-mig- proof row';
  v_l.status := 'active';
  v_l.attributes := '{"colour": "red"}'::jsonb;
  v_l.contact_pref := '{"phone": {"show": true, "value": "+251900000099"}, "telegram": {"show": false, "value": "proofhandle"}, "messages": true}'::jsonb;
  v_l.pin_lat := 9.0123456;
  v_l.pin_lng := 38.7654321;
  v_l.pin_show_lat := 9.01;
  v_l.pin_show_lng := 38.77;
  v_l.pin_precision := 'approx';
  v_l.pin_zoom := 15;
  v_l.home_country_code := 'ET';
  v_l.price_mode := 'fixed';
  v_l.price_amount := 100;
  v_l.price_currency := 'ETB';
  v_l.price_period := 'once';
  v_l.photos_soon := false;
  v_l.tier := 'free';
  v_doc := public.public_listing_json(v_l, NULL);
  IF v_doc IS NULL OR v_doc->>'public_id' <> 'zzzzzzzzzz' THEN
    RAISE EXCEPTION 'B19T4 P5: the builder did not answer for the in-memory row';
  END IF;
  IF v_doc::text LIKE '%+251900000099%' OR v_doc::text LIKE '%proofhandle%'
     OR v_doc::text LIKE '%' || v_sid::text || '%'
     OR v_doc::text LIKE '%9.0123456%' OR v_doc::text LIKE '%38.7654321%'
     OR v_doc ? 'home_country_code' OR v_doc ? 'seller_id' OR v_doc ? 'contact_pref' THEN
    RAISE EXCEPTION 'B19T4 P5: the public document carries a private value: %', v_doc::text;
  END IF;
  IF v_doc->'places'->'pin'->>'lat' <> '9.01' OR v_doc->'places'->'pin'->>'lng' <> '38.77'
     OR v_doc->'places'->'pin'->>'precision' <> 'approx'
     OR jsonb_typeof(v_doc->'places'->'pin'->'zoom') IS DISTINCT FROM 'null' THEN
    RAISE EXCEPTION 'B19T4 P5: the approximate pin is not the shown one: %', v_doc->'places'->'pin';
  END IF;
  IF v_doc->'contact_channels' <> '["phone"]'::jsonb THEN
    RAISE EXCEPTION 'B19T4 P5: the channel names are not as expected: %', v_doc->'contact_channels';
  END IF;
  IF (v_doc->'viewer'->>'owner')::boolean THEN
    RAISE EXCEPTION 'B19T4 P5: a null viewer read as the owner';
  END IF;
  IF NOT (public.public_listing_json(v_l, v_sid)->'viewer'->>'owner')::boolean THEN
    RAISE EXCEPTION 'B19T4 P5: the seller did not read as the owner';
  END IF;
  IF (public.public_listing_json(v_l, gen_random_uuid())->'viewer'->>'owner')::boolean THEN
    RAISE EXCEPTION 'B19T4 P5: another viewer read as the owner';
  END IF;
  IF v_doc->'category' <> 'null'::jsonb OR v_doc->'definitions' <> '[]'::jsonb OR v_doc->'photos' <> '[]'::jsonb
     OR v_doc->'counts' <> '{"views": 0, "shares": 0}'::jsonb OR v_doc->>'is_sold' <> 'false' THEN
    RAISE EXCEPTION 'B19T4 P5: the empty parts are not as expected: %', v_doc::text;
  END IF;
  -- An exact pin carries its zoom and the shown coordinates equal to the pin (set_listing_pin writes them equal).
  v_l.pin_precision := 'exact';
  v_l.pin_show_lat := v_l.pin_lat;
  v_l.pin_show_lng := v_l.pin_lng;
  v_doc := public.public_listing_json(v_l, NULL);
  IF (v_doc->'places'->'pin'->>'zoom')::integer <> 15 OR (v_doc->'places'->'pin'->>'lat')::numeric <> v_l.pin_lat THEN
    RAISE EXCEPTION 'B19T4 P5: the exact pin is not as expected: %', v_doc->'places'->'pin';
  END IF;

  -- P6. The readers on an unknown or malformed id, with no session: null / false, and no rate row written.
  PERFORM set_config('request.jwt.claims', '', true);
  IF public.public_listing('zzzzzzzzzz') IS NOT NULL OR public.public_listing('ZZZZZZZZZZ') IS NOT NULL
     OR public.public_listing('zzzzzzzzz') IS NOT NULL OR public.public_listing(NULL) IS NOT NULL THEN
    RAISE EXCEPTION 'B19T4 P6: public_listing answered for an unknown or malformed id';
  END IF;
  IF public.count_listing_view('zzzzzzzzzz', 'e2e-mig-' || v_sid::text, NULL)
     OR public.count_listing_share('zzzzzzzzzz', 'copy', 'e2e-mig-' || v_sid::text, NULL) THEN
    RAISE EXCEPTION 'B19T4 P6: a counter counted an unknown id';
  END IF;
  IF EXISTS (SELECT 1 FROM public.rate_limits r WHERE r.key LIKE 'e2e-mig-' || v_sid::text || '%') THEN
    RAISE EXCEPTION 'B19T4 P6: a rate row was written for an unknown id';
  END IF;
  v_state := NULL;
  BEGIN
    PERFORM public.count_listing_share('zzzzzzzzzz', 'email', 'e2e-mig-' || v_sid::text, NULL);
  EXCEPTION WHEN OTHERS THEN
    v_state := SQLERRM;
  END;
  IF v_state IS DISTINCT FROM 'unknown share channel' THEN
    RAISE EXCEPTION 'B19T4 P6: an unknown channel was not refused (%)', coalesce(v_state, 'no error');
  END IF;

  -- P7. listing_counts with no session is refused at the first gate.
  v_state := NULL;
  BEGIN
    PERFORM public.listing_counts(gen_random_uuid());
  EXCEPTION WHEN OTHERS THEN
    v_state := SQLERRM;
  END;
  IF v_state IS DISTINCT FROM 'not authenticated' THEN
    RAISE EXCEPTION 'B19T4 P7: listing_counts without a session: %', coalesce(v_state, 'no error');
  END IF;

  -- P8. The dial.
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials d WHERE d.action = 'listing_read' AND d.max_count = 600 AND d.window_seconds = 3600) THEN
    RAISE EXCEPTION 'B19T4 P8: the listing_read dial is not as written';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018130000') ON CONFLICT (version) DO NOTHING;
