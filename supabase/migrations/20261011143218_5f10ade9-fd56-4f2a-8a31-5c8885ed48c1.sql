-- Bundle 11, the Listings console, turn L4a (2026-10-11). Tier A. An admin's edit is judged on what an admin can
-- change, and the console prints a price with its unit (D140, DEC-173; INC-552, INC-553).
-- e2e-areas: admin-listings
-- A. admin_edit_listing, redeclared whole from 20261011085637 with one change: the seller's content rules are judged
--    through step 5 (the category, the specifications, the price, the title and the description), and the seller's
--    own end date and places are not sent. Before, the door judged through the contact step (7) with the listing's
--    end date and places, so a listing whose seller set an end date within a day (or one already past), whose place
--    was later switched off, or whose contact settings fail today's rules could not be corrected by an admin at all
--    (INC-552). Every other line stands byte for byte (the unused read of the places goes with the change).
-- B. admin_list_listings, redeclared whole from 20261011085637 with one change: each row also carries the price's
--    unit (price_unit, price_unit_text), so All listings prints "per kg" as the card does (INC-553). The result
--    columns change, so the function is dropped and created again with the same arguments, attributes and grants.
-- C. Proofs: catalogue reads and calls with no session or a scratch identity that holds nothing; the doors' behaviour
--    is proven by AL-19 (red against the door before this file), AL-20 and AL-4, AL-5, AL-12.

-- ===== A — an admin's content edit =====
CREATE OR REPLACE FUNCTION public.admin_edit_listing(
  p_listing_id uuid, p_changes jsonb, p_reason text, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_prev     public.listings%ROWTYPE;
  v_row      public.listings%ROWTYPE;
  v_key      text;
  v_note     text := nullif(btrim(coalesce(p_note, '')), '');
  v_val      jsonb;
  v_photos   uuid[] := ARRAY[]::uuid[];
  v_removed  jsonb := '[]'::jsonb;
  v_next     uuid;
  v_before   jsonb;
  v_after    jsonb;
  v_diff_a   jsonb := '{}'::jsonb;
  v_diff_b   jsonb := '{}'::jsonb;
  v_fields   text[];
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');
  IF p_reason IS NULL OR p_reason NOT IN ('wrong_category','misleading','contact_in_text','photo','rules','other') THEN
    RAISE EXCEPTION 'unknown reason';
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    RAISE EXCEPTION 'a note is required';
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RAISE EXCEPTION 'the note is too long';
  END IF;
  IF p_changes IS NULL OR jsonb_typeof(p_changes) <> 'object' OR p_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to change';
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_changes) k LOOP
    IF v_key NOT IN ('title','description','category_id','attributes','price_mode','price_amount',
                     'price_currency','price_period','price_bp','price_negotiable','remove_photos') THEN
      RAISE EXCEPTION 'not editable: %', v_key;
    END IF;
  END LOOP;

  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  -- A draft is the seller's private work: it is not found here (D136).
  IF NOT FOUND OR v_prev.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  IF v_prev.status = 'removed' THEN
    RAISE EXCEPTION 'a removed listing is not edited';
  END IF;
  IF v_prev.seller_id = v_uid THEN
    RAISE EXCEPTION 'your own listing is edited the seller''s way';
  END IF;

  IF p_changes ? 'remove_photos' THEN
    IF jsonb_typeof(p_changes->'remove_photos') <> 'array' THEN
      RAISE EXCEPTION 'remove_photos must be a list';
    END IF;
    SELECT coalesce(array_agg(DISTINCT x::uuid), ARRAY[]::uuid[]) INTO v_photos
      FROM jsonb_array_elements_text(p_changes->'remove_photos') x;
    IF EXISTS (SELECT 1 FROM unnest(v_photos) r(id)
                WHERE NOT EXISTS (SELECT 1 FROM public.listing_photos ph
                                   WHERE ph.id = r.id AND ph.listing_id = p_listing_id)) THEN
      RAISE EXCEPTION 'photo not found on this listing';
    END IF;
  END IF;

  -- The seller's content rules for what an admin can change (D140, DEC-173; INC-552): the category, the
  -- specifications, the price, the title and the description — validate_listing_draft through step 5, with every
  -- field the admin does not change read from the listing as it stands. The seller's own end date and places are not
  -- sent, and the contact step (7) is not reached: they are the seller's choices, judged when the seller saves.
  v_val := public.validate_listing_draft(v_prev.seller_id, 5::smallint,
    CASE WHEN p_changes ? 'category_id' THEN (p_changes->>'category_id')::uuid ELSE v_prev.category_id END,
    CASE WHEN p_changes ? 'title' THEN p_changes->>'title' ELSE v_prev.title END,
    CASE WHEN p_changes ? 'description' THEN p_changes->>'description' ELSE v_prev.description END,
    v_prev.video_url,
    CASE WHEN p_changes ? 'attributes' THEN p_changes->'attributes' ELSE v_prev.attributes END,
    CASE WHEN p_changes ? 'price_mode' THEN p_changes->>'price_mode' ELSE v_prev.price_mode END,
    CASE WHEN p_changes ? 'price_amount' THEN (p_changes->>'price_amount')::numeric ELSE v_prev.price_amount END,
    CASE WHEN p_changes ? 'price_currency' THEN (p_changes->>'price_currency')::char(3) ELSE v_prev.price_currency END,
    CASE WHEN p_changes ? 'price_period' THEN p_changes->>'price_period' ELSE v_prev.price_period END,
    NULL, NULL, v_prev.contact_pref, v_prev.attributes,
    CASE WHEN p_changes ? 'price_bp' THEN (p_changes->>'price_bp')::integer ELSE v_prev.price_bp END,
    CASE WHEN p_changes ? 'price_negotiable' THEN coalesce((p_changes->>'price_negotiable')::boolean, false)
         ELSE v_prev.price_negotiable END);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  -- ==== REQ-021 SCREENING GATEWAY (stage 2, DEC-145) ====
  -- The automatic screening call judges an admin's edit at this point, as it judges the seller's. Until stage 2
  -- nothing is called: the enforcer's edit is itself a human judgment, and a live listing stays live (D136).

  IF cardinality(v_photos) > 0 THEN
    SELECT coalesce(jsonb_agg(to_jsonb(ph) ORDER BY ph.display_order), '[]'::jsonb) INTO v_removed
      FROM public.listing_photos ph WHERE ph.listing_id = p_listing_id AND ph.id = ANY (v_photos);
    UPDATE public.listings SET cover_photo_id = NULL
     WHERE id = p_listing_id AND cover_photo_id = ANY (v_photos);
    -- The row goes; the file stays in storage until the listing's retention ends (the revision keeps its paths).
    DELETE FROM public.listing_photos WHERE listing_id = p_listing_id AND id = ANY (v_photos);
    SELECT ph.id INTO v_next FROM public.listing_photos ph
     WHERE ph.listing_id = p_listing_id ORDER BY ph.display_order LIMIT 1;
  END IF;

  UPDATE public.listings SET
    category_id      = CASE WHEN p_changes ? 'category_id' THEN (p_changes->>'category_id')::uuid ELSE category_id END,
    title            = v_val->>'title',
    description      = v_val->>'description',
    attributes       = v_val->'attrs',
    price_amount     = (v_val->>'price_amount')::numeric,
    price_currency   = (v_val->>'price_currency')::char(3),
    price_mode       = v_val->>'price_mode',
    price_period     = v_val->>'price_period',
    price_bp         = (v_val->>'price_bp')::integer,
    price_negotiable = coalesce((v_val->>'price_negotiable')::boolean, false),
    price_unit       = v_val->>'price_unit',
    price_unit_text  = v_val->>'price_unit_text',
    cover_photo_id   = CASE WHEN cardinality(v_photos) > 0 THEN coalesce(cover_photo_id, v_next) ELSE cover_photo_id END,
    updated_at       = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  v_after  := to_jsonb(v_row) - 'search_tsv' - 'updated_at';
  v_before := to_jsonb(v_prev) - 'search_tsv' - 'updated_at';
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;
  IF jsonb_array_length(v_removed) > 0 THEN
    v_diff_b := v_diff_b || jsonb_build_object('photos_removed', v_removed);
    v_diff_a := v_diff_a || jsonb_build_object('photos_removed', to_jsonb(v_photos));
  END IF;

  -- The fields as the seller will read them.
  SELECT coalesce(array_agg(DISTINCT f ORDER BY f), ARRAY[]::text[]) INTO v_fields
    FROM (SELECT CASE
                   WHEN k = 'title' THEN 'title'
                   WHEN k = 'description' THEN 'description'
                   WHEN k = 'category_id' THEN 'category'
                   WHEN k = 'attributes' THEN 'specs'
                   WHEN k LIKE 'price%' THEN 'price'
                   WHEN k IN ('photos_removed','cover_photo_id') THEN 'photos'
                 END AS f
            FROM jsonb_object_keys(v_diff_a) k) g
   WHERE f IS NOT NULL;
  IF cardinality(v_fields) = 0 THEN
    RAISE EXCEPTION 'nothing changed';
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_prev.seller_id, 'edit', v_diff_b, v_diff_a, v_uid);
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.admin_edit', 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('fields', to_jsonb(v_fields), 'reason', p_reason, 'note', v_note)));
  INSERT INTO public.seller_notices (seller_id, listing_id, kind, fields, reason, note)
    VALUES (v_prev.seller_id, p_listing_id, 'admin_edit', v_fields, p_reason, v_note);

  RETURN jsonb_build_object('ok', true, 'status', v_row.status, 'fields', to_jsonb(v_fields));
END $$;

REVOKE ALL ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) TO service_role;

-- ===== B — All listings, with the price's unit =====
DROP FUNCTION IF EXISTS public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer);
CREATE OR REPLACE FUNCTION public.admin_list_listings(
  p_view text DEFAULT 'all', p_search text DEFAULT NULL, p_country text DEFAULT NULL,
  p_category uuid DEFAULT NULL, p_seller text DEFAULT NULL, p_from date DEFAULT NULL,
  p_to date DEFAULT NULL, p_tier text DEFAULT NULL, p_limit integer DEFAULT 25, p_offset integer DEFAULT 0)
RETURNS TABLE (
  id uuid, title text, status text, tier text, severe boolean,
  seller_id uuid, seller_alias text, seller_business_name text, seller_email text,
  category_id uuid, category_name_en text, category_name_am text,
  place_name_en text, place_name_am text, country_code text,
  price_mode text, price_amount numeric, price_currency text, price_period text,
  price_bp integer, price_negotiable boolean, price_unit text, price_unit_text text,
  cover_paths jsonb, cover_storage_path text, photo_count integer,
  created_at timestamptz, published_at timestamptz, expires_at timestamptz, updated_at timestamptz,
  total_count bigint)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_email    boolean;
  v_statuses text[];
  v_term     text := lower(btrim(coalesce(p_search, '')));
  v_id       uuid;
  v_seller   text := lower(btrim(coalesce(p_seller, '')));
  v_country  text := upper(btrim(coalesce(p_country, '')));
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  v_statuses := CASE coalesce(p_view, 'all')
    WHEN 'live'    THEN ARRAY['active','reduced']
    WHEN 'waiting' THEN ARRAY['screening','held']
    WHEN 'ended'   THEN ARRAY['expired','sold']
    WHEN 'removed' THEN ARRAY['rejected','removed']
    WHEN 'all'     THEN ARRAY['screening','active','reduced','rejected','held','expired','sold','removed']
  END;
  IF v_statuses IS NULL THEN
    RAISE EXCEPTION 'unknown view';
  END IF;
  IF p_tier IS NOT NULL AND p_tier NOT IN ('premium','featured','regular') THEN
    RAISE EXCEPTION 'unknown tier';
  END IF;
  -- The seller's e-mail is read only by holders of profiles:view (the Users console's own rule).
  v_email := public.has_permission(v_uid, 'profiles', 'view');
  IF v_term ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    v_id := v_term::uuid;
  END IF;

  RETURN QUERY
  SELECT l.id, l.title, l.status, l.tier,
         coalesce(l.screening->>'severe', 'false') = 'true',
         l.seller_id, p.seller_alias,
         CASE WHEN p.seller_type = 'business' THEN p.business_name END,
         CASE WHEN v_email THEN u.email::text END,
         l.category_id, c.name_en, c.name_am,
         loc.name_en, loc.name_am, coalesce(loc.country_code, l.home_country_code)::text,
         l.price_mode, l.price_amount, l.price_currency::text, l.price_period,
         l.price_bp, l.price_negotiable, l.price_unit, l.price_unit_text,
         cover.paths, cover.storage_path,
         (SELECT count(*)::integer FROM public.listing_photos ph WHERE ph.listing_id = l.id),
         l.created_at, l.published_at, l.expires_at, l.updated_at,
         count(*) OVER ()
    FROM public.listings l
    LEFT JOIN public.profiles p ON p.user_id = l.seller_id
    LEFT JOIN auth.users u ON u.id = l.seller_id
    LEFT JOIN public.categories c ON c.id = l.category_id
    LEFT JOIN public.locations loc ON loc.id = l.location_id
    LEFT JOIN LATERAL (
      SELECT ph.paths, ph.storage_path
        FROM public.listing_photos ph
       WHERE ph.listing_id = l.id
       ORDER BY (ph.id = l.cover_photo_id) DESC, ph.display_order
       LIMIT 1) cover ON true
   WHERE l.status = ANY (v_statuses)
     AND l.status <> 'draft'
     AND (v_term = ''
          OR (v_id IS NOT NULL AND l.id = v_id)
          OR (v_id IS NULL AND position(v_term IN lower(l.title)) > 0))
     AND (v_country = '' OR coalesce(loc.country_code, l.home_country_code) = v_country)
     AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
     AND (v_seller = ''
          OR position(v_seller IN lower(coalesce(p.seller_alias, ''))) > 0
          OR (p.seller_type = 'business' AND position(v_seller IN lower(coalesce(p.business_name, ''))) > 0)
          OR (v_email AND position(v_seller IN lower(coalesce(u.email::text, ''))) > 0))
     AND (p_from IS NULL OR coalesce(l.published_first_at, l.created_at)::date >= p_from)
     AND (p_to IS NULL OR coalesce(l.published_first_at, l.created_at)::date <= p_to)
     AND (p_tier IS NULL OR l.tier = p_tier)
   ORDER BY coalesce(l.published_at, l.created_at) DESC, l.id DESC
   LIMIT LEAST(GREATEST(coalesce(p_limit, 25), 1), 100)
  OFFSET GREATEST(coalesce(p_offset, 0), 0);
END $$;

REVOKE ALL ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO service_role;

-- ===== C — proofs (catalogue reads, and calls with no session or a scratch identity that holds nothing) =====
DO $proof$
DECLARE
  v_fn  text;
  v_def text;
  v_err text;
  v_who uuid := gen_random_uuid();
BEGIN
  -- C1: definers with a fixed search path (the edit volatile, the list stable); the signed-in role runs them, anon
  -- and PUBLIC do not.
  FOREACH v_fn IN ARRAY ARRAY[
      'public.admin_edit_listing(uuid,jsonb,text,text)',
      'public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'] LOOP
    IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
       OR (SELECT p.proconfig FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'L4a C1: % is not a definer with its search path', v_fn;
    END IF;
    IF has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                   WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
      RAISE EXCEPTION 'L4a C1: % privileges', v_fn;
    END IF;
  END LOOP;
  IF (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure) <> 'v'
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'::regprocedure) <> 's' THEN
    RAISE EXCEPTION 'L4a C1: volatility';
  END IF;

  -- C2: the edit's gates in order as before; the content rules through step 5 with no end date and no places.
  v_def := pg_get_functiondef('public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''enforce'')%require_step_up_if_needed(''listings'', ''enforce'')%v_prev.status = ''draft''%v_prev.status = ''removed''%v_prev.seller_id = v_uid%validate_listing_draft(v_prev.seller_id, 5::smallint,%v_prev.video_url,%NULL, NULL, v_prev.contact_pref, v_prev.attributes,%INSERT INTO public.listing_revisions%INSERT INTO public.audit_log%INSERT INTO public.seller_notices%' THEN
    RAISE EXCEPTION 'L4a C2: admin_edit_listing''s gates or its content rules';
  END IF;
  IF v_def LIKE '%7::smallint%' OR v_def LIKE '%v_prev.poster_expires_at%' OR v_def LIKE '%listing_locations%' THEN
    RAISE EXCEPTION 'L4a C2: the edit still judges the contact step, the seller''s end date or the places';
  END IF;
  IF v_def LIKE '%status%=%''screening''%' THEN
    RAISE EXCEPTION 'L4a C2: an admin''s edit must not move the listing';
  END IF;

  -- C3: the list's gates as before, and the unit in each row.
  v_fn := 'public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)';
  v_def := pg_get_functiondef(v_fn::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''view'')%has_permission(v_uid, ''profiles'', ''view'')%CASE WHEN v_email THEN u.email::text END%l.price_unit, l.price_unit_text,%l.status <> ''draft''%' THEN
    RAISE EXCEPTION 'L4a C3: admin_list_listings''s gates or its unit';
  END IF;
  IF pg_get_function_result(v_fn::regprocedure) NOT LIKE '%price_negotiable boolean, price_unit text, price_unit_text text, cover_paths jsonb%' THEN
    RAISE EXCEPTION 'L4a C3: admin_list_listings''s columns';
  END IF;

  -- C4: with no session, both doors refuse before reading anything.
  PERFORM set_config('request.jwt.claims', '', true);
  FOREACH v_fn IN ARRAY ARRAY['list', 'edit'] LOOP
    v_err := NULL;
    BEGIN
      IF v_fn = 'list' THEN
        PERFORM * FROM public.admin_list_listings();
      ELSE
        PERFORM public.admin_edit_listing(NULL, '{"title":"x"}'::jsonb, 'misleading');
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    IF v_err IS DISTINCT FROM 'not signed in' THEN
      RAISE EXCEPTION 'L4a C4: the % door answered % to a call with no session', v_fn, coalesce(v_err, 'nothing');
    END IF;
  END LOOP;

  -- C5: a scratch identity that holds no permission (no account row is written) is refused by both.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who, 'role', 'authenticated')::text, true);
  FOREACH v_fn IN ARRAY ARRAY['list', 'edit'] LOOP
    v_err := NULL;
    BEGIN
      IF v_fn = 'list' THEN
        PERFORM * FROM public.admin_list_listings();
      ELSE
        PERFORM public.admin_edit_listing(NULL, '{"title":"x"}'::jsonb, 'misleading');
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    IF v_err IS DISTINCT FROM 'permission denied' THEN
      RAISE EXCEPTION 'L4a C5: the % door answered % to an identity with no permission', v_fn, coalesce(v_err, 'nothing');
    END IF;
  END LOOP;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261012030000') ON CONFLICT (version) DO NOTHING;
