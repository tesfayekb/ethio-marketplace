# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45749553190
- Commit: `e4b1495e937aab44327a1a6ad02103bc8989c5e4`
- Attempt: 1
- Repeat: 27 of 136 tests repeated — specs directly changed 4/7, importers of a changed helper 0/0; budget 656 s; the time cap left 28 test runs
- Written (UTC): 2026-11-26T04:00:48.557Z
- Passed: 2681 · Skipped: 414 · Failed: 4
- Gating failures: 4 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): repeat (2)

## Gating failures

### admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/[account id]"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/[account id]"

--- further error 1 ---
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/[account id]"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/[account id]"


  163 |     await expect(page.getByTestId("role-permissions")).toHaveCount(0);
  164 |     await expect(roleRow(page, "admin")).toHaveCount(0);
> 165 |     await expect(page).not.toHaveURL(/\/admin\/roles\//);
      |                            ^
  166 |   });
  167 |
  168 |   test("RP-2 create: a super admin creates a custom role through step-up", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:165:28
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

### admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/[account id]"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/[account id]"

--- further error 1 ---
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/[account id]"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/[account id]"


  163 |     await expect(page.getByTestId("role-permissions")).toHaveCount(0);
  164 |     await expect(roleRow(page, "admin")).toHaveCount(0);
> 165 |     await expect(page).not.toHaveURL(/\/admin\/roles\//);
      |                            ^
  166 |   });
  167 |
  168 |   test("RP-2 create: a super admin creates a custom role through step-up", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:165:28
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

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover

- Source: `shard 16`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"id","reason":"notYourListing"}]}

expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 404
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"id","reason":"notYourListing"}]}

expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 404

  945 |       const stranger = await seller(other);
  946 |       const foreign = await photoAction(other, a, "move", stranger.token, 0);
> 947 |       expect(foreign.status, JSON.stringify(foreign.payload)).toBe(403);
      |                                                               ^
  948 |       expect(await order(), "PP-17: another seller moved a photo").toEqual([c, a, b]);
  949 |     } finally {
  950 |       await otherContext.close();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:947:63
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-17-Move-earlier-and-Move-later-put-a-photo-at-its-place-and-the-first-is-the-cover-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-890a4--and-the-first-is-the-cover-mobile-360`; this run carried 4 context file(s); of the same spec: none

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"id","reason":"notYourListing"}]}

expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 404
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"id","reason":"notYourListing"}]}

expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 404

  945 |       const stranger = await seller(other);
  946 |       const foreign = await photoAction(other, a, "move", stranger.token, 0);
> 947 |       expect(foreign.status, JSON.stringify(foreign.payload)).toBe(403);
      |                                                               ^
  948 |       expect(await order(), "PP-17: another seller moved a photo").toEqual([c, a, b]);
  949 |     } finally {
  950 |       await otherContext.close();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:947:63
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-17-Move-earlier-and-Move-later-put-a-photo-at-its-place-and-the-first-is-the-cover-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-890a4--and-the-first-is-the-cover-desktop-1280`; this run carried 4 context file(s); of the same spec: none

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 776s for the test suite to run
(no place given)
```

```text
Timed out waiting 776s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 4, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 4, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 4, shard 16 |
| `definitions wrongFile` (quiet) | 4 | shard 4, shard 16 |
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
| smoke | 2026-11-26T03:36:32.016Z | 7.0 min |
| email | 2026-11-26T03:36:04.363Z | 0.3 min |
| webkit | 2026-11-26T03:36:20.519Z | 10.8 min |
| shard 1 | 2026-11-26T03:39:25.867Z | 5.6 min |
| shard 2 | 2026-11-26T03:41:47.896Z | 11.3 min |
| shard 3 | 2026-11-26T03:36:11.063Z | 7.5 min |
| shard 4 | 2026-11-26T03:36:07.303Z | 11.4 min |
| shard 5 | 2026-11-26T03:35:52.539Z | 20.2 min |
| shard 6 | 2026-11-26T03:36:23.669Z | 15.2 min |
| shard 7 | 2026-11-26T03:38:38.613Z | 10.3 min |
| shard 8 | 2026-11-26T03:36:32.407Z | 14.1 min |
| shard 9 | 2026-11-26T03:38:48.778Z | 12.4 min |
| shard 10 | 2026-11-26T03:35:49.134Z | 24.4 min |
| shard 11 | 2026-11-26T03:35:47.090Z | 6.0 min |
| shard 12 | 2026-11-26T03:35:54.548Z | 5.9 min |
| shard 13 | 2026-11-26T03:37:37.918Z | 12.1 min |
| shard 14 | 2026-11-26T03:35:51.721Z | 20.0 min |
| shard 15 | 2026-11-26T03:35:58.502Z | 15.3 min |
| shard 16 | 2026-11-26T03:36:21.560Z | 13.2 min |
| repeat | 2026-11-26T03:36:34.446Z | 12.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.5 min | webkit, shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 22.3 min | shard 15 |
| `admin-screening.spec.ts` | 64 | 20.7 min | webkit, shard 14 |
| `legal-admin.spec.ts` | 44 | 20.7 min | shard 5 |
| `admin-translations-console.spec.ts` | 46 | 19.4 min | smoke, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 17.2 min | shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 17.1 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 15.7 min | shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 14.9 min | shard 14 |
| `admin-locations.spec.ts` | 44 | 14.8 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 54 | 13.9 min | shard 5, repeat |
| `admin-monetisation.spec.ts` | 34 | 13.4 min | smoke, shard 10 |
| `admin-roles.spec.ts` | 28 | 12.0 min | shard 9 |
| `import-security.spec.ts` | 36 | 11.3 min | shard 4 |
| `legal-doors.spec.ts` | 34 | 9.4 min | smoke, shard 6 |
| `shell.spec.ts` | 234 | 9.3 min | shard 1 |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 7 |
| `admin-screening-reject.spec.ts` | 30 | 8.3 min | shard 4, repeat |
| `admin-translations-governance.spec.ts` | 20 | 7.2 min | smoke, shard 14 |
| `admin-countries.spec.ts` | 18 | 6.8 min | shard 7 |
| `auth-signout.spec.ts` | 44 | 6.0 min | webkit, shard 9 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 11 |
| `dialogs.spec.ts` | 36 | 4.8 min | webkit, shard 4 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.8 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 4.8 min | shard 3 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 4.5 min | shard 12 |
| `admin-translations-data.spec.ts` | 10 | 4.2 min | shard 8 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 16 |
| `ad-page.spec.ts` | 104 | 3.9 min | webkit, shard 13 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 15 |
| `photo-pipeline.spec.ts` | 74 | 3.7 min | webkit, shard 16 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 11 |
| `mfa-stepup.spec.ts` | 28 | 3.5 min | webkit, shard 9 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 8 |
| `post-wizard-category.spec.ts` | 54 | 2.8 min | webkit, shard 3 |
| `choice-lists.spec.ts` | 96 | 2.8 min | shard 7 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 6 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 1.9 min | smoke, shard 9 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 13 |
| `admin-services.spec.ts` | 10 | 1.8 min | shard 15 |
| `my-listings-page.spec.ts` | 72 | 1.6 min | webkit, shard 10, repeat |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 13 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 6 |
| `legal-certify.spec.ts` | 44 | 1.3 min | shard 15 |
| `sage-tiers.spec.ts` | 52 | 1.3 min | webkit, shard 2 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 12 |
| `press.spec.ts` | 22 | 1.1 min | shard 11 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 2 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 12 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 4 |
| `my-listings-doors.spec.ts` | 28 | 0.9 min | shard 1 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 11 |
| `staff-gate.spec.ts` | 4 | 0.8 min | shard 8 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 14 |
| `house-style.spec.ts` | 18 | 0.7 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 14 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 16 |
| `page-head.spec.ts` | 4 | 0.6 min | shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 11 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 12 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 15 |
| `settings.spec.ts` | 16 | 0.5 min | shard 10 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 7 |
| `breadcrumbs.spec.ts` | 6 | 0.5 min | shard 9 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 8 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 3 |
| `post-wizard-details.spec.ts` | 8 | 0.3 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 15 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 13 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 2 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 11 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 9 |
| `shell-bands.spec.ts` | 16 | 0.2 min | smoke, shard 1 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 16 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 8 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 11 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 2 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 14 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 10 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 13 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 6 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4 |
| `category-image-routes.spec.ts` | 12 | 0.1 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 4 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 14 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 13 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 10 |
| `offline.spec.ts` | 6 | 0.1 min | shard 3, repeat |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 5 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 1 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 9 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 15 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 7 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 8 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 62.8 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 60.0 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.5 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 59.5 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 59.4 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | mobile-360 | 58.8 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | desktop-1280 | 58.6 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 55.2 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 54.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 49.6 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 46.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 46.5 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | desktop-1280 | 46.4 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | mobile-360 | 46.4 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | desktop-1280 | 46.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45749553190-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45749553190-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45749553190-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45749553190-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45749553190-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45749553190-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45749553190-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 45749553190-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45749553190-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45749553190-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45749553190-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 45749553190-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45749553190-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 45749553190-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45749553190-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45749553190-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45749553190-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45749553190-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45749553190-local-16
```

## Server errors: shard 9

No `[ssr-error]` lines in the `shard 9` log (or no log was uploaded).

## Client errors: shard 9

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 GET /auth/v1/user ({"code":403,"error_code":"session_not_found","msg":"Session from session_id claim in JWT does not exist"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 GET /auth/v1/user ({"code":403,"error_code":"session_not_found","msg":"Session from session_id claim in JWT does not exist"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 GET /auth/v1/user ({"code":403,"error_code":"session_not_found","msg":"Session from session_id claim in JWT does not exist"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 GET /auth/v1/user ({"code":403,"error_code":"session_not_found","msg":"Session from session_id claim in JWT does not exist"})
```

## Server errors: shard 16

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## Client errors: shard 16

No `[client-error]` lines in the `shard 16` log (or no log was uploaded).
