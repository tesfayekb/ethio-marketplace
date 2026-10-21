# Bundle 22 — turn 20 v2 (after the close): each legal document's review dates and the admin menu's mark (DEC-219); a publisher's account can be deleted (INC-812): brief (saved unchanged, 2026-10-21)

```text
BUNDLE 22 — TURN 20 v2 (2026-10-21; after the close). THIS BRIEF REPLACES bundle-22-turn-20.md, stopped before STEP 0 on your rule "B4 One component per file.": save nothing from it. Its one change: C5's review dialog is no second component and no new file — it is JSX inside the LegalPage component itself, with its state in LegalPage. Tier A (Admin › Legal, the legal documents, the admin menu, account deletion). ONE MIGRATION BY THE TOOL (M16), FIRST — before any other change except B1's three allowlist lines; then the STOP for the operator's staging apply; then the rest after his "continue". FIFTEEN NEW KEYS (exact English and Amharic below; no existing key's wording changes — Knowledge D5). No package change. ONE AGENTS.md CHANGE (E1): the whole file, exact, by script — three new rules — the admin menu's alert (a new mechanism), INC-812's finality rule and where legal reviews live — with fifteen rules reworded shorter, 5,119 bytes from its line 13 (the budget is 5,120). Base: dev a70af1b1 (bundle 22 turn 19 v2). Parts, IN THIS ORDER: A — CI first; STEP 0; B — the allowlist lines, M16 by the tool, its read-backs, THE STOP REPORT and STOP; (after "continue") C — the app (C8: the legal pages show one language and no print button; C9: the legal pages on the house card surfaces — the operator's requests of 04:05–04:09); D — the tests; E — AGENTS.md, the docs, the roadmap, the launch gate, the changelog; the checks; THE END-TO-END CHECK; THE CI WAIT REPORT. Write the reports in English.

WHY
- DEC-219 (THE OPERATOR, 2026-10-21 02:3x New York, by question card: "Yes, every 6 months"): Admin › Legal shows each document's review due — every 6 months by default, a legal setting; "Reviewed — no change" is recorded with who, when and a note; a publish counts as a review; an overdue review shows on the admin menu. (DEC-220, the six-monthly legal watch, is a scheduled task outside the repository.)
- So: legal_settings gains review_months (default 6, 1–24), a fact like the others (the facts card edits it; each published version freezes it). A new table legal_reviews keeps each "Reviewed — no change". A document's last review is the later of its newest publish and its newest review; its next review is due review_months later; a document with no published version has none. Staff with legal:edit record a review with a note (step-up, audited). The admin menu's Legal entry shows a dot while any real document (terms, privacy, publishing — any country) is due; the server decides, for callers with legal:view only.
- INC-812 (registered 2026-10-21, Tier A — account deletion): legal_versions.published_by and created_by are `REFERENCES public.profiles(user_id) ON DELETE SET NULL` (M1 20261019063500 :56-:57) and the finality trigger refuses every UPDATE of a published version (M1 :151-:153), so the foreign key's SET NULL fails and the account of anyone who published or drafted a legal version can never be deleted. Census of the class (every table definition and added column in supabase/migrations, read by script): legal_versions is the only table whose row trigger refuses updates and that carries an ON DELETE SET NULL key. M16 re-declares legal_versions_finality with one change: an update of a published version that only sets published_by and/or created_by to NULL passes; every other change, and an update that changes nothing, is still refused. legal_reviews is built with the same rule. It names the reviewer's account, so it carries the reviewer's home_country_code (Knowledge E3), filled by the door from the reviewer's profile.
- The supervisor ran M16 on a scratch PostgreSQL 16 built from M1's legal tables, M14 and M15 before writing this brief: it applies in one transaction and its proofs pass. Before it, deleting a publisher's profile failed with "publishedIsFinal"; after it, the profile deletes and published_by and created_by read NULL, while a text change and an update that changes nothing are still refused. review_months 0, 25 and "x" are refused as badValue:review_months; 12 saves. The review door refuses a blank note (badValue:note), a document with no published version and a NULL id (nothingToReview), and a caller without legal:edit (permission denied); a review writes its row and an audit_log row 'legal.reviewed'. legal_review_overdue() is true for a staff caller while a real 'terms' document published 25 months ago is due, false after its review, never counts another person's e2e-rev-u document, and is false for a caller without legal:view. admin_legal_documents() carries 'review' {at, kind, by_name, note, due_at}, null for a document with no version. A deleted reviewer's review keeps its note with reviewed_by NULL; a review cannot be changed ("reviewIsFinal").

STEP 0 — save this file (the attached bundle-22-turn-20-v2.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-20-v2.md and paste its sha256sum. Tick nothing. No report file in the repository.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Part B (B1's three allowlist lines, then M16); THE STOP REPORT; STOP. After the operator's "continue": Parts C to E; the checks; THE END-TO-END CHECK; THE CI WAIT REPORT; END THE TURN. Do not stop anywhere else. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- The migration (G39): written ONCE, by your database tool, as the final literal text of the block below — never a stub, a comment-only apply or a draft; the tool applies it on ethio-prod the moment it is saved (the operator allows the "Modify Supabase database" dialog). You cannot write or copy files under supabase/migrations/ yourself: the tool writes that file. ethio-staging is the operator's (his SQL editor).
- Exact text (G43): the thirty string values (C7) and the whole AGENTS.md (E1) are copied from the saved brief by a script — never retyped.
- Run no stateful git command. Edits with your file-editing tool, in whatever form it takes; no authored scripts that rewrite files (the string and AGENTS.md copies excepted). Spec files are edited by hand (G37); shared helpers keep their defaults.
- Tests (G27, G38): no test writes legal_settings (a real row) — review_months is read, never set; every document a test makes is its own e2e- scratch document, removed in afterEach; no assertion loosened.
- Production reads are SELECT only, counts and definitions only — no row of a person.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Expected: the run on a70af1b1 (turn 19 v2), SUCCESS. Paste the lines of guards-last-failure.md that name a failed job and of e2e-last-failure.md that name a failed or retried test (both at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/). Any gating failure: read its body and fix it at its root cause first (G21, G38), named with its fix. (Expected: one retried pass, PW-30 desktop in lane 11 — non-gating, under INC-775/INC-780; no fix owed here.)
A2. Paste the first 24 lines of https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/local-backend-proof.md (expected: fourteen lanes, the email lane's four tests).

PART B — THE ALLOWLIST LINES, THEN M16 BY THE TOOL.
B0. Before M16, from ethio-prod's read tool (SELECT only), paste: (1) `select pg_get_functiondef('public.admin_set_legal_settings(jsonb)'::regprocedure);` — its body must equal M16's section 7 apart from its three named changes (the key review_months in the key list, in the number list with its bound, and in the assignments); (2) `select pg_get_functiondef('public.admin_legal_documents()'::regprocedure);` — equal to section 6 apart from the 'review' entry; (3) `select pg_get_functiondef('public.legal_versions_finality()'::regprocedure);` — equal to section 8 apart from the INC-812 condition. For each, say "equal apart from the named change" or paste the difference and STOP. (4) `select to_regclass('public.legal_reviews'), to_regprocedure('public.legal_review_overdue()'), to_regprocedure('public.admin_mark_legal_reviewed(uuid,text)');` (three NULLs); (5) `select max(version) from public.migration_marks;` (expected 20261021210000).
B1. FIRST the three allowlist lines (the migration guard reads them), each copied exactly:
  scripts/public-surface-allowlist.txt — two lines, right after the line that begins "admin_set_legal_settings |":
admin_mark_legal_reviewed | records "Reviewed — no change" for a legal document (bundle 22 turn 20, DEC-219); checks legal:edit and the step-up inside
legal_review_overdue | whether a legal document's review is due, for the admin menu (bundle 22 turn 20, DEC-219); false for a caller without legal:view; no personal data
  scripts/acceptance-doors-allowlist.txt — one line, between the lines that begin "admin_machine_translation(" and "admin_merge_attributes(" (the file is sorted):
admin_mark_legal_reviewed(uuid,text) | staff | Writes legal_reviews, audit_log; rejects callers lacking legal:edit before its mutations
  THEN M16 by the tool. The mark 20261022090000 must be later than the stamp the tool gives the file: if the UTC time is past 2026-10-22 07:00 when you reach B1, STOP and ask for a new mark. Run `bash scripts/check-migrations.sh` after the file exists and paste its last lines ("Self-marking guard OK", "Real-row proof guard OK" and "Migration guard OK.").
B2. THE TEXT CHECK: write M16's block below — from its first line (the comment naming its e2e areas, the first line after "M16 — the text the tool writes, exactly:") through its last line (the INSERT of the mark, the line before the empty line that precedes PART C) — from the saved docs/governance/briefs/bundle-22-turn-20-v2.md to a scratch file outside the repository with a script (never by hand), and run `diff -w <scratch file> <the saved migration file>`; paste the result (expected: no difference).
B3. Read back on ethio-prod: `select version from public.migration_marks where version = '20261022090000';` (one row); `select review_months from public.legal_settings;` (6); `select c.relrowsecurity, (select count(*) from pg_policy p where p.polrelid = c.oid) from pg_class c where c.oid = 'public.legal_reviews'::regclass;` (t, 4); `select proname, prosecdef, provolatile, proconfig from pg_proc where pronamespace = 'public'::regnamespace and proname in ('admin_legal_documents','admin_mark_legal_reviewed','admin_set_legal_settings','legal_review_due','legal_review_overdue','legal_reviews_finality','legal_versions_finality') order by 1;` (seven rows: legal_review_due, legal_reviews_finality and legal_versions_finality f, the four others t; admin_mark_legal_reviewed, admin_set_legal_settings and the two finality functions v, the other three s; search_path=public on all seven); `select has_function_privilege('authenticated','public.admin_mark_legal_reviewed(uuid,text)','EXECUTE'), has_function_privilege('authenticated','public.legal_review_overdue()','EXECUTE'), has_function_privilege('authenticated','public.legal_review_due(uuid)','EXECUTE');` (t, t, f); `select position('INC-812' in pg_get_functiondef('public.legal_versions_finality()'::regprocedure)) > 0;` (t).
THE STOP REPORT (then STOP): <START>; A1's and A2's lines; the sha256sum; B0's five outputs; B1's three lines as written and the migration file's path; B1's guard lines; B2's diff; B3's six read-backs; and the operator's line: "apply <the uuid fragment of the migration file's name> → expect mark 20261022090000".

M16 — the text the tool writes, exactly:
-- e2e-areas: legal
-- Bundle 22 turn 20 — M16 (mark 20261022090000): the legal review dates (DEC-219) and INC-812.
--  1. legal_settings gains review_months (default 6, 1 to 24): how often each legal document is reviewed. It is a
--     fact like the others: the facts card edits it and each published version freezes it.
--  2. legal_reviews: one row per "Reviewed — no change" (the document, who, the reviewer's home country — Knowledge E3 —,
--     when, a note of 1 to 2000 characters).
--     Final: no UPDATE, except the foreign key's own SET NULL when the reviewer's profile is deleted; removed with
--     its document (scratch cleanup); closed to the browser roles (deny policies, no grants).
--  3. legal_review_due(document): the later of the document's newest publish and newest review, plus review_months;
--     NULL while it has no published version. Internal: no browser grant.
--  4. admin_mark_legal_reviewed(document, note): legal:edit and the step-up; refuses a document with no published
--     version (nothingToReview) and an empty or long note (badValue:note); writes the review and audits
--     legal.reviewed.
--  5. legal_review_overdue(): true when a real document (terms, privacy, publishing — any country) or the caller's
--     own e2e-rev-u<id> scratch document is due; false for a caller without legal:view. The admin menu reads it.
--  6. admin_legal_documents(), re-declared whole from M14 (20261021053239 :61-:103); one change: each document
--     carries 'review' — the newest publish or review (at, kind, by_name, note) and due_at — or null.
--  7. admin_set_legal_settings, re-declared whole from M15 (20261021070531 :36-:184); one change: the key
--     review_months (1 to 24) — in the key list, the number list with its bound, and the assignments.
--  8. INC-812: legal_versions_finality, re-declared whole from M1 (20261019063500 :142-:166); one change: the
--     foreign key's SET NULL of published_by or created_by passes, so a person who published or drafted a legal
--     version can have the account deleted.
-- Proofs: each function's volatility, security and grants, the table's policies, review_months, both doors' new text,
-- and scratch rows (removed) for the due date, the review's finality, the version's finality and the cascade.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261021210000') THEN
    RAISE EXCEPTION 'bundle 22 turn 19 M15 (mark 20261021210000) must be applied first';
  END IF;
END $$;

-- ===== 1 — the review period =====
ALTER TABLE public.legal_settings
  ADD COLUMN review_months integer NOT NULL DEFAULT 6
    CONSTRAINT legal_settings_review_months_check CHECK (review_months BETWEEN 1 AND 24);

-- ===== 2 — the reviews =====
CREATE TABLE public.legal_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES public.legal_documents(id) ON DELETE CASCADE,
  reviewed_by uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  home_country_code char(2) NULL REFERENCES public.countries(code),
  reviewed_at timestamptz NOT NULL DEFAULT now(),
  note text NOT NULL CONSTRAINT legal_reviews_note_check CHECK (length(btrim(note)) BETWEEN 1 AND 2000)
);
CREATE INDEX legal_reviews_document ON public.legal_reviews(document_id, reviewed_at DESC);
REVOKE ALL ON public.legal_reviews FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.legal_reviews TO service_role;
ALTER TABLE public.legal_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY legal_reviews_deny_select ON public.legal_reviews FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY legal_reviews_deny_insert ON public.legal_reviews FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY legal_reviews_deny_update ON public.legal_reviews FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY legal_reviews_deny_delete ON public.legal_reviews FOR DELETE TO anon, authenticated USING (false);

CREATE FUNCTION public.legal_reviews_finality()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
BEGIN
  -- Deleting the reviewer's profile sets reviewed_by to NULL (the foreign key); that update, and only that one,
  -- passes (INC-812's rule).
  IF NEW.reviewed_by IS NULL AND OLD.reviewed_by IS NOT NULL
     AND (to_jsonb(NEW) - 'reviewed_by') = (to_jsonb(OLD) - 'reviewed_by') THEN
    RETURN NEW;
  END IF;
  RAISE EXCEPTION 'reviewIsFinal';
END;
$$;
REVOKE ALL ON FUNCTION public.legal_reviews_finality() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER legal_reviews_finality
BEFORE UPDATE ON public.legal_reviews
FOR EACH ROW EXECUTE FUNCTION public.legal_reviews_finality();

-- ===== 3 — the due date =====
CREATE FUNCTION public.legal_review_due(p_document_id uuid)
RETURNS timestamptz
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $$
  SELECT greatest(
           (SELECT max(v.published_at) FROM public.legal_versions v
             WHERE v.document_id = p_document_id AND v.status = 'published'),
           (SELECT max(r.reviewed_at) FROM public.legal_reviews r WHERE r.document_id = p_document_id))
         + make_interval(months => (SELECT s.review_months FROM public.legal_settings s WHERE s.id))
   WHERE EXISTS (SELECT 1 FROM public.legal_versions v
                  WHERE v.document_id = p_document_id AND v.status = 'published');
$$;
REVOKE ALL ON FUNCTION public.legal_review_due(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_review_due(uuid) TO service_role;

-- ===== 4 — "Reviewed — no change" =====
CREATE FUNCTION public.admin_mark_legal_reviewed(p_document_id uuid, p_note text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid  uuid := auth.uid();
  v_note text := btrim(coalesce(p_note, ''));
  v_row  public.legal_reviews%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
  IF p_document_id IS NULL OR NOT EXISTS (SELECT 1 FROM public.legal_versions v
                                           WHERE v.document_id = p_document_id AND v.status = 'published') THEN
    RAISE EXCEPTION 'nothingToReview';
  END IF;
  IF length(v_note) < 1 OR length(v_note) > 2000 THEN RAISE EXCEPTION 'badValue:note'; END IF;
  INSERT INTO public.legal_reviews (document_id, reviewed_by, home_country_code, note)
  VALUES (p_document_id, v_uid,
          (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = v_uid), v_note)
  RETURNING * INTO v_row;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.reviewed', 'legal_document', p_document_id::text,
          jsonb_build_object('review_id', v_row.id, 'note', v_note));
  RETURN jsonb_build_object('reviewed_at', v_row.reviewed_at, 'due_at', public.legal_review_due(p_document_id));
END;
$$;
REVOKE ALL ON FUNCTION public.admin_mark_legal_reviewed(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_mark_legal_reviewed(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_mark_legal_reviewed(uuid, text) TO service_role;

-- ===== 5 — the admin menu's mark =====
CREATE FUNCTION public.legal_review_overdue()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL OR NOT public.has_permission(v_uid, 'legal', 'view') THEN RETURN false; END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.legal_documents d
     WHERE (d.kind IN ('terms', 'privacy', 'publishing')
            OR d.kind = 'e2e-rev-u' || replace(v_uid::text, '-', ''))
       AND public.legal_review_due(d.id) <= now());
END;
$$;
REVOKE ALL ON FUNCTION public.legal_review_overdue() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.legal_review_overdue() TO authenticated;
GRANT ALL ON FUNCTION public.legal_review_overdue() TO service_role;

-- ===== 6 — the documents list (re-declared whole; one change: 'review') =====
CREATE OR REPLACE FUNCTION public.admin_legal_documents()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'document_id', d.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'review', (SELECT jsonb_build_object('at', e.at, 'kind', e.kind, 'by_name', p.display_name,
                                                  'note', e.note, 'due_at', public.legal_review_due(d.id))
                          FROM (SELECT v.published_at AS at, 'publish'::text AS kind, v.published_by AS who,
                                       NULL::text AS note
                                  FROM public.legal_versions v
                                 WHERE v.document_id = d.id AND v.status = 'published'
                                UNION ALL
                                SELECT r.reviewed_at, 'review', r.reviewed_by, r.note
                                  FROM public.legal_reviews r
                                 WHERE r.document_id = d.id) e
                          LEFT JOIN public.profiles p ON p.user_id = e.who
                         ORDER BY e.at DESC, (e.kind = 'review') DESC
                         LIMIT 1),
             'versions', coalesce((
               SELECT jsonb_agg(jsonb_build_object(
                        'version_id', v.id,
                        'version', v.version,
                        'status', v.status,
                        'label', v.label,
                        'material', v.material,
                        'effective_at', v.effective_at,
                        'published_at', v.published_at,
                        'published_by_name', p.display_name,
                        'acceptances', (SELECT count(*) FROM public.legal_acceptances a
                                         WHERE a.version_id = v.id),
                        'signed_in_unaccepted', public.legal_signed_in_unaccepted(v.id),
                        'created_at', v.created_at)
                      ORDER BY v.version DESC)
                 FROM public.legal_versions v
                 LEFT JOIN public.profiles p ON p.user_id = v.published_by
                WHERE v.document_id = d.id), '[]'::jsonb))
           ORDER BY array_position(ARRAY['terms', 'privacy', 'publishing'], d.kind) NULLS LAST,
                    d.kind, d.country_code NULLS FIRST)
      FROM public.legal_documents d), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_legal_documents() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_legal_documents() TO authenticated;
GRANT ALL ON FUNCTION public.admin_legal_documents() TO service_role;

-- ===== 7 — the settings door (re-declared whole; one change: review_months) =====
CREATE OR REPLACE FUNCTION public.admin_set_legal_settings(p_settings jsonb)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_before jsonb;
  v_after  public.legal_settings%ROWTYPE;
  v_key    text;
  v_text   text;
  v_num    integer;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
  IF p_settings IS NULL OR jsonb_typeof(p_settings) <> 'object' THEN RAISE EXCEPTION 'badValue:settings'; END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key NOT IN ('operator_name','operator_address','legal_email','privacy_email','governing_law',
                     'providers','copyright_agent','liability_limit_usd','notice_days','response_days',
                     'response_extra_days','deleted_ad_keep_months','dispute_keep_years',
                     'operator_details','legal_phone','security_email','listed_ad_keep_months',
                     'account_keep_months','technical_keep_months','sold_visible_days',
                     'appeal_months','claims_limit_months','talk_first_days','complaint_ack_days',
                     'review_months') THEN
      RAISE EXCEPTION 'badValue:%', v_key;
    END IF;
  END LOOP;
  -- Every number is checked before anything is written, so a bad value is refused as badValue:<key>
  -- and never reaches the table's CHECK constraints (INC-762).
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key IN ('liability_limit_usd','notice_days','response_days','response_extra_days',
                 'deleted_ad_keep_months','dispute_keep_years','listed_ad_keep_months',
                 'account_keep_months','technical_keep_months','sold_visible_days',
                 'appeal_months','claims_limit_months','talk_first_days','complaint_ack_days',
                 'review_months') THEN
      v_text := p_settings ->> v_key;
      IF v_text IS NULL OR v_text !~ '^[0-9]{1,7}$' THEN RAISE EXCEPTION 'badValue:%', v_key; END IF;
      v_num := v_text::integer;
      IF (v_key = 'liability_limit_usd' AND v_num > 1000000)
         OR (v_key = 'notice_days' AND v_num > 365)
         OR (v_key = 'response_days' AND (v_num < 1 OR v_num > 90))
         OR (v_key = 'response_extra_days' AND v_num > 90)
         OR (v_key = 'deleted_ad_keep_months' AND (v_num < 1 OR v_num > 120))
         OR (v_key = 'dispute_keep_years' AND v_num > 20)
         OR (v_key IN ('listed_ad_keep_months','account_keep_months','technical_keep_months')
             AND (v_num < 1 OR v_num > 120))
         OR (v_key = 'sold_visible_days' AND (v_num < 1 OR v_num > 365))
         OR (v_key = 'appeal_months' AND (v_num < 1 OR v_num > 24))
         OR (v_key = 'claims_limit_months' AND (v_num < 1 OR v_num > 60))
         OR (v_key IN ('talk_first_days','complaint_ack_days') AND (v_num < 1 OR v_num > 90))
         OR (v_key = 'review_months' AND (v_num < 1 OR v_num > 24)) THEN
        RAISE EXCEPTION 'badValue:%', v_key;
      END IF;
    END IF;
  END LOOP;
  -- The new texts are checked before anything is written as well (M3).
  IF p_settings ? 'operator_details' AND length(coalesce(p_settings ->> 'operator_details', '')) > 2000 THEN
    RAISE EXCEPTION 'badValue:operator_details';
  END IF;
  IF p_settings ? 'legal_phone' AND coalesce(p_settings ->> 'legal_phone', '') <> ''
     AND (p_settings ->> 'legal_phone') !~ '^\+?[0-9][0-9 ()-]{4,37}[0-9]$' THEN
    RAISE EXCEPTION 'badValue:legal_phone';
  END IF;
  IF p_settings ? 'security_email'
     AND coalesce(p_settings ->> 'security_email', '') !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'badValue:security_email';
  END IF;
  IF p_settings ? 'security_email' AND length(p_settings ->> 'security_email') > 320 THEN
    RAISE EXCEPTION 'badValue:security_email';
  END IF;
  SELECT to_jsonb(s) - 'id' - 'updated_by' INTO v_before FROM public.legal_settings s WHERE s.id FOR UPDATE;
  -- The proof of acceptance must outlive the window for claims (rev 108 item 2): a closed account's identity is
  -- kept at least as long as the claims limit, checked here so it is refused as badValue:<key>, never by the CHECK.
  IF (CASE WHEN p_settings ? 'account_keep_months' THEN (p_settings ->> 'account_keep_months')::integer
           ELSE (v_before ->> 'account_keep_months')::integer END)
     < (CASE WHEN p_settings ? 'claims_limit_months' THEN (p_settings ->> 'claims_limit_months')::integer
             ELSE (v_before ->> 'claims_limit_months')::integer END) THEN
    RAISE EXCEPTION 'badValue:account_keep_months';
  END IF;
  UPDATE public.legal_settings SET
    operator_name = CASE WHEN p_settings ? 'operator_name' THEN p_settings ->> 'operator_name' ELSE operator_name END,
    operator_address = CASE WHEN p_settings ? 'operator_address' THEN p_settings ->> 'operator_address' ELSE operator_address END,
    legal_email = CASE WHEN p_settings ? 'legal_email' THEN p_settings ->> 'legal_email' ELSE legal_email END,
    privacy_email = CASE WHEN p_settings ? 'privacy_email' THEN p_settings ->> 'privacy_email' ELSE privacy_email END,
    governing_law = CASE WHEN p_settings ? 'governing_law' THEN p_settings ->> 'governing_law' ELSE governing_law END,
    providers = CASE WHEN p_settings ? 'providers' THEN p_settings ->> 'providers' ELSE providers END,
    copyright_agent = CASE WHEN p_settings ? 'copyright_agent'
                           THEN NULLIF(p_settings ->> 'copyright_agent', '') ELSE copyright_agent END,
    liability_limit_usd = CASE WHEN p_settings ? 'liability_limit_usd'
                               THEN (p_settings ->> 'liability_limit_usd')::integer ELSE liability_limit_usd END,
    notice_days = CASE WHEN p_settings ? 'notice_days'
                       THEN (p_settings ->> 'notice_days')::integer ELSE notice_days END,
    response_days = CASE WHEN p_settings ? 'response_days'
                         THEN (p_settings ->> 'response_days')::integer ELSE response_days END,
    response_extra_days = CASE WHEN p_settings ? 'response_extra_days'
                               THEN (p_settings ->> 'response_extra_days')::integer ELSE response_extra_days END,
    deleted_ad_keep_months = CASE WHEN p_settings ? 'deleted_ad_keep_months'
                                  THEN (p_settings ->> 'deleted_ad_keep_months')::integer ELSE deleted_ad_keep_months END,
    dispute_keep_years = CASE WHEN p_settings ? 'dispute_keep_years'
                              THEN (p_settings ->> 'dispute_keep_years')::integer ELSE dispute_keep_years END,
    operator_details = CASE WHEN p_settings ? 'operator_details'
                            THEN NULLIF(btrim(coalesce(p_settings ->> 'operator_details', '')), '') ELSE operator_details END,
    legal_phone = CASE WHEN p_settings ? 'legal_phone'
                       THEN NULLIF(btrim(coalesce(p_settings ->> 'legal_phone', '')), '') ELSE legal_phone END,
    security_email = CASE WHEN p_settings ? 'security_email' THEN p_settings ->> 'security_email' ELSE security_email END,
    listed_ad_keep_months = CASE WHEN p_settings ? 'listed_ad_keep_months'
                                 THEN (p_settings ->> 'listed_ad_keep_months')::integer ELSE listed_ad_keep_months END,
    account_keep_months = CASE WHEN p_settings ? 'account_keep_months'
                               THEN (p_settings ->> 'account_keep_months')::integer ELSE account_keep_months END,
    technical_keep_months = CASE WHEN p_settings ? 'technical_keep_months'
                                 THEN (p_settings ->> 'technical_keep_months')::integer ELSE technical_keep_months END,
    sold_visible_days = CASE WHEN p_settings ? 'sold_visible_days'
                             THEN (p_settings ->> 'sold_visible_days')::integer ELSE sold_visible_days END,
    appeal_months = CASE WHEN p_settings ? 'appeal_months'
                         THEN (p_settings ->> 'appeal_months')::integer ELSE appeal_months END,
    claims_limit_months = CASE WHEN p_settings ? 'claims_limit_months'
                               THEN (p_settings ->> 'claims_limit_months')::integer ELSE claims_limit_months END,
    talk_first_days = CASE WHEN p_settings ? 'talk_first_days'
                           THEN (p_settings ->> 'talk_first_days')::integer ELSE talk_first_days END,
    complaint_ack_days = CASE WHEN p_settings ? 'complaint_ack_days'
                              THEN (p_settings ->> 'complaint_ack_days')::integer ELSE complaint_ack_days END,
    review_months = CASE WHEN p_settings ? 'review_months'
                         THEN (p_settings ->> 'review_months')::integer ELSE review_months END,
    updated_at = now(),
    updated_by = v_uid
   WHERE id
  RETURNING * INTO v_after;
  -- Per-field validation after assignment so the CHECK bounds and the text rules share one refusal shape.
  FOREACH v_text IN ARRAY ARRAY[v_after.legal_email, v_after.privacy_email] LOOP
    IF v_text IS NULL OR v_text !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN RAISE EXCEPTION 'badValue:email'; END IF;
  END LOOP;
  IF v_after.operator_name IS NULL OR length(btrim(v_after.operator_name)) = 0
     OR length(v_after.operator_name) > 2000 THEN RAISE EXCEPTION 'badValue:operator_name'; END IF;
  IF v_after.operator_address IS NULL OR length(btrim(v_after.operator_address)) = 0
     OR length(v_after.operator_address) > 2000 THEN RAISE EXCEPTION 'badValue:operator_address'; END IF;
  IF v_after.governing_law IS NULL OR length(btrim(v_after.governing_law)) = 0
     OR length(v_after.governing_law) > 2000 THEN RAISE EXCEPTION 'badValue:governing_law'; END IF;
  IF v_after.providers IS NULL OR length(btrim(v_after.providers)) = 0
     OR length(v_after.providers) > 2000 THEN RAISE EXCEPTION 'badValue:providers'; END IF;
  IF v_after.copyright_agent IS NOT NULL AND length(v_after.copyright_agent) > 2000 THEN
    RAISE EXCEPTION 'badValue:copyright_agent';
  END IF;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.settings_set', 'legal_settings', 'settings',
          jsonb_build_object('before', v_before, 'after', to_jsonb(v_after) - 'id' - 'updated_by'));
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_set_legal_settings(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_legal_settings(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_legal_settings(jsonb) TO service_role;

-- ===== 8 — INC-812: the version finality (re-declared whole; one change: the foreign key's SET NULL) =====
CREATE OR REPLACE FUNCTION public.legal_versions_finality()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
DECLARE
  v_scratch boolean;
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.status = 'published'
     -- INC-812: deleting a person's profile makes the foreign key set published_by or created_by to NULL;
     -- that update, and only that one, passes.
     AND NOT ((to_jsonb(NEW) - 'published_by' - 'created_by') = (to_jsonb(OLD) - 'published_by' - 'created_by')
              AND (NEW.published_by IS NULL OR NEW.published_by = OLD.published_by)
              AND (NEW.created_by IS NULL OR NEW.created_by = OLD.created_by)
              AND (NEW.published_by IS DISTINCT FROM OLD.published_by
                   OR NEW.created_by IS DISTINCT FROM OLD.created_by)) THEN
    RAISE EXCEPTION 'publishedIsFinal';
  END IF;
  IF TG_OP = 'DELETE' AND OLD.status = 'published' THEN
    SELECT d.kind ~ '^e2e-' INTO v_scratch FROM public.legal_documents d WHERE d.id = OLD.document_id;
    IF NOT (coalesce(v_scratch, false) AND auth.role() = 'service_role') THEN
      RAISE EXCEPTION 'publishedIsFinal';
    END IF;
  END IF;
  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at := now();
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;
REVOKE ALL ON FUNCTION public.legal_versions_finality() FROM PUBLIC, anon, authenticated;

-- ===== 9 — proofs (a failure raises; a clean apply is the pass) =====
DO $$
DECLARE
  v_def_docs text := pg_get_functiondef('public.admin_legal_documents()'::regprocedure);
  v_def_set  text := pg_get_functiondef('public.admin_set_legal_settings(jsonb)'::regprocedure);
  v_months   integer;
  v_doc      uuid;
  v_version  uuid;
  v_review   uuid;
  v_pub      timestamptz := date_trunc('second', now()) - interval '2 months';
  v_at       timestamptz;
  v_refused  boolean;
BEGIN
  -- Headers.
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.admin_mark_legal_reviewed(uuid,text)'::regprocedure
                    AND p.prosecdef AND p.provolatile = 'v' AND p.proconfig @> ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof: admin_mark_legal_reviewed header';
  END IF;
  IF (SELECT count(*) FROM pg_proc p
       WHERE p.oid IN ('public.legal_review_overdue()'::regprocedure, 'public.admin_legal_documents()'::regprocedure)
         AND p.prosecdef AND p.provolatile = 's' AND p.proconfig @> ARRAY['search_path=public']) <> 2 THEN
    RAISE EXCEPTION 'proof: legal_review_overdue or admin_legal_documents header';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.legal_review_due(uuid)'::regprocedure
                    AND NOT p.prosecdef AND p.provolatile = 's' AND p.proconfig @> ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof: legal_review_due header';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.admin_set_legal_settings(jsonb)'::regprocedure
                    AND p.prosecdef AND p.provolatile = 'v' AND p.proconfig @> ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof: admin_set_legal_settings header changed';
  END IF;
  -- Grants: two signed-in doors; the due date and both trigger functions closed to the browser roles.
  IF has_function_privilege('anon', 'public.admin_mark_legal_reviewed(uuid,text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_mark_legal_reviewed(uuid,text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.legal_review_overdue()', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.legal_review_overdue()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.legal_review_due(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.legal_review_due(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.legal_reviews_finality()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.legal_versions_finality()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_legal_documents()', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_legal_documents()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_set_legal_settings(jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_set_legal_settings(jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof: a function grant is wrong';
  END IF;
  -- The table: RLS on, four deny policies, no browser privilege.
  IF NOT (SELECT c.relrowsecurity FROM pg_class c WHERE c.oid = 'public.legal_reviews'::regclass)
     OR (SELECT count(*) FROM pg_policy p WHERE p.polrelid = 'public.legal_reviews'::regclass) <> 4
     OR has_table_privilege('authenticated', 'public.legal_reviews', 'SELECT')
     OR has_table_privilege('anon', 'public.legal_reviews', 'SELECT') THEN
    RAISE EXCEPTION 'proof: legal_reviews is not closed';
  END IF;
  -- The column and both doors' new text.
  IF (SELECT pg_get_expr(d.adbin, d.adrelid) FROM pg_attrdef d
        JOIN pg_attribute a ON a.attrelid = d.adrelid AND a.attnum = d.adnum
       WHERE d.adrelid = 'public.legal_settings'::regclass AND a.attname = 'review_months') IS DISTINCT FROM '6'
     OR NOT EXISTS (SELECT 1 FROM pg_constraint c WHERE c.conrelid = 'public.legal_settings'::regclass
                     AND c.conname = 'legal_settings_review_months_check') THEN
    RAISE EXCEPTION 'proof: review_months default or bound';
  END IF;
  IF position('review_months = CASE' IN v_def_set) = 0
     OR position('''review_months'' AND (v_num < 1 OR v_num > 24)' IN v_def_set) = 0 THEN
    RAISE EXCEPTION 'proof: admin_set_legal_settings does not take review_months';
  END IF;
  IF position('''review'', (SELECT jsonb_build_object' IN v_def_docs) = 0
     OR position('''signed_in_unaccepted'', public.legal_signed_in_unaccepted(v.id)' IN v_def_docs) = 0 THEN
    RAISE EXCEPTION 'proof: admin_legal_documents lost the count or lacks the review';
  END IF;
  -- Scratch rows (removed at the end): the due date follows the newest publish, then the newest review.
  SELECT s.review_months INTO v_months FROM public.legal_settings s WHERE s.id;
  INSERT INTO public.legal_documents (kind, country_code)
  VALUES ('e2e-m16-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 12), NULL)
  RETURNING id INTO v_doc;
  IF public.legal_review_due(v_doc) IS NOT NULL THEN
    RAISE EXCEPTION 'proof: a document with no published version has a due date';
  END IF;
  INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog, material,
                                     effective_at, published_at, settings_snapshot)
  VALUES (v_doc, 1, 'published', 'v1', 'M16 proof', 'M16 proof', 'M16 proof', false,
          v_pub, v_pub, '{"seed": "M16 proof"}'::jsonb)
  RETURNING id INTO v_version;
  IF public.legal_review_due(v_doc) IS DISTINCT FROM v_pub + make_interval(months => v_months) THEN
    RAISE EXCEPTION 'proof: the due date does not follow the publish';
  END IF;
  INSERT INTO public.legal_reviews (document_id, reviewed_by, note)
  VALUES (v_doc, NULL, 'M16 proof')
  RETURNING id, reviewed_at INTO v_review, v_at;
  IF public.legal_review_due(v_doc) IS DISTINCT FROM v_at + make_interval(months => v_months) THEN
    RAISE EXCEPTION 'proof: the due date does not follow the review';
  END IF;
  -- A review is final.
  v_refused := false;
  BEGIN
    UPDATE public.legal_reviews SET note = 'changed' WHERE id = v_review;
  EXCEPTION WHEN raise_exception THEN
    v_refused := SQLERRM = 'reviewIsFinal';
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'proof: a review can be changed'; END IF;
  -- A published version stays final: a text change and an update that changes nothing are refused.
  v_refused := false;
  BEGIN
    UPDATE public.legal_versions SET body_en = 'changed' WHERE id = v_version;
  EXCEPTION WHEN raise_exception THEN
    v_refused := SQLERRM = 'publishedIsFinal';
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'proof: a published text can be changed'; END IF;
  v_refused := false;
  BEGIN
    UPDATE public.legal_versions SET published_by = NULL WHERE id = v_version;
  EXCEPTION WHEN raise_exception THEN
    v_refused := SQLERRM = 'publishedIsFinal';
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'proof: an update that changes nothing passes the finality rule'; END IF;
  -- No caller: the menu's mark is false and the door refuses.
  IF public.legal_review_overdue() THEN RAISE EXCEPTION 'proof: the mark is true for no caller'; END IF;
  v_refused := false;
  BEGIN
    PERFORM public.admin_mark_legal_reviewed(v_doc, 'M16 proof');
  EXCEPTION WHEN raise_exception THEN
    v_refused := SQLERRM = 'not authenticated';
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'proof: the review door does not refuse a missing caller'; END IF;
  -- Cleanup; the review goes with its document.
  DELETE FROM public.legal_versions WHERE id = v_version;
  DELETE FROM public.legal_documents WHERE id = v_doc;
  IF EXISTS (SELECT 1 FROM public.legal_reviews WHERE id = v_review) THEN
    RAISE EXCEPTION 'proof: a review outlived its document';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261022090000') ON CONFLICT DO NOTHING;

PART C — THE APP (after the operator's "continue"). Line numbers are at a70af1b1; census each file before editing (CENSUS-BEFORE-BUILD).
C1. The fact. src/features/admin/legal/legal-service.ts: FACT_KEYS (:35-:59) gains "review_months" after "complaint_ack_days" (:58) — 24 facts. src/features/admin/legal/facts-validation.ts: FACT_BOUNDS gains `review_months: [1, 24]` after `complaint_ack_days: [1, 90]` (:17). The facts card (legal-facts-card.tsx) then shows and edits it with its label admin.legal.fact.review_months, as every fact.
C2. The documents' review, in src/features/admin/legal/legal-service.ts:
  - a type `LegalReview = { at: string; kind: "publish" | "review"; by_name: string | null; note: string | null; due_at: string | null }`; LegalDocument gains `review: LegalReview | null` (the door's 'review'; read it through listLegalDocuments the way it reads the rest — census first);
  - `markLegalReviewed(input: { documentId: string; note: string }): Promise<void>` → rpc "admin_mark_legal_reviewed" with { p_document_id, p_note }, throwing the door's error as the other writers do;
  - `getLegalReviewOverdue(): Promise<boolean>` → rpc "legal_review_overdue"; an answer that is not a boolean throws (no default);
  - a pure `reviewState(review: LegalReview | null, now: number): "none" | "due" | "overdue"` — "none" when review or its due_at is null; "overdue" when Date.parse(due_at) <= now; otherwise "due";
  - the refusals map (:101-:110) gains `nothingToReview: "admin.legal.error.nothingToReview"`.
  THE TESTS THAT READ THE DOCUMENTS LIST (census at a70af1b1, grep "admin_legal_documents" and "listLegalDocuments" in e2e and src): e2e/legal-doors.spec.ts LG-9 (:966-:1016; that the answer is an array) and LG-10 (:1018-; its only toEqual is on the versions' numbers, [2, 1]); none asserts a document's whole shape, so the new 'review' key breaks none.
C3. src/features/admin/legal/use-legal.ts: useLegalWrites() gains `review` (mutationFn markLegalReviewed, mutationKey ADMIN_LEGAL_KEY, onSuccess the same refresh as the others); a new `useLegalReviewOverdue(enabled: boolean)` — queryKey [...ADMIN_LEGAL_KEY, "reviewOverdue"], queryFn getLegalReviewOverdue, `enabled`, staleTime five minutes. Because its key sits under ADMIN_LEGAL_KEY, every legal write's refresh (a publish, a review, a facts save) re-reads it.
C4. src/features/admin/legal/legal-page.tsx, renderDocument (:64): right after the document's heading (:72, `<h3 …>{scope(doc.country_code)}</h3>`), when doc.review is not null, a block `data-testid="legal-review"` with `data-state={reviewState(doc.review, now)}` and `data-due-at={doc.review.due_at ?? ""}`:
  - first line: admin.legal.review.lastBy — {date} = date(review.at), {name} = review.by_name — or admin.legal.review.lastOn ({date} only) when by_name is null or empty;
  - when review.kind is "review" and its note is not empty: admin.legal.review.note with {note} (the note as text);
  - when the state is "overdue": admin.legal.review.overdue, {date} = date(review.due_at), in text-destructive, data-testid="legal-review-overdue"; when "due": admin.legal.review.due, {date} = date(review.due_at), data-testid="legal-review-due";
  - when mayEdit (:45): a Button variant="outline" data-testid="legal-review-mark", label admin.legal.action.markReviewed, that opens C5's dialog for this document.
  A document whose review is null (no published version) shows none of this. The page's StepUpGate guard (:204, `{(guard) => (`) reaches the dialog the way it reaches LegalFactsCard.
C5. The review dialog — no second component and no new file (your rule "B4 One component per file.", and the platform counts a new source file as a new module): JSX inside the LegalPage component in src/features/admin/legal/legal-page.tsx, with its state in LegalPage — the document under review (or none), the note and the error line — and ONE Dialog rendered once on the page, opened by C4's button for its document; built with the primitives legal-publish-dialog.tsx uses (Dialog, DialogContent, DialogTitle, DialogDescription and Button; census it first): title admin.legal.review.title; description admin.legal.review.help with {months} = the facts' review_months; a textarea labelled admin.legal.review.noteLabel, data-testid="legal-review-note", maxLength 2000; Save — label admin.legal.action.saveReview, data-testid="legal-review-save" — trims the note: an empty note shows admin.legal.error.noteRequired in data-testid="legal-review-error" and sends nothing; otherwise it runs `guard(() => writes.review.mutateAsync({ documentId, note }))`; a refusal shows t(legalErrorKey(error)) in the same error line and keeps the dialog open; success closes the dialog, and the page shows admin.legal.review.saved in a `role="status"` line, data-testid="legal-review-saved". Cancel (common.cancel) closes it and sends nothing.
C6. THE ADMIN MENU'S ALERT (a new mechanism; its AGENTS.md rule is E1's):
  - src/config/panels.types.ts: `export type NavAlertId = "legalReview";` and NavItem (:15-:51) gains `alert?: NavAlertId` with a doc comment: "A section the server says needs attention: the rail draws a dot on its icon and adds the alert's words to its accessible name. Never a count."
  - src/features/admin/sections.ts: AdminSectionShape (:16-:28) gains `readonly alert?: NavAlertId;`; the legal section (:150-:156) gains `alert: "legalReview",`. No other section has one.
  - src/features/admin/rail-items.ts: toItem (:73-:81) passes the section's alert when it has one (derived from sections.ts, never a second list).
  - A new src/features/admin/nav-alerts.ts: `useNavAlerts(enabled: boolean, permissions: readonly string[]): ReadonlySet<NavAlertId>` — calls useLegalReviewOverdue(enabled && permissions.includes("legal:view")) and returns a set holding "legalReview" exactly when its data is true; and `NAV_ALERT_LABELS: Record<NavAlertId, MessageKey> = { legalReview: "admin.nav.alert.legalReview" }`.
  - src/components/shell/app-rail.tsx: in the component that builds the nodes (`const { auth, activePanel } = useShell();` :658), call useNavAlerts(activePanel === "admin", auth.permissions) once; RailNode (:177-:200) gains `alert?: boolean`; toNode (:683-:696) sets, for an item whose alert is in the set, `alert: true` and `accessibleLabel: \`${label} — ${t(NAV_ALERT_LABELS[alert])}\`` (children go through the same toNode). RailRow draws it on the icon the way it draws the favourite's star (:242-:249): the icon inside a `relative` span with `<span aria-hidden="true" data-testid="rail-alert" className="absolute -end-0.5 -top-0.5 h-2 w-2 rounded-full bg-destructive" />`, and puts `data-alert="true"` on the element that carries the row's data-testid (rail-item-ad-legal). Census every branch that renders a row (rail, menu, strip, tooltip-wrapped; :268, :313, :323, :421, :456) and draw it in each — the favourite branch shows the pattern. Only a row with an alert changes: every other row renders as today. THE TESTS THAT READ ADMIN MENU ROWS (grep at a70af1b1): e2e/admin-shell.spec.ts :159-:173, :224-:227, :320 and :373 (rows by test id: visible, absent, the active class) and :408-:423 (iconBox, the icon's box); none reads a row's accessible name or attributes. The alert shows only to a caller with legal:view while a real document, or the caller's own e2e-rev-u document, is due, so those tests meet today's rows; and an alert row's icon keeps its box (the dot is absolute, inside a span of the icon's own size).
C7. The strings — fifteen new keys, copied by a script from these lines of the saved brief (the text after "en: " and after "am: ", to the end of the line): the fourteen admin.legal.* keys right after "admin.legal.fact.complaint_ack_days" (en.ts :3205, am.ts :3049), in this order; admin.nav.alert.legalReview right after "admin.nav.label" (en.ts :497, am.ts :479).
  key: admin.legal.fact.review_months
  en: Review the documents every, months
  am: ሰነዶቹ የሚገመገሙበት ድግግሞሽ፣ በወራት
  key: admin.legal.review.lastBy
  en: Last reviewed {date} by {name}
  am: ለመጨረሻ ጊዜ {date} በ{name} ተገምግሟል
  key: admin.legal.review.lastOn
  en: Last reviewed {date}
  am: ለመጨረሻ ጊዜ {date} ተገምግሟል
  key: admin.legal.review.note
  en: Note: {note}
  am: ማስታወሻ፦ {note}
  key: admin.legal.review.due
  en: Next review due {date}
  am: ቀጣዩ ግምገማ በ{date} ይደርሳል
  key: admin.legal.review.overdue
  en: Review overdue since {date}
  am: ግምገማው ከ{date} ጀምሮ ዘግይቷል
  key: admin.legal.action.markReviewed
  en: Mark reviewed
  am: እንደተገመገመ መዝግብ
  key: admin.legal.review.title
  en: Reviewed — no change
  am: ተገምግሟል — ለውጥ የለም
  key: admin.legal.review.help
  en: Record that you read this document and it needs no change. The next review falls due {months} months from today.
  am: ይህን ሰነድ እንዳነበቡትና ለውጥ እንደማያስፈልገው ይመዝግቡ። ቀጣዩ ግምገማ ከዛሬ {months} ወራት በኋላ ይደርሳል።
  key: admin.legal.review.noteLabel
  en: What you checked
  am: ምን እንደፈተሹ
  key: admin.legal.action.saveReview
  en: Save review
  am: ግምገማውን አስቀምጥ
  key: admin.legal.review.saved
  en: Review recorded.
  am: ግምገማው ተመዝግቧል።
  key: admin.legal.error.noteRequired
  en: Write what you checked.
  am: ምን እንደፈተሹ ይጻፉ።
  key: admin.legal.error.nothingToReview
  en: This document has no published version to review.
  am: ይህ ሰነድ የሚገመገም የታተመ ስሪት የለውም።
  key: admin.nav.alert.legalReview
  en: Review due
  am: ግምገማ ደርሷል
  Paste each Amharic value's code points as written to am.ts; expected:
  admin.legal.fact.review_months: 0x1230 0x1290 0x12f6 0x1279 0x20 0x12e8 0x121a 0x1308 0x1218 0x1308 0x1219 0x1260 0x1275 0x20 0x12f5 0x130d 0x130d 0x121e 0x123d 0x1363 0x20 0x1260 0x12c8 0x122b 0x1275
  admin.legal.review.lastBy: 0x1208 0x1218 0x1328 0x1228 0x123b 0x20 0x130a 0x12dc 0x20 0x7b 0x64 0x61 0x74 0x65 0x7d 0x20 0x1260 0x7b 0x6e 0x61 0x6d 0x65 0x7d 0x20 0x1270 0x1308 0x121d 0x130d 0x121f 0x120d
  admin.legal.review.lastOn: 0x1208 0x1218 0x1328 0x1228 0x123b 0x20 0x130a 0x12dc 0x20 0x7b 0x64 0x61 0x74 0x65 0x7d 0x20 0x1270 0x1308 0x121d 0x130d 0x121f 0x120d
  admin.legal.review.note: 0x121b 0x1235 0x1273 0x12c8 0x123b 0x1366 0x20 0x7b 0x6e 0x6f 0x74 0x65 0x7d
  admin.legal.review.due: 0x1240 0x1323 0x12e9 0x20 0x130d 0x121d 0x1308 0x121b 0x20 0x1260 0x7b 0x64 0x61 0x74 0x65 0x7d 0x20 0x12ed 0x12f0 0x122d 0x1233 0x120d
  admin.legal.review.overdue: 0x130d 0x121d 0x1308 0x121b 0x12cd 0x20 0x12a8 0x7b 0x64 0x61 0x74 0x65 0x7d 0x20 0x1300 0x121d 0x122e 0x20 0x12d8 0x130d 0x12ed 0x1277 0x120d
  admin.legal.action.markReviewed: 0x12a5 0x1295 0x12f0 0x1270 0x1308 0x1218 0x1308 0x1218 0x20 0x1218 0x12dd 0x130d 0x1265
  admin.legal.review.title: 0x1270 0x1308 0x121d 0x130d 0x121f 0x120d 0x20 0x2014 0x20 0x1208 0x12cd 0x1325 0x20 0x12e8 0x1208 0x121d
  admin.legal.review.help: 0x12ed 0x1205 0x1295 0x20 0x1230 0x1290 0x12f5 0x20 0x12a5 0x1295 0x12f3 0x1290 0x1260 0x1261 0x1275 0x1293 0x20 0x1208 0x12cd 0x1325 0x20 0x12a5 0x1295 0x12f0 0x121b 0x12eb 0x1235 0x1348 0x120d 0x1308 0x12cd 0x20 0x12ed 0x1218 0x12dd 0x130d 0x1261 0x1362 0x20 0x1240 0x1323 0x12e9 0x20 0x130d 0x121d 0x1308 0x121b 0x20 0x12a8 0x12db 0x122c 0x20 0x7b 0x6d 0x6f 0x6e 0x74 0x68 0x73 0x7d 0x20 0x12c8 0x122b 0x1275 0x20 0x1260 0x128b 0x120b 0x20 0x12ed 0x12f0 0x122d 0x1233 0x120d 0x1362
  admin.legal.review.noteLabel: 0x121d 0x1295 0x20 0x12a5 0x1295 0x12f0 0x1348 0x1270 0x1239
  admin.legal.action.saveReview: 0x130d 0x121d 0x1308 0x121b 0x12cd 0x1295 0x20 0x12a0 0x1235 0x1240 0x121d 0x1325
  admin.legal.review.saved: 0x130d 0x121d 0x1308 0x121b 0x12cd 0x20 0x1270 0x1218 0x12dd 0x130d 0x1267 0x120d 0x1362
  admin.legal.error.noteRequired: 0x121d 0x1295 0x20 0x12a5 0x1295 0x12f0 0x1348 0x1270 0x1239 0x20 0x12ed 0x133b 0x1349 0x1362
  admin.legal.error.nothingToReview: 0x12ed 0x1205 0x20 0x1230 0x1290 0x12f5 0x20 0x12e8 0x121a 0x1308 0x1218 0x1308 0x121d 0x20 0x12e8 0x1273 0x1270 0x1218 0x20 0x1235 0x122a 0x1275 0x20 0x12e8 0x1208 0x12cd 0x121d 0x1362
  admin.nav.alert.legalReview: 0x130d 0x121d 0x1308 0x121b 0x20 0x12f0 0x122d 0x1237 0x120d
  Add them however this project adds a key (the usage maps are written by the map guard at the end of the checks). They are new keys only: no existing key's wording changes (Knowledge D5).
C8. ONE LANGUAGE ON THE LEGAL PAGES, AND NO PRINT BUTTON (THE OPERATOR, 2026-10-21 04:05–04:08 New York: "can we make sure amharic version is only when the user changes to maharic and english version only when user changes to English"; "we may have more languages in future"; on the Print button, by question card: "Remove it"):
  - src/features/legal/legal-document-page.tsx (the public /terms, /privacy and /legal/<kind> page): the text shown is the site's language only — `language === "am" ? body_am : body_en`, with `language` from useI18n(); the page's own language state (:54), its LegalLangSwitch (:115-:119) and its Print button (:120-:128) go. LegalLangSwitch itself (:15-:41) then has no reader and is removed. A person reads the other language by switching the site's language (the Terms' "Translations" clause: where a translation differs, the English text applies).
  - src/features/legal/my-legal-version.tsx (a person's own accepted version): the same — its language state, its LegalLangSwitch (:49) and its Print button (:50-:58) go; the site's language decides.
  - Staff pages (Admin › Legal: the version view, its compare, download and print) are unchanged: staff need both languages.
  - Knowledge D5: a key no longer read is retired. At a70af1b1 `legal.page.print` is read only by the two removed Print buttons and `legal.lang.label` only by LegalLangSwitch (grep), so both leave en.ts and am.ts; `legal.lang.en` and `legal.lang.am` stay (my-legal-page.tsx :76 reads them). Census again after the edit and name any other key the removals leave unread.
  - The `data-print-root` wrappers stay (the browser's own print uses them).
C9. THE LEGAL PAGES ON THE HOUSE SURFACES (THE OPERATOR, 2026-10-21 04:09 New York, with a photo of the acceptance screen: "All pages should have consistent designs and themes"). Census of the class (G29) at a70af1b1, every page that wraps its content in PageShell (grep): the account and settings pages draw their text and forms on Section (src/components/layout/section.tsx, CARD_SURFACE), sign-in on PageCard (src/routes/auth.tsx :342), the admin pages on PageCard or the table blocks, and the feeds, tables, the wizard and the ad page draw their own card surfaces; the four legal pages are the only text or form pages that sit bare on the page background. So, with the shared primitives only (no new class, no new colour):
  - src/features/legal/legal-accept-screen.tsx (:81-:83): its column (max-w-2xl, kept) becomes one PageCard holding everything inside it — the title, the lead, the liability line, the documents, the tick, the two buttons and the note — as the sign-in card does.
  - src/features/legal/legal-document-page.tsx: the title and the meta line stay on the page; the upcoming notice and the text (LegalText with its contents list) sit in one Section.
  - src/features/legal/my-legal-page.tsx: its two lists (:52 the accepted versions, :94 the legal e-mails) each become a Section whose title is the list's heading — the account page's pattern (account-overview.tsx :98-:216).
  - src/features/legal/my-legal-version.tsx: the text (:60-:76) sits in one Section; the Back link stays outside it.
  Every data-testid stays. No test reads these pages' surfaces (grep "layout-section", "CARD_SURFACE" and "boundingBox" in e2e/legal-*.spec.ts, and "terms", "privacy" and "legal" in e2e/a11y.spec.ts and e2e/layout.spec.ts: none), so C9 owes no test change; the operator judges the look in the bundle's walk.

PART D — THE TESTS.
D1. src/features/admin/legal/facts-validation.test.ts: the shared `valid` fixture gains review_months: "6"; the bounds table gains ["review_months", 1, 24].
D2. src/features/admin/legal/legal-service.test.ts: "lists the 23 facts in order, without providers" becomes the 24 facts in order (review_months after complaint_ack_days); new cases for reviewState: null → "none"; a review whose due_at is null → "none"; due_at one minute after now → "due"; due_at equal to now → "overdue"; due_at a day before now → "overdue".
D3. A new src/features/admin/rail-items.test.ts: in ADMIN_NAV_ITEMS (children included) the item whose path is "/admin/legal" carries alert "legalReview", and no other item carries an alert.
D4. e2e/legal-admin.spec.ts (by hand):
  - LGA-1 (:178): its key list gains "review_months" after "complaint_ack_days" — the 24 facts in FACT_KEYS' order — and its message reads "the facts card shows the 24 facts".
  - LGA-4 (:351): also fills legal-fact-input-review_months with "25" and sees legal-fact-error-review_months — before any request (updated_at unchanged), Cancel restoring the value.
  - A small helper in the spec, `rpcAs(person, fn, args)`, the same fetch shape as accept() (:156-:175: passwordGrant, apikey and Bearer token, POST /rest/v1/rpc/<fn>), returning the status and the parsed body.
  - NEW LGA-16 "a document's review: its publish counts; Reviewed — no change with a note moves the due date and is audited; a blank note sends nothing; the door refuses a person without legal:edit": a scratch document (scratch("rev"), seed() — published a minute ago); as the job super admin, /admin/legal; inside legal-doc-<kind>-global, legal-review has data-state "due" and data-due-at equal to the service client's `rpc("legal_review_due", { p_document_id })` (that due date lies between 28 × review_months and 31 × review_months + 1 days after the version's published_at; review_months read from facts(), never written); legal-review-mark → Save with an empty note → legal-review-error visible and no legal_reviews row for the document (service client); a note "LGA-16 read, no change" → Save → legal-review-saved visible; the service client reads one legal_reviews row with that note and reviewed_by = the super admin's id, and one audit_log row with action "legal.reviewed" and entity_id = the document's id; the block now shows the note and data-due-at equals legal_review_due again, later than before. Then a leased user (leaseUser(), no role) calls admin_mark_legal_reviewed through rpcAs: refused with "permission denied", still one review row.
  - NEW LGA-17 "an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view reads false": the document's kind is `e2e-rev-u` + the super admin's id without hyphens (the server counts only real kinds and the caller's own e2e-rev-u document, so no other worker sees it); add it to `kinds` (afterEach removes it) and destroy() it first in case a stale one is left (INC-428). Precondition, read by the service client: no terms, privacy or publishing document on this backend is due (legal_review_due <= now) — if one is, fail with the message "[e2e:legal-admin] a real legal document is due on this backend; LGA-17 cannot judge the admin menu's mark". Seed it with version 1 published (and effective) 25 months ago — beyond any review_months. As the super admin: legal-review data-state "overdue", legal-review-overdue visible; `[data-testid="rail-item-ad-legal"][data-alert="true"]` exists (the rail has viewport twins: count them, never .first()) and holds rail-alert; rpcAs(the super admin, "legal_review_overdue") → true. Mark it reviewed with a note → legal-review-saved; data-state "due"; no `[data-testid="rail-item-ad-legal"][data-alert="true"]` remains; rpcAs → false. A leased user's rpcAs("legal_review_overdue") → false.
  - NEW LGA-18 "INC-812: the account of someone who published a legal version can be deleted; the version keeps its text and loses only the name": createUser({ confirmed: true }) (a target account to delete — your AGENTS.md rule allows createUser for it); a scratch document whose version 1 is published with published_by and created_by = that account (service client insert, like seed()); `adminClient().auth.admin.deleteUser(<id>)` succeeds (errors through authErrorText); the version reads published_by null and created_by null, status "published" and the same body_en. (Red-first: the supervisor's scratch run in WHY showed the deletion failing with "publishedIsFinal" before M16.)
  Leased and created accounts only; no real legal document is written; legal_settings is read, never written.
D5. src/features/legal/legal-document-page.test.tsx (:40-:66): the case renders the page under the site language English and reads "One a@example.invalid", then under Amharic and reads "Amharic one" (set the language the way this file's render helper sets i18n — census it); no legal-public-lang-* button exists.
D6. e2e/legal-pages.spec.ts LGP-2 (:134): its title's "Amharic, Print," becomes "the site's language,"; where it clicked legal-public-lang-am (:153), `switchLanguage(page, "am")` (e2e/helpers/ui.ts :1214) and legal-text contains "Amharic current text"; legal-public-print and legal-public-lang-am have count 0; where it clicked legal-public-lang-en (:170), `switchLanguage(page, "en")`. The rest unchanged.
D7. e2e/legal-history.spec.ts LGH-2 (:160): its title's "language switch, Print," becomes "the site's language,"; :175-:178 become `switchLanguage(page, "am")` → legal-text contains "Amharic history text", `switchLanguage(page, "en")`, and my-legal-print and my-legal-lang-am have count 0.

PART E — AGENTS.md, THE DOCS, THE ROADMAP, THE LAUNCH GATE, THE CHANGELOG.
E1. AGENTS.md: replace the whole file with the block below (from the line "<!-- LOVABLE:BEGIN -->" through the line that begins "- Draft saves:"), copied from the saved brief by a script, ending with one newline. Paste `sha256sum AGENTS.md` (expected 549097e4f7337fa8d7fb61a49e78cd0fc70c5d1423aa0fa2d2485dc84ee15548), `tail -n +13 AGENTS.md | wc -c` (expected 5119) and `bun x prettier --check AGENTS.md`. Its changes against a70af1b1, each shortening keeping its rule's meaning: three new rules ("A finality trigger lets its own ON DELETE SET NULL keys through (INC-812)." added to the browser-roles rule; "reviews are rows of legal_reviews (DEC-219)" added to the Legal rule; "Admin menu alerts (DEC-219) …" after the Legal rule), and shorter wording in the browser-roles, database-tool, leaseUser, CI-evidence, market-neutral, read-all-pages, browser-tests, scanner, console-save, action-label, brief-string, ownValue, preview-budget, QR and page-wide-data rules.

AGENTS.md — the whole file, exactly:
<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Project constitution (all agents)

Follow Lovable Project Knowledge and /docs/conventions.md. Task-named files only; no extras; honesty first: disclose limits; search before creating; no duplicates. 360px-first, logical RTL CSS; no literal UI text (EN+AM keys). Tables: RLS/policies/GRANTs in the same append-only migration; personal data: home_country_code. UTC timestamps; integer money; no secrets in code/commits. Server/RLS alone authorizes. No silent catch-and-continue. Public pages: SSR, absolute canonical/og URLs. Structural edits update /docs/features/<name>.md + \_changelog.md together.

- New tables, sequences and functions in schema public are born closed to browser roles: the migration names each GRANT (a browser grant needs its line in scripts/public-surface-allowlist.txt); each new function restates REVOKE … FROM PUBLIC (bundle 8). A finality trigger lets its own ON DELETE SET NULL keys through (INC-812). Owner writes to ads, photos and seller names pass the acceptance_guard trigger (DEC-216; takedowns pass); other signed-in write doors check acceptance or are in scripts/acceptance-doors-allowlist.txt (D227).
- The database tool applies its input at once: check a scratch copy, then submit FINAL text once (never a stub, comment or draft); remove scratch drafts.
- Text attributes are validated by preset allowlist (`attr_preset_ok`), never free regex; option records use the strict shape `value, label_en, label_am, parent, active, bounds, aliases` — unknown keys refused, defaults omitted (DEC-050).
- A console save never drops a field it does not show: editors round-trip every stored field (INC-188).
- E2E tests needing only a signed-in account use `leaseUser()` (lane pool, reaped at lease); `createUser()` only for a new identity or a target account. Why: deleted users still count as MAU (DEC-097).
- CI evidence: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ — ci-status.md, then e2e-last-failure.md and guards-last-failure.md; never dev/main copies or a git fetch of it (DEC-098, S87).
- Market-neutral wording (DEC-094): where a statement depends on the market, name no single country; use {country}. Cultural facts (teff, the Ethiopian calendar, brands) are not market statements.
- Data-API lists use `readAllPages` (src/lib/read-all-pages.ts): keyset paging on a unique key, never positional (INC-452).
- Lint workflows with `actionlint -shellcheck= -pyflakes=`, as CI does (INC-457, INC-460).
- Browser tests start only with `bun run e2e:local` or `bun run e2e:changed`, never plain `playwright test` (production `.env`, INC-464); targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1`: https, hosted-like auth and mail), CI's only gate (local-backend-proof.yml, DEC-218); never supabase/config.toml (D228).
- CI lanes run 2 test workers, smoke and email 1 (DEC-217); cross-worker interference or a new flaky test returns them to 1. Why: one worker made a lane take 19 min.
- Scanner output in CI logs and ci-evidence is counts only; details stay in the Security tab (DEC-132).
- Action labels: two or three words, no article or bracketed remark, every language; explanations go in help text, never a button (D81). A label scripts/list-action-labels.test.ts flags takes the brief's shorter text; its allowlist needs a reason.
- A brief's string text is copied by key, character for character; no Amharic of your own (bundle 7 turn 5).
- When a door gains a refusal, the census names every caller and the order each reaches it (INC-481).
- A map indexed by an outside key is read through `ownValue` (src/lib/own-key.ts), never `map[key]` (INC-485).
- Cut names use CutText; crowded-row captions use useLabelRoom on their own row; action-focus modality installs once at hydration (grapheme floors kept, no resize loops or duplicate listeners).
- Flake-fix proofs use manual Flake check, separate from CI/promotion: no local browsers (DEC-184).
- Import previews in tests use `withinPreviewBudget` (e2e/helpers/rate-window.ts); only IG-3 drives the limit, never raised (INC-792).
- QR encoding stays in `src/server/qr.ts`; public QR routes check the id's shape without database reads; a guard keeps the encoder off first paint.
- Shell (bundle 21): cards take `CARD_SURFACE` (src/components/layout/surface.ts): no 1-px border, state borders on top; one ☰ per width, top-left (rail-menu below 768, folds the menu from 768); md tables use `tbl-md:` (D135, D115, D204).
- Legal (bundle 22): texts render only via `LegalText` (src/features/legal), never as HTML; facts are {{setting}} tokens from the version's frozen settings; reviews are rows of legal_reviews (DEC-219).
- Admin menu alerts (DEC-219): a section's `alert` (sections.ts) is read by `useNavAlerts` (src/features/admin/nav-alerts.ts) as one server boolean; the rail draws a dot. Why: one derived menu.
- Page-wide data (the category tree) is one subscribed store (`useSyncExternalStore`), never a per-mount copy (INC-788).
- Draft saves: a run armed before a Next never carries it; a follow-up is sent by the run that got the answer (INC-791).

E2. docs/features/legal.md, a new section at its end:

## Turn 20 — review dates and the admin menu's mark (DEC-219); INC-812

- **The operator's decision (2026-10-21).** Admin › Legal shows each document's review due — every 6 months by default, a legal setting; "Reviewed — no change" is recorded with who, when and a note; a publish counts as a review; an overdue review shows on the admin menu.
- **M16, mark 20261022090000.** `legal_settings.review_months` (default 6, 1–24) is a fact: the facts card edits it and each published version freezes it. `legal_reviews` keeps each "Reviewed — no change" (document, who, when, note); it is final, closed to the browser roles and removed with its document. `legal_review_due(document)` is the later of the newest publish and the newest review, plus `review_months`; there is none while the document has no published version.
- **The doors.** `admin_mark_legal_reviewed(document, note)`: legal:edit and the step-up; refuses `nothingToReview` and `badValue:note`; audits `legal.reviewed`. `legal_review_overdue()`: true while a terms, privacy or publishing document (any country), or the caller's own `e2e-rev-u<id>` test document, is due; false without legal:view. `admin_legal_documents()` carries each document's `review`.
- **INC-812.** A finality trigger lets its own ON DELETE SET NULL keys through: deleting the account of someone who published or drafted a legal version sets `published_by` and `created_by` to NULL; every other change to a published version is still refused.
- **One language per page.** /terms, /privacy, /legal/<kind> and a person's own version page show the text in the site's language only, with no print button (the operator, 2026-10-21); staff pages keep both languages.
- **The house surfaces.** The acceptance screen sits in one PageCard; the public legal page's text, the person's two legal lists and his version's text each sit in a Section — like the account and settings pages (the operator, 2026-10-21: "All pages should have consistent designs and themes").
- **Tests.** LGA-16 (the review line, the dialog, the audit, the door's refusal), LGA-17 (overdue: the card and the menu's mark, cleared by a review; false without legal:view), LGA-18 (INC-812); unit cases for the 24 facts, the bound, reviewState and the menu item's alert.

E3. docs/features/admin-shell.md, a new section at its end:

## Menu alerts (bundle 22 turn 20, DEC-219)

A section in `src/features/admin/sections.ts` may name an `alert`. `useNavAlerts` (`src/features/admin/nav-alerts.ts`) reads each alert as one server boolean — today `legalReview`, from `legal_review_overdue()`, for users with legal:view — and the rail draws a dot on that section's icon, with the alert's words in the entry's accessible name and `data-alert="true"` on the row. Never a count; the server decides.

E4. roadmap.md:
  - line 3 is replaced whole by: "The brief in force: docs/governance/briefs/bundle-22-turn-20-v2.md (bundle 22 — turn 20, after the close: each legal document's review dates and the admin menu's mark, DEC-219; the account of someone who published a legal version can be deleted, INC-812). Next: the operator imports and publishes the three legal texts in Admin › Legal (DEC-221); before launch a real phone number replaces the placeholder in the legal facts, published as a Correction; the privacy-request inbox before launch (D229, spec owed); the Publish and the one walk of bundle 22; the banned-items and safety pages after the curator's research; the flake-and-cleanup turn; bundle 23 — the business-name rule (D222) after reserved-names v5.2; D199 (discount / sale) after the peer research and the operator's rulings; D200's state."
  - the line that begins "  - [ ] Turn 19 (docs/governance/briefs/bundle-22-turn-19.md;" gets [x], names docs/governance/briefs/bundle-22-turn-19-v2.md (the file turn 19's STEP 0 saved — the supervisor's slip S357), and at its end " — CI: run 39561502286 on a70af1b1, SUCCESS; main promoted";
  - the line that begins "  - [ ] Turn 20 (owed; one migration, Tier A; strings) —" begins instead "  - [ ] Turn 20 (docs/governance/briefs/bundle-22-turn-20-v2.md; one migration M16, mark 20261022090000; fifteen strings; INC-812) —", the rest unchanged.
  - right after that Turn 20 line, a new line: "  - [ ] When a third language is added (owed; spec first) — the legal texts move to one row per language (today body_en and body_am); the legal pages show the site's language and, for a document not yet translated, the English text with a one-line note (the operator 2026-10-21: "we may have more languages in future")"
E5. docs/governance/launch-gate.md APPEND at its end:

## Added 2026-10-21 (bundle 22 turn 20)

- [ ] The legal phone is a real number: a placeholder was entered in the Admin › Legal facts on 2026-10-21 (the operator). Get the number (a free Google Voice number), put it in "Phone for legal matters" and in the copyright agent's line, and publish the Terms of Service as a Correction — NOT DONE (reminder 2026-10-28 20:05 New York).

E6. docs/_changelog.md APPEND one line: "- 2026-10-21 — Bundle 22 turn 20, after the close (one migration, M16; fifteen strings): each legal document shows when it was last reviewed and when its next review is due (every review_months months, default 6, a legal fact); staff record "Reviewed — no change" with a note; the admin menu's Legal entry shows a dot while a review is overdue (DEC-219); the account of someone who published or drafted a legal version can be deleted (INC-812); the public legal pages and a person's own version page show only the site's language, without a print button; the acceptance screen and the legal pages sit on the house card surfaces."

THE CHECKS (whole; paste the last line of each; when a check fails, paste its whole failure block): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` alone, not while a browser run overlaps it (more than 1290 — paste the count); `bash scripts/check-migrations.sh` "Migration guard OK."; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `SELF_TEST=1 bun scripts/check-acceptance-doors.ts` refusing all three fixture names; the guard on the live production list (turn 17's B1 query, run again after M16) → "117 write doors: 4 check, 113 allowlisted — legal 1, account 8, staff 81, draft 3, signal 3, helper 5; owed 0, guarded 10, takedown 2" (paste it; a different count is reported with its reason); the code points (C7); E1's three outputs; the preview harness's "build OK"; at the end, `bun run i18n:map-guard` "usage maps match the tree".

THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it: sign in when it needs a session, run the flow with real input, and confirm the result reads back through the UI."). Where: ethio-staging, after the operator has applied M16 there (his "continue" says so), with your three staging credentials — never production. The flows: a staff member signed in reads the 24 facts and is refused a review period of 25 before anything is sent (LGA-1, LGA-4); sees a document's last review and next due date, records "Reviewed — no change" with a note and reads it back (LGA-16); sees an overdue document on the card and the menu's mark, which a review clears (LGA-17); an account that published a legal version is deleted (LGA-18). A visitor reads /terms in the site's language only, and the other language after switching the site's language (LGP-2, LGH-2). Run `bun run e2e:local -- e2e/legal-admin.spec.ts --retries=0` (expected 36 passed: 18 tests × 2 projects) and `bun run e2e:local -- e2e/admin-shell.spec.ts --retries=0` (the rail), `bun run e2e:local -- e2e/legal-pages.spec.ts --retries=0` and `bun run e2e:local -- e2e/legal-history.spec.ts --retries=0` (one language, no print, the surfaces) and `bun run e2e:local -- e2e/legal-accept.spec.ts --retries=0` (the acceptance screen's card) — each file whole, both projects. Paste each summary line and every failure body; a failure is read at its root cause and fixed in this turn (G21, G38). Nothing in this check is deferred; if a test cannot run, STOP and report why.

SCOPE — these files only: the brief; scripts/public-surface-allowlist.txt and scripts/acceptance-doors-allowlist.txt (B1); the migration file the tool writes (M16); src/integrations/supabase/types.ts if the tool regenerates it; src/features/admin/legal/legal-service.ts, facts-validation.ts, use-legal.ts and legal-page.tsx (C1–C5); src/config/panels.types.ts, src/features/admin/sections.ts, src/features/admin/rail-items.ts, the new src/features/admin/nav-alerts.ts and src/components/shell/app-rail.tsx (C6); src/i18n/locales/en.ts and am.ts (C7) and the two usage maps the map guard writes; src/features/admin/legal/facts-validation.test.ts, src/features/admin/legal/legal-service.test.ts, the new src/features/admin/rail-items.test.ts, e2e/legal-admin.spec.ts (D1–D4); src/features/legal/legal-document-page.tsx and my-legal-version.tsx (C8, C9); src/features/legal/legal-accept-screen.tsx and my-legal-page.tsx (C9); src/features/legal/legal-document-page.test.tsx, e2e/legal-pages.spec.ts, e2e/legal-history.spec.ts (D5–D7); AGENTS.md (E1); docs/features/legal.md (E2); docs/features/admin-shell.md (E3); roadmap.md (E4); docs/governance/launch-gate.md (E5); docs/_changelog.md (E6); the files of an A1 fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No package change.
THE CI WAIT REPORT: done or not done by part; C's diffs; the code points; D's tests in full; the checks; the end-to-end check's outputs; `git diff --stat <START>`; `git diff --name-only <START>` (count the files from this list); anything not foreseen; the line "The project's own check follows on GitHub: the CI run on <the commit this turn leaves> — the lanes replay M16 from scratch and run LGA-1, LGA-4 and LGA-16 to LGA-18; the next brief's Part A reads it." Then END THE TURN; send nothing after the report.
REVERT: a later migration that drops legal_reviews, the four new functions and review_months, and restores admin_legal_documents from M14's file (20261021053239 :61-:103), admin_set_legal_settings from M15's (20261021070531 :36-:184) and legal_versions_finality from M1's (20261019063500 :142-:166) — never an edit of M16 — with git revert of this turn's other commits.
```
