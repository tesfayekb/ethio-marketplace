# Foundations turn N1b-2 — final report (INC-977: an imitating seller name hidden from buyers until staff decide)

## CI line

ci-evidence (raw, read 10:0x UTC): ci-status.md names **`3ee69785` SUCCESS** (Completed 09:54:59Z, run 40849853483), the commit this part was built on. The run before it, `7583664d`, failed only on the migration linter (M1's two real-row lines, fixed at bff53069), with Gitleaks, the i18n map and Lane smoke green there. No red is open.

## C1–C3 (N1b-2a)

- **C1 INC-982:** fixed. Both maps were regenerated, and AGENTS.md now has the i18n:usage line. Confirmed green on 7583664d.
- **C2 INC-983:** fixed. The test secret is made at run time, the two fingerprints are in `.gitleaksignore`, and the conventions line is added. Confirmed green on 7583664d.
- **C3 INC-984:** fixed. The cause was hypothesis (a): the CLI v2.120.0 local stack's `webhook.sql` creates `supabase_functions.http_request()`. It is now one allowlist line, the planted caller in the same schema is still refused, and the failure lines go into `local-backend-failure.txt` under "## Lane smoke" (LFE-1/2). Lane smoke was green on 7583664d.

## The migrations (each its own stop)

| Stop | Migration | Apply line |
| --- | --- | --- |
| 1 | M1: the helpers + `released_state` | apply 709fb25b → expect mark 20261030010000 |
| 2 | M2: helper fail-closed (INC-986) + `public_listing_json` | apply 2c2b5ef0 → expect mark 20261030013000 |
| 3 | M3a: `seller_feed_page` + `my_seller_line` | apply 85de2619 → expect mark 20261030020000 |
| 4 | M3b: the release stamp in both writers | apply 0cd49f0d → expect mark 20261030021500 |

## N1b-2c — what was built

- **Neutral label:** `SellerLine` draws `business ?? alias ?? t("post.seller.neutral")`. An empty alias counts as no name. `post.review.notGiven` is no longer read there.
- **Owner's notice:** `SellerReviewNotice` (`src/features/seller/seller-review-notice.tsx`). Its line is `post.seller.underReview` and its help is `post.seller.underReviewHelp`, with `role="status"`; it draws nothing unless the name is held. It shows on:
  - the account overview — a failed read is the page's error;
  - the posting review step;
  - my listing page — through `ListingDetail.sellerUnderReview`;
  - the owner's own ad page (R3) — the flag comes through `readSellerReview` over the supabase door (DEC-261), so no client lands on the public first download; a failed read is logged and no notice is drawn, so the page never says "not held".
  - **Shared primitive:** the census found no boxed short-status-note primitive. `alert.tsx` is the shadcn Alert, unused in features, bordered and `role="alert"`. `ActionMessage` and `FadingNotice` are for action outcomes. So the notice uses the text-only form the app already uses for a short note (`my-listing-info`), and no new box is styled.
- **No link to a held seller:** the public read gives a null alias, so `l.$slug` passes no `sellerAdsKey` and `ListingDetail` draws no link (SPA-8b, SPA-E2E-1).
- **`/$name` head:** the loader returns `{ name }` only when found. The head is `sellerHead(loaderData)`, which on a not-found gives `robots: noindex` and nothing else, so the root title stands and the name never reaches the head. The previous head built the title from the address even on a 404, which would have put a held name in the bytes.
- **Caches (R2):** the HTML of `/l/*` and `/<name>` gets no Cache-Control from the app. Only `/api/seller` caches, for about 6 minutes, which R2 accepted. Nothing holds a name longer.
- **Seller-name guard (R6):** `scripts/conformance/seller-names.test.ts` with `seller-names-allowlist.txt`. It covers 16 functions:
  - 7 staff doors (`admin_*`, `impersonated_get_profile`);
  - 6 internal judges, a trigger and a sweep that answer no name;
  - 2 owner doors;
  - `seller_feed_page`, which reads the column only as its lookup key.

  Each line carries a reason and until 2027-04-30. The planted bypass (SPA-10c) is refused.
- **Test area:** a new `seller-name` area in `scripts/e2e-select.ts` runs the spec when its files change. The e2e-select self-test required this.
- **Moved string:** `post.review.notGiven` moved from en-base/am-base to en-member/am-member, character for character. With SellerLine no longer reading it, it is only shown on signed-in routes, and CF-SL-1 required the move.

## SPA results

- **SQL proofs (in the migrations, scratch rows only, rolled back):** SPA-1a–g, SPA-2a–f, SPA-3a–f, SPA-5a–k, SPA-6a–c — all pass. SPA-7 (staff `admin_listing_detail` keeps the name) is unchanged code, recorded as an allowlist line.
- **Unit tests:**
  - SPA-6d/e: `readSellerReview` reads the flag, and a door error or missing flag is a ReaderError — pass.
  - SPA-8a: `SellerLine` draws the neutral label for null and empty names — pass.
  - SPA-8b: `ListingDetail` for a held seller shows the label, no link, and the notice only when asked — pass.
  - SPA-9a/b: `sellerHead` — pass.
  - SPA-10a/b/c: the guard — pass. 16 readers, all allowlisted; no server file names a column; the planted bypass is refused.
- **E2E:** `bun run e2e:local -- e2e/seller-name-hidden.spec.ts` on ethio-staging, both projects, the whole file, 0 retries: **`2 passed (27.3s)`**. Teardown: `[e2e:teardown] deleted 3 user(s)`. The hold is made through `name_check_mark` on the test's own seller after the seller saves its own name through the door, and it is marked clean again in afterEach (R7, J3).
  - J-audit: J1 e2e names (`ehold_…`), J2/J3 no real row, J5 test-id locators, J7 seed before navigate, J9 pool seller. Cleanup survives a timeout: the restoration runs in afterEach inside try/finally.

## The whole unit suite

`bun run test:unit`: **2,171 passed, 5 failed, 1 skipped** (361 files).

- NH-1/2/3 are the sandbox timezone failures, there before this turn.
- EXH-4/5 timed out under the whole suite's load. Alone, `executor-hooks.test.ts` gives 25/25 passed.

## K2 (reported, not built)

- **The business name (D222)** is not re-checked. `seller_feed_page` and `public_listing_json` still show `business_name` for business sellers. The helper takes it later by `p_subject`.
- **The tie-break** (ruled at stop 4) is now a roadmap line.
- **`name_checks` and the test pool:** the pool reset (`e2e/helpers/pool-reset-map.ts`) clears `alias_history` but not `name_checks`. A held row left behind by an aborted run outside afterEach would hide a later test's name. The spec restores in afterEach; adding the table to the pool reset is a records-turn item.
- **Account overview:** it reads `profiles` directly. It does not read `my_seller_line` for the name, only for the flag.
- **`seller-page.tsx:75/82`** still builds its title from `seller.alias`. That is unreachable while the name is held (a 404), and it is null-safe.

## The strings (G43; sha256 of the JSON `5620fd3a…cd1` verified before writing)

| Key | English | Amharic |
| --- | --- | --- |
| `post.seller.neutral` | Seller | ሻጭ |
| `post.seller.underReview` | Your seller name is being reviewed | የሻጭ ስምዎ እየተገመገመ ነው |
| `post.seller.underReviewHelp` | Until our team finishes, buyers see “Seller” instead of your name, and your “All ads by this seller” page is hidden. Your ads stay up. | ቡድናችን ግምገማውን እስኪጨርስ ድረስ ገዢዎች ከስምዎ ይልቅ «ሻጭ» ያያሉ፤ «የዚህ ሻጭ ሁሉም ማስታወቂያዎች» ገጽዎም አይታይም። ማስታወቂያዎችዎ ባሉበት ይቆያሉ። |

All three are written in en-base.ts and am-base.ts beside `post.seller.previously`.

## The checks

- i18n:usage: 1,752 keys across 612 files; both maps committed.
- eslint on every touched TS file: 0 errors.
- prettier --check on every touched file (docs too): clean.
- Migration guard: `Migration guard OK.`
- build-errors.log: `build OK`.

## Files (`git diff --name-only c0e006ee`, plus new files)

```text
.github/workflows/local-backend-proof.yml
.gitleaksignore
.lovable/plan.md
AGENTS.md
docs/_changelog.md
docs/conventions.md
docs/features/hidden-seller-name.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-n1b-2.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-n1b-2.stop-1.md
docs/governance/reports/foundations-turn-n1b-2.stop-2.md
docs/governance/reports/foundations-turn-n1b-2.stop-3.md
docs/governance/reports/foundations-turn-n1b-2.stop-4.md
docs/tracking/intentional-deletions.txt
e2e/seller-name-hidden.spec.ts
public/i18n-usage.json
roadmap.md
scripts/check-outbound-calls.ts
scripts/ci/lane-failure-evidence.test.ts
scripts/conformance/agents-lines-allowlist.txt
scripts/conformance/outbound-calls-allowlist.txt
scripts/conformance/seller-names-allowlist.txt
scripts/conformance/seller-names.test.ts
scripts/e2e-select.ts
scripts/fixtures/lane-smoke-step-failure.txt
scripts/fixtures/outbound-calls-bad.txt
scripts/migration-real-row-allowlist.txt
src/features/account/account-overview.tsx
src/features/my-listings/my-listing-page.tsx
src/features/posting/posting-service.ts
src/features/posting/preview/listing-detail.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/seller-line.test.tsx
src/features/posting/seller-line.tsx
src/features/posting/step-review.tsx
src/features/seller/seller-head.test.ts
src/features/seller/seller-head.ts
src/features/seller/seller-review-notice.tsx
src/features/seller/seller-review.test.ts
src/features/seller/seller-review.ts
src/i18n/locales/am-base.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-member.ts
src/integrations/supabase/types.ts
src/routes/$name.tsx
src/routes/api/public/jobs.test.ts
src/routes/l.$slug.tsx
supabase/migrations/20261029085507_709fb25b-c8da-47f0-b50f-c1e6a5ab9b80.sql
supabase/migrations/20261029090431_2c2b5ef0-8a9e-4cf5-a1cd-2a1c2cdb1b92.sql
supabase/migrations/20261029091909_85de2619-cec0-459c-b6c0-4e58f4e906b8.sql
supabase/migrations/20261029092611_0cd49f0d-bdbc-4c3d-b789-f1fbe20db2c7.sql
docs/governance/reports/foundations-turn-n1b-2.report.md
```
