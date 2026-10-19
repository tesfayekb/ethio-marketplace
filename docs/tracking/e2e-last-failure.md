# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39193072171 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39193072171
- Commit: `5e2dbaf1c5493bf5b8b542df24a3b271685922af`
- Attempt: 1
- Written (UTC): 2026-10-19T04:03:04.048Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › FV-1 one device favourite leads every main list and survives reload — Error: expect(received).toBeLessThanOrEqual(expected)

## Flaky bodies (DEC-078)

### shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34

  3693 |         const paintedBox = await strip.getByTestId(`strip-category-${mainSlug}`).boundingBox();
  3694 |         if (!menuBox || !paintedBox) throw new Error(`FV-1 missing ${mainSlug} bounds`);
> 3695 |         expect(Math.abs(menuBox.y - paintedBox.y)).toBeLessThanOrEqual(1);
       |                                                    ^
  3696 |       }
  3697 |       await page.getByTestId("rail-menu-close").click();
  3698 |     }
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3695:52)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3700:3
```

Context:

```text
        - heading "Company" [level=2] [ref=e641]
        - list [ref=e642]:
          - listitem [ref=e643]:
            - generic [ref=e644]: About
          - listitem [ref=e645]:
            - generic [ref=e646]: Contact
      - navigation "Help" [ref=e647]:
        - heading "Help" [level=2] [ref=e648]
        - list [ref=e649]:
          - listitem [ref=e650]:
            - generic [ref=e651]: Safety
      - navigation "Legal" [ref=e652]:
        - heading "Legal" [level=2] [ref=e653]
        - list [ref=e654]:
          - listitem [ref=e655]:
            - generic [ref=e656]: Terms
          - listitem [ref=e657]:
            - generic [ref=e658]: Privacy
    - paragraph [ref=e660]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

107 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lzuycp: e<n>e_par_<n>un → e<n>e_chi_sk<n>uaw` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-u<n>tco<n>: e<n>e_par_u<n>eom → e<n>e_chi_<n>kht` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lzuycp: e<n>e_par_<n>un → e<n>e_chi_sk<n>uaw ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-u<n>tco<n>: e<n>e_par_u<n>eom → e<n>e_chi_<n>kht ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-175 the price page asks the unit of sale above the quantity ×1 · PW-20 where: the default place lists itself, is ticked, and a lone city box offe ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-19T03:16:37.331Z | 20.7 min |
| email | 2026-10-19T03:16:38.686Z | 0.3 min |
| shard 1 | 2026-10-19T03:16:34.885Z | 46.1 min |
| shard 2 | 2026-10-19T03:16:34.828Z | 41.5 min |
| shard 3 | 2026-10-19T03:16:32.357Z | 30.2 min |
| shard 4 | 2026-10-19T03:16:42.945Z | 44.6 min |
| shard 5 | 2026-10-19T03:16:36.294Z | 33.7 min |
| shard 6 | 2026-10-19T03:16:55.435Z | 35.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 68 | 28.7 min | shard 1, shard 4 |
| `shell.spec.ts` | 420 | 25.5 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 24.1 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 20.9 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 16.3 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 70 | 15.5 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 80 | 15.2 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 15.1 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 13.6 min | shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 13.3 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.1 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 13.0 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 12.5 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 12.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 12.0 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 11.8 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 11.6 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 11.5 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.3 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 10.8 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 10.0 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.5 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.8 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.0 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 6.7 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 6.6 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.6 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.4 min | shard 1, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.9 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 5.6 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.4 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.3 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.1 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 2.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 1.9 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 12 | 1.9 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 3, shard 5 |
| `account-saved.spec.ts` | 4 | 1.5 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 3, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 58.1 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 57.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.6 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.3 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 48.8 s |
| `ad-page.spec.ts` › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart | mobile-360 | 48.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 48.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 47.7 s |
| `ad-page-doors.spec.ts` › AP-27 Report by public id: a buyer reports once with a reason and a note; the owner cannot report his own ad; a reason outside the list and a note over 500 characters are refused; a second open report by the same buyer is alreadyReported; a sold ad within its 30 days can be reported; a draft, an unknown or a malformed id cannot; the report dial counts written rows only | mobile-360 | 46.0 s |
| `ad-page.spec.ts` › AP-40 an address never reveals: only the visitor's own tap does (D201 §14) | mobile-360 | 44.7 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 44.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 43.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 42.3 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 42.2 s |
| `ad-page.spec.ts` › AP-23 a signed-in buyer taps Show contact; a signed-out visitor returns to the block after sign-in (D201 §6) | mobile-360 | 41.8 s |
