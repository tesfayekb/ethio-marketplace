Source: supervisor thread, turn 1335, Sun 2026-10-04 15:48 New York.
Status at 2026-10-04: built across dev f0120a95..aeac0bfa (M6 written; reviewed in turn 1349); the whole-file runs it ordered were not done and were re-ordered in turn 8.
Related: bundle 4 Parts E and F, INC-428, INC-393, M6.

RULING — bundle 4, turn 6. Base: dev f0120a95. Main is still 72cc8102.
CI run 37229673741 on f0120a9: FAILURE. 1136 passed, 76 skipped, 2 failed, 2 flaky. Every guard and build job passed.
Every run between 72cc810 and this one was cancelled by your next push, so this is the first full proof of Parts A to E.

Do these in order, without stopping between them.

1. AU-12 on mobile-360 — INC-428 (leftovers of cancelled runs).
   Evidence: expected "This name needs a reason before it can be set.", received "That seller alias is already taken." The handle is "awashbank" (admin-users.spec.ts:458).
   My reading: no admin or alias code changed since the green run on 72cc810, so staging holds a leftover. A scratch user from a cancelled run still holds the handle: teardown never ran, global-setup reaps no users, and the nightly sweep waits 24 hours (global-teardown.ts:9). Check alias_history too.
   Fix in the test: before it types the handle, it removes the handle from scratch accounts only (the e2e namespace) that are older than ten minutes, with their alias_history rows for it. A real account is never touched. Say in the report what held the name.

2. LS-6 flaky on both projects — the same class.
   Another scratch guess city sat at the test's point. The setup reaper's window is 3 hours (global-setup.ts:512), though its comment says one.
   Fix: seedGuessFixture (e2e/helpers/locations.ts:355) first removes scratch rows (slug e2e-…) at exactly its own point that are older than ten minutes, child first, as destroyLocation does.
   Class rule from now on: a fixture that uses a fixed slot (a map point, a reserved name) clears its own stale scratch leftovers before it seeds. List every other fixture with a fixed slot and say for each whether it already does this.

3. PW-55 on mobile-360 — cause not established. Reproduce first; no fix before the cause is named.
   Evidence: post-step-8 not visible 10 s after Next on step 7 (pricingToReview, post-wizard-pricing.spec.ts:344–345), on every attempt. The test took 70.8 s. Desktop passed, and the three other tests that use the same helper passed. No context file was saved.
   Leads, in order:
   a. step 23's new save handler (step-who.tsx:436–470), committed last and proven only by PW-133 and PW-144;
   b. the shard's server log shows /api/listings/draft "listing not found" ×5, where the earlier run had ×3: a draft deleted mid-walk by another test's cleanup;
   c. load: the walk itself was three times slower than usual.
   Run the whole pricing spec on mobile-360 with a trace. If the screen is at fault, fix the screen. Paste what the trace showed.

4. STEP 20's message. The brief asks for it ("The options route maps the refusal to a plain message, as the schema read does"). It is one place, not five:
   - loadAttributeOptions (attribute-options.ts:126) tells its caller when the refusal was rateLimited;
   - the form's own picker (the load at step-specifications.tsx:332, which the price page shares) shows the same plain sentence the schema read shows (post.specs.rateLimited), under the control, and the list can be opened again;
   - the other four callers (step-review.tsx:201, catalog-finder.ts:152, step-details.tsx:124, wizard.tsx:259) are background reads and stay as they are.
   One test: the options route answers 429 once, the line shows under the control, a second open loads the list.

5. STEP 18's gap. A saved place with a street line and no pin carries its street line and directions to the next ad. Add it to PW-143.

6. TESTS OWED
   - PW-142 fixes a defect (INC-393), so it owes one red proof: disable the fix once, paste the failing assertion, restore the fix.
   - PW-141: add the ribbon on the buyer's detail (brief step 15's test list).
   - PW-143, PR-25 and PW-144 are new features: accepted as written.

7. THE PUBLIC CARD'S PHOTO LIMIT: no change now. Buyers see no ad photos on the card until the photo clean-up bundle; when that bundle hands the photo to listing-picture, the ribbon rule already hides it. Add one line to roadmap.md under that bundle.

8. FINISH PART F: step 21 (suggestions with an empty box, the block order, the helper line, the correction wording), step 22 on screen, step 23's account card.

9. M6 (step 30): mark at least 12 hours ahead, proofs on scratch rows only, no real account. Stop with the migration line before it is applied.

LOCAL RUNS THIS TURN
- By id: AU-12, LS-6 to LS-10, PW-141, PW-142, PW-143 and the new step 20 test.
- Whole files, both projects: post-wizard-pricing and post-wizard-bundle2. They walk the contact step most, and neither has had a whole-file run since Part C.

The standing rules are unchanged: CI read first each turn (the three curl lines), red first, spec files edited by hand, no default changes in shared helpers, the five checks before each commit, the count line and file list in every report.
