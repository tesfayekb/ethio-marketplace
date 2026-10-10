# Bundle 11 — turn B1: Admin › Countries, Coverage and Places on the agreed blocks: brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 11 — TURN B1 (2026-10-10). ONE TURN. No migration, no database change, no package change, no new string.
Base: dev 0160270f. This file is public: it is written as build instructions. Tier B (admin screens), on the Tier A doors that already exist.

ANSWERS TO TURN A3
- Verified by diff of 6f3d3bfe..0160270f:
  - the 18 carrier and map paths and the brief, each byte-identical to the supervisor's copy;
  - the migration file equal to the appendix with <MARK> = 20261011030000.
- CI on 0160270f (run 38061577911) is GREEN on attempt 2, after the operator's staging apply, and promoted. SC-1..SC-15 and TR-31 passed.
- The operator walked it: all six lines passed. Turn A3 is CLEAN, and Part A (Admin › Screening) is closed.

WHAT THIS TURN BUILDS (D83's list board, D118, D128 — the operator's rulings; Part B, group 1, first of three turns)
- Two shared blocks:
  - TableToolbar (src/components/shell/table-toolbar.tsx) gains an optional `scope`, drawn first on the row and spanning it. A scope decides what the table READS, so it is never hidden inside Filters. The search box keeps a 10 rem minimum and wraps before it shrinks.
  - TableActions (src/components/shell/table-actions.tsx, new) is the page's own actions on one row above the table, at its end: the plain ones (Export, Import) first, the one primary action ("New …") last. It draws nothing when there is no action.
- Admin › Countries (src/features/admin-countries/countries-page.tsx; countries-toolbar.tsx now holds CountryFilters):
  - the header: the markets file's Export and Import;
  - the toolbar: search · Filters (status, as a chip with "Clear all") · Columns;
  - the row: Edit, then the three-dots menu with Open or Close market and Rail order. These open the same dialogs as the editor's verb bar, which keeps them;
  - the footer: the range, rows per page (10, 25, 50, 100, still kept in this browser) and the page numbers.
- Admin › Coverage (src/features/admin-coverage/coverage-page.tsx):
  - the header: New plan;
  - the toolbar: search · Columns (no filter exists here);
  - the row: Edit (there is no delete door);
  - the footer with rows per page.
- Admin › Places (src/features/admin-locations/locations-page.tsx; locations-toolbar.tsx now holds MarketPicker and LocationFilters):
  - the header: Export places, Import places, then New place;
  - the toolbar: the market as the table's scope, then search · Filters (level and status, as chips) · Columns;
  - the row: Edit; Delete in red, off while the door would refuse it — the verb bar's own rule, now one function, deleteBlockedKey in locations-service.ts; and the menu with Add a place under it, Retire or Activate, Move and Reorder (the verb bar keeps every verb and says why Delete is off);
  - the delete confirmation is red (LocationDialogActions gains `danger`; G29);
  - the footer with rows per page.
- No product word changes: every label is an existing key. The Columns choice is remembered per table in this browser.
- Tests:
  - e2e/admin-countries.spec.ts — CO-1 (the toolbar; the header's group), CO-2 (the status filter in the Filters panel and its chip; the toolbar's order; the range read for the total; the footer's size), CO-7 (Import from the header), CO-9 new (the row's menu opens Rail order; Close market for an open market; a hidden column remembered after a reload);
  - e2e/admin-coverage.spec.ts — the editor opened through the row's Edit; CV-2 (the toolbar, the header, the footer's size, a hidden column and back);
  - e2e/admin-locations.spec.ts — the edit-box scan reads the new Edit ids; LT-1 (the toolbar's order with the market first; the header); LT-2 and LT-11 (level and status through the Filters panel; the chip); LT-5 (the row's Delete off for a parent, on for a leaf and opening the dialog; the red confirmation); LT-9a (the footer's size); LT-13 (the range read for the total); LT-16 new (the row's menu and Delete open the editor's own dialogs; Cancel changes nothing);
  - helpers: e2e/helpers/countries.ts and e2e/helpers/locations.ts — editButton reads the row's Edit; rowMenu, chooseFilter (open Filters, choose, close) and, for places, deleteButton;
  - unit: HS-10 (src/components/shell/columns-button.test.tsx), PL-1 (src/features/admin-locations/locations-service.test.ts, new).
- Docs: countries-console.md, coverage-console.md, locations-console.md and display-primitives.md (a turn B1 section each), the changelog, the roadmap (line 3; the B1 line ticked; group 1's three turns named; D131 under stage 3).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy)
- typecheck, format, lint (0 errors, 33 warnings), 613 unit tests (95 files), the usage maps, the e2e selector's self-test, the hardcoded-string scan and the build: all as listed under THE CHECKS.
- A local render (Chromium, a fixture of the same blocks) at 360, 768, 1024 and 1280 px showed no sideways scroll. The market keeps a full row on a phone, and the search box wraps instead of shrinking.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-5.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect 0160270 SUCCESS). If it shows FAILURE, STOP and report. You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier;
  5. the usage maps;
  6. the hashes;
  7. the checks;
  8. the browser run;
  9. the report;
  10. END THE TURN.
  Do not stop between steps.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the carrier's paths, the two usage maps and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-5.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 22 files → each equal to:
  539852cace530365c8567b4f42a5a93ed1fa360a8b05b11d62c127bc071b9d54  docs/_changelog.md
  37b0f7cdd8875f46ee8f93f7d35b4875474b7b7336d67d5825ab1782997b75de  docs/features/countries-console.md
  a336838357f3b94d42ed73ec7dedac8ac5e142c006287d85395b972aa0ea299f  docs/features/coverage-console.md
  3ae4d5c2e3f148b105808ef59062517f741f44587847d40f16945950e636f25c  docs/features/display-primitives.md
  2a80c81ef2ebb00b11afdf77695f1d7349c59c9fbba3b5cccfb3664c3f6761cc  docs/features/locations-console.md
  9d826f6de995abecb0c06d7063f506a37be3c04144e082ce7853ade9cd8c1f36  e2e/admin-countries.spec.ts
  70608027a9d46f1ef6284941342e1cff0edb1195f6f84a578823fc05c709049a  e2e/admin-coverage.spec.ts
  d6fa073991524d77e0cb8ffc6ac0a123b33bcd6326b4a7cb28c6ebe0980c7884  e2e/admin-locations.spec.ts
  cdcb71e515e923f2f5d71eb17b9e16a3d80650dac3b70ebdb0fcea03a0791e8f  e2e/helpers/countries.ts
  14583b63bef7eef4147246222004910fcf3022418feeb0648a948b3dc8885b25  e2e/helpers/locations.ts
  a2178f808f7acecc5f77567877849b12cd3786cf4bf01bb0a0e752d8374ca7b0  roadmap.md
  e9994b144f4cda65f6c2d8240c761bd2ebdb17efd623d338e1f1cf3729300bc3  src/components/shell/columns-button.test.tsx
  dfaeecc847ad5cc0c253a2085d15a30154d872678cfb9dada1a67397037ec89a  src/components/shell/table-toolbar.tsx
  aacfaf9966be61954a2d7a11cdad73ff6c32b9639743741e60a1474c99276639  src/features/admin-countries/countries-page.tsx
  156bdba0e9228af95d164ecf58cb83449a5f6e420674d2477e8592d485ca1156  src/features/admin-countries/countries-toolbar.tsx
  6e191db083b86278ddef3ee9cb0bde819f1c94baec18ee2149ad7828fee228dd  src/features/admin-coverage/coverage-page.tsx
  46f795cabbe4003296c376aa7a817ba902b0a22a12e1d3cfe605482d025fcbe1  src/features/admin-locations/location-dialogs.tsx
  895afd62f172e96328fb1d1b97b9ff010df6980eb9df2f12a087d56f31f69091  src/features/admin-locations/location-verb-bar.tsx
  7a1c9fb18476177ca8bed6f94432d8f2ed97549db0595d069dad483ace83bbe4  src/features/admin-locations/location-verb-dialogs.tsx
  26524cd5db11b26afb4fa2e7e7583084ddef3a31247b02e74b4f3cac51df0d17  src/features/admin-locations/locations-page.tsx
  596572dc0dfd6538121aa2839104d09a2c9bb60f5176e522ad520ab2102d7427  src/features/admin-locations/locations-service.ts
  9f0712533d3e3ffbe9afb33d6082d7839ea2a9b4457fd034002c5a4d575c19e1  src/features/admin-locations/locations-toolbar.tsx
- (c) `ls src/components/shell/table-actions.tsx src/features/admin-locations/locations-service.test.ts` → both "No such file or directory".

THE CARRIER — B1-TURN-CARRIER-2026-10-10.md (264,019 bytes; sha256 9968c3d555d74e66828b5fe45586d52cc0a2680071c790a9a0610ca5a7efa7a6; 24 sections)
- Its first line starts "B1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes: REPLACE (the whole file); NEW (a file that must not exist yet); APPEND (added at the end of the file).
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (keys moved between files), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 26 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  9bfbb1235bb372f7bb9a0e43112c664d753112af16eb6df70cbacb15b72be400  docs/_changelog.md
  faada196d229366f7e985515e9cd96ac6780773cbffc7f74e5666271497e53aa  docs/features/countries-console.md
  55c4ef1b296b72c59b363145c2bdad7d8a038b7d03ad2a84a88e1b02bc23a213  docs/features/coverage-console.md
  92bd81a4305def9c75ae57964e2f9b11433c0917a62359b73ee2a3e51a4f453f  docs/features/display-primitives.md
  eb926160b489c9179a4317f74c223a4eba8b77a0254127e6bf2c1181a026ffb1  docs/features/locations-console.md
  69e113467832f39bad8a2c4a9ba157622edd20062848b16cf0fa9e11b11d5e80  docs/generated/i18n-usage.json
  1d6cd65d5f3c8d2ca13e7db8ee22f9de865a3f528b5a34cf57ad53bfbe4e231c  e2e/admin-countries.spec.ts
  034d3ff39c8dde965edeb298df5b86632a6775d7e563b17e6a7a95ac4c36ff38  e2e/admin-coverage.spec.ts
  562f55e0d399ab26c0e47c35c971fb81b2a6b79aed1c6c570059a20c3a5b3872  e2e/admin-locations.spec.ts
  4babe8f6143a9170548a0d9511fd2c800e8e254c1e6523de1072e6ba3e6a15bb  e2e/helpers/countries.ts
  fb67090685e15a182e7de454a22dbe8fabb468266722f305a7d3a410bcbd85a5  e2e/helpers/locations.ts
  69e113467832f39bad8a2c4a9ba157622edd20062848b16cf0fa9e11b11d5e80  public/i18n-usage.json
  051e69976cbacac57e3e69da709e29980f1b778ed174f3dbd94bf2d5a69c433a  roadmap.md
  fb087ccea43c553b107f62e7ae7fc0aaf605ac8befd6d600feb2de598ce8ef66  src/components/shell/columns-button.test.tsx
  669538412c7f271fd91074749b33310057c8801ed54c7b9c9e855a04f249d9fd  src/components/shell/table-actions.tsx
  81a85ca0a55208046ee4d99a4a69302291fdfb3115e5c510bdf0d41572c815f5  src/components/shell/table-toolbar.tsx
  d21ed43b905e98a448dfc4edaeacd47c524c609f360d0c18770acc6a6172c458  src/features/admin-countries/countries-page.tsx
  bab8c04a831e1ab49c3476a710ac84c33461c48f1d8f6ff249aa5422a1956521  src/features/admin-countries/countries-toolbar.tsx
  f9eebbabf93ce197117ec8e0c4222af191f438edccede4ea70c88d6c707e3b6e  src/features/admin-coverage/coverage-page.tsx
  b9cf2e9225f1a8bd5b8defc9a9f2f93c8e4f26f1f005ea42786156d5ea977964  src/features/admin-locations/location-dialogs.tsx
  0096852d35af32a670f0046bc5c859fa3688ac1c908f232b6871d08f3a26b758  src/features/admin-locations/location-verb-bar.tsx
  afeeee7daee9ccbe60c29cbbc74ba2a6b0d97d9fab95af31c8d2292de10ee937  src/features/admin-locations/location-verb-dialogs.tsx
  0f0b8c2afb2ee9df269d9ea9ab4aff4a81b7ee00ce483fce7d18d28c149cb603  src/features/admin-locations/locations-page.tsx
  2de8776ca15873a7cabf5a93be33a464479fd8a17fca44f570ab98a48b2aba49  src/features/admin-locations/locations-service.test.ts
  119b2c8b3984e21ea6ee89358f045c5dd58cbeca85fd87ebbdbcb64a3ec1cb2c  src/features/admin-locations/locations-service.ts
  8c429dac8b211b5e4f660bdaf938a2298eb12311bfb1b777c2b82bc3c3d74dfd  src/features/admin-locations/locations-toolbar.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 613 passed (95 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/admin-countries.spec.ts e2e/admin-coverage.spec.ts e2e/admin-locations.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 26 sha256sum lines and the brief's.
- `git diff --name-only 0160270f` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 0160270f HEAD` too. Expect 27 paths: the hashed paths and the brief.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the supervisor's walk lines for Countries, Coverage and Places.
```
