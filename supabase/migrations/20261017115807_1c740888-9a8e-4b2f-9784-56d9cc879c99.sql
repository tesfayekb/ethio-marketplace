-- Bundle 19 turn 13 (2026-10-17). Tier A. D201 §0 rule 9, §11 — M4: REPORT AN AD, AND THE OPEN-REPORT COUNTS FOR STAFF.
-- e2e-areas: ad-page, admin-listings
-- A signed-in buyer reports an ad with a reason and an optional note (the AH-12 list the operator approved on
-- 2026-10-17 — Q-A); the reporter is never named to the seller; staff with listings:review see every report and the
-- open count on the listing's page and row. The reports queue of its own is the ops stage; closing a report is a
-- staff door of that stage (the columns are born now so no row is reshaped later).
-- A. listing_reports(id, listing_id, reporter_id, home_country_code, reason, note ≤ 500, created_at, status open|closed,
--    closed_by, closed_at, outcome) — the people it names reference public.profiles(user_id), never auth.users (the
--    platform's rule: only profiles and user_roles reference auth.users); personal data, so it carries
--    home_country_code (E3); one OPEN report per reporter and ad (a partial unique index); RLS on: a reporter reads his
--    own rows, staff (listings:review) read all; no client write — the door inserts as the definer.
-- B. The dial report (10 a day).
-- C. Three doors, born closed, EXECUTE to authenticated: report_listing(p_public_id, p_reason, p_note) — signed in,
--    a publicly readable ad, never the caller's own, a reason of the list, the note trimmed and capped, one open
--    report per reporter and ad (alreadyReported), rate_gate('report') counted only when a row is written;
--    admin_listing_reports(p_listing_id) — the listing's reports for listings:review (reason, note, status, times —
--    the reporter's id travels to staff, as the RLS allows; the screen does not draw it); admin_open_report_counts
--    (p_listing_ids) — the open count per listing for the console's rows, listings:review, at most 100 ids.
-- D. Proofs P1–P6, RAISE EXCEPTION on any failure (a clean apply is the pass): the table, its index, policies and
--    privileges; the dial; every body's fingerprint (DEC-190) and header; the grants; each door refused with no caller; the reason
--    check refuses a word outside the list (a scratch-free check through the constraint's definition).
-- E. The mark 20261018180000.
-- Applied on ethio-prod by the executor's migration tool on save (DEC-188); the operator applies the saved file on
-- ethio-staging and reads back the mark. No lock on a hot table.

-- ===== A — listing_reports =====
CREATE TABLE IF NOT EXISTS public.listing_reports (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id  uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  reporter_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  -- Personal data (who reported, and why): carries home_country_code (Knowledge E3), filled by the door from
  -- user_directory as alias_history and seller_places carry it.
  home_country_code character(2) REFERENCES public.countries(code),
  reason      text NOT NULL CONSTRAINT listing_reports_reason_check
              CHECK (reason IN ('spam', 'scam', 'prohibited', 'wrongCategory', 'duplicate', 'alreadySold', 'under18', 'copyright', 'other')),
  note        text CONSTRAINT listing_reports_note_check CHECK (note IS NULL OR char_length(note) <= 500),
  created_at  timestamptz NOT NULL DEFAULT now(),
  status      text NOT NULL DEFAULT 'open' CONSTRAINT listing_reports_status_check CHECK (status IN ('open', 'closed')),
  closed_by   uuid REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  closed_at   timestamptz,
  outcome     text
);
CREATE UNIQUE INDEX IF NOT EXISTS listing_reports_open_once ON public.listing_reports (listing_id, reporter_id) WHERE status = 'open';
CREATE INDEX IF NOT EXISTS listing_reports_listing_idx ON public.listing_reports (listing_id) WHERE status = 'open';
-- The platform's order for a new table: CREATE TABLE → GRANT → ENABLE ROW LEVEL SECURITY → CREATE POLICY (INC-690).
REVOKE ALL ON public.listing_reports FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.listing_reports TO authenticated;
GRANT ALL ON public.listing_reports TO service_role;
ALTER TABLE public.listing_reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS listing_reports_own_read ON public.listing_reports;
CREATE POLICY listing_reports_own_read ON public.listing_reports
  FOR SELECT TO authenticated
  USING (reporter_id = auth.uid());
DROP POLICY IF EXISTS listing_reports_staff_read ON public.listing_reports;
CREATE POLICY listing_reports_staff_read ON public.listing_reports
  FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(), 'listings', 'review'));

-- ===== B — the dial =====
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('report', 10, 86400)
  ON CONFLICT (action) DO NOTHING;

-- ===== C — the doors =====
CREATE OR REPLACE FUNCTION public.report_listing(p_public_id text, p_reason text, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_id     uuid;
  v_seller uuid;
  v_note   text;
  v_rate   jsonb;
  v_home   character(2);
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;
  IF p_reason IS NULL OR p_reason NOT IN ('spam', 'scam', 'prohibited', 'wrongCategory', 'duplicate', 'alreadySold', 'under18', 'copyright', 'other') THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'badReason');
  END IF;
  v_note := nullif(btrim(coalesce(p_note, '')), '');
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'noteTooLong');
  END IF;
  -- The public predicate (listings_public_read): a live ad, or a sold one within its 30 days.
  SELECT l.id, l.seller_id INTO v_id, v_seller FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > now() - interval '30 days'));
  IF v_id IS NULL THEN RAISE EXCEPTION 'listingNotAvailable'; END IF;
  IF v_seller = v_uid THEN RETURN jsonb_build_object('ok', false, 'reason', 'ownListing'); END IF;
  IF EXISTS (SELECT 1 FROM public.listing_reports r
              WHERE r.listing_id = v_id AND r.reporter_id = v_uid AND r.status = 'open') THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'alreadyReported');
  END IF;
  v_rate := public.rate_gate('report');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at');
  END IF;
  SELECT d.home_country_code INTO v_home FROM public.user_directory d WHERE d.user_id = v_uid;
  INSERT INTO public.listing_reports (listing_id, reporter_id, home_country_code, reason, note)
  VALUES (v_id, v_uid, v_home, p_reason, v_note);
  RETURN jsonb_build_object('ok', true);
END $$;
REVOKE ALL ON FUNCTION public.report_listing(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.report_listing(text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.report_listing(text, text, text) TO service_role;

CREATE OR REPLACE FUNCTION public.admin_listing_reports(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'listings', 'review') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  RETURN coalesce((SELECT jsonb_agg(jsonb_build_object(
                            'id', r.id, 'reason', r.reason, 'note', r.note, 'status', r.status,
                            'createdAt', r.created_at, 'closedAt', r.closed_at, 'outcome', r.outcome)
                          ORDER BY r.status DESC, r.created_at DESC)
                     FROM public.listing_reports r WHERE r.listing_id = p_listing_id), '[]'::jsonb);
END $$;
REVOKE ALL ON FUNCTION public.admin_listing_reports(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_listing_reports(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_listing_reports(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.admin_open_report_counts(p_listing_ids uuid[])
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'listings', 'review') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF p_listing_ids IS NULL OR cardinality(p_listing_ids) > 100 THEN
    RAISE EXCEPTION 'admin_open_report_counts: badSize';
  END IF;
  RETURN coalesce((SELECT jsonb_object_agg(r.listing_id::text, r.n)
                     FROM (SELECT x.listing_id, count(*) AS n
                              FROM public.listing_reports x
                            WHERE x.listing_id = ANY (p_listing_ids) AND x.status = 'open'
                            GROUP BY x.listing_id) r), '{}'::jsonb);
END $$;
REVOKE ALL ON FUNCTION public.admin_open_report_counts(uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_open_report_counts(uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_open_report_counts(uuid[]) TO service_role;

-- ===== D — proofs =====
DO $proof$
DECLARE
  v_md5 text; v_vol "char"; v_def boolean; v_cfg text; v_err text; v_check text;
BEGIN
  -- P1. The table: RLS, the two read policies, the open-once index, the privileges.
  IF NOT EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
                  WHERE n.nspname = 'public' AND c.relname = 'listing_reports' AND c.relrowsecurity) THEN
    RAISE EXCEPTION 'B19M4 P1: listing_reports has no row security';
  END IF;
  IF (SELECT count(*) FROM pg_policies WHERE schemaname = 'public' AND tablename = 'listing_reports'
        AND policyname IN ('listing_reports_own_read', 'listing_reports_staff_read') AND cmd = 'SELECT') <> 2 THEN
    RAISE EXCEPTION 'B19M4 P1: the two read policies are not as written';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND tablename = 'listing_reports'
                    AND indexname = 'listing_reports_open_once' AND indexdef LIKE 'CREATE UNIQUE INDEX%WHERE%open%') THEN
    RAISE EXCEPTION 'B19M4 P1: the open-once index is missing';
  END IF;
  IF has_table_privilege('anon', 'public.listing_reports', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_reports', 'INSERT')
     OR has_table_privilege('authenticated', 'public.listing_reports', 'UPDATE')
     OR has_table_privilege('authenticated', 'public.listing_reports', 'DELETE')
     OR NOT has_table_privilege('authenticated', 'public.listing_reports', 'SELECT') THEN
    RAISE EXCEPTION 'B19M4 P1: listing_reports privileges are not as written';
  END IF;
  -- P1b. Personal data carries its country (E3) and names people through profiles, never auth.users.
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'listing_reports'
                    AND column_name = 'home_country_code') THEN
    RAISE EXCEPTION 'B19M4 P1b: listing_reports has no home_country_code';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.listing_reports'::regclass AND contype = 'f'
                AND confrelid = 'auth.users'::regclass) THEN
    RAISE EXCEPTION 'B19M4 P1b: listing_reports references auth.users';
  END IF;
  IF (SELECT count(*) FROM pg_constraint WHERE conrelid = 'public.listing_reports'::regclass AND contype = 'f'
         AND confrelid = 'public.profiles'::regclass) <> 2 THEN
    RAISE EXCEPTION 'B19M4 P1b: reporter_id and closed_by do not both reference profiles';
  END IF;
  -- P2. The dial.
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'report' AND window_seconds = 86400) THEN
    RAISE EXCEPTION 'B19M4 P2: the dial report is missing';
  END IF;
  -- P3. Every body landed byte for byte, with its header.
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef,
         coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_vol, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.admin_listing_reports(uuid)'::regprocedure;
  IF v_md5 <> 'a52b8e35052480c2aeb527addb0bb199' THEN RAISE EXCEPTION 'B19M4 P3: admin_listing_reports body is not the one written (fingerprint %)', v_md5; END IF;
  IF v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M4 P3: admin_listing_reports header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef,
         coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_vol, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.admin_open_report_counts(uuid[])'::regprocedure;
  IF v_md5 <> 'cab6a02ae342d6cfc44e4c8ab95929fb' THEN RAISE EXCEPTION 'B19M4 P3: admin_open_report_counts body is not the one written (fingerprint %)', v_md5; END IF;
  IF v_vol <> 's' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M4 P3: admin_open_report_counts header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  SELECT (SELECT md5(string_agg(CASE WHEN t.ord % 2 = 1 THEN btrim(regexp_replace(t.seg, '\s+', ' ', 'g')) ELSE t.seg END, '''' ORDER BY t.ord)) FROM regexp_split_to_table(regexp_replace(replace(p.prosrc, chr(13), ''), '--[^\n]*', '', 'g'), '''') WITH ORDINALITY AS t(seg, ord)), p.provolatile, p.prosecdef,
         coalesce(array_to_string(p.proconfig, ','), '') INTO v_md5, v_vol, v_def, v_cfg
    FROM pg_proc p WHERE p.oid = 'public.report_listing(text, text, text)'::regprocedure;
  IF v_md5 <> '26f972592d44f98c2fb89dc881a890c5' THEN RAISE EXCEPTION 'B19M4 P3: report_listing body is not the one written (fingerprint %)', v_md5; END IF;
  IF v_vol <> 'v' OR v_def <> true OR v_cfg NOT LIKE '%search_path=public%' THEN
    RAISE EXCEPTION 'B19M4 P3: report_listing header changed (volatile %, definer %, config %)', v_vol, v_def, v_cfg;
  END IF;
  -- P4. The grants.
  IF has_function_privilege('anon', 'public.report_listing(text, text, text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_listing_reports(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_open_report_counts(uuid[])', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.report_listing(text, text, text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_listing_reports(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_open_report_counts(uuid[])', 'EXECUTE') THEN
    RAISE EXCEPTION 'B19M4 P4: the grants are not as written';
  END IF;
  -- P5. Each door with no caller is refused at its first gate.
  BEGIN
    PERFORM public.report_listing('zzzzzzzzzz', 'spam', NULL);
    RAISE EXCEPTION 'B19M4 P5: report_listing answered with no caller';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT; IF v_err <> 'not authenticated' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.admin_listing_reports(gen_random_uuid());
    RAISE EXCEPTION 'B19M4 P5: admin_listing_reports answered with no caller';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT; IF v_err NOT LIKE '%permission denied%' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.admin_open_report_counts(ARRAY[gen_random_uuid()]);
    RAISE EXCEPTION 'B19M4 P5: admin_open_report_counts answered with no caller';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_err = MESSAGE_TEXT; IF v_err NOT LIKE '%permission denied%' THEN RAISE; END IF;
  END;
  -- P6. The reason list is the constraint's, and the note cap is 500.
  SELECT pg_get_constraintdef(c.oid) INTO v_check FROM pg_constraint c
   WHERE c.conrelid = 'public.listing_reports'::regclass AND c.conname = 'listing_reports_reason_check';
  IF v_check IS NULL OR v_check NOT LIKE '%spam%' OR v_check NOT LIKE '%under18%' OR v_check NOT LIKE '%copyright%' OR v_check NOT LIKE '%other%' THEN
    RAISE EXCEPTION 'B19M4 P6: the reason list is not as written (%)', v_check;
  END IF;
  SELECT pg_get_constraintdef(c.oid) INTO v_check FROM pg_constraint c
   WHERE c.conrelid = 'public.listing_reports'::regclass AND c.conname = 'listing_reports_note_check';
  IF v_check IS NULL OR v_check NOT LIKE '%500%' THEN
    RAISE EXCEPTION 'B19M4 P6: the note cap is not as written (%)', v_check;
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261018180000') ON CONFLICT (version) DO NOTHING;
