-- e2e-areas: my-listings

-- Cursor bundle 7b — THE SELLER READS A REJECTION'S REASON, as a removed ad's (docs/governance/briefs/cursor-bundle-7b-ruling-2.md
-- decision 4). my_listings and my_listing are each declared again WHOLE from their last declarations (DEC-383:
-- my_listings from 20261122023200 section 2, my_listing from 20261119150100 section 3), their live md5 pre-checked and
-- their new md5 post-checked. The one change in each body: the reason field 'removedReason' is renamed 'staffReason',
-- the latest staff reason for an ad staff took off, read only from the caller's own seller_notices — a removed ad's
-- from kind admin_remove, a rejected ad's from kind admin_reject (the kind part 1 of this bundle added). The argument
-- lists and the return type do not change, so it is CREATE OR REPLACE with no DROP; the REVOKE and GRANT lines are
-- restated. The old name is gone from the answers.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261126020000') THEN
    RAISE EXCEPTION 'cursor-bundle-7b my-listings: the ledger''s newest mark 20261126020000 must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.my_listings(text,integer,integer,text,uuid[],text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '619f5b92860683dc5eb6b8686e0306bd' THEN
    RAISE EXCEPTION 'cursor-bundle-7b my-listings: the live my_listings is not 20261122023200''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.my_listing(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'e707acdf42efee95d263de466544040e' THEN
    RAISE EXCEPTION 'cursor-bundle-7b my-listings: the live my_listing is not 20261119150100''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. my_listings (whole from 20261122023200 section 2)
CREATE OR REPLACE FUNCTION public.my_listings(p_group text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0,
                                             p_search text DEFAULT NULL, p_category uuid[] DEFAULT NULL,
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
  v_categories uuid[];
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
  -- cursor-bundle-2 (DEC-420, DEC-423): a category list, each root with its subtree, read by the list rule.
  v_categories := public.door_filter_categories(p_category, 'category');

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
       AND (v_categories IS NULL OR l.category_id = ANY (v_categories))
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
               -- The latest staff reason for an ad staff took off (seller_notices, which the seller already reads):
               -- a removed ad's from kind admin_remove, a rejected ad's from kind admin_reject.
               'staffReason', CASE WHEN l.status IN ('removed', 'rejected') THEN
                                  (SELECT sn.reason FROM public.seller_notices sn
                                    WHERE sn.listing_id = l.id AND sn.seller_id = v_uid
                                      AND sn.kind = CASE l.status WHEN 'removed' THEN 'admin_remove' ELSE 'admin_reject' END
                                    ORDER BY sn.created_at DESC
                                    LIMIT 1) END) AS row
        FROM public.listings l
       WHERE l.seller_id = v_uid
         AND l.deleted_at IS NULL
         -- Bundle 16 turn R1 (D181) — the seller's search and filters; the counts follow them.
         AND (v_term = '' OR position(v_term IN lower(coalesce(l.title, ''))) > 0)
         AND (v_categories IS NULL OR l.category_id = ANY (v_categories))
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
REVOKE ALL ON FUNCTION public.my_listings(text, integer, integer, text, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listings(text, integer, integer, text, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.my_listings(text, integer, integer, text, uuid[], text) TO service_role;

-- ------------------------------------------------------------ 2. my_listing (whole from 20261119150100 section 3)
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
               -- The latest staff reason for an ad staff took off (seller_notices, which the seller already reads):
               -- a removed ad's from kind admin_remove, a rejected ad's from kind admin_reject.
               'staffReason', CASE WHEN l.status IN ('removed', 'rejected') THEN
                                  (SELECT sn.reason FROM public.seller_notices sn
                                    WHERE sn.listing_id = l.id AND sn.seller_id = v_uid
                                      AND sn.kind = CASE l.status WHEN 'removed' THEN 'admin_remove' ELSE 'admin_reject' END
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

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts of both: same argument lists, STABLE SECURITY DEFINER with search_path public, EXECUTE for
--     authenticated and the service role, never anon or PUBLIC; each body this file's (md5).
-- (b) the reason, on scratch ads of one scratch seller: a rejected ad reads its LATEST admin_reject reason, another
--     seller's newer notice on it is never read; a removed ad reads its admin_remove reason, never an admin_reject one
--     beside it; a rejected ad with only an admin_remove notice, a removed ad with only an admin_reject notice and a
--     rejected ad with only another seller's notice read none; an ad no staff took off reads none even with a notice
--     on it. my_listing and my_listings answer the same value for each ad, and neither answers the old name.
DO $proof$
DECLARE
  v_hex   text := replace(gen_random_uuid()::text, '-', '');
  v_tag   text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code  character(2) := 'XZ';
  v_lang  text := public.language_code('base');
  v_r0    text;
  v_a     uuid := gen_random_uuid();
  v_b     uuid := gen_random_uuid();
  v_ca    text;
  v_anc   uuid;
  v_region uuid;
  v_city  uuid;
  v_cat   uuid;
  v_rej   uuid := gen_random_uuid();
  v_rem   uuid := gen_random_uuid();
  v_rej2  uuid := gen_random_uuid();
  v_rem2  uuid := gen_random_uuid();
  v_rej3  uuid := gen_random_uuid();
  v_scr   uuid := gen_random_uuid();
  v_fn    regprocedure;
  v_one   jsonb;
  v_many  jsonb;
  v_map   jsonb;
  v_want  jsonb;
  v_msg   text;
  v_id    uuid;
BEGIN
  FOREACH v_fn IN ARRAY ARRAY['public.my_listings(text,integer,integer,text,uuid[],text)'::regprocedure,
                              'public.my_listing(uuid)'::regprocedure] LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-7b my-listings proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
  END LOOP;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p
       WHERE p.oid = 'public.my_listings(text,integer,integer,text,uuid[],text)'::regprocedure)
     IS DISTINCT FROM 'c11b4628cd29d62e5646c46d4a55f663' THEN
    RAISE EXCEPTION 'cursor-bundle-7b my-listings proof (a): the my_listings body differs from this file';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p
       WHERE p.oid = 'public.my_listing(uuid)'::regprocedure)
     IS DISTINCT FROM '33d0ed8c251305665a80eaa56422def3' THEN
    RAISE EXCEPTION 'cursor-bundle-7b my-listings proof (a): the my_listing body differs from this file';
  END IF;

  v_tag := 'e2e-mig-b7b2-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  v_ca := json_build_object('sub', v_a::text, 'role', 'authenticated')::text;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'cursor-bundle-7b my-listings proof: the scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'cursor-bundle-7b my-listings proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-b7b2-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_b]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);
    -- The scratch seller's six ads: rej (rejected, two admin_reject notices and a newer one of the other seller's),
    -- rem (removed, an admin_remove notice and a newer admin_reject one), rej2 (rejected, only an admin_remove
    -- notice), rem2 (removed, only an admin_reject notice), rej3 (rejected, only the other seller's notice), scr
    -- (screening, with an admin_reject notice).
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status)
    VALUES (v_rej, v_a, v_cat, v_city, v_tag || ' a rejected', 'A scratch ad for the reason proof.', v_code, 'free', 'rejected'),
           (v_rem, v_a, v_cat, v_city, v_tag || ' b removed', 'A scratch ad for the reason proof.', v_code, 'free', 'removed'),
           (v_rej2, v_a, v_cat, v_city, v_tag || ' c rejected 2', 'A scratch ad for the reason proof.', v_code, 'free', 'rejected'),
           (v_rem2, v_a, v_cat, v_city, v_tag || ' d removed 2', 'A scratch ad for the reason proof.', v_code, 'free', 'removed'),
           (v_rej3, v_a, v_cat, v_city, v_tag || ' e rejected 3', 'A scratch ad for the reason proof.', v_code, 'free', 'rejected'),
           (v_scr, v_a, v_cat, v_city, v_tag || ' f waiting', 'A scratch ad for the reason proof.', v_code, 'free', 'screening');
    INSERT INTO public.seller_notices (seller_id, listing_id, kind, fields, reason, note, created_at) VALUES
      (v_a, v_rej,  'admin_reject', ARRAY['status'], 'rules',      NULL, now() - interval '3 hours'),
      (v_a, v_rej,  'admin_reject', ARRAY['status'], 'duplicate',  NULL, now() - interval '2 hours'),
      (v_b, v_rej,  'admin_reject', ARRAY['status'], 'photo',      NULL, now() - interval '1 hour'),
      (v_a, v_rem,  'admin_remove', ARRAY['status'], 'prohibited', NULL, now() - interval '2 hours'),
      (v_a, v_rem,  'admin_reject', ARRAY['status'], 'misleading', NULL, now() - interval '1 hour'),
      (v_a, v_rej2, 'admin_remove', ARRAY['status'], 'rules',      NULL, now() - interval '1 hour'),
      (v_a, v_rem2, 'admin_reject', ARRAY['status'], 'rules',      NULL, now() - interval '1 hour'),
      (v_b, v_rej3, 'admin_reject', ARRAY['status'], 'photo',      NULL, now() - interval '1 hour'),
      (v_a, v_scr,  'admin_reject', ARRAY['status'], 'rules',      NULL, now() - interval '1 hour');

    -- (b) the reason, as the seller reads each ad: by my_listing, then by my_listings.
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_want := jsonb_build_object(v_rej::text, 'duplicate', v_rem::text, 'prohibited', v_rej2::text, NULL,
                                 v_rem2::text, NULL, v_rej3::text, NULL, v_scr::text, NULL);
    FOR v_id IN SELECT x FROM unnest(ARRAY[v_rej, v_rem, v_rej2, v_rem2, v_rej3, v_scr]) x LOOP
      v_one := public.my_listing(v_id) -> 'listing';
      IF v_one IS NULL OR NOT (v_one ? 'staffReason') OR (v_one ? 'removedReason')
         OR (v_one -> 'staffReason') IS DISTINCT FROM (v_want -> v_id::text) THEN
        RAISE EXCEPTION 'cursor-bundle-7b my-listings proof (b): my_listing read % for % (wanted %)',
          v_one -> 'staffReason', v_id, v_want -> v_id::text;
      END IF;
    END LOOP;
    v_many := public.my_listings('attention', 100, 0);
    v_map := (SELECT coalesce(jsonb_object_agg(r ->> 'id', r -> 'staffReason'), '{}'::jsonb)
                FROM jsonb_array_elements(v_many -> 'rows') r);
    IF (SELECT count(*) FROM jsonb_array_elements(v_many -> 'rows') r WHERE r ? 'removedReason') <> 0
       OR (SELECT count(*) FROM jsonb_array_elements(v_many -> 'rows') r WHERE NOT (r ? 'staffReason')) <> 0 THEN
      RAISE EXCEPTION 'cursor-bundle-7b my-listings proof (b): my_listings answered the old name or lacks the new one';
    END IF;
    FOR v_id IN SELECT x FROM unnest(ARRAY[v_rej, v_rem, v_rej2, v_rem2, v_rej3]) x LOOP
      IF (v_map -> v_id::text) IS DISTINCT FROM (v_want -> v_id::text) THEN
        RAISE EXCEPTION 'cursor-bundle-7b my-listings proof (b): my_listings read % for % (wanted %)',
          v_map -> v_id::text, v_id, v_want -> v_id::text;
      END IF;
    END LOOP;
    v_many := public.my_listings('review', 100, 0);
    IF (SELECT r -> 'staffReason' FROM jsonb_array_elements(v_many -> 'rows') r WHERE r ->> 'id' = v_scr::text)
       IS DISTINCT FROM 'null'::jsonb THEN
      RAISE EXCEPTION 'cursor-bundle-7b my-listings proof (b): an ad in review read a staff reason';
    END IF;

    RAISE EXCEPTION 'cursor-bundle-7b-my-listings-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'cursor-bundle-7b-my-listings-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261126040000') ON CONFLICT DO NOTHING;
