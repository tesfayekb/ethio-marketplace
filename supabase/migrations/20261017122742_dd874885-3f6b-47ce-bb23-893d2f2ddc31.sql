-- Bundle 19 turn 13b (2026-10-17). Tier A. INC-694 — M6: THE PERSONAL-DATA RULE ON THE SAVE AND REVEAL TABLES.
-- e2e-areas: ad-page, my-listings, account
-- Knowledge E3 / AGENTS.md: a personal-data table carries home_country_code. saved_listings (turn 12a, M3a),
-- reveal_flags (turn 11, M5) and contact_reveals (2026-10-03) name a person and carry none; and the platform's rule for
-- a new table (only public.profiles and public.user_roles reference auth.users) was not met by the two bundle-19 tables.
-- A. home_country_code character(2) REFERENCES public.countries(code) on the three tables, filled for the rows already
--    there from user_directory (the source alias_history, seller_places and listing_reports use).
-- B. saved_listings.user_id and reveal_flags.viewer_id reference public.profiles(user_id) ON DELETE CASCADE in place of
--    auth.users(id) (a profile row exists for every account — handle_new_user; deleting an account deletes its profile,
--    so the cascade still reaches these rows). contact_reveals.viewer_id keeps its reference of 2026-10-03 (a table
--    older than the rule; recorded in INC-694's census with the other older ones).
-- C. The two writing doors redeclared WHOLE from their live definitions, each changed only where it inserts:
--    save_listing(text) writes the saver's code; reveal_listing_contact(text) writes the viewer's code on the day row
--    and on the flag. Headers, argument lists, answers and every other line unchanged (fingerprints below).
-- D. Proofs P1–P5, RAISE EXCEPTION on any failure (a clean apply is the pass): the three columns and their reference;
--    the person references (profiles, not auth.users) on the two tables; the two bodies by fingerprint with
--    their headers; the grants; each door refused with no caller. No proof reads or writes a real row (G27); the
--    backfill is read back after the apply.
-- E. The mark 20261018190000.
-- Applied on ethio-prod by the executor's migration tool on save (DEC-188); the operator applies the saved file on
-- ethio-staging and reads back the mark. Small tables; the reference swap takes a short lock on profiles.

-- ===== A — the column, filled for the rows already there =====
ALTER TABLE public.saved_listings
  ADD COLUMN IF NOT EXISTS home_country_code character(2) REFERENCES public.countries(code);
UPDATE public.saved_listings t
   SET home_country_code = d.home_country_code
  FROM public.user_directory d
 WHERE d.user_id = t.user_id
   AND t.home_country_code IS NULL;
ALTER TABLE public.reveal_flags
  ADD COLUMN IF NOT EXISTS home_country_code character(2) REFERENCES public.countries(code);
UPDATE public.reveal_flags t
   SET home_country_code = d.home_country_code
  FROM public.user_directory d
 WHERE d.user_id = t.viewer_id
   AND t.home_country_code IS NULL;
ALTER TABLE public.contact_reveals
  ADD COLUMN IF NOT EXISTS home_country_code character(2) REFERENCES public.countries(code);
UPDATE public.contact_reveals t
   SET home_country_code = d.home_country_code
  FROM public.user_directory d
 WHERE d.user_id = t.viewer_id
   AND t.home_country_code IS NULL;

-- ===== B — the person references of the two bundle-19 tables: profiles, not auth.users =====
DO $swap$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint c
              WHERE c.conrelid = 'public.saved_listings'::regclass AND c.contype = 'f'
                AND c.confrelid = 'auth.users'::regclass) THEN
    EXECUTE (SELECT string_agg(format('ALTER TABLE public.saved_listings DROP CONSTRAINT %I', c.conname), '; ')
               FROM pg_constraint c
              WHERE c.conrelid = 'public.saved_listings'::regclass AND c.contype = 'f'
                AND c.confrelid = 'auth.users'::regclass);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint c
                  WHERE c.conrelid = 'public.saved_listings'::regclass AND c.contype = 'f'
                    AND c.conname = 'saved_listings_user_id_profiles_fkey') THEN
    ALTER TABLE public.saved_listings
      ADD CONSTRAINT saved_listings_user_id_profiles_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;
  END IF;
END $swap$;
DO $swap$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint c
              WHERE c.conrelid = 'public.reveal_flags'::regclass AND c.contype = 'f'
                AND c.confrelid = 'auth.users'::regclass) THEN
    EXECUTE (SELECT string_agg(format('ALTER TABLE public.reveal_flags DROP CONSTRAINT %I', c.conname), '; ')
               FROM pg_constraint c
              WHERE c.conrelid = 'public.reveal_flags'::regclass AND c.contype = 'f'
                AND c.confrelid = 'auth.users'::regclass);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint c
                  WHERE c.conrelid = 'public.reveal_flags'::regclass AND c.contype = 'f'
                    AND c.conname = 'reveal_flags_viewer_id_profiles_fkey') THEN
    ALTER TABLE public.reveal_flags
      ADD CONSTRAINT reveal_flags_viewer_id_profiles_fkey FOREIGN KEY (viewer_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;
  END IF;
END $swap$;

-- ===== C — the two writing doors, whole =====
CREATE OR REPLACE FUNCTION public.save_listing(p_public_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_id    uuid;
  v_rate  jsonb;
  v_count bigint;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;
  -- The public predicate (listings_public_read): a live ad, or a sold one within its 30 days. Anything else is not there.
  SELECT l.id INTO v_id FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'));
  IF v_id IS NULL THEN RAISE EXCEPTION 'listingNotAvailable'; END IF;
  -- The owner does not save his own ad (D201 §5: no Save for the owner), so "Saved by N" counts buyers only.
  IF EXISTS (SELECT 1 FROM public.listings l WHERE l.id = v_id AND l.seller_id = v_uid) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'ownListing');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.saved_listings s WHERE s.user_id = v_uid AND s.listing_id = v_id) THEN
    v_rate := public.rate_gate('save');
    IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
      RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at');
    END IF;
    -- INC-694 — personal data carries the saver's home country (Knowledge E3), from user_directory.
    INSERT INTO public.saved_listings (user_id, listing_id, home_country_code)
    VALUES (v_uid, v_id, (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid))
    ON CONFLICT DO NOTHING;
  END IF;
  SELECT count(*) INTO v_count FROM public.saved_listings s WHERE s.listing_id = v_id;
  RETURN jsonb_build_object('ok', true, 'saved', true, 'count', v_count);
END $function$;
REVOKE ALL ON FUNCTION public.save_listing(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_listing(text) TO authenticated;
GRANT ALL ON FUNCTION public.save_listing(text) TO service_role;

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
                                'resets_at', v_rate->>'resets_at');
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

-- ===== D — proofs =====
DO $proof$
DECLARE
  v_md5 text;
  v_vol "char";
  v_def boolean;
  v_cfg text;
  v_err text;
  v_t   text;
BEGIN
  -- P1. The three columns, each referencing countries(code).
  FOREACH v_t IN ARRAY ARRAY['saved_listings', 'reveal_flags', 'contact_reveals'] LOOP
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                    WHERE table_schema = 'public' AND table_name = v_t AND column_name = 'home_country_code'
                      AND data_type = 'character' AND character_maximum_length = 2) THEN
      RAISE EXCEPTION 'B19M6 P1: %.home_country_code is missing or not char(2)', v_t;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint c
                    WHERE c.conrelid = format('public.%I', v_t)::regclass AND c.contype = 'f'
                      AND c.confrelid = 'public.countries'::regclass
                      AND pg_get_constraintdef(c.oid) LIKE 'FOREIGN KEY (home_country_code)%') THEN
      RAISE EXCEPTION 'B19M6 P1: %.home_country_code does not reference countries', v_t;
    END IF;
  END LOOP;
  -- P2. The two bundle-19 tables reference profiles, not auth.users.
  FOREACH v_t IN ARRAY ARRAY['saved_listings', 'reveal_flags'] LOOP
    IF EXISTS (SELECT 1 FROM pg_constraint c
                WHERE c.conrelid = format('public.%I', v_t)::regclass AND c.contype = 'f'
                  AND c.confrelid = 'auth.users'::regclass) THEN
      RAISE EXCEPTION 'B19M6 P2: % still references auth.users', v_t;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint c
                    WHERE c.conrelid = format('public.%I', v_t)::regclass AND c.contype = 'f'
                      AND c.confrelid = 'public.profiles'::regclass AND c.confdeltype = 'c') THEN
      RAISE EXCEPTION 'B19M6 P2: % has no cascading reference to profiles', v_t;
    END IF;
  END LOOP;
  -- P3, P4. The two doors: body by fingerprint, header as before.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef,
         coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_vol, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.save_listing(text)'::regprocedure;
  IF v_md5 <> 'ae60b0b23b8be98913273e7a83b6213d' THEN
    RAISE EXCEPTION 'B19M6 P3: save_listing body is not the one written (fingerprint %)', v_md5;
  END IF;
  IF v_vol <> 'v' OR NOT v_def OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M6 P3: save_listing header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef,
         coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_vol, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.reveal_listing_contact(text)'::regprocedure;
  IF v_md5 <> '230e5846214d889b42c89a78f81073db' THEN
    RAISE EXCEPTION 'B19M6 P4: reveal_listing_contact body is not the one written (fingerprint %)', v_md5;
  END IF;
  IF v_vol <> 'v' OR NOT v_def OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M6 P4: reveal_listing_contact header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  -- P5. The grants, and no caller is refused at the first gate.
  IF has_function_privilege('anon', 'public.save_listing(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.save_listing(text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.reveal_listing_contact(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.reveal_listing_contact(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19M6 P5: the grants are not as written';
  END IF;
  BEGIN
    PERFORM public.save_listing('zzzzzzzzzz');
    RAISE EXCEPTION 'B19M6 P5: save_listing answered with no caller';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT;
    IF v_err <> 'not authenticated' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.reveal_listing_contact('zzzzzzzzzz');
    RAISE EXCEPTION 'B19M6 P5: reveal_listing_contact answered with no caller';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT;
    IF v_err <> 'not authenticated' THEN RAISE; END IF;
  END;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018190000') ON CONFLICT (version) DO NOTHING;