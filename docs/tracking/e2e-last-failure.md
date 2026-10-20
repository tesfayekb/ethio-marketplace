# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39342049816 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39342049816
- Commit: `6be5671a6997b23dd9fedfed06c999130b787440`
- Attempt: 2
- Written (UTC): 2026-10-20T01:44:25.430Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-30 Share: rows and links, Copy and QR counted by channel, native sharing where supported, buyer and owner counters — Error: expect(received).toMatchObject(expected)

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-30 Share: rows and links, Copy and QR counted by channel, native sharing where supported, buyer and owner counters

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "shares_copy": 1,
+   "shares_copy": 2,
    "shares_qr": 1,
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "shares_copy": 1,
+   "shares_copy": 2,
    "shares_qr": 1,
  }

  684 |     expect(await counters()).toMatchObject({ views: 1, shares_copy: 1, shares_qr: 1 });
  685 |     await tap("copy");
> 686 |     expect(await counters()).toMatchObject({ shares_copy: 1, shares_qr: 1 });
      |                              ^
  687 |     const reViewed = page.waitForResponse(
  688 |       (r) => new URL(r.url()).pathname === "/api/listings/view" && r.request().method() === "POST",
  689 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:686:30
```

Context:

```text
        - img
        - text: Facebook
      - button "Copy link" [active] [ref=e8] [cursor=pointer]:
        - img
        - text: Copy link
      - status [ref=e9]: Link copied
      - button "QR code" [ref=e10] [cursor=pointer]:
        - img
        - text: QR code
      - generic [ref=e11]:
        - img "Scan to open this ad" [ref=e12]
        - paragraph [ref=e13]: Scan to open this ad
        - link "Download" [ref=e14] [cursor=pointer]:
          - /url: /l/b7cf45jn53/qr.svg
          - img
          - text: Download
    - button "Close" [ref=e15] [cursor=pointer]:
      - img [ref=e16]
      - generic [ref=e19]: Close
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

112 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 12 | shard 3, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>t<n>i<n>: e<n>e_par_loavnm → e<n>e_chi_u<n>lh<n>b` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jy<n>pt<n>: e<n>e_par_dwl<n>i → e<n>e_chi_xf<n>jls` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>t<n>i<n>: e<n>e_par_loavnm → e<n>e_chi_u<n>lh<n>b ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jy<n>pt<n>: e<n>e_par_dwl<n>i → e<n>e_chi_xf<n>jls ×1

Off the allowlist:

### listing not found

- Count: 12 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-13 review: the preview shows what was answered, and Publish lands in review — ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-20T00:52:41.485Z | 24.1 min |
| email | 2026-10-20T00:52:34.852Z | 0.3 min |
| shard 1 | 2026-10-20T00:52:27.914Z | 49.5 min |
| shard 2 | 2026-10-20T00:52:34.447Z | 43.3 min |
| shard 3 | 2026-10-20T00:52:43.311Z | 39.5 min |
| shard 4 | 2026-10-20T00:52:19.782Z | 44.8 min |
| shard 5 | 2026-10-20T00:52:28.856Z | 51.6 min |
| shard 6 | 2026-10-20T00:52:26.810Z | 43.2 min |
| changed | 2026-10-20T00:52:30.436Z | 23.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `my-listings-ad.spec.ts` | 72 | 35.0 min | shard 2, shard 5, changed |
| `ad-page.spec.ts` | 68 | 29.4 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 28.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 424 | 28.1 min | smoke, shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 24.2 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 21.4 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 20.6 min | shard 1, shard 4 |
| `legal-certify.spec.ts` | 52 | 20.1 min | shard 2, shard 5, changed |
| `post-wizard-place.spec.ts` | 38 | 18.0 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 80 | 17.9 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 16.8 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 56 | 15.9 min | shard 2, shard 5, changed |
| `post-wizard-resets.spec.ts` | 34 | 15.0 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 15.0 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.8 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 13.7 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 13.1 min | shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 12.7 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 12.4 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 12.2 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 10.9 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.8 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.8 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 9.5 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.6 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.4 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 8.4 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 16 | 8.1 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 8.0 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.9 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.4 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 7.3 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.6 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.3 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.9 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.3 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.0 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.8 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.6 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 16 | 3.3 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.0 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.7 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.5 min | shard 3, shard 6 |
| `legal-accept.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 2.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 12 | 2.0 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.5 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `legal-history.spec.ts` | 6 | 1.4 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.3 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.2 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.9 min | smoke, shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 63.2 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | desktop-1280 | 57.8 s |
| `ad-page.spec.ts` › AP-30 Share: rows and links, Copy and QR counted by channel, native sharing where supported, buyer and owner counters | mobile-360 | 56.5 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 53.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 53.6 s |
| `post-wizard-pricing.spec.ts` › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) | desktop-1280 | 51.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 51.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 51.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 51.0 s |
| `photo-pipeline.spec.ts` › PP-13 photo links: the owner and staff get them; another seller and no session do not | mobile-360 | 50.7 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 50.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 50.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 50.1 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 50.0 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 49.5 s |
