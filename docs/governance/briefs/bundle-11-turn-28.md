# Bundle 11 — group 3, turn G3e: Strings and its Data scope on the agreed blocks: brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — GROUP 3, TURN G3e (2026-10-12). ONE TURN, NO MIGRATION. No new strings. No package change.
Base: dev 4913e366. This file is public: it is written as build instructions. Tier B: the page's layout, its tables' toolbars, row controls, cards and footers, and the tests that follow them. Tier A stays untouched: every door (the lists, the saves, the AI, approve, import and export) is called exactly as before.

ANSWERS TO THE LAST TURNS
- Turn G3d: verified (dev 6148f2ef held the delivered tree and the brief as sent). Its CI red was INC-561, fixed in G3d2, not the roster's: the roster's tests passed.
- Turn G3d2: verified (dev 4913e366 holds the delivered tree and the brief as sent). Its CI run is read by the supervisor while you work; a fix it needs comes in the next turn (the operator's rule of 2026-10-11: no fix turn alone).

WHAT THIS TURN BUILDS — Admin › Translations › a language's page (Strings, and its Data scope) on the agreed blocks (D118, D128, D132, DEC-170)
- src/features/admin/translations/strings-page.tsx:
  - the header: the page's heading in TableActions (`strings-header`, "Strings — {language}"), the coverage line (`strings-coverage`) and the meters (`strings-meters`) under it. The "All languages" link goes: the breadcrumb leads back (TR-39);
  - the scope: Interface and Data as pills (FilterChoices `strings-scope`; same testids `strings-scope-interface`, `strings-scope-data`; it still navigates with the URL). The scope decides what is read, so it is never a filter inside the panel;
  - the strings table's toolbar (TableToolbar `strings-toolbar`): the search (`strings-search`, unchanged), Filters (`strings-filters`) with ONE row of status pills with their counts (`strings-status-filter-<value>`: all, untranslated, machine, edited, approved, flagged, orphaned). The orphaned set is a view, not a status: choosing it clears the status and choosing a status clears it, as the old chips did; the status stays in the URL (INC-073). Columns (`strings-columns`, the key locked). The chosen filter as a chip (FilterChips `strings-chips`, with Clear all). The orphaned note stays under the toolbar;
  - the row's actions: RowActions `string-actions-<key slug>` with Edit (`-edit`) — it opens the editor in the row's own box and, pressed again, closes it ("Close"), as the old button did;
  - the phone card: the key on top, the source under it, the translation as a fact, the status pills at the end of the facts, the provenance ("Last change") in the footer beside Edit;
  - the footer: the page size (kept per browser, `ethio.admin.strings.pageSize`, 25 by default) and the page run.
- src/features/admin/translations/data-scope.tsx: the same blocks for the Data scope's table — the search box (`data-search`, passed in from the page) in its toolbar (`data-toolbar`), Filters (`data-filters`, `data-status-filter-<value>` with counts), Columns (`data-columns`, the name locked), the chip (`data-chips`), RowActions `entity-actions-<row slug>` with Edit, the card (the name on top, the type under it, the source and the translation as facts, the status pill), the footer's page size (`ethio.admin.data.pageSize`).
- Unchanged: the approve-all, AI and transfer bars, every editor and the history drawer.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The orphaned set is one more pill in the status row, not a second filter.
- The row's Edit toggles the editor open and closed (the editor holds every other verb), as on every table with an expansion (V2c).
- The page-size choice is kept per browser, 25 rows by default.
- Tick-boxes on Strings (D128 names it among the tables with a bulk action) are NOT in this turn: today's bulk actions there act on the whole filter, not on chosen rows. Choosing rows for a bulk action is its own item when one is wanted.

TESTS
- e2e/helpers/translations.ts: `chooseFilter(page, filters, choice)` (NEW) — opens a Filters panel, taps the pill, closes it.
- e2e/admin-translations-console.spec.ts: TR-5 (the status through the panel; after a reload it is a chip); TR-4, TR-8, TR-11, TR-13, TR-35, TR-23 (two places) and TR-16 open the editor by the row's Edit (`string-actions-<slug>-edit`, the old `string-expand-<slug>`).
- e2e/admin-translations-governance.spec.ts: TR-21 (the orphaned pill in the panel, with its count).
- e2e/admin-translations-data.spec.ts: TR-14 and TR-24 (the row's Edit, `entity-actions-<slug>-edit`) and TR-26 (the counts read on the panel's pills).
- Not edited: every other test.

DOCS
- translations.md (the page on the agreed blocks), the changelog, the roadmap (line 3; the G3e line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn G3d2 applied)
- typecheck, format, lint (0 errors, 33 warnings), 671 unit tests (109 files), the usage maps, the hardcoded-string scan, the selector self-test, the root-route check, the build and the bundle budget (231.1 KiB): all clean.
- A local render of the page (Chromium, a node build, mocked answers, nothing sent to a database) at 360, 768 and 1280 px, in both scopes: no sideways scroll; the heading in the header; the search, Filters and Columns in each toolbar; Filters opened, its pills read with their counts (Orphaned · 3 on Strings), closed with Escape, twice in a row; the row's Edit opened the editor and closed it; Columns opened; the footer's page size drawn. Cards at 360 and 768, the table at 1280.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-28.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit 4913e366… — its conclusion is whatever the run gave). If it shows another commit, STOP and report; whatever its conclusion, go on (the supervisor reads that run, and a fix it needs comes in the next turn). You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the usage maps, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 11 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-28.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 9 files → each equal to:
  423162dbabb75de982cab2db3693be5a173ec5429486219cdec1c04604bf44f7  docs/_changelog.md
  6661643ebfe0f22795714cf16eab90bd9d25c016e79d0aa12734b9946224d960  docs/features/translations.md
  83b0b96fe6ccca267961b9ea8011f665b3238efa253fb64febfea6c0cece590f  e2e/admin-translations-console.spec.ts
  973bd380a660dba94e168023298c53532f505ea756271d3301e0e366543c9bc5  e2e/admin-translations-data.spec.ts
  440ac61250cd447e29e16581a2b03251d3e6c590562d0a2ff9ed10a2b5fee2fa  e2e/admin-translations-governance.spec.ts
  836475015220036fc804757909f4bcf46d4e4b7db62f20206eae4c16247a6962  e2e/helpers/translations.ts
  d8866f7072c868c978bd68132a1a00d3c2af344606f9771740f386a900f613da  roadmap.md
  78193dccffac1caf10cba7702a357bee4350f6ec6038db15cad149e4360a689b  src/features/admin/translations/data-scope.tsx
  af394bc8702e4d3c1d1e23464d2e128856d306210d1841bfea59453c1b389ca2  src/features/admin/translations/strings-page.tsx

THE CARRIER — G3E-TURN-CARRIER-2026-10-12.md (25,683 bytes; sha256 21c5013717cbb3c891ae32186b3e491de3f5f49ea354a108a70c75c161c3e39c; 73 sections)
- Its first line starts "G3e TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 11 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  187012a69193baa1cd47bcfb3aaf6bd42047c4141eb98a2cf624446fdbebbb64  docs/_changelog.md
  f824c32bd9f3c7373971f103d4a46144ba638ff57a430952befd1de648243d33  docs/features/translations.md
  1438490ea69c8c95f1f2f30a5d6e51065d59a2d9b5d98a857731496b2f467843  docs/generated/i18n-usage.json
  078e5d07e30e7ccfd36eded8bb09140d303e45ad052d6f5af3e8f34107076316  e2e/admin-translations-console.spec.ts
  758896b71ceb1729fa95fa352d27ba5b0d842ed1c5ae87755e6ff4bfb7b31e80  e2e/admin-translations-data.spec.ts
  8b9d85d143fafef6e08990100fd917b46314d8d249cdbb32a358576b748b0e31  e2e/admin-translations-governance.spec.ts
  c50745805040532896cf7fd882bc4ecab79c32d54b6918217f967fdf4c5d7ce6  e2e/helpers/translations.ts
  1438490ea69c8c95f1f2f30a5d6e51065d59a2d9b5d98a857731496b2f467843  public/i18n-usage.json
  b6bb77eb5f5932c7b8362f3e96cf5e26b0c524fb8b92e12a9b293c75f272c27b  roadmap.md
  0525546d131e768e7499a8ee97c9a678ccff4f5152be13160eb0a49e1e54a637  src/features/admin/translations/data-scope.tsx
  3ca297b8cc870a157579f34e77a976ee913623e535bbeaa037b972452361de40  src/features/admin/translations/strings-page.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 671 passed (109 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(b).
- The 11 sha256sum lines and the brief's.
- `git diff --name-only 4913e366` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 4913e366 HEAD` too. Expect the 11 carrier paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Send the executor nothing until the supervisor reads CI on the final commit; then Publish and walk.
```
