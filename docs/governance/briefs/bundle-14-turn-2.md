# Bundle 14 — turn 2: CI's red on turn 1 (AL-28), the E2E window instruments, the countries console's dump; Edit in boxes with the category fixed, "Inappropriate photo" (INC-620, INC-621, INC-623, D171, D172): brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 14 — TURN 2 (2026-10-14). ONE TURN, NO MIGRATION. 2 changed strings, no new one. No package change.
Base: dev e84f2a01 (turn 1's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: Admin › Listings' Edit (an admin panel: what staff may change on a posted ad); the step-up window instrument in src/features/auth/mfa/mfa-service.ts (auth). Tier B: the E2E specs and helpers, the unit tests, the language provider's E2E snapshot. Tier C: the docs, the usage maps, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 1 landed byte for byte: dev e84f2a01 is the supervisor's copy plus the saved brief. The platform pushed your three commits once, as a merge, so CI made one run (38576830362).
- That run was red, and the cause is in the supervisor's brief, not in your work: AL-28 waited for a step-up modal that could not come (INC-620, fixed in this turn). The page itself works — SC-20 removed a photo through Edit and passed.
- PP-13 timed out on both attempts on mobile (shard 2) in the same run, while staging was slow (eight retried passes, all timeouts). It is INC-622, watched; nothing to do in this turn.
- DEC-181 (CI runs queue) has run its ten turns with no run cancelled while running and every report published: it is kept.
- The operator walked turn 1: Screening's preview is view-only, and on the ad's page Edit removed a photo with the second factor typed in full. His notes are D171 and D172 in this turn.

WHY THIS TURN
- INC-620 (CI on turn 1, run 38576830362): AL-28 failed in both projects and in the fast lane at "step-up-modal ... element(s) not found". Its second factor was asked after `clearStepUpFreshness`, which writes the local stamp `sb-<ref>-stepped-up-at`; nothing has read that stamp since INC-167 (freshness is read from the session token), and the session `useJobSuperAdmin` injects was verified moments before. The page itself worked: SC-20 removed a photo through Edit and passed.
- INC-621: DEC-018 says every test-only window instrument is gated on `isE2E` and leaves a production build. Two were not: `__ethioStepUp` (read in mfa-service.ts) and `__ethioPublicLanguages` (written in src/i18n/provider.tsx). The server's step-up window was never affected (law F3).
- INC-623: CO-5 passed on retry three times in seven days (2026-10-09, 10-12, 10-14) and CO-1 twice on 2026-10-14, each after 20 s without the countries console's search box; the failure said only "not found".
- D171 (the operator, 2026-10-14, his walk of turn 1): "the reason should have "inappropriate photo removed" as a reason" and "The edit menue or presentation may not be like what we designed the rest of the pages, please amke sure it works with our page designs so far, and responsive in different screens."
- D172 (the operator, 2026-10-14): "change category should not be an option on edit ... by user or admin on published add even waiting in que for approval ... Pictures, TITLE, DESCRIPTION, SPECIFICATIONS, PRICE CAN CHANGE." and "ITS BEST TO PUT TITLE AND DESCRIPTION IN OTS BOX, SPECIFICATION IN ITS BOX, PRICE IN ITS BOX SO WE HAVE VISUAL SEPARATION ON EDIT". This turn is the admin's screen; turn 3 makes the doors refuse a change of category.

WHAT THIS TURN BUILDS
- e2e/helpers/ui.ts: `clearStepUpFreshness` is removed. New `staleStepUpOnClient(page)` sets the E2E instrument `window.__ethioStepUp = { windowMs: 1 }` on the current document, so the next guarded action opens the modal (the server's window is untouched). New `afterTotpStep(spentStep)` polls the clock until the TOTP step after `spentStep` has begun, and grows the test's budget by that wait (at most one step): a factor accepts each code once. e2e/helpers/totp.ts: new `totpStep()`.
- e2e/admin-listings.spec.ts: AL-28 reads `totpStep()` as `useJobSuperAdmin` returns, calls `staleStepUpOnClient` before confirming the removal and `afterTotpStep` before typing the code. It also checks Edit's layout on both widths: no sideways scroll, the two photos on one row, the line under the Photos heading, and the save bar sticky at 360 and static at 1280. AL-22 is rewritten for D172 (see TESTS). `scratchSeller` also returns `leafSlug`.
- e2e/mfa-stepup.spec.ts: the import and the two calls of `clearStepUpFreshness` are removed (MF-2 and MF-7b sign in again before their guarded action, so their modal never depended on it), and its comment is corrected.
- src/features/auth/mfa/mfa-service.ts: `stepUpWindowMs()` reads the instrument only when `isE2E`. src/i18n/provider.tsx: the `__ethioPublicLanguages` snapshot is written only when `isE2E`. New src/lib/env-flags.test.ts: HOOK-1, the census of every window instrument the app code names; each file that holds one takes `isE2E`.
- e2e/helpers/countries.ts: new `awaitConsole(page)` waits for the search box as before; when it does not come, the failure carries `[country-dump]` lines (the address; which of `admin-section-countries`, `data-table-loading`, `data-table-error`, `step-up-modal` the page holds; the start of the main text). `awaitRoster` calls it, and so does CO-2 in e2e/admin-countries.spec.ts.
- src/features/admin-listings/edit-form.tsx (D172, D171): the category is shown in the Specifications box and never changed (the "Change category" button, the category tree and its Cancel are removed). The form is four boxes, each the console's `FormSection`, named as the seller's own steps: Title and description (`listing-edit-text`), Specifications (`listing-edit-specs-box`), Price (`listing-edit-price-box`), and Save changes (`listing-edit-save-box`: the reason and the note, the refusals, and Save and Cancel in its bar `listing-edit-save-box-actions`, sticky at the bottom below 768 px). The wrapper keeps `listing-edit-form`; every field's test id is kept. The sub-heading Category is an h4.
- src/features/admin-listings/edit-listing.ts: `EDIT_REASONS` loses `wrong_category` (it stays a reason of Send back). Its test LE-4 follows.
- src/features/admin-listings/listing-page.tsx: the Edit panel is headed "Edit this listing" (`listing-edit-heading`, h2).
- src/features/admin-listings/listing-photos.tsx: FormSection's heading (an h3); while Remove is offered, the dialog's own line under it (`listing-photos-hint`); two photos a row below 640 px; Remove is a bin icon (lucide `Trash2`) and the word. Its test file gets LP-6 and LP-7.
- src/features/admin-listings/photo-remove.ts: comment only.
- src/i18n/locales/en.ts and am.ts: the 2 changed strings below; the usage maps (regenerated); docs/features/admin-listings.md, step-up-auth.md, ci-guards.md and e2e-harness.md ("Bundle 14 turn 2"); the changelog; the roadmap (line 3, the turn-2 line, the turn-3 line and the My listings line).

STRINGS (2 CHANGED, 0 NEW)
- CHANGED `admin.listings.reason.photo`: "Inappropriate photo" · «ተገቢ ያልሆነ ፎቶ» (was "A photo" · «ፎቶ»)
- CHANGED `admin.listings.edit.hint`: "Change the title, the description, the specifications or the price above. The seller is told what you changed, with your reason and note." · «ከላይ አርዕስቱን፣ መግለጫውን፣ ዝርዝሮቹን ወይም ዋጋውን ይቀይሩ። የቀየሩት ነገር ከምክንያትዎና ከማስታወሻዎ ጋር ለሻጩ ይነገራል።» (was "Change the title, the description, the category, the specifications or the price. The seller is told what you changed, with your reason and note." · «አርዕስቱን፣ መግለጫውን፣ ምድቡን፣ ዝርዝሮቹን ወይም ዋጋውን ይቀይሩ። የቀየሩት ነገር ከምክንያትዎና ከማስታወሻዎ ጋር ለሻጩ ይነገራል።»)

DECIDED BY THE OPERATOR (2026-10-14)
- D171 and D172, above.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The reason keeps its code `photo`, so the door and every stored revision keep their meaning; only its words change, everywhere it is offered (Remove a photo, Remove and Send back an ad) and in History.
- The boxes are titled with the seller's own step names ("Title and description", "Specifications", "Price"); the last box is "Save changes", with the edit's line above the reason. No new string.
- With the category fixed, "Wrong category" is not an edit's reason; an ad in the wrong category is sent back to review with that reason (the page's own action).
- The Photos card stays first in Edit, above the four boxes; its line says that Remove acts at once, apart from Save.
- The doors still accept a category until turn 3 (one migration, each door redeclared from its live definition).

TESTS
- New: HOOK-1 (src/lib/env-flags.test.ts); LP-6, LP-7 (listing-photos.test.tsx). Edited: LE-4 (unit); AL-22, AL-28, CO-2 (browser); MF-2 and MF-7b lose a call that did nothing. 845 in all.
- AL-22 (rewritten, D172): the category shown in the Specifications box; no "Change category" and no category search; no Wrong category among the reasons; the heading; the four boxes in order, each headed with its step's name; no sideways scroll.
- The proof of INC-620: AL-28 green in both projects, its modal answered by keyboard. The red run before the fix is CI's run on turn 1. The proof of INC-621: HOOK-1, red on the base (the supervisor ran it there: "mfa-service.ts does not take the flag").
- Reached without an edit (CI runs them): every admin-listings, admin-screening, admin-countries and mfa-stepup spec.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev e84f2a01 with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 845 unit tests (148 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test, a production build, the bundle budget (JS 312.6 KiB of 320). In that build no code reads or writes a window instrument.
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-14-turn-2.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 1's commit with FAILURE: that red is this turn's to fix, and the supervisor has read it. Whatever it shows, go on: a fix it needs beyond this brief comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
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
- Scope — these files only: the 26 carrier paths and the brief. No migration; no database read or write. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-14-turn-2.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 25 files → each equal to:
  33f2c39475f0f7acef84c06492a5df366c9150c4b825f066c368a90ddc30d083  docs/_changelog.md
  b394958ac7ea4c08cf13b55dceb306452f726aab97124048b7680d4c801b102f  docs/features/admin-listings.md
  6c062ae5d743a5519c680db66cc57c2a1d494d5410697a66b984ac81371c7028  docs/features/ci-guards.md
  504e306aed3a07208c94dfab94a2098bf5a065421d491bceed87b87ed8938ed6  docs/features/e2e-harness.md
  8c5dd2adc7903cd11ee2477ddd6bf469227509ed5dfb84af9619a70b366b3708  docs/features/step-up-auth.md
  6e91c95e73aca7490d9a51d988266716c4f5e378cbd99f0cbba9bcd8e96ca9b0  docs/generated/i18n-usage.json
  c56d57a9605ab5d0ae36ec6514c66607bd6afdc375baa1da58d762c2f942b5c1  e2e/admin-countries.spec.ts
  dd2e76d2908151d461b4755fd04a0033dfc7d6681395f9b5b1b16bb842cf8f99  e2e/admin-listings.spec.ts
  eaa369da1707ac2a9251d3f69123f5077f1d6245377c524edfd35225f9503830  e2e/helpers/countries.ts
  ff4b209be6fedcb07877e70613ecd97589f0338a93ca26ce6d85f0c5c481f903  e2e/helpers/totp.ts
  ab717f2b3599cb712674b506e79cf4f4e8102754d27b841abf6d5ed9435716d4  e2e/helpers/ui.ts
  ec0c58a084518eb7acab1dd0a29ee39c32b3bd2cd539b88e46f2b4613af2f3e0  e2e/mfa-stepup.spec.ts
  6e91c95e73aca7490d9a51d988266716c4f5e378cbd99f0cbba9bcd8e96ca9b0  public/i18n-usage.json
  503d7f17649507537554c297429f771531fefc9fdd7ceb56782ee691556cfd1f  roadmap.md
  60dad80b83a7503bc609d5ddde8d9684e544155f65eab8babcdf820e8b386dd0  src/features/admin-listings/edit-form.tsx
  af8ebca42ccb7ce60c182d96590899a54569779f5a0245c06bf0f6dee0484d74  src/features/admin-listings/edit-listing.test.ts
  5fe19eaa0a5dc2890a87ff8b337b8a487920555df4300c36c5480fce5b1dd601  src/features/admin-listings/edit-listing.ts
  c81eae5dbab71eb1204d7023e5a0bc1a5a3b5c70af970071f75288c42c903ccd  src/features/admin-listings/listing-page.tsx
  27d52bf5e0998a634870d62be1fe22c3212688a992de894ced1adaa3a5887772  src/features/admin-listings/listing-photos.test.tsx
  267210a8f3c5d19e37aae54af3f70423d3a04b37dff5233ebbca38f208303f78  src/features/admin-listings/listing-photos.tsx
  1118ead97c48d5ec36212ee30e5f9549bf002926d0ea4c23537aa7bab7390ef8  src/features/admin-listings/photo-remove.ts
  db1e3810eceea908645bf9baa418551413d8e65eb199723a46c2a6f33b7644b2  src/features/auth/mfa/mfa-service.ts
  2a11feec91aebe409f05723355b8af19848907109cc07aef45d6c6229824e0c2  src/i18n/locales/am.ts
  4bf0aa4608a7fa617dbb82b0e5351296222c7914e1a0ff21869e3854bed98d83  src/i18n/locales/en.ts
  7c7823eef85a91aed7fce4adbc7984657eb67a56163300c8247da5ad370ace08  src/i18n/provider.tsx
- (c) `grep -c "clearStepUpFreshness" e2e/helpers/ui.ts e2e/mfa-stepup.spec.ts e2e/admin-listings.spec.ts` → 1, 4 and 2; `grep -c "isE2E" src/features/auth/mfa/mfa-service.ts src/i18n/provider.tsx` → 0 and 0; `ls src/lib/env-flags.test.ts` → no such file.

THE CARRIER — B14T2-TURN-CARRIER-2026-10-14.md (51,819 bytes; sha256 e8765a032f541a3b91d052748c1e5a80022f01feb45edea640a8695daa68c0dd; 102 sections)
- Its first line starts "B14T2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 26 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  7bf24de65b80b495a3c77751724972bdbcb3e1e1f6b3eac867044f72f04b7416  docs/_changelog.md
  631af11c38785a4c6bf6e59576d095051f068860f1fa34c343a469f04c097e8c  docs/features/admin-listings.md
  c5199a2e601f60bc94a43061712deea5398aa13d05fcc0c75d2101be65171380  docs/features/ci-guards.md
  bb404cd126fc5496f4d09f44fef10956dcd462e06dc890fda8f3017d533c2e54  docs/features/e2e-harness.md
  2fca36b3e34732222fb0688aa32ea5430dec186cdc0eff322b4e8ecc5024ee8f  docs/features/step-up-auth.md
  d8ccb42b62b5431effb47008027b2d7022880d3854f1bcd44d0593d0df316380  docs/generated/i18n-usage.json
  f7aff4d0580714c02f8aef8b9ea0029dfc6431af5824a825fa7dc0f3cf0b47e7  e2e/admin-countries.spec.ts
  1c6e40961c672850a301d7c281015534e0719eacf0891cf23ff541a5e4ce35a5  e2e/admin-listings.spec.ts
  11d433684c405086808c0c1f3f2386e53053c38b71eefff70139533ed5dfaf66  e2e/helpers/countries.ts
  e999be95d2223e9ef81dc102056097df53b0a546b4f97527c3563e52ba694181  e2e/helpers/totp.ts
  3df23e2189a514a56af19e250e61cffeb9d10a650d12c2d09504c0a6d0166221  e2e/helpers/ui.ts
  4d845fc41cb4d8154ac16ff2300484d038d3a597c3f542699087c68c8edd4fd1  e2e/mfa-stepup.spec.ts
  d8ccb42b62b5431effb47008027b2d7022880d3854f1bcd44d0593d0df316380  public/i18n-usage.json
  afc4979140f5911194b3a3c2bad95643bf12345f953980c41b1a103d4b2311b0  roadmap.md
  e9cb8f655d3e1f4710402dd02bcfdd9e0b6d7d0093ee8e83c620717c04e3e61f  src/features/admin-listings/edit-form.tsx
  075477db110b479e637da633c44c234655e9b2a6f8e327c39b4c3c013dc33de7  src/features/admin-listings/edit-listing.test.ts
  f203660d95bfc662f918f35cdf54ae3b40550b0bab2c273c494f56cd86637d8a  src/features/admin-listings/edit-listing.ts
  bcc9f65313ae0f0631d51b589165c607dcb094a633415842dc75cf64db7f9ebb  src/features/admin-listings/listing-page.tsx
  061c820cb9ffac9d8432207b12d4f54150e63b4a98686e8265d0345e759c898a  src/features/admin-listings/listing-photos.test.tsx
  34f44cac626d066424faee7f48dda6a7671be5cad294f8f68ff78fe68df40f8b  src/features/admin-listings/listing-photos.tsx
  6f59e72593d4790b2a4058016fe6108810c442a822f3a616e04b85bbfb894a79  src/features/admin-listings/photo-remove.ts
  5d2f06dcb3682e822d4ca137aa3fdb63ff011b11c7ea313ddba62bcad84ac835  src/features/auth/mfa/mfa-service.ts
  5555367c4294062ce15aee9967b92438e2f60e5ac98c0aa61950620bd9f6d627  src/i18n/locales/am.ts
  75becdf113e8e705fbd390e7ec4b9eb554322fe84b674581aacc37003202419f  src/i18n/locales/en.ts
  520cfc565f9f9a41ba2e68ed184b68476cc6670839c43d4176bff0e68182f91b  src/i18n/provider.tsx
  a018c9f340b186be6442f377038a339c84cec9b5d83b35c5829b87253234ae99  src/lib/env-flags.test.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b14t2.log` — 845 passed (148 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran them on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 26 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 26 carrier paths and the brief, and no migration file.
- The checks.
- The strings: each changed key, its English and its Amharic, as written (G43).
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
2. Publish only when the supervisor says the newest commit is green and Lovable is idle. Then, in Admin › Translations, press "Sync keys" (the changed words reach the live site). Then the supervisor's walk.
```
