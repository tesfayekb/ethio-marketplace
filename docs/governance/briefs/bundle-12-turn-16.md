# Bundle 12 — the tidy-up round, turn T16: photos in the seller's order — Move earlier, Move later and drag on a computer; the first photo is the cover (D154): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T16 (2026-10-13). ONE TURN, ONE MIGRATION. No new strings. No package change.
Base: dev 48b0b91f (turn T15's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: `move_listing_photo` (a new owner-only door), its proofs, the public-surface allowlist line for its grant, and the photo route's `move` action.
Tier B: the photo step (src/features/posting/step-photos.tsx), the posting service, the database types entry, two new E2E tests (PP-17, PP-18), the photo test helper, the two generated usage maps, the posting doc, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn T15 landed byte for byte (48b0b91f): the ten paths and the brief equal the supervisor's copy, and the migration file differs from the appendix only in its mark, 20261014040000. Your read-back matches the brief.
- CI on cca09202 (turn T14) is green. CI on 48b0b91f waits at its preflight for the operator's staging apply of T15's migration; a fix it needs comes in the next turn.
- The 183 older security warnings: not in a turn now. The supervisor's security review keeps that list; nothing in it is for this turn.

WHY THIS TURN
- The operator's decision D154 (2026-10-13): the first photo is the cover. Every photo has "Move earlier" and "Move later" at every width, and on a computer a photo can be dragged to another place.
- Today the order can change only one way: T15's Make cover moves a photo to the first place. No photo can be put at any other place, and the step draws the photos added in this visit first, whatever their place.

WHAT THIS TURN BUILDS
- PART 1 — the migration (the appendix; read it whole):
  - A. A NEW function, `move_listing_photo(p_listing_id uuid, p_photo_id uuid, p_position integer) RETURNS jsonb`. It is SECURITY DEFINER with search_path public.
    - Its checks, in order: no caller ('not authenticated'); the listing is not the caller's ('not your listing'); the photo is not on that listing ('photo not found on this listing'); the place is null or below 0 ('bad position').
    - The place is `least(p_position, <photos> - 1)`, so a place past the end means last.
    - Two passes, because `display_order` is unique per listing and every stored value is 0 or more:
      - every photo of the listing goes to `-1 - display_order`;
      - then the others take their old order, closed up around the chosen place, and the photo takes the place.
    - `listings.cover_photo_id` is set to the photo at place 0, and `updated_at` to now().
    - It returns `{ ok, position, cover_photo_id }`.
    - REVOKE ALL FROM PUBLIC, anon; GRANT EXECUTE TO authenticated; GRANT ALL TO service_role.
  - B. Proofs, which read and write no row: B1 (the header, and the body's checks and first pass), B2 (the grants), B3 (no caller is refused with 'not authenticated'), B4 (a caller who owns no such listing is refused with 'not your listing'). B3 and B4 use random ids, so nothing exists to touch. The move itself is proven by PP-17 and PP-18 on the app's own connection. A proof block would need a listing, and a listing needs a real account (`listings.seller_id` references `auth.users`).
- scripts/public-surface-allowlist.txt — one line naming `move_listing_photo`. Without it, the migration guard fails.
- src/integrations/supabase/types.ts — the function's entry under Functions, in its alphabetical place: Args `p_listing_id: string; p_photo_id: string; p_position: number`, Returns `Json`.
- src/routes/api/listings/photos.$id.ts (POST):
  - `action` still defaults to 'cover', and anything but 'cover' or 'move' is still refused as `action` / `badValue`;
  - 'move' needs `position`, a whole number from 0 to 999. Any other value (-1, 1.5, "1", null, missing) is refused as `position` / `badValue` before any read. A refusal answers 200 with `ok: false`, as every refusal of this route does;
  - the ownership read and the 403 are unchanged; then the door is `move_listing_photo` (with `p_position`) or `set_cover_photo`;
  - the upstream-failure answer names the door, and the error log names the action. The header comment lists the third door.
- src/features/posting/posting-service.ts — `movePhoto(photoId, position)` posts `{ action: 'move', position }` to the photo's route.
- src/features/posting/step-photos.tsx:
  - THE GRID IS THE SERVER'S ORDER. Every stored photo is drawn at its place: by its own tile (its local preview) when it was added in this visit, else by its stored tile. The photos not stored yet follow, as picked.
  - Every photo at a place has a row of two buttons:
    - `post-photo-earlier` (a left arrow) and `post-photo-later` (a right arrow);
    - each is named by the EXISTING words `post.photos.moveUp` ("Move earlier") and `post.photos.moveDown` ("Move later"), as its aria-label and its title;
    - the first photo's earlier and the last photo's later are disabled, and both are disabled while that photo's call is in flight;
    - a click calls `moveStored(id, place ∓ 1)`, which goes through `movePhoto` and re-reads the server. A refusal shows under the photo: `post-photo-state` on a stored tile, `post-photo-row-refusal` on a tile added in this visit.
  - DRAG ON A COMPUTER: where `(pointer: fine)` matches, a photo at a place is `draggable`. Its drag carries its id under the type `application/x-ethio-photo`. A drop on another photo moves it to that photo's place through the same call. A drag of files carries no photo id, so it still reaches T15's drop area (`post-photos-drop`).
  - Every tile at a place carries `data-place`.
- e2e/helpers/photos.ts — `photoAction` takes the verb 'move' and an optional `position`, sent as is, so a bad value can be tried.
- e2e/photo-pipeline.spec.ts — two NEW tests at the end of its describe, and `isMobile` added to its `./helpers/ui` import:
  - PP-17: three photos are uploaded through the API, and the step is opened (Back from step 4, D39).
    - The first photo's earlier and the last photo's later are disabled.
    - Move later on the first gives DB order [b, a, c]: the first tile is b, with the Cover label.
    - Move earlier on the last gives [b, c, a].
    - The route refuses -1, 1.5, "1" and null as `position` / `badValue`, and the order is unchanged.
    - A place past the end (99) puts the photo last: [c, a, b].
    - Another seller's move is refused with 403, and the order is unchanged.
  - PP-18 (skipped on the phone project, which has the buttons): the last photo, dragged onto the first, takes the first place, giving [c, a, b], with the Cover label. The drag is `dispatchEvent` with one shared DataTransfer.
- docs/generated/i18n-usage.json and public/i18n-usage.json — the usage maps, regenerated: `post.photos.moveUp` and `post.photos.moveDown` are now used on /post and /post/$listingId, and there is one more dynamic call site (the session tile's refusal).
- docs/features/posting.md (a T16 section), the changelog, and the roadmap (line 3, the T16 line, and the bundle 13 line no longer listing the order).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- One door moves ONE photo to ONE place, rather than taking the whole list in order. A move then never sends a stale list, and Make cover keeps its own door.
- The buttons are arrows named "Move earlier" and "Move later" for screen readers and as a tooltip. There are no new words, and two arrows fit a phone's tile.
- A drag works only on a computer. On a phone, a long press that drags would fight the page's scroll, so a phone has the buttons.
- Only a stored photo moves. A photo still on its way has no place yet.
- A place is a whole number from 0 to 999, and past the end means last.
- The new ids are PP-17 and PP-18.

TESTS
- E2E: PP-17 and PP-18 (NEW). Not edited: every other E2E test.
- Unit: none changed (740).
- The migration's proofs B1–B4. The supervisor applied the migration to a local PostgreSQL 16 copy, with stand-ins for `listings`, `listing_photos` (its unique order) and `auth.uid()`:
  - it applied, and its proofs passed;
  - on photos at places 0, 1, 3 and 4 (a, b, c, d):
    - a to place 1 gave b0 a1 c2 d3;
    - d to place 0 gave d0 b1 a2 c3, with the cover d;
    - d to place 99 gave b0 a1 c2 d3, with the cover b;
  - without the allowlist line, the migration guard fails, naming `move_listing_photo`.
- Red first: these tests prove new behaviour, so they need no red run (G38). On the base they fail at their first move button.
- Leases: PP-17 leases two pooled sellers (the second for the refusal), and PP-18 leases one, as the other PP tests do.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 48b0b91f with this turn's files)
- Clean:
  - typecheck (it covers e2e/), format, lint (0 errors, 33 warnings);
  - 740 unit tests (125 files);
  - the usage maps (regenerated; they match);
  - the hardcoded-strings guard (0 findings);
  - the selector self-test.
- `MIGRATIONS_DIR=<a copy with the migration as 20261013160000_t16-check.sql, its mark filled> bash scripts/check-migrations.sh`: "Migration guard OK" (born-closed, definer, self-marking, public-surface, real-row proof).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-16.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn T15's commit or T14's, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit the platform pushes before the migration is on ethio-staging runs PP-17 and PP-18 against a staging database without the door. There they fail at their first move. That is expected and is not fixed. Any other red in that window is NOT expected. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 12 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-16.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 12 files → each equal to:
  7343e5229227f2425c43eb43d30ab43244960e0e9166c93ce7aa9d3789e16885  docs/_changelog.md
  e62bd7341647d634fc31addc631a39bc62f688fcdb5a9f238e6cbaa1f3284a3c  docs/features/posting.md
  df7d2e362d18e94438f068af6e8a281334f7d5cd446626cdfdfd0cdaf2db0248  docs/generated/i18n-usage.json
  d3d6917c5eab80446539b7b2bc88f977f0b6a18870db9865e9090d505088a760  e2e/helpers/photos.ts
  b8cce5f7c76b1e86813513efb4b9e1d27e66bf527256e534a86619d5e1fa2c95  e2e/photo-pipeline.spec.ts
  df7d2e362d18e94438f068af6e8a281334f7d5cd446626cdfdfd0cdaf2db0248  public/i18n-usage.json
  3df0fe7a3a40d28442d5f9f69d7a16af9cab424ee1eb855dcf8a963733a2a58f  roadmap.md
  a49a234c220d045e503b612d90f22ea227e341186ac887a28a8f9fca0afa547a  scripts/public-surface-allowlist.txt
  7627ba0f1bc1fe274491df5312ffaec35e307c38f075774459ec34597f6356f6  src/features/posting/posting-service.ts
  0a94375c93817c5db45bd322fdfa05d99d7336f7de6db417bc9f11670d763820  src/features/posting/step-photos.tsx
  97fd32235428ab659a603d917f781a3887483363925bdc86b03433bac783ac2c  src/integrations/supabase/types.ts
  445135e03044c57fb93849ed1773264bbe92ca19196681ed9861eb1c4b64b1ea  src/routes/api/listings/photos.$id.ts
- On ethio-prod with your query tool (SELECT only):
- (c) `select count(*) from pg_proc where proname = 'move_listing_photo';` → 0. The door is new; any other value is a STOP.
- (d) `select max(version) from public.migration_marks;` → 20261014040000

THE CARRIER — T16-TURN-CARRIER-2026-10-13.md (43,383 bytes; sha256 961df9c28a3430046bdce19f5e8a095179b587e58fe17591323bbc22017a7eb7; 25 sections)
- Its first line starts "T16 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 12 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  895fbc5b780b4ad5e0fc439b26fe61a8715e9dda290a1348dc762b750ddb626f  docs/_changelog.md
  cb309944f4350e8ecff334e0d615990519d62683a34f6d87139ee14b3765d774  docs/features/posting.md
  d6a2fb86447b561cb981dcce7772d7c74d91459aaf93ce3f8c2be143ad28211d  docs/generated/i18n-usage.json
  ff18c3a2da87ea2054d6a74ccf9f5e379d37f9d2c81d0675406c3c95a27f1d39  e2e/helpers/photos.ts
  73897753c1d1aaa51b429bc4920ba94ed3b9d6c036a87679fdf2ca3b37eac4c4  e2e/photo-pipeline.spec.ts
  d6a2fb86447b561cb981dcce7772d7c74d91459aaf93ce3f8c2be143ad28211d  public/i18n-usage.json
  7f67d8d4a2e50811a42024923c14b75f9f709ce518ae0d9a432f29278a9d5dfb  roadmap.md
  4a8945ceeb2d40846522f0aa9e605731d6f4c4c05f9677962acfc967af7bb4ab  scripts/public-surface-allowlist.txt
  8f022d4ecb07c04fa0b293113a3840ecb1f9d374ae243f604a968ade60de7c24  src/features/posting/posting-service.ts
  762263e1c974874bc9be1be4392f6b42571d5e1a7b5d31f894f4ad23f1fef1c2  src/features/posting/step-photos.tsx
  8749ed39da2ce333afa73be9498e7ee75257afddfda454bb2022e6f86f457266  src/integrations/supabase/types.ts
  b724db5547e4774564af9ce97ac5646501b5bea3604b9815560af524522eb7b5  src/routes/api/listings/photos.$id.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-t16.log` — 740 passed (125 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs PP-17 and PP-18.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is af47434699c4c3a8ccac29c1d0277890afb1789a2ddc5b558e7d12c379b2b33d (6,526 bytes, 124 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier, so the allowlist line is in place):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261013160000_t16-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261014040000 (the newest mark): if the reading gives 20261014040000 or less, use 20261014050000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select md5(prosrc), length(prosrc), provolatile, prosecdef, proconfig from pg_proc where oid = 'public.move_listing_photo(uuid, uuid, integer)'::regprocedure;` → f90826241c5a3b86171aed4c6aa5c041 | 1846 | v | t | {search_path=public};
- `select has_function_privilege('anon', 'public.move_listing_photo(uuid, uuid, integer)', 'EXECUTE'), has_function_privilege('authenticated', 'public.move_listing_photo(uuid, uuid, integer)', 'EXECUTE');` → f | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 12 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 12 carrier paths, the brief and the one migration file (and types.ts if regenerated).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor) and read back its mark; CI's preflight waits for it (up to 25 minutes) — if the run has already failed at the preflight, use "Re-run failed jobs". Publish once CI is green on the final commit. The supervisor then sends ONE photo walk for T15 and T16.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 12 (the tidy-up round), turn T16 (2026-10-13). Tier A. A seller moves a photo to a place in the order (D154).
-- e2e-areas: posting
-- The rule (D154, the operator, 2026-10-13): the first photo is the cover; every photo has Move earlier and Move later,
-- and on a computer a photo can be dragged to another place. One door does all three: move_listing_photo(listing,
-- photo, position) puts the photo at that place (0 = first; a place past the end means last) and closes the others up
-- behind and around it in their old order. The cover follows the first place (cover_photo_id is set to it), as
-- set_cover_photo does since INC-597.
-- New function: move_listing_photo(uuid, uuid, integer) RETURNS jsonb; SECURITY DEFINER; search_path public; owner
-- only (the listing's seller_id must be auth.uid()), the photo must be on that listing, the place must be 0 or more.
-- display_order is unique per listing and every stored value is 0 or more, so the move runs in two passes: every photo
-- of the listing to a negative value (-1 minus the old one), then each to its new place.
-- A. The function, its REVOKE and GRANTs (authenticated only; never anon or PUBLIC).
-- B. Proofs: the catalogue only — the header, the grants, the checks in the body. The move itself is proven by PP-17
--    and PP-18 (e2e/photo-pipeline.spec.ts) through the photo route, on the app's own connection: a proof block would
--    need a listing, and a listing needs a real account (listings.seller_id references auth.users).

-- ===== A — the move =====
CREATE OR REPLACE FUNCTION public.move_listing_photo(p_listing_id uuid, p_photo_id uuid, p_position integer)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_count integer;
  v_place integer;
  v_cover uuid;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listing_photos
                  WHERE id = p_photo_id AND listing_id = p_listing_id) THEN
    RAISE EXCEPTION 'photo not found on this listing';
  END IF;
  IF p_position IS NULL OR p_position < 0 THEN
    RAISE EXCEPTION 'bad position';
  END IF;
  SELECT count(*)::integer INTO v_count FROM public.listing_photos WHERE listing_id = p_listing_id;
  v_place := least(p_position, v_count - 1);
  -- Pass 1: every photo of this listing out of the way (-1 minus its place).
  UPDATE public.listing_photos SET display_order = -1 - display_order
   WHERE listing_id = p_listing_id;
  -- Pass 2: the others in their old order, closed up around the chosen place; the photo at that place.
  WITH others AS (
    SELECT x.id, (row_number() OVER (ORDER BY x.display_order DESC) - 1)::integer AS i
      FROM public.listing_photos x
     WHERE x.listing_id = p_listing_id AND x.id <> p_photo_id
  ), placed AS (
    SELECT o.id, CASE WHEN o.i >= v_place THEN o.i + 1 ELSE o.i END AS place FROM others o
    UNION ALL
    SELECT p_photo_id, v_place
  )
  UPDATE public.listing_photos AS p SET display_order = placed.place
    FROM placed
   WHERE p.id = placed.id AND p.listing_id = p_listing_id;
  SELECT id INTO v_cover FROM public.listing_photos
   WHERE listing_id = p_listing_id AND display_order = 0;
  UPDATE public.listings SET cover_photo_id = v_cover, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'position', v_place, 'cover_photo_id', v_cover);
END $$;

REVOKE ALL ON FUNCTION public.move_listing_photo(uuid, uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.move_listing_photo(uuid, uuid, integer) TO authenticated;
GRANT ALL ON FUNCTION public.move_listing_photo(uuid, uuid, integer) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_def   text;
  v_state text;
  v_err   text;
BEGIN
  -- B1: the header and the checks.
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
                  WHERE p.oid = 'public.move_listing_photo(uuid, uuid, integer)'::regprocedure
                    AND p.prosecdef AND p.provolatile = 'v'
                    AND p.proconfig = ARRAY['search_path=public']
                    AND p.prorettype = 'jsonb'::regtype) THEN
    RAISE EXCEPTION 'T16 B1: the header is not the one this file writes';
  END IF;
  v_def := pg_get_functiondef('public.move_listing_photo(uuid, uuid, integer)'::regprocedure);
  IF position('RAISE EXCEPTION ''not your listing''' IN v_def) = 0
     OR position('RAISE EXCEPTION ''photo not found on this listing''' IN v_def) = 0
     OR position('RAISE EXCEPTION ''bad position''' IN v_def) = 0
     OR position('SET display_order = -1 - display_order' IN v_def) = 0 THEN
    RAISE EXCEPTION 'T16 B1: the body is not the one this file writes';
  END IF;
  -- B2: the grants.
  IF has_function_privilege('anon', 'public.move_listing_photo(uuid, uuid, integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.move_listing_photo(uuid, uuid, integer)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.move_listing_photo(uuid, uuid, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'T16 B2: the grants are not the ones this file writes';
  END IF;
  -- B3: no caller is refused before anything is read (a random listing and photo; nothing exists to touch).
  PERFORM set_config('request.jwt.claims', '{}', true);
  v_state := NULL;
  BEGIN
    PERFORM public.move_listing_photo(gen_random_uuid(), gen_random_uuid(), 0);
  EXCEPTION WHEN OTHERS THEN
    v_state := SQLSTATE;
    v_err := SQLERRM;
  END;
  IF v_err IS DISTINCT FROM 'not authenticated' THEN
    RAISE EXCEPTION 'T16 B3: expected "not authenticated", got % %', coalesce(v_state, 'no error'), coalesce(v_err, '');
  END IF;
  -- B4: a caller who owns no such listing is refused.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid(), 'role', 'authenticated')::text, true);
  v_err := NULL;
  BEGIN
    PERFORM public.move_listing_photo(gen_random_uuid(), gen_random_uuid(), 0);
  EXCEPTION WHEN OTHERS THEN
    v_err := SQLERRM;
  END;
  IF v_err IS DISTINCT FROM 'not your listing' THEN
    RAISE EXCEPTION 'T16 B4: expected "not your listing", got %', coalesce(v_err, 'no error');
  END IF;
  PERFORM set_config('request.jwt.claims', '{}', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
