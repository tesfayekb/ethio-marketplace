# Bundle 11 — turn B2: the row menu's reopening (INC-541), then Admin › Categories on the agreed blocks: brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 11 — TURN B2 (2026-10-10). ONE TURN: the fix first, then Categories. No migration, no database change, no package change, no new string.
Base: dev 7c3953ae. This file is public: it is written as build instructions. Tier B (admin screens), on the Tier A doors that already exist.

ANSWERS TO THE B1 FIX TURN
- Verified by diff of 5958c368..7c3953ae: the six carrier paths and the brief, each byte-identical to the supervisor's copy.
- CI on 7c3953ae (run 38093041404) is RED, and only CO-9 fails: shard 4 desktop and the fast lane on both projects; shard 1 mobile passed on retry. The fix did its part: the press on the three-dots now lands (no "intercepts pointer events"). But no menu opened (`country-actions-ET-more-close` not found).
- The cause (INC-541): a closing menu stays on the page for its fade-out (about 0.2 s). A dialog opened from the menu and closed inside that time hands focus back to the fading menu, which takes the next press on the three-dots as a click outside itself and closes the menu that press had just opened. The first part of this turn fixes it.
- Turn B1 stays open until CO-9 is green.

WHAT THIS TURN BUILDS — FIRST, THE FIX (INC-541)
- src/components/shell/row-actions.tsx: the three-dots menu's content leaves the page at once when it closes (`className="data-[state=closed]:animate-none!"` on DropdownMenuContent; it still fades in), and the header comment says why.
- src/features/admin-attributes/attributes-page.tsx: the same class on the row menu whose entries open dialogs (the "open origin" menu opens no dialog and is unchanged).
- src/components/shell/row-actions.test.tsx: one unit test, "a closing menu leaves at once" (red on 7c3953ae).
- CO-9 is not edited: it is the proof, on both widths.

THEN, ADMIN › CATEGORIES (D84, D118, D128 — the operator's rulings; DEC-170; Part B, group 1, second of three turns)
- Admin › Categories (src/features/admin-categories/categories-page.tsx), the pattern console, on the blocks turn B1 used:
  - the header (TableActions, `category-header`): Generate missing, the transfer group (Export, Import), then Create category. The bulk run's progress and summary, an export failure and a refused verb run from the row are said under the header (`category-header-status`);
  - the toolbar (TableToolbar, `category-toolbar`): the category subtree as the table's scope (it also decides what Export and Import carry), then search · Filters (Missing assets, as a chip with "Clear all") · Columns (the name locked);
  - the row (RowActions, `category-actions-<slug>`): Edit; Delete in red, on only for a retired category (the verb bar's own rule); the three-dots menu with Visibility, Countries, Attributes, Image, Add pointer, Move up and Move down (not for a catch-all), and Retire (off for a catch-all) or Reactivate. Each opens the same dialog or runs the same change as the editor's verb bar, which keeps every verb;
  - a dialog opened from the row closes back to the table; one opened from the editor closes back to the editor, as before;
  - the delete confirmation is red (DialogActions in category-dialogs.tsx gains `danger`; G29);
  - the footer: the range, rows per page (10, 25, 50, 100, still kept in this browser) and the page numbers.
- DEC-170 (the supervisor's ruling under D118, overridable by the operator): the row carries Edit, Delete and the three-dots menu on every table built on the blocks. This replaces "one row verb, one editor" (C2e, UI-FIX-4) for Categories, and confirms turn B1's rows for Countries, Coverage and Places.
- TableActions (src/components/shell/table-actions.tsx): a group inside the header's row (Export with Import) wraps at the row's end, so a phone shows one right-aligned column. This applies to Countries and Places too.
- No product word changes: every label is an existing key. The Columns choice is remembered per table in this browser.
- Tests:
  - e2e/admin-categories-console.spec.ts — CT-11 (Missing assets through Filters, its chip and the Filters count; the footer's page size kept across a reload), CT-29 (the footer's page size), CT-43 new (the row's Edit; Delete off for an active category and on for a retired one, opening the typed-slug dialog; the menu's verbs; Visibility from the menu closes back to the table, and the three-dots opens its menu again — INC-539, INC-541; Cancel deletes nothing). It uses a scratch category only;
  - e2e/admin-categories-lifecycle.spec.ts — CT-13 (the delete confirmation is red);
  - e2e/admin-categories-images.spec.ts — the images test reaches Missing assets through Filters and the page size in the footer;
  - helper e2e/helpers/categories.ts — `action(…, "edit")` reads the row's Edit; new `deleteButton`, `rowMenu`, `toggleMissingAssets`.
- Docs: categories.md (a turn B2 section), display-primitives.md (two turn B2 sections: TableActions' groups; INC-541), the changelog, the roadmap (line 3; the B2 line ticked).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy)
- typecheck, format, lint (0 errors, 33 warnings), 615 unit tests (95 files), the usage maps, the e2e selector's self-test, the hardcoded-string scan, the test-id check (in the unit tests) and the build: all as listed under THE CHECKS.
- INC-541 reproduced on the real Countries page (Chromium, mocked rows, CO-9's sequence: the menu → Rail order → Escape → the three-dots again): before the fix the menu failed to open in 3 of 10 runs; after it, it opened in 20 of 20 (1280 and 360 px, also with the processor slowed 4×).
- A local render (Chromium) of the real Categories page with two fixture rows (one active, one retired) at 360, 768, 1024 and 1280 px:
  - no sideways scroll;
  - Delete off for the active row and on for the retired one;
  - the menu's items (Retire for the active row, Reactivate for the retired one);
  - Visibility from the menu → Escape → no editor, and the three-dots opens its menu again at once (8 of 8);
  - Delete → the red confirmation → Cancel → no editor;
  - Visibility from the editor → Escape → back in the editor;
  - Filters → Missing assets → its chip → Clear all.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-7.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect 7c3953a FAILURE — the red this turn fixes). If it shows another commit, STOP and report. You cannot git-fetch that branch;
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-7.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 14 files → each equal to:
  a6cea408af485235efd170669ad006f2706e8fe3db9259947cfda24764472839  docs/_changelog.md
  2fbff6053353fda3acd5de249bc06d3be78a53c7700690bc59ccd5f86be57d8e  docs/features/categories.md
  9ae603a0dfc9d658db8fdbc30e7c06fdad652f82bcc53cbefa6a6b8ae4291491  docs/features/display-primitives.md
  15710c5b182f3da74772cd94582cdeb6b38002c71e08a7b5f95e457bc345b81a  e2e/admin-categories-console.spec.ts
  97e669de146ece731b2f79724c0e853543f86e0eef01c53ad27523276019d8a2  e2e/admin-categories-images.spec.ts
  95b0e077131483fda489b723ac7acc31bddd19e93309928997d94e70f859d5cb  e2e/admin-categories-lifecycle.spec.ts
  30492fb725c4ed1d6f140f84094dc14fd9e7ae072c26d38a538c5e7e8c6515dc  e2e/helpers/categories.ts
  f6ea6e13e108acbc6bf96754b742b6ccf30a6e254cf8fe2717dec9a458b1a091  roadmap.md
  77231f08a9f10c9721ba0d42e39397b2633edc2481891bed878fda4dc6f297a3  src/components/shell/row-actions.test.tsx
  f39d0d599c3cc871beec35b032d6a124fe3df8f7a03b3bd26492aa59f41fb8a1  src/components/shell/row-actions.tsx
  669538412c7f271fd91074749b33310057c8801ed54c7b9c9e855a04f249d9fd  src/components/shell/table-actions.tsx
  b1051354f359556a66374adf624070cdbb7a606a54a9890d7b25d301242d42fa  src/features/admin-attributes/attributes-page.tsx
  e91bc030ea634c320aab5241d33be8dfe01b9f1d6b7d3bf09273fc41074d8911  src/features/admin-categories/categories-page.tsx
  25d8da98861289bfa50843110a61bc4e77b646b32472a580a5e740285d21f9eb  src/features/admin-categories/category-dialogs.tsx

THE CARRIER — B2-TURN-CARRIER-2026-10-10.md (239,175 bytes; sha256 2270b1a0d8a1164c2128138c55e1bb901161a0c814f79318e57eb7b28453f264; 15 sections)
- Its first line starts "B2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (counted from 1). The section ends with a newline; that newline ends its last line and adds no empty line. A file with several INSERT-AFTER sections lists them from the bottom of the file up, so every n is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (keys moved within the page), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 16 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  569a53da374fea8082ae7eb70c31a451f04af8aa4927ca77ad2bf88feeb62ab0  docs/_changelog.md
  a64314e0630a5e87a920178bcc33edccd435881913ffedba4365f02070a78af5  docs/features/categories.md
  aa9b63b5ef3f8f478fbbf2ffa21a535bfbb8373c84f831b1083abb2123c6b189  docs/features/display-primitives.md
  e64a5c4ca5cde6e88baba77dccb86cf74ec849863113689504679bece54116fe  docs/generated/i18n-usage.json
  b84603096fe1d4b96601cda5bc9ae2f571bd699c8223f8a10a62f64fa8cfadae  e2e/admin-categories-console.spec.ts
  933b58903460d5cbf9dfc1f954afd64d3ad839ef42ae2e3bb45d41fc84a9a8db  e2e/admin-categories-images.spec.ts
  b7742a1c2f8e586becb01167ae445acac7e755d77b765eef9fc76b5519daf488  e2e/admin-categories-lifecycle.spec.ts
  5748bb7831da2f0a9dc2bf284cc3789bbde874193f240aefe8b10862764beb2b  e2e/helpers/categories.ts
  e64a5c4ca5cde6e88baba77dccb86cf74ec849863113689504679bece54116fe  public/i18n-usage.json
  b6013957b1e56be4ac104acfa85f1aa48dbb4510fb14dbfd69f3d9000c5722b8  roadmap.md
  53ce095a0a859aeac447b36d6a3481ae9e51f8b1182786286e89e83d634b7069  src/components/shell/row-actions.test.tsx
  a90e3c4da92e582438d9885ad36a30778fe0ed693e9c996b598310545b90f313  src/components/shell/row-actions.tsx
  ff0eff7852e8e1f5d8143db3ddfa2c75fe98d3b96a904165caa465848ea0dd12  src/components/shell/table-actions.tsx
  6eef56a8db19ae8819bb79c0c2b3dad8ccd542f2844deab6676ff57a73369039  src/features/admin-attributes/attributes-page.tsx
  689fd94f019580a87e131d9f561736bd2d3a1653c7d326b739532c06fd780b30  src/features/admin-categories/categories-page.tsx
  dec32feeb6df24bda2f0824d2ba0de683886db6875624904e81a03593e06fa75  src/features/admin-categories/category-dialogs.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 615 passed (95 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/admin-countries.spec.ts e2e/admin-categories-console.spec.ts e2e/admin-categories-lifecycle.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(b).
- The 16 sha256sum lines and the brief's.
- `git diff --name-only 7c3953ae` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 7c3953ae HEAD` too. Expect 17 paths: the hashed paths and the brief.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the supervisor's walk lines for Countries, Coverage, Places and Categories.
```
