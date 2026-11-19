-- e2e-areas: ad-page

-- Foundations 1, turn F1-7a, part 8 of 10 — THE VIEWER'S STATE ON THE AD PAGE (DEC-333; INC-1191; brief
-- docs/governance/briefs/f1-doors-7a.md; ruling docs/governance/briefs/f1-doors-7a-ruling-1.md, decision 12).
-- listing_viewer_state(p_public_id text) answers, in one signed-in read on the gate, what the ad page needs to know
-- about the person looking at it: {saved, owner} — whether they saved the ad and whether it is theirs. A malformed or
-- unknown id answers both false. It replaces listing_saved(text), which is dropped here (its one caller, the ad
-- page's save state, moves to the new reader in the same pull request); listing_saved has no SQL caller.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119170600') THEN
    RAISE EXCEPTION 'F1-7a part 8: the mark 20261119170600 must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.listing_saved(text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '0480877ae73fee3a60e82d950b246335' THEN
    RAISE EXCEPTION 'F1-7a part 8: the live listing_saved is not its last declaration''s body (%)', v_md5;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
              WHERE n.nspname = 'public' AND p.proname <> 'listing_saved'
                AND p.prosrc ~ '\mlisting_saved\M') THEN
    RAISE EXCEPTION 'F1-7a part 8: a function of public calls listing_saved';
  END IF;
  IF to_regprocedure('public.listing_viewer_state(text)') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-7a part 8: listing_viewer_state already exists';
  END IF;
END $pre$;

-- The live definition before the drop: the proof runs it as a pg_temp copy beside the new reader.
CREATE TEMP TABLE f17a_p8_before ON COMMIT DROP AS
SELECT p.proname::text AS name, pg_get_functiondef(p.oid) AS def
  FROM pg_proc p
 WHERE p.oid = 'public.listing_saved(text)'::regprocedure;

-- ------------------------------------------------------------ 1. listing_saved leaves
DROP FUNCTION public.listing_saved(text);

-- ------------------------------------------------------------ 2. listing_viewer_state
CREATE FUNCTION public.listing_viewer_state(p_public_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_ctx     public.door_ctx := public.door_context('reader');
  v_listing uuid;
  v_seller  uuid;
BEGIN
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RETURN jsonb_build_object('saved', false, 'owner', false);
  END IF;
  SELECT l.id, l.seller_id INTO v_listing, v_seller FROM public.listings l WHERE l.public_id = p_public_id;
  IF v_listing IS NULL THEN
    RETURN jsonb_build_object('saved', false, 'owner', false);
  END IF;
  RETURN jsonb_build_object(
    'saved', EXISTS (SELECT 1 FROM public.saved_listings s WHERE s.user_id = v_ctx.uid AND s.listing_id = v_listing),
    'owner', coalesce(v_seller = v_ctx.uid, false));
END $function$;
REVOKE ALL ON FUNCTION public.listing_viewer_state(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.listing_viewer_state(text) TO authenticated;
GRANT ALL ON FUNCTION public.listing_viewer_state(text) TO service_role;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) listing_saved is gone; listing_viewer_state is STABLE SECURITY DEFINER with search_path public, callable by
--       authenticated and the service role, never by anon or PUBLIC;
--   (b) through the browser role, on a scratch ad: its seller reads {saved:false, owner:true}; a person who saved it
--       reads {saved:true, owner:false}; a person who did not reads both false; a malformed id and an unknown
--       well-formed id read both false; every `saved` equals the old listing_saved's answer (its pg_temp copy) for the
--       same person and id;
--   (c) signed out → notSignedIn; a deactivated caller → accountDeactivated;
--   (d) the cost: 200 calls beside the old listing_saved, medians as a NOTICE; a new median over 5 ms fails
--       (ruling 7's bar, F1-1).
DO $proof$
DECLARE
  v_stem    text := translate(substr(md5(gen_random_uuid()::text), 1, 10), '0123456789', 'ghijkmnopr');
  v_tag     text;
  -- 'XZ' a scratch code no market holds (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_l       uuid := gen_random_uuid();
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_pub     text;
  v_unknown text;
  v_r       record;
  v_who     uuid;
  v_id      text;
  v_want    jsonb;
  v_new     jsonb;
  v_old     boolean;
  v_got     text;
  v_st      text;
  v_msg     text;
  v_fn      text := 'listing_viewer_state';
  v_ok      boolean;
  v_t0      timestamptz;
  v_old_ms  double precision[];
  v_new_ms  double precision[];
  v_mo      double precision;
  v_mn      double precision;
  i         integer;
BEGIN
  -- (a)
  IF to_regprocedure('public.listing_saved(text)') IS NOT NULL
     OR (SELECT proconfig::text <> '{search_path=public}' OR provolatile <> 's' OR NOT prosecdef
           FROM pg_proc WHERE oid = 'public.listing_viewer_state(text)'::regprocedure)
     OR has_function_privilege('anon', 'public.listing_viewer_state(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.listing_viewer_state(text)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.listing_viewer_state(text)', 'EXECUTE')
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc
                                           WHERE oid = 'public.listing_viewer_state(text)'::regprocedure)) a
                 WHERE a.grantee = 0) THEN
    RAISE EXCEPTION 'F1-7a part 8 proof (a): listing_saved remains, or listing_viewer_state is not a reader for authenticated';
  END IF;

  BEGIN
    FOR v_r IN SELECT name, def FROM f17a_p8_before LOOP
      EXECUTE regexp_replace(v_r.def, '^CREATE OR REPLACE FUNCTION public\.' || v_r.name || '\(',
                             'CREATE FUNCTION pg_temp.f17a_old_' || v_r.name || '(');
    END LOOP;
    FOR v_r IN SELECT substr(p.proname, 10) AS name, pg_get_function_identity_arguments(p.oid) AS def
                 FROM pg_proc p
                WHERE p.pronamespace = pg_my_temp_schema() AND p.proname LIKE 'f17a\_old\_%' LOOP
      EXECUTE format('REVOKE ALL ON FUNCTION pg_temp.f17a_old_%s(%s) FROM PUBLIC', v_r.name, v_r.def);
    END LOOP;
    IF (SELECT count(*) FROM f17a_p8_before) <> 1 THEN
      RAISE EXCEPTION 'F1-7a part 8 proof: the old listing_saved was not captured';
    END IF;

    v_tag := 'e2e-mig-f17a8-' || v_stem;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-7a part 8 proof: scratch code % already exists', v_code;
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
      (v_c, v_tag || '-c@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
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
    SELECT l.public_id INTO v_pub FROM public.listings l WHERE l.id = v_l;
    INSERT INTO public.saved_listings (user_id, listing_id) VALUES (v_b, v_l);
    v_unknown := translate(substr(md5(v_stem || 'x'), 1, 10), '01il', '2345');
    IF v_unknown !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$'
       OR EXISTS (SELECT 1 FROM public.listings l WHERE l.public_id = v_unknown) THEN
      RAISE EXCEPTION 'F1-7a part 8 proof: the unknown id % is not a free well-formed id', v_unknown;
    END IF;

    -- (b)
    FOR v_who, v_id, v_want IN VALUES
        (v_a, v_pub, '{"saved": false, "owner": true}'::jsonb),
        (v_b, v_pub, '{"saved": true, "owner": false}'::jsonb),
        (v_c, v_pub, '{"saved": false, "owner": false}'::jsonb),
        (v_b, 'not an id', '{"saved": false, "owner": false}'::jsonb),
        (v_b, NULL, '{"saved": false, "owner": false}'::jsonb),
        (v_b, v_unknown, '{"saved": false, "owner": false}'::jsonb) LOOP
      PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who::text, 'role', 'authenticated')::text, true);
      v_old := pg_temp.f17a_old_listing_saved(v_id);
      SET LOCAL ROLE authenticated;
      v_new := public.listing_viewer_state(v_id);
      RESET ROLE;
      IF v_new IS DISTINCT FROM v_want OR (v_new ->> 'saved')::boolean IS DISTINCT FROM v_old THEN
        RAISE EXCEPTION 'F1-7a part 8 proof (b): % for % read % (want %, the old saved %)', v_id, v_who, v_new, v_want, v_old;
      END IF;
    END LOOP;

    -- (c)
    FOR v_who, v_want IN VALUES (NULL::uuid, '"notSignedIn"'::jsonb), (v_d, '"accountDeactivated"'::jsonb) LOOP
      PERFORM set_config('request.jwt.claims',
        CASE WHEN v_who IS NULL THEN '{}'
             ELSE json_build_object('sub', v_who::text, 'role', 'authenticated')::text END, true);
      v_got := NULL; v_st := NULL;
      SET LOCAL ROLE authenticated;
      BEGIN
        v_new := public.listing_viewer_state(v_pub);
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_got = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      RESET ROLE;
      IF v_got IS DISTINCT FROM v_want #>> '{}' OR v_st IS DISTINCT FROM 'P0D01' THEN
        RAISE EXCEPTION 'F1-7a part 8 proof (c): % answered % (%), not %', coalesce(v_who::text, 'no caller'),
          coalesce(v_got, 'success'), v_st, v_want #>> '{}';
      END IF;
    END LOOP;

    -- (d) the cost, the saver's reads
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_b::text, 'role', 'authenticated')::text, true);
    BEGIN
      v_old_ms := ARRAY[]::double precision[];
      v_new_ms := ARRAY[]::double precision[];
      FOR i IN 1..200 LOOP
        v_t0 := clock_timestamp();
        v_ok := pg_temp.f17a_old_listing_saved(v_pub);
        v_old_ms := array_append(v_old_ms, extract(epoch FROM clock_timestamp() - v_t0) * 1000.0);
        v_t0 := clock_timestamp();
        v_new := public.listing_viewer_state(v_pub);
        v_new_ms := array_append(v_new_ms, extract(epoch FROM clock_timestamp() - v_t0) * 1000.0);
      END LOOP;
      SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY s) INTO v_mo FROM unnest(v_old_ms) AS s;
      SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY s) INTO v_mn FROM unnest(v_new_ms) AS s;
      RAISE NOTICE 'F1-7a part 8 cost: % median old % ms, new % ms', v_fn, round(v_mo::numeric, 4), round(v_mn::numeric, 4);
      IF v_mn > 5 THEN
        RAISE EXCEPTION 'F1-7a part 8 proof (d): % takes % ms a call (ruling 7''s bar: 5 ms)', v_fn, round(v_mn::numeric, 3);
      END IF;
    END;

    RAISE EXCEPTION 'f1-7a-part-8-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-7a-part-8-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119170700') ON CONFLICT DO NOTHING;
