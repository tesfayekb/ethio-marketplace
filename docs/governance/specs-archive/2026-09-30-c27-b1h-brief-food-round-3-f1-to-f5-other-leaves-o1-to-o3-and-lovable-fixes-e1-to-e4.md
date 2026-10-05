Source: supervisor thread, turn 993, Wed 2026-09-30 14:34 New York.
Status at 2026-10-05: sent to the curator 2026-09-30 (b1h delivered, audited CLEAN, imported '66 changes written'; the Other-leaves review note led to File 1, imported 2026-09-30); the Lovable fixes E1 to E3 were issued in W6c (turn 995) and built in bundle 1 items 5 and 6 and the search item; E4 (title prefilled from item_name) was never put in a prompt — the built title is now composed from card rows (bundle 4); not in the repo.
Related: C27 b1h, F1 to F5, O1 to O3, E1 to E4, S78, W6c, bundle 1.

The live exports are here, so I'll check them against my copy first, including that unexplained extra definition.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

**b1g is closed.** Your fresh exports match my audited copy exactly: 529 definitions, 1,446 links and 167 categories, with no unexpected changes. There is no extra definition. The curator miscounted the earlier export, and I was wrong to report it as a change in the live catalogue (logged as slip S78). Only one translation was waiting because labels imported by file arrive already approved; only the changed help text needed approval. That's expected.

Your walk splits into catalogue work for the curator and small fixes for Lovable.

**For Lovable, in the next prompt after the current map-and-price work.** Each fix is checked against the code:
- **E1 · Out-of-range numbers turn red as you type.** Today the form only shows the allowed range as a hint and waits for Next to refuse. This applies to every number field in the form.
- **E2 · Prices show their unit everywhere.** Today the listing card prints only the amount, for example "ETB 250". It will say "ETB 250 / bottle", "/ kg" or "/ month". This makes your "price per container" point work for buyers.
- **E3 · Search stays fast after catalogue changes.** Your few-second wait came from the search rebuilding its whole index during the first search after the import. It will rebuild when the catalogue changes instead.
- **E4 · The listing title fills itself** from the new "What is it?" answer on the Other categories (below), so sellers don't type it twice.

**Your steps:**

1. Paste the block below into the curator's chat, attaching the three exports you just sent me (definitions_13, links_13, categories_8).
2. Send it.
3. Reply here with **"approve C1–C3"** (or your edits) for the three decisions from my last message: brand position, "Locally made / Imported", and staples. The curator holds them until you do. DEC-091 (the admin Services page) is also still waiting for your "approve DEC-091".

---
```
C27 · Food round 3 (b1h) + the "Other" leaves — operator walk 2026-09-30 (after b1g) · before Vehicles

BASE: definitions_13 · links_13 · categories_8 (attached; exported after b1g: 529 · 1,446 · 167).

SUPERVISOR CORRECTIONS (grounded in code):
- A one-value `allowed` needs no fact beside it. The form fills and hides a list left with one allowed answer by itself (INC-244: src/features/posting/step-specifications.tsx:1000–1017, with D44 at :1292–1299). The 65-row list is not a defect list; drop it. The facts already added are harmless; add no more for this reason.
- definitions_12 held 528, not 529. The live count is 529 after b1g (food_kind). Count from the file.
- The finder indexes the search words of every question linked at a leaf, not only the first (catalog_find_refresh, migration 20260924104238). Walk checks can rely on it.

APPROVED IN THE WALK — build files (Food):

F1 HOW IT'S SOLD, THEN ITS SIZE (every Food leaf with packaged goods).
- unit_of_sale-food gains container units: per bottle, per jerrycan, per tin/can, per jar, per sachet/pouch, per carton, per bag/sack. The existing kg, litre, piece, pack, box, tray, dozen and bundle stay.
- Each type's `allowed` lists only the containers it really comes in. Examples: milk = sachet, bottle, carton, or per litre loose; oil = bottle, jerrycan, tin; tomato paste = sachet, tin; pasta = pack; sugar = kg, bag/sack.
- The size question that follows (Net Weight or Volume) is the size of ONE container, and its help says so.
- The price step prices "per" whichever unit is chosen; any unit value is a pricing basis (src/features/posting/price-basis.ts:14). No console step.
- ORDER (amends R1): type → the type's own specs → Brand + write-in (+ rows brand narrows) → how it's sold → its size → pieces per pack → fresh / frozen / dried → Made in → seller statements → Pickup & Shipping.
  - The operator's reason: brands come in different containers, so the container follows the brand.
  - Brand still never sits second where the type has specs of its own.

F2 POWDERED MILK keeps one home (Sugar, Salt & Packaged Food). The dairy type's help points to it, and to infant formula under Baby Food. No duplicate option.

F3 PASTA TYPE: a pasta type question when Product = pasta (spaghetti, macaroni, penne, lasagna, noodles, other), then F1's pack and size.

F4 FROZEN & PREPARED, re-scoped with evidence. The operator doubts frozen kitfo and tibs are sold frozen; typical frozen goods are chicken, fish and similar.
- Rule: raw meat, chicken and fish, frozen or not, live at Meat, Dairy & Eggs, which asks Fresh/Frozen/Dried.
- Frozen & Prepared holds processed and ready foods: for example fries and vegetables, ready-to-fry sambusa, burgers and sausages, ready meals, ice cream. Keep only what evidence supports.
- Halal follows the meat-containing types only, never fish.
- Say where each dropped type goes.

F5 FASTING-FRIENDLY ONLY WHERE THE ANSWER VARIES.
- Ask it only for types that may contain milk, butter, eggs or meat: cake, pastry, bread types, biscuits, chiko, sambusa, prepared wat and the like.
- Remove it at injera (injera never carries the label) and wherever the answer is always yes.
- Remove the prefilled Yes on sugar, salt and tomato paste, and take tomato paste off the W4b lock list.

THE "OTHER" LEAVES, ALL ROOTS (operator directive) — review note first, then files:
O1 Every catch-all "Other …" leaf asks first "What is it? (write it)".
- One shared text definition (suggested key item_name, max 80 characters), required, not a card. No text question is a card anywhere today (ruling 8).
- One shared key lets engineering prefill the listing title from it.
O2 Then the follow-ups that suit the root, in order.
- Food, in the operator's order: Homemade or factory-made → Fresh, frozen or dried → expiry → how it's sold → size/weight.
- Rework food_kind to match; today it mixes fresh and packaged in one question.
O3 Each Other leaf keeps two unconditional cards (O1 is not one). This absorbs C2's Other Agriculture, Other Construction and Other Beauty points.
Put each leaf's proposed form in the review note (§10.5 tables).

AUDIT AND DELIVERY as before: §9.1 with the alias rules, (a)–(f), (g1)–(g3) with dispositions, DEC-057b, option gate, help ≤ 240, two unconditional cards per leaf, row order, round trip, expected previews, console steps, the Amharic list, and a walk whose alias checks use the category search.

ORDER OF WORK: b1h files (F1–F5) → the Other-leaves review note → the Vehicles review note.
C1–C3 from b1g are still waiting for the operator's ruling. Hold them.
```
---
