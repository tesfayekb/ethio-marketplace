Source: supervisor thread, turn 933, Tue 2026-09-29 05:30 New York.
Status at 2026-10-05: sent to the curator 2026-09-29 05:30; carried out: batch 1 step-2 files delivered (turn 962), audited and imported 2026-09-29 (180 changes, pass 2); DEC-088 (two-key condition) was built later as INC-381 in bundle 4; the yes/no lock (W4b) was never built as such; not in the repo.
Related: Study C27 batch 1, S68, DEC-088, W4b, INC-296, INC-292, DEC-057b, D24, D48, order law E.

The review note is thorough: all 13 leaves are covered, every class has an answer, and the counts go to zero except the one explained remainder. I've ruled on all 11 decisions within your standing rules. One of them corrects an error of mine, so nothing needs your decision unless you disagree with a line.

- **My error, decision 2 (logged as S68).** Your rule says every category needs *at least* two must-fill card questions. I wrote class H as "only the two card rows", and the curator applied that literally, clearing card 3 on 11 Food leaves. Card 3 is legitimate: it's required, and it's also the third fact shown on a listing's feed card. The corrected rule: keep card 3 where every seller knows the answer and buyers look for it; clear it where many sellers can't answer.
- **Decision 8 needs no workaround.** I checked the code. The database already enforces "required" on any linked field, card or not (`validate_listing_draft`, the `is_required` check at `:213`). The importer doesn't refuse a required field that isn't a card, and the form shows its asterisk. So the book title can be required without being a card, today.
- **Two follow-ups for the form engine** go into the same Lovable turn as the yes/no lock (W4b):
  - The "fasting-friendly = yes" locks are held until that turn lands.
  - The curator found that net weight is still asked on per-kg listings. Hiding it needs a condition that tests two answers at once, which the engine can't do yet. That's queued as **DEC-088**.

## Send this to the curator

```
Batch 1 rulings (all 11), from the supervisor for the operator — build step 2 on fresh exports.

1. Order law E supersedes "unit at 1" (2026-09-21), D48 and the §9.1 unit-beside-fold rule: identity (type → brand → write-in) → specs → made-in → unit, weight, volume, pieces → condition band → seller statements. Confirmed — it is the operator's walk ruling (producer before net weight). Keep every row a condition, fact or bound depends on after the row that sets it.
2. CORRECTION to class H (supervisor's error): the operator's rule is AT LEAST two must-fill cards; card 3 is legitimate (required and shown on the feed card). Rule per leaf: keep card 3 where every seller knows the answer and buyers scan for it; clear it where many sellers cannot answer. Apply: KEEP card 3 on freshness (Meat, Dairy & Eggs; Frozen & Prepared) and on growing region (Coffee & Tea — conditional card on a leaf with two unconditional cards, D24); CLEAR card 3 on brand ×6 (the lists are now write-in or partial) and sealed ×2. Books keeps rights_basis as card 3 for digital copies (no longer a remainder). Amend count (d) to: required rows other than cards 1–3, a model level, or an identity name.
3. Brand lists: delete the 17, add the 28 sourced, write-in (`brand_name`, shown when brand = Other) wherever no reliable list exists. Confirmed.
4. One home per product: all six moves confirmed.
5. The six new spec fields: all confirmed.
6. organic_certified off the Food root, linked on the 7 leaves; fasting-friendly unlinked at Spices: confirmed.
7. Rename "Packaged & Imported" → "Pantry & Packaged / የጓዳ ዕቃዎችና የታሸጉ ምግቦች" (slug kept): confirmed — include the categories file.
8. book_title REQUIRED WITHOUT A CARD: this works today — the door enforces is_required on any link (validate_listing_draft, is_required check), the importer accepts it, and the form shows the mark. No card change; genre and condition stay the cards.
9. Books — publisher, exam, faith (tradition), age (age_range), grade KG–12 only: confirmed.
10. volume_ml max 20,000 mL: confirmed.
11. Brand order by market presence / share: accepted.

Engine items, not yours to solve: the yes/no locks you listed ("lock when W4b lands") and "net weight hidden when the unit is per kg" (a two-key condition, DEC-088) are queued for the engine; keep both lists in the change note so they apply the moment the engine lands.

Step 2 delivery: files built on FRESH exports (the operator attaches categories, definitions, links after W4 lands); expected previews for each file; the INC-296 approval list (10 new keys, 60 new options, the renamed category). Import order for the operator: categories file first; then definitions and links TOGETHER in one attributes pass (the C25 lesson — a split pass refuses rows that reference new keys).
```

This batch's files wait for fresh exports. Import them after W4 lands, so the new model-required rule and the settled-spec hiding are live when you walk the result.
