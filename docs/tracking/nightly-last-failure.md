# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40374842423
- Commit: `f09ec2a90bc6fc4405b3ac5e5b1e53caab50e898`
- Attempt: 1
- Written (UTC): 2026-10-26T23:39:53.858Z
- Passed: 2046 · Skipped: 101 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

63 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

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
| `category tree read: upstream unavailable (<n>)` | 1 | full |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### category tree read: upstream unavailable (<n>)

- Count: 1 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AT-10 Used by names the category the attribute was assigned to (DB truth) ×1 · AT-11 remove from category unlinks it and the chip disappears (DB truth) ×1

```text
[WebServer] [ssr-error] /api/categories/tree category tree read: upstream unavailable (502)
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-26T18:26:57.350Z | 3.5 min |
| full | 2026-10-26T18:30:31.250Z | 309.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 68 | 15.8 min | full |
| `ad-page.spec.ts` | 76 | 12.7 min | full |
| `post-wizard-specs.spec.ts` | 82 | 12.3 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 12.0 min | full |
| `admin-listings.spec.ts` | 62 | 11.5 min | full |
| `shell.spec.ts` | 218 | 10.8 min | full |
| `admin-screening.spec.ts` | 52 | 10.7 min | full |
| `import-security.spec.ts` | 36 | 9.5 min | full |
| `posting-routes.spec.ts` | 80 | 9.0 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 8.6 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 7.9 min | full |
| `my-listings-ad.spec.ts` | 36 | 7.8 min | full |
| `post-wizard-place.spec.ts` | 38 | 7.5 min | full |
| `admin-attributes-library.spec.ts` | 42 | 7.4 min | full |
| `legal-certify.spec.ts` | 42 | 7.0 min | full |
| `admin-translations-governance.spec.ts` | 20 | 7.0 min | full |
| `post-wizard-category.spec.ts` | 48 | 6.9 min | full |
| `post-wizard-where.spec.ts` | 32 | 6.5 min | full |
| `admin-categories-console.spec.ts` | 34 | 6.3 min | full |
| `admin-attributes-links.spec.ts` | 34 | 6.2 min | full |
| `post-wizard-resets.spec.ts` | 34 | 6.1 min | full |
| `feed-screens.spec.ts` | 36 | 6.0 min | full |
| `admin-translations-console.spec.ts` | 46 | 5.9 min | full |
| `admin-locations.spec.ts` | 38 | 5.9 min | full |
| `admin-users.spec.ts` | 28 | 5.7 min | full |
| `ad-page-doors.spec.ts` | 30 | 5.3 min | full |
| `auth-signout.spec.ts` | 32 | 5.3 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 5.2 min | full |
| `viewing-place.spec.ts` | 22 | 5.2 min | full |
| `my-listings-doors.spec.ts` | 28 | 5.2 min | full |
| `admin-roles.spec.ts` | 26 | 5.1 min | full |
| `legal-admin.spec.ts` | 42 | 4.4 min | full |
| `admin-attributes-import.spec.ts` | 40 | 4.1 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 4.0 min | full |
| `my-listings-page.spec.ts` | 16 | 3.6 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `legal-doors.spec.ts` | 34 | 3.4 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 2.9 min | full |
| `feed-index.spec.ts` | 30 | 2.8 min | full |
| `admin-countries.spec.ts` | 18 | 2.7 min | full |
| `admin-audit.spec.ts` | 14 | 2.5 min | full |
| `admin-translations-data.spec.ts` | 10 | 2.5 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.3 min | full |
| `feed-route.spec.ts` | 22 | 2.2 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.8 min | full |
| `admin-shell.spec.ts` | 12 | 1.7 min | full |
| `posting-routes-dials.spec.ts` | 18 | 1.6 min | full |
| `admin-coverage.spec.ts` | 16 | 1.3 min | full |
| `post-wizard-details.spec.ts` | 8 | 1.3 min | full |
| `auth-caller-gates.spec.ts` | 8 | 1.2 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.2 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.2 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.1 min | full |
| `legal-accept.spec.ts` | 12 | 1.0 min | full |
| `supabase-door.spec.ts` | 10 | 1.0 min | full |
| `phone-frame.spec.ts` | 18 | 0.9 min | full |
| `breadcrumbs.spec.ts` | 6 | 0.9 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.8 min | full |
| `account-saved.spec.ts` | 4 | 0.7 min | full |
| `legal-history.spec.ts` | 6 | 0.6 min | full |
| `category-image-routes.spec.ts` | 10 | 0.6 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.6 min | full |
| `admin-services.spec.ts` | 10 | 0.5 min | full |
| `settings.spec.ts` | 9 | 0.5 min | full |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | full |
| `a11y.spec.ts` | 4 | 0.5 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.4 min | full |
| `legal-pages.spec.ts` | 10 | 0.4 min | full |
| `rbac.spec.ts` | 6 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.3 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `i18n-layers.spec.ts` | 6 | 0.1 min | full |
| `overlays.spec.ts` | 6 | 0.1 min | full |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | full |
| `fonts.spec.ts` | 2 | 0.0 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 223.4 s |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 204.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 56.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 54.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 53.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 53.0 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 52.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 47.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.0 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 39.7 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 36.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 35.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.1 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 35.1 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 40374842423-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 80 (pool 2, fresh 78)
[e2e:teardown] transport retries this run: 1 (by method: DELETE 1; by code: UND_ERR_SOCKET 1; ran out: 0)
[e2e:teardown] deleted 112 user(s) owned by process 40374842423-nightly
```

## auth-signout.spec.ts › U0j sign-out hard reset › SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271)

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('bottom-bar-sign-in')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('bottom-bar-sign-in')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('bottom-bar-sign-in')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('bottom-bar-sign-in')


  256 |     }
  257 |     // The site stays on screen, signed out — not the browser's own "cannot open" page.
> 258 |     await expect(signInMarker(page)).toBeVisible({ timeout: 15_000 });
      |                                      ^
  259 |     await expect(page.getByTestId("account-menu")).toHaveCount(0);
  260 |     await expect(page).toHaveURL(/\/$/);
  261 |     expect(loads, "no load is tried while offline").toBe(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:258:38
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## auth-signout.spec.ts › U0j sign-out hard reset › SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


  256 |     }
  257 |     // The site stays on screen, signed out — not the browser's own "cannot open" page.
> 258 |     await expect(signInMarker(page)).toBeVisible({ timeout: 15_000 });
      |                                      ^
  259 |     await expect(page.getByTestId("account-menu")).toHaveCount(0);
  260 |     await expect(page).toHaveURL(/\/$/);
  261 |     expect(loads, "no load is tried while offline").toBe(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:258:38
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

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
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×4
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21) ×3
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×3
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×6
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21) ×3
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×3
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
```
