Source: supervisor thread, turn 911, Mon 2026-09-28 22:51 New York.
Status at 2026-10-05: built as c22a3bdb (all 25 jobs green; fix at step-specifications.tsx:764; PW-74 red-then-green; D72 uniform marks; a11y 0); Part D's read-only table produced INC-331; D72 is a design ruling not recorded in the repo ledger; the repo holds the built behaviour (docs/features/posting.md W3 entry), not this prompt.
Related: W3, INC-329, INC-320 (S67), D72, PW-74, INC-331, INC-330 (PW-17 flake).

You're right: it's system-wide, and I've found the root cause in the code. My INC-320 fix made it show up on every Back (logged as S67). Your year was really erased, not just hidden, which is why Next stayed blocked.

**Root cause (INC-329).** On the specifications step, one routine resets the dependent fields whenever a "parent" picker changes, for example the year when the model changes (`step-specifications.tsx:756–764`). It works out which pickers count as parents from their loaded option lists (`:652–668`). A picker whose options carry facts or year limits only counts as a parent once its list has loaded. When you come Back, the model list now loads (my INC-320 change). At that moment the model *joins* the parent set, and the routine compares it with a remembered value of nothing, so it treats the model as newly chosen. It then wipes what the model governs, and the year has no fact to refill it from.

The same thing already happened before my change, in any category where such a picker's list arrived after the form had first opened. That fits what you've seen in other categories. The fix is small: a picker that newly joins the parent set records its current answer as the starting point; only a real change triggers a reset.

**Asterisks everywhere (D72).** Decided. The asterisk already lives in one shared piece of the form (`field.tsx:151–158`). Controls that draw their own labels, like the category box, don't get it. The fix is to use that shared marker on every required control on every step.

**Leaked-password protection** was already on for both projects, so that's closed.

## Paste this into Lovable

If C2 is already with Lovable, send this the moment C2 reports. If not, send this first and C2 after: it fixes a regression that's in the published app now.

---
```
W3 — answers erased on Back (INC-329, system-wide root cause), a round-trip law test, uniform required marks (D72). Tier B. No migration.

SCOPE — you may touch only:
  src/features/posting/step-specifications.tsx   (PART A: the movedKey line only)
  src/features/posting/field.tsx, and the step files whose required controls render their own label (PART C — census them; name each)
  e2e/post-wizard.spec.ts   (PW-74, PW-75 after PW-71)
  docs/features/posting.md, docs/_changelog.md
Census first: cite the lines you change.

ORDER (evidence first): write PW-74, run it on the UNFIXED code and paste its failure; then apply PART A and show it green.

PART A — INC-329. The reconciliation derives `parents` from LOADED option lists (step-specifications.tsx:652–668: a picker joins when its options carry facts or bounds), but compares against `parentsSeen` (:756–764) as if every parent had been seen from the first pass. A picker whose list arrives after the first pass therefore "moves" from "" to its stored answer, and the D25 reset erases what it governs (a year bounded by the model has no fact, so it is deleted). Since INC-320 this fires on every Back for an answered big list; before it, for any fact/bound-carrying picker whose list arrived after the first pass. Fix: a key that is NEW to the parent set records its current answer as its baseline — movedKey only considers keys present in `before` (`key in before && before[key] !== now[key]`); `parentsSeen` then holds every current parent. Comment: INC-329 — joining the parent set is not a move; only a changed answer resets. Nothing else in the effect changes.

PART B — PW-74, the round-trip law (system-wide): scratch leaf and scratch definitions only (G27): identity picker (card 1); make (fold owner) → model (options carry a year bound AND a fact for another detail); year (number, format year, required); a small fact-carrying picker whose options set another detail (the Treadmill → power-source pattern); colour, multi-select, boolean, number, text, and a select answered "other" with text. Fill everything → Next to step 5 → Back to step 3 → assert (a) every control shows its answer (toHaveValue / checked / chip text), (b) post-category-reset-undo is NOT shown, (c) DB attributes equal the filled set exactly; then focus (tap) the model select without changing it → nothing changes (same three assertions). If the seed helper can make a > 200-option list, run the model as a big lazy list too; say which variants ran.

PART C — D72. Export the existing required marker from field.tsx (:151–158: the "*" aria-hidden + sr-only "Required") as one primitive with data-testid="post-required-mark", use it in Field, and put it on every required control that renders its own label — at least the step-1 category heading, and every control the door refuses as `required` at steps 4–7 (census each step's required fields from the door and name the control that shows the mark). PW-75: the mark is present on the category heading at step 1 and on the title at step 4, and absent on an optional detail.

PART D — read-only census: list every path in step-specifications.tsx that deletes or overwrites an answer (at least :394, :424, :808, :824, :880, :888, :904, :960, :1043) and, for each, whether it can fire WITHOUT a seller change (mount, a list arriving, Back, focus/tap). Fix nothing beyond PART A; report the table.

DOCS: posting.md — INC-329 note (mechanism, the rule, PW-74) and D72; changelog line.
INVARIANTS: DEC-023 local run of post-wizard.spec.ts on both projects; whole-tree format:check; report only on green; nothing outside scope; limitations before the end.
COMPLETION REPORT: PW-74's failure on unfixed code (verbatim); the movedKey line as landed; PW-74/PW-75 green; the controls given the mark; the PART D table.
```
---

Nothing to attach. After it's green and I've verified it: **Publish**, then walk the car path again. Make, model and year → forward to the price step → Back: every field still filled, no Undo banner, and a red asterisk on the category heading and every required field. Try one other category with linked fields too, like fitness equipment or phones.
