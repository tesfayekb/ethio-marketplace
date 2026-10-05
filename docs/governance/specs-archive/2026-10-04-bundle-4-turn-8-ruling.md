Source: supervisor thread, turn 1355, Sun 2026-10-04 18:08 New York.
Status at 2026-10-04: built as dev fcc9b822 (CI run 37241062194 SUCCESS, promoted to main; verified CLEAN in turn 1366).
Related: bundle 4 Part F, INC-428, INC-430, M6 (e44f20e5, mark 20261005100000).

RULING — bundle 4, turn 8: green, then Part F's loose ends. Base: dev 83da74b2. Main is still 72cc8102.
CI run 37237374049 on 83da74b: 1139 passed, 76 skipped, 8 failed, 1 flaky. M6 is on ethio-staging. The operator has now applied M6 on ethio-prod.

Do these in order, without stopping between them.

1. PROD READ-BACK. Read the marks table on ethio-prod and paste the newest mark. Expect 20261005100000.

2. THE RED — one class: Next on the contact step with a seller who lacks a name that step 22 now requires. Four tests, both projects:
   - PW-127 (post-wizard-bundle2.spec.ts:663): seller is homeConfirmed: false and unnamed. After the country is confirmed, Next is held by the empty name boxes.
   - PW-131 (post-wizard-bundle2.spec.ts:464): unnamed seller types an imitating name. Next stops at the empty first and last name, so the save that would refuse the name never runs.
   - PW-30 (post-wizard-place.spec.ts:694): unnamed seller types a seller name; held at first and last name.
   - PW-76 (post-wizard-place.spec.ts:1443): named, but no seller name is given or typed; held at the seller name.
   Fix each through leaseSeller's options (named, alias). Default unchanged.
   Then the whole class: post-step-8 is expected 23 times in five spec files (bundle2 9, category 4, place 6, pricing 3, specs 1). For each walk, paste one line: the test, its seller options, and whether a seller name is typed on screen.

3. WHOLE-FILE RUNS, BEFORE THE COMMIT. Ordered in turn 6 and not done. Run each file alone, both projects, 2 workers: post-wizard-bundle2, then post-wizard-place, then post-wizard-pricing. All three green is the condition for this turn's commit. Paste the three count lines.

4. LR-3 FLAKY (locations-tree.spec.ts:104): "seeding the region failed: duplicate key … locations_parent_slug_unique". Name the slug and why it was not unique or not cleaned, and fix it under the INC-428 rule. With it, the list still owed: every fixture that uses a fixed slot, and whether it clears its own stale leftovers.

5. INC-430 — the silent Next you found. When the contact step's save is refused for a reason other than the name (rate limit, missing draft, network), Next returns false and the screen shows nothing. Red first: a test where the identity route answers a refusal that is not a name refusal; then the step shows a plain message at Next and the seller can try again.

6. TESTS OWED FROM PART F
   - A seller who already has a seller name sees no suggestions until the box is cleared.
   - PW-147: one suggestion carries the category word, as the brief asks.
   - The account card: one browser test that opens it for a seller with saved channels and reads the name, the channels and "buyers can see it" or not.

7. CHECKS AND END. The five checks on the whole tree. Push. END THE TURN so CI gets an uncancelled run.
   Report: the prod mark, the 23-line list, the three whole-file count lines, the fixed-slot list, what INC-430's red run showed, the count line, the file list from git diff --name-only 83da74b2.

Part G's screens and Part H follow in the next ruling, once this run is green.
