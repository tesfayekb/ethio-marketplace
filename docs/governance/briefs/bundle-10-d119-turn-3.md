# Bundle 10 follow-up — D119, turn 3: brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 10 FOLLOW-UP — D119, TURN 3 (2026-10-10). ONE TURN. No migration, no database change, no new string, no package change.
Base: dev aea5b434. This file is public: it is written as build instructions. Tier B (the listings page and one test).

ANSWERS TO TURN 2
- Verified by diff of 1f6b4180..aea5b434: exactly the 11 paths, each byte-identical to the supervisor's copy.
- CI green on aea5b434 (run 38001587149, promoted: main = dev). INC-531 is fixed and PW-180 passes.

THE OPERATOR'S WALK (2026-10-09) — one change
- The walk found one thing to change: when a place is chosen and the category has NO ads ANYWHERE, the page still showed the old empty box. It should show the gold invite card instead.
- New rule: with a place chosen, "nothing in the place" always shows the gold card first, alone in the place's row. That holds whether wider places follow or nothing exists anywhere.
- The old empty box (`feed-empty`) is shown only when no place is chosen.
- Code: src/components/marketplace/feed.tsx. `InviteFirst` now draws the card section for both cases, and `InviteBody` is gone.
- Test: FS-10 now expects the card, and no feed-empty box.
- The shell tests' empty box (no place chosen) is unchanged.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-10-d119-turn-3.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK — the same as turn 1's brief (docs/governance/briefs/bundle-10-d119.md, HOW TO WORK). In order:
- the CI read (expect aea5b43 and SUCCESS);
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-10-d119-turn-3.md`.
- (b) `grep -c "InviteBody" src/components/marketplace/feed.tsx` → 2.

THE CARRIER — D119-TURN3-CARRIER-2026-10-10.md (62,261 bytes; sha256 7dffb63a189856cd38a63ef0ebcc4cea7acc6f75bfa0417586ace9df24c6b89c; 5 sections)
- The same format and modes as before: REPLACE, or APPEND. Check its sha256 first.
- Write every section by script.
- The carrier is never committed.

THE HASHES — `sha256sum` each of the 5 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  bcd67581c89a2bb0998393f4cd47c6423075ddd98f7cb4cb13fd2c122091024c  src/components/marketplace/feed.tsx
  0a00c569db5ae092c555f8f5a0d5f1b1cd8c65e9d448f3cfadd02d195634d8b4  e2e/feed-screens.spec.ts
  e684cc6bc5c79778b4aeb34a3e159837f7035ed64f232cdccda2694ead3da2b7  docs/features/feed-engine.md
  bb5c22af28167c40d2e7ec0fbaf6662da40d07d2f6384b8bfcf4668919731311  roadmap.md
  5ac574ec83fe607f2ee7cdafde5b2fb9c01aac962d117568b610c1584b83fb29  docs/_changelog.md

THE CHECKS — the same seven as turn 1. The supervisor's results on its own copy (not lock-exact, INC-420):
- typecheck clean;
- format:check clean;
- lint 0 errors / 33 warnings;
- test:unit 592 passed;
- i18n:map-guard "usage maps match the tree" on the first run;
- e2e-select self-test OK;
- build clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/feed-screens.spec.ts`. If it does not start, write "local browser runs unavailable".

THE REPORT
- Done or not done, by part.
- The six ci-status lines.
- The census results.
- The 5 sha256sum lines and the brief's.
- `git diff --name-only aea5b434` plus `git ls-files --others --exclude-standard`: exactly 6 paths.
- The checks' last lines.
- The browser run's result.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then walk lines 1 and 3 again.
```
