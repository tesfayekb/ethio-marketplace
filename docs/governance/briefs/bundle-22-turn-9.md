# Bundle 22 — Stage 1, turn 9: turns 6 to 8 concluded from CI; INC-778's correction (M9); LG-5's cleanup in afterEach: brief (saved unchanged, 2026-10-19)

```text
BUNDLE 22 — STAGE 1, TURN 9 (2026-10-19). Tier A (one function re-declared). ONE MIGRATION BY THE TOOL (M9), FIRST — before any other change. No string. No package change. No AGENTS.md change: no new module, every change sits in files that exist today. Base: dev 888f756c (bundle 22 turn 8). Parts, IN THIS ORDER: A — CI first, and the conclusion of turns 6 to 8; STEP 0; B — M9 by the tool; C — LG-5's cleanup in afterEach; D — the docs and the roadmap; the checks; THE STOP REPORT with the apply line; after the operator's staging apply and "continue", E — the local end-to-end try; THE CI WAIT REPORT.

WHY
- INC-778: M8a landed admin_set_legal_settings with two assignments its brief did not carry — `operator_details` and `legal_phone` are stored as `NULLIF(p_settings ->> '<key>', '')` instead of `NULLIF(btrim(coalesce(p_settings ->> '<key>', '')), '')`, so surrounding spaces are no longer trimmed from those two optional legal facts (your G1 check found it; turn 8's ruling deferred the correction to this turn). M9 re-declares the function whole from M8a's supplied text. Nothing else in it changes; sold_visible_days stays.
- Turn 7 named one cleanup still in a test body: e2e/legal-doors.spec.ts LG-5 resets the leased person's home country and deletes its extra versions in a `finally` (Knowledge J3: "deleted in a hook that survives a timeout (afterEach, not only a body finally) by a destroy that throws on failure"). This turn moves it into the file's afterEach, restoring the home country the person had before the test.
- The supervisor's own slips that the executor's stops caught today are recorded (S322 the reworded key, S326 the new module, S327 the migration order, S324 LG-21's flow); this brief follows those rules: migrations first, no new module, no reworded key.

STEP 0 — save this file (the attached bundle-22-turn-9.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-9.md and paste its sha256sum. roadmap.md: (1) line 3 begins "The brief in force: docs/governance/briefs/bundle-22-turn-9.md (bundle 22 — Stage 1, turn 9: turns 6 to 8 concluded from CI; INC-778's correction, M9; LG-5's cleanup in afterEach). Next: bundle 22's close — Publish, the one walk, the records turn; then the banned-items and safety pages (after the curator's research) and the Terms and Privacy texts' approval and Amharic;" keeping the rest of the line from "D199 (discount / sale)" on; (2) after the line that begins "  - [ ] Turn 8 (docs/governance/briefs/bundle-22-turn-8-v2.md", one new line:
  - [ ] Turn 9 (docs/governance/briefs/bundle-22-turn-9.md; M9 mark 20261020120000; no string) — turns 6 to 8 concluded from CI; INC-778's correction (admin_set_legal_settings trims operator_details and legal_phone again); LG-5's cleanup in afterEach (J3)
Tick nothing. No report file in the repository.

HOW TO WORK
- Order of the turn: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Part B (M9, FIRST); Parts C and D; the checks; THE STOP REPORT with the apply line, and STOP; — the operator applies M9 on ethio-staging and sends "continue" —; Part E; THE CI WAIT REPORT; END THE TURN. Do not stop between parts — a clean point is not a reason to stop. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it"), as in turns 6 to 8: your sandbox cannot start a browser (INC-506), and the preview signed in and production are never used for tests (AGENTS.md; INC-464, DEC-146). The state a real user would hit is reached by CI's full run on your commit — real Chromium at 360 and 1280 px, the built app against ethio-staging, every test. You try Part E locally; when the browser guard stops it, you end the turn WITHOUT concluding (THE CI WAIT REPORT); the next brief's Part A reads that run and concludes this turn. The operator directs this.
- Run no stateful git command: the platform commits and syncs when the turn ends. Read-only `git diff` and `git rev-parse` are fine.
- Edit spec files by hand, never by search-and-replace (G37). No assertion loosened, no timeout raised, no retry added (G38). A shared helper never changes its default.
- Every legal test row stays a scratch one; no test writes legal_settings or listing_policy and no test creates a document of a real kind (G27).
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST, AND THE CONCLUSION OF TURNS 6 TO 8.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines with the run's number and commit (you cannot git-fetch that branch). Expected: run 1051 on 4a8e71dd (turn 8's first commit: its brief and M8a) or run 1053 on 888f756c (turn 8's last commit; queued behind 1051, about 55 minutes once it starts). 1052 on 33be4112 was cancelled as superseded. If it names any failing test or job: read its body at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md or https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md, quote it in the report's first lines and fix it first, at its root cause (G21, G38). On 4a8e71dd, LG-21 and the public-surface guard (F2's allowlist lines landed later in turn 8) are expected red and need nothing from you.
A2. When ci-status.md names the commit turn 8 left (888f756c (bundle 22 turn 8)), read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md and https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md and write "TURNS 6 TO 8 — FINAL REPORT" as the first section of this turn's stop report: ci-status.md's six lines; the lines of e2e-last-failure.md that name LG-19, LG-20, LG-21, LG-22, LGC-5, e2e/legal-certify.spec.ts, e2e/legal-doors.spec.ts, e2e/legal-admin.spec.ts or e2e/ad-page-doors.spec.ts, or its "passed" line; your verdict. On SUCCESS with none of those named as failed, the central flows of turns 6, 7 and 8 are verified end-to-end. Any failure: read its body, fix it at its root cause first (G21, G38), and name it with its fix. If that run has not been published when you reach THE CI WAIT REPORT, read it once more then; still not published: say so, and the next brief's Part A concludes turns 6 to 9 together.

PART B — M9, BY THE TOOL, FIRST (the tool applies it on ethio-prod the moment it is saved, after the operator allows the "Modify Supabase database" dialog; its first statement refuses unless M8d's mark is there).
B0. Before M9, from ethio-prod's read tool: admin_set_legal_settings' live argument list, provolatile, prosecdef, proconfig, whether anon and authenticated may EXECUTE it, and the sha256 of its live definition text compared, ignoring whitespace, with supabase/migrations/20261019222105_f4f10b49-3bcb-44a4-a847-4c7ac1e202bc.sql (M8a as landed). Expected: (p_settings jsonb), v/true/{search_path=public}, anon false, authenticated true, equal to the file. Any difference: STOP before M9 and quote it.
B1. Run `bash scripts/check-migrations.sh` and paste its last line ("Migration guard OK.") before the save. Then submit exactly the text between "=== M9 BEGIN ===" and "=== M9 END ===" below (those two lines excluded), once. The supervisor applied it to a scratch PostgreSQL 16 holding bundle 22's legal files and M8a as landed: its proofs passed; with a caller (rolled back), operator_details "  Ethio.com LLC  " was stored as "Ethio.com LLC", a phone with spaces around it is still refused (badValue:legal_phone), sold_visible_days 45 is set and 0 and 366 are refused; and the repository's migration guard passed with it in place.
B2. THE TEXT CHECK (INC-777, INC-778): write that block from the saved docs/governance/briefs/bundle-22-turn-9.md to a scratch file outside the repository with a script (never by hand) and run `diff -w <scratch file> <the saved migration file>`; paste its output. Expected: nothing. A whitespace-only difference is not shown by -w and is not a stop; any other line: say so first in the stop report and change nothing more in the database.
B3. Read back on ethio-prod: `select version from public.migration_marks where version = '20261020120000'` (one row); the header and grants as in B0.
=== M9 BEGIN ===
-- e2e-areas: legal
-- Bundle 22 (Stage 1) turn 9 — M9: INC-778's correction. M8a landed admin_set_legal_settings with two assignments its
-- brief did not carry (operator_details and legal_phone stored untrimmed: NULLIF(p_settings ->> '<key>', '')). This file
-- re-declares the function whole from M8a's supplied text (the brief bundle-22-turn-8-v2.md, block M8a): both are
-- stored as NULLIF(btrim(coalesce(p_settings ->> '<key>', '')), ''), as from M3b to M8a. Arguments, header, revoke and
-- grants unchanged; sold_visible_days (M8a) kept.
-- Gated on M8d's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020110000') THEN
    RAISE EXCEPTION 'bundle 22 turn 8 M8d (mark 20261020110000) must be applied first';
  END IF;
END $$;

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
                     'account_keep_months','technical_keep_months','sold_visible_days') THEN
      RAISE EXCEPTION 'badValue:%', v_key;
    END IF;
  END LOOP;
  -- Every number is checked before anything is written, so a bad value is refused as badValue:<key>
  -- and never reaches the table's CHECK constraints (INC-762).
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key IN ('liability_limit_usd','notice_days','response_days','response_extra_days',
                 'deleted_ad_keep_months','dispute_keep_years','listed_ad_keep_months',
                 'account_keep_months','technical_keep_months','sold_visible_days') THEN
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
         OR (v_key = 'sold_visible_days' AND (v_num < 1 OR v_num > 365)) THEN
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

-- Proofs, with no caller (G39): a missing caller is refused as before; the two assignments trim again and the
-- sold_visible_days key of M8a is kept; header and grants as declared.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  v_src  text;
BEGIN
  BEGIN
    PERFORM public.admin_set_legal_settings('{"sold_visible_days": "30"}'::jsonb);
    RAISE EXCEPTION 'proof failed: admin_set_legal_settings answered a missing caller';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
  END;
  SELECT p.provolatile, p.prosecdef, p.proconfig, p.prosrc INTO v_vol, v_def, v_conf, v_src
    FROM pg_proc p WHERE p.oid = 'public.admin_set_legal_settings(jsonb)'::regprocedure;
  IF v_vol IS DISTINCT FROM 'v' OR v_def IS DISTINCT FROM true OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
    RAISE EXCEPTION 'proof failed: admin_set_legal_settings header (%, %, %)', v_vol, v_def, v_conf;
  END IF;
  IF position('NULLIF(btrim(coalesce(p_settings ->> ''operator_details'', '''')), '''')' IN v_src) = 0
     OR position('NULLIF(btrim(coalesce(p_settings ->> ''legal_phone'', '''')), '''')' IN v_src) = 0 THEN
    RAISE EXCEPTION 'proof failed: operator_details or legal_phone is not trimmed';
  END IF;
  IF position('OR (v_key = ''sold_visible_days'' AND (v_num < 1 OR v_num > 365))' IN v_src) = 0 THEN
    RAISE EXCEPTION 'proof failed: the sold_visible_days bound of M8a is missing';
  END IF;
  IF has_function_privilege('anon', 'public.admin_set_legal_settings(jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_set_legal_settings(jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof failed: admin_set_legal_settings grants';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020120000') ON CONFLICT (version) DO NOTHING;
=== M9 END ===

PART C — LG-5'S CLEANUP IN afterEach (e2e/legal-doors.spec.ts).
C1. `Fixture` (:141-:147) gains `extraVersionIds: string[]` and `homeReset: { userId: string; code: string | null } | null`; `seedFixture` (:150) starts them as `[]` and `null`. `destroyFixture` (:195) first restores `homeReset` when it is set (`profiles.home_country_code` back to the recorded code for that user; an error is a failure, so it throws as the other steps do), then deletes the acceptances, notices and versions of `extraVersionIds` before the fixture's own versions, each with the same `step(...)` check.
C2. LG-5 (:584): drops its local `extraVersionIds` (:589), its `try {` (:590) and its whole `finally { … }` block (:708 to the block's end); the two lines that add a version id to `extraVersionIds` (:617, :658) add it to `fixture.extraVersionIds` instead; before the home country is set to "DE" (:700-:704), it reads the person's current `profiles.home_country_code` with the service client and records `fixture.homeReset = { userId: person.id, code: <that value> }`. The test body is otherwise unchanged (re-indented only).
C3. In the report: `grep -n "finally" e2e/legal-doors.spec.ts e2e/legal-certify.spec.ts` (expected: none outside the afterEach hooks' own try/catch).

PART D — THE DOCS AND THE ROADMAP.
D1. docs/features/legal.md, the "## Turn 8 — the sold ad's shown days as a setting" section: after its "- **INC-777.**" bullet, one new bullet: "- **INC-778 (turn 9).** M8a's admin_set_legal_settings had lost the trimming of operator_details and legal_phone (a transcription slip); M9 re-declares it from M8a's supplied text, so both are trimmed again." In the same file, the bullet that begins "- **Cleanup (turn 7).**" gains at its end: " LG-5's home-country reset and extra versions joined the afterEach in turn 9."
D2. docs/_changelog.md APPEND one line: "- 2026-10-19 — Bundle 22 (Stage 1) turn 9 (one migration, M9; no string): turns 6 to 8 concluded from CI; INC-778's correction (admin_set_legal_settings trims operator_details and legal_phone again); LG-5's cleanup in afterEach (J3). apply <M9's eight characters> → expect mark 20261020120000."
D3. roadmap.md as STEP 0 says.

THE CHECKS (whole; paste the last line of each): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (the real count); `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bash scripts/check-browse-imports.sh` OK; `bash scripts/check-migrations.sh` "Migration guard OK."; the preview harness's "build OK"; LAST, `bun run i18n:map-guard` "usage maps match the tree".

PART E — THE LOCAL END-TO-END TRY (after the operator's "continue": M9 must be on ethio-staging first).
E1. Run one file at a time, each whole, both projects, 0 retries: `bun run e2e:local -- e2e/legal-doors.spec.ts --retries=0`, then e2e/legal-admin.spec.ts. Paste each run's summary lines.
E2. A failure: read its error and its context, fix it at its root cause (G38), and run that file again whole.
E3. If the browser guard stops the run (INC-506), paste its message once and go on to THE CI WAIT REPORT.

SCOPE — these files only: the brief; roadmap.md; the migration file the tool writes; src/integrations/supabase/types.ts if the tool regenerates it; e2e/legal-doors.spec.ts (C1, C2 only); docs/features/legal.md (D1 only); docs/_changelog.md; the files of an A2 fix and of a Part E fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No package change.
THE STOP REPORT (after the checks; then STOP): "TURNS 6 TO 8 — FINAL REPORT" first, when A2 could write it; done or not done by part; A1's six lines with the run's number and commit (and A2's fix, if any); <START>; B0's facts; B1's "Migration guard OK." line; the migration's file name and size in bytes; B2's diff; B3's read-backs; C3's grep; the checks; `git diff --name-only <START>`; anything not foreseen; and, last, the operator's staging line: "apply <the uuid fragment of M9's file name> → expect mark 20261020120000". Then STOP: the operator applies M9 on ethio-staging, reads the mark back and sends "continue".
THE CI WAIT REPORT (after Part E; not a conclusion): E3's message, or E1's summary lines and E2's fixes; `git diff --stat <START>`; `git diff --name-only <START>`; the line "Waiting for CI on <the commit this turn leaves> — the next brief's Part A concludes this turn." Then END THE TURN (the platform commits and syncs); send nothing after the report.
REVERT: a later migration that restores admin_set_legal_settings from the file named in B0 (forward only); git revert of this turn's commits.
```
