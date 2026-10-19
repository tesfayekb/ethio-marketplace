-- e2e-areas: legal, posting, ad-page
-- Bundle 22 (Stage 1) turn 6 — M6: the publishing statement is certified once per ad (DEC-205); a photo added to a
-- published ad carries that certification; the contact reveal waits for an owed acceptance. One new internal function
-- (legal_listing_certified) and five functions re-declared whole from their last declaration in the repository
-- (legal_certify and my_listing_certification: 20261019115742_844b64b2, M4a; register_listing_photo and
-- replace_listing_photo: 20261015113334_76db3ae0, sections C and D; reveal_listing_contact: 20261017122742_dd874885),
-- header, body, revoke and grants unchanged apart from these named changes:
--  0. DEC-205: legal_certify returns, asking for nothing and recording nothing, when the ad already holds a
--     certification of exactly the statement versions now in force for it; my_listing_certification then answers no
--     statements (the screens ask for no tick). A new version, or a country with its own statement, asks once again.
--  1. register_listing_photo and replace_listing_photo: two new arguments at the end, p_certified uuid[] DEFAULT NULL
--     and p_language text DEFAULT NULL (the argument list changes, so each is dropped and created again; the photo
--     route, their only caller, names its arguments); replace_listing_photo also reads the listing's seller_id in the
--     select that locks the row (a new variable v_seller);
--  2. in both, one call for a published ad (status other than draft), public.legal_certify(v_seller, p_listing_id,
--     'edit', p_certified, p_language), after the door's own checks and before its first write: acceptanceRequired
--     while a Terms or Privacy version is owed, certificationRequired unless the certified ids are exactly the
--     statements in force for the ad, badLanguage; with nothing in force nothing changes;
--  3. reveal_listing_contact (same arguments, replaced in place): after its availability check and before anything
--     is written, a viewer other than the owner who owes an acceptance (legal_acceptance_pending) is answered
--     {ok: false, reason: acceptanceRequired};
--  4. the revoke and grants name the new argument lists.
-- Gated on M4b's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020060000') THEN
    RAISE EXCEPTION 'bundle 22 turn 4 M4b (mark 20261020060000) must be applied first';
  END IF;
END $$;

DROP FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb);
DROP FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb);

-- ===== 0 — once per ad (DEC-205) =====
-- DEC-205 — whether the ad holds a certification of exactly these statement versions (sorted, as legal_certify
-- stores them). Internal: called by legal_certify and my_listing_certification only.
CREATE FUNCTION public.legal_listing_certified(p_listing_id uuid, p_ids uuid[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (SELECT 1 FROM public.listing_certifications c
                  WHERE c.listing_id = p_listing_id AND c.version_ids = p_ids);
$$;
REVOKE ALL ON FUNCTION public.legal_listing_certified(uuid, uuid[]) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_listing_certified(uuid, uuid[]) TO service_role;

CREATE OR REPLACE FUNCTION public.legal_certify(p_uid uuid, p_listing_id uuid, p_action text, p_certified uuid[],
                                     p_language text)
RETURNS void
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_set  jsonb;
  v_ids  uuid[];
  v_sent uuid[];
BEGIN
  IF p_action IS NULL OR p_action NOT IN ('publish', 'edit', 'renew') THEN RAISE EXCEPTION 'badValue:action'; END IF;
  IF public.legal_acceptance_pending(p_uid, p_listing_id) THEN RAISE EXCEPTION 'acceptanceRequired'; END IF;
  v_set := public.legal_publishing_set(p_listing_id);
  IF jsonb_array_length(v_set) = 0 THEN RETURN; END IF;
  SELECT array_agg((e ->> 'version_id')::uuid ORDER BY (e ->> 'version_id')::uuid) INTO v_ids
    FROM jsonb_array_elements(v_set) e;
  -- DEC-205 (the operator 2026-10-19: once per ad) — an ad already certified for exactly these statements asks for
  -- nothing more and records nothing; a new version, or a country with its own statement, asks once again.
  IF public.legal_listing_certified(p_listing_id, v_ids) THEN RETURN; END IF;
  SELECT array_agg(c ORDER BY c) INTO v_sent FROM unnest(p_certified) c;
  IF v_sent IS DISTINCT FROM v_ids THEN RAISE EXCEPTION 'certificationRequired'; END IF;
  IF p_language IS NULL OR NOT EXISTS (
       SELECT 1 FROM public.languages l WHERE l.code = p_language AND l.enabled_public) THEN
    RAISE EXCEPTION 'badLanguage';
  END IF;
  INSERT INTO public.listing_certifications
    (listing_id, user_id, action, version_ids, countries, language, home_country_code)
  VALUES (p_listing_id, p_uid, p_action, v_ids, public.legal_listing_countries(p_listing_id), p_language,
          (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = p_uid));
END;
$$;
REVOKE ALL ON FUNCTION public.legal_certify(uuid, uuid, text, uuid[], text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_certify(uuid, uuid, text, uuid[], text) TO service_role;


CREATE OR REPLACE FUNCTION public.my_listing_certification(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_set jsonb;
  v_ids uuid[];
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings x
                  WHERE x.id = p_listing_id AND x.seller_id = v_uid AND x.deleted_at IS NULL) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  v_set := public.legal_publishing_set(p_listing_id);
  SELECT array_agg((e ->> 'version_id')::uuid ORDER BY (e ->> 'version_id')::uuid) INTO v_ids
    FROM jsonb_array_elements(v_set) e;
  -- DEC-205 — an ad already certified for exactly these statements is not asked again: the screens see none.
  IF v_ids IS NOT NULL AND public.legal_listing_certified(p_listing_id, v_ids) THEN v_set := '[]'::jsonb; END IF;
  RETURN jsonb_build_object(
    'statements', v_set,
    'acceptance_pending', public.legal_acceptance_pending(v_uid, p_listing_id));
END;
$$;
REVOKE ALL ON FUNCTION public.my_listing_certification(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing_certification(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing_certification(uuid) TO service_role;


-- ===== 1 — register_listing_photo =====
CREATE FUNCTION public.register_listing_photo(
  p_listing_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[],
  p_review jsonb DEFAULT NULL,
  p_certified uuid[] DEFAULT NULL,
  p_language text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_seller uuid; v_status text; v_cap smallint; v_count int; v_label text;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'register_listing_photo is called by the photo route only';
  END IF;
  -- Bundle 16 turn 4a (D178, D183) — a photo kept for a person's review is stored hidden.
  v_label := public.listing_photo_review_label(p_unscreened, p_review);
  SELECT seller_id, status INTO v_seller, v_status FROM public.listings WHERE id = p_listing_id;
  IF v_seller IS NULL THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  -- D22 — the plan's photo cap is the authority; the route's cap is a mirror.
  v_cap := public.plan_photo_cap(public.seller_plan(v_seller));
  SELECT count(*) INTO v_count FROM public.listing_photos WHERE listing_id = p_listing_id;
  IF v_count >= v_cap THEN
    RAISE EXCEPTION 'tooManyPhotos:%', v_cap;
  END IF;
  SELECT coalesce(max(display_order), -1) + 1 INTO v_order
    FROM public.listing_photos WHERE listing_id = p_listing_id;
  -- Bundle 22 turn 6 (L1 v2 item 4) — a photo added to a published ad is an edit: the acceptance and the
  -- publishing certification, before anything is written. A draft's photos are certified at its publish.
  IF v_status <> 'draft' THEN
    PERFORM public.legal_certify(v_seller, p_listing_id, 'edit', p_certified, p_language);
  END IF;
  -- D158 (bundle 13 turn 6) — a photo stored while photo screening is off is HELD:
  -- `unscreened`, shown to no buyer until staff approve the ad.
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (coalesce(p_photo_id, gen_random_uuid()), p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false))
  RETURNING id INTO p_photo_id;
  -- D154 B3 (bundle 13 turn 10) — the screen's warnings, seen by the seller and staff only.
  IF cardinality(coalesce(p_warnings, '{}'::text[])) > 0 THEN
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (p_photo_id, p_listing_id, p_warnings);
  END IF;
  -- Bundle 16 turn 4a (D178) — the photo's review: why it is hidden, until a person decides.
  IF v_label IS NOT NULL THEN
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence)
    VALUES (p_photo_id, p_listing_id, v_label, p_review->>'code',
            left(nullif(btrim(coalesce(p_review->>'evidence', '')), ''), 200));
  END IF;
  -- D154 B5 — a photo added to a live ad is listed for staff.
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id, codes)
    VALUES (p_listing_id, 'added', p_photo_id, coalesce(p_warnings, '{}'::text[]));
  END IF;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, p_photo_id),
    updated_at = now() WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order);
END $$;

REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text) TO service_role;


-- ===== 2 — replace_listing_photo =====
CREATE FUNCTION public.replace_listing_photo(
  p_listing_id uuid,
  p_old_photo_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[],
  p_review jsonb DEFAULT NULL,
  p_certified uuid[] DEFAULT NULL,
  p_language text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_cover uuid; v_status text; v_label text; v_seller uuid;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'replace_listing_photo is called by the photo route only';
  END IF;
  -- Bundle 16 turn 4a (D178, D183) — a photo kept for a person's review is stored hidden.
  v_label := public.listing_photo_review_label(p_unscreened, p_review);
  IF p_photo_id IS NULL OR p_old_photo_id IS NULL THEN
    RAISE EXCEPTION 'photo ids are required';
  END IF;
  -- One edit of an ad's photos at a time: the listing row is locked.
  SELECT seller_id, status INTO v_seller, v_status FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  SELECT display_order INTO v_order FROM public.listing_photos
   WHERE id = p_old_photo_id AND listing_id = p_listing_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'photoGone';
  END IF;
  -- Bundle 22 turn 6 (L1 v2 item 4) — a photo added to a published ad is an edit: the acceptance and the
  -- publishing certification, before anything is written. A draft's photos are certified at its publish.
  IF v_status <> 'draft' THEN
    PERFORM public.legal_certify(v_seller, p_listing_id, 'edit', p_certified, p_language);
  END IF;
  UPDATE public.listings SET cover_photo_id = NULL
   WHERE id = p_listing_id AND cover_photo_id = p_old_photo_id;
  DELETE FROM public.listing_photos WHERE id = p_old_photo_id AND listing_id = p_listing_id;
  -- D158 — a photo stored while photo screening is off is HELD (`unscreened`).
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (p_photo_id, p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false));
  -- D154 B3 (bundle 13 turn 10) — the screen's warnings, seen by the seller and staff only.
  IF cardinality(coalesce(p_warnings, '{}'::text[])) > 0 THEN
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (p_photo_id, p_listing_id, p_warnings);
  END IF;
  -- Bundle 16 turn 4a (D178) — the photo's review: why it is hidden, until a person decides.
  IF v_label IS NOT NULL THEN
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence)
    VALUES (p_photo_id, p_listing_id, v_label, p_review->>'code',
            left(nullif(btrim(coalesce(p_review->>'evidence', '')), ''), 200));
  END IF;
  -- D154 B5 — a photo edited on a live ad is listed for staff.
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id, replaced_photo_id, codes)
    VALUES (p_listing_id, 'edited', p_photo_id, p_old_photo_id, coalesce(p_warnings, '{}'::text[]));
  END IF;
  SELECT id INTO v_cover FROM public.listing_photos
   WHERE listing_id = p_listing_id ORDER BY display_order LIMIT 1;
  UPDATE public.listings SET cover_photo_id = v_cover, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order,
                            'replaced', p_old_photo_id, 'cover_photo_id', v_cover);
END $$;

REVOKE ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text) TO service_role;


-- ===== 3 — reveal_listing_contact =====
CREATE OR REPLACE FUNCTION public.reveal_listing_contact(p_public_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid       uuid := auth.uid();
  v_row       public.listings%ROWTYPE;
  v_rate      jsonb;
  v_channels  jsonb;
  v_cap       integer;
  v_sellers   integer;
  v_today     integer;
  v_fresh     boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;
  SELECT * INTO v_row FROM public.listings WHERE public_id = p_public_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listingNotAvailable'; END IF;
  -- D201 rule 11 — a sold ad has no contact; a draft, a removed or an expired ad none either. The owner always sees his own.
  IF v_row.seller_id <> v_uid AND v_row.status <> 'active' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;
  -- Bundle 22 turn 6 (the operator 2026-10-19: no use of an account without accepting) — a viewer who owes a Terms
  -- or Privacy acceptance reveals nothing until he has accepted; the owner always sees his own.
  IF v_row.seller_id <> v_uid AND public.legal_acceptance_pending(v_uid, v_row.id) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'acceptanceRequired');
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
    -- reveals on its first day. Not a second dial: a ceiling computed here, under the 30-a-day gate below.
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

    v_rate := public.rate_gate('contact_reveal');
    IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
      RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited',
                                'resets_at', (date_trunc('day', now() AT TIME ZONE 'utc') + interval '1 day') AT TIME ZONE 'utc');
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
END $function$;
REVOKE ALL ON FUNCTION public.reveal_listing_contact(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.reveal_listing_contact(text) TO authenticated;
GRANT ALL ON FUNCTION public.reveal_listing_contact(text) TO service_role;


-- Proofs, with no caller (G39): the old argument lists are gone; the photo doors refuse a missing listing and the
-- reveal and the seller's read a missing caller, as before; each body carries its named change; headers and grants as
-- declared. Once per ad, the photo certification and the reveal's refusal with a person are proven by LG-21, LG-19 and
-- LG-20.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  v_src  text;
  r      record;
BEGIN
  IF to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)') IS NOT NULL
     OR to_regprocedure('public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)') IS NOT NULL THEN
    RAISE EXCEPTION 'proof failed: an old argument list still exists';
  END IF;
  BEGIN
    PERFORM public.register_listing_photo(gen_random_uuid(), gen_random_uuid(), '{"original": "x"}'::jsonb, 1, 1, 1);
    RAISE EXCEPTION 'proof failed: register_listing_photo answered a missing listing';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'listing not found' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.replace_listing_photo(gen_random_uuid(), gen_random_uuid(), gen_random_uuid(),
                                         '{"original": "x"}'::jsonb, 1, 1, 1);
    RAISE EXCEPTION 'proof failed: replace_listing_photo answered a missing listing';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'listing not found' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.reveal_listing_contact('abcdefghjk');
    RAISE EXCEPTION 'proof failed: reveal_listing_contact answered a missing caller';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.my_listing_certification(gen_random_uuid());
    RAISE EXCEPTION 'proof failed: my_listing_certification answered a missing caller';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
  END;
  IF public.legal_listing_certified(gen_random_uuid(), ARRAY[gen_random_uuid()]) THEN
    RAISE EXCEPTION 'proof failed: legal_listing_certified answered true for a missing listing';
  END IF;
  FOR r IN SELECT * FROM (VALUES
      ('public.legal_listing_certified(uuid, uuid[])', 's'::"char", false,
       'c.version_ids = p_ids'),
      ('public.legal_certify(uuid, uuid, text, uuid[], text)', 'v'::"char", false,
       'IF public.legal_listing_certified(p_listing_id, v_ids) THEN RETURN; END IF;'),
      ('public.my_listing_certification(uuid)', 's'::"char", true,
       'public.legal_listing_certified(p_listing_id, v_ids)'),
      ('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text)', 'v'::"char", false,
       'PERFORM public.legal_certify(v_seller, p_listing_id, ''edit'', p_certified, p_language);'),
      ('public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text)', 'v'::"char", false,
       'PERFORM public.legal_certify(v_seller, p_listing_id, ''edit'', p_certified, p_language);'),
      ('public.reveal_listing_contact(text)', 'v'::"char", true,
       'public.legal_acceptance_pending(v_uid, v_row.id)')) AS t(sig, vol, auth_ok, needle) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig, p.prosrc INTO v_vol, v_def, v_conf, v_src
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM true
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF position(r.needle IN v_src) = 0 THEN
      RAISE EXCEPTION 'proof failed: % does not carry its named change', r.sig;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: anon may execute %', r.sig;
    END IF;
    IF has_function_privilege('authenticated', r.sig, 'EXECUTE') IS DISTINCT FROM r.auth_ok THEN
      RAISE EXCEPTION 'proof failed: % authenticated EXECUTE is not %', r.sig, r.auth_ok;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020070000') ON CONFLICT (version) DO NOTHING;