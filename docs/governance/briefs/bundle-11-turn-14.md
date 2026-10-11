# Bundle 11 — group 3, turn G3a: every table's footer (Roles, the impersonation view's listings, Languages) and the Languages roster's header and Columns: brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — GROUP 3, TURN G3a (2026-10-11). ONE TURN. No migration, no database change, no package change, no new string.
Base: dev 6e0555891f5dbd1a0d2afbfd7a5bab1d7c0a8ef5. This file is public: it is written as build instructions. Tier A pages (roles, impersonation, translations), presentation only: every door, permission and step-up stays as it is.

ANSWERS TO TURN G2b
- Verified by diff of 6694c76b..6e055589: the 17 carrier and map paths and the brief, each byte-identical to the supervisor's copy. CI on 6e055589: SUCCESS, promoted (no failure, no retried test).

THE OPERATOR'S WALK OF TURN G2a (2026-10-11)
- Passed: Users' heading, toolbar, cards, Filters pills with the role in the address, the footer; Roles' heading, Create role, cards, View members.
- To fix: "I don't see page count, pagination line in roles and permission table on large screens as well in small." The census of every DataTable found two more without the footer: the impersonation view's listings and Languages.
- Also asked: "make sure all these are secure, not seen without proper role, auth, and no security issues at all at different levels." Read and answered: the /admin layout draws a section only with the panel permission and the section's own; every read door re-checks the same permission and refuses; every write needs its own permission and step-up; the deny cases are proven in CI (AU-1, the roles refusal, AS-1, IMP-3). This turn changes no access rule.

WHAT THIS TURN BUILDS
- PART 1 — EVERY TABLE HAS ITS FOOTER.
  - src/components/shell/use-kept-page.ts (NEW): `useKeptPage(storageKey, defaultSize = 25)` — a table's page and its page size, the size kept in this browser (read after mount; storage that fails keeps the default); it returns `pageSizeOptions` (10, 25, 50, 100).
  - src/features/admin/roles/roles-list.tsx: the footer (`role-pagination`: the range, rows per page kept under `ethio.admin.roles.pageSize`, the pages), client paging.
  - src/features/admin/impersonation/use-impersonation.ts and impersonation-view.tsx (INC-546): `useImpersonatedListings(sessionId, limit, offset)` pages through the door (`impersonated_list_listings` p_limit, p_offset; its `total_count` is the footer's total); the view's footer `impersonation-listings-pagination` (size kept under `ethio.admin.impersonation.pageSize`). Before this the view drew the first 25 with no way past them.
- PART 2 — THE LANGUAGES ROSTER (src/features/admin/translations/languages-page.tsx; D128, D132)
  - The page's heading ("Translations") in the header (TableActions, `lang-header`); its line under it.
  - Columns (`lang-columns`; the language locked), each named by its column's plain word (the headers carry tooltips).
  - The footer (`lang-pagination`): rows per page 100 by default (kept under `ethio.admin.languages.pageSize`) — the order is set by hand, so the whole order stays on one page.
  - Unchanged in this turn: the move controls, Open, Delete, the switches and the cards (the roster's full house-style turn comes with Strings and Data scope).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- Languages opens at 100 rows per page, so its hand-made order is never split across pages.
- One shared hook for the kept page size; the pages that already keep it their own way (Countries, Places, Users, Audit and others) move to it in Part C.

TESTS
- Unit, NEW src/components/shell/use-kept-page.test.ts: KP-1 (first page at the default; a chosen size kept and read again; a new size returns to the first page), KP-2 (a stored size that is not an option, or storage that throws, keeps the default).
- e2e/admin-translations-console.spec.ts — TR-38 new: the heading in the header, the language locked in Columns, the footer's range and its 100 rows per page, no sideways scroll.
- e2e/admin-roles.spec.ts — RP-16: two lines (the footer's range; 25 rows per page).
- e2e/admin-audit.spec.ts — IMP-1: one line (the listings' footer).
- Not edited: TR-1, TR-2 and every other translations test (the rows, the move controls and the cards are unchanged).

DOCS
- display-primitives.md: "Every table has its footer"; admin-roles.md, admin-audit-security.md: one line each; translations.md: the G3a section; the changelog; the roadmap (line 3; the G3a line; the Listings console's line with D136).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn G2b applied)
- typecheck, format, lint (0 errors, 33 warnings), 640 unit tests (101 files, the test-id guard included), the usage maps, the hardcoded-string scan, the DataTable min-width guard, the import, browse and marketplace guards, the selector self-test, the build and the bundle budget: all clean.
- A local render (Chromium, a node build, mocked rows) of Roles at 360, 768, 1024 and 1280 px: no sideways scroll; the footer "1–4 of 4", rows per page 25 and the page under the table and under the cards.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-14.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect Commit `6e0555891f5dbd1a0d2afbfd7a5bab1d7c0a8ef5`, Conclusion **SUCCESS**). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-14.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 13 files → each equal to:
  b636c82babbfc96d774c6160483273ea39f52ae13e32e9e6243b6a9d006b3924  docs/_changelog.md
  6182d9c93289270a4e8479b24697ec2073374247f1e7adaee2ca496f9a229183  docs/features/admin-audit-security.md
  84377bf847da84dd38a6cad4be476f3681c76581054b8c7cad4629ed506f6946  docs/features/admin-roles.md
  7b994aba3c2874802ef0d784baaace91c0b224c66d9731b7dd2b5a2b8e518d60  docs/features/display-primitives.md
  fa5ffc52daa7b0348df87d892081c8c6a34e9a374f9347b1b9358ec18945d8c4  docs/features/translations.md
  958533f3666a56a7364f30c28bb78e63c954fbc128f24f31d1c5c5b7ae8c5c07  e2e/admin-audit.spec.ts
  73279639d6a81ca1b961d3fa5607c6d748076a1f9cb5b5961d48b646fc9d1d51  e2e/admin-roles.spec.ts
  aeaf59806c29282acec896722ca5deafd9b90a630d2a813bcf6bd5a4d83cbb39  e2e/admin-translations-console.spec.ts
  d27b9d42341019946733c8303a225949b66ebb2b7a2c89dba094822ec5b59678  roadmap.md
  5690bca62eca97d138f8f910758133d631b7f8c2ec8ff5eeb553543bab1057a8  src/features/admin/impersonation/impersonation-view.tsx
  ada0d1eef22bc42a0a89aee88b69305eb0dc07f8ce96b1e3ea1205a810061b5d  src/features/admin/impersonation/use-impersonation.ts
  b2bd705a7c3ee91951c33676f572cfa1dec3108b68b44224864b6057fa7c43d1  src/features/admin/roles/roles-list.tsx
  cb8d72d3f8ebbf358979d0a0c013f0fbf176703f98af3cabcfbe073ae0ad19ff  src/features/admin/translations/languages-page.tsx
- (c) `ls src/components/shell/use-kept-page.test.ts src/components/shell/use-kept-page.ts` → "No such file or directory" for both.

THE CARRIER — G3A-TURN-CARRIER-2026-10-11.md (16,512 bytes; sha256 5cfcfc5c62ced15d219ba46f20a492833ed2b35430b73ae4bfb8b6b6829db3f9; 30 sections)
- Its first line starts "G3A TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 17 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  05a5c8d3355bf40bcad589245278c651db774149179ceaaf897cf0e708695303  docs/_changelog.md
  4b014d5c8da1da8ffdb919b7440c3873270e9e344af719b33ef66fd23c777c7e  docs/features/admin-audit-security.md
  b854e3fa7d569fbb3f3233971319eb13f3a4494acd98e0d03b202c73bb9cfae5  docs/features/admin-roles.md
  c50dd50b80403430e23acc481e06c4b37fad7a00e24231ceb3ffdbccb359903a  docs/features/display-primitives.md
  1ddbcbd80a2953faf2a0bd2878f26506e7274d6bf3dd34e24f1dc5249812c583  docs/features/translations.md
  eb5fcbf72ff95c5fcdd7ca3b8850c10af7042ad119f7524ddd610505d7d722ff  docs/generated/i18n-usage.json
  4d96bd50c2f91e407ca2853de924f6c6ceaadab91fd7cc878bb1738f7bc3d081  e2e/admin-audit.spec.ts
  9439ead7eedfe8f154cf2287d26dbd3c1a1f1f820acd2c412b7d8b0cd04593a0  e2e/admin-roles.spec.ts
  f89a181c3aa0edf730c68a5c7b5feedaddc88e0b02bd7816592a315db370f365  e2e/admin-translations-console.spec.ts
  eb5fcbf72ff95c5fcdd7ca3b8850c10af7042ad119f7524ddd610505d7d722ff  public/i18n-usage.json
  6e5101ef344b8dd90c4e162a413019a4249938f312209e5783c191198957744c  roadmap.md
  972334bd45ee9405ef7ff2700bd9f378d35cdb554f1a2dab66df1deed2782dcd  src/components/shell/use-kept-page.test.ts
  fdae463f36411b7782f2366f40d221ca711dabc5e53dab136515d48c0e7579e2  src/components/shell/use-kept-page.ts
  2ec983f6011680fea2686a382b759ef11bb1d5be840755e955426ee5c6de464a  src/features/admin/impersonation/impersonation-view.tsx
  5040e3f757033ac7cddb5b8af6f920927cf38d0eb64a973c5424582b1c234cf1  src/features/admin/impersonation/use-impersonation.ts
  7146788a9cd9bc6dfb5b98a0676bb9dc7a9b1f653c00e8db9edade3087bb959c  src/features/admin/roles/roles-list.tsx
  efafa27bde291739df62e5d1afa14572a607c0502d7f0ed7de29f4ace67ce887  src/features/admin/translations/languages-page.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 640 passed (101 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/admin-roles.spec.ts e2e/admin-translations-console.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 17 sha256sum lines and the brief's.
- `git diff --name-only 6e0555891f5dbd1a0d2afbfd7a5bab1d7c0a8ef5` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 6e0555891f5dbd1a0d2afbfd7a5bab1d7c0a8ef5 HEAD` too. Expect 18 paths: the hashed paths and the brief.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the supervisor's walk lines.
```
