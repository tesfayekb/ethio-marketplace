# P-1 — ruling 4, continue (after the three staging applies) + addendum (the Plans screen's existing Amharic)

```text
RULING — P-1, continue (after the three staging applies). Base: dev 94249bf8; branch head 7f3f39f3.
**MODEL — Claude Fable 5.1 (High), unchanged.**

1. M1c is APPLIED on ethio-staging (read back by me: the three doors' bodies match the file — prosrc md5 6a0e8b86c05e52d37db1ba958af87a8d, a0bb12550417d124e8b3c5da44dbfa5d, 4e2cfdd4d137f0f724ec1c1899e0a5ab — SECURITY DEFINER, volatile, search_path=public, anon no EXECUTE, authenticated yes; mark 20261103000000; no scratch row, no audit row left). All three marks are on staging; nothing more is applied until the merge. CONTINUE with Part B, then C, D, E as planned.
2. The composite checks you named in M1c's (b), (c), (d), (h): leave them. They passed; a landed-on-staging file is not reopened for a message. Note the class rule for every proof you write from now on: one RAISE per condition.
3. Refusal keys follow the doors' actual messages (M1c as applied): `bad key`, `unknown tier`, `bad days`, `bad label key`, `unknown package`, `unknown country`, `unknown category`, `unknown currency`, `bad amount`, `bad window`, `overlapping window`, `price not found`, `price already ended`, `permission denied`, `rateLimited`, the step-up state P0009, and the fallback. So `admin.packages.error.alreadyEnded` exists and `admin.packages.error.fixed` does not. The mapper's unit test (TIR-5's shape) proves every message the three doors raise has a key.
4. THE AMHARIC — every value exactly as given (copy by key; code points checked: Ethiopic U+1200–U+137F, ASCII, the ellipsis only). Three values are the words the app already uses (`admin.coverage.error.denied`, `.stepUp`, `.unknown`; the rate-limited line from `admin.listings.move.error.rateLimited`): copy them from those keys, byte for byte. The section keys go in `am-base.ts` beside their English in `en-base.ts`; the rest in `am-admin.ts`. `am-script.test.ts` and `strings-layers` judge; the report lists every key with its English (rule 60).

- `admin.section.plans.title` (en "Plans") → «ዕቅዶች»
- `admin.section.plans.body` (en "What a seller may do on each plan: reach, photos, ad lifetime and how many ads.") → «በእያንዳንዱ ዕቅድ ሻጭ ምን ማድረግ እንደሚችል፦ ሽፋን፣ ፎቶዎች፣ የማስታወቂያ ቆይታ እና የማስታወቂያዎች ብዛት።»
- `admin.roles.perm.resource.packages` (en "Packages") → «ጥቅሎች»
- `admin.section.packages.title` (en "Packages") → «ጥቅሎች»
- `admin.section.packages.body` (en "The promotions a seller may apply to an ad, and their prices.") → «ሻጭ በማስታወቂያ ላይ ሊጠቀምባቸው የሚችላቸው ማስተዋወቂያዎች እና ዋጋዎቻቸው።»
- `admin.coverage.col.days` (en "Ad lifetime") → «የማስታወቂያ ቆይታ»
- `admin.coverage.col.ads` (en "Ads at most") → «ማስታወቂያዎች ቢበዛ»
- `admin.coverage.col.label` (en "Label key") → «የመለያ ቁልፍ»
- `admin.coverage.field.days` (en "Ad lifetime (days)") → «የማስታወቂያ ቆይታ (ቀናት)»
- `admin.coverage.field.daysHint` (en "How long an ad stays live when its category sets no limit.") → «ምድቡ ገደብ ካላስቀመጠ ማስታወቂያ ምን ያህል ጊዜ እንደሚቆይ።»
- `admin.coverage.field.ads` (en "Active ads at most") → «ንቁ ማስታወቂያዎች ቢበዛ»
- `admin.coverage.field.adsUnlimited` (en "Unlimited") → «ያልተገደበ»
- `admin.coverage.field.adsHint` (en "Counted across live and waiting ads.") → «በቀጥታ ያሉና በመጠባበቅ ላይ ያሉ ማስታወቂያዎች ይቆጠራሉ።»
- `admin.coverage.field.label` (en "Label key") → «የመለያ ቁልፍ»
- `admin.coverage.field.labelHint` (en "The translation key that names this plan on screens.") → «ይህን ዕቅድ በማያ ገጾች ላይ የሚሰይመው የትርጉም ቁልፍ።»
- `admin.coverage.unlimited` (en "Unlimited") → «ያልተገደበ»
- `admin.coverage.error.badDefaultDays` (en "The ad lifetime is at least 1 day.") → «የማስታወቂያ ቆይታ ቢያንስ 1 ቀን ነው።»
- `admin.coverage.error.badMaxActiveAds` (en "The ad limit is at least 1, or unlimited.") → «የማስታወቂያ ገደብ ቢያንስ 1 ወይም ያልተገደበ ነው።»
- `admin.coverage.error.badLabelKey` (en "A label key is lower-case letters, digits, dots and underscores.") → «የመለያ ቁልፍ ትንንሽ የላቲን ፊደላት፣ አኃዞች፣ ነጥቦች እና ከስር መስመሮች ነው።»
- `admin.packages.caption` (en "Every package and its prices") → «እያንዳንዱ ጥቅል እና ዋጋዎቹ»
- `admin.packages.loading` (en "Loading packages…") → «ጥቅሎች እየተጫኑ ነው…»
- `admin.packages.error` (en "The packages could not be loaded.") → «ጥቅሎቹ ሊጫኑ አልቻሉም።»
- `admin.packages.empty` (en "There is no package yet.") → «እስካሁን ጥቅል የለም።»
- `admin.packages.col.key` (en "Package") → «ጥቅል»
- `admin.packages.col.tier` (en "Tier") → «ደረጃ»
- `admin.packages.col.days` (en "Days") → «ቀናት»
- `admin.packages.col.enabled` (en "On") → «በርቷል»
- `admin.packages.col.selfServe` (en "Self-serve") → «በሻጭ የሚተገበር»
- `admin.packages.col.extends` (en "Extends lifetime") → «ቆይታ ያራዝማል»
- `admin.packages.col.sort` (en "Order") → «ቅደም ተከተል»
- `admin.packages.col.updated` (en "Updated") → «የተሻሻለው»
- `admin.packages.on` (en "On") → «በርቷል»
- `admin.packages.off` (en "Off") → «ጠፍቷል»
- `admin.packages.create.open` (en "Add package") → «ጥቅል ጨምር»
- `admin.packages.create.title` (en "Add a package") → «ጥቅል ጨምር»
- `admin.packages.edit.title` (en "Edit package") → «ጥቅል አርትዕ»
- `admin.packages.action.edit` (en "Edit") → «አርትዕ»
- `admin.packages.field.key` (en "Package key") → «የጥቅል ቁልፍ»
- `admin.packages.field.keyHint` (en "2 to 32 lower-case letters, digits or underscores, starting with a letter; fixed once saved.") → «ከ2 እስከ 32 ትንንሽ የላቲን ፊደላት፣ አኃዞች ወይም ከስር መስመሮች፣ በፊደል የሚጀምር፤ ከተቀመጠ በኋላ አይቀየርም።»
- `admin.packages.field.tier` (en "Tier") → «ደረጃ»
- `admin.packages.field.days` (en "Days") → «ቀናት»
- `admin.packages.field.enabled` (en "Switched on") → «በርቷል»
- `admin.packages.field.selfServe` (en "Sellers may apply it") → «ሻጮች ሊተገብሩት ይችላሉ»
- `admin.packages.field.extends` (en "Extends the ad's lifetime") → «የማስታወቂያውን ቆይታ ያራዝማል»
- `admin.packages.field.label` (en "Label key") → «የመለያ ቁልፍ»
- `admin.packages.field.sort` (en "Order") → «ቅደም ተከተል»
- `admin.packages.saved` (en "Package saved.") → «ጥቅሉ ተቀምጧል።»
- `admin.packages.noDelete` (en "A package can be switched off, never removed.") → «ጥቅል ሊጠፋ ይችላል፣ በፍጹም አይወገድም።»
- `admin.packages.prices.title` (en "Prices") → «ዋጋዎች»
- `admin.packages.prices.caption` (en "The prices of the chosen package") → «የተመረጠው ጥቅል ዋጋዎች»
- `admin.packages.prices.filter` (en "Package") → «ጥቅል»
- `admin.packages.prices.empty` (en "This package has no price: it is not offered.") → «ይህ ጥቅል ዋጋ የለውም፦ አይቀርብም።»
- `admin.packages.prices.loading` (en "Loading prices…") → «ዋጋዎች እየተጫኑ ነው…»
- `admin.packages.prices.error` (en "The prices could not be loaded.") → «ዋጋዎቹ ሊጫኑ አልቻሉም።»
- `admin.packages.prices.col.market` (en "Market") → «ገበያ»
- `admin.packages.prices.col.category` (en "Category") → «ምድብ»
- `admin.packages.prices.col.amount` (en "Price") → «ዋጋ»
- `admin.packages.prices.col.from` (en "From") → «ከ»
- `admin.packages.prices.col.to` (en "Until") → «እስከ»
- `admin.packages.prices.everyMarket` (en "Every market") → «ሁሉም ገበያዎች»
- `admin.packages.prices.everyCategory` (en "Every category") → «ሁሉም ምድቦች»
- `admin.packages.prices.free` (en "Free") → «ነጻ»
- `admin.packages.prices.open` (en "Open-ended") → «ያለ መጨረሻ»
- `admin.packages.prices.create.open` (en "Add price") → «ዋጋ ጨምር»
- `admin.packages.prices.create.title` (en "Add a price") → «ዋጋ ጨምር»
- `admin.packages.prices.field.market` (en "Market") → «ገበያ»
- `admin.packages.prices.field.category` (en "Category") → «ምድብ»
- `admin.packages.prices.field.amount` (en "Amount") → «መጠን»
- `admin.packages.prices.field.amountHint` (en "0 makes the package free.") → «0 ጥቅሉን ነጻ ያደርገዋል።»
- `admin.packages.prices.field.currency` (en "Currency") → «ምንዛሪ»
- `admin.packages.prices.field.from` (en "Valid from") → «የሚጀምረው»
- `admin.packages.prices.field.to` (en "Valid until") → «የሚያበቃው»
- `admin.packages.prices.field.toHint` (en "Leave blank for no end.") → «መጨረሻ ከሌለው ባዶ ይተዉት።»
- `admin.packages.prices.action.end` (en "End price") → «ዋጋ አብቃ»
- `admin.packages.prices.end.title` (en "End this price") → «ይህን ዋጋ አብቃ»
- `admin.packages.prices.end.body` (en "The price stops at the date you choose; its history stays.") → «ዋጋው በመረጡት ቀን ይቆማል፤ ታሪኩ ይቀራል።»
- `admin.packages.prices.ended` (en "Price ended.") → «ዋጋው አብቅቷል።»
- `admin.packages.prices.saved` (en "Price saved.") → «ዋጋው ተቀምጧል።»
- `admin.packages.error.denied` (en "You do not have permission to do that.") → «ይህን ለማድረግ ፈቃድ የሎትም።»
- `admin.packages.error.stepUp` (en "Verify a code and try again.") → «ኮድ አረጋግጠው እና እነነሰን።»
- `admin.packages.error.rateLimited` (en "Too many changes in a row; try again later.") → «ባለፈው ሰዓት ውስጥ ብዙ ለውጦች ተደርገዋል። ቆይተው እንደገና ይሞክሩ።»
- `admin.packages.error.badKey` (en "A package key is 2 to 32 lower-case letters, digits or underscores, starting with a letter.") → «የጥቅል ቁልፍ ከ2 እስከ 32 ትንንሽ የላቲን ፊደላት፣ አኃዞች ወይም ከስር መስመሮች ነው፣ በፊደል የሚጀምር።»
- `admin.packages.error.unknownTier` (en "Pick Featured or Premium.") → «የተለየ ወይም ፕሪሚየም ይምረጡ።»
- `admin.packages.error.badDays` (en "Days is at least 1.") → «ቀናት ቢያንስ 1 ነው።»
- `admin.packages.error.badLabelKey` (en "A label key is lower-case letters, digits, dots and underscores.") → «የመለያ ቁልፍ ትንንሽ የላቲን ፊደላት፣ አኃዞች፣ ነጥቦች እና ከስር መስመሮች ነው።»
- `admin.packages.error.unknownPackage` (en "That package does not exist.") → «ያ ጥቅል የለም።»
- `admin.packages.error.unknownCountry` (en "That market does not exist.") → «ያ ገበያ የለም።»
- `admin.packages.error.unknownCategory` (en "That category does not exist.") → «ያ ምድብ የለም።»
- `admin.packages.error.unknownCurrency` (en "That currency does not exist.") → «ያ ምንዛሪ የለም።»
- `admin.packages.error.badAmount` (en "The amount is 0 or more.") → «መጠኑ 0 ወይም ከዚያ በላይ ነው።»
- `admin.packages.error.badWindow` (en "The end is after the start.") → «መጨረሻው ከመጀመሪያው በኋላ ነው።»
- `admin.packages.error.overlap` (en "Another price already covers that market, category and dates.") → «ሌላ ዋጋ ያንን ገበያ፣ ምድብ እና ቀናት አስቀድሞ ይሸፍናል።»
- `admin.packages.error.notFound` (en "That price no longer exists.") → «ያ ዋጋ ከእንግዲህ የለም።»
- `admin.packages.error.alreadyEnded` (en "That price has already ended.") → «ያ ዋጋ አስቀድሞ አብቅቷል።»
- `admin.packages.error.unknown` (en "That could not be saved.") → «መቀመጥ አልተሳካም።»

5. Then the screens, the W4 part, the docs, the checks, the browser check, the self-review, the report `docs/governance/reports/p1-packages.report.md` with the operator's walk lines, the pull request's CI, and "every check green". RULING — P-1, continue — ADDENDUM (the Plans screen's existing Amharic). Base: dev 94249bf8. Applies with the continue ruling; nothing in it is withdrawn except item 4's three "copy from the coverage keys" instructions, replaced here.
**MODEL — Claude Fable 5.1 (High), unchanged.**

1. Reading the `admin.coverage.*` block of `am-admin.ts` word by word before telling you to copy from it, I found most of it garbled — executor-written Amharic from September (INC-431's class: «ከቴሞች» for cities, «ጀበዎች» for countries, «በእብዛቅ ፈቶዎች», «አርክ», «ቢያስ 1», «የሎትም», «ኮድ አረጋግጠው እና እነነሰን»). INC-1036 is registered on my side. Part B edits this screen, so the fix rides Part B: replace EVERY `admin.coverage.*` value in `am-admin.ts` with the text below (the two of them that were right are repeated unchanged), and use the given text for the four `admin.packages.error.*` keys the continue ruling told you to copy. Everything else in the continue ruling stands.
2. The values, exact (code points checked: Ethiopic, ASCII, the ellipsis; `{reason}` kept as the placeholder):

- `admin.coverage.caption` (en "Every plan and how far it reaches") → «እያንዳንዱ ዕቅድ እና ምን ያህል እንደሚደርስ»
- `admin.coverage.filter.search` (en "Search plans") → «ዕቅዶችን ፈልግ»
- `admin.coverage.searchPlaceholder` (en "Search a plan name") → «የዕቅድ ስም ፈልግ»
- `admin.coverage.loading` (en "Loading plans…") → «ዕቅዶች እየተጫኑ ነው…»
- `admin.coverage.error` (en "The plans could not be loaded.") → «ዕቅዶቹ ሊጫኑ አልቻሉም።»
- `admin.coverage.empty` (en "There is no plan on record yet.") → «እስካሁን የተመዘገበ ዕቅድ የለም።»
- `admin.coverage.note` (en "Posting enforces these limits from U6.") → «ከU6 ጀምሮ ማስታወቂያ መለጠፍ እነዚህን ገደቦች ያስከብራል።»
- `admin.coverage.col.plan` (en "Plan") → «ዕቅድ»
- `admin.coverage.col.cities` (en "Cities") → «ከተሞች»
- `admin.coverage.col.regions` (en "Regions") → «ክልሎች»
- `admin.coverage.col.countries` (en "Countries") → «አገሮች»
- `admin.coverage.col.photos` (en "Photos at most") → «ፎቶዎች ቢበዛ»
- `admin.coverage.col.everywhere` (en "Everywhere") → «በሁሉም ቦታ»
- `admin.coverage.col.updated` (en "Updated") → «የተሻሻለው»
- `admin.coverage.everywhere.yes` (en "Yes") → «አዎ»
- `admin.coverage.everywhere.no` (en "No") → «አይ»
- `admin.coverage.everywhere.tipYes` (en "A seller on this plan may reach every open market at once.") → «በዚህ ዕቅድ ላይ ያለ ሻጭ በአንድ ጊዜ ሁሉንም ክፍት ገበያዎች መድረስ ይችላል።»
- `admin.coverage.everywhere.tipNo` (en "A seller on this plan chooses places within the limits beside it.") → «በዚህ ዕቅድ ላይ ያለ ሻጭ ከጎኑ ባሉት ገደቦች ውስጥ ቦታዎችን ይመርጣል።»
- `admin.coverage.create.open` (en "Add plan") → «ዕቅድ ጨምር»
- `admin.coverage.create.title` (en "Add a plan") → «ዕቅድ ጨምር»
- `admin.coverage.action.edit` (en "Edit") → «አርትዕ»
- `admin.coverage.edit.title` (en "Edit plan") → «ዕቅድ አርትዕ»
- `admin.coverage.field.plan` (en "Plan name") → «የዕቅድ ስም»
- `admin.coverage.field.planHint` (en "Lower-case letters and underscores, 2 to 32 characters, e.g. free.") → «ትንንሽ የላቲን ፊደላት እና ከስር መስመሮች፣ ከ2 እስከ 32 ቁምፊ፣ ለምሳሌ free።»
- `admin.coverage.field.cities` (en "Cities at most") → «ከተሞች ቢበዛ»
- `admin.coverage.field.regions` (en "Regions at most") → «ክልሎች ቢበዛ»
- `admin.coverage.field.countries` (en "Countries at most") → «አገሮች ቢበዛ»
- `admin.coverage.field.photos` (en "Photos at most") → «ፎቶዎች ቢበዛ»
- `admin.coverage.field.photosHint` (en "0 to 30 photos per listing.") → «በአንድ ማስታወቂያ ከ0 እስከ 30 ፎቶዎች።»
- `admin.coverage.field.everywhere` (en "Allow everywhere") → «በሁሉም ቦታ ፍቀድ»
- `admin.coverage.field.limitHint` (en "At least 1.") → «ቢያንስ 1።»
- `admin.coverage.noDelete` (en "A plan can be edited, never removed.") → «ዕቅድ ሊስተካከል ይችላል፣ በፍጹም አይወገድም።»
- `admin.coverage.error.reason` (en "Reason: {reason}") → «ምክንያት፦ {reason}»
- `admin.coverage.error.denied` (en "You do not have permission to do that.") → «ይህን ለማድረግ ፈቃድ የለዎትም።»
- `admin.coverage.error.stepUp` (en "Verify a code and try again.") → «ኮድ አረጋግጠው እንደገና ይሞክሩ።»
- `admin.coverage.error.unknown` (en "That could not be saved.") → «ያ ሊቀመጥ አልቻለም።»
- `admin.coverage.error.badPlan` (en "A plan name is 2 to 32 lower-case letters or underscores.") → «የዕቅድ ስም ከ2 እስከ 32 ትንንሽ የላቲን ፊደላት ወይም ከስር መስመሮች ነው።»
- `admin.coverage.error.belowMinimum` (en "Every limit is at least 1.") → «እያንዳንዱ ገደብ ቢያንስ 1 ነው።»
- `admin.coverage.error.badMaxPhotos` (en "The photo limit is between 0 and 30.") → «የፎቶ ገደብ ከ0 እስከ 30 መካከል ነው።»
- `admin.coverage.maxPhotos` (en "Photos") → «ፎቶዎች»
- `admin.packages.error.denied` (en "You do not have permission to do that.") → «ይህን ለማድረግ ፈቃድ የለዎትም።»
- `admin.packages.error.stepUp` (en "Verify a code and try again.") → «ኮድ አረጋግጠው እንደገና ይሞክሩ።»
- `admin.packages.error.unknown` (en "That could not be saved.") → «ያ ሊቀመጥ አልቻለም።»
- `admin.packages.error.rateLimited` (en "Too many changes in a row; try again later.") → «በተከታታይ በጣም ብዙ ለውጦች፤ ቆይተው እንደገና ይሞክሩ።»

3. The report's strings section lists these under "changed" with their English, as the rule says; `am-script.test.ts` judges the code points. K2 for me, not for you: the other admin blocks of `am-admin.ts` may carry the same class; I read them at the records turn.
```
