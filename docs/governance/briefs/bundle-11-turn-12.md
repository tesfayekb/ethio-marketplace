# Bundle 11 — group 2, turn G2a: Admin › Users and Admin › Roles on the agreed blocks and the agreed look: brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — GROUP 2, TURN G2a (2026-10-11). ONE TURN. No migration, no database change, no package change, no new string.
Base: dev 46f5549c02cae1b8a19d095b3408d8601d0fa37d. This file is public: it is written as build instructions. Tier A pages (users and roles), restyled only: every door, permission and step-up stays as it is.

ANSWERS TO TURN V2c
- Verified by diff of 5f688c28..46f5549c: the 18 carrier paths and the brief, each byte-identical to the supervisor's copy. Your report matches (no key moved, so the maps stayed unchanged; the browser run unavailable, INC-506).
- CI on 46f5549c (run 38113854515): FAILURE by one test, PW-144 (e2e/post-wizard-bundle2.spec.ts, mobile-360, shard 2 — `post-step-8` not visible after Next from the contact step, on both attempts). It is INC-449's open class (Next from step 7 does not reach step 8: PW-57, PW-137, PW-144), and turn V2c touched no posting file. Do not touch it in this turn: the supervisor reads its cause now, and its fix rides the next brief. Every other job passed (1,502 tests; one retried pass, CT-43).

WHAT THIS TURN BUILDS (D118, D128, D132 — the agreed blocks; the v2 boards approved "as drawn, for all")
- PART 1 — ADMIN › USERS (src/features/admin/users/users-list.tsx; src/routes/admin.users.tsx).
  - The header (TableActions, `users-header`): the page's heading "Users" (it moves from the route into the header). No header action: accounts are opened by their owners and changed on their own page.
  - The toolbar (TableToolbar, `users-toolbar`): search (`users-search`, unchanged); Filters (`users-filters`) with two rows of pills — the status (`users-status-filter`: All, Active, Deactivated) and the role (`users-role-filter`: All, then every role by its display name); Columns (`users-columns`, the name locked); the chips under it (`users-chips`). The role stays in the URL (INC-073): choosing a pill writes `?role=`, a deep link chooses the pill, and the URL's role is a pill before the roster loads (INC-106). The status stays page state.
  - One card per user below lg: the name, the email under it, Country, Roles (only when the user has one) and Joined as facts, the status pill at the end (soft green Active, soft red Deactivated; roles as soft grey pills). The whole row opens the user's page; the row has no action buttons.
  - The footer (DataTablePagination, `users-pagination`): the range, rows per page (10, 25, 50, 100, kept in this browser under `ethio.admin.users.pageSize`) and the pages. The server still pages the roster (`admin_list_users`, limit and offset). The old "{n} users" line and the Previous / Next buttons are gone.
- PART 2 — ADMIN › ROLES (src/features/admin/roles/roles-list.tsx; src/routes/admin.roles.tsx).
  - The header (TableActions, `role-header`): the page's heading "Roles & Permissions" and Create role (`role-create-open`, only with `roles:create`) as its one action; the page's line under it (`role-subtitle`). Both move from the route into the list.
  - Create role opens the existing create form (`role-create-form`, unchanged: step-up, name, display name, description) under the header, and closes it again; Cancel closes it. The old card that held only the button is gone.
  - The toolbar (`role-toolbar`): Columns only (`role-columns`, the key locked) — a short roster, so no search and no filter.
  - One card per role below lg: the key, the display name under it, Members and Permissions as facts, the kind pill (System or Custom, soft grey) at the end.
  - The row's three-dots (RowActions, `role-actions-<name>`): View members (`-more-members`), which opens the Users list with the role chosen. The whole row opens the role's page, where permissions are changed and a custom role is deleted (RP-9) — no Delete on the row.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- Users has no header action, and no Edit or Delete on its rows: the row opens the user's page, where every change already lives (with step-up and audit).
- Roles keeps Delete on the role's page only, behind its typed-key confirmation (RP-9); the row's three-dots holds View members.
- Roles has no search and no filter: the roster is a handful of roles.

TESTS
- e2e/admin-users.spec.ts:
  - AU-13 new: the heading in the header; the toolbar's order (search, Filters, Columns); both rows of pills with All chosen and the admin role offered; the name locked in Columns; the page size kept across a reload.
  - AU-2: the status is chosen by its pill (open Filters, tap Deactivated, Escape) and its chip shows.
- e2e/admin-roles.spec.ts:
  - RP-16 new: the heading and the line; Create role opens the form and closes it again; the key locked in Columns; a role's three-dots → View members opens the Users list with the role chosen.
  - RP-10: the chosen role is read from the Users list's chip and pill (a new helper in the file, `expectRoleChosen`), and the count from the footer's range ("1–1 of 1"), in both its halves (the link and the deep link).
  - The helper `isMobile` is imported from e2e/helpers/ui.ts.
- RP-16, not RP-13: RP-13 to RP-15 are return-path tests (the test-id guard, INC-536).
- Not edited: shell-table-law.spec.ts (it types in `users-search`, unchanged), the user and role detail specs, i18n-coverage.

DOCS
- admin-users.md and admin-roles.md: a G2a section each; the changelog; the roadmap (line 3; the G2a, G2b, Listings console (D134) and look (D135) lines).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn V2c applied)
- typecheck, format, lint (0 errors, 33 warnings), 634 unit tests (99 files) including the test-id guard, the usage maps, the hardcoded-string scan, the DataTable min-width guard, the import, browse and marketplace guards, the selector self-test, the build and the bundle budget: all clean.
- A local render (Chromium, a node build, mocked rows) of Users and Roles at 360, 768, 1024 and 1280 px: no sideways scroll; on a phone one card per user (name, email, Country, Roles, Joined, the status pill) and per role (key, display name, Members, Permissions, the kind pill, the three-dots); from lg one card holding the toolbar, the table and the footer; the Filters sheet with the two rows of pills and "Show 4 results" greyed until a choice.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-12.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect Commit `46f5549c02cae1b8a19d095b3408d8601d0fa37d`, Conclusion **FAILURE** — the one red is PW-144, below). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-12.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 10 files → each equal to:
  7866a9d04d24b6bb459ddcbc23d1cc97894f36ef2a599e1b1049aa8185cd96e5  docs/_changelog.md
  10785a8945f4d0352b1db5577d2cae6c3840480b31ad070df5374919430759c3  docs/features/admin-roles.md
  d646660874aa8fee132aed876dbf9d4b099886dbc1d779b0becf1460c8f94342  docs/features/admin-users.md
  b20262300fd2e00d8479a8da739b4d93d2c4abe651538a13217c02405227ef16  e2e/admin-roles.spec.ts
  2709951a53bfded938f0bfeabfdfab125a14f37ca391b227ab41a45534082f3f  e2e/admin-users.spec.ts
  38c755868db4a1b51c521e85f3711035cf684441138d0f56b391a988cfa05d98  roadmap.md
  c4176ab34e3ec4c8b287929ae465a8a1cb26ef7bfaf36aa9a5435b2f5216800d  src/features/admin/roles/roles-list.tsx
  39c0c35feb448f1f32ce9d950127bf04964d84ec121cdcf6d6253c47e8bbf9d0  src/features/admin/users/users-list.tsx
  bcac5a95a327025ee198294cad4a4e12d938a6927893119ea1a7d91daab2bc70  src/routes/admin.roles.tsx
  f5733d984a3138c836bf9a4ddf30e5d6dcb9b57b7aeb33203cee701a5342359c  src/routes/admin.users.tsx

THE CARRIER — G2A-TURN-CARRIER-2026-10-11.md (34,193 bytes; sha256 e4b5c4dae3bae6ea256a85d8746ae712f56d5ed6b2059ed05861e859704dd896; 25 sections)
- Its first line starts "G2A TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (keys moved between lines and files), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 12 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  b1b7697ff85770daa24a8f65ffddf2a7c0057ce39a69f00b856f52984e2bed25  docs/_changelog.md
  41e8adf678ff76da6b7df76cee32934634197a449aa277a74c9b46aa19b3d69d  docs/features/admin-roles.md
  daa2e8c1c99fb49486b51769b3ce048c9be883758962161a6fa01f9e4ddd6931  docs/features/admin-users.md
  28204c8a4c526ab3bb928ef9a99705f560d87607f90e5dfe01b6daff5bce0cad  docs/generated/i18n-usage.json
  73279639d6a81ca1b961d3fa5607c6d748076a1f9cb5b5961d48b646fc9d1d51  e2e/admin-roles.spec.ts
  d63c08ee01497a3341d333e781b3b95adf5e36b15e01f16b2e28ae6bd90282a1  e2e/admin-users.spec.ts
  28204c8a4c526ab3bb928ef9a99705f560d87607f90e5dfe01b6daff5bce0cad  public/i18n-usage.json
  436debb4b78570a1b3de2ca5163049625bd155048f5d391df807e9e0397419c9  roadmap.md
  b1fad45c1257a39092c8e8e9b861a8ab227ffdcce3065e026a34ced73183561c  src/features/admin/roles/roles-list.tsx
  8e17691990d7a1155d7f329d526fbd802dafd81bc458dae2ceec40dd5735f568  src/features/admin/users/users-list.tsx
  7869efcbc95bd5bfc13d8e5a4f4c6236840d563a9b351cbed7cbfbe4af4d6bf6  src/routes/admin.roles.tsx
  2dc86ecc5585be746e02571c7e5563afb592ba798c3854b5f917d5e4cc416339  src/routes/admin.users.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 634 passed (99 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/admin-users.spec.ts e2e/admin-roles.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a) and (b).
- The 12 sha256sum lines and the brief's.
- `git diff --name-only 46f5549c02cae1b8a19d095b3408d8601d0fa37d` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 46f5549c02cae1b8a19d095b3408d8601d0fa37d HEAD` too. Expect 13 paths: the hashed paths and the brief.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the supervisor's walk lines.
```
