# HANDOVER — 2026-10-09 — bundle 10 built (the feed engine, Admin › Screening, the speed judge, the staging gate); bundle 11 next (every admin table in the house style); what is in flight

Written by the supervisor thread that wrote the handovers of 2026-10-05 to 2026-10-09, at the close of bundle 10. It SUPPLEMENTS `docs/governance/handoffs/2026-10-08-bundle9-part1-close-handover.md` and, through it, the earlier ones (who is who; what the operator has ruled; the curator): those still hold except where this file or spec-ledger block S60 says otherwise. The running record of the period is imported word for word beside it as `docs/governance/handoffs/2026-10-09-bundle10-running-record.md`. A new thread reads, in this order: this file, `docs/governance/system-state.md`, the tail of `docs/spec/spec-ledger.md` (block S60), the root `roadmap.md`, the brief its line 3 names, the ci-evidence branch, the tail of `docs/tracking/incidental-findings.md` (G53).

## 1. STATE AT HANDOVER

### 1.1 Repository

- dev = main = `2ab35a33` (turn 14's commit, 2026-10-09 14:00Z; CI run 37940943512 SUCCESS at 14:29:55Z, promoted) when this record was built. Eleven `lovable-*` side branches on the remote, the known set (a twelfth is a stranded turn, G30).
- Bundle 10's brief (`docs/governance/briefs/bundle-10.md`; the saved copy is version 9, 24,959 bytes, sha256 `f2fffcc6d66dff2865c829ec529009f8e311b2c1988cabbfc68505ee0e442cc0`) is DONE; turn 14's ruling and its one patch are saved beside it (`docs/governance/briefs/bundle-10-ruling-turn-14.md`). No brief is in force until bundle 11's step 0.
- Published site: `2ab35a33`, by the operator before his walk of 18:25Z (its first line sees turn 14's Screening preview picture).
- The walk: six lines on the published site at phone width (operator, 18:25Z / 14:25 local): five yes — the Screening preview's category picture; two or three of his test ads approved; their cards with the category pictures; a top category's page with its breadcrumb; /c/nothing-here → Page not found. The sixth: with Ethiopia chosen he saw a Saudi Arabia ad. Read: his ruling of 2026-09-15 (the feed widens city → state → country → globe, never asking) and the approved spec's ladder (§3.4) — with fewer than 8 ads in Ethiopia the page continues under "All listings" with the rest of the world. His answer by the question card: "Keep worldwide (your rule)". INC-525 CLOSED by the walk.
- Highest test ids: PW-179, FE-14, FR-8, FS-7, FP-7, FB-6, SC-6, SG-4, TR-35, PR-42, AT-77 (with AT-73b and AT-76b), CT-42, IB-3, LT-15, IG-5, CO-8, LS-13, AU-12, HS-6.

### 1.2 Databases

- Five migrations in the period, each on ethio-prod (the executor's tool) and on ethio-staging (the operator's SQL editor), each read back by its own mark: E1 `20261009032615` (mark `20261009160000`), E2a `20261009052418` (`20261009180000`), E2b `20261009060703` (`20261009190000`), E3a `20261009070008` (`20261009200000`), E3c `20261009092434` (`20261009220000`). The newest mark by value is `20261009220000`; the next migration takes a mark above it and above the current time (G39).
- New on both: `feed_index` and its functions; statement triggers on listings and listing_locations; the reindex queue, its wake and drain (`feed-reindex-drain`, every minute only while the queue holds listings); the daily check (`feed-index-check`, 03:53 UTC) and the heartbeat tables; `feed_page` (the one new public surface: anon EXECUTE, in scripts/public-surface-allowlist.txt and scripts/security-lints-baseline.json, 13); `transition_listing` restated for the reviewer's door (E3a); `feed_bench` (service role only).
- ethio-prod: 169 categories (168 with a picture, all 15 top-level ones), no active listing at the census of turn 13; at the walk (18:25Z) the operator approved two or three of his own test ads, so ethio-prod now holds active listings — they stay public until a take-down path exists (stage 4's My ads; an enforcer's removal).
- ethio-staging: the bench's scratch rows removed (INC-520's clean "found 100785; left 0"; the second run's leftovers 0).
- Leaked-password protection: ON on ethio-prod, OFF on ethio-staging (DEC-155).
- The text store: fifteen keys added in the code (§2.4), none removed or changed.

### 1.3 Catalogue and curator

- Unchanged: 169 categories · 570 definitions; nothing imported in the period. The curator's last message (C36 — phone locks and SIMs, research and plan only) is still the operator's to paste; no answer has been brought.

### 1.4 Security (DEC-132)

- Layer A: secret scanning on. Push protection: the operator's read of the Security tab at this close found no secret-scanning alert since 2026-10-05 — the alert he read out, #418, is a CodeQL code-scanning alert (INC-529); under DEC-132 layer A push protection is therefore ruled ON, and the switch is his (Settings → Code security → Secret scanning → Push protection → Enable), asked at this close.
- Layer B: the lints baseline moved 12 → 13 for feed_page (INC-521); the nightly's lints step reads it. Two code-scanning warnings of the period (#416, #417) were fixed in code (INC-516, INC-517); the operator's open code-scanning count at this close: one open at this close — #418, js/insecure-randomness, High, scripts/feed-bench.ts (the bench's scratch password; INC-529, fixed by this records turn and closed by the next scan); #416 and #417 closed.. From S141: every bundle close and the weekly security review ask him for that count.
- Layer C: the first weekly review is 2026-10-12 (it also takes the executor's "171 older findings" in the database's warning list, offered in turn 1 and not taken then).

### 1.5 CI and platform

- CI run 37940943512 on `2ab35a33` SUCCESS at 14:29:55Z, promoted (main = dev). The records commit follows; its CI also judges INC-529's one-file fix.
- The staging gate (DEC-168): CI never waits; the feed bench waits for a quiet ethio-staging (40 minutes, else SKIPPED) and yields when CI, the nightly or Guard Proof starts (YIELDED); the nightly waits up to 60 minutes and notes every overlapping run on its run page.
- The feed bench: weekly, Sunday 05:10 UTC (01:10 New York), and on demand; its status in docs/tracking/feed-bench-status.md on ci-evidence. A red bench (MISS, FAILED, SKIPPED or YIELDED) is read the same morning.
- The platform: it refuses `git apply` (turn 14) — code goes as exact text for the executor's own file edits, checked by sha256 (S147); its database tool holds back schedules more often than hourly without the `-- lovable-cron-fallback-reviewed:` first line; the executor's rules want a queue that wakes on enqueue and a table written CREATE → COMMENT → REVOKE/GRANT → ENABLE RLS → policy; a brief never tells it to overwrite AGENTS.md.
- The executor's sandbox cannot start a browser (INC-506): every test is dictated to the locator and proven in CI.
- The browser's Supabase client retries a GET after a network error (three retries, 1, 2 and 4 seconds apart — INC-527).

### 1.6 Records

- This records turn lands block S60 (DEC-163–168, D108–D118, S135–S148), INC-511–529 (with INC-529's one-file fix to scripts/feed-bench.ts, carried as an exact section), system-state, the action tracker (ACT-016 done; ACT-018 bundle 11; ACT-015 and ACT-017 statuses), the roadmap, this handover and the running record.
- Numbering: next free INC-530; DEC-169; D119; S149.

## 2. BUNDLE 10 IN TABLES (compiled by the supervisor from the repository and the running record)

### 2.1 The turns

| Turn | Part | Commit | What | CI |
|---|---|---|---|---|
| 1 | E1 | `74f17e56` | the index, its refresh, the backfill and the check; FE-1–FE-5 | green (attempt 2, after the staging apply) |
| 2–4 | E2a | `41b46aa6` | stops: the platform's cron marker (turn 2), the executor's database rules (turn 3); then the triggers, the queue and its drain, the daily check; FE-6–FE-14; INC-511 | green (attempt 2) |
| 5 | E2b | `d91aac66` | `feed_page`, `/api/feed`; FR-1–FR-8 | green |
| 6–7 | E3a | `326258b1` | stop at the census (no role held review; S137); then Admin › Screening; SC-1–SC-5 | red: format (INC-513), the twin locators (INC-514), A-2 (INC-515) |
| 8 | fixes | `b987d837` | INC-513–515; DEC-163 | green |
| 9 | E3b | `0a0a7687` | the listings pages; FS-1–FS-6, FP-1–FP-6; DEC-165; INC-516, INC-517 | green |
| 10 | E3c | `5ae13599` | the speed judge; FB-1–FB-4; INC-518, INC-519 | green (attempt 2, after the staging apply) |
| 11 | fix | `4ffb8e3a` | INC-520 (chunkByLength, `--clean`, staging cleaned) | green |
| 12 | fixes | `fcceb53c` | INC-524 (batches of 250, retry); DEC-167 weekly; INC-521 baseline 13 | green |
| 13 | fixes | `be21faa4` | the category-picture census on ethio-prod; FS-7; INC-522 (A1, A2; PW-178, PW-179); INC-523 (TR-28) | red: PW-179 (INC-527) |
| 14 | fixes | `2ab35a33` | INC-527 (PW-179); INC-525 (the Screening preview's picture, SC-6); DEC-168 (the staging gate, SG-1–SG-4, FB-6); INC-528 (the rail tests) | green (run 37940943512) |

### 2.2 The feed contract (for the next screens)

- `GET /api/feed?category=<uuid>&place=<uuid>&after=<cursor>` → `{ cards, next, ladder, steps }`; `Cache-Control: public, max-age=60, stale-while-revalidate=300`. A card carries the listing's id, title, price fields, tier, place names, category id, publish time and its ladder step. The cursor is base64url and opaque.
- The order: the chosen place's premium → featured → regular, newest first in each; then each wider step the same way; a step is read only until 8 listings of the category are found (else everywhere). The page heading names the place; a step's cards sit under "Listings near <place>" or "All listings".
- The client: `useFeed` (src/features/feed/use-feed.ts), `parseFeedPage` and `feedSections` (src/features/feed/feed-page.ts); the card draws the nearest category picture (no listing photo on cards until stage 3).

### 2.3 The files (the groups; `git diff --stat 97676945..2ab35a33` has every line)

- supabase/migrations/ — the five migrations above.
- src/routes/api/feed.ts; src/features/feed/ (feed-page.ts and its tests, use-feed.ts); src/components/marketplace/feed.tsx and listing-card.tsx; src/components/shell/ (breadcrumbs by path, the category lookup in app-shell).
- src/routes/admin.screening.tsx; src/features/admin-screening/ (screening-page.tsx, use-screening.ts); src/features/admin/sections.ts and rail-items.ts.
- scripts/feed-bench.ts and its tests; scripts/staging-gate.ts and its tests; .github/workflows/feed-bench.yml (new); .github/workflows/nightly-e2e.yml (the gate's two steps).
- e2e/feed-index.spec.ts, feed-route.spec.ts, feed-screens.spec.ts, admin-screening.spec.ts (new); post-wizard-bundle2.spec.ts (PW-178, PW-179), shell.spec.ts (TR-28, the rail tests), posting-routes.spec.ts (PR-23).
- docs/features/feed-engine.md, admin-screening.md (new), nightly-e2e.md; the locale files (§2.4); scripts/public-surface-allowlist.txt; scripts/security-lints-baseline.json.

### 2.4 The strings (read at `2ab35a33` against `97676945` by script: fifteen added, none removed or changed; the six new Amharic phrases are the operator's words, the nine others copied from keys the app already had)

- `admin.section.screening.title` "Screening queue"; `admin.section.screening.body` "Ads waiting for review. Approve puts an ad on the site; Reject keeps it off."
- `admin.screening.open` "Preview as buyer"; `.approve` "Approve"; `.reject` "Reject"; `.approved` "Approved"; `.rejected` "Rejected"; `.confirmApprove` "Approve this ad? It goes on the site now."; `.confirmReject` "Reject this ad? It stays off the site."; `.empty` "Nothing is waiting for review."; `.search` "Search"; `.col.title` "Title"; `.col.category` "Category"; `.col.place` "Place"; `.col.sent` "Sent".

## 3. IN FLIGHT AT HANDOVER

- Nothing with the executor after this records turn; its CI run judges it (with INC-529's fix).
- Two Tier A questions for bundle 11's Screening preview — may a reviewer see the seller's contact preferences; may a reviewer see the seller's name and business name — to be put to the operator with recommendations before its brief.
- Push protection (DEC-132 layer A): ruled ON; the switch is the operator's.
- The nightly of 2026-10-10 06:00 UTC is the first behind the staging gate and proves INC-521 (its lints step).
- The curator: no message in flight.

## 4. THE PLAN AHEAD, IN ORDER

1. Bundle 11 — every admin table in the agreed house style, Admin › Screening first, and Part E's checks (D118; ACT-018). Before its brief, two Tier A questions to the operator, each with a recommendation: may a reviewer see the seller's contact preferences in "Preview as buyer"; may a reviewer see the seller's name and business name (today only through profiles:view). The preview's readable fields (definitions, attribute options) and the ad's own country (from its place) go in either way.
2. The shell brief — D110–D117, D98's subcategory menus (the rail lists top categories only), the scroll area (D93 as changed by D114).
3. D106 and D107 (ACT-017).
4. The next posting-area turn — INC-526 (the step's door calls in order), INC-449's class (Next from step 7).
5. The order of 2026-10-08 (roadmap "After bundle 7, in this order"): stage 1 — the rules; the tidy-up round; stage 2 — automatic screening; stage 3 — the buyer's ad page (researched with peers and agreed with the operator first, G49) with photos on cards; and on.
Dated duties: the weekly security review 2026-10-12 (with the open code-scanning count); the feed bench every Sunday 05:10 UTC; the nightly every day 06:00 UTC (its lints step proves INC-521; its overlap notices settle INC-487's question).

## 5. RULES ADOPTED IN THIS PERIOD, NOT YET IN THE INSTRUCTIONS (in force from the day adopted; carried to the next version — G46)

- A heartbeat row is proven by its id (INC-511).
- A new anon or authenticated EXECUTE grant moves both public-surface records in the same landing (INC-521).
- Every `.in` list the service client builds goes through chunkByLength, scripts included (INC-520).
- A test never takes the first row of a roster other tests' scratch rows can crowd (INC-523, INC-528).
- A test that injects a network failure reads the client's retry rules and refuses every attempt it means to fail (INC-527).
- A list page is briefed on the house-style blocks, named (S144); a shared view's fields each have a named source, and every constant passed to one is checked against the other callers' readers (S145).
- Code reaches the executor as exact text for its own file edits, checked by sha256; no patch tool (S147).
- While the executor has no browser, a spec on a DataTable page is dictated to the twin locators (S140).
- A password, token or key comes from `randomBytes`, never `Math.random`, scratch ones included (INC-529).
- Every bundle close and the weekly security review ask the operator for the open code-scanning count (S141).
- The staging gate (DEC-168): no bench or nightly runs into a CI run on ethio-staging.

## 6. WHAT THE OPERATOR SAID IN THIS PERIOD (his words; block S60 and the running record have each at its time)

- 03:24Z (23:24 local): "ordering of listings, first will be premium listing(inside which if there are multiple, newest first), then featured, then regular(in all newest first, and old last). note that premium comes first irrestpective of time compared to featured or regular plan. so listing orderding for any category, any subcategory any location should come that way" — D108; "City first" and "No cap" by the question card.
- ~06:14Z: Admin › Screening before stage 2 — D109 (the question card).
- 09:14Z–09:26Z: the five shell notes, "lets use three line", "remove 'how it works' from bottom footer", "ok, agree, lets proceed" — D110–D117.
- 11:08Z (07:08 local): "Its not the same table we planed and designed earlier to have uniformity that we discussed about using filament style tables … disappointmeed. the adds showing as preview as users see it is also disappointing. default category images never show with any of the adverts at all. not sure where to start." — D118; INC-525; the plan of §4.
- 11:49Z–11:52Z: "But it has not been tested that it will run correctly at all"; "so what prevents it from colliding with ci run … do we have mechanizm to prevent that?" — the bench run after turn 14; DEC-168.
- 13:58Z: "please plan to review the ci after its done and plan ahead".
- 18:25Z (14:25 local): the walk — five yes; "but i changed location to ethiopia, but showing me saudiarabia advert as well"; then by the question card: "Keep worldwide (your rule)"; the bench "runs successfully"; code scanning: "one" — "Insecure randomness High #418 … Detected by CodeQL in scripts/feed-bench.ts :371" (INC-529).
