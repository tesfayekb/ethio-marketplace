# HANDOVER — 2026-10-14 — bundle 15 closed (INC-625, one rule for what a caught error says in a server log line); next: the seller's My listings page, its spec first

Written by the supervisor thread that wrote the handovers of 2026-10-05 to 2026-10-14. It SUPPLEMENTS `docs/governance/handoffs/2026-10-14-bundle14-close-handover.md` and, through it, the earlier ones (who is who; what the operator has ruled; the curator): those still hold except where this one says otherwise. Spec-ledger block S67 is the summary; `docs/governance/handoffs/2026-10-14-bundle15-close-running-record.md` is the full record, entry by entry.

## 1. STATE AT HANDOVER

### 1.1 Repository

- dev = `87aec67c` (bundle 15 turn 1; run 38601422082 queued), main = `6e12f379` (bundle 14 turn 3; run 38593255281 green, promoted) when this record was built. Eleven `lovable-*` side branches on the remote, the known set (a twelfth is a stranded turn, G30).
- Bundle 15's brief is saved at docs/governance/briefs/bundle-15-turn-1.md. Roadmap line 3 names no brief after this records turn: the next brief names itself there.
- Published site: the bundle-13 close (`d5217066`); bundles 14 and 15 go out at the next Publish.
- Highest test ids: A-8, A11Y-2, AID-6, AIF-3, AIM-5, AIP-2, AIS-5, AL-29, AMSG-3, AS-3, AT-81, AU-13, B-5, BC-4, BGR-10, C-9, CFM-3, CI-5, CMR-3, CO-9, CT-45, CV-8, DF-5, DQ-3, DR-4, DSP-3, EL-4, ERRT-7, FB-6, FD-3, FE-14, FP-11, FR-8, FS-14, G-2, GAL-6, GE-5, GW-2, HOOK-1, HS-25, IB-3, IG-6, IMP-5, KP-3, LC-3, LE-6, LH-4, LK-5, LP-7, LR-4, LS-13, LT-16, LY-6, MD-4, MF-7, MR-4, OV-1, PBG-7, PC-6, PCH-6, PE-2, PED-9, PF-3, PH-3, PL-2, PP-31, PPOL-16, PPR-1, PR-44, PSH-2, PU-6, PW-188, PWN-1, QA-1, QN-4, R-9, RAW-3, RP-16, S-4, SC-22, SETM-4, SF-3, SG-4, SO-4, SP-7, SU-1, SV-5, TBL-4, TR-40, UD-2, UE-3, UNT-5, UP-6, US-2, VP-11.

### 1.2 Databases

- No migration in this block. The newest mark by value stays `20261015040000` (bundle 14 turn 3), on ethio-prod and on ethio-staging.

### 1.3 Catalogue and curator

- Unchanged since block S65: C37 batch 2 imported and walked; the batch-2 result and rulings message is with the operator for the curator; batches 3–16 follow.

### 1.4 Security

- Unchanged in this block: no door, policy or grant changed. The security review of 2026-10-13 and the account-security review (ACT-020) continue in the Project record; their open items wait for the operator's ruling.

### 1.5 CI and platform

- CI: run 38593255281 on `6e12f379` (bundle 14 turn 3) GREEN, 0 retried, promoted — main = `6e12f379`; the records turn of bundle 14 (`b104068f`, run 38596839870) running and bundle 15 turn 1 (`87aec67c`, run 38601422082) queued when this record was built.
- DEC-181 (CI runs queue) stands: the next prompt goes out as soon as the executor reports; Publish waits for a green head with the executor idle.
- The executor runs no typecheck and no build, and its sandbox cannot start a browser (INC-506): every browser test is proven in CI.

### 1.6 Records

- This records turn lands block S67 (D174, S209–S210), INC-625's later word, system-state, the roadmap, this handover, the running record and the manifest. The action tracker is unchanged (ACT-009 stays open with its carried items).
- Numbering: next free DEC-182; D175; INC-626; S211; ACT-021.

## 2. THE BLOCK IN A TABLE

| Brief | Turn | What | Commit | CI |
|---|---|---|---|---|
| 1 | 1 | INC-625: one rule for what a caught error says in a server log line (`src/lib/error-text.ts`; ERRT-1–ERRT-7); block S66's next free slip number amended | `87aec67c` | queued when this record was built (run 38601422082) |

No string was added, removed or changed in this block.

## 3. IN FLIGHT AT HANDOVER

- CI: run 38596839870 on `b104068f` (bundle 14's records turn) and run 38601422082 on `87aec67c` (bundle 15 turn 1), queued in that order. This records turn's own run follows.
- The operator: Publish once the newest commit's run is green and Lovable is idle; then "Sync keys" in Admin › Translations and the short walk of bundle 14; the batch-2 rulings message to the curator; a glance at ethio-staging's monthly active users (the E2E account pool) before 2026-11-01; owed rulings: the My listings spec's approval when it comes, and the security review's open items.
- The supervisor: the My listings page's spec (D138, D172's seller side, D173, D174), written for the operator's approval before any brief (G49); the judges open in block S67; every CI read runs the read script.
- The curator: the batch-2 result and rulings message, then batch 3.

## 4. THE PLAN AHEAD, IN ORDER

1. Publish once the newest commit's run is green and Lovable is idle; "Sync keys" in Admin › Translations (bundle 14's strings); then one short walk of bundle 14 (the ad's page; Edit's boxes at 360 and 1280; the category shown and not changeable; "Inappropriate photo").
2. The seller's My listings page (D138; today a placeholder) — its spec first, for the operator's approval: the seller's ads and their full detail with status history and every admin change; Edit in the same boxes as staff (photos, title and description, specifications, price; never the category — D172); the states of D173 (Sold, Reserved, No longer available, each a ribbon; Rented and Filled by type; "Price reduced" automatic under its honesty rules; a Sold page kept 30 days); D174 (a price or state change at once, other edits re-screened; close and reopen with the remaining days; renew after expiry under two admin settings, with no limit); delete (INC-469's "paused" label removed, INC-470's expiry sweep through the state machine). ESTIMATE 3–5 turns after the spec.
3. D170: a faint ethio.com mark and a soft left-to-right shadow on photos whose background was removed. ESTIMATE 1 turn.
4. D149's publishing statement (D150, D152 agreed). ESTIMATE 1–2 turns.
5. The tidy-up round's carried items (roadmap): INC-497, INC-398, the flaky tests, a full read of the Amharic catalogue (INC-489), the posting era's four-lens review, the E2E account pool's confirmation before 2026-11-01. ESTIMATE 2–3 turns, folded into others where possible.
6. The shell brief (D110–D117, D98, D93/D114, D107, D135's look), then stage 1 (the rules), then the order of 2026-10-08. ESTIMATE 4–6 turns for the shell after its spec.
Total before stage 1: ESTIMATE 11–17 executor turns. Dated duties: the weekly security review (Mondays); the feed bench every Sunday 16:10 UTC; the nightly every day 18:00 UTC.

## 5. RULES ADOPTED IN THIS BLOCK, NOT YET IN THE INSTRUCTIONS (in force from the day adopted; carried to the next version — G46)

- Server code takes a caught error's text only through `errorText` or `errorWithStack` (src/lib/error-text.ts); ERRT-6 and ERRT-7 are its census (INC-625).
- A replacement of a delivered prompt is announced in the same message as what it replaces, never after it (S209).
- The supervisor's ritual clone is refreshed by fetch, never deleted, while a stand-in worktree hangs off it (S210).
- Block S66's rules (handover of bundle 14, section 5) stand.

## 6. THE PEER READ FOR EDITS AND RENEWALS (2026-10-14; decided as D174)

What the main marketplaces say, read by the supervisor on 2026-10-14 (what a source does not say is marked so):

- Jiji: "Even if your ad is live, you can still edit it if needed"; "if you make changes to your ad, it'll go for review again"; "It won't be shown in search results while we're checking it" (jiji.ng/faq/what-happens-after-posting). Renew "once every 7 days", a closed ad too; a renewed ad "gets a fresh timestamp and appears at the top of search results" (jiji.ng/faq/renew-ad).
- Facebook Marketplace: an edit "sends the listing back through the same automated check" — from a third-party guide (lilachbullock.com); Meta's own page was not read.
- Kijiji: "Almost any part of your ad can be edited"; the category "can't be altered after an ad is created"; ads stay 60 days, and a repost extends 60 days and moves the ad to the top; whether an edit is reviewed again is not stated (help.kijiji.ca).
- OLX (its API documentation): nothing on review after an edit.
- The app as built: `edit_listing` takes an active, reduced, rejected, held or expired listing and sends every edit to screening; expiry is per category (`expiry_days`); `active → active` renews and resets the expiry; `sold` is a status, Reserved and No longer available are not yet.

## 7. WHAT THE OPERATOR SAID IN THIS BLOCK (his words; block S67 and the running record have each at its time)

- 2026-10-14 12:18 local: "Applied bundle 14 turn 2 carrier #924 - IS GREEN, TURN 3 CI STILL RUNNING, THIS LAST ONE IS DONE" (with the records turn's report), and "PLEASE REVIEW GET READY WITH THE NEXT STEP AND GIVE ME PROMPT".
- 2026-10-14 12:50 local: "PREVIOUS CI GREEN ON 'Applied admin_edit fix #925", currently CI for "Added Bundle 14 close files" is running".
- 2026-10-14 ~12:5x local (D174, his answers): "Price and states at once"; "No pause; close and reopen"; and: "continue the remaining days of the advertizment, say initially advertized for 20 days then stopped and 10 more days left, the counter starts for the 10 days. Now after expriy, the seller can renew for another duration, we need to set that up from admin if we allow the renew posting or now and how many days. Initially we put unlimited because we initially need more advertizment and will allow to post unlimited days but at some point will update that from admin side."
