Source: supervisor thread, turn 1368, Sun 2026-10-04 19:06 New York.
Status at 2026-10-04: status list given to the operator on his request ("PLEASE LISTS TASKS COMPLETED, TASKS REMAINING"); not ruled on; since then row 5's catering rows moved forward as C29 and row 10 (records turn) moved to its own docs-only turn.
Related: bundle 4, L1, L2, DEC-128, DEC-129, DEC-130, INC-426, INC-427, INC-428, INC-430, INC-431.

Everything below is checked against the repo at `fcc9b82` (dev and main are the same commit, CI green).

## Completed

**Bundle 4 (posting wizard)**
- Parts A to F are built: new step order, price page, title, picture, lifetime, place, and the contact step with required names and suggestions.
- Both migrations (M5, M6) are applied on staging and on prod.
- Four defects found on the way are fixed: the scripted spec rewrite (INC-426), names wiped on the contact step (INC-427), leftover test rows breaking later runs (INC-428), and the silent Next (INC-430).
- 19 new tests were added (PW-134 to PW-151, PR-25); none were lost.

**Legal**
- English Terms, Privacy Policy and publishing statement: written and agreed by you.
- The 2020 documents were reviewed section by section, and four other marketplaces compared.
- Amharic translation of all three texts is in the doc.
- Decisions settled:
  - 18+ with no date of birth
  - versioned documents with recorded acceptance
  - certification on publish, edit and renew
  - retention periods
  - gambling banned
  - 30-day notice
  - Georgia law
  - 100 dollar limit
  - right to act without notice

**Other**
- Catering research prompt sent to the curator.
- GitHub exposure questions answered; the repo stays public until launch.

## Remaining

| # | Task | Who | When |
|---|---|---|---|
| 1 | Turn 9: Part G screens (two-answer conditions, settled ranges, country and category tokens) | Lovable | Now |
| 2 | Turn 10: docs and final report, legal record lines, map-pin Amharic fix (INC-431) | Lovable | After turn 9 is green |
| 3 | Publish, then one short walk | You | After turn 10 |
| 4 | Build the legal section: admin-managed documents, acceptance screen, publishing certification, buyer safety line | Lovable | Right after bundle 4; my estimate is 4 to 6 turns |
| 5 | Curator batch: rent and hire price rows, short-term rentals, settled ranges, two-answer rows, tokens, catering rows | Curator | After bundle 4, once I rule on the catering note |
| 6 | My ads screens with retention (sold label, 12-month copies, timed erasure) | Lovable | After 4 |
| 7 | Report button on every ad; "Your data" page with identity check | Lovable | After 6 |
| 8 | Spec for posting ads on ethio.com's own social channels | Me | Not started |
| 9 | Close-out bundle: seven older parked parts from bundles 1 to 3 (S1, S2/S3, T, A, B, C, Part O), the full-suite run, CI reporter fixes, security census items, photo clean-up | Lovable | Before the phase closes |
| 10 | Records turn: decisions DEC-081 to 130 and defects INC-308 to 431 into the ledger | Lovable | With close-out |

**Yours before launch**
- Create the legal@ and privacy@ mailboxes.
- Register the copyright agent (I'll guide you).
- Have a native speaker read the Amharic.
- The lawyer's list of six points waits for the Ethiopia-entity milestone and does not block launch.

The roadmap file in the repo still shows M5, M6 and Part F unticked. They are done, and turn 10 corrects the ticks.
