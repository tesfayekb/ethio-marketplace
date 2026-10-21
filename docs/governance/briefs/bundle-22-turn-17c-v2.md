# Bundle 22 — turn 17c v2 (after the close): Admin › Legal counts who signed in without accepting; two workers per CI lane; the temporary backend's accounts listable (D227, DEC-217, INC-808): brief (saved unchanged, 2026-10-21)

```text
BUNDLE 22 — TURN 17c v2 (2026-10-21; after the close). THIS BRIEF REPLACES bundle-22-turn-17c.md, stopped before STEP 0 on your rule "Record each technical or architecture decision in the project's root `AGENTS.md` as one rule with a one-line why.": save nothing from it. Its one change: F5 adds DEC-217's rule to AGENTS.md, as you asked. Tier A. ONE MIGRATION BY THE TOOL (M14), FIRST — before any other change; then the STOP for the operator's staging apply; then the rest after his "continue". ONE STRING (English and Amharic, exact text below). No package change. AGENTS.md: DEC-217's rule added (F5), and eight lines shortened with their meaning kept so the part after the Lovable block stays within its 5,120 bytes. The turn's other changes are a feature on an existing door (M14, recorded in docs/features/legal.md) and fixes (INC-808, recorded in docs/features/ci-local-backend.md); if your rule asks for another AGENTS.md rule, STOP before saving and quote it. Base: dev edfa9c80 (bundle 22 turn 17b v2; CI run 1080 green; main = edfa9c80). Parts, IN THIS ORDER: A — CI first; STEP 0; B — M14 by the tool, its read-backs, THE STOP REPORT and STOP; (after "continue") C — the screen and the string; D — the test; E — CI: two workers per lane, the fixture accounts, the auth error text; F — the docs, the roadmap, the changelog, AGENTS.md; the checks; THE END-TO-END CHECK; THE CI WAIT REPORT. Write the reports in English.

WHY
- D227 (3), the operator's direction (2026-10-20): "no user scapes". Tests never run on production, so production gets its own check: Admin › Legal shows, for each version in force, how many accounts accepted it (today: "Accepted by …") AND how many signed in after it took effect without accepting it. A person who owes is stopped on every page (LAC-1), so this number is the people who signed in and left without agreeing — or anyone who escaped.
- The count (M14, legal_signed_in_unaccepted): for a published version in force of a document asked at sign-in (terms, privacy, or the person seam e2e-acc-u<the user id without dashes> of M13): the accounts whose last sign-in (auth.users.last_sign_in_at, which admin_get_user already reads — migration 20260816120338 :287, :306) is at or after the version's effective time and that have not accepted the version legal_acceptance_pending asks for at that version (the newest published material version, or version 1, up to it) or a later one; the document's country rule is legal_acceptance_pending's. Any other version (a draft, a scheduled one) or kind (publishing, other scratch kinds): no number, and the screen shows no line. Its limits, for the docs: "last sign-in" is a sign-in, not a visit — a person who stays signed in is counted only after signing in again; a deleted account is not counted. The supervisor ran M14 on a scratch PostgreSQL 16 with the real legal tables' definitions before writing this brief: it applies, its proofs pass, and the counts are right for material versions, corrections, schedules, countries, the person seam and acceptance.
- DEC-217 (supervisor, frozen before any number, 2026-10-21 04:2xZ): the lanes run ONE worker (local-backend-proof.yml sets no E2E_WORKERS; playwright.config.ts :33 defaults to 1); the slowest lane takes about 19 minutes against 10–16 for the others (run 1080: lane 8 1,156 s, lane 1 1,093 s, lane 7 1,054 s). The lanes run 2 workers, as the staging shards did under DEC-024 (safe by the scratch-key identity law run×shard×worker×project×test; the account pool's seats are per worker); the smoke lane stays serial (DEC-024: "Smoke/email stay serial"). The rule, word for word: "KEEP when the first two CI runs after it have 0 failed lane tests, no test retried that did not retry in runs 1076/1077 (0 flaky then), and the slowest lane's job ≤ 900 s; REVERT to 1 worker (DEC-024's rule) at the first cross-worker interference failure or a new flaky test, or if the slowest lane does not drop below 1,000 s."
- INC-808: on every temporary backend the teardown cannot list users — "[e2e:teardown] WARNING could not list users for process <run>-<lane>: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them." (13 of 13 lanes, runs 1079 and 1080), so no lane deletes its accounts. The "{}": @supabase/auth-js 2.110.9 (bun.lock :533), dist/main/lib/fetch.js :32-:42 — every 500…504 answer becomes AuthRetryableFetchError whose message is JSON.stringify(the Response) = "{}", so the auth server's own reason never reaches the log. HYPOTHESIS (its decisive line, the auth server's log, is unread): the workflow's fixture 20260809010129 (local-backend-proof.yml :140-:152) inserts four auth.users rows that leave confirmation_token, recovery_token, email_change_token_new and email_change NULL; the auth server reads those columns as text and its admin list fails on a NULL there; sign-in reads only the person signing in, and the fixture accounts never sign in, so no test meets it. Accounts the auth server creates (all of hosted's) hold '' there. The fix sets them to '' (parity), and every harness line that prints an auth admin error names its class and HTTP status, so if the hypothesis is wrong the next run names the real answer.

STEP 0 — save this file (the attached bundle-22-turn-17c-v2.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-17c-v2.md and paste its sha256sum. Tick nothing. No report file in the repository.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Part B (M14, FIRST); THE STOP REPORT; STOP. After the operator's "continue": Parts C to F; the checks; THE END-TO-END CHECK; THE CI WAIT REPORT; END THE TURN. Do not stop anywhere else. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- The migration (G39): written ONCE, by your database tool, as the final literal text of the block below — never a stub, a comment-only apply or a draft; the tool applies it on ethio-prod the moment it is saved (the operator allows the "Modify Supabase database" dialog). You cannot write or copy files under supabase/migrations/ yourself: the tool writes that file. ethio-staging is the operator's (his SQL editor).
- The string (G43): the two values below are copied from the saved brief by a script into en.ts and am.ts — never retyped.
- Run no stateful git command. Edits with your file-editing tool, in whatever form it takes; no authored scripts that rewrite files (the string copy excepted). Spec files are edited by hand (G37); shared helpers keep their defaults.
- Tests (G27, G38): scratch rows only, removed in an afterEach that survives a timeout; no real kind (terms, privacy) is ever published; no assertion loosened.
- Production reads are SELECT only, counts and definitions only — no row of a person.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Expected: run 1080 on edfa9c80 (turn 17b v2), SUCCESS — 32 jobs, main promoted. Paste the lines of guards-last-failure.md that name a failed job and of e2e-last-failure.md that name a failed or retried test (both at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/). Any gating failure: read its body and fix it at its root cause first (G21, G38), named with its fix.
A2. Paste the first 24 lines of https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/local-backend-proof.md (expected: 13 lanes, 2,133 passed, 0 failed, 0 flaky; slowest lane 8 1,156 s).

PART B — M14, BY THE TOOL, FIRST.
B0. Before M14, from ethio-prod's read tool (SELECT only), paste: (1) `select pg_get_functiondef('public.admin_legal_documents()'::regprocedure);` — its header must read plpgsql, STABLE, SECURITY DEFINER, search_path public, and its body (between the dollar quotes) must equal the body of M14's section 2 except the one added line `'signed_in_unaccepted', public.legal_signed_in_unaccepted(v.id),` (say so, or paste the difference and STOP); (2) `select to_regprocedure('public.legal_signed_in_unaccepted(uuid)');` (expected: null); (3) the newest mark: `select max(version) from public.migration_marks;` (expected 20261021180000).
B1. The mark 20261021200000 must be later than the stamp the tool gives the file: if the UTC time is past 2026-10-21 18:00 when you reach B1, STOP and ask for a new mark. Run `bash scripts/check-migrations.sh` after the file exists and paste its last lines ("Self-marking guard OK" and "Migration guard OK.").
B2. THE TEXT CHECK: write M14's block below — from its first line (the comment naming its e2e areas, the first line after "M14 — the text the tool writes, exactly:") through its last line (the INSERT of the mark, the line before the empty line that precedes PART C) — from the saved docs/governance/briefs/bundle-22-turn-17c-v2.md to a scratch file outside the repository with a script (never by hand), and run `diff -w <scratch file> <the saved migration file>`; paste the result (expected: no difference).
B3. Read back on ethio-prod: `select version from public.migration_marks where version = '20261021200000';` (one row); `select p.proname, p.prosecdef, p.provolatile, p.proconfig from pg_proc p where p.oid in ('public.legal_signed_in_unaccepted(uuid)'::regprocedure, 'public.admin_legal_documents()'::regprocedure) order by 1;` (two rows: t, s, {search_path=public}); `select has_function_privilege('authenticated', 'public.legal_signed_in_unaccepted(uuid)', 'EXECUTE'), has_function_privilege('authenticated', 'public.admin_legal_documents()', 'EXECUTE');` (f, t); `select position('legal_signed_in_unaccepted(v.id)' in pg_get_functiondef('public.admin_legal_documents()'::regprocedure)) > 0;` (t).
THE STOP REPORT (then STOP): <START>; A1's and A2's lines; the sha256sum; B0's three outputs; the migration file's path; B1's lines; B2's diff; B3's four read-backs; and the operator's line: "apply <the uuid fragment of the migration file's name> → expect mark 20261021200000".

M14 — the text the tool writes, exactly:
-- e2e-areas: legal
-- Bundle 22 turn 17c — M14 (mark 20261021200000): Admin › Legal counts, per version, the accounts that signed in after
-- it took effect without accepting (D227 (3): tests never run on production, so this number is the check there).
--  1. legal_signed_in_unaccepted(version) — new. For a published version in force of a document asked at sign-in
--     (terms, privacy, or the person seam e2e-acc-u<the user id without dashes>): the number of accounts whose last
--     sign-in (auth.users.last_sign_in_at, as admin_get_user reads it — 20260816120338 :287, :306) is at or after the
--     version's effective time and that have not accepted the version legal_acceptance_pending asks for at that
--     version (the newest published material version, or version 1, up to it) or a later one; the document's country
--     rule is legal_acceptance_pending's. Any other version or kind: NULL. Closed to the browser roles.
--  2. admin_legal_documents() — redeclared whole from M2 (20261019084720 :20-:61); one change: each version also
--     carries 'signed_in_unaccepted'.
-- Proofs: headers and grants; on scratch rows (removed), a person-seam version of an account that does not exist
-- counts 0, its draft and a kind not asked at sign-in count NULL. The count through the screen is LGA-15.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261021180000') THEN
    RAISE EXCEPTION 'bundle 22 turn 17b M13 (mark 20261021180000) must be applied first';
  END IF;
END $$;

-- ===== 1 — the count =====
CREATE FUNCTION public.legal_signed_in_unaccepted(p_version_id uuid)
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT (
    SELECT count(*)
      FROM auth.users u
      LEFT JOIN public.profiles p ON p.user_id = u.id
     WHERE u.last_sign_in_at >= v.effective_at
       AND (d.country_code IS NULL OR p.home_country_code = d.country_code)
       AND (d.kind NOT LIKE 'e2e-acc-u%' OR d.kind = 'e2e-acc-u' || replace(u.id::text, '-', ''))
       AND NOT EXISTS (
             SELECT 1
               FROM public.legal_acceptances a
               JOIN public.legal_versions va ON va.id = a.version_id
              WHERE a.user_id = u.id
                AND va.document_id = d.id
                AND va.version >= (
                      SELECT max(v3.version) FROM public.legal_versions v3
                       WHERE v3.document_id = d.id
                         AND v3.status = 'published'
                         AND v3.effective_at <= now()
                         AND v3.version <= v.version
                         AND (v3.material OR v3.version = 1))))
    FROM public.legal_versions v
    JOIN public.legal_documents d ON d.id = v.document_id
   WHERE v.id = p_version_id
     AND v.status = 'published'
     AND v.effective_at <= now()
     AND (d.kind IN ('terms', 'privacy') OR d.kind LIKE 'e2e-acc-u%');
$$;
REVOKE ALL ON FUNCTION public.legal_signed_in_unaccepted(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_signed_in_unaccepted(uuid) TO service_role;

-- ===== 2 — the staff list (redeclared whole; one field added) =====
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

-- ===== 3 — proofs (a failure raises; a clean apply is the pass) =====
DO $$
DECLARE
  v_ghost   uuid := gen_random_uuid();
  v_doc     uuid;
  v_version uuid;
  v_draft   uuid;
  v_plain   uuid;
  v_plain_v uuid;
BEGIN
  -- Both headers: SECURITY DEFINER, STABLE, search_path public.
  IF (SELECT count(*) FROM pg_proc p
       WHERE p.oid IN ('public.legal_signed_in_unaccepted(uuid)'::regprocedure,
                       'public.admin_legal_documents()'::regprocedure)
         AND p.prosecdef AND p.provolatile = 's' AND p.proconfig @> ARRAY['search_path=public']) <> 2 THEN
    RAISE EXCEPTION 'proof: a header is not SECURITY DEFINER, STABLE with search_path public';
  END IF;
  -- The count is closed to the browser roles; the staff list keeps its grants (signed-in callers; legal:view inside).
  IF has_function_privilege('anon', 'public.legal_signed_in_unaccepted(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.legal_signed_in_unaccepted(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof: legal_signed_in_unaccepted is executable by a browser role';
  END IF;
  IF has_function_privilege('anon', 'public.admin_legal_documents()', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_legal_documents()', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof: admin_legal_documents grants changed';
  END IF;
  IF position('''signed_in_unaccepted'', public.legal_signed_in_unaccepted(v.id)'
              in pg_get_functiondef('public.admin_legal_documents()'::regprocedure)) = 0 THEN
    RAISE EXCEPTION 'proof: admin_legal_documents does not carry the count';
  END IF;
  -- Scratch rows: the person seam of an account that does not exist counts 0; its draft counts NULL.
  INSERT INTO public.legal_documents (kind, country_code)
  VALUES ('e2e-acc-u' || replace(v_ghost::text, '-', ''), NULL)
  RETURNING id INTO v_doc;
  INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog, material,
                                     effective_at, published_at, settings_snapshot)
  VALUES (v_doc, 1, 'published', 'v1', 'M14 proof', 'M14 proof', 'M14 proof', false,
          now() - interval '1 minute', now() - interval '1 minute', '{"seed": "M14 proof"}'::jsonb)
  RETURNING id INTO v_version;
  INSERT INTO public.legal_versions (document_id, version, status, label)
  VALUES (v_doc, 2, 'draft', 'v2')
  RETURNING id INTO v_draft;
  IF public.legal_signed_in_unaccepted(v_version) IS DISTINCT FROM 0 THEN
    RAISE EXCEPTION 'proof: the person seam of an account that does not exist does not count 0';
  END IF;
  IF public.legal_signed_in_unaccepted(v_draft) IS NOT NULL THEN
    RAISE EXCEPTION 'proof: a draft is counted';
  END IF;
  -- A kind not asked at sign-in counts NULL.
  INSERT INTO public.legal_documents (kind, country_code)
  VALUES ('e2e-m14-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 12), NULL)
  RETURNING id INTO v_plain;
  INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog, material,
                                     effective_at, published_at, settings_snapshot)
  VALUES (v_plain, 1, 'published', 'v1', 'M14 proof', 'M14 proof', 'M14 proof', false,
          now() - interval '1 minute', now() - interval '1 minute', '{"seed": "M14 proof"}'::jsonb)
  RETURNING id INTO v_plain_v;
  IF public.legal_signed_in_unaccepted(v_plain_v) IS NOT NULL THEN
    RAISE EXCEPTION 'proof: a kind not asked at sign-in is counted';
  END IF;
  DELETE FROM public.legal_versions WHERE id IN (v_version, v_draft, v_plain_v);
  DELETE FROM public.legal_documents WHERE id IN (v_doc, v_plain);
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261021200000') ON CONFLICT DO NOTHING;

PART C — THE SCREEN AND THE STRING.
C1. src/features/admin/legal/legal-service.ts, type LegalVersion (:7-:18 at edfa9c80): after `acceptances?: number;` add `signed_in_unaccepted?: number | null;`.
C2. src/features/admin/legal/legal-page.tsx, right after the paragraph that shows "admin.legal.acceptedBy" (:121-:123 at edfa9c80), inside the same published-version block — a line only when the door gives a number (as your formatter lays it out):
  {typeof v.signed_in_unaccepted === "number" ? (
    <p data-testid="legal-signed-in-unaccepted">
      {t("admin.legal.signedInUnaccepted").replace("{count}", String(v.signed_in_unaccepted))}
    </p>
  ) : null}
C3. One new key, in both catalogues, right after "admin.legal.acceptedBy" (en.ts :3119, am.ts :2968), copied by a script from these two lines of the saved brief (the text after "en: " and after "am: ", to the end of the line):
  en: Signed in since it took effect, not accepted: {count}
  am: በሥራ ላይ ከዋለ ወዲህ ገብተው ያልተቀበሉ፦ {count}
  The key: "admin.legal.signedInUnaccepted". The Amharic follows the app's own words — "በሥራ ላይ" (admin.legal.status.inForce), "ገብተ-" (auth.signedInAs), "-ተቀበሉ፦" (admin.legal.acceptedBy). Paste the Amharic value's code points as written to am.ts; expected: 0x1260 0x1225 0x122b 0x20 0x120b 0x12ed 0x20 0x12a8 0x12cb 0x1208 0x20 0x12c8 0x12f2 0x1205 0x20 0x1308 0x1265 0x1270 0x12cd 0x20 0x12eb 0x120d 0x1270 0x1240 0x1260 0x1209 0x1366 0x20 0x7b 0x63 0x6f 0x75 0x6e 0x74 0x7d. Add it however this project adds a key (the usage maps are written by the map guard at the end of the checks).

PART D — THE TEST (e2e/legal-admin.spec.ts, after LGA-14; the file's own helpers: seed, scratch, version, accept, destroy and its afterEach; leaseUser, useJobSuperAdmin, gotoReady, adminClient).
D1. "LGA-15 Admin › Legal counts, for a version in force, the people who signed in after it took effect without accepting it (D227)":
  - person = a leased user; kind = `e2e-acc-u` + the person's id without dashes (M13's person seam: a document asked of that person only); add it to the file's `kinds` set so the afterEach removes it; seed(kind) (version 1, published, in force a minute ago).
  - The person signs in afresh AFTER the seed: a password sign-in sent straight to `${E2E_SUPABASE_URL}/auth/v1/token?grant_type=password` with the publishable key (as the file's accept() builds its request) — not passwordGrant, which may answer from its cache; it must answer ok. Through the service client, `auth.admin.getUserById(person.id)`: its last_sign_in_at is at or after the version's effective_at (read with version(kind)).
  - Staff: useJobSuperAdmin, gotoReady "/admin/legal"; the block `legal-doc-<kind>-global` → its `legal-in-force` contains "Accepted by 0" and its `legal-signed-in-unaccepted` has the text "Signed in since it took effect, not accepted: 1".
  - accept(person, the version's id); gotoReady "/admin/legal" again: the same block contains "Accepted by 1" and "Signed in since it took effect, not accepted: 0".
  - A kind not asked at sign-in: kind2 = scratch("p"); seed(kind2); on the page its `legal-in-force` contains "Accepted by 0" (wait for it first) and has no `legal-signed-in-unaccepted` (count 0).

PART E — CI.
E1. DEC-217 — .github/workflows/local-backend-proof.yml, the lane job's env (:24-:32 at edfa9c80), one line after `PROOF_LANE: ${{ matrix.lane }}`: `E2E_WORKERS: ${{ matrix.lane == 'smoke' && '1' || '2' }}`. Nothing else in the job changes.
E2. INC-808 — the same file, the fixture 20260809010129 (the heredoc at :140-:147): after its second INSERT and before the heredoc's closing `SQL`, these lines (indented like the INSERTs around them):
  -- INC-808: the auth server writes '' (never NULL) in the text columns it reads back as strings, and its admin list of users fails on a NULL there; each column only if this backend's auth schema has it.
  DO $$
  DECLARE c text;
  BEGIN
    FOREACH c IN ARRAY ARRAY['confirmation_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'email_change', 'phone_change', 'phone_change_token', 'reauthentication_token'] LOOP
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = c) THEN
        EXECUTE format('UPDATE auth.users SET %I = %L WHERE %I IS NULL', c, '', c);
      END IF;
    END LOOP;
  END $$;
  The fixture's description line (:152) ends "…three plain ones (ci-local-N@example.invalid); the auth server's text columns '' (INC-808)".
E3. INC-808's second class (G29) — e2e/global-setup.ts gains one exported function beside adminClient, `authErrorText(error)`: for an error object it returns its class name, then its HTTP status when it has a positive number one, then its message — e.g. "AuthRetryableFetchError 500: {}"; for no error object, "no error object". Census: every `supabase.auth.admin.*` call in e2e/global-setup.ts, e2e/global-teardown.ts and e2e/helpers/users.ts (19 at edfa9c80: 5, 4 and 10) — paste a table file:line → call → how its error is printed now → after; every one that prints or throws the error's message alone uses authErrorText instead (teardown's listUsers and delete lines included). No other behaviour changes: what was a WARNING stays a WARNING, what threw still throws.

PART F — THE DOCS, THE ROADMAP, THE CHANGELOG, AGENTS.md.
F1. docs/features/legal.md, a new section at its end, "## Turn 17c — who signed in without accepting (D227 (3))": WHY's first two points (what the number counts, where it shows, the kinds counted, its limits); M14's two functions; LGA-15.
F2. docs/features/ci-local-backend.md, a new section at its end, "## Turn 17c — two workers per lane (DEC-217) and the fixture accounts (INC-808)": DEC-217's rule word for word, its baseline (run 1080: slowest lane 8 1,156 s; lane 1 1,093 s; lane 7 1,054 s), and that the next two runs judge it; INC-808's evidence, its hypothesis named as a hypothesis, the fix (E2, E3) and its proof: the next run's post-test band of every lane says "[e2e:teardown] deleted N user(s) owned by process …", or names the error's class and status.
F3. roadmap.md: line 3 begins "The brief in force: docs/governance/briefs/bundle-22-turn-17c-v2.md (bundle 22 — turn 17c, after the close: Admin › Legal counts per version who signed in after it took effect without accepting; two workers per CI lane; the temporary backend's accounts listable; D227, DEC-217, INC-808). Next: the email tests on the temporary backend's inbox (D228);" and keeps the rest of the current line from " the Publish and the one walk of bundle 22;" on. The line that begins "  - [ ] Turn 17b (docs/governance/briefs/bundle-22-turn-17b-v2.md" gets [x] and, at its end, " — CI run 1080 on edfa9c80: SUCCESS (lanes 13/13: 2,133 passed, 0 failed, 0 flaky); main promoted". The line that begins "  - [ ] Turn 17c (owed; one migration, Tier A; strings)" is replaced whole by:
  - [ ] Turn 17c (docs/governance/briefs/bundle-22-turn-17c-v2.md; one migration M14, mark 20261021200000; one string) — Admin › Legal shows per version in force how many signed in after it took effect without accepting (legal_signed_in_unaccepted; LGA-15); the lanes run 2 workers, the smoke lane 1 (DEC-217, judged on the next two runs); the fixture accounts carry '' in the auth server's text columns and the harness names an auth error's class and status (INC-808)
F4. docs/_changelog.md APPEND one line: "- 2026-10-21 — Bundle 22 turn 17c, after the close (one migration, M14; one string): Admin › Legal shows, for each version in force of the Terms or the Privacy Policy, how many accounts signed in after it took effect without accepting it (D227); the CI lanes run two workers each (DEC-217); the temporary backend's fixture accounts are listable again and auth errors name their class and status (INC-808)."
F5. AGENTS.md — eight lines replaced whole and one line added (each OLD in full, then the NEW); the part after the Lovable block becomes 5,110 of 5,120 bytes; expected sha256 of the whole file after F5: 1b21e554d521d92e7e3302fb1f28e27794a7d690c5d6935d5174ff0b28ad1067 (paste yours; if it differs, paste `git diff AGENTS.md`). The added line is DEC-217's rule, right after the line that begins "- Browser tests start only with"; the other eight are shortened only to make room.
  OLD: - The database tool applies its input immediately: write and check a scratch migration, then submit FINAL text once, never a stub, comment or draft; remove scratch drafts before turn end (no comment-only applies).
  NEW: - The database tool applies its input at once: check a scratch migration, then submit FINAL text once — never a stub, comment or draft; remove scratch drafts before turn end.
  OLD: - Text attributes are validated by preset allowlist (`attr_preset_ok`), never by free regex; option records use the strict shape `value, label_en, label_am, parent, active, bounds, aliases` — unknown keys are refusals, defaults are omitted (DEC-050).
  NEW: - Text attributes are validated by preset allowlist (`attr_preset_ok`), never free regex; option records use the strict shape `value, label_en, label_am, parent, active, bounds, aliases` — unknown keys refused, defaults omitted (DEC-050).
  OLD: - E2E tests that only need a signed-in account use `leaseUser()` (lane-scoped pool, reaped at lease); `createUser()` only for a brand-new identity or a target account. Why: deleted users still count as monthly active users (DEC-097).
  NEW: - E2E tests needing only a signed-in account use `leaseUser()` (lane-scoped pool, reaped at lease); `createUser()` only for a new identity or a target account. Why: deleted users still count as monthly active users (DEC-097).
  OLD: - CI evidence: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ — ci-status.md first, then e2e-last-failure.md and guards-last-failure.md; never dev/main copies or `git fetch origin ci-evidence` (frozen or absent; DEC-098, S87).
  NEW: - CI evidence: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ — ci-status.md, then e2e-last-failure.md and guards-last-failure.md; never dev/main copies or `git fetch origin ci-evidence` (frozen or absent; DEC-098, S87).
  OLD: - MARKET-NEUTRAL WORDING (DEC-094): UI and catalogue text never name one country where the statement depends on the seller's or buyer's market; use the {country} token. Cultural facts (teff, the Ethiopian calendar, a brand's name) are not market statements.
  NEW: - Market-neutral wording (DEC-094): UI and catalogue text name no single country where a statement depends on the market; use {country}. Cultural facts (teff, the Ethiopian calendar, brand names) are not market statements.
  OLD: - Browser tests start only with `bun run e2e:local` or `bun run e2e:changed`, never plain `playwright test` (it would use production `.env`, INC-464); targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1`, https), which CI gates on via local-backend-proof.yml; never supabase/config.toml (D228).
  NEW: - Browser tests start only with `bun run e2e:local` or `bun run e2e:changed`, never plain `playwright test` (production `.env`, INC-464); targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1`, https), gated via local-backend-proof.yml; never supabase/config.toml (D228).
  ADD (after the NEW line just above): - CI lanes run 2 test workers, smoke 1 (DEC-217); cross-worker interference or a new flaky test returns them to 1. Why: on one worker the slowest lane took 19 min.
  OLD: - Button and action labels: two or three words, no article, no bracketed remark, every language; an explanation goes once in help text, never in a button (D81). A label scripts/list-action-labels.test.ts flags takes the brief's shorter text; its allowlist takes a key only with a reason.
  NEW: - Button and action labels: two or three words, no article or bracketed remark, every language; explanations go once in help text, never in a button (D81). A label scripts/list-action-labels.test.ts flags takes the brief's shorter text; its allowlist takes a key only with a reason.
  OLD: - Shell (bundle 21): cards take `CARD_SURFACE` (src/components/layout/surface.ts): no 1-px border, state borders on top; one ☰ per width, top-left (below 768 it opens rail-menu, from 768 it folds the menu); md tables use `tbl-md:` (D135, D115, D204).
  NEW: - Shell (bundle 21): cards take `CARD_SURFACE` (src/components/layout/surface.ts): no 1-px border, state borders on top; one ☰ per width, top-left (rail-menu below 768, folds the menu from 768); md tables use `tbl-md:` (D135, D115, D204).

THE CHECKS (whole; paste the last line of each; when a check fails, paste its whole failure block): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (expected 1285 passed); `actionlint -shellcheck= -pyflakes= .github/workflows/local-backend-proof.yml` clean; `bash scripts/check-migrations.sh` "Migration guard OK."; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `SELF_TEST=1 bun scripts/check-acceptance-doors.ts` refusing all three fixture names; the guard on the live production list (turn 17's B1 query, run again after M14) → its OK line unchanged (116 write doors; owed 0, guarded 10, takedown 2); E3's census table; the Amharic value's code points (C3); the preview harness's "build OK"; at the end, `bun run i18n:map-guard` "usage maps match the tree".

THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it: sign in when it needs a session, run the flow with real input, and confirm the result reads back through the UI."). Where: ethio-staging, after the operator has applied M14 there (his "continue" says so), with your three staging credentials — never production. The flow: a person signs in without accepting and a staff member signed in reads the number on Admin › Legal, then the person accepts and the number reads back as 0 — LGA-15 does exactly this through the page. Run `bun run e2e:local -- e2e/legal-admin.spec.ts --retries=0` (the file whole, both projects) and `bun run e2e:local -- e2e/phone-frame.spec.ts --grep "super admin routes fit" --retries=0` (Admin › Legal at phone width). Paste each summary line, every failure body, and the teardown's lines ("[e2e:teardown] …") of each run; a failure is read at its root cause and fixed in this turn (G21, G38). E1 and E2 run only in CI: the next run proves them. Nothing in this check is deferred; if a test cannot run, STOP and report why.

SCOPE — these files only: the brief; the migration file the tool writes (M14); src/integrations/supabase/types.ts if the tool regenerates it; src/features/admin/legal/legal-service.ts (C1), src/features/admin/legal/legal-page.tsx (C2); src/i18n/locales/en.ts and am.ts (C3) and the two usage maps the map guard writes (docs/generated/i18n-usage.json, public/i18n-usage.json); e2e/legal-admin.spec.ts (D); .github/workflows/local-backend-proof.yml (E1, E2); e2e/global-setup.ts, e2e/global-teardown.ts, e2e/helpers/users.ts (E3); docs/features/legal.md (F1); docs/features/ci-local-backend.md (F2); roadmap.md (F3); docs/_changelog.md (F4); AGENTS.md (F5); the files of an A1 fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No package change.
THE CI WAIT REPORT: done or not done by part; C's diffs; the code points; D's test in full; E1's and E2's diffs; E3's census table; F5's AGENTS.md sha256; the checks; the end-to-end check's outputs with the teardown lines; `git diff --stat <START>`; `git diff --name-only <START>` (count the files from this list); anything not foreseen; the line "The project's own check follows on GitHub: the CI run on <the commit this turn leaves> — the lanes replay M14 from scratch, run LGA-15, and run two workers each for the first time (DEC-217's first judged run); every lane's teardown should say 'deleted N user(s)' (INC-808); the next brief's Part A reads it." Then END THE TURN; send nothing after the report.
REVERT: a later migration that drops legal_signed_in_unaccepted(uuid) and restores admin_legal_documents() from M2's file (20261019084720 :20-:61) — never an edit of M14 — with git revert of this turn's other commits; DEC-217 alone: E2E_WORKERS back to 1 for every lane and its AGENTS.md rule replaced by the one-worker rule (its own rule says when).
```
