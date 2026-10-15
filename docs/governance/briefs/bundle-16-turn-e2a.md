# Bundle 16 — turn E2a: the seller's edit door, complete: brief, version 1 (saved unchanged, 2026-10-15)

```text
BUNDLE 16 — TURN E2a (2026-10-15). ONE TURN: ONE TEST FIX, ONE MIGRATION, ONE TEST FILE'S CHANGES AND ONE NEW TEST WRITTEN BY YOU, DOCS AND A SPEC. No package change.
Base: dev a7485475 (turn 4b). The census below proves every file and the database by content. This file is public: it is written as build instructions.
Tier A: the migration (the seller's edit door and the pin door). Tier B: the tests. Tier C: the docs, the spec, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 4b is verified on dev a7485475: the 23 carrier paths equal the supervisor's copy byte for byte; the brief (a9116e4d…) is saved; SC-24 and PP-33 are as described. CI run 38729348738 on a7485475 (turns S2, 4a and 4b): 1,765 passed; the only red is PR-50 (INC-638, FIRST below), the supervisor's fixture miss; every 4a and 4b test passed, every guard green. The operator was told to Publish.
- The platform's own package change (INC-637) stays as it is; package.json and bun.lock are not touched in this turn either.

FIRST — THE RED ON cc64a2db AND a7485475, INC-638 (PR-50, both projects, both runs). The seeded "submitted ad" is a `listings` row with status "screening" and no `location_id`; the table's check `listings_place_unless_draft` (`status = 'draft' OR location_id IS NOT NULL`) refuses it. The brief that described PR-50 named no place: the supervisor's miss, not yours. FIX, in e2e/posting-routes.spec.ts, PR-50 only: before the insert, `const chain = await seedScratchChain("ET"); places.push(chain.region.slug);` (the file's own helper and list, as PR-17 uses them at its line 720–721, so the afterEach destroys the chain); the insert gains `location_id: chain.city.id`. Nothing else in the test changes; the route is not changed (it reads `published_first_at` only).

WHY THIS TURN — D187 (the operator, 2026-10-15)
- "Now I see edit doesn't have user contact info section as well as location section edit. What if a user wants to add more locations on the edit, what if a user wants to modify the way it will be communicated. I think we have to be comprehensive."
- His decisions: places editable on Edit and applied at once (picked from a list, D177); contact editable per ad and applied at once; the written directions and street lines are typed text and go to review, like the title; the Edit page in the posting form's order (turn E2b); the AI writing helper on Edit (E2b).
- This turn is the door. Turn E2b puts the boxes on the page.

WHAT THIS TURN BUILDS
- The migration (its text in the appendix):
  A. `edit_my_listing`, redeclared whole from its live definition with: four more keys in its allowlist — `coverage` (a list of place ids), `contact_pref` (an object), `street_address` and `directions` (text; an empty string clears); the judge step 6 when `coverage` is sent (each place a city or sub-city, within the plan's caps; the first becomes the ad's own place; `listing_locations` rewritten in the sent order), step 7 when `contact_pref` is sent (the contact shape); the two text lines sanitised as `set_listing_pin` sanitises them (200 characters; `contactInNote`); a changed text line goes to review, a place or contact change never does; the revision carries `coverage` when it changed. Everything else byte for byte. Grants restated.
  B. `set_listing_pin`, redeclared whole from its live definition with one change: `closed` joins its statuses (INC-631: a closed ad is edited like a live one). Grants restated.
  C. Proofs P1–P4: the bodies' markers and headers, the grants, the no-session refusal, the never-keys (`category_id`, `poster_expires_at`) still refused by name before any table is read. What the door writes is proven by the tests below, through the app's connection (G39).
- The carrier: docs/features/my-listings.md (the turn's section), docs/governance/seller-edit-spec.md (NEW: the spec of D187, both turns), the roadmap and the changelog.
- THE TESTS (below): you fix PR-50 (FIRST, above), extend ML-12 and write ML-14.

DECIDED BY THE OPERATOR (D187)
- Places and contact editable on Edit, applied at once; the written directions and street go to review; the boxes in the posting form's order; the AI helper on Edit.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The category and the end date stay as posted (D172); a rejected ad's edit still resubmits it.
- The pin door keeps applying the pin at once (as when posting) and now takes a closed ad.
- The seller's own identity (name, business name, home country) stays in the profile; the contact box edits the ad's channels only.

THE TESTS — you write them this turn, from the descriptions below (Tier B).
General rules:
- ML-14 goes in e2e/my-listings-doors.spec.ts's own `test.describe`, after ML-13, titled exactly as below; reuse the file's own helpers (`scratchSeller`, `seed`, `asPerson`, `snapshot`, `revisionCount`, `seedScratchChain`, `adminClient`, the reaping lists). At most two leased accounts per test (DEC-174).
- Every row a test makes is its own and is removed in its `finally` (J3, G27). No real row is changed; no real place is used (`seedScratchChain` makes scratch ones).
- G38: no assertion loosened, no timeout raised, no retry added, no dial raised.

ML-12 (e2e/my-listings-doors.spec.ts) — CHANGED: the case `[X, { contact_pref: {} }, "not editable: contact_pref"]` is replaced by `[X, { poster_expires_at: new Date().toISOString() }, "not editable: poster_expires_at"]` (the contact is editable now; the end date never). Two cases added after it: `[X, { coverage: "x" }, "coverage must be a list"]` and `[X, { contact_pref: [] }, "contact_pref must be an object"]`. The ten-case loop and its before/after reads stay as they are (the list grows to twelve).

ML-14 "ML-14 edit_my_listing: places and contact apply at once, the first place the ad's own; the written directions go to review (D187)" (e2e/my-listings-doors.spec.ts)
- `scratchSeller()` → A, with its chain's city C1 (`A.cityId`). A second scratch chain `seedScratchChain("ET")` → C2 (`chain.city.id`) and its region R (`chain.region.id`); push its region slug to the file's reaping list. An active ad X of A's through `seed(A)` (X has C1 as its place and one `listing_locations` row).
- As A (`asPerson(A)`): `rpc("edit_my_listing", { p_listing_id: X.id, p_changes: { coverage: [C2, C1] } })` → no error; the answer's `review` is false and `status` "active". Through the service client: `listings.location_id` = C2 and `status` "active"; `listing_locations` of X ordered by position = [C2, C1]; `revisionCount(X.id)` grew by one, and the newest revision's `after.coverage` = [C2, C1] and `before.coverage` = [C1].
- As A: `p_changes: { coverage: [R] }` → the answer is `{ ok: false, refusals: [...] }` with a refusal whose field is "coverage" and reason "cityRequired"; `listing_locations` unchanged ([C2, C1]).
- As A: `p_changes: { contact_pref: { messages: true, phone: { value: "+251911223344", show: true } } }` → `review` false; the service client reads `contact_pref` equal to that object and `status` "active".
- As A: `p_changes: { directions: "  Behind the  <church> " }` → `review` true, `status` "screening"; the service client reads `directions` = "Behind the church" and `clock_kept` true.
- As A: `p_changes: { street_address: "call 0911223344" }` on the ad after its status is set back to "active" through the service client → the call's error message is "contactInNote".
- `finally`: the file's own reaping.

After writing them: `node_modules/.bin/prettier --write e2e/posting-routes.spec.ts e2e/my-listings-doors.spec.ts`. No other test is edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev a7485475 with this turn's carrier files)
- Clean: format, lint (0 errors, 33 warnings), the hardcoded-strings guard (0 findings). The typecheck, the build and the unit tests are unchanged by this turn (no source file changes): CI judges them.
- The migration on a local PostgreSQL 16 over stand-in tables holding the live definitions and a judge that mirrors steps 6 and 7: applied cleanly, its proofs passed, with LF and with CRLF line endings. Behaviour: three places applied at once with the first the ad's own and a revision carrying the places; over the plan, a region alone, an empty list and two bad shapes refused with nothing written; the contact applied at once and its shape judged; the directions sanitised and the ad sent to review with its time kept; an ad in review refused; the same text again "nothing changed"; a phone number in the street line `contactInNote`; 201 characters `streetTooLong:201`; clearing the line goes to review; a closed ad's places and price at once; another seller refused; the category and the end date refused by name; the pin door takes a closed ad and refuses one in review. Two tampered copies (a grant to anon; the directions review line removed) were refused by P2 and P1.
- `scripts/check-migrations.sh` with this migration as a scratch file: every guard OK, "Migration guard OK".
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-e2a.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below), files and database. If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts or src/integrations/supabase/types.ts since turn 4b, name the difference and go on (neither is in this turn's carrier);
  4. the carrier, then the hashes;
  5. THE TESTS (PR-50 first, then ML-12, then ML-14);
  6. the checks;
  7. the migration LAST, then its read-back;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. The published Edit page sends only the keys it sends today, so nothing changes for any seller until turn E2b is published.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 4 paths of the hash table, the brief, e2e/posting-routes.spec.ts, e2e/my-listings-doors.spec.ts and the one new migration file (the database tool names it). The database: ethio-prod through your tools — SELECT only, except the migration itself. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-e2a.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 3 files → each equal to:
  0abf5c4855e1c84c9422952cbdc2e4e025afce1cb95888fe51a0d710744bd83d  docs/_changelog.md
  84b6adeabc61631589417644635785f1133d1f5f2cdc80b776bb3b86e417f800  docs/features/my-listings.md
  9ce7bf4e22648324138e01b90d8dc93af45625c5a609b74e1508bf7639bf0bac  roadmap.md
  and `ls docs/governance/seller-edit-spec.md 2>/dev/null` → nothing.
- (c) `sha256sum e2e/posting-routes.spec.ts e2e/my-listings-doors.spec.ts` → 3c609e9e4e6c6bc782b4741f7355d5e3b89a0e83bfbf17117b584bae8983269f and 37c6d81de9c8dc09cf593419ee396cef6f00ebc55b9b944148df7fa43210479e; `ls supabase/migrations | tail -1` → 20261015113334_76db3ae0-4f91-4ab3-be63-0a6b9a5937b3.sql (turn 4a's; no migration since).
- (d) ethio-prod, your query tool (SELECT only):
  - `select max(version) from public.migration_marks;` → 20261016030000;
  - `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.edit_my_listing(uuid, jsonb)'::regprocedure;` → eebbdac8da2c5f3288da6c9a73e3726e;
  - `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;` → ed422ce5662cec56c013268918ea8553;
  - `select conname from pg_constraint where conname = 'listings_place_unless_draft';` → one row.

THE CARRIER — B16E2A-TURN-CARRIER-2026-10-15.md (10,028 bytes; sha256 464a91c4990207e21a543e73aa8576261ebb0eaae7030c204543301e7c02931e; 5 sections)
- Its first line starts "B16E2A TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 4 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  4fa03dbb84a5c33a76e06b16f4f0b6bc44750c7f2eaf363cddc440de22c4e3e7  docs/_changelog.md
  0306176c8d5fedb20135c1ccbac0db34c6d310a70462b1e3496594baa366b8fd  docs/features/my-listings.md
  828888da7bb616b1069fb47f0e12e8d0ecfdede88c897054af23f05c49463b01  docs/governance/seller-edit-spec.md
  c4a18ebef84497fbc531535a07f8baccf2125f408e5c8d60afeeaa2c938f6a29  roadmap.md

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings — a warning in your tests is fixed, not left;
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `grep -n 'test("ML-14' e2e/my-listings-doors.spec.ts` → one line;
- `git grep -n "not editable: poster_expires_at\|coverage must be a list\|contact_pref must be an object" e2e/my-listings-doors.spec.ts` → the three ML-12 cases;
- `git grep -n "location_id: chain.city.id" e2e/posting-routes.spec.ts` → PR-50's seed;
- Not run by you: the typecheck, the build, the unit tests, the bundle budget and the browser tests. CI judges them (no source file changes this turn).

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, yours included.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>` (its last line). Before the change, its sha256 is 93fca7eb390805dff12f9a8d5a83b44418754acda720f42f523b173c633078a1 (22,527 bytes, 406 lines, ending with a newline).
- Check it in a scratch folder first (after the checks):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261016040000_b16e2a-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - if the result is below 20261016040000, use 20261016040000 (above 20261016030000, turn 4a's mark, and equal to the scratch check's stamp);
  - the mark must also be later than the saved file's own stamp.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.edit_my_listing(uuid, jsonb)'::regprocedure;` → 4a704c26e982d52830a4070a2ef9e924;
- `select md5(replace(prosrc, chr(13), '')) from pg_proc where oid = 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure;` → 3abd66610d8296d8b2230931ca374df7;
- `select has_function_privilege('anon', 'public.edit_my_listing(uuid, jsonb)', 'EXECUTE'), has_function_privilege('authenticated', 'public.edit_my_listing(uuid, jsonb)', 'EXECUTE');` → f | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 4 sha256sum lines and the brief's; the sha256sum and line count of each of the two test files, and `git diff <START> -- e2e/`.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 4 paths, the brief, the two test files and the one migration file.
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each NEW warning, and the total count.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging: open the new migration file on GitHub (Raw), paste it into the ethio-staging SQL editor and run it; read back its mark with the line the report gives.
2. If CI's run has already failed at the preflight, use "Re-run failed jobs".
3. Bring the supervisor Lovable's report. The next prompt (turn E2b, the Edit page) comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
4. Do not Publish between E2a and E2b: publish once, after E2b, when the supervisor says the newest commit is green and Lovable is idle.

APPENDIX — THE MIGRATION (between the BEGIN and END lines; not including them)
-----BEGIN B16E2A MIGRATION-----
-- Bundle 16 turn E2a (2026-10-15). Tier A. D187 (the operator, 2026-10-15) — THE SELLER'S EDIT IS COMPLETE: the places
-- the ad covers and the way buyers reach the seller are edited in the same boxes as the rest, and apply at once
-- (places and contact are picked from lists — D177); the written street and directions lines are typed text and go
-- to review like the title. The category and the end date stay as posted (D172).
--
-- A. edit_my_listing, redeclared whole from its live definition (20261015081040; census (d)): the allowlist gains
--    `coverage` (a list of place ids, judged at step 6 — the plan's caps, a city or sub-city each), `contact_pref`
--    (judged at step 7), `street_address` and `directions` (sanitised as set_listing_pin sanitises them, 200
--    characters, contactInNote); the first place becomes the ad's own place, listing_locations is rewritten in the sent
--    order (the feed index follows through its own triggers); a changed text line sends the ad to review; the
--    revision carries `coverage` when it changed. Everything else byte for byte. Grants restated.
-- B. set_listing_pin, redeclared whole from its live definition (20261006010039; census (d)): `closed` joins its
--    statuses (INC-631: a closed ad is edited like a live one). Grants restated.
-- C. Proofs P1–P6 on scratch rows — a scratch country, region and city, a scratch seller id and a scratch listing,
--    all inside one block that removes them; RAISE EXCEPTION on any failure. No real row is read or written.

-- ===== A — edit_my_listing, whole, with the places, the contact and the place text =====
CREATE OR REPLACE FUNCTION public.edit_my_listing(p_listing_id uuid, p_changes jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_key    text;
  v_attrs  jsonb;
  v_video  text;
  v_review boolean;
  v_before jsonb;
  v_after  jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  -- Bundle 16 turn E2a (D187) — the places, the contact and the place text a box may change.
  v_step     smallint := 5;
  v_cov_prev uuid[];
  v_cov      uuid[];
  v_contact  jsonb;
  v_street   text;
  v_dirs     text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  -- What a seller's box may change (D172, D187): never the category or the end date.
  IF p_changes IS NULL OR jsonb_typeof(p_changes) <> 'object' OR p_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to change';
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_changes) k LOOP
    IF v_key NOT IN ('title','description','video_url','attributes','price_mode','price_amount',
                     'price_currency','price_period','price_bp','price_negotiable',
                     'coverage','contact_pref','street_address','directions') THEN
      RAISE EXCEPTION 'not editable: %', v_key;
    END IF;
  END LOOP;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_prev.deleted_at IS NOT NULL THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_prev.status = 'draft' THEN RAISE EXCEPTION 'a draft is written in the posting form'; END IF;
  -- Call G — an ad in review waits for its answer.
  IF v_prev.status IN ('screening','held') THEN
    RAISE EXCEPTION 'an ad in review is edited once its review is done';
  END IF;
  -- D174 3 — an expired ad is renewed before it is edited; an edit never renews it.
  IF v_prev.status = 'expired' THEN
    RAISE EXCEPTION 'an expired listing is renewed before it is edited';
  END IF;
  IF v_prev.status NOT IN ('active','reduced','closed','rejected') THEN
    RAISE EXCEPTION 'this listing is not edited';
  END IF;

  -- The seller's content rules for what a box changes (staff's edit is judged the same way, INC-552):
  -- validate_listing_draft through step 5, every field the seller does not change read from the ad as it stands;
  -- the end date is not sent — a box does not change it. Bundle 16 turn E2a (D187): the places are judged at step 6
  -- when sent (the plan's caps, a city or sub-city each), the contact at step 7 when sent; what is not sent is
  -- read from the ad as it stands.
  v_video := CASE WHEN p_changes ? 'video_url' THEN nullif(btrim(coalesce(p_changes->>'video_url', '')), '')
                  ELSE v_prev.video_url END;
  SELECT coalesce(array_agg(ll.location_id ORDER BY ll.position, ll.location_id), ARRAY[]::uuid[])
    INTO v_cov_prev FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id;
  IF p_changes ? 'coverage' THEN
    IF jsonb_typeof(p_changes->'coverage') <> 'array' THEN RAISE EXCEPTION 'coverage must be a list'; END IF;
    BEGIN
      SELECT coalesce(array_agg(x.value::uuid ORDER BY x.ordinality), ARRAY[]::uuid[]) INTO v_cov
        FROM jsonb_array_elements_text(p_changes->'coverage') WITH ORDINALITY x(value, ordinality);
    EXCEPTION WHEN invalid_text_representation THEN
      RAISE EXCEPTION 'coverage must be a list of place ids';
    END;
    v_step := 6;
  ELSE
    v_cov := v_cov_prev;
  END IF;
  IF p_changes ? 'contact_pref' THEN
    IF jsonb_typeof(p_changes->'contact_pref') <> 'object' THEN RAISE EXCEPTION 'contact_pref must be an object'; END IF;
    v_contact := p_changes->'contact_pref';
    v_step := 7;
  ELSE
    v_contact := v_prev.contact_pref;
  END IF;
  -- The place text, sanitised as set_listing_pin sanitises it (bundle 2 step 10): a line the seller does not send is
  -- kept as it stands; a sent empty line clears it.
  v_street := CASE WHEN p_changes ? 'street_address'
                   THEN nullif(btrim(regexp_replace(regexp_replace(coalesce(p_changes->>'street_address', ''),
                                                                    '[[:cntrl:]<>]', ' ', 'g'), '\s+', ' ', 'g')), '')
                   ELSE v_prev.street_address END;
  IF v_street IS NOT NULL AND char_length(v_street) > 200 THEN RAISE EXCEPTION 'streetTooLong:%', char_length(v_street); END IF;
  IF v_street IS NOT NULL AND v_street IS DISTINCT FROM v_prev.street_address AND public.attr_contact_like(v_street) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;
  v_dirs := CASE WHEN p_changes ? 'directions'
                 THEN nullif(btrim(regexp_replace(regexp_replace(coalesce(p_changes->>'directions', ''),
                                                                  '[[:cntrl:]<>]', ' ', 'g'), '\s+', ' ', 'g')), '')
                 ELSE v_prev.directions END;
  IF v_dirs IS NOT NULL AND char_length(v_dirs) > 200 THEN RAISE EXCEPTION 'directionsTooLong:%', char_length(v_dirs); END IF;
  IF v_dirs IS NOT NULL AND v_dirs IS DISTINCT FROM v_prev.directions AND public.attr_contact_like(v_dirs) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;
  v_val := public.validate_listing_draft(v_uid, v_step, v_prev.category_id,
    CASE WHEN p_changes ? 'title' THEN p_changes->>'title' ELSE v_prev.title END,
    CASE WHEN p_changes ? 'description' THEN p_changes->>'description' ELSE v_prev.description END,
    v_video,
    CASE WHEN p_changes ? 'attributes' THEN p_changes->'attributes' ELSE v_prev.attributes END,
    CASE WHEN p_changes ? 'price_mode' THEN p_changes->>'price_mode' ELSE v_prev.price_mode END,
    CASE WHEN p_changes ? 'price_amount' THEN (p_changes->>'price_amount')::numeric ELSE v_prev.price_amount END,
    CASE WHEN p_changes ? 'price_currency' THEN (p_changes->>'price_currency')::char(3) ELSE v_prev.price_currency END,
    CASE WHEN p_changes ? 'price_period' THEN p_changes->>'price_period' ELSE v_prev.price_period END,
    NULL, CASE WHEN cardinality(v_cov) = 0 THEN NULL ELSE v_cov END, v_contact, v_prev.attributes,
    CASE WHEN p_changes ? 'price_bp' THEN (p_changes->>'price_bp')::integer ELSE v_prev.price_bp END,
    CASE WHEN p_changes ? 'price_negotiable' THEN coalesce((p_changes->>'price_negotiable')::boolean, false)
         ELSE v_prev.price_negotiable END);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;
  v_attrs := coalesce(v_val->'attrs', '{}'::jsonb);

  -- D177 (the operator, 2026-10-14) — what goes to review: free text — the title, the description, the video link,
  -- a typed price note, a typed answer (a text question, or the words of an "Other"); a refused ad's edit is its
  -- resubmission. Amounts and answers picked from a list apply at once and the ad stays as it is.
  -- Bundle 16 turn E2a (D187): a place or a contact change applies at once; a changed street or directions line is
  -- typed text and goes to review like the title.
  v_review := v_prev.status = 'rejected'
    OR v_street IS DISTINCT FROM v_prev.street_address
    OR v_dirs IS DISTINCT FROM v_prev.directions
    OR (v_val->>'title') IS DISTINCT FROM v_prev.title
    OR (v_val->>'description') IS DISTINCT FROM v_prev.description
    OR v_video IS DISTINCT FROM v_prev.video_url
    OR (v_val->>'price_unit_text') IS DISTINCT FROM v_prev.price_unit_text
    OR EXISTS (
      SELECT 1
        FROM (SELECT k FROM jsonb_object_keys(v_attrs) k
              UNION
              SELECT k FROM jsonb_object_keys(coalesce(v_prev.attributes, '{}'::jsonb)) k) ak(k)
       WHERE (v_attrs -> ak.k) IS DISTINCT FROM (v_prev.attributes -> ak.k)
         AND (public.attr_answer_other_text(v_attrs -> ak.k)
                IS DISTINCT FROM public.attr_answer_other_text(v_prev.attributes -> ak.k)
              OR NOT EXISTS (SELECT 1
                               FROM public.effective_category_links(v_prev.category_id) e
                               JOIN public.attributes a ON a.id = e.attribute_id
                              WHERE a.attr_key = ak.k AND a.attr_type <> 'text')));

  UPDATE public.listings SET
    title            = v_val->>'title',
    description      = v_val->>'description',
    video_url        = v_video,
    attributes       = v_attrs,
    price_amount     = (v_val->>'price_amount')::numeric,
    price_currency   = (v_val->>'price_currency')::char(3),
    price_mode       = v_val->>'price_mode',
    price_period     = v_val->>'price_period',
    price_bp         = (v_val->>'price_bp')::integer,
    price_negotiable = coalesce((v_val->>'price_negotiable')::boolean, false),
    price_unit       = v_val->>'price_unit',
    price_unit_text  = v_val->>'price_unit_text',
    -- D187 — the first place is the ad's own; the contact and the place text as sent.
    location_id      = CASE WHEN p_changes ? 'coverage' AND cardinality(v_cov) > 0 THEN v_cov[1] ELSE location_id END,
    contact_pref     = v_contact,
    street_address   = v_street,
    directions       = v_dirs,
    status           = CASE WHEN v_review THEN 'screening' ELSE v_prev.status END,
    -- Bundle 16 call A, as edit_listing — an ad that goes to review keeps the time it had left until its answer.
    clock_kept       = CASE WHEN v_review AND v_prev.status IN ('active','reduced','closed') THEN true
                            ELSE v_prev.clock_kept END,
    kept_remaining   = CASE WHEN v_review AND v_prev.status IN ('active','reduced') THEN
                              CASE WHEN v_prev.expires_at IS NULL THEN NULL
                                   ELSE greatest(v_prev.expires_at - now(), interval '0') END
                            ELSE v_prev.kept_remaining END,
    resume_status    = CASE WHEN v_review THEN NULL ELSE v_prev.resume_status END,
    updated_at       = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  -- D187 — the places, rewritten in the sent order; the feed index follows (its listing_locations triggers).
  IF p_changes ? 'coverage' AND v_cov IS DISTINCT FROM v_cov_prev THEN
    DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;
    INSERT INTO public.listing_locations (listing_id, location_id, position)
      SELECT p_listing_id, u.id, u.ordinality
        FROM unnest(v_cov) WITH ORDINALITY u(id, ordinality);
  END IF;

  v_after  := to_jsonb(v_row) - 'search_tsv' - 'updated_at';
  v_before := to_jsonb(v_prev) - 'search_tsv' - 'updated_at';
  IF v_cov IS DISTINCT FROM v_cov_prev THEN
    v_after  := v_after  || jsonb_build_object('coverage', to_jsonb(v_cov));
    v_before := v_before || jsonb_build_object('coverage', to_jsonb(v_cov_prev));
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;
  IF v_diff_a = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing changed';
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'edit', v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'status', v_row.status, 'review', v_review);
END $function$;
REVOKE ALL ON FUNCTION public.edit_my_listing(uuid, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_my_listing(uuid, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.edit_my_listing(uuid, jsonb) TO service_role;

-- ===== B — set_listing_pin, whole: a closed ad takes a pin =====
CREATE OR REPLACE FUNCTION public.set_listing_pin(p_listing_id uuid, p_lat numeric DEFAULT NULL::numeric, p_lng numeric DEFAULT NULL::numeric, p_precision text DEFAULT NULL::text, p_street text DEFAULT NULL::text, p_zoom smallint DEFAULT NULL::smallint, p_directions text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_row    public.listings%ROWTYPE;
  v_lat    numeric;
  v_lng    numeric;
  v_prec   text;
  v_street text;
  v_dirs   text;
  v_zoom   smallint;
  v_before jsonb;
  v_after  jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_row FROM public.listings
   WHERE id = p_listing_id AND seller_id = v_uid;
  IF v_row.id IS NULL THEN RAISE EXCEPTION 'not your listing'; END IF;

  -- Bundle 16 turn E2a (INC-631's rule) — a closed ad is edited like a live one.
  IF v_row.status NOT IN ('draft','active','reduced','closed','rejected','held','expired') THEN
    RAISE EXCEPTION 'pinNotEditable:%', v_row.status;
  END IF;

  v_street := nullif(btrim(regexp_replace(
                regexp_replace(coalesce(p_street, ''), '[[:cntrl:]<>]', ' ', 'g'),
                '\s+', ' ', 'g')), '');
  IF v_street IS NOT NULL AND char_length(v_street) > 200 THEN
    RAISE EXCEPTION 'streetTooLong:%', char_length(v_street);
  END IF;
  IF v_street IS NOT NULL AND public.attr_contact_like(v_street) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;

  -- step 5 / step 10 — the directions line is sanitised as the note is and
  -- refused with contactInNote under the same rule.
  v_dirs := nullif(btrim(regexp_replace(
              regexp_replace(coalesce(p_directions, ''), '[[:cntrl:]<>]', ' ', 'g'),
              '\s+', ' ', 'g')), '');
  IF v_dirs IS NOT NULL AND char_length(v_dirs) > 200 THEN
    RAISE EXCEPTION 'directionsTooLong:%', char_length(v_dirs);
  END IF;
  IF v_dirs IS NOT NULL AND public.attr_contact_like(v_dirs) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;

  IF p_lat IS NULL OR p_lng IS NULL THEN
    v_lat := NULL; v_lng := NULL; v_prec := NULL; v_zoom := NULL;
  ELSE
    IF p_lat < -90 OR p_lat > 90 THEN
      RAISE EXCEPTION 'badLatitude:%', p_lat;
    END IF;
    IF p_lng < -180 OR p_lng > 180 THEN
      RAISE EXCEPTION 'badLongitude:%', p_lng;
    END IF;
    v_prec := lower(btrim(coalesce(p_precision, 'exact')));
    IF v_prec NOT IN ('exact','approx') THEN
      RAISE EXCEPTION 'badPrecision:%', v_prec;
    END IF;
    IF p_zoom IS NOT NULL AND (p_zoom < 3 OR p_zoom > 20) THEN
      RAISE EXCEPTION 'badZoom:%', p_zoom;
    END IF;
    v_lat := round(p_lat, 6);
    v_lng := round(p_lng, 6);
    -- A re-sent pin without a zoom keeps the zoom it was saved at.
    v_zoom := coalesce(p_zoom, CASE WHEN v_row.pin_lat IS NOT NULL THEN v_row.pin_zoom END);
  END IF;

  v_before := jsonb_build_object('pin_lat', v_row.pin_lat, 'pin_lng', v_row.pin_lng,
                                 'pin_precision', v_row.pin_precision, 'pin_zoom', v_row.pin_zoom,
                                 'street_address', v_row.street_address,
                                 'directions', v_row.directions);
  v_after  := jsonb_build_object('pin_lat', v_lat, 'pin_lng', v_lng,
                                 'pin_precision', v_prec, 'pin_zoom', v_zoom,
                                 'street_address', v_street,
                                 'directions', v_dirs);

  UPDATE public.listings
     SET pin_lat = v_lat, pin_lng = v_lng, pin_precision = v_prec, pin_zoom = v_zoom,
         street_address = v_street, directions = v_dirs,
         pin_show_lat = CASE WHEN v_lat IS NULL THEN NULL
                             WHEN v_prec = 'approx' THEN round(v_lat, 2)
                             ELSE v_lat END,
         pin_show_lng = CASE WHEN v_lng IS NULL THEN NULL
                             WHEN v_prec = 'approx' THEN round(v_lng, 2)
                             ELSE v_lng END,
         updated_at = now()
   WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
  VALUES (p_listing_id, v_uid, 'edit', v_before, v_after, v_uid);

  RETURN jsonb_build_object('ok', true) || v_after;
END $function$;
REVOKE ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO authenticated;
GRANT ALL ON FUNCTION public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text) TO service_role;

-- ===== C — proofs =====
DO $proof$
DECLARE
  v_src text;
  v_msg text;
BEGIN
  -- P1. The bodies carry the change, with their headers kept.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.edit_my_listing(uuid, jsonb)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src NOT LIKE '%''coverage'',''contact_pref'',''street_address'',''directions'') THEN%'
     OR v_src NOT LIKE '%v_step := 6;%' OR v_src NOT LIKE '%v_step := 7;%'
     OR v_src NOT LIKE '%public.validate_listing_draft(v_uid, v_step, v_prev.category_id,%'
     OR v_src NOT LIKE '%OR v_street IS DISTINCT FROM v_prev.street_address%'
     OR v_src NOT LIKE '%OR v_dirs IS DISTINCT FROM v_prev.directions%'
     OR v_src NOT LIKE '%DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;%'
     OR v_src NOT LIKE '%jsonb_build_object(''coverage'', to_jsonb(v_cov))%'
     OR v_src NOT LIKE '%an ad in review is edited once its review is done%'
     OR v_src NOT LIKE '%an expired listing is renewed before it is edited%' THEN
    RAISE EXCEPTION 'B16E2a P1: the body of edit_my_listing is not as written';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src NOT LIKE '%NOT IN (''draft'',''active'',''reduced'',''closed'',''rejected'',''held'',''expired'')%'
     OR v_src NOT LIKE '%pinNotEditable:%' OR v_src NOT LIKE '%contactInNote%' THEN
    RAISE EXCEPTION 'B16E2a P1: the body of set_listing_pin is not as written';
  END IF;

  -- P2. Grants: signed-in users call both doors; anon calls neither.
  IF has_function_privilege('anon', 'public.edit_my_listing(uuid, jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.edit_my_listing(uuid, jsonb)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.set_listing_pin(uuid, numeric, numeric, text, text, smallint, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16E2a P2: a door is open to anon or closed to signed-in users';
  END IF;

  -- P3. No session: refused at the first gate.
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), jsonb_build_object('coverage', '[]'::jsonb));
    RAISE EXCEPTION 'B16E2a P3: edit_my_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16E2a P3: edit_my_listing: %', v_msg; END IF;
  END;

  -- P4. A scratch identity (a fresh uuid; no auth.users row is read or written): the keys a box may never send are
  -- still refused before any table is read; the four new keys pass the allowlist (the next gate then answers).
  PERFORM set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid())::text, true);
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), jsonb_build_object('category_id', gen_random_uuid()));
    RAISE EXCEPTION 'B16E2a P4: a category change was taken';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not editable: category_id' THEN RAISE EXCEPTION 'B16E2a P4: category: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.edit_my_listing(gen_random_uuid(), jsonb_build_object('poster_expires_at', now()));
    RAISE EXCEPTION 'B16E2a P4: an end-date change was taken';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not editable: poster_expires_at' THEN RAISE EXCEPTION 'B16E2a P4: end date: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
-----END B16E2A MIGRATION-----
```
