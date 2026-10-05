Source: supervisor thread, turn 931, Tue 2026-09-29 05:25 New York.
Status at 2026-10-05: built: W4 Part A (door, migration mark 20260929180000, DEC-086 live on ethio-prod, 58bfd6d7) and the remainder (4de0e33, run 36561472744 green); the standing rule G29 was proposed as an instruction amendment and never installed by the operator; the repo holds the built behaviour (docs/features/posting.md DEC-085/DEC-086 sections and the changelog), not this prompt.
Related: W4, DEC-085, DEC-086, INC-330, INC-331, PW-74, PW-76, PW-77, PR-16, G29, CI-T1 closure.

CI-T1 is done: CI is green on `7c300b6e` (all 25 jobs), and main was promoted.

- **The split worked.** The slowest shard is now **12.4 min, down from about 20**. Push to report took **14.6 min**. That's run 1 of the 3 green runs our rule needs at 19 min or less.
- **PW-10's cause was a real bug, not the split.** Both currency pre-fill reads skipped the "this seller only" filter:
  - The "last listing" read could pick up **another seller's** currency, because the access rules let anyone read active listings.
  - The profile read made the database check the admin permission against every row. That was slow enough on staging that the currency never arrived in time.
  
  Both reads now filter to the signed-in seller, and a unit test proves it. I checked every other "my own row" read in the app: they all filter explicitly already, so nothing else has this bug.
- **One record fix:** Lovable's code comment calls this INC-331, but it's **INC-330** (the currency flakes). INC-331 is the auto-filled-answer risk from last night. W4 corrects the comment.
- **Watch items:** PW-58 (the commission box once didn't appear) and PW-48 flaked once each. Three flakes in seven days would trigger the rule.

Lovable offered to "continue" with its local six-shard run. That's no longer needed: the CI timing section is the after-picture, measured in the real environment, so an hour-long local repeat would add nothing. Tell Lovable CI-T1 is closed, then paste W4:

---
```
CI-T1 is closed on CI evidence (run 36547403556 green; its DEC-087 timing section is the after-table) — no further local six-shard run.

W4 — known products ask only what varies (DEC-085, DEC-086), the Back-risk on model-supplied answers (INC-331), two form fixes. Tier A (door). One migration.

STANDING RULE (G29): for every part, find and fix every instance of the same defect class across the app, not only the one named; list what you checked.

SCOPE — you may touch only:
  supabase/migrations/<new file>.sql (PART A)
  src/features/posting/step-specifications.tsx, field.tsx, wizard.tsx, step-category.tsx, pricing-data.ts (comment only, PART F)
  e2e/post-wizard-*.spec.ts (new tests as named), e2e/posting-routes.spec.ts (PR-16)
  docs/features/posting.md, docs/_changelog.md
Census first: cite the lines you change.

PART A — DEC-086 (operator ruling 2026-09-29): an exact-model question is REQUIRED whenever it matters. Rule, defined by behaviour, not by name: a dependent pick-list (a definition with depends_on) whose options carry facts, allowed or bounds for other details is required once its parent is answered AND the parent's chosen value offers more than one child option (Other counts as an option and is a valid answer). The door is the authority: re-declare validate_listing_draft whole (INC-183, from its latest base — census it) so that at step >= 3 such a child left empty is refused {attr_key, reason:'required'}; nothing else changes. PROOFS (scratch rows, sentinel rollback): P19 — parent answered with 2+ children, child empty → refused; P20 — parent answered with exactly one child → not required; P21 — child answered "other" → accepted. READ-BACK: body contains the rule; ACL unchanged. CLOSERS: INSERT INTO public.migration_marks (version) VALUES ('20260929180000') ON CONFLICT DO NOTHING; — later than your file's UTC stamp by design. APPLY PAIRING line in the report. The client mirrors it: the child shows the required mark (RequiredMark) and the soft border while empty, from the moment the rule applies. PR-16: the route refuses a step-3 save with such a child empty; accepts it answered.

PART B — DEC-085: a detail the chosen options pin to ONE value is filled and hidden, for every type — today only a single-select narrowed to one option is (lockedByModel, step-specifications.tsx ~:1149; the D44 return ~:1212). Extend: a number or year whose EFFECTIVE bounds (boundsOf, ~:603) have min = max is written with that value by the reconciliation (like INC-244's single-option fill) and hidden like D44; review and preview still show it; the door already judges it. Yes/no is NOT in this turn (W4b adds the catalogue format). PW-76 (exemplar, scratch catalogue only, G27): brand → series → model, the model option carrying a pinned pick-list, a pinned number (fact + min = max), a pinned year (min = max) and a non-pinned variant (storage with 3 allowed values, one prefilled); choose brand, series, model → the form shows ONLY the variant row(s) and seller-side rows; the pinned values are in the draft (DB truth) and on the review page; Back and forward again → unchanged.

PART C — INC-331 (your W3 PART D table, rows 905/912: a model-supplied answer re-derived on re-entry before the model's list arrives). Reproduce first: extend PW-74 with a prefilled detail the seller did not touch (a model fact that is NOT pinned) → Back → forward → it must keep its value; paste the failure on the unfixed code if it fails. If it fails, fix it with the INC-329 principle (nothing is cleared because a list has not arrived yet) and show green; if it cannot be made to fail, say so with the evidence and leave the code.

PART D — two form fixes from the operator's walk (class-wide):
  D1 — the step-1 required mark sits on the category LIST heading (not the search box — the search is optional) and disappears the moment a leaf is chosen, together with the soft border, including after Back. Check every step for a required mark on an optional control, and for a mark that should clear with its border; fix all.
  D2 — the scroll to the first refused field (D70) is a smooth scroll (respect prefers-reduced-motion) that brings the field's LABEL fully into view below the sticky header on a 360-pixel screen (scroll-margin-top on the field container, not the input), then focuses the control. PW-77: at mobile-360, a refused Next scrolls so the label's top is below the header and the control is focused.

PART E — nothing beyond A–D in the wizard.
PART F — pricing-data.ts: the new comment says INC-331; the defect is INC-330 (the currency pre-fill flakes). Correct the label only.

DOCS: posting.md — DEC-085, DEC-086, INC-331 outcome, D1/D2; changelog.
INVARIANTS: DEC-023 local run of every post-wizard-*.spec.ts and posting-routes on both projects; whole-tree format:check; report only on green; nothing outside scope; limitations before the end.
COMPLETION REPORT: the door rule as landed; proofs (or "block completed"); apply-pairing line; the PART B code; PW-74/76/77 and PR-16 results; the G29 lists for each part.
```
---

When Lovable reports, the migration steps are the usual ones:
1. Apply the migration to ethio-staging (SQL editor), expecting version **20260929180000**.
2. Re-run the failed CI jobs.
3. Tell me when CI is green. I verify, then you Publish and walk the phone path: Apple → iPhone 13 → iPhone 13 should ask only storage, colour and your own questions.
