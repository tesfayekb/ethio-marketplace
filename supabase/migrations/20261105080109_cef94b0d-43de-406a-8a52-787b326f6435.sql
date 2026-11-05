-- e2e-areas: my-listings, ad-page
-- P-2 (a) M-1c, part 6 of 7 — My listings knows a paused ad (plan §3; ruling 9 H4; ruling 10; D317).
-- ONE mapper, public.listing_group_of(p_status text) RETURNS text (IMMUTABLE, born closed): a status to
-- its My-listings group — paused joins rejected and removed under "needs attention" (D317; the operator may
-- override before (b)); the rest as before; an unknown status RAISEs 'my_listings: unmapped status %'
-- (INC-1057: the old CASE had no ELSE). my_listings and my_listing are redeclared WHOLE from
-- 20261017060602 (:200, :338; live md5s checked first), the three CASE copies replaced by the mapper;
-- 'daysKept' counts a paused ad's kept time as a closed one's; the card and the ad gain 'level',
-- 'levelUntil', 'levelSource', 'reach', 'reachUntil' (DEC-328 / DEC-330).
-- CF-STATUS-1 (scripts/conformance/status-map.ts) holds every status to the mapper and to part 7's views.
-- Headers and closers restated; every other byte as before.
-- Ruling 11 (INC-1059): the scratch level row carries its perks (perks_by_kind_check); proof text only, mark unchanged.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF to_regprocedure('public.listing_group_of(text)') IS NOT NULL THEN
    RAISE EXCEPTION 'P-2 M-1c part 6: listing_group_of already exists';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.my_listings(text, integer, integer, text, uuid, text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '2310b382616390164f0c733a09ec331e' THEN
    RAISE EXCEPTION 'P-2 M-1c part 6: the live my_listings is not 20261017060602''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.my_listing(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '41eccb7ac49817efdf0248b98590fae3' THEN
    RAISE EXCEPTION 'P-2 M-1c part 6: the live my_listing is not 20261017060602''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE MAPPER
CREATE FUNCTION public.listing_group_of(p_status text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SET search_path TO 'public'
AS $fn$
DECLARE
  v_group text;
BEGIN
  -- The groups of My listings (D138, D173–D175; D317 — paused needs attention). CF-STATUS-1 holds every
  -- status of listings_status_check to a WHEN here; an unknown status is a defect, never a hidden ad.
  v_group := CASE p_status
    WHEN 'active' THEN 'live'        WHEN 'reduced' THEN 'live'
    WHEN 'screening' THEN 'review'   WHEN 'held' THEN 'review'
    WHEN 'rejected' THEN 'attention' WHEN 'removed' THEN 'attention' WHEN 'paused' THEN 'attention'
    WHEN 'closed' THEN 'closed'      WHEN 'expired' THEN 'closed'
    WHEN 'sold' THEN 'sold'          WHEN 'draft' THEN 'drafts'
  END;
  IF v_group IS NULL THEN RAISE EXCEPTION 'my_listings: unmapped status %', p_status; END IF;
  RETURN v_group;
END $fn$;
COMMENT ON FUNCTION public.listing_group_of(text) IS
  'An ad''s status to its My-listings group (live, review, attention, closed, sold, drafts; paused → attention, D317); raises on a status it does not know (INC-1057). The one mapper my_listings and my_listing read (P-2 M-1c).';
REVOKE ALL ON FUNCTION public.listing_group_of(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listing_group_of(text) TO service_role;

-- ------------------------------------------------------------ 2. my_listings (whole from 20261017060602 :200)
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
  v_uid    uuid := auth.uid();
  v_counts jsonb;
  v_rows   jsonb;
  v_term   text := lower(btrim(coalesce(p_search, '')));
  v_policy public.listing_policy%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_group IS NULL OR p_group NOT IN ('live','review','attention','closed','sold','drafts') THEN
    RAISE EXCEPTION 'unknown group';
  END IF;
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 100 OR p_offset IS NULL OR p_offset < 0 THEN
    RAISE EXCEPTION 'bad page';
  END IF;
  -- Bundle 16 turn R1 (D181) — the seller's search (words of the title) and filters (a category with everything
  -- under it; Reserved; Price reduced).
  IF length(v_term) > 100 THEN RAISE EXCEPTION 'bad search'; END IF;
  IF p_mark IS NOT NULL AND p_mark NOT IN ('reserved','reduced') THEN RAISE EXCEPTION 'unknown mark'; END IF;

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

-- ------------------------------------------------------------ 3. my_listing (whole from 20261017060602 :338)
CREATE OR REPLACE FUNCTION public.my_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_policy public.listing_policy%ROWTYPE;
  v_out    jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
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
  IF v_out IS NULL THEN RAISE EXCEPTION 'not your listing'; END IF;
  RETURN v_out;
END $function$;
REVOKE ALL ON FUNCTION public.my_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing(uuid) TO service_role;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) the readers' bodies are the texts above (md5, CR-stripped — law 13); headers and grants (catalog
-- facts). (b) the mapper: paused → attention; an unknown status raises. (c) scratch rows: a seller with a
-- live ad on a level, a paused ad (the state machine, as the service) and a closed ad; my_listings counts the
-- paused ad under attention and lists it with its kept days and the level fields; my_listing says
-- 'attention'; a stranger is refused. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_map    regprocedure := 'public.listing_group_of(text)'::regprocedure;
  v_myl    regprocedure := 'public.my_listings(text, integer, integer, text, uuid, text)'::regprocedure;
  v_my1    regprocedure := 'public.my_listing(uuid)'::regprocedure;
  v_seller uuid := gen_random_uuid();
  v_other  uuid := gen_random_uuid();
  v_tag    text := 'e2e-mig-p2-m1c6-' || substr(gen_random_uuid()::text, 1, 8);
  v_code   char(2) := 'XZ';
  v_anc    uuid;
  v_stem   text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lv     text := 'e2e_mig_lv_' || v_stem;
  v_cat    uuid;
  v_live   uuid := gen_random_uuid();
  v_paused uuid := gen_random_uuid();
  v_closed uuid := gen_random_uuid();
  v_ans    jsonb;
  v_card   jsonb;
  v_base   text;
  v_msg    text;
BEGIN
  v_base := public.baseline_level_key();  -- law 11 (DEC-341)
  -- (a)
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_myl) IS DISTINCT FROM '8eeba7bbb45afe77623d4f2d6dd898af'
     OR (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_my1) IS DISTINCT FROM 'bd071192f16c2c21ad1ec12932ab9c7d' THEN
    RAISE EXCEPTION 'P-2 M-1c part 6 proof (a): a reader''s body is not the text above';
  END IF;
  IF (SELECT prosecdef OR provolatile <> 'i' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_map)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_map)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_map, 'EXECUTE') OR has_function_privilege('authenticated', v_map, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_map, 'EXECUTE')
     OR (SELECT count(*) FROM pg_proc WHERE oid IN (v_myl, v_my1) AND prosecdef AND provolatile = 's' AND proconfig::text = '{search_path=public}') <> 2
     OR has_function_privilege('anon', v_myl, 'EXECUTE') OR has_function_privilege('anon', v_my1, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_myl, 'EXECUTE') OR NOT has_function_privilege('authenticated', v_my1, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_myl, 'EXECUTE') OR NOT has_function_privilege('service_role', v_my1, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 M-1c part 6 proof (a): a header or a grant differs';
  END IF;
  -- (b)
  IF public.listing_group_of('paused') IS DISTINCT FROM 'attention' OR public.listing_group_of('closed') IS DISTINCT FROM 'closed' THEN
    RAISE EXCEPTION 'P-2 M-1c part 6 proof (b): the mapper does not put a paused ad under attention';
  END IF;
  v_msg := NULL;
  BEGIN
    PERFORM public.listing_group_of(v_tag);
  EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
  END;
  IF v_msg IS DISTINCT FROM 'my_listings: unmapped status ' || v_tag THEN
    RAISE EXCEPTION 'P-2 M-1c part 6 proof (b): an unknown status answered %', coalesce(v_msg, 'a group');
  END IF;

  BEGIN
    -- The scratch market: a published ad needs a place (listings_place_unless_draft); the anchor serves.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1c part 6 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1c6', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1c6';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 M-1c part 6 proof: the scratch market has no anchor'; END IF;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_other,  v_tag || '-other@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1c6 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_lv, 'level', 'E2E P2 level', 10, 6, 'boost', false, true, true, false, 9000);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at, tier, tier_until, tier_source)
    SELECT x.id, v_seller, v_cat, v_anc, 'E2E P2 M1c6 ' || x.nm, 'scratch', v_code, 'active', now(), now(),
           now() + interval '10 days', coalesce(x.lv, v_base), x.lu, x.ls
      FROM (VALUES (v_live, 'live', v_lv, now() + interval '5 days', 'staff'),
                   (v_paused, 'paused', NULL, NULL, NULL),
                   (v_closed, 'closed', NULL, NULL, NULL)) AS x(id, nm, lv, lu, ls);
    PERFORM set_config('request.jwt.claims', '{}', true);
    PERFORM public.transition_listing(v_paused, 'paused');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    PERFORM public.transition_listing(v_closed, 'closed');
    IF (SELECT string_agg(status, ',' ORDER BY status) FROM public.listings WHERE id IN (v_paused, v_closed)) <> 'closed,paused' THEN
      RAISE EXCEPTION 'P-2 M-1c part 6 proof: the scratch ads did not reach paused and closed';
    END IF;

    -- (c) the seller's page: the counts, the attention group, the paused card.
    v_ans := public.my_listings('attention');
    IF (v_ans->'counts'->>'attention')::integer <> 1 OR (v_ans->'counts'->>'live')::integer <> 1
       OR (v_ans->'counts'->>'closed')::integer <> 1 OR (v_ans->'counts'->>'sold')::integer <> 0
       OR jsonb_array_length(v_ans->'rows') <> 1 OR (v_ans->'rows'->0->>'id')::uuid <> v_paused THEN
      RAISE EXCEPTION 'P-2 M-1c part 6 proof (c): the paused ad is not alone under attention (%)', v_ans->'counts';
    END IF;
    v_card := v_ans->'rows'->0;
    IF v_card->>'status' <> 'paused' OR (v_card->>'daysKept')::integer <> 10
       OR NOT (v_card ? 'level' AND v_card ? 'levelUntil' AND v_card ? 'levelSource' AND v_card ? 'reach' AND v_card ? 'reachUntil')
       OR v_card->>'level' IS NULL OR v_card->>'levelUntil' IS NOT NULL OR v_card->>'reach' IS NOT NULL THEN
      RAISE EXCEPTION 'P-2 M-1c part 6 proof (c): the paused card lacks its kept days or level fields (%)', v_card;
    END IF;
    v_ans := public.my_listings('live');
    v_card := v_ans->'rows'->0;
    IF jsonb_array_length(v_ans->'rows') <> 1 OR (v_card->>'id')::uuid <> v_live OR v_card->>'level' <> v_lv
       OR v_card->>'levelSource' <> 'staff' OR v_card->>'levelUntil' IS NULL OR v_card->>'daysKept' IS NOT NULL THEN
      RAISE EXCEPTION 'P-2 M-1c part 6 proof (c): the live card does not carry its level (%)', v_card;
    END IF;
    v_ans := public.my_listing(v_paused);
    IF v_ans->>'group' <> 'attention' OR v_ans->'listing'->>'status' <> 'paused' OR v_ans->>'resumeStatus' <> 'active'
       OR (v_ans->'listing'->>'daysKept')::integer <> 10 OR NOT (v_ans->'listing' ? 'level') THEN
      RAISE EXCEPTION 'P-2 M-1c part 6 proof (c): my_listing does not say attention for the paused ad (%)', v_ans->>'group';
    END IF;
    -- A stranger: refused by my_listing; my_listings counts nothing of the seller's.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_other::text, 'role', 'authenticated')::text, true);
    v_msg := NULL;
    BEGIN
      v_ans := public.my_listing(v_paused);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'not your listing' THEN
      RAISE EXCEPTION 'P-2 M-1c part 6 proof (c): a stranger read the paused ad (%)', coalesce(v_msg, 'success');
    END IF;
    v_ans := public.my_listings('attention');
    IF (v_ans->'counts'->>'attention')::integer <> 0 OR jsonb_array_length(v_ans->'rows') <> 0 THEN
      RAISE EXCEPTION 'P-2 M-1c part 6 proof (c): a stranger''s page counted the seller''s ad';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c6-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261105100600') ON CONFLICT DO NOTHING;
