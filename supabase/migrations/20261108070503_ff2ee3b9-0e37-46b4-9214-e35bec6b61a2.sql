-- e2e-areas: seller-name
-- P-2 turn (c) M-3c-a, part 4 of 6 — THE LEVEL'S LOOK ON THE SELLER'S PAGE (docs/governance/briefs/
-- p2-fold-c2a-ruling-2.md §1, §3 — DEC-352). It follows part 3 (the feed).
-- public.seller_feed_page redeclared whole from 20261029091909 (85de2619) :8, its last declaration (5.3 KB; md5
-- c39aaa046d09bd3d98d9f6f5c3fe21db, checked live below), header and grants unchanged, with part 3's three fragments
-- (f.placement and f.badge from the all-categories, everywhere index row it already reads; each card's `level`; the
-- answer's `levels` dictionary). No resolver call per card. Whole text, not computed insertion: the seller-name
-- census (scripts/conformance/seller-names.test.ts latestBodies, INC-1083) reads the latest declared body, and a
-- format() template would hide it. Every other key is unchanged. Proofs at the end on scratch rows (market XZ,
-- currency XTS, e2e_mig_ keys), rolled back by the sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261108090200') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 4: part 3 (6ea5ac5b, mark 20261108090200) must be applied first';
  END IF;
  -- G39: the body this file redeclares is, live, the body of its last declaration.
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.seller_feed_page(text, jsonb, integer)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'c39aaa046d09bd3d98d9f6f5c3fe21db' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 4: live seller_feed_page is not 20261029091909''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE SELLER'S PAGE
CREATE OR REPLACE FUNCTION public.seller_feed_page(p_seller_key text, p_after jsonb DEFAULT NULL::jsonb, p_size integer DEFAULT 20)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  c_nil      constant uuid := '00000000-0000-0000-0000-000000000000';
  v_key      text := lower(btrim(coalesce(p_seller_key, '')));
  v_seller   uuid;
  v_alias    text;
  v_business text;
  v_type     text;
  v_since    timestamptz;
  v_has_cur  boolean := false;
  v_c_tier   smallint;
  v_c_pub    timestamptz;
  v_c_id     uuid;
  v_cards    jsonb := '[]'::jsonb;
  v_n        integer := 0;
  v_rec      record;
  v_end_t    smallint;
  v_end_p    timestamptz;
  v_end_i    uuid;
BEGIN
  IF p_size IS NULL OR p_size < 1 OR p_size > 50 THEN
    RAISE EXCEPTION 'seller_feed_page: badSize';
  END IF;
  -- D201 §12 — the public seller key is the seller's alias, lower-cased (the alias is unique on lower(); never an id).
  IF v_key !~ '^[a-z0-9_]{1,60}$' THEN
    RAISE EXCEPTION 'seller_feed_page: unknownSeller';
  END IF;
  SELECT p.user_id, p.business_name, p.seller_type, p.created_at
    INTO v_seller, v_business, v_type, v_since
    FROM public.profiles p
   WHERE lower(p.seller_alias) = v_key
     AND p.account_status = 'active';
  IF v_seller IS NULL THEN
    RAISE EXCEPTION 'seller_feed_page: unknownSeller';
  END IF;
  -- N1b-2c (INC-977, R5): the shown name comes from the one helper; a held name ('imitates') answers
  -- exactly as an unknown name does, for every caller, the owner included.
  v_alias := public.seller_public_alias(v_seller);
  IF v_alias IS NULL THEN
    RAISE EXCEPTION 'seller_feed_page: unknownSeller';
  END IF;

  -- The cursor: the last card's (tier, publish time, id) of the previous page — feed_page's shape, one step.
  IF p_after IS NOT NULL THEN
    BEGIN
      v_c_tier := (p_after->>'t')::smallint;
      v_c_pub  := (p_after->>'p')::timestamptz;
      v_c_id   := (p_after->>'i')::uuid;
    EXCEPTION WHEN others THEN
      RAISE EXCEPTION 'seller_feed_page: badCursor';
    END;
    IF v_c_tier IS NULL OR v_c_pub IS NULL OR v_c_id IS NULL THEN
      RAISE EXCEPTION 'seller_feed_page: badCursor';
    END IF;
    v_has_cur := true;
  END IF;

  -- The seller's ads in the feed's own order and public predicate: the feed index's "all categories, everywhere"
  -- row of each listing (one per ad), live or sold within 30 days, by the listings' seller index.
  FOR v_rec IN
    SELECT f.tier_rank, f.published_at, f.listing_id, f.placement, f.badge,
           l.public_id, l.title, l.price_amount, l.price_currency, l.price_mode, l.price_bp,
           l.price_negotiable, l.price_period, l.price_unit, l.price_unit_text,
           l.photos_soon, l.tier, l.category_id, l.location_id,
           CASE WHEN l.status = 'sold' THEN coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                               WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                     FROM public.categories c WHERE c.id = l.category_id), 'sold') END AS sold_word,
           l.reserved_at IS NOT NULL AS reserved,
           CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END AS price_was,
           loc.name_en AS location_name_en, loc.name_am AS location_name_am,
           (SELECT p.id FROM public.listing_photos p
             WHERE p.listing_id = l.id AND p.exif_stripped AND NOT p.unscreened
             ORDER BY p.display_order
             LIMIT 1) AS cover_photo_id
      FROM public.listings l
      JOIN public.feed_index f
        ON f.listing_id = l.id AND f.category_key = c_nil AND f.place_key = c_nil
      LEFT JOIN public.locations loc ON loc.id = l.location_id
     WHERE l.seller_id = v_seller
       AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))
       AND (NOT v_has_cur OR (f.tier_rank, f.published_at, f.listing_id) < (v_c_tier, v_c_pub, v_c_id))
     ORDER BY f.tier_rank DESC, f.published_at DESC, f.listing_id DESC
     LIMIT p_size
  LOOP
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
      -- feed_index_refresh from level_perks_for); NULL axes for a level unknown or switched off.
      'level', jsonb_build_object('key', v_rec.tier, 'placement', v_rec.placement, 'badge', v_rec.badge),
      'publishedAt', v_rec.published_at,
      'categoryId', v_rec.category_id,
      'locationId', v_rec.location_id,
      'locationNameEn', v_rec.location_name_en,
      'locationNameAm', v_rec.location_name_am,
      'step', 1));
    v_n := v_n + 1;
    v_end_t := v_rec.tier_rank;
    v_end_p := v_rec.published_at;
    v_end_i := v_rec.listing_id;
  END LOOP;

  RETURN jsonb_build_object(
    'seller', jsonb_build_object(
      'alias', v_alias,
      'businessName', CASE WHEN v_type = 'business' THEN v_business END,
      'memberSince', v_since),
    'cards', v_cards,
    -- P-2 (c) M-3c-a (DEC-351 §8): the dictionary the cards' level keys read — every enabled level row.
    'levels', (SELECT coalesce(jsonb_agg(jsonb_build_object('key', k.key, 'sort', k.sort, 'name_en', k.name_en,
                                                            'name_am', k.name_am, 'is_baseline', k.is_baseline)
                                         ORDER BY k.sort, k.key), '[]'::jsonb)
                 FROM public.listing_packages k
                WHERE k.kind = 'level' AND k.enabled),
    'ladder', '[]'::jsonb,
    'steps', '[]'::jsonb,
    'next', CASE WHEN v_n = p_size
                 THEN jsonb_build_object('s', 1, 't', v_end_t, 'p', v_end_p, 'i', v_end_i)
            END);
END $function$;
REVOKE ALL ON FUNCTION public.seller_feed_page(text, jsonb, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.seller_feed_page(text, jsonb, integer) TO anon, authenticated;
GRANT ALL ON FUNCTION public.seller_feed_page(text, jsonb, integer) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- Scratch rows only, rolled back by the sentinel; the only real rows read are the level rows (a derived sort, and
-- the dictionary's keys in order), read only.
--   (a) the header and grants;
--   (b) the body is its last declaration's but for this file's fragments (md5 with the fragments put back);
--   (c) the cards, by the scratch seller's name: an ad at a scratch level carries `level` as its index row holds
--       it — that level's overrides for its main category (badge) and for that category in its location's country
--       (placement), written by the refresh; an ad at a switched-off scratch level carries its key with NULL axes and
--       is still answered; the seller line, every other card key and the answer's keys are the old ones;
--   (d) the dictionary: every enabled level row in (sort, key) order with exactly its five fields; the scratch
--       enabled level as its row, the switched-off one absent.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.seller_feed_page(text, jsonb, integer)'::regprocedure;
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2c-m3ca4-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lon     text := 'e2e_mig_lon_' || v_stem;
  v_loff    text := 'e2e_mig_loff_' || v_stem;
  v_alias   text := 'e2e_mig_' || v_stem;
  v_code    char(2) := 'XZ';
  v_cur     char(3) := 'XTS';
  v_s       integer := (SELECT coalesce(max(sort), 0) + 100 FROM public.listing_packages WHERE kind = 'level');
  v_card    text[] := ARRAY['id', 'publicId', 'title', 'priceAmount', 'priceCurrency', 'priceMode', 'priceBp',
                            'priceNegotiable', 'pricePeriod', 'priceUnit', 'priceUnitText', 'photosSoon',
                            'coverPhotoId', 'soldWord', 'reserved', 'priceWas', 'tier', 'level', 'publishedAt',
                            'categoryId', 'locationId', 'locationNameEn', 'locationNameAm', 'step'];
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_a       uuid;
  v_b       uuid;
  v_answer  jsonb;
  v_mine    jsonb;
  v_keys    text[];
  v_n       integer;
  v_src     text;
  v_pair    text[];
  v_pairs   text[][];
  v_md5     text;
  v_msg     text;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_door)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_door)) a WHERE a.grantee = 0)
     OR NOT has_function_privilege('anon', v_door, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_door, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_door, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 4 proof (a): seller_feed_page''s header or grants differ';
  END IF;

  -- (b) Both sides without chr(13) (INC-1056, law 13): prosrc, and each literal.
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_door;
  v_pairs := ARRAY[
    ['    SELECT f.tier_rank, f.published_at, f.listing_id, f.placement, f.badge,
',
     '    SELECT f.tier_rank, f.published_at, f.listing_id,
'],
    ['      ''tier'', v_rec.tier,
      -- P-2 (c) M-3c-a (DEC-352): the level''s look — its key and the two axes the index row carries (written by
      -- feed_index_refresh from level_perks_for); NULL axes for a level unknown or switched off.
      ''level'', jsonb_build_object(''key'', v_rec.tier, ''placement'', v_rec.placement, ''badge'', v_rec.badge),
',
     '      ''tier'', v_rec.tier,
'],
    ['    ''cards'', v_cards,
    -- P-2 (c) M-3c-a (DEC-351 §8): the dictionary the cards'' level keys read — every enabled level row.
    ''levels'', (SELECT coalesce(jsonb_agg(jsonb_build_object(''key'', k.key, ''sort'', k.sort, ''name_en'', k.name_en,
                                                            ''name_am'', k.name_am, ''is_baseline'', k.is_baseline)
                                         ORDER BY k.sort, k.key), ''[]''::jsonb)
                 FROM public.listing_packages k
                WHERE k.kind = ''level'' AND k.enabled),
    ''ladder'', ''[]''::jsonb,
',
     '    ''cards'', v_cards,
    ''ladder'', ''[]''::jsonb,
']];
  FOREACH v_pair SLICE 1 IN ARRAY v_pairs LOOP
    v_n := (length(v_src) - length(replace(v_src, replace(v_pair[1], chr(13), ''), ''))) / length(replace(v_pair[1], chr(13), ''));
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 4 proof (b): a seller_feed_page fragment occurs % times', v_n;
    END IF;
    v_src := replace(v_src, replace(v_pair[1], chr(13), ''), replace(v_pair[2], chr(13), ''));
  END LOOP;
  v_md5 := md5(v_src);
  IF v_md5 IS DISTINCT FROM 'c39aaa046d09bd3d98d9f6f5c3fe21db' THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 4 proof (b): seller_feed_page differs from its last declaration beyond this file''s fragments (%)', v_md5;
  END IF;

  BEGIN
    -- A scratch market (the INC-949 proof's way).
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 4 proof: the scratch code % already exists', v_code;
    END IF;
    -- ISO 4217 keeps XTS for testing; no market ever prices in it (K4 exception, as 'XZ').
    INSERT INTO public.currencies (code, name_en, minor_units) VALUES (v_cur, 'e2e-mig-p2c-m3ca4', 2);
    INSERT INTO public.countries (code, name_en, is_active, currency_code) VALUES (v_code, 'e2e-mig-p2c-m3ca4', true, v_cur);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2c-m3ca4';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 (c) M-3c-a part 4 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en LIKE 'e2e-mig-p2c-m3ca4%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2c M3ca4 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2c M3ca4 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2c M3ca4 Main', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    -- Two levels above every real one (sorts derived, never a real value): lon enabled (standard, no badge),
    -- loff switched off (top, badge) — its perks are NULL.
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve,
                                         extends_lifetime, sort) VALUES
      (v_lon,  'level', 'E2E P2c level on',  30, 4, 'standard', false, true,  false, false, v_s + 1),
      (v_loff, 'level', 'E2E P2c level off', 30, 4, 'top',      true,  false, false, false, v_s + 2);
    -- lon's overrides: its main category everywhere (badge), and that category in XZ (placement).
    INSERT INTO public.level_overrides (level_key, category_id, country_code, placement, badge) VALUES
      (v_lon, v_cat, NULL,   NULL,    true),
      (v_lon, v_cat, v_code, 'boost', NULL);
    -- Ads: a at lon, b at loff, both live in the scratch category at the scratch city (staff marks: no end).
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier, tier_source)
    VALUES (v_seller, v_cat, v_city, 'E2E P2c M3ca4 a', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days',
            v_lon, 'staff')
    RETURNING id INTO v_a;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier, tier_source)
    VALUES (v_seller, v_cat, v_city, 'E2E P2c M3ca4 b', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days',
            v_loff, 'staff')
    RETURNING id INTO v_b;
    INSERT INTO public.listing_locations (listing_id, location_id, position) VALUES (v_a, v_city, 1), (v_b, v_city, 1);
    UPDATE public.profiles SET seller_alias = v_alias
     WHERE user_id = v_seller AND user_id IN (SELECT u.id FROM auth.users u WHERE u.email LIKE 'e2e-mig-%');
    PERFORM public.feed_index_refresh(v_a);
    PERFORM public.feed_index_refresh(v_b);

    -- (c)
    v_answer := public.seller_feed_page(v_alias, NULL, 20);
    SELECT coalesce(jsonb_object_agg(e->>'id', e), '{}'::jsonb) INTO v_mine FROM jsonb_array_elements(v_answer->'cards') e;
    IF jsonb_array_length(v_answer->'cards') <> 2
       OR v_mine->(v_a::text)->'level' IS DISTINCT FROM jsonb_build_object('key', v_lon, 'placement', 'boost', 'badge', true)
       OR v_mine->(v_a::text)->>'tier' IS DISTINCT FROM v_lon
       OR v_mine->(v_b::text)->'level' IS DISTINCT FROM jsonb_build_object('key', v_loff, 'placement', NULL, 'badge', NULL)
       OR v_mine->(v_b::text)->>'tier' IS DISTINCT FROM v_loff
       OR v_answer->'seller'->>'alias' IS DISTINCT FROM v_alias THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 4 proof (c): the seller page''s cards or seller differ (%)', v_answer;
    END IF;
    SELECT array_agg(k ORDER BY k) INTO v_keys FROM jsonb_object_keys(v_mine->(v_a::text)) k;
    IF v_keys IS DISTINCT FROM (SELECT array_agg(k ORDER BY k) FROM unnest(v_card) k) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 4 proof (c): the card''s keys differ (%)', v_keys;
    END IF;
    SELECT array_agg(k ORDER BY k) INTO v_keys FROM jsonb_object_keys(v_answer) k;
    IF v_keys IS DISTINCT FROM ARRAY['cards', 'ladder', 'levels', 'next', 'seller', 'steps'] THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 4 proof (c): the answer''s keys differ (%)', v_keys;
    END IF;
    -- (d)
    IF ARRAY(SELECT e->>'key' FROM jsonb_array_elements(v_answer->'levels') WITH ORDINALITY AS t(e, o) ORDER BY o)
         IS DISTINCT FROM ARRAY(SELECT k.key FROM public.listing_packages k WHERE k.kind = 'level' AND k.enabled ORDER BY k.sort, k.key)
       OR EXISTS (SELECT 1 FROM jsonb_array_elements(v_answer->'levels') e
                   WHERE ARRAY(SELECT k FROM jsonb_object_keys(e) k ORDER BY k)
                         IS DISTINCT FROM ARRAY['is_baseline', 'key', 'name_am', 'name_en', 'sort']) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 4 proof (d): the dictionary is not every enabled level row in order (%)', v_answer->'levels';
    END IF;
    SELECT coalesce(jsonb_agg(e ORDER BY o), '[]'::jsonb) INTO v_mine
      FROM jsonb_array_elements(v_answer->'levels') WITH ORDINALITY AS t(e, o)
     WHERE e->>'key' LIKE 'e2e_mig_%' || v_stem;
    IF v_mine IS DISTINCT FROM jsonb_build_array(jsonb_build_object('key', v_lon, 'sort', v_s + 1,
         'name_en', 'E2E P2c level on', 'name_am', NULL, 'is_baseline', false)) THEN
      RAISE EXCEPTION 'P-2 (c) M-3c-a part 4 proof (d): the dictionary''s scratch rows differ (%)', v_mine;
    END IF;

    RAISE EXCEPTION 'p2c-m3ca4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2c-m3ca4-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_seller AND email LIKE 'e2e-mig-%')
     OR EXISTS (SELECT 1 FROM public.listing_packages WHERE key IN (v_lon, v_loff)) THEN
    RAISE EXCEPTION 'P-2 (c) M-3c-a part 4 proof: the scratch rows outlived the sentinel';
  END IF;
END;
$proof$;

-- ------------------------------------------------------------ 3. CLOSERS
REVOKE ALL ON FUNCTION public.seller_feed_page(text, jsonb, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.seller_feed_page(text, jsonb, integer) TO anon, authenticated;
GRANT ALL ON FUNCTION public.seller_feed_page(text, jsonb, integer) TO service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261108090300') ON CONFLICT DO NOTHING;
