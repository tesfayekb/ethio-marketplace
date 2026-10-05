Source: supervisor thread, turn 949, Tue 2026-09-29 09:45 New York.
Status at 2026-10-05: sent to the curator 2026-09-29 09:45 (replaces the unsent worklist addendum of turn 947); the curator's addendum came in turn 962, approved in turn 963 and imported 2026-09-29; the (g) counts became a standing part of every batch; not in the repo.
Related: Study C27 batch 2, S71, DEC-057b, DEC-085, DEC-086, W4b, form-path counts g1 to g3, INC-296.

**The curator's Batch 2 note is sound. It needs one change, and that change comes from a mistake in my brief.**

- **The linking rule I told the curator was stricter than the real one (slip S71).** I told them a rule on one field can only target another field if that target is linked everywhere the first field is. The live rule, DEC-057b (ratified 2026-09-13), only needs them to share at least one category. I checked the current code: it only refuses when no category is shared (`20260923070512:141–147`). The curator's evidence was right. My brief came from an older comment that DEC-057b replaced.
  - **Decision 11** needs no new DEC. The 9 existing pairs are legal, and Batch 1's milk lock stands as drafted.
  - **Shoes:** the curator created a separate shoe-only "For" question (`shoe_for`) only because of my wrong rule. It should go. The shared "For" question stays on Shoes and carries the same size narrowing. That keeps one "For" filter across Clothing & Shoes, and follows your rule of not adding a field unless it's needed.
  - **Limit to check:** a single rule can list at most 50 values. "Unisex → all adult sizes" comes to about 56, so the curator must narrow Unisex to the size system only.
- **The other 10 decisions:** I've decided them in the message below; you can override any of them before sending. The watch reference number stays optional, because it fills in nothing on the form and many sellers can't read it. The watch series is required whenever the brand has one.
- **The worklist is folded in.** It becomes a standard count, (g1)–(g3), measured before and after in every batch. Every flagged row that remains gets a decision. Batch 2 has 73 rows at the start, and the curator's draft already fixes many of them.
- **Curator engine notes, decided:**
  - **One-answer size question:** the form hides a question with a single possible answer only when a chosen option narrows it (`step-specifications.tsx:1207`). When a category's own settings leave one answer, it still shows. Extending the hide to that case goes into W4b, so the Kids & Baby Clothing size system needs nothing from the curator.
  - **Hiding size for shemma fabric:** that needs a "not in" condition, which is queued at low priority. The One Size prefill covers it meanwhile.

W6 is approved and recorded, including the change to DEC-064 that every place must be a city. Lovable gets it once W5 is clean.

**Your steps:**
1. If W5 isn't in Lovable yet, paste it now.
2. Send the curator the message below with the worklist file from my last reply. This message replaces the addendum I gave you earlier, so don't send that one.
3. Export categories, attribute definitions and links. Send the three files to the curator, and attach them here too.

---
```
C27 — supervisor review of the Batch 2 note, plus the form-path worklist (replaces the earlier unsent addendum) · 2026-09-29

1. VERDICT
The Batch 2 note is approved with one structural change (A) and one added count (B).
Order is unchanged: deliver Batch 1's files from the operator's fresh post-W4 exports, then Batch 2's step-2 files from the post-Batch-1 exports.

A. THE CO-LINK RULE — my brief was wrong (supervisor slip S71)
- The live rule is DEC-057b (ratified 2026-09-13). An `allowed` or `bounds` target must share AT LEAST ONE category with its owner; elsewhere the rule is inert.
- It is the check in attr_allowed_check (migration 20260923070512, lines 141–147), which refuses allowedTargetNotColinked only when no category is shared. The strict reading in my brief came from an older DEC-057 comment that DEC-057b superseded. Your evidence was right.
- Decision 11: no new DEC is needed. The 9 existing pairs are legal, and Batch 1's milk lock stands as drafted.
- Shoes: `shoe_for` existed only because of my wrong constraint. Drop it.
  - Keep the shared `gender-fashion` at Shoes, and link it at Sports Equipment for boots only.
  - Put the audience narrowings on its options: `allowed` for shoe_size_system and shoe_size, with exactly the ranges in your J.
  - Why: one "For" key keeps one audience filter across Clothing & Shoes, and the standing catalogue rule is to add no key that isn't needed. The rules are inert at leaves without shoe scales (Toys, Fragrances, the clothing leaves).
- Gate limits for every option you narrow: at most 5 targets per option and 50 values per target (migration 20260922001023, lines 134 and 147).
  - "Unisex → all adult scales" comes to about 56 shoe sizes. Narrow only the system for Unisex (no shoe_size list), or another split that stays within 50.
  - Boys and Girls come to about 47; recount once the half sizes are in.

B. THE FORM-PATH WORKLIST (new, for every batch)
The operator's walk found two more defects of this kind on Smartphones. After choosing iPhone 13:
- Colour offers the 11 generic colours.
- Storage offers 1 TB, which only the 13 Pro and Pro Max have. The series allows 128 GB–1 TB and the model does not narrow it.
The operator wants this found systematically: for every category, choose each product the form knows and check that every following question, and every choice in its list, fits that product.

The attached worklist (form-path-audit-2026-09-29.csv) makes that mechanical: 493 rows, the whole catalogue, computed on a reconstruction of the post-C26 state (1,412 links against your 1,419). It adds three counts:
- (g1) Identity leaves a question open. After the leaf's product chain (brand › series › model, or any list whose options carry facts, allowed or bounds), a later select is neither narrowed (allowed) nor filled (facts) by any option on the path, for N of the products. Seller-side keys are excluded: condition, warranty, exchange, originality, sale/rent, quantity, expiry.
- (g2) Asked for every type. On a leaf with 3 or more types, the card-1 type question neither hides (visible_when) nor narrows (allowed) a later select for any type.
- (g3) A model inherits its series' range. A child option under a parent that narrows a question to 2 or more values does not narrow it further.

How to use it:
- A row is a flag, not a verdict; a car's colour rightly stays open.
- Run (g1)–(g3) on the base and on your draft merged state, next to (a)–(f).
- In each batch's note, every remaining row gets a disposition: narrow, fill, hide, or keep with a one-line reason.
- Beyond the rows, keep walking each path yourself for wrong choices inside a list (the watch-karat kind), which the counts cannot see.

Per batch:
- Batch 1: add the (g) counts and the dispositions for its rows (Food & Beverages 25, Books 10) to the files' change note.
- Batch 2: 73 rows on the base. Many are already fixed by your draft (materials and size systems per type). Report (g) before → after and disposition the rest in an addendum to this note.
- Electronics (later batch): 79 rows. They include phone colour (open for 241 of 241 models) and the 40 models that inherit a series storage range. Also propose how model colours should work: the maker's names (Midnight, Starlight) versus the generic colour list the filters use.
I will regenerate the worklist from the operator's fresh exports and attach it with each batch.

2. RULINGS ON THE ELEVEN DECISIONS (the operator may override any of these before sending)
1 Brands: approved — the 4 deletions (all at 0 listings), the 37 additions, and the root row moved down to leaf scopes.
2 Watches: watch_series is required when shown (the DEC-086 model level). watch_model (the reference) is optional: it fills no fact, and many sellers cannot read it.
3 Shoes: approved with change A — gender-fashion carries the narrowings, not shoe_for. The scales, the 13 half sizes, baby EU 16–19, US Kids, and Heels → Women or Girls are approved.
4 Clothing sizes: approved. No band-and-cup bra sizing (no Ethiopian evidence); nursing bras use letters.
5 Babies & Kids condition: approved.
6 Baby brands: approved — the 8 deletions, Ty and Hape added, card 3 cleared at Gear and Feeding, Nursery Furniture write-in only.
7 One home per product: approved. Kids' bicycles go to Vehicles › Bicycles with bicycle type Kids (the option exists).
8 Abaya & Jilbab and Hijab & Headscarf: approved.
9 Other Fashion "Original": unlink it.
10 Batch 1's brand_name amendment: approved; the Batch 1 files carry it.
11 The co-link rule: DEC-057b stands (see A).

3. YOUR ENGINE NOTES
- The one-answer picker: today the form hides a picker only when a chosen option's `allowed` leaves one value (step-specifications.tsx:1207–1210), not when a link scope leaves one. Extending DEC-085 to a link scope with one value (filled and hidden) is queued for W4b, so Kids & Baby Clothing's single size system needs nothing from you.
- The "not in" condition (Shemma fabric's size) is queued at low priority. The One Size prefill stands meanwhile.
```
---
