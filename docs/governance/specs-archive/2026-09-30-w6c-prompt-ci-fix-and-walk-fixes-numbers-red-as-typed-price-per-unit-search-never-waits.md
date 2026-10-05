Source: supervisor thread, turn 995, Wed 2026-09-30 14:40 New York.
Status at 2026-10-05: only Part 0 (INC-348) was built (07e6a52); Parts A to E were re-issued inside the turn 999 continuation and later redistributed (A, B, C, E into bundle 1 items 2 to 6 and the E census into bundle 4); the map_pin categories file was imported by the operator, then made moot by the operator's 'map in every category' decision (turn 997); the repo holds the built items in docs/features/posting.md, not this text.
Related: W6c, INC-348, E1, E2, E3, INC-350, INC-351, S79, map-pin-categories-2026-09-30.csv, PW-93 to PW-95, PR-19.

W6b-2 has landed and CI is red, so I'll verify from a fresh clone and read the CI evidence files before drafting anything.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

The fix follows the existing precedent: the audit ruling pins `brace-expansion` to the 1.x line on purpose, so the fix is raising that pin from `^1.1.17` to `^1.1.19`. Now the W6b-2 diff itself.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

The operator's earlier rule was "map only where it matters", and the gate is right. What's missing is the category data. Let me check the flake ledger for PW-58 before building the fix.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

Before I write the prompt, one grounding check: whether the listing card's data already carries the price unit and period.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

**W6b-2 checks out in code, and it passes once you've walked it.** Nothing was changed outside the allowed files, and there are no secrets. The Esri key is read on the server the same way the working Gemini feature reads its own, so your saved key will be used. The migration's self-tests used only temporary test rows. Every E2E job in CI passed.

**The red is not W6b-2's fault.** Two new security advisories were published for `brace-expansion`, a package that only the code checker (eslint) uses and that never reaches your site (INC-348). The fix is the first part of the prompt below.

Answers to Lovable's questions:
- **Staging migration:** nothing to do. CI's migration check passed on this commit, which proves staging already has mark 20260930180000.
- **Esri key:** you saved it this morning, so nothing is missing.
- **Test categories get the map by default:** fine, since it only affects temporary test categories.
- **"Before" timings from staging:** accepted. Esri itself can only be timed on the published site, so your walk will do that.
- **PW-58 failing once in its local run:** it passed in CI and goes to the flaky-test turn (CI-T2).

**One problem was mine.** W6b-2 shows the map only in categories marked "map_pin", as my prompt specified, but none of your 167 live categories carry that mark. As published, no seller would see a map at all (logged as slip S79). The attached file `map-pin-categories-2026-09-30.csv` adds the mark to 25 categories where buyers visit the place:
- all of Real Estate;
- hotels, resorts, restaurants, event venues, attractions, vehicle hire and travel agents;
- clinics, salons, garages, repair shops, schools, tailors, gyms and pet services.

Goods like cars or furniture get the seller's shop location instead, which comes with W6b-3. You can add any category later in Admin › Categories.

**Your steps, in this order:**

1. **Admin › Categories › Import:** `map-pin-categories-2026-09-30.csv`. The preview should show **changed 25**. Apply it.
2. **In Lovable: Publish now,** before sending the next prompt, so no half-finished work gets published.
3. **Paste the prompt below into Lovable and send it.** It includes the CI fix. There is nothing to attach.
4. **Walk on the published site, on your phone:**
   1. **Price step:** the box says "Enter amount" with no example. 5.25 with "million" shows 5,250,000. Meat, Dairy & Eggs › Milk is priced per litre.
   2. **Place step:**
      - There are two boxes, "Where this ad is shown" and "Item / service location".
      - Each empty country, region or city box is red until it's filled.
      - The plan fits on one line, with Details.
      - Type a location note, go Next and then Back: the note is kept.
   3. **Real Estate › Houses:**
      - The map opens full screen on the ticked city.
      - The map's corner credit mentions Esri. If it says OpenStreetMap with a "backup map" note, tell me.
      - Tap to drop a pin and drag it. Save stays visible and the pin is saved.
      - Satellite shows real imagery.
      - Time how long the first map picture takes to appear.
   4. **Any Food category:** no map, but the location note box is there.
5. **Reply with** your walk results, **"approve C1–C3"** (or edits) for the brand, "Locally made" and staples decisions, and **"approve DEC-091"** for the admin Services page. Both are still waiting.

---
```
W6c — CI fix (INC-348) + walk fixes: numbers turn red as typed, prices show what they are per, search never waits for the index, no phone numbers in the location note, posting-load census · Tier B (+ at most one migration) · 2026-09-30

BASE: dev 6de8494 (run 36757197211: every E2E job green; red only on the dependency audit).
- ESRI_API_KEY is saved (you confirmed it 2026-09-30); nothing to do for it.
- Your W6b-2 call stands: scratch leaves carry map_pin by default. The live map categories are set by the operator's data import, not by code.

CENSUS FIRST (state it in the report before editing):
- the files each part touches;
- the live body md5 of set_listing_pin (from migration 60cedbed);
- for Parts B and C, the exact read and write paths you will change.

PART 0 — INC-348, THE RED BOARD
- CI's dependency audit fails on two new high advisories for brace-expansion < 1.1.19 (GHSA-6j4f-fj2g-mc7p, GHSA-qhr7-859c-m2p7), reached only through eslint's minimatch (dev tooling).
- The override pins brace-expansion inside 1.x on purpose: a flat floor drags minimatch@3 onto 5.x and eslint dies (docs/features/dependency-audit.md:56–60).
- Raise it from "^1.1.17" to "^1.1.19" in package.json overrides, regenerate bun.lock, and confirm eslint still runs with 0 errors.
- Add a dated entry to docs/features/dependency-audit.md. The clean audit is proven by CI only (bun audit 404s in the sandbox).

PART A — E1: A NUMBER OUT OF RANGE TURNS RED AS IT IS TYPED (operator walk: 25001 in Volume was refused only on Next)
- Today the range is only a hint (step-specifications.tsx:1760, post.specs.boundsHint) and the door refuses on Next.
- On input and on blur, a value outside its effective range (the definition's min/max, a chosen option's bounds, a model-year floor) shows the red border and the door's own refusal text at once. Back in range clears it.
- The same for every other wizard field with a number limit; list them in the census.
- The door is unchanged and still decides (F3).
- Test PW-93 (scratch number attribute, min 1, max 25000): typing 25001 shows red and the message before Next; 25000 clears it.

PART B — E2: A PRICE SHOWS WHAT IT IS PER, EVERYWHERE IT IS PRINTED
- Today the listing card prints only the amount (listing-card.tsx:8–18, priceLabel), and the feed read carries no basis or period (use-feed.ts:116–119).
- Wherever a price is printed (card, preview, detail, review) it carries its basis noun or its period: "ETB 250 / kg", "/ bottle", "/ month".
- Reuse basisNoun (price-basis.ts:89, INC-297) and the period keys (preview/listing-detail.tsx:45).
- The feed read gains what it needs without one query per listing. If that needs a database change, it goes in this turn's one migration.
- Test PW-94 (scratch): a listing priced per litre shows "/ litre" on its card and its preview; a monthly one shows "/ month".

PART C — E3: NO SEARCH WAITS FOR THE INDEX (operator walk: the first search after an import took a few seconds)
- Today catalog_find rebuilds the whole index inside the first search after any catalogue change (migration 20260924104238:89–102, the refresh call at :102). catalog_find_refresh is granted to service_role only (:67–68).
- Every server path that commits a catalogue change calls catalog_find_refresh(false) once after its commit, through the service client, so the rebuild happens there. These paths are the three imports, the admin category and attribute saves, and the translation approvals that move the version; list them in the census.
- The lazy rebuild in catalog_find stays as the fallback.
- JUDGE, fixed now: on staging, after a scratch catalogue write through one of those paths, catalog_find_index already holds the current version before any search (DB truth), and five searches right after all return in under 1 s.
- Test PR-19 (posting-routes): the DB-truth half.

PART D — INC-350: THE LOCATION NOTE REFUSES PHONE NUMBERS
- The help promises "No phone numbers" (en.ts:2239), but nothing checks.
- In set_listing_pin, re-declared WHOLE from its live body (md5 read-back first): refuse a note that contains a phone-like number (seven or more digits in one run, allowing spaces, dots, dashes, brackets and a leading +).
- New refusal key contactInNote: EN "Remove the phone number — buyers contact you through ethio.com." / AM "ስልክ ቁጥሩን ያስወግዱ — ገዢዎች በethio.com ያገኙዎታል።".
- Mirror it client-side, as in Part A.
- Migration law:
  - in-file closers;
  - proofs in a block with scratch rows only, removed there (INC-340);
  - a mark later than the file's UTC stamp;
  - report "apply <uuid-fragment> → expect mark <value>".
- Test PW-95: "+251 911 234 567" is refused; "Bole Road, House 1234, 3rd floor" is saved.
- Census, report only: any other buyer-visible help text that promises "no phone numbers".

PART E — INC-351, CENSUS ONLY: THE POSTING FORM TAKES ~20 S ON SLOW 4G
- Your W6b-2 numbers: the place step loads in 20.3 s at 360 px on Slow 4G, before and after.
- Measure on staging under the same conditions:
  - the requests made before step 1 is usable;
  - the JS chunks, in gzipped KB;
  - the data reads and their times;
  - render-blocking resources.
- Report the top five costs with numbers and a proposal. No fix this turn.

TESTS (each red before its fix, pasted):
- Scratch rows only (G27); no page-position assertions (G28); every afterEach uses stopPageBeforePurge.
- PW-93 in e2e/post-wizard-specs.spec.ts, PW-94 in e2e/post-wizard-pricing.spec.ts, PW-95 in e2e/post-wizard-where.spec.ts, PR-19 in e2e/posting-routes.spec.ts.

SCOPE — you may touch only:
- package.json, bun.lock, docs/features/dependency-audit.md (Part 0)
- src/features/posting/*, src/features/posting/map/*, src/features/posting/preview/*
- src/components/marketplace/listing-card.tsx, src/features/feed/use-feed.ts
- src/server/catalog-find.server.ts, and the server files that commit catalogue changes (named in your census)
- src/i18n/locales/en.ts and am.ts (new keys only), plus the two regenerated usage maps
- at most ONE migration
- e2e/post-wizard-*.spec.ts, e2e/posting-routes.spec.ts, e2e/helpers/*
- docs/features/posting.md, catalog-finder.md, listings.md, _changelog.md

ANTI-PATTERNS
- No key or secret anywhere. No real rows (G27). No page-position assertion (G28).
- No CI, workflow or reporter change (G22).
- No hardcoded user-visible string.
- The door stays the authority: no client-only rule without its door twin (Part D), and no widened limit.
- Do not remove the lazy rebuild.

COMPLETION REPORT
- The census; each red before its fix; the Part C judge numbers; the Part E numbers.
- The apply line, if a migration landed.
- DEC-023: every post-wizard-* spec plus posting-routes and a11y, both projects, locally, green. Report only on green. If a known flaky test fails, re-run the full set once and report both runs.
- Typecheck, lint (0 errors), unit and component tests, and the whole-tree format check last.
```
---

After this come the flaky-test turn and then W6b-3. The flaky-test turn is overdue: the ledger shows 14 tests that failed and then passed on retry 3 or more times in the last 7 days. W6b-3 saves the seller's shop or office location. The title that fills itself from "What is it?" waits until the curator's Other-category question lands.

Sources:
- [Esri Leaflet: display multiple basemap layers (World Imagery works with the "Static basemap tiles" privilege)](https://developers.arcgis.com/esri-leaflet/maps/raster-tile-basemaps/display-multiple-basemap-layers/)
- [ArcGIS styles available as static basemap tiles](https://developers.arcgis.com/documentation/mapping-and-location-services/mapping/basemaps/arcgis-styles-tiles/)
