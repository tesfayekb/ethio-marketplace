Source: supervisor thread, turn 1332, Sun 2026-10-04 14:33 New York.
Status at 2026-10-04: built (the executor reported Parts A and B complete on 2026-10-04 15:48; first full CI proof was run 37229673741 on f0120a95, red on two tests, then green at fcc9b822).
Related: bundle 4 Parts A and B (brief steps 5, 9, 10, 11), DEC-109.

RULING — bundle 4, turn 5. Base: dev a29a4294. Main is still 72cc8102.

0. READ CI FIRST
   The runs on 06b61f1 and fa6a1df were cancelled by your next push. A run on a29a4294 started at 18:31 UTC. Read it before any edit:
   curl -sS https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md
   curl -sS https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md
   curl -sS https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md
   These addresses answer 200. Do not use git for that branch. Paste the commit and conclusion lines in your report. Red is fixed first.

ACCEPTED
- Item 1 (a, b, c), step 5's PW-135, step 10's price line, deal lines, card columns and label loading.
- "One-off" no longer printed: accepted, as the brief says.

1. PRICE WORDING (step 10)
   The line prints "4,100 ETB Per day": a picker label mid-line. The period goes through the same template as the unit, post.review.pricePer, with basisNoun of the period label: "4,100 ETB per day" in English, "በቀን" in Amharic. A one-off price still prints the amount alone.
   Change with it: the two period rows of price-line.test.ts, and e2e/post-wizard-pricing.spec.ts:455 (toContainText("Per day")).

2. SIDE PREVIEW (step 10's gap)
   wizard.tsx:578 passes definitions={[]}, but the wizard already holds the definitions (wizard.tsx:157, read at :222). Pass them for the size and terms lines only; the side preview's own specifications list stays as it is today. No second read.
   A value whose option label the wizard does not hold prints nothing. A raw token is never printed.

3. STEP 9: its four tests, on a scratch category whose scratch keys carry the door's family names (unit_of_sale-<stem>, pack_quantity-<stem>, a terms key). In the same tests, check on screen that the size line and a terms line appear on the review step and in the buyer's preview.

4. STEP 11: the shared picker.

5. Then Parts C, D, E, F in the brief's order, then M6 and its stop.

HOW TO WORK
- A clean point is not a reason to stop. Keep going until the platform ends your turn, the M6 line, or a question the brief cannot answer.
- When Parts A and B are complete (after item 4), say so on the first line of your report.
- The turn 4 rules stand: local run of the changed spec files (at most three), tests of a changed shared helper by id, no default changes in shared helpers, spec files edited by hand, the five checks before each commit, the count line and file list in every report.
