/**
 * P-1c (D313) — THE GUIDE LAYER: every admin block's Guide texts, `<block>.guide.what`,
 * `.guide.col.<columnKey>`, `.guide.how` and `.guide.next`, read by BlockGuide
 * (src/components/shell/block-guide-sheet.tsx) from the block's key prefix. The layer loads on
 * the first open of a Guide, never with a route (DEC-258's gate, by `layers`); CF-GUIDE-1
 * (scripts/conformance/admin-guides.ts) judges that every admin block has every key here and
 * that no `.guide.` key sits anywhere else.
 */
export const enGuide = {
  "admin.monetisation.markets.guide.what":
    "One row per country, plus a default row for any country without its own. Each row sets what sellers there get for free and whether paid levels are switched on.",
  "admin.monetisation.markets.guide.col.market":
    "The country this row applies to; the default row covers every country without its own.",
  "admin.monetisation.markets.guide.col.freeAds":
    "How many Regular ads a seller in this market may have live at no cost.",
  "admin.monetisation.markets.guide.col.includedReach":
    "The reach every ad in this market gets without paying.",
  "admin.monetisation.markets.guide.col.paidLevels":
    "Whether sellers here can buy a higher level; off means every level is set at no cost.",
  "admin.monetisation.markets.guide.col.launch":
    "The credits and the days of the free bundle every seller receives when paid levels are switched on.",
  "admin.monetisation.markets.guide.col.since":
    "The day paid levels were switched on here; blank while they are off.",
  "admin.monetisation.markets.guide.col.createdBy": "Who added this row.",
  "admin.monetisation.markets.guide.col.updatedBy": "Who last changed this row.",
  "admin.monetisation.markets.guide.col.updated": "When this row last changed.",
  "admin.monetisation.markets.guide.how":
    "Add market opens a row for a country that has none; the default row cannot be removed. Edit changes a row; switching paid levels on needs a launch bundle (credits and days). A row is never deleted — switch paid levels off instead.",
  "admin.monetisation.markets.guide.next": "Check the levels sellers can buy and their perks.",
  "admin.monetisation.level.guide.what":
    "The levels an ad can have — Regular, Featured, Premium and any you add. A level sets how long an ad runs, how many photos it may carry, where it is placed and whether it wears a badge. Open a level to set its per-category perks and its prices.",
  "admin.monetisation.level.guide.col.name": "The name sellers see, in each language.",
  "admin.monetisation.level.guide.col.key":
    "The level's fixed identity in the system; it never changes once saved.",
  "admin.monetisation.level.guide.col.days": "How many days the level runs by default.",
  "admin.monetisation.level.guide.col.photos": "How many photos an ad at this level may carry.",
  "admin.monetisation.level.guide.col.placement":
    "Where ads at this level appear: standard, boosted or at the top.",
  "admin.monetisation.level.guide.col.badge": "Whether ads at this level wear a badge.",
  "admin.monetisation.level.guide.col.enabled":
    "Whether sellers can still get this level; off hides it everywhere.",
  "admin.monetisation.level.guide.col.selfServe":
    "Whether a seller can buy this level alone, without staff.",
  "admin.monetisation.level.guide.col.extends":
    "Whether buying this level also extends the ad's lifetime.",
  "admin.monetisation.level.guide.col.sort": "The level's place in the order sellers see.",
  "admin.monetisation.level.guide.col.createdBy": "Who added this level.",
  "admin.monetisation.level.guide.col.updatedBy": "Who last changed this level.",
  "admin.monetisation.level.guide.col.updated": "When this level last changed.",
  "admin.monetisation.level.guide.how":
    "Add level creates a level with its key, names and perks. Edit changes everything but the key. A level is switched off, never removed, so ads that have it keep their history. Open a row to add per-category perks and prices for this level.",
  "admin.monetisation.level.guide.next": "Set the reach products — where an ad is seen.",
  "admin.monetisation.reach.guide.what":
    "The reach products — how far an ad is seen: its city, the whole country or worldwide. A reach only has a duration; its perks come from the ad's level. Open a reach to set its prices.",
  "admin.monetisation.reach.guide.col.name": "The name sellers see, in each language.",
  "admin.monetisation.reach.guide.col.key":
    "The reach's fixed identity in the system; it never changes once saved.",
  "admin.monetisation.reach.guide.col.days": "How many days the reach runs.",
  "admin.monetisation.reach.guide.col.enabled":
    "Whether sellers can still get this reach; off hides it everywhere.",
  "admin.monetisation.reach.guide.col.selfServe":
    "Whether a seller can buy this reach alone, without staff.",
  "admin.monetisation.reach.guide.col.extends":
    "Whether buying this reach also extends the ad's lifetime.",
  "admin.monetisation.reach.guide.col.sort": "The reach's place in the order sellers see.",
  "admin.monetisation.reach.guide.col.createdBy": "Who added this reach.",
  "admin.monetisation.reach.guide.col.updatedBy": "Who last changed this reach.",
  "admin.monetisation.reach.guide.col.updated": "When this reach last changed.",
  "admin.monetisation.reach.guide.col.photos": "A reach has no photo limit; the level sets it.",
  "admin.monetisation.reach.guide.col.placement": "A reach has no placement; the level sets it.",
  "admin.monetisation.reach.guide.col.badge": "A reach has no badge; the level sets it.",
  "admin.monetisation.reach.guide.how":
    "Add reach creates a reach with its key, names and days; perks are refused on a reach. Edit changes everything but the key. A reach is switched off, never removed. Open a row to add its prices.",
  "admin.monetisation.reach.guide.next":
    "Give every product a price in each market where paid levels are on.",
  "admin.monetisation.levelOverrides.guide.what":
    "This level's perks for one main category, one country, or both. A blank cell keeps the level's own value. A subcategory follows its main category's row.",
  "admin.monetisation.levelOverrides.guide.col.category":
    "The main category this row applies to, or every category.",
  "admin.monetisation.levelOverrides.guide.col.country":
    "The country this row applies to, or every country.",
  "admin.monetisation.levelOverrides.guide.col.days":
    "How many days the level runs here; blank keeps the level's default.",
  "admin.monetisation.levelOverrides.guide.col.photos":
    "How many photos an ad may carry here; blank keeps the level's default.",
  "admin.monetisation.levelOverrides.guide.col.placement":
    "Where ads appear here; blank keeps the level's placement.",
  "admin.monetisation.levelOverrides.guide.col.badge":
    "Whether ads wear the badge here; blank keeps the level's setting.",
  "admin.monetisation.levelOverrides.guide.col.createdBy": "Who added this row.",
  "admin.monetisation.levelOverrides.guide.col.updatedBy": "Who last changed this row.",
  "admin.monetisation.levelOverrides.guide.col.updated": "When this row last changed.",
  "admin.monetisation.levelOverrides.guide.how":
    "Add override picks the category and the country and sets at least one cell. Edit changes the cells. Clear (red) removes the row and ads fall back to the level's own perks. When a category and a country both have rows, the row naming both wins, then the country's, then the category's.",
  "admin.monetisation.levelOverrides.guide.next": "Add this level's prices.",
  "admin.monetisation.productPrices.guide.what":
    "What this product costs, by market and category, for a window of time. Sellers pay in credits; the money amount is kept for checkout later. Without a valid price a seller cannot buy this product in that market.",
  "admin.monetisation.productPrices.guide.col.scope":
    "The market and the category this price covers; Every market and Every category are the fallbacks.",
  "admin.monetisation.productPrices.guide.col.amount": "The money price, or Free at 0.",
  "admin.monetisation.productPrices.guide.col.creditCost":
    "How many credits a seller spends on this product.",
  "admin.monetisation.productPrices.guide.col.from": "The day this price starts.",
  "admin.monetisation.productPrices.guide.col.to":
    "The day this price ends; Open-ended means no end is set.",
  "admin.monetisation.productPrices.guide.col.used":
    "How many times sellers have paid this price; a used price can no longer be edited.",
  "admin.monetisation.productPrices.guide.col.createdBy": "Who added this price.",
  "admin.monetisation.productPrices.guide.col.updatedBy": "Who last changed this price.",
  "admin.monetisation.productPrices.guide.col.updated": "When this price last changed.",
  "admin.monetisation.productPrices.guide.how":
    "Add price picks the market, the category and the window; two prices of one scope never overlap in time. Edit is possible while the price is unused and live. End (red) closes a live price today — the row stays as a record. Nothing here is computed: the most specific valid row is the one a seller pays.",
  "admin.monetisation.productPrices.guide.next": "Check the free plan's posting caps.",
  "admin.monetisation.caps.guide.what":
    "The free plan's limits for every seller until the levels take them over: how many places an ad may cover, how many photos it may carry, how long it runs and how many ads a seller may have live.",
  "admin.monetisation.caps.guide.col.plan": "The plan these limits belong to; today the free plan.",
  "admin.monetisation.caps.guide.col.cities": "How many cities one ad may cover.",
  "admin.monetisation.caps.guide.col.regions": "How many regions one ad may cover.",
  "admin.monetisation.caps.guide.col.countries": "How many countries one ad may cover.",
  "admin.monetisation.caps.guide.col.photos":
    "How many photos an ad may carry; the posting form reads this today.",
  "admin.monetisation.caps.guide.col.days":
    "How many days an ad runs when its category sets no lifetime.",
  "admin.monetisation.caps.guide.col.ads":
    "How many ads a seller may have live at once; Unlimited means no cap.",
  "admin.monetisation.caps.guide.col.everywhere": "Whether an ad may be shown everywhere at once.",
  "admin.monetisation.caps.guide.col.updated": "When these limits last changed.",
  "admin.monetisation.caps.guide.how":
    "Edit caps changes every limit in one dialog; a limit below its minimum is refused. Plans are neither added nor removed here.",
  "admin.monetisation.caps.guide.next":
    "You are done here. Go back to Markets to switch paid levels on for a country.",
} as const;
