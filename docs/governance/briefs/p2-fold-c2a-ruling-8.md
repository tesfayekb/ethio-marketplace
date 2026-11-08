# RULING — P-2 (c) c2a, stop 8: CF-LIST-1 learns the second heard state (aria-current on the same element); no allowance; then ruling 6 §5–§6. Base: cursor/p2-fold 65304c8af.

Save this file by scripted copy as `docs/governance/briefs/p2-fold-c2a-ruling-8.md` (INC-1076) in your first commit after it. It widens c2a's file list by the guard and its allowlist: `scripts/conformance/choice-lists.test.ts`, `scripts/conformance/choice-lists-allowlist.txt`.

## 1. §3 accepted; the new file accepted

Ruling 6 §3 is accepted as built: one name chooser (`src/features/levels/level-fields.ts`, `levelNameOf`) used by the card, the Set level dialog, `levelLabel` and the ad page; the ad page imports no store; no fallback word when both names are NULL; AV-12; SBE-1 12 of 12 and the three ad-page specs whole. `level-fields.ts` as a separate file is the right split (a chooser the page can reach without the store) and stands as a recorded departure from ruling 1 Q9's "one file", not a drift.

## 2. §4 — option 1, specified; options 2, 3 and 4 refused

The guard's law (INC-1027) is sound: a current row must be *heard* as well as seen, so the look by class may never travel alone. Today it knows one heard state — a radio item's checked state. The Promote sheet's current level is not a choice; it is the current item of a set, and WAI-ARIA's word for that is `aria-current`. So the mechanism gains the second heard state, and nothing is exempted:

- `scripts/conformance/choice-lists.test.ts`: the `#current` check moves from a whole-file regex to the AST walk — for every JSX element whose className expression contains `LIST_ROW_CURRENT`, the same element must carry an `aria-current` attribute (a literal `"true"` or an expression; an attribute on a parent or child does not count); an element with the class and no attribute is a finding with the existing message extended ("… or aria-current on the same element"); the doc comment at the top names both heard states (a radio item's checked state; `aria-current`). The owners keep their exemption as they are.
- Planted bypass: a unit case feeds the census a source with `LIST_ROW_CURRENT` on an element without `aria-current` → one finding; the same element with `aria-current="true"` → none; a parent with the attribute and the child with the class → one finding.
- `promote-sheet.tsx`: the current level's row carries `aria-current="true"` from the same state that draws `LIST_ROW_CURRENT` (never a constant `true` on every row); a unit or e2e assertion reads `[aria-current="true"]` on exactly the current row.
- `choice-lists-allowlist.txt`: the `promote-sheet.tsx#current` line goes. The other `permanent` line (the location selector's height) is pre-existing and not this turn's; it is a K2 sibling for the report (G55's "every line carries an expiry" against this guard's accepted `permanent` form — a records question for R13, not a change now).

Why not the others: 2 keeps a line that says the mechanism is wrong where it is right; 3 is a second constant for one look (W1 said one); 4 drops a decision the operator made.

## 3. Then ruling 6 §5 and §6, in order

The one e2e level-name helper and the four spec copies; then `bun run checks` whole; the budgets (the owner's ad-page ceiling moved by the ratchet form with its cause — ruling 7 §2; the public ad page's number stated); self-review; the final report (`docs/governance/reports/p2-fold-c2a.report.md`: FINDINGS — SBE-1's cause, the guard's second heard state, the helper, the budget move; K2 incl. the `permanent` allowance form; Records — DEC-352, DEC-353, DEC-354, INC-1085, INC-1086, register row 118 as landed, S557 named as the supervisor's; the CI line of the last commit once its run completes). Push, END THE TURN; PR #30 stays a draft.
