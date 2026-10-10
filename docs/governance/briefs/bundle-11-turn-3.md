# Bundle 11 — turn A2: the shared table toolbar and Admin › Screening on the agreed blocks: brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 11 — TURN A2 (2026-10-10). ONE TURN. No migration, no database change, no package change.
Strings: five new keys in English and Amharic (listed below; the Amharic drafted by the supervisor and sent to the operator to check before he Publishes).
Base: dev f194d5cd. This file is public: it is written as build instructions. Tier B (screens), using A1's Tier A doors.

ANSWERS TO TURN A1
- Verified by diff of 78c7f665..f194d5cd: the five carrier paths and the brief byte-identical; the migration file equals the appendix with <MARK> = 20261010230000; types.ts adds the two doors.
- CI on f194d5cd (run 38045483368) is GREEN on attempt 2, after the operator's staging apply, and promoted. SC-7..SC-10 passed. Turn A1 is CLEAN.

WHAT THIS TURN BUILDS (D118, D120, D128 — the operator's rulings)
- Two shared blocks:
  - ColumnsButton (src/components/shell/columns-button.tsx) — "Columns", one tick per column, the row's name locked;
  - useHiddenColumns / visibleColumns (src/components/shell/columns-state.ts) — the hidden columns remembered per table in this browser (a convenience: failing storage shows every column);
  - TableToolbar (src/components/shell/table-toolbar.tsx) — the one toolbar layout: search, then Filters and Columns, chips under it.
- Admin › Screening on the agreed blocks (src/features/admin-screening/screening-page.tsx, use-screening.ts):
  - the toolbar: the title search; Filters with the ad's market (home_country_code) and its chip with "Clear all"; Columns;
  - tick-boxes with Approve and Reject for several ads (D128: a bulk action exists here). One confirmation counts them, one step-up covers the set, and transition_listing judges each ad;
  - the row's actions in its three-dots menu (RowActions): Preview as buyer, Approve, Reject;
  - the footer's three zones: the range, rows per page (25, 50, 100), the page numbers;
  - Preview as buyer: the questions and their options (get_posting_schema and the options route, as the posting form reads them); admin_screening_facts — the ad's country, the contact methods shown, the seller's public name; "Show number" on phone, second phone and WhatsApp through the step-up gate (admin_reveal_listing_contact, logged by the door); Approve and Reject at the preview's foot.
- Two optional props on the shared preview, with no change for the seller's own preview:
  - src/features/posting/preview/listing-detail.tsx: channelAction, a control after a shown channel's name;
  - src/features/posting/preview/preview-sheet.tsx: footer, actions under the listing.
- Strings (G43 — the Amharic below is what ships):
  - prim.table.columns — en "Columns" · am "አምዶች"
  - prim.table.all — en "All" · am "ሁሉም"
  - admin.screening.showNumber — en "Show number" · am "ቁጥሩን አሳይ"
  - admin.screening.confirmApproveMany — en "Approve {count} ads? They go on the site now." · am "{count} ማስታወቂያዎች ይጽደቁ? አሁን በገጹ ላይ ይጫናሉ።"
  - admin.screening.confirmRejectMany — en "Reject {count} ads? They stay off the site." · am "{count} ማስታወቂያዎች ውድቅ ይደረጉ? ከገጹ ውጪ ሆነው ይቆያሉ።"
- Tests:
  - e2e/admin-screening.spec.ts — SC-2, SC-3 and SC-6 open the row's menu; SC-11 (Columns hides and remembers; Filters narrows to a market, its chip clears); SC-12 (two ticked ads approved together after one counted confirmation); SC-13 (the preview's public name and methods; Show number reveals one number and logs it); SC-14 (Reject at the preview's foot);
  - unit: HS-7..HS-9 (src/components/shell/columns-button.test.tsx), SF-1 (src/features/admin-screening/use-screening.test.ts).
- Docs: display-primitives.md (the two blocks), admin-screening.md (the page on the blocks), the changelog, the roadmap (line 3; the Screening lines ticked).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-3.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect f194d5c SUCCESS). If it shows FAILURE, STOP and report. You cannot git-fetch that branch;
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-3.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 8 files → each equal to:
  f45a25f1f6cdd1e40986a731350293d51f4e3d2707f66f0b2ed6cc9df9b2d481  e2e/admin-screening.spec.ts
  e726bd23852ce73709ae948b2c18b9e1e0e40528380cbbba3a842ac7834e22ed  roadmap.md
  2da5774831f6e041d6515b004aea3db76a109e3125021d208a5b23d0be928462  src/features/admin-screening/screening-page.tsx
  f51ac55cd166dfc68713f48ec5b3d829537b6e863bd97117b279234032a36be3  src/features/admin-screening/use-screening.ts
  ea626ae2193c452c804022d3f5e42ccb26b5b21e665e7b094ed3f2964a244c69  src/features/posting/preview/listing-detail.tsx
  81fb5ae89a88118beae9d49aafb16d280d6edc7e2b1a2c27505f4acb704eb359  src/features/posting/preview/preview-sheet.tsx
  223ba4e0d9e5e882c49eb25fc3029f73a433a84ea5829926f049c6da047e3706  src/i18n/locales/am.ts
  4dd29edf33219fd2b0c22650bb7459ccb8b561066943da7d7348d5d774468d55  src/i18n/locales/en.ts
- (c) `ls src/components/shell/columns-button.tsx src/components/shell/table-toolbar.tsx` → both "No such file or directory".

THE CARRIER — A2-TURN-CARRIER-2026-10-10.md (459,615 bytes; sha256 ba5c8e3e34ef864365b1e814bc6470a54321fa703d21318efcb91c3b70e08deb; 16 sections)
- Its first line starts "A2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes: REPLACE (the whole file); NEW (a file that must not exist yet); APPEND (added at the end of the file).
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (new keys and new source files), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 18 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  506ba67ea2611062a67eaab01133c7320b256236c66216848b192487579832d9  docs/_changelog.md
  bbd54388a3efbc5c87b25625213f244c6f878f5ad4f080375175a175662b3011  docs/features/admin-screening.md
  3ae4d5c2e3f148b105808ef59062517f741f44587847d40f16945950e636f25c  docs/features/display-primitives.md
  0df23ed9a480cb8cd142af2e3e352fbe165198cfa6e0b3015294346f390fa59a  docs/generated/i18n-usage.json
  91a183a2349f1cf565ddf477e11cc482563a4a74acbaeec8e2dd96dd04efc0be  e2e/admin-screening.spec.ts
  0df23ed9a480cb8cd142af2e3e352fbe165198cfa6e0b3015294346f390fa59a  public/i18n-usage.json
  807a9f69e0d8ae80dc26c90490ce4da636e2297ee677f97d33af0f849920d36d  roadmap.md
  e9994b144f4cda65f6c2d8240c761bd2ebdb17efd623d338e1f1cf3729300bc3  src/components/shell/columns-button.test.tsx
  f1f5a914ac91cf0269f6609a352f1fe6272db96e8d0f9c3cd974a58aba07df5b  src/components/shell/columns-button.tsx
  3378fef0560a2bc7d1a11055fad898fa384970d5e5a3a1a10c7d274d4b710aec  src/components/shell/columns-state.ts
  dfaeecc847ad5cc0c253a2085d15a30154d872678cfb9dada1a67397037ec89a  src/components/shell/table-toolbar.tsx
  cec2c7521c5922a5c31fcde681fe7d2ae606cae4fe15f30d20c43440573f2069  src/features/admin-screening/screening-page.tsx
  ec2cbae6c7791d41e731297e4dd7364a13cf0b3dc7d9ec099b26c87e3840fe2e  src/features/admin-screening/use-screening.test.ts
  c9598038130e389677ef1be8c09e7e261f98adb5ab713f7d384a9571081d58bc  src/features/admin-screening/use-screening.ts
  4c1cae5c7c95f17dad1a1f1faf5ca18e09da283fc36dfeac2e4d25d86842e17b  src/features/posting/preview/listing-detail.tsx
  8e2dff91870e5a7f45fb595e1b1fe284be278682ec8b58f1267a1c3476fab2f1  src/features/posting/preview/preview-sheet.tsx
  af80f0a7aecf3a5d2a6ae4ec6cfd1dca6649d6a461e069563d12d964b04310dc  src/i18n/locales/am.ts
  ae9d8a60b8cf7e09665c38c577329cb27e6952eda2dec939148424a1a20b59e0  src/i18n/locales/en.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 609 passed (94 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.
In the report, list the five Amharic values key by key with their English (G43).

THE BROWSER RUN — try once: `bun run e2e:local e2e/admin-screening.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 18 sha256sum lines and the brief's.
- `git diff --name-only f194d5cd` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only f194d5cd HEAD` too. Expect 19 paths.
- The checks, and the five Amharic values with their English.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the supervisor's walk lines for Admin › Screening.
```
