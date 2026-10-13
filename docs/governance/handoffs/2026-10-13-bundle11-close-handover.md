# HANDOVER — 2026-10-13 — bundle 11 closed (the posting-area turns C8–C15 after its thirty-five); the tidy-up round next (D145)

Written by the supervisor thread that wrote the handovers of 2026-10-05 to 2026-10-12. It SUPPLEMENTS `docs/governance/handoffs/2026-10-12-bundle11-handover.md` and, through it, the earlier ones (who is who; what the operator has ruled; the curator): those still hold except where this one says otherwise. Spec-ledger block S63 is the summary; `docs/governance/handoffs/2026-10-13-bundle11-close-running-record.md` is the full record, entry by entry.

## 1. STATE AT HANDOVER

### 1.1 Repository

- dev = main = `6c0c2be5` (turn C15; run 38335668624 green, promoted) when this record was built. Eleven `lovable-*` side branches on the remote, the known set (a twelfth is a stranded turn, G30).
- Bundle 11's forty-three briefs are saved in docs/governance/briefs/ (bundle-11-turn-1.md … bundle-11-turn-43.md; turns 36–43 in block S63, the rest in block S62). Roadmap line 3 names no brief after this records turn: the tidy-up round's first brief names itself there.
- Published site: the operator was asked to Publish main `74503dfd` (C12's upstream answers and C13's specifications step) and now `6c0c2be5` (C14's routes; C15 is a test and docs).
- Highest test ids: A-8, A11Y-2, AL-27, AMSG-3, AS-3, AT-80, AU-13, B-5, BC-4, C-9, CFM-3, CI-5, CMR-3, CO-9, CT-44, CV-7, DF-5, DQ-3, DR-4, EL-4, FB-6, FD-3, FE-14, FP-10, FR-8, FS-14, G-2, GE-5, GW-2, HS-25, IB-3, IG-5, IMP-5, KP-3, LC-2, LE-6, LH-4, LR-4, LS-13, LT-16, LY-6, MD-4, MF-7, MR-4, OV-1, PC-6, PF-3, PL-2, PP-10, PPR-1, PR-44, PW-186, QN-4, R-9, RP-16, S-4, SC-17, SETM-4, SF-3, SG-4, SO-4, SP-7, SU-1, TBL-4, TR-39, UD-2, UE-3, UP-6, US-2, VP-11.

### 1.2 Databases

- No migration in this block. The newest mark by value is still `20261012180000` (turn C6, `admin_export_translations`), on ethio-prod and on ethio-staging.
- Turn C14's read-only measurement: ethio-staging held 160 categories (7 scratch, none older than a day), 161 tree pointers and 225 attribute links; ethio-prod 169 categories, 214 pointers and 1,321 links. The executor's role may not execute `cat_primary_parent` on ethio-prod; no permission was changed.

### 1.3 Catalogue and curator

- Unchanged in the block: nothing imported. The curator's C36 plan (phone locks and SIMs, research and plan only, delivered 2026-10-07) was never brought until the operator attached it on 2026-10-13: nothing of it is ruled or built. Its eight rulings go out with D147's full review of every category and specification (INC-582, INC-583) in the curator's next message, after the supervisor's audit against the form as built (G47).

### 1.4 Security

- Unchanged from the 2026-10-12 handover: secret scanning and push protection on; the account-security review (ACT-020) in its own read-only thread; INC-564–INC-567 held in the Project record until their fixes are live (G51).
- In this block: the posting routes and the sign-in checks answer an upstream failure with 503, never as a refusal or "not signed in" (INC-574); the identity and alias routes never send a door's raw words (INC-578).

### 1.5 CI and platform

- CI: run 38266101610 on `74503dfd` GREEN (0 retried); run 38307275746 on `524ffedb` RED on TR-29 alone (INC-580); run 38335668624 on `6c0c2be5` (C15) GREEN, promoted — main = dev = `6c0c2be5`, 2 retried (CO-2 — INC-586; TR-31).
- Six E2E shards with equal slices again (DEC-172's verdict, turn C11): a run takes about 30–36 minutes; retried tests per run on the six-shard runs so far: 1, 5, 0, 0 (they were 3 to 17 on eight shards).
- The failure report now names every refusal (DEC-175) and carries a flaky attempt's own client errors (DEC-177); the first-paint guard measures the entry's static import closure (DEC-176; 309.6 KiB of 320, D144). The e2e fixture answers the category finder unless a test routes it (DEC-178).
- The executor runs no typecheck and no build (the platform's rule of 2026-10-12); CI's jobs prove them and the supervisor runs both on its own copy before each brief. Its sandbox still cannot start a browser (INC-506): every browser test is proven in CI.

### 1.6 Records

- This records turn lands block S63 (DEC-175–DEC-178, D144–D147, S179–S182), INC-571–INC-586, system-state, the action tracker (ACT-018 closed; ACT-009's tidy-up round brought forward — D145), the roadmap, this handover, the running record and the manifest.
- Numbering: next free INC-587; DEC-179; D148; S183; ACT-021.

## 2. THE BLOCK IN TABLES (compiled by the supervisor from the repository and the running record)

### 2.1 The turns

| Brief | Turn | What | Commit | CI |
|---|---|---|---|---|
| 36 | C8 | the failure report names every refusal (DEC-175); the first-paint closure (DEC-176); Settings outcomes beside their controls (INC-570); EL-4 (INC-571) | `a2bf1847` | green (12 retried) |
| 37 | C9 | the place step's door calls one at a time (INC-526); the ceiling kept (D144) | `93b4cbe1` | green (17 retried) |
| 38 | C10 | a flaky body carries its attempt's client errors (DEC-177); PR-33 in one clock hour (INC-572) | `45637132` | green (3 retried) |
| 39 | C11 | DEC-172's verdict: six shards; the location grid's rows (INC-573) | `87dc5630` | red: SETM-1 (INC-575); every E2E job green |
| 40 | C12 | an upstream failure is not a refusal (INC-574); SETM-1 (INC-575) | `7d44c150` | red: AT-6 (INC-579) |
| 41 | C13 | "Details reset" only when something held was taken (INC-576); the finder stub (DEC-178, INC-577) | `74503dfd` | green (0 retried) |
| 42 | C14 | INC-579's evidence and measurement; a door's words never raw (INC-578) | `524ffedb` | red: TR-29 (INC-580) |
| 43 | C15 | TR-29 by rows it owns (INC-580) | `6c0c2be5` | green, promoted (2 retried) |

### 2.2 The strings (read at the base of this records turn against `3a26255f` by script)

No key was added, removed or changed in either language between `3a26255f` and this records base: no turn of block S63 changed a string.

## 3. IN FLIGHT AT HANDOVER

- CI: run 38335668624 on `6c0c2be5` (turn C15) GREEN, promoted: main = dev = `6c0c2be5`. This records turn's own run follows.
- The operator: Publish after the next green run. His walk of 2026-10-13 passed all three lines (INC-570's two refusals; C2's red Remove) and named five findings, INC-581–INC-585. Owed by him: the ruling on a business card's phone number or e-mail (INC-584). The reset page waits for production mail (the launch gate's custom sending domain; S178).
- The supervisor: INC-579 (the first `[roster-dump]` line decides its fix); the judges open in block S63 (DEC-178, INC-576, INC-449); INC-586 (CO-2); the flake ledger read whole on every run, counted by run.
- The account-security review: in its own thread (§1.4). The curator: the next message (C36's rulings and D147's review) is being written.

## 4. THE PLAN AHEAD, IN ORDER (D145: the operator, 2026-10-12 22:10 local)

1. The tidy-up round — ACT-009's close-out, in consolidated turns of several fixes each, every fix's cause read before it is built (G21). First the operator's walk findings (G26): INC-581 (the page flash), INC-582 (Other's write-in), INC-584 (the business card), INC-585 (a refused photo blocks Next); then the truth pass of the roadmap's open lines; the flaky tests (INC-440 PW-76, INC-441, INC-449 PW-57/PW-137/PW-144, INC-430 PW-55, INC-533 PW-64, INC-562 PW-11, INC-497 CT-18, INC-502/INC-285/INC-428 LS-6, INC-586 CO-2, INC-487 if it is contention); INC-579 when its dump arrives; the CI report's gaps (INC-419 ESLint lines, INC-429 "context file not found"); INC-398 ("listing not found"); INC-420 (the lockfile's private cache addresses — a package-level turn of its own, G42); the E2E account pool before 2026-11-01; docs/features/listings.md (INC-471); CI run time; what bundle 7 named and did not build (the definition editor's holders count, a pointer move against the parent-first guard, the parent-first refusal in the import preview, one unit case of the reset function); the four-lens review of the posting era (G19); the Translations store following a changed seed text by itself (INC-488's class); a full read of the Amharic catalogue (INC-489); the scan's upload step and the status report's silence while queued (INC-492); AT-3 and its shared helper (INC-494); the flake ledger's re-run duplicates (INC-495). ESTIMATE 6–9 executor turns.
2. The shell brief — D110–D117, D98's subcategory menus, the scroll area (D93 as changed by D114), D107 (the amber notice), with D135's look once the operator chooses it (research and options first). ESTIMATE 5–9 turns.
3. The admin groups' summary pages — last in the admin work; what each shows discussed first (G49).
   Beside the executor's track: the curator's C36 rulings and D147's full catalogue review (INC-582, INC-583); D146's photo stage (editing, formatting, detailed AI screening) takes its place with the posting-form extras.
4. Stage 1 — the rules (the legal section, the 18+ tick, the seller's certification, the banned-items and safety pages, the screening-promise wording); then the order of 2026-10-08 (roadmap "After bundle 7, in this order"); the account-security phase takes its place before launch when its register is in.
Dated duties: the weekly security review (Mondays); the feed bench every Sunday 16:10 UTC; the nightly every day 18:00 UTC.

## 5. RULES ADOPTED IN THIS BLOCK, NOT YET IN THE INSTRUCTIONS (in force from the day adopted; carried to the next version — G46)

- The executor runs no typecheck and no build; a brief lists them as "not run by you" and the supervisor runs them on its own copy.
- The next turn is ready before the running one lands and is given without waiting for CI; a red found afterwards rides the turn after, fixed first (D145, restating 2026-10-12). When the planned next turn waits on evidence, the turn built ahead is the next item that does not (S179).
- Every CI read that closes a turn counts each open judge and reads the flake ledger whole, by run (S180, S181).
- A whole-tree check run as a unit test states its limit beside its cause (INC-571).
- A transport failure is never answered as a verdict (INC-574).
- An absence check on a timed notice reads once, in the render that would show it (INC-576).
- A test's positive control is made of rows the test owns (INC-580, S182).
- No fix without its cause: when the evidence does not name it, the turn arms the evidence and measures, and the fix follows (INC-579; G21).

## 6. WHAT THE OPERATOR SAID IN THIS BLOCK (his words; block S63 and the running record have each at its time)

- 2026-10-12 07:10 local: "keep it" — the 320 KiB first-paint ceiling (D144).
- 2026-10-12 07:13 and 07:52 local: "ci is running, please prepare the next while waiting for ci to complete"; "please follow ci and prepare the next prompt".
- 2026-10-12 10:41 and 10:45 local: "what are we really working on? are we in bundle 11, what part of it are we doing and where are we in the overall plan?"; "I want everything to be done correctly. if we go on how many more turns, and can we do many at once and shorten duration?"
- 2026-10-12 10:48 local: "for C12, CI is red … fix with next turn".
- 2026-10-12 22:10 local: "B, also do the tidy-up round now is my choice, we dont wait for ci to finish before giving the next prompt" (D145).
- 2026-10-12 22:12 local: "let me know if there is a walk i need to do and give step by step" (the walk of 2026-10-13, §3).
- 2026-10-12 22:30 local: the walk — "correct", "correct", "YES" — and five findings (INC-581–INC-585); "WE NEED TO WORK SEPARATELY IN DIFFERNT STAGE ON EDITING PHOTO, FORMATTING, DETAIL AI SCREENING OF PHOTO" (D146); "A TASK FOR CURSATOR NEED TO DO A VERY DETAILED REVIEW, AND WE SHOULD HAVE 0 MISTAKES LIKE THIS" (D147).
- 2026-10-12 22:33 local: the C36 plan attached — "I AM NOT SURE IF WE HAD APPLIED THAT OR NOT, PLEASE REVIEW BEFORE GIVINNG ANOTHER BRIEF SO THIS GETS ADDRESSED AS WELL".
