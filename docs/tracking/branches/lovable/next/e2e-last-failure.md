# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45049131600
- Commit: `0965f518396a8f1351939c85b2f05f34365c67fb`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-fb89e3e84c1b… (0 read)
- Repeat: 34 of 108 tests repeated — specs directly changed 4/8, importers of a changed helper 0/0; budget 643 s; the time cap left 34 test runs
- Written (UTC): 2026-11-22T17:40:59.082Z
- Passed: 2684 · Skipped: 405 · Failed: 1
- Gating failures: 1 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): repeat (2)

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name — Error: bulk entity AI never reached scratch location [account id]
- FLAKY (passed on retry) · `desktop-1280` · source `shard 11` · house-style.spec.ts › house style fixture › HS-6 the focus ring shows after keyboard use only — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: bulk entity AI never reached scratch location [account id]

expect(received).toBe(expected) // Object.is equality

Expected: "machine"
Received: "missing"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: bulk entity AI never reached scratch location [account id]

expect(received).toBe(expected) // Object.is equality

Expected: "machine"
Received: "missing"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

  505 |       await expect(page.getByTestId("ai-bulk-summary")).toBeVisible({ timeout: 90000 });
  506 |       for (const anchor of [one, two]) {
> 507 |         await expect
      |         ^
  508 |           .poll(() => statusOf(anchor.id), {
  509 |             timeout: 30000,
  510 |             message: `bulk entity AI never reached scratch location ${anchor.id}`,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:507:9
```

Context:

```text
          - listitem [ref=e378]:
            - generic [ref=e379]: About
          - listitem [ref=e380]:
            - generic [ref=e381]: Contact
      - navigation "Help" [ref=e382]:
        - heading "Help" [level=2] [ref=e383]
        - list [ref=e384]:
          - listitem [ref=e385]:
            - generic [ref=e386]: Safety
      - navigation "Legal" [ref=e387]:
        - heading "Legal" [level=2] [ref=e388]
        - list [ref=e389]:
          - listitem [ref=e390]:
            - link "Terms" [ref=e391] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e392]:
            - link "Privacy" [ref=e393] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e395]: © 2026 ethio.com — All rights reserved.
```
```

### house-style.spec.ts › house style fixture › HS-6 the focus ring shows after keyboard use only

- Source: `shard 11`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('style-row-1-more-copy')
    - locator resolved to <div tabindex="-1" role="menuitem" data-orientation="vertical" data-radix-collection-item="" data-testid="style-row-1-more-copy" class="data-[pressed]:bg-nav-pill data-[pressed]:text-nav-ink data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none relative flex min-h-11 md:pointer-fine:min-h-10 md:pointer-fine:h-10 w-full min-w-0 cursor-default select-none items-center gap-2 roun…>…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
      - waiting 100ms
    113 × waiting for element to be visible, enabled and stable
```

Context:

```text
          - list [ref=e1721]:
            - listitem [ref=e1722]:
              - generic [ref=e1723]: Safety
        - navigation "Legal" [ref=e1724]:
          - heading "Legal" [level=2] [ref=e1725]
          - list [ref=e1726]:
            - listitem [ref=e1727]:
              - link "Terms" [ref=e1728] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e1729]:
              - link "Privacy" [ref=e1730] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e1732]: © 2026 ethio.com — All rights reserved.
  - menu "Actions — Alpha" [active] [ref=e1734]:
    - menuitem "Copy" [ref=e1735]:
      - generic [ref=e1736]: Copy
    - separator [ref=e1737]
    - menuitem "Erase" [ref=e1738]:
      - generic [ref=e1739]: Erase
```
```

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 763s for the test suite to run
(no place given)
```

```text
Timed out waiting 763s for the teardown for test suite to run
(no place given)
```

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
| smoke | 2026-11-22T17:26:50.732Z | 4.5 min |
| email | 2026-11-22T17:26:34.876Z | 0.3 min |
| webkit | 2026-11-22T17:27:09.587Z | 12.8 min |
| shard 1 | 2026-11-22T17:27:12.448Z | 5.9 min |
| shard 2 | 2026-11-22T17:27:21.663Z | 6.7 min |
| shard 3 | 2026-11-22T17:26:43.188Z | 5.9 min |
| shard 4 | 2026-11-22T17:28:16.613Z | 5.8 min |
| shard 5 | 2026-11-22T17:27:17.265Z | 6.3 min |
| shard 6 | 2026-11-22T17:26:52.024Z | 5.6 min |
| shard 7 | 2026-11-22T17:27:14.462Z | 7.1 min |
| shard 8 | 2026-11-22T17:29:41.172Z | 6.6 min |
| shard 9 | 2026-11-22T17:26:44.595Z | 7.3 min |
| shard 10 | 2026-11-22T17:29:06.547Z | 6.0 min |
| shard 11 | 2026-11-22T17:27:22.509Z | 7.7 min |
| shard 12 | 2026-11-22T17:26:36.138Z | 5.8 min |
| shard 13 | 2026-11-22T17:26:15.910Z | 4.9 min |
| shard 14 | 2026-11-22T17:30:10.591Z | 5.0 min |
| shard 15 | 2026-11-22T17:27:23.132Z | 7.6 min |
| shard 16 | 2026-11-22T17:26:36.562Z | 5.9 min |
| repeat | 2026-11-22T17:27:13.127Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-roles.spec.ts` | 84 | 11.2 min | shard 9, repeat |
| `shell.spec.ts` | 234 | 10.2 min | shard 1 |
| `auth-signout.spec.ts` | 44 | 6.8 min | webkit, shard 9 |
| `admin-attributes-library.spec.ts` | 42 | 6.5 min | shard 2 |
| `dialogs.spec.ts` | 36 | 5.8 min | webkit, shard 10 |
| `admin-listings.spec.ts` | 82 | 5.5 min | webkit, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 5.4 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 5.4 min | smoke, shard 8 |
| `import-security.spec.ts` | 36 | 5.3 min | shard 4 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 3 |
| `feed-screens.spec.ts` | 40 | 5.1 min | webkit, shard 5 |
| `post-wizard-place.spec.ts` | 40 | 5.0 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 5.0 min | webkit, shard 14 |
| `post-wizard-where.spec.ts` | 32 | 4.9 min | shard 11 |
| `admin-translations-data.spec.ts` | 30 | 4.9 min | shard 5, repeat |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.8 min | shard 15 |
| `ad-page.spec.ts` | 104 | 4.7 min | webkit, shard 13 |
| `admin-locations.spec.ts` | 44 | 4.6 min | shard 6 |
| `photo-pipeline.spec.ts` | 74 | 4.5 min | webkit, shard 16 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `admin-audit.spec.ts` | 48 | 4.2 min | shard 9, repeat |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.9 min | shard 8 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `admin-monetisation.spec.ts` | 34 | 3.8 min | smoke, shard 10 |
| `choice-lists.spec.ts` | 96 | 3.7 min | shard 7 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `posting-routes.spec.ts` | 80 | 3.0 min | shard 2 |
| `mfa-stepup.spec.ts` | 24 | 2.9 min | webkit, shard 15 |
| `post-wizard-category.spec.ts` | 52 | 2.8 min | webkit, shard 4 |
| `legal-admin.spec.ts` | 44 | 2.7 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 2.6 min | webkit, shard 11 |
| `house-style.spec.ts` | 42 | 2.5 min | shard 11, repeat |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 8 |
| `sage-tiers.spec.ts` | 52 | 1.9 min | webkit, shard 2 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 14 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.3 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `my-listings-page.spec.ts` | 24 | 1.1 min | webkit, shard 10 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.1 min | shard 15 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `sage-cards.spec.ts` | 40 | 1.0 min | webkit, shard 7 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 16 |
| `legal-doors.spec.ts` | 34 | 0.8 min | smoke, shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.4 min | smoke, shard 15 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `posting-routes-identity.spec.ts` | 4 | 0.3 min | shard 15 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.2 min | shard 11 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 64.8 s |
| `house-style.spec.ts` › HS-6 the focus ring shows after keyboard use only | desktop-1280 | 62.0 s |
| `admin-translations-data.spec.ts` › TR-26 the Data scope approves every machine-filled content name | desktop-1280 | 51.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.8 s |
| `auth-signout.spec.ts` › SO-14 a refresh the server refuses ends the session once: the notice offers sign-in, nothing says it could not be loaded, and the sign-in after it sticks (INC-1218) | desktop-1280 | 39.1 s |
| `auth-signout.spec.ts` › SO-14 a refresh the server refuses ends the session once: the notice offers sign-in, nothing says it could not be loaded, and the sign-in after it sticks (INC-1218) | mobile-360 | 39.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.0 s |
| `dialogs.spec.ts` › DLG-E11 every banded panel of the board: the body has its content's height or scrolls, between the header and the last band, inside the window | webkit-390 | 37.5 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 36.6 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 35.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 35.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45049131600-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45049131600-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45049131600-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45049131600-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 45049131600-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45049131600-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45049131600-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45049131600-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45049131600-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45049131600-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 3, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 45049131600-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 45049131600-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45049131600-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45049131600-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45049131600-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45049131600-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45049131600-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 2, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 45 user(s) owned by process 45049131600-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45049131600-local-16
```

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-97 the map credit is visible and uncovered on both plans

- Source: `shard 11`
- Project: `mobile-360`

```text
Error: PW-97: the Esri credit is covered

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: PW-97: the Esri credit is covered

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  707 |         return hit !== null && (hit === el || el.contains(hit));
  708 |       });
> 709 |       expect(onTop, `PW-97: the ${label} credit is covered`).toBe(true);
      |                                                              ^
  710 |       return credit;
  711 |     };
  712 |     await page.getByTestId("post-where-pin-open").click();
    at uncovered (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:709:62)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:716:18
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-97-the-map-credit-is-visible-and-uncovered-on-both-plans-mobile-360` — Playwright's name `post-wizard-where-POSTING--b3733-and-uncovered-on-both-plans-mobile-360`; this run carried 3 context file(s); of the same spec: none

## Server errors: shard 11

No `[ssr-error]` lines in the `shard 11` log (or no log was uploaded).

## Client errors: shard 11

No `[client-error]` lines in the `shard 11` log (or no log was uploaded).
