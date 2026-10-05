Source: supervisor thread, turn 1065, Thu 2026-10-01 14:25 New York.
Status at 2026-10-05: spec issued 2026-10-01 14:25 into Lovable's queue; never built as Part P — superseded by bundle 2 steps 7 to 12 (docs/governance/briefs/bundle-2.md, built and closed 2026-10-03 at befaca37: nested boxes, add controls outside the boxes they add to, the tick on its own line, several sub-cities, listings.directions, the location optional); P5 (zoom buttons on the small map) was built in bundle 1 item 1 and bundle 2; the repo holds the later version in the bundle-2 brief, not this text.
Related: Part P (P1 to P5), N2-a, bundle 2 steps 7 to 12, INC-364, DEC-094, G27, G28.

N2 is verified and the board is green. CI passed on Lovable's fix (cceab250) and it has been promoted to main. Lovable's change matches its report, and the bug PW-88 caught is properly fixed: the product type's unit was being lost on step 3. I've turned your place-step notes into a new part for Lovable's queue, "Part P", after the Other write-in work.

One reading to check: I took "magnification level for map" to mean zoom + / − buttons on the small map (the one shown after Save and to buyers), and that's what Part P adds. If you meant something else, tell me.

**Your steps**
1. Paste this into Lovable:

---
```
N2 VERIFIED — CLEAN on cceab250 (CI green, promoted). The fact-refill fix in step-specifications.tsx is right: a value the narrowing just cleared is not the seller's, so the type's fact refills it. Two notes:
- Your file list named both usage maps, but they did not change in this landing (no key moved), which is fine. List only files that actually changed.
- The 7 "listing not found" server lines go to the E census with INC-364.

CONTINUE the queue: N2-a below, then S1 → D+L+M → S2/S3 → T (with T4) → A → B → C → Part O → Part P (new, below) → the E census → the final full DEC-023 run.

N2-a — Operator: the unit must be asked before quantity. In PW-88 or PW-104, assert that "How it's sold" renders above a later-ordered row on step 3 (give the scratch set a row with a higher display_order if it has none).

PART P — the place step (operator walk 2026-10-01). Tier B, except P4, which is Tier A (listings door).

P1 · Boxes nest; each "Add" sits outside the boxes it adds to.
- The country box holds its region boxes. "Add a region" sits inside the country box after the last region box, never inside a region box. Today step-where.tsx:465 renders it inside the last region box.
- The region box holds its city boxes. "Add a city" sits inside the region box after the last city box, never inside a city box.

P2 · The city line.
- The city select stands alone on its line at every width.
- The "Item or service is here" tick moves to its own line below it, with Remove at the right end of that same line. Today :363–400 puts the tick beside the select from 768 px.
- Indentation steps are equal from country → region → city → sub-city.

P3 · Several sub-cities per city, no limit.
- Inside a city box, sub-city lines sit one step deeper; "Add a sub-city" goes after the last one, inside the city box; every extra line has its own Remove.
- "All of <city>" stays the first choice of the first sub-city line.
- Each sub-city line carries its own "Item or service is here" tick; the tick stays one radio group across the whole step.
- Coverage: the door already counts a city and its sub-cities as one city (validate_listing_draft 13cb1b22, count(DISTINCT coalesce(city_id, id)); proof P29). Census the client's own plan counting ("room") and make it agree. No door change is expected; if the census finds one, it rides P4's migration.

P4 · Location details in two fields.
- A new optional field ABOVE the current one: "Directions (optional)" — the seller's own words: building, floor, suite, landmark. Never prefilled. Market-neutral help text (DEC-094), no phone numbers.
- The current field becomes "Street (from the map)": still prefilled by the map's street lookup, still editable.
- Census first: the listings columns and the path that writes street_address (savePin / saveListingNote → set_listing_pin; location-details.ts).
- Add a nullable column for the directions with the same 200-character cap and the same sanitising as street_address at the door. Refuse a phone number in it with the rule Part D adds for text attributes.
- Buyers see the directions wherever street_address is shown, beneath it, under the same visibility rule.
- Migration: additive; re-declare the writing function whole from its latest definition; in-file closers line; the report states "apply <uuid-fragment> → expect mark <value>". CLEAN needs the live read-back.

P5 · Magnification on the small map. The map shown after Save, and to buyers, gets + / − zoom buttons. Dragging and scroll-zoom stay off so the page still scrolls on phones (map-preview.tsx:64–70). The seller's pin map is unchanged.

Tests (next free PW numbers; state them; each fails before its fix where it can):
(a) add-region is inside the country box and in no region box; add-city is inside the region box and in no city box;
(b) at 768 and 1280 the tick sits below the city select, with Remove on the tick's line;
(c) two sub-cities of one city: both stored in coverage, no plan refusal, either can carry the tick;
(d) directions saved, sanitised, shown on review, and a phone number refused;
(e) the preview's zoom-in button changes the zoom.

Every landing: bun run i18n:usage, commit both maps, i18n:map-guard; DEC-023 full local run; report only on green; the report lists the census results and only files that actually changed.
```
---

2. Send it.
3. Bring me Lovable's next report. When Part P lands I'll give you a short walk of the place step at phone and desktop widths, only the checks your eyes are needed for.
