Source: supervisor thread, turn 953, Tue 2026-09-29 15:19 New York.
Status at 2026-10-05: built after the turn 957 rulings (migration a3a572bf, mark 20260929235900, applied on prod; CI red run 36626287215 on 0e4adb2 because the proofs read real rows — INC-340 — and v_lands was declared twice — INC-341), corrected by W6-R (turn 959; 13cb1b22, mark 20260930001000; run re-run passed, main promoted); the place step was later reshaped by W6b-1, W6b-2, Part P and bundle 2 steps 7 to 12; the repo holds the built behaviour in docs/features/posting.md and listings.md, not this prompt.
Related: W6, W6-R, INC-337, INC-338, DEC-064 amendment, D19, D71, G27, G28, G22, PR-17, PW-80 to PW-82, multipleMarkets retired.

**W5 is clean.** CI passed on dev `d25b5d7` (run 36585975894), and main was promoted to it.

- **Big model lists (A):** a list over 200 options now loads once another answer is given on the page, so the Model asterisk shows before Next. PW-78 uses 205 options; Lovable ran it and it failed before the fix. Only two lists are that big today: phone models (363) and car models (209), and each needs a parent choice first, so nothing loads needlessly.
- **Lost taps (B):** pressing Next or Back no longer moves focus away from the field first, so the error message can't shift the button before the click lands. This applies to every step. PW-79 failed on desktop before the fix.
- **"Listing not found" (C):** Lovable's local run didn't reach the target, but CI did. This run logged 4 lines, 2 of them from PR-15 on purpose, against a target of 5 or fewer. I'll close INC-323 after 3 runs in a row at 5 or fewer; this is the first.
- **Accessibility (D):** a serious or critical finding now fails CI. This run had zero.
- **Scope and security:** every change is in scope, there are no new files, and no secrets in the diff. Push to report took 14 minutes.

**Recorded (decided):**
- **Load timing:** Part A loads a big list when *any* answer is given, not only when its parent is. That's because the page's field list doesn't say which question is a list's parent. I've accepted it as a logged deviation. W4b adds the parent link to the page data, plus loading only the chosen series' models: the phone list is about 169 KB raw, most of it other brands' models.
- **New flaky test:** the Amharic check on the marketplace menu flaked for the third time in 7 days. It's now INC-339.
- **Report label:** the CI report's accessibility heading still says "non-gating". Both go to the CI turn after W6.
- **One-market rule in W6:** the server still refuses any listing that spans two countries (`multipleMarkets`), whatever the plan allows. Your approved W6 has "Add a country", so W6 lets the plan's country limit decide instead. On today's free plan (1 country) nothing changes.

**Your steps:**
1. Paste W6 (below) into Lovable and send it. Nothing is needed in any other system first.
2. When you have the three catalogue exports, attach them here too. I use them to regenerate the worklist and to check the curator's Batch 1 files.

---
```
W6 — place step: a city is required, every place is a city, nested layout, plan limits from the plan (INC-337, INC-338, DEC-064 amendment) · Tier B + migration · 2026-09-29

BASE: dev d25b5d7 (run 36585975894 green).

OPERATOR RULINGS (approved 2026-09-29; restates the 2026-09-19 ruling that was never enforced):
R1 The item's location must be a city; a sub-city is optional. Until a city is chosen, the place heading carries the required mark and the place box the light red border (the category step's D71 pattern, step-category.tsx data-empty). Next without a city scrolls to the place and says "Choose a city."
R2 Every place the listing is shown in is also a city (or a sub-city). A region or a country alone never counts; adding one is only the way to reach a city in it.
R3 The prefill stays (preferred place → last listing → IP guess). A prefilled city counts as chosen.
R4 Nested layout, as in apex:
   - A country box contains region boxes; a region box contains its city rows (each with its optional sub-city).
   - "Add a city" sits inside the region box, so the city joins that region.
   - "Add a region" sits inside the country box, below its regions; the new region needs a city.
   - "Add a country" sits below the country box; the new country needs a region and a city.
   - A box without a city keeps the red border until it has one.
   - The first city is labelled "Item's location"; the others "Also shown in".
   - Removing the last city of a region removes its box.
R5 The plan decides which add buttons appear: a button shows only while the plan leaves room at its level. Plan limits are unchanged (free = 1 city / 1 region / 1 country today, so no add button shows on the free plan).

SCOPE — you may touch only:
- src/features/posting/step-where.tsx, field.tsx, wizard.tsx, posting-service.ts, refusal-text.ts
- src/i18n/locales/en.ts and am.ts (new keys only)
- one new migration re-declaring public.validate_listing_draft
- e2e/post-wizard-place.spec.ts or a NEW e2e/post-wizard-where.spec.ts (your choice; post-wizard-place stays ≤ 25 tests per project), e2e/posting-routes.spec.ts, e2e/helpers/posting.ts
- a component test for the place step (the "Component tests" job)
- docs/features/posting.md, docs/features/listings.md, docs/_changelog.md
Everything else is out of scope.

PRE-EDIT CENSUS (in your report, line-cited):
1. step-where.tsx: the cascade, the automatic default place (defaultId :288 and its effect), D19 "All of <city>", "add under", the second cascade, remove/put back, the plan caption, the map-pin centre, and the single-option auto-select.
2. PLAN_CITIES = 1 at step-where.tsx:78 is a constant, while the schema already carries the plan: maxCities, maxRegions and maxCountries at posting-service.ts:455–469 (step-photos already uses maxPhotos from it). This is INC-338.
3. The door's step 6: migration 1dc182d8, lines 278–316. It has no level check, and it has a `multipleMarkets` refusal (:300) that fires for 2+ countries whatever the plan allows. DEC-064 retired the one-country trigger for plan counting (20260917112956:252–255).
4. Every other path that writes listing_locations or publishes a listing (submit, renew, edit), and whether each goes through validate_listing_draft's step 6.
5. Every existing test that relies on a region-level or country-level place.

PART A — THE DOOR (INC-337 and the DEC-064 amendment)
1. New migration: re-declare validate_listing_draft WHOLE from its live base 1dc182d8. Read back its md5 before writing (INC-183). Change only step 6:
   a. Every coverage id must be at level city or sub_city. Otherwise refuse {field:'coverage', reason:'cityRequired', detail:<id>}.
   b. Retire the `multipleMarkets` refusal. Countries are counted against the plan's max_countries by the existing coverageExceedsPlan:country check.
   Nothing else changes.
2. In-file proofs, in a rolled-back block (the D86 pattern). Scratch rows only; real places are read, never written.
   - P22: region-only coverage → cityRequired.
   - P23: a country anchor → cityRequired.
   - P24: a city → accepted.
   - P25: a sub-city → accepted.
   - P26: two cities in two countries under the free plan → coverageExceedsPlan:country, and no multipleMarkets.
3. In-file closers: the REVOKE/GRANT lines exactly as 1dc182d8:345–347, then an ACL read-back plus a body read-back (the body contains 'cityRequired' and no longer contains 'multipleMarkets').
4. Mark: declare a mark later than the file's own UTC stamp (S66). Report it as "apply <uuid-fragment> → expect mark <value>".
5. Live read-back, on staging after apply: the body and ACL read-back, plus a read-only count of listings in any status whose listing_locations include a region or country node. Report the number; change no rows.
6. If census item 4 finds a path that writes places without step 6, stop and report it before changing it.

PART B — THE PLACE STEP (R1–R5)
1. Build the nested layout (R4). Keep every behaviour listed in census item 1 unless a rule above replaces it; name any you had to change.
2. The required mark and soft border (R1): shown while there is no city, cleared the moment a city is chosen (also after Back and on a prefilled city).
   - The cityRequired refusal reaches the place through the D70/D2 scroll: the whole box, label included, lands below the header.
3. Read the plan limits from the schema (INC-338) and delete PLAN_CITIES. The captions and counts use the plan's numbers.
   - G29 census: list every other client constant in src/features/posting that mirrors an admin-editable setting (photo caps, expiry, periods, coverage). Fix each one within scope, or list it with its line if it is out of scope.
4. The multipleMarkets comment at step-where.tsx:402 and its refusal text go with the rule. New strings get NEW keys (the new-key law) in EN and AM:
   - "Choose a city." / "ከተማ ይምረጡ።"
   - "Item's location" / "የዕቃው ቦታ"
   - "Also shown in" / "እንዲሁም የሚታይበት"
   - "Add a city" / "ከተማ ጨምር"
   - "Add a region" / "ክልል ጨምር"
   - "Add a country" / "አገር ጨምር"
   Reuse the existing level keys for level names.

PART C — TESTS (each red before its fix, pasted)
- PR-17 (posting-routes): the draft route refuses region-only coverage with cityRequired and accepts a city and a sub-city.
- PW-80: at 360 and 1280.
  - Choose only the country, then only a region: the mark and soft border show before Next.
  - Next refuses with "Choose a city." and scrolls to the place, label below the header.
  - Choosing a city clears both, and Next passes.
  - DB truth: every listing_locations row of the draft is at city or sub_city level.
- PW-81: a seller with a previous listing in a city (scratch) posts again. The city is prefilled, carries no mark, and Next passes without touching the step.
- PW-82: the add buttons follow the plan. Read the free plan's limits from the DB, never mutate the plan row (G27), and assert the buttons against those values (none on 1/1/1).
- Component test: the nested layout with a plan of 3 cities / 2 regions / 2 countries.
  - "Add a city" adds inside the region box; "Add a region" inside the country box; "Add a country" outside it.
  - A box without a city has the red border.
  - Removing a region's last city removes its box.
- Every existing test that relied on a region-level or country-level place (census item 5): update it and give the reason, as W4 did for PW-25.

ANTI-PATTERNS
- No real row is written (G27); in particular, never touch the 'free' plan row.
- No page-position assertion on a shared roster (G28).
- No constant limit left in the client.
- Do not remove D19 "All of <city>" or the automatic default place.
- No reporter or CI workflow change (G22).
- Every new or edited afterEach uses stopPageBeforePurge (e2e/helpers/posting.ts).

COMPLETION REPORT
- The census (items 1–5), each red before its fix, the proofs' output, and the live read-backs.
- The apply line: "apply <uuid-fragment> → expect mark <value>".
- DEC-023: every post-wizard-* spec plus posting-routes and a11y (and post-wizard-where if you create it), both projects, locally, green. Report only on green.
- Typecheck, lint (0 errors), unit and component tests, and the whole-tree format check last.
- Every file changed, git ls-files proof for every new file, and confirmation that nothing outside scope was touched.
- Docs:
  - listings.md step 6 row: "every id an active CITY or SUB-CITY of an open market; countries counted against the plan's max_countries (multipleMarkets retired 2026-09-29)".
  - posting.md and _changelog.md: W6 entries.
```
---
