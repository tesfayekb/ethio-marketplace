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
  "admin.ai.features.guide.what":
    "ጣቢያው የሚጠቀምበት እያንዳንዱ የውጭ የሰው ሰራሽ አስተውሎት አገልግሎት — የፎቶ ምርመራ፣ የመጻፍ እገዛ፣ የሻጭ ስም ፍተሻ፣ የምድብ ምስሎች እና አዶዎች፣ የማሽን ትርጉም፣ ዳራ ማስወገድ — ከማብሪያው፣ ከወርሃዊ በጀቱ እና በዚህ ወር ካስወጣው ጋር።",
  "admin.ai.features.guide.col.feature": "አገልግሎቱ እና ከሥሩ ምን እንደሚሠራ እና የትኛው አቅራቢ እንደሚመልስ።",
  "admin.ai.features.guide.col.state":
    "በርቷል፣ ወይም ጠፍቷል ከምክንያቱ ጋር፦ በሠራተኞች ጠፍቷል፣ ወይም ወርሃዊ በጀቱ ተደርሷል። በበጀት የጠፋ አገልግሎት በሚቀጥለው ወር ወይም በጀቱ ሲጨመር ይመለሳል።",
  "admin.ai.features.guide.col.spend":
    "ይህ አገልግሎት በዚህ ወር ከበጀቱ አንጻር ምን ያህል እንዳስወጣ፤ በጀቱ 80 % ሲደርስ እና ሲሞላ ማስጠንቀቂያ ይታያል።",
  "admin.ai.features.guide.col.calls": "በዚህ ወር እና ዛሬ ስንት ጥሪዎች፤ ለማሽን ትርጉም ፊደላቱም ጭምር።",
  "admin.ai.features.guide.col.price":
    "አንድ ጥሪ ምን ያህል እንደሚያስከፍል — ወይም ለማሽን ትርጉም አንድ ሚሊዮን ፊደላት። ሠራተኞች ያስቀምጡታል፤ የአቅራቢው ሂሳብ የመጨረሻው አኃዝ ነው።",
  "admin.ai.features.guide.col.updated": "ማብሪያው፣ በጀቱ ወይም ዋጋው በመጨረሻ የተቀየረበት ቀን።",
  "admin.ai.features.guide.how":
    "«አርትዕ» ማብሪያውን፣ በጀቱን በዶላር (ባዶ ማለት በጀት የለም ማለት ነው) እና ዋጋውን ይቀይራል፤ የማረጋገጫ ኮድዎን ይጠይቃል። በጀቱ ሲሞላ አገልግሎት ራሱን ያጠፋል። የፎቶ ምርመራ ጠፍቶ እያለ የአዲስ ማስታወቂያ ፎቶዎች ለሠራተኞች ይያዛሉ፤ ማስታወቂያውን ማጽደቅ እነሱንም ያጸድቃል፤ በቀጥታ ያለ ማስታወቂያ አዲስ ፎቶ መውሰድ አይችልም። ወጪው ከበጀቱ በላይ እያለ አገልግሎት ሊበራ አይችልም — መጀመሪያ በጀቱን ይጨምሩ።",
  "admin.ai.features.guide.next": "የቅርብ ጊዜ ጥሪዎችን እና እያንዳንዱ እንዴት እንዳበቃ ይመልከቱ።",
  "admin.ai.log.guide.what":
    "ያለፉት 90 ቀናት እያንዳንዱ የሰው ሰራሽ አስተውሎት ጥሪ፣ አዲሱ መጀመሪያ — የትኛው አገልግሎት እንደጠየቀ፣ የትኛው ሞዴል እንደመለሰ እና እንዴት እንዳበቃ። የተላኩ ጥያቄዎች፣ ፎቶዎች እና መልሶች በፍጹም አይቀመጡም።",
  "admin.ai.log.guide.col.time": "ጥሪው የተደረገበት ጊዜ።",
  "admin.ai.log.guide.col.feature": "ጥሪውን ያደረገው አገልግሎት።",
  "admin.ai.log.guide.col.model": "የመለሰው የአቅራቢው ሞዴል።",
  "admin.ai.log.guide.col.outcome":
    "ተመልሷል፣ ወይም ለምን እንዳልተመለሰ፦ ጠፍቷል፣ ከበጀት በላይ፣ አይገኝም፣ ጊዜው አልፏል፣ የአቅራቢ ስህተት ወይም የማይጠቅም መልስ።",
  "admin.ai.log.guide.col.latency": "አቅራቢው ለመመለስ የፈጀበት ጊዜ፣ በሚሊሰከንድ።",
  "admin.ai.log.guide.col.person":
    "ጥሪው ለማን እንደነበር — የሰው ስም፣ ለጣቢያው የራሱ ሥራዎች «ሥርዓት»፣ ወይም የሰዎችን ስም ማየት ካልተፈቀደልዎ «የተደበቀ»።",
  "admin.ai.log.guide.how":
    "ከመሣሪያ አሞሌው በአገልግሎት ወይም በውጤት ያጣሩ። እዚህ ምንም ሊቀየር አይችልም፤ ከ90 ቀን በላይ ያረጁ ረድፎች በራሳቸው ይወገዳሉ። በተከታታይ ብዙ የከሸፉ ጥሪዎች አቅራቢውን ወይም የጠፋ አገልግሎትን ያመለክታሉ — ከላይ ያለውን ሠንጠረዥ ይመልከቱ።",
  "admin.ai.log.guide.next": "የበጀት ማስጠንቀቂያዎች እና መጥፋቶች በኦዲት መዝገብም ይጻፋሉ።",
  "admin.attributes.guide.what":
    "ማስታወቂያ ሊይዛቸው የሚችላቸው እውነታዎች ቤተ መጻሕፍት — መጠን፣ የምርት ስም፣ ዓመት፣ ሁኔታ። እያንዳንዱ ባህሪ አንድ ጊዜ ይገለጻል እና ለሚጠይቁት ምድቦች ይያያዛል፤ ስለዚህ በእነዚያ ምድቦች ያለ እያንዳንዱ ማስታወቂያ ተመሳሳይ ጥያቄ ይጠይቃል።",
  "admin.attributes.guide.col.name":
    "ሻጮች እንደሚያዩት ጥያቄው፣ ከሥሩ ቋሚ ቁልፉ። «ከ… የተወረሰ» ወላጅ ምድብ የሚያወርሰውን ጥያቄ ያመለክታል።",
  "admin.attributes.guide.col.type":
    "የመልሱ ዓይነት፦ ጽሑፍ፣ ቁጥር፣ አንድ ምርጫ፣ ብዙ ምርጫ፣ አዎ ወይም አይደለም፣ ቀን ወይም ክልል።",
  "admin.attributes.guide.col.options":
    "የምርጫ ጥያቄ ስንት መልሶችን እንደሚያቀርብ፤ ለሌሎች ዓይነቶች ሰረዝ። ለማንበብ ረድፉን ይክፈቱ።",
  "admin.attributes.guide.col.coverage": "ከአማራጮቹ ስንቱ የአማርኛ መለያ እንዳላቸው፤ አንዳንዶቹ እስኪሟሉ ድረስ ብርቱካናማ።",
  "admin.attributes.guide.col.usage": "ይህን ጥያቄ የሚጠይቁት ምድቦች።",
  "admin.attributes.guide.how":
    "«አዲስ ባህሪ» ጥያቄ ይገልጻል፤ «አርትዕ» ቃላቱን፣ እገዛውን እና አማራጮቹን ይቀይራል — የጽሑፍ ጥያቄ የጣቢያውን አስቀድመው የተቀመጡ ፍተሻዎች ብቻ ይወስዳል። «ወደ ምድብ መድብ» ያያይዘዋል፤ «ከምድብ አስወግድ» ይለየዋል። አንድ ምድብ አሁንም እየተጠቀመበት እያለ «ሰርዝ» (ቀይ) አይፈቀድም። «አዋህድ» ሁለት ባህሪያትን ወደ አንድ ያጣምራል። «ባህርያትን አስገባ» እና «ባህርያትን ላክ» ቤተ መጻሕፍቱን እንደ ፋይል ያጓጉዛሉ፤ «ላክ» ያጣሩበትን ምድብ ይከተላል። ሻጮች ከእንግዲህ መምረጥ የሌለባቸው አማራጭ ይጠፋል እንጂ አይሰረዝም።",
  "admin.attributes.guide.next": "ጥያቄዎችን ለምድብ ያያይዙ እና በካርዶቹ ላይ የትኞቹ እንደሚታዩ ይምረጡ።",
  "admin.categories.guide.what":
    "ሰዎች የሚያስሱበት እና የሚለጥፉበት ዛፍ፦ ዋና ምድቦች፣ ንዑስ ምድቦቻቸው እና ሲያስፈልግ አጠቃላይ ምድብ። ሻጮች የሚለጥፉት ከሥሩ ምንም በሌለው ምድብ ውስጥ ብቻ ነው።",
  "admin.categories.guide.col.name":
    "የምድቡ አዶ እና የእንግሊዝኛ ስም፣ ከአድራሻ ስሌጉ ጋር፤ በዛፉ ውስጥ ባለው ጥልቀት ልክ ወደ ውስጥ ገብቷል።",
  "admin.categories.guide.col.parent":
    "ከሥሩ የሚቀመጥበት ምድብ፤ «በተጨማሪ በ» የሚታይባቸውን ሌሎች ቦታዎች ይጠቅሳል። ዋና ምድብ ወላጅ የለውም።",
  "admin.categories.guide.col.status": "ንቁ፣ መርሐ የተያዘለት (ከወደፊት ቀን ጀምሮ የሚታይ) ወይም የተቋረጠ።",
  "admin.categories.guide.col.flags":
    "አጠቃላይ፤ ማስታወቂያዎችን ይቀበል፣ ዋጋ ይጠይቅ ወይም የመታያ ጊዜ ይኑረው እንደሆነ፤ ለጎደለ ምስል ወይም አዶ እና ከሁለት በታች ለሆኑ የካርድ ባህሪያት ብርቱካናማ ማስጠንቀቂያዎች።",
  "admin.categories.guide.col.order": "በእኩዮቹ መካከል ያለው ቦታ።",
  "admin.categories.guide.col.listings": "ስንት ማስታወቂያዎችን እንደያዘ።",
  "admin.categories.guide.col.exclusions": "በስንት ሀገሮች ውስጥ እንደተደበቀ።",
  "admin.categories.guide.how":
    "«ምድብ ፍጠር» አንድ አንጓ ይጨምራል። ረድፉ አርታዒውን ይከፍታል፦ «አርትዕ» ስሙን፣ አዶውን፣ የማስታወቂያ ቆይታውን እና ማስታወቂያ መቀበሉን እና ዋጋ መጠየቁን ይቀይራል፤ «ታይነት» የሚታይባቸውን ቀናት ያስቀምጣል፤ «ምስል» ምስሉን ያመነጫል እና ይቀበላል፤ «ጠቋሚ ጨምር» በሌላ ወላጅ ሥርም ያሳየዋል፤ «አገሮች» በተመረጡ ሀገሮች ውስጥ ይደብቀዋል፤ «ባህሪያት» ማስታወቂያዎቹ የሚጠይቋቸውን ጥያቄዎች ይመርጣል። «ወደ ላይ አንቀሳቅስ» እና «ወደ ታች አንቀሳቅስ» እኩዮችን ይደረድራሉ። «ጡረታ አውጣ» ምድብን ከአገልግሎት ያወጣል — በቀጥታ ያሉ ማስታወቂያዎች ካሉት የት እንደሚሄዱ ይመርጣሉ፤ «እንደገና አንቃ» ይመልሰዋል፤ «ሰርዝ» (ቀይ) የተቋረጠን ብቻ ያስወግዳል። «የጎደሉትን አመንጭ» የታዩት ረድፎች የሚጎድሏቸውን ምስሎች ከሰው ሰራሽ አስተውሎት ይጠይቃል፤ «ምድቦችን አስገባ» እና «ምድቦችን ላክ» ዛፉን እንደ ፋይል ያጓጉዛሉ። ለውጦች የማረጋገጫ ኮድዎን ይጠይቃሉ።",
  "admin.categories.guide.next": "ምድቦች የሚጠይቋቸውን ጥያቄዎች ይግለጹ።",
  "admin.countries.guide.what":
    "ጣቢያው ሊያገለግላቸው የሚችላቸው እያንዳንዱ ሀገር፣ ክፍት ወይም ዝግ። ረድፍ መለኪያዎቹን እና ገንዘቡን፣ የራሱን የዋና ምድቦች ቅደም ተከተል እና እዚያ ያሉ ሰዎች መለጠፍ እና ማሰስ ይችሉ እንደሆነ ያስቀምጣል።",
  "admin.countries.guide.col.name": "የሀገሩ የእንግሊዝኛ ስም እና ባለ ሁለት ፊደል ኮዱ።",
  "admin.countries.guide.col.status":
    "ክፍት — ሰዎች እዚህ መለጠፍ እና ማሰስ ይችላሉ — ወይም ዝግ፣ አስተዳዳሪ እስኪከፍተው ድረስ አይቀርብም።",
  "admin.countries.guide.col.places": "እዚህ ያሉ ንቁ ቦታዎች፣ በመዝገብ ላይ ካሉት ቦታዎች ሁሉ።",
  "admin.countries.guide.col.units": "ሜትሪክ ወይም ኢምፔሪያል፣ እና ማስታወቂያዎች የሚተመኑበት ገንዘብ።",
  "admin.countries.guide.col.rail": "ይህ ገበያ ለራሱ ስንት ዋና ምድቦችን እንደሚደረድር፤ 0 ዓለም አቀፉን ቅደም ተከተል ይከተላል።",
  "admin.countries.guide.col.roles": "ስንት የሠራተኞች ሚና ፈቃዶች በዚህ ሀገር እንደተገደቡ።",
  "admin.countries.guide.col.updated": "ረድፉ በመጨረሻ የተቀየረበት ጊዜ።",
  "admin.countries.guide.how":
    "«አርትዕ» ስሙን፣ መለኪያዎቹን እና ገንዘቡን ያስቀምጣል፤ «የዋና ምድቦች ቅደም ተከተል» የዚህን ገበያ የዋና ምድቦች ቅደም ተከተል ያስቀምጣል። «ይህን ገበያ ክፈት» እና «ይህን ገበያ ዝጋ» ገበያውን ይቀያይራሉ — መክፈት መልህቅ ቦታውንም ያነቃል፤ ሁለቱም የማረጋገጫ ኮድዎን ይጠይቃሉ። በእሱ የተገደቡ የሠራተኞች ሚናዎች ያሉትን ሀገር መዝጋት እንዲያረጋግጡ ይጠይቃል፤ ፈቃዶቹ ይጠበቃሉ። ሀገሮች የገበያዎችን ፋይል በማስገባት ይጨመራሉ፣ በፍጹም አንድ በአንድ አይደለም፤ «አገሮችን አውርድ» ያንን ፋይል ይሰጥዎታል።",
  "admin.countries.guide.next": "ሀገሩን ከመክፈትዎ በፊት ቦታዎቹን ይገንቡ እና ያንቁ።",
  "admin.listings.guide.what":
    "ከረቂቆች በስተቀር በጣቢያው ላይ ያለ እያንዳንዱ ማስታወቂያ — በቀጥታ፣ በመጠባበቅ ላይ፣ ያበቃ ወይም የተወገደ — አዲሱ መጀመሪያ። ታሪኩን ለማየት እና እርምጃ ለመውሰድ ማስታወቂያውን ይክፈቱ።",
  "admin.listings.guide.col.title":
    "የማስታወቂያው ስም፤ ከሥሩ ያለ መስመር ፎቶ ከማስታወቂያው ጋር ላይስማማ ሲችል ያስጠነቅቃል። የማስታወቂያውን ገጽ ለመድረስ ይክፈቱት።",
  "admin.listings.guide.col.seller": "የሻጩ የሕዝብ ስም — እንደ ንግድ ሲለጥፉ የንግዱ ስም — እና ማየት ሲፈቀድልዎ ኢሜይላቸው።",
  "admin.listings.guide.col.place": "ማስታወቂያው ያለበት ከተማ እና ሀገሩ።",
  "admin.listings.guide.col.category": "የተለጠፈበት ምድብ።",
  "admin.listings.guide.col.price": "የሚጠየቀው ዋጋ ከመለኪያው ጋር።",
  "admin.listings.guide.col.status":
    "በቀጥታ፣ የተቀነሰ ተደራሽነት፣ ግምገማ በመጠበቅ ላይ፣ የተያዘ፣ ጊዜው ያለፈ፣ የተሸጠ፣ ውድቅ የተደረገ፣ የተዘጋ ወይም የተወገደ፤ ማስታወቂያው ሲኖረው ደረጃው፤ ማስታወቂያዎችን ሲገመግሙ ክፍት ሪፖርቶቹ።",
  "admin.listings.guide.col.posted": "መጀመሪያ በቀጥታ የወጣበት ጊዜ።",
  "admin.listings.guide.col.expires": "የሚያበቃበት ጊዜ።",
  "admin.listings.guide.how":
    "ክኒኖቹ በ«ሁሉም»፣ «በቀጥታ»፣ «በመጠባበቅ ላይ ያሉ»፣ «ያበቁ» እና «የተወገዱ» መካከል ይቀያይራሉ፤ በርዕስ ቃላት ወይም በማስታወቂያ መለያ ይፈልጉ፤ በሀገር፣ በምድብ፣ በሻጭ፣ በቀን እና በደረጃ ያጣሩ። የረድፉ ምናሌ «ክፈት»፣ «ለግምገማ መልስ»፣ «ወደነበረበት መልስ»፣ «ደረጃ አስቀምጥ»፣ «እንደ ሻጩ ይመልከቱ» እና «አስወግድ» (ቀይ) ያቀርባል፤ እያንዳንዱ እርምጃ ምክንያት፣ ለሻጩ ማስታወሻ እና የማረጋገጫ ኮድዎን ይጠይቃል፣ ሻጩም ይነገረዋል። ብዙ ማስታወቂያዎችን በአንድ ላይ ለማስወገድ ወይም ለመመለስ ምልክት ያድርጉባቸው። ማስታወቂያ ማረም እና ፎቶ ማስወገድ በማስታወቂያው ገጽ ላይ ይደረጋሉ። «ቅንብሮች» ሻጮች ጊዜው ያለፈ ማስታወቂያ ማደስ ይችሉ እንደሆነ እና ለስንት ቀን ያስቀምጣል። የራስዎ ማስታወቂያዎች እዚህ ሊንቀሳቀሱ ወይም ሊታረሙ አይችሉም።",
  "admin.listings.guide.next": "ማጽደቅ የሚጠብቁትን ማስታወቂያዎች ይገምግሙ።",
  "admin.locations.guide.what":
    "ሰዎች የሚለጥፉበት እና የሚያስሱበት እያንዳንዱ ቦታ — ክልሎች፣ ከተሞች እና ክፍለ ከተሞች ከሀገራቸው ሥር። የቦታ መንገድ በጣቢያው ላይ ያለው ቋሚ አድራሻው ነው።",
  "admin.locations.guide.col.name": "የቦታው የእንግሊዝኛ ስም እና ደረጃው።",
  "admin.locations.guide.col.path": "የሚገኝበት፦ ሀገር፣ ክልል፣ ከተማ።",
  "admin.locations.guide.col.status": "ገባሪ ወይም የተቋረጠ። አዲስ ቦታ እስኪያገብሩት ድረስ ተቋርጦ ይወለዳል።",
  "admin.locations.guide.col.counts": "እዚህ የተለጠፉ ማስታወቂያዎች · የሻጭ ሽፋን ረድፎች · እዚህ ነባሪ የሆኑ መገለጫዎች።",
  "admin.locations.guide.col.order": "በእኩዮቹ መካከል ያለው ቦታ።",
  "admin.locations.guide.col.aliases": "ስንት ሌሎች ስሞች እና አጻጻፎች ይህን ቦታ በፍለጋ እንደሚያገኙ።",
  "admin.locations.guide.col.iso": "ሲኖረው የISO 3166-2 ኮዱ።",
  "admin.locations.guide.how":
    "«ቦታ ጨምር» በተመረጠ ቦታ ውስጥ ልጅ ይጨምራል — ተቋርጦ ይወለዳል፤ «አስተካክል» ስሙን፣ ተለዋጭ ስሞቹን፣ ኮዱን እና መሃሉን ይቀይራል፤ «አግብር» እና «አቋርጥ» ይቀያይሩታል — ቦታ የሚገበረው ከወላጁ በኋላ ብቻ ነው፤ «አንቀሳቅስ» በሌላ ወላጅ ሥር ያስቀምጠዋል፤ «የአጎራባቾችን ቅደም ተከተል ቀይር» ቅደም ተከተሉን ይቀይራል። «አጥፋ» (ቀይ) ቋሚ ነው፣ የቦታውን አድራሻ እንዲተይቡ ይጠይቃል፣ እና አንድ ነገር አሁንም እየጠቆመው እያለ — ልጆች፣ ማስታወቂያዎች፣ የሽፋን ረድፎች ወይም መገለጫዎች — አይፈቀድም። «ቦታዎችን አስገባ» እና «ቦታዎችን አውርድ» የገበያዎችን እና የቦታዎችን ፋይሎች ያጓጉዛሉ፣ ባጣሩበት ሀገር ተገድበው። ማንቀሳቀስ እና ማጥፋት የማረጋገጫ ኮድዎን ይጠይቃሉ።",
  "admin.locations.guide.next": "ቦታዎቹ ገባሪ ከሆኑ በኋላ ሀገሩን ይክፈቱ።",
  "admin.screening.guide.what": "ውሳኔ የሚጠብቁ ማስታወቂያዎች፣ አሮጌው መጀመሪያ። እስኪያጸድቁት ድረስ ማንም ገዢ ማስታወቂያ አያይም።",
  "admin.screening.guide.col.title": "የማስታወቂያው ስም፤ ከሥሩ ያለ መስመር ፎቶ ከማስታወቂያው ጋር ላይስማማ ሲችል ያስጠነቅቃል።",
  "admin.screening.guide.col.category": "ሻጩ የመረጠው ምድብ።",
  "admin.screening.guide.col.place": "ማስታወቂያው ያለበት ከተማ።",
  "admin.screening.guide.col.sent": "ሻጩ ለግምገማ የላከበት ጊዜ።",
  "admin.screening.guide.how":
    "«ገዢዎች እንደሚያዩት ይመልከቱ» ማስታወቂያውን ገዢዎች እንደሚያዩት፣ ከሻጩ የሕዝብ ስም እና የመገናኛ መንገዶች ጋር ያሳያል፤ «ቁጥሩን አሳይ» ቁጥር ይገልጣል እና የኦዲት ረድፍ ይጽፋል። «አጽድቅ» ማስታወቂያውን ያትማል፤ «ውድቅ አድርግ» (ቀይ) ይከለክለዋል፤ ሁለቱም እንዲያረጋግጡ እና የማረጋገጫ ኮድዎን ይጠይቃሉ። ብዙ ማስታወቂያዎችን በአንድ ላይ ለመወሰን ምልክት ያድርጉባቸው። ከቅድመ እይታው «አርትዕ» ማስታወቂያውን በአዋቂው ውስጥ ይከፍታል፤ «ተጠናቋል» ወደ ቅድመ እይታው ይመልስዎታል። ከወረፋው በታች ለግምገማ የተያዙ ፎቶዎች፣ ለግምገማ የተያዙ የሻጭ ስሞች እና በቀጥታ ባሉ ማስታወቂያዎች ላይ የተደረጉ የፎቶ ለውጦች ይገኛሉ።",
  "admin.screening.guide.next": "ሰው ሰራሽ አስተውሎቱ የያዛቸውን የሻጭ ስሞች ይወስኑ።",
  "admin.screening.names.guide.what":
    "የሰው ሰራሽ አስተውሎት ፍተሻ ታዋቂ ኩባንያን፣ የምርት ስምን ወይም ሰውን ሊመስሉ ይችላሉ ያላቸው የሻጭ ስሞች። የተያዘ ስም እስኪወስኑ ድረስ ከገዢዎች ይደበቃል፤ ፍተሻው ሊፈትሸው ያልቻለው ስም ይታያል።",
  "admin.screening.names.guide.col.name":
    "ስሙ እና ፍተሻው ይመስለዋል ያለው። «ስሙ ተደብቋል» ማለት የሰዎችን ስም ማየት አልተፈቀደልዎም ማለት ነው።",
  "admin.screening.names.guide.col.since": "ስሙ የተያዘበት ጊዜ።",
  "admin.screening.names.guide.col.attempts": "ፍተሻው በዚህ ስም ላይ ስንት ጊዜ እንደሮጠ።",
  "admin.screening.names.guide.col.owner": "ስሙ የሚገኝበት መለያ፤ የተጠቃሚ ገጹን ይከፍታል።",
  "admin.screening.names.guide.how":
    "«ይህን ስም ፍቀድ» ለገዢዎች እንደገና ያሳየዋል፣ በኦዲት መዝገብ ከሚቀመጥ አማራጭ ምክንያት ጋር፤ የማረጋገጫ ኮድዎን ይጠይቃል። «ስሙን ቀይር» የባለቤቱን የተጠቃሚ ገጽ ይከፍታል፣ የመገለጫ አርታዒው ስሙን የሚቀይርበት። ዝርዝሩ ከተጫነ በኋላ ስሙ ከተቀየረ ምንም አይጻፍም — እንደገና ይጫኑ። ከላይ ያለው መስመር ድጋሚ ፍተሻው በመጨረሻ መቼ እንደሮጠ ይናገራል እና ሲቆም እንዲቀጥሉት ያስችልዎታል።",
  "admin.screening.names.guide.next": "ስሙን ለመቀየር የሻጩን መለያ ያግኙ።",
  "admin.audit.guide.what":
    "እያንዳንዱ የሠራተኞች እርምጃ እና የደህንነት ክንውን፣ አዲሱ መጀመሪያ — ማን ምን እንዳደረገ፣ በየትኛው መዝገብ ላይ እና መቼ። ከላይ ያሉት አኃዞች እና የ14 ቀን ገበታ ተመሳሳይ ረድፎችን ይቆጥራሉ።",
  "admin.audit.guide.col.time": "የተከሰተበት ጊዜ።",
  "admin.audit.guide.col.actor": "ማን እንዳደረገው፤ ለጣቢያው የራሱ ሥራዎች «ሥርዓት»።",
  "admin.audit.guide.col.action": "ምን እንደተደረገ፣ ሥርዓቱ እንደሚጠራው።",
  "admin.audit.guide.col.entity": "የነካው የመዝገብ ዓይነት እና የመለያው መጀመሪያ።",
  "admin.audit.guide.col.meta":
    "ከእሱ ጋር የተመዘገቡት ዝርዝሮች — ከዚህ በፊት እና በኋላ ያሉ እሴቶች፣ ምክንያት፣ ቁጥር። እያንዳንዱን ጥንድ ለማንበብ ረድፍ ይክፈቱ።",
  "admin.audit.guide.how":
    "ይፈልጉ፣ በእርምጃ፣ በአካል ዓይነት እና በቀናት ያጣሩ፣ እና ገጽ በገጽ ይመልከቱ። እዚህ ምንም ሊቀየር ወይም ሊሰረዝ አይችልም።",
  "admin.audit.guide.next": "ማን የትኛውን ሚና እንደያዘ ይመልከቱ።",
  "impersonation.listings.guide.what":
    "እየተመለከቱት ያለው መለያ ማስታወቂያዎች፣ ለንባብ ብቻ። ውሂባቸውን ያያሉ፤ እንደ እነሱ እየሠሩ አይደለም፣ እና እዚህ ምንም አይቀይረውም።",
  "impersonation.listings.guide.col.title": "የማስታወቂያው ስም።",
  "impersonation.listings.guide.col.status":
    "ማስታወቂያው ያለበት ሁኔታ፦ ረቂቅ፣ በመጠባበቅ ላይ፣ በቀጥታ፣ ያበቃ ወይም የተወገደ።",
  "impersonation.listings.guide.col.price": "የሚጠየቀው ዋጋ።",
  "impersonation.listings.guide.col.created": "ሻጩ የፈጠረበት ጊዜ።",
  "impersonation.listings.guide.how":
    "ክፍለ ጊዜው ከ15 ደቂቃ በኋላ በራሱ ያበቃል፣ ወይም በ«አሁን አቁም»። መጀመሪያውና መጨረሻው ከሁለቱም ስሞች ጋር በኦዲት መዝገብ ይጻፋሉ።",
  "impersonation.listings.guide.next": "ወደ ሰውዬው መለያ ይመለሱ።",
  "admin.roles.guide.what":
    "የሠራተኞች ሚናዎች እና እያንዳንዱ ምን ማድረግ እንደሚችል። የሥርዓት ሚና በጣቢያው የተወሰነ ነው፤ ብጁ ሚና እርስዎ የሚቀርጹት ነው።",
  "admin.roles.guide.col.name": "የሚናው ቋሚ ቁልፍ።",
  "admin.roles.guide.col.display": "ሠራተኞች የሚያዩት ስም።",
  "admin.roles.guide.col.kind": "የሥርዓት — በጣቢያው የተወሰነ — ወይም ብጁ።",
  "admin.roles.guide.col.members": "ስንት ሰዎች እንደያዙት።",
  "admin.roles.guide.col.permissions": "ስንት ፈቃዶችን እንደሚሰጥ።",
  "admin.roles.guide.how":
    "«ሚና ፍጠር» ብጁ ሚና ይጨምራል፤ የማረጋገጫ ኮድዎን ይጠይቃል። ፈቃዶቹን ለመስጠት ወይም ለመንሳት፣ አባላቱን ለማየት ወይም ለመሰረዝ ረድፍ ይክፈቱ — አባላት ያሉት ሚና ሊሰረዝ አይችልም፣ የሥርዓት ሚናም ሊቀየር አይችልም። አንዳንድ ፈቃዶች ለሥርዓት ሚናዎች የተያዙ ናቸው እና ለብጁ ሚና ሊሰጡ አይችሉም። «አባላትን ተመልከት» የተጠቃሚዎችን ዝርዝር በሚናው ተጣርቶ ይከፍታል።",
  "admin.roles.guide.next": "ከተጠቃሚ ገጻቸው ለሰው ሚና ይስጡ።",
  "admin.translations.data.guide.what":
    "በዚህ ቋንቋ የምድቦች፣ የቦታዎች፣ የባህሪያት እና የመልስ አማራጮች ስሞች። የጸደቀ ትርጉም የሌለው ስም እንግሊዝኛውን ያሳያል።",
  "admin.translations.data.guide.col.entity": "የሚሰየመው ነገር፣ ከሥሩ ቁልፉ።",
  "admin.translations.data.guide.col.type": "ምድብ፣ ቦታ፣ ባህሪ ወይም የመልስ አማራጭ።",
  "admin.translations.data.guide.col.source": "የእንግሊዝኛው ስም።",
  "admin.translations.data.guide.col.value": "ትርጉሙ፣ ወይም እስካሁን ከሌለ ሰረዝ።",
  "admin.translations.data.guide.col.status":
    "ያልተተረጎመ፣ በማሽን፣ የተስተካከለ ወይም የጸደቀ። የጸደቀ ስም ብቻ ጣቢያው ላይ ይደርሳል።",
  "admin.translations.data.guide.how":
    "«አርትዕ» ረድፍን ለመጻፍ፣ በሰው ሰራሽ አስተውሎት ለመተርጎም፣ ለማጽደቅ ወይም ለማጽዳት ይከፍታል። የጅምላ ትርጉም እያንዳንዱን ያልተተረጎመ ረድፍ ይተረጉማል፤ «ሁሉንም የተገመገሙ አጽድቅ» እያንዳንዱን በማሽን ወይም የተስተካከለ ረድፍ ያጸድቃል፤ እያንዳንዱ የማረጋገጫ ኮድዎን ይጠይቃል። እነዚህ ስሞች መለኪያ ብቻ ናቸው — ቋንቋው ለሕዝብ መውጣት ይችል እንደሆነ አይወስኑም።",
  "admin.translations.data.guide.next": "ቋንቋውን ለሠራተኞች ወይም ለሕዝብ ያብሩ።",
  "admin.translations.languages.guide.what":
    "ጣቢያው ሊናገረው የሚችለው እያንዳንዱ ቋንቋ፣ ምን ያህሉ እንደተተረጎመ እና የት እንደሚታይ ጋር።",
  "admin.translations.languages.guide.col.language":
    "ቋንቋው በራሱ ፊደል፣ ኮዱ፣ እና ሲመለከተው «መሠረት» ወይም «ከቀኝ ወደ ግራ»።",
  "admin.translations.languages.guide.col.nameEn": "የእንግሊዝኛ ስሙ።",
  "admin.translations.languages.guide.col.coverage":
    "ከመሠረቱ ቋንቋ ጠቅላላ ውስጥ የጸደቁ የበይነገጽ ሐረጎች። ይህ ቋንቋው ለሕዝብ መውጣት ይችል እንደሆነ ይወስናል።",
  "admin.translations.languages.guide.col.coverageData":
    "የጸደቁ የውሂብ ስሞች — ምድቦች፣ ቦታዎች፣ ባህሪያት — ከሁሉም ውስጥ። መለኪያ ብቻ።",
  "admin.translations.languages.guide.col.admin":
    "በርቶ ከሆነ ቋንቋውን በሠራተኞች መሣሪያዎች እና ቅድመ እይታዎች ያሳያል፤ መሠረቱ ቋንቋ ሁልጊዜ በርቷል።",
  "admin.translations.languages.guide.col.public":
    "በርቶ ከሆነ ቋንቋውን ለጎብኚዎች ያቀርባል። እያንዳንዱ የበይነገጽ ሐረግ እስኪጸድቅ ድረስ ጠፍቶ ይቆያል።",
  "admin.translations.languages.guide.how":
    "«ሐረጎችን ክፈት» ወደ ቋንቋው ትርጉሞች ይወስድዎታል። «ቋንቋ ጨምር» አንድ ይጨምራል፤ «ቁልፎችን አመሳስል» የመተግበሪያውን አዳዲስ ሐረጎች ያስገባል፤ «ወደ ላይ አንቀሳቅስ» እና «ወደ ታች አንቀሳቅስ» ረድፎቹን ይደረድራሉ፤ «ሰርዝ» (ቀይ) ለመሠረቱ ቋንቋ እና ቋንቋው ለሕዝብ እያለ አይፈቀድም — መጀመሪያ ከሕዝብ ያውርዱት። እያንዳንዱ ለውጥ የማረጋገጫ ኮድዎን ይጠይቃል።",
  "admin.translations.languages.guide.next": "የሕግ ጽሑፎች በሕግ ገጹ ላይ የራሳቸው የእንግሊዝኛ እና የአማርኛ ይዘቶች አሏቸው።",
  "admin.translations.strings.guide.what":
    "መተግበሪያው የሚያሳየው እያንዳንዱ ቃል — ምናሌዎች፣ አዝራሮች፣ መልእክቶች — በዚህ ቋንቋ፣ በአንድ ጊዜ አንድ ቁልፍ። የጸደቀ ሐረግ ጣቢያው ላይ ይደርሳል፤ ያልተተረጎመ ወደ እንግሊዝኛ ይመለሳል።",
  "admin.translations.strings.guide.col.key": "የሐረጉ በመተግበሪያው ውስጥ ያለው ቋሚ ቁልፍ።",
  "admin.translations.strings.guide.col.source": "የእንግሊዝኛው ጽሑፍ።",
  "admin.translations.strings.guide.col.value": "ትርጉሙ፣ ወይም እስካሁን ከሌለ ሰረዝ።",
  "admin.translations.strings.guide.col.status":
    "ያልተተረጎመ፣ በማሽን፣ የተስተካከለ ወይም የጸደቀ፤ እንግሊዝኛው የያዘው ቦታ ያዥ ሲጎድል የተመለከተ (ቀይ)።",
  "admin.translations.strings.guide.col.provenance":
    "ማን ወይም ምን እንደጻፈው — ሰው ወይም ማሽኑ — እና ማን እንዳጸደቀው።",
  "admin.translations.strings.guide.how":
    "«አርትዕ» ረድፍን ለመጻፍ፣ በሰው ሰራሽ አስተውሎት ለመተርጎም፣ ለማጽደቅ፣ ለማጽዳት ወይም ታሪኩን ለማንበብ ይከፍታል። የተመለከተ ሐረግ ቦታ ያዦቹ እስኪመለሱ ድረስ ሊጸድቅ አይችልም። የጅምላ ትርጉም እያንዳንዱን ያልተተረጎመ ረድፍ ይተረጉማል፤ «ሁሉንም የተገመገሙ አጽድቅ» እያንዳንዱን በማሽን ወይም የተስተካከለ ረድፍ ያጸድቃል፤ «CSV ላክ»፣ «XLIFF ላክ» እና «ፋይል አስገባ» ሐረጎቹን እንደ ፋይል ያጓጉዛሉ። እያንዳንዱ ለውጥ የማረጋገጫ ኮድዎን ይጠይቃል። የ«ዳታ» ክኒን ወደ ምድቦች፣ ቦታዎች እና አማራጮች ስሞች ይቀይራል።",
  "admin.translations.strings.guide.next": "ይህን ለማብራት ወደ ቋንቋዎቹ ይመለሱ።",
  "admin.users.guide.what": "መለያ ያለው እያንዳንዱ ሰው — ሁኔታቸው፣ ሚናዎቻቸው እና መቼ እንደተቀላቀሉ። ለሰውዬው ገጽ ረድፍ ይክፈቱ።",
  "admin.users.guide.col.name": "የሰውዬው የሚታይ ስም።",
  "admin.users.guide.col.email": "የሚገቡበት ኢሜይላቸው።",
  "admin.users.guide.col.country": "የመኖሪያ ሀገራቸው ኮድ።",
  "admin.users.guide.col.status": "ንቁ፣ ወይም የተቋረጠ — የተቋረጠ መለያ በእያንዳንዱ በር ይከለከላል እና ይወጣል።",
  "admin.users.guide.col.roles": "የያዟቸው የሠራተኞች ሚናዎች፣ ካሉ።",
  "admin.users.guide.col.joined": "መለያው የተፈጠረበት ጊዜ።",
  "admin.users.guide.how":
    "ይፈልጉ፣ በሁኔታ እና በሚና ያጣሩ፣ እና ገጽ በገጽ ይመልከቱ። ረድፉ የሰውዬውን ገጽ ይከፍታል፣ ሠራተኞች ሁኔታውን በምክንያት የሚቀይሩበት፣ ሚናዎችን የሚሰጡበት ወይም የሚያነሱበት፣ መገለጫውን የሚያርሙበት እና ለንባብ ብቻ የ«እንደ ተጠቃሚው ይመልከቱ» ክፍለ ጊዜ የሚጀምሩበት — እያንዳንዱ የማረጋገጫ ኮድዎን ይጠይቃል። ራስዎን ወይም ዋና አስተዳዳሪን ማቋረጥ አይችሉም።",
  "admin.users.guide.next": "እያንዳንዱ ሚና ምን እንደሚፈቅድ ይመልከቱ።",
};
