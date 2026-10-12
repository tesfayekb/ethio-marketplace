# Bundle 11 — group 3, turn G3d: the Languages roster on the agreed blocks (DEC-170): brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — GROUP 3, TURN G3d (2026-10-12). ONE TURN, NO MIGRATION. No new strings. No package change.
Base: dev 3c94ec65. This file is public: it is written as build instructions. Tier B: the roster's layout, its row controls and four tests. Tier A stays untouched: every door (the order, the flags, the delete) is called exactly as before.

ANSWERS TO THE LAST TURNS
- Turn G3c2: verified (dev 3c94ec65 holds the delivered tree and the brief as sent); CI run 38187451874 SUCCESS; main promoted. Clean.
- The read-only lease study: received and checked against the code — a lease resets the account in about 21 calls one after another; a leased account that then signs in costs two password grants; four tests lease three (IMP-3, SC-4, SC-8, PR-24). Accepted. The supervisor drafts the change and its decision rule (a DEC) as its own item; nothing of it is in this turn.

WHAT THIS TURN BUILDS — Admin › Translations, the Languages roster, on the agreed blocks
- src/features/admin/translations/languages-page.tsx:
  - the row's actions are RowActions (`lang-actions-<code>`), as every other admin table (DEC-170):
    - Open strings (`-edit`): the language's strings page (it was the "Open strings" link);
    - the red Delete (`-delete`): off for a published language (the door refuses it; turn Public off first); it opens the same typed-confirm dialog;
    - the three-dots (`-more`): Move up (`-more-up`) and Move down (`-more-down`), off under the base language, for the last row, and while a move is in flight — the same rules the arrow buttons had (INC-103: read from the one sorted list);
    - the base language keeps its note (`lang-source-en`) and no actions;
  - the phone card: a languages tile; the language and its code (Base, RTL); the English name under it; the Interface and Content meters as short facts (word, a short bar, the count; same testids); Staff and Public with their names; the gate's line under Public; Open and Delete in the footer, the three-dots in the corner;
  - cards until xl, two to a row from md: the seven columns and the actions need about 56 rem, so between md and xl the table used to scroll sideways inside its frame. The Public column is wider (w-36), so the gate's line no longer breaks inside words.
- src/features/admin/translations/delete-language-dialog.tsx: the dialog is opened by the row's Delete and drawn only while it is open; its result line (`lang-delete-summary`) is handed to the roster and drawn under it, because the deleted row leaves the list. Everything inside the dialog (the counts, the typed code, the red confirm, step-up) is unchanged.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The row's edit is Open strings (a language has no editor of its own; its strings page is where it is edited).
- The order moves live in the three-dots menu, as Categories' moves do.
- A published language's Delete is greyed out (as the old button was).
- Cards until xl, two to a row from md.

TESTS
- e2e/helpers/translations.ts: `langMenuItem(page, code, item)` (NEW) opens a language row's three-dots and returns the entry.
- e2e/admin-translations-governance.spec.ts: TR-20 (the moves through the menu), TR-20m (the phone menu holds both moves; up enabled for the parked fence), TR-31 (the row's red Delete).
- e2e/admin-translations-console.spec.ts: TR-38 extended — the Amharic row shows Open strings, Delete and the three-dots, and Open leads to its strings page.
- Not edited: every other test. TR-2 (the base language's note), TR-6 (the public gate's line), TR-24 (the data meter) and TR-30 (the pseudo-language's public switch) read the same testids, which the card keeps inside the row.

DOCS
- translations.md (the roster on the agreed blocks), the changelog, the roadmap (line 3; the G3d line; a G3e line for Strings and Data scope).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn G3c2 applied)
- typecheck, format, lint (0 errors, 33 warnings), 671 unit tests (109 files), the usage maps, the hardcoded-string scan, the selector self-test, the root-route check, the build and the bundle budget (231.1 KiB): all clean.
- A local render of the page (Chromium, a node build, mocked answers, nothing sent to a database) at 360, 768, 1024 and 1280 px: no sideways scroll at any width; cards below 1280 (two to a row at 768 and 1024), the table at 1280; each row's Open, Delete and three-dots in its region; the menu opened, read and closed three times in a row with both moves visible; Move up off for the row under English, Move down off for the last row; Delete on a published language off; Delete → the dialog with its counts → the confirm off until the code is typed, then on → Escape → the dialog gone → the three-dots open again.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-26.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit 3c94ec65…, conclusion SUCCESS). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
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
- Scope — these files only: the 10 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-26.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 8 files → each equal to:
  97a15c87e89e8623712463b2d146bf57adfa66f60abc0cd5382cc7ee616ad4aa  docs/_changelog.md
  6c26157bbf8ee917836e60302a83b401dfdf737ce18c73fd9fdb9d7a96ffa73a  docs/features/translations.md
  1401ea780443ed9089f80929a375e5b7e35a67a2bedd5826f37f0bd850e3ec50  e2e/admin-translations-console.spec.ts
  e90acc2648e2011de48bed645140c999006852e80165657d51c7fba8c6f37efa  e2e/admin-translations-governance.spec.ts
  ca5c38399c4cdb97d499669895e07d4f53b5f84629b621c27eb021323c9c5eda  e2e/helpers/translations.ts
  47354873369233e1304bf208d42776d0eed0e721b16ae1da7be53e6cb132f223  roadmap.md
  ac45e5841a75d2b497426ed5f47b4295b7b038523a3cc430ac6404eaa4c4ecf5  src/features/admin/translations/delete-language-dialog.tsx
  efafa27bde291739df62e5d1afa14572a607c0502d7f0ed7de29f4ace67ce887  src/features/admin/translations/languages-page.tsx

THE CARRIER — G3D-TURN-CARRIER-2026-10-12.md (20,205 bytes; sha256 75bfb6ef9f9b353b99239cb85ccbfdbe71093aeb85cfe9a7626f33d1e6b05f8b; 38 sections)
- Its first line starts "G3d TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 10 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  83904a7c075d6ac5ed3509bcb7e88f1cdeb0f300e995752d98b74954a12f2608  docs/_changelog.md
  6661643ebfe0f22795714cf16eab90bd9d25c016e79d0aa12734b9946224d960  docs/features/translations.md
  1b486a31ca828dcbc0f09cdccd3c0a56f1c25c0fcf5e3519456d1322ff442be7  docs/generated/i18n-usage.json
  83b0b96fe6ccca267961b9ea8011f665b3238efa253fb64febfea6c0cece590f  e2e/admin-translations-console.spec.ts
  440ac61250cd447e29e16581a2b03251d3e6c590562d0a2ff9ed10a2b5fee2fa  e2e/admin-translations-governance.spec.ts
  836475015220036fc804757909f4bcf46d4e4b7db62f20206eae4c16247a6962  e2e/helpers/translations.ts
  1b486a31ca828dcbc0f09cdccd3c0a56f1c25c0fcf5e3519456d1322ff442be7  public/i18n-usage.json
  6e5cf8e850195fe2ccb80a528e4417e404da230ffe732a4ba079c0af5819eea1  roadmap.md
  f8e3bb2215144fcf67d0db161a3a9906d52864e1f404b21193164c0c14d76b8b  src/features/admin/translations/delete-language-dialog.tsx
  a9da23e482f3681bee27381eb9bf25e6fa49d519ac45b34d4124ad37dafbca31  src/features/admin/translations/languages-page.tsx

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
- The 10 sha256sum lines and the brief's.
- `git diff --name-only 3c94ec65` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 3c94ec65 HEAD` too. Expect the 10 carrier paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Send the executor nothing until the supervisor reads CI on the final commit; then Publish and walk.
```
