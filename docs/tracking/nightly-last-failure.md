# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40903121206
- Commit: `e65a78e7ffac11a895db2391923f6117d6790413`
- Attempt: 1
- Written (UTC): 2026-10-29T20:27:38.555Z
- Passed: 2078 · Skipped: 102 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

64 line(s), 29 message(s): 2 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
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
| `catalog_find_refresh: upstream returned an HTML error page (<n>)` | 1 | full |
| `gate fetch threw upstream ssr language gate timed out after <n>ms` | 1 | full |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### catalog_find_refresh: upstream returned an HTML error page (<n>)

- Count: 1 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CT-37 undoing a category delete restores its attribute links or names the skippe ×1 · CT-42 the undo of an import removes a created chain and its guest link, whatever ×1

```text
[WebServer] [ssr-error] /api/admin/categories/import catalog_find_refresh: upstream returned an HTML error page (502)
```

### gate fetch threw upstream ssr language gate timed out after <n>ms

- Count: 1 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-15 a photo stored in an earlier visit can be made the cover, which moves it f ×1 · PP-16 a photo dropped on the step is added like a picked one ×1

```text
[WebServer] [ssr-error] /__root gate fetch threw upstream ssr language gate timed out after 1500ms
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-29T15:47:35.299Z | 3.5 min |
| full | 2026-10-29T15:51:06.548Z | 276.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 68 | 21.9 min | full |
| `shell.spec.ts` | 218 | 10.7 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 10.0 min | full |
| `ad-page.spec.ts` | 78 | 9.9 min | full |
| `post-wizard-specs.spec.ts` | 82 | 9.8 min | full |
| `import-security.spec.ts` | 36 | 9.4 min | full |
| `admin-screening.spec.ts` | 52 | 9.3 min | full |
| `admin-listings.spec.ts` | 62 | 9.1 min | full |
| `posting-routes.spec.ts` | 80 | 7.3 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 7.0 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 6.6 min | full |
| `admin-attributes-library.spec.ts` | 42 | 6.6 min | full |
| `post-wizard-place.spec.ts` | 38 | 6.5 min | full |
| `post-wizard-where.spec.ts` | 32 | 6.1 min | full |
| `my-listings-ad.spec.ts` | 36 | 6.0 min | full |
| `legal-certify.spec.ts` | 42 | 5.8 min | full |
| `admin-translations-console.spec.ts` | 46 | 5.7 min | full |
| `admin-categories-console.spec.ts` | 34 | 5.6 min | full |
| `admin-translations-governance.spec.ts` | 20 | 5.6 min | full |
| `feed-screens.spec.ts` | 36 | 5.5 min | full |
| `admin-locations.spec.ts` | 38 | 5.5 min | full |
| `admin-attributes-links.spec.ts` | 34 | 5.5 min | full |
| `admin-users.spec.ts` | 28 | 5.4 min | full |
| `post-wizard-category.spec.ts` | 48 | 5.2 min | full |
| `viewing-place.spec.ts` | 22 | 5.0 min | full |
| `post-wizard-resets.spec.ts` | 34 | 4.8 min | full |
| `admin-roles.spec.ts` | 26 | 4.8 min | full |
| `auth-signout.spec.ts` | 34 | 4.7 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 4.5 min | full |
| `legal-admin.spec.ts` | 42 | 3.8 min | full |
| `my-listings-doors.spec.ts` | 28 | 3.7 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 3.5 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `admin-attributes-import.spec.ts` | 40 | 3.2 min | full |
| `ad-page-doors.spec.ts` | 30 | 3.2 min | full |
| `my-listings-page.spec.ts` | 16 | 2.9 min | full |
| `admin-countries.spec.ts` | 18 | 2.5 min | full |
| `admin-translations-data.spec.ts` | 10 | 2.4 min | full |
| `legal-doors.spec.ts` | 34 | 2.4 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 2.2 min | full |
| `admin-categories-images.spec.ts` | 4 | 2.1 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.1 min | full |
| `admin-audit.spec.ts` | 14 | 2.1 min | full |
| `feed-index.spec.ts` | 30 | 1.9 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.7 min | full |
| `feed-route.spec.ts` | 22 | 1.6 min | full |
| `admin-shell.spec.ts` | 12 | 1.5 min | full |
| `posting-routes-dials.spec.ts` | 18 | 1.4 min | full |
| `i18n-sign-in-language.spec.ts` | 12 | 1.2 min | full |
| `admin-coverage.spec.ts` | 16 | 1.2 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `supabase-door.spec.ts` | 12 | 1.1 min | full |
| `name-check-queue.spec.ts` | 6 | 1.1 min | full |
| `phone-frame.spec.ts` | 18 | 1.0 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.0 min | full |
| `auth-caller-gates.spec.ts` | 8 | 1.0 min | full |
| `post-wizard-details.spec.ts` | 8 | 0.9 min | full |
| `legal-accept.spec.ts` | 12 | 0.9 min | full |
| `post-wizard-finder.spec.ts` | 8 | 0.8 min | full |
| `breadcrumbs.spec.ts` | 6 | 0.8 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.7 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.5 min | full |
| `legal-history.spec.ts` | 6 | 0.5 min | full |
| `admin-services.spec.ts` | 10 | 0.5 min | full |
| `category-image-routes.spec.ts` | 10 | 0.4 min | full |
| `account-saved.spec.ts` | 4 | 0.4 min | full |
| `settings.spec.ts` | 9 | 0.4 min | full |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `legal-pages.spec.ts` | 10 | 0.4 min | full |
| `rbac.spec.ts` | 6 | 0.4 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `seller-name-hidden.spec.ts` | 2 | 0.4 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.4 min | full |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `auth-reset.spec.ts` | 6 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `ad-page-layout.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | full |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `i18n-layers.spec.ts` | 6 | 0.1 min | full |
| `overlays.spec.ts` | 6 | 0.1 min | full |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | full |
| `fonts.spec.ts` | 2 | 0.0 min | full |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 205.5 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 144.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 123.6 s |
| `photo-pipeline.spec.ts` › PP-29 a photo that may not fit the ad is stored with a warning the seller sees and no visitor reads (D154 B3) | desktop-1280 | 69.1 s |
| `photo-pipeline.spec.ts` › PP-31 the background route: the seller's own cover only, two tries an ad, then spent; nothing stored (D159) | desktop-1280 | 61.7 s |
| `photo-pipeline.spec.ts` › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) | desktop-1280 | 61.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 56.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 55.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 55.3 s |
| `admin-categories-images.spec.ts` › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state | desktop-1280 | 55.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 53.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 51.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.5 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.1 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 40903121206-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 82 (pool 2, fresh 80)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 114 user(s) owned by process 40903121206-nightly
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"


  600 |
  601 |       // The page must land on /auth with the deactivated reason, never the signed-in screen.
> 602 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                          ^
  603 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  604 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  605 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:602:26
```

Context:

```text
          - listitem [ref=e343]:
            - generic [ref=e344]: About
          - listitem [ref=e345]:
            - generic [ref=e346]: Contact
      - navigation "Help" [ref=e347]:
        - heading "Help" [level=2] [ref=e348]
        - list [ref=e349]:
          - listitem [ref=e350]:
            - generic [ref=e351]: Safety
      - navigation "Legal" [ref=e352]:
        - heading "Legal" [level=2] [ref=e353]
        - list [ref=e354]:
          - listitem [ref=e355]:
            - link "Terms" [ref=e356] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e357]:
            - link "Privacy" [ref=e358] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e360]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('post-photo-editor')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('post-photo-editor')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('post-photo-editor')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('post-photo-editor')
    14 × locator resolved to 1 element
       - unexpected value "1"


  1629 |     await expect(box).toHaveAttribute("data-box", "0.0000,0.0000,0.8000,1.0000");
  1630 |     await editor.getByTestId("post-photo-editor-save").click();
> 1631 |     await expect(editor).toHaveCount(0);
       |                          ^
  1632 |     await expect
  1633 |       .poll(async () => (await photoRowsOf(listingId))[0]?.width, {
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-27-Edit-turns-a-photo-and-crops-the-cover-each-saved-in-its-place-D154-B2-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-24fb0-saved-in-its-place-D154-B2--desktop-1280`; this run carried 1 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-31 the background route: the seller's own cover only, two tries an ad, then spent; nothing stored (D159)

- Source: `full`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: apiRequestContext.post: Target page, context or browser has been closed
Call log:
  - → POST http://127.0.0.1:4173/api/listings/background
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - Authorization: Bearer [redacted-jwt]
    - content-length: 101


  1909 |     const [first, second] = await photoRowsOf(listingId);
  1910 |     const call = (body: Record<string, unknown>, bearer: string | null = token) =>
> 1911 |       page.request.post(BACKGROUND, {
       |                    ^
  1912 |         headers: {
  1913 |           "Content-Type": "application/json",
  1914 |           ...(bearer === null ? {} : { Authorization: `Bearer ${bearer}` }),
    at call (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1911:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1933:28
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-31-the-background-route-the-seller-s-own-cover-only-two-tries-an-ad-then-spent-nothing-stored-D159-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-a2e57--spent-nothing-stored-D159--desktop-1280`; this run carried 1 context file(s); of the same spec: none

## Server errors: full

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: full

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [client-error] legal landing read failed
[client-error] HTTP 400 POST /rest/v1/rpc/user_set_preferred_language ({"code":"P0001","details":null,"hint":null,"message":"account is deactivated"})
console.error: [client-error] legal landing read failed
```
