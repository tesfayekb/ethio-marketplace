-- bundle 3 M1 — the door counts; private columns leave the public surface.
-- e2e-areas: posting, feed, routes

CREATE TABLE public.rate_dials (
  action text PRIMARY KEY,
  max_count integer NOT NULL CHECK (max_count >= 1),
  window_seconds integer NOT NULL CHECK (window_seconds > 0)
);
REVOKE ALL ON public.rate_dials FROM anon, authenticated;
GRANT ALL ON public.rate_dials TO service_role;
ALTER TABLE public.rate_dials ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.rate_overrides (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action text NOT NULL REFERENCES public.rate_dials(action) ON DELETE CASCADE,
  max_count integer NOT NULL CHECK (max_count >= 1),
  PRIMARY KEY (user_id, action)
);
REVOKE ALL ON public.rate_overrides FROM anon, authenticated;
GRANT ALL ON public.rate_overrides TO service_role;
ALTER TABLE public.rate_overrides ENABLE ROW LEVEL SECURITY;

INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES
  ('draft', 600, 3600),
  ('post', 20, 3600),
  ('geocode', 60, 3600),
  ('upload', 60, 3600),
  ('assist:listing', 30, 3600),
  ('contact_reveal', 30, 86400),
  ('schema_read', 60, 3600);

CREATE OR REPLACE FUNCTION public.rate_gate(p_action text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_dial  public.rate_dials%ROWTYPE;
  v_limit integer;
  v_start timestamptz;
  v_count integer;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('allowed', true, 'remaining', NULL, 'resets_at', NULL);
  END IF;
  SELECT * INTO v_dial FROM public.rate_dials WHERE action = p_action;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown rate dial: %', p_action;
  END IF;
  SELECT o.max_count INTO v_limit
    FROM public.rate_overrides o
   WHERE o.user_id = v_uid AND o.action = p_action;
  v_limit := coalesce(v_limit, v_dial.max_count);
  v_start := to_timestamp(floor(extract(epoch from clock_timestamp()) / v_dial.window_seconds) * v_dial.window_seconds);

  INSERT INTO public.rate_limits (key, action, window_start, count)
  VALUES (v_uid::text, p_action, v_start, 1)
  ON CONFLICT (key, action, window_start)
  DO UPDATE SET count = public.rate_limits.count + 1
  RETURNING count INTO v_count;

  RETURN jsonb_build_object(
    'allowed', v_count <= v_limit,
    'remaining', greatest(v_limit - v_count, 0),
    'resets_at', v_start + make_interval(secs => v_dial.window_seconds)
  );
END $function$;
REVOKE EXECUTE ON FUNCTION public.rate_gate(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rate_gate(text) TO service_role;

REVOKE EXECUTE ON FUNCTION public.consume_rate_limit(text, text, integer, interval) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_rate_limit(text, text, integer, interval) TO service_role;

REVOKE EXECUTE ON FUNCTION public.residency_country_for(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.residency_country_for(uuid, text) TO service_role;

ALTER TABLE public.listings
  ADD COLUMN pin_show_lat numeric,
  ADD COLUMN pin_show_lng numeric;

CREATE OR REPLACE FUNCTION public.set_listing_pin(p_listing_id uuid, p_lat numeric DEFAULT NULL::numeric, p_lng numeric DEFAULT NULL::numeric, p_precision text DEFAULT NULL::text, p_street text DEFAULT NULL::text, p_zoom smallint DEFAULT NULL::smallint, p_directions text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_row    public.listings%ROWTYPE;
  v_lat    numeric;
  v_lng    numeric;
  v_prec   text;
  v_street text;
  v_dirs   text;
  v_zoom   smallint;
  v_before jsonb;
  v_after  jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  SELECT * INTO v_row FROM public.listings
   WHERE id = p_listing_id AND seller_id = v_uid;
  IF v_row.id IS NULL THEN RAISE EXCEPTION 'not your listing'; END IF;

  IF v_row.status NOT IN ('draft','active','reduced','rejected','held','expired') THEN
    RAISE EXCEPTION 'pinNotEditable:%', v_row.status;
  END IF;

  v_street := nullif(btrim(regexp_replace(
                regexp_replace(coalesce(p_street, ''), '[[:cntrl:]<>]', ' ', 'g'),
                '\s+', ' ', 'g')), '');
  IF v_street IS NOT NULL AND char_length(v_street) > 200 THEN
    RAISE EXCEPTION 'streetTooLong:%', char_length(v_street);
  END IF;
  IF v_street IS NOT NULL AND public.attr_contact_like(v_street) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;

  v_dirs := nullif(btrim(regexp_replace(
              regexp_replace(coalesce(p_directions, ''), '[[:cntrl:]<>]', ' ', 'g'),
              '\s+', ' ', 'g')), '');
  IF v_dirs IS NOT NULL AND char_length(v_dirs) > 200 THEN
    RAISE EXCEPTION 'directionsTooLong:%', char_length(v_dirs);
  END IF;
  IF v_dirs IS NOT NULL AND public.attr_contact_like(v_dirs) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;

  IF p_lat IS NULL OR p_lng IS NULL THEN
    v_lat := NULL; v_lng := NULL; v_prec := NULL; v_zoom := NULL;
  ELSE
    IF p_lat < -90 OR p_lat > 90 THEN
      RAISE EXCEPTION 'badLatitude:%', p_lat;
    END IF;
    IF p_lng < -180 OR p_lng > 180 THEN
      RAISE EXCEPTION 'badLongitude:%', p_lng;
    END IF;
    v_prec := lower(btrim(coalesce(p_precision, 'exact')));
    IF v_prec NOT IN ('exact','approx') THEN
      RAISE EXCEPTION 'badPrecision:%', v_prec;
    END IF;
    IF p_zoom IS NOT NULL AND (p_zoom < 3 OR p_zoom > 20) THEN
      RAISE EXCEPTION 'badZoom:%', p_zoom;
    END IF;
    v_lat := round(p_lat, 6);
    v_lng := round(p_lng, 6);
    v_zoom := coalesce(p_zoom, CASE WHEN v_row.pin_lat IS NOT NULL THEN v_row.pin_zoom END);
  END IF;

  v_before := jsonb_build_object('pin_lat', v_row.pin_lat, 'pin_lng', v_row.pin_lng,
                                 'pin_precision', v_row.pin_precision, 'pin_zoom', v_row.pin_zoom,
                                 'street_address', v_row.street_address,
                                 'directions', v_row.directions);
  v_after  := jsonb_build_object('pin_lat', v_lat, 'pin_lng', v_lng,
                                 'pin_precision', v_prec, 'pin_zoom', v_zoom,
                                 'street_address', v_street,
                                 'directions', v_dirs);

  UPDATE public.listings
     SET pin_lat = v_lat, pin_lng = v_lng, pin_precision = v_prec, pin_zoom = v_zoom,
         street_address = v_street, directions = v_dirs,
         pin_show_lat = CASE WHEN v_lat IS NULL THEN NULL
                             WHEN v_prec = 'approx' THEN round(v_lat, 2)
                             ELSE v_lat END,
         pin_show_lng = CASE WHEN v_lng IS NULL THEN NULL
                             WHEN v_prec = 'approx' THEN round(v_lng, 2)
                             ELSE v_lng END,
         updated_at = now()
   WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
  VALUES (p_listing_id, v_uid, 'edit', v_before, v_after, v_uid);

  RETURN jsonb_build_object('ok', true) || v_after;
END $function$;
REVOKE EXECUTE ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO service_role;

UPDATE public.listings
   SET pin_show_lat = CASE WHEN pin_precision = 'approx' THEN round(pin_lat, 2) ELSE pin_lat END,
       pin_show_lng = CASE WHEN pin_precision = 'approx' THEN round(pin_lng, 2) ELSE pin_lng END
 WHERE pin_lat IS NOT NULL;

REVOKE SELECT ON public.listings FROM anon, authenticated;
GRANT SELECT (id, seller_id, category_id, location_id, title, description,
  attributes, price_amount, price_currency, price_mode, status, published_at,
  expires_at, created_at, updated_at, tier, price_period, poster_expires_at,
  video_url, cover_photo_id, draft_step, draft_updated_at, published_first_at,
  renewed_count, pin_precision, street_address, price_bp, price_negotiable,
  pin_zoom, directions, pin_show_lat, pin_show_lng)
  ON public.listings TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.my_listing_private(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings
   WHERE id = p_listing_id AND seller_id = v_uid;
  IF NOT FOUND THEN RAISE EXCEPTION 'not your listing'; END IF;
  RETURN jsonb_build_object(
    'listing_id', v_row.id,
    'contact_pref', v_row.contact_pref,
    'pin_lat', v_row.pin_lat,
    'pin_lng', v_row.pin_lng,
    'pin_precision', v_row.pin_precision,
    'pin_zoom', v_row.pin_zoom,
    'street_address', v_row.street_address,
    'directions', v_row.directions,
    'home_country_code', v_row.home_country_code
  );
END $function$;
REVOKE EXECUTE ON FUNCTION public.my_listing_private(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing_private(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing_private(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.my_last_listing_private(p_exclude uuid DEFAULT NULL::uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings
   WHERE seller_id = v_uid
     AND status <> 'draft'
     AND (p_exclude IS NULL OR id <> p_exclude)
   ORDER BY created_at DESC
   LIMIT 1;
  IF NOT FOUND THEN RETURN NULL; END IF;
  RETURN jsonb_build_object(
    'listing_id', v_row.id,
    'contact_pref', v_row.contact_pref,
    'pin_lat', v_row.pin_lat,
    'pin_lng', v_row.pin_lng,
    'pin_precision', v_row.pin_precision,
    'pin_zoom', v_row.pin_zoom,
    'street_address', v_row.street_address,
    'directions', v_row.directions,
    'home_country_code', v_row.home_country_code
  );
END $function$;
REVOKE EXECUTE ON FUNCTION public.my_last_listing_private(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_last_listing_private(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_last_listing_private(uuid) TO service_role;

CREATE TABLE public.contact_reveals (
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  viewer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day date NOT NULL,
  PRIMARY KEY (listing_id, viewer_id, day)
);
REVOKE ALL ON public.contact_reveals FROM anon, authenticated;
GRANT ALL ON public.contact_reveals TO service_role;
ALTER TABLE public.contact_reveals ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.reveal_listing_contact(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_uid      uuid := auth.uid();
  v_row      public.listings%ROWTYPE;
  v_rate     jsonb;
  v_channels jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listingNotAvailable'; END IF;
  IF v_row.seller_id <> v_uid AND v_row.status <> 'active' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;

  IF v_row.seller_id <> v_uid
     AND NOT EXISTS (SELECT 1 FROM public.contact_reveals r
                      WHERE r.listing_id = p_listing_id
                        AND r.viewer_id = v_uid
                        AND r.day = current_date) THEN
    v_rate := public.rate_gate('contact_reveal');
    IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
      RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited',
                                'resets_at', v_rate->>'resets_at');
    END IF;
    INSERT INTO public.contact_reveals (listing_id, viewer_id, day)
    VALUES (p_listing_id, v_uid, current_date)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT coalesce(jsonb_object_agg(e.key, e.value), '{}'::jsonb)
    INTO v_channels
    FROM jsonb_each(coalesce(v_row.contact_pref, '{}'::jsonb)) e
   WHERE (e.key = 'messages' AND coalesce((e.value)::boolean, false))
      OR (e.key <> 'messages' AND coalesce((e.value->>'show')::boolean, false));

  RETURN jsonb_build_object('ok', true, 'channels', v_channels);
END $function$;
REVOKE EXECUTE ON FUNCTION public.reveal_listing_contact(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.reveal_listing_contact(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.reveal_listing_contact(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.listing_reveal_count(p_listing_id uuid)
RETURNS integer
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_count integer;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings
                  WHERE id = p_listing_id AND seller_id = v_uid) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  SELECT count(*) INTO v_count FROM public.contact_reveals
   WHERE listing_id = p_listing_id;
  RETURN v_count;
END $function$;
REVOKE EXECUTE ON FUNCTION public.listing_reveal_count(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.listing_reveal_count(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.listing_reveal_count(uuid) TO service_role;

REVOKE SELECT ON public.attributes FROM anon, authenticated;
REVOKE SELECT ON public.category_attribute_links FROM anon, authenticated;

REVOKE SELECT ON public.categories FROM anon, authenticated;
GRANT SELECT (id, name_en, name_am, slug, icon, display_order, allow_listings,
  is_catchall, image_url, image_thumb_url, is_active)
  ON public.categories TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_posting_schema(p_category_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cat public.categories;
  v_attrs jsonb;
  v_basis text[];
  v_doc jsonb;
  v_rate jsonb;
BEGIN
  v_rate := public.rate_gate('schema_read');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RAISE EXCEPTION 'rateLimited';
  END IF;

  SELECT * INTO v_cat FROM public.categories WHERE id = p_category_id;
  IF v_cat.id IS NULL THEN
    RAISE EXCEPTION 'categoryNotFound';
  END IF;
  IF NOT v_cat.is_active THEN
    RAISE EXCEPTION 'categoryInactive';
  END IF;
  IF NOT v_cat.allow_listings THEN
    RAISE EXCEPTION 'categoryNotPostable';
  END IF;

  v_basis := public.price_basis_keys(p_category_id);

  SELECT coalesce(jsonb_agg(row ORDER BY ord, key), '[]'::jsonb)
    INTO v_attrs
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
               'display_order', e.display_order,
               'card_rank', e.card_rank,
               'unit', a.unit,
               'min_bound', a.min_bound,
               'max_bound', a.max_bound,
               'decimals', a.decimals,
               'format', a.format,
               'preset', a.preset,
               'max_length', a.max_length,
               'allowed_options', to_jsonb(l.allowed_options),
               'default_value', l.default_value,
               'visible_when', l.visible_when,
               'option_count', (
                 SELECT count(*)
                   FROM jsonb_array_elements(
                          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
                  WHERE coalesce((o.value->>'active')::boolean, true)
                    AND (l.allowed_options IS NULL
                         OR (o.value->>'value') = ANY (l.allowed_options))
               ),
               'allow_other', EXISTS (
                 SELECT 1
                   FROM jsonb_array_elements(
                          CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END) o
                  WHERE o.value->>'value' = 'other'
                    AND (l.allowed_options IS NULL
                         OR 'other' = ANY (l.allowed_options))
               )
             ) AS row
        FROM public.effective_category_links(p_category_id) e
        JOIN public.attributes a ON a.id = e.attribute_id
        JOIN public.category_attribute_links l ON l.id = e.link_id
    ) s;

  v_doc := jsonb_build_object(
    'category', jsonb_build_object(
      'id', v_cat.id,
      'slug', v_cat.slug,
      'name_en', v_cat.name_en,
      'price_enabled', v_cat.price_enabled,
      'default_price_period', v_cat.default_price_period,
      'price_period_locked', v_cat.price_period_locked,
      'expiry_days', v_cat.expiry_days,
      'is_restricted', v_cat.is_restricted,
      'capabilities', to_jsonb(v_cat.capabilities),
      'illustration', v_cat.image_url,
      'price_basis_key', CASE WHEN cardinality(v_basis) = 1 THEN v_basis[1] ELSE NULL END
    ),
    'attributes', v_attrs,
    'plan', public.plan_caps(public.seller_plan(auth.uid()))
  );
  IF cardinality(v_basis) >= 2 THEN
    v_doc := v_doc || jsonb_build_object('refusals', jsonb_build_array(
      jsonb_build_object('reason','priceBasisAmbiguous',
                         'detail', array_to_string(v_basis, '|'))));
  END IF;
  RETURN v_doc;
END $$;
REVOKE EXECUTE ON FUNCTION public.get_posting_schema(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_posting_schema(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_posting_schema(uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.get_attribute_options(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_attribute_options_version(uuid) FROM PUBLIC, anon;

REVOKE EXECUTE ON FUNCTION public.catalog_find(text, text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.catalog_find(text, text, integer) TO service_role;

CREATE OR REPLACE FUNCTION public.submit_listing(p_listing_id uuid, p_step smallint, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_price_bp integer DEFAULT NULL::integer, p_price_negotiable boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_obs    char(2);
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_step   smallint;
  v_id     uuid;
  v_before jsonb;
  v_after  jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_key    text;
  v_rate   jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;

  v_rate := public.rate_gate('draft');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited',
                         'resets_at', v_rate->>'resets_at')));
  END IF;

  IF p_step IS NULL OR p_step < 1 OR p_step > 8 THEN RAISE EXCEPTION 'unknown step'; END IF;

  IF p_listing_id IS NOT NULL THEN
    SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
    IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
    IF v_prev.status <> 'draft' THEN
      RAISE EXCEPTION 'only a draft is writable here; a live listing edits through edit_listing';
    END IF;
  END IF;

  SELECT d.observed_country_code INTO v_obs FROM public.user_directory d WHERE d.user_id = v_uid;
  IF v_obs IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','residency','reason','residencyUnknown')));
  END IF;

  v_step := greatest(coalesce(v_prev.draft_step, 0::smallint), p_step);

  v_val := public.validate_listing_draft(v_uid, p_step, p_category_id, p_title, p_description,
             p_video_url, p_attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, p_poster_expires_at, p_coverage, p_contact_pref,
             coalesce(v_prev.attributes, '{}'::jsonb), p_price_bp, p_price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  IF p_listing_id IS NULL THEN
    INSERT INTO public.listings (
      seller_id, category_id, location_id, title, description, attributes,
      price_amount, price_currency, price_bp, price_negotiable, price_mode, price_period, poster_expires_at,
      video_url, contact_pref, status, home_country_code, draft_step, draft_updated_at
    ) VALUES (
      v_uid, p_category_id, (v_val->>'location_id')::uuid, v_val->>'title', v_val->>'description',
      v_val->'attrs', (v_val->>'price_amount')::numeric, (v_val->>'price_currency')::char(3),
      (v_val->>'price_bp')::int, coalesce((v_val->>'price_negotiable')::boolean, false), v_val->>'price_mode', v_val->>'price_period', p_poster_expires_at,
      p_video_url, coalesce(p_contact_pref, '{"messages": true}'::jsonb), 'draft', v_obs,
      v_step, now()
    ) RETURNING * INTO v_row;
    v_id := v_row.id;
  ELSE
    UPDATE public.listings SET
      category_id       = p_category_id,
      location_id       = coalesce((v_val->>'location_id')::uuid, location_id),
      title             = v_val->>'title',
      description       = v_val->>'description',
      attributes        = v_val->'attrs',
      price_amount      = (v_val->>'price_amount')::numeric,
      price_currency    = (v_val->>'price_currency')::char(3),
      price_bp          = (v_val->>'price_bp')::int,
      price_negotiable  = coalesce((v_val->>'price_negotiable')::boolean, false),
      price_mode        = v_val->>'price_mode',
      price_period      = v_val->>'price_period',
      poster_expires_at = p_poster_expires_at,
      video_url         = p_video_url,
      contact_pref      = coalesce(p_contact_pref, contact_pref),
      home_country_code = v_obs,
      draft_step        = v_step,
      draft_updated_at  = now(),
      updated_at        = now()
    WHERE id = p_listing_id
    RETURNING * INTO v_row;
    IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
    v_id := v_row.id;
  END IF;

  IF p_coverage IS NOT NULL AND array_length(p_coverage, 1) IS NOT NULL THEN
    DELETE FROM public.listing_locations WHERE listing_id = v_id;
    INSERT INTO public.listing_locations (listing_id, location_id)
      SELECT v_id, c.id FROM unnest(p_coverage) c(id)
      ON CONFLICT DO NOTHING;
  END IF;

  v_after  := to_jsonb(v_row) - 'search_tsv';
  v_before := CASE WHEN p_listing_id IS NULL THEN NULL ELSE to_jsonb(v_prev) - 'search_tsv' END;
  IF v_before IS NOT NULL THEN
    FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
      IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
        v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
        v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
      END IF;
    END LOOP;
  ELSE
    v_diff_a := v_after;
    v_diff_b := NULL;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (v_id, v_uid, CASE WHEN p_listing_id IS NULL THEN 'create' ELSE 'edit' END,
            v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'listing_id', v_id, 'draft_step', v_step,
                            'price_currency', v_row.price_currency);
END $function$;
REVOKE EXECUTE ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.submit_listing(uuid, smallint, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO service_role;

CREATE OR REPLACE FUNCTION public.publish_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
  v_cov uuid[];
  v_val jsonb;
  v_rate jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  v_rate := public.rate_gate('post');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited',
                         'resets_at', v_rate->>'resets_at')));
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('draft','rejected') THEN
    RAISE EXCEPTION 'illegal transition: % -> screening', v_row.status;
  END IF;

  SELECT array_agg(ll.location_id) INTO v_cov
    FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id;

  v_val := public.validate_listing_draft(v_uid, 8::smallint, v_row.category_id, v_row.title,
             v_row.description, v_row.video_url, v_row.attributes, v_row.price_mode,
             v_row.price_amount, v_row.price_currency, v_row.price_period,
             v_row.poster_expires_at, v_cov, v_row.contact_pref, v_row.attributes,
             v_row.price_bp, v_row.price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  UPDATE public.listings SET
    status = 'screening',
    published_first_at = coalesce(published_first_at, now()),
    draft_step = 8,
    updated_at = now()
  WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'screening'), v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $function$;
REVOKE EXECUTE ON FUNCTION public.publish_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.publish_listing(uuid) TO service_role;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.rate_dials) <> 7 THEN
    RAISE EXCEPTION 'PROOF dials: expected 7 rows, got %', (SELECT count(*) FROM public.rate_dials);
  END IF;

  IF has_function_privilege('anon', 'public.consume_rate_limit(text,text,integer,interval)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.consume_rate_limit(text,text,integer,interval)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF acl: consume_rate_limit still client-executable';
  END IF;
  IF has_function_privilege('anon', 'public.residency_country_for(uuid,text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.residency_country_for(uuid,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF acl: residency_country_for still client-executable';
  END IF;
  IF has_function_privilege('anon', 'public.rate_gate(text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.rate_gate(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF acl: rate_gate is client-executable';
  END IF;
  IF has_function_privilege('anon', 'public.catalog_find(text,text,integer)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.catalog_find(text,text,integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF acl: catalog_find still client-executable';
  END IF;
  IF has_function_privilege('anon', 'public.get_posting_schema(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.get_attribute_options(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.get_attribute_options_version(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF acl: an anonymous grant survived';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.get_posting_schema(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF acl: get_posting_schema lost its authenticated grant';
  END IF;

  IF (SELECT p.provolatile FROM pg_proc p
       WHERE p.pronamespace = 'public'::regnamespace AND p.proname = 'get_posting_schema') <> 'v' THEN
    RAISE EXCEPTION 'PROOF volatility: get_posting_schema is not volatile';
  END IF;

  IF has_table_privilege('anon', 'public.attributes', 'SELECT')
     OR has_table_privilege('authenticated', 'public.attributes', 'SELECT')
     OR has_table_privilege('anon', 'public.category_attribute_links', 'SELECT')
     OR has_table_privilege('authenticated', 'public.category_attribute_links', 'SELECT') THEN
    RAISE EXCEPTION 'PROOF acl: attributes/links still client-readable';
  END IF;
  IF has_table_privilege('anon', 'public.rate_dials', 'SELECT')
     OR has_table_privilege('authenticated', 'public.rate_dials', 'SELECT')
     OR has_table_privilege('anon', 'public.rate_overrides', 'SELECT')
     OR has_table_privilege('authenticated', 'public.rate_overrides', 'SELECT')
     OR has_table_privilege('anon', 'public.contact_reveals', 'SELECT')
     OR has_table_privilege('authenticated', 'public.contact_reveals', 'SELECT') THEN
    RAISE EXCEPTION 'PROOF acl: a server table is client-readable';
  END IF;

  IF has_table_privilege('authenticated', 'public.listings', 'SELECT') THEN
    RAISE EXCEPTION 'PROOF acl: listings kept a table-level grant';
  END IF;
  IF has_column_privilege('authenticated', 'public.listings', 'contact_pref', 'SELECT')
     OR has_column_privilege('authenticated', 'public.listings', 'pin_lat', 'SELECT')
     OR has_column_privilege('authenticated', 'public.listings', 'pin_lng', 'SELECT')
     OR has_column_privilege('authenticated', 'public.listings', 'home_country_code', 'SELECT')
     OR has_column_privilege('authenticated', 'public.listings', 'screening', 'SELECT') THEN
    RAISE EXCEPTION 'PROOF acl: a private listings column is still readable';
  END IF;
  IF NOT has_column_privilege('anon', 'public.listings', 'pin_show_lat', 'SELECT')
     OR NOT has_column_privilege('anon', 'public.listings', 'pin_show_lng', 'SELECT')
     OR NOT has_column_privilege('anon', 'public.listings', 'title', 'SELECT') THEN
    RAISE EXCEPTION 'PROOF acl: the public listings columns are not readable';
  END IF;

  IF NOT has_column_privilege('anon', 'public.categories', 'slug', 'SELECT')
     OR NOT has_column_privilege('anon', 'public.categories', 'is_active', 'SELECT') THEN
    RAISE EXCEPTION 'PROOF acl: the category tree columns are not readable';
  END IF;
  IF has_column_privilege('anon', 'public.categories', 'capabilities', 'SELECT') THEN
    RAISE EXCEPTION 'PROOF acl: a non-tree category column is readable';
  END IF;

  IF NOT coalesce((public.rate_gate('draft')->>'allowed')::boolean, false) THEN
    RAISE EXCEPTION 'PROOF behaviour: a signed-out caller is not allowed';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261003220000') ON CONFLICT DO NOTHING;