# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46102310512
- Commit: `b355cbe0011991a9a20246b233dcdfcef8c0e906`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-a4cd07d3c085… (0 read)
- Repeat: 84 of 1511 tests repeated — specs directly changed 9/11, importers of a changed helper 1/114; budget 862 s
- Measured lane spread (DEC-375 b): mean 449 s, largest 589 s (lane 2, +31 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights
- Written (UTC): 2026-11-28T03:40:23.633Z
- Passed: 3034 · Skipped: 422 · Failed: 1
- Gating failures: 1 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: none
- Errors outside any test (INC-589): none

## Gating failures

### admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: CO-6: the rail save refused notARoot twice
--- further error 1 ---
Error: CO-6: the rail save refused notARoot twice

  338 |           await saveSwap(pair[0]);
  339 |           if ((await outcome(pair[0], pair[1])) === "notARoot") {
> 340 |             throw new Error("CO-6: the rail save refused notARoot twice");
      |                   ^
  341 |           }
  342 |         }
  343 |         // Relative, never absolute: a sibling's scratch root may cascade away.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:340:19
```

Context:

```text
              - button "Move down" [ref=e67] [cursor=pointer]: ↓
            - listitem [ref=e68]:
              - generic [ref=e69]: 14. Babies & Kids
              - button "Move up" [ref=e70] [cursor=pointer]: ↑
              - button "Move down" [ref=e71] [cursor=pointer]: ↓
            - listitem [ref=e72]:
              - generic [ref=e73]: 15. Commercial Equipment
              - button "Move up" [ref=e74] [cursor=pointer]: ↑
              - button "Move down" [disabled]: ↓
          - alert [ref=e75]: Only a root category can be ordered on the rail.
      - generic:
        - img
        - generic: More below
    - generic [ref=e76]:
      - button "Reset order" [ref=e77] [cursor=pointer]
      - button "Save order" [ref=e78] [cursor=pointer]
    - button "Close" [ref=e79] [cursor=pointer]:
      - img [ref=e80]
      - generic [ref=e83]: Close
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 13, shard 16 |
| `categories wrongFile` (quiet) | 4 | shard 13, shard 16 |
| `definitions badHeader` (quiet) | 4 | shard 13, shard 16 |
| `definitions wrongFile` (quiet) | 4 | shard 13, shard 16 |
| `categories file too large` (quiet) | 2 | shard 13 |
| `categories nulByte` (quiet) | 2 | shard 13 |
| `categories unknownColumn` (quiet) | 2 | shard 13 |
| `countries badHeader` (quiet) | 2 | shard 13 |
| `countries nulByte` (quiet) | 2 | shard 13 |
| `countries tooManyRows` (quiet) | 2 | shard 13 |
| `countries unknownColumn` (quiet) | 2 | shard 13 |
| `countries wrongFile` (quiet) | 2 | shard 13 |
| `definitions nulByte` (quiet) | 2 | shard 13 |
| `definitions tooManyRows` (quiet) | 2 | shard 13 |
| `definitions unknownColumn` (quiet) | 2 | shard 13 |
| `links unknownColumn` (quiet) | 2 | shard 13 |
| `locations badHeader` (quiet) | 2 | shard 13 |
| `locations file too large` (quiet) | 2 | shard 13 |
| `locations nulByte` (quiet) | 2 | shard 13 |
| `locations unknownColumn` (quiet) | 2 | shard 13 |
| `locations wrongFile` (quiet) | 2 | shard 13 |
| `strings badHeader` (quiet) | 2 | shard 13 |
| `strings emptyFile` (quiet) | 2 | shard 13 |
| `strings nulByte` (quiet) | 2 | shard 13 |
| `strings tooManyRows` (quiet) | 2 | shard 13 |
| `strings unknownColumn` (quiet) | 2 | shard 13 |
| `strings wrongFile` (quiet) | 2 | shard 13 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-28T03:22:52.475Z | 4.3 min |
| email | 2026-11-28T03:23:11.566Z | 0.3 min |
| webkit | 2026-11-28T03:23:54.032Z | 10.0 min |
| shard 1 | 2026-11-28T03:23:02.994Z | 6.9 min |
| shard 2 | 2026-11-28T03:25:33.119Z | 9.8 min |
| shard 3 | 2026-11-28T03:23:28.166Z | 7.4 min |
| shard 4 | 2026-11-28T03:23:29.572Z | 7.5 min |
| shard 5 | 2026-11-28T03:23:21.408Z | 7.4 min |
| shard 6 | 2026-11-28T03:26:56.689Z | 6.8 min |
| shard 7 | 2026-11-28T03:23:04.648Z | 7.3 min |
| shard 8 | 2026-11-28T03:23:43.702Z | 7.3 min |
| shard 9 | 2026-11-28T03:23:59.692Z | 9.0 min |
| shard 10 | 2026-11-28T03:25:03.874Z | 6.9 min |
| shard 11 | 2026-11-28T03:23:19.387Z | 6.9 min |
| shard 12 | 2026-11-28T03:23:11.028Z | 7.7 min |
| shard 13 | 2026-11-28T03:25:44.448Z | 7.7 min |
| shard 14 | 2026-11-28T03:23:59.137Z | 6.9 min |
| shard 15 | 2026-11-28T03:23:20.309Z | 7.4 min |
| shard 16 | 2026-11-28T03:23:28.535Z | 6.9 min |
| repeat | 2026-11-28T03:24:18.052Z | 15.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `failure-crawl-admin-content.spec.ts` | 22 | 9.6 min | shard 2 |
| `shell.spec.ts` | 234 | 9.0 min | shard 1 |
| `legal-admin.spec.ts` | 132 | 7.5 min | shard 4, repeat |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.2 min | shard 4 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.2 min | shard 3 |
| `failure-crawl-admin-people.spec.ts` | 14 | 6.8 min | shard 5 |
| `auth-signout.spec.ts` | 44 | 6.6 min | webkit, shard 9 |
| `admin-listings.spec.ts` | 82 | 6.1 min | webkit, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 6.0 min | shard 8 |
| `admin-translations-console.spec.ts` | 46 | 5.6 min | smoke, shard 7 |
| `admin-screening.spec.ts` | 64 | 5.4 min | webkit, shard 6 |
| `legal-certify.spec.ts` | 132 | 5.3 min | shard 2, repeat |
| `admin-roles.spec.ts` | 28 | 5.0 min | shard 12 |
| `admin-locations.spec.ts` | 44 | 5.0 min | shard 15 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 14 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.8 min | shard 16 |
| `dialogs.spec.ts` | 36 | 4.7 min | webkit, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 4.6 min | shard 9 |
| `import-security.spec.ts` | 36 | 4.5 min | shard 13 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 15 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 13 |
| `ad-page.spec.ts` | 104 | 4.3 min | webkit, shard 8 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 14 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 16 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 10 |
| `admin-monetisation.spec.ts` | 34 | 3.8 min | smoke, shard 6 |
| `photo-pipeline.spec.ts` | 74 | 3.6 min | webkit, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 3.6 min | shard 7 |
| `mfa-stepup.spec.ts` | 28 | 3.4 min | webkit, shard 3 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 3.1 min | shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 3.0 min | shard 9 |
| `admin-attributes-safety.spec.ts` | 18 | 2.8 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 2.7 min | shard 14 |
| `sage-bands.spec.ts` | 76 | 2.6 min | shard 15 |
| `failure-crawl-public.spec.ts` | 26 | 2.6 min | shard 13 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 12 |
| `post-wizard-category.spec.ts` | 54 | 2.5 min | webkit, shard 2 |
| `posting-routes.spec.ts` | 80 | 2.4 min | shard 11 |
| `legal-doors.spec.ts` | 102 | 2.2 min | smoke, shard 6, repeat |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 10 |
| `sage-ad-page.spec.ts` | 30 | 2.0 min | webkit, shard 14 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.9 min | shard 1 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 3 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.8 min | shard 8 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 16 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 7 |
| `legal-accept.spec.ts` | 36 | 1.3 min | shard 4, repeat |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 15 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 12 |
| `auth-caller-gates.spec.ts` | 24 | 1.2 min | shard 13, repeat |
| `my-listings-promote.spec.ts` | 10 | 1.2 min | shard 13 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 16 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.1 min | shard 9 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 9 |
| `press.spec.ts` | 22 | 1.1 min | shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 3 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 1 |
| `staff-gate.spec.ts` | 6 | 0.9 min | shard 13 |
| `legal-pages.spec.ts` | 30 | 0.9 min | shard 11, repeat |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 6 |
| `admin-errors.spec.ts` | 12 | 0.8 min | shard 10, repeat |
| `admin-screening-reject.spec.ts` | 10 | 0.8 min | shard 5 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 10 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 14 |
| `legal-history.spec.ts` | 18 | 0.7 min | shard 7, repeat |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 11 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 3 |
| `house-style.spec.ts` | 18 | 0.6 min | shard 4 |
| `settings.spec.ts` | 16 | 0.6 min | shard 10 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 2 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 15 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 2 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 1 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 8 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 16 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 4 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 5 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 1 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 8 |
| `error-reports.spec.ts` | 12 | 0.3 min | shard 6, repeat |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 12 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 1 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 11 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 5, repeat |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 2 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 14 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 8 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 10 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 9 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 5 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 7 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 6 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 2 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 13 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 15 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 12 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 9 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 15 |
| `offline.spec.ts` | 2 | 0.0 min | shard 1 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 279.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 123.4 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 108.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 101.5 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 76.1 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 70.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 68.2 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 68.1 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 65.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 57.1 s |
| `failure-crawl-member-listings.spec.ts` › FCR-42 /my-listings/$listingId/edit as member: loads clean and says every failed read | mobile-360 | 56.3 s |
| `failure-crawl-member-listings.spec.ts` › FCR-44 /post/$listingId as member: loads clean and says every failed read | mobile-360 | 56.2 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-55 /admin/locations as staff: loads clean and says every failed read | mobile-360 | 52.1 s |
| `failure-crawl-admin-content.spec.ts` › FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read | mobile-360 | 51.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 46102310512-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46102310512-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 46102310512-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46102310512-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 3, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 46102310512-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 2, fresh 33)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 46102310512-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 3, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 46102310512-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46102310512-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46102310512-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 46102310512-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 46102310512-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 46102310512-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 46102310512-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 46102310512-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 46102310512-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 25 (pool 3, fresh 22)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 46102310512-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 37 user(s) owned by process 46102310512-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46102310512-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46102310512-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 2, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 10 user(s) owned by process 46102310512-local-repeat
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] deleted 2 user(s) owned by process 46102310512-local-repeat
```

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_root_order ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notARoot", "refusals": [{"reason": "notARoot"}]}) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_root_order ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notARoot", "refusals": [{"reason": "notARoot"}]}) ×2
```
