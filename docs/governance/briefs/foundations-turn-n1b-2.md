# Foundations turn N1b-2 — brief

## The plan (at 37ff1f04)

````markdown
# N1b-2 — An imitating seller name hidden from buyers (INC-977) — PLAN

Base dev c0e006ee. Plan only; nothing changed.

## 0. CI first (red goes first)

- ci-evidence (raw) still shows the last completed run as 79bd0d0d CANCELLED (preflight cancelled; every other job green). The c0e006ee run is not in the evidence yet.
- Disclosure: I also read the GitHub check-runs list for c0e006ee (public API, not the evidence branch). While the run was still going, 3 checks had failed: **E2E Lane smoke**, **Gitleaks secrets scan**, **i18n used-on map is fresh (U4i ②)**. Their logs need a sign-in, so I have not classified them.
- Build step 0: once the run lands, read ci-status / guards-last-failure / e2e-last-failure, classify each red and fix it at its root before N1b-2 work. Likely causes, to confirm and not assume: i18n map not regenerated for the N1b-1 strings; gitleaks catching the HMAC test vector or `JOB_SECRET` sample in NCJ fixtures (INC-975/976 scan of the merge diff); smoke depending on one of these or on the new route. Also watch AAN-1 in the unit job.

## 1. Census (by definition: any place a non-owner, non-staff viewer, search engine or cache can get the name)

### 1a. SQL — live functions that read `seller_alias` (prod `pg_proc`)
| Function | Grants | Class | N1b-2 |
|---|---|---|---|
| `seller_feed_page(text,jsonb,int)` DEFINER | anon+auth | **public** (seller page, `/api/seller`, `sellerExists`) | switch |
| `public_listing_json(listings,uuid)` DEFINER | internal (called by public ad doors) | **public** (ad page `seller.alias`, `previous_alias`) | switch |
| `my_seller_line()` | auth | owner | add review flag; still reads the column |
| `check_seller_alias` → `alias_verdict` | auth / internal | caller's own proposal | answers only ok/refusal + reason; never another person's name (checked: it returns `alias_verdict` jsonb) — build test confirms the reason payload carries no other person's alias |
| `suggest_seller_aliases` | auth | caller | made from the caller's own inputs, filtered by `alias_taken`; never another person's name — test confirms |
| `alias_taken`, `alias_verdict`, `legal_acceptance_guard`, `seller_name_sweep`, `validate_listing_draft`, `save_posting_identity` | internal / auth writer | no name goes out | unchanged |
| `admin_*`, `impersonated_get_profile` | auth + permission | staff | unchanged |
Build also re-runs this query plus a scan for `alias_history.alias` reads, and lists every public caller of `public_listing_json` with its grants.

### 1b. Server
- `/$name` (`src/routes/$name.tsx:31` → `sellerExists`, `src/server/seller-page.ts:13` → `seller_feed_page`, `unknownSeller` → not found).
- `/$name` head (`$name.tsx:38–43`): title, og:title, og:description are built from the **address**, not the database. With the new rule the loader returns not-found before head gets a name, so the head shows the not-found title (fix: the head must use the not-found title when the loader says not found; test).
- Ad page `src/routes/l.$slug.tsx`: head (title/description from the ad), JSON-LD `src/features/ad-page/json-ld.ts` (test fixture shows `seller` input; build confirms whether any name goes out — if yes, it reads the helper's value).
- Sitemap: none in `src/` (grep found none). Share text: build greps `navigator.share`/share builders. E-mail/notifications naming a seller to someone else: none found under `src/server`; build confirms in SQL (`net`/mail triggers).

### 1c. Browser
- `SellerLine` `src/features/posting/seller-line.tsx:41` today falls back to `post.review.notGiven` — change to the neutral label.
- `public-listing.ts:158/160` (alias, previous_alias) → `listing-detail.tsx:938–940`.
- Link to the seller's other ads: `l.$slug.tsx:210` `sellerAdsKey` from `doc.seller.alias` → `listing-detail.tsx:1009–1013`. Hidden alias = null → no link drawn (already guarded).
- Seller page `seller-page.tsx:75/82` (`seller.alias` in title). Unreachable while hidden (not found), still null-safe.
- Feed cards / similar ads: no seller name found in `src/features/feed`; build confirms on the card shape that `feed_page` returns.

### 1d. Caches
- `/api/seller`: `public, max-age=60, stale-while-revalidate=300` → up to ~6 min stale at browser/edge.
- Ad page SSR HTML and the `public_listing_json` reads: build reads the exact headers/version cache and adds them here.
- Window: up to max-age + SWR after the verdict. Plan: no purge; it is bounded at ≤ 6 min and the job runs every 15 min, so it is the same as the time-to-detect. If the supervisor wants zero, the purge would bump the public version-cache key on an `imitates` mark (`name_check_mark`) and use `no-store` on `/api/seller` — named, not built.

## 2. The helper

`public.seller_public_alias(p_profile uuid, p_subject text DEFAULT 'alias') RETURNS text`
- `LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp` (definer because `name_checks` is closed).
- Body: the alias, or NULL when `name_checks(p_profile, p_subject).state = 'imitates'` **and** its `checked_text` folds to the current alias. One primary-key lookup on `name_checks(profile_id, subject)`; EXPLAIN in the proof shows an index scan.
- Grants: REVOKE FROM PUBLIC, anon, authenticated; GRANT EXECUTE to service_role only. Called only from inside definer functions, so no new browser grant and no allowlist line.
- `p_subject` takes `business_name` later (D222) with no new signature.
- `seller_feed_page` calls it once per page (for the seller), not once per ad.

## 3. Previous name

- Stored in `alias_history` (`alias`, `released_at`); read by `my_seller_line` and `public_listing_json` (latest released within 365 days). `name_checks` keeps only the current text, so a previous name has **no check row of its own**.
- Rule: add `alias_history.released_state text` (null for older rows), set in the same transaction by `save_posting_identity` and `admin_update_profile` from the outgoing `name_checks` state when the alias is released.
- Public line shows the previous name only if `released_state` is `clean` or `unchecked`; `imitates` → no line. Legacy null → **withheld on public reads** (recommended: it is unknown, and hiding a "previously" line costs the buyer little; the build counts rows). The owner always sees their own.
- Supervisor ruling needed: withhold legacy null (recommended) or show it.

## 4. `/<name>` while `imitates`

`seller_feed_page` treats a hidden key as `unknownSeller` → same 404 status and the same not-found page and head as an unknown name. No public page links to it (1c link reads null).

## 5. Neutral label

New key `post.seller.neutral` with the same words as `post.preview.sellerLabel` ("Seller" / "ሻጭ"), copied by script. Why its own key: `sellerLabel` is the section heading/aria label; changing the heading later must not change what a hidden name says (D5). SellerLine draws `business ?? alias ?? t("post.seller.neutral")`; `notGiven` is no longer used there.

## 6. Owner's notice

`my_seller_line` redeclared whole, adding `under_review boolean` (state `imitates` on the current alias). Owner sees their own name in: account overview (`account-overview.tsx:107`), posting review step (`step-review.tsx:617`), my listing page (`my-listing-page.tsx:670`), own ad page / own seller page when signed in (public reads → owner sees the neutral label there, with the notice). Notice shows on the account overview and the review step via a single `SellerReviewNotice` beside SellerLine. Keys (EN/AM from supervisor, G43): `post.seller.underReview`, `post.seller.underReviewHelp`. Census decides whether the own ad page also shows it (proposed: yes, same component).

## 7. Migrations (each stops after prod apply: "apply <fragment> → expect mark <value>")

- M1: `alias_history.released_state` + `seller_public_alias` (+ grants, closers, mark).
- M2: `public_listing_json` redeclared whole from live `pg_get_functiondef` (~13 KB), argument list unchanged.
- M3: `seller_feed_page` + `my_seller_line` + `save_posting_identity` + `admin_update_profile` (release stamping), whole, ~18 KB.
- Proofs: own scratch profiles/ads only, id-scoped form, rolled back whole, raise on failure; no proof assumes the Vault is empty or calls `job_call`.

## 8. Tests (ids grep-checked free at build)

- SPA-1 helper: imitates → null; unchecked/clean → name; stale `checked_text` → name.
- SPA-2 `public_listing_json` hides alias and previous; SPA-3 `seller_feed_page` unknownSeller for a hidden key; SPA-4 unchecked/clean still shown.
- SPA-5 previous-name rule (imitates, null legacy, clean).
- SPA-6 owner `my_seller_line` keeps name + `under_review`; SPA-7 staff `admin_listing_detail` keeps name.
- SPA-8 SellerLine draws the neutral label, never `notGiven`; no seller-ads link with a null key.
- SPA-9 `/$name` head uses the not-found title.
- Guard `scripts/conformance/seller-name.test.ts`: every function executable by anon/authenticated (or called by one) that reads `profiles.seller_alias` / `alias_history.alias` outside the helper fails; planted bypass self-test; allowlist `key | reason | until` (owner/staff doors listed with reasons).
- E2E (both projects): imitating seller's ad shows "Seller", no link, and `/<name>` is not found.

## 9. K2

- D222 business name: not re-checked today; shown on ad and seller page as is. Listed, not built.
- `/$name` head builds title/og from the raw address (`$name.tsx:38–43`).
- `SellerLine` member-since uses raw `Intl.DateTimeFormat` with `formatLocale` (OK) but `fill` interpolation (noted in N1a).
- `seller-page.tsx:75` falls back to `""` for the name.

## 10. Conflicts

- CI evidence rule vs. my API read of check-runs (disclosed in §0; build uses evidence only).
- Volatile helper under SECURITY DEFINER is allowed by E7; no browser grant, so no public-surface line.
- No conflict found with AGENTS.md or the platform's guidance.

## 11. Sizing (G37)

1. N1b-2a: CI reds + M1 (+ stop).
2. N1b-2b: M2 + M3 (two stops).
3. N1b-2c: browser label/notice, guard, tests, E2E, docs, register row, report.
ESTIMATE: 3 turns, band 3–5 (wider if a CI red has a deep cause or the cache purge is ruled in).

## Rulings asked
1. Legacy previous names with no recorded state: withhold (recommended) or show.
2. Cache window ≤ ~6 min: accept, or build the purge.
3. Own ad page shows the owner's notice: yes/no.
````

## The ruling (2026-10-29 08:47 UTC)

````text
RULING — Foundations turn N1b-2: the plan is approved with the rulings below. Fix the three CI reds FIRST, then BUILD N1b-2a and go on through N1b-2b and N1b-2c, stopping at each migration. Base: dev 37ff1f04.

CI FIRST — the run on c0e006ee (40840907117) is FAILURE with three reds, classified. Every E2E test that ran passed (2,051 passed, 0 failed); the unit job passed (AAN-1 included). The run on 37ff1f04 (your plan commit) will show the same reds.

C1. INC-982 — "i18n used-on map is fresh": the turn added five files under src/ without rerunning the map; both docs/generated/i18n-usage.json and public/i18n-usage.json say "scanned": 604 where the regenerated map says 609 (CI's diff, and my own run at c0e006ee). Fix: bun run i18n:usage and commit both files. Class rule (second occurrence today, after 7063a727): add one line to AGENTS.md's checks before a turn ends — "after adding, moving or removing any file under src/, or changing a t() call, run bun run i18n:usage" — beside the eslint / format:check / unit-suite line.

C2. INC-983 — "Gitleaks secrets scan": the pinned gitleaks 8.24.3 over origin/main..c0e006ee (my run, the same command as CI) finds 2 leaks, both generic-api-key on the test constant `const SECRET = "test-secret-…"`:
   - ce908c8ff72143ef85d1919238f8ebc584d26f87:src/routes/api/public/jobs.test.ts:generic-api-key:73
   - c0e006ee8101f26e80b5d36b3b4f1b5acd97cbd4:src/routes/api/public/jobs.test.ts:generic-api-key:75
   It is a made-up test value, not a secret. Fix, both parts:
   a. The test makes its secret at run time (randomBytes(32).toString("hex") from node:crypto), so no secret-shaped literal stays in the tree, and the rule stays armed for the next file.
   b. The two fingerprints above go in .gitleaksignore, in the file's own form (a comment naming INC-983, "a made-up test value, human-ruled benign; the rule stays armed everywhere else"), because the scan walks every commit main does not hold yet and both commits stay in that range until main advances.
   Class rule: add one line to docs/conventions.md — a test never writes a secret-shaped literal; it makes its fake secret at run time.

C3. INC-984 — "Lane smoke": the lane failed before any test ran, and its cause is NOT in the evidence: e2e-last-failure.md and local-backend-last-failure.md say "smoke: log unavailable … the process failed outside test results", local-backend-proof.md says "smoke | not run | 119 | applied 374/374", and no step-failure line appears anywhere. The only new step in that lane is your "Outbound-calls guard (INC-981)". Two hypotheses, neither proven:
   (a) the local stack of the pinned CLI (2.120.0) creates supabase_functions.http_request() — the platform's database-webhook trigger function, which calls net.http_post — and S4's census names it. Prod has no such function (my read at 08:2xZ: only public.job_call(text), and the platform's event-trigger function your census already excludes).
   (b) the S5 curl's answer did not contain PGRST106.
   Fix, in this order:
   i. THE EVIDENCE GAP FIRST: the step writes every failing line — each "Outbound-calls guard FAIL:" line, and for S5 the HTTP status and the first 300 characters of the answer, redacted — to the lane's local-backend-failure.txt before it exits, and that failure must be readable in a ci-evidence file the next time it happens. Read how the lane's "Step failure" lines travel today (they did not reach any evidence file in this run), name the file where they will appear, and prove it with the reporter's fixture.
   ii. Find which hypothesis holds from the CLI's own source at v2.120.0 (its local start templates), read from your sandbox. If (a): the census allowlists that one platform function by an allowlist line in the guard (key | reason | until: "created by the CLI's local stack, not by our migrations; absent on ethio-prod (read 2026-10-29) | until the CLI pin changes") — never by excluding a whole schema — and the planted-caller self-test still fails. If (b): fix the request and keep the PGRST106 match.
   iii. If you cannot settle it from the source, say so in one line, land i, and let the next run show the cause. Do not weaken either half to get green.
   The "E2E (Playwright, ethio-staging)" red follows from the smoke lane having no results; it needs no fix of its own.

PLAN RULINGS
R1. THE PREVIOUS NAME: shown on public reads only when released_state = 'clean'. 'unchecked', 'imitates' and a legacy NULL are all withheld. Reason: a name released while 'unchecked' was never checked, and the route marks a name 'clean' at save whenever the model answers that it is clean, so 'unchecked' is the failure case. Cost, read on prod 29 Oct: 1 previous name within 365 days (6 rows in alias_history, 5 people). The owner always sees their own.
R2. CACHES: the ≤ ~6 min window (/api/seller: max-age 60, stale-while-revalidate 300) is accepted with no purge; the re-check runs every 15 minutes, so the window is inside the time it takes to find the name. The ad page's server read (src/server/ad-page.ts:30) has no version cache — I read it. At build, read the ad page's and the seller page's HTML cache headers; if anything can hold a name longer than about 6 minutes, STOP with what you found.
R3. The owner's own ad page shows the notice: yes, the same component.
R4. The neutral label gets its own key with the app's words: accepted.
R5. The owner's own /<name> is not found while the name is held, like everyone else's; the notice says so.
R6. THE GUARD covers both columns that carry a public name: profiles.seller_alias and alias_history.alias. Owner and staff doors are allowlist lines with reasons.
R7. THE E2E FIXTURE makes a name 'imitates' only through name_check_mark with the service client, on its own scratch seller, and restores it in afterEach (Knowledge J3). Nothing is written to name_checks by hand.
R8. Sizing accepted: N1b-2a (the CI reds + M1), N1b-2b (M2, M3), N1b-2c (the browser label and notice, the guard, the tests, the E2E, docs, register row, report). Do not stop between parts except at a migration stop. Test ids (SPA-*) are grep-checked free at build.

THE STRINGS (G43). Write them by script from this exact JSON. First check that the sha256 of the JSON text, exactly as given between the markers, is 5620fd3a6557e081fb6d6c709fcc11578e7da3d4dc4373b38d9a80daa0cf2cd1. Then add each key to en-base.ts and am-base.ts beside post.seller.previously. List them key by key with their English in the report.
---JSON START---
{"en":{"post.seller.neutral":"Seller","post.seller.underReview":"Your seller name is being reviewed","post.seller.underReviewHelp":"Until our team finishes, buyers see “Seller” instead of your name, and your “All ads by this seller” page is hidden. Your ads stay up."},"am":{"post.seller.neutral":"ሻጭ","post.seller.underReview":"የሻጭ ስምዎ እየተገመገመ ነው","post.seller.underReviewHelp":"ቡድናችን ግምገማውን እስኪጨርስ ድረስ ገዢዎች ከስምዎ ይልቅ «ሻጭ» ያያሉ፤ «የዚህ ሻጭ ሁሉም ማስታወቂያዎች» ገጽዎም አይታይም። ማስታወቂያዎችዎ ባሉበት ይቆያሉ።"}}
---JSON END---
The notice is one component (the plan's SellerReviewNotice) placed beside the seller line: underReview as its line and underReviewHelp as its help text. It is built from the app's existing shared primitive for a short status note — find it in the census and name it in the report; if none exists, say so in the report rather than styling a new box.

STEP 0
a. Save your plan (.lovable/plan.md at 37ff1f04) and this ruling as docs/governance/briefs/foundations-turn-n1b-2.md, by scripted copy, the plan first, each in its own fenced block. Set roadmap line 3 to name it.
b. Roadmap: add INC-982, INC-983 and INC-984 (open; fixed in N1b-2a), and INC-985 (open; the Foundations locale and format work): "Amharic dates use the short month (ኦክቶ for ኦክቶበር) — the operator's walk of Admin › Screening, 29 Oct; the class is every date shown with a month name (39 Intl.DateTimeFormat / toLocale* sites; month: 'short' in calendar.tsx, audit-page.tsx, listings-page.tsx, screening-page.tsx); one shared date formatter, Amharic months in full". Do not fix INC-985 in this turn.

HOW TO WORK: as N1b-1 (CI FIRST; K1–K6; the whole unit suite; G39 in full; proofs on their own scratch rows, rolled back whole, raising on failure, the id-scoped form for any whole-table statement; no proof assumes the Vault is empty or calls job_call; no weakened proof; a refusal test proves the refused side effect did not happen; each migration stops after its prod apply with "apply <fragment> → expect mark <value>"; push, and END THE TURN at each stop).

REPORT: the CI line first (the evidence files, never the check-runs list). Then C1–C3 each fixed or not, with the cause C3 found; each migration's stop; the SPA results; the whole unit suite count; the K2 list; the strings key by key; the files from git diff --name-only c0e006ee.
````
