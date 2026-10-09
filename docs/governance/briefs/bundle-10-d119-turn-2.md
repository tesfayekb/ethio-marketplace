# Bundle 10 follow-up — D119, turn 2: brief, version 1 (saved unchanged, 2026-10-09)

```text
BUNDLE 10 FOLLOW-UP — D119, TURN 2 (2026-10-09). ONE TURN. No migration, no database change, no new string, no package change.
Base: dev 1f6b4180. This file is public: it is written as build instructions. Tier B (the posting wizard, the listings card, one test fix).

ANSWERS TO TURN 1
- Verified by diff of 7fc3a7a5..1f6b4180: exactly the 26 paths, each byte-identical to the supervisor's copy.
- CI on 1f6b4180 (run 37996982043) is RED, with one cause. Everything else passed: FS-3, FS-4, FS-8, FS-9, FS-10, PW-181 and PW-182 (INC-530 is fixed and proven), plus the unit tests.
- The one red is PW-180, in both projects. This is INC-531, and it is a test fault, not a product fault:
  - every screen assertion passed (the invite's city and region were filled in, the note was shown, the tick was on, Next went to step 7);
  - the test then read the wrong listing. `draftsOf` returns EVERY listing of the seller, oldest first, and PW-180 publishes a prior listing first, so `[0]` was that prior listing.
  The fix (the carrier, e2e/post-wizard-where.spec.ts) takes the draft that is not `prior`. That is the red fixed first.

THE OPERATOR'S RULINGS (2026-10-09), built in this turn
- A subcategory page fills the subcategory. When the address names a postable leaf, the leaf is CHOSEN exactly as a tap chooses it: the draft is made, and the wizard moves on to the next question.
  - A folder still opens step 1 inside itself.
  - Any other leaf opens on its parent's level.
  - Code: wizard.tsx (the effect now sits after `chooseLeaf`). Tests: PW-181 and PW-182 are updated.
- The card stands out in gold. This is DEC-169, the gold token's third placement (after the logo dot and the Featured badge):
  - a gold border and tint;
  - a star in a gold circle;
  - the green Post listing button.
  Code: invite-card.tsx. The design law is updated in docs/features/design-foundation.md and in the comments in src/styles.css.
- D121 (agreed, not built): a "Why advertise here" page, which the card will link to. One roadmap line records it.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-10-d119-turn-2.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK — the same as turn 1's brief (docs/governance/briefs/bundle-10-d119.md, HOW TO WORK). In order:
- the CI read (expect 1f6b418 and FAILURE: PW-180 only);
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-10-d119-turn-2.md`.
- (b) `grep -n "const \[draft\] = await draftsOf(user.id);" e2e/post-wizard-where.spec.ts` → one line, :283 (PW-180).
- (c) `grep -n "Megaphone" src/components/marketplace/invite-card.tsx` → :2 and :64.

THE CARRIER — D119-TURN2-CARRIER-2026-10-09.md (362,810 bytes; sha256 843fadc8bfd2126ec863e18980ecdbe7dde1be2dbc2492ebe517199254e2beab; 10 sections)
- The same format and modes as turn 1's carrier: REPLACE, or APPEND. Check its sha256 first.
- Write every section by script.
- The carrier is never committed.

THE HASHES — `sha256sum` each of the 10 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  efe9f04c0ad9449c8426fc1917e136be3454a2e728ee5aa6e56297b2e0d9e42b  e2e/post-wizard-where.spec.ts
  27913957ace9aa2ab46ee3285e17fb2dd7fe4a5a1fdf3501cbbd52962b61b485  src/features/posting/wizard.tsx
  df2e918866e4b36441148095ef2155e61b89660df11d98dd29e8fafcae6cd9d0  src/components/marketplace/invite-card.tsx
  a9ba349056e985d42566f2bf9eccb8ffb9540f959d95513cdbf544cf8759119b  src/styles.css
  e0352da1fb97684fd8eaf7acef58f1b321a07c6481f1ae0def122e1ad0e76458  e2e/post-wizard-category.spec.ts
  052a0eafcb1ef031f002a3c8c4dbd1c064909a542c576890b226e43e12345afa  docs/features/design-foundation.md
  141108794dce684f227c072435e074eb26dbfa30e4b72e556d227995abf2693c  docs/features/feed-engine.md
  889d9b9d1c7ceca31148f08a28951febc2aa419f417eb35f91c00c0bb3b7622d  docs/features/posting.md
  f9e2dbfcb9a453b81b8c0f1687b6ea1e3bb2ee0d39d293aafb10e1e3b521bd05  roadmap.md
  58b5f2f861f911e91b35f68defe801e8be1867f86688104983d85606b9d94a4c  docs/_changelog.md

THE CHECKS — the same seven as turn 1. The supervisor's results on its own copy (not lock-exact, INC-420):
- typecheck clean;
- format:check clean;
- lint 0 errors / 33 warnings;
- test:unit 592 passed;
- i18n:map-guard "usage maps match the tree" on the first run (no key changes);
- e2e-select self-test OK;
- build clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/post-wizard-where.spec.ts e2e/post-wizard-category.spec.ts`. If it does not start, write "local browser runs unavailable".

THE REPORT
- Done or not done, by part.
- The six ci-status lines.
- The census results.
- The 10 sha256sum lines and the brief's.
- `git diff --name-only 1f6b4180` plus `git ls-files --others --exclude-standard`: exactly 11 paths.
- The checks' last lines.
- The browser run's result.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the walk.
```
