# Bundle 17 — turn 3: Approve and Reject on the Edit's Review; the ad page's done line fades (D188, D192): brief, version 1 (saved unchanged, 2026-10-16)

```text
BUNDLE 17 — TURN 3 (2026-10-16). ONE TURN: TWO SMALL CHANGES BY CARRIER, ONE BROWSER TEST OF YOURS. No migration. No new string (the queue's own words are reused). No package change. No file deleted.
Base: dev a4bd00b2 (bundle 17 turn 2). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the decision on the Edit's Review (the step-up gate, `transition_listing`). Tier C: the ad page's notice.

ANSWERS TO THE LAST TURN
- Turn 2 is verified on dev a4bd00b2 ("Applied carrier and rewrote tests"; the platform's 7fa54687 and 7bfd98ef before it): the 34 carrier paths equal the supervisor's copy byte for byte (the two usage maps included), edit-form.tsx is gone, the brief (a009b55a…) is saved; the SO-9 fix is as asked and accepted; the five rewrites were read whole. Three of them need a correction, made FIRST in this turn (the block below): MLA-13 (its refusal part runs on an ad the previous part sent to review — the edit door refuses an ad in review before it judges any field, 20261015130915 :50–51, so no field refusal can come), AL-21 (`post-edit-notice` is always on the page; its "no notice" is `data-shown="false"`, never a count of 0) and MLA-15's INC-659 part (the seeded ad holds no pin, so the map had nothing to leave; and it runs after the ad went to review, when the pin door refuses `screening`). Run 957 (turn 1, d7f8833b) was RED with 36 gating failures: 30 of one class — "sign-in form did not render on /auth" across every shard, with Cloudflare 502 pages from staging on the service client's seeding and on the server's categories read — a staging window (the class of INC-318), five of them passing on retry, no code finding; the other reds were SO-9 (the ids, fixed in turn 2), and the rest of that class. Run 958 (turn 2, a4bd00b2) is the supervisor's read; its reds, if any beyond the three above, come in the next ruling.

FIRST — THREE TEST CORRECTIONS (before the carrier, after the census; by hand):
1. e2e/my-listings-ad.spec.ts, MLA-13: the third part (the title cleared → the `required` refusal; then INC-660's clearing) runs on a SECOND active ad Y of the same seller (seed it as X is seeded; the test's own earlier version held `const Y = await seed(seller, "active")` for this reason): after the review notice and the `screening` read on X, open Y's edit (`openAd(page, Y)` → `my-listing-edit` → the address /my-listings/<Y>/edit → `post-review`), then Edit on data-step 5, the title cleared, `post-next`, the refusal under the title field, the step still open, Y's title unchanged (the service read), then the corrected title typed and the refusal gone. Nothing else in MLA-13 changes.
2. e2e/admin-listings.spec.ts, AL-21: replace `await expect(page.getByTestId("post-edit-notice")).toHaveCount(0);` by `await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "false");` (the notice element is always on the page — FadingNotice, src/components/ui/fading-notice.tsx; `data-shown` is "true" for about four seconds after a save and "false" otherwise). Nothing else in AL-21 changes.
3. e2e/my-listings-ad.spec.ts, MLA-15, the INC-659 part: (a) give X an old pin at seed time — through the service client, after `seed(A, "active")`, update the listings row: `pin_lat: 9.03, pin_lng: 38.74, pin_precision: "exact", pin_zoom: 15` (the columns of 20260919054044 and 20261002013936; the point is the scratch chain's own); (b) move the INC-659 block so it runs right after the first place change's save and BEFORE the Contact step (the ad is still `active` there; after the directions edit the ad is in review and the pin door refuses `screening`): Edit on data-step 6 → the far city chosen → `post-where-pin-open` → `post-pin-map` `data-ready="1"` → `data-center-lat`/`-lng` within 0.01 of the far point. Keep the Contact step, the directions-to-review step and the DB reads as they are, in that order after it; the far city's region is then the ad's place for the rest of the test (adjust the `listing_locations` read's expected city to the far city, or do the INC-659 change back to `second.city` before the Contact step — your choice, said in the report). If this block is red on CI, that is INC-659's reproduction: report it, do not weaken it.
Report `git diff <START> -- e2e/my-listings-ad.spec.ts e2e/admin-listings.spec.ts` whole.

WHY THIS TURN
- D188 (the operator, 2026-10-15: "after the edit we can approve or reject"), carried into D194's spec §2D: from Screening the Edit's Review also carries Approve and Reject, so the reviewer decides where the edit was made.
- D192 (the operator, 2026-10-16, line 4): the ad page's confirmations "should be a dialog box or a toast message that shows for few seconds then goes away" — the done line on the ad's page now fades like the Edit's notice (turn 2).

WHAT THIS TURN BUILDS (the carrier)
- src/routes/admin.listings_.$listingId_.edit.tsx — from Screening, for listings:review, the wizard gets `onDecide`: Approve or Reject opens the queue's own confirm (`post-edit-confirm`: "Approve this ad? It goes on the site now." / "Reject this ad? It stays off the site."; Cancel keeps the Review; `post-edit-confirm-go`), the decision runs through `decideListing` (`transition_listing`) under the step-up guard, and the page returns to `/admin/screening?decided=active|rejected`. A cancelled second factor leaves the Review as it was; a refusal reads under the actions (`post-edit-decide-problem`).
- src/features/posting/step-review.tsx and wizard.tsx — the Review's edit actions row (`post-edit-actions`): Done, and when `onDecide` is given, Approve (`post-edit-approve`) and Reject (`post-edit-reject`, destructive).
- src/routes/admin.screening.tsx and src/features/admin-screening/screening-page.tsx — `?decided=active|rejected`: the page says "Approved" / "Rejected" in its outcome line (`admin-screening-notice`) and drops the parameter.
- src/features/my-listings/my-listing-page.tsx — the done line `my-listing-notice` is a `FadingNotice` (the element is always on the page; `data-shown="true"` and the words for about four seconds after an action; the same words again show again).
- The usage maps regenerated (by you, step 5 — the queue's keys are now also used from the edit route).
- Docs: docs/features/admin-screening.md and my-listings.md (a section each), the changelog, roadmap.md (line 3 and the turn-3 line).

THE TEST (yours; Claude writes none) — e2e/admin-screening.spec.ts, after SC-25, by hand:
- "SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)": as SC-25 opens the Edit from the preview (`admin-screening-preview-edit` → /admin/listings/<id>/edit?from=screening), the reason chosen (`post-edit-reason-misleading`), the title corrected on the Title step → `post-next` (the step-up helper) → back on `post-review`; then `post-edit-reject` → `post-edit-confirm` visible with en["admin.screening.confirmReject"] → `post-edit-confirm-go` → the address /admin/screening (no `decided` in it once the page has read it — assert the pathname, then the line), `admin-screening-notice` reading en["admin.screening.rejected"], the ad's row gone from the queue, and the ad `rejected` with the corrected title (the service client's read, as SC-25 reads the status). Cancel is asserted too: before the reject, `post-edit-approve` → `post-edit-confirm` visible with en["admin.screening.confirmApprove"] → the dialog's Cancel button (its text en["common.cancel"]; the dialog has no cancel test id — locate it by role and name inside `post-edit-confirm`) → `post-edit-confirm` gone, `post-review` still there, the ad still `screening`.
- SC-25 stays as turn 2 wrote it (Done → the preview re-opened → Approve from the preview): the two paths are proven apart.
- The ad page's tests (MLA-*) read `my-listing-notice` by `toHaveText` right after an action and stand unchanged; if any reads it later than four seconds after the action, say so and move the read, never the notice.
RULE: a test never locates a real row by page position (G28); every fixture is scratch (G27).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- C13 From Screening, Approve and Reject sit on the Review beside Done for listings:review only (the console's Edit has no decision; the console is not a queue). The confirm is the queue's own.
- C14 After a decision the reviewer lands on the queue with the outcome line, not on the preview (the ad has left the queue).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev a4bd00b2 with this turn's carrier files)
- Clean: typecheck, format, lint (0 errors, 33 warnings), 931 unit tests (161 files), i18n:usage and the map guard, the hardcoded-strings guard (0 findings); the carrier split on a clean copy of the base: the tree equals the supervisor's file for file after the maps regenerate.
- Not run by the supervisor: the browser tests. CI on the final commit runs them, SC-26 included.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-17-turn-3.md (roadmap.md line 3 comes from the carrier).

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts or src/integrations/supabase/types.ts since the base, name the difference and go on (neither is in this turn's carrier);
  3b. the three test corrections (FIRST, above), by hand;
  4. the carrier, then the hashes of every path but the two usage maps;
  5. `bun run i18n:usage`, then the hashes of the two usage maps (they must equal the table; if they do not, STOP and paste `git diff --stat` of the two);
  6. the test (SC-26), by hand;
  7. the checks;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header, reading each file whole before any file is opened for writing. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 12 paths of the hash table, the brief, e2e/admin-screening.spec.ts (SC-26), e2e/my-listings-ad.spec.ts and e2e/admin-listings.spec.ts (the corrections). The database: none. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.
- THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, SC-26 included.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-17-turn-3.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 12 files → each equal to:
  62d9a089f7d9feba4e9ada4201023d8514c389a2ec61f8a9e8968c7068a768f2  docs/_changelog.md
  ebc0c559c98208083a4f37111d5da43147626bd52cbd3b02d87a603b9fafa7d7  docs/features/admin-screening.md
  8d1082a858f15fa9c7987bea0731b2b316c4b53e5670856da2e589dded0d8933  docs/features/my-listings.md
  0996fcfa261ab96d9fc0b19d6abf97460c1fabe6457acb2c47f5786bb040f374  docs/generated/i18n-usage.json
  0996fcfa261ab96d9fc0b19d6abf97460c1fabe6457acb2c47f5786bb040f374  public/i18n-usage.json
  9a0e0deb0a92f78a868cf38f857050445fe18aedbbb81a88aea29d1e72b91208  roadmap.md
  df0d9ca23b018c2abdb74ba8d18741c1038727b6b5fd7f88791f535b9ed6000a  src/features/admin-screening/screening-page.tsx
  a70385e850e02d65b2372a1547cd3f29522e4bd2463ff717af4c320b2a477760  src/features/my-listings/my-listing-page.tsx
  2edae62294d1cff64f2a18f133d8b5988866708433bc0e089db21a1ac0fca375  src/features/posting/step-review.tsx
  4f2ae90b805ff453faddc98855c7a09058f54274bfa1ab99e0f49d7a97858f08  src/features/posting/wizard.tsx
  9a66776809386fd4d3114b10d6204a82970b1176d871a4cf4207a91270a5ccf1  src/routes/admin.listings_.$listingId_.edit.tsx
  58a5219c81989420f92eac22f48ebf3978506dbd44534449d99f2dc9396fdba1  src/routes/admin.screening.tsx
- (c) `sha256sum` of the three spec files → e2e/admin-screening.spec.ts 3a91f465c432a7890a9bb958dc0fb0f63693bd4d84b200a9a01ee113aa182e2a (the file SC-26 goes in; its SC-25 is the model); e2e/my-listings-ad.spec.ts 51e41d1e68c3a133f84a8105ff1424514d7d10f416ce1831d42ce66ff74ef603; e2e/admin-listings.spec.ts cc37880620b75ad5f1ee7c6bed1685bc95ef53810f431e4d118976c27c64ae26.
- (d) `ls supabase/migrations | tail -1` → 20261015204631_c99005e8-3799-499f-b6b8-ec439d4b9c35.sql (no migration this turn).

THE CARRIER — B17T3-TURN-CARRIER-2026-10-16.md (14,601 bytes; sha256 165f5e1c4ac2469c01b7acb38adaaade6ff32574a94c7a81415b1e9da7e886e9; 21 sections)
- Its first line starts "B17T3 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 12 paths below; each must equal the table (the two usage maps after step 5). On any mismatch, STOP. Also paste the saved brief's sha256sum.
  835e972f8ee77a70c369bcc640a304c423f238b91bbbb420345dc6969722305c  docs/_changelog.md
  7133a3b423ff982002b6f65ed74aaf66bdb070b386877e1a725bd34144f49fb7  docs/features/admin-screening.md
  d8feb9a2350e4fe43a625d05853c9c3cf5fd7097027909baddc3cf90b1da587e  docs/features/my-listings.md
  d8b8db342177e7aa53a8863eed1aed39dca2b9070cf6bc5042c202f2a2d8b368  docs/generated/i18n-usage.json
  d8b8db342177e7aa53a8863eed1aed39dca2b9070cf6bc5042c202f2a2d8b368  public/i18n-usage.json
  0c88fddb50af80273e93224d5e22cd86af7d6212caff17f7a03ac22c9f0c1fea  roadmap.md
  5feb0d442b56f2b6468c3559d776ee371051950ad3f41e6f3fe62d02152287c9  src/features/admin-screening/screening-page.tsx
  7c19ae5325c41c799091c3fc8efd70b66e99578a801fe9df6d4e872ea30d04c1  src/features/my-listings/my-listing-page.tsx
  63f1a77033b9c38acb98049e082f4d7d0575a17a2fa5620729d728f2dcdad201  src/features/posting/step-review.tsx
  08e259fb49117242f800780d5d70317dfcdbb9fa31bf5e5a811ecc13b30b5336  src/features/posting/wizard.tsx
  410b600281595e02233901ea53d5de37f5ba0ecbb838203d6e334c6c5ed17886  src/routes/admin.listings_.$listingId_.edit.tsx
  e0b98a3c173c92a4c1ec9411b659fdaf64962e52ce84bff9c5a99785fced5a25  src/routes/admin.screening.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean (the three spec files included);
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b17t3.log` — 931 passed (161 files); paste the count;
- `bun run i18n:map-guard` "usage maps match the tree";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- Not run by you: the typecheck, the build, the bundle budget and the browser tests. CI judges them.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 12 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 12 paths, the brief and the three spec files.
- `git diff <START> -- e2e/` whole (the three files).
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. Do not wait for CI (DEC-181).
2. Turn 4 (D193, D195, INC-657, INC-666's door) follows from the supervisor; Publish waits for the bundle's close.
```
