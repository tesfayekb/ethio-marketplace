-- e2e-areas: my-listings, posting

-- Foundations 1, turn F1-7a, part 3 of 10 — THE SELLER'S LIST READERS ON THE GATE (DEC-333; brief
-- docs/governance/briefs/f1-doors-7a.md; ruling docs/governance/briefs/f1-doors-7a-ruling-1.md; census
-- docs/governance/reports/f1-doors-7a.census.md). Three signed-in readers of the seller's own ads call
-- door_context('reader') first and read the caller from the gate's record: my_listings, my_last_listing_private,
-- my_recent_categories. Each is redeclared whole from its last declaration, byte for byte apart from three named
-- changes: the gate's line before the caller's (`v_uid := v_ctx.uid`), the sentence refusals as codes
-- (`not authenticated` → notSignedIn; my_listings' `unknown group` / `bad page` / `bad search` / `unknown mark` →
-- badValue:group|page|search|mark), and CREATE OR REPLACE. Grants are restated as they stand (authenticated,
-- service_role).

DO $pre$
DECLARE
  v_md5  text;
  v_fn   text;
  v_want text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119170100') THEN
    RAISE EXCEPTION 'F1-7a part 3: the mark 20261119170100 must be applied first';
  END IF;
  FOR v_fn, v_want IN VALUES
      ('public.my_listings(text,integer,integer,text,uuid,text)', '8eeba7bbb45afe77623d4f2d6dd898af'),
      ('public.my_last_listing_private(uuid)', '7319e9bab115b8681131ed524cb1ab1b'),
      ('public.my_recent_categories()', 'b309bc46855d34842419b1ca4b5bd500') LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'F1-7a part 3: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- The live definitions before the redeclarations: the proof runs them as pg_temp copies beside the new bodies.
CREATE TEMP TABLE f17a_p3_before ON COMMIT DROP AS
SELECT p.proname::text AS name, pg_get_functiondef(p.oid) AS def
  FROM pg_proc p
 WHERE p.oid = ANY (ARRAY[
   'public.my_listings(text,integer,integer,text,uuid,text)'::regprocedure,
   'public.my_last_listing_private(uuid)'::regprocedure,
   'public.my_recent_categories()'::regprocedure]);

-- ------------------------------------------------------------ 1. my_listings
CREATE OR REPLACE FUNCTION public.my_listings(p_group text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0,
                                             p_search text DEFAULT NULL, p_category uuid DEFAULT NULL,
                                             p_mark text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx    public.door_ctx := public.door_context('reader');
  v_uid    uuid := v_ctx.uid;
  v_counts jsonb;
  v_rows   jsonb;
  v_term   text := lower(btrim(coalesce(p_search, '')));
  v_policy public.listing_policy%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  IF p_group IS NULL OR p_group NOT IN ('live','review','attention','closed','sold','drafts') THEN
    PERFORM public.door_refuse('badValue', 'group');
  END IF;
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 100 OR p_offset IS NULL OR p_offset < 0 THEN
    PERFORM public.door_refuse('badValue', 'page');
  END IF;
  -- Bundle 16 turn R1 (D181) — the seller's search (words of the title) and filters (a category with everything
  -- under it; Reserved; Price reduced).
  IF length(v_term) > 100 THEN PERFORM public.door_refuse('badValue', 'search'); END IF;
  IF p_mark IS NOT NULL AND p_mark NOT IN ('reserved','reduced') THEN PERFORM public.door_refuse('badValue', 'mark'); END IF;

  -- The groups of My listings (D138, D173–D175; P-2 M-1c, D317): live (active, reduced), in review (screening,
  -- held), needs attention (rejected, removed, paused — a level ended with no free slot), closed (closed,
  -- expired), sold, drafts — one mapper, listing_group_of, which raises on a status it does not know (INC-1057).
  WITH mine AS (
    SELECT l.status,
           public.listing_group_of(l.status) AS grp
      FROM public.listings l
     WHERE l.seller_id = v_uid
       AND l.deleted_at IS NULL
       -- Bundle 16 turn R1 (D181) — the seller's search and filters; the counts follow them.
       AND (v_term = '' OR position(v_term IN lower(coalesce(l.title, ''))) > 0)
       AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
       AND (p_mark IS NULL
            OR (p_mark = 'reserved' AND l.reserved_at IS NOT NULL)
            OR (p_mark = 'reduced' AND l.status <> 'sold' AND l.price_drop_at > now() - interval '14 days'))
  )
  SELECT jsonb_build_object(
           'live',      count(*) FILTER (WHERE grp = 'live'),
           'review',    count(*) FILTER (WHERE grp = 'review'),
           'attention', count(*) FILTER (WHERE grp = 'attention'),
           'closed',    count(*) FILTER (WHERE grp = 'closed'),
           'sold',      count(*) FILTER (WHERE grp = 'sold'),
           'drafts',    count(*) FILTER (WHERE grp = 'drafts'))
    INTO v_counts
    FROM mine;

  SELECT coalesce(jsonb_agg(r.row ORDER BY r.changed DESC, r.id DESC), '[]'::jsonb)
    INTO v_rows
    FROM (
      SELECT l.id, coalesce(l.updated_at, l.created_at) AS changed,
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
                                    LIMIT 1) END) AS row
        FROM public.listings l
       WHERE l.seller_id = v_uid
         AND l.deleted_at IS NULL
         -- Bundle 16 turn R1 (D181) — the seller's search and filters; the counts follow them.
         AND (v_term = '' OR position(v_term IN lower(coalesce(l.title, ''))) > 0)
         AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
         AND (p_mark IS NULL
              OR (p_mark = 'reserved' AND l.reserved_at IS NOT NULL)
              OR (p_mark = 'reduced' AND l.status <> 'sold' AND l.price_drop_at > now() - interval '14 days'))
         AND public.listing_group_of(l.status) = p_group
       ORDER BY coalesce(l.updated_at, l.created_at) DESC, l.id DESC
       LIMIT p_limit OFFSET p_offset
    ) r;

  -- Bundle 16 turn R1 (D181) — the admin's renew setting, as my_listing gives it, for the rows' Renew.
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;
  RETURN jsonb_build_object('counts', v_counts, 'rows', v_rows,
                            'renewAllowed', coalesce(v_policy.renew_allowed, false),
                            'renewDays', v_policy.renew_days);
END $function$;
REVOKE ALL ON FUNCTION public.my_listings(text, integer, integer, text, uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listings(text, integer, integer, text, uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.my_listings(text, integer, integer, text, uuid, text) TO service_role;

-- ------------------------------------------------------------ 2. my_last_listing_private
CREATE OR REPLACE FUNCTION public.my_last_listing_private(p_exclude uuid DEFAULT NULL::uuid)
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
    'directions', v_row.directions
  );
END $function$;
REVOKE ALL ON FUNCTION public.my_last_listing_private(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_last_listing_private(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_last_listing_private(uuid) TO service_role;

-- ------------------------------------------------------------ 3. my_recent_categories
CREATE OR REPLACE FUNCTION public.my_recent_categories()
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
  RETURN jsonb_build_object('categories', coalesce((
    SELECT jsonb_agg(jsonb_build_object('id', c.category_id, 'ads', c.ads)
      ORDER BY c.ads DESC, c.latest DESC, c.category_id)
      FROM (
        SELECT l.category_id, count(*)::integer AS ads, max(l.published_first_at) AS latest
          FROM public.listings l JOIN public.categories cat ON cat.id = l.category_id
         WHERE l.seller_id = v_uid AND l.published_first_at IS NOT NULL
           AND cat.is_active AND cat.allow_listings
           AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers ptr WHERE ptr.parent_id = cat.id)
         GROUP BY l.category_id
         ORDER BY count(*) DESC, max(l.published_first_at) DESC, l.category_id
         LIMIT 5
      ) c
  ), '[]'::jsonb));
END $function$;
REVOKE ALL ON FUNCTION public.my_recent_categories() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_recent_categories() TO authenticated;
GRANT ALL ON FUNCTION public.my_recent_categories() TO service_role;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) each body is the redeclared one, STABLE SECURITY DEFINER with search_path public, callable by authenticated
--       and the service role, never by anon or PUBLIC;
--   (b) on one set of scratch rows (a seller with an ad in force), the seller's read of each reader equals the old
--       body's answer (its pg_temp copy) on the same rows, and the browser role reads the same;
--   (c) the exact refusals: signed out → notSignedIn; a deactivated caller → accountDeactivated; my_listings' bad
--       group, page, search and mark → badValue:<field>; another person's reads never carry the seller's ad;
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
      ('public.my_listings(text,integer,integer,text,uuid,text)', 'de99323ea3dfe39e78fa49ce8c7d8aa9'),
      ('public.my_last_listing_private(uuid)', '01c43a5cbe9c4205d3915f909ef523d8'),
      ('public.my_recent_categories()', '3dedcf06f31b525fc02008816e694123') LOOP
    IF (SELECT md5(replace(prosrc, chr(13), '')) IS DISTINCT FROM v_want
               OR proconfig::text <> '{search_path=public}' OR provolatile <> 's' OR NOT prosecdef
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0) THEN
      RAISE EXCEPTION 'F1-7a part 3 proof (a): % is not the redeclared STABLE DEFINER reader with its grants', v_fn;
    END IF;
  END LOOP;

  BEGIN
    FOR v_r IN SELECT name, def FROM f17a_p3_before LOOP
      EXECUTE regexp_replace(v_r.def, '^CREATE OR REPLACE FUNCTION public\.' || v_r.name || '\(',
                             'CREATE FUNCTION pg_temp.f17a_old_' || v_r.name || '(');
    END LOOP;
    FOR v_r IN SELECT substr(p.proname, 10) AS name, pg_get_function_identity_arguments(p.oid) AS def
                 FROM pg_proc p
                WHERE p.pronamespace = pg_my_temp_schema() AND p.proname LIKE 'f17a\_old\_%' LOOP
      EXECUTE format('REVOKE ALL ON FUNCTION pg_temp.f17a_old_%s(%s) FROM PUBLIC', v_r.name, v_r.def);
    END LOOP;
    IF (SELECT count(*) FROM f17a_p3_before) <> 3 THEN
      RAISE EXCEPTION 'F1-7a part 3 proof: % old definitions captured, not 3', (SELECT count(*) FROM f17a_p3_before);
    END IF;

    v_tag := 'e2e-mig-f17a3-' || v_stem;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-7a part 3 proof: scratch code % already exists', v_code;
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

    -- (b) the seller's reads, old body beside new, then the new one through the browser role
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    FOREACH v_call IN ARRAY ARRAY[
        'my_listings(''live'')',
        format('my_listings(''live'', 50, 0, %L)', v_tag),
        format('my_listings(''live'', 50, 0, NULL, %L::uuid)', v_cat),
        'my_last_listing_private()',
        format('my_last_listing_private(%L::uuid)', v_l),
        'my_recent_categories()'] LOOP
      EXECUTE 'SELECT to_jsonb(pg_temp.f17a_old_' || v_call || ')' INTO v_old;
      EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_new;
      SET LOCAL ROLE authenticated;
      EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_as;
      RESET ROLE;
      IF v_new IS DISTINCT FROM v_old OR v_as IS DISTINCT FROM v_new
         OR (v_new IS NULL AND v_call NOT LIKE 'my_last_listing_private(''%') THEN
        RAISE EXCEPTION 'F1-7a part 3 proof (b): % read % before and % after (% as the browser role)',
          v_call, v_old, v_new, v_as;
      END IF;
    END LOOP;
    IF NOT (public.my_listings('live')::text LIKE '%' || v_l::text || '%')
       OR public.my_last_listing_private() ->> 'listing_id' IS DISTINCT FROM v_l::text
       OR jsonb_array_length(public.my_recent_categories() -> 'categories') <> 1 THEN
      RAISE EXCEPTION 'F1-7a part 3 proof (b): the scratch rows did not reach the seller''s reads';
    END IF;

    -- (c) the exact refusals, through the browser role
    FOR v_who, v_call, v_want IN
      SELECT w.who, c.call, CASE w.who WHEN 'out' THEN 'notSignedIn' ELSE 'accountDeactivated' END
        FROM (VALUES ('out'), ('deactivated')) AS w(who)
       CROSS JOIN (VALUES ('my_listings(''live'')'), ('my_last_listing_private()'), ('my_recent_categories()')) AS c(call)
      UNION ALL
      SELECT 'seller', c.call, c.want
        FROM (VALUES
         ('my_listings(''nope'')', 'badValue:group'),
         ('my_listings(NULL)', 'badValue:group'),
         ('my_listings(''live'', 0)', 'badValue:page'),
         ('my_listings(''live'', 50, -1)', 'badValue:page'),
         (format('my_listings(''live'', 50, 0, %L)', repeat('x', 101)), 'badValue:search'),
         ('my_listings(''live'', 50, 0, NULL, NULL, ''nope'')', 'badValue:mark')) AS c(call, want)
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE v_who WHEN 'out' THEN '{}'
                   ELSE json_build_object('sub', CASE v_who WHEN 'deactivated' THEN v_d ELSE v_a END::text,
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
        RAISE EXCEPTION 'F1-7a part 3 proof (c): % as % answered % (%), not %', v_call, v_who,
          coalesce(v_got, 'success'), v_st, v_want;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_b::text, 'role', 'authenticated')::text, true);
    IF public.my_listings('live')::text LIKE '%' || v_l::text || '%'
       OR public.my_last_listing_private() IS NOT NULL
       OR jsonb_array_length(public.my_recent_categories() -> 'categories') <> 0 THEN
      RAISE EXCEPTION 'F1-7a part 3 proof (c): another person''s read carried the seller''s ad';
    END IF;

    -- (d) the cost, the seller's reads
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    FOREACH v_call IN ARRAY ARRAY['my_listings(''live'')', 'my_last_listing_private()', 'my_recent_categories()'] LOOP
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
      RAISE NOTICE 'F1-7a part 3 cost: % median old % ms, new % ms', v_fn, round(v_mo::numeric, 4), round(v_mn::numeric, 4);
      IF v_mn > 5 THEN
        RAISE EXCEPTION 'F1-7a part 3 proof (d): % takes % ms a call (ruling 7''s bar: 5 ms)', v_fn, round(v_mn::numeric, 3);
      END IF;
    END LOOP;

    RAISE EXCEPTION 'f1-7a-part-3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-7a-part-3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119170200') ON CONFLICT DO NOTHING;
