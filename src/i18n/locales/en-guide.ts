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
  "admin.monetisation.level.guide.col.cities": "A level has no city limit; the reach sets it.",
  "admin.monetisation.level.guide.col.regions": "A level has no region limit; the reach sets it.",
  "admin.monetisation.level.guide.col.countries":
    "A level has no country limit; the reach sets it.",
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
  "admin.monetisation.reach.guide.col.cities":
    "How many cities an ad with this reach may cover; blank means no limit.",
  "admin.monetisation.reach.guide.col.regions":
    "How many regions an ad with this reach may cover; blank means no limit.",
  "admin.monetisation.reach.guide.col.countries":
    "How many countries an ad with this reach may cover; blank means no limit.",
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
  // P-1c turn (c) (ruling 1) — the sixteen remaining admin blocks, in the consoles' order.
  "admin.ai.features.guide.what":
    "Every outside AI service the site uses — photo checking, writing help, the seller-name check, category pictures and icons, machine translation, background removal — with its switch, its monthly budget and what it has cost this month.",
  "admin.ai.features.guide.col.feature":
    "The service and, under it, what it does and which provider answers.",
  "admin.ai.features.guide.col.state":
    "On, or Off with the reason: switched off by staff, or its monthly budget reached. A feature off by budget comes back next month or when the budget is raised.",
  "admin.ai.features.guide.col.spend":
    "What this feature has cost this month against its budget; a warning shows at 80 % of the budget and when it is reached.",
  "admin.ai.features.guide.col.calls":
    "How many calls this month and today; for machine translation, the characters too.",
  "admin.ai.features.guide.col.price":
    "What one call costs — or, for machine translation, a million characters. Staff set it; the provider's bill is the final figure.",
  "admin.ai.features.guide.col.updated": "The day the switch, budget or price last changed.",
  "admin.ai.features.guide.how":
    "Edit changes the switch, the budget in dollars (empty means no budget) and the price; it asks for your second factor. At its budget a feature switches itself off. While photo checking is off, a new ad's photos are held for staff and approving the ad approves them; a live ad cannot take new photos. A feature cannot be switched on while its spend is over its budget — raise the budget first.",
  "admin.ai.features.guide.next": "See the recent calls and how each one ended.",
  "admin.ai.log.guide.what":
    "Every AI call of the last 90 days, newest first — which service asked, which model answered and how it ended. Prompts, photos and answers are never kept.",
  "admin.ai.log.guide.col.time": "When the call was made.",
  "admin.ai.log.guide.col.feature": "The service that made the call.",
  "admin.ai.log.guide.col.model": "The provider's model that answered.",
  "admin.ai.log.guide.col.outcome":
    "Answered, or why not: switched off, over budget, unavailable, timed out, a provider error or an unusable answer.",
  "admin.ai.log.guide.col.latency": "How long the provider took to answer, in milliseconds.",
  "admin.ai.log.guide.col.person":
    "Who the call was for — a person's name, System for the site's own jobs, or Hidden when you may not see people's names.",
  "admin.ai.log.guide.how":
    "Filter by service or outcome from the toolbar. Nothing here can be changed; rows older than 90 days are removed on their own. Many failed calls in a row point to the provider or to a switched-off service — check the table above.",
  "admin.ai.log.guide.next": "Budget alerts and switch-offs are also written in the audit log.",
  "admin.attributes.guide.what":
    "The library of facts an ad can carry — size, brand, year, condition. Each attribute is defined once and attached to the categories that ask it, so every ad in those categories asks the same question.",
  "admin.attributes.guide.col.name":
    "The question as sellers see it, with its fixed key under it. Inherited from … marks a question a parent category passes down.",
  "admin.attributes.guide.col.type":
    "The kind of answer: text, a number, one choice, several choices, yes or no, a date or a range.",
  "admin.attributes.guide.col.options":
    "How many answers a choice question offers; a dash for other types. Open the row to read them.",
  "admin.attributes.guide.col.coverage":
    "How many of the options have an Amharic label; amber while some are missing.",
  "admin.attributes.guide.col.usage": "The categories that ask this question.",
  "admin.attributes.guide.how":
    "New attribute defines a question; Edit changes its words, help and options — a text question takes only the site's preset checks. Assign to category attaches it; Remove from category detaches it. Delete (red) is refused while any category still uses it. Merge joins two attributes into one. Import and Export carry the library as a file; Export follows the category you filtered to. An option sellers should no longer pick is switched off, not deleted.",
  "admin.attributes.guide.next":
    "Attach questions to a category and choose which show on its cards.",
  "admin.categories.guide.what":
    "The tree people browse and post into: main categories, their subcategories and, where needed, a catch-all. Sellers post only into a category with nothing under it.",
  "admin.categories.guide.col.name":
    "The category's icon and English name, with its address slug; indented by its depth in the tree.",
  "admin.categories.guide.col.parent":
    "The category it sits under; Also in names other places it is shown. A main category has none.",
  "admin.categories.guide.col.status": "Active, Scheduled (shown from a future day) or Retired.",
  "admin.categories.guide.col.flags":
    "Catch-all; whether it accepts ads, asks a price or has a show window; amber warnings for a missing picture or icon and for fewer than two card attributes.",
  "admin.categories.guide.col.order": "Its place among its siblings.",
  "admin.categories.guide.col.listings": "How many ads it holds.",
  "admin.categories.guide.col.exclusions": "In how many countries it is hidden.",
  "admin.categories.guide.how":
    "Create category adds a node. The row opens the editor: Edit changes its name, icon, listing lifetime and whether it accepts ads and asks a price; Visibility sets the days it is shown; Image generates and accepts its picture; Add pointer shows it under another parent too; Countries hides it in chosen countries; Attributes picks the questions its ads ask. Move up and down reorder siblings. Retire takes a category out of use — if it holds live ads you choose where they go; Reactivate brings it back; Delete (red) removes a retired one only. Generate missing asks the AI for the pictures the shown rows lack; Import and Export carry the tree as a file. Changes ask for your second factor.",
  "admin.categories.guide.next": "Define the questions categories ask.",
  "admin.countries.guide.what":
    "Every country the site can serve, open or closed. A row sets its units and currency, its own order of main categories and whether people there can post and browse.",
  "admin.countries.guide.col.name": "The country's English name and its two-letter code.",
  "admin.countries.guide.col.status":
    "Open — people can post and browse here — or Closed, not offered until an admin opens it.",
  "admin.countries.guide.col.places": "Active places here, out of all the places on record.",
  "admin.countries.guide.col.units": "Metric or imperial, and the currency ads are priced in.",
  "admin.countries.guide.col.rail":
    "How many main categories this market orders for itself; 0 follows the global order.",
  "admin.countries.guide.col.roles": "How many staff role grants are limited to this country.",
  "admin.countries.guide.col.updated": "When the row last changed.",
  "admin.countries.guide.how":
    "Edit sets the name, the units and the currency; Rail order sets this market's order of main categories. Open and Close switch the market — opening it also activates its anchor place; both ask for your second factor. Closing a country with staff roles limited to it asks you to confirm; the grants are kept. Countries are added by importing the markets file, never one by one; Download countries gives you that file.",
  "admin.countries.guide.next": "Build and activate the country's places before opening it.",
  "admin.listings.guide.what":
    "Every ad on the site except drafts — live, waiting, ended or removed — newest first. Open an ad to see its history and act on it.",
  "admin.listings.guide.col.title":
    "The ad's name; a line under it warns when a photo may not fit the ad. Open it to reach the ad's page.",
  "admin.listings.guide.col.seller":
    "The seller's public name — a business's name when they post as one — and their e-mail when you may see it.",
  "admin.listings.guide.col.place": "The city the ad is in and its country.",
  "admin.listings.guide.col.category": "The category it was posted in.",
  "admin.listings.guide.col.price": "The asking price with its unit.",
  "admin.listings.guide.col.status":
    "Live, Reduced reach, Waiting for review, Held, Expired, Sold, Rejected, Closed or Removed; the ad's level when it has one; its open reports, when you review ads.",
  "admin.listings.guide.col.posted": "When it first went live.",
  "admin.listings.guide.col.expires": "When it ends.",
  "admin.listings.guide.how":
    "The pills switch between All, Live, Waiting, Ended and Removed; search by a title's words or an ad's id; filter by country, category, seller, date and level. The row's menu offers Open, Send back to review, Restore, Set level, View as seller and Remove (red); each move asks for a reason, a note for the seller and your second factor, and the seller is told. Tick several ads to remove or restore them together. Editing an ad and removing a photo happen on the ad's page. Settings sets whether sellers may renew an expired ad and for how many days. Your own ads cannot be moved or edited here.",
  "admin.listings.guide.next": "Review the ads waiting for approval.",
  "admin.locations.guide.what":
    "Every place people can post and browse in — regions, cities and sub-cities under their country. A place's path is its fixed address on the site.",
  "admin.locations.guide.col.name": "The place's English name and its level.",
  "admin.locations.guide.col.path": "Where it sits: country, region, city.",
  "admin.locations.guide.col.status":
    "Active or Retired. A new place is born retired until you activate it.",
  "admin.locations.guide.col.counts":
    "Listings posted here · seller coverage rows · profiles defaulting here.",
  "admin.locations.guide.col.order": "Its place among its siblings.",
  "admin.locations.guide.col.aliases":
    "How many other names and spellings find this place in search.",
  "admin.locations.guide.col.iso": "Its ISO 3166-2 code, when it has one.",
  "admin.locations.guide.how":
    "Add place adds a child inside a chosen place — it is born retired; Edit changes its name, aliases, code and centre; Activate and Retire switch it — a place is activated only after its parent; Move puts it under another parent; Reorder siblings changes its order. Delete (red) is permanent, asks you to type the place's address, and is refused while something still points at it — children, listings, coverage rows or profiles. Import and Export carry the markets and places files, scoped to the country you filtered to. Moves and deletes ask for your second factor.",
  "admin.locations.guide.next": "Open the country once its places are active.",
  "admin.screening.guide.what":
    "Ads waiting for a decision, oldest first. No buyer sees an ad until you approve it.",
  "admin.screening.guide.col.title":
    "The ad's name; a line under it warns when a photo may not fit the ad.",
  "admin.screening.guide.col.category": "The category the seller chose.",
  "admin.screening.guide.col.place": "The city the ad is in.",
  "admin.screening.guide.col.sent": "When the seller sent it for review.",
  "admin.screening.guide.how":
    "Preview as buyer shows the ad as buyers will see it, with the seller's public name and contact methods; Show number reveals a number and writes an audit row. Approve publishes the ad; Reject (red) refuses it; both ask you to confirm and for your second factor. Tick several ads to decide them together. From the preview, Edit opens the ad in the wizard; Done brings you back to the preview. Below the queue sit the photos held for review, the seller names held for review and the photo changes on live ads.",
  "admin.screening.guide.next": "Decide on the seller names the AI holds.",
  "admin.screening.names.guide.what":
    "Seller names the AI check says may imitate a well-known company, brand or person. A held name is hidden from buyers until you decide; a name the AI could not check stays visible.",
  "admin.screening.names.guide.col.name":
    "The name and what the AI said it imitates. Name hidden means you may not see people's names.",
  "admin.screening.names.guide.col.since": "When the name was held.",
  "admin.screening.names.guide.col.attempts": "How many times the AI check ran on this name.",
  "admin.screening.names.guide.col.owner": "The account the name belongs to; opens its user page.",
  "admin.screening.names.guide.how":
    "Allow this name shows it to buyers again, with an optional reason kept in the audit log; it asks for your second factor. Rename opens the owner's user page, where its profile editor changes the name. If the name changed after the list loaded, nothing is written — reload. The line above says when the re-check last ran and lets you resume it when it is paused.",
  "admin.screening.names.guide.next": "Find the seller's account to rename it.",
  "admin.audit.guide.what":
    "Every staff action and security event, newest first — who did what, to which record, and when. The figures and the 14-day chart above count the same rows.",
  "admin.audit.guide.col.time": "When it happened.",
  "admin.audit.guide.col.actor": "Who did it; System for the site's own jobs.",
  "admin.audit.guide.col.action": "What was done, as the system names it.",
  "admin.audit.guide.col.entity": "The kind of record it touched and the start of its id.",
  "admin.audit.guide.col.meta":
    "The details recorded with it — values before and after, a reason, a count. Open a row to read every pair.",
  "admin.audit.guide.how":
    "Search, filter by action, entity type and dates, and page through. Nothing here can be changed or deleted.",
  "admin.audit.guide.next": "See who holds which role.",
  "impersonation.listings.guide.what":
    "The ads of the account you are viewing, read-only. You see their data; you are not acting as them, and nothing here changes it.",
  "impersonation.listings.guide.col.title": "The ad's name.",
  "impersonation.listings.guide.col.status":
    "Where the ad stands: draft, waiting, live, ended or removed.",
  "impersonation.listings.guide.col.price": "The asking price.",
  "impersonation.listings.guide.col.created": "When the seller created it.",
  "impersonation.listings.guide.how":
    "The session ends on its own after 15 minutes, or with End now. Its start and end are written in the audit log with both names.",
  "impersonation.listings.guide.next": "Back to the person's account.",
  "admin.roles.guide.what":
    "The staff roles and what each may do. A system role is fixed by the site; a custom role is yours to shape.",
  "admin.roles.guide.col.name": "The role's fixed key.",
  "admin.roles.guide.col.display": "The name staff see.",
  "admin.roles.guide.col.kind": "System — fixed by the site — or Custom.",
  "admin.roles.guide.col.members": "How many people hold it.",
  "admin.roles.guide.col.permissions": "How many permissions it grants.",
  "admin.roles.guide.how":
    "Create role adds a custom role; it asks for your second factor. Open a row to grant or revoke its permissions, see its members or delete it — a role with members cannot be deleted, and a system role cannot be changed. Some permissions are reserved for system roles and cannot be granted to a custom one. View members opens the Users list filtered to the role.",
  "admin.roles.guide.next": "Give a person a role from their user page.",
  "admin.translations.data.guide.what":
    "The names of categories, places, attributes and answer options in this language. A name with no approved translation shows its English.",
  "admin.translations.data.guide.col.entity": "The thing being named, with its key under it.",
  "admin.translations.data.guide.col.type": "Category, Location, Attribute or Answer option.",
  "admin.translations.data.guide.col.source": "The English name.",
  "admin.translations.data.guide.col.value": "The translation, or a dash while there is none.",
  "admin.translations.data.guide.col.status":
    "Untranslated, Machine, Edited or Approved. Only an approved name reaches the site.",
  "admin.translations.data.guide.how":
    "Edit opens a row to write, AI-translate, approve or clear it. AI bulk translates every untranslated row; Approve all approves every machine or edited row; each asks for your second factor. These names are a meter only — they do not decide whether the language can go public.",
  "admin.translations.data.guide.next": "Switch the language on for staff or the public.",
  "admin.translations.languages.guide.what":
    "Every language the site can speak, with how much of it is translated and where it is shown.",
  "admin.translations.languages.guide.col.language":
    "The language in its own script, its code, and Base or RTL when it applies.",
  "admin.translations.languages.guide.col.nameEn": "Its English name.",
  "admin.translations.languages.guide.col.coverage":
    "Approved interface strings out of the base language's total. This decides whether the language can go public.",
  "admin.translations.languages.guide.col.coverageData":
    "Approved data names — categories, places, attributes — out of all of them. A meter only.",
  "admin.translations.languages.guide.col.admin":
    "On shows the language in staff tools and previews; the base language is always on.",
  "admin.translations.languages.guide.col.public":
    "On offers the language to visitors. It stays off until every interface string is approved.",
  "admin.translations.languages.guide.how":
    "Open strings takes you to the language's translations. Add language adds one; Sync keys brings the app's new strings in; Move up and down order the rows; Delete (red) is refused for the base language and while the language is public — unpublish it first. Every change asks for your second factor.",
  "admin.translations.languages.guide.next":
    "Legal texts have their own English and Amharic bodies on the Legal page.",
  "admin.translations.strings.guide.what":
    "Every word the app shows — menus, buttons, messages — in this language, one key at a time. An approved string reaches the site; an untranslated one falls back to English.",
  "admin.translations.strings.guide.col.key": "The string's fixed key in the app.",
  "admin.translations.strings.guide.col.source": "The English text.",
  "admin.translations.strings.guide.col.value": "The translation, or a dash while there is none.",
  "admin.translations.strings.guide.col.status":
    "Untranslated, Machine, Edited or Approved; Flagged (red) when a placeholder the English carries is missing.",
  "admin.translations.strings.guide.col.provenance":
    "Who or what wrote it — a person or the machine — and who approved it.",
  "admin.translations.strings.guide.how":
    "Edit opens a row to write, AI-translate, approve, clear or read its history. A flagged string cannot be approved until its placeholders are restored. AI bulk translates every untranslated row; Approve all approves every machine or edited row; Export (CSV or XLIFF) and Import carry the strings as a file. Each change asks for your second factor. The Data pill switches to the names of categories, places and options.",
  "admin.translations.strings.guide.next": "Back to the languages to switch this one on.",
  "admin.users.guide.what":
    "Everyone with an account — their state, their roles and when they joined. Open a row for the person's page.",
  "admin.users.guide.col.name": "The person's display name.",
  "admin.users.guide.col.email": "Their sign-in e-mail.",
  "admin.users.guide.col.country": "Their home country's code.",
  "admin.users.guide.col.status":
    "Active, or Deactivated — a deactivated account is refused at every door and signed out.",
  "admin.users.guide.col.roles": "The staff roles they hold, if any.",
  "admin.users.guide.col.joined": "When the account was made.",
  "admin.users.guide.how":
    "Search, filter by status and role, and page through. The row opens the person's page, where staff change the status with a reason, give or remove roles, edit the profile and start a read-only View as session — each asks for your second factor. You cannot deactivate yourself or a super admin.",
  "admin.users.guide.next": "See what each role allows.",
} as const;
