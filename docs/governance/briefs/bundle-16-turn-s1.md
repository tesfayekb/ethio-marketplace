# Bundle 16 — turn S1: abuse and cost guards, part 1: brief, version 1 (saved unchanged, 2026-10-15)

```text
BUNDLE 16 — TURN S1 (2026-10-15). ONE TURN: ONE MIGRATION, ROUTE CHANGES, THREE NEW TESTS WRITTEN BY YOU, DOCS. No strings, no screen change, no package change.
Base: dev 590ff1b8 (turn E1). The census below proves every file and the database by content. This file is public: it is written as build instructions.
Tier A: the migration (two AI money functions redeclared; the photo storage's client policies dropped) and the upload, removal and writing-helper routes. Tier B: the tests. Tier C: the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn E1 is verified on dev 590ff1b8: the 3 carrier paths equal the supervisor's copy byte for byte; the brief (5ee17895…), AT-82 and the migration (the brief's text, mark 20261016000000) are as written. AT-82's helper change (`holdAnswer` takes `Record<string, unknown>`) is the one the brief allowed.
- CI: the run on 92b359aa (turn R1) ended red on MLP-6 alone, on desktop-1280 (the panel fixed in turn R3). The runs on 565b19bc (R2 and R3 together) and 590ff1b8 (E1) were still running when this brief was written.

WHY THIS TURN
- The operator's review of abuse and cost (2026-10-15): a person or a bot that keeps adding and removing photos spends our paid photo screening; "can we limit how many times a user can add and delete a photo per hour across advertisements". His decision D184: when photo screening reaches its monthly budget, or a daily cap for the whole site, it stops paying and new photos are held for staff.
- What the code does today: at its budget photo screening only alerts (ai_record_spend, 20261013184636: every feature but photo_screen switches off); a removal has no limit; the route's photo cap is read before the screen, but the plan's own cap only at the door, after the paid screen; the writing helper spends the tries of any listing id it is sent.
- The photo storage: every photo is stored, read and removed by the server with the service role; the bucket's client policies are not used by any screen, and this turn removes them so the server is the only way in.

WHAT THIS TURN BUILDS
- The migration (the appendix):
  A. `ai_record_spend(text, integer)`, redeclared whole from 20261013184636 with one change: at 100 % of its budget photo screening switches itself off like every other feature (it comes back on next month by the existing rule).
  B. `admin_set_ai_feature(text, boolean, integer, integer)`, redeclared whole from 20261014022725 with one change: photo screening is not switched on past its budget ('overBudget'), like every other feature.
  Both keep their headers; their REVOKE and GRANT lines are restated as they stand.
  C. The three client policies of the listing-photos bucket on storage.objects are dropped: listing_photos_object_insert, listing_photos_object_owner_read, listing_photos_object_owner_delete.
  P. Proofs: both bodies by their distinctive lines, with headers and privileges; no policy on storage.objects names listing-photos.
- The carrier:
  - src/server/media/hold.ts: `photoScreenPlan` — off by budget now does what off by staff does (hold on a draft or a refused ad, paused on a live one); only an unreadable switch is `unavailable`. NEW `withSiteCap(gate, siteAllowed)`: an open gate reads as off by budget once the site's day cap is spent. Unit tests PH-3 (changed), PH-4, PH-5.
  - src/server/media/policy.ts: `photoPolicyFake()` exported (the fake-mode flags, unchanged in meaning).
  - src/routes/api/upload/photo.ts: the seller's plan cap (`plan_photo_cap(seller_plan(uid))`, service role) is read before the screen and the lower of it and `MAX_PHOTOS_PER_LISTING` refuses `tooManyPhotos`; the site's day cap on paid screens (`upload:screen`, key "site", `PHOTO_SCREENS_PER_DAY_SITE`, default 2,000 a day) is counted only when screening is on and not in fake mode, and past it the photo is held or paused.
  - src/routes/api/listings/photos.$id.ts: a removal is counted per seller before anything else — 30 an hour (`photo-remove`, `RATE_LIMIT_PHOTO_REMOVE_PER_HOUR`) and 100 a day (`photo-remove:day`, `RATE_LIMIT_PHOTO_REMOVE_PER_DAY`); past either, the answer is the refusal `rateLimited` (field "photos") with its reset time.
  - src/routes/api/listings/assist.ts: a `listingId` that is not the caller's own listing (read as the caller) is refused `notYourListing` (field "listingId") before its tries are counted.
  - src/server/ai/meter.ts: the comment says photo screening switches off at its budget.
  - The docs (ai-services, media-pipeline), the roadmap (S1 done; S2 next; turn 4 after) and the changelog.
- THE TESTS (below): you write PR-47, PR-48 and PR-49.

DECIDED BY THE OPERATOR
- D184: at its budget, or past a daily cap for the whole site, photo screening stops paying and new photos are held for staff. Removals are limited per hour across every ad. CAPTCHA waits for the launch list.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The site's day cap is 2,000 paid screens a UTC day (ESTIMATE about $4 a day at $0.002 a screen); it is an environment value, `PHOTO_SCREENS_PER_DAY_SITE`, changed without a code change. Fake mode spends nothing and is not counted.
- Removals: 30 an hour and 100 a day per seller. Uploads keep theirs (60 an hour, 200 a day).
- While screening is off by budget, a live ad's new photo waits (`screeningPaused`) as it does when staff switch screening off; turn 4 (the photo review) will hold it for staff instead.

THE TESTS — you write them this turn, from the descriptions below (Tier B).
General rules:
- All three go in e2e/posting-routes.spec.ts, in the file's own `test.describe`, after the file's last test, titled exactly as below; reuse the file's own helpers (`seller`, `category`, the route constants, `inOneWindow` from ./helpers/rate-window). At most two leased accounts per test (DEC-174).
- Every row a test makes is its own and is removed in its `finally` (J3, G27): a draft through the file's own seeding, any `rate_limits` row it wrote, any storage object that should not exist. No real row is changed.
- G38: no assertion loosened, no timeout raised, no retry added, no dial raised.

PR-47 "PR-47 the photo storage takes nothing from a seller's own client; only the server stores photos" (e2e/posting-routes.spec.ts; `seller`)
- Seller A (`seller(page)`; its bearer token). A supabase-js client acting as A: the publishable key, with A's token as its `Authorization` header (as the file's other direct calls act as a person).
- As A: `storage.from("listing-photos").upload("e2e/<A's id>/pr47-<token>.webp", <a few bytes>, { contentType: "image/webp" })` → its `error` is not null.
- Through the service client: `storage.from("listing-photos").list("e2e/<A's id>")` holds no object named `pr47-<token>.webp`. In `finally`, if it does, remove it through the service client (and the test has already failed).

PR-48 "PR-48 the writing helper spends only its caller's own listing's tries" (e2e/posting-routes.spec.ts; `seller`, `category`)
- Seller B: a draft of B's on a scratch category (the file's own way to make one). Seller A.
- As A: POST the assist route with B's draft id as `listingId` and a valid `categoryId` → the answer's refusals hold `{ field: "listingId", reason: "notYourListing" }`.
- As B: the same call with B's own draft id → no refusal with reason "notYourListing".

PR-49 "PR-49 photo removals have their own limit per seller, before anything else is read" (e2e/posting-routes.spec.ts; `seller`, `inOneWindow`)
- Seller A. `inOneWindow(3600, 30_000, "PR-49")` first (the hour's window is floored to the clock hour).
- As A: DELETE /api/listings/photos/<a random uuid> → status 403 with the refusal reason "notYourListing" (the limit is not reached; the photo is not A's).
- Through the service client: call `consume_rate_limit` with p_action "photo-remove", p_key A's id, p_limit 30, p_window "1 hour" until its answer's `remaining` is 0 (at most 30 calls).
- As A: the same DELETE → the refusal reason "rateLimited" (field "photos") with a `detail` reset time.
- `finally`: delete A's `rate_limits` rows for action "photo-remove" through the service client.

After writing them: `node_modules/.bin/prettier --write e2e/posting-routes.spec.ts`. No other test is edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 590ff1b8 with this turn's carrier files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 885 unit tests (153 files), the usage maps (unchanged; they match), the hardcoded-strings guard (0 findings), the build and the bundle budget.
- The migration on a local PostgreSQL 16 over stand-in tables: applied cleanly, its proofs passed, with LF and with CRLF line endings. Behaviour: photo screening switched off at 100 % of its budget with reason 'budget' and an 'ai.budget_off' row; switching it on past its budget refused 'overBudget'; a raised budget let staff switch it on; another feature unchanged. A copy that kept the insert policy was refused by P3.
- `scripts/check-migrations.sh` with this migration as 20261016010000_b16s1-check.sql: Born-closed, Definer, Self-marking, Public-surface and Real-row proof guards OK, "Migration guard OK".
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-s1.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below), files and database. If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts since turn E1, name the difference and go on;
  4. the carrier, then the hashes;
  5. THE TESTS;
  6. the checks;
  7. the migration LAST, then its read-back;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. Nothing a visitor sees changes; the published upload route keeps working (it stores through the service role).
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 11 paths of the hash table, the brief, e2e/posting-routes.spec.ts and the one new migration file (the database tool names it). The database: ethio-prod through your tools — SELECT only, except the migration itself. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-s1.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 11 files → each equal to:
  1186cb8e1fb5a734283344c9d7b9643cf5af21b3b0227e7631f65e6621e1c83b  docs/_changelog.md
  ef0e5f19d0e9b8c657d850826f294a0bb8bc636f9bb5e4e52bc90e86c0f4e837  docs/features/ai-services.md
  e75719f6ef722363386e722b3a4d9603bddbe68af6003e05bb386de2e3ccfdfb  docs/features/media-pipeline.md
  e03ba148902a9f82077aba33a71ce3fc773c0d66b921c280c2c952c30ac8b778  roadmap.md
  3cdbec741985b18f39b05be1bc5c98824678d96b403d8b4fc2ff84612722b1f6  src/routes/api/listings/assist.ts
  1a8bfc7bdf771220a9f3e83c4aebe0e6be2331711f638cc10c510ed5bc877d8c  src/routes/api/listings/photos.$id.ts
  338c3fbbae2309c6809fb0002f2b9e34276a4021ca3c8cdb1fab064ad04903db  src/routes/api/upload/photo.ts
  7c02218528e35056590e3c676969ac320f732ed9b06bc3295c00d666b452fb71  src/server/ai/meter.ts
  ecd82791eca313d70b4bcf1f20bfba1d1c42c68a8c1d6d8a8634f23120973a12  src/server/media/hold.test.ts
  0995673f99de5da5b70c9b3b83c9265af17c32309466b748771b2d8c7e3df8a2  src/server/media/hold.ts
  47ec6315374f882b2199bba01c0722ae8266c9591070d4440357bb306a733b6c  src/server/media/policy.ts
- (c) `sha256sum e2e/posting-routes.spec.ts` → 74da11091218340e7351596b3ecca4a823432fbdf510e3828f49620e5b6e768c; `ls supabase/migrations | tail -1` → 20261015083928_d735a9c0-4bb5-4db4-bece-7ef2155cce9f.sql (turn E1's; no migration since).
- (d) ethio-prod, your query tool (SELECT only):
  - `select max(version) from public.migration_marks;` → 20261016000000;
  - `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.ai_record_spend(text, integer)'::regprocedure;` → 4221db8e42fff316dc7f2ae8328e2bf8;
  - `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.admin_set_ai_feature(text, boolean, integer, integer)'::regprocedure;` → 044d7f0f13e297df7cb92f75d27be28f;
  - `select polname from pg_policy where polrelid = 'storage.objects'::regclass and (coalesce(pg_get_expr(polqual, polrelid), '') like '%listing-photos%' or coalesce(pg_get_expr(polwithcheck, polrelid), '') like '%listing-photos%') order by 1;` → listing_photos_object_insert, listing_photos_object_owner_delete, listing_photos_object_owner_read (three rows). If it lists anything else, STOP and report.

THE CARRIER — B16S1-TURN-CARRIER-2026-10-15.md (12,891 bytes; sha256 829ae4ffafb06c3181234271cf9140beee7750c83e396a1e8704112667394bf4; 20 sections)
- Its first line starts "B16S1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 11 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  6426a38c08ebfbc3128f91151307b375b45ef38a35f0bdab4055244d818983c5  docs/_changelog.md
  f1fd78461a074ecd46a8393e63412d3ddcbe17c946dda4611ffbc69c2000ff7a  docs/features/ai-services.md
  4b0065b4fca7e8dba08aef4c3448fa56fca2d448816c637de70385928a26dda8  docs/features/media-pipeline.md
  f8233aeb1f9ff653dffeab705f0dc5d79d8e4a8f3059ba8c158b2db70ba54bba  roadmap.md
  36bba039ecadc0b08ed51cd9de08b6bdd71b593f59f1c4150619cf935a3f7e7c  src/routes/api/listings/assist.ts
  bf0c2aaf6c1740ef2fd180ec9d7aae877426f9bd4ebdc9972be9aca5480be3b6  src/routes/api/listings/photos.$id.ts
  b481c58e61df78ce545ace5fe3a0cf682d2b3e2793caa7daea8ae93d8cb729ab  src/routes/api/upload/photo.ts
  c9e9c16524f82b23fe0b3c9be95ca7f4ab85388c56b5ddf315e5f26e2b1988dc  src/server/ai/meter.ts
  21b3046e1d7e970667fba4a21774d1a6aedc3ffd7739a220327b7b1297d7c1d8  src/server/media/hold.test.ts
  b13c28018846d4c4113c892d9cdab384934315905e9d551aa1fa332c0a39f54d  src/server/media/hold.ts
  5886867fdb650fc284308efd2999204a3373b0e5056b2de7c2e9af598652fe8a  src/server/media/policy.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings — a warning in your test is fixed, not left;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16s1.log` — 885 passed (153 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `grep -n 'test("PR-47\|test("PR-48\|test("PR-49' e2e/*.spec.ts` → three lines, all in e2e/posting-routes.spec.ts;
- Not run by you: the typecheck, the build, the bundle budget and the browser tests. CI judges them.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, yours included.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 37d7320c84ac2018c120a190b910e09c0ce5e9ae4f8e1925df9ce7fb6865aecf (11,921 bytes, 222 lines, ending with a newline).
- Check it in a scratch folder first (after the checks):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261016010000_b16s1-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - if the result is below 20261016010000, use 20261016010000 (above 20261016000000, turn E1's mark, and equal to the scratch check's stamp);
  - the mark must also be later than the saved file's own stamp.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- the census (d) md5 queries again → ai_record_spend 7e0a3884bbf34b9b0a923132213fcd1d, admin_set_ai_feature 419432efe6ccd594ed9e6fc5b0f97580;
- the census (d) policy query again → no row.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 11 sha256sum lines and the brief's; the sha256sum and line count of e2e/posting-routes.spec.ts, and `git diff <START> -- e2e/posting-routes.spec.ts`.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 11 paths, the brief, the test file and the one migration file.
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each NEW warning, and the total count.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging: open the new migration file on GitHub (Raw), paste it into the ethio-staging SQL editor and run it; read back its mark with the line the report gives. CI's preflight waits for it (up to 25 minutes); if the run has already failed at the preflight, use "Re-run failed jobs".
2. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
3. Publish only when the supervisor says the newest commit is green and Lovable is idle.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 16 turn S1 (2026-10-15). Tier A. Abuse and cost guards, part 1 (D184; the operator's review of 2026-10-15).
-- e2e-areas: posting, admin-services
--
-- A. ai_record_spend(text, integer), redeclared whole from its live definition (20261013184636) with one change: at
--    100 % of its monthly budget photo screening switches itself off like every other AI feature (D184). Its new photos
--    are then held for staff, with no further spend (the upload route's hold, bundle 13 turn 6), and it comes back on
--    in the next month by the existing rule.
-- B. admin_set_ai_feature(text, boolean, integer, integer), redeclared whole from its live definition (20261014022725)
--    with one change: photo screening, like every other feature, is not switched on past its budget ('overBudget').
-- C. The photo storage is written and read by the server alone: the three client policies on storage.objects for the
--    listing-photos bucket (insert, owner read, owner delete) are dropped. Every photo has always gone through the
--    upload route, the server's photo links and the removal route, which use the service role; no screen uses them.
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): both bodies equal their live text beyond the
--    named change (checked by their distinctive lines) with their headers and privileges (restated as they stand);
--    no policy on storage.objects names the listing-photos bucket.

-- ===== A — ai_record_spend, whole =====
CREATE OR REPLACE FUNCTION public.ai_record_spend(p_feature text, p_units integer)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v         public.ai_features%ROWTYPE;
  v_day     date := (now() AT TIME ZONE 'utc')::date;
  v_first   date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_month   timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
  v_cost    bigint;
  v_spent   bigint;
  v_budget  bigint;
  v_level   smallint := 0;
BEGIN
  IF p_units IS NULL OR p_units < 0 THEN RAISE EXCEPTION 'badValue:units'; END IF;
  SELECT * INTO v FROM public.ai_features WHERE feature = p_feature FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownFeature'; END IF;
  -- A new month: the alert level starts again, and a feature its budget switched off in an earlier month comes back on.
  IF v.alert_month IS DISTINCT FROM v_first THEN
    v.alert_month := v_first;
    v.alert_level := 0;
  END IF;
  IF NOT v.enabled AND v.off_reason = 'budget' AND v.off_at < v_month THEN
    v.enabled := true;
    v.off_reason := NULL;
    v.off_at := NULL;
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (NULL, 'ai.budget_on', 'ai_feature', v.feature, jsonb_build_object('month', v_first));
  END IF;
  v_cost := p_units::bigint * v.unit_cost_microusd;
  INSERT INTO public.ai_spend_days AS d (feature, day, calls, units, cost_microusd)
  VALUES (v.feature, v_day, 1, p_units, v_cost)
  ON CONFLICT (feature, day) DO UPDATE
    SET calls = d.calls + 1,
        units = d.units + EXCLUDED.units,
        cost_microusd = d.cost_microusd + EXCLUDED.cost_microusd;
  SELECT coalesce(sum(s.cost_microusd), 0)::bigint INTO v_spent
    FROM public.ai_spend_days s
   WHERE s.feature = v.feature AND s.day >= v_first;
  IF v.monthly_budget_cents IS NOT NULL THEN
    v_budget := v.monthly_budget_cents::bigint * 10000;
    v_level := CASE WHEN v_spent >= v_budget THEN 100
                    WHEN v_spent * 10 >= v_budget * 8 THEN 80
                    ELSE 0 END;
    IF v_level > v.alert_level THEN
      INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
      VALUES (NULL, 'ai.budget_alert', 'ai_feature', v.feature,
              jsonb_build_object('level', v_level, 'spent_microusd', v_spent,
                                 'budget_cents', v.monthly_budget_cents));
      v.alert_level := v_level;
    END IF;
    -- D158, D184 (bundle 16 turn S1): at the budget every feature switches itself off, photo screening
    -- included — its new photos are then held for staff, at no further spend, until next month.
    IF v_level = 100 AND v.enabled THEN
      v.enabled := false;
      v.off_reason := 'budget';
      v.off_at := now();
      INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
      VALUES (NULL, 'ai.budget_off', 'ai_feature', v.feature,
              jsonb_build_object('spent_microusd', v_spent, 'budget_cents', v.monthly_budget_cents));
    END IF;
  END IF;
  UPDATE public.ai_features
     SET enabled = v.enabled, off_reason = v.off_reason, off_at = v.off_at,
         alert_month = v.alert_month, alert_level = v.alert_level
   WHERE feature = v.feature;
  RETURN jsonb_build_object('feature', v.feature, 'on', v.enabled, 'spent_microusd', v_spent,
                            'alert_level', v.alert_level);
END;
$$;

REVOKE ALL ON FUNCTION public.ai_record_spend(text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ai_record_spend(text, integer) TO service_role;

-- ===== B — admin_set_ai_feature, whole =====
CREATE OR REPLACE FUNCTION public.admin_set_ai_feature(
  p_feature text,
  p_enabled boolean,
  p_monthly_budget_cents integer,
  p_unit_cost_microusd integer
)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v        public.ai_features%ROWTYPE;
  v_before jsonb;
  v_first  date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_month  timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
  v_spent  bigint;
  v_level  smallint := 0;
  v_on     boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'services', 'manage') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('services', 'manage');
  IF p_enabled IS NULL THEN RAISE EXCEPTION 'badValue:enabled'; END IF;
  IF p_unit_cost_microusd IS NULL OR p_unit_cost_microusd < 0 OR p_unit_cost_microusd > 10000000 THEN
    RAISE EXCEPTION 'badValue:unitCost';
  END IF;
  IF p_monthly_budget_cents IS NOT NULL AND (p_monthly_budget_cents < 0 OR p_monthly_budget_cents > 100000000) THEN
    RAISE EXCEPTION 'badValue:budget';
  END IF;
  SELECT * INTO v FROM public.ai_features WHERE feature = p_feature FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownFeature'; END IF;
  -- D158 (bundle 13 turn 6) — photo screening may be switched off: new photos are then held
  -- for staff (listing_photos.unscreened) and shown to no buyer until the ad is approved.
  v_before := to_jsonb(v) - 'updated_by';
  SELECT coalesce(sum(s.cost_microusd), 0)::bigint INTO v_spent
    FROM public.ai_spend_days s
   WHERE s.feature = v.feature AND s.day >= v_first;
  IF p_monthly_budget_cents IS NOT NULL THEN
    v_level := CASE WHEN v_spent >= p_monthly_budget_cents::bigint * 10000 THEN 100
                    WHEN v_spent * 10 >= p_monthly_budget_cents::bigint * 10000 * 8 THEN 80
                    ELSE 0 END;
  END IF;
  -- D184 (bundle 16 turn S1): no feature, photo screening included, is switched on past its budget.
  IF p_enabled AND v_level = 100 THEN RAISE EXCEPTION 'overBudget'; END IF;
  v_on := v.enabled OR (v.off_reason = 'budget' AND v.off_at < v_month);
  UPDATE public.ai_features
     SET enabled = p_enabled,
         off_reason = CASE WHEN p_enabled THEN NULL WHEN v_on THEN 'staff' ELSE v.off_reason END,
         off_at = CASE WHEN p_enabled THEN NULL WHEN v_on THEN now() ELSE v.off_at END,
         monthly_budget_cents = p_monthly_budget_cents,
         unit_cost_microusd = p_unit_cost_microusd,
         alert_month = v_first,
         alert_level = v_level,
         updated_at = now(),
         updated_by = v_uid
   WHERE feature = v.feature
  RETURNING * INTO v;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'ai.feature_set', 'ai_feature', v.feature,
          jsonb_build_object('before', v_before, 'after', to_jsonb(v) - 'updated_by'));
  RETURN jsonb_build_object('ok', true, 'feature', v.feature, 'on', v.enabled, 'off_reason', v.off_reason,
                            'monthly_budget_cents', v.monthly_budget_cents,
                            'unit_cost_microusd', v.unit_cost_microusd, 'alert_level', v.alert_level);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) TO service_role;

-- ===== C — the photo storage, server only =====
DROP POLICY IF EXISTS listing_photos_object_insert ON storage.objects;
DROP POLICY IF EXISTS listing_photos_object_owner_read ON storage.objects;
DROP POLICY IF EXISTS listing_photos_object_owner_delete ON storage.objects;

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_src text;
  v_n   integer;
BEGIN
  -- P1. ai_record_spend: the budget switches every feature off; the rest of the body as it was.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.ai_record_spend(text, integer)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src LIKE '%<> ''photo_screen''%'
     OR v_src NOT LIKE '%IF v_level = 100 AND v.enabled THEN%'
     OR v_src NOT LIKE '%''ai.budget_off''%'
     OR v_src NOT LIKE '%''ai.budget_on''%'
     OR v_src NOT LIKE '%''ai.budget_alert''%' THEN
    RAISE EXCEPTION 'B16S1 P1: the body of ai_record_spend is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.ai_record_spend(text, integer)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.ai_record_spend(text, integer)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.ai_record_spend(text, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16S1 P1: ai_record_spend is not the service role''s alone';
  END IF;

  -- P2. admin_set_ai_feature: no feature switched on past its budget; step-up and permission kept.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.admin_set_ai_feature(text, boolean, integer, integer)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src LIKE '%<> ''photo_screen''%'
     OR v_src NOT LIKE '%IF p_enabled AND v_level = 100 THEN RAISE EXCEPTION ''overBudget''; END IF;%'
     OR v_src NOT LIKE '%require_step_up_if_needed(''services'', ''manage'')%'
     OR v_src NOT LIKE '%has_permission(v_uid, ''services'', ''manage'')%' THEN
    RAISE EXCEPTION 'B16S1 P2: the body of admin_set_ai_feature is not as written';
  END IF;
  IF has_function_privilege('anon', 'public.admin_set_ai_feature(text, boolean, integer, integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_set_ai_feature(text, boolean, integer, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16S1 P2: admin_set_ai_feature is open to anon or closed to signed-in users';
  END IF;

  -- P3. No policy on storage.objects names the listing-photos bucket: only the server's service role reaches it.
  SELECT count(*) INTO v_n FROM pg_policy p
   WHERE p.polrelid = 'storage.objects'::regclass
     AND (coalesce(pg_get_expr(p.polqual, p.polrelid), '') LIKE '%listing-photos%'
          OR coalesce(pg_get_expr(p.polwithcheck, p.polrelid), '') LIKE '%listing-photos%');
  IF v_n <> 0 THEN RAISE EXCEPTION 'B16S1 P3: % policies on storage.objects still name listing-photos', v_n; END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
