Source: supervisor thread, turn 1320 (ruling) and 1322 (amendment), Sun 2026-10-04 12:58 New York.
Status at 2026-10-04: built as dev = main = 72cc8102 (CI run 37220875850 passed, 0 flaky, promoted; verified in turn 1324).
Related: bundle 4 Parts A and B, INC-426, INC-427, INC-428, PW-134.

RULING — bundle 4, turn 3: green the board. Base: dev 95a9d187.
CI run 37217294926 on 95a9d18: FAILURE. 59 failures (30 on mobile-360, 29 on desktop-1280), shards 2, 3, 5, 6.

This turn fixes the red and nothing else. No new brief step is started.

ACCEPTED FROM YOUR REPORT
- The restore: I checked it. Counts 2/20/20/18/16/9/29/14, and bundle2's test ids equal e5127367's. INC-426's lost tests are closed.
- The extra fixes (title-page walks in place and pricing, named sellers in PW-13, PW-115/116, PW-123): accepted.
- The step 9 census and one copy of the form on the price page: accepted.

1. READ THE EVIDENCE FIRST
   curl the e2e-last-failure.md of that run and check it against the classes below. A test that does not fit its class is reported, not forced.

2. CLASS E FIRST — APP DEFECT, INC-427 (PW-13 on mobile, flaky on desktop; PW-123 flaky; also behind PW-48). Red first.
   My reading of src/features/posting/step-who.tsx. Your trace decides; if it shows another cause, fix that cause and say so.
   - The name boxes are drawn while the stored identity is still being read (:562, "editing || identity === null").
   - When the read lands it runs setAlias(found.alias ?? "") and the same for first name, last name and business name (:223–228). Whatever the seller typed before that is wiped.
   - The check's answer is not tied to the box (:395–408). The timer still answers "ok" for the wiped name, so the tick shows over an empty box.
   - Next then finds an empty name and saves none (:418). Publish refuses "required".
   - PW-12 does not hit it because it does other work before it types. Before M5 nothing needed the name at publish, so it stayed hidden.
   Fix, for the whole contact step:
   a. No box of the identity block is drawn until the read has answered or failed. A loading line holds the place. The read-failed path keeps its boxes.
   b. A check's answer is applied only when the box still holds the name that was checked.
   Test (red on today's code): delay the profile read, type first name, last name and public name as soon as a box exists, let the read land. The boxes still hold what was typed, Next saves it, DB truth shows the alias and both names.

3. CLASS A — WALK ORDER, 22 tests. The script swapped 4 and 5 without following each walk.
   - category: PW-54, PW-27
   - resets: PW-26, PW-73, PW-61, PW-79
   - specs: PW-5, PW-6, PW-69, PW-70, PW-77 (both), PW-74 (both), PW-75, PW-18, PW-19, PW-22, PW-28, PW-9, PW-43
   - where: PW-89
   What I read:
   - post-wizard-specs.spec.ts: nextThroughPhotos (:187) lands on post-step-4, and the lines after it now expect post-step-5 (:278, :309 and the rest).
   - PW-69 and PW-74 (:606, :949): the lines that filled the title and went on were deleted, but the Back loop still expects [4, 2, 3] starting from step 4.
   - PW-27 (:924–926) clicks post-step-strip-go-5 and expects post-step-4.
   The truth each walk is checked against:
   - Next from photos opens post-step-4, the price page.
   - The title page is post-step-5, reached through the price page (a free price passes it).
   - Back from 5 walks 4 → 2 → 3.
   - go-N opens post-step-N.
   - A test that only needs "the answers reached the draft" stops at post-step-4. A test that uses the title or description goes on to post-step-5.
   Rule: each walk is read top to bottom and fixed by hand. No search-and-replace on spec files.

4. CLASS B — UNNAMED SELLER: PW-48, PW-84, PW-98, PR-3. Fix it in the shared helper.
   - leaseSeller (e2e/helpers/posting.ts:93) gives every leased seller a first and last name by default. Options: named: false for none, alias: true for a scratch public name as well (tests that save a whole draft or publish through the route).
   - The pool reset already clears the three columns (e2e/helpers/users.ts:317–330).
   - Remove the per-file copies (bundle2's nameSeller, PW-13's inline update).
   - Read every caller: a test that proves the refusal or needs an empty name box passes named: false. List those callers in the report.
   - PR-3 also shows home_country_code required. Read why its seller is unconfirmed at that save.

5. CLASS C — ROUTE ORDER: PR-18. It received price_amount required where it expected description tooLong. The description is judged at step 5 and the body carries a price. Check every other body in posting-routes.spec.ts that names step 4 or 5.

6. CLASS D — FIXTURE.
   - PW-88: the scratch quantity key is <stem>_quantity (e2e/helpers/posting.ts:2427). The door's quantity family is quantity_available, so the door keeps that row on the specifications page. Name the scratch key quantity_available-<stem>, as the unit is unit_of_sale-<stem>.
   - PW-104: a settled answer is stored, not shown (D44, step-specifications.tsx:1401–1410; brief step 9). The test asserts: no unit control on the price page, the amount's label names the unit (brief step 8), DB truth per_kg.

7. CLASS F — LS-6 on desktop: INC-428, no change. Another scratch guess city sat at its point, most likely left by a cancelled run inside the reaper's one-hour window. If LS-6 is red on a run that starts more than an hour after the last cancelled run, report it.

8. LOCAL RUN, this turn only: by test id, both projects, 2 workers — the 30 tests above, the new INC-427 test, PW-12, PW-13, PW-123. This replaces the three-file limit for this turn; the set is smaller than three files.

9. CHECKS AND END. Typecheck, lint, whole unit run, whole-tree format check, translation usage map. Push. End the turn so CI gets an uncancelled run.
   Report:
   - the count line (same command as last turn) and the diff stat per spec against 95a9d187;
   - what the INC-427 trace showed;
   - the leaseSeller callers that pass named: false;
   - the local run's result;
   - anything not done.

10. NEXT TURN starts by reading CI on that commit. Red first. Then what is still open in Parts A and B by my reading of the code:
   - step 5: the test at 1280 (no spec names post-step-list-go);
   - step 9: its four tests;
   - step 10: no screen reads price_unit yet;
   - step 11: there is no shared picker.
   Then Parts C, D, E and F without stopping, then M6 and its stop.

<!-- extractor: next part is from turn 1322, Sun 2026-10-04 13:05 New York -->

You're right. Parts A and B were planned as one Lovable turn and this is the third.

**Where the turns went:**
- **The step swap touched every wizard test.** Lovable did it with a script, broke the walks, then restored from the wrong commit. One whole turn went to recovery.
- **My local-run limit hid the breakage.** I capped local browser runs at three spec files for speed, so the other five files were only tested in CI, a turn later. I also sized A and B as one turn when the change reached about 140 tests.
- **Lovable's own turn limit** cut two turns short mid-work, and the migration approval dialog cost another.

**What I'm changing:**
- **No more stops just to wait for CI.** Once the board is green, Lovable runs the rest of A and B and then Parts C to F in one stretch; that is already in the ruling.
- **No change that can break tests it doesn't name.** The ruling I just gave made every test seller named by default, which is exactly the kind of wide change only CI can prove. The amendment below makes it opt-in.
- **I hand Lovable the diagnosis.** I read CI and classify the failures myself, as I did this time, so it doesn't spend a turn finding causes.

My estimate for what is left is 6 to 8 Lovable turns: one to go green, one or two to finish A and B, two for C to F, then the second migration, its screens, and the docs.

Send this after the ruling (or add it to the end if you haven't sent it yet):

---

```
AMENDMENT to item 4 of the turn 3 ruling.
leaseSeller's default does not change. Add the options only: named: true gives a first and last name, alias: true also gives a scratch public name. Only the tests that need them pass them: PW-48, PW-84, PW-98, PR-3, and the tests that already name their seller by hand (PW-13, PW-115/116, PW-123), whose per-file copies go. No other test's seller changes, so no caller list is owed in the report.
