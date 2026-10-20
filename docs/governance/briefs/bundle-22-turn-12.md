# Bundle 22 — Stage 1, turn 12 (after the close): one acceptance tick with the 18+ statement once (DEC-206), the export of acceptances (D226), legal times in the viewer's time zone: brief (saved unchanged, 2026-10-20)

```text
BUNDLE 22 — STAGE 1, TURN 12 (2026-10-20; after the close). Tier A (two doors re-declared, one constraint dropped, a permission and a staff door added). ONE MIGRATION BY THE TOOL (M12), FIRST — before any other change. Eleven new strings and six retired, all inside the carrier (EN+AM; Knowledge D5: new keys, the old ones retired because nothing reads them any more). No package change. No AGENTS.md change: no new module, every change sits in files that exist today. Base: dev 42c88cdf (bundle 22 turn 11). Parts, IN THIS ORDER: A — CI first, and the conclusion of turns 10 and 11; STEP 0; B — M12 by the tool, FIRST; C — the carrier (the screens, their unit tests, the strings, the allowlist, the docs, the roadmap, the changelog), then the hashes; D — the browser tests, which you write; the checks; THE STOP REPORT with the apply line; after the operator's staging apply and "continue", E — the local end-to-end try; THE CI WAIT REPORT.

WHY
- DEC-206 (the operator, 2026-10-19 23:38 local; supersedes DEC-204 (b)'s separate storage tick): "'I am 18 or older' only on first signup, the 'I agree to the Terms of Service, and I have read the Privacy Policy' new signup and everytime the data changes", with storage in the United States covered inside the Terms and the Privacy Policy rather than a tick of its own. The acceptance screen gets ONE tick: the first time a person accepts it reads "I am 18 or older. I agree to the Terms of Service, and I have read the Privacy Policy."; at every later version it reads "I agree to the new Terms of Service, and I have read the new Privacy Policy." (each with its one-document forms). accept_legal asks the 18+ statement only until the person has confirmed it once and no longer refuses consentRequired; my_legal_status says whether the 18+ statement was ever confirmed (adult_confirmed on each row).
- The operator, 2026-10-19 23:45 to 23:59 local: a new version stops the person right after sign-in (it does: every load of the app reads afresh) and a refusal signs them out — the screen's second button now reads "Decline, sign out"; an app left open reads again when its window regains focus once its answer is five minutes old; "the UTC time is database documentation, but locally should translate depending on users location/machine time" — every legal date and time is shown in the viewer's own time zone (the database keeps UTC); Admin › Users › Legal says "18 or older confirmed" only on the acceptance that confirmed it (today it says so on every acceptance).
- D226 (the operator, 2026-10-19 22:38 local: "also export if needed and all under permission to be able to do any changes and secure"): the staff door admin_export_legal_acceptances under a new permission legal:export with a fresh second factor (granted to no role; the super admin holds every permission). Admin › Legal's own screens, with the Export button, are turn 13.

STEP 0 — save this file (the attached bundle-22-turn-12.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-12.md and paste its sha256sum. roadmap.md comes from the carrier (its line 3 names this brief); do not edit it by hand. Tick nothing. No report file in the repository.

HOW TO WORK
- Order of the turn: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; the census; Part B (M12, FIRST); Part C; Part D; the checks; THE STOP REPORT with the apply line, and STOP; — the operator applies M12 on ethio-staging and sends "continue" —; Part E; THE CI WAIT REPORT; END THE TURN. Do not stop between parts — a clean point is not a reason to stop. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it"), as in turns 6 to 10: your sandbox cannot start a browser (INC-506), and the preview signed in and production are never used for tests (AGENTS.md; INC-464, DEC-146). The state a real user would hit is reached by CI's full run on your commit — real Chromium at 360 and 1280 px, the built app against ethio-staging, every test. This turn's central flows are LAC-1 and LAC-4 (the first and the later acceptance through the screen), LG-23 (the 18+ statement once), LG-24 (the export) and LGA-9 (the admin card). You try Part E locally; when the browser guard stops it, you end the turn WITHOUT concluding (THE CI WAIT REPORT); the next brief's Part A reads that run and concludes this turn. The operator directs this.
- Run no stateful git command: the platform commits and syncs when the turn ends. Read-only `git status`, `git diff` and `git rev-parse` are fine.
- Edit spec files by hand, never by search-and-replace (G37). No assertion loosened, no timeout raised, no retry added (G38). A shared helper never changes its default (new behaviour is an option). No sleeps (eslint: "poll on truth, never sleep").
- Every legal test row is a scratch one; no test writes legal_settings or listing_policy and no test creates a document of a real kind (G27); scratch cleanup in afterEach (J3); a test finds its own rows by id, never by position (G28); at most two leased accounts per test (DEC-174).
- The strings come only from the carrier; no Amharic of your own. No literal UI text.
- Run the usage-map guard (`bun run i18n:map-guard`) as the final check, after every file of the turn is written; when it rewrites the two maps, run it once more.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST, AND THE CONCLUSION OF TURNS 10 AND 11.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines with the run's number and commit (you cannot git-fetch that branch). Expected: run 1057 on 42c88cdf (turn 11's last commit), in progress or finished, or a later run. Run 1056 on 522e0ed5 (turn 10's last commit) failed only TR-24, SC-15, PW-54 and PW-71, each beside 520 or 521 answers from ethio-staging (a staging outage, not a code finding: nothing to fix); turn 10's own AP-37 and LD-23 passed in it.
A2. When ci-status.md names 42c88cdf with its run finished, read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md and https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md and write 'TURNS 10 AND 11 — FINAL REPORT' as the first section of this turn's stop report: ci-status.md's six lines; the lines of e2e-last-failure.md that name AP-37 or e2e/ad-page.spec.ts, or its 'passed' line; guards-last-failure.md's lines for lint and the unit tests, or that no job failed; your verdict. On SUCCESS, turn 10's central flow (the tapped section tab stays current after its own scroll until the reader moves the page) is verified end-to-end and turn 11's records stand. Any failure: read its body, fix it at its root cause first (G21, G38), and name it with its fix. If that run has not been published when you reach THE CI WAIT REPORT, read it once more then; still not published: say so, and the next brief's Part A concludes turns 10 to 12 together.

THE CENSUS (paste each result; any result that differs from what it expects is a STOP: write nothing else and report)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-22-turn-12.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 17 files → each equal to:
  df749e909086ae225d01742595d149ebe0944d8758ca9385ab0fe68a42002a30  docs/_changelog.md
  cea1c1a870e0de33d73b7f240ff1d70365c0b12b3d255173d1ec36fe86fcef7b  docs/features/legal.md
  fdcbf376a260d1ef3f1d4bb1864c610809d50ae0986128714db9d3bb7f7533b3  docs/generated/i18n-usage.json
  fdcbf376a260d1ef3f1d4bb1864c610809d50ae0986128714db9d3bb7f7533b3  public/i18n-usage.json
  4fa21ba85c7886b36190cbf680791ae9cf4fe0fc223e7d5d984e859fce69b224  roadmap.md
  1c120bd9afaa3d532cc05a2253ec8a7e8edec2fba375035b5bb89a7c95380ab6  scripts/public-surface-allowlist.txt
  a71a270852aa2daa0eae5555e8395cdc36bb430c39e06bfe2962a00dd63733a8  src/features/admin/legal/user-legal-card.tsx
  e99e01b783ee68da9e33ed770db3302f9800d8de44709ffb2bec69c6ea718f8f  src/features/legal/legal-accept-screen.test.tsx
  f2363acd78b61d9d5f2c10155b8894134354267555a7abfeebb056e00f5b694c  src/features/legal/legal-accept-screen.tsx
  35ec532c465450a9c3be9d985c54eb0ce3ccf24d9ff4a7522701a4457e6c4c0e  src/features/legal/legal-kinds.test.ts
  f24b297288dbb259edbc3614fe455a01447183211f454bc01d9f1079b9b428a0  src/features/legal/legal-kinds.ts
  0bf1b0798ac6c5c1949818305ab8152cb6a5e7c4d87e88799642f10d062e4626  src/features/legal/legal-reader.ts
  effc09ed829e432ef239741d9fa3581184d37ac94523c94294d2c5a47c8f1d20  src/features/legal/my-legal-page.tsx
  0ece2d6df3b2080998a2aa8cf25fbc77df71e6b09ce191b55ea3e9d78d44cb49  src/features/legal/use-legal-gate.test.tsx
  eb59d55d353ca7385109e17c63b387503f4918502b3f63c4c2bc4492c143c08c  src/features/legal/use-legal-gate.ts
  c08012d613333bae0d6efe86e89537915445ebae72782bca8eb1a1560a7a0c78  src/i18n/locales/am.ts
  b6844b81e5215cc8c25461a130caab7a91e679aff38aa3204ced98d9d710433f  src/i18n/locales/en.ts
- (c) `sha256sum e2e/legal-accept.spec.ts e2e/legal-doors.spec.ts e2e/legal-admin.spec.ts` → 07a32fd761f6f16410f12b8d2690f202ea295f09542a70b991fd8c8f0b6979b1, 32b13d9938fe5d2fe85305388ca9ff9af08ec25e488f43aeb1e3cf4f85aecfcc, 95fea07643377ea9e933df774ac49160fad5dcc7bb9a8a5b774d4629c6539874 (Part D's line numbers are as at 42c88cdf).
- (d) `ls supabase/migrations | tail -1` → 20261019232513_2240482e-4359-4f8d-b926-24411bd13096.sql.

PART B — M12, BY THE TOOL, FIRST (the tool applies it on ethio-prod the moment it is saved, after the operator allows the "Modify Supabase database" dialog; its first statement refuses unless M9's mark 20261020120000 is there).
B0. Before M12, from ethio-prod's read tool, paste: (1) for public.my_legal_status(text[]) and public.accept_legal(uuid[], text, boolean, boolean): the live argument list, provolatile, prosecdef, proconfig, whether anon and authenticated may EXECUTE it, and its live definition text compared, ignoring whitespace, with its last declaration in the repository — my_legal_status: supabase/migrations/20261019084720_0bad8634-24d0-4c7c-bd3e-f2f736dab99d.sql (M2); accept_legal: supabase/migrations/20261019103558_df2b6472-8b61-4c4b-a074-94b1e69e3724.sql (M3a). Expected: (p_kinds text[]) s/true/{search_path=public} and (p_version_ids uuid[], p_language text, p_adult boolean, p_data_consent boolean) v/true/{search_path=public}; anon false and authenticated true for both; each equal to its file. (2) The constraint legal_acceptances_adult_check exists on public.legal_acceptances (pg_constraint). (3) No permission legal:export and no function public.admin_export_legal_acceptances yet. (4) `select version from public.migration_marks where version in ('20261020120000', '20261020200000')` → only 20261020120000. Any difference: STOP before M12 and quote it.
B1. The mark 20261020200000 must be later than the stamp the tool gives the file: if the UTC time is past 2026-10-20 18:00 when you reach B1, STOP and ask for a new mark. Run `bash scripts/check-migrations.sh` and paste its last line ("Migration guard OK.") before the save. Then submit exactly the text between "=== M12 BEGIN ===" and "=== M12 END ===" below (those two lines excluded), once (14,077 bytes, 286 lines; sha256 3571fb7e59ea952707dd5d76070806b1b9d0fc5ea9ae4c889930e73e039c1bce). WHAT THE SUPERVISOR RAN: it applied this text to a scratch PostgreSQL 16 holding bundle 22's legal files through M9: its proofs passed; then, as a caller (rolled back): the first acceptance with p_adult false was refused adultRequired; with p_adult true it was recorded with adult_confirmed true; a second version was then accepted with p_adult false and no p_data_consent (recorded with adult_confirmed false and data_consent false); my_legal_status carried adult_confirmed true; the export answered page by page with `next`, wrote one audit row on its first page, and refused badValue:after, unknownVersion and, for a caller without the permission, permission denied. The repository's migration guard passed with the text in place.
B2. THE TEXT CHECK (INC-777, INC-778): write that block from the saved docs/governance/briefs/bundle-22-turn-12.md to a scratch file outside the repository with a script (never by hand) and run `diff -w <scratch file> <the saved migration file>`; paste its output. Expected: nothing. A whitespace-only difference is not shown by -w and is not a stop; any other line: say so first in the stop report and change nothing more in the database.
B3. Read back on ethio-prod: `select version from public.migration_marks where version = '20261020200000'` (one row); my_legal_status s/true/{search_path=public}, accept_legal and admin_export_legal_acceptances v/true/{search_path=public}, each with anon false and authenticated true; legal_acceptances_adult_check gone; the permission legal:export with requires_step_up true.
=== M12 BEGIN ===
-- Bundle 22 turn 12 — M12 (mark 20261020200000): one acceptance tick (DEC-206) and the export of
-- acceptances (D226). my_legal_status says whether the caller has ever confirmed 18 or older;
-- accept_legal asks the 18+ statement only until it is confirmed once and no longer asks a separate
-- storage consent; the permission legal:export (with step-up) and the door admin_export_legal_acceptances.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020120000') THEN
    RAISE EXCEPTION 'bundle 22 turn 9 M9 (mark 20261020120000) must be applied first';
  END IF;
END $$;

-- ===== 1 — my_legal_status: each row also carries adult_confirmed =====
-- Re-declared whole from its definition at M2; the one change is the key adult_confirmed (true when any
-- acceptance of the caller confirmed 18 or older), so that the screen asks the 18+ statement only once.
CREATE OR REPLACE FUNCTION public.my_legal_status(p_kinds text[] DEFAULT ARRAY['terms','privacy'])
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_adult boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  v_adult := EXISTS (SELECT 1 FROM public.legal_acceptances a
                      WHERE a.user_id = v_uid AND a.adult_confirmed);
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'kind', x.kind,
             'country_code', x.country_code,
             'version_id', x.version_id,
             'version', x.version,
             'label', x.label,
             'material', x.material,
             'effective_at', x.effective_at,
             'adult_confirmed', v_adult)
           ORDER BY x.kind, x.country_code NULLS FIRST)
      FROM (
        -- the version in force of each document that applies to the caller: one row per document
        SELECT DISTINCT ON (d.id)
               d.id AS document_id, d.kind, d.country_code,
               v.id AS version_id, v.version, v.label, v.material, v.effective_at
          FROM public.legal_documents d
          JOIN public.legal_versions v ON v.document_id = d.id
         WHERE d.kind = ANY (p_kinds)
           AND v.status = 'published'
           AND v.effective_at <= now()
           AND (d.country_code IS NULL
                OR d.country_code = (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = v_uid))
         ORDER BY d.id, v.version DESC
      ) x
     WHERE NOT EXISTS (
       -- accepted: a version at or above the newest material version in force (or version 1)
       SELECT 1
         FROM public.legal_acceptances a
         JOIN public.legal_versions va ON va.id = a.version_id
        WHERE a.user_id = v_uid
          AND va.document_id = x.document_id
          AND va.version >= (
                SELECT max(v3.version) FROM public.legal_versions v3
                 WHERE v3.document_id = x.document_id
                   AND v3.status = 'published'
                   AND v3.effective_at <= now()
                   AND (v3.material OR v3.version = 1)))), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.my_legal_status(text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_legal_status(text[]) TO authenticated;
GRANT ALL ON FUNCTION public.my_legal_status(text[]) TO service_role;

-- ===== 2a — the 18+ flag records what was asked this time =====
-- The statement is asked once (DEC-206): a later acceptance records false when it was not asked again.
-- accept_legal refuses every acceptance that has no confirmation, now or earlier, so the check moves
-- into the door. No row changes: every existing row is true.
ALTER TABLE public.legal_acceptances DROP CONSTRAINT IF EXISTS legal_acceptances_adult_check;

-- ===== 2 — accept_legal: 18+ once, no separate storage consent (DEC-206) =====
-- Re-declared whole from its definition at M3a (same arguments, same default). Two changes: the 18+
-- statement is required only while the caller has no acceptance that confirmed it, and its row records
-- whether it was given this time; a Privacy Policy version no longer needs the storage consent (the Terms
-- state the storage). The consent flag is still recorded on a privacy row when a caller sends it.
CREATE OR REPLACE FUNCTION public.accept_legal(p_version_ids uuid[], p_language text, p_adult boolean,
                                               p_data_consent boolean DEFAULT false)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_method  text;
  v_home    char(2);
  v_vid     uuid;
  v_v       public.legal_versions%ROWTYPE;
  v_privacy boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_version_ids IS NULL OR array_length(p_version_ids, 1) IS NULL THEN
    RAISE EXCEPTION 'emptyList';
  END IF;
  IF p_adult IS DISTINCT FROM true AND NOT EXISTS (
       SELECT 1 FROM public.legal_acceptances a WHERE a.user_id = v_uid AND a.adult_confirmed) THEN
    RAISE EXCEPTION 'adultRequired';
  END IF;
  IF p_language IS NULL OR NOT EXISTS (
       SELECT 1 FROM public.languages l WHERE l.code = p_language AND l.enabled_public) THEN
    RAISE EXCEPTION 'badLanguage';
  END IF;
  v_method := coalesce(
    auth.jwt() -> 'app_metadata' ->> 'provider',
    (auth.jwt() -> 'amr' -> 0 ->> 'method'),
    'unknown');
  SELECT p.home_country_code INTO v_home FROM public.profiles p WHERE p.user_id = v_uid;
  FOREACH v_vid IN ARRAY p_version_ids LOOP
    SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = v_vid;
    IF NOT FOUND OR v_v.status <> 'published' OR v_v.effective_at > now() THEN
      RAISE EXCEPTION 'notInForce';
    END IF;
    IF EXISTS (SELECT 1 FROM public.legal_documents d
                WHERE d.id = v_v.document_id
                  AND d.country_code IS NOT NULL
                  AND d.country_code IS DISTINCT FROM v_home) THEN
      RAISE EXCEPTION 'notApplicable';
    END IF;
    SELECT (d.kind = 'privacy' OR d.kind ~ '^e2e-[a-z0-9-]*-privacy$') INTO v_privacy
      FROM public.legal_documents d WHERE d.id = v_v.document_id;
    INSERT INTO public.legal_acceptances
      (user_id, version_id, language, method, adult_confirmed, home_country_code, data_consent)
    VALUES (v_uid, v_vid, p_language, v_method, p_adult IS TRUE, v_home, v_privacy AND p_data_consent IS TRUE)
    ON CONFLICT (user_id, version_id) DO NOTHING;
  END LOOP;
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) TO service_role;

-- ===== 3 — the permission legal:export (with step-up); granted to no role =====
INSERT INTO public.permissions (resource_id, action, description, requires_step_up, assignable)
SELECT r.id, 'export', 'Export who accepted a legal version (account id, date, language, home country)', true, true
  FROM public.resources r
 WHERE r.name = 'legal'
   AND NOT EXISTS (
     SELECT 1 FROM public.permissions p WHERE p.resource_id = r.id AND p.action = 'export');

-- ===== 4 — admin_export_legal_acceptances: one page of a published version's acceptances =====
-- legal:export with step-up. Minimal columns (D226): the account id, the time, the language, the sign-in
-- method, the home country, and the two statements' flags; never a name or an e-mail. Pages run by
-- (accepted_at, id); the first page writes one audit line.
CREATE OR REPLACE FUNCTION public.admin_export_legal_acceptances(p_version_id uuid,
                                                                 p_after_at timestamptz DEFAULT NULL,
                                                                 p_after_id uuid DEFAULT NULL,
                                                                 p_limit integer DEFAULT 1000)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_version integer;
  v_kind    text;
  v_country char(2);
  v_rows    jsonb;
  v_count   integer;
  v_last_at timestamptz;
  v_last_id uuid;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'export') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'export');
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 5000 THEN RAISE EXCEPTION 'badValue:limit'; END IF;
  IF (p_after_at IS NULL) <> (p_after_id IS NULL) THEN RAISE EXCEPTION 'badValue:after'; END IF;
  SELECT v.version, d.kind, d.country_code INTO v_version, v_kind, v_country
    FROM public.legal_versions v
    JOIN public.legal_documents d ON d.id = v.document_id
   WHERE v.id = p_version_id AND v.status = 'published';
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownVersion'; END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'account_id', p.user_id,
           'accepted_at', p.accepted_at,
           'language', p.language,
           'method', p.method,
           'home_country', p.home_country_code,
           'adult_confirmed', p.adult_confirmed,
           'data_consent', p.data_consent) ORDER BY p.accepted_at, p.id), '[]'::jsonb),
         count(*)
    INTO v_rows, v_count
    FROM (SELECT a.id, a.user_id, a.accepted_at, a.language, a.method, a.home_country_code,
                 a.adult_confirmed, a.data_consent
            FROM public.legal_acceptances a
           WHERE a.version_id = p_version_id
             AND (p_after_at IS NULL OR (a.accepted_at, a.id) > (p_after_at, p_after_id))
           ORDER BY a.accepted_at, a.id
           LIMIT p_limit) p;
  SELECT a.accepted_at, a.id INTO v_last_at, v_last_id
    FROM public.legal_acceptances a
   WHERE a.version_id = p_version_id
     AND (p_after_at IS NULL OR (a.accepted_at, a.id) > (p_after_at, p_after_id))
   ORDER BY a.accepted_at, a.id
   OFFSET greatest(v_count - 1, 0) LIMIT 1;
  IF p_after_at IS NULL THEN
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'legal.acceptances_exported', 'legal_version', p_version_id::text,
            jsonb_build_object('kind', v_kind, 'country', v_country, 'version', v_version));
  END IF;
  RETURN jsonb_build_object(
    'version', v_version,
    'kind', v_kind,
    'country_code', v_country,
    'rows', v_rows,
    'next', CASE WHEN v_count = p_limit THEN jsonb_build_object('at', v_last_at, 'id', v_last_id) END);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_export_legal_acceptances(uuid, timestamptz, uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_legal_acceptances(uuid, timestamptz, uuid, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_export_legal_acceptances(uuid, timestamptz, uuid, integer) TO service_role;

-- ===== 5 — proofs, with no caller (G39): every door refuses a missing caller; the permission exists with
-- step-up; headers and grants as declared. Row behaviour is proven by e2e tests on scratch rows.
DO $$
DECLARE
  v_msg text;
  v_r   record;
BEGIN
  BEGIN
    PERFORM public.my_legal_status(ARRAY['terms']);
    RAISE EXCEPTION 'proof: my_legal_status answered without a caller';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'proof: my_legal_status said %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.accept_legal(ARRAY[gen_random_uuid()], 'en', true);
    RAISE EXCEPTION 'proof: accept_legal answered without a caller';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'proof: accept_legal said %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.admin_export_legal_acceptances(gen_random_uuid());
    RAISE EXCEPTION 'proof: the export answered without a caller';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'proof: the export said %', v_msg; END IF;
  END;
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'legal_acceptances_adult_check') THEN
    RAISE EXCEPTION 'proof: the 18+ check is still on the table';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
                  WHERE r.name = 'legal' AND p.action = 'export' AND p.requires_step_up) THEN
    RAISE EXCEPTION 'proof: legal:export with step-up is missing';
  END IF;
  FOR v_r IN
    SELECT p.oid, p.proname, p.provolatile, p.prosecdef, p.proconfig
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('my_legal_status', 'accept_legal', 'admin_export_legal_acceptances')
  LOOP
    IF NOT v_r.prosecdef OR v_r.proconfig IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof: % headers changed', v_r.proname;
    END IF;
    IF (v_r.proname = 'my_legal_status' AND v_r.provolatile <> 's')
       OR (v_r.proname <> 'my_legal_status' AND v_r.provolatile <> 'v') THEN
      RAISE EXCEPTION 'proof: % volatility changed', v_r.proname;
    END IF;
    IF has_function_privilege('anon', v_r.oid, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof: anon can run %', v_r.proname;
    END IF;
    IF NOT has_function_privilege('authenticated', v_r.oid, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof: authenticated cannot run %', v_r.proname;
    END IF;
  END LOOP;
  IF (SELECT count(*) FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public'
         AND p.proname IN ('my_legal_status', 'accept_legal', 'admin_export_legal_acceptances')) <> 3 THEN
    RAISE EXCEPTION 'proof: a door has a second overload';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020200000') ON CONFLICT DO NOTHING;
=== M12 END ===

PART C — THE CARRIER (17 paths, with the two usage maps)
- What it changes. src/features/legal/legal-reader.ts: LegalStatusRow gains adult_confirmed, and myLegalStatus refuses an answer without it. src/features/legal/legal-kinds.ts: tickKey(roles, firstTime) replaces tickOneKey and needsConsent; legalDate shows the date in the viewer's own time zone; legalMoment (date, time with seconds, the zone named; an optional time zone for tests only). src/features/legal/legal-accept-screen.tsx: one tick (test id `legal-accept-tick`; `legal-accept-adult` and `legal-accept-consent` are gone), the 18+ wording only while no acceptance confirmed it, adult sent as that first-time flag, dataConsent always false, the second button "Decline, sign out" (test id `legal-accept-signout` kept). src/features/legal/use-legal-gate.ts: refetchOnWindowFocus true (with the 5-minute staleTime). src/features/legal/my-legal-page.tsx: acceptance and e-mail moments through legalMoment. src/features/admin/legal/user-legal-card.tsx: the moment in the viewer's time zone with seconds and the zone; `admin.users.legal.acceptedAt` and, only where adult_confirmed, the line `user-legal-adult` ("18 or older confirmed"). Unit tests: legal-kinds.test.ts (tickKey; legalMoment), legal-accept-screen.test.tsx (one tick; first and later wording; adult true then false; the decline label), use-legal-gate.test.tsx (reads again on the window's return once five minutes old). The strings (below). scripts/public-surface-allowlist.txt: the accept_legal line restated; admin_export_legal_acceptances added. docs/features/legal.md (the doors table, the audit line, Permissions, a new "Turn 12" section). roadmap.md (line 3; the turn 12 line and turn 13's owed line under bundle 22; the legal e-mail's line). docs/_changelog.md (one line).
- WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy of dev 42c88cdf with exactly the carrier's files; not lock-exact, INC-420): `vitest run` whole — 1258 passed (1257 at the base; minus needsConsent's test, plus legalMoment's and the gate's); the gate's new test fails with refetchOnWindowFocus false and the screen's tests fail against the old screen (not vacuous); legalMoment's test passes with the machine in UTC and in America/Chicago; eslint on src/features/legal, src/features/admin/legal and the locales 0 problems; prettier 3.8.3 --check clean on every carrier file; `tsc --noEmit` clean; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; scripts/list-action-labels.test.ts passes (the button has three words); `bash scripts/check-migrations.sh` "Migration guard OK." with M12 in place; `bun run scripts/i18n-map-guard.ts` rewrote the two maps, then "usage maps match the tree". Not run by the supervisor: the browser suite (CI on your commit runs it).
- THE STRINGS the carrier writes (for your report's key-by-key list, G43; copy nothing from here by hand). New, 11:
  - `legal.accept.tickFirst.both`: "I am 18 or older. I agree to the Terms of Service, and I have read the Privacy Policy." / «ዕድሜዬ 18 ወይም ከዚያ በላይ ነው። በአገልግሎት ውሎቹ እስማማለሁ፤ የግላዊነት መመሪያውንም አንብቤያለሁ።»
  - `legal.accept.tickFirst.terms`: "I am 18 or older. I agree to the Terms of Service." / «ዕድሜዬ 18 ወይም ከዚያ በላይ ነው። በአገልግሎት ውሎቹ እስማማለሁ።»
  - `legal.accept.tickFirst.privacy`: "I am 18 or older. I have read the Privacy Policy." / «ዕድሜዬ 18 ወይም ከዚያ በላይ ነው። የግላዊነት መመሪያውን አንብቤያለሁ።»
  - `legal.accept.tickFirst.docs`: "I am 18 or older. I agree to the documents above." / «ዕድሜዬ 18 ወይም ከዚያ በላይ ነው። ከላይ ባሉት ሰነዶች እስማማለሁ።»
  - `legal.accept.tickNew.both`: "I agree to the new Terms of Service, and I have read the new Privacy Policy." / «በአዲሶቹ የአገልግሎት ውሎች እስማማለሁ፤ አዲሱን የግላዊነት መመሪያም አንብቤያለሁ።»
  - `legal.accept.tickNew.terms`: "I agree to the new Terms of Service." / «በአዲሶቹ የአገልግሎት ውሎች እስማማለሁ።»
  - `legal.accept.tickNew.privacy`: "I have read the new Privacy Policy." / «አዲሱን የግላዊነት መመሪያ አንብቤያለሁ።»
  - `legal.accept.tickNew.docs`: "I agree to the documents above." / «ከላይ ባሉት ሰነዶች እስማማለሁ።»
  - `legal.accept.decline`: "Decline, sign out" / «ውድቅ አድርገው ይውጡ»
  - `admin.users.legal.acceptedAt`: "{date} · shown in {language} · signed in by {method}" / «{date} · በ{language} ታይቷል · በ{method} ገብቷል»
  - `admin.users.legal.adult`: "18 or older confirmed" / «ዕድሜው 18 ወይም ከዚያ በላይ መሆኑን አረጋግጧል»
  Retired, 6 (nothing reads them after the carrier): legal.accept.tick1.both, legal.accept.tick1.terms, legal.accept.tick1.privacy, legal.accept.tick1.docs, legal.accept.tick2, admin.users.legal.acceptedMeta.

THE CARRIER — B22T12-TURN-CARRIER-2026-10-20.md (28,844 bytes; sha256 04a5b7ee117f745ca58cc0e50e7153590312947e33c4d79c791939a85c694280; 57 sections)
- Its first line starts "B22T12 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes: `REPLACE-LINES a-b` — replace lines a to b (1-based, inclusive) of the base file with the section's text; `INSERT-AFTER n` — insert the section's text after line n of the base file (n = 0 means at the top); `APPEND` — add the section's text to the end of the base file; `NEW` — create the file with exactly the section's bytes; `REPLACE` — the file's whole new content. Apply every section of one file from the highest line number down, so earlier line numbers stay valid. Line numbers refer to the base's file.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header, reading each file whole before any file is opened for writing. Write by script, never by hand, and never retype a line.
- The two usage maps (docs/generated/i18n-usage.json, public/i18n-usage.json) are not in the carrier: the usage-map guard writes them at the end of the checks.
- After the carrier and the checks, `sha256sum` of these 17 files → each equal to:
  ccd6ccdff6168a1cd7367c7e76e1ed3151769897d3cdda531b7461c9de8d7ca6  docs/_changelog.md
  77a933d5ef4714154605d3f64db44718f9892b391cdae3a2a0939a9bb3992071  docs/features/legal.md
  3077ffc64702c48354a2b5ae35cc961d203f5914f7face36776f5414547a046f  docs/generated/i18n-usage.json
  3077ffc64702c48354a2b5ae35cc961d203f5914f7face36776f5414547a046f  public/i18n-usage.json
  a4d261a503b817deeba067a281b0dae639e6e67d020633a0003d1c7b91872bc2  roadmap.md
  12d08c477d17d2f425c9d1f2a15a3cd7244a90f02186ba7fcc1b1ed3431c03d1  scripts/public-surface-allowlist.txt
  cbdc825fba788e9f70b802a45479e45265119fcb1e8b4ec1fdb52cf2c48d8a6d  src/features/admin/legal/user-legal-card.tsx
  058bffa5aa6452a4da111245f36d671fec88807d490d9f61712d6e6625d2065f  src/features/legal/legal-accept-screen.test.tsx
  9ba042b4d0d6899b2715a814cc999c8f476f9ab3d3d1463d572cbe5a7126ac5a  src/features/legal/legal-accept-screen.tsx
  af0142c64ae997d5ae26282b65892507bfa1b64f903972ec54b072abb64fd9eb  src/features/legal/legal-kinds.test.ts
  65cc4217b0f1a82d4a8ab83666c48f0ad4d72a7d2ff52db5fec81a53deaefb11  src/features/legal/legal-kinds.ts
  4f9aaf8189a1e9da6aad553303e634ca61731e13cde415f6bd8051fbbce803a3  src/features/legal/legal-reader.ts
  4755ca0eff0709e8c8ffb6a487120654c08c2fef0b5a133e79eb10a9c60f47c8  src/features/legal/my-legal-page.tsx
  11f5945bcca1a41d5cdad3018021f2aaaf2c68bb7ca26a684dd47e5779af6825  src/features/legal/use-legal-gate.test.tsx
  4c984c0b5bb6d752d825397474413ed87da654f865087e3eda126c671e55822e  src/features/legal/use-legal-gate.ts
  c7e7d041dc88e87188fd4b72111275997fb761e174b0fa45bd4bd14bcf6afd62  src/i18n/locales/am.ts
  b084cd15143c3aee4317f61e0e376a054811d3b000f49fb5bc91356096b81615  src/i18n/locales/en.ts
  A mismatch is a STOP: report the path, your hash and the expected one, and change nothing else.

PART D — THE BROWSER TESTS (you write them; line numbers as at 42c88cdf).
D1. e2e/legal-accept.spec.ts.
  - LAC-1 (:125): title "LAC-1 the hard stop and the one tick, with the 18+ statement the first time". Replace the tick steps (:140-:146: the adult click, "tick 1 alone is not enough", the privacy Read, the text check, the adult-checked check, the consent click) with: the screen contains "I am 18 or older. I agree to the Terms of Service, and I have read the Privacy Policy."; click `legal-accept-tick`; open the privacy row's Read as today and check its text as today; `legal-accept-tick` is checked; then `await expect(submit).toBeEnabled();` as today. In the rows loop (:153-:159) every row's data_consent is false (message "no separate storage consent"); adult_confirmed true and language en as today.
  - LAC-2 (:164): title "LAC-2 only a terms document: the Terms-only tick"; the expected text (:172) becomes "I am 18 or older. I agree to the Terms of Service."; the consent-count line (:174) goes; the click (:175) is on `legal-accept-tick`. The rest as today.
  - LAC-3 (:183): title "LAC-3 the exempt pages stay; other pages redirect; Decline, sign out records nothing"; before the click on `legal-accept-signout` (:200), `await expect(page.getByTestId("legal-accept-signout")).toHaveText("Decline, sign out");`.
  - LAC-4 (:208): title "LAC-4 a material change brings the screen back with version 2, asking no 18+ statement again"; keep the v1 acceptance through the door (its p_adult true); keep `seedVersion`'s returned id at :232 (`const v2 = await seedVersion(...)`). After `await expect(row).toContainText("Version 2");`: the screen contains "I agree to the new Terms of Service." and does not contain "18 or older"; the click (:240) is on `legal-accept-tick`; after the URL check, DB truth through `acceptanceRows(person.id, [terms.versionId, v2])`: two rows, v1's adult_confirmed true, v2's adult_confirmed false.
D2. e2e/legal-doors.spec.ts.
  - LG-11 (:1073-:1141): title "LG-11 accept_legal with no separate storage consent: Terms and Privacy accepted together and no consent recorded; the histories show it and a notice's version name". The two refused calls (`withoutConsent`, `consentFalse`, :1081-:1093) go; `accepted` is called with p_version_ids both, p_language en, p_adult true and no p_data_consent, and its error is null; DB truth: both rows written, data_consent false on each; in the histories loop, data_consent false for both versions in my_legal_history and admin_user_legal_history; the notice's label check as today.
  - LG-23, new, after LG-14 inside the same describe: "LG-23 the 18+ statement once: accept_legal refuses adultRequired until the caller has confirmed it, then accepts without it and records adult_confirmed as sent; my_legal_status carries adult_confirmed". Two fixtures (`seedFixture(`${RUN_TAG}-w`, null)` and `-x`), one leased person, `asPerson`. my_legal_status for the two kinds → two rows, each adult_confirmed false. accept_legal([w], en, p_adult false) → error contains "adultRequired". accept_legal([w], en, p_adult true) → null. my_legal_status → one row, x's version, adult_confirmed true. accept_legal([x], en, p_adult false) → null. DB truth (service client, the person's rows for the two versions): w's adult_confirmed true, x's false. my_legal_status → no row.
  - LG-24, new, after LG-23: "LG-24 admin_export_legal_acceptances: refused for an anonymous caller, a plain user, an admin by role and a stale second factor; the super admin reads a published version's acceptances page by page — account id, time, language, method, home country and the two flags, never a name or e-mail — with one audit row". One fixture (`${RUN_TAG}-y`); two leased people, the second granted the role admin (`grantRole`, as LG-2); each accepts the fixture's version through accept_legal with p_adult true (the first in en, the second in am). Refusals: `asAnon()`, the plain person and the admin by role → error contains "permission denied"; the pooled super admin with a stale second factor (`asPerson(pooledSuperAdminCredentials())`, as LG-2) → an error that does not contain "permission denied". Then `useJobSuperAdmin(page)` and `asToken(await superAdminToken(page))`: p_limit 0 and p_limit 5001 → "badValue:limit"; p_after_at alone → "badValue:after"; a random uuid as p_version_id → "unknownVersion". Page 1 (p_limit 1) → version 1, kind the fixture's kind, country_code null, one row, `next` not null; page 2 (p_limit 1, p_after_at and p_after_id from page 1's next.at and next.id) → one row, `next` not null; page 3 (from page 2's next) → no row, `next` null. The two rows' account_id are the two people's ids; their languages en and am; each row's keys, sorted, are exactly accepted_at, account_id, adult_confirmed, data_consent, home_country, language, method. The audit: exactly one audit_log row with action 'legal.acceptances_exported' and entity_id the fixture's version id (service client read; the refused calls and pages 2 and 3 write none). Cleanup: the fixture in afterEach as today; the audit row stays (audit history is append-only).
D3. e2e/legal-admin.spec.ts.
  - `accept` (:119-:123): its options gain `adult?: boolean`, sent as `p_adult: options.adult ?? true` (the default stays true).
  - LGA-7 (:379): after the "first" check (:400), the acceptance shows `user-legal-adult` once.
  - LGA-9, new, after LGA-8: "LGA-9 the user Legal card: 18 or older confirmed only on the acceptance that confirmed it, each time with seconds". Two scratch kinds (`scratch("i")`, `scratch("j")`), each seeded; one leased person accepts the first (default) and then the second with `{ adult: false }`; `useJobSuperAdmin(page)`; `/admin/users/<id>`; two `user-legal-acceptance` rows; the row with the first kind (`.filter({ hasText: <kind> })`) shows `user-legal-adult` once with the text "18 or older confirmed", the row with the second shows none; the first row's text matches /\d{2}:\d{2}:\d{2}/.
D4. The owed-test census (G37), in the report: `grep -rn "legal-accept-adult\|legal-accept-consent\|consentRequired\|tick1\.\|tick2\|I am 18 or older and\|acceptedMeta\|legalDate\|user-legal-acceptance\|my-legal-acceptance" e2e src --include=*.ts --include=*.tsx`, each hit named with whether this turn changes it. Expected after D1 to D3: no `legal-accept-adult`, `legal-accept-consent`, `consentRequired`, `tick1.`, `tick2` or "I am 18 or older and" left in e2e/ or src/ (the comments of the landed migration files excepted).

THE CHECKS (whole; paste the last line of each): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (expected 1258 passed); `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bash scripts/check-browse-imports.sh` OK; `bash scripts/check-migrations.sh` "Migration guard OK."; the preview harness's "build OK"; at the end, `bun run i18n:map-guard` "usage maps match the tree" (run it twice when it first rewrites the maps).

PART E — THE LOCAL END-TO-END TRY (after the operator's "continue": M12 must be on ethio-staging first).
E1. Run one file at a time, each whole, both projects, 0 retries: `bun run e2e:local -- e2e/legal-accept.spec.ts --retries=0`, then e2e/legal-doors.spec.ts, then e2e/legal-admin.spec.ts. Paste each run's summary lines.
E2. A failure: read its error and its context, fix it at its root cause (G38), and run that file again whole.
E3. If the browser guard stops the run (INC-506), paste its message once and go on to THE CI WAIT REPORT.

SCOPE — these files only: the brief; the 17 paths of the hash table; the migration file the tool writes; src/integrations/supabase/types.ts if the tool regenerates it; e2e/legal-accept.spec.ts, e2e/legal-doors.spec.ts, e2e/legal-admin.spec.ts (Part D only); the files of an A2 fix and of a Part E fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No package change.
THE STOP REPORT (after the checks; then STOP): "TURNS 10 AND 11 — FINAL REPORT" first, when A2 could write it; done or not done by part; A1's six lines with the run's number and commit (and A2's fix, if any); <START>; the census (a) to (d); B0's facts; B1's "Migration guard OK." line; the migration's file name and size in bytes; B2's diff; B3's read-backs; the carrier applied — the 17 hashes as `sha256sum` printed them; the strings key by key with their English (G43); D4's census; the checks; `git diff --name-only <START>`; anything not foreseen; and, last, the operator's staging line: "apply <the uuid fragment of M12's file name> → expect mark 20261020200000". Then STOP: the operator applies M12 on ethio-staging, reads the mark back and sends "continue".
THE CI WAIT REPORT (after Part E; not a conclusion): E3's message, or E1's summary lines and E2's fixes; `git diff --stat <START>`; `git diff --name-only <START>`; the line "Waiting for CI on <the commit this turn leaves> — the next brief's Part A concludes this turn." Then END THE TURN (the platform commits and syncs); send nothing after the report.
REVERT: a later migration that restores my_legal_status from M2's file and accept_legal from M3a's, drops admin_export_legal_acceptances and the permission legal:export (the constraint is not restored: rows recorded without the 18+ statement would break it); git revert of this turn's commits.
```
