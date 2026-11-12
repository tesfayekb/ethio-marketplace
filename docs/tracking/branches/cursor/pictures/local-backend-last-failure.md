# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43319295611
- Commit: `a0c67164fecd68deb1d6fe45d666f428cce8f405`
- Attempt: 1
- Repeat: 38 of 1430 tests repeated — specs directly changed 3/14, importers of a changed helper 0/99; budget 720 s; the time cap left 6 test runs
- Written (UTC): 2026-11-12T23:01:19.082Z
- Passed: 2816 · Skipped: 426 · Failed: 38
- Gating failures: 38 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): repeat (2)

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `webkit-1280` · source `webkit` · layout.spec.ts › LY-3 wizard actions are sticky only below md — Error: page.goto: Navigation to "http://127.0.0.1:4173/post" is interrupted by another navigation to "http://127.0.0.1:4173/"
- FLAKY (passed on retry) · `webkit-1280` · source `webkit` · layout.spec.ts › LY-4 wizard aside is desktop-only — Error: page.goto: Navigation to "http://127.0.0.1:4173/post" is interrupted by another navigation to "http://127.0.0.1:4173/"

## Flaky bodies (DEC-078)

### layout.spec.ts › LY-3 wizard actions are sticky only below md

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: page.goto: Navigation to "http://127.0.0.1:4173/post" is interrupted by another navigation to "http://127.0.0.1:4173/"
Call log:
  - navigating to "http://127.0.0.1:4173/post", waiting until "load"

--- further error 1 ---
Error: page.goto: Navigation to "http://127.0.0.1:4173/post" is interrupted by another navigation to "http://127.0.0.1:4173/"
Call log:
  - navigating to "http://127.0.0.1:4173/post", waiting until "load"


   at helpers/ui.ts:304

  302 |
  303 | export async function gotoReady(page: Page, path: string) {
> 304 |   await page.goto(path);
      |              ^
  305 |   await assertSsrHealthy(page);
  306 |   await waitForHydration(page);
  307 |   await assertNoStringifiedLeak(page, `gotoReady(${path})`);
    at gotoReady (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:304:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/layout.spec.ts:61:9
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Unacceptable TLS certificate
[client-error] pageerror: 
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: Unacceptable TLS certificate
[client-error] pageerror: 
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: Unacceptable TLS certificate
[client-error] pageerror: 
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: Unacceptable TLS certificate
[client-error] pageerror: 
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: Unacceptable TLS certificate
[client-error] pageerror: 
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: [client-error] legal gate read failed
[client-error] console.error: Unacceptable TLS certificate
[client-error] pageerror: 
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: Failed to preconnect to https://127.0.0.1:31321/. Error: Unacceptable TLS certificate
```

Context:

```text
          - listitem [ref=e153]:
            - generic [ref=e154]: About
          - listitem [ref=e155]:
            - generic [ref=e156]: Contact
      - navigation "Help" [ref=e157]:
        - heading "Help" [level=2] [ref=e158]
        - list [ref=e159]:
          - listitem [ref=e160]:
            - generic [ref=e161]: Safety
      - navigation "Legal" [ref=e162]:
        - heading "Legal" [level=2] [ref=e163]
        - list [ref=e164]:
          - listitem [ref=e165]:
            - link "Terms" [ref=e166]:
              - /url: /terms
          - listitem [ref=e167]:
            - link "Privacy" [ref=e168]:
              - /url: /privacy
    - paragraph [ref=e170]: © 2026 ethio.com — All rights reserved.
```
```

### layout.spec.ts › LY-4 wizard aside is desktop-only

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: page.goto: Navigation to "http://127.0.0.1:4173/post" is interrupted by another navigation to "http://127.0.0.1:4173/"
Call log:
  - navigating to "http://127.0.0.1:4173/post", waiting until "load"

--- further error 1 ---
Error: page.goto: Navigation to "http://127.0.0.1:4173/post" is interrupted by another navigation to "http://127.0.0.1:4173/"
Call log:
  - navigating to "http://127.0.0.1:4173/post", waiting until "load"


   at helpers/ui.ts:304

  302 |
  303 | export async function gotoReady(page: Page, path: string) {
> 304 |   await page.goto(path);
      |              ^
  305 |   await assertSsrHealthy(page);
  306 |   await waitForHydration(page);
  307 |   await assertNoStringifiedLeak(page, `gotoReady(${path})`);
    at gotoReady (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:304:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/layout.spec.ts:70:9
--- client errors of this attempt (DEC-177) ---
[client-error] pageerror: 
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: Unacceptable TLS certificate
[client-error] pageerror: 
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: Unacceptable TLS certificate
[client-error] pageerror: 
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: Unacceptable TLS certificate
[client-error] pageerror: 
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: Unacceptable TLS certificate
[client-error] pageerror: 
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: Unacceptable TLS certificate
[client-error] pageerror: 
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: [client-error] legal gate read failed
[client-error] pageerror: Fetch API cannot load https://127.0.0.1:31321/rest/v1/profiles?select=preferred_language&user_id=eq.[account id] due to access control checks. at fetch ([native code]:0:0)
[client-error] console.error: Failed to preconnect to https://127.0.0.1:31321/. Error: Unacceptable TLS certificate
```

Context:

```text
          - listitem [ref=e284]:
            - generic [ref=e285]: About
          - listitem [ref=e286]:
            - generic [ref=e287]: Contact
      - navigation "Help" [ref=e288]:
        - heading "Help" [level=2] [ref=e289]
        - list [ref=e290]:
          - listitem [ref=e291]:
            - generic [ref=e292]: Safety
      - navigation "Legal" [ref=e293]:
        - heading "Legal" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - link "Terms" [ref=e297]:
              - /url: /terms
          - listitem [ref=e298]:
            - link "Privacy" [ref=e299]:
              - /url: /privacy
    - paragraph [ref=e301]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 840s for the test suite to run
(no place given)
```

```text
Timed out waiting 840s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries badHeader` (quiet) | 2 | shard 4, shard 12 |
| `countries nulByte` (quiet) | 2 | shard 4, shard 12 |
| `countries tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `countries unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `definitions nulByte` (quiet) | 2 | shard 4, shard 12 |
| `definitions tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `definitions unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `links unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations badHeader` (quiet) | 2 | shard 4, shard 12 |
| `locations file too large` (quiet) | 2 | shard 4, shard 12 |
| `locations nulByte` (quiet) | 2 | shard 4, shard 12 |
| `locations unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-12T22:26:04.428Z | 12.4 min |
| email | 2026-11-12T22:26:15.780Z | 0.4 min |
| webkit | 2026-11-12T22:26:24.040Z | 34.4 min |
| shard 1 | 2026-11-12T22:26:19.529Z | 13.6 min |
| shard 2 | 2026-11-12T22:30:26.711Z | 18.8 min |
| shard 3 | 2026-11-12T22:26:17.621Z | 8.7 min |
| shard 4 | 2026-11-12T22:26:36.867Z | 12.7 min |
| shard 5 | 2026-11-12T22:30:16.894Z | 7.9 min |
| shard 6 | 2026-11-12T22:26:35.312Z | 13.0 min |
| shard 7 | 2026-11-12T22:26:22.542Z | 4.5 min |
| shard 8 | 2026-11-12T22:26:35.390Z | 9.0 min |
| shard 9 | 2026-11-12T22:26:38.851Z | 14.4 min |
| shard 10 | 2026-11-12T22:27:35.329Z | 13.8 min |
| shard 11 | 2026-11-12T22:26:20.098Z | 11.5 min |
| shard 12 | 2026-11-12T22:26:20.507Z | 12.3 min |
| shard 13 | 2026-11-12T22:26:46.791Z | 10.4 min |
| shard 14 | 2026-11-12T22:26:12.790Z | 11.6 min |
| shard 15 | 2026-11-12T22:29:04.958Z | 4.1 min |
| shard 16 | 2026-11-12T22:27:28.421Z | 8.3 min |
| repeat | 2026-11-12T22:26:48.861Z | 14.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-screening.spec.ts` | 174 | 19.2 min | webkit, shard 2, shard 10, repeat |
| `shell.spec.ts` | 468 | 18.8 min | smoke, shard 8, shard 16 |
| `ad-page.spec.ts` | 104 | 7.0 min | webkit, shard 1, shard 9 |
| `photo-pipeline.spec.ts` | 74 | 7.0 min | webkit, shard 5, shard 13 |
| `sage-ad-page.spec.ts` | 30 | 6.7 min | webkit, shard 7, shard 15 |
| `admin-listings.spec.ts` | 78 | 6.5 min | webkit, shard 2, shard 10 |
| `auth-signout.spec.ts` | 72 | 6.3 min | smoke, shard 3, shard 11 |
| `feed-screens.spec.ts` | 40 | 6.1 min | webkit, shard 4, shard 12 |
| `admin-categories-images.spec.ts` | 12 | 5.5 min | webkit, shard 2, shard 10, repeat |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.0 min | shard 5, shard 13 |
| `import-security.spec.ts` | 36 | 4.9 min | shard 4, shard 12 |
| `dialogs.spec.ts` | 42 | 4.8 min | shard 3, shard 11, repeat |
| `post-wizard-specs.spec.ts` | 82 | 4.7 min | shard 6, shard 14 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 2, shard 11 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `post-wizard-category.spec.ts` | 52 | 4.4 min | webkit, shard 5, shard 13 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 2, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 1, shard 9 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.7 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 6, shard 14 |
| `admin-monetisation.spec.ts` | 34 | 3.5 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 4, shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 6, shard 14 |
| `mfa-stepup.spec.ts` | 22 | 2.9 min | webkit, shard 4, shard 12 |
| `sage-bands.spec.ts` | 76 | 2.9 min | shard 7, shard 15 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 3, shard 11 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 6, shard 14 |
| `my-listings-page.spec.ts` | 20 | 2.3 min | webkit, shard 5, shard 13 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `legal-admin.spec.ts` | 44 | 2.1 min | shard 4, shard 12 |
| `layout.spec.ts` | 18 | 2.0 min | webkit, shard 4, shard 12 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 1, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 1, shard 10 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 9 |
| `press.spec.ts` | 22 | 1.2 min | shard 7, shard 15 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2, shard 11 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 5, shard 13 |
| `sage-tiers.spec.ts` | 40 | 1.0 min | shard 7, shard 15 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 2, shard 10 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 8, shard 16 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `one-line-slots-admin.spec.ts` | 10 | 0.9 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 4, shard 12 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 4, shard 12 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4, shard 12 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 6, shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 5, shard 13 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 10 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-screening.spec.ts` › SC-6 Preview as buyer draws the ad's category picture | webkit-1280 | 121.0 s |
| `admin-screening.spec.ts` › SC-6 Preview as buyer draws the ad's category picture | webkit-390 | 120.9 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | webkit-390 | 120.7 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | webkit-1280 | 120.7 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 61.7 s |
| `admin-screening.spec.ts` › SC-21 Photo changes on live ads: a seller's additions, edit and removal are listed with their warnings and marked reviewed (D154 B5) | webkit-390 | 61.6 s |
| `admin-screening.spec.ts` › SC-21 Photo changes on live ads: a seller's additions, edit and removal are listed with their warnings and marked reviewed (D154 B5) | webkit-1280 | 60.7 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-1280 | 60.1 s |
| `sage-ad-page.spec.ts` › SAP-1 each tier's ad page reads its tokens (390, light) | webkit-390 | 58.7 s |
| `sage-ad-page.spec.ts` › SAP-1 each tier's ad page reads its tokens (834, light) | webkit-1280 | 57.9 s |
| `sage-ad-page.spec.ts` › SAP-1 each tier's ad page reads its tokens (390, dark) | webkit-390 | 56.2 s |
| `photo-pipeline.spec.ts` › PP-35 photos of every shape fit the photo step, the preview's gallery and the viewer (INC-1121) | webkit-1280 | 56.0 s |
| `sage-ad-page.spec.ts` › SAP-1 each tier's ad page reads its tokens (1440, light) | webkit-1280 | 56.0 s |
| `sage-ad-page.spec.ts` › SAP-1 each tier's ad page reads its tokens (834, dark) | webkit-1280 | 55.7 s |
| `photo-pipeline.spec.ts` › PP-12 a stored photo is drawn on the photo step through a link that expires | webkit-390 | 55.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43319295611-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 43319295611-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 43319295611-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43319295611-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 2, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 43319295611-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 43319295611-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43319295611-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43319295611-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 43319295611-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 43319295611-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 43319295611-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 43319295611-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43319295611-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43319295611-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-16
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  74 |       await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
  75 |       await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
> 76 |       await expect
     |       ^
  77 |         .poll(async () =>
  78 |           page
  79 |             .getByTestId("gallery-main")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:76:7
```

Context:

```text
          - listitem [ref=e345]:
            - generic [ref=e346]: About
          - listitem [ref=e347]:
            - generic [ref=e348]: Contact
      - navigation "Help" [ref=e349]:
        - heading "Help" [level=2] [ref=e350]
        - list [ref=e351]:
          - listitem [ref=e352]:
            - generic [ref=e353]: Safety
      - navigation "Legal" [ref=e354]:
        - heading "Legal" [level=2] [ref=e355]
        - list [ref=e356]:
          - listitem [ref=e357]:
            - link "Terms" [ref=e358]:
              - /url: /terms
          - listitem [ref=e359]:
            - link "Privacy" [ref=e360]:
              - /url: /privacy
    - paragraph [ref=e362]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width (DEC-192, drawings v13)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  871 |         await page.evaluate(() => window.scrollTo(0, 0));
  872 |         await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
> 873 |         await expect
      |         ^
  874 |           .poll(() =>
  875 |             page
  876 |               .getByTestId("gallery-main")
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:873:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:974:25
```

Context:

```text
          - listitem [ref=e371]:
            - generic [ref=e372]: About
          - listitem [ref=e373]:
            - generic [ref=e374]: Contact
      - navigation "Help" [ref=e375]:
        - heading "Help" [level=2] [ref=e376]
        - list [ref=e377]:
          - listitem [ref=e378]:
            - generic [ref=e379]: Safety
      - navigation "Legal" [ref=e380]:
        - heading "Legal" [level=2] [ref=e381]
        - list [ref=e382]:
          - listitem [ref=e383]:
            - link "Terms" [ref=e384]:
              - /url: /terms
          - listitem [ref=e385]:
            - link "Privacy" [ref=e386]:
              - /url: /privacy
    - paragraph [ref=e388]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-52 an ad without photos loads its category picture at once with high priority (D234)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: [e2e:pictures] 1 problem(s) with the drawn pictures at http://127.0.0.1:4173/l/e2e-ad-page-local-webkit-frcdaobc-jyf5wn68k8:
  listing-detail-illustration: never loaded — natural 0×0, drawn 320×240, frame 320×240 (https://127.0.0.1:31321/storage/v1/object/public/category-assets/e2e-local-webkit/pictures-y6zoja-512x512.png)
--- further error 1 ---
Error: [e2e:pictures] 1 problem(s) with the drawn pictures at http://127.0.0.1:4173/l/e2e-ad-page-local-webkit-frcdaobc-jyf5wn68k8:
  listing-detail-illustration: never loaded — natural 0×0, drawn 320×240, frame 320×240 (https://127.0.0.1:31321/storage/v1/object/public/category-assets/e2e-local-webkit/pictures-y6zoja-512x512.png)

   at helpers/pictures.ts:245

  243 |     if (problems.length === 0) return reading;
  244 |     if (Date.now() > deadline)
> 245 |       throw new Error(
      |             ^
  246 |         `[e2e:pictures] ${problems.length} problem(s) with the drawn pictures at ${page.url()}:\n  ${problems.join("\n  ")}`,
  247 |       );
  248 |     await root.evaluate(() => new Promise((resolve) => setTimeout(resolve, 200)));
    at expectPicturesFit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/pictures.ts:245:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1599:9
```

Context:

```text
          - listitem [ref=e329]:
            - generic [ref=e330]: About
          - listitem [ref=e331]:
            - generic [ref=e332]: Contact
      - navigation "Help" [ref=e333]:
        - heading "Help" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: Safety
      - navigation "Legal" [ref=e338]:
        - heading "Legal" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - link "Terms" [ref=e342]:
              - /url: /terms
          - listitem [ref=e343]:
            - link "Privacy" [ref=e344]:
              - /url: /privacy
    - paragraph [ref=e346]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-56 the gallery fits a portrait, a landscape and a square photo, in its frame and in the viewer (INC-1121)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: [e2e:pictures] 4 problem(s) with the drawn pictures at http://127.0.0.1:4173/l/e2e-ad-page-local-webkit-recybdwb-bdpcp9g7br:
  gallery-main: never loaded — natural 0×0, drawn 489.6×471, frame 489.6×471 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-ki42bi-720x960.jpg?token=[masked JWT])
  gallery-thumb: never loaded — natural 0×0, drawn 60×44, frame 60×44 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-jnj82y-120x160.jpg?token=[masked JWT])
  gallery-thumb: never loaded — natural 0×0, drawn 60×44, frame 60×44 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-3ht1ch-160x120.jpg?token=[masked JWT])
  gallery-thumb: never loaded — natural 0×0, drawn 60×44, frame 60×44 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-896u1g-160x160.jpg?token=[masked JWT])
--- further error 1 ---
Error: [e2e:pictures] 4 problem(s) with the drawn pictures at http://127.0.0.1:4173/l/e2e-ad-page-local-webkit-recybdwb-bdpcp9g7br:
  gallery-main: never loaded — natural 0×0, drawn 489.6×471, frame 489.6×471 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-ki42bi-720x960.jpg?token=[masked JWT])
  gallery-thumb: never loaded — natural 0×0, drawn 60×44, frame 60×44 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-jnj82y-120x160.jpg?token=[masked JWT])
  gallery-thumb: never loaded — natural 0×0, drawn 60×44, frame 60×44 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-3ht1ch-160x120.jpg?token=[masked JWT])
  gallery-thumb: never loaded — natural 0×0, drawn 60×44, frame 60×44 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-896u1g-160x160.jpg?token=[masked JWT])

   at helpers/pictures.ts:245

  243 |     if (problems.length === 0) return reading;
  244 |     if (Date.now() > deadline)
> 245 |       throw new Error(
      |             ^
  246 |         `[e2e:pictures] ${problems.length} problem(s) with the drawn pictures at ${page.url()}:\n  ${problems.join("\n  ")}`,
  247 |       );
  248 |     await root.evaluate(() => new Promise((resolve) => setTimeout(resolve, 200)));
    at expectPicturesFit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/pictures.ts:245:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1622:9
```

Context:

```text
          - listitem [ref=e348]:
            - generic [ref=e349]: About
          - listitem [ref=e350]:
            - generic [ref=e351]: Contact
      - navigation "Help" [ref=e352]:
        - heading "Help" [level=2] [ref=e353]
        - list [ref=e354]:
          - listitem [ref=e355]:
            - generic [ref=e356]: Safety
      - navigation "Legal" [ref=e357]:
        - heading "Legal" [level=2] [ref=e358]
        - list [ref=e359]:
          - listitem [ref=e360]:
            - link "Terms" [ref=e361]:
              - /url: /terms
          - listitem [ref=e362]:
            - link "Privacy" [ref=e363]:
              - /url: /privacy
    - paragraph [ref=e365]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-50 the seller card fills the right column

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1665 |     await seedPhotos(ad.id);
  1666 |     await gotoReady(page, (await address(ad)).canonical);
> 1667 |     await expect
       |     ^
  1668 |       .poll(() =>
  1669 |         page
  1670 |           .getByTestId("gallery-main")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1667:5
```

Context:

```text
          - listitem [ref=e371]:
            - generic [ref=e372]: About
          - listitem [ref=e373]:
            - generic [ref=e374]: Contact
      - navigation "Help" [ref=e375]:
        - heading "Help" [level=2] [ref=e376]
        - list [ref=e377]:
          - listitem [ref=e378]:
            - generic [ref=e379]: Safety
      - navigation "Legal" [ref=e380]:
        - heading "Legal" [level=2] [ref=e381]
        - list [ref=e382]:
          - listitem [ref=e383]:
            - link "Terms" [ref=e384]:
              - /url: /terms
          - listitem [ref=e385]:
            - link "Privacy" [ref=e386]:
              - /url: /privacy
    - paragraph [ref=e388]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `webkit`
- Project: `webkit-390`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  74 |       await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
  75 |       await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
> 76 |       await expect
     |       ^
  77 |         .poll(async () =>
  78 |           page
  79 |             .getByTestId("gallery-main")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:76:7
```

Context:

```text
          - listitem [ref=e295]:
            - generic [ref=e296]: About
          - listitem [ref=e297]:
            - generic [ref=e298]: Contact
      - navigation "Help" [ref=e299]:
        - heading "Help" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - generic [ref=e303]: Safety
      - navigation "Legal" [ref=e304]:
        - heading "Legal" [level=2] [ref=e305]
        - list [ref=e306]:
          - listitem [ref=e307]:
            - link "Terms" [ref=e308]:
              - /url: /terms
          - listitem [ref=e309]:
            - link "Privacy" [ref=e310]:
              - /url: /privacy
    - paragraph [ref=e312]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width (DEC-192, drawings v13)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  871 |         await page.evaluate(() => window.scrollTo(0, 0));
  872 |         await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
> 873 |         await expect
      |         ^
  874 |           .poll(() =>
  875 |             page
  876 |               .getByTestId("gallery-main")
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:873:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:974:25
```

Context:

```text
          - listitem [ref=e316]:
            - generic [ref=e317]: About
          - listitem [ref=e318]:
            - generic [ref=e319]: Contact
      - navigation "Help" [ref=e320]:
        - heading "Help" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: Safety
      - navigation "Legal" [ref=e325]:
        - heading "Legal" [level=2] [ref=e326]
        - list [ref=e327]:
          - listitem [ref=e328]:
            - link "Terms" [ref=e329]:
              - /url: /terms
          - listitem [ref=e330]:
            - link "Privacy" [ref=e331]:
              - /url: /privacy
    - paragraph [ref=e333]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-52 an ad without photos loads its category picture at once with high priority (D234)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: [e2e:pictures] 1 problem(s) with the drawn pictures at http://127.0.0.1:4173/l/e2e-ad-page-local-webkit-mzhvifnd-7sgwctyfvm:
  listing-detail-illustration: never loaded — natural 0×0, drawn 310×232.5, frame 310×232.5 (https://127.0.0.1:31321/storage/v1/object/public/category-assets/e2e-local-webkit/pictures-i04dbw-512x512.png)
--- further error 1 ---
Error: [e2e:pictures] 1 problem(s) with the drawn pictures at http://127.0.0.1:4173/l/e2e-ad-page-local-webkit-mzhvifnd-7sgwctyfvm:
  listing-detail-illustration: never loaded — natural 0×0, drawn 310×232.5, frame 310×232.5 (https://127.0.0.1:31321/storage/v1/object/public/category-assets/e2e-local-webkit/pictures-i04dbw-512x512.png)

   at helpers/pictures.ts:245

  243 |     if (problems.length === 0) return reading;
  244 |     if (Date.now() > deadline)
> 245 |       throw new Error(
      |             ^
  246 |         `[e2e:pictures] ${problems.length} problem(s) with the drawn pictures at ${page.url()}:\n  ${problems.join("\n  ")}`,
  247 |       );
  248 |     await root.evaluate(() => new Promise((resolve) => setTimeout(resolve, 200)));
    at expectPicturesFit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/pictures.ts:245:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1599:9
```

Context:

```text
          - listitem [ref=e279]:
            - generic [ref=e280]: About
          - listitem [ref=e281]:
            - generic [ref=e282]: Contact
      - navigation "Help" [ref=e283]:
        - heading "Help" [level=2] [ref=e284]
        - list [ref=e285]:
          - listitem [ref=e286]:
            - generic [ref=e287]: Safety
      - navigation "Legal" [ref=e288]:
        - heading "Legal" [level=2] [ref=e289]
        - list [ref=e290]:
          - listitem [ref=e291]:
            - link "Terms" [ref=e292]:
              - /url: /terms
          - listitem [ref=e293]:
            - link "Privacy" [ref=e294]:
              - /url: /privacy
    - paragraph [ref=e296]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-56 the gallery fits a portrait, a landscape and a square photo, in its frame and in the viewer (INC-1121)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: [e2e:pictures] 4 problem(s) with the drawn pictures at http://127.0.0.1:4173/l/e2e-ad-page-local-webkit-jxzjbhhh-y82y459pky:
  gallery-main: never loaded — natural 0×0, drawn 310×232.5, frame 310×232.5 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-vsqd6t-720x960.jpg?token=[masked JWT])
  gallery-thumb: never loaded — natural 0×0, drawn 60×44, frame 60×44 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-cmflgm-120x160.jpg?token=[masked JWT])
  gallery-thumb: never loaded — natural 0×0, drawn 60×44, frame 60×44 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-6exq09-160x120.jpg?token=[masked JWT])
  gallery-thumb: never loaded — natural 0×0, drawn 60×44, frame 60×44 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-jo7165-160x160.jpg?token=[masked JWT])
--- further error 1 ---
Error: [e2e:pictures] 4 problem(s) with the drawn pictures at http://127.0.0.1:4173/l/e2e-ad-page-local-webkit-jxzjbhhh-y82y459pky:
  gallery-main: never loaded — natural 0×0, drawn 310×232.5, frame 310×232.5 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-vsqd6t-720x960.jpg?token=[masked JWT])
  gallery-thumb: never loaded — natural 0×0, drawn 60×44, frame 60×44 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-cmflgm-120x160.jpg?token=[masked JWT])
  gallery-thumb: never loaded — natural 0×0, drawn 60×44, frame 60×44 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-6exq09-160x120.jpg?token=[masked JWT])
  gallery-thumb: never loaded — natural 0×0, drawn 60×44, frame 60×44 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-jo7165-160x160.jpg?token=[masked JWT])

   at helpers/pictures.ts:245

  243 |     if (problems.length === 0) return reading;
  244 |     if (Date.now() > deadline)
> 245 |       throw new Error(
      |             ^
  246 |         `[e2e:pictures] ${problems.length} problem(s) with the drawn pictures at ${page.url()}:\n  ${problems.join("\n  ")}`,
  247 |       );
  248 |     await root.evaluate(() => new Promise((resolve) => setTimeout(resolve, 200)));
    at expectPicturesFit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/pictures.ts:245:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1622:9
```

Context:

```text
          - listitem [ref=e298]:
            - generic [ref=e299]: About
          - listitem [ref=e300]:
            - generic [ref=e301]: Contact
      - navigation "Help" [ref=e302]:
        - heading "Help" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Safety
      - navigation "Legal" [ref=e307]:
        - heading "Legal" [level=2] [ref=e308]
        - list [ref=e309]:
          - listitem [ref=e310]:
            - link "Terms" [ref=e311]:
              - /url: /terms
          - listitem [ref=e312]:
            - link "Privacy" [ref=e313]:
              - /url: /privacy
    - paragraph [ref=e315]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-images.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `webkit`
- Project: `webkit-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-create-open')


   at helpers/categories.ts:361

  359 |   const slug = scratchSlug();
  360 |   await gotoReady(page, "/admin/categories");
> 361 |   await page.getByTestId("category-create-open").click();
      |                                                  ^
  362 |   await page.getByTestId("category-create-name").fill(slug);
  363 |   await expect(page.getByTestId("category-create-slug-preview")).toHaveText(slug);
  364 |   await page.getByTestId("category-create-submit").click();
    at createViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:361:50)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-images.spec.ts:53:16
```

Context:

```text
          - listitem [ref=e326]:
            - generic [ref=e327]: About
          - listitem [ref=e328]:
            - generic [ref=e329]: Contact
      - navigation "Help" [ref=e330]:
        - heading "Help" [level=2] [ref=e331]
        - list [ref=e332]:
          - listitem [ref=e333]:
            - generic [ref=e334]: Safety
      - navigation "Legal" [ref=e335]:
        - heading "Legal" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - link "Terms" [ref=e339]:
              - /url: /terms
          - listitem [ref=e340]:
            - link "Privacy" [ref=e341]:
              - /url: /privacy
    - paragraph [ref=e343]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-images.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `webkit`
- Project: `webkit-390`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-create-open')


   at helpers/categories.ts:361

  359 |   const slug = scratchSlug();
  360 |   await gotoReady(page, "/admin/categories");
> 361 |   await page.getByTestId("category-create-open").click();
      |                                                  ^
  362 |   await page.getByTestId("category-create-name").fill(slug);
  363 |   await expect(page.getByTestId("category-create-slug-preview")).toHaveText(slug);
  364 |   await page.getByTestId("category-create-submit").click();
    at createViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:361:50)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-images.spec.ts:53:16
```

Context:

```text
          - listitem [ref=e249]:
            - generic [ref=e250]: About
          - listitem [ref=e251]:
            - generic [ref=e252]: Contact
      - navigation "Help" [ref=e253]:
        - heading "Help" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Safety
      - navigation "Legal" [ref=e258]:
        - heading "Legal" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - link "Terms" [ref=e262]:
              - /url: /terms
          - listitem [ref=e263]:
            - link "Privacy" [ref=e264]:
              - /url: /privacy
    - paragraph [ref=e266]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('listing-as-seen')
Expected substring: "E2E admin listing local-webkit ehegmjjf"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 20000ms
  - waiting for getByTestId('listing-as-seen')

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('listing-as-seen')
Expected substring: "E2E admin listing local-webkit ehegmjjf"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 20000ms
  - waiting for getByTestId('listing-as-seen')


  1852 |       await gotoReady(page, `/admin/listings/${live.id}`);
  1853 |       // D194 — the photos card is on the page without clicking Edit.
> 1854 |       await expect(page.getByTestId("listing-as-seen")).toContainText(live.title, {
       |                                                         ^
  1855 |         timeout: 20000,
  1856 |       });
  1857 |       const card = page.getByTestId("listing-photos");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1854:57
```

Context:

```text
          - listitem [ref=e364]:
            - generic [ref=e365]: About
          - listitem [ref=e366]:
            - generic [ref=e367]: Contact
      - navigation "Help" [ref=e368]:
        - heading "Help" [level=2] [ref=e369]
        - list [ref=e370]:
          - listitem [ref=e371]:
            - generic [ref=e372]: Safety
      - navigation "Legal" [ref=e373]:
        - heading "Legal" [level=2] [ref=e374]
        - list [ref=e375]:
          - listitem [ref=e376]:
            - link "Terms" [ref=e377]:
              - /url: /terms
          - listitem [ref=e378]:
            - link "Privacy" [ref=e379]:
              - /url: /privacy
    - paragraph [ref=e381]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('listing-as-seen')
Expected substring: "E2E admin listing local-webkit hpvabfvt"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 20000ms
  - waiting for getByTestId('listing-as-seen')

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('listing-as-seen')
Expected substring: "E2E admin listing local-webkit hpvabfvt"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 20000ms
  - waiting for getByTestId('listing-as-seen')


  1852 |       await gotoReady(page, `/admin/listings/${live.id}`);
  1853 |       // D194 — the photos card is on the page without clicking Edit.
> 1854 |       await expect(page.getByTestId("listing-as-seen")).toContainText(live.title, {
       |                                                         ^
  1855 |         timeout: 20000,
  1856 |       });
  1857 |       const card = page.getByTestId("listing-photos");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1854:57
```

Context:

```text
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
      - navigation "Legal" [ref=e294]:
        - heading "Legal" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - link "Terms" [ref=e298]:
              - /url: /terms
          - listitem [ref=e299]:
            - link "Privacy" [ref=e300]:
              - /url: /privacy
    - paragraph [ref=e302]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-6 Preview as buyer draws the ad's category picture

- Source: `webkit`
- Project: `webkit-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('admin-screening-search')


  215 |   async function findRow(page: Page, title: string, id: string) {
  216 |     await gotoReady(page, "/admin/screening");
> 217 |     await page.getByTestId("admin-screening-search").fill(title);
      |                                                      ^
  218 |     const row = rowOf(page, id);
  219 |     await expect(row).toBeVisible({ timeout: 20000 });
  220 |     return row;
    at findRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:217:54)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:334:7
```

Context:

```text
          - listitem [ref=e336]:
            - generic [ref=e337]: About
          - listitem [ref=e338]:
            - generic [ref=e339]: Contact
      - navigation "Help" [ref=e340]:
        - heading "Help" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - generic [ref=e344]: Safety
      - navigation "Legal" [ref=e345]:
        - heading "Legal" [level=2] [ref=e346]
        - list [ref=e347]:
          - listitem [ref=e348]:
            - link "Terms" [ref=e349]:
              - /url: /terms
          - listitem [ref=e350]:
            - link "Privacy" [ref=e351]:
              - /url: /privacy
    - paragraph [ref=e353]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-21 Photo changes on live ads: a seller's additions, edit and removal are listed with their warnings and marked reviewed (D154 B5)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('admin-photo-changes').locator('[data-testid="admin-photo-change"][data-listing-id="[account id]"]')
Expected: 4
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for getByTestId('admin-photo-changes').locator('[data-testid="admin-photo-change"][data-listing-id="[account id]"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('admin-photo-changes').locator('[data-testid="admin-photo-change"][data-listing-id="[account id]"]')
Expected: 4
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for getByTestId('admin-photo-changes').locator('[data-testid="admin-photo-change"][data-listing-id="[account id]"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1014 |         `[data-testid="admin-photo-change"][data-listing-id="${ad.id}"]`,
  1015 |       );
> 1016 |       await expect(mine).toHaveCount(4, { timeout: 20000 });
       |                          ^
  1017 |       for (const [index, row] of truth.entries()) {
  1018 |         await expect(mine.nth(index)).toHaveAttribute("data-change-id", row.id);
```

Context:

```text
          - listitem [ref=e364]:
            - generic [ref=e365]: About
          - listitem [ref=e366]:
            - generic [ref=e367]: Contact
      - navigation "Help" [ref=e368]:
        - heading "Help" [level=2] [ref=e369]
        - list [ref=e370]:
          - listitem [ref=e371]:
            - generic [ref=e372]: Safety
      - navigation "Legal" [ref=e373]:
        - heading "Legal" [level=2] [ref=e374]
        - list [ref=e375]:
          - listitem [ref=e376]:
            - link "Terms" [ref=e377]:
              - /url: /terms
          - listitem [ref=e378]:
            - link "Privacy" [ref=e379]:
              - /url: /privacy
    - paragraph [ref=e381]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-6 Preview as buyer draws the ad's category picture

- Source: `webkit`
- Project: `webkit-390`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('admin-screening-search')


  215 |   async function findRow(page: Page, title: string, id: string) {
  216 |     await gotoReady(page, "/admin/screening");
> 217 |     await page.getByTestId("admin-screening-search").fill(title);
      |                                                      ^
  218 |     const row = rowOf(page, id);
  219 |     await expect(row).toBeVisible({ timeout: 20000 });
  220 |     return row;
    at findRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:217:54)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:334:7
```

Context:

```text
          - listitem [ref=e257]:
            - generic [ref=e258]: About
          - listitem [ref=e259]:
            - generic [ref=e260]: Contact
      - navigation "Help" [ref=e261]:
        - heading "Help" [level=2] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - generic [ref=e265]: Safety
      - navigation "Legal" [ref=e266]:
        - heading "Legal" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - link "Terms" [ref=e270]:
              - /url: /terms
          - listitem [ref=e271]:
            - link "Privacy" [ref=e272]:
              - /url: /privacy
    - paragraph [ref=e274]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-21 Photo changes on live ads: a seller's additions, edit and removal are listed with their warnings and marked reviewed (D154 B5)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('admin-photo-changes').locator('[data-testid="admin-photo-change"][data-listing-id="[account id]"]')
Expected: 4
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for getByTestId('admin-photo-changes').locator('[data-testid="admin-photo-change"][data-listing-id="[account id]"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('admin-photo-changes').locator('[data-testid="admin-photo-change"][data-listing-id="[account id]"]')
Expected: 4
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for getByTestId('admin-photo-changes').locator('[data-testid="admin-photo-change"][data-listing-id="[account id]"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1014 |         `[data-testid="admin-photo-change"][data-listing-id="${ad.id}"]`,
  1015 |       );
> 1016 |       await expect(mine).toHaveCount(4, { timeout: 20000 });
       |                          ^
  1017 |       for (const [index, row] of truth.entries()) {
  1018 |         await expect(mine.nth(index)).toHaveAttribute("data-change-id", row.id);
```

Context:

```text
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
      - navigation "Legal" [ref=e294]:
        - heading "Legal" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - link "Terms" [ref=e298]:
              - /url: /terms
          - listitem [ref=e299]:
            - link "Privacy" [ref=e300]:
              - /url: /privacy
    - paragraph [ref=e302]: © 2026 ethio.com — All rights reserved.
```
```

## feed-screens.spec.ts › FEED SCREENS › FS-7 a card without a photo draws the nearest category picture, else the placeholder

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-picture"]').locator('img')
Expected: "https://127.0.0.1:31321/storage/v1/object/public/category-assets/e2e-local-webkit/pictures-m4bp4e-512x512.png"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-picture"]').locator('img')

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-picture"]').locator('img')
Expected: "https://127.0.0.1:31321/storage/v1/object/public/category-assets/e2e-local-webkit/pictures-m4bp4e-512x512.png"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-picture"]').locator('img')


  433 |           "FS-7: the leaf's card did not draw its folder's picture",
  434 |         ).toHaveAttribute("data-picture", "category", { timeout: 20_000 });
> 435 |         await expect(box.locator("img")).toHaveAttribute("src", picture);
      |                                          ^
  436 |         await expectPicturesFit(page, box);
  437 |       }
  438 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-screens.spec.ts:435:42
```

Context:

```text
          - listitem [ref=e361]:
            - generic [ref=e362]: About
          - listitem [ref=e363]:
            - generic [ref=e364]: Contact
      - navigation "Help" [ref=e365]:
        - heading "Help" [level=2] [ref=e366]
        - list [ref=e367]:
          - listitem [ref=e368]:
            - generic [ref=e369]: Safety
      - navigation "Legal" [ref=e370]:
        - heading "Legal" [level=2] [ref=e371]
        - list [ref=e372]:
          - listitem [ref=e373]:
            - link "Terms" [ref=e374]:
              - /url: /terms
          - listitem [ref=e375]:
            - link "Privacy" [ref=e376]:
              - /url: /privacy
    - paragraph [ref=e378]: © 2026 ethio.com — All rights reserved.
```
```

## feed-screens.spec.ts › FEED SCREENS › FS-15 the card's ribbon and the old price (D173, D175 1, D180)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: [e2e:pictures] 1 problem(s) with the drawn pictures at http://127.0.0.1:4173/c/e2e-post-local-webkit-20-lxycxz:
  listing-card-picture: never loaded — natural 0×0, drawn 185.6×139.2, frame 185.6×139.2 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-88g59z-360x480.jpg?token=[masked JWT])
--- further error 1 ---
Error: [e2e:pictures] 1 problem(s) with the drawn pictures at http://127.0.0.1:4173/c/e2e-post-local-webkit-20-lxycxz:
  listing-card-picture: never loaded — natural 0×0, drawn 185.6×139.2, frame 185.6×139.2 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-88g59z-360x480.jpg?token=[masked JWT])

   at helpers/pictures.ts:245

  243 |     if (problems.length === 0) return reading;
  244 |     if (Date.now() > deadline)
> 245 |       throw new Error(
      |             ^
  246 |         `[e2e:pictures] ${problems.length} problem(s) with the drawn pictures at ${page.url()}:\n  ${problems.join("\n  ")}`,
  247 |       );
  248 |     await root.evaluate(() => new Promise((resolve) => setTimeout(resolve, 200)));
    at expectPicturesFit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/pictures.ts:245:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-screens.spec.ts:799:9
```

Context:

```text
          - listitem [ref=e406]:
            - generic [ref=e407]: About
          - listitem [ref=e408]:
            - generic [ref=e409]: Contact
      - navigation "Help" [ref=e410]:
        - heading "Help" [level=2] [ref=e411]
        - list [ref=e412]:
          - listitem [ref=e413]:
            - generic [ref=e414]: Safety
      - navigation "Legal" [ref=e415]:
        - heading "Legal" [level=2] [ref=e416]
        - list [ref=e417]:
          - listitem [ref=e418]:
            - link "Terms" [ref=e419]:
              - /url: /terms
          - listitem [ref=e420]:
            - link "Privacy" [ref=e421]:
              - /url: /privacy
    - paragraph [ref=e423]: © 2026 ethio.com — All rights reserved.
```
```

## feed-screens.spec.ts › FEED SCREENS › FS-7 a card without a photo draws the nearest category picture, else the placeholder

- Source: `webkit`
- Project: `webkit-390`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-picture"]').locator('img')
Expected: "https://127.0.0.1:31321/storage/v1/object/public/category-assets/e2e-local-webkit/pictures-fp3jbb-512x512.png"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-picture"]').locator('img')

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-picture"]').locator('img')
Expected: "https://127.0.0.1:31321/storage/v1/object/public/category-assets/e2e-local-webkit/pictures-fp3jbb-512x512.png"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-picture"]').locator('img')


  433 |           "FS-7: the leaf's card did not draw its folder's picture",
  434 |         ).toHaveAttribute("data-picture", "category", { timeout: 20_000 });
> 435 |         await expect(box.locator("img")).toHaveAttribute("src", picture);
      |                                          ^
  436 |         await expectPicturesFit(page, box);
  437 |       }
  438 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-screens.spec.ts:435:42
```

Context:

```text
          - listitem [ref=e169]:
            - generic [ref=e170]: About
          - listitem [ref=e171]:
            - generic [ref=e172]: Contact
      - navigation "Help" [ref=e173]:
        - heading "Help" [level=2] [ref=e174]
        - list [ref=e175]:
          - listitem [ref=e176]:
            - generic [ref=e177]: Safety
      - navigation "Legal" [ref=e178]:
        - heading "Legal" [level=2] [ref=e179]
        - list [ref=e180]:
          - listitem [ref=e181]:
            - link "Terms" [ref=e182]:
              - /url: /terms
          - listitem [ref=e183]:
            - link "Privacy" [ref=e184]:
              - /url: /privacy
    - paragraph [ref=e186]: © 2026 ethio.com — All rights reserved.
```
```

## feed-screens.spec.ts › FEED SCREENS › FS-15 the card's ribbon and the old price (D173, D175 1, D180)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: [e2e:pictures] 1 problem(s) with the drawn pictures at http://127.0.0.1:4173/c/e2e-post-local-webkit-62-ne8w3b:
  listing-card-picture: never loaded — natural 0×0, drawn 103.3×77.5, frame 103.3×77.5 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-0n2car-360x480.jpg?token=[masked JWT])
--- further error 1 ---
Error: [e2e:pictures] 1 problem(s) with the drawn pictures at http://127.0.0.1:4173/c/e2e-post-local-webkit-62-ne8w3b:
  listing-card-picture: never loaded — natural 0×0, drawn 103.3×77.5, frame 103.3×77.5 (https://127.0.0.1:31321/storage/v1/object/sign/listing-photos/e2e-local-webkit/pictures-0n2car-360x480.jpg?token=[masked JWT])

   at helpers/pictures.ts:245

  243 |     if (problems.length === 0) return reading;
  244 |     if (Date.now() > deadline)
> 245 |       throw new Error(
      |             ^
  246 |         `[e2e:pictures] ${problems.length} problem(s) with the drawn pictures at ${page.url()}:\n  ${problems.join("\n  ")}`,
  247 |       );
  248 |     await root.evaluate(() => new Promise((resolve) => setTimeout(resolve, 200)));
    at expectPicturesFit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/pictures.ts:245:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-screens.spec.ts:799:9
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## layout.spec.ts › LY-1 wide pages use most of the desktop content width

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: page.goto: Navigation to "http://127.0.0.1:4173/settings" is interrupted by another navigation to "http://127.0.0.1:4173/"
Call log:
  - navigating to "http://127.0.0.1:4173/settings", waiting until "load"

--- further error 1 ---
Error: page.goto: Navigation to "http://127.0.0.1:4173/settings" is interrupted by another navigation to "http://127.0.0.1:4173/"
Call log:
  - navigating to "http://127.0.0.1:4173/settings", waiting until "load"


   at helpers/ui.ts:304

  302 |
  303 | export async function gotoReady(page: Page, path: string) {
> 304 |   await page.goto(path);
      |              ^
  305 |   await assertSsrHealthy(page);
  306 |   await waitForHydration(page);
  307 |   await assertNoStringifiedLeak(page, `gotoReady(${path})`);
    at gotoReady (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:304:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/layout.spec.ts:30:13
```

Context:

```text
          - listitem [ref=e248]:
            - generic [ref=e249]: About
          - listitem [ref=e250]:
            - generic [ref=e251]: Contact
      - navigation "Help" [ref=e252]:
        - heading "Help" [level=2] [ref=e253]
        - list [ref=e254]:
          - listitem [ref=e255]:
            - generic [ref=e256]: Safety
      - navigation "Legal" [ref=e257]:
        - heading "Legal" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - link "Terms" [ref=e261]:
              - /url: /terms
          - listitem [ref=e262]:
            - link "Privacy" [ref=e263]:
              - /url: /privacy
    - paragraph [ref=e265]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-1 enroll: QR + secret shown, a generated code activates the factor

- Source: `webkit`
- Project: `webkit-1280`

```text
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
--- further error 1 ---
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================

   at helpers/ui.ts:597

  595 |
  596 |   // 1. The route the auth screen navigates to on password success.
> 597 |   await page.waitForURL(/\/$/, { timeout: 15000 });
      |              ^
  598 |   // 2. Authoritative signed-in signal: the account menu trigger renders ONLY on
  599 |   //    the authenticated branch of app-header (stable testid, no hover/open
  600 |   //    prerequisite), unlike the signed-out "Sign in" link whose absence is
    at signIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:597:14)
    at switchUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:700:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:80:7
```

Context:

```text
          - listitem [ref=e289]:
            - generic [ref=e290]: About
          - listitem [ref=e291]:
            - generic [ref=e292]: Contact
      - navigation "Help" [ref=e293]:
        - heading "Help" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: Safety
      - navigation "Legal" [ref=e298]:
        - heading "Legal" [level=2] [ref=e299]
        - list [ref=e300]:
          - listitem [ref=e301]:
            - link "Terms" [ref=e302]:
              - /url: /terms
          - listitem [ref=e303]:
            - link "Privacy" [ref=e304]:
              - /url: /privacy
    - paragraph [ref=e306]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-1 enroll: QR + secret shown, a generated code activates the factor

- Source: `webkit`
- Project: `webkit-390`

```text
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
--- further error 1 ---
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================

   at helpers/ui.ts:597

  595 |
  596 |   // 1. The route the auth screen navigates to on password success.
> 597 |   await page.waitForURL(/\/$/, { timeout: 15000 });
      |              ^
  598 |   // 2. Authoritative signed-in signal: the account menu trigger renders ONLY on
  599 |   //    the authenticated branch of app-header (stable testid, no hover/open
  600 |   //    prerequisite), unlike the signed-out "Sign in" link whose absence is
    at signIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:597:14)
    at switchUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:700:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:80:7
```

Context:

```text
          - listitem [ref=e238]:
            - generic [ref=e239]: About
          - listitem [ref=e240]:
            - generic [ref=e241]: Contact
      - navigation "Help" [ref=e242]:
        - heading "Help" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Safety
      - navigation "Legal" [ref=e247]:
        - heading "Legal" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - link "Terms" [ref=e251]:
              - /url: /terms
          - listitem [ref=e252]:
            - link "Privacy" [ref=e253]:
              - /url: /privacy
    - paragraph [ref=e255]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-9 each row's picture fits its box in the table and in the cards, every shape (INC-1121)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('my-listing-[account id]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('my-listing-[account id]')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('my-listing-[account id]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('my-listing-[account id]')


  865 |       await gotoReady(page, "/my-listings");
  866 |       for (const id of shaped) {
> 867 |         await expect(twin(page, id)).toBeVisible({ timeout: 15000 });
      |                                      ^
  868 |         const picture = page.getByTestId(`my-listing-${id}-picture`).filter({ visible: true });
  869 |         await expect(picture.locator("[data-picture]")).toHaveAttribute("data-picture", "photo");
  870 |         await expectPicturesFit(page, picture);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:867:38
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-9 each row's picture fits its box in the table and in the cards, every shape (INC-1121)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('my-listing-[account id]-card')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('my-listing-[account id]-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('my-listing-[account id]-card')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('my-listing-[account id]-card')


  865 |       await gotoReady(page, "/my-listings");
  866 |       for (const id of shaped) {
> 867 |         await expect(twin(page, id)).toBeVisible({ timeout: 15000 });
      |                                      ^
  868 |         const picture = page.getByTestId(`my-listing-${id}-picture`).filter({ visible: true });
  869 |         await expect(picture.locator("[data-picture]")).toHaveAttribute("data-picture", "photo");
  870 |         await expectPicturesFit(page, picture);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:867:38
```

Context:

```text
          - listitem [ref=e206]:
            - generic [ref=e207]: About
          - listitem [ref=e208]:
            - generic [ref=e209]: Contact
      - navigation "Help" [ref=e210]:
        - heading "Help" [level=2] [ref=e211]
        - list [ref=e212]:
          - listitem [ref=e213]:
            - generic [ref=e214]: Safety
      - navigation "Legal" [ref=e215]:
        - heading "Legal" [level=2] [ref=e216]
        - list [ref=e217]:
          - listitem [ref=e218]:
            - link "Terms" [ref=e219]:
              - /url: /terms
          - listitem [ref=e220]:
            - link "Privacy" [ref=e221]:
              - /url: /privacy
    - paragraph [ref=e223]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-12 a stored photo is drawn on the photo step through a link that expires

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: page.goto: Navigation to "http://127.0.0.1:4173/" is interrupted by another navigation to "http://127.0.0.1:4173/"
Call log:
  - navigating to "http://127.0.0.1:4173/", waiting until "load"

--- further error 1 ---
Error: page.goto: Navigation to "http://127.0.0.1:4173/" is interrupted by another navigation to "http://127.0.0.1:4173/"
Call log:
  - navigating to "http://127.0.0.1:4173/", waiting until "load"


   at helpers/ui.ts:304

  302 |
  303 | export async function gotoReady(page: Page, path: string) {
> 304 |   await page.goto(path);
      |              ^
  305 |   await assertSsrHealthy(page);
  306 |   await waitForHydration(page);
  307 |   await assertNoStringifiedLeak(page, `gotoReady(${path})`);
    at gotoReady (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:304:14)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:121:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:593:31
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-12-a-stored-photo-is-drawn-on-the-photo-step-through-a-link-that-expires-webkit-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-18dfa-through-a-link-that-expires-webkit-1280`; this run carried 66 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-35 photos of every shape fit the photo step, the preview's gallery and the viewer (INC-1121)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-2')


  1440 |       const listingId = await draft(page, token, user.id);
  1441 |       await gotoReady(page, `/post/${listingId}`);
> 1442 |       await expect(page.getByTestId("post-step-2")).toBeVisible();
       |                                                     ^
  1443 |       const shapes = [
  1444 |         ["portrait", 1200, 1600],
  1445 |         ["landscape", 1600, 1200],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1442:53
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-35-photos-of-every-shape-fit-the-photo-step-the-preview-s-gallery-and-the-viewer-INC-1121-webkit-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-f7455-ry-and-the-viewer-INC-1121--webkit-1280`; this run carried 66 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-12 a stored photo is drawn on the photo step through a link that expires

- Source: `webkit`
- Project: `webkit-390`

```text
Error: PP-12: a draft holding a photo resumes past the photo step (D39)

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PP-12: a draft holding a photo resumes past the photo step (D39) with timeout 10000ms
  - waiting for getByTestId('post-step-4')

--- further error 1 ---
Error: PP-12: a draft holding a photo resumes past the photo step (D39)

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PP-12: a draft holding a photo resumes past the photo step (D39) with timeout 10000ms
  - waiting for getByTestId('post-step-4')


  600 |         page.getByTestId("post-step-4"),
  601 |         "PP-12: a draft holding a photo resumes past the photo step (D39)",
> 602 |       ).toBeVisible();
      |         ^
  603 |       await page.getByTestId("post-back").click();
  604 |       await expect(page.getByTestId("post-step-2")).toBeVisible();
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-12-a-stored-photo-is-drawn-on-the-photo-step-through-a-link-that-expires-webkit-390` — Playwright's name `photo-pipeline-PHOTO-PIPEL-18dfa-through-a-link-that-expires-webkit-390`; this run carried 66 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-35 photos of every shape fit the photo step, the preview's gallery and the viewer (INC-1121)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-2')


  1440 |       const listingId = await draft(page, token, user.id);
  1441 |       await gotoReady(page, `/post/${listingId}`);
> 1442 |       await expect(page.getByTestId("post-step-2")).toBeVisible();
       |                                                     ^
  1443 |       const shapes = [
  1444 |         ["portrait", 1200, 1600],
  1445 |         ["landscape", 1600, 1200],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1442:53
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-35-photos-of-every-shape-fit-the-photo-step-the-preview-s-gallery-and-the-viewer-INC-1121-webkit-390` — Playwright's name `photo-pipeline-PHOTO-PIPEL-f7455-ry-and-the-viewer-INC-1121--webkit-390`; this run carried 66 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: PW-3: a leaf without its own illustration showed no ancestor stand-in

expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('post-photos-illustration')
Expected: "https://127.0.0.1:31321/storage/v1/object/public/category-assets/e2e-local-webkit/pictures-buqgcl-512x512.png"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-3: a leaf without its own illustration showed no ancestor stand-in with timeout 10000ms
  - waiting for getByTestId('post-photos-illustration')

--- further error 1 ---
Error: PW-3: a leaf without its own illustration showed no ancestor stand-in

expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('post-photos-illustration')
Expected: "https://127.0.0.1:31321/storage/v1/object/public/category-assets/e2e-local-webkit/pictures-buqgcl-512x512.png"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-3: a leaf without its own illustration showed no ancestor stand-in with timeout 10000ms
  - waiting for getByTestId('post-photos-illustration')


  501 |         page.getByTestId("post-photos-illustration"),
  502 |         "PW-3: a leaf without its own illustration showed no ancestor stand-in",
> 503 |       ).toHaveAttribute("src", standIn);
      |         ^
  504 |       /**
  505 |        * U6-C1-R3a-2 (the PW-4 illustration law, proved where the stand-in actually
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-3-a-folder-is-browsable-and-never-selectable-its-leaf-is-D11-webkit-1280` — Playwright's name `post-wizard-category-POSTI-b6d76-selectable-its-leaf-is-D11--webkit-1280`; this run carried 66 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: page.goto: Navigation to "http://127.0.0.1:4173/post" is interrupted by another navigation to "http://127.0.0.1:4173/"
Call log:
  - navigating to "http://127.0.0.1:4173/post", waiting until "load"

--- further error 1 ---
Error: page.goto: Navigation to "http://127.0.0.1:4173/post" is interrupted by another navigation to "http://127.0.0.1:4173/"
Call log:
  - navigating to "http://127.0.0.1:4173/post", waiting until "load"


   at helpers/ui.ts:304

  302 |
  303 | export async function gotoReady(page: Page, path: string) {
> 304 |   await page.goto(path);
      |              ^
  305 |   await assertSsrHealthy(page);
  306 |   await waitForHydration(page);
  307 |   await assertNoStringifiedLeak(page, `gotoReady(${path})`);
    at gotoReady (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:304:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:444:13
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-3-a-folder-is-browsable-and-never-selectable-its-leaf-is-D11-webkit-390` — Playwright's name `post-wizard-category-POSTI-b6d76-selectable-its-leaf-is-D11--webkit-390`; this run carried 66 context file(s); of the same spec: none

## sage-ad-page.spec.ts › Sage ad page at 390, light › SAP-1 each tier's ad page reads its tokens (390, light)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  124 |         await expect(page.locator("html")).toHaveAttribute("data-mode", theme);
  125 |         await expect(page.getByTestId("listing-contact-show")).toBeVisible();
> 126 |         await expect
      |         ^
  127 |           .poll(async () =>
  128 |             page
  129 |               .getByTestId("gallery-main")
    at openAs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:126:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:151:13
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## sage-ad-page.spec.ts › Sage ad page at 390, dark › SAP-1 each tier's ad page reads its tokens (390, dark)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  124 |         await expect(page.locator("html")).toHaveAttribute("data-mode", theme);
  125 |         await expect(page.getByTestId("listing-contact-show")).toBeVisible();
> 126 |         await expect
      |         ^
  127 |           .poll(async () =>
  128 |             page
  129 |               .getByTestId("gallery-main")
    at openAs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:126:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:151:13
```

Context:

```text
          - listitem [ref=e327]:
            - generic [ref=e328]: About
          - listitem [ref=e329]:
            - generic [ref=e330]: Contact
      - navigation "Help" [ref=e331]:
        - heading "Help" [level=2] [ref=e332]
        - list [ref=e333]:
          - listitem [ref=e334]:
            - generic [ref=e335]: Safety
      - navigation "Legal" [ref=e336]:
        - heading "Legal" [level=2] [ref=e337]
        - list [ref=e338]:
          - listitem [ref=e339]:
            - link "Terms" [ref=e340]:
              - /url: /terms
          - listitem [ref=e341]:
            - link "Privacy" [ref=e342]:
              - /url: /privacy
    - paragraph [ref=e344]: © 2026 ethio.com — All rights reserved.
```
```

## sage-ad-page.spec.ts › Sage ad page at 834, light › SAP-1 each tier's ad page reads its tokens (834, light)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  124 |         await expect(page.locator("html")).toHaveAttribute("data-mode", theme);
  125 |         await expect(page.getByTestId("listing-contact-show")).toBeVisible();
> 126 |         await expect
      |         ^
  127 |           .poll(async () =>
  128 |             page
  129 |               .getByTestId("gallery-main")
    at openAs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:126:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:151:13
```

Context:

```text
          - listitem [ref=e410]:
            - generic [ref=e411]: About
          - listitem [ref=e412]:
            - generic [ref=e413]: Contact
      - navigation "Help" [ref=e414]:
        - heading "Help" [level=2] [ref=e415]
        - list [ref=e416]:
          - listitem [ref=e417]:
            - generic [ref=e418]: Safety
      - navigation "Legal" [ref=e419]:
        - heading "Legal" [level=2] [ref=e420]
        - list [ref=e421]:
          - listitem [ref=e422]:
            - link "Terms" [ref=e423]:
              - /url: /terms
          - listitem [ref=e424]:
            - link "Privacy" [ref=e425]:
              - /url: /privacy
    - paragraph [ref=e427]: © 2026 ethio.com — All rights reserved.
```
```

## sage-ad-page.spec.ts › Sage ad page at 834, dark › SAP-1 each tier's ad page reads its tokens (834, dark)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  124 |         await expect(page.locator("html")).toHaveAttribute("data-mode", theme);
  125 |         await expect(page.getByTestId("listing-contact-show")).toBeVisible();
> 126 |         await expect
      |         ^
  127 |           .poll(async () =>
  128 |             page
  129 |               .getByTestId("gallery-main")
    at openAs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:126:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:151:13
```

Context:

```text
          - listitem [ref=e406]:
            - generic [ref=e407]: About
          - listitem [ref=e408]:
            - generic [ref=e409]: Contact
      - navigation "Help" [ref=e410]:
        - heading "Help" [level=2] [ref=e411]
        - list [ref=e412]:
          - listitem [ref=e413]:
            - generic [ref=e414]: Safety
      - navigation "Legal" [ref=e415]:
        - heading "Legal" [level=2] [ref=e416]
        - list [ref=e417]:
          - listitem [ref=e418]:
            - link "Terms" [ref=e419]:
              - /url: /terms
          - listitem [ref=e420]:
            - link "Privacy" [ref=e421]:
              - /url: /privacy
    - paragraph [ref=e423]: © 2026 ethio.com — All rights reserved.
```
```

## sage-ad-page.spec.ts › Sage ad page at 1440, light › SAP-1 each tier's ad page reads its tokens (1440, light)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  124 |         await expect(page.locator("html")).toHaveAttribute("data-mode", theme);
  125 |         await expect(page.getByTestId("listing-contact-show")).toBeVisible();
> 126 |         await expect
      |         ^
  127 |           .poll(async () =>
  128 |             page
  129 |               .getByTestId("gallery-main")
    at openAs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:126:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:151:13
```

Context:

```text
          - listitem [ref=e481]:
            - generic [ref=e482]: About
          - listitem [ref=e483]:
            - generic [ref=e484]: Contact
      - navigation "Help" [ref=e485]:
        - heading "Help" [level=2] [ref=e486]
        - list [ref=e487]:
          - listitem [ref=e488]:
            - generic [ref=e489]: Safety
      - navigation "Legal" [ref=e490]:
        - heading "Legal" [level=2] [ref=e491]
        - list [ref=e492]:
          - listitem [ref=e493]:
            - link "Terms" [ref=e494]:
              - /url: /terms
          - listitem [ref=e495]:
            - link "Privacy" [ref=e496]:
              - /url: /privacy
    - paragraph [ref=e498]: © 2026 ethio.com — All rights reserved.
```
```

## sage-ad-page.spec.ts › Sage ad page at 1440, dark › SAP-1 each tier's ad page reads its tokens (1440, dark)

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  124 |         await expect(page.locator("html")).toHaveAttribute("data-mode", theme);
  125 |         await expect(page.getByTestId("listing-contact-show")).toBeVisible();
> 126 |         await expect
      |         ^
  127 |           .poll(async () =>
  128 |             page
  129 |               .getByTestId("gallery-main")
    at openAs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:126:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:151:13
```

Context:

```text
          - listitem [ref=e477]:
            - generic [ref=e478]: About
          - listitem [ref=e479]:
            - generic [ref=e480]: Contact
      - navigation "Help" [ref=e481]:
        - heading "Help" [level=2] [ref=e482]
        - list [ref=e483]:
          - listitem [ref=e484]:
            - generic [ref=e485]: Safety
      - navigation "Legal" [ref=e486]:
        - heading "Legal" [level=2] [ref=e487]
        - list [ref=e488]:
          - listitem [ref=e489]:
            - link "Terms" [ref=e490]:
              - /url: /terms
          - listitem [ref=e491]:
            - link "Privacy" [ref=e492]:
              - /url: /privacy
    - paragraph [ref=e494]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: webkit

No `[ssr-error]` lines in the `webkit` log (or no log was uploaded).

## Client errors: webkit

```text
[client-error] pageerror:
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
[client-error] console.error: Unacceptable TLS certificate
[client-error] pageerror:
[client-error] console.error: Failed to load resource: Unacceptable TLS certificate
console.error: [client-error] legal gate read failed ×3
console.error: [client-error] gate fetch threw ×2
console.error: [client-error] legal gate read failed
console.error: [client-error] legal gate read fail...
console.error: [client-error] gate fetch threw ×2
console.error: [client-error] legal gate read failed
console.error: [client-error] legal gate read fail...
console.error: [client-error] legal gate read failed
console.error: [client-error] legal gate read fail... ×4
console.error: [client-error] legal gate read failed ×5
console.error: [client-error] gate fetch threw ×2
console.error: [client-error] legal gate read failed ×2
console.error: [client-error] gate fetch threw ×2
console.error: [client-error] legal gate read failed
console.error: [client-error] legal gate read fail... ×3
```
