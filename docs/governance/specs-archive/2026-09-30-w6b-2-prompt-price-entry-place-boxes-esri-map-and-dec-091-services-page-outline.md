Source: supervisor thread, turn 981 (the same text is the supervisor's scratch file w6b2.txt), Wed 2026-09-30 12:38 New York.
Status at 2026-10-05: W6b-2 built (6de8494; migration 60cedbed, mark 20260930180000, proofs P30 to P34; PW-88 to PW-92; CI E2E green, red only on the audit INC-348); the map_pin gate was later removed (map in every category, W6d Part K); the DEC-091 Services page outline was put to the operator for 'approve DEC-091' — no approval is recorded in the thread and the page is not built; the repo holds the built behaviour in docs/features/posting.md (W6b-2 entry), not this text.
Related: W6b-2, INC-347, DEC-091, ESRI_API_KEY, PR-19, PW-88 to PW-92, S79 (map_pin categories), G27, G28, G29.

**W7 is clean.** CI passed on `825a779` (run 36657436473) and main was promoted. The finder search, the "Current choice / Keep it" behaviour and the multi-size report are all in; the scope checks out, there are no secrets in the diff, and last night's full test run also passed.

**Recorded (decided):**
- **"Listing not found" lines:** CI logged 3 this run, and the rule is judged on CI runs, not Lovable's local 6, so no tracing is needed.
- **Shola milk shows "per kg" on the Price step:** that's a code bug, not catalogue data (INC-347). Milk is set to allow only per litre, per piece or per pack, so "per kg" shouldn't even be offered. The unit control on the Price step isn't applying the rules from your Specifications answers. It's fixed in the prompt below, reproduced first.
- **Two new flaky tests:** PR-7, and LS-11, whose test-cleanup error suggests another test's post landed in its test country. Both go to the flaky-test turn.

**Your walk → the next prompt (W6b-2), which also applies your Esri decision:**
- **Price step:**
  - The box says "Enter the price" with no example number.
  - A **thousand / million** switch next to the amount, showing the full figure underneath (for example "= 5,200,000 ETB").
  - The per-kg bug above.
- **Place step:**
  - **Two blue-bordered boxes:** "Where this ad is shown" and "Item / service location".
  - The plan summary shrinks to one short line.
  - Red border per box: each box is red only until it's filled.
  - A **"Location details"** text box for building, floor, suite or directions. It can be saved with or without a pin; buyers will see it.
- **Map:**
  - **Esri street and satellite maps**, with automatic fallback to OpenStreetMap if Esri fails or has no key.
  - Opens zoomed on the chosen city with its outline drawn.
  - Tap to drop a pin you can drag, then a "Save location" button that stays visible. Full-screen on phones.
  - It starts by measuring and reproducing "can't drop a pin, and it's slow".
  - The old Esri satellite address our map uses today without a key is removed.

**Your new request — tracking every outside service.** This is a proper feature, so it needs your OK on the outline below (DEC-091) before it's built. It would be the build after W6b-2.
- **One admin page, Admin › Services**, with a row for each outside service:
  - status light and last check;
  - error rate in the last 24 hours;
  - usage this month against its free allowance;
  - estimated cost against a budget you set;
  - which backup is in use, where one exists.
- **Services found in the code:** Supabase, Google Gemini (AI images, writing help), Google Translate, the address lookup service (Nominatim), OpenStreetMap, Esri, and Telegram (sign-in). Cloudflare, Lovable hosting, GitHub Actions and the email sender are outside the code; the build will confirm the full list.
- **How "working?" is checked:** a scheduled check every 15 minutes makes a free or near-free call to each service, and every real call our server makes is also counted as a success or failure.
- **How usage and cost are measured:**
  - **Exact** for calls our server makes (AI, translation, address lookups, emails).
  - **Estimated** for map images, which phones fetch directly from Esri; the page shows map sessions, and Esri's own usage page stays the source of truth.
  - **Hosting bills** (Supabase, Cloudflare, Lovable, GitHub) are read from their usage APIs where they have them, otherwise entered monthly in admin.
  - Prices are editable in admin, because providers change them.
- **Alerts:** an email to admins when a service is down, passes 80% of its free allowance, or passes its budget.
- **Backups:** maps switch automatically (Esri → OpenStreetMap). The existing "switch each AI feature on or off" admin control lives on the same page.
- **Security:** provider keys stay on the server, never shown; only staff with a services permission can see the page.

**Your steps:**
1. **Create the Esri key** before or while Lovable runs:
   - Sign up for **ArcGIS Location Platform** (free tier).
   - Create an API key that can use **basemaps**, restricted to ethio.com and your Lovable domains.
   - Don't paste it here. When Lovable opens its secret dialog, enter it as **ESRI_API_KEY**.
   - If it isn't ready, the map still works on OpenStreetMap and you can add the key later.
2. **Paste W6b-2** (below) into Lovable and send it. It may include one small database change; when Lovable asks "Modify Supabase database", **allow** it. If it does, Lovable will then give you one file to apply to **staging** as before.
3. **Reply "approve DEC-091"** (or change the outline above), so the Services page can follow W6b-2.
4. Send me the curator's work whenever it's ready; I'll review it while Lovable builds.

---
```
W6b-2 — price entry (placeholder, thousand/million, INC-347) + place step (two boxes, per-box red, location details) + the map (Esri with OSM fallback, apex-style pin) · Tier B (+ one small migration if needed) · 2026-09-30

BASE: dev 825a779 (run 36657436473 green). Reference for the map and pin UX: tesfayekb/apex-marketplace — src/components/maps/MapPinDropper.tsx and geocoding-utils.ts. Copy the UX; do NOT copy its browser-side Nominatim calls or its token handling.

PART A — THE PRICE STEP
A1 Placeholder: post.price.amountPlaceholder ("For example 25000", en.ts:2004) is replaced under a NEW key: "Enter the price" / "ዋጋውን ያስገቡ". No example number.
A2 Thousand / million entry:
   - Beside the amount, a compact choice: [ — ] (as typed) · thousand · million, in AM ሺህ · ሚሊዮን.
   - The typed number (decimals allowed, e.g. 5.25) is multiplied, and one line under the box shows the full amount formatted with its currency ("= 5,250,000 ETB").
   - The stored and sent value is the full amount; the door is unchanged.
   - On reopening, the full amount shows as typed ([ — ]).
A3 INC-347 (operator walk): Meat, Dairy & Eggs → Milk → the price step's unit shows "per kg". Milk's option carries facts {unit_of_sale-food: per_litre} and allowed [per_litre, per_piece, per_pack]; the link default is per_kg.
   - The basis control mounted on step 5 (only=[basisKey]; step-specifications.tsx:209–215) does not apply the step-3 answer's facts or narrowing.
   - Test first, with scratch data: a leaf whose basis link defaults to per_kg, and a type option with the fact per_litre and allowed [per_litre, per_piece]. Choose the type on step 3 → on step 5 the basis shows per_litre, and per_kg is not offered. Paste the red.
   - Fix at the root.
   - G29 census: every fact, allowed or bound whose owner is answered on one step and whose target is drawn on another step. List each; fix each.

PART B — THE PLACE STEP (operator walk, 2026-09-29/30)
B1 Two boxes, each with a blue border and a title:
   - Box 1, "Where this ad is shown" (AM "ማስታወቂያው የሚታይበት"): the country / region / city boxes, the "Item or service is here" ticks, and the add buttons (all as today).
   - Box 2, "Item / service location" (AM "የዕቃው / የአገልግሎቱ ቦታ"): the ticked place's name, then the map (map-capability categories only), then B3.
B2 The plan text (post-where-plan, -plan-count, -plan-levels, -chosen; step-where.tsx:1006–1030) collapses into ONE short line, e.g. "2 of 2 cities · 2 regions", with a small "details" toggle for the rest.
B3 "Location details" (optional; AM "የቦታ ዝርዝር"), with help "Building, floor, suite or directions — buyers will see this. No phone numbers." (AM "ሕንፃ፣ ፎቅ፣ ክፍል ወይም አቅጣጫ — ገዢዎች ያዩታል። ስልክ ቁጥር አይጻፉ።").
   - Up to 200 characters, sanitised; it stores in listings.street_address.
   - It is shown for EVERY category, with or without a pin.
   - set_listing_pin writes the four pin columns together (posting-service.ts:214). If a note without a pin needs a door change, write ONE small migration:
     - re-declare the door WHOLE from its live base (INC-183 md5 read-back first);
     - in-file closers, and proofs in a rolled-back block with scratch rows only (INC-340);
     - a mark later than the file's UTC stamp;
     - report "apply <uuid-fragment> → expect mark <value>".
B4 Red border per box: the country box is red only until a country is chosen; a region box until its region is chosen; a city box until its city is chosen. Each clears as soon as it is filled. The heading's required mark stays until a city is chosen (W6 R1).

PART C — THE MAP (Esri, with OSM as the automatic fallback)
C1 Tiles:
   - Primary: ArcGIS Static Basemap Tiles (512 px raster), streets and imagery (satellite with labels), key ESRI_API_KEY. Ask for it through the secret dialog; if it is absent, run on the fallback and say so in your report.
   - The key is read on the server; one small route returns the tile templates and attributions. No key in the repo.
   - Fallback: OpenStreetMap standard tiles, with attribution and our identification, and no prefetch.
   - Leaflet stays: no MapLibre, no new heavy dependency. Leaflet loads only when the map opens (as today).
   - Remove the unauthenticated server.arcgisonline.com imagery layer (src/features/posting/map/leaflet.ts:49).
C2 Automatic fallback: on repeated tile errors from the primary (e.g. 3 in a row, or any 401/403/429), switch that session to OSM, show a tiny "backup map" note, and log one server line "[map] fallback provider=osm reason=<status>". The Services admin (DEC-091, next) will count these.
C3 Opening:
   - Centre and zoom on the ticked place: maxZoom 14 for a city, 16 for a sub-city; a saved pin opens centred at 16.
   - Draw the place's outline (thin blue line, light fill) from a NEW server route that fetches the outline from Nominatim (polygon_geojson with simplification) through our existing geocoder pattern: our identification, the per-seller dial, long cache headers, and an in-process cache. With no outline, draw a circle around the place's centre.
   - Never call Nominatim from the browser.
C4 The pin, apex-style:
   - Tap the map to drop a pin; it is draggable.
   - Search (existing) and "My location" (existing) move it.
   - The street line comes from our reverse geocoder (existing).
   - A "Save location" button stays visible (sticky), and Cancel restores the saved pin.
   - Full-screen sheet at ≤ 640 px, dialog above that.
   - A soft, non-blocking notice if the pin falls outside the ticked place's outline.
   - Exact/approx precision stays as it is.
C5 Walk finding first: "can't drop a pin, and slow".
   - Reproduce at 360 with Slow 4G throttling on the published build, and report the time to first tile and where the pin interaction failed, BEFORE changing the code.
   - Then report the same numbers after.

TESTS (each red before its fix, pasted). Scratch rows only (G27); no page-position assertions (G28); every afterEach uses stopPageBeforePurge. Put them in e2e/post-wizard-where.spec.ts, or a new e2e/post-wizard-map.spec.ts if that file would pass ~25 tests per project.
- PR-19 (posting-routes): INC-347 at the door and route level, if the door is involved.
- PW-88: INC-347 in the wizard (the scratch data from A3).
- PW-89: thousand/million — 5.25 + million saves 5250000; the formatted line shows it; a reopen shows the full amount.
- PW-90: two boxes; the per-box red clears level by level; the plan line is collapsed.
- PW-91: location details save with no pin and with a pin; 201 characters are refused.
- PW-92 (map category, scratch): the map opens on the ticked place; a tap drops a pin; Save stores it (DB truth); the tile route is mocked to 403 → the OSM fallback note shows.
Component tests where they are cheaper.

SCOPE — you may touch only:
- src/features/posting/step-pricing.tsx, step-specifications.tsx, step-where.tsx, wizard.tsx, posting-service.ts, field.tsx
- src/features/posting/map/*
- new small server routes for the tile templates and the outline, under src/routes/api/geo/* or src/routes/api/map/*
- src/i18n/locales/en.ts and am.ts (new keys only), plus the two regenerated usage maps
- at most ONE migration (B3 only)
- e2e/post-wizard-where.spec.ts, a new e2e/post-wizard-map.spec.ts, e2e/posting-routes.spec.ts, e2e/helpers/*
- docs/features/posting.md, listings.md, _changelog.md

ANTI-PATTERNS
- No key in the repo, and no browser call to Nominatim.
- No real rows (G27); in particular never touch the 'free' plan row.
- No new map library.
- No CI or reporter change (G22).
- No hardcoded user-visible string.

COMPLETION REPORT
- The C5 before/after numbers; the A3 census; each red before its fix.
- The apply line, if a migration landed.
- DEC-023: every post-wizard-* spec plus posting-routes and a11y, both projects, locally, green. Report only on green.
- Typecheck, lint (0 errors), unit and component tests, and the whole-tree format check last.
- Every file changed, git ls-files proof for every new file, and confirmation that nothing outside scope was touched.
- W6b-2 entries in docs/features/posting.md and docs/_changelog.md.
```
---
