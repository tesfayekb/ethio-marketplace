Source: supervisor thread, turn 1174 (replaces the unsent blocks of turns 1164 and 1170), Fri 2026-10-02 13:21 New York.
Status at 2026-10-05: sent to the curator 2026-10-02 13:21; batches 16 and 17 imported 2026-10-02 (batch 16 after Publish of 5e09c8d3: 12 changed; batch 17: 1 category, 51 definition changes, 31 link changes, five names approved); batch 18 (18 car makes on Part For › Car; Now Foods; SRNE; 'V380' finder word; later also the own_place property mark) was HELD until the 150 allowed-list ceiling went live with bundle 2 step 19 (befaca37, 2026-10-03) — its release and delivery are not recorded; not in the repo.
Related: C27 batches 16, 17, 18, DEC-103, allowed-list ceiling 50 → 150 (bundle 2 step 19), own_place (DEC-105), Kirkland ruling.

Yes, this is the final curator prompt. All three imports match my audit exactly, and batch 15 is confirmed in, so the catalogue is now at 168 categories.

I've read your Kirkland answer as: no exception for a medicine, so Kirkland stays off the list for good, like every other medicine. If you meant the opposite (treat it like any other maker and add it), say so and I'll change that one line.

The "origin — 3 rows not applied" note is expected. Those are the three new Brand rows for Smartphones, Feature Phones and Tablets; the rows themselves were added (they are 3 of the 7), and only a read-only column was ignored.

Paste this to the curator; it replaces the earlier block.

---
```
Supervisor audit and import result (2026-10-02) — batches 16 and 17 both PASS. Nothing to re-deliver.

IMPORTED TODAY
- Batch 15 was already in (the preview showed nothing to change).
- Batch 17: categories 1 added; definitions 4 added · 47 changed; links 7 added · 24 changed · 1,438 unchanged; 0 refused throughout. The importer noted "origin — 3 rows not applied": the three new Brand rows on the phone leaves were added, and only the read-only origin cell was ignored. Five names approved in Translations.
- The live catalogue is the batch-15 state plus batch 17: 168 categories. Batch 16 is not in yet.

BATCH 16
- Reproduced: 12 definitions changed; 544 new options; 31 existing options edited. Cars 66 makes · 551 models; Trucks 19 · 75; Buses & Vans 17 · 37; Motorcycles 21 · 35. Order, parents, gates and prefills hold.
- Its import is held for one importer limit: 400 options per list (src/server/imports/registry.ts, MAX_OPTIONS; refusal reason tooManyOptions). model-cars at 618 would be refused. The ceiling is being raised to 1,500 (DEC-103). Your file stands as delivered and is imported when that is live.
- Your six points:
  1. Part For: leave as built. The 50-value ceiling on an allowed list is in the database and rises to 150 with the next migration. The 18 remaining car makes join Part For › Car in batch 18.
  2. Sinotruk stays off Cars. Agreed.
  3. The ten makes with Other only stay. One correction for your notes: the Model row is shown for them, optional, with Other as its only choice; it is not hidden.
  4. Karry and DFSK on both lists. Agreed.
  5. Nothing more is added from §4.3.
  6. Answered above.

BATCH 17
- Reproduced before import: 122 new options; 23 rows order only; 33 brand lists alphabetical; gates pass; no new form issue; the scan stands.
- Your points:
  1. Kirkland stays out. Operator ruling, 2026-10-02: no exception for a medicine. This is final; do not carry it as held.
  2. V380Pro stays out: an app name is not a maker. Add "V380" as a finder word of Security Camera in batch 18.
  3. SRNE goes in, batch 18. It passes 100 on the seller's own Brand tag.
  4. Now Foods goes in, batch 18: one maker, 134 ads. Label "Now Foods", alias "Now".
  5–7. Agreed: no generator maker; 3M, GE and Victory out; Crown in; no Pressure Washer on tools.
  8. Keep Fish Oil & Omega, Hair, Skin & Nails and Collagen.
  9. Keep the places first on the industrial list.
  10. Brand for water pumps: approved.
  11. Own Brand rows on Smartphones, Feature Phones and Tablets: approved, and imported as you built them.
  12. No Brand for mobility aids, first aid, supports and Other: approved.
- Seen, not changed: all three stay as they are. No second condition scale for Health & Wellness now.

FOR YOUR GATES, from now on
- Options per list: at most 400 until I say 1,500 is live; name any list above 400 in the change note.
- Allowed list: at most 50 values until I say 150.

BATCH 18 — hold it until I say the 150 ceiling is live
- The 18 car makes on Part For › Car.
- Now Foods and SRNE.
- "V380" as a finder word of Security Camera.
- Nothing else. On the batch-17 merged state.
```
---

Lovable's commit for the two fixes has landed on dev and CI is still running on it. Send me its report when it arrives and I'll verify before you Publish or import batch 16.
