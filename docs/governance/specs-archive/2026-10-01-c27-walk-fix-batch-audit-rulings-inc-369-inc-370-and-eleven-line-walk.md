Source: supervisor thread, turn 1055, Thu 2026-10-01 12:35 New York.
Status at 2026-10-05: the walk-fix batch (A + B, then C) was imported by the operator 2026-10-01 (result not pasted in the thread; the next curator message of turn 1063 treats it as live); INC-369 and INC-370 were built in bundle 1 Part O; the AI screening scope and the write-ins report were recorded for the REQ-021 screening build and the admin review console (not built); not in the repo.
Related: C27 walk-fix batch, DEC-095 pointer lines, preset census, standard sizes (R1), sand and gravel, INC-369, INC-370, REQ-021.

**Audit: the walk-fix batch passes.** I applied A → B → C to the Home & Garden state and checked the result. Nothing for Lovable needs sending right now: it's still working through its queue, and its latest push (N2) is being tested. 6a33e31b is green and has been promoted to main.

**What I checked**
- **Counts** match the curator's note: A is added 3 · changed 66; B is added 3 · changed 38 · unlinked 2 · unchanged 1,402, with nothing else dropped; C is changed 2. The final catalogue is 539 definitions and 1,443 links.
- **The 38 changed links:** 35 only clear a default, which matches the preset census row for row. The other 3 are Power Source and Colour moving one place and Type or Size now showing for Stone.
- **No answer is removed** from any question.
- **Problem check across all 167 categories:** the merged state has exactly the same problem list as before (the same 6,743 entries). None are new and none have gone away. This covers conditions, allowed lists, prefills, unit scopes and order clashes.
- **Pointer lines:** all 57 are the first line of their help. Every path matches the real category names, in English and Amharic. Every help is under 240 characters.
- **The 109 Amharic rows** match the merged strings exactly.
- **The walk below** was checked against the merged data and the form code. That includes the rule that a choice of "2 m · Other" is offered, not auto-filled.

**Rulings**
- **R1, the five number questions:**
  - **Pumps:** yes. They reuse the new Motor Power question, limited to 0.37–5.5 kW for pumps.
  - **Batteries:** yes. Ah for lead-acid and gel, kWh for lithium; the battery type decides which list shows.
  - **Washing machines:** yes, in kg.
  - **Water tanks and water heaters:** yes.
  - **Boards, gypsum, gutters and eucalyptus poles:** yes.
  - **Sawn timber:** only if a second source turns up; otherwise it stays a number.
  - **Rebar:** 12 m becomes a choice, but it is not filled in in advance. US rebar comes in feet, so a 12 m default is a per-country answer.
- **R2:** yes. The country-dependent defaults (220 V, EU shoe sizes, Wi-Fi tablets, electric cookers, locally made) wait for the {country} mechanism. Your "pound country" point goes into the same queue: each market will eventually get its own units (lb, gallons, cu ft). Not built now.
- **R3:** the curator runs a search pass. A size system comes back as the default only where a source shows it clearly dominates; otherwise it stays blank.

**Your walk comments**
- **Other text required:** this already holds for every single-choice question (308 of them). On Next, the server refuses an empty Other, the field turns red with "Say what it is." and the page scrolls to it. I found two gaps, logged as two new defects, and they go in Lovable's next message:
  - INC-369: the cursor lands on the dropdown, not the text box.
  - INC-370: the 5 multi-choice questions that have Other (compatible makes, connectivity, languages, skin concern, visa country) have no write-in box at all.
  
  Both get an automated test.
- **Optional write-ins stay optional:** confirmed. Brand at Traditional Wear and Bicycles is optional; text is only required once Other is picked.
- **AI screening of every typed field:** this is the screening step already planned for posting, which runs before publishing. I'm putting every write-in, every typed field and every multi-choice Other text explicitly in its scope, together with the phone-number check Lovable already has queued.
- **Using write-ins to grow brand lists:** a write-ins report (each answer, how often it appears) comes with the admin review console. That way only screened text ever gets promoted to a real option.

**Your steps**
1. In Admin › Attributes › Import, import `c27-walk-definitions-A.csv` and `c27-walk-links-B.csv` together.
   - Expect added 6 · changed 104 · unlinked 2 · unchanged 1,402 · refused 0, then apply.
   - If it shows changed 69 · unchanged 1,437 instead, the importer skipped the 35 blank defaults. Apply anyway and tell me; don't edit anything by hand, I'll handle those 35.
2. Then import `c27-walk-definitions-C.csv` on its own. Expect changed 2 · refused 0, then apply. It has to come after step 1.
3. In Admin › Translations, approve the 109 pending Amharic rows.
4. Walk the posting form on the live site. No Publish is needed, because this is catalogue data only.
   1. **Construction Material › Power & Hand Tools,** Tool Type = Drill: Tool Power Source is blank. Choose Corded: Voltage appears, blank.
   2. **Construction Material › Site Machinery & Scaffolding,** Equipment Type = Concrete Mixer, Power Source = Diesel: Engine Power offers 6 · 6.5 · 7 · 9 · 10 HP · Other. Switch Power Source to Electric:
      - Engine Power disappears.
      - Motor Power offers 1.5 kW (2 HP) · 4 kW (5.5 HP) · 5.5 kW (7.5 HP) · 11 kW (15 HP) · Other.
      - Voltage appears, blank.
   3. **Same category,** Equipment Type = Plate Compactor, Power Source = Petrol: Engine Power offers 3.5 · 5.5 · 6.5 · 9 HP · Other.
   4. **Same category,** Equipment Type = Scaffolding: no Power Source, Engine Power or Motor Power question.
   5. **Construction Material › Roofing,** Material Type = Corrugated Iron Sheet: Unit of Sale shows Per Sheet, and Sheet Length offers 2 m · Other with nothing selected.
   6. **Roofing,** Material Type = Colour-Coated Sheet: Unit of Sale shows Per Metre and Sheet Length shows Cut to length; both can be changed. Colour comes after Sheet Length.
   7. **Construction Material › Cement, Aggregates & Blocks,** one Material Type at a time:
      - **Sand:** Type or Size offers River Sand · Red Ash (Scoria) · Pit Sand · Crushed Sand · Silica Sand · Other, and Unit shows Per m³.
      - **Gravel / Aggregate:** Gravel 00 (Fino) · Gravel 01 (up to 10 mm) · Gravel 02 (up to 20 mm) · Gravel 03 · Select Material (Gerengati) · Base Course / Sub-base · Other.
      - **Stone:** Black Stone (Basalt) · White Masonry Stone (Dressed) · Hardcore · Other, and Unit shows Per m³.
      - **Red Soil:** no Type or Size question; Unit shows Per m³, and Per Truckload is in the list.
      - **Cement:** Cement Grade is blank.
   8. **Category search** on the first posting step: «ገረጋንቲ», then «ሬዳሽ». Each finds Cement, Aggregates & Blocks.
   9. **Help lines:**
      - Vehicles › Heavy Machinery, under Machinery Type: "Tractors go under Agriculture & Farming › Farm Equipment & Machinery."
      - Clothing & Shoes › Jewelry & Watches, under Jewelry Type: "Smartwatches go under Electronics › Phones & Tablets › Smartwatches & Wearables."
      - In Amharic, Heavy Machinery reads «ትራክተር በግብርና እና እርሻ › የእርሻ መሳሪያዎች ሥር ይለጠፋል።»
   10. **Defaults removed:**
       - Clothing & Shoes › Shoes & Footwear, Shoe Type = Sneakers: Shoe Size System is blank.
       - Real Estate › Apartments: Furnished is blank.
       - Home & Garden › Home Appliances, Appliance Type = Stove / Cooker: Power Source is blank.
       - Vehicles › Motorcycles & Three-Wheelers, Make = Honda, Model = Other: Fuel Type is blank. Then switch Model to CG125: Fuel Type fills Gasoline. That one is the model's own fact, so it is expected.
   11. **Defaults kept:**
       - Vehicles › Heavy Machinery: Fuel Type shows Diesel.
       - Clothing & Shoes › Men's Clothing, Type = T-Shirts: Size System shows International (XS–XL).
5. Tell me the walk result. I'll then give you one curator message covering the next batch: the R1 builds, the R3 search pass, the remaining research items, a few small text fixes, then Beauty.

When Lovable reports, bring its report here and I'll verify it.
