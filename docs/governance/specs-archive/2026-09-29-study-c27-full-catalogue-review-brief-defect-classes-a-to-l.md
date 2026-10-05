Source: supervisor thread, turn 923 (replaces the first version in turn 921, which the operator did not send), Tue 2026-09-29 02:12 New York.
Status at 2026-10-05: sent to the curator on 2026-09-29; carried out as cycle C27 batches 1 to 19 (root pass closed 2026-10-01 with batch 13; follow-ups to batch 19 on 2026-10-03); its classes A to L and the per-batch deliverable shape governed every batch; not in the repo (the repo's catalogue docs record the imports, not this brief).
Related: Study C27, DEC-085, DEC-086, DEC-057b, INC-292, W4b, DEC-088, order law 2026-09-23, operator directive of turn 924.

You're right. My message fixed the examples you found instead of the kinds of problem behind them. Here's the brief rewritten as a full-catalogue review: every root, every leaf, every linked attribute and every option in every list. It checks each of the problem types your walks have turned up, and a category counts as reviewed only when every check has an answer.

Checking the live data turned up one more thing. The Honey, Butter & Oils producer list is limited to "Homemade · Zelalem · Kirkland · Other". So the problem isn't a shared list leaking in; the wrong names were chosen for it. That's why the brief makes the curator check every option in every list for whether it belongs, not only whether the list is limited to its category.

## Send this to the curator

```
Study C27 — FULL-CATALOGUE REVIEW (every root, every leaf, every linked attribute, every option). This replaces spot fixes: the operator keeps finding the same KINDS of defect one category at a time (a fixed spec still asked, a brand listed under the wrong product, quantity asked before identity, a missing identity field), and wants them found everywhere now, before launch — not after deployment.

SCOPE: all 167 categories (all 145+ listing leaves), all definitions, all links, all options — including rows a leaf INHERITS and lists shared across leaves. Nothing is "reviewed" unless every class below has been checked for that leaf.

BATCHES (one change note + files per batch; the next batch starts after the previous one is imported and walked):
  Batch 1 — Food & Beverages and Books (where the walk found defects).
  Then the ruled walk order: Vehicles → Electronics → Real Estate → Construction Material → Services → Home & Garden → Fashion → Babies & Kids → every remaining root.

DEFECT CLASSES — check each, for every leaf:
A. Known products (DEC-085/086 — ruled 2026-09-29). For every identity chain (make → model, brand → series → model, type → subtype): the exact-model level exists wherever specs differ between variants (iPhone 13 / 13 mini / 13 Pro / 13 Pro Max); every model option carries ALL of its fixed specs as LOCKED facts — a pick-list: fact + allowed of one value; a number: fact + bounds min = max; a year: fact + bounds min = max; a yes/no: the fact, and list it in a "lock when available" column (the yes/no lock format arrives with the engine change W4b). Only true manufacturer variants (storage, colour, trim) stay questions, with the dominant in-country variant as the editable prefill (ruling 2026-09-20). Every model list ends with Other. Known gaps to include: RAM is missing on Apple models.
B. Lasting identity facts that are not the listing title (ruled: Books gets book_title, text 120, REQUIRED, first row). Check every leaf for the same need — album/film title, video-game title, software, course/exam name, artwork title, property/project name, and anything else where the thing has a proper name — and propose; required only when it IS the item's identity.
C. List membership. Every option in every list, scoped or not, belongs to the product of the leaf it is offered at: no brand from another product (an injera maker under honey or oil, Kirkland under Ethiopian honey), no duplicates or near-duplicates, no defunct brands, Ethiopian market first then diaspora. Name the source for every list you keep.
D. List or free text (ruled 2026-09-29): where no reliable, verifiable list exists for that product (edible oil, honey, butter — confirm each, and find the others), use a free-text field (text 80, optional) so sellers' entries accumulate for a future list; where a real list exists, keep it scoped per leaf, ending in Other.
E. Question order (order law of 2026-09-23): identity (type/brand/make → series → model) → year → the product's own specs → variants → quantity, weight, volume, unit of sale → condition → seller-side facts. Nothing quantity-like before identity (honey asks net weight before producer today); a dependent list never above its parent.
F. Origin where people buy by origin: food regions (kibe/niter kibbeh, honey, coffee, spices, grains…), Imported vs Locally made, crafts and cultural goods — one shared definition where the sets match, per-leaf where they differ; research the named origins sellers actually use.
G. Relevance (standing principle 2026-09-26: every field sharp, related to the item, making sense): remove or move down the tree any row that does not fit every leaf that inherits it; merge duplicated concepts; no question whose answer a previous answer already settles.
H. Required rows: only the two card rows, the identity model level (DEC-086), and identity names such as book_title. Nothing else is required.
I. Numbers, units and years: plausible min/max; units as sold in Ethiopia (and the metric canonical unit); every item with a year has a year floor from its identity option (release/build/model year); expiry-style years follow the 2026-09-25 ruling.
J. Conditions: a field is asked only when an earlier answer makes it relevant (e.g. battery health only when used; expiry only for perishables); no condition refers to a key not linked at the leaf.
K. Words: EN and AM for every label, option and help; natural Amharic in Ge'ez with trade-word aliases; help ≤ 240 characters; option labels that a seller would recognise.
L. Gaps: a product commonly sold in Ethiopia or the diaspora with no fitting leaf in this root — list it (no new categories without a ruling).

DELIVERABLE PER BATCH:
1. A change note with, for EVERY leaf in the batch, a row per class A–L: "checked — no change" or the finding and the fix. No blank cells.
2. Mechanical audit counts before and after, run on the merged state: (a) identity options leaving a fixed spec open (by leaf); (b) options offered at a leaf that also appear in an unrelated leaf's scoped list (cross-product check); (c) order violations against E; (d) required rows beyond H; (e) missing AM text; (f) items with a year but no floor. Every count must be 0 after, or each remainder explained.
3. The usual audit (INC-292, DEC-057b, 240-character help cap, two cards per leaf, new-key check), and the files.
4. The decisions you need from the operator, at the end.

Base: attach-or-name the exports you are building on (categories_7 · definitions_3 · links_2, or later). Start with Batch 1's change note only — no files until it is approved.
```

When each batch arrives, I'll run my own independent checks on it, the same way as for cycles 20–26: every class above, plus the fixed-spec check from last night. After each import, your walk of the published site closes the batch. The two form fixes, the category asterisk and the smooth scroll to a missing field, stay with Lovable in W4.
