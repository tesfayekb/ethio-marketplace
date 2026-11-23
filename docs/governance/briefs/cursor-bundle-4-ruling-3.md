RULING — cursor-bundle-4, final report: the merged tree moves two page ceilings; one more push. Base: cursor/bundle-4 1a2742d2f

Save this file bare as `docs/governance/briefs/cursor-bundle-4-ruling-3.md` (new) by a scripted copy; its sha256 is the carrier's. Save the package's `ceilings.py` OUTSIDE the repository (`/tmp/ceilings.py`, never committed); its sha256 is `46d26afaa692ea88f501c1120cb6d7ef9d4963a27f8cc2cdcc23bd9e67c82c58`. Where this ruling and the brief or rulings 1 and 2 differ, this ruling governs.

PREVENTION
- CLASS 1 (the supervisor's, S754): ruling 2 decision 8 said "before your final push I measure the merged tree" and did not restate the brief's STEP 8 as a STOP. Your final push went at 03:40 UTC; Lovable's bundle merged into dev at 04:10 (`46d4e7b21`). Each bundle alone is inside every limit. Built together, two pages sit inside the NEAR band (DEC-296): `/admin/ai` and `/admin/screening`. In force for the supervisor: a ruling that relies on a wait names it as a STOP, with the line the executor waits for. Repository: not needed. A pull request's run builds the merge with the current dev, so the run this push starts judges the merged tree. Cursor rules: listed for the next rules turn — when SIDE BY SIDE names a release line, the final push is a STOP until that line arrives. Knowledge: not needed.
- CLASS 2 (the executor's): the final push went before the release line that SIDE BY SIDE and STEP 8 named, and §10 does not name it. Name it in §10 (step 3 below).

WHAT THE SUPERVISOR READ
- Your lane in a fresh fetch, `740a40f17..1a2742d2f`, against the brief and rulings 1 and 2:
  - The types result `3d4dcb70…62fc` and the `/admin/categories` line `a3206c4d…7c8f` both equal the package.
  - The five `grant-without-caller` lines are gone, and the five CF-BRIEF-19 lines say `until INC-1260`.
  - The four Amharic values equal `mfa-words.am.json`.
  - The readers are on the five doors. A malformed answer is typed, and a gate refusal on the photo-links route is absent ids. The route's 30 ids equal the door's `badSize` bound.
  - `clearPendingFactors` unenrols only the unverified TOTP factors of the same read.
- File 2, whole (sha256 `74288ee5…70a6`). I put the operator's staging paste of file 2 in his hands; its read-back is mine.
- My census beside yours:
  - `src/`: the `.from()` reads of the 17 tables are owner or public reads only.
  - On ethio-staging, no SECURITY INVOKER function a browser role may execute reads the nine tables that keep their grants. The one view (`shown_locations`) is invoker, with no SELECT for `authenticated`.
- THE MERGED TREE, dev `46d4e7b21` with your head, merged in my lock-exact clone and never pushed:
  - The merge is clean. Types are clean, and `bun run i18n:usage` leaves both maps unchanged.
  - `vitest run src` and `vitest run scripts`: every file passes.
  - `check-bundle-size` FAILS on the NEAR band:
    - `/admin/ai` 303.7 + 0.1 against 304.
    - `/admin/screening` 348.7 + 0.1 against 349.
  - With the two lines below, it prints "Bundle budget OK."

THE DECISIONS
1. The two ceilings move by DEC-296's form, chunk by chunk from my builds of `ce25a7751` and the merged tree. Neither lane moves a page alone: each line names both bundles' causes, and this lane carries it because it merges second.
   - `/admin/ai` 304 → 305 = ceilingForLocal(303.673).
   - `/admin/screening` 349 → 350 = ceilingForLocal(348.697).
   Nothing else in `scripts/route-budgets.mjs` moves: `/admin/categories` (352.3 merged) and the other shared pages keep their room.
2. The numbers for §14 Records. These are assigned here; no lane writes them into a shared ledger.
   - Concern 1's DEC is DEC-429.
   - Concern 2's DEC joins DEC-430: the order, and with it the doors, the drops and the standing check.
   - Concern 3's DEC is DEC-431.
   - The guard that ignores a REVOKE is INC-1262 (owner: the tests-and-CI turn).
   - `signedInId` (`src/features/posting/pricing-data.ts:148`) is INC-1263 (owner: ACT-027, with INC-1256).

THE STEPS
1. From the repository root:
   - `python3 /tmp/ceilings.py --check` must print `CHECK OK: 2 lines`.
   - Then `python3 /tmp/ceilings.py` must print `APPLIED: 2 lines`.
   - Then `sha256sum scripts/route-budgets.mjs` must print `4e171cfd580e1dab275d27521e9c578a8da833d26a2ec2b20d43fe8eba619417`.
   If any line differs, STOP and paste the output; change nothing by hand.
2. Prettier on `scripts/route-budgets.mjs`. Then `bunx vitest run scripts/ci/turn-checks.test.ts scripts/ci/lovable-branch-guard.test.ts scripts/bundle-closure.test.ts scripts/conformance/wired.test.ts scripts/conformance/card-tiers.test.ts` (the five tests that read the file): all pass.
3. The report (file 2 is already on ethio-staging, applied by the operator and read back by me before this ruling was sent):
   - §10 names the early final push (CLASS 2) and ruling 3's two lines.
   - §11 gets this push's run.
   - §14 takes the numbers of decision 2.
   Commit the ruling, the two lines and the report together, and push once. Then `gh pr checks 96 --watch --interval 60`. This run builds the merge with dev `46d4e7b21`, the migration preflight included.
4. Green on that run: write the comment per rule 00 and keep the pull request a draft. I say when it is ready. Red: STOP, name the job and its first error line.

THE BRIEF'S SCOPE GROWS BY: nothing (`scripts/route-budgets.mjs` is the brief's ceiling grant). Never a file SIDE BY SIDE gives to Lovable, and never `.github/`.

RECORDS (§14)
- INC-1262 — OPEN (owner: the tests-and-CI turn): `scripts/public-surface.ts` honours a DROP and not a REVOKE, so a revoked browser grant keeps its allowlist line.
- INC-1263 — OPEN (owner: ACT-027, with INC-1256): `signedInId` (`src/features/posting/pricing-data.ts:148`) turns a failed session read into null on an identity path.
- DEC-431 — concern 3: a two-factor setup the provider holds unfinished is cleared before a new start; the confirmation of a replaced setup has its own words; a failed factor list is an error, never "off".

IN YOUR ANSWER: the three printed lines of step 1; the five tests' line; the push's commit and run with its verdict.
