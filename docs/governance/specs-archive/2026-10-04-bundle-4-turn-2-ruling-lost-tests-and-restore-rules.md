Source: supervisor thread, turn 1318, Sun 2026-10-04 11:27 New York.
Status at 2026-10-04: built as dev 95a9d187 (lost tests restored, counts verified in turn 1320; CI run 37217294926 on it was red with 59 failures, closed by turn 3).
Related: bundle 4 Parts A and B, INC-426, DEC-110, DEC-113.

RULING — bundle 4, screens A and B, second turn. Base: dev f183e2a6.

Do these in order. Do not start an item before the one above it is done.

1. LOST TESTS — INC-426. Fix this before anything else.
   What happened: the specs were restored from 37859cc9 (3 Oct 23:14). The turn started at e5127367 (4 Oct 15:08). Everything written between the two was deleted.
   - e2e/post-wizard-bundle2.spec.ts is byte-identical to 37859cc9 (git diff --quiet 37859cc9 f183e2a6 -- that file exits 0). 20 tests became 11. Lost: PW-125, PW-126, PW-127, PW-128, PW-129, PW-130, PW-131, PW-132, PW-133. This file was changed in ca18bf0f and is missing from your "files changed" list.
   - e2e/post-wizard-place.spec.ts: PW-12 is back on its pre-bundle-3 checks (messages toBeChecked / toBeDisabled, the alias "confirmed by the door" as a claim, phone values 911234567 / 922345678). Bundle 3's checks (the always-on messages box with no control, checking is not claiming, grouped phone values) are gone.
   - The other six specs lost nothing; I checked.
   Fix:
   a. git checkout e5127367 -- e2e/post-wizard-bundle2.spec.ts
      Then one edit only: PW-121. Its draft reopens on photos, and Next now leads to the price page, so the walk reaches the title page through the price page. Nothing else in this file depends on the order (openDraft at 5 and 6 opens post-step-6 and post-step-7 as before).
   b. git checkout e5127367 -- e2e/post-wizard-place.spec.ts
      Then re-apply by hand only the order changes: price page before title page, post-step-4 / post-step-5, and the review page's data-step 4 / 5.
   c. Paste the output of this, run after a and b:
      for f in a11y post-wizard-bundle2 post-wizard-category post-wizard-place post-wizard-pricing post-wizard-resets post-wizard-specs post-wizard-where; do echo "$f $(git show e5127367:e2e/$f.spec.ts | grep -cE '^\s*test\(') $(grep -cE '^\s*test\(' e2e/$f.spec.ts)"; done
      Expected: a11y 2 2 · bundle2 20 20 · category 20 20 · place 18 18 · pricing 16 16 · resets 9 9 · specs 29 29 · where 14 14. A number that differs is named with its reason.
   d. Paste: git diff --stat e5127367 -- e2e/post-wizard-bundle2.spec.ts e2e/post-wizard-place.spec.ts
   Rule from now on:
   - A file is restored only from the commit the turn started on, never an older one.
   - After any restore or scripted rewrite of a spec, the count line in c and the diff stat against the turn's start are run before the commit and pasted in the report.
   - A test that is removed or renamed is named in the report with its reason.
   - The report's file list is taken from git diff --name-only <turn start>, not from memory.

2. STEP 9 CENSUS — before any further screen edit. Add it to docs/governance/briefs/bundle-4-census.md.
   It answers, with file:line, for the only / exclude path of step-specifications.tsx:
   - what each mounted copy does on its own: the schema read, the fields report (:305–316), the option loading (:384–419);
   - what the price page's two copies (wizard.tsx:947 and :961) therefore do twice;
   - whether one copy's fields report can overwrite the other's.

3. FINISH PARTS A AND B (brief steps 1–11).
   - The price page reads the schema once, loads each option list once, and sends one fields report covering all of its rows. You choose how (one read lifted above the two copies, or one copy drawing its groups around the price control); say which in one line.
   - types.ts: SEQUENCE [1, 3, 2, 4, 5, 6, 7, 8] and STEPS are already right. In isStepFinished only the comment is stale ("went on to details"); the rule draftStep >= 4 still means "past photos".
   - Everything else the brief lists for steps 1–11 that is not yet done.

4. CHECKS BEFORE THE COMMIT. Typecheck, lint, whole unit run, whole-tree format check, the translation usage map. Local browser run, both projects, 2 workers, these three files only: post-wizard-pricing, post-wizard-place, post-wizard-bundle2. The other five changed specs are proven by CI.

5. END THE TURN THERE. Parts A and B complete and pushed is the end of this turn, so that CI gets an uncancelled run on that commit. Short report: the pastes from 1c and 1d, the census's answer in three lines, the local run's result, anything not done.

6. NEXT TURN starts by reading CI on that commit (curl, ci-evidence). Red is fixed first. Then Parts C, D, E and F without stopping, then M6 and the stop before it is applied, as the brief says.

RULINGS ON YOUR REPORT
- The 429s: by design, no change. In test mode the finder allows 2 calls an hour per address (src/server/catalog-find.server.ts:70). The wizard tests that type in the category search send no x-e2e-catalog-find-key, so they share one address. A refused finder leaves name matches only (step-category.tsx:169). It did not cause the three failures. Do not add the header to those tests and do not raise the limit.
- Timings: accepted. Worst total 3.97 ms against the 50 ms target. Step 24 is closed on the door side.
- M6's mark at least 12 hours ahead: accepted. M6's proof block uses scratch rows only, no real account.
- Step 23 as ruled before: no identity call when nothing changed, one call when both the name and the contact details changed.
- PW-88 and PW-104 rewritten to ask the unit on the price page: accepted, subject to CI.
