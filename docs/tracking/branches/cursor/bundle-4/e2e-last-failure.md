# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45110205977 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45110205977
- Commit: `478a2944c382fab6afe66ef2477e848588c1625d`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-573d02e36698… (1 read)
- Repeat: 14 of 14 tests repeated — specs directly changed 1/1, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-23T04:29:54.884Z
- Post-test warnings: 60
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 16` · admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate — Error: expect(locator).toHaveText(expected) failed

## Flaky bodies (DEC-078)

### admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('user-status-card').getByTestId('user-status')
Expected: "Active"
Received: "Deactivated"
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('user-status-card').getByTestId('user-status')
    19 × locator resolved to <div data-testid="user-status" class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80">Deactivated</div>
       - unexpected value "Deactivated"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('user-status-card').getByTestId('user-status')
Expected: "Active"
Received: "Deactivated"
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('user-status-card').getByTestId('user-status')
    19 × locator resolved to <div data-testid="user-status" class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80">Deactivated</div>
       - unexpected value "Deactivated"


  227 |     await stepUpIfPrompted(page, secret);
  228 |     await expectAal2(page);
> 229 |     await expect(page.getByTestId("user-status-card").getByTestId("user-status")).toHaveText(
      |                                                                                   ^
  230 |       en["admin.users.status.active"],
  231 |       { timeout: 15000 },
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
```

Context:

```text
          - listitem [ref=e302]:
            - generic [ref=e303]: About
          - listitem [ref=e304]:
            - generic [ref=e305]: Contact
      - navigation "Help" [ref=e306]:
        - heading "Help" [level=2] [ref=e307]
        - list [ref=e308]:
          - listitem [ref=e309]:
            - generic [ref=e310]: Safety
      - navigation "Legal" [ref=e311]:
        - heading "Legal" [level=2] [ref=e312]
        - list [ref=e313]:
          - listitem [ref=e314]:
            - link "Terms" [ref=e315] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e316]:
            - link "Privacy" [ref=e317] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e319]: © 2026 ethio.com — All rights reserved.
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
| smoke | 2026-11-23T04:15:44.391Z | 4.1 min |
| email | 2026-11-23T04:15:23.093Z | 0.4 min |
| webkit | 2026-11-23T04:15:14.957Z | 9.4 min |
| shard 1 | 2026-11-23T04:17:43.590Z | 5.4 min |
| shard 2 | 2026-11-23T04:14:51.286Z | 7.0 min |
| shard 3 | 2026-11-23T04:14:46.449Z | 7.8 min |
| shard 4 | 2026-11-23T04:14:46.434Z | 8.4 min |
| shard 5 | 2026-11-23T04:19:11.333Z | 6.0 min |
| shard 6 | 2026-11-23T04:15:13.873Z | 7.3 min |
| shard 7 | 2026-11-23T04:19:27.983Z | 5.1 min |
| shard 8 | 2026-11-23T04:14:27.071Z | 5.5 min |
| shard 9 | 2026-11-23T04:13:53.272Z | 6.2 min |
| shard 10 | 2026-11-23T04:15:01.514Z | 5.7 min |
| shard 11 | 2026-11-23T04:14:07.154Z | 6.0 min |
| shard 12 | 2026-11-23T04:14:55.649Z | 5.9 min |
| shard 13 | 2026-11-23T04:15:45.517Z | 4.9 min |
| shard 14 | 2026-11-23T04:14:20.837Z | 5.1 min |
| shard 15 | 2026-11-23T04:22:40.819Z | 6.3 min |
| shard 16 | 2026-11-23T04:18:14.668Z | 5.7 min |
| repeat | 2026-11-23T04:16:43.754Z | 9.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `mfa-stepup.spec.ts` | 140 | 10.9 min | webkit, shard 15, repeat |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `import-security.spec.ts` | 36 | 8.0 min | shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 6.8 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.6 min | shard 3 |
| `admin-locations.spec.ts` | 44 | 5.7 min | shard 6 |
| `auth-signout.spec.ts` | 44 | 5.2 min | webkit, shard 9 |
| `admin-listings.spec.ts` | 82 | 5.0 min | webkit, shard 10 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `admin-screening.spec.ts` | 64 | 4.7 min | webkit, shard 14 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `dialogs.spec.ts` | 36 | 4.5 min | webkit, shard 10 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 11 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `admin-roles.spec.ts` | 28 | 4.3 min | shard 9 |
| `admin-users.spec.ts` | 28 | 4.3 min | shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 7 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 11 |
| `admin-monetisation.spec.ts` | 34 | 3.6 min | smoke, shard 10 |
| `sage-bands.spec.ts` | 76 | 3.5 min | shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `post-wizard-category.spec.ts` | 52 | 3.4 min | webkit, shard 4 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `post-wizard-resets.spec.ts` | 34 | 3.2 min | shard 3 |
| `posting-routes.spec.ts` | 80 | 3.2 min | shard 2 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `admin-countries.spec.ts` | 18 | 2.7 min | shard 6 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `sage-tiers.spec.ts` | 52 | 1.9 min | webkit, shard 2 |
| `admin-categories-home.spec.ts` | 10 | 1.9 min | shard 4 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `legal-admin.spec.ts` | 44 | 1.7 min | shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-guides.spec.ts` | 14 | 1.6 min | shard 3 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.5 min | shard 3 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 14 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 2 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 10 |
| `my-listings-levels.spec.ts` | 28 | 0.9 min | shard 4 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.8 min | shard 6 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 7 |
| `house-style.spec.ts` | 14 | 0.7 min | shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 16 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 16 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `overlay-shift.spec.ts` | 6 | 0.2 min | shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 56.2 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 48.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.5 s |
| `admin-users.spec.ts` › AU-3 detail: reason required, deactivate, audit row, reactivate | desktop-1280 | 42.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.0 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.7 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 33.8 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 33.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
