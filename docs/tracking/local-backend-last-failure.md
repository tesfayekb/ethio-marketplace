# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40519893778
- Commit: `a308c6b37bcced92f89d7d0f367adc7fe476d224`
- Attempt: 1
- Written (UTC): 2026-10-27T14:40:45.739Z
- Passed: 1715 · Skipped: 148 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 4, shard 6, shard 8, shard 9, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16
- Sources without results: shard 3, shard 5, shard 7, shard 12
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 6` · post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans — Error: PW-30: no place was chosen

## Flaky bodies (DEC-078)

### post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: PW-30: no place was chosen
PW-30 step timings: signed in @ 906 ms | category and specifications seeded @ 1061 ms | step 3 reached @ 1842 ms | specifications answered @ 2260 ms | step 6 open @ 3210 ms | tree served @ 3232 ms

expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-where-chosen')
Expected: "1"
Received: "0"
Timeout:  20000ms

Call log:
  - PW-30: no place was chosen
PW-30 step timings: signed in @ 906 ms | category and specifications seeded @ 1061 ms | step 3 reached @ 1842 ms | specifications answered @ 2260 ms | step 6 open @ 3210 ms | tree served @ 3232 ms with timeout 20000ms
  - waiting for getByTestId('post-where-chosen')
    24 × locator resolved to <ul data-count="0" class="space-y-1" data-testid="post-where-chosen"></ul>
       - unexpected value "0"

--- further error 1 ---
Error: PW-30: no place was chosen
PW-30 step timings: signed in @ 906 ms | category and specifications seeded @ 1061 ms | step 3 reached @ 1842 ms | specifications answered @ 2260 ms | step 6 open @ 3210 ms | tree served @ 3232 ms

expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-where-chosen')
Expected: "1"
Received: "0"
Timeout:  20000ms

Call log:
  - PW-30: no place was chosen
PW-30 step timings: signed in @ 906 ms | category and specifications seeded @ 1061 ms | step 3 reached @ 1842 ms | specifications answered @ 2260 ms | step 6 open @ 3210 ms | tree served @ 3232 ms with timeout 20000ms
  - waiting for getByTestId('post-where-chosen')
    24 × locator resolved to <ul data-count="0" class="space-y-1" data-testid="post-where-chosen"></ul>
       - unexpected value "0"


  780 |       page.getByTestId("post-where-chosen"),
  781 |       why("PW-30: no place was chosen"),
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-mobile-360`; this run carried 0 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (14 of 18 results files read, 14 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 4, shard 6, shard 8, shard 9, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16 · unavailable: shard 3, shard 5, shard 7, shard 12

`shard 3`, `shard 5`, `shard 7`, `shard 12`: log unavailable.

35 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 3 | shard 2, shard 4, shard 10 |
| `categories wrongFile` (quiet) | 3 | shard 2, shard 4, shard 10 |
| `definitions badHeader` (quiet) | 3 | shard 1, shard 4, shard 9 |
| `definitions wrongFile` (quiet) | 3 | shard 1, shard 4, shard 9 |
| `categories file too large` (quiet) | 1 | shard 4 |
| `categories nulByte` (quiet) | 1 | shard 4 |
| `categories unknownColumn` (quiet) | 1 | shard 4 |
| `countries badHeader` (quiet) | 1 | shard 4 |
| `countries nulByte` (quiet) | 1 | shard 4 |
| `countries tooManyRows` (quiet) | 1 | shard 4 |
| `countries unknownColumn` (quiet) | 1 | shard 4 |
| `countries wrongFile` (quiet) | 1 | shard 4 |
| `definitions nulByte` (quiet) | 1 | shard 4 |
| `definitions tooManyRows` (quiet) | 1 | shard 4 |
| `definitions unknownColumn` (quiet) | 1 | shard 4 |
| `links unknownColumn` (quiet) | 1 | shard 4 |
| `locations badHeader` (quiet) | 1 | shard 4 |
| `locations file too large` (quiet) | 1 | shard 4 |
| `locations nulByte` (quiet) | 1 | shard 4 |
| `locations unknownColumn` (quiet) | 1 | shard 4 |
| `locations wrongFile` (quiet) | 1 | shard 4 |
| `strings badHeader` (quiet) | 1 | shard 4 |
| `strings emptyFile` (quiet) | 1 | shard 4 |
| `strings nulByte` (quiet) | 1 | shard 4 |
| `strings tooManyRows` (quiet) | 1 | shard 4 |
| `strings unknownColumn` (quiet) | 1 | shard 4 |
| `strings wrongFile` (quiet) | 1 | shard 4 |

Quiet (allowlisted): categories badHeader ×3 · categories wrongFile ×3 · definitions badHeader ×3 · definitions wrongFile ×3 · categories file too large ×1 · categories nulByte ×1 · categories unknownColumn ×1 · countries badHeader ×1 · countries nulByte ×1 · countries tooManyRows ×1 · countries unknownColumn ×1 · countries wrongFile ×1 · definitions nulByte ×1 · definitions tooManyRows ×1 · definitions unknownColumn ×1 · links unknownColumn ×1 · locations badHeader ×1 · locations file too large ×1 · locations nulByte ×1 · locations unknownColumn ×1 · locations wrongFile ×1 · strings badHeader ×1 · strings emptyFile ×1 · strings nulByte ×1 · strings tooManyRows ×1 · strings unknownColumn ×1 · strings wrongFile ×1

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 4, shard 6, shard 8, shard 9, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16 · unavailable: shard 3, shard 5, shard 7, shard 12

`shard 3`, `shard 5`, `shard 7`, `shard 12`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 4, shard 6, shard 8, shard 9, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16 · unavailable: shard 3, shard 5, shard 7, shard 12

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-27T14:21:47.017Z | 13.4 min |
| email | 2026-10-27T14:21:35.285Z | 0.4 min |
| shard 1 | 2026-10-27T14:21:25.366Z | 9.0 min |
| shard 2 | 2026-10-27T14:23:23.766Z | 13.8 min |
| shard 4 | 2026-10-27T14:21:13.236Z | 7.7 min |
| shard 6 | 2026-10-27T14:23:06.930Z | 10.2 min |
| shard 8 | 2026-10-27T14:22:15.483Z | 6.0 min |
| shard 9 | 2026-10-27T14:22:08.520Z | 12.0 min |
| shard 10 | 2026-10-27T14:21:13.011Z | 11.6 min |
| shard 11 | 2026-10-27T14:23:06.579Z | 12.1 min |
| shard 13 | 2026-10-27T14:21:23.384Z | 7.4 min |
| shard 14 | 2026-10-27T14:21:43.532Z | 8.2 min |
| shard 15 | 2026-10-27T14:21:31.956Z | 6.0 min |
| shard 16 | 2026-10-27T14:21:36.639Z | 7.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 436 | 19.0 min | smoke, shard 8, shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 5.3 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.9 min | shard 6, shard 14 |
| `auth-signout.spec.ts` | 48 | 4.6 min | smoke, shard 11 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.2 min | shard 6, shard 14 |
| `admin-roles.spec.ts` | 26 | 4.1 min | shard 2, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 9, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.8 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 2, shard 10 |
| `admin-listings.spec.ts` | 62 | 3.2 min | shard 2, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 76 | 2.9 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 6, shard 14 |
| `import-security.spec.ts` | 18 | 2.4 min | shard 4 |
| `feed-screens.spec.ts` | 18 | 2.4 min | shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 1, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.3 min | shard 6, shard 14 |
| `post-wizard-specs.spec.ts` | 41 | 2.2 min | shard 15 |
| `admin-translations-console.spec.ts` | 22 | 2.2 min | shard 11 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 34 | 2.0 min | shard 13 |
| `admin-screening.spec.ts` | 26 | 1.9 min | shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.8 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 14 | 1.8 min | shard 11 |
| `post-wizard-where.spec.ts` | 16 | 1.7 min | shard 15 |
| `my-listings-ad.spec.ts` | 18 | 1.7 min | shard 13 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 2, shard 10 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 2, shard 10 |
| `posting-routes.spec.ts` | 40 | 1.1 min | shard 15 |
| `admin-translations-data.spec.ts` | 5 | 1.0 min | shard 11 |
| `admin-translations-governance.spec.ts` | 4 | 0.9 min | shard 11 |
| `legal-admin.spec.ts` | 21 | 0.8 min | shard 4 |
| `phone-frame.spec.ts` | 9 | 0.8 min | shard 13 |
| `mfa-stepup.spec.ts` | 9 | 0.8 min | shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `legal-certify.spec.ts` | 21 | 0.7 min | shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 6, shard 14 |
| `locations-tree.spec.ts` | 4 | 0.5 min | shard 13 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `my-listings-page.spec.ts` | 8 | 0.5 min | shard 13 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `admin-shell.spec.ts` | 6 | 0.4 min | shard 11 |
| `legal-doors.spec.ts` | 17 | 0.4 min | shard 13 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `i18n-bundle.spec.ts` | 3 | 0.3 min | shard 4 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `posting-routes-catalog.spec.ts` | 9 | 0.3 min | shard 15 |
| `my-listings-doors.spec.ts` | 14 | 0.2 min | shard 13 |
| `posting-routes-dials.spec.ts` | 9 | 0.2 min | shard 15 |
| `auth-caller-gates.spec.ts` | 4 | 0.2 min | shard 11 |
| `legal-accept.spec.ts` | 6 | 0.2 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `legal-pages.spec.ts` | 5 | 0.2 min | shard 13 |
| `primitives-law.spec.ts` | 12 | 0.1 min | shard 15 |
| `post-wizard-units.spec.ts` | 2 | 0.1 min | shard 15 |
| `i18n-coverage.spec.ts` | 7 | 0.1 min | shard 4 |
| `feed-route.spec.ts` | 11 | 0.1 min | shard 4 |
| `house-style.spec.ts` | 6 | 0.1 min | shard 4 |
| `legal-history.spec.ts` | 3 | 0.1 min | shard 13 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `breadcrumbs.spec.ts` | 3 | 0.1 min | shard 11 |
| `admin-services.spec.ts` | 5 | 0.1 min | shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `category-nav.spec.ts` | 5 | 0.1 min | shard 4 |
| `feed-index.spec.ts` | 15 | 0.1 min | shard 4 |
| `layout.spec.ts` | 5 | 0.1 min | shard 4 |
| `posting-routes-identity.spec.ts` | 2 | 0.1 min | shard 15 |
| `on-demand-failure.spec.ts` | 1 | 0.0 min | shard 13 |
| `i18n-layers.spec.ts` | 3 | 0.0 min | shard 4 |
| `overlays.spec.ts` | 3 | 0.0 min | shard 13 |
| `category-image-routes.spec.ts` | 5 | 0.0 min | shard 11 |
| `fonts.spec.ts` | 1 | 0.0 min | shard 4 |
| `geo.spec.ts` | 5 | 0.0 min | shard 4 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 29.8 s |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | mobile-360 | 29.2 s |
| `auth-signout.spec.ts` › SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268) | mobile-360 | 28.5 s |
| `auth-signout.spec.ts` › SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268) | desktop-1280 | 28.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40519893778-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40519893778-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40519893778-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 40519893778-local-2
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40519893778-local-4
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40519893778-local-6
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40519893778-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40519893778-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40519893778-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40519893778-local-11
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40519893778-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40519893778-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40519893778-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40519893778-local-16
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 7

No `[ssr-error]` lines in the `shard 7` log (or no log was uploaded).

## Client errors: shard 7

No `[client-error]` lines in the `shard 7` log (or no log was uploaded).

## Server errors: shard 12

No `[ssr-error]` lines in the `shard 12` log (or no log was uploaded).

## Client errors: shard 12

No `[client-error]` lines in the `shard 12` log (or no log was uploaded).

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 7: no results file

shard 7: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 12: no results file

shard 12: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
