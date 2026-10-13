# Bundle 12 — the tidy-up round, turn T15: T13's red first (INC-598, AU-12); then every photo can be removed and made the cover, Remove stops an upload, and the cover is the first photo (INC-595, INC-596, INC-597, D154): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T15 (2026-10-13). ONE TURN, ONE MIGRATION. No new strings. No package change.
Base: dev cca09202 (turn T14's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: `set_cover_photo` redeclared (Make cover moves the photo to the front), its proofs and the public-surface allowlist line for its restated grant.
Tier B: the photo step (src/features/posting/step-photos.tsx), three new E2E tests (PP-14, PP-15, PP-16), the AU-12 helper (e2e/helpers/users.ts), the two generated usage maps, the posting and E2E-harness docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn T14 landed byte for byte (cca09202): the six paths equal the supervisor's copy, the brief equals the upload, and the migration file differs from the appendix only in its mark, 20261014030000. The supervisor reads your read-back from your report.
- CI on 5753740e (turn T13) failed on AU-12 alone. Its fix is PART 1 of this turn. CI on cca09202 waits for the operator's staging apply of T14's migration; a fix it needs comes in the next turn.

WHY THIS TURN
- FIRST, CI's red on 5753740e (turn T13, run 38407106478), fixed first. One test failed on both attempts: AU-12 "edit: a reserved name needs a reason of ten characters" (e2e/admin-users.spec.ts, desktop, shard 5). It expected "This name needs a reason before it can be set." and got "That seller alias is already taken.".
  - AU-12 assigns a fixed reserved handle (`dashenbank` on desktop, `awashbank` on phone).
  - Before it saves, it calls `releaseStaleScratchAlias` (e2e/helpers/users.ts). That helper frees the handle from scratch accounts, but only those older than ten minutes.
  - The run before it (38406458515, on T13's first commit) was cancelled by the next push at 13:43:56Z. A cancelled run never runs its `finally`, so its scratch account can keep the handle. The next run's AU-12 came minutes later, inside the ten minutes, and the account was spared.
  - A scratch address carries its run's id (`mintEmail`: `e2e+<run>-<shard>-…`). This is INC-598.
- THEN the operator's photo walk (2026-10-13): "once a photo is added, is there anyway to remove it, no remove or edit button … when adding a photo, i remove the uploaded, but it will still be there."
  - INC-595 — a photo stored in an earlier visit has no buttons. Going Back to the step, a resumed draft and a reload all draw it with its picture and "Cover" only (the `post-photo-stored` tile).
  - INC-596 — Remove on a photo that has no id yet (being prepared, uploading, or waiting its turn) only clears its tile. Its send goes on: `pick` sends every photo of the batch it captured. The photo is stored and comes back.
  - INC-597 — Make cover writes `listings.cover_photo_id`, which no screen reads. The step's Cover label and every preview take the first photo by `display_order` (step-photos.tsx `coverId = photos[0]`, listing-preview.tsx `photos[0]`), so Make cover changes nothing a person sees.
- The operator's decisions (D154, 2026-10-13): the first photo is the cover; Make cover moves a photo to the front; on a computer, photos can be dropped on the step.

WHAT THIS TURN BUILDS
- PART 1 — INC-598 (e2e/helpers/users.ts, `releaseStaleScratchAlias`):
  - an account minted by ANOTHER run (its address does not start with `e2e+<this run>-`, read from `processId()`) is released at once;
  - the ten-minute guard now applies only to this run's own accounts;
  - every holder left in place is named in one line, `[e2e:alias] "<alias>" is still held by <id> (<reason>)`;
  - its comment names INC-598. AU-12 itself is not edited.
- PART 2 — the photo step (src/features/posting/step-photos.tsx):
  - INC-596: `removedRef`, a set of the local ids the seller removed before their photo was stored.
    - `send` returns at once for a removed id, before the device work and again before the upload.
    - When an upload's answer comes back for a removed id, a stored photo is deleted with `deletePhoto(id)`, even if the step has closed. If that delete fails, the step re-reads the server (`onChanged`), so the photo shows again with its own Remove.
    - `remove` adds the id to the set. A tile stored without an id re-reads the server.
  - INC-595: a stored photo's tile (`post-photo-stored`) carries the same buttons as a photo added in this visit:
    - Make cover (`post-photo-makecover`, on every photo but the cover) and Remove (`post-photo-remove`), through the same doors (`setCoverPhoto`, `deletePhoto`);
    - a button is disabled while its call is in flight, and a refusal is shown under the photo (`post-photo-state`);
    - the Cover label carries `post-photo-cover`.
  - Every tile carries `data-photo-id` (the photo's id, or empty before it is stored).
  - D154 — the step's root (`post-photos-drop`) accepts files dropped on it on a computer:
    - `data-dragging` is "1" while files are over it, and a dashed outline shows;
    - a drop takes the picker's way (`pick`), unless a batch is running or the cap is reached.
- PART 3 — the migration (the appendix; read it whole), for INC-597:
  - A. `set_cover_photo(uuid, uuid)` redeclared. Its header and body are the live text (census (c)) with one change. After the checks, the chosen photo moves to `display_order` 0 and the others follow in their old order. It runs in two passes, because the order is unique per listing and every stored value is 0 or more. It still sets `cover_photo_id`. Its REVOKE and GRANTs are restated as they were.
  - B. Proofs: B1 (the new body, the old checks, the unchanged header) and B2 (the grants), from the catalogue. The move itself is proven by PP-15 on the app's own connection. A proof block would need a listing, and a listing needs a real account (`listings.seller_id` references `auth.users`).
- scripts/public-surface-allowlist.txt — one line naming `set_cover_photo` (a restated grant). Without it, the migration guard fails.
- e2e/photo-pipeline.spec.ts — three NEW tests at the end of its describe, and `import { readFileSync } from "node:fs";` at the top:
  - PP-14 (INC-596): two photos are picked with the upload door held. The first is on its way, the second waits its turn; Remove on both clears both tiles. Released, the held send is stored by the server, and the step deletes it: DB truth reaches 0 rows. The second was never sent (one request). A fresh visit shows no photo.
  - PP-15 (INC-595, INC-597): two photos are uploaded through the API, and the step is opened (Back from step 4, D39).
    - Both stored tiles carry Remove; Make cover is on the second only.
    - Make cover moves the second photo first: DB order [second, first], the first tile's `data-photo-id` and Cover label.
    - Remove deletes the other photo: DB [second], one tile, no Make cover.
  - PP-16 (D154): a JPEG dropped on `post-photos-drop` outlines the area while it is dragged over, then is stored and registered (one row).
- docs/generated/i18n-usage.json and public/i18n-usage.json — the usage maps, regenerated by `bun run i18n:map-guard`: one more dynamic call site (the stored tile's refusal), and no key moved.
- docs/features/posting.md (a T15 section), docs/features/e2e-harness.md (INC-598's class rule), the changelog, the roadmap (line 3, the T15 line, and the bundle 13 and My listings lines).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- A photo removed while on its way is deleted when the server names it; its upload is not cancelled. A cancelled request can still have been stored, with no id to delete it by.
- The drop area is the whole photo step, with no new words; the outline is the cue.
- An account from another run is released at once. The ten-minute guard stays for this run's own accounts.
- The new ids are INC-598 and PP-14..PP-16.

TESTS
- E2E: PP-14, PP-15, PP-16 (NEW). Not edited: every other E2E test. AU-12 is unchanged; its helper is fixed (PART 1).
- Unit: none changed (740).
- The migration's proofs B1–B2. The supervisor applied the migration to a local PostgreSQL 16 copy, with stand-ins for `listings`, `listing_photos` (its unique order) and `auth.uid()`:
  - it applied and its proofs passed;
  - on photos at places 0, 1, 3 and 4, Make cover on the third gave c0 a1 b2 d3, then on the last d0 c1 a2 b3, and again on the same photo it was unchanged, with `cover_photo_id` set each time;
  - another caller was refused ("not your listing");
  - on the old body the proofs fail at B1.
- Red first:
  - not run, because the local browser does not start (INC-506);
  - on the base, PP-15 fails at "a stored photo has no Remove" (INC-595), and PP-14 at "the photo removed on its way was left on the listing" (INC-596);
  - with this turn's screens and the old function, PP-15 fails at "Make cover did not move the photo first" (INC-597);
  - CI on this turn's commits before the staging apply shows PP-15's first failure (the expected red window below).
- Leases: each new test leases one pooled seller, as the other PP tests do.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev cca09202 with this turn's files)
- Clean:
  - typecheck (it covers e2e/), format, lint (0 errors, 33 warnings);
  - 740 unit tests (125 files);
  - the usage maps (regenerated; they match);
  - the hardcoded-strings guard (0 findings);
  - the selector self-test.
- `MIGRATIONS_DIR=<a copy with the migration as 20261013150000_t15-check.sql, its mark filled> bash scripts/check-migrations.sh`: "Migration guard OK" (born-closed, definer, self-marking, public-surface, real-row proof).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-15.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn T14's commit or T13's, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit the platform pushes before the migration is on ethio-staging runs PP-15 against a staging database where Make cover does not move the photo. There PP-15 fails ("Make cover did not move the photo first"). That is expected and is not fixed. Any other red in that window is NOT expected. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 10 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-15.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 10 files → each equal to:
  0c75caa113519fadeab52a12f5908e3409b2ad1a069691704f6c6ab78021b804  docs/_changelog.md
  2883a7327a8b03c3a87bcbb50cb7836de7ccc1c9ce3119ddac3a8f8fca7e9d05  docs/features/e2e-harness.md
  96b6e3268486ba2f00c8cbcad087a5a095a4496eb4e2fdaea3303aef6b2a6794  docs/features/posting.md
  18d23cbb8254273770435444b3460d88dc3665b4b7a93209417cbffa1dc02ebb  docs/generated/i18n-usage.json
  448ec65e439546382953f5d7207ad7c45f3d98d4d2f25d8e6b1a636fc05734ff  e2e/helpers/users.ts
  636320de8d0483e3003ecae0ce52fd145049314e83407659f0c3cff151343ca7  e2e/photo-pipeline.spec.ts
  18d23cbb8254273770435444b3460d88dc3665b4b7a93209417cbffa1dc02ebb  public/i18n-usage.json
  66647153d9d26fa492a20ec89db61dfbc11e745bda2c41f091e71521dd3a3029  roadmap.md
  9364769630159fc40dc6d7b682f0388ca61548a3ce61d5d16fa7179877bfb035  scripts/public-surface-allowlist.txt
  bff8c73b62c11c000b1322fc1a6e639f6ebd7b170b1fddab305ba7098e0ef5e6  src/features/posting/step-photos.tsx
- On ethio-prod with your query tool (SELECT only):
- (c) `select md5(prosrc), length(prosrc), provolatile, prosecdef, proconfig from pg_proc where oid = 'public.set_cover_photo(uuid, uuid)'::regprocedure;` → a6ffb211add210f21e733c668655dd82 | 633 | v | t | {search_path=public}. This is the live definition the migration redeclares; any other value is a STOP.
- (d) `select max(version) from public.migration_marks;` → 20261014030000

THE CARRIER — T15-TURN-CARRIER-2026-10-13.md (23,910 bytes; sha256 b59aaed9ec48860784c11bbb5e81ab6a9950a4bfed9c7001496bb0439df4bce2; 30 sections)
- Its first line starts "T15 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 10 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  7343e5229227f2425c43eb43d30ab43244960e0e9166c93ce7aa9d3789e16885  docs/_changelog.md
  a5f586bb5708929571c27ba9ceaba7c4f2e4212cf82e4b16e90affd8bca498a9  docs/features/e2e-harness.md
  e62bd7341647d634fc31addc631a39bc62f688fcdb5a9f238e6cbaa1f3284a3c  docs/features/posting.md
  df7d2e362d18e94438f068af6e8a281334f7d5cd446626cdfdfd0cdaf2db0248  docs/generated/i18n-usage.json
  35d318b6d6babf19d91c37e16839a34921d7c08c445ee0a15c7f9759a07e5b51  e2e/helpers/users.ts
  b8cce5f7c76b1e86813513efb4b9e1d27e66bf527256e534a86619d5e1fa2c95  e2e/photo-pipeline.spec.ts
  df7d2e362d18e94438f068af6e8a281334f7d5cd446626cdfdfd0cdaf2db0248  public/i18n-usage.json
  3df0fe7a3a40d28442d5f9f69d7a16af9cab424ee1eb855dcf8a963733a2a58f  roadmap.md
  a49a234c220d045e503b612d90f22ea227e341186ac887a28a8f9fca0afa547a  scripts/public-surface-allowlist.txt
  0a94375c93817c5db45bd322fdfa05d99d7336f7de6db417bc9f11670d763820  src/features/posting/step-photos.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-t15.log` — 740 passed (125 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs PP-14..PP-16 and AU-12.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 547d27f4fd484656d3bb65ccef48b1d5344627737d925d8df6efcef827a33cf4 (5,025 bytes, 84 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier, so the allowlist line is in place):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261013150000_t15-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261014030000 (the newest mark): if the reading gives 20261014030000 or less, use 20261014040000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select md5(prosrc), length(prosrc), provolatile, prosecdef, proconfig from pg_proc where oid = 'public.set_cover_photo(uuid, uuid)'::regprocedure;` → aee04d0f49b447b2520e710c4e079f8b | 1292 | v | t | {search_path=public};
- `select has_function_privilege('anon', 'public.set_cover_photo(uuid, uuid)', 'EXECUTE'), has_function_privilege('authenticated', 'public.set_cover_photo(uuid, uuid)', 'EXECUTE');` → f | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 10 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 10 carrier paths, the brief and the one migration file (and types.ts if regenerated).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor) and read back its mark; CI's preflight waits for it (up to 25 minutes) — if the run has already failed at the preflight, use "Re-run failed jobs". Publish once CI is green on the final commit. The supervisor then sends the walk.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 12 (the tidy-up round), turn T15 (2026-10-13). Tier A. Make cover moves the photo to the front (INC-597, D154).
-- e2e-areas: posting
-- The rule (D154, the operator, 2026-10-13): the first photo is the cover, and Make cover moves a photo to first
-- place. Today set_cover_photo writes listings.cover_photo_id, which no screen reads: the photo step's Cover label and
-- every preview take the first photo by display_order (src/features/posting/step-photos.tsx, listing-preview.tsx), so
-- Make cover changed nothing a person sees (INC-597).
-- Live beside file (ethio-prod, pg_proc, read in this turn's census): set_cover_photo(uuid, uuid) RETURNS jsonb;
--   provolatile v; prosecdef t; proconfig {search_path=public}; md5(prosrc) a6ffb211add210f21e733c668655dd82
--   (633 characters). The body below is that text with ONE change: after the checks, the chosen photo moves to
--   display_order 0 and the others follow in their old order, closed up from 1; cover_photo_id is still set.
--   display_order is unique per listing and every stored value is 0 or more (register_listing_photo takes the
--   highest plus one), so the move runs in two passes: every photo of the listing to a negative value (-1 minus
--   the old one), then each to its new place.
-- A. set_cover_photo redeclared; its REVOKE and GRANTs restated as they were.
-- B. Proofs: the catalogue only — the new body, the unchanged header and grants. The move itself is proven by
--    PP-15 (e2e/photo-pipeline.spec.ts) through the photo route, on the app's own connection: a proof block would
--    need a listing, and a listing needs a real account (listings.seller_id references auth.users).

-- ===== A — Make cover moves the photo to the front =====
CREATE OR REPLACE FUNCTION public.set_cover_photo(p_listing_id uuid, p_photo_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listing_photos
                  WHERE id = p_photo_id AND listing_id = p_listing_id) THEN
    RAISE EXCEPTION 'photo not found on this listing';
  END IF;
  -- D154: the cover is the first photo. Pass 1 moves every photo of this listing out of the way (-1 minus its
  -- place); pass 2 puts the chosen photo at 0 and the others behind it in their old order.
  UPDATE public.listing_photos SET display_order = -1 - display_order
   WHERE listing_id = p_listing_id;
  UPDATE public.listing_photos AS p SET display_order = o.place
    FROM (SELECT x.id,
                 (row_number() OVER (ORDER BY (x.id = p_photo_id) DESC, x.display_order DESC) - 1)::integer AS place
            FROM public.listing_photos x
           WHERE x.listing_id = p_listing_id) AS o
   WHERE p.id = o.id AND p.listing_id = p_listing_id;
  UPDATE public.listings SET cover_photo_id = p_photo_id, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'cover_photo_id', p_photo_id);
END $$;

REVOKE ALL ON FUNCTION public.set_cover_photo(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_cover_photo(uuid, uuid) TO authenticated;
GRANT ALL ON FUNCTION public.set_cover_photo(uuid, uuid) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_def text;
BEGIN
  -- B1: the move is in the live body, the old checks are kept, and the header is unchanged.
  v_def := pg_get_functiondef('public.set_cover_photo(uuid, uuid)'::regprocedure);
  IF position('SET display_order = -1 - display_order' IN v_def) = 0
     OR position('ORDER BY (x.id = p_photo_id) DESC, x.display_order DESC' IN v_def) = 0
     OR position('RAISE EXCEPTION ''not your listing''' IN v_def) = 0
     OR position('RAISE EXCEPTION ''photo not found on this listing''' IN v_def) = 0
     OR position('SET cover_photo_id = p_photo_id' IN v_def) = 0 THEN
    RAISE EXCEPTION 'T15 B1: the body is not the one this file writes';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
                  WHERE p.oid = 'public.set_cover_photo(uuid, uuid)'::regprocedure
                    AND p.prosecdef AND p.provolatile = 'v'
                    AND p.proconfig = ARRAY['search_path=public']
                    AND p.prorettype = 'jsonb'::regtype) THEN
    RAISE EXCEPTION 'T15 B1: the header changed';
  END IF;
  -- B2: the grants are as they were.
  IF has_function_privilege('anon', 'public.set_cover_photo(uuid, uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.set_cover_photo(uuid, uuid)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.set_cover_photo(uuid, uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'T15 B2: the grants changed';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
