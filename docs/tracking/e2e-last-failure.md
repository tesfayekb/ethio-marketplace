# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38187451874 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38187451874
- Commit: `3c94ec650fd4d858a0e9af297b571c36c9d95b4a`
- Attempt: 1
- Written (UTC): 2026-10-12T00:52:08.330Z
- Post-test warnings: 30
- Flaky (passed on retry, DEC-030, non-gating): 4

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · post-wizard-category.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-39 recent categories are caller-only published leaves in count/date/id order — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1525 |       const mark = calls.length;
  1526 |       await page.getByTestId("post-next").click();
> 1527 |       await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
       |                                                     ^
  1528 |       expect(calls.length - mark, `PW-144: pass ${pass} with nothing changed called identity`).toBe(
  1529 |         0,
  1530 |       );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1527:53
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-144-leaving-the-contact-step-makes-one-identity-call-or-none-when-nothing-changed-mobile-360`

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:reap] location 39bd7f9d-fdf5-4168-9eae-3c8b53582622 failed: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"

   at helpers/locations.ts:277

  275 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  276 |     if (deleted.error)
> 277 |       throw new Error(`[e2e:reap] location ${id} failed: ${deleted.error.message}`);
      |             ^
  278 |   }
  279 | }
  280 |
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:277:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:196:43
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-24-Edit-refuses-a-reviewer-listings-view-and-review-not-enforce-and-writes-nothing-desktop-1280`

### post-wizard-category.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review

- Source: `shard 7`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: reachStep7: the region level never rendered

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-region')
Expected: visible
Error: element(s) not found

Call log:
  - reachStep7: the region level never rendered with timeout 10000ms
  - waiting for getByTestId('post-where-region')


  964 |     await waitForTreeSlug(page, "ET", city.slug);
  965 |     const region = page.getByTestId("post-where-region");
> 966 |     await expect(region, "reachStep7: the region level never rendered").toBeVisible();
      |                                                                         ^
  967 |     // The city's own region is whichever one carries it: the cascade is walked,
  968 |     // not guessed, by selecting each region until the city appears.
  969 |     const values = await region
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-48-a-catch-all-leaf-can-be-chosen-and-its-listing-lands-in-review-desktop-1280`

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-39 recent categories are caller-only published leaves in count/date/id order

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 4
+ Received  + 0

@@ -1,12 +1,8 @@
  Object {
    "categories": Array [
      Object {
-       "ads": 2,
-       "id": "2bf088ca-ff25-405b-8659-87b812727266",
-     },
-     Object {
        "ads": 1,
        "id": "1e0783ad-fcbc-4350-8f8c-d392047585d1",
      },
      Object {
        "ads": 1,

  679 |     const result = await rpc(page, "my_recent_categories");
```

Context:

```text
          - listitem [ref=e364]:
            - generic [ref=e365]: About
          - listitem [ref=e366]:
            - generic [ref=e367]: How it works
      - navigation "Help" [ref=e368]:
        - heading "Help" [level=2] [ref=e369]
        - list [ref=e370]:
          - listitem [ref=e371]:
            - generic [ref=e372]: Safety
          - listitem [ref=e373]:
            - generic [ref=e374]: Contact
      - navigation "Legal" [ref=e375]:
        - heading "Legal" [level=2] [ref=e376]
        - list [ref=e377]:
          - listitem [ref=e378]:
            - generic [ref=e379]: Terms
          - listitem [ref=e380]:
            - generic [ref=e381]: Privacy
    - paragraph [ref=e383]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8 · unavailable: none

109 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `listing not found` | 9 | shard 3, shard 4, shard 7, shard 8 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rxt<n>qf: e<n>e_par_<n>sw<n> → e<n>e_chi_vz<n>n<n>p` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-t<n>tj<n>: e<n>e_par_h<n>yew → e<n>e_chi_s<n>yvov` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rxt<n>qf: e<n>e_par_<n>sw<n> → e<n>e_chi_vz<n>n<n>p ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-t<n>tj<n>: e<n>e_par_h<n>yew → e<n>e_chi_s<n>yvov ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 4, shard 7, shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-12T00:19:11.424Z | 20.4 min |
| email | 2026-10-12T00:18:59.855Z | 0.3 min |
| shard 1 | 2026-10-12T00:18:56.802Z | 27.9 min |
| shard 2 | 2026-10-12T00:18:57.714Z | 30.4 min |
| shard 3 | 2026-10-12T00:18:55.008Z | 32.4 min |
| shard 4 | 2026-10-12T00:18:52.214Z | 32.8 min |
| shard 5 | 2026-10-12T00:18:53.899Z | 31.3 min |
| shard 6 | 2026-10-12T00:19:00.343Z | 24.9 min |
| shard 7 | 2026-10-12T00:19:02.207Z | 32.8 min |
| shard 8 | 2026-10-12T00:18:52.975Z | 31.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 32.6 min | shard 4, shard 8 |
| `post-wizard-bundle2.spec.ts` | 66 | 31.5 min | shard 3, shard 7 |
| `admin-listings.spec.ts` | 50 | 28.5 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 22.2 min | smoke, shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 20.6 min | shard 3, shard 7 |
| `admin-categories-lifecycle.spec.ts` | 50 | 19.6 min | shard 1, shard 5 |
| `admin-screening.spec.ts` | 30 | 18.1 min | shard 2, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 17.2 min | shard 4, shard 8 |
| `feed-screens.spec.ts` | 28 | 15.7 min | shard 3, shard 7 |
| `post-wizard-where.spec.ts` | 32 | 14.8 min | shard 4, shard 8 |
| `posting-routes.spec.ts` | 50 | 14.3 min | shard 4, shard 8 |
| `post-wizard-place.spec.ts` | 38 | 14.3 min | shard 3, shard 7 |
| `post-wizard-pricing.spec.ts` | 50 | 14.1 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 14.0 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 13.0 min | shard 4, shard 8 |
| `auth-signout.spec.ts` | 44 | 12.2 min | smoke, shard 2, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 12.0 min | shard 1, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 10.9 min | shard 1, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 10.4 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 10.4 min | shard 2, shard 6 |
| `admin-users.spec.ts` | 26 | 9.9 min | shard 2, shard 6 |
| `feed-index.spec.ts` | 28 | 9.8 min | shard 2, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 9.3 min | shard 3, shard 7 |
| `admin-translations-console.spec.ts` | 42 | 9.0 min | shard 2, shard 6 |
| `import-security.spec.ts` | 34 | 8.2 min | shard 3, shard 7 |
| `admin-attributes-editor.spec.ts` | 34 | 8.0 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 7.1 min | shard 2, shard 6 |
| `admin-attributes-safety.spec.ts` | 14 | 6.5 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 16 | 6.4 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 4, shard 8 |
| `admin-audit.spec.ts` | 12 | 5.4 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 5.2 min | shard 4, shard 8 |
| `admin-countries.spec.ts` | 18 | 4.8 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 4.5 min | shard 3, shard 7 |
| `admin-categories-home.spec.ts` | 8 | 3.6 min | shard 1, shard 5 |
| `admin-shell.spec.ts` | 10 | 3.4 min | shard 2, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 3.4 min | shard 2, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 3.4 min | shard 2, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.9 min | shard 3, shard 7 |
| `post-wizard-removed.spec.ts` | 4 | 2.9 min | shard 4, shard 8 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.4 min | shard 1, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.8 min | shard 2, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 4, shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 4, shard 8 |
| `i18n-coverage.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `a11y.spec.ts` | 4 | 1.0 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 3, shard 7 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 4, shard 8 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.8 min | shard 3, shard 7 |
| `settings.spec.ts` | 4 | 0.8 min | shard 4 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 4, shard 8 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 7 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 149.0 s |
| `post-wizard-category.spec.ts` › PW-48 a catch-all leaf can be chosen and its listing lands in review | desktop-1280 | 125.1 s |
| `admin-listings.spec.ts` › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing | desktop-1280 | 121.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 120.6 s |
| `post-wizard-bundle2.spec.ts` › PW-144 leaving the contact step makes one identity call, or none when nothing changed | mobile-360 | 96.5 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 74.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 71.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 68.0 s |
| `admin-listings.spec.ts` › AL-25 Edit refuses an enforcer without a second factor, and writes nothing | mobile-360 | 65.9 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 65.0 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 64.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 63.8 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | mobile-360 | 63.3 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 62.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 59.7 s |
