# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41035524031
- Commit: `ffb3ee6fecf357ad55666610c3acc42510618e19`
- Attempt: 1
- Written (UTC): 2026-10-30T10:12:12.790Z
- Passed: 2283 · Skipped: 294 · Failed: 13
- Gating failures: 13 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › mobile chrome › the bar and the band stay while the page scrolls — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### shell.spec.ts › mobile chrome › the bar and the band stay while the page scrolls

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 600
Received: 0

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 600
Received: 0

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1277 |     if (!before) throw new Error("Missing strip box");
  1278 |     await page.evaluate(() => window.scrollTo(0, 600));
> 1279 |     await expect
       |     ^
  1280 |       .poll(() => page.evaluate(() => Math.round(document.scrollingElement?.scrollTop ?? 0)))
  1281 |       .toBe(600);
  1282 |     const bar = await page.getByTestId("shell-topbar").locator("header").boundingBox();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1279:5
```

Context:

```text
          - listitem [ref=e182]:
            - generic [ref=e183]: About
          - listitem [ref=e184]:
            - generic [ref=e185]: Contact
      - navigation "Help" [ref=e186]:
        - heading "Help" [level=2] [ref=e187]
        - list [ref=e188]:
          - listitem [ref=e189]:
            - generic [ref=e190]: Safety
      - navigation "Legal" [ref=e191]:
        - heading "Legal" [level=2] [ref=e192]
        - list [ref=e193]:
          - listitem [ref=e194]:
            - link "Terms" [ref=e195] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e196]:
            - link "Privacy" [ref=e197] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e199]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 18 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: repeat

`repeat`: log unavailable.

63 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

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
| `gate fetch threw upstream ssr language gate timed out after <n>ms` | 1 | shard 3 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### gate fetch threw upstream ssr language gate timed out after <n>ms

- Count: 1 · Sources: shard 3
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): Edit, every segment but the current a link ×1 · SO-10 a signed-in tab's reload never shows the Sign in link before the account m ×1

```text
[WebServer] [ssr-error] /__root gate fetch threw upstream ssr language gate timed out after 1500ms
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: repeat

`repeat`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-30T09:56:43.850Z | 14.0 min |
| email | 2026-10-30T09:56:28.712Z | 0.4 min |
| shard 1 | 2026-10-30T09:56:34.682Z | 10.7 min |
| shard 2 | 2026-10-30T09:56:46.777Z | 13.9 min |
| shard 3 | 2026-10-30T09:57:03.098Z | 11.9 min |
| shard 4 | 2026-10-30T09:56:44.709Z | 8.7 min |
| shard 5 | 2026-10-30T09:56:55.190Z | 10.3 min |
| shard 6 | 2026-10-30T09:56:09.475Z | 8.1 min |
| shard 7 | 2026-10-30T09:56:51.497Z | 4.8 min |
| shard 8 | 2026-10-30T09:56:32.575Z | 7.4 min |
| shard 9 | 2026-10-30T09:57:30.602Z | 9.8 min |
| shard 10 | 2026-10-30T09:56:40.350Z | 11.7 min |
| shard 11 | 2026-10-30T09:57:05.179Z | 14.7 min |
| shard 12 | 2026-10-30T09:56:07.596Z | 6.8 min |
| shard 13 | 2026-10-30T09:56:36.588Z | 11.2 min |
| shard 14 | 2026-10-30T09:58:16.020Z | 8.8 min |
| shard 15 | 2026-10-30T09:56:41.537Z | 10.7 min |
| shard 16 | 2026-10-30T09:56:04.726Z | 2.7 min |
| repeat | 2026-10-30T09:54:33.720Z | 0.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 555 | 20.3 min | smoke, shard 8, shard 15, repeat |
| `auth-signout.spec.ts` | 68 | 6.5 min | smoke, shard 3, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.6 min | shard 5, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 1, shard 9 |
| `admin-translations-console.spec.ts` | 44 | 4.7 min | shard 3, shard 11 |
| `import-security.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `admin-screening.spec.ts` | 52 | 4.5 min | shard 3, shard 11 |
| `admin-roles.spec.ts` | 26 | 4.5 min | shard 2, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 2, shard 10 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.0 min | shard 6, shard 14 |
| `photo-pipeline.spec.ts` | 68 | 4.0 min | shard 5, shard 13 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 8, shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7, shard 15 |
| `post-wizard-place.spec.ts` | 38 | 3.7 min | shard 6, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 78 | 3.2 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 3.1 min | shard 2, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.8 min | shard 7, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.3 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.8 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.8 min | shard 1, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 18 | 1.6 min | shard 5, shard 13 |
| `legal-certify.spec.ts` | 42 | 1.5 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 2, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 3, shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `posting-routes-dials.spec.ts` | 18 | 0.9 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.8 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 7, shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 8, shard 16 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 5, shard 13 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 5, shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `submenu.spec.ts` | 10 | 0.1 min | shard 8, shard 16 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `submenu-look.spec.ts` | 10 | 0.1 min | shard 9, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `menu-rows.spec.ts` | 4 | 0.0 min | shard 8, shard 16 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.0 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.1 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41035524031-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41035524031-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 41035524031-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 41035524031-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 2, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 41035524031-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 2, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 41035524031-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 41035524031-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41035524031-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41035524031-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41035524031-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 41035524031-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 41035524031-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 41035524031-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 2, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 41035524031-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 41035524031-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41035524031-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41035524031-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41035524031-local-16
```

## shell.spec.ts › app shell › FT-1 the footer brand and three link columns fit every width

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 130
Received:    137
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 130
Received:    137

  625 |       const footer = await page.locator("footer").boundingBox();
  626 |       if (!footer) throw new Error("FT-1: missing footer");
> 627 |       if (viewport.width === 360) expect(footer.height).toBeLessThanOrEqual(130);
      |                                                         ^
  628 |     }
  629 |     // Bundle 22 turn 5 — the © line's text is centred at every width (the operator 2026-10-19).
  630 |     const copyrightCentre = await page.getByTestId("footer-copyright").evaluate((el) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:627:57
```

Context:

```text
          - listitem [ref=e199]:
            - generic [ref=e200]: About
          - listitem [ref=e201]:
            - generic [ref=e202]: Contact
      - navigation "Help" [ref=e203]:
        - heading "Help" [level=2] [ref=e204]
        - list [ref=e205]:
          - listitem [ref=e206]:
            - generic [ref=e207]: Safety
      - navigation "Legal" [ref=e208]:
        - heading "Legal" [level=2] [ref=e209]
        - list [ref=e210]:
          - listitem [ref=e211]:
            - link "Terms" [ref=e212] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e213]:
            - link "Privacy" [ref=e214] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e216]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › app shell › FT-1 the footer brand and three link columns fit every width

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    128
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    128

  605 |     if (viewport.width >= 768) {
  606 |       await expect(brand).toBeVisible();
> 607 |       expect(Math.abs(group.x + group.width / 2 - viewport.width / 2)).toBeLessThanOrEqual(2);
      |                                                                        ^
  608 |       expect(alignments).toHaveLength(3);
  609 |       for (const alignment of alignments) expect(["start", "left"]).toContain(alignment);
  610 |       const home = await brand.getByTestId("footer-home").boundingBox();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:607:72
```

Context:

```text
          - listitem [ref=e250]:
            - generic [ref=e251]: About
          - listitem [ref=e252]:
            - generic [ref=e253]: Contact
      - navigation "Help" [ref=e254]:
        - heading "Help" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Safety
      - navigation "Legal" [ref=e259]:
        - heading "Legal" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - link "Terms" [ref=e263] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e264]:
            - link "Privacy" [ref=e265] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e267]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › rail scroll regions (U0f) › footer never covers the rail's Sign out

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: rail must clear the footer and Sign out must be hit-testable

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
-   "clearsFooter": true,
+   "clearsFooter": false,
    "hits": true,
  }

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: rail must clear the footer and Sign out must be hit-testable

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
-   "clearsFooter": true,
+   "clearsFooter": false,
    "hits": true,
  }

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1973 |     await expect(signOut).toBeVisible();
  1974 |
> 1975 |     await expect
       |     ^
```

Context:

```text
          - listitem [ref=e289]:
            - generic [ref=e290]: ስለ እኛ
          - listitem [ref=e291]:
            - generic [ref=e292]: ያግኙን
      - navigation "እገዛ" [ref=e293]:
        - heading "እገዛ" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: ደህንነት
      - navigation "ሕጋዊ" [ref=e298]:
        - heading "ሕጋዊ" [level=2] [ref=e299]
        - list [ref=e300]:
          - listitem [ref=e301]:
            - link "ውሎች" [ref=e302] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e303]:
            - link "ግላዊነት" [ref=e304] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e306]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › desktop layout laws (U0g) › L1/L2: the top band and the rail stay put while content scrolls

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    256
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    256

  2167 |     // The footer owns the full viewport width beneath the clamped rail.
  2168 |     const footerAtBottom = await footRect(page);
> 2169 |     expect(Math.abs(footerAtBottom.x)).toBeLessThanOrEqual(1);
       |                                        ^
  2170 |     expect(Math.abs(footerAtBottom.width - (viewport?.width ?? 0))).toBeLessThanOrEqual(1);
  2171 |
  2172 |     // The clamped rail keeps its scroll region usable: its last item is
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2169:40
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    NaN

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    NaN

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  2190 |     const settle = async () => {
  2191 |       await page.evaluate(() => window.scrollTo(0, document.scrollingElement!.scrollHeight));
> 2192 |       await expect
       |       ^
  2193 |         .poll(async () =>
  2194 |           page.evaluate(() => {
  2195 |             const aside = document.querySelector('[data-testid="app-rail"]') as HTMLElement;
    at settle (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2192:7)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2206:5
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 664
Received:    800
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 664
Received:    800

  2259 |     const footer = await footRect(page);
  2260 |     const railAtBottom = await rect(page, "app-rail");
> 2261 |     expect(railAtBottom.bottom).toBeLessThanOrEqual(footer.top + 1);
       |                                 ^
  2262 |     // Still anchored under the fixed band — clamping changes the bottom only.
  2263 |     expect(Math.abs(railAtBottom.y - ROW1)).toBeLessThanOrEqual(1);
  2264 |     await expect(page.getByTestId("app-rail").getByTestId("rail-category-skeleton")).toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2261:33
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › app shell › FT-1 the footer brand and three link columns fit every width

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 130
Received:    137
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 130
Received:    137

  625 |       const footer = await page.locator("footer").boundingBox();
  626 |       if (!footer) throw new Error("FT-1: missing footer");
> 627 |       if (viewport.width === 360) expect(footer.height).toBeLessThanOrEqual(130);
      |                                                         ^
  628 |     }
  629 |     // Bundle 22 turn 5 — the © line's text is centred at every width (the operator 2026-10-19).
  630 |     const copyrightCentre = await page.getByTestId("footer-copyright").evaluate((el) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:627:57
```

Context:

```text
          - listitem [ref=e199]:
            - generic [ref=e200]: About
          - listitem [ref=e201]:
            - generic [ref=e202]: Contact
      - navigation "Help" [ref=e203]:
        - heading "Help" [level=2] [ref=e204]
        - list [ref=e205]:
          - listitem [ref=e206]:
            - generic [ref=e207]: Safety
      - navigation "Legal" [ref=e208]:
        - heading "Legal" [level=2] [ref=e209]
        - list [ref=e210]:
          - listitem [ref=e211]:
            - link "Terms" [ref=e212] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e213]:
            - link "Privacy" [ref=e214] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e216]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › app shell › FT-1 the footer brand and three link columns fit every width

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    128
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    128

  605 |     if (viewport.width >= 768) {
  606 |       await expect(brand).toBeVisible();
> 607 |       expect(Math.abs(group.x + group.width / 2 - viewport.width / 2)).toBeLessThanOrEqual(2);
      |                                                                        ^
  608 |       expect(alignments).toHaveLength(3);
  609 |       for (const alignment of alignments) expect(["start", "left"]).toContain(alignment);
  610 |       const home = await brand.getByTestId("footer-home").boundingBox();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:607:72
```

Context:

```text
          - listitem [ref=e250]:
            - generic [ref=e251]: About
          - listitem [ref=e252]:
            - generic [ref=e253]: Contact
      - navigation "Help" [ref=e254]:
        - heading "Help" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Safety
      - navigation "Legal" [ref=e259]:
        - heading "Legal" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - link "Terms" [ref=e263] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e264]:
            - link "Privacy" [ref=e265] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e267]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › rail scroll regions (U0f) › footer never covers the rail's Sign out

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: rail must clear the footer and Sign out must be hit-testable

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
-   "clearsFooter": true,
+   "clearsFooter": false,
    "hits": true,
  }

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: rail must clear the footer and Sign out must be hit-testable

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
-   "clearsFooter": true,
+   "clearsFooter": false,
    "hits": true,
  }

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1973 |     await expect(signOut).toBeVisible();
  1974 |
> 1975 |     await expect
       |     ^
```

Context:

```text
          - listitem [ref=e289]:
            - generic [ref=e290]: ስለ እኛ
          - listitem [ref=e291]:
            - generic [ref=e292]: ያግኙን
      - navigation "እገዛ" [ref=e293]:
        - heading "እገዛ" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: ደህንነት
      - navigation "ሕጋዊ" [ref=e298]:
        - heading "ሕጋዊ" [level=2] [ref=e299]
        - list [ref=e300]:
          - listitem [ref=e301]:
            - link "ውሎች" [ref=e302] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e303]:
            - link "ግላዊነት" [ref=e304] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e306]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › desktop layout laws (U0g) › L1/L2: the top band and the rail stay put while content scrolls

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    256
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    256

  2167 |     // The footer owns the full viewport width beneath the clamped rail.
  2168 |     const footerAtBottom = await footRect(page);
> 2169 |     expect(Math.abs(footerAtBottom.x)).toBeLessThanOrEqual(1);
       |                                        ^
  2170 |     expect(Math.abs(footerAtBottom.width - (viewport?.width ?? 0))).toBeLessThanOrEqual(1);
  2171 |
  2172 |     // The clamped rail keeps its scroll region usable: its last item is
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2169:40
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    NaN

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    NaN

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  2190 |     const settle = async () => {
  2191 |       await page.evaluate(() => window.scrollTo(0, document.scrollingElement!.scrollHeight));
> 2192 |       await expect
       |       ^
  2193 |         .poll(async () =>
  2194 |           page.evaluate(() => {
  2195 |             const aside = document.querySelector('[data-testid="app-rail"]') as HTMLElement;
    at settle (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2192:7)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2206:5
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 664
Received:    800
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 664
Received:    800

  2259 |     const footer = await footRect(page);
  2260 |     const railAtBottom = await rect(page, "app-rail");
> 2261 |     expect(railAtBottom.bottom).toBeLessThanOrEqual(footer.top + 1);
       |                                 ^
  2262 |     // Still anchored under the fixed band — clamping changes the bottom only.
  2263 |     expect(Math.abs(railAtBottom.y - ROW1)).toBeLessThanOrEqual(1);
  2264 |     await expect(page.getByTestId("app-rail").getByTestId("rail-category-skeleton")).toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2261:33
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## submenu-look.spec.ts › D248 a side panel is the main menu › SMN-E10 a 20-row panel fits at 1280×1000; at 1280×600 its rows reach 32 px, then it scrolls

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: SMN-E10 no scroll at 1000 px

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    240
--- further error 1 ---
Error: SMN-E10 no scroll at 1000 px

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    240

  174 |       await panel.evaluate((el) => el.scrollHeight - el.clientHeight),
  175 |       "SMN-E10 no scroll at 1000 px",
> 176 |     ).toBeLessThanOrEqual(1);
      |       ^
  177 |     await page.mouse.move(1200, 900);
  178 |     await expect(page.getByTestId("submenu-panel")).toHaveCount(0);
  179 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/submenu-look.spec.ts:176:7
```

Context:

```text
        - link "e2e-cat-local-16-3-vlllvu-k17" [ref=e392] [cursor=pointer]:
          - /url: /c/e2e-cat-local-16-3-vlllvu-k17
          - img [ref=e393]
          - generic [ref=e397]: e2e-cat-local-16-3-vlllvu-k17
      - listitem [ref=e398]:
        - link "e2e-cat-local-16-3-vlllvu-k18" [ref=e399] [cursor=pointer]:
          - /url: /c/e2e-cat-local-16-3-vlllvu-k18
          - img [ref=e400]
          - generic [ref=e404]: e2e-cat-local-16-3-vlllvu-k18
      - listitem [ref=e405]:
        - link "e2e-cat-local-16-3-vlllvu-k19" [ref=e406] [cursor=pointer]:
          - /url: /c/e2e-cat-local-16-3-vlllvu-k19
          - img [ref=e407]
          - generic [ref=e411]: e2e-cat-local-16-3-vlllvu-k19
      - listitem [ref=e412]:
        - link "e2e-cat-local-16-3-vlllvu-k20" [ref=e413] [cursor=pointer]:
          - /url: /c/e2e-cat-local-16-3-vlllvu-k20
          - img [ref=e414]
          - generic [ref=e418]: e2e-cat-local-16-3-vlllvu-k20
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 8

No `[ssr-error]` lines in the `shard 8` log (or no log was uploaded).

## Client errors: shard 8

No `[client-error]` lines in the `shard 8` log (or no log was uploaded).

## Server errors: shard 15

No `[ssr-error]` lines in the `shard 15` log (or no log was uploaded).

## Client errors: shard 15

No `[client-error]` lines in the `shard 15` log (or no log was uploaded).

## Server errors: shard 16

No `[ssr-error]` lines in the `shard 16` log (or no log was uploaded).

## Client errors: shard 16

No `[client-error]` lines in the `shard 16` log (or no log was uploaded).
