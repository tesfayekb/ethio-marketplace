-- M9b — bundle 6 Part A (INC-444, DEC-136): the six seller writing doors count
-- against the revise dial (M9a). Each body is redeclared WHOLE from the live
-- ethio-prod definition (INC-183); the one change per door is the line
--   IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
-- placed directly after the caller checks. Refusal is by exception, as each door
-- already refuses; no return type changes, no DROP. rate_gate answers allowed
-- when auth.uid() is NULL, so the service's own calls are never counted.
-- e2e-areas: posting

CREATE OR REPLACE FUNCTION public.edit_listing(p_listing_id uuid, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_price_bp integer DEFAULT NULL::integer, p_price_negotiable boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_before jsonb;
  v_after  jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  v_key    text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_prev.status NOT IN ('active','reduced','rejected','held','expired') THEN
    RAISE EXCEPTION 'edit_listing takes a published listing; a draft writes through submit_listing';
  END IF;

  -- M5 — the judge at step 8 also refuses an unnamed seller and an
  -- unconfirmed home country, with the same fields as on publish.
  v_val := public.validate_listing_draft(v_uid, 8::smallint, p_category_id, p_title, p_description,
             p_video_url, p_attributes, p_price_mode, p_price_amount, p_price_currency,
             p_price_period, p_poster_expires_at, p_coverage, p_contact_pref, v_prev.attributes,
             p_price_bp, p_price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  UPDATE public.listings SET
    category_id       = p_category_id,
    location_id       = (v_val->>'location_id')::uuid,
    title             = v_val->>'title',
    description       = v_val->>'description',
    attributes        = v_val->'attrs',
    price_amount      = (v_val->>'price_amount')::numeric,
    price_currency    = (v_val->>'price_currency')::char(3),
    price_mode        = v_val->>'price_mode',
    price_period      = v_val->>'price_period',
    price_bp          = (v_val->>'price_bp')::integer,
    price_negotiable  = coalesce((v_val->>'price_negotiable')::boolean, false),
    poster_expires_at = p_poster_expires_at,
    video_url         = p_video_url,
    contact_pref      = p_contact_pref,
    -- M5 / DEC-109 — the unit the ad is sold per, from the basis in force.
    price_unit        = v_val->>'price_unit',
    price_unit_text   = v_val->>'price_unit_text',
    status            = 'screening',
    updated_at        = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;
  INSERT INTO public.listing_locations (listing_id, location_id)
    SELECT p_listing_id, c.id FROM unnest(p_coverage) c(id) ON CONFLICT DO NOTHING;

  v_after  := to_jsonb(v_row) - 'search_tsv';
  v_before := to_jsonb(v_prev) - 'search_tsv';
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'edit', v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $function$;
REVOKE ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.edit_listing(uuid, uuid, text, text, text, jsonb, text, numeric, character, text, timestamp with time zone, uuid[], jsonb, integer, boolean) TO service_role;

CREATE OR REPLACE FUNCTION public.mark_sold(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('active','reduced') THEN
    RAISE EXCEPTION 'illegal transition: % -> sold', v_row.status;
  END IF;
  UPDATE public.listings SET status = 'sold',
    contact_pref = '{"messages": true}'::jsonb, updated_at = now()
   WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status, 'contact_pref', v_row.contact_pref),
            jsonb_build_object('status', 'sold', 'contact_pref', '{"messages": true}'::jsonb), v_uid);
  RETURN jsonb_build_object('ok', true, 'status', 'sold');
END $function$;
REVOKE ALL ON FUNCTION public.mark_sold(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mark_sold(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.mark_sold(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.relist_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('expired','sold') THEN
    RAISE EXCEPTION 'illegal transition: % -> screening', v_row.status;
  END IF;
  UPDATE public.listings SET status = 'screening', updated_at = now() WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'screening'), v_uid);
  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $function$;
REVOKE ALL ON FUNCTION public.relist_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.relist_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.relist_listing(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.renew_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_row public.listings%ROWTYPE; v_last timestamptz;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status <> 'active' THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','status','reason','renewNeedsActive')));
  END IF;
  SELECT max(r.created_at) INTO v_last FROM public.listing_revisions r
   WHERE r.listing_id = p_listing_id AND r.kind = 'state' AND r.after ? 'renewed_count';
  IF v_last IS NOT NULL AND v_last > now() - interval '7 days' THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','renew','reason','renewTooSoon')));
  END IF;
  -- M5 / DEC-117 — a seller's date that has passed is cleared; the new end is
  -- LEAST(the seller's date, now() + the category's days), NULL when both are absent.
  UPDATE public.listings SET
    poster_expires_at = CASE WHEN v_row.poster_expires_at <= now() THEN NULL ELSE v_row.poster_expires_at END,
    expires_at = LEAST(CASE WHEN v_row.poster_expires_at <= now() THEN NULL ELSE v_row.poster_expires_at END,
      now() + make_interval(days => (SELECT c.expiry_days FROM public.categories c WHERE c.id = v_row.category_id))),
    renewed_count = renewed_count + 1,
    updated_at = now()
  WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('renewed_count', v_row.renewed_count, 'expires_at', v_row.expires_at,
                               'poster_expires_at', v_row.poster_expires_at),
            jsonb_build_object('renewed_count', v_row.renewed_count + 1), v_uid);
  RETURN jsonb_build_object('ok', true, 'renewed_count', v_row.renewed_count + 1);
END $function$;
REVOKE ALL ON FUNCTION public.renew_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.renew_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.renew_listing(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.set_listing_pin(p_listing_id uuid, p_lat numeric DEFAULT NULL::numeric, p_lng numeric DEFAULT NULL::numeric, p_precision text DEFAULT NULL::text, p_street text DEFAULT NULL::text, p_zoom smallint DEFAULT NULL::smallint, p_directions text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
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
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

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

  -- step 5 / step 10 — the directions line is sanitised as the note is and
  -- refused with contactInNote under the same rule.
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
    -- A re-sent pin without a zoom keeps the zoom it was saved at.
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
REVOKE ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO service_role;

CREATE OR REPLACE FUNCTION public.transition_listing(p_listing_id uuid, p_new_status text)
 RETURNS void
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid      uuid := auth.uid();
  v_row      public.listings%ROWTYPE;
  v_service  boolean := (v_uid IS NULL AND current_setting('role', true) IS DISTINCT FROM 'anon');
  v_reviewer boolean := false;
  v_enforcer boolean := false;
  v_owner    boolean := false;
  v_ok       boolean := false;
BEGIN
  IF p_new_status NOT IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed') THEN
    RAISE EXCEPTION 'unknown status: %', p_new_status;
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;

  IF v_uid IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
      RAISE EXCEPTION 'account is deactivated';
    END IF;
    IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
    v_owner    := (v_row.seller_id = v_uid);
    v_reviewer := public.has_permission(v_uid, 'listings', 'review');
    v_enforcer := public.has_permission(v_uid, 'listings', 'enforce');
    IF NOT (v_owner OR v_reviewer OR v_enforcer) THEN
      RAISE EXCEPTION 'not your listing';
    END IF;
  END IF;

  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches 'active'.
  IF p_new_status IN ('active','reduced','rejected','held') THEN
    IF NOT (v_service OR v_reviewer) THEN
      RAISE EXCEPTION 'reviewer only: % -> %', v_row.status, p_new_status;
    END IF;
    v_ok := CASE v_row.status
      WHEN 'screening' THEN p_new_status IN ('active','reduced','rejected','held')
      WHEN 'held'      THEN p_new_status IN ('active','reduced','rejected')
      ELSE false
    END;
  ELSIF p_new_status = 'screening' THEN
    v_ok := v_row.status IN ('draft','active','reduced','rejected','expired','sold');
  ELSIF p_new_status IN ('sold','expired') THEN
    v_ok := v_row.status IN ('active','reduced');
  ELSIF p_new_status = 'removed' THEN
    IF v_owner AND NOT (v_service OR v_enforcer) THEN
      IF v_row.status = 'rejected' AND coalesce(v_row.screening->>'severe','false') = 'true' THEN
        RAISE EXCEPTION 'a listing rejected for a severe reason is removed by enforcement only';
      END IF;
      v_ok := true;
    ELSE
      v_ok := (v_service OR v_enforcer);
      IF NOT v_ok THEN
        RAISE EXCEPTION 'enforcement only: % -> removed', v_row.status;
      END IF;
    END IF;
  ELSE
    v_ok := false;
  END IF;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'illegal transition: % -> %', v_row.status, p_new_status;
  END IF;

  IF p_new_status IN ('active','reduced') THEN
    UPDATE public.listings SET
      status = p_new_status,
      published_at = coalesce(published_at, now()),
      published_first_at = coalesce(published_first_at, now()),
      -- M5 / DEC-117 — LEAST(the seller's date, now() + the category's days);
      -- each side is left out when absent (LEAST skips NULL); NULL when both are.
      expires_at = LEAST(v_row.poster_expires_at,
        now() + make_interval(days => (SELECT c.expiry_days FROM public.categories c WHERE c.id = v_row.category_id))),
      updated_at = now()
    WHERE id = p_listing_id;
  ELSE
    UPDATE public.listings SET status = p_new_status, updated_at = now()
     WHERE id = p_listing_id;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', p_new_status), v_uid);
END $function$;
REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.transition_listing(uuid, text) TO service_role;

-- Proof: each of the six doors now carries the revise gate, keeps SECURITY
-- DEFINER, VOLATILE and search_path=public, and is executable by authenticated
-- and service_role but not anon.
DO $p$
DECLARE r record; v_n integer := 0;
BEGIN
  FOR r IN SELECT p.oid, p.proname, p.prosecdef, p.provolatile, p.proconfig
             FROM pg_proc p
            WHERE p.pronamespace = 'public'::regnamespace
              AND p.proname IN ('edit_listing','transition_listing','renew_listing','set_listing_pin','mark_sold','relist_listing')
  LOOP
    v_n := v_n + 1;
    IF position('rate_gate(''revise'')' IN pg_get_functiondef(r.oid)) = 0 THEN
      RAISE EXCEPTION 'M9b: % lacks the revise gate', r.proname;
    END IF;
    IF NOT r.prosecdef OR r.provolatile <> 'v' OR r.proconfig IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'M9b: % lost its security/volatility/search_path', r.proname;
    END IF;
    IF NOT has_function_privilege('authenticated', r.oid, 'EXECUTE')
       OR NOT has_function_privilege('service_role', r.oid, 'EXECUTE')
       OR has_function_privilege('anon', r.oid, 'EXECUTE') THEN
      RAISE EXCEPTION 'M9b: % has the wrong grants', r.proname;
    END IF;
  END LOOP;
  IF v_n <> 6 THEN RAISE EXCEPTION 'M9b: expected 6 doors, found %', v_n; END IF;
END $p$;

INSERT INTO public.migration_marks (version) VALUES ('20261007130000') ON CONFLICT DO NOTHING;