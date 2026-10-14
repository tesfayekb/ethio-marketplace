# Bundle 13 — photos, turn 8: D154 B4 — staff remove a photo with a reason; DEC-181, CI runs queue: brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 13 — PHOTOS (D154–D164) — TURN 8 (2026-10-14). ONE TURN, NO MIGRATION. 7 new strings. No package change. One CI setting (PART 0).
Base: dev 1f28c90a (turn 7's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: admin panels — the listing's page (Admin › Listings) and Screening's Preview as buyer gain a photo's Remove, through the existing door `admin_edit_listing` (`remove_photos`, listings:enforce with a fresh second factor; the door does not change). Tier B: the CI setting (DEC-181; the workflow graph is a closed surface, G22, so its rule is frozen below), the tests, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 7 verified: dev 1f28c90a equals the supervisor's tree with the saved brief (sha256 033aa638…, equal). Its CI run (38505679902) failed outside the code: ethio-staging stopped answering — 182 tests could not create a pooled account, 45 sign-ins got 522 from the staging host, the rest got its error pages or found no row. No failure came from turn 7's code; its tests (PP-19, PP-23, PP-24, SC-18, SC-19 and the rest) are judged again on this turn's run, which runs the whole suite.
- From this turn on, CI runs queue (PART 0, DEC-181): the next turn starts as soon as you report, and a red is fixed first in the turn after.

WHY THIS TURN
- PART 0, DEC-181 (the operator, 2026-10-14: "How can we wait for >50 mins each time for each turn … There should be a much better way." He chose: queue CI, keep working). Today any push cancels the CI run in progress, so every turn waited 30–60 minutes for its run before the next could start. With `cancel-in-progress: false` a run that has started always finishes; GitHub keeps one run waiting and replaces it with each newer push's. The next turn starts as soon as this one reports; the supervisor reads each run as it lands, and a red is fixed first in the next turn.
- PART 1, D154 point 3 (the operator, 2026-10-13): "Staff can also remove a photo." The photo spec's B4: in the listings console and the screening page, every photo has Remove; it asks for a reason from a short list, plus a note; it goes through `admin_edit_listing` with `remove_photos` (the door exists), so it leaves a revision, an audit row and a notice to the seller. It closes the item D140 left open: "Removing a photo waits until the console shows photos" (docs/features/admin-listings.md). D141's Undo does not bring back a removed photo.

WHAT THIS TURN BUILDS
- PART 0 — .github/workflows/ci.yml: the concurrency group keeps its name, `cancel-in-progress: false`, and its comment says why (DEC-181). docs/features/ci-guards.md: the DEC-181 paragraph under "G18 — cancel superseded runs", with the rule frozen with it. Nothing else in the workflow changes; the promote job is unchanged (runs in one group never overlap, so they finish in order and main only moves forward).
- PART 1 — D154 B4:
  - src/features/admin-listings/photo-remove.ts (NEW) — `PHOTO_REASONS` = A photo, Misleading details, The site's rules, Other (the door's own list, those that fit a photo); `photoRemoveErrorKey` — "photo not found on this listing" reads "This photo is no longer on the ad.", every other refusal as the edit reads it.
  - src/features/admin-listings/listing-photos.tsx (NEW) — `ListingPhotos`: every stored photo as a thumbnail in the seller's order (a held one marked "Not checked by AI", D158); Remove under each, only when the page says the person may remove; Remove opens a dialog — the photo, a line saying what happens, the reason and the note (`ReasonNote`, required for Other), Cancel and Remove photo (red); the door through the page's second factor; its refusal in the dialog, which stays open; done, the listing and its photos are read again and the page gets its line. Not drawn for a listing with no photo.
  - src/features/admin-listings/listing-page.tsx — Photos above Details and History (not while Edit is open); Remove for `mayEdit` (listings:enforce, never the admin's own listing or a removed one); done, the page's line "Photo removed. The seller is told why."
  - src/features/admin-screening/screening-page.tsx — Preview as buyer: Photos with Remove (`admin-screening-photos`) above Approve and Reject, for a person who holds listings:enforce; Approve and Reject stay for listings:review only; done, the page's line.
  - The strings (below), the usage maps, the docs (admin-listings.md and admin-screening.md, "Bundle 13 turn 8"), the changelog and the roadmap (line 3 and the turn-8 line).

STRINGS
- NEW `admin.listings.photos.removeOne`: "Remove photo {index}" · «{index}ኛውን ፎቶ አስወግድ»
- NEW `admin.listings.photos.title`: "Remove this photo?" · «ይህ ፎቶ ይወገድ?»
- NEW `admin.listings.photos.hint`: "The photo leaves the ad at once. The seller is told the reason and your note. Undo does not bring a photo back." · «ፎቶው ወዲያውኑ ከማስታወቂያው ይወርዳል። ለሻጩ ምክንያቱና ማስታወሻዎ ይነገራል። መቀልበስ ፎቶን አይመልስም።»
- NEW `admin.listings.photos.confirm`: "Remove photo" · «ፎቶውን አስወግድ»
- NEW `admin.listings.photos.done`: "Photo removed. The seller is told why." · «ፎቶው ተወግዷል። ምክንያቱ ለሻጩ ይነገራል።»
- NEW `admin.listings.photos.refused`: "The photo was not removed: the ad no longer meets today's rules for {fields}. Edit those first." · «ፎቶው አልተወገደም፦ ማስታወቂያው ለ{fields} የአሁኑን ደንቦች አያሟላም። መጀመሪያ እነሱን ያስተካክሉ።»
- NEW `admin.listings.photos.error.gone`: "This photo is no longer on the ad." · «ይህ ፎቶ ከአሁን በኋላ በማስታወቂያው ላይ የለም።»
- The button under each photo reads the existing "Remove" (`admin.listings.action.remove`); its name for a screen reader is "Remove photo {index}".

DECIDED BY THE OPERATOR
- DEC-181 (2026-10-14): CI runs queue. The rule frozen with it: over the next ten turns, keep it if no run is cancelled while it runs and no turn waits for CI; go back to cancelling if a run is cancelled while it runs, or a completed run publishes no report.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The reasons for a photo are A photo, Misleading details, The site's rules and Other: "Contact details in the text" and "Wrong category" speak of the ad's words and its category. A phone number written on a photo is "A photo".
- One photo a time, each with its own reason (the door takes a list; one at a time keeps every notice about one photo).
- On the listing's page the Photos card sits above Details and History and is not drawn for a listing without a photo; in Screening it sits above Approve and Reject, for listings:enforce only, so a reviewer without that right sees the preview as before.
- The ids: LP-1..LP-5, AL-28, SC-20.

TESTS
- E2E, NEW: AL-28 (e2e/admin-listings.spec.ts, last) — an active scratch listing with two stripped photo rows; the super admin opens /admin/listings/<id>; Photos lists both in order; Remove on the second asks a reason first, then takes "A photo" and a note; the line says the photo is removed, one photo is left (the first), History's newest line names Photos with the reason and the note, the seller's notice is one row (fields `photos`, reason `photo`, the note), the listing stays active. SC-20 (e2e/admin-screening.spec.ts, last) — a scratch ad waiting for review with SC-18's two photo rows; Preview as buyer lists both with Remove; the first is removed with "A photo"; Screening's line says so; one photo is left; one notice to the seller; the ad still waits for review.
- Seeds name every column in every row (INC-614).
- Unit, NEW: LP-1, LP-2 (src/features/admin-listings/photo-remove.test.ts), LP-3..LP-5 (src/features/admin-listings/listing-photos.test.tsx — the order and the held mark, no Remove without the right; a reason first, a note for Other, that photo alone sent through the second factor; the door's refusal kept in the open dialog). 785 in all.
- Reached without an edit (CI runs them): the screening tests that use the preview's Approve and Reject (their test ids are unchanged), the listing-page tests (their seeds hold no photo row except AL-6, which uses the door, not the page), the action-label check (it reads the new buttons).
- Red first: AL-28 and SC-20 fail on the base (no Photos card). The unit tests prove new behaviour (no red run needed, G38).
- Leases: AL-28 a scratch seller and the super admin; SC-20 the same (two pooled accounts at most, DEC-174).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 1f28c90a with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 785 unit tests (135 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test, a build.
- Every AL-28 and SC-20 line traced to the code that answers it: `admin_edit_listing`'s gates (not a draft, not removed, not the admin's own; a listing waiting for review is edited), `remove_photos` (the row deleted, the revision's `photos_removed`, the fields `photos` in the notice), History's edit line (`GROUP_LABEL.photos`), the reason line, the page's notice, the photos query read again after the door.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-8.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 7's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
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
- Scope — these files only: the 18 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-8.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 14 files → each equal to:
  556b93e1bc2a670db0eaa2a7b5c634bd85344069dbd5b290af06de7084c809e0  .github/workflows/ci.yml
  ad2a2c0aefcc012a88bcf3594f03182905fd49aaeb00c0b0548e5ceedb75941a  docs/_changelog.md
  0c708c2b8f61b807510286c0e69c5811a8d2ff8135a742afd5dc773a5791ec6a  docs/features/admin-listings.md
  dc8a087356d6fd1132f3f9c41f62f9197a77e153e76c9627cebc1ce998bd5b58  docs/features/admin-screening.md
  2ef01406ed3e0a1215419302e53aad7b835a42f17c9d8192f1f5dfa2e5dda41d  docs/features/ci-guards.md
  26a6e320fb49e000940e0fdc9a09d86ae9b03b40887bbf17280a8118818357e2  docs/generated/i18n-usage.json
  15359236bfadc748cca926dc68a44fd1005967b91e80651be3cb858824df54bf  e2e/admin-listings.spec.ts
  d3836cbe56e7210ba3df7735f2735d957a905b29d08546761aae8496e56abe4f  e2e/admin-screening.spec.ts
  26a6e320fb49e000940e0fdc9a09d86ae9b03b40887bbf17280a8118818357e2  public/i18n-usage.json
  1da903d443908ffc1dcada7b7c290f0be6c1a8d92335d2dee7d42599051cb3b6  roadmap.md
  2edc29df45a6c24192baa9ca4d429cc6d35cb76c3f1d173b2984790640e10d18  src/features/admin-listings/listing-page.tsx
  0407bca78195c46b22070fc89560706c8370feb899e8e6d278338d66b8d6678c  src/features/admin-screening/screening-page.tsx
  541f9292091cb2f192c1747bdff319116329701a9f4fa6f96dff38c5c75e1545  src/i18n/locales/am.ts
  435d6b60433cdb9800354e4340744a190cdabfa3ae15cf7314beaaa91463aa4e  src/i18n/locales/en.ts
- (c) `ls src/features/admin-listings/listing-photos.tsx src/features/admin-listings/photo-remove.ts` → no such files.
- (d) On ethio-prod with your query tool (SELECT only): `select max(version) from public.migration_marks;` → 20261014100000 (turn 6's mark; this turn adds none).

THE CARRIER — B13T8-TURN-CARRIER-2026-10-14.md (60,258 bytes; sha256 6444e84573a72c5924082d345f0e22254b7539c2079ddfdd73d0c2bc73daa143; 247 sections)
- Its first line starts "B13T8 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 18 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  ce251eb08079966982fdd8f2e1776688d63f5ac271bd8c044bfab5ff645ee1a8  .github/workflows/ci.yml
  2bd84f0fd12a07efd8af41e7d62173ed409eb04edc106859a9e14df5cd5855b0  docs/_changelog.md
  61abcf79ee1ab67e9625bc13a847b3273ecab499023bf3e219bece3816b8f56c  docs/features/admin-listings.md
  0923f011e110d34a4567d9ad1e915eae4611826cd1dd80aa5539c01fb79ed1d2  docs/features/admin-screening.md
  6c062ae5d743a5519c680db66cc57c2a1d494d5410697a66b984ac81371c7028  docs/features/ci-guards.md
  f6d317967a4fe0525fa860685bc41e856fcee770ed3ed1b5887087c7758036b4  docs/generated/i18n-usage.json
  d6f0ddb90757654f2a71451429dd21cf1925e7b2df2bd3a8076e865d2a2e2fd7  e2e/admin-listings.spec.ts
  16b480560e8caf1c46ff06474b745c530d83e0a5920c04d2d09d0d1b1d7b57d0  e2e/admin-screening.spec.ts
  f6d317967a4fe0525fa860685bc41e856fcee770ed3ed1b5887087c7758036b4  public/i18n-usage.json
  33149f2ec17b5b063823a6a7dc27e419f6a34cdc909e29b8635596bbc0e28482  roadmap.md
  299f7f35a755bf8b1bcba740d5b7ee9a4f7b20c14dbac8abdc40ed92e396b917  src/features/admin-listings/listing-page.tsx
  27d52bf5e0998a634870d62be1fe22c3212688a992de894ced1adaa3a5887772  src/features/admin-listings/listing-photos.test.tsx
  6013d8116435e5d8bcd37b10b0c795ad23457b83c3979588b161ee4c0a85a365  src/features/admin-listings/listing-photos.tsx
  4cccd9a7c9c6f22b555adfefd275288f34f70344c0c2bf6132894d6b7b483566  src/features/admin-listings/photo-remove.test.ts
  1118ead97c48d5ec36212ee30e5f9549bf002926d0ea4c23537aa7bab7390ef8  src/features/admin-listings/photo-remove.ts
  e3d9843f5ae3fca313dfd13846bd865fd13b3264f744fde98c31882cee8fa69e  src/features/admin-screening/screening-page.tsx
  27c16a796cda7f5ea104f466fc21566a9c15fd71abc5a3338883608dc22379ae  src/i18n/locales/am.ts
  c1cb2decba7122e6f4f05744b03d497bec347ec6e45b38e024c406d1377e0be2  src/i18n/locales/en.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t8.log` — 785 passed (135 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck and a build on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs AL-28, SC-20 and every other spec.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 18 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 18 carrier paths and the brief, and no migration file. `git ls-files src/features/admin-listings/listing-photos.tsx src/features/admin-listings/listing-photos.test.tsx src/features/admin-listings/photo-remove.ts src/features/admin-listings/photo-remove.test.ts`, so the new files are shown tracked (G20).
- The checks.
- The strings: each new key, its English and its Amharic, as written (G43).
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
2. Publish only when the supervisor says the newest commit is green and Lovable is idle.
3. Then the supervisor's walk.
```
