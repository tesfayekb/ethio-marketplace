# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38956429995 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38956429995
- Commit: `130dee63d39c6ffa34b3f0b4f09c0f88d706a549`
- Attempt: 1
- Written (UTC): 2026-10-16T20:23:39.928Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-22 step 8: attribute tables leave the browser; categories still read — Error: apiRequestContext.get: socket hang up

## Flaky bodies (DEC-078)

### posting-routes.spec.ts › POSTING ROUTES › PR-22 step 8: attribute tables leave the browser; categories still read

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: apiRequestContext.get: socket hang up
Call log:
  - → GET https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/attributes?select=id&limit=1
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - apikey: [redacted-jwt]
    - Content-Type: application/json

--- further error 1 ---
Error: apiRequestContext.get: socket hang up
Call log:
  - → GET https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/attributes?select=id&limit=1
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - apikey: [redacted-jwt]
    - Content-Type: application/json


  881 |     const response =
  882 |       options.body === undefined
> 883 |         ? await page.request.get(`${url}/rest/v1/${path}`, { headers })
      |                              ^
  884 |         : await page.request.post(`${url}/rest/v1/${path}`, { headers, data: options.body });
  885 |     const body: unknown = await response.json().catch(() => null);
  886 |     const code =
    at rest (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:883:30)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:973:26
```

Context:

```text
          - listitem [ref=e256]:
            - generic [ref=e257]: About
          - listitem [ref=e258]:
            - generic [ref=e259]: How it works
      - navigation "Help" [ref=e260]:
        - heading "Help" [level=2] [ref=e261]
        - list [ref=e262]:
          - listitem [ref=e263]:
            - generic [ref=e264]: Safety
          - listitem [ref=e265]:
            - generic [ref=e266]: Contact
      - navigation "Legal" [ref=e267]:
        - heading "Legal" [level=2] [ref=e268]
        - list [ref=e269]:
          - listitem [ref=e270]:
            - generic [ref=e271]: Terms
          - listitem [ref=e272]:
            - generic [ref=e273]: Privacy
    - paragraph [ref=e275]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

112 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 12 | shard 3, shard 6, changed |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>bbix: e<n>e_par_f<n>drg → e<n>e_chi_dk<n>z<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-gv<n>bg<n>: e<n>e_par_drvry<n> → e<n>e_chi_cmewox` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>bbix: e<n>e_par_f<n>drg → e<n>e_chi_dk<n>z<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-gv<n>bg<n>: e<n>e_par_drvry<n> → e<n>e_chi_cmewox ×1

Off the allowlist:

### listing not found

- Count: 12 · Sources: shard 3, shard 6, changed
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×3 · admin tables never overflow horizontally ×1 · mounts with header, rail slot and footer, logged out ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-16T19:40:01.389Z | 17.8 min |
| email | 2026-10-16T19:39:58.268Z | 0.2 min |
| shard 1 | 2026-10-16T19:39:57.532Z | 38.7 min |
| shard 2 | 2026-10-16T19:40:03.504Z | 37.6 min |
| shard 3 | 2026-10-16T19:40:03.951Z | 36.7 min |
| shard 4 | 2026-10-16T19:40:09.764Z | 41.3 min |
| shard 5 | 2026-10-16T19:40:08.085Z | 43.2 min |
| shard 6 | 2026-10-16T19:40:05.471Z | 36.9 min |
| changed | 2026-10-16T19:40:00.859Z | 16.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `posting-routes.spec.ts` | 128 | 30.4 min | shard 3, shard 6, changed |
| `photo-pipeline.spec.ts` | 66 | 26.5 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 26.4 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 96 | 23.6 min | shard 2, shard 5, changed |
| `admin-listings.spec.ts` | 60 | 22.4 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 20.1 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 20.1 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.2 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 17.9 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 16.1 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 15.6 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.8 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.7 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 13.7 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 13.6 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 12.6 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.7 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 30 | 11.6 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.8 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 9.6 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.9 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 8.8 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.7 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 8.3 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 8.0 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 7.9 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 7.6 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 7.3 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.8 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.6 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 6.2 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.1 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.6 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 2, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 2.5 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 2.0 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 63.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 62.3 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 57.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 56.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 52.6 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 51.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 48.8 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 47.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.0 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | desktop-1280 | 46.0 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 45.7 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | desktop-1280 | 45.5 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | desktop-1280 | 45.3 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 44.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 44.5 s |
