# HANDOVER — 2026-10-12 — bundle 11 built so far (every admin table in the agreed house style, Screening's preview, the Listings console, Part C's rules and checks); turn C8 next, then the posting-area turn

Written by the supervisor thread that wrote the handovers of 2026-10-05 to 2026-10-10, after thirty-five executor turns of bundle 11. It SUPPLEMENTS `docs/governance/handoffs/2026-10-10-bundle10-followups-handover.md` and, through it, the earlier ones (who is who; what the operator has ruled; the curator): those still hold except where this one says otherwise. Spec-ledger block S62 is the summary; `docs/governance/handoffs/2026-10-12-bundle11-running-record.md` is the full record, entry by entry.

## 1. STATE AT HANDOVER

### 1.1 Repository

- dev `6a9b0dda` (turn C6), main `b66a3545` (C5's code and C6's brief, green) when this record was built. Eleven `lovable-*` side branches on the remote, the known set (a twelfth is a stranded turn, G30).
- The thirty-five briefs are saved in docs/governance/briefs/ (bundle-11-turn-1.md … bundle-11-turn-35.md; sizes and sha256 in block S62). Roadmap line 3 names no brief after this records turn: the next brief names itself there.
- Published site: the build of `c9e70fa9` (turns C4 and C5; the operator's walk of C4 on 2026-10-12 was made on it).
- Highest test ids: A-8, A11Y-2, AL-27, AS-3, AT-80, AU-13, B-5, C-9, CFM-3, CI-5, CMR-3, CO-9, CT-44, CV-7, DF-5, DR-4, EL-4, FB-6, FD-3, FE-14, FP-10, FR-8, FS-14, G-2, GE-5, GW-2, HS-25, IB-3, IG-5, IMP-5, KP-3, LC-2, LE-6, LH-4, LR-4, LS-13, LT-16, LY-6, MD-4, MF-7, MR-4, OV-1, PC-6, PF-3, PL-2, PP-10, PPR-1, PR-44, PW-185, QN-4, R-9, RP-16, S-4, SC-17, SF-3, SG-4, SO-4, SP-7, SU-1, TBL-4, TR-39, UD-2, UE-3, US-2, VP-11.

### 1.2 Databases

- Seven migrations in the period, each on ethio-prod (the executor's tool) and on ethio-staging (the operator's SQL editor), each read back by its own mark: A1 `20261010103356_7ed3323f` (`20261010230000`), A3 `20261010145454_392f2c82` (`20261011030000`), L1 `20261011085637_3c0e90be` (`20261011210000`), L3 `20261011124548_db211b18` (`20261012010000`), L4a `20261011143218_5f10ade9` (`20261012030000`), L4d `20261012042142_e741c21a` (`20261012170000`) and C6's (`20261012180000`). The newest mark by value is `20261012180000`.
- New on both: the screening preview's doors (`admin_screening_facts`, `admin_reveal_listing_contact` — no second factor, one audit row per reveal, the review_reveal dial); the Listings console's doors (`admin_list_listings`, `admin_listing_detail`, `admin_edit_listing` judged through step 5, `admin_move_listing`, `admin_undo_listing_edit`) and Restore in `transition_listing` (REQ-022 as amended by D137); the table `seller_notices` (the seller reads their own; no browser writes); `admin_export_translations` (by key). Every new GRANT is on scripts/public-surface-allowlist.txt.
- Leaked-password protection: ON on ethio-prod, OFF on ethio-staging (DEC-155).

### 1.3 Catalogue and curator

- Unchanged in the period. The curator: no message in flight.

### 1.4 Security

- Layer A: secret scanning on; push protection ON.
- The operator's account-security question (2026-10-12) — the first pass is registered as INC-564–INC-567 and recorded in the Project only (G51). The full review runs in its own read-only thread (charter: Project doc `claude/account-security-review-charter-2026-10-12.md`); its register comes back to the supervising thread, which numbers the findings and schedules them as a phase of turns before launch (ACT-020).

### 1.5 CI and platform

- CI: run 38231198707 on `b66a3545` GREEN, main promoted; the run on `6a9b0dda` (C6, one migration) waited for the staging apply when this record was built — the records turn's run judges C6's code with it.
- Eight E2E shards with weighted slices (DEC-171, DEC-172: `148:174:195:235:148:157:195:231`; a run takes about 30–35 minutes); the preflight waits up to 25 minutes for a staging apply; the nightly at 18:00 UTC; the feed bench on Sunday at 16:10 UTC.
- Guards added in the period, all run by the unit tests and proven on planted files: test ids once (scripts/test-ids.ts, TI-1..TI-5), the agreed tables (scripts/admin-tables.ts, TBL-1..TBL-4, rules T1–T9), destructive red (scripts/destructive-red.ts, DR-1..DR-4), the public menu's readers (scripts/e2e-menu-readers.ts, CMR-1..CMR-3), pooled leases (scripts/e2e-leases.ts, EL-1..EL-4), and the identity-tag and DataTable min-width guards now run (GW-1, GW-2).
- The executor's sandbox still cannot start a browser (INC-506): every test is dictated to the locator and proven in CI.

### 1.6 Records

- This records turn lands block S62 (DEC-170–DEC-174, D128–D143; S153–S178), INC-537–INC-570 (INC-564–INC-567 held — G51), system-state, the action tracker (ACT-018 built; ACT-020 the account-security review), the roadmap, this handover, the running record and the manifest.
- Numbering: next free INC-571; DEC-175; D144; S179.

## 2. BUNDLE 11 IN TABLES (compiled by the supervisor from the repository and the running record)

### 2.1 The turns

| Brief | Turn | What | Commit | CI |
|---|---|---|---|---|
| 1 | 1 | INC-536: a test id is assigned once | `78c7f665` | green |
| 2 | A1 | Screening's preview doors (one migration) | `f194d5cd` | green (attempt 2, after the staging apply) |
| 3 | A2 | the shared toolbar; Screening on the agreed blocks | `6f3d3bfe` | green |
| 4 | A3 | Screening's walk fixes; D129 (one migration) | `0160270f` | green (attempt 2, after the staging apply) |
| 5 | B1 | Countries, Coverage and Places on the blocks | `5958c368` | red: CO-9 (INC-539), 429s (INC-540) |
| 6 | B1 fix | the row menu not modal (INC-539) | `7c3953ae` | red: CO-9 (INC-541) |
| 7 | B2 | INC-541; Categories on the blocks; DEC-170 | `e6ef28be` | green |
| 8 | V2 | the agreed look (D132); INC-542, INC-543 | `ebaccefd` | green |
| 9 | B3 | Attributes on the blocks and the look | `dfbb8ec0` | green |
| 10 | V2b | the phone walk's fixes; one card size | `5f688c28` | green |
| 11 | V2c | the Attributes walk's fixes; D133 | `46f5549c` | red: PW-144 (INC-449) |
| 12 | G2a | Users and Roles on the blocks | `6694c76b` | red: shell-table-law (S163), FE-13 (INC-545) |
| 13 | G2b | G2a's red; INC-449's queued Next; Audit and the impersonation view | `6e055589` | green |
| 14 | G3a | every table's footer (INC-546); Languages' header | `7f2db333` | red: the Roles tests (S164), IMP-1's footer |
| 15 | G3b | G3a's red; INC-547, INC-548 | `232bfc02` | green |
| 16 | L1 | the Listings console's doors and the seller's notices (one migration) | `63f6b687` | red (attempt 2): the pool-reset map (S165), AL-3 (S166) |
| 17 | L1b | L1's red; the house date field (INC-549); DEC-171 | `cf7187ab` | green |
| 18 | L2 | All listings and the Listings group | `fe7ebe2b` | red: AL-11 (INC-550), PW-173 (INC-551) |
| 19 | L2b | the row's moves, View as seller, tick-boxes | `f7638ec8` | green |
| 20 | L3 | one listing's page with its history (D139; one migration) | `88c6ed8c` | green (attempt 2, after the staging apply) |
| 21 | L4a | Edit: title, description, price (D140, DEC-173; one migration) | `dfd6555a` | red: AL-3 (INC-555) |
| 22 | L4b | Edit: category and specifications; INC-554; AL-3 split | `98b0841b` | red: AL-23 (INC-558) |
| 23 | L4c | L4b's red (INC-558); the breadcrumb's group (INC-557) | `ea8c54d9` | green |
| 24 | G3c | INC-558's class census | `33bba758` | red: TR-16 (INC-560); staging 504s |
| 25 | G3c2 | G3c's red (INC-560) | `3c94ec65` | green |
| 26 | G3d | the Languages roster on the blocks | `6148f2ef` | red: the Amharic coverage check (INC-561) |
| 27 | G3d2 | G3d's red (INC-561) | `4913e366` | green |
| 28 | G3e | Strings and its Data scope on the blocks | `b6aa7bc5` | green |
| 29 | L4d | Undo this edit (D141; one migration) | `e1c251c1` | red (attempt 2): PW-11 (INC-562) |
| 30 | C1 | the agreed tables' rules and their check | `0386cd69` | green |
| 31 | C2 | a destructive act is red; PW-11 evidence | `4e111104` | green |
| 32 | C3 | the public menu's one reader (INC-561's class) | `07c1e2b6` | green |
| 33 | C4 | the roles menu's Open (D142); passwords confirmed and typed twice (D143) | `2fb73b85` | red: TR-29 (INC-568), VP-11 (INC-569) |
| 34 | C5 | two pooled accounts a test at most (DEC-174); guards that ran nowhere (INC-563) | `c9e70fa9` | green |
| 35 | C6 | the translations export by key (INC-568; one migration); headers on the own page (INC-569) | `6a9b0dda` | in flight at this record (judged with the records turn's run, pipelined) |

### 2.2 The agreed tables (for the next screens)

- The blocks and their rules are in docs/features/display-primitives.md, "The agreed tables": T1 the heading in the header (`TableActions`), T2 the toolbar (`TableToolbar`: scope, search, Filters, Columns), T3 Columns (`ColumnsButton` + `useHiddenColumns`), T4 Filters with chips (`FiltersButton`, `FilterChoices`, `FilterChips`), T5 the row's actions (`RowActions`: Edit, a red Delete, the three-dots), T6 the footer with the page size kept (`useKeptPage`), T7 the phone card (one card per row), T8 tick-boxes only where a bulk action exists, T9 a row that opens its own page offers Open in its menu. scripts/admin-tables.ts checks each on every admin file that draws a `DataTable`; a new table is built on them or the unit tests refuse it.
- A destructive act is red on every control that performs or confirms it (`Button` variant `destructiveOutline`; the confirmation filled red); scripts/destructive-red.ts checks it app-wide.
- An admin control that sends values computed from a read waits while that read re-reads (`useSettling`, `useFollowingDraft`; INC-558).

### 2.3 The strings (read at the base of this records turn against `9c40c53f` by script)

154 keys added in both languages, 0 removed, 0 changed in English and 1 in Amharic. Every Amharic string of the period was listed key by key to the operator and approved by him (G43). The added keys, each "English" · «Amharic»:

- `admin.listings.action.edit` — "Edit" · «አርትዕ»
- `admin.listings.action.open` — "Open" · «ክፈት»
- `admin.listings.action.remove` — "Remove" · «አስወግድ»
- `admin.listings.action.restore` — "Restore" · «ወደነበረበት መልስ»
- `admin.listings.action.sendBack` — "Send back to review" · «ለግምገማ መልስ»
- `admin.listings.action.viewAsSeller` — "View as seller" · «እንደ ሻጩ ይመልከቱ»
- `admin.listings.col.category` — "Category" · «ምድብ»
- `admin.listings.col.expires` — "Ends" · «የሚያበቃበት»
- `admin.listings.col.place` — "Place" · «ቦታ»
- `admin.listings.col.posted` — "Posted" · «የተለጠፈ»
- `admin.listings.col.price` — "Price" · «ዋጋ»
- `admin.listings.col.seller` — "Seller" · «ሻጭ»
- `admin.listings.col.status` — "Status" · «ሁኔታ»
- `admin.listings.col.title` — "Title" · «አርዕስት»
- `admin.listings.detail.back` — "All listings" · «ሁሉም ማስታወቂያዎች»
- `admin.listings.detail.buyerView` — "Preview as buyer" · «ገዢዎች እንደሚያዩት ይመልከቱ»
- `admin.listings.detail.changed` — "Last changed" · «መጨረሻ የተቀየረበት»
- `admin.listings.detail.created` — "Created" · «የተፈጠረበት»
- `admin.listings.detail.deactivated` — "The seller's account is deactivated" · «የሻጩ መለያ ተቋርጧል»
- `admin.listings.detail.details` — "Details" · «ዝርዝሮች»
- `admin.listings.detail.firstPosted` — "First posted" · «መጀመሪያ የተለጠፈበት»
- `admin.listings.detail.history` — "History" · «ታሪክ»
- `admin.listings.detail.id` — "Listing id" · «የማስታወቂያ መለያ»
- `admin.listings.detail.lastPosted` — "Last posted" · «መጨረሻ የተለጠፈበት»
- `admin.listings.detail.memberSince` — "Member since" · «አባል የሆነበት»
- `admin.listings.detail.notFound` — "This listing does not exist, or it is a seller's draft." · «ይህ ማስታወቂያ የለም፣ ወይም የሻጭ ረቂቅ ነው።»
- `admin.listings.detail.openSeller` — "Open the seller's account" · «የሻጩን መለያ ይክፈቱ»
- `admin.listings.detail.photos` — "Photos" · «ፎቶዎች»
- `admin.listings.detail.sellerEnd` — "Seller's end date" · «ሻጩ የመረጠው ማብቂያ ቀን»
- `admin.listings.detail.severe` — "Removed for a severe reason" · «በከባድ ምክንያት የተወገደ»
- `admin.listings.edit.categoryHint` — "Answers the new category does not ask are dropped when you save." · «አዲሱ ምድብ የማይጠይቃቸው መልሶች ሲያስቀምጡ ይወገዳሉ።»
- `admin.listings.edit.changeCategory` — "Change category" · «ምድብ ቀይር»
- `admin.listings.edit.done` — "Saved. The seller is told what changed: {fields}." · «ተቀምጧል። የተቀየረው ለሻጩ ይነገራል፦ {fields}።»
- `admin.listings.edit.error.removed` — "A removed listing is not edited. Restore it first." · «የተወገደ ማስታወቂያ አይታረምም። መጀመሪያ ይመልሱት።»
- `admin.listings.edit.hint` — "Change the title, the description, the category, the specifications or the price. The seller is told what you changed, with your reason and note." · «አርዕስቱን፣ መግለጫውን፣ ምድቡን፣ ዝርዝሮቹን ወይም ዋጋውን ይቀይሩ። የቀየሩት ነገር ከምክንያትዎና ከማስታወሻዎ ጋር ለሻጩ ይነገራል።»
- `admin.listings.edit.nothing` — "Nothing has changed." · «ምንም አልተቀየረም።»
- `admin.listings.edit.priceFailed` — "This category's price rules did not load, so the price cannot be changed now. The title and the description can." · «የዚህ ምድብ የዋጋ ደንቦች አልተጫኑም፤ ስለዚህ ዋጋው አሁን ሊቀየር አይችልም። አርዕስቱና መግለጫው ግን ይቀየራሉ።»
- `admin.listings.edit.save` — "Save changes" · «ለውጦችን አስቀምጥ»
- `admin.listings.edit.title` — "Edit this listing" · «ይህን ማስታወቂያ ያርትዑ»
- `admin.listings.empty` — "No listing matches these filters." · «በእነዚህ ማጣሪያዎች ማስታወቂያ አልተገኘም።»
- `admin.listings.filter.category` — "Category" · «ምድብ»
- `admin.listings.filter.from` — "Posted from" · «የተለጠፈው ከ»
- `admin.listings.filter.seller` — "Seller" · «ሻጭ»
- `admin.listings.filter.sellerPlaceholder` — "Seller name" · «የሻጭ ስም»
- `admin.listings.filter.sellerPlaceholderEmail` — "Seller name or e-mail" · «የሻጭ ስም ወይም ኢሜይል»
- `admin.listings.filter.tier` — "Tier" · «ደረጃ»
- `admin.listings.filter.to` — "Posted until" · «የተለጠፈው እስከ»
- `admin.listings.history.after` — "After" · «በኋላ»
- `admin.listings.history.before` — "Before" · «በፊት»
- `admin.listings.history.by.seller` — "Seller" · «ሻጭ»
- `admin.listings.history.by.staff` — "Staff" · «ሠራተኛ»
- `admin.listings.history.by.system` — "System" · «ሲስተም»
- `admin.listings.history.created` — "Created" · «ተፈጠረ»
- `admin.listings.history.edited` — "Edited: {fields}" · «ተስተካክሏል፦ {fields}»
- `admin.listings.history.empty` — "No changes are recorded yet." · «እስካሁን የተመዘገበ ለውጥ የለም።»
- `admin.listings.history.field.contact` — "Contact settings" · «የመገናኛ ቅንብሮች»
- `admin.listings.history.field.description` — "Description" · «መግለጫ»
- `admin.listings.history.field.other` — "Other details" · «ሌሎች ዝርዝሮች»
- `admin.listings.history.field.pin` — "Map pin and address" · «የካርታ ምልክትና አድራሻ»
- `admin.listings.history.field.renewals` — "Renewals" · «እድሳቶች»
- `admin.listings.history.field.specs` — "Specifications" · «ዝርዝሮች»
- `admin.listings.history.field.video` — "Video" · «ቪዲዮ»
- `admin.listings.history.hide` — "Hide changes" · «ለውጦቹን ደብቅ»
- `admin.listings.history.more` — "The latest {shown} of {total} changes." · «ከ{total} ለውጦች የቅርብ {shown}።»
- `admin.listings.history.note` — "Note: {note}" · «ማስታወሻ፦ {note}»
- `admin.listings.history.photosRemoved` — "{count} removed" · «{count} ተወግደዋል»
- `admin.listings.history.reason` — "Reason: {reason}" · «ምክንያት፦ {reason}»
- `admin.listings.history.renewed` — "Renewed" · «ታድሷል»
- `admin.listings.history.show` — "Show changes" · «ለውጦቹን አሳይ»
- `admin.listings.history.status` — "Status: {from} → {to}" · «ሁኔታ፦ {from} → {to}»
- `admin.listings.history.undo` — "Undo this edit" · «ይህን ማስተካከያ ቀልብስ»
- `admin.listings.move.done.remove` — "Removed: {count}." · «የተወገዱ፦ {count}።»
- `admin.listings.move.done.restore` — "Back in Waiting for review: {count}." · «ወደ ግምገማ መጠበቂያ የተመለሱ፦ {count}።»
- `admin.listings.move.done.send_back` — "Sent back to review." · «ለግምገማ ተመልሷል።»
- `admin.listings.move.error.denied` — "You do not hold the right to do this." · «ይህን ለማድረግ ፈቃድ የለዎትም።»
- `admin.listings.move.error.illegal` — "This listing's state changed after the list loaded. Reload the page." · «ዝርዝሩ ከተጫነ በኋላ የዚህ ማስታወቂያ ሁኔታ ተቀይሯል። ገጹን እንደገና ይጫኑ።»
- `admin.listings.move.error.notFound` — "This listing no longer exists." · «ይህ ማስታወቂያ ከእንግዲህ የለም።»
- `admin.listings.move.error.own` — "Your own listing is changed the seller's way." · «የራስዎ ማስታወቂያ የሚቀየረው እንደ ሻጭ ነው።»
- `admin.listings.move.error.rateLimited` — "Too many changes in the last hour. Try again later." · «ባለፈው ሰዓት ውስጥ ብዙ ለውጦች ተደርገዋል። ቆይተው እንደገና ይሞክሩ።»
- `admin.listings.move.error.severe` — "A listing removed for a severe reason is restored by a super admin only." · «በከባድ ምክንያት የተወገደ ማስታወቂያ የሚመለሰው በዋና አስተዳዳሪ ብቻ ነው።»
- `admin.listings.move.note` — "Note for the seller" · «ለሻጩ ማስታወሻ»
- `admin.listings.move.noteHint` — "Required when the reason is Other; at most 500 characters." · «ምክንያቱ ሌላ ከሆነ ግዴታ ነው፤ ቢበዛ 500 ፊደላት።»
- `admin.listings.move.noteRequired` — "Write a note: the reason is Other." · «ማስታወሻ ይጻፉ፦ ምክንያቱ ሌላ ነው።»
- `admin.listings.move.noteTooLong` — "The note is longer than 500 characters." · «ማስታወሻው ከ500 ፊደላት ይረዝማል።»
- `admin.listings.move.pickReason` — "Choose a reason." · «ምክንያት ይምረጡ።»
- `admin.listings.move.reason` — "Reason" · «ምክንያት»
- `admin.listings.move.refused` — "Not changed: {count}. {reason}" · «ያልተቀየሩ፦ {count}። {reason}»
- `admin.listings.move.remove.hint` — "It leaves the site at once. The seller is told the reason and your note." · «ወዲያውኑ ከገጹ ይወርዳል። ለሻጩ ምክንያቱና ማስታወሻዎ ይነገራል።»
- `admin.listings.move.remove.title` — "Remove this listing?" · «ይህ ማስታወቂያ ይወገድ?»
- `admin.listings.move.remove.titleMany` — "Remove {count} listings?" · «{count} ማስታወቂያዎች ይወገዱ?»
- `admin.listings.move.restore.hint` — "It goes back to Waiting for review, never straight to the site. The seller is told." · «ወደ ግምገማ መጠበቂያ ይመለሳል እንጂ በቀጥታ ወደ ገጹ አይወጣም። ለሻጩ ይነገራል።»
- `admin.listings.move.restore.title` — "Restore this listing?" · «ይህ ማስታወቂያ ወደነበረበት ይመለስ?»
- `admin.listings.move.restore.titleMany` — "Restore {count} listings?" · «{count} ማስታወቂያዎች ወደነበሩበት ይመለሱ?»
- `admin.listings.move.sendBack.hint` — "It leaves the site until a reviewer approves it again. The seller is told." · «ገምጋሚ እንደገና እስኪያጸድቀው ድረስ ከገጹ ይወርዳል። ለሻጩ ይነገራል።»
- `admin.listings.move.sendBack.title` — "Send this listing back to review?" · «ይህ ማስታወቂያ ለግምገማ ይመለስ?»
- `admin.listings.reason.appeal_accepted` — "Appeal accepted" · «ይግባኝ ተቀባይነት አግኝቷል»
- `admin.listings.reason.contact_in_text` — "Contact details in the text" · «በጽሑፉ ውስጥ የመገናኛ መረጃ»
- `admin.listings.reason.duplicate` — "Duplicate ad" · «የተደገመ ማስታወቂያ»
- `admin.listings.reason.misleading` — "Misleading details" · «አሳሳች መረጃ»
- `admin.listings.reason.other` — "Other" · «ሌላ»
- `admin.listings.reason.photo` — "A photo" · «ፎቶ»
- `admin.listings.reason.prohibited` — "Prohibited item" · «የተከለከለ ዕቃ»
- `admin.listings.reason.removed_in_error` — "Removed in error" · «በስህተት የተወገደ»
- `admin.listings.reason.rules` — "The site's rules" · «የጣቢያው ደንቦች»
- `admin.listings.reason.undo` — "Undo" · «ቀልበስ»
- `admin.listings.reason.wrong_category` — "Wrong category" · «የተሳሳተ ምድብ»
- `admin.listings.searchLabel` — "Search" · «ፍለጋ»
- `admin.listings.searchPlaceholder` — "Title or listing id" · «አርዕስት ወይም የማስታወቂያ መለያ»
- `admin.listings.status.active` — "Live" · «በቀጥታ»
- `admin.listings.status.expired` — "Expired" · «ጊዜው ያለፈ»
- `admin.listings.status.held` — "Held" · «የተያዘ»
- `admin.listings.status.reduced` — "Reduced reach" · «የተቀነሰ ተደራሽነት»
- `admin.listings.status.rejected` — "Rejected" · «ውድቅ የተደረገ»
- `admin.listings.status.removed` — "Removed" · «የተወገደ»
- `admin.listings.status.screening` — "Waiting for review" · «ግምገማ በመጠበቅ ላይ»
- `admin.listings.status.sold` — "Sold" · «የተሸጠ»
- `admin.listings.tier.regular` — "Regular" · «መደበኛ»
- `admin.listings.undo.changed` — "The listing has changed since this edit, so it cannot be undone." · «ከዚህ ማስተካከያ በኋላ ማስታወቂያው ስለተቀየረ መቀልበስ አይቻልም።»
- `admin.listings.undo.confirm` — "Undo" · «ቀልብስ»
- `admin.listings.undo.done` — "Undone. The seller is told what changed: {fields}." · «ተቀልብሷል። የተቀየረው ለሻጩ ይነገራል፦ {fields}።»
- `admin.listings.undo.hint` — "The values from before this edit come back. The seller is told." · «ከዚህ ማስተካከያ በፊት የነበሩት እሴቶች ይመለሳሉ። ለሻጩ ይነገራል።»
- `admin.listings.undo.refused` — "The values from before this edit do not meet today's rules, so it cannot be undone: {fields}." · «ከዚህ ማስተካከያ በፊት የነበሩት እሴቶች የአሁኑን ደንቦች ስለማያሟሉ መቀልበስ አይቻልም፦ {fields}።»
- `admin.listings.undo.title` — "Undo this edit?" · «ይህ ማስተካከያ ይቀለበስ?»
- `admin.listings.view` — "View" · «ዕይታ»
- `admin.listings.view.ended` — "Ended" · «ያበቁ»
- `admin.listings.view.live` — "Live" · «በቀጥታ»
- `admin.listings.view.removed` — "Removed" · «የተወገዱ»
- `admin.listings.view.waiting` — "Waiting" · «በመጠባበቅ ላይ ያሉ»
- `admin.nav.group.listings` — "Listings" · «ማስታወቂያዎች»
- `admin.roles.action.open` — "Open" · «ክፈት»
- `admin.roles.noMatch` — "No role matches this search." · «ከዚህ ፍለጋ ጋር የሚዛመድ ሚና የለም።»
- `admin.roles.searchLabel` — "Search" · «ፍለጋ»
- `admin.roles.searchPlaceholder` — "Role key or display name" · «የሚና ቁልፍ ወይም የሚታይ ስም»
- `admin.screening.confirmApproveMany` — "Approve {count} ads? They go on the site now." · «{count} ማስታወቂያዎች ይጽደቁ? አሁን በገጹ ላይ ይጫናሉ።»
- `admin.screening.confirmRejectMany` — "Reject {count} ads? They stay off the site." · «{count} ማስታወቂያዎች ውድቅ ይደረጉ? ከገጹ ውጪ ሆነው ይቆያሉ።»
- `admin.screening.revealLimited` — "You have shown many numbers in the last hour. Try again later." · «ባለፈው አንድ ሰዓት ውስጥ ብዙ ቁጥሮችን አሳይተዋል። ቆይተው እንደገና ይሞክሩ።»
- `admin.screening.revealNotShown` — "The seller does not show this number." · «ሻጩ ይህን ቁጥር አያሳይም።»
- `admin.screening.showNumber` — "Show number" · «ቁጥሩን አሳይ»
- `admin.section.listings.body` — "Every listing on the site except drafts: its seller, place, price and state." · «ከረቂቆች በስተቀር በጣቢያው ላይ ያሉ ማስታወቂያዎች በሙሉ፦ ሻጩ፣ ቦታው፣ ዋጋውና ሁኔታው።»
- `admin.section.listings.title` — "All listings" · «ሁሉም ማስታወቂያዎች»
- `auth.errorPasswordMismatch` — "The passwords do not match." · «የይለፍ ቃሎቹ አይመሳሰሉም።»
- `auth.passwordConfirm` — "Confirm password" · «የይለፍ ቃሉን ያረጋግጡ»
- `post.preview.contactLabel` — "Contact the seller" · «ሻጩን ያግኙ»
- `prim.date.clear` — "Clear date" · «ቀኑን አጽዳ»
- `prim.date.next` — "Next month" · «የሚቀጥለው ወር»
- `prim.date.pick` — "Choose date" · «ቀን ይምረጡ»
- `prim.date.previous` — "Previous month" · «ቀዳሚው ወር»
- `prim.table.all` — "All" · «ሁሉም»
- `prim.table.columns` — "Columns" · «አምዶች»
- `prim.table.done` — "Done" · «ተጠናቋል»
- `prim.table.showAll` — "Show all" · «ሁሉንም አሳይ»
- `prim.table.showResults` — "Show {n} results" · «{n} ውጤቶችን አሳይ»
- `settings.newPasswordConfirm` — "Confirm new password" · «አዲሱን የይለፍ ቃል ያረጋግጡ»
- `settings.removePasswordAsk` — "Enter your current password to remove it." · «ለማስወገድ አሁን ያለውን የይለፍ ቃልዎን ያስገቡ።»

Changed in Amharic: `admin.attributes.links.done`.

## 3. IN FLIGHT AT HANDOVER

- With the executor after this records turn: turn C8 (§4 item 1), built by the supervisor and ready; this records turn's CI run judges the records and turn C6's code with them (pipelined).
- The operator: C6's migration applied on ethio-staging (its mark read back), Publish after the next green run; walks owed: the photo's red Remove (C2) on a draft with a photo and, after C8, Change password on a phone (INC-570). C4's walk is done: the roles menu's Open, sign-up's two boxes and Remove password's ask passed; Change password failed (INC-570); the reset page waits for production mail (S178).
- The account-security review: in its own thread (§1.4).
- The supervisor: DEC-174's judge (ten runs), DEC-172's count (five green runs), INC-345's close (two green runs after C6), the flake ledger read whole on every run.
- The curator: no message in flight.

## 4. THE PLAN AHEAD, IN ORDER

1. Turn C8 (built and ready) — the failure report names every refusal of the app's routes, the database and sign-in services and the posting doors (the posting-area turn's evidence first); INC-556 — the first-paint guard by the entry's import closure, the ceiling then decided by the operator (G52) under its own DEC; INC-570 — Settings' outcomes beside their controls. ESTIMATE 1 turn.
2. The posting-area turn — INC-449's class (PW-57, PW-137, PW-144), INC-533 (PW-64), INC-430's PW-55, INC-526 and INC-562 (PW-11), written from the first failure C8's evidence explains. ESTIMATE 1–3 executor turns.
3. The shell brief — D110–D117, D98's subcategory menus, the scroll area (D93 as changed by D114), D107 (the amber notice), with D135's look once the operator chooses it (research and options first). ESTIMATE 5–9 turns.
4. The admin groups' summary pages — last in the admin work; what each shows discussed first (G49).
5. Stage 1 — the rules (the legal section, the 18+ tick, the seller's certification, the banned-items and safety pages, the screening-promise wording).
6. Then the order of 2026-10-08 (roadmap "After bundle 7, in this order"); the account-security phase takes its place before launch when its register is in.
Dated duties: the weekly security review (Mondays); the feed bench every Sunday 16:10 UTC; the nightly every day 18:00 UTC.

## 5. RULES ADOPTED IN THIS PERIOD, NOT YET IN THE INSTRUCTIONS (in force from the day adopted; carried to the next version — G46)

- The next turn is always ready: each brief is built at once on a stand-in of the landing before it; a fix rides with the next work, never alone; a red is read from the evidence files and fixed in the turn after (the operator, 2026-10-12; S173, S175).
- A client filter's column is checked against the role's column grant; a filter test asserts a result the unfiltered list cannot give (INC-537, INC-538).
- A table's actions column is sized for its icons and read box by box against its cell (INC-542); no drop-down inside a toolbar panel (INC-543).
- A door acting for an admin on a seller's listing judges only what the admin can change (INC-552).
- No brief stops on the CI read: step 1 pastes what it shows and goes on (S176, S177). An action's outcome is drawn beside its control and comes into view; a test asserts it on screen (INC-570).
- An e2e test leases at most two pooled accounts (DEC-174); a test sets request headers on its own page (INC-569); the public menu is read through its one helper (INC-561); a read-everything loop pages by key (INC-568); a guard runs in CI or the unit tests (INC-563).
- No detail of an unfixed security hole enters the public repository; the record says the finding exists and holds its body until the fix is live (G51, applied to INC-564–INC-567).

## 6. WHAT THE OPERATOR SAID IN THIS PERIOD (his words; block S62 and the running record have each at its time)

- 2026-10-10: the three answers for bundle 11 — tick-boxes only where a bulk action exists, Columns on every table, the reveal log read in Audit (D128); "No code; keep the log" for Show number (D129); the seller box "HAS HAPHAZARD ARRRANGMENT" (D130); who viewed a contact, admin side (D131).
- 2026-10-11: the v2 boards "as drawn, for all" (D132); "filament ideas are being ignored here", "most of our users use phone", "3 d feel, shadows, borders … minimize clutter" (V2, D135); a panel's button only after a change (D133); the Listings console's four answers (D134, D136) and its approval (D137); "I am actually surpirized we have not yet build my listing page yet" (D138); "anyway to reduce this?" (DEC-171); a page per listing with its history (D139); L4 in two turns (D140).
- 2026-10-12: "Add it" — Undo this edit (D141); "we should not just send fix alone … we need to continually be working" (the standing directive); the roles menu's Open and the password confirmations (D142, D143); "can another user remove someone password and control the account? … I want a detail review and industry standard … if its a task for future, then logg each and every issue and keep for a phase" (the account-security review, ACT-020); the walk of C4: "change password doenst do anything, doesnt give alert" (INC-570) and "I dont see the email in my inbox" (the reset e-mail — S178).
