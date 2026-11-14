# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43572457160
- Commit: `3bcacd84beb9310b1ab3508a008db7f516bc50aa`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-66df641cda10… (1 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-14T08:32:38.575Z
- Passed: 2499 · Skipped: 360 · Failed: 46
- Gating failures: 46 · Quarantined (@global-state, INC-117, non-gating): 0
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
| smoke | 2026-11-14T08:12:14.903Z | 3.2 min |
| email | 2026-11-14T08:12:51.147Z | 0.3 min |
| webkit | 2026-11-14T08:16:53.606Z | 10.0 min |
| shard 1 | 2026-11-14T08:13:36.929Z | 5.5 min |
| shard 2 | 2026-11-14T08:12:25.797Z | 5.5 min |
| shard 3 | 2026-11-14T08:12:38.871Z | 6.1 min |
| shard 4 | 2026-11-14T08:12:54.112Z | 6.2 min |
| shard 5 | 2026-11-14T08:12:39.947Z | 6.2 min |
| shard 6 | 2026-11-14T08:13:12.569Z | 7.0 min |
| shard 7 | 2026-11-14T08:12:57.890Z | 6.5 min |
| shard 8 | 2026-11-14T08:12:50.378Z | 6.5 min |
| shard 9 | 2026-11-14T08:12:56.758Z | 19.0 min |
| shard 10 | 2026-11-14T08:12:17.220Z | 4.9 min |
| shard 11 | 2026-11-14T08:12:16.900Z | 5.9 min |
| shard 12 | 2026-11-14T08:12:44.862Z | 6.8 min |
| shard 13 | 2026-11-14T08:13:05.439Z | 5.6 min |
| shard 14 | 2026-11-14T08:14:51.607Z | 6.8 min |
| shard 15 | 2026-11-14T08:12:42.698Z | 7.0 min |
| shard 16 | 2026-11-14T08:12:25.580Z | 6.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-roles.spec.ts` | 28 | 21.7 min | shard 9 |
| `shell.spec.ts` | 234 | 9.7 min | shard 1 |
| `admin-users.spec.ts` | 28 | 6.4 min | shard 16 |
| `import-security.spec.ts` | 36 | 5.6 min | shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 2 |
| `admin-screening.spec.ts` | 58 | 5.5 min | webkit, shard 14 |
| `admin-locations.spec.ts` | 38 | 5.5 min | shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.4 min | shard 3 |
| `ad-page.spec.ts` | 104 | 5.4 min | webkit, shard 13 |
| `admin-translations-console.spec.ts` | 46 | 5.2 min | smoke, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 5.2 min | shard 7 |
| `post-wizard-specs.spec.ts` | 82 | 5.1 min | shard 12 |
| `admin-audit.spec.ts` | 16 | 5.1 min | shard 9 |
| `admin-listings.spec.ts` | 78 | 5.0 min | webkit, shard 10 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.3 min | shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 4.1 min | shard 14 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 15 |
| `post-wizard-pricing.spec.ts` | 52 | 3.7 min | shard 8 |
| `photo-pipeline.spec.ts` | 74 | 3.7 min | webkit, shard 16 |
| `my-listings-ad.spec.ts` | 38 | 3.7 min | shard 12 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 11 |
| `sage-bands.spec.ts` | 76 | 3.5 min | shard 6 |
| `choice-lists.spec.ts` | 96 | 3.4 min | shard 7 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.3 min | shard 15 |
| `post-wizard-category.spec.ts` | 52 | 3.2 min | webkit, shard 4 |
| `auth-signout.spec.ts` | 36 | 3.0 min | shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `dialogs.spec.ts` | 20 | 2.9 min | webkit, shard 10 |
| `admin-monetisation.spec.ts` | 34 | 2.9 min | smoke, shard 10 |
| `admin-countries.spec.ts` | 18 | 2.6 min | shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 5 |
| `legal-admin.spec.ts` | 44 | 2.5 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 2.5 min | shard 15 |
| `legal-certify.spec.ts` | 44 | 2.3 min | shard 14 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 2 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 8 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 12 |
| `press.spec.ts` | 22 | 1.2 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 13 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `sage-cards.spec.ts` | 40 | 1.0 min | webkit, shard 7 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 0.8 min | smoke, shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 14 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `sage-shell.spec.ts` | 80 | 0.5 min | shard 16 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `shell-bands.spec.ts` | 16 | 0.4 min | shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 16 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `submenu.spec.ts` | 14 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `door-refusals.spec.ts` | 12 | 0.2 min | shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `overlays.spec.ts` | 8 | 0.1 min | shard 15 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 9 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 15 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `i18n-sign-in-language.spec.ts` › D239-E6 impersonation leaves the staff member's own language as it was, at start and at end | desktop-1280 | 63.3 s |
| `i18n-sign-in-language.spec.ts` › D239-E6 impersonation leaves the staff member's own language as it was, at start and at end | mobile-360 | 61.1 s |
| `admin-users.spec.ts` › AU-10 edit: a duplicate alias is refused inline and nothing changes | desktop-1280 | 61.0 s |
| `admin-users.spec.ts` › AU-10 edit: a duplicate alias is refused inline and nothing changes | mobile-360 | 59.9 s |
| `admin-audit.spec.ts` › IMP-1 impersonation: super admin opens a read-only session and ends it | mobile-360 | 57.8 s |
| `admin-audit.spec.ts` › IMP-1 impersonation: super admin opens a read-only session and ends it | desktop-1280 | 57.6 s |
| `admin-audit.spec.ts` › IMP-2 dual-actor audit: start and end are both recorded | desktop-1280 | 57.6 s |
| `admin-audit.spec.ts` › IMP-2 dual-actor audit: start and end are both recorded | mobile-360 | 57.3 s |
| `admin-roles.spec.ts` › RP-6 revocation path: unenrolling the factor refuses the next change | desktop-1280 | 57.2 s |
| `admin-roles.spec.ts` › RP-6 revocation path: unenrolling the factor refuses the next change | mobile-360 | 56.9 s |
| `admin-roles.spec.ts` › RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match | desktop-1280 | 53.6 s |
| `admin-roles.spec.ts` › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC | mobile-360 | 53.6 s |
| `admin-roles.spec.ts` › RP-7 registration: DEC-016 permissions appear as grantable rows | desktop-1280 | 53.5 s |
| `admin-roles.spec.ts` › RP-8 Amharic + no horizontal overflow | mobile-360 | 53.5 s |
| `admin-roles.spec.ts` › RP-5 delete guards: members block deletion; typed confirm deletes | mobile-360 | 53.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43572457160-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43572457160-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 43572457160-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43572457160-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 43572457160-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43572457160-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 43572457160-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 43572457160-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43572457160-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43572457160-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 3, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 43572457160-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 24 (pool 4, fresh 20)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 43572457160-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43572457160-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43572457160-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43572457160-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43572457160-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 43572457160-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 2, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 43572457160-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 43572457160-local-16
```

## admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')


  221 |         await stepUpIfPrompted(page, secret);
  222 |
> 223 |         await expect(page.getByTestId("impersonation-view")).toBeVisible({ timeout: 20000 });
      |                                                              ^
  224 |         await expect(page.getByTestId("impersonation-banner")).toBeVisible();
  225 |         await expect(page.getByTestId("impersonation-readonly-note")).toBeVisible();
  226 |         // Bundle 11 G2b (D132) — the page's heading in the header; Columns on the listings.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:223:62
```

Context:

```text
            - listitem [ref=e379]:
              - generic [ref=e380]: About
            - listitem [ref=e381]:
              - generic [ref=e382]: Contact
        - navigation "Help" [ref=e383]:
          - heading "Help" [level=2] [ref=e384]
          - list [ref=e385]:
            - listitem [ref=e386]:
              - generic [ref=e387]: Safety
        - navigation "Legal" [ref=e388]:
          - heading "Legal" [level=2] [ref=e389]
          - list [ref=e390]:
            - listitem [ref=e391]:
              - link "Terms" [ref=e392] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e393]:
              - link "Privacy" [ref=e394] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e396]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-2 dual-actor audit: start and end are both recorded

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')


  265 |       await page.getByTestId("impersonation-begin").click();
  266 |       await stepUpIfPrompted(page, secret);
> 267 |       await expect(page.getByTestId("impersonation-view")).toBeVisible({ timeout: 20000 });
      |                                                            ^
  268 |       await page.getByTestId("impersonation-end").click();
  269 |       await expect(page.getByTestId("impersonation-banner")).toHaveCount(0, { timeout: 20000 });
  270 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:267:60
```

Context:

```text
            - listitem [ref=e379]:
              - generic [ref=e380]: About
            - listitem [ref=e381]:
              - generic [ref=e382]: Contact
        - navigation "Help" [ref=e383]:
          - heading "Help" [level=2] [ref=e384]
          - list [ref=e385]:
            - listitem [ref=e386]:
              - generic [ref=e387]: Safety
        - navigation "Legal" [ref=e388]:
          - heading "Legal" [level=2] [ref=e389]
          - list [ref=e390]:
            - listitem [ref=e391]:
              - link "Terms" [ref=e392] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e393]:
              - link "Privacy" [ref=e394] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e396]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-3 server refusals: self and a super-admin target

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "cannot impersonate yourself"
Received string:    "impersonateSelf"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "cannot impersonate yourself"
Received string:    "impersonateSelf"

  297 |         })
  298 |       ).error;
> 299 |       expect(self ?? "").toContain("cannot impersonate yourself");
      |                          ^
  300 |
  301 |       const other = await leaseUser();
  302 |       await grantRole(other.id, "super_admin");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:299:26
```

Context:

```text
          - listitem [ref=e1030]:
            - generic [ref=e1031]: About
          - listitem [ref=e1032]:
            - generic [ref=e1033]: Contact
      - navigation "Help" [ref=e1034]:
        - heading "Help" [level=2] [ref=e1035]
        - list [ref=e1036]:
          - listitem [ref=e1037]:
            - generic [ref=e1038]: Safety
      - navigation "Legal" [ref=e1039]:
        - heading "Legal" [level=2] [ref=e1040]
        - list [ref=e1041]:
          - listitem [ref=e1042]:
            - link "Terms" [ref=e1043] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1044]:
            - link "Privacy" [ref=e1045] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1047]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-5 server refusal: a caller who is not a super admin

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "super-admin only"
Received string:    "permissionDenied"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "super-admin only"
Received string:    "permissionDenied"

  332 |         })
  333 |       ).error;
> 334 |       expect(refused ?? "").toContain("super-admin only");
      |                             ^
  335 |     },
  336 |   );
  337 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:334:29
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')


  221 |         await stepUpIfPrompted(page, secret);
  222 |
> 223 |         await expect(page.getByTestId("impersonation-view")).toBeVisible({ timeout: 20000 });
      |                                                              ^
  224 |         await expect(page.getByTestId("impersonation-banner")).toBeVisible();
  225 |         await expect(page.getByTestId("impersonation-readonly-note")).toBeVisible();
  226 |         // Bundle 11 G2b (D132) — the page's heading in the header; Columns on the listings.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:223:62
```

Context:

```text
            - listitem [ref=e455]:
              - generic [ref=e456]: About
            - listitem [ref=e457]:
              - generic [ref=e458]: Contact
        - navigation "Help" [ref=e459]:
          - heading "Help" [level=2] [ref=e460]
          - list [ref=e461]:
            - listitem [ref=e462]:
              - generic [ref=e463]: Safety
        - navigation "Legal" [ref=e464]:
          - heading "Legal" [level=2] [ref=e465]
          - list [ref=e466]:
            - listitem [ref=e467]:
              - link "Terms" [ref=e468] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e469]:
              - link "Privacy" [ref=e470] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e472]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-2 dual-actor audit: start and end are both recorded

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')


  265 |       await page.getByTestId("impersonation-begin").click();
  266 |       await stepUpIfPrompted(page, secret);
> 267 |       await expect(page.getByTestId("impersonation-view")).toBeVisible({ timeout: 20000 });
      |                                                            ^
  268 |       await page.getByTestId("impersonation-end").click();
  269 |       await expect(page.getByTestId("impersonation-banner")).toHaveCount(0, { timeout: 20000 });
  270 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:267:60
```

Context:

```text
            - listitem [ref=e455]:
              - generic [ref=e456]: About
            - listitem [ref=e457]:
              - generic [ref=e458]: Contact
        - navigation "Help" [ref=e459]:
          - heading "Help" [level=2] [ref=e460]
          - list [ref=e461]:
            - listitem [ref=e462]:
              - generic [ref=e463]: Safety
        - navigation "Legal" [ref=e464]:
          - heading "Legal" [level=2] [ref=e465]
          - list [ref=e466]:
            - listitem [ref=e467]:
              - link "Terms" [ref=e468] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e469]:
              - link "Privacy" [ref=e470] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e472]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-3 server refusals: self and a super-admin target

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "cannot impersonate yourself"
Received string:    "impersonateSelf"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "cannot impersonate yourself"
Received string:    "impersonateSelf"

  297 |         })
  298 |       ).error;
> 299 |       expect(self ?? "").toContain("cannot impersonate yourself");
      |                          ^
  300 |
  301 |       const other = await leaseUser();
  302 |       await grantRole(other.id, "super_admin");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:299:26
```

Context:

```text
          - listitem [ref=e829]:
            - generic [ref=e830]: About
          - listitem [ref=e831]:
            - generic [ref=e832]: Contact
      - navigation "Help" [ref=e833]:
        - heading "Help" [level=2] [ref=e834]
        - list [ref=e835]:
          - listitem [ref=e836]:
            - generic [ref=e837]: Safety
      - navigation "Legal" [ref=e838]:
        - heading "Legal" [level=2] [ref=e839]
        - list [ref=e840]:
          - listitem [ref=e841]:
            - link "Terms" [ref=e842] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e843]:
            - link "Privacy" [ref=e844] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e846]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-5 server refusal: a caller who is not a super admin

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "super-admin only"
Received string:    "permissionDenied"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "super-admin only"
Received string:    "permissionDenied"

  332 |         })
  333 |       ).error;
> 334 |       expect(refused ?? "").toContain("super-admin only");
      |                             ^
  335 |     },
  336 |   );
  337 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:334:29
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-3 matrix: grant then revoke a benign permission, persisted across reload

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-4 system lock: super_admin role is read-only in UI and refused by the RPCs

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /system role/i
Received string:  "systemRole"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /system role/i
Received string:  "systemRole"

  222 |         })
  223 |       ).error,
> 224 |     ).toMatch(/system role/i);
      |       ^
  225 |     const permId = (
  226 |       await adminClient()
  227 |         .from("permissions")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:224:7
```

Context:

```text
          - listitem [ref=e646]:
            - generic [ref=e647]: About
          - listitem [ref=e648]:
            - generic [ref=e649]: Contact
      - navigation "Help" [ref=e650]:
        - heading "Help" [level=2] [ref=e651]
        - list [ref=e652]:
          - listitem [ref=e653]:
            - generic [ref=e654]: Safety
      - navigation "Legal" [ref=e655]:
        - heading "Legal" [level=2] [ref=e656]
        - list [ref=e657]:
          - listitem [ref=e658]:
            - link "Terms" [ref=e659] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e660]:
            - link "Privacy" [ref=e661] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e663]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-6 revocation path: unenrolling the factor refuses the next change

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-7 registration: DEC-016 permissions appear as grantable rows

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-10 members link preselects the role filter via the URL

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-16 the roles list on the agreed blocks: heading, Create role, Columns, Open and View members

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-17 P-1: the matrix shows the packages resource with View and Update, Update marked step-up

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "Terms" [ref=e301] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e302]:
            - link "Privacy" [ref=e303] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-3 matrix: grant then revoke a benign permission, persisted across reload

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-4 system lock: super_admin role is read-only in UI and refused by the RPCs

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /system role/i
Received string:  "systemRole"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /system role/i
Received string:  "systemRole"

  222 |         })
  223 |       ).error,
> 224 |     ).toMatch(/system role/i);
      |       ^
  225 |     const permId = (
  226 |       await adminClient()
  227 |         .from("permissions")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:224:7
```

Context:

```text
          - listitem [ref=e626]:
            - generic [ref=e627]: About
          - listitem [ref=e628]:
            - generic [ref=e629]: Contact
      - navigation "Help" [ref=e630]:
        - heading "Help" [level=2] [ref=e631]
        - list [ref=e632]:
          - listitem [ref=e633]:
            - generic [ref=e634]: Safety
      - navigation "Legal" [ref=e635]:
        - heading "Legal" [level=2] [ref=e636]
        - list [ref=e637]:
          - listitem [ref=e638]:
            - link "Terms" [ref=e639] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e640]:
            - link "Privacy" [ref=e641] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e643]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-6 revocation path: unenrolling the factor refuses the next change

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-7 registration: DEC-016 permissions appear as grantable rows

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-10 members link preselects the role filter via the URL

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-16 the roles list on the agreed blocks: heading, Create role, Columns, Open and View members

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-17 P-1: the matrix shows the packages resource with View and Update, Update marked step-up

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  46 |   await page.getByTestId("role-create-submit").click();
  47 |   await stepUpIfPrompted(page, secret);
> 48 |   await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
     |                                                      ^
  49 |   return name;
  50 | }
  51 |
    at createRoleViaUi (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:48:54)
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - link "Terms" [ref=e281] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e282]:
            - link "Privacy" [ref=e283] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## i18n-sign-in-language.spec.ts › D239 — the account's language at sign-in › D239-E6 impersonation leaves the staff member's own language as it was, at start and at end

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')


  187 |         await page.getByTestId("impersonation-begin").click();
  188 |         await stepUpIfPrompted(page, secret);
> 189 |         await expect(page.getByTestId("impersonation-view")).toBeVisible({ timeout: 20000 });
      |                                                              ^
  190 |         await expect(page.locator("html")).toHaveAttribute("lang", "am");
  191 |
  192 |         await page.getByTestId("impersonation-banner-end").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/i18n-sign-in-language.spec.ts:189:62
```

Context:

```text
            - listitem [ref=e376]:
              - generic [ref=e377]: ስለ እኛ
            - listitem [ref=e378]:
              - generic [ref=e379]: ያግኙን
        - navigation "እገዛ" [ref=e380]:
          - heading "እገዛ" [level=2] [ref=e381]
          - list [ref=e382]:
            - listitem [ref=e383]:
              - generic [ref=e384]: ደህንነት
        - navigation "ሕጋዊ" [ref=e385]:
          - heading "ሕጋዊ" [level=2] [ref=e386]
          - list [ref=e387]:
            - listitem [ref=e388]:
              - link "ውሎች" [ref=e389] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e390]:
              - link "ግላዊነት" [ref=e391] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e393]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## i18n-sign-in-language.spec.ts › D239 — the account's language at sign-in › D239-E6 impersonation leaves the staff member's own language as it was, at start and at end

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')


  187 |         await page.getByTestId("impersonation-begin").click();
  188 |         await stepUpIfPrompted(page, secret);
> 189 |         await expect(page.getByTestId("impersonation-view")).toBeVisible({ timeout: 20000 });
      |                                                              ^
  190 |         await expect(page.locator("html")).toHaveAttribute("lang", "am");
  191 |
  192 |         await page.getByTestId("impersonation-banner-end").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/i18n-sign-in-language.spec.ts:189:62
```

Context:

```text
            - listitem [ref=e368]:
              - generic [ref=e369]: ስለ እኛ
            - listitem [ref=e370]:
              - generic [ref=e371]: ያግኙን
        - navigation "እገዛ" [ref=e372]:
          - heading "እገዛ" [level=2] [ref=e373]
          - list [ref=e374]:
            - listitem [ref=e375]:
              - generic [ref=e376]: ደህንነት
        - navigation "ሕጋዊ" [ref=e377]:
          - heading "ሕጋዊ" [level=2] [ref=e378]
          - list [ref=e379]:
            - listitem [ref=e380]:
              - link "ውሎች" [ref=e381] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e382]:
              - link "ግላዊነት" [ref=e383] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e385]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /permission denied/i
Received string:  "permissionDenied"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /permission denied/i
Received string:  "permissionDenied"

  191 |       })
  192 |     ).error;
> 193 |     expect(baseError ?? "").toMatch(/permission denied/i);
      |                             ^
  194 |
  195 |     const staff = await createUser({ confirmed: true });
  196 |     await grantRole(staff.id, "admin");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:193:29
```

Context:

```text
          - listitem [ref=e257]:
            - generic [ref=e258]: About
          - listitem [ref=e259]:
            - generic [ref=e260]: Contact
      - navigation "Help" [ref=e261]:
        - heading "Help" [level=2] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - generic [ref=e265]: Safety
      - navigation "Legal" [ref=e266]:
        - heading "Legal" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - link "Terms" [ref=e270] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e271]:
            - link "Privacy" [ref=e272] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e274]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /permission denied/i
Received string:  "permissionDenied"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /permission denied/i
Received string:  "permissionDenied"

  191 |       })
  192 |     ).error;
> 193 |     expect(baseError ?? "").toMatch(/permission denied/i);
      |                             ^
  194 |
  195 |     const staff = await createUser({ confirmed: true });
  196 |     await grantRole(staff.id, "admin");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:193:29
```

Context:

```text
          - listitem [ref=e326]:
            - generic [ref=e327]: About
          - listitem [ref=e328]:
            - generic [ref=e329]: Contact
      - navigation "Help" [ref=e330]:
        - heading "Help" [level=2] [ref=e331]
        - list [ref=e332]:
          - listitem [ref=e333]:
            - generic [ref=e334]: Safety
      - navigation "Legal" [ref=e335]:
        - heading "Legal" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - link "Terms" [ref=e339] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e340]:
            - link "Privacy" [ref=e341] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e343]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-6 negative: a base user cannot call the status RPC

- Source: `shard 16`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  360 |       })
  361 |     ).error;
> 362 |     expect(message ?? "").toContain("permission denied");
      |                           ^
  363 |   });
  364 |   test("AU-9 edit: staff edits display name and alias, activity records it", async ({ page }) => {
  365 |     const staff = await leaseUser();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:362:27
```

Context:

```text
          - listitem [ref=e249]:
            - generic [ref=e250]: About
          - listitem [ref=e251]:
            - generic [ref=e252]: Contact
      - navigation "Help" [ref=e253]:
        - heading "Help" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Safety
      - navigation "Legal" [ref=e258]:
        - heading "Legal" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - link "Terms" [ref=e262] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e263]:
            - link "Privacy" [ref=e264] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e266]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes

- Source: `shard 16`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('edit-error')
Expected: "That seller alias is already taken."
Received: "That seller alias is not allowed."
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('edit-error')
    19 × locator resolved to <p role="alert" data-testid="edit-error" class="text-sm text-destructive">That seller alias is not allowed.</p>
       - unexpected value "That seller alias is not allowed."

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('edit-error')
Expected: "That seller alias is already taken."
Received: "That seller alias is not allowed."
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('edit-error')
    19 × locator resolved to <p role="alert" data-testid="edit-error" class="text-sm text-destructive">That seller alias is not allowed.</p>
       - unexpected value "That seller alias is not allowed."


  412 |     await page.getByTestId("edit-save").click();
  413 |     await stepUpIfPrompted(page, secret);
> 414 |     await expect(page.getByTestId("edit-error")).toHaveText(
      |                                                  ^
  415 |       en["admin.users.edit.errorAliasTaken"],
  416 |       { timeout: 15000 },
```

Context:

```text
          - listitem [ref=e287]:
            - generic [ref=e288]: About
          - listitem [ref=e289]:
            - generic [ref=e290]: Contact
      - navigation "Help" [ref=e291]:
        - heading "Help" [level=2] [ref=e292]
        - list [ref=e293]:
          - listitem [ref=e294]:
            - generic [ref=e295]: Safety
      - navigation "Legal" [ref=e296]:
        - heading "Legal" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - link "Terms" [ref=e300] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e301]:
            - link "Privacy" [ref=e302] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e304]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters

- Source: `shard 16`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('edit-error')
Expected: "This name needs a reason before it can be set."
Received: "That seller alias is not allowed."
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('edit-error')
    19 × locator resolved to <p role="alert" data-testid="edit-error" class="text-sm text-destructive">That seller alias is not allowed.</p>
       - unexpected value "That seller alias is not allowed."

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('edit-error')
Expected: "This name needs a reason before it can be set."
Received: "That seller alias is not allowed."
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('edit-error')
    19 × locator resolved to <p role="alert" data-testid="edit-error" class="text-sm text-destructive">That seller alias is not allowed.</p>
       - unexpected value "That seller alias is not allowed."


  449 |       await page.getByTestId("edit-save").click();
  450 |       await stepUpIfPrompted(page, secret);
> 451 |       await expect(page.getByTestId("edit-error")).toHaveText(
      |                                                    ^
  452 |         en["admin.users.edit.errorAliasReason"],
  453 |         { timeout: 15000 },
```

Context:

```text
          - listitem [ref=e287]:
            - generic [ref=e288]: About
          - listitem [ref=e289]:
            - generic [ref=e290]: Contact
      - navigation "Help" [ref=e291]:
        - heading "Help" [level=2] [ref=e292]
        - list [ref=e293]:
          - listitem [ref=e294]:
            - generic [ref=e295]: Safety
      - navigation "Legal" [ref=e296]:
        - heading "Legal" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - link "Terms" [ref=e300] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e301]:
            - link "Privacy" [ref=e302] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e304]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-6 negative: a base user cannot call the status RPC

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  360 |       })
  361 |     ).error;
> 362 |     expect(message ?? "").toContain("permission denied");
      |                           ^
  363 |   });
  364 |   test("AU-9 edit: staff edits display name and alias, activity records it", async ({ page }) => {
  365 |     const staff = await leaseUser();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:362:27
```

Context:

```text
          - listitem [ref=e354]:
            - generic [ref=e355]: About
          - listitem [ref=e356]:
            - generic [ref=e357]: Contact
      - navigation "Help" [ref=e358]:
        - heading "Help" [level=2] [ref=e359]
        - list [ref=e360]:
          - listitem [ref=e361]:
            - generic [ref=e362]: Safety
      - navigation "Legal" [ref=e363]:
        - heading "Legal" [level=2] [ref=e364]
        - list [ref=e365]:
          - listitem [ref=e366]:
            - link "Terms" [ref=e367] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e368]:
            - link "Privacy" [ref=e369] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e371]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('edit-error')
Expected: "That seller alias is already taken."
Received: "That seller alias is not allowed."
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('edit-error')
    19 × locator resolved to <p role="alert" data-testid="edit-error" class="text-sm text-destructive">That seller alias is not allowed.</p>
       - unexpected value "That seller alias is not allowed."

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('edit-error')
Expected: "That seller alias is already taken."
Received: "That seller alias is not allowed."
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('edit-error')
    19 × locator resolved to <p role="alert" data-testid="edit-error" class="text-sm text-destructive">That seller alias is not allowed.</p>
       - unexpected value "That seller alias is not allowed."


  412 |     await page.getByTestId("edit-save").click();
  413 |     await stepUpIfPrompted(page, secret);
> 414 |     await expect(page.getByTestId("edit-error")).toHaveText(
      |                                                  ^
  415 |       en["admin.users.edit.errorAliasTaken"],
  416 |       { timeout: 15000 },
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: Contact
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
      - navigation "Legal" [ref=e301]:
        - heading "Legal" [level=2] [ref=e302]
        - list [ref=e303]:
          - listitem [ref=e304]:
            - link "Terms" [ref=e305] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e306]:
            - link "Privacy" [ref=e307] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e309]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('edit-error')
Expected: "This name needs a reason before it can be set."
Received: "That seller alias is not allowed."
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('edit-error')
    19 × locator resolved to <p role="alert" data-testid="edit-error" class="text-sm text-destructive">That seller alias is not allowed.</p>
       - unexpected value "That seller alias is not allowed."

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('edit-error')
Expected: "This name needs a reason before it can be set."
Received: "That seller alias is not allowed."
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('edit-error')
    19 × locator resolved to <p role="alert" data-testid="edit-error" class="text-sm text-destructive">That seller alias is not allowed.</p>
       - unexpected value "That seller alias is not allowed."


  449 |       await page.getByTestId("edit-save").click();
  450 |       await stepUpIfPrompted(page, secret);
> 451 |       await expect(page.getByTestId("edit-error")).toHaveText(
      |                                                    ^
  452 |         en["admin.users.edit.errorAliasReason"],
  453 |         { timeout: 15000 },
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: Contact
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
      - navigation "Legal" [ref=e301]:
        - heading "Legal" [level=2] [ref=e302]
        - list [ref=e303]:
          - listitem [ref=e304]:
            - link "Terms" [ref=e305] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e306]:
            - link "Privacy" [ref=e307] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e309]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › D189 deactivated staff › AU-14 a deactivated staff account holds no permission: the staff door refuses it and has_permission answers false (D189)

- Source: `shard 16`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /permission denied|account is deactivated/
Received string:  "accountDeactivated"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /permission denied|account is deactivated/
Received string:  "accountDeactivated"

  603 |       p_reason: "e2e",
  604 |     });
> 605 |     expect(error?.message ?? "").toMatch(/permission denied|account is deactivated/);
      |                                  ^
  606 |   });
  607 | });
  608 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:605:34
```

Context:

```text
          - listitem [ref=e290]:
            - generic [ref=e291]: About
          - listitem [ref=e292]:
            - generic [ref=e293]: Contact
      - navigation "Help" [ref=e294]:
        - heading "Help" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - generic [ref=e298]: Safety
      - navigation "Legal" [ref=e299]:
        - heading "Legal" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - link "Terms" [ref=e303] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e304]:
            - link "Privacy" [ref=e305] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e307]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › D189 deactivated staff › AU-14 a deactivated staff account holds no permission: the staff door refuses it and has_permission answers false (D189)

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /permission denied|account is deactivated/
Received string:  "accountDeactivated"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /permission denied|account is deactivated/
Received string:  "accountDeactivated"

  603 |       p_reason: "e2e",
  604 |     });
> 605 |     expect(error?.message ?? "").toMatch(/permission denied|account is deactivated/);
      |                                  ^
  606 |   });
  607 | });
  608 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:605:34
```

Context:

```text
          - listitem [ref=e295]:
            - generic [ref=e296]: About
          - listitem [ref=e297]:
            - generic [ref=e298]: Contact
      - navigation "Help" [ref=e299]:
        - heading "Help" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - generic [ref=e303]: Safety
      - navigation "Legal" [ref=e304]:
        - heading "Legal" [level=2] [ref=e305]
        - list [ref=e306]:
          - listitem [ref=e307]:
            - link "Terms" [ref=e308] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e309]:
            - link "Privacy" [ref=e310] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e312]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 9

No `[ssr-error]` lines in the `shard 9` log (or no log was uploaded).

## Client errors: shard 9

```text
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"[object Object]\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"%5Bobject%20Object%5D\""})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×8
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"[object Object]\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"%5Bobject%20Object%5D\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"[object Object]\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"%5Bobject%20Object%5D\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"[object Object]\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"%5Bobject%20Object%5D\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"[object Object]\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"%5Bobject%20Object%5D\""})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×8
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"[object Object]\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"%5Bobject%20Object%5D\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"[object Object]\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"%5Bobject%20Object%5D\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"[object Object]\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"%5Bobject%20Object%5D\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"[object Object]\""})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_get_role ({"code":"22P02","details":null,"hint":null,"message":"invalid input syntax for type uuid: \"%5Bobject%20Object%5D\""})
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
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_set_account_status ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_set_account_status ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_set_account_status ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_set_account_status ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
```

## Server errors: shard 16

No `[ssr-error]` lines in the `shard 16` log (or no log was uploaded).

## Client errors: shard 16

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_update_profile ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "aliasTaken", "refusals": [{"reason": "aliasTaken"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_update_profile ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "aliasTaken", "refusals": [{"reason": "aliasTaken"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_update_profile ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "aliasReserved:d", "refusals": [{"detail": "d", "reason": "aliasReserved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_update_profile ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "aliasReserved:d", "refusals": [{"detail": "d", "reason": "aliasReserved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_set_account_status ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_set_account_status ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_update_profile ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "aliasTaken", "refusals": [{"reason": "aliasTaken"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_update_profile ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "aliasTaken", "refusals": [{"reason": "aliasTaken"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_update_profile ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "aliasReserved:d", "refusals": [{"detail": "d", "reason": "aliasReserved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_update_profile ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "aliasReserved:d", "refusals": [{"detail": "d", "reason": "aliasReserved"}]})
```
