-- e2e-areas: my-listings, posting, ad-page

-- Foundations 1, turn F1-7a, part 2 of 10 — THE SELLER'S AD READERS ON THE GATE (DEC-333; brief
-- docs/governance/briefs/f1-doors-7a.md; ruling docs/governance/briefs/f1-doors-7a-ruling-1.md; census
-- docs/governance/reports/f1-doors-7a.census.md). Five signed-in readers of one ad call door_context('reader') first
-- and read the caller from the gate's record: listing_counts, listing_history, my_listing, my_listing_certification,
-- my_listing_private. Each is redeclared whole from its last declaration, byte for byte apart from three named
-- changes: the gate's line before the caller's (`v_uid := v_ctx.uid`), the sentence refusals as codes
-- (`not authenticated` → notSignedIn, `not your listing` → notYourListing), and CREATE OR REPLACE. Grants are restated
-- as they stand (authenticated, service_role).

DO $pre$
DECLARE
  v_md5  text;
  v_fn   text;
  v_want text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119170000') THEN
    RAISE EXCEPTION 'F1-7a part 2: the mark 20261119170000 must be applied first';
  END IF;
  FOR v_fn, v_want IN VALUES
      ('public.listing_counts(uuid)', '717b7d1e73be25900600f7a7c6c491ce'),
      ('public.listing_history(uuid)', '8b71b1c3368284e598e18d6f29c2cda7'),
      ('public.my_listing(uuid)', 'bd071192f16c2c21ad1ec12932ab9c7d'),
      ('public.my_listing_certification(uuid)', 'bfcddd0a948b320e9947d1d053bbe8be'),
      ('public.my_listing_private(uuid)', 'b7332e5c36a8300aa73ba6084a43110b') LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'F1-7a part 2: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- The live definitions before the redeclarations: the proof runs them as pg_temp copies beside the new bodies.
CREATE TEMP TABLE f17a_p2_before ON COMMIT DROP AS
SELECT p.proname::text AS name, pg_get_functiondef(p.oid) AS def
  FROM pg_proc p
 WHERE p.oid = ANY (ARRAY[
   'public.listing_counts(uuid)'::regprocedure,
   'public.listing_history(uuid)'::regprocedure,
   'public.my_listing(uuid)'::regprocedure,
   'public.my_listing_certification(uuid)'::regprocedure,
   'public.my_listing_private(uuid)'::regprocedure]);

-- ------------------------------------------------------------ 1. listing_counts
CREATE OR REPLACE FUNCTION public.listing_counts(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ctx public.door_ctx := public.door_context('reader');
  v_uid uuid := v_ctx.uid;
  v_doc jsonb;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings l WHERE l.id = p_listing_id AND l.seller_id = v_uid) THEN
    PERFORM public.door_refuse('notYourListing');
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
GRANT EXECUTE ON FUNCTION public.listing_counts(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.listing_counts(uuid) TO service_role;

-- ------------------------------------------------------------ 2. listing_history
CREATE OR REPLACE FUNCTION public.listing_history(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx    public.door_ctx := public.door_context('reader');
  v_uid    uuid := v_ctx.uid;
  v_seller uuid;
  v_out    jsonb;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  SELECT l.seller_id INTO v_seller FROM public.listings l WHERE l.id = p_listing_id;
  -- One answer for "not yours" and "not there", so the door tells nobody which ads exist.
  IF v_seller IS NULL OR v_seller <> v_uid THEN PERFORM public.door_refuse('notYourListing'); END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'at', h.created_at,
           'kind', h.kind,
           'by', CASE WHEN h.actor IS NULL THEN 'system' WHEN h.actor = v_uid THEN 'you' ELSE 'staff' END,
           'from', h.b->'status',
           'to', h.a->'status',
           -- Bundle 16 turn 3 — a Reserved change says which way it went (true: marked, false: unmarked).
           'reserved', h.a->'reserved',
           'fields', (SELECT coalesce(jsonb_agg(k ORDER BY k), '[]'::jsonb)
                        FROM jsonb_object_keys(h.a) AS k WHERE k <> 'status'),
           'reason', n.reason,
           'note', n.note)
         ORDER BY h.created_at DESC, h.id DESC), '[]'::jsonb)
    INTO v_out
    FROM (SELECT r.id, r.kind, r.actor, r.created_at,
                 CASE WHEN jsonb_typeof(r.before) = 'object' THEN r.before ELSE '{}'::jsonb END AS b,
                 CASE WHEN jsonb_typeof(r.after) = 'object' THEN r.after ELSE '{}'::jsonb END AS a
            FROM public.listing_revisions r
           WHERE r.listing_id = p_listing_id
           ORDER BY r.created_at DESC, r.id DESC
           LIMIT 200) h
    LEFT JOIN LATERAL (
      SELECT sn.reason, sn.note
        FROM public.seller_notices sn
       WHERE sn.listing_id = p_listing_id AND sn.created_at = h.created_at
       ORDER BY sn.id
       LIMIT 1) n ON true;
  RETURN v_out;
END $function$;
REVOKE ALL ON FUNCTION public.listing_history(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.listing_history(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.listing_history(uuid) TO service_role;

-- ------------------------------------------------------------ 3. my_listing
CREATE OR REPLACE FUNCTION public.my_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx    public.door_ctx := public.door_context('reader');
  v_uid    uuid := v_ctx.uid;
  v_policy public.listing_policy%ROWTYPE;
  v_out    jsonb;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;

  SELECT jsonb_build_object(
           'listing',
             jsonb_build_object(
               'id', l.id,
               'publicId', l.public_id,
               'status', l.status,
               -- P-2 (a) — the ad's level and reach as they stand (DEC-328 / DEC-330; null until = no end).
               'level', l.tier,
               'levelUntil', l.tier_until,
               'levelSource', l.tier_source,
               'reach', l.reach,
               'reachUntil', l.reach_until,
               'title', l.title,
               'categoryId', l.category_id,
               'coverPhotoId', (SELECT p.id FROM public.listing_photos p
                                 WHERE p.listing_id = l.id AND p.exif_stripped
                                 ORDER BY p.display_order
                                 LIMIT 1),
               'photosSoon', l.photos_soon,
               'priceMode', l.price_mode,
               'priceAmount', l.price_amount,
               'priceCurrency', l.price_currency,
               'pricePeriod', l.price_period,
               'priceBp', l.price_bp,
               'priceNegotiable', l.price_negotiable,
               'priceUnit', l.price_unit,
               'priceUnitText', l.price_unit_text,
               -- D173 2 — the "Price reduced" record while its 14 days stand.
               'priceWas', CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END,
               'reserved', l.reserved_at IS NOT NULL,
               'publishedFirstAt', l.published_first_at,
               'publishedAt', l.published_at,
               'renewedAt', l.renewed_at,
               'expiresAt', l.expires_at,
               -- The days an ad has left (live) or keeps while closed: whole days, rounded up; null with no end date.
               'daysLeft', CASE WHEN l.status IN ('active','reduced') AND l.expires_at IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM (l.expires_at - now())) / 86400))::integer END,
               'daysKept', CASE WHEN l.status IN ('closed','paused') AND l.kept_remaining IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM l.kept_remaining) / 86400))::integer END,
               'soldAt', l.sold_at,
               -- Bundle 16 turn 3b (call H) — the word a sold ad takes: Rented or Filled when its category says so.
               'soldWord', coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                                 WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                       FROM public.categories c WHERE c.id = l.category_id), 'sold'),
               'createdAt', l.created_at,
               'updatedAt', l.updated_at,
               -- A removed ad's latest staff reason (seller_notices, which the seller already reads).
               'removedReason', CASE WHEN l.status = 'removed' THEN
                                  (SELECT sn.reason FROM public.seller_notices sn
                                    WHERE sn.listing_id = l.id AND sn.seller_id = v_uid AND sn.kind = 'admin_remove'
                                    ORDER BY sn.created_at DESC
                                    LIMIT 1) END),
           'group', public.listing_group_of(l.status),
           -- A closed or paused ad reopens to the live status it left (transition_listing takes exactly that one).
           'resumeStatus', l.resume_status,
           'countryCode', coalesce(loc.country_code, l.home_country_code),
           -- D174 3, D175 2 — the admin's renew setting, so the page offers Renew only when it is allowed.
           'renewAllowed', coalesce(v_policy.renew_allowed, false),
           'renewDays', v_policy.renew_days)
    INTO v_out
    FROM public.listings l
    LEFT JOIN public.locations loc ON loc.id = l.location_id
   WHERE l.id = p_listing_id AND l.seller_id = v_uid
     AND l.deleted_at IS NULL;

  -- One answer for "not yours" and "not there".
  IF v_out IS NULL THEN PERFORM public.door_refuse('notYourListing'); END IF;
  RETURN v_out;
END $function$;
REVOKE ALL ON FUNCTION public.my_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing(uuid) TO service_role;

-- ------------------------------------------------------------ 4. my_listing_certification
CREATE OR REPLACE FUNCTION public.my_listing_certification(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ctx public.door_ctx := public.door_context('reader');
  v_uid uuid := v_ctx.uid;
  v_set jsonb;
  v_ids uuid[];
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings x
                  WHERE x.id = p_listing_id AND x.seller_id = v_uid AND x.deleted_at IS NULL) THEN
    PERFORM public.door_refuse('notYourListing');
  END IF;
  v_set := public.legal_publishing_set(p_listing_id);
  SELECT array_agg((e ->> 'version_id')::uuid ORDER BY (e ->> 'version_id')::uuid) INTO v_ids
    FROM jsonb_array_elements(v_set) e;
  -- DEC-205 — an ad already certified for exactly these statements is not asked again: the screens see none.
  IF v_ids IS NOT NULL AND public.legal_listing_certified(p_listing_id, v_ids) THEN v_set := '[]'::jsonb; END IF;
  RETURN jsonb_build_object(
    'statements', v_set,
    'acceptance_pending', public.legal_acceptance_pending(v_uid, p_listing_id));
END;
$$;
REVOKE ALL ON FUNCTION public.my_listing_certification(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing_certification(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing_certification(uuid) TO service_role;

-- ------------------------------------------------------------ 5. my_listing_private
CREATE OR REPLACE FUNCTION public.my_listing_private(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx public.door_ctx := public.door_context('reader');
  v_uid uuid := v_ctx.uid;
  v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  SELECT * INTO v_row FROM public.listings
   WHERE id = p_listing_id AND seller_id = v_uid;
  IF NOT FOUND THEN PERFORM public.door_refuse('notYourListing'); END IF;
  RETURN jsonb_build_object(
    'listing_id', v_row.id,
    'contact_pref', v_row.contact_pref,
    'pin_lat', v_row.pin_lat,
    'pin_lng', v_row.pin_lng,
    'pin_precision', v_row.pin_precision,
    'pin_zoom', v_row.pin_zoom,
    'street_address', v_row.street_address,
    'directions', v_row.directions,
    'caps', public.listing_caps(v_row.id)
  );
END $function$;
REVOKE ALL ON FUNCTION public.my_listing_private(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing_private(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing_private(uuid) TO service_role;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) each body is the redeclared one, STABLE SECURITY DEFINER with search_path public, callable by authenticated
--       and the service role, never by anon or PUBLIC;
--   (b) on one set of scratch rows (a seller with an ad, its counters, a revision, a save by another person), the
--       seller's read of each reader equals the old body's answer (its pg_temp copy) on the same rows, and the
--       browser role reads the same;
--   (c) the exact refusals: signed out → notSignedIn; a deactivated caller → accountDeactivated; another person's
--       ad and an unknown id → notYourListing;
--   (d) the cost: 200 calls of each reader, the old body's median and the new one's as a NOTICE; a new median over
--       5 ms fails (ruling 7's bar, F1-1).
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
  v_names   text[] := ARRAY['listing_counts', 'listing_history', 'my_listing', 'my_listing_certification',
                            'my_listing_private'];
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
      ('public.listing_counts(uuid)', 'cb11c7fad2068848c501747ea1cf8d5a'),
      ('public.listing_history(uuid)', '6c5593badd9dd71d1e3c4f4509c1373a'),
      ('public.my_listing(uuid)', 'e707acdf42efee95d263de466544040e'),
      ('public.my_listing_certification(uuid)', '59d12e6bb838a24c1e3302cbeed015e3'),
      ('public.my_listing_private(uuid)', '9eb473ec806c4ba3a2852dfec4c46b7e') LOOP
    IF (SELECT md5(replace(prosrc, chr(13), '')) IS DISTINCT FROM v_want
               OR proconfig::text <> '{search_path=public}' OR provolatile <> 's' OR NOT prosecdef
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0) THEN
      RAISE EXCEPTION 'F1-7a part 2 proof (a): % is not the redeclared STABLE DEFINER reader with its grants', v_fn;
    END IF;
  END LOOP;

  BEGIN
    FOR v_r IN SELECT name, def FROM f17a_p2_before LOOP
      EXECUTE regexp_replace(v_r.def, '^CREATE OR REPLACE FUNCTION public\.' || v_r.name || '\(',
                             'CREATE FUNCTION pg_temp.f17a_old_' || v_r.name || '(');
    END LOOP;
    FOR v_r IN SELECT substr(p.proname, 10) AS name, pg_get_function_identity_arguments(p.oid) AS def
                 FROM pg_proc p
                WHERE p.pronamespace = pg_my_temp_schema() AND p.proname LIKE 'f17a\_old\_%' LOOP
      EXECUTE format('REVOKE ALL ON FUNCTION pg_temp.f17a_old_%s(%s) FROM PUBLIC', v_r.name, v_r.def);
    END LOOP;
    IF (SELECT count(*) FROM f17a_p2_before) <> 5 THEN
      RAISE EXCEPTION 'F1-7a part 2 proof: % old definitions captured, not 5', (SELECT count(*) FROM f17a_p2_before);
    END IF;

    v_tag := 'e2e-mig-f17a2-' || v_stem;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-7a part 2 proof: scratch code % already exists', v_code;
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
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_l, v_a, v_cat, v_city, v_tag || ' ad', 'scratch', v_code, 'active', now(), now(),
            now() + interval '10 days');
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES (v_l, v_city, 1)
    ON CONFLICT DO NOTHING;
    INSERT INTO public.listing_counters (listing_id, day, views, shares_qr) VALUES (v_l, current_date, 7, 2)
    ON CONFLICT (listing_id, day) DO UPDATE SET views = 7, shares_qr = 2;
    INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (v_l, v_a, 'edit', jsonb_build_object('title', 'before'), jsonb_build_object('title', 'after'), v_a);
    INSERT INTO public.saved_listings (user_id, listing_id) VALUES (v_b, v_l);

    -- (b) the seller's reads, old body beside new, then the new one through the browser role
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    FOREACH v_fn IN ARRAY v_names LOOP
      v_call := format('%s(%L::uuid)', v_fn, v_l);
      EXECUTE 'SELECT to_jsonb(pg_temp.f17a_old_' || v_call || ')' INTO v_old;
      EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_new;
      SET LOCAL ROLE authenticated;
      EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_as;
      RESET ROLE;
      IF v_new IS DISTINCT FROM v_old OR v_as IS DISTINCT FROM v_new OR v_new IS NULL OR v_new = 'null'::jsonb THEN
        RAISE EXCEPTION 'F1-7a part 2 proof (b): % read % before and % after (% as the browser role)',
          v_call, v_old, v_new, v_as;
      END IF;
    END LOOP;
    IF (public.listing_counts(v_l) ->> 'saves')::integer <> 1
       OR (public.listing_counts(v_l) ->> 'views')::integer <> 7
       OR jsonb_array_length(public.listing_history(v_l)) < 1
       OR public.my_listing_private(v_l) ->> 'listing_id' IS DISTINCT FROM v_l::text THEN
      RAISE EXCEPTION 'F1-7a part 2 proof (b): the scratch rows did not reach the seller''s reads';
    END IF;

    -- (c) the exact refusals, through the browser role
    FOR v_who, v_call, v_want IN
      SELECT w.who, c.call, CASE w.who WHEN 'out' THEN 'notSignedIn'
                                       WHEN 'deactivated' THEN 'accountDeactivated' ELSE 'notYourListing' END
        FROM (VALUES ('out'), ('deactivated'), ('other')) AS w(who)
       CROSS JOIN (SELECT format('%s(%L::uuid)', n, v_l) FROM unnest(v_names) AS n) AS c(call)
      UNION ALL
      SELECT 'seller', format('%s(%L::uuid)', n, gen_random_uuid()), 'notYourListing' FROM unnest(v_names) AS n
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE v_who WHEN 'out' THEN '{}'
                   ELSE json_build_object('sub', CASE v_who WHEN 'deactivated' THEN v_d WHEN 'other' THEN v_b
                                                            ELSE v_a END::text,
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
        RAISE EXCEPTION 'F1-7a part 2 proof (c): % as % answered % (%), not %', v_call, v_who,
          coalesce(v_got, 'success'), v_st, v_want;
      END IF;
    END LOOP;

    -- (d) the cost, the seller's reads
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    FOREACH v_fn IN ARRAY v_names LOOP
      v_call := format('%s(%L::uuid)', v_fn, v_l);
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
      RAISE NOTICE 'F1-7a part 2 cost: % median old % ms, new % ms', v_fn, round(v_mo::numeric, 4), round(v_mn::numeric, 4);
      IF v_mn > 5 THEN
        RAISE EXCEPTION 'F1-7a part 2 proof (d): % takes % ms a call (ruling 7''s bar: 5 ms)', v_fn, round(v_mn::numeric, 3);
      END IF;
    END LOOP;

    RAISE EXCEPTION 'f1-7a-part-2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-7a-part-2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119170100') ON CONFLICT DO NOTHING;
