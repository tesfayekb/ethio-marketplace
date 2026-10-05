Source: supervisor thread, turn 1007, Wed 2026-09-30 18:14 New York.
Status at 2026-10-05: N1 (INC-357 engine fix) landed in c3761f9 with PW-102/PW-103 and the census (a5775647, 2026-10-01); N2 ('How it's sold' on the details step for goods) landed as cceab250 (2026-10-01); the help-length rule (first sentence ≤ 60) governed every later curator batch; DEC-093 (Buses & Vans accepted at 94.9 %) ruled here; the repo holds the built N1/N2 behaviour in docs/features/posting.md, not this text.
Related: INC-357, N1, N2, S80, S81, DEC-093, PW-102 to PW-104, help-length rule, C27 File 1, Vehicles step 2.

Two of your findings are real bugs, and the missing "How it's sold" has a cause I should have caught. Let me confirm both in the code.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

Both confirmed in the code. First, though, I'll audit the curator's File 1, because it's waiting for import.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

Your walk found an engine bug that stops sellers posting, plus one of my mistakes.

1. **You couldn't find "How it's sold" because it's on the price step, not missing.** Since the price-page change (DEC-081, part D62-2), every pricing unit is asked on the price step, and your walk stopped just before it. My walk told you it came before Net Weight, which was wrong: I wrote it from the catalogue order without checking which step shows it (slip S80). Your point still holds, since the package should come before its size. **My decision:** for goods, "How it's sold" moves back to the details step, just before the size. Services keep their pricing basis (hourly, quote, commission) on the price step. The price step then shows "per sachet" beside the amount.
2. **Writing the brand doesn't clear the error. This is a real bug (INC-357) that blocks posting.** When a product settles the brand to "Other" (tomato paste, pasta, sauces, canned food, cereal, nutrition, cooking oils), the form hides the brand row. But the database still requires the "Other" text inside that hidden row (`20260928034942:375–380`). What you typed in "Brand / Maker (write it)" is a separate question, so Next stays blocked. It's been there since the cooking-oil change, and my audits missed it because I never checked that database rule (slip S81).
   - **The fix:** a settled "Other" is never hidden. It shows its own write-in box.
   - **Your class request:** a test that every written answer (required, optional, and "Other" text) saves and passes Next.
   - The duplicate brand write-in then gets retired from the catalogue.
3. **The Net Weight help is too long.** Only the first sentence shows on the form, so the curator gets a rule: that first sentence stays under 60 characters, and the examples move behind the (i).

**Curator File 1 is clean.**
- All 15 "Other" categories now open with the required "What is it?".
- Each keeps two main questions.
- Nothing else in the catalogue changes.
- The three placements that follow the question-order rule are fine.

**Buses & Vans (my decision, DEC-093):** accept the three open cells. The curator found market listings showing the Karry K60 genuinely comes in both gearboxes, so no amount of research can close those cells. Holding the category would block useful fixes (the coach seat locks and removing Offer Type) for nothing.

**Your steps:**

1. **Lovable:** paste block 1 and send it now. If Lovable is still working, it picks the message up when its current turn ends.
2. **Admin › Attributes › Import:** `c27-o-definitions.csv` and `c27-o-links.csv` together. The preview should show **added 28 · changed 34 · unlinked 0 · unchanged 1,418 · refused 0**. It may instead show added 27 · changed 35, which is the same total. Apply it.
3. **Admin › Translations:** approve what's pending.
4. **Export** Definitions, Links and Categories.
5. **Curator:** paste block 2 and attach the three exports.

I'll send the next walk once the brand fix and the "How it's sold" move have landed.

**Block 1 — for Lovable:**

---
```
URGENT ADDENDUM to W6c/W6d (operator walk 2026-09-30, published build). Do N1 and N2 FIRST, then continue the agreed order.

N1 — INC-357: A SETTLED "OTHER" BLOCKS NEXT (sellers cannot post)
- When a product leaves a list with one allowed answer, INC-244 fills it and D44 hides the row (step-specifications.tsx:1000–1017, :1292–1299).
- When that answer is "other", the door still requires its text: validate_listing_draft refuses otherNeedsText (migration 20260928034942:375–380). The hidden row has no text box, so Next shows "Complete these to continue: brand-food" and never clears.
- Hit today at Sugar, Salt & Packaged Food (tomato paste, pasta, sauces, canned, cereal, nutrition) and Honey, Butter & Oils (both cooking oils). The next catalogue import adds Other Food › Factory-made.
- Fix in the engine: a single-select settled to "other" is never hidden. It renders as its own write-in box (the question's label, the "other" placeholder) and sends { value: "other", text }. The door is unchanged.
- Test PW-102 (scratch): a type option that allows only "other" on a list that has Other → the text box shows, typed text saves (DB truth), and Next passes.
- Class test PW-103 (scratch): a required text attribute, an optional text attribute, and a list's Other text each save and pass Next. An empty required one is refused by name.
- Census, report only: any other place the form hides a row whose door still demands input.

N2 — GOODS ASK "HOW IT'S SOLD" ON THE DETAILS STEP (amends D62-2 for goods only)
- Today every pricing basis is drawn on step 5: step 3 excludes the basis row and step 5 mounts it with only=[basisKey] (docs/features/posting.md, D62-2).
- The operator wants the container chosen before its size, and the catalogue already orders unit_of_sale right before Net Weight / Volume.
- A leaf whose basis key starts with unit_of_sale- asks it on step 3, at its display order.
- A leaf whose basis is pricing_type-… (services, hourly, quote, commission) keeps D62-2 unchanged.
- Step 5 shows the chosen unit beside the amount ("per sachet"), read-only, with a link back to change it on step 3. INC-347's facts and narrowing keep working; they now run on step 3 with the rest.
- Tests: update PW-55, PW-56, PW-57 and PW-63 where a unit_of_sale leaf answered the basis on step 5. PW-58 (commission) is unchanged.
- New PW-104: Tomato Paste on step 3 shows How it's sold (Sachet prefilled, Tin) before Net Weight, and step 5 reads "per sachet".

Then continue: the PW-92/PW-90 evidence, step-category.tsx:268, H's asterisks, G, I, J, K, D+L+M, A, B, C, E. Same report rule: report only when everything is done and the DEC-023 run is green.
```
---

**Block 2 — for the curator:**

---
```
C27 — File 1 accepted + rulings (supervisor, 2026-09-30)

FILE 1: the supervisor's audit passed. The 15 Other leaves each open with the required item_name and keep two unconditional cards, and whole-catalogue check results are unchanged. The three placements that follow the order law are accepted. The operator has imported it; the attached exports are post-File-1.

BUSES & VANS: route (a). DEC-093 (supervisor, flagged to the operator): a cell proven variant-split by two independent market sources, with no dominant variant, counts as settled for §8.3 coverage. Buses & Vans passes. Add "K60 EV" only when a battery and range source exists. Build Vehicles step 2.

ENGINE FACTS TO DESIGN AROUND (operator walk):
1. A settled "Other" deadlocks today (INC-357): the form hides the row, but the door demands its Other text. Engineering is fixing it so that a list settled to Other shows its OWN write-in box.
   - A separate write-in shown when a list = Other (brand_name when brand-X = other) then becomes a SECOND box for the same answer.
   - Census every such pair now and propose retiring the duplicate links. Ship the retirement only after the engine fix lands; the supervisor will say when.
   - Add no new pairs. At Vehicles › Parts, rely on part_brand's own Other text. Bicycles keeps brand_name, because it has no brand list.
2. "How it's sold" moves back to the details step for goods (unit_of_sale-*), right before the size, as your F1 order assumes. Services' pricing basis stays on the price step.
3. HELP LENGTH (operator: "shorter, not too long"). The form shows only a help's first sentence; the rest sits behind (i).
   - Rule: the first sentence is at most 60 characters; examples and pointers come after it.
   - Start with a small definitions-only Food file (net_weight_g, volume_ml, unit_of_sale-food and the Food type helps).
   - Then census the whole catalogue and report the count over the limit. Each later batch fixes the helps of its own root.

ORDER: Food help file → Vehicles step 2 (on fresh exports) → C1–C3, one root per batch.
```
---
