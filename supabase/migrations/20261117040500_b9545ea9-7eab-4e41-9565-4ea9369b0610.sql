-- e2e-areas: ad-page, admin-listings

-- Foundations 1, turn F1-5b, part 3 — THE REPORT ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-5b.md, census docs/governance/reports/f1-doors-5b.census.md D1, D2, D4, D5).
-- report_listing is redeclared WHOLE from its last declaration (live md5 checked): ONE
-- door_context('owner', NULL, NULL, 'report') gate, its refusals by door_refuse codes, the shell.
-- Ruling 1 §7: `report` is spent at the gate, before the reason, the note and the row are read (it counted
-- written reports only). The listing read is held (FOR KEY SHARE, INC-786).
-- Folds: 'not authenticated' → notSignedIn; 'account is deactivated' → accountDeactivated; the returned
-- badReason, noteTooLong, ownListing and alreadyReported → door_refuse with the same code; the returned
-- rateLimited → the gate's rateLimited (INC-1170).

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261117060100') THEN
    RAISE EXCEPTION 'F1-5b part 3: part 2 (mark 20261117060100) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.report_listing(text,text,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '0d37fb1dfa3d5215e2ae184667e99c1a' THEN
    RAISE EXCEPTION 'F1-5b part 3: the live report_listing is not its last declaration''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. report_listing (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.report_listing(p_public_id text, p_reason text, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_id     uuid;
  v_seller uuid;
  v_note   text;
  v_home   character(2);
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'report');
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    PERFORM public.door_refuse('listingNotAvailable');
  END IF;
  IF p_reason IS NULL OR p_reason NOT IN ('spam', 'scam', 'prohibited', 'wrongCategory', 'duplicate', 'alreadySold', 'under18', 'copyright', 'other') THEN
    PERFORM public.door_refuse('badReason');
  END IF;
  v_note := nullif(btrim(coalesce(p_note, '')), '');
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    PERFORM public.door_refuse('noteTooLong');
  END IF;
  -- The public predicate (listings_public_read): a live ad, or a sold one within its 30 days.
  -- INC-786: held against a DELETE until the report is written; an ad gone first is not there.
  SELECT l.id, l.seller_id INTO v_id, v_seller FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))
     FOR KEY SHARE;
  IF v_id IS NULL THEN PERFORM public.door_refuse('listingNotAvailable'); END IF;
  IF v_seller = v_uid THEN PERFORM public.door_refuse('ownListing'); END IF;
  IF EXISTS (SELECT 1 FROM public.listing_reports r
              WHERE r.listing_id = v_id AND r.reporter_id = v_uid AND r.status = 'open') THEN
    PERFORM public.door_refuse('alreadyReported');
  END IF;
  SELECT d.home_country_code INTO v_home FROM public.user_directory d WHERE d.user_id = v_uid;
  INSERT INTO public.listing_reports (listing_id, reporter_id, home_country_code, reason, note)
  VALUES (v_id, v_uid, v_home, p_reason, v_note);
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('report_listing', 'report', SQLERRM);
END $$;

REVOKE ALL ON FUNCTION public.report_listing(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.report_listing(text, text, text) TO authenticated, service_role;

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
  v_d       uuid := gen_random_uuid();
  v_ca      text := json_build_object('sub', v_a::text, 'role', 'authenticated')::text;
  v_cb      text := json_build_object('sub', v_b::text, 'role', 'authenticated')::text;
  v_cd      text := json_build_object('sub', v_d::text, 'role', 'authenticated')::text;
  v_r0      text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_al      uuid := gen_random_uuid();
  v_dl      uuid := gen_random_uuid();
  v_cl      uuid := gen_random_uuid();
  v_pa      text;
  v_pd      text;
  v_pc      text;
  v_answer  jsonb;
  v_refused bigint;
  v_snap    text;
  v_snap2   text;
  v_msg     text;
  v_fn      regprocedure := 'public.report_listing(text,text,text)'::regprocedure;
BEGIN
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
             OR prorettype <> 'jsonb'::regtype FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-5b part 3 proof (a): report_listing''s header, return type or grants differ';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn)
     IS DISTINCT FROM '1e0a8f1732a9b5c566e4221853a21a0f' THEN -- new md5: report_listing
    RAISE EXCEPTION 'F1-5b part 3 proof (a): report_listing''s body differs from this file';
  END IF;

  v_tag := 'e2e-mig-f15b3-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5b part 3 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_b, v_d]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    -- The scratch callers' own ceiling: no verdict below rests on the live dial's value (rule 30 scan, point 4).
    INSERT INTO public.rate_overrides (user_id, action, max_count)
    SELECT u, 'report', 1000 FROM unnest(ARRAY[v_a, v_b, v_d]) u;
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
                                 published_at, published_first_at, expires_at)
    VALUES (v_al, v_a, v_cat, v_city, v_tag || ' al', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days'),
           (v_cl, v_a, v_cat, v_city, v_tag || ' cl', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days');
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status)
    VALUES (v_dl, v_a, v_cat, v_city, v_tag || ' dl', 'scratch', v_code, 'draft');
    SELECT public_id INTO v_pa FROM public.listings WHERE id = v_al;
    SELECT public_id INTO v_pd FROM public.listings WHERE id = v_dl;
    SELECT public_id INTO v_pc FROM public.listings WHERE id = v_cl;
    DELETE FROM public.listings WHERE id = v_cl AND seller_id = v_a;
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date AND door = 'report_listing';
    SELECT coalesce((SELECT string_agg(to_jsonb(r)::text, '|' ORDER BY r.id) FROM public.listing_reports r
                      WHERE r.reporter_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l
                              WHERE l.seller_id = v_a), '')
      INTO v_snap;

    -- (b) the refusals, each by its code and status.
    v_answer := public.report_listing(v_pa, 'scam', NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: report_listing with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.report_listing(v_pa, 'scam', NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: report_listing for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.report_listing('nope', 'scam', NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotAvailable', 'listingNotAvailable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: report_listing of a malformed id answered %', v_answer;
    END IF;
    v_answer := public.report_listing(v_pa, 'nonsense', NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('badReason', 'badReason', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: report_listing with a reason off the list answered %', v_answer;
    END IF;
    v_answer := public.report_listing(v_pa, 'other', repeat('x', 501));
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('noteTooLong', 'noteTooLong', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: report_listing with a 501-character note answered %', v_answer;
    END IF;
    v_answer := public.report_listing(v_pd, 'scam', NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotAvailable', 'listingNotAvailable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: report_listing of a draft answered %', v_answer;
    END IF;
    v_answer := public.report_listing(v_pc, 'scam', NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotAvailable', 'listingNotAvailable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: report_listing of a gone ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.report_listing(v_pa, 'scam', NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('ownListing', 'ownListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: report_listing of the caller''s own ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(r)::text, '|' ORDER BY r.id) FROM public.listing_reports r
                      WHERE r.reporter_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l
                              WHERE l.seller_id = v_a), '')
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: a refused report wrote a row';
    END IF;

    -- (c) the work, then the open report, then the dial's ceiling.
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.report_listing(v_pa, 'scam', '  looks fake  ');
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true), false) THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: the report answered %', v_answer;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.listing_reports WHERE reporter_id = v_b AND listing_id = v_al
                    AND reason = 'scam' AND note = 'looks fake' AND status = 'open') THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: the report row is not the report';
    END IF;
    v_answer := public.report_listing(v_pa, 'spam', NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('alreadyReported', 'alreadyReported', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: a second open report answered %', v_answer;
    END IF;
    UPDATE public.rate_overrides SET max_count = 7 WHERE user_id = v_b AND action = 'report';
    v_answer := public.report_listing(v_pa, 'spam', NULL);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('rateLimited', 'rateLimited', 'false', '429') THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: a report over the ceiling answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF (SELECT count(*) FROM public.listing_reports WHERE reporter_id IN (v_a, v_b, v_d)) <> 1 THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: the reports are not the one written';
    END IF;

    -- (d) the dial: every call past the gate counts once (INC-844); a gate refusal counts none.
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' ELSE 'd' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_d::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"a/report":1,"b/report":8}'::jsonb THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'report_listing')
         IS DISTINCT FROM v_refused + 10 THEN
      RAISE EXCEPTION 'F1-5b part 3 proof: door_refusals did not meter the 10 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5b-part-3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5b-part-3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261117060200') ON CONFLICT DO NOTHING;
