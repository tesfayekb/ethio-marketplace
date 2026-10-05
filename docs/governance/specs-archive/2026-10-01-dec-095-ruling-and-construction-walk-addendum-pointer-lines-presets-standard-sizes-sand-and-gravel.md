Source: supervisor thread, turn 1043, Thu 2026-10-01 11:14 New York.
Status at 2026-10-05: ruled 2026-10-01 after the Construction walk; carried out by the curator's walk-fix batch of 2026-10-01 (57 pointer lines rewritten as full-path sentences; 35 link defaults and 42 option prefills cleared; Engine Power / Motor Power and Sheet Length as choices; aggregate_type for sand, gravel and stone); the tap-to-go link (T4) was built in bundle 4 Part G step 29; not in the repo.
Related: DEC-095, T4, R9 presets, standard sizes, aggregate_type, C27 Construction batch, walk-fix batch.

The Construction import applied all 87 changes and the walk passed. The "origin — 3 rows not applied" note is harmless: it only means the importer ignored the read-only origin column. The three new Delivery rows were still added, which is why Delivery now comes last.

**Your comments, and what I decided:**
- **Help lines that send sellers elsewhere are too terse.** "Tractors: Farm Equipment & Machinery." doesn't tell a seller what to do, and you can only post in the last level, which is why searching «ኤሌክትሮኒክስ» lists Electronics' subcategories rather than Electronics itself. Decided (DEC-095), in two steps:
  - **Now:** the curator rewrites each line as a plain instruction with the full path, for example "Tractors go under Agriculture & Farming › Farm Equipment & Machinery." These lines may run longer than the usual 60-character limit.
  - **Later:** Lovable turns the path into a tap-to-go link that opens that category directly. It will show the category names in the seller's language, so they stay right if a category is renamed. This goes to Lovable with my next message, since it's mid-queue now.
- **Drill preset to "Corded":** that's only right if corded drills are clearly the common ones. The curator will check every power tool's preset and remove any it can't back with evidence.
- **Rated power, roofing sheet length, and sand and gravel:** you're right that sellers should pick from standard choices rather than type numbers. The curator will research the standard values the market uses, plus how sand and gravel are actually sold (by the truck, by the cubic metre and so on). It will also check every other number question in the catalogue the same way.

1. Send the curator this:

---
```
Construction walk (operator, 2026-10-01): pass, with these to fix — add them to Home & Garden or the batch after.

1. Pointer lines (DEC-095), all 57 rewrites plus any new ones: the operator found "X: Root › Leaf." unclear. Rewrite each as a plain instruction naming the FULL path, every level, in EN and AM — e.g. "Tractors go under Agriculture & Farming › Farm Equipment & Machinery." / «ትራክተር በግብርና እና እርሻ › የእርሻ መሳሪያዎች ሥር ይለጠፋል።» — and "Smartwatches go under Electronics › Phones & Tablets › Smartwatches & Wearables." A pointer line is exempt from the 60-character rule; keep one destination per line and the rest behind the (i). Later these become tap-to-go links through a {category:<slug>} token (engine work is queued; I'll tell you when it lands, and the conversion will be mechanical).
2. Presets on power tools: the drill comes preset to Corded. Census every Tool Power Source preset (and similar presets across the catalogue). Keep one only where a source shows that variant clearly dominates the market (R9); otherwise remove it.
3. Standard sizes as choices — the operator asked for Rated Power (Site Machinery) and roofing sheet Length to be choices, not typed numbers. Research the standard values the market uses (power ratings per machine type; sheet lengths), offer them as a list with Other / cut-to-order, and census every other number question in the catalogue where the market sells standard sizes.
4. Sand and gravel: research the kinds actually traded (sand by source, gravel by size) and how they are sold (per truck/Sino, per m³, per quintal), and align the options and the unit scope.

The 24 write-in unlinks and Home & Garden proceed as in my last message.
```
---

2. **Lovable:** nothing to send yet. Its report on the nightly fix and N2 should be next. I'll add the tap-to-go link to its queue then.

Send me the curator's next files or Lovable's report, whichever comes first.
