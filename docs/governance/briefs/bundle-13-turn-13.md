# Bundle 13 — photos, turn 13: INC-579 and INC-494 — a write during a screen's first read: brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 13 — PHOTOS (D154–D166) — TURN 13 (2026-10-14). ONE TURN, NO MIGRATION. No new string. No package change.
Base: dev = turn 12's landing (its commit is not known when this is written; the census below proves every file by content). This file is public: it is written as build instructions.
Tier B: every admin screen's refresh after a write (21 files under src/features/), the new helper src/lib/refresh-after-write.ts and its test. Tier C: the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 12: its landing and its migration are verified by the supervisor from your report; this turn's census proves turn 12's files by content.
- CI: turn 10's run (2f73df1b) is green and promoted (SC-20's fix held; PP-29, SC-21 and SC-22 passed). Turns 11 and 12 are queued or running; the supervisor reads them as they land. Its one retried pass, AT-59, is this turn.

WHY THIS TURN
- INC-579 (2026-10-12): in the catalogue console a category created at once was sometimes missing from the roster's search for 20 s (AT-6 red; AT-59, CT-6, CT-7, CT-12, CT-41, CI-4 and AT-3 — INC-494 — passing only on retry). Its `[roster-dump]` was added in bundle 11 turn C14 to say why, and the fix waited for the first dump.
- The two dumps (2026-10-14): run 38497146343 (AT-3, 02:17Z) and run 38537394409 (AT-59, 09:41Z) — `reading=0 roster=157 shown=0` and `reading=0 roster=159 shown=0`; the row active with one tree pointer in the database; 20.8 s and 21.5 s after the create. No read was in flight, and the read the page held did not have the row.
- The cause: `createViaUi` opens the console and creates at once, while the roster's FIRST read is still on its way. TanStack Query hands a refetch the read already in flight when the query holds no data yet ("If a fetch is already in flight, returns its promise instead of starting a new one, unless `fetchOptions.cancelRefetch` is set and the query already has data" — @tanstack/query-core 5.104.1, build/modern/query.js, `fetch`). The create's invalidation kept that first read, whose answer was taken before the create, and nothing asked again until the 30-second staleTime. A person who opens a console and saves at once sees the same.
- G29 (fix the class): every invalidation in the app has this gap, not only the catalogue's.

WHAT THIS TURN BUILDS
- src/lib/refresh-after-write.ts (NEW): `refreshAfterWrite(queryClient, filters)` — cancel the reads in flight that the filters name, then invalidate them, so a new read starts after the write whether the query had data or not.
- Every `queryClient.invalidateQueries(…)` in src/ (31 calls in 21 files) becomes `refreshAfterWrite(queryClient, …)` with the same filters, and each file imports the helper: src/features/admin-ai/use-ai-features.ts; admin-attributes/import-dialog.tsx, use-attributes.ts; admin-categories/categories-page.tsx, category-import-dialog.tsx, use-categories.ts; admin-countries/country-import-dialog.tsx, use-countries.ts; admin-coverage/use-coverage.ts; admin-listings/listing-page.tsx, listing-photos.tsx, listings-page.tsx; admin-locations/location-import-dialog.tsx, use-locations.ts; admin-screening/photo-changes.tsx, screening-page.tsx; admin/impersonation/use-impersonation.ts; admin/roles/use-admin-roles.ts; admin/translations/translator-card.tsx, use-translations.ts; admin/users/use-admin-users.ts. Nothing else in them changes.
- src/lib/refresh-after-write.test.ts (NEW): RAW-1..RAW-3.
- docs/features/categories.md (INC-579: the dumps, the cause, the fix, the judge); the usage maps (one more file counted); the changelog; the roadmap (line 3 and the turn-13 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The fix is in the app, not in the test: a person can hit it, and a test that waited longer or reloaded would hide it (G38).
- One helper for every invalidation, and a test that fails on any other call (RAW-3), so the class cannot return.
- The judge, frozen now: over the ten CI runs after this lands, no `[roster-dump]` line in any run → INC-579 and INC-494 are closed; one line → the cause is not the whole story, and the dump is read again. INC-586 (CO-2) is read against its own ledger lines over the same ten runs.
- The ids: RAW-1..RAW-3.

TESTS
- Unit, NEW (src/lib/refresh-after-write.test.ts): RAW-1 the library's behaviour, on a real QueryClient — a write lands while the first read is on its way; an invalidation asks nothing new and the written row stays missing (this is the red of the defect); RAW-2 `refreshAfterWrite` starts a new read after the write and the row is shown, and the same with data on screen and a read in flight; RAW-3 no `invalidateQueries(` under src/ outside the helper (test files excepted). 833 in all.
- Reached without an edit (CI runs them): every admin console's browser tests (the same reads and the same doors, now always read again after a write) — AT-3, AT-6, AT-59, CT-6, CT-7, CT-12, CT-41 and CI-4 among them — and every component test of those screens.
- No browser test changes.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn 12's tree with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 833 unit tests (145 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test, the import gate, the browse-path and marketplace guards, a build, the bundle budget (JS 312.1 KiB of 320).
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-13.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 10's, 11's or 12's commit, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 28 carrier paths and the brief. No migration; no database read or write. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-13.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 26 files → each equal to:
  febc55c2a52106902b6cbc5542f93bfd7344669ddf3312a6d744fa0bc0fda61c  docs/_changelog.md
  e39e21b30e0e06ab457221e7e92353cad45c0d2f042b4d1af7736f43acf2e250  docs/features/categories.md
  69fc3bed1c6b80adb1e5b79afa671f3f0165a951e10ab75d91129e1c957e2e47  docs/generated/i18n-usage.json
  69fc3bed1c6b80adb1e5b79afa671f3f0165a951e10ab75d91129e1c957e2e47  public/i18n-usage.json
  3832aa09224a29acd735d4531770a36dea00d9eb450c633e71200c28f660d8d4  roadmap.md
  55f48b6ab40d3083ed74aa406baf18c945dd821eb4fb3becdd3dd578c1d95250  src/features/admin-ai/use-ai-features.ts
  036802ce71925ec4382ceda3a53db944099b31c889f866c988bb49290200825a  src/features/admin-attributes/import-dialog.tsx
  24c6ba4166cefe7d2b22960e455f4e74fd0aedee35515008af548e60640d3f00  src/features/admin-attributes/use-attributes.ts
  e0f507dc58d681b2f66a82e2d9d6cb5f1692a1fa36e133afeaa97349654f4f42  src/features/admin-categories/categories-page.tsx
  78949e1d101f8e429b306c6db8eb5e275c38ee125653632ec6e1cdef49bc51ba  src/features/admin-categories/category-import-dialog.tsx
  3abf4e3ec1bdf66bcc1bd1ec7a71b13e7df5587b1c1625a6edbea2c196536588  src/features/admin-categories/use-categories.ts
  d7a1d806afdfa98df87724398fbccf34e8edde2d7de4003e7b6176def0846bbb  src/features/admin-countries/country-import-dialog.tsx
  cba1e38d7b6af021924beb7fa5f3f95831591a0c60cacac77441fcf9c0332c90  src/features/admin-countries/use-countries.ts
  14ab2b26d76706d92c842f2e601d3c685695a864cb17191d48eb1a8378647e66  src/features/admin-coverage/use-coverage.ts
  299f7f35a755bf8b1bcba740d5b7ee9a4f7b20c14dbac8abdc40ed92e396b917  src/features/admin-listings/listing-page.tsx
  24ab2ebb01b3e15f9c7a826df7b11aac3098697846f6ccd667c587b2e5cd9c51  src/features/admin-listings/listing-photos.tsx
  540ce56bac0c0ca46c95b2a74aaba581d5a0ed87c7694ee18a5bbec40c0d92ba  src/features/admin-listings/listings-page.tsx
  8d65af1c76cd7b499f9dea63fe3a818f5644d68e2cea0251e2b240665a5ff15d  src/features/admin-locations/location-import-dialog.tsx
  98e5957617add20f84e47effea3d15bb9208c275da081968a33295cde1bcbe0c  src/features/admin-locations/use-locations.ts
  25b44bfdedb3a62345c0accacda3ac563364ff718a159c4f5a426448106d95ca  src/features/admin-screening/photo-changes.tsx
  91f7f25bf647f58e4920171867eda4f24186245fb32f594fd003d18d74c176ad  src/features/admin-screening/screening-page.tsx
  5040e3f757033ac7cddb5b8af6f920927cf38d0eb64a973c5424582b1c234cf1  src/features/admin/impersonation/use-impersonation.ts
  9a92e25ec237e73e18cf7ec1e1ad83d89ec25f90285afadcba86738d12fbd78e  src/features/admin/roles/use-admin-roles.ts
  bd532910c90df67b5783199a1a9cfd34d71de1ee39a677e46fbe72606c67e473  src/features/admin/translations/translator-card.tsx
  72c767772a6693e6ccab7c93eccc66dc89facc265c855f46bc5dee8737521dc0  src/features/admin/translations/use-translations.ts
  c9f7458c0d7c27845922c8493b4c3db9962f40deb74999523ba481ce6bc67743  src/features/admin/users/use-admin-users.ts
- (c) `ls src/lib/refresh-after-write.ts src/lib/refresh-after-write.test.ts` → no such files.
- (d) `grep -rl "invalidateQueries(" src --include=*.ts --include=*.tsx | grep -v "\.test\." | wc -l` → 21.

THE CARRIER — B13T13-TURN-CARRIER-2026-10-14.md (17,371 bytes; sha256 b900139e58b6fc0003bbc4355fab23c333c6de44c8a34d29759906888c7321b3; 57 sections)
- Its first line starts "B13T13 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 28 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  d3eb7e9f6847432d6fde4267410fe8e62faeaa5e016dc88615c03bb18b146a9c  docs/_changelog.md
  1e220dea09f9f460b21b9a068d19c63e53d0b1fd59bc49aa2ced9813ee3b216a  docs/features/categories.md
  3ad0d6e1050c7384df356e5f18ed0af8236c30fe38b3236a28fcab95db126b81  docs/generated/i18n-usage.json
  3ad0d6e1050c7384df356e5f18ed0af8236c30fe38b3236a28fcab95db126b81  public/i18n-usage.json
  4e1f7fc992193922ed8256ae937575fac107afbdabd43d77e5641e47b9a5ace7  roadmap.md
  f82b50ccdacd407eefecb482dd747dc79ed851995221bbabc203802c6a37709e  src/features/admin-ai/use-ai-features.ts
  09b8df9202abfb237b7962a74059b0ec9060f34e077952c75b2f655508f05bf7  src/features/admin-attributes/import-dialog.tsx
  59c4c2c85b9508ff2a347f07d90a9073952615f0547e4077fd8c246c180d97f1  src/features/admin-attributes/use-attributes.ts
  7d90ab398d649904ef0bbf9c91adad9a8bbf1fc0bad3dd7e142d57176895dff8  src/features/admin-categories/categories-page.tsx
  27ca75b749f90a993a25847a91c3f5befb3f598bd0a131117d5fb70abc544920  src/features/admin-categories/category-import-dialog.tsx
  19d0380afc54b478a9e24afc7858805ef4f1e978dfb9d45080306006b47c082a  src/features/admin-categories/use-categories.ts
  54336a82b471d1c2edc9cc9e2416460089c9f9ae7b1dc8b51e95480a63a7d30d  src/features/admin-countries/country-import-dialog.tsx
  1b8ab72fb0eb360bb6a7b8e6550991e75ac59c73535e533f84ae4c788122a5cf  src/features/admin-countries/use-countries.ts
  0aba778f5f0cd8f13af54557c9ff73fb0d9d859ac2d955251e83a2670c834e68  src/features/admin-coverage/use-coverage.ts
  4dec8e7a7f157beb10ac33ce23af7e8b21f994f8176858cb1d0de68e8fe08697  src/features/admin-listings/listing-page.tsx
  267210a8f3c5d19e37aae54af3f70423d3a04b37dff5233ebbca38f208303f78  src/features/admin-listings/listing-photos.tsx
  b2b792ac733f892092c2de5475f29539a17b7c3aa0a1d02a09fdf9f5dbfd5374  src/features/admin-listings/listings-page.tsx
  54ddb023b542eb573c97264cba7685c5da102cbb897fcc09f370ab7d1c7cc5d0  src/features/admin-locations/location-import-dialog.tsx
  88739d640463642a0119193d0421e85aef856ea1024875bc5ba9b9986a30138f  src/features/admin-locations/use-locations.ts
  231a80a29874926378b01d479da748a781b3741408aaa8920432ad0f84a266c0  src/features/admin-screening/photo-changes.tsx
  6fdaaed9025a3c08dd097a9bab28bf1021ba324770238d741974ef78e70c39aa  src/features/admin-screening/screening-page.tsx
  e7e696dadb183903ff8026999262a94ee02ad9efc117a47f347c727aa18fbe1a  src/features/admin/impersonation/use-impersonation.ts
  f27f159be1609abee8032c0ae413670ae99d2046783d439b1545af33759eaa99  src/features/admin/roles/use-admin-roles.ts
  6c9e285e0d6b10aac76ff57cc03c8553ef34333397333d3c68bae9299d2dae17  src/features/admin/translations/translator-card.tsx
  d41897b64ca702df4659cdb9df0f35183fd3b721e300980f2fb4343a0411e521  src/features/admin/translations/use-translations.ts
  e2ca97817392e9f2758f7b8bfabc237adce9a02b536553143c74fb83917af041  src/features/admin/users/use-admin-users.ts
  742a13b55c35bf0b8a8c0e6218ebac16aee1b08b83e765b39047180797d5017a  src/lib/refresh-after-write.test.ts
  9119126166340f23e7b958214bb28280163ef2bdf71992ec7c8253c17c2975ed  src/lib/refresh-after-write.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t13.log` — 833 passed (145 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `grep -rl "invalidateQueries(" src --include=*.ts --include=*.tsx | grep -v "\.test\."` → only src/lib/refresh-after-write.ts;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck and a build on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 28 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 28 carrier paths and the brief, and no migration file. `git ls-files src/lib/refresh-after-write.ts src/lib/refresh-after-write.test.ts`, so the new files are shown tracked (G20).
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
2. Publish only when the supervisor says the newest commit is green and Lovable is idle.
3. Then the supervisor's walk.
```
