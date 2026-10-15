# Bundle 16 — turn E3: Edit inside Screening's preview: brief, version 1 (saved unchanged, 2026-10-15)

```text
BUNDLE 16 — TURN E3 (2026-10-15). ONE TURN: SCREENS, ONE UNIT TEST, ONE NEW TEST WRITTEN BY YOU, DOCS. No migration. No strings. No package change.
Base: dev f0aed960 (turn E2b). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the reviewer's edit inside the preview (staff writes through `admin_edit_listing` with the second factor). Tier B: the screens and the test. Tier C: the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn E2b is verified on dev f0aed960 ("Completed turn E2b for B16"; the platform's own commit after your 832587f9): the 16 carrier paths and the brief equal the supervisor's copy byte for byte; MLA-13's new order check and locator, the three copied phone helpers, TRUTH's `directions` and MLA-15 are as reported and typecheck clean. Your three departures are ACCEPTED: the add-region path (the brief's `post-where-add-city` line was the supervisor's wrong anchor — a city in another region needs a region row first; logged as the supervisor's slip), afterEach for the second chain (the file's own convention), and the TRUTH column. The blanked-then-rebuilt APPEND files (2ffb4482, 16de0720) landed equal to the table: nothing to fix; the lesson — read before open-for-write — is yours and is noted. CI on f0aed960 is the supervisor's read (run #949).
- The operator publishes E2a+E2b together once that run is green; nothing in this turn waits for it.

WHY THIS TURN — D188 (the operator, 2026-10-15)
- "A page in the approval queue needs to be able to be edited by admin. That is actually where the major edits happen when admin approves it. Please have the edit as admin be available easily inside preview as buyer, then we can click edit and edit, and after edit we can approve or reject."
- Today the preview links to the ad's own page ("Open the ad's page"), where Edit exists (listings:enforce, any ad but a removed one or one's own). This turn puts the same Edit inside the preview.

WHAT THIS TURN BUILDS (the carrier)
- src/features/admin-screening/screening-page.tsx — Edit (`admin-screening-preview-edit`, listings:enforce) in the preview's footer beside "Open the ad's page". It puts the reviewer's edit boxes in the listing's place inside the sheet (`admin-screening-edit-panel`, heading `admin-screening-edit-heading`): the ad's photos with their marks and Remove (`ListingPhotos`), then the same form as the ad's own page (`ListingEditForm` — title and description, specifications, price, the reason and the note, Save and Cancel) through `editAdminListing` under the page's step-up guard. Save: the queue is read again, the preview follows its ad's fresh read (by `updated_at`) and shows the ad as it now stands with the saved line (`admin-screening-edit-done`: "Saved. The seller is told what changed: …") and Approve, Reject and Edit at hand again. A refusal lands under its field and the boxes stay open; a cancelled second factor leaves them as they were; Cancel returns to the ad as buyers see it. Approve and Reject are not offered while the boxes are open. Edit is disabled while the queue is re-reading (INC-558's rule: the form opens on a fresh read).
- src/features/admin-screening/use-screening.ts — the queue row carries `countryCode`, the place's `locations.country_code` (the join gains the column), so a price with no money opens on the ad's own market in the boxes.
- src/features/posting/preview/preview-sheet.tsx — an optional `body`: what the sheet shows in the listing's place; absent, the listing as buyers see it (every other caller passes nothing and is unchanged).
- The unit test SF-4 (use-screening.test.ts: the mocked read answers rows; `countryCode` read from the place; the select names the column), the docs (admin-screening.md: the turn's section), the roadmap and the changelog. No new strings: the preview's Edit uses the words the ad's page already has ("Edit", "Edit this listing", the saved line), so the usage maps change and you regenerate them.
- THE TEST (below): you write SC-25.

DECIDED BY THE OPERATOR (D188)
- Edit inside the preview; approve or reject after the edit.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The preview's Edit is the ad's page's Edit, boxes, reason, door and second factor alike — nothing is decided twice. The door's rules stand: never one's own ad, never a removed one.
- Remove on a photo stays inside Edit (D169), which is now inside the preview too; the preview itself stays view-only until Edit is pressed.
- Approve and Reject are hidden while the boxes are open, so a decision is never taken on an unsaved edit.

THE TEST — you write it this turn, from the description below (Tier B).
General rules:
- SC-25 goes in e2e/admin-screening.spec.ts's own `test.describe`, after SC-24, titled exactly as below; reuse the file's own helpers (`seedWaiting`, `useJobSuperAdmin`, `stepUpIfPrompted`, `findRow`, `rowMenu`, `listingTruth` or the file's own truth read, the reaping). At most two leased accounts per test (DEC-174).
- Every row a test makes is its own and is removed in its `finally` (J3, G27). No real row is changed.
- G38: no assertion loosened, no timeout raised, no retry added, no dial raised.

SC-25 "SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188)" (e2e/admin-screening.spec.ts)
- `seedWaiting()` → the ad. The job super admin (`useJobSuperAdmin`, keep its `secret`); `findRow`, `rowMenu(page, ad.id, "open")`; the sheet `post-preview-sheet` is visible.
- `admin-screening-preview-edit` is visible in `post-preview-footer`; click it. `admin-screening-edit-panel` is visible inside the sheet; `admin-screening-preview-approve` and `admin-screening-preview-reject` have count 0; `listing-detail-title` has count 0 (the listing's place is taken by the boxes).
- Inside `listing-edit-form`: fill `listing-edit-title` with a new title (`Corrected ${token()}` or the file's own way of making one); click `listing-edit-save` → `listing-edit-problem` has text en["admin.listings.move.pickReason"] (a reason first, as AL-23 proves on the ad's page); click `listing-edit-reason-misleading`; fill `listing-edit-note` with a note; click `listing-edit-save`; `stepUpIfPrompted(page, secret)`.
- Then: `admin-screening-edit-done` has text en["admin.listings.edit.done"] with "{fields}" replaced by en["admin.listings.col.title"]; `admin-screening-edit-panel` has count 0; `listing-detail-title` inside the sheet has the new title; through the service client the ad's `title` is the new title and its `status` still "screening".
- Click `admin-screening-preview-approve`; the sheet is gone; `admin-screening-confirm` is visible; `admin-screening-confirm-go`; `stepUpIfPrompted` if the file's approve flow needs it (SC-14 and the approve tests show the flow); `admin-screening-notice` has text en["admin.screening.approved"]; through the service client `status` "active" and `title` the new title.
- `finally`: the file's own reaping.

After writing it: `node_modules/.bin/prettier --write e2e/admin-screening.spec.ts`. No other test is edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev f0aed960 with this turn's carrier files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 908 unit tests (156 files), the usage maps regenerated (they match), the hardcoded-strings guard (0 findings), the build and the bundle budget (JS 315.7 / 320 KiB).
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-e3.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts or src/integrations/supabase/types.ts since turn E2b, name the difference and go on (neither is in this turn's carrier);
  4. the carrier, then `bun run i18n:usage`, then the hashes;
  5. THE TEST;
  6. the checks;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 9 paths of the hash table, the brief and e2e/admin-screening.spec.ts. The database: none (no migration; SELECT only if you need to look). Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-e3.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 9 files → each equal to:
  2a7ba3c39380c731ed68fc8e25acc8112c20650eb9d2bd6637813073f7177038  docs/_changelog.md
  d6a1e6f65bafa11648759e877091edd84b018a5d43bf41702bfba8334002bed0  docs/features/admin-screening.md
  f73120684396ed6c34ecf89ec4a4539081dec76e24648b211764b02161f50684  docs/generated/i18n-usage.json
  f73120684396ed6c34ecf89ec4a4539081dec76e24648b211764b02161f50684  public/i18n-usage.json
  d5a87d2b3a7e34c0157432466453421f4f2061f4885da4c742f09042b1118bdb  roadmap.md
  2659605e8f45b6945d50e6a4ae5d7078f69ad46875a639c2c25c95755ff9e103  src/features/admin-screening/screening-page.tsx
  fd6e1a3bb359c113f4099989580b46123154b7fe7d82625dc34e4282e8e4ae32  src/features/admin-screening/use-screening.test.ts
  f42ccdf6ee86a0b571f0f19e82a080b0fa8d09412038b8b562209efbd9fbda32  src/features/admin-screening/use-screening.ts
  31085f3bc647e423aaf69d946b155614077a2c05e2c24ec0bb4f2c0948996916  src/features/posting/preview/preview-sheet.tsx
- (c) `sha256sum e2e/admin-screening.spec.ts` → 4a50285b6b59f50a63ec58d1f498e5c0e82e6206685ba0a313a1fa3aa0d7933d (as turn 4b left it); `ls supabase/migrations | tail -1` → 20261015130915_999a293e-b101-44fe-8262-c65d53b38d01.sql (turn E2a's; no migration this turn).

THE CARRIER — B16E3-TURN-CARRIER-2026-10-15.md (17,655 bytes; sha256 b6a042b9290db5f8ce87e90a2b3d5b7c01658a8ef3ea5c83fd5ba9483a8bb994; 25 sections)
- Its first line starts "B16E3 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.
- The two usage maps are not in the carrier: after the carrier, run `bun run i18n:usage`; it writes them from the tree, and their hashes are in the table.

THE HASHES — `sha256sum` each of the 9 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  f77be7b9c2c5fee362d1f53f8c7e8713922489dad76ed0395e52a2c053162f40  docs/_changelog.md
  3cd7266f8736ac206a8361758fb22e22fefde59e76727ea5d6e9295fa5bcee7e  docs/features/admin-screening.md
  b9e64eafc8db6e45c0957ee3ec7b1f99caab69d9300923047f0a7ea2e1a2a6d8  docs/generated/i18n-usage.json
  b9e64eafc8db6e45c0957ee3ec7b1f99caab69d9300923047f0a7ea2e1a2a6d8  public/i18n-usage.json
  69c1918ef54297170639e38ebe1dc5220a37ac08a194a946cee6ab6cb2d7c596  roadmap.md
  4fe094aade109ee463e22298d4b840f6665d731d201864e2bb284a4aca922db2  src/features/admin-screening/screening-page.tsx
  8ff127cfc0ae7d557f21283596c1e92b559f3d9f0b5ccc1179336cb7f5f72aa1  src/features/admin-screening/use-screening.test.ts
  7cc906c2c6f9b4f06b90dae36bee6c27cd7c4820569f2bcdb4a4b3f9ae8a9e6e  src/features/admin-screening/use-screening.ts
  9e2ca597678bc8049a95710de06819b39d78da3cf7047fe0f5a6c7e71fecccfd  src/features/posting/preview/preview-sheet.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings — a warning in your test is fixed, not left;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16e3.log` — 908 passed (156 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `grep -n 'test("SC-25' e2e/admin-screening.spec.ts` → one line;
- Not run by you: the typecheck, the build, the bundle budget and the browser tests. CI judges them.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, yours included.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 9 sha256sum lines and the brief's; the sha256sum and line count of e2e/admin-screening.spec.ts, and `git diff <START> -- e2e/`.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 9 paths, the brief and the one test file.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
2. Publish when the supervisor says the newest commit is green and Lovable is idle. No Sync keys this turn (no new words).
3. The walk the supervisor sends after Publish (two lines: Edit in the preview, Approve after the edit) — together with E2b's five.
```
