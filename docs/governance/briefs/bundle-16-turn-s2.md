# Bundle 16 — turn S2: abuse guards, part 2: brief, version 1 (saved unchanged, 2026-10-15)

```text
BUNDLE 16 — TURN S2 (2026-10-15). ONE TURN: ONE MIGRATION (ITS OWN ATTACHED FILE), A ROUTE CHANGE, STRINGS, TWO NEW TESTS WRITTEN BY YOU, DOCS. No package change.
Base: dev 5987574f (turn S1). The census below proves every file and the database by content. This file is public: it is written as build instructions.
Tier A: the migration (the sign-up hook, its domain list, the rate table's daily prune) and the upload route. Tier B: the tests. Tier C: the strings, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn S1 is verified on dev 5987574f: the 11 carrier paths equal the supervisor's copy byte for byte; the brief (f1190039…) and the migration (the brief's text, mark 20261016010000) are as written; PR-47, PR-48 and PR-49 are added to e2e/posting-routes.spec.ts, each cleaning its own rows and files in `finally`.
- CI on 590ff1b8 (turn E1, run 38707307020) ended red: ML-12, ML-13 and MLA-14 (INC-634, fixed first below) and PW-41 (INC-636, also first below). Every other job was green. The run on 5987574f (turn S1) was still running when this brief was written.

FIRST — THE RED ON 565b19bc (turns R2 and R3), INC-634. CI run 38705855855: 9 gating failures, three tests, all yours from turn R2, none a defect of the screens or doors:
- ML-13 and MLA-14, both projects — `copy_my_listing` answered 'residencyUnknown'. A new ad's home country is the server's residency fact (DEC-068), and the pool reset clears it (e2e/helpers/users.ts sets `observed_country_code` to null). A real seller who copies an ad has posted before, so the draft route has set it. FIX: in each test, before the first copy, set seller A's `user_directory` row through the service client to `observed_country_code: "ET"` and `observed_at` now (as a seller who has posted before); ML-13's home-country expectation then reads "ET". Nothing else in them changes.
- ML-12, mobile-360 — "Test timeout of 60000ms exceeded", then "listing not found" on the last call (the teardown had begun). The ten refusal cases read each ad's snapshot and revision count before AND after every call: about fifty sequential reads. FIX: read every ad's snapshot and revision count once before the ten calls and once after them, and compare each; then the judge's case as before. The same assertions; no timeout raised (G38).
- Class (G29): a test whose door needs a fact the fixture does not give (here residency) — the census for this turn: `git grep -n "copy_my_listing\|residencyUnknown" e2e` → only ML-13 and MLA-14 call a door that needs residency on a seeded seller.

ALSO FIRST — THE RED ON 590ff1b8 (turn E1), INC-636. CI run 38707307020: the same three tests (INC-634, above), and one more:
- PW-41 (e2e/post-wizard-place.spec.ts), mobile-360 — "Test timeout of 60000ms exceeded" inside its loop of 62 geocode calls, on a run whose staging answered slowly (502s and closed sockets elsewhere in the same run). Sixty-two sequential round trips inside one test's 60 s is INC-572's class (PR-33, fixed by batching) and ML-12's above: the third occurrence.
- FIX: the dial is reached the way PP-9 reaches the upload dial (`fillUploadCounter`, e2e/helpers/photos.ts). Before the route calls, through the service client, upsert the seller's `rate_limits` row: key the seller's id, action "geocode", window_start the current clock hour (`new Date(Math.floor(Date.now() / 3_600_000) * 3_600_000).toISOString()`), count 59 (the ceiling of 60, less one; GEOCODE_PER_HOUR, src/server/geo/geocode.ts :29). Then two route calls with distinct queries: the first answered `ok` true (the 60th), the second refused with field "geocode" and reason "rateLimited". Keep `inOneWindow(3600, 20_000, "PW-41")` before the upsert. In `finally`, delete the seller's "geocode" rows. The title and the refusal assertions stay; no timeout is raised.
- Class rule (G29; written now, third occurrence): a test that walks a dial to its ceiling sets the counter to the ceiling less one through the service client (its own key, the current window) and spends only the last calls through the route; it never makes tens of sequential calls inside one test's time. Census: `git grep -n "for (let" e2e/*.spec.ts` → PW-41 (62 route calls) is the one loop of more than 25 sequential calls to fix (PR-33 batches ten at a time; PR-26 makes 21 within its own 120 s; PR-7 makes 5 against a lowered dial; IG-3 makes up to 31 previews against the import gate's in-memory minute budget, which no row can set — flaky once in 17 days, watched, not changed). PR-50 below follows the rule.

WHY THIS TURN — D185 (the operator, 2026-10-15)
- "if no advertisement placed and just doing edit, add, delete without real adverts going on for some time, we may have to restrict that user": photos added to drafts by a seller who submits no ad stop past 50 in 7 days, until an ad is submitted.
- "we may have to restrict emails for accounts that have disposable fake emails as well": a sign-up whose e-mail is at a throwaway mail service is refused by the server, whatever path it comes from (his choice: the server-side hook, not the form alone).
- The rate-limit table is never pruned today (its only deletes are in migration proofs); a daily prune keeps it small.

WHAT THIS TURN BUILDS
- The migration — the attached file B16S2-MIGRATION-2026-10-15.sql (its text is not in this brief: 9,892 domains make it 151,797 bytes):
  A. `blocked_email_domains` (NEW table; row security on; no client role may read or write it), seeded with the 9,892 domains of the public disposable-email-domains block list (CC0), carriage returns removed before the split.
  B. `hook_before_user_created(event jsonb)` (NEW; STABLE SECURITY DEFINER, search_path public): refuses an e-mail whose domain, or a parent of it, is listed, with `{"error": {"http_code": 403, "message": "disposableEmail: …"}}`; passes anything else with `{}`. Executed only by supabase_auth_admin; revoked from PUBLIC, anon and authenticated.
  C. `rate_limits_prune()` (NEW; service role only) with its heartbeat table `rate_limits_prune_runs` and the daily schedule `rate-limits-prune` (43 3 * * *): windows that began more than 31 days ago go, except 'assist:listing' and 'background:listing'.
  P. Proofs: the table closed and seeded; the hook's answers (a listed domain, a listed parent, an unlisted domain, the e2e domain, no e-mail); headers and privileges; the schedule.
- The carrier:
  - src/routes/api/upload/photo.ts: a photo added to a DRAFT counts on `upload:draft-week` (7 days, `DRAFT_UPLOADS_PER_WEEK_WITHOUT_AD`, 50); past it, with no ad of the seller's whose `published_first_at` is within the last 7 days, the answer is the refusal `publishFirst` (field "photos"). Photos on any other status are not counted.
  - src/features/posting/refusal-text.ts: `publishFirst` → `post.photo.refusal.publishFirst`.
  - src/features/auth/auth-error-key.ts: a message holding `disposableEmail` → `auth.errorDisposableEmail`, read before the generic invalid-address check.
  - The strings (below), unit tests (the auth error key's case (vii); PRK-1, NEW file src/features/posting/photo-refusal.test.ts), the docs (auth-email-door, media-pipeline, posting), the roadmap and the changelog.
- The usage maps do not change: the two new keys are read through the refusal and error-key maps, which the usage map already counts. `bun run i18n:map-guard` proves it.
- THE TESTS (below): you fix ML-12, ML-13, MLA-14 and PW-41 (FIRST, above) and write SU-2 and PR-50.

THE STRINGS (English / Amharic; the supervisor's, read before they ship — G43; they travel in the carrier).
New, 2:
  - `post.photo.refusal.publishFirst`: "You have added many photos without publishing an ad. Publish one of your ads to add more photos." / «ማስታወቂያ ሳያወጡ ብዙ ፎቶዎችን አክለዋል። ተጨማሪ ፎቶ ለማከል ከማስታወቂያዎችዎ አንዱን ያውጡ።»
  - `auth.errorDisposableEmail`: "This email service gives out throwaway addresses. Please sign up with an email address you keep." / «ይህ የኢሜይል አገልግሎት ጊዜያዊ አድራሻዎችን ይሰጣል። እባክዎ በቋሚ ኢሜይል አድራሻዎ ይመዝገቡ።»

DECIDED BY THE OPERATOR (D185)
- 50 photos on drafts in 7 days with no ad submitted stops a draft's photos until an ad is submitted.
- Throwaway mail domains are refused by a server-side sign-up hook, switched on in the Supabase dashboard.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The list is the public disposable-email-domains block list (9,892 domains, CC0); staff add a domain with one row; a listed domain covers its subdomains. Big providers (Gmail, Yahoo, Outlook, iCloud and the like) are not on it.
- Only photos on drafts count toward the churn rule: editing a live ad's photos never stops a seller.
- The prune keeps 31 days, and keeps the per-listing budgets that run for years.

THE TESTS — you write them this turn, from the descriptions below (Tier B).
General rules:
- Each new test goes in its file's own `test.describe`, after the file's last test, titled exactly as below; reuse the file's own helpers. At most two leased accounts per test (DEC-174).
- Every row a test makes is its own and is removed in its `finally` (J3, G27). No real row is changed.
- G38: no assertion loosened, no timeout raised, no retry added, no dial raised.

SU-2 "SU-2 a throwaway mail address is refused at sign-up, in words, and no account is made (D185)" (e2e/auth-signup.spec.ts; the file's own sign-up form steps)
- On /auth, the sign-up view: an address `e2e-su2-<token>@mailinator.com` and a valid password typed twice, as the file's other sign-up tests type them; submit.
- The form shows en["auth.errorDisposableEmail"]; it does not reach the check-email view.
- Through the service client's auth admin API: no user has that e-mail (search by it).
- It needs the hook switched on in ethio-staging (the operator's step below). If the form instead reaches the check-email view, the failure message names that cause: "SU-2: the Before User Created hook is not switched on in ethio-staging".

PR-50 "PR-50 photos on drafts stop past 50 in 7 days with no ad submitted, and come back once one is (D185)" (e2e/posting-routes.spec.ts; `seller`, `category`, the file's draft and photo-upload helpers, `inOneWindow`)
- Seller A. Before anything else, remove A's listings through the service client (the file's own reaping helper), so no ad of A's was submitted in the last 7 days. A draft of A's on a scratch category.
- `inOneWindow(604800, 20_000, "PR-50")` (the 7-day window is floored to the epoch). Through the service client, upsert A's `rate_limits` row: key A's id, action "upload:draft-week", window_start `new Date(Math.floor(Date.now() / 604_800_000) * 604_800_000).toISOString()`, count 50 (the limit spent; the rule of INC-636 above — no loop of calls).
- As A: upload one photo to the draft (the file's own upload helper; fake mode) → the refusal reason "publishFirst" (field "photos").
- Through the service client: a scratch listing of A's with `status` "screening" and `published_first_at` now (as an ad just submitted).
- As A: the same upload → no refusal with reason "publishFirst" (the photo is stored).
- `finally`: delete A's `rate_limits` rows for action "upload:draft-week" and A's listings through the service client.

After writing them: `node_modules/.bin/prettier --write e2e/auth-signup.spec.ts e2e/posting-routes.spec.ts e2e/my-listings-doors.spec.ts e2e/my-listings-ad.spec.ts e2e/post-wizard-place.spec.ts`. No other test is edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 5987574f with this turn's carrier files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 887 unit tests (154 files), the usage maps (unchanged; they match), the hardcoded-strings guard (0 findings), the build and the bundle budget.
- The migration on a local PostgreSQL 16 over stand-in tables: applied cleanly, its proofs passed, with LF and with CRLF line endings (9,892 domains either way). Behaviour: the prune removed a 40-day window and kept a 2-day one, a 7-day counter and a 400-day per-listing budget, with its heartbeat; the hook refused a listed domain and passed an unlisted one, an empty event and an address without "@". A copy that granted the hook to signed-in users was refused by P3.
- `scripts/check-migrations.sh` with turn S1's migration and this one as scratch files: every guard OK, "Migration guard OK".
- The Amharic strings were checked by script: Ethiopic letters and punctuation only.
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-s2.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below), files and database. If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts since turn S1, name the difference and go on;
  4. the carrier, then the hashes;
  5. THE TESTS (the four fixes first, then SU-2 and PR-50);
  6. the checks;
  7. the migration LAST, then its read-back;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. Nothing changes for any visitor until the operator switches the hook on; the published upload route is unchanged until the next Publish.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 12 paths of the hash table, the brief, e2e/auth-signup.spec.ts, e2e/posting-routes.spec.ts, e2e/my-listings-doors.spec.ts, e2e/my-listings-ad.spec.ts, e2e/post-wizard-place.spec.ts and the one new migration file (the database tool names it). The database: ethio-prod through your tools — SELECT only, except the migration itself. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-s2.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 11 files → each equal to:
  6426a38c08ebfbc3128f91151307b375b45ef38a35f0bdab4055244d818983c5  docs/_changelog.md
  42bb84f5cfdb72cd5624a691f7a9ecc9de1dc535df2c3a8ab72ba01bd7545f03  docs/features/auth-email-door.md
  4b0065b4fca7e8dba08aef4c3448fa56fca2d448816c637de70385928a26dda8  docs/features/media-pipeline.md
  7c7d3d736993f2c1cf58d8148752d1f0825936ee4fc20579c760e90c0a7de3a9  docs/features/posting.md
  f8233aeb1f9ff653dffeab705f0dc5d79d8e4a8f3059ba8c158b2db70ba54bba  roadmap.md
  0353e52fa7700026242d3ee0206ec4c487c1ec1ab3c87215531a6b940896fa18  src/features/auth/auth-error-key.test.ts
  28d49923bc8727046f70db847b820c87cf676467f77f22243a442ff1194f0463  src/features/auth/auth-error-key.ts
  1a9089368685281718b1689a3815511fcd61fe2d23f11f4d1e5d669bb8411e1c  src/features/posting/refusal-text.ts
  1f0afb3fc25e7d014255f3cf30d6317122434411e7d2ac578d4a80e557eafd7e  src/i18n/locales/am.ts
  3018736bc8384a98da3822aed339c097fa7d99fb80b4b39c358962808ab9a0e3  src/i18n/locales/en.ts
  b481c58e61df78ce545ace5fe3a0cf682d2b3e2793caa7daea8ae93d8cb729ab  src/routes/api/upload/photo.ts
  and `ls src/features/posting/photo-refusal.test.ts 2>/dev/null` → nothing.
- (c) `sha256sum e2e/auth-signup.spec.ts e2e/posting-routes.spec.ts e2e/my-listings-doors.spec.ts e2e/my-listings-ad.spec.ts e2e/post-wizard-place.spec.ts` → b076abe21038a50c5e40b896c1706e774a994427be22ff30139be3885808c198, a3044b640c6eba1f0541df099cc8b64409ceaa449d1ec41a80ab533dbaffff76, 5548446f830879adda05b444fd6396c4e22813f95df2ad58f456f54aa906a601, e144b6889e0ad732b8d863febbfa2b888315f7f3c91eb606e0d600d6c5683842 and d246328f7d0cdd2f4b26912e7cd73e5e622c9b2f24ddb4987ff42083f9648500 (e2e/posting-routes.spec.ts as turn S1 left it); `ls supabase/migrations | tail -1` → 20261015102153_cb2ce284-09ce-4a1e-adab-baf061d8910e.sql (turn S1's; no migration since).
- (d) ethio-prod, your query tool (SELECT only):
  - `select max(version) from public.migration_marks;` → 20261016010000;
  - `select to_regclass('public.blocked_email_domains') is null, to_regprocedure('public.hook_before_user_created(jsonb)') is null, to_regprocedure('public.rate_limits_prune()') is null, (select count(*) from cron.job where jobname = 'rate-limits-prune'), (select count(*) from pg_roles where rolname = 'supabase_auth_admin');` → t | t | t | 0 | 1.

THE CARRIER — B16S2-TURN-CARRIER-2026-10-15.md (7,931 bytes; sha256 d74e7e4af9c2c6061b073b02e4f2f35f9cdd369dfd413b363fc00412bf9e2a4b; 15 sections)
- Its first line starts "B16S2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 12 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  f43501ae1d2b48a3ee8147e3d9b3dcbe787bf4f2fb682a662194fed87ca60236  docs/_changelog.md
  6f3bf1978d87ad6444d89fc3075a180c2d2d334e24c96485ec32d934d58ff65f  docs/features/auth-email-door.md
  a19ea0aceebf199f1dd3e59efcd39a78d5a60433060531208fa65d4e99be913e  docs/features/media-pipeline.md
  3da3d8507ff1b0ae8ce49bfcc43fed927b0741a38a50a54e7f3d41676f635d16  docs/features/posting.md
  0ece532ccb6b19bc2253dda64fc2d9764f3db632a5784462e0f51e5c47e0f85e  roadmap.md
  58e5e7070f3a6255042458eee1da01ec0a342a6cecdf1c95d348c251b3658f4f  src/features/auth/auth-error-key.test.ts
  6ad0b7bd4f1dbafbd1b3d649739c2278d092b8ffef3e15f4d8c28cb52649dfbd  src/features/auth/auth-error-key.ts
  707b5fef511bedaa699aedd73053ff5de260e60f0c1721b472aaab18b63773db  src/features/posting/photo-refusal.test.ts
  c76237160821dc3fc700610c0521b22a0b8f74dd95f5ea7300407af77bbafa0a  src/features/posting/refusal-text.ts
  73488250b31b29e335ada17a20eb9fb01be5b97cddd3f48ba35415f7ba40c6fd  src/i18n/locales/am.ts
  d8b483e651ad2768bce8d773ea88ff67b6ed6e95b48c16e3c02ebfea71b8665d  src/i18n/locales/en.ts
  3683f4635680ac1de0754da9856da28c58be48ca58ffcdb7f72f68aa57977d04  src/routes/api/upload/photo.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings — a warning in your tests is fixed, not left;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16s2.log` — 887 passed (154 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `grep -n 'test("SU-2\|test("PR-50' e2e/*.spec.ts` → two lines, each in its file;
- `git grep -n "observed_country_code" e2e/my-listings-doors.spec.ts e2e/my-listings-ad.spec.ts` → the residency set in ML-13 and MLA-14 (and ML-13's existing read);
- `git grep -n '"geocode"' e2e/post-wizard-place.spec.ts` → PW-41's counter upsert and its clean-up;
- Not run by you: the typecheck, the build, the bundle budget and the browser tests. CI judges them.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, yours included.

THE MIGRATION RULES (G39 — every one applies)
- The text is the attached file B16S2-MIGRATION-2026-10-15.sql (151,797 bytes, 10049 lines, ending with a newline; sha256 d28e1322340b52b888e9874fa7017b453320017dd9e90868e070e571f29701fa). Check its sha256 first. Write it EXACTLY, changing only `<MARK>` (its last line).
- Check it in a scratch folder first (after the checks):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261016020000_b16s2-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - if the result is below 20261016020000, use 20261016020000 (above 20261016010000, turn S1's mark, and equal to the scratch check's stamp);
  - the mark must also be later than the saved file's own stamp.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select count(*) from public.blocked_email_domains;` → 9892;
- `select public.hook_before_user_created('{"user":{"email":"a@mailinator.com"}}'::jsonb)->'error'->>'http_code', public.hook_before_user_created('{"user":{"email":"a@gmail.com"}}'::jsonb);` → 403 | {}  (if your query role may not execute the hook, say so and paste the privilege query below instead);
- `select has_function_privilege('supabase_auth_admin', 'public.hook_before_user_created(jsonb)', 'EXECUTE'), has_function_privilege('authenticated', 'public.hook_before_user_created(jsonb)', 'EXECUTE'), (select schedule from cron.job where jobname = 'rate-limits-prune');` → t | f | 43 3 * * *.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 12 sha256sum lines and the brief's; the sha256sum and line count of each of the five test files, and `git diff <START> -- e2e/`.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 12 paths, the brief, the five test files and the one migration file.
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each NEW warning, and the total count.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file. The hook is switched off in the dashboard in one click.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging: open the new migration file on GitHub (Raw), paste it into the ethio-staging SQL editor and run it; read back its mark with the line the report gives.
2. In the Supabase dashboard of ethio-staging: Authentication › Hooks › "Before User Created" › Postgres › schema public › function hook_before_user_created › Enable. Then the same in ethio-prod.
3. If CI's run has already failed at the preflight, use "Re-run failed jobs".
4. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
5. Publish only when the supervisor says the newest commit is green and Lovable is idle. Then press "Sync keys" in Admin › Translations (this turn's words).
```
