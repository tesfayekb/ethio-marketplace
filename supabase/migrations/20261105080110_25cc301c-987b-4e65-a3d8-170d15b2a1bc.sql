-- e2e-areas: admin-listings
-- P-2 (a) M-1c, part 7 of 7 — the admin's readers see a paused ad and the ad's clocks (plan §3; ruling 9
-- H4; ruling 10). Two STABLE readers redeclared WHOLE (live md5s checked first, G39):
--   admin_list_listings (20261014194317 :558) — the 'all' view gains 'paused' beside 'closed'; 'ended' does
--     not (a paused ad is not over: its clock is kept, D306). The 'live', 'waiting' and 'removed' views are
--     as before; a draft stays out of every view by design (the `l.status <> 'draft'` line — CF-STATUS-1
--     names that one exception). The p_tier literal set is (c)'s fold (reported, K2), untouched here.
--   admin_listing_detail (20261011124548 :22) — the listing carries tier_until, tier_source, reach,
--     reach_until and reach_source beside tier (DEC-328 / DEC-330), and the history shows those five columns'
--     values (v_keep) where before it only named them.
-- Headers and closers restated; every other byte as before. Proofs on scratch rows (a scratch admin, a
-- paused scratch ad), rolled back by the sentinel.
-- Ruling 11 (INC-1059): the scratch level row carries its perks (perks_by_kind_check); proof text only, mark unchanged.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'c1686f40b08b0cd061289f9ff3ac0b6f' THEN
    RAISE EXCEPTION 'P-2 M-1c part 7: the live admin_list_listings is not 20261014194317''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_listing_detail(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '9bd5294881b1d2452a382f89fc69ea5e' THEN
    RAISE EXCEPTION 'P-2 M-1c part 7: the live admin_listing_detail is not 20261011124548''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. admin_list_listings (whole from 20261014194317 :558)
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
    WHEN 'ended'   THEN ARRAY['expired','sold','closed']
    WHEN 'removed' THEN ARRAY['rejected','removed']
    WHEN 'all'     THEN ARRAY['screening','active','reduced','rejected','held','expired','sold','removed','closed','paused']
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

-- ------------------------------------------------------------ 2. admin_listing_detail (whole from 20261011124548 :22)
CREATE OR REPLACE FUNCTION public.admin_listing_detail(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_row     public.listings%ROWTYPE;
  v_email   boolean;
  v_names   boolean;
  v_pref    jsonb;
  v_listing jsonb;
  v_seller  jsonb;
  v_history jsonb;
  v_total   integer;
  -- The values the history shows; every other changed column is named only.
  v_keep    text[] := ARRAY['title','description','category_id','attributes','price_mode','price_amount',
                            'price_currency','price_period','price_bp','price_negotiable','price_unit',
                            'price_unit_text','status','tier','tier_until','tier_source','reach','reach_until',
                            'reach_source','location_id','expires_at','poster_expires_at',
                            'renewed_count','photos_soon','published_at','published_first_at'];
  v_noise   text[] := ARRAY['search_tsv','updated_at','draft_updated_at','draft_step'];
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  SELECT * INTO v_row FROM public.listings l WHERE l.id = p_listing_id;
  IF NOT FOUND OR v_row.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_email := public.has_permission(v_uid, 'profiles', 'view');
  v_names := public.has_permission(v_uid, 'audit_logs', 'view');
  v_pref := coalesce(v_row.contact_pref, '{}'::jsonb);

  SELECT jsonb_build_object(
           'id', v_row.id, 'title', v_row.title, 'description', v_row.description,
           'status', v_row.status, 'tier', v_row.tier,
           -- P-2 (a) — the level and reach as they stand (DEC-328 / DEC-330; a null until is no end).
           'tier_until', v_row.tier_until, 'tier_source', v_row.tier_source,
           'reach', v_row.reach, 'reach_until', v_row.reach_until, 'reach_source', v_row.reach_source,
           'severe', coalesce(v_row.screening->>'severe', 'false') = 'true',
           'category_id', v_row.category_id, 'category_name_en', c.name_en, 'category_name_am', c.name_am,
           'location_id', v_row.location_id, 'place_name_en', loc.name_en, 'place_name_am', loc.name_am,
           'country_code', coalesce(loc.country_code, v_row.home_country_code),
           'price_mode', v_row.price_mode, 'price_amount', v_row.price_amount,
           'price_currency', v_row.price_currency, 'price_period', v_row.price_period,
           'price_bp', v_row.price_bp, 'price_negotiable', v_row.price_negotiable,
           'price_unit', v_row.price_unit, 'price_unit_text', v_row.price_unit_text,
           'attributes', v_row.attributes, 'photos_soon', v_row.photos_soon,
           'photo_count', (SELECT count(*)::integer FROM public.listing_photos ph WHERE ph.listing_id = v_row.id),
           'created_at', v_row.created_at, 'published_first_at', v_row.published_first_at,
           'published_at', v_row.published_at, 'expires_at', v_row.expires_at,
           'poster_expires_at', v_row.poster_expires_at, 'renewed_count', v_row.renewed_count,
           'updated_at', v_row.updated_at)
    INTO v_listing
    FROM (SELECT 1) one
    LEFT JOIN public.categories c ON c.id = v_row.category_id
    LEFT JOIN public.locations loc ON loc.id = v_row.location_id;

  SELECT jsonb_build_object(
           'id', v_row.seller_id,
           'alias', p.seller_alias,
           'business_name', CASE WHEN p.seller_type = 'business' THEN p.business_name END,
           'email', CASE WHEN v_email THEN u.email::text END,
           'member_since', p.created_at,
           'account_status', p.account_status)
    INTO v_seller
    FROM (SELECT 1) one
    LEFT JOIN public.profiles p ON p.user_id = v_row.seller_id
    LEFT JOIN auth.users u ON u.id = v_row.seller_id;

  SELECT count(*)::integer INTO v_total FROM public.listing_revisions r WHERE r.listing_id = v_row.id;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'at', h.created_at,
           'kind', h.kind,
           'by', CASE WHEN h.actor IS NULL THEN 'system' WHEN h.actor = h.seller_id THEN 'seller' ELSE 'staff' END,
           'by_name', CASE WHEN v_names AND h.actor IS NOT NULL AND h.actor <> h.seller_id THEN p.display_name END,
           'fields', (SELECT coalesce(jsonb_agg(k.key ORDER BY k.key), '[]'::jsonb)
                        FROM (SELECT jsonb_object_keys(h.b) AS key
                              UNION
                              SELECT jsonb_object_keys(h.a)) k
                       WHERE k.key <> ALL (v_noise)),
           'before', (SELECT coalesce(jsonb_object_agg(e.key, e.value), '{}'::jsonb)
                        FROM jsonb_each(h.b) e WHERE e.key = ANY (v_keep))
                     || CASE WHEN jsonb_typeof(h.b->'photos_removed') = 'array'
                             THEN jsonb_build_object('photos_removed', jsonb_array_length(h.b->'photos_removed'))
                             ELSE '{}'::jsonb END,
           'after',  (SELECT coalesce(jsonb_object_agg(e.key, e.value), '{}'::jsonb)
                        FROM jsonb_each(h.a) e WHERE e.key = ANY (v_keep))
                     || CASE WHEN jsonb_typeof(h.a->'photos_removed') = 'array'
                             THEN jsonb_build_object('photos_removed', jsonb_array_length(h.a->'photos_removed'))
                             ELSE '{}'::jsonb END,
           'reason', n.reason,
           'note', n.note)
         ORDER BY h.created_at DESC, h.id DESC), '[]'::jsonb)
    INTO v_history
    FROM (SELECT r.id, r.kind, r.actor, r.seller_id, r.created_at, r.listing_id,
                 CASE WHEN jsonb_typeof(r.before) = 'object' THEN r.before ELSE '{}'::jsonb END AS b,
                 CASE WHEN jsonb_typeof(r.after) = 'object' THEN r.after ELSE '{}'::jsonb END AS a
            FROM public.listing_revisions r
           WHERE r.listing_id = v_row.id
           ORDER BY r.created_at DESC, r.id DESC
           LIMIT 200) h
    LEFT JOIN public.profiles p ON p.user_id = h.actor
    LEFT JOIN LATERAL (
      SELECT sn.reason, sn.note
        FROM public.seller_notices sn
       WHERE sn.listing_id = h.listing_id AND sn.created_at = h.created_at
       ORDER BY sn.id
       LIMIT 1) n ON true;

  RETURN jsonb_build_object(
    'listing', v_listing,
    'seller', v_seller,
    'channels', jsonb_build_object(
      'phone',    coalesce((v_pref->'phone'->>'show')::boolean, false),
      'phone2',   coalesce((v_pref->'phone2'->>'show')::boolean, false),
      'telegram', coalesce((v_pref->'telegram'->>'show')::boolean, false),
      'whatsapp', coalesce((v_pref->'whatsapp'->>'show')::boolean, false)),
    'history', v_history,
    'history_total', v_total);
END $$;
REVOKE ALL ON FUNCTION public.admin_listing_detail(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_listing_detail(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_listing_detail(uuid) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) the two bodies are the texts above (md5, CR-stripped both sides — law 13); headers and grants as
-- before (catalog facts). (b) scratch rows: a scratch admin (super_admin, global), a seller, a live ad on a
-- level and an ad paused by the state machine as the service; as the admin, 'all' lists the paused ad,
-- 'ended' and 'live' do not; the detail carries status paused, the five clock columns and, in the history,
-- the sweep-shaped revision's tier_until value; a plain signed-in person is refused by both. Rolled back by
-- the sentinel.
DO $proof$
DECLARE
  v_lst    regprocedure := 'public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer)'::regprocedure;
  v_det    regprocedure := 'public.admin_listing_detail(uuid)'::regprocedure;
  v_fn     regprocedure;
  v_want   text;
  v_admin  uuid := gen_random_uuid();
  v_seller uuid := gen_random_uuid();
  v_tag    text := 'e2e-mig-p2-m1c7-' || substr(gen_random_uuid()::text, 1, 8);
  v_code   char(2) := 'XZ';
  v_anc    uuid;
  v_stem   text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lv     text := 'e2e_mig_lv_' || v_stem;
  v_until  timestamptz := now() + interval '5 days';
  v_cat    uuid;
  v_live   uuid;
  v_paused uuid;
  v_n      integer;
  v_ans    jsonb;
  v_msg    text;
BEGIN
  -- (a)
  FOR v_fn, v_want IN SELECT * FROM (VALUES (v_lst, '901086604a4975acd5073b63a5dccea6'), (v_det, '3bf9681c1ea9b072c5974d28812bc1dc')) t(f, m) LOOP
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_want
       OR (SELECT NOT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-2 M-1c part 7 proof (a): the body, header or grants of % differ', v_fn;
    END IF;
  END LOOP;

  BEGIN
    -- The scratch market: a published ad needs a place (listings_place_unless_draft); the anchor serves.
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1c part 7 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1c7', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1c7';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 M-1c part 7 proof: the scratch market has no anchor'; END IF;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_admin,  v_tag || '-admin@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_admin, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1c7 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_lv, 'level', 'E2E P2 level', 10, 6, 'boost', false, true, true, false, 9000);
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at, tier, tier_until, tier_source)
    VALUES (v_seller, v_cat, v_anc, 'E2E P2 M1c7 live', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days',
            v_lv, v_until, 'staff')
    RETURNING id INTO v_live;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_anc, 'E2E P2 M1c7 paused', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_paused;
    PERFORM set_config('request.jwt.claims', '{}', true);
    PERFORM public.transition_listing(v_paused, 'paused');
    -- A sweep-shaped revision on the live ad: the history must show tier_until's value, not only its name.
    INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (v_live, v_seller, 'edit', jsonb_build_object('tier_until', v_until), jsonb_build_object('tier_until', NULL), NULL);

    -- (b) the admin.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_admin::text, 'role', 'authenticated')::text, true);
    SELECT count(*) INTO v_n FROM public.admin_list_listings('all', v_paused::text) r WHERE r.id = v_paused AND r.status = 'paused';
    IF v_n <> 1 THEN RAISE EXCEPTION 'P-2 M-1c part 7 proof (b): the all view does not list the paused ad (%)', v_n; END IF;
    SELECT count(*) INTO v_n FROM public.admin_list_listings('ended', v_paused::text) r WHERE r.id = v_paused;
    IF v_n <> 0 THEN RAISE EXCEPTION 'P-2 M-1c part 7 proof (b): the ended view lists the paused ad'; END IF;
    SELECT count(*) INTO v_n FROM public.admin_list_listings('live', v_paused::text) r WHERE r.id = v_paused;
    IF v_n <> 0 THEN RAISE EXCEPTION 'P-2 M-1c part 7 proof (b): the live view lists the paused ad'; END IF;
    v_ans := public.admin_listing_detail(v_paused);
    IF v_ans->'listing'->>'status' <> 'paused'
       OR NOT (v_ans->'listing' ? 'tier_until' AND v_ans->'listing' ? 'tier_source' AND v_ans->'listing' ? 'reach'
               AND v_ans->'listing' ? 'reach_until' AND v_ans->'listing' ? 'reach_source')
       OR v_ans->'listing'->>'tier_until' IS NOT NULL OR v_ans->'listing'->>'reach' IS NOT NULL THEN
      RAISE EXCEPTION 'P-2 M-1c part 7 proof (b): the detail lacks the clock columns (%)', v_ans->'listing';
    END IF;
    v_ans := public.admin_listing_detail(v_live);
    IF v_ans->'listing'->>'tier' <> v_lv OR v_ans->'listing'->>'tier_source' <> 'staff'
       OR (v_ans->'listing'->>'tier_until')::timestamptz <> v_until
       OR NOT EXISTS (SELECT 1 FROM jsonb_array_elements(v_ans->'history') h
                       WHERE h->>'by' = 'system' AND (h->'before'->>'tier_until')::timestamptz = v_until
                         AND h->'after' ? 'tier_until' AND h->'fields' ? 'tier_until') THEN
      RAISE EXCEPTION 'P-2 M-1c part 7 proof (b): the live ad''s detail or history lacks the level''s end (%)', v_ans->'history';
    END IF;
    -- A plain signed-in person is refused by both.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
    v_msg := NULL;
    BEGIN
      SELECT count(*) INTO v_n FROM public.admin_list_listings('all', v_paused::text);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'permission denied' THEN
      RAISE EXCEPTION 'P-2 M-1c part 7 proof (b): the list answered a seller % instead of a refusal', coalesce(v_msg, 'rows');
    END IF;
    v_msg := NULL;
    BEGIN
      v_ans := public.admin_listing_detail(v_paused);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'permission denied' THEN
      RAISE EXCEPTION 'P-2 M-1c part 7 proof (b): the detail answered a seller % instead of a refusal', coalesce(v_msg, 'the ad');
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1c7-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c7-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261105100700') ON CONFLICT DO NOTHING;
