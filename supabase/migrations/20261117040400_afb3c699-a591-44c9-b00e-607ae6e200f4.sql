-- e2e-areas: ad-page, account, auth

-- Foundations 1, turn F1-5b, part 2 — THE SAVES ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-5b.md, census docs/governance/reports/f1-doors-5b.census.md D1, D2, D4, D5).
-- save_listing and unsave_listing are redeclared WHOLE from their last declarations (live md5 checked): ONE
-- door_context('owner', NULL, NULL, 'save') gate each, their refusals by door_refuse codes, the shell.
-- Ruling 1 §7: save spends `save` at the gate, before the row is read (it spent it only on a first save);
-- DEC-385: unsave spends `save` (it spent none). save's listing read is held (FOR KEY SHARE, INC-786).
-- Folds: 'not authenticated' → notSignedIn; 'account is deactivated' → accountDeactivated; the returned
-- ownListing → door_refuse('ownListing'); the returned rateLimited → the gate's rateLimited (INC-1170).

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.save_listing(text)', 'cee7d6a6df902478859d12df6e8ac8f2'],
    ['public.unsave_listing(text)', '12eb179b16ad8d1076a664f22d18d9a4']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261117060000') THEN
    RAISE EXCEPTION 'F1-5b part 2: part 1 (mark 20261117060000) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'door_context' AND pronamespace = 'public'::regnamespace) THEN
    RAISE EXCEPTION 'F1-5b part 2: the door mechanism (door_context, door_refuse, door_refused) is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5b part 2: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. save_listing (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.save_listing(p_public_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_id    uuid;
  v_count bigint;
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'save');
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    PERFORM public.door_refuse('listingNotAvailable');
  END IF;
  -- The public predicate (listings_public_read): a live ad, or a sold one within its 30 days. Anything else is not there.
  -- INC-786: held against a DELETE until the saved row is written; an ad gone first is not there.
  SELECT l.id INTO v_id FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))
     FOR KEY SHARE;
  IF v_id IS NULL THEN PERFORM public.door_refuse('listingNotAvailable'); END IF;
  -- The owner does not save his own ad (D201 §5: no Save for the owner), so "Saved by N" counts buyers only.
  IF EXISTS (SELECT 1 FROM public.listings l WHERE l.id = v_id AND l.seller_id = v_uid) THEN
    PERFORM public.door_refuse('ownListing');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.saved_listings s WHERE s.user_id = v_uid AND s.listing_id = v_id) THEN
    -- INC-694 — personal data carries the saver's home country (Knowledge E3), from user_directory.
    INSERT INTO public.saved_listings (user_id, listing_id, home_country_code)
    VALUES (v_uid, v_id, (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid))
    ON CONFLICT DO NOTHING;
  END IF;
  SELECT count(*) INTO v_count FROM public.saved_listings s WHERE s.listing_id = v_id;
  RETURN jsonb_build_object('ok', true, 'saved', true, 'count', v_count);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('save_listing', 'save', SQLERRM);
END $function$;

REVOKE ALL ON FUNCTION public.save_listing(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_listing(text) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. unsave_listing (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.unsave_listing(p_public_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_id    uuid;
  v_count bigint;
BEGIN
  PERFORM public.door_context('owner', NULL, NULL, 'save');
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    PERFORM public.door_refuse('listingNotAvailable');
  END IF;
  -- Any ad the caller saved may be unsaved, public or not (the Saved page's Remove on a grey card).
  SELECT l.id INTO v_id FROM public.listings l WHERE l.public_id = p_public_id;
  IF v_id IS NULL THEN PERFORM public.door_refuse('listingNotAvailable'); END IF;
  DELETE FROM public.saved_listings s WHERE s.user_id = v_uid AND s.listing_id = v_id;
  SELECT count(*) INTO v_count FROM public.saved_listings s WHERE s.listing_id = v_id;
  RETURN jsonb_build_object('ok', true, 'saved', false, 'count', v_count);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('unsave_listing', 'save', SQLERRM);
END $function$;

REVOKE ALL ON FUNCTION public.unsave_listing(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.unsave_listing(text) TO authenticated, service_role;

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
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_pairs := ARRAY[
    ['public.save_listing(text)', 'e3b54b0714f2d2f53d33c8265f044b4d'], -- new md5: save_listing
    ['public.unsave_listing(text)', '0bbbbc404308ed5f3f80a8eea7d7282c']]; -- new md5: unsave_listing
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> 'jsonb'::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-5b part 2 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5b part 2 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15b2-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5b part 2 proof: the scratch market has no anchor'; END IF;
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
    SELECT u, 'save', 1000 FROM unnest(ARRAY[v_a, v_b, v_d]) u;
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
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals
     WHERE day = current_date AND door IN ('save_listing', 'unsave_listing');
    SELECT coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.listing_id) FROM public.saved_listings s
                      WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l
                              WHERE l.seller_id = v_a), '')
      INTO v_snap;

    -- (b) the refusals, each by its code and status.
    v_answer := public.save_listing(v_pa);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: save_listing with no caller answered %', v_answer;
    END IF;
    v_answer := public.unsave_listing(v_pa);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: unsave_listing with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.save_listing(v_pa);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: save_listing for a deactivated caller answered %', v_answer;
    END IF;
    v_answer := public.unsave_listing(v_pa);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: unsave_listing for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.save_listing('nope');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotAvailable', 'listingNotAvailable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: save_listing of a malformed id answered %', v_answer;
    END IF;
    v_answer := public.save_listing(v_pd);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotAvailable', 'listingNotAvailable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: save_listing of a draft answered %', v_answer;
    END IF;
    v_answer := public.save_listing(v_pc);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotAvailable', 'listingNotAvailable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: save_listing of a gone ad answered %', v_answer;
    END IF;
    v_answer := public.unsave_listing('nope');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('listingNotAvailable', 'listingNotAvailable', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: unsave_listing of a malformed id answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.save_listing(v_pa);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('ownListing', 'ownListing', 'false', '400') THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: save_listing of the caller''s own ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.listing_id) FROM public.saved_listings s
                      WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l
                              WHERE l.seller_id = v_a), '')
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: a refused save or unsave wrote a row';
    END IF;

    -- (c) the work: a save, a repeat, an unsave, an unsave of an ad not public.
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.save_listing(v_pa);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'saved', true, 'count', 1), false) THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: the save answered %', v_answer;
    END IF;
    v_answer := public.save_listing(v_pa);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'saved', true, 'count', 1), false) THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: the repeat save answered %', v_answer;
    END IF;
    IF (SELECT count(*) FROM public.saved_listings WHERE user_id = v_b AND listing_id = v_al) <> 1 THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: the saves did not leave one saved row';
    END IF;
    v_answer := public.unsave_listing(v_pa);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'saved', false, 'count', 0), false) THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: the unsave answered %', v_answer;
    END IF;
    v_answer := public.unsave_listing(v_pd);
    IF NOT coalesce(v_answer = jsonb_build_object('ok', true, 'saved', false, 'count', 0), false) THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: the unsave of a draft answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.saved_listings WHERE user_id IN (v_a, v_b, v_d)) THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: the unsave left a saved row';
    END IF;

    -- (d) the dial: every call past the gate counts once (INC-844); a gate refusal counts none.
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' ELSE 'd' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_d::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"a/save":1,"b/save":8}'::jsonb THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals
         WHERE day = current_date AND door IN ('save_listing', 'unsave_listing')) IS DISTINCT FROM v_refused + 9 THEN
      RAISE EXCEPTION 'F1-5b part 2 proof: door_refusals did not meter the 9 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5b-part-2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5b-part-2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261117060100') ON CONFLICT DO NOTHING;
