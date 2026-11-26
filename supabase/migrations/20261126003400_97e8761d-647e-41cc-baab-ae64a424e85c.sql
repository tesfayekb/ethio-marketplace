-- e2e-areas: admin-listings, admin-screening

-- Cursor bundle 7b, part 1 — THE REVIEW DOOR ASKS A REASON ON A REJECTION (DEC-469; brief
-- docs/governance/briefs/cursor-bundle-7b.md, ruling docs/governance/briefs/cursor-bundle-7b-ruling-1.md decision 4).
-- admin_review_listing(uuid, text) is dropped and declared again WHOLE, from its last declaration
-- (20261118013000 part 10, live md5 checked), as admin_review_listing(uuid, text, text DEFAULT NULL, text DEFAULT NULL):
-- the argument list changes, so it is DROP + CREATE with the REVOKE and GRANTs restated. A rejection behaves exactly
-- as All listings' remove: the reason is one of the remove list (prohibited, misleading, duplicate, contact_in_text,
-- photo, rules, other), the note is required only for 'other' (noteRequired) and holds at most 500 characters
-- (noteTooLong); one audit_log row 'listing.rejected' with {from, to, reason, note} and one seller_notices row carry
-- the reason, both written after the state machine moved the ad (a refused call writes neither). Approve (active,
-- reduced) and Hold ask nothing: a reason or a note given with them is badValue. Nothing else in the body changes: the
-- scope read, door_context, the status list, transition_listing_core and the refusal shell are part 10's.
-- seller_notices_kind_check gains 'admin_reject': neither transition_listing_core nor a trigger tells the seller of a
-- rejection, and admin_remove would read as a removal in my_listing (its removed reason reads that kind).

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261125170400') THEN
    RAISE EXCEPTION 'cursor-bundle-7b part 1: the ledger''s newest mark 20261125170400 must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.admin_review_listing(uuid,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '803f3638b72b982befe4c58181d523d3' THEN
    RAISE EXCEPTION 'cursor-bundle-7b part 1: the live admin_review_listing is not part 10''s body (%)', v_md5;
  END IF;
  IF to_regprocedure('public.admin_review_listing(uuid,text,text,text)') IS NOT NULL THEN
    RAISE EXCEPTION 'cursor-bundle-7b part 1: admin_review_listing(uuid,text,text,text) already exists';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.seller_notices'::regclass
                    AND conname = 'seller_notices_kind_check') THEN
    RAISE EXCEPTION 'cursor-bundle-7b part 1: seller_notices_kind_check is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. seller_notices takes the rejection's kind
ALTER TABLE public.seller_notices DROP CONSTRAINT seller_notices_kind_check;
ALTER TABLE public.seller_notices ADD CONSTRAINT seller_notices_kind_check
  CHECK (kind IN ('admin_edit','admin_remove','admin_restore','admin_send_back','admin_reject','level_ending','level_paused'));

-- ------------------------------------------------------------ 2. admin_review_listing (whole from 20261118013000 :239; DEC-469)
DROP FUNCTION public.admin_review_listing(uuid, text);
CREATE FUNCTION public.admin_review_listing(p_listing_id uuid, p_new_status text, p_reason text DEFAULT NULL::text, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_scope  character(2);
  v_uid    uuid := auth.uid();
  v_note   text := nullif(btrim(coalesce(p_note, '')), '');
  v_from   text;
  v_seller uuid;
  v_answer jsonb;
BEGIN
  -- DEC-402 — the reviewer's door: listings:review with its second factor, the dial staff_moderation, then the state
  -- machine's review transitions only (screening or held → active, reduced, rejected, held).
  -- DEC-404 — its authority is over the ad's home country, matched as the edit's is.
  SELECT l.home_country_code INTO v_scope FROM public.listings l WHERE l.id = p_listing_id;
  PERFORM public.door_context('staff', 'listings', 'review', 'staff_moderation', v_scope, 'match');
  IF p_new_status IS NULL OR p_new_status NOT IN ('active','reduced','rejected','held') THEN
    PERFORM public.door_refuse('badValue', 'status');
  END IF;
  -- DEC-469 — a rejection is a removal's decision: a reason from the remove list, a note only for 'other' (at most 500
  -- characters); approve and hold ask nothing.
  IF p_new_status = 'rejected' THEN
    IF p_reason IS NULL OR p_reason NOT IN ('prohibited','misleading','duplicate','contact_in_text','photo','rules','other') THEN
      PERFORM public.door_refuse('badValue', 'reason');
    END IF;
    IF p_reason = 'other' AND v_note IS NULL THEN
      PERFORM public.door_refuse('noteRequired');
    END IF;
    IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
      PERFORM public.door_refuse('noteTooLong');
    END IF;
    SELECT l.status, l.seller_id INTO v_from, v_seller FROM public.listings l WHERE l.id = p_listing_id FOR UPDATE;
  ELSIF p_reason IS NOT NULL THEN
    PERFORM public.door_refuse('badValue', 'reason');
  ELSIF v_note IS NOT NULL THEN
    PERFORM public.door_refuse('badValue', 'note');
  END IF;
  v_answer := public.transition_listing_core(p_listing_id, p_new_status);
  IF p_new_status = 'rejected' THEN
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
      VALUES (v_uid, 'listing.rejected', 'listing', p_listing_id::text,
              jsonb_strip_nulls(jsonb_build_object('from', v_from, 'to', p_new_status, 'reason', p_reason, 'note', v_note)));
    INSERT INTO public.seller_notices (seller_id, listing_id, kind, fields, reason, note)
      VALUES (v_seller, p_listing_id, 'admin_reject', ARRAY['status'], p_reason, v_note);
  END IF;
  RETURN v_answer;
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_review_listing', 'staff_moderation', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_review_listing(uuid, text, text, text) IS
  'DEC-402, DEC-404, DEC-469: the screening console''s decision on an ad in screening or held — listings:review over the ad''s home country (match) with its second factor, staff_moderation, the review statuses only, then transition_listing_core (never on the caller''s own ad, DEC-403); a rejection takes a reason from the remove list and a note only for other (500 characters at most), and writes one audit row listing.rejected and one seller notice admin_reject; refusals through door_refused.';
REVOKE ALL ON FUNCTION public.admin_review_listing(uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_review_listing(uuid, text, text, text) TO authenticated, service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: the two-argument door is gone; the four-argument door is VOLATILE SECURITY DEFINER, RETURNS jsonb,
--     EXECUTE for authenticated and the service role, never anon or PUBLIC; its body is this file's (md5); the kind
--     check holds admin_reject beside every earlier kind.
-- (b) refusals leave no trace: a rejection with no reason, a reason off the remove list, 'other' with no note, a note
--     of 501 characters; an approval or a hold with a reason or a note; the reviewer's own ad with a valid reason; a
--     country reviewer outside their country with a valid reason — nothing written (status, revisions, audit,
--     notices), each refusal metered once.
-- (c) a rejection with a reason and a note: {ok, status rejected}, one revision, one audit row listing.rejected with
--     {from, to, reason, note}, one seller notice admin_reject with the same reason and note.
-- (d) a rejection of a held ad with a reason and no note: the audit row and the notice carry no note, from is held.
-- (e) the service role rejects with a reason: the audit row has no actor; the notice is written.
-- (f) an approval asks nothing: {ok, status active}, no audit row, no notice.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ', 'XY': scratch codes no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_code2   character(2) := 'XY';
  v_lang    text := public.language_code('base');
  v_r0      text;
  v_a       uuid := gen_random_uuid();
  v_s       uuid := gen_random_uuid();
  v_c       uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess3   uuid := gen_random_uuid();
  v_cs      text;
  v_cc      text;
  v_role    uuid;
  v_anc     uuid;
  v_anc2    uuid;
  v_region  uuid;
  v_city    uuid;
  v_city2   uuid;
  v_cat     uuid;
  v_sown    uuid := gen_random_uuid();
  v_l1      uuid := gen_random_uuid();
  v_l2      uuid := gen_random_uuid();
  v_l3      uuid := gen_random_uuid();
  v_l4      uuid := gen_random_uuid();
  v_l5      uuid := gen_random_uuid();
  v_answer  jsonb;
  v_rev0    bigint;
  v_msg     text;
  v_fn      regprocedure;
  v_stat0   text;
BEGIN
  IF to_regprocedure('public.admin_review_listing(uuid,text)') IS NOT NULL THEN
    RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (a): the two-argument admin_review_listing is still there';
  END IF;
  v_fn := 'public.admin_review_listing(uuid,text,text,text)'::regprocedure;
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
        FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (a): admin_review_listing''s header, return type or grants differ';
  END IF;
  IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn)
     IS DISTINCT FROM '9e69c9abd328441324310bf9a17a7dc9' THEN
    RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (a): the body differs from this file';
  END IF;
  IF (SELECT array_length(proargnames, 1) FROM pg_proc WHERE oid = v_fn) IS DISTINCT FROM 4
     OR (SELECT pronargdefaults FROM pg_proc WHERE oid = v_fn) IS DISTINCT FROM 2 THEN
    RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (a): the reason and the note are not the two trailing defaults';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.seller_notices'::regclass
                    AND conname = 'seller_notices_kind_check'
                    AND pg_get_constraintdef(oid) LIKE '%admin_reject%'
                    AND pg_get_constraintdef(oid) LIKE '%level_paused%') THEN
    RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (a): the kind check does not hold admin_reject';
  END IF;

  v_tag := 'e2e-mig-b7b1-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  v_cs := json_build_object('sub', v_s::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text;
  v_cc := json_build_object('sub', v_c::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess3::text)::text;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code IN (v_code, v_code2)) THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof: a scratch code (% or %) already exists', v_code, v_code2;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true), (v_code2, v_tag || '-2', true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    SELECT a.id INTO v_anc2 FROM public.locations a WHERE a.country_code = v_code2 AND a.level = 'country'
     AND a.name_en = v_tag || '-2' AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL OR v_anc2 IS NULL THEN RAISE EXCEPTION 'cursor-bundle-7b part 1 proof: a scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id IN (v_anc, v_anc2) AND name_en LIKE 'e2e-mig-b7b1-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code2, v_tag || ' region 2', v_tag || '-r2', true, v_anc2) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code2, v_tag || ' city 2', v_tag || '-c2', true, v_region, 9.03, 38.74) RETURNING id INTO v_city2;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_s, v_tag || '-s@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_c, v_tag || '-c@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_s, v_c]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    -- The scratch callers' own ceiling: no verdict below rests on the live dial's value (rule 30 scan, point 4).
    INSERT INTO public.rate_overrides (user_id, action, max_count)
    SELECT u, d, 1000 FROM unnest(ARRAY[v_a, v_s, v_c]) u, unnest(ARRAY['staff_moderation', 'revise']) d;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-review', v_tag) RETURNING id INTO v_role;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'listings' AND p.action = 'review';
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role) <> 1 THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof: listings:review is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_s, v_role, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_c, v_role, 'country', v_code);
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    VALUES (gen_random_uuid(), v_s, v_tag || '-f', 'totp', 'verified', now(), now()),
           (gen_random_uuid(), v_c, v_tag || '-f3', 'totp', 'verified', now(), now());
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_sess, v_s, now(), now(), 'aal2'), (v_sess3, v_c, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess3, now(), now(), 'totp');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false), (v_code2, 20, v_r0, false);
    -- The reviewer's own ad; the plain seller's five ads: l1 (refusals, then a rejection with a note), l2 (held; the
    -- country reviewer rejects it), l3 (XY: outside the country reviewer's scope), l4 (the service role rejects it),
    -- l5 (an approval).
    INSERT INTO public.listings (id, seller_id, category_id, location_id, title, description, home_country_code, price_mode,
                                 status)
    VALUES (v_sown, v_s, v_cat, v_city, v_tag || ' a reviewer''s own', 'A scratch ad for the reason proof.', v_code, 'free', 'screening'),
           (v_l1, v_a, v_cat, v_city, v_tag || ' b waiting 1', 'A scratch ad for the reason proof.', v_code, 'free', 'screening'),
           (v_l2, v_a, v_cat, v_city, v_tag || ' c held 2', 'A scratch ad for the reason proof.', v_code, 'free', 'held'),
           (v_l3, v_a, v_cat, v_city2, v_tag || ' d waiting 3', 'A scratch ad for the reason proof.', v_code2, 'free', 'screening'),
           (v_l4, v_a, v_cat, v_city, v_tag || ' e waiting 4', 'A scratch ad for the reason proof.', v_code, 'free', 'screening'),
           (v_l5, v_a, v_cat, v_city, v_tag || ' f waiting 5', 'A scratch ad for the reason proof.', v_code, 'free', 'screening');
    SELECT coalesce(sum(count), 0) INTO v_rev0 FROM public.door_refusals WHERE day = current_date AND door = 'admin_review_listing';

    -- (b) every refusal answers its code at 400 and writes nothing.
    PERFORM set_config('request.jwt.claims', v_cs, true);
    v_answer := public.admin_review_listing(v_l1, 'rejected');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:reason', '400') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (b): a rejection with no reason answered %', v_answer;
    END IF;
    v_answer := public.admin_review_listing(v_l1, 'rejected', 'removed_in_error');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:reason', '400') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (b): a reason off the remove list answered %', v_answer;
    END IF;
    v_answer := public.admin_review_listing(v_l1, 'rejected', 'other', '   ');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('noteRequired', '400') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (b): other with no note answered %', v_answer;
    END IF;
    v_answer := public.admin_review_listing(v_l1, 'rejected', 'misleading', repeat('x', 501));
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('noteTooLong', '400') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (b): a note of 501 characters answered %', v_answer;
    END IF;
    v_answer := public.admin_review_listing(v_l1, 'active', 'rules');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:reason', '400') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (b): an approval with a reason answered %', v_answer;
    END IF;
    v_answer := public.admin_review_listing(v_l1, 'held', NULL, 'a note');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('badValue:note', '400') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (b): a hold with a note answered %', v_answer;
    END IF;
    v_answer := public.admin_review_listing(v_sown, 'rejected', 'rules');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('ownListing', '400') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (b): a reviewer''s rejection of their own ad answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cc, true);
    v_answer := public.admin_review_listing(v_l3, 'rejected', 'rules');
    IF (v_answer ->> 'message', current_setting('response.status', true)) IS DISTINCT FROM ('permissionDenied:scope', '403') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (b): the country reviewer''s rejection in XY answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.listing_revisions WHERE listing_id IN (v_sown, v_l1, v_l3))
       OR EXISTS (SELECT 1 FROM public.audit_log WHERE entity_type = 'listing' AND entity_id IN (v_sown::text, v_l1::text, v_l3::text))
       OR EXISTS (SELECT 1 FROM public.seller_notices WHERE listing_id IN (v_sown, v_l1, v_l3))
       OR (SELECT array_agg(status ORDER BY title) FROM public.listings WHERE id IN (v_sown, v_l1, v_l3))
          IS DISTINCT FROM ARRAY['screening', 'screening', 'screening'] THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (b): a refused call wrote a row';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door = 'admin_review_listing')
         IS DISTINCT FROM v_rev0 + 8 THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (b): door_refusals did not meter the 8 refusals';
    END IF;

    -- (c) a rejection with a reason and a note.
    PERFORM set_config('request.jwt.claims', v_cs, true);
    v_answer := public.admin_review_listing(v_l1, 'rejected', 'other', '  The photo shows another ad.  ');
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'status', 'rejected') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (c): the rejection answered %', v_answer;
    END IF;
    IF (SELECT count(*) FROM public.listing_revisions WHERE listing_id = v_l1 AND kind = 'state' AND actor = v_s
          AND after ->> 'status' = 'rejected') <> 1
       OR (SELECT count(*) FROM public.audit_log WHERE entity_type = 'listing' AND entity_id = v_l1::text) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.audit_log WHERE entity_type = 'listing' AND entity_id = v_l1::text
                        AND action = 'listing.rejected' AND actor_id = v_s
                        AND meta = jsonb_build_object('from', 'screening', 'to', 'rejected', 'reason', 'other',
                                                      'note', 'The photo shows another ad.'))
       OR (SELECT count(*) FROM public.seller_notices WHERE listing_id = v_l1) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.seller_notices WHERE listing_id = v_l1 AND seller_id = v_a
                        AND kind = 'admin_reject' AND reason = 'other' AND note = 'The photo shows another ad.'
                        AND fields = ARRAY['status']) THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (c): the rejection did not write its revision, audit row and notice';
    END IF;

    -- (d) a held ad, rejected with a reason and no note.
    PERFORM set_config('request.jwt.claims', v_cc, true);
    v_answer := public.admin_review_listing(v_l2, 'rejected', 'misleading');
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'status', 'rejected') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (d): the country reviewer''s rejection answered %', v_answer;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.audit_log WHERE entity_type = 'listing' AND entity_id = v_l2::text
                     AND action = 'listing.rejected' AND actor_id = v_c
                     AND meta = jsonb_build_object('from', 'held', 'to', 'rejected', 'reason', 'misleading'))
       OR NOT EXISTS (SELECT 1 FROM public.seller_notices WHERE listing_id = v_l2 AND kind = 'admin_reject'
                        AND reason = 'misleading' AND note IS NULL) THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (d): the held ad''s rejection wrote no audit row or notice without a note';
    END IF;

    -- (e) the service role rejects with a reason.
    PERFORM set_config('request.jwt.claims', json_build_object('role', 'service_role')::text, true);
    v_answer := public.admin_review_listing(v_l4, 'rejected', 'duplicate');
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'status', 'rejected') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (e): the service''s rejection answered %', v_answer;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.audit_log WHERE entity_type = 'listing' AND entity_id = v_l4::text
                     AND action = 'listing.rejected' AND actor_id IS NULL
                     AND meta = jsonb_build_object('from', 'screening', 'to', 'rejected', 'reason', 'duplicate'))
       OR NOT EXISTS (SELECT 1 FROM public.seller_notices WHERE listing_id = v_l4 AND kind = 'admin_reject'
                        AND reason = 'duplicate') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (e): the service''s rejection wrote no audit row or notice';
    END IF;

    -- (f) an approval asks nothing and writes neither row.
    PERFORM set_config('request.jwt.claims', v_cs, true);
    v_answer := public.admin_review_listing(v_l5, 'active');
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'status', 'active') THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (f): the approval answered %', v_answer;
    END IF;
    IF EXISTS (SELECT 1 FROM public.audit_log WHERE entity_type = 'listing' AND entity_id = v_l5::text)
       OR EXISTS (SELECT 1 FROM public.seller_notices WHERE listing_id = v_l5) THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (f): an approval wrote an audit row or a notice';
    END IF;
    v_stat0 := (SELECT status FROM public.listings WHERE id = v_l5);
    IF v_stat0 IS DISTINCT FROM 'active' THEN
      RAISE EXCEPTION 'cursor-bundle-7b part 1 proof (f): the approved ad is %', v_stat0;
    END IF;

    RAISE EXCEPTION 'cursor-bundle-7b-part-1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'cursor-bundle-7b-part-1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261126020000') ON CONFLICT DO NOTHING;
