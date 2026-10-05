Source: supervisor thread, turn 1132, Thu 2026-10-01 21:58 New York.
Status at 2026-10-05: operator ruling of 2026-10-01 21:58 (stop refining low-volume leaves; no further Pets work); the census was delivered 2026-10-02 07:31 (c27-market-census-2026-10-01.md: 812,942 counted listings; tier reading B, 29 leaves) and accepted in turn 1146, where the 100-ad rule replaced 'nothing outside the tier'; batch 15 (the one Breed row) was confirmed imported 2026-10-02; the census data is in the uploads, not in the repo.
Related: C27 batch 15, market census, tier A/B, 100-ad rule (turn 1146), Jobs deferred to v2, INC-381.

You're right, and the over-detail was my call: I ruled the dog-size refinement, and it was more than a low-trade category deserves. This one-row file is already built and correct, so import it and Pets is closed. From here, catalogue effort follows what is actually traded in Ethiopia.

**The file passes my audit.** Only the Breed row's options change: seven breeds gain a Size prefill, none is locked, and German Shepherd stays Large as you answered.

**What changes next:** the curator stops refining and runs one read-only census of what is really advertised in Ethiopia, goods and services. It will report what sells in volume, what our catalogue is missing, and which of our categories see little trade. Further detail work then goes only to the categories that carry most of the listings.

Do these in order:

1. **Import** `c27-b15-definitions.csv` on its own. Expect **0 added · 1 changed · 0 refused**. There is no Translations step and no walk.
2. **Paste the message below to the curator.** Nothing needs attaching.

---
```
Batch 15 — result, and a change of direction (2026-10-01)

RESULT
- The Breed row is imported (changed 1). German Shepherd stays Large: the share is taken by length, as you built it.
- Other Food & Beverages sorting at 1000999 is expected; an app migration set it.

OPERATOR RULING — catalogue effort follows real trade
- Detail of this depth on a category with little trade is not worth it. Stop refining low-volume leaves. No further Pets work.

NEXT — a market census, read-only. Build nothing.
Question: which items and services are actually advertised in Ethiopia, and what is our catalogue missing?
- Sources: listing counts by category on the Ethiopian classifieds and marketplaces you can read (Jiji Ethiopia first), plus at least one independent source per finding where one exists (vehicle and property sites, large Telegram or Facebook selling channels, business directories). Name each source and the date read.
- Table 1 — what is advertised: item or service type · listings counted per source · share of the total · where it lands in our catalogue (root › leaf), or "no home".
- Table 2 — what we lack: high-volume items or services with no home, or a poor fit (wrong questions, missing type, missing brand list). Include jobs and any other whole section we do not have, with its volume.
- Table 3 — our 167 categories ranked by counted listings, with the leaves that see little or no trade marked.
- Rule, fixed now: the leaves that together carry 80% of counted listings are the priority tier. Detail work happens only there, or where a walk or a user reports a real defect. Everything else stays as it is.
- Deliver one note with the three tables, the sources and your proposals. Each proposal names what it would add or change and the volume behind it. Nothing is built until I rule.

WAITING (unchanged)
- INC-374 and INC-381 wait for the engine; your held batch stands. DEC-094 token rows wait for {country}.
```
---

**Still waiting on you from my last message:** CI is red only because staging lacks Lovable's new migration.

3. On ethio-staging, apply migration `a35e45fa` and confirm the mark reads `20261002030000`.
4. In GitHub Actions, open the latest run and click **Re-run failed jobs**.
5. Paste Lovable's report from that turn here.
