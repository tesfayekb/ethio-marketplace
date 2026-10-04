# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37174910086
- Commit: `3ba5aee79aef050e0027b5a7c57c681b71218c34`
- Attempt: 1
- Written (UTC): 2026-10-04T04:06:50.356Z
- Passed: 1140 · Skipped: 75 · Failed: 8
- Gating failures: 8 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save — Error: PW-130: the first suggestion is not built from the names

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-130: the first suggestion is not built from the names

expect(received).toContain(expected) // indexOf

Expected substring: "abebe"
Received string:    "zqsxgsxa"
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-130-a-refused-seller-name-offers-three-free-names-claimed-on-save-desktop-1280`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

111 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 5, shard 6 |
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
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-04T03:45:29.829Z | 14.5 min |
| email | 2026-10-04T03:45:29.523Z | 0.3 min |
| shard 1 | 2026-10-04T03:45:20.063Z | 18.1 min |
| shard 2 | 2026-10-04T03:45:22.462Z | 18.2 min |
| shard 3 | 2026-10-04T03:45:28.379Z | 16.9 min |
| shard 4 | 2026-10-04T03:45:23.231Z | 18.8 min |
| shard 5 | 2026-10-04T03:45:29.305Z | 21.0 min |
| shard 6 | 2026-10-04T03:45:25.384Z | 14.8 min |
| changed | 2026-10-04T03:45:20.991Z | 7.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 76 | 27.0 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 62 | 18.8 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 16.4 min | smoke, shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 10.6 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.5 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 28 | 9.4 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 32 | 8.4 min | shard 3, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.0 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 36 | 8.0 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 24 | 7.9 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 40 | 7.9 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 18 | 7.7 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 32 | 7.4 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 7.1 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 40 | 7.0 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 22 | 6.5 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 44 | 6.3 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 6.1 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 32 | 5.7 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 34 | 4.8 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 4.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.4 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 3.1 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 2.5 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.3 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.1 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.6 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.4 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.4 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | desktop-1280 | 74.6 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | mobile-360 | 72.1 s |
| `post-wizard-bundle2.spec.ts` › PW-127 picking a home country only selects; Next refuses until it is confirmed | desktop-1280 | 69.5 s |
| `post-wizard-bundle2.spec.ts` › PW-127 picking a home country only selects; Next refuses until it is confirmed | mobile-360 | 69.4 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | desktop-1280 | 68.3 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | mobile-360 | 67.3 s |
| `post-wizard-bundle2.spec.ts` › PW-127 picking a home country only selects; Next refuses until it is confirmed | mobile-360 | 64.1 s |
| `post-wizard-bundle2.spec.ts` › PW-127 picking a home country only selects; Next refuses until it is confirmed | desktop-1280 | 60.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 51.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 46.1 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 41.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 41.0 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | desktop-1280 | 40.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 39.8 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 38.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37174910086-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37174910086-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 12 (by method: GET 12; by code: UND_ERR_HEADERS_OVERFLOW 12; ran out: 4)
[e2e:teardown] deleted 8 user(s) owned by process 37174910086-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37174910086-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37174910086-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37174910086-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37174910086-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37174910086-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37174910086-changed
```

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator:  getByTestId('post-who-country')
Expected: disabled
Received: enabled
Timeout:  20000ms

Call log:
  - Expect "toBeDisabled" with timeout 20000ms
  - waiting for getByTestId('post-who-country')
    24 × locator resolved to <select id="post-who-country" data-testid="post-who-country" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "enabled"

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-123-Post-another-ad-opens-step-1-with-no-draft-carried-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-127 picking a home country only selects; Next refuses until it is confirmed

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator:  getByTestId('post-who-country')
Expected: disabled
Received: enabled
Timeout:  20000ms

Call log:
  - Expect "toBeDisabled" with timeout 20000ms
  - waiting for getByTestId('post-who-country')
    24 × locator resolved to <select id="post-who-country" data-testid="post-who-country" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "enabled"

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-127-picking-a-home-country-only-selects-Next-refuses-until-it-is-confirmed-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator:  getByTestId('post-who-country')
Expected: disabled
Received: enabled
Timeout:  20000ms

Call log:
  - Expect "toBeDisabled" with timeout 20000ms
  - waiting for getByTestId('post-who-country')
    24 × locator resolved to <select id="post-who-country" data-testid="post-who-country" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "enabled"

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-123-Post-another-ad-opens-step-1-with-no-draft-carried-desktop-1280`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-127 picking a home country only selects; Next refuses until it is confirmed

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator:  getByTestId('post-who-country')
Expected: disabled
Received: enabled
Timeout:  20000ms

Call log:
  - Expect "toBeDisabled" with timeout 20000ms
  - waiting for getByTestId('post-who-country')
    24 × locator resolved to <select id="post-who-country" data-testid="post-who-country" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "enabled"

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-127-picking-a-home-country-only-selects-Next-refuses-until-it-is-confirmed-desktop-1280`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator:  getByTestId('post-who-country')
Expected: disabled
Received: enabled
Timeout:  20000ms

Call log:
  - Expect "toBeDisabled" with timeout 20000ms
  - waiting for getByTestId('post-who-country')
    24 × locator resolved to <select id="post-who-country" data-testid="post-who-country" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "enabled"

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-123-Post-another-ad-opens-step-1-with-no-draft-carried-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-127 picking a home country only selects; Next refuses until it is confirmed

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator:  getByTestId('post-who-country')
Expected: disabled
Received: enabled
Timeout:  20000ms

Call log:
  - Expect "toBeDisabled" with timeout 20000ms
  - waiting for getByTestId('post-who-country')
    24 × locator resolved to <select id="post-who-country" data-testid="post-who-country" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "enabled"

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-127-picking-a-home-country-only-selects-Next-refuses-until-it-is-confirmed-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator:  getByTestId('post-who-country')
Expected: disabled
Received: enabled
Timeout:  20000ms

Call log:
  - Expect "toBeDisabled" with timeout 20000ms
  - waiting for getByTestId('post-who-country')
    24 × locator resolved to <select id="post-who-country" data-testid="post-who-country" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "enabled"

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-123-Post-another-ad-opens-step-1-with-no-draft-carried-desktop-1280`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-127 picking a home country only selects; Next refuses until it is confirmed

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator:  getByTestId('post-who-country')
Expected: disabled
Received: enabled
Timeout:  20000ms

Call log:
  - Expect "toBeDisabled" with timeout 20000ms
  - waiting for getByTestId('post-who-country')
    24 × locator resolved to <select id="post-who-country" data-testid="post-who-country" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "enabled"

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-127-picking-a-home-country-only-selects-Next-refuses-until-it-is-confirmed-desktop-1280`

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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
