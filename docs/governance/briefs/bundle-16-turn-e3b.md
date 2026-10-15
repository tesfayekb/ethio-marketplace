# Bundle 16 — turn E3b: the preview shows the saved edit at once (INC-649): brief, version 1 (saved unchanged, 2026-10-15)

```text
BUNDLE 16 — TURN E3b (2026-10-15). ONE SHORT TURN: ONE SCREEN FIX, ONE UNIT TEST, DOCS. No migration. No string. No package change. No browser test is written or changed.
Base: dev b685b03d (turn S3). The census below proves every file by content. This file is public: it is written as build instructions.
Tier B: the screen. Tier C: the docs and the changelog.

ANSWERS TO THE LAST TURN
- Turn S3 is verified on dev b685b03d ("Turn S3 bundle-16 done"; the platform's commits 6d025127, 2b94bb7d, 84b7c9c3, 83b36c62 during the turn): the 15 carrier paths and the brief equal the supervisor's copy byte for byte; the migration file 20261015204631_c99005e8-… equals the brief's appendix with mark 20261016090000 (the floor applied, as the rule says: 22:00 UTC was below it); its read-back (mark present; rate_gate 46e6531d…, has_permission 9e59992b…, grants f | t | f) matches the brief. AU-3, AU-5, AU-14, PR-51 and SO-8 are as the brief described them: the bearer client built as PR-47 builds its client, the `finally` blocks that set the leased accounts back to active, the options route's 401, the regex over both gates in AU-14. The e2e diff you did not paste was read on dev (164 added, 13 removed) — no need to paste it next turn. CI on b685b03d (run 952) is the supervisor's read; its verdict, if red, comes with the next prompt (DEC-181). The operator applies the migration on ethio-staging (apply c99005e8 → expect mark 20261016090000); until then a red whose only failures are the E2E preflight and its dependents is that step, not a defect.
- Nothing is owed from S3.

WHY THIS TURN — INC-649 (the supervisor's own E3 code; SC-25 red twice on eee5d6cd)
- After Edit inside Screening's preview → Save, the save lands and Approve and Reject come back, but the preview keeps showing the ad's OLD words: the sheet waited for the queue's fresh read to replace its row, and the edited ad is not always on the page that read returns (its `updated_at` moves it down the queue). A reviewer would correct a title and see the old one. SC-25 timed out on exactly that (`listing-detail-title` kept "e2e-screen-1-fctj5v" for 10 s).
- The fix (G28's rule: a shared list is never the proof of one row): the preview takes the saved change AT ONCE from the changes the door took; the queue's fresh read still replaces it when the ad is on the page.

WHAT THIS TURN BUILDS (the carrier)
- src/features/admin-screening/use-screening.ts — `editedScreeningRow(row, changes)`: the previewed row with the title, the description, the answers and the price keys the edit form sends (the door's names: `title`, `description`, `attributes`, `price_mode`, `price_amount`, `price_currency`, `price_period`, `price_bp`, `price_negotiable`) merged in; a shape the door would have refused is left alone.
- src/features/admin-screening/screening-page.tsx — after `answer.ok`, `setPreviewRow(editedScreeningRow(current, changes))` before the queue is re-read.
- src/features/admin-screening/use-screening.test.ts — SF-5.
- docs/features/admin-screening.md (the Save line), the changelog.
- No test of yours: SC-25 stands as written and is expected green on this commit.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The optimistic row is a display until the fresh read arrives; the door stays the authority (F3).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev b685b03d with this turn's carrier files)
- Clean: typecheck, format, lint (0 errors, 33 warnings), 913 unit tests (157 files), the hardcoded-strings guard (0 findings). No string changes: the usage maps are unchanged.
- Not run by the supervisor: the browser tests. CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-e3b.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts or src/integrations/supabase/types.ts since the base, name the difference and go on (neither is in this turn's carrier);
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header, reading each file whole before any file is opened for writing. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 5 paths of the hash table and the brief. No test file. The database: none. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-e3b.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 5 files → each equal to:
  ac5bf20b387978dd3ed50b42ee63750575eaf69ed0736f20c3786df0bb5977b5  docs/_changelog.md
  3cd7266f8736ac206a8361758fb22e22fefde59e76727ea5d6e9295fa5bcee7e  docs/features/admin-screening.md
  4fe094aade109ee463e22298d4b840f6665d731d201864e2bb284a4aca922db2  src/features/admin-screening/screening-page.tsx
  8ff127cfc0ae7d557f21283596c1e92b559f3d9f0b5ccc1179336cb7f5f72aa1  src/features/admin-screening/use-screening.test.ts
  7cc906c2c6f9b4f06b90dae36bee6c27cd7c4820569f2bcdb4a4b3f9ae8a9e6e  src/features/admin-screening/use-screening.ts
- (c) `ls supabase/migrations | tail -1` → 20261015204631_c99005e8-3799-499f-b6b8-ec439d4b9c35.sql (turn S3's; no migration this turn).

THE CARRIER — B16E3B-TURN-CARRIER-2026-10-15.md (5,643 bytes; sha256 4b146320186c0451a0f148bc6308b7b265c3696e79a7afee73f1068099b4b92d; 7 sections)
- Its first line starts "B16E3B TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 5 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  43a8594df0ff55f83e0dac20dc48e0cffcfaba4e3b20256e915635bc6d99a8ec  docs/_changelog.md
  573a446a34ea68a45099757438c54e4b657b9534a6592e32b86a3f0ae16e1a18  docs/features/admin-screening.md
  60f4fd5283995436d6df5d6e975ded942c67e648dff364f9e1709f0cf0763730  src/features/admin-screening/screening-page.tsx
  b3b51249d15a973344822ce4bbb98529ac9024ebbfafb6f307bf075bd48895b9  src/features/admin-screening/use-screening.test.ts
  6c9bc1d5596c3fa7c1d8b06db3e69c574e7e21257c70b3c765b89b5ae729ab45  src/features/admin-screening/use-screening.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16e3b.log` — 913 passed (157 files);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- Not run by you: the typecheck, the build, the bundle budget and the browser tests. CI judges them.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 5 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 5 paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. Do not wait for CI (DEC-181).
2. Publish when the supervisor says the newest commit is green and Lovable is idle (turns E2a, E2b, E3, S3 and E3b go out together); then "Sync keys" in Admin › Translations.
3. The walk the supervisor sends after Publish (eight lines).
```
