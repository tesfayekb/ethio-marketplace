-- e2e-areas: ad-page, my-listings, legal

-- Foundations 1, turn F1-5b, part 4 — THE CONTACT REVEAL ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-5b.md, census docs/governance/reports/f1-doors-5b.census.md D1–D6).
-- reveal_listing_contact is redeclared WHOLE from its last declaration (live md5 checked): ONE
-- door_context('owner', NULL, NULL, 'contact_reveal') gate, its refusals by door_refuse codes, the shell.
-- Ruling 1 §7: `contact_reveal` is spent at the gate, before the row is read; the distinct-sellers ceiling
-- (contact_reveal_sellers, read, not spent) and the new account's five keep their order in the work, and stay
-- RETURNED answers: the ceiling's flag must be kept, and a refusal would roll it back. The listing read is held
-- (FOR KEY SHARE, INC-786). listing_reveal_count(uuid) loses the browser grant no code uses (census F3).
-- Folds: 'not authenticated' → notSignedIn; 'account is deactivated' → accountDeactivated; the returned
-- acceptanceRequired → door_refuse('acceptanceRequired'); the gate's returned rateLimited → the gate's
-- rateLimited (INC-1170).

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261117060200') THEN
    RAISE EXCEPTION 'F1-5b part 4: part 3 (mark 20261117060200) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.reveal_listing_contact(text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '46698ebc0e8620e075cbb360746d8675' THEN
    RAISE EXCEPTION 'F1-5b part 4: the live reveal_listing_contact is not its last declaration''s body (%)', v_md5;
  END IF;
  IF to_regprocedure('public.listing_reveal_count(uuid)') IS NULL THEN
    RAISE EXCEPTION 'F1-5b part 4: listing_reveal_count(uuid) is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. reveal_listing_contact (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.reveal_listing_contact(p_public_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid       uuid := auth.uid();
  v_row       public.listings%ROWTYPE;
  v_channels  jsonb;
  v_cap       integer;
  v_sellers   integer;
  v_today     integer;
  v_fresh     boolean;
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'contact_reveal');
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    PERFORM public.door_refuse('listingNotAvailable');
  END IF;
  -- INC-786: held against a DELETE until the day's reveal row is written; an ad gone first is not there.
  SELECT * INTO v_row FROM public.listings WHERE public_id = p_public_id FOR KEY SHARE;
  IF NOT FOUND THEN PERFORM public.door_refuse('listingNotAvailable'); END IF;
  -- D201 rule 11 — a sold ad has no contact; a draft, a removed or an expired ad none either. The owner always sees his own.
  IF v_row.seller_id <> v_uid AND v_row.status <> 'active' THEN
    PERFORM public.door_refuse('listingNotAvailable');
  END IF;
  -- Bundle 22 turn 6 (the operator 2026-10-19: no use of an account without accepting) — a viewer who owes a Terms
  -- or Privacy acceptance reveals nothing until he has accepted; the owner always sees his own.
  IF v_row.seller_id <> v_uid AND public.legal_acceptance_pending(v_uid, v_row.id) THEN
    PERFORM public.door_refuse('acceptanceRequired');
  END IF;

  IF v_row.seller_id <> v_uid
     AND NOT EXISTS (SELECT 1 FROM public.contact_reveals r
                      WHERE r.listing_id = v_row.id
                        AND r.viewer_id = v_uid
                        AND r.day = current_date) THEN
    -- D201 §6 (a) — DISTINCT SELLERS: ten different sellers in 24 hours is the ceiling (the dial, or the viewer's own
    -- override); this ad's seller does not count against it, so a viewer may always return to a seller he has reached.
    SELECT coalesce(o.max_count, d.max_count) INTO v_cap
      FROM public.rate_dials d
      LEFT JOIN public.rate_overrides o ON o.user_id = v_uid AND o.action = d.action
     WHERE d.action = 'contact_reveal_sellers';
    IF v_cap IS NULL THEN RAISE EXCEPTION 'unknown rate dial: contact_reveal_sellers'; END IF;
    SELECT count(DISTINCT l.seller_id) INTO v_sellers
      FROM public.contact_reveals r
      JOIN public.listings l ON l.id = r.listing_id
     WHERE r.viewer_id = v_uid
       AND r.created_at > now() - interval '24 hours'
       AND l.seller_id <> v_row.seller_id;
    IF v_sellers >= v_cap THEN
      -- INC-694 — the flag names a person: it carries his home country (Knowledge E3), from user_directory.
      INSERT INTO public.reveal_flags (viewer_id, day, sellers, home_country_code)
      VALUES (v_uid, current_date, v_sellers, (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid))
      ON CONFLICT (viewer_id, day) DO UPDATE
        SET sellers = greatest(public.reveal_flags.sellers, EXCLUDED.sellers),
            hits = public.reveal_flags.hits + 1,
            last_at = now();
      RETURN jsonb_build_object('ok', false, 'reason', 'sellersCapReached',
                                'resets_at', (date_trunc('day', now() AT TIME ZONE 'utc') + interval '1 day') AT TIME ZONE 'utc');
    END IF;

    -- D201 §6 (b) — A NEW ACCOUNT: younger than 24 hours, with no listing and no reveal before today, is held to five
    -- reveals on its first day. Not a second dial: a ceiling computed here, under the 30-a-day gate at the door.
    SELECT (pr.created_at > now() - interval '24 hours')
           AND NOT EXISTS (SELECT 1 FROM public.listings l WHERE l.seller_id = v_uid)
           AND NOT EXISTS (SELECT 1 FROM public.contact_reveals r WHERE r.viewer_id = v_uid AND r.day < current_date)
      INTO v_fresh
      FROM public.profiles pr WHERE pr.user_id = v_uid;
    IF coalesce(v_fresh, false) THEN
      SELECT count(*) INTO v_today FROM public.contact_reveals r
       WHERE r.viewer_id = v_uid AND r.day = current_date;
      IF v_today >= 5 THEN
        RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited',
                                  'resets_at', (date_trunc('day', now() AT TIME ZONE 'utc') + interval '1 day') AT TIME ZONE 'utc');
      END IF;
    END IF;

    -- INC-694 — the day row names the viewer: it carries his home country (Knowledge E3), from user_directory.
    INSERT INTO public.contact_reveals (listing_id, viewer_id, day, home_country_code)
    VALUES (v_row.id, v_uid, current_date, (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid))
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT coalesce(jsonb_object_agg(e.key, e.value), '{}'::jsonb)
    INTO v_channels
    FROM jsonb_each(coalesce(v_row.contact_pref, '{}'::jsonb)) e
   WHERE e.key <> 'messages'
     AND coalesce((e.value->>'show')::boolean, false);

  RETURN jsonb_build_object('ok', true, 'channels', v_channels);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('reveal_listing_contact', 'contact_reveal', SQLERRM);
END $function$;

REVOKE ALL ON FUNCTION public.reveal_listing_contact(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.reveal_listing_contact(text) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. listing_reveal_count: the browser grant goes
REVOKE ALL ON FUNCTION public.listing_reveal_count(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.listing_reveal_count(uuid) TO service_role;

-- Proof: catalog facts, then the calls on scratch rows under a sentinel rollback.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_e       uuid := gen_random_uuid();
  v_ca      text := json_build_object('sub', v_a::text, 'role', 'authenticated')::text;
  v_cb      text := json_build_object('sub', v_b::text, 'role', 'authenticated')::text;
  v_cc      text := json_build_object('sub', v_c::text, 'role', 'authenticated')::text;
  v_cd      text := json_build_object('sub', v_d::text, 'role', 'authenticated')::text;
  v_ce      text := json_build_object('sub', v_e::text, 'role', 'authenticated')::text;
  v_r0      text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_doc     uuid;
  v_al      uuid := gen_random_uuid();
  v_sl      uuid := gen_random_uuid();
  v_cl      uuid := gen_random_uuid();
  v_pa      text;
  v_ps      text;
  v_pc      text;
  v_prefs   jsonb := jsonb_build_object('telegram', jsonb_build_object('show', true, 'value', 'e2e'),
                                        'messages', jsonb_build_object('show', true));
  v_answer  jsonb;
  v_refused bigint;
  v_snap    text;
  v_snap2   text;
  v_msg     text;
  v_fn      regprocedure := 'public.reveal_listing_contact(text)'::regprocedure;
  v_count   regprocedure := 'public.listing_reveal_count(uuid)'::regprocedure;
BEGIN
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
             OR prorettype <> 'jsonb'::regtype FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-5b part 4 proof (a): reveal_listing_contact''s header, return type or grants differ';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn)
     IS DISTINCT FROM '929461f20ea5cd52df058e3f3f6d1291' THEN -- new md5: reveal_listing_contact
    RAISE EXCEPTION 'F1-5b part 4 proof (a): reveal_listing_contact''s body differs from this file';
  END IF;
  IF EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_count)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_count, 'EXECUTE')
     OR has_function_privilege('authenticated', v_count, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_count, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-5b part 4 proof (a): listing_reveal_count keeps a browser grant';
  END IF;

  v_tag := 'e2e-mig-f15b4-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5b part 4 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_c, v_tag || '-c@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_e, v_tag || '-e@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_b, v_c, v_d, v_e]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    -- The scratch callers' own ceilings: no verdict below rests on a live dial's value (rule 30 scan, point 4).
    INSERT INTO public.rate_overrides (user_id, action, max_count)
    SELECT u, a, 1000 FROM unnest(ARRAY[v_a, v_b, v_c, v_d, v_e]) u,
                           unnest(ARRAY['contact_reveal', 'contact_reveal_sellers']) a;
    -- c owes one acceptance: a scratch document only c is asked (legal_acceptance_pending's e2e-acc-u kind).
    INSERT INTO public.legal_documents (kind, country_code)
    VALUES ('e2e-acc-u' || replace(v_c::text, '-', ''), NULL) RETURNING id INTO v_doc;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog, material,
                                       effective_at, published_at, settings_snapshot)
    VALUES (v_doc, 1, 'published', 'v1', v_tag, v_tag, v_tag, false,
            now() - interval '1 minute', now() - interval '1 minute', jsonb_build_object('seed', v_tag));
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_d
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_d AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at, contact_pref)
    VALUES (v_al, v_a, v_cat, v_city, v_tag || ' al', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days', v_prefs),
           (v_sl, v_a, v_cat, v_city, v_tag || ' sl', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days', v_prefs),
           (v_cl, v_a, v_cat, v_city, v_tag || ' cl', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days', v_prefs);
    UPDATE public.listings SET status = 'sold', sold_at = now() WHERE id = v_sl AND seller_id = v_a;
    SELECT public_id INTO v_pa FROM public.listings WHERE id = v_al;
    SELECT public_id INTO v_ps FROM public.listings WHERE id = v_sl;
    SELECT public_id INTO v_pc FROM public.listings WHERE id = v_cl;
    DELETE FROM public.listings WHERE id = v_cl AND seller_id = v_a;
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals
     WHERE day = current_date AND door = 'reveal_listing_contact';
    SELECT coalesce((SELECT string_agg(to_jsonb(r)::text, '|' ORDER BY r.listing_id, r.viewer_id) FROM public.contact_reveals r
                      WHERE r.viewer_id IN (v_a, v_b, v_c, v_d, v_e)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(f)::text, '|' ORDER BY f.viewer_id) FROM public.reveal_flags f
                              WHERE f.viewer_id IN (v_a, v_b, v_c, v_d, v_e)), '')
      INTO v_snap;

    -- (b) the refusals, each by its code and status.
    v_answer := public.reveal_listing_contact(v_pa);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: reveal_listing_contact with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.reveal_listing_contact(v_pa);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: reveal_listing_contact for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.reveal_listing_contact('nope');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotAvailable', 'listingNotAvailable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: reveal_listing_contact of a malformed id answered %', v_answer;
    END IF;
    v_answer := public.reveal_listing_contact(v_ps);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotAvailable', 'listingNotAvailable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: a buyer''s reveal of a sold ad answered %', v_answer;
    END IF;
    v_answer := public.reveal_listing_contact(v_pc);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotAvailable', 'listingNotAvailable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: reveal_listing_contact of a gone ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cc, true);
    v_answer := public.reveal_listing_contact(v_pa);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('acceptanceRequired', 'acceptanceRequired', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: a viewer who owes an acceptance was answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(r)::text, '|' ORDER BY r.listing_id, r.viewer_id) FROM public.contact_reveals r
                      WHERE r.viewer_id IN (v_a, v_b, v_c, v_d, v_e)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(f)::text, '|' ORDER BY f.viewer_id) FROM public.reveal_flags f
                              WHERE f.viewer_id IN (v_a, v_b, v_c, v_d, v_e)), '')
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: a refused reveal wrote a row';
    END IF;

    -- (c) the work: the owner sees his own sold ad; a buyer's reveal writes one day row, a repeat none.
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.reveal_listing_contact(v_ps);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'channels', v_prefs - 'messages'), false) THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: the owner''s reveal of his sold ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.reveal_listing_contact(v_pa);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'channels', v_prefs - 'messages'), false) THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: the buyer''s reveal answered %', v_answer;
    END IF;
    v_answer := public.reveal_listing_contact(v_pa);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'channels', v_prefs - 'messages'), false) THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: the buyer''s repeat reveal answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF (SELECT count(*) FROM public.contact_reveals WHERE viewer_id IN (v_a, v_b, v_c, v_d, v_e)) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.contact_reveals WHERE viewer_id = v_b AND listing_id = v_al AND day = current_date) THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: the reveals did not leave the buyer''s one day row';
    END IF;

    -- (d) the two ceilings of the work stay returned answers: the distinct-sellers ceiling keeps its flag.
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    VALUES (v_c, v_cat, v_city, v_tag || ' ol', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days');
    INSERT INTO public.contact_reveals (listing_id, viewer_id, day)
    SELECT l.id, v_e, current_date FROM public.listings l WHERE l.seller_id = v_c AND l.title = v_tag || ' ol';
    UPDATE public.rate_overrides SET max_count = 1 WHERE user_id = v_e AND action = 'contact_reveal_sellers';
    PERFORM set_config('request.jwt.claims', v_ce, true);
    v_answer := public.reveal_listing_contact(v_pa);
    IF (v_answer ->> 'ok', v_answer ->> 'reason') IS DISTINCT FROM ('false', 'sellersCapReached')
       OR v_answer ->> 'resets_at' IS NULL THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: the distinct-sellers ceiling answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF NOT EXISTS (SELECT 1 FROM public.reveal_flags WHERE viewer_id = v_e AND day = current_date) THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: the distinct-sellers ceiling kept no flag';
    END IF;
    UPDATE public.rate_overrides SET max_count = 1000 WHERE user_id = v_e AND action = 'contact_reveal_sellers';
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code, status,
                                 published_at, published_first_at, expires_at)
    SELECT v_a, v_cat, v_city, v_tag || ' f' || g, 'scratch', v_code, 'active', now(), now(), now() + interval '10 days'
      FROM generate_series(1, 5) g;
    INSERT INTO public.contact_reveals (listing_id, viewer_id, day)
    SELECT l.id, v_e, current_date FROM public.listings l WHERE l.seller_id = v_a AND l.title LIKE v_tag || ' f%';
    PERFORM set_config('request.jwt.claims', v_ce, true);
    v_answer := public.reveal_listing_contact(v_pa);
    IF (v_answer ->> 'ok', v_answer ->> 'reason') IS DISTINCT FROM ('false', 'rateLimited')
       OR v_answer ->> 'resets_at' IS NULL THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: the new account''s five answered %', v_answer;
    END IF;

    -- (e) the gate's ceiling: the sixth counted call is refused rateLimited (429).
    PERFORM set_config('request.jwt.claims', '{}', true);
    UPDATE public.rate_overrides SET max_count = 5 WHERE user_id = v_b AND action = 'contact_reveal';
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.reveal_listing_contact(v_pa);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('rateLimited', 'rateLimited', 'false', '429') THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: a reveal over the gate''s ceiling answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (f) the dial: every call past the gate counts once (INC-844); a gate refusal counts none.
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' WHEN v_c::text THEN 'c'
                              WHEN v_d::text THEN 'd' ELSE 'e' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_c::text, v_d::text, v_e::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"a/contact_reveal":1,"b/contact_reveal":6,"c/contact_reveal":1,"e/contact_reveal":2}'::jsonb THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'reveal_listing_contact')
         IS DISTINCT FROM v_refused + 7 THEN
      RAISE EXCEPTION 'F1-5b part 4 proof: door_refusals did not meter the 7 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5b-part-4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5b-part-4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261117060300') ON CONFLICT DO NOTHING;
