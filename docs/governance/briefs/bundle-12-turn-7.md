# Bundle 12 — the tidy-up round, turn T7: PP-12's red fixed first (INC-591); then the parent-first guard judges a category's paths (DEC-144 rule 2, bundle 7's named item), and the server-error census names the test behind a line (INC-398's evidence): brief, version 2 (saved unchanged, 2026-10-13; it replaces version 1, which was never sent)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T7 (2026-10-13). ONE TURN, ONE MIGRATION. No new strings. No package change.
Base: dev cd51ab03 (turn T6's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the parent-first guard on the category paths (a redeclared guard function and two triggers).
Tier B: PP-12's fix (part 1, first), the categories console's and the import dialog's reading of a door's words, the E2E failure reporter, one new E2E test, unit cases, docs.

ANSWERS TO THE LAST TURN
- Turns T5 (28832d59) and T6 (cd51ab03) landed byte for byte: each tree is the supervisor's copy plus the brief you saved.
- CI on cd51ab03 (run 38347651345) is FAILURE: 1,666 passed and 4 failed, all PP-12, on the mobile shard 2, the desktop shard 5 and the fast lane, each on its retry too. No error outside a test. The fault is in the test the supervisor wrote, not in your landing (see WHY). Part 1 of this turn fixes it, before anything else.
- T6's "not foreseen" (the route tree written from the carrier): expected; it equals the table.

WHY THIS TURN
- PART 1, THE RED FIRST — INC-591. Run 38347651345 on cd51ab03 failed in PP-12 only, at `await expect(page.getByTestId("post-step-2")).toBeVisible();` ("element(s) not found"), right after the draft is opened.
  - PP-12 registers a photo, then opens the draft and expects the photo step. The supervisor wrote that test in turn T6.
  - D39: a draft opens at the first unfinished step of the walk (category → specifications → photos → price → …). The photo step counts as finished once one photo is registered (`isStepFinished`, src/features/posting/types.ts; `firstUnfinished`, read in src/features/posting/use-draft.ts when a draft opens).
  - So PP-12's draft (draft_step 3, one photo) opens on the price page (step 4). The form is right; the test was wrong.
  - PP-10 and PP-11 open drafts with no photo, so they open on the photo step, and they pass.
  - T6's brief said PP-12 would fail on its base for a missing image. That was never run (the local browser does not start, INC-506), and it failed for this other reason. So the stored-tile image check has not run yet; this turn's CI is its first run.
  - The class (G29): 31 lines in e2e/ wait for the photo step (`post-step-2`). Only PP-12 registers a photo before it opens the draft, and every other one passed in this run.
- Bundle 7's named item, left for the tidy-up round (M11's stop report): "a pointer move that changes what a category inherits is not judged by the parent-first guard".
  - A category asks its own questions and those it inherits through its home path (`effective_category_links` follows the primary parent).
  - The guard (`catalog_order_guard`, migration 20261007033719) runs on `category_attribute_links` and on `attributes` only.
  - So moving a category, making another path its home or giving it a first path can put a question before the question it depends on, and nothing refuses it (DEC-144 rule 2: "a question is never asked before a question it depends on").
- The categories console printed any door key outside `admin.categories.error.*` raw. The parent-first refusal a move can now raise is `admin.attributes.error.parentAfterChild:…`. The import dialog already read every family's key; both now use one helper (INC-578's class, G29).
- INC-398: turn T2's fix did not lower the count. Run 38343868418 on 4959bbc4 shows `listing not found` 8 times, in shards 3, 5 and 6; the judge's first run failed. A server line names no test, so the cause cannot be read from the census. The census now names, for each line off the allowlist, the tests that finished next in the same log. The fix follows from those names, in a later turn.

WHAT THIS TURN BUILDS
- Part 1, first — e2e/photo-pipeline.spec.ts, PP-12 (EDITED):
  - after opening the draft, it expects the price page (`post-step-4`), as D39 says, presses Back (`post-back`) and then expects the photo step;
  - every image check after that is unchanged: the signed link's address, and the image drawing after it is scrolled into view;
  - its comment names INC-591.
- The migration (the appendix; read it whole):
  - A. `catalog_order_guard()` redeclared, its body identical but for one branch: for a row of `category_tree_pointers`, the child and everything under it are judged.
  - B. Two deferred constraint triggers on `category_tree_pointers`:
    - `catalog_order_guard_pointers_insert` — after a pointer is inserted;
    - `catalog_order_guard_pointers_update` — after an update that changes `parent_id` or `is_primary`. A display order alone changes nothing a category inherits and is not judged.
  - C. Proofs: C1 reads the branch and the two triggers from the catalogue; C2 runs five cases on scratch rows (a refused move, a passing move, a move with no caller, a display-order change, a refused first path); C3 checks nothing is left.
- src/lib/refusal-tail.ts — `DOOR_KEY` and `doorKeyText(raw, translate)`: a refusal that IS a known key, of any family, comes back as its sentence with its tail filled; anything else is null. src/lib/refusal-tail.test.ts — two cases.
- src/features/admin-categories/category-dialogs.tsx (`useSubmitError`) and src/features/admin/import-dialog.tsx (`reasonOf`) read a door's words through `doorKeyText`.
- scripts/e2e-failure-report.ts:
  - `ssrNeighbours(log)` — each `[ssr-error]` line with the titles of the next two test result lines in the same log;
  - `resultTitle(line)`, `nextLine(next)`;
  - `ssrCensus` counts those titles for the rows off the allowlist;
  - the census section prints, under each such row, "- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): …";
  - self-test: three new checks on the real capture behind the census (its two `listing not found` lines were followed by A11Y-2); mutation-checked by the supervisor (with the titles blanked, two of them fail).
- e2e/admin-categories-home.spec.ts — CT-45 (NEW). P2 asks A at place 1; the leaf, under P1, asks C, which depends on A, at place 0.
  - The move door (`admin_move_category_pointer`), called with the super admin's session, refuses the move under P2 with exactly `admin.attributes.error.parentAfterChild:<leaf>: <A> → <C>`, and the leaf stays under P1.
  - A move under P3 passes.
  - Scratch rows only, seeded through the service client; cleanup in `finally`.
- Docs: attributes.md (the order rule's paragraph), categories.md ("Parent first on a move"), e2e-harness.md (INC-398's evidence), the changelog, the roadmap (line 3; the T7 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- A move that breaks the order is refused whole, like a link or a definition save that breaks it. Nothing is moved half-way.
- A display order change of a path is not judged: it changes nothing a category inherits.
- No catalogue-wide check runs at the apply: the triggers judge only the paths written from now on. A category that already breaks the order (none on 2026-10-07, the operator's read) is refused at its next path change, by name.
- The existing refusal sentence is reused for a move ("Order refused in {detail}: …"): no new string.
- INC-398's fix waits for the names: a fix chosen without them would be a guess (G21).
- The new id is CT-45.
- PP-12 follows the seller's own way to the photo step (D39's resume, then Back) and asserts both. It does not seed the draft as if no photo were registered: that would test a state no seller reaches.

TESTS
- Unit: two doorKeyText cases (NEW); reporter self-test: three INC-398 checks (NEW).
- E2E: PP-12 (EDITED — part 1): it now opens on the price page and goes Back to the photos. No assertion loosened, no timeout raised: the two image checks are unchanged, and it gains one (the resume step). CT-45 (NEW).
- The migration's proofs C1–C3. The supervisor ran the migration on a local PostgreSQL 16 copy, with stand-ins for the tables built from the repository's own definitions. It applies, and its proofs pass. Each proof fails on a broken copy:
  - without the pointers branch, case 1 passes ("expected the parent-first refusal");
  - without the update trigger's WHEN, case 4 is refused;
  - without the insert trigger, case 5 passes.
- Red first: CT-45 fails on the base, where the move under P2 passes. Proven in CI only (INC-506). PP-12's red is run 38347651345 itself.
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev cd51ab03 with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 739 unit tests (125 files), the reporter's self-test, the usage maps (they match: no key moved), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard.
- `MIGRATIONS_DIR=<a copy with the migration as 20261013000000_t7-check.sql, its mark filled> bash scripts/check-migrations.sh`: "Migration guard OK" (born-closed, definer, self-marking, public-surface, real-row proof).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-7.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It names turn T6's commit cd51ab03 with FAILURE: that is PP-12, which part 1 of this turn fixes (it comes with the carrier). It may also name a later commit. Whatever it shows, go on: the CI read is the supervisor's, and any other fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit the platform pushes before the migration is on ethio-staging runs CT-45 against a staging database without the new triggers, so CT-45 fails there ("the move under P2 was not refused"). That is expected and is not fixed. Any other red in that window is NOT expected; PP-12 must pass on every commit that carries the carrier. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- Between the migration and the next Publish: the guard is live on ethio-prod at once, and a refused move shows the refusal's key, not its words, until the Publish brings the console's new reading.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, triggers, roles, constraints and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 13 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-7.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 13 files → each equal to:
  8db97251dedb8253202400bc0326ffc8686ec1c36df620afe107d5b88ae579e5  docs/_changelog.md
  920a49aa22f83142e737bd707cfa5c5915a84d0a68457b74f5ab55a643701fae  docs/features/attributes.md
  4106b2b63e70334a34f363dbb73931a8cafcb39c0e57c288e47e93e3484606c5  docs/features/categories.md
  c5f4774fae817043fbb4102b18d0f325960e2e0b90c8603b8cf4fd016e2da956  docs/features/e2e-harness.md
  67f9aff61ed3e72ff04e050e9bed59c386fde3f749d9ce9c2d7ff8e23736feb1  docs/features/media-pipeline.md
  9c7a6e40cd1ba9aaa4c42f95c50a7ed1dc1bc2912f015888c755ee72edb919bd  e2e/admin-categories-home.spec.ts
  33ce1ef4729bbdd5bd559466c36986211379b51b6d06ae18ec4b50f74927d63a  e2e/photo-pipeline.spec.ts
  f898ae40c3015d055035c1f7550d25be3931f1259b1e4af83d527664d73a5d3c  roadmap.md
  0fe20cfaf4dfd4175b4276d21472e26b5830248c7bf298800a9867914abdf201  scripts/e2e-failure-report.ts
  afbee77ed8762eb1879fea7a4a19fb8186ec73e3e5d172d967fa59ffbda77274  src/features/admin-categories/category-dialogs.tsx
  7d6f155f851d78b4302b09d1dcafa7151ee8a15d74c8d6b58fa289a8172129c9  src/features/admin/import-dialog.tsx
  7386bd03b36f82bcd086317d28e4c668c9b7d02c8e79717dc38efbf5142532c6  src/lib/refusal-tail.test.ts
  1424b1812dd47723618ec77983713c344d03c63e5e0eac1103999e52ebc9e8fb  src/lib/refusal-tail.ts
- On ethio-prod with your query tool (SELECT only):
- (c) `select md5(prosrc), length(prosrc), provolatile, prosecdef, proconfig from pg_proc where oid = 'public.catalog_order_guard()'::regprocedure;` → 26a66404a1cf0c247ec96fcdca72e82c | 1304 | v | t | {search_path=public}. This is the live definition the migration redeclares; any other value is a STOP.
- (d) `select count(*) from pg_trigger where tgrelid = 'public.category_tree_pointers'::regclass and tgname like 'catalog_order_guard%';` → 0
- (e) `select max(version) from public.migration_marks;` → 20261012180000

THE CARRIER — T7-TURN-CARRIER-2026-10-13.md (23,847 bytes; sha256 6a2476236c3041b10d13feabdab6dc1f9a68c450fc6aefaa2c8192891ce704ab; 31 sections)
- Its first line starts "T7 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 13 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  29a7f74e7134e839fa696a356fade43ce617c1df6b4a23bc87291e798787bf3d  docs/_changelog.md
  c6fbd2d31d425b2808618c6029b4172a5a997f9f9a74fe7013ab0ad8251a98ee  docs/features/attributes.md
  e39e21b30e0e06ab457221e7e92353cad45c0d2f042b4d1af7736f43acf2e250  docs/features/categories.md
  2883a7327a8b03c3a87bcbb50cb7836de7ccc1c9ce3119ddac3a8f8fca7e9d05  docs/features/e2e-harness.md
  4171807dad2e58a181c26c6f6dc56165fe86e8400ef693250179b5987cc2e1bd  docs/features/media-pipeline.md
  5e2ca17f55cd4e1e8f7bcb87a17a7dbc8fac13251626ecc1566946238a10988a  e2e/admin-categories-home.spec.ts
  636320de8d0483e3003ecae0ce52fd145049314e83407659f0c3cff151343ca7  e2e/photo-pipeline.spec.ts
  64f5e92373236e8aa15b76f1fa276f76077968c3b4f6cc5cefe56ce48107a567  roadmap.md
  8c3d35b6f5758d3cd471272de06015dc337983aace1f68397f528ace248fc866  scripts/e2e-failure-report.ts
  1dde23f1b74c47423ce4b50c4089e0f7a8344a54d401990802baa27b010fc8ac  src/features/admin-categories/category-dialogs.tsx
  3b6afc643c74bac916a32cc2be1a3a909ca9995ec93f6fe2bd09725e74e202e0  src/features/admin/import-dialog.tsx
  47c4afecab47a88a68dcf44216d0e073236165cf3ec8c76f92422dbd54c43f30  src/lib/refusal-tail.test.ts
  3ab2937f4cb3a82fd5c942e2d6a9d3c31b7e926f14664261f0fa7f2e1166b2b4  src/lib/refusal-tail.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 739 passed (125 files);
- `SELF_TEST=1 bun scripts/e2e-failure-report.ts` "Self-test OK: …" (its census clause now names the tests that finished next, INC-398);
- `bun run i18n:map-guard` "usage maps match the tree." (no rewrite expected this turn);
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn. CT-45 needs the migration on ethio-staging, which the operator applies after the turn; CI on the final commit is the proof (and the local browser does not start, INC-506).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 5a79552e634e70db011fd525cd82a87b50ca94ea82803cbb2d0be0d903b74492 (9,841 bytes, 183 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261013000000_t7-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261012180000 (the newest mark): if the reading gives 20261012180000 or less, use 20261012190000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select md5(prosrc), length(prosrc), provolatile, prosecdef, proconfig from pg_proc where oid = 'public.catalog_order_guard()'::regprocedure;` → 61f59c0ba155ba3327ce87994495e81b | 1543 | v | t | {search_path=public};
- `select tgname, tgdeferrable, tginitdeferred from pg_trigger where tgrelid = 'public.category_tree_pointers'::regclass and tgname like 'catalog_order_guard%' order by tgname;` → catalog_order_guard_pointers_insert | t | t, and catalog_order_guard_pointers_update | t | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(e).
- The 13 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 13 carrier paths, the brief and the one migration file (and types.ts if regenerated).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor) and read back its mark; CI's preflight waits for it (up to 25 minutes) — if the run has already failed at the preflight, use "Re-run failed jobs". Then Publish once CI is green. Nothing of this turn to walk: CT-45 proves the move refusal, and the walk would mean breaking a real category on purpose. After that Publish, the supervisor sends turn T6's short photo walk.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 12 (the tidy-up round), turn T7 (2026-10-13). Tier A. DEC-144 rule 2 (parent first) on a pointer change.
-- e2e-areas: admin-categories
-- Bundle 7 left one way round the parent-first guard (M11's stop report): a category asks its own questions and
-- those it inherits through its home path (effective_category_links follows the primary parent), so moving a
-- category, making another path its home or giving it a first path can put a question before the question it
-- depends on. The guard watched the links and the definitions only.
-- Live beside file (ethio-prod, pg_proc, read in this turn's census): catalog_order_guard() RETURNS trigger;
--   provolatile v; prosecdef t; proconfig {search_path=public}; md5(prosrc) 26a66404a1cf0c247ec96fcdca72e82c
--   (1304 characters). The body below is that text with ONE branch added (the pointers table).
-- A. catalog_order_guard() — redeclared: a pointer row judges its child and everything under it.
-- B. Two deferred constraint triggers on category_tree_pointers: a new pointer, and a pointer whose parent or home
--    flag changed. A display order alone changes nothing a category inherits and is not judged.
-- C. Proofs: scratch rows only, each case undone by its own block; the caller is a random id; no auth.users row.

-- ===== A — the guard judges a pointer's child =====
CREATE OR REPLACE FUNCTION public.catalog_order_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $g$
DECLARE
  v_roots uuid[];
  v_cats  uuid[];
  v_done  text;
  v_bad   jsonb;
BEGIN
  -- Migrations, seeds and service-client scratch rows are not judged.
  IF auth.uid() IS NULL THEN
    RETURN NULL;
  END IF;
  IF TG_TABLE_NAME = 'category_attribute_links' THEN
    v_roots := ARRAY[NEW.category_id];
  ELSIF TG_TABLE_NAME = 'category_tree_pointers' THEN
    -- T7 — a pointer added, moved or made home: the child and everything under it
    -- inherit through a new home path, so they are judged again.
    v_roots := ARRAY[NEW.child_id];
  ELSE
    SELECT array_agg(DISTINCT l.category_id) INTO v_roots
      FROM public.category_attribute_links l WHERE l.attribute_id = NEW.id;
  END IF;
  IF v_roots IS NULL THEN
    RETURN NULL;
  END IF;
  v_done := COALESCE(current_setting('ethio.catalog_order_judged', true), '');
  WITH RECURSIVE d(id) AS (
    SELECT unnest(v_roots)
    UNION
    SELECT t.child_id FROM public.category_tree_pointers t JOIN d ON t.parent_id = d.id)
  SELECT array_agg(d.id) INTO v_cats FROM d WHERE position(d.id::text IN v_done) = 0;
  IF v_cats IS NULL THEN
    RETURN NULL;
  END IF;
  PERFORM set_config('ethio.catalog_order_judged', v_done || ',' || array_to_string(v_cats, ','), true);
  v_bad := public.catalog_order_violations(v_cats);
  IF jsonb_array_length(v_bad) > 0 THEN
    RAISE EXCEPTION 'admin.attributes.error.parentAfterChild:%',
      (v_bad -> 0 ->> 'slug') || ': ' || (v_bad -> 0 ->> 'parent') || ' → ' || (v_bad -> 0 ->> 'child')
      USING ERRCODE = 'P0010';
  END IF;
  RETURN NULL;
END $g$;
REVOKE ALL ON FUNCTION public.catalog_order_guard() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_order_guard() TO service_role;

-- ===== B — the pointer triggers (deferred, like the two on links and definitions) =====
DROP TRIGGER IF EXISTS catalog_order_guard_pointers_insert ON public.category_tree_pointers;
CREATE CONSTRAINT TRIGGER catalog_order_guard_pointers_insert
  AFTER INSERT ON public.category_tree_pointers
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW EXECUTE FUNCTION public.catalog_order_guard();
DROP TRIGGER IF EXISTS catalog_order_guard_pointers_update ON public.category_tree_pointers;
CREATE CONSTRAINT TRIGGER catalog_order_guard_pointers_update
  AFTER UPDATE ON public.category_tree_pointers
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  WHEN (OLD.parent_id IS DISTINCT FROM NEW.parent_id OR OLD.is_primary IS DISTINCT FROM NEW.is_primary)
  EXECUTE FUNCTION public.catalog_order_guard();

-- ===== C — proofs (scratch rows only; no auth.users row; the caller is a random id) =====
DO $proof$
DECLARE
  v_key    text := 'e2e-mig-t7-' || substr(md5(random()::text), 1, 8);
  v_claims text := json_build_object('sub', gen_random_uuid(), 'role', 'authenticated')::text;
  v_case   int;
  v_p1     uuid;
  v_p2     uuid;
  v_leaf   uuid;
  v_a      uuid;
  v_c      uuid;
  v_def    text;
  v_err    text;
BEGIN
  -- C1: the guard's pointers branch and the two deferred triggers, read from the catalogue.
  v_def := pg_get_functiondef('public.catalog_order_guard()'::regprocedure);
  IF position('ELSIF TG_TABLE_NAME = ''category_tree_pointers'' THEN' IN v_def) = 0
     OR position('v_roots := ARRAY[NEW.child_id];' IN v_def) = 0 THEN
    RAISE EXCEPTION 'T7 C1: the guard has no pointers branch';
  END IF;
  IF (SELECT count(*) FROM pg_catalog.pg_trigger t
       WHERE t.tgrelid = 'public.category_tree_pointers'::regclass
         AND t.tgname IN ('catalog_order_guard_pointers_insert', 'catalog_order_guard_pointers_update')
         AND t.tgdeferrable AND t.tginitdeferred
         AND t.tgfoid = 'public.catalog_order_guard()'::regprocedure) <> 2 THEN
    RAISE EXCEPTION 'T7 C1: the two deferred pointer triggers';
  END IF;
  IF pg_get_triggerdef((SELECT t.oid FROM pg_catalog.pg_trigger t
                         WHERE t.tgrelid = 'public.category_tree_pointers'::regclass
                           AND t.tgname = 'catalog_order_guard_pointers_update'))
     NOT ILIKE '%old.parent_id IS DISTINCT FROM new.parent_id%old.is_primary IS DISTINCT FROM new.is_primary%' THEN
    RAISE EXCEPTION 'T7 C1: the update trigger judges more than a parent or home change';
  END IF;

  -- C2: five cases on scratch rows. P1 and P2 are top-level; P2 asks A (place 1); the leaf, under P1, asks C, which
  -- depends on A. Under P1 the leaf asks C alone. Each case undoes itself.
  --   1 a caller moves the leaf under P2, where A is inherited after C: refused;
  --   2 the same with C at place 2, after A: passes;
  --   3 the same as 1 with no caller (a migration, a seed, the service client): passes;
  --   4 a caller changes only the display order of a pointer whose leaf already breaks the order: passes;
  --   5 a caller gives a leaf that asks C its first path, under P2: refused.
  FOR v_case IN 1..5 LOOP
    v_err := NULL;
    BEGIN
      PERFORM set_config('request.jwt.claims', '{}', true);
      PERFORM set_config('ethio.catalog_order_judged', '', true);
      INSERT INTO public.categories (slug, name_en, is_active, allow_listings)
      VALUES (v_key || '-p1-' || v_case, v_key, true, true) RETURNING id INTO v_p1;
      INSERT INTO public.categories (slug, name_en, is_active, allow_listings)
      VALUES (v_key || '-p2-' || v_case, v_key, true, true) RETURNING id INTO v_p2;
      INSERT INTO public.categories (slug, name_en, is_active, allow_listings)
      VALUES (v_key || '-leaf-' || v_case, v_key, true, true) RETURNING id INTO v_leaf;
      INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
      VALUES (v_key || '-a' || v_case, v_key, 'single_select', '[{"value":"a"}]') RETURNING id INTO v_a;
      INSERT INTO public.attributes (attr_key, name_en, attr_type, options, depends_on)
      VALUES (v_key || '-c' || v_case, v_key, 'single_select', '[{"value":"x"}]', v_a) RETURNING id INTO v_c;
      INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
      VALUES (NULL, v_p1, 2000000), (NULL, v_p2, 2000001);
      INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order)
      VALUES (v_p2, v_a, 1), (v_leaf, v_c, CASE WHEN v_case = 2 THEN 2 ELSE 0 END);
      IF v_case = 4 THEN
        INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_p2, v_leaf, 0);
      ELSIF v_case <> 5 THEN
        INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_p1, v_leaf, 0);
      END IF;
      SET CONSTRAINTS ALL IMMEDIATE;
      SET CONSTRAINTS ALL DEFERRED;
      PERFORM set_config('ethio.catalog_order_judged', '', true);
      IF v_case <> 3 THEN
        PERFORM set_config('request.jwt.claims', v_claims, true);
      END IF;
      IF v_case = 4 THEN
        UPDATE public.category_tree_pointers SET display_order = 5 WHERE child_id = v_leaf;
      ELSIF v_case = 5 THEN
        INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_p2, v_leaf, 0);
      ELSE
        UPDATE public.category_tree_pointers SET parent_id = v_p2 WHERE child_id = v_leaf;
      END IF;
      SET CONSTRAINTS ALL IMMEDIATE;
      RAISE EXCEPTION 't7-undo';
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    SET CONSTRAINTS ALL DEFERRED;
    PERFORM set_config('request.jwt.claims', '{}', true);
    PERFORM set_config('ethio.catalog_order_judged', '', true);
    IF v_case IN (1, 5) THEN
      IF v_err IS NULL OR v_err NOT LIKE 'admin.attributes.error.parentAfterChild:' || v_key || '-leaf-' || v_case || ': '
                                        || v_key || '-a' || v_case || ' → ' || v_key || '-c' || v_case THEN
        RAISE EXCEPTION 'T7 C2 case %: expected the parent-first refusal, got %', v_case, coalesce(v_err, 'nothing');
      END IF;
    ELSIF v_err IS DISTINCT FROM 't7-undo' THEN
      RAISE EXCEPTION 'T7 C2 case %: expected a pass, got %', v_case, v_err;
    END IF;
  END LOOP;

  -- C3: nothing of the proofs is left.
  IF EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND slug LIKE v_key || '%')
     OR EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND attr_key LIKE v_key || '%') THEN
    RAISE EXCEPTION 'T7 C3: proof rows were left behind';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
