Source: supervisor thread, turn 941, Tue 2026-09-29 06:59 New York.
Status at 2026-10-05: sent to the curator 2026-09-29 (operator agreed to move Fashion and Babies & Kids up); the review note came in turn 948, the supervisor's verdict in turn 949 (change A: the brief's strict co-link rule was wrong, S71); batch 2 was imported and walked 2026-09-29; not in the repo.
Related: Study C27 batch 2, DEC-086, DEC-057b (S71), INC-292, shoe sizes EU, class-C shared lists (amenities, brand-phones-tablets, computer_brand, cpu_family, room, sport).

I'll check the live catalogue for the watch material list and the shoe-size fields, confirm what C27 Batch 1 covers, and look up Ethiopia's shoe-size convention.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

**No, it isn't covered yet.** C27 Batch 1 only reviews Food & Beverages and Books, so the curator hasn't looked at Fashion. I confirmed both of your finds in the catalogue, and a check across all of Fashion found more of the same kind:

- **Watch material:** material is one required list for everything in Jewelry & Watches. A watch seller has to pick a gold karat, Brass or Beads. There is also no watch model question, which DEC-086 requires for Casio and Rolex.
- **Shoe size systems:** women are offered US Men's sizes and men are offered US Women's. Kids see adult sizes, there are no half sizes, and Heels are offered to men.
- **Clothing sizes:** one size list serves everyone. Men's Clothing offers women's dress sizes (US 0–24, UK 4–28), and Kids Clothing offers adult XS–4XL.
- **Brands:** the 32-brand Fashion list shows everywhere. Jewellery gets Nike, Levi's and Anbessa; shoes get Rolex and Casio.

**Shoe sizes in Ethiopia:** EU is the local standard. Jiji Ethiopia's shoe listings and filters use EU sizes 35–47, including half sizes like 36.5. The form already starts on EU. US and UK sizes should only be there for imported shoes labelled that way. So no, women's shoes should never show US Men's sizes.

**Decision:** I've moved Fashion and Babies & Kids up to Batch 2. They share the size, "For" and brand lists, so they have to be fixed together. Tell me if you'd rather keep Vehicles next. The same problem in other sections (Real Estate amenities, phone brands across Electronics, and others) goes to the curator now so their own batches cover it.

1. Send the message below to the curator.
2. Nothing for Lovable yet: W4 is still running. The curator still delivers the Batch 1 files first, from the new exports after W4.

---
```
C27 — Batch 2 = Fashion + Babies & Kids (moved up) · supervisor brief · 2026-09-29

ORDER CHANGE
- Batch 1 (Food & Beverages, Books) is unchanged. Deliver its files from the post-W4 exports as agreed.
- Batch 2 is now: the whole Fashion root, the whole Babies & Kids root, and the size and shoe rows of Sports › Sports Equipment.
- Reason: these share the definitions size, size_system, shoe_size, shoe_size_system, gender-fashion, brand-fashion, material and condition-fashion, so one batch must own them.
- After Batch 2: Vehicles → Electronics → Real Estate → Construction Material → Services → Home & Garden → the rest.

METHOD
- Same as Batch 1: the full C27 method, with classes A–L per leaf and counts (a)–(f) before → after, run on your draft merged state.
- Every change to a shared definition must list every leaf that links it, including leaves outside Batch 2. gender-fashion is also linked at Toys & Games and Fragrances; authentic_original is linked at 20 leaves in 5 roots.

INPUTS
Two findings come from the operator's walk [walk]. The rest come from my audit of the post-C26 state (167 categories · 514 definitions). Re-confirm all of them on your fresh exports.

Jewelry & Watches
1. [walk] jewelry_material is one required list (card 3) for every jewelry_type. A watch seller must choose from Gold 14K–24K, Silver, Brass or Beads. Karat belongs to gold jewellery only. Watches need their own facts: case and strap material, e.g. stainless steel, leather, silicone, resin, titanium, gold-plated.
2. There is no watch model question. DEC-086 requires an exact-model question wherever the brand offers more than one model (Casio, Rolex).
3. brand-fashion (32 brands) is shown whole here, so jewellery is offered Nike, Levi's, Anbessa and Kaba Baby.

Shoes (and Sports Equipment football boots, which share these lists)
4. [walk] shoe_size_system offers US Men to women and US Women to men, and kids (boys, girls, baby) see the adult scales. Scope the size systems by who the shoe is for:
   - women → EU · US Women · UK
   - men → EU · US Men · UK
   - kids → a kids scale
5. EU is the Ethiopian standard and is already the prefill; keep it, and research and cite it.
   - Evidence so far: Jiji Ethiopia shoe listings and filters use EU 35–47, with half sizes (36.5, 37.5, 45.5).
   - Our EU list has whole sizes only (EU 20–48), and there is no US kids scale.
   - Keep existing option values stable. The names are mixed (eu_20…eu_34, then 35…48), but live listings may hold these values.
6. Heels are offered to men (class J).
7. Rolex and Casio are offered as shoe brands, and the authentic_original condition at Shoes names casio|rolex.

Clothing (Men's, Women's, Traditional, Uniforms, Kids, Maternity; Sports kits)
8. One 64-value size list serves everyone:
   - Men's Clothing offers US 0–24 and UK 4–28, which are women's dress scales.
   - Its EU 32–60 range merges the women's (32–48) and men's (44–60) scales.
   - Kids Clothing offers adult XS–4XL and the adult numbered scales next to the kids' ages.
   - There is no men's US scale (chest/waist).
9. material (15 values) is shown whole at Accessories, Men's, Women's and Uniforms, so belts and sunglasses are offered shemma and chiffon.
10. Other Fashion: "For" is required and is card 1. Test it against class H.

ENGINE CONSTRAINTS (checked against the code on dev 58bfd6d7)
- An option's `allowed` target must be linked at every leaf where the option's own field is linked.
  - Enforced by `attr_allowed_check` (latest in migration 20260923070512); refusal reason: allowedTargetNotColinked.
  - gender-fashion is linked at 11 leaves, most of which have no shoe or size fields, so a rule from gender-fashion to shoe_size_system will be refused.
  - Use a leaf-specific "For" key or visible_when splits instead. If you want an engine change, propose it as a named DEC in your note; do not assume one.
- The form applies every `allowed` narrowing on top of the parent/child list filter (step-specifications.tsx:496–526). A chain of "For → system" plus "system → size" therefore works.

SAME PROBLEM ELSEWHERE
These shared lists (more than 8 options, at 2 or more leaves) are shown whole, with no per-leaf scope. Review them under class C in their own batches; do not change them in Batch 2.
- amenities: 16 options, at 6 Real Estate leaves
- brand-phones-tablets: 29 options, at 4 Electronics leaves
- computer_brand (16 options) and cpu_family (12): at 2 Electronics leaves
- room: 10 options, at 3 Home & Garden leaves
- sport: 13 options, at 2 Sports leaves
The generic lists (color, expiry_month, languages_spoken, exterior_color, destination, coffee_origin) are fine as they are.

DELIVER
The Batch 2 review note first, without files, as with Batch 1.
```
---

3. Send it.

Sources:
- [Jiji Ethiopia — Sneakers in Addis Ababa](https://jiji.com.et/addis-ababa/55-sneakers): listings and filters use EU 35–47 with half sizes.
- [Ethiopian Shoe Size to US Conversion](https://stepwithshoes.com/ethiopian-shoe-size-to-us/): says Ethiopia uses EU sizing, but cites no sources.
