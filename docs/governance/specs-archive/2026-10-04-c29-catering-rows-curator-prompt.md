Source: supervisor thread, turn after 1375 (the turn is not in the raw files; text taken from the supervisor's scratch file c29-curator-prompt.txt), Sun 2026-10-04 about 20:12 (supervisor's notes stamp 2026-10-05 00:12Z) New York.
Status at 2026-10-04: written and handed to the operator after his ruling on the C28 note (recorded in the supervisor's notes as "AGREE ON ALL THREE"); to be sent to the curator with fresh exports of categories, definitions and links; no delivery received; import only after the supervisor's audit and after bundle 4 is published.
Related: C28, C29, price table (to be numbered DEC-131), DEC-060 (alcohol word list for the moderation spec), DEC-080.

C29 — OCCASION FOOD AND CATERING: THE ROWS

Your C28 note is accepted as the plan. Build its rows now, with the rulings and corrections below. Base: the three fresh exports attached to this message (categories, definitions, links), not your merged state.

A. RULINGS ON YOUR FIVE QUESTIONS (operator, 2026-10-04)
1. Placement: yes. New leaf Food & Beverages › Cooked Food to Order / በትዕዛዝ የሚዘጋጅ ምግብ, slug cooked-food-to-order, listings allowed, secondary parent Services. Events & Catering stays where it is. A secondary parent is listed after the parent's own children, so under Services the leaf shows last; that is accepted.
2. Several prices: yes, as a later form feature. No rows for it in this batch. Until it lands, one ad per size.
3. New price answers: yes. pricing_type gains per_person; unit_of_sale-food gains per_package, per_pot and per_party_tray. No form work is needed: the price line takes the answer's own label and drops one leading "Per " or "በ", so each of these labels must start that way (yours do). Leave the unscoped links on Other Services and Other Food & Beverages unscoped.
4. Kitfo: yes, as a type and a dish on the new leaf. Raw meat by weight stays in Meat, Dairy & Eggs.
5. Halal: link it as you proposed (Catering on Events & Catering; the non-fasting types on the new leaf), with your help text. Gluten-free: no row. Add "gluten free" and "gluten-free" as search aliases on bakery_type's injera_teff only.
Your three own calls stand: no "Included in the Price" row; no deposit row and no minimum-in-units row; an offer that includes tella or tej runs without the drink. The thin answers stay.

B. CORRECTIONS FROM THE FORM AS IT IS NOW BUILT
1. The order of the form is: category → details → photos → price → title and description → place → contact → review. The price page draws these rows, by key, and the details page draws all the others:
   - basis: pricing_type… and unit_of_sale…
   - size (only on a category that links a unit_of_sale key): pack_quantity…, net_weight_g…, volume_ml…
   - quantity: quantity_available…
   - terms: lease_term…, payment_frequency…, payment_plan…, min_hire_days… and every key that starts with term_
   The details page is answered before the price page. So a details row must never carry a condition on a price-page row. A price-page row may carry a condition on a details row or on another price-page row.
2. serves_people breaks that rule: it is a details row shown by the unit. Make it a size row: key pack_quantity-serves, label Serves (people) / ለስንት ሰው, number 1–500, unit people, shown when unit_of_sale-food is per_package or per_party_tray, card 3 as you planned. It is then asked beside the unit and prints under the price as "One package: 20 people". Check every other new row against the rule in 1 and tell me what you moved.
3. A price is not required on any leaf: every ad may be posted as "Contact for price". So a cooked-food seller with no printed price belongs on Cooked Food to Order, not on Events & Catering. Rewrite your seller's rule (2.1) to say so. "Price on request" is not a gap.
4. The title is built from the card rows that are answered, shown and not price-page rows, in card order, joined by single spaces, 70 characters at most; yes/no answers and lists of more than two picks are left out. So the unit and "Serves" never enter the title: on the new leaf the built title is the Food Type alone. Re-do your five sample ads on that basis, and tell me if a type's label reads badly when it stands alone.
5. A prefill can tick a list: write the fact as a list of values.

C. NOT IN THIS BATCH
- No two-pair conditions, no "settled" ranges and no {country} or {category:…} tokens. They come in the next batch, with the rent and hire rows. Write the boundary help lines as plain paths, as in your note.
- The six Tigrinya aliases from your own knowledge (ጸብሒ ደርሆ, ቅልዋ, ሓምሊ, ጣይታ, ሕምባሻ, taita) stay out of the files. List them, with the rest of your Tigrinya column, in the change note for a speaker's check.

D. DELIVERY
- The usual batch files and checks, as for batch 19: categories, definitions, links (and a links pass 2 if the import order needs one), the translations key-names file for the new names, the form-path dispositions, the help census, the settled-to-other scan, and the change note.
- In the change note: what changed against your C28 plan and why; every row you moved under B1; the five sample ads as the form will show them; the alcohol word list of your 2.6, set apart as a request for the moderation spec; at most three questions.
- Limits as before: help 240 characters; five aliases an answer; an option's allowed list five targets and fifty values each.
