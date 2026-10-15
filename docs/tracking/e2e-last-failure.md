# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38757461634
- Commit: `2ce54b24bfc9a885f4b07f0566be08f16881eea5`
- Attempt: 1
- Written (UTC): 2026-10-15T15:48:30.391Z
- Passed: 1765 · Skipped: 126 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-7 transfer: the markets file round-trips through the header's Import and the undo puts it back — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row — Error: [e2e:l2c] seeding XP failed: duplicate key value violates unique constraint "countries_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-7 transfer: the markets file round-trips through the header's Import and the undo puts it back

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: undefined
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: undefined

  400 |       await stepUpIfPrompted(page, secret);
  401 |       await expect(page.getByTestId("country-import-applied")).toBeVisible({ timeout: 20000 });
> 402 |       expect((await readCountry(code))?.is_active).toBe(false);
      |                                                    ^
  403 |
  404 |       // THE UNDO PUTS IT BACK (INC-206): the market created by this batch was
  405 |       // born with its anchor place, and the undo now takes BOTH away, so the
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:402:52
```

Context:

```text
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import countries" [ref=e2]:
    - heading "Import countries" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import countries
      - paragraph [ref=e6]: "A file is written whole or not at all: one refused row stops the entire import."
      - paragraph [ref=e7]: Start from a download so the columns match. Read-only columns are never applied.
      - status [ref=e8]: 1 added · 0 changed · 0 retired · 0 reactivated · 0 deleted · 0 unchanged · 0 refused
      - status [ref=e9]: Import applied — 1 changes written
      - generic [ref=e10]:
        - button "Undo last import" [ref=e11] [cursor=pointer]
        - button "Close" [ref=e12] [cursor=pointer]
    - button "Close" [ref=e13] [cursor=pointer]:
      - img [ref=e14]
      - generic [ref=e17]: Close
```
```

### admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:l2c] seeding XP failed: duplicate key value violates unique constraint "countries_pkey"
--- further error 1 ---
Error: [e2e:l2c] seeding XP failed: duplicate key value violates unique constraint "countries_pkey"

   at helpers/countries.ts:72

  70 |       display_order: 0,
  71 |     });
> 72 |   if (error) throw new Error(`[e2e:l2c] seeding ${code} failed: ${error.message}`);
     |                    ^
  73 | }
  74 |
  75 | /** The roster keeps cards through `lg`, exactly as the places roster does. */
    at seedCountry (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/countries.ts:72:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:261:7
```

Context:

```text
          - listitem [ref=e327]:
            - generic [ref=e328]: About
          - listitem [ref=e329]:
            - generic [ref=e330]: How it works
      - navigation "Help" [ref=e331]:
        - heading "Help" [level=2] [ref=e332]
        - list [ref=e333]:
          - listitem [ref=e334]:
            - generic [ref=e335]: Safety
          - listitem [ref=e336]:
            - generic [ref=e337]: Contact
      - navigation "Legal" [ref=e338]:
        - heading "Legal" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: Terms
          - listitem [ref=e343]:
            - generic [ref=e344]: Privacy
    - paragraph [ref=e346]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:mlp] coverage failed: insert or update on table "listing_locations" violates foreign key constraint "listing_locations_listing_id_fkey"

  223 |       .from("listing_locations")
  224 |       .insert({ listing_id: id, location_id: seller.cityId, position: 1 });
> 225 |     if (located.error) throw new Error(`[e2e:mlp] coverage failed: ${located.error.message}`);
      |                              ^
  226 |     return id;
  227 |   }
  228 |
    at seed (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:225:30)
    at seedBoth (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:244:15)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:271:15
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-1-my_listings-the-seller-s-own-ads-in-six-groups-newest-change-first-with-their-counts-nobody-else-s-desktop-1280` — Playwright's name `my-listings-page-MY-LISTIN-3e815--their-counts-nobody-else-s-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

106 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 3 | shard 3, shard 6 |
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
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 2 | shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>amyeu: e<n>e_par_q<n>vm<n> → e<n>e_chi_jh<n>otl` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-b<n>oin: e<n>e_par_xfauqp → e<n>e_chi_<n>myg<n>` (quiet) | 1 | shard 1 |
| `upstream returned an HTML error page (<n>)` | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>amyeu: e<n>e_par_q<n>vm<n> → e<n>e_chi_jh<n>otl ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-b<n>oin: e<n>e_par_xfauqp → e<n>e_chi_<n>myg<n> ×1

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1 · Sign out is in the account menu at the top right @private-identity ×1 · tablets get the persistent rail and the FULL controls ×1 · the rail sign-out is absent for a logged-out visitor ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 2 · Sources: shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): ML-13 copy_my_listing: a new draft with the ad's details and places, without pho ×2 · ML-14 edit_my_listing: places and contact apply at once, the first place the ad' ×2

```text
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

### upstream returned an HTML error page (<n>)

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): FS-12 on a phone three cards share a row and the invitation is the size of a car ×1 · IG-2 locations-locations: dangerous cells refuse their own row and name the reas ×1

```text
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (502)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-15T15:08:25.832Z | 15.5 min |
| email | 2026-10-15T15:08:23.903Z | 0.2 min |
| shard 1 | 2026-10-15T15:08:32.277Z | 38.4 min |
| shard 2 | 2026-10-15T15:08:33.172Z | 39.5 min |
| shard 3 | 2026-10-15T15:08:30.318Z | 32.7 min |
| shard 4 | 2026-10-15T15:08:21.161Z | 36.2 min |
| shard 5 | 2026-10-15T15:08:22.865Z | 39.4 min |
| shard 6 | 2026-10-15T15:08:27.864Z | 29.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 24.5 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 24.1 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 20.4 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 19.2 min | smoke, shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 30 | 18.8 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 17.1 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 15.2 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 14.8 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.6 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 50 | 14.1 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 60 | 12.0 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 11.9 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 11.3 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.0 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 10.7 min | shard 3, shard 5 |
| `feed-screens.spec.ts` | 30 | 10.4 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 10.3 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.0 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.6 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 8.4 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.9 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.7 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.3 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.0 min | shard 3, shard 6 |
| `import-security.spec.ts` | 36 | 6.9 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 6.6 min | shard 1, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.4 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.1 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.3 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.8 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.7 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.1 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 145.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once; typed directions go to review; the boxes in the posting form's order (D187) | mobile-360 | 140.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once; typed directions go to review; the boxes in the posting form's order (D187) | desktop-1280 | 140.5 s |
| `admin-screening.spec.ts` › SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188) | desktop-1280 | 72.2 s |
| `admin-screening.spec.ts` › SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188) | mobile-360 | 69.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 67.0 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 66.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 65.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 58.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 58.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 56.1 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 54.7 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 53.9 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 51.9 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 51.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38757461634-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38757461634-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38757461634-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38757461634-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38757461634-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38757461634-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 1 (by method: GET 1; by code: ECONNRESET 1; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38757461634-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38757461634-6
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('admin-screening-edit-done')
Expected: "Saved. The seller is told what changed: Title."
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('admin-screening-edit-done')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('admin-screening-edit-done')
Expected: "Saved. The seller is told what changed: Title."
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('admin-screening-edit-done')


  1396 |     await stepUpIfPrompted(page, secret);
  1397 |
> 1398 |     await expect(sheet.getByTestId("admin-screening-edit-done")).toHaveText(
       |                                                                  ^
  1399 |       en["admin.listings.edit.done"].replace("{fields}", en["admin.listings.col.title"]),
  1400 |       { timeout: 20000 },
  1401 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:1398:66
```

Context:

```text
              - generic [ref=e398]:
                - generic [ref=e399]: Reason
                - group "Reason" [ref=e400]:
                  - button "Misleading details" [pressed] [ref=e401] [cursor=pointer]:
                    - img [ref=e402]
                    - generic [ref=e404]: Misleading details
                  - button "Contact details in the text" [ref=e405] [cursor=pointer]:
                    - generic [ref=e406]: Contact details in the text
                  - button "The site's rules" [ref=e407] [cursor=pointer]:
                    - generic [ref=e408]: The site's rules
                  - button "Other" [ref=e409] [cursor=pointer]:
                    - generic [ref=e410]: Other
              - generic [ref=e411]:
                - generic [ref=e412]: Note for the seller
                - textbox "Note for the seller" [ref=e413]: e2e SC-25 title corrected
                - paragraph [ref=e414]: Required when the reason is Other; at most 500 characters.
            - generic [ref=e415]:
              - button "Save changes" [ref=e416] [cursor=pointer]
              - button "Cancel" [ref=e417] [cursor=pointer]
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once; typed directions go to review; the boxes in the posting form's order (D187)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('listing-edit-place-box').getByTestId('post-where-add-region')


  1113 |       await expect(place.getByTestId("post-where-city")).toHaveValue(A.cityId, { timeout: 15000 });
  1114 |       // C2 sits in a region of its own: its row comes with a region box first.
> 1115 |       await place.getByTestId("post-where-add-region").click();
       |                                                        ^
  1116 |       await place.getByTestId("post-where-row-region").selectOption(second.region.id as string);
  1117 |       await place.getByTestId("post-where-row-city").selectOption(second.city.id as string);
  1118 |       await expect(place.getByTestId("post-where-row-city")).toHaveValue(second.city.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1115:56
```

Context:

```text
          - listitem [ref=e389]:
            - generic [ref=e390]: About
          - listitem [ref=e391]:
            - generic [ref=e392]: How it works
      - navigation "Help" [ref=e393]:
        - heading "Help" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - generic [ref=e397]: Safety
          - listitem [ref=e398]:
            - generic [ref=e399]: Contact
      - navigation "Legal" [ref=e400]:
        - heading "Legal" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Terms
          - listitem [ref=e405]:
            - generic [ref=e406]: Privacy
    - paragraph [ref=e408]: © 2026 ethio.com — All rights reserved.
```
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

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-14-edit_my_listing-places-and-contact-apply-at-once-the-first-place-the-ad-s-own-the-written-directions-go-to-review-D187-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-d27e2-rections-go-to-review-D187--mobile-360`; this run carried 10 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('admin-screening-edit-done')
Expected: "Saved. The seller is told what changed: Title."
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('admin-screening-edit-done')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('admin-screening-edit-done')
Expected: "Saved. The seller is told what changed: Title."
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('admin-screening-edit-done')


  1396 |     await stepUpIfPrompted(page, secret);
  1397 |
> 1398 |     await expect(sheet.getByTestId("admin-screening-edit-done")).toHaveText(
       |                                                                  ^
  1399 |       en["admin.listings.edit.done"].replace("{fields}", en["admin.listings.col.title"]),
  1400 |       { timeout: 20000 },
  1401 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:1398:66
```

Context:

```text
              - generic [ref=e427]:
                - generic [ref=e428]: Reason
                - group "Reason" [ref=e429]:
                  - button "Misleading details" [pressed] [ref=e430] [cursor=pointer]:
                    - img [ref=e431]
                    - generic [ref=e433]: Misleading details
                  - button "Contact details in the text" [ref=e434] [cursor=pointer]:
                    - generic [ref=e435]: Contact details in the text
                  - button "The site's rules" [ref=e436] [cursor=pointer]:
                    - generic [ref=e437]: The site's rules
                  - button "Other" [ref=e438] [cursor=pointer]:
                    - generic [ref=e439]: Other
              - generic [ref=e440]:
                - generic [ref=e441]: Note for the seller
                - textbox "Note for the seller" [ref=e442]: e2e SC-25 title corrected
                - paragraph [ref=e443]: Required when the reason is Other; at most 500 characters.
            - generic [ref=e444]:
              - button "Save changes" [ref=e445] [cursor=pointer]
              - button "Cancel" [ref=e446] [cursor=pointer]
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once; typed directions go to review; the boxes in the posting form's order (D187)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('listing-edit-place-box').getByTestId('post-where-add-region')


  1113 |       await expect(place.getByTestId("post-where-city")).toHaveValue(A.cityId, { timeout: 15000 });
  1114 |       // C2 sits in a region of its own: its row comes with a region box first.
> 1115 |       await place.getByTestId("post-where-add-region").click();
       |                                                        ^
  1116 |       await place.getByTestId("post-where-row-region").selectOption(second.region.id as string);
  1117 |       await place.getByTestId("post-where-row-city").selectOption(second.city.id as string);
  1118 |       await expect(place.getByTestId("post-where-row-city")).toHaveValue(second.city.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1115:56
```

Context:

```text
          - listitem [ref=e422]:
            - generic [ref=e423]: About
          - listitem [ref=e424]:
            - generic [ref=e425]: How it works
      - navigation "Help" [ref=e426]:
        - heading "Help" [level=2] [ref=e427]
        - list [ref=e428]:
          - listitem [ref=e429]:
            - generic [ref=e430]: Safety
          - listitem [ref=e431]:
            - generic [ref=e432]: Contact
      - navigation "Legal" [ref=e433]:
        - heading "Legal" [level=2] [ref=e434]
        - list [ref=e435]:
          - listitem [ref=e436]:
            - generic [ref=e437]: Terms
          - listitem [ref=e438]:
            - generic [ref=e439]: Privacy
    - paragraph [ref=e441]: © 2026 ethio.com — All rights reserved.
```
```

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

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-14-edit_my_listing-places-and-contact-apply-at-once-the-first-place-the-ad-s-own-the-written-directions-go-to-review-D187-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-d27e2-rections-go-to-review-D187--desktop-1280`; this run carried 10 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-b46oin: e2e_par_xfauqp → e2e_chi_8myg24
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
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
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (502)
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-7ri5gqE5.js:34181:25) at http://127.0.0.1:4173/assets/index-7ri5gqE5.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-7ri5gqE5.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-7ri5gqE5.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-7ri5gqE5.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-7ri5gqE5.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-7ri5gqE5.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-7ri5gqE5.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-7ri5gqE5.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-7ri5gqE5.js:6025:5) ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-0amyeu: e2e_par_q3vm44 → e2e_chi_jh7otl
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway) ×2
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/i18n/en ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/locations ((body unavailable))
```
