/**
 * P-1c (D313) — THE GUIDE LAYER: every admin block's Guide texts, `<block>.guide.what`,
 * `.guide.col.<columnKey>`, `.guide.how` and `.guide.next`, read by BlockGuide
 * (src/components/shell/block-guide-sheet.tsx) from the block's key prefix. The layer loads on
 * the first open of a Guide, never with a route (DEC-258's gate, by `layers`); CF-GUIDE-1
 * (scripts/conformance/admin-guides.ts) judges that every admin block has every key here and
 * that no `.guide.` key sits anywhere else.
 * P-1c turn (b) (D315) — and every page's Guide texts (PageGuide, page-guide.tsx):
 * `<page>.guide.what`, `.guide.part.<key>` per part, `.guide.how`, `.guide.next`; the edit
 * wizard's parts are the posting wizard's (`post.guide.part.*`, by partsPrefix).
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
  // P-1c turn (b) (D315) — the pages people use, in reading order of the site.
  "adPage.guide.what":
    "This is one ad. The photos, price, details and place are the seller's own words; ethio.com checks ads but cannot see the item for you.",
  "adPage.guide.part.photos": "Tap a photo to see it large. Swipe for the next one.",
  "adPage.guide.part.title":
    "The name and the asking price. A price marked negotiable can be discussed.",
  "adPage.guide.part.facts": "The main facts, then every detail the seller gave.",
  "adPage.guide.part.description": "What the seller wrote, in their words.",
  "adPage.guide.part.seller":
    "Who posted it and since when. Sign in to see how to reach them; the ad does not show a phone number in the text.",
  "adPage.guide.part.location": "The place the item is in or the service covers.",
  "adPage.guide.part.save": "Save keeps the ad on your Saved page. Share sends its link.",
  "adPage.guide.part.report":
    "If something is wrong — a scam, a wrong category, a sold item — report it; we look at every report.",
  "adPage.guide.how":
    "Meet in a public place. See the item before you pay. Never send money ahead for an item you have not seen, and never pay a deposit to hold it. If the seller pushes you to pay first, report the ad. Never share your bank or card details in a message.",
  "adPage.guide.next": "Have something to sell? Post your own ad",
  "feed.guide.what":
    "Ads near you, newest first. When your place has few, ads from the wider area follow.",
  "feed.guide.part.heading": "The place you are browsing; change it in the menu.",
  "feed.guide.part.favourite": "The star makes this category your start page.",
  "feed.guide.part.sections": "Each band names the area its ads come from.",
  "feed.guide.part.card":
    "The photo, price and place of one ad. A ribbon marks a sold or a highlighted ad.",
  "feed.guide.part.more": "Show more loads the next ads.",
  "feed.guide.how":
    "Open an ad to see it whole. Buy safely: meet in public, see the item first, never pay ahead; report an ad that looks wrong from its own page.",
  "feed.guide.next": "Sell something: post an ad",
  "sellerPage.guide.what": "Every live ad from one seller.",
  "sellerPage.guide.part.seller": "The seller's name and how long they have been a member.",
  "sellerPage.guide.part.ads": "Their ads, newest first.",
  "sellerPage.guide.how":
    "Open an ad to contact the seller from there. Judge each item on its own: meet in public and see it before paying.",
  "sellerPage.guide.next": "Browse all listings",
  "auth.guide.what": "Sign in to save ads, contact sellers and post your own.",
  "auth.guide.part.email": "The address you sign in with; we send confirmations here.",
  "auth.guide.part.password":
    "At least the length shown; a phrase of several words is strong and easy to remember.",
  "auth.guide.part.toggle": "New here? Switch to Create account; it takes a minute.",
  "auth.guide.part.forgot": "Forgot password sends a link to set a new one.",
  "auth.guide.part.google": "Continue with Google signs you in without a password.",
  "auth.guide.how":
    "Enter your e-mail and password, then Continue. After signing in you return to where you were.",
  "auth.guide.next": "Browse without signing in",
  "account.guide.what": "Your profile as sellers and buyers see it, and your listings at a glance.",
  "account.guide.part.profile": "Your name, seller name and member date.",
  "account.guide.part.channels":
    "The ways buyers can reach you; each is shown or hidden on your ads.",
  "account.guide.part.counts": "How many ads you have live, waiting or ended.",
  "account.guide.part.legal": "The terms you agreed to and when.",
  "account.guide.how": "Edit profile changes the name and channels; your ads follow.",
  "account.guide.next": "Change your sign-in and security",
  "saved.guide.what": "The ads you saved, newest first.",
  "saved.guide.part.item": "Tap to open the ad again.",
  "saved.guide.part.remove": "Remove takes it off this list; the ad stays live.",
  "saved.guide.part.unavailable": "A greyed ad was sold or taken down.",
  "saved.guide.how": "Save ads from their own page with the heart.",
  "saved.guide.next": "Find more ads",
  "settings.guide.what": "How you sign in and keep your account safe.",
  "settings.guide.part.identity": "The e-mail and name on your account.",
  "settings.guide.part.methods": "Password and Google: add or remove a way to sign in.",
  "settings.guide.part.mfa":
    "A code from your phone each time you sign in — strongly advised for sellers.",
  "settings.guide.part.security": "Where you are signed in; sign out of a lost device here.",
  "settings.guide.part.device": "The language and settings of this device.",
  "settings.guide.how": "Each change asks for your password or code first.",
  "settings.guide.next": "Back to your account",
  "myListings.guide.what": "Every ad you posted and where each one stands.",
  "myListings.guide.col.photo": "The cover photo.",
  "myListings.guide.col.title": "The ad's name.",
  "myListings.guide.col.price": "The asking price.",
  "myListings.guide.col.state": "Draft, waiting for a check, live, ended or taken down.",
  "myListings.guide.col.posted": "When it went live.",
  "myListings.guide.col.expires": "When it ends; renew it from its page.",
  "myListings.guide.how":
    "Open an ad to edit, renew, mark sold or delete it. Each market lets you keep a number of Regular ads live at no cost.",
  "myListings.guide.next": "Post a new ad",
  "myListing.guide.what": "One of your ads: its state, dates and what you can do with it.",
  "myListing.guide.part.actions": "Edit, continue a draft, copy, delete or open the public page.",
  "myListing.guide.part.state": "Where the ad stands and who can see it.",
  "myListing.guide.part.dates": "Posted, renewed, ends and sold dates.",
  "myListing.guide.part.problem":
    "If the check found something, it is named here with what to change.",
  "myListing.guide.part.history": "Every change and check, newest first.",
  "myListing.guide.how": "An edited live ad is checked again before the change shows.",
  "myListing.guide.next": "Back to My listings",
  "post.guide.what":
    "Post an ad in eight short steps. Your draft saves itself; come back any time.",
  "post.guide.part.category": "Choose where buyers will look for it.",
  "post.guide.part.photos":
    "Clear photos, up to the number your plan shows; the first one is the cover.",
  "post.guide.part.specifications": "The facts for this category — size, brand, year.",
  "post.guide.part.details":
    "A title and description in your words. Leave phone numbers out of the text; buyers reach you through the contact step.",
  "post.guide.part.price": "A price, or free, or negotiable where the category allows.",
  "post.guide.part.place": "The city the item is in; a pin helps buyers nearby.",
  "post.guide.part.contact": "Your seller name and the ways buyers may reach you.",
  "post.guide.part.review": "Check everything, then submit; the ad goes live after a quick check.",
  "post.guide.how":
    "Each step saves when you press Next. A phone number in the text, too many photos or a place beyond your plan is refused with a note saying what to change.",
  "post.guide.next": "See your ads and their state",
  "post.edit.guide.what":
    "Change a live ad. The ad stays visible as it was until the change is checked.",
  "post.edit.guide.how":
    "Change any step, then save from Review. A changed text, photo or price is checked again before it shows.",
  "post.edit.guide.next": "Back to My listings",
} as const;
