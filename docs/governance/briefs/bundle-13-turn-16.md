# Bundle 13 — photos, turn 16: the operator's walk of turns 7–14 — the photo tools say their word (D168), the cover-only line, the preview keeps a dialog's focus (INC-618): brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 13 — PHOTOS (D154–D168) — TURN 16 (2026-10-14). ONE TURN, NO MIGRATION. 5 new strings. No package change.
Base: dev 79529b12 (turn 15's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier B: the photo step (src/features/posting/step-photos.tsx), the preview sheet (src/features/posting/preview/preview-sheet.tsx) and its new test, the strings, e2e/photo-pipeline.spec.ts (PP-30). Tier C: the docs, the usage maps, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 15 verified: dev 79529b12 equals the supervisor's tree with the saved brief (sha256 adfbf270…, equal).
- CI: turn 15's run (79529b12) is green. It retried 8 tests, on a degraded ethio-staging (HTML error pages from the account pool's clean-up, timeouts): no code finding.
- This turn: the operator's walk of turns 7–14 passed; the three things it brought back are below.

WHY THIS TURN
- The operator walked turns 7–14 on the published site (2026-10-14): every line passed. Three things came back.
- D168 (his request, ruled by him): "the crop buttons at the end can be made more informative, please check what other sites use like the icons they use." eBay's listing tool names its photo tools in an "Edit photo" screen; Etsy's app names "Edit" in words. His ruling: each tool shows its icon and a short word.
- His request: "can tell user only cover photo can have background removed."
- INC-618: in Screening's "Preview as buyer", the step-up code took one character. src/features/posting/preview/preview-sheet.tsx moved the focus to its Close button in an effect that re-ran whenever `onClose` changed; Screening passes a new function on every render, and the sheet is rendered inside the step-up gate's render prop, which runs again on every keystroke of the code. So after the first character the focus went to Close. The browser tests set the whole code at once with `fill()`, so none saw it.

WHAT THIS TURN BUILDS
- src/features/posting/step-photos.tsx: each stored photo's tools stand two a row (`post-photo-tools`), each with its icon and a short word under it: Earlier, Later, Edit and, on the cover, Background. The full names stay each button's accessible name and tooltip. Under the photos, one line (`post-photos-background-hint`): only the cover photo can have its background removed. Every test id is kept.
- src/features/posting/preview/preview-sheet.tsx: the focus moves to Close once, when the sheet opens; Escape calls the newest `onClose` (kept in a ref). Census of every effect in src/ that moves the focus: the sheet was the only one keyed on a function its parent re-creates (the gallery's viewer and the search row focus once, on open; the phone field on its open flag; the menu, the calendar, the step-up gate and the option rows move it in their own handlers).
- src/features/posting/preview/preview-sheet.test.tsx (NEW): PSH-1, PSH-2.
- e2e/photo-pipeline.spec.ts: PP-30 also reads the four words and the line.
- src/i18n/locales/en.ts and am.ts: the 5 strings below; the usage maps; docs/features/posting.md ("Bundle 13, turn 16"); the changelog; the roadmap (line 3 and the turn-16 line).

STRINGS (5 NEW)
- NEW `post.photos.earlierShort`: "Earlier" · «ወደ ፊት»
- NEW `post.photos.laterShort`: "Later" · «ወደ ኋላ»
- NEW `post.photos.editShort`: "Edit" · «አስተካክል»
- NEW `post.photos.backgroundShort`: "Background" · «ዳራ»
- NEW `post.photos.backgroundCoverOnly`: "Only the cover photo (the first one) can have its background removed." · «ዳራ ሊወገድ የሚችለው ከሽፋን ፎቶ (የመጀመሪያው) ብቻ ነው።»

DECIDED BY THE OPERATOR (2026-10-14)
- D167: every photo is checked again after Edit and after a background Keep (each is a new upload; skipping it would let an edit carry a photo nobody checked). Nothing changes in the code.
- D168: icon and a short word on each photo tool.
- D169: the admin's page of one ad shows the ad as the seller sees it, with its activity; photo removal moves into Edit; Screening's preview becomes view-only with a link to that page. That is the next turn, not this one.
- D170: an ethio.com mark and a soft shadow on photos with the background removed — later, after the seller's My listings page (the roadmap carries it).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The words: Earlier, Later, Edit, Background; Amharic ወደ ፊት, ወደ ኋላ, አስተካክል, ዳራ (each inside the button's full Amharic name). The cover-only line is shown when the ad has a stored photo.
- The ids: PSH-1, PSH-2.

TESTS
- Unit, NEW (src/features/posting/preview/preview-sheet.test.tsx): PSH-1 the sheet focuses Close when it opens, and a re-render with a new `onClose` leaves the focus on a field outside it (red on today's sheet: the supervisor ran it against the old file — it fails, then passes with this turn's); PSH-2 Escape calls the newest `onClose`, once. 842 in all.
- E2E, edited: PP-30 reads the words under the cover's and the second photo's tools and the cover-only line (English).
- Reached without an edit (CI runs them): every test that opens "Preview as buyer" (the review step, Screening, Admin › Listings) and every photo-step test (they click the tools by test id).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 79529b12 with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 842 unit tests (147 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test, a build, the bundle budget (JS 312.5 KiB of 320).
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-16.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 15's commit, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 11 carrier paths and the brief. No migration; no database read or write. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-16.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 10 files → each equal to:
  71fc5f56b8c4d8cd7df947714834254831bcfee4ac48c1bc76d8f6ad634e97e1  docs/_changelog.md
  1594372021df7908affbba65e63826b99d65174d1a27a254c3c04bb9ac301107  docs/features/posting.md
  24b409f822a11364e273bf6a9d7cebc2ee3f9d717862bec552750a6e64f087ba  docs/generated/i18n-usage.json
  82d1f11a54fb780833cbdc9c2ac04f8cb1c082f35aa62defb88f07ae82714907  e2e/photo-pipeline.spec.ts
  24b409f822a11364e273bf6a9d7cebc2ee3f9d717862bec552750a6e64f087ba  public/i18n-usage.json
  fb285cd3cb4da101facee65cedf7e7f2393ea2684d3027b922379b1c21f9c30c  roadmap.md
  8e2dff91870e5a7f45fb595e1b1fe284be278682ec8b58f1267a1c3476fab2f1  src/features/posting/preview/preview-sheet.tsx
  a13eac02e8564281c627bcec44ad4fc01d38ead99bd64827f3257074006ef15d  src/features/posting/step-photos.tsx
  1f310fb2332a85966f8c039e94d3d30dbd7f17cb5d5857838048052ecbad14db  src/i18n/locales/am.ts
  d9d99e7a0520efc717c2e3bc158c775e0d9c4b86db0776181cead85249ee8b19  src/i18n/locales/en.ts
- (c) `ls src/features/posting/preview/preview-sheet.test.tsx` → no such file.
- (d) `grep -c "earlierShort\|backgroundCoverOnly" src/i18n/locales/en.ts` → 0.

THE CARRIER — B13T16-TURN-CARRIER-2026-10-14.md (10,501 bytes; sha256 97b26329d1e4ab57b7e1f4288358d4cfd315597082c3ba9c8a0ef22f08ee9bf4; 29 sections)
- Its first line starts "B13T16 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 11 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  460ee35f6d99580b177d45138f1fbf374f54259e3297ce42c2887463ea6f09b8  docs/_changelog.md
  7c7d3d736993f2c1cf58d8148752d1f0825936ee4fc20579c760e90c0a7de3a9  docs/features/posting.md
  d7824e2d43054b217528438fbd07911107b922bd56a2e8cca809a01b36e9134c  docs/generated/i18n-usage.json
  869af674c33ba7a383e5f4f470660cf78867ec105a4272f76d26b3c71bc46e72  e2e/photo-pipeline.spec.ts
  d7824e2d43054b217528438fbd07911107b922bd56a2e8cca809a01b36e9134c  public/i18n-usage.json
  fee09f8c788d384e5c536e7b960b5e656ed483ae54b1c2709275eb0f781fa5bd  roadmap.md
  6caf03f08578d068dd69964070e22301eb6a66687220449007a5e2de782532dd  src/features/posting/preview/preview-sheet.test.tsx
  31085f3bc647e423aaf69d946b155614077a2c05e2c24ec0bb4f2c0948996916  src/features/posting/preview/preview-sheet.tsx
  254cc47f52142b41484d6fd4ce67e6e027457781f3a903d503c26d706485c431  src/features/posting/step-photos.tsx
  3d56f2510f590270feaabcac18dce8776c4b72a74eb03824fd942e8d9304799a  src/i18n/locales/am.ts
  7eb3238e16887bb9fa54d9ed00d846fa05d6527c2091aa749dfbf737d9f51c8e  src/i18n/locales/en.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t16.log` — 842 passed (147 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran them on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 11 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 11 carrier paths and the brief, and no migration file. `git ls-files src/features/posting/preview/preview-sheet.test.tsx`, so the new file is shown tracked (G20).
- The checks.
- The strings: each new key, its English and its Amharic, as written (G43).
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
2. Publish only when the supervisor says the newest commit is green and Lovable is idle.
```
