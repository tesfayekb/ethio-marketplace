Source: supervisor thread, turn 1146, Fri 2026-10-02 07:31 New York.
Status at 2026-10-05: sent to the curator 2026-10-02 (the vehicles part first written in turn 1140 and not delivered before the census arrived); carried out: batch 16 (vehicles make and model lists, 544 new options) delivered 09:13 and imported after DEC-103 raised the option ceiling to 1,500 (2026-10-02); batch 17 (census rows, new leaf Household & Cleaning, catalogue 168) imported 2026-10-02; DEC-100 (sexual wellness kept out) ruled here; not in the repo.
Related: C27 batches 16 and 17, market census, 100-ad rule, DEC-100, REQ-028, DEC-060, DEC-103, Jobs deferred to v2, INC-374, INC-381, DEC-094.

The census checks out and the curator message below covers both things: vehicles first (batch 16), then the census rows (batch 17). I recomputed the census from its data file: the 812,942 total, the 17 category totals and the 29-leaf ranking all reproduce.

**What I ruled**
- **Kept out:** sexual wellness, alcohol, and tobacco with smoking accessories get no home and no search aliases. Alcohol and tobacco were already banned (REQ-028, DEC-060); sexual wellness products join them as DEC-100. I also kept out software, social-media accounts, businesses for sale and work-abroad agents.
- **Jobs:** no action. You deferred Jobs and Tenders to v2 on 2026-07-19, and the census gives no reason to reopen that.
- **Where effort goes:** the curator's reading B (29 leaves). Three dealer-stock lines (laptops, wheelchairs, crutches) no longer decide the cut, which brings houses and apartments in. Pets stays closed.
- **Small gaps:** a missing type or maker goes in only when it has 100 or more ads. Nothing gets more detail than that.
- **One new category:** Home & Garden › Household & Cleaning (storage, mosquito nets, laundry, bathroom items, household chemicals; 4,270 ads have no proper home today). The catalogue goes to 168.
- **Alphabetical:** I applied it to every brand list in the catalogue, not only vehicles. Phone and laptop model lists stay newest-first.

Keeping those lines out of the catalogue does not stop someone posting them under an "Other" leaf. Blocking them at posting is the screening step's job, which is not built yet; the list is recorded for it.

**Your steps**
1. If batch 15 (the single Breed row) is not imported yet, import it first: expect 0 added · 1 changed · 0 refused.
2. Paste this to the curator. Nothing needs attaching.

---
```
Supervisor rulings (2026-10-02) — census accepted; vehicles first, then the census rows.

CENSUS
Checked against your data file: 812,942 over 175 Jiji rows; the 17 category totals and the leaf ranking reproduce. It is the trade record and it is closed. Do not read the §7 pages; no addresses are coming.

RULINGS
1. Tier: reading B (29 leaves). Pets & Animals stays closed (operator), so Dogs & Cats gets no work and the seven breeds wait. Vehicles joins the tier by operator priority (Part 1).
2. Jobs and Tenders: no review note. The operator deferred both to v2 on 2026-07-19 (spec ledger, Section 8 scope rulings). Your counts are filed for that decision.
3. Kept out — no home, no aliases: sexual wellness products (operator, 2026-10-02, DEC-100); alcohol, tobacco and smoking accessories (REQ-028, DEC-060). Also out: software and digital goods, social-media accounts, businesses for sale, work-abroad agents, an "on order" answer. Prescription medicines stay banned (REQ-028).
4. The 100-ad rule (replaces "nothing outside the tier"): a missing type or maker goes in when a page you read shows 100 or more ads for it, whichever leaf it is in. Below 100 it stays with Other. No new hunting outside the tier: only what this census already found.
5. Not live yet, so build nothing on them: two-key visibility (INC-381), {country} tokens (DEC-094). The held INC-374 batch stays held.

PART 1 — BATCH 16: VEHICLES make and model lists (operator priority; send it alone, do not hold it for Part 2)
Operator walk: some makes show no models (Foton), Tesla has no Cybertruck, and the lists are hard to scan.

Supervisor census on the batch-15 state (551 definitions · 1,462 links · 167 categories):
- Cars: 44 makes, 209 models; no models for FAW, Bestune, Chevrolet, Cadillac; Tesla lacks Cybertruck.
- Trucks: 11 of 19 makes have no models (Volvo, MAN, Iveco, Mitsubishi Fuso, Dongfeng, Foton, Tata, Ashok Leyland, DAF, Renault Trucks, BYD).
- Buses & Vans: 8 of 17 (Golden Dragon, Mercedes-Benz, Nissan, Foton, JAC, Ford, Mitsubishi, BYD).
- Motorcycles: 16 of 22.
- Every list is in popularity order.

1. ORDER
- Every make list is alphabetical by the English label, ignoring case. Every model list is alphabetical within its make, with numbers in numeric order (Model 3 before Model S; 3 Series before 5 Series).
- Other stays last: the make list's Other, and each make's own Other within its make. Universal stays first in the parts list.
- The Amharic view follows the same order. Option values do not change; only their order.
- Keys: make-cars, model-cars, make-trucks, model-trucks, make-buses-vans, model-buses-vans, make-motorcycles, model-motorcycles, make-heavy-machinery, compatible_make, part_brand.

2. COMPLETENESS
- Depth follows trade. Cars (21,665 ads) gets the full pass. Buses & Vans (891), Trucks (393), Motorcycles (330) and Heavy Machinery (229) get a light pass.
- Makes: every maker that Jiji's Cars filter prints with five or more ads is on make-cars after this batch. Add any other make with listings in Ethiopia that is missing.
- Models: a model is listed when it has at least one listing on an Ethiopian site you can read (name the source), or when it is in the maker's own current line-up and its make has fewer than five models on our list.
- Every make on our lists ends with its models. If you find none at all for a make, say so and propose keeping it as a write-in or removing it.
- Add Tesla Cybertruck (the operator saw one listed).
- compatible_make gains every make added to any vehicle list.
- Keep new long-tail models light: only facts that are certain (body type and fuel where unambiguous). No locks without a source, and no deep per-model work.
- If an Ethiopian page will not open for a make, fall back to the maker's line-up rule and say so in the table. Do not stop and do not ask for addresses.

3. DELIVERY
- One batch on your batch-15 merged state (the import matched it; no new export is coming).
- Change note with the expected preview per file; a table of makes with models before and after and the source per make; the scan; the importer gates.
- No walk is needed unless a new form behaviour is involved; say so if one is.

PART 2 — BATCH 17: CENSUS ROWS (on the batch-16 merged state)
Every maker is checked against live listings before it goes into a file. Every new type is added to each condition list it belongs in; the scan must show no new "settled to Other" row.

1. Health & Wellness
- Supplements: a kind question (sports nutrition, vitamins, protein, weight gain, minerals, herbal, Other) shown only for Supplements & Vitamins. Supplement makers in Brand, shown only for supplements; device makers shown only for devices. Supplements only, no medicines.
- Mobility Aids: Latin-letter aliases "wheelchair" and "crutches". A kind question (manual wheelchair, electric wheelchair, crutches, walker, cane, Other) shown only for Mobility Aids.
- Posture correctors (106) land here, not in Tools & Devices.

2. Home Appliances: the P3 types that pass the 100-ad rule. Near-twins that fall short may share one option where that reads naturally; otherwise they stay with Other. Grinders stay out as you proposed.

3. New leaf Home & Garden › Household & Cleaning: types Storage & Organisers, Mosquito Nets & Killers, Laundry & Cleaning, Bathroom Accessories, Household Chemicals, Other. A light form: type, condition, and what the root already gives. Aliases so the finder lands there. Categories file first (1 added; the catalogue becomes 168).

4. Accessories & Parts: charger / adapter, stand & holder, cable, mouse pad in the computer accessory list.

5. Power & Hand Tools: the P6 types that pass the 100-ad rule; makers Edon, 3M, Dongcheng, Makute, Ronix, Emtop after the check.

6. TV & Video: makers Syinix, Mewe, JVC, Infinix, Aiwa. Projectors stay in Printers & Office Electronics; confirm that "projector" and «ፕሮጀክተር» land there in the finder data, and add nothing to TV & Video.

7. Audio & Sound: the 11 makers in P8.

8. Brand cascades: Tablets gain C idea, Bebe, Atouch, Amazon, Modio, shown on Tablets only. Smartwatches gain Haino Teko. Laptops gain Razer. Each new brand ends with its own Other in series and model, as the existing ones do.

9. Shoes & Footwear: the type Flats.

10. Cameras & Drones: types Recorder (DVR / NVR), CCTV Kit, Access Control. Makers Hikvision, Imou, V380Pro, Xiaomi, Ezviz, Dahua, ZKTeco, shown for the security types only; photo makers are not shown for them.

11. Tools & Devices (beauty): the type Derma Roller (254).

12. Furniture: Mejlis as a type or an alias, whichever fits the list.

13. Generators and Solar: Total, Edon, Robin, Cruiser, SRNE, each only if it passes the 100-ad rule on its own.

14. The other B-only leaves: finish the maker check under the 100-ad rule and put the rows in this batch. Real Estate leaves have no makers.

15. ORDER, the rest of the catalogue: every brand list goes alphabetical under the Part 1 rule. That is the 28 remaining brand lists (appliance_brand, audio_brand, brand-*, camera_brand, compatible_brand, computer_brand, console_brand, networking_brand, printer_brand, tv_brand). Entries that are not makers (Homemade / Own Production, Workshop-made (local), Custom Build and the like) come first in their present order, then makers A to Z, then Other. series-phones, model-phones, series-computers and watch_series keep their present order.

Not accepted: the seven dog breeds; GE, Victory and Crown as appliance makers unless live listings show each is a maker with 100 or more ads.

DELIVERY for batch 17: change note with the expected preview per file (categories, definitions, links); the scan, which must still read 9 Food exception rows · 0 others · 0 inert; the importer gates. Say whether any new form behaviour needs a walk; I expect none.
```
---

3. Send me the curator's batch 16 files when they arrive.

**Lovable:** nothing for you to do. Dev is still at 9f80e7e4 and red; the fix for the leaked test categories has not landed yet. Do not Publish until I confirm green.
