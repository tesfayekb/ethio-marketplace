# Bundle 10 follow-up — turn 5: three a row on a phone (D123) and the 4:3 picture with one angle (D122): brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 10 FOLLOW-UP — TURN 5 (2026-10-10). ONE TURN. No migration, no database change, no new string, no package change.
Base: dev 25221580. This file is public: it is written as build instructions. Tier B (the listings pages, the picture, the admin picture cut and their tests).

ANSWERS TO TURN 4
- Verified by diff of c4efd3d8..25221580: exactly the 6 paths, each byte-identical to the supervisor's copy.
- Its CI run (38017839254) is read at the start of this turn.

THE OPERATOR'S RULINGS (2026-10-10), built in this turn
- D123 — the grid on the listings pages:
  - three cards a row on a phone, four from 640 px, five from 1024 px;
  - below 11rem the card is compact: smaller type and padding, set by a container query in listing-card.tsx;
  - on a phone the invitation card takes the whole row.
  Tests: FS-12 (new), and shell.spec's grid test now expects 3 / 4 / 5.
- D122 — category pictures fill the 4:3 picture frame:
  - the card variant is cut at 640×480 (it was 512 square) and its thumb at 160×120 (it was 128 square); the OG stays 1200×630;
  - pictures already stored keep their old shape until they are generated again. The operator regenerates ONE first and judges it.
  Tests: the variant unit tests and CI-4 (e2e/admin-categories-images.spec.ts) now expect 640×480 and 160×120.
- D122 — one angle: the watermark and the "Photos coming soon" ribbon are drawn at the same angle, −30° (`WATERMARK_ANGLE`, src/lib/brand-mark.ts).
  - The ribbon was −45°.
  - Its corner inset now follows the angle, so the words fit between the two edges at any angle.
  - PW-141's checks (letters at 3.6 % of the picture's width; the ribbon inside the picture's box) are unchanged.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-10-d119-turn-5.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK — the same as turn 1's brief (docs/governance/briefs/bundle-10-d119.md, HOW TO WORK). In order:
- the CI read (paste the six lines; expect 2522158). If it is red, do NOT fix anything: report it, and go on with this turn;
- step 0;
- the census;
- the carrier;
- the hashes;
- the checks;
- the browser run;
- the report;
- END THE TURN.
Do not stop between parts. Do not use a patch tool. No database change.

CENSUS (paste each result; any difference → STOP and report)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-10-d119-turn-5.md`.
- (b) `grep -c "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" src/components/marketplace/feed.tsx` → 2.
- (c) `grep -n "export const CARD_SIZE = 512;" src/features/admin-categories/category-image-variants.ts` → one line.

THE CARRIER — D119-TURN5-CARRIER-2026-10-10.md (280,582 bytes; sha256 8d7a0fd9d1a454599dd83a7f4c30b9486c631343a7848aeda83f131e13558301; 13 sections)
- The same format and modes as before: REPLACE, or APPEND. Check its sha256 first.
- Write every section by script.
- The carrier is never committed.

THE HASHES — `sha256sum` each of the 13 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  d5c3cd32a5d36caa4f659f29b0dd16c203bee17b5d948abc53f31979b3756aa8  src/components/marketplace/feed.tsx
  99bf8bbc6a9d43b034db0b4704ba2f46d85f68772ec8d526fae9ddb80806e526  src/components/marketplace/listing-card.tsx
  15d51f2c6d50301719e576bbc67b6e067ead5ed5456e81420d97c3f0cff1117a  src/components/marketplace/listing-picture.tsx
  6039a6214c47a53e83880c3415e52785c354daeadb2dd84d17dba5146e4fd459  src/lib/brand-mark.ts
  4abcdfc4c73fd4c4373e9809505156df90b7a94f36d5c6da89f169b7cbc4f99b  src/features/admin-categories/category-image-variants.ts
  2d080d4d194fcee7573f98d3b8ce6c82d6179d7001c29f62792a5462defd7ac1  src/features/admin-categories/category-image-variants.test.ts
  93495a7e8a65516753b14628b373c3a8add301cbe64d0a614197de27865b7974  e2e/feed-screens.spec.ts
  933bf681cceb4dbc399e86ebd2c6f90666b7c77414106f24c692a6fe318ef7a8  e2e/shell.spec.ts
  97e669de146ece731b2f79724c0e853543f86e0eef01c53ad27523276019d8a2  e2e/admin-categories-images.spec.ts
  9fbfffcfc6a8edcf002aa9eb6305d046cc68871f102d226c0b293c5631e8627c  docs/features/feed-engine.md
  2fbff6053353fda3acd5de249bc06d3be78a53c7700690bc59ccd5f86be57d8e  docs/features/categories.md
  dcdf4d6bb7b438d1de19c49836a884fbf7b33a069c552094c4cec413db6a8b03  roadmap.md
  c4a5fd52fdcffa05571cdb10d61328cf0a23bd247d72a954f148a0115a4a6f12  docs/_changelog.md

THE CHECKS — the same seven as turn 1. The supervisor's results on its own copy (not lock-exact, INC-420):
- typecheck clean;
- format:check clean;
- lint 0 errors / 33 warnings;
- test:unit 593 passed (one new unit test);
- i18n:map-guard "usage maps match the tree" on the first run;
- e2e-select self-test OK;
- build clean, and the built CSS holds the `@min-[11rem]` container rules.

THE BROWSER RUN — try once: `bun run e2e:local e2e/feed-screens.spec.ts e2e/admin-categories-images.spec.ts e2e/post-wizard-category.spec.ts`. If it does not start, write "local browser runs unavailable".

THE REPORT
- Done or not done, by part.
- The six ci-status lines.
- The census results.
- The 13 sha256sum lines and the brief's.
- `git diff --name-only 25221580` plus `git ls-files --others --exclude-standard`: exactly 14 paths. If the platform committed mid-turn, give `git diff --name-only 25221580 HEAD` too.
- The checks' last lines.
- The browser run's result.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the walk:
- the grid on a phone;
- the ribbon at −30°;
- one category picture regenerated in Admin › Categories › Image › Regenerate, then seen on the listings page.
```
