# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38671571434 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38671571434
- Commit: `af5998e0c97f2407d723797028917156f3043674`
- Attempt: 2
- Written (UTC): 2026-10-15T07:54:39.199Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 3
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — Error: [e2e:l2b] destroying XH failed at country row: update or delete on table "countries" violates foreign key constraint "locations_country_code_fkey" on table "locations"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides — Error: [e2e:pool] reaping e2e-pool-s6a-010@ethio-e2e.invalid (password) failed: Unexpected token 'I', "Internal s"... is not valid JSON
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · feed-route.spec.ts › FEED ROUTE › FR-6 the answer is public and carries no seller — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: [e2e:l2b] destroying XH failed at country row: update or delete on table "countries" violates foreign key constraint "locations_country_code_fkey" on table "locations"
--- further error 1 ---
Error: [e2e:l2b] destroying XH failed at country row: update or delete on table "countries" violates foreign key constraint "locations_country_code_fkey" on table "locations"

   at helpers/countries.ts:290

  288 |   const supabase = adminClient();
  289 |   const fail = (step: string, message: string) => {
> 290 |     throw new Error(`[e2e:l2b] destroying ${code} failed at ${step}: ${message}`);
      |           ^
  291 |   };
  292 |
  293 |   // CLOSE FIRST: a market that is still open outlives a partial failure as a
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/countries.ts:290:11)
    at destroyCountry (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/countries.ts:324:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2158:31
```

Context: context file not found for `shell-L4b-location-picker-LS-11-picking-a-second-market-renders-its-own-tree-and-saves-its-own-node-desktop-1280` — Playwright's name `shell-L4b-location-picker--3d8f5-tree-and-saves-its-own-node-desktop-1280`; this run carried 0 context file(s); of the same spec: none

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s6a-010@ethio-e2e.invalid (password) failed: Unexpected token 'I', "Internal s"... is not valid JSON
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s6a-010@ethio-e2e.invalid (password) failed: Unexpected token 'I', "Internal s"... is not valid JSON

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:122:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:2192:18
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-43-a-fact-prefills-a-sibling-the-same-selection-unhides-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--accdb--the-same-selection-unhides-desktop-1280`; this run carried 0 context file(s); of the same spec: none

### feed-route.spec.ts › FEED ROUTE › FR-6 the answer is public and carries no seller

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502

  213 |     await seedCityFive(seed);
  214 |     const r = await getFeed(request, { category: seed.leaf.id, place: seed.chain.city.id });
> 215 |     expect(r.status).toBe(200);
      |                      ^
  216 |     expect(r.cacheControl).toBe("public, max-age=60, stale-while-revalidate=300");
  217 |     const keys = [
  218 |       "id",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-route.spec.ts:215:22
```

Context: context file not found for `feed-route-FEED-ROUTE-FR-6-the-answer-is-public-and-carries-no-seller-desktop-1280` — Playwright's name `feed-route-FEED-ROUTE-FR-6-7591a-ublic-and-carries-no-seller-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

108 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>kdqda: e<n>e_par_zx<n>x<n>z → e<n>e_chi_<n>qzjx` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-k<n>avzm: e<n>e_par_<n>gzfd<n> → e<n>e_chi_coc<n>t<n>` (quiet) | 1 | shard 4 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | changed |
| `upstream returned an HTML error page (<n>)` | 1 | shard 6 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>kdqda: e<n>e_par_zx<n>x<n>z → e<n>e_chi_<n>qzjx ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-k<n>avzm: e<n>e_par_<n>gzfd<n> → e<n>e_chi_coc<n>t<n> ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): feed renders its empty state ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PR-41 the door refuses an answer the chosen options do not allow ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-17 the currency is preselected and searchable by name in one control ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: changed
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): FE-8 the tier sets the rank ×1 · FR-6 the answer is public and carries no seller ×1

```text
[WebServer] [ssr-error] /api/feed Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

### upstream returned an HTML error page (<n>)

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): primitives fit and adapt at 360 ×1 · primitives fit and adapt at 768 ×1

```text
[WebServer] [ssr-error] /api/feed upstream returned an HTML error page (502)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-15T07:15:22.700Z | 18.9 min |
| email | 2026-10-15T07:15:07.073Z | 0.2 min |
| shard 1 | 2026-10-15T07:15:07.021Z | 34.2 min |
| shard 2 | 2026-10-15T07:15:04.399Z | 30.9 min |
| shard 3 | 2026-10-15T07:15:08.966Z | 32.5 min |
| shard 4 | 2026-10-15T07:15:16.447Z | 34.7 min |
| shard 5 | 2026-10-15T07:15:13.578Z | 39.1 min |
| shard 6 | 2026-10-15T07:15:06.168Z | 27.8 min |
| changed | 2026-10-15T07:15:06.787Z | 16.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 80 | 24.6 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 60 | 20.9 min | shard 2, shard 5, changed |
| `shell.spec.ts` | 336 | 20.4 min | smoke, shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 62 | 20.0 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 44 | 19.1 min | shard 2, shard 5, changed |
| `admin-listings.spec.ts` | 58 | 18.9 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 17.1 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.5 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 60 | 15.9 min | shard 2, shard 5, changed |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.5 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 44 | 13.8 min | shard 2, shard 5, changed |
| `post-wizard-place.spec.ts` | 38 | 12.6 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 12.5 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 12.0 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.9 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 10.4 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 10.1 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 20 | 9.6 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 44 | 9.5 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 9.1 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.8 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.5 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 8.5 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.1 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 6.5 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.5 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 16 | 6.4 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.0 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 5.8 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 8 | 4.8 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.2 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.1 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.6 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.5 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.2 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 1.0 min | smoke |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 61.7 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 58.7 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 56.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 55.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 55.2 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | desktop-1280 | 54.3 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 50.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 49.2 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 47.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 47.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 47.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 46.7 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 46.6 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 46.4 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | desktop-1280 | 44.2 s |
