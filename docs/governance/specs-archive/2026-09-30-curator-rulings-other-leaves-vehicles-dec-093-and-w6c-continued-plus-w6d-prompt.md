Source: supervisor thread, turn 999, Wed 2026-09-30 17:38 New York.
Status at 2026-10-05: Block 1 (curator) carried out: File 1 (Other leaves) and the Vehicles step-2 files delivered, audited and imported 2026-09-30 (DEC-093 ruled in turn 1007); Block 2 (Lovable) built over several turns: Parts F to K landed (e765c012, c3761f9 … 9d56f391 green), Part J's 360 px half ruled in turn 1009 and built in turn 1020, Parts D, L and M landed as the D + L + M migration a35e45fa (mark 20261002030000, 2026-10-02), Parts A to C and the E census moved to bundle 1 and bundle 4; the repo holds the built behaviour in docs/features/posting.md and the briefs, not this text.
Related: W6c, W6d, INC-353 to INC-357, DEC-092 (framework update refused), DEC-093, Parts D L M, map in every category, PW-96 to PW-104, b1h, File 1, Vehicles step 2.

The Lovable question depends on whether W6c has finished, so I'll check the repo first.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

W6c has only done Part 0, the CI fix. That part is clean: CI is green and main was promoted at 07e6a52. Parts A–E haven't been started in the repo. Now the b1h audit against your live catalogue.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

The diff matches the curator's note exactly: 1 new question, 14 changed ones, 2 added links, 49 changed and nothing dangling. Now the whole-form checks and the form-path comparison.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

**Don't send the gallon addendum on its own.** I've folded it into one combined curator message below, together with your approvals and my review of all three curator deliveries.

**What I checked:**
- **b1h (Food round 3) is clean.** It matches your live catalogue exactly: 1 new question (Pasta Type), 14 changed ones, and 2 added and 49 changed category links. Nothing points to the removed Frozen types, the search-word rules pass, and every Food form reads as the note describes. Import it.
- **Lovable stopped after W6c's first part.** Only the CI fix is in the repo. It's clean: CI is green and main was promoted at 07e6a52. The other five parts (A–E) haven't started, so I've combined them with your walk fixes into one continuation. That's still a single prompt in flight, and it lets both changes to the pin-saving database function go into one database change.
- **Other-categories and Vehicles review notes:** I recommend approving all their rulings, with three adjustments that are in the curator message:
  - Other Food asks the brand before "How it's sold", the same order as the rest of Food.
  - Motorcycle engines split into "Up to 125 cc" and "126–250 cc".
  - Buses & Vans is at 94.9% on the curator's own 95% coverage bar. Finding one missing spec, the Karry K60's gearbox, brings it to 96.2%, so that has to be sourced before the Vehicles files.

**Your steps, in this order:**

1. **Admin › Attributes › Import:** `c27-b1h-definitions.csv` and `c27-b1h-links.csv` together. The preview should show **added 3 · changed 63 · unlinked 0 · unchanged 1,397 · refused 0**. Apply it.
2. **Admin › Translations:** approve whatever b1h left pending. Also ask a native reader to check በጃር (ብልቃጥ), በሳሼ (ፌስታል), በካርቶን, ፔኔ and ላዛኛ.
3. **Export** Definitions, Links and Categories. Do this after step 1, because the curator's next files build on these.
4. **Curator:** paste block 1 below and attach the three exports.
5. **Lovable:** if it is still working, wait. Otherwise paste block 2 below and send it. There's nothing to attach.

**Block 1 — for the curator:**

---
```
C27 — rulings (operator, 2026-09-30) + next files

b1h: supervisor audit passed (matches the live base exactly; no dangling references to the removed Frozen types). The operator is importing it now; the attached exports are post-b1h and are the base for everything below.

APPROVED:
- C1–C3 as proposed. C3's instant noodles are already covered by b1h's Pasta Type (Noodles). Build the lentil/pulse split, gesho/malt, and maize flour, sorghum and finger millet (ዳጉሳ). Oats stay on hold.
- Other leaves, rulings 1–6, with ONE change: at Other Food, Brand + write-in sit before "How it's sold" (the F1 order; the operator's reason is that brands come in different containers). item_name's help keeps "No phone numbers or contacts". Engineering is adding the door check for written answers now.
- Vehicles, rulings 1–8, with these calls:
  - Ruling 7: YES, split "Under 250 cc" into "Up to 125 cc" and "126–250 cc", with the 16 locks re-pointed.
  - Buses & Vans is at 94.9%, under the pre-committed 95% bar. Source the Karry K60's gearbox as imported to Ethiopia before step 2 (74/78 → 75/78 = 96.2%). If no source exists, report it; do not ship under the bar.

ADDENDUM (operator walk): add "per gallon" to unit_of_sale-food in the next file that restates it. Allow it for milk and juice (US diaspora sellers). The 1-gallon jug's size goes in Volume, and the Volume help gains "a US gallon is 3,785". How it's sold is always asked before its size.

ORDER OF FILES, each on fresh exports after the previous import:
1. Other leaves (with the gallon).
2. Vehicles.
3. C1–C3, one root per batch.
```
---

**Block 2 — for Lovable:**

---
```
W6c CONTINUED + W6d (operator walk 2026-09-30) · Tier B, with Tier A rigor on the two doors · one migration

STATE: Part 0 (INC-348) is verified: CI green on 07e6a52 (run 36762595363), main promoted. Parts A–E of W6c are not in the repo yet; they stand as written. Parts F–M below are added. If you are part-way through A–E, keep what you have.

ORDER OF WORK: F, G, H, I, J, K first (the operator sees these today), then D + L + M (the one migration), then A, B, C, and last the E census.

CENSUS FIRST (state it in the report before editing), adding to W6c's census:
- the live md5 of set_listing_pin and of validate_listing_draft;
- where text-type attribute values are judged;
- how the catch-all flag was set on the other "Other" leaves.

PART D, AMENDED — phone-like numbers (7+ digits in a run, allowing spaces, dots, dashes, brackets and a leading +) are refused in the location note AND in every text-type attribute value (write-ins such as brand_name, and the coming item_name and model_name).
- Door: validate_listing_draft, re-declared WHOLE from its live base (md5 read-back first), next to set_listing_pin.
- Refusal key contactInNote for the note; a new contactInText for attributes (EN/AM).
- Test PW-96: a scratch text attribute holding "+251 911 234 567" is refused; "Model 320D" is accepted.

PART F — INC-353: THE PIN AND THE OUTLINE ARE INVISIBLE
- Cause: the map wraps theme tokens in hsl() (leaflet.ts:195; map-pin-dropper.tsx:202 and :221), but the tokens are full oklch colours (styles.css:108, :114). hsl(oklch(...)) is invalid, so the pin and outline render transparent.
- Use each token as the full colour it is. Where SVG or Leaflet needs a concrete value, resolve it from the computed style.
- Fix every hsl(var(--…)) in src (there are three).
- Extend PW-92: the placed marker's computed background is not transparent, and the outline has a visible stroke.

PART G — INC-354: THE MAP CREDIT IS NOT SEEN
- The operator saw no Esri/OSM credit on a phone. It is most likely under the Save/Cancel bar.
- The credit must stay visible at every width, never covered.
- Test PW-97: the credit is inside the viewport, and elementFromPoint at its centre is the credit. It reads Esri on the Esri plan (mocked) and OpenStreetMap on the backup.

PART H — INC-355: REQUIRED AND EMPTY MUST READ AS RED
- The soft state is destructive at 40% (field.tsx:120 controlClass; step-where.tsx:127 boxClass). The operator sees no red.
- Fix it at the shared primitive: required + empty = the full destructive border; refused adds the ring and the message.
- Place step: every empty required box (country, region, city) wears its own asterisk and red border. Each clears when filled and returns when cleared. Today only the heading has an asterisk (step-where.tsx:999).
- Extend PW-90: the computed border colour equals the destructive token, per box and level by level.

PART I — INC-356: THE "ITEM OR SERVICE IS HERE" TICK IS NOT SEEN
- The code draws it under every city box (step-where.tsx:391–403), but the operator did not see it on the published build.
- Reproduce first, at 360 and 1280, on a fresh post and on a prefilled one (W6b-1 R4). Paste what the DOM shows, then fix the root cause.
- It sits on the city line: to the right of the city at ≥ 768, and under it at 360.
- Test PW-98: the tick is visible and checked at both widths, on both paths.

PART J — STAIRCASE LAYOUT inside "Where this ad is shown"
- Country: full width.
- Region box: indented, about two-thirds width, right-aligned (≥ 768).
- City lines: indented one step further.
- "+ Add city": at the right end of the last city line. "+ Add region": at the bottom of the region box.
- At 360: a small indent per level with a left rule. Every select stays ≥ 280 px wide (W6b-1 R2).
- Test PW-99: at 1280, the region box is narrower than the country box and right-aligned; at 360, every select is ≥ 280 px.

PART K — THE "ITEM / SERVICE LOCATION" BOX
- One explanation line (new keys): "Optional — where the item or service actually is, not where the ad is shown. A pin helps buyers find it." / AM "አማራጭ — ዕቃው ወይም አገልግሎቱ በትክክል ያለበት ቦታ፣ ማስታወቂያው የሚታይበት አይደለም። ምልክቱ ገዢዎች እንዲያገኙት ይረዳል።".
- The map in EVERY category (operator decision). Remove the map_pin gate (wizard.tsx:213, step-where.tsx:1143). The capability stays in the schema, unused here.
- Label the existing precision choice (map-pin-dropper.tsx:447) "Show on my ad as: Exact spot / Approximate area" (new keys).
- After Save, the box shows the small map as buyers see it (map-preview.tsx), with Change and Remove.
- Test PW-100: in a scratch category WITHOUT map_pin, the map is offered, the line and the choice show, and after Save the preview shows the pin.

PART L — SAVE THE ZOOM (same migration as D)
- New nullable listings.pin_zoom (smallint 3–20; NULL when there is no pin), with a CHECK in the style of listings_pin_precision_check (20260919054044:59–60).
- set_listing_pin gains p_zoom. This is a signature change: drop the old signature in the same migration, re-issue the grants, and update every caller.
- The buyer map and a reopened dropper open at the saved zoom for an exact pin. An approximate pin keeps its fixed 13, for privacy.
- Test PW-101: DB truth for pin_zoom; a reopen opens at it.

PART M — OTHER FOOD IS NOT FLAGGED CATCH-ALL
- The export shows other-food with is_catchall false and display_order 11; every other "Other" leaf has true and 1000999.
- Correct it the way the others were set, in the migration. This is a data correction to a real row, with a read-back; it is not a test fixture.
- Report what the flag changes (sorting, glyph, admin filters).

MIGRATION LAW (the one file): in-file closers; proofs in a block with scratch rows only, removed there (INC-340); a mark later than the file's UTC stamp; report "apply <uuid-fragment> → expect mark <value>".

TESTS: each red before its fix, pasted. Scratch rows only (G27); no page positions (G28); stopPageBeforePurge in every afterEach.

SCOPE: W6c's scope, plus src/features/posting/field.tsx and src/styles.css (read-only, for tokens). No other files.

ANTI-PATTERNS: W6c's list, plus no new map library, and no colour hard-coded where a token exists.

COMPLETION REPORT: W6c's, plus the Part I DOM evidence and the Part M effects.
- DEC-023: every post-wizard-* spec plus posting-routes and a11y, both projects, locally, green. Report only on green. If a known flaky test fails, re-run the whole set once and report both runs.
```
---

When W6c lands, I'll verify it and send you a short walk. The queue after it is the flaky-test turn (CI-T2), then the DEC-091 Services page you just approved, then W6b-3.
