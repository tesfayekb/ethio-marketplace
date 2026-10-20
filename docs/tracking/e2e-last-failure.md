# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39380756495
- Commit: `cf1dc2ed8fc702943c5595bbe61a6db1b6651761`
- Attempt: 1
- Written (UTC): 2026-10-20T07:48:20.681Z
- Passed: 2304 · Skipped: 214 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › FV-1 one device favourite leads every main list and survives reload — Error: FV-1 electronics level in the menu and the strip
- FLAKY (passed on retry) · `mobile-360` · source `changed` · shell.spec.ts › FV-1 one device favourite leads every main list and survives reload — Error: FV-1 the strip's favourite row as tall as the menu's

## Flaky bodies (DEC-078)

### shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: FV-1 electronics level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    1.671875

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: FV-1 electronics level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    1.671875

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  3853 |         .toBeLessThanOrEqual(1);
  3854 |       for (const mainSlug of mainSlugs) {
> 3855 |         await expect
       |         ^
  3856 |           .poll(
  3857 |             () =>
  3858 |               gapY(
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3855:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3875:3
```

Context:

```text
          - listitem [ref=e426]:
            - generic [ref=e427]: About
          - listitem [ref=e428]:
            - generic [ref=e429]: Contact
      - navigation "Help" [ref=e430]:
        - heading "Help" [level=2] [ref=e431]
        - list [ref=e432]:
          - listitem [ref=e433]:
            - generic [ref=e434]: Safety
      - navigation "Legal" [ref=e435]:
        - heading "Legal" [level=2] [ref=e436]
        - list [ref=e437]:
          - listitem [ref=e438]:
            - link "Terms" [ref=e439] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e440]:
            - link "Privacy" [ref=e441] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e443]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `changed`
- Project: `mobile-360`

```text
Error: FV-1 the strip's favourite row as tall as the menu's

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    2.3125

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: FV-1 the strip's favourite row as tall as the menu's

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    2.3125

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  3847 |         })
  3848 |         .toBeLessThanOrEqual(1);
> 3849 |       await expect
       |       ^
  3850 |         .poll(() => gapHeight(stripRow, row), {
  3851 |           message: "FV-1 the strip's favourite row as tall as the menu's",
  3852 |         })
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3849:7)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3871:3
```

Context:

```text
          - listitem [ref=e426]:
            - generic [ref=e427]: About
          - listitem [ref=e428]:
            - generic [ref=e429]: Contact
      - navigation "Help" [ref=e430]:
        - heading "Help" [level=2] [ref=e431]
        - list [ref=e432]:
          - listitem [ref=e433]:
            - generic [ref=e434]: Safety
      - navigation "Legal" [ref=e435]:
        - heading "Legal" [level=2] [ref=e436]
        - list [ref=e437]:
          - listitem [ref=e438]:
            - link "Terms" [ref=e439] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e440]:
            - link "Privacy" [ref=e441] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e443]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

110 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-gdxaan: e<n>e_par_o<n>z<n>b → e<n>e_chi_tavvyv` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nb<n>tad: e<n>e_par_epyl<n>o → e<n>e_chi_k<n>v<n>r<n>` (quiet) | 1 | shard 4 |
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-gdxaan: e<n>e_par_o<n>z<n>b → e<n>e_chi_tavvyv ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nb<n>tad: e<n>e_par_epyl<n>o → e<n>e_chi_k<n>v<n>r<n> ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · category rows carry DISTINCT icons, not one repeated glyph ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-35 the seller card links to the seller's page; the page lists his live ads an ×1 · AT-51 the bounds picker offers a co-linked number and withholds one linked nowhe ×1

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-20T06:57:50.454Z | 22.2 min |
| email | 2026-10-20T06:58:03.123Z | 0.4 min |
| shard 1 | 2026-10-20T06:57:44.323Z | 42.4 min |
| shard 2 | 2026-10-20T06:57:59.058Z | 48.6 min |
| shard 3 | 2026-10-20T06:57:46.722Z | 34.2 min |
| shard 4 | 2026-10-20T06:57:47.758Z | 46.3 min |
| shard 5 | 2026-10-20T06:57:54.468Z | 50.0 min |
| shard 6 | 2026-10-20T06:57:52.251Z | 41.8 min |
| changed | 2026-10-20T06:57:49.522Z | 13.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 636 | 40.3 min | smoke, shard 3, shard 6, changed |
| `ad-page.spec.ts` | 68 | 27.0 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 25.1 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.7 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 19.3 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 18.1 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 17.2 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 17.0 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 80 | 16.5 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 15.9 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 36 | 14.7 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 14.1 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 14.0 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.6 min | shard 3, shard 6 |
| `ad-page-doors.spec.ts` | 30 | 13.1 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.7 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 56 | 12.4 min | shard 2, shard 5, changed |
| `admin-screening.spec.ts` | 52 | 12.3 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.2 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 28 | 10.6 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.2 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 9.2 min | shard 2, shard 5 |
| `legal-certify.spec.ts` | 26 | 9.1 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 9.0 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.7 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.5 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 32 | 8.1 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.4 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 7.2 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 16 | 7.2 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.4 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.3 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.0 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `legal-accept.spec.ts` | 16 | 4.1 min | shard 2, shard 5, changed |
| `admin-audit.spec.ts` | 14 | 3.6 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.5 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.5 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.9 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 2.5 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 12 | 2.1 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `legal-history.spec.ts` | 6 | 1.5 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.4 min | shard 1, shard 4 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.2 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 52.7 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 52.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 51.0 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 50.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 49.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 49.0 s |
| `post-wizard-place.spec.ts` › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city | desktop-1280 | 48.8 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 48.7 s |
| `legal-admin.spec.ts` › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail | desktop-1280 | 48.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 48.6 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 48.5 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | desktop-1280 | 48.3 s |
| `legal-admin.spec.ts` › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail | mobile-360 | 47.7 s |
| `legal-admin.spec.ts` › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail | desktop-1280 | 47.3 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 47.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39380756495-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39380756495-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39380756495-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39380756495-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39380756495-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39380756495-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39380756495-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39380756495-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39380756495-changed
```

## legal-admin.spec.ts › Admin Legal › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"

  558 |     const csv = await readFile(path, "utf8");
  559 |     const lines = csv.split("\n").filter((line) => line.trim() !== "");
> 560 |     expect(lines[0]).toBe(
      |                      ^
  561 |       "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent",
  562 |     );
  563 |     expect(lines.length).toBe(3);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:560:22
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"

  558 |     const csv = await readFile(path, "utf8");
  559 |     const lines = csv.split("\n").filter((line) => line.trim() !== "");
> 560 |     expect(lines[0]).toBe(
      |                      ^
  561 |       "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent",
  562 |     );
  563 |     expect(lines.length).toBe(3);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:560:22
```

Context:

```text
          - listitem [ref=e374]:
            - generic [ref=e375]: About
          - listitem [ref=e376]:
            - generic [ref=e377]: Contact
      - navigation "Help" [ref=e378]:
        - heading "Help" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - generic [ref=e382]: Safety
      - navigation "Legal" [ref=e383]:
        - heading "Legal" [level=2] [ref=e384]
        - list [ref=e385]:
          - listitem [ref=e386]:
            - link "Terms" [ref=e387] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e388]:
            - link "Privacy" [ref=e389] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e391]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"

  558 |     const csv = await readFile(path, "utf8");
  559 |     const lines = csv.split("\n").filter((line) => line.trim() !== "");
> 560 |     expect(lines[0]).toBe(
      |                      ^
  561 |       "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent",
  562 |     );
  563 |     expect(lines.length).toBe(3);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:560:22
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"
Received: "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent"

  558 |     const csv = await readFile(path, "utf8");
  559 |     const lines = csv.split("\n").filter((line) => line.trim() !== "");
> 560 |     expect(lines[0]).toBe(
      |                      ^
  561 |       "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent",
  562 |     );
  563 |     expect(lines.length).toBe(3);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:560:22
```

Context:

```text
          - listitem [ref=e374]:
            - generic [ref=e375]: About
          - listitem [ref=e376]:
            - generic [ref=e377]: Contact
      - navigation "Help" [ref=e378]:
        - heading "Help" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - generic [ref=e382]: Safety
      - navigation "Legal" [ref=e383]:
        - heading "Legal" [level=2] [ref=e384]
        - list [ref=e385]:
          - listitem [ref=e386]:
            - link "Terms" [ref=e387] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e388]:
            - link "Privacy" [ref=e389] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e391]: © 2026 ethio.com — All rights reserved.
```
```

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

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
