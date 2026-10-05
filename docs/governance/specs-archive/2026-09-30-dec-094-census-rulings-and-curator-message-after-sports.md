Source: supervisor thread, turn 1035, Wed 2026-09-30 23:22 New York.
Status at 2026-10-05: rulings made 2026-09-30/10-01 on the curator's DEC-094 market-wording census: six neutral rewrites done in the Construction batch; product_origin kept and origin-food merged; Ethiopia-only systems wait for a second country; token rows wait for the {country} engine (built in bundle 4 Part G, 2026-10-05; the curator's conversion not yet commissioned); the search-filter note ('no answer' counts as a sale) recorded for the browse build; not in the repo.
Related: DEC-094, c27-dec094-market-wording-census-2026-09-30.csv, C27 Sports batch, Construction batch, Class B (second market), bundle 4 Part G.

The Sports batch passes my audit and matches the curator's expected preview, so you can import it.

**What I checked:**
- **Sale or Rent and Hire:** every new show/hide rule names real answers. Shirts, Tops, Netela and Inverters no longer get the question; Suits, Dresses & Gowns, Habesha Kemis and Diesel generators still do.
- **Musical Instruments:** "Made in" is removed. The hidden "Ethiopian-made" setting on the five traditional instruments went with it, so nothing points at a missing question.
- **Help texts:** all 19 changed helps have a short first sentence.

**Decided on the DEC-094 census, nothing for you to do:**
- **Rewrites that don't need the country placeholder:** voltage, shoe sizes, kibe origin, net weight, "Yemen" and "Workshop-made". The curator does these now, in the next batch.
- **"Made in" merge:** `product_origin` is the one that stays, and `origin-food` merges into it.
- **Ethiopia-only systems** (plate codes, title types, condominium schemes, "libre"): these wait until a second country opens, when we'll need a way to show a question only in certain countries. Recorded.
- **Note for the future search filters:** where Sale or Rent is hidden, nothing is stored, so a "For Sale" filter must count "no answer" as a sale. Recorded for that build.

**Your steps, in order:**

1. In Admin › Attributes › Import, import `c27-sports-definitions.csv` and `c27-sports-links.csv` together. Expect **added 0 · changed 29 · unlinked 2 · unchanged 1,456 · refused 0**, then apply.
2. In Admin › Translations, approve any pending Sports rows.
3. Walk the posting form on the live site:
   - **Men's Clothing:** Type = Shirts has no Sale or Rent. Type = Suits shows it, preset to For Sale.
   - **Women's Clothing:** the type list reads "Dresses & Gowns", which shows Sale or Rent. Tops & Blouses doesn't.
   - **Traditional Wear, Region = Pan-Ethiopian:** Habesha Kemis shows Sale or Rent; Netela doesn't.
   - **Generators & Power:** Diesel Generator shows Offer Type; Inverter doesn't.
   - **Solar & Backup Power:** there's no Offer Type.
   - **Sports Equipment, Type = Football Boots & Sports Shoes:** the sizes, then Condition, then Brand, then Original / Authentic.
   - **Musical Instruments, Type = Krar:** there's no Made in, and Strings shows.
   - **Jewelry & Watches:**
     - Jewelry Type's help line reads "Smartwatches go under Electronics, not here."
     - With Type = Watch, Movement's help line reads "How the watch is driven."
   - **Category search at the start of posting:**
     - «smartwatch» and «apple watch» each offer Smartwatches & Wearables.
     - «digital» lists Jewelry & Watches among the results.
   - **Art & Collectibles, Artwork Type = Collectible:** Collectible Type's help line reads "Old coins and notes out of circulation only."
   - **Amharic, Gyms & Personal Training:** on the price step, Pricing Basis's help line reads «ዋጋዎ የሚሸፍነው።».
4. If the walk passes, export fresh definitions, links and categories files and send them to the curator with this message:

---
```
Sports & Leisure is imported and walked: pass. Here are the post-import exports — deliver Construction on them, then continue in your planned order.

DEC-094 rulings on your census:
1. The neutral rewrites that need no token (voltage, shoe_size_system, kibe_origin, net_weight_g, honey "Yemen", brand-salon "Workshop-made (local)") — do them now, in the Construction batch.
2. Made in: product_origin survives and origin-food merges into it; the local value is local_made, labelled "Made in {country}" / "የ{country} ምርት". This and the other token rows (condition-vehicles, imei_registered) still wait until I tell you {country} has landed.
3. Class B (plate_code, title_status, condo_scheme, "libre"): deferred until a second market opens; no change now.
The 24 write-in unlinks still wait for N1.
```
---

Lovable is still working through its queue. Send me its report when it arrives.
