# Bundle 13 — photos, turn 14: Admin › Services › AI — what each feature does, and the spend of each day: brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 13 — PHOTOS (D154–D166) — TURN 14 (2026-10-14). ONE TURN, ONE MIGRATION. 15 new strings. No package change.
Base: dev 052c6c1e (turn 13's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the migration (a new admin read door `admin_ai_spend_days`, its grants and proofs) and scripts/public-surface-allowlist.txt (its line). Tier B: the AI console (src/features/admin-ai/), its tests, src/integrations/supabase/types.ts (the door's entry), e2e/admin-services.spec.ts. Tier C: the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 13 verified: dev 052c6c1e equals the supervisor's tree with the saved brief (sha256 37abb836…, equal).
- Turn 12 verified: its landing equals the supervisor's tree with the saved brief and the migration (mark 20261014130000); your read-back matched; the Photoroom key is saved.
- CI: turns 10 and 11 are green (2f73df1b, eb8da59d). Turn 12's run waits for ethio-staging, where the operator has applied its migration; turn 13's follows. The supervisor reads both as they land. No fix rides this turn.

WHY THIS TURN
- The operator (2026-10-14): "please document or have the documentation in the admin section so we can see daily charges with ability to turn on or off the feature".
- Admin › Services › AI (bundle 13 turn 5) already has each feature's switch, monthly budget and price in the row's Edit (services:manage and a second factor), and this month's spend and today's calls. It has no charge per day and no word of what a feature does. The cost of every call is already counted per day in `ai_spend_days` (turn 1), which the browser cannot read.

WHAT THIS TURN BUILDS
- The migration (the appendix): `admin_ai_spend_days(p_days integer DEFAULT 30)` — signed-in callers only; `services:view` checked inside; a window of 1 to 92 days (`badValue:days`); the rows of `ai_spend_days` for the last p_days UTC days, today included, scratch `e2e-` features left out, newest day first (feature, day, calls, units, cost_microusd). `ai_spend_days` stays closed to the browser. Proofs of the header, the grants and the two refusals.
- scripts/public-surface-allowlist.txt: one line naming the door (its EXECUTE to authenticated).
- src/integrations/supabase/types.ts: the door's entry (`admin_ai_spend_days: { Args: { p_days?: number }; Returns: Json }`), so the client's call is typed before the platform regenerates the file.
- src/features/admin-ai/ai-service.ts: `featureAboutKey` (each feature's line of what it does and who provides it), `SPEND_DAYS` (30), `aiSpendDaysOf` (the door's rows read as promised, else the read is refused — F4), `listAiSpendDays`, `spendByDay` (the days with a call, newest first, for one feature or all of them summed); `featureLabelKey` and `featureAboutKey` read only the maps' own members (the own-key rule: a feature's id comes from a row). src/features/admin-ai/use-ai-features.ts: `useAiSpendDays`.
- src/features/admin-ai/ai-spend-days.tsx (NEW): Spend by day, under the table — a picker (All features, then each feature by name), one row a day (day, calls, spend), the total of the days shown, the empty line, the failed read with Retry.
- src/features/admin-ai/ai-page.tsx: each feature's line of what it does under its name (`ai-<feature>-about`; the name keeps `ai-<feature>-name`), and Spend by day under the table. The switch stays the row's Edit.
- The usage maps; the strings; docs/features/ai-services.md ("Bundle 13 turn 14"); the changelog; the roadmap (line 3 and the turn-14 line).

STRINGS (15 NEW)
- NEW `admin.ai.about.photo_screen`: "Checks every photo sellers upload (Google Gemini)." · «ሻጮች የሚጭኗቸውን ፎቶዎች ሁሉ ይመረምራል (Google Gemini)።»
- NEW `admin.ai.about.writing_helper`: "Suggests an ad's title and description when the seller asks (Google Gemini)." · «ሻጩ ሲጠይቅ የማስታወቂያውን ርዕስና መግለጫ ይጠቁማል (Google Gemini)።»
- NEW `admin.ai.about.name_check`: "Checks whether a new seller name imitates a well-known company, brand or person (Google Gemini)." · «አዲስ የሻጭ ስም የታወቀን ኩባንያ፣ የንግድ ምልክት ወይም ሰው አስመስሎ እንደሆነ ይፈትሻል (Google Gemini)።»
- NEW `admin.ai.about.category_images`: "Makes category pictures for staff (Google Gemini)." · «ለሠራተኞች የምድብ ምስሎችን ይሠራል (Google Gemini)።»
- NEW `admin.ai.about.category_icons`: "Suggests category icons for staff (Google Gemini)." · «ለሠራተኞች የምድብ አዶዎችን ይጠቁማል (Google Gemini)።»
- NEW `admin.ai.about.translations`: "Machine-translates text for staff (Google Translate)." · «ለሠራተኞች ጽሑፍን በማሽን ይተረጉማል (Google Translate)።»
- NEW `admin.ai.about.background_removal`: "Removes the background of a seller's cover photo when the seller asks (Photoroom)." · «ሻጩ ሲጠይቅ የሽፋን ፎቶውን ዳራ ያስወግዳል (Photoroom)።»
- NEW `admin.ai.days.title`: "Spend by day" · «የቀን ወጪ»
- NEW `admin.ai.days.hint`: "The last {days} days (UTC), counted by our server: each call at its feature's price, the same count the month's spend and the budgets use. The provider's own bill is the final figure." · «ያለፉት {days} ቀናት (UTC)፣ በአገልጋያችን የተቆጠሩ፦ እያንዳንዱ ጥሪ በአገልግሎቱ ዋጋ፤ የወሩ ወጪና በጀቶቹ የሚጠቀሙበት ያው ቆጠራ ነው። የመጨረሻው አሃዝ የአቅራቢው የራሱ ሂሳብ ነው።»
- NEW `admin.ai.days.all`: "All features" · «ሁሉም አገልግሎቶች»
- NEW `admin.ai.days.day`: "Day" · «ቀን»
- NEW `admin.ai.days.spend`: "Spend" · «ወጪ»
- NEW `admin.ai.days.empty`: "No AI calls in the last {days} days." · «ባለፉት {days} ቀናት የሰው ሰራሽ አስተውሎት ጥሪ የለም።»
- NEW `admin.ai.days.total`: "Last {days} days: {spend} for {calls} calls" · «ያለፉት {days} ቀናት፦ ለ{calls} ጥሪዎች {spend}»
- NEW `admin.ai.days.error`: "The spend by day could not be loaded." · «የቀን ወጪውን መጫን አልተቻለም።»

DECIDED BY THE OPERATOR
- His request (above): the charges of each day and the switch, in the admin section, with each feature described.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The switch is not moved or doubled: it stays the row's Edit, behind the second factor.
- The last 30 UTC days, a row a day, the days with no call left out; one feature at a time or all together; the total of the days shown. The door allows up to 92 days for later use.
- The figures are the server's own count (each call at its feature's price — the count the month's spend and the budgets already use); the page says the provider's bill is the final figure.
- Each feature's line names its provider (Google Gemini, Google Translate, Photoroom).
- The ids: AID-1..AID-6, AIP-2, SV-5.

TESTS
- Unit, NEW: AID-1..AID-3 (src/features/admin-ai/ai-service.test.ts: the door's rows and a row out of shape; the days summed or kept for one feature, newest first, a day with no call left out; every feature's line and name, and none for a name every object has), AID-4..AID-6 (src/features/admin-ai/ai-spend-days.test.tsx: all features, the picker, a failed read), AIP-2 (src/features/admin-ai/ai-page.test.tsx: the line under the name and the section). Edited: ai-page.test.tsx's mock of use-ai-features gains `useAiSpendDays` (AIP-1 is otherwise unchanged). 840 in all.
- E2E, edited (e2e/admin-services.spec.ts): SV-1 also finds the door refused to a seller; SV-4 finds the features' table by its caption (the page now has a second table); SV-5 NEW — the door's rows (the seven features only, inside the last 30 days, whole numbers, newest first), a 0-day and a 93-day window refused, and the page (the line under background removal's name, the picker's eight choices, a day row and the total, or the empty line). Read only (G27).
- Red first: SV-5, AID-1..AID-6 and AIP-2 prove new behaviour; SV-4's caption is new because the section's table is new.
- Leases: SV-1 a scratch seller; SV-4 and SV-5 the super admin.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 052c6c1e with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 840 unit tests (146 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test, the import gate, the listing-write guard, the browse-path and marketplace guards, a build, the bundle budget (JS 312.5 KiB of 320).
- The migration on a local PostgreSQL 16 copy of `ai_spend_days` with stand-in rows: it applied and its proofs passed; a caller with the permission read 3 rows for 30 days (today's two features and the day 29 days back; the day 30 days back and the `e2e-` row left out) and 4 for 31 days; 93 days refused `badValue:days`.
- `scripts/check-migrations.sh` with this migration as 20261014131500_b13t14-check.sql: "Migration guard OK".
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-14.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 11's, 12's or 13's commit, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. The published site keeps working: it does not call the new door.
- The expected red window (G35): CI on a commit pushed before the migration exists on ethio-staging runs SV-1 and SV-5 against a staging without the door, and they fail. That is expected and is not fixed. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles, features and constraints. Never an e-mail address, a user id, a token, a key, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 17 carrier paths and the brief. src/integrations/supabase/types.ts is in the carrier; if the platform regenerates it after the migration, name it in the report and paste `git diff src/integrations/supabase/types.ts`. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-14.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 15 files → each equal to:
  d3eb7e9f6847432d6fde4267410fe8e62faeaa5e016dc88615c03bb18b146a9c  docs/_changelog.md
  8ce90a2054079267cf9c63a23874e5ab2e8e3526f7069a0a21f31f0ad2a9172a  docs/features/ai-services.md
  3ad0d6e1050c7384df356e5f18ed0af8236c30fe38b3236a28fcab95db126b81  docs/generated/i18n-usage.json
  672d722e3892908d13fefd24acc1e5650e467956da76d8f838882082ed5460b2  e2e/admin-services.spec.ts
  3ad0d6e1050c7384df356e5f18ed0af8236c30fe38b3236a28fcab95db126b81  public/i18n-usage.json
  4e1f7fc992193922ed8256ae937575fac107afbdabd43d77e5641e47b9a5ace7  roadmap.md
  8271712dbea54f422a1b25bab30fbb6f9d9c9db6766ebd27adcaaf24d9250ec0  scripts/public-surface-allowlist.txt
  6ffb2f98f59eb330b048cd5de1a3f43d9725cd77bb3a4625119bfc78c246675f  src/features/admin-ai/ai-page.test.tsx
  355fc493777a606a772333f76bd091a9a509bcf8665c63bfb3b6674b7384969a  src/features/admin-ai/ai-page.tsx
  ddf8054711b0e593f93478ce02ff71d8c260b9b1a4ec69a20cadd06cceb1b956  src/features/admin-ai/ai-service.test.ts
  5b2001bc9003c65c6741f80d10d633dcaa9fdd6139139baea903a91120125a8c  src/features/admin-ai/ai-service.ts
  f82b50ccdacd407eefecb482dd747dc79ed851995221bbabc203802c6a37709e  src/features/admin-ai/use-ai-features.ts
  8edcb8acefcaa194ddd19c7f357abfc5e40dac3965765608adc19feb08234605  src/i18n/locales/am.ts
  f5b2b1891b17d0aefe6ad79d92590fbcb5ccd53f981c3b8b83481db448a79bcd  src/i18n/locales/en.ts
  022e8909c109fbfbc76b9c227e28cf164840a56246a2c1b7de386f64fa8f80cf  src/integrations/supabase/types.ts
- (c) `ls src/features/admin-ai/ai-spend-days.tsx src/features/admin-ai/ai-spend-days.test.tsx` → no such files.
- On ethio-prod with your query tool (SELECT only):
- (d) `select to_regprocedure('public.admin_ai_spend_days(integer)') is null;` → t.
- (e) `select max(version) from public.migration_marks;` → 20261014130000 (turn 12's mark; turn 13 had no migration).

THE CARRIER — B13T14-TURN-CARRIER-2026-10-14.md (35,834 bytes; sha256 997a76fe826990ca69a7b938e5320da1b2c2c642ec8824af95a2b33d59ced1d3; 39 sections)
- Its first line starts "B13T14 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 17 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  d8507388f0b2cb3d655913c4438eafa8ddad12dc3888686b896293bb4217c680  docs/_changelog.md
  ef0e5f19d0e9b8c657d850826f294a0bb8bc636f9bb5e4e52bc90e86c0f4e837  docs/features/ai-services.md
  24b409f822a11364e273bf6a9d7cebc2ee3f9d717862bec552750a6e64f087ba  docs/generated/i18n-usage.json
  a8c1567b0eabfbc8732a553ebfb7a8bbda0f3d29e6c655ad7af5da94232407cc  e2e/admin-services.spec.ts
  24b409f822a11364e273bf6a9d7cebc2ee3f9d717862bec552750a6e64f087ba  public/i18n-usage.json
  281cc21f742d9a81fdb029ed0c346452f50a07733eca8eccdfeff205d88184dd  roadmap.md
  08384f2a9e3b89e8043e566f53f5dc8a5b4cc8c025c01bd7bf4ebe01b106268a  scripts/public-surface-allowlist.txt
  eceff8a0f833f6d16df860722277e89a62208e7b3f3c650d1522227940debbcc  src/features/admin-ai/ai-page.test.tsx
  6fca8433c8b55d1793566bffacd1ac37930e6a91faa281c35531abf85ca179d9  src/features/admin-ai/ai-page.tsx
  48383e48e2edb82a9ce58bee48e4d19e0012e48bfdad86cc99a01e07a7a6683c  src/features/admin-ai/ai-service.test.ts
  355dc820b0c40723b6fe7a667ece003819a2a12e782fe1308f92a9e2432a4fed  src/features/admin-ai/ai-service.ts
  e1f663a69971fa4c415cbe80121cd1fc5fe90c270064a2bd34c327153493bdf5  src/features/admin-ai/ai-spend-days.test.tsx
  77433ac793a37d65aa1040305178e26fb0058a5cfd477c05e7b292066336c7f8  src/features/admin-ai/ai-spend-days.tsx
  f5d5e02eaa6e979c4ecf24f15c9965f29ca49571866e289e5209e5cb4a606341  src/features/admin-ai/use-ai-features.ts
  1f310fb2332a85966f8c039e94d3d30dbd7f17cb5d5857838048052ecbad14db  src/i18n/locales/am.ts
  d9d99e7a0520efc717c2e3bc158c775e0d9c4b86db0776181cead85249ee8b19  src/i18n/locales/en.ts
  727827de1f6a9a2a27a90f32386d1c5ca5e2252f62aa27d994b5822cb28058d4  src/integrations/supabase/types.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t14.log` — 840 passed (146 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck and a build on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs SV-1, SV-4, SV-5 and every other spec.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 3e2e6f14090f11501ce1656563286e285179a5887c27d89625edd522d727e812 (4,155 bytes, 87 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261014131500_b13t14-check.sql (a stamp later than turn 12's mark and earlier than any mark you can choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261014130000 (the newest mark): if the reading gives 20261014130000 or less, use 20261014140000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select p.provolatile, p.prosecdef, p.proconfig, pg_get_function_identity_arguments(p.oid) from pg_proc p where p.oid = 'public.admin_ai_spend_days(integer)'::regprocedure;` → s | t | {search_path=public} | p_days integer;
- `select has_function_privilege('anon', 'public.admin_ai_spend_days(integer)', 'EXECUTE'), has_function_privilege('authenticated', 'public.admin_ai_spend_days(integer)', 'EXECUTE');` → f | t;
- `select has_table_privilege('authenticated', 'public.ai_spend_days', 'SELECT');` → f.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(e).
- The 17 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 17 carrier paths, the brief and the one migration file. `git ls-files src/features/admin-ai/ai-spend-days.tsx src/features/admin-ai/ai-spend-days.test.tsx`, so the new files are shown tracked (G20).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- The strings: each new key, its English and its Amharic, as written (G43).
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each warning that names `admin_ai_spend_days`, and the total count (a signed-in door that checks services:view itself is expected to be named, as `admin_ai_features` is).
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging (the SQL editor) and read back its mark. CI's preflight waits for it (up to 25 minutes); if the run has already failed at the preflight, use "Re-run failed jobs".
2. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
3. Publish only when the supervisor says the newest commit is green and Lovable is idle.
4. Then the supervisor's walk.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 13 (photos), turn 14 (2026-10-14). Tier A. The operator (2026-10-14): "please document or have the
-- documentation in the admin section so we can see daily charges with ability to turn on or off the feature" —
-- Admin › Services › AI shows the spend of each of the last 30 days. The switch stays the row's Edit
-- (`admin_set_ai_feature`, 20261013184636).
-- e2e-areas: admin-services
--
-- A. A read door, admin_ai_spend_days(p_days integer DEFAULT 30): signed-in callers only (REVOKE FROM PUBLIC, anon;
--    EXECUTE to authenticated, as `admin_ai_features`); it refuses no caller ('not authenticated'), a caller without
--    services:view ('permission denied') and a window outside 1 to 92 days ('badValue:days'). It answers the rows of
--    `ai_spend_days` for the last p_days UTC days, today included, scratch `e2e-` features left out, newest day first:
--    feature, day, calls, units, cost_microusd. No table, policy or table grant changes: `ai_spend_days` stays closed
--    to the browser.
-- B. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the header (STABLE, SECURITY DEFINER,
--    search_path public) and the grants; no caller and a caller without the permission (a random id: no such account
--    exists) are refused, in that order before the window is read.

-- A
CREATE OR REPLACE FUNCTION public.admin_ai_spend_days(p_days integer DEFAULT 30)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_first date;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'services', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  IF p_days IS NULL OR p_days < 1 OR p_days > 92 THEN RAISE EXCEPTION 'badValue:days'; END IF;
  v_first := (now() AT TIME ZONE 'utc')::date - (p_days - 1);
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'feature', s.feature,
             'day', s.day,
             'calls', s.calls,
             'units', s.units,
             'cost_microusd', s.cost_microusd)
           ORDER BY s.day DESC, s.feature)
      FROM public.ai_spend_days s
     WHERE s.day >= v_first
       AND s.feature !~ '^e2e-'), '[]'::jsonb);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_ai_spend_days(integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_ai_spend_days(integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_ai_spend_days(integer) TO service_role;

-- B
DO $$
DECLARE
  v_msg text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc
                  WHERE oid = 'public.admin_ai_spend_days(integer)'::regprocedure
                    AND provolatile = 's' AND prosecdef
                    AND proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof B1 failed: the header is not as written';
  END IF;
  IF has_function_privilege('anon', 'public.admin_ai_spend_days(integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_ai_spend_days(integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof B1 failed: the grants are not as written';
  END IF;

  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.admin_ai_spend_days(30);
    RAISE EXCEPTION 'proof B2 failed: no caller read the spend';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'proof B2 failed: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims',
                     json_build_object('sub', gen_random_uuid()::text, 'role', 'authenticated')::text, true);
  BEGIN
    PERFORM public.admin_ai_spend_days(0);
    RAISE EXCEPTION 'proof B2 failed: a caller without services:view read the spend';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'proof B2 failed: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);
END $$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
