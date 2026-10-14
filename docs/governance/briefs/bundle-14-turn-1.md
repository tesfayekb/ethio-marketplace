# Bundle 14 — turn 1: the admin's page of one ad — the ad as buyers see it, photos in Edit, Screening's preview view-only (D169): brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 14 — TURN 1 (2026-10-14). ONE TURN, NO MIGRATION. 1 new string. No package change.
Base: dev d5217066 (the bundle-13 records turn). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: Admin › Listings' page of one ad and Screening's preview (admin panels: who may remove a photo, and where). Tier B: the E2E specs and helper, the unit test. Tier C: the docs, the usage maps, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Bundle 13 closed: the records turn landed byte for byte (dev d5217066) and its run is green — main = dev = d5217066. Your first split dropped each section's last line break, the platform committed that state twice mid-turn, and you restored and rewrote it: the final tree is exact. Keep checking every written file's sha256 against the table before you go on (this brief says so in HOW TO WORK).
- Turn 16 (117612fa) was green with nothing retried.
- This turn opens bundle 14.

WHY THIS TURN
- D169 (the operator, 2026-10-14, after his walk of bundle 13): "There should have been a view just like a seller views its preview including activity on the add. the remove button is more should be in edit panel for the admin rather than preview as buyer." His ruling: the admin's page of one ad shows the ad as the seller sees it, with its activity below; photo removal moves into the Edit panel; Screening's "Preview as buyer" becomes view-only, with a link to that page.
- INC-618's class (bundle 13 turn 16): the browser tests set the step-up code with `fill()` and never typed it, so a field that lost its focus after one character passed every test. A test now types the code by keyboard where a person does.

WHAT THIS TURN BUILDS
- src/features/admin-listings/listing-page.tsx: under the heading and its actions, a card "As buyers see it" (`listing-as-seen`) holds the ad drawn by the same `ListingDetail` the previews use (its photos and the category's facts load with the page); Details and History (the activity) follow. The page's "Preview as buyer" button and sheet are removed. Edit opens a panel (`listing-edit-panel`): the photos with their marks and Remove (`ListingPhotos`, unchanged), then the form. Outside Edit no Remove is shown.
- src/features/admin-screening/screening-page.tsx: the preview's photos are shown with their marks and without Remove; a link "Open the ad's page" (`admin-screening-open-listing`, for listings:view) opens /admin/listings/<id>. PhotoChanges loses its remove right.
- src/features/admin-screening/photo-changes.tsx: "Show photos" shows the photos view-only (the ad's title already links to its page); the `mayEnforce` prop is removed. Its test (photo-changes.test.tsx) follows: PCH-5 reads `data-may-remove="false"`.
- e2e/helpers/ui.ts: `stepUpIfPrompted(page, secret, { typed: true })` types the code key by key and reads the field back before submitting (the default stays `fill()`); `clearStepUpFreshness(page)` moves here from e2e/mfa-stepup.spec.ts, which now imports it (no behaviour change there).
- e2e/admin-listings.spec.ts: AL-17 and AL-18 read `listing-as-seen` in place of the sheet; AL-28 opens Edit, removes a photo there, and answers the second factor by keyboard after clearing the step-up stamp, then leaves Edit to read History.
- e2e/admin-screening.spec.ts: SC-20 finds no Remove in the preview, follows "Open the ad's page" and removes the photo in Edit there; SC-21 finds no Remove under Show photos.
- src/i18n/locales/en.ts and am.ts: the 1 string below; the usage maps; docs/features/admin-listings.md and admin-screening.md ("Bundle 14 turn 1"); the changelog; the roadmap (line 3 and the turn-1 line).

STRINGS (1 NEW)
- NEW `admin.screening.openListing`: "Open the ad's page" · «የማስታወቂያውን ገጽ ክፈት»

DECIDED BY THE OPERATOR (2026-10-14)
- D169, above.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- "Activity" is the page's History (every revision, staff and seller, with reason and note).
- The card's heading reuses the previews' own words, "As buyers see it".
- Screening's "Photo changes on live ads" follows D169 too: its "Show photos" is view-only; the change's ad title is the link to the page where Edit removes a photo.
- The photo marks (not checked by AI, may not fit the ad) are shown in Edit and in Screening's view-only photos; outside Edit the page shows the photos only in the ad's gallery.
- The key `admin.listings.detail.buyerView` stays in the catalogues, unused (removing a key is its own sync step).

TESTS
- No new test id. Edited: AL-17, AL-18, AL-28, SC-20, SC-21 (browser); PCH-5 (unit). 842 in all.
- The proof: AL-28 types the step-up code by keyboard and checks that the field kept all six digits before submitting.
- Reached without an edit (CI runs them): every admin-listings and admin-screening spec, every MF-* step-up spec (the helper moved, its body unchanged).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev d5217066 with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 842 unit tests (147 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test, a build, the bundle budget (JS 312.5 KiB of 320).
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-14-turn-1.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name the records turn's commit, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 16 carrier paths and the brief. No migration; no database read or write. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-14-turn-1.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 16 files → each equal to:
  f35bf478be86b65682ecd6bf04c60d735201dfb3f0574e4f28ad28e0cff46317  docs/_changelog.md
  56a3f7aaa029673d674ea229f8ace7bea899d0fa85f117378ee31a2e20f43f42  docs/features/admin-listings.md
  78216fd63ba62e908aa1842c7cb21233fed05a689c855afec9ebd358e8393af1  docs/features/admin-screening.md
  d7824e2d43054b217528438fbd07911107b922bd56a2e8cca809a01b36e9134c  docs/generated/i18n-usage.json
  d6f0ddb90757654f2a71451429dd21cf1925e7b2df2bd3a8076e865d2a2e2fd7  e2e/admin-listings.spec.ts
  ae9475f7474fab1f14dbcf86b5d02864d9d6bd71d0bf23e943fc4b3ccba63f91  e2e/admin-screening.spec.ts
  ee51bae0e0d717f16abd8c1328ad4a06450ecb8e399b138c9e2c0123be91efc6  e2e/helpers/ui.ts
  ee022d4575d785b5a75b64779ed8fbd8c1a969440fa14e198474e5f8a7f0b1d6  e2e/mfa-stepup.spec.ts
  d7824e2d43054b217528438fbd07911107b922bd56a2e8cca809a01b36e9134c  public/i18n-usage.json
  d8140ddeae21e285de25d4b161be212496df0c0c800a45bf4385490fa4937513  roadmap.md
  4dec8e7a7f157beb10ac33ce23af7e8b21f994f8176858cb1d0de68e8fe08697  src/features/admin-listings/listing-page.tsx
  4df92cc303b1c9d73cbe69629a09330f83c06faef8044fe3d217a60dbd22a666  src/features/admin-screening/photo-changes.test.tsx
  231a80a29874926378b01d479da748a781b3741408aaa8920432ad0f84a266c0  src/features/admin-screening/photo-changes.tsx
  6fdaaed9025a3c08dd097a9bab28bf1021ba324770238d741974ef78e70c39aa  src/features/admin-screening/screening-page.tsx
  3d56f2510f590270feaabcac18dce8776c4b72a74eb03824fd942e8d9304799a  src/i18n/locales/am.ts
  7eb3238e16887bb9fa54d9ed00d846fa05d6527c2091aa749dfbf737d9f51c8e  src/i18n/locales/en.ts
- (c) `grep -c "listing-as-seen\|admin-screening-open-listing" src/features/admin-listings/listing-page.tsx src/features/admin-screening/screening-page.tsx` → 0 and 0.

THE CARRIER — B14T1-TURN-CARRIER-2026-10-14.md (52,130 bytes; sha256 4a8b506ec4125a24dc93ffedc2191bbfd0308ab16536250b2a141982c9185a87; 59 sections)
- Its first line starts "B14T1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 16 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  33f2c39475f0f7acef84c06492a5df366c9150c4b825f066c368a90ddc30d083  docs/_changelog.md
  b394958ac7ea4c08cf13b55dceb306452f726aab97124048b7680d4c801b102f  docs/features/admin-listings.md
  3cf68a2fd4e0e4488ccb5cfb090f4b437d4e269be9120a6185ac01abe57f4ebe  docs/features/admin-screening.md
  6e91c95e73aca7490d9a51d988266716c4f5e378cbd99f0cbba9bcd8e96ca9b0  docs/generated/i18n-usage.json
  dd2e76d2908151d461b4755fd04a0033dfc7d6681395f9b5b1b16bb842cf8f99  e2e/admin-listings.spec.ts
  9e8fa342f5ffbdce16cf5afed4f748f366e97502ab15dc4abbc580ba430a0cf4  e2e/admin-screening.spec.ts
  ab717f2b3599cb712674b506e79cf4f4e8102754d27b841abf6d5ed9435716d4  e2e/helpers/ui.ts
  ec0c58a084518eb7acab1dd0a29ee39c32b3bd2cd539b88e46f2b4613af2f3e0  e2e/mfa-stepup.spec.ts
  6e91c95e73aca7490d9a51d988266716c4f5e378cbd99f0cbba9bcd8e96ca9b0  public/i18n-usage.json
  503d7f17649507537554c297429f771531fefc9fdd7ceb56782ee691556cfd1f  roadmap.md
  c81eae5dbab71eb1204d7023e5a0bc1a5a3b5c70af970071f75288c42c903ccd  src/features/admin-listings/listing-page.tsx
  3d8220d35bdf057067e9bee3b40abe8b64a4c3e11a4bed43ba55b7e74fa33735  src/features/admin-screening/photo-changes.test.tsx
  a2cd1f42e3b9a53bfc2cb549b4786a64a656b78358677f4f83fed537aad7048b  src/features/admin-screening/photo-changes.tsx
  ed3308344c75714386fefb106a9badc3a21936913fdbf3c28880b69a463a0b5b  src/features/admin-screening/screening-page.tsx
  2a11feec91aebe409f05723355b8af19848907109cc07aef45d6c6229824e0c2  src/i18n/locales/am.ts
  4bf0aa4608a7fa617dbb82b0e5351296222c7914e1a0ff21869e3854bed98d83  src/i18n/locales/en.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b14t1.log` — 842 passed (147 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran them on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 16 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 16 carrier paths and the brief, and no migration file.
- The checks.
- The strings: each new key, its English and its Amharic, as written (G43).
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
2. Publish only when the supervisor says the newest commit is green and Lovable is idle; then the supervisor's walk.
```
