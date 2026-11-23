# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45103676472
- Commit: `2c16001c4fbd0323284a1fbbe37b09142bdcc21d`
- Attempt: 1
- Repeat: 17 of 66 tests repeated — specs directly changed 1/3, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-23T03:17:44.277Z
- Passed: 2656 · Skipped: 366 · Failed: 1
- Gating failures: 1 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name — Error: approve-all never approved scratch location [account id]

## Flaky bodies (DEC-078)

### admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: approve-all never approved scratch location [account id]

expect(received).toBe(expected) // Object.is equality

Expected: "approved"
Received: "missing"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: approve-all never approved scratch location [account id]

expect(received).toBe(expected) // Object.is equality

Expected: "approved"
Received: "missing"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

  546 |       // 4. DB TRUTH per key — the assertion the summary can never stand in for.
  547 |       for (const anchor of [one, two]) {
> 548 |         await expect
      |         ^
  549 |           .poll(() => statusOf(anchor.id), {
  550 |             timeout: 30000,
  551 |             message: `approve-all never approved scratch location ${anchor.id}`,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:548:9
```

Context:

```text
          - listitem [ref=e912]:
            - generic [ref=e913]: About
          - listitem [ref=e914]:
            - generic [ref=e915]: Contact
      - navigation "Help" [ref=e916]:
        - heading "Help" [level=2] [ref=e917]
        - list [ref=e918]:
          - listitem [ref=e919]:
            - generic [ref=e920]: Safety
      - navigation "Legal" [ref=e921]:
        - heading "Legal" [level=2] [ref=e922]
        - list [ref=e923]:
          - listitem [ref=e924]:
            - link "Terms" [ref=e925] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e926]:
            - link "Privacy" [ref=e927] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e929]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 4, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 4, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 4, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 4, shard 8 |
| `categories file too large` (quiet) | 2 | shard 4 |
| `categories nulByte` (quiet) | 2 | shard 4 |
| `categories unknownColumn` (quiet) | 2 | shard 4 |
| `countries badHeader` (quiet) | 2 | shard 4 |
| `countries nulByte` (quiet) | 2 | shard 4 |
| `countries tooManyRows` (quiet) | 2 | shard 4 |
| `countries unknownColumn` (quiet) | 2 | shard 4 |
| `countries wrongFile` (quiet) | 2 | shard 4 |
| `definitions nulByte` (quiet) | 2 | shard 4 |
| `definitions tooManyRows` (quiet) | 2 | shard 4 |
| `definitions unknownColumn` (quiet) | 2 | shard 4 |
| `links unknownColumn` (quiet) | 2 | shard 4 |
| `locations badHeader` (quiet) | 2 | shard 4 |
| `locations file too large` (quiet) | 2 | shard 4 |
| `locations nulByte` (quiet) | 2 | shard 4 |
| `locations unknownColumn` (quiet) | 2 | shard 4 |
| `locations wrongFile` (quiet) | 2 | shard 4 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-23T03:07:11.544Z | 8.0 min |
| email | 2026-11-23T03:06:40.680Z | 0.3 min |
| webkit | 2026-11-23T03:07:18.148Z | 8.9 min |
| shard 1 | 2026-11-23T03:07:11.037Z | 5.5 min |
| shard 2 | 2026-11-23T03:07:38.723Z | 7.1 min |
| shard 3 | 2026-11-23T03:08:47.691Z | 7.6 min |
| shard 4 | 2026-11-23T03:07:14.665Z | 5.9 min |
| shard 5 | 2026-11-23T03:07:20.524Z | 6.6 min |
| shard 6 | 2026-11-23T03:07:39.197Z | 6.6 min |
| shard 7 | 2026-11-23T03:09:06.741Z | 5.4 min |
| shard 8 | 2026-11-23T03:07:21.428Z | 5.7 min |
| shard 9 | 2026-11-23T03:06:53.933Z | 6.5 min |
| shard 10 | 2026-11-23T03:07:08.893Z | 5.9 min |
| shard 11 | 2026-11-23T03:06:58.885Z | 6.6 min |
| shard 12 | 2026-11-23T03:07:45.984Z | 7.7 min |
| shard 13 | 2026-11-23T03:10:49.852Z | 6.3 min |
| shard 14 | 2026-11-23T03:07:35.529Z | 6.9 min |
| shard 15 | 2026-11-23T03:07:46.695Z | 6.3 min |
| shard 16 | 2026-11-23T03:08:23.249Z | 7.1 min |
| repeat | 2026-11-23T03:07:01.008Z | 7.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-categories-console.spec.ts` | 102 | 12.1 min | shard 7, repeat |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `admin-translations-console.spec.ts` | 46 | 8.7 min | smoke, shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 6.8 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.4 min | shard 3 |
| `admin-screening.spec.ts` | 64 | 5.9 min | webkit, shard 14 |
| `auth-signout.spec.ts` | 44 | 5.8 min | webkit, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 5.7 min | shard 12 |
| `photo-pipeline.spec.ts` | 74 | 5.4 min | webkit, shard 16 |
| `admin-listings.spec.ts` | 82 | 5.4 min | webkit, shard 10 |
| `import-security.spec.ts` | 36 | 5.2 min | shard 4 |
| `admin-locations.spec.ts` | 44 | 5.2 min | shard 6 |
| `ad-page.spec.ts` | 104 | 5.1 min | webkit, shard 13 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 4.9 min | shard 13 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 11 |
| `dialogs.spec.ts` | 36 | 4.8 min | webkit, shard 10 |
| `admin-users.spec.ts` | 28 | 4.7 min | shard 16 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-where.spec.ts` | 32 | 4.1 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 4.0 min | shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 4.0 min | shard 14 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 3.5 min | smoke, shard 10 |
| `posting-routes.spec.ts` | 80 | 3.3 min | shard 2 |
| `sage-bands.spec.ts` | 76 | 3.2 min | shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 3.1 min | smoke, shard 16 |
| `post-wizard-category.spec.ts` | 52 | 3.0 min | webkit, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 3.0 min | shard 3 |
| `admin-translations-data.spec.ts` | 10 | 2.9 min | shard 5 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 6 |
| `legal-certify.spec.ts` | 44 | 2.2 min | shard 14 |
| `mfa-stepup.spec.ts` | 24 | 2.0 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 1.9 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 11 |
| `sage-tiers.spec.ts` | 52 | 1.9 min | webkit, shard 2 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `phone-frame.spec.ts` | 18 | 1.6 min | shard 12 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 9 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `press.spec.ts` | 22 | 1.5 min | shard 12 |
| `admin-guides.spec.ts` | 14 | 1.5 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.4 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.2 min | shard 11 |
| `user-guides.spec.ts` | 18 | 1.1 min | shard 13 |
| `my-listings-page.spec.ts` | 24 | 1.1 min | webkit, shard 10 |
| `sage-shell.spec.ts` | 80 | 1.0 min | shard 16 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `house-style.spec.ts` | 14 | 0.8 min | shard 11 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 4 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 14 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `shell-bands.spec.ts` | 16 | 0.4 min | smoke, shard 12 |
| `page-head.spec.ts` | 4 | 0.4 min | shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-console.spec.ts` › TR-25 the picker creates a language with a native name and countries | desktop-1280 | 240.4 s |
| `admin-translations-data.spec.ts` › TR-26 the Data scope approves every machine-filled content name | desktop-1280 | 59.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.5 s |
| `auth-signout.spec.ts` › SO-14 a refresh the server refuses ends the session once: the notice offers sign-in, nothing says it could not be loaded, and the sign-in after it sticks (INC-1218) | mobile-360 | 39.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 35.6 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 34.2 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 33.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.0 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45103676472-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45103676472-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45103676472-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45103676472-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 45103676472-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45103676472-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45103676472-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45103676472-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45103676472-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45103676472-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 45103676472-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 45103676472-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45103676472-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45103676472-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45103676472-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45103676472-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45103676472-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 2, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 45 user(s) owned by process 45103676472-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45103676472-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45103676472-local-repeat
```

## admin-translations-console.spec.ts › U4b translations console › TR-25 the picker creates a language with a native name and countries

- Source: `smoke`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByTestId('translations-add-option-search')


  966 |         await expect(page.getByTestId("translations-add-picker")).toBeVisible({ timeout: 20000 });
  967 |         await page.getByTestId("translations-add-option").click();
> 968 |         await page.getByTestId("translations-add-option-search").fill("Swahili");
      |                                                                  ^
  969 |         await page.getByTestId(`translations-add-option-${code}`).click();
  970 |
  971 |         await expect(page.getByTestId("translations-add-code")).toHaveValue(code);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:968:66
```

Context:

```text
          - listitem [ref=e615]:
            - generic [ref=e616]: About
          - listitem [ref=e617]:
            - generic [ref=e618]: Contact
      - navigation "Help" [ref=e619]:
        - heading "Help" [level=2] [ref=e620]
        - list [ref=e621]:
          - listitem [ref=e622]:
            - generic [ref=e623]: Safety
      - navigation "Legal" [ref=e624]:
        - heading "Legal" [level=2] [ref=e625]
        - list [ref=e626]:
          - listitem [ref=e627]:
            - link "Terms" [ref=e628] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e629]:
            - link "Privacy" [ref=e630] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e632]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).
