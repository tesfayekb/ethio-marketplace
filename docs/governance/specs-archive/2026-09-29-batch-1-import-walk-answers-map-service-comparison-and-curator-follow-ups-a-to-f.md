Source: supervisor thread, turn 971, Tue 2026-09-29 18:17 New York.
Status at 2026-10-05: answered 2026-09-29 18:17; the map-service table was superseded by the re-analysis of turn 979 (Esri chosen); the curator follow-ups a to f were researched and built into batch b1f (imported 2026-09-30); W7 (search through the catalog finder) was built; the promise to add 'Cloudflare-hosted maps before public launch' to the launch checklist was superseded by the Esri decision; not in the repo.
Related: C27 batch 1, b1f, W7 (D37-2), INC-346, OpenStreetMap, OpenFreeMap, Mapbox, Protomaps, MapTiler, Stadia.

**Batch 1 is imported:** 180 changes, nothing refused. Most of your walk passed. The two things that looked missing are explained below, and your other points go to the curator or into the next builds.

**Your walk:**
- **Passed:** honey, kibe, oil volume up to 20,000 mL, book title / grade / year, sugar hiding brand and halal, and "Other" opening the write-in.
- **Chicken and oil "unit":** not missing. Per piece / per kg is asked first on the **Price** step, per your 2026-09-27 ruling, not on Specifications. Check it there.
- **Shola milk not locked:** the imported data is right (Shola locks milk to cow). The likeliest cause is timing: a browser can keep using the old option list for about 5 minutes after an import, and you walked straight away. Re-check after reloading. If it still shows "Choose", tell me and it becomes an engineering fix.
- **Searching "sugar" or "salt" finds nothing:** you're right. The wizard's search only matches category names. The server search that knows every option, brand and spelling (sugar, salt, Shola…) is already built but not connected to the wizard. I'm making that the next Lovable job after W6b-1, ahead of the map.
- **Catalogue points, sent to the curator in the message below:**
  - Grouping niter kibe with butter, and vegetable ghee with edible oil.
  - Chicken for meat versus live chickens, which belong under Agriculture.
  - Whether oil needs a container question (bottle, jerrycan).
  - Books asking genre before title.
  - A clearer name than "Pantry & Packaged".

**Map service — the best for speed and budget as we grow:**

| Option | Cost | Speed | Catch |
|---|---|---|---|
| OpenStreetMap (what we use now) | Free | Fine | Run by volunteers: no guarantee, and heavy use gets blocked. Fine for testing, not for scale. |
| OpenFreeMap | Free, business use allowed, no key or limits | Fine | Donation-funded, two servers, no CDN or guarantee. Needs a heavier map library. |
| Mapbox (apex) | 200,000 map-image requests free a month, then $0.50 per 1,000 | Good | Cost grows with use; needs an account and key. |
| MapTiler / Stadia | Free plans don't allow business use; paid from $30 / $20 a month | Good | — |
| **Map data hosted on your own Cloudflare account** (Protomaps) | Roughly **$5–12 a month even at large scale**. Protomaps' own example: 625,000 map views a month ≈ $11.45. | **Fastest**: served from Cloudflare's servers near the user, same account as ethio.com | One-time setup, a heavier map library loaded only when the map opens, and a map-data refresh a few times a year. |

**My recommendation:**
- **Now:** stay on free OpenStreetMap, with no account needed. W6b-2 first measures and fixes our own slowness, and makes the map source a single setting so switching later is contained.
- **Before public launch:** move to map data hosted on your Cloudflare account. I'll add that to the launch checklist. It's the cheapest and fastest at scale, with no per-view bill and no key to leak.
- **Skip Mapbox** unless OpenStreetMap misbehaves before then.

**What keeps it light and cheap whichever service we use:**
- **Map only on request:** it loads only when a seller opens it, only in map categories. That's already true.
- **No live map for buyers by default:** a listing shows a small map picture made once when it's published, or a "Show map" tap. Buyers are most of the traffic, so this avoids most of the cost.
- **Outlines from our own server:** city outlines and centres come from our server's cache, like our address search today, never a lookup per view.
- **Small maps:** a small map box, street view by default, lighter images on slow connections, and nothing loaded in advance.
- **Usage alerts** on any paid service.

**Your steps:**
1. If you haven't sent W6b-1 to Lovable yet, send it (it's in my previous message).
2. Reload the published site and re-check Shola milk. Tell me if it's still not locked.
3. In Translations, approve the Batch 1 Amharic labels (`c27-b1-inc296-amharic-2026-09-29.csv`).
4. Export categories, attribute definitions and links. Send them to the curator with the message below, and attach them here too.
5. Reply **"agree"** to the map plan, or **"Mapbox"** if you'd rather go that way now.

---
```
C27 — Batch 1 imported; walk follow-ups; Batch 2 step 2 · 2026-09-29

Batch 1: imported with 180 changes and 0 refused (definitions and links together: added 41, changed 137, unlinked 2). The fresh post-Batch-1 exports are attached.

1. Batch 2 step-2 files: build them on these exports, with the expected previews and the INC-296 list, as for Batch 1. The §9.1 audit now includes the gate's alias rules.

2. Batch 1 walk follow-ups. Research each point, then propose in a short note (no files until approved):
   a. Butter grouping. The operator notes that niter kibbeh is a kind of butter (spiced, clarified). Should the list read Butter → plain (kibe) / spiced (niter kibbeh), or stay flat with clearer labels?
   b. Oil grouping. The operator notes that vegetable ghee and edible oil feel like one class. Same question.
   c. Chicken. The Meat leaf is for chicken as meat; live chickens belong under Agriculture. Make the label and help say so ("Chicken (dressed)"), and propose whether live poultry should show here as a guest.
   d. Edible oil containers. The operator asked about a container question (bottle, jerrycan, tin). Unit per piece and volume are already asked. Say whether a container field adds anything buyers use, with evidence.
   e. Books order. The operator wants genre first, then title (class E amendment for Books). Check how book marketplaces order the two, then propose.
   f. "Pantry & Packaged" name. It is not found when a seller looks for sugar, salt or oil. Propose a clearer EN and AM name (for example the everyday grocery word), plus aliases. The wizard's search will soon also match option names and aliases, so list the aliases each product needs.
   Note for (f): the Shola milk lock is correct in the data. The walk probably saw a list cached from before the import; engineering is checking it.

3. Electronics (later batch): as already noted (phone colours, storage by model).
```
---

Sources:
- [Mapbox pricing](https://www.mapbox.com/pricing)
- [OpenStreetMap tile usage policy](https://operations.osmfoundation.org/policies/tiles/)
- [OpenFreeMap overview (Simon Willison)](https://simonwillison.net/2024/Sep/28/openfreemap/)
- [Protomaps cost calculator](https://docs.protomaps.com/deploy/cost)
- [MapTiler Cloud pricing](https://www.maptiler.com/cloud/pricing/)
- [Stadia Maps pricing](https://stadiamaps.com/pricing/)
