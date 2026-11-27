# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45939465263 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45939465263
- Commit: `09cf369772736bbef313c8ab5a0f5d7f220cfaac`
- Attempt: 2
- Repeat: 40 of 60 tests repeated — specs directly changed 1/1, importers of a changed helper 5/7; budget 793 s; the time cap left 80 test runs
- Written (UTC): 2026-11-27T11:36:12.098Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): repeat (2)

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 9` · dialogs.spec.ts › one dialog look (turn S6-1) › DLG-E5 focus goes in on open and back to the trigger on Escape; the page does not move — Error: style-dialog: the page did not scroll

## Flaky bodies (DEC-078)

### dialogs.spec.ts › one dialog look (turn S6-1) › DLG-E5 focus goes in on open and back to the trigger on Escape; the page does not move

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: style-dialog: the page did not scroll

expect(received).toBe(expected) // Object.is equality

Expected: 12468
Received: 8222
--- further error 1 ---
Error: style-dialog: the page did not scroll

expect(received).toBe(expected) // Object.is equality

Expected: 12468
Received: 8222

  341 |       if (first === "the field") expect(inside.field).toBe("style-sheet-end-field");
  342 |       else expect(inside.radio, `${id}: the focus is on the chosen choice`).toBe(true);
> 343 |       expect(await page.evaluate(() => window.scrollY), `${id}: the page did not scroll`).toBe(
      |                                                                                           ^
  344 |         before,
  345 |       );
  346 |       await page.keyboard.press("Escape");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/dialogs.spec.ts:343:91
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [client-error] gate fetch threw
```

Context:

```text
          - img [ref=e11]
        - generic [ref=e13]: Spam or misleading
      - generic [ref=e15]:
        - radio "Scam or fraud" [ref=e16] [cursor=pointer]
        - generic [ref=e17]: Scam or fraud
      - generic [ref=e19]:
        - radio "Copyright or stolen photos" [ref=e20] [cursor=pointer]
        - generic [ref=e21]: Copyright or stolen photos
    - generic [ref=e22]:
      - generic [ref=e23]:
        - generic [ref=e24]: Anything else we should know?
        - generic [ref=e25]: Optional
      - textbox "Anything else we should know?" [ref=e26]
    - generic [ref=e27]:
      - button "Cancel" [ref=e28] [cursor=pointer]
      - button "Send report" [ref=e29] [cursor=pointer]
    - button "Close" [ref=e30] [cursor=pointer]:
      - img [ref=e31]
      - generic [ref=e34]: Close
```
```

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 913s for the test suite to run
(no place given)
```

```text
Timed out waiting 913s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

64 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 8, shard 11 |
| `categories wrongFile` (quiet) | 4 | shard 8, shard 11 |
| `definitions badHeader` (quiet) | 4 | shard 5, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 5, shard 8 |
| `categories file too large` (quiet) | 2 | shard 8 |
| `categories nulByte` (quiet) | 2 | shard 8 |
| `categories unknownColumn` (quiet) | 2 | shard 8 |
| `countries badHeader` (quiet) | 2 | shard 8 |
| `countries nulByte` (quiet) | 2 | shard 8 |
| `countries tooManyRows` (quiet) | 2 | shard 8 |
| `countries unknownColumn` (quiet) | 2 | shard 8 |
| `countries wrongFile` (quiet) | 2 | shard 8 |
| `definitions nulByte` (quiet) | 2 | shard 8 |
| `definitions tooManyRows` (quiet) | 2 | shard 8 |
| `definitions unknownColumn` (quiet) | 2 | shard 8 |
| `links unknownColumn` (quiet) | 2 | shard 8 |
| `locations badHeader` (quiet) | 2 | shard 8 |
| `locations file too large` (quiet) | 2 | shard 8 |
| `locations nulByte` (quiet) | 2 | shard 8 |
| `locations unknownColumn` (quiet) | 2 | shard 8 |
| `locations wrongFile` (quiet) | 2 | shard 8 |
| `not signed in Auth session missing!` | 2 | shard 13 |
| `strings badHeader` (quiet) | 2 | shard 8 |
| `strings emptyFile` (quiet) | 2 | shard 8 |
| `strings nulByte` (quiet) | 2 | shard 8 |
| `strings tooManyRows` (quiet) | 2 | shard 8 |
| `strings unknownColumn` (quiet) | 2 | shard 8 |
| `strings wrongFile` (quiet) | 2 | shard 8 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### not signed in Auth session missing!

- Count: 2 · Sources: shard 13
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): RP-1 gating: moderator refused, admin sees the list, signed-out deep link redire ×2 · AU-2 search and status filter ×1 · RP-17 P-1: the matrix shows the packages resource with View and Update, Update m ×1

```text
[WebServer] [ssr-error] /api/error-reports not signed in Auth session missing!
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-27T04:25:14.562Z | 7.0 min |
| email | 2026-11-27T04:25:03.246Z | 0.3 min |
| webkit | 2026-11-27T04:25:05.779Z | 10.7 min |
| shard 1 | 2026-11-27T04:24:51.779Z | 12.2 min |
| shard 2 | 2026-11-27T04:25:50.399Z | 11.2 min |
| shard 3 | 2026-11-27T04:25:10.126Z | 9.0 min |
| shard 4 | 2026-11-27T04:25:19.179Z | 7.2 min |
| shard 5 | 2026-11-27T04:25:51.910Z | 17.7 min |
| shard 6 | 2026-11-27T04:25:05.451Z | 18.9 min |
| shard 7 | 2026-11-27T04:25:37.695Z | 17.0 min |
| shard 8 | 2026-11-27T04:27:49.256Z | 12.7 min |
| shard 9 | 2026-11-27T04:25:35.688Z | 7.4 min |
| shard 10 | 2026-11-27T04:25:12.829Z | 18.2 min |
| shard 11 | 2026-11-27T04:29:05.288Z | 25.6 min |
| shard 12 | 2026-11-27T04:25:22.970Z | 15.2 min |
| shard 13 | 2026-11-27T04:25:38.032Z | 11.1 min |
| shard 14 | 2026-11-27T04:25:30.015Z | 18.7 min |
| shard 15 | 2026-11-27T04:25:40.337Z | 17.5 min |
| shard 16 | 2026-11-27T11:23:20.614Z | 12.4 min |
| repeat | 2026-11-27T04:26:39.993Z | 15.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.2 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 23.0 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 21.5 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 20.7 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 19.3 min | smoke, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 17.2 min | shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 17.1 min | shard 6 |
| `failure-crawl-admin-content.spec.ts` | 54 | 17.1 min | shard 2, repeat |
| `admin-attributes-links.spec.ts` | 34 | 15.8 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 15.1 min | shard 10 |
| `admin-locations.spec.ts` | 44 | 14.8 min | shard 10 |
| `failure-crawl-admin-catalog.spec.ts` | 54 | 13.8 min | shard 4, repeat |
| `admin-monetisation.spec.ts` | 34 | 13.5 min | smoke, shard 6 |
| `import-security.spec.ts` | 36 | 11.9 min | shard 8 |
| `admin-roles.spec.ts` | 28 | 11.1 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 9.6 min | smoke, shard 1 |
| `shell.spec.ts` | 234 | 8.9 min | shard 1 |
| `admin-categories-console.spec.ts` | 34 | 8.9 min | shard 11 |
| `failure-crawl-member-listings.spec.ts` | 30 | 7.3 min | shard 3, repeat |
| `admin-attributes-safety.spec.ts` | 18 | 7.2 min | shard 11 |
| `failure-crawl-admin-people.spec.ts` | 42 | 7.2 min | shard 5, repeat |
| `admin-countries.spec.ts` | 18 | 7.0 min | shard 8 |
| `auth-signout.spec.ts` | 44 | 6.3 min | webkit, shard 5 |
| `admin-translations-governance.spec.ts` | 20 | 5.8 min | smoke, shard 1 |
| `admin-translations-data.spec.ts` | 10 | 5.3 min | shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 7 |
| `dialogs.spec.ts` | 36 | 5.1 min | webkit, shard 9 |
| `post-wizard-place.spec.ts` | 40 | 5.1 min | shard 15 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 9 |
| `admin-guides.spec.ts` | 14 | 4.4 min | shard 2 |
| `ad-page.spec.ts` | 104 | 4.3 min | webkit, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.1 min | shard 16 |
| `photo-pipeline.spec.ts` | 74 | 4.1 min | webkit, shard 12 |
| `admin-screening-reject.spec.ts` | 10 | 4.1 min | shard 2 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 14 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 7 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 3 |
| `mfa-stepup.spec.ts` | 28 | 3.3 min | webkit, shard 15 |
| `choice-lists.spec.ts` | 96 | 2.9 min | shard 3 |
| `post-wizard-category.spec.ts` | 54 | 2.9 min | webkit, shard 13 |
| `my-listings-ad.spec.ts` | 38 | 2.8 min | shard 8 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 4 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 10 |
| `failure-crawl-public.spec.ts` | 26 | 2.6 min | shard 12 |
| `post-wizard-resets.spec.ts` | 34 | 2.2 min | shard 9 |
| `admin-services.spec.ts` | 10 | 2.1 min | shard 1 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 16 |
| `failure-crawl-member-account.spec.ts` | 48 | 2.0 min | shard 15, repeat |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 6 |
| `name-check-queue.spec.ts` | 8 | 1.9 min | smoke, shard 8 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.8 min | shard 14 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 14 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 15 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 4 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 10 |
| `my-listings-page.spec.ts` | 24 | 1.1 min | webkit, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `page-head.spec.ts` | 4 | 1.0 min | shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 13 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 7 |
| `press.spec.ts` | 22 | 0.9 min | shard 16 |
| `staff-gate.spec.ts` | 4 | 0.8 min | shard 11 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 11 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 12 |
| `house-style.spec.ts` | 18 | 0.6 min | shard 14 |
| `settings.spec.ts` | 16 | 0.6 min | shard 7 |
| `breadcrumbs.spec.ts` | 6 | 0.6 min | shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 9 |
| `overlays.spec.ts` | 8 | 0.6 min | shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 16 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 5 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 4 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 13 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 16 |
| `post-wizard-details.spec.ts` | 8 | 0.3 min | shard 4 |
| `auth-caller-gates.spec.ts` | 8 | 0.3 min | shard 1 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 6 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 2 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 14 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 15 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 3 |
| `submenu.spec.ts` | 14 | 0.2 min | smoke, shard 8 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 2 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 10 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 5 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 9 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 12 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 14 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `error-reports.spec.ts` | 12 | 0.1 min | shard 15, repeat |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 2 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 13 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 3 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 7 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 15 |
| `offline.spec.ts` | 2 | 0.0 min | shard 11 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 6 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 280.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 135.8 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 135.7 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 108.7 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 107.1 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 103.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 87.6 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 70.3 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 69.6 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 69.5 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 69.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 68.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.8 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 66.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.0 s |
