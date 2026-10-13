# HANDOVER — 2026-10-13 — bundle 12 closed (the tidy-up round, turns T1–T17); bundle 13, photos, next

Written by the supervisor thread that wrote the handovers of 2026-10-05 to 2026-10-13. It SUPPLEMENTS `docs/governance/handoffs/2026-10-13-bundle11-close-handover.md` and, through it, the earlier ones (who is who; what the operator has ruled; the curator): those still hold except where this one says otherwise. Spec-ledger block S64 is the summary; `docs/governance/handoffs/2026-10-13-bundle12-close-running-record.md` is the full record, entry by entry.

## 1. STATE AT HANDOVER

### 1.1 Repository

- dev = main = `7e4db15e` (turn T17; run 38434521261 green, promoted) when this record was built. Eleven `lovable-*` side branches on the remote, the known set (a twelfth is a stranded turn, G30).
- Bundle 12's seventeen briefs are saved in docs/governance/briefs/ (bundle-12-turn-1.md … bundle-12-turn-17.md). Roadmap line 3 names no brief after this records turn: bundle 13's first brief names itself there.
- Published site: the operator was asked to Publish main `7e4db15e` (turns T15–T17: the photo step's controls, the order, every stored size screened, lighter photos).
- Highest test ids: A-8, A11Y-2, AL-27, AMSG-3, AS-3, AT-81, AU-13, B-5, BC-4, C-9, CFM-3, CI-5, CMR-3, CO-9, CT-45, CV-8, DF-5, DQ-3, DR-4, DSP-3, EL-4, FB-6, FD-3, FE-14, FP-10, FR-8, FS-14, G-2, GE-5, GW-2, HS-25, IB-3, IG-6, IMP-5, KP-3, LC-2, LE-6, LH-4, LK-3, LR-4, LS-13, LT-16, LY-6, MD-4, MF-7, MR-4, OV-1, PC-6, PE-2, PF-3, PL-2, PP-18, PPOL-8, PPR-1, PR-44, PU-3, PW-187, QN-4, R-9, RP-16, S-4, SC-17, SETM-4, SF-3, SG-4, SO-4, SP-7, SU-1, TBL-4, TR-39, UD-2, UE-3, UP-6, US-2, VP-11.

### 1.2 Databases

- Five migrations in this block, each applied on ethio-prod by the executor's tool and on ethio-staging by the operator, read back by its specific mark: T7 `20261013053246_5a2fbde9` (mark `20261013180000`, the parent-first guard on `category_tree_pointers`); T10 `20261013073618_98a0576f` (`20261013190000`, `import_gate_audit` checks the family's own permission); T14 `20261013142425_e5c32a76` (`20261014030000`, the plans table read by column); T15 `20261013150607_3c427432` (`20261014040000`, `set_cover_photo` moves the photo first); T16 `20261013161059_de83e291` (`20261014050000`, `move_listing_photo`). The newest mark by value is `20261014050000`.
- The photo bucket `listing-photos` stays private on both projects; screens draw stored photos through links the server signs for one hour (D151).

### 1.3 Catalogue and curator

- C37 batch 1 (Phones & Tablets) imported on ethio-prod as one definitions file and one links file ("6 added · 10 changed · 1 unlinked · 0 deleted · 0 unchanged · 0 refused — 17 changes written") and walked (4 of 4): the series and model lists with one root Other each and the per-parent Others switched off, a SIM question (pinned by the model where every version has one setup), "No account lock (iCloud, Google)", Dual SIM unlinked from Smartphones. The Translations approval of the two new names was asked of the operator.
- The batch-2 message (Electronics, the rest) is with the operator for the curator, with fresh exports to attach; it carries INC-602's census (every screen-size fact). Batches 3–16 wait for batch 2's import and walk.

### 1.4 Security

- The security review of 2026-10-13 (the Project record, G51): F1 and F3 fixed (T10, T14); the other items wait for the operator's ruling. INC-590 (T6) and INC-601 (T17) are recorded in the repository now that their fixes are live. The account-security review (ACT-020) continues in its own thread; INC-564–INC-567 stay in the Project record until their fixes are live.
- In this block: every stored photo size passes the policy pass (INC-601); the upload's size dials are 1 MB / 150 KB / 30 KB (D157); the import gate's audit row requires the family's own permission; the browser roles read the plans table by column.

### 1.5 CI and platform

- CI: run 38434521261 on `7e4db15e` (T17) GREEN, promoted — main = dev = `7e4db15e`, no test retried. On the completed runs of the block, retried tests per run: 0, 0, 0, 0, 9 (staging degraded), 0, 1, 0, 0, 2, 3, 0.
- The evidence files name errors outside any test and warning steps (DEC-180) and find Playwright's own context directories (DEC-179); the fast lane has been green on every completed run since 4cb2c589.
- The executor runs no typecheck and no build, and its sandbox cannot start a browser (INC-506): every browser test is proven in CI.

### 1.6 Records

- This records turn lands block S64 (DEC-179–DEC-180, D148–D159, S183–S196), INC-587–INC-602 with the later word on the earlier entries, system-state, the action tracker (ACT-009's tidy-up round run and its items carried), the roadmap, this handover, the running record and the manifest.
- Numbering: next free INC-603; DEC-181; D160; S197; ACT-021.

## 2. THE BLOCK IN TABLES (compiled by the supervisor from the repository and the running record)

### 2.1 The turns

| Brief | Turn | What | Commit | CI |
|---|---|---|---|---|
| 1 | T1 | the home page never shows before the page asked for (INC-581); Next held while a photo is refused (INC-585); a business card passes (INC-584, D148); the evidence file's context names (DEC-179: INC-429, INC-495, INC-419); listings.md's states (INC-471); INC-582's census | `ff2d094b` | green (0 retried; the fast lane exited 1 with every test green — INC-589) |
| 2 | T2 | CO-2's window no write crosses (INC-586); the page stopped before the purge (INC-398); an option named Other carries the value `other` (INC-582's gate rule) | `304017ca` | cancelled by T3/T4; judged by T4's green run |
| 3 | T3 | the editor names the listings an answer's removal holds (AT-81); the gate spares a switched-off Other (S183) | `227e7480` | superseded; judged by T4's green run |
| 4 | T4 | a deleted option never prints its raw value (INC-587); INC-588's measurement | `4959bbc4` | green (0 retried; the fast lane exited 1 again — INC-589) |
| 5 | T5 | CT-20's scratch roots state no place (INC-497); errors outside any test and warning steps (DEC-180: INC-589, INC-492) | `28832d59` | cancelled by T6; judged by T6's run |
| 6 | T6 | stored photos drawn through links that expire (D151, INC-588); the writing helper names photos by id (INC-590); PP-12, PP-13, LK-1..3, PU-1..3 | `cd51ab03` | red: PP-12 (INC-591) |
| 7 | T7 | the parent-first guard covers a move of the home path (one migration); a door's key in the categories console (INC-578's class); INC-398's attribution; PP-12's step (INC-591) | `4cb2c589` | green (0 retried), promoted |
| 8 | T8 | read only: INC-488 through get_ui_bundle; the advisors' warnings (chat only) | `f6027a22` | cancelled by T9 |
| 9 | T9 | read only: INC-592's reads (P1–P3); the signed-in definer functions, pages 1–4 | `0b089810` | red: ethio-staging server errors (class b; 9 retried) |
| 10 | T10 | import_gate_audit refuses a caller without the family's own import permission (one migration; IG-6) | `961160c8` | green (0 retried), promoted |
| 11 | T11 | read only: INC-488 after Sync keys; the id census | `d7e8f917` | red: PW-187 (INC-593); 1 retried (CT-18) |
| 12 | T12 | a logo passes like a business card (D153; PPOL-4) | `5dd4f810` | green (0 retried), promoted |
| 13 | T13 | PW-187 waits for the home page, not its listings (INC-593) | `5753740e` | red: AU-12 (INC-598) |
| 14 | T14 | the plans table read by column (one migration; CV-8); GW-1/GW-2's own timeout (INC-594) | `cca09202` | green (2 retried), promoted |
| 15 | T15 | AU-12's reserved handle (INC-598); every photo removable and made the cover (INC-595, INC-596); Make cover moves the photo first (INC-597, one migration); photos dropped on a computer (D154) | `48b0b91f` | green (3 retried), promoted |
| 16 | T16 | Move earlier, Move later and drag (D154; `move_listing_photo`, one migration; PP-17, PP-18) | `574e31d5` | cancelled by T17 (finished sources 0 failed); judged by T17's green run |
| 17 | T17 | every stored size screened (INC-601); the high-quality filter (INC-599); D157's qualities and size dials | `7e4db15e` | green (0 retried), promoted |

### 2.2 The strings (read at the base of this records turn against `506d4a4e` by script)

4 keys added in both languages, 0 removed, 2 changed in English and 2 in Amharic. Every Amharic string of the period was listed key by key to the operator and approved by him (G43). The added keys, each "English" · «Amharic»:

- `admin.attributes.edit.removedHolders` — "{count} listings hold an answer this change removes. To keep its words on those listings, untick “Offered when posting” instead of removing the option." · «{count} ዝርዝሮች ይህ ለውጥ የሚያስወግደውን መልስ ይዘዋል። ቃሉ በእነዚያ ዝርዝሮች ላይ እንዲቆይ፣ አማራጩን ከማስወገድ ይልቅ «በማስታወቂያ ጊዜ ይቀርባል» የሚለውን ምልክት ያንሱ።»
- `admin.attributes.import.reason.optionOtherValue` — "An option named Other on this row must have the value other" · «በዚህ መስመር Other የሚል ስም ያለው አማራጭ ዋጋው other መሆን አለበት»
- `post.photos.nextHeld` — "Remove the photo that could not be added to continue." · «ለመቀጠል ያልተጨመረውን ፎቶ ያስወግዱ።»
- `post.photos.public` — "Everything in your photos is public: anyone can see it, including the phone number, e-mail and address on a business card." · «በፎቶዎችዎ ላይ ያለው ሁሉ ለማንም ይታያል፤ በቢዝነስ ካርድ ላይ ያለ ስልክ ቁጥር፣ ኢሜይልና አድራሻም ጭምር።»

Changed in English: `post.photos.helper`, `post.photos.rules`.

Changed in Amharic: `post.photos.helper`, `post.photos.rules`.

## 3. IN FLIGHT AT HANDOVER

- CI: run 38434521261 on `7e4db15e` GREEN, promoted. This records turn's own run follows.
- The operator: Publish of `7e4db15e` (asked before this records turn — INC-601's fix is live with it); the photo walk of T15–T17 (seven lines, sent 17:3xZ); the Translations approval of the two batch-1 names; the batch-2 message to the curator; owed rulings: the security review's open items, and D149's publishing statement's place against bundle 13.
- The supervisor: the judges open in block S64 (INC-497, INC-576, INC-449; INC-398 parked); INC-579 (the first `[roster-dump]` line decides its fix); Photoroom's data terms before D155b; the My listings page's peer study and spec.
- The curator: batch 2 (Electronics, the rest), after the operator forwards the message with fresh exports.

## 4. THE PLAN AHEAD, IN ORDER

1. Bundle 13 — photos (D154, D155, D157–D159; the spec is the Project doc claude/photo-spec-d154-v1.md): first the AI cost controls (D158 — Admin › Services › AI: switches, budgets, spend, auto-off except screening, photos held for staff when screening is off, per-seller daily limits; INC-600); then rotate and crop; the relevance warning (`not_relevant`, the seller warned, the ad flagged for staff); staff removing a photo (`admin_edit_listing` `remove_photos`) and the screening step's photo changes on published ads; background removal (D159: once per ad plus one retry, on the photo the seller has chosen as the cover, in every category; Photoroom, D156, its data terms read first; the house colour fixed). ESTIMATE 4–7 turns.
2. Beside it: the seller's My listings page (D138) — peer study and spec first (G49); built after bundle 13.
3. D149's publishing statement (D150, D152 agreed) — "right after the tidy-up round" by D149; its place against bundle 13 is asked of the operator.
4. The tidy-up round's carried items (roadmap): INC-579, INC-398, the flaky tests, INC-488's class, the Amharic catalogue read (INC-489), the posting era's four-lens review, the E2E account pool before 2026-11-01.
5. The shell brief (D110–D117, D98, D93/D114, D107, D135's look), then stage 1 (the rules), then the order of 2026-10-08.
Dated duties: the weekly security review (Mondays); the feed bench every Sunday 16:10 UTC; the nightly every day 18:00 UTC.

## 5. RULES ADOPTED IN THIS BLOCK, NOT YET IN THE INSTRUCTIONS (in force from the day adopted; carried to the next version — G46)

- A ruling about what an importer accepts is written after the importer's own rules for that change are read (S183–S185).
- A red-first claim that could not be run says "not run" (S186).
- Every walk after a Publish opens with "close every tab, then open the site fresh" (S187).
- Every surface fix opens with a census of its verbs × states × actors (S188).
- An audit runs on the tool's own limits, read from its code (S189).
- A frozen judge names every term it depends on (S193); a cost figure for a paid call is computed from the provider's billing rule (S194).
- A server never trusts a client's claim that one input derives from another (INC-601, INC-590).
- A curator batch is ONE definitions file and one links file, imported together (the batch-2 ruling).
- Every CI read that closes a turn counts each open judge (S180, again S195).

## 6. WHAT THE OPERATOR SAID IN THIS BLOCK (his words; block S64 and the running record have each at its time)

- 2026-10-12 22:49 local: "ANYTHING ON BUSINESS CARD SHOULD BE ALLOWED, JUST A DISCLOSURE EVERYTHING ON PHONE WILL GO PUBLIC FOR EVERYONE" (D148).
- 2026-10-12 23:12 local: "WHILE WHATING FOR GREEN CI PLEASE GIVE ME THE NEXT PROMPT OR WORK, SO WE DONT SIT IDEAL AND PROCESS GETS FASTER, WHICH i HAVE BEEN REQUESTING FOR SO LONG".
- 2026-10-13 01:29 local: "PLEASE SCHEDULE THE CHECK AND NEXT TASK AFTER CI IS DONE WITH NEXT TURN, IF ITS SOMETHING FOR MY REVIEW PLEASE GIVE ME AND LETS CONTINUE".
- 2026-10-13 01:44 local: "ON THE ABOVE DECISIONS- AGREED" (D152).
- 2026-10-13 02:36 and 03:07 local: the logo — "can someone post restricted logo? what is others experience … I tend to say A"; 08:05 local: "A" (D153).
- 2026-10-13 09:49 local: "once a photo is added, is there anyway to remove it, no remove or edit button … I am disappointed this is not tough out well … please do review and study other standard photo upload functions in the market … the photo still needs to be relevant."
- 2026-10-13 10:20 local: "approve, but make sure its secure, lightweight … automatically make it light weight without significantly affecting the quality … a standard background color that fits our theme for all images … the background color can not be changed" (D154 approved; D155).
- 2026-10-13 11:55 local: "reference 1" (D157); "please review cost control measures as well so we dont get charged exorbitently. also a control from admin side to disable that feature if cost increases" (D158).
- 2026-10-13 12:27 local: "we should make only one background removal per posting, that will be for the main image that will show on the card … obviously ai screening for all images … reject any other type of images being uploaded, obviously samitization, validations, etc" (D159).
