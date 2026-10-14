# Bundle 13 — photos, turn 4: the red of turns 2–3 first — the draft's own address without a remount (INC-610) and three tests written without a run (INC-611); then the listing's photo gallery (D161): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 13 — PHOTOS (D154–D159) — TURN 4 (2026-10-13). ONE TURN, NO MIGRATION. Four new strings. No package change.
Base: dev 6181e584 (turn 3's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier B: the posting wizard's address change (src/features/posting/wizard.tsx and the new src/features/posting/quiet-address.ts), the tests PP-20, PP-21 and FR-6, the gallery (src/features/posting/preview/), the strings, the docs, the roadmap and the changelog. Nothing here touches the database, a door, a route or a permission.

ANSWERS TO THE LAST TURN
- Turn 3 verified: dev 6181e584 equals the supervisor's tree with the saved brief (sha256 646399bd…, equal) and the migration 20261013200740_0c18ec03 (byte-equal to the appendix apart from its mark 20261014090000). Its CI red is this turn's PARTS 0 and 0b (WHY THIS TURN), read by the supervisor from the evidence files.
- Turn 3's report (with its list of security warnings, chat only) reaches the supervisor through the operator; nothing in it is needed for this turn.

WHY THIS TURN — CI run 38460460625 on 6181e584 (turn 3's commit; turn 2's own run was cancelled by turn 3's push, so this is the first verdict on turn 2's code too): 194 failures in 108 tests. The supervisor read every failure body; three causes:
- INC-610 (183 of the bodies, in post-wizard-specs, -pricing, -place, -resets and -category; and PW-7, PW-87, PW-180): right after a category is chosen on /post, the save state goes "saving" → "idle" where it should read "saved". Turn 2 gave a new draft its own address with `window.history.replaceState(…, "/post/<id>")`. The router's history (@tanstack/history 1.162.4, node_modules/@tanstack/history/dist/esm/index.js, lines 333–342) replaces `window.history.pushState` and `window.history.replaceState` with its own functions, which tell the router of every call as a navigation. So the router matched the resume route (/post_/$listingId) and mounted a NEW wizard: the save state restarted, an invite's prefill (the search on /post) was gone, and every test that starts on /post failed. PP-19, which starts on /post/<id>, passed.
- INC-611, three tests written without a run (the local browser does not start, INC-506), each wrong on the code as built:
  - PP-20: after the reload, the draft (past its category only) opens at the specifications (`firstUnfinished`, src/features/posting/types.ts), and Back from there is the category, not the photos (the walk is 1, 3, 2, …), so the test waited 120 s on a disabled Back;
  - PP-21: `seedActiveListing` writes no publish time, and the feed indexes an active listing only when it has one (`feed_index_refresh`), so the card was never in the feed ("the feed did not name the card's cover");
  - FR-6: it lists the feed card's keys exactly, and turn 3 added `coverPhotoId`.

WHAT THIS TURN BUILDS
- PART 0 — INC-610:
  - src/features/posting/quiet-address.ts (NEW) — `replaceAddressQuietly(path)` calls the browser's own `History.prototype.replaceState` with the entry's current state. The router's replacement is an own property of `window.history`; the prototype's method is the browser's and tells no one. The router reads the new address on the next Back, Forward or reload;
  - src/features/posting/wizard.tsx — the INC-604 effect calls `replaceAddressQuietly(own)` (one import, the call, two comment lines);
  - src/features/posting/quiet-address.test.ts (NEW) — QA-1.
- PART 0b — INC-611:
  - e2e/photo-pipeline.spec.ts, PP-20 — after the reload: the specifications are shown; Next reaches the photos, where the stored photo is;
  - e2e/photo-pipeline.spec.ts, PP-21 — seeds its own active listing as the feed-screen specs do: a publish time a minute ago and an Ethiopian scratch city (`seedScratchChain("ET")`; its region is pushed to a new `regions` list that the afterEach removes with `destroyLocation`, after the listings). The import of `seedActiveListing` goes; `destroyLocation`, `rand`, `RUN` and `seedScratchChain` come from ./helpers/locations;
  - e2e/feed-route.spec.ts, FR-6 — "coverPhotoId" joins the list of the card's keys.
- PART 1 — D161, the listing's photo gallery (the operator, 2026-10-13: "the main photo in regular size and on the side small of the rest just like in amazon … clicking those opens bigger image on that panel"; his answers: on a phone a swipe and a row of thumbnails; a full-screen view with pinch zoom; in the preview pages now):
  - src/features/posting/preview/photo-gallery.tsx (NEW) — `PhotoGallery`: the photo shown at the card size (`srcSet` 480w card / 1600w cover), a counter "n / total", arrows disabled at the ends, a thumbnail of every photo at the thumb size (the one shown `aria-current`) — in a column on the photo's left when the gallery is 32rem wide or more, in a row under it otherwise; a sideways move of 40 px or more is a swipe (it moves one photo and opens nothing); a tap opens the full-screen viewer (portalled to the body, above the preview sheet): the cover size, its counter, arrows and thumbnails, the arrow keys, a double click doubling the size (a zoomed photo is not swiped away), the phone's own pinch zoom, and Close or Escape. The viewer's keys are captured on the document and stopped there, so one Escape closes the viewer and leaves the preview open. The photo button is named by what it does and described by the photo's place (`aria-describedby` to a line outside the button). One photo: no counter, arrows or thumbnails;
  - src/features/posting/photo-links.ts — `GalleryPhoto` and `galleryPhotos(rows, links)`: each photo's card, cover and thumb links, every one through `photoUrl` (https only); a photo with none is left out;
  - src/features/posting/preview/listing-detail.tsx — draws `<PhotoGallery photos={galleryPhotos(view.photos, links)} />` in place of the column of equal photos;
  - src/components/layout/layers.ts — `Z_VIEWER` ("z-[60]"), above the sheet;
  - src/features/posting/preview/photo-gallery.test.tsx (NEW) — GAL-1..GAL-4; src/features/posting/photo-links.test.ts — PU-4; e2e/photo-pipeline.spec.ts — PP-22;
  - the strings (below), the usage maps, docs/features/posting.md (the INC-604 line gains INC-610; THE GALLERY; the layer order), docs/features/media-pipeline.md (a turn-4 section), the changelog and the roadmap (line 3 and the turn-4 line).

STRINGS
- NEW `post.gallery.enlarge`: "Open the photo full screen" · «ፎቶውን በሙሉ ገጽ ክፈት»
- NEW `post.gallery.previous`: "Previous photo" · «ቀዳሚው ፎቶ»
- NEW `post.gallery.next`: "Next photo" · «የሚቀጥለው ፎቶ»
- NEW `post.gallery.show`: "Show photo {index}" · «{index}ኛውን ፎቶ አሳይ»

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- INC-610: the address is changed with the browser's own method, which the router does not hear. The draft keeps /post/<id> for a reload, Back and Forward, and the wizard is never mounted twice.
- INC-611: PP-21 seeds its listing as the feed-screen specs do; the shared helper `seedActiveListing` is not changed (its other callers keep their rows).
- D161: the gallery's breakpoint is the gallery's own width (32rem), so it follows the sheet, not the screen. Thumbnails are the thumb size; the cover is drawn only on a dense screen or in the viewer. The viewer sits above the sheet (`z-[60]`).
- The new ids: QA-1, GAL-1..GAL-4, PU-4, PP-22.

TESTS
- E2E, first the red:
  - PP-20 (edited, its last steps only) and PP-21 (edited, its seed only); FR-6 (edited, one key);
  - every test that failed with "post-save-state" "idle", and PW-7, PW-87 and PW-180, are expected green with INC-610 — they are not edited. Any of them still red is read again by the supervisor.
- E2E, D161: PP-22 (NEW, e2e/photo-pipeline.spec.ts, last): a draft with three photos opens on review; the preview's gallery shows "1 / 3", the cover's card link (and its cover link in `srcset`), three thumbnails with their thumb links, the first `aria-current`; the thumbnails sit under the photo on a phone and to its left on a computer (boxes measured); a thumbnail shows its photo, the arrows step and stop at the ends; a mouse drag to the left moves one photo and opens nothing; a click opens the viewer at the cover size; its arrow steps; Escape closes the viewer and the preview stays; a second Escape closes the preview.
- Not edited: every other test.
- Unit: QA-1, GAL-1..GAL-4, PU-4 (NEW); 762 in all.
- Red first: the INC-611 tests and the INC-610 class are red in CI run 38460460625. QA-1 fails with the router's method (the supervisor ran it: the address stays /post). GAL-4 fails with a window listener (the sheet's own Escape fires; the supervisor ran it). PP-22, GAL-1..GAL-3 and PU-4 prove new behaviour (no red run needed, G38).
- Leases: PP-22 leases one seller; PP-21 as before.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 6181e584 with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 762 unit tests (129 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test.
- Every new or edited E2E line traced to the code that answers it (INC-611's lesson): the review step at `draft_step` 7, the photo links' keys, the gallery's width at 360 and 1280, the drag clear of the arrows, the Escape capture, the feed's index, the step order.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-4.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It names turn 3's commit with FAILURE: that red is what PARTS 0 and 0b fix, as read by the supervisor; go on. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration: write no file under supabase/migrations and use no database tool this turn, apart from the census's one read.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 19 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-4.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 15 files → each equal to:
  514c10c3292c55fdb57cc2d9c27efb5543b0479f79222fdd07d3d19908aa208a  docs/_changelog.md
  f982c432adc4bcfa4bf9f44595d31e2500ed17b43bd909f9b7907dd4787b94f9  docs/features/media-pipeline.md
  1cdcca08d153b4451c504efe5f05bb271460526263628e377d7a031754327e35  docs/features/posting.md
  5571f41884000d8ec7a8714d15d792ec881c5e5e925efdb90a36d82b591bb2cb  docs/generated/i18n-usage.json
  7177bbaeebc5043b6ebf731f57fc3acb0ae039d170dac6b53a2189e33b76ce55  e2e/feed-route.spec.ts
  043a50b6124ba32310c2b949a2b42a82d09af169e4f31ec74c9093e96ec6054c  e2e/photo-pipeline.spec.ts
  5571f41884000d8ec7a8714d15d792ec881c5e5e925efdb90a36d82b591bb2cb  public/i18n-usage.json
  a059c3d05b402923730b1388cf7dcb9cf99008c58b7f2d350613d224c93f098d  roadmap.md
  8dad1c7b71bb4e5fa5bd7d2bc675a917af3d32e0e64dc78c1c671780ad91bc98  src/components/layout/layers.ts
  08b9625a1844d2b520c0ec1a088037d766b864a4e5c78d470f262842ac0aba11  src/features/posting/photo-links.test.ts
  aff2a83a9d62fc61a0e485267bf2b15d7801ce2e5f9b29eab4891fc8672fdaae  src/features/posting/photo-links.ts
  83b898a5325bec4cdc7013b380fae1322b1bd3b89d33b7c31ca3a65d634ba6df  src/features/posting/preview/listing-detail.tsx
  38c6933740ca6b712db3e5989e6c7e3c684787de0b86b4ebdec177e43b55d2e3  src/features/posting/wizard.tsx
  541af8e8e81a614bb64926d4a7450f4feefd220ed0a422357dde715c5192a117  src/i18n/locales/am.ts
  ee12382e08c15f1c55d6bec7d76416a6a4af76c31c48e37e19817f13910f5322  src/i18n/locales/en.ts
- (c) `ls src/features/posting/quiet-address.ts src/features/posting/preview/photo-gallery.tsx` → no such files.
- (d) On ethio-prod with your query tool (SELECT only): `select max(version) from public.migration_marks;` → 20261014090000 (turn 3's mark; this turn adds none).

THE CARRIER — B13T4-TURN-CARRIER-2026-10-13.md (44,681 bytes; sha256 768d5a0ca35d75fb685741a1c841e7fed3df0336d513c59cc72353ade6529985; 39 sections)
- Its first line starts "B13T4 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 19 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  ad6ef2d775dd74429a1036fac48895b3abdf23e7bbc4f430b131788fa34aa6f9  docs/_changelog.md
  fba9cab130f5a6c884170bfbe8ea8669d25990d91394f0d619464616ddbeeaef  docs/features/media-pipeline.md
  061f9959fa19cfd7cf48d5578876a54ac130dad6332cc833b8d4485fb2669c72  docs/features/posting.md
  f8945b67c5a403f71763ccc2838a328f1a8380f7c79c225aed4968a8b7045c21  docs/generated/i18n-usage.json
  57fbf17b701a2ef9af6a51cc4980d100aa7c3e0be171c3684d7aa2c9f81879c3  e2e/feed-route.spec.ts
  161bf3981c045367e0de921aa0f2171b0d4f831d2a93db59923c7df126f1af0e  e2e/photo-pipeline.spec.ts
  f8945b67c5a403f71763ccc2838a328f1a8380f7c79c225aed4968a8b7045c21  public/i18n-usage.json
  9bb05d6471df00c94c2c839a4a61a8e78c07564461e20a4fcd3c10cfb1066e72  roadmap.md
  16a31b1e5e3d4e5296b15f47903b20308fce1aacd1f7a2827b9f726348f52f8d  src/components/layout/layers.ts
  c55b27622695189e92a9f3e7c7f82d66fa8d2b1308739629d023e97ae7890645  src/features/posting/photo-links.test.ts
  b6be8c25423d7e0b1e2e777a464fa7edcfc108468e86426ee2d0c064b1a08071  src/features/posting/photo-links.ts
  f994d2b910d263ead411852e9b732e228ba5d64c8f2f346a9f914e0964347c94  src/features/posting/preview/listing-detail.tsx
  de91a1ed051fab4c4bbbb1422304da00b258709cd61ac05ce730d49bbf3573e8  src/features/posting/preview/photo-gallery.test.tsx
  cc29907fb556d6900b7cefe0ddf33ee3a92efd7aebc3051b05592dc9c6e63e04  src/features/posting/preview/photo-gallery.tsx
  77136caf54cbefc0d6e742ca63d1b0ae959603a0e944b777ef758758617fe0d6  src/features/posting/quiet-address.test.ts
  75c423f35736c13262c421ad15c617a6d1655fa7692a0be0865a4becda33fb55  src/features/posting/quiet-address.ts
  a64074c7e296aafca7cfe94bae7b8a9223369292ec156f312847a25a4c771d52  src/features/posting/wizard.tsx
  1b173d8c4403f8f495f8b39d941facbef291b4110995e26b78cd731c55c59ac5  src/i18n/locales/am.ts
  40f523d827c5b8b4bc75351b4fd33a69a09872b13ffc47f34141d0107b952615  src/i18n/locales/en.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t4.log` — 762 passed (129 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs PP-20, PP-21, PP-22, FR-6 and every other spec.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 19 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 19 carrier paths and the brief, and no migration file. `git ls-files src/features/posting/quiet-address.ts src/features/posting/quiet-address.test.ts src/features/posting/preview/photo-gallery.tsx src/features/posting/preview/photo-gallery.test.tsx`, so the new files are shown tracked (G20).
- The checks.
- The strings: each new key, its English and its Amharic, as written (G43).
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Send Lovable nothing for about 25 minutes, so CI on the final commit runs to the end; the supervisor reads it.
2. Publish once CI is green on the final commit.
3. In Admin › Translations press "Sync keys", enter the code it asks for, and paste its message to the supervisor (turn 2's INC-603 and INC-607).
4. Then the supervisor's one walk: turn 2's photo fixes, the card's photo signed out, Other under Series and Model, and the gallery.
```
