-- e2e-areas: admin-listings, my-listings, ad-page, feed
-- P-2 (a) M-1b, part 4 of 5 — the staff door takes days (plan §3; ruling 1 Q2).
-- public.admin_set_listing_tier — a NEW argument list (p_days integer DEFAULT NULL): DROP + CREATE,
-- whole from 20261102045918 (T1 M1; G39), its proof reverting this file's fragments and asserting the
-- live body's md5. Changes: the level is a listing_packages row (kind level, enabled) instead of the
-- literal three; badDays (days under 1, over 3650, or days on the baseline level); tier_until =
-- now() + days (NULL keeps D276's open-ended staff mark), tier_source 'staff' — the baseline level
-- clears both; a level with extends_lifetime pushes the ad's clock to the end date (expires_at on a
-- live ad, kept_remaining on a paused one); the revision and the audit row carry until and source;
-- the answer too. Every refusal unchanged in its words.

DO $pre$
BEGIN
  IF to_regprocedure('public.market_settings_for(character)') IS NULL
     OR to_regprocedure('public.seller_regular_live(uuid,character)') IS NULL
     OR to_regprocedure('public.resume_listing(uuid)') IS NULL THEN
    RAISE EXCEPTION 'P-2 M-1b part 4: parts 1 to 3 (8816b4c0, 12091168, 307e79c4) must be applied first';
  END IF;
  IF to_regprocedure('public.admin_set_listing_tier(uuid,text,text,text)') IS NULL THEN
    RAISE EXCEPTION 'P-2 M-1b part 4: the live admin_set_listing_tier(uuid,text,text,text) is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE STAFF DOOR
DROP FUNCTION public.admin_set_listing_tier(uuid, text, text, text);
CREATE FUNCTION public.admin_set_listing_tier(p_listing_id uuid, p_tier text, p_reason text, p_note text DEFAULT NULL::text, p_days integer DEFAULT NULL::integer)
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
  v_level  public.listing_packages%ROWTYPE;
  v_until  timestamptz;
  v_source text;
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

  SELECT * INTO v_level FROM public.listing_packages WHERE key = p_tier AND kind = 'level' AND enabled FOR SHARE;
  IF NOT FOUND THEN
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
  IF p_days IS NOT NULL AND (p_days < 1 OR p_days > 3650 OR v_level.is_baseline) THEN
    RAISE EXCEPTION 'badDays';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');

  v_source := CASE WHEN v_level.is_baseline THEN NULL ELSE 'staff' END;
  v_until  := CASE WHEN v_level.is_baseline OR p_days IS NULL THEN NULL ELSE now() + make_interval(days => p_days) END;
  UPDATE public.listings SET
    tier = p_tier,
    tier_until = v_until,
    tier_source = v_source,
    expires_at = CASE WHEN v_level.extends_lifetime AND v_until IS NOT NULL AND status <> 'paused'
                       AND expires_at IS NOT NULL AND expires_at < v_until THEN v_until ELSE expires_at END,
    kept_remaining = CASE WHEN v_level.extends_lifetime AND v_until IS NOT NULL AND status = 'paused'
                           AND kept_remaining IS NOT NULL AND kept_remaining < v_until - now() THEN v_until - now() ELSE kept_remaining END
  WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'edit',
            jsonb_build_object('tier', v_row.tier, 'tier_until', v_row.tier_until, 'tier_source', v_row.tier_source),
            jsonb_build_object('tier', p_tier, 'tier_until', v_until, 'tier_source', v_source), v_uid);
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.admin_tier', 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('from', v_row.tier, 'to', p_tier, 'reason', p_reason, 'note', v_note, 'until', v_until, 'source', v_source)));

  RETURN jsonb_build_object('ok', true, 'from', v_row.tier, 'to', p_tier, 'until', v_until, 'source', v_source);
END $function$;
COMMENT ON FUNCTION public.admin_set_listing_tier(uuid, text, text, text, integer) IS
  'Staff set an ad''s level (T1 M1, D242, D276; P-2 M-1b adds days): listings:enforce with a fresh second factor; a level row; days set tier_until (NULL = open-ended), source staff; the baseline clears both; a revision and an audit row.';
REVOKE ALL ON FUNCTION public.admin_set_listing_tier(uuid, text, text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_listing_tier(uuid, text, text, text, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants; the old signature is gone.
-- (b) the body, its seven fragments reverted (each found once), is byte for byte T1 M1's live body
--     (md5 8df90fb1fca33f2a16cad265ee8f80e1).
-- (c) the staff door on scratch rows (as T1 M1: a scratch super admin on an aal2 session): featured for
--     30 days — tier, until, source staff, the clock pushed to the end date (featured extends the
--     lifetime), the revision and the audit row with until and source, the feed rank; the baseline with
--     days → badDays; 0 and 3651 days → badDays; the baseline with no days → until and source cleared;
--     premium with no days → open-ended (until NULL, source staff); after every refusal nothing written.
DO $proof$
DECLARE
  v_fn      regprocedure := 'public.admin_set_listing_tier(uuid,text,text,text,integer)'::regprocedure;
  v_src     text;
  v_len     integer;
  v_frag    text;
  v_admin   uuid := gen_random_uuid();
  v_seller  uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p2-m1b4-' || substr(gen_random_uuid()::text, 1, 8);
  v_code    char(2) := 'XZ';
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_live    uuid;
  v_row     public.listings%ROWTYPE;
  v_answer  jsonb;
  v_msg     text;
  v_case    text;
  v_snap    text;
  v_snap2   text;
  v_fx      boolean := (SELECT extends_lifetime FROM public.listing_packages WHERE key = 'featured' AND kind = 'level');
  v_base    text;
  v_rank    smallint;
BEGIN
  -- DEC-341: a STABLE reader that raises is read into a variable, never named beside a column in a WHERE.
  v_base := public.baseline_level_key();
  -- (a)
  IF to_regprocedure('public.admin_set_listing_tier(uuid,text,text,text)') IS NOT NULL THEN
    RAISE EXCEPTION 'P-2 M-1b part 4 proof (a): the old staff signature is still there';
  END IF;
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-2 M-1b part 4 proof (a): the header or the grants differ';
  END IF;
  IF v_fx IS NULL THEN RAISE EXCEPTION 'P-2 M-1b part 4 proof: no featured level row'; END IF;

  -- (b) the staff door: seven fragments, each once, reverted to T1 M1's body.
  SELECT replace(p.prosrc, chr(13), '') INTO v_src FROM pg_proc p WHERE p.oid = v_fn;
  FOREACH v_frag IN ARRAY ARRAY[
    '  v_level  public.listing_packages%ROWTYPE;
  v_until  timestamptz;
  v_source text;
',
    '  SELECT * INTO v_level FROM public.listing_packages WHERE key = p_tier AND kind = ''level'' AND enabled FOR SHARE;
  IF NOT FOUND THEN',
    '  IF p_days IS NOT NULL AND (p_days < 1 OR p_days > 3650 OR v_level.is_baseline) THEN
    RAISE EXCEPTION ''badDays'';
  END IF;
',
    '  v_source := CASE WHEN v_level.is_baseline THEN NULL ELSE ''staff'' END;
  v_until  := CASE WHEN v_level.is_baseline OR p_days IS NULL THEN NULL ELSE now() + make_interval(days => p_days) END;
  UPDATE public.listings SET
    tier = p_tier,
    tier_until = v_until,
    tier_source = v_source,
    expires_at = CASE WHEN v_level.extends_lifetime AND v_until IS NOT NULL AND status <> ''paused''
                       AND expires_at IS NOT NULL AND expires_at < v_until THEN v_until ELSE expires_at END,
    kept_remaining = CASE WHEN v_level.extends_lifetime AND v_until IS NOT NULL AND status = ''paused''
                           AND kept_remaining IS NOT NULL AND kept_remaining < v_until - now() THEN v_until - now() ELSE kept_remaining END
  WHERE id = p_listing_id;',
    'jsonb_build_object(''tier'', v_row.tier, ''tier_until'', v_row.tier_until, ''tier_source'', v_row.tier_source),
            jsonb_build_object(''tier'', p_tier, ''tier_until'', v_until, ''tier_source'', v_source), v_uid);',
    '''note'', v_note, ''until'', v_until, ''source'', v_source)));',
    '''to'', p_tier, ''until'', v_until, ''source'', v_source);'] LOOP
    v_len := (length(v_src) - length(replace(v_src, v_frag, ''))) / length(v_frag);
    IF v_len <> 1 THEN
      RAISE EXCEPTION 'P-2 M-1b part 4 proof (b): a staff-door fragment occurs % times: %', v_len, left(v_frag, 60);
    END IF;
  END LOOP;
  v_src := replace(v_src, '  v_level  public.listing_packages%ROWTYPE;
  v_until  timestamptz;
  v_source text;
', '');
  v_src := replace(v_src, '  SELECT * INTO v_level FROM public.listing_packages WHERE key = p_tier AND kind = ''level'' AND enabled FOR SHARE;
  IF NOT FOUND THEN', '  IF p_tier IS NULL OR p_tier NOT IN (''premium'',''featured'',''regular'') THEN');
  v_src := replace(v_src, '  IF p_days IS NOT NULL AND (p_days < 1 OR p_days > 3650 OR v_level.is_baseline) THEN
    RAISE EXCEPTION ''badDays'';
  END IF;
', '');
  v_src := replace(v_src, '  v_source := CASE WHEN v_level.is_baseline THEN NULL ELSE ''staff'' END;
  v_until  := CASE WHEN v_level.is_baseline OR p_days IS NULL THEN NULL ELSE now() + make_interval(days => p_days) END;
  UPDATE public.listings SET
    tier = p_tier,
    tier_until = v_until,
    tier_source = v_source,
    expires_at = CASE WHEN v_level.extends_lifetime AND v_until IS NOT NULL AND status <> ''paused''
                       AND expires_at IS NOT NULL AND expires_at < v_until THEN v_until ELSE expires_at END,
    kept_remaining = CASE WHEN v_level.extends_lifetime AND v_until IS NOT NULL AND status = ''paused''
                           AND kept_remaining IS NOT NULL AND kept_remaining < v_until - now() THEN v_until - now() ELSE kept_remaining END
  WHERE id = p_listing_id;', '  UPDATE public.listings SET tier = p_tier WHERE id = p_listing_id;');
  v_src := replace(v_src, 'jsonb_build_object(''tier'', v_row.tier, ''tier_until'', v_row.tier_until, ''tier_source'', v_row.tier_source),
            jsonb_build_object(''tier'', p_tier, ''tier_until'', v_until, ''tier_source'', v_source), v_uid);',
                          'jsonb_build_object(''tier'', v_row.tier), jsonb_build_object(''tier'', p_tier), v_uid);');
  v_src := replace(v_src, '''note'', v_note, ''until'', v_until, ''source'', v_source)));', '''note'', v_note)));');
  v_src := replace(v_src, '''to'', p_tier, ''until'', v_until, ''source'', v_source);', '''to'', p_tier);');
  IF md5(v_src) IS DISTINCT FROM '8df90fb1fca33f2a16cad265ee8f80e1' THEN
    RAISE EXCEPTION 'P-2 M-1b part 4 proof (b): admin_set_listing_tier differs from its live body beyond this file''s changes (%)', md5(v_src);
  END IF;
  -- (c) the staff door on scratch rows.
  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1b part 4 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1b4', true);
    SELECT a.id INTO v_anc FROM public.locations a
     WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = 'e2e-mig-p2-m1b4';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'P-2 M-1b part 4 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = 'e2e-mig-p2-m1b4';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, 'E2E P2 M1b4 Region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, 'E2E P2 M1b4 City', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_admin,  v_tag || '-admin@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_admin, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_admin, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_admin, v_tag, 'totp', 'verified', now(), now(), encode(gen_random_bytes(16), 'hex'));
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_admin, 'staff_moderation', 10);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1b4 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listings (seller_id, category_id, location_id, title, description, home_country_code,
                                 status, published_at, published_first_at, expires_at)
    VALUES (v_seller, v_cat, v_city, 'E2E P2 M1b4 live', 'scratch', v_code, 'active', now(), now(), now() + interval '10 days')
    RETURNING id INTO v_live;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    -- featured for 30 days.
    v_answer := public.admin_set_listing_tier(v_live, 'featured', 'promotion', NULL, 30);
    SELECT * INTO v_row FROM public.listings WHERE id = v_live;
    SELECT feed_rank INTO STRICT v_rank FROM public.level_ranks WHERE key = 'featured';
    IF (v_answer->>'ok')::boolean IS NOT TRUE OR v_answer->>'from' <> public.baseline_level_key() OR v_answer->>'to' <> 'featured'
       OR v_answer->>'source' <> 'staff' OR (v_answer->>'until')::timestamptz IS DISTINCT FROM v_row.tier_until
       OR v_row.tier <> 'featured' OR v_row.tier_source <> 'staff'
       OR v_row.tier_until IS NULL OR v_row.tier_until > now() + interval '30 days' OR v_row.tier_until < now() + interval '29 days 23 hours'
       OR (v_fx AND v_row.expires_at IS DISTINCT FROM v_row.tier_until)
       OR (NOT v_fx AND (v_row.expires_at > now() + interval '10 days' OR v_row.expires_at < now() + interval '9 days 23 hours'))
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_live) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions
                       WHERE listing_id = v_live AND kind = 'edit' AND actor = v_admin AND seller_id = v_seller
                         AND before->>'tier' = v_base AND before->>'tier_until' IS NULL AND before->>'tier_source' IS NULL
                         AND after->>'tier' = 'featured' AND after->>'tier_source' = 'staff'
                         AND (after->>'tier_until')::timestamptz = v_row.tier_until)
       OR (SELECT count(*) FROM public.audit_log WHERE entity_id = v_live::text) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE entity_id = v_live::text AND actor_id = v_admin AND action = 'listing.admin_tier' AND entity_type = 'listing'
                         AND meta->>'from' = v_base AND meta->>'to' = 'featured' AND meta->>'reason' = 'promotion'
                         AND meta->>'source' = 'staff' AND (meta->>'until')::timestamptz = v_row.tier_until AND NOT (meta ? 'note'))
       OR NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_live AND tier_rank = v_rank) THEN
      RAISE EXCEPTION 'P-2 M-1b part 4 proof (c): featured for 30 days differs (% / until % expires %)', v_answer, v_row.tier_until, v_row.expires_at;
    END IF;

    -- the refusals: nothing written.
    FOR v_case IN VALUES ('days on the baseline'), ('zero days'), ('too many days'), ('unknown tier'), ('same tier') LOOP
      SELECT concat_ws('|',
               (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_live),
               (SELECT count(*) FROM public.audit_log WHERE entity_id = v_live::text),
               (SELECT tier || ':' || coalesce(tier_until::text, '-') || ':' || coalesce(tier_source, '-') || ':' || coalesce(expires_at::text, '-')
                  FROM public.listings WHERE id = v_live))
        INTO v_snap;
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'days on the baseline' THEN PERFORM public.admin_set_listing_tier(v_live, public.baseline_level_key(), 'promotion_ended', NULL, 7);
          WHEN 'zero days'            THEN PERFORM public.admin_set_listing_tier(v_live, 'premium', 'promotion', NULL, 0);
          WHEN 'too many days'        THEN PERFORM public.admin_set_listing_tier(v_live, 'premium', 'promotion', NULL, 3651);
          WHEN 'unknown tier'         THEN PERFORM public.admin_set_listing_tier(v_live, 'e2e_mig_no_such_level', 'promotion', NULL, 7);
          WHEN 'same tier'            THEN PERFORM public.admin_set_listing_tier(v_live, 'featured', 'promotion', NULL, 60);
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM (CASE v_case WHEN 'unknown tier' THEN 'unknown tier' WHEN 'same tier' THEN 'nothing changed' ELSE 'badDays' END) THEN
        RAISE EXCEPTION 'P-2 M-1b part 4 proof (c): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
      SELECT concat_ws('|',
               (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_live),
               (SELECT count(*) FROM public.audit_log WHERE entity_id = v_live::text),
               (SELECT tier || ':' || coalesce(tier_until::text, '-') || ':' || coalesce(tier_source, '-') || ':' || coalesce(expires_at::text, '-')
                  FROM public.listings WHERE id = v_live))
        INTO v_snap2;
      IF v_snap2 IS DISTINCT FROM v_snap THEN
        RAISE EXCEPTION 'P-2 M-1b part 4 proof (c): the refusal % left a trace (% -> %)', v_case, v_snap, v_snap2;
      END IF;
    END LOOP;

    -- back to the baseline: until and source cleared, the clock as it was pushed.
    v_answer := public.admin_set_listing_tier(v_live, public.baseline_level_key(), 'promotion_ended');
    SELECT * INTO v_row FROM public.listings WHERE id = v_live;
    SELECT feed_rank INTO STRICT v_rank FROM public.level_ranks WHERE key = v_base;
    IF v_answer->>'to' <> public.baseline_level_key() OR v_answer->'until' IS DISTINCT FROM 'null'::jsonb
       OR v_row.tier <> public.baseline_level_key() OR v_row.tier_until IS NOT NULL OR v_row.tier_source IS NOT NULL
       OR NOT EXISTS (SELECT 1 FROM public.listing_revisions
                       WHERE listing_id = v_live AND kind = 'edit' AND before->>'tier' = 'featured' AND before->>'tier_source' = 'staff'
                         AND after->>'tier' = v_base AND after->>'tier_until' IS NULL AND after->>'tier_source' IS NULL)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE entity_id = v_live::text AND meta->>'to' = v_base AND meta->>'reason' = 'promotion_ended'
                         AND NOT (meta ? 'until') AND NOT (meta ? 'source'))
       OR NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_live AND tier_rank = v_rank) THEN
      RAISE EXCEPTION 'P-2 M-1b part 4 proof (c): the baseline did not clear until and source (% / % %)', v_answer, v_row.tier_until, v_row.tier_source;
    END IF;

    -- premium with no days: open-ended.
    v_answer := public.admin_set_listing_tier(v_live, 'premium', 'promotion');
    SELECT * INTO v_row FROM public.listings WHERE id = v_live;
    SELECT feed_rank INTO STRICT v_rank FROM public.level_ranks WHERE key = 'premium';
    IF v_answer->>'to' <> 'premium' OR v_answer->>'source' <> 'staff' OR v_answer->'until' IS DISTINCT FROM 'null'::jsonb
       OR v_row.tier <> 'premium' OR v_row.tier_until IS NOT NULL OR v_row.tier_source <> 'staff'
       OR (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_live) <> 3
       OR (SELECT count(*) FROM public.audit_log WHERE entity_id = v_live::text) <> 3
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE entity_id = v_live::text AND meta->>'to' = 'premium' AND meta->>'source' = 'staff' AND NOT (meta ? 'until'))
       OR NOT EXISTS (SELECT 1 FROM public.feed_index WHERE listing_id = v_live AND tier_rank = v_rank) THEN
      RAISE EXCEPTION 'P-2 M-1b part 4 proof (c): the open-ended staff mark differs (% / until % source %)', v_answer, v_row.tier_until, v_row.tier_source;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p2-m1b4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1b4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

-- ------------------------------------------------------------ 3. CLOSERS
REVOKE ALL ON FUNCTION public.admin_set_listing_tier(uuid, text, text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_listing_tier(uuid, text, text, text, integer) TO authenticated, service_role;

INSERT INTO public.migration_marks (version) VALUES ('20261104212000') ON CONFLICT DO NOTHING;
