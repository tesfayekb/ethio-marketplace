RULING — app-fixes, stop 2: the re-entry's two files, the base-language literal, the two commits red on their own trees. Base: cursor/app-fixes 9fa44ee4f.

Parts A → F as built are accepted for the verification at the close. Finish by this ruling; the brief is not rebuilt. Save this ruling by scripted copy, BARE, as `docs/governance/briefs/app-fixes-ruling-2.md` (sha256 as the operator's line gives it) in the re-entry's commit, and name it in §10.

PREVENTION (G70). Root cause, as a class: the second time in this turn the GO changed a list without naming the guard that pins it (BC-16 at stop 1; CF-LANES-1's constants and exact-list assertion now). The brief's re-entry rule named the workflow line and the allowlist line, and not `SERIAL_TAGS` or the test that reads both. The template sentence this turn added would have caught it; a sentence is not a guard. Guard, as code, in the CI turn that follows the records turn: CF-BRIEF-19 — for every INC or DEC a brief says it fixes or changes, each file under `scripts/` that names that id is inside the brief's SCOPE, or the brief says why not. Repository: that law (queued with its turn); this ruling. Instructions: v1.18 — G0.3 names "the guards and constants that pin the list" as consumers. Cursor rules: a rules item for the same CI turn — a commit that changes `src/` runs the first-download check before it is made (item 3). Knowledge: not needed. Stops this turn: 2.

1. The re-entry: YES. `scripts/ci/lane-plan.ts` and `scripts/conformance/lanes.test.ts` join the scope for exactly your proposed change, in one commit with the workflow's tag and the allowlist's line:
   - `SERIAL_TAGS` holds `a11y` and `global-state`; `NIGHTLY_TAGS` is empty (keep the name and its comment, reworded: no tag is nightly-only since this turn).
   - CF-LANES-1 expects no allowlist line and no test outside a lane; its planted "a `@global-state` test in none" returns beside "an `@a11y` test in none".
   - The harness guide's J8 note takes the new state under the docs allowance. Rule 20's J8 line is NOT edited here (the brief keeps `.cursor/` closed; rules change in a rules turn): name it in §13, and the CI turn's rules items carry it.
   On the first run, the brief's rule decides: the tests pass → INC-1135 FIXED; a cause in one module → fixed in the one further commit; otherwise these four changes go back in that commit and §13 holds the bodies. Not a stop.

2. `languages-page.tsx` :104's literal `"en"`: fix it here. The file is already in this turn's diff, and Part F brought its mechanism: the base language is the roster's `isBase` row, never a literal. One read moved, with its test (red on the old code where it can be shown; otherwise a positive control). INC-1143 (item 5).

3. The two commits that fail the first-download check on their own trees (d7b458e80, 314d1a881): accepted as a named departure; history is not rewritten. The cause is the order of work — the check ran at the end, not before each commit that changed `src/`. From now in this turn: run `node scripts/check-bundle-size.mjs` on the built tree before each commit that changes `src/`.
   The five ceilings (2917a170b) are verified at the close against the report's chunk table: each raised line names its cause and your measurement (DEC-355).

4. PIC-7 and VWR-4, which pass on the old code: each carries a positive control — an assertion that fails if the state it describes was never reached (the failed state really entered; the other-error branch really taken). Name the control in §5.

5. RECORDS (word for word into §14, beside the brief's and ruling 1's):
   INC-1143 — `languages-page.tsx` :104 read the base language's total with a literal `"en"` (K4: a language code outside the one constants module and the roster); fix: the roster's `isBase` row; the app-fixes turn; FIXED [commit].
   INC-1135 — the brief's amendment line stands, filled after the first run.

6. ORDER AND PUSHES. The run on 9fa44ee4f (this stop's push) is the first CI evidence for Parts A → F: read it when it completes; a red whose failure names a path this turn changed is fixed in the commit below or the one after it.
   Then: one commit (the re-entry, item 2, item 4's controls, this ruling) → STEP 6's gate → ONE push → the brief's STEP 7 rules in one further commit if needed → STEP 8.
   A stop is only for a security finding, an unexplained first-download growth, or a file that the brief and the two rulings do not name.
