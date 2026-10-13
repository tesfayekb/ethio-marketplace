# Bundle 13 — photos, turn 2: the operator's photo walk first — a reload keeps the draft, Next and Back wait for photos on their way, the cover's ribbon, and the text store follows the code (INC-603–INC-605, INC-607, D160): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 13 — PHOTOS (D154–D159) — TURN 2 (2026-10-13). ONE TURN, ONE MIGRATION. Two new strings, one retired. No package change.
Base: dev 86a43919 (turn 1's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the migration (`admin_sync_ui_keys` redeclared whole, its proofs), the public-surface allowlist line for its restated grant, and the draft's address in the posting wizard (INC-604).
Tier B: the photo step (src/features/posting/step-photos.tsx), the wizard's Next and Back (src/features/posting/wizard.tsx), the Translations sync's message (src/features/admin/translations/translations-service.ts), the strings, the tests (PP-19, PP-20, TR-40), the generated usage maps, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 1 (the AI switches and meter): landed. Every path on dev equals the supervisor's copy byte for byte, the saved brief equals the upload, and the migration is the given text with the mark 20261014070000. Its CI verdict is the supervisor's to read, once the operator's staging apply lets the preflight pass.

WHY THIS TURN
- The operator walked the photo step on the published site (2026-10-13, 14:39 local). Four lines passed; these did not, and they come first (G26: a walk finding outranks a green test):
  - INC-604 — "reload by refreshing takes back to first step selecting category and none is saved". The draft is created at step 1, the moment a category is chosen, but /post kept its address, so a reload began a new wizard and the draft, its photos with it, was reachable nowhere (My listings is not built yet). The tests passed because they open /post/<id> directly.
  - INC-605 — "when a photo is uploading add photo is grayed out, so should next button and back bottons so it can not be clicked".
  - D160 — "make the cover box more prominent and have a red ribbon saying cover photo".
  - INC-603 — the site still says "up to 6 MB" after turn T17 removed it from the code. The site draws the Translations store's approved texts over the compiled catalogue. Sync keys writes the English texts again, but an Amharic text only while it is empty or untranslated, so a changed Amharic text never reaches a key the store already holds (INC-488's class, its second occurrence).
  - INC-607 — Sync keys' message always said "0 keys added across 0 languages, 0 Amharic values seeded": the screen read names the door never returned.
- Not in this turn: INC-606 (buyers do not see the seller's photo anywhere yet) is turn 3.

WHAT THIS TURN BUILDS
- PART 1 — the migration (the appendix; read it whole): `admin_sync_ui_keys(p_en jsonb, p_am jsonb DEFAULT NULL)`, redeclared WHOLE from its live definition (the last file declaring it is 20260831105914; census (d) checks the live fingerprint first), with three changes, each marked in the body:
  - (1) it counts the keys it adds (`keys_added`, counted before the upsert) and the staff languages it reaches (`languages`);
  - (2) INC-603: an Amharic text no person ever wrote follows the code's changed text. "No person wrote it" means no 'save' or 'machine' revision exists for its key; the console, an import and machine translation each write one. A text a person wrote is kept;
  - (3) its answer and its audit row carry `keys_added` and `languages`.
  - The header is unchanged (plpgsql, VOLATILE, SECURITY DEFINER, search_path public); its REVOKE and GRANTs are restated. Proofs B1–B3: the header, the grants, the body's rules. The sync needs translations:manage and a second factor, so TR-40 proves its behaviour on scratch keys.
- scripts/public-surface-allowlist.txt — one line for the restated grant of `admin_sync_ui_keys`. Without it, the migration guard fails.
- src/features/admin/translations/translations-service.ts — `syncUiKeys` reads the door's own names: `keys_added`, `am_seeded`, `languages`.
- src/features/posting/wizard.tsx:
  - INC-604 — once the draft exists on /post (the `listingId` prop is null and `draft.listingId` is not), the address is replaced in place with `/post/<id>`. This uses `window.history.replaceState(window.history.state, "", ...)`: no navigation, no remount, and the wizard keeps its step. A reload then opens the draft (D39), and a Back from a later page lands on /post/<id>;
  - INC-605 — `photosSending` (from the photo step) holds Next, Back and Back to review while the step is 2 and any photo is being prepared or sent. The line `post-nav-photos-sending` ("Wait until your photos are sent.") says why.
- src/features/posting/step-photos.tsx:
  - `onSendingChange` reports how many photos are 'preparing' or 'uploading' (0 on leaving the step);
  - D160 — the cover's tile is outlined in red (`border-2 border-destructive`), and its picture carries a red ribbon (`bg-destructive text-destructive-foreground`) reading "Cover photo" (`post.photos.coverRibbon`). The ribbon keeps the test id `post-photo-cover`. The label "Cover" (`post.photos.cover`) is retired, in both languages.
- The strings (listed below), and docs/generated/i18n-usage.json and public/i18n-usage.json (regenerated).
- e2e/photo-pipeline.spec.ts — `en` and `draftsOf` imported; two NEW tests at the end of its describe:
  - PP-19: a held upload. While the photo is sent, Next and Back are disabled and the line shows. Once it is stored they are enabled again, the line is gone, and the cover's ribbon reads "Cover photo";
  - PP-20: on /post, choosing a category gives the address /post/<id>, with one draft. A photo is uploaded, and after a reload the address is unchanged, step 1 is not shown, Back reaches the photos, the stored photo is there, and there is still one draft.
- e2e/admin-translations-console.spec.ts — TR-40 (NEW, at the end): two scratch keys, each with an Amharic text "TR-40 old"; one key also gets a 'save' revision. A sync with the compiled catalogues plus "TR-40 new" for both keys leaves the first at "TR-40 new" and keeps the second at "TR-40 old". Its answer carries `keys_added`, `languages` ≥ 1 and `am_seeded` ≥ 1. The scratch rows and their revisions are deleted in `finally`.
- docs/features/posting.md (a turn-2 section), docs/features/translations.md (the changed-seed section), the changelog, and the roadmap (line 3 and the turn-2 line).

THE STRINGS (G43 — the supervisor wrote the Amharic; the carrier carries both exactly)
- NEW `post.photos.coverRibbon` — "Cover photo" · «የሽፋን ፎቶ» (it takes the place of `post.photos.cover`)
- NEW `post.photos.waitSending` — "Wait until your photos are sent." · «ፎቶዎችዎ እስኪላኩ ይጠብቁ።»
- RETIRED `post.photos.cover` — "Cover" · «ሽፋን»

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The address changes in place, not by a navigation, so the seller stays on the step they are on.
- The ribbon is the red of the app's destructive colour (#B42318, white text), as the operator asked. It is a label, not a control.
- Back and Back to review wait too, not only Next.
- English texts keep their rule (Sync keys writes the code's English, as before). The new rule is for Amharic: it follows the code unless a person wrote it.
- After every Publish that changes a text, the operator presses Sync keys. Every brief that changes a text names that step.
- The new ids: PP-19, PP-20, TR-40.

TESTS
- E2E: PP-19, PP-20 (e2e/photo-pipeline.spec.ts), TR-40 (e2e/admin-translations-console.spec.ts), all NEW. Not edited: every other test. The ribbon keeps the test id `post-photo-cover`, so PP-15..PP-18 still find the cover.
- Unit: none changed (751).
- The migration's proofs B1–B3. The supervisor applied the migration to a local PostgreSQL 16 copy, with stand-ins for `languages`, `ui_translations`, `ui_translation_revisions`, `has_permission`, `require_step_up_if_needed`, `ui_sync_mark_orphans`, `log_audit` and `auth.uid()`:
  - it applied, and its proofs passed;
  - a sync with "New AM" for three keys gave this:
    - the key with only an 'approve' revision took "New AM";
    - the key with a 'save' revision kept the person's text;
    - an unchanged key stayed as it was;
    - a new key was seeded;
    - the answer carried `keys_added` 1, `languages` 1 and `am_seeded` 2.
- Red first: TR-40 reproduces INC-603. On the base it fails at its first value check, because the text no person wrote stays "TR-40 old" (not run here: the local browser does not start, INC-506). PP-19 and PP-20 prove new behaviour, so they need no red run (G38). On the base, PP-19 fails at Next while sending and PP-20 at the address.
- Leases: PP-19 and PP-20 lease one seller each; TR-40 uses the job's super admin.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 86a43919 with this turn's files)
- Clean:
  - typecheck (it covers e2e/), format, lint (0 errors, 33 warnings);
  - 751 unit tests (127 files);
  - the usage maps (regenerated; they match);
  - the hardcoded-strings guard (0 findings);
  - the selector self-test.
- `MIGRATIONS_DIR=<a copy with this migration as 20261013200000_b13t2-check.sql, its mark filled> bash scripts/check-migrations.sh`: "Migration guard OK". Without the allowlist line, the public-surface guard fails.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-2.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 1's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit pushed before the operator applies the migration on ethio-staging runs TR-40 against the old sync, and TR-40 fails at its first value check. That is expected and is not fixed. Any other red in that window is NOT expected. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies it.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans, the app's own texts and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 14 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-2.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 14 files → each equal to:
  1dd4f174a16fb5fdae475b2d6f5c5b15e7115df075888790d6e8f590c43ea87f  docs/_changelog.md
  20dddd046ec65a92c1b96a2b8fe29c439164c5c8f481025504f4f29612d6ad4f  docs/features/posting.md
  f1ba4afae7d37b3e4f6d32697edee901694882e00478dd52fe1c2b5880ac8a9b  docs/features/translations.md
  ffd3895831535e354047ec28f0e9aeb57044f901affcf19843d056f89354acf3  docs/generated/i18n-usage.json
  078e5d07e30e7ccfd36eded8bb09140d303e45ad052d6f5af3e8f34107076316  e2e/admin-translations-console.spec.ts
  a3845004a4b8b65bd1f62562e39950aff4deaf50623d8e07058d41e889f4a42e  e2e/photo-pipeline.spec.ts
  ffd3895831535e354047ec28f0e9aeb57044f901affcf19843d056f89354acf3  public/i18n-usage.json
  5ce481bd5c38bf75f6be50002657b0c864ee860c796927b125c11eb36722e7d4  roadmap.md
  65582f204a4296e6b2a2988935e0eb5693e3b5354f6107b21d1567cfe1401249  scripts/public-surface-allowlist.txt
  d4707270e8bef2ca3fc35d67a656cbb0859544182fd6a38911b35cb8e481758c  src/features/admin/translations/translations-service.ts
  762263e1c974874bc9be1be4392f6b42571d5e1a7b5d31f894f4ad23f1fef1c2  src/features/posting/step-photos.tsx
  1a266658b141a9ee67c16c513fc405ec327fc67976eba5fa86a593eac746c594  src/features/posting/wizard.tsx
  7e51c176036f1504c64233e9a06b7d39826303277706089e295182078dc6784e  src/i18n/locales/am.ts
  bd84f3571fb06d35bfe9b13b339a1d68616a9432550e23f50d238247b5ff032a  src/i18n/locales/en.ts
- On ethio-prod with your query tool (SELECT only):
- (c) `select max(version) from public.migration_marks;` → 20261014070000 (turn 1's mark).
- (d) `select md5(prosrc), length(prosrc), provolatile, prosecdef, proconfig from pg_proc where oid = 'public.admin_sync_ui_keys(jsonb, jsonb)'::regprocedure;` → ce715eb11f57027af6140c346fc02a16 | 2905 | v | t | {search_path=public}. Any other value is a STOP: the live sync differs from the file this redeclaration starts from.
- (e) — for the record, not a STOP: `select lang_code, value from public.ui_translations where key = 'post.photos.helper' order by 1;` and `select count(*) from public.ui_translation_revisions where key in ('post.photos.helper', 'post.photos.rules') and lang_code = 'am' and action in ('save', 'machine');`. Paste both results.

THE CARRIER — B13T2-TURN-CARRIER-2026-10-13.md (19,849 bytes; sha256 dee2d87d24d129a3b8e1a21ed8b5020f8153589c54d558fe36f74fa972e692b7; 35 sections)
- Its first line starts "B13T2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 14 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  762a65841e38e923628e0525b1638676c7109ac86783278726889748ede62c1e  docs/_changelog.md
  834447ecdedf92bca06e0e57cb2b0a871effd66c4225e2338136d42ec04fe2b8  docs/features/posting.md
  79ae08d3f267f6fb20635d8aed1cb24b90ea088dcf3534e6d3a76ac86d498d5b  docs/features/translations.md
  ff4dd8756883324c5407f17cbebace6daec50896fad8b3280f6b27b5e1a229e8  docs/generated/i18n-usage.json
  319717c775893bee8824562385511902273360eb2aa7ec5d89c930cd28ed68c6  e2e/admin-translations-console.spec.ts
  1f25b84cf130a8a2141327e0713cf86ce0ae44c338156737ef67cdccfcd536a1  e2e/photo-pipeline.spec.ts
  ff4dd8756883324c5407f17cbebace6daec50896fad8b3280f6b27b5e1a229e8  public/i18n-usage.json
  0067d99e78ed525842dcc7009318418b8bdd4d80d1041370fe966d006264b478  roadmap.md
  693c118ef8cfd2407d7e11c795701f337e0339a59c4e71d303183bb50777a156  scripts/public-surface-allowlist.txt
  ad78efb0fd0e7a9369f3472ad9b280e0ffa2381cbe6257bc9ef2de459776587f  src/features/admin/translations/translations-service.ts
  32fc1616f07cb91783a8f1d12c9622ea64adba5e34a6eb013ea71da2d620c156  src/features/posting/step-photos.tsx
  38c6933740ca6b712db3e5989e6c7e3c684787de0b86b4ebdec177e43b55d2e3  src/features/posting/wizard.tsx
  817e980bf45fccf388d0b79c962952c1896db2685ae39b0e9cb8b9a932cda476  src/i18n/locales/am.ts
  617c88937ad8d59adaa18ce17b891591dc099d9118c04ef0e288868205234d1a  src/i18n/locales/en.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t2.log` — 751 passed (127 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs PP-19, PP-20 and TR-40.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 870a3738957add7946bce53265e3e284822c72ed5791a31124f9fb7594a00675 (7,981 bytes, 141 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier, so the allowlist line is in place):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261013200000_b13t2-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261014070000 (the newest mark): if the reading gives 20261014070000 or less, use 20261014080000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select md5(prosrc), length(prosrc), provolatile, prosecdef, proconfig from pg_proc where oid = 'public.admin_sync_ui_keys(jsonb, jsonb)'::regprocedure;` → 9d7779e20bec8797d1063b724a4ab689 | 3989 | v | t | {search_path=public};
- `select has_function_privilege('anon', 'public.admin_sync_ui_keys(jsonb, jsonb)', 'EXECUTE'), has_function_privilege('authenticated', 'public.admin_sync_ui_keys(jsonb, jsonb)', 'EXECUTE');` → f | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(e).
- The 14 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 14 carrier paths, the brief and the one migration file (and types.ts if regenerated).
- The checks.
- The three strings, each key with its English and its Amharic, as the carrier left them (G43).
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging (the SQL editor) and read back its mark. CI's preflight waits for it (up to 25 minutes); if the run has already failed at the preflight, use "Re-run failed jobs".
2. Publish once CI is green on the final commit.
3. In Admin › Translations, press "Sync keys", answer the code prompt, and read its message.
4. Then the supervisor's short re-walk: the photo line without "6 MB", a reload that keeps the draft, Next and Back held while a photo is sent, and the ribbon.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 13 (photos), turn 2 (2026-10-13). Tier A. The walk fixes, the database part: the text store follows the code.
-- e2e-areas: admin-translations
-- INC-603 (the operator's walk, 2026-10-13): the live site still said "up to 6 MB" after turn T17 removed it from the
-- code. The site draws the Translations store's approved texts over the compiled catalogue, and Sync keys wrote the
-- English texts again but an Amharic text only while it was empty or untranslated, so a changed Amharic text never
-- reached a key the store already held (INC-488's class; its second occurrence).
-- INC-607: Sync keys' message always said "0 keys added across 0 languages, 0 Amharic values seeded": the screen read
-- names the door never returned (inserted, seeded, languages). The door now also returns how many keys it added and in
-- how many languages; the screen reads the door's own names (src/features/admin/translations/translations-service.ts).
-- A. admin_sync_ui_keys(jsonb, jsonb), redeclared WHOLE from its live definition (20260831105914, the last file that
--    declares it; its live fingerprint is checked before this file is written) with three changes, each marked in the
--    body: (1) the keys the sync adds are counted before the upsert ('keys_added'), and the languages it seeds are
--    counted ('languages'); (2) an Amharic text no person ever wrote — no 'save' or 'machine' revision for its key, the
--    revision the console, an import and machine translation each write — follows the code's changed text; a text a
--    person wrote is kept; (3) the return and the audit row carry 'keys_added' and 'languages'. Header unchanged:
--    plpgsql, VOLATILE, SECURITY DEFINER, search_path public; its REVOKE and GRANT restated.
-- B. Proofs: the header, the grants and the body's rules. The sync itself needs translations:manage and a second
--    factor, so its behaviour is proven by TR-40 (e2e/admin-translations-console.spec.ts) on the app's own connection,
--    on scratch keys.

-- ===== A — the sync =====
CREATE OR REPLACE FUNCTION public.admin_sync_ui_keys(p_en jsonb, p_am jsonb DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_base     text;
  v_en       bigint := 0;
  v_am       bigint := 0;
  v_added    jsonb := '{}'::jsonb;
  v_lang     record;
  v_n        bigint;
  v_orphaned bigint := 0;
  v_restored bigint := 0;
  v_marks    jsonb;
  v_new      bigint := 0;
  v_langs    bigint := 0;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'manage') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'manage');
  IF jsonb_typeof(COALESCE(p_en, 'null'::jsonb)) <> 'object' THEN
    RAISE EXCEPTION 'p_en must be a json object';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;

  -- INC-607 — the keys this sync ADDS, counted before the upsert (whose own
  -- count is every key of the catalogue).
  SELECT count(*) INTO v_new
    FROM jsonb_object_keys(p_en) AS k(key)
   WHERE NOT EXISTS (SELECT 1 FROM public.ui_translations x
                      WHERE x.key = k.key AND x.lang_code = v_base);

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      updated_by, updated_at, approved_by, approved_at,
                                      origin)
  SELECT e.key, v_base, e.value, 'approved', false, auth.uid(), now(), auth.uid(), now(),
         'sync'
    FROM jsonb_each_text(p_en) AS e(key, value)
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'approved',
        updated_by = auth.uid(), updated_at = now(), origin = 'sync';
  GET DIAGNOSTICS v_en = ROW_COUNT;

  FOR v_lang IN
    SELECT l.code FROM public.languages l WHERE l.enabled_admin AND NOT l.is_base
  LOOP
    INSERT INTO public.ui_translations (key, lang_code, status, origin)
    SELECT e.key, v_lang.code, 'untranslated', 'sync'
      FROM jsonb_each_text(p_en) AS e(key, value)
    ON CONFLICT (key, lang_code) DO UPDATE SET origin = 'sync';
    GET DIAGNOSTICS v_n = ROW_COUNT;
    v_added := v_added || jsonb_build_object(v_lang.code, v_n);
    v_langs := v_langs + 1;
  END LOOP;

  IF p_am IS NOT NULL AND jsonb_typeof(p_am) = 'object' THEN
    UPDATE public.ui_translations t
       SET value = a.value, status = 'approved', machine = false, flagged = false,
           flag_note = NULL, updated_by = auth.uid(), updated_at = now(),
           approved_by = auth.uid(), approved_at = now()
      FROM jsonb_each_text(p_am) AS a(key, value)
     WHERE t.lang_code = 'am' AND t.key = a.key
       AND (t.status = 'untranslated' OR t.value IS NULL OR t.value = ''
            -- INC-603 — an Amharic text no person ever wrote (no 'save' or
            -- 'machine' revision: the console, an import and machine
            -- translation all write one) follows the code's changed text. A
            -- text a person wrote is kept.
            OR (t.value IS DISTINCT FROM a.value
                AND NOT EXISTS (SELECT 1 FROM public.ui_translation_revisions r
                                 WHERE r.key = t.key AND r.lang_code = 'am'
                                   AND r.action IN ('save', 'machine'))));
    GET DIAGNOSTICS v_am = ROW_COUNT;
  END IF;

  v_marks := public.ui_sync_mark_orphans(p_en);
  v_orphaned := (v_marks->>'orphaned')::bigint;
  v_restored := (v_marks->>'restored')::bigint;

  PERFORM public.log_audit('translation.sync', 'ui_translations', v_base,
    jsonb_build_object('lang', v_base, 'action', 'sync', 'machine', false,
                       'en_upserted', v_en, 'keys_added_per_lang', v_added,
                       'am_seeded', v_am, 'orphaned', v_orphaned,
                       'orphans_restored', v_restored, 'keys_added', v_new,
                       'languages', v_langs));

  RETURN jsonb_build_object('en_upserted', v_en, 'keys_added_per_lang', v_added,
                            'am_seeded', v_am, 'orphaned', v_orphaned,
                            'orphans_restored', v_restored, 'keys_added', v_new,
                            'languages', v_langs);
END $$;

REVOKE ALL ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_sync_ui_keys(jsonb, jsonb) TO service_role;

-- ===== B — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_src text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc
                  WHERE oid = 'public.admin_sync_ui_keys(jsonb, jsonb)'::regprocedure
                    AND prosecdef AND provolatile = 'v'
                    AND proconfig @> ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof B1 failed: admin_sync_ui_keys is not VOLATILE SECURITY DEFINER with search_path public';
  END IF;
  IF has_function_privilege('anon', 'public.admin_sync_ui_keys(jsonb, jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_sync_ui_keys(jsonb, jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof B2 failed: the grants are not as written';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc WHERE oid = 'public.admin_sync_ui_keys(jsonb, jsonb)'::regprocedure;
  IF v_src NOT LIKE '%has_permission(auth.uid(), ''translations'', ''manage'')%require_step_up_if_needed(''translations'', ''manage'')%'
     OR v_src NOT LIKE '%SELECT count(*) INTO v_new%INSERT INTO public.ui_translations%'
     OR v_src NOT LIKE '%t.value IS DISTINCT FROM a.value%r.action IN (''save'', ''machine'')%'
     OR v_src NOT LIKE '%ui_sync_mark_orphans(p_en)%''keys_added'', v_new%''languages'', v_langs%' THEN
    RAISE EXCEPTION 'proof B3 failed: the body of admin_sync_ui_keys is not as written';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
