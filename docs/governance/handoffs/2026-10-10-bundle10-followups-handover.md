# HANDOVER — 2026-10-10 — bundle 10's follow-ups done (the invite card, three a row, the picture frame and angle, "in" and "near", the profile through its doors, the place on the account); bundle 11 next

Written by the supervisor thread that wrote the handovers of 2026-10-05 to 2026-10-09, at the close of bundle 10's follow-ups. It SUPPLEMENTS `docs/governance/handoffs/2026-10-09-bundle10-close-handover.md` and, through it, the earlier ones (who is who; what the operator has ruled; the curator): those still hold except where this one says otherwise. Spec-ledger block S61 is the summary; `docs/governance/handoffs/2026-10-10-bundle10-followups-running-record.md` is the full record, entry by entry.

## 1. STATE AT HANDOVER

### 1.1 Repository

- dev = main = `5b963ca7` (turn 10's commit, 2026-10-10 07:36Z; CI run 38035039212 SUCCESS at 08:09:28Z, promoted) when this record was built. Eleven `lovable-*` side branches on the remote, the known set (a twelfth is a stranded turn, G30).
- The ten follow-up briefs are saved in docs/governance/briefs/ (bundle-10-d119.md and bundle-10-d119-turn-2.md … turn-10.md; sizes and sha256 in block S61). All DONE. Roadmap line 3 names no brief: bundle 11's is named there when it is saved.
- Published site: the operator Published after turns 2, 3, 5 and 6 and walked each time (the record shows no later Publish); turns 7–10 reach the site with his next Publish. His check after it: sign in on two browsers with a TEST account (never his own) and see that a place picked on one shows on the other.
- Highest test ids: PW-182, FE-14, FR-8, FS-13, FP-10, FB-6, SC-6, SG-4, TR-35, PR-43, VP-11, PC-6, PF-3, AT-77 (with AT-73b and AT-76b), CT-42, IB-3, LT-15, IG-5, CO-8, LS-13, AU-12, HS-6. RP-1..RP-3 in src/lib/return-path.test.ts repeat admin-roles' ids (INC-536, open).

### 1.2 Databases

- Two migrations in the period, each on ethio-prod (the executor's tool) and on ethio-staging (the operator's SQL editor), each read back by its own mark: INC-535 `20261010055801_866d39cd` (mark `20261010180000`) and D106 part 1 `20261010065637_01da330c` (mark `20261010190000`). The newest mark by value is `20261010190000`.
- New on both: no client role writes `profiles` (table or column); `security_lints()`'s client-writable count sees column grants; `profiles.viewing_location_id` and `viewing_location_at`; the dial `viewing_place` (60 an hour per account); the doors `user_set_viewing_location(uuid)` and `my_viewing_location()` (both on the public-surface allowlist).
- Leaked-password protection: ON on ethio-prod, OFF on ethio-staging (DEC-155).
- The text store: five keys added in the code (§2.3), none removed or changed.

### 1.3 Catalogue and curator

- Unchanged in the period. Category pictures: the card is now cut 640×480 and the thumb 160×120 (D122), but the stored pictures keep their old cut until regenerated — the operator regenerates ONE first and judges it; D124's style research comes before the rest. The curator: no message in flight.

### 1.4 Security (DEC-132)

- Layer A: secret scanning on; push protection ON (confirmed by the operator 2026-10-10).
- Layer B: INC-535 closed the last client write grant (profiles, in column form); the lints baseline is unchanged (`table_writable_by_client` 0; `function_executable_by_anon` 13). The platform's own linter lists the definer functions signed-in users may run (173 at turn 8, two more at turn 9 — the account doors, by design).
- Layer C: the first weekly review is 2026-10-12; it reads the platform linter's list and asks the operator for the open code-scanning count.

### 1.5 CI and platform

- CI run 38035039212 on `5b963ca7` SUCCESS at 08:09:28Z, promoted (main = dev); one retried pass (TR-29, INC-345); the server-error census carries only "listing not found" off the allowlist (INC-398); accessibility serious 0, critical 0. The records commit follows; its CI judges it.
- Two runs this period waited at the preflight for the operator's staging apply and went green on "Re-run failed jobs" (turns 8 and 9) — the normal path for a migration turn.
- The platform commits mid-turn (turns 3, 8, 9, 10); census lines that expect an untracked brief accept an empty status.
- The executor's sandbox still cannot start a browser (INC-506): every test is dictated to the locator and proven in CI.

### 1.6 Records

- This records turn lands block S61 (DEC-169, D119–D127, D106 built; S149–S152), INC-530–536, system-state, the action tracker (ACT-017 D106 done; ACT-018 bundle 11 with INC-536 first; ACT-019 the performance review), the roadmap, this handover, the running record and the manifest.
- Numbering: next free INC-537; DEC-170; D128; S153.

## 2. THE FOLLOW-UPS IN TABLES (compiled by the supervisor from the repository and the running record)

### 2.1 The turns

| Turn | What | Commit | CI |
|---|---|---|---|
| 1 | D119: the invite card; /post from it with the place and category; INC-530 | `1f6b4180` | red: PW-180 (INC-531, the test) |
| 2 | INC-531; a subcategory page fills the subcategory; DEC-169 gold | `aea5b434` | green |
| 3 | the card on every category, and alone first when nothing exists | `c4efd3d8` | red: PW-64 (INC-533, parked) |
| 4 | INC-532: sign-out keeps the place | `25221580` | cancelled by turn 5's push |
| 5 | D123 three a row; D122 the 4:3 cut and one −30° angle | `d099ccc1` | green (judged 4 and 5) |
| 6 | the card the size of a card; "Be the first" only where nobody has advertised | `7f87fd30` | green |
| 7 | D125 "in" and "near"; no "too" (INC-534) | `255d5401` | green |
| 8 | INC-535: profiles through its doors only; the lint counts column grants | `270ee85f` | green (attempt 2, after the staging apply) |
| 9 | D106 part 1: the columns, the dial and the two doors | `8804f210` | green (attempt 2, after the staging apply) |
| 10 | D106 part 2: the shell keeps the place on the account | `5b963ca7` | green |

### 2.2 The place on the account (for the next screens)

- The cookie `ethio_area` is `<CC>:<uuid>:<ms>` (the pick's time); the old `<CC>:<uuid>` still reads, with no time. `parseAreaCookie`, `readAreaCookie`, `writeAreaCookie(country, id, at = now)` in src/components/shell/location-data.ts.
- The rule: `chooseCarry` (src/components/shell/place-carry.ts) — the newest pick wins; a pick without a time loses to any account pick; an account place no longer shown counts as none; the guess is never saved. The door calls: src/components/shell/place-carry-service.ts.
- The shell: every pick saves the cookie and, signed in, the account (in pick order); the sign-in carry runs once per identity; `accountPlace` in the shell context and `data-account-place` on the location row ("off" | "pending" | "done").
- D107's amber notice (the IP's place differs from the saved one) reads the same state; it is built with the shell brief.

### 2.3 The strings (read at `5b963ca7` against `7fc3a7a5` by script: five added in both languages, none removed or changed)

- `feed.invite.place` and `feed.invite.placeCategory` — "Be the first to advertise in {place}." / "Be the first to advertise {category} in {place}."; the Amharic is the operator's own.
- `feed.invite.placeMore` and `feed.invite.placeCategoryMore` — "Advertise in {place}." / "Advertise {category} in {place}."; the Amharic drafted by the supervisor, approved by the operator.
- `feed.headingIn` — "Listings in {location}"; the Amharic drafted by the supervisor and listed for the operator's check (G43).

## 3. IN FLIGHT AT HANDOVER

- With the executor after this records turn: D127 — one small turn (below, §4 item 1); this records turn's CI run judges the records.
- The operator: Publish (turns 7–10) and the two-browser check with a test account; the D122 one-picture trial.
- The supervisor: D124's research (picture style), when the operator wants it; D126's research (performance) at any time beside executor turns.
- The curator: no message in flight.

## 4. THE PLAN AHEAD, IN ORDER

1. D127 — every listings heading says "in": the chosen place's own listings "Listings in {place}", each wider place of the ladder its own "Listings in {that place}" (the region or state, then the country), "All listings" beyond, and "All listings" with no place chosen; no new string (`feed.headingIn`, `nav.allListings`). One turn, Tier B, written while bundle 11's brief is.
2. Bundle 11 — every admin table in the agreed house style, Admin › Screening first with D120's preview (the contact methods; the number behind "Show number" through a reviewer-only door with its own log; the seller's public name only), and Part E's checks (D118; ACT-018). Its first turn also takes INC-536 (repeated test ids renamed; a unit test that refuses a repeat). ESTIMATE 8–14 executor turns.
3. The shell brief — D110–D117, D98's subcategory menus, the scroll area (D93 as changed by D114), and D107 (the amber notice). ESTIMATE 5–9 turns.
4. Stage 1 — the rules (the legal section, the 18+ tick, the seller's certification, the banned-items and safety pages, the screening-promise wording).
5. Then the order of 2026-10-08 (roadmap "After bundle 7, in this order"), with D126 (the performance review) after stage 1 unless the operator moves it.
- The next posting-area turn — INC-526, INC-449's class and INC-533 together — takes its place when the posting area is next touched.
Dated duties: the weekly security review 2026-10-12; the feed bench every Sunday 05:10 UTC; the nightly every day 06:00 UTC.

## 5. RULES ADOPTED IN THIS PERIOD, NOT YET IN THE INSTRUCTIONS (in force from the day adopted; carried to the next version — G46)

- A checked return path is navigated by `href`, never by `to` (INC-530).
- A test that makes more than one listing for a seller finds each one by what distinguishes it, never by its position (INC-531).
- A sign-out clears what is the account's, never what is the browser's (INC-532).
- A heading says where the listings are — "in" the place that holds them — and never "near" a place they are not near (INC-534, then D127: a posting in DC is not near LA).
- A count of client-writable tables counts column grants too; a claim about what a client can write is made after the write is tried (INC-535, S150).
- A test id is assigned once across src/, e2e/ and scripts/ (INC-536; the check comes with bundle 11).
- A census line that expects an untracked brief also accepts an empty status (the platform's mid-turn commits).

## 6. WHAT THE OPERATOR SAID IN THIS PERIOD (his words; block S61 and the running record have each at its time)

- 2026-10-09 19:13Z: when the chosen place has few ads, they come first in their own row and a card invites "Be the first to advertise in {place}" — D119; 19:15Z its four answers; 19:23Z the two Tier A answers for bundle 11's preview — D120.
- 22:28Z: "if we are in subcategory menu andd listing then subcategory should also fill"; the place fills to the seller's level; "may be a star … nees to stand out, may be yellow color" — D119's revisions, DEC-169.
- 2026-10-10 01:32Z–03:14Z: the walks — the card on every category; "when i log out i landed home but location is canada" (INC-532); "our images … dont fill the width" and one angle (D122); "may be three?" (D123); "we generate a car with one tyre having gold … we will have to look best practices" (D124); "be the first … doesnt make sense, because someone already advertized"; "some are services so 'selling' may not fit".
- 04:01Z: "I dont know what 'too' is for, will need to remove that"; "for listing outside afar, but inside ethiopia, should have said listing near Afar" (D125, INC-534); "make sure that is saved as user may log in other devices as well" (D106 brought forward).
- 04:31Z–04:33Z: D106's amendments — "IF NONE SAVED ON DEVICE OR ACCOUNT, THEN ip ADDRESS LOCATION"; "may be more restrictive? like 80/hr, or 60/hr"; "Newest pick wins (Recommended)".
- 05:10Z: "are we going to have issues with the sppeed of loading? … may be a task for future" — D126.
- 07:04Z: "please tell me what are the tasks left and how many turns before we start stage 1"; 07:30Z: push protection "confirmed was done".
- 07:59Z: "near inside same country may not be near. say a posting in dc can not be near LA despite being posted inside USA. so best to say listing in {country} rather than  near, same for state level etc."; "or listing in {state} or region" — D127.
