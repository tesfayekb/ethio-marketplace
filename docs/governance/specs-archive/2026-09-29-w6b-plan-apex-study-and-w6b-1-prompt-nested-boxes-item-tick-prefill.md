Source: supervisor thread, turn 969, Tue 2026-09-29 17:46 New York.
Status at 2026-10-05: W6b-1 built (eda023d; PW-83, PW-84; CI red only on the dependency audit INC-344, green after W7 Part A); the three-part W6b plan was carried out as W6b-2 (turn 981) while W6b-3 (the seller's shop or office location) was never written as a prompt and is not built (its intent lives on as the own_place / carried-pin rules of bundle 2 steps 16 to 17 and the 'decided earlier, not scheduled' list); the map choice asked here was decided for Esri in turn 979/980; the repo holds the built behaviour in docs/features/posting.md (W6b-1 entry), not this text.
Related: W6b-1, W6b-2, W6b-3, S75, INC-330, INC-343, G27, G28, G22, PW-83, PW-84, apex-marketplace reference.

**W6 is closed.** The CI re-run passed on `d662a91` and main was promoted to it. Walk steps 1–6 all passed. "Listing not found" came to 5, within the target of 5 or fewer; that's 2 of the 3 clean runs INC-323 needs.

**What apex does** (I had its code studied):
- **Map:** the same map library we use (Leaflet), but with **Mapbox** map images, fetched with a key from a small server function. Free OpenStreetMap is the fallback. Our map uses the free OpenStreetMap servers, which promise no speed or uptime, and that's likely part of the slowness you saw.
- **Opening the map:** apex looks up the chosen city's outline and draws it as a dashed blue line with a light fill, zoomed to fit the city. The seller taps to drop a pin they can drag, can search an address or use "my location", then presses **Confirm location**.
- **Advertising places:** a box per country; inside it, region rows with a city picker; "+ Add city" under each region; "+ Add state" at the bottom of the country box; "+ Add another country" below. The limits come from admin settings.
- **Where your design is better than apex:**
  - Apex asks for the item's location as a separate address form. Your tick on one of the advertised places is simpler.
  - Apex saves only the first advertised place; we save them all.
  - Apex asks the address lookup service straight from the browser; ours goes through our server with caching.

**Correction (slip S75):** I told you earlier that a preferred place saved in Settings would be filled in first. There's no such setting in the app, only an unused database field. So the fill-in order is: your last post's places → the area you last picked while browsing → the location guess.

**W6b in three parts, one after another:**
- **W6b-1 (below):** the layout you asked for.
  - The heading becomes "Where should this ad be shown?".
  - Country box → region box → a **separate city box** that opens once a region is chosen.
  - "Add city" sits inside the region box, "Add region" inside the country box, "Add country" below; each shows only when the admin plan allows it.
  - Each city box gets an "Item or service is here" tick, and only one can be ticked.
  - The last post's places fill in automatically.
- **W6b-2:** the map, rebuilt the way apex does it:
  - Opens centred on the ticked city with its outline highlighted.
  - Tap to drop a pin you can drag, then a **Save location** button that stays visible.
  - Search and "my location", full-screen on phones, and loaded only when opened.
  - It starts by reproducing your "no way to drop a pin and save" finding.
- **W6b-3:** the shop/office location saved to your profile. It's personal data, so it gets the heaviest checks.

**Your steps:**
1. Paste W6b-1 (below) into Lovable and send it. Nothing is needed in any other system first.
2. **Decide the map service for W6b-2** (your call, since it involves a new account):
   - **Mapbox, like apex (recommended):** create a free Mapbox account and a public token restricted to ethio.com and your Lovable domains. Lovable will ask for the token in its secret dialog during W6b-2. The free tier covers 200,000 map-image requests a month, then $0.50 per 1,000. My rough estimate is that one map opening uses 20–40 images, so about 5,000–10,000 openings a month are free, and the map only loads when a seller opens it.
   - **Keep free OpenStreetMap:** no account, but slower, and not meant for app traffic at scale.

   Reply "Mapbox" or "OSM".

---
```
W6b-1 — place step: the ad's places in nested boxes, one "Item or service is here" tick, prefill from the last post · Tier B · 2026-09-29

BASE: dev d662a91 (run 36630568746 green; W6 closed).

OPERATOR RULINGS (walk 2026-09-29, and the W6b spec approved today):
R1 This step is WHERE THE AD IS SHOWN, not only the item's location.
   - Heading: "Where should this ad be shown?"
   - Intro: "Choose the cities where buyers will see this ad, then tick the one where the item or service is."
R2 Layout: a country box contains region boxes; a region box contains city boxes.
   - A city box appears only after its region is chosen. It holds the city picker, the optional sub-city picker (keep "All of <city>", D19), the tick and Remove.
   - "+ Add city" sits at the bottom INSIDE the region box and adds a city box to that region.
   - "+ Add region" sits at the bottom INSIDE the country box and adds a region box.
   - "+ Add country" sits BELOW the country boxes and adds a country box.
   - Each add button shows only while the plan (schema.plan) leaves room at its level (W6 R5 unchanged).
   - At 360 px the nesting uses compact padding, so a city box stays at least 280 px wide.
R3 Every city box carries a tick, "Item or service is here".
   - Exactly one is ticked, as one radio group across all boxes. It starts on the first city, and the seller can move it.
   - If a sub-city is chosen, the item place is the sub-city; otherwise it is the city.
   - The ticked node is sent FIRST in the coverage list, because the door's item place is p_coverage[1]. There is no door change and no migration.
   - Remove shows on every city box whenever the step has more than one city. Removing the ticked city moves the tick to the first remaining city and announces it (aria-live). This replaces W6's "the item's place cannot be removed".
R4 Prefill on a NEW post, in this order:
   (1) the seller's most recent OTHER listing's places, with its item place ticked;
   (2) the saved-area cookie;
   (3) the location guess.
   - After Back, a draft's own saved places still come first (W6).
   - There is no Settings preference today (profiles.default_post_location_id has no UI); do not use it.
   - The last-listing read filters seller_id = the signed-in user explicitly (the INC-330 lesson: RLS shows every active listing).
R5 Strings, under the new-key law:
   - Remove the orphaned post.refusal.multipleMarkets (EN + AM).
   - Replace post.where.defaultPlaceLabel, post.where.why and post.where.defaultPlaceHint with NEW keys.
   - Drop post.where.itemLocation and post.where.alsoShownIn if they are unused after the change.
   - New strings (EN / AM):
     - "Where should this ad be shown?" / "ማስታወቂያው የት ይታይ?"
     - "Choose the cities where buyers will see this ad, then tick the one where the item or service is." / "ገዢዎች ይህን ማስታወቂያ የሚያዩባቸውን ከተሞች ይምረጡ፣ ከዚያም ዕቃው ወይም አገልግሎቱ ያለበትን ምልክት ያድርጉ።"
     - "Item or service is here" / "ዕቃው ወይም አገልግሎቱ እዚህ ነው"
   - "City" reuses the existing level key.

SCOPE — you may touch only:
- src/features/posting/step-where.tsx, step-where.test.tsx, posting-service.ts (or one new read helper in src/features/posting)
- src/i18n/locales/en.ts and am.ts, plus the two regenerated usage maps
- a NEW e2e/post-wizard-where.spec.ts; e2e/post-wizard-place.spec.ts (updates to existing tests only); e2e/helpers/posting.ts
- docs/features/posting.md, docs/_changelog.md
The map and pin code (src/features/posting/map/*) is out of scope: that is W6b-2.

PRE-EDIT CENSUS (in your report, line-cited):
1. step-where.tsx today: the country box (:216), region box (:231), row (:280), the labels at :287, the add buttons (:357, :371, :823), the heading (:782), the prefill sources (:44 onwards, :495).
2. How coverage order reaches the door (the item place is p_coverage[1]).
3. Every existing test that reads the removed labels or assumes the item's city cannot be removed.

TESTS (each red before its fix, pasted):
- Component test (extend step-where.test.tsx), with a plan of 3 cities / 2 regions / 2 countries:
  - A city box appears only after its region is chosen.
  - Each add button sits in its box, as R2 says.
  - Exactly one tick exists. Moving it puts that node first in the coverage passed on.
  - Removing the ticked city moves the tick.
  - A chosen sub-city becomes the item place.
- NEW e2e/post-wizard-where.spec.ts. Its afterEach uses stopPageBeforePurge; scratch rows only (G27); no page-position assertions (G28).
  - PW-83 (360 and 1280): the new heading shows. On the free plan the single city box is ticked. DB truth: location_id is the ticked node (the sub-city when one is chosen), and listing_locations holds the chosen nodes.
  - PW-84: a scratch seller whose previous listing covers city X with sub-city Y as its item place starts a new post. It opens with X / Y, the tick on Y, no mark, and Next passes. A second scratch seller's listing in another city must NOT be used (the INC-330 class).
- Update every test found in census item 3, and give the reason for each.

ANTI-PATTERNS
- No door or migration change.
- No Settings UI.
- No map change.
- No reporter or CI change (G22).
- No hardcoded user-visible string.

COMPLETION REPORT
- The census, each red before its fix.
- DEC-023: every post-wizard-* spec (including the new where spec) plus posting-routes and a11y, both projects, locally, green. Report only on green.
- Typecheck, lint (0 errors), unit and component tests, and the whole-tree format check last.
- Every file changed, git ls-files proof for every new file, and confirmation that nothing outside scope was touched.
- W6b-1 entries in docs/features/posting.md and docs/_changelog.md.
```
---

Sources:
- [Mapbox pricing](https://www.mapbox.com/pricing)
- [OpenStreetMap tile usage policy](https://operations.osmfoundation.org/policies/tiles/)
