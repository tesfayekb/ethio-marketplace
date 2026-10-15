# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38740417438
- Commit: `27ff9a4ce6449f169a1ddf9bc7b0872a2fd4a35b`
- Attempt: 1
- Written (UTC): 2026-10-15T14:17:38.455Z
- Passed: 1767 · Skipped: 126 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-links.spec.ts › C3 attributes console › AT-61 the import dialog previews and confirms a links-only file — Error: [e2e:reap] translations of e2e_attr_boeefo failed: <html>

## Flaky bodies (DEC-078)

### admin-attributes-links.spec.ts › C3 attributes console › AT-61 the import dialog previews and confirms a links-only file

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:reap] translations of e2e_attr_boeefo failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:reap] translations of e2e_attr_boeefo failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at helpers/admin-attributes.ts:125

  123 |   // INC-383 — every step checks its error; a failed reap is loud.
  124 |   const fail = (step: string, error: { message: string } | null) => {
> 125 |     if (error) throw new Error(`[e2e:reap] ${step} of ${key} failed: ${error.message}`);
      |                      ^
  126 |   };
  127 |   const links = await adminClient()
  128 |     .from("category_attribute_links")
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/admin-attributes.ts:125:22)
    at destroyAttribute (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/admin-attributes.ts:139:3)
```

Context:

```text
          - listitem [ref=e1241]:
            - generic [ref=e1242]: About
          - listitem [ref=e1243]:
            - generic [ref=e1244]: How it works
      - navigation "Help" [ref=e1245]:
        - heading "Help" [level=2] [ref=e1246]
        - list [ref=e1247]:
          - listitem [ref=e1248]:
            - generic [ref=e1249]: Safety
          - listitem [ref=e1250]:
            - generic [ref=e1251]: Contact
      - navigation "Legal" [ref=e1252]:
        - heading "Legal" [level=2] [ref=e1253]
        - list [ref=e1254]:
          - listitem [ref=e1255]:
            - generic [ref=e1256]: Terms
          - listitem [ref=e1257]:
            - generic [ref=e1258]: Privacy
    - paragraph [ref=e1260]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

106 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qwoyub: e<n>e_par_gkq<n> → e<n>e_chi_on<n>k<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-t<n>owu: e<n>e_par_tspup<n> → e<n>e_chi_sw<n>za<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qwoyub: e<n>e_par_gkq<n> → e<n>e_chi_on<n>k<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-t<n>owu: e<n>e_par_tspup<n> → e<n>e_chi_sw<n>za<n> ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · location row is present on Marketplace and absent on Account ×1 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PW-100 every category offers the map; after Save the preview shows the pin ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-136 a product type that allows only some units narrows the unit list on the p ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-15T13:37:20.492Z | 14.9 min |
| email | 2026-10-15T13:37:26.865Z | 0.4 min |
| shard 1 | 2026-10-15T13:37:16.002Z | 37.1 min |
| shard 2 | 2026-10-15T13:37:25.528Z | 35.7 min |
| shard 3 | 2026-10-15T13:37:23.995Z | 33.6 min |
| shard 4 | 2026-10-15T13:37:16.604Z | 33.9 min |
| shard 5 | 2026-10-15T13:37:31.511Z | 36.5 min |
| shard 6 | 2026-10-15T13:37:21.729Z | 28.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 26.0 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 23.6 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 20.7 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 19.4 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.9 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 15.5 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 14.6 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.7 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 48 | 13.1 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 60 | 12.5 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 11.3 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 11.1 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.1 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 28 | 10.7 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 10.2 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 10.2 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.0 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 8.8 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.7 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 30 | 8.5 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 8.5 min | smoke, shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 8.0 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 7.6 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.8 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.7 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 6.7 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.5 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 30 | 6.2 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 6.2 min | shard 1, shard 5 |
| `admin-roles.spec.ts` | 26 | 6.1 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 5.9 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 5.8 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.2 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.6 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.0 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.0 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 2.0 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.2 min | email |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-links.spec.ts` › AT-61 the import dialog previews and confirms a links-only file | desktop-1280 | 134.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 68.2 s |
| `my-listings-doors.spec.ts` › ML-14 edit_my_listing: places and contact apply at once, the first place the ad's own; the written directions go to review (D187) | mobile-360 | 64.4 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 62.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 59.8 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 58.7 s |
| `admin-listings.spec.ts` › AL-11 All listings page with listings:view and no other listing right: the public name, never the e-mail, no moves | mobile-360 | 54.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 52.4 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 51.9 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | mobile-360 | 51.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 49.8 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 48.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 48.7 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 47.9 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | mobile-360 | 46.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38740417438-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38740417438-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38740417438-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38740417438-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38740417438-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38740417438-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38740417438-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38740417438-6
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-14 edit_my_listing: places and contact apply at once, the first place the ad's own; the written directions go to review (D187)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toMatchObject(expected)

- Expected  -  2
+ Received  + 13

  Object {
-   "review": false,
-   "status": "active",
+   "ok": false,
+   "refusals": Array [
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:city",
+     },
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:region",
+     },
+   ],
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  -  2
+ Received  + 13

  Object {
-   "review": false,
-   "status": "active",
+   "ok": false,
+   "refusals": Array [
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:city",
+     },
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:region",
+     },
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-14-edit_my_listing-places-and-contact-apply-at-once-the-first-place-the-ad-s-own-the-written-directions-go-to-review-D187-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-d27e2-rections-go-to-review-D187--mobile-360`; this run carried 1 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-14 edit_my_listing: places and contact apply at once, the first place the ad's own; the written directions go to review (D187)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toMatchObject(expected)

- Expected  -  2
+ Received  + 13

  Object {
-   "review": false,
-   "status": "active",
+   "ok": false,
+   "refusals": Array [
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:city",
+     },
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:region",
+     },
+   ],
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  -  2
+ Received  + 13

  Object {
-   "review": false,
-   "status": "active",
+   "ok": false,
+   "refusals": Array [
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:city",
+     },
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:region",
+     },
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-14-edit_my_listing-places-and-contact-apply-at-once-the-first-place-the-ad-s-own-the-written-directions-go-to-review-D187-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-d27e2-rections-go-to-review-D187--desktop-1280`; this run carried 1 context file(s); of the same spec: none

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).
