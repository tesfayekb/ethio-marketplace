# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38180273767 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38180273767
- Commit: `ea8c54d9d462332a3d3e22853793bba0a3d09241`
- Attempt: 1
- Written (UTC): 2026-10-11T22:57:14.200Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown — Error: AL-16 the door showed 8.9

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown

- Source: `changed`
- Project: `mobile-360`

```text
Error: AL-16 the door showed 8.9

expect(received).not.toContain(expected) // indexOf

Expected substring: not "8.9"
Received string:        "{\"seller\":{\"id\":\"05d081b1-05b6-4740-a457-59c69af25e7c\",\"alias\":\"eseller_lerqvxrd\",\"email\":null,\"member_since\":\"2026-10-02T02:57:24.880289+00:00\",\"business_name\":null,\"account_status\":\"active\"},\"history\":[{\"at\":\"2026-10-11T22:36:51.412273+00:00\",\"by\":\"seller\",\"kind\":\"edit\",\"note\":null,\"after\":{\"title\":\"E2E admin listing changed jtgfrfds\"},\"before\":{\"title\":\"Before the edit\"},\"fields\":[\"pin_lat\",\"street_address\",\"title\"],\"reason\":null,\"by_name\":null}],\"listing\":{\"id\":\"118d64b4-d808-4a21-8ecf-32d1e693ba2d\",\"tier\":\"regular\",\"title\":\"E2E admin listing changed jtgfrfds\",\"severe\":false,\"status\":\"active\",\"price_bp\":null,\"attributes\":{},\"created_at\":\"2026-10-11T22:36:48.998096+00:00\",\"expires_at\":null,\"price_mode\":\"fixed\",\"price_unit\":null,\"updated_at\":\"2026-10-11T22:36:48.998096+00:00\",\"category_id\":\"94d9eae8-6442-4139-96e3-b52ad218cf1b\",\"description\":\"e2e scratch listing for the admin console\",\"location_id\":\"cbc1b910-b450-4a77-ad90-cf7e6c10dfa6\",\"photo_count\":0,\"photos_soon\":false,\"country_code\":\"ET\",\"price_amount\":100,\"price_period\":\"once\",\"published_at\":\"2026-10-11T22:36:47.977+00:00\",\"place_name_am\":null,\"place_name_en\":\"e2e-loc-changed-0-ls-city-6qtv9b\",\"renewed_count\":0,\"price_currency\":\"ETB\",\"price_unit_text\":null,\"category_name_am\":null,\"category_name_en\":\"e2e-post-changed-0-g0fh0v\",\"price_negotiable\":false,\"poster_expires_at\":null,\"published_first_at\":\"2026-10-11T22:36:47.977+00:00\"},\"channels\":{\"phone\":false,\"phone2\":false,\"telegram\":false,\"whatsapp\":false},\"history_total\":1}"
--- further error 1 ---
Error: AL-16 the door showed 8.9

expect(received).not.toContain(expected) // indexOf

Expected substring: not "8.9"
Received string:        "{\"seller\":{\"id\":\"05d081b1-05b6-4740-a457-59c69af25e7c\",\"alias\":\"eseller_lerqvxrd\",\"email\":null,\"member_since\":\"2026-10-02T02:57:24.880289+00:00\",\"business_name\":null,\"account_status\":\"active\"},\"history\":[{\"at\":\"2026-10-11T22:36:51.412273+00:00\",\"by\":\"seller\",\"kind\":\"edit\",\"note\":null,\"after\":{\"title\":\"E2E admin listing changed jtgfrfds\"},\"before\":{\"title\":\"Before the edit\"},\"fields\":[\"pin_lat\",\"street_address\",\"title\"],\"reason\":null,\"by_name\":null}],\"listing\":{\"id\":\"118d64b4-d808-4a21-8ecf-32d1e693ba2d\",\"tier\":\"regular\",\"title\":\"E2E admin listing changed jtgfrfds\",\"severe\":false,\"status\":\"active\",\"price_bp\":null,\"attributes\":{},\"created_at\":\"2026-10-11T22:36:48.998096+00:00\",\"expires_at\":null,\"price_mode\":\"fixed\",\"price_unit\":null,\"updated_at\":\"2026-10-11T22:36:48.998096+00:00\",\"category_id\":\"94d9eae8-6442-4139-96e3-b52ad218cf1b\",\"description\":\"e2e scratch listing for the admin console\",\"location_id\":\"cbc1b910-b450-4a77-ad90-cf7e6c10dfa6\",\"photo_count\":0,\"photos_soon\":false,\"country_code\":\"ET\",\"price_amount\":100,\"price_period\":\"once\",\"published_at\":\"2026-10-11T22:36:47.977+00:00\",\"place_name_am\":null,\"place_name_en\":\"e2e-loc-changed-0-ls-city-6qtv9b\",\"renewed_count\":0,\"price_currency\":\"ETB\",\"price_unit_text\":null,\"category_name_am\":null,\"category_name_en\":\"e2e-post-changed-0-g0fh0v\",\"price_negotiable\":false,\"poster_expires_at\":null,\"published_first_at\":\"2026-10-11T22:36:47.977+00:00\"},\"channels\":{\"phone\":false,\"phone2\":false,\"telegram\":false,\"whatsapp\":false},\"history_total\":1}"

  1160 |     const text = JSON.stringify(body);
  1161 |     for (const hidden of ["Old street one", "New street two", "8.9", "9.01"]) {
> 1162 |       expect(text, `AL-16 the door showed ${hidden}`).not.toContain(hidden);
       |                                                           ^
  1163 |     }
  1164 |
  1165 |     await useJobSuperAdmin(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1162:59
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-16-The-listing-page-s-door-who-reads-what-drafts-never-a-pin-and-an-address-named-but-never-shown-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

108 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `listing not found` | 8 | shard 4, shard 7, shard 8 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `categories file too large` (quiet) | 2 | shard 3, shard 7 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 7 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 7 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 7 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 7 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 7 |
| `locations file too large` (quiet) | 2 | shard 3, shard 7 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 7 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 7 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 7 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 7 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>sojfz: e<n>e_par_<n>xbpmn → e<n>e_chi_sqoclv` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-yfv<n>c<n>: e<n>e_par_codbn<n> → e<n>e_chi_kih<n>wl` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>sojfz: e<n>e_par_<n>xbpmn → e<n>e_chi_sqoclv ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-yfv<n>c<n>: e<n>e_par_codbn<n> → e<n>e_chi_kih<n>wl ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 4, shard 7, shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-11T22:25:36.874Z | 19.8 min |
| email | 2026-10-11T22:25:19.118Z | 0.2 min |
| shard 1 | 2026-10-11T22:25:27.607Z | 27.0 min |
| shard 2 | 2026-10-11T22:25:29.504Z | 22.9 min |
| shard 3 | 2026-10-11T22:25:27.837Z | 29.2 min |
| shard 4 | 2026-10-11T22:25:28.341Z | 31.5 min |
| shard 5 | 2026-10-11T22:25:32.489Z | 28.6 min |
| shard 6 | 2026-10-11T22:25:19.082Z | 22.5 min |
| shard 7 | 2026-10-11T22:25:26.223Z | 29.1 min |
| shard 8 | 2026-10-11T22:25:17.938Z | 27.5 min |
| changed | 2026-10-11T22:25:22.829Z | 22.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 100 | 45.7 min | shard 1, shard 5, changed |
| `post-wizard-specs.spec.ts` | 78 | 32.9 min | shard 4, shard 8 |
| `post-wizard-bundle2.spec.ts` | 66 | 28.6 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 20.9 min | smoke, shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 18.5 min | shard 3, shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 17.8 min | shard 4, shard 8 |
| `admin-screening.spec.ts` | 30 | 17.8 min | shard 2, shard 6 |
| `admin-translations-console.spec.ts` | 84 | 17.3 min | shard 2, shard 6, changed |
| `admin-categories-lifecycle.spec.ts` | 48 | 16.0 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 15.3 min | shard 3, shard 7 |
| `post-wizard-where.spec.ts` | 32 | 15.0 min | shard 4, shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 13.4 min | shard 1, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 11.3 min | shard 3, shard 7 |
| `auth-signout.spec.ts` | 44 | 11.1 min | smoke, shard 2, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 10.9 min | shard 3, shard 7 |
| `feed-index.spec.ts` | 28 | 10.8 min | shard 2, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 10.7 min | shard 1, shard 5 |
| `admin-attributes-links.spec.ts` | 30 | 10.3 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 10.0 min | shard 2, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 9.7 min | shard 3, shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 9.5 min | shard 4, shard 8 |
| `posting-routes.spec.ts` | 50 | 9.4 min | shard 4, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 8.9 min | shard 1, shard 5 |
| `admin-users.spec.ts` | 26 | 8.8 min | shard 2, shard 6 |
| `import-security.spec.ts` | 34 | 8.0 min | shard 3, shard 7 |
| `feed-route.spec.ts` | 16 | 7.5 min | shard 2, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 7.0 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 6.6 min | shard 2, shard 6 |
| `admin-attributes-safety.spec.ts` | 14 | 6.6 min | shard 1, shard 5 |
| `admin-shell.spec.ts` | 20 | 6.5 min | shard 2, shard 6, changed |
| `viewing-place.spec.ts` | 22 | 5.6 min | shard 4, shard 8 |
| `admin-audit.spec.ts` | 12 | 4.9 min | shard 1, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.8 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 4.5 min | shard 4, shard 8 |
| `admin-categories-home.spec.ts` | 8 | 3.3 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.9 min | shard 3, shard 7 |
| `post-wizard-removed.spec.ts` | 4 | 2.8 min | shard 4, shard 8 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.4 min | shard 1, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.2 min | shard 3, shard 7 |
| `category-image-routes.spec.ts` | 10 | 1.9 min | shard 2, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.8 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 3, shard 7 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 3, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 3, shard 7 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 4, shard 8 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.5 min | shard 3, shard 8 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 7 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 85.8 s |
| `admin-listings.spec.ts` › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown | mobile-360 | 80.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 71.9 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 67.5 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | mobile-360 | 61.0 s |
| `admin-listings.spec.ts` › AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found | desktop-1280 | 59.5 s |
| `admin-listings.spec.ts` › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing | desktop-1280 | 58.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 57.6 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 56.5 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 56.1 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 55.6 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | mobile-360 | 55.6 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | desktop-1280 | 55.5 s |
| `post-wizard-bundle2.spec.ts` › PW-143 'also my shop or office' saves the place, a new draft opens with it, and unticking clears it (bundle 4 step 18) | mobile-360 | 55.3 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 54.9 s |
