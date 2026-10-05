Source: supervisor thread, turn 1364, Sun 2026-10-04 18:44 New York.
Status at 2026-10-04: not built — to be imported word for word in bundle 4 turn 10 with a unit guard; at dev 2b55ed15 src/i18n/locales/am.ts still holds the garbled strings.
Related: INC-431, commit 4b7f2174.

INC-431 — corrected Amharic for the map-pin tool (am.ts, post.pin.*; the 2026-09-21 block from 4b7f2174). For turn 10, verbatim.
  "post.pin.open": "የካርታ ምልክት ያክሉ (አማራጭ)",
  "post.pin.close": "ካርታውን ደብቅ",
  "post.pin.title": "የካርታ ምልክት",
  "post.pin.why": "ምልክት ካለ ገዢዎች በቀላሉ ያገኙዎታል። አማራጭ ነው፤ ምን ያህል ትክክለኛ እንደሚሆን እርስዎ ይወስናሉ።",
  "post.pin.searchLabel": "ቦታ ይፈልጉ",
  "post.pin.searchPlaceholder": "መንገድ፣ የታወቀ ምልክት፣ አካባቢ",
  "post.pin.searching": "በመፈለግ ላይ…",
  "post.pin.noResults": "በዚህ ስም ቦታ አልተገኘም።",
  "post.pin.locate": "አካባቢዬን ተጠቀም",
  "post.pin.locating": "አካባቢዎ በመፈለግ ላይ…",
  "post.pin.locateRefused": "አሳሽዎ አካባቢዎን አላጋራም። ካርታውን መንካት ይችላሉ።",
  "post.pin.locateUnavailable": "ይህ መሣሪያ አካባቢ ማጋራት አይችልም። በምትኩ ካርታውን ይንኩ።",
  "post.pin.layerSatellite": "ሳተላይት",
  "post.pin.tapHint": "ምልክቱን ለማስቀመጥ ካርታውን ይንኩ ወይም ምልክቱን ይጎትቱ።",
  "post.pin.streetLabel": "መንገድ ወይም የታወቀ ምልክት",
  "post.pin.streetHint": "ከካርታው የተሞላ ነው — ገዢ ወደሚያውቀው ስም ይቀይሩት።",
  "post.pin.saving": "በማስቀመጥ ላይ…",
  "post.pin.remove": "ምልክቱን አስወግድ",
  "post.pin.saveFailed": "ምልክቱ አልተቀመጠም። እንደገና ይሞክሩ።",
  "post.pin.none": "እስካሁን ምልክት የለም።",
  "post.pin.geocodeRateLimited": "ለአሁኑ ፍለጋው በዝቷል። በምትኩ ካርታውን ይንኩ፣ ወይም ቆይተው እንደገና ይሞክሩ።",
  "post.pin.geocodeUnavailable": "የቦታ ፍለጋው አይሠራም። በምትኩ ካርታውን ይንኩ።",
  "post.pin.geocodeSignedOut": "ቦታ ለመፈለግ እንደገና ይግቡ።",
  "post.pin.previewExact": "ገዢ የሚያየው ትክክለኛ ምልክት።",
  "post.pin.previewApprox": "ገዢ የሚያየው ይህን አካባቢ ነው፣ 500 ሜትር ገደማ ስፋት ያለው — ትክክለኛ ቦታዎን አይደለም።",
Also check whether post.pin.precisionLabel / precisionExact / precisionApprox still exist in am.ts (they were in the same commit: "ትክኍኑን", "አቃማባዊ") and correct them if they do.
Guard (unit test): every value in am.ts holds only Ethiopic (U+1200–137F, 1380–139F, 2D80–2DDF) assigned code points, Latin, digits and the allowed punctuation; no unassigned code point, no other script.
