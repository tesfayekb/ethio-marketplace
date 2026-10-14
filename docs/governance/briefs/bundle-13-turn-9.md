# Bundle 13 — photos, turn 9: D154 B2 — a seller turns and crops a photo; D165 — the smaller copies at low detail: brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 13 — PHOTOS (D154–D165) — TURN 9 (2026-10-14). ONE TURN, ONE MIGRATION. 9 new strings. No package change.
Base: dev d902d735 (turn 8's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the migration (a new service-only door `replace_listing_photo`, with its proofs); the upload route (src/routes/api/upload/photo.ts: `replaces`); the photo's own route (src/routes/api/listings/photos.$id.ts: its list of a photo's objects moves to the storage adapter, the same rule); the photo screen (src/server/media/policy.ts: D165). Tier B: the photo step and its editor, the tests, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 8 verified: dev d902d735 equals the supervisor's tree with the saved brief (sha256 731218a2…, equal). Its CI run (38528698170) stopped in every job's setup before any test: ethio-staging answered 522 to account creation (it was down; the operator restarted it and re-ran the failed jobs). No failure came from the code; the supervisor reads the re-run, which judges turns 7 and 8. A red it finds comes first in the next turn.

WHY THIS TURN
- PART 1, D154 point 2 (the operator, 2026-10-13): "A seller can rotate (quarter turns) and crop a photo." The photo spec's B2: an editor on a photo with rotate left, rotate right, a crop box, Save and Cancel. Save makes a new image on the device; it goes through the whole pipeline as a new photo (strip, encode, upload, AI screen) and takes the old photo's place in the order, and the old photo is deleted. A refusal keeps the old photo and shows the reason. A stored photo is edited from its own stored copy, through its signed link.
- PART 2, D165 (the operator, 2026-10-14: "Phone sizes, cheap check"). It replaces D164 (the server makes the sizes): DEC-082 and INC-308 keep image work off our server. The phone keeps making the sizes; the one screen call shows the photo at the default detail and every smaller copy at low detail (Gemini 3: 1,120 and 280 tokens an image).

WHAT THIS TURN BUILDS
- PART 1 — D154 B2:
  - src/features/posting/photo-edit.ts (NEW) — the editor's arithmetic: quarter turns; the crop box in fractions of the turned picture (moved; sized by a corner while the opposite corner stays; a tenth of each side at least; never outside the picture); its pixels; the keyboard (an arrow key moves the box, Shift with an arrow key moves its bottom-right corner, 2 % a press).
  - src/features/posting/photo-editor.tsx (NEW) — `PhotoEditor`, a dialog: it fetches the stored cover through its signed link and decodes it on the device; Turn left and Turn right (a turn starts the box again from the whole picture); the box moved by its body and sized by its four corners (finger or mouse), or by the keyboard (it is one focusable control); Save, offered once something changed, draws the turned and cropped picture and hands it to the step; "Saving and checking the photo…" while it goes; a refusal stays in the dialog with "Your photo was kept as it was."; a photo that cannot be fetched says so.
  - src/features/posting/photo-encode.ts — `encodeBitmap`: the four sizes of a picture already decoded (`encodeVariants` decodes the file, then calls it; nothing else changes).
  - src/features/posting/step-photos.tsx — Edit (a crop icon after Move earlier and Move later) on every stored photo at its place, disabled until its links arrive; the editor's Save: `encodeBitmap`, then the upload with `replaces`; when stored, the old photo's tile leaves and the step reads the server again; Next and Back wait while an edit is sent.
  - src/features/posting/posting-service.ts — `uploadPhoto(…, replaces?)`.
  - src/features/posting/refusal-text.ts — `photoGone` reads "This photo is no longer on the ad."
  - src/routes/api/upload/photo.ts — `replaces` (optional; a UUID, else `badValue`): the photo must be on this listing, read as the caller (else `photoGone`, 409); an edit is not counted against the photo cap; after the checks, the screen and the puts, the door `replace_listing_photo` instead of `register_listing_photo`; then the old photo's objects are deleted (a failure is logged by name); the answer carries `replaced`. A new photo takes exactly the path it took before.
  - src/server/media/storage.ts — `objectRefsOf`, moved from src/routes/api/listings/photos.$id.ts, which now imports it (the same rule).
  - src/integrations/supabase/types.ts — `replace_listing_photo`.
  - The migration (the appendix): `replace_listing_photo`.
- PART 2 — D165: src/server/media/policy.ts — `policyParts`: the first image without a detail setting, every smaller copy with `mediaResolution: { level: "MEDIA_RESOLUTION_LOW" }`; a 400 that names the setting is asked once more with every image at the default detail, and the log says so; every other failure is `providerUnavailable`, as before.
- The strings (below), the usage maps, the e2e helper `uploadPhoto` (e2e/helpers/photos.ts: an optional `replaces`; the default unchanged), the docs (media-pipeline.md and posting.md, "Bundle 13, turn 9"), the changelog and the roadmap (line 3 and the turn-9 line).

STRINGS (9 NEW; Save and Cancel are the existing `common.save` and `common.cancel`)
- NEW `post.photos.edit`: "Edit photo" · «ፎቶውን አስተካክል»
- NEW `post.photos.editor.hint`: "Turn the photo, or move the box and its corners to crop it. When you save, it is checked again like a new photo." · «ፎቶውን ያዙሩት፤ ወይም ለመከርከም ሳጥኑንና ማዕዘኖቹን ያንቀሳቅሱ። ሲያስቀምጡት እንደ አዲስ ፎቶ እንደገና ይመረመራል።»
- NEW `post.photos.editor.rotateLeft`: "Turn left" · «ወደ ግራ አዙር»
- NEW `post.photos.editor.rotateRight`: "Turn right" · «ወደ ቀኝ አዙር»
- NEW `post.photos.editor.box`: "Crop box: the arrow keys move it; Shift with an arrow key changes its size." · «የመከርከሚያ ሳጥን፦ የቀስት ቁልፎች ያንቀሳቅሱታል፤ Shift ከቀስት ቁልፍ ጋር መጠኑን ይቀይራል።»
- NEW `post.photos.editor.saving`: "Saving and checking the photo…" · «ፎቶው እየተቀመጠና እየተመረመረ ነው…»
- NEW `post.photos.editor.failed`: "This photo could not be opened here. Close and try again." · «ይህ ፎቶ እዚህ ሊከፈት አልቻለም። ይዝጉና እንደገና ይሞክሩ።»
- NEW `post.photos.editor.kept`: "Your photo was kept as it was." · «ፎቶዎ እንደነበረ ቀርቷል።»
- NEW `post.photo.refusal.photoGone`: "This photo is no longer on the ad." · «ይህ ፎቶ ከአሁን በኋላ በማስታወቂያው ላይ የለም።»

DECIDED BY THE OPERATOR
- D165 (2026-10-14): "Phone sizes, cheap check" — the phone makes the sizes, with no AI; one AI call checks the photo in full detail and the smaller copies in low detail.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The editor opens on the stored cover (1,600 px at most) for every photo, one added in this visit too: one way for all.
- A turn starts the crop box again from the whole picture. The box's smallest side is a tenth of the picture's; an arrow key moves 2 %.
- Edit sits with the move buttons, as an icon with its name for a screen reader (the row of worded buttons is full at 360 px).
- An edit counts against the seller's upload limits (it is an upload), not against the ad's photo cap (it adds no photo).
- The old photo's objects are deleted after the door answers: a failure there leaves an object no row points at, logged by name; it never undoes the edit.
- D165's fallback: a model that refuses the per-image setting is asked again with every image at the default detail; a photo is never let through unscreened.
- The ids: PED-1..PED-9, PPOL-10..PPOL-12, PP-25..PP-28.

TESTS
- Unit, NEW: PED-1..PED-5 (src/features/posting/photo-edit.test.ts), PED-6..PED-9 (src/features/posting/photo-editor.test.tsx — it opens on the link; Save waits for a change; a turn and the keyboard's crop reach the saved picture; a refusal stays open with the kept line; a photo that cannot be fetched says so), PPOL-10..PPOL-12 (src/server/media/policy.test.ts). 797 in all.
- E2E, NEW (e2e/photo-pipeline.spec.ts, last): PP-25 (an edit takes the second place, then the cover's; the old objects go; at the cap a new photo is refused and an edit is taken), PP-26 (an edit naming a photo of another listing is `photoGone`, 409, nothing stored; an id that is not a UUID is `badValue`; a screen refusal leaves the old photo and its objects), PP-27 (the seller turns the second photo right — 320 × 240 is stored as 240 × 320 in the second place — and crops the cover with Shift and the left arrow ten times — 320 px wide becomes 256, first and the cover), PP-28 (an edit's upload answered with a refusal keeps the editor open with the reason and the kept line, the photo as it was; on a computer the crop box's corner is dragged first). Every photo is seeded through the upload route; no row is written by hand.
- Reached without an edit (CI runs them): PP-1..PP-24 (a new photo's path through the route is unchanged; the helper's default is unchanged), PP-8 and PP-15 (Remove: the same list of objects), the posting wizard's photo-step tests (the new button has its own test id), PPOL-1..PPOL-9 (they read `inlineData` only).
- Red first: PP-25..PP-28 fail on the base (no `replaces`, no Edit). The unit tests prove new behaviour (no red run needed, G38).
- Leases: one scratch seller each.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev d902d735 with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 797 unit tests (137 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test, a build, the bundle budget (JS 310.9 KiB of 320).
- The migration on a local PostgreSQL 16 copy with stand-in tables: it applied and its proofs passed. On stand-in rows: the middle of three photos replaced kept its place and the cover; the cover replaced (held) became the cover and stayed held; a photo not on the listing raised `photoGone`; a call with a session raised "called by the photo route only"; a missing `original` path and an unknown listing were refused; the count stayed three; `authenticated` cannot execute it.
- `scripts/check-migrations.sh` with this migration as 20261014210000_b13t9-check.sql: "Migration guard OK". Its grants are to `service_role` only.
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-9.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 8's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. It only adds a function: until he Publishes, the published site works as before, and nothing calls the new door.
- The expected red window (G35): CI on a commit pushed before the migration file exists runs PP-25 and PP-27 against a staging without the door, and they fail; that is expected and is not fixed. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 24 carrier paths and the brief. src/integrations/supabase/types.ts is in the carrier; if the platform regenerates it after the migration, name it in the report and paste `git diff src/integrations/supabase/types.ts`. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-9.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 20 files → each equal to:
  2bd84f0fd12a07efd8af41e7d62173ed409eb04edc106859a9e14df5cd5855b0  docs/_changelog.md
  06605d4f2e6d2bb5d86da5cf6acef02e18987fe1e9d483e951a16c8cfd312da3  docs/features/media-pipeline.md
  258877bf60df650ded323b4db22960958995ca290b7c7ab0a482c17e85063d3a  docs/features/posting.md
  f6d317967a4fe0525fa860685bc41e856fcee770ed3ed1b5887087c7758036b4  docs/generated/i18n-usage.json
  ff18c3a2da87ea2054d6a74ccf9f5e379d37f9d2c81d0675406c3c95a27f1d39  e2e/helpers/photos.ts
  a9712f4800909a58bd3a05bc0893d139c8b70ec9ea68726dcee23acaa9322e8d  e2e/photo-pipeline.spec.ts
  f6d317967a4fe0525fa860685bc41e856fcee770ed3ed1b5887087c7758036b4  public/i18n-usage.json
  33149f2ec17b5b063823a6a7dc27e419f6a34cdc909e29b8635596bbc0e28482  roadmap.md
  56cb0cc98ec9705943b40c3b7f026468c124c4bbea6159317d6af48a44bbf372  src/features/posting/photo-encode.ts
  94231268072dbd6db9f6d7637e03427f6816be708cc2d1f4b3c36b511ad47b08  src/features/posting/posting-service.ts
  6cd0b492f4bedafa2bcb1a2bd0e3e42f674d06fad43c12b6529016532ed287d5  src/features/posting/refusal-text.ts
  c61f1e1425e76433d8ccb4274ac7647aa5443140f2e9b25cc933e819a0ed9588  src/features/posting/step-photos.tsx
  27c16a796cda7f5ea104f466fc21566a9c15fd71abc5a3338883608dc22379ae  src/i18n/locales/am.ts
  c1cb2decba7122e6f4f05744b03d497bec347ec6e45b38e024c406d1377e0be2  src/i18n/locales/en.ts
  26ba3d4fc73cd39ae1de93494c287d04d968405ae55adc7722f893f0c460b396  src/integrations/supabase/types.ts
  b724db5547e4774564af9ce97ac5646501b5bea3604b9815560af524522eb7b5  src/routes/api/listings/photos.$id.ts
  0457feb82f89eba8923c92d6c819cdd472b58d2512fb604cc5369e46a2bd1d45  src/routes/api/upload/photo.ts
  a144dd1b6594acaf7aaf8706cfddfd09d8ce1df10b47258b51e622e98b766e58  src/server/media/policy.test.ts
  8f8d8d69a3199eb9bbb653d76c3dd804db7f843c410697aecf5f5b0a60b5a45a  src/server/media/policy.ts
  046d1208f9e86d0b3f31f17d0c356a2fe45fb4c93f7e3d3401dea102ef374a93  src/server/media/storage.ts
- (c) `ls src/features/posting/photo-edit.ts src/features/posting/photo-editor.tsx` → no such files.
- On ethio-prod with your query tool (SELECT only):
- (d) `select to_regprocedure('public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)') is null, to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)') is not null;` → t | t.
- (e) `select max(version) from public.migration_marks;` → 20261014100000 (turn 6's mark; turns 7 and 8 added none).

THE CARRIER — B13T9-TURN-CARRIER-2026-10-14.md (68,792 bytes; sha256 91362945a097ada33730eff1d425a4a829bf4173cb3a289b432dcb5dae20936e; 64 sections)
- Its first line starts "B13T9 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 24 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  3f8216bba94c94c4183c51a03710d3cf48fa71877c122afd3350c9ef18c6384a  docs/_changelog.md
  4d143a4f365b78770593cad8911c38330b4286466025c33494b29488d674740b  docs/features/media-pipeline.md
  5cdd700c7d5853028127e1296e1510e2edebfea4aa30b83a47bece5392fb55bd  docs/features/posting.md
  b3b8770a79b6c37cb0beb009b1de26fcb0a28f45cdaf96765c2bdc72894653cc  docs/generated/i18n-usage.json
  3c0f891a2c188f437bbdca7792ee3c71439e0f7206ce09c41138926981cc8a50  e2e/helpers/photos.ts
  4840689845cb58791f8e2ba353b1f5315fbe1edf7f40dba041203e39b1deed80  e2e/photo-pipeline.spec.ts
  b3b8770a79b6c37cb0beb009b1de26fcb0a28f45cdaf96765c2bdc72894653cc  public/i18n-usage.json
  b70a5c9230777ef1050a2647141b3e20f36ff865d44d584b86f460794f3f6904  roadmap.md
  a39c5674eb9a1b1d40bee9d840330a47bdf9c4f9fc2ca02099d32f1343f5ec7b  src/features/posting/photo-edit.test.ts
  8987d1cee8941254199fad53a2a9c50af4ef0e68c667300e31dd1628874b3e58  src/features/posting/photo-edit.ts
  d6e811118862be13f655ac5954887908f45f6fb9a1f5746294cd5c69f1dc2c76  src/features/posting/photo-editor.test.tsx
  67fc5e28405e6b53cdd92bc1ab970e56e5f138de401a1be4549ae624cd142272  src/features/posting/photo-editor.tsx
  3353a8edb5eebbdb74b0f66dc9a34f8b5c323b13698d73dd1311caedbb05c9bb  src/features/posting/photo-encode.ts
  2ea066138a2970943a7795f40495a5204dc390bc1e2710db5011c7573484e7b3  src/features/posting/posting-service.ts
  7aa0a1638a831c3db3d6848a9c1e0d993d172527039621e4ebed2750473416ea  src/features/posting/refusal-text.ts
  87e2f478a0fabff2feb9fbbfc08923a3050e52ca35023598ba40957c815641e3  src/features/posting/step-photos.tsx
  0347f07813daabfe304c9956815c9dfd9b7bfbd1bfda3a1778320246bb0a8973  src/i18n/locales/am.ts
  ac073214648c2d3f6d7e5d60bbdc4da2818b969fda8348f9b75d2d782f8e79a8  src/i18n/locales/en.ts
  dc89992156d88951816eca2cbe263da278a628e8aa77227325b8574c1160ecbc  src/integrations/supabase/types.ts
  ae3dff299ed7e037a3694d5b3da364208ecd991ca5e56ee318ebc6f4f6d27167  src/routes/api/listings/photos.$id.ts
  6e2a2ecc27ecc52a0cf36f0f9a635735e67846726075e4027cd33ef502ed21ba  src/routes/api/upload/photo.ts
  1e2dbb3a9b4debf8f96e495fe18a1b9de5c9bc963a1b2c1383eec141c0cc672d  src/server/media/policy.test.ts
  60f34b5624a6c8fa5764585d8a23bb394d4fa531f33450cefd828daee929323e  src/server/media/policy.ts
  35a9088206aff77f7f4af9872b7256342398ad5d866ba4762cf9c030d186f34f  src/server/media/storage.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t9.log` — 797 passed (137 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck and a build on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs PP-25..PP-28 and every other spec.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is a5a9aed0023ebd45a0d1760f4a37be746e403d562f7889112bdb8befedf83029 (5,446 bytes, 99 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261014210000_b13t9-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261014100000 (the newest mark): if the reading gives 20261014100000 or less, use 20261014110000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select p.proname, md5(p.prosrc), length(p.prosrc), p.provolatile, p.prosecdef, p.proconfig from pg_proc p where p.oid = 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)'::regprocedure;` → one row:
  replace_listing_photo | 452339cc7d60f7a9f83f3dc46e9788fa | 1939 | v | t | {search_path=public}
- `select has_function_privilege('authenticated', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE'), has_function_privilege('anon', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE'), has_function_privilege('service_role', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE');` → f | f | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(e).
- The 24 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 24 carrier paths, the brief and the one migration file. `git ls-files src/features/posting/photo-edit.ts src/features/posting/photo-edit.test.ts src/features/posting/photo-editor.tsx src/features/posting/photo-editor.test.tsx`, so the new files are shown tracked (G20).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- The strings: each new key, its English and its Amharic, as written (G43).
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each warning that names `replace_listing_photo`: the warning's title, and the total count. Change nothing for them.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging (the SQL editor) and read back its mark. CI's preflight waits for it (up to 25 minutes); if the run has already failed at the preflight, use "Re-run failed jobs".
2. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
3. Publish only when the supervisor says the newest commit is green and Lovable is idle.
4. Then the supervisor's walk.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 13 (photos), turn 9 (2026-10-14). Tier A. D154 B2 — a photo turned or cropped on the device takes the old photo's place.
--
-- A. replace_listing_photo (NEW; service-only, like register_listing_photo): the upload route's door for an edited photo
--    (POST /api/upload/photo with `replaces`). After the route has checked the caller, the listing, the photo it replaces
--    (read AS THE CALLER), the strip and the AI screen, and has stored the new objects, this door, in one transaction:
--    locks the listing row; refuses `photoGone` when the old photo is not on the listing; deletes the old row; inserts the
--    new photo at the old one's place (`display_order`), with `exif_stripped = true` as register_listing_photo writes it;
--    sets `cover_photo_id` to the first photo in the order (the cover follows the order, D154 B1). The plan's photo cap is
--    not checked: an edit adds no photo. The route deletes the old photo's objects after the door answers.
-- B. Proofs (structure, body markers, grants; RAISE EXCEPTION on any failure). No proof touches a real row or auth.users.
--    What the door does to rows is proven by the route's own tests (PP-25..PP-28), through the app's connection.

-- ===== A — replace_listing_photo =====
CREATE OR REPLACE FUNCTION public.replace_listing_photo(
  p_listing_id uuid,
  p_old_photo_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_cover uuid;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'replace_listing_photo is called by the photo route only';
  END IF;
  IF p_photo_id IS NULL OR p_old_photo_id IS NULL THEN
    RAISE EXCEPTION 'photo ids are required';
  END IF;
  -- One edit of an ad's photos at a time: the listing row is locked.
  PERFORM 1 FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  SELECT display_order INTO v_order FROM public.listing_photos
   WHERE id = p_old_photo_id AND listing_id = p_listing_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'photoGone';
  END IF;
  UPDATE public.listings SET cover_photo_id = NULL
   WHERE id = p_listing_id AND cover_photo_id = p_old_photo_id;
  DELETE FROM public.listing_photos WHERE id = p_old_photo_id AND listing_id = p_listing_id;
  -- D158 — a photo stored while photo screening is off is HELD (`unscreened`).
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (p_photo_id, p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false));
  SELECT id INTO v_cover FROM public.listing_photos
   WHERE listing_id = p_listing_id ORDER BY display_order LIMIT 1;
  UPDATE public.listings SET cover_photo_id = v_cover, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order,
                            'replaced', p_old_photo_id, 'cover_photo_id', v_cover);
END $$;

REVOKE ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_src text;
BEGIN
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src NOT LIKE '%replace_listing_photo is called by the photo route only%'
     OR v_src NOT LIKE '%RAISE EXCEPTION ''photoGone''%'
     OR v_src NOT LIKE '%FOR UPDATE%'
     OR v_src NOT LIKE '%coalesce(p_unscreened, false)%'
     OR v_src NOT LIKE '%ORDER BY display_order LIMIT 1%' THEN
    RAISE EXCEPTION 'proof A failed: the body of replace_listing_photo is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof A failed: replace_listing_photo is not the service role''s alone';
  END IF;
  -- The door it sits beside is unchanged.
  IF to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)') IS NULL THEN
    RAISE EXCEPTION 'proof B failed: register_listing_photo is missing';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
