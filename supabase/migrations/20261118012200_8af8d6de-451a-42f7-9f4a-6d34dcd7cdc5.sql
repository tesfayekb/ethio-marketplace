-- e2e-areas: admin-listings

-- Foundations 1, turn F1-6a, part 2 of 9 — THE EDIT CORE'S SQL CALLER: THE UNDO ONTO DOOR_CONTEXT AND THE SHELL
-- (DEC-333; brief docs/governance/briefs/f1-doors-6a.md, census docs/governance/reports/f1-doors-6a.census.md).
-- admin_undo_listing_edit is redeclared WHOLE from its last declaration (live md5 checked): ONE
-- door_context('staff', listings:enforce, staff_moderation, global) gate — caller, deactivation, the permission, the
-- second factor, then the dial it never spent before (INC-1038) — its refusals by door_refuse codes, the shell. It
-- calls admin_edit_listing_core (part 1: codes) as before, so one undo spends staff_moderation once. Folds: 'not
-- signed in' → notSignedIn; 'permission denied' → permissionDenied; 'account is deactivated' → accountDeactivated;
-- 'listing not found' → listingNotFound; 'nothing to undo' → nothingToUndo; 'the listing has changed since this
-- edit' → listingChanged; 'a photo removal is not undone' → photoRemovalFinal. Step-up (P0009) is unchanged.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261118070000') THEN
    RAISE EXCEPTION 'F1-6a part 2: part 1 (mark 20261118070000) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL THEN
    RAISE EXCEPTION 'F1-6a part 2: a door mechanism function is missing';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_undo_listing_edit(uuid,timestamp with time zone,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'ca70dc4662e277b6040246a4c2428eae' THEN
    RAISE EXCEPTION 'F1-6a part 2: the live admin_undo_listing_edit is not its last declaration''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. admin_undo_listing_edit (whole from 20261028235443 :1280; the gate on door_context, the codes and the shell)
CREATE OR REPLACE FUNCTION public.admin_undo_listing_edit(
  p_listing_id uuid, p_at timestamptz, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_row     public.listings%ROWTYPE;
  v_rev     public.listing_revisions%ROWTYPE;
  v_now     jsonb;
  v_key     text;
  v_changes jsonb := '{}'::jsonb;
  v_out     jsonb;
BEGIN
  PERFORM public.door_context('staff', 'listings', 'enforce', 'staff_moderation', NULL, 'global');

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  -- A draft is the seller's private work: it is not found here (D136).
  IF NOT FOUND OR v_row.status = 'draft' THEN
    PERFORM public.door_refuse('listingNotFound');
  END IF;

  -- The listing's newest revision, in the order its History shows them.
  SELECT * INTO v_rev FROM public.listing_revisions r
   WHERE r.listing_id = p_listing_id
   ORDER BY r.created_at DESC, r.id DESC
   LIMIT 1;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('nothingToUndo');
  END IF;
  IF p_at IS NULL OR v_rev.created_at <> p_at THEN
    PERFORM public.door_refuse('listingChanged');
  END IF;
  IF v_rev.kind <> 'edit' OR v_rev.actor IS NULL OR v_rev.actor = v_rev.seller_id
     OR jsonb_typeof(v_rev.before) IS DISTINCT FROM 'object' OR jsonb_typeof(v_rev.after) IS DISTINCT FROM 'object'
     -- An undo is not undone again: the admin edits the listing instead.
     OR EXISTS (SELECT 1 FROM public.seller_notices sn
                 WHERE sn.listing_id = p_listing_id AND sn.created_at = v_rev.created_at AND sn.reason = 'undo') THEN
    PERFORM public.door_refuse('nothingToUndo');
  END IF;
  IF v_rev.after ? 'photos_removed' THEN
    PERFORM public.door_refuse('photoRemovalFinal');
  END IF;

  -- Every value the edit wrote must still be the listing's.
  v_now := to_jsonb(v_row);
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_rev.after) k LOOP
    IF (v_now->v_key) IS DISTINCT FROM (v_rev.after->v_key) THEN
      PERFORM public.door_refuse('listingChanged');
    END IF;
  END LOOP;

  -- The edit's before-values for what an admin can change; the price's unit follows from them.
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_rev.before) k LOOP
    IF v_key IN ('title','description','category_id','attributes','price_mode','price_amount',
                 'price_currency','price_period','price_bp','price_negotiable') THEN
      v_changes := v_changes || jsonb_build_object(v_key, v_rev.before->v_key);
    END IF;
  END LOOP;
  IF v_changes = '{}'::jsonb THEN
    PERFORM public.door_refuse('nothingToUndo');
  END IF;

  -- The same door as any admin edit: the same rules, one revision, one audit row and one seller notice.
  PERFORM set_config('app.listing_undo', 'on', true);
  v_out := public.admin_edit_listing_core(p_listing_id, v_changes, 'undo', p_note);
  PERFORM set_config('app.listing_undo', 'off', true);
  RETURN v_out;
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_undo_listing_edit', 'staff_moderation', SQLERRM);
END $$;
REVOKE ALL ON FUNCTION public.admin_undo_listing_edit(uuid, timestamptz, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_listing_edit(uuid, timestamptz, text) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role, never
--     anon or PUBLIC; the body this file's (md5).
-- (b) the gates: no caller notSignedIn (401); a person without listings:enforce permissionDenied (403); a deactivated
--     holder accountDeactivated (403); a holder with no verified factor 'step-up required: no verified factor' (P0009).
-- (c) each code with every earlier check cleared, its exact message and a 400, nothing written.
-- (d) the enforcer's edit (through the core), then its undo: {ok:true}, the title back, one undo notice.
-- (e) staff_moderation counted once per call past the gate (the refusals re-counted by the shell); none for a caller
--     the gate refused; every refusal metered.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_r0      text;
  v_a       uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_nf      uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_cs      text;
  v_role    uuid;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_l1      uuid := gen_random_uuid();
  v_l2      uuid := gen_random_uuid();
  v_l3      uuid := gen_random_uuid();
  v_title   text;
  v_at      timestamptz;
  v_answer  jsonb;
  v_refused bigint;
  v_count   integer;
  v_msg     text;
  v_fn      regprocedure := 'public.admin_undo_listing_edit(uuid,timestamp with time zone,text)'::regprocedure;
BEGIN
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
        FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'F1-6a part 2 proof (a): admin_undo_listing_edit''s header, return type or grants differ';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn)
     IS DISTINCT FROM '18889bb0edaf177e4a0e8acce2459eb9' THEN
    RAISE EXCEPTION 'F1-6a part 2 proof (a): admin_undo_listing_edit''s body differs from this file';
  END IF;

  v_tag := 'e2e-mig-f16a2-' || translate(substr(v_hex, 1, 10), '0123456789', 'ghijkmnopr');
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  v_cs := json_build_object('sub', v_s::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-6a part 2 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-6a part 2 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_s, v_tag || '-s@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_nf, v_tag || '-n@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-p@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_s, v_nf, v_plain, v_deact]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    -- The scratch callers' own ceiling: no verdict below rests on the live dial's value (rule 30 scan, point 4).
    INSERT INTO public.rate_overrides (user_id, action, max_count)
    SELECT u, 'staff_moderation', 1000 FROM unnest(ARRAY[v_s, v_nf, v_plain, v_deact]) u;
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-enforce', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'enforce';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 1 THEN
      RAISE EXCEPTION 'F1-6a part 2 proof: listings:enforce is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_s, v_role, 'global'), (v_nf, v_role, 'global'), (v_deact, v_role, 'global');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_s, v_tag || '-f', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_s, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status, published_at, published_first_at, expires_at)
    SELECT l, v_a, v_cat, v_city, v_tag || ' scratch ad', 'A scratch ad for the undo proof.', v_code, 'free', 'active',
           now(), now(), now() + interval '10 days'
      FROM unnest(ARRAY[v_l1, v_l2, v_l3]) l;
    -- v_l3's newest revision removed a photo (a staff edit's shape).
    INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (v_l3, v_a, 'edit', '{"title": "e2e"}'::jsonb, '{"photos_removed": []}'::jsonb, v_s);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals
     WHERE day = current_date AND door = 'admin_undo_listing_edit';

    -- (b) the gates.
    v_answer := public.admin_undo_listing_edit(v_l1, now(), NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('notSignedIn', '401') THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (b): no caller''s undo answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_undo_listing_edit(v_l1, now(), NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('permissionDenied', '403') THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (b): an undo without listings:enforce answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_undo_listing_edit(v_l1, now(), NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('accountDeactivated', '403') THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (b): a deactivated holder''s undo answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_nf::text, 'role', 'authenticated')::text, true);
    BEGIN
      v_answer := public.admin_undo_listing_edit(v_l1, now(), NULL);
      v_msg := 'answered ' || coalesce(v_answer::text, 'NULL');
    EXCEPTION WHEN SQLSTATE 'P0009' THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    END;
    IF v_msg IS DISTINCT FROM 'step-up required: no verified factor' THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (b): a holder without a factor got %', v_msg;
    END IF;

    -- (c) the codes: the enforcer passes the gate; each argument clears every earlier check.
    PERFORM set_config('request.jwt.claims', v_cs, true);
    v_answer := public.admin_undo_listing_edit(gen_random_uuid(), now(), NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('listingNotFound', '400') THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (c): an undo of no ad answered %', v_answer;
    END IF;
    v_answer := public.admin_undo_listing_edit(v_l2, now(), NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('nothingToUndo', '400') THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (c): an undo of an unedited ad answered %', v_answer;
    END IF;
    SELECT r.created_at INTO v_at FROM public.listing_revisions r WHERE r.listing_id = v_l3;
    v_answer := public.admin_undo_listing_edit(v_l3, v_at, NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('photoRemovalFinal', '400') THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (c): an undo of a photo removal answered %', v_answer;
    END IF;
    SELECT l.title INTO v_title FROM public.listings l WHERE l.id = v_l1;
    v_answer := public.admin_edit_listing_core(v_l1, jsonb_build_object('title', v_tag || ' edited ad'), 'rules', NULL);
    IF NOT coalesce(v_answer ->> 'ok' = 'true', false) THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (c): the enforcer''s edit answered %', v_answer;
    END IF;
    SELECT r.created_at INTO v_at FROM public.listing_revisions r WHERE r.listing_id = v_l1;
    v_answer := public.admin_undo_listing_edit(v_l1, v_at - interval '1 second', NULL);
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('listingChanged', '400') THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (c): an undo of an older edit answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT title = v_tag || ' edited ad' FROM public.listings WHERE id = v_l1), false)
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_l1, v_l2, v_l3)) <> 2
       OR EXISTS (SELECT 1 FROM public.seller_notices WHERE listing_id IN (v_l2, v_l3)) THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (c): a refused undo wrote a row';
    END IF;

    -- (d) the undo of the enforcer's edit.
    v_answer := public.admin_undo_listing_edit(v_l1, v_at, NULL);
    IF NOT coalesce(v_answer ->> 'ok' = 'true', false) THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (d): the undo answered %', v_answer;
    END IF;
    IF NOT coalesce((SELECT title = v_title FROM public.listings WHERE id = v_l1), false)
       OR (SELECT count(*) FROM public.seller_notices WHERE listing_id = v_l1 AND reason = 'undo') <> 1 THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (d): the undo did not put the title back once';
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- (e) the tallies: the enforcer's 5 undo calls past the gate (4 refusals, 1 undo; the core's edit spends nothing).
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_s::text AND action = 'staff_moderation';
    IF v_count <> 5 THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (e): staff_moderation counted % for the enforcer (expected 5)', v_count;
    END IF;
    IF EXISTS (SELECT 1 FROM public.rate_limits WHERE key IN (v_nf::text, v_plain::text, v_deact::text, v_a::text))
       OR EXISTS (SELECT 1 FROM public.rate_limits WHERE key = v_s::text AND action <> 'staff_moderation') THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (e): a refused caller or another dial was counted';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'admin_undo_listing_edit')
         IS DISTINCT FROM v_refused + 7 THEN
      RAISE EXCEPTION 'F1-6a part 2 proof (e): door_refusals did not meter the 7 refusals';
    END IF;

    RAISE EXCEPTION 'f1-6a-part-2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6a-part-2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261118070100') ON CONFLICT DO NOTHING;
