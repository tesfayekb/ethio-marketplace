-- e2e-areas: ad-page, legal
-- Bundle 22 (Stage 1) turn 8 — M8d (part 4 of 4): INC-777's correction. M6 landed reveal_listing_contact with one expression its
-- brief did not carry (the 30-a-day gate's refusal answered resets_at as the next UTC midnight); this file re-declares
-- the function whole from M6's supplied text (the brief bundle-22-turn-6-v4.md, section 3 of M6): the gate's refusal
-- answers the gate's own reset time, v_rate->>'resets_at'. Arguments, header, revoke and grants unchanged; nothing
-- else in the body differs from the function as it stands after M6 (the acceptance check of turn 6 kept).
-- Gated on M8c's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020100000') THEN
    RAISE EXCEPTION 'bundle 22 turn 8 M8c (mark 20261020100000) must be applied first';
  END IF;
END $$;

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


-- Proofs, with no caller (G39): a missing caller is refused as before; the body answers the gate's own reset time and
-- keeps exactly the two next-midnight answers of the sellers cap and the new-account five, and turn 6's acceptance
-- check; header and grants as declared.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  v_src  text;
BEGIN
  BEGIN
    PERFORM public.reveal_listing_contact('abcdefghjk');
    RAISE EXCEPTION 'proof failed: reveal_listing_contact answered a missing caller';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
  END;
  SELECT p.provolatile, p.prosecdef, p.proconfig, p.prosrc INTO v_vol, v_def, v_conf, v_src
    FROM pg_proc p WHERE p.oid = 'public.reveal_listing_contact(text)'::regprocedure;
  IF v_vol IS DISTINCT FROM 'v' OR v_def IS DISTINCT FROM true OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
    RAISE EXCEPTION 'proof failed: reveal_listing_contact header (%, %, %)', v_vol, v_def, v_conf;
  END IF;
  IF position('''resets_at'', v_rate->>''resets_at'')' IN v_src) = 0 THEN
    RAISE EXCEPTION 'proof failed: the gate''s refusal does not answer the gate''s own reset time';
  END IF;
  IF (length(v_src) - length(replace(v_src, 'date_trunc(', ''))) / length('date_trunc(') <> 2 THEN
    RAISE EXCEPTION 'proof failed: the body does not carry exactly two next-midnight answers';
  END IF;
  IF position('public.legal_acceptance_pending(v_uid, v_row.id)' IN v_src) = 0 THEN
    RAISE EXCEPTION 'proof failed: turn 6''s acceptance check is missing';
  END IF;
  IF has_function_privilege('anon', 'public.reveal_listing_contact(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.reveal_listing_contact(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof failed: reveal_listing_contact grants';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020110000') ON CONFLICT (version) DO NOTHING;
