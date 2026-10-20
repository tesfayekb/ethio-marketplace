# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39361286095 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39361286095
- Commit: `42c88cdf0aef385f57d63842293b19d713a5734c`
- Attempt: 1
- Written (UTC): 2026-10-20T04:17:49.811Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width — Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eylovqeqyasvjpkplijiqqmnusexfrfqqobmnndkrshiyqrv","furthestElement":"breadcrumb-ad","crumbHeight":20}

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eylovqeqyasvjpkplijiqqmnusexfrfqqobmnndkrshiyqrv","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eylovqeqyasvjpkplijiqqmnusexfrfqqobmnndkrshiyqrv","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context:

```text
          - listitem [ref=e436]:
            - generic [ref=e437]: About
          - listitem [ref=e438]:
            - generic [ref=e439]: Contact
      - navigation "Help" [ref=e440]:
        - heading "Help" [level=2] [ref=e441]
        - list [ref=e442]:
          - listitem [ref=e443]:
            - generic [ref=e444]: Safety
      - navigation "Legal" [ref=e445]:
        - heading "Legal" [level=2] [ref=e446]
        - list [ref=e447]:
          - listitem [ref=e448]:
            - link "Terms" [ref=e449] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e450]:
            - link "Privacy" [ref=e451] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e453]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

111 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>nbbeo: e<n>e_par_zqtnk<n> → e<n>e_chi_bpwsu<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>yk<n>g<n>: e<n>e_par_kh<n>tru → e<n>e_chi_re<n>mm<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>nbbeo: e<n>e_par_zqtnk<n> → e<n>e_chi_bpwsu<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>yk<n>g<n>: e<n>e_par_kh<n>tru → e<n>e_chi_re<n>mm<n> ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-177 a question removed while the form is open never blocks the next edits ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · exactly one collapse toggle, and the wordmark moves into the bar when collapsed ×1

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
| smoke | 2026-10-20T03:25:44.760Z | 22.1 min |
| email | 2026-10-20T03:25:40.562Z | 0.3 min |
| shard 1 | 2026-10-20T03:25:47.573Z | 42.8 min |
| shard 2 | 2026-10-20T03:25:45.435Z | 48.2 min |
| shard 3 | 2026-10-20T03:25:40.716Z | 40.8 min |
| shard 4 | 2026-10-20T03:25:42.470Z | 46.0 min |
| shard 5 | 2026-10-20T03:25:49.559Z | 51.6 min |
| shard 6 | 2026-10-20T03:25:39.387Z | 35.8 min |
| changed | 2026-10-20T03:25:47.533Z | 18.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 136 | 65.0 min | shard 1, shard 4, changed |
| `post-wizard-specs.spec.ts` | 82 | 26.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 424 | 26.5 min | smoke, shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.7 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 19.2 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 18.7 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 80 | 17.3 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 16.8 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 70 | 16.6 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 36 | 16.1 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 16.1 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 14.8 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 14.7 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 14.3 min | smoke, shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.3 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 12.8 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 12.1 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.9 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.4 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 10.3 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 10.1 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 9.7 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 9.4 min | shard 2, shard 5 |
| `legal-certify.spec.ts` | 26 | 9.3 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 9.1 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.0 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.3 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 8.3 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.3 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 7.6 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.2 min | shard 1, shard 4 |
| `legal-doors.spec.ts` | 28 | 6.7 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.5 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 5.9 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 5.9 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.5 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 16 | 3.4 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 3.1 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.9 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.6 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.6 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.6 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `legal-accept.spec.ts` | 8 | 2.3 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 12 | 1.9 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `legal-history.spec.ts` | 6 | 1.3 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.3 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 14 | 1.3 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.8 min | shard 3 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `ad-page.spec.ts` › AP-41 the page's remaining lines | mobile-360 | 79.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 57.0 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 54.3 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 53.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 52.7 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 51.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 51.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 51.3 s |
| `ad-page.spec.ts` › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad | desktop-1280 | 50.6 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 50.5 s |
| `ad-page.spec.ts` › AP-40 an address never reveals: only the visitor's own tap does (D201 §14) | desktop-1280 | 50.3 s |
| `ad-page.spec.ts` › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart | mobile-360 | 50.2 s |
| `ad-page.spec.ts` › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart | desktop-1280 | 49.9 s |
| `ad-page.spec.ts` › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad | mobile-360 | 49.9 s |
| `ad-page.spec.ts` › AP-40 an address never reveals: only the visitor's own tap does (D201 §14) | mobile-360 | 49.5 s |
