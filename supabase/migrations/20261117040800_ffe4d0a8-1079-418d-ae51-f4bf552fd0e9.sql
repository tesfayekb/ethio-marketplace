-- e2e-areas: ad-page, legal

-- Foundations 1, turn F1-5b, part 6 — THE PUBLIC AD READ ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-5b.md, census docs/governance/reports/f1-doors-5b.census.md D2).
-- public_listing is redeclared WHOLE from its last declaration (live md5 checked): ONE
-- door_context('public', NULL, NULL, 'listing_read') gate (a visitor passes it and spends nothing, as with
-- rate_gate), the shell. An ad that is not there stays NULL (data, not a refusal).
-- Folds: the raised 'rateLimited' → the gate's rateLimited; 'account is deactivated' → accountDeactivated.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261117060400') THEN
    RAISE EXCEPTION 'F1-5b part 6: part 5 (mark 20261117060400) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.public_listing(text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'c81bde858ae7ae351040b2c6192dcf96' THEN
    RAISE EXCEPTION 'F1-5b part 6: the live public_listing is not its last declaration''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. public_listing (whole; the public gate and the shell)
CREATE OR REPLACE FUNCTION public.public_listing(p_public_id text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_row  public.listings%ROWTYPE;
BEGIN
  -- A signed-in caller is counted here; an anonymous caller is counted by the route, by hashed address.
  PERFORM public.door_context('public', NULL, NULL, 'listing_read');
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RETURN NULL;
  END IF;
  -- listings_public_read (20261015023155), restated: live, or sold within 30 days. Anything else is "not there".
  SELECT * INTO v_row FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())));
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;
  RETURN public.public_listing_json(v_row, auth.uid());
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('public_listing', 'listing_read', SQLERRM);
END $$;

REVOKE ALL ON FUNCTION public.public_listing(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.public_listing(text) TO anon, authenticated, service_role;

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
  v_canon   text := json_build_object('role', 'anon')::text;
  v_cb      text := json_build_object('sub', v_b::text, 'role', 'authenticated')::text;
  v_cd      text := json_build_object('sub', v_d::text, 'role', 'authenticated')::text;
  v_r0      text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_al      uuid := gen_random_uuid();
  v_dl      uuid := gen_random_uuid();
  v_pa      text;
  v_pd      text;
  v_answer  jsonb;
  v_refused bigint;
  v_msg     text;
  v_fn      regprocedure := 'public.public_listing(text)'::regprocedure;
BEGIN
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
             OR prorettype <> 'jsonb'::regtype FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR NOT has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-5b part 6 proof (a): public_listing''s header, return type or grants differ';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn)
     IS DISTINCT FROM '112498af71045b114b84c61abd3cf0fd' THEN -- new md5: public_listing
    RAISE EXCEPTION 'F1-5b part 6 proof (a): public_listing''s body differs from this file';
  END IF;

  v_tag := 'e2e-mig-f15b6-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5b part 6 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5b part 6 proof: the scratch market has no anchor'; END IF;
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
    SELECT u, 'listing_read', 1000 FROM unnest(ARRAY[v_a, v_b, v_d]) u;
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
    VALUES (v_al, v_a, v_cat, v_city, v_tag || ' al', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days');
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, status)
    VALUES (v_dl, v_a, v_cat, v_city, v_tag || ' dl', 'scratch', v_code, 'draft');
    SELECT public_id INTO v_pa FROM public.listings WHERE id = v_al;
    SELECT public_id INTO v_pd FROM public.listings WHERE id = v_dl;
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date AND door = 'public_listing';

    -- (b) a visitor: the live ad, NULL for anything else, nothing spent.
    PERFORM set_config('request.jwt.claims', v_canon, true);
    v_answer := public.public_listing(v_pa);
    IF v_answer IS NULL OR v_answer ->> 'public_id' IS DISTINCT FROM v_pa THEN
      RAISE EXCEPTION 'F1-5b part 6 proof (b): a visitor''s read of a live ad answered %', v_answer;
    END IF;
    IF public.public_listing(v_pd) IS NOT NULL OR public.public_listing('nope') IS NOT NULL THEN
      RAISE EXCEPTION 'F1-5b part 6 proof (b): a visitor read a draft or a malformed id';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.public_listing(v_pa);
    IF v_answer IS NULL OR v_answer ->> 'public_id' IS DISTINCT FROM v_pa THEN
      RAISE EXCEPTION 'F1-5b part 6 proof (b): a read with no claims answered %', v_answer;
    END IF;

    -- (c) a signed-in reader is counted; a deactivated one refused; the ceiling refused.
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.public_listing(v_pa);
    IF v_answer IS NULL OR v_answer ->> 'public_id' IS DISTINCT FROM v_pa THEN
      RAISE EXCEPTION 'F1-5b part 6 proof (c): a signed-in read of a live ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.public_listing(v_pa);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5b part 6 proof (c): a deactivated reader was answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    UPDATE public.rate_overrides SET max_count = 1 WHERE user_id = v_b AND action = 'listing_read';
    PERFORM set_config('request.jwt.claims', v_cb, true);
    v_answer := public.public_listing(v_pa);
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('rateLimited', 'rateLimited', 'false', '429') THEN
      RAISE EXCEPTION 'F1-5b part 6 proof (c): a read over the ceiling answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (d) the dial: the signed-in reader's two calls count; the visitor and the deactivated reader none.
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' ELSE 'd' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_d::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"b/listing_read":2}'::jsonb THEN
      RAISE EXCEPTION 'F1-5b part 6 proof (d): the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'public_listing')
         IS DISTINCT FROM v_refused + 2 THEN
      RAISE EXCEPTION 'F1-5b part 6 proof (d): door_refusals did not meter the 2 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5b-part-6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5b-part-6-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261117060500') ON CONFLICT DO NOTHING;
