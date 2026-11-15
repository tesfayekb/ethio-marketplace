# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43667309422
- Commit: `acf43ebd3d6f4e01800831f941397f8311a3d73d`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-15T02:45:29.983Z
- Passed: 2527 · Skipped: 360 · Failed: 18
- Gating failures: 18 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 13` · submenu-touch.spec.ts › SMN-E3 a tap opens the page and the panel; rows fit between 32 and 48 px, panel rows the rail's — Error: SMN-E3 a panel row is at most the rail's (D248)

## Flaky bodies (DEC-078)

### submenu-touch.spec.ts › SMN-E3 a tap opens the page and the panel; rows fit between 32 and 48 px, panel rows the rail's

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: SMN-E3 a panel row is at most the rail's (D248)

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 42.5
Received:    44.265625
--- further error 1 ---
Error: SMN-E3 a panel row is at most the rail's (D248)

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 42.5
Received:    44.265625

  63 |     .evaluate((el) => (el.closest("li") ?? el).getBoundingClientRect().height);
  64 |   for (const height of panelRows) {
> 65 |     expect(height, "SMN-E3 a panel row is at most the rail's (D248)").toBeLessThanOrEqual(
     |                                                                       ^
  66 |       railRow + 1,
  67 |     );
  68 |     expect(height, "SMN-E3 a panel row keeps the 32 px floor (D248)").toBeGreaterThanOrEqual(31.5);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/submenu-touch.spec.ts:65:71
```

Context:

```text
        - link "Printers & Office Electronics" [ref=e371] [cursor=pointer]:
          - /url: /c/printers-office
          - img [ref=e373]
          - generic [ref=e378]: Printers & Office Electronics
      - listitem [ref=e379]:
        - link "Accessories & Parts" [ref=e380] [cursor=pointer]:
          - /url: /c/electronics-accessories
          - img [ref=e382]
          - generic [ref=e387]: Accessories & Parts
      - listitem [ref=e388]:
        - link "Repair & Maintenance" [ref=e389] [cursor=pointer]:
          - /url: /c/repair-maintenance
          - img [ref=e391]
          - generic [ref=e396]: Repair & Maintenance
      - listitem [ref=e397]:
        - link "Other Electronics" [ref=e398] [cursor=pointer]:
          - /url: /c/other-electronics
          - img [ref=e400]
          - generic [ref=e405]: Other Electronics
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-15T02:34:20.708Z | 4.0 min |
| email | 2026-11-15T02:33:58.869Z | 0.3 min |
| webkit | 2026-11-15T02:37:54.904Z | 7.2 min |
| shard 1 | 2026-11-15T02:34:51.637Z | 6.2 min |
| shard 2 | 2026-11-15T02:34:00.999Z | 6.2 min |
| shard 3 | 2026-11-15T02:34:38.847Z | 7.9 min |
| shard 4 | 2026-11-15T02:34:33.228Z | 8.8 min |
| shard 5 | 2026-11-15T02:33:55.255Z | 6.5 min |
| shard 6 | 2026-11-15T02:35:01.084Z | 7.2 min |
| shard 7 | 2026-11-15T02:36:57.994Z | 5.3 min |
| shard 8 | 2026-11-15T02:34:27.725Z | 6.3 min |
| shard 9 | 2026-11-15T02:35:06.713Z | 6.6 min |
| shard 10 | 2026-11-15T02:34:43.592Z | 7.1 min |
| shard 11 | 2026-11-15T02:33:53.889Z | 5.8 min |
| shard 12 | 2026-11-15T02:34:32.329Z | 6.8 min |
| shard 13 | 2026-11-15T02:33:58.588Z | 5.0 min |
| shard 14 | 2026-11-15T02:33:59.522Z | 5.3 min |
| shard 15 | 2026-11-15T02:34:24.750Z | 7.4 min |
| shard 16 | 2026-11-15T02:35:44.394Z | 5.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.6 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 7.2 min | shard 2 |
| `admin-listings.spec.ts` | 78 | 6.7 min | webkit, shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.6 min | shard 3 |
| `import-security.spec.ts` | 36 | 6.5 min | shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 5.7 min | shard 15 |
| `admin-locations.spec.ts` | 38 | 5.6 min | shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 5.1 min | shard 12 |
| `admin-roles.spec.ts` | 28 | 5.1 min | shard 9 |
| `admin-translations-console.spec.ts` | 46 | 5.1 min | smoke, shard 8 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `admin-categories-home.spec.ts` | 10 | 4.8 min | shard 4 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 11 |
| `admin-monetisation.spec.ts` | 34 | 4.5 min | smoke, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `admin-screening.spec.ts` | 58 | 4.4 min | webkit, shard 14 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 13 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `photo-pipeline.spec.ts` | 74 | 3.9 min | webkit, shard 16 |
| `admin-attributes-safety.spec.ts` | 18 | 3.8 min | shard 5 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `auth-signout.spec.ts` | 36 | 3.7 min | shard 9 |
| `sage-bands.spec.ts` | 76 | 3.6 min | shard 6 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 3.6 min | shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 3.5 min | shard 8 |
| `post-wizard-category.spec.ts` | 52 | 3.5 min | webkit, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 3.2 min | shard 3 |
| `admin-translations-governance.spec.ts` | 20 | 3.1 min | smoke, shard 16 |
| `dialogs.spec.ts` | 20 | 3.1 min | webkit, shard 10 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 2.6 min | shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 8 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-audit.spec.ts` | 16 | 2.1 min | shard 9 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `mfa-stepup.spec.ts` | 22 | 1.9 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `admin-guides.spec.ts` | 14 | 1.6 min | shard 3 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `one-line-slots-admin.spec.ts` | 10 | 1.5 min | shard 3 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `my-listings-page.spec.ts` | 20 | 1.3 min | webkit, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 12 |
| `press.spec.ts` | 22 | 1.2 min | shard 12 |
| `name-check-queue.spec.ts` | 8 | 1.1 min | smoke, shard 9 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `my-listings-levels.spec.ts` | 28 | 0.9 min | shard 4 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 15 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.8 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `legal-doors.spec.ts` | 34 | 0.7 min | smoke, shard 8 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `posting-routes-dials.spec.ts` | 14 | 0.5 min | shard 9 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 3 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `overlay-shift.spec.ts` | 6 | 0.2 min | shard 6 |
| `rbac.spec.ts` | 6 | 0.1 min | shard 7 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-library.spec.ts` › AT-5 delete: refused while linked, accepted once unlinked | desktop-1280 | 68.8 s |
| `admin-attributes-library.spec.ts` › AT-5 delete: refused while linked, accepted once unlinked | mobile-360 | 67.8 s |
| `admin-categories-home.spec.ts` › CT-38 a retired category with a child is not deleted until the child moves away | mobile-360 | 58.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-17 create flow: two steps, chained countries + position, image | desktop-1280 | 58.5 s |
| `admin-categories-home.spec.ts` › CT-40 the delete door's refusals read as words, never as keys | mobile-360 | 58.2 s |
| `admin-categories-home.spec.ts` › CT-40 the delete door's refusals read as words, never as keys | desktop-1280 | 58.0 s |
| `admin-categories-home.spec.ts` › CT-38 a retired category with a child is not deleted until the child moves away | desktop-1280 | 57.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-17 create flow: two steps, chained countries + position, image | mobile-360 | 56.6 s |
| `admin-attributes-safety.spec.ts` › AT-74 a merge is refused while a listing holds a source's answer, and merges when none does | mobile-360 | 55.5 s |
| `admin-attributes-safety.spec.ts` › AT-74 a merge is refused while a listing holds a source's answer, and merges when none does | desktop-1280 | 55.2 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 54.0 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 47.4 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43667309422-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43667309422-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 43667309422-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43667309422-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 43667309422-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43667309422-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 43667309422-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 43667309422-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43667309422-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43667309422-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 3, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 43667309422-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 43667309422-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43667309422-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43667309422-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43667309422-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43667309422-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 43667309422-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 43667309422-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 43667309422-local-16
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete

expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-delete-blast')
Expected substring: "1"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete with timeout 20000ms
  - waiting for getByTestId('attribute-delete-blast')

--- further error 1 ---
Error: [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete

expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-delete-blast')
Expected substring: "1"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete with timeout 20000ms
  - waiting for getByTestId('attribute-delete-blast')


  265 |           page.getByTestId("attribute-delete-blast"),
  266 |           await dialogDump(page, "AT-5 refusal never restated the blast radius"),
> 267 |         ).toContainText("1", { timeout: 20000 });
      |           ^
  268 |         await expect(page.getByTestId("attribute-dialog-error")).toHaveCount(0);
  269 |       });
```

Context:

```text
                - link:
                  - /url: /privacy
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [active] [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e4]
    - generic [ref=e5]:
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - generic [ref=e7]:
        - generic [ref=e8]: Type e2e_attr_ujrfaz to confirm
        - textbox "Type e2e_attr_ujrfaz to confirm" [ref=e9]: e2e_attr_ujrfaz
      - alert [ref=e10]: deleteHasLinks:1
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-14 a categories:view-only user reads the library and every write door refuses

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  861 |         [attributeId, key],
  862 |       );
> 863 |       expect(denials.upsert).toContain("permission denied");
      |                              ^
  864 |       expect(denials.link).toContain("permission denied");
  865 |       expect(denials.del).toContain("permission denied");
  866 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:863:30
```

Context:

```text
          - listitem [ref=e219]:
            - generic [ref=e220]: About
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Help" [ref=e223]:
        - heading "Help" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Safety
      - navigation "Legal" [ref=e228]:
        - heading "Legal" [level=2] [ref=e229]
        - list [ref=e230]:
          - listitem [ref=e231]:
            - link "Terms" [ref=e232] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e233]:
            - link "Privacy" [ref=e234] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e236]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete

expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-delete-blast')
Expected substring: "1"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete with timeout 20000ms
  - waiting for getByTestId('attribute-delete-blast')

--- further error 1 ---
Error: [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete

expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-delete-blast')
Expected substring: "1"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete with timeout 20000ms
  - waiting for getByTestId('attribute-delete-blast')


  265 |           page.getByTestId("attribute-delete-blast"),
  266 |           await dialogDump(page, "AT-5 refusal never restated the blast radius"),
> 267 |         ).toContainText("1", { timeout: 20000 });
      |           ^
  268 |         await expect(page.getByTestId("attribute-dialog-error")).toHaveCount(0);
  269 |       });
```

Context:

```text
                - link:
                  - /url: /privacy
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [active] [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e4]
    - generic [ref=e5]:
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - generic [ref=e7]:
        - generic [ref=e8]: Type e2e_attr_jqu7j5 to confirm
        - textbox "Type e2e_attr_jqu7j5 to confirm" [ref=e9]: e2e_attr_jqu7j5
      - alert [ref=e10]: deleteHasLinks:1
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-14 a categories:view-only user reads the library and every write door refuses

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  861 |         [attributeId, key],
  862 |       );
> 863 |       expect(denials.upsert).toContain("permission denied");
      |                              ^
  864 |       expect(denials.link).toContain("permission denied");
  865 |       expect(denials.del).toContain("permission denied");
  866 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:863:30
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

## admin-categories-home.spec.ts › Bundle 7 category doors › CT-38 a retired category with a child is not deleted until the child moves away

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('category-dialog-error')
Expected: "1 categories sit under this one. Move or delete them first."
Received: "deleteHasChildren:1"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('category-dialog-error')
    24 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="category-dialog-error">deleteHasChildren:1</p>
       - unexpected value "deleteHasChildren:1"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('category-dialog-error')
Expected: "1 categories sit under this one. Move or delete them first."
Received: "deleteHasChildren:1"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('category-dialog-error')
    24 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="category-dialog-error">deleteHasChildren:1</p>
       - unexpected value "deleteHasChildren:1"


  92 |       await page.getByTestId("category-delete-submit").click();
  93 |       await stepUpIfPrompted(page, secret);
> 94 |       await expect(page.getByTestId("category-dialog-error")).toHaveText(
     |                                                               ^
  95 |         fill(en["admin.categories.error.delete_has_children"], 1),
  96 |         { timeout: 20000 },
```

Context:

```text
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete category" [ref=e2]:
    - heading "Delete category" [level=2] [ref=e4]
    - generic [ref=e5]:
      - paragraph [ref=e6]: This permanently deletes the retired category, its browse placements, country exclusions, attributes and translations. It cannot be undone.
      - generic [ref=e7]:
        - generic [ref=e8]: Type the slug to confirm
        - textbox "Type the slug to confirm" [ref=e9]:
          - /placeholder: e2e-cat-local-4-1-u6s4qx
          - text: e2e-cat-local-4-1-u6s4qx
      - alert [ref=e10]: deleteHasChildren:1
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete permanently" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-categories-home.spec.ts › Bundle 7 category doors › CT-40 the delete door's refusals read as words, never as keys

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('category-dialog-error')
Expected: "Retire this category before deleting it."
Received: "deleteActive"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('category-dialog-error')
    24 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="category-dialog-error">deleteActive</p>
       - unexpected value "deleteActive"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('category-dialog-error')
Expected: "Retire this category before deleting it."
Received: "deleteActive"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('category-dialog-error')
    24 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="category-dialog-error">deleteActive</p>
       - unexpected value "deleteActive"


  205 |       await stepUpIfPrompted(page, secret);
  206 |       const error = page.getByTestId("category-dialog-error");
> 207 |       await expect(error).toHaveText(en["admin.categories.error.delete_active"], {
      |                           ^
  208 |         timeout: 20000,
  209 |       });
```

Context:

```text
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete category" [ref=e2]:
    - heading "Delete category" [level=2] [ref=e4]
    - generic [ref=e5]:
      - paragraph [ref=e6]: This permanently deletes the retired category, its browse placements, country exclusions, attributes and translations. It cannot be undone.
      - generic [ref=e7]:
        - generic [ref=e8]: Type the slug to confirm
        - textbox "Type the slug to confirm" [ref=e9]:
          - /placeholder: e2e-cat-local-4-3-xzz87p
          - text: e2e-cat-local-4-3-xzz87p
      - alert [ref=e10]: deleteActive
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete permanently" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-categories-home.spec.ts › Bundle 7 category doors › CT-38 a retired category with a child is not deleted until the child moves away

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('category-dialog-error')
Expected: "1 categories sit under this one. Move or delete them first."
Received: "deleteHasChildren:1"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('category-dialog-error')
    24 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="category-dialog-error">deleteHasChildren:1</p>
       - unexpected value "deleteHasChildren:1"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('category-dialog-error')
Expected: "1 categories sit under this one. Move or delete them first."
Received: "deleteHasChildren:1"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('category-dialog-error')
    24 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="category-dialog-error">deleteHasChildren:1</p>
       - unexpected value "deleteHasChildren:1"


  92 |       await page.getByTestId("category-delete-submit").click();
  93 |       await stepUpIfPrompted(page, secret);
> 94 |       await expect(page.getByTestId("category-dialog-error")).toHaveText(
     |                                                               ^
  95 |         fill(en["admin.categories.error.delete_has_children"], 1),
  96 |         { timeout: 20000 },
```

Context:

```text
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete category" [ref=e2]:
    - heading "Delete category" [level=2] [ref=e4]
    - generic [ref=e5]:
      - paragraph [ref=e6]: This permanently deletes the retired category, its browse placements, country exclusions, attributes and translations. It cannot be undone.
      - generic [ref=e7]:
        - generic [ref=e8]: Type the slug to confirm
        - textbox "Type the slug to confirm" [ref=e9]:
          - /placeholder: e2e-cat-local-4-6-ouyqya
          - text: e2e-cat-local-4-6-ouyqya
      - alert [ref=e10]: deleteHasChildren:1
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete permanently" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-categories-home.spec.ts › Bundle 7 category doors › CT-40 the delete door's refusals read as words, never as keys

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('category-dialog-error')
Expected: "Retire this category before deleting it."
Received: "deleteActive"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('category-dialog-error')
    24 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="category-dialog-error">deleteActive</p>
       - unexpected value "deleteActive"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('category-dialog-error')
Expected: "Retire this category before deleting it."
Received: "deleteActive"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('category-dialog-error')
    24 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="category-dialog-error">deleteActive</p>
       - unexpected value "deleteActive"


  205 |       await stepUpIfPrompted(page, secret);
  206 |       const error = page.getByTestId("category-dialog-error");
> 207 |       await expect(error).toHaveText(en["admin.categories.error.delete_active"], {
      |                           ^
  208 |         timeout: 20000,
  209 |       });
```

Context:

```text
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete category" [ref=e2]:
    - heading "Delete category" [level=2] [ref=e4]
    - generic [ref=e5]:
      - paragraph [ref=e6]: This permanently deletes the retired category, its browse placements, country exclusions, attributes and translations. It cannot be undone.
      - generic [ref=e7]:
        - generic [ref=e8]: Type the slug to confirm
        - textbox "Type the slug to confirm" [ref=e9]:
          - /placeholder: e2e-cat-local-4-8-zr8ruz
          - text: e2e-cat-local-4-8-zr8ruz
      - alert [ref=e10]: deleteActive
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete permanently" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-74 a merge is refused while a listing holds a source's answer, and merges when none does

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('attribute-dialog-error')
Expected: "1 listings hold an answer to an attribute being merged away. Merging is refused while they do."
Received: "mergeHasHolders:1"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('attribute-dialog-error')
    24 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="attribute-dialog-error">mergeHasHolders:1</p>
       - unexpected value "mergeHasHolders:1"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('attribute-dialog-error')
Expected: "1 listings hold an answer to an attribute being merged away. Merging is refused while they do."
Received: "mergeHasHolders:1"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('attribute-dialog-error')
    24 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="attribute-dialog-error">mergeHasHolders:1</p>
       - unexpected value "mergeHasHolders:1"


  308 |
  309 |       await merge();
> 310 |       await expect(page.getByTestId("attribute-dialog-error")).toHaveText(
      |                                                                ^
  311 |         fill(en["admin.attributes.error.mergeHasHolders"], { count: 1 }),
  312 |         { timeout: 20000 },
```

Context:

```text
            - checkbox "Size (womens_size) · 1" [ref=e1029]
            - generic [ref=e1032]: Size (womens_size) · 1
          - generic [ref=e1033] [cursor=pointer]:
            - checkbox "Year (year) · 1" [ref=e1034]
            - generic [ref=e1037]: Year (year) · 1
          - generic [ref=e1038] [cursor=pointer]:
            - checkbox "Year Built (year_built) · 1" [ref=e1039]
            - generic [ref=e1042]: Year Built (year_built) · 1
          - generic [ref=e1043] [cursor=pointer]:
            - checkbox "Zoning / Land Use (zoning) · 1" [ref=e1044]
            - generic [ref=e1047]: Zoning / Land Use (zoning) · 1
      - status [ref=e1048]: 1 links move to e2e_keep_fv9gct; 1 definitions removed.
      - alert [ref=e1049]: mergeHasHolders:1
      - generic [ref=e1050]:
        - button "Cancel" [ref=e1051] [cursor=pointer]
        - button "Merge" [ref=e1052] [cursor=pointer]
    - button "Close" [ref=e1053] [cursor=pointer]:
      - img [ref=e1054]
      - generic [ref=e1057]: Close
```
```

## admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-74 a merge is refused while a listing holds a source's answer, and merges when none does

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('attribute-dialog-error')
Expected: "1 listings hold an answer to an attribute being merged away. Merging is refused while they do."
Received: "mergeHasHolders:1"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('attribute-dialog-error')
    24 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="attribute-dialog-error">mergeHasHolders:1</p>
       - unexpected value "mergeHasHolders:1"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('attribute-dialog-error')
Expected: "1 listings hold an answer to an attribute being merged away. Merging is refused while they do."
Received: "mergeHasHolders:1"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('attribute-dialog-error')
    24 × locator resolved to <p role="alert" class="text-sm text-destructive" data-testid="attribute-dialog-error">mergeHasHolders:1</p>
       - unexpected value "mergeHasHolders:1"


  308 |
  309 |       await merge();
> 310 |       await expect(page.getByTestId("attribute-dialog-error")).toHaveText(
      |                                                                ^
  311 |         fill(en["admin.attributes.error.mergeHasHolders"], { count: 1 }),
  312 |         { timeout: 20000 },
```

Context:

```text
            - checkbox "Size (womens_size) · 1" [ref=e1029]
            - generic [ref=e1032]: Size (womens_size) · 1
          - generic [ref=e1033] [cursor=pointer]:
            - checkbox "Year (year) · 1" [ref=e1034]
            - generic [ref=e1037]: Year (year) · 1
          - generic [ref=e1038] [cursor=pointer]:
            - checkbox "Year Built (year_built) · 1" [ref=e1039]
            - generic [ref=e1042]: Year Built (year_built) · 1
          - generic [ref=e1043] [cursor=pointer]:
            - checkbox "Zoning / Land Use (zoning) · 1" [ref=e1044]
            - generic [ref=e1047]: Zoning / Land Use (zoning) · 1
      - status [ref=e1048]: 1 links move to e2e_keep_s9ujbr; 1 definitions removed.
      - alert [ref=e1049]: mergeHasHolders:1
      - generic [ref=e1050]:
        - button "Cancel" [ref=e1051] [cursor=pointer]
        - button "Merge" [ref=e1052] [cursor=pointer]
    - button "Close" [ref=e1053] [cursor=pointer]:
      - img [ref=e1054]
      - generic [ref=e1057]: Close
```
```

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-4b stored truth: generate, accept, and the reader returns assets + stamp

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: {"accepted_at": "2026-11-15T02:35:12.006451+00:00", "ok": true}
Received: "2026-11-15T02:35:12.006451+00:00"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: {"accepted_at": "2026-11-15T02:35:12.006451+00:00", "ok": true}
Received: "2026-11-15T02:35:12.006451+00:00"

  220 |       expect(row?.image_thumb_url).toBe(assets.thumbUrl);
  221 |       expect(row?.og_image_url).toBe(assets.ogUrl);
> 222 |       expect(row?.image_accepted_at).toBe(accepted);
      |                                      ^
  223 |
  224 |       // DB TRUTH (J4) — the service client agrees with the gated reader.
  225 |       const { data: truth } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/category-image-routes.spec.ts:222:38
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-4b-stored-truth-generate-accept-and-the-reader-returns-assets-stamp-mobile-360` — Playwright's name `category-image-routes-C5a--e9dec-reader-returns-assets-stamp-mobile-360`; this run carried 29 context file(s); of the same spec: none

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-4b stored truth: generate, accept, and the reader returns assets + stamp

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: {"accepted_at": "2026-11-15T02:38:07.486106+00:00", "ok": true}
Received: "2026-11-15T02:38:07.486106+00:00"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: {"accepted_at": "2026-11-15T02:38:07.486106+00:00", "ok": true}
Received: "2026-11-15T02:38:07.486106+00:00"

  220 |       expect(row?.image_thumb_url).toBe(assets.thumbUrl);
  221 |       expect(row?.og_image_url).toBe(assets.ogUrl);
> 222 |       expect(row?.image_accepted_at).toBe(accepted);
      |                                      ^
  223 |
  224 |       // DB TRUTH (J4) — the service client agrees with the gated reader.
  225 |       const { data: truth } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/category-image-routes.spec.ts:222:38
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-4b-stored-truth-generate-accept-and-the-reader-returns-assets-stamp-desktop-1280` — Playwright's name `category-image-routes-C5a--e9dec-reader-returns-assets-stamp-desktop-1280`; this run carried 29 context file(s); of the same spec: none

## admin-attributes-import.spec.ts › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: AT-46 the door tolerated an inherited rank

expect(received).toContain(expected) // indexOf

Expected substring: "admin.attributes.error.rankInherited"
Received string:    "rankInherited:category=[account id] rank=2 attribute=e2e_attr_rlc4ye inherited_from=e2e-cat-rank-l30apu inherited_attribute=e2e_attr_iq2pn9"
--- further error 1 ---
Error: AT-46 the door tolerated an inherited rank

expect(received).toContain(expected) // indexOf

Expected substring: "admin.attributes.error.rankInherited"
Received string:    "rankInherited:category=[account id] rank=2 attribute=e2e_attr_rlc4ye inherited_from=e2e-cat-rank-l30apu inherited_attribute=e2e_attr_iq2pn9"

  1017 |         [child.id, attrFiller.id, attrDirect.id, attrInherited.id],
  1018 |       );
> 1019 |       expect(verdicts.clashing, "AT-46 the door tolerated an inherited rank").toContain(
       |                                                                               ^
  1020 |         "admin.attributes.error.rankInherited",
  1021 |       );
  1022 |       expect(verdicts.accepted, "AT-46 the door refused a free rank").toBe("NO ERROR");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-import.spec.ts:1019:79
```

Context:

```text
          - listitem [ref=e1380]:
            - generic [ref=e1381]: About
          - listitem [ref=e1382]:
            - generic [ref=e1383]: Contact
      - navigation "Help" [ref=e1384]:
        - heading "Help" [level=2] [ref=e1385]
        - list [ref=e1386]:
          - listitem [ref=e1387]:
            - generic [ref=e1388]: Safety
      - navigation "Legal" [ref=e1389]:
        - heading "Legal" [level=2] [ref=e1390]
        - list [ref=e1391]:
          - listitem [ref=e1392]:
            - link "Terms" [ref=e1393] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1394]:
            - link "Privacy" [ref=e1395] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1397]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-import.spec.ts › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: AT-46 the door tolerated an inherited rank

expect(received).toContain(expected) // indexOf

Expected substring: "admin.attributes.error.rankInherited"
Received string:    "rankInherited:category=[account id] rank=2 attribute=e2e_attr_3b93z5 inherited_from=e2e-cat-rank-wmp9kj inherited_attribute=e2e_attr_p1d9kd"
--- further error 1 ---
Error: AT-46 the door tolerated an inherited rank

expect(received).toContain(expected) // indexOf

Expected substring: "admin.attributes.error.rankInherited"
Received string:    "rankInherited:category=[account id] rank=2 attribute=e2e_attr_3b93z5 inherited_from=e2e-cat-rank-wmp9kj inherited_attribute=e2e_attr_p1d9kd"

  1017 |         [child.id, attrFiller.id, attrDirect.id, attrInherited.id],
  1018 |       );
> 1019 |       expect(verdicts.clashing, "AT-46 the door tolerated an inherited rank").toContain(
       |                                                                               ^
  1020 |         "admin.attributes.error.rankInherited",
  1021 |       );
  1022 |       expect(verdicts.accepted, "AT-46 the door refused a free rank").toBe("NO ERROR");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-import.spec.ts:1019:79
```

Context:

```text
          - listitem [ref=e1245]:
            - generic [ref=e1246]: About
          - listitem [ref=e1247]:
            - generic [ref=e1248]: Contact
      - navigation "Help" [ref=e1249]:
        - heading "Help" [level=2] [ref=e1250]
        - list [ref=e1251]:
          - listitem [ref=e1252]:
            - generic [ref=e1253]: Safety
      - navigation "Legal" [ref=e1254]:
        - heading "Legal" [level=2] [ref=e1255]
        - list [ref=e1256]:
          - listitem [ref=e1257]:
            - link "Terms" [ref=e1258] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1259]:
            - link "Privacy" [ref=e1260] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1262]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "admin.categories.error.catchallParent"
Received string:    "catchallParent"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "admin.categories.error.catchallParent"
Received string:    "catchallParent"

  250 |       p_parent_id: catchall!.id,
  251 |     });
> 252 |     expect(refusal.error?.message ?? "").toContain("admin.categories.error.catchallParent");
      |                                          ^
  253 |
  254 |     await signInJobSuperAdmin(page);
  255 |     await gotoReady(page, "/admin/categories");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:252:42
```

Context: context file not found for `admin-categories-lifecycle-C2-categories-console-CT-14-catch-all-law-never-a-parent-refused-server-side-no-move-verbs-mobile-360` — Playwright's name `admin-categories-lifecycle-982d2-d-server-side-no-move-verbs-mobile-360`; this run carried 29 context file(s); of the same spec: `admin-categories-lifecycle-ba81e-ed-countries-position-image-mobile-360`, `admin-categories-lifecycle-ba81e-ed-countries-position-image-desktop-1280-retry1`, `admin-categories-lifecycle-ba81e-ed-countries-position-image-desktop-1280`, `admin-categories-lifecycle-ba81e-ed-countries-position-image-mobile-360-retry1`

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 3
+ Received  + 1

- Array [
-   "ET",
- ]
+ Array []

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 3
+ Received  + 1

- Array [
-   "ET",
- ]
+ Array []

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  766 |       expect(created?.expiry_days).toBe(45);
  767 |       expect(new Date(created?.visible_from ?? 0).getTime()).toBe(new Date(fromLocal).getTime());
> 768 |       await expect
      |       ^
  769 |         .poll(
  770 |           async () => {
  771 |             const { data } = await supabase
```

Context:

```text
              - listitem:
                - link:
                  - /url: /privacy
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Edit category" [active] [ref=e2]:
    - heading "Edit category" [level=2] [ref=e4]
    - generic [ref=e6]:
      - generic [ref=e7]:
        - paragraph [ref=e8]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
        - paragraph [ref=e9]: No image yet for this category.
        - button "Generate image" [ref=e10] [cursor=pointer]
      - alert [ref=e11]: Image generation failed
      - alert [ref=e12]: "invalid input syntax for type uuid: \"{\"id\":\"[account id]\",\"ok\":true}\""
      - button "Close" [ref=e14] [cursor=pointer]
    - button "Close" [ref=e15] [cursor=pointer]:
      - img [ref=e16]
      - generic [ref=e19]: Close
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "admin.categories.error.catchallParent"
Received string:    "catchallParent"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "admin.categories.error.catchallParent"
Received string:    "catchallParent"

  250 |       p_parent_id: catchall!.id,
  251 |     });
> 252 |     expect(refusal.error?.message ?? "").toContain("admin.categories.error.catchallParent");
      |                                          ^
  253 |
  254 |     await signInJobSuperAdmin(page);
  255 |     await gotoReady(page, "/admin/categories");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:252:42
```

Context: context file not found for `admin-categories-lifecycle-C2-categories-console-CT-14-catch-all-law-never-a-parent-refused-server-side-no-move-verbs-desktop-1280` — Playwright's name `admin-categories-lifecycle-982d2-d-server-side-no-move-verbs-desktop-1280`; this run carried 29 context file(s); of the same spec: `admin-categories-lifecycle-ba81e-ed-countries-position-image-mobile-360`, `admin-categories-lifecycle-ba81e-ed-countries-position-image-desktop-1280-retry1`, `admin-categories-lifecycle-ba81e-ed-countries-position-image-desktop-1280`, `admin-categories-lifecycle-ba81e-ed-countries-position-image-mobile-360-retry1`

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 3
+ Received  + 1

- Array [
-   "ET",
- ]
+ Array []

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 3
+ Received  + 1

- Array [
-   "ET",
- ]
+ Array []

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  766 |       expect(created?.expiry_days).toBe(45);
  767 |       expect(new Date(created?.visible_from ?? 0).getTime()).toBe(new Date(fromLocal).getTime());
> 768 |       await expect
      |       ^
  769 |         .poll(
  770 |           async () => {
  771 |             const { data } = await supabase
```

Context:

```text
              - listitem:
                - link:
                  - /url: /privacy
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Edit category" [active] [ref=e2]:
    - heading "Edit category" [level=2] [ref=e4]
    - generic [ref=e6]:
      - generic [ref=e7]:
        - paragraph [ref=e8]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
        - paragraph [ref=e9]: No image yet for this category.
        - button "Generate image" [ref=e10] [cursor=pointer]
      - alert [ref=e11]: Image generation failed
      - alert [ref=e12]: "invalid input syntax for type uuid: \"{\"id\":\"[account id]\",\"ok\":true}\""
      - button "Close" [ref=e14] [cursor=pointer]
    - button "Close" [ref=e15] [cursor=pointer]:
      - img [ref=e16]
      - generic [ref=e19]: Close
```
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

```text
[client-error] HTTP 403 POST /rest/v1/rpc/admin_link_attribute ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] HTTP 403 POST /rest/v1/rpc/admin_delete_attribute ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_category_images ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"{\"id\":\"[account id]\",\"ok\":true}\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_delete_attribute ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "deleteHasLinks:1", "refusals": [{"detail": "1", "reason": "deleteHasLinks"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_category_images ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"{\"id\":\"[account id]\",\"ok\":true}\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_delete_attribute ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "deleteHasLinks:1", "refusals": [{"detail": "1", "reason": "deleteHasLinks"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_attribute_option_coverage?order=attr_key.asc&limit=1000 ({"code":"P0D01","details":null,"hint":null,"message":"permissionDenied"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×3
[client-error] HTTP 403 POST /rest/v1/rpc/admin_upsert_attribute ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] HTTP 403 POST /rest/v1/rpc/admin_link_attribute ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] HTTP 403 POST /rest/v1/rpc/admin_delete_attribute ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_attribute_option_coverage?order=attr_key.asc&limit=1000 ({"code":"P0D01","details":null,"hint":null,"message":"permissionDenied"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×3
[client-error] HTTP 403 POST /rest/v1/rpc/admin_upsert_attribute ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] HTTP 403 POST /rest/v1/rpc/admin_link_attribute ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] HTTP 403 POST /rest/v1/rpc/admin_delete_attribute ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
```

## Server errors: shard 4

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

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_delete_category ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "deleteHasChildren:1", "refusals": [{"detail": "1", "reason": "deleteHasChildren"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_delete_category ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "deleteHasChildren:1", "refusals": [{"detail": "1", "reason": "deleteHasChildren"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_delete_category ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "deleteActive", "refusals": [{"reason": "deleteActive"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_delete_category ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "deleteActive", "refusals": [{"reason": "deleteActive"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_delete_category ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "deleteHasChildren:1", "refusals": [{"detail": "1", "reason": "deleteHasChildren"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_delete_category ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "deleteHasChildren:1", "refusals": [{"detail": "1", "reason": "deleteHasChildren"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_delete_category ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "deleteActive", "refusals": [{"reason": "deleteActive"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_delete_category ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "deleteActive", "refusals": [{"reason": "deleteActive"}]})
```

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_merge_attributes ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "mergeHasHolders:1", "refusals": [{"detail": "1", "reason": "mergeHasHolders"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_merge_attributes ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "mergeHasHolders:1", "refusals": [{"detail": "1", "reason": "mergeHasHolders"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_merge_attributes ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "mergeHasHolders:1", "refusals": [{"detail": "1", "reason": "mergeHasHolders"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_merge_attributes ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "mergeHasHolders:1", "refusals": [{"detail": "1", "reason": "mergeHasHolders"}]})
```

## Server errors: shard 8

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## Client errors: shard 8

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_card_attributes ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "rankInherited:category=[account id] rank=2 attribute=e2e_attr_rlc4ye inherited_from=e2e-cat-rank-l30ap)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_card_attributes ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "rankInherited:category=[account id] rank=2 attribute=e2e_attr_9x4hop inherited_from=e2e-cat-rank-8xw3c)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_card_attributes ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "rankInherited:category=[account id] rank=2 attribute=e2e_attr_3b93z5 inherited_from=e2e-cat-rank-wmp9k)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_card_attributes ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "rankInherited:category=[account id] rank=2 attribute=e2e_attr_dt4ndv inherited_from=e2e-cat-rank-tt78p)
```

## Server errors: shard 15

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 15

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_exclusions ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"{\"id\":\"[account id]\",\"ok\":true}\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_category_images ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"{\"id\":\"[account id]\",\"ok\":true}\""})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_exclusions ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"{\"id\":\"[account id]\",\"ok\":true}\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_category_images ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"{\"id\":\"[account id]\",\"ok\":true}\""})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_exclusions ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"{\"id\":\"[account id]\",\"ok\":true}\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_category_images ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"{\"id\":\"[account id]\",\"ok\":true}\""})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_exclusions ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"{\"id\":\"[account id]\",\"ok\":true}\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_category_images ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"{\"id\":\"[account id]\",\"ok\":true}\""})
```
