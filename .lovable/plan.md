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
