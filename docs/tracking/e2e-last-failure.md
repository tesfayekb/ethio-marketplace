# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36882672052
- Commit: `6a33e31bf345131821698f36fb0c331b10d3dcb1`
- Attempt: 1
- Written (UTC): 2026-10-01T15:31:22.770Z
- Passed: 1034 · Skipped: 75 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

104 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 4 | shard 3, shard 6 |
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

- Count: 4 · Sources: shard 3, shard 6

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
| smoke | 2026-10-01T15:15:58.726Z | 9.3 min |
| email | 2026-10-01T15:16:03.474Z | 0.7 min |
| shard 1 | 2026-10-01T15:17:07.297Z | 13.7 min |
| shard 2 | 2026-10-01T15:15:49.397Z | 11.0 min |
| shard 3 | 2026-10-01T15:16:28.319Z | 9.4 min |
| shard 4 | 2026-10-01T15:15:48.169Z | 13.7 min |
| shard 5 | 2026-10-01T15:15:44.633Z | 11.1 min |
| shard 6 | 2026-10-01T15:15:48.806Z | 9.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 13.1 min | smoke, shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 8.5 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 52 | 8.2 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 34 | 6.0 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 5.8 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.4 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 22 | 5.3 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 5.1 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 38 | 4.8 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 34 | 4.8 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 4.7 min | shard 1, shard 5 |
| `post-wizard-category.spec.ts` | 40 | 4.5 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.2 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 4.0 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 22 | 3.9 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 26 | 3.8 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 32 | 3.4 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 22 | 3.3 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 2.9 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 36 | 2.8 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.3 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 10 | 1.8 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.0 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 6 | 0.8 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 0.8 min | shard 1, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `auth-signup.spec.ts` | 1 | 0.5 min | email |
| `post-wizard-details.spec.ts` | 4 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.4 min | smoke |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `category-image-routes.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.9 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 35.1 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 33.8 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 33.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.6 s |
| `auth-signup.spec.ts` › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle | email-serial | 31.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 30.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 29.5 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 28.5 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 28.5 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 28.3 s |
| `admin-attributes-links.spec.ts` › AT-59 the link editor's Save reflects change, saved and error | desktop-1280 | 27.5 s |
| `admin-attributes-editor.spec.ts` › AT-53 the allowed-values picker stores the map, reads it back, and withholds a target linked nowhere | desktop-1280 | 25.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 44 user(s) owned by process 36882672052-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 36882672052-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 51 user(s) owned by process 36882672052-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 129 user(s) owned by process 36882672052-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 92 user(s) owned by process 36882672052-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 41 user(s) owned by process 36882672052-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 131 user(s) owned by process 36882672052-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 90 user(s) owned by process 36882672052-6
```

## auth-signup.spec.ts › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle

- Source: `email`
- Project: `email-serial`

```text
Error: sign-up surfaced an error instead of check-email

expect(received).toBe(expected) // Object.is equality

Expected: "ok"
Received: "Something went wrong. Please try again."

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e75]:
            - generic [ref=e76]: About
          - listitem [ref=e77]:
            - generic [ref=e78]: How it works
      - navigation "Help" [ref=e79]:
        - heading "Help" [level=2] [ref=e80]
        - list [ref=e81]:
          - listitem [ref=e82]:
            - generic [ref=e83]: Safety
          - listitem [ref=e84]:
            - generic [ref=e85]: Contact
      - navigation "Legal" [ref=e86]:
        - heading "Legal" [level=2] [ref=e87]
        - list [ref=e88]:
          - listitem [ref=e89]:
            - generic [ref=e90]: Terms
          - listitem [ref=e91]:
            - generic [ref=e92]: Privacy
    - paragraph [ref=e94]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: email

No `[ssr-error]` lines in the `email` log (or no log was uploaded).

## Client errors: email

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2F127.0.0.1%3A4173%2Fauth%2Fcallback ({"code":"unexpected_failure","message":"Error sending confirmation email"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2F127.0.0.1%3A4173%2Fauth%2Fcallback ({"code":"unexpected_failure","message":"Error sending confirmation email"})
```
