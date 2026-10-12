# Bundle 11 — Part C, turn C1: the agreed tables' rules and their check: brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — PART C, TURN C1 (2026-10-12). ONE TURN, NO MIGRATION. One string changed in Amharic (below). No package change.
Base: dev e1c251c1fc9aaff4d051abc71c6f1c8e1615290a. This file is public: it is written as build instructions. Tier B: the admin tables' page-size state, the check and its tests, the docs. Tier A stays untouched: every door is called exactly as before.

ANSWERS TO THE LAST TURN
- Turn L4d: verified (dev e1c251c1 holds the delivered tree, the brief as sent, and the migration as sent with mark 20261012170000). Its CI run waits at the preflight until the operator applies the migration on ethio-staging; the supervisor reads that run while you work, and a fix it needs comes in the next turn.
- Turn G3e: CI run 38200921488 on b6aa7bc5, SUCCESS; main promoted to b6aa7bc5.

PART 0 — the operator's Amharic (2026-10-12): `admin.listings.reason.undo` is «ቀልበስ» (was «መቀልበስ»). English unchanged.

WHAT THIS TURN BUILDS — Part C of bundle 11 (D118, D128, D132, DEC-170): one written rule per element of an admin table, and one automatic check that refuses a table built another way
- The rules (docs/features/display-primitives.md, a new section at its end):
  - T1 the page's heading in the header (`TableActions`); a table drawn inside another page takes its host's heading (the Data scope inside Strings);
  - T2 the toolbar (`TableToolbar`: the search, Filters, Columns);
  - T3 Columns (`ColumnsButton` with `useHiddenColumns`);
  - T4 a Filters button's choices as chips (`FilterChips`);
  - T5 the row's actions as `RowActions` (Edit, a red Delete, the three-dots menu) — or, where the row only opens its own details, the toggle of the table's `expandedRow` (Audit's Details);
  - T6 the footer (`DataTablePagination`) with the page size kept in this browser by one hook, `useKeptPage` — no page keeps it its own way (`localStorage`);
  - T7 a phone card with a title (a column with `card: "title"`);
  - T8 tick-boxes (`selection`) only where a bulk action acts on the ticked rows (`selectionActions`; D128).
- scripts/admin-tables.ts (NEW): the check — every admin file that draws a `DataTable` (src/features/admin and every src/features/admin-… folder, tests left out); comments are not blocks; a declared section (`SECTIONS`) is judged T1 through its host. scripts/admin-tables.test.ts (NEW) runs it with the unit tests.
- The baseline reaches zero in this turn, so the check has none. On the base the check refuses eight pages under T6 and nothing else:
  - Users, Audit, Countries, Places (src/features/admin/users/users-list.tsx, src/features/admin/audit/audit-page.tsx, src/features/admin-countries/countries-page.tsx, src/features/admin-locations/locations-page.tsx): their own page-size state, read and write of `localStorage` go; `useKeptPage(PAGE_SIZE_STORAGE_KEY)` in their place (the same keys, so a size a person already chose stays);
  - Attributes and Categories (src/features/admin-attributes/attributes-page.tsx, src/features/admin-categories/categories-page.tsx): the same, and their row offset becomes the hook's page (`offset = page * pageSize`; Previous, Next, a page and every reset to the first page through `setPage`); Categories' reset effect lists the stable `setPage`;
  - Coverage (src/features/admin-coverage/coverage-page.tsx): its size is now kept (`ethio.admin.coverage.pageSize`);
  - Screening (src/features/admin-screening/screening-page.tsx): its size is now kept (`ethio.admin.screening.pageSize`), with its own sizes 25, 50 and 100; choosing a size still clears the ticked rows.
- src/components/shell/use-kept-page.ts: a third, optional argument — the table's own sizes (default unchanged: 10, 25, 50, 100); a stored size outside them keeps the default.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The check runs with the unit tests (like the test-id and action-label checks), so no CI workflow changes.
- Coverage and Screening keep the chosen page size per browser from now on, as every other admin table does.
- A row that only opens its own details (Audit) keeps its Details button: the rule allows the details toggle in place of RowActions.
- The destructive-red rule (every button that performs or confirms a destructive act is red) is Part C's next turn, C2, with its check over the inline removes.

STRINGS (G43 — the Amharic below is what ships; am.ts only)
- admin.listings.reason.undo — en "Undo" · am "ቀልበስ"

TESTS
- Unit, NEW: scripts/admin-tables.test.ts — TBL-1 (a page on every block passes; each missing block names its own rule, T1–T8), TBL-2 (the conditional rules: no Filters asks no chips; a details toggle stands for RowActions; any `localStorage` breaks T6; a commented-out block is not a block), TBL-3 (a declared section takes its host's heading; a host that does not draw it, or an undeclared section, is refused), TBL-4 (the real tree: at least fourteen tables, no refusal).
- Unit: src/components/shell/use-kept-page.test.ts KP-3 (a table's own sizes).
- e2e: none new and none edited. The page-size behaviour is kept, and these read it: AS-3, AU-13 and AT-79 choose a size and find it again after a reload; CT-11 and CT-29 choose a size on Categories; CV-2 and LT-9a read the default 25 (each test starts with empty storage); CO-2 finds the size control.
- Not edited: every other test.

DOCS
- display-primitives.md (the rules and their check), the changelog, the roadmap (line 3; the C1 line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn L4d applied)
- typecheck, format, lint (0 errors, 33 warnings), 681 unit tests (112 files), the usage maps, the hardcoded-string scan, the import, listing-write, browse and marketplace guards, the root-route check, the selector self-test, the build and the bundle budget (231.0 KiB): all clean.
- The check on the base tree: fourteen tables; it refused exactly the eight pages above under T6. On this turn's tree: fourteen tables, no refusal.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-30.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit e1c251c1…; any conclusion). If it shows another commit, STOP and report; whatever its conclusion, go on (the supervisor reads that run, and a fix it needs comes in the next turn). You cannot git-fetch that branch;
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
- Scope — these files only: the 18 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-30.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 14 files → each equal to:
  e4ba88b10bf4557ed98270fa6fc017878464f03771a8cd505efab205c99c117e  docs/_changelog.md
  bede384f13c16e2993648639379998dccee1699c5b03c0649dad2f5f80fb157c  docs/features/display-primitives.md
  e91b1c49cde558918db5231e45d97cdc4aea4f53066e4f8a41b174bb2a3a583e  roadmap.md
  972334bd45ee9405ef7ff2700bd9f378d35cdb554f1a2dab66df1deed2782dcd  src/components/shell/use-kept-page.test.ts
  fdae463f36411b7782f2366f40d221ca711dabc5e53dab136515d48c0e7579e2  src/components/shell/use-kept-page.ts
  b8e2f594afb840118b3015dee784ce481f778cce5aeef27b9c186abfa664e054  src/features/admin-attributes/attributes-page.tsx
  a5144067c316e01470556b3c1bc5cc38d9fd938f9d11faa09ecfb2724e826d68  src/features/admin-categories/categories-page.tsx
  fe69485a1e9e50189b9e01a1f8fc74bfad0b6de325819ea5fa2d7f9c966cf6e2  src/features/admin-countries/countries-page.tsx
  95743448edc91c8ce4ba5b124f6c4d1603b607700630887015cbc8df3c25e232  src/features/admin-coverage/coverage-page.tsx
  2155f4f2df8d34af00f07b99282692c4a328e88cae6565c8b45dc421ffb57e29  src/features/admin-locations/locations-page.tsx
  93c507bff5315843f8d2a2fb56b921043aaa4b30f3eb1f873d29cc604b78f5d1  src/features/admin-screening/screening-page.tsx
  cc87d0ceba64df1ce9b23a2791e53608073b42c24027b3e8a8f9c77706936ea0  src/features/admin/audit/audit-page.tsx
  42ee2af8de1260b62e20bf58599019e7401adc039d619daa6f792c343b0840b3  src/features/admin/users/users-list.tsx
  4c212f7e7ec7fb0cc4a41cf4e8bf91f74b5e29c91427f66259334348e4a70112  src/i18n/locales/am.ts
- (c) `ls scripts/admin-tables.test.ts scripts/admin-tables.ts` → "No such file or directory" for each.

THE CARRIER — C1-TURN-CARRIER-2026-10-12.md (26,326 bytes; sha256 da9b27bde763d8a0166f1a901e9fb1676bb448d2e07bcecabf4e35e7716bda5f; 67 sections)
- Its first line starts "C1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 18 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  19043c8f083e5d8410fde8c5b3a2e7fa0d6f33a5ac542b28c9e32491b303ef2c  docs/_changelog.md
  249b9edff099e03cee86721d7d0b51cad2cb622870b3751e7d3eb5971a3bd2e9  docs/features/display-primitives.md
  6b8b7913c88ddd7da2cd1081953fb783fe0df6af1bcace7d3f48e6a2b138b087  docs/generated/i18n-usage.json
  6b8b7913c88ddd7da2cd1081953fb783fe0df6af1bcace7d3f48e6a2b138b087  public/i18n-usage.json
  6060773c5e5c3e30f0f2222f6fb7033b18540aea91a794bbbf689ce59df6ee55  roadmap.md
  89233a8df53cb3f5d8f073ecd02c6c2a0b6846d9c142a7a1e68d52b1dbec6870  scripts/admin-tables.test.ts
  2cdd372c07bd0ff26c979ac4067633a7cd0048d83d75287e9f92c2c96db59b47  scripts/admin-tables.ts
  d005819a6f193162c68cba84df5d570a8f982945da6fe8e50cbd143e334c0dd4  src/components/shell/use-kept-page.test.ts
  858359d902a663c2122c974fc4b139bf1d3ec460b6d38eeb1346fe93f88452b5  src/components/shell/use-kept-page.ts
  2d36a70939799d270f93870a7dcd1ada1a5cd3cef2b7cfb505c04c4474a548e9  src/features/admin-attributes/attributes-page.tsx
  aab7aca0bfc818f03fbf3f33cbf07b0bb3eb0a10fcb6221d29feab1be955ef32  src/features/admin-categories/categories-page.tsx
  0e9fd5c7970cd3a44a3a76b86b6bac61bb7d7486aef631192fdce1ec39d7de33  src/features/admin-countries/countries-page.tsx
  905021139f13484c2e730769d9ab2cc409a59b99a8cc30beaa022b405d5ed436  src/features/admin-coverage/coverage-page.tsx
  cc204bd64d1dbe0897ef690b1ac06bedf1e6fd91165488d14ad01af6a905b96b  src/features/admin-locations/locations-page.tsx
  6d5650d827213381f7c15a39a4c2e50fcd756dabf7b7704489d56cf7be84d7d2  src/features/admin-screening/screening-page.tsx
  bf75bcb08fd23943b07db28d5dc9ae00da42ed1e298f828bf5f9394f3f94ae92  src/features/admin/audit/audit-page.tsx
  1fe97b4d86047ea8705e15b1a96b76d8a2b9cb6f68d226fe5ef6a61cbfd11627  src/features/admin/users/users-list.tsx
  9279971ace7e9ed1be6c7d4b7b2d1afdb5f06dc72f274f5febec4b957cd5f13a  src/i18n/locales/am.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 681 passed (112 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 18 sha256sum lines and the brief's.
- `git diff --name-only e1c251c1fc9aaff4d051abc71c6f1c8e1615290a` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only e1c251c1fc9aaff4d051abc71c6f1c8e1615290a HEAD` too. Expect the 18 carrier paths and the brief.
- The changed string, key, English and Amharic, as written in am.ts (G43).
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Send the executor nothing until the supervisor reads CI on the final commit; then Publish and walk.
```
