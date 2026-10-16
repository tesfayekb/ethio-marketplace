# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38944549481
- Commit: `64767df277ccd9764819bd7e9a0f8363ec9224dd`
- Attempt: 1
- Written (UTC): 2026-10-16T23:27:52.870Z
- Passed: 1660 · Skipped: 80 · Failed: 2
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 1
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

427 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 328 | full |
| `digest mismatch` (quiet) | 12 | full |
| `too many previews` (quiet) | 10 | full |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `export_failed permission denied` (quiet) | 4 | full |
| `preview_failed permission denied` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `listing not found` | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-ixcx<n>n: e<n>e_par_<n>m<n>i<n> → e<n>e_chi_<n>pi<n>ii` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-y<n>kws<n>: e<n>e_par_<n>xg<n>zb → e<n>e_chi_k<n>qua<n>` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-ixcx<n>n: e<n>e_par_<n>m<n>i<n> → e<n>e_chi_<n>pi<n>ii ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-y<n>kws<n>: e<n>e_par_<n>xg<n>zb → e<n>e_chi_k<n>qua<n> ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 328 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AU-11 own row: no edit form on your own record ×8 · AU-2 search and status filter ×7 · AU-7 crumb: Home > Admin > Users > <name>, Users navigates back ×7 · RP-1 gating: moderator refused, admin sees the list, signed-out deep link redire ×7 · RP-2 create: a super admin creates a custom role through step-up ×7 · SC-16 a reviewer without a fresh second factor cannot decide ×7

```text
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

### listing not found

- Count: 2 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-16T18:05:35.809Z | 3.5 min |
| full | 2026-10-16T18:09:09.357Z | 318.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 22.5 min | full |
| `post-wizard-specs.spec.ts` | 82 | 21.6 min | full |
| `post-wizard-bundle2.spec.ts` | 68 | 17.3 min | full |
| `admin-screening.spec.ts` | 52 | 16.8 min | full |
| `admin-listings.spec.ts` | 60 | 13.2 min | full |
| `post-wizard-place.spec.ts` | 38 | 10.6 min | full |
| `post-wizard-where.spec.ts` | 32 | 10.5 min | full |
| `posting-routes.spec.ts` | 62 | 10.5 min | full |
| `post-wizard-category.spec.ts` | 48 | 10.5 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 10.0 min | full |
| `post-wizard-resets.spec.ts` | 34 | 8.6 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 8.0 min | full |
| `shell.spec.ts` | 168 | 8.0 min | full |
| `admin-translations-governance.spec.ts` | 20 | 7.9 min | full |
| `admin-attributes-library.spec.ts` | 42 | 7.8 min | full |
| `admin-locations.spec.ts` | 38 | 7.1 min | full |
| `admin-translations-console.spec.ts` | 46 | 7.1 min | full |
| `my-listings-ad.spec.ts` | 34 | 6.7 min | full |
| `admin-users.spec.ts` | 28 | 6.6 min | full |
| `admin-categories-console.spec.ts` | 34 | 6.3 min | full |
| `admin-attributes-links.spec.ts` | 32 | 5.8 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 5.8 min | full |
| `admin-roles.spec.ts` | 26 | 5.8 min | full |
| `my-listings-doors.spec.ts` | 28 | 5.6 min | full |
| `viewing-place.spec.ts` | 22 | 5.3 min | full |
| `feed-screens.spec.ts` | 30 | 5.1 min | full |
| `admin-attributes-editor.spec.ts` | 34 | 5.1 min | full |
| `import-security.spec.ts` | 36 | 5.0 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 4.2 min | full |
| `admin-attributes-import.spec.ts` | 40 | 4.2 min | full |
| `auth-signout.spec.ts` | 28 | 3.8 min | full |
| `my-listings-page.spec.ts` | 14 | 3.6 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `feed-index.spec.ts` | 30 | 3.2 min | full |
| `posting-routes-dials.spec.ts` | 18 | 2.8 min | full |
| `admin-countries.spec.ts` | 18 | 2.8 min | full |
| `feed-route.spec.ts` | 22 | 2.5 min | full |
| `admin-audit.spec.ts` | 14 | 2.5 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.5 min | full |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | full |
| `admin-shell.spec.ts` | 10 | 2.2 min | full |
| `post-wizard-details.spec.ts` | 8 | 1.9 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.9 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | full |
| `admin-coverage.spec.ts` | 16 | 1.3 min | full |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.3 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.2 min | full |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `admin-services.spec.ts` | 10 | 0.8 min | full |
| `phone-frame.spec.ts` | 18 | 0.7 min | full |
| `category-image-routes.spec.ts` | 10 | 0.7 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `a11y.spec.ts` | 4 | 0.5 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.5 min | full |
| `settings.spec.ts` | 4 | 0.4 min | full |
| `i18n-coverage.spec.ts` | 8 | 0.4 min | full |
| `rbac.spec.ts` | 6 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.3 min | full |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.3 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 249.1 s |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 204.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 102.4 s |
| `photo-pipeline.spec.ts` › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session | mobile-360 | 56.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 56.4 s |
| `photo-pipeline.spec.ts` › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) | mobile-360 | 55.6 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 50.1 s |
| `admin-screening.spec.ts` › SC-21 Photo changes on live ads: a seller's additions, edit and removal are listed with their warnings and marked reviewed (D154 B5) | mobile-360 | 47.7 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 47.4 s |
| `photo-pipeline.spec.ts` › PP-32 a failed or unsure photo is kept hidden with its review; nudity is refused and stored nowhere (D178, D183) | mobile-360 | 46.5 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 42.3 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | mobile-360 | 42.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 41.8 s |
| `photo-pipeline.spec.ts` › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613) | mobile-360 | 41.3 s |
| `admin-screening.spec.ts` › SC-24 Photos to review: a failed photo on a live ad is listed with its reason, and Allow shows it to buyers (D178) | mobile-360 | 41.2 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38944549481-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 70 (pool 2, fresh 68)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 98 user(s) owned by process 38944549481-nightly
```

## admin-translations-data.spec.ts › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 3
+ Received  + 0

@@ -125,11 +125,10 @@
  make-cars,Make,,single_select,\"{\"\"value\"\": \"\"acura\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Acura\"\"}|{\"\"value\"\": \"\"alfa_romeo\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Alfa Romeo\"\"}|{\"\"value\"\": \"\"aston_martin\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Aston Martin\"\"}|{\"\"value\"\": \"\"audi\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Audi\"\"}|{\"\"value\"\": \"\"baic\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"BAIC\"\"}|{\"\"value\"\": \"\"bajaj\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Bajaj\"\"}|{\"\"value\"\": \"\"bentley\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Bentley\"\"}|{\"\"value\"\": \"\"bmw\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"BMW\"\"}|{\"\"value\"\": \"\"brilliance\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Brilliance\"\"}|{\"\"value\"\": \"\"bugatti\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Bugatti\"\"}|{\"\"value\"\": \"\"buick\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Buick\"\"}|{\"\"value\"\": \"\"byd\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"BYD\"\"}|{\"\"value\"\": \"\"cadillac\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Cadillac\"\"}|{\"\"value\"\": \"\"changan\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Changan\"\"}|{\"\"value\"\": \"\"chery\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Chery\"\"}|{\"\"value\"\": \"\"chevrolet\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Chevrolet\"\"}|{\"\"value\"\": \"\"chrysler\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Chrysler\"\"}|{\"\"value\"\": \"\"citroen\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Citroën\"\"}|{\"\"value\"\": \"\"dacia\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Dacia\"\"}|{\"\"value\"\": \"\"daewoo\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Daewoo\"\"}|{\"\"value\"\": \"\"daihatsu\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Daihatsu\"\"}|{\"\"value\"\": \"\"datsun\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Datsun\"\"}|{\"\"value\"\": \"\"dodge\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Dodge\"\"}|{\"\"value\"\": \"\"dongfeng\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Dongfeng\"\"}|{\"\"value\"\": \"\"faw\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"FAW\"\"}|{\"\"value\"\": \"\"ferrari\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Ferrari\"\"}|{\"\"value\"\": \"\"fiat\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Fiat\"\"}|{\"\"value\"\": \"\"force_motors\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Force Motors\"\"}|{\"\"value\"\": \"\"ford\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Ford\"\"}|{\"\"value\"\": \"\"foton\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Foton\"\"}|{\"\"value\"\": \"\"gac\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"GAC\"\"}|{\"\"value\"\": \"\"geely\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Geely\"\"}|{\"\"value\"\": \"\"genesis\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Genesis\"\"}|{\"\"value\"\": \"\"gmc\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"GMC\"\"}|{\"\"value\"\": \"\"great_wall\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Great Wall\"\"}|{\"\"value\"\": \"\"haval\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Haval\"\"}|{\"\"value\"\": \"\"higer\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Higer\"\"}|{\"\"value\"\": \"\"hillman\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Hillman\"\"}|{\"\"value\"\": \"\"hino\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Hino\"\"}|{\"\"value\"\": \"\"holden\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Holden\"\"}|{\"\"value\"\": \"\"honda\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Honda\"\"}|{\"\"value\"\": \"\"hongqi\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Hongqi\"\"}|{\"\"value\"\": \"\"hummer\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Hummer\"\"}|{\"\"value\"\": \"\"hyundai\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Hyundai\"\"}|{\"\"value\"\": \"\"innoson\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Innoson\"\"}|{\"\"value\"\": \"\"infiniti\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Infiniti\"\"}|{\"\"value\"\": \"\"isuzu\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Isuzu\"\"}|{\"\"value\"\": \"\"iveco\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Iveco\"\"}|{\"\"value\"\": \"\"jac\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"JAC\"\"}|{\"\"value\"\": \"\"jaguar\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Jaguar\"\"}|{\"\"value\"\": \"\"jeep\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Jeep\"\"}|{\"\"value\"\": \"\"jmc\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"JMC\"\"}|{\"\"value\"\": \"\"kia\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Kia\"\"}|{\"\"value\"\": \"\"king_long\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"King Long\"\"}|{\"\"value\"\": \"\"koenigsegg\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Koenigsegg\"\"}|{\"\"value\"\": \"\"lada\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lada\"\"}|{\"\"value\"\": \"\"lamborghini\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lamborghini\"\"}|{\"\"value\"\": \"\"lancia\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lancia\"\"}|{\"\"value\"\": \"\"land_rover\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Land Rover\"\"}|{\"\"value\"\": \"\"lexus\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lexus\"\"}|{\"\"value\"\": \"\"lifan\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lifan\"\"}|{\"\"value\"\": \"\"lincoln\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lincoln\"\"}|{\"\"value\"\": \"\"lotus\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lotus\"\"}|{\"\"value\"\": \"\"mahindra\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mahindra\"\"}|{\"\"value\"\": \"\"man\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"MAN\"\"}|{\"\"value\"\": \"\"maruti_suzuki\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Maruti Suzuki\"\"}|{\"\"value\"\": \"\"maserati\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Maserati\"\"}|{\"\"value\"\": \"\"mazda\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mazda\"\"}|{\"\"value\"\": \"\"mclaren\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"McLaren\"\"}|{\"\"value\"\": \"\"mercedes_benz\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mercedes-Benz\"\"}|{\"\"value\"\": \"\"mercury\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mercury\"\"}|{\"\"value\"\": \"\"mg\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"MG\"\"}|{\"\"value\"\": \"\"mini\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mini\"\"}|{\"\"value\"\": \"\"mitsubishi\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mitsubishi\"\"}|{\"\"value\"\": \"\"morris\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Morris\"\"}|{\"\"value\"\": \"\"nissan\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Nissan\"\"}|{\"\"value\"\": \"\"oldsmobile\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Oldsmobile\"\"}|{\"\"value\"\": \"\"opel\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Opel\"\"}|{\"\"value\"\": \"\"peugeot\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Peugeot\"\"}|{\"\"value\"\": \"\"plymouth\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Plymouth\"\"}|{\"\"value\"\": \"\"pontiac\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Pontiac\"\"}|{\"\"value\"\": \"\"porsche\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Porsche\"\"}|{\"\"value\"\": \"\"proton\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Proton\"\"}|{\"\"value\"\": \"\"ram\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Ram\"\"}|{\"\"value\"\": \"\"renault\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Renault\"\"}|{\"\"value\"\": \"\"rolls_royce\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Rolls-Royce\"\"}|{\"\"value\"\": \"\"rover\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Rover\"\"}|{\"\"value\"\": \"\"saab\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Saab\"\"}|{\"\"value\"\": \"\"samsung\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Samsung\"\"}|{\"\"value\"\": \"\"scion\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Scion\"\"}|{\"\"value\"\": \"\"seat\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Seat\"\"}|{\"\"value\"\": \"\"sinotruk\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Sinotruk\"\"}|{\"\"value\"\": \"\"skoda\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Skoda\"\"}|{\"\"value\"\": \"\"smart\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Smart\"\"}|{\"\"value\"\": \"\"ssangyong\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"SsangYong\"\"}|{\"\"value\"\": \"\"subaru\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Subaru\"\"}|{\"\"value\"\": \"\"suzuki\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Suzuki\"\"}|{\"\"value\"\": \"\"tata\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Tata\"\"}|{\"\"value\"\": \"\"tesla\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Tesla\"\"}|{\"\"value\"\": \"\"toyota\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Toyota\"\"}|{\"\"value\"\": \"\"uaz\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"UAZ\"\"}|{\"\"value\"\": \"\"vauxhall\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Vauxhall\"\"}|{\"\"value\"\": \"\"volkswagen\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Volkswagen\"\"}|{\"\"value\"\": \"\"volvo\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Volvo\"\"}|{\"\"value\"\": \"\"wuling\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Wuling\"\"}|{\"\"value\"\": \"\"yutong\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Yutong\"\"}|{\"\"value\"\": \"\"zhongtong\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Zhongtong\"\"}|{\"\"value\"\": \"\"zotye\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Zotye\"\"}|{\"\"value\"\": \"\"other\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,Select your vehicle manufacturer,,,1,
  make-vehicles,Make,,single_select,\"{\"\"value\"\": \"\"toyota\"\", \"\"label_en\"\": \"\"Toyota\"\"}|{\"\"value\"\": \"\"honda\"\", \"\"label_en\"\": \"\"Honda\"\"}|{\"\"value\"\": \"\"ford\"\", \"\"label_en\"\": \"\"Ford\"\"}|{\"\"value\"\": \"\"chevrolet\"\", \"\"label_en\"\": \"\"Chevrolet\"\"}|{\"\"value\"\": \"\"bmw\"\", \"\"label_en\"\": \"\"BMW\"\"}|{\"\"value\"\": \"\"mercedes\"\", \"\"label_en\"\": \"\"Mercedes-Benz\"\"}|{\"\"value\"\": \"\"audi\"\", \"\"label_en\"\": \"\"Audi\"\"}|{\"\"value\"\": \"\"volkswagen\"\", \"\"label_en\"\": \"\"Volkswagen\"\"}|{\"\"value\"\": \"\"nissan\"\", \"\"label_en\"\": \"\"Nissan\"\"}|{\"\"value\"\": \"\"hyundai\"\", \"\"label_en\"\": \"\"Hyundai\"\"}|{\"\"value\"\": \"\"other\"\", \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,,,,1,
  makeup_type,Product Type,,single_select,\"{\"\"value\"\": \"\"foundation\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Foundation\"\"}|{\"\"value\"\": \"\"concealer\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Concealer\"\"}|{\"\"value\"\": \"\"powder\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Powder\"\"}|{\"\"value\"\": \"\"blush\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Blush\"\"}|{\"\"value\"\": \"\"bronzer\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Bronzer\"\"}|{\"\"value\"\": \"\"highlighter\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Highlighter\"\"}|{\"\"value\"\": \"\"lips\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lipstick/Lip Gloss\"\"}|{\"\"value\"\": \"\"mascara\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mascara\"\"}|{\"\"value\"\": \"\"eyeliner\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Eyeliner\"\"}|{\"\"value\"\": \"\"eyeshadow\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Eyeshadow\"\"}|{\"\"value\"\": \"\"brows\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Brow Products\"\"}|{\"\"value\"\": \"\"tools\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Makeup Tools\"\"}|{\"\"value\"\": \"\"set\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Set/Palette\"\"}\",,,,,,,,,,,,1,
  material,Material,,text,,,,,,,,,,,,,1,
  mens_clothing_type,Clothing Type,,single_select,\"{\"\"value\"\": \"\"shirt\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Shirt\"\"}|{\"\"value\"\": \"\"t-shirt\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"T-Shirt\"\"}|{\"\"value\"\": \"\"pants\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Pants\"\"}|{\"\"value\"\": \"\"jeans\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Jeans\"\"}|{\"\"value\"\": \"\"jacket\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Jacket\"\"}|{\"\"value\"\": \"\"suit\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Suit\"\"}|{\"\"value\"\": \"\"sweater\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Sweater\"\"}|{\"\"value\"\": \"\"shorts\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Shorts\"\"}|{\"\"value\"\": \"\"other\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,,,,1,
- mens_size,Size,,single_select,\"{\"\"value\"\": \"\"xs\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"XS\"\"}|{\"\"value\"\": \"\"s\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"S\"\"}|{\"\"value\"\": \"\"m\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"M\"\"}|{\"\"value\"\": \"\"l\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"L\"\"}|{\"\"value\"\": \"\"xl\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"XL\"\"}|{\"\"value\"\": \"\"xxl\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"XXL\"\"}|{\"\"value\"\": \"\"xxxl\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"XXXL\"\"}\",,,,,,,,,,,,1,
  mileage_km,Mileage (km),,number,,,,,,,,,,,,,1,
  mileage_unit,Mileage Unit,,single_select,\"{\"\"value\"\": \"\"km\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Kilometers (km)\"\"}|{\"\"value\"\": \"\"miles\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Miles (mi)\"\"}\",,,,,,,,,Auto-selected based on your location,,,1,
  mileage_value,Mileage,,number,,,,,,,,,,Total distance traveled,,,1,
  model-cars,Model,,single_select,\"{\"\"value\"\": \"\"other\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,Model will populate based on selected make,,,1,
  model-vehicles,Model,,text,,,,,,,,,,,,,1,
@@ -175,11 +174,10 @@
  service_type-repair-maintenance,Service Type,,single_select,\"{\"\"value\"\": \"\"screen-repair\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Screen Repair\"\"}|{\"\"value\"\": \"\"battery\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Battery Replacement\"\"}|{\"\"value\"\": \"\"water-damage\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Water Damage\"\"}|{\"\"value\"\": \"\"software\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Software Issues\"\"}|{\"\"value\"\": \"\"charging-port\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Charging Port\"\"}|{\"\"value\"\": \"\"speaker-mic\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Speaker/Mic Repair\"\"}|{\"\"value\"\": \"\"unlocking\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Unlocking\"\"}|{\"\"value\"\": \"\"data-recovery\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Data Recovery\"\"}|{\"\"value\"\": \"\"other\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,,,,1,
  service_type-services,Service Type,,single_select,\"{\"\"value\"\": \"\"one_time\"\", \"\"label_en\"\": \"\"One-time\"\"}|{\"\"value\"\": \"\"recurring\"\", \"\"label_en\"\": \"\"Recurring\"\"}|{\"\"value\"\": \"\"project\"\", \"\"label_en\"\": \"\"Project-based\"\"}\",,,,,,,,,,,,1,
  shoe_gender,Gender,,single_select,\"{\"\"value\"\": \"\"men\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Men\"\"}|{\"\"value\"\": \"\"women\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Women\"\"}|{\"\"value\"\": \"\"unisex\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Unisex\"\"}|{\"\"value\"\": \"\"kids\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Kids\"\"}\",,,,,,,,,,,,1,
  shoe_size,Shoe Size,,single_select,\"{\"\"value\"\": \"\"35\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"35\"\"}|{\"\"value\"\": \"\"36\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"36\"\"}|{\"\"value\"\": \"\"37\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"37\"\"}|{\"\"value\"\": \"\"38\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"38\"\"}|{\"\"value\"\": \"\"39\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"39\"\"}|{\"\"value\"\": \"\"40\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"40\"\"}|{\"\"value\"\": \"\"41\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"41\"\"}|{\"\"value\"\": \"\"42\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"42\"\"}|{\"\"value\"\": \"\"43\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"43\"\"}|{\"\"value\"\": \"\"44\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"44\"\"}|{\"\"value\"\": \"\"45\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"45\"\"}|{\"\"value\"\": \"\"46\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"46\"\"}|{\"\"value\"\": \"\"47\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"47+\"\"}\",,,,,,,,,,,,1,
  shoe_type,Shoe Type,,single_select,\"{\"\"value\"\": \"\"sneakers\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Sneakers\"\"}|{\"\"value\"\": \"\"boots\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Boots\"\"}|{\"\"value\"\": \"\"sandals\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Sandals\"\"}|{\"\"value\"\": \"\"heels\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Heels\"\"}|{\"\"value\"\": \"\"loafers\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Loafers\"\"}|{\"\"value\"\": \"\"athletic\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Athletic\"\"}|{\"\"value\"\": \"\"formal\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Formal\"\"}|{\"\"value\"\": \"\"other\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,,,,1,
- size,Size,,single_select,\"{\"\"value\"\": \"\"xs\"\", \"\"label_en\"\": \"\"XS\"\"}|{\"\"value\"\": \"\"s\"\", \"\"label_en\"\": \"\"S\"\"}|{\"\"value\"\": \"\"m\"\", \"\"label_en\"\": \"\"M\"\"}|{\"\"value\"\": \"\"l\"\", \"\"label_en\"\": \"\"L\"\"}|{\"\"value\"\": \"\"xl\"\", \"\"label_en\"\": \"\"XL\"\"}|{\"\"value\"\": \"\"xxl\"\", \"\"label_en\"\": \"\"XXL\"\"}\",,,,,,,,,,,,1,
  size_sqm,Size (sqm),,number,,,,,,,,,,,,,1,
  skin_type,Skin Type,,single_select,\"{\"\"value\"\": \"\"all\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"All Skin Types\"\"}|{\"\"value\"\": \"\"oily\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Oily\"\"}|{\"\"value\"\": \"\"dry\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Dry\"\"}|{\"\"value\"\": \"\"combination\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Combination\"\"}|{\"\"value\"\": \"\"sensitive\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Sensitive\"\"}|{\"\"value\"\": \"\"normal\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Normal\"\"}\",,,,,,,,,,,,1,
  skincare_type,Product Type,,single_select,\"{\"\"value\"\": \"\"cleanser\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Cleanser\"\"}|{\"\"value\"\": \"\"moisturizer\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Moisturizer\"\"}|{\"\"value\"\": \"\"serum\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Serum\"\"}|{\"\"value\"\": \"\"toner\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Toner\"\"}|{\"\"value\"\": \"\"sunscreen\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Sunscreen\"\"}|{\"\"value\"\": \"\"mask\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Face Mask\"\"}|{\"\"value\"\": \"\"eye-cream\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Eye Cream\"\"}|{\"\"value\"\": \"\"exfoliator\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Exfoliator\"\"}|{\"\"value\"\": \"\"acne\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Acne Treatment\"\"}|{\"\"value\"\": \"\"anti-aging\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Anti-Aging\"\"}|{\"\"value\"\": \"\"set\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Set/Kit\"\"}\",,,,,,,,,,,,1,
  sport,Sport,,single_select,\"{\"\"value\"\": \"\"running\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Running\"\"}|{\"\"value\"\": \"\"cycling\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Cycling\"\"}|{\"\"value\"\": \"\"swimming\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Swimming\"\"}|{\"\"value\"\": \"\"basketball\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Basketball\"\"}|{\"\"value\"\": \"\"soccer\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Soccer\"\"}|{\"\"value\"\": \"\"tennis\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Tennis\"\"}|{\"\"value\"\": \"\"golf\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Golf\"\"}|{\"\"value\"\": \"\"fitness\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Fitness\"\"}|{\"\"value\"\": \"\"other\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,,,,1,
  sport_type,Sport,,single_select,\"{\"\"value\"\": \"\"football\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Football\"\"}|{\"\"value\"\": \"\"basketball\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Basketball\"\"}|{\"\"value\"\": \"\"tennis\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Tennis\"\"}|{\"\"value\"\": \"\"golf\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Golf\"\"}|{\"\"value\"\": \"\"swimming\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Swimming\"\"}|{\"\"value\"\": \"\"cycling\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Cycling\"\"}|{\"\"value\"\": \"\"running\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Running\"\"}|{\"\"value\"\": \"\"yoga\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Yoga\"\"}|{\"\"value\"\": \"\"other\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,,,,1,
@@ -199,11 +197,10 @@
  utilities_available,Utilities Available,,boolean,,,,,,,,,,Are water and electricity available?,,,1,
  warranty,Warranty,,boolean,,,,,,,,,,,,,2,
  water_type,Water Type,,single_select,\"{\"\"value\"\": \"\"freshwater\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Freshwater\"\"}|{\"\"value\"\": \"\"saltwater\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Saltwater\"\"}|{\"\"value\"\": \"\"brackish\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Brackish\"\"}\",,,,,,,,,,,,1,
  weight_capacity,Weight Capacity,,single_select,\"{\"\"value\"\": \"\"100kg\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Up to 100 kg\"\"}|{\"\"value\"\": \"\"150kg\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Up to 150 kg\"\"}|{\"\"value\"\": \"\"200kg\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Up to 200 kg\"\"}|{\"\"value\"\": \"\"200plus\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"200+ kg\"\"}\",,,,,,,,,Maximum user weight supported,,,1,
  womens_clothing_type,Clothing Type,,single_select,\"{\"\"value\"\": \"\"dress\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Dress\"\"}|{\"\"value\"\": \"\"top\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Top\"\"}|{\"\"value\"\": \"\"blouse\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Blouse\"\"}|{\"\"value\"\": \"\"pants\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Pants\"\"}|{\"\"value\"\": \"\"skirt\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Skirt\"\"}|{\"\"value\"\": \"\"jacket\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Jacket\"\"}|{\"\"value\"\": \"\"sweater\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Sweater\"\"}|{\"\"value\"\": \"\"other\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,,,,1,
- womens_size,Size,,single_select,\"{\"\"value\"\": \"\"xs\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"XS\"\"}|{\"\"value\"\": \"\"s\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"S\"\"}|{\"\"value\"\": \"\"m\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"M\"\"}|{\"\"value\"\": \"\"l\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"L\"\"}|{\"\"value\"\": \"\"xl\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"XL\"\"}|{\"\"value\"\": \"\"xxl\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"XXL\"\"}|{\"\"value\"\": \"\"plus-size\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Plus Size\"\"}\",,,,,,,,,,,,1,
  year,Year,,number,,,,,,,,,,,,,1,
  year_built,Year Built,,number,,,,,,,,,,Year the house was constructed,,,1,
  zoning,Zoning / Land Use,,single_select,\"{\"\"value\"\": \"\"residential\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Residential\"\"}|{\"\"value\"\": \"\"commercial\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Commercial\"\"}|{\"\"value\"\": \"\"agricultural\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Agricultural\"\"}|{\"\"value\"\": \"\"industrial\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Industrial\"\"}|{\"\"value\"\": \"\"mixed-use\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mixed Use\"\"}|{\"\"value\"\": \"\"recreational\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Recreational\"\"}\",,,,,,,,,What is the land zoned for?,,,1,
  ",
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 3
+ Received  + 0

@@ -125,11 +125,10 @@
  make-cars,Make,,single_select,\"{\"\"value\"\": \"\"acura\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Acura\"\"}|{\"\"value\"\": \"\"alfa_romeo\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Alfa Romeo\"\"}|{\"\"value\"\": \"\"aston_martin\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Aston Martin\"\"}|{\"\"value\"\": \"\"audi\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Audi\"\"}|{\"\"value\"\": \"\"baic\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"BAIC\"\"}|{\"\"value\"\": \"\"bajaj\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Bajaj\"\"}|{\"\"value\"\": \"\"bentley\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Bentley\"\"}|{\"\"value\"\": \"\"bmw\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"BMW\"\"}|{\"\"value\"\": \"\"brilliance\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Brilliance\"\"}|{\"\"value\"\": \"\"bugatti\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Bugatti\"\"}|{\"\"value\"\": \"\"buick\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Buick\"\"}|{\"\"value\"\": \"\"byd\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"BYD\"\"}|{\"\"value\"\": \"\"cadillac\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Cadillac\"\"}|{\"\"value\"\": \"\"changan\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Changan\"\"}|{\"\"value\"\": \"\"chery\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Chery\"\"}|{\"\"value\"\": \"\"chevrolet\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Chevrolet\"\"}|{\"\"value\"\": \"\"chrysler\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Chrysler\"\"}|{\"\"value\"\": \"\"citroen\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Citroën\"\"}|{\"\"value\"\": \"\"dacia\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Dacia\"\"}|{\"\"value\"\": \"\"daewoo\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Daewoo\"\"}|{\"\"value\"\": \"\"daihatsu\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Daihatsu\"\"}|{\"\"value\"\": \"\"datsun\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Datsun\"\"}|{\"\"value\"\": \"\"dodge\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Dodge\"\"}|{\"\"value\"\": \"\"dongfeng\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Dongfeng\"\"}|{\"\"value\"\": \"\"faw\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"FAW\"\"}|{\"\"value\"\": \"\"ferrari\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Ferrari\"\"}|{\"\"value\"\": \"\"fiat\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Fiat\"\"}|{\"\"value\"\": \"\"force_motors\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Force Motors\"\"}|{\"\"value\"\": \"\"ford\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Ford\"\"}|{\"\"value\"\": \"\"foton\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Foton\"\"}|{\"\"value\"\": \"\"gac\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"GAC\"\"}|{\"\"value\"\": \"\"geely\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Geely\"\"}|{\"\"value\"\": \"\"genesis\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Genesis\"\"}|{\"\"value\"\": \"\"gmc\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"GMC\"\"}|{\"\"value\"\": \"\"great_wall\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Great Wall\"\"}|{\"\"value\"\": \"\"haval\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Haval\"\"}|{\"\"value\"\": \"\"higer\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Higer\"\"}|{\"\"value\"\": \"\"hillman\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Hillman\"\"}|{\"\"value\"\": \"\"hino\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Hino\"\"}|{\"\"value\"\": \"\"holden\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Holden\"\"}|{\"\"value\"\": \"\"honda\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Honda\"\"}|{\"\"value\"\": \"\"hongqi\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Hongqi\"\"}|{\"\"value\"\": \"\"hummer\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Hummer\"\"}|{\"\"value\"\": \"\"hyundai\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Hyundai\"\"}|{\"\"value\"\": \"\"innoson\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Innoson\"\"}|{\"\"value\"\": \"\"infiniti\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Infiniti\"\"}|{\"\"value\"\": \"\"isuzu\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Isuzu\"\"}|{\"\"value\"\": \"\"iveco\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Iveco\"\"}|{\"\"value\"\": \"\"jac\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"JAC\"\"}|{\"\"value\"\": \"\"jaguar\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Jaguar\"\"}|{\"\"value\"\": \"\"jeep\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Jeep\"\"}|{\"\"value\"\": \"\"jmc\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"JMC\"\"}|{\"\"value\"\": \"\"kia\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Kia\"\"}|{\"\"value\"\": \"\"king_long\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"King Long\"\"}|{\"\"value\"\": \"\"koenigsegg\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Koenigsegg\"\"}|{\"\"value\"\": \"\"lada\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lada\"\"}|{\"\"value\"\": \"\"lamborghini\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lamborghini\"\"}|{\"\"value\"\": \"\"lancia\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lancia\"\"}|{\"\"value\"\": \"\"land_rover\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Land Rover\"\"}|{\"\"value\"\": \"\"lexus\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lexus\"\"}|{\"\"value\"\": \"\"lifan\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lifan\"\"}|{\"\"value\"\": \"\"lincoln\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lincoln\"\"}|{\"\"value\"\": \"\"lotus\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lotus\"\"}|{\"\"value\"\": \"\"mahindra\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mahindra\"\"}|{\"\"value\"\": \"\"man\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"MAN\"\"}|{\"\"value\"\": \"\"maruti_suzuki\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Maruti Suzuki\"\"}|{\"\"value\"\": \"\"maserati\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Maserati\"\"}|{\"\"value\"\": \"\"mazda\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mazda\"\"}|{\"\"value\"\": \"\"mclaren\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"McLaren\"\"}|{\"\"value\"\": \"\"mercedes_benz\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mercedes-Benz\"\"}|{\"\"value\"\": \"\"mercury\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mercury\"\"}|{\"\"value\"\": \"\"mg\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"MG\"\"}|{\"\"value\"\": \"\"mini\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mini\"\"}|{\"\"value\"\": \"\"mitsubishi\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mitsubishi\"\"}|{\"\"value\"\": \"\"morris\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Morris\"\"}|{\"\"value\"\": \"\"nissan\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Nissan\"\"}|{\"\"value\"\": \"\"oldsmobile\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Oldsmobile\"\"}|{\"\"value\"\": \"\"opel\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Opel\"\"}|{\"\"value\"\": \"\"peugeot\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Peugeot\"\"}|{\"\"value\"\": \"\"plymouth\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Plymouth\"\"}|{\"\"value\"\": \"\"pontiac\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Pontiac\"\"}|{\"\"value\"\": \"\"porsche\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Porsche\"\"}|{\"\"value\"\": \"\"proton\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Proton\"\"}|{\"\"value\"\": \"\"ram\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Ram\"\"}|{\"\"value\"\": \"\"renault\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Renault\"\"}|{\"\"value\"\": \"\"rolls_royce\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Rolls-Royce\"\"}|{\"\"value\"\": \"\"rover\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Rover\"\"}|{\"\"value\"\": \"\"saab\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Saab\"\"}|{\"\"value\"\": \"\"samsung\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Samsung\"\"}|{\"\"value\"\": \"\"scion\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Scion\"\"}|{\"\"value\"\": \"\"seat\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Seat\"\"}|{\"\"value\"\": \"\"sinotruk\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Sinotruk\"\"}|{\"\"value\"\": \"\"skoda\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Skoda\"\"}|{\"\"value\"\": \"\"smart\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Smart\"\"}|{\"\"value\"\": \"\"ssangyong\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"SsangYong\"\"}|{\"\"value\"\": \"\"subaru\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Subaru\"\"}|{\"\"value\"\": \"\"suzuki\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Suzuki\"\"}|{\"\"value\"\": \"\"tata\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Tata\"\"}|{\"\"value\"\": \"\"tesla\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Tesla\"\"}|{\"\"value\"\": \"\"toyota\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Toyota\"\"}|{\"\"value\"\": \"\"uaz\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"UAZ\"\"}|{\"\"value\"\": \"\"vauxhall\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Vauxhall\"\"}|{\"\"value\"\": \"\"volkswagen\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Volkswagen\"\"}|{\"\"value\"\": \"\"volvo\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Volvo\"\"}|{\"\"value\"\": \"\"wuling\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Wuling\"\"}|{\"\"value\"\": \"\"yutong\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Yutong\"\"}|{\"\"value\"\": \"\"zhongtong\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Zhongtong\"\"}|{\"\"value\"\": \"\"zotye\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Zotye\"\"}|{\"\"value\"\": \"\"other\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,Select your vehicle manufacturer,,,1,
  make-vehicles,Make,,single_select,\"{\"\"value\"\": \"\"toyota\"\", \"\"label_en\"\": \"\"Toyota\"\"}|{\"\"value\"\": \"\"honda\"\", \"\"label_en\"\": \"\"Honda\"\"}|{\"\"value\"\": \"\"ford\"\", \"\"label_en\"\": \"\"Ford\"\"}|{\"\"value\"\": \"\"chevrolet\"\", \"\"label_en\"\": \"\"Chevrolet\"\"}|{\"\"value\"\": \"\"bmw\"\", \"\"label_en\"\": \"\"BMW\"\"}|{\"\"value\"\": \"\"mercedes\"\", \"\"label_en\"\": \"\"Mercedes-Benz\"\"}|{\"\"value\"\": \"\"audi\"\", \"\"label_en\"\": \"\"Audi\"\"}|{\"\"value\"\": \"\"volkswagen\"\", \"\"label_en\"\": \"\"Volkswagen\"\"}|{\"\"value\"\": \"\"nissan\"\", \"\"label_en\"\": \"\"Nissan\"\"}|{\"\"value\"\": \"\"hyundai\"\", \"\"label_en\"\": \"\"Hyundai\"\"}|{\"\"value\"\": \"\"other\"\", \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,,,,1,
  makeup_type,Product Type,,single_select,\"{\"\"value\"\": \"\"foundation\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Foundation\"\"}|{\"\"value\"\": \"\"concealer\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Concealer\"\"}|{\"\"value\"\": \"\"powder\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Powder\"\"}|{\"\"value\"\": \"\"blush\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Blush\"\"}|{\"\"value\"\": \"\"bronzer\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Bronzer\"\"}|{\"\"value\"\": \"\"highlighter\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Highlighter\"\"}|{\"\"value\"\": \"\"lips\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Lipstick/Lip Gloss\"\"}|{\"\"value\"\": \"\"mascara\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Mascara\"\"}|{\"\"value\"\": \"\"eyeliner\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Eyeliner\"\"}|{\"\"value\"\": \"\"eyeshadow\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Eyeshadow\"\"}|{\"\"value\"\": \"\"brows\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Brow Products\"\"}|{\"\"value\"\": \"\"tools\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Makeup Tools\"\"}|{\"\"value\"\": \"\"set\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Set/Palette\"\"}\",,,,,,,,,,,,1,
  material,Material,,text,,,,,,,,,,,,,1,
  mens_clothing_type,Clothing Type,,single_select,\"{\"\"value\"\": \"\"shirt\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Shirt\"\"}|{\"\"value\"\": \"\"t-shirt\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"T-Shirt\"\"}|{\"\"value\"\": \"\"pants\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Pants\"\"}|{\"\"value\"\": \"\"jeans\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Jeans\"\"}|{\"\"value\"\": \"\"jacket\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Jacket\"\"}|{\"\"value\"\": \"\"suit\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Suit\"\"}|{\"\"value\"\": \"\"sweater\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Sweater\"\"}|{\"\"value\"\": \"\"shorts\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Shorts\"\"}|{\"\"value\"\": \"\"other\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,,,,1,
- mens_size,Size,,single_select,\"{\"\"value\"\": \"\"xs\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"XS\"\"}|{\"\"value\"\": \"\"s\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"S\"\"}|{\"\"value\"\": \"\"m\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"M\"\"}|{\"\"value\"\": \"\"l\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"L\"\"}|{\"\"value\"\": \"\"xl\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"XL\"\"}|{\"\"value\"\": \"\"xxl\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"XXL\"\"}|{\"\"value\"\": \"\"xxxl\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"XXXL\"\"}\",,,,,,,,,,,,1,
  mileage_km,Mileage (km),,number,,,,,,,,,,,,,1,
  mileage_unit,Mileage Unit,,single_select,\"{\"\"value\"\": \"\"km\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Kilometers (km)\"\"}|{\"\"value\"\": \"\"miles\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Miles (mi)\"\"}\",,,,,,,,,Auto-selected based on your location,,,1,
  mileage_value,Mileage,,number,,,,,,,,,,Total distance traveled,,,1,
  model-cars,Model,,single_select,\"{\"\"value\"\": \"\"other\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,Model will populate based on selected make,,,1,
  model-vehicles,Model,,text,,,,,,,,,,,,,1,
@@ -175,11 +174,10 @@
  service_type-repair-maintenance,Service Type,,single_select,\"{\"\"value\"\": \"\"screen-repair\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Screen Repair\"\"}|{\"\"value\"\": \"\"battery\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Battery Replacement\"\"}|{\"\"value\"\": \"\"water-damage\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Water Damage\"\"}|{\"\"value\"\": \"\"software\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Software Issues\"\"}|{\"\"value\"\": \"\"charging-port\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Charging Port\"\"}|{\"\"value\"\": \"\"speaker-mic\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Speaker/Mic Repair\"\"}|{\"\"value\"\": \"\"unlocking\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Unlocking\"\"}|{\"\"value\"\": \"\"data-recovery\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Data Recovery\"\"}|{\"\"value\"\": \"\"other\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Other\"\"}\",,,,,,,,,,,,1,
  service_type-services,Service Type,,single_select,\"{\"\"value\"\": \"\"one_time\"\", \"\"label_en\"\": \"\"One-time\"\"}|{\"\"value\"\": \"\"recurring\"\", \"\"label_en\"\": \"\"Recurring\"\"}|{\"\"value\"\": \"\"project\"\", \"\"label_en\"\": \"\"Project-based\"\"}\",,,,,,,,,,,,1,
```

Context:

```text
          - listitem [ref=e320]:
            - generic [ref=e321]: About
          - listitem [ref=e322]:
            - generic [ref=e323]: How it works
      - navigation "Help" [ref=e324]:
        - heading "Help" [level=2] [ref=e325]
        - list [ref=e326]:
          - listitem [ref=e327]:
            - generic [ref=e328]: Safety
          - listitem [ref=e329]:
            - generic [ref=e330]: Contact
      - navigation "Legal" [ref=e331]:
        - heading "Legal" [level=2] [ref=e332]
        - list [ref=e333]:
          - listitem [ref=e334]:
            - generic [ref=e335]: Terms
          - listitem [ref=e336]:
            - generic [ref=e337]: Privacy
    - paragraph [ref=e339]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('strings-pseudo-summary')
Expected: visible
Timeout: 240000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 240000ms
  - waiting for getByTestId('strings-pseudo-summary')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('strings-pseudo-summary')
Expected: visible
Timeout: 240000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 240000ms
  - waiting for getByTestId('strings-pseudo-summary')


  1291 |       await page.getByTestId("pseudo-generate-confirm-action").click();
  1292 |       await stepUpIfPrompted(page, secret);
> 1293 |       await expect(page.getByTestId("strings-pseudo-summary")).toBeVisible({ timeout: 240_000 });
       |                                                                ^
  1294 |       await expect(page.getByTestId("strings-pseudo-error")).toHaveCount(0);
  1295 |
  1296 |       const { data: baseRow, error: baseError } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-governance.spec.ts:1293:64
```

Context:

```text
          - listitem [ref=e919]:
            - generic [ref=e920]: About
          - listitem [ref=e921]:
            - generic [ref=e922]: How it works
      - navigation "Help" [ref=e923]:
        - heading "Help" [level=2] [ref=e924]
        - list [ref=e925]:
          - listitem [ref=e926]:
            - generic [ref=e927]: Safety
          - listitem [ref=e928]:
            - generic [ref=e929]: Contact
      - navigation "Legal" [ref=e930]:
        - heading "Legal" [level=2] [ref=e931]
        - list [ref=e932]:
          - listitem [ref=e933]:
            - generic [ref=e934]: Terms
          - listitem [ref=e935]:
            - generic [ref=e936]: Privacy
    - paragraph [ref=e938]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/media/photo-links HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/listings/alias HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/i18n/am HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/alias HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/geo/reverse HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/i18n/am HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×6
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
