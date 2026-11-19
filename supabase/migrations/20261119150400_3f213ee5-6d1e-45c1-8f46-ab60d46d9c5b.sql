-- e2e-areas: ad-page, settings, account, seller-name, posting

-- Foundations 1, turn F1-7a, part 5 of 10 — THE PERSON'S OWN READERS ON THE GATE (DEC-333; brief
-- docs/governance/briefs/f1-doors-7a.md; ruling docs/governance/briefs/f1-doors-7a-ruling-1.md). Four signed-in
-- readers call door_context('reader') first and read the caller from the gate's record: my_saved_listings,
-- my_seller_line, my_seller_place, my_viewing_location (`not authenticated` / `not signed in` → notSignedIn;
-- my_saved_listings' `badSize` sentence → badSize and its `badCursor` sentence → badValue:cursor). Each is redeclared
-- whole from its last declaration, byte for byte apart from those lines and CREATE OR REPLACE; grants restated as
-- they stand (authenticated, service_role).

DO $pre$
DECLARE
  v_md5  text;
  v_fn   text;
  v_want text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119170300') THEN
    RAISE EXCEPTION 'F1-7a part 5: the mark 20261119170300 must be applied first';
  END IF;
  FOR v_fn, v_want IN VALUES
      ('public.my_saved_listings(jsonb,integer)', 'a97294ca81edeeafb02688d1afced62a'),
      ('public.my_seller_line()', '3f047866c6606f435e19116b176076de'),
      ('public.my_seller_place()', '207a62507515108ecbb5028f08e62df0'),
      ('public.my_viewing_location()', '1bb879fd3701485cf77e99fd499be486') LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'F1-7a part 5: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- The live definitions before the redeclarations: the proof runs them as pg_temp copies beside the new bodies.
CREATE TEMP TABLE f17a_p5_before ON COMMIT DROP AS
SELECT p.proname::text AS name, pg_get_functiondef(p.oid) AS def
  FROM pg_proc p
 WHERE p.oid = ANY (ARRAY[
   'public.my_saved_listings(jsonb,integer)'::regprocedure,
   'public.my_seller_line()'::regprocedure,
   'public.my_seller_place()'::regprocedure,
   'public.my_viewing_location()'::regprocedure]);

-- ------------------------------------------------------------ 1. my_saved_listings
CREATE OR REPLACE FUNCTION public.my_saved_listings(p_after jsonb DEFAULT NULL::jsonb, p_size integer DEFAULT 20)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx   public.door_ctx := public.door_context('reader');
  v_uid   uuid := v_ctx.uid;
  v_c_at  timestamptz;
  v_c_id  uuid;
  v_cards jsonb := '[]'::jsonb;
  v_rec   record;
  v_n     integer := 0;
  v_next  jsonb := NULL;
  v_last_at timestamptz;
  v_last_id uuid;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  IF p_size IS NULL OR p_size < 1 OR p_size > 50 THEN PERFORM public.door_refuse('badSize'); END IF;
  IF p_after IS NOT NULL THEN
    BEGIN
      v_c_at := (p_after->>'a')::timestamptz;
      v_c_id := (p_after->>'i')::uuid;
    EXCEPTION WHEN others THEN
      PERFORM public.door_refuse('badValue', 'cursor');
    END;
    IF v_c_at IS NULL OR v_c_id IS NULL THEN PERFORM public.door_refuse('badValue', 'cursor'); END IF;
  END IF;
  FOR v_rec IN
    SELECT s.created_at AS saved_at, s.listing_id,
           l.public_id, l.title, l.price_amount, l.price_currency, l.price_mode, l.price_bp,
           l.price_negotiable, l.price_period, l.price_unit, l.price_unit_text,
           l.photos_soon, l.tier, l.category_id, l.location_id, l.published_at,
           (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff()))) AS available,
           CASE WHEN l.status = 'sold' THEN coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                               WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                     FROM public.categories c WHERE c.id = l.category_id), 'sold') END AS sold_word,
           l.reserved_at IS NOT NULL AS reserved,
           CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END AS price_was,
           loc.name_en AS location_name_en, loc.name_am AS location_name_am,
           f.placement, f.badge,
           (SELECT p.id FROM public.listing_photos p
             WHERE p.listing_id = l.id AND p.exif_stripped AND NOT p.unscreened
             ORDER BY p.display_order
             LIMIT 1) AS cover_photo_id
      FROM public.saved_listings s
      JOIN public.listings l ON l.id = s.listing_id
      LEFT JOIN public.locations loc ON loc.id = l.location_id
      -- P-2 (c) M-3c-a (DEC-352): the ad's all-categories, everywhere feed row carries its look.
      LEFT JOIN public.feed_index f
        ON f.listing_id = l.id AND f.category_key = '00000000-0000-0000-0000-000000000000'::uuid AND f.place_key = '00000000-0000-0000-0000-000000000000'::uuid
     WHERE s.user_id = v_uid
       AND (v_c_at IS NULL OR (s.created_at, s.listing_id) < (v_c_at, v_c_id))
     ORDER BY s.created_at DESC, s.listing_id DESC
     LIMIT p_size + 1
  LOOP
    -- INC-701 — the cursor names the LAST card of this page (the next page reads the rows below it); the extra row
    -- fetched only says that a next page exists.
    IF v_n = p_size THEN
      v_next := jsonb_build_object('a', v_last_at, 'i', v_last_id);
      EXIT;
    END IF;
    v_last_at := v_rec.saved_at;
    v_last_id := v_rec.listing_id;
    -- An ad no longer public travels as a grey card only: its ids (for Remove), when it was saved, and available false —
    -- no title, price, place, mark or photo, so nothing written after it left the public (an edit under review, an ad
    -- removed by staff) reaches a buyer through his list.
    IF NOT v_rec.available THEN
      v_cards := v_cards || jsonb_build_array(jsonb_build_object(
        'id', v_rec.listing_id,
        'publicId', v_rec.public_id,
        'savedAt', v_rec.saved_at,
        'available', false));
      v_n := v_n + 1;
      CONTINUE;
    END IF;
    v_cards := v_cards || jsonb_build_array(jsonb_build_object(
      'id', v_rec.listing_id,
      'publicId', v_rec.public_id,
      'title', v_rec.title,
      'priceAmount', v_rec.price_amount,
      'priceCurrency', v_rec.price_currency,
      'priceMode', v_rec.price_mode,
      'priceBp', v_rec.price_bp,
      'priceNegotiable', v_rec.price_negotiable,
      'pricePeriod', v_rec.price_period,
      'priceUnit', v_rec.price_unit,
      'priceUnitText', v_rec.price_unit_text,
      'photosSoon', v_rec.photos_soon,
      'coverPhotoId', v_rec.cover_photo_id,
      'soldWord', v_rec.sold_word,
      'reserved', v_rec.reserved,
      'priceWas', v_rec.price_was,
      'tier', v_rec.tier,
      -- P-2 (c) M-3c-a (DEC-352): the level's look — its key and the two axes the index row carries (written by
      -- feed_index_refresh from level_perks_for); NULL axes for a level unknown or switched off, or an ad with no such row.
      'level', jsonb_build_object('key', v_rec.tier, 'placement', v_rec.placement, 'badge', v_rec.badge),
      'publishedAt', v_rec.published_at,
      'categoryId', v_rec.category_id,
      'locationId', v_rec.location_id,
      'locationNameEn', v_rec.location_name_en,
      'locationNameAm', v_rec.location_name_am,
      'step', 1,
      'savedAt', v_rec.saved_at,
      'available', v_rec.available));
    v_n := v_n + 1;
  END LOOP;
  RETURN jsonb_build_object(
    'cards', v_cards,
    -- P-2 (c) M-3c-a (DEC-351 §8): the dictionary the cards' level keys read — every enabled level row.
    'levels', (SELECT coalesce(jsonb_agg(jsonb_build_object('key', k.key, 'sort', k.sort, 'name_en', k.name_en,
                                                            'name_am', k.name_am, 'is_baseline', k.is_baseline)
                                         ORDER BY k.sort, k.key), '[]'::jsonb)
                 FROM public.listing_packages k
                WHERE k.kind = 'level' AND k.enabled),
    'next', v_next);
END $function$;
REVOKE ALL ON FUNCTION public.my_saved_listings(jsonb, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_saved_listings(jsonb, integer) TO authenticated;
GRANT ALL ON FUNCTION public.my_saved_listings(jsonb, integer) TO service_role;

-- ------------------------------------------------------------ 2. my_seller_line
CREATE OR REPLACE FUNCTION public.my_seller_line()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx public.door_ctx := public.door_context('reader');
  v_uid uuid := v_ctx.uid;
  v_p   public.profiles%ROWTYPE;
  v_prev text;
  v_last timestamptz;
  v_corr timestamptz;
  v_review boolean;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  SELECT * INTO v_p FROM public.profiles WHERE user_id = v_uid;
  SELECT h.alias INTO v_prev FROM public.alias_history h
   WHERE h.user_id = v_uid AND h.released_at IS NOT NULL
     AND h.released_at > now() - interval '365 days'
     AND h.alias_fold IS DISTINCT FROM public.name_fold(v_p.seller_alias)
   ORDER BY h.released_at DESC LIMIT 1;
  SELECT max(h.taken_at) INTO v_last FROM public.alias_history h WHERE h.user_id = v_uid;
  IF v_last IS NOT NULL AND now() - v_last < interval '24 hours' THEN
    v_corr := v_last + interval '24 hours';
  END IF;
  -- N1b-2c (INC-977): the owner keeps their own name and learns it is held; the same fail-closed
  -- test as seller_public_alias (any 'imitates' row on the name subject, no text condition, INC-986).
  v_review := EXISTS (SELECT 1 FROM public.name_checks c
                       WHERE c.profile_id = v_uid AND c.subject = 'alias' AND c.state = 'imitates');
  RETURN jsonb_build_object('alias', v_p.seller_alias, 'previous_alias', v_prev,
                            'member_since', v_p.created_at,
                            'next_change_at', public.alias_next_change_at(v_uid),
                            'correction_until', v_corr,
                            'under_review', v_review);
END $function$
;
REVOKE ALL ON FUNCTION public.my_seller_line() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_seller_line() TO authenticated;
GRANT ALL ON FUNCTION public.my_seller_line() TO service_role;

-- ------------------------------------------------------------ 3. my_seller_place
CREATE OR REPLACE FUNCTION public.my_seller_place()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx public.door_ctx := public.door_context('reader');
  v_uid uuid := v_ctx.uid;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  RETURN (SELECT jsonb_build_object(
            'location_id', s.location_id, 'pin_lat', s.pin_lat, 'pin_lng', s.pin_lng,
            'pin_precision', s.pin_precision, 'pin_zoom', s.pin_zoom,
            'street_address', s.street_address, 'directions', s.directions,
            'updated_at', s.updated_at)
            FROM public.seller_places s WHERE s.user_id = v_uid);
END $function$;
REVOKE ALL ON FUNCTION public.my_seller_place() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_seller_place() TO authenticated;
GRANT ALL ON FUNCTION public.my_seller_place() TO service_role;

-- ------------------------------------------------------------ 4. my_viewing_location
CREATE OR REPLACE FUNCTION public.my_viewing_location()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ctx     public.door_ctx := public.door_context('reader');
  v_uid     uuid := v_ctx.uid;
  v_id      uuid;
  v_at      timestamptz;
  v_country text;
BEGIN
  IF v_uid IS NULL THEN
    PERFORM public.door_refuse('notSignedIn');
  END IF;

  SELECT p.viewing_location_id, p.viewing_location_at INTO v_id, v_at
    FROM public.profiles p
   WHERE p.user_id = v_uid;
  IF v_id IS NULL THEN
    RETURN jsonb_build_object('id', NULL, 'country', NULL, 'at', NULL, 'usable', false);
  END IF;

  SELECT l.country_code INTO v_country FROM public.locations l WHERE l.id = v_id;
  RETURN jsonb_build_object(
    'id', v_id,
    'country', v_country,
    'at', v_at,
    'usable', v_country IS NOT NULL
              AND EXISTS (SELECT 1 FROM public.get_location_tree(v_country) t WHERE t.id = v_id));
END $$;
REVOKE ALL ON FUNCTION public.my_viewing_location() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_viewing_location() TO authenticated;
GRANT ALL ON FUNCTION public.my_viewing_location() TO service_role;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) each body is the redeclared one, STABLE SECURITY DEFINER with search_path public, callable by authenticated
--       and the service role, never by anon or PUBLIC;
--   (b) on one set of scratch rows (a seller with an ad, a seller place and a viewing place; a second person who
--       saved the ad), each reader's answer equals the old body's on the same rows, and the browser role reads the
--       same;
--   (c) the exact refusals: signed out → notSignedIn; a deactivated caller → accountDeactivated; my_saved_listings'
--       bad sizes → badSize and bad cursors → badValue:cursor; another person's saved list never carries the ad;
--   (d) the cost: 200 calls of each reader, old and new medians as a NOTICE; a new median over 5 ms fails (ruling 7's
--       bar, F1-1).
DO $proof$
DECLARE
  v_stem    text := translate(substr(md5(gen_random_uuid()::text), 1, 10), '0123456789', 'ghijkmnopr');
  v_tag     text;
  -- 'XZ' a scratch code no market holds (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_l       uuid := gen_random_uuid();
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_r       record;
  v_fn      text;
  v_who     text;
  v_call    text;
  v_want    text;
  v_got     text;
  v_st      text;
  v_old     jsonb;
  v_new     jsonb;
  v_as      jsonb;
  v_t0      timestamptz;
  v_old_ms  double precision[];
  v_new_ms  double precision[];
  v_mo      double precision;
  v_mn      double precision;
  i         integer;
  v_msg     text;
BEGIN
  -- (a)
  FOR v_fn, v_want IN VALUES
      ('public.my_saved_listings(jsonb,integer)', '7438ae1a723e2f599ba4affe37607886'),
      ('public.my_seller_line()', 'e171cf1127a5e6f605ca1ef820e43b81'),
      ('public.my_seller_place()', 'f69ef2d1ef8b0d1b3d5d78f0ba5867c8'),
      ('public.my_viewing_location()', '81a45debc5db3d69a146018a22fdaaa1') LOOP
    IF (SELECT md5(replace(prosrc, chr(13), '')) IS DISTINCT FROM v_want
               OR proconfig::text <> '{search_path=public}' OR provolatile <> 's' OR NOT prosecdef
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0) THEN
      RAISE EXCEPTION 'F1-7a part 5 proof (a): % is not the redeclared STABLE DEFINER reader with its grants', v_fn;
    END IF;
  END LOOP;

  BEGIN
    FOR v_r IN SELECT name, def FROM f17a_p5_before LOOP
      EXECUTE regexp_replace(v_r.def, '^CREATE OR REPLACE FUNCTION public\.' || v_r.name || '\(',
                             'CREATE FUNCTION pg_temp.f17a_old_' || v_r.name || '(');
    END LOOP;
    FOR v_r IN SELECT substr(p.proname, 10) AS name, pg_get_function_identity_arguments(p.oid) AS def
                 FROM pg_proc p
                WHERE p.pronamespace = pg_my_temp_schema() AND p.proname LIKE 'f17a\_old\_%' LOOP
      EXECUTE format('REVOKE ALL ON FUNCTION pg_temp.f17a_old_%s(%s) FROM PUBLIC', v_r.name, v_r.def);
    END LOOP;
    IF (SELECT count(*) FROM f17a_p5_before) <> 4 THEN
      RAISE EXCEPTION 'F1-7a part 5 proof: % old definitions captured, not 4', (SELECT count(*) FROM f17a_p5_before);
    END IF;

    v_tag := 'e2e-mig-f17a5-' || v_stem;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-7a part 5 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
       AND a.name_en LIKE 'e2e-mig-%';
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_d
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_d AND u.email LIKE 'e2e-mig-%');
    UPDATE public.profiles SET viewing_location_id = v_city, viewing_location_at = now()
     WHERE user_id = v_a
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_a AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.seller_places (user_id, location_id, street_address, home_country_code)
    VALUES (v_a, v_city, v_tag || ' street', v_code);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_l, v_a, v_cat, v_city, v_tag || ' ad', 'scratch', v_code, 'active', now(), now(),
            now() + interval '10 days');
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES (v_l, v_city, 1)
    ON CONFLICT DO NOTHING;
    INSERT INTO public.saved_listings (user_id, listing_id) VALUES (v_b, v_l);

    -- (b) old body beside new, by caller; then the new one through the browser role
    FOR v_who, v_call IN VALUES
        ('a', 'my_seller_line()'),
        ('a', 'my_seller_place()'),
        ('a', 'my_viewing_location()'),
        ('b', 'my_saved_listings()'),
        ('b', 'my_saved_listings(NULL, 1)'),
        ('b', 'my_viewing_location()') LOOP
      PERFORM set_config('request.jwt.claims',
        json_build_object('sub', CASE v_who WHEN 'a' THEN v_a ELSE v_b END::text, 'role', 'authenticated')::text, true);
      EXECUTE 'SELECT to_jsonb(pg_temp.f17a_old_' || v_call || ')' INTO v_old;
      EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_new;
      SET LOCAL ROLE authenticated;
      EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_as;
      RESET ROLE;
      IF v_new IS DISTINCT FROM v_old OR v_as IS DISTINCT FROM v_new OR v_new IS NULL OR v_new = 'null'::jsonb THEN
        RAISE EXCEPTION 'F1-7a part 5 proof (b): % as % read % before and % after (% as the browser role)',
          v_call, v_who, v_old, v_new, v_as;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    IF public.my_seller_place() ->> 'location_id' IS DISTINCT FROM v_city::text
       OR public.my_viewing_location() ->> 'id' IS DISTINCT FROM v_city::text THEN
      RAISE EXCEPTION 'F1-7a part 5 proof (b): the scratch places did not reach the reads';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_b::text, 'role', 'authenticated')::text, true);
    IF NOT (public.my_saved_listings()::text LIKE '%' || v_tag || ' ad%') THEN
      RAISE EXCEPTION 'F1-7a part 5 proof (b): the scratch save did not reach the saved list';
    END IF;

    -- (c) the exact refusals, through the browser role
    FOR v_who, v_call, v_want IN
      SELECT w.who, c.call, CASE w.who WHEN 'out' THEN 'notSignedIn' ELSE 'accountDeactivated' END
        FROM (VALUES ('out'), ('deactivated')) AS w(who)
       CROSS JOIN (VALUES ('my_saved_listings()'), ('my_seller_line()'), ('my_seller_place()'),
                          ('my_viewing_location()')) AS c(call)
      UNION ALL
      SELECT 'b', c.call, c.want
        FROM (VALUES ('my_saved_listings(NULL, 0)', 'badSize'),
                     ('my_saved_listings(NULL, 51)', 'badSize'),
                     ('my_saved_listings(''{"a": "not a time", "i": "x"}''::jsonb)', 'badValue:cursor'),
                     ('my_saved_listings(''{"a": "2026-01-01T00:00:00Z"}''::jsonb)', 'badValue:cursor')) AS c(call, want)
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE v_who WHEN 'out' THEN '{}'
                   ELSE json_build_object('sub', CASE v_who WHEN 'deactivated' THEN v_d ELSE v_b END::text,
                                          'role', 'authenticated')::text END, true);
      v_got := NULL; v_st := NULL;
      SET LOCAL ROLE authenticated;
      BEGIN
        EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_new;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_got = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      RESET ROLE;
      IF v_got IS DISTINCT FROM v_want OR v_st IS DISTINCT FROM 'P0D01' THEN
        RAISE EXCEPTION 'F1-7a part 5 proof (c): % as % answered % (%), not %', v_call, v_who,
          coalesce(v_got, 'success'), v_st, v_want;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    IF public.my_saved_listings()::text LIKE '%' || v_tag || ' ad%' THEN
      RAISE EXCEPTION 'F1-7a part 5 proof (c): another person''s saved list carried the ad';
    END IF;

    -- (d) the cost
    FOR v_who, v_call IN VALUES
        ('a', 'my_seller_line()'),
        ('a', 'my_seller_place()'),
        ('a', 'my_viewing_location()'),
        ('b', 'my_saved_listings()') LOOP
      PERFORM set_config('request.jwt.claims',
        json_build_object('sub', CASE v_who WHEN 'a' THEN v_a ELSE v_b END::text, 'role', 'authenticated')::text, true);
      v_fn := split_part(v_call, '(', 1);
      v_old_ms := ARRAY[]::double precision[];
      v_new_ms := ARRAY[]::double precision[];
      FOR i IN 1..200 LOOP
        v_t0 := clock_timestamp();
        EXECUTE 'SELECT to_jsonb(pg_temp.f17a_old_' || v_call || ')' INTO v_old;
        v_old_ms := array_append(v_old_ms, extract(epoch FROM clock_timestamp() - v_t0) * 1000.0);
        v_t0 := clock_timestamp();
        EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_new;
        v_new_ms := array_append(v_new_ms, extract(epoch FROM clock_timestamp() - v_t0) * 1000.0);
      END LOOP;
      SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY s) INTO v_mo FROM unnest(v_old_ms) AS s;
      SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY s) INTO v_mn FROM unnest(v_new_ms) AS s;
      RAISE NOTICE 'F1-7a part 5 cost: % median old % ms, new % ms', v_fn, round(v_mo::numeric, 4), round(v_mn::numeric, 4);
      IF v_mn > 5 THEN
        RAISE EXCEPTION 'F1-7a part 5 proof (d): % takes % ms a call (ruling 7''s bar: 5 ms)', v_fn, round(v_mn::numeric, 3);
      END IF;
    END LOOP;

    RAISE EXCEPTION 'f1-7a-part-5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-7a-part-5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119170400') ON CONFLICT DO NOTHING;
