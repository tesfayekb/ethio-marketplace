-- Bundle 19 turn 11 (2026-10-17). Tier A. D201 §6 — M5: THE CONTACT REVEAL BY PUBLIC ID, WITH ITS VELOCITY RULES.
-- e2e-areas: ad-page, my-listings
-- The buyer's page asks for a seller's phone and chat links by the ad's PUBLIC id (the page never holds the uuid), and
-- the reveal gains the rules the operator approved on 2026-10-16 (Q2): the 30-a-day dial stays; a viewer who has
-- reached ten DISTINCT sellers in the last 24 hours is refused ("sellersCapReached") and flagged for staff; an account
-- younger than 24 hours, with no listing and no earlier reveal, is held to five reveals that day; the owner's own ad
-- is answered with no row and no count; a sold or otherwise private ad is "listingNotAvailable", as before.
-- A. contact_reveals gains created_at (the 24-hour window needs the instant, not the day).
-- B. The dial contact_reveal_sellers (10 a day); rate_overrides for the action work as for every other dial.
-- C. reveal_flags(viewer_id, day, sellers, hits, first_at, last_at): one row per viewer and day at the cap; in the
--    platform's order for a new table (CREATE TABLE → GRANT → ENABLE ROW LEVEL SECURITY → CREATE POLICY, INC-690); staff
--    (listings.view) read it; no other client privilege; the door writes it as the definer.
-- D. reveal_listing_contact(p_public_id text) replaces reveal_listing_contact(p_listing_id uuid) — the argument list
--    changes, so the old door is DROPPED and the new one born closed, EXECUTE to authenticated; the body keeps every
--    rule of 20261003215007 :270–:314 (the day row, rate_gate('contact_reveal'), the shown channels with their values)
--    and adds the three rules above, in this order: owner → the day row already there → the sellers cap → the new
--    account's five → the 30-a-day gate → the row.
-- E. Proofs P1–P6, RAISE EXCEPTION on any failure (a clean apply is the pass): the column; the dial; the table, its
--    policy and privileges; the door's header, its fingerprint (DEC-190) and that the uuid door is gone; the grants; the door refused
--    with no caller. The rules themselves are proven by the door tests of this turn (AP-20…AP-22), which hold scratch
--    users — a proof never creates one (G27).
-- F. The mark 20261018160000.
-- Applied on ethio-prod by the executor's migration tool on save (DEC-188); the operator applies the saved file on
-- ethio-staging and reads back the mark. The ALTER TABLE on contact_reveals is a brief lock on a small table.

-- ===== A — the instant of a reveal =====
ALTER TABLE public.contact_reveals
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

-- ===== B — the dial =====
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('contact_reveal_sellers', 10, 86400)
  ON CONFLICT (action) DO NOTHING;

-- ===== C — reveal_flags =====
CREATE TABLE IF NOT EXISTS public.reveal_flags (
  viewer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day       date NOT NULL,
  sellers   integer NOT NULL CHECK (sellers >= 0),
  hits      integer NOT NULL DEFAULT 1 CHECK (hits >= 1),
  first_at  timestamptz NOT NULL DEFAULT now(),
  last_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (viewer_id, day)
);
REVOKE ALL ON public.reveal_flags FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.reveal_flags TO authenticated;
GRANT ALL ON public.reveal_flags TO service_role;
ALTER TABLE public.reveal_flags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS reveal_flags_staff_read ON public.reveal_flags;
CREATE POLICY reveal_flags_staff_read ON public.reveal_flags
  FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(), 'listings', 'view'));

-- ===== D — the door =====
DROP FUNCTION IF EXISTS public.reveal_listing_contact(uuid);
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
      INSERT INTO public.reveal_flags (viewer_id, day, sellers)
      VALUES (v_uid, current_date, v_sellers)
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
    INSERT INTO public.contact_reveals (listing_id, viewer_id, day)
    VALUES (v_row.id, v_uid, current_date)
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

-- ===== E — proofs =====
DO $proof$
DECLARE
  v_md5 text;
  v_vol "char";
  v_def boolean;
  v_cfg text;
  v_err text;
BEGIN
  -- P1. The instant.
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_schema = 'public' AND table_name = 'contact_reveals'
                    AND column_name = 'created_at' AND is_nullable = 'NO' AND column_default IS NOT NULL) THEN
    RAISE EXCEPTION 'B19M5 P1: contact_reveals.created_at is not a NOT NULL timestamp with a default';
  END IF;
  -- P2. The dial.
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'contact_reveal_sellers' AND window_seconds = 86400) THEN
    RAISE EXCEPTION 'B19M5 P2: the dial contact_reveal_sellers is missing';
  END IF;
  -- P3. The flags table: RLS on, the staff policy, no client privilege but the policed SELECT.
  IF NOT EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
                   WHERE n.nspname = 'public' AND c.relname = 'reveal_flags' AND c.relrowsecurity) THEN
    RAISE EXCEPTION 'B19M5 P3: reveal_flags has no row security';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'reveal_flags'
                    AND policyname = 'reveal_flags_staff_read' AND cmd = 'SELECT'
                    AND qual LIKE '%has_permission%listings%view%') THEN
    RAISE EXCEPTION 'B19M5 P3: the staff read policy is not as written';
  END IF;
  IF has_table_privilege('anon', 'public.reveal_flags', 'SELECT')
     OR has_table_privilege('authenticated', 'public.reveal_flags', 'INSERT')
     OR has_table_privilege('authenticated', 'public.reveal_flags', 'UPDATE')
     OR has_table_privilege('authenticated', 'public.reveal_flags', 'DELETE')
     OR NOT has_table_privilege('authenticated', 'public.reveal_flags', 'SELECT') THEN
    RAISE EXCEPTION 'B19M5 P3: reveal_flags privileges are not as written';
  END IF;
  -- P4. The door: the uuid form is gone; the text form has its header and its body as written.
  IF EXISTS (SELECT 1 FROM pg_proc p WHERE p.pronamespace = 'public'::regnamespace AND p.proname = 'reveal_listing_contact'
                AND pg_get_function_identity_arguments(p.oid) = 'p_listing_id uuid') THEN
    RAISE EXCEPTION 'B19M5 P4: the uuid door still exists';
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef,
         coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_vol, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.reveal_listing_contact(text)'::regprocedure;
  IF v_md5 <> '3392f1f310d29f8e4ad4172bd604e6b1' THEN
    RAISE EXCEPTION 'B19M5 P4: reveal_listing_contact body is not the one written (fingerprint %)', v_md5;
  END IF;
  IF v_vol <> 'v' OR NOT v_def OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M5 P4: reveal_listing_contact header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  -- P5. The grants.
  IF has_function_privilege('anon', 'public.reveal_listing_contact(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.reveal_listing_contact(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19M5 P5: the grants are not as written';
  END IF;
  -- P6. No caller is refused at the first gate, before any read.
  BEGIN
    PERFORM public.reveal_listing_contact('zzzzzzzzzz');
    RAISE EXCEPTION 'B19M5 P6: the door answered with no caller';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT;
    IF v_err <> 'not authenticated' THEN RAISE; END IF;
  END;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018160000') ON CONFLICT (version) DO NOTHING;