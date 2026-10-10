# Bundle 10 follow-up — INC-532, the place kept across a sign-out: brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 10 FOLLOW-UP — TURN 4: INC-532 (2026-10-10). ONE TURN. No migration, no database change, no new string, no package change.
Base: dev c4efd3d8. This file is public: it is written as build instructions.
Tier A (the sign-out's hard reset in src/components/app-shell.tsx is part of the sign-out sequence). The rest is Tier B.

ANSWERS TO TURN 3
- Verified by diff of aea5b434..c4efd3d8: exactly the 6 paths, each byte-identical to the supervisor's copy.
- Your empty `git status` was the platform's mid-turn commit 9c8a3817, which took the files before the turn's last commit. Nothing was lost.
- CI on c4efd3d8 (run 38015592524) is RED, but not because of turn 3. FS-1 to FS-10 all passed, and the operator Published and walked it: the invite card now shows on every category.
- The one red is PW-64 (e2e/post-wizard-pricing.spec.ts, mobile-360, shard 2), on both attempts. After Next on the contact step (step 7), step 8 never showed, and the browser logged "429 (Too Many Requests)" twice: a rate dial refused the step's save.
- This is INC-533 (registered 2026-10-10). Turn 3 touched neither the wizard nor any door, so the incident is parked for the flaky-test round, with INC-430's unexplained PW-55 failure (the same symptom) and INC-449's class.
- Do NOT touch PW-64 or anything for it in this turn. This turn's own CI run is its re-run.

INC-532 (registered 2026-10-10; the operator's walk) — signing out dropped the place this browser had chosen
- Defect: the sign-out's hard reset (`resetLocationState`, app-shell.tsx :316–323 at c4efd3d8) cleared the chosen place and set `appliedRef` true. The shell therefore never derived the place again, and the signed-out page showed every listing with no place, so no invite card.
- Only a reload brought the browser's saved place (the `ethio_area` cookie, which the reset left untouched) back.
- What the operator saw: signed in he had Ethiopia › Addis Ababa; after signing out, the page said Canada and showed every listing. Canada is the edge's guess for his connection, and it is not an open market.
- Fix: the reset derives the place again from the browser's saved area, read live, exactly as a fresh load does. With nothing saved, the guess applies.
  - `appliedRef` becomes false, `areaSettled` becomes false (so the feed waits), and a new `deriveTick` is bumped.
  - `savedArea` reads the live cookie once `deriveTick > 0`.
  - The derivation effect lists `deriveTick` among its dependencies.
- Keeping the place on the ACCOUNT across devices is D106 (agreed, built later). This turn is about one browser only.
- Test: FS-11 (e2e/feed-screens.spec.ts). It signs in with a saved place, checks the heading, signs out through the screen, and checks the same heading again with no reload. On the old code the heading after sign-out reads "Listings near you", so FS-11 fails there.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-10-d119-turn-4.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK — the same as turn 1's brief (docs/governance/briefs/bundle-10-d119.md, HOW TO WORK). In order:
- the CI read (expect c4efd3d and FAILURE, with PW-64 the only failure: that is INC-533, parked, and you fix nothing for it);
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-10-d119-turn-4.md`.
- (b) `grep -n "appliedRef.current = true;" src/components/app-shell.tsx | tail -1` → :317.

THE CARRIER — D119-TURN4-CARRIER-2026-10-10.md (88,727 bytes; sha256 03f2849bb04ac16cfefebd629da0c9e885fbe6cab35ed3af9e555accb97fb0a1; 5 sections)
- The same format and modes as before: REPLACE, or APPEND. Check its sha256 first.
- Write every section by script.
- The carrier is never committed.

THE HASHES — `sha256sum` each of the 5 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  d6c6125b170ba2a6fe9cebaa61e30fb5a91b36f7d3eb958555cba40646a9e54c  src/components/app-shell.tsx
  7fd47c104387449a4958c57680ebdffc1e18df2fd1df77de91f2249e9d06510c  e2e/feed-screens.spec.ts
  8d7d8cb614294198b38fde00205f0879019f81a4578c53d8e97f3cd991c7cf9e  docs/features/location-scoping.md
  f4f13ec4bc0427a6f1941d26764c9b4eec8fc1632cb17a88d8680f8d11595a82  roadmap.md
  191b3a22c57d46c9883d459449cf0bb7a1cb468eeb8d823b0f578b48d79f068c  docs/_changelog.md

THE CHECKS — the same seven as turn 1. The supervisor's results on its own copy (not lock-exact, INC-420):
- typecheck clean;
- format:check clean;
- lint 0 errors / 33 warnings;
- test:unit 592 passed;
- i18n:map-guard "usage maps match the tree" on the first run;
- e2e-select self-test OK;
- build clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/feed-screens.spec.ts e2e/auth-signout.spec.ts`. If it does not start, write "local browser runs unavailable".

THE REPORT
- Done or not done, by part.
- The six ci-status lines.
- The census results.
- The 5 sha256sum lines and the brief's.
- `git diff --name-only c4efd3d8` plus `git ls-files --others --exclude-standard`: exactly 6 paths. If the platform committed mid-turn, give `git diff --name-only c4efd3d8 HEAD` too.
- The checks' last lines.
- The browser run's result.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then one walk line — sign in, choose a place, sign out: the same place stays.
```
