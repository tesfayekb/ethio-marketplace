-- e2e-areas: my-listings, posting
-- P-2 (a) M-1c, part 8 of 9 — the free-slot law at the table (ruling 12, DEC-342; CF-SLOT-1).
-- listings_free_slot_guard(), BEFORE INSERT OR UPDATE OF status, tier ON listings: fires only when the row
-- ENTERS the counted baseline set (status screening|held|active|reduced at baseline_level_key(), the OLD row
-- not there); the ad's primary place (location_id, else its first listing_locations row) names the market
-- (none → no check: the judge refuses unplaced ads); an advisory lock per seller and market; the seller's
-- OTHER counted baseline ads there (seller_regular_live's new 3-argument form, p_exclude) >= free_regular_ads
-- → noFreeSlot, DETAIL the market's number. Counted → counted (the reviewer's approve) never fires.
-- resume_listing drops its own count (whole from 20261104153959 :103, live md5 checked); publish_listing keeps
-- its envelope pre-check; the sweep (part 3) writes its pause in one UPDATE; admin_set_listing_tier's pause is
-- part 9 (rule 30: one file at 25 KB splits by concern). Law 11: every raising STABLE reader into a variable;
-- every write with its WHERE (CF-SQL-1); born closed; proofs on scratch rows, sentinel.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261105100700')
     OR to_regprocedure('public.designation_sweep_core(uuid[])') IS NULL THEN
    RAISE EXCEPTION 'P-2 M-1c part 8: parts 1 to 7 (4e04fad3 … 25cc301c) must be applied first';
  END IF;
  IF to_regprocedure('public.listings_free_slot_guard()') IS NOT NULL
     OR to_regprocedure('public.seller_regular_live(uuid,character,uuid)') IS NOT NULL
     OR EXISTS (SELECT 1 FROM pg_trigger WHERE tgrelid = 'public.listings'::regclass AND tgname = 'listings_free_slot_guard') THEN
    RAISE EXCEPTION 'P-2 M-1c part 8: the free-slot guard already exists';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.resume_listing(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '3994044c6bcc8f3db9a2ac8fb87080e6' THEN
    RAISE EXCEPTION 'P-2 M-1c part 8: the live resume_listing is not 20261104153959''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE COUNT WITHOUT ONE AD
CREATE FUNCTION public.seller_regular_live(p_seller uuid, p_country_code character, p_exclude uuid)
RETURNS integer
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $fn$
  SELECT count(*)::integer
    FROM public.listings l
    JOIN public.locations loc ON loc.id = l.location_id
   WHERE l.seller_id = p_seller
     AND loc.country_code = p_country_code
     AND l.status IN ('screening', 'held', 'active', 'reduced')
     AND l.tier = public.baseline_level_key()
     AND (p_exclude IS NULL OR l.id <> p_exclude);
$fn$;
COMMENT ON FUNCTION public.seller_regular_live(uuid, character, uuid) IS
  'seller_regular_live(uuid, character) leaving one ad out — the guard''s count of the seller''s OTHER counted baseline ads in the market (P-2 M-1c part 8, DEC-342).';
REVOKE ALL ON FUNCTION public.seller_regular_live(uuid, character, uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.seller_regular_live(uuid, character, uuid) TO service_role;

-- ------------------------------------------------------------ 2. THE GUARD (CF-SLOT-1)
CREATE FUNCTION public.listings_free_slot_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_base    text;
  v_country char(2);
  v_market  public.market_settings%ROWTYPE;
  v_others  integer;
BEGIN
  v_base := public.baseline_level_key();  -- law 11 (DEC-341)
  IF NEW.status NOT IN ('screening', 'held', 'active', 'reduced') OR NEW.tier IS DISTINCT FROM v_base THEN
    RETURN NEW;
  END IF;
  IF TG_OP = 'UPDATE' AND OLD.status IN ('screening', 'held', 'active', 'reduced') AND OLD.tier = v_base THEN
    RETURN NEW;  -- counted → counted (the reviewer's approve): no lock-out.
  END IF;
  SELECT loc.country_code INTO v_country FROM public.locations loc
   WHERE loc.id = coalesce(NEW.location_id,
                           (SELECT ll.location_id FROM public.listing_locations ll
                             WHERE ll.listing_id = NEW.id ORDER BY ll.position, ll.location_id LIMIT 1));
  IF v_country IS NULL THEN
    RETURN NEW;  -- unplaced: the judge refuses it already.
  END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended(NEW.seller_id::text || ':' || v_country, 0));
  v_market := public.market_settings_for(v_country);
  v_others := public.seller_regular_live(NEW.seller_id, v_country, NEW.id);
  IF v_others >= v_market.free_regular_ads THEN
    RAISE EXCEPTION 'noFreeSlot' USING DETAIL = v_market.free_regular_ads::text;
  END IF;
  RETURN NEW;
END $fn$;
COMMENT ON FUNCTION public.listings_free_slot_guard() IS
  'CF-SLOT-1 (P-2 M-1c part 8, DEC-342): the free-slot law at the table — a row entering the counted baseline set (screening, held, active, reduced at the baseline level) needs a free slot in its market (market_settings.free_regular_ads); noFreeSlot otherwise, DETAIL the number; counted → counted never fires.';
REVOKE ALL ON FUNCTION public.listings_free_slot_guard() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.listings_free_slot_guard() TO service_role;
CREATE TRIGGER listings_free_slot_guard
  BEFORE INSERT OR UPDATE OF status, tier ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.listings_free_slot_guard();

-- ------------------------------------------------------------ 3. resume_listing (whole from 20261104153959 :103)
-- Its own count and listingNotPlaced are gone: the guard answers noFreeSlot (same key, same DETAIL) inside
-- transition_listing's UPDATE and rolls the whole call back.
CREATE OR REPLACE FUNCTION public.resume_listing(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'notSignedIn'; END IF;
  PERFORM public.assert_caller_active();
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'listingNotFound'; END IF;
  IF v_row.status <> 'paused' THEN RAISE EXCEPTION 'notPaused'; END IF;
  -- DEC-342: the free slot is the table's law (listings_free_slot_guard raises noFreeSlot with the market's number).
  PERFORM public.transition_listing(p_listing_id, v_row.resume_status);
  RETURN jsonb_build_object('ok', true, 'status', (SELECT l.status FROM public.listings l WHERE l.id = p_listing_id));
END $function$;
COMMENT ON FUNCTION public.resume_listing(uuid) IS
  'The owner resumes a paused ad to the status it was paused from, with the time it had left (P-2 M-1b, DEC-328); an ad at the baseline level needs a free slot — listings_free_slot_guard answers noFreeSlot (DEC-342).';
REVOKE ALL ON FUNCTION public.resume_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.resume_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.resume_listing(uuid) TO service_role;

-- ------------------------------------------------------------ 4. PROOFS
-- (a) headers, grants, the trigger's catalog facts, resume_listing's new md5. (b) scratch market XZ with ONE
-- free slot and one live baseline ad: the resume of a paused baseline ad, a direct service UPDATE of it into
-- screening (edit_my_listing's write shape) and an INSERT of a counted baseline row are each refused noFreeSlot
-- DETAIL 1 and leave nothing; a level above the baseline enters freely (l3). (c) the reviewer's approve
-- (screening → active at the baseline) passes. (d) the sweep's level end with no slot → paused in one UPDATE
-- under the guard. A second session cannot be simulated here (the e2e race test, DEC-342).
DO $proof$
DECLARE
  v_fn      regprocedure := 'public.listings_free_slot_guard()'::regprocedure;
  v_cnt     regprocedure := 'public.seller_regular_live(uuid,character,uuid)'::regprocedure;
  v_res     regprocedure := 'public.resume_listing(uuid)'::regprocedure;
  v_rel     regclass := 'public.listings'::regclass;
  v_seller  uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2-m1c8-' || substr(gen_random_uuid()::text, 1, 8);
  v_stem    text := substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_lv      text := 'e2e_mig_lv_' || v_stem;
  v_r0      text := 'e2e_mig_r0_' || v_stem;
  v_code    char(2) := 'XZ';
  v_lang    text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_a       uuid := gen_random_uuid();
  v_p       uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_x       uuid := gen_random_uuid();
  v_l3      uuid := gen_random_uuid();
  v_ids     uuid[];
  v_row     public.listings%ROWTYPE;
  v_n       record;
  v_base    text;
  v_case    text;
  v_msg     text;
  v_detail  text;
  v_snap    text;
  v_snap2   text;
BEGIN
  v_base := public.baseline_level_key();
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
     OR (SELECT provolatile <> 's' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_cnt)
     OR (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_res)
     OR EXISTS (SELECT 1 FROM pg_proc p, aclexplode(p.proacl) a WHERE p.oid IN (v_fn, v_cnt, v_res) AND a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE') OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR has_function_privilege('anon', v_cnt, 'EXECUTE') OR has_function_privilege('authenticated', v_cnt, 'EXECUTE')
     OR has_function_privilege('anon', v_res, 'EXECUTE') OR NOT has_function_privilege('authenticated', v_res, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') OR NOT has_function_privilege('service_role', v_cnt, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_res, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 M-1c part 8 proof (a): a header or a grant differs';
  END IF;
  -- BEFORE (2) | INSERT (4) | UPDATE (16) | ROW (1) = 23, OF status, tier.
  IF (SELECT count(*) FROM pg_trigger t WHERE t.tgrelid = v_rel AND t.tgname = 'listings_free_slot_guard' AND t.tgfoid = v_fn
        AND t.tgtype = 23 AND NOT t.tgisinternal AND t.tgenabled = 'O'
        AND (SELECT array_agg(a.attname::text ORDER BY a.attname) FROM pg_attribute a WHERE a.attrelid = v_rel AND a.attnum = ANY (t.tgattr::int2[]))
            = ARRAY['status', 'tier']) <> 1 THEN
    RAISE EXCEPTION 'P-2 M-1c part 8 proof (a): the trigger is not BEFORE INSERT OR UPDATE OF status, tier FOR EACH ROW';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_res) IS DISTINCT FROM '858701a05407750f0d68bfcbd584e43d' THEN
    RAISE EXCEPTION 'P-2 M-1c part 8 proof (a): resume_listing''s body differs from this file';
  END IF;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1c part 8 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1c8', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1c8';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 M-1c part 8 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p2-m1c8';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2 M1c8 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2 M1c8 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT v_seller, v.id, v_lang, v_tag FROM public.legal_versions v WHERE v.status = 'published' AND v.effective_at <= now();
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1c8 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort) VALUES
      (v_lv, 'level', 'E2E P2 level', 10, 6, 'boost', false, true, true, false, 9000),
      (v_r0, 'reach', 'E2E P2 reach 0', 30, NULL, NULL, false, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels) VALUES (v_code, 1, v_r0, false);
    PERFORM set_config('request.jwt.claims', '{}', true);
    -- a: the one live baseline ad (enters: no other); p: a paused baseline ad; l3: live at the level, which ended.
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at, tier, tier_until, tier_source,
                                 clock_kept, kept_remaining, resume_status)
    SELECT x.id, v_seller, v_cat, v_city, 'E2E P2 M1c8 ' || x.nm, 'scratch', v_code, x.st, now(), now(), x.exp,
           coalesce(x.lv, v_base), x.lu, x.ls, x.kept, x.rem, x.rs
      FROM (VALUES
        (v_a,  'a',  'active', now() + interval '10 days', NULL, NULL,                      NULL,     false, NULL,                NULL),
        (v_p,  'p',  'paused', NULL,                       NULL, NULL,                      NULL,     true,  interval '5 days',  'active'),
        (v_l3, 'l3', 'active', now() + interval '10 days', v_lv, now() - interval '1 hour', 'launch', false, NULL,                NULL))
        AS x(id, nm, st, exp, lv, lu, ls, kept, rem, rs);
    v_ids := ARRAY[v_a, v_p, v_s, v_x, v_l3];

    -- (b) three refusals, nothing written.
    FOR v_case IN VALUES ('resume'), ('update'), ('insert') LOOP
      SELECT concat_ws('|',
               (SELECT count(*) FROM public.listing_revisions WHERE listing_id = ANY (v_ids)),
               (SELECT count(*) FROM public.audit_log WHERE entity_id IN (SELECT i::text FROM unnest(v_ids) i)),
               (SELECT count(*) FROM public.seller_notices WHERE listing_id = ANY (v_ids)),
               (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_seller::text),
               (SELECT string_agg(id::text || ':' || status || ':' || tier || ':' || coalesce(resume_status, '-'), ',' ORDER BY id)
                  FROM public.listings WHERE id = ANY (v_ids)))
        INTO v_snap;
      v_msg := NULL; v_detail := NULL;
      BEGIN
        CASE v_case
          WHEN 'resume' THEN
            PERFORM set_config('request.jwt.claims', json_build_object('sub', v_seller::text, 'role', 'authenticated')::text, true);
            PERFORM public.resume_listing(v_p);
          WHEN 'update' THEN
            UPDATE public.listings SET status = 'screening' WHERE id = v_p;
          WHEN 'insert' THEN
            INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                         published_at, published_first_at, expires_at)
            VALUES (v_x, v_seller, v_cat, v_city, 'E2E P2 M1c8 x', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days');
        END CASE;
      EXCEPTION WHEN raise_exception THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_detail = PG_EXCEPTION_DETAIL;
      END;
      PERFORM set_config('request.jwt.claims', '{}', true);
      IF v_msg IS DISTINCT FROM 'noFreeSlot' OR v_detail IS DISTINCT FROM '1' THEN
        RAISE EXCEPTION 'P-2 M-1c part 8 proof (b): % answered % (detail %)', v_case, coalesce(v_msg, 'success'), v_detail;
      END IF;
      SELECT concat_ws('|',
               (SELECT count(*) FROM public.listing_revisions WHERE listing_id = ANY (v_ids)),
               (SELECT count(*) FROM public.audit_log WHERE entity_id IN (SELECT i::text FROM unnest(v_ids) i)),
               (SELECT count(*) FROM public.seller_notices WHERE listing_id = ANY (v_ids)),
               (SELECT coalesce(sum(count), 0) FROM public.rate_limits WHERE key = v_seller::text),
               (SELECT string_agg(id::text || ':' || status || ':' || tier || ':' || coalesce(resume_status, '-'), ',' ORDER BY id)
                  FROM public.listings WHERE id = ANY (v_ids)))
        INTO v_snap2;
      IF v_snap2 IS DISTINCT FROM v_snap THEN
        RAISE EXCEPTION 'P-2 M-1c part 8 proof (b): the refusal % left a trace (% -> %)', v_case, v_snap, v_snap2;
      END IF;
    END LOOP;

    -- (c) the approve passes: s enters screening while a second slot is open, the slot closes, s goes live.
    UPDATE public.market_settings SET free_regular_ads = 2 WHERE country_code = v_code;
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status)
    VALUES (v_s, v_seller, v_cat, v_city, 'E2E P2 M1c8 s', 'scratch', v_code, 'screening');
    UPDATE public.market_settings SET free_regular_ads = 1 WHERE country_code = v_code;
    PERFORM public.transition_listing(v_s, 'active');
    IF (SELECT status FROM public.listings WHERE id = v_s) <> 'active'
       OR public.seller_regular_live(v_seller, v_code) <> 2 OR public.seller_regular_live(v_seller, v_code, v_s) <> 1 THEN
      RAISE EXCEPTION 'P-2 M-1c part 8 proof (c): counted → counted did not pass, or the counts differ';
    END IF;

    -- (d) the sweep's level end with no slot (a and s hold it), under the guard: l3 pauses in one UPDATE.
    SELECT * INTO v_n FROM public.designation_sweep_core(ARRAY[v_l3]);
    SELECT * INTO v_row FROM public.listings WHERE id = v_l3;
    IF v_n.n_level_ended <> 1 OR v_n.n_level_paused <> 1 OR v_row.status <> 'paused' OR v_row.tier <> v_base OR v_row.resume_status <> 'active' THEN
      RAISE EXCEPTION 'P-2 M-1c part 8 proof (d): the sweep did not pause l3 under the guard (% % %)', v_n, v_row.status, v_row.tier;
    END IF;
    RAISE EXCEPTION 'p2-m1c8-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c8-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261105100800') ON CONFLICT DO NOTHING;
