# RULING — P-2 (c) c2a, stop 9 (the budgets): the reading screens' table read goes behind loadOnce; the card pages' and the ad page's growth is the mechanism's cost, ceilings moved with their causes (DEC-355). Base: cursor/p2-fold a69bb24a0.

Save this file by scripted copy as `docs/governance/briefs/p2-fold-c2a-ruling-9.md` (INC-1076) in your first commit after it.

## 1. What is accepted

Ruling 8 §2 as built (CF-LIST-1's second heard state, CL-12 red-first, PMS-7, the allowance gone) and ruling 6 §5 (one `levelNameFor` helper, the four copies gone, its law in the harness guide). The split of the read and its two hooks into `src/features/levels/use-level-rows.ts` is right — a read never belongs in a chunk every page downloads — and it stands as a recorded departure.

## 2. The growth, ruled by its cause, not by the old number

Ruling 1's 0.1 KiB line was written for a word fold; it did not foresee a store whose parser and name chooser must be on the client before the server-rendered cards hydrate. My magnitude check applies to my own line: about 1 KiB gzipped on a 200 KiB page, for data-driven level looks and names in every language in place of hard-coded tier words, is the mechanism's cost, not a defect. Recorded as **DEC-355** (not a silent widening — §7):

- **Option 2 for the reading screens — do it.** Every screen that reads the level rows from the table (the admin and reading screens, eight pages by your count) takes that read behind `loadOnce`, as DEC-261's law says for any database read on a first-paint path; the hooks' API and the screens' behaviour do not change; the read still happens when the screen needs it. About 1 KiB back on eight pages.
- **Option 1 for the card pages and the ad page.** Their growth after the split (card pages about +1.06 KiB, `/l/$slug` about +1.35 KiB) is the store's parser, seed and chooser that the server-rendered cards need on hydration; the ceilings of the pages that cross or come within the NEAR band of their line move by DEC-296's ratchet form, each with the cause in the budgets file's comment ("the levels store's parser and chooser on hydration, P-2 (c) c2a, DEC-355") and in the report's table; a page that grew but stays under its ceiling is reported, not moved.
- **Option 3 refused**: the ad page's similar ads and save button seeding the store is the GO's design (one seeding path for every card reader); the saving is small and the second code path is not worth it.
- The tolerance from here on, for the rest of P-2 (c): a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP. No bare number.

## 3. Your two slips — recorded, not yours to fix

- `git cat-file -e` for the base rebuild: read-only and not on rule 00's list. Recorded for the Cursor-rules turn (the list gains `cat-file` as a read command); nothing to undo.
- `/tmp/c2a-base` left on disk because the tool refuses `rm`: the operator removes it by hand after the turn; it is outside the repository and harmless. Recorded for the rules turn: scratch copies go under one named folder the operator clears.

## 4. Then finish

After §2's two changes: `bun run checks` whole (NH-6, actionlint and gitleaks are the known Mac limits — name them, as you did); the budgets green locally against CI's own sizes where you have them; the self-review; the final report (`docs/governance/reports/p2-fold-c2a.report.md`: FINDINGS — SBE-1's cause, the guard's second heard state, the helper, the read split, the budget table chunk by chunk with each cause; K2 incl. the `permanent` allowance form; Records — DEC-352, DEC-353, DEC-354, DEC-355, INC-1085, INC-1086, register row 118 as landed, S557 named as the supervisor's, your two slips; the CI line of the last commit once its run completes). Push, END THE TURN; PR #30 stays a draft. Stop only for a question none of the rulings answers.
