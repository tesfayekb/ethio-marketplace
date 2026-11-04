# P-1c turn (d) — the whole-catalogue fold, INC-1048, INC-1049 (the task)

````text
TASK — P-1c turn (d): the whole-catalogue fold (roadmap line 7's debt), INC-1048 (the Countries console's Amharic), INC-1049 (one `grantRole`). Base: dev cfecc476f (the merge of #17). PLAN FIRST (G60): phase 1 is a census that changes nothing and STOPS; phase 2 builds on my ruling.
**MODEL — Claude Fable 5.1 (High)** (a plan, then a fix-class build on shared i18n infrastructure).

STEP 0: branch cursor/p1c-fold-d from origin/dev (must be cfecc476f — if dev moved, say so and stop); save this task unchanged as docs/governance/briefs/p1c-fold-d.md in one fenced block (Base: dev cfecc476f); roadmap line 3 names it; commit, push, draft PR. Read CI for cfecc476f first (ci-status.md on ci-evidence: SUCCESS, 08:43Z) and say so.

THE SYSTEM (G0)
CONCERN: a screen that needs the catalogue's SHAPE — whether a key exists, or the whole shipped text for one action — gets it from the i18n mechanism, never by importing a locale module into its first download (a locale module pulls every layer, the guide layer included: +5.5 / +5.5 / +12.5 KiB on three pages after turn (c); the third carry of the same debt).
MECHANISM: src/i18n/provider.tsx — `useI18n()` (`t`, `language`, `entities`; `t` answers `messages[key] ?? enFirstPaint[key]`, provider.tsx:767) and the layer loaders; NONE YET for "does this key exist" and for "the shipped catalogues at Sync time" — the plan proposes the smallest addition (see PART 1).
CONSUMERS (grep of cfecc476f, `rg -n 'from "@/i18n/locales/(en|am)"' src` outside src/i18n and tests — exactly three): src/features/admin-listings/listing-page.tsx:28 → `reasonLabel(entry.reason, t, en)` (history.ts:129–135: "does admin.listings.reason.<reason> exist") — bypasses; src/features/admin/roles/permission-matrix.tsx:7 → `if (key in en) return t(key)` (:29, "does admin.roles.perm.<kind>.<value> exist") — bypasses; src/features/admin/translations/languages-page.tsx:28–29 → `sync.mutateAsync({ en, am })` (:711–712, the whole shipped catalogues sent to the Sync keys door, on click) — bypasses.
COVERED HERE: all three. LEFT: none.
CONFORMANCE GUARD: a rule that no file outside src/i18n/ (tests excepted) imports "@/i18n/locales/*" — the natural home is scripts/check-marketplace-imports.mjs (DEC-231 already names the full catalogues as weight the marketplace graph must not carry; this widens it to every page) or a scripts/conformance/ test; the CSV import gate (scripts/check-import-gate.sh) is a different concern and not the home; proven on a planted import; allowlist empty. Lands with the mechanism, same turn.
EXCEPTIONS: none expected; a consumer that must keep a whole catalogue is an allowlist line with reason + until.
FIVE LENSES — security: none new (no door changes; Sync keys keeps its permission and step-up) · performance: the three pages drop back to their pre-(a) first downloads; the mechanism costs nothing on any other page · failure modes: a key-existence check on an unloaded layer must answer false, never throw; the Sync's dynamic import failing shows the dialog's error, never a silent empty sync · consistency: one way to ask "does this key exist" for every screen · future growth: more layers and more languages join through the provider, not through imports.
FORWARD-SCAN: P-2's word fold renames keys, not the mechanism. REGISTER: a new row for the mechanism in docs/governance/mechanisms.md lands in the records turn (R12) — write its line in the report.

PART 1 — THE FOLD (phase 1: plan only)
From the real tree at cfecc476f, report:
a. every use of the imported catalogue in the three files (file:line, what it asks);
b. the provider's API as built (what `useI18n` returns; how layers load; whether the admin layer is guaranteed loaded on the three pages);
c. the candidates, with their measured or estimated first-download effect: (i) a `has(key)` (or `exists`) on `useI18n`, answering from the loaded layers plus the English first-paint — for permission-matrix and listing-page (history.ts's `catalogue` parameter changes to a predicate or goes); (ii) for the Sync button, a dynamic `import()` of the two locale modules inside the click handler, so the catalogues are fetched only when Sync runs (Vite splits them; name the chunk sizes); (iii) anything smaller you find. Say which you recommend and why;
d. the guard's home (check-marketplace-imports.mjs widened, or a new conformance test) and the planted-bypass proof;
e. the three pages' expected first-download drop (ESTIMATE, from the chunks that leave) — the ceilings in scripts/route-budgets.mjs come back down by the MEASURED drop in phase 2 (DEC-296's form, cause on the line: "the fold of the whole-catalogue imports, turn P-1c d");
f. the tests reached: the three files' own tests, history.ts's tests, provider tests, the admin e2e specs that exercise Roles' matrix, a listing's history and Sync keys (by id);
g. conflicts with Knowledge, AGENTS.md or the kit rules.

PART 2 — INC-1048 (phase 2 only; no plan needed — exact text): the attached file `inc1048-am-countries.md` (sha256 e508eaafaa7cb326fdd46ed042190c7319facb7999763c3975b24398a12e1821) carries the vetted Amharic of all 70 `admin.countries.*` keys of src/i18n/locales/am-admin.ts (lines 1575–1670): replace each VALUE in place with the file's value, as a plain Ethiopic literal (the `\u` escapes go; 45 values change, 25 are rewritten identically); no key added, removed or moved; en-admin.ts untouched; the am-script guard, i18n:usage and the strings guards green. Prove the file's sha256 before using it. Note the two labels the admin Guide already quotes («ይህን ገበያ ዝጋ», «የዋና ምድቦች ቅደም ተከተል») now match.

PART 3 — INC-1049 (phase 1: census; phase 2: the dedupe): `grantRole` is defined three times — e2e/admin-shell.spec.ts:40 (a local copy), e2e/helpers/categories.ts:240, e2e/helpers/translations.ts:274 (exported, same name and signature). Plan: list every caller; propose the one home (beside `leaseUser` in e2e/helpers/users.ts unless a better one exists) and the import changes; no behaviour change; the specs touched run whole locally (both projects, 0 retries).

PART 4 — DOCS (phase 2): docs/features/i18n-runtime.md gains the mechanism and the guard; docs/features/admin-guide.md's note on the three pages closes; roadmap line 7 loses the carried clause and the fold ("the three ceilings come back down by the measured drop" becomes the measured fact); the P-1c debts line keeps its other items.

SCOPE, by area (narrowed to your approved plan): src/i18n/** with its tests; src/features/admin-listings/** (listing-page.tsx, history.ts and their tests); src/features/admin/roles/** (permission-matrix.tsx and tests); src/features/admin/translations/** (languages-page.tsx and tests); src/i18n/locales/am-admin.ts (PART 2 values only); scripts/route-budgets.mjs; the guard's file (scripts/check-marketplace-imports.mjs or scripts/conformance/**); e2e/helpers/** and e2e/admin-shell.spec.ts (PART 3); docs/features/**; roadmap.md; docs/governance/briefs/** and docs/governance/reports/**. A sibling outside these is reported (K2), never touched.

LIMITS / STOPS (tolerances): a red is a STOP when its failure body or server log touches a path this turn changed, otherwise named under Limits; a page whose first download does not come down after the fold is a STOP with the chunk list; a key-existence check that throws on an unloaded layer is a STOP. check-brief laws hold (no absolute stop rule here).

PHASE 1 ENDS with the plan posted (parts 1a–g, 3's census, 4's file names) and a STOP; no code changes, no second commit beyond STEP 0. Phase 2 starts on my ruling. # INC-1048 — the Countries console's Amharic, vetted (70 keys of `admin.countries.*` in src/i18n/locales/am-admin.ts)

Base: dev cfecc476f, am-admin.ts lines 1575–1670. Replace the VALUE of every key below with the value given, in place, as a plain Ethiopic literal (the file's other values are plain; the `\u` escapes go). 45 values change, 25 are already right and are rewritten identically (the escape form goes). No key is added, removed or moved; no other line of the file changes. The two labels the admin Guide of turn (c) already quotes are «ይህን ገበያ ዝጋ» (action.close, close.title) and «የዋና ምድቦች ቅደም ተከተል» (col.rail, action.railOrder, rail.title). Placeholders ({count}, {reason}) are kept as in the English.

## The 70 values (the file's order)

```ts
  "admin.countries.caption": "በመዝገብ ላይ ያሉ ሁሉም ገበያዎች",
  "admin.countries.loading": "አገሮች በመጫን ላይ…",
  "admin.countries.error": "አገሮቹ ሊጫኑ አልቻሉም።",
  "admin.countries.empty": "በእነዚህ ማጣሪያዎች የሚመሳሰል አገር የለም።",
  "admin.countries.searchPlaceholder": "ስም ወይም ኮድ ይፈልጉ",
  "admin.countries.filter.status": "ሁኔታ",
  "admin.countries.transfer.scope": "ለሁሉም ገበያዎች",
  "admin.countries.filter.search": "ገበያዎችን ፈልግ",
  "admin.countries.filter.allStatusesOption": "ሁኔታ፦ ክፍት እና ዝግ",
  "admin.countries.filter.openOnly": "ክፍት ብቻ",
  "admin.countries.filter.closedOnly": "ዝግ ብቻ",
  "admin.countries.filter.pageSize": "በአንድ ገጽ ረድፎች",
  "admin.countries.col.name": "አገር",
  "admin.countries.col.status": "ሁኔታ",
  "admin.countries.col.places": "ቦታዎች ንቁ / ጠቅላላ",
  "admin.countries.col.units": "መለኪያ · ገንዘብ",
  "admin.countries.col.rail": "የዋና ምድቦች ቅደም ተከተል",
  "admin.countries.col.roles": "የተገደቡ ሚናዎች",
  "admin.countries.col.updated": "የተዘመነበት",
  "admin.countries.badge.open": "ክፍት",
  "admin.countries.badge.closed": "ዝግ",
  "admin.countries.tip.open": "ክፍት — ሰዎች እዚህ መለጠፍና ማሰስ ይችላሉ።",
  "admin.countries.tip.closed": "ዝግ — አስተዳዳሪ እስኪከፍተው ድረስ አይቀርብም።",
  "admin.countries.places.hint": "ንቁ ቦታዎች · በመዝገብ ላይ ያሉ ቦታዎች",
  "admin.countries.rail.hint": "ይህ ገበያ ለራሱ ስንት ዋና ምድቦችን እንደሚደረድር፤ 0 ዓለም አቀፉን ቅደም ተከተል ይከተላል።",
  "admin.countries.roles.hint": "በዚህ ገበያ የተገደቡ የሚና ፈቃዶች።",
  "admin.countries.unit.metric": "ሜትሪክ",
  "admin.countries.unit.imperial": "ኢምፔሪያል",
  "admin.countries.field.name": "ስም (እንግሊዝኛ)",
  "admin.countries.field.unit": "የመለኪያ ሥርዓት",
  "admin.countries.field.currency": "የገንዘብ ኮድ",
  "admin.countries.field.currencyHint": "የISO 4217 ኮድ፣ ለምሳሌ ETB። ከሌለ ባዶ ይተዉት።",
  "admin.countries.field.order": "ቅደም ተከተል",
  "admin.countries.action.edit": "አርትዕ",
  "admin.countries.action.open": "ይህን ገበያ ክፈት",
  "admin.countries.action.close": "ይህን ገበያ ዝጋ",
  "admin.countries.action.railOrder": "የዋና ምድቦች ቅደም ተከተል",
  "admin.countries.edit.title": "አገር አርትዕ",
  "admin.countries.edit.anchorActive": "መልህቅ ቦታው ንቁ ነው።",
  "admin.countries.edit.anchorInactive": "መልህቅ ቦታው አሁንም ንቁ አይደለም።",
  "admin.countries.edit.translationsLink": "በሌሎች ቋንቋዎች ያሉ ስሞች በትርጉሞች → ዳታ ውስጥ ይታረማሉ።",
  "admin.countries.open.title": "ይህን ገበያ ክፈት",
  "admin.countries.open.hint": "ገዢዎች ማሰስ ይጀምራሉ፣ መልህቅ ቦታውም ንቁ ይሆናል።",
  "admin.countries.open.confirm": "ክፈት",
  "admin.countries.close.title": "ይህን ገበያ ዝጋ",
  "admin.countries.close.hint": "ከማሰስ ይጠፋል። ምንም አይሰረዝም።",
  "admin.countries.close.confirm": "ዝጋ",
  "admin.countries.close.scopedHint": "{count} የሚና ፈቃዶች በዚህ ገበያ የተገደቡ ናቸው። መዝጋት ገበያውን ይደብቃል፣ እያንዳንዱን ፈቃድ ግን ይጠብቃል።",
  "admin.countries.close.forceConfirm": "ቢሆንም ዝጋ",
  "admin.countries.rail.title": "የዋና ምድቦች ቅደም ተከተል",
  "admin.countries.rail.hintDialog": "ከዚህ በታች ያለው ቅደም ተከተል በዚህ ገበያ ገዢዎች የሚያዩት ነው።",
  "admin.countries.rail.globalNote": "ይህ ገበያ ዛሬ ዓለም አቀፉን ቅደም ተከተል ይከተላል።",
  "admin.countries.rail.up": "ወደ ላይ አንቀሳቅስ",
  "admin.countries.rail.down": "ወደ ታች አንቀሳቅስ",
  "admin.countries.rail.reset": "ቅደም ተከተሉን መልስ",
  "admin.countries.rail.submit": "ቅደም ተከተሉን አስቀምጥ",
  "admin.countries.rail.empty": "እስካሁን የሚደረደር ንቁ ዋና ምድብ የለም።",
  "admin.countries.import.title": "አገሮችን አስገባ",
  "admin.countries.error.reason": "ምክንያት፦ {reason}",
  "admin.countries.error.denied": "ይህን ለማድረግ ፈቃድ የለዎትም።",
  "admin.countries.error.stepUp": "ኮድ አረጋግጠው እንደገና ይሞክሩ።",
  "admin.countries.error.unknown": "ያ ሊቀመጥ አልቻለም።",
  "admin.countries.error.badCountryCode": "የአገር ኮድ በትክክል ሁለት ፊደላት ነው።",
  "admin.countries.error.badUnitSystem": "የመለኪያ ሥርዓቱ ሜትሪክ ወይም ኢምፔሪያል ብቻ ነው።",
  "admin.countries.error.badCurrency": "ያ ባለ ሦስት ፊደል የገንዘብ ኮድ አይደለም።",
  "admin.countries.error.nameRequired": "ስም ያስፈልጋል።",
  "admin.countries.error.unknownCountry": "ያ ገበያ በመዝገብ ላይ የለም።",
  "admin.countries.error.scopedRolesExist": "የሚና ፈቃዶች አሁንም ይህን ገበያ ይጠቁማሉ።",
  "admin.countries.error.duplicateCategory": "በዚያ ቅደም ተከተል ውስጥ አንድ ምድብ ሁለት ጊዜ አለ።",
  "admin.countries.error.notARoot": "በዋና ምድቦች መደዳ ላይ ዋና ምድብ ብቻ ሊደረደር ይችላል።",
```

## key · English · Amharic now (decoded) · Amharic vetted

| key | English | now | vetted |
|---|---|---|---|
| `admin.countries.caption` | Every market on record | በመዝገብ ላይ ያሉ ሱሉ ገበያዎች | በመዝገብ ላይ ያሉ ሁሉም ገበያዎች |
| `admin.countries.loading` | Loading countries\u2026 | አገሮች በመጠር ላይ… | አገሮች በመጫን ላይ… |
| `admin.countries.error` | The countries could not be loaded. | አገሮቹ መጠር አልተታሩም። | አገሮቹ ሊጫኑ አልቻሉም። |
| `admin.countries.empty` | No country matches these filters. | በእነዚህ ማጣሪያዎች የሚመሳሰል አገር የለም። | በእነዚህ ማጣሪያዎች የሚመሳሰል አገር የለም። |
| `admin.countries.searchPlaceholder` | Search name or code | ስም ወይም ኮድ ይፈልጉ | ስም ወይም ኮድ ይፈልጉ |
| `admin.countries.filter.status` | Status | ሁኔታ | ሁኔታ |
| `admin.countries.transfer.scope` | For every market | ለሁሉም ገበያዎች | ለሁሉም ገበያዎች |
| `admin.countries.filter.search` | Search markets | ገበያዎችን ፈልግ | ገበያዎችን ፈልግ |
| `admin.countries.filter.allStatusesOption` | Status: open and closed | ሁኔታ፦ ክፉት እና ዝግ | ሁኔታ፦ ክፍት እና ዝግ |
| `admin.countries.filter.openOnly` | Open only | ክፉት ብቻ | ክፍት ብቻ |
| `admin.countries.filter.closedOnly` | Closed only | ዝግ ብቻ | ዝግ ብቻ |
| `admin.countries.filter.pageSize` | Rows per page | በአንድ ገጽ ረድፎች | በአንድ ገጽ ረድፎች |
| `admin.countries.col.name` | Country | አገር | አገር |
| `admin.countries.col.status` | Status | ሁኔታ | ሁኔታ |
| `admin.countries.col.places` | Places active / total | ብሪ ባትዎች ፣ በዠት | ቦታዎች ንቁ / ጠቅላላ |
| `admin.countries.col.units` | Units \u00b7 currency | መለክያ · ገንዘብ | መለኪያ · ገንዘብ |
| `admin.countries.col.rail` | Rail order | የሓድድ ቅደት | የዋና ምድቦች ቅደም ተከተል |
| `admin.countries.col.roles` | Roles scoped | የታሰሩ ሚናዎች | የተገደቡ ሚናዎች |
| `admin.countries.col.updated` | Updated | የተዘመነበት | የተዘመነበት |
| `admin.countries.badge.open` | Open | ክፉት | ክፍት |
| `admin.countries.badge.closed` | Closed | ዝግ | ዝግ |
| `admin.countries.tip.open` | Open — people can post and browse here. | ክፍት — ሰዎች እዚህ መለጠፍና ማሰስ ይችላሉ። | ክፍት — ሰዎች እዚህ መለጠፍና ማሰስ ይችላሉ። |
| `admin.countries.tip.closed` | Closed — not offered until an admin opens it. | ዝግ — አስተዳዳሪ እስኪከፍተው ድረስ አይቀርብም። | ዝግ — አስተዳዳሪ እስኪከፍተው ድረስ አይቀርብም። |
| `admin.countries.places.hint` | Active places \u00b7 places on record | ብሪ ባትዎች · በመዝገብ ላይ ያሉ ባትዎች | ንቁ ቦታዎች · በመዝገብ ላይ ያሉ ቦታዎች |
| `admin.countries.rail.hint` | How many roots this market orders for itself; 0 follows the global order. | ይህ ገበያ ለራሱ በማዘገጀት የሚያዛቸው የሥር ምድቦች ብዙነት፡ 0 አለምአቀፍ ቅደት ይከተላል። | ይህ ገበያ ለራሱ ስንት ዋና ምድቦችን እንደሚደረድር፤ 0 ዓለም አቀፉን ቅደም ተከተል ይከተላል። |
| `admin.countries.roles.hint` | Role grants scoped to this market. | ለእነዚህ ገበያ የተሰሩ ሚናዎች። | በዚህ ገበያ የተገደቡ የሚና ፈቃዶች። |
| `admin.countries.unit.metric` | Metric | ሜትሪክ | ሜትሪክ |
| `admin.countries.unit.imperial` | Imperial | ኢምፐሪያል | ኢምፔሪያል |
| `admin.countries.field.name` | Name (English) | ስም (እንግሊዝ) | ስም (እንግሊዝኛ) |
| `admin.countries.field.unit` | Unit system | የመለክያ ስርዓት | የመለኪያ ሥርዓት |
| `admin.countries.field.currency` | Currency code | የገንዘብ ኮድ | የገንዘብ ኮድ |
| `admin.countries.field.currencyHint` | The ISO 4217 code, e.g. ETB. Leave empty where there is none. | የISO 4217 ኮድ፡ መሳላ፡ ETB። የለልም ካለ ባዶ ይሓ። | የISO 4217 ኮድ፣ ለምሳሌ ETB። ከሌለ ባዶ ይተዉት። |
| `admin.countries.field.order` | Order | ቅደት | ቅደም ተከተል |
| `admin.countries.action.edit` | Edit | አርትዕ | አርትዕ |
| `admin.countries.action.open` | Open this market | ይህን ገበያ ክፈት | ይህን ገበያ ክፈት |
| `admin.countries.action.close` | Close this market | ይህን ገበያ ዝጊ | ይህን ገበያ ዝጋ |
| `admin.countries.action.railOrder` | Rail order | የሓድድ ቅደት | የዋና ምድቦች ቅደም ተከተል |
| `admin.countries.edit.title` | Edit country | አገር አርትዕ | አገር አርትዕ |
| `admin.countries.edit.anchorActive` | Its anchor place is active. | የእሩ መሰረት ባት ብሪ ነው። | መልህቅ ቦታው ንቁ ነው። |
| `admin.countries.edit.anchorInactive` | Its anchor place is still inactive. | የእሩ መሰረት ባት አለበሪም። | መልህቅ ቦታው አሁንም ንቁ አይደለም። |
| `admin.countries.edit.translationsLink` | Names in other languages are edited in Translations \u2192 Data. | በሌሎች ዮንያዎች ያሉ ስሞች በትርጁማን → ዳትና ይሰነዳሉ። | በሌሎች ቋንቋዎች ያሉ ስሞች በትርጉሞች → ዳታ ውስጥ ይታረማሉ። |
| `admin.countries.open.title` | Open this market | ይህን ገበያ ክፈት | ይህን ገበያ ክፈት |
| `admin.countries.open.hint` | Shoppers start browsing it and its anchor place becomes active. | ገዛዎች መመልከት ይጀምራሉ፡ የእሩ መሰረት ባትም ብሪ ይሆናል። | ገዢዎች ማሰስ ይጀምራሉ፣ መልህቅ ቦታውም ንቁ ይሆናል። |
| `admin.countries.open.confirm` | Open | ክፈት | ክፈት |
| `admin.countries.close.title` | Close this market | ይህን ገበያ ዝጊ | ይህን ገበያ ዝጋ |
| `admin.countries.close.hint` | It disappears from browse. Nothing is deleted. | ከመመልከት ይሰወራል። ምንም አይሰረዝም። | ከማሰስ ይጠፋል። ምንም አይሰረዝም። |
| `admin.countries.close.confirm` | Close | ዝጊ | ዝጋ |
| `admin.countries.close.scopedHint` | {count} role grants are scoped to this market. Closing it hides the market and keeps every grant. | {count} የሚና ሚናዎች ለእነዚህ ገበያ ተሰሩ ነው። መዝጋት ገበያውን ይሰይማል ሚናዎቹን ግን ያቆያል። | {count} የሚና ፈቃዶች በዚህ ገበያ የተገደቡ ናቸው። መዝጋት ገበያውን ይደብቃል፣ እያንዳንዱን ፈቃድ ግን ይጠብቃል። |
| `admin.countries.close.forceConfirm` | Close anyway | ቢሆንም ዝጋ | ቢሆንም ዝጋ |
| `admin.countries.rail.title` | Rail order | የሓድድ ቅደት | የዋና ምድቦች ቅደም ተከተል |
| `admin.countries.rail.hintDialog` | The order below is the order shoppers see in this market. | ከዚህ በታች ያለው ቅደት በእነዚህ ገበያ ገዛዎች የሚያዩት ነው። | ከዚህ በታች ያለው ቅደም ተከተል በዚህ ገበያ ገዢዎች የሚያዩት ነው። |
| `admin.countries.rail.globalNote` | This market follows the global order today. | ይህ ገበያ አሁን አለምአቀፍ ቅደት ይከተላል። | ይህ ገበያ ዛሬ ዓለም አቀፉን ቅደም ተከተል ይከተላል። |
| `admin.countries.rail.up` | Move up | ወደ ላይ | ወደ ላይ አንቀሳቅስ |
| `admin.countries.rail.down` | Move down | ወደ ታች | ወደ ታች አንቀሳቅስ |
| `admin.countries.rail.reset` | Reset order | ቅደም ተከተሉን መልስ | ቅደም ተከተሉን መልስ |
| `admin.countries.rail.submit` | Save order | ቅደቱን አስቀምጥ | ቅደም ተከተሉን አስቀምጥ |
| `admin.countries.rail.empty` | There is no active root category to order yet. | ገንቶ የሚያዛ ብሪ የሥር ምድብ የለም። | እስካሁን የሚደረደር ንቁ ዋና ምድብ የለም። |
| `admin.countries.import.title` | Import countries | አገሮችን አስገባ | አገሮችን አስገባ |
| `admin.countries.error.reason` | Reason: {reason} | ምክንያት፡ {reason} | ምክንያት፦ {reason} |
| `admin.countries.error.denied` | You do not have permission to do that. | ይህን ለማድረግ ፈቃድ የላዎትም። | ይህን ለማድረግ ፈቃድ የለዎትም። |
| `admin.countries.error.stepUp` | Verify a code and try again. | ኮድ አረጋግጠው እና እነደገኘ ይሞክሩ። | ኮድ አረጋግጠው እንደገና ይሞክሩ። |
| `admin.countries.error.unknown` | That could not be saved. | ይህ መቀመጥ አልተሳከም። | ያ ሊቀመጥ አልቻለም። |
| `admin.countries.error.badCountryCode` | A country code is exactly two letters. | የአገር ኮድ ብትክ ሁለት ሆሄ ነው። | የአገር ኮድ በትክክል ሁለት ፊደላት ነው። |
| `admin.countries.error.badUnitSystem` | The unit system is either metric or imperial. | የመለክያ ስርዓቱ ሜትሪክ ወይም ኢምፐሪያል ብቻ ነው። | የመለኪያ ሥርዓቱ ሜትሪክ ወይም ኢምፔሪያል ብቻ ነው። |
| `admin.countries.error.badCurrency` | That is not a three-letter currency code. | ያ ቶስት ሆሄ የገንዘብ ኮድ አይደለም። | ያ ባለ ሦስት ፊደል የገንዘብ ኮድ አይደለም። |
| `admin.countries.error.nameRequired` | A name is required. | ስም ያስፈልጋል። | ስም ያስፈልጋል። |
| `admin.countries.error.unknownCountry` | That market is not on record. | ያ ገበያ በመዝገብ ላይ የለም። | ያ ገበያ በመዝገብ ላይ የለም። |
| `admin.countries.error.scopedRolesExist` | Role grants still point at this market. | የሚና ሚናዎች አሁንም እነዚህን ገበያ ይይዛሉ። | የሚና ፈቃዶች አሁንም ይህን ገበያ ይጠቁማሉ። |
| `admin.countries.error.duplicateCategory` | A category appears twice in that order. | በይህ ቅደት ውስጥ ምድብ ሁለት ጊዜ አለ። | በዚያ ቅደም ተከተል ውስጥ አንድ ምድብ ሁለት ጊዜ አለ። |
| `admin.countries.error.notARoot` | Only a root category can be ordered on the rail. | በሓድድ ላይ የሥር ምድብ ብቻ ይቅደማል። | በዋና ምድቦች መደዳ ላይ ዋና ምድብ ብቻ ሊደረደር ይችላል። |
````
