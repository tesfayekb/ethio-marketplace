# Bundle 13 — photos, turn 12: D155b / D159 — Remove background on the cover (Photoroom): brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 13 — PHOTOS (D154–D166) — TURN 12 (2026-10-14). ONE TURN, ONE MIGRATION. 10 new strings. No package change.
Base: dev eb8da59d (turn 11's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the migration (the AI feature `background_removal`: its name in `ai_features`' check, its row, its proofs); the new route src/routes/api/listings/background.ts (the caller, the switch, the dials, the seller's own ad and cover read as the caller, the ad's two tries, the provider call); the provider module src/server/media/background.ts (only the stored cover's image goes out; the answer is checked); the photo statuses moved into src/server/media/hold.ts and read by the upload route; the meter's list (src/server/ai/meter.ts); the Privacy draft's list of companies (docs/spec/legal/privacy-policy-v1.en.md and .am.md). Tier B: the dialog and the photo step, Admin › Services › AI's list, the tests, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 11 verified: dev eb8da59d equals the supervisor's tree with the saved brief (sha256 6c410f46…, equal); nothing else changed.
- CI: turn 9's run (74b1ca6d) failed only on SC-20 (INC-615), which turn 10 fixed; 1,803 passed. Turn 10's run (2f73df1b) is running and turn 11's (eb8da59d) waits behind it; the supervisor reads both as they land. No fix rides this turn.

WHY THIS TURN
- D155 (the operator, 2026-10-13): background removal with ONE fixed background in the house colour, seen before the seller keeps it ("the background color can not be changed and its our theme so evey picture has the same").
- D159 (the operator, 2026-10-13): "only one background removal per posting, that will be for the main image that will show on the card" — the tool on the cover only, once per ad plus one retry, in every category.
- D156 (the operator, 2026-10-13): the provider is Photoroom; its data terms are read before building. Read 2026-10-14 (photoroom.com/platform/security): images sent to its synchronous endpoint are "discarded immediately after the response"; self-serve API plans may train on them unless the account's opt-out is set (the operator sets it); its infrastructure runs in the United States.
- D158: every AI feature has its own switch, price and meter in Admin › Services › AI.

WHAT THIS TURN BUILDS
- The migration (the appendix): `background_removal` joins `ai_features`' check; its row is on, priced $0.02 a call, with no budget; proofs.
- src/server/media/background.ts (NEW): the tries (2 an ad, for good), Photoroom's endpoint, `readSource` (the stored cover through a link the server signed, an image of at most 4 MB), `cutOut` (only the image goes to Photoroom, with the key in its header, asking for a WebP cut-out on a transparent ground at most 4 megapixels; a refusal, a non-image, an empty or oversized answer or no network is no cut-out, and is logged), fake mode's fixed 400 x 300 PNG (a green block on a transparent ground).
- src/routes/api/listings/background.ts (NEW): `POST /api/listings/background { listingId, photoId }` — the caller; the switch (off, or no `PHOTOROOM_API_KEY`: `featureOff`, before any dial); the daily dial `background:day` (RATE_LIMIT_BACKGROUND_PER_DAY, 10); two UUIDs (`badValue`); the listing read as the caller (`notYourListing` 403; a closed status `listingNotOpenForPhotos` 409); the photos read as the caller in their order (`photoGone` 409; any photo but the first `notCover` 409); the ad's tries `background:listing` (`backgroundSpent`); the provider (or fake mode); one call metered; the answer is the image itself with `x-tries-left` and `cache-control: no-store`. Nothing is stored.
- src/server/media/hold.ts: `PHOTO_OPEN_STATUSES` (the six statuses that take photos); src/routes/api/upload/photo.ts reads it instead of its own copy (no change in behaviour).
- src/features/posting/photo-background.ts (NEW): `PHOTO_BACKDROP` #F3F5F8 (the page tone) and `onBackdrop` (the cut-out laid on it, at its own size).
- src/features/posting/background-dialog.tsx (NEW): the dialog — a plain sentence and Remove background (nothing is asked before it); the cut-out on the house background with the tries left; Keep (the picture to the step); Retry while a try is left; Cancel; refusals in words, with "Your photo was kept as it was."
- src/features/posting/posting-service.ts: `removeBackground(listingId, photoId)` (60-second limit; an image answer, or the refusal's reason). src/features/posting/refusal-text.ts: `backgroundRefusalKey`. src/features/posting/step-photos.tsx: the cover's move row gains Remove background (an eraser icon after Edit; the cover only); Keep goes through `saveEdit` (the upload route with `replaces`, as turn 9's Edit).
- src/server/ai/meter.ts and src/features/admin-ai/ai-service.ts: the seventh feature, listed last as "Background removal".
- src/routeTree.gen.ts (the new route, as the router's generator writes it); the usage maps; the strings.
- docs/spec/legal/privacy-policy-v1.en.md and .am.md: Photoroom in section 6's list of companies. docs/features/ai-services.md, media-pipeline.md, posting.md; the changelog; the roadmap (line 3 and the turn-12 line).

STRINGS (10 NEW)
- NEW `admin.ai.feature.background_removal`: "Background removal" · «ዳራ ማስወገድ»
- NEW `post.photos.background`: "Remove background" · «ዳራውን አስወግድ»
- NEW `post.photos.background.hint`: "Your cover photo's background is replaced with ethio.com's own colour, the same on every ad. You see it before you keep it. Each ad can do this once, and try again once." · «የሽፋን ፎቶዎ ዳራ በethio.com የራሱ ቀለም ይተካል፤ ቀለሙ በሁሉም ማስታወቂያዎች ላይ አንድ ነው። ከማቆየትዎ በፊት ያዩታል። እያንዳንዱ ማስታወቂያ ይህን አንድ ጊዜ ማድረግና አንድ ጊዜ እንደገና መሞከር ይችላል።»
- NEW `post.photos.background.working`: "Removing the background…" · «ዳራው እየተወገደ ነው…»
- NEW `post.photos.background.triesLeft`: "Tries left for this ad: {count}" · «ለዚህ ማስታወቂያ የቀሩ ሙከራዎች፦ {count}»
- NEW `post.photos.background.keep`: "Keep" · «አቆይ»
- NEW `post.photos.background.failed`: "The background could not be removed right now. Please try again later." · «ዳራው አሁን ሊወገድ አልቻለም። እባክዎ ቆየት ብለው እንደገና ይሞክሩ።»
- NEW `post.photos.background.off`: "Background removal is switched off for now." · «ዳራ ማስወገድ ለጊዜው ጠፍቷል።»
- NEW `post.photos.background.spent`: "This ad has used its background removals." · «ይህ ማስታወቂያ የዳራ ማስወገጃ ሙከራዎቹን ጨርሷል።»
- NEW `post.photos.background.notCover`: "Only the cover photo's background can be removed. Make this photo the cover first." · «ዳራ ሊወገድ የሚችለው ከሽፋን ፎቶ ብቻ ነው። መጀመሪያ ይህን ፎቶ ሽፋን ያድርጉት።»

DECIDED BY THE OPERATOR
- D155, D156, D159 (above).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The house background is #F3F5F8, the site's page tone (D132). The seller's device lays the cut-out on it: the colour never depends on the provider, and the server does no image work (DEC-082).
- Photoroom is asked for a WebP cut-out on a transparent ground (transparency kept, a smaller download for the phone than PNG), at most 4 megapixels; it gets the stored cover's image and nothing else.
- The dialog asks nothing until Remove background is pressed, so a stray tap spends no try. The ad's tries are spent before the provider is called, as the writing helper's are: a provider failure uses a try.
- A seller's daily limit: 10 removals (ESTIMATE; a dial).
- The feature's row has no budget (the operator sets it, as for the other features); $0.02 a call (Photoroom's listed price). Without `PHOTOROOM_API_KEY` the tool says it is switched off.
- The six statuses that take photos are one export, read by the upload route and the new route.
- The Privacy draft names Photoroom ("Removes the background of your cover photo when you ask it to; it receives only the photo").
- The ids: BGR-1..BGR-10, PBG-1..PBG-7, PP-30, PP-31.

TESTS
- Unit, NEW: BGR-1..BGR-4 (src/server/media/background.test.ts), BGR-5..BGR-10 (src/server/media/background-route.test.ts: the route's order with the user client, the meter and the links mocked), PBG-1..PBG-3 (src/features/posting/photo-background.test.ts), PBG-4..PBG-7 (src/features/posting/background-dialog.test.tsx). Edited: AIM-4 (src/server/ai/meter.test.ts, seven features). 830 in all.
- E2E, NEW (e2e/photo-pipeline.spec.ts, last): PP-30 (the walk: the tool on the cover only; nothing asked before Start; the preview 400 x 300 with its corner the house colour and its middle the item, within two steps a channel; one try left; Keep stores the cut-out as the cover through the upload route), PP-31 (the route: 401 without a session; `badValue`; `notYourListing` for an ad that is not the caller's; `notCover` with no try spent; two tries answered as PNG images with `x-tries-left` 1 then 0 and `no-store`; then `backgroundSpent`; nothing stored or moved). Fake mode: every e2e job exports `E2E_FAKE_TRANSLATE=1`.
- E2E, edited: SV-2 and SV-4 (e2e/admin-services.spec.ts): the list of features is seven (`background_removal` added); titles say seven. Nothing else in them changes.
- Reached without an edit (CI runs them): every upload and photo-step test (the upload route reads the same six statuses), the AI page's tests (a seventh row is a row like the others).
- Red first: PP-30, PP-31 and the new unit tests prove new behaviour (no route, no button on the base); SV-2 and SV-4 fail on the base once the migration has run (seven rows), and pass with this turn.
- Leases: PP-30 and PP-31 one scratch seller each; SV-2, SV-4 the super admin, read only on the real rows (G27).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev eb8da59d with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 830 unit tests (144 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test, the import gate, the listing-write guard, the browse-path and marketplace guards, a build, the bundle budget (JS 312.1 KiB of 320).
- The migration on a local PostgreSQL 16 copy of `ai_features` and `ai_feature_gate` as 20261013184636 made them, with the six rows and an `e2e-` scratch row: it applied and its proofs passed; the read-back gave the row as below.
- `scripts/check-migrations.sh` with this migration as 20261014121500_b13t12-check.sql: "Migration guard OK".
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging), and Photoroom itself (no key in the sandbox). CI on the final commit runs the browser tests in fake mode.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-12.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 9's, 10's or 11's commit, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. the secret (below);
  9. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. The published site keeps working: it does not call the new route, and its AI page shows a feature it does not name by its id until the next Publish.
- The expected red window (G35): CI on a commit pushed before the migration exists on ethio-staging runs SV-2 and SV-4 (seven features expected, six there) and PP-30 and PP-31 (the switch unreadable: `providerUnavailable`), and they fail. That is expected and is not fixed. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles, features and constraints. Never an e-mail address, a user id, a token, a key, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 30 carrier paths and the brief. Name any other file in the report's first lines, with its reason (if the platform regenerates src/integrations/supabase/types.ts, name it and paste `git diff --stat` for it; no type changes with this migration). Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-12.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 22 files → each equal to:
  50e3cb408b10a6781d7f6fecc2d70bc9bd8aba3e7a4dcf4bbe23b64aef755739  docs/_changelog.md
  7690c1a6908477e6834a8ef78c93b954a75719cfcd5100e2a1dd1549761b8217  docs/features/ai-services.md
  584fe0828ed715541cff2e4e76c91003b8decadafd601346e938c3de0994880f  docs/features/media-pipeline.md
  154d67fe4c5ca8a0db04bb63fae879b291769d905215ea6d9b32dc37ee961e48  docs/features/posting.md
  99542aec8f945fe8f2465a011c2f21a83b430c6616b7f6272d9d65778342d52f  docs/generated/i18n-usage.json
  31c4f83dc7753535976bd48ac633c50ffbadd1582b4dd5af44b494c37be77573  docs/spec/legal/privacy-policy-v1.am.md
  4a1a9ac602060e8c6ae65f34bd50a2ec2d3e508dd6f26894303435d64ae879a4  docs/spec/legal/privacy-policy-v1.en.md
  7ad6e0af9dc0c79ff34a65a86c20a289b5ed6702be07fdbae3ff0c1d5516d6ef  e2e/admin-services.spec.ts
  863478e864ac8073e603e08970c847483e1ae37e475031ff2793d9734801eabb  e2e/photo-pipeline.spec.ts
  99542aec8f945fe8f2465a011c2f21a83b430c6616b7f6272d9d65778342d52f  public/i18n-usage.json
  2331a7058bccdc45057ab3b2514fed7f164137f1f77685a89f2bf7d4a4aa9d0e  roadmap.md
  3d069b524a5893b52987235e3d1918eafd2cdcf8388e7227a7b5cfef15a65834  src/features/admin-ai/ai-service.ts
  f7cff07b3d9834d949160c9d4a48356473e8d7a67b57da0db14c798df479cb3e  src/features/posting/posting-service.ts
  7aa0a1638a831c3db3d6848a9c1e0d993d172527039621e4ebed2750473416ea  src/features/posting/refusal-text.ts
  86007b93b5725a32a2e08c6f33c85222cf14fe17b5eda060820ac486c3f7dc7c  src/features/posting/step-photos.tsx
  a6568c37289c9a35b0a2045505a6965e72c682275f13bd27de16c49ecdb406b6  src/i18n/locales/am.ts
  b8b24e86db2ac0c68cc083661b770a50b9821488bebe508208d1d8e3db0c6355  src/i18n/locales/en.ts
  61e0fd2581e8527b0e23e04ed97fb5ac5d048ff6b26b699f7c682af12499b1b8  src/routeTree.gen.ts
  ae25b2c85120307e5665bc27cdef7e66ae9c5ec78ff94cfecf803c5c6a5ed7c4  src/routes/api/upload/photo.ts
  5db594036876fd8828d0f336d5ae25bfd9760bdf3e5633cce62328285064f398  src/server/ai/meter.test.ts
  c4489c02fc9aa580fc9ad5c8afbbb4bda24f759e642cc53afb21baa9d488d3f8  src/server/ai/meter.ts
  2b27f786462f248e577fe4970ac98dcc519515d6ecb63890ac31054a44620540  src/server/media/hold.ts
- (c) `ls src/server/media/background.ts src/routes/api/listings/background.ts src/features/posting/background-dialog.tsx src/features/posting/photo-background.ts` → no such files.
- On ethio-prod with your query tool (SELECT only):
- (d) `select string_agg(feature, ',' order by feature) from public.ai_features where feature !~ '^e2e-';` → category_icons,category_images,name_check,photo_screen,translations,writing_helper
- (e) `select pg_get_constraintdef(oid) from pg_constraint where conname = 'ai_features_feature_check';` → paste it; it names the six features and the `^e2e-` pattern, and not `background_removal`.
- (f) `select max(version) from public.migration_marks;` → 20261014120000 (turn 10's mark; turn 11 had no migration).

THE CARRIER — B13T12-TURN-CARRIER-2026-10-14.md (95,592 bytes; sha256 7c148d4caae92ae768546e25313165eb5eb06063090fe0fc2ff09ecc24f88b9f; 66 sections)
- Its first line starts "B13T12 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 30 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  febc55c2a52106902b6cbc5542f93bfd7344669ddf3312a6d744fa0bc0fda61c  docs/_changelog.md
  8ce90a2054079267cf9c63a23874e5ab2e8e3526f7069a0a21f31f0ad2a9172a  docs/features/ai-services.md
  e75719f6ef722363386e722b3a4d9603bddbe68af6003e05bb386de2e3ccfdfb  docs/features/media-pipeline.md
  1594372021df7908affbba65e63826b99d65174d1a27a254c3c04bb9ac301107  docs/features/posting.md
  69fc3bed1c6b80adb1e5b79afa671f3f0165a951e10ab75d91129e1c957e2e47  docs/generated/i18n-usage.json
  099d73a102d54d1facb1ad88e68444e462fb26423649b9a9cd648fb4c6445045  docs/spec/legal/privacy-policy-v1.am.md
  36ab86b24753e2c72bf0d562a646ddbc322b723cbdfb0629697da655197de9da  docs/spec/legal/privacy-policy-v1.en.md
  672d722e3892908d13fefd24acc1e5650e467956da76d8f838882082ed5460b2  e2e/admin-services.spec.ts
  e01e3c905a1a331df1557cb672c2b1c62dbda53fb17ffce8f04d12d1c20e614c  e2e/photo-pipeline.spec.ts
  69fc3bed1c6b80adb1e5b79afa671f3f0165a951e10ab75d91129e1c957e2e47  public/i18n-usage.json
  3832aa09224a29acd735d4531770a36dea00d9eb450c633e71200c28f660d8d4  roadmap.md
  5b2001bc9003c65c6741f80d10d633dcaa9fdd6139139baea903a91120125a8c  src/features/admin-ai/ai-service.ts
  1b15616a75d5e03cf0e3f30cefa5635464c9446264fa4d4e189428c826b0ea96  src/features/posting/background-dialog.test.tsx
  2104a3811781614a702c0118d98f99e8f2be8b73c0b8a0731b9b513ec5d2b66c  src/features/posting/background-dialog.tsx
  05ea364266be9c9837e575bb08c93855394b8b8549c954a912e8376629c3382c  src/features/posting/photo-background.test.ts
  3f7ec410aa7f87b5040142f9e9b3d956c0edccd9b3f9c4b93888d0fe2b033477  src/features/posting/photo-background.ts
  e60b6879889930c7df0c0b6841117e660887e25b75f03d13dba64f142ea2579c  src/features/posting/posting-service.ts
  1a9089368685281718b1689a3815511fcd61fe2d23f11f4d1e5d669bb8411e1c  src/features/posting/refusal-text.ts
  a13eac02e8564281c627bcec44ad4fc01d38ead99bd64827f3257074006ef15d  src/features/posting/step-photos.tsx
  8edcb8acefcaa194ddd19c7f357abfc5e40dac3965765608adc19feb08234605  src/i18n/locales/am.ts
  f5b2b1891b17d0aefe6ad79d92590fbcb5ccd53f981c3b8b83481db448a79bcd  src/i18n/locales/en.ts
  a9ffca5951a8c5d5264d5aa9a0927ac9a3552aab960c479b6dd5546312f557c5  src/routeTree.gen.ts
  f7d3ce7725f8dbdfb436baa422783ce5a7f48fca8247f41a1f2ed17e4a3993e9  src/routes/api/listings/background.ts
  0eb7559c46594ebcc554c303ebffdaf6998027bf62792e7118b4ec6d858ea138  src/routes/api/upload/photo.ts
  6154bd71f703ccb6ee12918a7a405c1a9c6ccbf387200407fbb06c2a26ea1ce1  src/server/ai/meter.test.ts
  8de1c6fd7df2195fd697975d32047c26b8aa81a16934d34ad8db74169306d38c  src/server/ai/meter.ts
  b0c9b366404589f42d7fcaadf24b58fac5d4031b89ecfd185e4ac14bfa12076b  src/server/media/background-route.test.ts
  759bbb884cd90ca78dc80880b5b726423fa825e3ec78252192b883c01f13866d  src/server/media/background.test.ts
  bb2090314912995e68a68dad3aee6b22e9f21559fd8c087ae4b87ed818e1472c  src/server/media/background.ts
  d6cd402f601d0cc06de9083a8265d8c74fcca54dad7c27db1cb2546a9190a69f  src/server/media/hold.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t12.log` — 830 passed (144 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck and a build on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs PP-30, PP-31, SV-2, SV-4 and every other spec.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 21b65e956333b6744b695818aee5a2e75372fd65546af2293c91d1895adb27dd (2,578 bytes, 51 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261014121500_b13t12-check.sql (a stamp later than turn 10's mark and earlier than any mark you can choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261014120000 (the newest mark): if the reading gives 20261014120000 or less, use 20261014130000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select feature, enabled, unit, unit_cost_microusd, monthly_budget_cents, off_reason from public.ai_features where feature = 'background_removal';` → background_removal | t | call | 20000 | (null) | (null);
- `select string_agg(feature, ',' order by feature) from public.ai_features where feature !~ '^e2e-';` → background_removal,category_icons,category_images,name_check,photo_screen,translations,writing_helper;
- `select pg_get_constraintdef(oid) from pg_constraint where conname = 'ai_features_feature_check';` → paste it; it now names `background_removal`.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(f).
- The 30 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 30 carrier paths, the brief and the one migration file. `git ls-files src/server/media/background.ts src/server/media/background.test.ts src/server/media/background-route.test.ts src/routes/api/listings/background.ts src/features/posting/background-dialog.tsx src/features/posting/background-dialog.test.tsx src/features/posting/photo-background.ts src/features/posting/photo-background.test.ts`, so the new files are shown tracked (G20).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- The strings: each new key, its English and its Amharic, as written (G43).
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each warning that names `ai_features`, and the total count.
- Anything not foreseen.

THE SECRET (after the report): ask the operator, through your secret tool, for the secret PHOTOROOM_API_KEY — the Photoroom API key for the server; it never appears in chat or in a file. He may skip it: without it the tool answers "switched off", and nothing else in this turn depends on it. Do not commit anything for it.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging (the SQL editor) and read back its mark. CI's preflight waits for it (up to 25 minutes); if the run has already failed at the preflight, use "Re-run failed jobs".
2. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
3. Publish only when the supervisor says the newest commit is green and Lovable is idle.
4. Then the supervisor's walk.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 13 (photos), turn 12 (2026-10-14). Tier A. D155b / D159 — the cover photo's background, removed by Photoroom
-- (D156): background removal becomes an AI feature with its own switch, price and meter (D158).
-- e2e-areas: posting, admin-services
--
-- A. The feature's name joins `ai_features`' check: the six names of 20261013184636 and `background_removal`; scratch
--    `e2e-` rows as before. The constraint is dropped and added again under its own name, in one transaction.
-- B. Its row: on, a call at 20,000 millionths of a dollar ($0.02, Photoroom's listed price, read 2026-10-13), no budget
--    (the operator sets one in Admin › Services › AI). `admin_ai_features()` lists it; `ai_feature_gate` and
--    `ai_record_spend` answer for it as for the others. No function, table, grant or policy is created or changed.
-- C. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the row as written; the gate answers on; a
--    name outside the list is still refused by the check (inside a block that rolls itself back).

-- A
ALTER TABLE public.ai_features DROP CONSTRAINT ai_features_feature_check;
ALTER TABLE public.ai_features ADD CONSTRAINT ai_features_feature_check CHECK (
  feature IN ('photo_screen', 'writing_helper', 'name_check', 'category_images', 'category_icons', 'translations',
              'background_removal')
  OR feature ~ '^e2e-[a-z0-9-]{1,40}$');

-- B
INSERT INTO public.ai_features (feature, unit, unit_cost_microusd)
VALUES ('background_removal', 'call', 20000)
ON CONFLICT (feature) DO NOTHING;

-- C
DO $$
DECLARE
  v      public.ai_features%ROWTYPE;
  v_gate jsonb;
BEGIN
  SELECT * INTO v FROM public.ai_features WHERE feature = 'background_removal';
  IF NOT FOUND THEN RAISE EXCEPTION 'proof C1 failed: no background_removal row'; END IF;
  IF v.unit <> 'call' OR v.unit_cost_microusd <> 20000 OR NOT v.enabled OR v.off_reason IS NOT NULL
     OR v.monthly_budget_cents IS NOT NULL THEN
    RAISE EXCEPTION 'proof C1 failed: the row is %', row_to_json(v);
  END IF;

  v_gate := public.ai_feature_gate('background_removal');
  IF (v_gate->>'on')::boolean IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'proof C2 failed: the gate answered %', v_gate;
  END IF;

  BEGIN
    INSERT INTO public.ai_features (feature, unit_cost_microusd) VALUES ('background_removal_x', 1);
    RAISE EXCEPTION 'proof C3 failed: a name outside the list was accepted';
  EXCEPTION WHEN check_violation THEN
    NULL;
  END;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
