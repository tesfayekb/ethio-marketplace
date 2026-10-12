# Bundle 11 — turn C6: C4's red — the translations export reads by key (INC-568), and tests set their headers on their own page (INC-569): brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — TURN C6 (2026-10-12). ONE TURN, ONE MIGRATION. No new strings. No package change.
Base: the dev commit that applied turn C5's carrier (C5-TURN-CARRIER-2026-10-12) with docs/governance/briefs/bundle-11-turn-34.md; the census below proves every file by content. This file is public: it is written as build instructions. Tier A: the new read door for the translations export and the export that uses it (the translations dashboard). Tier B: the tests and the docs.

ANSWERS TO THE LAST TURN
- Turn C5: its brief and carrier were sent before this one; the supervisor verifies its landing (the census below checks its files by content).
- Turn C4: verified (dev 2fb73b85 holds the delivered tree and the brief as sent). CI run 38223982726 on 2fb73b85: FAILURE on TR-29 and VP-11 only (1,609 passed) — this turn fixes both.

WHY THIS TURN — CI on 2fb73b85 (turn C4) failed on two tests; everything else passed (1,609). Neither is C4's code.
- TR-29 (shard 2, mobile-360): "the CSV export was page-scoped: 2252 stable+own rows against a 2251-row expectation", on both attempts. INC-568: the export paged the console's list by position (offset, 200 rows at a time). Another writer adding or removing a row in the language between two pages makes a row repeat or drop out of the file. The fence language TR-29 exports is shared, and other tests write in it at the same time. It is the class INC-452 fixed for the other admin reads (src/lib/read-all-pages.ts: "a page is asked for by KEY, never by position"); the translations export was missed by that census. TR-29 has failed and passed on retry eleven times since 2026-09-17 (INC-345). Its count was also read after the download, while other jobs' setup clears the fence's rows older than an hour.
- VP-11 (shard 8, desktop-1280): "Test timeout of 60000ms exceeded" on both attempts, with no line to read ("context file not found"). INC-569: VP-11 opened a second browser context only to set the edge header, so the run kept no page snapshot and none of the fixture's error capture. LS-3, LS-4 and LS-6..LS-10 (shell.spec.ts) do the same. What ran out of time is not known; the supervisor's hypothesis is the pooled account's lease under load (INC-555's class).

WHAT THIS TURN BUILDS
- The migration (the appendix; read it whole): `admin_export_translations(p_lang, p_after, p_limit)`. It returns one language's rows, every status, orphaned or not, with the base language's value and context — the same rows the list returned for the export — ordered by key, after the key given, at most 1,000 rows (1 to 1000, else "limit out of range"). It refuses with "not signed in", then "permission denied" without translations:view. It is read only and a stable definer; the signed-in role runs it, anon and PUBLIC do not. Proofs B1–B4.
- src/features/admin/translations/translations-service.ts:
  - `fetchAllTranslationRows(lang, fetchPage?)` reads `admin_export_translations` through `readAllPages`: each next page after the last key, 1,000 a page (`EXPORT_PAGE_SIZE` = `PAGE_ROWS`), ending on a short page; a failed page fails the export.
  - The row mapping the list already did is one function, `translationRowOf`, used by the list and the export.
- src/integrations/supabase/types.ts: `admin_export_translations` in Functions (from the carrier). If the platform regenerates the file after the migration, that is allowed: name it in the report.
- scripts/public-surface-allowlist.txt: the new door's line (the migration guard refuses the GRANT without it).
- src/features/admin/translations/export-all.test.ts — the pages asked for by key; a write between two pages that repeats and drops nothing (INC-568); the short page; the exact multiple (one more, empty page); a failed page.
- e2e/admin-translations-governance.spec.ts — TR-29:
  - It reads the fence's stable keys (no `e2e.scratch.` key) through the service client, by key, before the click and after the download.
  - It reads the file with the app's own CSV reader (`fromCsv`), so a quoted line break stays inside its row.
  - It asserts:
    - no key twice;
    - every key present at both readings is in the file;
    - nothing in the file was absent at both readings;
    - its own key is there once.
  - The import, re-import and undo halves are unchanged.
- e2e/viewing-place.spec.ts VP-11, and e2e/shell.spec.ts LS-3, LS-4, LS-6, LS-7, LS-8, LS-9, LS-10:
  - The edge headers are set on the test's own page's context (`page.context().setExtraHTTPHeaders(…)`; LS-10's cookie through `page.context().addCookies(…)`).
  - No second browser context. Every assertion kept.
  - LS-11 keeps its second context: it needs one that has never asked the routes.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The export reads through a new read door rather than a redeclared list door: the console's list is not touched.
- The door allows at most 1,000 rows a page (the data API's own cap).
- Tests that need request headers set them on their own page; a second context only for a second person or an isolated browser state (the rule in e2e-harness.md).

TESTS
- Unit: export-all.test.ts (above).
- E2E: TR-29 (above); VP-11, LS-3, LS-4, LS-6..LS-10 (moved, not changed).
- Not edited: every other test.

DOCS
- translations.md (the export reads by key; coverage), e2e-harness.md (a test's own page carries its headers; the census of the fifteen second contexts), the changelog, the roadmap (line 3; the C6 line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn C5 applied)
- typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 698 unit tests (117 files), the usage maps (they match: no key moved), the hardcoded-string scan, the import, listing-write, browse and marketplace guards, the root-route check, the selector self-test, the identity-tag guard, the build and the bundle budget: all clean. `MIGRATIONS_DIR=<a copy with the migration as 20261011000000_c6-check.sql> bash scripts/check-migrations.sh`: "Migration guard OK"; without the allowlist line the public-surface guard refuses it.
- The migration on a local PostgreSQL 16 copy (stand-ins for the tables, the right and the session): it applies and its proofs pass. Each proof fails on a broken copy: a page by position (B2), anon allowed to run it (B1), the session check removed (B2).
- Called there with 2,500 rows, 1,000 a page, with a writer between the pages (a key added before the cursor, a row already read removed, a later row removed, a later one added): 2,500 rows, none twice, none present throughout missing. The same writes under the old offset walk: 2,501 rows, one repeated.
- A limit of 0 or 1001 is refused.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-35.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect the C5 landing commit; it may still be running — paste what it shows). If it shows a commit older than the C5 landing, STOP and report; whatever its conclusion, go on (the supervisor reads that run, and a fix it needs comes in the next turn). You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit the platform pushes before the migration is on ethio-staging runs TR-29 against a staging database without the new door, so TR-29 fails there ("Could not find the function"). That is expected and is not fixed. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- Between the migration and the next Publish, the published site exports as before (the old reader); nothing changes for anyone until the Publish.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles, constraints and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 11 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-35.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 11 files → each equal to:
  65bc4e98682b318d1d6b3d46a168b4d9646ed02179ffe631267ab1edd6e6dcb3  docs/_changelog.md
  f7af81fc86b3bcda691bd3be0325f75cc7029671caea4f964a0f400fdbb9f379  docs/features/e2e-harness.md
  f824c32bd9f3c7373971f103d4a46144ba638ff57a430952befd1de648243d33  docs/features/translations.md
  8b9d85d143fafef6e08990100fd917b46314d8d249cdbb32a358576b748b0e31  e2e/admin-translations-governance.spec.ts
  7a8c803be83c4f9ea9e7deeccc2162d9f7f32bd80ae123053e9f4b4217b88375  e2e/shell.spec.ts
  502e78046bbb8a897b78702a913c398e45050e2eda906180231c1823d3144362  e2e/viewing-place.spec.ts
  8976294e5c3b2143efc4682096700e9ac8c0b1b583abe076bb6d107d41cafa26  roadmap.md
  1b6d0c9abff4736207346e8d69f2e6b48406ee34a0dbc495037ce025f50ba92b  scripts/public-surface-allowlist.txt
  691fb0a8a649e32c215fd6acb9d90a53d23300817b463e4f47fcc80aa7b0f7b4  src/features/admin/translations/export-all.test.ts
  751f6fa99c4d0ae3ff810ef08252af48f0b52a4af3184d099f4b1b74de8f8624  src/features/admin/translations/translations-service.ts
  086e084f11d5fa3ed4cd0264948568d9e0637f3857cb2286a691a270a7ac0dea  src/integrations/supabase/types.ts
- (c) `sha256sum docs/governance/briefs/bundle-11-turn-34.md` → 960d54c4946574edb2dce7c2b8836f6ea4bf3c41195e0a2d2158b162da5db7b0 (turn C5's brief, as sent).
- On ethio-prod with your query tool (SELECT only):
- (d) `select count(*) from pg_proc where pronamespace = 'public'::regnamespace and proname = 'admin_export_translations';` → 0
- (e) `select max(version) from public.migration_marks;` → 20261012170000

THE CARRIER — C6-TURN-CARRIER-2026-10-12.md (23,525 bytes; sha256 148429ffe2cbe66fbe6b7eb2f5f566a2fbf3c29e49274dd726fcf9773499a1ec; 50 sections)
- Its first line starts "C6 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 11 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  b6f88fc1e09ff35297ce5ea79161c5e31fa4244e471994ce9d1b9ed1d8609767  docs/_changelog.md
  e71e25cfebb078b6a93878f439168495cba0a0ce18004c8c15695f985dd389e8  docs/features/e2e-harness.md
  ee2177a9285ae1ee15b0aea52eb1ca2d2bf2d64ab448e893d9a6516f9ea88de8  docs/features/translations.md
  2bf9e91d9d88269181b3809ee2ba5409d48812958ba62466f4d71ca1c66fbebd  e2e/admin-translations-governance.spec.ts
  4736bb030e0203800d04c8678d14b3dc3012e9f47255dffe638569a0fdc29736  e2e/shell.spec.ts
  b919d9d4da13de59dce0175bb43f32856cf8b1c1395e9eb5611235aa96d1a500  e2e/viewing-place.spec.ts
  fe42b77a4b3416d8121f8a83ae0d1477187350dc2662a97e3d6ffe503461956d  roadmap.md
  f99cd41e793a901672b9a8e1717e1585019f3d29f329308c32bdb7afc14062db  scripts/public-surface-allowlist.txt
  ee828b540addd5f278546c7875bf36909fc56445329003baac47a90ec301b009  src/features/admin/translations/export-all.test.ts
  d4707270e8bef2ca3fc35d67a656cbb0859544182fd6a38911b35cb8e481758c  src/features/admin/translations/translations-service.ts
  97fd32235428ab659a603d917f781a3887483363925bdc86b03433bac783ac2c  src/integrations/supabase/types.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 698 passed (117 files);
- `bun run i18n:map-guard` "usage maps match the tree." (no rewrite expected this turn);
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn. TR-29 needs the migration on ethio-staging, which the operator applies after the turn; CI on the final commit is the proof (and the local browser does not start, INC-506).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 94b0684267ae2b9a099735c63bf3da997e4cb27bbba7b7f6545c7a8fa6a8fcfe (5,555 bytes, 110 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text under the name 20261011000000_c6-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261012170000 (the newest mark): if the reading gives 20261012170000 or less, use 20261012180000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select proname, prosecdef, provolatile, proconfig, has_function_privilege('anon', oid, 'EXECUTE'), has_function_privilege('authenticated', oid, 'EXECUTE') from pg_proc where oid = 'public.admin_export_translations(text,text,integer)'::regprocedure;` → admin_export_translations | t | s | {search_path=public} | f | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(e).
- The 11 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 11 carrier paths, the brief and the one migration file (and types.ts again if regenerated).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor), read back its mark; CI's preflight waits for it (up to 25 minutes) — if the run has already failed at the preflight, use "Re-run failed jobs". Then Publish once CI is green.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 11, turn C6 (2026-10-12). Tier A. The translations export reads by key (INC-568, INC-452's class).
-- e2e-areas: admin-translations
-- A. admin_export_translations(lang, after, limit) — NEW: one language's rows (every status, orphaned or not), with
--    the base language's value and context, ordered by key, after the key given, at most `limit` (1 to 1000) rows.
--    The export asks for each next page after the last key it already has, so another writer adding or removing
--    rows in the language between two pages can neither repeat nor drop a row that was there throughout.
--    The same right as the list it replaces for the export: translations:view. Read only.
-- B. Proofs: catalogue reads and calls with no session or a scratch identity that holds nothing; the door's
--    behaviour is proven by TR-29 and the export's unit tests.

-- ===== A — the export's reader, by key =====
CREATE FUNCTION public.admin_export_translations(
  p_lang text, p_after text DEFAULT NULL, p_limit integer DEFAULT 1000)
RETURNS TABLE(key text, lang_code text, value text, source_value text, status text,
              machine boolean, flagged boolean, flag_note text, updated_by uuid,
              updated_at timestamp with time zone, approved_by uuid,
              approved_at timestamp with time zone, orphaned boolean, context text)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
#variable_conflict use_column
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(auth.uid(), 'translations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 1000 THEN
    RAISE EXCEPTION 'limit out of range';
  END IF;

  RETURN QUERY
  WITH base AS (SELECT l.code FROM public.languages l WHERE l.is_base LIMIT 1)
  SELECT t.key, t.lang_code, t.value, src.value AS source_value, t.status,
         t.machine, t.flagged, t.flag_note, t.updated_by, t.updated_at,
         t.approved_by, t.approved_at, t.orphaned, src.context AS context
    FROM public.ui_translations t
    LEFT JOIN public.ui_translations src
      ON src.key = t.key AND src.lang_code = (SELECT code FROM base)
   WHERE t.lang_code = p_lang
     AND (p_after IS NULL OR t.key > p_after)
   ORDER BY t.key
   LIMIT p_limit;
END $$;

REVOKE ALL ON FUNCTION public.admin_export_translations(text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_translations(text, text, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_export_translations(text, text, integer) TO service_role;

-- ===== B — proofs (catalogue reads, and calls with no session or a scratch identity that holds nothing) =====
DO $proof$
DECLARE
  v_fn  text := 'public.admin_export_translations(text,text,integer)';
  v_def text;
  v_err text;
  v_who uuid := gen_random_uuid();
BEGIN
  -- B1: a stable definer with a fixed search path; the signed-in role runs it, anon and PUBLIC do not.
  IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
     OR (SELECT p.proconfig FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> ARRAY['search_path=public']
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> 's' THEN
    RAISE EXCEPTION 'C6 B1: % is not a stable definer with its search path', v_fn;
  END IF;
  IF has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
     OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                 WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
    RAISE EXCEPTION 'C6 B1: % privileges', v_fn;
  END IF;

  -- B2: its gates in order, the page asked for after a key, ordered by key, and nothing written.
  v_def := pg_get_functiondef(v_fn::regprocedure);
  IF v_def NOT LIKE '%auth.uid() IS NULL%has_permission(auth.uid(), ''translations'', ''view'')%p_limit > 1000%t.key > p_after%ORDER BY t.key%LIMIT p_limit%' THEN
    RAISE EXCEPTION 'C6 B2: admin_export_translations''s gates or its order';
  END IF;
  IF v_def LIKE '%UPDATE public.%' OR v_def LIKE '%INSERT INTO%' OR v_def LIKE '%DELETE%' OR v_def LIKE '%OFFSET%' THEN
    RAISE EXCEPTION 'C6 B2: the export reader writes nothing and never pages by position';
  END IF;

  -- B3: with no session it refuses before reading anything.
  PERFORM set_config('request.jwt.claims', '', true);
  v_err := NULL;
  BEGIN
    PERFORM public.admin_export_translations('en');
  EXCEPTION WHEN OTHERS THEN
    v_err := SQLERRM;
  END;
  IF v_err IS DISTINCT FROM 'not signed in' THEN
    RAISE EXCEPTION 'C6 B3: the export reader answered % to a call with no session', coalesce(v_err, 'nothing');
  END IF;

  -- B4: a scratch identity that holds no permission (no account row is written) is refused.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who, 'role', 'authenticated')::text, true);
  v_err := NULL;
  BEGIN
    PERFORM public.admin_export_translations('en');
  EXCEPTION WHEN OTHERS THEN
    v_err := SQLERRM;
  END;
  IF v_err IS DISTINCT FROM 'permission denied' THEN
    RAISE EXCEPTION 'C6 B4: the export reader answered % to an identity with no permission', coalesce(v_err, 'nothing');
  END IF;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
