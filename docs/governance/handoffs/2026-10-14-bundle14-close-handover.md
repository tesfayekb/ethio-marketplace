# HANDOVER — 2026-10-14 — bundle 14 closed (the admin's page of one ad and the fixed category, turns 1–3); next: the seller's My listings page, its spec first

Written by the supervisor thread that wrote the handovers of 2026-10-05 to 2026-10-14. It SUPPLEMENTS `docs/governance/handoffs/2026-10-14-bundle13-close-handover.md` and, through it, the earlier ones (who is who; what the operator has ruled; the curator): those still hold except where this one says otherwise. Spec-ledger block S66 is the summary; `docs/governance/handoffs/2026-10-14-bundle14-close-running-record.md` is the full record, entry by entry.

## 1. STATE AT HANDOVER

### 1.1 Repository

- dev = `6e12f379` (turn 3; run 38593255281 running when this record was built), main = `cf750bc6` (turn 2; run 38590378235 green, promoted) when this record was built. Eleven `lovable-*` side branches on the remote, the known set (a twelfth is a stranded turn, G30).
- Bundle 14's three briefs are saved in docs/governance/briefs/ (bundle-14-turn-1.md … bundle-14-turn-3.md). Roadmap line 3 names no brief after this records turn: the next brief names itself there.
- Published site: the bundle-13 close (`d5217066`), on which the operator walked bundle 13 turn 16 (every line passed); bundle 14's turns go out at the next Publish.
- Highest test ids: A-8, A11Y-2, AID-6, AIF-3, AIM-5, AIP-2, AIS-5, AL-29, AMSG-3, AS-3, AT-81, AU-13, B-5, BC-4, BGR-10, C-9, CFM-3, CI-5, CMR-3, CO-9, CT-45, CV-8, DF-5, DQ-3, DR-4, DSP-3, EL-4, FB-6, FD-3, FE-14, FP-11, FR-8, FS-14, G-2, GAL-6, GE-5, GW-2, HOOK-1, HS-25, IB-3, IG-6, IMP-5, KP-3, LC-3, LE-6, LH-4, LK-5, LP-7, LR-4, LS-13, LT-16, LY-6, MD-4, MF-7, MR-4, OV-1, PBG-7, PC-6, PCH-6, PE-2, PED-9, PF-3, PH-3, PL-2, PP-31, PPOL-16, PPR-1, PR-44, PSH-2, PU-6, PW-188, PWN-1, QA-1, QN-4, R-9, RAW-3, RP-16, S-4, SC-22, SETM-4, SF-3, SG-4, SO-4, SP-7, SU-1, SV-5, TBL-4, TR-40, UD-2, UE-3, UNT-5, UP-6, US-2, VP-11.

### 1.2 Databases

- One migration in this block, applied on ethio-prod by the executor's tool and on ethio-staging by the operator, read back by its specific mark: turn 3 `20261014155221_b3376fd8` (mark `20261015040000`: `admin_edit_listing` and the seller's `edit_listing` redeclared whole, each refusing another leaf with "the category of a posted listing is not changed"; the undo door alone may put back a category moved before D172). On ethio-prod the bodies read back md5 `07cd57b9091c3befe914e128318a6f44` and `98adc312e33792b177a8383cf8cee8b6`, both VOLATILE SECURITY DEFINER with search_path public, neither executable by anon.
- On ethio-staging, turn 3's first apply was refused by its own proof C2: the SQL editor's paste adds a carriage return to every line (INC-624). The operator applied the file's text with its carriage returns stripped and read back the mark and both md5s equal to ethio-prod's. 329 of the 366 functions in `public` on ethio-staging carry carriage returns from hand pastes; they do not change what a function does, and nothing is written there by hand. From the next migration, a byte comparison of a body removes carriage returns first.

### 1.3 Catalogue and curator

- Unchanged since block S65: C37 batch 2 imported and walked; the batch-2 result and rulings message is with the operator for the curator; batches 3–16 follow.

### 1.4 Security

- In this block: the E2E window instruments leave production builds (INC-621; HOOK-1); the category of a posted ad is fixed at both doors (D172). The database tool's security warnings were 188 at turn 3, all of older kinds; the count by kind stays in the Project record (G51). The rise since the census of 2026-10-13 is bundle 13's own new signed-in doors, each checking its own permission.
- The security review of 2026-10-13 and the account-security review (ACT-020) continue in the Project record; their open items wait for the operator's ruling.

### 1.5 CI and platform

- CI: run 38590378235 on `cf750bc6` (turn 2) GREEN, 0 retried, promoted — main = `cf750bc6`; turn 3's run 38593255281 on `6e12f379` was running when this record was built. Turn 1's run 38576830362 was red (INC-620, INC-622).
- DEC-181 (CI runs queue) — KEPT at the end of its ten turns: the next prompt goes out as soon as the executor reports; Publish waits for a green head with the executor idle.
- The executor runs no typecheck and no build, and its sandbox cannot start a browser (INC-506): every browser test is proven in CI.
- The platform committed mid-turn in every turn of the block and pushed each turn once, as a merge: one CI run per turn.

### 1.6 Records

- This records turn lands block S66 (DEC-181's verdict, D171–D173, S207–S208), INC-620–INC-625 with the later word, system-state, the action tracker (ACT-009), the roadmap, this handover, the running record and the manifest.
- Numbering: next free INC-626; DEC-182; D174; S208; ACT-021.

## 2. THE BLOCK IN TABLES (compiled by the supervisor from the repository and the running record)

### 2.1 The turns

| Brief | Turn | What | Commit | CI |
|---|---|---|---|---|
| 1 | 1 | the admin's page of one ad: the ad as buyers see it with its activity; photos and Remove in Edit; Screening's preview view-only with a link (D169) | `e84f2a01` | red: AL-28 (INC-620, the brief's step-up premise); PP-13 timed out (INC-622) |
| 2 | 2 | AL-28's step-up through the E2E window instrument (INC-620); the window instruments E2E only (INC-621); the countries console's dump (INC-623); Edit in boxes, the category fixed, "Inappropriate photo" (D171, D172) | `cf750bc6` | green (0 retried), promoted |
| 3 | 3 | neither door moves a posted ad to another category (D172; one migration) | `6e12f379` | running when this record was built (run 38593255281); judged with the records turn's run |

### 2.2 The strings (read at the base of this records turn against `d5217066` by script)

1 keys added in both languages, 0 removed, 2 changed in English and 2 in Amharic. Every Amharic string of the period was listed key by key to the operator and approved by him (G43). The added keys, each "English" · «Amharic»:

- `admin.screening.openListing` — "Open the ad's page" · «የማስታወቂያውን ገጽ ክፈት»

Changed in English: `admin.listings.edit.hint`, `admin.listings.reason.photo`.

Changed in Amharic: `admin.listings.edit.hint`, `admin.listings.reason.photo`.

## 3. IN FLIGHT AT HANDOVER

- CI: turn 3's run 38593255281 on `6e12f379`. This records turn's own run follows.
- The operator: Publish once this records turn's run is green and Lovable is idle; then "Sync keys" in Admin › Translations and the short walk of bundle 14; the batch-2 rulings message to the curator; a glance at ethio-staging's monthly active users (the E2E account pool) before 2026-11-01; owed rulings: the My listings spec's approval when it comes, and the security review's open items.
- The supervisor: the My listings page's spec (D138, D172's seller side, D173), written for the operator's approval before any brief (G49); the judges open in block S66; INC-622 and INC-623 — the next body read the day it appears; every CI read runs the read script.
- The curator: the batch-2 result and rulings message, then batch 3.

## 4. THE PLAN AHEAD, IN ORDER

1. Publish once this records turn's run is green and Lovable is idle; "Sync keys" in Admin › Translations (turn 2's two changed strings and turn 1's new one); then one short walk of bundle 14 (the ad's page; Edit's boxes at 360 and 1280; the category shown and not changeable; "Inappropriate photo").
2. The seller's My listings page (D138; today a placeholder) — its spec first, for the operator's approval: the seller's ads and their full detail with status history and every admin change; Edit in the same boxes as staff (photos, title and description, specifications, price; never the category — D172); the states of D173 (Sold, Reserved, No longer available, each a ribbon; Rented and Filled by type; "Price reduced" automatic under its honesty rules; a Sold page kept 30 days); pause, delete and renew (INC-469, INC-470). ESTIMATE 3–5 turns after the spec.
3. D170: a faint ethio.com mark and a soft left-to-right shadow on photos whose background was removed (after My listings). ESTIMATE 1 turn.
4. D149's publishing statement (D150, D152 agreed), after My listings (D173). ESTIMATE 1–2 turns.
5. The tidy-up round's carried items (roadmap): INC-497, INC-398, the flaky tests, a full read of the Amharic catalogue (INC-489), the posting era's four-lens review, the E2E account pool's confirmation before 2026-11-01. ESTIMATE 2–3 turns, folded into others where possible.
6. The shell brief (D110–D117, D98, D93/D114, D107, D135's look), then stage 1 (the rules), then the order of 2026-10-08. ESTIMATE 4–6 turns for the shell after its spec.
Total before stage 1: ESTIMATE 12–18 executor turns. Dated duties: the weekly security review (Mondays); the feed bench every Sunday 16:10 UTC; the nightly every day 18:00 UTC.

## 5. RULES ADOPTED IN THIS BLOCK, NOT YET IN THE INSTRUCTIONS (in force from the day adopted; carried to the next version — G46)

- A test's premise about the app — what a helper does, what a stamp means — is read in the code as built, never in a helper's comment; a helper that no longer does what its name says is removed with its calls (INC-620, S207).
- Every test-only window instrument is gated on `isE2E`; HOOK-1 is its census (INC-621).
- A TOTP code is spent once: a test that answers the modal with the identity it just verified waits for the next step (INC-620).
- A redeclared door is built by script from its last declaration, the census compares the live body's md5 with the repository's before anything is written, and its proof compares the rest of the new body with the earlier one (bundle 14 turn 3).
- A proof never depends on how the text reached the database: a byte comparison of a function body removes carriage returns first (INC-624, S208).
- DEC-181 is kept: the next prompt goes out when the executor reports.

## 6. THE SELLER-STATES STUDY (2026-10-14; for D172's seller side; decided as D173)

What the main marketplaces do, read by the supervisor on 2026-10-14 (what a source does not say is marked so):

- Facebook Marketplace: Available, Pending and Sold. Pending is a courtesy hold for one buyer, not binding; other buyers can still message; back to Available notifies those who saved the item. Whether a sold listing stays visible is not confirmed. (Republic World, "what does pending mean on Facebook Marketplace"; Pocket Money NZ, "how to mark pending pick-up on Facebook Marketplace".)
- Jiji (Africa): the seller closes the ad, with an optional reason — Sold on Jiji, Sold on another site, Not selling it anymore, Other; rentals, jobs and services have their own reasons. The ad becomes Closed and leaves search; it can be renewed. No ribbon is described. (jiji.ng/faq/mark-ad-as-sold.)
- Kijiji (Canada): Mark as sold or rented, with where — Kijiji, Elsewhere, Prefer not to say; the listing leaves public view and search and stays 60 days in the seller's Sold tab, where it can be reactivated. (community.kijiji.ca, "how to mark rental properties as rented".)
- eBay (shops): a lower price with the old one struck through, labelled "Compare at" in the US; in Great Britain "Was" only when the same seller sold the item at that price within 30 days (60 in Germany); now limited to existing sellers. (developer.ebay.com, discount pricing.)
- Google Shopping: a "Price drop" badge with "Was $749", only when the price falls below the seller's average of the past 60 days after a stable price. (Google Merchant Center help, price drop annotations.)
- Etsy: a struck-through price must be the item's real, usual price for a substantial period; sales are temporary and the saving real. (Etsy Seller Handbook.)
- Zillow (homes): price cuts are common — 26.9% of US listings in October 2025, median cumulative cut $25,000; how the label looks is not confirmed. (Zillow press release, 2025-11-24.)
- Vinted's help pages could not be read (the fetch failed).

What was proposed and decided (D173, every recommended option): Sold, Reserved and No longer available, each a ribbon (Rented and Filled by type); "Price reduced" automatic with the honesty rules (the old price stood at least 7 days, the drop at least 5%, shown 14 days); a Sold page kept 30 days, then archived; My listings before D149. The app's `reduced` status means "Reduced reach" (a moderation state), so the price ribbon takes another internal name.

## 7. WHAT THE OPERATOR SAID IN THIS BLOCK (his words; block S66 and the running record have each at its time)

- 2026-10-14 10:54 local (the walk of bundle 13 turn 16): line 1 "yes and yes"; line 2 "yes and yes".
- 2026-10-14 11:06 local: "Inside admin, screening queue list when i click the advert and preview as buyer, I no longer see remove image despite the image may not fit the add label. I see open adds page and when i click takes me to page where i can edit, i can delete the image, and (the reason should have "inappropriate photo removed" as a reason, saved and stepup worked, and approved. The edit menue or presentation may not be like what we designed the rest of the pages, please amke sure it works with our page designs so far, and responsive in different screens." (D171)
- 2026-10-14 11:12 local: "change category should not be an option on edit gioven so many things change after changing catgeory. so on edit we should never change any category. should disable that feature of changing category by user or admin on published add even waiting in que for approval because so many specification, descriptions etc will change. Pictures, TITLE, DESCRIPTION, SPECIFICATIONS, PRICE CAN CHANGE. MOREOVER FOR USER PART OF THE EDIT MAY BE PRICE REDUCTION AS IN SALE, SOLD, NO LONGER AVAILABLE, ETC THAT NEEDS A RIBBON AFTER CLICKING. ALSO ITS BEST TO PUT TITLE AND DESCRIPTION IN OTS BOX, SPECIFICATION IN ITS BOX, PRICE IN ITS BOX SO WE HAVE VISUAL SEPARATION ON EDIT TOGETHER WITH CLICKABLE BOX LIKE SOLD, NO LONGER AVAILABLE, ETC ETC. PLEASE REVIEW MAIN SITES AS TO WHAT TAGS OR RIBBONS WE NEED TO USE AND WE SHOULD HAVE THIOSE HERE" (D172)
- 2026-10-14 11:29 local: "OK, WHAT ARE THE STEPS LEFT BEFORE WE START STAGE 1. PLEASE OUTLINE WHERE WE ARE AND WHAT IS LEFT"
- 2026-10-14 12:05–12:08 local (the staging apply of turn 3, with the history of his exchange with the executor): the read-back pasted — both md5s equal to ethio-prod's, no carriage return, the mark present; 329 of 366 staging functions carry carriage returns.
