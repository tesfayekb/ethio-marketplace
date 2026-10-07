# Roadmap

Bundle 7 brief: docs/governance/briefs/bundle-7.md (read first every turn).

## Truth pass (bundle 4 step 0, 2026-10-04) — lines unticked before bundle 4

Done = the file and the test that prove it. Not done = no proof found; nothing built unless bundle 4 names it.

- [ ] S1 — not done (no test names it)
- [ ] Bundle 1 (D+L+M app side …) — not done: S2 timing over target (edge p95 306 ms), stopped for ruling, no ruling since
- [ ] S2 / S3 — not done
- [ ] T (with T4 / DEC-095) — not done (DEC-095 token is bundle 4 step 29)
- [ ] A — not done (no proof found)
- [ ] B — not done (no proof found)
- [ ] C — not done (no proof found)
- [ ] Part O (INC-369, INC-370) — not done
- [x] Part P (P1–P5; P4 migration) — done: step-where.tsx; migration 7423f49a (directions, set_listing_pin); PW-98/99/110, PW-113 (P4), PW-117 (P5) in e2e/post-wizard-bundle2.spec.ts
- [ ] E census (incl. 7 "listing not found" lines, INC-364) — not done (CI census still shows 6 "listing not found" lines)
- [ ] Final full DEC-023 run — not done
- [x] Bundle 2 step 3 — done: door attr_contact_like in 7423f49a; PW-120 (e2e/post-wizard-specs.spec.ts)
- [x] Bundle 2 step 4 — done: door in 7423f49a; PW-121 (e2e/post-wizard-bundle2.spec.ts)
- [x] Part R — done: src/features/posting/contact-like.ts + contact-like.test.ts; door 7423f49a; PW-120, PW-121
- [x] Part S — done: 7423f49a:1607 schedules catalog-find-sweep '_/5 _ \* \* \*', in-file ASSERT :1745
- [x] Part P (bundle 2) — done: as Part P above; step 9a in step-where.tsx
- [x] Part Q — done: Q1 PW-111, Q2 PW-114, Q3 PW-112, Q4 PW-115/PW-116 (e2e/post-wizard-bundle2.spec.ts)
- [x] Step 15a (own_place) — done: 7423f49a:889–894; CT-34 (e2e/admin-categories-lifecycle.spec.ts)
- [x] Part U — done: src/server/category-images/suggest-icon-route.test.ts; attr_option_shape ceiling 150 at 7423f49a:1526
- [x] Step 10 app side — done: PW-113
- [x] Step 14 app side — done: PW-114
- [x] Step 16 app side — done: PW-115, PW-116
- [x] Step 11 app side — done: PW-117
- [x] Bundle 2 end-of-bundle run — done: CI-5 fixed in e2e/admin-categories-images.spec.ts, 10/10 at 2 workers; CI green
- [ ] D+L+M migration incl. S2 and Part O readers — not done: Part O readers not built
- [ ] S2 re-time, S3, DEC-096 detector, T(+T4), A, B, C, Part O, Part P, INC-371, INC-374, INC-375, INC-381, E census, full DEC-023 — not done (INC-374 = bundle 4 step 27, INC-381 = step 26)
- [ ] DEC-098 stage 2 — not done (awaits ADOPT)
- [x] Bundle 3 Part A red-first tests — done: PR-20, PR-21, PR-22 (e2e/posting-routes.spec.ts)
- [x] Bundle 3 step 12 home-country check — done: M1b 2a467fcc:50; PR-3
- [x] Bundle 3 Part A — done (M1, M1b, tests above)
- [x] Bundle 3 Part C / M2 — done: 18556a32; PW-130, PW-131, AU-12
- [x] Bundle 3 Part D — done: src/lib/place-order.test.ts, src/features/posting/step-where-order.test.tsx

## Bundle 4

- [x] Step 0 — brief saved (sha256 9ba52ecf… matches), truth pass above
- [x] Censuses (steps 1, 6, 9, 16, 20, 22, 23, 24) — docs/governance/briefs/bundle-4-census.md
- [x] M5 (step 25) 923dd4cb, mark 20261004090000; M5b 02084273, mark 20261004160000 — on ethio-prod and ethio-staging
- [x] Screens A + B — done (steps 1–11; PW-135, PW-136–139, price/deal-line and picker unit tests)
- [x] Parts C → D → E → F — PW-140, PW-141, PW-143, PR-25, PW-144
- [x] M6 (step 30) e44f20e5, mark 20261005100000 on ethio-prod
- [x] Part G step 26 screens (INC-381) — AT-65, AT-66, PW-152
- [x] Part G step 27 screens (INC-374) — PW-153
- [x] Part G step 28 ({country}) screens — PW-154/155/156, AT-67, TR-35
- [x] Part G step 29 ({category:slug}, help text only) screens — PW-157/158, AT-68; "And when" empty choice reads admin.attributes.link.andNone
- [x] Part H (docs, final report) — turn 10
- [x] INC-432 import routes rebuild name_folds — M7 9347e038, mark 20261005040000; CT-35, AT-69, LT-15
- [x] INC-431 Amharic map-pin words — src/i18n/locales/am-script.test.ts
- [x] INC-427 contact-step identity read wiped typed names (fixed bundle 4 turn 3; PW-134)
- [ ] Photo clean-up bundle: when the card receives the ad's photo through listing-picture, the photos-soon ribbon hides by the existing rule (bundle 4 turn 6 item 7; no change before then).

- [x] INC-430 — silent Next on a non-name identity refusal: post.who.saveFailed at Next; PW-149 (red first, then green)

## Bundle 4 — turn 11

- [x] LT-13 / INC-334 (closed)
- [x] INC-434 list facts tick tick lists
- [x] INC-435 corner ribbon
- [x] INC-436 "Use my location" state
- [x] INC-437 CT-19 stored-cell file rows
- [x] Records turn 2026-10-05 — see docs/governance/handoffs/2026-10-05-bundle4-close-handover.md

## Bundle 5 (2026-10-05)

- [x] Part A — categories importer: create-row guests (INC-314), undo restores links (INC-307); M8a with the INC-433 mark heal
- [x] Part B — attributes importer: rankClash (INC-327), optionInUse (INC-438); M8b
- [x] Part C — the Amharic unit cell (unit_am); M8c and the app side (PW-161, AT-72)
- [x] Part D — the nightly of 2026-10-05: PW-32 and the aborted-request lines (INC-439) — answered read-only, not reproduced, no change
- [x] Part F — the identity route's paid check behind a rate gate (INC-442)
- [x] Part E — the records this bundle writes
- [x] Records turn (bundle 5 close, 2026-10-05) — spec-ledger S54, INC-438–449, system-state, AGENTS.md DEC-094 line, action tracker; see docs/governance/handoffs/2026-10-05-bundle5-close-handover.md

## Bundle 6 (2026-10-06)

- [x] Part P — DEC-133 runner pin (turn 1)
- [x] Part A — security review fixes, M9 (turn 2)
- [x] Part B — scanners in our own CI (turn 3)
- [x] Part C — small follow-ups (turn 4)
- [x] Part D — records and final report (turn 4)
- [x] Part E — Semgrep corrections (turn 4)
- [x] Part F — promote needs every gating job (turn 4)
- [x] Part G — byte-batched service reads (turn 4)
- [x] Part H — attributes console reds (turn 4)
- [x] Part X — workflow file repaired and linted, INC-457 (turn 5)
- [x] Part W — Next judged at its step, summary names questions, first identity answer keeps details, INC-455/456 (turn 5)
- [x] Part Y — workflow lint flags, PW-22, keyed paging, scratch-definition reaper, further errors in the failure report (turn 6)
- [x] Turn 7 — the scratch-definition reaper also matches a family prefix (INC-463)
- [x] Turn 8 — the E2E setup refuses an app under test that does not point at staging (INC-464, DEC-146)
- [x] Turn 9 — a queued draft save is never sent below step 1 (INC-465)
- [x] Turn 10 — the workflow-lint download retries (INC-468, DEC-147)
- [x] Records turn (bundle 6 close, 2026-10-06) — spec-ledger S55 (DEC-136–147), INC-450–472, system-state, the order of work; see docs/governance/handoffs/2026-10-06-bundle6-close-handover.md

## The order of work from 2026-10-06

The operator's answers of 2026-10-06 and the cross-check that nothing identified earlier was dropped: docs/governance/handoffs/2026-10-06-order-of-work-and-cross-check.md (every item by its place, with its references). Nothing below is specced until its line says so; the supervisor explains each bundle or stage to the operator part by part before its brief is written.

### Bundle 7 — the posting-form round (in progress)

- [ ] DEC-144 — a changed answer resets only what depends on it; the parent question is asked first; an earlier answer narrows a later one (the whole-form restart is retired; tests PW-59, PW-60, PW-61, PW-32, PW-163, PW-22 step iv, PW-162 sequence e)
- [x] Previously used categories on the wizard's category step (operator, 2026-10-05)
- [x] One number formatter for specification values and settled ranges (INC-451)
- [x] admin_delete_category refuses a row with children; the pointer dialog's Home badge and "Make home" (C4) — M11; CT-38, CT-39, CT-40 (e2e/admin-categories-home.spec.ts)
- [x] The database security lints: public.security_lints() and the nightly step (DEC-132 layer B, B2 option ii) — M11; scripts/security-lints.ts + test; nightly step
- [ ] Every list read against the data API's 1,000-row cap paged or shown bounded (INC-459; the census is in docs/governance/handoffs/2026-10-06-bundle6-running-record.md)
- [ ] The seeders that leave scratch attribute definitions behind (INC-463, Y3d)
- [x] An answer later switched off prints its label, not its key (INC-466)
- [x] The catalogue's Merge, delete and unlink look at the answers ads hold (INC-467; the executor's census of bundle 6 turn 10 is in the same running record) — M11; AT-73, AT-74, AT-75
- [x] A built title leaves out a label that holds the {country} token
- [x] An autosave refused by the door is not dropped without a word (seen at INC-465)
- [ ] A test that Unit of Sale is asked before Quantity (promised 2026-10-01)
- [ ] Three checks in the code first, a fix line for any that fails: a saved extra place in another country after Back; the chosen currency visible while searching; the built title on "Other" categories (INC-343)
- [ ] A question or an answer removed from the catalogue never blocks a later save of the same visit (INC-479)

### After bundle 7, in this order

1. Stage 1 — the rules: the legal section (Terms, Privacy, the publishing statement as numbered versions; the 18+ tick; the seller's certification), the banned-items and safety pages, the screening-promise wording
2. The tidy-up round — the close-out work of ACT-009: the truth pass of the lines above, flaky tests (INC-440, INC-441, INC-449), the CI report's gaps (INC-419, INC-429), INC-398, the E2E account pool before 2026-11-01, docs/features/listings.md (INC-471), the four-lens review of the posting era
3. Stage 2 — automatic screening from the first ad, in two layers (DEC-145): the screening gateway, duplicates, the exceptions page, posting limits and AI switches, Admin › Services (DEC-091), admin numbers
4. Stage 3 — a buyer can open the ad: the ad page with Show contact, Report, Share and the safety box; photos on cards and paging; contact ticks; request a missing place and the admin inbox
5. Stage 4 — sellers manage ads: My ads with retention, views and contacts per ad, a real paused state (INC-469), the expiry sweep through the state machine (INC-470)
6. Posting-form extras — several prices in one ad (DEC-131), sizes and price drops (D68), photo tools (D65), the smaller form-engine items, an answer offered only in some countries (D75)
7. Stage 5 — buyers find things: lists from the buyer's city, search and filters, favourites and saved searches
8. Stage 6 — staying in touch: install and data saver, notifications, messages (every message screened), the site's own Telegram channels (ACT-007)
9. Stage 7 — account and data: the Your data page, the devices list, Settings, the Telegram sign-in door (DEC-012)
10. The launch round and the operator's launch checklist — backups and restore drill, observability, the 3G measurement, redirects from the old site, the private switch (DEC-116); then opening
11. Stage 8 — the seller page at ethio.com/name and the business badge
