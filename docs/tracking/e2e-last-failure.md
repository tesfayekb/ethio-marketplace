# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40358294719
- Commit: `a8c025ef6aec24a7702b59bf4a740107c1bb0757`
- PLATFORM-ORIGIN? the head commit's subject is `Lovable update` — a Lovable auto-push, so suspect platform-injected code before ours.
- Attempt: 1
- Written (UTC): 2026-10-26T16:52:17.639Z
- Passed: 2226 · Skipped: 159 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · auth-signout.spec.ts › U0j sign-out hard reset › SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad — Error: expect(locator).toHaveAttribute(expected) failed

## Flaky bodies (DEC-078)

### auth-signout.spec.ts › U0j sign-out hard reset › SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271)

- Source: `smoke`
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
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21)
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21)
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21)
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
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

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-similar-anchor')
Expected: "shown"
Received: "waiting"
Timeout:  15000ms

Call log:
  - Expect "toHaveAttribute" with timeout 15000ms
  - waiting for getByTestId('listing-similar-anchor')
    19 × locator resolved to <div class="h-px" aria-hidden="true" data-similar="waiting" data-testid="listing-similar-anchor"></div>
       - unexpected value "waiting"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-similar-anchor')
Expected: "shown"
Received: "waiting"
Timeout:  15000ms

Call log:
  - Expect "toHaveAttribute" with timeout 15000ms
  - waiting for getByTestId('listing-similar-anchor')
    19 × locator resolved to <div class="h-px" aria-hidden="true" data-similar="waiting" data-testid="listing-similar-anchor"></div>
       - unexpected value "waiting"


  743 |     const anchor = page.getByTestId("listing-similar-anchor");
  744 |     await anchor.scrollIntoViewIfNeeded();
> 745 |     await expect(anchor).toHaveAttribute("data-similar", "shown", { timeout: 15000 });
      |                          ^
  746 |     const section = page.getByTestId("listing-similar");
  747 |     await expect(section).toBeVisible();
```

Context:

```text
          - listitem [ref=e254]:
            - generic [ref=e255]: About
          - listitem [ref=e256]:
            - generic [ref=e257]: Contact
      - navigation "Help" [ref=e258]:
        - heading "Help" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - generic [ref=e262]: Safety
      - navigation "Legal" [ref=e263]:
        - heading "Legal" [level=2] [ref=e264]
        - list [ref=e265]:
          - listitem [ref=e266]:
            - link "Terms" [ref=e267] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e268]:
            - link "Privacy" [ref=e269] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e271]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-26T16:24:05.408Z | 13.3 min |
| email | 2026-10-26T16:35:15.811Z | 0.3 min |
| shard 1 | 2026-10-26T16:23:26.559Z | 8.0 min |
| shard 2 | 2026-10-26T16:37:29.931Z | 13.9 min |
| shard 3 | 2026-10-26T16:25:59.662Z | 12.1 min |
| shard 4 | 2026-10-26T16:37:51.318Z | 7.9 min |
| shard 5 | 2026-10-26T16:24:06.424Z | 5.2 min |
| shard 6 | 2026-10-26T16:24:41.980Z | 9.6 min |
| shard 7 | 2026-10-26T16:24:15.310Z | 6.6 min |
| shard 8 | 2026-10-26T16:23:55.643Z | 5.4 min |
| shard 9 | 2026-10-26T16:24:10.961Z | 11.9 min |
| shard 10 | 2026-10-26T16:35:57.083Z | 11.3 min |
| shard 11 | 2026-10-26T16:23:45.977Z | 13.9 min |
| shard 12 | 2026-10-26T16:23:53.984Z | 8.5 min |
| shard 13 | 2026-10-26T16:32:12.071Z | 7.6 min |
| shard 14 | 2026-10-26T16:37:27.350Z | 9.5 min |
| shard 15 | 2026-10-26T16:24:14.905Z | 7.0 min |
| shard 16 | 2026-10-26T16:38:38.281Z | 7.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 436 | 18.1 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 64 | 8.0 min | smoke, shard 3, shard 11 |
| `import-security.spec.ts` | 36 | 5.7 min | shard 4, shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 6, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 5.3 min | shard 1, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 5.0 min | shard 7, shard 15 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 3, shard 11 |
| `admin-locations.spec.ts` | 38 | 4.3 min | shard 2, shard 10 |
| `admin-screening.spec.ts` | 52 | 4.3 min | shard 3, shard 11 |
| `admin-roles.spec.ts` | 26 | 4.2 min | shard 2, shard 11 |
| `post-wizard-place.spec.ts` | 38 | 4.0 min | shard 6, shard 14 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 9, shard 16 |
| `admin-categories-console.spec.ts` | 34 | 3.9 min | shard 2, shard 10 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 3.8 min | shard 1, shard 9 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7, shard 15 |
| `photo-pipeline.spec.ts` | 68 | 3.4 min | shard 5, shard 13 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.3 min | shard 2, shard 10 |
| `ad-page.spec.ts` | 76 | 3.2 min | shard 1, shard 9 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.0 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 6, shard 14 |
| `admin-listings.spec.ts` | 62 | 2.8 min | shard 2, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 7, shard 15 |
| `post-wizard-category.spec.ts` | 48 | 2.5 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 2, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.8 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 1, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 2, shard 10 |
| `legal-certify.spec.ts` | 42 | 1.5 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | shard 5, shard 13 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 3, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `supabase-door.spec.ts` | 10 | 0.3 min | shard 8, shard 16 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `settings.spec.ts` | 9 | 0.2 min | shard 8 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 4, shard 12 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 47.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 46.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.1 s |
| `auth-signout.spec.ts` › SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271) | mobile-360 | 35.4 s |
| `auth-signout.spec.ts` › SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271) | mobile-360 | 34.5 s |
| `auth-signout.spec.ts` › SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271) | desktop-1280 | 34.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40358294719-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40358294719-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40358294719-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 40358294719-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 2, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 40358294719-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40358294719-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40358294719-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40358294719-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40358294719-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40358294719-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40358294719-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40358294719-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40358294719-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40358294719-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40358294719-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40358294719-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40358294719-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40358294719-local-16
```

## auth-signout.spec.ts › U0j sign-out hard reset › SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271)

- Source: `smoke`
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

- Source: `shard 3`
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

- Source: `shard 11`
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

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×4
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21) ×3
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×3
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×5
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21) ×3
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×3
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×5
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21) ×3
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×3
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×4
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21) ×3
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×3
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×5
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21) ×3
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×2
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×2
```

## Server errors: shard 11

No `[ssr-error]` lines in the `shard 11` log (or no log was uploaded).

## Client errors: shard 11

```text
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×8
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21) ×2
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21)
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×2
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×6
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:27 at getResponse (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2202:20) at serverFnFetcher (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2159:9) at async client (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2510:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2441:20) at async userNext (http://127.0.0.1:4173/assets/createServerFn-DrI7aLUc.js:2427:21) ×3
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×3
[client-error] console.error: [client-error] gate fetch threw
```
