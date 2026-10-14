# HANDOVER — 2026-10-14 — bundle 13 closed (photos, turns 1–16); next: bundle 14 opens with the admin's page of one ad (D169)

Written by the supervisor thread that wrote the handovers of 2026-10-05 to 2026-10-14. It SUPPLEMENTS `docs/governance/handoffs/2026-10-13-bundle12-close-handover.md` and, through it, the earlier ones (who is who; what the operator has ruled; the curator): those still hold except where this one says otherwise. Spec-ledger block S65 is the summary; `docs/governance/handoffs/2026-10-14-bundle13-close-running-record.md` is the full record, entry by entry.

## 1. STATE AT HANDOVER

### 1.1 Repository

- dev = `117612fa` (turn 16; run 38565539442 running when this record was built), main = `79529b12` (turn 15; run 38557576048 green, promoted) when this record was built. Eleven `lovable-*` side branches on the remote, the known set (a twelfth is a stranded turn, G30).
- Bundle 13's sixteen briefs are saved in docs/governance/briefs/ (bundle-13-turn-1.md … bundle-13-turn-16.md). Roadmap line 3 names no brief after this records turn: the next brief names itself there.
- Published site: `825f4f6f` (turns 1–14), published 2026-10-14 and walked by the operator (every line passed; INC-618 found); turns 15 (tests only) and 16 (the photo tools' words, the cover-only line, INC-618) go out at the next Publish.
- Highest test ids: A-8, A11Y-2, AID-6, AIF-3, AIM-5, AIP-2, AIS-5, AL-28, AMSG-3, AS-3, AT-81, AU-13, B-5, BC-4, BGR-10, C-9, CFM-3, CI-5, CMR-3, CO-9, CT-45, CV-8, DF-5, DQ-3, DR-4, DSP-3, EL-4, FB-6, FD-3, FE-14, FP-11, FR-8, FS-14, G-2, GAL-6, GE-5, GW-2, HS-25, IB-3, IG-6, IMP-5, KP-3, LC-3, LE-6, LH-4, LK-5, LP-5, LR-4, LS-13, LT-16, LY-6, MD-4, MF-7, MR-4, OV-1, PBG-7, PC-6, PCH-6, PE-2, PED-9, PF-3, PH-3, PL-2, PP-31, PPOL-16, PPR-1, PR-44, PSH-2, PU-6, PW-188, PWN-1, QA-1, QN-4, R-9, RAW-3, RP-16, S-4, SC-22, SETM-4, SF-3, SG-4, SO-4, SP-7, SU-1, SV-5, TBL-4, TR-40, UD-2, UE-3, UNT-5, UP-6, US-2, VP-11.

### 1.2 Databases

- Eight migrations in this block, each applied on ethio-prod by the executor's tool and on ethio-staging by the operator, read back by its specific mark: turn 1 `20261013184636_ddaa7759` (mark `20261014070000`: the resource `services`, `ai_features`, `ai_spend_days`, the service-only doors `ai_feature_gate` and `ai_record_spend`, the admin doors `admin_ai_features` and `admin_set_ai_feature`); turn 2 `20261013195204_07794c11` (`20261014080000`: `admin_sync_ui_keys` follows a changed seed and answers its counts); turn 3 `20261013200740_0c18ec03` (`20261014090000`: `feed_page` names each card's cover); turn 6 `20261014022725_9ae06889` (`20261014100000`: `listing_photos.unscreened`, the held photo's reads, the approval trigger); turn 9 `20261014080034_afbb6855` (`20261014110000`: `replace_listing_photo`); turn 10 `20261014084432_09976425` (`20261014120000`: `listing_photo_warnings`, `listing_photo_changes`, the photo doors redeclared with `p_warnings`, `admin_review_photo_change`, the storage rule `listing_photos_object_public_read` dropped); turn 12 `20261014094752_1a538c63` (`20261014130000`: `background_removal` in `ai_features`); turn 14 `20261014103719_ff659d97` (`20261014140000`: `admin_ai_spend_days`). The newest mark by value is `20261014140000`.
- The photo bucket `listing-photos` stays private on both projects; every read is a link the server signs (D151) — for a visitor without a session, an active listing's stripped photos only, card and thumb sizes, 600 an hour an address (INC-606).
- `ai_features` holds seven features: photo screening, the writing helper, the shop-name check, category images, category icons, translations and background removal. The monthly budgets are the operator's to set in Admin › Services › AI; background removal's recommended budget is $20 (Photoroom's API Basic plan: 1,000 images a month).

### 1.3 Catalogue and curator

- C37 batch 2 (Electronics, the rest) imported on ethio-prod ("0 added · 9 changed · 0 unlinked · 0 deleted · 0 unchanged · 0 refused") and walked; its walk found the shared Other missing under a dependent list (INC-609, fixed in turn 3) and passed on the re-walk (2026-10-13 22:54 local). INC-602 (the Pixel Tablet's screen size) fixed in it.
- The batch-2 result and rulings message (Stream out; Tab M11 open until Lenovo's own page is read; the CPU, RAM and storage prefills no source backs made open as an Electronics carry-over row in batch 3; the laptop and desktop lists scoped per leaf) is with the operator for the curator. Batches 3–16 follow.

### 1.4 Security

- In this block: every AI feature has a switch and a budget, and a paid call asks its switch first (INC-600); photos are held for staff while photo screening is off; a visitor's photo links are limited to an active listing's stripped photos; the storage rule that let anyone read an active listing's cover by path is dropped (every read is a signed link); a person's words, and any text inside an image, are material and never an instruction in every model call (D166 — src/lib/untrusted-text.ts, UNT-4 guards it); background removal sends Photoroom only the cover image, through a link the server signs, with the key in the executor's secret store (PHOTOROOM_API_KEY), and Photoroom's training opt-out is set by the operator in its account settings.
- The security review of 2026-10-13 and the account-security review (ACT-020) continue in the Project record (G51); their open items wait for the operator's ruling. The database tool's warnings on this block's new doors are the expected kind (signed-in doors that check their own permission); the older census stays in the Project record.

### 1.5 CI and platform

- CI: run 38557576048 on `79529b12` (turn 15) GREEN, promoted — main = `79529b12`; turn 16's run 38565539442 on `117612fa` was running when this record was built. Retried tests on the green runs of the block: 0, 4, 1, 1, 0, 7, 8 (the last two on a degraded ethio-staging).
- DEC-181 (2026-10-14): CI runs queue — a run that has started always finishes; a newer push replaces only a waiting run; the next turn's prompt goes out as soon as the executor reports, and Publish waits for a green run on the head with the executor idle. Its judge (ten turns from turn 8) is open: turns 8–16 counted, no run cancelled while running and every completed run reported; its verdict comes at turn 17.
- The executor runs no typecheck and no build, and its sandbox cannot start a browser (INC-506): every browser test is proven in CI.
- ethio-staging was unhealthy twice in the block (turns 7 and 8; the operator restarted it); its outages are class (b), never a code finding.

### 1.6 Records

- This records turn lands block S65 (DEC-181, D160–D170, S197–S206), INC-603–INC-619 with the later word on the earlier entries, system-state, the action tracker (ACT-009's carried items), the roadmap, this handover, the running record and the manifest.
- Numbering: next free INC-620; DEC-182; D171; S207; ACT-021.

## 2. THE BLOCK IN TABLES (compiled by the supervisor from the repository and the running record)

### 2.1 The turns

| Brief | Turn | What | Commit | CI |
|---|---|---|---|---|
| 1 | 1 | the AI switches and meter, doors and server (D158, INC-600; one migration) | `86a43919` | red: SV-3 (INC-608) |
| 2 | 2 | the walk fixes: Sync keys follows a changed seed (INC-603, INC-607; one migration), the draft's address (INC-604), Next and Back held while photos send (INC-605), the cover's ribbon (D160) | `974744fd` | cancelled by turn 3; judged by turn 4's run |
| 3 | 3 | SV-3's order (INC-608); the shared Other (INC-609); buyers see photos (INC-606; one migration) | `6181e584` | red: the posting suite (INC-610) and PP-20, PP-21, FR-6 (INC-611) |
| 4 | 4 | the address without a remount (INC-610); three tests on the code as built (INC-611); the gallery (D161) | `b7efbf46` | red: PW-12 (INC-612) |
| 5 | 5 | PW-12 waits for step 8 (INC-612); Admin › Services › AI (D158) | `ce2770e5` | green (4 retried), promoted |
| 6 | 6 | photos held for staff while photo screening is off (D158 item 3; one migration) | `d76a27f1` | red: SC-18, SC-19 (INC-614); a staging 504 (class b) |
| 7 | 7 | SC-18/SC-19's seed (INC-614); the photo's top (INC-613); the middle size (D162); the gold ribbon (D163) | `1f28c90a` | red: a staging outage (class b), no code finding |
| 8 | 8 | CI runs queue (DEC-181); staff remove a photo with a reason (D154 B4) | `d902d735` | red: a staging 522 at setup, then SC-20 (INC-615) |
| 9 | 9 | Edit — turn and crop (D154 B2; `replace_listing_photo`, one migration); the low-detail copies (D165) | `74b1ca6d` | red: SC-20 (INC-615, fixed in turn 10) |
| 10 | 10 | SC-20's priced seed (INC-615); the relevance warning (D154 B3); photo changes on live ads (D154 B5); the bucket's public read rule dropped; one migration | `2f73df1b` | green (1 retried), promoted |
| 11 | 11 | a person's words are material, never an instruction, in every model call (D166) | `eb8da59d` | green (1 retried), promoted |
| 12 | 12 | Remove background on the cover through Photoroom (D155b, D159, D156; one migration) | `08095c33` | green (0 retried), promoted |
| 13 | 13 | every invalidation reads again after a write (INC-579, INC-494) | `052c6c1e` | cancelled while waiting (DEC-181); judged by turn 14's run |
| 14 | 14 | Admin › Services › AI: what each feature does, and spend by day (one migration) | `825f4f6f` | green (7 retried, a degraded staging), promoted |
| 15 | 15 | tests only: a burst against a clock-window dial stays in one window (INC-617); CT-18 names the cell that moved (INC-497); PR-26's status line (INC-616) | `79529b12` | green (8 retried, a degraded staging), promoted |
| 16 | 16 | the operator's walk of turns 7–14: the photo tools' words (D168); the cover-only line; the preview keeps a dialog's focus (INC-618) | `117612fa` | running when this record was built (run 38565539442); judged with the records turn's run |

### 2.2 The strings (read at the base of this records turn against `60f29722` by script)

126 keys added in both languages, 1 removed, 0 changed in English and 0 in Amharic. Every Amharic string of the period was listed key by key to the operator and approved by him (G43). The added keys, each "English" · «Amharic»:

- `admin.ai.about.background_removal` — "Removes the background of a seller's cover photo when the seller asks (Photoroom)." · «ሻጩ ሲጠይቅ የሽፋን ፎቶውን ዳራ ያስወግዳል (Photoroom)።»
- `admin.ai.about.category_icons` — "Suggests category icons for staff (Google Gemini)." · «ለሠራተኞች የምድብ አዶዎችን ይጠቁማል (Google Gemini)።»
- `admin.ai.about.category_images` — "Makes category pictures for staff (Google Gemini)." · «ለሠራተኞች የምድብ ምስሎችን ይሠራል (Google Gemini)።»
- `admin.ai.about.name_check` — "Checks whether a new seller name imitates a well-known company, brand or person (Google Gemini)." · «አዲስ የሻጭ ስም የታወቀን ኩባንያ፣ የንግድ ምልክት ወይም ሰው አስመስሎ እንደሆነ ይፈትሻል (Google Gemini)።»
- `admin.ai.about.photo_screen` — "Checks every photo sellers upload (Google Gemini)." · «ሻጮች የሚጭኗቸውን ፎቶዎች ሁሉ ይመረምራል (Google Gemini)።»
- `admin.ai.about.translations` — "Machine-translates text for staff (Google Translate)." · «ለሠራተኞች ጽሑፍን በማሽን ይተረጉማል (Google Translate)።»
- `admin.ai.about.writing_helper` — "Suggests an ad's title and description when the seller asks (Google Gemini)." · «ሻጩ ሲጠይቅ የማስታወቂያውን ርዕስና መግለጫ ይጠቁማል (Google Gemini)።»
- `admin.ai.action.edit` — "Edit" · «አርትዕ»
- `admin.ai.alert.full` — "Budget reached" · «በጀቱ ላይ ደርሷል»
- `admin.ai.alert.most` — "80 % of budget" · «የበጀቱ 80 %»
- `admin.ai.alert.tipFull` — "This month's spend has reached the budget." · «የዚህ ወር ወጪ በጀቱ ላይ ደርሷል።»
- `admin.ai.alert.tipMost` — "This month's spend has passed 80 % of the budget." · «የዚህ ወር ወጪ ከበጀቱ 80 % አልፏል።»
- `admin.ai.calls.characters` — "{count} characters this month" · «በዚህ ወር {count} ፊደሎች»
- `admin.ai.calls.line` — "{month} this month · {today} today" · «በዚህ ወር {month} · ዛሬ {today}»
- `admin.ai.caption` — "Every AI feature with its switch, budget and spend this month" · «እያንዳንዱ የሰው ሰራሽ አስተውሎት አገልግሎት ከሁኔታው፣ ከበጀቱ እና ከዚህ ወር ወጪው ጋር»
- `admin.ai.col.calls` — "Calls" · «ጥሪዎች»
- `admin.ai.col.feature` — "Feature" · «አገልግሎት»
- `admin.ai.col.price` — "Price" · «ዋጋ»
- `admin.ai.col.spend` — "This month" · «በዚህ ወር»
- `admin.ai.col.state` — "State" · «ሁኔታ»
- `admin.ai.col.updated` — "Updated" · «የተሻሻለበት»
- `admin.ai.days.all` — "All features" · «ሁሉም አገልግሎቶች»
- `admin.ai.days.day` — "Day" · «ቀን»
- `admin.ai.days.empty` — "No AI calls in the last {days} days." · «ባለፉት {days} ቀናት የሰው ሰራሽ አስተውሎት ጥሪ የለም።»
- `admin.ai.days.error` — "The spend by day could not be loaded." · «የቀን ወጪውን መጫን አልተቻለም።»
- `admin.ai.days.hint` — "The last {days} days (UTC), counted by our server: each call at its feature's price, the same count the month's spend and the budgets use. The provider's own bill is the final figure." · «ያለፉት {days} ቀናት (UTC)፣ በአገልጋያችን የተቆጠሩ፦ እያንዳንዱ ጥሪ በአገልግሎቱ ዋጋ፤ የወሩ ወጪና በጀቶቹ የሚጠቀሙበት ያው ቆጠራ ነው። የመጨረሻው አሃዝ የአቅራቢው የራሱ ሂሳብ ነው።»
- `admin.ai.days.spend` — "Spend" · «ወጪ»
- `admin.ai.days.title` — "Spend by day" · «የቀን ወጪ»
- `admin.ai.days.total` — "Last {days} days: {spend} for {calls} calls" · «ያለፉት {days} ቀናት፦ ለ{calls} ጥሪዎች {spend}»
- `admin.ai.edit.title` — "Edit an AI feature" · «የሰው ሰራሽ አስተውሎት አገልግሎትን ያርትዑ»
- `admin.ai.empty` — "No AI feature is on record." · «የተመዘገበ የሰው ሰራሽ አስተውሎት አገልግሎት የለም።»
- `admin.ai.error` — "The AI features could not be loaded." · «የሰው ሰራሽ አስተውሎት አገልግሎቶችን መጫን አልተቻለም።»
- `admin.ai.error.badBudget` — "A budget is a number of dollars from 0 to 1,000,000, or empty." · «በጀት ከ0 እስከ 1,000,000 የሆነ የዶላር መጠን ነው፤ ወይም ባዶ።»
- `admin.ai.error.badPrice` — "Enter a price of 0 or more, at most {max}." · «0 ወይም ከዚያ በላይ የሆነ ዋጋ ያስገቡ፤ ቢበዛ {max}።»
- `admin.ai.error.badPriceDoor` — "That price is out of range." · «ያ ዋጋ ከሚፈቀደው ክልል ውጭ ነው።»
- `admin.ai.error.denied` — "You do not hold the right to do this." · «ይህን ለማድረግ ፈቃድ የለዎትም።»
- `admin.ai.error.overBudget` — "This month's spend has reached that budget. Raise or clear the budget to switch the feature on." · «የዚህ ወር ወጪ ያንን በጀት ደርሷል። አገልግሎቱን ለማብራት በጀቱን ይጨምሩ ወይም ያስወግዱ።»
- `admin.ai.error.reason` — "Reason: {reason}" · «ምክንያት፦ {reason}»
- `admin.ai.error.stepUp` — "Confirm a one-time code to make this change." · «ይህን ለውጥ ለማድረግ የአንድ ጊዜ ኮድ ያረጋግጡ።»
- `admin.ai.error.unknown` — "That could not be saved." · «መቀመጥ አልተቻለም።»
- `admin.ai.error.unknownFeature` — "This feature is not on record." · «ይህ አገልግሎት አልተመዘገበም።»
- `admin.ai.feature.background_removal` — "Background removal" · «ዳራ ማስወገድ»
- `admin.ai.feature.category_icons` — "Category icons" · «የምድብ አዶዎች»
- `admin.ai.feature.category_images` — "Category pictures" · «የምድብ ምስሎች»
- `admin.ai.feature.name_check` — "Seller-name check" · «የሻጭ ስም ፍተሻ»
- `admin.ai.feature.photo_screen` — "Photo screening" · «የፎቶ ምርመራ»
- `admin.ai.feature.translations` — "Machine translation" · «የማሽን ትርጉም»
- `admin.ai.feature.writing_helper` — "Writing help" · «የመጻፍ እገዛ»
- `admin.ai.field.budget` — "Monthly budget (US dollars)" · «ወርሃዊ በጀት (የአሜሪካ ዶላር)»
- `admin.ai.field.budgetHint` — "Leave empty for no budget." · «በጀት እንዳይኖር ባዶ ይተዉት።»
- `admin.ai.field.on` — "Feature on" · «አገልግሎቱ በርቷል»
- `admin.ai.field.priceCall` — "Price of one call (US dollars)" · «የአንድ ጥሪ ዋጋ (የአሜሪካ ዶላር)»
- `admin.ai.field.priceHint` — "The provider's price. The month's spend is counted with it." · «የአቅራቢው ዋጋ። የወሩ ወጪ በዚህ ይቆጠራል።»
- `admin.ai.field.priceMillion` — "Price of a million characters (US dollars)" · «የአንድ ሚሊዮን ፊደሎች ዋጋ (የአሜሪካ ዶላር)»
- `admin.ai.field.screeningOffNote` — "While photo screening is off, new photos on an ad being posted are saved, and no buyer sees them until staff approve the ad. A live ad cannot take new photos." · «የፎቶ ምርመራ ጠፍቶ ሳለ፣ በመለጠፍ ላይ ባለ ማስታወቂያ ላይ የሚጨመሩ አዲስ ፎቶዎች ይቀመጣሉ፤ ሠራተኞች ማስታወቂያውን እስኪያጸድቁ ድረስ ግን ማንም ገዢ አያያቸውም። በቀጥታ ያለ ማስታወቂያ አዲስ ፎቶ መቀበል አይችልም።»
- `admin.ai.filter.search` — "Search AI features" · «የሰው ሰራሽ አስተውሎት አገልግሎቶችን ይፈልጉ»
- `admin.ai.loading` — "Loading the AI features…" · «የሰው ሰራሽ አስተውሎት አገልግሎቶች በመጫን ላይ…»
- `admin.ai.note` — "At its monthly budget a feature switches itself off, except photo screening, which keeps running. The alerts at 80 % and 100 % of a budget are kept in the audit log." · «አንድ አገልግሎት ወርሃዊ በጀቱ ላይ ሲደርስ ራሱን ያጠፋል፤ የፎቶ ምርመራ ግን መሥራቱን ይቀጥላል። በበጀቱ 80 % እና 100 % ላይ የሚሰጡ ማስጠንቀቂያዎች በኦዲት መዝገብ ውስጥ ይቀመጣሉ።»
- `admin.ai.price.perCall` — "{price} a call" · «{price} በአንድ ጥሪ»
- `admin.ai.price.perMillion` — "{price} per million characters" · «{price} በአንድ ሚሊዮን ፊደሎች»
- `admin.ai.searchPlaceholder` — "Search a feature" · «አገልግሎት ይፈልጉ»
- `admin.ai.spend.noBudget` — "{spent} · no budget" · «{spent} · በጀት የለም»
- `admin.ai.spend.ofBudget` — "{spent} of {budget}" · «ከ{budget} ውስጥ {spent}»
- `admin.ai.state.off` — "Off" · «ጠፍቷል»
- `admin.ai.state.on` — "On" · «በርቷል»
- `admin.ai.state.tipBudget` — "Its budget was reached on {date}. It comes back on next month, or when the budget is raised." · «በ{date} በጀቱ ላይ ደርሷል። በሚቀጥለው ወር ወይም በጀቱ ሲጨመር ተመልሶ ይበራል።»
- `admin.ai.state.tipOn` — "The feature is in use." · «አገልግሎቱ በሥራ ላይ ነው።»
- `admin.ai.state.tipStaff` — "Switched off by staff on {date}." · «በ{date} በሠራተኞች ጠፍቷል።»
- `admin.attributes.dependsOn.optionsForEvery` — "Options for every answer" · «የሁሉም መልሶች አማራጮች»
- `admin.listings.photos.confirm` — "Remove photo" · «ፎቶውን አስወግድ»
- `admin.listings.photos.done` — "Photo removed. The seller is told why." · «ፎቶው ተወግዷል። ምክንያቱ ለሻጩ ይነገራል።»
- `admin.listings.photos.error.gone` — "This photo is no longer on the ad." · «ይህ ፎቶ ከአሁን በኋላ በማስታወቂያው ላይ የለም።»
- `admin.listings.photos.hint` — "The photo leaves the ad at once. The seller is told the reason and your note. Undo does not bring a photo back." · «ፎቶው ወዲያውኑ ከማስታወቂያው ይወርዳል። ለሻጩ ምክንያቱና ማስታወሻዎ ይነገራል። መቀልበስ ፎቶን አይመልስም።»
- `admin.listings.photos.notRelevant` — "May not fit the ad" · «ከማስታወቂያው ጋር ላይስማማ ይችላል»
- `admin.listings.photos.refused` — "The photo was not removed: the ad no longer meets today's rules for {fields}. Edit those first." · «ፎቶው አልተወገደም፦ ማስታወቂያው ለ{fields} የአሁኑን ደንቦች አያሟላም። መጀመሪያ እነሱን ያስተካክሉ።»
- `admin.listings.photos.removeOne` — "Remove photo {index}" · «{index}ኛውን ፎቶ አስወግድ»
- `admin.listings.photos.title` — "Remove this photo?" · «ይህ ፎቶ ይወገድ?»
- `admin.nav.group.services` — "Services" · «አገልግሎቶች»
- `admin.roles.perm.resource.services` — "Services" · «አገልግሎቶች»
- `admin.screening.changes.added` — "Added" · «ተጨምሯል»
- `admin.screening.changes.edited` — "Edited" · «ተስተካክሏል»
- `admin.screening.changes.empty` — "No photo changes are waiting." · «የሚጠብቅ የፎቶ ለውጥ የለም።»
- `admin.screening.changes.gone` — "This change was already reviewed." · «ይህ ለውጥ አስቀድሞ ታይቷል።»
- `admin.screening.changes.hint` — "Photos sellers added, edited or removed on live ads. Each was checked by AI when it was saved. Mark each one reviewed; a photo can be removed from the ad's photos." · «ሻጮች በቀጥታ ማስታወቂያዎች ላይ የጨመሯቸው፣ ያስተካከሏቸው ወይም ያስወገዷቸው ፎቶዎች። እያንዳንዱ ሲቀመጥ በሰው ሰራሽ አስተውሎት ተፈትሿል። እያንዳንዱን እንደታየ ምልክት ያድርጉ፤ ፎቶ ከማስታወቂያው ፎቶዎች ውስጥ ሊወገድ ይችላል።»
- `admin.screening.changes.photos` — "Show photos" · «ፎቶዎቹን አሳይ»
- `admin.screening.changes.removed` — "Removed" · «ተወግዷል»
- `admin.screening.changes.review` — "Mark reviewed" · «እንደታየ ምልክት አድርግ»
- `admin.screening.changes.title` — "Photo changes on live ads" · «በቀጥታ ማስታወቂያዎች ላይ የፎቶ ለውጦች»
- `admin.screening.photoWarning` — "A photo may not fit the ad" · «አንድ ፎቶ ከማስታወቂያው ጋር ላይስማማ ይችላል»
- `admin.screening.unscreenedNote` — "Photos not checked by AI: {count}. Approving the ad approves them too." · «በሰው ሰራሽ አስተውሎት ያልተፈተሹ ፎቶዎች፦ {count}። ማስታወቂያውን ማጽደቅ እነሱንም ያጸድቃል።»
- `admin.section.ai.body` — "Each AI feature's switch, monthly budget and spend." · «የእያንዳንዱ የሰው ሰራሽ አስተውሎት አገልግሎት ሁኔታ፣ ወርሃዊ በጀት እና ወጪ።»
- `admin.section.ai.title` — "AI" · «ሰው ሰራሽ አስተውሎት»
- `post.gallery.enlarge` — "Open the photo full screen" · «ፎቶውን በሙሉ ገጽ ክፈት»
- `post.gallery.next` — "Next photo" · «የሚቀጥለው ፎቶ»
- `post.gallery.previous` — "Previous photo" · «ቀዳሚው ፎቶ»
- `post.gallery.show` — "Show photo {index}" · «{index}ኛውን ፎቶ አሳይ»
- `post.gallery.unscreened` — "Not checked by AI" · «በሰው ሰራሽ አስተውሎት አልተፈተሸም»
- `post.photo.refusal.photoGone` — "This photo is no longer on the ad." · «ይህ ፎቶ ከአሁን በኋላ በማስታወቂያው ላይ የለም።»
- `post.photo.refusal.screeningPaused` — "Photo checking is paused, so this ad cannot take new photos right now. Please try again later." · «የፎቶ ምርመራ ለጊዜው ቆሟል፤ ስለዚህ ይህ ማስታወቂያ አሁን አዲስ ፎቶ መቀበል አይችልም። እባክዎ ቆይተው እንደገና ይሞክሩ።»
- `post.photos.background` — "Remove background" · «ዳራውን አስወግድ»
- `post.photos.background.failed` — "The background could not be removed right now. Please try again later." · «ዳራው አሁን ሊወገድ አልቻለም። እባክዎ ቆየት ብለው እንደገና ይሞክሩ።»
- `post.photos.background.hint` — "Your cover photo's background is replaced with ethio.com's own colour, the same on every ad. You see it before you keep it. Each ad can do this once, and try again once." · «የሽፋን ፎቶዎ ዳራ በethio.com የራሱ ቀለም ይተካል፤ ቀለሙ በሁሉም ማስታወቂያዎች ላይ አንድ ነው። ከማቆየትዎ በፊት ያዩታል። እያንዳንዱ ማስታወቂያ ይህን አንድ ጊዜ ማድረግና አንድ ጊዜ እንደገና መሞከር ይችላል።»
- `post.photos.background.keep` — "Keep" · «አቆይ»
- `post.photos.background.notCover` — "Only the cover photo's background can be removed. Make this photo the cover first." · «ዳራ ሊወገድ የሚችለው ከሽፋን ፎቶ ብቻ ነው። መጀመሪያ ይህን ፎቶ ሽፋን ያድርጉት።»
- `post.photos.background.off` — "Background removal is switched off for now." · «ዳራ ማስወገድ ለጊዜው ጠፍቷል።»
- `post.photos.background.spent` — "This ad has used its background removals." · «ይህ ማስታወቂያ የዳራ ማስወገጃ ሙከራዎቹን ጨርሷል።»
- `post.photos.background.triesLeft` — "Tries left for this ad: {count}" · «ለዚህ ማስታወቂያ የቀሩ ሙከራዎች፦ {count}»
- `post.photos.background.working` — "Removing the background…" · «ዳራው እየተወገደ ነው…»
- `post.photos.backgroundCoverOnly` — "Only the cover photo (the first one) can have its background removed." · «ዳራ ሊወገድ የሚችለው ከሽፋን ፎቶ (የመጀመሪያው) ብቻ ነው።»
- `post.photos.backgroundShort` — "Background" · «ዳራ»
- `post.photos.coverRibbon` — "Cover photo" · «የሽፋን ፎቶ»
- `post.photos.earlierShort` — "Earlier" · «ወደ ፊት»
- `post.photos.edit` — "Edit photo" · «ፎቶውን አስተካክል»
- `post.photos.editShort` — "Edit" · «አስተካክል»
- `post.photos.editor.box` — "Crop box: the arrow keys move it; Shift with an arrow key changes its size." · «የመከርከሚያ ሳጥን፦ የቀስት ቁልፎች ያንቀሳቅሱታል፤ Shift ከቀስት ቁልፍ ጋር መጠኑን ይቀይራል።»
- `post.photos.editor.failed` — "This photo could not be opened here. Close and try again." · «ይህ ፎቶ እዚህ ሊከፈት አልቻለም። ይዝጉና እንደገና ይሞክሩ።»
- `post.photos.editor.hint` — "Turn the photo, or move the box and its corners to crop it. When you save, it is checked again like a new photo." · «ፎቶውን ያዙሩት፤ ወይም ለመከርከም ሳጥኑንና ማዕዘኖቹን ያንቀሳቅሱ። ሲያስቀምጡት እንደ አዲስ ፎቶ እንደገና ይመረመራል።»
- `post.photos.editor.kept` — "Your photo was kept as it was." · «ፎቶዎ እንደነበረ ቀርቷል።»
- `post.photos.editor.rotateLeft` — "Turn left" · «ወደ ግራ አዙር»
- `post.photos.editor.rotateRight` — "Turn right" · «ወደ ቀኝ አዙር»
- `post.photos.editor.saving` — "Saving and checking the photo…" · «ፎቶው እየተቀመጠና እየተመረመረ ነው…»
- `post.photos.heldNote` — "Photo checking is paused. Your photos are saved, and staff check them with your ad before any buyer sees them." · «የፎቶ ምርመራ ለጊዜው ቆሟል። ፎቶዎችዎ ተቀምጠዋል፤ ማንም ገዢ ከማየቱ በፊት ሠራተኞች ከማስታወቂያዎ ጋር ይፈትሿቸዋል።»
- `post.photos.laterShort` — "Later" · «ወደ ኋላ»
- `post.photos.notRelevant` — "This photo may not show what you are selling. You can keep it or remove it." · «ይህ ፎቶ የሚሸጡትን ላያሳይ ይችላል። ሊያቆዩት ወይም ሊያስወግዱት ይችላሉ።»
- `post.photos.waitSending` — "Wait until your photos are sent." · «ፎቶዎችዎ እስኪላኩ ይጠብቁ።»
- `post.refusal.featureOff` — "The writing help is switched off for now." · «የመጻፍ እገዛው ለጊዜው ተዘግቷል።»

Removed: `post.photos.cover`.

## 3. IN FLIGHT AT HANDOVER

- CI: turn 16's run 38565539442 on `117612fa`, then this records turn's own run. This records turn's own run follows.
- The operator: Publish once this records turn's run is green and Lovable is idle (turns 15 and 16 go out with it); then the short walk of turn 16; the batch-2 rulings message to the curator, with fresh exports; owed rulings: D149's place against My listings, and the security review's open items.
- The supervisor: the judges open in block S65 (INC-579's ten runs; DEC-181's ten turns; INC-497 reopened, INC-576, INC-449; INC-398 parked); INC-616 (PR-26) and INC-619 (PW-28): the next flaky body read the day it appears; every CI read runs the read script (the Project doc claude/ci-read-tool.md); the seller's My listings page's peer study and spec; D149's publishing statement's build brief.
- The curator: the batch-2 result and rulings message, then batch 3 (with the Electronics carry-over row).

## 4. THE PLAN AHEAD, IN ORDER

1. Bundle 14 — D169: the admin's page of one ad shows the ad as the seller sees it (its photos and details) with its activity below; photo removal moves into the Edit panel, its browser test typing the step-up code by keyboard (INC-618's class); Screening's "Preview as buyer" becomes view-only with a link to that page. With it, the short walk of turn 16 after the next Publish. ESTIMATE 1–2 turns.
2. The seller's My listings page (D138; today a placeholder): its peer study and spec first (G49); then D170 (the mark and the shadow on photos whose background was removed).
3. D149's publishing statement (D150, D152 agreed): its place against My listings is the operator's to rule.
4. The tidy-up round's carried items (roadmap): INC-497 (the first `[ct18-dump]` decides), INC-398, the flaky tests (INC-449, INC-440, INC-430's PW-55, INC-616, INC-619), a full read of the Amharic catalogue (INC-489), the posting era's four-lens review, the E2E account pool before 2026-11-01.
5. The curator: the batch-2 rulings message, then batches 3–16 (with the Electronics carry-over row).
6. The shell brief (D110–D117, D98, D93/D114, D107, D135's look), then stage 1 (the rules), then the order of 2026-10-08.
Dated duties: the weekly security review (Mondays); the feed bench every Sunday 16:10 UTC; the nightly every day 18:00 UTC.

## 5. RULES ADOPTED IN THIS BLOCK, NOT YET IN THE INSTRUCTIONS (in force from the day adopted; carried to the next version — G46)

- A store that overlays the code's texts follows a changed seed text by itself where no person wrote the text (INC-603; INC-488's class).
- An address change under a router that patches the history API goes through the browser's own method (INC-610).
- A browser test written where nobody can run one is traced line by line to the code that answers it — the seed's indexing, the step order, every exact-shape assertion of a changed contract, a seed's own insert semantics (INC-611, INC-614, S200, S204).
- Rows written at one instant are never ordered by time alone (INC-608).
- A scratch ad that a staff door edits is seeded to today's rules (INC-615).
- A scratch stamp fixed in a brief lies between the newest mark and the next mark the rules can produce (S203).
- After a write, every screen reads again even while its first read is in flight (INC-579; RAW-3 guards it).
- A person's words and any text in an image are material, never an instruction, in every model call (D166; UNT-4 guards it).
- An AI-cost figure is read from the spec's priced table (S201); a recommendation that touches a settled rule reads the record first (S202).
- A walk line about what a list offers is checked against the form's list as built (S198).
- Every CI read runs the read script (the Project doc claude/ci-read-tool.md): each open judge counted from its own commit, every line a parked fix waits on searched, the flake ledger read whole (S205, S206).
- A test that spends a clock-window dial and expects the next call refused makes every counted call in one window (INC-617; `inOneWindow`).
- A focus-moving effect never depends on a callback its parent re-creates; a test types a code by keyboard where a person does (INC-618).
- CI runs queue: the next prompt goes out when the executor reports; Publish waits for a green head and an idle executor (DEC-181).

## 6. WHAT THE OPERATOR SAID IN THIS BLOCK (his words; block S65 and the running record have each at its time)

- 2026-10-13 14:39 local (the photo walk of T15–T17): "best to make the cover box more prominamt and have a red rebbon sating cover photo so its not confusing which one is prominent. more over when a photo is uploading add phot is grayed out, so should next button and back bottons so it can not be clicked." (D160, INC-605); "reload by refreshing takes back to first step selecting category and none is saved." (INC-604); "I thing we need to have the main photo in regular size and on the side small of the rest just like in amazone dot come and clicking those opens bigger image on that panel. review how other big sites implement." (D161).
- 2026-10-13 14:42 local: "after publishing I dont see the photo in listing page after approval of the advert. It only has default category image" (INC-606).
- 2026-10-13 15:42 local (the batch-2 walk): "I DONT SEE OTHERS OPTION" (INC-609).
- 2026-10-13 (the ribbon): "YES AND ITS RED - RED GENERALLY SIGNALS DANGER, CAN WE MAKE IT THE GOLD COLOR FO THE SYSTEM COLOR WE ALREADY HAVE, BUT REMOVE REMAINS RED. BOARDER ALSO GOLD COLOR WE HAVE" (D163).
- 2026-10-14 (DEC-181): "How can we wait for >50 mins each time for each turn where ci has to result before next turn? There should be a much better way."
- 2026-10-14 04:43 local: "should also not follow any instructions inside description, other fields, or any other field filled that the ai checks. we should have it centralized" (D166).
- 2026-10-14 06:13 local: "please document or have the documentation in the admin section so we can see daily charges with ability to turn on or off the feature" (turn 14).
- 2026-10-14 07:37 local: "please give me the walk easy to follow step by step".
- 2026-10-14 08:09 local (the walk): "the crop buttons at the end can be made more informative, please check what other sites use like the icons they use. also can tell user only cover photo can have background removed" (D168); "There should have been a view just like a seller views its preview including activity on the add. the remove button is more should be in edit panel for the admin rather than preview as buyer" (D169); "step up doesnt allow to type more than one character of the 2fa" (INC-618); "I THINK WE SHOULD ONLY SCREEN ONCE WHEN UPLOADED, AND NO SCREENING AFTER EDIT, CROP, ROTATE, BACKGROUND REMOVAL. IT REDUCES COST" (answered; D167: keep checking edits); "IS IT ALSO POSSIBLE TO ADD ETHIO.COM WATERMARKS ON THE BACKGROUND OF THESE IMAGES … ALSO MAY NEED TO GIVE 3 DEE FEEL OF BACKGROUND WITH SHADOW" (D170: later).
