# Bundle 11 — group 2, turn G2b: G2a's red, INC-449's fix (the contact step's queued Next), then Admin › Audit and the impersonation view on the agreed blocks: brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — GROUP 2, TURN G2b (2026-10-11). ONE TURN. No migration, no database change, no package change, no new string.
Base: dev 6694c76b96837f00536de6ec84f33306f098adc6. This file is public: it is written as build instructions. Part 0 fixes the red your last turn's CI run showed; part 1 is the posting wizard (Tier B, on the Tier A doors); parts 2 and 3 are Tier A pages (the audit log, impersonation), restyled only: every door, permission and step-up stays as it is.

ANSWERS TO TURN G2a
- Verified by diff of 46f5549c..6694c76b: the 12 carrier and map paths and the brief, each byte-identical to the supervisor's copy.
- CI on 6694c76b: FAILURE — part 0 below (the table law at 768 px, the supervisor's miss; FE-13 beside the weekly feed bench). Every other job passed: 1,556 tests; the guards and the build green.

PART 0 — G2a'S RED (run 38115748403 on 6694c76b: three gating failures)
- shell-table-law.spec.ts, both projects: at 768 px the Users list must show its table (`table` visible — the table law, INC-075); G2a moved the Users list's cards up to lg, so at 768 px the table was hidden. The supervisor's census missed it (it read that file for `users-search` only). Fix: src/features/admin/users/users-list.tsx and src/features/admin/roles/roles-list.tsx drop `cardUntil="lg"` — the cards give way to the table at md, as before G2a (the `userRow` / `roleRow` helpers read cards below 768 px). The test is not edited.
- feed-index.spec.ts FE-13, desktop-1280: `feed_index_check_sweep` hit the statement timeout on ethio-staging ("canceling statement due to statement timeout"). Not this code: the weekly feed bench ran on ethio-staging from 05:24 to 05:51 UTC, beside this run. Nothing to change in this turn; the supervisor records it.
- One retried pass: CT-18 (desktop-1280).

PART 1 — INC-449: A NEXT PRESSED WHILE THE CONTACT STEP IS READING IS NEVER LOST (the CI red of turn V2c: PW-144; the same class as PW-57 and PW-137)
- The cause, read in src/features/posting/wizard.tsx (the click handler that queues a Next while the gate is pending; `onWhoGate`, which judged the queue from its own closure) and src/features/posting/step-who.tsx (the gate reported from an effect through a ref set at render):
  1. The lost press: when the seller's identity answered just before the press and the step's effect ran just after it, the effect called the callback from the render before the press, saw no queue and only opened the gate; nothing judged the press again, so Next did nothing.
  2. The stale gate: the wizard kept the gate after the step closed, so on the next visit it read "open" until that visit reported "pending"; a press in between ran the step's claim with the names not loaded yet and was refused.
  Both are defects a seller can meet (a quick press does nothing), not only test defects; neither window can be forced from a browser.
- The fix: src/features/posting/queued-next.ts (NEW) — `useQueuedNext` holds the gate and the queue; ONE effect over both judges the queue whichever arrives last (open: Next goes; blocked: the refusal count; pending: it waits), exactly once; a second effect sets the gate back to pending and drops any queue on every other step. src/features/posting/wizard.tsx uses it; its `whoGate`, `whoQueued` and `onWhoGate` go. step-who.tsx is not changed.
- The decision rule, frozen now: INC-449 closes when PW-57, PW-137 and PW-144 have no matrix-lane line in the flake ledger in the seven days after this turn lands; one line reopens it.

PART 2 — ADMIN › AUDIT (src/features/admin/audit/audit-page.tsx; D118, D128, D132)
- The header (TableActions, `audit-header`): the page's heading "Audit & Security"; no header action. The four figures and the chart stay under it, unchanged.
- The toolbar (TableToolbar, `audit-toolbar`): search (`audit-search`, unchanged); Filters (`audit-filters`) with two rows of pills — the action (`audit-filter-action`) and the entity type (`audit-filter-entity`): All, then every value the log holds — and the From and To dates (`audit-filter-from`, `audit-filter-to`, labelled, inside the sheet); Columns (`audit-columns`, the action locked); the chips (`audit-chips`; a date chip reads "From 2026-10-11").
- One card per event below md (cardUntil stays md): the action, the actor under it, Time and Entity as facts; Details (`audit-expand-<id>`, unchanged) in the card's footer, the details inside the card (turn V2c); the raw details line stays in the table only.
- The footer (`audit-pagination`): the range (10,000+ past the cap, INC-129), rows per page (10, 25, 50, 100, kept under `ethio.admin.audit.pageSize`) and the page numbers. The server still pages the log.

PART 3 — THE IMPERSONATION VIEW (src/features/admin/impersonation/impersonation-view.tsx)
- The header (TableActions, `impersonation-header`): the heading ("Viewing as …") with the countdown (`impersonation-countdown`) beside it.
- The read-only note and End now (`impersonation-end`, red) stay as they are.
- The seller's listings: Columns (`impersonation-listings-columns`, the title locked); one card per listing below md (the title, its status as a soft grey pill — `impersonated-listing-<id>-status` — Price and Created as facts).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The audit log keeps its cards up to md (not lg like Users and Roles): its five columns fit a tablet with the details line hidden, and its test helper reads the cards below 768 px.
- The dates sit inside Filters with the pills (a bottom sheet on a phone, which a focus change never closes — INC-543), not on the toolbar.
- End now stays in the note card under the header: it is the page's own control, not a table action.

TESTS
- Unit, NEW src/features/posting/queued-next.test.ts: QN-1 (a queued Next goes once the gate opens, once), QN-2 (the press and the gate's answer in the same moment, both orders: it still goes, once), QN-3 (blocked refuses; pending waits), QN-4 (away from the step the gate is pending again and a queued Next is dropped).
- e2e/post-wizard-bundle2.spec.ts — PW-185 new: after a first pass to review, every identity read after Back is held at the network; Next pressed on the contact step stays there; released, the step reaches review with no identity call.
- e2e/admin-audit.spec.ts — AS-3 new: the heading; the toolbar's order (search, Filters, Columns); both rows of pills with All chosen; a From date as a chip, removed; the action locked in Columns; the page size kept across a reload. IMP-1: two lines (the header's heading; the listings' Columns).
- Not edited: shell-table-law.spec.ts (part 0 makes it pass again); FE-13; PW-57, PW-137, PW-144 (the judge above watches them); AS-1, AS-2 (search, Details and the card adjacency hold); IMP-2, IMP-3.

DOCS
- admin-users.md and admin-roles.md: one line each (the md breakpoint); posting.md: "INC-449 — a Next pressed while the contact step is reading is never lost"; admin-audit-security.md: the G2b section; the changelog; the roadmap (line 3; the G2b line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn G2a applied)
- typecheck, format, lint (0 errors, 33 warnings), 638 unit tests (100 files), the usage maps, the hardcoded-string scan, the DataTable min-width guard, the import, browse, listing-write and marketplace guards, the selector self-test, the build and the bundle budget: all clean.
- QN-1 to QN-4 written against the hook's contract; PW-185 cannot be shown red from a browser (the windows are one effect flush wide), so it stands as the positive control and the seven-day judge decides.
- A local render (Chromium, a node build, mocked rows) of Audit at 360 and 1280 px: no sideways scroll; the figures, the chart, one card per event with Details opening inside its card; the Filters sheet with the two pill rows, the two dates and "Show 3 results" greyed until a choice; from md one card holding the toolbar, the table (the details joined to their row) and the footer.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-13.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect Commit `6694c76b96837f00536de6ec84f33306f098adc6`, Conclusion **FAILURE** — part 0 is its red). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-13.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 13 files → each equal to:
  b1b7697ff85770daa24a8f65ffddf2a7c0057ce39a69f00b856f52984e2bed25  docs/_changelog.md
  f1f4db05529fb0b232c7e8ab7e3517ab5b2da5caa27e54d54cfb29ee40c8daa4  docs/features/admin-audit-security.md
  41e8adf678ff76da6b7df76cee32934634197a449aa277a74c9b46aa19b3d69d  docs/features/admin-roles.md
  daa2e8c1c99fb49486b51769b3ce048c9be883758962161a6fa01f9e4ddd6931  docs/features/admin-users.md
  28b7aa7d44f3c2a8ccea582edc7b97a02a0d07896506139cda9c6cebf1a8d4b9  docs/features/posting.md
  112095a607d420a09bde7cf960dc61acb05787ec357c87a3ee5e648c8a1f80da  e2e/admin-audit.spec.ts
  4191c21cd2ff309c17943b8b6259793e27f1922f7fa1631555568431e365f084  e2e/post-wizard-bundle2.spec.ts
  436debb4b78570a1b3de2ca5163049625bd155048f5d391df807e9e0397419c9  roadmap.md
  9fdfd398dabf0f8ef3a3288b651aabcf11b9499b2a4ad1268489058fb19f6189  src/features/admin/audit/audit-page.tsx
  740ba7a909e2af6c5e740312e8b5d3f2c5824bed14ab72e15606d718ccf4aa22  src/features/admin/impersonation/impersonation-view.tsx
  b1fad45c1257a39092c8e8e9b861a8ab227ffdcce3065e026a34ced73183561c  src/features/admin/roles/roles-list.tsx
  8e17691990d7a1155d7f329d526fbd802dafd81bc458dae2ceec40dd5735f568  src/features/admin/users/users-list.tsx
  27913957ace9aa2ab46ee3285e17fb2dd7fe4a5a1fdf3501cbbd52962b61b485  src/features/posting/wizard.tsx
- (c) `ls src/features/posting/queued-next.test.ts src/features/posting/queued-next.ts` → "No such file or directory" for both.

THE CARRIER — G2B-TURN-CARRIER-2026-10-11.md (40,092 bytes; sha256 b65e920074ffd9344c7883b84ebde65455863884c98638b2add36d87186cdf36; 41 sections)
- Its first line starts "G2B TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
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
  b636c82babbfc96d774c6160483273ea39f52ae13e32e9e6243b6a9d006b3924  docs/_changelog.md
  6182d9c93289270a4e8479b24697ec2073374247f1e7adaee2ca496f9a229183  docs/features/admin-audit-security.md
  84377bf847da84dd38a6cad4be476f3681c76581054b8c7cad4629ed506f6946  docs/features/admin-roles.md
  d91c978f9e51a3da17ff5e17606ac0eec178a0251139f655471eb434eb1b456e  docs/features/admin-users.md
  787c11022e96607b6bacd416893a61c52176153c5f99a361d7fe81e2cef5f70f  docs/features/posting.md
  c30e9780e49346ee4d3ad047484e6cb79ee54b7b1e70b774d281eeb82ae75140  docs/generated/i18n-usage.json
  958533f3666a56a7364f30c28bb78e63c954fbc128f24f31d1c5c5b7ae8c5c07  e2e/admin-audit.spec.ts
  090b46d35599202f501b4d1ef6a86ecc13d44a09c6ae500308e3b4693fc3c9fc  e2e/post-wizard-bundle2.spec.ts
  c30e9780e49346ee4d3ad047484e6cb79ee54b7b1e70b774d281eeb82ae75140  public/i18n-usage.json
  d27b9d42341019946733c8303a225949b66ebb2b7a2c89dba094822ec5b59678  roadmap.md
  3db0f7ae88b6291c4f400e0e52e141cc4298d24eb9d793a58b4d5486588af7cc  src/features/admin/audit/audit-page.tsx
  5690bca62eca97d138f8f910758133d631b7f8c2ec8ff5eeb553543bab1057a8  src/features/admin/impersonation/impersonation-view.tsx
  b2bd705a7c3ee91951c33676f572cfa1dec3108b68b44224864b6057fa7c43d1  src/features/admin/roles/roles-list.tsx
  42ee2af8de1260b62e20bf58599019e7401adc039d619daa6f792c343b0840b3  src/features/admin/users/users-list.tsx
  9b02b590adb6782e3cca1e8ef26006d017c917a32457b61345e0038284cce4e8  src/features/posting/queued-next.test.ts
  2c7405c4d0893aa6a238ef2e8388dda15552c7891a7a79a896ca77c2809b568a  src/features/posting/queued-next.ts
  0f665ca2de1d6c01db7feb75087a329ab8b144ca10dfc5915f18bad3c3ac5e26  src/features/posting/wizard.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 638 passed (100 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/shell-table-law.spec.ts e2e/post-wizard-bundle2.spec.ts e2e/admin-audit.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 17 sha256sum lines and the brief's.
- `git diff --name-only 6694c76b96837f00536de6ec84f33306f098adc6` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 6694c76b96837f00536de6ec84f33306f098adc6 HEAD` too. Expect 18 paths: the hashed paths and the brief.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the supervisor's walk lines.
```
