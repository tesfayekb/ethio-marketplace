# Bundle 12 — the tidy-up round, turn T17: every stored photo size is screened (INC-601); lighter, sharper photos (INC-599, D157): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T17 (2026-10-13). ONE TURN, NO MIGRATION. No new strings; two strings shortened in English and Amharic. No package change.
Base: dev 574e31d5 (turn T16's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the upload route's policy pass (src/server/media/policy.ts, src/routes/api/upload/photo.ts) and its size dials.
Tier B: the device's photo encoder (src/features/posting/photo-encode.ts), two unit-test files, the two locale files, one E2E comment, the posting and media-pipeline docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn T16 landed byte for byte (574e31d5): the twelve paths and the brief equal the supervisor's copy, and the migration file differs from the appendix only in its mark, 20261014050000. Your read-back matches the brief.
- CI on 48b0b91f (turn T15) is green. CI on 574e31d5 runs after the operator's staging apply; a fix it needs comes in the next turn.
- The database tool's new warning (signed-in users can run `move_listing_photo`, which runs with the database's rights): expected and kept. The function checks the caller owns the listing, and its grant is named in scripts/public-surface-allowlist.txt.

WHY THIS TURN
- The operator, 2026-10-13: "obviously ai screening for all images … reject any other type of images being uploaded, obviously sanitization, validations, etc", and "we want to automatically make the images lightweight if uploaded size is large … without significantly affecting the quality".
- INC-601: every size of a photo that the upload stores — the cover, the card and the thumb — is screened by the policy pass.
- INC-599: the device's encoder draws with the canvas's default filter, which aliases a large downscale. Measured on the operator's 15 photos, against the same size drawn with the high-quality filter and saved lossless: thumbs at SSIM 0.70 and cards at 0.87, where the bar is 0.95.
- D157 (the operator, 2026-10-13, "reference 1"): the frozen judge's verdict on those 15 photos. The smallest WebP quality with SSIM ≥ 0.95 on every photo is cover 0.82, card 0.84 and thumb 0.82. No smaller edge passed. The measured largest sizes are cover 333 KB (at 1448 px), card 45 KB and thumb 6 KB, so the upload's size dials tighten to cover 1 MB, card 150 KB and thumb 30 KB.

WHAT THIS TURN BUILDS
- PART 1 — INC-601 (src/server/media/policy.ts; src/routes/api/upload/photo.ts):
  - `screenPhotoPolicy(variants, log)` takes `{ cover, card, thumb }`. Each is a `PolicyImage`: `{ bytes, format, width }`, the strip's output.
    - It sends the three as three `inlineData` parts of ONE request, in that order.
    - Fake mode is unchanged: it reads `variants.cover.width`.
  - `POLICY_CODES` gains `variant_mismatch`. The instruction:
    - opens by saying the provider is shown three images of one upload, which it must all judge;
    - refuses the upload if any of them must be refused;
    - defines `variant_mismatch` (a smaller copy that shows a different picture) and says that less sharp is never a reason;
    - asks the evidence to name the image.
    The exact lines are in the carrier.
  - The upload route passes the three stripped sizes. The refusal stays on field `cover`; the seller sees the existing generic "This photo was not accepted." for `variant_mismatch`, because the photo step's mapping has no key for it.
  - Docs: the header comments of both files and docs/features/media-pipeline.md (the policy pass, step 5 of the order, the code list).
- PART 2 — INC-599 and D157 (src/features/posting/photo-encode.ts):
  - every draw sets `imageSmoothingEnabled = true` and `imageSmoothingQuality = "high"` before `drawImage`;
  - `WEBP_QUALITY` becomes `{ cover: 0.82, card: 0.84, thumb: 0.82 }`, and each variant is encoded at its own quality. JPEG stays at 0.82, and the 1-px WebP probe uses the cover's quality.
- PART 3 — D157's size dials (src/routes/api/upload/photo.ts `SIZE_DIALS`, with a comment naming the measurement): cover 1 MB, card 150 KB, thumb 30 KB. The env names are unchanged, and the edge dials are unchanged.
  - docs/features/media-pipeline.md's dial table changes to match.
  - The photo rules line no longer names a file size, because the device shrinks any photo before it is sent. Two strings change in each language, by deletion only:
    - `post.photos.rules` loses "up to 6 MB each ·" (en) and «እያንዳንዱ እስከ 6 ሜባ ·» (am);
    - `post.photos.helper` loses "up to 6 MB ·" (en) and «እስከ 6 ሜባ ·» (am).
  - e2e/photo-pipeline.spec.ts: PP-4's comment names the 30 KB thumb dial. Its assertion is unchanged (gps.jpg, 212 KB, is still over it).
- Tests (unit):
  - src/server/media/policy.test.ts gains PPOL-5 to PPOL-8:
    - PPOL-5: the three sizes go in one call, in order, with their types;
    - PPOL-6: a `variant_mismatch` verdict is returned as a refusal;
    - PPOL-7: the instruction's two new lines;
    - PPOL-8: fake mode reads the cover's width and never calls the provider.
  - NEW src/features/posting/photo-encode.test.ts, PE-1 and PE-2 (a stubbed canvas, because jsdom has none):
    - PE-1: the high filter is set before every draw, and WebP is encoded at 0.82 / 0.84 / 0.82 at 1600×1200 / 480×360 / 160×120 from a 4000×3000 photo;
    - PE-2: the JPEG fallback at 0.82 for every size.
- docs/features/posting.md (a T17 section, and the two places that quoted the rules line), the changelog, and the roadmap (line 3, the T17 line, and a line under bundle 13 recording D158 and D159).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- `variant_mismatch` shows the existing generic refusal and adds no new string. The app's own uploads always send three copies of one photo.
- Margins of the dials over the measured largest sizes: cover 1 MB (×3), card 150 KB (×3), thumb 30 KB (×5).
- The JPEG fallback keeps 0.82. The judge measured WebP only.
- The ids are PPOL-5..PPOL-8, PE-1 and PE-2.

TESTS
- Unit: 746 (126 files): PPOL-5..PPOL-8 and PE-1, PE-2 are new.
- Red first, on the supervisor's copy, with this turn's tests and the base's two source files: PE-1, PE-2 and PPOL-5..PPOL-8 fail (6 failed, 4 passed), and all pass on this turn's files.
- E2E: no test is added or edited except PP-4's comment. The E2E runs use fake mode, which is unchanged, so no E2E result changes. CI runs every test on the final commit.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 574e31d5 with this turn's files)
- Clean:
  - typecheck (it covers e2e/), format, lint (0 errors, 33 warnings);
  - 746 unit tests (126 files);
  - the usage maps match (no key moved);
  - the hardcoded-strings guard (0 findings);
  - the selector self-test.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-17.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn T16's commit or T15's, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration and no database change in this turn.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads: none needed. Reports never carry an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 12 carrier paths (one of them NEW) and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.
- Amharic (G43): list the two changed Amharic strings in the report, key by key, with their English. They change by deletion only.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-17.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 11 files → each equal to:
  895fbc5b780b4ad5e0fc439b26fe61a8715e9dda290a1348dc762b750ddb626f  docs/_changelog.md
  f3a96cbfd0f508ee43592fa806e06ed91b4053593f3098ebd0254fd57a5c86b2  docs/features/media-pipeline.md
  cb309944f4350e8ecff334e0d615990519d62683a34f6d87139ee14b3765d774  docs/features/posting.md
  73897753c1d1aaa51b429bc4920ba94ed3b9d6c036a87679fdf2ca3b37eac4c4  e2e/photo-pipeline.spec.ts
  7f67d8d4a2e50811a42024923c14b75f9f709ce518ae0d9a432f29278a9d5dfb  roadmap.md
  03d3fa358d432c2322d026b87038162a606ab9dd2dc94dd8d3ce317a22154154  src/features/posting/photo-encode.ts
  f423b079fdb9e91dacef97c54ab88e115573fc040710756ab90fbe4f67c6c9ce  src/i18n/locales/am.ts
  cddd312b599ddbf99a38b47b88b6902f8f62251270c244f4f8f8815336986daa  src/i18n/locales/en.ts
  cb705d8ae5175f5e5ed131f05326195e9263bba89565c117c48666d7e6274d7f  src/routes/api/upload/photo.ts
  0c5f78b69af632a071f65c4eac34585a8fd4b7178bd211a748e5a2e51a0e9b79  src/server/media/policy.test.ts
  e878302d4f1195fca91afb493c1ffe795efd1de3b1a71a42a59506ae96545403  src/server/media/policy.ts
- (c) `ls src/features/posting/photo-encode.test.ts` → no such file.

THE CARRIER — T17-TURN-CARRIER-2026-10-13.md (21,079 bytes; sha256 b407f704ae86c1c806ec8b85616abe98a15ed9921fba3b5ae61eabbb98d9fc07; 41 sections)
- Its first line starts "T17 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - NEW: the section is the whole new file;
  - REPLACE: the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 12 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  3f3113791c5fc3951c67b2601cb5e3b63932c47d3ac7d516785a4364d6e77adf  docs/_changelog.md
  47d525d30e156290002d60a81a198f4afeafe726a508c0a32a72e73860a98776  docs/features/media-pipeline.md
  20dddd046ec65a92c1b96a2b8fe29c439164c5c8f481025504f4f29612d6ad4f  docs/features/posting.md
  a3845004a4b8b65bd1f62562e39950aff4deaf50623d8e07058d41e889f4a42e  e2e/photo-pipeline.spec.ts
  9bf17cf38b12425d3084f8c8474625be7e8bbb6b3b8a8a7f85a3c009f8ac93e9  roadmap.md
  14503fabccc160c815ebab76ffd247b3ea532348a8cab123a4246e4d74b1c2e4  src/features/posting/photo-encode.test.ts
  0c1e9e30d7705a10fc6219f4cc65cff876550e08b62d9e9d067345c5d794524b  src/features/posting/photo-encode.ts
  b7a91cedb52c17df339e9b072ae2c502b47fa763c9cbf279c6800b4328e9726c  src/i18n/locales/am.ts
  a5a6d98a148f8135f2bfbc15c22bc10161c6016096fa57c805e6884cbec28931  src/i18n/locales/en.ts
  daaf41ec40bafcf8ec76bebd2314d839c66c1ae44e67a430b7fde0312dad44c0  src/routes/api/upload/photo.ts
  8540a02f0b64ec1b72f647c6966563e6eeebc63b654824d69917f339a91a4297  src/server/media/policy.test.ts
  39745421dc18c6d70d9c2b7f1db8591c94a861f5ab70892f7fc42bcae990dd27  src/server/media/policy.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-t17.log` — 746 passed (126 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every E2E test.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 12 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 12 carrier paths and the brief. Also paste `git ls-files src/features/posting/photo-encode.test.ts` (G20: the new file is tracked).
- The checks.
- The two Amharic strings (G43), key by key with their English.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Publish once CI is green on the final commit. The supervisor then sends ONE photo walk for T15, T16 and T17.
```
