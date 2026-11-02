-- e2e-areas: admin-listings, my-listings, ad-page, feed
-- Turn T1 part B, M1 (D242, D276; ruling 1, answers 3, 4 and 5) — staff set an ad's tier.
-- public.admin_set_listing_tier(p_listing_id, p_tier, p_reason, p_note): the first writer of
-- listings.tier. The shape of the staff listing doors (admin_move_listing, INC-951 3b): signed in,
-- listings:enforce, not deactivated, then the staff_moderation dial; then the door's own rules —
-- a tier among premium, featured and regular; a listing that is neither absent nor a draft; never
-- the caller's own; never a removed one (its tier is cleared with it, M2); a change; a reason
-- among promotion, promotion_ended and other, a note for other, 500 characters at most (the move
-- door's note rules); then the second factor (require_step_up_if_needed, as the move door asks it
-- after its rules); then the write: the tier, one listing_revisions row (kind edit, tier old →
-- new, the actor) and one audit_log row (listing.admin_tier, from, to, reason, note). No seller
-- notice (ruling 1, answer 5). A refusal raises, so nothing it reached is kept (INC-844: the dial's
-- count rolls back with it). The feed index follows the tier through feed_index_on_listing_update.
CREATE FUNCTION public.admin_set_listing_tier(p_listing_id uuid, p_tier text, p_reason text, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_row  public.listings%ROWTYPE;
  v_note text := nullif(btrim(coalesce(p_note, '')), '');
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('staff_moderation')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  IF p_tier IS NULL OR p_tier NOT IN ('premium','featured','regular') THEN
    RAISE EXCEPTION 'unknown tier';
  END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_row.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  IF v_row.seller_id = v_uid THEN
    RAISE EXCEPTION 'your own listing is changed the seller''s way';
  END IF;
  IF v_row.status = 'removed' THEN
    RAISE EXCEPTION 'a removed listing takes no tier';
  END IF;
  IF v_row.tier = p_tier THEN
    RAISE EXCEPTION 'nothing changed';
  END IF;
  IF p_reason IS NULL OR p_reason NOT IN ('promotion','promotion_ended','other') THEN
    RAISE EXCEPTION 'unknown reason';
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    RAISE EXCEPTION 'a note is required';
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RAISE EXCEPTION 'the note is too long';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');

  UPDATE public.listings SET tier = p_tier WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'edit',
            jsonb_build_object('tier', v_row.tier), jsonb_build_object('tier', p_tier), v_uid);
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.admin_tier', 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('from', v_row.tier, 'to', p_tier, 'reason', p_reason, 'note', v_note)));

  RETURN jsonb_build_object('ok', true, 'from', v_row.tier, 'to', p_tier);
END $function$;
REVOKE ALL ON FUNCTION public.admin_set_listing_tier(uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_listing_tier(uuid, text, text, text) TO authenticated, service_role;

-- PROOF (T1 M1): scratch rows only, rolled back by the sentinel.
--   (a) the header: VOLATILE, SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; listings:enforce asks a second factor.
--   (b) a super admin with a fresh second factor sets Premium: the tier, one revision (tier regular
--       → premium, the actor), one audit row (from, to, reason), the feed index at rank 2.
--   (c) a signed-in user without listings:enforce is refused 'permission denied'.
--   (d) a removed listing and a draft are refused.
--   (e) an unknown tier, the same tier, an unknown reason and other with no note are refused.
--   (f) the second factor: the same super admin on an aal1 session is refused (P0009).
--   (g) the dial: with the window full, the next call is refused 'rateLimited'.
--   After every refusal: no revision, no audit row and no tier beyond the successes'.
DO $proof$
DECLARE
  v_fn      regprocedure := 'public.admin_set_listing_tier(uuid,text,text,text)'::regprocedure;
  v_admin   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_seller  uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_tag     text := 'e2e-t1-m1-' || substr(gen_random_uuid()::text, 1, 8);
  v_country char(2);
  v_cat     uuid;
  v_live    uuid;
  v_gone    uuid;
  v_draft   uuid;
  v_answer  jsonb;
  v_msg     text;
  v_state   text;
  v_case    text;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
        FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'T1 M1 proof (a): the header or the grants differ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
                  WHERE r.name = 'listings' AND p.action = 'enforce' AND p.requires_step_up) THEN
    RAISE EXCEPTION 'T1 M1 proof (a): listings:enforce asks no second factor';
  END IF;

  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_admin, v_tag || '-admin@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_admin, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_admin, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_admin, v_tag, 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_admin, 'staff_moderation', 2);

    SELECT k.code INTO v_country FROM public.countries k ORDER BY k.code LIMIT 1;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E T1 M1 Leaf', v_tag, true, true, true, 9999)
    RETURNING id INTO v_cat;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, 'E2E T1 M1 live', 'scratch', v_country,
            'active', now(), now(), now() + interval '28 days')
    RETURNING id INTO v_live;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code, status)
    VALUES (v_seller, v_cat, 'E2E T1 M1 removed', 'scratch', v_country, 'removed')
    RETURNING id INTO v_gone;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_seller, v_cat, 'E2E T1 M1 draft', 'scratch', v_country)
    RETURNING id INTO v_draft;
    IF (SELECT tier FROM public.listings WHERE id = v_live) <> 'regular' THEN
      RAISE EXCEPTION 'T1 M1 proof: a new listing is not regular';
    END IF;

    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    -- (b)
    v_answer := public.admin_set_listing_tier(v_live, 'premium', 'promotion');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'from', 'regular', 'to', 'premium') THEN
      RAISE EXCEPTION 'T1 M1 proof (b): answered %', v_answer;
    END IF;
    IF (SELECT tier FROM public.listings WHERE id = v_live) <> 'premium'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_live) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions
                       WHERE listing_id = v_live AND kind = 'edit' AND actor = v_admin AND seller_id = v_seller
                         AND before = '{"tier": "regular"}'::jsonb AND after = '{"tier": "premium"}'::jsonb)
       OR (SELECT count(*) FROM public.audit_log WHERE entity_id = v_live::text) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE entity_id = v_live::text AND actor_id = v_admin AND action = 'listing.admin_tier'
                         AND entity_type = 'listing'
                         AND meta = '{"from": "regular", "to": "premium", "reason": "promotion"}'::jsonb)
       OR NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_live)
       OR EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_live AND tier_rank <> 2) THEN
      RAISE EXCEPTION 'T1 M1 proof (b): the tier, its revision, its audit row or the feed index differ';
    END IF;

    -- (c), (d), (e): each refused with its own words.
    FOR v_case IN VALUES ('plain'), ('removed'), ('draft'), ('unknown tier'), ('same tier'),
                         ('unknown reason'), ('no note') LOOP
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
      END IF;
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'plain' THEN PERFORM public.admin_set_listing_tier(v_live, 'featured', 'promotion');
          WHEN 'removed' THEN PERFORM public.admin_set_listing_tier(v_gone, 'featured', 'promotion');
          WHEN 'draft' THEN PERFORM public.admin_set_listing_tier(v_draft, 'featured', 'promotion');
          WHEN 'unknown tier' THEN PERFORM public.admin_set_listing_tier(v_live, 'gold', 'promotion');
          WHEN 'same tier' THEN PERFORM public.admin_set_listing_tier(v_live, 'premium', 'promotion');
          WHEN 'unknown reason' THEN PERFORM public.admin_set_listing_tier(v_live, 'featured', 'rules');
          WHEN 'no note' THEN PERFORM public.admin_set_listing_tier(v_live, 'featured', 'other', '  ');
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_case = 'plain' THEN
        PERFORM set_config('request.jwt.claims',
          json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                            'session_id', v_session::text,
                            'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
      END IF;
      IF v_msg IS DISTINCT FROM CASE v_case
           WHEN 'plain' THEN 'permission denied'
           WHEN 'removed' THEN 'a removed listing takes no tier'
           WHEN 'draft' THEN 'listing not found'
           WHEN 'unknown tier' THEN 'unknown tier'
           WHEN 'same tier' THEN 'nothing changed'
           WHEN 'unknown reason' THEN 'unknown reason'
           WHEN 'no note' THEN 'a note is required'
         END THEN
        RAISE EXCEPTION 'T1 M1 proof (c-e): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;

    -- (f) the same super admin on an aal1 session: the second factor is asked.
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal1',
                        'session_id', v_session::text)::text, true);
    v_state := NULL;
    BEGIN
      PERFORM public.admin_set_listing_tier(v_live, 'featured', 'promotion');
    EXCEPTION WHEN OTHERS THEN v_state := SQLSTATE; v_msg := SQLERRM;
    END;
    IF v_state IS DISTINCT FROM 'P0009' THEN
      RAISE EXCEPTION 'T1 M1 proof (f): answered % %', coalesce(v_state, 'success'), v_msg;
    END IF;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    IF (SELECT tier FROM public.listings WHERE id = v_live) <> 'premium'
       OR (SELECT tier FROM public.listings WHERE id = v_gone) <> 'regular'
       OR (SELECT tier FROM public.listings WHERE id = v_draft) <> 'regular'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id IN (v_live, v_gone, v_draft)) <> 1
       OR (SELECT count(*) FROM public.audit_log
            WHERE entity_id IN (v_live::text, v_gone::text, v_draft::text)) <> 1 THEN
      RAISE EXCEPTION 'T1 M1 proof (c-f): a refused call wrote';
    END IF;

    -- (g) the second success fills the window (2 of 2); the next call is refused and writes nothing.
    v_answer := public.admin_set_listing_tier(v_live, 'regular', 'promotion_ended');
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'from', 'premium', 'to', 'regular') THEN
      RAISE EXCEPTION 'T1 M1 proof (g): the second success answered %', v_answer;
    END IF;
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_set_listing_tier(v_live, 'featured', 'promotion');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'rateLimited' THEN
      RAISE EXCEPTION 'T1 M1 proof (g): the third call answered %', coalesce(v_msg, 'success');
    END IF;
    IF (SELECT tier FROM public.listings WHERE id = v_live) <> 'regular'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_live) <> 2
       OR (SELECT count(*) FROM public.audit_log WHERE entity_id = v_live::text) <> 2
       OR EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_live AND tier_rank <> 0) THEN
      RAISE EXCEPTION 'T1 M1 proof (g): the refused call wrote, or the second success did not';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 't1-m1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 't1-m1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261102200000') ON CONFLICT DO NOTHING;
