# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36533275066
- Commit: `425039fa9ff3bc4d47d350fe9edad6df3863acab`
- Attempt: 1
- Written (UTC): 2026-09-29T07:08:06.578Z
- Passed: 978 · Skipped: 75 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · i18n-bundle.spec.ts › STAB-I18N · cached translation bundle › IB-2 publishing a fence language moves the version and the bundle — Error: an unpublished language serves no rows

## Flaky bodies (DEC-078)

### i18n-bundle.spec.ts › STAB-I18N · cached translation bundle › IB-2 publishing a fence language moves the version and the bundle

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: an unpublished language serves no rows

expect(received).toBeUndefined()

Received: "published value"
```

Context: context file not found for `i18n-bundle-STAB-I18N-cached-translation-bundle-IB-2-publishing-a-fence-language-moves-the-version-and-the-bundle-desktop-1280`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

111 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 5, shard 6 |
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
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
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
| `new row for relation <q> violates check constraint <q>` (quiet) | 2 | shard 3, shard 6 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · new row for relation <q> violates check constraint <q> ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-09-29T06:52:39.195Z | 12.0 min |
| email | 2026-09-29T06:52:39.592Z | 0.4 min |
| shard 1 | 2026-09-29T06:52:47.429Z | 15.0 min |
| shard 2 | 2026-09-29T06:52:35.116Z | 12.6 min |
| shard 3 | 2026-09-29T06:52:27.899Z | 11.5 min |
| shard 4 | 2026-09-29T06:52:31.913Z | 15.2 min |
| shard 5 | 2026-09-29T06:52:38.217Z | 13.3 min |
| shard 6 | 2026-09-29T06:52:32.350Z | 10.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 14.9 min | smoke, shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 10.1 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 26 | 9.2 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 36 | 9.1 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 8.6 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 48 | 8.6 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 32 | 7.7 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 24 | 7.1 min | shard 3, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 38 | 6.1 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 5.7 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 16 | 5.6 min | shard 3, shard 6 |
| `import-security.spec.ts` | 34 | 5.5 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 40 | 5.4 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 22 | 5.1 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 5.0 min | smoke, shard 2, shard 5 |
| `admin-locations.spec.ts` | 34 | 4.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 22 | 4.2 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 4.2 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 3.9 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 3.3 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 2.6 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 30 | 2.3 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.4 min | shard 1, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 0.9 min | shard 1, shard 4 |
| `admin-categories-images.spec.ts` | 2 | 0.6 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-pricing.spec.ts` › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount | desktop-1280 | 50.2 s |
| `post-wizard-pricing.spec.ts` › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount | mobile-360 | 47.4 s |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | mobile-360 | 44.3 s |
| `admin-attributes-editor.spec.ts` › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere | desktop-1280 | 43.3 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 42.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.5 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 40.5 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 40.2 s |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | desktop-1280 | 40.0 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 38.9 s |
| `admin-translations-data.spec.ts` › TR-26 the Data scope approves every machine-filled content name | desktop-1280 | 38.8 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 38.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.3 s |
| `admin-attributes-library.spec.ts` › AT-4 card picker: two ranked attributes clear the amber flag | desktop-1280 | 37.5 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 36.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 44 user(s) owned by process 36533275066-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 4 user(s) owned by process 36533275066-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 47 user(s) owned by process 36533275066-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 111 user(s) owned by process 36533275066-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 87 user(s) owned by process 36533275066-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 41 user(s) owned by process 36533275066-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 121 user(s) owned by process 36533275066-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 73 user(s) owned by process 36533275066-6
```

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).not.toHaveAttribute(expected) failed

Locator:  getByTestId('post-price-currency')
Expected: not ""
Received: ""
Timeout:  10000ms

Call log:
  - Expect "not toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-price-currency')
    14 × locator resolved to <span data-code="" class="sr-only" data-testid="post-price-currency">Choose a currency</span>
       - unexpected value ""

```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-10-pricing-currency-comes-before-the-amount-a-locked-period-shows-no-line-and-free-hides-the-amount-mobile-360`

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).not.toHaveAttribute(expected) failed

Locator:  getByTestId('post-price-currency')
Expected: not ""
Received: ""
Timeout:  10000ms

Call log:
  - Expect "not toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-price-currency')
    14 × locator resolved to <span data-code="" class="sr-only" data-testid="post-price-currency">Choose a currency</span>
       - unexpected value ""

```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-10-pricing-currency-comes-before-the-amount-a-locked-period-shows-no-line-and-free-hides-the-amount-desktop-1280`

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_bp_check"
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_bp_check"
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
