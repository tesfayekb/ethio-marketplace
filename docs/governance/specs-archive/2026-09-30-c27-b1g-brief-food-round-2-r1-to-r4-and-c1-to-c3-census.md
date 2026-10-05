Source: supervisor thread, turn 989, Wed 2026-09-30 13:37 New York.
Status at 2026-10-05: sent to the curator 2026-09-30 after the b1f walk; delivered as b1g (R1 to R4 files; C1 to C3 census proposals), audited CLEAN and imported 2026-09-30 ('CORRECTLY APPLIED'); C1 to C3 were approved in turn 999 and built one root per batch; not in the repo.
Related: C27 b1g, R1 to R4, C1 to C3, S77, b1f walk, Vehicles batch.

Both imports landed exactly as the preview predicted: 2 changes and 11 changes, 0 refused. The Amharic is approved, so **this batch is closed.** Your walk turned up four catalogue fixes, and I've put them all into one brief for the curator, to do before Vehicles:

- **Brand is asked too early.** It is optional in every Food form and should show "Optional", but it is the second question in all 12 Food categories. It moves low in all of Food.
- **"Made in" is asked in every Food form.** It is attached to the Food top level, so every category inherits it. It will stay only for packaged products, such as cooking oil and the Sugar, Salt & Packaged Food items. Other Food uses "Made in" as its main question today, so it needs a replacement.
- **Halal** is already meat-only in Meat, Dairy & Eggs. It comes off packaged food and snacks. In Frozen & Prepared it stays only for frozen kitfo and frozen tibs.
- **Tomato paste** today is only a hidden search word inside Sauces & Spreads. It becomes its own choice, asked by weight in grams.
- **Outside Food**, brand position and "Locally made / Imported" (asked in 22 non-food categories) will come back as proposals for you to approve. Brand really matters for phones and TVs, so I won't move it there without your say.

Two corrections:
- **Step 3 (solid oil, Volume 25000 accepted and 25001 refused) had no result.** It goes into the next walk.
- **My walk wording in steps 5 and 7 was wrong** (logged as slip S77). Search words only work in the category search at the very start of posting. The lists inside the form don't search them. The next walk will say where to type.

**Your steps:**

1. **Admin › Attributes:** export Definitions and Links. **Admin › Categories:** export Categories. Take fresh exports, since today's import changed them.
2. Paste the block below into the curator's chat and attach the three exports.
3. Send it.

---
```
C27 · Batch 1 walk follow-ups, round 2 (b1g) — operator walk 2026-09-30 · before Vehicles

BASE: the three exports attached (taken after b1f was applied: 2 category changes, 11 definition/link changes, 0 refused).

APPROVED BY THE OPERATOR IN THE WALK — build files for these (Food only):

R1 BRAND GOES LOW (every Food leaf).
- brand-food and brand_name move together to the end of the product's own questions: after its facts and amounts, directly before the seller statements (sealed, expiry, halal, organic, fasting-friendly) and Pickup & Shipping.
- Never required, never a card (the data already has it optional everywhere; keep it so).
- A question that brand narrows moves down directly after Brand, so the narrowing still runs forward: today that is milk_type at Meat, Dairy & Eggs (brand-food options mama_milk, shola, family_milk, elemtu, holland_dairy and loni carry facts and allowed for milk_type).

R2 "MADE IN" ONLY FOR PACKAGED PRODUCTS.
- origin-food leaves the Food root (it is inherited by all 12 leaves today).
- Each leaf that sells factory-packaged goods links it itself, conditioned on its packaged types. Examples: cooking oil (edible_oil, vegetable_ghee) at Honey, Butter & Oils; instant and tea at Coffee & Tea; biscuits, sweets and chips at Snacks & Sweets.
- Sugar, Salt & Packaged Food keeps it for every type.
- Leaves with no packaged types drop it: meat/dairy/eggs, injera & bakery, spices, and Frozen & Prepared unless you find a packaged type there.
- Other Food uses Made in as card 1 (required) today. Replace it with a card that keeps the two-unconditional-card rule, and propose it in the note. A "Fresh / Homemade / Packaged" question that also unhides Made in is one option; your call on grounds.
- Where it stays, Made in sits with Brand (R1), low.

R3 HALAL ONLY FOR MEAT. It shows only when the product is meat: beef, lamb & mutton, goat, chicken, quanta. Not fish, not dairy, not eggs.
- Meat, Dairy & Eggs is already right; leave it.
- Remove it at Sugar, Salt & Packaged Food and Snacks & Sweets.
- At Frozen & Prepared, condition it to the types that are always meat (frozen_kitfo, frozen_tibs). Drop it for sambusa, prepared_wat, meal_kit and other.

R4 TOMATO PASTE IS ITS OWN CHOICE.
- New packaged_type option "Tomato Paste / የቲማቲም ፓኬት" (value tomato_paste).
- Move the alias ቲማቲም ፓኬት from sauces_spreads to it (lower(alias) is unique per definition), and add ቲማቲም and "tomato paste".
- It is sold in sachets and tins by weight, so it asks Net Weight (g), not Volume. Unit per piece.
- Brand, Made in, sealed and expiry apply. No halal (R3).

CENSUS ONLY — proposals in the note, NO files in this batch:
- C1 Brand position outside Food: one table of every brand question's position per leaf. Mark identity brands (a series/model under them: phones, computers, fashion watches) as "stays", and propose a disposition for the rest.
- C2 product_origin ("Locally Made / Imported", 22 non-food leaves): propose keep or remove per leaf, with a one-line reason.
- C3 Staples hiding as aliases: any Food option group where sellers name a staple on its own, as with tomato paste. Propose the splits.

WALK SECTION OF THE CHANGE NOTE:
- Every alias check says "type it in the category search at the start of posting". Form lists do not search aliases: src/features/posting/attribute-options.ts shape() carries no aliases; only catalog-finder.ts uses them.
- Repeat b1f walk step 3 (Cooking Oil — Solid: Oil Type, Net Weight, Volume, Sealed and Expiry shown; Volume 25000 accepted, 25001 refused). It was not reported.

AUDIT AND DELIVERY (as before):
- Pre-delivery audit on the merged state: §9.1 with the gate's alias rules, counts (a)–(f), form path (g1)–(g3) with dispositions, DEC-057b, option gate, help ≤ 240, two unconditional cards per leaf, row order, round trip.
- Expected previews per file, and whether any console steps are needed (INC-314 affects create rows).
- The Amharic list for Translations (the new option, any changed help).
- Then Vehicles, review note first.
```
---

DEC-091 (the admin Services page) still needs your "approve DEC-091" before I can draft its build.
