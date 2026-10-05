Source: supervisor thread, turn 1324, Sun 2026-10-04 13:51 New York.
Status at 2026-10-04: built across dev 72cc8102..f0120a95 (item 1 and Parts A and B reported complete 2026-10-04 15:48; Parts C to E and part of F by f0120a95); its standing rules were repeated by the turn 5 and turn 6 rulings.
Related: bundle 4, INC-426, INC-427, PW-134, PW-61, M6.

RULING — bundle 4, turn 4. Base: dev = main = 72cc8102. CI run 37220875850 passed, 0 flaky, promoted.

ACCEPTED
- INC-427 fix and PW-134. INC-426 closed: counts 2/21/20/18/16/9/29/14, no id lost.
- leaseSeller's two options, PW-118's public name, PR-3 saved at step 7, PR-18 at step 5 with a free price, PW-88's key, PW-104's three checks.

Do these in order, without stopping between them. Stop only for the M6 line, a question the brief cannot answer, or your turn limit.

1. THREE SMALL ITEMS FIRST
   a. Same class as INC-427: the home-country select (step-who.tsx:974) is drawn and enabled while the stored identity is still being read, and the read then sets it. Add identityPending to its disabled rule.
   b. PW-134: with the fix the boxes never appear early, so the 3-second wait (:302) is spent on every run. Replace the two branches with one path: while the read is held, the loading line is visible, post-who-first has count 0 and the country select is disabled; then release and type.
   c. PW-61 lost its on-screen check that the title and description are empty (DB only now). Restore screen truth without touching Undo:
      - first test: on the price page after the reset, the amount box (post-price-amount) is empty;
      - "after ten seconds" test (:554): walk on with a free price to the title page and assert both boxes are empty.

2. FINISH PARTS A AND B. Open by my reading of the code:
   - step 5: the test at 1280 (no spec names post-step-list-go);
   - step 9: its four tests;
   - step 10: no screen reads price_unit yet (the shared price line, the card, review, preview, detail);
   - step 11: the shared picker.
   Before you start, list brief steps 1–11 as done (file and test) or not done, and build the not-done ones.

3. PARTS C, D, E, F in the brief's order. Step 23 as ruled: no identity call when nothing changed, one when both changed.

4. M6 (step 30): mark at least 12 hours ahead, proofs on scratch rows only, no real account. Stop with the migration line before it is applied.

RULES FOR EVERY TURN FROM HERE
- Each turn starts by reading CI; red is fixed first.
- Local browser run: the spec files changed that turn, at most three, both projects, 2 workers. When you change a shared helper or a walk that other specs use, also run the tests that use it, by id.
- A shared helper never changes its default. New behaviour is an option.
- Spec files are edited by hand, walk by walk. A restore is only from the commit the turn started on.
- Before each commit: typecheck, lint, whole unit run, whole-tree format check, translation usage map.
- When a turn ends before the work does: the count line, what is done and not done by brief step number, and the file list from git diff --name-only <turn start>.
