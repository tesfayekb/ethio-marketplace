import type { enGuide } from "./en-guide";

/** P-1c (D313) — the Guide layer in Amharic; typed to every English guide key (en-guide.ts). */
export const amGuide: { [K in keyof typeof enGuide]: string } = {
  "admin.monetisation.markets.guide.what":
    "በየሀገሩ አንድ ረድፍ፣ ከዚያም የራሱ ረድፍ ለሌለው ማንኛውም ሀገር ነባሪ ረድፍ። እያንዳንዱ ረድፍ እዚያ ያሉ ሻጮች በነጻ ምን እንደሚያገኙ እና የሚከፈልባቸው ደረጃዎች መብራታቸውን ይወስናል።",
  "admin.monetisation.markets.guide.col.market":
    "ይህ ረድፍ የሚመለከተው ሀገር፤ ነባሪው ረድፍ የራሱ ረድፍ የሌለውን እያንዳንዱን ሀገር ይሸፍናል።",
  "admin.monetisation.markets.guide.col.freeAds":
    "በዚህ ገበያ ያለ ሻጭ ያለ ክፍያ ስንት መደበኛ ማስታወቂያዎችን በአንድ ጊዜ ሊያስተላልፍ እንደሚችል።",
  "admin.monetisation.markets.guide.col.includedReach":
    "በዚህ ገበያ ያለ እያንዳንዱ ማስታወቂያ ሳይከፍል የሚያገኘው ተደራሽነት።",
  "admin.monetisation.markets.guide.col.paidLevels":
    "እዚህ ያሉ ሻጮች ከፍ ያለ ደረጃ መግዛት ይችሉ እንደሆነ፤ ጠፍቶ ከሆነ እያንዳንዱ ደረጃ ያለ ክፍያ ይቀመጣል።",
  "admin.monetisation.markets.guide.col.launch":
    "የሚከፈልባቸው ደረጃዎች ሲበሩ እያንዳንዱ ሻጭ የሚቀበለው የነጻ ጥቅል ክሬዲቶች እና ቀናት።",
  "admin.monetisation.markets.guide.col.since": "እዚህ የሚከፈልባቸው ደረጃዎች የበሩበት ቀን፤ ጠፍተው እያሉ ባዶ ነው።",
  "admin.monetisation.markets.guide.col.createdBy": "ይህን ረድፍ የጨመረው ማን ነው።",
  "admin.monetisation.markets.guide.col.updatedBy": "ይህን ረድፍ በመጨረሻ የቀየረው ማን ነው።",
  "admin.monetisation.markets.guide.col.updated": "ይህ ረድፍ በመጨረሻ የተቀየረበት ጊዜ።",
  "admin.monetisation.markets.guide.how":
    "«ገበያ ጨምር» ረድፍ ለሌለው ሀገር ረድፍ ይከፍታል፤ ነባሪው ረድፍ ሊወገድ አይችልም። «አርትዕ» ረድፍን ይቀይራል፤ የሚከፈልባቸውን ደረጃዎች ማብራት የመክፈቻ ጥቅል (ክሬዲቶች እና ቀናት) ያስፈልገዋል። ረድፍ በፍጹም አይሰረዝም — በምትኩ የሚከፈልባቸውን ደረጃዎች ያጥፉ።",
  "admin.monetisation.markets.guide.next": "ሻጮች ሊገዙ የሚችሉትን ደረጃዎች እና ጥቅሞቻቸውን ይመልከቱ።",
  "admin.monetisation.level.guide.what":
    "ማስታወቂያ ሊኖረው የሚችለው ደረጃዎች — መደበኛ፣ የተለየ፣ ፕሪሚየም እና እርስዎ የሚጨምሩት ማንኛውም። ደረጃ ማስታወቂያ ምን ያህል እንደሚቆይ፣ ስንት ፎቶ እንደሚይዝ፣ የት እንደሚቀመጥ እና ምልክት እንደሚኖረው ይወስናል። የምድብ ጥቅሞቹን እና ዋጋዎቹን ለማስቀመጥ ደረጃውን ይክፈቱ።",
  "admin.monetisation.level.guide.col.name": "ሻጮች በየቋንቋው የሚያዩት ስም።",
  "admin.monetisation.level.guide.col.key":
    "የደረጃው በስርዓቱ ውስጥ ያለው ቋሚ መለያ፤ አንዴ ከተቀመጠ በኋላ በፍጹም አይቀየርም።",
  "admin.monetisation.level.guide.col.days": "ደረጃው በነባሪነት ስንት ቀን እንደሚቆይ።",
  "admin.monetisation.level.guide.col.photos": "በዚህ ደረጃ ያለ ማስታወቂያ ስንት ፎቶ ሊይዝ እንደሚችል።",
  "admin.monetisation.level.guide.col.placement":
    "በዚህ ደረጃ ያሉ ማስታወቂያዎች የት እንደሚታዩ፦ መደበኛ፣ የጎላ ወይም በመጀመሪያ።",
  "admin.monetisation.level.guide.col.badge": "በዚህ ደረጃ ያሉ ማስታወቂያዎች ምልክት እንደሚኖራቸው።",
  "admin.monetisation.level.guide.col.enabled":
    "ሻጮች ይህን ደረጃ አሁንም ማግኘት ይችሉ እንደሆነ፤ ጠፍቶ ከሆነ በየትም ቦታ አይታይም።",
  "admin.monetisation.level.guide.col.selfServe": "ሻጭ ይህን ደረጃ ያለ ሠራተኞች ብቻውን መግዛት ይችል እንደሆነ።",
  "admin.monetisation.level.guide.col.extends": "ይህን ደረጃ መግዛት የማስታወቂያውን ቆይታም ያራዝም እንደሆነ።",
  "admin.monetisation.level.guide.col.sort": "ሻጮች በሚያዩት ቅደም ተከተል ውስጥ የደረጃው ቦታ።",
  "admin.monetisation.level.guide.col.createdBy": "ይህን ደረጃ የጨመረው ማን ነው።",
  "admin.monetisation.level.guide.col.updatedBy": "ይህን ደረጃ በመጨረሻ የቀየረው ማን ነው።",
  "admin.monetisation.level.guide.col.updated": "ይህ ደረጃ በመጨረሻ የተቀየረበት ጊዜ።",
  "admin.monetisation.level.guide.how":
    "«ደረጃ ጨምር» በመለያው፣ በስሞቹ እና በጥቅሞቹ ደረጃ ይፈጥራል። «አርትዕ» ከመለያው በስተቀር ሁሉንም ይቀይራል። ደረጃ ይጠፋል እንጂ በፍጹም አይወገድም፤ ስለዚህ ያለው ማስታወቂያዎች ታሪካቸውን ይጠብቃሉ። ለዚህ ደረጃ የምድብ ጥቅሞችን እና ዋጋዎችን ለመጨመር ረድፉን ይክፈቱ።",
  "admin.monetisation.level.guide.next": "የተደራሽነት ምርቶችን ያስቀምጡ — ማስታወቂያ የት እንደሚታይ።",
  "admin.monetisation.reach.guide.what":
    "የተደራሽነት ምርቶች — ማስታወቂያ እስከ የት እንደሚታይ፦ ከተማው፣ መላው ሀገር ወይም ዓለም አቀፍ። ተደራሽነት ቆይታ ብቻ አለው፤ ጥቅሞቹ ከማስታወቂያው ደረጃ ይመጣሉ። ዋጋዎቹን ለማስቀመጥ ተደራሽነቱን ይክፈቱ።",
  "admin.monetisation.reach.guide.col.name": "ሻጮች በየቋንቋው የሚያዩት ስም።",
  "admin.monetisation.reach.guide.col.key":
    "የተደራሽነቱ በስርዓቱ ውስጥ ያለው ቋሚ መለያ፤ አንዴ ከተቀመጠ በኋላ በፍጹም አይቀየርም።",
  "admin.monetisation.reach.guide.col.days": "ተደራሽነቱ ስንት ቀን እንደሚቆይ።",
  "admin.monetisation.reach.guide.col.enabled":
    "ሻጮች ይህን ተደራሽነት አሁንም ማግኘት ይችሉ እንደሆነ፤ ጠፍቶ ከሆነ በየትም ቦታ አይታይም።",
  "admin.monetisation.reach.guide.col.selfServe": "ሻጭ ይህን ተደራሽነት ያለ ሠራተኞች ብቻውን መግዛት ይችል እንደሆነ።",
  "admin.monetisation.reach.guide.col.extends": "ይህን ተደራሽነት መግዛት የማስታወቂያውን ቆይታም ያራዝም እንደሆነ።",
  "admin.monetisation.reach.guide.col.sort": "ሻጮች በሚያዩት ቅደም ተከተል ውስጥ የተደራሽነቱ ቦታ።",
  "admin.monetisation.reach.guide.col.createdBy": "ይህን ተደራሽነት የጨመረው ማን ነው።",
  "admin.monetisation.reach.guide.col.updatedBy": "ይህን ተደራሽነት በመጨረሻ የቀየረው ማን ነው።",
  "admin.monetisation.reach.guide.col.updated": "ይህ ተደራሽነት በመጨረሻ የተቀየረበት ጊዜ።",
  "admin.monetisation.reach.guide.col.photos": "ተደራሽነት የፎቶ ገደብ የለውም፤ ደረጃው ያስቀምጠዋል።",
  "admin.monetisation.reach.guide.col.placement": "ተደራሽነት አቀማመጥ የለውም፤ ደረጃው ያስቀምጠዋል።",
  "admin.monetisation.reach.guide.col.badge": "ተደራሽነት ምልክት የለውም፤ ደረጃው ያስቀምጠዋል።",
  "admin.monetisation.reach.guide.how":
    "«ተደራሽነት ጨምር» በመለያው፣ በስሞቹ እና በቀናቱ ተደራሽነት ይፈጥራል፤ በተደራሽነት ላይ ጥቅሞች አይፈቀዱም። «አርትዕ» ከመለያው በስተቀር ሁሉንም ይቀይራል። ተደራሽነት ይጠፋል እንጂ በፍጹም አይወገድም። ዋጋዎቹን ለመጨመር ረድፉን ይክፈቱ።",
  "admin.monetisation.reach.guide.next": "የሚከፈልባቸው ደረጃዎች በበሩበት በእያንዳንዱ ገበያ ለእያንዳንዱ ምርት ዋጋ ይስጡ።",
  "admin.monetisation.levelOverrides.guide.what":
    "የዚህ ደረጃ ጥቅሞች ለአንድ ዋና ምድብ፣ ለአንድ ሀገር ወይም ለሁለቱም። ባዶ ክፍል የደረጃውን የራሱን እሴት ይጠብቃል። ንዑስ ምድብ የዋና ምድቡን ረድፍ ይከተላል።",
  "admin.monetisation.levelOverrides.guide.col.category": "ይህ ረድፍ የሚመለከተው ዋና ምድብ፣ ወይም እያንዳንዱ ምድብ።",
  "admin.monetisation.levelOverrides.guide.col.country": "ይህ ረድፍ የሚመለከተው ሀገር፣ ወይም እያንዳንዱ ሀገር።",
  "admin.monetisation.levelOverrides.guide.col.days":
    "ደረጃው እዚህ ስንት ቀን እንደሚቆይ፤ ባዶ ከሆነ የደረጃውን ነባሪ ይጠብቃል።",
  "admin.monetisation.levelOverrides.guide.col.photos":
    "ማስታወቂያ እዚህ ስንት ፎቶ ሊይዝ እንደሚችል፤ ባዶ ከሆነ የደረጃውን ነባሪ ይጠብቃል።",
  "admin.monetisation.levelOverrides.guide.col.placement":
    "ማስታወቂያዎች እዚህ የት እንደሚታዩ፤ ባዶ ከሆነ የደረጃውን አቀማመጥ ይጠብቃል።",
  "admin.monetisation.levelOverrides.guide.col.badge":
    "ማስታወቂያዎች እዚህ ምልክቱን እንደሚኖራቸው፤ ባዶ ከሆነ የደረጃውን ቅንብር ይጠብቃል።",
  "admin.monetisation.levelOverrides.guide.col.createdBy": "ይህን ረድፍ የጨመረው ማን ነው።",
  "admin.monetisation.levelOverrides.guide.col.updatedBy": "ይህን ረድፍ በመጨረሻ የቀየረው ማን ነው።",
  "admin.monetisation.levelOverrides.guide.col.updated": "ይህ ረድፍ በመጨረሻ የተቀየረበት ጊዜ።",
  "admin.monetisation.levelOverrides.guide.how":
    "«የምድብ ጥቅም ጨምር» ምድቡን እና ሀገሩን መርጦ ቢያንስ አንድ ክፍል ያስቀምጣል። «አርትዕ» ክፍሎቹን ይቀይራል። «አጥፋ» (ቀይ) ረድፉን ያስወግዳል እና ማስታወቂያዎች ወደ ደረጃው የራሱ ጥቅሞች ይመለሳሉ። ምድብ እና ሀገር ሁለቱም ረድፎች ሲኖራቸው ሁለቱንም የሚጠቅሰው ረድፍ ያሸንፋል፣ ከዚያ የሀገሩ፣ ከዚያ የምድቡ።",
  "admin.monetisation.levelOverrides.guide.next": "የዚህን ደረጃ ዋጋዎች ይጨምሩ።",
  "admin.monetisation.productPrices.guide.what":
    "ይህ ምርት በገበያ እና በምድብ፣ ለተወሰነ ጊዜ ምን ያህል እንደሚያስከፍል። ሻጮች በክሬዲት ይከፍላሉ፤ የገንዘቡ መጠን ለኋላ ክፍያ ተጠብቆ ይቀመጣል። ትክክለኛ ዋጋ ከሌለ ሻጭ በዚያ ገበያ ይህን ምርት መግዛት አይችልም።",
  "admin.monetisation.productPrices.guide.col.scope":
    "ይህ ዋጋ የሚሸፍነው ገበያ እና ምድብ፤ «እያንዳንዱ ገበያ» እና «እያንዳንዱ ምድብ» መጠባበቂያዎቹ ናቸው።",
  "admin.monetisation.productPrices.guide.col.amount": "የገንዘብ ዋጋው፣ ወይም 0 ሲሆን ነጻ።",
  "admin.monetisation.productPrices.guide.col.creditCost": "ሻጭ በዚህ ምርት ላይ ስንት ክሬዲት እንደሚያወጣ።",
  "admin.monetisation.productPrices.guide.col.from": "ይህ ዋጋ የሚጀምርበት ቀን።",
  "admin.monetisation.productPrices.guide.col.to":
    "ይህ ዋጋ የሚያበቃበት ቀን፤ «ክፍት» ማለት መጨረሻ አልተቀመጠም ማለት ነው።",
  "admin.monetisation.productPrices.guide.col.used":
    "ሻጮች ይህን ዋጋ ስንት ጊዜ እንደከፈሉ፤ ጥቅም ላይ የዋለ ዋጋ ከእንግዲህ ሊስተካከል አይችልም።",
  "admin.monetisation.productPrices.guide.col.createdBy": "ይህን ዋጋ የጨመረው ማን ነው።",
  "admin.monetisation.productPrices.guide.col.updatedBy": "ይህን ዋጋ በመጨረሻ የቀየረው ማን ነው።",
  "admin.monetisation.productPrices.guide.col.updated": "ይህ ዋጋ በመጨረሻ የተቀየረበት ጊዜ።",
  "admin.monetisation.productPrices.guide.how":
    "«ዋጋ ጨምር» ገበያውን፣ ምድቡን እና ጊዜውን ይመርጣል፤ የአንድ ወሰን ሁለት ዋጋዎች በጊዜ በፍጹም አይደራረቡም። ዋጋው ጥቅም ላይ ሳይውል እና ንቁ እያለ «አርትዕ» ይቻላል። «አብቃ» (ቀይ) ንቁ ዋጋን ዛሬ ይዘጋል — ረድፉ እንደ መዝገብ ይቆያል። እዚህ ምንም አይሰላም፦ ሻጭ የሚከፍለው በጣም የተለየው ትክክለኛ ረድፍ ነው።",
  "admin.monetisation.productPrices.guide.next": "የነጻውን ዕቅድ የመለጠፍ ገደቦች ይመልከቱ።",
  "admin.monetisation.caps.guide.what":
    "ደረጃዎቹ እስኪረከቧቸው ድረስ ለእያንዳንዱ ሻጭ የነጻው ዕቅድ ገደቦች፦ ማስታወቂያ ስንት ቦታዎችን ሊሸፍን እንደሚችል፣ ስንት ፎቶ እንደሚይዝ፣ ምን ያህል እንደሚቆይ እና ሻጭ ስንት ማስታወቂያዎችን በአንድ ጊዜ ሊያስተላልፍ እንደሚችል።",
  "admin.monetisation.caps.guide.col.plan": "እነዚህ ገደቦች የሚመለከቱት ዕቅድ፤ ዛሬ ነጻው ዕቅድ።",
  "admin.monetisation.caps.guide.col.cities": "አንድ ማስታወቂያ ስንት ከተሞችን ሊሸፍን እንደሚችል።",
  "admin.monetisation.caps.guide.col.regions": "አንድ ማስታወቂያ ስንት ክልሎችን ሊሸፍን እንደሚችል።",
  "admin.monetisation.caps.guide.col.countries": "አንድ ማስታወቂያ ስንት ሀገሮችን ሊሸፍን እንደሚችል።",
  "admin.monetisation.caps.guide.col.photos": "ማስታወቂያ ስንት ፎቶ ሊይዝ እንደሚችል፤ የመለጠፍ ቅጹ ዛሬ ይህን ያነባል።",
  "admin.monetisation.caps.guide.col.days": "ምድቡ ቆይታ ሳያስቀምጥ ሲቀር ማስታወቂያ ስንት ቀን እንደሚቆይ።",
  "admin.monetisation.caps.guide.col.ads":
    "ሻጭ ስንት ማስታወቂያዎችን በአንድ ጊዜ ሊያስተላልፍ እንደሚችል፤ «ያልተገደበ» ማለት ገደብ የለም ማለት ነው።",
  "admin.monetisation.caps.guide.col.everywhere": "ማስታወቂያ በሁሉም ቦታ በአንድ ጊዜ ሊታይ ይችል እንደሆነ።",
  "admin.monetisation.caps.guide.col.updated": "እነዚህ ገደቦች በመጨረሻ የተቀየሩበት ጊዜ።",
  "admin.monetisation.caps.guide.how":
    "«ገደቦች አርትዕ» እያንዳንዱን ገደብ በአንድ መስኮት ይቀይራል፤ ከዝቅተኛው በታች ያለ ገደብ አይፈቀድም። ዕቅዶች እዚህ አይጨመሩም አይወገዱምም።",
  "admin.monetisation.caps.guide.next": "እዚህ ጨርሰዋል። ለአንድ ሀገር የሚከፈልባቸውን ደረጃዎች ለማብራት ወደ ገበያዎች ይመለሱ።",
  // P-1c turn (b) (D315) — the pages people use, in reading order of the site.
  "adPage.guide.what":
    "ይህ አንድ ማስታወቂያ ነው። ፎቶዎቹ፣ ዋጋው፣ ዝርዝሮቹ እና ቦታው የሻጩ የራሱ ቃላት ናቸው፤ ethio.com ማስታወቂያዎችን ይፈትሻል ነገር ግን ዕቃውን ለእርስዎ ማየት አይችልም።",
  "adPage.guide.part.photos": "ፎቶን በትልቁ ለማየት ይንኩት። ለቀጣዩ ያንሸራትቱ።",
  "adPage.guide.part.title": "ስሙ እና የሚጠየቀው ዋጋ። «ድርድር ይቻላል» የተባለ ዋጋ ሊወያይበት ይችላል።",
  "adPage.guide.part.facts": "ዋና ዋናዎቹ እውነታዎች፣ ከዚያም ሻጩ የሰጠው እያንዳንዱ ዝርዝር።",
  "adPage.guide.part.description": "ሻጩ የጻፈው፣ በራሱ ቃላት።",
  "adPage.guide.part.seller":
    "ማን እንደለጠፈው እና ከመቼ ጀምሮ። እንዴት እንደሚያገኟቸው ለማየት ይግቡ፤ ማስታወቂያው በጽሑፉ ውስጥ ስልክ ቁጥር አያሳይም።",
  "adPage.guide.part.location": "ዕቃው የሚገኝበት ወይም አገልግሎቱ የሚሸፍነው ቦታ።",
  "adPage.guide.part.save": "«አስቀምጥ» ማስታወቂያውን በተቀመጡ ገጽዎ ላይ ያቆየዋል። «አጋራ» አገናኙን ይልካል።",
  "adPage.guide.part.report":
    "አንድ ነገር ትክክል ካልሆነ — ማጭበርበር፣ የተሳሳተ ምድብ፣ የተሸጠ ዕቃ — ያመልክቱ፤ እያንዳንዱን ሪፖርት እንመለከታለን።",
  "adPage.guide.how":
    "በሕዝብ ቦታ ይገናኙ። ከመክፈልዎ በፊት ዕቃውን ይመልከቱ። ላላዩት ዕቃ ገንዘብ አስቀድመው በፍጹም አይላኩ፣ እንዲያዝልዎም ቅድመ ክፍያ በፍጹም አይክፈሉ። ሻጩ መጀመሪያ እንዲከፍሉ ካስገደደዎ ማስታወቂያውን ያመልክቱ። የባንክ ወይም የካርድ መረጃዎን በመልእክት በፍጹም አያጋሩ።",
  "adPage.guide.next": "የሚሸጡት ነገር አለዎት? የራስዎን ማስታወቂያ ይለጥፉ",
  "feed.guide.what": "በአቅራቢያዎ ያሉ ማስታወቂያዎች፣ አዳዲሶቹ መጀመሪያ። ቦታዎ ጥቂት ሲኖረው ከሰፊው አካባቢ የመጡ ማስታወቂያዎች ይከተላሉ።",
  "feed.guide.part.heading": "እየተመለከቱ ያሉት ቦታ፤ በምናሌው ውስጥ ይቀይሩት።",
  "feed.guide.part.favourite": "ኮከቡ ይህን ምድብ የመነሻ ገጽዎ ያደርገዋል።",
  "feed.guide.part.sections": "እያንዳንዱ ክፍል ማስታወቂያዎቹ የመጡበትን አካባቢ ይጠቅሳል።",
  "feed.guide.part.card": "የአንድ ማስታወቂያ ፎቶ፣ ዋጋ እና ቦታ። ሪባን የተሸጠን ወይም የጎላ ማስታወቂያን ያመለክታል።",
  "feed.guide.part.more": "«ተጨማሪ አሳይ» ቀጣዮቹን ማስታወቂያዎች ይጭናል።",
  "feed.guide.how":
    "ማስታወቂያውን ሙሉ ለማየት ይክፈቱት። በደህንነት ይግዙ፦ በሕዝብ ቦታ ይገናኙ፣ ዕቃውን መጀመሪያ ይመልከቱ፣ አስቀድመው በፍጹም አይክፈሉ፤ ትክክል ያልመሰለዎትን ማስታወቂያ ከራሱ ገጽ ያመልክቱ።",
  "feed.guide.next": "አንድ ነገር ይሽጡ፦ ማስታወቂያ ይለጥፉ",
  "sellerPage.guide.what": "የአንድ ሻጭ እያንዳንዱ ንቁ ማስታወቂያ።",
  "sellerPage.guide.part.seller": "የሻጩ ስም እና አባል ከሆኑ ምን ያህል ጊዜ እንደሆነ።",
  "sellerPage.guide.part.ads": "ማስታወቂያዎቻቸው፣ አዳዲሶቹ መጀመሪያ።",
  "sellerPage.guide.how":
    "ሻጩን ከዚያ ለማግኘት ማስታወቂያውን ይክፈቱ። እያንዳንዱን ዕቃ በራሱ ይመዝኑ፦ በሕዝብ ቦታ ይገናኙ እና ከመክፈልዎ በፊት ይመልከቱት።",
  "sellerPage.guide.next": "ሁሉንም ማስታወቂያዎች ይመልከቱ",
  "auth.guide.what": "ማስታወቂያዎችን ለማስቀመጥ፣ ሻጮችን ለማግኘት እና የራስዎን ለመለጠፍ ይግቡ።",
  "auth.guide.part.email": "የሚገቡበት አድራሻ፤ ማረጋገጫዎችን እዚህ እንልካለን።",
  "auth.guide.part.password": "ቢያንስ የታየው ርዝመት፤ የበርካታ ቃላት ሐረግ ጠንካራ እና ለማስታወስ ቀላል ነው።",
  "auth.guide.part.toggle": "አዲስ ነዎት? ወደ «መለያ ፍጠር» ይቀይሩ፤ አንድ ደቂቃ ይወስዳል።",
  "auth.guide.part.forgot": "«የይለፍ ቃል ረሳሁ» አዲስ ለማስቀመጥ አገናኝ ይልካል።",
  "auth.guide.part.google": "«በGoogle ይቀጥሉ» ያለ የይለፍ ቃል ያስገባዎታል።",
  "auth.guide.how": "ኢሜይልዎን እና የይለፍ ቃልዎን ያስገቡ፣ ከዚያ «ቀጥል»። ከገቡ በኋላ ወደነበሩበት ይመለሳሉ።",
  "auth.guide.next": "ሳይገቡ ይመልከቱ",
  "account.guide.what": "ሻጮች እና ገዢዎች እንደሚያዩት መገለጫዎ፣ እና ማስታወቂያዎችዎ በአጭሩ።",
  "account.guide.part.profile": "ስምዎ፣ የሻጭ ስምዎ እና አባል የሆኑበት ቀን።",
  "account.guide.part.channels": "ገዢዎች እርስዎን የሚያገኙባቸው መንገዶች፤ እያንዳንዱ በማስታወቂያዎችዎ ላይ ይታያል ወይም ይደበቃል።",
  "account.guide.part.counts": "ስንት ማስታወቂያዎች ንቁ፣ በመጠባበቅ ላይ ወይም ያበቁ እንዳሉዎት።",
  "account.guide.part.legal": "የተስማሙባቸው ውሎች እና መቼ።",
  "account.guide.how": "«መገለጫ አርትዕ» ስሙን እና መንገዶቹን ይቀይራል፤ ማስታወቂያዎችዎ ይከተላሉ።",
  "account.guide.next": "የመግቢያዎን እና የደህንነትዎን ይቀይሩ",
  "saved.guide.what": "ያስቀመጧቸው ማስታወቂያዎች፣ አዳዲሶቹ መጀመሪያ።",
  "saved.guide.part.item": "ማስታወቂያውን እንደገና ለመክፈት ይንኩ።",
  "saved.guide.part.remove": "«አስወግድ» ከዚህ ዝርዝር ያወጣዋል፤ ማስታወቂያው ንቁ ሆኖ ይቆያል።",
  "saved.guide.part.unavailable": "ግራጫ የሆነ ማስታወቂያ ተሸጧል ወይም ተወግዷል።",
  "saved.guide.how": "ማስታወቂያዎችን ከራሳቸው ገጽ በልቡ ምልክት ያስቀምጡ።",
  "saved.guide.next": "ተጨማሪ ማስታወቂያዎችን ያግኙ",
  "settings.guide.what": "እንዴት እንደሚገቡ እና መለያዎን ደህንነቱ እንደተጠበቀ እንደሚያቆዩ።",
  "settings.guide.part.identity": "በመለያዎ ላይ ያለው ኢሜይል እና ስም።",
  "settings.guide.part.methods": "የይለፍ ቃል እና Google፦ የመግቢያ መንገድ ይጨምሩ ወይም ያስወግዱ።",
  "settings.guide.part.mfa": "በገቡ ቁጥር ከስልክዎ የሚመጣ ኮድ — ለሻጮች በጥብቅ ይመከራል።",
  "settings.guide.part.security": "የት እንደገቡ፤ የጠፋ መሣሪያን ከዚህ ያስወጡ።",
  "settings.guide.part.device": "የዚህ መሣሪያ ቋንቋ እና ቅንብሮች።",
  "settings.guide.how": "እያንዳንዱ ለውጥ መጀመሪያ የይለፍ ቃልዎን ወይም ኮድዎን ይጠይቃል።",
  "settings.guide.next": "ወደ መለያዎ ይመለሱ",
  "myListings.guide.what": "የለጠፉት እያንዳንዱ ማስታወቂያ እና እያንዳንዱ የት እንደደረሰ።",
  "myListings.guide.col.photo": "የሽፋን ፎቶው።",
  "myListings.guide.col.title": "የማስታወቂያው ስም።",
  "myListings.guide.col.price": "የሚጠየቀው ዋጋ።",
  "myListings.guide.col.state": "ረቂቅ፣ ፍተሻ በመጠባበቅ ላይ፣ ንቁ፣ ያበቃ ወይም የተወገደ።",
  "myListings.guide.col.posted": "ንቁ የሆነበት ጊዜ።",
  "myListings.guide.col.expires": "የሚያበቃበት ጊዜ፤ ከገጹ ያድሱት።",
  "myListings.guide.how":
    "ለማርትዕ፣ ለማደስ፣ «ተሸጧል» ለማለት ወይም ለመሰረዝ ማስታወቂያውን ይክፈቱ። እያንዳንዱ ገበያ የተወሰኑ መደበኛ ማስታወቂያዎችን ያለ ክፍያ ንቁ እንዲያቆዩ ይፈቅዳል።",
  "myListings.guide.next": "አዲስ ማስታወቂያ ይለጥፉ",
  "myListing.guide.what": "ከማስታወቂያዎችዎ አንዱ፦ ሁኔታው፣ ቀናቱ እና በእሱ ምን ማድረግ እንደሚችሉ።",
  "myListing.guide.part.actions": "አርትዕ፣ ረቂቅ ይቀጥሉ፣ ይቅዱ፣ ይሰርዙ ወይም የሕዝብ ገጹን ይክፈቱ።",
  "myListing.guide.part.state": "ማስታወቂያው የት እንደደረሰ እና ማን ሊያየው እንደሚችል።",
  "myListing.guide.part.dates": "የተለጠፈበት፣ የታደሰበት፣ የሚያበቃበት እና የተሸጠበት ቀናት።",
  "myListing.guide.part.problem": "ፍተሻው አንድ ነገር ካገኘ እዚህ ከሚቀየረው ጋር ይጠቀሳል።",
  "myListing.guide.part.history": "እያንዳንዱ ለውጥ እና ፍተሻ፣ አዳዲሶቹ መጀመሪያ።",
  "myListing.guide.how": "የተስተካከለ ንቁ ማስታወቂያ ለውጡ ከመታየቱ በፊት እንደገና ይፈተሻል።",
  "myListing.guide.next": "ወደ የእኔ ማስታወቂያዎች ይመለሱ",
  "post.guide.what": "በስምንት አጫጭር ደረጃዎች ማስታወቂያ ይለጥፉ። ረቂቅዎ በራሱ ይቀመጣል፤ በማንኛውም ጊዜ ይመለሱ።",
  "post.guide.part.category": "ገዢዎች የት እንደሚፈልጉት ይምረጡ።",
  "post.guide.part.photos": "ግልጽ ፎቶዎች፣ ዕቅድዎ እስከሚያሳየው ቁጥር ድረስ፤ የመጀመሪያው ሽፋኑ ነው።",
  "post.guide.part.specifications": "የዚህ ምድብ እውነታዎች — መጠን፣ ብራንድ፣ ዓመት።",
  "post.guide.part.details":
    "በራስዎ ቃላት ርዕስ እና መግለጫ። ስልክ ቁጥሮችን ከጽሑፉ ውጭ ያድርጉ፤ ገዢዎች በመገናኛ ደረጃው በኩል ያገኙዎታል።",
  "post.guide.part.price": "ዋጋ፣ ወይም ነጻ፣ ወይም ምድቡ በሚፈቅድበት ድርድር።",
  "post.guide.part.place": "ዕቃው የሚገኝበት ከተማ፤ ፒን በአቅራቢያ ያሉ ገዢዎችን ይረዳል።",
  "post.guide.part.contact": "የሻጭ ስምዎ እና ገዢዎች እርስዎን የሚያገኙባቸው መንገዶች።",
  "post.guide.part.review": "ሁሉንም ይፈትሹ፣ ከዚያ ያስገቡ፤ ማስታወቂያው ከፈጣን ፍተሻ በኋላ ንቁ ይሆናል።",
  "post.guide.how":
    "«ቀጣይ» ሲጫኑ እያንዳንዱ ደረጃ ይቀመጣል። በጽሑፉ ውስጥ ያለ ስልክ ቁጥር፣ በጣም ብዙ ፎቶዎች ወይም ከዕቅድዎ ውጭ ያለ ቦታ ምን እንደሚቀየር በሚገልጽ ማስታወሻ አይፈቀድም።",
  "post.guide.next": "ማስታወቂያዎችዎን እና ሁኔታቸውን ይመልከቱ",
  "post.edit.guide.what": "ንቁ ማስታወቂያን ይቀይሩ። ለውጡ እስኪፈተሽ ድረስ ማስታወቂያው እንደነበረ ይታያል።",
  "post.edit.guide.how":
    "ማንኛውንም ደረጃ ይቀይሩ፣ ከዚያ ከ«ግምገማ» ያስቀምጡ። የተቀየረ ጽሑፍ፣ ፎቶ ወይም ዋጋ ከመታየቱ በፊት እንደገና ይፈተሻል።",
  "post.edit.guide.next": "ወደ የእኔ ማስታወቂያዎች ይመለሱ",
};
