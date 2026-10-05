Source: supervisor thread, turn 979, Tue 2026-09-29 21:23 New York.
Status at 2026-10-05: the operator chose Esri (turn 980, "Esri"); built in W6b-2 (6de8494: Esri street and satellite tiles through a server route with automatic OpenStreetMap fallback); the self-hosting threshold (about 1.5 million tiles a month for two months) and the business-use check on Esri's free tier were left as watch items; not in the repo.
Related: W6b-2, DEC-091, ESRI_API_KEY, OpenStreetMap fallback, Mapbox, Protomaps, INC-343.

**Your place-step changes are half built.** W6b-1 made the layout and the tick. The map and pin are W6b-2, which hasn't started because it's waiting on the map choice. Your new red-border rule and the apex-style pin both go into W6b-2.

**Why the page doesn't look changed yet:**
- **Publish first.** W6b-1 is on dev but not yet on the live site.
- **You won't see "Add region / Add city / Add country" on today's free plan.** You asked for these to follow the admin setting, and the free plan is set to 1 city, 1 region and 1 country, so no add buttons appear. To see and use them, raise the free plan in **Admin › Locations › Coverage** (for example 3 cities, 2 regions, 1 country); the numbers are your call. The server already accepts places in several countries when the plan allows it.

**New for W6b-2 (the next Lovable prompt, after W7):**
- **Red border per box:** the country box is red only until a country is chosen, the region box until its region is chosen, and each city box until its city is chosen. Each clears as soon as it's filled.
- **Pin drop like apex:**
  - Opens zoomed on the ticked city, with its outline drawn.
  - Tap to drop a pin, then drag to adjust.
  - Search an address or use "my location"; the street address is shown.
  - A "Save location" button that's always visible, and full-screen on phones.
  - It starts by reproducing your "no way to drop a pin, and it's slow" finding.

**Map options, re-analysed.** My earlier recommendation missed two things: a satellite view (which matters in Ethiopia, where sellers find their place by landmarks rather than street names) and Esri's free tier. With those included:

| Option | Seller experience | Weight on the phone | Security | Cost | Setup |
|---|---|---|---|---|---|
| **Esri (ArcGIS) map images + our current map library** | Streets and **satellite**, reliable worldwide delivery | **Light**: we keep our small map library, and Esri's larger image tiles mean fewer downloads per view | A key restricted to your domains; it's visible in the browser, so watch usage | **2,000,000 tiles a month free**, then $0.15 per 1,000 | A free ArcGIS account and one key |
| Mapbox (what apex uses) | Streets and satellite, good quality | Light (same library) | Same kind of domain-restricted key; Mapbox says the restriction "helps prevent" abuse but doesn't stop it, and its security guide mentions no spending cap | Street map: 200,000 free a month, then $0.50 per 1,000. Satellite: 750,000 free, then $0.25 per 1,000 | Account and key |
| OpenStreetMap (today) | Street map only; our satellite layer uses an older Esri address without a key | Light | No key | Free | None, but it's best-effort only and heavy use gets blocked, so not for a real launch |
| Self-hosted on your Cloudflare (Protomaps) | Street map only, **no satellite**; very fast | **Heavier**: needs a bigger map library (loaded only when the map opens) | No key; we control it | About $5–12 a month even at very large use | The most work: host the map data and refresh it a few times a year |
| OpenFreeMap | Street map only | Heavier (same bigger library) | No key | Free, business use allowed | Run on donations with two servers, no guarantee |

**My recommendation: Esri.** It gives the best seller experience (a satellite view to find the house or shop), keeps the page as light as it is now, has the largest free allowance (about 10 times Mapbox's), and is the cheapest after that. It's also the supported, keyed version of the satellite imagery our map already shows.

Two things keep it cheap and safe:
- **Buyers don't load live maps:** a listing shows a small map picture made once, and city outlines come from our own server's cache. Nearly all map costs come from sellers opening the map to place a pin.
- **A backup, and a limit on setup work:** OpenStreetMap stays as the automatic fallback if the key fails. We'd only consider self-hosting if use ever passed about 1.5 million tiles a month for two months in a row.

My rough estimate is that one map session uses 20–40 tiles, so the free allowance covers about 50,000–100,000 seller map sessions a month.

**Your steps:**
1. **Publish** in Lovable, so W6b-1 shows on the live site.
2. **Optional, your product call:** raise the free plan in Admin › Locations › Coverage if you want sellers to add more cities or regions now, and to see the add buttons.
3. **Reply "Esri"** (my recommendation) or name another option. If Esri: sign up for an **ArcGIS Location Platform** account (free tier) and create an API key restricted to ethio.com and your Lovable domains. Don't paste the key here; Lovable asks for it in its secret dialog during W6b-2. When you sign up, check the terms for business use on the free tier; I couldn't confirm that from the pricing page.
4. Re-check Shola milk after a reload.

W7 (the search and category-mark fixes) is still with Lovable. W6b-2 follows it, with your new border rule and the pin drop.

Sources:
- [ArcGIS Location Platform pricing](https://location.arcgis.com/pricing/)
- [ArcGIS Static Basemap Tiles service](https://developers.arcgis.com/rest/static-basemap-tiles/)
- [Mapbox pricing](https://www.mapbox.com/pricing)
- [How to use Mapbox securely](https://docs.mapbox.com/help/dive-deeper/how-to-use-mapbox-securely/)
- [OpenStreetMap tile usage policy](https://operations.osmfoundation.org/policies/tiles/)
- [Protomaps cost calculator](https://docs.protomaps.com/deploy/cost)
- [OpenFreeMap overview (Simon Willison)](https://simonwillison.net/2024/Sep/28/openfreemap/)
