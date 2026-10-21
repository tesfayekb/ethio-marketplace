# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39581997762
- Commit: `e683cc0f2738fc096607af89ad1b7267d29add53`
- Attempt: 1
- Written (UTC): 2026-10-21T10:21:01.573Z
- Passed: 2142 · Skipped: 154 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width — Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eyoopiwpzlogvksccatipbgxwuwxpttndmmkaitvhnqyxhpi","furthestElement":"breadcrumb-ad","crumbHeight":20}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row — Error: expect(received).not.toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eyoopiwpzlogvksccatipbgxwuwxpttndmmkaitvhnqyxhpi","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eyoopiwpzlogvksccatipbgxwuwxpttndmmkaitvhnqyxhpi","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context:

```text
          - listitem [ref=e271]:
            - generic [ref=e272]: About
          - listitem [ref=e273]:
            - generic [ref=e274]: Contact
      - navigation "Help" [ref=e275]:
        - heading "Help" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - generic [ref=e279]: Safety
      - navigation "Legal" [ref=e280]:
        - heading "Legal" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - link "Terms" [ref=e284] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e285]:
            - link "Privacy" [ref=e286] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e288]: © 2026 ethio.com — All rights reserved.
```
```

### admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "pending"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "pending"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  314 |         const outcome = async (first: string, second: string) => {
  315 |           let result = "pending" as "inverted" | "notARoot" | "pending";
> 316 |           await expect
      |           ^
  317 |             .poll(
  318 |               async () => {
  319 |                 if (await inverted(first, second)) result = "inverted";
    at outcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:316:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:330:14
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_root_order ({"code":"P0001","details":null,"hint":null,"message":"notARoot"})
```

Context:

```text
          - generic [ref=e57]: 13. Babies & Kids
          - button "Move up" [ref=e58] [cursor=pointer]: ↑
          - button "Move down" [ref=e59] [cursor=pointer]: ↓
        - listitem [ref=e60]:
          - generic [ref=e61]: 14. Commercial Equipment
          - button "Move up" [ref=e62] [cursor=pointer]: ↑
          - button "Move down" [ref=e63] [cursor=pointer]: ↓
        - listitem [ref=e64]:
          - generic [ref=e65]: 15. e2e-cat-local-8-1-t0q7lc
          - button "Move up" [ref=e66] [cursor=pointer]: ↑
          - button "Move down" [disabled]: ↓
      - alert [ref=e67]: That could not be saved.
      - paragraph [ref=e68]: "Reason: [object Object]"
      - generic [ref=e69]:
        - button "Reset order" [ref=e70] [cursor=pointer]
        - button "Save order" [ref=e71] [cursor=pointer]
    - button "Close" [ref=e72] [cursor=pointer]:
      - img [ref=e73]
      - generic [ref=e76]: Close
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (14 of 14 results files read, 14 of 14 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

106 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `too many previews` (quiet) | 10 | shard 3, shard 9 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 7 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 7, shard 8 |
| `listing not found` | 3 | shard 6, shard 11 |
| `categories file too large` (quiet) | 2 | shard 3, shard 9 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 9 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 8 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 9 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 9 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 9 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 9 |
| `locations file too large` (quiet) | 2 | shard 3, shard 9 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 9 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `new row for relation <q> violates check constraint <q>` | 2 | shard 5, shard 11 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 9 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 9 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 9 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>ri<n>m: e<n>e_par_umpnvo → e<n>e_chi_y<n>mctj` (quiet) | 1 | shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>u<n>wni: e<n>e_par_<n>sa<n>h → e<n>e_chi_iscxdv` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>ri<n>m: e<n>e_par_umpnvo → e<n>e_chi_y<n>mctj ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>u<n>wni: e<n>e_par_<n>sa<n>h → e<n>e_chi_iscxdv ×1

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 6, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · L9 cardUntil=lg keeps cards at 768 until lg ×1 · PR-3 a complete draft publishes to screening and never to active ×1 · PW-161 a number's unit reads in English, and in Amharic under Amharic ×1 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 5, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-6 the AI assist fills the title and description from the entered details, and ×2 · PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-21T10:08:11.920Z | 12.0 min |
| email | 2026-10-21T10:07:58.941Z | 0.2 min |
| shard 1 | 2026-10-21T10:08:33.286Z | 9.8 min |
| shard 2 | 2026-10-21T10:07:59.459Z | 10.2 min |
| shard 3 | 2026-10-21T10:08:00.135Z | 4.5 min |
| shard 4 | 2026-10-21T10:08:24.666Z | 6.4 min |
| shard 5 | 2026-10-21T10:08:15.603Z | 6.9 min |
| shard 6 | 2026-10-21T10:08:16.781Z | 6.6 min |
| shard 7 | 2026-10-21T10:08:24.096Z | 9.7 min |
| shard 8 | 2026-10-21T10:08:33.167Z | 11.0 min |
| shard 9 | 2026-10-21T10:08:26.891Z | 6.5 min |
| shard 10 | 2026-10-21T10:08:16.061Z | 7.0 min |
| shard 11 | 2026-10-21T10:08:12.680Z | 8.5 min |
| shard 12 | 2026-10-21T10:07:53.862Z | 4.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 18.9 min | smoke, shard 6, shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.8 min | shard 4, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 6.4 min | shard 1, shard 7 |
| `post-wizard-specs.spec.ts` | 82 | 5.8 min | shard 5, shard 11 |
| `admin-locations.spec.ts` | 38 | 5.7 min | shard 2, shard 8 |
| `post-wizard-place.spec.ts` | 38 | 5.3 min | shard 5, shard 11 |
| `admin-translations-console.spec.ts` | 44 | 5.0 min | shard 2, shard 8 |
| `admin-screening.spec.ts` | 52 | 5.0 min | shard 2, shard 8 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 3, shard 9 |
| `post-wizard-where.spec.ts` | 32 | 4.7 min | shard 5, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.7 min | shard 1, shard 7 |
| `admin-roles.spec.ts` | 26 | 4.6 min | shard 2, shard 8 |
| `admin-attributes-links.spec.ts` | 34 | 4.6 min | shard 1, shard 7 |
| `photo-pipeline.spec.ts` | 66 | 4.5 min | shard 4, shard 10 |
| `auth-signout.spec.ts` | 56 | 4.5 min | smoke, shard 3, shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 4.4 min | shard 1, shard 7 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.3 min | shard 1, shard 8 |
| `admin-listings.spec.ts` | 62 | 4.2 min | shard 2, shard 8 |
| `post-wizard-pricing.spec.ts` | 52 | 4.2 min | shard 5, shard 11 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 2, shard 9 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 6, shard 12 |
| `my-listings-ad.spec.ts` | 36 | 3.9 min | shard 4, shard 10 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 2, shard 8 |
| `ad-page.spec.ts` | 68 | 3.8 min | shard 1, shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 3.4 min | shard 5, shard 11 |
| `posting-routes.spec.ts` | 80 | 3.4 min | shard 6, shard 11 |
| `post-wizard-category.spec.ts` | 48 | 3.2 min | shard 4, shard 10 |
| `admin-attributes-safety.spec.ts` | 18 | 2.9 min | shard 1, shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 2.4 min | shard 1, shard 7 |
| `import-security.spec.ts` | 36 | 2.4 min | shard 3, shard 9 |
| `legal-certify.spec.ts` | 40 | 2.0 min | shard 3, shard 9 |
| `legal-admin.spec.ts` | 36 | 1.9 min | shard 3, shard 9 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 2, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 1, shard 8 |
| `mfa-stepup.spec.ts` | 18 | 1.8 min | shard 4, shard 10 |
| `admin-translations-data.spec.ts` | 8 | 1.7 min | shard 2, shard 9 |
| `admin-audit.spec.ts` | 14 | 1.6 min | shard 1, shard 7 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 4, shard 10 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 2, shard 8 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 10 |
| `admin-coverage.spec.ts` | 16 | 1.1 min | shard 2, shard 8 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 4, shard 10 |
| `legal-doors.spec.ts` | 32 | 0.9 min | shard 4, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.8 min | shard 5, shard 11 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 5, shard 11 |
| `ad-page-doors.spec.ts` | 30 | 0.8 min | shard 1, shard 7 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 4, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.7 min | shard 5, shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.6 min | shard 5, shard 11 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 3, shard 9 |
| `posting-routes-dials.spec.ts` | 18 | 0.6 min | shard 5, shard 11 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 1, shard 8 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 6, shard 12 |
| `legal-accept.spec.ts` | 8 | 0.5 min | shard 3, shard 9 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 3, shard 9 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 9 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 4, shard 10 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 8 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `settings.spec.ts` | 4 | 0.3 min | shard 6 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 5, shard 11 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 6, shard 12 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 9 |
| `account-saved.spec.ts` | 4 | 0.3 min | shard 1, shard 7 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 3, shard 9 |
| `legal-pages.spec.ts` | 6 | 0.2 min | shard 4, shard 10 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 11 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 9 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 5, shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 9 |
| `auth-signup.spec.ts` | 4 | 0.1 min | email |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6, shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-countries.spec.ts` › CO-6 rail order: two roots are stored in position order, and the reset removes every row | mobile-360 | 56.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 46.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 45.9 s |
| `admin-countries.spec.ts` › CO-6 rail order: two roots are stored in position order, and the reset removes every row | desktop-1280 | 43.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.0 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 29.7 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 27.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 39581997762-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39581997762-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 10 user(s) owned by process 39581997762-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 16 user(s) owned by process 39581997762-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 22 (pool 4, fresh 18)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 39581997762-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 18 (pool 4, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 39581997762-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39581997762-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39581997762-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 10 user(s) owned by process 39581997762-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 39581997762-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 20 (pool 4, fresh 16)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 39581997762-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 18 (pool 4, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 39581997762-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39581997762-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39581997762-local-12
```

## admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "pending"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "pending"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  314 |         const outcome = async (first: string, second: string) => {
  315 |           let result = "pending" as "inverted" | "notARoot" | "pending";
> 316 |           await expect
      |           ^
  317 |             .poll(
  318 |               async () => {
  319 |                 if (await inverted(first, second)) result = "inverted";
    at outcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:316:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:330:14
```

Context:

```text
          - generic [ref=e57]: 13. Pets & Animals
          - button "Move up" [ref=e58] [cursor=pointer]: ↑
          - button "Move down" [ref=e59] [cursor=pointer]: ↓
        - listitem [ref=e60]:
          - generic [ref=e61]: 14. Babies & Kids
          - button "Move up" [ref=e62] [cursor=pointer]: ↑
          - button "Move down" [ref=e63] [cursor=pointer]: ↓
        - listitem [ref=e64]:
          - generic [ref=e65]: 15. Commercial Equipment
          - button "Move up" [ref=e66] [cursor=pointer]: ↑
          - button "Move down" [disabled]: ↓
      - alert [ref=e67]: That could not be saved.
      - paragraph [ref=e68]: "Reason: [object Object]"
      - generic [ref=e69]:
        - button "Reset order" [ref=e70] [cursor=pointer]
        - button "Save order" [ref=e71] [cursor=pointer]
    - button "Close" [ref=e72] [cursor=pointer]:
      - img [ref=e73]
      - generic [ref=e76]: Close
```
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_root_order ({"code":"P0001","details":null,"hint":null,"message":"notARoot"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_root_order ({"code":"P0001","details":null,"hint":null,"message":"notARoot"})
```
